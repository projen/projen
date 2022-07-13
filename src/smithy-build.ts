import { Component } from "./component";
import { JsonFile } from "./json";
import { Project } from "./project";

type Transform = {
  name: string;
  args: Record<string, any>;
};
type SmithyCommon = {
  imports?: string[];
  plugins?: PluginsType;
};
type PluginValue = {
  service?: string;
  [key: string]: any;
};
export type ProjectionValue = SmithyCommon & {
  abstract?: boolean;
  transforms?: Transform[];
};
export type ProjectionKey = string;
export type ProjectionsType = Record<ProjectionKey, ProjectionValue>;
export type PluginKey = string;
export type PluginsType = Record<PluginKey, PluginValue>;

/**
 * Options for `SmithyBuild`
 */
export interface SmithyBuildOptions extends SmithyCommon {
  readonly version?: string;

  readonly outputDirectory?: string;

  readonly projections?: ProjectionsType;

  readonly ignoreMissingPlugins?: boolean;
}

export class SmithyBuild extends Component {
  public readonly version: string;

  public readonly outputDirectory?: string;

  public imports?: string[];

  public readonly ignoreMissingPlugins?: boolean;

  public readonly manifest: any;

  public projections?: ProjectionsType;
  public plugins?: PluginsType;

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
      imports: () => this.imports,
      projections: () => this.projections,
      plugins: () => this.plugins,
      ignoreMissingPlugins: this.ignoreMissingPlugins,
    };

    new JsonFile(this.project, "smithy-build.json", {
      obj: this.manifest,
      readonly: true, // we want "yarn add" to work and we have anti-tamper
      newline: false, // when file is edited by npm/yarn it doesn't include a newline
    });
  }

  public addImport(imp: string) {
    this.imports ? this.imports.push(imp) : (this.imports = [`${imp}`]);
  }

  public addProjections(projections: ProjectionsType) {
    for (const [k, v] of Object.entries(projections)) {
      this.projections
        ? (this.projections[k] = v)
        : (this.projections = { [k]: v });
    }
  }

  public addPlugins(plugins: PluginsType) {
    for (const [k, v] of Object.entries(plugins)) {
      this.plugins ? (this.plugins[k] = v) : (this.plugins = { [k]: v });
    }
  }
}
