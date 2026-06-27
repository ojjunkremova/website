"use client";

import Script from "next/script";

import { business } from "@/lib/site-data";

export function CalendlyEmbed() {
  return (
    <div className="calendly-frame">
      <div
        className="calendly-inline-widget"
        data-url={business.calendly}
        style={{ minWidth: "320px", height: "700px" }}
      />
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
    </div>
  );
}
