const capabilities = [
  {
    title: "Interfaces",
    description: "Responsive pages, forms and navigation.",
    tools: ["JavaScript", "TypeScript", "React", "Next.js", "HTML & CSS", "React Router"],
  },
  {
    title: "APIs & databases",
    description: "REST endpoints, input validation and SQL data.",
    tools: ["Node.js", "Express", "FastAPI", "Pydantic", "PostgreSQL", "SQL", "OpenAI Responses API", "Supabase"],
  },
  {
    title: "Data & machine learning",
    description: "Forecasting and evaluation on demand and retail data.",
    tools: ["Python", "pandas", "NumPy", "DuckDB", "scikit-learn", "LightGBM", "Altair", "NESO API"],
  },
  {
    title: "Testing & delivery",
    description: "Unit and browser tests, CI and deployment.",
    tools: ["Git", "GitHub Actions", "Jest", "Supertest", "Playwright", "pytest", "Docker", "Cloudflare Workers", "Render"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="skills-section">
      <div className="section-wrap">
        <div className="skills-heading">
          <div><p className="eyebrow">Skills</p><h2 className="section-title">What I’ve used.</h2></div>
        </div>
        <div className="capability-grid">
          {capabilities.map((capability) => (
            <article className="capability-card" key={capability.title}>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
              <ul className="capability-tools" aria-label={capability.title + " technologies"}>{capability.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
