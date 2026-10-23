export interface Article {
  slug: string;
  title: string;
  description: string;
  publishedAt: string | null;
  readingMinutes: number;
  topics: string[];
}

export const articles: Article[] = [
  {
    slug: "reliable-scheduling-uis",
    title: "Why building a reliable calendar UI is harder than it looks",
    description: "A practical look at date-only events, the boundary around a calendar library, and keeping schedule data responsive without going stale.",
    publishedAt: null, // Editorial draft. Set a real date only after final review.
    readingMinutes: 4,
    topics: ["React", "TypeScript", "Scheduling", "Frontend architecture"],
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getPublishedArticles() {
  return articles.filter((article) => article.publishedAt !== null);
}
