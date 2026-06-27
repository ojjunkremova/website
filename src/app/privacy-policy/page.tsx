import type { Metadata } from "next";

import { business } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for OJ Junk Removal."
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <span className="tagline">Legal</span>
          <h1>Privacy Policy</h1>
          <p>Last updated June 27, 2026. This policy explains how OJ Junk Removal handles information you share with us.</p>
        </div>
      </section>

      <section className="section">
        <div className="container legal-content">
          <h2>Information we collect</h2>
          <p>
            We may collect your name, phone number, email address, service address or general location, photos you send
            for a quote, appointment details, and messages submitted through phone, email, Calendly, Facebook, Thumbtack,
            or website forms.
          </p>

          <h2>How we use information</h2>
          <p>
            We use information to provide estimates, schedule junk removal service, communicate about your appointment,
            improve our website, respond to questions, and keep basic business records.
          </p>

          <h2>Sharing information</h2>
          <p>
            We do not sell your personal information. We may share limited information with service providers that help
            us operate booking, communications, analytics, hosting, or customer support.
          </p>

          <h2>Photos and job details</h2>
          <p>
            Photos are used to estimate the job and plan safe removal. Do not send sensitive documents, financial
            records, medical details, or private items in quote photos.
          </p>

          <h2>Your choices</h2>
          <p>
            You may contact us to update or request deletion of personal information when legally and operationally
            possible. Call {business.phone} or email {business.email}.
          </p>
        </div>
      </section>
    </>
  );
}
