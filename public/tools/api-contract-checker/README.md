# Contract Check

Check JSON payloads for missing fields and type changes using a small contract.

**[Open the tool](https://portfolio.artemislab.co.uk/tools/api-contract-checker/)**

Load the example, edit the contract or payload, then check the result. Reports download as JSON. Inputs stay in the browser without uploads or persistence.

Editing either input clears the previous findings and disables export until the next check.

## Contract format

- Primitive types: `string`, `number`, `boolean`, `object`, `array`, `null` or `any`.
- Nested objects list required child fields.
- Arrays accept one template, such as `[{ "id": "number" }]`.
- Extra payload fields are allowed.

This is a small field-and-type checker, not a full JSON Schema validator.

## Run and test

Run `npm ci` and `npm run dev` from the portfolio repository root, then open `/tools/api-contract-checker/` on the local server. From this directory, run `node --test checker.test.js`.
