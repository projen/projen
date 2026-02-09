import { ConfigWithExtends } from "./config-object";
import { IResolvable } from "../../file";
import { Project } from "../../project";
import { from, js } from "../private/code-template";

export interface IESLintConfig {}

export class ESLintConfig implements IESLintConfig, IResolvable {
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
  public static ignores(patterns: string[]): IESLintConfig {
    const globalIgnores = from("eslint/config").globalIgnores;
    const template = js`${globalIgnores}(${JSON.stringify(patterns)})`;

    return template as any;
  }

  /**
   * Use the ignore file in the list of ignored files.
   */
  public static useIgnoreFile(): IESLintConfig {
    const globalIgnores = from("eslint/config").globalIgnores;
    const convertIgnorePatternToMinimatch =
      from("@eslint/compat").convertIgnorePatternToMinimatch;

    return ((project: Project) => {
      const patterns = JSON.stringify(project.gitignore.patterns);
      return js`${globalIgnores}(${patterns}.map(${convertIgnorePatternToMinimatch}), "Imported .gitignore patterns")`;
    }) as any;
  }

  /**
   * Automatically ignore all generated files.
   *
   * This prevents ESLint from trying to format or lint files that are marked as generated,
   * which would fail since generated files are typically read-only.
   */
  public static ignoreGenerated(): IESLintConfig {
    const globalIgnores = from("eslint/config").globalIgnores;

    return ((project: Project) => {
      const patterns = JSON.stringify(
        project.files
          .filter((file) => file.readonly && file.marker)
          .map((file) => file.path),
      );
      return js`${globalIgnores}(${patterns}, "Ignore projen generated files")`;
    }) as any;
  }

  public constructor(private readonly config: ConfigWithExtends) {}

  public toJSON(): any {
    return this.config;
  }
}
