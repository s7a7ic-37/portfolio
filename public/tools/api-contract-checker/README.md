# Contract Check

A browser-only JSON response checker. Define a small contract using primitive type names, nested objects, and one-item array templates, then check a payload for missing fields and type changes.

## Try it

Open index.html directly or visit /tools/api-contract-checker/ on the portfolio. Select Load example to see the sample API mismatch, then edit either JSON field and check again. The report downloads as JSON.

## Contract format

- Primitive fields use string, number, boolean, object, array, null, or any.
- Nested objects list required child fields.
- Arrays may contain one template, for example [{ "id": "number" }].
- Extra payload fields are allowed.

This is a small learning tool rather than a full JSON Schema validator. It runs locally in the browser and sends no data to a server.

## Check

Run node --test checker.test.js to verify matching payloads, missing fields, nested type changes, and invalid contract definitions.
