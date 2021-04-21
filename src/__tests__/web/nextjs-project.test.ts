import { LogLevel } from '../../logger';
import { NextJsProject, NextJsProjectOptions } from '../../web';
import { mkdtemp, synthSnapshot } from '../util';

test('defaults', () => {
  const p = new TestNextJsProject();
  expect(synthSnapshot(p)).toMatchSnapshot();
});

class TestNextJsProject extends NextJsProject {
  constructor(options: Partial<NextJsProjectOptions> = { }) {
    super({
      ...options,
      clobber: false,
      name: 'test-nextjs-project',
      outdir: mkdtemp(),
      logging: { level: LogLevel.OFF },
      jsiiFqn: 'projen.web.NextJsProject',
      defaultReleaseBranch: 'main',
    });
  }
}
