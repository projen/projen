import { Filter } from "./model";

/**
 * constant to create a filter to make a job or workflow only run on master
 */
export const FilterMainBranchOnly: Filter = {
  branches: { only: ["master", "main"] },
};
