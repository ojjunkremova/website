import type { Metadata } from "next";
import { CalendarCheck, Star } from "lucide-react";
import Link from "next/link";

import { ProofGallery } from "@/components/site/proof-gallery";
import { SchemaScript } from "@/components/site/schema-script";
import { business, jobImages, reviews } from "@/lib/site-data";
import { absoluteUrl, formatDateIso } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Reviews and Before After Job Photos",
  description:
    "See OJ Junk Removal reviews, Thumbtack customer feedback, and real before and after job photos from Atlanta Metro junk removal work.",
  alternates: {
    canonical: "/reviews"
  }
};

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
    reviewCount: "820",
    bestRating: "5"
  },
  review: reviews.map((review) => ({
    "@type": "Review",
    author: {
      "@type": "Person",
      name: review.name
    },
    datePublished: formatDateIso(review.date),
    reviewBody: review.text,
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5"
    }
  }))
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

export default function ReviewsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <span className="tagline">Customer proof</span>
          <h1>OJ Junk Removal reviews and real job photos.</h1>
          <p>
            OJ Junk Removal has 820+ 5-star reviews, with customers calling out fast quotes, same-day arrivals,
            respectful crews, and clean removal work. This page pairs those reviews with real before and after photos.
          </p>
          <div className="hero-actions">
            <Link href="/quote" className="btn btn-primary">
              <CalendarCheck size={18} />
              Book a Cleanup
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
            <h2>Recent customer feedback.</h2>
            <p>
              These reviews are the exact snippets you provided. They are framed as real job context instead of generic
              testimonial filler.
            </p>
          </div>
          <div className="review-grid">
            {reviews.map((review) => (
              <article className="review-card reveal" key={review.name}>
                <div className="stars" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star key={index} size={18} fill="currentColor" />
                  ))}
                </div>
                <blockquote>{review.text}</blockquote>
                <footer>
                  {review.name} - {review.date}
                  <small>
                    {review.source}. {review.detail}
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
            <h2>{jobImages.length} job photos from the before and after folder.</h2>
            <p>
              The gallery uses contained image frames so tall phone screenshots, wide yard photos, and square job shots
              stay readable. Nothing is cropped so tightly that the cleanup context disappears.
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
                Get a Free Quote
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
