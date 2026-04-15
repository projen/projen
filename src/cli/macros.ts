import * as path from "path";
import { execOrUndefined, formatAsPythonModule } from "../util";

export function tryProcessMacro(cwd: string, macro: string) {
  if (!macro.startsWith("$")) {
    return undefined;
  }

  const basedir = path.basename(cwd);

  switch (macro) {
    case "$BASEDIR":
      return basedir;
    case "$GIT_REMOTE":
      const origin = execOrUndefined("git remote get-url origin", { cwd });
      if (origin) {
        return origin;
      }
      const slug =
        getFromGitConfig(cwd, "github.user") ?? resolveEmail(cwd).split("@")[0];
      return `https://github.com/${slug}/${basedir}.git`;

    case "$GIT_USER_NAME":
      return getFromGitConfig(cwd, "user.name") ?? "user";
    case "$GIT_USER_EMAIL":
      return resolveEmail(cwd);
    case "$PYTHON_MODULE_NAME":
      return formatAsPythonModule(basedir);
    case "$PACKAGE_MANAGER":
      return detectPackageManager();
  }

  return undefined;
}

/**
 * Returns a value from git config. Searches local and then global git config.
 * @param key the config key
 */
function getFromGitConfig(cwd: string, key: string): string | undefined {
  return (
    execOrUndefined(`git config --get --includes ${key}`, { cwd }) ??
    execOrUndefined(`git config --get --global --includes ${key}`, { cwd })
  );
}

function resolveEmail(cwd: string): string {
  return getFromGitConfig(cwd, "user.email") ?? "user@domain.com";
}

/**
 * Detects the package manager used to run `projen new`.
 *
 * Uses `npm_config_user_agent` (e.g. "yarn/4.1.0 npm/? node/v20.0.0") to
 * identify the package manager and version. Falls back to `npm_execpath` if
 * the user agent is not set. Defaults to `npm` when detection fails.
 *
 * For yarn, the version determines classic (1.x) vs berry (>=2).
 */
function detectPackageManager(): string {
  const userAgent = process.env.npm_config_user_agent ?? "";
  const match = userAgent.match(/^(\w+)\/(\d+)/);
  if (match) {
    const [, name, major] = match;
    if (name === "yarn") {
      return Number(major) >= 2 ? "yarn_berry" : "yarn_classic";
    }
    if (name === "pnpm") {
      return "pnpm";
    }
    if (name === "bun") {
      return "bun";
    }
    if (name === "npm") {
      return "npm";
    }
  }

  // Fallback: check npm_execpath
  const execPath = process.env.npm_execpath ?? "";
  if (execPath.includes("yarn")) {
    return "yarn_classic";
  }
  if (execPath.includes("pnpm")) {
    return "pnpm";
  }
  if (execPath.includes("bun")) {
    return "bun";
  }
  return "npm";
}
