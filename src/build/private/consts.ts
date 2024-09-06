export const PULL_REQUEST_REF = "${{ github.event.pull_request.head.ref }}";
export const PULL_REQUEST_REPOSITORY =
  "${{ github.event.pull_request.head.repo.full_name }}";
export const BUILD_JOBID = "build";
export const SELF_MUTATION_STEP = "self_mutation";
export const SELF_MUTATION_HAPPENED_OUTPUT = "self_mutation_happened";
export const IS_FORK =
  "github.event.pull_request.head.repo.full_name != github.repository";
export const NOT_FORK = `!(${IS_FORK})`;
export const SELF_MUTATION_CONDITION = `needs.${BUILD_JOBID}.outputs.${SELF_MUTATION_HAPPENED_OUTPUT}`;
export const DEFAULT_ARTIFACTS_DIRECTORY = "dist";
