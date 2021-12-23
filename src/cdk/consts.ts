import * as semver from 'semver';
import { Tools } from '../github/workflows-model';

export type JsiiPacmakTarget = 'js' | 'go' | 'java' | 'python' | 'dotnet';

/**
 * GitHub workflow job steps for setting up the tools required for various JSII targets.
 */
export const JSII_TOOLCHAIN: Record<JsiiPacmakTarget, Tools> = {
  js: {},
  java: { java: { version: '11.x' } },
  python: { python: { version: '3.x' } },
  go: { go: { version: '^1.16.0' } },
  dotnet: { dotnet: { version: '3.x' } },
};

const SUPERCHAIN_IMAGE = 'jsii/superchain:1-buster-slim';
const SUPERCHAIN_NODE_VERSIONS = [12, 14, 16]; // supported jsii/superchain image tags: `1-buster-slim-nodeNN`

/**
 * Determines the jsii/superchain image to use based on the minimum node
 * version.
 *
 * @param minNodeVersion The minimum node version of the project. If not
 * specified, v14.17.4 is used.
 */
export function determineSuperchainImage(minNodeVersion?: string): string {
  // the default image (`jsii/superchain:1-buster-slim`) will include the
  // minimum supported node version of JSII (as of this writing it is 12.x).
  if (!minNodeVersion) {
    return SUPERCHAIN_IMAGE;
  }

  const major = semver.major(minNodeVersion);

  if (!SUPERCHAIN_NODE_VERSIONS.includes(major)) {
    throw new Error(`No jsii/superchain image available for node ${major}.x. Supported node versions: ${SUPERCHAIN_NODE_VERSIONS.map(m => `${m}.x`).join(',')}`);
  }

  return `${SUPERCHAIN_IMAGE}-node${major}`;
}