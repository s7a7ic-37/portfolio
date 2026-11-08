import assert from "node:assert/strict";
import test from "node:test";
import { checkContract, readJsonFile } from "./checker.js";

test("local JSON files preserve UTF-8 text and validate before replacing input", async () => {
  const text = '{"title":"Łódź","rows":[1,2]}';
  assert.equal(await readJsonFile(new Blob([text])), text);
  await assert.rejects(readJsonFile(new Blob(['{"broken":}'])), SyntaxError);
  await assert.rejects(readJsonFile(new Blob([new Uint8Array([0xc3, 0x28])])));
  assert.equal(await readJsonFile(new Blob(['{}' + ' '.repeat(999998)])), '{}' + ' '.repeat(999998));
  let read = false;
  await assert.rejects(readJsonFile({size: 1_000_001, arrayBuffer: () => { read = true; }}), /1 MB/);
  assert.equal(read, false);
});

const contract = {
  article_id: "number",
  title: "string",
  comments: [{ author: "string", votes: "number" }],
};

test("accepts a matching nested response and empty array", () => {
  assert.deepEqual(checkContract(contract, { article_id: 3, title: "News", comments: [] }), []);
});

test("reports missing fields and nested type changes with JSON paths", () => {
  assert.deepEqual(
    checkContract(contract, { article_id: "3", title: "News", comments: [{ author: "Ada", votes: "2" }] }),
    [
      { kind: "type", path: "$.article_id", expected: "number", actual: "string" },
      { kind: "type", path: "$.comments[0].votes", expected: "number", actual: "string" },
    ]
  );
  assert.deepEqual(checkContract({ author: "string" }, {}), [{ kind: "missing", path: "$.author" }]);
});

test("number contracts reject overflowed JSON numbers without exposing values", () => {
  for (const value of ["1e400", "-1e400"]) {
    assert.deepEqual(checkContract({amount: "number"}, JSON.parse('{"amount":' + value + '}')), [
      {kind: "type", path: "$.amount", expected: "number", actual: "non-finite number"},
    ]);
  }
  assert.deepEqual(checkContract({amount: "number"}, {amount: NaN}), [
    {kind: "type", path: "$.amount", expected: "number", actual: "non-finite number"},
  ]);
  assert.deepEqual(checkContract({amount: "number"}, JSON.parse('{"amount":1e308}')), []);
  assert.deepEqual(checkContract({amount: "any"}, JSON.parse('{"amount":1e400}')), []);
});

test("rejects unsupported and ambiguous contract definitions", () => {
  assert.throws(() => checkContract({ count: "integer" }, { count: 2 }), /Unsupported type/);
  assert.throws(() => checkContract({ rows: ["string", "number"] }, { rows: [] }), /one array item/);
  assert.throws(() => checkContract([], []), /root must be/);
});

test("paths distinguish literal punctuation, empty keys and nested fields", () => {
  const shape = {"customer.name": "string", customer: {name: "string"}, "": "boolean", 'a"b': [{"[id]": "number"}]};
  assert.deepEqual(checkContract(shape, {"customer.name": 1, customer: {}, 'a"b': [{"[id]": "wrong"}]}), [
    {kind: "type", path: '$["customer.name"]', expected: "string", actual: "number"},
    {kind: "missing", path: "$.customer.name"},
    {kind: "missing", path: '$[""]'},
    {kind: "type", path: '$["a\\"b"][0]["[id]"]', expected: "number", actual: "string"},
  ]);
  assert.throws(() => checkContract({"customer.name": "integer"}, {}), error => error.message === 'Unsupported type at $["customer.name"]: integer');
});

test("deep contracts fail with a useful limit before overflowing the call stack", () => {
  const nested = (depth, leaf) => JSON.parse('{"a":'.repeat(depth) + leaf + "}".repeat(depth));
  assert.deepEqual(checkContract(nested(63, '"number"'), nested(63, "1")), []);
  assert.throws(() => checkContract(nested(64, '"number"'), nested(64, "1")), /at most 64 levels/);
  assert.throws(() => checkContract(nested(10000, '"number"'), {}), /at most 64 levels/);
  const arrays = JSON.parse('{"rows":' + "[".repeat(10000) + '"number"' + "]".repeat(10000) + "}");
  assert.throws(() => checkContract(arrays, {}), /at most 64 levels/);
});

test("large reports stop without returning a truncated finding list", () => {
  const contract = {rows: ["number"]};
  assert.equal(checkContract(contract, {rows: Array(50_000).fill("wrong")}).length, 50_000);
  assert.throws(() => checkContract(contract, {rows: Array(50_001).fill("wrong")}), /Report is too large/);
});

test("large reports also bound repeated long paths", () => {
  const contract = {rows: [{["k".repeat(20_000)]: "number"}]};
  assert.equal(checkContract(contract, {rows: Array.from({length: 49}, () => ({}))}).length, 49);
  assert.throws(() => checkContract(contract, {rows: Array.from({length: 50}, () => ({}))}), /Report is too large/);
});
