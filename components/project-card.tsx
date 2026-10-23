import type { FeaturedProject } from "@/data/projects";
import { InternalLink } from "./internal-link";
import { ProjectVisual } from "./project-visual";

interface ProjectCardProps {
  readonly project: FeaturedProject;
  readonly visualFirst?: boolean;
}

export function ProjectCard({
  project,
  visualFirst = false,
}: ProjectCardProps) {
  return (
    <article
      data-number={project.number}
      className={`project-card project-card--${project.tone} ${
        visualFirst ? "project-card--visual-first" : ""
      }`}
    >
      <div className="project-card__copy">
        <div>
          <p className="project-card__meta">
            <span>{project.number}</span>
            {project.eyebrow}
          </p>
          <h3><InternalLink className="project-card__title-link" href={`/work/${project.slug}`}>{project.title}</InternalLink></h3>
          <p className="project-card__summary">{project.summary}</p>
        </div>

        <div>
          <ul className="tag-list" aria-label="Project focus areas">
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <p className="project-card__expectation">Architecture · Engineering decisions · Outcomes</p>
          <InternalLink className="project-card__link" href={`/work/${project.slug}`}>
            Explore case study <span aria-hidden="true">↗</span>
          </InternalLink>
        </div>
      </div>

      <InternalLink className="project-card__visual project-card__visual-link" href={`/work/${project.slug}`} aria-label={`Explore ${project.title} case study`}>
        <ProjectVisual type={project.visual} />
      </InternalLink>
    </article>
  );
}
