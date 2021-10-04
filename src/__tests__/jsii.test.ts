import { JsiiProject, JsiiProjectOptions, LogLevel } from '..';
import { mkdtemp, synthSnapshot } from './util';

describe('author', () => {
  test('authorEmail and authorAddress can be the same value', () => {
    const project = new TestJsiiProject({
      authorAddress: 'hello@hello.com',
      authorEmail: 'hello@hello.com',
      repositoryUrl: 'https://github.com/foo/bar.git',
      author: 'My Name',
      name: 'project',
      defaultReleaseBranch: 'master',
    });

    const pkgjson = synthSnapshot(project)['package.json'];
    expect(pkgjson.author).toStrictEqual({
      email: 'hello@hello.com',
      name: 'My Name',
      organization: false,
    });
  });

  test('authorUrl and authorAddress can be the same value', () => {
    const project = new TestJsiiProject({
      authorAddress: 'https://foo.bar',
      authorUrl: 'https://foo.bar',
      repositoryUrl: 'https://github.com/foo/bar.git',
      author: 'My Name',
      name: 'project',
      defaultReleaseBranch: 'master',
    });

    const pkgjson = synthSnapshot(project)['package.json'];
    expect(pkgjson.author).toStrictEqual({
      name: 'My Name',
      organization: false,
      url: 'https://foo.bar',
    });
  });
});

describe('maven repository options', () => {
  test('use maven central as repository', () => {
    const project = new TestJsiiProject({
      authorAddress: 'https://foo.bar',
      authorUrl: 'https://foo.bar',
      repositoryUrl: 'https://github.com/foo/bar.git',
      author: 'My Name',
      name: 'testproject',
      publishToMaven: {
        javaPackage: 'io.github.cdklabs.watchful',
        mavenGroupId: 'io.github.cdklabs',
        mavenArtifactId: 'cdk-watchful',
      },
      defaultReleaseBranch: 'master',
    });

    const outdir = synthSnapshot(project);

    expect(outdir['.projen/tasks.json'].tasks['publish:maven']).toStrictEqual({
      name: 'publish:maven',
      description: 'Publish this package to Maven Central',
      requiredEnv: [
        'MAVEN_GPG_PRIVATE_KEY',
        'MAVEN_GPG_PRIVATE_KEY_PASSPHRASE',
        'MAVEN_PASSWORD',
        'MAVEN_USERNAME',
        'MAVEN_STAGING_PROFILE_ID',
      ],
      steps: [{ exec: 'npx -p jsii-release@latest jsii-release-maven' }],
    });

    const workflow = outdir['.github/workflows/release.yml'];
    expect(workflow).toContain('run: npx -p jsii-release@latest jsii-release-maven');
    expect(workflow).toContain('MAVEN_USERNAME: ${{ secrets.MAVEN_USERNAME }}');
    expect(workflow).not.toContainEqual('MAVEN_SERVER_ID');
    expect(workflow).not.toContainEqual('MAVEN_REPOSITORY_URL');
    expect(workflow).not.toContain('packages: write');
  });

  test('use nexus repo new endpoint', () => {
    const project = new TestJsiiProject({
      authorAddress: 'https://foo.bar',
      authorUrl: 'https://foo.bar',
      repositoryUrl: 'https://github.com/foo/bar.git',
      author: 'My Name',
      name: 'testproject',
      publishToMaven: {
        javaPackage: 'io.github.cdklabs.watchful',
        mavenGroupId: 'io.github.cdklabs',
        mavenArtifactId: 'cdk-watchful',
        mavenEndpoint: 'https://s01.oss.sonatype.org',
      },
      defaultReleaseBranch: 'master',
    });

    const outdir = synthSnapshot(project);

    expect(outdir['.projen/tasks.json'].tasks['publish:maven']).toStrictEqual({
      name: 'publish:maven',
      description: 'Publish this package to Maven Central',
      env: {
        MAVEN_ENDPOINT: 'https://s01.oss.sonatype.org',
      },
      requiredEnv: [
        'MAVEN_GPG_PRIVATE_KEY',
        'MAVEN_GPG_PRIVATE_KEY_PASSPHRASE',
        'MAVEN_PASSWORD',
        'MAVEN_USERNAME',
        'MAVEN_STAGING_PROFILE_ID',
      ],
      steps: [{ exec: 'npx -p jsii-release@latest jsii-release-maven' }],
    });

    const workflow = outdir['.github/workflows/release.yml'];
    expect(workflow).toContain('run: npx -p jsii-release@latest jsii-release-maven');
    expect(workflow).toContain('MAVEN_ENDPOINT: https://s01.oss.sonatype.org');
    expect(workflow).toContain('MAVEN_USERNAME: ${{ secrets.MAVEN_USERNAME }}');
    expect(workflow).not.toContainEqual('MAVEN_SERVER_ID');
    expect(workflow).not.toContainEqual('MAVEN_REPOSITORY_URL');
    expect(workflow).not.toContain('packages: write');
  });

  test('use github as repository', () => {
    const project = new TestJsiiProject({
      authorAddress: 'https://foo.bar',
      authorUrl: 'https://foo.bar',
      repositoryUrl: 'https://github.com/foo/bar.git',
      author: 'My Name',
      name: 'testproject',
      publishToMaven: {
        javaPackage: 'io.github.cdklabs.watchful',
        mavenGroupId: 'io.github.cdklabs',
        mavenArtifactId: 'cdk-watchful',
        mavenRepositoryUrl: 'https://maven.pkg.github.com/eladb',
      },
      defaultReleaseBranch: 'master',
    });

    const outdir = synthSnapshot(project);

    expect(outdir['.projen/tasks.json'].tasks['publish:maven']).toStrictEqual({
      name: 'publish:maven',
      description: 'Publish this package to Maven Central',
      env: {
        MAVEN_SERVER_ID: 'github',
        MAVEN_REPOSITORY_URL: 'https://maven.pkg.github.com/eladb',
      },
      requiredEnv: [
        'MAVEN_PASSWORD',
        'MAVEN_USERNAME',
      ],
      steps: [{ exec: 'npx -p jsii-release@latest jsii-release-maven' }],
    });

    const workflow = outdir['.github/workflows/release.yml'];
    expect(workflow).toContain('MAVEN_SERVER_ID: github');
    expect(workflow).toContain('MAVEN_REPOSITORY_URL: https://maven.pkg.github.com/eladb');
    expect(workflow).toContain('MAVEN_USERNAME: ${{ github.actor }}');
    expect(workflow).toContain('MAVEN_PASSWORD: ${{ secrets.GITHUB_TOKEN }}');
    expect(workflow).toContain('packages: write');
  });

  test('using github as repository with incorrect server id should throw', () => {
    expect(() => new TestJsiiProject({
      authorAddress: 'https://foo.bar',
      authorUrl: 'https://foo.bar',
      repositoryUrl: 'https://github.com/foo/bar.git',
      author: 'My Name',
      name: 'testproject',
      publishToMaven: {
        javaPackage: 'io.github.cdklabs.watchful',
        mavenGroupId: 'io.github.cdklabs',
        mavenArtifactId: 'cdk-watchful',
        mavenServerId: 'something-else',
        mavenRepositoryUrl: 'https://maven.pkg.github.com/eladb',
      },
      defaultReleaseBranch: 'master',
    })).toThrow('publishing to GitHub Packages requires the "mavenServerId" to be "github"');
  });
});

