import { toReleaseVersion, TargetName } from "../../src/util/semver";

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
