import * as JSONC from "comment-json";
import type { GitHub } from "./github";
import { PROJEN_DIR } from "../common";
import type { IResolver } from "../file";
import { FileBase } from "../file";
import type { Task } from "../task";
import { tryReadFileSync } from "../util";
import { parseActionSpec } from "./private/actions-versions-model";
import type {
  ActionsManifest,
  ActionsManifestEntry,
} from "./private/actions-versions-model";

/**
 * The name of the task added by `GitHubActionsVersions`.
 */
const UPDATE_TASK_NAME = "update-github-actions";

/**
 * Options for `GitHubActionsVersions`.
 */
export interface GitHubActionsVersionsOptions {
  /**
   * The GitHub Actions to manage, e.g. `actions/checkout@7`.
   *
   * Declare the approved major version line by appending `@<major>` (e.g.
   * `actions/checkout@7`). Declared majors are locked: the update task only
   * refreshes pins within the line and you upgrade by changing the
   * declaration. Actions listed without a major (e.g. `actions/checkout`)
   * have their major line managed by the update task instead.
   *
   * @default - no actions are managed
   */
  readonly actions?: string[];

  /**
   * Path to the JSONC manifest file that records the resolved version pins.
   *
   * The file is auto-generated and should be committed, so that the exact
   * pins in use are reviewable and stable across machines.
   *
   * @default ".projen/github-actions.jsonc"
   */
  readonly jsonPath?: string;

  /**
   * Require immutable pins: commit SHAs or release tags that GitHub reports
   * as immutable (cannot be repointed). When disabled, actions are pinned to
   * plain release tags instead.
   *
   * @default true
   */
  readonly immutablePins?: boolean;

  /**
   * Allow the update task to upgrade actions to new major version lines.
   *
   * Only applies to actions without a major declared in the projenrc.
   * Regardless of this setting, a single action can be upgraded explicitly
   * with `update-github-actions --upgrade-major=owner/repo`.
   *
   * @default false
   */
  readonly upgradeMajorVersions?: boolean;

  /**
   * Report newly available major version lines that are not adopted
   * automatically. Reports are printed by the update task, and tracking
   * issues are opened when it is invoked with `--create-issues`.
   *
   * @default false
   */
  readonly reportMajorVersions?: boolean;

  /**
   * Days a release must be public before the update task adopts it, giving
   * brand-new releases time to be yanked or patched.
   *
   * @default 7
   */
  readonly cooldownDays?: number;
}

/**
 * Manages the versions of the GitHub Actions used in the project's workflows.
 *
 * Actions are declared in the projenrc (e.g. `actions/checkout@7`) and
 * resolved version pins are recorded in an auto-generated, committed JSONC
 * manifest. Every resolved action is registered with the project's
 * `GitHubActionsProvider`, so all synthesized workflows use the pinned
 * references.
 *
 * The `update-github-actions` task resolves each action's version line to a
 * concrete pin (by default a commit SHA or an immutable release tag) using
 * the GitHub API, and re-synthesizes the project so workflows pick up the new
 * pins. Major version lines declared in the projenrc are never changed by the
 * task; majors of actions declared without a version are upgraded only when
 * `upgradeMajorVersions` is enabled or when the task is invoked with
 * `--upgrade-major=owner/repo`.
 */
export class GitHubActionsVersions extends FileBase {
  /**
   * The task that resolves action version lines to concrete pins.
   */
  public readonly updateTask: Task;

  private readonly github: GitHub;
  private readonly declared = new Map<string, string | undefined>();
  private manifest?: ActionsManifest;

  constructor(github: GitHub, options: GitHubActionsVersionsOptions = {}) {
    super(
      github.project,
      options.jsonPath ?? `${PROJEN_DIR}/github-actions.jsonc`,
    );

    this.github = github;

    for (const spec of options.actions ?? []) {
      this.addAction(spec);
    }

    const args = [this.path, `--cooldown-days=${options.cooldownDays ?? 7}`];
    if (options.immutablePins === false) {
      args.push("--mutable-pins");
    }
    if (options.upgradeMajorVersions) {
      args.push("--upgrade-major-versions");
    }
    if (options.reportMajorVersions) {
      args.push("--report-major-versions");
    }

    this.updateTask = this.project.addTask(UPDATE_TASK_NAME, {
      description:
        "Resolve the version lines of GitHub Actions to concrete pins",
    });
    this.updateTask.addSteps({
      builtin: "github/update-github-actions",
      args,
      receiveArgs: true,
    });

    // Re-run the default task afterwards so the workflows pick up new pins.
    if (this.project.defaultTask) {
      this.updateTask.spawn(this.project.defaultTask);
    }
  }

