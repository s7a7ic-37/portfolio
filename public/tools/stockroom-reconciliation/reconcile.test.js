import assert from "node:assert/strict";
import test from "node:test";
import { exceptionsToCsv, reconcileCsv, readCsvFile } from "./reconcile.js";

test("checks counts and identifies shortages, overages, and condition holds", () => {
  const result = reconcileCsv("sku,name,expected,counted,condition\r\nA1,Widget,8,6,sellable\r\nA2,\"Blue, small\",3,4,sellable\r\nA3,Box,2,2,damaged\r\nA4,Clip,5,5,sellable");
  assert.deepEqual(result.summary, { rows: 4, checked: 4, matches: 1, exceptions: 3, issues: 0 });
  assert.deepEqual(result.exceptions.map(({ sku, finding }) => [sku, finding]), [
    ["A1", "Short by 2"],
    ["A2", "Over by 1"],
    ["A3", "damaged"],
  ]);
});

test("holds duplicate and invalid rows out of the checked totals", () => {
  const result = reconcileCsv("sku,expected,counted\nA1,2,2\nA1,3,3\nA2,-1,1\n,1,1");
  assert.deepEqual(result.summary, { rows: 4, checked: 0, matches: 0, exceptions: 0, issues: 4 });
});

test("validates headers, CSV quoting, and exports escaped exception rows", () => {
  assert.throws(() => reconcileCsv("sku,expected\nA1,1"), /Missing required columns/);
  assert.throws(() => reconcileCsv('sku,expected,counted\nA1,1,"2'), /Unclosed quote/);
  assert.throws(() => reconcileCsv("sku,sku,expected,counted\nA1,A1,1,1"), /unique/);
  const result = reconcileCsv('sku,name,expected,counted\nA1,"Widget, ""large""",2,1');
  assert.match(exceptionsToCsv(result.exceptions), /"Widget, ""large"""/);
});

test("source line numbers cannot be overwritten by an extra CSV column", () => {
  const result = reconcileCsv("line,sku,expected,counted\n999,A1,bad,2");
  assert.equal(result.issues[0].line, 2);
});

test("Excel-oriented exports quote and prefix formula-like text while keeping negative quantities numeric", () => {
  const result = reconcileCsv('sku,name,expected,counted\n=1+1,"@SUM(1,2)",2,1');
  const csv = exceptionsToCsv(result.exceptions);
  assert.ok(csv.includes('"\t=1+1","\t@SUM(1,2)",2,1,-1,sellable,Short by 1'));
  for (const sku of ["+1", "-1+1", "＠SUM(A1)", "＝1+1", "＋1", "－1"]) {
    assert.ok(exceptionsToCsv([{ ...result.exceptions[0], sku }]).includes('"\t' + sku + '"'));
  }
});

test("large files are rejected before reading and row limits retain the original input", async () => {
  await assert.rejects(readCsvFile({ size: 1_000_001, arrayBuffer: () => { throw new Error("Must not read"); } }), /1 MB/);
  assert.equal(await readCsvFile({ size: 4, arrayBuffer: async () => new TextEncoder().encode("test").buffer }), "test");
  await assert.rejects(readCsvFile({ size: 1, arrayBuffer: async () => new Uint8Array([255]).buffer }), TypeError);
  assert.throws(() => reconcileCsv("x".repeat(1_000_001)), /characters/);
  const header = "sku,expected,counted\n";
  const rows = Array.from({ length: 5000 }, (_, index) => `SKU-${index},1,1`).join("\n");
  assert.equal(reconcileCsv(header + rows).summary.checked, 5000);
  assert.throws(() => reconcileCsv(header + rows + "\nEXTRA,1,1"), /5,000/);
});
