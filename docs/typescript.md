# TypeScript Projects

To create a new TypeScript project, use `projen new typescript`:

```shell
npx projen new typescript
```

This will synthesize a standard project directory structure with some sample
code.

```shell
├── src
│   ├── index.ts
├── test
│   ├── hello.test.ts
├── node_modules
├── package.json
└── tsconfig.json
```

The default options will set up your `tsconfig` root directory as `src` and your
out directory as `lib`. By default the `test` directory is not compiled to
JavaScript 

The `projen new` command will also generate a `.projenrc.js` file which includes
the definition of your project with any options you specified in the command
line:

```js
const { typescript } = require('projen');
  const project = new typescript.TypeScriptProject({
    defaultReleaseBranch: 'main',
    name: 'my-project',
  });
project.synth();
```

> At this point, projenrc is in JavaScript, but in the future we plan to allow
> specifying your project definitions in TypeScript.

To modify your project definitions, edit `.projenrc.js` and run `projen` again
to re-synthesize your project. The following sections describe the various
features of your TypeScript project.

## Migrating your TypeScript Project to Projen

Projen provides some opinionated defaults that may be different than the defaults
you rely on in your existing TypeScript Project. The most important is the default
project structure. Projen expects all source code to be in the `src` directory and
will write compiled `.js` and `.d.ts` files to the `lib` directory. Test files are
expected in the `test` directory and not compiled to javascript. Instead, Projen
configures `Jest` to compile `.ts` files when testing.

As this is only one of many structures for valid TypeScript projects, your migrated
project may not work out-of-the-box with Projen. We recommend that you take the
time to fully migrate to the expected project structure so that you can take full
advantage of Projen management on your repository.

However, you can also configure your `.projenrc.js` file to reflect your current
project structure. A `TypeScriptProject` exposes all options in a `tsConfig` file
so you can manually set the structure you want. Here is an example for specifying a
structure where the TypeScript compiler finds all TypeScript files recursively in your
repository:

```js
const { typescript } = require('projen');
const project = new typescript.TypeScriptProject({
  ...
  tsConfig: {
    compilerOptions: {
      rootDir: '.',
      outDir: '.',
    },
    include: ['**/*.ts'], // all typescript files recursively
  }
});
```