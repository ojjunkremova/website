"use client";

import { CalendarCheck, Phone, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { business } from "@/lib/site-data";

export function IntentPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.sessionStorage.getItem("oj-intent-popup-dismissed")) {
      return;
    }

    const timer = window.setTimeout(() => {
      setOpen(true);
    }, 45000);

    return () => window.clearTimeout(timer);
  }, []);

  function dismiss() {
    window.sessionStorage.setItem("oj-intent-popup-dismissed", "1");
    setOpen(false);
  }

  if (!open) {
    return null;
  }

  return (
    <div className="intent-popup-shell" role="dialog" aria-modal="false" aria-labelledby="intent-popup-title">
      <div className="intent-popup">
        <button type="button" className="intent-popup-close" aria-label="Close booking prompt" onClick={dismiss}>
          <X size={18} />
        </button>
        <p className="intent-popup-eyebrow">Still deciding?</p>
        <h2 id="intent-popup-title">Want a fast quote before you leave?</h2>
        <p>
          Call now for urgent pickup or book a free estimate. Photos help OJ quote faster for homes, rentals, and
          monthly commercial service.
        </p>
        <div className="intent-popup-actions">
          <Link href="/quote" className="btn btn-primary" onClick={dismiss}>
            <CalendarCheck size={18} />
            Book Free Estimate
          </Link>
          <a href={business.phoneHref} className="btn btn-secondary" onClick={dismiss}>
            <Phone size={18} />
            Call {business.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
