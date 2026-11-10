import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client using the public anon key. Row level security and
 * the track_parcel / join_waitlist functions decide what it can see and do.
 * Returns null when the project isn't configured yet, so the site still renders.
 */
export function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}
