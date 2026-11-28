import { Component } from "../component";
import { DependencyType } from "../dependencies";
import { JsonFile } from "../json";
import type { TypeScriptProject } from "../typescript";

/**
 * This component adds support for using `integ-runner` and `integ-tests`
 * in a construct library.
 */
export class IntegRunner extends Component {
  constructor(project: TypeScriptProject, parallelRegions?: string[]) {
    super(project);

    if (parallelRegions) {
      new JsonFile(project, "integ.config.json", {
        obj: { parallelRegions },
        // integ-runner rejects unknown config keys, including the marker.
        marker: false,
      });
      project.addPackageIgnore("/integ.config.json");
    }

    project.deps.addDependency(
      "@aws-cdk/integ-runner@latest",
      DependencyType.DEVENV,
    );
    project.deps.addDependency(
      "@aws-cdk/integ-tests-alpha@latest",
      DependencyType.DEVENV,
    );

    // Integration test files (named `integ.*.ts` according to the
    // https://github.com/aws/aws-cdk/blob/main/INTEGRATION_TESTS.md naming
    // convention) are discovered and executed by the `integ` task and should
    // not be picked up by jest runs.
    project.jest?.addIgnorePattern("/integ\\.[^/]*\\.ts$");

    const integSnapshotTask = project.addTask("integ", {
      description: "Run integration snapshot tests",
      receiveArgs: true,
      execArgs: ["integ-runner", "$@", "--language", "typescript"],
    });

    project.addTask("integ:update", {
      description: "Run and update integration snapshot tests",
      execArgs: [
        "integ-runner",
        "$@",
        "--language",
        "typescript",
        "--update-on-failed",
      ],
      receiveArgs: true,
    });

    project.testTask.spawn(integSnapshotTask);
  }
}
