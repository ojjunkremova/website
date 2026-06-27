import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { business, navLinks, serviceAreas, services } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link href="/" className="footer-logo" aria-label="OJ Junk Removal home">
            <Image src={business.logo} alt="OJ Junk Removal logo" width={84} height={84} />
            <span>
              <strong>OJ Junk Removal</strong>
              <small>Fast, careful junk removal in the Atlanta Metro Area.</small>
            </span>
          </Link>
          <p>
            Same-day junk removal, furniture hauling, appliance removal, scrap metal recycling, cleanouts,
            and yard debris pickup with real job proof and straightforward estimates.
          </p>
          <div className="footer-social">
            <a href={business.facebook} target="_blank" rel="noreferrer" aria-label="OJ Junk Removal on Facebook">
              <MessageCircle size={18} />
            </a>
            <a href={business.thumbtack} target="_blank" rel="noreferrer">
              Thumbtack
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h2>Pages</h2>
          {navLinks.map((link) => (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
          <Link href="/quote">Free Quote</Link>
        </div>

        <div className="footer-column">
          <h2>Services</h2>
          {services.slice(0, 9).map((service) => (
            <Link href={`/services/${service.slug}`} key={service.slug}>
              {service.navTitle}
            </Link>
          ))}
        </div>

        <div className="footer-column footer-contact">
          <h2>Contact</h2>
          <a href={business.phoneHref}>
            <Phone size={16} /> {business.phone}
          </a>
          <a href={business.emailHref}>
            <Mail size={16} /> {business.email}
          </a>
          <span>
            <MapPin size={16} /> {serviceAreas.slice(0, 6).join(", ")}
          </span>
          <Link href="/quote" className="btn btn-primary footer-cta">
            Get a Free Quote
          </Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright 2026 OJ Junk Removal. All rights reserved.</p>
        <div>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/cookies">Cookies</Link>
          <Link href="/terms-and-conditions">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
