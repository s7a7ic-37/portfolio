import { checkContract, readJsonFile } from "./checker.js";

const contractInput = document.querySelector("#contract");
const responseInput = document.querySelector("#response");
const fileInput = document.querySelector("#response-file");
const status = document.querySelector("#status");
const results = document.querySelector("#results");
const downloadButton = document.querySelector("#download-report");
const pagination = document.querySelector("#finding-pages");
const previousButton = document.querySelector("#previous-page");
const nextButton = document.querySelector("#next-page");
const pageLabel = document.querySelector("#page-label");
const PAGE_SIZE = 25;

const sampleContract = {
  article_id: "number",
  title: "string",
  topic: "string",
  author: "string",
  votes: "number",
  comments: [{ comment_id: "number", body: "string", author: "string" }],
};

const sampleResponse = {
  article_id: "34",
  title: "Seafood substitutions are increasing",
  topic: "cooking",
  votes: 3,
  comments: [{ comment_id: 1, body: "Useful read", author: "jessjelly" }],
};

let lastReport = null;
let inputRevision = 0;
let page = 0;

function clearResult() {
  lastReport = null;
  page = 0;
  results.replaceChildren();
  pagination.hidden = true;
  downloadButton.disabled = true;
}

for (const input of [contractInput, responseInput]) {
  input.addEventListener("input", () => {
    inputRevision++;
    clearResult();
    status.dataset.tone = "";
    status.textContent = "Inputs changed. Check the response again to update the findings.";
  });
}

fileInput.addEventListener("change", async () => {
  const file = fileInput.files?.[0];
  if (!file) return;
  responseInput.dispatchEvent(new Event("input"));
  const revision = inputRevision;
  fileInput.disabled = true;
  status.textContent = "Reading response file…";
  try {
    const text = await readJsonFile(file);
    if (revision !== inputRevision) return;
    responseInput.value = text;
    status.textContent = "Response file loaded locally. Check the response to see findings.";
  } catch {
    if (revision !== inputRevision) return;
    status.dataset.tone = "error";
    status.textContent = "Choose a valid UTF-8 JSON file no larger than 1 MB. Your response text is unchanged.";
  } finally {
    fileInput.disabled = false;
    fileInput.value = "";
  }
});

function showFindings(findings) {
  results.replaceChildren();
  const start = page * PAGE_SIZE;
  pagination.hidden = findings.length <= PAGE_SIZE;
  previousButton.disabled = page === 0;
  nextButton.disabled = start + PAGE_SIZE >= findings.length;
  pageLabel.textContent = findings.length
    ? `${start + 1}–${Math.min(start + PAGE_SIZE, findings.length)} of ${findings.length.toLocaleString("en-GB")} findings`
    : "";
  if (!findings.length) {
    const item = document.createElement("li");
    item.dataset.kind = "success";
    item.textContent = "Response matches the contract.";
    results.append(item);
    return;
  }
  for (const finding of findings.slice(start, start + PAGE_SIZE)) {
    const item = document.createElement("li");
    item.dataset.kind = finding.kind === "missing" ? "missing" : "type";
    item.textContent = finding.kind === "missing"
      ? finding.path + " — required field is missing"
      : finding.path + " — expected " + finding.expected + ", received " + finding.actual;
    results.append(item);
  }
}

function changePage(delta) {
  const next = page + delta;
  if (!lastReport || next < 0 || next * PAGE_SIZE >= lastReport.findings.length) return;
  page = next;
  showFindings(lastReport.findings);
  results.focus();
  results.scrollIntoView({ block: "start" });
}

previousButton.addEventListener("click", () => changePage(-1));
nextButton.addEventListener("click", () => changePage(1));

function check() {
  inputRevision++;
  status.dataset.tone = "";
  try {
    const contract = JSON.parse(contractInput.value);
    const response = JSON.parse(responseInput.value);
    const findings = checkContract(contract, response);
    lastReport = { checked_at: new Date().toISOString(), findings };
    page = 0;
    showFindings(findings);
    status.textContent = findings.length
      ? findings.length + " finding" + (findings.length === 1 ? "" : "s") + "."
      : "No missing fields or type changes found.";
    downloadButton.disabled = false;
  } catch (error) {
    clearResult();
    status.dataset.tone = "error";
    status.textContent = error instanceof SyntaxError ? "Check the JSON syntax in both fields." : error.message;
  }
}

document.querySelector("#check-form").addEventListener("submit", (event) => {
  event.preventDefault();
  check();
});

document.querySelector("#load-example").addEventListener("click", () => {
  inputRevision++;
  contractInput.value = JSON.stringify(sampleContract, null, 2);
  responseInput.value = JSON.stringify(sampleResponse, null, 2);
  check();
});

downloadButton.addEventListener("click", () => {
  if (!lastReport) return;
  const blob = new Blob([JSON.stringify(lastReport, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "contract-check-report.json";
  link.click();
  URL.revokeObjectURL(url);
});

contractInput.value = JSON.stringify(sampleContract, null, 2);
responseInput.value = JSON.stringify(sampleResponse, null, 2);
check();
