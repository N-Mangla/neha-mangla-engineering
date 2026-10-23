import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { InternalLink } from "@/components/internal-link";
import { getPublishedArticles } from "@/data/articles";

export const metadata: Metadata = {
  title: "Engineering Notes",
  description: "Engineering notes by Neha Mangla on React, TypeScript, complex interfaces and production trade-offs.",
  alternates: { canonical: "/blog" },
  openGraph: { title: "Engineering Notes — Neha Mangla", url: "/blog", type: "website" },
};

export default function BlogIndex() {
  const articles = getPublishedArticles();
  return (
    <>
      <SiteHeader />
      <main className="blog-page shell">
        <p className="eyebrow">Engineering Notes</p>
        <h1>Notes from building complex interfaces.</h1>
        <p className="blog-page__intro">
          I write about the parts of frontend engineering that don&apos;t fit neatly
          into a feature description: boundaries, debugging, data semantics,
          testing, and the decisions that make software easier to trust.
        </p>
        {articles.length ? (
          <div className="blog-grid">{articles.map(article => (
            <article className="blog-card" key={article.slug}>
              <p className="eyebrow">{article.topics.slice(0, 2).join(" · ")}</p>
              <h2><InternalLink href={`/blog/${article.slug}`}>{article.title}</InternalLink></h2>
              <p>{article.description}</p>
              <span>{article.readingMinutes} min read <span aria-hidden="true">↗</span></span>
            </article>
          ))}</div>
        ) : (
          <p className="blog-page__empty">The first engineering note is in progress.</p>
        )}
        <p className="blog-page__back"><InternalLink href="/#work">← Explore selected work</InternalLink></p>
      </main>
      <SiteFooter />
    </>
  );
}
