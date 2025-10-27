import * as chalk from "chalk";
import { IConstruct } from "constructs";
import { IS_TEST_RUN } from "./common";
import { Component } from "./component";
import { ICON } from "./logging";
import { isTruthy } from "./util";
import { findClosestProject } from "./util/constructs";

/**
 * Options for logging utilities.
 */
export interface LoggerOptions {
  /**
   * The logging verbosity. The levels available (in increasing verbosity) are
   * OFF, ERROR, WARN, INFO, DEBUG, and VERBOSE.
   *
   * @default LogLevel.INFO
   */
  readonly level?: LogLevel;

  /**
   * Include a prefix for all logging messages with the project name.
   *
   * @default false
   */
  readonly usePrefix?: boolean;
}

/**
 * Project-level logging utilities.
 */
export class Logger extends Component {
  private readonly level: LogLevel;
  private readonly usePrefix: boolean;

  constructor(scope: IConstruct, options: LoggerOptions = {}) {
    const project = findClosestProject(scope, new.target.name);
    super(scope, `${new.target.name}#${project.name}`);

    // if we are running inside a test, default to no logs
    const defaultLevel = IS_TEST_RUN ? LogLevel.OFF : LogLevel.INFO;

    this.level = options.level ?? defaultLevel;
    this.usePrefix = options.usePrefix ?? false;
  }

  /**
   * Log a message to stderr with a given logging level. The message will be
   * printed as long as `logger.level` is set to the message's severity or higher.
   *
   * @param level Logging verbosity
   * @param text strings or objects to print
   */
  public log(level: LogLevel, ...text: any[]) {
    if (level === LogLevel.OFF) {
      throw new Error("Cannot log a message with level LogLevel.OFF");
    }

    let maxLevel = this.level;

    // logging level can be overridden through the --debug CLI option
    if (isTruthy(process.env.DEBUG) && maxLevel < LogLevel.DEBUG) {
      maxLevel = LogLevel.DEBUG;
    }

    if (level <= maxLevel) {
      const color =
        this.colorForLogLevel(level) ??
        ((...values: string[]): string => values.join(" "));
      const prefix = this.usePrefix ? `[${this.project.name}] ` : "";
      console.error(`${ICON} ${prefix}${color(...text)}`);
    }
  }

  /**
   * Log a message to stderr with VERBOSE severity
   * @param text strings or objects to print
   */
  public verbose(...text: any[]) {
    this.log(LogLevel.VERBOSE, ...text);
  }

  /**
   * Log a message to stderr with DEBUG severity
   * @param text strings or objects to print
   */
  public debug(...text: any[]) {
    this.log(LogLevel.DEBUG, ...text);
  }

  /**
   * Log a message to stderr with INFO severity
   * @param text strings or objects to print
   */
  public info(...text: any[]) {
    this.log(LogLevel.INFO, ...text);
  }

  /**
   * Log a message to stderr with WARN severity
   * @param text strings or objects to print
   */
  public warn(...text: any[]) {
    this.log(LogLevel.WARN, ...text);
  }

  /**
   * Log a message to stderr with ERROR severity
   * @param text strings or objects to print
   */
  public error(...text: any[]) {
    this.log(LogLevel.ERROR, ...text);
  }

  private colorForLogLevel(level: LogLevel): chalk.ChalkFunction {
    switch (level) {
      case LogLevel.ERROR:
        return chalk.red;
      case LogLevel.WARN:
        return chalk.yellow;
      case LogLevel.INFO:
        return chalk.cyan;
      case LogLevel.DEBUG:
        return chalk.gray;
      case LogLevel.VERBOSE:
        return chalk.white;
      default:
        return chalk.white;
    }
  }
}

/**
 * Logging verbosity.
 */
export enum LogLevel {
  OFF = "00.off",
  ERROR = "10.error",
  WARN = "20.warn",
  INFO = "30.info",
  DEBUG = "40.debug",
  VERBOSE = "50.verbose",
}
