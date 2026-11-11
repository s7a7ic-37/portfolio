import { useEffect } from "react";
import styles from "./CaseStudy.module.css";

const studies = {
  "runbook-desk": {
    title: "Runbook Desk",
    subtitle: "Support cases with a review trail.",
    revision: "10041c5",
    stack: "React · TypeScript · FastAPI · PostgreSQL",
    live: "https://runbook.artemislab.co.uk/",
    source: "https://github.com/s7a7ic-37/runbook-desk",
    problem: "Runbook Desk helps a support agent gather evidence, draft a reply and record a human review. It saves cases and review history to PostgreSQL; the demo does not send messages or run procedures.",
    flow: ["Enter a support case", "Choose reference procedures", "Review and edit the draft", "Save the decision"],
    decisions: [
      {title: "Keep reviews current", text: "Reviews include the case version they were opened from. If it has changed, the API returns 409 and the page offers a reload without losing local edits.", path: "server/main.py"},
      {title: "Check incoming text", text: "Pydantic checks the draft and its source IDs before a database write. Citations show where information came from; a person still needs to check whether it is correct.", path: "server/models.py"},
      {title: "Recover an interrupted save", text: "Each new case gets a retry key scoped to its browser workspace. Retrying unchanged details finds the saved case; reuse with different input is rejected.", path: "frontend/src/App.tsx"},
      {title: "Keep the review history", text: "The handoff includes each decision and the reply as it looked at that time.", path: "frontend/src/report.ts"},
    ],
    proof: "Hosted checks cover lost save responses, stale reviews, workspace isolation and deletion rules. CI runs database and Docker checks; browser tests cover recovery from an unreadable response.",
    checks: [
      {label: "Database retry tests", path: "tests/test_creation_retries.py"},
      {label: "Review and deletion tests", path: "tests/test_workflow.py"},
      {label: "Handoff snapshot tests", path: "frontend/tests/report.test.ts"},
      {label: "CI run with Docker build", path: "https://github.com/s7a7ic-37/runbook-desk/actions/runs/42485780784"},
      {label: "Live OpenAPI schema", path: "https://runbook.artemislab.co.uk/api/openapi.json"},
    ],
    demo: "Open a worked example, review its sources, edit the reply, record a decision and download the handoff.",
    limits: "Examples are fictional and browser workspaces are anonymous, not user accounts. OpenAI support is implemented, but real model calls are disabled. Free hosting may take time to start.",
    contribution: "Personal project. The review, save and recovery flows are covered by tests and hosted checks.",
  },
  "pure-news": {
    title: "Pure News",
    subtitle: "A news site with search, comments and votes.",
    revision: "0169cc1",
    stack: "React · Express · PostgreSQL · Jest · Playwright",
    live: "https://news.artemislab.co.uk/",
    source: "https://github.com/s7a7ic-37/pure-news",
    problem: "Pure News combines a React news feed with an Express API and PostgreSQL. Readers can search, filter, vote, comment and save stories, then return to the same place in the feed.",
    flow: ["Browse and search", "Keep filters in the URL", "Validate requests in Express", "Read and write PostgreSQL data"],
    decisions: [
      {title: "Check before writing", text: "The API checks that an article exists and rejects invalid comment text before writing to PostgreSQL.", path: "https://github.com/s7a7ic-37/pure-news-api/blob/e6c5273/models/comments.models.js"},
      {title: "Keep saved stories stable", text: "The reading list stays in the browser. Save and Remove apply the chosen action to current storage, so an older tab cannot undo a newer change.", path: "src/utils/savedStories.js"},
      {title: "Keep drafts after errors", text: "A failed comment request leaves the draft in place. Votes update immediately, then use the server total or roll back. Filters and page stay in the URL when opening a story.", path: "tests/browser/votes.spec.js"},
      {title: "Search article text", text: "Search is limited to 100 characters. The API matches title and body text case-insensitively and includes the topic filter in the paginated count.", path: "https://github.com/s7a7ic-37/pure-news-api/blob/2e3e12b/models/articles.models.js"},
    ],
    proof: "API tests cover search, pagination and validation. Browser tests cover URL state, votes, comments and saved stories. Read-only live checks covered search and comment validation.",
    checks: [
      {label: "Browser search and browsing tests", path: "tests/browser/browsing.spec.js"},
      {label: "Saved-story recovery tests", path: "tests/browser/reading-list.spec.js"},
      {label: "API search and validation tests", path: "https://github.com/s7a7ic-37/pure-news-api/blob/e6c5273/__tests__/app.test.js"},
      {label: "API race regression test", path: "https://github.com/s7a7ic-37/pure-news-api/blob/e3dc588/__tests__/comments.models.test.js"},
      {label: "Frontend CI run", path: "https://github.com/s7a7ic-37/pure-news/actions/runs/42486961132"},
      {label: "API CI run", path: "https://github.com/s7a7ic-37/pure-news-api/actions/runs/42480464240"},
    ],
    demo: "Search Technology for “Running a Node App”, open the story, then return to the same results. Save a story and find it under Saved.",
    limits: "Voting is anonymous, and sample identities are not user accounts. Saved stories stay in the browser. A public news service would need accounts and moderation; the free API may sleep.",
    contribution: "Started as a Northcoders project. Starter work, sample data and the original team history remain credited in the repository; this page describes later browser and API work.",
  },
  "grid-demand-lab": {
    title: "Grid Demand Lab",
    subtitle: "Estimating tomorrow’s electricity demand.",
    revision: "681b10d",
    stack: "Python · LightGBM · pandas · Streamlit · NESO API",
    live: "https://grid.artemislab.co.uk/",
    source: "https://github.com/s7a7ic-37/grid-demand-lab",
    problem: "The dashboard reads Great Britain demand data from NESO, predicts the next day with LightGBM and compares it with NESO’s forecast when available.",
    flow: ["Read the NESO feed", "Check dates and settlement periods", "Estimate next-day demand", "Compare or download the results"],
    decisions: [
      {title: "Match periods by date", text: "Previous-day and previous-week values use the calendar date and settlement period. This handles 46- and 50-period days without shifting every later row.", path: "forecast.py"},
      {title: "Compare with simple baselines", text: "A 28-day holdout and four quarter-end tests compare the model with previous-day and previous-week forecasts. The test periods do not choose the model.", path: "tests/test_forecast.py"},
      {title: "Refresh without retraining", text: "Refresh fetches readings and recalculates the forecast; it does not fit a new model. CSV download captures the values already shown.", path: "app.py"},
    ],
    proof: "On a 28-day 2025 holdout, model MAE was 1,604 MW; previous-day and previous-week baselines were 1,960 MW and 2,278 MW. Tests cover feed parsing, 46/48/50-period days and CSV export.",
    checks: [
      {label: "Forecast and time-split tests", path: "tests/test_forecast.py"},
      {label: "Chart interaction tests", path: "tests/test_plotting.py"},
      {label: "Green CI run", path: "https://github.com/s7a7ic-37/grid-demand-lab/actions/runs/42482666073"},
    ],
    demo: "Choose a time on the chart, download the displayed forecast, then open the backtests to compare historical errors.",
    limits: "The tests use historical data and do not show that the model is suitable for grid operations. The live feed can lag; incomplete days use a weekly fallback. Extra repeated-hour predictions reuse period 48. Free hosting may take time to start.",
    contribution: "Personal project using public NESO data. It is a learning tool, not an operational grid forecast.",
  },
  "travel-planner": {
    title: "Ready, Jet Set, Go!",
    subtitle: "Plan a city trip and adjust the stops.",
    revision: "3878358",
    stack: "Next.js · React · TypeScript · Material UI",
    live: "https://travel.artemislab.co.uk/demo/",
    source: "https://github.com/s7a7ic-37/travel-planner",
    problem: "Choose a UK city, trip length and interests, then make changes to the suggested itinerary. Recent plans can be reopened, exported or printed.",
    flow: ["Choose a city and interests", "Generate a suggested plan", "Replace or reorder stops", "Save, export or print"],
    decisions: [
      {title: "Use curated city lists", text: "Five city catalogues and seven interests feed the planner. It varies suggestions while keeping stops in the selected city.", path: "travel-planner-fe/lib/demo.ts"},
      {title: "Keep plan files local", text: "JSON exports include the city, trip length, interests and stop order. Imports are limited to 6 KB and checked against known places before replacing the open plan.", path: "travel-planner-fe/app/demo/page.tsx"},
      {title: "Keep newer edits", text: "If a file read finishes after the planner has changed, that older import is discarded. Saving the current plan is a separate action.", path: "travel-planner-fe/app/demo/page.tsx"},
    ],
    proof: "Tests cover the five city lists, interests, plan imports and recent history. Browser tests check keyboard reordering, focus and recovery when history removal fails.",
    checks: [
      {label: "Plan and transfer tests", path: "travel-planner-fe/tests/demo.test.mjs"},
      {label: "Shared itinerary link tests", path: "travel-planner-fe/tests/itinerary.test.mjs"},
      {label: "Planner browser regressions", path: "travel-planner-fe/tests/browser/planner.spec.mjs"},
      {label: "Green CI run", path: "https://github.com/s7a7ic-37/travel-planner/actions/runs/42485443867"},
    ],
    demo: "Pick a city and interests, generate a plan, then try another city. Open Recent itineraries, export a plan or print it.",
    limits: "Places are curated. The demo has no live opening times, prices, bookings or route planning.",
    contribution: "The original project was built by a four-person team. This page covers the public planner demo; the repository keeps the team history and attribution.",
  },
  opslens: {
    title: "OpsLens",
    subtitle: "A product-demand forecast checked against later sales.",
    revision: "32a3610",
    stack: "Python · DuckDB SQL · pandas · scikit-learn · JavaScript",
    live: "https://opslens.artemislab.co.uk/",
    source: "https://github.com/s7a7ic-37/ops-lens",
    problem: "OpsLens separates product sales from cancellations, adjustments and non-product rows, then compares seven-day forecasts with later sales from a public retail dataset.",
    flow: ["Load retail data", "Classify rows with SQL", "Build daily product totals", "Compare forecasts with later sales"],
    decisions: [
      {title: "Select before testing", text: "Baselines and gradient boosting are compared on an earlier validation period. The chosen method is fixed before the later holdout is scored.", path: "forecast.py"},
      {title: "Separate sales and adjustments", text: "SQL classifies cancellations, adjustments and invalid rows separately. The data cannot confirm which cancelled lines were returns.", path: "sql/classify_transactions.sql"},
      {title: "Sort by forecast error", text: "The product list can be sorted by each product’s holdout WAPE. This changes the order only; it does not tune the model.", path: "web/helpers.mjs"},
    ],
    proof: "Tests cover time-based splits and scoring. An independent check recalculates results from the 224 published holdout rows and matches the report.",
    checks: [
      {label: "Forecast validation tests", path: "tests/test_pipeline.py"},
      {label: "Dashboard helper tests", path: "web/helpers.test.mjs"},
      {label: "Green CI run", path: "https://github.com/s7a7ic-37/ops-lens/actions/runs/42487304219"},
    ],
    demo: "Sort products by forecast error, open a product chart and export the observed and predicted values.",
    limits: "The data is from UK retail invoices from 2010–2011, not live sales. On one holdout, WAPE was 74% for the selected method and 93% for a simple baseline; errors remain high.",
    contribution: "Personal data project using public CC BY 4.0 data. It is not connected to live stock or store operations.",
  },
  "stockroom-reconcile": {
    title: "Stockroom Reconcile",
    subtitle: "A stock count with clear exceptions.",
    revision: "92eeef0",
    stack: "JavaScript · CSV · Playwright",
    live: "https://portfolio.artemislab.co.uk/tools/stockroom-reconciliation/",
    source: "https://github.com/s7a7ic-37/portfolio",
    problem: "Stockroom Reconcile reads a CSV count sheet, flags shortages and overages, and separates them from invalid rows and duplicate SKUs.",
    flow: ["Choose a CSV", "Check and classify rows", "Search and filter exceptions", "Export the full list"],
    decisions: [
      {title: "Keep input issues separate", text: "Duplicate SKUs and invalid quantities are listed separately. Only valid rows affect the stock totals.", path: "public/tools/stockroom-reconciliation/reconcile.js"},
      {title: "Read files in the browser", text: "The CSV stays on the device. File size and row-count limits keep large inputs manageable.", path: "public/tools/stockroom-reconciliation/app.js"},
      {title: "Show a short worklist, export all", text: "Search and filters change what is visible, not the report. Pages show 25 rows; the CSV export includes every exception.", path: "public/tools/stockroom-reconciliation/app.js"},
    ],
    proof: "Tests cover CSV parsing, invalid rows and safe exports. Browser checks cover search, filters, paging and exporting all exceptions.",
    checks: [
      {label: "Parser and export tests", path: "public/tools/stockroom-reconciliation/reconcile.test.js"},
      {label: "Browser workflow tests", path: "tests/browser/tool-flows.spec.js"},
      {label: "Green CI run", path: "https://github.com/s7a7ic-37/portfolio/actions/runs/42486555076"},
    ],
    demo: "Load the example, filter for shortages, find SKU-104 and export the full exception list.",
    limits: "The example is synthetic and the tool is not connected to a warehouse. It accepts whole-number counts and files up to 5,000 rows.",
    contribution: "Personal browser tool; no live inventory system is connected.",
  },
  "contract-check": {
    title: "Contract Check",
    subtitle: "Compare an API response with its expected fields.",
    revision: "fdd14ed",
    stack: "JavaScript · JSON · Playwright",
    live: "https://portfolio.artemislab.co.uk/tools/api-contract-checker/",
    source: "https://github.com/s7a7ic-37/portfolio",
    problem: "A JSON response can be valid but still miss fields or use the wrong types. Contract Check compares it with a simple template and shows where they differ.",
    flow: ["Load a response and template", "Check required fields and types", "Review the differences", "Download the report"],
    decisions: [
      {title: "Show the exact key", text: "Dot paths handle simple keys; quoted brackets distinguish literal dots from nested keys.", path: "public/tools/api-contract-checker/checker.js"},
      {title: "Limit very large inputs", text: "Contracts stop at 64 levels and 50,000 findings. The screen shows 25 findings per page; oversized reports are rejected rather than partly downloaded.", path: "public/tools/api-contract-checker/app.js"},
      {title: "Keep response files local", text: "Files are limited to 1 MB and read in the browser. If the response is edited while a file is loading, the newer text is kept.", path: "public/tools/api-contract-checker/checker.js"},
    ],
    proof: "Tests cover nested and top-level arrays, key paths, invalid files and input limits. Browser checks cover editing, paging and report downloads.",
    checks: [
      {label: "Contract parser and limit tests", path: "public/tools/api-contract-checker/checker.test.js"},
      {label: "Browser workflow tests", path: "tests/browser/tool-flows.spec.js"},
      {label: "Green CI run", path: "https://github.com/s7a7ic-37/portfolio/actions/runs/42486162846"},
    ],
    demo: "Load the example, change a value’s type and download the report. Input stays in the browser.",
    limits: "This checks required fields and types; it is not a full JSON Schema validator and does not call an API.",
    contribution: "Personal browser tool for checking sample API responses.",
  },
};

