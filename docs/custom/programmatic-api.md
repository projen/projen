---
sidebar_position: 3
---

# Programmatic API

Projen exposes a programmatic API that allows you to create new projects through
code instead of the regular CLI command `npx projen new`. This allows projen to
be used to create new projects within scripts and other contexts.

## Example

```js
const { Projects } = require('projen');

Projects.createProject({
  dir: '/path/to/mydir',
  projectFqn: 'projen.typescript.TypeScriptProject',
  projectOptions: {
    name: 'my-test-project',
    defaultReleaseBranch: 'main',
    projenrcTs: true,
    eslintOptions: {
      dirs: ['src', 'test'],
      prettier: true,
      aliasMap: {
        '@src': './src',
        '@components': './src/components',
      },
    },
  },
  post: false,
  // synth: true (default)
  // optionHints: 'featured' (default)
});
```

This script creates a new TypeScript project at `/path/to/mydir` in my file
system. The `.projenrc.ts` file it generates comes pre-included with options
specified, including complex values for fields that cannot normally be provided
through the CLI, like `eslintOptions` (because the field requires an object
value).

In the above example, the provided option `post: false` was also added to
disable post-installation steps such as installing NPM dependencies.

> **Note:** It is important that you provide all fields that are required by the
project type, otherwise the project may not synthesize properly.

It is also possible to use this for installing external project types.
Currently, this requires you to install the package so that it can be used by
projen.

```js
Projects.createProject({
  // ...
  projectFqn: '@myorg/my-package.MyJsiiProject',
});
```
