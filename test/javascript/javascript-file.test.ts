import { JavascriptFile } from '../../lib/javascript';
import { synthSnapshot, TestProject } from '../util';

test('can add javascript file component', () => {
  const prj = new TestProject();

  const file = new JavascriptFile(prj, 'cool.config.js', {
    fn: () => {
      console.log('Hello World');
    },
  });

  const out = synthSnapshot(prj);
  const outFile = out['cool.config.js'];
  console.log(outFile);

  expect(outFile).toBe(`// ${file.marker}\nconsole.log('Hello World');\n`);
  expect(outFile).toMatchSnapshot();
});

test('can add javascript file component with various options', () => {
  const prj = new TestProject();

  const file = new JavascriptFile(prj, 'cool.config.js', {
    fn: (name) => {
      return `Hello ${name}`;
    },
    keepDeclaration: true,
    callWith: [prj.name],
    setToValue: 'greeting',
  });

  file.appendFunction({
    fn: (greeting) => {
      console.log(greeting);
    },
    prefix: '// do a log\n',
    postfix: '\n// did a log',
  });

  const out = synthSnapshot(prj);
  const outFile = out['cool.config.js'];

  console.log(outFile);

  expect(outFile).toContain('const greeting = (name =>');
  expect(outFile).toContain('(`test-project`)');
  expect(outFile).toContain('// do a log');
  expect(outFile).toContain('// did a log');
  expect(outFile).toMatchSnapshot();
});
