import { BranchOptions } from "./release";
import { Component } from "../component";
import {
  BUILD_ARTIFACT_NAME,
  DEFAULT_GITHUB_ACTIONS_USER,
  PERMISSION_BACKUP_FILE,
} from "../github/constants";
import {
  Job,
  JobPermission,
  JobPermissions,
  JobStep,
  Tools,
} from "../github/workflows-model";
import { defaultNpmToken } from "../javascript/node-package";
import { Project } from "../project";
import { GroupRunnerOptions, filteredRunsOnOptions } from "../runner-options";
import { CHANGES_SINCE_LAST_RELEASE } from "../version";

const PUBLIB_VERSION = "latest";
const GITHUB_PACKAGES_REGISTRY = "npm.pkg.github.com";
const ARTIFACTS_DOWNLOAD_DIR = "dist";
const GITHUB_PACKAGES_MAVEN_REPOSITORY = "https://maven.pkg.github.com";
const GITHUB_PACKAGES_NUGET_REPOSITORY = "https://nuget.pkg.github.com";
const AWS_CODEARTIFACT_REGISTRY_REGEX = /.codeartifact.*.amazonaws.com/;
const PUBLIB_TOOLCHAIN = {
  js: {},
  java: { java: { version: "11" } },
  python: { python: { version: "3.x" } },
  go: { go: { version: "^1.18.0" } },
  dotnet: { dotnet: { version: "6.x" } },
};
const PUBLISH_JOB_PREFIX = "release_";

/**
 * Options for `Publisher`.
 */
export interface PublisherOptions {
  /**
   * The job ID that produces the build artifacts. All publish jobs will take a dependency on this job.
   */
  readonly buildJobId: string;

  /**
   * A GitHub workflow expression used as a condition for publishers.
   *
   * @default - no condition
   */
  readonly condition?: string;

  /**
   * The name of the artifact to download (e.g. `dist`).
   *
   * The artifact is expected to include a subdirectory for each release target:
   * `go` (GitHub), `dotnet` (NuGet), `java` (Maven), `js` (npm), `python`
   * (PyPI).
   *
   * @see https://github.com/aws/publib
   */
  readonly artifactName: string;

  /**
   * @deprecated use `publibVersion` instead
   */
  readonly jsiiReleaseVersion?: string;

  /**
   * Node version to setup in GitHub workflows if any node-based CLI utilities
   * are needed. For example `publib`, the CLI projen uses to publish releases,
   * is an npm library.
   *
   * @default lts/*
   */
  readonly workflowNodeVersion?: string;

  /**
   * Container image to use for GitHub workflows.
   *
   * @default - default image
   */
  readonly workflowContainerImage?: string;

  /**
   * Version requirement for `publib`.
   *
   * @default "latest"
   */
  readonly publibVersion?: string;

  /**
   * Create an issue when a publish task fails.
   *
   * @default false
   */
  readonly failureIssue?: boolean;

  /**
   * The label to apply to the issue marking failed publish tasks.
   * Only applies if `failureIssue` is true.
   *
   * @default "failed-release"
   */
  readonly failureIssueLabel?: string;

  /**
   * Github Runner selection labels
   * @default ["ubuntu-latest"]
   * @description Defines a target Runner by labels
   * @throws {Error} if both `runsOn` and `runsOnGroup` are specified
   */
  readonly workflowRunsOn?: string[];

  /**
   * Github Runner Group selection options
   * @description Defines a target Runner Group by name and/or labels
   * @throws {Error} if both `runsOn` and `runsOnGroup` are specified
   */
  readonly workflowRunsOnGroup?: GroupRunnerOptions;

  /**
   * Define publishing tasks that can be executed manually as well as workflows.
   *
   * Normally, publishing only happens within automated workflows. Enable this
   * in order to create a publishing task for each publishing activity.
   *
   * @default false
   */
  readonly publishTasks?: boolean;

  /**
   * Do not actually publish, only print the commands that would be executed instead.
   *
   * Useful if you wish to block all publishing from a single option.
   */
  readonly dryRun?: boolean;
}

/**
 * Implements GitHub jobs for publishing modules to package managers.
 *
 * Under the hood, it uses https://github.com/aws/publib
 */
export class Publisher extends Component {
  public static readonly PUBLISH_GIT_TASK_NAME = "publish:git";

  public readonly buildJobId: string;
  public readonly artifactName: string;
  public readonly publibVersion: string;
  public readonly condition?: string;

  /** @deprecated use `publibVersion` */
  public readonly jsiiReleaseVersion: string;

  private readonly failureIssue: boolean;
  private readonly failureIssueLabel: string;
  private readonly runsOn?: string[];
  private readonly runsOnGroup?: GroupRunnerOptions;
  private readonly publishTasks: boolean;

  // functions that create jobs associated with a specific branch
  private readonly _jobFactories: PublishJobFactory[] = [];

  private readonly _gitHubPrePublishing: JobStep[] = [];
  private readonly _gitHubPostPublishing: JobStep[] = [];

  private readonly dryRun: boolean;

  private readonly workflowNodeVersion: string;
  private readonly workflowContainerImage?: string;

  // List of publish jobs added to the publisher
  // Maps between the basename and the jobname
  private readonly publishJobs: Record<string, string> = {};

