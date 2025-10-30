export class ModuleType {
  /**
   * CommonJS module.
   */
  public static readonly COMMON_JS = new ModuleType("commonjs");
  /**
   * EcmaScript Module.
   */
  public static readonly ESM = new ModuleType("module");

  private type: "commonjs" | "module";

  private constructor(type: "commonjs" | "module") {
    this.type = type;
  }

  /**
   * Returns the explicit file extension for the module type.
   *
   * @internal
   */
  public get _ext(): string {
    return this.type === "commonjs" ? "cjs" : "mjs";
  }

  /**
   * Returns a given file name with the correct extension for the module type.
   *
   * Replaces an existing extension or adds the extension if no extension exists.
   *
   * @internal
   */
  public _fileWithExt(file: string): string {
    const pos = file.lastIndexOf(".");
    return `${file.substring(0, pos < 0 ? file.length : pos)}.${this._ext}`;
  }

  /**
   * Returns whether the module type is ESM.
   *
   * @internal
   */
  public _isEsm(): boolean {
    return this.type === "module";
  }

  /**
   * Returns whether the module type is CommonJS.
   *
   * @internal
   */
  public _isCommonJs(): boolean {
    return this.type === "commonjs";
  }
}
