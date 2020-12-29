import * as yargs from 'yargs';
import * as logging from '../logging';
import { TaskRuntime, TaskSpec } from '../tasks';

/**
 * Reads .projen/tasks.json and adds CLI commands for all tasks.
 * @param ya yargs
 */
export function discoverTaskCommands(ya: yargs.Argv) {
  const workdir = '.';
  const runtime = new TaskRuntime(workdir);
  const tasks = runtime.manifest.tasks ?? {};
  for (const task of Object.values(tasks)) {
    const hide = task.unlisted ?? false;
    const module = taskCommandHandler(task);
    if (hide) {
      ya.command(task.name, false, module);
    } else {
      ya.command(module);
    }
  }

  function taskCommandHandler(task: TaskSpec): yargs.CommandModule {
    return {
      command: task.name,
      describe: task.description,
      builder(args: yargs.Argv) {
        args.option('inspect', { alias: 'i', desc: 'show all steps in this task' });
        return args;
      },
      handler(argv: any) {
        if (argv.inspect) {
          return inspectTask(task.name);
        } else {
          try {
            runtime.runTask(task.name);
          } catch (e) {
            logging.error(e.message);
            process.exit(1);
          }
        }
      },
    };
  }

  function inspectTask(name: string, indent = 0) {
    const writeln = (s: string) => console.log(' '.repeat(indent) + s);

    const task = runtime.tryFindTask(name);
    if (!task) {
      throw new Error(`${name}: unable to resolve subtask with name "${name}"`);
    }

    for (const step of task.steps ?? []) {
      if (step.spawn) {
        writeln(`${step.spawn}:`);
        inspectTask(step.spawn, indent + 3);
      } else if (step.exec) {
        writeln(step.exec);
      } else if (step.parallel) {
        writeln('parallel:');
        for (const subtask of step.parallel) {
          writeln(`   - ${subtask}:`);
          inspectTask(subtask, indent + 8);
        }
      }
    }
  };
}