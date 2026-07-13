---
sidebar_position: 2
---

# Create a Spring Boot Application

This quick start shows how to create a minimal Spring Boot web application with
projen's Java project type.

## Create the project

Create a new Java project:

```shell
mkdir hello-spring
cd hello-spring
pnpm dlx projen new java --group-id org.acme --artifact-id hello-spring
```

Spring Boot requires Java 17 or newer, so check your local Java version before
continuing:

```shell
java -version
```

## Configure Spring Boot

Edit `src/test/java/projenrc.java` to add Spring Boot, configure Java 17, and
add a task for running the application:

```java
import io.github.cdklabs.projen.java.JavaProject;
import io.github.cdklabs.projen.java.JavaProjectOptions;
import io.github.cdklabs.projen.java.MavenCompileOptions;

public class projenrc {
    public static void main(String[] args) {
        final String springBootVersion = "4.0.6";

        JavaProject project = new JavaProject(JavaProjectOptions.builder()
            .artifactId("hello-spring")
            .groupId("org.acme")
            .name("hello-spring")
            .version("0.1.0")
            .junit(false)
            .sample(false)
            .compileOptions(MavenCompileOptions.builder()
                .source("17")
                .target("17")
                .build())
            .build());

        project.addDependency("org.springframework.boot/spring-boot-starter-webmvc@" + springBootVersion);
        project.addTestDependency("org.springframework.boot/spring-boot-starter-webmvc-test@" + springBootVersion);
        project.addPlugin("org.springframework.boot/spring-boot-maven-plugin@" + springBootVersion);
        project.getTestTask().execArgs(["mvn", "test"]);
        project.addTask("run").execArgs(["mvn", "spring-boot:run"]);

        project.synth();
    }
}
```

Run projen to synthesize the Maven configuration:

```shell
pnpm dlx projen
```

The default projen JUnit component is disabled so Spring Boot's test starter can
manage the test framework versions.

The initial Java project includes sample Java files. Remove
`src/main/java/org/acme/Main.java` and `src/test/java/org/acme/MyTest.java`
before adding the Spring Boot application.

## Add application code

Create `src/main/java/org/acme/HelloSpringApplication.java`:

```java
package org.acme;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HelloSpringApplication {
    public static void main(String[] args) {
        SpringApplication.run(HelloSpringApplication.class, args);
    }
}
```

Create `src/main/java/org/acme/HelloController.java`:

```java
package org.acme;

import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    @GetMapping("/")
    public Map<String, String> hello() {
        return Map.of("message", "Hello from Spring Boot and projen!");
    }
}
```

Create `src/test/java/org/acme/HelloSpringApplicationTest.java`:

```java
package org.acme;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class HelloSpringApplicationTest {
    @Test
    void contextLoads() {
    }
}
```

This smoke test verifies that the Spring application context starts
successfully.

## Build and run

Build the project:

```shell
pnpm dlx projen build
```

Start the application:

```shell
pnpm dlx projen run
```

In another terminal, call the endpoint:

```shell
curl http://localhost:8080
```

You should receive a JSON response:

```json
{"message":"Hello from Spring Boot and projen!"}
```

Since projen synthesizes the project configuration, update
`src/test/java/projenrc.java` and run `pnpm dlx projen` again whenever you need
to change dependencies, plugins, tasks, or other generated files.
