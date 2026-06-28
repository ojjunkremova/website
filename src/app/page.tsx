import type { Metadata } from "next";
import { CalendarCheck, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { HaulAnimation } from "@/components/site/haul-animation";
import { ProofGallery } from "@/components/site/proof-gallery";
import { SchemaScript } from "@/components/site/schema-script";
import { ServiceIcon } from "@/components/site/service-icon";
import { business, serviceAreas, services, siteFaq } from "@/lib/site-data";
import { loadGoogleReviews } from "@/lib/google-reviews";

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

const featuredProof = [
  {
    src: "/images/proof-refresh/living-room-before-after.jpg",
    alt: "Before and after living room cleanup collage showing furniture and picture frames removed to reopen the floor around a brick fireplace.",
    badge: "Featured proof",
    title: "Real room-by-room before and after work",
    body: "These are the kinds of lived-in spaces people need cleared fast, without damage, drama, or guesswork."
  },
  {
    src: "/images/proof-refresh/driveway-clear-after.jpg",
    alt: "Clear driveway and front approach after pickup with the house exterior visible and no debris left behind.",
    badge: "Finished result",
    title: "A clean finish people actually notice",
    body: "The goal is not just loading the truck. It is leaving the space feeling usable again."
  }
];

export default async function HomePage() {
  const googleReviews = await loadGoogleReviews();
  const featuredGoogleReviews = googleReviews.slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy reveal">
            <span className="tagline">820+ 5-star reviews and fast Atlanta Metro routes</span>
            <h1>Serious junk removal for homes, rentals, and commercial properties.</h1>
            <p className="hero-lede">
              OJ Junk Removal clears furniture, appliances, garage clutter, move-out junk, renovation debris, and
              recurring property trash with fast quotes, careful loading, and same-day availability when routes allow.
            </p>
            <div className="answer-first">
              Need it gone quickly? Book a free estimate online or call {business.phone}. Send photos for a tighter
              quote, faster scheduling, and less back-and-forth.
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
                <strong>Monthly plans</strong>
                <span>available for commercial properties</span>
              </div>
            </div>
          </div>

          <div className="hero-visual reveal">
            <div className="hero-proof-board">
              <HaulAnimation />
              <div className="hero-photo-stack">
                {featuredProof.map((item, index) => (
                  <article className={`hero-photo${index === 1 ? " small" : ""}`} key={item.src}>
                    <span className="photo-badge">{item.badge}</span>
                    <Image src={item.src} alt={item.alt} fill sizes="(max-width: 1120px) 100vw, 38vw" priority={index === 0} />
                    <div className="hero-photo-caption">
                      <strong>{item.title}</strong>
                      <span>{item.body}</span>
                    </div>
                  </article>
                ))}
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
          <span>Move-outs</span>
          <span>Commercial pickups</span>
          <span>Yard debris</span>
          <span>Construction debris</span>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-header center reveal">
            <h2>No mystery. Just a clear path from clutter to clean.</h2>
            <p>
              Good local service sites convert when they feel direct and competent. Every step here is meant to reduce
              hesitation, tighten the quote, and get the job on the route faster.
            </p>
          </div>
          <div className="steps-grid">
            {[
              {
                title: "Send photos or book",
                text: "Upload photos through the quote flow or call the team. Photos help confirm volume, access, truck space, and labor."
              },
              {
                title: "Get a clear estimate",
                text: "OJ Junk Removal confirms the scope before work starts, including stairs, heavy items, cleanup type, and disposal needs."
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
              The best-converting service pages show range without sounding vague. OJ handles packed garages, furniture
              pickups, move-out cleanouts, recurring property overflow, and heavy mixed loads across the metro.
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
            <h2>Real before-and-after photos do more than a sales pitch ever will.</h2>
            <p>
              People book faster when they can see the difference for themselves. These are real OJ jobs: packed
              garages, room cleanouts, curbside loads, and finished spaces that look ready to use again.
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
              src="/images/proof-refresh/bedrooms-before-after.jpg"
              alt="Four-panel before and after collage showing two bedrooms cleared from furnished, cluttered spaces into empty move-out ready rooms."
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
              The strongest local-service trust signal is consistency. These review snippets help visitors see the same
              pattern: fast response, fair pricing, and a crew that handles the property with respect.
            </p>
          </div>
          <div className="review-grid">
            {featuredGoogleReviews.map((review) => (
              <article className="review-card reveal" key={`${review.name}-${review.date}`}>
                <div className="stars" aria-label="5 out of 5 stars">
                  {Array.from({ length: review.rating }, (_, index) => (
                    <span key={index}>★</span>
                  ))}
                </div>
                <blockquote>{review.text}</blockquote>
                <footer>
                  {review.name} - {review.date}
                  <small>
                    <a href={review.shareUrl} target="_blank" rel="noreferrer">
                      Verified Google review
                    </a>
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
            <h2>Recent job proof that looks real because it is.</h2>
            <p>
              The gallery mixes interior cleanouts, curbside loads, truck-day photos, and finished results so visitors
              can quickly understand range, scale, and the standard of work.
            </p>
          </div>
          <ProofGallery limit={8} compact />
        </div>
      </section>

      <section className="section section-ink">
        <div className="container split commercial-split">
          <div className="split-copy reveal">
            <span className="tagline">Commercial pickup plans</span>
            <h2>Monthly junk pickup for apartments, offices, and multi-unit properties.</h2>
            <p>
              OJ Junk Removal also works with property managers, landlords, and commercial sites that need dependable
              recurring pickup. Monthly plans can be built around unit count, turnover volume, access, and how often
              the property needs service.
            </p>
            <div className="hero-actions">
              <Link href="/quote" className="btn btn-primary">
                Ask About Monthly Rates
              </Link>
              <a href={business.phoneHref} className="btn btn-ghost">
                Call for Commercial Pricing
              </a>
            </div>
          </div>
          <div className="bullet-panel reveal commercial-panel">
            <h2>Built for recurring property needs</h2>
            <ul className="check-list">
              <li>Monthly service plans for commercial properties and larger complexes</li>
              <li>Per-unit pricing guidance for bigger apartment communities</li>
              <li>Help with turnovers, bulk-item areas, illegal dumping, and common-area overflow</li>
              <li>Flexible route scheduling for managers who need one reliable crew</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section section-green">
        <div className="container split">
          <div className="split-copy reveal">
            <span className="tagline">Atlanta Metro service routes</span>
            <h2>Local junk removal without the runaround.</h2>
            <p>
              OJ Junk Removal serves Atlanta Metro homeowners, renters, landlords, contractors, and property managers
              who want a direct answer and a crew that actually shows up ready to work.
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
              <li>Monthly commercial plans available</li>
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
              These are the questions people ask when they are close to booking. The copy stays direct so homeowners,
              landlords, and commercial managers can make a decision quickly.
            </p>
            <Link href="/quote" className="btn btn-primary">
              Book a Free Estimate
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
