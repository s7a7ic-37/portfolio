import newsPreview from "../assets/photos/project-news.webp";
import travelPreview from "../assets/photos/project-travel.webp";
import opsPreview from "../assets/photos/project-opslens.webp";
import contractPreview from "../assets/photos/project-contract.webp";
import stockPreview from "../assets/photos/project-stockroom.webp";

const projects = [
  { name: "Pure News", stack: ["React", "Express", "PostgreSQL"], preview: newsPreview, live: "https://pure-news.netlify.app/", source: "https://github.com/s7a7ic-37/pure-news", api: "https://github.com/s7a7ic-37/pure-news-api" },
  { name: "Ready, Jet Set, Go!", stack: ["Next.js", "TypeScript", "Firebase"], preview: travelPreview, live: "https://travel-planner-demo.mpasiecki.workers.dev/demo/", source: "https://github.com/s7a7ic-37/travel-planner" },
  { name: "OpsLens", stack: ["Python", "DuckDB", "scikit-learn"], preview: opsPreview, live: "https://opslens.artemislab.co.uk/", source: "https://github.com/s7a7ic-37/ops-lens" },
  { name: "Contract Check", stack: ["JavaScript", "JSON"], preview: contractPreview, live: "/tools/api-contract-checker/", source: "https://github.com/s7a7ic-37/portfolio/tree/main/public/tools/api-contract-checker" },
  { name: "Stockroom Reconcile", stack: ["JavaScript", "CSV"], preview: stockPreview, live: "/tools/stockroom-reconciliation/", source: "https://github.com/s7a7ic-37/portfolio/tree/main/public/tools/stockroom-reconciliation" },
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
              <div className="project-links"><a href={project.live}>Open project ↗</a><a href={project.source}>Source ↗</a>{project.api && <a href={project.api}>API ↗</a>}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
