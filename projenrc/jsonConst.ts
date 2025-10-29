import { readFileSync } from "node:fs";
import { basename } from "node:path";
import { FileBaseOptions, Project, TextFile } from "../src";
import { Biome, Eslint, Jest } from "../src/javascript";

export interface JsonConstOptions extends FileBaseOptions {
  /**
   * The path to the json file.
   */
  readonly jsonPath: string;
  /**
   * The path to the generated file.
   */
  readonly filePath: string;
  /**
   * A comment describing the contents
   * @default - the file name
   */
  readonly comment?: string;
}

/**
 * A component that generates a typescript file exporting a constant json value.
 */
export class JsonConst extends TextFile {
  constructor(project: Project, options: JsonConstOptions) {
    super(project, options.filePath, {
      committed: true,
      marker: true,
      readonly: true,
    });

    // Load and parse the JSON schema file
    const fileContent = readFileSync(options.jsonPath, "utf-8");
    const data = JSON.parse(fileContent);

    Eslint.of(project)?.addIgnorePattern(this.path);
    Biome.of(project)?.addFilePattern(`!${this.path}`);
    Jest.of(project)?.addIgnorePattern(this.path);

    const comment = options.comment ?? basename(options.jsonPath);
    if (this.marker) {
      this.addLine(`// ${this.marker}\n`);
    }
    this.addLine(`/**\n${comment.split("\n").map((l) => ` * ${l}`)}\n */`);
    this.addLine("export default " + JSON.stringify(data, null, 2) + ";");
  }
}
