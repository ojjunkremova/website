"use client";

import { CheckCircle2 } from "lucide-react";
import { FormEvent, useState } from "react";

import { business } from "@/lib/site-data";

const removalOptions = [
  "Household junk or furniture",
  "Appliances or mattresses",
  "Garage, estate, or property cleanout",
  "Construction or yard debris",
  "Hot tub, shed, or light demolition",
  "Commercial junk",
  "Other"
];

export function EstimateForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Free estimate request from ${data.get("name")}`);
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nPhone: ${data.get("phone")}\nEmail: ${data.get("email")}\nCity: ${data.get("city")}\nWhat needs removed: ${data.get("removal")}\n\nJob details:\n${data.get("details")}`
    );
    window.location.href = `mailto:${business.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <div className="estimate-form-card">
      <div className="estimate-form-heading">
        <span className="tagline">Free estimate</span>
        <h2>Tell us what needs to go.</h2>
        <p>Send the details now and we&apos;ll follow up with pricing and availability.</p>
      </div>
      <form className="estimate-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label>
          Phone
          <input name="phone" type="tel" autoComplete="tel" required />
        </label>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          City
          <input name="city" type="text" autoComplete="address-level2" required />
        </label>
        <label>
          What do you need removed?
          <select name="removal" defaultValue={removalOptions[0]}>
            {removalOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>
        <label>
          Tell us about the job
          <textarea name="details" rows={5} required placeholder="What should we remove, and where is it located?" />
        </label>
        <button className="btn btn-primary estimate-submit" type="submit">Get today&apos;s free estimate</button>
        {sent && (
          <p className="estimate-success" role="status">
            <CheckCircle2 size={18} /> Your email app should open with the estimate details ready to send.
          </p>
        )}
        <p className="form-note">No obligation. We use your details only to respond to your request. See our <a href="/privacy-policy">Privacy Policy</a>.</p>
      </form>
    </div>
  );
}
