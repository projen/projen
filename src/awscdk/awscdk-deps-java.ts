import { Project } from '../project';
import { AwsCdkDeps, AwsCdkDepsOptions, AwsCdkDepsPackageConf } from './awscdk-deps';

/**
 * Manages dependencies on the AWS CDK for Java projects.
 */
export class AwsCdkDepsJava extends AwsCdkDeps {
  constructor(project: Project, options: AwsCdkDepsOptions) {
    super(project, options);
  }

  protected packageConfigForLanguage(): AwsCdkDepsPackageConf {
    return {
      frameworkV1Package: 'software.amazon.awscdk/core',
      frameworkV2Package: 'software.amazon.awscdk/aws-cdk-lib',
      constructsPackage: 'software.constructs/constructs',
      assertionsPackage: 'software.amazon.awscdk/assertions',
    };
  }
}