import { TaskGithubWorkflow } from '../../github/task-workflow';
import { Task } from '../../tasks';
import { synthSnapshot, TestProject } from '../util';

describe('task-workflow', () => {
  test('default', () => {
    const project = new TestProject();

    new TaskGithubWorkflow(project.github!, {
      name: 'task-workflow',
      task,
      permissions: {},
    });

    const snapshot = synthSnapshot(project);

    expect(snapshot['.github/workflows/task-workflow.yml']).toBeDefined();
    expect(snapshot['.github/workflows/task-workflow.yml']).toMatchSnapshot();
  });

  test('upload artifacts', () => {
    const project = new TestProject();

    new TaskGithubWorkflow(project.github!, {
      name: 'task-workflow',
      task,
      artifactsDirectory: './artifacts/',
      permissions: {},
    });

    const snapshot = synthSnapshot(project);

    expect(snapshot['.github/workflows/task-workflow.yml']).toMatchSnapshot();
  });

  test('issue comment error', () => {
    const project = new TestProject();

    expect(() => new TaskGithubWorkflow(project.github!, {
      name: 'task-workflow',
      task,
      trigger: {
        issueComment: {},
      },
      permissions: {},
    })).toThrow(/Trigger \"issueComment\" should not be used due to a security concern/);
  });
});

const task = new Task('gh-workflow-test', {
  description: 'Task GitHub workflow test',
});
