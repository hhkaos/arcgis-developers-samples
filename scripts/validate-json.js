import fs from "fs";

const path = "data/apps.json";

function printJsonError(content, err) {
  // Intentar sacar "position N" del mensaje de JSON.parse
  const match = /position (\d+)/.exec(err.message || "");
  if (!match) {
    console.error(err.message || err);
    return;
  }

  const pos = Number(match[1]);

  // Calcular línea y columna a partir de la posición
  let line = 1;
  let column = 1;

  for (let i = 0; i < pos && i < content.length; i++) {
    if (content[i] === "\n") {
      line++;
      column = 1;
    } else {
      column++;
    }
  }

  const lines = content.split(/\r?\n/);
  const errorLine = lines[line - 1] ?? "";

  // Construir la línea con la flecha (caret) debajo
  const caretPrefix = "-".repeat(Math.max(column - 1, 0)) + "^";

  console.error(`Error: Parse error on line ${line}:`);
  console.error(errorLine);
  console.error(caretPrefix);
  console.error(err.message);
}

function validateJsonFile(filePath) {
  let content = "";

  try {
    content = fs.readFileSync(filePath, "utf8");
  } catch (readErr) {
    console.error(`[ERROR] Cannot read ${filePath}: ${readErr.message}`);
    process.exit(1);
  }

  try {
    JSON.parse(content);
    console.log(`[OK] ${filePath} is valid JSON`);
  } catch (err) {
    console.error(`[ERROR] Invalid JSON in ${filePath}:`);
    if (err instanceof SyntaxError) {
      printJsonError(content, err);
    } else {
      console.error(err.message || err);
    }
    process.exit(1);
  }
}

validateJsonFile(path);
