import * as chalk from 'chalk';

let enabled = true;

function log(color: chalk.ChalkFunction, ...text: any[]) {
  if (!enabled) { return; }
  console.error(`🤖 ${color(...text)}`);
}

export function debug(...text: any[]) {
  if (process.env.DEBUG) {
    log(chalk.gray, ...text);
  }
}

export function verbose(...text: any[]) {
  log(chalk.white, ...text);
}

export function info(...text: any[]) {
  log(chalk.cyan, ...text);
}

export function error(...text: any[]) {
  log(chalk.red, ...text);
}

export function warn(...text: any[]) {
  log(chalk.yellow, ...text);
}

export function disable() {
  enabled = false;
}