import { createHash } from "crypto";
import { posix, sep } from "path";
import { default as CDK_V2_RECOMMENDED_FLAGS } from "./private/feature-flags-v2.const";

/**
 * Feature flags as of v1.130.0
 */
export const FEATURE_FLAGS_V1 = {
  "aws-cdk:enableDiffNoFail": true,
  "@aws-cdk/aws-apigateway:usagePlanKeyOrderInsensitiveId": true,
  "@aws-cdk/core:enableStackNameDuplicates": true,
  "@aws-cdk/core:stackRelativeExports": true,
  "@aws-cdk/aws-ecr-assets:dockerIgnoreSupport": true,
  "@aws-cdk/aws-secretsmanager:parseOwnedSecretName": true,
  "@aws-cdk/aws-kms:defaultKeyPolicies": true,
  "@aws-cdk/aws-s3:grantWriteWithoutAcl": true,
  "@aws-cdk/aws-ecs-patterns:removeDefaultDesiredCount": true,
  "@aws-cdk/aws-rds:lowercaseDbIdentifier": true,
  "@aws-cdk/aws-efs:defaultEncryptionAtRest": true,
  "@aws-cdk/aws-lambda:recognizeVersionProps": true,
  "@aws-cdk/aws-cloudfront:defaultSecurityPolicyTLSv1.2_2021": true,
};

/**
 * Feature flags for V2
 */
export const FEATURE_FLAGS_V2 = CDK_V2_RECOMMENDED_FLAGS;

/**
 * Suffix for AWS Lambda handlers.
 */
export const TYPESCRIPT_LAMBDA_EXT = ".lambda.ts";

/**
 * Suffix for AWS Edge Lambda handlers.
 */
export const TYPESCRIPT_EDGE_LAMBDA_EXT = ".edge-lambda.ts";

/**
 * Suffix for AWS singleton Lambda handlers.
 */
export const TYPESCRIPT_SINGLETON_LAMBDA_EXT = ".singleton-lambda.ts";

/**
 * Suffix for AWS Lambda Extensions.
 */
export const TYPESCRIPT_LAMBDA_EXTENSION_EXT = ".lambda-extension.ts";

/**
 * Converts the given path string to posix if it wasn't already.
 */
export function convertToPosixPath(p: string) {
  return p.split(sep).join(posix.sep);
}

/**
 * Creates a deterministic UUID from project name and lambda entrypoint.
 */
export function toDeterministicSingletonUuid(
  projectName: string,
  entrypoint: string,
): string {
  const input = `${projectName}:${entrypoint}`;
  const hash = createHash("sha256").update(input).digest("hex").slice(0, 32);
  const chars = hash.split("");

  // UUID version field (RFC 9562, section 4.2) set to version 5.
  chars[12] = "5";

  // UUID variant field (RFC 9562, section 4.1) must be 10xx, so nibble 16
  // must be one of 8, 9, a, b.
  const variantNibble = parseInt(chars[16], 16);
  chars[16] = ["8", "9", "a", "b"][variantNibble % 4];

  const normalized = chars.join("");
  return `${normalized.slice(0, 8)}-${normalized.slice(8, 12)}-${normalized.slice(12, 16)}-${normalized.slice(16, 20)}-${normalized.slice(20, 32)}`;
}
