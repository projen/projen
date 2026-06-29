---
sidebar_position: 3
---

# Tasks

Tasks are a project-level feature to define a project command system backed by
shell scripts. Tasks are used to implement development workflows and are
accessible through the projen CLI as subcommands.

The following example defines a task named "hello" which runs `echo` with the
argument `hello, world!`:

```js
const hello = project.addTask("hello");
hello.execArgs(["echo", "hello, world!"]);
```

Run `pnpm dlx projen` and the task will be available in the CLI:

```shell
pnpm dlx projen hello
🤖 hello | echo hello, world!
hello, world!
```

`execArgs` takes the program followed by its arguments as a list. Each element
is passed to the program exactly as written, so arguments that contain spaces
or other special characters don't need to be quoted or escaped. This is the
recommended way to define command steps.

If you'd rather write a full shell command line — for example to use
environment variable expansion (`$FOO`), pipes (`|`), redirects (`>`), or
chaining (`&&`) — use `exec` with a single string instead:

```js
hello.exec("echo hello, world!");
```

You can also define some metadata and the first step declaratively:

```js
const projen = require("projen");

const hello = project.addTask("hello", {
  description: "say hello",
  category: projen.tasks.TaskCategory.TEST,
  execArgs: ["echo", "hello, world!"],
});
```

## Steps

Tasks can include any number of _steps_:

```ts
hello.execArgs(["echo", "step number 2"]);

// a name can be added to a step if desired
hello.execArgs(["echo", "foo bar"], { name: 'print the text "foo bar"' });
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
hello.prependExec("echo world");
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
world.execArgs(["echo", "world!"]);

const hello = project.addTask("hello");
hello.execArgs(["echo", "hello"]);
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
```

To use environment variables directly in tasks, you must use `exec` because
`execArgs` does not perform shell expansion:

```ts
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

## Shell

Every task command - each step's `exec`, the task or step `condition`, and any
`$(...)` environment-variable evaluation - is interpreted by a shell. By default
that is projen's **built-in cross-platform shell**, powered by
[dax](https://github.com/dsherret/dax): it understands POSIX-style syntax
(`&&`, `|`, `$VAR`, globs, redirects, ...) and ships cross-platform versions of
common commands (`mkdir -p`, `rm -rf`, `cp`, ...), so the same task definitions
run identically on Linux, macOS, and Windows with no Unix-like shell installed.
Any other program is run from your `PATH`, so a task that calls a tool that
isn't built in (e.g. `grep`, `sed`) is only portable to platforms where that
tool exists. Notably, many such tools are absent on Windows.
See dax's [built-in commands](https://dax.land/#builtins) for the full list.

### Choosing a different shell

A task's `shell` is a `TaskShell`. Pick a built-in shell, or provide an explicit
invocation:

- `TaskShell.projen()` (the default) - the built-in cross-platform shell
  described above.
- `TaskShell.system()` - the operating system's native shell (`/bin/sh` on
  POSIX, `cmd.exe` on Windows). Use this to opt out of the cross-platform shell
  and run through whatever shell the host provides.
- `TaskShell.bash()` / `TaskShell.sh()` - convenience helpers for `bash -c` and
  `sh -c`.
- `TaskShell.command([...])` - an arbitrary invocation given as an argument
  list, with the command appended as the final argument, e.g.
  `TaskShell.command(["yarn", "exec"])`.

The shell can be set at three levels - project, task, and step - and the
**nearest declared level wins** (a scalar override, not merged):

```ts
import { TaskShell } from "projen";

// 1. project default - applies to every task
project.tasks.shell = TaskShell.bash();

// 2. per task
const hello = project.addTask("hello", {
  shell: TaskShell.bash(),
  exec: "echo hello from bash",
});

// 3. per step - overrides the task/project shell
hello.exec("echo hello from sh", { shell: TaskShell.sh() });
```

If none is set, the built-in `projen` shell is used.

### Strings vs. argument lists

The `shell` applies to both ways of writing a command, but differently:

- A **string** command (`exec`, a `condition`, or a `$(...)` value) is a command
  line, so the shell interprets it - its `&&`, `|`, `$VAR`, redirects, etc. are
  the shell's to handle.
- An `execArgs` **argument list** is never parsed by a shell - each element
  reaches the program exactly as written, whatever the `shell`. The `shell` only
  decides _how the program is launched_: `projen` and `system` spawn it directly,
  while an invocation such as `["npx", "--no", "-c"]` runs it through that tool,
  so it inherits that tool's environment (e.g. `npx` resolving a locally
  installed binary).

So a step can combine the two - for example, run a binary inside a package
manager's environment while still passing arguments as a list:

```ts
project.addTask("synth", {
  // run through npx, but pass the program + args as a list (no quoting)
  shell: TaskShell.command(["npx", "--no", "-c"]),
  execArgs: ["ts-node", "--project", "tsconfig.json", ".projenrc.ts"],
});
```

### When to declare a shell

Prefer the built-in `TaskShell.projen()` for portability. It is the default
and you normally don't need to specify it.

Reach for an explicit invocation when a task relies on features the built-in
shell does not implement. For example bash-specific syntax or a command that
must run inside a package manager's environment (`TaskShell.command(["yarn", "exec"])`).

`TaskShell.system()` is available if you want to opt-out of projen handling
shell selection for you. You can use it to restore the behavior of older projen versions.

## Tasks as npm scripts

By default, npm scripts in `NodeProject`s (or derivatives) are implemented by delegating the
command to the projen CLI:

```json
{
  "scripts": {
    "compile": "pnpm dlx projen compile"
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
project.tasks.tryFind("build")?.execArgs(["echo", "Build completed successfully."]);
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
