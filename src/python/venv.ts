import { Component } from '../component';
import { Project } from '../project';
import { IPythonEnv } from './python-env';

export interface VenvOptions {}

export class Venv extends Component implements IPythonEnv {
  constructor(project: Project, _options: VenvOptions) {
    super(project);
  }
}