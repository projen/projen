// tests for `projen new`: we run `projen new` for each supported project type
// and compare against a golden snapshot.
import { execSync } from 'child_process';
import { join } from 'path';
import { mkdirSync, removeSync } from 'fs-extra';
import * as inventory from '../inventory';
import { directorySnapshot, execProjenCLI, mkdtemp, sanitizeOutput, synthSnapshot, synthSnapshotWithPost, TestProject } from './util';

for (const type of inventory.discover()) {
  test(`projen new ${type.pjid}`, () => {
    const outdir = mkdtemp();
    try {
      const projectdir = createProjectDir(outdir);

      // execute `projen new PJID --no-synth` in the project directory
      execProjenCLI(projectdir, ['new', '--no-synth', type.pjid]);

      // compare generated .projenrc.js to the snapshot
      const actual = directorySnapshot(projectdir, {
        excludeGlobs: [
          '.git/**',
        ],
      });
      expect(actual).toMatchSnapshot();
    } finally {
      removeSync(outdir);
    }
  });
}

test('post-synthesis option enabled', () => {
  const project = new TestProject();

  expect(synthSnapshotWithPost(project)['.postsynth']).toContain('postsynth');
});

test('post-synthesis option disabled', () => {
  const project = new TestProject();

  expect(synthSnapshot(project)['.postsynth']).toBeUndefined();
});

test('projen new --from external', () => {
  const outdir = mkdtemp();
  try {
    const projectdir = createProjectDir(outdir);

    // execute `projen new --from cdk-appsync-project` in the project directory
    execProjenCLI(projectdir, ['new', '--from', 'cdk-appsync-project@1.1.2']);

    // patch the projen version in package.json to match the current version
    // otherwise, every bump would need to update these snapshots.
    sanitizeOutput(projectdir);

    // compare generated .projenrc.js to the snapshot
    const actual = directorySnapshot(projectdir, {
      excludeGlobs: [
        '.git/**',
        '.github/**',
        'node_modules/**',
        'yarn.lock',
      ],
    });

    expect(actual).toMatchSnapshot();
    expect(actual['schema.graphql']).toBeDefined();
  } finally {
    removeSync(outdir);
  }
});

test('options are not overwritten when creating external projects', () => {
  const outdir = mkdtemp();
  try {
    const projectdir = createProjectDir(outdir);

    // execute `projen new --from cdk-appsync-project` in the project directory
    execProjenCLI(projectdir, ['new', '--from', 'cdk-appsync-project@1.1.2', '--no-synth', '--cdk-version', '1.63.0']);

    // compare generated .projenrc.js to the snapshot
    const actual = directorySnapshot(projectdir, {
      excludeGlobs: [
        '.git/**',
        '.github/**',
        'node_modules/**',
        'yarn.lock',
      ],
    });

    expect(actual['.projenrc.js']).toContain('cdkVersion: \'1.63.0\'');
  } finally {
    removeSync(outdir);
  }
});

test('projen new --no-comments', () => {
  const outdir = mkdtemp();
  try {
    const projectdir = createProjectDir(outdir);

    execProjenCLI(projectdir, ['new', 'node', '--no-comments', '--no-synth']);

    const projenrc = directorySnapshot(projectdir)['.projenrc.js'];
    expect(projenrc).toBeDefined();
    expect(projenrc).not.toMatch('//');
  } finally {
    removeSync(outdir);
  }
});

test('creating node project with enum-typed CLI arg', () => {
  const outdir = mkdtemp();
  try {
    const projectdir = createProjectDir(outdir);

    execProjenCLI(projectdir, ['new', 'node', '--package-manager', 'npm', '--no-synth']);

    const projenrc = directorySnapshot(projectdir)['.projenrc.js'];
    expect(projenrc).toMatchSnapshot();
  } finally {
    removeSync(outdir);
  }
});

test('creating python project with enum-typed CLI arg', () => {
  const outdir = mkdtemp();
  try {
    const projectdir = createProjectDir(outdir);

    execProjenCLI(projectdir, ['new', 'python', '--project-type', 'lib', '--projenrc-python', '--no-synth']);

    const projenrc = directorySnapshot(projectdir)['.projenrc.py'];
    expect(projenrc).toMatchSnapshot();
  } finally {
    removeSync(outdir);
  }
});

function createProjectDir(workdir: string) {
  // create project under "my-project" so that basedir is deterministic
  const projectdir = join(workdir, 'my-project');
  mkdirSync(projectdir);

  const git = (command: string) => execSync(`git ${command}`, { cwd: projectdir });
  git('init');
  git('remote add origin git@boom.com:foo/bar.git');
  git('config user.name "My User Name"');
  git('config user.email "my@user.email.com"');
  return projectdir;
}