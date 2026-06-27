import type { Metadata } from "next";

import { business } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and conditions for OJ Junk Removal."
};

export default function TermsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <span className="tagline">Legal</span>
          <h1>Terms and Conditions</h1>
          <p>Last updated June 27, 2026. These terms apply when you use the OJ Junk Removal website or request service.</p>
        </div>
      </section>

      <section className="section">
        <div className="container legal-content">
          <h2>Estimates and pricing</h2>
          <p>
            Website content, photos, and booking details help us estimate a job, but final pricing may depend on volume,
            item type, access, labor, disposal requirements, and changes to the scope.
          </p>

          <h2>Customer responsibilities</h2>
          <ul>
            <li>Identify all items to be removed and anything that must stay.</li>
            <li>Provide safe access to the pickup area.</li>
            <li>Disclose stairs, elevators, gates, parking limits, heavy materials, or restricted items.</li>
            <li>Remove sensitive documents, valuables, medication, or private items before pickup.</li>
          </ul>

          <h2>Restricted items</h2>
          <p>
            Some materials may be restricted or require special handling, including hazardous chemicals, fuels, wet paint,
            medical waste, certain electronics, and other regulated items. OJ Junk Removal may decline unsafe or
            restricted materials.
          </p>

          <h2>Website use</h2>
          <p>
            Website content is provided for general information and booking support. We may update services, content,
            pricing guidance, and availability at any time.
          </p>

          <h2>Contact</h2>
          <p>
            For questions about these terms, call {business.phone} or email {business.email}.
          </p>
        </div>
      </section>
    </>
  );
}
