import { ReactTypeScriptProject, ReactTypeScriptProjectOptions } from '../../src/web';
import { synthSnapshot } from '../util';

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
      defaultReleaseBranch: 'main',
    });
  }
}
