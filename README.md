# Maksymilian Pasiecki — portfolio

A React and TypeScript portfolio for web applications, API tools and operations data projects.

**[Portfolio](https://portfolio.artemislab.co.uk)**

## Projects

- **[Runbook Desk](https://runbook.artemislab.co.uk/)** — cited support-case drafts, saved history and human review with FastAPI, React/TypeScript and PostgreSQL. The public demo uses labelled examples; real LLM calls are paused.
- **[Pure News](https://news.artemislab.co.uk/)** — article browsing, filters, votes and comments, backed by an Express/PostgreSQL API.
- **[Grid Demand Lab](https://grid.artemislab.co.uk/)** — half-hourly GB electricity forecasts using live NESO inputs, LightGBM and a separate historical holdout.
- **[OpsLens](https://opslens.artemislab.co.uk/)** — retail invoice investigation and time-based forecast comparisons using Python, DuckDB and scikit-learn.
- **[Travel Planner](https://travel.artemislab.co.uk/demo/)** — five-city itineraries with reordering, local saving and JSON import/export. A personal fork of a four-person Northcoders project.
- **[Stockroom Reconcile](https://portfolio.artemislab.co.uk/tools/stockroom-reconciliation/)** — compare CSV stock counts and export exceptions.
- **[Contract Check](https://portfolio.artemislab.co.uk/tools/api-contract-checker/)** — check JSON payloads against a small field-and-type contract.

## Run locally

Requires Node.js 22.12 or newer.

```sh
npm ci
npm run dev
```

`npm test` checks tool parsing, validation and themes. `npm run build` checks TypeScript and builds the site into `dist/`.

Run `npx playwright install --only-shell chromium webkit` once, then `npm run test:browser` for Chromium desktop/mobile and mobile WebKit checks against a fresh production build. These cover local file loading, newer-input preservation, worklist paging and complete CSV exports. CI runs them too. Browser emulation does not replace physical-device testing.

## Stack and hosting

React, TypeScript, Vite and CSS. Hosted as static assets on Cloudflare Workers, configured in `wrangler.jsonc`.

Cascadia Code is included under its [font licence](public/cascadia-code-LICENSE.txt).

The two browser tools process inputs locally without uploads or persistence. Each project's README covers its setup and demo limitations.
