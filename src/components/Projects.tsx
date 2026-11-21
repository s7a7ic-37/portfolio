import { useState } from "react";
import newsPreview from "../assets/photos/project-news.png";
import travelPreview from "../assets/photos/project-travel.png";
import opsPreview from "../assets/photos/project-opslens.webp";
import contractPreview from "../assets/photos/project-contract.jpg";
import stockPreview from "../assets/photos/project-stockroom.jpg";
import gridPreview from "../assets/photos/project-grid.png";
import runbookPreview from "../assets/photos/project-runbook.png";
import riverPreview from "../assets/photos/project-river.png";
import depotPreview from "../assets/photos/project-depot.png";
import webhookPreview from "../assets/photos/project-webhooks.png";
import searchPreview from "../assets/photos/project-search.png";
import releasePreview from "../assets/photos/project-release.png";

const caseStudies: Record<string, string> = {
  "Depot Booking": "/case-studies/depot-booking/",
  "River Data Monitor": "/case-studies/river-data-monitor/",
  "Webhook Delivery Lab": "/case-studies/webhook-delivery-lab/",
  "Document Search Lab": "/case-studies/document-search-lab/",
  "Release Check": "/case-studies/release-check/",
  "Runbook Desk": "/case-studies/runbook-desk/",
  "Pure News": "/case-studies/pure-news/",
  "Grid Demand Lab": "/case-studies/grid-demand-lab/",
  "Ready, Jet Set, Go!": "/case-studies/travel-planner/",
  OpsLens: "/case-studies/opslens/",
  "Stockroom Reconcile": "/case-studies/stockroom-reconcile/",
  "Contract Check": "/case-studies/contract-check/",
};

const projects = [
  { name: "Runbook Desk", group: "Applications", stack: ["FastAPI", "TypeScript", "PostgreSQL"], preview: runbookPreview, live: "https://runbook.artemislab.co.uk/", source: "https://github.com/s7a7ic-37/runbook-desk" },
  { name: "Pure News", group: "Applications", stack: ["React", "Express", "PostgreSQL"], preview: newsPreview, live: "https://news.artemislab.co.uk/", source: "https://github.com/s7a7ic-37/pure-news", api: "https://github.com/s7a7ic-37/pure-news-api" },
  { name: "Depot Booking", group: "Applications", stack: ["React", "ASP.NET Core", "PostgreSQL"], preview: depotPreview, live: "https://depot.artemislab.co.uk/", source: "https://github.com/s7a7ic-37/depot-booking", demo: true },
  { name: "River Data Monitor", group: "Data", stack: ["Python", "SQL", "DuckDB"], preview: riverPreview, live: "https://river.artemislab.co.uk/", source: "https://github.com/s7a7ic-37/river-data-monitor" },
  { name: "Webhook Delivery Lab", group: "Developer tools", stack: ["TypeScript", "Queues", "Unit tests"], preview: webhookPreview, live: "https://webhooks.artemislab.co.uk/", source: "https://github.com/s7a7ic-37/webhook-delivery-lab" },
  { name: "Document Search Lab", group: "Data", stack: ["Python", "scikit-learn", "Search evaluation"], preview: searchPreview, live: "https://search-lab.artemislab.co.uk/", source: "https://github.com/s7a7ic-37/document-search-lab" },
  { name: "Release Check", group: "Developer tools", stack: ["Playwright", "JavaScript", "GitHub Actions"], preview: releasePreview, live: "https://release.artemislab.co.uk/", source: "https://github.com/s7a7ic-37/release-check" },
  { name: "Grid Demand Lab", group: "Data", stack: ["Python", "LightGBM", "NESO data"], preview: gridPreview, live: "https://grid.artemislab.co.uk/", source: "https://github.com/s7a7ic-37/grid-demand-lab" },
  { name: "OpsLens", group: "Data", stack: ["Python", "DuckDB", "scikit-learn"], preview: opsPreview, live: "https://opslens.artemislab.co.uk/", source: "https://github.com/s7a7ic-37/ops-lens" },
  { name: "Ready, Jet Set, Go!", group: "Applications", stack: ["Next.js", "TypeScript", "Firebase"], preview: travelPreview, live: "https://travel.artemislab.co.uk/demo/", source: "https://github.com/s7a7ic-37/travel-planner" },
  { name: "Stockroom Reconcile", group: "Applications", stack: ["JavaScript", "CSV"], preview: stockPreview, live: "/tools/stockroom-reconciliation/", source: "https://github.com/s7a7ic-37/portfolio/tree/main/public/tools/stockroom-reconciliation" },
  { name: "Contract Check", group: "Developer tools", stack: ["JavaScript", "JSON"], preview: contractPreview, live: "/tools/api-contract-checker/", source: "https://github.com/s7a7ic-37/portfolio/tree/main/public/tools/api-contract-checker" },
];

const filters = ["All", "Applications", "Data", "Developer tools"] as const;

export default function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const visibleProjects = filter === "All" ? projects : projects.filter(project => project.group === filter);

  return (
    <section id="projects" className="projects-section">
      <div className="section-wrap">
        <div className="projects-heading"><h2 className="section-title">Selected projects.</h2></div>
        <div className="project-filters" role="group" aria-label="Filter projects">
          {filters.map(label => <button key={label} type="button" aria-pressed={label === filter} aria-controls="project-grid"
            onClick={() => setFilter(label)}>{label}</button>)}
        </div>
        <div className="project-grid" id="project-grid">
          {visibleProjects.map(project => (
            <article className="project-card" key={project.name}>
              <a className="project-art" href={project.live} aria-label={`Open ${project.name}`}><img src={project.preview} width="900" height="633" loading="lazy" alt={`${project.name} interface`} /></a>
              <h3>{project.name}</h3>
              <div className="project-tags">{project.stack.map(tool => <span key={tool}>{tool}</span>)}</div>
              <div className="project-links"><a href={project.live}>{project.demo ? "Browser demo" : "Open project"} ↗</a><a href={project.source}>Source ↗</a>{project.api && <a href={project.api}>API ↗</a>}{caseStudies[project.name] && <a href={caseStudies[project.name]}>Case study ↗</a>}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
