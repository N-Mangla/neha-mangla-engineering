const LOCAL_SITE_URL = "http://localhost:3000";
const PRODUCTION_SITE_URL = "https://nehamangla.com";

function withProtocol(value: string): string {
  const trimmed = value.trim();
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
const defaultUrl =
  process.env.NODE_ENV === "production" ? PRODUCTION_SITE_URL : LOCAL_SITE_URL;

export const siteUrl = new URL(
  configuredUrl?.trim() ? withProtocol(configuredUrl) : defaultUrl
);
