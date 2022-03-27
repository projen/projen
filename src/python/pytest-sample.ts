import { PythonProject } from ".";
import { Component, SampleDir } from "..";

export class PytestSample extends Component {
  constructor(project: PythonProject, moduleName: string, testdir: string) {
    super(project);

    new SampleDir(project, testdir, {
      files: {
        "__init__.py": "",
        "test_example.py": [
          "import pytest",
          "",
          `from ${moduleName}.example import hello`,
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
