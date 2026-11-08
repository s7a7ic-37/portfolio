import { useEffect } from "react";
import styles from "./CaseStudy.module.css";

const studies = {
  "runbook-desk": {
    title: "Runbook Desk",
    subtitle: "Keeping a support decision connected to its evidence.",
    stack: "React · TypeScript · FastAPI · PostgreSQL",
    live: "https://runbook.artemislab.co.uk/",
    source: "https://github.com/s7a7ic-37/runbook-desk",
    problem: "A draft reply is only useful if a reviewer can inspect its sources, change it and see what was actually approved. This personal project models that workflow without sending messages or executing procedures.",
    flow: ["React workspace", "Same-origin API proxy", "FastAPI validation", "PostgreSQL cases and reviews"],
    decisions: [
      {title: "Reject a stale review", text: "A review includes the version of the case it opened. The database transaction rejects an outdated version with HTTP 409, preserving the earlier decision. The interface retains local edits and offers an explicit reload.", path: "server/main.py"},
      {title: "Validate the evidence boundary", text: "Structured drafts must reference the incident or selected runbook IDs. Pydantic validates the shape and allowed citations. That checks references, not whether a proposed explanation is true; human review remains necessary.", path: "server/models.py"},
      {title: "Treat an interrupted write as uncertain", text: "Requests have a bounded wait and writes are never repeated automatically. The interface explains that a save may have completed and offers history recovery. Public procedures remain readable while the case server connects.", path: "frontend/src/api.ts"},
    ],
    proof: "An isolated hosted two-tab check recorded one review and one version change; the stale second review returned 409. Backend tests cover workspace isolation, budget reservations, malformed drafts and conflicts. Browser regressions cover unsaved edits, source dialogs and recovery.",
    testPath: "tests/test_workflow.py",
    demo: "Open a labelled worked example, inspect a cited procedure, edit the reply, record a review and download the handoff. The export separates the original draft from the recorded decision.",
    limits: "The hosted demo uses fictional authored examples. The OpenAI Responses API client is implemented and mock-tested; real provider calls remain disabled and unverified. Browser workspaces use anonymous cookies, not user accounts. Free hosting can delay startup.",
    contribution: "A personal portfolio project developed with AI coding assistance and checked through automated tests and published browser flows.",
  },
  "pure-news": {
    title: "Pure News",
    subtitle: "Following a request from a reader’s click to a database write.",
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
    proof: "The API has 110 passing tests, including a deterministic regression for the validation/INSERT race. Published browser checks exercise browsing, saved links, voting and comment recovery with intercepted APIs. A separate real-feed check loaded 36 articles and images across three pages at phone width.",
    testPath: "tests/browser/reading-list.spec.js",
    demo: "Filter or sort the feed, open an article and return to the same view. Save a link, reload and remove it from Saved. Use the source tests to inspect vote rollback and the missing-article regression without writing test content into the public feed.",
    limits: "Sample identities are not authentication, and voting is anonymous count adjustment. A public publishing service would need identity, ownership and moderation. Saved links are local to a browser. The free API can sleep or temporarily reject requests.",
    contribution: "An existing Northcoders-era project extended with browser workflows, API validation and regression coverage. The API includes Northcoders starter contributions and supplied sample data; article images use the supplied Pexels links. Original history and attribution are retained. Recent development uses AI coding assistance with verification.",
  },
};

export type CaseStudyKey = keyof typeof studies;

export default function CaseStudy({ project }: { project: CaseStudyKey }) {
  const study = studies[project];
  useEffect(() => { document.title = `${study.title} — project case study`; }, [study.title]);
  const sourceLink = (path: string) => path.startsWith("https:") ? path : `${study.source}/blob/${project === "runbook-desk" ? "0a2e8c0" : "15e81e8"}/${path}`;
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
        <section><h2>What was checked</h2><p>{study.proof}</p><a href={sourceLink(study.testPath)}>Read the tests ↗</a></section>
        <section><h2>A short demo</h2><p>{study.demo}</p></section>
        <section><h2>Boundaries and contribution</h2><p>{study.limits}</p><p>{study.contribution}</p></section>
      </main>
      <footer className={styles.footer}><a href="/#projects">← All projects</a><a href={study.source}>Source ↗</a></footer>
    </div>
  );
}
