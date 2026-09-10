// Implementation of the `github/update-github-actions` builtin task (see
// `update-github-actions.task.ts` for the entrypoint). Resolves the approved
// major version line of every GitHub Action in the manifest to a concrete
// pin: an immutable release tag when available (preferred), or the release's
// commit SHA otherwise. With `--mutable-pins`, plain release tags are used.
//
// Rules:
// - Only releases older than the cooldown are considered, so brand-new
//   releases have time to be yanked or patched before we adopt them.
// - Major lines declared in the projenrc ("majorLocked") are never changed.
//   Other major lines are upgraded when `--upgrade-major-versions` is set,
//   or per action via `--upgrade-major=owner/repo`.
// - With `--report-major-versions`, newer major lines that were not adopted
//   are printed, and a tracking issue is opened per action and target major
//   when `--create-issues` is passed (requires GITHUB_TOKEN and
//   GITHUB_REPOSITORY). Existing open issues are never duplicated.
// - Comments in the manifest (including the projen marker) are preserved.
import { readFileSync } from "node:fs";
import * as JSONC from "comment-json";
import type {
  ActionsManifest,
  ActionsManifestEntry,
} from "./actions-versions-model";
import { majorNumberOf, repoOfAction } from "./actions-versions-model";
import { isWritable, writeFile } from "../../util";

const ISSUE_LABEL = "github-actions-upgrade";

/**
 * Options for a GitHub API request.
 */
export interface GitHubApiOptions {
  readonly method?: string;
  readonly body?: unknown;
  readonly allow404?: boolean;
}

/**
 * A minimal GitHub REST API client. Injectable for tests.
 */
export type GitHubApi = (
  path: string,
  options?: GitHubApiOptions,
) => Promise<any>;

export interface UpdateGithubActionsOptions {
  /**
   * Path to the JSONC manifest maintained by `GitHubActionsVersions`.
   */
  readonly filePath: string;
  /**
   * Days a release must be public before it is adopted.
   * @default 7
   */
  readonly cooldownDays?: number;
  /**
   * Pin to plain release tags instead of immutable refs.
   * @default false
   */
  readonly mutablePins?: boolean;
  /**
   * Upgrade unlocked actions to new major version lines.
   * @default false
   */
  readonly upgradeMajorVersions?: boolean;
  /**
   * Report newer major version lines that were not adopted.
   * @default false
   */
  readonly reportMajorVersions?: boolean;
  /**
   * Actions to upgrade to their latest major line, regardless of
   * `upgradeMajorVersions`.
   * @default []
   */
  readonly upgradeMajor?: string[];
  /**
   * Do not write the manifest or create issues.
   * @default false
   */
  readonly dryRun?: boolean;
  /**
   * Open a tracking issue per reported major upgrade.
   * @default false
   */
  readonly createIssues?: boolean;
  /**
   * GitHub API client override.
   * @default - a fetch-based client using $GITHUB_TOKEN when set
   */
  readonly api?: GitHubApi;
  /**
   * The current time (epoch ms), used for cooldown checks.
   * @default Date.now()
   */
  readonly now?: number;
  /**
   * Log sink.
   * @default console.log
   */
  readonly log?: (message: string) => void;
}

/** A GitHub release, reduced to the fields we use. */
interface Release {
  readonly tag_name: string;
  readonly draft?: boolean;
  readonly prerelease?: boolean;
  readonly immutable?: boolean;
  readonly published_at?: string;
  readonly created_at?: string;
}

