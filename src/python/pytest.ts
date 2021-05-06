import { Component } from "../component";
import { SampleDir } from "../sample-file";
import { Task, TaskCategory } from "../tasks";
import { PythonProject } from "./python-project";

export interface PytestOptions {
  /**
   * Pytest version
   *
   * @default "6.2.1"
   */
  readonly version?: string;

  /**
   * Directory with tests
   *
   * @default 'tests'
   */
  readonly testdir?: string;

  /**
   * Stop the testing process after the first N failures
   */
  readonly maxFailures?: number;
}

export class Pytest extends Component {
  public readonly testTask: Task;

  constructor(project: PythonProject, options: PytestOptions = {}) {
    super(project);

    const version = options.version ?? "6.2.1";

    project.addDevDependency(`pytest@${version}`);

    this.testTask = project.addTask("test", {
      description: "Runs tests",
      category: TaskCategory.TEST,
      exec: [
        "pytest",
        ...(options.maxFailures ? [`--maxfail=${options.maxFailures}`] : []),
      ].join(" "),
    });

    new SampleDir(project, "tests", {
      files: {
        "__init__.py": "",
        "test_example.py": [
          "import pytest",
          "",
          `from ${project.moduleName}.example import hello`,
          "",
          "@pytest.mark.parametrize(",
          '    ("name", "expected"),',
          "    [",
          '        ("A. Musing", "Hello A. Musing!"),',
          '        ("traveler", "Hello traveler!"),',
          '        ("projen developer", "Hello projen developer!"),',
          "    ],",
          ")",
          "def test_hello(name, expected):",
          '    """Example test with parametrization."""',
          "    assert hello(name) == expected",
          "",
        ].join("\n"),
      },
    });
  }
}
