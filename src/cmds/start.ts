import * as yargs from 'yargs';
import { showStartMenu } from './start-app';

class Command implements yargs.CommandModule {
  command = 'start';
  describe = 'Interactive menu with project commands';

  async handler() {
    await showStartMenu();
  }
}

module.exports = new Command();