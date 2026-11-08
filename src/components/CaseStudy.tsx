import { useEffect } from "react";
import styles from "./CaseStudy.module.css";

const studies = {
  "runbook-desk": {
    title: "Runbook Desk",
    subtitle: "Keeping a support decision connected to its evidence.",
    revision: "c984692",
    stack: "React · TypeScript · FastAPI · PostgreSQL",
    live: "https://runbook.artemislab.co.uk/",
    source: "https://github.com/s7a7ic-37/runbook-desk",
    problem: "A draft reply is only useful if a reviewer can inspect its sources, change it and see what was actually approved. This personal project models that workflow without sending messages or executing procedures.",
    flow: ["React workspace", "Same-origin API proxy", "FastAPI validation", "PostgreSQL cases and reviews"],
    decisions: [
      {title: "Reject a stale review", text: "A review includes the version of the case it opened. The database transaction rejects an outdated version with HTTP 409, preserving the earlier decision. The interface retains local edits and offers an explicit reload.", path: "server/main.py"},
      {title: "Validate the evidence boundary", text: "Structured drafts must reference the incident or selected runbook IDs. Pydantic validates the shape and allowed citations. That checks references, not whether a proposed explanation is true; human review remains necessary.", path: "server/models.py"},
      {title: "Recover a save after a lost response", text: "A new case carries a workspace-scoped retry key. If its response is lost, an explicit retry with unchanged details returns the saved case. PostgreSQL rejects reuse for different input. The pending key lasts while the page stays open; writes are never repeated automatically.", path: "frontend/src/App.tsx"},
    ],
    proof: "Four hosted browser checks discarded a successful response after the database committed, then recovered exactly one case through an explicit retry. Database tests cover concurrent retries, case limits and schema upgrades; CI also builds the deployment Docker image. Separate hosted checks confirmed conflicting-input rejection and workspace isolation; a two-tab review check recorded one decision and rejected the stale second review.",
    checks: [
      {label: "Database retry tests", path: "tests/test_creation_retries.py"},
      {label: "CI run with Docker build", path: "https://github.com/s7a7ic-37/runbook-desk/actions/runs/42433452124"},
    ],
    demo: "Open a labelled worked example, inspect a cited procedure, edit the reply, record a review and download the handoff. The export separates the original draft from the recorded decision.",
    limits: "The hosted demo uses fictional authored examples. The OpenAI Responses API client is implemented and mock-tested; real provider calls remain disabled and unverified. Browser workspaces use anonymous cookies, not user accounts. Free hosting can delay startup.",
    contribution: "A personal portfolio project developed with AI coding assistance and checked through automated tests and published browser flows.",
  },
  "pure-news": {
    title: "Pure News",
    subtitle: "Following a request from a reader’s click to a database write.",
    revision: "15e81e8",
    stack: "React · Express · PostgreSQL · Jest · Playwright",
    live: "https://news.artemislab.co.uk/",
    source: "https://github.com/s7a7ic-37/pure-news",
    problem: "Readers need browsing state to survive navigation, votes to recover from failures and comment drafts to survive a slow request. This full-stack news project makes those boundaries visible across a React interface and a relational API.",
    flow: ["React and URL state", "Cloudflare API proxy", "Express controllers", "Parameterized PostgreSQL queries"],
    decisions: [
      {title: "Validate before inserting", text: "A CI failure exposed a race: checking an article and inserting its comment in parallel allowed a foreign-key error to arrive first. The model now verifies the article before INSERT, preserving the intended missing-article response.", path: "https://github.com/s7a7ic-37/pure-news-api/blob/195f60c/models/comments.models.js"},
      {title: "Apply the reader’s intent", text: "Saved links live in the browser. Each change rereads storage and applies explicit Save or Remove intent. A stale control cannot invert membership when another tab already made that change. Corrupt storage and failed writes are reported without replacing the stored list.", path: "src/utils/savedStories.js"},
      {title: "Keep pending work understandable", text: "A pending comment locks its editor; failure keeps the draft. Votes update optimistically, then use the server’s total or roll back. Filters, sort order and page stay in the URL when a reader opens an article and returns.", path: "tests/browser/votes.spec.js"},
    ],
    proof: "API tests include a deterministic regression for the validation/INSERT race. Published browser checks exercise browsing, saved links, voting and comment recovery with intercepted APIs. A separate real-feed check loaded 36 articles and images across three pages at phone width.",
    checks: [
      {label: "Browser regression tests", path: "tests/browser/reading-list.spec.js"},
      {label: "API race regression test", path: "https://github.com/s7a7ic-37/pure-news-api/blob/e3dc588/__tests__/comments.models.test.js"},
      {label: "API CI run", path: "https://github.com/s7a7ic-37/pure-news-api/actions/runs/42435157894"},
    ],
    demo: "Filter or sort the feed, open an article and return to the same view. Save a link, reload and remove it from Saved. Use the source tests to inspect vote rollback and the missing-article regression without writing test content into the public feed.",
    limits: "Sample identities are not authentication, and voting is anonymous count adjustment. A public publishing service would need identity, ownership and moderation. Saved links are local to a browser. The free API can sleep or temporarily reject requests.",
    contribution: "An existing Northcoders-era project extended with browser workflows, API validation and regression coverage. The API includes Northcoders starter contributions and supplied sample data; article images use the supplied Pexels links. Original history and attribution are retained. Recent development uses AI coding assistance with verification.",
  },
  opslens: {
    title: "OpsLens",
    subtitle: "Checking a forecast against later data before relying on it.",
    revision: "04feeda",
    stack: "Python · DuckDB SQL · pandas · scikit-learn · JavaScript",
    live: "https://opslens.artemislab.co.uk/",
    source: "https://github.com/s7a7ic-37/ops-lens",
    problem: "Historical order lines mix product sales with cancellations, adjustments and non-product rows. This workbench makes those classifications inspectable and compares seven-day product forecasts with later observations from an openly licensed retail dataset.",
    flow: ["UCI invoice workbook", "DuckDB row classification", "Daily product series", "Validation-selected forecast", "Frozen holdout report"],
    decisions: [
      {title: "Choose before the holdout", text: "Simple baselines and gradient boosting are compared on an earlier validation window. The selected method is frozen before later holdout scoring, so the holdout does not choose its own winner.", path: "forecast.py"},
      {title: "Keep cancellation claims narrow", text: "SQL separates cancellation proxies from adjustments and invalid rows. Because invoice lines are not matched to original orders, the dashboard reports proxies rather than claiming these are returns.", path: "sql/classify_transactions.sql"},
      {title: "Find the largest observed errors", text: "The product picker can sort by holdout WAPE for each product's validation-selected method. This changes inspection order only; it never retunes a model using holdout results.", path: "web/helpers.mjs"},
    ],
    proof: "Python tests cover rolling-origin evaluation, holdout isolation and scoring edge cases. JavaScript tests cover forecast and holdout exports plus error-based product sorting. GitHub Actions runs both suites and the source scan.",
    checks: [
      {label: "Forecast validation tests", path: "tests/test_pipeline.py"},
      {label: "Dashboard helper tests", path: "web/helpers.test.mjs"},
      {label: "Green CI run", path: "https://github.com/s7a7ic-37/ops-lens/actions/runs/42465716125"},
    ],
    demo: "Compare the cohort table, order the product picker by highest selected-method WAPE, inspect one product’s holdout chart and historical forecast, then export the observed and predicted rows.",
    limits: "The UCI data covers UK retail invoices from 2010–2011, not live stock or current demand. On this single holdout, the selected policy’s WAPE is 74.00%, versus 93.31% for validation-chosen simple baselines; gradient boosting alone scored 71.26%. These are large errors, not savings or accuracy claims.",
    contribution: "A personal data-analysis project using public CC BY 4.0 data. No production operations or inventory impact are claimed. Recent code uses AI assistance with automated verification.",
  },
  "stockroom-reconcile": {
    title: "Stockroom Reconcile",
    subtitle: "Turning a local stock count into a reviewable exception list.",
    revision: "bf35c92",
    stack: "JavaScript · CSV · Playwright",
    live: "https://portfolio.artemislab.co.uk/tools/stockroom-reconciliation/",
    source: "https://github.com/s7a7ic-37/portfolio",
    problem: "A count sheet can contain real shortages alongside duplicate identifiers, invalid quantities and stock held for review. This browser-only tool separates those cases, then gives a reviewer a focused list to follow up.",
    flow: ["Paste or select a CSV", "Validate bounded input", "Separate count exceptions from data issues", "Filter and page the worklist", "Export all exceptions"],
    decisions: [
      {title: "Separate bad input from stock exceptions", text: "Duplicate SKUs and invalid quantities are held as input issues. Valid rows are classified as matches, shortages, overages, damaged or held stock; issues do not quietly affect the checked totals.", path: "public/tools/stockroom-reconciliation/reconcile.js"},
      {title: "Keep the file on the device", text: "The input is read and reconciled in the browser. File size, pasted text and row count have explicit limits, and a late file read cannot replace newer edits.", path: "public/tools/stockroom-reconciliation/app.js"},
      {title: "Keep paging separate from export", text: "The screen shows 25 exceptions at a time, while the CSV export includes every exception. Formula-like text is guarded in the spreadsheet-oriented export.", path: "public/tools/stockroom-reconciliation/reconcile.js"},
    ],
    proof: "Unit tests cover CSV quoting, malformed rows, row limits and formula-like export values. Browser checks cover filters, paging, delayed file reads and exports that include rows on every page. The portfolio CI run is green.",
    checks: [
      {label: "Parser and export tests", path: "public/tools/stockroom-reconciliation/reconcile.test.js"},
      {label: "Browser workflow tests", path: "tests/browser/tool-flows.spec.js"},
      {label: "Green CI run", path: "https://github.com/s7a7ic-37/portfolio/actions/runs/42466718145"},
    ],
    demo: "Use the loaded synthetic example, filter shortages or damaged stock, move between pages, then export the complete exception list. Paste or select a small CSV to try another count; the browser does not upload it.",
    limits: "The example data is synthetic and this is not connected to a warehouse, inventory database or approval process. The CSV has whole-number counts and a 5,000-row limit; real stock decisions still need local business rules and review.",
    contribution: "A personal browser tool built with AI coding assistance and verified with unit and browser tests. No production warehouse outcome is claimed.",
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
        <section><h2>The problem</h2><p>{study.problem}</p></section>
        <section><h2>The request path</h2><ol className={styles.flow}>{study.flow.map(step => <li key={step}>{step}</li>)}</ol></section>
        <section><h2>Decisions in the code</h2>{study.decisions.map(item => <article className={styles.decision} key={item.title}><h3>{item.title}</h3><p>{item.text}</p><a href={sourceLink(item.path)}>Inspect the implementation ↗</a></article>)}</section>
        <section><h2>What was checked</h2><p>{study.proof}</p><div className={styles.proofLinks}>{study.checks.map(check => <a key={check.label} href={sourceLink(check.path)}>{check.label} ↗</a>)}</div></section>
        <section><h2>A short demo</h2><p>{study.demo}</p></section>
        <section><h2>Boundaries and contribution</h2><p>{study.limits}</p><p>{study.contribution}</p></section>
      </main>
      <footer className={styles.footer}><a href="/#projects">← All projects</a><a href={study.source}>Source ↗</a></footer>
    </div>
  );
}
