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
      DependencyType.DEVENV,
    );
    project.deps.addDependency(
      "@aws-cdk/integ-tests-alpha@latest",
      DependencyType.DEVENV,
    );

    const integSnapshotTask = project.addTask("integ", {
      description: "Run integration snapshot tests",
      receiveArgs: true,
      exec: "integ-runner $@ --language typescript",
    });

    project.addTask("integ:update", {
      description: "Run and update integration snapshot tests",
      exec: "integ-runner $@ --language typescript --update-on-failed",
      receiveArgs: true,
    });

    project.testTask.spawn(integSnapshotTask);
  }
}
