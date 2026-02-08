import * as Case from "case";
import { JobStep, AppPermissions } from "./workflows-model";

/**
 * Options for `GithubCredentials.fromPersonalAccessToken`
 */
export interface GithubCredentialsPersonalAccessTokenOptions {
  /**
   * The name of the secret that holds the GitHub personal access token.
   *
   * @default "PROJEN_GITHUB_TOKEN"
   */
  readonly secret?: string;

  /**
   * The GitHub Actions environment the secrets is added to.
   *
   * This can be used to add explicit approval steps to access the secret.
   *
   * @default - no environment used
   */
  readonly environment?: string;
}

/**
 * Options for `GithubCredentials.fromApp`
 */
export interface GithubCredentialsAppOptions {
  /**
   * The secret containing the GitHub App ID
   *
   * @default "PROJEN_APP_ID"
   */
  readonly appIdSecret?: string;

  /**
   * The secret containing the GitHub App private key
   *
   * Escaped newlines (\\n) will be automatically replaced with actual newlines.
   *
   * @default "PROJEN_APP_PRIVATE_KEY"
   */
  readonly privateKeySecret?: string;

  /**
   * The owner of the GitHub App installation
   *
   * @default - if empty, defaults to the current repository owner
   */
  readonly owner?: string;

  /**
   * List of repositories to grant access to
   *
   * @default - if owner is set and repositories is empty, access will be scoped to all repositories in the provided repository owner's installation.
   * If owner and repositories are empty, access will be scoped to only the current repository.
   */
  readonly repositories?: string[];

  /**
   * The permissions granted to the token.
   *
   * @default - all permissions granted to the app
   */
  readonly permissions?: AppPermissions;

  /**
   * The GitHub Actions environment the secrets are added to.
   *
   * This can be used to add explicit approval steps to access the secrets.
   *
   * @default - no environment used
   */
  readonly environment?: string;
}

/**
 * Represents a method of providing GitHub API access for projen workflows.
 */
export class GithubCredentials {
  /**
   * Provide API access through a GitHub personal access token.
   *
   * The token must be added as a secret to the GitHub repo, and the name of the
   * secret can be specified here.
   *
   * @see https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
   * @default - a secret named "PROJEN_GITHUB_TOKEN"
   */
  public static fromPersonalAccessToken(
    options: GithubCredentialsPersonalAccessTokenOptions = {},
  ) {
    return new GithubCredentials({
      setupSteps: [],
      tokenRef: `\${{ secrets.${options.secret ?? "PROJEN_GITHUB_TOKEN"} }}`,
      environment: options.environment,
    });
  }

  /**
   * Provide API access through a GitHub App.
   *
   * The GitHub App must be installed on the GitHub repo, its App ID and a
   * private key must be added as secrets to the repo. The name of the secrets
   * can be specified here.
   *
   * @see https://docs.github.com/en/developers/apps/building-github-apps/creating-a-github-app
   * @see https://projen.io/docs/integrations/github/#github-app
   * @default - app id stored in "PROJEN_APP_ID" and private key stored in "PROJEN_APP_PRIVATE_KEY" with all permissions attached to the app
   */
  public static fromApp(options: GithubCredentialsAppOptions = {}) {
    const appIdSecret = options.appIdSecret ?? "PROJEN_APP_ID";
    const privateKeySecret =
      options.privateKeySecret ?? "PROJEN_APP_PRIVATE_KEY";

    const actionConfig: Record<string, string> = {
      "app-id": `\${{ secrets.${appIdSecret} }}`,
      "private-key": `\${{ secrets.${privateKeySecret} }}`,
    };

    if (options.owner) {
      actionConfig.owner = options.owner;
    }
    if (options.repositories) {
      actionConfig.repositories = options.repositories.join(",");
    }

    const permissions = Object.entries(options.permissions ?? {}).reduce<
      Record<string, string>
    >((map, [name, val]) => {
      map[`permission-${Case.kebab(name)}`] = val;
      return map;
    }, {});

    return new GithubCredentials({
      setupSteps: [
        {
          name: "Generate token",
          id: "generate_token",
          uses: "actions/create-github-app-token@3ff1caaa28b64c9cc276ce0a02e2ff584f3900c5",
          with: {
            ...actionConfig,
            ...permissions,
          },
        },
      ],
      tokenRef: "${{ steps.generate_token.outputs.token }}",
      environment: options.environment,
    });
  }

  private constructor(private readonly options: GithubCredentialsOptions) {}

  /**
   * Setup steps to obtain GitHub credentials.
   */
  public get setupSteps(): JobStep[] {
    return [...this.options.setupSteps];
  }

  /**
   * The value to use in a workflow when a GitHub token is expected. This
   * typically looks like "${{ some.path.to.a.value }}".
   */
  public get tokenRef(): string {
    return this.options.tokenRef;
  }

  /**
   * The GitHub Actions environment the credentials have been added to.
   */
  public get environment(): string | undefined {
    return this.options.environment;
  }
}

interface GithubCredentialsOptions {
  readonly setupSteps: JobStep[];
  readonly tokenRef: string;
  readonly environment?: string;
}
