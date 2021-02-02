import * as os from 'os';
import * as path from 'path';
import { execOrUndefined, formatAsPythonModule } from '../util';

export function tryProcessMacro(macro: string) {
  if (!macro.startsWith('$')) { return undefined; }

  const basedir = path.basename(process.cwd());

  switch (macro) {
    case '$BASEDIR': return basedir;
    case '$GIT_REMOTE':
      const origin = execOrUndefined('git remote get-url origin');
      if (origin) {
        return origin;
      }
      const slug = getFromGitConfig('github.user') ?? resolveEmail().split('@')[0];
      return `https://github.com/${slug}/${basedir}.git`;

    case '$GIT_USER_NAME': return getFromGitConfig('user.name') ?? 'user';
    case '$GIT_USER_EMAIL': return resolveEmail();
    case '$PYTHON_PATH': return resolvePython();
    case '$PYTHON_MODULE_NAME': return formatAsPythonModule(basedir);
  }

  return undefined;
}

/**
 * Returns a value from git config. Searches local and then global git config.
 * @param key the config key
 */
function getFromGitConfig(key: string): string | undefined {
  return execOrUndefined(`git config --get --includes ${key}`)
    ?? execOrUndefined(`git config --get --global --includes ${key}`);
}

function resolveEmail(): string {
  return getFromGitConfig('user.email') ?? 'user@domain.com';
}

function resolvePython(): string {
  const command = os.platform() === 'win32' ? '(Get-Command python).Path' : 'which python';
  const defaultValue = os.platform() === 'win32' ? 'C:\\Python36\\python.exe' : '/usr/bin/python';
  return execOrUndefined(command) ?? defaultValue;
}
