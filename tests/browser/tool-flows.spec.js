import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";

test("Stockroom searches SKU and item text without changing totals or full export", async ({ page }) => {
  await page.goto("/tools/stockroom-reconciliation/");
  const source = "sku,name,expected,counted,condition\n" + Array.from({length: 28}, (_, i) =>
    `SKU-${i},${i === 27 ? "Łódź [rack]" : "Item " + i},2,1,${i === 27 ? "damaged" : "sellable"}`).join("\n");
  await page.getByLabel("Stock count CSV", {exact: true}).fill(source);
  await page.getByRole("button", {name: "Reconcile rows", exact: true}).click();
  const rows = page.locator("#exceptions-table tbody tr");
  const pages = page.getByRole("navigation", {name: "Exception pages", exact: true});
  await pages.getByRole("button", {name: "Next", exact: true}).click();
  await expect(rows).toHaveCount(3);
  const search = page.getByLabel("Find SKU or item", {exact: true});
  await search.fill(" sku-27 ");
  await expect(rows).toHaveCount(1);
  await expect(rows.first()).toContainText("Łódź [rack]");
  await expect(pages).toContainText("1–1 of 1 exceptions · 28 total");
  await search.fill("ŁÓDŹ [rack]");
  await expect(rows).toHaveCount(1);
  await page.getByLabel("Filter exceptions", {exact: true}).selectOption("overage");
  await expect(rows).toHaveCount(0);
  await expect(page.locator("#filter-empty")).toContainText("28 total exceptions remain");
  await page.getByLabel("Filter exceptions", {exact: true}).selectOption("damaged");
  await expect(rows).toHaveCount(1);
  await search.fill(".+");
  await expect(rows).toHaveCount(0);
  await expect(page.locator("#summary")).toContainText("28 Exceptions");
  const pending = page.waitForEvent("download");
  await page.getByRole("button", {name: "Export all exceptions", exact: true}).click();
  const csv = await readFile(await (await pending).path(), "utf8");
  expect(csv.split("\r\n")).toHaveLength(29);
  expect(csv).toContain("SKU-0,");
  expect(csv).toContain("SKU-27,");
  await page.getByRole("button", {name: "Clear search", exact: true}).click();
  await expect(search).toHaveValue("");
  await expect(search).toBeFocused();
  await expect(page.getByRole("button", {name: "Clear search", exact: true})).toBeDisabled();
  await expect(rows).toHaveCount(1);
  await page.getByLabel("Filter exceptions", {exact: true}).selectOption("all");
  await expect(rows).toHaveCount(25);
  await search.fill("sku-27");
  await page.getByRole("button", {name: "Load sample", exact: true}).click();
  await expect(search).toHaveValue("");
  await expect(rows).toHaveCount(3);
  for (const width of [320, 390, 768, 1280]) {
    await page.setViewportSize({width, height: 900});
    expect(await page.evaluate(() => innerWidth)).toBe(width);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect((await search.boundingBox()).height).toBeGreaterThanOrEqual(44);
    expect(await search.evaluate(input => getComputedStyle(input).fontSize)).toBe("16px");
  }
});