  constructor(project: Project, options: PublisherOptions) {
    super(project);

    this.buildJobId = options.buildJobId;
    this.artifactName = options.artifactName;
    this.publibVersion =
      options.publibVersion ?? options.jsiiReleaseVersion ?? PUBLIB_VERSION;
    this.jsiiReleaseVersion = this.publibVersion;
    this.condition = options.condition;
    this.dryRun = options.dryRun ?? false;
    this.workflowNodeVersion = options.workflowNodeVersion ?? "lts/*";
    this.workflowContainerImage = options.workflowContainerImage;

    this.failureIssue = options.failureIssue ?? false;
    this.failureIssueLabel = options.failureIssueLabel ?? "failed-release";
    this.publishTasks = options.publishTasks ?? false;
    this.runsOn = options.workflowRunsOn;
    this.runsOnGroup = options.workflowRunsOnGroup;
  }

  /**
   * Called by `Release` to add the publishing jobs to a release workflow
   * associated with a specific branch.
   * @param branch The branch name
   * @param options Branch options
   *
   * @internal
   */
  public _renderJobsForBranch(
    branch: string,
    options: Partial<BranchOptions>
  ): Record<string, Job> {
    let jobs: Record<string, Job> = {};

    for (const factory of this._jobFactories) {
      jobs = {
        ...jobs,
        ...factory(branch, options),
      };
    }

    return jobs;
  }

  /**
   * Adds pre publishing steps for the GitHub release job.
   *
   * @param steps The steps.
   */
  public addGitHubPrePublishingSteps(...steps: JobStep[]) {
    this._gitHubPrePublishing.push(...steps);
  }

  /**
   * Adds post publishing steps for the GitHub release job.
   *
   * @param steps The steps.
   */
  public addGitHubPostPublishingSteps(...steps: JobStep[]) {
    this._gitHubPostPublishing.push(...steps);
  }

  /**
   * Publish to git.
   *
   * This includes generating a project-level changelog and release tags.
   *
   * @param options Options
   */
  public publishToGit(options: GitPublishOptions) {
    const releaseTagFile = options.releaseTagFile;
    const versionFile = options.versionFile;
    const changelog = options.changelogFile;
    const projectChangelogFile = options.projectChangelogFile;
    const gitBranch = options.gitBranch ?? "main";

    const taskName =
      gitBranch === "main" || gitBranch === "master"
        ? Publisher.PUBLISH_GIT_TASK_NAME
        : `${Publisher.PUBLISH_GIT_TASK_NAME}:${gitBranch}`;

    const publishTask = this.project.addTask(taskName, {
      description:
        "Prepends the release changelog onto the project changelog, creates a release commit, and tags the release",
      env: {
        CHANGELOG: changelog,
        RELEASE_TAG_FILE: releaseTagFile,
        PROJECT_CHANGELOG_FILE: projectChangelogFile ?? "",
        VERSION_FILE: versionFile,
      },
      condition: CHANGES_SINCE_LAST_RELEASE,
    });
    if (projectChangelogFile) {
      publishTask.builtin("release/update-changelog");
    }
    publishTask.builtin("release/tag-version");

    if (options.gitPushCommand !== "") {
      const gitPushCommand =
        options.gitPushCommand || `git push --follow-tags origin ${gitBranch}`;
      publishTask.exec(gitPushCommand);
    }

    return publishTask;
  }

  /**
   * Creates a GitHub Release.
   * @param options Options
   */
  public publishToGitHubReleases(options: GitHubReleasesPublishOptions) {
    const jobName = "github";
    this.addPublishJob(jobName, (_branch, branchOptions): PublishJobOptions => {
      return {
        registryName: "GitHub Releases",
        prePublishSteps: options.prePublishSteps ?? this._gitHubPrePublishing,
        postPublishSteps:
          options.postPublishSteps ?? this._gitHubPostPublishing,
        publishTools: options.publishTools,
        permissions: {
          contents: JobPermission.WRITE,
        },
        needs: Object.entries(this.publishJobs)
          .filter(([name, _]) => name != jobName)
          .map(([_, job]) => job),
        workflowEnv: {
          GITHUB_TOKEN: "${{ secrets.GITHUB_TOKEN }}",
        },
        run: this.githubReleaseCommand(options, branchOptions),
      };
    });
  }

