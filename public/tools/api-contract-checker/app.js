import { checkContract } from "./checker.js";

const contractInput = document.querySelector("#contract");
const responseInput = document.querySelector("#response");
const status = document.querySelector("#status");
const results = document.querySelector("#results");
const downloadButton = document.querySelector("#download-report");

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

for (const input of [contractInput, responseInput]) {
  input.addEventListener("input", () => {
    lastReport = null;
    results.replaceChildren();
    downloadButton.disabled = true;
    status.dataset.tone = "";
    status.textContent = "Inputs changed. Check the response again to update the findings.";
  });
}

function showFindings(findings) {
  results.replaceChildren();
  if (!findings.length) {
    const item = document.createElement("li");
    item.dataset.kind = "success";
    item.textContent = "Response matches the contract.";
    results.append(item);
    return;
  }
  for (const finding of findings) {
    const item = document.createElement("li");
    item.dataset.kind = finding.kind === "missing" ? "missing" : "type";
    item.textContent = finding.kind === "missing"
      ? finding.path + " — required field is missing"
      : finding.path + " — expected " + finding.expected + ", received " + finding.actual;
    results.append(item);
  }
}

function check() {
  status.dataset.tone = "";
  try {
    const contract = JSON.parse(contractInput.value);
    const response = JSON.parse(responseInput.value);
    const findings = checkContract(contract, response);
    lastReport = { checked_at: new Date().toISOString(), findings };
    showFindings(findings);
    status.textContent = findings.length
      ? findings.length + " finding" + (findings.length === 1 ? "" : "s") + "."
      : "No missing fields or type changes found.";
    downloadButton.disabled = false;
  } catch (error) {
    lastReport = null;
    results.replaceChildren();
    status.dataset.tone = "error";
    status.textContent = error instanceof SyntaxError ? "Check the JSON syntax in both fields." : error.message;
    downloadButton.disabled = true;
  }
}

document.querySelector("#check-form").addEventListener("submit", (event) => {
  event.preventDefault();
  check();
});

document.querySelector("#load-example").addEventListener("click", () => {
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
