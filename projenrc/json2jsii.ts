import { readFileSync } from "node:fs";
import { TypeGenerator } from "json2jsii";
import { FileBaseOptions, IResolver, Project, TextFile } from "../src";
import { Biome, Eslint } from "../src/javascript";

export interface JsiiFromJsonSchemaProps extends FileBaseOptions {
  /**
   * The path to the json schema file.
   */
  readonly schemaPath: string;
  /**
   * The path to the generated file.
   */
  readonly filePath: string;
}

/**
 * A component that generates a jsii compatible typescript file
 * from a json schema using json2jsii.
 */
export class JsiiFromJsonSchema extends TextFile {
  private readonly generator: TypeGenerator;

  constructor(project: Project, options: JsiiFromJsonSchemaProps) {
    super(project, options.filePath, {
      committed: true,
      marker: true,
      readonly: true,
    });

    // Load and parse the JSON schema file
    const schemaContent = readFileSync(options.schemaPath, "utf-8");
    const schema = JSON.parse(schemaContent);

    this.generator = TypeGenerator.forStruct("BiomeConfiguration", schema, {
      toJson: true,
      toJsonInternal: true,
      transformations: {
        hoistSingletonUnions: true,
        convertNullUnionsToOptional: true,
        simplifyElementArrayUnions: true,
      },
    });

    Eslint.of(project)?.addIgnorePattern(this.path);
    Biome.of(project)?.addFilePattern(`!${this.path}`);
  }

  protected synthesizeContent(_: IResolver): string | undefined {
    return [
      ...(this.marker ? [`// ${this.marker}`] : []),
      this.generator.render(),
    ].join("\n");
  }
}
