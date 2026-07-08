#!/usr/bin/env node
/**
 * Downloads a JSON schema from a URL and writes it to a local file.
 *
 * Used by the "upgrade-bundled" task to refresh vendored JSON schemas
 * (e.g. schemas/pyproject.json, schemas/uv.json) that are not published
 * as npm packages and therefore can't be upgraded via a dependency bump.
 *
 * Usage: node scripts/update-schema.js <url> <destPath>
 */
const { writeFileSync } = require("node:fs");

async function main() {
  const [url, destPath] = process.argv.slice(2);
  if (!url || !destPath) {
    console.error("Usage: node scripts/update-schema.js <url> <destPath>");
    process.exit(1);
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to download schema from ${url}: ${response.status} ${response.statusText}`,
    );
  }

  const text = await response.text();
  // Validate that the response is valid JSON before overwriting the cached file.
  const parsed = JSON.parse(text);

  writeFileSync(destPath, `${JSON.stringify(parsed, null, 2)}\n`);
  console.log(`Updated ${destPath} from ${url}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
