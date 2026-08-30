import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const siteTitle = "Neha Mangla — Senior Full Stack Engineer";
const siteDescription =
  "Senior Full Stack Engineer portfolio featuring enterprise SaaS case studies in workforce scheduling, asynchronous data imports, and performance analytics.";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s — Neha Mangla",
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  applicationName: siteTitle,
  authors: [{ name: "Neha Mangla" }],
  creator: "Neha Mangla",
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    url: "/",
    siteName: siteTitle,
    images: [
      {
        url: "/og.png",
        width: 1731,
        height: 909,
        alt: siteTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f4f1e9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
