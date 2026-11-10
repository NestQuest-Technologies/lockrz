import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { getSupabase } from "./supabase";

export type Tariff = {
  size: "small" | "medium" | "large";
  label: string;
  description: string;
  max_weight_kg: number;
  price_ngwee: number;
};

export type PickupPoint = {
  code: string;
  name: string;
  kind: "locker" | "agent_point" | "hub";
  area: string;
  address: string | null;
  opening_hours: string | null;
};

// Mirrors the seed in supabase/migrations so prices show before the database is connected.
const defaultTariffs: Tariff[] = [
  { size: "small", label: "Small parcel", description: "Documents, phones, clothing. Fits in a shoebox.", max_weight_kg: 2, price_ngwee: 5000 },
  { size: "medium", label: "Medium parcel", description: "Shoes, small electronics, groceries bag.", max_weight_kg: 5, price_ngwee: 8500 },
  { size: "large", label: "Large parcel", description: "Bulky items up to the size of a suitcase.", max_weight_kg: 15, price_ngwee: 13000 },
];

export async function getTariffs(): Promise<Tariff[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("tariffs");

  const supabase = getSupabase();
  if (!supabase) return defaultTariffs;
  const { data, error } = await supabase
    .from("tariffs")
    .select("size, label, description, max_weight_kg, price_ngwee")
    .order("price_ngwee");
  return error || !data?.length ? defaultTariffs : data;
}

export async function getPickupPoints(): Promise<PickupPoint[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("locations");

  const supabase = getSupabase();
  if (!supabase) return [];
  const { data } = await supabase
    .from("locations")
    .select("code, name, kind, area, address, opening_hours")
    .eq("city", "Lusaka")
    .eq("is_active", true)
    .order("area");
  return data ?? [];
}

export function formatKwacha(ngwee: number) {
  return `K${(ngwee / 100).toLocaleString("en-ZM", { maximumFractionDigits: 2 })}`;
}
