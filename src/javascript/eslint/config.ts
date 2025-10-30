import { ConfigWithExtends } from "./config-object";
import { Project } from "../../project";
import { from, js } from "../private/code-template";

export class ESLintConfig {
  /**
   * List of files or glob patterns matching files to globally ignore.
   */
  public static files(patterns: string[]): ConfigWithExtends {
    return {
      files: patterns,
    };
  }

  /**
   * The list of files or glob patterns matching files to ignore.
   */
  public static ignores(patterns: string[]): ConfigWithExtends {
    const globalIgnores = from("eslint/config").globalIgnores;
    const template = js`${globalIgnores}(${JSON.stringify(patterns)})`;
    
    return template as any;
  }

  /**
   * Use the ignore file in the list of ignored files.
   */
  public static useIgnoreFile(): ConfigWithExtends {
    const globalIgnores = from("eslint/config").globalIgnores;
    const convertIgnorePatternToMinimatch = from("@eslint/compat").convertIgnorePatternToMinimatch;

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
  public static ignoreGenerated(): ConfigWithExtends {
    const globalIgnores = from("eslint/config").globalIgnores;

    return ((project: Project) => {
      const patterns = JSON.stringify(
        project.files
          .filter((file) => file.readonly && file.marker)
          .map((file) => file.path)
      );
      return js`${globalIgnores}(${patterns}, "Ignore projen generated files")`;
    }) as any;
  }
}
