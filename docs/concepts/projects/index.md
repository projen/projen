# Projects

Projects are the top level component in projen and the entry point for all other components.
They encompass many components, represent a specific type of codebase, and are opinionated, yet flexible.

For example, the [AwsCdkTypeScriptApp](/docs/api/awscdk#awscdktypescriptapp-) represents an [AWS CDK](https://aws.amazon.com/cdk/) application written in TypeScript. 
It includes opinionated defaults for the location of source files, the testing framework to use, and automation tools using GitHub Actions. 
While many of the specifics can be customized, the project type itself is opinionated and will always produce a codebase that is consistent with other projects of the same type.

There are many different types of projects that ship with projen, and you can also create your own.
Projects that ship with projen are grouped into namespaces, such as 'awscdk', 'java', and 'typescript'.
In the [Getting Started](/docs/getting-started), the [TypescriptAppProject](/docs/api/typescript#typescriptappproject-) was used, which comes from the `typescript` namespace.

```typescript
import { typescript } from 'projen';
const project = new typescript.TypeScriptAppProject({
  defaultReleaseBranch: 'main',
  name: 'my-project',
  projenrcTs: true,
  deps: ['express'], // added 'express' to the deps array
});
project.synth();
```

This produces a baseline Typescript application and adds the express dependency to the `package.json` file.
