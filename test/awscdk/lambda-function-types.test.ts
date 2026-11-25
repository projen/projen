import { DependencyType, TextFile } from "../../src";
import type { LambdaFunctionCommonOptions } from "../../src/awscdk";
import { LambdaFunction, LambdaRuntime } from "../../src/awscdk";
import { AwsCdkDepsJs } from "../../src/awscdk/awscdk-deps-js";
import { NodePackageManager } from "../../src/javascript";
import { Testing } from "../../src/testing";
import { TypeScriptProject } from "../../src/typescript";
import { execProjenCLI } from "../util";

// installs aws-cdk-lib from the npm registry
jest.setTimeout(1000 * 60 * 5); // 5min

const cases: Array<{
  name: string;
  options: LambdaFunctionCommonOptions;
}> = [
  { name: "caller UUID, default runtime", options: { singleton: true } },
  {
    name: "fixed UUID, default runtime",
    options: { singleton: true, singletonUuid: "fixed-uuid" },
  },
  ...[LambdaRuntime.NODEJS_22_X, LambdaRuntime.NODEJS_REGIONAL_LATEST].flatMap(
    (runtime) => [
      {
        name: `caller UUID, explicit ${runtime.functionRuntime}`,
        options: { singleton: true, runtime },
      },
      {
        name: `fixed UUID, explicit ${runtime.functionRuntime}`,
        options: { singleton: true, singletonUuid: "fixed-uuid", runtime },
      },
    ],
  ),
  { name: "edge function, default runtime", options: { edgeLambda: true } },
  ...[LambdaRuntime.NODEJS_22_X, LambdaRuntime.NODEJS_REGIONAL_LATEST].map(
    (runtime) => ({
      name: `edge function, explicit ${runtime.functionRuntime}`,
      options: { edgeLambda: true, runtime },
    }),
  ),
  { name: "ordinary function", options: {} },
];

function newProject() {
  const project = new TypeScriptProject({
    name: "hello",
    defaultReleaseBranch: "main",
    packageManager: NodePackageManager.NPM,
  });
  const cdkDeps = new AwsCdkDepsJs(project, {
    cdkVersion: "2.275.0",
    dependencyType: DependencyType.RUNTIME,
  });
  return { project, cdkDeps };
}

/**
 * Code that uses the generated construct the way callers are allowed to, and
 * the ways they are not (marked with `@ts-expect-error`).
 */
function consumer(construct: string, options: LambdaFunctionCommonOptions) {
  const requiresUuid = options.singleton && !options.singletonUuid;
  const props = requiresUuid ? 'uuid: "caller-uuid",' : "";
  const optionalProps = options.singleton
    ? 'lambdaPurpose: "provider",'
    : options.edgeLambda
      ? 'stackId: "edge-stack",'
      : "";
  return `
import { Code, Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { ${construct} } from "./${construct}";
declare const scope: Construct;
new ${construct}(scope, "minimal", { ${props} });
new ${construct}(scope, "options", { ${props} ${optionalProps} memorySize: 256 });
${requiresUuid ? "// @ts-expect-error props must supply a UUID" : ""}
new ${construct}(scope, "no-props");
${requiresUuid ? "// @ts-expect-error UUID is required" : ""}
new ${construct}(scope, "no-uuid", { memorySize: 256 });
${
  options.runtime
    ? `// @ts-expect-error the generator fixes the runtime
new ${construct}(scope, "runtime-override", { ${props} runtime: Runtime.NODEJS_20_X });`
    : `new ${construct}(scope, "runtime-override", { ${props} runtime: Runtime.NODEJS_22_X });`
}
// @ts-expect-error memorySize must be a number
new ${construct}(scope, "invalid-memory-size", { ${props} memorySize: "256" });
// @ts-expect-error code is supplied by the generator
new ${construct}(scope, "code-override", { ${props} code: Code.fromInline("exports.handler = async () => {}") });
// @ts-expect-error handler is supplied by the generator
new ${construct}(scope, "handler-override", { ${props} handler: "other.handler" });
${
  options.edgeLambda
    ? `// @ts-expect-error stackId must be a string
new ${construct}(scope, "invalid-stack-id", { stackId: 123 });`
    : ""
}
`.split("\n");
}

test("generated constructs compile", async () => {
  const { project, cdkDeps } = newProject();
  cases.forEach(({ options }, index) => {
    const construct = `Case${index}Function`;
    const entrypoint = options.edgeLambda
      ? `src/case${index}.edge-lambda.ts`
      : `src/case${index}.lambda.ts`;
    new TextFile(project, entrypoint, {
      lines: ["export async function handler() {}"],
    });
    new LambdaFunction(project, {
      entrypoint,
      constructFile: `src/${construct}.ts`,
      constructName: construct,
      cdkDeps,
      ...options,
    });
    new TextFile(project, `src/case${index}.consumer.ts`, {
      lines: consumer(construct, options),
    });
  });

  project.synth();

  await execProjenCLI(project.outdir, ["compile"]);
});

test.each(cases)("generated construct source: $name", ({ options }) => {
  const { project, cdkDeps } = newProject();
  new LambdaFunction(project, {
    entrypoint: options.edgeLambda
      ? "src/hello.edge-lambda.ts"
      : "src/hello.lambda.ts",
    cdkDeps,
    ...options,
  });
  const generatedSource: string =
    Testing.synth(project)["src/hello-function.ts"];

  if (options.edgeLambda) {
    expect(generatedSource).toContain(
      "export interface HelloFunctionProps extends lambda.FunctionOptions {",
    );
    expect(generatedSource).toContain("readonly stackId?: string;");
    expect(generatedSource).not.toContain("EdgeFunctionProps");
  }

  if (options.singletonUuid) {
    expect(generatedSource).toContain("...props,");
    expect(generatedSource).toContain(`uuid: "${options.singletonUuid}",`);
    expect(generatedSource.indexOf("...props,")).toBeLessThan(
      generatedSource.indexOf(`uuid: "${options.singletonUuid}",`),
    );
  }
  if (options.runtime === LambdaRuntime.NODEJS_REGIONAL_LATEST) {
    expect(generatedSource).toContain(
      "runtime: determineLatestNodeRuntime(scope),",
    );
    expect(generatedSource).not.toContain("props?.runtime");
  }
});