  /**
   * Add a GitHub Action to be managed, e.g. `actions/checkout@7`.
   *
   * @param spec The action name, optionally followed by `@<major>` to
   * declare (and lock) the approved major version line.
   */
  public addAction(spec: string) {
    const { name, major } = parseActionSpec(spec);

    const existing = this.declared.get(name);
    if (this.declared.has(name) && existing !== major) {
      throw new Error(
        `The GitHub Action "${name}" is already declared as "${name}${
          existing ? `@${existing}` : ""
        }". Remove one of the conflicting declarations.`,
      );
    }

    this.declared.set(name, major);
  }

  public preSynthesize() {
    super.preSynthesize();

    // Register every resolved action with the actions provider, so all
    // workflow steps using the action are rewritten to the pinned reference.
    const unresolved: string[] = [];
    for (const [name, entry] of Object.entries(this.buildManifest().actions)) {
      const ref = entry.pin ?? entry.major;
      if (ref) {
        this.github.actions.set(name, `${name}@${ref}`);
      } else {
        unresolved.push(name);
      }
    }

    if (unresolved.length > 0) {
      this.project.logger.warn(
        `No version resolved yet for GitHub Action(s): ${unresolved.join(
          ", ",
        )}. Run "${this.project.projenCommand} ${UPDATE_TASK_NAME}" to resolve pins.`,
      );
    }
  }

  protected synthesizeContent(resolver: IResolver): string | undefined {
    const manifest = resolver.resolve(this.buildManifest(), {
      omitEmpty: false,
    });

    const lines = [
      ...(this.marker ? [`// ${this.marker}`, "//"] : []),
      "// The GitHub Actions used by this project, mapped to the version line they",
      "// follow. Fields per action:",
      '// - "major":       The approved version line (e.g. "v7"). Declared in the',
      '//                   projenrc ("owner/repo@7") or managed by the update task.',
      '// - "majorLocked":  Whether the major line is declared in the projenrc. Locked',
      "//                   majors are never changed by the update task.",
      '// - "pin":          Concrete ref (commit SHA or release tag) within the major',
      '//                   line. Written by the "update-github-actions" task.',
      '// - "version":      The human-readable version the pin corresponds to, when',
      "//                   the pin is not self-describing (i.e. a SHA).",
      '// - "isImmutable":  Whether the pin is a release tag GitHub reports as',
      "//                   immutable, as strong a guarantee as a commit SHA.",
      JSONC.stringify(manifest, null, 2),
    ];

    return `${lines.join("\n")}\n`;
  }

  /**
   * Merge the actions declared in the projenrc with the resolved pins from
   * the manifest on disk (the state written by the update task).
   */
  private buildManifest(): ActionsManifest {
    if (this.manifest) {
      return this.manifest;
    }

    const state = this.readState();
    const actions: Record<string, ActionsManifestEntry> = {};

    for (const name of [...this.declared.keys()].sort()) {
      const declaredMajor = this.declared.get(name);
      const old = state[name];

      const major = declaredMajor ?? old?.major;

      // Carry resolved pins over only while they are within the current
      // major line, so changing a declaration drops the stale pin.
      const keepPin = old && major === old.major;

      actions[name] = {
        ...(major ? { major } : {}),
        ...(declaredMajor ? { majorLocked: true } : {}),
        ...(keepPin && old.pin ? { pin: old.pin } : {}),
        ...(keepPin && old.version ? { version: old.version } : {}),
        ...(keepPin && old.isImmutable ? { isImmutable: true } : {}),
      };
    }

    this.manifest = { actions };
    return this.manifest;
  }

  /**
   * Read the manifest state currently on disk, if any.
   */
  private readState(): Record<string, ActionsManifestEntry> {
    const content = tryReadFileSync(this.absolutePath);
    if (content === undefined) {
      return {};
    }

    try {
      // The third argument strips comments, so we get a plain object back.
      const data = JSONC.parse(
        content,
        undefined,
        true,
      ) as unknown as ActionsManifest;
      return data?.actions ?? {};
    } catch (e) {
      throw new Error(
        `Unable to parse "${this.path}": ${e}. Fix or delete the file and run "${this.project.projenCommand}" again.`,
      );
    }
  }
}
