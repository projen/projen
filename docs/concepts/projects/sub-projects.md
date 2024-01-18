---
sidebar_position: 5
---

# Subprojects

Subprojects are a way to define additional and separate projects within a single projenrc file. 
This is especially useful when you want to use multiple project types within the same codebase, like a [monorepo](https://monorepo.tools/).

For example, you may have a Next.js website that is deployed to AWS using the CDK to define the Infrastructure as Code.
You would want both the Next.js website and AWS CDK project to be managed by projen. 

Start by creating the project which represent the root directory project.
Then, create a second project and pass the first project in as the `parent` of the second project and set the `outdir` to the subdirectory you'd like the project to reside in.
This makes the second project a subproject of the first.
Finally, call the `.synth()` on both projects.

## Example

```js
// .projenrc.js

const { AwsCdkTypeScriptApp, web } = require('projen');

const nextProject = new web.NextJsProject({
  name: 'my-frontend'
});

const pipelineProject = new AwsCdkTypeScriptApp({
  name: 'my-frontend-pipeline',
  parent: nextProject,
  outdir: 'pipeline',
  cdkVersion: '2.100.0',
});

nextProject.synth();
pipelineProject.synth();
```

:::note
By default, GitHub workflows will not be created for subprojects since config
files in `.github/` only work if they are in the root directory.
:::
