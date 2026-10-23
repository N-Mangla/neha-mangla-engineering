import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { InternalLink } from "@/components/internal-link";
import { articles, getPublishedArticles } from "@/data/articles";

export const metadata: Metadata = {
  title: "Engineering Notes",
  description: "Engineering notes by Neha Mangla on React, TypeScript, complex interfaces and production trade-offs.",
  alternates: { canonical: "/blog" },
  openGraph: { title: "Engineering Notes — Neha Mangla", url: "/blog", type: "website" },
};

export default function BlogIndex() {
  const visibleArticles = process.env.NODE_ENV === "development" ? articles : getPublishedArticles();
  return (
    <>
      <SiteHeader />
      <main className="blog-page shell">
        <h1>Engineering Notes</h1>
        <p className="blog-page__intro">
          I work mostly with React, TypeScript, and enterprise applications.
          This is where I write about specific implementation decisions,
          debugging work, and the trade-offs I&apos;ve encountered along the way.
        </p>
        {visibleArticles.length ? (
          <div className="blog-grid">{visibleArticles.map(article => (
            <article className="blog-card" key={article.slug}>
              <p className="eyebrow">{!article.publishedAt ? "Draft · Local preview" : article.topics.slice(0, 2).join(" · ")}</p>
              <h2><InternalLink href={`/blog/${article.slug}`}>{article.title}</InternalLink></h2>
              <p>{article.description}</p>
              <span>{article.readingMinutes} min read <span aria-hidden="true">↗</span></span>
            </article>
          ))}</div>
        ) : (
          <p className="blog-page__empty">I&apos;m working on the first article, about dates, data loading, and state in a workforce calendar. Until then, <InternalLink href="/work/workforce-calendar">here&apos;s the related case study</InternalLink>.</p>
        )}
        <p className="blog-page__back"><InternalLink href="/#work">← Explore selected work</InternalLink></p>
      </main>
      <SiteFooter />
    </>
  );
}
