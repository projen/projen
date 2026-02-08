import { Component, Task } from "../src";
import {
  INTEG_TEST_VERSIONS,
  JavaVersion,
  LanguageVersions,
} from "./integ-versions";
import { GithubWorkflow, WorkflowSteps } from "../src/github";
import { Job, JobPermission, JobStep } from "../src/github/workflows-model";
import { NodeProject } from "../src/javascript";

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
 * Integration test configuration for a language
 */
interface LanguageTestConfig {
  /**
   * The task name suffix (e.g., 'javascript', 'python')
   */
  readonly name: string;

  /**
   * The script path to execute
   */
  readonly script: string;

  /**
   * Description of the integration test
   */
  readonly description: string;

  /**
   * The package task to run before the integ test (e.g., 'package:js', 'package:python')
   */
  readonly packageTask: string;

  /**
   * Function to create the workflow job for this language
   */
  readonly createJob: (project: NodeProject, config: LanguageTestConfig) => Job;
}

/**
 * Component that sets up integration tests for projen across multiple languages.
 *
 * This component creates:
 * - Individual tasks for each language (integ:javascript, integ:python, etc.)
 * - A main integ task that runs all integration tests
 * - A separate CI workflow that runs compile and then integ tests in parallel
 */
export class IntegrationTests extends Component {
  /**
   * The main integration test task
   */
  public readonly integTask: Task;

  /**
   * Individual language test tasks
   */
  public readonly tasks: Record<string, Task> = {};

  /**
   * The integration tests workflow
   */
  public readonly workflow?: GithubWorkflow;

  private readonly versions: LanguageVersions;

  constructor(project: NodeProject, options: IntegrationTestsOptions = {}) {
    super(project);

    this.versions = options.versions ?? INTEG_TEST_VERSIONS;

    // Define language test configurations
    const languageConfigs: LanguageTestConfig[] = [
      {
        name: "node",
        script: "scripts/integ-node.sh",
        description: "Run Node.js integration test",
        packageTask: "package:js",
        createJob: this.createNodeMatrixJob.bind(this),
      },
      {
        name: "python",
        script: "scripts/integ-python.sh",
        description: "Run Python integration test",
        packageTask: "package:python",
        createJob: this.createPythonMatrixJob.bind(this),
      },
      {
        name: "go",
        script: "scripts/integ-go.sh",
        description: "Run Go integration test",
        packageTask: "package:go",
        createJob: this.createGoMatrixJob.bind(this),
      },
      {
        name: "java",
        script: "scripts/integ-java.sh",
        description: "Run Java integration test",
        packageTask: "package:java",
        createJob: this.createJavaMatrixJob.bind(this),
      },
    ];

    // Create individual tasks for each language
    for (const config of languageConfigs) {
      this.tasks[config.name] = project.addTask(`integ:${config.name}`, {
        exec: config.script,
        description: config.description,
      });
    }

    // Create main integ task that runs all tests
    this.integTask = project.addTask("integ", {
      description: "Run all integration tests",
    });

    // Spawn compile and package-all before running tests
    this.integTask.spawn(project.compileTask);
    const packageAllTask = project.tasks.tryFind("package-all");
    if (packageAllTask) {
      this.integTask.spawn(packageAllTask);
    }

    // Spawn all individual language tasks
    for (const config of languageConfigs) {
      this.integTask.spawn(this.tasks[config.name]);
    }

    // Create a separate workflow for integ tests
    if (options.workflow !== false && project.github) {
      this.workflow = new GithubWorkflow(project.github, "integ");
      this.workflow.on({
        pullRequest: {},
        workflowDispatch: {},
        mergeGroup: {},
      });

      // Add integ test jobs (each job is self-contained with its own compile)
      const integJobIds: string[] = [];
      for (const config of languageConfigs) {
        const jobId = `integ-${config.name}`;
        integJobIds.push(jobId);
        const job = config.createJob(project, config);

        this.workflow.addJob(jobId, {
          ...job,
          env: {
            CI: "0",
          },
        });
      }

      // Add a final job that combines all integ test results
      this.workflow.addJob("integ", {
        runsOn: ["ubuntu-latest"],
        permissions: {},
        needs: integJobIds,
        if: "always()",
        steps: [
          ...integJobIds.map((id) => ({
            name: `${id} result`,
            run: `echo \${{ needs.${id}.result }}`,
          })),
          {
            if: `\${{ ${integJobIds
              .map((id) => `needs.${id}.result != 'success'`)
              .join(" || ")} }}`,
            name: "Set status based on integ tests",
            run: "exit 1",
          },
        ],
      });
    }
  }

  /**
   * Creates common steps for integration test jobs (checkout)
   */
  private createCommonSteps(): JobStep[] {
    return [WorkflowSteps.checkout()];
  }

  /**
   * Creates an install dependencies step
   */
  private installDepsStep(project: NodeProject): JobStep {
    return {
      name: "Install dependencies",
      run: project.package.installCommand,
    };
  }

