import { exceptionsToCsv, reconcileCsv, readCsvFile } from "./reconcile.js";

const csvInput = document.querySelector("#csv-input");
const fileInput = document.querySelector("#csv-file");
const status = document.querySelector("#status");
const summary = document.querySelector("#summary");
const issues = document.querySelector("#issues");
const tableBody = document.querySelector("#exceptions-table tbody");
const tableRegion = document.querySelector(".table-wrap");
const downloadButton = document.querySelector("#download-exceptions");
const pagination = document.querySelector("#exception-pages");
const previousButton = document.querySelector("#previous-page");
const nextButton = document.querySelector("#next-page");
const pageLabel = document.querySelector("#page-label");
const PAGE_SIZE = 25;

const sampleCsv = [
  "sku,name,expected,counted,condition",
  "SKU-101,Storage bins,12,12,sellable",
  "SKU-104,Label rolls,8,6,sellable",
  "SKU-208,Hand scanner,3,4,sellable",
  "SKU-315,Carton tape,10,10,damaged",
].join("\n");
let lastExceptions = [];
let inputRevision = 0;
let page = 0;

function clearResult() {
  summary.replaceChildren();
  issues.replaceChildren();
  tableBody.replaceChildren();
  lastExceptions = [];
  page = 0;
  pagination.hidden = true;
  downloadButton.disabled = true;
}

csvInput.addEventListener("input", () => {
  inputRevision++;
  clearResult();
  status.dataset.tone = "";
  status.textContent = "Stock data changed. Reconcile again to update the results.";
});

function showResult(result) {
  summary.replaceChildren();
  issues.replaceChildren();
  const stats = [
    ["Rows", result.summary.rows],
    ["Checked", result.summary.checked],
    ["Matches", result.summary.matches],
    ["Exceptions", result.summary.exceptions],
    ["Held for input fixes", result.summary.issues],
  ];
  for (const [label, value] of stats) {
    const item = document.createElement("span");
    const count = document.createElement("strong");
    count.textContent = String(value);
    item.append(count, document.createTextNode(" " + label));
    summary.append(item);
  }
  for (const issue of result.issues) {
    const item = document.createElement("li");
    item.dataset.kind = "missing";
    item.textContent = "Line " + issue.line + " — " + issue.message;
    issues.append(item);
  }
  lastExceptions = result.exceptions;
  page = 0;
  showPage();
  downloadButton.disabled = !lastExceptions.length;
  status.dataset.tone = result.summary.issues ? "error" : "";
  status.textContent = result.summary.issues
    ? "Review the input issues before relying on the totals."
    : "Reconciliation complete. Exceptions are ready for follow-up.";
}

function showPage() {
  tableBody.replaceChildren();
  const start = page * PAGE_SIZE;
  for (const row of lastExceptions.slice(start, start + PAGE_SIZE)) {
    const tr = document.createElement("tr");
    for (const value of [row.finding, row.sku, row.name || "—", row.expected, row.counted, row.difference > 0 ? "+" + row.difference : row.difference]) {
      const td = document.createElement("td");
      td.textContent = String(value);
      tr.append(td);
    }
    tableBody.append(tr);
  }
  pagination.hidden = !lastExceptions.length;
  previousButton.disabled = page === 0;
  nextButton.disabled = start + PAGE_SIZE >= lastExceptions.length;
  pageLabel.textContent = `${start + 1}–${Math.min(start + PAGE_SIZE, lastExceptions.length)} of ${lastExceptions.length.toLocaleString("en-GB")} exceptions`;
}

function changePage(delta) {
  page += delta;
  showPage();
  tableRegion.focus();
  tableRegion.scrollIntoView({ block: "start" });
}

previousButton.addEventListener("click", () => changePage(-1));
nextButton.addEventListener("click", () => changePage(1));

function run() {
  inputRevision++;
  try {
    showResult(reconcileCsv(csvInput.value));
  } catch (error) {
    clearResult();
    status.dataset.tone = "error";
    status.textContent = error.message;
  }
}

document.querySelector("#run-reconcile").addEventListener("click", run);
document.querySelector("#load-sample").addEventListener("click", () => {
  csvInput.value = sampleCsv;
  run();
});
fileInput.addEventListener("change", async () => {
  const file = fileInput.files?.[0];
  if (!file) return;
  clearResult();
  const revision = ++inputRevision;
  fileInput.disabled = true;
  status.dataset.tone = "";
  status.textContent = "Reading CSV file…";
  try {
    const text = await readCsvFile(file);
    if (revision !== inputRevision) return;
    csvInput.value = text;
    run();
  } catch (error) {
    if (revision !== inputRevision) return;
    status.dataset.tone = "error";
    status.textContent = file.size > 1_000_000 ? error.message : "This file could not be read. Choose a UTF-8 CSV file.";
  } finally {
    fileInput.disabled = false;
    fileInput.value = "";
  }
});
downloadButton.addEventListener("click", () => {
  if (!lastExceptions.length) return;
  const blob = new Blob([exceptionsToCsv(lastExceptions)], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "stock-exceptions.csv";
  link.click();
  URL.revokeObjectURL(url);
});

csvInput.value = sampleCsv;
run();
