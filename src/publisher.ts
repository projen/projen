import { Component } from './component';
import { GithubWorkflow } from './github';
import { Project } from './project';

const JSII_RELEASE_VERSION = 'latest';

/**
 * Options for `Publisher`.
 */
export interface PublisherOptions {
  /**
   * The github workflow to add release jobs to.
   */
  readonly workflow: GithubWorkflow;

  /**
   * The job ID that produces the build artifacts. All publish jobs will take a dependency on this job.
   */
  readonly buildJobId: string;

  /**
   * The name of the artifact to download (e.g. `dist`).
   *
   * The artifact is expected to include a subdirectory for each release target:
   * `go` (GitHub), `dotnet` (NuGet), `java` (Maven), `js` (npm), `python`
   * (PyPI).
   *
   * @see https://github.com/aws/jsii-release
   */
  readonly artifactName: string;

  /**
   * Version requirement for `jsii-release`.
   *
   * @default "latest"
   */
  readonly jsiiReleaseVersion?: string;
}

/**
 * Implements GitHub jobs for publishing modules to package managers.
 *kw
 * Under the hood, it uses https://github.com/aws/jsii-release
 */
export class Publisher extends Component {
  public readonly workflow: GithubWorkflow;
  public readonly buildJobId: string;
  public readonly artifactName: string;
  public readonly jsiiReleaseVersion: string;

  constructor(project: Project, options: PublisherOptions) {
    super(project);

    this.workflow = options.workflow;
    this.buildJobId = options.buildJobId;
    this.artifactName = options.artifactName;
    this.jsiiReleaseVersion = options.jsiiReleaseVersion ?? JSII_RELEASE_VERSION;
  }

  /**
   * Publishes artifacts from `js/**` to npm.
   * @param options Options
   */
  public publishToNpm(options: JsiiReleaseNpm) {
    const npmTokenSecret = options.npmTokenSecret ?? 'NPM_TOKEN';
    this.workflow.addJobs({
      release_npm: {
        'name': 'Release to NPM',
        'needs': this.buildJobId,
        'runs-on': 'ubuntu-latest',
        'container': {
          image: 'jsii/superchain',
        },
        'steps': [
          this.renderDownloadArtifactStep(),
          {
            name: 'Release',
            run: this.renderJsiiReleaseCommand('jsii-release-npm'),
            env: {
              NPM_TOKEN: `\${{ secrets.${npmTokenSecret} }}`,
              NPM_DIST_TAG: options.distTag,
              NPM_REGISTRY: options.registry,
            },
          },
        ],
      },
    });
  }

  /**
   * Publishes artifacts from `dotnet/**` to NuGet Gallery.
   * @param options Options
   */
  public publishToNuget(options: JsiiReleaseNuget) {
    const nugetApiKeySecret = options.nugetApiKeySecret ?? 'NUGET_API_KEY';
    this.workflow.addJobs({
      release_nuget: {
        'name': 'Release to Nuget',
        'needs': this.buildJobId,
        'runs-on': 'ubuntu-latest',
        'container': {
          image: 'jsii/superchain',
        },
        'steps': [
          this.renderDownloadArtifactStep(),
          {
            name: 'Release',
            run: this.renderJsiiReleaseCommand('jsii-release-nuget'),
            env: {
              NUGET_API_KEY: `\${{ secrets.${nugetApiKeySecret} }}`,
            },
          },
        ],
      },
    });
  }

