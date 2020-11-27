import * as yargs from 'yargs';
import { synth } from './synth';

const args = yargs
  .commandDir('cmds')
  .recommendCommands()
  .wrap(yargs.terminalWidth())
  .option('post', { type: 'boolean', default: true, desc: 'Run post-synthesis steps such as installing dependencies' })
  .help()
  .argv;

// no command means just require .projenrc.js
if (args._.length === 0) {
  process.env.POST_SYNTHESIS_ENABLED = (args.post ?? true).toString();
  synth();
}
