import * as yargs from 'yargs';
import { synth } from './synth';

const args = yargs
  .commandDir('cmds')
  .recommendCommands()
  .wrap(yargs.terminalWidth())
  .help()
  .argv;

// no command means just require .projenrc.js
if (args._.length === 0) {
  synth(); // eslint-disable-line @typescript-eslint/no-floating-promises
}
