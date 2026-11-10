"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowIcon, WhatsAppIcon } from "./icons";

type NavLink = { href: string; label: string };

export function MobileNav({ links, whatsappHref }: { links: NavLink[]; whatsappHref: string | null }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && close();
    // The menu only exists below the desktop breakpoint.
    const desktop = window.matchMedia("(min-width: 960px)");
    document.documentElement.classList.add("menu-open");
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", close);
    return () => {
      document.documentElement.classList.remove("menu-open");
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", close);
    };
  }, [open]);

  return (
    <>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
      >
        <span /><span /><span />
      </button>

      {/* Rendered on <body> so it dims the page behind the sticky header. */}
      {open && createPortal(<div className="menu-backdrop" onClick={() => setOpen(false)} aria-hidden="true" />, document.body)}

      <nav id="mobile-menu" className="mobile-menu" data-open={open} aria-label="Mobile navigation" inert={!open}>
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setOpen(false)}>{link.label} <ArrowIcon /></a>
            </li>
          ))}
        </ul>
        <a className="button button-yellow" href="#join" onClick={() => setOpen(false)}>
          Join the launch list <ArrowIcon />
        </a>
        {whatsappHref && (
          <a className="button button-whatsapp" href={whatsappHref} target="_blank" rel="noopener">
            <WhatsAppIcon /> Chat on WhatsApp
          </a>
        )}
      </nav>
    </>
  );
}
