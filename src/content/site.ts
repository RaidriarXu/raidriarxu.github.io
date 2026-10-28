/**
 * The single source of truth for the portfolio's English copy and public links.
 *
 * Evidence: Hongyu's latest supplied resume, project brief, and read-only CONE
 * implementation notes. Null links and empty arrays are intentional: rendering
 * code must omit unavailable actions and unsupported implementation claims.
 *
 * Local public assets use root-relative paths, e.g. /resume/Hongyu-Xu-Resume.pdf.
 * Apply the deployment base path in the rendering layer, not in this file.
 */

export type SourceStatus = {
  basis: "user-brief" | "resume" | "project-materials";
  detail: string;
};

export type ProjectMedia = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  /** Set true and explain the demonstration in the caption for synthetic data. */
  isDemo: boolean;
  /** An optional external video URL; src remains the lightweight cover image. */
  videoUrl?: string;
};

export type Project = {
  id: "tangerine" | "cone" | "fqc";
  title: string;
  eyebrow: string;
  summary: string;
  contribution: string;
  tags: string[];
  /** Populate only with technologies confirmed by the resume or project material. */
  technologies: string[];
  media: ProjectMedia[];
  links: {
    caseStudy: string | null;
    website: string | null;
    repository: string | null;
    demo: string | null;
  };
  sourceStatus: SourceStatus;
};

export const profile: {
  name: string;
  firstName: string;
  initials: string;
  institution: string;
  institutionShort: string;
  degree: string | null;
  graduation: string;
  headline: string;
  introduction: string;
  about: string[];
  focus: string[];
  seeking: string;
  links: {
    email: string | null;
    github: string | null;
    linkedin: string | null;
    resume: string | null;
  };
  sourceStatus: SourceStatus;
} = {
  name: "Hongyu Xu",
  firstName: "Hongyu",
  initials: "HX",
  institution: "University of Illinois Urbana-Champaign",
  institutionShort: "UIUC",
  degree:
    "B.S. in Mathematics & Computer Science and Brain & Cognitive Science",
  graduation: "May 2027",
  headline: "Turning repetitive work into reliable software.",
  introduction:
    "I'm Hongyu, a UIUC student building applied AI products, LLM agents, and full-stack software. I take tools from a business problem to production—and stay involved after they ship.",
  about: [
    "I like taking work that is repetitive, inefficient, or easy to get wrong and turning it into a dependable software tool. The most rewarding part is seeing that tool become useful to someone.",
    "My interests connect applied AI with full-stack engineering: understanding a problem, building the product, and staying involved after it ships. I'm also interested in cognitive science and neurotechnology, which inform my curiosity about how people and intelligent systems work together.",
  ],
  focus: [
    "Applied AI & LLM agents",
    "Full-stack engineering",
    "Business automation",
  ],
  seeking: "Software Engineer · Applied AI · AI Agent roles",
  links: {
    email: "raidriar1416135605@outlook.com",
    github: "https://github.com/RaidriarXu",
    linkedin: "https://www.linkedin.com/in/hongyu-xu",
    resume: "/resume/Hongyu-Xu-Resume.pdf",
  },
  sourceStatus: {
    basis: "resume",
    detail:
      "Education, expected graduation, and contact details are from the supplied Hongyu_Xu_Resume.pdf. Personal motivation and career direction are from Hongyu's brief.",
  },
};

