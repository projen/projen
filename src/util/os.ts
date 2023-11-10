/**
 * Provides information about the current operating system.
 */
export class OsInspector {
  /**
   * Whether the current OS is AIX.
   */
  public readonly isAix: boolean;

  /**
   * Whether the current OS is FreeBSD.
   */
  public readonly isFreebsd: boolean;

  /**
   * Whether the current OS is Linux.
   */
  public readonly isLinux: boolean;

  /**
   * Whether the current OS is MacOS.
   */
  public readonly isMacos: boolean;

  /**
   * Whether the current OS is OpenBSD.
   */
  public readonly isOpenbsd: boolean;

  /**
   * Whether the current OS is SunOS.
   */
  public readonly isSunos: boolean;

  /**
   * Whether the current OS is Windows.
   */
  public readonly isWindows: boolean;

  /**
   * Contains a list of file extensions that the current Windows installation considers to be executable files
   */
  private _pathExt?: Set<string>;

  constructor() {
    this.isAix = process.platform === "aix";
    this.isWindows = process.platform === "win32";
    this.isMacos = process.platform === "darwin";
    this.isFreebsd = process.platform === "freebsd";
    this.isLinux = process.platform === "linux";
    this.isOpenbsd = process.platform === "openbsd";
    this.isSunos = process.platform === "sunos";
  }

  public get pathExt(): Set<string> {
    if (!this.isWindows) {
      throw new Error("pathExt is only available on Windows");
    }

    if (!this._pathExt) {
      this._pathExt = new Set(
        process.env.PATHEXT?.split(";").map((extension) =>
          extension.toLowerCase()
        )
      );
    }

    return this._pathExt;
  }
}
