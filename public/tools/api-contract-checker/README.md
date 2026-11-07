# Contract Check

Check JSON payloads for missing fields and type changes using a small contract.

**[Open the tool](https://portfolio.artemislab.co.uk/tools/api-contract-checker/)**

Load the example, edit the contract or payload, then check the result. Reports download as JSON. Inputs stay in the browser without uploads or persistence.

Response files can be loaded as UTF-8 JSON up to 1 MB. An invalid file leaves the response text unchanged. Editing inputs while a file is being read keeps the newer input.

Editing either input clears the previous findings and disables export until the next check.

Contracts allow up to 64 nesting levels. Reports allow up to 50,000 findings and 1,000,000 characters across their paths; larger reports show an error without offering a partial export.

## Contract format

- Primitive types: `string`, `number`, `boolean`, `object`, `array`, `null` or `any`.
- Nested objects list required child fields.
- Arrays accept one template, such as `[{ "id": "number" }]`.
- Extra payload fields are allowed.
- Finding paths use brackets for literal keys containing spaces or punctuation, such as `$["customer.name"]`.

This is a small field-and-type checker, not a full JSON Schema validator.

## Run and test

Run `npm ci` and `npm run dev` from the portfolio repository root, then open `/tools/api-contract-checker/` on the local server. From this directory, run `node --test checker.test.js`.
