import { AboutIntro } from "@/components/about-intro";
import { HeroSystem } from "@/components/hero-system";
import { InternalLink } from "@/components/internal-link";
import { ProjectCard } from "@/components/project-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { earlierWork, featuredProjects } from "@/data/projects";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__aurora" aria-hidden="true" />
          <div className="hero__grid" aria-hidden="true" />

          <div className="hero__inner shell">
            <div className="hero__copy">
              <p className="hero__status">
                <span aria-hidden="true" /> Senior Full Stack Engineer
              </p>
              <h1 id="hero-title">
                Complex systems.
                <span>Clear experiences.</span>
              </h1>
              <p className="hero__lede">
                Across 7+ years, I have led React, TypeScript, and full stack
                delivery for enterprise SaaS, translating scheduling,
                permissions, analytics, and asynchronous workflows into
                production systems teams can operate and extend.
              </p>
              <div className="hero__actions">
                <InternalLink className="hero__cta" href="/#work">
                  Explore selected work <span aria-hidden="true">↓</span>
                </InternalLink>
                <p>React · TypeScript · Node.js · Python</p>
              </div>
            </div>

            <HeroSystem />
          </div>
        </section>

        <AboutIntro />

        <section className="work" id="work" aria-labelledby="work-title">
          <div className="work__inner shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Selected systems · 01–03</p>
                <span className="section-heading__line" aria-hidden="true" />
              </div>
              <h2 id="work-title">
                Engineering stories, <span>not feature lists.</span>
              </h2>
            </div>

            <div className="project-list">
              {featuredProjects.map((project, index) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  visualFirst={index % 2 === 1}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="notes-preview shell" aria-labelledby="notes-title">
          <p className="eyebrow">Engineering Notes</p>
          <h2 id="notes-title">Engineering Notes</h2>
          <p>Writing about React, TypeScript, and the details behind complex product interfaces.</p>
          <InternalLink href="/blog">Read engineering notes ↗</InternalLink>
        </section>

        <section className="earlier-work" aria-labelledby="earlier-work-title">
          <div className="earlier-work__inner shell">
            <div className="section-heading section-heading--compact">
              <p className="eyebrow">Earlier product work</p>
              <h2 id="earlier-work-title">
                Earlier work across CRM, retention, and mortgage operations.
              </h2>
            </div>

            <div className="earlier-work__grid">
              {earlierWork.map((project, index) => (
                <a
                  className="earlier-card"
                  href={project.url}
                  key={project.name}
                  rel="noreferrer"
                  target="_blank"
                  aria-label={`${project.name} product website (opens in a new tab)`}
                >
                  <div>
                    <span className="earlier-card__index">0{index + 1}</span>
                    <p className="earlier-card__domain">{project.domain}</p>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                  </div>
                  <span className="earlier-card__link" aria-hidden="true">
                    Company product ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
