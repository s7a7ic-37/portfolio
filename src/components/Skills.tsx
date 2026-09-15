const capabilities = [
  {
    number: "01", title: "Interfaces & interaction",
    description: "Responsive interfaces, keyboard-friendly controls, shareable browsing state and clear loading, empty and recovery states.",
    tools: ["JavaScript", "TypeScript", "React", "HTML & CSS", "React Router"],
    evidence: "Explore the news interface", href: "https://pure-news.netlify.app/?topic=coding&sort_by=title&order=asc",
  },
  {
    number: "02", title: "APIs & relational data",
    description: "Express endpoints, parameterized SQL, stable pagination and safe database initialization with transactions and verified TLS.",
    tools: ["Node.js", "Express", "PostgreSQL", "SQL", "Supabase"],
    evidence: "Read the API contract", href: "https://github.com/s7a7ic-37/pure-news-api#production-configuration",
  },
  {
    number: "03", title: "Data & model evaluation",
    description: "Auditable data preparation, time-based validation, simple baselines and honest holdout comparisons before choosing a model.",
    tools: ["Python", "pandas", "NumPy", "DuckDB", "scikit-learn"],
    evidence: "Compare the whole cohort", href: "https://opslens.artemislab.co.uk/#cohort",
  },
  {
    number: "04", title: "Testing & delivery",
    description: "Database-backed regression tests, automated build and credential checks, and static deployments with documented setup and limits.",
    tools: ["Git", "GitHub Actions", "Jest", "Supertest", "Cloudflare Workers", "Render"],
    evidence: "Inspect a CI pipeline", href: "https://github.com/s7a7ic-37/pure-news-api/actions/workflows/checks.yml",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="skills-section">
      <div className="section-wrap">
        <div className="skills-heading">
          <div><p className="eyebrow">Tools, with a purpose</p><h2 className="section-title">Built across<br />the stack.</h2></div>
          <p className="section-intro">A practical toolkit, backed by work you can inspect. The core is full-stack JavaScript; Python and ML are newer skills I’m developing through OpsLens.</p>
        </div>
        <div className="capability-grid">
          {capabilities.map((capability) => (
            <article className="capability-card" key={capability.number}>
              <div className="capability-top"><span>{capability.number}</span></div>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
              <ul className="capability-tools" aria-label={capability.title + " technologies"}>{capability.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul>
              <a href={capability.href}>{capability.evidence} <span aria-hidden="true">↗</span></a>
            </article>
          ))}
        </div>
        <div className="team-toolkit"><span>EARLIER TEAM WORK</span><p>Firebase Authentication, Firestore and Mapbox integration in the four-person travel planner. </p><a href="https://github.com/s7a7ic-37/travel-planner">Project source ↗</a></div>
      </div>
    </section>
  );
}
