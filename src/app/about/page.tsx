import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SchemaScript } from "@/components/site/schema-script";
import { business, reviews } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About OJ Junk Removal",
  description:
    "Learn about OJ Junk Removal, a fast, local Atlanta Metro junk removal company focused on clear quotes, careful hauling, and responsible disposal.",
  alternates: {
    canonical: "/about"
  }
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About OJ Junk Removal",
  url: `${business.domain}/about`,
  mainEntity: {
    "@type": "LocalBusiness",
    name: business.name,
    telephone: business.phone,
    email: business.email,
    areaServed: business.area
  }
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <span className="tagline">About the crew</span>
          <h1>Local junk removal with fast quotes and careful cleanup.</h1>
          <p>
            OJ Junk Removal helps Atlanta Metro customers clear unwanted clutter without the slow callback cycle. The
            team is built around simple scheduling, photo-friendly estimates, safe hauling, and respectful cleanup.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="split-copy reveal">
            <span className="tagline">Why OJ exists</span>
            <h2>People do not want junk removal drama. They want the pile gone.</h2>
            <p>
              Moves, renovations, cleanouts, and garage resets already create enough stress. OJ Junk Removal focuses on
              the part customers care about most: quick communication, a clear estimate, careful loading, and a space
              that feels usable again.
            </p>
            <p>
              The service flyers say it plainly: leave it to skilled junk removal experts to handle everything from
              cluttered basements to packed garages. The new site keeps that promise front and center.
            </p>
            <div className="hero-actions">
              <Link href="/quote" className="btn btn-primary">
                Book a Cleanup
              </Link>
              <a href={business.phoneHref} className="btn btn-secondary">
                Call {business.phone}
              </a>
            </div>
          </div>
          <div className="photo-frame reveal">
            <Image
              src="/images/jobs/job-35.png"
              alt="OJ Junk Removal completed cleanup proof photo"
              fill
              sizes="(max-width: 1120px) 100vw, 45vw"
            />
          </div>
        </div>
      </section>

      <section className="section section-green">
        <div className="container">
          <div className="section-header center reveal">
            <h2>The OJ standard.</h2>
            <p>Simple principles that make local junk removal easier to trust.</p>
          </div>
          <div className="value-grid">
            {[
              {
                title: "Quote with context",
                text: "Photos, access notes, and item details help the team price the job before the truck is on site."
              },
              {
                title: "Respect the property",
                text: "The crew plans the safest path, protects the pickup area where practical, and avoids careless dragging."
              },
              {
                title: "Recycle when possible",
                text: "Reusable items, metal, and recyclable materials are routed responsibly when local options make sense."
              },
              {
                title: "Move quickly",
                text: "Same-day routes are a core conversion point because many customers need the space back now."
              }
            ].map((item) => (
              <article className="value-card reveal" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="split-copy reveal">
            <span className="tagline">What customers noticed</span>
            <h2>Speed matters, but so does how the crew shows up.</h2>
            <p>
              The review themes are consistent: fast response, clear quoting, on-time arrival, respectful treatment of
              property, and efficient removal.
            </p>
          </div>
          <div className="review-grid">
            {reviews.slice(0, 2).map((review) => (
              <article className="review-card reveal" key={review.name}>
                <div className="stars" aria-label="5 out of 5 stars">
                  *****
                </div>
                <blockquote>{review.text}</blockquote>
                <footer>
                  {review.name} - {review.date}
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SchemaScript data={aboutSchema} />
    </>
  );
}
