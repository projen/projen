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
  readonly skipBump?: boolean;
  readonly skipChangelog?: boolean;
  readonly capture?: boolean;
  readonly noColors?: boolean;
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
      const cmd = [this.cmd];
      if (options.noColors) {
        cmd.push("--no-colors");
      }

      let ret: any;
      if (options.capture) {
        ret = execCapture(cmd.join(" "), {
          cwd: this.cwd,
        }).toString();
      } else {
        ret = exec(cmd.join(" "), { cwd: this.cwd });
      }
      return ret;
    } finally {
      await fs.unlink(rcfile);
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
    const output = await this.invoke({
      capture: true,
      dryRun: true,
      skipChangelog: true,
      noColors: true,
    });
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
