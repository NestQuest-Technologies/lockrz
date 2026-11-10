"use server";

import { lusakaAreas } from "@/lib/lusaka";
import { normaliseZambianPhone } from "@/lib/site";
import { getSupabase } from "@/lib/supabase";

export type TrackingEvent = { status: string; location: string | null; at: string };

export type TrackState =
  | { kind: "idle" }
  | { kind: "message"; message: string }
  | { kind: "found"; trackingNumber: string; status: string; events: TrackingEvent[] };

export async function trackParcel(_prev: TrackState, formData: FormData): Promise<TrackState> {
  const trackingNumber = String(formData.get("trackingNumber") ?? "").trim().toUpperCase();
  if (!/^LZ-\d{8}$/.test(trackingNumber)) {
    return { kind: "message", message: "Tracking numbers look like LZ-12345678. Check your booking message and try again." };
  }

  const supabase = getSupabase();
  if (!supabase) {
    return { kind: "message", message: "Tracking opens when our first Lusaka deliveries start. Join the launch list to hear first." };
  }

  const { data, error } = await supabase.rpc("track_parcel", { p_tracking_number: trackingNumber });
  if (error) {
    return { kind: "message", message: "We couldn't check tracking right now. Please try again in a minute." };
  }
  if (!data?.length) {
    return { kind: "message", message: `We couldn't find ${trackingNumber}. Check the number on your booking message.` };
  }

  return {
    kind: "found",
    trackingNumber,
    status: data[0].status,
    events: data.map((row: { event_status: string; event_location: string | null; event_at: string }) => ({
      status: row.event_status,
      location: row.event_location,
      at: row.event_at,
    })),
  };
}

export type WaitlistState = { ok: boolean; message: string } | null;

const interests = ["send", "receive", "business", "agent"];

export async function joinWaitlist(_prev: WaitlistState, formData: FormData): Promise<WaitlistState> {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const phone = normaliseZambianPhone(String(formData.get("phone") ?? ""));
  const area = String(formData.get("area") ?? "");
  const interest = String(formData.get("interest") ?? "");
  const ref = String(formData.get("source") ?? "");
  const source = /^[a-z0-9-]{1,40}$/i.test(ref) ? ref.toLowerCase() : "website";

  if (fullName.length < 2) return { ok: false, message: "Please enter your name." };
  if (!phone) return { ok: false, message: "Please enter a Zambian mobile number, e.g. 097 123 4567." };
  if (!lusakaAreas.includes(area) && area !== "Other") return { ok: false, message: "Please choose your area." };
  if (!interests.includes(interest)) return { ok: false, message: "Please tell us how you'd use LOCKRZ." };

  const supabase = getSupabase();
  if (!supabase) {
    return { ok: false, message: "Sign-ups aren't open yet. Please message us on WhatsApp instead." };
  }

  const { error } = await supabase.rpc("join_waitlist", {
    p_full_name: fullName,
    p_phone: phone,
    p_area: area,
    p_interest: interest,
    p_source: source,
  });
  if (error) return { ok: false, message: "Something went wrong saving your details. Please try again." };

  return { ok: true, message: `Thank you, ${fullName.split(" ")[0]}! We'll message you on ${formData.get("phone")} when LOCKRZ opens in ${area === "Other" ? "your area" : area}.` };
}
