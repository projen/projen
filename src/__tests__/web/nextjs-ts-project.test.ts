import { LogLevel } from '../../logger';
import { NextJsTypeScriptProject, NextJsTypeScriptProjectOptions } from '../../web';
import { mkdtemp, synthSnapshot } from '../util';

test('defaults', () => {
  const p = new TestNextJsTypeScriptProject();
  expect(synthSnapshot(p)).toMatchSnapshot();
});

test('tailwind enabled', () => {
  const p = new TestNextJsTypeScriptProject();
  expect(synthSnapshot(p)['tailwind.config.json']).toBeDefined();
  expect(synthSnapshot(p)['postcss.config.json']).toBeDefined();
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
