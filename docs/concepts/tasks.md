---
sidebar_position: 3
---

# Tasks

Tasks are a project-level feature to define a project command system backed by
shell scripts. Tasks are used to implement development workflows and are
accessible through the projen CLI as subcommands.

The following example defines a task named "hello" which executes the shell
command `echo hello, world!`:

```js
const hello = project.addTask("hello");
hello.exec("echo hello, world!");
```

Run `npx projen` and the task will be available in the CLI:

```shell
npx projen hello
🤖 hello | echo hello, world!
hello, world!
```

You can also define some metadata and the first exec step declaratively:

```js
const projen = require("projen");

const hello = project.addTask("hello", {
  description: "say hello",
  category: projen.tasks.TaskCategory.TEST,
  exec: "echo hello, world!",
});
```

## Steps

Tasks can include any number of _steps_:

```ts
hello.exec("echo step number 2");

// a name can be added to a step if desired
hello.exec("echo foo bar", { name: 'print the text "foo bar"' });
```

The `--inspect` option can be used to display the contents of a task:

```shell
projen hello --inspect
echo hello, world!
echo step number 2
echo foo bar
```

If a step fails, the task will fail and all subsequent steps will not be
executed.

You can also add steps to the beginning of a task:

```ts
const hello = project.addTask("hello");
hello.exec("echo hello");
hello.prepend("echo world");
```

Then:

```shell
projen hello 2> /dev/null
world
hello
```

## Subtasks

Tasks can also spawn sub-tasks as a step:

```ts
const world = project.addTask("world");
world.exec("echo world!");

const hello = project.addTask("hello");
hello.exec("echo hello");
hello.spawn(world);
```

The output will be:

```shell
projen hello
🤖 hello | echo hello
hello
🤖 hello » world | echo world!
world!

projen hello --inspect
echo hello
world:
   echo world!
```

## Environment

Environment variables can be defined at the project level (for all tasks), the task level, or the task step level:

```ts
project.tasks.addEnvironment("FOO", "hello");

const hello = project.addTask("hello");
hello.env("BAR", "beautiful");
hello.exec("echo $FOO, $BAR $BAZ!", { env: { BAZ: "world" } });
```

Then:

```shell
projen hello
🤖 hello | echo $FOO, $BAR $BAZ!
hello, beautiful world!
```

You can also evaluate environment variable values from a shell command:

```ts
const hello = project.addTask("hello");
hello.env("TIME", "$(date)");
hello.exec("echo current time is $TIME");
```

Then:

```shell
projen hello
🤖 hello | echo current time is $TIME
current time is Tue Dec 1 09:32:33 IST 2020
```

## Conditions

The `condition` option includes a command that determines if the task is
executed. If the command exits successfully (with a zero exit code), steps will
be executed. Otherwise, the task will be skipped (successfully).

```ts
const hello = project.addTask("hello", {
  condition: '[ -n "$CI" ]', // only execute if the CI environment variable is defined
  exec: "echo running in a CI environment",
});
```

Then:

```shell
projen hello
🤖 hello | condition: [ -n "$CI" ]
🤖 hello | condition exited with non-zero - skipping

CI=1 projen hello
🤖 hello | condition: [ -n "$CI" ]
🤖 hello | echo running in a CI environment
running in a CI environment
```

The `condition` option can also be specified on individual task steps, for more
granular control over task execution behavior:

```ts
const hello = project.addTask("hello", {
  steps: [
    { exec: "running in a CI environment", condition: '[ -n "$CI" ]' },
    { exec: "not running in a CI environment", condition: '[ ! -n "$CI" ]' },
  ],
});
```

Then:

```shell
projen hello
🤖 hello | condition: [ -n "$CI" ]
🤖 hello | condition exited with non-zero - skipping
🤖 hello | condition: [ ! -n "$CI" ]
🤖 hello | echo not running in a CI environment
not running in a CI environment

CI=1 projen hello
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

## Overriding Tasks

The Project-defined tasks can be overridden by the user using the `reset()` method. For example, the user may prefer
running tests on a Python project using `nose2` instead of `pytest`, and the current `PythonProject`
implementation uses `pytest` by default. The user can override the `test` task to use `nose2` instead:

```ts
const testTask = project.tasks.tryFind("test");
if (testTask) {
  testTask.reset("nose2 tests/");
}
```

If you're using `.projenrc.py`, the example would look like this:

```python
test_task = project.tasks.try_find("test")
if test_task:
    test_task.reset("nose2 tests/", receive_args=True)  # Passes through any arguments passed to the task
```

## Extending Tasks

Similar to overriding tasks, you can extend tasks by adding additional steps to the end of the task:

```ts
project.tasks.tryFind("build")?.exec("echo Build completed successfully.");
```

## Saying things

There is an additional `say` step that can be used to print a message to the console:

```ts
project.tasks.tryFind("build")!.say("Build completed successfully.");
```

Once the task is complete, an additional message will be printed to the console:

```shell
... other build steps here
👾 build | Build completed successfully.
```


## Patching an existing task vs. creating a new task

The choice between patching an existing task and creating a new task is largely personal
or organizational preference. However, there are some general guidelines:

- If you're adding a new task that is conceptually similar to an existing task, it's probably
  best to patch the existing task. For example, if you're running tests using `pytest` and
  also leveraging Cypress for end-to-end testing, it's probably best to add a new step to the
  existing `test` task to run Cypress tests.
- If you're combining tasks that already exist with a new series of tasks that are not very
  similar, it is probably best to add a new task. An example would be if you have specific linters
  you run during CI, you may want to create a `lint` task.
  - The exception to the above guideline is when you want to run everything as part of an existing
    CI/CD pipeline. In that case, you may want to use the existing `build` task to spawn a
    a custom `ci` task, or simply add steps. It's largely up to your preference, but
    keep in mind the default CI/CD workflows for projen GitHub projects already executes `build`.
