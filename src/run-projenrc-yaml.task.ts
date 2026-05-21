/**
 * Parses a projenrc.yaml file and uses it to synthesize project contents.
 *
 * Environment variables:
 *
 * - PROJENRC_FILE: (optional) the name of the YAML file to parse from.
 *   Defaults to `.projenrc.yaml`.
 */
import * as fs from "fs";
import * as YAML from "yaml";
import { InitProjectOptionHints } from "./option-hints";
import { Projects } from "./projects";

let filename = process.env.PROJENRC_FILE;

if (!filename || filename == "") {
  filename = ".projenrc.yaml";
}

const { type, ...rest } = YAML.parse(fs.readFileSync(filename, "utf8"));
if (!type) {
  throw new Error(
    'projenrc.yaml requires a "type" field with the fully qualified type name. e.g. projen.web.ReactProject',
  );
}

Projects.createProject({
  dir: ".",
  projectFqn: type,
  projectOptions: rest,
  optionHints: InitProjectOptionHints.NONE,
  synth: true,
  post: false,
});