  /**
   * Publishes artifacts from `java/**` to Maven.
   * @param options Options
   */
  public publishToMaven(options: JsiiReleaseMaven) {
    const mavenGpgPrivateKeySecret = options.mavenGpgPrivateKeySecret ?? 'MAVEN_GPG_PRIVATE_KEY';
    const mavenGpgPrivateKeyPassphrase = options.mavenGpgPrivateKeyPassphrase ?? 'MAVEN_GPG_PRIVATE_KEY_PASSPHRASE';
    const mavenUsername = options.mavenUsername ?? 'MAVEN_USERNAME';
    const mavenPassword = options.mavenPassword ?? 'MAVEN_PASSWORD';
    const mavenStagingProfileId = options.mavenStagingProfileId ?? 'MAVEN_STAGING_PROFILE_ID';

    this.workflow.addJobs({
      release_maven: {
        'name': 'Release to Maven',
        'needs': this.buildJobId,
        'runs-on': 'ubuntu-latest',
        'container': {
          image: 'jsii/superchain',
        },
        'steps': [
          this.renderDownloadArtifactStep(),
          {
            name: 'Release',
            run: this.renderJsiiReleaseCommand('jsii-release-maven'),
            env: {
              MAVEN_ENDPOINT: options.mavenEndpoint,
              MAVEN_SERVER_ID: options.mavenServerId,
              MAVEN_REPOSITORY_URL: options.mavenRepositoryUrl,
              MAVEN_GPG_PRIVATE_KEY: `\${{ secrets.${mavenGpgPrivateKeySecret} }}`,
              MAVEN_GPG_PRIVATE_KEY_PASSPHRASE: `\${{ secrets.${mavenGpgPrivateKeyPassphrase} }}`,
              MAVEN_PASSWORD: `\${{ secrets.${mavenPassword} }}`,
              MAVEN_USERNAME: `\${{ secrets.${mavenUsername} }}`,
              MAVEN_STAGING_PROFILE_ID: `\${{ secrets.${mavenStagingProfileId} }}`,
            },
          },
        ],
      },
    });
  }

  /**
   * Publishes wheel artifacts from `python` to PyPI.
   * @param options Options
   */
  public publishToPyPi(options: JsiiReleasePyPi) {
    const twineUsername = options.twineUsernameSecret ?? 'TWINE_USERNAME';
    const twinePassword = options.twinePasswordSecret ?? 'TWINE_PASSWORD';
    this.workflow.addJobs({
      release_pypi: {
        'name': 'Release to PyPi',
        'needs': this.buildJobId,
        'runs-on': 'ubuntu-latest',
        'container': {
          image: 'jsii/superchain',
        },
        'steps': [
          this.renderDownloadArtifactStep(),
          {
            name: 'Release',
            run: this.renderJsiiReleaseCommand('jsii-release-pypi'),
            env: {
              TWINE_USERNAME: `\${{ secrets.${twineUsername} }}`,
              TWINE_PASSWORD: `\${{ secrets.${twinePassword} }}`,
              ...(options.twineRegistryUrl && { TWINE_REPOSITORY_URL: options.twineRegistryUrl }),
            },
          },
        ],
      },
    });
  }

  /**
   * Adds a go publishing job.
   * @param options Options
   */
  public publishToGo(options: JsiiReleaseGo) {
    const githubTokenSecret = options.githubTokenSecret ?? 'GO_GITHUB_TOKEN';
    this.workflow.addJobs({
      release_golang: {
        'name': 'Release to Go',
        'needs': this.buildJobId,
        'runs-on': 'ubuntu-latest',
        'container': {
          image: 'jsii/superchain',
        },
        'steps': [
          this.renderDownloadArtifactStep(),
          {
            name: 'Release',
            run: this.renderJsiiReleaseCommand('jsii-release-golang'),
            env: {
              GITHUB_REPO: options.githubRepo,
              GITHUB_TOKEN: `\${{ secrets.${githubTokenSecret} }}`,
              GIT_BRANCH: options.gitBranch,
              GIT_USER_NAME: options.gitUserName ?? 'GitHub Actions',
              GIT_USER_EMAIL: options.gitUserEmail ?? 'github-actions@github.com',
              GIT_COMMIT_MESSAGE: options.gitCommitMessage,
            },
          },
        ],
      },
    });
  }

  private renderJsiiReleaseCommand(subcommand: string) {
    return `npx -p jsii-release@${this.jsiiReleaseVersion} ${subcommand}`;
  }

