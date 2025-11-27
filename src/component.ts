import { Construct, IConstruct } from "constructs";
import { Project } from "./project";
import {
  isComponent,
  findClosestProject,
  tagAsComponent,
} from "./util/constructs";

const autoIds = new WeakMap<IConstruct, number>();
const componentId = (scope: IConstruct) => {
  const nextId = (autoIds.get(scope) ?? 0) + 1;
  autoIds.set(scope, nextId);
  return `AutoId${nextId}`;
};

/**
 * Represents a project component.
 * @param project
 * @param id Unique id of the component. If not provided, an unstable AutoId is generated.
 */
export class Component extends Construct {
  /**
   * Test whether the given construct is a component.
   */
  public static isComponent(x: any): x is Component {
    return isComponent(x);
  }

  public readonly project: Project;

  constructor(scope: IConstruct, id?: string) {
    super(scope, id || `${new.target.name}#${componentId(scope)}`);
    tagAsComponent(this);
    this.node.addMetadata("type", "component");
    this.node.addMetadata("construct", new.target.name);

    this.project = findClosestProject(scope, new.target.name);
  }

  /**
   * Called before synthesis.
   */
  public preSynthesize() {}

  /**
   * Synthesizes files to the project output directory.
   */
  public synthesize() {}

  /**
   * Called after synthesis. Order is *not* guaranteed.
   */
  public postSynthesize() {}
}
