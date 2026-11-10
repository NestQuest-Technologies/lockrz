# LOCKRZ website

Public website for LOCKRZ (Yellowdrop Parcel Company Limited). The first release targets **Lusaka only**: it explains the service, shows flat prices, tracks parcels, and collects launch-list sign-ups.

## Setup

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Open http://localhost:3000. The site works without Supabase configured: it shows default prices, and tracking and sign-ups tell visitors those features aren't open yet.

## Database (Supabase, shared with the mobile app)

The schema lives in [supabase/migrations](supabase/migrations). Apply it with the Supabase CLI (`supabase db push`) or paste it into the SQL editor.

| Table | Purpose |
| --- | --- |
| `profiles` | One row per app user; `role` is `customer`, `courier`, `agent` or `admin` |
| `locations` | Lockers, agent shops and hubs. Only `is_active` rows are public |
| `tariffs` | Flat Lusaka prices by parcel size, in ngwee |
| `parcels` | Bookings, with the sender, the recipient, and the origin and destination points |
| `parcel_events` | Status history. Inserting an event updates `parcels.status` |
| `payments` | One row per payment attempt; the gateway is plugged in later |
| `waitlist` | Launch-list sign-ups (name, phone, area, interest, source) |

The website uses only the **anon key**. Public access goes through two functions:

- `track_parcel(tracking_number)` returns the status history only, never phone numbers or collection codes.
- `join_waitlist(...)` validates the input and adds or updates a sign-up.

Staff (`admin`/`courier`/`agent` roles) get full access through row level security. That access is for the admin portal and courier app.

## Reaching people in Lusaka

- **Launch list** (`#join`): collects phone numbers and areas so we know where to open pickup points first.
- **WhatsApp**: set `NEXT_PUBLIC_WHATSAPP_NUMBER` to show "Chat with us" links. The share buttons work without it.
- **Link previews**: `app/opengraph-image.tsx` makes shared links look good on WhatsApp and Facebook.
- **Printable poster**: `/poster` is an A4 poster with a QR code. Sign-ups from it are saved with `source = 'poster'`. To track another flyer or campaign, add `?ref=<name>` to its link.

Useful query: sign-ups per area.

```sql
select area, interest, count(*) from waitlist group by area, interest order by count(*) desc;
```