export const projects: Project[] = [
  {
    id: "tangerine",
    title: "Tangerine Intelligence",
    eyebrow: "Applied AI · Commercial software",
    summary:
      "An enterprise AI platform for spreadsheet, ERP, and document workflows—delivered as web and Windows software and used in production across 100+ user accounts.",
    contribution:
      "As co-founder and founding engineer, I independently engineered and operated the platform under a signed commercial contract with a publicly listed PCB manufacturer.",
    tags: ["Applied AI", "Business workflows", "Production delivery"],
    technologies: [
      "Next.js",
      "TypeScript",
      "Tauri / Rust",
      "PostgreSQL",
      "pgvector",
      "SQL Server",
    ],
    media: [],
    links: {
      caseStudy: "/work/tangerine/",
      website: null,
      repository: null,
      demo: null,
    },
    sourceStatus: {
      basis: "resume",
      detail:
        "Tangerine experience, Mar 2026–Present, in the supplied resume. 100+ measures user accounts, not daily activity or concurrent users. Client identity and private business data are intentionally omitted.",
    },
  },
  {
    id: "cone",
    title: "CONE Lab",
    eyebrow: "Research · EEG & machine learning",
    summary:
      "Reusable EEG–MRI forward-modeling tools and a self-supervised PyTorch model for estimating latent brain states and forecasting EEG.",
    contribution:
      "Built MATLAB/FieldTrip tooling for 8 sessions from 3 subjects, with 6 automatically aligned sessions and 2 corrected cases. Implemented the Transformer–RNN model and verified its training mechanics on synthetic EEG.",
    tags: ["EEG", "Data processing", "Model research"],
    technologies: ["Python", "PyTorch", "MATLAB", "FieldTrip", "HDF5"],
    media: [],
    links: {
      caseStudy: null,
      website: null,
      repository: null,
      demo: null,
    },
    sourceStatus: {
      basis: "project-materials",
      detail:
        "Resume plus read-only review of Lab Cone/LEMON training/model.py, data.py, tests/test_model.py, tests/test_training.py, README.md, and VALIDATION.md, and MATLAB forward-modeling/alignment source. Public claims retain the resume's exact session counts and distinguish implementation checks from research findings.",
    },
  },
  {
    id: "fqc",
    title: "FQC website & engineering demos",
    eyebrow: "Web product · Multilingual experience",
    summary:
      "A trilingual website with six interactive engineering demos and a 12-station virtual factory tour.",
    contribution:
      "Delivered the Next.js/TypeScript site, Three.js demos, quote and contact workflows, and a streaming AI assistant that uses engineering-calculator outputs as context.",
    tags: ["Web development", "Multilingual", "Interaction design"],
    technologies: ["Next.js", "TypeScript", "Three.js", "LLM APIs"],
    media: [
      {
        src: "/images/fqc-homepage.png",
        alt: "FQC homepage with multilingual navigation, manufacturing overview, and facility imagery.",
        caption: "FQC’s public website · captured October 2026.",
        width: 1265,
        height: 712,
        isDemo: false,
      },
    ],
    links: {
      caseStudy: null,
      website: "https://fqc.co.th",
      repository: null,
      demo: "https://fqc.co.th/showcase/",
    },
    sourceStatus: {
      basis: "resume",
      detail:
        "FQC Website & Interactive Engineering Demos in the supplied resume, plus a screenshot of the public homepage and observed public showcase link. The live FQC product includes server-side workflows; this portfolio remains a separate, fully static website.",
    },
  },
];

export type WorkflowStep = {
  title: string;
  description: string;
  media?: ProjectMedia;
};

export type TechnicalDecision = {
  title: string;
  context: string;
  decision: string;
  tradeoff: string;
};

export type EngineeringChallenge = {
  title: string;
  problem: string;
  solution: string;
  result?: string;
};

export type VerifiedMetric = {
  value: string;
  label: string;
  /** Keep the measurement's exact meaning, population, and time window. */
  definition: string;
  source: string;
};

