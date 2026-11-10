import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "Send and collect parcels across Lusaka. Drop off near you, track every step, and collect with a code. Join the LOCKRZ launch list.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "LOCKRZ | Parcel delivery in Lusaka",
  description,
  openGraph: {
    title: "LOCKRZ is coming to Lusaka",
    description,
    siteName: "LOCKRZ",
    locale: "en_ZM",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
