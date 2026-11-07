import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";

test("Contract Check preserves edits during file reads and quotes literal keys", async ({ page }) => {
  await page.goto("/tools/api-contract-checker/");
  const response = page.getByLabel("JSON response", { exact: true });
  const file = page.getByLabel("Or choose a response file", { exact: true });
  await page.getByLabel("Expected contract", { exact: true }).fill('{"customer.name":"string"}');
  await file.setInputFiles({ name: "response.json", mimeType: "application/json", buffer: Buffer.from('{"customer.name":3}') });
  await expect(page.getByRole("status")).toContainText("Response file loaded locally");
  await page.getByRole("button", { name: "Check response", exact: true }).click();
  await expect(page.getByLabel("Contract check findings")).toContainText('$["customer.name"] — expected string, received number');
  await file.setInputFiles({ name: "invalid.json", mimeType: "application/json", buffer: Buffer.from("{invalid") });
  await expect(page.getByRole("status")).toContainText("Your response text is unchanged");
  await expect(response).toHaveValue('{"customer.name":3}');
  await expect(page.getByRole("button", { name: "Download report", exact: true })).toBeDisabled();
  await page.evaluate(() => {
    const read = File.prototype.arrayBuffer;
    File.prototype.arrayBuffer = async function () {
      await new Promise(resolve => { window.releaseFile = resolve; });
      return read.call(this);
    };
  });
  await file.setInputFiles({ name: "slow.json", mimeType: "application/json", buffer: Buffer.from('{"old":true}') });
  await expect(page.getByRole("status")).toContainText("Reading response file");
  await response.fill('{"newer":"Łódź"}');
  await page.evaluate(() => window.releaseFile());
  await expect(file).toBeEnabled();
  await expect(response).toHaveValue('{"newer":"Łódź"}');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("Stockroom pages exceptions, exports all rows and keeps newer CSV edits", async ({ page }) => {
  await page.goto("/tools/stockroom-reconciliation/");
  const input = page.getByLabel("Stock count CSV", { exact: true });
  const file = page.getByLabel("Choose a CSV file", { exact: true });
  const source = "sku,expected,counted\n" + Array.from({ length: 26 }, (_, index) => `SKU-${index},2,1`).join("\n");
  await file.setInputFiles({ name: "stock.csv", mimeType: "text/csv", buffer: Buffer.from(source) });
  const rows = page.locator("#exceptions-table tbody tr");
  await expect(rows).toHaveCount(25);
  const pages = page.getByRole("navigation", { name: "Exception pages", exact: true });
  await pages.getByRole("button", { name: "Next", exact: true }).click();
  await expect(rows).toHaveCount(1);
  await expect(rows.first()).toContainText("SKU-25");
  await expect(pages.getByRole("button", { name: "Next", exact: true })).toBeDisabled();
  const pending = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export all exceptions", exact: true }).click();
  const download = await pending;
  const csv = await readFile(await download.path(), "utf8");
  expect(csv.split("\r\n")).toHaveLength(27);
  expect(csv).toContain("SKU-0,");
  expect(csv).toContain("SKU-25,");
  await page.evaluate(() => {
    const read = File.prototype.arrayBuffer;
    File.prototype.arrayBuffer = async function () {
      await new Promise(resolve => { window.releaseFile = resolve; });
      return read.call(this);
    };
  });
  await file.setInputFiles({ name: "slow.csv", mimeType: "text/csv", buffer: Buffer.from(source) });
  await expect(page.getByRole("status").first()).toContainText("Reading CSV file");
  await input.fill("sku,expected,counted\nNEW,1,1");
  await page.evaluate(() => window.releaseFile());
  await expect(file).toBeEnabled();
  await expect(input).toHaveValue("sku,expected,counted\nNEW,1,1");
  await expect(rows).toHaveCount(0);
  await expect(pages).toBeHidden();
  await expect(page.getByRole("button", { name: "Export all exceptions", exact: true })).toBeDisabled();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("Contract Check pages findings without truncating the downloadable report", async ({ page }) => {
  await page.goto("/tools/api-contract-checker/");
  await page.getByLabel("Expected contract", { exact: true }).fill('{"rows":[{"id":"number","title":"string"}]}');
  const response = page.getByLabel("JSON response", { exact: true });
  await response.fill(JSON.stringify({rows: Array.from({length: 26}, () => ({}))}));
  await page.getByRole("button", { name: "Check response", exact: true }).click();
  const findings = page.locator("#results li");
  await expect(findings).toHaveCount(25);
  await expect(findings.first()).toContainText("$.rows[0].id");
  const pages = page.getByRole("navigation", { name: "Finding pages", exact: true });
  await expect(pages.getByRole("button", { name: "Previous", exact: true })).toBeDisabled();
  await pages.getByRole("button", { name: "Next", exact: true }).click();
  await expect(findings).toHaveCount(25);
  await expect(findings.first()).toContainText("$.rows[12].title");
  await expect(page.getByLabel("Contract check findings", { exact: true })).toBeFocused();
  await pages.getByRole("button", { name: "Next", exact: true }).click();
  await expect(findings).toHaveCount(2);
  await expect(findings.last()).toContainText("$.rows[25].title");
  await expect(pages.getByRole("button", { name: "Next", exact: true })).toBeDisabled();
  const pending = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download report", exact: true }).click();
  const download = await pending;
  const report = JSON.parse(await readFile(await download.path(), "utf8"));
  expect(report.findings).toHaveLength(52);
  expect(report.findings[0].path).toBe("$.rows[0].id");
  expect(report.findings[51].path).toBe("$.rows[25].title");
  await pages.getByRole("button", { name: "Previous", exact: true }).click();
  await expect(findings.first()).toContainText("$.rows[12].title");
  await response.fill('{"rows":[]}');
  await expect(findings).toHaveCount(0);
  await expect(pages).toBeHidden();
  await expect(page.getByRole("button", { name: "Download report", exact: true })).toBeDisabled();
  await page.getByRole("button", { name: "Check response", exact: true }).click();
  await expect(findings).toHaveCount(1);
  await expect(findings.first()).toContainText("Response matches the contract.");
  await expect(pages).toBeHidden();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("Contract Check explains nested-contract limits and clears stale results", async ({ page }) => {
  await page.goto("/tools/api-contract-checker/");
  const contract = page.getByLabel("Expected contract", { exact: true });
  await contract.fill('{"a":'.repeat(64) + '"number"' + "}".repeat(64));
  await page.getByRole("button", { name: "Check response", exact: true }).click();
  await expect(page.locator("#status")).toHaveText("Contract is nested too deeply. Use at most 64 levels.");
  await expect(page.locator("#results li")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Download report", exact: true })).toBeDisabled();
  await contract.fill('{"a":"number"}');
  await page.getByLabel("JSON response", { exact: true }).fill('{"a":1}');
  await page.getByRole("button", { name: "Check response", exact: true }).click();
  await expect(page.locator("#results li")).toHaveText("Response matches the contract.");
  await expect(page.getByRole("button", { name: "Download report", exact: true })).toBeEnabled();
});
