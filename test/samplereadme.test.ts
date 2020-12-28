import * as logging from '../src/logging';
import { synthSnapshot, TestProject } from './util';

logging.disable();

describe('SampleReadProps', () => {
  test('default SampleReadme', () => {
    // GIVEN
    const project = new TestProject();

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
    const project = new TestProject({
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
    const project = new TestProject({
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
