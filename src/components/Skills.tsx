const capabilities = [
  {
    number: "01", title: "Interfaces & interaction",
    description: "Responsive interfaces, keyboard-friendly controls, shareable browsing state and clear loading, empty and recovery states.",
    tools: ["JavaScript", "TypeScript", "React", "HTML & CSS", "React Router"],
    evidence: [{ label: "Pure News · live interface", href: "https://news.artemislab.co.uk/" }],
  },
  {
    number: "02", title: "APIs & relational data",
    description: "Express endpoints, parameterized SQL, stable pagination and safe database initialization with transactions and verified TLS.",
    tools: ["Node.js", "Express", "PostgreSQL", "SQL", "Supabase"],
    evidence: [{ label: "Pure News API · setup", href: "https://github.com/s7a7ic-37/pure-news-api#production-configuration" }],
  },
  {
    number: "03", title: "Data & model evaluation",
    description: "OpsLens evaluates product decisions against a time-based holdout; Grid Demand compares a LightGBM forecast with live NESO readings.",
    tools: ["Python", "pandas", "NumPy", "DuckDB", "scikit-learn", "LightGBM", "Altair", "NESO API"],
    evidence: [
      { label: "OpsLens · holdout evaluation", href: "https://opslens.artemislab.co.uk/#cohort" },
      { label: "Grid Demand · live forecast", href: "https://grid.artemislab.co.uk/" },
    ],
  },
  {
    number: "04", title: "Testing & delivery",
    description: "Database-backed regression tests, automated build and credential checks, and static deployments with documented setup and limits.",
    tools: ["Git", "GitHub Actions", "Jest", "Supertest", "Cloudflare Workers", "Render"],
    evidence: [{ label: "Pure News API · CI checks", href: "https://github.com/s7a7ic-37/pure-news-api/actions/workflows/checks.yml" }],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="skills-section">
      <div className="section-wrap">
        <div className="skills-heading">
          <div><p className="eyebrow">Tools, with a purpose</p><h2 className="section-title">Built across<br />the stack.</h2></div>
          <p className="section-intro">A practical toolkit, backed by work you can inspect. My core is full-stack JavaScript; Python and machine learning are newer skills I’m building through OpsLens and Grid Demand Lab.</p>
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
