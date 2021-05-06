import * as chalk from "chalk";

let enabled = true;

function log(color: chalk.ChalkFunction, ...text: any[]) {
  if (!enabled) {
    return;
  }
  console.error(`🤖 ${color(...text)}`);
}

/**
 * @deprecated
 */
export function debug(...text: any[]) {
  if (process.env.DEBUG) {
    log(chalk.gray, ...text);
  }
}

/**
 * @deprecated
 */
export function verbose(...text: any[]) {
  log(chalk.white, ...text);
}

/**
 * @deprecated
 */
export function info(...text: any[]) {
  log(chalk.cyan, ...text);
}

/**
 * @deprecated
 */
export function error(...text: any[]) {
  log(chalk.red, ...text);
}

/**
 * @deprecated
 */
export function warn(...text: any[]) {
  log(chalk.yellow, ...text);
}

/**
 * @deprecated
 */
export function disable() {
  enabled = false;
}
