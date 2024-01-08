---
sidebar_position: 1
---

# Hello World with NodeJS

This quick start will help you create a NodeJS application using projen's NodeJS project.
To begin, make sure you have the version of NodeJS you want to use set up in your terminal.
Running `which node` in bash/zsh/other POSIX shells, or `Get-Command node` in Powershell,
should print the path to the NodeJS version you want to use. [`nvm`](https://github.com/nvm-sh/nvm)
is a popular tool for managing multiple versions of Node on a single machine.
To select a version, run `nvm use <version>`.

To create a new NodeJS project, use `npx projen new node`:

```shell
npx projen new node --name=my-project
```

This will synthesize a standard project directory structure. Notably, the projen NodeJS project will not create
sample code for you by default - you need to add your `src` or other code directory, as well as any tests and
test libraries you want.

To add libraries, open `.projenrc.js` and add them to the `deps` array. For example, to add the `aws-sdk` library,
add the following line to `.projenrc.js`:

```js
const project = new NodeProject({
  // ...
  deps: ["aws-sdk"],
  // ...
});
```

Then re-run `npx projen` to install the library.

The Jest test framework can be added by adding the `jest` library to the `devDeps` array:

```js
const project = new NodeProject({
  // ...
  devDeps: ["jest"],
  // ...
});
```

Again, re-run `npx projen` to install the libraries.

That's it! The NodeJS project is very basic, but serves as the base class for many other types of JavaScript
or TypeScript projects.
