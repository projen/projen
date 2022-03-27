import { Component } from "../component";
import { Project } from "../project";
import { SampleDir } from "../sample-file";

/**
 * Options for python sample code.
 */
export interface PythonSampleOptions {}

/**
 * Python code sample.
 */
export class PythonSample extends Component {
  constructor(
    project: Project,
    moduleName: string,
    _options: PythonSampleOptions
  ) {
    super(project);

    new SampleDir(project, moduleName, {
      files: {
        "__init__.py": '__version__ = "0.1.0"\n',
        "__main__.py": [
          "from .example import hello",
          "",
          'if __name__ == "__main__":',
          '    name = input("What is your name? ")',
          "    print(hello(name))",
          "",
        ].join("\n"),
        "example.py": [
          "def hello(name: str) -> str:",
          '    """A simple greeting.',
          "    Args:",
          "        name (str): Name to greet.",
          "    Returns:",
          "        str: greeting message",
          '    """',
          '    return f"Hello {name}!"',
          "",
        ].join("\n"),
      },
    });
  }
}
