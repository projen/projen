import { ConfigWithExtends } from "./config-object";
import { Project } from "../../project";
import { ModuleImports } from "../private/modules";
import { IResolvable } from "../../file";
import { from, js } from "../private/code-template";

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
    const globalIgnores = from("eslint/config").globalIgnores;
    const template = js`${globalIgnores}(${JSON.stringify(patterns)})`;
    
    return new ESLintConfig(template as any);
  }

  /**
   * Use the ignore file in the list of ignored files.
   */
  public static useIgnoreFile(): ESLintConfig {
    const globalIgnores = from("eslint/config").globalIgnores;
    const convertIgnorePatternToMinimatch = from("@eslint/compat").convertIgnorePatternToMinimatch;

    return new ESLintConfig(
      ((project: Project) => {
        const patterns = JSON.stringify(project.gitignore.patterns);
        return js`${globalIgnores}(${patterns}.map(${convertIgnorePatternToMinimatch}), "Imported .gitignore patterns")`;
      }) as any
    );
  }

  /**
   * Automatically ignore all generated files.
   *
   * This prevents ESLint from trying to format or lint files that are marked as generated,
   * which would fail since generated files are typically read-only.
   */
  public static ignoreGenerated(): ESLintConfig {
    const globalIgnores = from("eslint/config").globalIgnores;

    return new ESLintConfig(
      ((project: Project) => {
        const patterns = JSON.stringify(
          project.files
            .filter((file) => file.readonly && file.marker)
            .map((file) => file.path)
        );
        return js`${globalIgnores}(${patterns}, "Ignore projen generated files")`;
      }) as any
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
