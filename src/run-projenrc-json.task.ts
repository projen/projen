/**
 * Parses a projenrc.json file, uses it to generate a corresponding
 * projenrc.js file, and then run it to synthesize its contents.
 *
 * Environment variables:
 *
 * - PROJENRC_FILE: (optional) the name of the JSON file to parse from.
 *   Defaults to `.projenrc.json`.
 */
import * as fs from "fs";
import { InitProjectOptionHints } from "./option-hints";
import { Projects } from "./projects";

let filename = process.env.PROJENRC_FILE;

if (!filename || filename == "") {
  filename = ".projenrc.json";
}

const { type, ...json } = JSON.parse(fs.readFileSync(filename, "utf8"));
if (!type) {
  throw new Error(
    'projenrc.json requires a "type" field with the fully qualified type name. e.g. projen.web.ReactProject'
  );
}

Projects.createProject({
  dir: ".",
  projectFqn: type,
  projectOptions: json,
  optionHints: InitProjectOptionHints.NONE,
  synth: true,
  post: false,
});
