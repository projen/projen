# AWS Cloud Projects

This README provides an overview of AWS Cloud projects powered by the AWS Cloud Development Kit (AWS CDK). These projects support two primary types: **apps** and **libraries**. Apps represent complete cloud applications, while libraries provide constructs that can be consumed by other libraries or apps. Libraries can be published to public or internal package managers (e.g., npm, PyPI, Maven, NuGet), whereas apps are deployed into AWS environments.

## Table of Contents

- [AWS Lambda Functions](#aws-lambda-functions)
- [AWS Lambda Extensions](#aws-lambda-extensions)
- [Integration Snapshot Tests](#integration-snapshot-tests)
- [Experimental `integ-runner` Integration Tests](#experimental-integ-runner-integration-tests)
- [Watch](#watch)
- [Roadmap](#roadmap)

## AWS Lambda Functions

AWS Lambda is a serverless compute platform that executes short-running code within a managed runtime environment. To define AWS Lambda functions, follow these steps:

1. Create a file with a `.lambda.ts` suffix under the source tree with AWS Lambda handler code. For example:

```ts
export async function handler(event: any) {
  console.log('I am resizing the image now!');
}
```

2. Run the following command to generate the Lambda function construct:

```sh
$ npx projen
```

A new file named `src/resize-image-function.ts` will be added to your project. This generated source file exports a construct named `ResizeImageFunction`, which is a subclass of `@aws-cdk/aws-lambda.Function`. This construct is bound to your specific handler, eliminating the need to specify the `code` and `runtime` options when adding it to your app:

```ts
import { ResizeImageFunction } from './resize-image-function.ts';

const handler = new ResizeImageFunction(this, 'ResizeImageFunction', {
  env: {
    FOO: '1234',
  },
  // All Lambda options are supported...
});
```

Under the hood, a compilation task is added to your project to create a `.zip bundle` for each handler using [esbuild](https://github.com/evanw/esbuild). This bundle includes only your handler code and its dependencies. This allows you to freely install and use any dependencies in your project and use them in your handlers. You can manually bundle your handler by executing the `bundle:HANDLER` or `bundle:watch:HANDLER` tasks.

To customize this behavior for all functions, use `lambdaOptions` at the project level. For example:

```ts
const { awscdk } = require('projen');

new AwsCdkConstructLibrary({
  // ...
  lambdaOptions: {
    // Target Node.js runtime
    runtime: awscdk.LambdaRuntime.NODEJS_18_X,

    bundlingOptions: {
      // List of Node modules to exclude from the bundle
      externals: ['aws-sdk'],
      sourcemap: true,
    },
  },
});
```

You can also disable auto-discovery by setting `lambdaAutoDiscover` to `false`. Then, explicitly add an `awscdk.LambdaFunction` component for each function in your project to allow more customizations as needed:

```ts
const { awscdk } = require('projen');

const p = new AwsCdkTypeScriptApp({
  lambdaAutoDiscover: false,
});

new awscdk.LambdaFunction(p, {
  entrypoint: 'src/foo.lambda.ts', // .lambda.ts extension is still required
  runtime: aws_lambda.Runtime.NODEJS_12_X,
});
```

## AWS Lambda Extensions

AWS Lambda Extensions are a way to integrate your preferred development, monitoring, observability, and governance tools with AWS Lambda. They are long-running executable files residing in the `extensions` subdirectory of your code asset. AWS Lambda executes all extensions before starting your handler's main process. These extensions interact with your function's main process and the [Lambda Extension API](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-extensions-api.html) to integrate with tools outside the Lambda environment.

To create an AWS Lambda Extension with Projen:

1. Create a file in your project's source tree called `my-extension.lambda-extension.ts`.
2. Run `npx projen`.

Projen will automatically discover this file and generate an AWS Lambda Layer Version named `MyExtensionLayerVersion` in a file named `my-extension-layer-version.ts`. You can now instantiate `MyExtensionLayerVersion` and add it to your Lambda functions.

Example of an extension:

```ts
#!/usr/bin/env node
// ^ Don't forget this shebang - Lambda executes the bundled version of this
// file directly and doesn't otherwise know it's a node script.

import { basename } from 'path';
import got from 'got'; // You can use any HTTP client you prefer.

/**
 * Your Lambda Extension's main loop
 */
async function main() {
  const extensionInfo = await registerExtension([
    ExtensionEventType.SHUTDOWN,
    ExtensionEventType.INVOKE,
  ]);

  // TODO: Put your initialization code here. You can do things like
  // testing a connection to your external tooling here.

  while (true) {
    const event = await getNextEvent(extensionInfo.extensionId);

    switch (event.eventType) {
      case ExtensionEventType.SHUTDOWN:
        // TODO: Do something when the lambda extension is being
        // shut down, like de-registering from your external tooling.
        return 0;

      case ExtensionEventType.INVOKE:
        // TODO: Do something every time your function is invoked,
        // such as re-establishing a connection with your external tooling.
        break;

      default:
        console.log(`Unhandled event type ${event.eventType}`);
    }
  }
}

const EXTENSION_API_BASE_URL = `http://${process.env.AWS_LAMBDA_RUNTIME_API}/2020-01-01/extension`;

enum ExtensionEventType {
  INVOKE = 'INVOKE',
  SHUTDOWN = 'SHUTDOWN',
}

interface ExtensionEvent {
  readonly eventType: ExtensionEventType;
  // For complete event structures, see:
  // https://docs.aws.amazon.com/lambda/latest/dg/runtimes-extensions-api.html
}

async function registerExtension(events: ExtensionEventType[]) {
  // Do not set a timeout on the GET call, as the extension can be suspended
  // for a period of time until there is an event to return.
  const res = await got.post(`${EXTENSION_API_BASE_URL}/register`, {
    json: { events },
    headers: {
      'Lambda-Extension-Name': basename(__filename),
    },
  });

  const header = res.headers['lambda-extension-identifier'];
  const extensionId = Array.isArray(header) ? header[0] : header;
  const json = JSON.parse(res.body);

  return {
    extensionId,
    functionName: json.functionName as string,
    functionVersion: json.functionVersion as string,
  };
}

function getNextEvent(extensionId: string): Promise<ExtensionEvent> {
  return got(`${EXTENSION_API_BASE_URL}/event/next`, {
    headers: {
      'Lambda-Extension-Identifier': extensionId,
    },
  }).json();
}

main()
  .then(statusCode => {
    process.exit(statusCode);
  })
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
```

## Integration Snapshot Tests
