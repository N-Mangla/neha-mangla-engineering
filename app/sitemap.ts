import type { MetadataRoute } from "next";
import { getPublishedArticles } from "@/data/articles";
import { featuredProjects } from "@/data/projects";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/blog", ...featuredProjects.map((p) => `/work/${p.slug}`), ...getPublishedArticles().map((a) => `/blog/${a.slug}`)];
  return routes.map((route) => ({ url: new URL(route, siteUrl).toString() }));
}
