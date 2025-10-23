/**
 * Library to invoke commit-and-tag-version
 */
import { promises as fs } from "fs";
import * as path from "node:path";
import { Config } from "conventional-changelog-config-spec";
import * as logging from "../logging";
import { exec, execCapture } from "../util";

const DEFAULT_CATV_SPEC = "commit-and-tag-version@^12";

export interface CommitAndTagOptions {
  readonly tagPrefix?: string;
  readonly versionFile: string;
  readonly changelogFile?: string;
  readonly prerelease?: string;
  readonly configOptions?: Config;
}

export interface InvokeOptions {
  readonly releaseAs?: string;
  readonly dryRun?: boolean;
  /** Avoid updating the version files */
  readonly skipBump?: boolean;
  readonly skipChangelog?: boolean;
  readonly capture?: boolean;
}

export class CommitAndTagVersion {
  private readonly cmd: string;

  constructor(
    packageSpec: string | undefined,
    private readonly cwd: string,
    private readonly options: CommitAndTagOptions
  ) {
    let cmd;
    if (!packageSpec) {
      // If no packageSpec is given, try and resolve the CATV binary
      // from devDependencies. This will speed up execution a lot.
      try {
        cmd = `${process.execPath} ${require.resolve(
          "commit-and-tag-version/bin/cli.js"
        )}`;
      } catch {
        // Oh well
      }
    }

    this.cmd = cmd ?? `npx ${packageSpec ?? DEFAULT_CATV_SPEC}`;
  }

  /**
   * Invoke the `commit-and-tag` package
   */
  public async invoke<A extends InvokeOptions>(
    options: A
  ): Promise<A extends { capture: true } ? string : void> {
    const catvConfig: CommitAndTagConfig = {
      packageFiles: [
        {
          filename: this.options.versionFile,
          type: "json",
        },
      ],
      bumpFiles: [
        {
          filename: this.options.versionFile,
          type: "json",
        },
      ],
      commitAll: false,
      infile: this.options.changelogFile,
      prerelease: this.options.prerelease,
      header: "",
      skip: {
        commit: true,
        tag: true,
        bump: options.skipBump,
        changelog: options.skipChangelog,
      },
      tagPrefix: this.options.tagPrefix
        ? `${this.options.tagPrefix}v`
        : undefined,
      releaseAs: options.releaseAs,
      dryRun: options.dryRun,
      ...this.options.configOptions,
    };
    logging.debug(`.versionrc.json: ${JSON.stringify(catvConfig)}`);

    // Generate a temporary config file, then execute the package and remove the
    // config file again.
    const rcfile = path.join(this.cwd, ".versionrc.json");
    await fs.writeFile(rcfile, JSON.stringify(catvConfig, undefined, 2));
    try {
      let ret: any;
      if (options.capture) {
        ret = execCapture(this.cmd, {
          cwd: this.cwd,
        }).toString();
      } else {
        ret = exec(this.cmd, { cwd: this.cwd });
      }
      return ret;
    } finally {
      await fs.unlink(rcfile);
    }
  }

  /**
   * Regenerate the most recent change log
   *
   * Do this by deleting the most recent tag, running CATV, then
   * restoring the tag.
   *
   * We do this combined with skipping the bump to make CATV regenerate the
   * changelog of the most recent release (if we left the tag, the changelog
   * would be empty).
   */
  public async regeneratePreviousChangeLog(version: string, latestTag: string) {
    const oldCommit = execCapture(`git rev-parse ${latestTag}`, {
      cwd: this.cwd,
    })
      .toString("utf8")
      .trim();

    exec(`git tag --delete ${latestTag}`, { cwd: this.cwd });
    try {
      await this.invoke({
        releaseAs: version,
        skipBump: true,
      });
    } finally {
      exec(`git tag ${latestTag} ${oldCommit}`, { cwd: this.cwd });
    }
  }

  /**
   * Invoke CATV and return the version it would have bumped to
   *
   * CATV will always at least perform a patch bump, even if there aren't any
   * commits to look at.
   *
   * We have to do this by parsing the output string, which is pretty bad
   * but I don't see that we have another way.
   */
  public async dryRun(): Promise<string> {
    const output = stripAnsi(
      await this.invoke({
        capture: true,
        dryRun: true,
        skipChangelog: true,
      })
    );
    const re = /bumping version.*from ([0-9a-z.+-]+) to ([0-9a-z.+-]+)/im;
    const m = re.exec(output);
    if (!m) {
      throw new Error(`Could not match ${re} in ${output}`);
    }

    return m[2];
  }
}

/**
 * Modeling the CATV config file
 */
interface CommitAndTagConfig extends Config {
  packageFiles?: Array<{ filename: string; type: string }>;
  bumpFiles?: Array<{ filename: string; type: string }>;
  commitAll?: boolean;
  infile?: string;
  prerelease?: string;
  skip?: {
    commit?: boolean;
    tag?: boolean;
    bump?: boolean;
    changelog?: boolean;
  };
  firstRelease?: boolean;
  tagPrefix?: string;
  releaseAs?: string;
  dryRun?: boolean;
  path?: string;
}

/**
 * Strips ANSI escape codes from a string
 *
 * Need to use this because the `--no-colors` argument to CATV is sometimes
 * respected and sometimes not and it's driving me crazy.
 */
function stripAnsi(str: string): string {
  // Pattern matches all ANSI escape sequences including colors, cursor movement, etc
  const pattern = [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))",
  ].join("|");
  return str.replace(new RegExp(pattern, "g"), "");
}
