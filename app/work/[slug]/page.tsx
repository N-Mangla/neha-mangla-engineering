import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarCaseStudy } from "@/components/calendar-case-study";
import { CoachingEffectivenessCaseStudy } from "@/components/coaching-effectiveness-case-study";
import { CustomMetricsCaseStudy } from "@/components/custom-metrics-case-study";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { calendarCaseStudy } from "@/data/calendar-case-study";
import { coachingEffectivenessCaseStudy } from "@/data/coaching-effectiveness-case-study";
import { customMetricsCaseStudy } from "@/data/custom-metrics-case-study";
import { featuredProjects, getProject } from "@/data/projects";

interface ProjectPageProps {
  readonly params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return featuredProjects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  if (project.slug === "workforce-calendar") {
    const canonical = `/work/${project.slug}`;

    return {
      title: calendarCaseStudy.title,
      description: calendarCaseStudy.lead,
      alternates: { canonical },
      openGraph: {
        title: calendarCaseStudy.title,
        description: calendarCaseStudy.lead,
        url: canonical,
        images: [],
      },
      twitter: {
        card: "summary",
        title: calendarCaseStudy.title,
        description: calendarCaseStudy.lead,
        images: [],
      },
    };
  }

  if (project.slug === "custom-metrics-import") {
    const canonical = `/work/${project.slug}`;

    return {
      title: customMetricsCaseStudy.title,
      description: customMetricsCaseStudy.lead,
      alternates: { canonical },
      openGraph: {
        title: customMetricsCaseStudy.title,
        description: customMetricsCaseStudy.lead,
        url: canonical,
        images: [],
      },
      twitter: {
        card: "summary",
        title: customMetricsCaseStudy.title,
        description: customMetricsCaseStudy.lead,
        images: [],
      },
    };
  }

  if (project.slug === "coaching-effectiveness") {
    const canonical = `/work/${project.slug}`;

    return {
      title: coachingEffectivenessCaseStudy.title,
      description: coachingEffectivenessCaseStudy.lead,
      alternates: { canonical },
      openGraph: {
        title: coachingEffectivenessCaseStudy.title,
        description: coachingEffectivenessCaseStudy.lead,
        url: canonical,
        images: [],
      },
      twitter: {
        card: "summary",
        title: coachingEffectivenessCaseStudy.title,
        description: coachingEffectivenessCaseStudy.lead,
        images: [],
      },
    };
  }

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  if (project.slug === "workforce-calendar") {
    return (
      <>
        <SiteHeader />
        <CalendarCaseStudy project={project} />
        <SiteFooter />
      </>
    );
  }

  if (project.slug === "custom-metrics-import") {
    return (
      <>
        <SiteHeader />
        <CustomMetricsCaseStudy project={project} />
        <SiteFooter />
      </>
    );
  }

  if (project.slug === "coaching-effectiveness") {
    return (
      <>
        <SiteHeader />
        <CoachingEffectivenessCaseStudy project={project} />
        <SiteFooter />
      </>
    );
  }

  notFound();
}
