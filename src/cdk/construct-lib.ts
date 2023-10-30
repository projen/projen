import { JsiiProject, JsiiProjectOptions } from "./jsii-project";

export interface ConstructLibraryOptions extends JsiiProjectOptions {
  /**
   * Libraries will be picked up by the construct catalog when they are
   * published to npm as jsii modules and will be published under:
   *
   *     https://awscdk.io/packages/[@SCOPE/]PACKAGE@VERSION
   *
   * The catalog will post to https://x.com/awscdkio with the
   * package name, description and the above link. You can disable these tweets
   * through `{ announce: false }`.
   *
   * You can also add a Twitter handle through `{ twitter: 'xx' }` which will be
   * mentioned in the tweet.
   *
   * @see https://github.com/construct-catalog/catalog
   *
   * @default - new version will be announced
   */
  readonly catalog?: Catalog;
}

export interface Catalog {
  /**
   * X (previously Twitter) account to @mention in announcement tweet.
   */
  readonly twitter?: string;

  /**
   * Should we announce new versions?
   * @default true
   */
  readonly announce?: boolean;
}

/**
 * A multi-language library for CDK constructs.
 */
export abstract class ConstructLibrary extends JsiiProject {
  constructor(options: ConstructLibraryOptions) {
    super(options);

    this.addKeywords("cdk"); // publish to the catalog
    if (options.catalog) {
      this.package.addField("awscdkio", {
        twitter: options.catalog.twitter,
        announce: options.catalog.announce,
      });
    }
  }
}
