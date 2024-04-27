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
        `/jobs/build/steps/${stepIndex}/if`,
        "${{ !matrix.runner.experimental }}"
      )
    );

    const buildWorkflow = GitHub.of(this.project)?.tryFindWorkflow(
      "build"
    )?.file;

    // Set windows-latest runner to experimental
    buildWorkflow?.patch(
      JsonPatch.add("/jobs/build/strategy", {
        matrix: {
          runner: [
            { os: "ubuntu-latest", experimental: false },
            { os: "windows-latest", experimental: true },
          ],
        },
      }),
      JsonPatch.add("/jobs/build/runs-on", "${{ matrix.runner.os }}"),

      // Allow step to fail on windows
      JsonPatch.add(
        "/jobs/build/steps/3/continue-on-error",
        "${{ matrix.runner.experimental }}"
      ),

      JsonPatch.add(
        `/jobs/build/steps/6/if`,
        "${{ steps.self_mutation.outputs.self_mutation_happened && !matrix.runner.experimental }}"
      ),

      // Skip steps that shouldn't run on Windows
      ...skippedStepPatches
    );
  }
}
