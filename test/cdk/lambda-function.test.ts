import { join } from 'path';
import { cdk, TypeScriptProject } from '../../src';
import { synthSnapshot } from '../util';

describe('bundled function', () => {
  let generatedSource: string;
  let tasks: Record<string, any>;

  beforeEach(() => {
    const project = new TypeScriptProject({
      name: 'hello',
      defaultReleaseBranch: 'main',
    });

    new cdk.LambdaFunction(project, {
      entrypoint: join('src', 'hello.lambda.ts'),
    });

    const snapshot = synthSnapshot(project);
    generatedSource = snapshot['src/hello.ts'];
    tasks = snapshot['.projen/tasks.json'].tasks;
  });

  test('generates source code for a lambda construct', () => {
    expect(generatedSource).toMatchSnapshot();
  });

  test('creates a single project-wide bundle task', () => {
    expect(tasks.bundle).toEqual({
      description: 'Bundle assets',
      name: 'bundle',
      steps: [{ spawn: 'bundle:hello' }],
    });

  });

  test('creates a specific bundle task for this function', () => {
    expect(tasks['bundle:hello']).toEqual({
      description: 'Create an AWS Lambda bundle from src/hello.lambda.ts',
      name: 'bundle:hello',
      steps: [
        {
          exec: 'esbuild --bundle src/hello.lambda.ts --target="node14" --platform="node" --outfile="lib/hello.bundle/index.js" --external:aws-sdk',
        },
      ],
    });

  });

  test('spawns the bundle task as part of compilation', () => {
    expect(tasks.compile).toEqual({
      description: 'Only compile',
      name: 'compile',
      steps: [
        { exec: 'tsc --build' },
        { spawn: 'bundle' },
      ],
    });

  });
});

test('fails if entrypoint does not have the .lambda suffix', () => {
  const project = new TypeScriptProject({
    name: 'hello',
    defaultReleaseBranch: 'main',
  });

  expect(() => new cdk.LambdaFunction(project, {
    entrypoint: join('src', 'hello-no-lambda.ts'),
  })).toThrow('hello-no-lambda.ts must have a .lambda.ts extension');
});

test('fails if entrypoint is not under the source tree', () => {
  const project = new TypeScriptProject({
    name: 'hello',
    defaultReleaseBranch: 'main',
  });

  expect(() => new cdk.LambdaFunction(project, {
    entrypoint: join('boom', 'hello-no-lambda.ts'),
  })).toThrow('boom/hello-no-lambda.ts must be under src');
});

test('constructFile and constructName can be used to customize the generated construct', () => {
  const project = new TypeScriptProject({
    name: 'hello',
    defaultReleaseBranch: 'main',
  });

  new cdk.LambdaFunction(project, {
    entrypoint: join('src', 'hello.lambda.ts'),
    constructFile: 'my-construct.ts',
    constructName: 'MyConstruct',
  });

  const snapshot = synthSnapshot(project);
  const generatedSource = snapshot['src/my-construct.ts'];
  expect(generatedSource).toMatchSnapshot();
});

test('runtime can be used to customize the lambda runtime and esbuild target', () => {
  const project = new TypeScriptProject({
    name: 'hello',
    defaultReleaseBranch: 'main',
  });

  new cdk.LambdaFunction(project, {
    entrypoint: join('src', 'hello.lambda.ts'),
    runtime: cdk.LambdaFunctionRuntime.NODEJS_12_X,
  });

  const snapshot = synthSnapshot(project);
  const generatedSource = snapshot['src/hello.ts'];
  const tasks = snapshot['.projen/tasks.json'].tasks;
  expect(generatedSource).toContain('runtime: lambda.Runtime.NODEJS_12_X,');
  expect(tasks['bundle:hello']).toEqual({
    description: 'Create an AWS Lambda bundle from src/hello.lambda.ts',
    name: 'bundle:hello',
    steps: [
      {
        exec: 'esbuild --bundle src/hello.lambda.ts --target="node12" --platform="node" --outfile="lib/hello.bundle/index.js" --external:aws-sdk',
      },
    ],
  });
});