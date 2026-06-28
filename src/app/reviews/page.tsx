import type { Metadata } from "next";
import { CalendarCheck, Star } from "lucide-react";
import Link from "next/link";

import { ProofGallery } from "@/components/site/proof-gallery";
import { SchemaScript } from "@/components/site/schema-script";
import { business, jobImages } from "@/lib/site-data";
import { loadGoogleReviews } from "@/lib/google-reviews";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Reviews and Before After Job Photos",
  description:
    "See OJ Junk Removal Google reviews, customer feedback, and real Atlanta junk removal before and after photos from recent cleanup jobs.",
  alternates: {
    canonical: "/reviews"
  }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: business.domain
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Reviews",
      item: absoluteUrl("/reviews")
    }
  ]
};

export default async function ReviewsPage() {
  const googleReviews = await loadGoogleReviews();

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${business.domain}/#reviews`,
    name: business.name,
    url: business.domain,
    image: absoluteUrl(business.logo),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: String(googleReviews.length),
      bestRating: "5"
    },
    review: googleReviews.map((review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.name
      },
      reviewBody: review.text,
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(review.rating),
        bestRating: "5"
      }
    }))
  };

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <span className="tagline">Customer proof</span>
          <h1>89 Google reviews and real job photos.</h1>
          <p>
            Customers call out fast quotes, same-day arrivals, respectful crews, and clean removal work. This page
            pairs Google reviews with recent before and after photos from real OJ cleanup jobs.
          </p>
          <div className="hero-actions">
            <Link href="/quote" className="btn btn-primary">
              <CalendarCheck size={18} />
              Book a Cleaning
            </Link>
            <a href={business.thumbtack} target="_blank" rel="noreferrer" className="btn btn-secondary">
              View Thumbtack Profile
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header center reveal">
            <h2>Recent Google profile feedback.</h2>
            <p>
              These reviews are the exact snippets from the Google profile links you provided. They are framed as real
              job context instead of generic testimonial filler.
            </p>
          </div>
          <div className="review-grid">
            {googleReviews.map((review) => (
              <article className="review-card reveal" key={`${review.name}-${review.date}`}>
                <div className="stars" aria-label="5 out of 5 stars">
                  {Array.from({ length: review.rating }, (_, index) => (
                    <Star key={index} size={18} fill="currentColor" />
                  ))}
                </div>
                <blockquote>{review.text}</blockquote>
                <footer>
                  {review.name} - {review.date}
                  <small>
                    <a href={review.shareUrl} target="_blank" rel="noreferrer">
                      Google Maps review
                    </a>
                  </small>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-green">
        <div className="container">
          <div className="section-header reveal">
            <h2>{jobImages.length} real cleanup photos from recent OJ jobs.</h2>
            <p>
              These are the updated image files you provided, replacing the older text-overlay versions. The gallery
              keeps the full frame visible so visitors can actually understand the scope before and after pickup.
            </p>
          </div>
          <ProofGallery />
        </div>
      </section>

      <section className="section section-ink">
        <div className="container split">
          <div className="split-copy reveal">
            <span className="tagline">Ready when you are</span>
            <h2>Turn a review into your own cleanup.</h2>
            <p>
              Send photos, pick a quote time, or call the crew directly. The faster the team sees the pile, the faster
              they can quote the removal.
            </p>
          </div>
          <div className="bullet-panel reveal">
            <h2>Quote checklist</h2>
            <ul className="check-list">
              <li>Photos of each pile or room</li>
              <li>Pickup city or neighborhood</li>
              <li>Stairs, elevator, or long carry details</li>
              <li>Heavy items like appliances, mattresses, or construction debris</li>
            </ul>
            <div className="hero-actions" style={{ marginTop: 20 }}>
              <Link href="/quote" className="btn btn-primary">
                Book a Cleaning
              </Link>
              <a href={business.phoneHref} className="btn btn-secondary">
                Call {business.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <SchemaScript data={[reviewSchema, breadcrumbSchema]} />
    </>
  );
}
