# Tasks

Tasks are a project-level feature to define a project command system backed by
shell scripts. Tasks are used to implement development workflows and are
accessible through the projen CLI as subcommands.

The following example defines a task named "hello" which executes the shell
command `echo hello, world!`:

```js
const hello = project.addTask('hello');
hello.exec('echo hello, world!');
```

Run `pj` and the task will be available in the CLI:

```shell
$ projen hello
🤖 hello | echo hello, world!
hello, world!
```

You can also define some metadata and the first exec step declaratively:

```js
const projen = require('projen');

const hello = project.addTask('hello', {
  description: 'say hello',
  category: projen.tasks.TaskCategory.TEST,  
  exec: 'echo hello, world!'
});
```

## Steps

Tasks can include any number of _steps_:

```ts
hello.exec('echo step number 2');

// a name can be added to a step if desired
hello.exec('echo foo bar', { name: 'print the text "foo bar"' });
```

The `--inspect` option can be used to display the contents of a task:

```shell
$ projen hello --inspect
echo hello, world!
echo step number 2
echo foo bar
```

If a step fails, the task will fail and all subsequent steps will not be
executed.

You can also add steps to the beginning of a task:

```ts
const hello = project.addTask('hello');
hello.exec('echo hello');
hello.prepend('echo world');
```

Then:

```shell
$ projen hello 2> /dev/null
world
hello
```

## Subtasks

Tasks can also spawn sub-tasks as a step:

```ts
const world = project.addTask('world');
world.exec('echo world!');

const hello = project.addTask('hello');
hello.exec('echo hello');
hello.spawn(world);
```

The output will be:

```shell
$ projen hello
🤖 hello | echo hello
hello
🤖 hello » world | echo world!
world!

$ projen hello --inspect
echo hello
world:
   echo world!
```

## Environment

Environment variables can be defined at the project level (for all tasks) or the task level:

```ts
project.tasks.addEnvironment('FOO', 'hello');

const hello = project.addTask('hello');
hello.env('BAR', 'world');
hello.exec('echo $FOO, $BAR!');
```

Then:

```shell
$ projen hello
🤖 hello | echo $FOO, $BAR!
hello, world!
```

You can also evaluate environment variable values from a shell command:

```ts
const hello = project.addTask('hello');
hello.env('TIME', '$(date)');
hello.exec('echo current time is $TIME');
```

Then:

```shell
$ projen hello
🤖 hello | echo current time is $TIME
current time is Tue Dec 1 09:32:33 IST 2020
```

## Conditions

The `condition` option includes a command that determines if the task is
executed. If the command exits successfully (with a zero exit code), steps will
be executed. Otherwise, the task will be skipped (successfully).

```ts
const hello = project.addTask('hello', {
  condition: '[ -n "$CI" ]', // only execute if the CI environment variable is defined
  exec: 'echo running in a CI environment'
});
```

Then:

```shell
$ projen hello
🤖 hello | condition: [ -n "$CI" ]
🤖 hello | condition exited with non-zero - skipping

$ CI=1 projen hello
🤖 hello | condition: [ -n "$CI" ]
🤖 hello | echo running in a CI environment
running in a CI environment
```

## Tasks as npm scripts

By default, npm scripts in `NodeProject`s (or derivatives) are implemented by delegating the
command to the projen CLI:

```json
{
  "scripts": {
    "compile": "npx projen compile"
  }
}
```

This means that when `yarn compile` or `npm run compile` are executed, the
projen CLI will be invoked and the task will be executed.

You can set `npmTaskExecution: NpmTaskExecution.SHELL` when the project is
defined to tell projen to render the task command directly as an npm script,
bypassing the projen CLI:

```js
const project = new NodeProject({
  // ...
  npmTaskExecution: NpmTaskExecution.SHELL,
});
```

And then, this is how `package.json` will look like:

```json
{
  "scripts": {
    "compile": "tsc"
  }
}
```
