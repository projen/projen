import { NodeLambdaConstructSourceCode } from '../node-lambda-construct-source-code';
import { synthSnapshot, TestProject } from './util';


test('node lambda construct source code is created', () => {
  // GIVEN
  const project = new TestProject();

  // WHEN
  new NodeLambdaConstructSourceCode(project, 'construct.ts', 'handlerdir');

  // THEN
  const snapshot = synthSnapshot(project);
  expect(snapshot['construct.ts']).toMatchSnapshot();
  expect(snapshot['construct.ts'].length).toBeGreaterThan(0);
});
