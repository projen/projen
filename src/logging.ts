import * as chalk from 'chalk';

function log(color: chalk.ChalkFunction, ...text: any[]) {
  console.error(`🤖 ${chalk.bold(color(...text))}`);
}

export function verbose(...text: any[]) {
  log(chalk.gray, ...text);
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