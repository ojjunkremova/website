import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SchemaScript } from "@/components/site/schema-script";
import { ServiceIcon } from "@/components/site/service-icon";
import { business, flyerImages, serviceFaq, services } from "@/lib/site-data";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Junk Removal Services in Atlanta Metro",
  description:
    "Explore OJ Junk Removal services including furniture removal, appliance removal, same-day junk pickup, cleanouts, construction debris, scrap metal recycling, and yard debris hauling.",
  alternates: {
    canonical: "/services"
  }
};

const serviceListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: services.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: service.title,
    url: absoluteUrl(`/services/${service.slug}`)
  }))
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: serviceFaq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer
    }
  }))
};

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <span className="tagline">Junk removal service menu</span>
          <h1>Atlanta Metro junk removal services with clear quotes.</h1>
          <p>
            OJ Junk Removal handles junk hauling, furniture removal, appliance pickup, scrap metal recycling,
            construction debris, move-out junk, yard debris, and whole-house cleanouts. Book a free estimate or call{" "}
            {business.phone}.
          </p>
          <div className="hero-actions">
            <Link href="/quote" className="btn btn-primary">
              Get a Free Quote
            </Link>
            <a href={business.phoneHref} className="btn btn-secondary">
              Call {business.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header reveal">
            <h2>Services from the flyers, expanded for search and booking.</h2>
            <p>
              The original flyers center on junk removal, scrap metal recycling, and furniture removal. The current site
              also lists appliances, construction debris, cleanouts, mattresses, office junk, yard debris, and same-day
              service, so the new site gives each one a clear answer and quote path.
            </p>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <Link href={`/services/${service.slug}`} className="service-card reveal" key={service.slug}>
                <div className="service-card-media">
                  <Image src={service.image} alt={`${service.title} proof image`} fill sizes="(max-width: 760px) 100vw, 33vw" />
                </div>
                <div className="service-card-body">
                  <div className="service-card-top">
                    <ServiceIcon type={service.icon} className="service-card-icon" />
                    <div>
                      <h3>{service.title}</h3>
                      <p>{service.answer}</p>
                    </div>
                  </div>
                  <div className="service-list">
                    {service.includes.slice(0, 5).map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-green">
        <div className="container">
          <div className="section-header center reveal">
            <h2>Original service flyers, organized for the web.</h2>
            <p>
              These are preserved as proof assets, but the new pages turn the repeated flyer details into searchable,
              answer-first service content.
            </p>
          </div>
          <div className="flyer-grid">
            {flyerImages.map((flyer) => (
              <figure className="flyer-card reveal" key={flyer.src}>
                <Image src={flyer.src} alt={flyer.alt} fill sizes="(max-width: 760px) 50vw, 25vw" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="split-copy reveal">
            <span className="tagline">What is included?</span>
            <h2>The crew loads, hauls, and disposes responsibly.</h2>
            <p>
              For most jobs, you do not need to rent a truck, drag furniture to the curb, or figure out where items go.
              OJ Junk Removal handles the labor and gives you a clear plan first.
            </p>
          </div>
          <div className="faq-list">
            {serviceFaq.map((item) => (
              <article className="faq-item reveal" key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SchemaScript data={[serviceListSchema, faqSchema]} />
    </>
  );
}
