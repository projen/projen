import { EOL } from 'os';
import { Dependencies } from '../deps';
import { FileBase, IResolver } from '../file';
import { Project } from '../project';
import { toPythonVersionRange } from '../util/semver';

export interface RequirementsFileOptions {
  /**
   * Accepts a function that resolves to an list of packages that should get included.
   * @internal
   */
  readonly lazyPackages: any;
}

/**
 * Specifies a list of packages to be installed using pip.
 *
 * @see https://pip.pypa.io/en/stable/reference/pip_install/#requirements-file-format
 */
export class RequirementsFile extends FileBase {
  private readonly packages = new Array<string>();
  private readonly lazyPackages: any;

  constructor(project: Project, filePath: string, options: RequirementsFileOptions) {
    super(project, filePath);

    this.lazyPackages = options.lazyPackages;
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
      if (pkg.startsWith('#')) {
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

  protected synthesizeContent(resolver: IResolver): string | undefined {
    const additionalPackages = resolver.resolve(this.lazyPackages);
    this.addPackages(...additionalPackages);

    return `${resolver.resolve([
      `# ${FileBase.PROJEN_MARKER}`,
      ...this.packages,
    ]).join(EOL)}${EOL}`;
  }
}
