import { writeFileSync } from "fs";
import { join } from "path";
import * as yaml from "yaml";
import {
  NodePackageManager,
  NodeProject,
  type NodeProjectOptions,
} from "../../src/javascript";
import { mkdtemp, synthSnapshot } from "../util";

function createProject(
  manifest: Record<string, unknown>,
  options: Partial<NodeProjectOptions> = {},
) {
  const outdir = mkdtemp();
  writeFileSync(join(outdir, "package.json"), JSON.stringify(manifest));
  const project = new NodeProject({
    name: "test-project",
    defaultReleaseBranch: "main",
    outdir,
    addPackageManagerToDevEngines: false,
    gitpod: true,
    devContainer: true,
    ...options,
  });
  project.gitpod!.addTasks(project.buildTask);
  project.devContainer!.addTasks(project.buildTask);
  return project;
}

describe("projenCommand with an inferred package manager", () => {
  test.each([
    ["npm@11.17.0", NodePackageManager.NPM, "npx projen"],
    ["pnpm@10.28.2", NodePackageManager.PNPM, "pnpm exec projen"],
    ["yarn@1.22.22", NodePackageManager.YARN_CLASSIC, "npx projen"],
    ["yarn@4.13.0", NodePackageManager.YARN_BERRY, "yarn projen"],
    ["bun@1.3.0", NodePackageManager.BUN, "bunx projen"],
  ])("uses %s for generated commands", (spec, packageManager, command) => {
    const project = createProject({ packageManager: spec });

    expect(project.package.packageManager).toBe(packageManager);
    expect(project.projenCommand).toBe(command);
    expect(project.runTaskCommand(project.buildTask)).toBe(`${command} build`);

    const output = synthSnapshot(project);
    const workflow = yaml.parse(output[".github/workflows/build.yml"]);
    expect(workflow.jobs.build.steps).toContainEqual(
      expect.objectContaining({ run: `${command} build` }),
    );
    expect(yaml.parse(output[".gitpod.yml"]).tasks).toContainEqual(
      expect.objectContaining({ command: `${command} build` }),
    );
    expect(output[".devcontainer.json"].postCreateCommand).toBe(
      `( ${command} build )`,
    );
    expect(output[".gitignore"]).toContain(`run "${command}"`);
    expect(output["package.json"].scripts.build).toBe("projen build");
    expect(output["package.json"].scripts.projen).toBe("projen");

    const explicit = createProject(
      { packageManager: spec },
      { packageManager },
    );
    expect(output).toEqual(synthSnapshot(explicit));
  });

  test.each([
    ["npm", "11.17.0", "npx projen"],
    ["pnpm", "10.28.2", "pnpm exec projen"],
    ["yarn", "1.22.22", "npx projen"],
    ["bun", "1.3.0", "bunx projen"],
  ])("uses devEngines %s@%s", (name, version, command) => {
    const project = createProject({
      devEngines: { packageManager: { name, version } },
    });
    expect(project.projenCommand).toBe(command);
    synthSnapshot(project);
  });

  test.each(['node "tools/custom runner.js" --mode=local', "npx projen", ""])(
    "preserves the explicit command %j",
    (projenCommand) => {
      const project = createProject(
        { packageManager: "pnpm@10.28.2" },
        { projenCommand },
      );
      expect(project.projenCommand).toBe(projenCommand);
      expect(project.runTaskCommand(project.buildTask)).toBe(
        `${projenCommand} build`,
      );
      expect(synthSnapshot(project)["package.json"].scripts.projen).toBe(
        projenCommand,
      );
    },
  );

  test("explicit package manager takes precedence over inference", () => {
    const project = createProject(
      { packageManager: "pnpm@10.28.2" },
      { packageManager: NodePackageManager.NPM },
    );
    expect(project.package.packageManager).toBe(NodePackageManager.NPM);
    expect(project.projenCommand).toBe("npx projen");
    synthSnapshot(project);
  });

  test("retains the existing fallback without a configured manager", () => {
    const project = createProject({});
    expect(project.package.packageManager).toBe(
      NodePackageManager.YARN_CLASSIC,
    );
    expect(project.projenCommand).toBe("npx projen");
    synthSnapshot(project);
  });

  test("keeps the standalone command when ejecting", () => {
    const previous = process.env.PROJEN_EJECTING;
    try {
      process.env.PROJEN_EJECTING = "true";
      const project = createProject({ packageManager: "pnpm@10.28.2" });
      expect(project.projenCommand).toBe("node scripts/run-task.cjs");
      expect(project.runTaskCommand(project.buildTask)).toBe(
        "node scripts/run-task.cjs build",
      );
    } finally {
      if (previous === undefined) {
        delete process.env.PROJEN_EJECTING;
      } else {
        process.env.PROJEN_EJECTING = previous;
      }
    }
  });
});
