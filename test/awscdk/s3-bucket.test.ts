import * as s3 from '@aws-cdk/aws-s3';
import { Construct } from '@aws-cdk/core';
import { Project, AwsEnvironment } from '../../src';
import { synthSnapshot } from '../util';

test('bar', () => {
  class SecureBucket extends s3.Bucket {
    constructor(scope: Construct, id: string) {
      super(scope, id, {
        encryption: s3.BucketEncryption.KMS,
      });
    }
  }

  const project = new Project('test');

  const aws = new AwsEnvironment(project, {
    env: 'aws://11223344555/us-east-1',
  });

  new SecureBucket(aws.stack, 'SecureBucket');
  new s3.Bucket(aws.stack, 'Bucket');

  expect(synthSnapshot(project)).toMatchSnapshot();
});