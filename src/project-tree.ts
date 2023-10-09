import { IConstruct } from "constructs";
import { Component } from "./component";
import { JsonFile } from "./json";
import { Project } from "./project";

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
        construct.node.metadata.map(({ type, data }) => [type, data])
      ),
      nodes: construct.node.children.length
        ? construct.node.children.reduce(
            (nodes, c) => ({
              ...nodes,
              ...renderConstruct(c),
            }),
            {}
          )
        : undefined,
    },
  };
}
