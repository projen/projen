import * as chalk from 'chalk';

// disable logs if running inside a test
let enabled = process.env.JEST_WORKER_ID ? false : true;

function log(isError: boolean, color: chalk.ChalkFunction, ...text: any[]) {
  // errors are always emitted, even if logs are disabled
  if (!enabled && !isError) { return; }
  console.error(`🤖 ${color(...text)}`);
}

export function debug(...text: any[]) {
  if (process.env.DEBUG) {
    log(false, chalk.gray, ...text);
  }
}

export function verbose(...text: any[]) {
  log(false, chalk.white, ...text);
}

export function info(...text: any[]) {
  log(false, chalk.cyan, ...text);
}

export function error(...text: any[]) {
  log(true, chalk.red, ...text);
}

export function warn(...text: any[]) {
  log(false, chalk.yellow, ...text);
}

export function disable() {
  enabled = false;
}

export function isEnabled() {
  return enabled;
}