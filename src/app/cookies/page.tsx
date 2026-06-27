import type { Metadata } from "next";

import { business } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie policy for OJ Junk Removal."
};

export default function CookiesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <span className="tagline">Legal</span>
          <h1>Cookie Policy</h1>
          <p>Last updated June 27, 2026. This page explains how cookies and similar tools may be used on this website.</p>
        </div>
      </section>

      <section className="section">
        <div className="container legal-content">
          <h2>What cookies are</h2>
          <p>
            Cookies are small files stored by your browser. They can help a website remember preferences, measure traffic,
            load third-party tools, and improve basic performance.
          </p>

          <h2>How this site may use cookies</h2>
          <ul>
            <li>To support Calendly booking and appointment scheduling.</li>
            <li>To measure website traffic and understand which pages help customers.</li>
            <li>To support embedded tools, security, and normal site functionality.</li>
          </ul>

          <h2>Third-party tools</h2>
          <p>
            Calendly, Facebook, Thumbtack, analytics providers, hosting providers, and similar services may use their own
            cookies or tracking technologies when you interact with their features.
          </p>

          <h2>Managing cookies</h2>
          <p>
            You can block or delete cookies in your browser settings. Some booking or embedded features may not work
            correctly if cookies are disabled. For questions, contact {business.email}.
          </p>
        </div>
      </section>
    </>
  );
}
