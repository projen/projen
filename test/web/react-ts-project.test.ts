import { synthSnapshot } from '../../src/util/synth';
import { ReactTypeScriptProject, ReactTypeScriptProjectOptions } from '../../src/web';

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
