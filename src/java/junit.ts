import { join } from "path";
import { Component } from "../component";
import { SampleDir } from "../sample-file";
import { StandardProject } from "../standard-project";
import { Pom } from "./pom";

const TESTDIR = join("src", "test", "java");

/**
 * Options for `Junit`.
 */
export interface JunitOptions {
  /**
   * Java pom.
   */
  readonly pom: Pom;

  /**
   * Junit version
   *
   * @default "5.7.0"
   */
  readonly version?: string;

  /**
   * Java package for test sample.
   * @default "org.acme"
   */
  readonly sampleJavaPackage?: string;
}

/**
 * Implements JUnit-based testing.
 */
export class Junit extends Component {
  constructor(project: StandardProject, options: JunitOptions) {
    super(project);

    const pom = options.pom;
    const version = options.version ?? "5.7.0";

    pom.addTestDependency(`org.junit.jupiter/junit-jupiter-api@${version}`);
    pom.addTestDependency(`org.junit.jupiter/junit-jupiter-engine@${version}`);

    project.testTask.exec("mvn test");

    const javaPackage = options.sampleJavaPackage ?? "org.acme";
    const javaPackagePath = javaPackage.split(".");
    new SampleDir(project, join(TESTDIR, ...javaPackagePath), {
      files: {
        "MyTest.java": [
          `package ${javaPackage};`,
          "",
          "import org.junit.jupiter.api.Test;",
          "",
          "public class MyTest {",
          "  @Test",
          "  public void testHello() {",
          '    System.out.println("Hello, world!");',
          "  }",
          "}",
        ].join("\n"),
      },
    });
  }
}
