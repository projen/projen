import * as yargs from 'yargs';
import { TaskRuntime } from '../../tasks';
import { printStartMenu, showStartMenu } from './start-app';

class Command implements yargs.CommandModule {
  command = 'start';
  describe = 'Prints all project commands';

  public builder(args: yargs.Argv) {
    return args.option('interactive', { type: 'boolean', alias: 'i', desc: 'Interactive menu', default: true });
  }

  async handler(opts: any) {
    const tasks = new TaskRuntime(process.cwd());
    if (opts.interactive) {
      await showStartMenu(tasks);
    } else {
      printStartMenu(tasks);
    }
  }
}

module.exports = new Command();