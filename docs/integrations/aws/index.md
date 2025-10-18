# AWS Cloud Projects

We support two types of projects for cloud development powered by the AWS Cloud
Development Kit (AWS CDK): **apps** and **libraries**. Apps represent complete
cloud applications while libraries vend constructs which can be consumed by
other libraries or by apps. Libraries are published to public or internal
package managers (npm, PyPI, Maven, NuGet, etc) while apps are deployed into AWS
environments.

This section describes features that are available in both cloud libraries and
applications.
See [AWS CDK Construct Library](../../project-types/aws-cdk-construct-library.md) and [AWS CDK Applications](../../api/awscdk.md) for specific details about libraries and applications.

## AWS Lambda Functions

AWS Lambda is a serverless compute platform which executes short running code
within a managed runtime environment.

To define AWS Lambda functions, create a file with a `.lambda.ts` suffix under
the source tree with AWS Lambda handler code.

For example, say we create `src/resize-image.lambda.ts` with the following
content:

```ts
export async function handler(event: any) {
  console.log('I am resizing the image now!');
}
```

Now run:

```sh
$ npx projen
```

You'll notice that a new file `src/resize-image-function.ts` has been added to
your project. This is a generated source file which exports a construct named
`ResizeImageFunction`. This construct is a subclass of
`@aws-cdk/aws-lambda.Function`, bound to your specific handler. This means that
you don't need to specify neither the `code` nor the `runtime` options when you
add it to your app:

```ts
import { ResizeImageFunction } from './resize-image-function.ts';

const handler = new ResizeImageFunction(this, 'ResizeImageFunction', {
  env: {
    FOO: '1234',
  },

  // all lambda options are supported...
});
```

