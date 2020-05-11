import { NodeProject, CommonOptions } from './node-project';
import { Semver } from './semver';
import { Eslint } from './eslint';
import { GithubWorkflow } from './github-workflow';
import { Construct } from 'constructs';
import { BumpScript } from './bump';

export interface JsiiProjectOptions extends CommonOptions {
  /**
   * @default "."
   */
  readonly rootdir?: string;

  readonly name: string;
  readonly description?: string;
  readonly repository: string;
  readonly authorName: string;
  readonly authorEmail: string;
  readonly license?: string;
  readonly stability?: string;

  readonly java?: JsiiJavaTarget;
  readonly python?: JsiiPythonTarget;
  readonly dotnet?: JsiiDotNetTarget;

  readonly jsiiVersion: Semver;

  /**
   * Install eslint.
   * 
   * @default true
   */
  readonly eslint?: boolean;
}

export enum Stability {
  EXPERIMENTAL = 'experimental',
  STABLE = 'stable',
  DEPRECATED = 'deprecated'
}

export interface JsiiJavaTarget {
  readonly javaPackage: string;
  readonly mavenGroupId: string;
  readonly mavenArtifactId: string;
}

export interface JsiiPythonTarget {
  readonly distName: string;
  readonly module: string;
}

export interface JsiiDotNetTarget {
  readonly dotNetNamespace: string;
  readonly packageId: string;
}

export class JsiiProject extends NodeProject {
  constructor(options: JsiiProjectOptions) {
    super(options);

    this.addFields({ types: 'lib/index.d.ts' });

    this.addScripts({
      compile: 'jsii',
      watch: 'jsii -w',
      test: 'echo ok',
      compat: 'npx jsii-diff npm:$(node -p "require(\'./package.json\').name")',
      package: 'jsii-pacmak',
      build: 'yarn compile && yarn test && yarn run package',
    });

    this.addFields({ stability: options.stability ?? Stability.STABLE });

    if (options.stability === Stability.DEPRECATED) {
      this.addFields({ deprecated: true });
    }

    const targets: Record<string, any> = { };

    this.addFields({
      jsii: {
        outdir: 'dist',
        targets,
      },
    });

    const releaseWorkflow = new JsiiReleaseWorkflow(this);

    releaseWorkflow.publishToNpm();

    if (options.java) {
      targets.java = {
        package: options.java.javaPackage,
        maven: {
          groupId: options.java.mavenGroupId,
          artifactId: options.java.mavenArtifactId,
        },
      };

      releaseWorkflow.publishToMaven();
    }

    if (options.python) {
      targets.python = {
        distName: options.python.distName,
        module: options.python.module,
      };

      releaseWorkflow.publishToPyPi();
    }

    if (options.dotnet) {
      targets.dotnet = {
        namespace: options.dotnet.dotNetNamespace,
        packageId: options.dotnet.packageId,
      };

      releaseWorkflow.publishToNuget();
    }

    this.addDevDependencies({
      'jsii': options.jsiiVersion,
      'jsii-diff': options.jsiiVersion,
      'jsii-pacmak': options.jsiiVersion,
      'jsii-release': Semver.caret('0.1.5'),
      '@types/node': Semver.caret('13.13.5'),
    });

    const eslint = options.eslint ?? true;
    if (eslint) {
      new Eslint(this);
    }

    this.gitignore.exclude(
      'dist',
      'tsconfig.json',
      '.jsii',
      '*.d.ts',
      '*.js',
    );

    // exclude typescript source and config
    this.npmignore.exclude('*.ts', 'tsconfig.json');

    // include javascript files and typescript declarations
    this.npmignore.include('*.js');
    this.npmignore.include('*.d.ts');

    // exclude jsii outdir
    this.npmignore.exclude('dist');
    
    // include .jsii manifest
    this.npmignore.include('.jsii');

    new JsiiBuildWorkflow(this);
    new BumpScript(this);
  }
}


class JsiiReleaseWorkflow extends GithubWorkflow {
  private readonly buildJobId = 'build_artifact';

