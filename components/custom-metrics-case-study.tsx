import { customMetricsCaseStudy } from "@/data/custom-metrics-case-study";
import type { FeaturedProject } from "@/data/projects";
import { InternalLink } from "./internal-link";
import { ProjectVisual } from "./project-visual";

interface CustomMetricsCaseStudyProps {
  readonly project: FeaturedProject;
}

type WorkflowStage = (typeof customMetricsCaseStudy.workflow)[number];

function WorkflowVisual({ visual }: Pick<WorkflowStage, "visual">) {
  switch (visual) {
    case "upload":
      return (
        <div className="import-study__mini import-study__mini--upload" aria-hidden="true">
          <div className="import-study__file">
            <span>CSV</span>
            <div>
              <strong>custom_metrics.csv</strong>
              <small>Ready for validation</small>
            </div>
            <b>10 MB max</b>
          </div>
          <div className="import-study__checks">
            <span>✓ Field specification reviewed</span>
            <span>✓ Destination metric selected</span>
          </div>
        </div>
      );
    case "preview":
      return (
        <div className="import-study__mini import-study__mini--preview" aria-hidden="true">
          <div className="import-study__table-meta">
            <span><strong>2,480</strong> rows</span>
            <span><strong>5</strong> columns</span>
            <small>First 3 rows shown</small>
          </div>
          <div className="import-study__table">
            <div><b>agent_id</b><b>csat_score</b><b>timestamp</b></div>
            <div><span>A1042</span><span>4.8</span><span>09:32</span></div>
            <div><span>A1187</span><span>4.3</span><span>10:14</span></div>
            <div><span>A1211</span><span>4.9</span><span>11:06</span></div>
          </div>
        </div>
      );
    case "mapping":
      return (
        <div className="import-study__mini import-study__mini--mapping" aria-hidden="true">
          <div>
            <span>Agent ID</span><i>→</i><strong>agent_id</strong><small>A1042</small>
          </div>
          <div>
            <span>CSAT Score</span><i>→</i><strong>csat_score</strong><small>4.8</small>
          </div>
          <div>
            <span>Interaction time</span><i>→</i><strong>timestamp</strong><small>09:32</small>
          </div>
        </div>
      );
    case "execute":
      return (
        <div className="import-study__mini import-study__mini--execute" aria-hidden="true">
          <div className="import-study__queue-status">
            <span>Processing</span><strong>76%</strong>
          </div>
          <div className="import-study__progress"><span /></div>
          <div className="import-study__result-row">
            <span>Processed <strong>1,984</strong></span>
            <span>Successful <strong>1,962</strong></span>
            <span>Review <strong>22</strong></span>
          </div>
        </div>
      );
    default: {
      const exhaustiveCheck: never = visual;
      return exhaustiveCheck;
    }
  }
}

