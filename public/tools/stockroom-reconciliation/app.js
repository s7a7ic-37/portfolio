import { exceptionsToCsv, reconcileCsv } from "./reconcile.js";

const csvInput = document.querySelector("#csv-input");
const fileInput = document.querySelector("#csv-file");
const status = document.querySelector("#status");
const summary = document.querySelector("#summary");
const issues = document.querySelector("#issues");
const tableBody = document.querySelector("#exceptions-table tbody");
const downloadButton = document.querySelector("#download-exceptions");

const sampleCsv = [
  "sku,name,expected,counted,condition",
  "SKU-101,Storage bins,12,12,sellable",
  "SKU-104,Label rolls,8,6,sellable",
  "SKU-208,Hand scanner,3,4,sellable",
  "SKU-315,Carton tape,10,10,damaged",
].join("\n");
let lastExceptions = [];

function showResult(result) {
  summary.replaceChildren();
  issues.replaceChildren();
  tableBody.replaceChildren();
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
  for (const row of result.exceptions) {
    const tr = document.createElement("tr");
    for (const value of [row.finding, row.sku, row.name || "—", row.expected, row.counted, row.difference > 0 ? "+" + row.difference : row.difference]) {
      const td = document.createElement("td");
      td.textContent = String(value);
      tr.append(td);
    }
    tableBody.append(tr);
  }
  lastExceptions = result.exceptions;
  downloadButton.disabled = !lastExceptions.length;
  status.dataset.tone = result.summary.issues ? "error" : "";
  status.textContent = result.summary.issues
    ? "Review the input issues before relying on the totals."
    : "Reconciliation complete. Exceptions are ready for follow-up.";
}

function run() {
  try {
    showResult(reconcileCsv(csvInput.value));
  } catch (error) {
    summary.replaceChildren();
    issues.replaceChildren();
    tableBody.replaceChildren();
    lastExceptions = [];
    downloadButton.disabled = true;
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
  try {
    csvInput.value = await file.text();
    run();
  } catch {
    status.dataset.tone = "error";
    status.textContent = "This file could not be read. Try another CSV file.";
  }
  fileInput.value = "";
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
