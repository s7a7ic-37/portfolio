import { checkContract, compareContracts, readJsonFile } from "./checker.js";

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
const modeInput = document.querySelector("#check-mode");
const runButton = document.querySelector("#run-check");
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
const sampleCandidate = {...sampleContract, article_id: "string"};
delete sampleCandidate.author;
const examples = {
  response: [sampleContract, sampleResponse],
  compare: [sampleContract, sampleCandidate],
};
const drafts = {};

let lastReport = null;
let inputRevision = 0;
let page = 0;
let mode = "response";

function writeInputs(texts) {
  [contractInput.value, responseInput.value] = texts;
}

function loadExample() {
  writeInputs(examples[mode].map(value => JSON.stringify(value, null, 2)));
  check();
}

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
    status.textContent = mode === "compare"
      ? "Inputs changed. Compare the contracts again to update the findings."
      : "Inputs changed. Check the response again to update the findings.";
  });
}

fileInput.addEventListener("change", async () => {
  const file = fileInput.files?.[0];
  if (!file) return;
  responseInput.dispatchEvent(new Event("input"));
  const revision = inputRevision;
  fileInput.disabled = true;
  status.textContent = mode === "compare" ? "Reading candidate file…" : "Reading response file…";
  try {
    const text = await readJsonFile(file);
    if (revision !== inputRevision) return;
    responseInput.value = text;
    status.textContent = mode === "compare"
      ? "Candidate file loaded locally. Compare the contracts to see findings."
      : "Response file loaded locally. Check the response to see findings.";
  } catch {
    if (revision !== inputRevision) return;
    status.dataset.tone = "error";
    status.textContent = mode === "compare"
      ? "Choose a valid UTF-8 JSON file no larger than 1 MB. Your candidate text is unchanged."
      : "Choose a valid UTF-8 JSON file no larger than 1 MB. Your response text is unchanged.";
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
    item.textContent = mode === "compare" ? "The candidate preserves the baseline contract." : "Response matches the contract.";
    results.append(item);
    return;
  }
  for (const finding of findings.slice(start, start + PAGE_SIZE)) {
    const item = document.createElement("li");
    item.dataset.kind = finding.kind === "missing" ? "missing" : "type";
    if (mode === "compare") {
      item.textContent = finding.kind === "missing"
        ? finding.path + " — required field removed"
        : finding.path + " — baseline requires " + finding.expected + ", candidate allows " + finding.actual;
    } else {
      item.textContent = finding.kind === "missing"
        ? finding.path + " — required field is missing"
        : finding.path + " — expected " + finding.expected + ", received " + finding.actual;
    }
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
    const comparing = mode === "compare";
    const findings = comparing ? compareContracts(contract, response) : checkContract(contract, response);
    lastReport = { checked_at: new Date().toISOString(), findings };
    if (comparing) lastReport.mode = "compatibility";
    page = 0;
    showFindings(findings);
    status.textContent = findings.length
      ? findings.length + (comparing ? " breaking change" : " finding") + (findings.length === 1 ? "" : "s") + "."
      : comparing ? "No breaking changes in required fields and types." : "No missing fields or type changes found.";
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

modeInput.addEventListener("change", () => {
  inputRevision++;
  drafts[mode] = [contractInput.value, responseInput.value];
  mode = modeInput.value;
  const comparing = mode === "compare";
  document.querySelector("#check-heading").textContent = comparing ? "Compare response contracts" : "Check a response";
  document.querySelector("#compare-help").hidden = !comparing;
  document.querySelector("#contract-label").textContent = comparing ? "Baseline contract" : "Expected contract";
  document.querySelector("#response-label").textContent = comparing ? "Candidate contract" : "JSON response";
  document.querySelector("#response-file-label").textContent = comparing ? "Or choose a candidate file" : "Or choose a response file";
  document.querySelector("#file-help").textContent = comparing
    ? "UTF-8 JSON, up to 1 MB. The candidate is read in your browser without uploads."
    : "UTF-8 JSON, up to 1 MB. Read in your browser without uploads. Loading a file replaces the response text.";
  runButton.textContent = comparing ? "Compare contracts" : "Check response";
  clearResult();
  status.dataset.tone = "";
  status.textContent = "";
  if (drafts[mode]) writeInputs(drafts[mode]);
  else loadExample();
});

document.querySelector("#load-example").addEventListener("click", loadExample);

downloadButton.addEventListener("click", () => {
  if (!lastReport) return;
  const blob = new Blob([JSON.stringify(lastReport, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = mode === "compare" ? "contract-compatibility-report.json" : "contract-check-report.json";
  link.click();
  URL.revokeObjectURL(url);
});

modeInput.value = mode;
loadExample();
