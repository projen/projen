import * as logging from '../src/logging';
import { synthSnapshot, TestProject } from './util';

logging.disable();

describe('Readme Enablement', () => {
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

  test('default Readme is on', () => {
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
    // expect match
  });
});

describe('Readme customization', () => {
  test('Readme has custom filename', () => {
    // GIVEN
    const project = new TestProject({
      readmeConfig: {
        filename: 'readme.md',
      },
    });

    // WHEN
    const output = synthSnapshot(project);

    // THEN
    const upper = output['README.md'];
    const lower = output['readme.md'];
    expect(upper).toBeFalsy();
    expect(lower).toBeTruthy();
  });

  test('Readme has custom sections', () => {
    // GIVEN
    const project = new TestProject({
      readmeConfig: {
        tagLine: 'test tag line',
      },
    });

    // WHEN
    const output = synthSnapshot(project);

    // THEN
    const readme = output['README.md'];
    expect(readme).toContain('test tag line');
  });
});

// Test each section customization
// Test section and order customization
// Test link on/off, inline on/off
// Test lower case code-of-conduct
// Test each core badge
// Test custom badge
// Test no badges
