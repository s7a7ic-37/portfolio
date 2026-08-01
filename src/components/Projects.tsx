export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <div className="section-wrap">
        <div className="projects-heading">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="section-title">Tools built around real tasks.</h2>
          </div>
          <p className="section-intro">A full-stack news app, an API debugging tool, and an operations data study that makes machine learning earn its place.</p>
        </div>

        <div className="project-grid">
          <article className="project-card project-card--wide">
            <div>
              <span className="project-number">01 / FULL STACK</span>
              <h3>Pure News</h3>
              <p>A news discussion app with topic filters, article pages, voting and comments. The React frontend talks to an Express API backed by PostgreSQL.</p>
              <div className="project-tags"><span>React</span><span>Express</span><span>PostgreSQL</span><span>Jest</span></div>
              <div className="project-links">
                <a href="https://pure-news.netlify.app/">Open demo ↗</a>
                <a href="https://github.com/s7a7ic-37/pure-news">Frontend source ↗</a>
                <a href="https://github.com/s7a7ic-37/pure-news-api">API source ↗</a>
              </div>
              <p className="project-note">Restored after a database outage: safe initialization, verified TLS, useful retry states and 74 API tests in CI. Public sample data and demo identities; the free API may take about a minute to wake.</p>
              <details className="project-details"><summary>Engineering notes</summary><p><strong>Problem:</strong> the frontend could load while the database behind the API was unavailable.</p><p><strong>Approach:</strong> trace the failure through service logs and database state, initialize a replacement demo safely, and make loading, retry and optimistic vote rollback useful to the reader.</p><p><strong>Evidence:</strong> PostgreSQL-backed API tests run in CI. The demo uses sample identities; a real community would need authentication and abuse controls.</p></details>
            </div>
            <div className="project-preview" aria-label="Pure News interface illustration">
              <div className="preview-top"><span>PURE NEWS</span><span>coding · cooking · sport</span></div>
              <div className="preview-row"><span>Why good APIs start with a clear contract<br /><small>By: weegembump · 8 comments</small></span><span className="preview-status">+ 24 votes</span></div>
              <div className="preview-row"><span>Small habits that make code easier to review<br /><small>By: jessjelly · 4 comments</small></span><span className="preview-status">+ 12 votes</span></div>
            </div>
          </article>

          <article className="project-card">
            <span className="project-number">02 / API DEBUGGING</span>
            <h3>Contract Check</h3>
            <p>Compare a JSON response with a small contract. Find missing fields and type changes before they break a client.</p>
            <div className="project-tags"><span>JavaScript</span><span>JSON</span><span>Validation</span></div>
            <div className="project-preview" aria-label="Contract Check example results">
              <div className="preview-top"><span>RESPONSE CHECK</span><span>2 findings</span></div>
              <div className="preview-row"><span>$.article_id<br /><small>Expected number, received string</small></span><span className="preview-status preview-status--error">type</span></div>
              <div className="preview-row"><span>$.author<br /><small>Required field is missing</small></span><span className="preview-status preview-status--warn">missing</span></div>
            </div>
            <div className="project-links">
              <a href="/tools/api-contract-checker/index.html">Try the tool ↗</a>
              <a href="https://github.com/s7a7ic-37/portfolio/tree/main/public/tools/api-contract-checker">Source ↗</a>
            </div>
            <details className="project-details"><summary>Engineering notes</summary><p><strong>Problem:</strong> a response can be valid JSON and still break a client when required fields disappear or change type.</p><p><strong>Approach:</strong> check nested objects and array templates, report the exact path, and export findings without uploading the payload.</p><p><strong>Boundary:</strong> this is a small documented contract format, not full JSON Schema. Parsing, missing fields and nested type changes have focused tests.</p></details>
          </article>

          <article className="project-card">
            <span className="project-number">03 / DATA & ML</span>
            <h3>OpsLens</h3>
            <p>Investigate retail cancellations, account for every source row, and compare a seven-day ML forecast against simple weekly patterns. See when the model loses.</p>
            <div className="project-tags"><span>Python</span><span>DuckDB SQL</span><span>scikit-learn</span></div>
            <div className="project-preview" aria-label="OpsLens evaluation summary">
              <div className="preview-top"><span>EVIDENCE BEFORE AUTOMATION</span><span>historical study</span></div>
              <div className="preview-row"><span>541,909 invoice lines<br /><small>Explicit exclusions · auditable totals</small></span><span className="preview-status">SQL</span></div>
              <div className="preview-row"><span>5 products select ML · 3 select a baseline<br /><small>Validation chooses · untouched holdout measures</small></span><span className="preview-status preview-status--warn">compare</span></div>
            </div>
            <div className="project-links">
              <a href="https://opslens.artemislab.co.uk/">Open workbench ↗</a>
              <a href="https://github.com/s7a7ic-37/ops-lens">Source & model card ↗</a>
            </div>
            <p className="project-note">Openly licensed 2010–2011 data. Large forecast errors are shown openly; this study is an investigation aid, not a live ordering system.</p>
            <details className="project-details"><summary>Engineering notes</summary><p><strong>Question:</strong> which invoice lines need investigation, and does an ML forecast earn its extra complexity?</p><p><strong>Approach:</strong> classify rows with SQL, choose products before validation, compare two simple baselines with gradient boosting, then measure the frozen choice on later data.</p><p><strong>Finding:</strong> validation selected a baseline for three products. The selected policy’s holdout WAPE was 74%, a substantial error that rules out a production-ordering claim. The model card explains the limits.</p></details>
          </article>
        </div>
        <p className="project-note">Another small operations tool: <a href="/tools/stockroom-reconciliation/index.html">Stockroom Reconcile</a> validates a stock-count CSV and exports exceptions entirely in your browser.</p>
        <p className="project-note">Team work: <a href="https://github.com/s7a7ic-37/travel-planner">Ready, Jet Set, Go!</a> was a four-person Northcoders project. My contributions included Firebase authentication, itinerary storage and deletion, places API and maps integration. The personal maintenance fork preserves the original team history. <a href="https://travel-planner-demo.mpasiecki.workers.dev/demo/">Try the fork’s guest demo ↗</a></p>
      </div>
    </section>
  );
}
