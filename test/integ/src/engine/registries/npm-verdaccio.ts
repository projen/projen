import type { ChildProcess } from "child_process";
import { spawn } from "child_process";
import * as http from "http";
import * as net from "net";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { run } from "../command";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * A local npm registry backed by Verdaccio, run as a child process.
 *
 * Serves the prebuilt projen npm tarball (`dist/js/*.tgz`) to any Node package
 * manager (npm/yarn/pnpm/bun) so they can resolve `projen@<version>` by name -
 * exactly as a downstream consumer would - without touching the public
 * registry. This replaces the previous `npm install <tarball> --no-save`
 * shortcut and lets us exercise the full package-manager matrix.
 *
 * Implementation notes:
 *  - Verdaccio runs as a child process (its CLI), not embedded. The embedded
 *    programmatic server does not complete authenticated `npm publish` PUTs
 *    (the request stalls); the CLI server handles them normally.
 *  - It binds explicitly to `127.0.0.1`. Verdaccio's default `localhost` can
 *    resolve to IPv6 `::1`, which then mismatches IPv4 clients.
 *  - All traffic is local (uplinks disabled), so tests run fully offline.
 */
export class NpmRegistry {
  /**
   * Starts Verdaccio on a free loopback port and provisions a publish token.
   */
  public static async start(): Promise<NpmRegistry> {
    const storage = fs.mkdtempSync(path.join(os.tmpdir(), "verdaccio-"));
    const port = await freePort();
    const url = `http://127.0.0.1:${port}/`;

    const configPath = path.join(storage, "config.yaml");
    fs.writeFileSync(configPath, renderConfig(storage));

    // Resolve verdaccio's bin JS and run it with `node` (cross-platform: avoids
    // depending on the platform-specific `.cmd`/shell shim).
    const verdaccioBin = path.join(
      path.dirname(require.resolve("verdaccio/package.json")),
      "bin",
      "verdaccio",
    );

    const child = spawn(
      process.execPath,
      [verdaccioBin, "--config", configPath, "--listen", `127.0.0.1:${port}`],
      { stdio: "ignore" },
    );

    const registry = new NpmRegistry(child, url, storage);
    await registry.waitUntilReady();
    registry.token = await registry.createUser();
    return registry;
  }

  private token = "";

  private constructor(
    private readonly child: ChildProcess,
    public readonly url: string,
    private readonly storageDir: string,
  ) {}

  /** The `host:port` part of the registry URL. */
  public get hostPort(): string {
    return this.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }

  /**
   * Publishes a prebuilt npm tarball to the registry. Fast (<1s) and offline.
   */
  public publish(tarball: string): void {
    const npmrc = path.join(this.storageDir, "publish.npmrc");
    fs.writeFileSync(
      npmrc,
      [
        `registry=${this.url}`,
        `//${this.hostPort}/:_authToken=${this.token}`,
        "",
      ].join("\n"),
    );

    run("npm", ["publish", tarball, "--registry", this.url, "--fetch-retries=0"], {
      env: {
        npm_config_userconfig: npmrc,
        npm_config_globalconfig: path.join(this.storageDir, "empty-global"),
      },
      throwOnError: true,
      timeout: 60_000,
    });
  }

  /**
   * Stops the registry and removes its storage.
   */
  public async stop(): Promise<void> {
    this.child.kill("SIGKILL");
    fs.rmSync(this.storageDir, { recursive: true, force: true });
  }

  /** Polls `/-/ping` until the registry answers or the timeout elapses. */
  private async waitUntilReady(timeoutMs = 30_000): Promise<void> {
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
      if (await this.ping()) {
        return;
      }
      await sleep(200);
    }
    throw new Error(`Verdaccio did not become ready within ${timeoutMs}ms`);
  }

  private ping(): Promise<boolean> {
    return new Promise((resolve) => {
      const req = http.get(`${this.url}-/ping`, (res) => {
        res.resume();
        resolve(res.statusCode === 200);
      });
      req.on("error", () => resolve(false));
      req.setTimeout(1000, () => {
        req.destroy();
        resolve(false);
      });
    });
  }

  /**
   * Creates a user via `/-/user` (the `npm adduser` protocol) and returns its
   * auth token. Verdaccio's `$all` publish policy still requires the npm client
   * to present a *valid* token, so we mint one.
   */
  private createUser(): Promise<string> {
    const id = "org.couchdb.user:integ";
    const payload = Buffer.from(
      JSON.stringify({
        _id: id,
        name: "integ",
        password: "integ",
        type: "user",
        roles: [],
        date: new Date().toISOString(),
      }),
    );

    return new Promise<string>((resolve, reject) => {
      const u = new URL(`${this.url}-/user/${id}`);
      const req = http.request(
        {
          method: "PUT",
          hostname: u.hostname,
          port: u.port,
          path: u.pathname,
          headers: {
            "content-type": "application/json",
            "content-length": payload.length,
          },
        },
        (res) => {
          let body = "";
          res.on("data", (d) => (body += d));
          res.on("end", () => {
            try {
              const token = JSON.parse(body).token;
              if (!token) {
                reject(
                  new Error(
                    `Verdaccio user-create returned no token (status ${res.statusCode}): ${body}`,
                  ),
                );
              } else {
                resolve(token);
              }
            } catch {
              reject(
                new Error(
                  `Failed to parse Verdaccio user-create response: ${body}`,
                ),
              );
            }
          });
        },
      );
      req.on("error", reject);
      req.setTimeout(15_000, () =>
        req.destroy(new Error("timed out creating Verdaccio user")),
      );
      req.write(payload);
      req.end();
    });
  }
}

/** Finds a free TCP port on the loopback interface. */
function freePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const s = net.createServer();
    s.on("error", reject);
    s.listen(0, "127.0.0.1", () => {
      const port = (s.address() as net.AddressInfo).port;
      s.close(() => resolve(port));
    });
  });
}

/** Renders a Verdaccio config: projen served locally, everything else proxied. */
function renderConfig(storage: string): string {
  return [
    `storage: ${path.join(storage, "storage")}`,
    `auth:`,
    `  htpasswd:`,
    `    file: ${path.join(storage, "htpasswd")}`,
    `    max_users: 1000`,
    `uplinks:`,
    `  npmjs:`,
    `    url: https://registry.npmjs.org/`,
    `    cache: true`,
    `    maxage: 30m`,
    `packages:`,
    // projen is served ONLY from local storage (our freshly published build).
    `  'projen':`,
    `    access: $all`,
    `    publish: $all`,
    `    unpublish: $all`,
    // Everything else (the project's other deps) proxies to the public registry.
    `  '@*/*':`,
    `    access: $all`,
    `    publish: $all`,
    `    proxy: npmjs`,
    `  '**':`,
    `    access: $all`,
    `    publish: $all`,
    `    proxy: npmjs`,
    `log: { type: stdout, format: pretty, level: error }`,
    ``,
  ].join("\n");
}
