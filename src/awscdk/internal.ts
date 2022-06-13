import { sep, posix } from "path";

/**
 * Feature flags as of v1.130.0
 */
export const FEATURE_FLAGS = [
  "aws-cdk:enableDiffNoFail",
  "@aws-cdk/aws-apigateway:usagePlanKeyOrderInsensitiveId",
  "@aws-cdk/core:enableStackNameDuplicates",
  "@aws-cdk/core:stackRelativeExports",
  "@aws-cdk/aws-ecr-assets:dockerIgnoreSupport",
  "@aws-cdk/aws-secretsmanager:parseOwnedSecretName",
  "@aws-cdk/aws-kms:defaultKeyPolicies",
  "@aws-cdk/aws-s3:grantWriteWithoutAcl",
  "@aws-cdk/aws-ecs-patterns:removeDefaultDesiredCount",
  "@aws-cdk/aws-rds:lowercaseDbIdentifier",
  "@aws-cdk/aws-efs:defaultEncryptionAtRest",
  "@aws-cdk/aws-lambda:recognizeVersionProps",
  "@aws-cdk/aws-cloudfront:defaultSecurityPolicyTLSv1.2_2021",
];

/**
 * Suffix for AWS Lambda handlers.
 */
export const TYPESCRIPT_LAMBDA_EXT = ".lambda.ts";

/**
 * Suffix for AWS Edge Lambda handlers.
 */
export const TYPESCRIPT_EDGE_LAMBDA_EXT = ".edge-lambda.ts";

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
