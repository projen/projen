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
  const optionalProps = options.singleton ? 'lambdaPurpose: "provider",' : "";
  const runtime = options.runtime ? "" : "runtime: Runtime.NODEJS_22_X,";
  return `
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { ${construct} } from "./${construct}";
declare const scope: Construct;
new ${construct}(scope, "minimal", { ${props} });
new ${construct}(scope, "options", { ${props} ${optionalProps} ${runtime} memorySize: 256 });
${requiresUuid ? "// @ts-expect-error props must supply a UUID" : ""}
new ${construct}(scope, "no-props");
${requiresUuid ? "// @ts-expect-error UUID is required" : ""}
new ${construct}(scope, "no-uuid", { memorySize: 256 });
${
  options.runtime
    ? `// @ts-expect-error the generator fixes the runtime
new ${construct}(scope, "runtime-override", { ${props} runtime: Runtime.NODEJS_20_X });`
    : ""
}
`.split("\n");
}

test("generated constructs compile", async () => {
  const { project, cdkDeps } = newProject();
  cases.forEach(({ options }, index) => {
    const construct = `Case${index}Function`;
    const entrypoint = `src/case${index}.lambda.ts`;
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
    entrypoint: "src/hello.lambda.ts",
    cdkDeps,
    ...options,
  });
  const generatedSource: string =
    Testing.synth(project)["src/hello-function.ts"];

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
