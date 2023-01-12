import { AwsCdkPythonApp } from "./awscdk-app-py";
import { Component, SampleDir } from "..";

export class AwsCdkPytestSample extends Component {
  constructor(project: AwsCdkPythonApp, testdir: string) {
    super(project);

    new SampleDir(project, testdir, {
      files: {
        "__init__.py": "",
        "test_example.py": [
          "import pytest",
          "from aws_cdk import App",
          "from aws_cdk.assertions import Template",
          "",
          `from ${project.moduleName}.main import MyStack`,
          "",
          "@pytest.fixture(scope='module')",
          "def template():",
          "  app = App()",
          '  stack = MyStack(app, "my-stack-test")',
          "  template = Template.from_stack(stack)",
          "  yield template",
          "",
          `def test_no_buckets_found(template):`,
          '  template.resource_count_is("AWS::S3::Bucket", 0)',
          "",
        ].join("\n"),
      },
    });
  }
}
