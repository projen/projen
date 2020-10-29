import * as semver from 'semver';

/**
 * @deprecated This class will be removed in upcoming releases. if you wish to
 * specify semver requirements in `deps`, `devDeps`, etc, specify them like so
 * `express@^2.1`.
 */
export class Semver {

  public static of(spec: string) { return new Semver(spec); }

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
  public static caret(version: string) { return new Semver(`^${version}`); }

  /**
   * Accept patches.
   *
   * >= version
   * < next minor version
   */
  public static tilde(version: string) { return new Semver(`~${version}`); }

  public readonly mode?: string;

  private constructor(public readonly spec: string) {

  }

  public get version() {
    return semver.minVersion(this.spec)?.version;
  }
}
