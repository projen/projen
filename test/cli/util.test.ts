import {
  renderInstallArgs,
  findJsiiFilePath,
  CliError,
} from "../../src/cli/util";

describe("renderInstallArgs", () => {
  test("renders npm install args with dir and module", () => {
    const args = renderInstallArgs("/tmp/test", "my-module");
    expect(args[0]).toBe("install");
    expect(args).toContain("--prefix=/tmp/test");
    expect(args).toContain("my-module");
    expect(args).toContain("--save-dev");
  });
});

describe("findJsiiFilePath", () => {
  test("returns path for a jsii module", () => {
    // projen itself is a jsii module
    const result = findJsiiFilePath(process.cwd(), "projen");
    expect(result).toBeDefined();
  });
});

describe("CliError", () => {
  test("joins multiple lines", () => {
    const err = new CliError("line1", "line2");
    expect(err.message).toBe("line1\nline2");
    expect(err.name).toBe("CliError");
  });

  test("is an instance of Error", () => {
    const err = new CliError("test");
    expect(err).toBeInstanceOf(Error);
  });
});