  /**
   * Publishes artifacts from `js/**` to npm.
   * @param options Options
   */
  public publishToNpm(options: NpmPublishOptions = {}) {
    const isGitHubPackages = options.registry?.startsWith(
      GITHUB_PACKAGES_REGISTRY
    );
    const isAwsCodeArtifact = isAwsCodeArtifactRegistry(options.registry);
    const isAwsCodeArtifactWithOidc =
      isAwsCodeArtifact &&
      options.codeArtifactOptions?.authProvider ===
        CodeArtifactAuthProvider.GITHUB_OIDC;
    const npmToken = defaultNpmToken(options.npmTokenSecret, options.registry);

    if (options.distTag) {
      this.project.logger.warn(
        "The `distTag` option is deprecated. Use the npmDistTag option instead."
      );
    }

    const prePublishSteps: JobStep[] = options.prePublishSteps ?? [];

    if (isAwsCodeArtifactWithOidc) {
      if (
        options.codeArtifactOptions?.accessKeyIdSecret ||
        options.codeArtifactOptions?.secretAccessKeySecret
      ) {
        throw new Error(
          "access and secret key pair should not be provided when using GITHUB_OIDC auth provider for AWS CodeArtifact"
        );
      } else if (!options.codeArtifactOptions?.roleToAssume) {
        throw new Error(
          '"roleToAssume" property is required when using GITHUB_OIDC for AWS CodeArtifact options'
        );
      }
      const regionCaptureRegex = /codeartifact\.(.+)\.amazonaws\.com/;
      const region = options.registry?.match(regionCaptureRegex)?.[1];
      prePublishSteps.push({
        name: "Configure AWS Credentials via GitHub OIDC Provider",
        uses: "aws-actions/configure-aws-credentials@v4",
        with: {
          "role-to-assume": options.codeArtifactOptions.roleToAssume,
          "aws-region": region,
        },
      });
    }

    this.addPublishJob("npm", (_branch, branchOptions): PublishJobOptions => {
      if (branchOptions.npmDistTag && options.distTag) {
        throw new Error(
          "cannot set branch-level npmDistTag and npmDistTag in publishToNpm()"
        );
      }

      const npmProvenance = options.npmProvenance ? "true" : undefined;
      const needsIdTokenWrite = isAwsCodeArtifactWithOidc || npmProvenance;
      return {
        publishTools: PUBLIB_TOOLCHAIN.js,
        prePublishSteps,
        postPublishSteps: options.postPublishSteps ?? [],
        run: this.publibCommand("publib-npm"),
        registryName: "npm",
        env: {
          NPM_DIST_TAG: branchOptions.npmDistTag ?? options.distTag ?? "latest",
          NPM_REGISTRY: options.registry,
          NPM_CONFIG_PROVENANCE: npmProvenance,
        },
        permissions: {
          idToken: needsIdTokenWrite ? JobPermission.WRITE : undefined,
          contents: JobPermission.READ,
          packages: isGitHubPackages ? JobPermission.WRITE : undefined,
        },
        workflowEnv: {
          NPM_TOKEN: npmToken ? secret(npmToken) : undefined,
          // if we are publishing to AWS CodeArtifact, pass AWS access keys that will be used to generate NPM_TOKEN using AWS CLI.
          AWS_ACCESS_KEY_ID:
            isAwsCodeArtifact && !isAwsCodeArtifactWithOidc
              ? secret(
                  options.codeArtifactOptions?.accessKeyIdSecret ??
                    "AWS_ACCESS_KEY_ID"
                )
              : undefined,
          AWS_SECRET_ACCESS_KEY:
            isAwsCodeArtifact && !isAwsCodeArtifactWithOidc
              ? secret(
                  options.codeArtifactOptions?.secretAccessKeySecret ??
                    "AWS_SECRET_ACCESS_KEY"
                )
              : undefined,
          AWS_ROLE_TO_ASSUME:
            isAwsCodeArtifact && !isAwsCodeArtifactWithOidc
              ? options.codeArtifactOptions?.roleToAssume
              : undefined,
        },
      };
    });
  }

  /**
   * Publishes artifacts from `dotnet/**` to NuGet Gallery.
   * @param options Options
   */
  public publishToNuget(options: NugetPublishOptions = {}) {
    const isGitHubPackages = options.nugetServer?.startsWith(
      GITHUB_PACKAGES_NUGET_REPOSITORY
    );

    this.addPublishJob(
      "nuget",
      (_branch, _branchOptions): PublishJobOptions => ({
        publishTools: PUBLIB_TOOLCHAIN.dotnet,
        prePublishSteps: options.prePublishSteps ?? [],
        postPublishSteps: options.postPublishSteps ?? [],
        run: this.publibCommand("publib-nuget"),
        registryName: "NuGet Gallery",
        permissions: {
          contents: JobPermission.READ,
          packages: isGitHubPackages ? JobPermission.WRITE : undefined,
        },
        workflowEnv: {
          NUGET_API_KEY: secret(
            isGitHubPackages
              ? "GITHUB_TOKEN"
              : options.nugetApiKeySecret ?? "NUGET_API_KEY"
          ),
          NUGET_SERVER: options.nugetServer ?? undefined,
        },
      })
    );
  }

