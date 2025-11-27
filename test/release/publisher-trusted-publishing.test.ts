import { Release } from "../../src/release";
import { TestProject } from "../util";

describe("Publisher Trusted Publishing Validation", () => {
  let project: TestProject;
  let release: Release;

  beforeEach(() => {
    project = new TestProject();
    release = new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      artifactsDirectory: "dist",
    });
  });

  describe("publishToNpm", () => {
    test("throws error when trustedPublishing is true and npmTokenSecret is set", () => {
      expect(() => {
        release.publisher.publishToNpm({
          trustedPublishing: true,
          npmTokenSecret: "MY_NPM_TOKEN",
        });
      }).toThrow(
        "Cannot use npmTokenSecret when trustedPublishing is enabled. " +
          "Trusted publishing uses OIDC tokens for authentication instead of NPM tokens. " +
          "Remove the npmTokenSecret option to use trusted publishing."
      );
    });

    test("allows trustedPublishing without npmTokenSecret", () => {
      expect(() => {
        release.publisher.publishToNpm({
          trustedPublishing: true,
        });
      }).not.toThrow();
    });

    test("allows npmTokenSecret without trustedPublishing", () => {
      expect(() => {
        release.publisher.publishToNpm({
          npmTokenSecret: "MY_NPM_TOKEN",
        });
      }).not.toThrow();
    });

    test("node version is set to lts when trustedPublishing is disabled", () => {
      expect(() => {
        release.publisher.publishToNpm();
      }).not.toThrow();
      const workflow = release.publisher._renderJobsForBranch("main", {});
      expect(workflow.release_npm.tools?.node?.version).toBe("lts/*");
    });
  });

  describe("publishToNuget", () => {
    test("throws error when trustedPublishing is true and nugetApiKeySecret is set", () => {
      expect(() => {
        release.publisher.publishToNuget({
          trustedPublishing: true,
          nugetApiKeySecret: "MY_NUGET_KEY",
        });
      }).toThrow(
        "Cannot use nugetApiKeySecret when trustedPublishing is enabled. " +
          "Trusted publishing uses OIDC tokens for authentication instead of API keys. " +
          "Remove the nugetApiKeySecret option to use trusted publishing."
      );
    });

    test("allows trustedPublishing without nugetApiKeySecret", () => {
      expect(() => {
        release.publisher.publishToNuget({
          trustedPublishing: true,
        });
      }).not.toThrow();
    });

    test("allows nugetApiKeySecret without trustedPublishing", () => {
      expect(() => {
        release.publisher.publishToNuget({
          nugetApiKeySecret: "MY_NUGET_KEY",
        });
      }).not.toThrow();
    });
  });

  describe("publishToPyPi", () => {
    test("throws error when trustedPublishing is true and twineUsernameSecret is set", () => {
      expect(() => {
        release.publisher.publishToPyPi({
          trustedPublishing: true,
          twineUsernameSecret: "MY_USERNAME",
        });
      }).toThrow(
        "Cannot use twineUsernameSecret and twinePasswordSecret when trustedPublishing is enabled. " +
          "Trusted publishing uses OIDC tokens for authentication instead of username/password credentials. " +
          "Remove the twineUsernameSecret and twinePasswordSecret options to use trusted publishing."
      );
    });

    test("throws error when trustedPublishing is true and twinePasswordSecret is set", () => {
      expect(() => {
        release.publisher.publishToPyPi({
          trustedPublishing: true,
          twinePasswordSecret: "MY_PASSWORD",
        });
      }).toThrow(
        "Cannot use twineUsernameSecret and twinePasswordSecret when trustedPublishing is enabled. " +
          "Trusted publishing uses OIDC tokens for authentication instead of username/password credentials. " +
          "Remove the twineUsernameSecret and twinePasswordSecret options to use trusted publishing."
      );
    });

    test("throws error when trustedPublishing is true and both twine secrets are set", () => {
      expect(() => {
        release.publisher.publishToPyPi({
          trustedPublishing: true,
          twineUsernameSecret: "MY_USERNAME",
          twinePasswordSecret: "MY_PASSWORD",
        });
      }).toThrow(
        "Cannot use twineUsernameSecret and twinePasswordSecret when trustedPublishing is enabled. " +
          "Trusted publishing uses OIDC tokens for authentication instead of username/password credentials. " +
          "Remove the twineUsernameSecret and twinePasswordSecret options to use trusted publishing."
      );
    });

    test("allows trustedPublishing without twine secrets", () => {
      expect(() => {
        release.publisher.publishToPyPi({
          trustedPublishing: true,
        });
      }).not.toThrow();
    });

    test("allows twine secrets without trustedPublishing", () => {
      expect(() => {
        release.publisher.publishToPyPi({
          twineUsernameSecret: "MY_USERNAME",
          twinePasswordSecret: "MY_PASSWORD",
        });
      }).not.toThrow();
    });
  });
});