export const tangerine: {
  title: string;
  subtitle: string;
  introduction: string;
  meta: { label: string; value: string }[];
  sourceNote: string;
  context: string[];
  ownership: { title: string; description: string }[];
  delivery: { title: string; description: string }[];
  workflow: WorkflowStep[];
  decisions: TechnicalDecision[];
  challenges: EngineeringChallenge[];
  metrics: VerifiedMetric[];
  media: ProjectMedia[];
  sourceStatus: SourceStatus;
} = {
  title: "Tangerine Intelligence",
  subtitle: "AI-assisted workflows, built for production.",
  introduction:
    "I independently engineered and operated an enterprise AI platform for a publicly listed PCB manufacturer, under Tangerine's signed commercial contract. The delivered web and Windows software supports spreadsheet, ERP, and document workflows across 100+ user accounts.",
  meta: [
    { label: "MY ROLE", value: "Co-Founder & Founding Engineer" },
    { label: "TIMEFRAME", value: "March 2026 — Present" },
    { label: "DELIVERY", value: "Web + Windows software" },
    { label: "OWNERSHIP", value: "Independent engineering & operations" },
  ],
  sourceNote:
    "Commercial delivery and usage figures are reported in my résumé. Workflow diagrams explain the implementation and contain no customer data. Source-code details include refinements validated locally whose production deployment has not been confirmed.",
  context: [
    "Enterprise work spans ERP records, spreadsheets, and documents that do not always arrive in a consistent format. A useful assistant has to connect these sources and turn a request into operations that a person can inspect and approve.",
    "I built Tangerine around a plan–execute–validate workflow: the agent structures the task, the user confirms the tool plan, and consequential writes follow deterministic, auditable execution. My responsibility extends from the full-stack implementation to production operation and maintenance.",
  ],
  ownership: [
    {
      title: "Full-stack product delivery",
      description:
        "Built Next.js, React, and TypeScript services with Tauri/Rust Windows clients, backed by PostgreSQL, pgvector, and Microsoft SQL Server.",
    },
    {
      title: "Agent and retrieval systems",
      description:
        "Implemented orchestration across ERP queries, document retrieval, and spreadsheet operations, plus a multi-stage RAG pipeline for enterprise documents.",
    },
    {
      title: "Production operation",
      description:
        "Implemented background jobs, role-based access, audit logs, automated tests, signed updates, and issue capture with the context needed to investigate failures.",
    },
  ],
  delivery: [
    {
      title: "Commercial engagement",
      description:
        "Delivered under Tangerine's signed commercial contract with a publicly listed PCB manufacturer.",
    },
    {
      title: "Production system",
      description:
        "Web and Windows software used in production across 100+ user accounts.",
    },
    {
      title: "Continued ownership",
      description:
        "Independently developed and maintained beyond initial delivery.",
    },
  ],
  workflow: [
    {
      title: "Describe the task",
      description:
        "Start with a natural-language request and relevant enterprise files. For workbook tasks, identify sheets, headers, and the data sources needed for each field.",
    },
    {
      title: "Review a structured plan",
      description:
        "The system separates writes, reference reads, calculations, validation, and fields that need manual input. The user can confirm, modify, or cancel the proposed plan.",
    },
    {
      title: "Execute within clear boundaries",
      description:
        "Guarded tools carry out the approved operations: ERP access is read-only, while controlled writes produce output workbooks. Reference-only, unsupported, and unresolved fields do not become executable just because the overall plan was confirmed.",
    },
    {
      title: "Validate and explain the result",
      description:
        "Return the output with validation and unresolved-field diagnostics. Audit records make consequential operations traceable for later investigation.",
    },
  ],
  decisions: [
    {
      title: "Separate agent planning from consequential writes",
      context:
        "A flexible language interface still needs precise execution rules when it reads enterprise data or writes an output workbook.",
      decision:
        "Convert requests into structured, user-confirmed tool plans. Keep ERP queries read-only and consequential workbook writes deterministic and auditable.",
      tradeoff:
        "Unresolved or reference-only fields remain explicit; user confirmation cannot silently turn them into supported write operations.",
    },
    {
      title: "Retrieve evidence in multiple stages",
      context:
        "The document corpus contains 6,500+ files totaling 16.6 GB. Relevant sources must be selected from a broad collection before they can support a response.",
      decision:
        "Combine hierarchical context, question classification, hybrid retrieval, structural filtering, deduplication, reranking, and evidence-sufficiency checks.",
      tradeoff:
        "The resume-reported result measures recovery of human-cited source documents. It does not establish answer accuracy, and newer local retrieval refinements remain separate from that result.",
    },
    {
      title: "Make support part of the system",
      context:
        "A deployed product needs a way to control access, distribute updates, and investigate failures after delivery.",
      decision:
        "Implement role-based access, audit logs, automated tests, signed updates, background jobs, and context-rich issue capture alongside the user workflows.",
      tradeoff:
        "The engineering scope includes ongoing operation and maintenance as well as the initial application delivery.",
    },
  ],
  challenges: [
    {
      title: "Writing into a real workbook without damaging its template",
      problem:
        "An existing macro-enabled workbook may contain formulas, merged cells, formatting, and VBA that must survive a data update.",
      solution:
        "Implemented an OOXML cell-patching writer that preserves the workbook package and guards formulas, merged cells, styles, and VBA instead of reconstructing the workbook from scratch.",
      result:
        "An October 2026 local validation retained all 74 package parts and the original VBA hash; only workbook.xml and sheet1.xml changed. This checked package preservation, not macro execution. The report says the live service had not yet been rebuilt or restarted, so this refinement is presented as locally validated.",
    },
    {
      title:
        "Resolving similar-looking ERP fields with different business meanings",
      problem:
        "A field name alone was insufficient to decide which transaction types and values belonged in a report.",
      solution:
        "Checked shipment-operation filtering against the formal report definition and original SQL, preserved genuine negative values, and made output ordering stable.",
      result:
        "The October 2026 validation records the corrections and leaves unresolved business definitions explicit. It does not claim that every template or definition is complete.",
    },
  ],
  metrics: [
    {
      value: "100+",
      label: "User accounts",
      definition:
        "Accounts across which the delivered platform is used in production; this is not a daily-active-user or concurrent-user count.",
      source: "Hongyu_Xu_Resume.pdf — Tangerine Intelligence",
    },
    {
      value: "6,500+",
      label: "Files in the corpus",
      definition:
        "The document collection used by the RAG pipeline totals 16.6 GB.",
      source: "Hongyu_Xu_Resume.pdf — Tangerine Intelligence",
    },
    {
      value: "≈90%",
      label: "Source documents recovered",
      definition:
        "Approximately 90% of human-cited source documents recovered by retrieval. This measures document recovery, not answer accuracy.",
      source: "Hongyu_Xu_Resume.pdf — Tangerine Intelligence",
    },
  ],
  media: [],
  sourceStatus: {
    basis: "project-materials",
    detail:
      "Business delivery, account count, stack, and retrieval metric come from the supplied resume. Workflow and challenge details are grounded in a read-only review of structured-fill-plan.ts, adapter.ts, api/ask/route.ts, fill-template-writer.ts, erp-template-writeback-validation-20261013.md, and erp-multi-template-round2-validation-20261013.md in the supplied Tangerine repository. October validation of local refinements is distinguished from production deployment; newer opt-in retrieval experiments are not presented as evaluated production results.",
  },
};

