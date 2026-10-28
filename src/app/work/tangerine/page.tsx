import type { Metadata } from "next";
import Link from "next/link";
import { tangerine, tangerineHarness, projects, profile } from "@/content/site";
import {
  AgentDiagram,
  Arrow,
  Media,
  SectionLabel,
  TangerineMark,
} from "@/components/ui";
import { absoluteUrl, assetPath } from "@/lib/paths";

const description =
  "An enterprise AI platform for spreadsheet, ERP, and document workflows. Independently engineered and operated by Hongyu Xu under a commercial contract.";
export const metadata: Metadata = {
  title: "Tangerine Intelligence — Project case study",
  description,
  twitter: {
    card: "summary_large_image",
    title: "Tangerine Intelligence — Hongyu Xu",
    description,
    images: [
      absoluteUrl("/images/social-card.png") ||
        assetPath("/images/social-card.png"),
    ],
  },
  alternates: { canonical: absoluteUrl("/work/tangerine/") },
  openGraph: {
    title: "Tangerine Intelligence — Hongyu Xu",
    description,
    type: "article",
    url: absoluteUrl("/work/tangerine/"),
    images: [
      {
        url:
          absoluteUrl("/images/social-card.png") ||
          assetPath("/images/social-card.png"),
        width: 1200,
        height: 630,
        alt: "Hongyu Xu — Tangerine Intelligence case study",
      },
    ],
  },
};

