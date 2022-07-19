import { Component } from "../component";
import { JsonFile } from "../json";
import { Project } from "../project";

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
  /**
   * Defines the version of smithy-build.
   * @default "1.0"
   */
  readonly version?: string;
  
  /**
   * Specifies a location where smithy projections are written.
   * @default - no output directory
   */
  readonly outputDirectory?: string;
  /**
   * Map of projections name to projection configurations
   * https://awslabs.github.io/smithy/1.0/guides/building-models/build-config.html#projections
   * @default - no projections
   */
  readonly projections?: ProjectionsType;
  /**
   * If a plugin can't be found, Smithy will by default fail the build.
   * This setting can be set to true to allow the build to progress
   * even if a plugin can't be found on the classpath.
   *
   * @default - no ignoreMissingPlugins set in the smithy-build.json file
   */
  readonly ignoreMissingPlugins?: boolean;
}

/**
 * Smithy build configuration options
 */
export class SmithyBuild extends Component {
  /**
   * Defines the version of smithy-build.
   * @default "1.0"
   */
  public readonly version: string;

  /**
   * Specifies a location where smithy projections are written.
   * @default - no output directory
   */
  public readonly outputDirectory?: string;

  /**
   * List of imports relative to the location of smithy-build.json file.
   * @default no imports
   */
  private _imports?: string[];

  /**
   * If a plugin can't be found, Smithy will by default fail the build.
   * This setting can be set to true to allow the build to progress
   * even if a plugin can't be found on the classpath.
   *
   * @default - no ignoreMissingPlugins set in the smithy-build.json file
   */
  public readonly ignoreMissingPlugins?: boolean;

  /**
   * Map of projections name to projection configurations
   * https://awslabs.github.io/smithy/1.0/guides/building-models/build-config.html#projections
   * @default - no projections
   */
  private _projections?: ProjectionsType;
  /**
   * Map of plugin name to plugin configurations
   * https://awslabs.github.io/smithy/1.0/guides/building-models/build-config.html#plugins
   * @default - no plugins
   */
  private _plugins?: PluginsType;

  private readonly manifest: any;

  constructor(project: Project, options: SmithyBuildOptions = {}) {
    super(project);

    this.version = options.version ?? "1.0";
    this.outputDirectory = options.outputDirectory;
    this._imports = options.imports;
    this._projections = options.projections;
    this._plugins = options.plugins;
    this.ignoreMissingPlugins = options.ignoreMissingPlugins;

    this.manifest = {
      version: this.version,
      outputDirectory: this.outputDirectory,
      imports: () => this._imports,
      projections: () => this._projections,
      plugins: () => this._plugins,
      ignoreMissingPlugins: this.ignoreMissingPlugins,
    };

    new JsonFile(this.project, "smithy-build.json", {
      obj: this.manifest,
      readonly: true, // we want "yarn add" to work and we have anti-tamper
      newline: false, // when file is edited by npm/yarn it doesn't include a newline
    });
  }

  /**
   * Get configured projections
   */
  public get projections() {
    return this._projections ? { ...this._projections } : undefined;
  }

  /**
   * Get configured imports
   */
  public get imports() {
    return this._imports ? [...this._imports] : undefined;
  }

  /**
   * Get configured plugins
   */
  public get plugins() {
    return this._plugins ? { ...this._plugins } : undefined;
  }

  /**
   * Add a smithy build import
   */
  public addImport(imp: string) {
    this._imports ? this._imports.push(imp) : (this._imports = [`${imp}`]);
  }

  /**
   * Add smithy build projections
   */
  public addProjections(projections: ProjectionsType) {
    for (const [k, v] of Object.entries(projections)) {
      this._projections
        ? (this._projections[k] = v)
        : (this._projections = { [k]: v });
    }
  }

  /**
   * Add smithy build plugins
   */
  public addPlugins(plugins: PluginsType) {
    for (const [k, v] of Object.entries(plugins)) {
      this._plugins ? (this._plugins[k] = v) : (this._plugins = { [k]: v });
    }
  }
}
