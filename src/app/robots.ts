import type { MetadataRoute } from "next";

import { business } from "@/lib/site-data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    host: business.domain,
    sitemap: `${business.domain}/sitemap.xml`
  };
}
