import { useEffect } from "react";
import styles from "./CaseStudy.module.css";

const studies = {
  "runbook-desk": {
    title: "Runbook Desk",
    subtitle: "Keeping a support decision connected to its evidence.",
    revision: "10041c5",
    stack: "React · TypeScript · FastAPI · PostgreSQL",
    live: "https://runbook.artemislab.co.uk/",
    source: "https://github.com/s7a7ic-37/runbook-desk",
    problem: "A draft reply is only useful if a reviewer can inspect its sources, change it and see what was actually approved. This personal project models that workflow without sending messages or executing procedures.",
    flow: ["React workspace", "Same-origin API proxy", "FastAPI validation", "PostgreSQL cases and reviews"],
    decisions: [
      {title: "Reject a stale review", text: "A review includes the version of the case it opened. The database transaction rejects an outdated version with HTTP 409, preserving the earlier decision. The interface retains local edits and offers an explicit reload.", path: "server/main.py"},
      {title: "Validate the evidence boundary", text: "Pydantic validates draft structure and citations, and rejects null characters before text reaches PostgreSQL. Citation checks establish references, not whether an explanation is true; human review remains necessary.", path: "server/models.py"},
      {title: "Recover a save after a lost response", text: "A new case carries a workspace-scoped retry key. If its response is lost, an explicit retry with unchanged details returns the saved case. PostgreSQL rejects reuse for different input. The pending key lasts while the page stays open; writes are never repeated automatically.", path: "frontend/src/App.tsx"},
      {title: "Carry the recorded decisions forward", text: "The text handoff includes each review's decision, note and stored reply snapshots, in review order. It distinguishes the current recorded reply from earlier decisions and labels the procedures as a current library snapshot.", path: "frontend/src/report.ts"},
    ],
    proof: "Hosted checks recovered one case after a lost save response, rejected stale reviews and confirmed workspace isolation. Separate hosted database checks rejected invalid text without changing a case, persisted a valid review, and allowed deletion only from its owning workspace and origin. CI covers concurrent retries, review/deletion rules and a deployment Docker build. Browser fixtures also cover unreadable save responses without automatically repeating writes.",
    checks: [
      {label: "Database retry tests", path: "tests/test_creation_retries.py"},
      {label: "Review and deletion tests", path: "tests/test_workflow.py"},
      {label: "Handoff snapshot tests", path: "frontend/tests/report.test.ts"},
      {label: "CI run with Docker build", path: "https://github.com/s7a7ic-37/runbook-desk/actions/runs/42485780784"},
      {label: "Live OpenAPI schema", path: "https://runbook.artemislab.co.uk/api/openapi.json"},
    ],
    demo: "Open a labelled worked example, inspect a cited procedure, edit the reply, record a review and download the handoff. Each review retains its original and reviewed reply snapshots. Find the case by title in History, or delete it after confirmation.",
    limits: "The hosted demo uses fictional authored examples. The OpenAI Responses API client is implemented and mock-tested; real provider calls remain disabled and unverified. Browser workspaces use anonymous cookies, not user accounts. Free hosting can delay startup.",
    contribution: "A personal portfolio project developed with AI coding assistance and checked through automated tests and published browser flows.",
  },
  "pure-news": {
    title: "Pure News",
    subtitle: "Following a request from a reader’s click to a database write.",
    revision: "0169cc1",
    stack: "React · Express · PostgreSQL · Jest · Playwright",
    live: "https://news.artemislab.co.uk/",
    source: "https://github.com/s7a7ic-37/pure-news",
    problem: "Readers need to find stories without losing their topic, sort or place in the list, while votes recover from failures and comment drafts survive a slow request. This full-stack news project makes those boundaries visible across a React interface and a relational API.",
    flow: ["Shareable React filters and search", "Cloudflare API proxy", "Express query validation", "Parameterized PostgreSQL filters and counts"],
    decisions: [
      {title: "Validate before inserting", text: "Checking an article before INSERT preserves the intended missing-article response instead of racing a foreign-key failure. Comment and username null characters are rejected before any database query, returning a client error instead of a PostgreSQL failure.", path: "https://github.com/s7a7ic-37/pure-news-api/blob/e6c5273/models/comments.models.js"},
      {title: "Apply the reader’s intent", text: "Saved links live in the browser. Each change rereads storage and applies explicit Save or Remove intent. A stale control cannot invert membership when another tab already made that change. Corrupt storage and failed writes are reported without replacing the stored list.", path: "src/utils/savedStories.js"},
      {title: "Keep pending work understandable", text: "A pending comment locks its editor; failure keeps the draft. Votes update optimistically, then use the server’s total or roll back. Filters, sort order and page stay in the URL when a reader opens an article and returns.", path: "tests/browser/votes.spec.js"},
      {title: "Search article text safely", text: "The React form stores a 100-character search phrase in the URL, resets the old page and keeps the selected topic and sort. The API rejects malformed input, then binds a literal case-insensitive title/body search. Search and topic filters also apply to the paginated total; unpaginated callers keep the original response shape.", path: "https://github.com/s7a7ic-37/pure-news-api/blob/2e3e12b/models/articles.models.js"},
    ],
    proof: "API tests cover literal search, topic intersections, paginated counts and the earlier validation/INSERT race. Browser checks cover browsing state, vote rollback, comment recovery and reading-list storage failures with intercepted APIs. Removing a saved link preserves keyboard position; a failed write retains its link and control. Live checks verified published search and comment validation without adding public comments or votes.",
    checks: [
      {label: "Browser search and browsing tests", path: "tests/browser/browsing.spec.js"},
      {label: "Saved-story recovery tests", path: "tests/browser/reading-list.spec.js"},
      {label: "API search and validation tests", path: "https://github.com/s7a7ic-37/pure-news-api/blob/e6c5273/__tests__/app.test.js"},
      {label: "API race regression test", path: "https://github.com/s7a7ic-37/pure-news-api/blob/e3dc588/__tests__/comments.models.test.js"},
      {label: "Frontend CI run", path: "https://github.com/s7a7ic-37/pure-news/actions/runs/42486961132"},
      {label: "API CI run", path: "https://github.com/s7a7ic-37/pure-news-api/actions/runs/42480464240"},
    ],
    demo: "Search for “Running a Node App” with Technology selected, open the result and return to the same search. Then browse the feed, save a link and remove it from Saved. Use the source tests to inspect vote rollback and comment recovery without writing test content into the public feed.",
    limits: "Sample identities are not authentication, and voting is anonymous count adjustment. A public publishing service would need identity, ownership and moderation. Saved links are local to a browser. The free API can sleep or temporarily reject requests.",
    contribution: "An existing Northcoders-era project extended with browser workflows, API validation and regression coverage. The API includes Northcoders starter contributions and supplied sample data; article images use the supplied Pexels links. Original history and attribution are retained. Recent development uses AI coding assistance with verification.",
  },
  "grid-demand-lab": {
    title: "Grid Demand Lab",
    subtitle: "Comparing a next-day estimate with the system operator’s forecast.",
    revision: "681b10d",
    stack: "Python · LightGBM · pandas · Streamlit · NESO API",
    live: "https://grid.artemislab.co.uk/",
    source: "https://github.com/s7a7ic-37/grid-demand-lab",
    problem: "Half-hour demand estimates need clear timing and a useful baseline. This dashboard reads Great Britain demand data published by NESO, estimates the following day from recent history and compares the result with NESO’s forecast when it is available.",
    flow: ["NESO live feed", "Validate and separate outturns from forecasts", "Join calendar-aligned history", "Estimate demand with LightGBM", "Compare and export the displayed day"],
    decisions: [
      {title: "Align features by calendar date", text: "Previous-day and previous-week demand are matched by settlement period and calendar date, rather than by the previous row. This avoids silently shifting lags when a date has 46 or 50 periods. The extra repeated-hour forecast periods still reuse period 48, so they are not operational clock-aligned predictions.", path: "forecast.py"},
      {title: "Evaluate against simple baselines", text: "A final 28-day 2025 holdout is kept separate from training, then four quarter-end 28-day tests fit only earlier data. Each window scores the model, previous-day and previous-week baselines on the same periods; the test windows do not select a new model.", path: "tests/test_forecast.py"},
      {title: "Keep refresh separate from retraining", text: "The live feed is cached for up to six hours; refresh fetches readings and recalculates the forecast without fitting a new model. CSV export captures the values shown on screen and the feed timestamp, so downloading does not trigger another fetch.", path: "app.py"},
    ],
    proof: "On the final 28 days of 2025, trained through 3 December, the model’s MAE was 1,604 MW across 1,344 half-hour periods. The previous-day and previous-week baselines were 1,960 MW and 2,278 MW on the same periods. Tests cover calendar lags, 46/48/50-period days, feed parsing and CSV output. Eight published browser/width checks matched every exported model value to its plotted point and confirmed that downloading preserves the report and touch readout.",
    checks: [
      {label: "Forecast and time-split tests", path: "tests/test_forecast.py"},
      {label: "Chart interaction tests", path: "tests/test_plotting.py"},
      {label: "Green CI run", path: "https://github.com/s7a7ic-37/grid-demand-lab/actions/runs/42482666073"},
    ],
    demo: "Choose a half-hour on the chart, download the displayed forecast with its UK clock labels and feed timestamp, then expand the quarterly backtests to compare historical errors. Missing NESO values remain blank in the daily CSV.",
    limits: "NESO’s 2025 history is openly licensed but can be revised; historical tests do not establish current accuracy or operational suitability. The live feed may lag settlement or need explicit weekly fallback for an incomplete day. Extra repeated-hour periods currently reuse a prior settlement period. Free hosting can delay startup.",
    contribution: "A personal forecasting prototype using public NESO data. It does not support grid operations or claim energy savings. Recent code was developed with AI assistance and checked against time-ordered tests.",
  },
  "travel-planner": {
    title: "Ready, Jet Set, Go!",
    subtitle: "Build a city plan, then change it around your day.",
    revision: "3878358",
    stack: "Next.js · React · TypeScript · Material UI",
    live: "https://travel.artemislab.co.uk/demo/",
    source: "https://github.com/s7a7ic-37/travel-planner",
    problem: "A useful city itinerary needs room for personal choices. The planner lets someone select a UK city, trip length and interests, then adjust the stops, reopen recent plans and carry a copy to another device.",
    flow: ["Choose a city, days and interests", "Generate from a curated city catalogue", "Reorder or replace individual stops", "Save and reopen plans in this browser", "Transfer a plan or print it"],
    decisions: [
      {title: "Generate from known places", text: "The guest planner uses five city catalogues and seven interests. A simple rotation varies the two stops per day while keeping choices in the selected city; known closures are skipped for new plans.", path: "travel-planner-fe/lib/demo.ts"},
      {title: "Make itinerary files portable", text: "The JSON file contains the city, trip length, interests and stop order as readable text. Imports are capped at 6 KB and validated against known places before replacing the open plan; the file is read locally and never uploaded.", path: "travel-planner-fe/app/demo/page.tsx"},
      {title: "Protect newer planner changes", text: "File reads can finish after the visitor has changed city or generated another plan. A revision check discards a stale import so it cannot replace newer edits. Saving the open plan remains a separate, explicit action.", path: "travel-planner-fe/app/demo/page.tsx"},
    ],
    proof: "Tests cover all five city catalogues, seven interests, rotations, closures, unique stops, file validation and the five-item history limit. CI browser tests build the static demo and check repeated keyboard reordering across days, focus at the first/last stop and failed history removal with retry. These changes preserve the separate saved copy.",
    checks: [
      {label: "Plan and transfer tests", path: "travel-planner-fe/tests/demo.test.mjs"},
      {label: "Shared itinerary link tests", path: "travel-planner-fe/tests/itinerary.test.mjs"},
      {label: "Planner browser regressions", path: "travel-planner-fe/tests/browser/planner.spec.mjs"},
      {label: "Green CI run", path: "https://github.com/s7a7ic-37/travel-planner/actions/runs/42485443867"},
    ],
    demo: "Choose a city and a couple of interests, generate a short plan, then try another city. Open Recent itineraries in the menu, reopen a plan, export it and print or save it as a PDF.",
    limits: "The guest planner uses curated city lists. It has no live prices, opening times, bookings or route optimization, and Firebase or Mapbox features are not configured for this public demo.",
    contribution: "The original project was built by a four-person team; the repository retains its history and authorship. This case study describes the guest-planner workflow available in the portfolio demo. Recent updates use AI coding assistance and regression tests.",
  },
  opslens: {
    title: "OpsLens",
    subtitle: "Checking a forecast against later data before relying on it.",
    revision: "32a3610",
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
    proof: "Python tests cover rolling-origin evaluation, holdout isolation and scoring edge cases. A separate JavaScript check recomputes errors from all 224 exported holdout rows and reconciles dates, validation choices and product/cohort scores, allowing for prediction rounding. Actual published downloads matched the committed report in Chromium and WebKit. CI runs these checks and the credential scan.",
    checks: [
      {label: "Forecast validation tests", path: "tests/test_pipeline.py"},
      {label: "Dashboard helper tests", path: "web/helpers.test.mjs"},
      {label: "Green CI run", path: "https://github.com/s7a7ic-37/ops-lens/actions/runs/42487304219"},
    ],
    demo: "Compare the cohort table, order the product picker by highest selected-method WAPE, inspect one product’s holdout chart and historical forecast, then export the observed and predicted rows. The selected SKU stays in the URL so its investigation can be reopened or shared.",
    limits: "The UCI data covers UK retail invoices from 2010–2011, not live stock or current demand. On this single holdout, the selected policy’s WAPE is 74.00%, versus 93.31% for validation-chosen simple baselines; gradient boosting alone scored 71.26%. These are large errors, not savings or accuracy claims.",
    contribution: "A personal data-analysis project using public CC BY 4.0 data. No production operations or inventory impact are claimed. Recent code uses AI assistance with automated verification.",
  },
  "stockroom-reconcile": {
    title: "Stockroom Reconcile",
    subtitle: "Turning a local stock count into a reviewable exception list.",
    revision: "92eeef0",
    stack: "JavaScript · CSV · Playwright",
    live: "https://portfolio.artemislab.co.uk/tools/stockroom-reconciliation/",
    source: "https://github.com/s7a7ic-37/portfolio",
    problem: "A count sheet can contain real shortages alongside duplicate identifiers, invalid quantities and stock held for review. This browser-only tool separates those cases, then gives a reviewer a focused list to follow up.",
    flow: ["Paste or select a CSV", "Validate bounded input", "Separate count exceptions from data issues", "Search, filter and page the worklist", "Export all exceptions"],
    decisions: [
      {title: "Separate bad input from stock exceptions", text: "Duplicate SKUs and invalid quantities are held as input issues. Valid rows are classified as matches, shortages, overages, damaged or held stock; issues do not quietly affect the checked totals.", path: "public/tools/stockroom-reconciliation/reconcile.js"},
      {title: "Keep the file on the device", text: "The input is read and reconciled in the browser. File size, pasted text and row count have explicit limits, and a late file read cannot replace newer edits.", path: "public/tools/stockroom-reconciliation/app.js"},
      {title: "Inspect without changing the report", text: "Finding filters and literal SKU/item search change only the visible worklist. The screen shows 25 exceptions or input issues per page, while export includes every exception. A 5,000-row file stays reviewable without rendering every issue at once; formula-like export text is guarded.", path: "public/tools/stockroom-reconciliation/app.js"},
    ],
    proof: "Unit tests cover CSV quoting, malformed rows, row limits and formula-like export values. Browser checks combine literal Unicode search with finding filters, reset paging and verify that even a search with no matches still exports the whole report. Published 5,000-row checks found a specific SKU while preserving totals across four widths and both themes.",
    checks: [
      {label: "Parser and export tests", path: "public/tools/stockroom-reconciliation/reconcile.test.js"},
      {label: "Browser workflow tests", path: "tests/browser/tool-flows.spec.js"},
      {label: "Green CI run", path: "https://github.com/s7a7ic-37/portfolio/actions/runs/42486555076"},
    ],
    demo: "Use the synthetic example, filter shortages and find SKU-104, then export every exception. Clear the search or select a small CSV to try another count; the browser does not upload it.",
    limits: "The example data is synthetic and this is not connected to a warehouse, inventory database or approval process. The CSV has whole-number counts and a 5,000-row limit; real stock decisions still need local business rules and review.",
    contribution: "A personal browser tool built with AI coding assistance and verified with unit and browser tests. No production warehouse outcome is claimed.",
  },
  "contract-check": {
    title: "Contract Check",
    subtitle: "Finding response-shape changes before they reach a caller.",
    revision: "fdd14ed",
    stack: "JavaScript · JSON · Playwright",
    live: "https://portfolio.artemislab.co.uk/tools/api-contract-checker/",
    source: "https://github.com/s7a7ic-37/portfolio",
    problem: "A payload can be valid JSON and still omit a required field or change a value's type. This small browser tool compares a response example with a contract of required fields, types and array templates, then reports the paths that need attention.",
    flow: ["Load a local response and contract", "Validate the contract", "Compare required fields and value types", "Review bounded findings", "Download the complete report"],
    decisions: [
      {title: "Point to the exact JSON key", text: "Simple keys use dot paths; punctuation, empty keys and literal dots use quoted brackets. A literal `customer.name` key stays distinct from a nested `customer.name` path.", path: "public/tools/api-contract-checker/checker.js"},
      {title: "Bound work and display", text: "Contracts stop at 64 levels and reports stop at 50,000 findings or one million path characters. The screen renders 25 findings per page; a refused oversized report is never offered as a partial download.", path: "public/tools/api-contract-checker/app.js"},
      {title: "Keep file input local and safe", text: "Response files are capped at 1 MB, decoded as valid UTF-8 and parsed before replacing the editor. If the visitor edits while a read is pending, the older file result is discarded.", path: "public/tools/api-contract-checker/checker.js"},
    ],
    proof: "Unit tests cover top-level arrays and types, nested fields, literal keys, invalid UTF-8, file-size/depth limits, oversized findings and numeric overflow. Browser tests verify root-array finding paths and exports, local file reads, concurrent edits, 25-row paging and recovery after an error.",
    checks: [
      {label: "Contract parser and limit tests", path: "public/tools/api-contract-checker/checker.test.js"},
      {label: "Browser workflow tests", path: "tests/browser/tool-flows.spec.js"},
      {label: "Green CI run", path: "https://github.com/s7a7ic-37/portfolio/actions/runs/42486162846"},
    ],
    demo: "Load the example, or use [{\"id\":\"number\"}] to check a plain array response. Change a type, inspect its finding path and download the full report. A quoted type such as \"boolean\" also works at the root. All input stays in the browser.",
    limits: "This checks a small required-field and type contract; it is not a full JSON Schema validator and does not make network requests. Number contracts reject non-finite values but do not check integer ranges or decimal precision. Extra response fields are allowed, and a shape match cannot prove endpoint behavior or meaning.",
    contribution: "A personal browser tool built with AI coding assistance and checked with parser and browser regression tests.",
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
