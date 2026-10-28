import Link from "next/link";
import {
  profile,
  projects,
  experience,
  tangerine,
  tangerinePreview,
  coneResearch,
  homeCopy,
  howIWork,
  type Project,
} from "@/content/site";
import {
  AgentDiagram,
  Arrow,
  ConeIllustration,
  ExternalLink,
  FqcIllustration,
  Media,
  ResumeLink,
  SectionLabel,
  TangerineMark,
} from "@/components/ui";

function ProjectExternalLinks({ project }: { project: Project }) {
  const configuredLinks = [
    { href: project.links.website, label: homeCopy.work.websiteLink },
    { href: project.links.demo, label: homeCopy.work.demoLink },
    { href: project.links.repository, label: homeCopy.work.sourceLink },
  ];
  const seen = new Set<string>();
  const links = configuredLinks.flatMap(({ href, label }) => {
    if (!href) return [];
    const normalizedHref = href.replace(/\/+$/, "");
    if (seen.has(normalizedHref)) return [];
    seen.add(normalizedHref);
    return [{ href, label }];
  });
  if (!links.length) return null;
  return (
    <div className="project-external-links flex flex-wrap gap-x-6">
      {links.map((link) => (
        <ExternalLink key={link.href} className="text-link" href={link.href}>
          {link.label} <Arrow />
        </ExternalLink>
      ))}
    </div>
  );
}

