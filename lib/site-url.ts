const LOCAL_SITE_URL = "http://localhost:3000";

function withProtocol(value: string): string {
  const trimmed = value.trim();

  if (!trimmed) {
    return LOCAL_SITE_URL;
  }

  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function resolveSiteUrl(): URL {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL;

  return new URL(withProtocol(configuredUrl ?? LOCAL_SITE_URL));
}

export const siteUrl = resolveSiteUrl();
