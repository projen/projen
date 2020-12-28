import * as path from 'path';
import * as fs from 'fs-extra';
import * as logging from '../src/logging';
import { synthSnapshot, TestProject } from './util';

// This is duplicated vs exported
const GITPOD_FILE = '.gitpod.yml';

logging.disable();

describe('gitpod enable/disable', () => {
  test('given gitpod is false', () => {
    const project = new TestProject({
      gitpod: false,
    });

    project.synth();
    const filePath = path.join(project.outdir, GITPOD_FILE);
    expect(fs.existsSync(filePath)).toBeFalsy();
  });
  test('given gitpod is true', () => {
    const project = new TestProject({
      gitpod: true,
    });

    project.synth();
    const filePath = path.join(project.outdir, GITPOD_FILE);
    expect(fs.existsSync(filePath)).toBeTruthy();
  });
});

describe('gitpod image & file', () => {
  test('given an image', () => {
    const project = new TestProject({
      gitpod: true,
    });
    project.gitpod?.addCustomDocker({ image: 'jsii/superchain' });

    const snapshot = synthSnapshot(project)[GITPOD_FILE];
    expect(snapshot).toContain('image: jsii/superchain');
  });
  test('given a docker file dep', () => {
    const project = new TestProject({
      gitpod: true,
    });
    project.gitpod?.addCustomDocker({ file: '.gitpod.Dockerfile' });

    const snapshot = synthSnapshot(project)[GITPOD_FILE];
    expect(snapshot).toContain('image:');
    expect(snapshot).toContain('file: .gitpod.Dockerfile');
  });
});

describe('gitpod tasks', () => {
  test('given custom tasks', () => {
    const project = new TestProject({
      gitpod: true,
    });
    project.gitpod?.addTasks({ command: 'text' });

    const snapshot = synthSnapshot(project)[GITPOD_FILE];
    expect(snapshot).toContain('command');
    expect(snapshot).toContain('text');
  });
  test('given no custom tasks', () => {
    const project = new TestProject({
      gitpod: true,
    });

    const snapshot = synthSnapshot(project)[GITPOD_FILE];
    expect(snapshot).not.toContain('tasks');
  });
});

describe('gitpod prebuilds', () => {
  test('given prebuilds config', () => {
    const project = new TestProject({
      gitpod: true,
    });
    project.gitpod?.addPrebuilds({
      master: true,
      branches: true,
      pullRequestsFromForks: true,
      addBadge: false,
    });

    const snapshot = synthSnapshot(project)[GITPOD_FILE];
    expect(snapshot).toContain('github');
    expect(snapshot).toContain('prebuilds');
    expect(snapshot).toContain('master');
    expect(snapshot).toContain('branches');
    expect(snapshot).toContain('pullRequestsFromForks');
    expect(snapshot).toContain('addBadge');
  });
});

describe('gitpod vs code extensions', () => {
  test('given a set of VSCode extensions', () => {
    const project = new TestProject({
      gitpod: true,
    });
    const jestId = 'Orta.vscode-jest@4.0.0-alpha.1:TuNngpN2TTsC/Ck1qhIwrg==';
    const eslintId = 'dbaeumer.vscode-eslint@2.1.13:5sYlSD6wJi5s3xqD8hupUw==';
    project.gitpod?.addExtensions(jestId, eslintId);

    const snapshot = synthSnapshot(project)[GITPOD_FILE];
    expect(snapshot).toContain('vscode');
    expect(snapshot).toContain('extensions');
    expect(snapshot).toContain(jestId);
    expect(snapshot).toContain(eslintId);
  });
});