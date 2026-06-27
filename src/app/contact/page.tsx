import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

import { business, serviceAreas } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact OJ Junk Removal",
  description:
    "Call, email, or book OJ Junk Removal for Atlanta Metro junk removal, hauling, furniture removal, appliance pickup, and cleanouts.",
  alternates: {
    canonical: "/contact"
  }
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <span className="tagline">Contact OJ</span>
          <h1>Call, email, or book your junk removal quote.</h1>
          <p>
            For fastest service, call {business.phone}. For a cleaner estimate, send photos of the pile and include your
            city, access details, and preferred pickup timing.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <a className="contact-card reveal" href={business.phoneHref}>
            <Phone size={28} />
            <h2>Phone</h2>
            <p>{business.phone}</p>
          </a>
          <a className="contact-card reveal" href={business.emailHref}>
            <Mail size={28} />
            <h2>Email</h2>
            <p>{business.email}</p>
          </a>
          <a className="contact-card reveal" href={business.facebook} target="_blank" rel="noreferrer">
            <MessageCircle size={28} />
            <h2>Facebook</h2>
            <p>Message OJ Junk Removal on Facebook.</p>
          </a>
          <a className="contact-card reveal" href={business.thumbtack} target="_blank" rel="noreferrer">
            <MapPin size={28} />
            <h2>Thumbtack</h2>
            <p>View the profile and customer review history.</p>
          </a>
        </div>
      </section>

      <section className="section section-green">
        <div className="container split">
          <div className="split-copy reveal">
            <span className="tagline">Fastest route to a quote</span>
            <h2>Send photos before the appointment.</h2>
            <p>
              Photos of the pile make it easier to estimate volume and avoid surprises. Include any stairs, elevators,
              parking constraints, or heavy items in your message.
            </p>
            <div className="hero-actions">
              <Link href="/quote" className="btn btn-primary">
                Open Booking Calendar
              </Link>
              <a href={business.phoneHref} className="btn btn-secondary">
                Call {business.phone}
              </a>
            </div>
          </div>
          <div className="bullet-panel reveal">
            <h2>Service areas include</h2>
            <ul className="check-list">
              {serviceAreas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
