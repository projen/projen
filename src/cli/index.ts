import { resolve } from 'path';
import * as yargs from 'yargs';
import { PROJEN_RC } from '../common';
import { synth } from './synth';
import { discoverTaskCommands } from './tasks';

const DEFAULT_RC = resolve(PROJEN_RC);

async function main() {
  const ya = yargs;
  ya.commandDir('cmds');

  discoverTaskCommands(ya);

  ya.recommendCommands();
  ya.wrap(yargs.terminalWidth());
  ya.option('post', { type: 'boolean', default: true, desc: 'Run post-synthesis steps such as installing dependencies. Use --no-post to skip' });
  ya.options('debug', { type: 'boolean', default: false, desc: 'Debug logs' });
  ya.options('rc', { desc: 'path to .projenrc.js file', default: DEFAULT_RC, type: 'string' });
  ya.help();

  const args = ya.argv;

  if (args.debug) {
    process.env.DEBUG = 'true';
  }

  // no command means just require .projenrc.js
  if (args._.length === 0) {
    process.env.PROJEN_DISABLE_POST = (!args.post).toString();
    await synth((args.rc as string) ?? DEFAULT_RC);
  }
}


main().catch(e => {
  console.error(e.stack);
  process.exit(1);
});
