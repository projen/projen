---
sidebar_position: 3
---

# Create an Angular Application

This quick start will help you create an [Angular.js](https://angular.io/) TypeScript application.
We'll be using Angular's 'Hello World' project as a starting point, then bringing it under projen
management.

To begin, make sure you have the version of NodeJS you want to use set up in your terminal.
Running `which node` in bash/zsh/other POSIX shells, or `Get-Command node` in Powershell,
should print the path to the NodeJS version you want to use. [`nvm`](https://github.com/nvm-sh/nvm)
is a popular tool for managing multiple versions of Node on a single machine.
To select a version, run `nvm use <version>`.

Run `npm i @angular/cli` to install the Angular CLI. Next, run
`npx ng new --create-application true hello-world` to initialize the hello-world project.
Then run `cd hello-world` to enter the project directory.

```shell
npm i @angular/cli
npx ng new --create-application true hello-world
cd hello-world
```

Follow the prompts and within a few minutes, you'll get an Angular project structure with sample
code.

## Bringing it under projen management

Now that we have a working Angular project, we'll bring it under projen management. We'll start
by making a backup of files that will be overwritten by projen:

```shell
mv package.json package.json.bak
mv README.md README.md.bak
mv .gitignore .gitignore.bak
```

To create a new TypeScript project, use `npx projen new typescript`:

```shell
npx projen new typescript
```

Most of the `npx projen default` command that runs after project initialization will work, but
it will fail when trying to reference packages that are no longer in `package.json`. We'll fix
that next.

In your favorite editor/IDE, open `package.json.bak`. Open `.projenrc.ts` in a separate tab or window.

You'll see a TypeScript file that looks like this:

```ts
import { typescript } from "projen";
const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: "main",
  name: "hello-world",
  projenrcTs: true,

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();
```

Uncomment the line starting with `// deps:` and add the Angular dependencies from `package.json.bak`. For example,
`"@angular/animations": "^16.2.0"` should become `"@angular/animations@^16.2.0"`. Do the same for `devDeps` and
add them all to the appropriate place in the `.projenrc.ts` file.

:::info
Your versions will very likely be different - convert what you get from the CLI to the format
shown below.
:::

```ts
import { typescript } from "projen";
const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: "main",
  name: "hello-world",
  projenrcTs: true,

  deps: [
    "@angular/animations@^16.2.0",
    "@angular/common@^16.2.0",
    "@angular/compiler@^16.2.0",
    "@angular/core@^16.2.0",
    "@angular/forms@^16.2.0",
    "@angular/platform-browser@^16.2.0",
    "@angular/platform-browser-dynamic@^16.2.0",
    "@angular/router@^16.2.0",
    "rxjs@~7.8.0",
    "tslib@^2.3.0",
    "zone.js@~0.13.0",
  ],
  devDeps: [
    "@angular-devkit/build-angular@^16.2.6",
    "@angular/cli@^16.2.6",
    "@angular/compiler-cli@^16.2.0",
    "@types/jasmine@~4.3.0",
    "jasmine-core@~4.6.0",
    "karma@~6.4.0",
    "karma-chrome-launcher@~3.2.0",
    "karma-coverage@~2.2.0",
    "karma-jasmine@~5.1.0",
    "karma-jasmine-html-reporter@~2.1.0",
    "typescript@~5.1.3",
  ],
});
project.synth();
```

Run `npx projen` to install the Angular dependencies.

## Set up tasks

Next, we'll set up some task scripts to make it easier to run our Angular application. Above
the `project.synth()` line, add the following:

```ts
project.addTask("ng", { exec: "ng", receiveArgs: true });
project.addTask("start", { exec: "ng serve", receiveArgs: true });
// projen already has build, but it calls compile, which is empty
project.tasks.tryFind("compile")?.reset("ng build", { receiveArgs: true });
project.addTask("ng:watch", {
  exec: "ng build --watch --configuration development",
  receiveArgs: true,
});
project.tasks.tryFind("test")?.reset("ng test", { receiveArgs: true });
project.addTask("e2e", { exec: "ng e2e", receiveArgs: true });

project.synth();
```

Let's go over the two types of tasks we've added here:

### project.addTask()

When you're adding an entirely new task, you'll use `project.addTask()`. This method takes two
arguments: the name of the task, and an object with the task's configuration. The `exec` property
is the command that will be run when you run the task. The `receiveArgs` property tells projen
whether to pass any arguments you provide to the task to the command. For example, if you run
`npx projen start --port 3000`, projen will run `ng serve --port 3000`.

### project.tasks.tryFind()?.reset()

When you're modifying an existing task, you'll use `project.tasks.tryFind().reset()`. Generally,
you'll want to do this when projen already has the task you're looking for defined in the
`.projen/tasks.json` file. If the task doesn't have an `exec` parameter, you can simply reset it
as we've done here.
If it does, which is the case with `build`, it becomes more complicated. [Read the docs on
tasks](/docs/concepts/tasks/) for more information on those cases.

:::info
Challenge yourself - would you use addTask() or reset() to add an `ng lint` task?
:::

## gitignore

Projen offers a way to easily update the contents of `.gitignore` in the project definition.
The `gitignore` parameter takes an array of strings, each of which will be added to `.gitignore`.
If you'd like to simply append your `.gitignore.bak` file, split it on newlines and pass it to
`gitignore`. Alternately, you could do a diff between `.gitignore` and `.gitignore.bak` and
add the new lines to `gitignore`.

Example:

```ts
  gitignore: [
    '# Compiled output',
    '/dist',
    '/tmp',
    '/out-tsc',
    '/bazel-out',
    '',
    '# Node',
    '/node_modules',
    'npm-debug.log',
    'yarn-error.log',
    '',
    '# IDEs and editors',
    '.idea/',
    '.project',
    '.classpath',
    '.c9/',
    '*.launch',
    '.settings/',
    '*.sublime-workspace',
    '',
    '# Visual Studio Code',
    '.vscode/*',
    '!.vscode/settings.json',
    '!.vscode/tasks.json',
    '!.vscode/launch.json',
    '!.vscode/extensions.json',
    '.history/*',
    '',
    '# Miscellaneous',
    '/.angular/cache',
    '.sass-cache/',
    '/connect.lock',
    '/coverage',
    '/libpeerconnection.log',
    'testem.log',
    '/typings',
    '',
    '# System files',
    '.DS_Store',
    'Thumbs.db',
  ],
```

Run `npx projen` and you'll see the contents of `.gitignore` have been updated.

## README.md

`README.md` is not managed by projen's TypeScript project. Feel free to update it without
worrying about projen overwriting it.

That's it! You now have a working Angular application under projen management. Type
`npx projen start` to see the application in your browser.
