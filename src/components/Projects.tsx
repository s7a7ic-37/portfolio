import newsPreview from "../assets/photos/project-news.png";
import travelPreview from "../assets/photos/project-travel.png";
import opsPreview from "../assets/photos/project-opslens.webp";
import contractPreview from "../assets/photos/project-contract.jpg";
import stockPreview from "../assets/photos/project-stockroom.jpg";
import gridPreview from "../assets/photos/project-grid.png";
import runbookPreview from "../assets/photos/project-runbook.png";

const caseStudies: Record<string, string> = {
  "Runbook Desk": "/case-studies/runbook-desk/",
  "Pure News": "/case-studies/pure-news/",
  OpsLens: "/case-studies/opslens/",
  "Stockroom Reconcile": "/case-studies/stockroom-reconcile/",
};

const projects = [
  { name: "Runbook Desk", stack: ["FastAPI", "TypeScript", "PostgreSQL"], preview: runbookPreview, live: "https://runbook.artemislab.co.uk/", source: "https://github.com/s7a7ic-37/runbook-desk" },
  { name: "Pure News", stack: ["React", "Express", "PostgreSQL"], preview: newsPreview, live: "https://news.artemislab.co.uk/", source: "https://github.com/s7a7ic-37/pure-news", api: "https://github.com/s7a7ic-37/pure-news-api" },
  { name: "Grid Demand Lab", stack: ["Python", "LightGBM", "NESO data"], preview: gridPreview, live: "https://grid.artemislab.co.uk/", source: "https://github.com/s7a7ic-37/grid-demand-lab" },
  { name: "OpsLens", stack: ["Python", "DuckDB", "scikit-learn"], preview: opsPreview, live: "https://opslens.artemislab.co.uk/", source: "https://github.com/s7a7ic-37/ops-lens" },
  { name: "Ready, Jet Set, Go!", stack: ["Next.js", "TypeScript", "Firebase"], preview: travelPreview, live: "https://travel.artemislab.co.uk/demo/", source: "https://github.com/s7a7ic-37/travel-planner" },
  { name: "Stockroom Reconcile", stack: ["JavaScript", "CSV"], preview: stockPreview, live: "/tools/stockroom-reconciliation/", source: "https://github.com/s7a7ic-37/portfolio/tree/main/public/tools/stockroom-reconciliation" },
  { name: "Contract Check", stack: ["JavaScript", "JSON"], preview: contractPreview, live: "/tools/api-contract-checker/", source: "https://github.com/s7a7ic-37/portfolio/tree/main/public/tools/api-contract-checker" },
];

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <div className="section-wrap">
        <div className="projects-heading"><h2 className="section-title">Selected projects.</h2></div>
        <div className="project-grid">
          {projects.map(project => (
            <article className="project-card" key={project.name}>
              <a className="project-art" href={project.live} aria-label={`Open ${project.name}`}><img src={project.preview} width="900" height="633" loading="lazy" alt={`${project.name} interface`} /></a>
              <h3>{project.name}</h3>
              <div className="project-tags">{project.stack.map(tool => <span key={tool}>{tool}</span>)}</div>
              <div className="project-links"><a href={project.live}>Open project ↗</a><a href={project.source}>Source ↗</a>{project.api && <a href={project.api}>API ↗</a>}{caseStudies[project.name] && <a href={caseStudies[project.name]}>Case study ↗</a>}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
