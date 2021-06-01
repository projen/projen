import { ConstructLibraryCdktf, ConstructLibraryCdktfOptions } from '../cdktf-construct';
import { LogLevel } from '../logger';
import { NpmAccess } from '../node-package';
import { mkdtemp, synthSnapshot } from './util';

describe('constructs dependency selection', () => {
  test('user-selected', () => {
    // GIVEN
    const project = new TestProject({ cdktfVersion: '0.99' });

    // WHEN
    const snapshot = synthSnapshot(project);

    // THEN
    expect(snapshot['package.json']?.peerDependencies?.cdktf).toBe('^0.99');
    expect(snapshot['package.json']?.devDependencies?.cdktf).toBe('0.99.0');
    expect(snapshot['package.json']?.dependencies?.cdktf).toBeUndefined();
  });
});

const defaultOptions = {
  author: 'Nobody',
  authorAddress: 'nobody@nowhere.com',
  clobber: false,
  defaultReleaseBranch: 'main',
  jest: false,
  name: 'test-project',
  npmAccess: NpmAccess.PUBLIC,
  repositoryUrl: 'https://github.com/projen/projen.git',
} as const;

class TestProject extends ConstructLibraryCdktf {
  constructor(options: Omit<ConstructLibraryCdktfOptions, keyof typeof defaultOptions>) {
    super({
      outdir: mkdtemp(),
      logging: {
        level: LogLevel.OFF,
      },
      ...defaultOptions,
      ...options,
    });
  }
}