  constructor(scope: Construct) {
    super(scope, 'release', { name: 'Release' });

    this.on({ push: { branches: [ 'master' ] } });

    this.addJobs({ 
      [this.buildJobId]: {
        'name': 'Build and upload artifact',
        'runs-on': 'ubuntu-latest',
        'container': {
          image: 'jsii/superchain',
        },
        'steps': [
          { uses: 'actions/checkout@v2' },
          { run: 'yarn install --frozen-lockfile' },
          { run: 'yarn build' },
          {
            name: 'Upload artifact',
            uses: 'actions/upload-artifact@v1',
            with: {
              name: 'dist',
              path: 'dist',
            },
          },
        ],
      }, 
    });
  }

  public publishToNpm() {
    this.addJobs({
      release_npm: {
        'name': 'Release to NPM',
        'needs': this.buildJobId,
        'runs-on': 'ubuntu-latest',
        'container': {
          'image': 'jsii/superchain',
        },
        'steps': [
          {
            'name': 'Download build artifacts',
            'uses': 'actions/download-artifact@v1',
            'with': {
              'name': 'dist',
            },
          },
          {
            'name': 'Release',
            'run': 'npx -p jsii-release jsii-release-npm',
            'env': {
              'NPM_TOKEN': '${{ secrets.NPM_TOKEN }}',
            },
          },
        ],
      },
    });
  }

  public publishToNuget() {
    this.addJobs({
      release_nuget: {
        'name': 'Release to Nuget',
        'needs': this.buildJobId,
        'runs-on': 'ubuntu-latest',
        'container': {
          'image': 'jsii/superchain',
        },
        'steps': [
          {
            'name': 'Download build artifacts',
            'uses': 'actions/download-artifact@v1',
            'with': {
              'name': 'dist',
            },
          },
          {
            'name': 'Release',
            'run': 'npx -p jsii-release jsii-release-nuget',
            'env': {
              'NUGET_API_KEY': '${{ secrets.NUGET_API_KEY }}',
            },
          },
        ],
      },
    });
  }

  public publishToMaven() {
    this.addJobs({ 
      release_maven: {
        'name': 'Release to Maven',
        'needs': this.buildJobId,
        'runs-on': 'ubuntu-latest',
        'container': {
          'image': 'jsii/superchain',
        },
        'steps': [
          {
            'name': 'Download build artifacts',
            'uses': 'actions/download-artifact@v1',
            'with': {
              'name': 'dist',
            },
          },
          {
            'name': 'Release',
            'run': 'npx -p jsii-release jsii-release-maven',
            'env': {
              'MAVEN_GPG_PRIVATE_KEY': '${{ secrets.MAVEN_GPG_PRIVATE_KEY }}',
              'MAVEN_GPG_PRIVATE_KEY_PASSPHRASE': '${{ secrets.MAVEN_GPG_PRIVATE_KEY_PASSPHRASE }}',
              'MAVEN_PASSWORD': '${{ secrets.MAVEN_PASSWORD }}',
              'MAVEN_USERNAME': '${{ secrets.MAVEN_USERNAME }}',
              'MAVEN_STAGING_PROFILE_ID': '${{ secrets.MAVEN_STAGING_PROFILE_ID }}',
            },
          },
        ],
      },
    });
  }

  public publishToPyPi() {
    this.addJobs({
      release_pypi: {
        'name': 'Release to PyPi',
        'needs': this.buildJobId,
        'runs-on': 'ubuntu-latest',
        'container': {
          'image': 'jsii/superchain',
        },
        'steps': [
          {
            'name': 'Download build artifacts',
            'uses': 'actions/download-artifact@v1',
            'with': {
              'name': 'dist',
            },
          },
          {
            'name': 'Release',
            'run': 'npx -p jsii-release jsii-release-pypi',
            'env': {
              'TWINE_USERNAME': '${{ secrets.TWINE_USERNAME }}',
              'TWINE_PASSWORD': '${{ secrets.TWINE_PASSWORD }}',
            },
          },
        ],
      },
    });
  }
}

export class JsiiBuildWorkflow extends GithubWorkflow {
  constructor(scope: Construct) {
    super(scope, 'build', { name: 'Build' });

    this.on({ pull_request: { } });

    this.addJobs({
      build: {
        'runs-on': 'ubuntu-latest',
        container: {
          image: 'jsii/superchain',
        },
        steps: [
          { uses: 'actions/checkout@v2' },
          { run: 'yarn install --frozen-lockfile' },
          { run: 'yarn build' },
        ],
      },
    });
  }
}