  /**
   * Publishes artifacts from `java/**` to Maven.
   * @param options Options
   */
  public publishToMaven(options: MavenPublishOptions = {}) {
    const isGitHubPackages = options.mavenRepositoryUrl?.startsWith(
      GITHUB_PACKAGES_MAVEN_REPOSITORY
    );
    const isGitHubActor =
      isGitHubPackages && options.mavenUsername == undefined;
    const mavenServerId =
      options.mavenServerId ?? (isGitHubPackages ? "github" : undefined);

    if (isGitHubPackages && mavenServerId != "github") {
      throw new Error(
        'publishing to GitHub Packages requires the "mavenServerId" to be "github"'
      );
    }

    this.addPublishJob(
      "maven",
      (_branch, _branchOptions): PublishJobOptions => ({
        registryName: "Maven Central",
        publishTools: PUBLIB_TOOLCHAIN.java,
        prePublishSteps: options.prePublishSteps ?? [],
        postPublishSteps: options.postPublishSteps ?? [],
        run: this.publibCommand("publib-maven"),
        env: {
          MAVEN_ENDPOINT: options.mavenEndpoint,
          MAVEN_SERVER_ID: mavenServerId,
          MAVEN_REPOSITORY_URL: options.mavenRepositoryUrl,
        },
        workflowEnv: {
          MAVEN_GPG_PRIVATE_KEY: isGitHubPackages
            ? undefined
            : secret(
                options.mavenGpgPrivateKeySecret ?? "MAVEN_GPG_PRIVATE_KEY"
              ),
          MAVEN_GPG_PRIVATE_KEY_PASSPHRASE: isGitHubPackages
            ? undefined
            : secret(
                options.mavenGpgPrivateKeyPassphrase ??
                  "MAVEN_GPG_PRIVATE_KEY_PASSPHRASE"
              ),
          MAVEN_PASSWORD: secret(
            options.mavenPassword ??
              (isGitHubPackages ? "GITHUB_TOKEN" : "MAVEN_PASSWORD")
          ),
          MAVEN_USERNAME: isGitHubActor
            ? "${{ github.actor }}"
            : secret(options.mavenUsername ?? "MAVEN_USERNAME"),
          MAVEN_STAGING_PROFILE_ID: isGitHubPackages
            ? undefined
            : secret(
                options.mavenStagingProfileId ?? "MAVEN_STAGING_PROFILE_ID"
              ),
        },
        permissions: {
          contents: JobPermission.READ,
          packages: isGitHubPackages ? JobPermission.WRITE : undefined,
        },
      })
    );
  }

  /**
   * Publishes wheel artifacts from `python` to PyPI.
   * @param options Options
   */
  public publishToPyPi(options: PyPiPublishOptions = {}) {
    let permissions: JobPermissions = { contents: JobPermission.READ };
    const prePublishSteps = options.prePublishSteps ?? [];
    let workflowEnv: Record<string, string | undefined> = {};
    const isAwsCodeArtifact = isAwsCodeArtifactRegistry(
      options.twineRegistryUrl
    );
    if (isAwsCodeArtifact) {
      const { domain, account, region } = awsCodeArtifactInfoFromUrl(
        options.twineRegistryUrl
      );
      const {
        authProvider,
        roleToAssume,
        accessKeyIdSecret,
        secretAccessKeySecret,
      } = options.codeArtifactOptions ?? {};
      const useOidcAuth = authProvider === CodeArtifactAuthProvider.GITHUB_OIDC;
      if (useOidcAuth) {
        if (!roleToAssume) {
          throw new Error(
            '"roleToAssume" property is required when using GITHUB_OIDC for AWS CodeArtifact options'
          );
        }
        permissions = { ...permissions, idToken: JobPermission.WRITE };
        prePublishSteps.push({
          name: "Configure AWS Credentials via GitHub OIDC Provider",
          uses: "aws-actions/configure-aws-credentials@v4",
          with: {
            "role-to-assume": roleToAssume,
            "aws-region": region,
          },
        });
      }
      prePublishSteps.push({
        name: "Generate CodeArtifact Token",
        run: `echo "TWINE_PASSWORD=$(aws codeartifact get-authorization-token --domain ${domain} --domain-owner ${account} --region ${region} --query authorizationToken --output text)" >> $GITHUB_ENV`,
        env: useOidcAuth
          ? undefined
          : {
              AWS_ACCESS_KEY_ID: secret(
                accessKeyIdSecret ?? "AWS_ACCESS_KEY_ID"
              ),
              AWS_SECRET_ACCESS_KEY: secret(
                secretAccessKeySecret ?? "AWS_SECRET_ACCESS_KEY"
              ),
            },
      });
      workflowEnv = { TWINE_USERNAME: "aws" };
    } else {
      workflowEnv = {
        TWINE_USERNAME: secret(options.twineUsernameSecret ?? "TWINE_USERNAME"),
        TWINE_PASSWORD: secret(options.twinePasswordSecret ?? "TWINE_PASSWORD"),
      };
    }

    this.addPublishJob(
      "pypi",
      (_branch, _branchOptions): PublishJobOptions => ({
        registryName: "PyPI",
        publishTools: PUBLIB_TOOLCHAIN.python,
        permissions,
        prePublishSteps,
        postPublishSteps: options.postPublishSteps ?? [],
        run: this.publibCommand("publib-pypi"),
        env: {
          TWINE_REPOSITORY_URL: options.twineRegistryUrl,
        },
        workflowEnv,
      })
    );
  }

  /**
   * Adds a go publishing job.
   * @param options Options
   */
  public publishToGo(options: GoPublishOptions = {}) {
    const prePublishSteps = options.prePublishSteps ?? [];
    const workflowEnv: { [name: string]: string | undefined } = {};
    if (options.githubUseSsh) {
      workflowEnv.GITHUB_USE_SSH = "true";
      workflowEnv.SSH_AUTH_SOCK = "/tmp/ssh_agent.sock";
      prePublishSteps.push({
        name: "Setup GitHub deploy key",
        run: 'ssh-agent -a ${SSH_AUTH_SOCK} && ssh-add - <<< "${GITHUB_DEPLOY_KEY}"',
        env: {
          GITHUB_DEPLOY_KEY: secret(
            options.githubDeployKeySecret ?? "GO_GITHUB_DEPLOY_KEY"
          ),
          SSH_AUTH_SOCK: workflowEnv.SSH_AUTH_SOCK,
        },
      });
    } else {
      workflowEnv.GITHUB_TOKEN = secret(
        options.githubTokenSecret ?? "GO_GITHUB_TOKEN"
      );
    }

    this.addPublishJob(
      "golang",
      (_branch, _branchOptions): PublishJobOptions => ({
        publishTools: PUBLIB_TOOLCHAIN.go,
        prePublishSteps: prePublishSteps,
        postPublishSteps: options.postPublishSteps ?? [],
        run: this.publibCommand("publib-golang"),
        registryName: "GitHub Go Module Repository",
        env: {
          GIT_BRANCH: options.gitBranch,
          GIT_USER_NAME:
            options.gitUserName ?? DEFAULT_GITHUB_ACTIONS_USER.name,
          GIT_USER_EMAIL:
            options.gitUserEmail ?? DEFAULT_GITHUB_ACTIONS_USER.email,
          GIT_COMMIT_MESSAGE: options.gitCommitMessage,
        },
        workflowEnv: workflowEnv,
      })
    );
  }

