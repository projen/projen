# Subprojects

* Pass a project to the `parent` prop
* `outdir` must be specified in project props for a subproject

## Example Subproject

```js
// .projenrc.js

const { AwsCdkTypeScriptApp, web } = require('projen');

const nextProject = new web.NextJsProject({
  name: 'my-frontend'
});

nextProject.synth();

const pipelineProject = new AwsCdkTypeScriptApp({
  name: 'my-frontend-pipeline',
  parent: nextProject,
  outdir: 'pipeline',

  cdkVersion: '1.78.0',
  cdkDependencies: [
    '@aws-cdk/aws-cloudfront',
    '@aws-cdk/aws-s3',
    '@aws-cdk/aws-s3-deployment',
    '@aws-cdk/core'
  ]
});

pipelineProject.synth();
```

By default, GitHub workflows will not be created for subprojects since config
files in `.github/` only work if they are in the root directory.