/** Homepage case summary, grounded in the supplied account and project evidence. */
export const tangerinePreview = {
  contextLabel: "THE BUSINESS PROBLEM",
  context:
    "Employees worked across ERP records, spreadsheets, and documents, often repeating lookups or asking colleagues. I mapped those routines with users before deciding what to automate.",
  buildLabel: "WHAT I BUILT",
  capabilities: [
    {
      title: "Read ERP data",
      description:
        "I connected ERP queries to the assistant while keeping access read-only. Users can retrieve business data without giving the agent permission to change ERP records.",
    },
    {
      title: "Find relevant documents",
      description:
        "I built multi-stage retrieval and used the sales team's own lookup tables as context references. I continue maintaining supporting tables to help the system locate relevant information.",
    },
    {
      title: "Review before execution",
      description:
        "I built a plan–execute–validate workflow: users review tool plans, controlled operations produce output workbooks, and audit records support investigation.",
    },
  ],
  metricNotes: [
    "Across the delivered production platform.",
    "Document corpus totaling 16.6 GB.",
    "Human-cited sources recovered; not answer accuracy.",
  ],
  sourceStatus: {
    basis: "project-materials",
    detail:
      "Summarizes the resume-supported platform scope and Hongyu's supplied customer-workflow and lookup-table account. Does not promote October-only local refinements into deployed functionality; metrics retain their original definitions.",
  } satisfies SourceStatus,
};

