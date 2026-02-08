import { VsCode } from "./vscode";
import { Component } from "../component";
import { JsonFile } from "../json";

/**
 * VS Code Workspace settings
 * Source: https://code.visualstudio.com/docs/getstarted/settings#_workspace-settings
 */
export class VsCodeSettings extends Component {
  private readonly content: any;
  public readonly file: JsonFile;

  constructor(vscode: VsCode) {
    super(vscode.project);

    this.content = {};

    this.file = new JsonFile(vscode.project, ".vscode/settings.json", {
      omitEmpty: false,
      obj: this.content,
    });
  }

  /**
   * Adds a workspace setting
   *
   * @param setting The setting ID
   * @param value The value of the setting
   * @param language Scope the setting to a specific language
   */
  public addSetting(setting: string, value: unknown, language?: string) {
    if (language) {
      this.content[`[${language}]`] = this.content[`[${language}]`] ?? {};
      this.content[`[${language}]`][setting] = value;
    } else {
      this.content[setting] = value;
    }
  }

  /**
   * Adds a workspace setting
   *
   * @param settings Array structure: [setting: string, value: any, languages?: string[]]
   */
  public addSettings(
    settings: Record<string, unknown>,
    languages?: string | string[],
  ) {
    if (Array.isArray(languages)) {
      languages.forEach((language) => {
        Object.entries(settings).forEach(([setting, value]) =>
          this.addSetting(setting, value, language),
        );
      });
    } else {
      Object.entries(settings).forEach(([setting, value]) =>
        this.addSetting(setting, value, languages),
      );
    }
  }
}
