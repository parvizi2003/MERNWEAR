import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isSameUrl(url1: string | URL, url2: string | URL): boolean {
  return resolveUrl(url1) === resolveUrl(url2);
}

export function resolveUrl(url: string | URL): string {
  let normalized = typeof url === "string" ? url : url.toString();

  if (normalized.length > 1 && normalized.endsWith("/")) {
    normalized = normalized.slice(0, -1);
  }

  return normalized;
}
