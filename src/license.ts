import * as fs from 'fs-extra';
import { FileBase, IResolver } from './file';
import { Project } from './project';


interface ISpdxLicenseList {
  /**
   * list version number of License list generator
   *
   * @see https://github.com/spdx/license-list-data
   */
  licenseListVersion: string;
  /**
  * list of SPDX license defintions
  *
  * @see https://github.com/spdx/license-list-data
  */
  licenses: ISpdxLicense[];
}


interface ISpdxLicense {
  /**
   * External reference field
   *
   * @see https://github.com/spdx/license-list-XML/blob/master/DOCS/license-fields.md
   */
  reference: string;
  /**
   * License deprecation status
   */
  isDeprecatedLicenseId: boolean;
  /**
   * Link to SPDX.org details web page of license
   *
   * @see https://github.com/spdx/license-list-XML/blob/master/DOCS/license-fields.md
   */
  detailsUrl: string;
  /**
   * SPDX.org license reference number
   *
   * @see https://github.com/spdx/license-list-XML/blob/master/DOCS/license-fields.md
   */
  referenceNumber: number;
  /**
   * Full Name of license
   *
   * @see https://github.com/spdx/license-list-XML/blob/master/DOCS/license-fields.md
   */
  name: string;
  /**
   * Short Identifier of liences
   *
   * @see https://github.com/spdx/license-list-XML/blob/master/DOCS/license-fields.md
   */
  licenseId: string;
  /**
   * List of external URL references for more information about license
   *
   * @see https://github.com/spdx/license-list-XML/blob/master/DOCS/license-fields.md
   */
  seeAlso: string[];
  /**
   * OSI Approval status of license
   *
   * @see https://github.com/spdx/license-list-XML/blob/master/DOCS/license-fields.md
   */
  isOsiApproved: boolean;
  /**
   *  FSF Free/Libre status of license
   *
   * @see https://github.com/spdx/license-list-XML/blob/master/DOCS/license-fields.md
   */
  isFsfLibre?: boolean;
}


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
  private readonly text?: string;

  constructor(project: Project, options: LicenseOptions) {
    super(project, 'LICENSE');

    const spdx = options.spdx;

    const licensesFile = `${__dirname}/../license-text/licenses.json`;

    const spdxl:ISpdxLicenseList = JSON.parse(fs.readFileSync(licensesFile, 'utf-8'));

    var matchedLicenseName:string|undefined = undefined;

    for ( var i = 0; i < spdxl.licenses.length; i += 1 ) {

      let spdxLicenseObj:ISpdxLicense = spdxl.licenses[ i ];

      if (spdx == spdxLicenseObj.licenseId) {

        matchedLicenseName = spdxLicenseObj.name;

        break;
      }
    }

    if (!matchedLicenseName) {
      throw new Error(`invalid SPDX license ${spdx} identifier`);
    }

    const textFile = `${__dirname}/../license-text/${spdx}.txt`;
    if (!fs.existsSync(textFile)) {
      return;
    }

    const years = options.copyrightPeriod ?? new Date().getFullYear().toString();
    const owner = options.copyrightOwner;

    let text = fs.readFileSync(textFile, 'utf-8');

    text = text.replace('$copyright_period', years);

    // if the license text includes $copyright_owner, then `copyrightOwner` is required.
    if (text.indexOf('$copyright_owner') !== -1) {
      if (!owner) {
        throw new Error(`The ${spdx} license requires "copyrightOwner" to be specified`);
      }

      text = text.replace('$copyright_owner', owner);
    }

    this.text = text;
  }

  protected synthesizeContent(_: IResolver): string | undefined {
    return this.text;
  }
}