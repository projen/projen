// Builtin task for the `GitHubActionsVersions` component: resolves the
// version lines of the GitHub Actions in the manifest to concrete pins.
//
// Usage: github/update-github-actions <manifest-path>
//          [--cooldown-days=N] [--mutable-pins]
//          [--upgrade-major-versions] [--report-major-versions]
//          [--upgrade-major=owner/repo]... [--dry-run] [--create-issues]
//
// Auth: uses $GITHUB_TOKEN when set. Required (together with
// $GITHUB_REPOSITORY) for creating tracking issues; resolution works
// unauthenticated but may hit rate limits.
import { updateGithubActions } from "./private/update-github-actions";
import { runBuiltin } from "../util/task-env";

runBuiltin(async () => {
  const flags = new Map<string, string | undefined>();
  const upgradeMajor: string[] = [];
  const positionals: string[] = [];

  for (const arg of process.argv.slice(2)) {
    if (!arg.startsWith("--")) {
      positionals.push(arg);
      continue;
    }
    const eq = arg.indexOf("=");
    const name = eq === -1 ? arg.slice(2) : arg.slice(2, eq);
    const value = eq === -1 ? undefined : arg.slice(eq + 1);
    if (name === "upgrade-major") {
      if (!value) {
        throw new Error(
          "--upgrade-major requires an action name, e.g. --upgrade-major=actions/checkout",
        );
      }
      upgradeMajor.push(value);
    } else {
      flags.set(name, value);
    }
  }

  const known = [
    "cooldown-days",
    "mutable-pins",
    "upgrade-major-versions",
    "report-major-versions",
    "dry-run",
    "create-issues",
  ];
  for (const name of flags.keys()) {
    if (!known.includes(name)) {
      throw new Error(`Unknown option: --${name}`);
    }
  }

  const filePath = positionals[0];
  if (!filePath) {
    throw new Error("Missing required argument: path to the actions manifest");
  }

  const rawCooldown = flags.get("cooldown-days");
  const cooldownDays =
    rawCooldown !== undefined ? Number(rawCooldown) : undefined;
  if (cooldownDays !== undefined && Number.isNaN(cooldownDays)) {
    throw new Error(`--cooldown-days must be a number: ${rawCooldown}`);
  }

  await updateGithubActions({
    filePath,
    cooldownDays,
    mutablePins: flags.has("mutable-pins"),
    upgradeMajorVersions: flags.has("upgrade-major-versions"),
    reportMajorVersions: flags.has("report-major-versions"),
    upgradeMajor,
    dryRun: flags.has("dry-run"),
    createIssues: flags.has("create-issues"),
  });
});
