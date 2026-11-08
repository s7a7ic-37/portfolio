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
  if (typeof value === "number" && !Number.isFinite(value)) return "non-finite number";
  return typeof value;
}

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function propertyPath(path, key) {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key) ? path + "." + key : path + "[" + JSON.stringify(key) + "]";
}

function validateSchema(schema, path = "$", depth = 1) {
  if (depth > 64) throw new Error("Contract is nested too deeply. Use at most 64 levels.");
  if (typeof schema === "string") {
    if (!primitiveTypes.has(schema)) throw new Error("Unsupported type at " + path + ": " + schema);
    return;
  }
  if (Array.isArray(schema)) {
    if (schema.length > 1) throw new Error("Use one array item template at " + path);
    if (schema.length === 1) validateSchema(schema[0], path + "[0]", depth + 1);
    return;
  }
  if (isRecord(schema)) {
    for (const [key, child] of Object.entries(schema)) validateSchema(child, propertyPath(path, key), depth + 1);
    return;
  }
  throw new Error("Use type names, nested objects, or array templates at " + path);
}

function collectFindings(schema, value, path, addFinding) {
  if (typeof schema === "string") {
    const actual = typeOf(value);
    if (schema !== "any" && actual !== schema) addFinding({ kind: "type", path, expected: schema, actual });
    return;
  }
  if (Array.isArray(schema)) {
    if (!Array.isArray(value)) {
      addFinding({ kind: "type", path, expected: "array", actual: typeOf(value) });
      return;
    }
    if (schema.length === 1) value.forEach((item, index) => collectFindings(schema[0], item, path + "[" + index + "]", addFinding));
    return;
  }
  if (!isRecord(value)) {
    addFinding({ kind: "type", path, expected: "object", actual: typeOf(value) });
    return;
  }
  for (const [key, child] of Object.entries(schema)) {
    if (!Object.prototype.hasOwnProperty.call(value, key)) addFinding({ kind: "missing", path: propertyPath(path, key) });
    else collectFindings(child, value[key], propertyPath(path, key), addFinding);
  }
}

export function checkContract(contract, response) {
  validateSchema(contract);
  const findings = [];
  let pathCharacters = 0;
  const addFinding = (finding) => {
    pathCharacters += finding.path.length;
    if (findings.length >= 50_000 || pathCharacters > 1_000_000)
      throw new Error("Report is too large. Check a smaller response or contract.");
    findings.push(finding);
  };
  collectFindings(contract, response, "$", addFinding);
  return findings;
}
