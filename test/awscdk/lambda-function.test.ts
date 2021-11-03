import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { TypeScriptProject } from '../../src';
import * as awscdk from '../../src/awscdk';
import { Testing } from '../../src/testing';

describe('bundled function', () => {
  let generatedSource: string;
  let tasks: Record<string, any>;

  beforeEach(() => {
    const project = new TypeScriptProject({ name: 'hello', defaultReleaseBranch: 'main' });

    new awscdk.LambdaFunction(project, {
      entrypoint: join('src', 'hello.lambda.ts'),
      srcdir: project.srcdir,
      libdir: project.libdir,
    });

    const snapshot = Testing.synth(project);
    generatedSource = snapshot['src/hello-function.ts'];
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
      description: 'Create a JavaScript bundle from src/hello.lambda.ts',
      name: 'bundle:hello',
      steps: [
        {
          exec: 'esbuild --bundle src/hello.lambda.ts --target="node14" --platform="node" --outfile="lib/hello.lambda.bundle/index.js" --external:aws-sdk --sourcemap',
        },
      ],
    });
  });

  test('spawns the bundle task as part of pre-compilation', () => {
    expect(tasks.precompile).toEqual({
      description: 'Prepare the project for compilation',
      name: 'precompile',
      steps: [
        { spawn: 'bundle' },
      ],
    });
  });
});

test('fails if entrypoint does not have the .lambda suffix', () => {
  const project = new TypeScriptProject({ name: 'hello', defaultReleaseBranch: 'main' });
  expect(() => new awscdk.LambdaFunction(project, {
    entrypoint: join('src', 'hello-no-lambda.ts'),
    libdir: project.libdir,
    srcdir: project.srcdir,
  })).toThrow('hello-no-lambda.ts must have a .lambda.ts extension');
});

test('fails if entrypoint is not under the source tree', () => {
  const project = new TypeScriptProject({ name: 'hello', defaultReleaseBranch: 'main' });
  expect(() => new awscdk.LambdaFunction(project, {
    entrypoint: join('boom', 'hello-no-lambda.ts'),
    libdir: project.libdir,
    srcdir: project.srcdir,
  })).toThrow('boom/hello-no-lambda.ts must be under src');
});

test('constructFile and constructName can be used to customize the generated construct', () => {
  const project = new TypeScriptProject({ name: 'hello', defaultReleaseBranch: 'main' });

  new awscdk.LambdaFunction(project, {
    entrypoint: join('src', 'hello.lambda.ts'),
    constructFile: 'my-construct.ts',
    constructName: 'MyConstruct',
    libdir: project.libdir,
    srcdir: project.srcdir,
  });

  const snapshot = Testing.synth(project);
  const generatedSource = snapshot['src/my-construct.ts'];
  expect(generatedSource).toMatchSnapshot();
});

test('runtime can be used to customize the lambda runtime and esbuild target', () => {
  const project = new TypeScriptProject({ name: 'hello', defaultReleaseBranch: 'main' });

  new awscdk.LambdaFunction(project, {
    entrypoint: join('src', 'hello.lambda.ts'),
    runtime: awscdk.LambdaRuntime.NODEJS_12_X,
    libdir: project.libdir,
    srcdir: project.srcdir,
  });

  const snapshot = Testing.synth(project);
  const generatedSource = snapshot['src/hello-function.ts'];
  const tasks = snapshot['.projen/tasks.json'].tasks;
  expect(generatedSource).toContain('runtime: lambda.Runtime.NODEJS_12_X,');
  expect(tasks['bundle:hello']).toEqual({
    description: 'Create a JavaScript bundle from src/hello.lambda.ts',
    name: 'bundle:hello',
    steps: [
      {
        exec: 'esbuild --bundle src/hello.lambda.ts --target="node12" --platform="node" --outfile="lib/hello.lambda.bundle/index.js" --external:aws-sdk --sourcemap',
      },
    ],
  });
});

