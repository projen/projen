/**
 * The prebuilt projen Go module.
 *
 * Consumed via a `go.mod` `replace` directive pointing at `dist/go/projen`, so
 * `github.com/projen/projen-go/projen` resolves to the local build. Transitive
 * deps (e.g. jsii-runtime-go) resolve through the normal Go proxy.
 */
export class GoModule {
  /** The import path published by projen's Go target. */
  public static readonly IMPORT_PATH = "github.com/projen/projen-go/projen";

  constructor(public readonly moduleDir: string) {}

  /** The `old=new` argument for `go mod edit -replace`. */
  public get replaceDirective(): string {
    return `${GoModule.IMPORT_PATH}=${this.moduleDir}`;
  }
}
