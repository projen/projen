import { directorySnapshot, withProjectDir } from "./util";
import { installPackage } from "../src/cli/util";
import { InitProjectOptionHints } from "../src/option-hints";
import { Projects } from "../src/projects";

// some tests install packages from the npm registry, which can take a while
jest.setTimeout(20_000); // 20s

describe("createProject", () => {
  test("creates a project in a directory", async () => {
    await withProjectDir(
      async (projectdir) => {
        // GIVEN
        Projects.createProject({
          optionHints: InitProjectOptionHints.FEATURED,
          dir: projectdir,
          post: false,
          synth: false,
          projectFqn: "projen.typescript.TypeScriptProject",
          projectOptions: {
            name: "test-project",
            defaultReleaseBranch: "main",
          },
        });

        // THEN
        const snapshot = directorySnapshot(projectdir, {
          excludeGlobs: ["node_modules/**"],
        });
        expect(snapshot[".projenrc.js"]).toMatchSnapshot();
      },
      { chdir: true },
    );
  });

  test("creates a project and passes in JSON-like project options", async () => {
    await withProjectDir(
      async (projectdir) => {
        // GIVEN
        Projects.createProject({
          optionHints: InitProjectOptionHints.FEATURED,
          dir: projectdir,
          post: false,
          synth: false,
          projectFqn: "projen.typescript.TypeScriptProject",
          projectOptions: {
            name: "test-project",
            defaultReleaseBranch: "main",
            eslintOptions: {
              dirs: ["src", "test"],
              prettier: true,
              aliasMap: {
                "@src": "./src",
                "@foo": "./src/foo",
              },
            },
          },
        });

        // THEN
        const snapshot = directorySnapshot(projectdir, {
          excludeGlobs: ["node_modules/**"],
        });
        expect(snapshot[".projenrc.js"]).toMatchSnapshot();
      },
      { chdir: true },
    );
  });

  test("creates a project from an external project type, if it's installed", async () => {
    await withProjectDir(
      async (projectdir) => {
        // GIVEN
        await installPackage(projectdir, "cdklabs-projen-project-types@0.1.48");

        // WHEN
        Projects.createProject({
          optionHints: InitProjectOptionHints.FEATURED,
          dir: projectdir,
          post: false,
          synth: false,
          projectFqn: "cdklabs-projen-project-types.CdklabsTypeScriptProject",
          projectOptions: {
            name: "test-project",
            defaultReleaseBranch: "main",
            cdkVersion: "2.50.0",
            packageManager: "npm",
          },
        });

        // THEN
        const snapshot = directorySnapshot(projectdir, {
          excludeGlobs: ["node_modules/**"],
        });
        expect(snapshot[".projenrc.js"]).toMatchSnapshot();
        expect(snapshot[".projenrc.js"]).toContain(
          "javascript.NodePackageManager.NPM",
        );
      },
      { chdir: true },
    );
  });
});
