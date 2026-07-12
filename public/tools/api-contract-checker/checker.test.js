import assert from "node:assert/strict";
import test from "node:test";
import { checkContract } from "./checker.js";

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
