export interface GitHubAction {
  readonly name: string;
  readonly majorVersion?: string;
  readonly minorVersion?: string;
  readonly sha?: string;
}

/**
 * Ways to represent versions in the `uses` key for a step
 */
export enum VersionRepresentation {
  /** Specify only the major version */
  MAJOR_VERSION = "MAJOR_VERSION",
  /** Specify the full version number */
  MINOR_VERSION = "MINOR_VERSION",
  /** Specify the commit hash */
  SHA = "SHA",
  /**
   * Automatically determine the best format for the version string.
   *
   * For trusted publishers, this will use the major version (if present). For all
   * other situations, it prefers the SHA, then minor version, then major version.
   */
  AUTO = "AUTO",
}

/**
 * The filter to use for finding a pre-known GitHub Action.
 *
 * This allows for filtering to a specific major or minor version. The filters are
 * applied as an AND operation; all fields must match in order for an Action to
 * be a match.
 */
export interface GitHubActionFilter {
  /**
   * The fully-qualified name of the action, including the publisher and repository.
   *
   * @example actions/checkout
   */
  readonly name: string;

  /**
   * The "major version" tag.
   *
   * Many Actions have a "moving" tag tied to the major version of the project.
   * This allows adopting new non-breaking features; however, the version is less
   * static.
   */
  readonly majorVersion?: string;

  /**
   * The "minor version" tag.
   */
  readonly minorVersion?: string;
}

/**
 * Options for rendering the version string for a GitHub Action.
 *
 * @default use a specific SHA for all Actions
 */
export interface GitHubActionVersionResolutionOptions {
  /**
   * The format that should be used.
   *
   * This allows choosing whether the major, minor, or SHA should be forced
   * for all actions.
   *
   * @default - Use the major version for trusted publishers and SHA for all others
   */
  readonly format?: VersionRepresentation;

  /**
   * Actions with a publisher in this list will use the major version instead of a
   * SHA when `format` is set to `AUTO`.
   *
   * @default - no publishers are trusted
   */
  readonly trustedPublishers?: string[];
}

export function toUsesString(
  action: GitHubAction | string | undefined,
  options?: GitHubActionVersionResolutionOptions
) {
  if (!action) {
    return undefined;
  }
  if (typeof action === "string") {
    return action;
  }
  const chosenFieldUndefined = (field: string) =>
    `${field} must be specified for "${action.name}" when using the ${options?.format} representation`;
  const major = `${action.name}@${action.majorVersion}`;
  const minor = `${action.name}@${action.minorVersion}`;
  const sha = `${action.name}@${action.sha}`;
  switch (options?.format) {
    case VersionRepresentation.MAJOR_VERSION:
      if (!action.majorVersion) {
        throw new Error(chosenFieldUndefined("majorVersion"));
      }
      return major;
    case VersionRepresentation.MINOR_VERSION:
      if (!action.minorVersion) {
        throw new Error(chosenFieldUndefined("minorVersion"));
      }
      return minor;
    case VersionRepresentation.SHA:
      if (!action.sha) {
        throw new Error(chosenFieldUndefined("sha"));
      }
      return sha;
  }

  const allFieldsUndefined = `One of majorVersion, minorVersion, or sha must be specified for ${action.name} when using the AUTO representation`;
  const publisher = action.name.split("/")[0];
  if (options?.trustedPublishers?.includes(publisher)) {
    if (action.majorVersion) {
      return major;
    } else if (action.minorVersion) {
      return minor;
    } else if (action.sha) {
      return sha;
    } else {
      throw new Error(allFieldsUndefined);
    }
  }

  if (action.sha) {
    return sha;
  } else if (action.minorVersion) {
    return minor;
  } else if (action.majorVersion) {
    return major;
  } else {
    throw new Error(allFieldsUndefined);
  }
}

