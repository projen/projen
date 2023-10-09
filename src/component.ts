import { Construct, IConstruct } from "constructs";
import { Project } from "./project";
import {
  COMPONENT_SYMBOL,
  isComponent,
  findClosestProject,
} from "./util/constructs";

let currentId = 0;
const componentId = () => {
  return `AutoId${++currentId}`;
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
    super(scope, id || `${new.target.name}#${componentId()}`);
    Object.defineProperty(this, COMPONENT_SYMBOL, { value: true });
    this.node.addMetadata("type", "component");
    this.node.addMetadata("construct", new.target.name);

    this.project = findClosestProject(scope);
    this.project._addComponent(this);
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
