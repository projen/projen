import { VsCode } from "./vscode";
import { Component } from "../component";
import { JsonFile } from "../json";
import { deepMerge, isObject } from "../util";

/**
 * VS Code Workspace settings
 * Source: https://code.visualstudio.com/docs/getstarted/settings#_workspace-settings
 */
export class VsCodeSettings extends Component {
  private readonly content: any;

  constructor(vscode: VsCode) {
    super(vscode.project);

    this.content = {};

    new JsonFile(vscode.project, ".vscode/settings.json", {
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
   * @param [extend] Extend an existing setting if exists, override completely if false (default: false)
   */
  public addSetting(
    setting: string,
    value: unknown,
    language?: string,
    extend = false
  ) {
    let root;
    if (language) {
      this.content[`[${language}]`] ??= {};
      root = this.content[`[${language}]`];
    } else {
      root = this.content;
    }
    if (extend && root[setting]) {
      if (Array.isArray(root[setting]) && Array.isArray(value)) {
        root[setting] = [...new Set([...root[setting], ...value])];
        return;
      } else if (isObject(root[setting]) && isObject(value)) {
        deepMerge([root[setting], value], true);
        return;
      }
    }
    root[setting] = value;
  }

  /**
   * Adds a workspace setting
   *
   * @param settings Array structure: [setting: string, value: any, languages?: string[]]
   */
  public addSettings(
    settings: Record<string, unknown>,
    languages?: string | string[],
    extend = false
  ) {
    if (Array.isArray(languages)) {
      languages.forEach((language) => {
        Object.entries(settings).forEach(([setting, value]) =>
          this.addSetting(setting, value, language, extend)
        );
      });
    } else {
      Object.entries(settings).forEach(([setting, value]) =>
        this.addSetting(setting, value, languages, extend)
      );
    }
  }
}