test('eslint allows handlers to import dev dependencies', () => {
  const project = new TypeScriptProject({ name: 'hello', defaultReleaseBranch: 'main' });
  new awscdk.LambdaFunction(project, { entrypoint: join('src', 'hello.lambda.ts'), libdir: project.libdir, srcdir: project.srcdir });
  new awscdk.LambdaFunction(project, { entrypoint: join('src', 'world.lambda.ts'), libdir: project.libdir, srcdir: project.srcdir });

  const snapshot = Testing.synth(project);
  expect(snapshot['.eslintrc.json'].rules['import/no-extraneous-dependencies']).toStrictEqual([
    'error', {
      devDependencies: ['**/test/**', '**/build-tools/**', 'src/hello.lambda.ts', 'src/world.lambda.ts'],
      optionalDependencies: false,
      peerDependencies: true,
    },
  ]);
});

test('esbuild dependency is added', () => {
  const project = new TypeScriptProject({ name: 'hello', defaultReleaseBranch: 'main' });
  new awscdk.LambdaFunction(project, { entrypoint: join('src', 'hello.lambda.ts'), libdir: project.libdir, srcdir: project.srcdir });
  new awscdk.LambdaFunction(project, { entrypoint: join('src', 'world.lambda.ts'), libdir: project.libdir, srcdir: project.srcdir });

  const snapshot = Testing.synth(project);
  const deps = snapshot['.projen/deps.json'].dependencies;
  expect(deps.filter((d: any) => d.name === 'esbuild').length).toEqual(1);
});

test('multiple functions', () => {
  const project = new TypeScriptProject({ name: 'hello', defaultReleaseBranch: 'main' });
  new awscdk.LambdaFunction(project, { entrypoint: join('src', 'hello.lambda.ts'), libdir: project.libdir, srcdir: project.srcdir });
  new awscdk.LambdaFunction(project, { entrypoint: join('src', 'world.lambda.ts'), libdir: project.libdir, srcdir: project.srcdir });

  const snapshot = Testing.synth(project);
  expect(snapshot['src/hello-function.ts']).toMatchSnapshot();
  expect(snapshot['src/world-function.ts']).toMatchSnapshot();
});

test('auto-discover', () => {
  const project = new TypeScriptProject({ name: 'hello', defaultReleaseBranch: 'main' });

  // create fake handlers
  const srcdir = join(project.outdir, project.srcdir);
  mkdirSync(join(srcdir, 'subdir'), { recursive: true });
  writeFileSync(join(srcdir, 'hello.lambda.ts'), 'export function handler() {}');
  writeFileSync(join(srcdir, 'subdir', 'world.lambda.ts'), 'export function handler() {}');
  writeFileSync(join(srcdir, 'subdir', 'jangy.lambda.ts'), 'export function handler() {}');

  new awscdk.AutoDiscover(project, {
    libdir: project.libdir,
    srcdir: project.srcdir,
    lambdaOptions: {
      runtime: awscdk.LambdaRuntime.NODEJS_12_X,
    },
  });

  const snapshot = Testing.synth(project);
  expect(snapshot['src/hello-function.ts']).toMatchSnapshot();
  expect(snapshot['src/subdir/world-function.ts']).toMatchSnapshot();
  expect(snapshot['src/subdir/jangy-function.ts']).toMatchSnapshot();
  const tasks = snapshot['.projen/tasks.json'].tasks;
  expect(tasks.bundle).toMatchSnapshot();

  const expected = [
    'bundle:hello',
    'bundle:hello:watch',
    'bundle:subdir/jangy',
    'bundle:subdir/jangy:watch',
    'bundle:subdir/world',
    'bundle:subdir/world:watch',
  ];

  for (const name of expected) {
    expect(tasks[name]).not.toBeUndefined();
    expect(tasks[name]).toMatchSnapshot();
  }
});