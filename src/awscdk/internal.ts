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
