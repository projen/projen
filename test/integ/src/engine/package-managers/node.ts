import * as fs from "fs";
import * as path from "path";
import type { PackageManager } from "./types";
import type { CommandResult, RunOptions } from "../command";
import { run } from "../command";

/**
 * Ensures a minimal `package.json` exists so package managers have a project to
 * install into.
 */
function ensurePackageJson(dir: string): void {
  const pkg = path.join(dir, "package.json");
  if (!fs.existsSync(pkg)) {
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
      pkg,
      JSON.stringify(
        { name: "integ-consumer", version: "0.0.0", private: true },
        null,
        2,
      ),
    );
  }
}

/** Whether a binary is resolvable on PATH. */
function binaryAvailable(bin: string): boolean {
  const result = run(bin, ["--version"]);
  return result.code === 0;
}

interface NodePmSpec {
  readonly id: string;
  /** The CLI binary name. */
  readonly bin: string;
  /** Builds the install argv for a given spec. */
  readonly installArgs: (spec: string) => string[];
  /** Writes registry config into the project dir. */
  readonly writeRegistry: (dir: string, url: string, hostPort: string) => void;
  /** Optional availability override (defaults to "binary responds to --version"). */
  readonly available?: () => boolean;
}

/**
 * Writes a standard `.npmrc` understood by npm, yarn-classic and pnpm.
 *
 * Only the registry is set - reads from the local `$all` registry are
 * anonymous, so no auth token is needed (and an invalid token can stall token
 * verification).
 */
function writeNpmrc(dir: string, url: string, _hostPort: string): void {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, ".npmrc"), [`registry=${url}`, ""].join("\n"));
}

const NODE_PMS: NodePmSpec[] = [
  {
    id: "npm",
    bin: "npm",
    installArgs: (spec) => ["install", spec, "--save"],
    writeRegistry: writeNpmrc,
  },
  {
    id: "yarn",
    bin: "yarn",
    installArgs: (spec) => ["add", spec],
    // Write config for BOTH yarn majors: classic (v1) reads `.npmrc`, berry
    // (v2+) reads `.yarnrc.yml`. Writing both makes this work regardless of
    // which yarn is on PATH (they share the `yarn` binary name, so we can't
    // reliably tell them apart up front). Berry also needs the node-modules
    // linker so `node_modules/projen/bin/projen` resolves like the others.
    writeRegistry: (dir, url, hostPort) => {
      writeNpmrc(dir, url, hostPort);
      fs.writeFileSync(
        path.join(dir, ".yarnrc.yml"),
        [
          `npmRegistryServer: "${url}"`,
          `unsafeHttpWhitelist:`,
          `  - "127.0.0.1"`,
          `nodeLinker: node-modules`,
          `enableTelemetry: false`,
          "",
        ].join("\n"),
      );
    },
  },
  {
    id: "pnpm",
    bin: "pnpm",
    installArgs: (spec) => ["add", spec],
    writeRegistry: writeNpmrc,
  },
  {
    id: "bun",
    bin: "bun",
    installArgs: (spec) => ["add", spec],
    // Bun reads bunfig.toml for the registry; also drop an .npmrc for good measure.
    writeRegistry: (dir, url, hostPort) => {
      writeNpmrc(dir, url, hostPort);
      fs.writeFileSync(
        path.join(dir, "bunfig.toml"),
        [`[install]`, `registry = "${url}"`, ""].join("\n"),
      );
    },
  },
];

class NodePackageManagerImpl implements PackageManager {
  constructor(private readonly spec: NodePmSpec) {}

  public get id(): string {
    return this.spec.id;
  }

  public isAvailable(): boolean {
    return this.spec.available
      ? this.spec.available()
      : binaryAvailable(this.spec.bin);
  }

  public configureRegistry(dir: string, registryUrl: string): void {
    const hostPort = registryUrl
      .replace(/^https?:\/\//, "")
      .replace(/\/$/, "");
    this.spec.writeRegistry(dir, registryUrl, hostPort);
  }

  public install(dir: string, spec: string): CommandResult {
    ensurePackageJson(dir);
    return run(this.spec.bin, this.spec.installArgs(spec), {
      cwd: dir,
      throwOnError: true,
      // Installs are from a local registry and should be quick. Bound them so a
      // misconfigured/hung manager fails fast instead of stalling the suite up
      // to the global Jest testTimeout.
      timeout: 180_000,
    });
  }
}

/** All Node package managers the harness knows about. */
export const NODE_PACKAGE_MANAGERS: PackageManager[] = NODE_PMS.map(
  (s) => new NodePackageManagerImpl(s),
);

/**
 * Runs the projen CLI that was installed into `dir` (by any package manager).
 *
 * Invokes `node <dir>/node_modules/projen/bin/projen ...` directly, which is
 * uniform and cross-platform regardless of which package manager performed the
 * install (npm/yarn/pnpm/bun all place the package at that path; yarn-berry is
 * configured to use the node-modules linker).
 */
export function runProjenCli(
  dir: string,
  args: string[],
  options: RunOptions = {},
): CommandResult {
  const cli = path.join(dir, "node_modules", "projen", "bin", "projen");
  return run("node", [cli, ...args], { cwd: dir, ...options });
}
