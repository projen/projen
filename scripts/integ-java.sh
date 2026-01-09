#!/bin/bash
set -euo pipefail

# Source common functions
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/integ-common.sh"

REPO_ROOT=$(get_repo_root)
JAVA_REPO_PATH="$REPO_ROOT/dist/java"

# Verify Java artifacts exist
if [ ! -d "$JAVA_REPO_PATH/io/github/cdklabs/projen" ]; then
  echo "ERROR: No projen Java artifacts found at $JAVA_REPO_PATH. Run 'node ./projen.js package:java' first." >&2
  exit 1
fi

# Test 1: Verify Java imports work by creating and running a projenrc
echo "=== Test 1: Java import compatibility ==="

# Install local projen artifacts to Maven cache, overwriting any existing version
echo "Installing local projen artifacts to Maven cache..."
mvn install:install-file \
  -Dfile="$JAVA_REPO_PATH/io/github/cdklabs/projen/0.0.0/projen-0.0.0.jar" \
  -DpomFile="$JAVA_REPO_PATH/io/github/cdklabs/projen/0.0.0/projen-0.0.0.pom" \
  -DgroupId=io.github.cdklabs \
  -DartifactId=projen \
  -Dversion=0.0.0 \
  -Dpackaging=jar \
  -q

setup_workdir

# Create a Maven project structure
mkdir -p src/main/java

# Detect Java version for compiler settings
JAVA_VERSION=$(java -version 2>&1 | head -1 | cut -d'"' -f2 | cut -d'.' -f1)
# Handle old-style version strings like "1.8.0" -> "8"
if [ "$JAVA_VERSION" = "1" ]; then
  JAVA_VERSION=$(java -version 2>&1 | head -1 | cut -d'"' -f2 | cut -d'.' -f2)
fi
echo "Detected Java version: $JAVA_VERSION"

# Create pom.xml
cat > pom.xml <<HERE
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>test</groupId>
    <artifactId>test-java-project</artifactId>
    <version>0.0.0</version>
    <packaging>jar</packaging>

    <properties>
        <maven.compiler.source>$JAVA_VERSION</maven.compiler.source>
        <maven.compiler.target>$JAVA_VERSION</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <dependencies>
        <dependency>
            <groupId>io.github.cdklabs</groupId>
            <artifactId>projen</artifactId>
            <version>0.0.0</version>
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
HERE

# Create a simple projenrc.java
cat > src/main/java/projenrc.java <<'HERE'
import io.github.cdklabs.projen.java.JavaProject;
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
HERE

# Compile and run the projenrc
echo "Compiling and running projenrc.java..."
mvn compile exec:java -Dexec.mainClass="projenrc" -q

# Verify synthesis produced expected files
verify_synth_version

echo "Java import compatibility test passed!"
