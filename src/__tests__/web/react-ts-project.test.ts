import { LogLevel } from '../../logger';
import { ReactTypeScriptProject, ReactTypeScriptProjectOptions } from '../../web';
import { mkdtemp, synthSnapshot } from '../util';

test('defaults', () => {
  const p = new TestReactTypeScriptProject();
  expect(synthSnapshot(p)).toMatchSnapshot();
});

class TestReactTypeScriptProject extends ReactTypeScriptProject {
  constructor(options: Partial<ReactTypeScriptProjectOptions> = { }) {
    super({
      ...options,
      clobber: false,
      name: 'test-nextjs-project',
      outdir: mkdtemp(),
      logging: { level: LogLevel.OFF },
      jsiiFqn: 'projen.web.ReactProject',
      defaultReleaseBranch: 'main',
    });
  }
}
