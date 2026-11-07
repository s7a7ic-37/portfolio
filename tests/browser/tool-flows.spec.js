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
