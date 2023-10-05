import { Component } from "../component";
import { DependencyType } from "../dependencies";
import { TypeScriptProject } from "../typescript";

/**
 * This component adds support for using `integ-runner` and `integ-tests`
 * in a construct library.
 */
export class IntegRunner extends Component {
  constructor(project: TypeScriptProject) {
    super(project);

    project.deps.addDependency(
      "@aws-cdk/integ-runner@latest",
      DependencyType.DEVENV
    );
    project.deps.addDependency(
      "@aws-cdk/integ-tests-alpha@latest",
      DependencyType.DEVENV
    );

    const integSnapshotTask = project.addTask("integ", {
      description: "Run integration snapshot tests",
      receiveArgs: true,
      // Note: We're using -- to stop parsing of options because integ-runner
      // interprets subsequent arguments as additional languages instead of
      // test names. Unfortunately, this results in a warning from yarn, but
      // it does not affect the execution of the command.
      exec: "yarn integ-runner --language typescript --",
    });

    project.addTask("integ:update", {
      description: "Run and update integration snapshot tests",
      exec: "yarn integ-runner --language typescript --update-on-failed",
      receiveArgs: true,
    });

    project.testTask.spawn(integSnapshotTask);
  }
}
