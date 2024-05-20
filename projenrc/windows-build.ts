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

    const skippedStepIndexes = [
      // Upload coverage to Codecov
      4,

      // Backup artifact permissions
      8,

      // Upload artifact
      9,
    ];

    const skippedStepPatches = skippedStepIndexes.map((stepIndex) =>
      JsonPatch.add(
        buildJobPath(`/steps/${stepIndex}/if`),
        "${{ !matrix.runner.experimental }}"
      )
    );

    // Set windows-latest runner to experimental
    buildWorkflowFile?.patch(
      JsonPatch.add(buildJobPath("/strategy"), {
        matrix: {
          runner: [
            { os: "ubuntu-latest", experimental: false, shell: "bash" },
            { os: "windows-latest", experimental: true, shell: "cmd" },
          ],
        },
      }),
      JsonPatch.add(buildJobPath("/runs-on"), "${{ matrix.runner.os }}"),

      // Allow step to fail on windows
      JsonPatch.add(
        buildJobPath("/continue-on-error"),
        "${{ matrix.runner.experimental }}"
      ),

      JsonPatch.add(
        buildJobPath("/steps/6/if"),
        "${{ steps.self_mutation.outputs.self_mutation_happened && !matrix.runner.experimental }}"
      ),

      JsonPatch.add(
        buildJobPath("/steps/3/shell"),
        "${{ matrix.runner.shell }}"
      ),

      // Skip steps that shouldn't run on Windows
      ...skippedStepPatches,

      // Rename workflow
      JsonPatch.move(buildJobPath(), `/jobs/${JOB_BUILD_MATRIX}`),

      // Add the join target job for branch protection
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
            run: `echo \${{needs.${JOB_BUILD_MATRIX}.result}}`,
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
