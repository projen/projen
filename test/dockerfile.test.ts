import { synthSnapshot, TestProject } from "./util";
import { Dockerfile } from "../src";

test("dockerfile synthesizes correctly", () => {
  const prj = new TestProject();

  new Dockerfile(prj, "Dockerfile", {
    stages: [
      {
        fromImage: "node:18",
        id: "builder",
        instructions: [
          { command: "WORKDIR", arguments: "/app" },
          { command: "COPY", arguments: "package*.json ." },
          { command: "RUN", arguments: "npm ci" },
          { command: "COPY", arguments: ". ." },
          { command: "RUN", arguments: "npm run build" },
        ],
      },
      {
        fromImage: "node:18-slim",
        instructions: [
          { command: "WORKDIR", arguments: "/app" },
          { command: "COPY", arguments: "--from=builder /app/dist ." },
          { command: "CMD", arguments: '["node","index.js"]' },
        ],
      },
    ],
    marker: false,
  });

  expect(synthSnapshot(prj).Dockerfile).toStrictEqual(
    [
      "FROM node:18 AS builder",
      "WORKDIR /app",
      "COPY package*.json .",
      "RUN npm ci",
      "COPY . .",
      "RUN npm run build",
      "",
      "FROM node:18-slim",
      "WORKDIR /app",
      "COPY --from=builder /app/dist .",
      'CMD ["node","index.js"]',
      "", // new line at end of file
    ].join("\n")
  );
});

test("dockerfile synthesizes correctly using imperative API", () => {
  const prj = new TestProject();
  const dockerfile = new Dockerfile(prj, "Dockerfile", {
    marker: false,
  });

  // Build stage
  const buildStage = dockerfile.addStage({
    fromImage: "node:18",
    id: "builder",
  });

  buildStage
    .workdir("/app")
    .copy({ src: "package*.json", dest: "." })
    .run({
      command: "npm ci",
      mounts: ["type=cache,target=/root/.npm"],
    })
    .copy({ src: ".", dest: "." })
    .run({ command: "npm run build" });

  // Production stage
  const prodStage = dockerfile.addStage({
    fromImage: "node:18-slim",
  });

  prodStage
    .workdir("/app")
    .copy({
      from: "builder",
      src: "/app/dist",
      dest: ".",
    })
    .env({
      NODE_ENV: "production",
      PORT: "3000",
    })
    .expose(3000)
    .healthcheck({
      command: ["CMD-SHELL", "curl -f http://localhost:3000/health || exit 1"],
      interval: "30s",
      timeout: "5s",
      retries: 3,
    })
    .user("node")
    .cmd(["node", "index.js"]);

  expect(synthSnapshot(prj).Dockerfile).toStrictEqual(
    [
      "FROM node:18 AS builder",
      "WORKDIR /app",
      "COPY package*.json .",
      "RUN --mount=type=cache,target=/root/.npm npm ci",
      "COPY . .",
      "RUN npm run build",
      "",
      "FROM node:18-slim",
      "WORKDIR /app",
      "COPY --from=builder /app/dist .",
      'ENV NODE_ENV="production" PORT="3000"',
      "EXPOSE 3000",
      "HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD CMD-SHELL curl -f http://localhost:3000/health || exit 1",
      "USER node",
      'CMD ["node","index.js"]',
      "", // new line at end of file
    ].join("\n")
  );
});

test("dockerfile stage reference by index", () => {
  const prj = new TestProject();
  const dockerfile = new Dockerfile(prj, "Dockerfile", {
    marker: false,
  });

  dockerfile.addStage({ fromImage: "node:18" });
  const prodStage = dockerfile.addStage({ fromImage: "node:18-slim" });

  prodStage.copy({
    from: 0,
    src: "dist",
    dest: "/app",
  });

  expect(synthSnapshot(prj).Dockerfile).toStrictEqual(
    [
      "FROM node:18",
      "",
      "FROM node:18-slim",
      "COPY --from=0 dist /app",
      "", // new line at end of file
    ].join("\n")
  );
});

test("dockerfile platform specification", () => {
  const prj = new TestProject();
  const dockerfile = new Dockerfile(prj, "Dockerfile", {
    marker: false,
  });

  dockerfile.addStage({
    fromImage: "node:18",
    platform: "linux/amd64",
  });

  expect(synthSnapshot(prj).Dockerfile).toStrictEqual(
    ["FROM --platform=linux/amd64 node:18", ""].join("\n")
  );
});

