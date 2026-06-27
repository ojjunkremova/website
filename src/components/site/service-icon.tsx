import type { Service } from "@/lib/site-data";

type IconProps = {
  type: Service["icon"];
  className?: string;
};

export function ServiceIcon({ type, className }: IconProps) {
  const common = {
    className,
    viewBox: "0 0 64 64",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true
  };

  if (type === "sofa") {
    return (
      <svg {...common}>
        <path d="M13 30c0-5 3-8 8-8h22c5 0 8 3 8 8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M12 32h40a6 6 0 0 1 6 6v9H6v-9a6 6 0 0 1 6-6Z" fill="currentColor" opacity=".16" />
        <path d="M9 47h46M15 47v8M49 47v8M18 32v-5M46 32v-5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "appliance") {
    return (
      <svg {...common}>
        <rect x="16" y="8" width="32" height="48" rx="5" fill="currentColor" opacity=".14" />
        <rect x="16" y="8" width="32" height="48" rx="5" stroke="currentColor" strokeWidth="4" />
        <path d="M16 23h32M24 16h8M41 16h1M25 38h14" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <circle cx="32" cy="43" r="6" stroke="currentColor" strokeWidth="4" />
      </svg>
    );
  }

  if (type === "metal") {
    return (
      <svg {...common}>
        <path d="M13 45 25 19l11 26M20 33h11M39 19h11M45 19v26M39 45h12" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 50h46" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity=".5" />
      </svg>
    );
  }

  if (type === "house") {
    return (
      <svg {...common}>
        <path d="M10 29 32 11l22 18" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 27v27h32V27" fill="currentColor" opacity=".14" />
        <path d="M16 27v27h32V27M27 54V39h10v15" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
        <path d="M23 32h6M39 32h2" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "yard") {
    return (
      <svg {...common}>
        <path d="M14 48c12-3 20-12 25-28 7 6 10 17 1 26-8 8-18 7-26 2Z" fill="currentColor" opacity=".16" />
        <path d="M14 48c12-3 20-12 25-28 7 6 10 17 1 26-8 8-18 7-26 2Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
        <path d="M12 52c12-10 20-17 29-27" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M16 18c4 3 8 5 14 5M19 12c3 2 5 4 9 4" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity=".65" />
      </svg>
    );
  }

  if (type === "office") {
    return (
      <svg {...common}>
        <rect x="14" y="16" width="36" height="34" rx="4" fill="currentColor" opacity=".14" />
        <path d="M14 50V16h36v34M22 50V22h8v28M38 50V22h4v28M10 50h44" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "mattress") {
    return (
      <svg {...common}>
        <path d="M10 26h44v18H10z" fill="currentColor" opacity=".14" />
        <path d="M10 26h44v18H10zM10 44v8M54 44v8M14 26v-7h16v7M34 26v-7h16v7" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "debris") {
    return (
      <svg {...common}>
        <path d="M13 48h38L45 22H19l-6 26Z" fill="currentColor" opacity=".14" />
        <path d="M13 48h38L45 22H19l-6 26ZM23 22l3-9h12l3 9M24 31h4M36 31h4M21 39h22" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "box") {
    return (
      <svg {...common}>
        <path d="m12 23 20-10 20 10v25L32 58 12 48V23Z" fill="currentColor" opacity=".14" />
        <path d="m12 23 20-10 20 10M12 23l20 10m20-10L32 33m0 25V33M12 23v25l20 10 20-10V23" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M8 38h33l8-13h7v20h-6" fill="currentColor" opacity=".14" />
      <path d="M8 22h31l4 16h9l4-13h5v20h-7M8 22v23h8M26 45h18M18 45a6 6 0 1 0 12 0 6 6 0 0 0-12 0Zm28 0a6 6 0 1 0 12 0 6 6 0 0 0-12 0ZM17 29h12M18 36h18" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M45 15c4-4 10-3 12 1-5-1-8 2-9 7-3-1-6-4-3-8Z" fill="currentColor" opacity=".28" />
    </svg>
  );
}