Under the hood, we also added a compilation task to your project which creates a
.zip bundle for each handler. This bundle is created with
[esbuild](https://github.com/evanw/esbuild) and includes only your handler code
and all of its dependencies. This means that you can freely install and use any
dependencies in your project and use them in your handlers. You can manually
bundle your handler by executing the `bundle:HANDLER` or `bundle:watch:HANDLER`
tasks.

To customize this behavior for all functions, use `lambdaOptions` at the project
level. For example:

```ts
const { awscdk } = require('projen');

new AwsCdkConstructLibrary({
  // ...
  lambdaOptions: {
    // target node.js runtime
    runtime: awscdk.LambdaRuntime.NODEJS_22_X,

    bundlingOptions: {
      // list of node modules to exclude from the bundle
      externals: [ 'aws-sdk' ],
      sourcemap: true,
    }
  }
});
```

You can also disable auto-discovery by setting `lambdaAutoDiscover` to
`false` and then create explicitly add a `awscdk.LambdaFunction` component for
each function in your project. This will allow you to perform more
customizations as needed.

```ts
const { awscdk } = require('projen');

const p = new AwsCdkTypeScriptApp({
  lambdaAutoDiscover: false
});

new awscdk.LambdaFunction(p, {
  entrypoint: 'src/foo.lambda.ts', // .lambda.ts extension is still required
  runtime: aws_lambda.Runtime.NODEJS_12_X,
});
```

## AWS Lambda Extensions

An AWS [Lambda Extension][lambda-extensions-blog] is a way to integrate your
preferred development, monitoring, observability, and governance tools with
AWS Lambda.

Functionally, AWS [Lambda Extensions][lambda-extensions-blog] are long-running
executable files that reside in the `extensions` subdirectory of your code
asset. AWS Lambda executes all extensions before starting your handler's main
process. These AWS Lambda Extensions interact with your function's main process
and the [Lambda Extension API][lambda-extensions-api] to integrate with tools
outside the Lambda environment. Projen helps with bundling and preparing your
code as reusable Lambda Layers.

[lambda-extensions-blog]: https://aws.amazon.com/blogs/aws/getting-started-with-using-your-favorite-operational-tools-on-aws-lambda-extensions-are-now-generally-available/
[lambda-extensions-api]: https://docs.aws.amazon.com/lambda/latest/dg/runtimes-extensions-api.html

To create an AWS Lambda Extension with Projen:

- Create a file in your project's source tree called
  `my-extension.lambda-extension.ts`
- Run `npx projen`
- Projen will automatically discover this file, generating an AWS Lambda Layer
  Version named `MyExtensionLayerVersion` in a file named
  `my-extension-layer-version.ts`.
- Now you can instantiate `MyExtensionLayerVersion` and add it to your Lambda
  functions.

Offical AWS extension examples are available in the [AWS Samples][ext-samples]
repository.

[ext-samples]: https://github.com/aws-samples/aws-lambda-extensions

**Example of an extension:**

A skeleton for a Lambda extension follows below. Comments with `TODO` describe
locations where you can provide your custom functionality.

```ts
#!/usr/bin/env node
// ^ Don't forget this shebang - Lambda executes the bundled version of this
// file directly and doesn't otherwise know it's a node script.

import { basename } from 'path';

// This example uses the `got` HTTP client and assumes that you have included
// `got` in your `devDependencies`. But, you can use any HTTP client you like.
import got from 'got';

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
        // shut down. You might do things here like de-registering
        // your extension from your external tooling.
        return 0;

      case ExtensionEventType.INVOKE:
        // TODO: Do something every time your function is invoked,
        // such as re-establishing a connection with your external
        // tooling after the Lambda has thawed from a period of
        // freezing due to inactivity.
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

Files in the `test/` tree with the `.integ.ts` suffix are recognized as
*integration snapshot tests*.

Each test is a simple CDK app (e.g. calls `app.synth()`) which exercises certain
construct(s) within the project. A test is considered passing if the app can be
successfully deployed.

To create/update the snapshot, developers are expected to execute the task
`integ:NAME:deploy` with AWS credentials for their personal development
environment. This task will deploy the test app to their account. Upon
successful deployment (i.e. the test passed), the snapshot will be captured and
stored under a directory called `xxx.integ.snapshot` next to the test
entrypoint. This directory should be committed to the repository.

During builds (either local or within a workflow), the task `integ:NAME:assert`
will be executed. This task synthesizes the test app and compares the output to
the captured snapshot. The build will fail if the output differs.

For each integration test, the following set of tasks are created:

| Task                  | Description                                                                                                |
| --------------------- | ---------------------------------------------------------------------------------------------------------- |
| `integ:NAME:deploy`   | Deploys & destroys the test app and updates the snapshot.                                                  |
| `integ:NAME:assert`   | Synthesizes the test app and compares it with the snapshot (this is the task that runs during build)       |
| `integ:NAME:snapshot` | Synthesizes the test app and updates the snapshot (not recommended to use because it bypasses deployment). |
| `integ:NAME:destroy`  | Destroys a previously deployed test app.                                                                   |

### Writing test assertions

You can write your test assertions as AWS Lambda handlers and use the AWS CDK
[triggers][cdk-trigger-docs] module to execute them as part of the deployment.

Here is an example of a test:

```ts
import { App,Stack } from '@aws-cdk/core';
import { Trigger } from '@aws-cdk/triggers';
import { ConstructUnderTest } from '../src';
import { AssertSomeStuffFunction } from './assert-some-stuff-function.ts'; // <-- generated

const app = new App();
const stack = new Stack(app, 'Test');

// this is the construct we want to test
const testee = new ConstructUnderTest(stack, 'ConstructUnderTest');

// execute a lambda handler with some assertions after all testee
// resources are created
new Trigger(stack, 'RunAssertions', {
  executeAfter: [testee],
  handler: new AssertSomeStuffFunction(stack, 'AssertSomeStuffFunction', {
    env: {
      URL: testee.url // <-- some reference to the created construct
    }
  }),
});
```

[cdk-trigger-docs]:https://docs.aws.amazon.com/cdk/api/v1/docs/triggers-readme.html

## Experimental `integ-runner` integration tests

For TypeScript-based AWS CDK projects, Projen provides experimental support
for using the [`integ-runner`][integ-runner] tool and [library][integ-library]
for integration testing. To enable this feature, you specify
`experimentalIntegRunner: true` in your project options.

[integ-runner]: https://github.com/aws/aws-cdk/tree/main/packages/%40aws-cdk/integ-runner
[integ-library]: https://docs.aws.amazon.com/cdk/api/v2/docs/integ-tests-alpha-readme.html

```typescript
import { awscdk } from 'projen';

new awscdk.AwsCdkConstructLibrary({
  // ...
  experimentalIntegRunner: true
});
```

After enabling experimental `integ-runner` support, all `integ.*.ts` files in
the `test` directory will be automatically discovered and treated as
integration tests. Projen will check that these integration tests match the
committed snapshots at build-time, or whenever the test task is run.

Projen also provides two new commands:

`projen integ [...test names]` - Verifies integration test snapshots. If test
names are provided, only the provided integration tests will be checked.
Otherwise, all integration tests will be checked.

`projen integ:update [...test names]` - Verifies integration test snapshots or
updates the integration test snapshot by re-running the integration test on
failure. Like `projen integ`, you may specify zero or more test names.

> Tests are named based on their file path. For instance, with an integration
> test contained in `test/r53writer/integ.ddbStreamHandler.ts`, the test name
> is `r53writer/integ.ddbStreamHandler`, and you could update the test's
> snapshot by running `projen integ:update r53writer/integ.ddbStreamHandler`.

## Watch

> Only relevant for app projects

The `watch` command will use [cdk watch] in order to trigger deployments (with
opportunistic hot-swapping) when source files or asset bundles are updated.
`cdk.json` will automatically be configured to watch both source code changes
and bundles, and rebuild bundles as needed.

[cdk watch]: https://aws.amazon.com/blogs/developer/increasing-development-speed-with-cdk-watch/

To start watching, set up your environment with AWS credentials and `AWS_REGION`
pointing to your development AWS account and execute:

```sh
npx projen watch
```

This will:

- Bundle your assets (if you have any).
- Perform an initial deployment of your app into your development environment.
- Start watching for changes.

If you change a source file in your project, this change will be picked up by
`cdk watch`, assets will be re-bundled and a hotswap deployment will be
performed. For example, if you only change some AWS Lambda code, the CDK CLI
will simply update the AWS Lambda service with the location of your new code
bundle instead of going through an AWS CloudFormation deployment.

## Roadmap

- Additional bundling targets: web apps, ECS
- Local execution for AWS Lambda, ECS containers, Step Functions
- Support different provisioning engines (CloudFormation/Terraform) using Terraform L2 support
- Generate types for strong-typing AWS Lambda/ECS environment bindings.
