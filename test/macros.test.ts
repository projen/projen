import { tryProcessMacro } from "../src/cli/macros";

const cwd = process.cwd();

describe("$PACKAGE_MANAGER macro", () => {
  const env = process.env;

  beforeEach(() => {
    process.env = { ...env };
    delete process.env.npm_config_user_agent;
    delete process.env.npm_execpath;
  });

  afterAll(() => {
    process.env = env;
  });

  test("returns npm by default", () => {
    expect(tryProcessMacro(cwd, "$PACKAGE_MANAGER")).toBe("npm");
  });

  test.each([
    ["npm/10.2.0 node/v20.10.0", "npm"],
    ["yarn/1.22.19 npm/? node/v20.10.0", "yarn_classic"],
    ["yarn/4.1.0 npm/? node/v20.10.0", "yarn_berry"],
    ["pnpm/8.15.0 npm/? node/v20.10.0", "pnpm"],
    ["bun/1.0.0 node/v20.10.0", "bun"],
  ])("detects %s as %s via npm_config_user_agent", (userAgent, expected) => {
    process.env.npm_config_user_agent = userAgent;
    expect(tryProcessMacro(cwd, "$PACKAGE_MANAGER")).toBe(expected);
  });

  test.each([
    ["/usr/lib/node_modules/npm/bin/npm-cli.js", "npm"],
    ["/usr/share/yarn/bin/yarn.js", "yarn_classic"],
    ["/usr/lib/node_modules/pnpm/bin/pnpm.cjs", "pnpm"],
    ["/usr/local/bin/bun", "bun"],
  ])("falls back to npm_execpath %s as %s", (execPath, expected) => {
    process.env.npm_execpath = execPath;
    expect(tryProcessMacro(cwd, "$PACKAGE_MANAGER")).toBe(expected);
  });

  test("npm_config_user_agent takes precedence over npm_execpath", () => {
    process.env.npm_config_user_agent = "pnpm/8.15.0 npm/? node/v20.10.0";
    process.env.npm_execpath = "/usr/share/yarn/bin/yarn.js";
    expect(tryProcessMacro(cwd, "$PACKAGE_MANAGER")).toBe("pnpm");
  });
});
