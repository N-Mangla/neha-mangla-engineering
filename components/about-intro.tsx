import Image from "next/image";

const strengths = [
  { value: "7+ years", label: "enterprise SaaS engineering" },
  { value: "UI ↔ API", label: "interfaces, services, and data contracts" },
  { value: "Production", label: "discovery through support" },
];

export function AboutIntro() {
  return (
    <section className="about-intro" id="about" aria-labelledby="about-title">
      <div className="about-intro__grid" aria-hidden="true" />
      <div className="about-intro__inner shell">
        <figure className="about-intro__portrait">
          <div className="about-intro__portrait-frame">
            <Image
              alt="Neha Mangla, Senior Full Stack Engineer"
              className="about-intro__image"
              height={460}
              priority
              sizes="(max-width: 660px) 82vw, (max-width: 940px) 420px, 480px"
              src="/neha-mangla.png"
              unoptimized
              width={460}
            />
            <span className="about-intro__portrait-glow" aria-hidden="true" />
          </div>

          <figcaption>
            <span>Neha Mangla</span>
            <span>Senior Full Stack Engineer</span>
          </figcaption>
        </figure>

        <div className="about-intro__copy">
          <p className="eyebrow eyebrow--light">About · Engineering approach</p>
          <h2 id="about-title">
            I connect product decisions to <span>production reality.</span>
          </h2>
          <p className="about-intro__lede">
            I have led frontend and full stack delivery for enterprise SaaS in
            workforce management, performance analytics, healthcare, and
            mortgage technology. My responsibility has spanned discovery,
            architecture, implementation, release, and production support.
          </p>
          <p className="about-intro__detail">
            My work usually begins where the requirements stop being tidy:
            conflicting service contracts, role specific behaviour, long
            running operations, or metrics that can be misread. I turn those
            constraints into explicit models, service boundaries, recovery
            behaviour, and tests that teams can maintain after release.
          </p>
          <p className="about-intro__leadership">
            Alongside delivery, I review 4–5 pull requests each week, mentor
            engineers, and contribute to technical planning and candidate
            assessment.
          </p>

          <dl className="about-intro__strengths">
            {strengths.map((strength) => (
              <div key={strength.label}>
                <dt>{strength.value}</dt>
                <dd>{strength.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
