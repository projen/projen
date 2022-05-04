import { GitHubProject } from "../src/github";

test("autoApprove is configured", () => {
  // WHEN
  const p = new GitHubProject({
    name: "my-project",
    autoApproveOptions: {
      secret: "MY_SECRET",
    },
  });

  // THEN
  expect(p.autoApprove).toBeDefined();
  expect(p.autoApprove?.label).toEqual("auto-approve");
});

test("github: false disables github integration", () => {
  // WHEN
  const p = new GitHubProject({
    name: "my-project",
    github: false,
  });

  // THEN
  expect(p.github).toBeUndefined();
});
