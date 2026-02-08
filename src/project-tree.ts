import { IConstruct } from "constructs";
import { Component } from "./component";
import { JsonFile } from "./json";
import { Project } from "./project";

/**
 * Generates a `.projen/tree.json` file that provides a snapshot of your
 * project's component hierarchy. This file includes metadata about each
 * component such as file paths, types, and the projen version used.
 *
 * The tree file is helpful for:
 * - Understanding how your project is structured
 * - Debugging component relationships
 * - Verifying which versions synthesized the project
 *
 * @stability experimental
 */
export class ProjectTree extends Component {
  public file: JsonFile;

  public constructor(project: Project) {
    super(project, new.target.name);

    this.file = new JsonFile(project, ".projen/tree.json", {
      readonly: true,
      marker: false,
      obj: () => ({
        ["//"]:
          "Experimental. Expect frequent changes to the structure of this file.",
        ...renderConstruct(project),
      }),
    });
  }
}

type ConstructTree = Record<string, ConstructLeaf>;

interface ConstructLeaf {
  metadata: any;
  nodes?: ConstructTree;
}

function renderConstruct(construct: IConstruct): ConstructTree {
  return {
    [construct.node.id]: {
      metadata: Object.fromEntries(
        construct.node.metadata.map(({ type, data }) => [type, data]),
      ),
      nodes: construct.node.children.length
        ? construct.node.children.reduce(
            (nodes, c) => ({
              ...nodes,
              ...renderConstruct(c),
            }),
            {},
          )
        : undefined,
    },
  };
}
