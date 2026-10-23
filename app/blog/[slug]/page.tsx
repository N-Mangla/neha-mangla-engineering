import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { InternalLink } from "@/components/internal-link";
import { SchedulingArticle } from "@/components/blog/scheduling-article";
import { getArticle, getPublishedArticles } from "@/data/articles";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPublishedArticles().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article?.publishedAt) return { title: "Article not found", robots: { index: false } };
  const canonical = `/blog/${slug}`;
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical },
    openGraph: { title: article.title, description: article.description, url: canonical, type: "article", publishedTime: article.publishedAt },
    twitter: { card: "summary_large_image", title: article.title, description: article.description },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article || (!article.publishedAt && process.env.NODE_ENV !== "development")) notFound();
  if (article.slug !== "reliable-scheduling-uis") notFound();
  return (
    <>
      <SiteHeader />
      <main className="article-page shell">
        <nav className="article-breadcrumb" aria-label="Breadcrumb">
          <InternalLink href="/blog">Engineering Notes</InternalLink><span aria-hidden="true"> / </span><span>Scheduling UIs</span>
        </nav>
        <header className="article-heading">
          {!article.publishedAt && <p className="eyebrow">Unpublished draft · local preview</p>}
          <p className="eyebrow">{article.topics.join(" · ")}</p>
          <h1>{article.title}</h1>
          <p>{article.description}</p>
          <div className="article-byline">Neha Mangla <span aria-hidden="true">·</span> {article.readingMinutes} min read
            {article.publishedAt && <><span aria-hidden="true">·</span> <time dateTime={article.publishedAt}>{new Date(article.publishedAt).toLocaleDateString("en-GB", {day:"numeric",month:"long",year:"numeric",timeZone:"UTC"})}</time></>}
          </div>
        </header>
        <div className="article-layout article-layout--focused">
          <SchedulingArticle />
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context":"https://schema.org","@type":"BlogPosting",
          headline:article.title,description:article.description,
          datePublished:article.publishedAt,
          author:{"@type":"Person",name:"Neha Mangla",url:"https://nehamangla.com"},
          mainEntityOfPage:`https://nehamangla.com/blog/${article.slug}`
        }).replace(/</g,"\\u003c")}} />
      </main>
      <SiteFooter />
    </>
  );
}