  private addPublishJob(
    /**
     * The basename of the publish job (should be lowercase).
     * Will be extended with a prefix.
     */
    basename: string,
    factory: (
      branch: string,
      branchOptions: Partial<BranchOptions>
    ) => PublishJobOptions
  ) {
    const jobname = `${PUBLISH_JOB_PREFIX}${basename}`;
    this.publishJobs[basename] = jobname;

    this._jobFactories.push((branch, branchOptions) => {
      const opts = factory(branch, branchOptions);
      if (jobname in this._jobFactories) {
        throw new Error(`Duplicate job with name "${jobname}"`);
      }

      const commandToRun = this.dryRun
        ? `echo "DRY RUN: ${opts.run}"`
        : opts.run;
      const requiredEnv = new Array<string>();

      // jobEnv is the env we pass to the github job (task environment + secrets/expressions).
      const jobEnv: Record<string, string> = { ...opts.env };
      const workflowEnvEntries = Object.entries(opts.workflowEnv ?? {}).filter(
        ([_, value]) => value != undefined
      ) as string[][];
      for (const [env, expression] of workflowEnvEntries) {
        requiredEnv.push(env);
        jobEnv[env] = expression;
      }

      if (this.publishTasks) {
        const branchSuffix =
          branch === "main" || branch === "master" ? "" : `:${branch}`;

        // define a task which can be used through `projen publish:xxx`.
        const task = this.project.addTask(
          `publish:${basename.toLocaleLowerCase()}${branchSuffix}`,
          {
            description: `Publish this package to ${opts.registryName}`,
            env: opts.env,
            requiredEnv: requiredEnv,
          }
        );

        // first verify that we are on the correct branch
        task.exec(`test "$(git branch --show-current)" = "${branch}"`);

        // run commands
        task.exec(commandToRun);
      }

      const steps: JobStep[] = [
        {
          name: "Download build artifacts",
          uses: "actions/download-artifact@v4",
          with: {
            name: BUILD_ARTIFACT_NAME,
            path: ARTIFACTS_DOWNLOAD_DIR, // this must be "dist" for publib
          },
        },
        {
          name: "Restore build artifact permissions",
          continueOnError: true,
          run: [
            `cd ${ARTIFACTS_DOWNLOAD_DIR} && setfacl --restore=${PERMISSION_BACKUP_FILE}`,
          ].join("\n"),
        },
        ...opts.prePublishSteps,
        {
          name: "Release",
          // it would have been nice if we could just run "projen publish:xxx" here but that is not possible because this job does not checkout sources
          run: commandToRun,
          env: jobEnv,
        },
        ...opts.postPublishSteps,
      ];

      const perms = opts.permissions ?? { contents: JobPermission.READ };
      const container = this.workflowContainerImage
        ? {
            image: this.workflowContainerImage,
          }
        : undefined;

      if (this.failureIssue) {
        steps.push(
          ...[
            {
              name: "Extract Version",
              if: "${{ failure() }}",
              id: "extract-version",
              run: 'echo "VERSION=$(cat dist/version.txt)" >> $GITHUB_OUTPUT',
            },
            {
              name: "Create Issue",
              if: "${{ failure() }}",
              uses: "imjohnbo/issue-bot@v3",
              with: {
                labels: this.failureIssueLabel,
                title: `Publishing v\${{ steps.extract-version.outputs.VERSION }} to ${opts.registryName} failed`,
                body: "See https://github.com/${{ github.repository }}/actions/runs/${{ github.run_id }}",
              },
              env: {
                GITHUB_TOKEN: "${{ secrets.GITHUB_TOKEN }}",
              },
            },
          ]
        );
        Object.assign(perms, { issues: JobPermission.WRITE });
      }

      return {
        [jobname]: {
          tools: {
            node: { version: this.workflowNodeVersion },
            ...opts.publishTools,
          },
          name: `Publish to ${opts.registryName}`,
          permissions: perms,
          if: this.condition,
          needs: [this.buildJobId, ...(opts.needs ?? [])],
          ...filteredRunsOnOptions(this.runsOn, this.runsOnGroup),
          container,
          steps,
        },
      };
    });
  }

  private publibCommand(command: string) {
    return `npx -p publib@${this.publibVersion} ${command}`;
  }