export function CustomMetricsCaseStudy({
  project,
}: CustomMetricsCaseStudyProps) {
  const study = customMetricsCaseStudy;

  return (
    <main className="import-study">
      <section className="import-study__hero" aria-labelledby="case-title">
        <div className="shell">
          <InternalLink className="back-link import-study__back" href="/#work">
            <span aria-hidden="true">←</span> Selected work
          </InternalLink>

          <div className="import-study__hero-grid">
            <div className="import-study__hero-copy">
              <p className="eyebrow">{study.eyebrow}</p>
              <h1 id="case-title">{study.title}</h1>
              <p>{study.lead}</p>
            </div>

            <div className="import-study__hero-visual" aria-hidden="true">
              <span className="import-study__orbit import-study__orbit--one" />
              <span className="import-study__orbit import-study__orbit--two" />
              <ProjectVisual type={project.visual} />
              <small className="case-visual-note">
                Reconstructed interface with illustrative data
              </small>
            </div>
          </div>

          <dl className="import-study__facts">
            {study.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="import-study__premise shell" aria-labelledby="premise-title">
        <header>
          <p className="eyebrow">01 · Two clocks, one experience</p>
          <h2 id="premise-title">{study.premise.title}</h2>
        </header>

        <div className="import-study__clock-grid">
          {[study.premise.userClock, study.premise.systemClock].map((clock) => (
            <article key={clock.label}>
              <span>{clock.label}</span>
              <h3>{clock.title}</h3>
              <p>{clock.body}</p>
            </article>
          ))}
        </div>

        <div className="import-study__ownership">
          <span>My ownership</span>
          <p>{study.premise.ownership}</p>
        </div>
      </section>

      <section className="import-study__workflow" aria-labelledby="workflow-title">
        <div className="shell">
          <header className="import-study__section-heading">
            <div>
              <p className="eyebrow">02 · The product journey</p>
              <h2 id="workflow-title">
                Each step removed a different source of uncertainty.
              </h2>
            </div>
            <p>
              The interface became progressively more specific: establish the
              contract, inspect the data, preserve its meaning, then hand work
              to the asynchronous system.
            </p>
          </header>

          <ol className="import-study__workflow-grid">
            {study.workflow.map((stage) => (
              <li key={stage.number}>
                <div className="import-study__workflow-copy">
                  <div>
                    <span>{stage.number}</span>
                    <small>{stage.label}</small>
                  </div>
                  <h3>{stage.title}</h3>
                  <p>{stage.body}</p>
                  <ul>
                    {stage.details.map((detail) => <li key={detail}>{detail}</li>)}
                  </ul>
                </div>
                <WorkflowVisual visual={stage.visual} />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="import-study__system shell" aria-labelledby="system-title">
        <div className="import-study__system-panel">
          <header>
            <p className="eyebrow">03 · {study.system.eyebrow}</p>
            <h2 id="system-title">{study.system.title}</h2>
            <p>{study.system.body}</p>
          </header>

          <ol className="import-study__pipeline" aria-label="Import processing pipeline">
            {study.system.pipeline.map((stage) => (
              <li key={stage.number}>
                <span>{stage.number}</span>
                <strong>{stage.label}</strong>
                <small>{stage.body}</small>
              </li>
            ))}
          </ol>

          <div className="import-study__state-model">
            <span>One canonical lifecycle</span>
            <ol aria-label="Import lifecycle states">
              {study.system.states.map((state) => (
                <li className={`is-${state.tone}`} key={state.label}>
                  {state.label}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="import-study__recovery shell" aria-labelledby="recovery-title">
        <header className="import-study__section-heading">
          <div>
            <p className="eyebrow">04 · Recovery by design</p>
            <h2 id="recovery-title">
              Failure boundaries determined whether the workflow remained credible.
            </h2>
          </div>
          <p>
            I treated failure as part of the normal product lifecycle, not an
            exceptional screen added after the happy path.
          </p>
        </header>

        <ol className="import-study__recovery-grid">
          {study.recovery.map((item) => (
            <li key={item.number}>
              <div className="import-study__recovery-title">
                <span>{item.number}</span>
                <small>{item.moment}</small>
                <h3>{item.title}</h3>
              </div>
              <div className="import-study__recovery-body">
                <p>{item.situation}</p>
                <dl>
                  <div>
                    <dt>Direction</dt>
                    <dd>{item.direction}</dd>
                  </div>
                  <div>
                    <dt>Outcome</dt>
                    <dd>{item.outcome}</dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}
        </ol>

        <aside className="import-study__tradeoff">
          <span>Tradeoff accepted</span>
          <p>{study.tradeoff}</p>
        </aside>

        <div className="import-study__verification">
          <div>
            <p className="eyebrow">Verification and release</p>
            <h2>Verify the states users could actually encounter.</h2>
          </div>
          <dl>
            {study.verification.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="import-study__final" aria-labelledby="outcomes-title">
        <div className="shell">
          <div className="import-study__outcomes">
            <header>
              <p className="eyebrow">05 · Product outcomes</p>
              <h2 id="outcomes-title">
                The import remained traceable from file selection to KPI reporting.
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

          <article className="import-study__reflection">
            <blockquote>{study.reflection.title}</blockquote>
            <p>{study.reflection.body}</p>
          </article>

          <InternalLink className="import-study__next" href="/work/coaching-effectiveness">
            <span>
              <small>Next case study</small>
              Making performance after coaching explainable
            </span>
            <b aria-hidden="true">↗</b>
          </InternalLink>
        </div>
      </section>
    </main>
  );
}
