# AWS CDK Components

## Pre-bundled AWS Lambda Functions

The `LambdaFunction` component can be used to create pre-bundled AWS Lambda
functions for AWS CDK libraries and application.

> At the moment, it only supports TypeScript projects but additional languages are planned.

To use this component, first create your handler code with a `.lambda.ts` suffix under
the source tree. This is a standard AWS Lambda handler file in TypeScript which exports the `handler` function:

`src/resize-image.lambda.ts`:

```ts
export async function handler(event: any) {
  console.log('I am resizing the image now!');
}
```

Now, add this to your projenrc file:

```ts
new LambdaFunction(project, {
  entrypoint: 'src/resize-image.lambda.ts'
});
```

Now, run:

```sh
$ projen
```

The following will happen:

1. A new task will be added to your project called `bundle:resize-image` which
   will use `esbuild` to produce a `.js` bundle with your handler code and all
   of its dependencies. The bundled output will be emitted under
   `lib/resize-image.bundle/index.js`.
2. A new _source file_ will be generated under `src/resize-image-function.ts`. This file
   will include a generated construct called `ResizeImageFunction` which extends
   `@aws-cdk/aws-lambda.Function` and bound to your handler.

In your AWS CDK construct or app code, simply import this construct and add it
to your app:

```ts
import { ResizeImageFunction } from './resize-image-function.ts';

const handler = new ResizeImageFunction(this, 'ResizeImageFunction', {
  env: {
    FOO: '1234',
  },

  // all lambda options are supported...
});
```
