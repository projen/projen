import * as path from "path";
import { run } from "../src/engine/command";
import { MavenRepo } from "../src/engine/registries/maven-repo";
import {
  Artifacts,
  Workspace,
  expectExit,
  fileContains,
  fileExists,
  toolAvailable,
  tryArtifacts,
} from "../src/integ-test";

/**
 * Java integration suite. Replaces scripts/integ-java.sh.
 *
 * Resolves the packaged projen from the local Maven repo (dist/java) via a
 * file:// <repository>, compiles and runs a projenrc.java that synthesizes a
 * JavaProject, and asserts tree.json records the built version.
 *
 * Skipped when the Maven repo, mvn or java are unavailable.
 */

function javaRepoDir(): string | undefined {
  try {
    return tryArtifacts()?.javaRepo;
  } catch {
    return undefined;
  }
}

/** Detects the running JDK major version (e.g. 17, or 8 from "1.8.0"). */
function javaMajor(): string {
  const out = run("java", ["-version"]).stderr;
  const m = /version "(\d+)(?:\.(\d+))?/.exec(out);
  if (!m) {
    return "11";
  }
  return m[1] === "1" ? (m[2] ?? "8") : m[1];
}

const repoDir = javaRepoDir();
const enabled =
  !!repoDir && toolAvailable("mvn", "-v") && toolAvailable("java", "-version");
const suite = enabled ? describe : describe.skip;

if (!repoDir) {
  // eslint-disable-next-line no-console
  console.warn(
    "[java] skipped: no dist/java. Run `npx projen package:java` first.",
  );
} else if (!enabled) {
  // eslint-disable-next-line no-console
  console.warn("[java] skipped: mvn/java not available.");
}

suite("java", () => {
  const artifacts = Artifacts.resolve();
  const version = artifacts.version;
  const repo = new MavenRepo(artifacts.javaRepo);

  test("imports and synthesizes from the packaged Maven artifact", () => {
    const ws = Workspace.create();
    try {
      const jv = javaMajor();

      ws.write(
        "pom.xml",
        `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>test</groupId>
  <artifactId>test-java-project</artifactId>
  <version>0.0.0</version>
  <packaging>jar</packaging>
  <properties>
    <maven.compiler.source>${jv}</maven.compiler.source>
    <maven.compiler.target>${jv}</maven.compiler.target>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  </properties>
  <repositories>
    <repository>
      <id>local-projen</id>
      <url>${repo.url}</url>
    </repository>
  </repositories>
  <dependencies>
    <dependency>
      <groupId>io.github.cdklabs</groupId>
      <artifactId>projen</artifactId>
      <version>${version}</version>
    </dependency>
  </dependencies>
  <build>
    <plugins>
      <plugin>
        <groupId>org.codehaus.mojo</groupId>
        <artifactId>exec-maven-plugin</artifactId>
        <version>3.1.0</version>
      </plugin>
    </plugins>
  </build>
</project>
`,
      );

      ws.write(
        path.join("src", "main", "java", "projenrc.java"),
        `import io.github.cdklabs.projen.java.JavaProject;
import io.github.cdklabs.projen.java.JavaProjectOptions;

public class projenrc {
    public static void main(String[] args) {
        JavaProject project = new JavaProject(JavaProjectOptions.builder()
            .name("test-java-project")
            .groupId("org.acme")
            .artifactId("test-java-project")
            .version("0.0.0")
            .projectTree(Boolean.TRUE)
            .sample(Boolean.FALSE)
            .junit(Boolean.FALSE)
            .build());
        project.synth();
    }
}
`,
      );

      const mvn = run(
        "mvn",
        ["compile", "exec:java", "-Dexec.mainClass=projenrc", "-q", "-B"],
        { cwd: ws.dir, env: { NODE_ENV: undefined }, timeout: 600_000 },
      );
      expectExit(mvn, 0);

      expect(fileExists(ws.dir, ".projen", "tree.json")).toBe(true);
      expect(
        fileContains(
          path.join(ws.dir, ".projen", "tree.json"),
          `"projen.version": "${version}"`,
        ),
      ).toBe(true);
    } finally {
      ws.dispose();
    }
  });
});
