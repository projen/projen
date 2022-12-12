import { Component, SampleDir } from "..";
import { Project } from "../project";

/**
 * Options for python test code sample.
 */
export interface PytestSampleOptions {
  /**
   * Name of the python package as used in imports and filenames.
   */
  readonly moduleName: string;

  /**
   * Test directory
   */
  readonly testdir: string;
}

/**
 * Python test code sample.
 */
export class PytestSample extends Component {
  constructor(project: Project, options: PytestSampleOptions) {
    super(project);

    new SampleDir(project, options.testdir, {
      files: {
        "__init__.py": "",
        "test_example.py": [
          "import pytest",
          "",
          `from ${options.moduleName}.example import hello`,
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
