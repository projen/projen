import { IConstruct } from "constructs";
import * as YAML from "yaml";
import { IResolver } from "./file";
import { ObjectFile, ObjectFileOptions } from "./object-file";

/**
 * Options for `YamlFile`.
 */
export interface YamlFileOptions extends ObjectFileOptions {
  /**
   * Maximum line width (set to 0 to disable folding).
   *
   * @default - 0
   */
  readonly lineWidth?: number;
  /**
   * Search value for `String.replace()` on the resulting YAML.
   * Will be converted to a regex with the `g` flag.
   */
  readonly searchValue?: string;
  /**
   * Replace value for `String.replace()` on the resulting YAML.
   */
  readonly replaceValue?: string;
}

/**
 * Represents a YAML file.
 */
export class YamlFile extends ObjectFile {
  /**
   * Maximum line width (set to 0 to disable folding).
   */
  public lineWidth: number;

  constructor(scope: IConstruct, filePath: string, options: YamlFileOptions) {
    super(scope, filePath, options);
    this.lineWidth = options.lineWidth ?? 0;
  }

  protected synthesizeContent(resolver: IResolver): string | undefined {
    const yamlResolver: IResolver = {
      resolve(value, options?): any {
        return resolver.resolve(value, {
          ...options,
          keepObjects: true,
        });
      },
    };
    return super.synthesizeContent(yamlResolver);
  }

  protected stringifyContent(obj: object | undefined): string | undefined {
    let yaml = YAML.stringify(obj, {
      indent: 2,
      lineWidth: this.lineWidth,
      customTags: [referenceTag],
    });

    return [...(this.marker ? [`# ${this.marker}`] : []), "", yaml].join("\n");
  }
}

const referenceTag: YAML.CollectionTag = {
  tag: "!reference",
  collection: "seq",
  identify: (v) => typeof v == "object" && v?.constructor.name == "Reference",
  createNode(schema, v: any, _ctx) {
    const ref = new YAML.YAMLSeq(schema);
    if (typeof v == "object" && v?.constructor.name == "Reference") {
      ref.items.push(...v.seq);
    }
    ref.flow = true;
    return ref;
  },
};
