import { site, whatsappLink } from "@/lib/site";
import { Faq } from "./_components/faq";
import { ArrowIcon, PinIcon, WhatsAppIcon } from "./_components/icons";
import { PickupPoints } from "./_components/pickup-points";
import { LowestPrice, Pricing } from "./_components/pricing";
import { ShareButton } from "./_components/share-button";
import { SiteFooter, SiteHeader } from "./_components/site-chrome";
import { TrackingForm } from "./_components/tracking-form";
import { WaitlistForm } from "./_components/waitlist-form";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero" id="home">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow"><span /> COMING SOON TO LUSAKA</div>
              <h1>Moving Lusaka<br />one <span>parcel</span> at a time.</h1>
              <p className="hero-description">
                Drop off a parcel near you. We carry it across town. The person
                receiving it collects it near them, with a code, when it suits them.
              </p>
              <div className="hero-actions">
                <a className="button button-yellow" href="#join">
                  Join the launch list <ArrowIcon />
                </a>
                <a className="text-link" href="#how-it-works">
                  See how it works <ArrowIcon />
                </a>
              </div>
              <div className="hero-proof">
                <p><strong>Flat prices from <LowestPrice />.</strong><br />One price anywhere in Lusaka.</p>
              </div>
            </div>

            <div className="hero-visual" aria-label="Illustration of a parcel moving across Lusaka">
              <div className="visual-orbit orbit-one" />
              <div className="visual-orbit orbit-two" />
              <div className="map-label label-top"><span className="map-dot" /> MATERO</div>
              <div className="map-label label-bottom"><span className="map-dot" /> KABULONGA</div>
              <svg className="route-line" viewBox="0 0 470 350" fill="none" aria-hidden="true">
                <path d="M110 245C162 216 163 134 234 138C301 141 300 236 365 208" stroke="#0D7755" strokeWidth="2" strokeDasharray="5 7" />
                <circle cx="110" cy="245" r="6" fill="#F7C948" stroke="#fff" strokeWidth="4" />
                <circle cx="365" cy="208" r="6" fill="#F7C948" stroke="#fff" strokeWidth="4" />
              </svg>
              <div className="parcel-box">
                <div className="parcel-tape" />
                <div className="parcel-stamp">L<span>↗</span></div>
              </div>
              <div className="route-card">
                <div className="route-card-icon"><PinIcon /></div>
                <div><strong>On its way</strong><span>Matero → Kabulonga</span></div>
                <span className="route-card-check">✓</span>
              </div>
              <div className="visual-caption">ACROSS TOWN, SORTED.</div>
            </div>
          </div>
          <div className="hero-bottom container">
            <span>STARTING IN LUSAKA</span>
            <div className="hero-town-list"><span>Town</span><i /> <span>Chilenje</span><i /> <span>Matero</span><i /> <span>Woodlands</span></div>
          </div>
        </section>

        <section className="benefit-strip" aria-label="Service benefits">
          <div className="container benefit-grid">
            <div><span className="benefit-icon">↗</span><p><strong>Drop off nearby</strong><span>At a LOCKRZ point in your area</span></p></div>
            <div><span className="benefit-icon">◎</span><p><strong>Know where it is</strong><span>Track every step online</span></p></div>
            <div><span className="benefit-icon">◷</span><p><strong>Collect on your time</strong><span>With a code sent to your phone</span></p></div>
          </div>
        </section>

        <section className="section services-section" id="services">
          <div className="container">
            <div className="section-heading">
              <div><div className="eyebrow"><span /> SIMPLE LOCAL DELIVERY</div><h2>Send it. Track it. Collect it.</h2></div>
              <p>No waiting at home for a driver. Parcels wait safely at a LOCKRZ point until you&apos;re ready.</p>
            </div>
            <div className="service-grid">
              <article className="service-card service-featured">
                <div className="service-card-top"><span className="service-number">01 / SEND</span><span className="service-symbol">↗</span></div>
                <div className="service-illustration illustration-send"><span className="mini-box">L</span><span className="illustration-arrow">→</span><span className="mini-pin"><PinIcon /></span></div>
                <h3>Send a parcel</h3>
                <p>Bring your parcel to a LOCKRZ point. We weigh it, label it and send it across Lusaka.</p>
                <a href="#prices" className="card-link">See prices <ArrowIcon /></a>
              </article>
              <article className="service-card">
                <div className="service-card-top"><span className="service-number">02 / COLLECT</span><span className="service-symbol">⌖</span></div>
                <div className="service-illustration illustration-collect"><span className="locker-shape"><i /><i /><i /><i /></span><span className="collect-check">✓</span></div>
                <h3>Collect with a code</h3>
                <p>When your parcel arrives you get a message with a code. Collect it whenever it suits your day.</p>
                <a href="#locations" className="card-link">Pickup points <ArrowIcon /></a>
              </article>
              <article className="service-card">
                <div className="service-card-top"><span className="service-number">03 / TRACK</span><span className="service-symbol">◎</span></div>
                <div className="service-illustration illustration-track"><div className="track-screen"><span>DELIVERY STATUS</span><i /><i /><i /></div><span className="track-lens" /></div>
                <h3>Track every step</h3>
                <p>Use your tracking number to see where your parcel is, from drop-off to collection.</p>
                <a href="#track" className="card-link">Track a parcel <ArrowIcon /></a>
              </article>
            </div>
          </div>
        </section>

        <section className="journey-section" id="how-it-works">
          <div className="container journey-layout">
            <div className="journey-intro">
              <div className="eyebrow eyebrow-light"><span /> HOW IT WORKS</div>
              <h2>Three steps.<br />No <span>guesswork.</span></h2>
              <p>From your hands to theirs, across Lusaka.</p>
              <a href="#join" className="button button-yellow">Join the launch list <ArrowIcon /></a>
            </div>
            <div className="journey-steps">
              <article className="journey-step"><span className="step-count">01</span><span className="step-icon">▣</span><div><h3>Drop your parcel</h3><p>Bring it to a LOCKRZ point near you. Tell us who it&apos;s for and their phone number. You get a tracking number.</p></div><span className="step-status">NEAR YOU</span></article>
              <article className="journey-step"><span className="step-count">02</span><span className="step-icon">⌁</span><div><h3>We move it across town</h3><p>Our couriers carry it to the LOCKRZ point closest to the person receiving it.</p></div><span className="step-status">TRACK IT ONLINE</span></article>
              <article className="journey-step"><span className="step-count">03</span><span className="step-icon">✓</span><div><h3>They collect with a code</h3><p>They get a message with a collection code and pick it up when it suits them.</p></div><span className="step-status">SAFE AND SIMPLE</span></article>
            </div>
          </div>
        </section>

        <section className="tools-section">
          <div className="container tools-grid">
            <article className="tool-card tracking-card" id="track">
              <div className="tool-label"><span className="tool-icon">◎</span> PARCEL TRACKING</div>
              <h2>Where&apos;s your parcel?</h2>
              <p>Enter the tracking number from your booking message.</p>
              <TrackingForm />
              <div className="tracking-note"><span>↗</span> Tracking numbers start with LZ-</div>
            </article>

            <article className="tool-card booking-card" id="prices">
              <div className="tool-label"><span className="tool-icon tool-icon-yellow">K</span> LUSAKA PRICES</div>
              <h2>Simple, flat prices.</h2>
              <p>Pay by parcel size, not distance.</p>
              <Pricing />
            </article>
          </div>
        </section>

        <section className="locations-section" id="locations">
          <div className="container locations-layout">
            <div className="locations-intro">
              <div className="eyebrow"><span /> CLOSE TO HOME</div>
              <h2>Pickup points<br /><span>near you.</span></h2>
              <p>LOCKRZ points are trusted local shops and smart lockers where you drop off and collect parcels. We&apos;re opening our first ones in Lusaka.</p>
              <a href="#join" className="text-link">Tell us where you need one <ArrowIcon /></a>
            </div>
            <PickupPoints />
          </div>
        </section>

        <section className="join-section" id="join">
          <div className="container join-layout">
            <div className="join-intro">
              <div className="eyebrow"><span /> BE FIRST IN LINE</div>
              <h2>Get a message<br />the day we <span>open.</span></h2>
              <p>Leave your name and number. We&apos;ll send you an SMS or WhatsApp message when LOCKRZ opens in your part of Lusaka.</p>
              <ul className="join-perks">
                <li>Be the first to send with LOCKRZ</li>
                <li>Help choose where pickup points open</li>
                <li>Shop owners: earn by becoming a LOCKRZ point</li>
              </ul>
              <div className="join-share">
                <ShareButton />
                {site.whatsappNumber && (
                  <a className="text-link" href={whatsappLink("Hi LOCKRZ, I'd like to know more.")} target="_blank" rel="noopener">
                    <WhatsAppIcon /> Ask us a question
                  </a>
                )}
              </div>
            </div>
            <div className="tool-card join-card">
              <WaitlistForm />
            </div>
          </div>
        </section>

        <Faq />


        <section className="cta-section">
          <div className="container cta-inner">
            <div><div className="eyebrow eyebrow-light"><span /> KNOW SOMEONE WHO SENDS PARCELS?</div><h2>Tell a friend<br />in <span>Lusaka.</span></h2></div>
            <div className="cta-actions"><p>Share LOCKRZ on WhatsApp.<br />The more sign-ups in an area, the sooner we open there.</p><ShareButton className="button button-yellow" /></div>
            <span className="cta-decoration" aria-hidden="true">L</span>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
