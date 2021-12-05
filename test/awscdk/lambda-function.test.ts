import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { TypeScriptProject } from '../../src';
import * as awscdk from '../../src/awscdk';
import { Testing } from '../../src/testing';

describe('bundled function', () => {
  let generatedSource: string;
  let tasks: Record<string, any>;
  let npmignore: string[];
  let gitignore: string[];

  beforeEach(() => {
    const project = new TypeScriptProject({
      name: 'hello',
      defaultReleaseBranch: 'main',
      bundlerOptions: {
        assetsDir: 'my-assets',
      },
    });

    new awscdk.LambdaFunction(project, {
      entrypoint: join('src', 'hello.lambda.ts'),
    });

    const snapshot = Testing.synth(project);

    generatedSource = snapshot['src/hello-function.ts'];
    tasks = snapshot['.projen/tasks.json'].tasks;
    npmignore = snapshot['.npmignore'].split('\n');
    gitignore = snapshot['.gitignore'].split('\n');
  });

  test('generates source code for a lambda construct', () => {
    expect(generatedSource).toMatchSnapshot();
  });

  test('creates a single project-wide bundle task', () => {
    expect(tasks.bundle).toEqual({
      description: 'Prepare assets',
      name: 'bundle',
      steps: [{ spawn: 'bundle:hello.lambda' }],
    });
  });

  test('creates a specific bundle task for this function', () => {
    expect(tasks['bundle:hello.lambda']).toEqual({
      description: 'Create a JavaScript bundle from src/hello.lambda.ts',
      name: 'bundle:hello.lambda',
      steps: [
        {
          exec: 'esbuild --bundle src/hello.lambda.ts --target="node14" --platform="node" --outfile="my-assets/hello.lambda/index.js" --external:aws-sdk',
        },
      ],
    });
  });

  test('spawns the bundle task as part of pre-compilation', () => {
    expect(tasks['pre-compile'].steps).toStrictEqual([{ spawn: 'bundle' }]);
  });

  test('includes the bundle directory inside the node package but not commit to source control', () => {
    expect(npmignore).toContain('!/my-assets/');
    expect(gitignore).toContain('/my-assets/');
  });
});

test('fails if entrypoint does not have the .lambda suffix', () => {
  const project = new TypeScriptProject({ name: 'hello', defaultReleaseBranch: 'main' });
  expect(() => new awscdk.LambdaFunction(project, {
    entrypoint: join('src', 'hello-no-lambda.ts'),
  })).toThrow('hello-no-lambda.ts must have a .lambda.ts extension');
});

test('constructFile and constructName can be used to customize the generated construct', () => {
  const project = new TypeScriptProject({ name: 'hello', defaultReleaseBranch: 'main' });

  new awscdk.LambdaFunction(project, {
    entrypoint: join('src', 'hello.lambda.ts'),
    constructFile: 'my-construct.ts',
    constructName: 'MyConstruct',
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
  });

  const snapshot = Testing.synth(project);
  const generatedSource = snapshot['src/hello-function.ts'];
  const tasks = snapshot['.projen/tasks.json'].tasks;
  expect(generatedSource).toContain('runtime: lambda.Runtime.NODEJS_12_X,');
  expect(tasks['bundle:hello.lambda']).toEqual({
    description: 'Create a JavaScript bundle from src/hello.lambda.ts',
    name: 'bundle:hello.lambda',
    steps: [
      {
        exec: 'esbuild --bundle src/hello.lambda.ts --target="node12" --platform="node" --outfile="assets/hello.lambda/index.js" --external:aws-sdk',
      },
    ],
  });
});

test('eslint allows handlers to import dev dependencies', () => {
  const project = new TypeScriptProject({ name: 'hello', defaultReleaseBranch: 'main' });
  new awscdk.LambdaFunction(project, { entrypoint: join('src', 'hello.lambda.ts') });
  new awscdk.LambdaFunction(project, { entrypoint: join('src', 'world.lambda.ts') });

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
  new awscdk.LambdaFunction(project, { entrypoint: join('src', 'hello.lambda.ts') });
  new awscdk.LambdaFunction(project, { entrypoint: join('src', 'world.lambda.ts') });

  const snapshot = Testing.synth(project);
  const deps = snapshot['.projen/deps.json'].dependencies;
  expect(deps.filter((d: any) => d.name === 'esbuild').length).toEqual(1);
});

test('multiple functions', () => {
  const project = new TypeScriptProject({ name: 'hello', defaultReleaseBranch: 'main' });
  new awscdk.LambdaFunction(project, { entrypoint: join('src', 'hello.lambda.ts') });
  new awscdk.LambdaFunction(project, { entrypoint: join('src', 'world.lambda.ts') });

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
    srcdir: project.srcdir,
    testdir: project.testdir,
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
    'bundle:hello.lambda',
    'bundle:hello.lambda:watch',
    'bundle:subdir/jangy.lambda',
    'bundle:subdir/jangy.lambda:watch',
    'bundle:subdir/world.lambda',
    'bundle:subdir/world.lambda:watch',
  ];

  for (const name of expected) {
    expect(tasks[name]).not.toBeUndefined();
    expect(tasks[name]).toMatchSnapshot();
  }
});