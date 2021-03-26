import { LogLevel } from '../../logger';
import { PythonProject, PythonProjectOptions } from '../../python';
import { mkdtemp } from '../util';

export class TestPythonProject extends PythonProject {
  constructor(options: Partial<PythonProjectOptions> = {}) {
    super({
      ...options,
      clobber: false,
      name: 'test-python-project',
      moduleName: 'test_python_project',
      authorName: 'First Last',
      authorEmail: 'email@example.com',
      version: '0.1.0',
      outdir: mkdtemp(),
      logging: { level: LogLevel.OFF },
      jsiiFqn: 'projen.python.PythonProject',
    });
  }
}