  private githubReleaseCommand(
    options: GitHubReleasesPublishOptions,
    branchOptions: Partial<BranchOptions>
  ): string {
    const changelogFile = options.changelogFile;
    const releaseTagFile = options.releaseTagFile;

    // create a github release
    const releaseTag = `$(cat ${releaseTagFile})`;
    const ghReleaseCommand = [
      `gh release create ${releaseTag}`,
      "-R $GITHUB_REPOSITORY",
      `-F ${changelogFile}`,
      `-t ${releaseTag}`,
      "--target $GITHUB_SHA",
    ];

    if (branchOptions.prerelease) {
      ghReleaseCommand.push("-p");
    }

    const ghRelease = ghReleaseCommand.join(" ");

    // release script that does not error when re-releasing a given version
    const idempotentRelease = [
      "errout=$(mktemp);",
      `${ghRelease} 2> $errout && true;`,
      "exitcode=$?;",
      'if [ $exitcode -ne 0 ] && ! grep -q "Release.tag_name already exists" $errout; then',
      "cat $errout;",
      "exit $exitcode;",
      "fi",
    ].join(" ");
    return idempotentRelease;
  }
}

function secret(secretName: string) {
  return `\${{ secrets.${secretName} }}`;
}

interface PublishJobOptions {
  /**
   * The command to execute.
   */
  readonly run: string;

  /**
   * Environment variables to set
   */
  readonly env?: Record<string, any>;

  /**
   * The display name of the registry (for description)
   */
  readonly registryName: string;

  /**
   * Job permissions
   */
  readonly permissions?: JobPermissions;

  /**
   * Environment to include only in the workflow (and not tasks).
   */
  readonly workflowEnv?: { [name: string]: string | undefined };

  /**
   * Steps to execute before the release command for preparing the dist/ output.
   */
  readonly prePublishSteps: JobStep[];

  /**
   * Steps to execute before the release command for preparing the dist/ output.
   */
  readonly postPublishSteps: JobStep[];

  /**
   * Tools setup for the workflow.
   * @default - no tools are installed
   */
  readonly publishTools?: Tools;

  /**
   * Additional jobs the publish jobs depends on.
   */
  readonly needs?: string[];
}

/**
 * Common publishing options
 */
export interface CommonPublishOptions {
  /**
   * Steps to execute before executing the publishing command. These can be used
   * to prepare the artifact for publishing if needed.
   *
   * These steps are executed after `dist/` has been populated with the build
   * output.
   *
   * Note that when using this in `publishToGitHubReleases` this will override steps added via `addGitHubPrePublishingSteps`.
   */
  readonly prePublishSteps?: JobStep[];

  /**
   * Steps to execute after executing the publishing command. These can be used
   * to add/update the release artifacts ot any other tasks needed.
   *
   *
   * Note that when using this in `publishToGitHubReleases` this will override steps added via `addGitHubPostPublishingSteps`.
   */
  readonly postPublishSteps?: JobStep[];

  /**
   * Additional tools to install in the publishing job.
   * @default - no additional tools are installed
   */
  readonly publishTools?: Tools;
}

/**
 * @deprecated Use `NpmPublishOptions` instead.
 */
export interface JsiiReleaseNpm extends NpmPublishOptions {}

/**
 * Options for npm release
 */
export interface NpmPublishOptions extends CommonPublishOptions {
  /**
   * Tags can be used to provide an alias instead of version numbers.
   *
   * For example, a project might choose to have multiple streams of development
   * and use a different tag for each stream, e.g., stable, beta, dev, canary.
   *
   * By default, the `latest` tag is used by npm to identify the current version
   * of a package, and `npm install <pkg>` (without any `@<version>` or `@<tag>`
   * specifier) installs the latest tag. Typically, projects only use the
   * `latest` tag for stable release versions, and use other tags for unstable
   * versions such as prereleases.
   *
   * The `next` tag is used by some projects to identify the upcoming version.
   *
   * @default "latest"
   * @deprecated Use `npmDistTag` for each release branch instead.
   */
  readonly distTag?: string;

  /**
   * The domain name of the npm package registry.
   *
   * To publish to GitHub Packages, set this value to `"npm.pkg.github.com"`. In
   * this if `npmTokenSecret` is not specified, it will default to
   * `GITHUB_TOKEN` which means that you will be able to publish to the
   * repository's package store. In this case, make sure `repositoryUrl` is
   * correctly defined.
   *
   * @default "registry.npmjs.org"
   * @example "npm.pkg.github.com"
   */
  readonly registry?: string;

  /**
   * GitHub secret which contains the NPM token to use when publishing packages.
   * @default - "NPM_TOKEN" or "GITHUB_TOKEN" if `registry` is set to `npm.pkg.github.com`.
   */
  readonly npmTokenSecret?: string;

  /**
   * Should provenance statements be generated when package is published.
   *
   * Note that this component is using `publib` to publish packages,
   * which is using npm internally and supports provenance statements independently of the package manager used.
   *
   * @see https://docs.npmjs.com/generating-provenance-statements
   * @default - undefined
   */
  readonly npmProvenance?: boolean;

  /**
   * Options for publishing npm package to AWS CodeArtifact.
   *
   * @default - undefined
   */
  readonly codeArtifactOptions?: CodeArtifactOptions;
}

/**
 * Options for authorizing requests to a AWS CodeArtifact npm repository.
 */
