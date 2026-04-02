import {
  renderInstallCommand,
  findJsiiFilePath,
  CliError,
} from "../../src/cli/util";

describe("renderInstallCommand", () => {
  test("renders npm install command with dir and module", () => {
    const cmd = renderInstallCommand("/tmp/test", "my-module");
    expect(cmd).toContain("npm install");
    expect(cmd).toContain('--prefix="/tmp/test"');
    expect(cmd).toContain("my-module");
    expect(cmd).toContain("--save-dev");
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
