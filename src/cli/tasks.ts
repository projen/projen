import * as yargs from 'yargs';
import * as logging from '../logging';
import { TaskRuntime } from '../tasks';

/**
 * Reads .projen/tasks.json and adds CLI commands for all tasks.
 * @param ya yargs
 */
export function discoverTaskCommands(ya: yargs.Argv) {
  const workdir = '.';
  const runtime = new TaskRuntime(workdir);
  const tasks = runtime.manifest.tasks ?? {};
  for (const task of Object.values(tasks)) {
    ya.command(task.name, task.description ?? '', taskCommandHandler(task.name));
  }

  function taskCommandHandler(taskName: string) {
    return (args: yargs.Argv) => {
      args.option('inspect', { alias: 'i', desc: 'show all steps in this task' });

      const argv = args.argv;

      if (argv.inspect) {
        return inspectTask(taskName);
      } else {
        try {
          runtime.runTask(taskName);
        } catch (e) {
          logging.error(e.message);
          process.exit(1);
        }
      }
    };
  }

  function inspectTask(name: string, indent = 0) {
    const writeln = (s: string) => console.log(' '.repeat(indent) + s);

    const task = runtime.tryFindTask(name);
    if (!task) {
      throw new Error(`${name}: unable to resolve subtask with name "${name}"`);
    }

    for (const step of task.steps ?? []) {
      if (step.execTask) {
        writeln(`${step.execTask}:`);
        inspectTask(step.execTask, indent + 3);
      } else if (step.exec) {
        writeln(step.exec);
      }
    }
  };
}