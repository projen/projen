import { javascript } from "../../src";
import { NodeProject } from "../../src/javascript";
import { execProjenCLI, synthSnapshot } from "../util";

describe("license checker", () => {
  describe("validations", () => {
    test("requires at least one of production or development", () => {
      expect(() => {
        new NodeProject({
          name: "test",
          defaultReleaseBranch: "main",
          packageManager: javascript.NodePackageManager.NPM,
          checkLicenses: {
            production: false,
            development: false,
            allow: ["MIT"],
          },
        });
      }).toThrowErrorMatchingInlineSnapshot(
        `"LicenseChecker: At least one of \`production\` or \`development\` must be enabled."`,
      );
    });

    test("requires one of allow or deny", () => {
      expect(() => {
        new NodeProject({
          name: "test",
          defaultReleaseBranch: "main",
          packageManager: javascript.NodePackageManager.NPM,
          checkLicenses: {
            allow: [],
            deny: [],
          },
        });
      }).toThrowErrorMatchingInlineSnapshot(
        `"LicenseChecker: Neither \`allow\` nor \`deny\` found. Exactly one must be provided and not empty."`,
      );
    });

    test("cannot use allow and deny together", () => {
      expect(() => {
        new NodeProject({
          name: "test",
          defaultReleaseBranch: "main",
          packageManager: javascript.NodePackageManager.NPM,
          checkLicenses: {
            allow: ["MIT"],
            deny: ["BSD"],
          },
        });
      }).toThrowErrorMatchingInlineSnapshot(
        `"LicenseChecker: \`allow\` and \`deny\` can not be used at the same time. Choose one or the other."`,
      );
    });
  });

  describe("excludePrivatePackages", () => {
    const checkLicensesArgs = (project: NodeProject) =>
      synthSnapshot(project)[".projen/tasks.json"].tasks["check-licenses"]
        .steps[0].execArgs;

    test("is passed by default", () => {
      const project = new NodeProject({
        name: "test",
        defaultReleaseBranch: "main",
        packageManager: javascript.NodePackageManager.NPM,
        checkLicenses: { allow: ["MIT"] },
      });

      expect(checkLicensesArgs(project)).toContain("--excludePrivatePackages");
    });

    test("can be disabled explicitly", () => {
      const project = new NodeProject({
        name: "test",
        defaultReleaseBranch: "main",
        packageManager: javascript.NodePackageManager.NPM,
        checkLicenses: { allow: ["MIT"], excludePrivatePackages: false },
      });

      expect(checkLicensesArgs(project)).not.toContain(
        "--excludePrivatePackages",
      );
    });
  });

  test("will fail task if denied license is found", async () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "main",
      packageManager: javascript.NodePackageManager.NPM,
      checkLicenses: {
        production: true,
        development: true,
        deny: ["Apache-2.0"], // projen is Apache-2.0 so this will always cause a failure
      },
    });

    project.synth();

    // THEN
    await expect(
      execProjenCLI(project.outdir, ["check-licenses"]),
    ).rejects.toThrow(
      `Found license defined by the --failOn flag: "Apache-2.0"`,
    );
  });

  test("will pass if only allowed licenses are found", async () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      license: "MIT",
      copyrightOwner: "Jane Doe",
      defaultReleaseBranch: "main",
      packageManager: javascript.NodePackageManager.NPM,
      deps: ["find-up-simple"], // this package is MIT licensed
      checkLicenses: {
        production: true,
        development: false,
        allow: ["MIT"],
      },
    });

    project.synth();

    // THEN
    await execProjenCLI(project.outdir, ["check-licenses"]);
  });
});
