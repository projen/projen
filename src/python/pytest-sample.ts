import { Construct } from "constructs";
import { Component } from "../component";
import { SampleDir } from "../sample-file";
import { PythonProject } from "./python-project";

export class PytestSample extends Component {
  constructor(scope: Construct, testdir: string) {
    super(scope, "PytestSample");

    const project = PythonProject.ofPythonProject(this);

    new SampleDir(project, testdir, {
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
