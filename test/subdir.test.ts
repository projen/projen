import * as path from 'path';
import * as fs from 'fs-extra';
import { DockerCompose, Project, TextFile } from '../src';
import * as logging from '../src/logging';
import { Subdir } from '../src/subdir';

logging.disable();

let tempDir: string;
beforeEach(() => {
  tempDir = fs.mkdtempSync(path.join(__dirname, 'tmp.subdir'));
});

afterEach(() => {
  if (tempDir) {
    fs.removeSync(tempDir);
  }
});

test('creates a subdir', () => {
  // GIVEN
  const p = new Project();

  // WHEN
  new Subdir(p, {
    subdirPath: 'mysubdir',
  });
  p.synth(tempDir);

  // THEN
  fs.existsSync(path.join(tempDir, '.gitignore'));
  fs.existsSync(path.join(tempDir, 'mysubdir', '.gitignore'));
});

test('adds gitignores to the right file', () => {
  // GIVEN
  const p = new Project();

  // WHEN
  const sub = new Subdir(p, {
    subdirPath: 'mysubdir',
  });
  sub.gitignore.exclude('ignore-me');
  p.synth(tempDir);

  // THEN
  expect(fs.readFileSync(path.join(tempDir, 'mysubdir', '.gitignore')).toString('utf8')).toContain('ignore-me');
});

test('creates a text file in a subdir', () => {
  // GIVEN
  const p = new Project();
  const subdir = new Subdir(p, {
    subdirPath: 'mysubdir',
  });

  // WHEN
  new TextFile(subdir, 'example.txt', {
    lines: ['foo', 'bar', 'baz'],
  });
  p.synth(tempDir);

  // THEN
  fs.existsSync(path.join(tempDir, 'mysubdir', 'example.txt'));
});

test('creates a text file in a subdir nested in subdir', () => {
  const p = new Project();

  const subdir = new Subdir(p, {
    subdirPath: 'mysubdir',
  });

  // WHEN
  const nestedSubdir = new Subdir(subdir, {
    subdirPath: 'deeper',
  });

  new TextFile(nestedSubdir, 'example.txt', {
    lines: ['foo', 'bar', 'baz'],
  });

  p.synth(tempDir);

  // THEN
  expect(fs.existsSync(path.join(tempDir, 'mysubdir', 'deeper', 'example.txt'))).toBeTruthy();
});

test('creates several subdirs', () => {
  // GIVEN
  const p = new Project();

  // WHEN

  // Frontend Dockerfile and context in its own directory
  const frontend = new Subdir(p, {
    subdirPath: 'frontend',
  });

  new TextFile(frontend, 'Dockerfile', {
    lines: [
      'FROM nginx',
    ],
  });

  // API Dockerfile and context in its own directory
  const api = new Subdir(p, {
    subdirPath: 'cms',
  });

  new TextFile(api, 'Dockerfile', {
    lines: [
      'FROM wordpress',
    ],
  });

  // Docker compose at the root
  new DockerCompose(p, {
    services: {
      http: {
        imageBuild: {
          context: frontend.subdirPath,
        },
        ports: [
          DockerCompose.portMapping(8080, 3000),
        ],
      },
      api: {
        imageBuild: {
          context: api.subdirPath,
        },
        ports: [
          DockerCompose.portMapping(8081, 80),
        ],
      },
      database: {
        image: 'mysql:8',
        volumes: [
          DockerCompose.namedVolume('mysql', '/var/lib/mysql'),
        ],
      },
    },
  });

  p.synth(tempDir);

  // THEN
  expect(fs.existsSync(path.join(tempDir, 'docker-compose.yml'))).toBeTruthy();
  expect(fs.existsSync(path.join(tempDir, frontend.subdirPath, 'Dockerfile'))).toBeTruthy();
  expect(fs.existsSync(path.join(tempDir, api.subdirPath, 'Dockerfile'))).toBeTruthy();
});