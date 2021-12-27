import { TestProject } from '../util';
import { CdkConfig } from '../../src/awscdk/cdk-config';


describe('context values', () => {
  test('issue #1349', () => {

    new CdkConfig( new TestProject(), {
      app: 'foo',
      context: {
        '@aws-cdk/aws-ecr-assets:dockerIgnoreSupport': true
      }
    });

    new CdkConfig( new TestProject(), {
      app: 'foo',
      context: {
        '@aws-cdk/aws-ecr-assets:dockerIgnoreSupport': 'true'
      }
    });
  }); 
});