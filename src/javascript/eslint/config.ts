import { ConfigWithExtends } from "./config-object";
import { Project } from "../../project";
import { ModuleImports } from "../private/modules";
import { IResolvable } from "../../file";
import { Code } from "../../_private/code";

/**
 * A Configuration for ESLint.
 */
export interface IESLintConfig extends IResolvable {
  readonly imports?: ModuleImports;

  /**
   * Resolves to an array of configuration objects.
   */
  toJSON(): ConfigWithExtends[];
}

export class ESLintConfig implements IESLintConfig {
  /**
   * List of files or glob patterns matching files to globally ignore.
   */
  public static files(patterns: string[]): ESLintConfig {
    return new ESLintConfig({
      files: patterns,
    });
  }

  /**
   * The list of files or glob patterns matching files to ignore.
   */
  public static ignores(patterns: string[]): ESLintConfig {
    const imports = new ModuleImports();
    imports.from("eslint/config", "globalIgnores");

    return new ESLintConfig(
      Code.literal(`globalIgnores(${JSON.stringify(patterns)})`) as any,
      imports
    );
  }

  /**
   * Use the ignore file in the list of ignored files.
   */
  public static useIgnoreFile(): ESLintConfig {
    const imports = new ModuleImports();
    imports.from("eslint/config", "globalIgnores");
    imports.from("@eslint/compat", "convertIgnorePatternToMinimatch");

    return new ESLintConfig(
      ((project: Project) =>
         Code.literal(`globalIgnores(${JSON.stringify(
          project.gitignore.patterns
        )}.map(convertIgnorePatternToMinimatch), "Imported .gitignore patterns")`)) as any,
      imports
    );
  }

  /**
   * Automatically ignore all generated files.
   *
   * This prevents ESLint from trying to format or lint files that are marked as generated,
   * which would fail since generated files are typically read-only.
   */
  public static ignoreGenerated(): ESLintConfig {
    const imports = new ModuleImports();
    imports.from("eslint/config", "globalIgnores");

    return new ESLintConfig(
      ((project: Project) =>
        Code.literal(`globalIgnores(${JSON.stringify(
          project.files
            .filter((file) => file.readonly && file.marker)
            .map((file) => file.path)
        )}, "Ignore projen generated files")`)) as any,
      imports
    );
  }

  /**
   *
   */
  public readonly imports: ModuleImports | undefined;

  private readonly _config: ConfigWithExtends;

  public constructor(config: ConfigWithExtends, imports?: ModuleImports) {
    this._config = config;
    this.imports = imports;
  }

  public toJSON() {
    return [this._config];
  }
}
