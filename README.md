# Maksymilian Pasiecki — portfolio

A React and TypeScript portfolio with working demos, source repositories and case studies for web, data and developer projects.

[Browse the projects](https://portfolio.artemislab.co.uk/#projects).

## Run locally

Requires Node.js 22.12 or newer.

```sh
npm ci
npm run dev
```

`npm test` checks parsing, validation and themes. `npm run build` writes the site to `dist/`. For browser tests, run `npx playwright install --only-shell chromium webkit`, then `npm run test:browser`.

Cloudflare Workers serves the Vite build. The Stockroom and Contract tools process files in the browser.
