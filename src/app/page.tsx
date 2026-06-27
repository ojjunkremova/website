import type { Metadata } from "next";
import { CalendarCheck, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { HaulAnimation } from "@/components/site/haul-animation";
import { ProofGallery } from "@/components/site/proof-gallery";
import { SchemaScript } from "@/components/site/schema-script";
import { ServiceIcon } from "@/components/site/service-icon";
import { business, reviews, serviceAreas, services, siteFaq } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Atlanta Metro Junk Removal and Same-Day Hauling",
  description:
    "OJ Junk Removal clears furniture, appliances, cleanouts, construction debris, yard debris, and move-out junk across the Atlanta Metro Area. Book a free quote.",
  alternates: {
    canonical: "/"
  }
};

const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: siteFaq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer
    }
  }))
};

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy reveal">
            <span className="tagline">820+ 5-star reviews and fast Atlanta Metro routes</span>
            <h1>Atlanta junk removal that clears the pile today.</h1>
            <p className="hero-lede">
              OJ Junk Removal removes furniture, appliances, boxes, renovation debris, yard waste, and whole
              cleanout piles with fast quotes, careful loading, and same-day availability when routes allow.
            </p>
            <div className="answer-first">
              Need junk gone now? Book a free estimate online or call {business.phone}. Send photos for a faster,
              cleaner quote before the crew arrives.
            </div>
            <div className="hero-actions">
              <Link href="/quote" className="btn btn-primary">
                <CalendarCheck size={19} />
                Get a Free Quote
              </Link>
              <a href={business.phoneHref} className="btn btn-secondary">
                <Phone size={19} />
                Call {business.phone}
              </a>
            </div>
            <div className="hero-proof" aria-label="OJ Junk Removal trust signals">
              <div className="proof-stat">
                <strong>820+</strong>
                <span>5-star customer reviews</span>
              </div>
              <div className="proof-stat">
                <strong>Same-day</strong>
                <span>pickup when routes allow</span>
              </div>
              <div className="proof-stat">
                <strong>Photos</strong>
                <span>accepted for faster quotes</span>
              </div>
            </div>
          </div>

          <div className="hero-visual reveal">
            <HaulAnimation />
            <div className="hero-photo-stack">
              <div className="hero-photo">
                <span className="photo-badge">Before pickup</span>
                <Image
                  src="/images/jobs/job-09.webp"
                  alt="Before junk removal photo showing a backyard cleanup pile before pickup"
                  fill
                  sizes="(max-width: 1120px) 100vw, 38vw"
                  priority
                />
              </div>
              <div className="hero-photo small">
                <span className="photo-badge">After pickup</span>
                <Image
                  src="/images/jobs/job-08.webp"
                  alt="After junk removal photo showing the same backyard cleared and cleaned up"
                  fill
                  sizes="(max-width: 1120px) 100vw, 28vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="logo-strip">
        <div className="container logo-strip-inner">
          <strong>Full-service hauling</strong>
          <span>Furniture</span>
          <span>Appliances</span>
          <span>Scrap metal</span>
          <span>Move-outs</span>
          <span>Yard debris</span>
          <span>Construction debris</span>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-header center reveal">
            <h2>No mystery. Just a clear path from clutter to clean.</h2>
            <p>
              The site should work the same way the service does: direct, fast, and easy to trust. Every step is built
              around getting your quote right and getting your space back.
            </p>
          </div>
          <div className="steps-grid">
            {[
              {
                title: "Send photos or book",
                text: "Upload photos through the quote flow or call the team. Photos help confirm volume, access, and truck space."
              },
              {
                title: "Get a clear estimate",
                text: "OJ Junk Removal confirms the scope before work starts, including stairs, heavy items, and disposal needs."
              },
              {
                title: "The crew hauls and tidies",
                text: "The team loads the junk, hauls it away, and leaves the pickup area cleaner whenever practical."
              }
            ].map((step, index) => (
              <article className="step-card reveal" key={step.title}>
                <span>{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-green">
        <div className="container">
          <div className="section-header reveal">
            <h2>Junk removal services built for real Atlanta jobs.</h2>
            <p>
              The flyers, current site, and review details all point to the same core promise: skilled junk removal
              experts who handle cluttered basements, packed garages, furniture, scrap metal, and full cleanouts.
            </p>
          </div>
          <div className="service-grid">
            {services.slice(0, 6).map((service) => (
              <Link href={`/services/${service.slug}`} className="service-card reveal" key={service.slug}>
                <div className="service-card-media">
                  <Image src={service.image} alt={`${service.title} by OJ Junk Removal`} fill sizes="(max-width: 760px) 100vw, 33vw" />
                </div>
                <div className="service-card-body">
                  <div className="service-card-top">
                    <ServiceIcon type={service.icon} className="service-card-icon" />
                    <div>
                      <h3>{service.title}</h3>
                      <p>{service.summary}</p>
                    </div>
                  </div>
                  <div className="service-list" aria-label={`${service.title} examples`}>
                    {service.includes.slice(0, 4).map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="split-copy reveal">
            <span className="tagline">Proof before polish</span>
            <h2>Real job photos keep the quote honest.</h2>
            <p>
              Good junk removal sites should not hide behind generic stock photos. OJ has actual job images, before and
              after cleanup shots, and visible proof that the team handles messy spaces without drama.
            </p>
            <div className="hero-actions">
              <Link href="/reviews" className="btn btn-secondary">
                See Reviews and Job Photos
              </Link>
              <Link href="/quote" className="btn btn-primary">
                Start My Quote
              </Link>
            </div>
          </div>
          <div className="photo-frame reveal">
            <Image
              src="/images/jobs/job-26.webp"
              alt="Clean driveway after junk removal service"
              fill
              sizes="(max-width: 1120px) 100vw, 45vw"
            />
          </div>
        </div>
      </section>

      <section className="section section-ink">
        <div className="container">
          <div className="section-header reveal">
            <h2>Customers call out speed, respect, and clean work.</h2>
            <p>
              These are the review snippets you provided from Thumbtack, surfaced with enough context for a visitor to
              understand the job, not just see a rating badge.
            </p>
          </div>
          <div className="review-grid">
            {reviews.map((review) => (
              <article className="review-card reveal" key={review.name}>
                <div className="stars" aria-label="5 out of 5 stars">
                  *****
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

      <section className="section">
        <div className="container">
          <div className="section-header center reveal">
            <h2>Before and after job gallery.</h2>
            <p>
              A quick sample from the full reviews page. The gallery uses contained frames so vertical phone images stay
              readable instead of getting over-cropped.
            </p>
          </div>
          <ProofGallery limit={8} compact />
        </div>
      </section>

      <section className="section section-green">
        <div className="container split">
          <div className="split-copy reveal">
            <span className="tagline">Atlanta Metro service routes</span>
            <h2>Local junk removal without the runaround.</h2>
            <p>
              OJ Junk Removal serves Atlanta Metro homeowners, renters, landlords, contractors, and small businesses
              that need a direct answer and a fast cleanup plan.
            </p>
            <div className="area-grid">
              {serviceAreas.map((area) => (
                <div className="area-card" key={area}>
                  <h3>{area}</h3>
                </div>
              ))}
            </div>
          </div>
          <div className="bullet-panel reveal">
            <h2>Why people book OJ</h2>
            <ul className="check-list">
              <li>Same-day service when the route allows</li>
              <li>Furniture, appliances, scrap metal, and cleanouts</li>
              <li>Free estimates with photos welcome</li>
              <li>Recycling and donation prioritized when practical</li>
              <li>Respectful loading and property-conscious crews</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="split-copy reveal">
            <span className="tagline">Questions before booking</span>
            <h2>Fast answers reduce quote hesitation.</h2>
            <p>
              The homepage includes structured FAQ content for both visitors and search engines, with answer-first
              language that matches the way people compare local junk removal companies.
            </p>
            <Link href="/quote" className="btn btn-primary">
              Book the Free Estimate
            </Link>
          </div>
          <div className="faq-list">
            {siteFaq.map((item) => (
              <article className="faq-item reveal" key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SchemaScript data={homeFaqSchema} />
    </>
  );
}
