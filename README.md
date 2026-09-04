# Maksymilian Pasiecki — portfolio

React/TypeScript portfolio for practical software, API troubleshooting and operations data work.

Live: https://portfolio.artemislab.co.uk

## Run and verify

Use Node.js 22. Run npm ci, npm test and npm run build. For local development, run npm run dev. GitHub Actions repeats the tool tests and production build.

## Selected work

- **Pure News**: React frontend and Express/PostgreSQL API. An editorial reading interface, shareable filters, stable server pagination, optimistic votes and recoverable errors. Database-backed tests cover query boundaries and a safe transactional demo initialization with verified TLS. The free API may take about a minute to wake. Demo usernames are not authentication.
- **Contract Check**: public/tools/api-contract-checker. A browser-local mini-contract validator for JSON fields and types. It deliberately does not implement full JSON Schema. No uploads or persistence.
- **OpsLens**: https://github.com/s7a7ic-37/ops-lens. Python, DuckDB SQL and scikit-learn study of openly licensed retail invoices, with a data audit and honest validation/holdout comparison. The historical data and substantial forecast errors are disclosed in its model card.
- **Stockroom Reconcile**: public/tools/stockroom-reconciliation. Small browser-local CSV tool with synthetic sample data, whole-number checks, duplicate SKU holds and exception export.
- **Ready, Jet Set, Go!**: four-person Northcoders project, preserved at https://github.com/lai1372/travel-planner. Personal maintenance belongs only in https://github.com/s7a7ic-37/travel-planner. Original team history and credit remain intact; no changes are pushed to the team repository.

## Deployment

Static-assets Worker maksymilian-portfolio in the owner's Cloudflare account. wrangler.jsonc pins the exact account and portfolio.artemislab.co.uk hostname. Verify the login with npx wrangler@4.92.0 whoami, build, then run npx wrangler@4.92.0 deploy. Credentials stay in the local Cloudflare session, never in Git. This repository does not use ChatGPT Sites.

## Interface and skills

The existing React/Vite section structure is retained. Four capability cards connect the actual stack to interface behaviour, SQL/API work, data evaluation and delivery checks. Python/ML are labelled as newer skills being developed through OpsLens. Earlier Firebase/Mapbox group work has separate attribution. Project cards include small walkthroughs and links to source, tests and limitations; no skill percentages or unsupported commercial claims are used.

## Privacy

No private career documents, employer records or credentials belong here. Browser tools process data locally. OpsLens serves precomputed public aggregates; it does not accept uploads. Public contact links use GitHub and LinkedIn only.

## Visual identity

The portfolio keeps its olive identity. Contract Check uses a purple developer-tool palette; Stockroom Reconcile uses an amber operations palette. Each has its own SVG tab icon, 32px PNG fallback, multi-size ICO and Apple touch icon. Icon links are absolute and versioned so nested tool paths resolve correctly.
