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
