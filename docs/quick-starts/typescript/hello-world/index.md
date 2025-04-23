---
sidebar_position: 1
---

# Hello World with TypeScript

To create a new TypeScript project, use `npx projen new typescript`:

```shell
npx projen new typescript
```

This will create a `.projenrc.ts` file which defines your project.

`npx projen new` will synthesize a standard project directory structure with some sample
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
JavaScript and instead compiled when `npx projen test` is executed.

The `npx projen new` command will also generate a `.projenrc.js` file which includes
the definition of your project with any options you specified in the command
line:

```js
const { typescript } = require("projen");
const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: "main",
  name: "my-project",
});
project.synth();
```

To modify your project definitions, edit `.projenrc.ts` and run `projen` again
to re-synthesize your project. The following sections describe the various
features of your TypeScript project.

## Dependencies

You can specify dependencies in your project via the `deps`, `devDeps`, and
`peerDeps` options similar to what you might expect in a `package.json` file.

The recommendation is to only specify the module name here (e.g. `express`).
This will behave similar to yarn add or npm install in the sense that it will
add the module as a dependency to your package.json file with the latest version
(`^`). You can specify semver requirements in the same syntax passed to npm i or
yarn add (e.g. `express@^2`) and this will be what your `package.json` will
eventually include.

## Migrating your TypeScript Project to Projen

Projen provides some opinionated defaults that may be different than the defaults
you rely on in your existing TypeScript Project. This section attempts to document
some of the common themes to look out for when migrating an existing TypeScript
project to Projen.

## Migrating .projenrc.js to .projenrc.ts

If you'd like to upgrade an existing project that was creating using a JS-based
projen RC file (.projenrc.js) to a TS-based projen RC file (.projenrc.ts):

1. Add `projenrcTs: true` to your project.
2. Run `npx projen`.
3. Rename `.projenrc.js` to `.projenrc.ts`.
4. Update `require`s to `import`s.
5. Run `npx projen`.

### Default Directory Structure

The most important is the default project structure. Projen expects all source code
to be in the `src` directory and will write compiled `.js` and `.d.ts` files to the
`lib` directory. Test files are expected in the `test` directory and not compiled
to javascript. Instead, Projen configures `Jest` to compile `.ts` files when testing.

As this is only one of many structures for valid TypeScript projects, your migrated
project may not work out-of-the-box with Projen. We recommend that you take the
time to fully migrate to the expected project structure so that you can take full
advantage of Projen management on your repository.

However, you can also configure your `.projenrc.js` file to reflect your current
project structure. A `TypeScriptProject` exposes all options in a `tsconfig` file
so you can manually set the structure you want. Here is an example for specifying a
structure where the TypeScript compiler finds all TypeScript files recursively in your
repository:

```js
const { typescript } = require('projen');
const project = new typescript.TypeScriptProject({
  ...
  tsconfig: {
    compilerOptions: {
      rootDir: '.',
      outDir: '.',
    },
    include: ['**/*.ts'], // all typescript files recursively
  },
});
```

### Dependency Versions

As described in the section above, Projen recommends that you list your dependencies
only by module name and have Projen install the latest version of the package. A
consequence of this recommendation is that when migrating, you may unknowingly update
your dependencies to incompatible versions. You can always provide specific semver
requirements (e.g. `express@2.1.0`) if necessary.
