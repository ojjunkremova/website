import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";

import { CalendlyEmbed } from "@/components/site/calendly-embed";
import { business } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Get a Free Junk Removal Quote",
  description:
    "Book a free OJ Junk Removal estimate through Calendly for Atlanta Metro furniture removal, appliance pickup, cleanouts, and hauling.",
  alternates: {
    canonical: "/quote"
  }
};

export default function QuotePage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <span className="tagline">Easy scheduling</span>
          <h1>Book your cleaning time.</h1>
          <p>
            Choose a time, describe what needs to go, and include photos if you have them. For urgent same-day pickup,
            call {business.phone} directly.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container quote-layout">
          <div className="split-copy reveal">
            <span className="tagline">Before you book</span>
            <h2>Photos help the crew quote faster.</h2>
            <p>
              The best estimate includes clear pictures of every pile, where the items are located, and any stairs,
              elevators, gates, parking limits, or heavy items.
            </p>
            <div className="contact-grid">
              <a className="contact-card" href={business.phoneHref}>
                <Phone size={24} />
                <h2>Call now</h2>
                <p>{business.phone}</p>
              </a>
              <a className="contact-card" href={business.emailHref}>
                <Mail size={24} />
                <h2>Email photos</h2>
                <p>{business.email}</p>
              </a>
            </div>
            <div className="bullet-panel">
              <h2>Include this if you can</h2>
              <ul className="check-list">
                <li>Photos of each pile</li>
                <li>Pickup city or neighborhood</li>
                <li>Inside, curbside, garage, apartment, or yard location</li>
                <li>Any stairs, elevator, or long carry details</li>
                <li>Large items like appliances, couches, mattresses, or renovation debris</li>
              </ul>
            </div>
          </div>
          <CalendlyEmbed />
        </div>
      </section>
    </>
  );
}
