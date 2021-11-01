# AWS Lambda Functions

Projen supports authoring Node.js AWS Lambda functions in AWS CDK libraries and
apps.

This includes:

- Seamlessly produce JavaScript bundles with all dependencies as part during
  build.
- Generates source code for an AWS CDK construct for your function that is
  pre-connected to your bundled handler code.

## Usage

In AWS CDK projects (`awscdk-construct` or `awscdk-app-ts`), AWS Lambda
functions are automatically created for each `.lambda.ts` file in your source
tree.

First create a TypeScript source file with your AWS Lambda handler code. The
file must have a `.lambda.ts` suffix and reside under the source tree and
include a standard AWS Lambda handler file which exports the `handler` function.

`src/resize-image.lambda.ts`:

```ts
export async function handler(event: any) {
  console.log('I am resizing the image now!');
}
```

Now, simply run:

```sh
$ npx projen
```

The following will happen:

1. A new task called `bundle:resize-image` will be added to your project. This
   task uses `esbuild` to produce a JavaScript bundle with your handler code and
   all of its dependencies. The bundled output will be emitted under
   `lib/resize-image.bundle/index.js`.
2. A file will be generated under `src/resize-image-function.ts` which includes
   the code for a construct called `ResizeImageFunction`. This construct extends
   the `@aws-cdk/aws-lambda.Function` class and bound to your handler.

To refer to your AWS Lambda function from your CDK code, simply import this
class and add it to your app:

```ts
import { ResizeImageFunction } from './resize-image-function.ts';

const handler = new ResizeImageFunction(this, 'ResizeImageFunction', {
  env: {
    FOO: '1234',
  },

  // all lambda options are supported...
});
```

## Options

The `lambdaOptions` option can be used to configure all AWS Lambda functions in your project.

These are the defaults:

```ts
const { awscdk } = require('projen');

new AwsCdkConstructLibrary({
  // ...
  lambdaOptions: {
    // target node.js runtime
    runtime: awscdk.LambdaRuntime.NODEJS_14_X,

    // list of node modules to exclude from the bundle
    externals: [ 'aws-sdk' ]
  }
});
```

## Auto-discovery

As mentioned above, an AWS Lambda function will be created for every
`.lambda.ts` file in your source tree. To disable auto-discovery, set
`lambdaAutoDiscover` to `false` and then you can manually add
`awscdk.LambdaFunction` to your project:

```ts
const { awscdk } = require('projen');

const p = new AwsCdkTypeScriptApp({
  lambdaAutoDiscover: false
});

new awscdk.LambdaFunction(p, {
  srcdir: p.srcdir,
  libdir: p.libdir,
  entrypoint: 'src/foo.lambda.ts', // .lambda.ts extension is still required
  runtime: aws_lambda.Runtime.NODEJS_12_X,
});
```
