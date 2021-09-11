import { ReleaseStrategy } from '../../release/release-strategy';

let releaseStrategy: ReleaseStrategy;

describe('manual release', () => {
  beforeAll(() => {
    releaseStrategy = ReleaseStrategy.manual();
  });

  test('has a changelog by default', () => {
    expect(releaseStrategy.changelogPath).toEqual('CHANGELOG.md');
  });

  test('is not continuous', () => {
    expect(releaseStrategy.isContinuous).toBe(false);
  });

  test('does not have a schedule', () => {
    expect(releaseStrategy.schedule).toBeUndefined();
  });

  test('is manual', () => {
    expect(releaseStrategy.isManual).toBe(true);
  });

  test('does not push artifacts by default', () => {
    expect(releaseStrategy.pushArtifacts).toBe(false);
  });

  describe('without changelog', () => {
    test('does not have a changelog', () => {
      releaseStrategy = ReleaseStrategy.manual({ changelog: false });

      expect(releaseStrategy.changelogPath).toBeUndefined();
    });

    test('ignores changelogPath', () => {
      releaseStrategy = ReleaseStrategy.manual({
        changelog: false,
        changelogPath: 'out/changelog.md',
      });

      expect(releaseStrategy.changelogPath).toBeUndefined();
    });
  });

  describe('with published artifacts', () => {
    test('artifacts are published', () => {
      releaseStrategy = ReleaseStrategy.manual({
        pushArtifacts: true,
      });

      expect(releaseStrategy.pushArtifacts).toBe(true);
    });
  });
});

describe('continuous release', () => {
  beforeAll(() => {
    releaseStrategy = ReleaseStrategy.continuous();
  });

  test('is continuous', () => {
    expect(releaseStrategy.isContinuous).toBe(true);
  });

  test('is not manual', () => {
    expect(releaseStrategy.isManual).toBe(false);
  });

  test('does not have a schedule', () => {
    expect(releaseStrategy.schedule).toBeUndefined();
  });

  test('does not have a changelog', () => {
    expect(releaseStrategy.changelogPath).toBeUndefined();
  });

  test('does not define whether or not to push artifacts by default', () => {
    expect(releaseStrategy.pushArtifacts).toBeUndefined();
  });
});

describe('scheduled release', () => {
  let releaseSchedule = '0 17 * * *';

  beforeAll(() => {
    releaseStrategy = ReleaseStrategy.scheduled({
      schedule: releaseSchedule,
    });
  });

  test('is not continuous', () => {
    expect(releaseStrategy.isContinuous).toBe(false);
  });

  test('is not manual', () => {
    expect(releaseStrategy.isManual).toBe(false);
  });

  test('has a schedule', () => {
    expect(releaseStrategy.schedule).toEqual(releaseSchedule);
  });

  test('does not have a changelog', () => {
    expect(releaseStrategy.changelogPath).toBeUndefined();
  });

  test('does not define whether or not to push artifacts by default', () => {
    expect(releaseStrategy.pushArtifacts).toBeUndefined();
  });
});
