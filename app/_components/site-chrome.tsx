import { site, whatsappLink } from "@/lib/site";
import { ArrowIcon, BrandWordmark, PinIcon, WhatsAppIcon } from "./icons";
import { MobileNav } from "./mobile-nav";

const navLinks = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#prices", label: "Prices" },
  { href: "#track", label: "Track a parcel" },
  { href: "#locations", label: "Pickup points" },
  { href: "#faq", label: "FAQ" },
];

export function SiteHeader() {
  return (
    <>
      <div className="topline">
        <div className="container topline-inner">
          <span className="topline-location"><PinIcon /> Now launching in Lusaka</span>
          {site.whatsappNumber && (
            <a className="topline-location" href={whatsappLink("Hi LOCKRZ, I have a question.")} target="_blank" rel="noopener">
              <WhatsAppIcon /> Chat with us on WhatsApp
            </a>
          )}
        </div>
      </div>

      <header className="site-header">
        <div className="container header-inner">
          <a className="wordmark" href="#home" aria-label="LOCKRZ home"><BrandWordmark /></a>
          <nav className="main-nav" aria-label="Main navigation">
            {navLinks.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
          </nav>
          <div className="header-actions">
            <a className="button button-dark header-cta" href="#join">
              Join the launch list <ArrowIcon />
            </a>
            <MobileNav
              links={navLinks}
              whatsappHref={site.whatsappNumber ? whatsappLink("Hi LOCKRZ, I have a question.") : null}
            />
          </div>
        </div>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <a className="wordmark" href="#home"><BrandWordmark /></a>
          <p>Parcel delivery for Lusaka.<br />A {site.company} service.</p>
        </div>
        <div className="footer-links">
          <div>
            <strong>EXPLORE</strong>
            <a href="#how-it-works">How it works</a>
            <a href="#prices">Prices</a>
            <a href="#faq">FAQ</a>
          </div>
          <div>
            <strong>GET STARTED</strong>
            <a href="#join">Join the launch list</a>
            <a href="#track">Track a parcel</a>
            {site.whatsappNumber && <a href={whatsappLink("Hi LOCKRZ, I have a question.")} target="_blank" rel="noopener">WhatsApp us</a>}
          </div>
        </div>
      </div>
      <div className="container footer-bottom"><span>© 2026 {site.company.toUpperCase()}</span><span>MADE IN LUSAKA, FOR LUSAKA.</span></div>
    </footer>
  );
}
