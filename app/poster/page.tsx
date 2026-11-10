import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import QRCode from "qrcode";
import { site } from "@/lib/site";
import { BrandWordmark } from "../_components/icons";
import { PrintButton } from "./print-button";

export const metadata: Metadata = {
  title: "LOCKRZ poster",
  robots: { index: false },
};

// The ?ref=poster tag lets us count sign-ups that came from printed posters.
const posterUrl = `${site.url}/?ref=poster#join`;

async function getQrSvg() {
  "use cache";
  cacheLife("max");
  return QRCode.toString(posterUrl, { type: "svg", margin: 0, color: { dark: "#073d31", light: "#ffffff" } });
}

export default async function PosterPage() {
  const qrSvg = await getQrSvg();

  return (
    <main className="poster-page">
      <PrintButton />
      <article className="poster">
        <div className="poster-brand wordmark"><BrandWordmark /></div>
        <p className="poster-eyebrow">COMING SOON TO LUSAKA</p>
        <h1>Send parcels<br />across <span>Lusaka.</span></h1>

        <ol className="poster-steps">
          <li><b>1</b><span><strong>Drop off</strong> your parcel at a LOCKRZ point near you.</span></li>
          <li><b>2</b><span><strong>We carry it</strong> across town. Track it online.</span></li>
          <li><b>3</b><span><strong>They collect</strong> it near them with a code sent to their phone.</span></li>
        </ol>

        <div className="poster-bottom">
          <div className="poster-qr" dangerouslySetInnerHTML={{ __html: qrSvg }} />
          <div>
            <p className="poster-cta">Scan to join the launch list</p>
            <p>Get a message the day we open in your area.</p>
            <p className="poster-url">{site.url.replace(/^https?:\/\//, "")}</p>
            {site.whatsappNumber && <p className="poster-url">WhatsApp: +{site.whatsappNumber}</p>}
            <p className="poster-shop">Own a shop? Become a LOCKRZ point.</p>
          </div>
        </div>
      </article>
    </main>
  );
}
