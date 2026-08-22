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
          <h3>{project.title}</h3>
          <p className="project-card__summary">{project.summary}</p>
        </div>

        <div>
          <ul className="tag-list" aria-label="Project focus areas">
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <InternalLink className="project-card__link" href={`/work/${project.slug}`}>
            View case study <span aria-hidden="true">↗</span>
          </InternalLink>
        </div>
      </div>

      <div className="project-card__visual" aria-hidden="true">
        <ProjectVisual type={project.visual} />
      </div>
    </article>
  );
}