export async function updateGithubActions(
  options: UpdateGithubActionsOptions,
): Promise<void> {
  const api = options.api ?? makeDefaultApi();
  const log = options.log ?? console.log;
  const now = options.now ?? Date.now();
  const cooldownDays = options.cooldownDays ?? 7;
  const upgradeMajor = options.upgradeMajor ?? [];

  const source = readFileSync(options.filePath, "utf-8");
  // Parsed with comments preserved, so writing the document back keeps the
  // projen marker and the field documentation header intact.
  const doc = JSONC.parse(source) as unknown as ActionsManifest;
  const actions = doc?.actions ?? {};

  for (const target of upgradeMajor) {
    const entry = actions[target];
    if (!entry) {
      throw new Error(
        `Unknown action "${target}" passed to --upgrade-major. Add it to the "actions" of GitHubActionsVersions in your projenrc first.`,
      );
    }
    if (entry.majorLocked) {
      throw new Error(
        `The major version of "${target}" is locked to "${entry.major}" by your projenrc. Change the declaration there (e.g. "${target}@8") and re-run projen instead of passing --upgrade-major.`,
      );
    }
  }

  const majorReports: Array<{ action: string; newMajor: number }> = [];
  let changed = false;

  for (const action of Object.keys(actions)) {
    const entry = actions[action];
    const currentMajor = majorNumberOf(entry.major);
    const mayUpgradeMajor =
      !entry.majorLocked &&
      (currentMajor === undefined ||
        options.upgradeMajorVersions === true ||
        upgradeMajor.includes(action));

    const releases: Release[] = await api(
      `/repos/${repoOfAction(action)}/releases?per_page=100`,
    );
    const eligible = eligibleReleases(releases, cooldownDays, now);
    if (eligible.length === 0) {
      log(
        `${action}: no eligible release (cooldown ${cooldownDays}d), leaving unchanged`,
      );
      continue;
    }

    const newestMajor = eligible.reduce(
      (max: number, r) => Math.max(max, majorNumberOf(r.tag_name)!),
      0,
    );
    const targetMajor = mayUpgradeMajor ? newestMajor : currentMajor!;

    if (newestMajor > targetMajor) {
      majorReports.push({ action, newMajor: newestMajor });
    }

    const latest = eligible
      .filter((r) => majorNumberOf(r.tag_name) === targetMajor)
      .sort(
        (a, b) =>
          new Date(b.published_at ?? b.created_at!).getTime() -
          new Date(a.published_at ?? a.created_at!).getTime(),
      )[0];
    if (!latest) {
      log(
        `${action}: no eligible release in v${targetMajor} (cooldown ${cooldownDays}d), leaving unchanged`,
      );
      continue;
    }

    // Resolve the release to a pin.
    let pin: string;
    let version: string | undefined;
    let isImmutable: boolean | undefined;
    if (options.mutablePins) {
      pin = latest.tag_name;
      isImmutable = latest.immutable ? true : undefined;
    } else if (latest.immutable) {
      pin = latest.tag_name;
      isImmutable = true;
    } else {
      pin = await resolveTagSha(api, action, latest.tag_name);
      version = latest.tag_name;
    }

    const major = `v${targetMajor}`;
    if (
      entry.major === major &&
      entry.pin === pin &&
      entry.version === version &&
      (entry.isImmutable ?? undefined) === isImmutable
    ) {
      continue;
    }

    log(
      `${action}: ${entry.pin ?? entry.major ?? "(unresolved)"} -> ${pin}${
        version ? ` (${version})` : ""
      }${isImmutable ? " (immutable)" : ""}`,
    );
    entry.major = major;
    entry.pin = pin;
    if (version) {
      entry.version = version;
    } else {
      delete entry.version;
    }
    if (isImmutable) {
      entry.isImmutable = true;
    } else {
      delete entry.isImmutable;
    }
    changed = true;
  }

  if (changed && !options.dryRun) {
    writeFile(options.filePath, `${JSONC.stringify(doc, null, 2)}\n`, {
      readonly: !isWritable(options.filePath),
    });
    log(`Updated ${options.filePath}`);
  } else if (changed) {
    log("[dry-run] manifest not written");
  } else {
    log("All pins already up to date.");
  }

  if (options.reportMajorVersions && majorReports.length > 0) {
    await reportMajors(majorReports, actions, options, api, log);
  }
}

/**
 * Stable releases with a parseable major that are past the cooldown.
 */
function eligibleReleases(
  releases: Release[],
  cooldownDays: number,
  now: number,
): Release[] {
  return releases.filter((r) => {
    if (r.draft || r.prerelease || majorNumberOf(r.tag_name) === undefined) {
      return false;
    }
    const published = new Date(r.published_at ?? r.created_at!).getTime();
    return now - published >= cooldownDays * 24 * 60 * 60 * 1000;
  });
}

