import type { Metadata } from "next";
import { CalendarCheck, Phone } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SchemaScript } from "@/components/site/schema-script";
import { business, serviceAreaPages, services } from "@/lib/site-data";
import { absoluteUrl } from "@/lib/utils";

type ServiceAreaDetailProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return serviceAreaPages.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: ServiceAreaDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const area = serviceAreaPages.find((item) => item.slug === slug);

  if (!area) {
    return {};
  }

  const title = `${area.city} Junk Removal | Same-Day Pickup`;
  const description = `${area.city} junk removal for furniture, appliances, cleanouts, yard debris, and hauling. Call OJ Junk Removal for a free quote and fast metro scheduling.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/service-areas/${area.slug}`
    },
    openGraph: {
      title: `${title} | OJ Junk Removal`,
      description,
      url: absoluteUrl(`/service-areas/${area.slug}`),
      images: [
        {
          url: business.ogImage,
          alt: `${area.city} junk removal by OJ Junk Removal`
        }
      ]
    }
  };
}

export default async function ServiceAreaDetailPage({ params }: ServiceAreaDetailProps) {
  const { slug } = await params;
  const area = serviceAreaPages.find((item) => item.slug === slug);

  if (!area) {
    notFound();
  }

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
        name: "Service Areas",
        item: absoluteUrl("/service-areas")
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${area.city} Junk Removal`,
        item: absoluteUrl(`/service-areas/${area.slug}`)
      }
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${area.city} Junk Removal`,
    serviceType: "Junk Removal",
    areaServed: {
      "@type": "City",
      name: area.city
    },
    provider: {
      "@type": "LocalBusiness",
      name: business.name,
      url: business.domain,
      telephone: business.phone
    },
    description: `${area.localFocus} ${area.intro}`,
    url: absoluteUrl(`/service-areas/${area.slug}`)
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Do you offer same-day junk removal in ${area.city}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Same-day junk removal in ${area.city} is often available when route capacity, item volume, and disposal needs line up. Calling early and sending photos helps confirm timing faster.`
        }
      },
      {
        "@type": "Question",
        name: `What items can OJ Junk Removal pick up in ${area.city}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `OJ Junk Removal picks up furniture, appliances, household clutter, yard debris, construction debris, mattresses, and mixed cleanout items in ${area.city}, subject to safe handling and disposal rules.`
        }
      },
      {
        "@type": "Question",
        name: `How do I get a junk removal quote in ${area.city}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The fastest quote usually comes from sending photos, your ${area.city} pickup location, and any stairs, elevator, gate, or parking details. OJ Junk Removal can then confirm the best next step.`
        }
      }
    ]
  };

  const featuredServices = services.slice(0, 4);

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <span className="tagline">{area.city} service area</span>
          <h1>{area.city} junk removal with fast quotes and full-service hauling.</h1>
          <p>{area.localFocus}</p>
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
        <div className="container split">
          <div className="split-copy reveal">
            <span className="tagline">Local pickup details</span>
            <h2>{area.city} junk removal that starts with a clear answer.</h2>
            <p>{area.intro}</p>
            <p>
              For the fastest estimate in {area.city}, send photos of the pile, where the junk is located, and any
              access details that affect labor or truck placement. That usually leads to a faster and more accurate
              quote.
            </p>
          </div>
          <div className="bullet-panel reveal">
            <h2>Most requested jobs in {area.city}</h2>
            <ul className="check-list">
              <li>Furniture removal and couch pickup</li>
              <li>Appliance hauling and recycling help</li>
              <li>Garage, attic, and move-out cleanouts</li>
              <li>Yard debris and outdoor clutter removal</li>
              <li>Construction debris and post-project cleanup</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section section-green">
        <div className="container">
          <div className="section-header reveal">
            <h2>Popular junk removal services near {area.city}.</h2>
            <p>
              These service pages support broader Atlanta Metro rankings while helping customers in {area.city} jump
              straight to the type of pickup they need.
            </p>
          </div>
          <div className="area-grid">
            {featuredServices.map((service) => (
              <Link href={`/services/${service.slug}`} className="area-card reveal" key={service.slug}>
                <h3>{service.navTitle}</h3>
                <p>{service.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="split-copy reveal">
            <span className="tagline">Questions before booking</span>
            <h2>How pickup works in {area.city}.</h2>
            <p>
              OJ Junk Removal keeps the process simple: share photos, confirm the scope, choose a time, and let the
              crew handle the loading and hauling.
            </p>
          </div>
          <div className="faq-list">
            {[
              {
                question: `Can you remove junk from inside my home in ${area.city}?`,
                answer:
                  "Yes. Many jobs include inside pickup from garages, basements, rooms, apartments, and storage areas. Mention stairs or tight access during the estimate."
              },
              {
                question: `Do you recycle or donate items from ${area.city} pickups?`,
                answer:
                  "When items are reusable or recyclable and local options are available, OJ Junk Removal prioritizes responsible disposal over sending everything to a landfill."
              },
              {
                question: `What should I send for a faster ${area.city} quote?`,
                answer:
                  "Photos of each pile, the pickup area, and any details about heavy items, appliances, mattresses, or construction debris are the most helpful."
              }
            ].map((item) => (
              <article className="faq-item reveal" key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SchemaScript data={[breadcrumbSchema, serviceSchema, faqSchema]} />
    </>
  );
}
