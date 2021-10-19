import { LogLevel } from '../../logger';
import { mkdtemp, synthSnapshot } from '../../_test-utils';
import { ReactTypeScriptProject, ReactTypeScriptProjectOptions } from '../../web';

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
      defaultReleaseBranch: 'main',
    });
  }
}