/** First-person account supplied by Hongyu; model/cost statements are design aims. */
export const howIWork = {
  label: "HOW I WORK",
  title: "I see myself as part of the harness.",
  workLink: "View selected work",
  noteTitles: [
    "Break down the work.",
    "Match the task to the model.",
    "Understand the people.",
  ],
  paragraphs: [
    "With coding agents such as Codex and Claude Code, I break down the work, decide what can run in parallel, and coordinate multiple agents. I also bring my own approaches and algorithms, then use AI to examine their feasibility before implementation.",
    "I think about complex tasks much like math problems: make the smaller problems clear enough to solve well. For applied AI, I aim to simplify tasks so an appropriately sized model can handle them well at the lowest practical cost.",
    "At Tangerine, I start by understanding how people actually work. I talk with employees, learn how they find information, and turn recurring queries and handoffs into software. I enjoy making repetitive work easier—and seeing the resulting tool get used.",
  ],
  caseLink: {
    href: "/work/tangerine/#perspective",
    label: "My approach in Tangerine",
  },
  sourceStatus: {
    basis: "user-brief",
    detail:
      "Hongyu's first-person account of coding-agent coordination, algorithm exploration, task decomposition, customer conversations, and retrieval reference tables. Model sizing and cost are engineering beliefs and goals, not measured results. His personal development process does not describe a multi-agent scheduling feature in Tangerine.",
  } satisfies SourceStatus,
};

export const experience = {
  title: "Built around useful work.",
  introduction:
    "My work spans commercial software, EEG research, and web products. The common thread is an interest in making complex work easier to understand and more dependable to do.",
  education: {
    institution: profile.institution,
    degree: profile.degree,
    graduation: "Expected May 2027",
    gpa: "3.91 / 4.00",
  },
  interests: ["Cognitive science", "Neurotechnology", "Applied AI"],
  roles: [
    {
      title: "Co-Founder & Founding Engineer",
      organization: "Tangerine Intelligence",
      dates: "Mar 2026 – Present",
      description:
        "Independent development and operation of enterprise AI software, from commercial delivery to ongoing production maintenance.",
    },
    {
      title: "Undergraduate Researcher",
      organization: "CONE Lab, UIUC",
      dates: "Oct 2025 – Present",
      description:
        "EEG–MRI forward modeling and self-supervised neural dynamics research with Prof. Matthew F. Singh.",
    },
    {
      title: "Enterprise Systems Intern",
      organization: "China Southern Power Grid",
      dates: "Jun 2025 – Aug 2025",
      description:
        "Supported internal office applications, employee access permissions, and routine server maintenance in an isolated intranet. Implemented employee-facing query features using internal APIs and database interfaces.",
    },
  ],
};

/** Keep implementation progress, engineering checks, and research conclusions distinct. */
export const coneResearch = {
  advisor: "Prof. Matthew F. Singh",
  labName: "COmputation and NEurodynamics (CONE) Lab",
  summaryCards: [
    {
      status: "IMPLEMENTED",
      title: "From geometry to a trainable model.",
      description:
        "Built MATLAB/FieldTrip forward-modeling tools, then implemented a PyTorch Transformer EEG encoder, autonomous RNN, and fixed leadfield with consistent data loading and normalization.",
    },
    {
      status: "VERIFIED SCOPE",
      title: "8 sessions. 3 subjects.",
      description:
        "Six sessions aligned automatically; two irregular cases corrected. Synthetic EEG checks verified gradient flow, an unchanged leadfield, and consistent predictions after checkpoint reload.",
    },
    {
      status: "RESEARCH IN PROGRESS",
      title: "Testing what the model learns.",
      description:
        "Real-EEG experiments are underway, with channel semantics and acquisition conditions still being checked. Held-out recordings from known subjects do not establish unseen-subject generalization or physiologically correct brain-state recovery.",
    },
  ],
  completed: [
    "Reusable MATLAB/FieldTrip tools for three-layer BEM construction, electrode registration, cortical source models, and leadfield generation across 8 sessions from 3 subjects.",
    "Nearest-surface projection, distance-minimizing alignment, batch execution, and interactive 3D quality control: 6 sessions aligned automatically and 2 irregular cases corrected.",
    "A self-supervised PyTorch implementation combining a Transformer EEG encoder, an autonomous RNN, and a fixed leadfield, with MATLAB/HDF5 loaders and forward-model-consistent normalization.",
  ],
  validated: [
    "Synthetic EEG checks verified gradient flow through the multi-step model, an unchanged fixed leadfield, and prediction consistency after checkpoint reload.",
    "The data pipeline separates training and validation before creating windows and fits normalization statistics on training data.",
  ],
  ongoing: [
    "Evaluating EEG forecasting and checking the source data's channel semantics, reference convention, and acquisition conditions.",
    "Local real-EEG experiment records include held-out recordings from known subjects; they do not establish generalization to unseen subjects or recovery of physiologically correct latent brain states.",
  ],
  sourceStatus: {
    basis: "project-materials" as const,
    detail:
      "Completion counts and the synthetic validation summary are reported in the supplied resume and supported by the MATLAB/PyTorch source. README.md and VALIDATION.md contain newer real-EEG experiments with explicit limitations. No experimental improvement percentage or scientific conclusion is promoted into portfolio copy.",
  },
};

