import type { Task } from "../src";
import { Component } from "../src";
import { setupIntegHarness } from "./integ-harness";
import type { JavaVersion, LanguageVersions } from "./integ-versions";
import { INTEG_TEST_VERSIONS } from "./integ-versions";
import { GithubWorkflow, WorkflowSteps } from "../src/github";
import type { JobStep } from "../src/github/workflows-model";
import { JobPermission } from "../src/github/workflows-model";
import type { NodeProject } from "../src/javascript";
import type { TypeScriptProject } from "../src/typescript";

/**
 * Options for IntegrationTests component
 */
export interface IntegrationTestsOptions {
  /**
   * Language versions to test against.
   * @default INTEG_TEST_VERSIONS
   */
  readonly versions?: LanguageVersions;

  /**
   * Whether to add CI workflow jobs for integration tests.
   * @default true
   */
  readonly workflow?: boolean;
}

/**
 * A suite of the harness that runs against the Node npm tarball only.
 */
interface NodeSuite {
  /** Task id suffix and jest file stem. */
  readonly name: string;
  /** The `tests/<file>` to run. */
  readonly file: string;
  readonly description: string;
}

/** Suites that only need the npm tarball (dist/js). */
const NODE_SUITES: NodeSuite[] = [
  {
    name: "node",
    file: "tests/node-typescript.integ.test.ts",
    description: "Node/TypeScript create+build and #4746 downstream npm ci",
  },
  {
    name: "eject",
    file: "tests/eject.integ.test.ts",
    description: "projen eject self-containment (#3679/#4407)",
  },
  {
    name: "snapshot",
    file: "tests/projenrc-snapshot.integ.test.ts",
    description: "projenrc snapshot suite",
  },
];

const INTEG_DIR = "integ";

/**
 * Sets up integration tests for projen across multiple languages and package
 * managers, backed by the cross-platform Jest harness in `test/integ`.
 *
 * Creates:
 * - the `test/integ` child project (via setupIntegHarness),
 * - local tasks `integ:<suite>` and an aggregate `integ` task, and
 * - an `integ` GitHub workflow that runs every suite on Ubuntu AND Windows,
 *   across the Node version matrix, with a representative set of Python/Java/Go
 *   versions.
 */
export class IntegrationTests extends Component {
  public readonly integTask: Task;
  public readonly tasks: Record<string, Task> = {};
  public readonly workflow?: GithubWorkflow;

  private readonly versions: LanguageVersions;
  private readonly suiteFiles: Record<string, string>;

  constructor(project: NodeProject, options: IntegrationTestsOptions = {}) {
    super(project);

    this.versions = options.versions ?? INTEG_TEST_VERSIONS;
    setupIntegHarness(project as TypeScriptProject);

    // Installs the harness child project's dependencies.
    const installTask = project.addTask("integ:install", {
      description: "Install the integration test harness dependencies",
      cwd: INTEG_DIR,
      exec: "npm ci",
    });

    // A task per suite: run the corresponding Jest file in the child project.
    const suiteNames = [
      ...NODE_SUITES.map((s) => s.name),
      "python",
      "java",
      "go",
    ];
    const suiteFiles: Record<string, string> = {
      python: "tests/python.integ.test.ts",
      java: "tests/java.integ.test.ts",
      go: "tests/go.integ.test.ts",
    };
    for (const s of NODE_SUITES) {
      suiteFiles[s.name] = s.file;
    }
    this.suiteFiles = suiteFiles;

    for (const name of suiteNames) {
      this.tasks[name] = project.addTask(`integ:${name}`, {
        description: `Run the ${name} integration suite`,
        cwd: INTEG_DIR,
        exec: `npx jest ${suiteFiles[name]} --ci`,
      });
    }

    // Aggregate task: build + package everything, install the harness, run all.
    this.integTask = project.addTask("integ", {
      description: "Run all integration tests",
    });
    this.integTask.spawn(project.compileTask);
    const bundleTaskRunner = project.tasks.tryFind("bundle:task-runner");
    if (bundleTaskRunner) {
      this.integTask.spawn(bundleTaskRunner);
    }
    const packageAll = project.tasks.tryFind("package-all");
    if (packageAll) {
      this.integTask.spawn(packageAll);
    }
    this.integTask.spawn(installTask);
    for (const name of suiteNames) {
      this.integTask.spawn(this.tasks[name]);
    }

    if (options.workflow !== false && project.github) {
      this.workflow = this.buildWorkflow(project);
    }
  }