/**
 * Resolve a tag to the commit SHA it points at, dereferencing annotated tags.
 */
async function resolveTagSha(
  api: GitHubApi,
  action: string,
  tag: string,
): Promise<string> {
  const repo = repoOfAction(action);
  const ref = await api(`/repos/${repo}/git/ref/tags/${tag}`);
  if (ref.object.type === "tag") {
    const annotated = await api(`/repos/${repo}/git/tags/${ref.object.sha}`);
    return annotated.object.sha;
  }
  return ref.object.sha;
}

/**
 * Print newer major lines that were not adopted and optionally open one
 * tracking issue per action and target major.
 */
async function reportMajors(
  reports: Array<{ action: string; newMajor: number }>,
  actions: Record<string, ActionsManifestEntry>,
  options: UpdateGithubActionsOptions,
  api: GitHubApi,
  log: (message: string) => void,
): Promise<void> {
  for (const { action, newMajor } of reports) {
    log(`new major available: ${action} v${newMajor}`);
  }

  if (!options.createIssues) {
    log("Pass --create-issues to open tracking issues for these.");
    return;
  }
  if (options.dryRun) {
    log("[dry-run] tracking issues not created");
    return;
  }
  const repo = process.env.GITHUB_REPOSITORY;
  if (!repo) {
    log("GITHUB_REPOSITORY not set, skipping tracking issue creation.");
    return;
  }
  if (!process.env.GITHUB_TOKEN) {
    log("GITHUB_TOKEN not set, skipping tracking issue creation.");
    return;
  }

  // Ensure the label exists.
  const label = await api(`/repos/${repo}/labels/${ISSUE_LABEL}`, {
    allow404: true,
  });
  if (!label) {
    await api(`/repos/${repo}/labels`, {
      method: "POST",
      body: {
        name: ISSUE_LABEL,
        color: "1D76DB",
        description: "A new major version of a GitHub Action is available",
      },
    });
  }

  const openIssues: Array<{ title: string }> = await api(
    `/repos/${repo}/issues?labels=${ISSUE_LABEL}&state=open&per_page=100`,
  );

  for (const { action, newMajor } of reports) {
    const title = `Upgrade ${action} to v${newMajor}`;
    if (openIssues.some((issue) => issue.title === title)) {
      log(`issue exists: ${title}`);
      continue;
    }

    const howTo = actions[action]?.majorLocked
      ? `update the action's declaration in your projenrc to \`${action}@${newMajor}\` and run projen`
      : `run \`projen update-github-actions --upgrade-major=${action}\``;

    await api(`/repos/${repo}/issues`, {
      method: "POST",
      body: {
        title,
        labels: [ISSUE_LABEL],
        body: [
          `A new major version line of \`${action}\` is available: **v${newMajor}**.`,
          "",
          `Major upgrades are never applied automatically. To adopt it, review the [release notes](https://github.com/${repoOfAction(
            action,
          )}/releases) and ${howTo}.`,
          "",
          "---",
          '*Automatically created by the "update-github-actions" task.*',
        ].join("\n"),
      },
    });
    log(`created issue: ${title}`);
  }
}

/**
 * A GitHub REST API client based on the global fetch, authenticating with
 * $GITHUB_TOKEN when set. Resolution works unauthenticated but may hit rate
 * limits; creating tracking issues requires the token.
 */
function makeDefaultApi(): GitHubApi {
  // The global fetch exists on all supported Node.js versions, but the
  // compilation target's type definitions do not declare it.
  const fetch: (url: string, init?: any) => Promise<any> = (globalThis as any)
    .fetch;

  return async (path, { method = "GET", body, allow404 = false } = {}) => {
    const token = process.env.GITHUB_TOKEN;
    const response = await fetch(`https://api.github.com${path}`, {
      method,
      headers: {
        accept: "application/vnd.github+json",
        "x-github-api-version": "2022-11-28",
        ...(token ? { authorization: `Bearer ${token}` } : {}),
        ...(body ? { "content-type": "application/json" } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (allow404 && response.status === 404) {
      return undefined;
    }
    if (!response.ok) {
      throw new Error(
        `${method} ${path}: ${response.status} ${response.statusText}`,
      );
    }
    return response.json();
  };
}
