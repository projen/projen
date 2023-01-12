import { IPackageProvider } from "./python-deps";
import { Dependencies, DependencyCoordinates } from "../dependencies";
import { FileBase, IResolver } from "../file";
import { Project } from "../project";
import { toPythonVersionRange } from "../util/semver";

export interface RequirementsFileOptions {
  /**
   * Provide a list of packages that can be dynamically updated.
   */
  readonly packageProvider?: IPackageProvider;
}

/**
 * Specifies a list of packages to be installed using pip.
 *
 * @see https://pip.pypa.io/en/stable/reference/pip_install/#requirements-file-format
 */
export class RequirementsFile extends FileBase {
  private readonly packages = new Array<string>();
  private readonly packageProvider?: IPackageProvider;

  constructor(
    project: Project,
    filePath: string,
    options: RequirementsFileOptions
  ) {
    super(project, filePath);

    this.packageProvider = options.packageProvider;
  }

  /**
   * Adds the specified packages provided in semver format.
   *
   * Comment lines (start with `#`) are ignored.
   *
   * @param packages Package version in format `<module>@<semver>`
   */
  public addPackages(...packages: string[]) {
    for (let pkg of packages) {
      if (pkg.startsWith("#")) {
        this.packages.push(pkg);
      } else {
        const { name, version } = Dependencies.parseDependency(pkg);
        if (version) {
          this.packages.push(`${name}${toPythonVersionRange(version)}`);
        } else {
          this.packages.push(name);
        }
      }
    }
  }

  private formatDependency(dep: DependencyCoordinates) {
    if (dep.version) {
      return `${dep.name}${toPythonVersionRange(dep.version)}`;
    } else {
      return dep.name;
    }
  }

  protected synthesizeContent(resolver: IResolver): string | undefined {
    const allPackages = [...this.packages];
    if (this.packageProvider) {
      allPackages.push(
        ...this.packageProvider.packages.map((dep) =>
          this.formatDependency(dep)
        )
      );
    }

    return `${resolver
      .resolve([...(this.marker ? [`# ${this.marker}`] : []), ...allPackages])
      .join("\n")}\n`;
  }
}
