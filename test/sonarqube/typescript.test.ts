import { SonarqubeTypescriptProperties } from "../../src/sonarqube";
import { synthSnapshot, TestProject } from "../util";

test("typescript preset generates correct defaults", () => {
  const prj = new TestProject();

  new SonarqubeTypescriptProperties(prj, {
    projectKey: "my-ts-project",
    fileOptions: { marker: false },
  });

  const out = synthSnapshot(prj)["sonar-project.properties"];
  expect(out).toContain("sonar.projectKey=my-ts-project\n");
  expect(out).toContain("sonar.language=ts\n");
  expect(out).toContain("sonar.sources=src\n");
  expect(out).toContain("sonar.tests=test\n");
  expect(out).toContain("sonar.sourceEncoding=UTF-8\n");
  expect(out).toContain("sonar.profile=Sonar Way\n");
  expect(out).toContain("sonar.scm.provider=git\n");
  expect(out).toContain("sonar.typescript.tsconfigPath=tsconfig.json\n");
  expect(out).toContain(
    "sonar.javascript.lcov.reportPaths=coverage/lcov.info\n",
  );
  expect(out).toContain(
    "sonar.coverage.exclusions=**/test/**,**/__tests__/**\n",
  );
  expect(out).toContain(
    "sonar.cpd.exclusions=**/test/**/*.json,**/__tests__/**/*.json\n",
  );
});

test("typescript preset allows overriding defaults", () => {
  const prj = new TestProject();

  new SonarqubeTypescriptProperties(prj, {
    projectKey: "my-ts-project",
    typescript: { tsconfigPath: "tsconfig.build.json" },
    tests: "spec",
    fileOptions: { marker: false },
  });

  const out = synthSnapshot(prj)["sonar-project.properties"];
  expect(out).toContain("sonar.typescript.tsconfigPath=tsconfig.build.json\n");
  expect(out).toContain("sonar.tests=spec\n");
  expect(out).toContain("sonar.language=ts\n");
});
