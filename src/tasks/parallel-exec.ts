import { spawn } from 'child_process';
import { TaskRuntime } from './runtime';

const tasks = process.argv.slice(2);

if (tasks.length === 0) {
  console.log('no tasks to run');
  process.exit(0);
}

// if we have a single task, then just run it synchronously and exit
if (tasks.length === 1) {
  const rt = new TaskRuntime(process.cwd());
  rt.runTask(tasks[0]);
  process.exit(0);
}

for (const task of tasks) {
  const output = new Array<Buffer>();
  const child = spawn(process.execPath, [__filename, task], {
    stdio: ['inherit', 'pipe', 'pipe'],
  });

  child.stderr.on('data', chunk => output.push(chunk));
  child.stdout.on('data', chunk => output.push(chunk));

  child.on('exit', _ => {
    console.error(Buffer.concat(output).toString('utf-8'));
  });
}

// TODO: concurrency limit
// TODO: tty
