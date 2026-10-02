import type { Metadata } from "next";
import Script from "next/script";
import { Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

const reviews = [
  { quote: "Customers consistently call out the crew’s speed and efficiency when clearing unwanted items.", detail: "Thumbtack customer feedback" },
  { quote: "Professional, easy to work with, and ready to help with the job at hand.", detail: "Thumbtack customer feedback" },
  { quote: "A 4.7-star rating across 751 reviews reflects the trust Atlanta-area customers place in OJ Junk Removal.", detail: "Thumbtack · 4.7 stars" }
] as const;

export default function FreeEstimatePage() {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-18403553117"
        strategy="afterInteractive"
      />
      <Script id="google-ads-conversion-tag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-18403553117');
        `}
      </Script>
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
              <a className="btn btn-primary" href={business.phoneHref}><Phone size={18} /> Call {business.phone}</a>
            </div>
          </div>
          <div className="estimate-contact-card">
            <span className="tagline">Ready when you are</span>
            <h2>Let&apos;s clear it out.</h2>
            <p>Call OJ Junk Removal for a fast, friendly quote and availability in the Atlanta Metro Area.</p>
            <a className="btn btn-primary" href={business.phoneHref}><Phone size={18} /> Call {business.phone}</a>
          </div>
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
        </div>
      </section>

      <section className="section estimate-reviews" aria-labelledby="estimate-reviews-heading">
        <div className="container">
          <div className="section-header center">
            <span className="tagline">Atlanta customer feedback</span>
            <h2 id="estimate-reviews-heading">See why customers call OJ.</h2>
            <p>Real feedback from OJ Junk Removal customers on Thumbtack.</p>
          </div>
          <div className="estimate-reviews-grid">
            {reviews.map((review) => (
              <article className="review-card" key={review.quote}>
                <div className="stars" aria-label="5 out of 5 stars">★★★★★</div>
                <blockquote>{review.quote}</blockquote>
                <footer>{review.detail}</footer>
              </article>
            ))}
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
