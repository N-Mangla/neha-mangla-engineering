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
    title: "Building reliable scheduling UIs",
    description: "What working on an enterprise calendar taught me about date semantics, state boundaries, and responsive navigation.",
    publishedAt: null, // Editorial draft. Set a real date only after final review.
    readingMinutes: 9,
    topics: ["React", "TypeScript", "Scheduling", "Frontend architecture"],
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getPublishedArticles() {
  return articles.filter((article) => article.publishedAt !== null);
}