/** Presentation copy for the homepage; factual records above stay reusable. */
export const homeCopy = {
  hero: {
    role: "Software Engineer",
    classPrefix: "Class of",
    titleLines: ["Turning everyday", "friction into", "working software."],
    approachLink: "How I work",
    noteLabel: "THE KIND OF WORK I CARE ABOUT",
    noteLines: [
      "Useful to people.",
      "Reliable in practice.",
      "Built to be used.",
    ],
    noteFooterLines: ["From the first question", "to the next release."],
  },
  socialLabels: { github: "GitHub", linkedin: "LinkedIn" },
  work: {
    label: "SELECTED WORK",
    title: "Ideas, put to work",
    descriptionLines: [
      "Commercial software, research tools,",
      "and interactive web experiences.",
    ],
    featuredLabel: "01 / FEATURED",
    productionStatus: "In production",
    caseStudyLink: "Read the full case study",
    researchLink: "Research scope",
    websiteLink: "Visit live website",
    demoLink: "View demo",
    sourceLink: "Source code",
  },
  about: {
    label: "A LITTLE ABOUT ME",
    titleLines: ["I like making", "things"],
    titleEmphasis: "useful.",
    graduationLabel: "Expected graduation",
  },
  research: {
    label: "RESEARCH, WITH CONTEXT",
    titleLines: ["From EEG signals", "to model-ready data."],
    introduction: `At ${profile.institutionShort}’s ${coneResearch.labName}, I work on the tooling and models behind brain-state estimation.`,
  },
  contact: {
    label: "LET’S CONNECT",
    titleLine: "Have something",
    titleEmphasis: "worth building?",
    rolePrefix: "Exploring",
    graduationLine: `Graduating from ${profile.institutionShort} in ${profile.graduation}.`,
    action: "Get in touch",
  },
};

/** Conceptual diagrams explain the work; none represents a product screenshot. */
export const diagramCopy = {
  workflow: {
    compact: {
      title: "Workbook workflow",
      ariaLabel:
        "Conceptual workbook workflow: a request and files become a structured plan; the user reviews and confirms it; guarded tools query ERP data, retrieve documents, and operate on spreadsheets; results include a workbook and diagnostics. No customer data is shown.",
      steps: [
        { title: "Request + files", detail: "Describe the task" },
        { title: "Structured plan", detail: "User reviews & confirms" },
        { title: "Guarded tools", detail: "ERP · documents · spreadsheets" },
        { title: "Result + validation", detail: "Workbook + diagnostics" },
      ],
      caption: "Conceptual workbook workflow · no customer data",
    },
    ariaLabel:
      "Conceptual workflow: business request, structured plan, user confirmation, tool execution, and validation. Tools read ERP data, retrieve documents, and produce output workbooks.",
    eyebrow: "WORKFLOW / TANGERINE",
    status: "Human in the loop",
    inputEyebrow: "START WITH THE WORK",
    inputTitle: "A business request",
    inputDescription: "Natural language + enterprise files",
    planEyebrow: "PLAN → EXECUTE → VALIDATE",
    planTitle: "Make the next step explicit.",
    confirmation: "User confirms the tool plan",
    tools: ["ERP queries", "Document retrieval", "Spreadsheets"],
    assurances: ["Deterministic writes", "Auditable actions"],
    caption: "Conceptual workflow · no customer data",
  },
  cone: {
    ariaLabel:
      "Conceptual illustration of EEG signals and a cortical source model; not research output.",
    eyebrow: "SIGNALS → MODELS → UNDERSTANDING",
    caption: "Conceptual illustration · not research results",
  },
  fqc: {
    ariaLabel:
      "FQC project illustration: multilingual web experience and interactive engineering.",
    eyebrow: "ENGINEERING, MADE INTERACTIVE",
    brand: "FQC",
    stats: ["3 languages", "6 interactive demos", "12 tour stations"],
    caption: "Project illustration · not a product screenshot",
  },
};

