# Stockroom Reconcile

Compare expected and counted stock from CSV, review shortages, overages, damaged or held stock, and export an exception worklist.

**[Open the tool](https://portfolio.artemislab.co.uk/tools/stockroom-reconciliation/)**

Load the synthetic sample, paste CSV or choose a local file. Files are processed in the browser without uploads.

Use UTF-8 CSV with up to 5,000 stock rows. Files are capped at 1 MB; pasted text at 1,000,000 characters. Input changes clear previous results and disable export until the next reconciliation.

Editing, loading the sample or reconciling while a file is being read keeps the newer input.

The worklist shows 25 exceptions per page. Export includes every exception, regardless of the open page; held input issues remain separate from checked stock.

## CSV format

Required columns: `sku`, `expected`, `counted`. Optional: `name`, `condition`.

Quantities must be whole, non-negative numbers. Condition is `sellable`, `damaged` or `held`; the default is `sellable`. Duplicate SKUs and invalid rows are held for review.

Excel-oriented exports prefix formula-like text with a tab inside a quoted field. The tab remains part of the CSV value; numeric quantities and differences stay numeric. Other spreadsheet importers may handle CSV differently.

## Run and test

Run `npm ci` and `npm run dev` from the portfolio repository root, then open `/tools/stockroom-reconciliation/` on the local server. From this directory, run `node --test reconcile.test.js`.
