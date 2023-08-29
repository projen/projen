import * as child_process from "child_process";
import * as fs from "fs";
import * as path from "path";
import { DockerCompose, DockerComposeProtocol, YamlFile } from "../../src/";
import * as logging from "../../src/logging";
import { TestProject } from "../util";

logging.disable();

describe("docker-compose", () => {
  test("errors when no services", () => {
    const project = new TestProject();
    new DockerCompose(project);

    expect(() => project.synth()).toThrow(/at least one service/i);
  });

  test("errors when imageBuild and image not specified in service", () => {
    const project = new TestProject();
    const dc = new DockerCompose(project);

    expect(() => dc.addService("service", {})).toThrow(
      /requires exactly one of.*imageBuild.*image/i
    );
  });

  test("errors when imageBuild and image are both specified in service", () => {
    const project = new TestProject();
    const dc = new DockerCompose(project);

    expect(() =>
      dc.addService("service", {
        image: "nginx",
        imageBuild: {
          context: ".",
        },
      })
    ).toThrow(/requires exactly one of.*imageBuild.*image/i);
  });

  test("errors when version tag is not a number", () => {
    const project = new TestProject();
    expect(
      () =>
        new DockerCompose(project, {
          schemaVersion: "blub",
          services: {
            myservice: {
              image: "nginx",
            },
          },
        })
    ).toThrow(/Version tag needs to be a number/i);
  });

  test("exposes file as property", () => {
    const project = new TestProject();

    const dc = new DockerCompose(project, {
      schemaVersion: "3.1",
      services: {
        myservice: {
          image: "nginx",
        },
      },
    });

    expect(dc.file).toBeInstanceOf(YamlFile);
    expect(dc.file.path).toEqual("docker-compose.yml");
  });

  test("version tag explicit set and created as float", () => {
    const project = new TestProject();

    const dc = new DockerCompose(project, {
      schemaVersion: "3.1",
      services: {
        myservice: {
          image: "nginx",
        },
      },
    });

    expect(dc._synthesizeDockerCompose()).toEqual({
      version: "3.1",
      services: {
        myservice: {
          image: "nginx",
        },
      },
    });

    project.synth();
    assertDockerComposeFileValidates(project.outdir);
  });

  test("version tag explicit set and created as int", () => {
    const project = new TestProject();

    const dc = new DockerCompose(project, {
      schemaVersion: "3",
      services: {
        myservice: {
          image: "nginx",
        },
      },
    });

    expect(dc._synthesizeDockerCompose()).toEqual({
      version: "3",
      services: {
        myservice: {
          image: "nginx",
        },
      },
    });

    project.synth();
    assertDockerComposeFileValidates(project.outdir);
  });

  test("version tag defaults to 3.3 when not set", () => {
    const project = new TestProject();

    const dc = new DockerCompose(project, {
      services: {
        myservice: {
          image: "nginx",
        },
      },
    });

    expect(dc._synthesizeDockerCompose()).toEqual({
      version: "3.3",
      services: {
        myservice: {
          image: "nginx",
        },
      },
    });

    project.synth();
    assertDockerComposeFileValidates(project.outdir);
  });

  test("can build an image", () => {
    const project = new TestProject();

    const dc = new DockerCompose(project, {
      services: {
        custom: {
          imageBuild: {
            context: ".",
            dockerfile: "docker-compose.test.Dockerfile",
            args: {
              FROM: "alpine",
            },
          },
          command: ["sh", "-c", "echo hi"],
        },
      },
    });

    expect(dc._synthesizeDockerCompose()).toEqual({
      version: "3.3",
      services: {
        custom: {
          build: {
            context: ".",
            dockerfile: "docker-compose.test.Dockerfile",
            args: {
              FROM: "alpine",
            },
          },
          command: ["sh", "-c", "echo hi"],
        },
      },
    });

    project.synth();
    assertDockerComposeFileValidates(project.outdir);
  });

  test("can choose a name suffix for the docker-compose.yml", () => {
    const project = new TestProject();
    const dc = new DockerCompose(project, {
      nameSuffix: "myname",
      services: {
        myservice: {
          image: "nginx",
        },
      },
    });

    project.synth();
    expect(dc.file.path).toEqual("docker-compose.myname.yml");
    expect(
      fs.existsSync(path.join(project.outdir, "docker-compose.myname.yml"))
    );
  });

  test("can add a container command", () => {
    const project = new TestProject();
    const dc = new DockerCompose(project, {
      services: {
        alpine: {
          image: "alpine",
          command: ["sh", "-c", "echo I ran"],
        },
      },
    });

    expect(dc._synthesizeDockerCompose()).toEqual({
      version: "3.3",
      services: {
        alpine: {
          image: "alpine",
          command: ["sh", "-c", "echo I ran"],
        },
      },
    });

    project.synth();
    assertDockerComposeFileValidates(project.outdir);
  });

  test("can add a container entrypoint", () => {
    const project = new TestProject();
    const dc = new DockerCompose(project, {
      services: {
        alpine: {
          image: "alpine",
          entrypoint: ["sh"],
        },
      },
    });

    expect(dc._synthesizeDockerCompose()).toEqual({
      version: "3.3",
      services: {
        alpine: {
          image: "alpine",
          entrypoint: ["sh"],
        },
      },
    });

    project.synth();
    assertDockerComposeFileValidates(project.outdir);
  });

  describe("can add a volume", () => {
    test("bind volume", () => {
      const project = new TestProject();
      const dc = new DockerCompose(project, {
        services: {
          myservice: {
            image: "nginx",
            volumes: [DockerCompose.bindVolume("./docroot", "/var/www/html")],
          },
        },
      });

      expect(dc._synthesizeDockerCompose()).toEqual({
        version: "3.3",
        services: {
          myservice: {
            image: "nginx",
            volumes: [
              {
                type: "bind",
                source: "./docroot",
                target: "/var/www/html",
              },
            ],
          },
        },
      });

      project.synth();
      assertDockerComposeFileValidates(project.outdir);
    });

    test("named volume", () => {
      const project = new TestProject();
      const dc = new DockerCompose(project, {
        services: {
          myservice: {
            image: "nginx",
            volumes: [DockerCompose.namedVolume("html", "/var/www/html")],
          },
        },
      });

      expect(dc._synthesizeDockerCompose()).toEqual({
        version: "3.3",
        services: {
          myservice: {
            image: "nginx",
            volumes: [
              {
                type: "volume",
                source: "html",
                target: "/var/www/html",
              },
            ],
          },
        },
        volumes: {
          html: {},
        },
      });

      project.synth();
      assertDockerComposeFileValidates(project.outdir);
    });

    test("named volume with special driver", () => {
      const project = new TestProject();
      const dc = new DockerCompose(project, {
        services: {
          web: {
            image: "nginx",
            volumes: [
              DockerCompose.namedVolume("web", "/var/www/html", {
                driverOpts: {
                  type: "nfs",
                  o: "addr=10.40.0.199,nolock,soft,rw",
                  device: ":/docker/example",
                },
              }),
            ],
          },
        },
      });

      expect(dc._synthesizeDockerCompose()).toEqual({
        version: "3.3",
        services: {
          web: {
            image: "nginx",
            volumes: [
              {
                type: "volume",
                source: "web",
                target: "/var/www/html",
              },
            ],
          },
        },
        volumes: {
          web: {
            driver_opts: {
              type: "nfs",
              o: "addr=10.40.0.199,nolock,soft,rw",
              device: ":/docker/example",
            },
          },
        },
      });

      project.synth();
      assertDockerComposeFileValidates(project.outdir);
    });

    test("imperatively", () => {
      const project = new TestProject();
      const dc = new DockerCompose(project);

      const service = dc.addService("myservice", {
        image: "nginx",
      });
      service.addVolume(DockerCompose.namedVolume("html", "/var/www/html"));

      expect(dc._synthesizeDockerCompose()).toEqual({
        version: "3.3",
        services: {
          myservice: {
            image: "nginx",
            volumes: [
              {
                type: "volume",
                source: "html",
                target: "/var/www/html",
              },
            ],
          },
        },
        volumes: {
          html: {},
        },
      });

      project.synth();
      assertDockerComposeFileValidates(project.outdir);
    });
  });

  describe("can map a port", () => {
    const expected = {
      version: "3.3",
      services: {
        port: {
          image: "nginx",
          ports: [
            {
              published: 8080,
              target: 80,
              protocol: "tcp",
              mode: "host",
            },
            {
              published: 8080,
              target: 80,
              protocol: "udp",
              mode: "host",
            },
          ],
        },
      },
    };

    test("declaratively", () => {
      const project = new TestProject();
      const dc = new DockerCompose(project, {
        services: {
          port: {
            image: "nginx",
            ports: [
              DockerCompose.portMapping(8080, 80),
              DockerCompose.portMapping(8080, 80, {
                protocol: DockerComposeProtocol.UDP,
              }),
            ],
          },
        },
      });

      expect(dc._synthesizeDockerCompose()).toEqual(expected);

      project.synth();
      assertDockerComposeFileValidates(project.outdir);
    });

    test("imperatively", () => {
      const project = new TestProject();
      const dc = new DockerCompose(project);

      const service = dc.addService("port", {
        image: "nginx",
      });

      service.addPort(8080, 80);
      service.addPort(8080, 80, {
        protocol: DockerComposeProtocol.UDP,
      });

      expect(dc._synthesizeDockerCompose()).toEqual(expected);

      project.synth();
      assertDockerComposeFileValidates(project.outdir);
    });
  });

  describe("can add depends_on", () => {
    const expected = {
      version: "3.3",
      services: {
        first: { image: "alpine" },
        second: {
          depends_on: ["first"],
          image: "nginx",
        },
      },
    };

    test("declaratively", () => {
      const project = new TestProject();
      const dc = new DockerCompose(project, {
        services: {
          first: { image: "alpine" },
          second: {
            dependsOn: [DockerCompose.serviceName("first")],
            image: "nginx",
          },
        },
      });

      expect(dc._synthesizeDockerCompose()).toEqual(expected);

      project.synth();
      assertDockerComposeFileValidates(project.outdir);
    });

    test("imperatively", () => {
      const project = new TestProject();
      const dc = new DockerCompose(project);

      const first = dc.addService("first", { image: "alpine" });
      const second = dc.addService("second", { image: "nginx" });
      second.addDependsOn(first);

      expect(dc._synthesizeDockerCompose()).toEqual(expected);

      project.synth();
      assertDockerComposeFileValidates(project.outdir);
    });
  });

  describe("can add environment variables", () => {
    const expected = {
      version: "3.3",
      services: {
        www: {
          image: "nginx",
          environment: {
            FOO: "bar",
            Baz: "xyz",
          },
        },
      },
    };

    test("declaratively", () => {
      const project = new TestProject();
      const dc = new DockerCompose(project, {
        services: {
          www: {
            image: "nginx",
            environment: {
              FOO: "bar",
              Baz: "xyz",
            },
          },
        },
      });

      expect(dc._synthesizeDockerCompose()).toEqual(expected);

      project.synth();
      assertDockerComposeFileValidates(project.outdir);
    });

    test("imperatively", () => {
      const project = new TestProject();
      const dc = new DockerCompose(project);

      const service = dc.addService("www", {
        image: "nginx",
      });

      service.addEnvironment("FOO", "bar");
      service.addEnvironment("Baz", "xyz");

      expect(dc._synthesizeDockerCompose()).toEqual(expected);

      project.synth();
      assertDockerComposeFileValidates(project.outdir);
    });
  });

  describe("can add a network", () => {
    test("declaratively", () => {
      const project = new TestProject();
      const dc = new DockerCompose(project, {
        services: {
          myservice: {
            image: "nginx",
            networks: [DockerCompose.network("webapp")],
          },
        },
      });

      expect(dc._synthesizeDockerCompose()).toEqual({
        version: "3.3",
        services: {
          myservice: {
            image: "nginx",
            networks: ["webapp"],
          },
        },
        networks: {
          webapp: {},
        },
      });

      project.synth();
      assertDockerComposeFileValidates(project.outdir);
    });

    test("imperatively", () => {
      const project = new TestProject();
      const dc = new DockerCompose(project);

      const service = dc.addService("myservice", {
        image: "nginx",
      });
      service.addNetwork(
        DockerCompose.network("webapp", {
          attachable: true,
          driver: "bridge",
          driverOpts: {
            test: "123",
          },
          labels: ["label1=value1"],
          internal: true,
          ipam: {
            driver: "default",
            config: [
              {
                subnet: "172.28.0.0/16",
              },
            ],
          },
          name: "webapp",
        })
      );

      expect(dc._synthesizeDockerCompose()).toEqual({
        version: "3.3",
        services: {
          myservice: {
            image: "nginx",
            networks: ["webapp"],
          },
        },
        networks: {
          webapp: {
            attachable: true,
            driver: "bridge",
            driver_opts: {
              test: "123",
            },
            labels: ["label1=value1"],
            internal: true,
            ipam: {
              driver: "default",
              config: [
                {
                  subnet: "172.28.0.0/16",
                },
              ],
            },
            name: "webapp",
          },
        },
      });

      project.synth();
      assertDockerComposeFileValidates(project.outdir);
    });
  });

  describe("can add a label", () => {
    test("declaratively", () => {
      const project = new TestProject();
      const dc = new DockerCompose(project, {
        services: {
          myservice: {
            image: "nginx",
            labels: {
              myLabel: "myvalue",
            },
          },
        },
      });

      expect(dc._synthesizeDockerCompose()).toEqual({
        version: "3.3",
        services: {
          myservice: {
            image: "nginx",
            labels: {
              myLabel: "myvalue",
            },
          },
        },
      });

      project.synth();
      assertDockerComposeFileValidates(project.outdir);
    });

    test("imperatively", () => {
      const project = new TestProject();
      const dc = new DockerCompose(project);

      const service = dc.addService("myservice", {
        image: "nginx",
      });
      service.addLabel("my.label", "my_value");

      expect(dc._synthesizeDockerCompose()).toEqual({
        version: "3.3",
        services: {
          myservice: {
            image: "nginx",
            labels: {
              "my.label": "my_value",
            },
          },
        },
      });

      project.synth();
      assertDockerComposeFileValidates(project.outdir);
    });
  });

  test("errors when a service reference by name does not exist", () => {
    const project = new TestProject();

    new DockerCompose(project, {
      services: {
        www: {
          image: "nginx",
          dependsOn: [DockerCompose.serviceName("nope")],
        },
      },
    });

    expect(() => project.synth()).toThrow(/unable to resolve.*nope.*www/i);
  });

  test("errors when a service depends on itself", () => {
    const project = new TestProject();

    new DockerCompose(project, {
      services: {
        www: {
          image: "nginx",
          dependsOn: [DockerCompose.serviceName("www")],
        },
      },
    });

    expect(() => project.synth()).toThrow(/depend on itself/i);
  });

  describe("can create a wordpress dev env", () => {
    const expected = {
      version: "3.3",
      services: {
        setup: {
          image: "alpine",
          command: ["sh", "-c", "chmod a+w -R /uploads"],
          volumes: [
            {
              type: "volume",
              source: "uploads",
              target: "/uploads",
            },
          ],
        },
        db: {
          image: "mysql:8",
          volumes: [
            {
              type: "volume",
              source: "database",
              target: "/var/lib/mysql",
            },
          ],
          environment: {
            MYSQL_RANDOM_ROOT_PASSWORD: "1",
            MYSQL_USER: "wpuser",
            MYSQL_PASSWORD: "wppass",
            MYSQL_DATABASE: "wp",
          },
        },
        wordpress: {
          image: "wordpress:php7.4-apache",
          depends_on: ["db", "setup"],
          volumes: [
            {
              source: "uploads",
              target: "/var/www/html/wp-content/uploads",
              type: "volume",
            },
            {
              source: "docroot",
              target: "/var/www/html",
              type: "volume",
            },
            {
              source: "plugins",
              target: "/var/www/html/wp-content/plugins",
              type: "volume",
            },
            {
              source: "themes",
              target: "/var/www/html/wp-content/themes",
              type: "volume",
            },
          ],
          ports: [
            {
              mode: "host",
              published: 8081,
              target: 80,
              protocol: "tcp",
            },
          ],
          environment: {
            WORDPRESS_DB_HOST: "db",
            WORDPRESS_DB_USER: "wpuser",
            WORDPRESS_DB_PASSWORD: "wppass",
            WORDPRESS_DB_NAME: "wp",
          },
        },
      },
      volumes: {
        database: {},
        docroot: {},
        plugins: {},
        themes: {},
        uploads: {},
      },
    };

    test("declaratively", () => {
      const project = new TestProject();
      const dc = new DockerCompose(project, {
        services: {
          setup: {
            image: "alpine",
            command: ["sh", "-c", "chmod a+w -R /uploads"],
            volumes: [DockerCompose.namedVolume("uploads", "/uploads")],
          },
          db: {
            image: "mysql:8",
            volumes: [DockerCompose.namedVolume("database", "/var/lib/mysql")],
            environment: {
              MYSQL_RANDOM_ROOT_PASSWORD: "1",
              MYSQL_USER: "wpuser",
              MYSQL_PASSWORD: "wppass",
              MYSQL_DATABASE: "wp",
            },
          },
          wordpress: {
            dependsOn: [
              DockerCompose.serviceName("db"),
              DockerCompose.serviceName("setup"),
            ],
            image: "wordpress:php7.4-apache",
            ports: [DockerCompose.portMapping(8081, 80)],
            volumes: [
              DockerCompose.namedVolume(
                "uploads",
                "/var/www/html/wp-content/uploads"
              ),
              DockerCompose.namedVolume("docroot", "/var/www/html"),
              DockerCompose.namedVolume(
                "plugins",
                "/var/www/html/wp-content/plugins"
              ),
              DockerCompose.namedVolume(
                "themes",
                "/var/www/html/wp-content/themes"
              ),
            ],
            environment: {
              WORDPRESS_DB_HOST: "db",
              WORDPRESS_DB_USER: "wpuser",
              WORDPRESS_DB_PASSWORD: "wppass",
              WORDPRESS_DB_NAME: "wp",
            },
          },
        },
      });

      expect(dc._synthesizeDockerCompose()).toEqual(expected);

      project.synth();
      assertDockerComposeFileValidates(project.outdir);
    });

    test("imperatively", () => {
      const project = new TestProject();
      const dc = new DockerCompose(project);

      const setup = dc.addService("setup", {
        image: "alpine",
        command: ["sh", "-c", "chmod a+w -R /uploads"],
        volumes: [DockerCompose.namedVolume("uploads", "/uploads")],
      });

      const db = dc.addService("db", {
        image: "mysql:8",
        volumes: [DockerCompose.namedVolume("database", "/var/lib/mysql")],
        environment: {
          MYSQL_RANDOM_ROOT_PASSWORD: "1",
          MYSQL_USER: "wpuser",
          MYSQL_PASSWORD: "wppass",
          MYSQL_DATABASE: "wp",
        },
      });

      const wp = dc.addService("wordpress", {
        dependsOn: [db],
        image: "wordpress:php7.4-apache",
        ports: [DockerCompose.portMapping(8081, 80)],
        volumes: [
          DockerCompose.namedVolume(
            "uploads",
            "/var/www/html/wp-content/uploads"
          ),
        ],
        environment: {
          WORDPRESS_DB_HOST: "db",
          WORDPRESS_DB_USER: "wpuser",
          WORDPRESS_DB_PASSWORD: "wppass",
          WORDPRESS_DB_NAME: "wp",
        },
      });

      wp.addDependsOn(setup);
      wp.addVolume(DockerCompose.namedVolume("docroot", "/var/www/html"));
      wp.addVolume(
        DockerCompose.namedVolume("plugins", "/var/www/html/wp-content/plugins")
      );
      wp.addVolume(
        DockerCompose.namedVolume("themes", "/var/www/html/wp-content/themes")
      );

      expect(dc._synthesizeDockerCompose()).toEqual(expected);

      project.synth();
      assertDockerComposeFileValidates(project.outdir);
    });
  });
  describe("can add a platform", () => {
    test("declaratively", () => {
      const project = new TestProject();
      const dc = new DockerCompose(project, {
        services: {
          myservice: {
            image: "nginx",
            platform: "linux/amd64",
          },
        },
      });

      expect(dc._synthesizeDockerCompose()).toEqual({
        version: "3.3",
        services: {
          myservice: {
            image: "nginx",
            platform: "linux/amd64",
          },
        },
      });

      project.synth();
      assertDockerComposeFileValidates(project.outdir);
    });
  });
});

const hasDockerCompose =
  child_process.spawnSync("docker-compose", ["version"]).status === 0;

function assertDockerComposeFileValidates(dir: string) {
  const filePath = path.join(dir, "docker-compose.yml");
  expect(fs.existsSync(filePath)).toBeTruthy();

  if (hasDockerCompose) {
    const res = child_process.spawnSync("docker-compose", [
      "-f",
      filePath,
      "config",
    ]);
    if (res.status !== 0) {
      throw new Error(
        `docker-compose file does not validate: ${res.stderr.toString()}`
      );
    }
  } else {
    console.warn(
      "docker-compose is not present, so we cannot validate via client"
    );
  }
}
