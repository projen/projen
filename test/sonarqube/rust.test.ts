import { SonarqubeRustProperties } from "../../src/sonarqube";
import { synthSnapshot, TestProject } from "../util";

test("rust preset generates correct defaults", () => {
  const prj = new TestProject();

  new SonarqubeRustProperties(prj, {
    projectKey: "my-rust-project",
    fileOptions: { marker: false },
  });

  const out = synthSnapshot(prj)["sonar-project.properties"];
  expect(out).toContain("sonar.projectKey=my-rust-project\n");
  expect(out).toContain("sonar.language=rust\n");
  expect(out).toContain("sonar.sources=src\n");
  expect(out).toContain("sonar.tests=tests\n");
  expect(out).toContain("sonar.sourceEncoding=UTF-8\n");
  expect(out).toContain("sonar.profile=Sonar Way\n");
  expect(out).toContain("sonar.scm.provider=git\n");
  expect(out).toContain("sonar.rust.lcov.reportPaths=target/lcov.info\n");
  expect(out).toContain("sonar.rust.clippy.enabled=false\n");
  expect(out).toContain(
    "sonar.rust.clippyReport.reportPaths=target/clippy.json\n",
  );
  expect(out).toContain("sonar.coverage.exclusions=**/tests/**,**/target/**\n");
  expect(out).toContain("sonar.cpd.exclusions=**/tests/**/*.json\n");
});

test("rust preset allows overriding defaults", () => {
  const prj = new TestProject();

  new SonarqubeRustProperties(prj, {
    projectKey: "my-rust-project",
    sources: "packages/",
    rust: {
      lcov: { reportPaths: ["custom/lcov.info"] },
      clippy: { enabled: true },
      clippyReport: { reportPaths: ["custom/clippy.json"] },
    },
    fileOptions: { marker: false },
  });

  const out = synthSnapshot(prj)["sonar-project.properties"];
  expect(out).toContain("sonar.sources=packages/\n");
  expect(out).toContain("sonar.rust.lcov.reportPaths=custom/lcov.info\n");
  expect(out).toContain("sonar.rust.clippy.enabled=true\n");
  expect(out).toContain(
    "sonar.rust.clippyReport.reportPaths=custom/clippy.json\n",
  );
});