  private renderDownloadArtifactStep() {
    return {
      name: 'Download build artifacts',
      uses: 'actions/download-artifact@v2',
      with: {
        name: this.artifactName,
        path: 'dist', // this is where jsii-release expects the output to do
      },
    };
  }
}

/**
 * Options for npm release
 */
export interface JsiiReleaseNpm {
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
   */
  readonly distTag?: string;

  /**
   * The domain name of the npm package registry.
   *
   * @default "registry.npmjs.org"
   */
  readonly registry?: string;

  /**
   * GitHub secret which contains the NPM token to use when publishing packages.
   * @default "NPM_TOKEN"
   */
  readonly npmTokenSecret?: string;
}

/**
 * Options for PyPI release
 */
export interface JsiiReleasePyPi {
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
}

/**
 * Options for NuGet releases
 */
export interface JsiiReleaseNuget {
  /**
   * GitHub secret which contains the API key for NuGet.
   *
   * @default "NUGET_API_KEY"
   */
  readonly nugetApiKeySecret?: string;
}

/**
 * Options for Maven releases
 */
export interface JsiiReleaseMaven {
  /**
   * URL of Nexus repository. if not set, defaults to https://oss.sonatype.org
   *
   * @default "https://oss.sonatype.org"
   */
  readonly mavenEndpoint?: string;

  /**
   * Used in maven settings for credential lookup (e.g. use github when publishing to GitHub).
   *
   * @default "ossrh" Defaults to Maven Central.
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
   * @see https://github.com/aws/jsii-release#maven
   * @default "MAVEN_GPG_PRIVATE_KEY"
   */
  readonly mavenGpgPrivateKeySecret?: string;

  /**
   * GitHub secret name which contains the GPG private key or file that includes
   * it. This is used to sign your Maven packages. See instructions.
   *
   * @see https://github.com/aws/jsii-release#maven
   * @default "MAVEN_GPG_PRIVATE_KEY_PASSPHRASE"
   */
  readonly mavenGpgPrivateKeyPassphrase?: string;

  /**
   * GitHub secret name which contains the Username for maven repository.
   *
   * For Maven Central, you will need to Create JIRA account and then request a
   * new project (see links).
   *
   * @see https://issues.sonatype.org/secure/Signup
   * @see
   * https://issues.sonatype.org/secure/CreateIssue.jspa?issuetype=21&pid=10134
   *
   * @default "MAVEN_USERNAME"
   */
  readonly mavenUsername?: string;

  /**
   * GitHub secret name which contains the Password for maven repository.
   *
   * For Maven Central, you will need to Create JIRA account and then request a
   * new project (see links).
   *
   * @see https://issues.sonatype.org/secure/Signup
   * @see
   * https://issues.sonatype.org/secure/CreateIssue.jspa?issuetype=21&pid=10134
   *
   * @default "MAVEN_PASSWORD"
   */
  readonly mavenPassword?: string;

  /**
   * GitHub secret name which contains the Maven Central (sonatype) staging
   * profile ID (e.g. 68a05363083174). Staging profile ID can be found in the
   * URL of the "Releases" staging profile under "Staging Profiles" in
   * https://oss.sonatype.org (e.g.
   * https://oss.sonatype.org/#stagingProfiles;11a33451234521

   * @default "MAVEN_STAGING_PROFILE_ID"
   */
  readonly mavenStagingProfileId?: string;
}

/**
 * Options for Go releases.
 */
export interface JsiiReleaseGo {
  /**
   * The name of the secret that includes a personal GitHub access token used to
   * push to the GitHub repository.
   *
   * @default "GO_GITHUB_TOKEN"
   */
  readonly githubTokenSecret?: string;

  /**
   * GitHub repository to push to.
   *
   * @default - derived from `moduleName`
   */
  readonly githubRepo?: string;

  /**
   * Branch to push to.
   *
   * @default "main"
   */
  readonly gitBranch?: string;

  /**
   * The user name to use for the release git commit.
   * @default "GitHub Actions"
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
