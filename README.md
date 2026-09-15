# Maksymilian Pasiecki — portfolio

A React and TypeScript portfolio for web applications, API tools and operations data projects.

**[Portfolio](https://portfolio.artemislab.co.uk)**

## Projects

- **[Pure News](https://news.artemislab.co.uk/)** — article browsing, filters, votes and comments, backed by an Express/PostgreSQL API.
- **[OpsLens](https://opslens.artemislab.co.uk/)** — retail invoice investigation and time-based forecast comparisons using Python, DuckDB and scikit-learn.
- **[Travel Planner](https://travel.artemislab.co.uk/demo/)** — editable Manchester itineraries with local saving and plan-file import/export. A personal fork of a four-person Northcoders project.
- **[Contract Check](https://portfolio.artemislab.co.uk/tools/api-contract-checker/)** — check JSON payloads against a small field-and-type contract.
- **[Stockroom Reconcile](https://portfolio.artemislab.co.uk/tools/stockroom-reconciliation/)** — compare CSV stock counts and export exceptions.

## Run locally

Requires Node.js 22.

```sh
npm ci
npm run dev
```

`npm test` runs the browser-tool tests. `npm run build` checks TypeScript and builds the site into `dist/`.

## Stack and hosting

React, TypeScript, Vite and CSS. Hosted as static assets on Cloudflare Workers, configured in `wrangler.jsonc`.

The two browser tools process inputs locally without uploads or persistence. Each project's README covers its setup and demo limitations.
