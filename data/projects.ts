export type ProjectVisual = "calendar" | "import" | "analytics";

export interface FeaturedProject {
  readonly slug: string;
  readonly number: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly summary: string;
  readonly tags: readonly string[];
  readonly visual: ProjectVisual;
  readonly tone: "blue" | "plum" | "green";
}

export const featuredProjects = [
  {
    slug: "workforce-calendar",
    number: "01",
    eyebrow: "Workforce scheduling",
    title: "Keeping workforce schedules correct across time zones",
    summary:
      "A workforce calendar unifying shifts, absences, overtime, permissions, and date semantics behind one application event model.",
    tags: ["System architecture", "Date semantics", "Production reliability"],
    visual: "calendar",
    tone: "blue",
  },
  {
    slug: "custom-metrics-import",
    number: "02",
    eyebrow: "Asynchronous operations",
    title: "Making data imports dependable",
    summary:
      "A four step import workflow preserving user context across validation, schema mapping, queued processing, partial success, and recovery.",
    tags: ["Async systems", "Lifecycle design", "Failure recovery"],
    visual: "import",
    tone: "plum",
  },
  {
    slug: "coaching-effectiveness",
    number: "03",
    eyebrow: "Performance analytics",
    title: "Making performance after coaching explainable",
    summary:
      "A full stack analytics experience comparing KPI movement across configurable periods without overstating what the data could prove.",
    tags: ["Analytical contracts", "Aggregation", "Interpretation"],
    visual: "analytics",
    tone: "green",
  },
] as const satisfies readonly FeaturedProject[];

export const earlierWork = [
  {
    name: "Fusion24X7",
    domain: "CRM & workflow automation",
    description:
      "Built CRM workflows spanning lead capture, task assignment, status transitions, and operational follow through.",
    url: "https://fusion24x7.com/",
  },
  {
    name: "Stikkum",
    domain: "Mortgage retention intelligence",
    description:
      "Built retention workflows that turned borrower behaviour signals into alerts and follow up actions.",
    url: "https://stikkum.io/",
  },
  {
    name: "wemlo",
    domain: "Mortgage processing",
    description:
      "Delivered workflow improvements across borrower, broker, processor, document, and loan status journeys.",
    url: "https://www.wemlo.io/",
  },
] as const;

export function getProject(slug: string): FeaturedProject | undefined {
  return featuredProjects.find((project) => project.slug === slug);
}
