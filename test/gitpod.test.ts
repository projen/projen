import * as path from 'path';
import * as fs from 'fs-extra';
import * as logging from '../src/logging';
import { Project } from '../src/project';
import { synthSnapshot } from './util';

// This is duplicated vs exported
const GITPOD_FILE = '.gitpod.yml';

logging.disable();

let tempDir: string;
beforeEach(() => {
  tempDir = fs.mkdtempSync(path.join(__dirname, 'tmp.gitpod'));
});

afterEach(() => {
  if (tempDir) {
    fs.removeSync(tempDir);
  }
});

function assertGitpodYaml(dir: string) {

  const filePath = path.join(dir, GITPOD_FILE);
  expect(fs.existsSync(filePath)).toBeTruthy();
}

function assertNoGitpodYaml(dir: string) {

  const filePath = path.join(dir, GITPOD_FILE);
  expect(fs.existsSync(filePath)).toBeFalsy();
}

describe('gitpod enable/disable', () => {
  test('given gitpod is false', () => {
    const project = new Project({
      outdir: tempDir,
      gitpod: false,
    });

    project.synth();
    assertNoGitpodYaml(tempDir);
  });
  test('given gitpod is true', () => {
    const project = new Project({
      outdir: tempDir,
      gitpod: true,
    });

    project.synth();
    assertGitpodYaml(tempDir);

    const snapshot = synthSnapshot(project)[GITPOD_FILE];
    expect(snapshot).toContain('tasks:');
    expect(snapshot).toContain('command: echo Initialized');
  });
});

describe('gitpod image & file', () => {
  test('given an image', () => {
    const project = new Project({
      outdir: tempDir,
      gitpod: true,
    });

    if (project.gitpod) {
      project.gitpod.addCustomDocker({ image: 'jsii/superchain' });
    }

    const snapshot = synthSnapshot(project);
    console.log(snapshot);
    expect(snapshot).toContain('image: jsii/superchain');
  });
  // test('given a docker file dep', () => {
  //   const project = new Project({
  //     outdir: tempDir,
  //     gitpod: true,
  //   });

  //   if (project.gitpod) {
  //     project.gitpod.addCustomDocker({ file: '.gitpod.Dockerfile' });
  //   }

  //   const snapshot = synthSnapshot(project)[GITPOD_FILE];
  //   expect(snapshot).toContain('image:');
  //   expect(snapshot).toContain('file: \'.gitpod.Dockerfile\'');
  // });
});

// describe('gitpod tasks', () => {
//   test('given custom tasks', () => {
//     const project = new Project({
//       outdir: tempDir,
//       gitpod: true,
//     });
//     const snapshot = synthSnapshot(project, GITPOD_FILE);
//     expect(snapshot[GITPOD_FILE].tasks).toBeTruthy();
//   });
// });
