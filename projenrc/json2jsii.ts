import { readFileSync } from "node:fs";
import { TypeGenerator } from "json2jsii";
import { FileBaseOptions, IResolver, Project, TextFile } from "../src";
import { Biome, Eslint, Jest } from "../src/javascript";

export interface JsiiFromJsonSchemaProps extends FileBaseOptions {
  /**
   * The name of the JSII struct (TypeScript interface) that is created.
   */
  readonly structName: string;
  /**
   * The path to the json schema file.
   */
  readonly schemaPath: string;
  /**
   * The path to the generated file.
   */
  readonly filePath: string;

  /**
   * The path to the generated file.
   */
  readonly transform?: (schema: any) => any;
}

/**
 * A component that generates a jsii compatible typescript file
 * from a json schema using json2jsii.
 */
export class JsiiFromJsonSchema extends TextFile {
  private readonly generator: TypeGenerator;

  constructor(project: Project, props: JsiiFromJsonSchemaProps) {
    super(project, props.filePath, {
      committed: true,
      marker: true,
      readonly: true,
    });

    // Load and parse the JSON schema file
    const schemaContent = readFileSync(props.schemaPath, "utf-8");
    const schema = JSON.parse(schemaContent);
    const transform = props.transform ?? ((s) => s);

    this.generator = TypeGenerator.forStruct(
      props.structName,
      transform(schema),
      {
        toJson: true,
        toJsonInternal: true,
        transformations: {
          convertConstToEnum: true,
          hoistSingletonUnions: true,
          convertNullUnionsToOptional: true,
          simplifyElementArrayUnions: true,
        },
      }
    );

    Eslint.of(project)?.addIgnorePattern(this.path);
    Biome.of(project)?.addFilePattern(`!${this.path}`);
    Jest.of(project)?.addIgnorePattern(this.path);
  }

  protected synthesizeContent(_: IResolver): string | undefined {
    return [
      ...(this.marker ? [`// ${this.marker}`] : []),
      this.generator.render(),
    ].join("\n");
  }
}
