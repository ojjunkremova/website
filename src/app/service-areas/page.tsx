import type { Metadata } from "next";
import Link from "next/link";

import { GoogleServiceMap } from "@/components/site/google-service-map";
import { SchemaScript } from "@/components/site/schema-script";
import { business, serviceAreaPages, serviceAreas } from "@/lib/site-data";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Atlanta Metro Junk Removal Service Areas",
  description:
    "OJ Junk Removal serves Atlanta, Peachtree Corners, Norcross, Duluth, Sandy Springs, Brookhaven, Decatur, Smyrna, Marietta, Roswell, Alpharetta, and Johns Creek.",
  alternates: {
    canonical: "/service-areas"
  }
};

const areaSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Atlanta Metro Junk Removal Service Areas",
  provider: {
    "@type": "LocalBusiness",
    name: business.name,
    telephone: business.phone
  },
  areaServed: serviceAreas.map((name) => ({ "@type": "Place", name }))
};

const areaListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: serviceAreaPages.map((area, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: `${area.city} Junk Removal`,
    url: absoluteUrl(`/service-areas/${area.slug}`)
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
      name: "Service Areas",
      item: absoluteUrl("/service-areas")
    }
  ]
};

export default function ServiceAreasPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <span className="tagline">Atlanta Metro routes</span>
          <h1>Fast junk removal across the Atlanta Metro Area.</h1>
          <p>
            OJ Junk Removal routes around Atlanta Metro neighborhoods for furniture removal, appliance pickup, cleanouts,
            yard debris, scrap metal, and same-day junk removal when scheduling allows.
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
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header reveal">
            <h2>Core service areas.</h2>
            <p>
              If you are near these communities, call or book online. Each city page gives Google and customers a more
              direct match for local junk removal searches while keeping the booking path simple.
            </p>
          </div>
          <div className="area-grid">
            {serviceAreaPages.map((area, index) => (
              <Link href={`/service-areas/${area.slug}`} className="area-card reveal" key={area.slug}>
                <h3>{area.city}</h3>
                <p>
                  Route {String(index + 1).padStart(2, "0")} - furniture, appliances, boxes, yard debris, and cleanout
                  hauling.
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-ink">
        <div className="container">
          <div className="section-header reveal">
            <h2>Google service map.</h2>
            <p>
              Browse the metro coverage visually, focus on a city, and jump straight into the matching local service page.
            </p>
          </div>
          <GoogleServiceMap areas={serviceAreaPages} />
        </div>
      </section>

      <section className="section section-green">
        <div className="container split">
          <div className="split-copy reveal">
            <span className="tagline">Not sure if you are covered?</span>
            <h2>Send the address area with your photos.</h2>
            <p>
              The fastest way to confirm availability is to share your city, photos of the junk, and any access details.
              OJ will confirm whether the route works and what the pickup should cost.
            </p>
          </div>
          <div className="bullet-panel reveal">
            <h2>Helpful booking details</h2>
            <ul className="check-list">
              <li>City or neighborhood</li>
              <li>Photos of all items</li>
              <li>Inside, curbside, garage, or yard pickup</li>
              <li>Stairs, elevator, gate, or parking notes</li>
              <li>Preferred pickup window</li>
            </ul>
          </div>
        </div>
      </section>

      <SchemaScript data={[areaSchema, areaListSchema, breadcrumbSchema]} />
    </>
  );
}