export default function TangerinePage() {
  const project = projects[0];
  const perspective = tangerineHarness.perspective;
  return (
    <main tabIndex={-1} id="main" className="case-study">
      <div className="container">
        <Link href="/#work" className="back-link">
          <span aria-hidden="true">←</span> Back to selected work
        </Link>
        <section className="case-hero">
          <div className="case-kicker">
            <TangerineMark />
            <span className="eyebrow">APPLIED AI / ENTERPRISE SOFTWARE</span>
            <span className="production-badge">
              <i /> In production
            </span>
          </div>
          <h1>
            Tangerine
            <br /> <span className="serif-word">Intelligence.</span>
          </h1>
          <p className="case-subtitle">{tangerine.subtitle}</p>
          <p className="case-introduction">{tangerine.introduction}</p>
          <dl className="case-meta">
            {tangerine.meta.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </section>
        <div className="case-visual">
          <AgentDiagram />
        </div>
        <nav className="case-nav" aria-label="Case study sections">
          {perspective && <a href="#perspective">How I work</a>}
          <a href="#context">Overview</a>
          <a href="#workflow">Workflow</a>
          <a href="#harness">Agent harness</a>
          <a href="#engineering">Engineering</a>
          <a href="#delivery">Delivery</a>
        </nav>
        {perspective && (
          <section
            id="perspective"
            className="harness-perspective"
            aria-labelledby="perspective-title"
          >
            <SectionLabel number="01">{perspective.label}</SectionLabel>
            <h2 id="perspective-title">{perspective.title}</h2>
            <p className="perspective-introduction">
              {perspective.introduction}
            </p>
            <div className="perspective-layout">
              <div className="perspective-background">
                <h3>{perspective.backgroundTitle}</h3>
                {perspective.background.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="perspective-beliefs">
                {perspective.beliefs.map((belief) => (
                  <article key={belief.title}>
                    <h3>{belief.title}</h3>
                    <p>{belief.explanation}</p>
                    {belief.experience && (
                      <p className="belief-experience">{belief.experience}</p>
                    )}
                  </article>
                ))}
              </div>
            </div>
            {perspective.closing && (
              <p className="perspective-closing">{perspective.closing}</p>
            )}
            <div className="perspective-links">
              <a className="text-link" href="#harness">
                Explore the product’s agent harness <Arrow direction="right" />
              </a>
              <Link className="text-link" href="/#how-i-work">
                Back to How I Work <Arrow direction="right" />
              </Link>
            </div>
          </section>
        )}
        <section id="context" className="case-section">
          <div>
            <SectionLabel number="02">THE CONTEXT</SectionLabel>
            <h2>
              Real work.
              <br /> Real constraints.
            </h2>
          </div>
          <div className="case-prose">
            {tangerine.context.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <h3>My contribution</h3>
            {tangerine.ownership.map((item) => (
              <div className="ownership-item" key={item.title}>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>
        <section id="workflow" className="workflow-section">
          <SectionLabel number="03">HOW IT WORKS</SectionLabel>
          <h2>
            A request becomes
            <br /> an <span className="serif-word">explicit plan.</span>
          </h2>
          <div className="workflow-steps">
            {tangerine.workflow.map((step, i) => (
              <article key={step.title}>
                <span className="step-index">0{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                {step.media && <Media item={step.media} />}
              </article>
            ))}
          </div>
          {tangerine.media.length > 0 && (
            <div className="case-gallery">
              {tangerine.media.map((item) => (
                <Media item={item} key={item.src} />
              ))}
            </div>
          )}
        </section>
        <section
          id="harness"
          className="harness-section"
          aria-labelledby="harness-title"
        >
          <div className="harness-intro">
            <SectionLabel number="04">INSIDE THE AGENT HARNESS</SectionLabel>
            <h2 id="harness-title">{tangerineHarness.title}</h2>
            <p>{tangerineHarness.introduction}</p>
            <span className="harness-reading-hint">
              Open each responsibility for implementation details.
            </span>
          </div>
          <div className="harness-responsibilities">
            {tangerineHarness.responsibilities.map((item, i) => (
              <details
                key={item.title}
                open={i === 0}
                className="harness-detail"
              >
                <summary>
                  <span className="harness-number">0{i + 1}</span>
                  <h3>{item.title}</h3>
                  <span className="harness-toggle" aria-hidden="true" />
                </summary>
                <div className="harness-detail-body">
                  <p>{item.problem}</p>
                  <p>{item.mechanism}</p>
                  <p className="harness-boundary">{item.boundary}</p>
                </div>
              </details>
            ))}
          </div>
          <p className="harness-scope-note">{tangerineHarness.scopeNote}</p>
        </section>
        <section id="engineering" className="case-section engineering-section">
          <div>
            <SectionLabel number="05">ENGINEERING DECISIONS</SectionLabel>
            <h2>
              Reliability is
              <br /> part of the product.
            </h2>
            <div className="tag-list">
              {project.technologies.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
          <div className="decision-list">
            {tangerine.decisions.map((item, i) => (
              <article key={item.title}>
                <span className="tiny-label">DECISION 0{i + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.context}</p>
                <p>{item.decision}</p>
                {item.tradeoff && (
                  <p className="decision-tradeoff">{item.tradeoff}</p>
                )}
              </article>
            ))}
          </div>
        </section>
        {tangerine.challenges.length > 0 && (
          <section className="challenge-section">
            <SectionLabel number="06">HARD PARTS & WHAT CHANGED</SectionLabel>
            <h2>
              The details that
              <br /> make a system dependable.
            </h2>
            <div className="challenge-list">
              {tangerine.challenges.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <div>
                    <span className="tiny-label">THE PROBLEM</span>
                    <p>{item.problem}</p>
                    <span className="tiny-label">THE IMPLEMENTATION</span>
                    <p>{item.solution}</p>
                    {item.result && (
                      <p className="challenge-result">{item.result}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
        <section id="delivery" className="delivery-section">
          <SectionLabel number="07">DELIVERED & IN USE</SectionLabel>
          <h2>Beyond the prototype.</h2>
          <div className="case-metrics">
            {tangerine.metrics.map((metric) => (
              <article key={metric.label}>
                <strong>{metric.value}</strong>
                <h3>{metric.label}</h3>
                <p>{metric.definition}</p>
              </article>
            ))}
          </div>
          <div className="delivery-grid">
            {tangerine.delivery.map((item) => (
              <article key={item.title}>
                <span className="check-icon">✓</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
          <p className="source-note">{tangerine.sourceNote}</p>
        </section>
        <section className="case-end">
          <div>
            <p className="tiny-label">WANT TO TALK THROUGH THE DETAILS?</p>
            <h2>Let’s get into the engineering.</h2>
          </div>
          {profile.links.email && (
            <a
              className="button button-dark"
              href={`mailto:${profile.links.email}`}
            >
              Start a conversation <Arrow />
            </a>
          )}
          <Link className="text-link" href="/#work">
            More selected work <Arrow direction="right" />
          </Link>
        </section>
      </div>
    </main>
  );
}
