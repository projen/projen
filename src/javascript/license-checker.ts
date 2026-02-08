import { Construct } from "constructs";
import { Component } from "../component";
import { DependencyType } from "../dependencies";
import { Task } from "../task";

/**
 * Options to configure the license checker
 */
export interface LicenseCheckerOptions {
  /**
   * Check production dependencies.
   * @default true
   */
  readonly production?: boolean;

  /**
   * Check development dependencies.
   * @default false
   */
  readonly development?: boolean;

  /**
   * List of SPDX license identifiers that are allowed to be used.
   *
   * For the license check to pass, all detected licenses MUST be in this list.
   * Only one of `allowedLicenses` and `prohibitedLicenses` can be provided and must not be empty.
   * @default - no licenses are allowed
   */
  readonly allow?: string[];

  /**
   * List of SPDX license identifiers that are prohibited to be used.
   *
   * For the license check to pass, no detected licenses can be in this list.
   * Only one of `allowedLicenses` and `prohibitedLicenses` can be provided and must not be empty.
   * @default - no licenses are prohibited
   */
  readonly deny?: string[];

  /**
   * The name of the task that is added to check licenses
   *
   * @default "check-licenses"
   */
  readonly taskName?: string;
}

/**
 * Enforces allowed licenses used by dependencies.
 */
export class LicenseChecker extends Component {
  public readonly task: Task;

  public constructor(scope: Construct, options: LicenseCheckerOptions) {
    const taskName = options.taskName ?? "check-licenses";
    super(scope, `LicenseChecker#${taskName}`);

    const {
      production = true,
      development = false,
      allow: allowedLicenses = [],
      deny: prohibitedLicenses = [],
    } = options;

    if (!production && !development) {
      throw new Error(
        "LicenseChecker: At least one of `production` or `development` must be enabled.",
      );
    }
    if (!allowedLicenses.length && !prohibitedLicenses.length) {
      throw new Error(
        "LicenseChecker: Neither `allow` nor `deny` found. Exactly one must be provided and not empty.",
      );
    }
    if (allowedLicenses.length && prohibitedLicenses.length) {
      throw new Error(
        "LicenseChecker: `allow` and `deny` can not be used at the same time. Choose one or the other.",
      );
    }

    const cmd = ["license-checker", "--summary"];

    if (production && !development) {
      cmd.push("--production");
    }
    if (development && !production) {
      cmd.push("--development");
    }
    if (allowedLicenses.length) {
      cmd.push("--onlyAllow");
      cmd.push(`"${allowedLicenses.join(";")}"`);
    }
    if (prohibitedLicenses.length) {
      cmd.push("--failOn");
      cmd.push(`"${prohibitedLicenses.join(";")}"`);
    }

    this.project.deps.addDependency("license-checker", DependencyType.BUILD);
    this.task = this.project.addTask(taskName, {
      exec: cmd.join(" "),
      receiveArgs: true,
    });
    this.project.preCompileTask.spawn(this.task);
  }
}
