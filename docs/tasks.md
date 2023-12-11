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

## Tasks running other tasks

There are two ways to specify that when a task is run, another
one should be run as well:

* Dependencies and implications
* Subtasks (spawn)

Those will be explained below.

### Dependencies and implications

It is possible to establish a _dependency_ between two tasks by specifying the
dependency task at initialization time, or after initialization time using a
method:

```ts
const hello = project.addTask('hello', {
  exec: 'echo hello',
});

const world = project.addTask('world', {
  exec: 'echo world!',
  dependsOnTasks: [hello],
});
// This is equivalent to specifying 'dependsOnTasks'
world.addTaskDependency(hello);
```

This dependency will ensure that when task `world` is run, the task `hello`
will automatically be run beforehand:

```shell
$ projen world
🤖 hello | echo hello
hello
🤖 world | echo world!
world!
```

The reverse is also possible: it is possible for a task to _imply_ another task.
That means that when task `A` is run, task `B` will automatically be run afterwards:

```ts
const hello = project.addTask('hello', {
  exec: 'echo hello',
});

const world = project.addTask('world', {
  exec: 'echo world!',
});
// Or specify 'impliesTasks' at initialization time
hello.addTaskImplication(world);
```

When `hello` is run, `world` will automatically be run as well:

```shell
$ projen hello
🤖 hello | echo hello
hello
🤖 world | echo world!
world!
```

In the default projen task setup, dependencies are used for the `compile` task:
`pre-compile` will automatically be run _before_ `compile`, and `post-compile`
will automatically be run _after_ `compile`.

### Subtasks (spawn)

The other way for tasks to trigger other tasks is to explicitly
spawn sub-tasks as step:

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

The difference between dependencies and subtasks is that subtasks will inherit
the parent task's environment (see below), while dependencies do not.

If in the course of a single `projen` invocation a single task is requested to
be run multiple times (for example, both by `spawn` as well as by dependencies),
all invocations after the first will be skipped.

## Environment

Environment variables can be defined at the project level (for all tasks), the task level, or the task step level:

```ts
project.tasks.addEnvironment('FOO', 'hello');

const hello = project.addTask('hello');
hello.env('BAR', 'beautiful');
hello.exec('echo $FOO, $BAR $BAZ!', { env: { BAZ: 'world' } });
```

Then:

```shell
$ projen hello
🤖 hello | echo $FOO, $BAR $BAZ!
hello, beautiful world!
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

The `condition` option can also be specified on individual task steps, for more
granular control over task execution behavior:

```ts
const hello = project.addTask('hello', {
  steps: [
    { exec: 'running in a CI environment', condition: '[ -n "$CI" ]' },
    { exec: 'not running in a CI environment', condition: '[ ! -n "$CI" ]' }
  ]
});
```

Then:

```shell
$ projen hello
🤖 hello | condition: [ -n "$CI" ]
🤖 hello | condition exited with non-zero - skipping
🤖 hello | condition: [ ! -n "$CI" ]
🤖 hello | echo not running in a CI environment
not running in a CI environment

$ CI=1 projen hello
🤖 hello | condition: [ -n "$CI" ]
🤖 hello | echo running in a CI environment
running in a CI environment
🤖 hello | condition: [ ! -n "$CI" ]
🤖 hello | condition exited with non-zero - skipping
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

You can see a list of all steps in a task from the command line by passing
the `--inspect` flag, e.g. `yarn compile --inspect`.
