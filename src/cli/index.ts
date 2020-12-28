import * as yargs from 'yargs';
import { synth } from './synth';
import { discoverTaskCommands } from './tasks';

async function main() {
  const ya = yargs;
  ya.commandDir('cmds');

  discoverTaskCommands(ya);

  ya.recommendCommands();
  ya.wrap(yargs.terminalWidth());
  ya.option('post', { type: 'boolean', default: true, desc: 'Run post-synthesis steps such as installing dependencies. Use --no-post to skip' });
  ya.options('debug', { type: 'boolean', default: false, desc: 'Debug logs' });
  ya.help();

  const args = ya.argv;

  if (args.debug) {
    process.env.DEBUG = 'true';
  }

  // no command means just require .projenrc.js
  if (args._.length === 0) {
    process.env.PROJEN_DISABLE_POST = (!args.post).toString();
    await synth();
  }
}


main().catch(e => {
  console.error(e.stack);
  process.exit(1);
});