describe('publish to go', () => {
  test('defaults', () => {
    const project = new TestJsiiProject({
      authorAddress: 'https://foo.bar',
      authorUrl: 'https://foo.bar',
      repositoryUrl: 'https://github.com/foo/bar.git',
      author: 'My Name',
      name: 'testproject',
      publishToGo: {
        moduleName: 'github.com/foo/bar',
      },
      defaultReleaseBranch: 'master',
    });

    const output = synthSnapshot(project);
    const targets = output['package.json'].jsii.targets;
    expect(targets).toStrictEqual({
      go: {
        moduleName: 'github.com/foo/bar',
      },
    });

    expect(output['.github/workflows/release.yml']).toMatchSnapshot();
  });

  test('release to npm undefined', () => {
    const project = new TestJsiiProject({
      authorAddress: 'https://foo.bar',
      authorUrl: 'https://foo.bar',
      repositoryUrl: 'https://github.com/foo/bar.git',
      author: 'My Name',
      name: 'testproject',
      defaultReleaseBranch: 'main',
    });

    const output = synthSnapshot(project);
    expect(output['.github/workflows/release.yml']).toContain('release_npm');
  });

  test('release to npm true', () => {
    const project = new TestJsiiProject({
      authorAddress: 'https://foo.bar',
      authorUrl: 'https://foo.bar',
      repositoryUrl: 'https://github.com/foo/bar.git',
      author: 'My Name',
      name: 'testproject',
      defaultReleaseBranch: 'main',
      releaseToNpm: true,
    });

    const output = synthSnapshot(project);
    expect(output['.github/workflows/release.yml']).toContain('release_npm');
  });

  test('release to npm false', () => {
    const project = new TestJsiiProject({
      authorAddress: 'https://foo.bar',
      authorUrl: 'https://foo.bar',
      repositoryUrl: 'https://github.com/foo/bar.git',
      author: 'My Name',
      name: 'testproject',
      defaultReleaseBranch: 'main',
      releaseToNpm: false,
    });

    const output = synthSnapshot(project);
    expect(output['.github/workflows/release.yml']).not.toContain('release_npm');
  });

  test('customizations', () => {
    const project = new TestJsiiProject({
      authorAddress: 'https://foo.bar',
      authorUrl: 'https://foo.bar',
      repositoryUrl: 'https://github.com/foo/bar.git',
      author: 'My Name',
      name: 'testproject',
      publishToGo: {
        moduleName: 'github.com/foo/bar',

        gitBranch: 'custom-branch',
        gitCommitMessage: 'custom commit message',
        gitUserEmail: 'custom@email.com',
        gitUserName: 'custom user',
        githubRepo: 'github.com/foo/bar',
        githubTokenSecret: 'CUSTOM_SECRET',
      },
      defaultReleaseBranch: 'master',
      excludeTypescript: ['src/**/test/*.ts', 'src/**/__tests__/*.ts'],
    });

    const output = synthSnapshot(project);
    expect(output['package.json'].jsii.targets.go).toStrictEqual({ moduleName: 'github.com/foo/bar' });
    expect(output['.github/workflows/release.yml']).toMatchSnapshot();
    expect(output['package.json'].jsii.excludeTypescript).toStrictEqual(['src/**/test/*.ts', 'src/**/__tests__/*.ts']);
  });
});

