import { synthSnapshot } from '../../src/util/synth';
import { NextJsProject, NextJsProjectOptions } from '../../src/web';

test('defaults', () => {
  const p = new TestNextJsProject();
  expect(synthSnapshot(p)).toMatchSnapshot();
});

test('tailwind enabled', () => {
  const p = new TestNextJsProject();
  const pkg = synthSnapshot(p);
  expect(pkg['tailwind.config.json']).toBeDefined();
  expect(pkg['postcss.config.json']).toBeDefined();
});

class TestNextJsProject extends NextJsProject {
  constructor(options: Partial<NextJsProjectOptions> = { }) {
    super({
      ...options,
      clobber: false,
      name: 'test-nextjs-project',
      defaultReleaseBranch: 'main',
    });
  }
}
