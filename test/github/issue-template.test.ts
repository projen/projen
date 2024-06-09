import { IssueTemplate } from "../../src/github/issue-template";
import { synthSnapshot, TestProject } from "../util";

describe("issue-template", () => {
  test("default project behavior", () => {
    const project = new TestProject();
    expect(
      synthSnapshot(project)[".github/ISSUE_TEMPLATE/bug-report.md"]
    ).toBeUndefined();
  });

  test("include config", () => {
    const project = new TestProject();
    new IssueTemplate(project.github!, {
      templates: {
        "bug-report.md": "<!-- Bug report template content -->",
      },
      includeConfig: true,
      configOptions: {
        blankIssuesEnabled: false,
        contactLinks: [
          {
            name: "Support",
            url: "https://example.com/support",
            about: "Get support for this project",
          },
        ],
      },
    });
    const snapshot = synthSnapshot(project);
    const issueTemplateConfig = snapshot[".github/config.yml"];
    expect(issueTemplateConfig).toContain("blank_issues_enabled: false");
    expect(issueTemplateConfig).toContain("contact_links");
    expect(issueTemplateConfig).toMatchSnapshot();
  });

  test("includes bug-report.md", () => {
    const project = new TestProject();
    new IssueTemplate(project.github!, {
      templates: {
        "bug-report.md": "<!-- Bug report template content -->",
      },
    });

    expect(
      synthSnapshot(project)[".github/ISSUE_TEMPLATE/bug-report.md"]
    ).toMatchSnapshot();
  });

  test("includes feature-request.yml", () => {
    const project = new TestProject();
    new IssueTemplate(project.github!, {
      templates: {
        "feature-request.yml": "<!-- Feature request template content -->",
      },
    });

    expect(
      synthSnapshot(project)[".github/ISSUE_TEMPLATE/feature-request.yml"]
    ).toMatchSnapshot();
  });
});
