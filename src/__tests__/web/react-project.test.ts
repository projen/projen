import { LogLevel } from '../../logger';
import { ReactProject, ReactProjectOptions } from '../../web';
import { mkdtemp, synthSnapshot } from '../util';

test('defaults', () => {
  const p = new TestReactProject();
  expect(synthSnapshot(p)).toMatchSnapshot();
});

class TestReactProject extends ReactProject {
  constructor(options: Partial<ReactProjectOptions> = { }) {
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
