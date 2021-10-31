import { synthSnapshot } from '../../src/util/synth';
import { NextJsTypeScriptProject, NextJsTypeScriptProjectOptions } from '../../src/web';

test('defaults', () => {
  const p = new TestNextJsTypeScriptProject();
  expect(synthSnapshot(p)).toMatchSnapshot();
});

test('tailwind enabled', () => {
  const p = new TestNextJsTypeScriptProject();
  const out = synthSnapshot(p);
  expect(out['tailwind.config.json']).toBeDefined();
  expect(out['postcss.config.json']).toBeDefined();
});

class TestNextJsTypeScriptProject extends NextJsTypeScriptProject {
  constructor(options: Partial<NextJsTypeScriptProjectOptions> = { }) {
    super({
      ...options,
      clobber: false,
      name: 'test-nextjs-project',
      defaultReleaseBranch: 'main',
    });
  }
}