export type HarnessPerspective = {
  label: string;
  title: string;
  introduction: string;
  backgroundTitle: string;
  /** First-person background supplied by Hongyu, not inferred from implementation. */
  background: string[];
  beliefs: { title: string; explanation: string; experience?: string }[];
  closing?: string;
};

/** Implementation evidence and personal perspective have separate sources. */
export const tangerineHarness: {
  title: string;
  introduction: string;
  scopeNote: string;
  responsibilities: {
    title: string;
    problem: string;
    mechanism: string;
    boundary: string;
    sourceFiles: string[];
  }[];
  perspective: HarnessPerspective | null;
} = {
  title: "The engineering around the agent.",
  introduction:
    "The harness connects model output to the rest of the product: a reviewable plan, scoped data access, guarded tools, and a result the user can inspect. The spreadsheet workflow makes those responsibilities concrete.",
  scopeNote:
    "These details describe the current implementation. Production usage figures refer to the delivered platform; they do not confirm deployment of every subsequent refinement.",
  responsibilities: [
    {
      title: "Turn a request into something reviewable",
      problem:
        "A natural-language instruction can describe the goal while leaving the source, matching keys, or destination of a value ambiguous.",
      mechanism:
        "The system creates field-level tasks with target cells, candidate data sources, matching keys, write policies, and unresolved questions. Review and execution both use the structured plan, so the interface can show what each field needs before a write is attempted.",
      boundary:
        "Write tasks, reference reads, calculations, validation, and manual decisions remain distinct operations.",
      sourceFiles: [
        "src/lib/excel/structured-fill-plan.ts",
        "src/lib/excel/structured-fill-plan-adapter.ts",
      ],
    },
    {
      title: "Keep approval attached to the reviewed plan",
      problem:
        "The execution request needs to refer back to the plan and file that the user actually reviewed.",
      mechanism:
        "PostgreSQL stores plans with their user, organization, uploaded file, conversation, and confirmation token. The database-backed execution path reloads the saved plan and stops if it is missing or the token does not match. Source choices are recorded as updates to that plan.",
      boundary:
        "Plan access is scoped to the organization and, for ordinary users, to the plan owner. A saved plan is not an immutable audit log or an exactly-once execution guarantee.",
      sourceFiles: ["src/lib/juzi/fill-plans.ts", "src/app/api/ask/route.ts"],
    },
    {
      title: "Check evidence separately from permission",
      problem:
        "Confirming a task does not establish that a suggested source exists, has the right meaning, or is appropriate for a write.",
      mechanism:
        "Executability and semantic checks remain separate from approval. Placeholder, manual, and reference-only sources stay out of automatic writes, and loaded plans are checked again. Formula protection and analysis-only modes remain in force when source selections change.",
      boundary:
        "The system can leave a field unresolved even after the user confirms the overall task.",
      sourceFiles: [
        "src/lib/excel/structured-fill-plan.ts",
        "src/lib/excel/__tests__/structured-fill-plan.test.ts",
        "src/lib/excel/__tests__/structured-fill-plan-adapter.test.ts",
      ],
    },
    {
      title: "Explain partial completion",
      problem:
        "A generated workbook can be usable even when some fields need clarification. File creation alone does not mean every requested value is resolved.",
      mechanism:
        "Result diagnostics distinguish unresolved sources, manual decisions, preserved values, and query failures. Rows with conflicting order or product identities are skipped rather than mixed together. Ambiguous source matches are not resolved by choosing an arbitrary first row.",
      boundary:
        "Unfilled fields and template-coverage gaps stay visible in the result instead of being presented as complete automation.",
      sourceFiles: [
        "src/lib/excel/fill-workbook.ts",
        "docs/erp-multi-template-round2-validation-20261013.md",
      ],
    },
    {
      title: "Carry task context through to the output",
      problem:
        "Larger fills need progress visibility and a clear connection between the original request, the execution, and the downloadable result.",
      mechanism:
        "Background-task records include the stage, status, source upload, plan, and result. Successful runs save the generated file’s hash and append the result to the conversation. Failures record a reason and task ID. A ten-row sample lets users inspect the output before confirming a larger run.",
      boundary:
        "The current runner executes asynchronously inside the server process. Persisted task records do not establish automatic recovery or reliable retries after a process crash.",
      sourceFiles: [
        "src/lib/juzi/fill-jobs.ts",
        "src/lib/juzi/fill-job-runner.ts",
        "src/app/api/ask/route.ts",
      ],
    },
  ],
  // Hongyu's supplied account, distinct from the implementation evidence above.
  // A null value can still omit the section and its navigation link.
  perspective: {
    label: "HOW I WORK / TANGERINE",
    title: "Understand the work. Then design the workflow.",
    introduction:
      "I see myself as part of the harness: I break down the work, figure out what can run in parallel, and coordinate multiple coding agents. That development habit shares a starting point with the customer workflows I build: understanding how the work gets done.",
    backgroundTitle: "In my own development",
    background: [
      "When I use Codex or Claude Code, I stay involved in deciding how to solve the problem. I often start with an approach or algorithm of my own, ask AI to examine its feasibility, then turn it into concrete implementation tasks. I decide which tasks depend on each other and which can move forward in parallel.",
      "Much like solving a math problem, I try to break a large, difficult task into smaller problems with clear boundaries. Coordinating coding agents this way is a development habit I keep refining.",
    ],
    beliefs: [
      {
        title: "Start with the people doing the work.",
        explanation:
          "At Tangerine, I talk directly with customer employees about their daily workflows: what they need to look up, where they find it, and when they have to ask a colleague. Those conversations help me identify what the system needs to do.",
        experience:
          "I standardize recurring queries and information handoffs and build them into the system. Employees can then find information through search or AI, reducing repeated checks with colleagues and moving more routine work forward themselves.",
      },
      {
        title: "Bring working knowledge into retrieval.",
        explanation:
          "During RAG development, the customer's sales staff shared lookup tables their team had assembled for its own use. I used those materials as context references and continued maintaining and expanding supporting tables to help the system find relevant information.",
        experience:
          "I look at how people already search for answers, then bring useful reference materials and ways of organizing information into the retrieval workflow.",
      },
      {
        title: "Find the right task size for the model.",
        explanation:
          "I think today's LLMs already have enough capability for many applied tasks. I don't need every request to test the hardest problem a model can solve. My aim when designing a harness is to simplify the work and organize its context until an appropriately sized model can handle each step well at the lowest practical cost.",
      },
    ],
    closing:
      "Whether I'm coordinating coding agents or building a customer workflow, I enjoy figuring out how a task gets done and making that process easier. Seeing something that once needed repeated manual effort work through a tool I built is especially rewarding.",
  },
};

/** Editorial checklist; do not render these internal notes as recruiting copy. */
export const contentChecklist = [
  "Tangerine screenshots or video covers cleared for public display, with alt text and captions identifying demo data or redactions.",
  "Optional public-safe evidence of Tangerine's commercial delivery and usage, plus measurement date ranges and evaluation protocol for the resume-reported metrics.",
  "Confirmation before describing the October 2026 locally validated Tangerine refinements as deployed to production.",
  "CONE Lab figures cleared for public display, with captions distinguishing geometry/alignment results, synthetic checks, and exploratory real-EEG evaluation.",
  "Optional FQC demo videos or additional screenshots highlighting individual engineering interactions and the factory tour.",
] as const;
