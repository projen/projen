import { synthSnapshot, TestProject } from './util';

const VSCODE_DEBUGGER_FILE = '.vscode/launch.json';

test('default', () => {
  // GIVEN
  const project = new TestProject();

  // WHEN
  project.vscode?.addLaunchConfiguration();

  // THEN
  expect(synthSnapshot(project, VSCODE_DEBUGGER_FILE)).toStrictEqual({
    '.vscode/launch.json': {
      version: '0.2.0',
      configurations: [
        {
          type: 'node',
          request: 'launch',
          name: 'CDK Debugger',
          skipFiles: ['<node_internals>/**'],
          runtimeArgs: ['-r', './node_modules/ts-node/register/transpile-only'],
          args: ['${workspaceFolder}/src/main.ts'],
        },
      ],
    },
  });
});

test('with entry name', () => {
  // GIVEN
  const project = new TestProject();

  // WHEN
  project.vscode?.addLaunchConfiguration('index.ts');

  // THEN
  expect(synthSnapshot(project, VSCODE_DEBUGGER_FILE)).toStrictEqual({
    '.vscode/launch.json': {
      version: '0.2.0',
      configurations: [
        {
          type: 'node',
          request: 'launch',
          name: 'CDK Debugger',
          skipFiles: ['<node_internals>/**'],
          runtimeArgs: ['-r', './node_modules/ts-node/register/transpile-only'],
          args: ['${workspaceFolder}/src/index.ts'],
        },
      ],
    },
  });
});
