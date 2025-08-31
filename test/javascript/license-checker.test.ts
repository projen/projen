import { NodeProject } from "../../src/javascript";
import { execProjenCLI } from "../util";

describe("license checker", () => {
  describe("validations", () => {
    test("requires at least one of production or development", () => {
      expect(() => {
        new NodeProject({
          name: "test",
          defaultReleaseBranch: "master",
          checkLicenses: {
            production: false,
            development: false,
            allow: ["MIT"],
          },
        });
      }).toThrowErrorMatchingInlineSnapshot(
        `"LicenseChecker: At least one of \`production\` or \`development\` must be enabled."`
      );
    });

    test("requires one of allow or deny", () => {
      expect(() => {
        new NodeProject({
          name: "test",
          defaultReleaseBranch: "master",
          checkLicenses: {
            allow: [],
            deny: [],
          },
        });
      }).toThrowErrorMatchingInlineSnapshot(
        `"LicenseChecker: Neither \`allow\` nor \`deny\` found. Exactly one must be provided and not empty."`
      );
    });

    test("cannot use allow and deny together", () => {
      expect(() => {
        new NodeProject({
          name: "test",
          defaultReleaseBranch: "master",
          checkLicenses: {
            allow: ["MIT"],
            deny: ["BSD"],
          },
        });
      }).toThrowErrorMatchingInlineSnapshot(
        `"LicenseChecker: \`allow\` and \`deny\` can not be used at the same time. Choose one or the other."`
      );
    });
  });

  test("will fail task if denied license is found", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "main",
      checkLicenses: {
        production: true,
        development: true,
        deny: ["Apache-2.0"], // projen is Apache-2.0 so this will always cause a failure
      },
    });

    project.synth();

    // THEN
    expect(() =>
      execProjenCLI(project.outdir, ["check-licenses"])
    ).toThrow(`Found license defined by the --failOn flag: "Apache-2.0"`);
  });

  test("will pass if only allowed licenses are found", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      license: "MIT",
      copyrightOwner: "Jane Doe",
      defaultReleaseBranch: "main",
      deps: ["find-up-simple"], // this package is MIT licensed
      checkLicenses: {
        production: true,
        development: false,
        allow: ["MIT"],
      },
    });

    project.synth();

    // THEN
    execProjenCLI(project.outdir, ["check-licenses"]);
  });
});
