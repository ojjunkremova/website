import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SchemaScript } from "@/components/site/schema-script";
import { articles, business } from "@/lib/site-data";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Junk Removal Articles and Guides",
  description:
    "Atlanta Metro junk removal articles about pricing, same-day pickup, accepted items, eco-friendly disposal, and cleanout planning.",
  alternates: {
    canonical: "/articles"
  }
};

const articleListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: articles.map((article, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: article.title,
    url: absoluteUrl(`/articles/${article.slug}`)
  }))
};

export default function ArticlesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <span className="tagline">Junk removal guides</span>
          <h1>Articles that answer the questions people ask before booking.</h1>
          <p>
            These guides are built for Atlanta Metro homeowners, renters, contractors, and property managers comparing
            junk removal options, pricing, prep steps, and responsible disposal.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="article-grid">
            {articles.map((article) => (
              <Link href={`/articles/${article.slug}`} className="article-card reveal" key={article.slug}>
                <div className="article-card-media">
                  <Image src={article.hero} alt={article.title} fill sizes="(max-width: 760px) 100vw, 33vw" />
                </div>
                <div className="article-card-body">
                  <span className="article-meta">
                    Updated {article.updated} - {article.readTime}
                  </span>
                  <h2>{article.title}</h2>
                  <p>{article.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-green">
        <div className="container split">
          <div className="split-copy reveal">
            <span className="tagline">Need the short answer?</span>
            <h2>Photos make almost every junk removal quote faster.</h2>
            <p>
              If you are deciding whether to call, send pictures of each pile and mention access details. OJ Junk Removal
              can use that information to give a clearer next step.
            </p>
          </div>
          <div className="bullet-panel reveal">
            <h2>Quote details to include</h2>
            <ul className="check-list">
              <li>Photos of each pile or room</li>
              <li>Pickup location and access</li>
              <li>Large items like mattresses or appliances</li>
              <li>Any construction debris or scrap metal</li>
              <li>Preferred timing and same-day needs</li>
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

      <SchemaScript data={articleListSchema} />
    </>
  );
}
