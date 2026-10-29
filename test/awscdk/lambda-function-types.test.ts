import { writeFileSync } from "fs";
import { join } from "path";
import * as ts from "typescript";
import { DependencyType } from "../../src";
import type { LambdaFunctionCommonOptions } from "../../src/awscdk";
import { LambdaFunction, LambdaRuntime } from "../../src/awscdk";
import { AwsCdkDepsJs } from "../../src/awscdk/awscdk-deps-js";
import { Testing } from "../../src/testing";
import { TypeScriptProject } from "../../src/typescript";
import { mkdtemp } from "../util";

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
  { name: "ordinary function", options: {} },
];

test.each(cases)("generated construct type checks: $name", ({ options }) => {
  const project = new TypeScriptProject({
    name: "hello",
    defaultReleaseBranch: "main",
  });
  new LambdaFunction(project, {
    entrypoint: "src/hello.lambda.ts",
    cdkDeps: new AwsCdkDepsJs(project, {
      cdkVersion: "2.275.0",
      dependencyType: DependencyType.RUNTIME,
    }),
    ...options,
  });
  const generatedSource: string =
    Testing.synth(project)["src/hello-function.ts"];
  const requiresUuid = options.singleton && !options.singletonUuid;
  const props = requiresUuid ? 'uuid: "caller-uuid",' : "";
  const optionalProps = options.singleton ? 'lambdaPurpose: "provider",' : "";
  const runtime = options.runtime ? "" : "runtime: Runtime.NODEJS_22_X,";
  const consumer = `
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { HelloFunction } from "./hello-function";
declare const scope: Construct;
new HelloFunction(scope, "minimal", { ${props} });
new HelloFunction(scope, "options", { ${props} ${optionalProps} ${runtime} memorySize: 256 });
${requiresUuid ? "// @ts-expect-error props must supply a UUID" : ""}
new HelloFunction(scope, "no-props");
${requiresUuid ? "// @ts-expect-error UUID is required" : ""}
new HelloFunction(scope, "no-uuid", { memorySize: 256 });
${
  options.runtime
    ? `// @ts-expect-error the generator fixes the runtime
new HelloFunction(scope, "runtime-override", { ${props} runtime: Runtime.NODEJS_20_X });`
    : ""
}
`;

  const outdir = mkdtemp({ dir: __dirname });
  const constructFile = join(outdir, "hello-function.ts");
  const consumerFile = join(outdir, "consumer.ts");
  writeFileSync(constructFile, generatedSource);
  writeFileSync(consumerFile, consumer);
  const program = ts.createProgram([constructFile, consumerFile], {
    strict: true,
    noEmit: true,
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.Node16,
    lib: ["lib.es2022.d.ts", "lib.esnext.disposable.d.ts"],
    types: ["node"],
  });
  const diagnostics = ts.getPreEmitDiagnostics(program).map((diagnostic) => ({
    code: diagnostic.code,
    file: diagnostic.file?.fileName,
    line:
      diagnostic.file && diagnostic.start !== undefined
        ? diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start).line +
          1
        : undefined,
    message: ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"),
  }));
  expect(diagnostics).toEqual([]);

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