test("dockerfile instruction validation", () => {
  const prj = new TestProject();
  const dockerfile = new Dockerfile(prj, "Dockerfile", { marker: false });
  const stage = dockerfile.addStage({ fromImage: "ubuntu:20.04" });

  // Test all key instruction methods
  stage
    .arg('DEBIAN_FRONTEND="noninteractive"')
    .env({ NODE_ENV: "production" })
    .label({
      '"org.opencontainers.image.source"': "https://github.com/org/repo",
      version: "1.0.0",
      abc: "1 2 3",
    })
    .expose(3000)
    .volume("/data")
    .user("node")
    .workdir("/app")
    .shell(["/bin/bash", "-c"])
    .stopsignal("SIGTERM")
    .healthcheck({
      command: ["curl", "-f", "http://localhost:3000/health"],
      interval: "30s",
      timeout: "10s",
      retries: 3,
      startPeriod: "40s",
      startInterval: "5s",
    });

  expect(synthSnapshot(prj).Dockerfile).toStrictEqual(
    [
      "FROM ubuntu:20.04",
      'ARG DEBIAN_FRONTEND="noninteractive"',
      'ENV NODE_ENV="production"',
      'LABEL "org.opencontainers.image.source"="https://github.com/org/repo" version="1.0.0" abc="1 2 3"',
      "EXPOSE 3000",
      "VOLUME /data",
      "USER node",
      "WORKDIR /app",
      'SHELL ["/bin/bash","-c"]',
      "STOPSIGNAL SIGTERM",
      "HEALTHCHECK --interval=30s --timeout=10s --retries=3 --start-period=40s --start-interval=5s CMD curl -f http://localhost:3000/health",
      "",
    ].join("\n")
  );
});

test("dockerfile copy and add instructions with various formats", () => {
  const prj = new TestProject();
  const dockerfile = new Dockerfile(prj, "Dockerfile", { marker: false });
  const stage = dockerfile.addStage({ fromImage: "node:18" });

  stage
    // Test COPY with single source
    .copy({
      src: "package.json",
      dest: "/app/",
      chmod: "644",
      chown: "node:node",
    })
    // Test COPY with multiple sources
    .copy({
      src: ["package.json", "yarn.lock"],
      dest: "/app/",
      link: true,
    })
    // Test ADD with URL and checksum
    .add({
      src: "https://example.com/package.tgz",
      dest: "/app/",
      checksum: "sha256:a3bd82b3bd48d4b",
    })
    // Test ADD with git repo
    .add({
      src: "https://github.com/org/repo.git",
      dest: "/app/source",
      keepGitDir: true,
    });

  expect(synthSnapshot(prj).Dockerfile).toStrictEqual(
    [
      "FROM node:18",
      "COPY --chown=node:node --chmod=644 package.json /app/",
      'COPY --link ["package.json","yarn.lock","/app/"]',
      "ADD --checksum=sha256:a3bd82b3bd48d4b https://example.com/package.tgz /app/",
      "ADD --keep-git-dir https://github.com/org/repo.git /app/source",
      "",
    ].join("\n")
  );
});

test("dockerfile run instruction with various options", () => {
  const prj = new TestProject();
  const dockerfile = new Dockerfile(prj, "Dockerfile", { marker: false });
  const stage = dockerfile.addStage({ fromImage: "ubuntu:20.04" });

  stage
    // Test RUN with string command
    .run({
      command: "apt-get update && apt-get install -y curl",
    })
    // Test RUN with array command
    .run({
      command: ["npm", "install", "--production"],
    })
    // Test RUN with all options
    .run({
      command: "npm ci",
      mounts: ["type=cache,target=/root/.npm", "type=secret,id=npm_token"],
      network: "none",
      security: "insecure",
    });

  expect(synthSnapshot(prj).Dockerfile).toStrictEqual(
    [
      "FROM ubuntu:20.04",
      "RUN apt-get update && \\",
      "  apt-get install -y curl",
      'RUN ["npm","install","--production"]',
      "RUN --mount=type=cache,target=/root/.npm --mount=type=secret,id=npm_token --network=none --security=insecure npm ci",
      "",
    ].join("\n")
  );
});

test("dockerfile error handling", () => {
  const prj = new TestProject();
  const dockerfile = new Dockerfile(prj, "Dockerfile", { marker: false });
  const stage = dockerfile.addStage({ fromImage: "node:18" });

  // Test healthcheck validation
  expect(() =>
    stage.healthcheck({
      command: [],
      disable: false,
    })
  ).toThrow(
    "command is required when healthcheck is not disabled and must not be empty"
  );

  // Test stage reference validation
  expect(dockerfile.tryFindStage("nonexistent")).toBeUndefined();
});

test("dockerfile with multiple similar stages", () => {
  const prj = new TestProject();
  const dockerfile = new Dockerfile(prj, "Dockerfile", { marker: false });

  // Test stage name conflicts
  dockerfile.addStage({ fromImage: "node:18", id: "build" });
  dockerfile.addStage({ fromImage: "node:18", id: "build-2" });

  const stage = dockerfile.tryFindStage("build");
  expect(stage).toBeDefined();
  expect(stage?.id).toBe("build");
});
