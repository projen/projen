import { LogLevel } from '../../logger';
import { mkdtemp, synthSnapshot } from '../../_test-utils';
import { NextJsTypeScriptProject, NextJsTypeScriptProjectOptions } from '../../web';

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
      outdir: mkdtemp(),
      logging: { level: LogLevel.OFF },
      defaultReleaseBranch: 'main',
    });
  }
}
