import * as fs from "node:fs";
import * as path from "node:path";
import type { IConstruct } from "constructs";
import { Component } from "../component";
import { JsonFile } from "../json";

/**
 * Common options for `cdktf.json`.
 */
export interface CdktnConfigCommonOptions {
  /**
   * Terraform providers to build.
   *
   * @default []
   */
  readonly terraformProviders?: string[];

  /**
   * Terraform modules to build.
   *
   * @default []
   */
  readonly terraformModules?: string[];

  /**
   * Additional context to include in `cdktf.json`.
   *
   * @default - no additional context
   */
  readonly context?: { [key: string]: any };

  /**
   * CDKTN output directory.
   *
   * @default "cdktf.out"
   */
  readonly cdktnOut?: string;

  /**
   * CDK project identifier
   *
   * @default - Automatically generated
   */
  readonly projectId?: string;

  /**
   * Whether report crashing to a remote server
   *
   * @default true
   */
  readonly sendCrashReports?: boolean;
}

/**
 * Options for `CdktnConfig`.
 */
export interface CdktnConfigOptions extends CdktnConfigCommonOptions {
  /**
   * The command line to execute in order to synthesize the CDKTN application
   * (language specific).
   */
  readonly app: string;

  /**
   * The programming language used in the CDKTN app.
   *
   * @default "typescript"
   */
  readonly language?: string;
}

/**
 * Represents cdktf.json file.
 *
 * CDKTN (CDK Terrain) continues to use the `cdktf.json` filename for
 * backwards compatibility with its CDKTF origins.
 */
export class CdktnConfig extends Component {
  /**
   * Represents the JSON file.
   */
  public readonly file: JsonFile;

  /**
   * Name of the cdktn.out directory.
   */
  public readonly cdktnOut: string;

  /**
   * List of Terraform providers to build.
   */
  private readonly _terraformProviders: string[];

  /**
   * List of Terraform modules to build.
   */
  private readonly _terraformModules: string[];

  constructor(scope: IConstruct, options: CdktnConfigOptions) {
    super(scope);

    this.cdktnOut = options.cdktnOut ?? "cdktf.out";
    this._terraformProviders = options.terraformProviders ?? [];
    this._terraformModules = options.terraformModules ?? [];

    this.file = new JsonFile(this.project, "cdktf.json", {
      omitEmpty: true,
      // `cdktn get` and `cdktn provider add` write generated provider/module
      // entries back into this file, so it can't be read-only.
      readonly: false,
      obj: {
        language: options.language ?? "typescript",
        app: options.app,
        output: this.cdktnOut,
        terraformProviders: () => this.resolveTerraformProviders(),
        terraformModules: () => this.resolveTerraformModules(),
        context: options.context,
        projectId: options.projectId,
        sendCrashReports: options.sendCrashReports,
      },
    });

    this.project.gitignore.exclude(`/${this.cdktnOut}/`);
    this.project.gitignore.exclude(".gen/");
  }

  /**
   * Add Terraform providers to `cdktf.json`.
   * @param providers The providers to add.
   */
  public addTerraformProviders(...providers: string[]) {
    this._terraformProviders.push(...providers);
  }

  /**
   * Add Terraform modules to `cdktf.json`.
   * @param modules The modules to add.
   */
  public addTerraformModules(...modules: string[]) {
    this._terraformModules.push(...modules);
  }

  /**
   * Reads the existing `cdktf.json` from disk and merges projen-managed
   * providers with any that were added externally (e.g. via `cdktn provider add`).
   */
  private resolveTerraformProviders(): string[] {
    const existing = this.readExistingConfig();
    return this.mergeEntries(
      existing?.terraformProviders,
      this._terraformProviders,
    );
  }

  /**
   * Reads the existing `cdktf.json` from disk and merges projen-managed
   * modules with any that were added externally (e.g. via `cdktn get`).
   */
  private resolveTerraformModules(): string[] {
    const existing = this.readExistingConfig();
    return this.mergeEntries(
      existing?.terraformModules,
      this._terraformModules,
    );
  }

  /**
   * Merge entries from the existing file with projen-managed entries,
   * deduplicating by value.
   */
  private mergeEntries(
    existing: string[] | undefined,
    managed: string[],
  ): string[] {
    if (!existing || existing.length === 0) {
      return managed;
    }
    const merged = [...managed];
    for (const entry of existing) {
      if (!merged.includes(entry)) {
        merged.push(entry);
      }
    }
    return merged;
  }

  /**
   * Read the existing cdktf.json file from disk (if it exists).
   */
  private readExistingConfig(): any | undefined {
    const filePath = path.join(this.project.outdir, "cdktf.json");
    if (!fs.existsSync(filePath)) {
      return undefined;
    }
    try {
      return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } catch {
      return undefined;
    }
  }
}
