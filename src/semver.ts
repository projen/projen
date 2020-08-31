const VALIDATE_SEMVER = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
const ALLOWED_MODES = [ '~', '^' ];

export class Semver {
  /**
   * Latest version.
   */
  public static latest() { return new Semver('*'); }

  /**
   * Accept only an exact version 
   */
  public static pinned(version: string) { return new Semver(version); }

  /**
   * Accept any minor version.
   * 
   * >= version
   * < next major version
   */
  public static caret(version: string) { return new Semver(version, '^'); }

  /**
   * Accept patches.
   * 
   * >= version
   * < next minor version
   */
  public static tilde(version: string) { return new Semver(version, '~'); }

  public readonly spec: string;
  public readonly version: string;
  public readonly mode?: string;

  private constructor(version: string, mode?: string) {
    this.validate(version, mode);
    this.version = version;
    this.mode = mode;
    this.spec = `${mode ?? ''}${version}`;
  }

  private validate(version: string, mode?: string) {
    if (version === '*') {
      return;
    }

    if (!VALIDATE_SEMVER.test(version)) {
      throw new Error(`invalid semver: ${version}`);
    }

    if (mode && !ALLOWED_MODES.includes(mode)) {
      throw new Error(`mode "${mode}" not allowed. allowed modes: ${ALLOWED_MODES.join(',')}`);
    }
  }
}