  private buildWorkflow(project: NodeProject): GithubWorkflow {
    const workflow = new GithubWorkflow(project.github!, "integ");
    workflow.on({ pullRequest: {}, workflowDispatch: {}, mergeGroup: {} });

    const distArtifact = "integ-build-artifact";
    const nodeSuiteNames = NODE_SUITES.map((s) => s.name);
    const langSuiteNames = ["python", "java", "go"];
    const allSuites = [...nodeSuiteNames, ...langSuiteNames];
    const defaultNode = this.versions.node.at(-1) ?? "lts/*";

    // Prepare: compile and package all release artifacts ONCE, upload dist/.
    workflow.addJob("prepare", {
      runsOn: ["ubuntu-latest"],
      permissions: { contents: JobPermission.READ },
      env: { CI: "0" },
      steps: [
        ...this.commonSteps(),
        ...this.langSetupSteps("python"),
        ...this.langSetupSteps("java"),
        ...this.langSetupSteps("go"),
        this.setupNode(defaultNode),
        this.installParent(project),
        this.compile(project),
        this.runTask(project, "Bundle task runner", "bundle:task-runner"),
        this.runTask(project, "Package all languages", "package-all"),
        WorkflowSteps.uploadArtifact({
          name: "Upload build artifacts",
          with: { name: distArtifact, path: "dist" },
        }),
      ],
    });

    // Test: a single sharded job. Matrix over suite x OS x Node version;
    // language suites run on the default Node version only. Shards download
    // the prepared artifacts and run Jest directly in the harness - they
    // never build the parent project.
    workflow.addJob("integ-test", {
      name: "${{ matrix.suite }} / ${{ matrix.os }} / node ${{ matrix.node-version }}",
      runsOn: ["${{ matrix.os }}"],
      permissions: { contents: JobPermission.READ },
      needs: ["prepare"],
      env: { CI: "0" },
      strategy: {
        failFast: false,
        matrix: {
          domain: {
            os: ["ubuntu-latest", "windows-latest"],
            suite: allSuites,
            "node-version": this.versions.node,
          },
          // Attach the jest file to each suite.
          include: allSuites.map((suite) => ({
            suite,
            file: this.suiteFiles[suite],
          })),
          // Language suites only run on the default Node version.
          exclude: langSuiteNames.flatMap((suite) =>
            this.versions.node
              .filter((v) => v !== defaultNode)
              .map((nodeVersion) => ({
                suite,
                "node-version": nodeVersion,
              })),
          ),
        },
      },
      steps: [
        ...this.commonSteps(),
        ...this.langSetupSteps("python").map((s) => ({
          ...s,
          if: "matrix.suite == 'python'",
        })),
        ...this.langSetupSteps("java").map((s) => ({
          ...s,
          if: "matrix.suite == 'java'",
        })),
        ...this.langSetupSteps("go").map((s) => ({
          ...s,
          if: "matrix.suite == 'go'",
        })),
        this.setupNode("${{ matrix.node-version }}"),
        WorkflowSteps.downloadArtifact({
          name: "Download build artifacts",
          with: { name: distArtifact, path: "dist" },
        }),
        {
          name: "Install harness",
          run: "npm ci",
          workingDirectory: INTEG_DIR,
        },
        {
          name: "Run suite",
          run: "npx jest ${{ matrix.file }} --ci",
          workingDirectory: INTEG_DIR,
        },
      ],
    });

    // Aggregation job for a single required status check.
    workflow.addJob("integ", {
      runsOn: ["ubuntu-latest"],
      permissions: {},
      needs: ["integ-test"],
      if: "always()",
      steps: [
        {
          name: "integ-test result",
          run: "echo ${{ needs.integ-test.result }}",
        },
        {
          if: "${{ needs.integ-test.result != 'success' }}",
          name: "Set status based on integ tests",
          run: "exit 1",
        },
      ],
    });

    return workflow;
  }

  /** Representative language toolchain setup (single version per language). */
  private langSetupSteps(lang: "python" | "java" | "go"): JobStep[] {
    switch (lang) {
      case "python":
        return [
          {
            uses: "actions/setup-python@v6",
            with: { "python-version": this.versions.python.at(-1) ?? "3.x" },
          },
        ];
      case "go":
        return [
          {
            uses: "actions/setup-go@v6",
            with: { "go-version": this.versions.go.at(-1) ?? "1.x" },
          },
        ];
      case "java": {
        const j: JavaVersion = this.versions.java.at(-1) ?? {
          version: "17",
          distribution: "corretto",
        };
        return [
          {
            uses: "actions/setup-java@v5",
            with: { "java-version": j.version, distribution: j.distribution },
          },
        ];
      }
    }
  }

  private commonSteps(): JobStep[] {
    return [WorkflowSteps.checkout()];
  }

  private installParent(project: NodeProject): JobStep {
    return {
      name: "Install dependencies",
      run: project.package.installCommand,
    };
  }

  private compile(project: NodeProject): JobStep {
    return {
      name: "Compile",
      run: project.runTaskCommand(project.compileTask),
    };
  }

  private runTask(
    project: NodeProject,
    name: string,
    taskName: string,
  ): JobStep {
    return {
      name,
      run: project.runTaskCommand(project.tasks.tryFind(taskName)!),
    };
  }

  private setupNode(version: string): JobStep {
    return {
      uses: "actions/setup-node@v6",
      with: { "node-version": version, "package-manager-cache": false },
    };
  }
}
