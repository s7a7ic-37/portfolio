const primitiveTypes = new Set(["string", "number", "boolean", "object", "array", "null", "any"]);

export async function readJsonFile(file) {
  if (file.size > 1_000_000) throw new Error("Choose a JSON file no larger than 1 MB.");
  const text = new TextDecoder("utf-8", { fatal: true }).decode(await file.arrayBuffer());
  JSON.parse(text);
  return text;
}

function typeOf(value) {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
}

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function validateSchema(schema, path = "$") {
  if (typeof schema === "string") {
    if (!primitiveTypes.has(schema)) throw new Error("Unsupported type at " + path + ": " + schema);
    return;
  }
  if (Array.isArray(schema)) {
    if (schema.length > 1) throw new Error("Use one array item template at " + path);
    if (schema.length === 1) validateSchema(schema[0], path + "[0]");
    return;
  }
  if (isRecord(schema)) {
    for (const [key, child] of Object.entries(schema)) validateSchema(child, path + "." + key);
    return;
  }
  throw new Error("Use type names, nested objects, or array templates at " + path);
}

function collectFindings(schema, value, path, findings) {
  if (typeof schema === "string") {
    const actual = typeOf(value);
    if (schema !== "any" && actual !== schema) findings.push({ kind: "type", path, expected: schema, actual });
    return;
  }
  if (Array.isArray(schema)) {
    if (!Array.isArray(value)) {
      findings.push({ kind: "type", path, expected: "array", actual: typeOf(value) });
      return;
    }
    if (schema.length === 1) value.forEach((item, index) => collectFindings(schema[0], item, path + "[" + index + "]", findings));
    return;
  }
  if (!isRecord(value)) {
    findings.push({ kind: "type", path, expected: "object", actual: typeOf(value) });
    return;
  }
  for (const [key, child] of Object.entries(schema)) {
    if (!Object.prototype.hasOwnProperty.call(value, key)) findings.push({ kind: "missing", path: path + "." + key });
    else collectFindings(child, value[key], path + "." + key, findings);
  }
}

export function checkContract(contract, response) {
  validateSchema(contract);
  if (!isRecord(contract)) throw new Error("Contract root must be a JSON object");
  const findings = [];
  collectFindings(contract, response, "$", findings);
  return findings;
}
