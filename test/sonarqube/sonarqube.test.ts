import {
  SonarqubeJavascriptProperties,
  SonarqubeLogLevel,
  SonarqubeProperties,
  SonarqubeRegion,
  SonarqubeRustProperties,
  SonarqubeTypescriptProperties,
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

test("does not include region for EU (default)", () => {
  const prj = new TestProject();

  new SonarqubeProperties(prj, {
    projectKey: "my-project",
    region: SonarqubeRegion.EU,
    fileOptions: { marker: false },
  });

  const out = synthSnapshot(prj)["sonar-project.properties"];
  expect(out).not.toContain("sonar.region");
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

test("does not include log level when INFO (default)", () => {
  const prj = new TestProject();

  new SonarqubeProperties(prj, {
    projectKey: "my-project",
    log: { level: SonarqubeLogLevel.INFO },
    fileOptions: { marker: false },
  });

  const out = synthSnapshot(prj)["sonar-project.properties"];
  expect(out).not.toContain("sonar.log.level");
});

test("includes log level when non-default", () => {
  const prj = new TestProject();

  new SonarqubeProperties(prj, {
    projectKey: "my-project",
    log: { level: SonarqubeLogLevel.DEBUG },
    fileOptions: { marker: false },
  });

  const out = synthSnapshot(prj)["sonar-project.properties"];
  expect(out).toContain("sonar.log.level=DEBUG\n");
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

test("includes quality gate timeout when non-default", () => {
  const prj = new TestProject();

  new SonarqubeProperties(prj, {
    projectKey: "my-project",
    qualitygate: { wait: true, timeout: 600 },
    fileOptions: { marker: false },
  });

  const out = synthSnapshot(prj)["sonar-project.properties"];
  expect(out).toContain("sonar.qualitygate.timeout=600\n");
});

test("does not include quality gate timeout when default (300)", () => {
  const prj = new TestProject();

  new SonarqubeProperties(prj, {
    projectKey: "my-project",
    qualitygate: { wait: true, timeout: 300 },
    fileOptions: { marker: false },
  });

  const out = synthSnapshot(prj)["sonar-project.properties"];
  expect(out).not.toContain("sonar.qualitygate.timeout");
});

test("supports extra arbitrary properties", () => {
  const prj = new TestProject();

  new SonarqubeProperties(prj, {
    projectKey: "my-project",
    extraProperties: {
      "sonar.java.binaries": "target/classes",
      "sonar.java.source": "17",
    },
    fileOptions: { marker: false },
  });

  const out = synthSnapshot(prj)["sonar-project.properties"];
  expect(out).toContain("sonar.java.binaries=target/classes\n");
  expect(out).toContain("sonar.java.source=17\n");
});

test("addProperty can add properties after construction", () => {
  const prj = new TestProject();

  const sonar = new SonarqubeProperties(prj, {
    projectKey: "my-project",
    fileOptions: { marker: false },
  });

  sonar.addProperty("sonar.custom.property", "custom-value");

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

// ---------------------------------------------------------------------------
// SonarqubeJavascriptProperties
// ---------------------------------------------------------------------------

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

test("javascript preset matches example file structure", () => {
  const prj = new TestProject();

  new SonarqubeJavascriptProperties(prj, {
    projectKey: "example-project",
    projectVersion: "1.0.0",
    exclusions: [
      "**/node_modules/**",
      "**/coverage/**",
      "**/__tests__/**",
      "**/*.test.js",
      "test.setup.js",
      "babel.config.js",
    ],
    fileOptions: { marker: false },
  });

  const out = synthSnapshot(prj)["sonar-project.properties"];
  expect(out).toContain("sonar.projectKey=example-project\n");
  expect(out).toContain("sonar.projectVersion=1.0.0\n");
  expect(out).toContain("babel.config.js\n");
});

// ---------------------------------------------------------------------------
// SonarqubeTypescriptProperties
// ---------------------------------------------------------------------------

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

test("typescript preset matches example file structure", () => {
  const prj = new TestProject();

  new SonarqubeTypescriptProperties(prj, {
    projectKey: "example-project",
    projectVersion: "0.0.1",
    exclusions: [
      "**/node_modules/**",
      "**/coverage/**",
      "**/test/**",
      "**/*.test.ts",
      "test.setup.js",
    ],
    fileOptions: { marker: false },
  });

  const out = synthSnapshot(prj)["sonar-project.properties"];
  expect(out).toContain("sonar.projectKey=example-project\n");
  expect(out).toContain("sonar.projectVersion=0.0.1\n");
  expect(out).toContain("sonar.typescript.tsconfigPath=tsconfig.json\n");
  expect(out).toContain("sonar.language=ts\n");
});

// ---------------------------------------------------------------------------
// SonarqubeRustProperties
// ---------------------------------------------------------------------------

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

test("rust preset matches example file structure", () => {
  const prj = new TestProject();

  new SonarqubeRustProperties(prj, {
    projectKey: "example-project",
    projectVersion: "1.0.0",
    sources: "packages/",
    tests: "tests/",
    exclusions: ["**/coverage/**", "**/tests/**", "**/target/**"],
    fileOptions: { marker: false },
  });

  const out = synthSnapshot(prj)["sonar-project.properties"];
  expect(out).toContain("sonar.projectKey=example-project\n");
  expect(out).toContain("sonar.projectVersion=1.0.0\n");
  expect(out).toContain("sonar.sources=packages/\n");
  expect(out).toContain("sonar.tests=tests/\n");
  expect(out).toContain("sonar.language=rust\n");
  expect(out).toContain("sonar.rust.lcov.reportPaths=target/lcov.info\n");
  expect(out).toContain("sonar.rust.clippy.enabled=false\n");
  expect(out).toContain(
    "sonar.rust.clippyReport.reportPaths=target/clippy.json\n",
  );
});

test("supports non-sonar extra properties", () => {
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
