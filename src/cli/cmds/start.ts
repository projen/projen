import * as yargs from 'yargs';
import { printStartMenu, showStartMenu } from './start-app';

class Command implements yargs.CommandModule {
  command = 'start';
  describe = 'Prints all project commands';

  public builder(args: yargs.Argv) {
    return args.option('interactive', { alias: 'i', desc: 'Interactive menu' });
  }

  async handler(opts: any) {
    if (opts.interactive) {
      await showStartMenu();
    } else {
      printStartMenu();
    }
  }
}

module.exports = new Command();