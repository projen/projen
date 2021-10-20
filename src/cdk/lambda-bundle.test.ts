import { join } from 'path';
import { TypeScriptProject } from '..';
import { BundledLambdaFunction } from './lambda-bundle';

test('try', () => {
  const project = new TypeScriptProject({
    name: 'hello',
    defaultReleaseBranch: 'main',
  });

  new BundledLambdaFunction(project, {
    entrypoint: join('src', 'hello.lambda.ts'),
  });
});