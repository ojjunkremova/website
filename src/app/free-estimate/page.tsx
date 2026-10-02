import type { Metadata } from "next";
import { ArrowRight, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { EstimateForm } from "@/components/site/estimate-form";
import { business } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Free Junk Removal Estimate",
  description: "Request a free junk removal estimate from OJ Junk Removal for Atlanta Metro homes, rentals, and businesses.",
  alternates: { canonical: "/free-estimate" }
};

const proofImages = [
  ["/images/proof-refresh/garage-packed-before.jpg", "Packed garage ready for a cleanout"],
  ["/images/proof-refresh/driveway-clear-after.jpg", "Clear driveway after junk removal"],
  ["/images/proof-refresh/living-room-before-after.jpg", "Living room cleared by OJ Junk Removal"]
] as const;

export default function FreeEstimatePage() {
  return (
    <>
      <section className="estimate-hero">
        <div className="container estimate-hero-grid">
          <div className="estimate-hero-copy">
            <span className="tagline">Get a free quote today</span>
            <h1>Get your junk removed today.</h1>
            <p>Ready to clear the clutter? Request your free estimate now. Same-day and next-day junk removal may be available across the Atlanta Metro Area.</p>
            <div className="estimate-benefits" aria-label="Estimate benefits">
              <span>Free estimates</span><span>Upfront pricing</span><span>Fast scheduling</span>
            </div>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#estimate-form">Get today&apos;s free estimate <ArrowRight size={18} /></a>
              <a className="btn btn-secondary" href={business.phoneHref}><Phone size={18} /> Call {business.phone}</a>
            </div>
          </div>
          <div id="estimate-form"><EstimateForm /></div>
        </div>
      </section>

      <section className="section estimate-proof">
        <div className="container">
          <div className="section-header center">
            <span className="tagline">Real Atlanta jobs</span>
            <h2>See what we can clear today.</h2>
            <p>Real completed work from the OJ Junk Removal crew.</p>
          </div>
          <div className="estimate-proof-grid">
            {proofImages.map(([src, alt]) => <div className="estimate-proof-image" key={src}><Image src={src} alt={alt} fill sizes="(max-width: 760px) 100vw, 33vw" /></div>)}
          </div>
          <div className="estimate-bottom-actions">
            <Link className="btn btn-primary" href="#estimate-form">Get a quote today</Link>
            <a className="btn btn-secondary" href={business.phoneHref}>Call for today&apos;s availability</a>
          </div>
        </div>
      </section>
    </>
  );
}
