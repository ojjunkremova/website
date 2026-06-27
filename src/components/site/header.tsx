"use client";

import { CalendarCheck, ChevronDown, ExternalLink, Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { business, navLinks, services } from "@/lib/site-data";
import { cx } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const featuredServices = services.slice(0, 8);

  return (
    <header className="site-header">
      <div className="header-progress" aria-hidden="true" />
      <div className="header-inner">
        <Link href="/" className="brand-link" aria-label="OJ Junk Removal home" onClick={() => setOpen(false)}>
          <Image src={business.logo} alt="OJ Junk Removal logo" width={64} height={64} priority />
          <span>
            <strong>OJ Junk Removal</strong>
            <small>Atlanta Metro hauling</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navLinks.map((link) => {
            if (link.href === "/services") {
              return (
                <div className="nav-dropdown" key={link.href}>
                  <Link
                    href={link.href}
                    className={cx("nav-link", pathname.startsWith("/services") && "is-active")}
                  >
                    Services <ChevronDown size={15} strokeWidth={2.4} />
                  </Link>
                  <div className="services-menu" aria-label="Services menu">
                    <div className="services-menu-grid">
                      {featuredServices.map((service) => (
                        <Link href={`/services/${service.slug}`} className="service-menu-item" key={service.slug}>
                          <strong>{service.navTitle}</strong>
                          <span>{service.summary}</span>
                        </Link>
                      ))}
                    </div>
                    <Link href="/services" className="service-menu-all">
                      View all junk removal services <ExternalLink size={14} />
                    </Link>
                  </div>
                </div>
              );
            }

            return (
              <Link
                href={link.href}
                className={cx("nav-link", pathname === link.href && "is-active")}
                key={link.href}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="header-actions">
          <a href={business.phoneHref} className="btn btn-ghost">
            <Phone size={17} />
            <span>{business.phone}</span>
          </a>
          <Link href="/quote" className="btn btn-primary">
            <CalendarCheck size={17} />
            <span>Free Quote</span>
          </Link>
        </div>

        <button
          className="menu-button"
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={cx("mobile-panel", open && "is-open")}>
        <nav aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link href={link.href} key={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <div className="mobile-service-list">
            {services.slice(0, 6).map((service) => (
              <Link href={`/services/${service.slug}`} key={service.slug} onClick={() => setOpen(false)}>
                {service.navTitle}
              </Link>
            ))}
          </div>
          <Link href="/quote" className="btn btn-primary mobile-quote" onClick={() => setOpen(false)}>
            <CalendarCheck size={17} />
            Book Free Quote
          </Link>
          <a href={business.phoneHref} className="btn btn-ghost mobile-quote" onClick={() => setOpen(false)}>
            <Phone size={17} />
            {business.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}
