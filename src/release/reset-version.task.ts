// a builtin task that sets the "version" field of the file
// specified in OUTFILE to "0.0.0"

import { existsSync, readFileSync, writeFileSync } from "fs";

const outfile = process.env.OUTFILE;
if (!outfile) {
  throw new Error("OUTFILE is required");
}

if (!existsSync(outfile)) {
  process.exit(0); // nothing to do
}

const content = JSON.parse(readFileSync(outfile, "utf8"));
content.version = "0.0.0";
writeFileSync(outfile, JSON.stringify(content, undefined, 2) + "\n");
