import * as chalk from 'chalk';
import { Component } from './component';
import { Project } from './project';

export class Logger extends Component {
  private _level: LogLevel;
  private usePrefix: boolean;

  constructor(project: Project) {
    super(project);

    this._level = LogLevel.INFO;
    this.usePrefix = false;
  }

  public get level() {
    return this._level;
  }

  public set level(level: LogLevel) {
    this._level = level;
  }

  public log(level: LogLevel, ...text: any[]) {
    if (level === LogLevel.OFF) {
      throw new Error('Cannot log a message with level LogLevel.OFF');
    }
    if (level <= this.level) {
      const color = this.colorForLogLevel(level);
      const prefix = this.usePrefix ? `[${this.project.name}] ` : '';
      console.error(`🤖 ${prefix}${color(...text)}`);
    }
  }

  public verbose(...text: any[]) {
    this.log(LogLevel.VERBOSE, ...text);
  }

  public debug(...text: any[]) {
    this.log(LogLevel.DEBUG, ...text);
  }

  public info(...text: any[]) {
    this.log(LogLevel.INFO, ...text);
  }

  public warn(...text: any[]) {
    this.log(LogLevel.WARN, ...text);
  }

  public error(...text: any[]) {
    this.log(LogLevel.ERROR, ...text);
  }

  private colorForLogLevel(level: LogLevel): chalk.ChalkFunction {
    switch (level) {
      case LogLevel.ERROR: return chalk.red;
      case LogLevel.WARN: return chalk.yellow;
      case LogLevel.INFO: return chalk.cyan;
      case LogLevel.DEBUG: return chalk.gray;
      case LogLevel.VERBOSE: return chalk.white;
      default:
        return chalk.white;
    }
  }
}

export enum LogLevel {
  OFF = '00.off',
  ERROR = '10.error',
  WARN = '20.warn',
  INFO = '30.info',
  DEBUG = '40.debug',
  VERBOSE = '50.verbose'
}