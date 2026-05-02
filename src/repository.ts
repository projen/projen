import { mkdtempSync, realpathSync } from "fs";
import { tmpdir } from "os";
import * as path from "path";
import type { IConstruct } from "constructs";
import { Construct } from "constructs";
import { IS_TEST_RUN } from "./common";
import type { Component } from "./component";
import type { Project } from "./project";
import {
  isRepository,
  isProject,
  isComponent,
  tagAsRepository,
  tryFindClosestRepository,
} from "./util/constructs";

/**
 * The default output directory for a repository if none is specified.
 */
const DEFAULT_OUTDIR = ".";

/**
 * Options for `Repository`.
 */
export interface RepositoryOptions {
  /**
   * The name of the repository.
   */
  readonly name: string;

  /**
   * The root directory of the repository.
   *
   * @default "."
   */
  readonly outdir?: string;
}

/**
 * Represents a repository — the root of a projen construct tree.
 *
 * A Repository sits above Projects in the construct tree, similar to how
 * `App` sits above `Stack` in the AWS CDK. Repository owns repository-level
 * concerns like git configuration and CI/CD platform integration.
 */
export class Repository extends Construct {
  /**
   * Find the closest Repository by walking up the construct tree.
   *
   * @param construct the construct to search from
   * @returns the closest Repository
   * @throws if no Repository is found in the ancestor chain
   */
  public static of(construct: IConstruct): Repository {
    const repo = tryFindClosestRepository(construct);
    if (!repo) {
      throw new Error(
        `No Repository found in the construct tree above '${construct.node.path}'`,
      );
    }
    return repo;
  }

  /**
   * Test whether the given construct is a Repository.
   */
  public static isRepository(x: any): x is Repository {
    return isRepository(x);
  }

  /**
   * Repository name.
   */
  public readonly name: string;

  /**
   * Absolute output directory of this repository.
   */
  public readonly outdir: string;

  constructor(options: RepositoryOptions) {
    super(undefined as any, "");
    tagAsRepository(this);
    this.node.addMetadata("type", "repository");
    this.node.addMetadata("construct", new.target.name);

    this.name = options.name;
    this.outdir = determineOutdir(options.outdir);
  }

  /**
   * All projects within this repository.
   */
  public get projects(): Project[] {
    return this.node.findAll().filter(isProject) as Project[];
  }

  /**
   * All components directly owned by this repository (not within a project).
   */
  public get components(): Component[] {
    return this.node
      .findAll()
      .filter(
        (c): c is Component => isComponent(c) && !isProject(findOwner(c, this)),
      );
  }

  /**
   * Synthesize the repository and all its projects.
   *
   * Stub — full orchestration will be implemented in T6.
   */
  public synth(): void {
    this.preSynthesize();
    for (const project of this.projects) {
      project.synth();
    }
    this.postSynthesize();
  }

  /**
   * Called before all projects are synthesized.
   */
  public preSynthesize(): void {}

  /**
   * Called after all projects are synthesized.
   */
  public postSynthesize(): void {}
}

/**
 * Resolves the repository's output directory.
 */
function determineOutdir(outdirOption?: string): string {
  // if this is running inside a test and outdir is not explicitly set
  // use a temp directory (unless cwd is already under tmp)
  if (IS_TEST_RUN && !outdirOption) {
    const realCwd = realpathSync(process.cwd());
    const realTmp = realpathSync(tmpdir());

    if (realCwd.startsWith(realTmp)) {
      return path.resolve(realCwd, outdirOption ?? DEFAULT_OUTDIR);
    }

    return mkdtempSync(path.join(tmpdir(), "projen."));
  }

  return path.resolve(outdirOption ?? DEFAULT_OUTDIR);
}

/**
 * Walk up from a construct to find its owning Project or Repository.
 */
function findOwner(construct: IConstruct, root: IConstruct): IConstruct {
  let current: IConstruct | undefined = construct;
  while (current && current !== root) {
    if (isProject(current)) {
      return current;
    }
    current = current.node.scope;
  }
  return root;
}
