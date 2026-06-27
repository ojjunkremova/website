import { business } from "@/lib/site-data";

export function absoluteUrl(path = "") {
  if (path.startsWith("http")) return path;
  return `${business.domain}${path.startsWith("/") ? path : `/${path}`}`;
}

export function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function formatDateIso(date: string | Date) {
  return new Date(date).toISOString();
}
