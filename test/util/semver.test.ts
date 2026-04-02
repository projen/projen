import {
  toReleaseVersion,
  toMavenVersionRange,
  toNuGetVersionRange,
  toPythonVersionRange,
  TargetName,
} from "../../src/util/semver";

describe(`toReleaseVersion (${TargetName.PYTHON})`, () => {
  test("supports standard versions", () => {
    expect(toReleaseVersion("1.2.3", TargetName.PYTHON)).toBe("1.2.3");
  });
  test("supports build metadata", () => {
    expect(toReleaseVersion("1.2.3+foobar", TargetName.PYTHON)).toBe(
      "1.2.3+foobar",
    );
  });
  test("supports pre-releases", () => {
    expect(toReleaseVersion("1.2.3-rc.123", TargetName.PYTHON)).toBe(
      "1.2.3.rc123",
    );
  });
  test("supports developmental releases", () => {
    expect(toReleaseVersion("1.2.3-dev.123", TargetName.PYTHON)).toBe(
      "1.2.3.dev123",
    );
  });
  test("supports post releases", () => {
    expect(toReleaseVersion("1.2.3-post.123", TargetName.PYTHON)).toBe(
      "1.2.3.post123",
    );
  });
  test("supports pre-releases with dev/post and build metadata", () => {
    expect(
      toReleaseVersion(
        "1.2.3-rc.123.post.456.dev.789+foobar",
        TargetName.PYTHON,
      ),
    ).toBe("1.2.3.rc123.post456.dev789+foobar");
  });
});

describe("toMavenVersionRange", () => {
  test("converts caret range", () => {
    expect(toMavenVersionRange("^1.2.3")).toBe("[1.2.3,2.0.0)");
  });

  test("converts tilde range", () => {
    expect(toMavenVersionRange("~1.2.3")).toBe("[1.2.3,1.3.0)");
  });

  test("passes through exact version", () => {
    expect(toMavenVersionRange("1.2.3")).toBe("1.2.3");
  });

  test("passes through >= range", () => {
    expect(toMavenVersionRange(">=2.0.0")).toBe(">=2.0.0");
  });

  test("converts wildcard", () => {
    expect(toMavenVersionRange("*")).toBe("[0.0.0,)");
  });
});

describe("toNuGetVersionRange", () => {
  test("converts caret range", () => {
    expect(toNuGetVersionRange("^1.2.3")).toBe("[1.2.3,2.0.0)");
  });

  test("converts tilde range", () => {
    expect(toNuGetVersionRange("~1.2.3")).toBe("[1.2.3,1.3.0)");
  });

  test("passes through exact version", () => {
    expect(toNuGetVersionRange("1.2.3")).toBe("1.2.3");
  });

  test("passes through >= range", () => {
    expect(toNuGetVersionRange(">=2.0.0")).toBe(">=2.0.0");
  });
});

describe("toPythonVersionRange", () => {
  test("converts caret range", () => {
    expect(toPythonVersionRange("^1.2.3")).toBe(">=1.2.3, <2.0.0");
  });

  test("converts tilde range", () => {
    expect(toPythonVersionRange("~1.2.3")).toBe(">=1.2.3, <1.3.0");
  });

  test("converts exact version", () => {
    expect(toPythonVersionRange("1.2.3")).toBe("==1.2.3");
  });

  test("converts >= range", () => {
    expect(toPythonVersionRange(">=2.0.0")).toBe(">=2.0.0");
  });
});
