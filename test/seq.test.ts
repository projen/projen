import { TestProject, synthSnapshot } from './util';

test('empty sequence', () => {
  const p = new TestProject();
  p.addSequence('empty');

  expect(synthSnapshot(p)).toMatchSnapshot();
});