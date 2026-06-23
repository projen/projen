import { tryProcessMacro } from "../../src/cli/macros";
import { git } from "../../src/util/exec";

describe("tryProcessMacro", () => {
  const cwd = "/home/user/My.Project";

  afterEach(() => jest.restoreAllMocks());

  test("returns undefined for a non-macro string", () => {
    expect(tryProcessMacro(cwd, "not-a-macro")).toBeUndefined();
  });

  test("returns undefined for an unknown macro", () => {
    expect(tryProcessMacro(cwd, "$UNKNOWN")).toBeUndefined();
  });

  test("$BASEDIR returns the basename of the cwd", () => {
    expect(tryProcessMacro(cwd, "$BASEDIR")).toBe("My.Project");
  });

  test("$PYTHON_MODULE_NAME formats the basename as a python module", () => {
    expect(tryProcessMacro(cwd, "$PYTHON_MODULE_NAME")).toBe("My_Project");
  });

  describe("$GIT_REMOTE", () => {
    test("returns the origin remote URL when present", () => {
      jest
        .spyOn(git, "tryCapture")
        .mockImplementation((args) =>
          args[0] === "remote" ? "git@github.com:acme/widget.git" : undefined,
        );
      expect(tryProcessMacro(cwd, "$GIT_REMOTE")).toBe(
        "git@github.com:acme/widget.git",
      );
    });

    test("falls back to a github URL from github.user when there is no origin", () => {
      jest.spyOn(git, "tryCapture").mockImplementation((args) => {
        if (args[0] === "remote") return undefined;
        if (args.includes("github.user")) return "octocat";
        return undefined;
      });
      expect(tryProcessMacro(cwd, "$GIT_REMOTE")).toBe(
        "https://github.com/octocat/My.Project.git",
      );
    });

    test("falls back to the email local-part when there is no origin or github.user", () => {
      jest.spyOn(git, "tryCapture").mockImplementation((args) => {
        if (args[0] === "remote") return undefined;
        if (args.includes("github.user")) return undefined;
        if (args.includes("user.email")) return "jane@example.com";
        return undefined;
      });
      expect(tryProcessMacro(cwd, "$GIT_REMOTE")).toBe(
        "https://github.com/jane/My.Project.git",
      );
    });
  });

  describe("$GIT_USER_NAME", () => {
    test("returns the configured user.name", () => {
      jest.spyOn(git, "tryCapture").mockReturnValue("Jane Doe");
      expect(tryProcessMacro(cwd, "$GIT_USER_NAME")).toBe("Jane Doe");
    });

    test("defaults to 'user' when unset", () => {
      jest.spyOn(git, "tryCapture").mockReturnValue(undefined);
      expect(tryProcessMacro(cwd, "$GIT_USER_NAME")).toBe("user");
    });
  });

  describe("$GIT_USER_EMAIL", () => {
    test("returns the configured user.email", () => {
      jest.spyOn(git, "tryCapture").mockReturnValue("jane@example.com");
      expect(tryProcessMacro(cwd, "$GIT_USER_EMAIL")).toBe("jane@example.com");
    });

    test("defaults to user@domain.com when unset", () => {
      jest.spyOn(git, "tryCapture").mockReturnValue(undefined);
      expect(tryProcessMacro(cwd, "$GIT_USER_EMAIL")).toBe("user@domain.com");
    });
  });

  describe("$PACKAGE_MANAGER", () => {
    const original = {
      ua: process.env.npm_config_user_agent,
      execpath: process.env.npm_execpath,
    };

    afterEach(() => {
      process.env.npm_config_user_agent = original.ua;
      process.env.npm_execpath = original.execpath;
    });

    function detect(ua?: string, execpath?: string): string | undefined {
      if (ua === undefined) delete process.env.npm_config_user_agent;
      else process.env.npm_config_user_agent = ua;
      if (execpath === undefined) delete process.env.npm_execpath;
      else process.env.npm_execpath = execpath;
      return tryProcessMacro(cwd, "$PACKAGE_MANAGER");
    }

    test.each([
      ["yarn/1.22.0 npm/? node/v20.0.0", "yarn_classic"],
      ["yarn/4.1.0 npm/? node/v20.0.0", "yarn_berry"],
      ["pnpm/8.0.0 npm/? node/v20.0.0", "pnpm"],
      ["bun/1.0.0 npm/? node/v20.0.0", "bun"],
      ["npm/10.0.0 node/v20.0.0", "npm"],
    ])("detects %s from the user agent", (ua, expected) => {
      expect(detect(ua)).toBe(expected);
    });

    test.each([
      ["/path/to/yarn.js", "yarn_classic"],
      ["/path/to/pnpm.cjs", "pnpm"],
      ["/path/to/bun", "bun"],
    ])("falls back to npm_execpath %s", (execpath, expected) => {
      expect(detect(undefined, execpath)).toBe(expected);
    });

    test("defaults to npm when detection fails", () => {
      expect(detect("", "")).toBe("npm");
    });
  });
});
