import * as yargs from 'yargs';
import { TaskRuntime } from '../tasks';
import { synth } from './synth';

async function main() {
  const ya = yargs;
  ya.commandDir('cmds');

  addTasks(ya);

  ya.recommendCommands();
  ya.wrap(yargs.terminalWidth());
  ya.help();

  const args = ya.argv;

  // no command means just require .projenrc.js
  if (args._.length === 0) {
    await synth();
  }
}

function addTasks(ya: yargs.Argv) {
  const workdir = '.';
  const runtime = new TaskRuntime(workdir);
  const tasks = runtime.manifest.tasks ?? {};
  for (const task of Object.values(tasks)) {
    ya.command(task.name, task.description ?? '', args => {
      args.option('inspect', { alias: 'i', desc: 'show all steps in this task' });

      const argv = args.argv;
      if (argv.inspect) {
        const inspect = (name: string, indent = 0) => {
          const prefix = ' '.repeat(indent);
          const c = tasks[name];
          if (!c) {
            throw new Error(`${name}: unable to resolve subtask with name "${name}"`);
          }
          for (const t of c.steps ?? []) {
            if (t.subtask) {
              console.log(prefix + `${t.subtask}:`);
              inspect(t.subtask, indent + 2);
            } else if (t.exec) {
              console.log(prefix + t.exec);
            }
          }
        };

        inspect(task.name);

        return;
      }

      runtime.run(task.name);
    });
  }
}

main().catch(e => {
  console.error(e.stack);
  process.exit(1);
});