export type CaseStudyKey = keyof typeof studies;

export default function CaseStudy({ project }: { project: CaseStudyKey }) {
  const study = studies[project];
  useEffect(() => { document.title = `${study.title} — project case study`; }, [study.title]);
  const sourceLink = (path: string) => path.startsWith("https:") ? path : `${study.source}/blob/${study.revision}/${path}`;
  return (
    <div className={styles.page}>
      <a className={styles.skip} href="#case-content">Skip to case study</a>
      <header className={styles.header}><a href="/#projects">← All projects</a><span>Maksymilian Pasiecki</span></header>
      <main id="case-content" tabIndex={-1} className={styles.content}>
        <p className={styles.eyebrow}>Project case study</p>
        <h1>{study.title}</h1><p className={styles.subtitle}>{study.subtitle}</p>
        <p className={styles.stack}>{study.stack}</p>
        <div className={styles.links}><a href={study.live}>Open project ↗</a><a href={study.source}>Browse source ↗</a></div>
        <section><h2>Overview</h2><p>{study.problem}</p></section>
        <section><h2>How it works</h2><ol className={styles.flow}>{study.flow.map(step => <li key={step}>{step}</li>)}</ol></section>
        <section><h2>A few details</h2>{study.decisions.map(item => <article className={styles.decision} key={item.title}><h3>{item.title}</h3><p>{item.text}</p><a href={sourceLink(item.path)}>View code ↗</a></article>)}</section>
        <section><h2>Tests</h2><p>{study.proof}</p><div className={styles.proofLinks}>{study.checks.map(check => <a key={check.label} href={sourceLink(check.path)}>{check.label} ↗</a>)}</div></section>
        <section><h2>Try it</h2><p>{study.demo}</p></section>
        <section><h2>Limits and my contribution</h2><p>{study.limits}</p><p>{study.contribution}</p></section>
      </main>
      <footer className={styles.footer}><a href="/#projects">← All projects</a><a href={study.source}>Source ↗</a></footer>
    </div>
  );
}
