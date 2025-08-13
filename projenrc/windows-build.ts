import { IConstruct } from "constructs";
import { Component, JsonPatch } from "../src";
import { GitHub } from "../src/github";

/**
 * Setup the github workflow for windows
 *
 * @param project The project to add the configuration to
 */
export class WindowsBuild extends Component {
  public constructor(scope: IConstruct) {
    super(scope, "WindowsBuild");

    const github = GitHub.of(this.project)!;
    const buildWorkflowFile = github.tryFindWorkflow("build")?.file;

    const JOB_BUILD = "build";
    const JOB_BUILD_MATRIX = "build_matrix";
    const buildJobPath = (path?: string) => {
      return `/jobs/${JOB_BUILD}${path ?? ""}`;
    };

    const onlyPrimaryBuildSteps: number[] = [
      // Upload coverage to Codecov
      4,
      // Backup artifact permissions
      8,
      // Upload artifact
      9,
    ];

    const onlyMutationAndPrimaryBuildSteps: number[] = [
      // Upload self mutation patch
      6,
    ];

    const onlyPrimaryStepsPatches = onlyPrimaryBuildSteps.map((stepIndex) =>
      JsonPatch.add(
        buildJobPath(`/steps/${stepIndex}/if`),
        "matrix.runner.primary_build"
      )
    );
    const onlyMutationAndPrimaryStepPatches =
      onlyMutationAndPrimaryBuildSteps.map((stepIndex) =>
        JsonPatch.add(
          buildJobPath(`/steps/${stepIndex}/if`),
          "steps.self_mutation.outputs.self_mutation_happened && matrix.runner.primary_build"
        )
      );

    // Setup runner matrix
    buildWorkflowFile?.patch(
      JsonPatch.add(buildJobPath("/strategy"), {
        matrix: {
          runner: [
            {
              os: "ubuntu-latest",
              primary_build: true,
              allow_failure: false,
            },
            {
              os: "windows-latest",
              primary_build: false,
              allow_failure: false,
            },
          ],
        },
      }),

      // Run job on os from matrix
      JsonPatch.add(buildJobPath("/runs-on"), "${{ matrix.runner.os }}"),

      // Allow builds to fail based on matrix
      JsonPatch.add(
        buildJobPath("/continue-on-error"),
        "${{ matrix.runner.allow_failure }}"
      ),

      // Add conditions to steps that should only run on the primary build
      ...onlyMutationAndPrimaryStepPatches,
      ...onlyPrimaryStepsPatches
    );

    // speed up windows build
    buildWorkflowFile?.patch(
      JsonPatch.add(buildJobPath("/steps/2"), {
        if: "runner.os == 'Windows'",
        name: "Windows performance improvements",
        run: [
          "yarn config set cache-folder D:\\a\\_temp\\yarn", // move the yarn cache to D:
          `echo "TEMP=D:\\a\\_temp" >> $env:GITHUB_ENV`, // move the tmp dir used for projen test projects to D:
        ].join("\n"),
      })
    );

    // Add the join target job for branch protection
    buildWorkflowFile?.patch(
      // Rename old workflow
      JsonPatch.move(buildJobPath(), `/jobs/${JOB_BUILD_MATRIX}`),

      // Insert new meta job
      JsonPatch.add(buildJobPath(), {
        "runs-on": "ubuntu-latest",
        needs: [JOB_BUILD_MATRIX],
        if: "always()",
        outputs: {
          self_mutation_happened: `\${{ needs.${JOB_BUILD_MATRIX}.outputs.self_mutation_happened }}`,
        },
        steps: [
          {
            name: "Build result",
            run: `echo \${{ needs.${JOB_BUILD_MATRIX}.result }}`,
          },
          {
            if: `\${{ needs.${JOB_BUILD_MATRIX}.result != 'success' }}`,
            name: "Set status based on matrix build",
            run: "exit 1",
          },
        ],
      })
    );
  }
}
