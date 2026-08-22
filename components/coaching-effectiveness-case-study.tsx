import { coachingEffectivenessCaseStudy } from "@/data/coaching-effectiveness-case-study";
import type { FeaturedProject } from "@/data/projects";
import { InternalLink } from "./internal-link";
import { ProjectVisual } from "./project-visual";

interface CoachingEffectivenessCaseStudyProps {
  readonly project: FeaturedProject;
}

const chartBars = ["46%", "62%", "55%", "72%", "68%", "84%", "78%"];

function DecisionSurfaceVisual() {
  return (
    <div className="coaching-study__dashboard" aria-hidden="true">
      <div className="coaching-study__dashboard-bar">
        <span />
        <span />
        <span />
        <strong>Coaching effectiveness</strong>
      </div>
      <div className="coaching-study__dashboard-filters">
        <span>Path · New managers</span>
        <span>KPI · Quality score</span>
        <span>Past 3 days</span>
      </div>
      <div className="coaching-study__dashboard-metrics">
        <div><small>Previous KPI</small><strong>78.6</strong></div>
        <div><small>Current KPI</small><strong>84.2</strong></div>
        <div><small>Improvement</small><strong>+7.1%</strong></div>
      </div>
      <div className="coaching-study__dashboard-chart">
        <div className="coaching-study__axis coaching-study__axis--left">
          <span>90</span><span>80</span><span>70</span>
        </div>
        <div className="coaching-study__bars">
          {chartBars.map((height, index) => (
            <span key={`${height}-${index}`} style={{ height }} />
          ))}
        </div>
        <svg viewBox="0 0 700 210" preserveAspectRatio="none">
          <path d="M0,165 C70,158 95,124 165,135 S265,95 335,112 S430,72 505,84 S610,45 700,52" />
          <circle cx="505" cy="84" r="7" />
        </svg>
        <div className="coaching-study__tooltip">
          <small>14 Aug</small>
          <strong>84.2 KPI</strong>
          <span>+7.1% movement</span>
        </div>
        <div className="coaching-study__chart-labels">
          <span>12 Aug</span><span>13 Aug</span><span>14 Aug</span><span>15 Aug</span>
        </div>
      </div>
    </div>
  );
}

