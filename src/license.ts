import * as fs from "fs";
import { FileBase, IResolver } from "./file";
import { Project } from "./project";

export interface LicenseOptions {
  /**
   * License type (SPDX).
   *
   * @see https://github.com/projen/projen/tree/main/license-text for list of supported licenses
   */
  readonly spdx: string;

  /**
   * Copyright owner.
   *
   * If the license text has $copyright_owner, this option must be specified.
   *
   * @default -
   */
  readonly copyrightOwner?: string;

  /**
   * Period of license (e.g. "1998-2023")
   *
   * The string `$copyright_period` will be substituted with this string.
   *
   * @default - current year (e.g. "2020")
   */
  readonly copyrightPeriod?: string;
}

export class License extends FileBase {
  private readonly text: string;

  constructor(project: Project, options: LicenseOptions) {
    super(project, "LICENSE", {
      marker: false,
      // Allow the license to be displayed in the repositories.
      committed: true,
    });

    const spdx = options.spdx;

    const textFile = `${__dirname}/../license-text/${spdx}.txt`;
    if (!fs.existsSync(textFile)) {
      throw new Error(`unsupported license ${spdx}`);
    }

    const years =
      options.copyrightPeriod ?? new Date().getFullYear().toString();
    const owner = options.copyrightOwner;

    let text = fs.readFileSync(textFile, "utf-8");

    text = text.replace("$copyright_period", years);

    // if the license text includes $copyright_owner, then `copyrightOwner` is required.
    if (text.indexOf("$copyright_owner") !== -1) {
      if (!owner) {
        throw new Error(
          `The ${spdx} license requires "copyrightOwner" to be specified`
        );
      }

      text = text.replace("$copyright_owner", owner);
    }

    this.text = text;
  }

  protected synthesizeContent(_: IResolver): string | undefined {
    return this.text;
  }
}
