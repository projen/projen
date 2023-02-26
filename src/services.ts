import { Project } from "./project";
import { ITaskRuntime } from "./task-runtime";

export interface ServiceConfiguration {
  readonly services?: Services;
}

export interface Services {
  readonly taskRuntime?: IServiceProducer<ITaskRuntime>;
}

export interface IServiceProducer<T> {
  produce(project: Project): T;
}

export abstract class ServiceLocator {
  public abstract readonly taskRuntime: ITaskRuntime;
}
