# Maksymilian Pasiecki — portfolio

A small React and Vite portfolio with two browser-only tools. It is deployed as a static site; the tools do not need a server or account.

## Run locally

Requirements: Node.js 20 or later.

    npm ci
    npm run dev

Build the site with npm run build. Run the data checks with npm test.

## Projects

- **Pure News** — existing React frontend and Express/PostgreSQL API. The frontend has article filters, detail pages, votes and comments. The API repository keeps its existing history and Jest/SuperTest suite. The deployed API index returned HTTP 200 on 30 October 2026, while its database-backed article and topic routes returned HTTP 500; the exact production cause is not confirmed. Local API setup and the required PostgreSQL environment variables are documented in that repository.
- **Contract Check** — public/tools/api-contract-checker. A small contract format checks required fields and JSON types, including nested objects and arrays. The checker is deliberately smaller than JSON Schema.
- **Stockroom Reconcile** — public/tools/stockroom-reconciliation. Reads stock-count CSV in the browser, validates rows, flags quantity or condition exceptions, and exports only the exception list. The bundled data is synthetic.

The contract checker and CSV reconciler keep their core logic in separate JavaScript modules so it can be read and tested without the page UI. Run npm test to check matching and mismatching payloads, malformed or duplicate stock rows, and CSV export escaping.

## Privacy and limits

Both tools process pasted or selected data only in the current browser page. They do not send it to a service or save it. Stock quantities must be whole, non-negative numbers; duplicate SKUs are held for review. Contract Check supports a small, documented shape format and is not a full schema validator.

The original travel planner is a group project. Its live landing page is available, but the source checkout found so far is empty; no team source is included here.

## Contact

Use the public GitHub or LinkedIn links on the site.
