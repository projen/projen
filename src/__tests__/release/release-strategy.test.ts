import { ReleaseStrategy } from '../../release/release-strategy';

let releaseStrategy: ReleaseStrategy;

describe('manual release', () => {
  beforeAll(() => {
    releaseStrategy = ReleaseStrategy.manual();
  });

  test('has a changelog by default', () => {
    expect(releaseStrategy.changelog).toBe(true);
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

  describe('without changelog', () => {
    beforeAll(() => {
      releaseStrategy = ReleaseStrategy.manual({ changelog: false });
    });

    test('does not have a changelog', () => {
      expect(releaseStrategy.changelog).toBe(false);
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

  test('does not have a changelog by default', () => {
    expect(releaseStrategy.changelog).toBe(false);
  });

  describe('with a changelog', () => {
    beforeAll(() => {
      releaseStrategy = ReleaseStrategy.continuous({ changelog: true });
    });

    test('has a changelog', () => {
      expect(releaseStrategy.changelog).toBe(true);
    });
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

  test('does not have a changelog by default', () => {
    expect(releaseStrategy.changelog).toBe(false);
  });

  describe('with a changelog', () => {
    beforeAll(() => {
      releaseStrategy = ReleaseStrategy.scheduled({
        schedule: releaseSchedule,
        changelog: true,
      });
    });

    test('has a changelog', () => {
      expect(releaseStrategy.changelog).toBe(true);
    });
  });
});
