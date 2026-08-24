import { readFileSync } from "node:fs";
import * as path from "node:path/posix";
import * as JSONC from "comment-json";
import type { FileBaseOptions, Project } from "../src";
import { JsonPatch, TextFile } from "../src";
import { Biome, Eslint, Jest, UpgradeDependencies } from "../src/javascript";

const SCRIPT_PATH = path.join("scripts", "update-github-actions.js");

/**
 * A single action entry in the map.
 */
export interface ActionEntry {
  /**
   * The approved version line (e.g. "v7"). Changing this requires human
   * review. Used directly as a floating tag unless a pin is set.
   */
  readonly major: string;
  /**
   * Optional concrete ref (commit SHA or immutable tag) within the major
   * line. Written by the update script, never by hand.
   */
  readonly pin?: string;
  /**
   * The human-readable version the pin corresponds to. Required when the pin
   * is not self-describing (i.e. a SHA).
   */
  readonly version?: string;
  /**
   * Whether the pin is an immutable tag: a release GitHub reports as
   * immutable, meaning the tag cannot be repointed and is as strong a
   * guarantee as a commit SHA. Set from the GitHub API, not by hand.
   */
  readonly isImmutable?: boolean;
  /**
   * Optional per-action override for the global cooldown.
   */
  readonly cooldownDays?: number;
}

/**
 * The shape of the github-actions.jsonc file.
 */
export interface ActionsFile {
  /**
   * Days a release must be public before the update script adopts it.
   * @default 7
   */
  readonly cooldownDays?: number;
  /**
   * Map of action name to its entry.
   */
  readonly actions: Record<string, ActionEntry>;
}

export interface ActionsConstOptions extends FileBaseOptions {
  /**
   * The path to the jsonc file holding the action map.
   */
  readonly jsonPath: string;
  /**
   * The path to the generated file.
   */
  readonly filePath: string;
  /**
   * A comment describing the contents
   * @default - a generic description
   */
  readonly comment?: string;
}

/**
 * A component that generates a typescript file exporting one constant per
 * GitHub Action, holding its fully qualified reference (`owner/repo@ref`).
 *
 * The source of truth is a jsonc map of action name to version information,
 * so that all action versions used across the code base can be reviewed and
 * bumped in a single place. Comments in that file explain any non-obvious
 * pins.
 *
 * The reference uses the entry's `pin` when set (a concrete ref within the
 * approved major line), and the floating `major` tag otherwise.
 */
export class ActionsConst extends TextFile {
  constructor(project: Project, options: ActionsConstOptions) {
    super(project, options.filePath, {
      committed: true,
      marker: true,
      readonly: true,
    });

    const fileContent = readFileSync(options.jsonPath, "utf-8");
    // The third argument strips comments, so we get a plain object back.
    const data = JSONC.parse(
      fileContent,
      undefined,
      true,
    ) as unknown as ActionsFile;

    Eslint.of(project)?.addIgnorePattern(this.path);
    Biome.of(project)?.addFilePattern(`!${this.path}`);
    Jest.of(project)?.addIgnorePattern(this.path);

    // Resolves each action's major line to a concrete pin (immutable tag or
    // commit SHA), and opens tracking issues for new major lines. Re-runs the
    // default task afterwards so this file picks up the new pins.
    const updateTask = project.addTask("update-github-actions", {
      description:
        "Resolve GitHub Action version lines to pinned refs and file issues for new majors",
    });
    updateTask.execArgs(["node", SCRIPT_PATH], {
      receiveArgs: true,
    });
    if (project.defaultTask) {
      updateTask.spawn(project.defaultTask);
    }

    if (this.marker) {
      this.addLine(`// ${this.marker}\n`);
    }

    const comment =
      options.comment ??
      "Fully qualified references for all GitHub Actions used by this project.";

    this.addLine("/**");
    for (const line of comment.split("\n")) {
      this.addLine(` * ${line}`);
    }
    this.addLine(" */");
    this.addLine("export class GitHubActions {");

    // Guard against two action names collapsing into the same constant name,
    // which would produce a file that does not compile.
    const seen = new Map<string, string>();

    for (const action of Object.keys(data.actions).sort()) {
      const entry = data.actions[action];
      const name = constantName(action);

      const collision = seen.get(name);
      if (collision) {
        throw new Error(
          `Actions "${collision}" and "${action}" both map to the constant "${name}". Rename one of them in ${options.jsonPath}.`,
        );
      }
      seen.set(name, action);

      const ref = entry.pin ?? entry.major;
      const label = entry.version ?? entry.pin ?? entry.major;
      const immutable = entry.isImmutable ? " (immutable)" : "";

      this.addLine(`  /** ${action} at ${label}${immutable} */`);
      this.addLine(`  public static readonly ${name} = "${action}@${ref}";`);
    }

    this.addLine("");
    this.addLine("  private constructor() {}");
    this.addLine("}");
  }

  /**
   * Wires the update task into the "upgrade-bundled" workflow (generated by
   * `UpgradeDependencies`), so action pins are refreshed on the same schedule
   * as bundled dependencies and land through the same PR. Done here via a
   * `JsonPatch` because `UpgradeDependencies` locks its task for changes
   * once constructed (same approach as `UpdateSchemasTask`).
   */
  public preSynthesize() {
    super.preSynthesize();

    const upgradeBundled = this.project.components.find(
      (c): c is UpgradeDependencies =>
        c instanceof UpgradeDependencies &&
        c.upgradeTask.name === "upgrade-bundled",
    );

    for (const workflow of upgradeBundled?.workflows ?? []) {
      const upgradeJob = workflow.getJob("upgrade") as any;
      if (!upgradeJob || !workflow.file) {
        continue;
      }

      const insertAt =
        upgradeJob.steps.findIndex(
          (step: any) => step.name === "Upgrade dependencies",
        ) + 1;

      workflow.file.patch(
        JsonPatch.add(`/jobs/upgrade/steps/${insertAt}`, {
          name: "Update GitHub Actions pins",
          // Only the workflow opens tracking issues, never local runs.
          run: "node ./projen.js update-github-actions --create-issues",
          env: {
            // Needed to create tracking issues for new major versions.
            GITHUB_TOKEN: "${{ secrets.PROJEN_GITHUB_TOKEN }}",
          },
        }),
      );
    }
  }
}

/**
 * Derive a constant name from an action name.
 *
 * `actions/setup-node` becomes `ACTIONS_SETUP_NODE`.
 */
function constantName(action: string): string {
  return action.replace(/[^a-zA-Z0-9]+/g, "_").toUpperCase();
}
