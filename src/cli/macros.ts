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
    case "$GIT_DEFAULT_BRANCH":
      return getFromGitConfig(cwd, "init.defaultBranch") ?? "main";
    case "$GIT_USER_NAME":
      return getFromGitConfig(cwd, "user.name") ?? "user";
    case "$GIT_USER_EMAIL":
      return resolveEmail(cwd);
    case "$PYTHON_MODULE_NAME":
      return formatAsPythonModule(basedir);
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
