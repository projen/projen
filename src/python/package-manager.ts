import { IConstruct } from "constructs";
import { Component } from "../component";
import { DependencyCoordinates, DependencyType } from "../dependencies";
import { Task } from "../task";
import { TaskRuntime } from "../task-runtime";
import { BuildSystem } from "./pyproject-toml";
import { IPythonDeps } from "./python-deps";
import { IPythonEnv } from "./python-env";
import {
  IPythonLinting,
  PythonFormatter,
  PythonLinter,
  PythonTypeChecker,
} from "./python-lint";
import { IPythonPackaging } from "./python-packaging";
import { PythonBaseOptions, PythonProject } from "./python-project";

export enum VersionComparator {
  LE = "<=",
  LT = "<",
  NE = "!=",
  EQ = "==",
  GE = ">=",
  GT = ">",
  COMPATIBLE_RELEASE = "~=",
  ARBITRARY_EQ = "===",
}

export interface VersionSpec {
  /**
   * The comparison operator.
   */
  readonly comparator: VersionComparator;

  /**
   * The version number.
   */
  readonly version: string;
}

/**
 * Gets a single version specification from a version expression string.
 *
 * @example
 * // Given a `version` string like this:
 * const version = ">=1.2.3";
 * // The resulting VersionSpec would be:
 * { comparator: VersionComparator.GE, version: "1.2.3" }
 */
export function getVersionSpec(version: string): VersionSpec {
  const versionPattern = Object.values(VersionComparator).join("|");
  const regexStr = `^\\s*(${versionPattern})?\\s*([\\w\\.]+)\\s*$`;
  const regex = new RegExp(regexStr);
  const match = version.match(regex);

  if (!match) {
    throw new Error(`Invalid version expression: ${version}`);
  }

  return {
    comparator: (match[1] as VersionComparator) ?? VersionComparator.EQ,
    version: match[2],
  };
}

/**
 * Gets version specifications for a version expression string.
 *
 * @example
 * // Given a `version` string like this:
 * const version = "^1.2.3";
 * // The resulting array of VersionSpec would be:
 * [
 *   { comparator: VersionComparator.GE, version: "1.2.3" },
 *   { comparator: VersionComparator.LT, version: "2.0.0" }
 * ]
 */
export function getVersionSpecs(version: string): VersionSpec[] {
  return version.split(/\s*,\s*/).flatMap((ver) => {
    if (ver.startsWith("^")) {
      const cleanVersion = ver.slice(1);
      const [major] = cleanVersion.split(".");
      const nextMajor = Number(major) + 1;
      return [
        { comparator: VersionComparator.GE, version: cleanVersion },
        { comparator: VersionComparator.LT, version: `${nextMajor}.0.0` },
      ];
    }

    if (/^\d/.test(ver)) {
      // Treat it as an exact version
      return [{ comparator: VersionComparator.EQ, version: ver }];
    }

    return [getVersionSpec(ver)];
  });
}

/**
 * Formats a version expression to the PEP440 standard.
 *
 * @example
 * // Given a `version` object like this:
 * const version = "^1.2.3";
 * // After formatting, the resulting string would be:
 * ">=1.2.3,<2.0.0"
 */
export function formatVersion(version: string): string {
  const versionSpecs = getVersionSpecs(version);
  return versionSpecs
    .map((spec) => `${spec.comparator}${spec.version}`)
    .join(",");
}

/** Formats dependencies according to [PEP440](https://peps.python.org/pep-0440/#version-specifiers). */
export function formatDependency(dep: DependencyCoordinates): string {
  const name = dep.name;
  const version = dep.version;

  if (!version || version === "*") {
    return name;
  }

  const versionExpression = formatVersion(version);
  return `${name}${versionExpression}`;
}

export abstract class PackageManagerBase
  extends Component
  implements IPythonDeps, IPythonEnv, IPythonPackaging, IPythonLinting
{
  public abstract readonly installTask: Task;
  public abstract readonly installCiTask: Task;
  public abstract readonly publishTask: Task;
  public abstract readonly defaultBuildSystem: BuildSystem;

  public readonly lintTask?: Task;
  public readonly formatTask?: Task;
  public readonly typeCheckTask?: Task;
  public readonly project!: PythonProject;
  public readonly runCommand: string;

  constructor(scope: IConstruct, options: PythonBaseOptions) {
    super(scope);
    this.runCommand = this.getRunCommand(options);

    if (options.formatter) {
      const formatCommand = {
        [PythonFormatter.BLACK]: "black",
        [PythonFormatter.RUFF]: "ruff format",
      }[options.formatter];

      this.formatTask = this.project.addTask("format", {
        description: "Run the formatter",
        exec: `${this.runCommand} ${formatCommand}`,
      });

      this.addDevDependency(options.formatter);
    }

    if (options.linter) {
      const lintCommand = { [PythonLinter.RUFF]: "ruff check" }[options.linter];
      this.lintTask = this.project.addTask("lint", {
        description: "Run the linter",
        exec: `${this.runCommand} ${lintCommand}`,
      });

      this.addDevDependency(options.linter);
    }

    if (options.typeChecker) {
      const typeCheckCommand = {
        [PythonTypeChecker.MYPY]: "mypy",
        [PythonTypeChecker.PYRIGHT]: "pyright",
        [PythonTypeChecker.TY]: "ty",
      }[options.typeChecker];
      this.typeCheckTask = this.project.addTask("typeCheck", {
        description: "Run the type checker",
        exec: `${this.runCommand} ${typeCheckCommand}`,
      });

      this.addDevDependency(options.typeChecker);
    }
  }

  public abstract getRunCommand(_options: PythonBaseOptions): string;
  public abstract setupEnvironment(): void;

  private getDependencies(dependencyTypes: DependencyType[]): string[] {
    return (
      this.project.deps.all
        .filter(
          (pkg) => dependencyTypes.includes(pkg.type) && pkg.name !== "python"
        )
        // remove duplicate versions of the same dependency
        .filter(
          (dep, index, self) =>
            index === self.findIndex((d) => d.name === dep.name)
        )
        .map((pkg) => formatDependency(pkg))
    );
  }

  public synthDependencies(): string[] {
    return this.getDependencies([DependencyType.RUNTIME]);
  }

  public synthDevDependencies(): string[] {
    return this.getDependencies([DependencyType.DEVENV, DependencyType.TEST]);
  }

  public synthDependencyGroups(): { [key: string]: any } | undefined {
    const devDeps = this.synthDevDependencies();

    if (devDeps) {
      return { dev: devDeps };
    } else {
      return undefined;
    }
  }

  /**
   * Adds a runtime dependency.
   *
   * @param spec Format `<module>@<semver>`
   */
  public addDependency(spec: string): void {
    this.project.deps.addDependency(spec, DependencyType.RUNTIME);
  }

  /**
   * Adds a dev dependency.
   *
   * @param spec Format `<module>@<semver>`
   */
  public addDevDependency(spec: string): void {
    this.project.deps.addDependency(spec, DependencyType.DEVENV);
  }

  /**
   * Installs dependencies (called during post-synthesis).
   */
  public installDependencies(): void {
    this.project.logger.info("Installing dependencies...");
    const runtime = new TaskRuntime(this.project.outdir);
    if (this.project.file.changed) {
      runtime.runTask(this.installTask.name);
    } else {
      runtime.runTask(this.installCiTask.name);
    }
  }
}