export function CoachingEffectivenessCaseStudy({
  project,
}: CoachingEffectivenessCaseStudyProps) {
  const study = coachingEffectivenessCaseStudy;

  return (
    <main className="coaching-study">
      <section className="coaching-study__hero" aria-labelledby="coaching-title">
        <div className="shell">
          <InternalLink className="back-link coaching-study__back" href="/#work">
            <span aria-hidden="true">←</span> Selected work
          </InternalLink>

          <div className="coaching-study__hero-grid">
            <div className="coaching-study__hero-copy">
              <p className="eyebrow">{study.eyebrow}</p>
              <h1 id="coaching-title">{study.title}</h1>
              <p>{study.lead}</p>
            </div>
            <div className="coaching-study__hero-visual" aria-hidden="true">
              <span className="coaching-study__halo coaching-study__halo--one" />
              <span className="coaching-study__halo coaching-study__halo--two" />
              <ProjectVisual type={project.visual} />
              <small className="case-visual-note">
                Reconstructed interface with illustrative data
              </small>
            </div>
          </div>

          <dl className="coaching-study__facts">
            {study.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="coaching-study__premise shell" aria-labelledby="premise-title">
        <header>
          <p className="eyebrow">01 · The decision behind the dashboard</p>
          <h2 id="premise-title">{study.premise.title}</h2>
          <p>{study.premise.body}</p>
        </header>

        <ol className="coaching-study__questions">
          {study.premise.questions.map((question) => (
            <li key={question.number}>
              <span>{question.number}</span>
              <h3>{question.title}</h3>
              <p>{question.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="coaching-study__evidence" aria-labelledby="evidence-title">
        <div className="shell">
          <div className="coaching-study__evidence-heading">
            <p className="eyebrow">02 · {study.evidence.eyebrow}</p>
            <h2 id="evidence-title">{study.evidence.title}</h2>
            <p>{study.evidence.body}</p>
          </div>

          <div className="coaching-study__equation">
            <div className="coaching-study__equation-values">
              {study.evidence.values.map((value, index) => (
                <article key={value.label}>
                  <span>0{index + 1}</span>
                  <small>{value.label}</small>
                  <h3>{value.value}</h3>
                  <p>{value.body}</p>
                </article>
              ))}
            </div>
            <div className="coaching-study__formula">
              <span>Improvement formula</span>
              <strong>{study.evidence.formula}</strong>
            </div>
            <p className="coaching-study__guardrail">
              <span>Guardrail</span>{study.evidence.guardrail}
            </p>
          </div>
        </div>
      </section>

      <section className="coaching-study__surface shell" aria-labelledby="surface-title">
        <header>
          <p className="eyebrow">03 · One decision surface</p>
          <h2 id="surface-title">{study.surface.title}</h2>
          <p>{study.surface.body}</p>
        </header>

        <DecisionSurfaceVisual />

        <ol className="coaching-study__filter-logic">
          {study.surface.filters.map((filter, index) => (
            <li key={filter.label}>
              <span>0{index + 1}</span>
              <h3>{filter.label}</h3>
              <p>{filter.body}</p>
            </li>
          ))}
        </ol>

        <div className="coaching-study__aggregation-inline">
          <p className="eyebrow">Time grain and tooltip context</p>
          <div className="coaching-study__aggregation-grid">
            {study.aggregation.map((item) => (
              <article key={item.label}>
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <div><small>Tooltip</small><strong>{item.example}</strong></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="coaching-study__contract shell" aria-labelledby="contract-title">
        <header>
          <p className="eyebrow">04 · Full stack contract</p>
          <h2 id="contract-title">{study.contract.title}</h2>
          <p>{study.contract.body}</p>
        </header>

        <div className="coaching-study__contract-table" role="table" aria-label="Full stack decision contract">
          <div className="coaching-study__contract-head" role="row">
            <span role="columnheader">Product question</span>
            <span role="columnheader">Interface responsibility</span>
            <span role="columnheader">Service responsibility</span>
          </div>
          {study.contract.rows.map((row) => (
            <div className="coaching-study__contract-row" role="row" key={row.question}>
              <strong role="cell" data-label="Product question">{row.question}</strong>
              <p role="cell" data-label="Interface responsibility">{row.interface}</p>
              <p role="cell" data-label="Service responsibility">{row.service}</p>
            </div>
          ))}
        </div>
        <aside className="coaching-study__tradeoff">
          <span>Tradeoff accepted</span>
          <p>{study.contract.tradeoff}</p>
        </aside>
      </section>

      <section className="coaching-study__truth" aria-labelledby="truth-title">
        <div className="shell">
          <header>
            <p className="eyebrow">05 · Interpretation boundaries</p>
            <h2 id="truth-title">The dashboard remained useful because its claims stayed precise.</h2>
          </header>

          <ol className="coaching-study__truth-list">
            {study.truthConditions.map((condition) => (
              <li key={condition.number}>
                <span>{condition.number}</span>
                <h3>{condition.title}</h3>
                <p>{condition.body}</p>
              </li>
            ))}
          </ol>

          <div className="coaching-study__verification">
            <div>
              <p className="eyebrow">Verification focus</p>
              <h2>Testing the interpretation, not only the rendering.</h2>
            </div>
            <ul>
              {study.verification.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="coaching-study__final" aria-labelledby="coaching-outcomes-title">
        <div className="shell">
          <div className="coaching-study__outcomes">
            <header>
              <p className="eyebrow">06 · What the product made explicit</p>
              <h2 id="coaching-outcomes-title">
                Leaders could inspect KPI movement without mistaking missing
                evidence for zero.
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

          <article className="coaching-study__reflection">
            <blockquote>{study.reflection.title}</blockquote>
            <p>{study.reflection.body}</p>
          </article>

          <InternalLink className="coaching-study__next" href="/#work">
            <span>
              <small>Selected work</small>
              Return to all engineering stories
            </span>
            <b aria-hidden="true">↗</b>
          </InternalLink>
        </div>
      </section>
    </main>
  );
}
