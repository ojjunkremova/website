import type { MetadataRoute } from "next";

import { articles, business, serviceAreaPages, services } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/services",
    "/service-areas",
    "/reviews",
    "/about",
    "/articles",
    "/quote",
    "/contact",
    "/privacy-policy",
    "/cookies",
    "/terms-and-conditions"
  ];

  const serviceRoutes = services.map((service) => `/services/${service.slug}`);
  const serviceAreaRoutes = serviceAreaPages.map((area) => `/service-areas/${area.slug}`);
  const articleRoutes = articles.map((article) => `/articles/${article.slug}`);

  return [...staticRoutes, ...serviceRoutes, ...serviceAreaRoutes, ...articleRoutes].map((route) => ({
    url: `${business.domain}${route}`,
    lastModified: new Date("2026-06-27"),
    changeFrequency: route.includes("/articles/") ? "monthly" : "weekly",
    priority:
      route === "" ? 1 : route.startsWith("/services") || route.startsWith("/service-areas/") ? 0.9 : 0.7
  }));
}
