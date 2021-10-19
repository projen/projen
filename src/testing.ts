import { synthSnapshot } from './_test-utils';
import { Project } from "./project";

export class Testing {
  public static synth(project: Project): Record<string, any> {
    return synthSnapshot(project);
  }

  private constructor() {} // utility
}