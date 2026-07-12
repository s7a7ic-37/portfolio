# Stockroom Reconcile

A browser-only stock count helper. It reads a CSV, compares expected and counted quantities, highlights shortages, overages, damaged or held stock, and exports the exception worklist.

## Try it

Open index.html directly or visit /tools/stockroom-reconciliation/ on the portfolio. Load the synthetic sample, paste a CSV, or choose a local CSV file. All parsing happens in the browser; files are not uploaded.

## CSV columns

Required: sku, expected, counted. Optional: name, condition. Quantities must be whole non-negative numbers. Condition is sellable, damaged, or held, and defaults to sellable. Duplicate SKUs and invalid rows are held for review instead of being counted.

## Check

Run node --test reconcile.test.js to verify CSV parsing, exception classification, row validation, duplicate handling, and CSV export escaping.
