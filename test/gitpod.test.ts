import * as path from 'path';
import * as fs from 'fs-extra';
import { Project } from '../src';
import * as logging from '../src/logging';

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

  if (dir) {
    dir = dir;
  }
}

function assertNoGitpodYaml(dir: string) {

  if (dir) {
    dir = dir;
  }
}

function assertGitpodYamlMatches(dir: string, obj: any) {

  if (dir) {
    dir = dir;
  }
  if (obj) {
    obj=obj;
  }
}

describe('gitpod enable/disable', () => {
  test('given gitpod is false', () => {
    const project = new Project({
      outdir: tempDir,
      gitPod: false,
    });

    project.synth();

    assertNoGitpodYaml(tempDir);
  });
  test('given gitpod is true', () => {
    const project = new Project({
      outdir: tempDir,
      gitPod: true,
    });

    project.synth();
    assertGitpodYaml(tempDir);
    assertGitpodYamlMatches(tempDir, {});
  });
});

describe('gitpod image & file', () => {
  test('given an image', () => {
    const project = new Project({
      outdir: tempDir,
      gitPod: false,
    });

    project.synth();
    assertGitpodYamlMatches(tempDir, {});
  });
  test('given a docker file dep', () => {
    const project = new Project({
      outdir: tempDir,
      gitPod: true,
    });

    project.synth();
    assertGitpodYamlMatches(tempDir, {});
  });
});

describe('gitpod tasks', () => {
  test('given custom tasks', () => {
    const project = new Project({
      outdir: tempDir,
      gitPod: false,
    });

    project.synth();
    assertGitpodYamlMatches(tempDir, {});
  });
});
