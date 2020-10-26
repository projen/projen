import * as child_process from 'child_process';
import * as path from 'path';
import * as fs from 'fs-extra';
import { DockerCompose, DockerComposeProtocol } from './docker-compose';
import { Project } from './project';

let tempDir: string;
beforeEach(() => {
  tempDir = fs.mkdtempSync(path.join(__dirname, 'tmp.docker-compose'));
});

afterEach(() => {
  if (tempDir) {
    fs.removeSync(tempDir);
  }
});

describe('docker-compose', () => {
  test('errors when no services', () => {
    const project = new Project();
    new DockerCompose(project);

    expect(() => project.synth(tempDir))
      .toThrow(/at least one service/i);
  });

  test('errors when imageBuild and image not specified in service', () => {
    const project = new Project();
    const dc = new DockerCompose(project);

    expect(() => dc.addService('service', {}))
      .toThrow(/requires exactly one of.*imageBuild.*image/i);
  });

  test('errors when imageBuild and image are both specified in service', () => {
    const project = new Project();
    const dc = new DockerCompose(project);

    expect(() => dc.addService('service', {}))
      .toThrow(/requires exactly one of.*imageBuild.*image/i);
  });

  test('can choose a name suffix for the docker-compose.yml', () => {
    const project = new Project();
    new DockerCompose(project, {
      nameSuffix: 'myname',
      services: {
        myservice: {
          image: 'nginx',
        },
      },
    });

    project.synth(tempDir);
    expect(fs.existsSync(path.join(tempDir, 'docker-compose.myname.yml')));
  });

  test('can run a container command', () => {
    const project = new Project();
    const dc = new DockerCompose(project, {
      services: {
        alpine: {
          image: 'alpine',
          command: ['sh', '-c', 'echo I ran'],
        },
      },
    });

    expect(dc._synthesizeDockerCompose()).toEqual({
      services: {
        alpine: {
          image: 'alpine',
          command: ['sh', '-c', 'echo I ran'],
        },
      },
      volumes: {},
    });

    project.synth(tempDir);
    assertDockerComposeFileValidates(tempDir);
  });

  test('can add a bind volume', () => {
    const project = new Project();
    const dc = new DockerCompose(project);

    dc.addService('myservice', {
      image: 'nginx',
      volumes: [
        DockerCompose.bindVolume('./docroot', '/var/www/html'),
      ],
    });

    expect(dc._synthesizeDockerCompose()).toEqual({
      services: {
        myservice: {
          image: 'nginx',
          volumes: [
            {
              type: 'bind',
              source: './docroot',
              target: '/var/www/html',
            },
          ],
        },
      },
      volumes: {},
    });

    project.synth(tempDir);
    assertDockerComposeFileValidates(tempDir);
  });

  test('can add a named volume', () => {
    const project = new Project();
    const dc = new DockerCompose(project);

    dc.addService('myservice', {
      image: 'nginx',
      volumes: [
        DockerCompose.namedVolume('html', '/var/www/html'),
      ],
    });

    expect(dc._synthesizeDockerCompose()).toEqual({
      services: {
        myservice: {
          image: 'nginx',
          volumes: [
            {
              type: 'volume',
              source: 'html',
              target: '/var/www/html',
            },
          ],
        },
      },
      volumes: {
        html: {},
      },
    });

    project.synth(tempDir);
    assertDockerComposeFileValidates(tempDir);
  });

  test('can add a named volume with special driver', () => {
    const project = new Project();
    const dc = new DockerCompose(project, {
      services: {
        web: {
          image: 'nginx',
          volumes: [
            DockerCompose.namedVolume('web', '/var/www/html', {
              driverOpts: {
                type: 'nfs',
                o: 'addr=10.40.0.199,nolock,soft,rw',
                device: ':/docker/example',
              },
            }),
          ],
        },
      },
    });

    expect(dc._synthesizeDockerCompose()).toEqual({
      services: {
        web: {
          image: 'nginx',
          volumes: [
            {
              type: 'volume',
              source: 'web',
              target: '/var/www/html',
            },
          ],
        },
      },
      volumes: {
        web: {
          driver_opts: {
            type: 'nfs',
            o: 'addr=10.40.0.199,nolock,soft,rw',
            device: ':/docker/example',
          },
        },
      },
    });

    project.synth(tempDir);
    assertDockerComposeFileValidates(tempDir);
  });

  test('can map a port', () => {
    const project = new Project();
    const dc = new DockerCompose(project, {
      services: {
        port: {
          image: 'nginx',
          ports: [
            DockerCompose.portMapping(8080, 80),
            DockerCompose.portMapping(8080, 80, DockerComposeProtocol.UDP),
          ],
        },
      },
    });

    expect(dc._synthesizeDockerCompose()).toEqual({
      services: {
        port: {
          image: 'nginx',
          ports: [
            {
              published: 8080,
              target: 80,
              protocol: 'tcp',
              mode: 'host',
            },
            {
              published: 8080,
              target: 80,
              protocol: 'udp',
              mode: 'host',
            },
          ],
        },
      },
      volumes: {},
    });

    project.synth(tempDir);
    assertDockerComposeFileValidates(tempDir);
  });

  test('can create a service from the constructor', () => {
    const project = new Project();

    const dc = new DockerCompose(project, {
      services: {
        www: {
          image: 'nginx',
        },
      },
    });

    expect(dc._synthesizeDockerCompose()).toEqual({
      services: {
        www: {
          image: 'nginx',
        },
      },
      volumes: {},
    });
  });

  test('can create volumes from the constructor', () => {
    const project = new Project();

    const dc = new DockerCompose(project, {
      services: {
        www: {
          image: 'nginx',
          volumes: [
            DockerCompose.bindVolume('./html', '/var/www/html'),
            DockerCompose.namedVolume('files', '/var/files'),
          ],
        },
      },
    });

    expect(dc._synthesizeDockerCompose()).toEqual({
      services: {
        www: {
          image: 'nginx',
          volumes: [
            {
              type: 'bind',
              source: './html',
              target: '/var/www/html',
            },
            {
              type: 'volume',
              source: 'files',
              target: '/var/files',
            },
          ],
        },
      },
      volumes: {
        files: {},
      },
    });

    project.synth(tempDir);
    assertDockerComposeFileValidates(tempDir);
  });

  test('can set up a wordpress dev env', () => {
    const project = new Project();
    const dc = new DockerCompose(project);

    dc.addService('setup', {
      image: 'alpine',
      command: ['sh', '-c', 'chmod a+w -R /uploads'],
      volumes: [
        DockerCompose.namedVolume('uploads', '/uploads'),
      ],
    });

    dc.addService('wordpress', {
      dependsOn: ['db'],
      image: 'wordpress:php7.4-apache',
      ports: [
        DockerCompose.portMapping(8081, 80),
      ],
      volumes: [
        DockerCompose.namedVolume('docroot', '/var/www/html'),
        DockerCompose.namedVolume('uploads', '/var/www/html/wp-content/uploads'),
        DockerCompose.namedVolume('plugins', '/var/www/html/wp-content/plugins'),
        DockerCompose.namedVolume('themes', '/var/www/html/wp-content/themes'),
      ],
      environment: {
        WORDPRESS_DB_HOST: 'db',
        WORDPRESS_DB_USER: 'wpuser',
        WORDPRESS_DB_PASSWORD: 'wppass',
        WORDPRESS_DB_NAME: 'wp',
      },
    });

    dc.addService('db', {
      image: 'mysql:8',
      volumes: [
        DockerCompose.namedVolume('database', '/var/lib/mysql'),
      ],
      environment: {
        MYSQL_RANDOM_ROOT_PASSWORD: '1',
        MYSQL_USER: 'wpuser',
        MYSQL_PASSWORD: 'wppass',
        MYSQL_DATABASE: 'wp',
      },
    });

    project.synth(tempDir);
    assertDockerComposeFileValidates(tempDir);
  });
});

const hasDockerCompose = child_process.spawnSync('docker-compose', ['version']).status === 0;

function assertFileValidates(filePath: string): void {
  if (hasDockerCompose) {
    const res = child_process.spawnSync('docker-compose', ['-f', filePath, 'config']);
    if (res.status !== 0) {
      throw new Error(`docker-compose file does not validate: ${res.stderr.toString()}`);
    }
  } else {
    console.warn('docker-compose is not present, so we cannot validate via client');
  }
}

function assertDockerComposeFileValidates(dir: string) {
  const filePath = path.join(dir, 'docker-compose.yml');
  expect(fs.existsSync(filePath)).toBeTruthy();
  assertFileValidates(filePath);
}
