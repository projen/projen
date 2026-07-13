import * as yaml from "yaml";
import type { NodeProjectOptions } from "../../src/javascript";
import { NodeProject } from "../../src/javascript";
import { synthSnapshot } from "../util";

function createProject(opts: Partial<NodeProjectOptions> = {}) {
  const { githubOptions, ...rest } = opts;
  return new NodeProject({
    name: "test",
    defaultReleaseBranch: "main",
    githubOptions: {
      dependencyReview: true,
      ...githubOptions,
    },
    ...rest,
  });
}

function dependencyReviewWorkflow(project: NodeProject) {
  const snap = synthSnapshot(project);
  return yaml.parse(snap[".github/workflows/dependency-review.yml"]);
}

describe("DependencyReview", () => {
  test("disabled by default", () => {
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "main",
    });
    const snap = synthSnapshot(project);
    expect(snap[".github/workflows/dependency-review.yml"]).toBeUndefined();
  });

  test("adds a dependency-review workflow when enabled", () => {
    const project = createProject();
    const wf = dependencyReviewWorkflow(project);
    expect(wf.on).toEqual({ pull_request: {}, workflow_dispatch: {} });
    const job = wf.jobs["dependency-review"];
    expect(job).toBeDefined();
    const reviewStep = job.steps.find(
      (s: any) => s.name === "Dependency Review",
    );
    expect(reviewStep.uses).toMatch(/^actions\/dependency-review-action@v4/);
  });

  test("auto-populates failOnSeverity from auditDepsOptions.level", () => {
    const project = createProject({
      auditDeps: true,
      auditDepsOptions: { level: "critical" },
    });
    const wf = dependencyReviewWorkflow(project);
    const reviewStep = wf.jobs["dependency-review"].steps.find(
      (s: any) => s.name === "Dependency Review",
    );
    expect(reviewStep.with["fail-on-severity"]).toBe("critical");
  });

  test("auto-populates allowLicenses from checkLicenses.allow", () => {
    const project = createProject({
      checkLicenses: { allow: ["MIT", "Apache-2.0"] },
    });
    const wf = dependencyReviewWorkflow(project);
    const reviewStep = wf.jobs["dependency-review"].steps.find(
      (s: any) => s.name === "Dependency Review",
    );
    expect(reviewStep.with["allow-licenses"]).toBe("MIT, Apache-2.0");
  });

  test("explicit options override auto-populated values", () => {
    const project = createProject({
      auditDeps: true,
      auditDepsOptions: { level: "critical" },
      checkLicenses: { allow: ["MIT"] },
      githubOptions: {
        dependencyReviewOptions: {
          failOnSeverity: "low",
          allowLicenses: ["BSD-3-Clause"],
        },
      },
    });
    const wf = dependencyReviewWorkflow(project);
    const reviewStep = wf.jobs["dependency-review"].steps.find(
      (s: any) => s.name === "Dependency Review",
    );
    expect(reviewStep.with["fail-on-severity"]).toBe("low");
    expect(reviewStep.with["allow-licenses"]).toBe("BSD-3-Clause");
  });

  test("supports warnOnly option", () => {
    const project = createProject({
      githubOptions: {
        dependencyReviewOptions: { warnOnly: true },
      },
    });
    const wf = dependencyReviewWorkflow(project);
    const reviewStep = wf.jobs["dependency-review"].steps.find(
      (s: any) => s.name === "Dependency Review",
    );
    expect(reviewStep.with["warn-only"]).toBe(true);
  });

  test("supports configFile option", () => {
    const project = createProject({
      githubOptions: {
        dependencyReviewOptions: {
          configFile: ".github/dependency-review.yml",
        },
      },
    });
    const wf = dependencyReviewWorkflow(project);
    const reviewStep = wf.jobs["dependency-review"].steps.find(
      (s: any) => s.name === "Dependency Review",
    );
    expect(reviewStep.with["config-file"]).toBe(
      ".github/dependency-review.yml",
    );
  });

  test("commentSummaryInPr defaults to always with pull-requests write permission", () => {
    const project = createProject();
    const wf = dependencyReviewWorkflow(project);
    const job = wf.jobs["dependency-review"];
    expect(job.permissions["pull-requests"]).toBe("write");
    const reviewStep = job.steps.find(
      (s: any) => s.name === "Dependency Review",
    );
    expect(reviewStep.with["comment-summary-in-pr"]).toBe("always");
  });

  test("commentSummaryInPr can be set to on-failure", () => {
    const project = createProject({
      githubOptions: {
        dependencyReviewOptions: { commentSummaryInPr: "on-failure" },
      },
    });
    const wf = dependencyReviewWorkflow(project);
    const reviewStep = wf.jobs["dependency-review"].steps.find(
      (s: any) => s.name === "Dependency Review",
    );
    expect(reviewStep.with["comment-summary-in-pr"]).toBe("on-failure");
  });

  test("commentSummaryInPr can be disabled", () => {
    const project = createProject({
      githubOptions: {
        dependencyReviewOptions: { commentSummaryInPr: "never" },
      },
    });
    const wf = dependencyReviewWorkflow(project);
    const job = wf.jobs["dependency-review"];
    expect(job.permissions["pull-requests"]).toBeUndefined();
    const reviewStep = job.steps.find(
      (s: any) => s.name === "Dependency Review",
    );
    expect(reviewStep.with["comment-summary-in-pr"]).toBe("never");
  });
});
