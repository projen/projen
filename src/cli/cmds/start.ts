import * as yargs from 'yargs';
import { TaskRuntime } from '../../tasks';
import { printStartMenu, showStartMenu } from './start-app';

class Command implements yargs.CommandModule {
  command = 'start';
  describe = 'Prints all project commands';

  public builder(args: yargs.Argv) {
    return args.option('interactive', { alias: 'i', desc: 'Interactive menu' });
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