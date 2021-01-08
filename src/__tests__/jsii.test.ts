import { JsiiProject, LogLevel } from '..';
import { mkdtemp, synthSnapshot } from './util';

describe('author', () => {
  test('authorEmail and authorAddress can be the same value', () => {
    const project = new JsiiProject({
      authorAddress: 'hello@hello.com',
      authorEmail: 'hello@hello.com',
      repositoryUrl: 'https://github.com/foo/bar.git',
      author: 'My Name',
      name: 'project',
      outdir: mkdtemp(),
      logging: {
        level: LogLevel.OFF,
      },
    });

    const pkgjson = synthSnapshot(project)['package.json'];
    expect(pkgjson.author).toStrictEqual({
      email: 'hello@hello.com',
      name: 'My Name',
      organization: false,
    });
  });

  test('authorUrl and authorAddress can be the same value', () => {
    const project = new JsiiProject({
      authorAddress: 'https://foo.bar',
      authorUrl: 'https://foo.bar',
      repositoryUrl: 'https://github.com/foo/bar.git',
      author: 'My Name',
      name: 'project',
      outdir: mkdtemp(),
      logging: {
        level: LogLevel.OFF,
      },
    });

    const pkgjson = synthSnapshot(project)['package.json'];
    expect(pkgjson.author).toStrictEqual({
      name: 'My Name',
      organization: false,
      url: 'https://foo.bar',
    });
  });

  test('maven repository options', () => {
    const project = new JsiiProject({
      authorAddress: 'https://foo.bar',
      authorUrl: 'https://foo.bar',
      repositoryUrl: 'https://github.com/foo/bar.git',
      author: 'My Name',
      outdir: mkdtemp(),
      name: 'testproject',
      publishToMaven: {
        javaPackage: 'com.github.eladb.watchful',
        mavenGroupId: 'com.github.eladb',
        mavenArtifactId: 'cdk-watchful',
        mavenServerId: 'github',
        mavenRepositoryUrl: 'https://maven.pkg.github.com/eladb',
      },
    });

    const workflow = synthSnapshot(project)['.github/workflows/release.yml'];
    expect(workflow).toContain('MAVEN_SERVER_ID: "github"');
    expect(workflow).toContain('MAVEN_REPOSITORY_URL: "https://maven.pkg.github.com/eladb"');
  });
});