export enum CodeArtifactAuthProvider {
  /**
   * Fixed credentials provided via Github secrets.
   */
  ACCESS_AND_SECRET_KEY_PAIR = "ACCESS_AND_SECRET_KEY_PAIR",

  /**
   * Ephemeral credentials provided via Github's OIDC integration with an IAM role.
   * See:
   * https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html
   * https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services
   */
  GITHUB_OIDC = "GITHUB_OIDC",
}

/**
 * Options for publishing packages to AWS CodeArtifact.
 */
export interface CodeArtifactOptions {
  /**
   * Provider to use for authorizing requests to AWS CodeArtifact.
   *
   * @default CodeArtifactAuthProvider.ACCESS_AND_SECRET_KEY_PAIR
   */
  readonly authProvider?: CodeArtifactAuthProvider;
  /**
   * GitHub secret which contains the AWS access key ID to use when publishing packages to AWS CodeArtifact.
   * This property must be specified only when publishing to AWS CodeArtifact (`npmRegistryUrl` contains AWS CodeArtifact URL).
   *
   * @default - When the `authProvider` value is set to
   * `CodeArtifactAuthProvider.ACCESS_AND_SECRET_KEY_PAIR`, the default is
   * "AWS_ACCESS_KEY_ID". For `CodeArtifactAuthProvider.GITHUB_OIDC`, this
   * value must be left undefined.
   */
  readonly accessKeyIdSecret?: string;

  /**
   * GitHub secret which contains the AWS secret access key to use when publishing packages to AWS CodeArtifact.
   * This property must be specified only when publishing to AWS CodeArtifact (`npmRegistryUrl` contains AWS CodeArtifact URL).
   *
   * @default - When the `authProvider` value is set to
   * `CodeArtifactAuthProvider.ACCESS_AND_SECRET_KEY_PAIR`, the default is
   * "AWS_SECRET_ACCESS_KEY". For `CodeArtifactAuthProvider.GITHUB_OIDC`, this
   * value must be left undefined.
   */
  readonly secretAccessKeySecret?: string;

  /**
   * ARN of AWS role to be assumed prior to get authorization token from AWS CodeArtifact
   * This property must be specified only when publishing to AWS CodeArtifact (`registry` contains AWS CodeArtifact URL).
   * When using the `CodeArtifactAuthProvider.GITHUB_OIDC` auth provider, this value must be defined.
   *
   * @default undefined
   */
  readonly roleToAssume?: string;
}

/**
 * @deprecated Use `PyPiPublishOptions` instead.
 */
export interface JsiiReleasePyPi extends PyPiPublishOptions {}

/**
 * Options for PyPI release
 */
export interface PyPiPublishOptions extends CommonPublishOptions {
  /**
   * The registry url to use when releasing packages.
   *
   * @default - twine default
   */
  readonly twineRegistryUrl?: string;

  /**
   * The GitHub secret which contains PyPI user name.
   * @default "TWINE_USERNAME"
   */
  readonly twineUsernameSecret?: string;

  /**
   * The GitHub secret which contains PyPI password.
   * @default "TWINE_PASSWORD"
   */
  readonly twinePasswordSecret?: string;

  /**
   * Options for publishing to AWS CodeArtifact.
   *
   * @default - undefined
   */
  readonly codeArtifactOptions?: CodeArtifactOptions;
}

/**
 * @deprecated Use `NugetPublishOptions` instead.
 */
export interface JsiiReleaseNuget extends NugetPublishOptions {}

/**
 * Options for NuGet releases
 */
export interface NugetPublishOptions extends CommonPublishOptions {
  /**
   * GitHub secret which contains the API key for NuGet.
   *
   * @default "NUGET_API_KEY"
   */
  readonly nugetApiKeySecret?: string;

  /**
   *  NuGet Server URL (defaults to nuget.org)
   */
  readonly nugetServer?: string;
}

/**
 * @deprecated Use `MavenPublishOptions` instead.
 */
export interface JsiiReleaseMaven extends MavenPublishOptions {}

/**
 * Options for Maven releases
 */
export interface MavenPublishOptions extends CommonPublishOptions {
  /**
   * URL of Nexus repository. if not set, defaults to https://oss.sonatype.org
   *
   * @default "https://oss.sonatype.org"
   */
  readonly mavenEndpoint?: string;

  /**
   * Used in maven settings for credential lookup (e.g. use github when publishing to GitHub).
   *
   * @default "ossrh" (Maven Central) or "github" when using GitHub Packages
   */
  readonly mavenServerId?: string;

  /**
   * Deployment repository when not deploying to Maven Central
   *
   * @default - not set
   */
  readonly mavenRepositoryUrl?: string;

  /**
   * GitHub secret name which contains the GPG private key or file that includes
   * it. This is used to sign your Maven
   * packages. See instructions.
   *
   * @see https://github.com/aws/publib#maven
   * @default "MAVEN_GPG_PRIVATE_KEY" or not set when using GitHub Packages
   */
  readonly mavenGpgPrivateKeySecret?: string;

  /**
   * GitHub secret name which contains the GPG private key or file that includes
   * it. This is used to sign your Maven packages. See instructions.
   *
   * @see https://github.com/aws/publib#maven
   * @default "MAVEN_GPG_PRIVATE_KEY_PASSPHRASE" or not set when using GitHub Packages
   */
  readonly mavenGpgPrivateKeyPassphrase?: string;

