import {
  SonarqubeLogLevel,
  SonarqubeProperties,
  SonarqubeRegion,
} from "../../src/sonarqube";
import { synthSnapshot, TestProject } from "../util";

// ---------------------------------------------------------------------------
// SonarqubeProperties (base)
// ---------------------------------------------------------------------------

test("generates sonar-project.properties with mandatory projectKey", () => {
  const prj = new TestProject();

  new SonarqubeProperties(prj, {
    projectKey: "my-org_my-project",
    fileOptions: { marker: false },
  });

  const out = synthSnapshot(prj)["sonar-project.properties"];
  expect(out).toContain("sonar.projectKey=my-org_my-project\n");
});

test("includes organization when specified", () => {
  const prj = new TestProject();

  new SonarqubeProperties(prj, {
    projectKey: "my-project",
    organization: "my-org",
    fileOptions: { marker: false },
  });

  const out = synthSnapshot(prj)["sonar-project.properties"];
  expect(out).toContain("sonar.organization=my-org\n");
});

test("generates full configuration with nested options", () => {
  const prj = new TestProject();

  new SonarqubeProperties(prj, {
    projectKey: "example-project",
    projectVersion: "0.0.1",
    sources: "src",
    tests: "test",
    exclusions: [
      "**/node_modules/**",
      "**/coverage/**",
      "**/test/**",
      "**/*.test.ts",
      "test.setup.js",
    ],
    scm: { provider: "git" },
    javascript: { lcov: { reportPaths: ["coverage/lcov.info"] } },
    typescript: { tsconfigPath: "tsconfig.json" },
    coverage: { exclusions: ["**/test/**", "**/bin/**"] },
    cpd: { exclusions: ["**/test/**/*.json"] },
    sourceEncoding: "UTF-8",
    language: "ts",
    profile: "Sonar Way",
    fileOptions: { marker: false },
  });

  const out = synthSnapshot(prj)["sonar-project.properties"];

  expect(out).toContain("sonar.projectKey=example-project\n");
  expect(out).toContain("sonar.projectVersion=0.0.1\n");
  expect(out).toContain("sonar.scm.provider=git\n");
  expect(out).toContain("sonar.sources=src\n");
  expect(out).toContain("sonar.tests=test\n");
  expect(out).toContain(
    "sonar.exclusions=**/node_modules/**,**/coverage/**,**/test/**,**/*.test.ts,test.setup.js\n",
  );
  expect(out).toContain(
    "sonar.javascript.lcov.reportPaths=coverage/lcov.info\n",
  );
  expect(out).toContain("sonar.typescript.tsconfigPath=tsconfig.json\n");
  expect(out).toContain("sonar.coverage.exclusions=**/test/**,**/bin/**\n");
  expect(out).toContain("sonar.cpd.exclusions=**/test/**/*.json\n");
  expect(out).toContain("sonar.sourceEncoding=UTF-8\n");
  expect(out).toContain("sonar.language=ts\n");
  expect(out).toContain("sonar.profile=Sonar Way\n");
});

test("does not include region when not set", () => {
  const prj = new TestProject();

  new SonarqubeProperties(prj, {
    projectKey: "my-project",
    fileOptions: { marker: false },
  });

  const out = synthSnapshot(prj)["sonar-project.properties"];
  expect(out).not.toContain("sonar.region");
});

test("includes region when explicitly set, even to the EU default value", () => {
  const prj = new TestProject();

  new SonarqubeProperties(prj, {
    projectKey: "my-project",
    region: SonarqubeRegion.EU,
    fileOptions: { marker: false },
  });

  const out = synthSnapshot(prj)["sonar-project.properties"];
  expect(out).toContain("sonar.region=eu\n");
});

test("includes region for US", () => {
  const prj = new TestProject();

  new SonarqubeProperties(prj, {
    projectKey: "my-project",
    region: SonarqubeRegion.US,
    fileOptions: { marker: false },
  });

  const out = synthSnapshot(prj)["sonar-project.properties"];
  expect(out).toContain("sonar.region=us\n");
});

test("does not include log level when not set", () => {
  const prj = new TestProject();

  new SonarqubeProperties(prj, {
    projectKey: "my-project",
    fileOptions: { marker: false },
  });

  const out = synthSnapshot(prj)["sonar-project.properties"];
  expect(out).not.toContain("sonar.log.level");
});

test("includes log level when explicitly set, even to the INFO default value", () => {
  const prj = new TestProject();

  new SonarqubeProperties(prj, {
    projectKey: "my-project",
    log: { level: SonarqubeLogLevel.INFO },
    fileOptions: { marker: false },
  });

  const out = synthSnapshot(prj)["sonar-project.properties"];
  expect(out).toContain("sonar.log.level=INFO\n");
});

