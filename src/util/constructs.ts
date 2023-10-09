import type { IConstruct } from "constructs";
import type { Component } from "../component";
import type { Project } from "../project";

export const PROJECT_SYMBOL = Symbol.for("projen.Project");
export const COMPONENT_SYMBOL = Symbol.for("projen.Component");

/**
 * Create a function to find the closest construct matching a predicate
 * @param predicate
 * @returns A function to find the closest construct matching the predicate
 */
export function tryFindClosest<T extends IConstruct>(
  predicate: (x: any) => x is T
): (construct?: IConstruct) => T | undefined {
  return (construct?: IConstruct) =>
    construct?.node.scopes.reverse().find(predicate);
}

/**
 * Create a function to find the closest construct matching a predicate
 * @param predicate
 * @returns A function to find the closest construct matching the predicate
 */
export function findClosestProject(construct: IConstruct): Project {
  if (isComponent(construct)) {
    return construct.project;
  }

  const project = tryFindClosest(isProject)(construct);
  if (!project) {
    throw new Error(
      `${new.target.name} at '${
        construct.node.path
      }' must be created in the scope of a Project, but no Project was found`
    );
  }

  return project;
}

export function isProject(x: any): x is Project {
  return x !== null && typeof x === "object" && PROJECT_SYMBOL in x;
}

export function isComponent(x: any): x is Component {
  return x !== null && typeof x === "object" && COMPONENT_SYMBOL in x;
}
