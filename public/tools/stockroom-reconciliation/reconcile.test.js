import assert from "node:assert/strict";
import test from "node:test";
import { exceptionsToCsv, reconcileCsv } from "./reconcile.js";

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
