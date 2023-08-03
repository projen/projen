import { Component } from "./component";
import { DependencyType } from "./dependencies";
import { JsonFile } from "./json";
import { Project } from "./project";

/**
 * Options for Renovatebot
 */
export interface RenovatebotOptions {
  /**
   * How often to check for new versions and raise pull requests.
   *
   * Can be given in CRON or LATER format, and use multiple schedules
   * (e.g. different for weekdays and weekends). Multiple rules are
   * handles as OR.
   *
   * Some normal scheduling values defined in enum `RenovatebotScheduleInterval`.
   *
   * @see https://docs.renovatebot.com/configuration-options/#schedule
   * @default ["at any time"]
   */
  readonly scheduleInterval?: string[];

  /**
   * You can use the `ignore` option to customize which dependencies are updated.
   * The ignore option supports just package name.
   * @default []
   */
  readonly ignore?: string[];

  /**
   * Ignores updates to `projen`.
   *
   * This is required since projen updates may cause changes in committed files
   * and anti-tamper checks will fail.
   *
   * Projen upgrades are covered through the `ProjenUpgrade` class.
   *
   * @default true
   */
  readonly ignoreProjen?: boolean;

  /**
   * List of labels to apply to the created PR's.
   */
  readonly labels?: string[];

  readonly overrideConfig?: any;

  readonly marker?: boolean;
}

/**
 * How often to check for new versions and raise pull requests for version
 * updates.
 *
 * @see https://docs.renovatebot.com/presets-schedule/
 */
export enum RenovatebotScheduleInterval {
  /**
   * Run at any time
   */
  ANY_TIME = "at any time",

  /**
   * Weekly schedule on early monday mornings
   */
  EARLY_MONDAYS = "before 3am on Monday",

  /**
   * Schedule daily
   */
  DAILY = "before 2am",

  /**
   * Schedule weekly
   */
  WEEKLY = EARLY_MONDAYS,

  /**
   * Schedule monthly
   */
  MONTHLY = "before 3am on the first day of the month",

  /**
   * Schedule quarterly
   */
  QUARTERLY = "every 3 months on the first day of the month",

  /**
   * Schedule for weekends
   */
  WEEKENDS = "every weekend",

  /**
   * Schedule for weekdays
   */
  WEEKDAYS = "every weekday",
}

/**
 * Defines renovatebot configuration for projen project.
 *
 * Ignores the versions controlled by Projen.
 */
export class Renovatebot extends Component {
  /**
   * The file holding the renovatebot configuration
   */
  public readonly file: JsonFile;

  private readonly _project: Project;

  private readonly explicitIgnores: string[];

  private readonly scheduleInterval: string[];

  private readonly labels?: string[];

  private readonly marker?: boolean;

  private readonly overrideConfig?: any;

  constructor(project: Project, options: RenovatebotOptions = {}) {
    super(project);

    this._project = project;
    this.explicitIgnores = options.ignore ?? [];
    this.labels = options.labels;
    this.scheduleInterval = options.scheduleInterval ?? [
      RenovatebotScheduleInterval.ANY_TIME,
    ];
    (options.ignoreProjen ?? true) && this.explicitIgnores.push("projen");
    this.overrideConfig = options.overrideConfig ?? {};
    this.marker = options.marker ?? true;

    this.file = new JsonFile(this._project, "renovate.json5", {
      obj: () => this.createRenovateConfiguration(),
      committed: true,
      marker: this.marker,
    });
  }

  private createRenovateConfiguration() {
    const renovateIgnore = [
      ...new Set(
        this._project.deps.all
          .filter((dep) => dep.version || dep.type === DependencyType.OVERRIDE)
          .map((dep) => dep.name)
          .concat(this.explicitIgnores)
      ),
    ];

    return {
      labels: this.labels,
      schedule: this.scheduleInterval,
      extends: [
        ":preserveSemverRanges",
        "config:base",
        "group:allNonMajor",
        "group:recommended",
        "group:monorepos",
      ],
      packageRules: [
        {
          matchDepTypes: ["devDependencies"],
          matchUpdateTypes: ["patch", "minor"],
          groupName: "devDependencies (non-major)",
        },
      ],
      ignoreDeps: renovateIgnore,
      ...this.overrideConfig,
    };
  }
}