test("Contract Check validates root arrays and primitive responses", async ({ page }) => {
  await page.goto("/tools/api-contract-checker/");
  const contract = page.getByLabel("Expected contract", {exact: true});
  const response = page.getByLabel("JSON response", {exact: true});
  const check = page.getByRole("button", {name: "Check response", exact: true});
  await contract.fill('[{"id":"number"}]');
  await response.fill('[{"id":1},{"id":"2"},{}]');
  await check.click();
  await expect(page.locator("#results li")).toHaveText([
    "$[1].id — expected number, received string",
    "$[2].id — required field is missing",
  ]);
  const pending = page.waitForEvent("download");
  await page.getByRole("button", {name: "Download report", exact: true}).click();
  const report = JSON.parse(await readFile(await (await pending).path(), "utf8"));
  expect(report.findings.map(finding => finding.path)).toEqual(["$[1].id", "$[2].id"]);
  await response.fill("[]");
  await check.click();
  await expect(page.locator("#results li")).toHaveText("Response matches the contract.");
  await contract.fill('"boolean"');
  await response.fill("0");
  await check.click();
  await expect(page.locator("#results li")).toHaveText("$ — expected boolean, received number");
  await response.fill("false");
  await check.click();
  await expect(page.locator("#results li")).toHaveText("Response matches the contract.");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("Contract Check reports overflowing numbers and recovers with finite values", async ({ page }) => {
  await page.goto("/tools/api-contract-checker/");
  await page.getByLabel("Expected contract", { exact: true }).fill('{"amount":"number"}');
  const response = page.getByLabel("JSON response", { exact: true });
  await response.fill('{"amount":1e400}');
  await page.getByRole("button", { name: "Check response", exact: true }).click();
  await expect(page.locator("#results")).toContainText("$.amount — expected number, received non-finite number");
  const pending = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download report", exact: true }).click();
  const report = JSON.parse(await readFile(await (await pending).path(), "utf8"));
  expect(report.findings).toEqual([{kind: "type", path: "$.amount", expected: "number", actual: "non-finite number"}]);
  await response.fill('{"amount":1e308}');
  await expect(page.getByRole("button", { name: "Download report", exact: true })).toBeDisabled();
  await page.getByRole("button", { name: "Check response", exact: true }).click();
  await expect(page.locator("#results")).toContainText("Response matches the contract.");
});

test("Stockroom bounds input issues and keeps every page available", async ({ page }) => {
  await page.goto("/tools/stockroom-reconciliation/");
  const input = page.getByLabel("Stock count CSV", { exact: true });
  const run = page.getByRole("button", { name: "Reconcile rows", exact: true });
  const source = count => "sku,expected,counted\n" + Array.from({ length: count }, (_, index) => `SKU-${index},invalid,1`).join("\n");
  await page.getByLabel("Choose a CSV file", { exact: true }).setInputFiles({ name: "invalid-stock.csv", mimeType: "text/csv", buffer: Buffer.from(source(5000)) });
  await expect(page.locator("#issues li")).toHaveCount(25);
  await expect(page.locator("#summary")).toContainText("5000 Held for input fixes");
  await input.fill(source(26));
  await run.click();
  const pages = page.getByRole("navigation", { name: "Input issue pages", exact: true });
  await expect(pages).toContainText("1–25 of 26 input issues");
  await pages.getByRole("button", { name: "Next", exact: true }).click();
  await expect(page.locator("#issues li")).toHaveCount(1);
  await expect(page.locator("#issues")).toBeFocused();
  await expect(page.locator("#issues li")).toContainText("Line 27");
  await expect(pages.getByRole("button", { name: "Next", exact: true })).toBeDisabled();
  await pages.getByRole("button", { name: "Previous", exact: true }).click();
  await expect(page.locator("#issues li")).toHaveCount(25);
  await input.fill("sku,expected,counted\nOK,1,1");
  await expect(pages).toBeHidden();
  await expect(page.locator("#issues li")).toHaveCount(0);
  await run.click();
  await expect(pages).toBeHidden();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

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

test("Contract Check refuses oversized reports and recovers without partial exports", async ({ page }) => {
  await page.goto("/tools/api-contract-checker/");
  const contract = page.getByLabel("Expected contract", { exact: true });
  const response = page.getByLabel("JSON response", { exact: true });
  const download = page.getByRole("button", { name: "Download report", exact: true });
  await expect(download).toBeEnabled();
  const cases = [
    {contract: {rows: [Object.fromEntries(Array.from({length: 10}, (_, i) => ["field" + i, "number"]))]}, response: {rows: Array.from({length: 6000}, () => ({}))}},
    {contract: {rows: [{["k".repeat(20_000)]: "number"}]}, response: {rows: Array.from({length: 50}, () => ({}))}},
  ];
  for (const sample of cases) {
    const text = JSON.stringify(sample.response);
    await contract.fill(JSON.stringify(sample.contract));
    await response.fill(text);
    await page.getByRole("button", { name: "Check response", exact: true }).click();
    await expect(page.locator("#status")).toHaveText("Report is too large. Check a smaller response or contract.");
    await expect(page.locator("#results li")).toHaveCount(0);
    await expect(page.getByRole("navigation", { name: "Finding pages", exact: true })).toBeHidden();
    await expect(download).toBeDisabled();
    await expect(response).toHaveValue(text);
  }
  await page.getByRole("button", { name: "Load example", exact: true }).click();
  await expect(page.locator("#results li")).toHaveCount(2);
  await expect(download).toBeEnabled();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("Stockroom filters follow-up rows while preserving all-exception export and input warnings", async ({ page }) => {
  await page.goto("/tools/stockroom-reconciliation/");
  const input = page.getByLabel("Stock count CSV", { exact: true });
  const source = ["sku,expected,counted,condition",
    ...Array.from({length: 30}, (_, index) => `SHORT-${index},2,1,sellable`),
    "DAMAGE,2,1,damaged", "OVER,2,4,sellable", "HELD,3,3,held",
    "MATCH,2,2,sellable", "INVALID,-1,0,sellable"].join("\n");
  await input.fill(source);
  await page.getByRole("button", { name: "Reconcile rows", exact: true }).click();
  const filter = page.getByLabel("Filter exceptions", { exact: true });
  await expect(filter).toBeVisible();
  const rows = page.locator("#exceptions-table tbody tr");
  const pages = page.getByRole("navigation", { name: "Exception pages", exact: true });
  await pages.getByRole("button", { name: "Next", exact: true }).click();
  await expect(rows).toHaveCount(8);
  await filter.selectOption("shortage");
  await expect(rows).toHaveCount(25);
  await expect(rows.first()).toContainText("SHORT-0");
  await expect(pages.getByRole("button", { name: "Previous", exact: true })).toBeDisabled();
  await pages.getByRole("button", { name: "Next", exact: true }).click();
  await expect(rows).toHaveCount(6);
  await expect(rows.last()).toContainText("DAMAGE");
  await filter.selectOption("damaged");
  await expect(rows).toHaveCount(1);
  await expect(rows.first()).toContainText("DAMAGE");
  await expect(page.locator("#status")).toContainText("Review the input issues");
  const pending = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export all exceptions", exact: true }).click();
  const csv = await readFile(await (await pending).path(), "utf8");
  expect(csv.split("\r\n")).toHaveLength(34);
  for (const sku of ["SHORT-0", "DAMAGE", "OVER", "HELD"]) expect(csv).toContain(sku + ",");
  expect(csv).not.toContain("INVALID,");
  expect(csv).not.toContain("MATCH,");
  await filter.selectOption("overage");
  await expect(rows).toHaveCount(1);
  await expect(rows.first()).toContainText("OVER");
  await filter.selectOption("held");
  await expect(rows).toHaveCount(1);
  await expect(rows.first()).toContainText("HELD");
  await input.fill("sku,expected,counted\nNEW,2,1\nMATCH,1,1");
  await expect(filter).toBeHidden();
  await page.getByRole("button", { name: "Reconcile rows", exact: true }).click();
  await expect(filter).toHaveValue("all");
  await filter.selectOption("held");
  await expect(rows).toHaveCount(0);
  await expect(page.locator("#filter-empty")).toContainText("No exceptions match this filter");
  await expect(pages).toBeHidden();
  await expect(filter).toBeVisible();
  await expect(page.getByRole("button", { name: "Export all exceptions", exact: true })).toBeEnabled();
  await filter.selectOption("all");
  await expect(rows).toHaveCount(1);
  await expect(rows.first()).toContainText("NEW");
  await expect(page.locator("#filter-empty")).toBeHidden();
});
