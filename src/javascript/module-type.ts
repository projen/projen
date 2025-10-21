export class ModuleType {
  public static COMMON_JS = new ModuleType("commonjs");
  public static ESM = new ModuleType("module");

  private type: "commonjs" | "module";

  private constructor(type: "commonjs" | "module") {
    this.type = type;
  }

  /**
   * Returns the explicit file extension for the module type.
   *
   * @internal
   */
  public get ext(): string {
    return this.type === "commonjs" ? "cjs" : "mjs";
  }

  /**
   * Returns a given file name with the correct extension for the module type.
   *
   * Replaces an existing extension or adds the extension if no extension exists.
   *
   * @internal
   */
  public fileWithExt(file: string): string {
    const pos = file.lastIndexOf(".");
    return `${file.substring(0, pos < 0 ? file.length : pos)}.${this.ext}`;
  }

  /**
   * Returns whether the module type is ESM.
   *
   * @internal
   */
  public isEsm(): boolean {
    return this.type === "module";
  }

  /**
   * Returns whether the module type is CommonJS.
   *
   * @internal
   */
  public isCommonJs(): boolean {
    return this.type === "commonjs";
  }
}