export default function HomePage() {
  const featured = projects[0];
  return (
    <main tabIndex={-1} id="main" className="home-page">
      <section className="hero container" aria-labelledby="intro-title">
        <div className="hero-topline">
          <p className="eyebrow">
            <span className="live-dot" /> {profile.name.toUpperCase()} /{" "}
            {homeCopy.hero.role.toUpperCase()}
          </p>
          <span className="hero-location">
            {profile.institutionShort} <span>↗</span>{" "}
            {homeCopy.hero.classPrefix} {profile.graduation.split(" ").at(-1)}
          </span>
        </div>
        <div className="hero-grid">
          <div>
            <h1 id="intro-title">
              {homeCopy.hero.titleLines[0]}
              <br className="desktop-break" /> {homeCopy.hero.titleLines[1]}
              <br />{" "}
              <span className="serif-word">{homeCopy.hero.titleLines[2]}</span>
            </h1>
            <p className="hero-description">{profile.introduction}</p>
            <div className="hero-actions">
              <a href="#how-i-work" className="button button-dark">
                {homeCopy.hero.approachLink} <Arrow direction="down" />
              </a>
              <ResumeLink />
            </div>
          </div>
          <aside className="hero-note">
            <div className="note-symbol" aria-hidden="true">
              ↳
            </div>
            <p className="tiny-label">{homeCopy.hero.noteLabel}</p>
            <p>
              {homeCopy.hero.noteLines[0]}
              <br /> {homeCopy.hero.noteLines[1]}
              <br /> <span>{homeCopy.hero.noteLines[2]}</span>
            </p>
            <div className="note-footer">
              <span>
                {homeCopy.hero.noteFooterLines[0]}
                <br /> {homeCopy.hero.noteFooterLines[1]}
              </span>
              <span className="note-plus" aria-hidden="true">
                +
              </span>
            </div>
          </aside>
        </div>
        <div className="hero-bottom">
          <div className="focus-list">
            {profile.focus.map((item, i) => (
              <span key={item}>
                <small>0{i + 1}</small>
                {item}
              </span>
            ))}
          </div>
          <div className="hero-socials">
            {profile.links.github && (
              <ExternalLink href={profile.links.github}>
                {homeCopy.socialLabels.github} <Arrow />
              </ExternalLink>
            )}
            {profile.links.linkedin && (
              <ExternalLink href={profile.links.linkedin}>
                {homeCopy.socialLabels.linkedin} <Arrow />
              </ExternalLink>
            )}
          </div>
        </div>
      </section>

      <section
        id="how-i-work"
        className="how-i-work-section"
        aria-labelledby="how-i-work-title"
      >
        <div className="how-i-work-inner container">
          <div className="how-i-work-heading">
            <SectionLabel number="01">{howIWork.label}</SectionLabel>
            <h2 id="how-i-work-title">{howIWork.title}</h2>
          </div>
          <div className="how-i-work-body">
            <div className="how-i-work-notes">
              {howIWork.paragraphs.map((paragraph, index) => (
                <article key={paragraph}>
                  <span className="work-note-number" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <h3>{howIWork.noteTitles[index]}</h3>
                  <p>{paragraph}</p>
                </article>
              ))}
            </div>
            <div className="how-i-work-links">
              <a
                className="portfolio-action portfolio-action-primary"
                href="#work"
              >
                <span>{howIWork.workLink}</span> <Arrow direction="down" />
              </a>
              <Link className="portfolio-action" href={howIWork.caseLink.href}>
                <span>{howIWork.caseLink.label}</span>{" "}
                <Arrow direction="right" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="work-section" aria-labelledby="work-title">
        <div className="container">
          <div className="section-heading">
            <div>
              <SectionLabel number="02">{homeCopy.work.label}</SectionLabel>
              <h2 id="work-title">
                {homeCopy.work.title}
                <span className="orange">.</span>
              </h2>
            </div>
            <p>
              {homeCopy.work.descriptionLines[0]}
              <br className="desktop-break" />{" "}
              {homeCopy.work.descriptionLines[1]}
            </p>
          </div>
          <article className="featured-project">
            <div className="featured-copy">
              <div className="featured-overview">
                <div className="project-eyebrow">
                  <span className="project-number">
                    {homeCopy.work.featuredLabel}
                  </span>
                  <span className="production-badge">
                    <i /> {homeCopy.work.productionStatus}
                  </span>
                </div>
                <div className="featured-title">
                  <TangerineMark />
                  <h3>
                    {featured.links.caseStudy ? (
                      <Link href={featured.links.caseStudy}>
                        {featured.title}
                      </Link>
                    ) : (
                      featured.title
                    )}
                  </h3>
                </div>
                <p className="project-summary">{featured.summary}</p>
              </div>
              <div className="featured-context">
                <h4>{tangerinePreview.contextLabel}</h4>
                <p>{tangerinePreview.context}</p>
                <p className="contribution">{featured.contribution}</p>
              </div>
              <div className="featured-meta">
                <div className="tag-list">
                  {featured.technologies.slice(0, 5).map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                {featured.links.caseStudy && (
                  <Link
                    href={featured.links.caseStudy}
                    className="portfolio-action case-link"
                  >
                    <span>{homeCopy.work.caseStudyLink}</span>{" "}
                    <Arrow direction="right" />
                  </Link>
                )}
                <ProjectExternalLinks project={featured} />
              </div>
            </div>
            <div className="featured-implementation">
              <div className="featured-diagram">
                <AgentDiagram compact />
              </div>
              <div className="featured-build">
                <p className="tiny-label">{tangerinePreview.buildLabel}</p>
                <div className="featured-capabilities">
                  {tangerinePreview.capabilities.map((capability) => (
                    <section key={capability.title}>
                      <h4>{capability.title}</h4>
                      <p>{capability.description}</p>
                    </section>
                  ))}
                </div>
                {featured.media.length > 0 && (
                  <Media item={featured.media[0]} />
                )}
              </div>
            </div>
            <div className="featured-stats">
              {tangerine.metrics.slice(0, 3).map((metric, index) => (
                <div key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                  <p>{tangerinePreview.metricNotes[index]}</p>
                </div>
              ))}
            </div>
          </article>
          <div className="project-grid">
            {projects.slice(1).map((project, i) => (
              <article
                key={project.id}
                className={`secondary-project ${project.id}`}
              >
                <div className="project-visual">
                  {project.media.length ? (
                    <Media item={project.media[0]} />
                  ) : project.id === "cone" ? (
                    <ConeIllustration />
                  ) : (
                    <FqcIllustration />
                  )}
                </div>
                <div className="secondary-copy">
                  <div className="project-eyebrow">
                    <span className="project-number">0{i + 2}</span>
                    <span>{project.eyebrow}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p className="project-summary">{project.summary}</p>
                  <p className="contribution">{project.contribution}</p>
                  <div className="tag-list">
                    {project.technologies.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  {project.id === "cone" && (
                    <a className="text-link" href="#research">
                      {homeCopy.work.researchLink} <Arrow direction="right" />
                    </a>
                  )}
                  <ProjectExternalLinks project={project} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="about-band" aria-labelledby="about-title">
        <div className="about-section container">
          <div className="about-intro">
            <SectionLabel number="03">{homeCopy.about.label}</SectionLabel>
            <h2 id="about-title">
              {homeCopy.about.titleLines[0]}
              <br /> {homeCopy.about.titleLines[1]}{" "}
              <span className="serif-word">{homeCopy.about.titleEmphasis}</span>
            </h2>
            <div className="education-card">
              <span className="education-mark" aria-hidden="true">
                I
              </span>
              <div>
                <strong>{profile.institution}</strong>
                <p>{profile.degree}</p>
                <span>
                  {homeCopy.about.graduationLabel} · {profile.graduation}
                </span>
              </div>
            </div>
          </div>
          <div className="about-body">
            {profile.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <div className="experience-list">
              {experience.roles.map((role) => (
                <article key={role.organization}>
                  <div>
                    <h3>{role.organization}</h3>
                    <span>{role.dates}</span>
                  </div>
                  <p>{role.title}</p>
                  <p className="role-description">{role.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="research"
        className="research-band"
        aria-labelledby="research-title"
      >
        <div className="research-section container">
          <SectionLabel number="04">{homeCopy.research.label}</SectionLabel>
          <div className="research-heading">
            <h2 id="research-title">
              {homeCopy.research.titleLines[0]}
              <br /> {homeCopy.research.titleLines[1]}
            </h2>
            <p>{homeCopy.research.introduction}</p>
          </div>
          <div className="research-grid">
            {coneResearch.summaryCards.map((card) => (
              <article key={card.status}>
                <span className="research-status">{card.status}</span>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="contact-section"
        aria-labelledby="contact-title"
      >
        <div className="container contact-inner">
          <div>
            <SectionLabel number="05">{homeCopy.contact.label}</SectionLabel>
            <h2 id="contact-title">
              {homeCopy.contact.titleLine}
              <br />{" "}
              <span className="serif-word">
                {homeCopy.contact.titleEmphasis}
              </span>
            </h2>
            <p>
              {homeCopy.contact.rolePrefix} {profile.seeking}.<br />{" "}
              {homeCopy.contact.graduationLine}
            </p>
          </div>
          <div className="contact-actions">
            {profile.links.email && (
              <a
                href={`mailto:${profile.links.email}`}
                className="button button-dark"
              >
                {homeCopy.contact.action} <Arrow />
              </a>
            )}
            <div className="contact-links">
              {profile.links.github && (
                <ExternalLink href={profile.links.github}>
                  {homeCopy.socialLabels.github} <Arrow />
                </ExternalLink>
              )}
              {profile.links.linkedin && (
                <ExternalLink href={profile.links.linkedin}>
                  {homeCopy.socialLabels.linkedin} <Arrow />
                </ExternalLink>
              )}
              <ResumeLink />
            </div>
            {profile.links.email && (
              <a
                className="email-address"
                href={`mailto:${profile.links.email}`}
              >
                {profile.links.email}
              </a>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
