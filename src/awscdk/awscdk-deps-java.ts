import { Project } from '../project';
import { AwsCdkDeps, AwsCdkDepsOptions } from './awscdk-deps';

/**
 * Manages dependencies on the AWS CDK for Node.js projects.
 */
export class AwsCdkDepsJava extends AwsCdkDeps {
  static readonly PACKAGE_GROUP = 'software.amazon.awscdk';

  constructor(project: Project, options: AwsCdkDepsOptions) {
    // Ensure cdkDependencies are passed as fully qualified form to the super class
    const depsFixup = options.cdkDependencies?.map((dep) => dep.includes('/') ? dep : `${AwsCdkDepsJava.PACKAGE_GROUP}/${dep}`);

    super(project, { ...options, cdkDependencies: depsFixup }
      , {
        frameworkV1Package: `${AwsCdkDepsJava.PACKAGE_GROUP}/core`,
        frameworkV2Package: `${AwsCdkDepsJava.PACKAGE_GROUP}/aws-cdk-lib`,
        constructsPackage: 'software.constructs/constructs',
        assertionsPackage: `${AwsCdkDepsJava.PACKAGE_GROUP}/assertions`,
      });
  }
}