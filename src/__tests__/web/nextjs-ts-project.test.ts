import { LogLevel } from '../../logger';
import { NextJsTypeScriptProject, NextJsTypeScriptProjectOptions } from '../../web';
import { mkdtemp, synthSnapshot } from '../util';

test('defaults', () => {
  const p = new TestNextJsTypeScriptProject();
  expect(synthSnapshot(p)).toMatchSnapshot();
});

class TestNextJsTypeScriptProject extends NextJsTypeScriptProject {
  constructor(options: Partial<NextJsTypeScriptProjectOptions> = { }) {
    super({
      ...options,
      clobber: false,
      name: 'test-nextjs-project',
      outdir: mkdtemp(),
      logging: { level: LogLevel.OFF },
      jsiiFqn: 'projen.web.NextJsTypeScriptProject',
      defaultReleaseBranch: 'main',
    });
  }
}
