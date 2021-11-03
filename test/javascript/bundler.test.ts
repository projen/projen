import { NodeProject } from '../../src';
import { Bundler } from '../../src/javascript';
import { Testing } from '../../src/testing';

test('node projects have a bundler', () => {
  const p = new NodeProject({
    name: 'test',
    defaultReleaseBranch: 'main',
  });

  expect(Bundler.of(p)).not.toBeUndefined();
  expect(p.bundler).toEqual(Bundler.of(p));
  expect(p.deps.all.find(d => d.name === 'esbuild')).toBeUndefined(); // no "esbuild" dependency
});

test('The main "bundle" task is not created unless a bundle is added', () => {
  const p = new NodeProject({
    name: 'test',
    defaultReleaseBranch: 'main',
  });

  expect(p.tasks.all.find(t => t.name === 'bundle')).toBeUndefined();
});

test('bundler.addBundle() defines a bundle', () => {
  const p = new NodeProject({
    name: 'test',
    defaultReleaseBranch: 'main',
  });

  p.bundler.addBundle('hello', {
    entrypoint: './src/index.ts',
    outfile: './lib/foo.js',
    platform: 'node',
    target: 'node12',
  });

  p.bundler.addBundle('world', {
    entrypoint: './src/world.ts',
    outfile: './lib/aaaa.js',
    platform: 'node',
    target: 'node14',
    externals: ['aws-sdk', 'request'],
  });

  const snapshot = Testing.synth(p);
  const tasks = snapshot['.projen/tasks.json'].tasks;

  // aggregated "bundle" task spawns all bundle tasks
  expect(tasks.bundle).toStrictEqual({
    description: 'Bundle assets',
    name: 'bundle',
    steps: [
      { spawn: 'bundle:hello' },
      { spawn: 'bundle:world' },
    ],
  });

  // "compile" task spawns the aggregate "bundle" task
  expect(tasks.precompile.steps).toStrictEqual([{
    spawn: 'bundle',
  }]);

  expect(tasks['bundle:hello']).toStrictEqual({
    description: 'Create a JavaScript bundle from ./src/index.ts',
    name: 'bundle:hello',
    steps: [
      { exec: 'esbuild --bundle ./src/index.ts --target="node12" --platform="node" --outfile="./lib/foo.js" --sourcemap' },
    ],
  });

  expect(tasks['bundle:world']).toStrictEqual({
    description: 'Create a JavaScript bundle from ./src/world.ts',
    name: 'bundle:world',
    steps: [
      { exec: 'esbuild --bundle ./src/world.ts --target="node14" --platform="node" --outfile="./lib/aaaa.js" --external:aws-sdk --external:request --sourcemap' },
    ],
  });
});

test('no specific esbuild version by default', () => {
  const p = new NodeProject({
    name: 'test',
    defaultReleaseBranch: 'main',
  });

  p.bundler.addBundle('hello', {
    entrypoint: './src/index.ts',
    outfile: './lib/foo.js',
    platform: 'node',
    target: 'node12',
  });

  const snapshot = Testing.synth(p);
  const deps = snapshot['.projen/deps.json'].dependencies;

  expect(deps.find((d: any) => d.name === 'esbuild')).toStrictEqual({
    name: 'esbuild',
    type: 'build',
  });
});

test('esbuildVersion can be used to specify version requirement for "esbuild"', () => {
  const p = new NodeProject({
    name: 'test',
    defaultReleaseBranch: 'main',
    bundlerOptions: {
      esbuildVersion: '^3',
    },
  });

  p.bundler.addBundle('hello', {
    entrypoint: './src/index.ts',
    outfile: './lib/foo.js',
    platform: 'node',
    target: 'node12',
  });

  const snapshot = Testing.synth(p);
  const deps = snapshot['.projen/deps.json'].dependencies;

  expect(deps.find((d: any) => d.name === 'esbuild')).toStrictEqual({
    name: 'esbuild',
    type: 'build',
    version: '^3',
  });
});

test('sourcemaps can be disabled', () => {
  const p = new NodeProject({
    name: 'test',
    defaultReleaseBranch: 'main',
  });

  p.bundler.addBundle('hello', {
    entrypoint: './src/index.ts',
    outfile: './lib/foo.js',
    platform: 'node',
    target: 'node12',
    sourcemap: false,
  });

  const snapshot = Testing.synth(p);
  const tasks = snapshot['.projen/tasks.json'].tasks;

  expect(tasks['bundle:hello']).toStrictEqual({
    description: 'Create a JavaScript bundle from ./src/index.ts',
    name: 'bundle:hello',
    steps: [
      {
        exec: 'esbuild --bundle ./src/index.ts --target="node12" --platform="node" --outfile="./lib/foo.js"',
      },
    ],
  });
});

describe('bundle:watch', () => {
  test('a bundle:xyz:watch task is added by default', () => {
    const p = new NodeProject({
      name: 'test',
      defaultReleaseBranch: 'main',
    });

    p.bundler.addBundle('hello', {
      entrypoint: './src/index.ts',
      outfile: './lib/foo.js',
      platform: 'node',
      target: 'node12',
    });

    const snapshot = Testing.synth(p);
    const tasks = snapshot['.projen/tasks.json'].tasks;

    expect(tasks['bundle:hello:watch']).toStrictEqual({
      description: 'Continuously update the JavaScript bundle from ./src/index.ts',
      name: 'bundle:hello:watch',
      steps: [
        {
          exec: 'esbuild --bundle ./src/index.ts --target="node12" --platform="node" --outfile="./lib/foo.js" --sourcemap --watch',
        },
      ],
    });
  });

  test('watch can be disabled', () => {
    const p = new NodeProject({
      name: 'test',
      defaultReleaseBranch: 'main',
    });

    p.bundler.addBundle('hello', {
      entrypoint: './src/index.ts',
      outfile: './lib/foo.js',
      platform: 'node',
      target: 'node12',
      watchTask: false,
    });

    const snapshot = Testing.synth(p);
    const tasks = snapshot['.projen/tasks.json'].tasks;

    expect(tasks['bundle:hello:watch']).toBeUndefined();
  });
});