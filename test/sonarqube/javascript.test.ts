import { SonarqubeJavascriptProperties } from "../../src/sonarqube";
import { synthSnapshot, TestProject } from "../util";

test("javascript preset generates correct defaults", () => {
  const prj = new TestProject();

  new SonarqubeJavascriptProperties(prj, {
    projectKey: "my-js-project",
    fileOptions: { marker: false },
  });

  const out = synthSnapshot(prj)["sonar-project.properties"];
  expect(out).toContain("sonar.projectKey=my-js-project\n");
  expect(out).toContain("sonar.language=js\n");
  expect(out).toContain("sonar.sources=src\n");
  expect(out).toContain("sonar.tests=test\n");
  expect(out).toContain("sonar.sourceEncoding=UTF-8\n");
  expect(out).toContain("sonar.profile=Sonar Way\n");
  expect(out).toContain("sonar.scm.provider=git\n");
  expect(out).toContain(
    "sonar.javascript.lcov.reportPaths=coverage/lcov.info\n",
  );
  expect(out).toContain(
    "sonar.coverage.exclusions=**/test/**,**/__tests__/**\n",
  );
  expect(out).toContain(
    "sonar.cpd.exclusions=**/test/**/*.json,**/__tests__/**/*.json\n",
  );
  expect(out).toContain("sonar.exclusions=");
});

test("javascript preset allows overriding defaults", () => {
  const prj = new TestProject();

  new SonarqubeJavascriptProperties(prj, {
    projectKey: "my-js-project",
    sources: "lib",
    tests: "spec",
    fileOptions: { marker: false },
  });

  const out = synthSnapshot(prj)["sonar-project.properties"];
  expect(out).toContain("sonar.sources=lib\n");
  expect(out).toContain("sonar.tests=spec\n");
  // Language default still applies
  expect(out).toContain("sonar.language=js\n");
});

test("javascript preset deep-merges partial nested overrides with defaults", () => {
  const prj = new TestProject();

  new SonarqubeJavascriptProperties(prj, {
    projectKey: "my-js-project",
    // Only overriding `coverage`; the `javascript.lcov` default should survive.
    coverage: { exclusions: ["**/fixtures/**"] },
    fileOptions: { marker: false },
  });

  const out = synthSnapshot(prj)["sonar-project.properties"];
  expect(out).toContain("sonar.coverage.exclusions=**/fixtures/**\n");
  expect(out).toContain(
    "sonar.javascript.lcov.reportPaths=coverage/lcov.info\n",
  );
});
