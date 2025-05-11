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
 * Find the closest project, searching upwards from a construct.
 *
 * @param construct the construct to start searching from
 * @param constructInCreation the name of the construct being created
 * @returns the closest project, if any
 */
export function findClosestProject(
  construct: IConstruct,
  constructInCreation: string
): Project {
  if (isComponent(construct)) {
    return construct.project;
  }

  const project = tryFindClosest(isProject)(construct);
  if (!project) {
    throw new Error(
      `${constructInCreation} at '${construct.node.path}' must be created in the scope of a Project, but no Project was found`
    );
  }

  return project;
}

/**
 * Find the closest project of a given type, searching upwards from a construct.
 *
 * This function should be used within a class constructor.
 * If not, you must provide a name as second argument or the call will fail.
 *
 * @param construct the construct to start searching from
 * @param constructInCreation the name of the construct being created
 * @returns the closest project of the expected type, if any
 */
export function closestProjectMustBe<T>(
  construct: IConstruct,
  projectType: new (...args: any[]) => T,
  constructInCreation: string
): T {
  const project = tryFindClosest(isProject)(construct);
  const error = `${constructInCreation} at '${construct.node.path}' must be created within a ${projectType.name}`;
  if (!project) {
    throw new Error(`${error}, but no Project was found`);
  }
  if (!(project instanceof projectType)) {
    throw new Error(`${error}, but found: ${project.constructor.name}`);
  }

  return project;
}

export function isProject(x: unknown): x is Project {
  return x !== null && typeof x === "object" && PROJECT_SYMBOL in x;
}

export function isComponent(x: unknown): x is Component {
  return x !== null && typeof x === "object" && COMPONENT_SYMBOL in x;
}

function tagAs(scope: IConstruct, tag: symbol) {
  Object.defineProperty(scope, tag, { value: true });
}

export function tagAsProject(scope: IConstruct) {
  tagAs(scope, PROJECT_SYMBOL);
}

export function tagAsComponent(scope: IConstruct) {
  tagAs(scope, COMPONENT_SYMBOL);
}