test("includes quality gate wait when enabled", () => {
  const prj = new TestProject();

  new SonarqubeProperties(prj, {
    projectKey: "my-project",
    qualitygate: { wait: true },
    fileOptions: { marker: false },
  });

  const out = synthSnapshot(prj)["sonar-project.properties"];
  expect(out).toContain("sonar.qualitygate.wait=true\n");
});

test("does not include quality gate when not configured", () => {
  const prj = new TestProject();

  new SonarqubeProperties(prj, {
    projectKey: "my-project",
    fileOptions: { marker: false },
  });

  const out = synthSnapshot(prj)["sonar-project.properties"];
  expect(out).not.toContain("sonar.qualitygate");
});

test("includes quality gate timeout when explicitly set, even to the 300 default value", () => {
  const prj = new TestProject();

  new SonarqubeProperties(prj, {
    projectKey: "my-project",
    qualitygate: { wait: false, timeout: 300 },
    fileOptions: { marker: false },
  });

  const out = synthSnapshot(prj)["sonar-project.properties"];
  expect(out).toContain("sonar.qualitygate.wait=false\n");
  expect(out).toContain("sonar.qualitygate.timeout=300\n");
});

test("supports extra arbitrary properties, sonar- and non-sonar-prefixed alike", () => {
  const prj = new TestProject();

  new SonarqubeProperties(prj, {
    projectKey: "my-project",
    extraProperties: {
      "sonar.java.binaries": "target/classes",
      "custom.non.sonar.key": "custom-value",
    },
    fileOptions: { marker: false },
  });

  const out = synthSnapshot(prj)["sonar-project.properties"];
  expect(out).toContain("sonar.java.binaries=target/classes\n");
  expect(out).toContain("custom.non.sonar.key=custom-value\n");
});

test("extraProperties replaces the whole subtree of a typed option prefix", () => {
  const prj = new TestProject();

  new SonarqubeProperties(prj, {
    projectKey: "my-project",
    coverage: { exclusions: ["**/test/**"] },
    extraProperties: {
      "sonar.coverage.exclusions": "**/generated/**",
    },
    fileOptions: { marker: false },
  });

  const out = synthSnapshot(prj)["sonar-project.properties"];
  expect(out).toContain("sonar.coverage.exclusions=**/generated/**\n");
  expect(out).not.toContain("**/test/**");
});

test("file.addOverride can add properties after construction", () => {
  const prj = new TestProject();

  const sonar = new SonarqubeProperties(prj, {
    projectKey: "my-project",
    fileOptions: { marker: false },
  });

  sonar.file.addOverride("sonar.custom.property", "custom-value");

  const out = synthSnapshot(prj)["sonar-project.properties"];
  expect(out).toContain("sonar.custom.property=custom-value\n");
});

test("includes scm.exclusions.disabled when set", () => {
  const prj = new TestProject();

  new SonarqubeProperties(prj, {
    projectKey: "my-project",
    scm: { exclusions: { disabled: true } },
    fileOptions: { marker: false },
  });

  const out = synthSnapshot(prj)["sonar-project.properties"];
  expect(out).toContain("sonar.scm.exclusions.disabled=true\n");
});

test("includes scm.exclusions.disabled when explicitly set to false", () => {
  const prj = new TestProject();

  new SonarqubeProperties(prj, {
    projectKey: "my-project",
    scm: { exclusions: { disabled: false } },
    fileOptions: { marker: false },
  });

  const out = synthSnapshot(prj)["sonar-project.properties"];
  expect(out).toContain("sonar.scm.exclusions.disabled=false\n");
});

test("includes projectName when specified", () => {
  const prj = new TestProject();

  new SonarqubeProperties(prj, {
    projectKey: "my-project",
    projectName: "My Project",
    fileOptions: { marker: false },
  });

  const out = synthSnapshot(prj)["sonar-project.properties"];
  expect(out).toContain("sonar.projectName=My Project\n");
});

test("includes projectBaseDir when specified", () => {
  const prj = new TestProject();

  new SonarqubeProperties(prj, {
    projectKey: "my-project",
    projectBaseDir: "../other-dir",
    fileOptions: { marker: false },
  });

  const out = synthSnapshot(prj)["sonar-project.properties"];
  expect(out).toContain("sonar.projectBaseDir=../other-dir\n");
});

test("exposes the underlying PropertiesFile", () => {
  const prj = new TestProject();

  const sonar = new SonarqubeProperties(prj, {
    projectKey: "my-project",
  });

  expect(sonar.file).toBeDefined();
  expect(sonar.file.path).toBe("sonar-project.properties");
});
