import * as path from "path";

/**
 * A local Maven repository for the prebuilt projen artifacts.
 *
 * `dist/java` is already a Maven repository layout, so we reference it directly
 * via a `file://` `<repository>` URL rather than `mvn install:install-file`.
 * projen resolves from here; transitive deps resolve from Maven Central.
 */
export class MavenRepo {
  constructor(private readonly repoDir: string) {}

  /** A `file://` URL suitable for a Maven `<repository>`. */
  public get url(): string {
    let p = path.resolve(this.repoDir).replace(/\\/g, "/");
    if (!p.startsWith("/")) {
      p = `/${p}`; // Windows drive letters -> file:///C:/...
    }
    return `file://${p}`;
  }
}
