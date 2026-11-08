const capabilities = [
  {
    number: "01", title: "Interfaces & interaction",
    description: "Responsive interfaces, keyboard-friendly controls, shareable browsing state and clear loading, empty and recovery states.",
    tools: ["JavaScript", "TypeScript", "React", "Next.js", "HTML & CSS", "React Router"],
    evidence: [{ label: "Pure News · live interface", href: "https://news.artemislab.co.uk/" }, { label: "Travel · Next.js planner", href: "https://travel.artemislab.co.uk/demo/" }],
  },
  {
    number: "02", title: "APIs & relational data",
    description: "REST endpoints, validated requests, source-backed draft review and transactional SQL.",
    tools: ["Node.js", "Express", "FastAPI", "Pydantic", "PostgreSQL", "SQL", "OpenAI Responses API", "Supabase"],
    evidence: [{ label: "Runbook Desk", href: "https://runbook.artemislab.co.uk/" }, { label: "Pure News API", href: "https://github.com/s7a7ic-37/pure-news-api" }],
  },
  {
    number: "03", title: "Data & model evaluation",
    description: "Time-based holdouts and baseline comparisons in OpsLens; live NESO inputs and a separate historical evaluation in Grid Demand.",
    tools: ["Python", "pandas", "NumPy", "DuckDB", "scikit-learn", "LightGBM", "Altair", "NESO API"],
    evidence: [
      { label: "OpsLens · rank forecast errors", href: "https://opslens.artemislab.co.uk/#product-detail" },
      { label: "Grid Demand · live forecast", href: "https://grid.artemislab.co.uk/" },
    ],
  },
  {
    number: "04", title: "Testing & delivery",
    description: "Database-backed regression tests, mobile browser checks, container builds and repeatable deployments.",
    tools: ["Git", "GitHub Actions", "Jest", "Supertest", "Playwright", "pytest", "Docker", "Cloudflare Workers", "Render"],
    evidence: [{ label: "Runbook Desk tests", href: "https://github.com/s7a7ic-37/runbook-desk/actions" }, { label: "Pure News browser checks", href: "https://github.com/s7a7ic-37/pure-news/actions/workflows/checks.yml" }],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="skills-section">
      <div className="section-wrap">
        <div className="skills-heading">
          <div><p className="eyebrow">Tools, with a purpose</p><h2 className="section-title">Built across<br />the stack.</h2></div>
          <p className="section-intro">JavaScript and TypeScript for interfaces and APIs; Python and SQL for data processing, model evaluation and support workflows.</p>
        </div>
        <div className="capability-grid">
          {capabilities.map((capability) => (
            <article className="capability-card" key={capability.number}>
              <div className="capability-top"><span>{capability.number}</span></div>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
              <ul className="capability-tools" aria-label={capability.title + " technologies"}>{capability.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul>
              <div className="capability-evidence">{capability.evidence.map((item) => <a key={item.href} href={item.href}>{item.label} <span aria-hidden="true">↗</span></a>)}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