test('docgen: true should just work', () => {
  const project = new TestJsiiProject({
    author: 'My name',
    name: 'testproject',
    authorAddress: 'https://foo.bar',
    defaultReleaseBranch: 'main',
    repositoryUrl: 'https://github.com/foo/bar.git',
    docgen: true,
  });

  const output = synthSnapshot(project);
  expect(output['.projen/tasks.json'].tasks.docgen.steps[0].exec).toStrictEqual('jsii-docgen');
});

describe('superchain image is selected based on the node version', () => {
  const opts = {
    author: 'My name',
    name: 'testproject',
    authorAddress: 'https://foo.bar',
    defaultReleaseBranch: 'main',
    repositoryUrl: 'https://github.com/foo/bar.git',
  };

  test('defaults to 1-buster-slim without minNodeVersion', () => {
    const project = new TestJsiiProject(opts);
    const output = synthSnapshot(project);
    expect(output['.github/workflows/build.yml']).toContain('image: jsii/superchain:1-buster-slim');
  });

  test('12.x', () => {
    const project = new TestJsiiProject({ ...opts, minNodeVersion: '12.22.1' });
    const output = synthSnapshot(project);
    expect(output['.github/workflows/build.yml']).toContain('image: jsii/superchain:1-buster-slim-node12');
  });

  test('14.x', () => {
    const project = new TestJsiiProject({ ...opts, minNodeVersion: '14.42.1' });
    const output = synthSnapshot(project);
    expect(output['.github/workflows/build.yml']).toContain('image: jsii/superchain:1-buster-slim-node14');
  });

  test('16.x', () => {
    const project = new TestJsiiProject({ ...opts, minNodeVersion: '16.22.1' });
    const output = synthSnapshot(project);
    expect(output['.github/workflows/build.yml']).toContain('image: jsii/superchain:1-buster-slim-node16');
  });

  test('unsupported version', () => {
    expect(() => new TestJsiiProject({ ...opts, minNodeVersion: '15.3.20' })).toThrow('No jsii/superchain image available for node 15.x. Supported node versions: 12.x,14.x,16.x');
    expect(() => new TestJsiiProject({ ...opts, minNodeVersion: '10.2.3' })).toThrow('No jsii/superchain image available for node 10.x. Supported node versions: 12.x,14.x,16.x');
  });
});

class TestJsiiProject extends JsiiProject {
  constructor(options: JsiiProjectOptions) {
    super({
      outdir: mkdtemp(),
      logging: {
        level: LogLevel.OFF,
      },
      ...options,
    });
  }
}
