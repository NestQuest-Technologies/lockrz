-- LOCKRZ core schema, shared by the website and the mobile app.
-- Money is stored as integer ngwee (K1 = 100 ngwee) to avoid rounding errors.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Types
-- ---------------------------------------------------------------------------

create type public.user_role as enum ('customer', 'courier', 'agent', 'admin');
create type public.location_kind as enum ('locker', 'agent_point', 'hub');
create type public.parcel_size as enum ('small', 'medium', 'large');
create type public.parcel_status as enum (
  'booked',
  'dropped_off',
  'in_transit',
  'ready_for_collection',
  'collected',
  'returned',
  'cancelled'
);
create type public.payment_method as enum ('mobile_money', 'card', 'cash', 'wallet');
create type public.payment_status as enum ('pending', 'paid', 'failed', 'refunded');
create type public.waitlist_interest as enum ('send', 'receive', 'business', 'agent');

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  phone text unique,
  role public.user_role not null default 'customer',
  created_at timestamptz not null default now()
);

create table public.locations (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,                 -- e.g. LSK-001
  name text not null,                        -- e.g. "EastPark Mall"
  kind public.location_kind not null,
  area text not null,                        -- neighbourhood, e.g. "Kabulonga"
  city text not null default 'Lusaka',
  address text,
  latitude numeric(9, 6),
  longitude numeric(9, 6),
  opening_hours text,
  is_active boolean not null default false,  -- only active points are public
  created_at timestamptz not null default now()
);

create table public.tariffs (
  size public.parcel_size primary key,
  label text not null,
  description text not null,
  max_weight_kg numeric(5, 2) not null,
  price_ngwee integer not null check (price_ngwee >= 0),
  updated_at timestamptz not null default now()
);

create table public.parcels (
  id uuid primary key default gen_random_uuid(),
  tracking_number text not null unique
    default ('LZ-' || lpad((floor(random() * 100000000))::bigint::text, 8, '0')),
  sender_id uuid references public.profiles (id) on delete set null,
  sender_name text not null,
  sender_phone text not null,
  recipient_name text not null,
  recipient_phone text not null,
  origin_location_id uuid references public.locations (id),
  destination_location_id uuid references public.locations (id),
  size public.parcel_size not null,
  weight_kg numeric(6, 2),
  price_ngwee integer check (price_ngwee >= 0),
  status public.parcel_status not null default 'booked',
  collection_code text,                      -- never exposed publicly
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index parcels_sender_id_idx on public.parcels (sender_id);
create index parcels_recipient_phone_idx on public.parcels (recipient_phone);

-- Every status change is an event; parcels.status mirrors the latest one.
create table public.parcel_events (
  id bigint generated always as identity primary key,
  parcel_id uuid not null references public.parcels (id) on delete cascade,
  status public.parcel_status not null,
  location_id uuid references public.locations (id),
  note text,
  created_by uuid references public.profiles (id),
  created_at timestamptz not null default now()
);

create index parcel_events_parcel_id_idx on public.parcel_events (parcel_id, created_at);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  parcel_id uuid not null references public.parcels (id) on delete cascade,
  amount_ngwee integer not null check (amount_ngwee >= 0),
  method public.payment_method not null,
  provider text,                             -- gateway name, filled in when integrated
  provider_reference text,
  status public.payment_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index payments_parcel_id_idx on public.payments (parcel_id);

create table public.waitlist (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null unique,
  area text not null,
  interest public.waitlist_interest not null,
  source text,                               -- e.g. "website", "poster"
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Triggers
-- ---------------------------------------------------------------------------

create function public.touch_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger parcels_touch before update on public.parcels
  for each row execute function public.touch_updated_at();
create trigger payments_touch before update on public.payments
  for each row execute function public.touch_updated_at();
create trigger tariffs_touch before update on public.tariffs
  for each row execute function public.touch_updated_at();

create function public.apply_parcel_event() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  update public.parcels set status = new.status where id = new.parcel_id;
  return new;
end;
$$;

create trigger parcel_events_apply after insert on public.parcel_events
  for each row execute function public.apply_parcel_event();

create function public.log_new_parcel() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.parcel_events (parcel_id, status, location_id, created_by)
  values (new.id, new.status, new.origin_location_id, new.sender_id);
  return new;
end;
$$;

create trigger parcels_log_new after insert on public.parcels
  for each row execute function public.log_new_parcel();

-- Create a profile for every new auth user (app sign-ups).
create function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (new.id, new.raw_user_meta_data ->> 'full_name', new.phone);
  return new;
end;
$$;

create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Row level security
-- ---------------------------------------------------------------------------

create function public.is_staff() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'courier', 'agent')
  );
