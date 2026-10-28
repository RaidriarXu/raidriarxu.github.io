import Link from "next/link";
import type { ReactNode } from "react";
import { profile, diagramCopy, type ProjectMedia } from "@/content/site";
import { assetPath } from "@/lib/paths";

export function Arrow({
  direction = "up",
  className = "",
}: {
  direction?: "up" | "right" | "down";
  className?: string;
}) {
  return (
    <svg
      className={`arrow ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{
        transform:
          direction === "right"
            ? "rotate(45deg)"
            : direction === "down"
              ? "rotate(135deg)"
              : undefined,
      }}
    >
      <path
        d="M5 19 19 5M5 5h14v14"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function ResumeLink({
  className = "text-link",
  children = "Download resume",
}: {
  className?: string;
  children?: ReactNode;
}) {
  if (!profile.links.resume) return null;
  return (
    <a
      href={assetPath(profile.links.resume)}
      className={className}
      download="Hongyu-Xu-Resume.pdf"
    >
      {children}
      <Arrow direction="down" />
    </a>
  );
}

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="wordmark" href="/" aria-label="Hongyu Xu, home">
          hx<span>.</span>
        </Link>
        <nav aria-label="Main navigation">
          <Link href="/#work">Work</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact">Contact</Link>
          <ResumeLink className="nav-resume">Resume</ResumeLink>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer container">
      <Link className="wordmark" href="/" aria-label="Hongyu Xu, home">
        hx<span>.</span>
      </Link>
      <p>Thoughtfully built. Always improving.</p>
      <a href="#top" className="back-top">
        Back to top <Arrow />
      </a>
    </footer>
  );
}

export function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: ReactNode;
}) {
  return (
    <p className="section-label">
      <span>{number}</span>
      {children}
    </p>
  );
}

export function Media({
  item,
  priority = false,
}: {
  item: ProjectMedia;
  priority?: boolean;
}) {
  const photo = (
    <img
      src={assetPath(item.src)}
      alt={item.alt}
      width={item.width}
      height={item.height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
  return (
    <figure className="project-media">
      {item.videoUrl ? (
        <ExternalLink href={item.videoUrl} className="video-cover">
          {photo}
          <span className="video-play">
            Watch demo <Arrow />
          </span>
        </ExternalLink>
      ) : (
        photo
      )}
      <figcaption>
        {item.isDemo && <span className="demo-label">Demo data · </span>}
        {item.caption}
      </figcaption>
    </figure>
  );
}

export function TangerineMark() {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
      className="tangerine-mark"
    >
      <path d="M41 17c7-13 20-13 23-12-2 12-12 17-23 12Z" fill="currentColor" />
      <path
        d="M39 23c-8-6-23-2-27 11-7 21 5 39 27 39s35-18 28-39c-4-13-19-17-28-11Z"
        fill="currentColor"
      />
      <path
        d="M20 44c-1 8 3 15 10 18"
        stroke="var(--mark-line, #fff2df)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A source-backed conceptual diagram, deliberately not styled as a product screenshot. */
export function AgentDiagram({ compact = false }: { compact?: boolean }) {
  if (compact) {
    const diagram = diagramCopy.workflow.compact;
    return (
      <figure
        className="compact-agent-diagram"
        role="img"
        aria-label={diagram.ariaLabel}
      >
        <p className="compact-diagram-title">{diagram.title}</p>
        <ol>
          {diagram.steps.map((step, index) => (
            <li key={step.title}>
              <span className="compact-step-index" aria-hidden="true">
                {index + 1}
              </span>
              <div>
                <strong>{step.title}</strong>
                <span>{step.detail}</span>
              </div>
            </li>
          ))}
        </ol>
        <figcaption>{diagram.caption}</figcaption>
      </figure>
    );
  }
  return (
    <div
      className={`agent-diagram ${compact ? "compact" : ""}`}
      role="img"
      aria-label={diagramCopy.workflow.ariaLabel}
    >
      <div className="diagram-heading">
        <span className="tiny-label">{diagramCopy.workflow.eyebrow}</span>
        <span className="diagram-status">
          <i /> {diagramCopy.workflow.status}
        </span>
      </div>
      <div className="diagram-main">
        <div className="diagram-input">
          <span className="diagram-icon">↳</span>
          <div>
            <span className="tiny-label">
              {diagramCopy.workflow.inputEyebrow}
            </span>
            <strong>{diagramCopy.workflow.inputTitle}</strong>
            <span>{diagramCopy.workflow.inputDescription}</span>
          </div>
        </div>
        <div className="diagram-line" />
        <div className="diagram-plan">
          <div className="plan-symbol">⌘</div>
          <div>
            <span className="tiny-label">
              {diagramCopy.workflow.planEyebrow}
            </span>
            <strong>{diagramCopy.workflow.planTitle}</strong>
          </div>
        </div>
        <div className="confirmation">
          <span className="check-icon">✓</span>{" "}
          {diagramCopy.workflow.confirmation}
        </div>
        <div className="diagram-line" />
        <div className="diagram-tools">
          {diagramCopy.workflow.tools.map((tool) => (
            <span key={tool}>{tool}</span>
          ))}
        </div>
        <div className="diagram-bottom">
          {diagramCopy.workflow.assurances.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
      <div className="diagram-caption">{diagramCopy.workflow.caption}</div>
    </div>
  );
}

export function ConeIllustration() {
  return (
    <div
      className="cone-illustration"
      role="img"
      aria-label={diagramCopy.cone.ariaLabel}
    >
      <div className="tiny-label">{diagramCopy.cone.eyebrow}</div>
      <svg viewBox="0 0 600 210" fill="none" aria-hidden="true">
        <defs>
          <pattern
            id="signal-grid"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <path d="M24 0H0V24" stroke="#5d7269" strokeOpacity=".1" />
          </pattern>
        </defs>
        <rect width="600" height="210" fill="url(#signal-grid)" />
        {[55, 105, 155].map((y, i) => (
          <g key={y}>
            <path
              d={`M0 ${y}h35l6 -5 7 10 6 -7 12 2h18l8 -14 7 30 8 -24 9 10h30l8 -5 9 6 5 -4h18l8 -${20 + i * 5} 8 ${48 + i * 5} 8 -30 8 10h31l7 -6 8 10 8 -4h22`}
              stroke={i === 1 ? "#39705a" : "#739284"}
              strokeWidth="1.6"
            />
            <circle
              key={`c${y}`}
              cx="414"
              cy="105"
              r={34 + i * 24}
              stroke="#39705a"
              strokeOpacity={0.7 - i * 0.2}
            />
          </g>
        ))}
        <path
          d="M329 105h171M414 20v170M353 44l122 122M353 166 475 44"
          stroke="#739284"
          strokeOpacity=".45"
        />
        <circle cx="414" cy="105" r="7" fill="#39705a" />
        {[
          [414, 23],
          [472, 47],
          [496, 105],
          [472, 163],
          [414, 187],
          [356, 163],
          [332, 105],
          [356, 47],
        ].map(([x, y]) => (
          <circle key={`${x}${y}`} cx={x} cy={y} r="3" fill="#39705a" />
        ))}
      </svg>
      <span className="illustration-note">{diagramCopy.cone.caption}</span>
    </div>
  );
}

export function FqcIllustration() {
  return (
    <div
      className="fqc-illustration"
      role="img"
      aria-label={diagramCopy.fqc.ariaLabel}
    >
      <div className="tiny-label">{diagramCopy.fqc.eyebrow}</div>
      <div className="fqc-art">
        <span className="fqc-word">{diagramCopy.fqc.brand}</span>
        <svg viewBox="0 0 160 160" fill="none" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <path
              key={i}
              d={`M80 ${14 + i * 15} ${140 - i * 8} ${49 + i * 13} 80 ${84 + i * 12} ${20 + i * 8} ${49 + i * 13}Z`}
              stroke="currentColor"
              strokeWidth="1.2"
            />
          ))}
          <path
            d="M20 49v62l60 35 60-35V49M80 84v62"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      </div>
      <div className="fqc-art-bottom">
        {diagramCopy.fqc.stats.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <span className="illustration-note">{diagramCopy.fqc.caption}</span>
    </div>
  );
}