  /**
   * Creates a compile step
   */
  private compileStep(project: NodeProject): JobStep {
    return {
      name: "Compile",
      run: project.runTaskCommand(project.compileTask),
    };
  }

  /**
   * Creates a run task step
   */
  private runTaskStep(
    project: NodeProject,
    name: string,
    nameOfTask: string,
  ): JobStep {
    return {
      name,
      run: project.runTaskCommand(project.tasks.tryFind(nameOfTask)!),
    };
  }

  /**
   * Creates a setup-node step
   */
  private setupNodeStep(version: string): JobStep {
    return {
      uses: "actions/setup-node@v4",
      with: {
        "node-version": version,
      },
    };
  }

  /**
   * Creates a setup-python step
   */
  private setupPythonStep(version: string): JobStep {
    return {
      uses: "actions/setup-python@v5",
      with: {
        "python-version": version,
      },
    };
  }

  /**
   * Creates a setup-go step
   */
  private setupGoStep(version: string): JobStep {
    return {
      uses: "actions/setup-go@v5",
      with: {
        "go-version": version,
      },
    };
  }

  /**
   * Creates a setup-java step
   */
  private setupJavaStep(version: string, distribution: string): JobStep {
    return {
      uses: "actions/setup-java@v4",
      with: {
        "java-version": version,
        distribution: distribution,
      },
    };
  }

  /**
   * Creates a Node.js matrix job for JavaScript integration tests
   */
  private createNodeMatrixJob(
    project: NodeProject,
    config: LanguageTestConfig,
  ): Job {
    return {
      permissions: {
        contents: JobPermission.READ,
      },
      runsOn: ["ubuntu-latest"],
      strategy: {
        failFast: false,
        matrix: {
          domain: {
            "node-version": this.versions.node,
          },
        },
      },
      steps: [
        ...this.createCommonSteps(),
        this.setupNodeStep("${{ matrix.node-version }}"),
        this.installDepsStep(project),
        this.compileStep(project),
        this.runTaskStep(project, "Package", config.packageTask),
        this.runTaskStep(
          project,
          `Run Node integration test`,
          taskName(config.name),
        ),
      ],
    };
  }

  /**
   * Creates a Python matrix job
   */
  private createPythonMatrixJob(
    project: NodeProject,
    config: LanguageTestConfig,
  ): Job {
    return {
      permissions: {
        contents: JobPermission.READ,
      },
      runsOn: ["ubuntu-latest"],
      strategy: {
        failFast: false,
        matrix: {
          domain: {
            "python-version": this.versions.python,
          },
        },
      },
      steps: [
        ...this.createCommonSteps(),
        this.setupPythonStep("${{ matrix.python-version }}"),
        this.setupNodeStep("lts/*"),
        this.installDepsStep(project),
        this.compileStep(project),
        this.runTaskStep(project, "Package", config.packageTask),
        this.runTaskStep(
          project,
          "Run Python integration test",
          taskName(config.name),
        ),
      ],
    };
  }

  /**
   * Creates a Go matrix job
   */
  private createGoMatrixJob(
    project: NodeProject,
    config: LanguageTestConfig,
  ): Job {
    return {
      permissions: {
        contents: JobPermission.READ,
      },
      runsOn: ["ubuntu-latest"],
      strategy: {
        failFast: false,
        matrix: {
          domain: {
            "go-version": this.versions.go,
          },
        },
      },
      steps: [
        ...this.createCommonSteps(),
        this.setupGoStep("${{ matrix.go-version }}"),
        this.setupNodeStep("lts/*"),
        this.installDepsStep(project),
        this.compileStep(project),
        this.runTaskStep(project, "Package", config.packageTask),
        this.runTaskStep(
          project,
          "Run Go integration test",
          taskName(config.name),
        ),
      ],
    };
  }

  /**
   * Creates a Java matrix job with version and distribution
   */
  private createJavaMatrixJob(
    project: NodeProject,
    config: LanguageTestConfig,
  ): Job {
    const javaVersions: JavaVersion[] = this.versions.java;

    return {
      permissions: {
        contents: JobPermission.READ,
      },
      runsOn: ["ubuntu-latest"],
      strategy: {
        failFast: false,
        matrix: {
          domain: {
            "java-version": javaVersions.map((j) => j.version),
          },
          include: javaVersions.map((j) => ({
            "java-version": j.version,
            "java-distribution": j.distribution,
          })),
        },
      },
      steps: [
        ...this.createCommonSteps(),
        this.setupJavaStep(
          "${{ matrix.java-version }}",
          "${{ matrix.java-distribution }}",
        ),
        this.setupNodeStep("lts/*"),
        this.installDepsStep(project),
        this.compileStep(project),
        this.runTaskStep(project, "Package", config.packageTask),
        this.runTaskStep(
          project,
          "Run Java integration test",
          taskName(config.name),
        ),
      ],
    };
  }
}

function taskName(lang: string): string {
  return `integ:${lang}`;
}