$$;

alter table public.profiles enable row level security;
alter table public.locations enable row level security;
alter table public.tariffs enable row level security;
alter table public.parcels enable row level security;
alter table public.parcel_events enable row level security;
alter table public.payments enable row level security;
alter table public.waitlist enable row level security;

create policy "Own profile is readable" on public.profiles
  for select using (id = auth.uid() or public.is_staff());
create policy "Own profile is editable" on public.profiles
  for update using (id = auth.uid()) with check (id = auth.uid());

-- Users may edit their name and phone, never their own role.
revoke update on public.profiles from anon, authenticated;
grant update (full_name, phone) on public.profiles to authenticated;

create policy "Active locations are public" on public.locations
  for select using (is_active or public.is_staff());
create policy "Staff manage locations" on public.locations
  for all using (public.is_staff()) with check (public.is_staff());

create policy "Tariffs are public" on public.tariffs
  for select using (true);

create policy "Senders see their parcels" on public.parcels
  for select using (sender_id = auth.uid() or public.is_staff());
create policy "Staff manage parcels" on public.parcels
  for all using (public.is_staff()) with check (public.is_staff());

create policy "Senders see their parcel events" on public.parcel_events
  for select using (
    public.is_staff()
    or exists (select 1 from public.parcels p where p.id = parcel_id and p.sender_id = auth.uid())
  );
create policy "Staff add parcel events" on public.parcel_events
  for insert with check (public.is_staff());

create policy "Senders see their payments" on public.payments
  for select using (
    public.is_staff()
    or exists (select 1 from public.parcels p where p.id = parcel_id and p.sender_id = auth.uid())
  );

create policy "Staff read waitlist" on public.waitlist
  for select using (public.is_staff());

-- ---------------------------------------------------------------------------
-- Public functions (callable with the anon key)
-- ---------------------------------------------------------------------------

-- Public tracking: returns status history only, never phones or collection codes.
create function public.track_parcel(p_tracking_number text)
returns table (
  tracking_number text,
  status public.parcel_status,
  event_status public.parcel_status,
  event_location text,
  event_at timestamptz
)
language sql stable security definer set search_path = public as $$
  select p.tracking_number, p.status, e.status, coalesce(l.name || ', ' || l.area, null), e.created_at
  from public.parcels p
  join public.parcel_events e on e.parcel_id = p.id
  left join public.locations l on l.id = e.location_id
  where p.tracking_number = upper(trim(p_tracking_number))
  order by e.created_at desc;
$$;

-- Launch list sign-up. Re-joining with the same phone updates the entry.
create function public.join_waitlist(
  p_full_name text,
  p_phone text,
  p_area text,
  p_interest public.waitlist_interest,
  p_source text default 'website'
) returns void
language plpgsql security definer set search_path = public as $$
begin
  if length(trim(p_full_name)) not between 2 and 80 then
    raise exception 'invalid name';
  end if;
  if p_phone !~ '^260[79][0-9]{8}$' then
    raise exception 'invalid phone';
  end if;
  if length(trim(p_area)) not between 2 and 60 then
    raise exception 'invalid area';
  end if;

  insert into public.waitlist (full_name, phone, area, interest, source)
  values (trim(p_full_name), p_phone, trim(p_area), p_interest, left(p_source, 40))
  on conflict (phone) do update
    set full_name = excluded.full_name,
        area = excluded.area,
        interest = excluded.interest;
end;
$$;

revoke all on function public.track_parcel(text) from public;
revoke all on function public.join_waitlist(text, text, text, public.waitlist_interest, text) from public;
grant execute on function public.track_parcel(text) to anon, authenticated;
grant execute on function public.join_waitlist(text, text, text, public.waitlist_interest, text) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Launch pricing (Lusaka flat rates, editable by admins later)
-- ---------------------------------------------------------------------------

insert into public.tariffs (size, label, description, max_weight_kg, price_ngwee) values
  ('small',  'Small parcel',  'Documents, phones, clothing. Fits in a shoebox.', 2,  5000),
  ('medium', 'Medium parcel', 'Shoes, small electronics, groceries bag.',        5,  8500),
  ('large',  'Large parcel',  'Bulky items up to the size of a suitcase.',      15, 13000);
