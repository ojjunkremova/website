import type { Metadata } from "next";
import { CalendarCheck, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProofGallery } from "@/components/site/proof-gallery";
import { SchemaScript } from "@/components/site/schema-script";
import { ServiceIcon } from "@/components/site/service-icon";
import { business, services } from "@/lib/site-data";
import { absoluteUrl } from "@/lib/utils";

type ServiceDetailProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServiceDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return {};
  }

  return {
    title: `${service.title} in Atlanta Metro`,
    description: service.answer,
    keywords: [
      `${service.navTitle.toLowerCase()} atlanta`,
      `${service.navTitle.toLowerCase()} atlanta metro`,
      `${service.navTitle.toLowerCase()} near me`,
      "junk removal atlanta"
    ],
    alternates: {
      canonical: `/services/${service.slug}`
    },
    openGraph: {
      title: `${service.title} | OJ Junk Removal`,
      description: service.answer,
      images: [
        {
          url: service.image,
          alt: `${service.title} by OJ Junk Removal`
        }
      ]
    }
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
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
        name: "Services",
        item: absoluteUrl("/services")
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: absoluteUrl(`/services/${service.slug}`)
      }
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.answer,
    serviceType: service.title,
    provider: {
      "@type": "LocalBusiness",
      name: business.name,
      telephone: business.phone,
      url: business.domain
    },
    areaServed: {
      "@type": "Place",
      name: business.area
    },
    url: absoluteUrl(`/services/${service.slug}`)
  };

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <span className="tagline">{service.eyebrow}</span>
          <h1>{service.title} in the Atlanta Metro Area.</h1>
          <p>{service.answer}</p>
          <div className="hero-actions">
            <Link href="/quote" className="btn btn-primary">
              <CalendarCheck size={18} />
              Get a Free Quote
            </Link>
            <a href={business.phoneHref} className="btn btn-secondary">
              <Phone size={18} />
              Call {business.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container service-detail-grid">
          <div className="service-detail-main">
            <div className="answer-first reveal">{service.answer}</div>

            <div className="photo-frame reveal">
              <Image src={service.image} alt={`${service.title} service proof`} fill sizes="(max-width: 1120px) 100vw, 58vw" />
            </div>

            <div className="bullet-panel reveal">
              <ServiceIcon type={service.icon} className="service-card-icon" />
              <h2>What OJ can remove</h2>
              <ul className="check-list">
                {service.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="bullet-panel reveal">
              <h2>Best fit for</h2>
              <ul className="check-list">
                {service.bestFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="faq-list">
              {service.faq.map((item) => (
                <article className="faq-item reveal" key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
          </div>

          <aside className="sticky-quote reveal">
            <h2>Ready for a quote?</h2>
            <p>
              Send photos, note stairs or access issues, and OJ Junk Removal will confirm the fastest route to clearing
              it out.
            </p>
            <Link href="/quote" className="btn btn-primary">
              Book Free Estimate
            </Link>
            <a href={business.phoneHref} className="btn btn-ghost">
              Call {business.phone}
            </a>
          </aside>
        </div>
      </section>

      <section className="section section-green">
        <div className="container">
          <div className="section-header center reveal">
            <h2>Recent job photo proof.</h2>
            <p>Representative before and after images from local OJ Junk Removal jobs.</p>
          </div>
          <ProofGallery limit={6} compact />
        </div>
      </section>

      <SchemaScript data={[serviceSchema, faqSchema, breadcrumbSchema]} />
    </>
  );
}
