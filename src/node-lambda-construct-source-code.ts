import * as path from 'path';
import { pascalCase } from 'pascal-case';
import { FileBase } from './file';
import { Project } from './project';
import { SourceCode } from './source-code';

/**
 * Generates source code for a node lambda construct
 *
 * @private
 */
export class NodeLambdaConstructSourceCode extends SourceCode {

  /**
   * Creates source code for a node lambda handler at the constructFilePath, referencing an existing lambda handler
   *
   * @param project The project
   * @param constructFilePath File path to output construct
   * @param handlerDirPath File path for existing lambda handler directory
   */
  constructor(project: Project, constructFilePath: string, handlerDirPath: string) {
    super(project, constructFilePath);

    const lambdaName = path.parse(constructFilePath).name;
    const constructName = pascalCase(lambdaName).split('-').join('');
    const propsName = `${constructName}Props`;

    super.line(`// ${FileBase.PROJEN_MARKER}`);
    super.line('import * as path from \'path\';');
    super.line('import * as lambda from \'@aws-cdk/aws-lambda\';');
    super.line('import { Construct } from \'constructs\';');
    super.line();
    super.open(`export interface ${propsName} extends lambda.FunctionOptions {`);
    super.close('}');
    super.line();
    super.open(`export class ${constructName} extends lambda.Function {`);
    super.open(`constructor(scope: Construct, id: string, props: ${propsName} = {}) {`);
    super.open('super(scope, id, {');
    super.line('runtime: lambda.Runtime.NODEJS_14_X,');
    super.line('handler: \'index.handler\',');
    super.line(`code: lambda.Code.fromAsset(path.join(__dirname, '/${handlerDirPath}')),`);
    super.line('...props,');
    super.close('});');
    super.close('}');
    super.close('}');
  }
}