import { Component } from "../component";
import { JsonFile } from "../json";
import { Project } from "../project";

export type ProjectionsType = Record<string, Record<string, any>>;
export type PluginsType = Record<string, Record<string, any>>;

export interface SmithyBuildOptions {
  readonly version?: string;

  readonly outputDirectory?: string;

  readonly imports?: string[];

  readonly projections?: ProjectionsType;

  readonly plugins?: PluginsType;

  readonly ignoreMissingPlugins?: boolean;
}

export class SmithyBuild extends Component {
  public readonly version: string;

  public readonly outputDirectory?: string;

  public readonly imports?: string[];

  public readonly projections?: ProjectionsType;

  public readonly plugins?: PluginsType;

  public readonly ignoreMissingPlugins?: boolean;

  public readonly manifest: any;

  // private readonly keywords: Set<string> = new Set();
  // private readonly bin: Record<string, string> = {};
  // private readonly engines: Record<string, string> = {};
  // private readonly peerDependencyOptions: PeerDependencyOptions;
  private readonly file: JsonFile;
  // private _renderedDeps?: NpmDependencies;

  constructor(project: Project, options: SmithyBuildOptions = {}) {
    super(project);

    this.version = options.version ?? "1.0";
    this.outputDirectory = options.outputDirectory;
    this.imports = options.imports;
    this.projections = options.projections;
    this.plugins = options.plugins;
    this.ignoreMissingPlugins = options.ignoreMissingPlugins;

    this.manifest = {
      version: this.version,
      outputDirectory: this.outputDirectory,
      imports: this.imports,
      projections: this.projections,
      plugins: this.plugins,
      ignoreMissingPlugins: this.ignoreMissingPlugins,
    };

    this.file = new JsonFile(this.project, "smithy-build.json", {
      obj: this.manifest,
      readonly: false, // we want "yarn add" to work and we have anti-tamper
      newline: false, // when file is edited by npm/yarn it doesn't include a newline
    });

    console.log(this.file);
  }
}
