import { calendarCaseStudy } from "@/data/calendar-case-study";
import type { FeaturedProject } from "@/data/projects";
import { InternalLink } from "./internal-link";
import { ProjectVisual } from "./project-visual";

interface CalendarCaseStudyProps {
  readonly project: FeaturedProject;
}

export function CalendarCaseStudy({ project }: CalendarCaseStudyProps) {
  const study = calendarCaseStudy;

  return (
    <main className="editorial-case">
      <section className="editorial-case__hero" aria-labelledby="case-title">
        <div className="shell">
          <InternalLink className="back-link editorial-case__back" href="/#work">
            <span aria-hidden="true">←</span> Selected work
          </InternalLink>

          <div className="editorial-case__hero-grid">
            <div className="editorial-case__hero-copy">
              <p className="eyebrow">{study.eyebrow}</p>
              <h1 id="case-title">{study.title}</h1>
              <p>{study.lead}</p>
            </div>

            <div className="editorial-case__hero-visual" aria-hidden="true">
              <ProjectVisual type={project.visual} />
            </div>
          </div>

          <dl className="editorial-case__facts">
            {study.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="editorial-case__brief shell" aria-labelledby="brief-title">
        <p className="eyebrow">01 · The system behind the screen</p>
        <div className="editorial-case__brief-grid">
          <blockquote id="brief-title">{study.brief.title}</blockquote>

          <article className="editorial-case__brief-mandate">
            <span>Product mandate</span>
            {study.brief.assignment.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        </div>

        <article className="editorial-case__brief-ownership">
          <span>My ownership</span>
          <div className="editorial-case__brief-ownership-copy">
            {study.brief.responsibility.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
      </section>

      <section
        className="editorial-case__challenges shell"
        aria-labelledby="challenges-title"
      >
        <header className="editorial-case__heading">
          <p className="eyebrow">02 · What made it difficult</p>
          <h2 id="challenges-title">
            Every simple calendar view depended on <span>four system guarantees.</span>
          </h2>
        </header>

        <ol className="editorial-case__challenge-list">
          {study.constraints.map((constraint) => (
            <li key={constraint.number}>
              <span>{constraint.number}</span>
              <h3>{constraint.title}</h3>
              <p>{constraint.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="editorial-case__architecture shell"
        aria-labelledby="architecture-title"
      >
        <div className="editorial-case__architecture-panel">
          <header>
            <p className="eyebrow">03 · System design</p>
            <h2 id="architecture-title">{study.architecture.title}</h2>
            <p>{study.architecture.body}</p>
          </header>

          <ol className="editorial-case__flow" aria-label="Calendar data flow">
            {study.architecture.stages.map((stage) => (
              <li key={stage.number}>
                <div>
                  <span>{stage.number}</span>
                  <small>{stage.label}</small>
                </div>
                <h3>{stage.title}</h3>
                <p>{stage.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="editorial-case__decisions shell"
        aria-labelledby="decisions-title"
      >
        <header className="editorial-case__heading editorial-case__heading--narrow">
          <p className="eyebrow">04 · Technical direction</p>
          <h2 id="decisions-title">
            Three decisions protected correctness, privacy, and continuity.
          </h2>
        </header>

        <ol className="editorial-case__decision-list">
          {study.decisions.map((decision) => (
            <li key={decision.number}>
              <div className="editorial-case__decision-lead">
                <span>Decision {decision.number}</span>
                <h3>{decision.title}</h3>
                <div className="editorial-case__decision-result">
                  <strong>What changed</strong>
                  <p>{decision.result}</p>
                </div>
              </div>

              <div className="editorial-case__decision-detail">
                <article>
                  <span>Constraint</span>
                  <p>{decision.risk}</p>
                </article>
                <article>
                  <span>Technical direction</span>
                  <p>{decision.decision}</p>
                </article>
                <article>
                  <span>Tradeoff accepted</span>
                  <p>{decision.tradeoff}</p>
                </article>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="editorial-case__delivery shell"
        aria-labelledby="delivery-title"
      >
        <header className="editorial-case__heading">
          <p className="eyebrow">05 · From decision to production</p>
          <h2 id="delivery-title">
            Three stages connected the model to{" "}
            <span>production evidence.</span>
          </h2>
        </header>

        <ol className="editorial-case__journey" aria-label="Delivery journey">
          {study.journey.map((step) => (
            <li key={step.number}>
              <span>{step.number}</span>
              <strong>{step.title}</strong>
              <small>{step.detail}</small>
            </li>
          ))}
        </ol>

        <div className="editorial-case__quality-grid">
          <div>
            <p className="editorial-case__subheading">Production reliability</p>
            {study.resilience.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
          <div>
            <p className="editorial-case__subheading">
              Verification strategy
            </p>
            {study.testing.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="editorial-case__outcomes"
        aria-labelledby="outcomes-title"
      >
        <div className="shell">
          <div className="editorial-case__impact-panel">
            <header>
              <p className="eyebrow">06 · Verified outcomes</p>
              <h2 id="outcomes-title">
                Correct dates. Protected data. Responsive navigation. One
                dependable system.
              </h2>
            </header>

            <dl>
              {study.outcomes.map((outcome) => (
                <div key={outcome.value}>
                  <dt>{outcome.value}</dt>
                  <dd>{outcome.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <article className="editorial-case__reflection">
            <h2>{study.reflection.title}</h2>
            <p>{study.reflection.body}</p>
          </article>

          <InternalLink
            className="editorial-case__next"
            href="/work/custom-metrics-import"
          >
            <span>
              <small>Next case study</small>
              Making complex data imports trustworthy
            </span>
            <b aria-hidden="true">↗</b>
          </InternalLink>
        </div>
      </section>
    </main>
  );
}
