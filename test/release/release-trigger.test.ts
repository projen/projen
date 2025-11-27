import { ReleaseTrigger } from "../../src/release/release-trigger";

let releaseTrigger: ReleaseTrigger;

describe("manual release", () => {
  beforeAll(() => {
    releaseTrigger = ReleaseTrigger.manual();
  });

  test("has a changelog by default", () => {
    expect(releaseTrigger.changelogPath).toEqual("CHANGELOG.md");
  });

  test("is not continuous", () => {
    expect(releaseTrigger.isContinuous).toBe(false);
  });

  test("does not have a schedule", () => {
    expect(releaseTrigger.schedule).toBeUndefined();
  });

  test("does not have tags", () => {
    expect(releaseTrigger.tags).toBeUndefined();
  });

  test("is manual", () => {
    expect(releaseTrigger.isManual).toBe(true);
  });

  describe("without changelog", () => {
    test("does not have a changelog", () => {
      releaseTrigger = ReleaseTrigger.manual({ changelog: false });

      expect(releaseTrigger.changelogPath).toBeUndefined();
    });

    test("ignores changelogPath", () => {
      releaseTrigger = ReleaseTrigger.manual({
        changelog: false,
        changelogPath: "out/changelog.md",
      });

      expect(releaseTrigger.changelogPath).toBeUndefined();
    });
  });

  describe("with custom git-push command", () => {
    test("has custom git-push command", () => {
      releaseTrigger = ReleaseTrigger.manual({
        gitPushCommand: "git push --follow-tags -o ci.skip origin main",
      });

      expect(releaseTrigger.gitPushCommand).toEqual(
        "git push --follow-tags -o ci.skip origin main",
      );
    });
  });
});

describe("continuous release", () => {
  beforeAll(() => {
    releaseTrigger = ReleaseTrigger.continuous();
  });

  test("is continuous", () => {
    expect(releaseTrigger.isContinuous).toBe(true);
  });

  test("is not manual", () => {
    expect(releaseTrigger.isManual).toBe(false);
  });

  test("does not have a schedule", () => {
    expect(releaseTrigger.schedule).toBeUndefined();
  });

  test("does not have tags", () => {
    expect(releaseTrigger.tags).toBeUndefined();
  });

  test("does not have a changelog", () => {
    expect(releaseTrigger.changelogPath).toBeUndefined();
  });

  test("does not set path by default", () => {
    expect(releaseTrigger.paths).toBeUndefined();
  });

  describe("path configuration", () => {
    beforeAll(() => {
      releaseTrigger = ReleaseTrigger.continuous({ paths: ["foo/**"] });
    });

    test("it has path configured", () => {
      expect(releaseTrigger.paths).toEqual(["foo/**"]);
    });
  });
});

describe("scheduled release", () => {
  let releaseSchedule = "0 17 * * *";

  beforeAll(() => {
    releaseTrigger = ReleaseTrigger.scheduled({
      schedule: releaseSchedule,
    });
  });

  test("is not continuous", () => {
    expect(releaseTrigger.isContinuous).toBe(false);
  });

  test("is not manual", () => {
    expect(releaseTrigger.isManual).toBe(false);
  });

  test("has a schedule", () => {
    expect(releaseTrigger.schedule).toEqual(releaseSchedule);
  });

  test("does not have tags", () => {
    expect(releaseTrigger.tags).toBeUndefined();
  });

  test("does not have a changelog", () => {
    expect(releaseTrigger.changelogPath).toBeUndefined();
  });
});

describe("tagged release", () => {
  let tags = ["v*.*.*", "!v*.*.*-**"];

  beforeAll(() => {
    releaseTrigger = ReleaseTrigger.tagged({
      tags: tags,
    });
  });

  test("is not continuous", () => {
    expect(releaseTrigger.isContinuous).toBe(false);
  });

  test("is not manual", () => {
    expect(releaseTrigger.isManual).toBe(false);
  });

  test("does not have a schedule", () => {
    expect(releaseTrigger.schedule).toBeUndefined();
  });

  test("does have tags", () => {
    expect(releaseTrigger.tags).toEqual(tags);
  });

  test("does not have a changelog", () => {
    expect(releaseTrigger.changelogPath).toBeUndefined();
  });
});

describe("workflowdispatch release", () => {
  const trigger = ReleaseTrigger.workflowDispatch();

  test("is not manual", () => {
    // Well it is, but not for what this property is used for, which is to determine
    // whether a local `yarn release` task needs to be generated.
    expect(trigger.isManual).toEqual(false);
  });
});
