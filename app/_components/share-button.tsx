"use client";

import { shareMessage, site, whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

/** Uses the phone's share sheet when available, otherwise opens WhatsApp to pick a contact. */
export function ShareButton({ className = "button button-whatsapp" }: { className?: string }) {
  async function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (!navigator.share) return;
    event.preventDefault();
    try {
      await navigator.share({ title: `${site.name} – Lusaka parcel delivery`, text: shareMessage });
    } catch {
      // Share sheet dismissed.
    }
  }

  return (
    <a className={className} href={whatsappLink(shareMessage, "")} target="_blank" rel="noopener" onClick={handleClick}>
      <WhatsAppIcon /> Share with a friend
    </a>
  );
}
