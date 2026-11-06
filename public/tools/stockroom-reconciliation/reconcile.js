function readRows(source) {
  if (typeof source !== "string") throw new Error("CSV input must be text.");
  if (source.length > 1_000_000) throw new Error("Keep pasted CSV below 1,000,000 characters.");
  const text = source.replace(/^\uFEFF/, "");
  const rows = [];
  let line = 1;
  let rowLine = 1;
  let field = "";
  let cells = [];
  let quoted = false;
  let quoteClosed = false;

  function finishRow() {
    cells.push(field);
    field = "";
    if (cells.some((cell) => cell.trim() !== "")) {
      rows.push({ line: rowLine, cells });
      if (rows.length > 5001) throw new Error("Use at most 5,000 stock rows.");
    }
    cells = [];
    rowLine = line;
    quoteClosed = false;
  }

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') {
        field += '"';
        i += 1;
      } else if (char === '"') {
        quoted = false;
        quoteClosed = true;
      } else if (char === "\r" || char === "\n") {
        if (char === "\r" && text[i + 1] === "\n") i += 1;
        field += "\n";
        line += 1;
      } else {
        field += char;
      }
    } else if (quoteClosed && char === ",") {
      cells.push(field);
      field = "";
      quoteClosed = false;
    } else if (quoteClosed && (char === "\r" || char === "\n")) {
      if (char === "\r" && text[i + 1] === "\n") i += 1;
      line += 1;
      finishRow();
    } else if (quoteClosed && (char === " " || char === "\t")) {
      // Allow whitespace between a closing quote and the next delimiter.
    } else if (quoteClosed) {
      throw new Error("Unexpected character after a quoted field at line " + line + ".");
    } else if (char === '"') {
      if (field !== "") throw new Error("Unexpected quote at line " + line + ".");
      quoted = true;
    } else if (char === ",") {
      cells.push(field);
      field = "";
    } else if (char === "\r" || char === "\n") {
      if (char === "\r" && text[i + 1] === "\n") i += 1;
      line += 1;
      finishRow();
    } else {
      field += char;
    }
  }

  if (quoted) throw new Error("Unclosed quote near line " + rowLine + ".");
  if (field !== "" || cells.length) finishRow();
  if (!rows.length) throw new Error("Add a header row and at least one stock row.");

  const headers = rows[0].cells.map((cell) => cell.trim().toLowerCase());
  if (headers.some((header) => !header)) throw new Error("Every column needs a header.");
  if (new Set(headers).size !== headers.length) throw new Error("Column headers must be unique.");

  const dataRows = rows.slice(1).map(({ line: sourceLine, cells: values }) => {
    if (values.length !== headers.length) {
      throw new Error("Line " + sourceLine + " has " + values.length + " fields; expected " + headers.length + ".");
    }
    return { ...Object.fromEntries(headers.map((header, index) => [header, values[index]])), line: sourceLine };
  });

  if (!dataRows.length) throw new Error("Add at least one stock row.");
  return { headers, rows: dataRows };
}

function parseQuantity(value) {
  const trimmed = String(value ?? "").trim();
  if (!/^\d+$/.test(trimmed)) return null;
  const quantity = Number(trimmed);
  return Number.isSafeInteger(quantity) ? quantity : null;
}

export function reconcileCsv(source) {
  const { headers, rows } = readRows(source);
  const missingHeaders = ["sku", "expected", "counted"].filter((header) => !headers.includes(header));
  if (missingHeaders.length) throw new Error("Missing required columns: " + missingHeaders.join(", ") + ".");

  const issues = [];
  const groups = new Map();
  for (const row of rows) {
    const sku = String(row.sku ?? "").trim();
    if (!sku) {
      issues.push({ line: row.line, message: "SKU is blank." });
      continue;
    }
    const matches = groups.get(sku);
    if (matches) matches.push(row);
    else groups.set(sku, [row]);
  }

  const validRows = [];
  for (const [sku, matches] of groups) {
    if (matches.length > 1) {
      for (const row of matches) issues.push({ line: row.line, message: "Duplicate SKU " + sku + "; review all rows for this item." });
      continue;
    }
    const row = matches[0];
    const expected = parseQuantity(row.expected);
    const counted = parseQuantity(row.counted);
    const condition = String(row.condition ?? "").trim().toLowerCase() || "sellable";
    const errors = [];
    if (expected === null) errors.push("expected must be a whole, non-negative quantity");
    if (counted === null) errors.push("counted must be a whole, non-negative quantity");
    if (!["sellable", "damaged", "held"].includes(condition)) errors.push("condition must be sellable, damaged, or held");
    if (errors.length) {
      issues.push({ line: row.line, message: errors.join("; ") + "." });
      continue;
    }
    validRows.push({ line: row.line, sku, name: String(row.name ?? "").trim(), expected, counted, condition });
  }

  const exceptions = validRows
    .map((row) => {
      const difference = row.counted - row.expected;
      const reasons = [];
      if (difference < 0) reasons.push("Short by " + Math.abs(difference));
      if (difference > 0) reasons.push("Over by " + difference);
      if (row.condition !== "sellable") reasons.push(row.condition);
      return { ...row, difference, finding: reasons.join(" · ") };
    })
    .filter((row) => row.finding !== "");

  return {
    summary: {
      rows: rows.length,
      checked: validRows.length,
      matches: validRows.length - exceptions.length,
      exceptions: exceptions.length,
      issues: issues.length,
    },
    exceptions,
    issues,
  };
}

export async function readCsvFile(file) {
  if (file.size > 1_000_000) throw new Error("Choose a CSV file no larger than 1 MB.");
  return new TextDecoder("utf-8", { fatal: true }).decode(await file.arrayBuffer());
}

export function exceptionsToCsv(exceptions) {
  const headers = ["sku", "name", "expected", "counted", "difference", "condition", "finding"];
  const quote = (value) => {
    let text = String(value ?? "");
    // shortcut: CSV escaping targets Excel; use typed exports when another importer must be supported.
    if (typeof value === "string" && (/^\s*[=+\-@＝＋－＠]/u.test(text) || /^[\t\r\n]/.test(text))) text = "\t" + text;
    return /[",\r\n\t]/.test(text) ? '"' + text.replaceAll('"', '""') + '"' : text;
  };
  return [headers, ...exceptions.map((row) => headers.map((header) => row[header]))]
    .map((row) => row.map(quote).join(","))
    .join("\r\n");
}
