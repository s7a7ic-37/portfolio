export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <div className="section-wrap">
        <div className="projects-heading">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="section-title">Tools built around real tasks.</h2>
          </div>
          <p className="section-intro">A full-stack news app, an API debugging workbench, and an inventory reconciliation tool.</p>
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
              <p className="project-note">The legacy demo depends on a hosted API whose data routes currently return HTTP 500. The frontend source now handles that failure with a retry state.</p>
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
          </article>

          <article className="project-card">
            <span className="project-number">03 / OPERATIONS</span>
            <h3>Stockroom Reconcile</h3>
            <p>Load a stock-count CSV, compare expected and counted quantities, and export a focused exception list for follow-up.</p>
            <div className="project-tags"><span>CSV</span><span>Data quality</span><span>Operations</span></div>
            <div className="project-preview" aria-label="Stockroom Reconcile example results">
              <div className="preview-top"><span>COUNT SUMMARY</span><span>sample data</span></div>
              <div className="preview-row"><span>4 rows checked<br /><small>1 match · 3 exceptions</small></span><span className="preview-status preview-status--warn">review</span></div>
              <div className="preview-row"><span>SKU-104<br /><small>Expected 8 · counted 6</small></span><span className="preview-status preview-status--error">short 2</span></div>
            </div>
            <div className="project-links">
              <a href="/tools/stockroom-reconciliation/index.html">Try the tool ↗</a>
              <a href="https://github.com/s7a7ic-37/portfolio/tree/main/public/tools/stockroom-reconciliation">Source ↗</a>
            </div>
            <p className="project-note">Both tool demos use sample data in your browser; no files are uploaded.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
