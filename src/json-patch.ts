import { Component } from "./component";
import { Project } from "./project";

export class JsonPatch extends Component {
  constructor(project: Project) {
    super(project);
  }

  public preSynthesize(): void {}
}
