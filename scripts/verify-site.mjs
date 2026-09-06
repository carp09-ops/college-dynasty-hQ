import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const htmlPath = resolve(root, "index.html");
const html = readFileSync(htmlPath, "utf8");
const errors = [];

const references = new Set();
const patterns = [
  /(?:src|href)=["']([^"']+)["']/gi,
  /url\(\s*["']?([^"')]+)["']?\s*\)/gi,
];

for (const pattern of patterns) {
  for (const match of html.matchAll(pattern)) {
    const reference = match[1].split("?")[0].split("#")[0];
    if (
      reference &&
      !reference.includes("${") &&
      !reference.includes("{{") &&
      !reference.startsWith("data:") &&
      !reference.startsWith("http:") &&
      !reference.startsWith("https:") &&
      !reference.startsWith("mailto:") &&
      !reference.startsWith("tel:") &&
      !reference.startsWith("#")
    ) {
      references.add(reference);
    }
  }
}

for (const reference of references) {
  const assetPath = resolve(root, reference);
  if (!existsSync(assetPath)) errors.push(`Missing asset: ${reference}`);
}

const scriptPattern = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
let scriptIndex = 0;
for (const match of html.matchAll(scriptPattern)) {
  scriptIndex += 1;
  const attributes = match[1];
  const source = match[2];
  if (/\bsrc\s*=/.test(attributes) || /\btype\s*=\s*["'](?:application\/json|importmap)["']/i.test(attributes)) continue;
  try {
    new Function(source);
  } catch (error) {
    errors.push(`Inline script ${scriptIndex} does not parse: ${error.message}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Verified ${references.size} local asset references and ${scriptIndex} inline script blocks.`);