const PREDEFINED: GitHubAction[] = [
  {
    name: "actions/checkout",
    majorVersion: "v3",
    minorVersion: "v3.3.0",
    sha: "ac593985615ec2ede58e132d2e21d2b1cbd6127c",
  },
  {
    name: "actions/stale",
    majorVersion: "v7",
    minorVersion: "v7.0.0",
    sha: "6f05e4244c9a0b2ed3401882b05d701dd0a7289b",
  },
  {
    name: "actions/upload-artifact",
    majorVersion: "v3",
    minorVersion: "v3.1.2",
    sha: "0b7f8abb1508181956e8e162db84b466c27e18ce",
  },
  {
    name: "actions/download-artifact",
    majorVersion: "v3",
    minorVersion: "v3.0.2",
    sha: "9bc31d5ccc31df68ecc42ccf4149144866c47d8a",
  },
  {
    name: "actions/setup-node",
    majorVersion: "v3",
    minorVersion: "v3.6.0",
    sha: "64ed1c7eab4cce3362f8c340dee64e5eaeef8f7c",
  },
  {
    name: "actions/setup-java",
    majorVersion: "v3",
    minorVersion: "v3.9.0",
    sha: "1df8dbefe2a8cbc99770194893dd902763bee34b",
  },
  {
    name: "actions/setup-python",
    majorVersion: "v4",
    minorVersion: "v4.5.0",
    sha: "d27e3f3d7c64b4bbf8e4abfb9b63b83e846e0435",
  },
  {
    name: "actions/setup-go",
    majorVersion: "v3",
    minorVersion: "v3.5.0",
    sha: "6edd4406fa81c3da01a34fa6f6343087c207a568",
  },
  {
    name: "actions/setup-dotnet",
    majorVersion: "v3",
    minorVersion: "v3.0.3",
    sha: "607fce577a46308457984d59e4954e075820f10a",
  },
  {
    name: "tibdex/github-app-token",
    majorVersion: "v1",
    minorVersion: "v1.7.0",
    sha: "021a2405c7f990db57f5eae5397423dcc554159c",
  },
  {
    name: "aws-actions/configure-aws-credentials",
    majorVersion: "v1",
    minorVersion: "v1.7.0",
    sha: "67fbcbb121271f7775d2e7715933280b06314838",
  },
  {
    name: "docker/build-push-action",
    majorVersion: "v3",
    minorVersion: "v3.3.0",
    sha: "37abcedcc1da61a57767b7588cb9d03eb57e28b3",
  },
  {
    name: "imjohnbo/issue-bot",
    majorVersion: "v3",
    minorVersion: "v3.4.2",
    sha: "76645b39cda009302cc49d8624af634795e9eab5",
  },
  {
    name: "peter-evans/create-pull-request",
    majorVersion: "v4",
    minorVersion: "v4.2.3",
    sha: "2b011faafdcbc9ceb11414d64d0573f37c774b04",
  },
  {
    name: "pnpm/action-setup",
    majorVersion: "v2",
    minorVersion: "v2.2.4",
    sha: "c3b53f6a16e57305370b4ae5a540c2077a1d50dd",
  },
  {
    name: "codecov/codecov-action",
    majorVersion: "v3",
    minorVersion: "v3.1.1",
    sha: "d9f34f8cd5cb3b3eb79b3e4b5dae3a16df499a70",
  },
  {
    name: "hmarr/auto-approve-action",
    majorVersion: "v3",
    minorVersion: "v3.1.0",
    sha: "de8ae18c173c131e182d4adf2c874d8d2308a85b",
  },
  {
    name: "amannn/action-semantic-pull-request",
    majorVersion: "v5",
    minorVersion: "v5.0.2",
    sha: "01d5fd8a8ebb9aafe902c40c53f0f4744f7381eb",
  },
];

export function findActionBy(
  filter: GitHubActionFilter
): GitHubAction | undefined {
  return PREDEFINED.find(
    (action) =>
      action.name === filter.name &&
      (!filter.majorVersion || filter.majorVersion === action.majorVersion) &&
      (!filter.minorVersion || filter.minorVersion === action.minorVersion)
  );
}
