export const site = {
  name: "LOCKRZ",
  company: "Yellowdrop Parcel Company Limited",
  city: "Lusaka",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  // International format without "+", e.g. 260971234567
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
};

/** Opens a WhatsApp chat with LOCKRZ, or a share sheet when no number is set. */
export function whatsappLink(message: string, to = site.whatsappNumber) {
  return `https://wa.me/${to}?text=${encodeURIComponent(message)}`;
}

export const shareMessage = `LOCKRZ is launching parcel delivery in Lusaka. Send and collect parcels near you. Join the launch list: ${site.url}`;

/** Normalises a Zambian mobile number to 2609XXXXXXXX / 2607XXXXXXXX, or null. */
export function normaliseZambianPhone(input: string) {
  let digits = input.replace(/\D/g, "");
  if (digits.startsWith("0")) digits = `260${digits.slice(1)}`;
  else if (digits.length === 9) digits = `260${digits}`;
  return /^260[79]\d{8}$/.test(digits) ? digits : null;
}
