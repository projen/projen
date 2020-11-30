import * as yargs from 'yargs';
import { synth } from './synth';

const args = yargs
  .commandDir('cmds')
  .recommendCommands()
  .wrap(yargs.terminalWidth())
  .option('post', { type: 'boolean', default: true, desc: 'Run post-synthesis steps such as installing dependencies. Use --no-post to skip' })
  .help()
  .argv;

// no command means just require .projenrc.js
if (args._.length === 0) {
  process.env.PROJEN_DISABLE_POST = (!args.post).toString();
  synth();
}