  /**
   * GitHub secret name which contains the Username for maven repository.
   *
   * For Maven Central, you will need to Create JIRA account and then request a
   * new project (see links).
   *
   * @see https://issues.sonatype.org/secure/Signup
   * @see https://issues.sonatype.org/secure/CreateIssue.jspa?issuetype=21&pid=10134
   *
   * @default "MAVEN_USERNAME" or the GitHub Actor when using GitHub Packages
   */
  readonly mavenUsername?: string;

  /**
   * GitHub secret name which contains the Password for maven repository.
   *
   * For Maven Central, you will need to Create JIRA account and then request a
   * new project (see links).
   *
   * @see https://issues.sonatype.org/secure/Signup
   * @see https://issues.sonatype.org/secure/CreateIssue.jspa?issuetype=21&pid=10134
   *
   * @default "MAVEN_PASSWORD" or "GITHUB_TOKEN" when using GitHub Packages
   */
  readonly mavenPassword?: string;

  /**
   * GitHub secret name which contains the Maven Central (sonatype) staging
   * profile ID (e.g. 68a05363083174). Staging profile ID can be found in the
   * URL of the "Releases" staging profile under "Staging Profiles" in
   * https://oss.sonatype.org (e.g.
   * https://oss.sonatype.org/#stagingProfiles;11a33451234521)

   * @default "MAVEN_STAGING_PROFILE_ID" or not set when using GitHub Packages
   */
  readonly mavenStagingProfileId?: string;
}

/**
 * @deprecated Use `GoPublishOptions` instead.
 */
export interface JsiiReleaseGo extends GoPublishOptions {}

/**
 * Options for Go releases.
 */
export interface GoPublishOptions extends CommonPublishOptions {
  /**
   * The name of the secret that includes a personal GitHub access token used to
   * push to the GitHub repository.
   *
   * Ignored if `githubUseSsh` is `true`.
   *
   * @default "GO_GITHUB_TOKEN"
   */
  readonly githubTokenSecret?: string;

  /**
   * The name of the secret that includes a GitHub deploy key used to push to the
   * GitHub repository.
   *
   * Ignored if `githubUseSsh` is `false`.
   *
   * @default "GO_GITHUB_DEPLOY_KEY"
   */
  readonly githubDeployKeySecret?: string;

  /**
   * Use SSH to push to GitHub instead of a personal accses token.
   *
   * @default false
   */
  readonly githubUseSsh?: boolean;

  /**
   * Branch to push to.
   *
   * @default "main"
   */
  readonly gitBranch?: string;

  /**
   * The user name to use for the release git commit.
   * @default "github-actions"
   */
  readonly gitUserName?: string;

  /**
   * The email to use in the release git commit.
   * @default "github-actions@github.com"
   */
  readonly gitUserEmail?: string;

  /**
   * The commit message.
   *
   * @default "chore(release): $VERSION"
   */
  readonly gitCommitMessage?: string;
}

interface VersionArtifactOptions {
  /**
   * The location of a text file (relative to `dist/`) that contains the version number.
   *
   * @example version.txt
   */
  readonly versionFile: string;

  /**
   * The location of a text file (relative to `dist/`) that contains the release tag.
   *
   * @example releasetag.txt
   */
  readonly releaseTagFile: string;

  /**
   * The location of an .md file (relative to `dist/`) that includes the changelog for the release.
   *
   * @example changelog.md
   */
  readonly changelogFile: string;
}

/**
 * Evaluates if the `registryUrl` is a AWS CodeArtifact registry.
 * @param registryUrl url of registry
 * @returns true for AWS CodeArtifact
 */
export function isAwsCodeArtifactRegistry(registryUrl: string | undefined) {
  return registryUrl && AWS_CODEARTIFACT_REGISTRY_REGEX.test(registryUrl);
}

/**
 * Info extracted from AWS CodeArtifact URL
 */
interface AwsCodeArtifactInfo {
  readonly domain?: string;
  readonly account?: string;
  readonly region?: string;
}

/**
 * Parses info about code artifact domain from given AWS code artifact url
 * @param url Of code artifact domain
 * @returns domain, account, and region of code artifact domain
 */
function awsCodeArtifactInfoFromUrl(url?: string): AwsCodeArtifactInfo {
  const captureRegex =
    /([a-z0-9-]+)-(.+)\.d\.codeartifact\.(.+)\.amazonaws\.com/;
  const matches = url?.match(captureRegex) ?? [];
  const [_, domain, account, region] = matches;
  return { domain, account, region };
}

/**
 * Publishing options for GitHub releases.
 */
export interface GitHubReleasesPublishOptions
  extends VersionArtifactOptions,
    CommonPublishOptions {}

/**
 * Publishing options for Git releases
 */
export interface GitPublishOptions extends VersionArtifactOptions {
  /**
   * The location of an .md file that includes the project-level changelog.
   */
  readonly projectChangelogFile?: string;

  /**
   * Branch to push to.
   *
   * @default "main"
   */
  readonly gitBranch?: string;

  /**
   * Override git-push command.
   *
   * Set to an empty string to disable pushing.
   */
  readonly gitPushCommand?: string;
}

type PublishJobFactory = (
  branch: string,
  branchOptions: Partial<BranchOptions>
) => Record<string, Job>;
