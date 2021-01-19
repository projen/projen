import { resolve } from 'path';
import * as yargs from 'yargs';
import { PROJEN_RC } from '../common';
import { Project } from '../project';
import { TaskRuntime } from '../tasks';
import { synth } from './synth';
import { discoverTaskCommands } from './tasks';

const DEFAULT_RC = resolve(PROJEN_RC);

async function main() {
  const ya = yargs;
  ya.commandDir('cmds');

  const runtime = new TaskRuntime('.');
  discoverTaskCommands(runtime, ya);

  ya.recommendCommands();
  ya.wrap(yargs.terminalWidth());
  ya.option('post', { type: 'boolean', default: true, desc: 'Run post-synthesis steps such as installing dependencies. Use --no-post to skip' });
  ya.options('debug', { type: 'boolean', default: false, desc: 'Debug logs' });
  ya.options('rc', { desc: 'path to .projenrc.js file', default: DEFAULT_RC, type: 'string' });
  ya.version(false);
  ya.help();

  const args = ya.argv;

  if (args.debug) {
    process.env.DEBUG = 'true';
  }

  // no command means just require .projenrc.js
  if (args._.length === 0) {
    process.env.PROJEN_DISABLE_POST = (!args.post).toString();

    // if there is a "default" task, execute it, otherwise, defer to the javascript synth
    // TODO: move javascript synth to `NodeProject`.
    const defaultTask = runtime.tasks.find(t => t.name === Project.DEFAULT_TASK);
    if (defaultTask) {
      runtime.runTask(defaultTask.name);
    } else {
      await synth((args.rc as string) ?? DEFAULT_RC);
    }
  }
}

main().catch(e => {
  console.error(e.stack);
  process.exit(1);
});
