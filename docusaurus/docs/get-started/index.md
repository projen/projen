---
sidebar_position: 1
---

# Getting Started

_projen_ doesn't need to be installed. You will be using [npx](https://docs.npmjs.com/cli/v7/commands/npx) to run _projen_ which takes care of all required setup steps.

:::tip
To make things easier from here on out, we recommend you create an alias for projen:

```shell
$ alias pj="npx projen"
```

You can add this to your shell's startup script (e.g. `~/.bashrc` or `~/.zshrc`).
However, these docs will always spell it out in case you're not a fan of aliasing things.
:::

To create a new project, run the following command and follow the instructions:

```console
$ mkdir my-project
$ cd my-project
$ npx projen new PROJECT-TYPE
🤖 Synthesizing project...
...
```

## Modifying projen configuration

From here on out, all the changes to files managed by projen will be done in the projen RC file. 
Depending on the project type you chose, the filename will be a little different, but will always start with 
`.projenrc`. 

For example, if you chose the `node` project type, the file will be `.projenrc.js`. 
If you chose the `typescript` project type, the file will be `.projenrc.ts`.
If you chose the `python` project type, the file will be `.projenrc.py`.

Editing configuration will be done by editing this RC file. For example, if you needed to add the 'uuid' dependency
to your typescript app:

```typescript
// .projenrc.ts
import { typescript } from 'projen';
const project = new typescript.TypeScriptAppProject({
  defaultReleaseBranch: 'main',
  name: 'my-project',
  projenrcTs: true,
  deps: ['uuid'],
});
project.synth();
```

After edits are made, re-run `npx projen` to apply the changes.
projen will then re-read the RC file and modify any of the files under its control to match the new configuration. 
Files not created by projen will remain untouched. 

In the example above, it will add `uuid` to the package.json file,
and then re-run the package manager to install it.

:::tip
If you are making frequent changes to your .projenrc file you can use the `--watch` option to have projen automatically
re-run whenever the file changes:

```shell
$ npx projen --watch
```
:::




