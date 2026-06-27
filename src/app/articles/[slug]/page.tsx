import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SchemaScript } from "@/components/site/schema-script";
import { articles, business } from "@/lib/site-data";
import { absoluteUrl } from "@/lib/utils";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    keywords: ["junk removal atlanta", "junk hauling tips", article.title.toLowerCase()],
    alternates: {
      canonical: `/articles/${article.slug}`
    },
    openGraph: {
      title: article.title,
      description: article.description,
      images: [
        {
          url: article.hero,
          alt: article.title
        }
      ]
    }
  };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: absoluteUrl(article.hero),
    datePublished: article.updated,
    dateModified: article.updated,
    author: {
      "@type": "Organization",
      name: business.name
    },
    publisher: {
      "@type": "Organization",
      name: business.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(business.logo)
      }
    },
    mainEntityOfPage: absoluteUrl(`/articles/${article.slug}`)
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
        name: "Articles",
        item: absoluteUrl("/articles")
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: absoluteUrl(`/articles/${article.slug}`)
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <span className="tagline">
            Updated {article.updated} - {article.readTime}
          </span>
          <h1>{article.title}</h1>
          <p>{article.answer}</p>
        </div>
      </section>

      <section className="section">
        <div className="container service-detail-grid">
          <article className="article-body">
            <div className="answer-first reveal">{article.answer}</div>
            <div className="photo-frame reveal">
              <Image src={article.hero} alt={article.title} fill sizes="(max-width: 1120px) 100vw, 58vw" />
            </div>
            {article.sections.map((section) => (
              <section key={section.heading} className="reveal">
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
              </section>
            ))}
            <section className="faq-list">
              {article.faq.map((item) => (
                <article className="faq-item reveal" key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
            </section>
          </article>

          <aside className="sticky-quote reveal">
            <h2>Need a real quote?</h2>
            <p>
              Articles help you plan, but photos of your actual pile are what make the quote accurate. Book a free
              estimate or call the crew now.
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

      <SchemaScript data={[articleSchema, faqSchema, breadcrumbSchema]} />
    </>
  );
}
