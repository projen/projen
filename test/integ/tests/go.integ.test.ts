import * as path from "path";
import { run } from "../src/engine/command";
import { GoModule } from "../src/engine/registries/go-proxy";
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
 * Go integration suite. Replaces scripts/integ-go.sh.
 *
 * Consumes the packaged projen Go module (dist/go/projen) via a local
 * `replace` directive, runs a projenrc.go that synthesizes a Project, and
 * asserts tree.json records the built version.
 *
 * Skipped when the Go module or the go toolchain are unavailable.
 */

function goModuleDir(): string | undefined {
  try {
    return tryArtifacts()?.goModule;
  } catch {
    return undefined;
  }
}

const moduleDir = goModuleDir();
const enabled = !!moduleDir && toolAvailable("go", "version");
const suite = enabled ? describe : describe.skip;

if (!moduleDir) {
  // eslint-disable-next-line no-console
  console.warn("[go] skipped: no dist/go. Run `npx projen package:go` first.");
} else if (!enabled) {
  // eslint-disable-next-line no-console
  console.warn("[go] skipped: go toolchain not available.");
}

suite("go", () => {
  const artifacts = Artifacts.resolve();
  const version = artifacts.version;
  const goModule = new GoModule(artifacts.goModule);

  test("imports and synthesizes from the packaged Go module", () => {
    const ws = Workspace.create();
    try {
      const env = { NODE_ENV: undefined, GOFLAGS: "-mod=mod" };

      expectExit(
        run("go", ["mod", "init", "test-go-project"], {
          cwd: ws.dir,
          env,
          timeout: 120_000,
        }),
        0,
      );
      expectExit(
        run("go", ["mod", "edit", "-replace", goModule.replaceDirective], {
          cwd: ws.dir,
          env,
          timeout: 120_000,
        }),
        0,
      );

      ws.write(
        "projenrc.go",
        `package main

import (
	"github.com/aws/jsii-runtime-go"
	"github.com/projen/projen-go/projen"
)

func main() {
	project := projen.NewProject(&projen.ProjectOptions{
		Name:        jsii.String("test-go-project"),
		ProjectTree: jsii.Bool(true),
	})
	project.Synth()
}
`,
      );

      expectExit(
        run("go", ["mod", "tidy"], { cwd: ws.dir, env, timeout: 300_000 }),
        0,
      );
      expectExit(
        run("go", ["run", "projenrc.go"], {
          cwd: ws.dir,
          env,
          timeout: 300_000,
        }),
        0,
      );

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
