import { ImageResponse } from "next/og";

// Shown when the site link is shared on WhatsApp, Facebook, etc.
export const alt = "LOCKRZ – parcel delivery coming to Lusaka";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#073d31",
          color: "#fff",
        }}
      >
        <div style={{ display: "flex", fontSize: 44, fontWeight: 800, letterSpacing: -2 }}>
          LOCKRZ<span style={{ color: "#f7c948" }}>.</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 28, color: "#a9c5b6", letterSpacing: 4 }}>COMING SOON TO LUSAKA</div>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 800, lineHeight: 1.05, letterSpacing: -4, marginTop: 20 }}>
            Send it. Track it.
          </div>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 800, lineHeight: 1.05, letterSpacing: -4, color: "#f7c948" }}>
            Collect it.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#d6e5dc" }}>
          Flat parcel prices anywhere in Lusaka · Join the launch list
        </div>
      </div>
    ),
    size,
  );
}
