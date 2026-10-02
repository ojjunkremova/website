import type { Metadata } from "next";
import Script from "next/script";
import { Phone } from "lucide-react";
import Link from "next/link";

import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { IntentPopup } from "@/components/site/intent-popup";
import { SchemaScript } from "@/components/site/schema-script";
import { business, serviceAreas, siteFaq } from "@/lib/site-data";
import { absoluteUrl } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(business.domain),
  title: {
    default: "OJ Junk Removal | Same-Day Junk Removal in Atlanta Metro",
    template: "%s | OJ Junk Removal"
  },
  description:
    "Top-rated Atlanta Metro junk removal for furniture, appliances, cleanouts, construction debris, yard debris, and same-day hauling. Call (404) 399-7457 or book a free quote.",
  applicationName: "OJ Junk Removal",
  keywords: [
    "junk removal Atlanta",
    "Atlanta junk removal",
    "same day junk removal Atlanta",
    "furniture removal Atlanta",
    "appliance removal Atlanta",
    "junk hauling Atlanta Metro",
    "cleanout services Atlanta"
  ],
  category: "Home Services",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "OJ Junk Removal | Same-Day Junk Removal in Atlanta Metro",
    description:
      "Fast, professional junk removal with 820+ 5-star reviews, same-day availability, and free quote booking.",
    url: business.domain,
    siteName: business.name,
    images: [
      {
        url: business.ogImage,
        width: 500,
        height: 500,
        alt: "OJ Junk Removal logo"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "OJ Junk Removal | Same-Day Junk Removal in Atlanta Metro",
    description: "Book fast Atlanta Metro junk removal with OJ Junk Removal.",
    images: [business.ogImage]
  },
  icons: {
    icon: business.favicon,
    shortcut: business.favicon,
    apple: business.logo
  },
  robots: {
    index: true,
    follow: true
  }
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${business.domain}/#localbusiness`,
  name: business.name,
  url: business.domain,
  logo: absoluteUrl(business.logo),
  image: absoluteUrl(business.ogImage),
  telephone: business.phone,
  email: business.email,
  priceRange: business.priceRange,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Atlanta",
    addressRegion: business.addressRegion,
    addressCountry: "US"
  },
  description:
    "OJ Junk Removal provides junk removal, hauling, furniture removal, appliance removal, scrap metal recycling, cleanouts, and yard debris removal throughout the Atlanta Metro Area.",
  areaServed: serviceAreas.map((name) => ({ "@type": "Place", name })),
  sameAs: [business.facebook, business.thumbtack],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: business.phone,
    contactType: "customer service",
    areaServed: "US",
    availableLanguage: "en"
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "820",
    bestRating: "5"
  },
  potentialAction: {
    "@type": "ReserveAction",
    target: "https://calendly.com/ojjunkremoval-estimate/junkremoval",
    name: "Book a free junk removal estimate"
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${business.domain}/#website`,
  name: business.name,
  url: business.domain,
  publisher: { "@id": `${business.domain}/#localbusiness` }
};

const faqSchema = {
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18403553117"
          strategy="afterInteractive"
        />
        <Script id="google-ads-call-conversion" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
            window.gtag('js', new Date());
            window.gtag('config', 'AW-18403553117');
            window.gtag_report_conversion = function(url) {
              var callback = function() {
                if (typeof url !== 'undefined') window.location.href = url;
              };
              if (typeof window.gtag === 'function') {
                window.gtag('event', 'conversion', {
                  send_to: 'AW-18403553117/xCyeCMjcxY4dEN3ev8dE',
                  value: 1.0,
                  currency: 'USD',
                  event_callback: callback
                });
              } else {
                callback();
              }
              return false;
            };
            document.addEventListener('click', function(event) {
              var link = event.target.closest('a[href^="tel:"]');
              if (!link) return;
              event.preventDefault();
              window.gtag_report_conversion(link.href);
            });
          `}
        </Script>
        <Header />
        <main>{children}</main>
        <Footer />
        <IntentPopup />
        <div className="mobile-sticky-actions" aria-label="Quick contact actions">
          <a href={business.phoneHref}>
            <Phone size={18} />
            Call {business.phone}
          </a>
        </div>
        <SchemaScript data={[localBusinessSchema, websiteSchema, faqSchema]} />
      </body>
    </html>
  );
}
