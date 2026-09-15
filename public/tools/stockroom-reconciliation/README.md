# Stockroom Reconcile

Compare expected and counted stock from CSV, review shortages, overages, damaged or held stock, and export an exception worklist.

**[Open the tool](https://portfolio.artemislab.co.uk/tools/stockroom-reconciliation/)**

Load the synthetic sample, paste CSV or choose a local file. Files are processed in the browser without uploads.

## CSV format

Required columns: `sku`, `expected`, `counted`. Optional: `name`, `condition`.

Quantities must be whole, non-negative numbers. Condition is `sellable`, `damaged` or `held`; the default is `sellable`. Duplicate SKUs and invalid rows are held for review.

## Run and test

Open `index.html` directly. From this directory, run `node --test reconcile.test.js`.
