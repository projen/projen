import * as path from 'path';
import * as fs from 'fs-extra';
import * as logging from '../src/logging';
import { Project } from '../src/project';
import { synthSnapshot } from './util';

logging.disable();

let tempDir: string;
beforeEach(() => {
  tempDir = fs.mkdtempSync(path.join(__dirname, 'tmp.samplereadme'));
});

afterEach(() => {
  if (tempDir) {
    fs.removeSync(tempDir);
  }
});

describe('SampleReadProps', () => {
  test('default SampleReadme', () => {
    // GIVEN
    const project = new Project({
      outdir: tempDir,
    });

    // WHEN
    const output = synthSnapshot(project);

    // THEN
    const upper = output['README.md'];
    const lower = output['readme.md'];
    expect(upper).toBeTruthy();
    expect(lower).toBeFalsy();
  });

  test('customized w/ default SampleReadme', () => {
    // GIVEN
    const project = new Project({
      outdir: tempDir,
      readme: 'README.md',
    });

    // WHEN
    const output = synthSnapshot(project);

    // THEN
    const upper = output['README.md'];
    const lower = output['readme.md'];
    expect(upper).toBeTruthy();
    expect(lower).toBeFalsy();
  });

  test('customized SampleReadme', () => {
    // GIVEN
    const project = new Project({
      outdir: tempDir,
      readme: 'readme.md',
    });

    // WHEN
    const output = synthSnapshot(project);

    // THEN
    const upper = output['README.md'];
    const lower = output['readme.md'];
    expect(upper).toBeFalsy();
    expect(lower).toBeTruthy();
  });
});
