import * as logging from '../src/logging';
import { synthSnapshot, TestProject } from './util';

logging.disable();

describe('Readme', () => {
  test('default Readme', () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    const output = synthSnapshot(project);
    console.log(output);
    // THEN
    const upper = output['README.md'];
    const lower = output['readme.md'];
    expect(upper).toBeTruthy();
    expect(lower).toBeFalsy();
  });

  test('Readme is off', () => {
    // GIVEN
    const project = new TestProject({
      readme: false,
    });

    // WHEN
    const output = synthSnapshot(project);

    // THEN
    const upper = output['README.md'];
    const lower = output['readme.md'];
    expect(upper).toBeFalsy();
    expect(lower).toBeFalsy();
  });
});