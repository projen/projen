// a builtin task that sets the "version" field of the file
// specified in OUTFILE to "0.0.0"

import { existsSync } from "fs";
import { createVersionHandler } from "./version-handlers";

const outfile = process.env.OUTFILE;
if (!outfile) {
  throw new Error("OUTFILE is required");
}

if (!existsSync(outfile)) {
  process.exit(0); // nothing to do
}

const handler = createVersionHandler(outfile!);
handler.writeVersion("0.0.0");
