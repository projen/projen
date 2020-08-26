# API Reference

**Classes**

Name|Description
----|-----------
[Component](#projen-component)|Represents a project component.
[ConstructLibrary](#projen-constructlibrary)|A multi-language library for CDK constructs.
[ConstructLibraryAws](#projen-constructlibraryaws)|A multi-language (jsii) construct library which vends constructs designed to use within the AWS CDK with a friendly workflow and automatic publishing to the construct catalog.
[Dependabot](#projen-dependabot)|Defines dependabot configuration for node projects.
[Eslint](#projen-eslint)|*No description*
[FileBase](#projen-filebase)|*No description*
[GithubWorkflow](#projen-githubworkflow)|*No description*
[IgnoreFile](#projen-ignorefile)|*No description*
[Jest](#projen-jest)|Installs the following npm scripts:.
[JsiiProject](#projen-jsiiproject)|jsii library project.
[JsonFile](#projen-jsonfile)|*No description*
[LernaProject](#projen-lernaproject)|lerna monorepo project.
[License](#projen-license)|*No description*
[Mergify](#projen-mergify)|*No description*
[NodeBuildWorkflow](#projen-nodebuildworkflow)|*No description*
[NodeProject](#projen-nodeproject)|*No description*
[Project](#projen-project)|*No description*
[Semver](#projen-semver)|*No description*
[Start](#projen-start)|*No description*
[TypeScriptLibraryProject](#projen-typescriptlibraryproject)|*No description*
[TypeScriptProject](#projen-typescriptproject)|typescript project.
[TypescriptConfig](#projen-typescriptconfig)|*No description*
[Version](#projen-version)|*No description*


**Structs**

Name|Description
----|-----------
[Catalog](#projen-catalog)|*No description*
[ConstructLibraryAwsOptions](#projen-constructlibraryawsoptions)|Options for the construct-lib-aws project.
[ConstructLibraryOptions](#projen-constructlibraryoptions)|*No description*
[CoverageThreshold](#projen-coveragethreshold)|*No description*
[DependabotIgnore](#projen-dependabotignore)|You can use the `ignore` option to customize which dependencies are updated.
[DependabotOptions](#projen-dependabotoptions)|*No description*
[FileBaseOptions](#projen-filebaseoptions)|*No description*
[JestOptions](#projen-jestoptions)|*No description*
[JsiiDotNetTarget](#projen-jsiidotnettarget)|*No description*
[JsiiJavaTarget](#projen-jsiijavatarget)|*No description*
[JsiiProjectOptions](#projen-jsiiprojectoptions)|*No description*
[JsiiPythonTarget](#projen-jsiipythontarget)|*No description*
[JsonFileOptions](#projen-jsonfileoptions)|*No description*
[LernaPackage](#projen-lernapackage)|A `projen` project added as a package to a lerna project.
[LernaProjectOptions](#projen-lernaprojectoptions)|*No description*
[LicenseOptions](#projen-licenseoptions)|*No description*
[LifecycleScriptOptions](#projen-lifecyclescriptoptions)|standard-version supports lifecycle scripts.
[MergifyOptions](#projen-mergifyoptions)|*No description*
[MergifyRule](#projen-mergifyrule)|*No description*
[NodeBuildWorkflowOptions](#projen-nodebuildworkflowoptions)|*No description*
[NodeProjectCommonOptions](#projen-nodeprojectcommonoptions)|*No description*
[NodeProjectOptions](#projen-nodeprojectoptions)|*No description*
[PeerDependencyOptions](#projen-peerdependencyoptions)|*No description*
[SkipOptions](#projen-skipoptions)|standard-version allows for skipping any of the lifecycle steps (bump, changelog, commit, tag).
[StartEntryOptions](#projen-startentryoptions)|*No description*
[StartOptions](#projen-startoptions)|*No description*
[TypeScriptCompilerOptions](#projen-typescriptcompileroptions)|*No description*
[TypeScriptLibraryProjectOptions](#projen-typescriptlibraryprojectoptions)|*No description*
[TypeScriptProjectOptions](#projen-typescriptprojectoptions)|*No description*
[TypescriptConfigOptions](#projen-typescriptconfigoptions)|*No description*
[VersionOptions](#projen-versionoptions)|*No description*


**Interfaces**

Name|Description
----|-----------
[IResolver](#projen-iresolver)|API for resolving tokens when synthesizing file content.


**Enums**

Name|Description
----|-----------
[AutoRelease](#projen-autorelease)|Automatic bump modes.
[DependabotScheduleInterval](#projen-dependabotscheduleinterval)|How often to check for new versions and raise pull requests for version updates.
[Stability](#projen-stability)|*No description*
[StartEntryCategory](#projen-startentrycategory)|*No description*
[VersionUpdater](#projen-versionupdater)|The standard-version "updater" defines how the version file will be bumped.
[VersioningStrategy](#projen-versioningstrategy)|The strategy to use when edits manifest and lock files.



## class Component 🔹 <a id="projen-component"></a>

Represents a project component.


### Initializer




```ts
new Component(project: Project)
```

* **project** (<code>[Project](#projen-project)</code>)  *No description*



### Properties


Name | Type | Description 
-----|------|-------------
**project**🔹 | <code>[Project](#projen-project)</code> | <span></span>



## class ConstructLibrary 🔹 <a id="projen-constructlibrary"></a>

A multi-language library for CDK constructs.

__Extends__: [JsiiProject](#projen-jsiiproject)
__Implemented by__: [ConstructLibraryAws](#projen-constructlibraryaws)

### Initializer




```ts
new ConstructLibrary(options: ConstructLibraryOptions)
```

* **options** (<code>[ConstructLibraryOptions](#projen-constructlibraryoptions)</code>)  *No description*
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files onn git. __*Default*__: true
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. __*Default*__: true
  * **autoReleaseSchedule** (<code>string</code>)  CRON schedule for automatically bumping and releasing a new version. __*Default*__: every 6 hours
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. __*Optional*__
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. __*Default*__: true
  * **bundledDependencies** (<code>Array<string></code>)  *No description* __*Optional*__
  * **copyrightOwner** (<code>string</code>)  License copyright owner. __*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. __*Default*__: current year
  * **dependabot** (<code>boolean</code>)  Include dependabot configuration. __*Default*__: true;
  * **dependabotOptions** (<code>[DependabotOptions](#projen-dependabotoptions)</code>)  Options for dependabot. __*Default*__: default options
  * **dependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **devDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **keywords** (<code>Array<string></code>)  *No description* __*Optional*__
  * **libdir** (<code>string</code>)  Compiler artifacts output directory. __*Default*__: "lib"
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). __*Default*__: no max
  * **mergify** (<code>boolean</code>)  Adds mergify configuration. __*Default*__: true
  * **mergifyOptions** (<code>[MergifyOptions](#projen-mergifyoptions)</code>)  Options for mergify. __*Default*__: default options
  * **minNodeVersion** (<code>string</code>)  Node.js version to require via package.json `engines` (inclusive). __*Default*__: no "engines" specified
  * **npmDistTag** (<code>string</code>)  The dist-tag to use when releasing to npm. __*Default*__: "latest"
  * **peerDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  *No description* __*Optional*__
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. __*Default*__: true
  * **projenUpgradeSecret** (<code>string</code>)  Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`). __*Default*__: no automatic projen upgrade pull requests
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. __*Default*__: latest version
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. __*Default*__: [ "master" ]
  * **releaseEveryCommit** (<code>boolean</code>)  Automatically release new versions every commit to one of branches in `releaseBranches`. __*Default*__: true
  * **releaseSchedule** (<code>string</code>)  CRON schedule to trigger new releases. __*Default*__: no scheduled releases
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. __*Default*__: true
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "master" when new versions are bumped. __*Default*__: true
  * **scripts** (<code>Map<string, string></code>)  npm scripts to include. __*Default*__: {}
  * **srcdir** (<code>string</code>)  Typescript sources directory. __*Default*__: "src"
  * **start** (<code>boolean</code>)  Defines a `yarn start` interactive experience. __*Default*__: true
  * **startOptions** (<code>[StartOptions](#projen-startoptions)</code>)  Options for `yarn start`. __*Default*__: default options
  * **testdir** (<code>string</code>)  Tests directory. __*Default*__: "test"
  * **version** (<code>[VersionOptions](#projen-versionoptions)</code>)  Options for standard-version. __*Default*__: default options
  * **workflowBootstrapSteps** (<code>Array<any></code>)  Workflow steps to use in order to bootstrap this repo. __*Default*__: [ { run: `npx projen${PROJEN_VERSION}` }, { run: 'yarn install --frozen-lockfile' } ]
  * **workflowContainerImage** (<code>string</code>)  Container image to use for GitHub workflows. __*Default*__: default image
  * **workflowNodeVersion** (<code>string</code>)  The node version to use in GitHub workflows. __*Default*__: same as `minNodeVersion`
  * **authorName** (<code>string</code>)  *No description* 
  * **name** (<code>string</code>)  *No description* 
  * **repository** (<code>string</code>)  *No description* 
  * **authorEmail** (<code>string</code>)  *No description* __*Optional*__
  * **authorOrganization** (<code>boolean</code>)  *No description* __*Optional*__
  * **authorUrl** (<code>string</code>)  *No description* __*Optional*__
  * **compat** (<code>boolean</code>)  Automatically run API compatibility test against the latest version published to npm after compilation. __*Default*__: false
  * **compatIgnore** (<code>string</code>)  Name of the ignore file for API compatibility tests. __*Default*__: .compatignore
  * **description** (<code>string</code>)  *No description* __*Optional*__
  * **docgen** (<code>boolean</code>)  Automatically generate API.md from jsii. __*Default*__: true
  * **dotnet** (<code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code>)  *No description* __*Optional*__
  * **eslint** (<code>boolean</code>)  Install eslint. __*Default*__: true
  * **java** (<code>[JsiiJavaTarget](#projen-jsiijavatarget)</code>)  *No description* __*Optional*__
  * **jest** (<code>boolean</code>)  Use jest for unit tests. __*Default*__: true
  * **jestOptions** (<code>[JestOptions](#projen-jestoptions)</code>)  Jest options. __*Default*__: defaults
  * **jsiiVersion** (<code>[Semver](#projen-semver)</code>)  *No description* __*Optional*__
  * **license** (<code>string</code>)  *No description* __*Optional*__
  * **python** (<code>[JsiiPythonTarget](#projen-jsiipythontarget)</code>)  *No description* __*Optional*__
  * **rootdir** (<code>string</code>)  *No description* __*Default*__: "."
  * **stability** (<code>string</code>)  *No description* __*Optional*__
  * **catalog** (<code>[Catalog](#projen-catalog)</code>)  Libraries will be picked up by the construct catalog when they are published to npm as jsii modules and will be published under:. __*Default*__: new version will be announced




## class ConstructLibraryAws 🔹 <a id="projen-constructlibraryaws"></a>

A multi-language (jsii) construct library which vends constructs designed to use within the AWS CDK with a friendly workflow and automatic publishing to the construct catalog.

```ts
const project = new ConstructLibraryAws({
   name: 'cdk-watchful',
   description: 'Watching your CDK apps since 2019',
   jsiiVersion: Semver.caret('1.7.0'),
   authorName: 'Elad Ben-Israel',
   authorEmail: 'elad.benisrael@gmail.com',
   repository: 'https://github.com/eladb/cdk-watchful.git',
   keywords: [
     "cloudwatch",
     "monitoring"
   ],

   catalog: {
     twitter: 'emeshbi'
   },

   // creates PRs for projen upgrades
   projenUpgradeSecret: 'PROJEN_GITHUB_TOKEN',

   cdkVersion: '1.54.0',
   cdkDependencies: [
     "@aws-cdk/aws-apigateway",
     "@aws-cdk/aws-cloudwatch",
     "@aws-cdk/aws-cloudwatch-actions",
     "@aws-cdk/aws-dynamodb",
     "@aws-cdk/aws-ecs",
     "@aws-cdk/aws-ecs-patterns",
     "@aws-cdk/aws-elasticloadbalancingv2",
     "@aws-cdk/aws-events",
     "@aws-cdk/aws-events-targets",
     "@aws-cdk/aws-lambda",
     "@aws-cdk/aws-rds",
     "@aws-cdk/aws-sns",
     "@aws-cdk/aws-sns-subscriptions",
     "@aws-cdk/aws-sqs",
     "@aws-cdk/core"
   ],
   devDependencies: {
     "aws-sdk": Semver.caret("2.708.0")
   },

   // jsii publishing

   java: {
     javaPackage: 'com.github.eladb.watchful',
     mavenGroupId: 'com.github.eladb',
     mavenArtifactId: 'cdk-watchful'
   },
   python: {
     distName: 'cdk-watchful',
     module: 'cdk_watchful'
   }
});

project.synth();
```

__Extends__: [ConstructLibrary](#projen-constructlibrary)

### Initializer




```ts
new ConstructLibraryAws(options: ConstructLibraryAwsOptions)
```

* **options** (<code>[ConstructLibraryAwsOptions](#projen-constructlibraryawsoptions)</code>)  *No description*
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files onn git. __*Default*__: true
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. __*Default*__: true
  * **autoReleaseSchedule** (<code>string</code>)  CRON schedule for automatically bumping and releasing a new version. __*Default*__: every 6 hours
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. __*Optional*__
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. __*Default*__: true
  * **bundledDependencies** (<code>Array<string></code>)  *No description* __*Optional*__
  * **copyrightOwner** (<code>string</code>)  License copyright owner. __*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. __*Default*__: current year
  * **dependabot** (<code>boolean</code>)  Include dependabot configuration. __*Default*__: true;
  * **dependabotOptions** (<code>[DependabotOptions](#projen-dependabotoptions)</code>)  Options for dependabot. __*Default*__: default options
  * **dependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **devDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **keywords** (<code>Array<string></code>)  *No description* __*Optional*__
  * **libdir** (<code>string</code>)  Compiler artifacts output directory. __*Default*__: "lib"
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). __*Default*__: no max
  * **mergify** (<code>boolean</code>)  Adds mergify configuration. __*Default*__: true
  * **mergifyOptions** (<code>[MergifyOptions](#projen-mergifyoptions)</code>)  Options for mergify. __*Default*__: default options
  * **minNodeVersion** (<code>string</code>)  Node.js version to require via package.json `engines` (inclusive). __*Default*__: no "engines" specified
  * **npmDistTag** (<code>string</code>)  The dist-tag to use when releasing to npm. __*Default*__: "latest"
  * **peerDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  *No description* __*Optional*__
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. __*Default*__: true
  * **projenUpgradeSecret** (<code>string</code>)  Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`). __*Default*__: no automatic projen upgrade pull requests
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. __*Default*__: latest version
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. __*Default*__: [ "master" ]
  * **releaseEveryCommit** (<code>boolean</code>)  Automatically release new versions every commit to one of branches in `releaseBranches`. __*Default*__: true
  * **releaseSchedule** (<code>string</code>)  CRON schedule to trigger new releases. __*Default*__: no scheduled releases
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. __*Default*__: true
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "master" when new versions are bumped. __*Default*__: true
  * **scripts** (<code>Map<string, string></code>)  npm scripts to include. __*Default*__: {}
  * **srcdir** (<code>string</code>)  Typescript sources directory. __*Default*__: "src"
  * **start** (<code>boolean</code>)  Defines a `yarn start` interactive experience. __*Default*__: true
  * **startOptions** (<code>[StartOptions](#projen-startoptions)</code>)  Options for `yarn start`. __*Default*__: default options
  * **testdir** (<code>string</code>)  Tests directory. __*Default*__: "test"
  * **version** (<code>[VersionOptions](#projen-versionoptions)</code>)  Options for standard-version. __*Default*__: default options
  * **workflowBootstrapSteps** (<code>Array<any></code>)  Workflow steps to use in order to bootstrap this repo. __*Default*__: [ { run: `npx projen${PROJEN_VERSION}` }, { run: 'yarn install --frozen-lockfile' } ]
  * **workflowContainerImage** (<code>string</code>)  Container image to use for GitHub workflows. __*Default*__: default image
  * **workflowNodeVersion** (<code>string</code>)  The node version to use in GitHub workflows. __*Default*__: same as `minNodeVersion`
  * **authorName** (<code>string</code>)  *No description* 
  * **name** (<code>string</code>)  *No description* 
  * **repository** (<code>string</code>)  *No description* 
  * **authorEmail** (<code>string</code>)  *No description* __*Optional*__
  * **authorOrganization** (<code>boolean</code>)  *No description* __*Optional*__
  * **authorUrl** (<code>string</code>)  *No description* __*Optional*__
  * **compat** (<code>boolean</code>)  Automatically run API compatibility test against the latest version published to npm after compilation. __*Default*__: false
  * **compatIgnore** (<code>string</code>)  Name of the ignore file for API compatibility tests. __*Default*__: .compatignore
  * **description** (<code>string</code>)  *No description* __*Optional*__
  * **docgen** (<code>boolean</code>)  Automatically generate API.md from jsii. __*Default*__: true
  * **dotnet** (<code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code>)  *No description* __*Optional*__
  * **eslint** (<code>boolean</code>)  Install eslint. __*Default*__: true
  * **java** (<code>[JsiiJavaTarget](#projen-jsiijavatarget)</code>)  *No description* __*Optional*__
  * **jest** (<code>boolean</code>)  Use jest for unit tests. __*Default*__: true
  * **jestOptions** (<code>[JestOptions](#projen-jestoptions)</code>)  Jest options. __*Default*__: defaults
  * **jsiiVersion** (<code>[Semver](#projen-semver)</code>)  *No description* __*Optional*__
  * **license** (<code>string</code>)  *No description* __*Optional*__
  * **python** (<code>[JsiiPythonTarget](#projen-jsiipythontarget)</code>)  *No description* __*Optional*__
  * **rootdir** (<code>string</code>)  *No description* __*Default*__: "."
  * **stability** (<code>string</code>)  *No description* __*Optional*__
  * **catalog** (<code>[Catalog](#projen-catalog)</code>)  Libraries will be picked up by the construct catalog when they are published to npm as jsii modules and will be published under:. __*Default*__: new version will be announced
  * **cdkAssert** (<code>boolean</code>)  Install the @aws-cdk/assert library? __*Default*__: true
  * **cdkDependencies** (<code>Array<string></code>)  Which AWS CDK modules (those that start with "@aws-cdk/") does this library require when consumed? __*Optional*__
  * **cdkTestDependencies** (<code>Array<string></code>)  AWS CDK modules required for testing. __*Optional*__
  * **cdkVersion** (<code>string</code>)  Minmum target version this library is tested against. __*Default*__: ConstructLibraryAwsCdk.defaultVersion



### Properties


Name | Type | Description 
-----|------|-------------
**version**🔹 | <code>[Semver](#projen-semver)</code> | The target CDK version for this library.
*static* **defaultVersion**🔹 | <code>string</code> | The default value for `targetVersion`.

### Methods


#### addCdkDependencies(...deps)🔹 <a id="projen-constructlibraryaws-addcdkdependencies"></a>

Adds CDK modules as runtime dependencies.

Modules are currently added with a caret CDK version both as "dependencies"
and "peerDependencies". This is because currently npm would not
automatically install peer dependencies that are not declared as concerete
dependencies by the consumer, so this is a little npm "hack" so that
consumers will not need to depend on them directly if they don't interact
with them.

```ts
addCdkDependencies(...deps: string[]): void
```

* **deps** (<code>string</code>)  names of cdk modules (e.g. `@aws-cdk/aws-lambda`).




#### addCdkTestDependencies(...deps)🔹 <a id="projen-constructlibraryaws-addcdktestdependencies"></a>

Adds CDK modules as test dependencies.

```ts
addCdkTestDependencies(...deps: string[]): void
```

* **deps** (<code>string</code>)  names of cdk modules (e.g. `@aws-cdk/aws-lambda`).






## class Dependabot 🔹 <a id="projen-dependabot"></a>

Defines dependabot configuration for node projects.

Since module versions are managed in projen, the versioning strategy will be
configured to "lockfile-only" which means that only updates that can be done
on the lockfile itself will be proposed.


### Initializer




```ts
new Dependabot(project: NodeProject, options?: DependabotOptions)
```

* **project** (<code>[NodeProject](#projen-nodeproject)</code>)  *No description*
* **options** (<code>[DependabotOptions](#projen-dependabotoptions)</code>)  *No description*
  * **autoMerge** (<code>boolean</code>)  Automatically merge dependabot PRs if build CI build passes. __*Default*__: true
  * **ignore** (<code>Array<[DependabotIgnore](#projen-dependabotignore)></code>)  You can use the `ignore` option to customize which dependencies are updated. __*Default*__: []
  * **ignoreProjen** (<code>boolean</code>)  Ignores updates to `projen`. __*Default*__: true
  * **scheduleInterval** (<code>[DependabotScheduleInterval](#projen-dependabotscheduleinterval)</code>)  How often to check for new versions and raise pull requests. __*Default*__: ScheduleInterval.DAILY
  * **versioningStrategy** (<code>[VersioningStrategy](#projen-versioningstrategy)</code>)  The strategy to use when edits manifest and lock files. __*Default*__: VersioningStrategy.LOCKFILE_ONLY The default is to only update the lock file because package.json is controlled by projen and any outside updates will fail the build.



### Properties


Name | Type | Description 
-----|------|-------------
**config**🔹 | <code>any</code> | The raw dependabot configuration.

### Methods


#### addIgnore(dependencyName, ...versions)🔹 <a id="projen-dependabot-addignore"></a>

Ignores a depepdency from automatic updates.

```ts
addIgnore(dependencyName: string, ...versions: string[]): void
```

* **dependencyName** (<code>string</code>)  Use to ignore updates for dependencies with matching names, optionally using `*` to match zero or more characters.
* **versions** (<code>string</code>)  Use to ignore specific versions or ranges of versions.






## class Eslint 🔹 <a id="projen-eslint"></a>




### Initializer




```ts
new Eslint(project: NodeProject)
```

* **project** (<code>[NodeProject](#projen-nodeproject)</code>)  *No description*



### Properties


Name | Type | Description 
-----|------|-------------
**config**🔹 | <code>any</code> | Direct access to the eslint configuration (escape hatch).
**rules**🔹 | <code>Map<string, Array<any>></code> | eslint rules.

### Methods


#### addIgnorePattern(pattern)🔹 <a id="projen-eslint-addignorepattern"></a>

Do not lint these files.

```ts
addIgnorePattern(pattern: string): void
```

* **pattern** (<code>string</code>)  *No description*




#### addRules(rules)🔹 <a id="projen-eslint-addrules"></a>

Add an eslint rule.

```ts
addRules(rules: Map<string, any>): void
```

* **rules** (<code>Map<string, any></code>)  *No description*






## class FileBase 🔹 <a id="projen-filebase"></a>



__Extends__: [Component](#projen-component)
__Implemented by__: [GithubWorkflow](#projen-githubworkflow), [IgnoreFile](#projen-ignorefile), [JsonFile](#projen-jsonfile), [License](#projen-license), [NodeBuildWorkflow](#projen-nodebuildworkflow)

### Initializer




```ts
new FileBase(project: Project, filePath: string, options?: FileBaseOptions)
```

* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **filePath** (<code>string</code>)  *No description*
* **options** (<code>[FileBaseOptions](#projen-filebaseoptions)</code>)  *No description*
  * **committed** (<code>boolean</code>)  Indicates whether this file should be committed to git or ignored. __*Default*__: true
  * **editGitignore** (<code>boolean</code>)  Update the project's .gitignore file. __*Default*__: true
  * **readonly** (<code>boolean</code>)  Whether the generated file should be readonly. __*Default*__: true



### Properties


Name | Type | Description 
-----|------|-------------
**path**🔹 | <code>string</code> | <span></span>
**readonly**🔹 | <code>boolean</code> | <span></span>

### Methods


#### protected synthesizeContent(resolver)🔹 <a id="projen-filebase-synthesizecontent"></a>

Implemented by derived classes and returns the contents of the file to emit.

```ts
protected synthesizeContent(resolver: IResolver): string
```

* **resolver** (<code>[IResolver](#projen-iresolver)</code>)  Call `resolver.resolve(obj)` on any objects in order to resolve token functions.

__Returns__:
* <code>string</code>



## class GithubWorkflow 🔹 <a id="projen-githubworkflow"></a>



__Extends__: [FileBase](#projen-filebase)

### Initializer




```ts
new GithubWorkflow(project: Project, name: string)
```

* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **name** (<code>string</code>)  *No description*


### Methods


#### addJobs(jobs)🔹 <a id="projen-githubworkflow-addjobs"></a>



```ts
addJobs(jobs: Map<string, any>): void
```

* **jobs** (<code>Map<string, any></code>)  *No description*




#### on(events)🔹 <a id="projen-githubworkflow-on"></a>



```ts
on(events: Map<string, any>): void
```

* **events** (<code>Map<string, any></code>)  *No description*




#### protected synthesizeContent(resolver)🔹 <a id="projen-githubworkflow-synthesizecontent"></a>

Implemented by derived classes and returns the contents of the file to emit.

```ts
protected synthesizeContent(resolver: IResolver): string
```

* **resolver** (<code>[IResolver](#projen-iresolver)</code>)  *No description*

__Returns__:
* <code>string</code>



## class IgnoreFile 🔹 <a id="projen-ignorefile"></a>



__Extends__: [FileBase](#projen-filebase)

### Initializer




```ts
new IgnoreFile(project: Project, filePath: string)
```

* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **filePath** (<code>string</code>)  *No description*


### Methods


#### exclude(...patterns)🔹 <a id="projen-ignorefile-exclude"></a>



```ts
exclude(...patterns: string[]): void
```

* **patterns** (<code>string</code>)  *No description*




#### include(...patterns)🔹 <a id="projen-ignorefile-include"></a>



```ts
include(...patterns: string[]): void
```

* **patterns** (<code>string</code>)  *No description*




#### protected synthesizeContent(resolver)🔹 <a id="projen-ignorefile-synthesizecontent"></a>

Implemented by derived classes and returns the contents of the file to emit.

```ts
protected synthesizeContent(resolver: IResolver): string
```

* **resolver** (<code>[IResolver](#projen-iresolver)</code>)  *No description*

__Returns__:
* <code>string</code>



## class Jest 🔹 <a id="projen-jest"></a>

Installs the following npm scripts:.

- `test` will run `jest --passWithNoTests`
- `test:watch` will run `jest --watch`
- `test:update` will run `jest -u`


### Initializer




```ts
new Jest(project: NodeProject, options?: JestOptions)
```

* **project** (<code>[NodeProject](#projen-nodeproject)</code>)  *No description*
* **options** (<code>[JestOptions](#projen-jestoptions)</code>)  *No description*
  * **coverage** (<code>boolean</code>)  Collect coverage. __*Default*__: true
  * **coverageThreshold** (<code>[CoverageThreshold](#projen-coveragethreshold)</code>)  Specify the global coverage thresholds. __*Optional*__
  * **ignorePatterns** (<code>Array<string></code>)  Defines `testPathIgnorePatterns` and `coveragePathIgnorePatterns`. __*Default*__: "/node_modules/"
  * **jestVersion** (<code>[Semver](#projen-semver)</code>)  The version of jest to use. __*Default*__: ^26.4.2
  * **typescript** (<code>[TypescriptConfig](#projen-typescriptconfig)</code>)  Configure for typescript. __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**config**🔹 | <code>any</code> | Escape hatch.

### Methods


#### addIgnorePattern(pattern)🔹 <a id="projen-jest-addignorepattern"></a>



```ts
addIgnorePattern(pattern: string): void
```

* **pattern** (<code>string</code>)  *No description*






## class JsiiProject 🔹 <a id="projen-jsiiproject"></a>

jsii library project.

__Extends__: [TypeScriptProject](#projen-typescriptproject)

### Initializer




```ts
new JsiiProject(options: JsiiProjectOptions)
```

* **options** (<code>[JsiiProjectOptions](#projen-jsiiprojectoptions)</code>)  *No description*
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files onn git. __*Default*__: true
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. __*Default*__: true
  * **autoReleaseSchedule** (<code>string</code>)  CRON schedule for automatically bumping and releasing a new version. __*Default*__: every 6 hours
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. __*Optional*__
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. __*Default*__: true
  * **bundledDependencies** (<code>Array<string></code>)  *No description* __*Optional*__
  * **copyrightOwner** (<code>string</code>)  License copyright owner. __*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. __*Default*__: current year
  * **dependabot** (<code>boolean</code>)  Include dependabot configuration. __*Default*__: true;
  * **dependabotOptions** (<code>[DependabotOptions](#projen-dependabotoptions)</code>)  Options for dependabot. __*Default*__: default options
  * **dependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **devDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **keywords** (<code>Array<string></code>)  *No description* __*Optional*__
  * **libdir** (<code>string</code>)  Compiler artifacts output directory. __*Default*__: "lib"
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). __*Default*__: no max
  * **mergify** (<code>boolean</code>)  Adds mergify configuration. __*Default*__: true
  * **mergifyOptions** (<code>[MergifyOptions](#projen-mergifyoptions)</code>)  Options for mergify. __*Default*__: default options
  * **minNodeVersion** (<code>string</code>)  Node.js version to require via package.json `engines` (inclusive). __*Default*__: no "engines" specified
  * **npmDistTag** (<code>string</code>)  The dist-tag to use when releasing to npm. __*Default*__: "latest"
  * **peerDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  *No description* __*Optional*__
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. __*Default*__: true
  * **projenUpgradeSecret** (<code>string</code>)  Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`). __*Default*__: no automatic projen upgrade pull requests
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. __*Default*__: latest version
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. __*Default*__: [ "master" ]
  * **releaseEveryCommit** (<code>boolean</code>)  Automatically release new versions every commit to one of branches in `releaseBranches`. __*Default*__: true
  * **releaseSchedule** (<code>string</code>)  CRON schedule to trigger new releases. __*Default*__: no scheduled releases
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. __*Default*__: true
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "master" when new versions are bumped. __*Default*__: true
  * **scripts** (<code>Map<string, string></code>)  npm scripts to include. __*Default*__: {}
  * **srcdir** (<code>string</code>)  Typescript sources directory. __*Default*__: "src"
  * **start** (<code>boolean</code>)  Defines a `yarn start` interactive experience. __*Default*__: true
  * **startOptions** (<code>[StartOptions](#projen-startoptions)</code>)  Options for `yarn start`. __*Default*__: default options
  * **testdir** (<code>string</code>)  Tests directory. __*Default*__: "test"
  * **version** (<code>[VersionOptions](#projen-versionoptions)</code>)  Options for standard-version. __*Default*__: default options
  * **workflowBootstrapSteps** (<code>Array<any></code>)  Workflow steps to use in order to bootstrap this repo. __*Default*__: [ { run: `npx projen${PROJEN_VERSION}` }, { run: 'yarn install --frozen-lockfile' } ]
  * **workflowContainerImage** (<code>string</code>)  Container image to use for GitHub workflows. __*Default*__: default image
  * **workflowNodeVersion** (<code>string</code>)  The node version to use in GitHub workflows. __*Default*__: same as `minNodeVersion`
  * **authorName** (<code>string</code>)  *No description* 
  * **name** (<code>string</code>)  *No description* 
  * **repository** (<code>string</code>)  *No description* 
  * **authorEmail** (<code>string</code>)  *No description* __*Optional*__
  * **authorOrganization** (<code>boolean</code>)  *No description* __*Optional*__
  * **authorUrl** (<code>string</code>)  *No description* __*Optional*__
  * **compat** (<code>boolean</code>)  Automatically run API compatibility test against the latest version published to npm after compilation. __*Default*__: false
  * **compatIgnore** (<code>string</code>)  Name of the ignore file for API compatibility tests. __*Default*__: .compatignore
  * **description** (<code>string</code>)  *No description* __*Optional*__
  * **docgen** (<code>boolean</code>)  Automatically generate API.md from jsii. __*Default*__: true
  * **dotnet** (<code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code>)  *No description* __*Optional*__
  * **eslint** (<code>boolean</code>)  Install eslint. __*Default*__: true
  * **java** (<code>[JsiiJavaTarget](#projen-jsiijavatarget)</code>)  *No description* __*Optional*__
  * **jest** (<code>boolean</code>)  Use jest for unit tests. __*Default*__: true
  * **jestOptions** (<code>[JestOptions](#projen-jestoptions)</code>)  Jest options. __*Default*__: defaults
  * **jsiiVersion** (<code>[Semver](#projen-semver)</code>)  *No description* __*Optional*__
  * **license** (<code>string</code>)  *No description* __*Optional*__
  * **python** (<code>[JsiiPythonTarget](#projen-jsiipythontarget)</code>)  *No description* __*Optional*__
  * **rootdir** (<code>string</code>)  *No description* __*Default*__: "."
  * **stability** (<code>string</code>)  *No description* __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**eslint**?🔹 | <code>[Eslint](#projen-eslint)</code> | __*Optional*__



## class JsonFile 🔹 <a id="projen-jsonfile"></a>



__Extends__: [FileBase](#projen-filebase)

### Initializer




```ts
new JsonFile(project: Project, filePath: string, options: JsonFileOptions)
```

* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **filePath** (<code>string</code>)  *No description*
* **options** (<code>[JsonFileOptions](#projen-jsonfileoptions)</code>)  *No description*
  * **committed** (<code>boolean</code>)  Indicates whether this file should be committed to git or ignored. __*Default*__: true
  * **editGitignore** (<code>boolean</code>)  Update the project's .gitignore file. __*Default*__: true
  * **readonly** (<code>boolean</code>)  Whether the generated file should be readonly. __*Default*__: true
  * **obj** (<code>any</code>)  *No description* 



### Properties


Name | Type | Description 
-----|------|-------------
**obj**🔹 | <code>json</code> | <span></span>

### Methods


#### protected synthesizeContent(resolver)🔹 <a id="projen-jsonfile-synthesizecontent"></a>

Implemented by derived classes and returns the contents of the file to emit.

```ts
protected synthesizeContent(resolver: IResolver): string
```

* **resolver** (<code>[IResolver](#projen-iresolver)</code>)  *No description*

__Returns__:
* <code>string</code>



## class LernaProject 🔹 <a id="projen-lernaproject"></a>

lerna monorepo project.

__Extends__: [NodeProject](#projen-nodeproject)

### Initializer




```ts
new LernaProject(options: LernaProjectOptions)
```

* **options** (<code>[LernaProjectOptions](#projen-lernaprojectoptions)</code>)  *No description*
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files onn git. __*Default*__: true
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. __*Default*__: true
  * **autoReleaseSchedule** (<code>string</code>)  CRON schedule for automatically bumping and releasing a new version. __*Default*__: every 6 hours
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. __*Optional*__
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. __*Default*__: true
  * **bundledDependencies** (<code>Array<string></code>)  *No description* __*Optional*__
  * **copyrightOwner** (<code>string</code>)  License copyright owner. __*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. __*Default*__: current year
  * **dependabot** (<code>boolean</code>)  Include dependabot configuration. __*Default*__: true;
  * **dependabotOptions** (<code>[DependabotOptions](#projen-dependabotoptions)</code>)  Options for dependabot. __*Default*__: default options
  * **dependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **devDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **keywords** (<code>Array<string></code>)  *No description* __*Optional*__
  * **libdir** (<code>string</code>)  Compiler artifacts output directory. __*Default*__: "lib"
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). __*Default*__: no max
  * **mergify** (<code>boolean</code>)  Adds mergify configuration. __*Default*__: true
  * **mergifyOptions** (<code>[MergifyOptions](#projen-mergifyoptions)</code>)  Options for mergify. __*Default*__: default options
  * **minNodeVersion** (<code>string</code>)  Node.js version to require via package.json `engines` (inclusive). __*Default*__: no "engines" specified
  * **npmDistTag** (<code>string</code>)  The dist-tag to use when releasing to npm. __*Default*__: "latest"
  * **peerDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  *No description* __*Optional*__
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. __*Default*__: true
  * **projenUpgradeSecret** (<code>string</code>)  Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`). __*Default*__: no automatic projen upgrade pull requests
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. __*Default*__: latest version
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. __*Default*__: [ "master" ]
  * **releaseEveryCommit** (<code>boolean</code>)  Automatically release new versions every commit to one of branches in `releaseBranches`. __*Default*__: true
  * **releaseSchedule** (<code>string</code>)  CRON schedule to trigger new releases. __*Default*__: no scheduled releases
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. __*Default*__: true
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "master" when new versions are bumped. __*Default*__: true
  * **scripts** (<code>Map<string, string></code>)  npm scripts to include. __*Default*__: {}
  * **srcdir** (<code>string</code>)  Typescript sources directory. __*Default*__: "src"
  * **start** (<code>boolean</code>)  Defines a `yarn start` interactive experience. __*Default*__: true
  * **startOptions** (<code>[StartOptions](#projen-startoptions)</code>)  Options for `yarn start`. __*Default*__: default options
  * **testdir** (<code>string</code>)  Tests directory. __*Default*__: "test"
  * **version** (<code>[VersionOptions](#projen-versionoptions)</code>)  Options for standard-version. __*Default*__: default options
  * **workflowBootstrapSteps** (<code>Array<any></code>)  Workflow steps to use in order to bootstrap this repo. __*Default*__: [ { run: `npx projen${PROJEN_VERSION}` }, { run: 'yarn install --frozen-lockfile' } ]
  * **workflowContainerImage** (<code>string</code>)  Container image to use for GitHub workflows. __*Default*__: default image
  * **workflowNodeVersion** (<code>string</code>)  The node version to use in GitHub workflows. __*Default*__: same as `minNodeVersion`
  * **name** (<code>string</code>)  This is the name of your package. 
  * **authorEmail** (<code>string</code>)  Author's e-mail. __*Optional*__
  * **authorName** (<code>string</code>)  Author's name. __*Optional*__
  * **authorOrganization** (<code>boolean</code>)  Author's Organization. __*Optional*__
  * **authorUrl** (<code>string</code>)  Author's URL / Website. __*Optional*__
  * **description** (<code>string</code>)  The description is just a string that helps people understand the purpose of the package. __*Optional*__
  * **gitignore** (<code>Array<string></code>)  Additional entries to .gitignore. __*Optional*__
  * **homepage** (<code>string</code>)  Package's Homepage / Website. __*Optional*__
  * **license** (<code>string</code>)  License's SPDX identifier. __*Optional*__
  * **npmignore** (<code>Array<string></code>)  Additional entries to .npmignore. __*Optional*__
  * **private** (<code>boolean</code>)  If you do not want your package published in a package manager, set this to true. __*Optional*__
  * **repository** (<code>string</code>)  The repository is the location where the actual code for your package lives. __*Optional*__
  * **repositoryDirectory** (<code>string</code>)  If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives. __*Optional*__
  * **stability** (<code>string</code>)  Package's Stability. __*Optional*__
  * **lernaVersion** (<code>[Semver](#projen-semver)</code>)  Version of lerna to use. __*Default*__: '^3.22.1'
  * **npmClient** (<code>string</code>)  Specify a specific client to run commands with (this can also be specified on a per command basis). __*Default*__: 'yarn'
  * **packages** (<code>Array<[LernaPackage](#projen-lernapackage)></code>)  Packages to create. __*Default*__: []
  * **useWorkspaces** (<code>boolean</code>)  Enables integration with Yarn Workspaces (available since yarn@0.27+). __*Default*__: true


### Methods


#### addPackage(project, location?)🔹 <a id="projen-lernaproject-addpackage"></a>

Adds a package to the project.

```ts
addPackage(project: NodeProject, location?: string): void
```

* **project** (<code>[NodeProject](#projen-nodeproject)</code>)  The `NodeProject` to add.
* **location** (<code>string</code>)  The path to add the project to.




#### addWorkspace(pattern)🔹 <a id="projen-lernaproject-addworkspace"></a>

Adds a workspace to the yarn workspaces list.

```ts
addWorkspace(pattern: string): void
```

* **pattern** (<code>string</code>)  The pattern to add.




#### noHoist(project, dependency)🔹 <a id="projen-lernaproject-nohoist"></a>

This can be used to opt out of hoisting for certain dependencies.

```ts
noHoist(project: string &#124; NodeProject, dependency: string &#124; NodeProject): void
```

* **project** (<code>string &#124; [NodeProject](#projen-nodeproject)</code>)  The project containing a non-hoistable dependency.
* **dependency** (<code>string &#124; [NodeProject](#projen-nodeproject)</code>)  The dependency within the project to opt out of hoisting for.






## class License 🔹 <a id="projen-license"></a>



__Extends__: [FileBase](#projen-filebase)

### Initializer




```ts
new License(project: Project, spdx: string, options: LicenseOptions)
```

* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **spdx** (<code>string</code>)  *No description*
* **options** (<code>[LicenseOptions](#projen-licenseoptions)</code>)  *No description*
  * **copyrightOwner** (<code>string</code>)  Copyright owner. __*Default*__: ""
  * **copyrightPeriod** (<code>string</code>)  Period of license (e.g. "1998-2023"). __*Default*__: current year (e.g. "2020")


### Methods


#### protected synthesizeContent(_)🔹 <a id="projen-license-synthesizecontent"></a>

Implemented by derived classes and returns the contents of the file to emit.

```ts
protected synthesizeContent(_: IResolver): string
```

* **_** (<code>[IResolver](#projen-iresolver)</code>)  *No description*

__Returns__:
* <code>string</code>



## class Mergify 🔹 <a id="projen-mergify"></a>




### Initializer




```ts
new Mergify(project: Project, options?: MergifyOptions)
```

* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **options** (<code>[MergifyOptions](#projen-mergifyoptions)</code>)  *No description*
  * **rules** (<code>Array<[MergifyRule](#projen-mergifyrule)></code>)  *No description* __*Optional*__


### Methods


#### addRule(rule)🔹 <a id="projen-mergify-addrule"></a>



```ts
addRule(rule: MergifyRule): void
```

* **rule** (<code>[MergifyRule](#projen-mergifyrule)</code>)  *No description*
  * **actions** (<code>Map<string, any></code>)  *No description* 
  * **conditions** (<code>Array<string></code>)  *No description* 
  * **name** (<code>string</code>)  *No description* 






## class NodeBuildWorkflow 🔹 <a id="projen-nodebuildworkflow"></a>



__Extends__: [GithubWorkflow](#projen-githubworkflow)

### Initializer




```ts
new NodeBuildWorkflow(project: NodeProject, name: string, options: NodeBuildWorkflowOptions)
```

* **project** (<code>[NodeProject](#projen-nodeproject)</code>)  *No description*
* **name** (<code>string</code>)  *No description*
* **options** (<code>[NodeBuildWorkflowOptions](#projen-nodebuildworkflowoptions)</code>)  *No description*
  * **trigger** (<code>Map<string, any></code>)  *No description* 
  * **bump** (<code>boolean</code>)  Bump a new version for this build. __*Default*__: false
  * **image** (<code>string</code>)  *No description* __*Default*__: default image
  * **uploadArtifact** (<code>boolean</code>)  *No description* __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**buildJobId**🔹 | <code>string</code> | <span></span>



## class NodeProject 🔹 <a id="projen-nodeproject"></a>



__Extends__: [Project](#projen-project)

### Initializer




```ts
new NodeProject(options: NodeProjectOptions)
```

* **options** (<code>[NodeProjectOptions](#projen-nodeprojectoptions)</code>)  *No description*
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files onn git. __*Default*__: true
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. __*Default*__: true
  * **autoReleaseSchedule** (<code>string</code>)  CRON schedule for automatically bumping and releasing a new version. __*Default*__: every 6 hours
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. __*Optional*__
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. __*Default*__: true
  * **bundledDependencies** (<code>Array<string></code>)  *No description* __*Optional*__
  * **copyrightOwner** (<code>string</code>)  License copyright owner. __*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. __*Default*__: current year
  * **dependabot** (<code>boolean</code>)  Include dependabot configuration. __*Default*__: true;
  * **dependabotOptions** (<code>[DependabotOptions](#projen-dependabotoptions)</code>)  Options for dependabot. __*Default*__: default options
  * **dependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **devDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **keywords** (<code>Array<string></code>)  *No description* __*Optional*__
  * **libdir** (<code>string</code>)  Compiler artifacts output directory. __*Default*__: "lib"
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). __*Default*__: no max
  * **mergify** (<code>boolean</code>)  Adds mergify configuration. __*Default*__: true
  * **mergifyOptions** (<code>[MergifyOptions](#projen-mergifyoptions)</code>)  Options for mergify. __*Default*__: default options
  * **minNodeVersion** (<code>string</code>)  Node.js version to require via package.json `engines` (inclusive). __*Default*__: no "engines" specified
  * **npmDistTag** (<code>string</code>)  The dist-tag to use when releasing to npm. __*Default*__: "latest"
  * **peerDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  *No description* __*Optional*__
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. __*Default*__: true
  * **projenUpgradeSecret** (<code>string</code>)  Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`). __*Default*__: no automatic projen upgrade pull requests
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. __*Default*__: latest version
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. __*Default*__: [ "master" ]
  * **releaseEveryCommit** (<code>boolean</code>)  Automatically release new versions every commit to one of branches in `releaseBranches`. __*Default*__: true
  * **releaseSchedule** (<code>string</code>)  CRON schedule to trigger new releases. __*Default*__: no scheduled releases
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. __*Default*__: true
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "master" when new versions are bumped. __*Default*__: true
  * **scripts** (<code>Map<string, string></code>)  npm scripts to include. __*Default*__: {}
  * **srcdir** (<code>string</code>)  Typescript sources directory. __*Default*__: "src"
  * **start** (<code>boolean</code>)  Defines a `yarn start` interactive experience. __*Default*__: true
  * **startOptions** (<code>[StartOptions](#projen-startoptions)</code>)  Options for `yarn start`. __*Default*__: default options
  * **testdir** (<code>string</code>)  Tests directory. __*Default*__: "test"
  * **version** (<code>[VersionOptions](#projen-versionoptions)</code>)  Options for standard-version. __*Default*__: default options
  * **workflowBootstrapSteps** (<code>Array<any></code>)  Workflow steps to use in order to bootstrap this repo. __*Default*__: [ { run: `npx projen${PROJEN_VERSION}` }, { run: 'yarn install --frozen-lockfile' } ]
  * **workflowContainerImage** (<code>string</code>)  Container image to use for GitHub workflows. __*Default*__: default image
  * **workflowNodeVersion** (<code>string</code>)  The node version to use in GitHub workflows. __*Default*__: same as `minNodeVersion`
  * **name** (<code>string</code>)  This is the name of your package. 
  * **authorEmail** (<code>string</code>)  Author's e-mail. __*Optional*__
  * **authorName** (<code>string</code>)  Author's name. __*Optional*__
  * **authorOrganization** (<code>boolean</code>)  Author's Organization. __*Optional*__
  * **authorUrl** (<code>string</code>)  Author's URL / Website. __*Optional*__
  * **description** (<code>string</code>)  The description is just a string that helps people understand the purpose of the package. __*Optional*__
  * **gitignore** (<code>Array<string></code>)  Additional entries to .gitignore. __*Optional*__
  * **homepage** (<code>string</code>)  Package's Homepage / Website. __*Optional*__
  * **license** (<code>string</code>)  License's SPDX identifier. __*Optional*__
  * **npmignore** (<code>Array<string></code>)  Additional entries to .npmignore. __*Optional*__
  * **private** (<code>boolean</code>)  If you do not want your package published in a package manager, set this to true. __*Optional*__
  * **repository** (<code>string</code>)  The repository is the location where the actual code for your package lives. __*Optional*__
  * **repositoryDirectory** (<code>string</code>)  If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives. __*Optional*__
  * **stability** (<code>string</code>)  Package's Stability. __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**antitamper**🔹 | <code>boolean</code> | Indicates if workflows have anti-tamper checks.
**manifest**🔹 | <code>any</code> | <span></span>
**npmDistTag**🔹 | <code>string</code> | <span></span>
**npmignore**🔹 | <code>[IgnoreFile](#projen-ignorefile)</code> | <span></span>
**workflowAntitamperSteps**🔹 | <code>Array<any></code> | Returns the set of steps to perform anti-tamper check in a github workflow.
**workflowBootstrapSteps**🔹 | <code>Array<any></code> | Returns a set of steps to checkout and bootstrap the project in a github workflow.
**buildWorkflow**?🔹 | <code>[NodeBuildWorkflow](#projen-nodebuildworkflow)</code> | The PR build GitHub workflow.<br/>__*Optional*__
**maxNodeVersion**?🔹 | <code>string</code> | __*Optional*__
**mergify**?🔹 | <code>[Mergify](#projen-mergify)</code> | __*Optional*__
**minNodeVersion**?🔹 | <code>string</code> | __*Optional*__
**releaseWorkflow**?🔹 | <code>[NodeBuildWorkflow](#projen-nodebuildworkflow)</code> | The release GitHub workflow.<br/>__*Optional*__
**start**?🔹 | <code>[Start](#projen-start)</code> | The start menu.<br/>__*Optional*__

### Methods


#### addBins(bins)🔹 <a id="projen-nodeproject-addbins"></a>



```ts
addBins(bins: Map<string, string>): void
```

* **bins** (<code>Map<string, string></code>)  *No description*




#### addBundledDependencies(...deps)🔹 <a id="projen-nodeproject-addbundleddependencies"></a>



```ts
addBundledDependencies(...deps: string[]): void
```

* **deps** (<code>string</code>)  *No description*




#### addCompileCommand(...commands)🔹 <a id="projen-nodeproject-addcompilecommand"></a>

Adds that will be executed after the jsii compilation.

```ts
addCompileCommand(...commands: string[]): void
```

* **commands** (<code>string</code>)  The commands to execute during compile.




#### addDependencies(deps, bundle?)🔹 <a id="projen-nodeproject-adddependencies"></a>



```ts
addDependencies(deps: Map<string, Semver>, bundle?: boolean): void
```

* **deps** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description*
* **bundle** (<code>boolean</code>)  *No description*




#### addDevDependencies(deps)🔹 <a id="projen-nodeproject-adddevdependencies"></a>



```ts
addDevDependencies(deps: Map<string, Semver>): void
```

* **deps** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description*




#### addFields(fields)🔹 <a id="projen-nodeproject-addfields"></a>



```ts
addFields(fields: Map<string, any>): void
```

* **fields** (<code>Map<string, any></code>)  *No description*




#### addKeywords(...keywords)🔹 <a id="projen-nodeproject-addkeywords"></a>

Adds keywords to package.json (deduplicated).

```ts
addKeywords(...keywords: string[]): void
```

* **keywords** (<code>string</code>)  The keywords to add.




#### addPeerDependencies(deps, options?)🔹 <a id="projen-nodeproject-addpeerdependencies"></a>



```ts
addPeerDependencies(deps: Map<string, Semver>, options?: PeerDependencyOptions): void
```

* **deps** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description*
* **options** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  *No description*
  * **pinnedDevDependency** (<code>boolean</code>)  Automatically add a pinned dev dependency. __*Default*__: true




#### addScript(name, ...commands)🔹 <a id="projen-nodeproject-addscript"></a>

Replaces the contents of an npm package.json script.

```ts
addScript(name: string, ...commands: string[]): void
```

* **name** (<code>string</code>)  The script namne.
* **commands** (<code>string</code>)  The commands to run (joined by "&&").




#### addScriptCommand(name, ...commands)🔹 <a id="projen-nodeproject-addscriptcommand"></a>

Appends a command to run for an npm script.

Joined by "&&"

```ts
addScriptCommand(name: string, ...commands: string[]): void
```

* **name** (<code>string</code>)  The name of the script.
* **commands** (<code>string</code>)  The commands to append.




#### addScripts(scripts)🔹 <a id="projen-nodeproject-addscripts"></a>

Replaces the contents of a set of npm package.json scripts.

```ts
addScripts(scripts: Map<string, string>): void
```

* **scripts** (<code>Map<string, string></code>)  script names and commands.




#### addTestCommand(...commands)🔹 <a id="projen-nodeproject-addtestcommand"></a>



```ts
addTestCommand(...commands: string[]): void
```

* **commands** (<code>string</code>)  *No description*




#### hasScript(name)🔹 <a id="projen-nodeproject-hasscript"></a>

Indicates if a script by the name name is defined.

```ts
hasScript(name: string): boolean
```

* **name** (<code>string</code>)  The name of the script.

__Returns__:
* <code>boolean</code>



## class Project 🔹 <a id="projen-project"></a>




### Initializer




```ts
new Project()
```




### Properties


Name | Type | Description 
-----|------|-------------
**gitignore**🔹 | <code>[IgnoreFile](#projen-ignorefile)</code> | <span></span>

### Methods


#### printTip(message)🔹 <a id="projen-project-printtip"></a>

Prints a "tip" message during synthesis.

```ts
printTip(message: string): void
```

* **message** (<code>string</code>)  The message.




#### synth(outdir?)🔹 <a id="projen-project-synth"></a>

Synthesize all project files into `outdir`.

```ts
synth(outdir?: string): void
```

* **outdir** (<code>string</code>)  The project root directory (default is `.`).






## class Semver 🔹 <a id="projen-semver"></a>





### Properties


Name | Type | Description 
-----|------|-------------
**spec**🔹 | <code>string</code> | <span></span>
**version**🔹 | <code>string</code> | <span></span>
**mode**?🔹 | <code>string</code> | __*Optional*__

### Methods


#### *static* caret(version)🔹 <a id="projen-semver-caret"></a>

Accept any minor version.

>= version
< next major version

```ts
static caret(version: string): Semver
```

* **version** (<code>string</code>)  *No description*

__Returns__:
* <code>[Semver](#projen-semver)</code>

#### *static* pinned(version)🔹 <a id="projen-semver-pinned"></a>

Accept only an exact version.

```ts
static pinned(version: string): Semver
```

* **version** (<code>string</code>)  *No description*

__Returns__:
* <code>[Semver](#projen-semver)</code>

#### *static* tilde(version)🔹 <a id="projen-semver-tilde"></a>

Accept patches.

>= version
< next minor version

```ts
static tilde(version: string): Semver
```

* **version** (<code>string</code>)  *No description*

__Returns__:
* <code>[Semver](#projen-semver)</code>



## class Start 🔹 <a id="projen-start"></a>



__Extends__: [Component](#projen-component)

### Initializer




```ts
new Start(project: NodeProject, _options?: StartOptions)
```

* **project** (<code>[NodeProject](#projen-nodeproject)</code>)  *No description*
* **_options** (<code>[StartOptions](#projen-startoptions)</code>)  *No description*


### Methods


#### addEntry(name, options)🔹 <a id="projen-start-addentry"></a>

Adds a script to the start menu.

```ts
addEntry(name: string, options: StartEntryOptions): void
```

* **name** (<code>string</code>)  The npm script name.
* **options** (<code>[StartEntryOptions](#projen-startentryoptions)</code>)  Entry options.
  * **descrtiption** (<code>string</code>)  The description of the start entry. 
  * **category** (<code>[StartEntryCategory](#projen-startentrycategory)</code>)  Priority-order (lower values will be shown first). __*Default*__: StartEntryCategory.MISC






## class TypeScriptLibraryProject ⚠️ <a id="projen-typescriptlibraryproject"></a>



__Extends__: [TypeScriptProject](#projen-typescriptproject)

### Initializer




```ts
new TypeScriptLibraryProject(options: TypeScriptProjectOptions)
```

* **options** (<code>[TypeScriptProjectOptions](#projen-typescriptprojectoptions)</code>)  *No description*
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files onn git. __*Default*__: true
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. __*Default*__: true
  * **autoReleaseSchedule** (<code>string</code>)  CRON schedule for automatically bumping and releasing a new version. __*Default*__: every 6 hours
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. __*Optional*__
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. __*Default*__: true
  * **bundledDependencies** (<code>Array<string></code>)  *No description* __*Optional*__
  * **copyrightOwner** (<code>string</code>)  License copyright owner. __*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. __*Default*__: current year
  * **dependabot** (<code>boolean</code>)  Include dependabot configuration. __*Default*__: true;
  * **dependabotOptions** (<code>[DependabotOptions](#projen-dependabotoptions)</code>)  Options for dependabot. __*Default*__: default options
  * **dependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **devDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **keywords** (<code>Array<string></code>)  *No description* __*Optional*__
  * **libdir** (<code>string</code>)  Compiler artifacts output directory. __*Default*__: "lib"
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). __*Default*__: no max
  * **mergify** (<code>boolean</code>)  Adds mergify configuration. __*Default*__: true
  * **mergifyOptions** (<code>[MergifyOptions](#projen-mergifyoptions)</code>)  Options for mergify. __*Default*__: default options
  * **minNodeVersion** (<code>string</code>)  Node.js version to require via package.json `engines` (inclusive). __*Default*__: no "engines" specified
  * **npmDistTag** (<code>string</code>)  The dist-tag to use when releasing to npm. __*Default*__: "latest"
  * **peerDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  *No description* __*Optional*__
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. __*Default*__: true
  * **projenUpgradeSecret** (<code>string</code>)  Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`). __*Default*__: no automatic projen upgrade pull requests
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. __*Default*__: latest version
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. __*Default*__: [ "master" ]
  * **releaseEveryCommit** (<code>boolean</code>)  Automatically release new versions every commit to one of branches in `releaseBranches`. __*Default*__: true
  * **releaseSchedule** (<code>string</code>)  CRON schedule to trigger new releases. __*Default*__: no scheduled releases
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. __*Default*__: true
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "master" when new versions are bumped. __*Default*__: true
  * **scripts** (<code>Map<string, string></code>)  npm scripts to include. __*Default*__: {}
  * **srcdir** (<code>string</code>)  Typescript sources directory. __*Default*__: "src"
  * **start** (<code>boolean</code>)  Defines a `yarn start` interactive experience. __*Default*__: true
  * **startOptions** (<code>[StartOptions](#projen-startoptions)</code>)  Options for `yarn start`. __*Default*__: default options
  * **testdir** (<code>string</code>)  Tests directory. __*Default*__: "test"
  * **version** (<code>[VersionOptions](#projen-versionoptions)</code>)  Options for standard-version. __*Default*__: default options
  * **workflowBootstrapSteps** (<code>Array<any></code>)  Workflow steps to use in order to bootstrap this repo. __*Default*__: [ { run: `npx projen${PROJEN_VERSION}` }, { run: 'yarn install --frozen-lockfile' } ]
  * **workflowContainerImage** (<code>string</code>)  Container image to use for GitHub workflows. __*Default*__: default image
  * **workflowNodeVersion** (<code>string</code>)  The node version to use in GitHub workflows. __*Default*__: same as `minNodeVersion`
  * **name** (<code>string</code>)  This is the name of your package. 
  * **authorEmail** (<code>string</code>)  Author's e-mail. __*Optional*__
  * **authorName** (<code>string</code>)  Author's name. __*Optional*__
  * **authorOrganization** (<code>boolean</code>)  Author's Organization. __*Optional*__
  * **authorUrl** (<code>string</code>)  Author's URL / Website. __*Optional*__
  * **description** (<code>string</code>)  The description is just a string that helps people understand the purpose of the package. __*Optional*__
  * **gitignore** (<code>Array<string></code>)  Additional entries to .gitignore. __*Optional*__
  * **homepage** (<code>string</code>)  Package's Homepage / Website. __*Optional*__
  * **license** (<code>string</code>)  License's SPDX identifier. __*Optional*__
  * **npmignore** (<code>Array<string></code>)  Additional entries to .npmignore. __*Optional*__
  * **private** (<code>boolean</code>)  If you do not want your package published in a package manager, set this to true. __*Optional*__
  * **repository** (<code>string</code>)  The repository is the location where the actual code for your package lives. __*Optional*__
  * **repositoryDirectory** (<code>string</code>)  If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives. __*Optional*__
  * **stability** (<code>string</code>)  Package's Stability. __*Optional*__
  * **compileBeforeTest** (<code>boolean</code>)  Compile the code before running tests. __*Default*__: the default behavior is to delete the lib/ directory and run jest typescript tests and only if all tests pass, run the compiler.
  * **disableTsconfig** (<code>boolean</code>)  Do not generate a `tsconfig.json` file (used by jsii projects since tsconfig.json is generated by the jsii compiler). __*Default*__: false
  * **docgen** (<code>boolean</code>)  Docgen by Typedoc. __*Default*__: false
  * **docsDirectory** (<code>string</code>)  Docs directory. __*Default*__: 'docs'
  * **eslint** (<code>boolean</code>)  Setup eslint. __*Default*__: true
  * **jest** (<code>boolean</code>)  Setup jest unit tests. __*Default*__: true
  * **jestOptions** (<code>[JestOptions](#projen-jestoptions)</code>)  Jest options. __*Default*__: default options
  * **tsconfig** (<code>[TypescriptConfigOptions](#projen-typescriptconfigoptions)</code>)  Custom TSConfig. __*Optional*__
  * **typescriptVersion** (<code>[Semver](#projen-semver)</code>)  TypeScript version to use. __*Default*__: ^3.9.5




## class TypeScriptProject 🔹 <a id="projen-typescriptproject"></a>

typescript project.

__Extends__: [NodeProject](#projen-nodeproject)

### Initializer




```ts
new TypeScriptProject(options: TypeScriptProjectOptions)
```

* **options** (<code>[TypeScriptProjectOptions](#projen-typescriptprojectoptions)</code>)  *No description*
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files onn git. __*Default*__: true
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. __*Default*__: true
  * **autoReleaseSchedule** (<code>string</code>)  CRON schedule for automatically bumping and releasing a new version. __*Default*__: every 6 hours
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. __*Optional*__
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. __*Default*__: true
  * **bundledDependencies** (<code>Array<string></code>)  *No description* __*Optional*__
  * **copyrightOwner** (<code>string</code>)  License copyright owner. __*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. __*Default*__: current year
  * **dependabot** (<code>boolean</code>)  Include dependabot configuration. __*Default*__: true;
  * **dependabotOptions** (<code>[DependabotOptions](#projen-dependabotoptions)</code>)  Options for dependabot. __*Default*__: default options
  * **dependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **devDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **keywords** (<code>Array<string></code>)  *No description* __*Optional*__
  * **libdir** (<code>string</code>)  Compiler artifacts output directory. __*Default*__: "lib"
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). __*Default*__: no max
  * **mergify** (<code>boolean</code>)  Adds mergify configuration. __*Default*__: true
  * **mergifyOptions** (<code>[MergifyOptions](#projen-mergifyoptions)</code>)  Options for mergify. __*Default*__: default options
  * **minNodeVersion** (<code>string</code>)  Node.js version to require via package.json `engines` (inclusive). __*Default*__: no "engines" specified
  * **npmDistTag** (<code>string</code>)  The dist-tag to use when releasing to npm. __*Default*__: "latest"
  * **peerDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  *No description* __*Optional*__
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. __*Default*__: true
  * **projenUpgradeSecret** (<code>string</code>)  Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`). __*Default*__: no automatic projen upgrade pull requests
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. __*Default*__: latest version
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. __*Default*__: [ "master" ]
  * **releaseEveryCommit** (<code>boolean</code>)  Automatically release new versions every commit to one of branches in `releaseBranches`. __*Default*__: true
  * **releaseSchedule** (<code>string</code>)  CRON schedule to trigger new releases. __*Default*__: no scheduled releases
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. __*Default*__: true
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "master" when new versions are bumped. __*Default*__: true
  * **scripts** (<code>Map<string, string></code>)  npm scripts to include. __*Default*__: {}
  * **srcdir** (<code>string</code>)  Typescript sources directory. __*Default*__: "src"
  * **start** (<code>boolean</code>)  Defines a `yarn start` interactive experience. __*Default*__: true
  * **startOptions** (<code>[StartOptions](#projen-startoptions)</code>)  Options for `yarn start`. __*Default*__: default options
  * **testdir** (<code>string</code>)  Tests directory. __*Default*__: "test"
  * **version** (<code>[VersionOptions](#projen-versionoptions)</code>)  Options for standard-version. __*Default*__: default options
  * **workflowBootstrapSteps** (<code>Array<any></code>)  Workflow steps to use in order to bootstrap this repo. __*Default*__: [ { run: `npx projen${PROJEN_VERSION}` }, { run: 'yarn install --frozen-lockfile' } ]
  * **workflowContainerImage** (<code>string</code>)  Container image to use for GitHub workflows. __*Default*__: default image
  * **workflowNodeVersion** (<code>string</code>)  The node version to use in GitHub workflows. __*Default*__: same as `minNodeVersion`
  * **name** (<code>string</code>)  This is the name of your package. 
  * **authorEmail** (<code>string</code>)  Author's e-mail. __*Optional*__
  * **authorName** (<code>string</code>)  Author's name. __*Optional*__
  * **authorOrganization** (<code>boolean</code>)  Author's Organization. __*Optional*__
  * **authorUrl** (<code>string</code>)  Author's URL / Website. __*Optional*__
  * **description** (<code>string</code>)  The description is just a string that helps people understand the purpose of the package. __*Optional*__
  * **gitignore** (<code>Array<string></code>)  Additional entries to .gitignore. __*Optional*__
  * **homepage** (<code>string</code>)  Package's Homepage / Website. __*Optional*__
  * **license** (<code>string</code>)  License's SPDX identifier. __*Optional*__
  * **npmignore** (<code>Array<string></code>)  Additional entries to .npmignore. __*Optional*__
  * **private** (<code>boolean</code>)  If you do not want your package published in a package manager, set this to true. __*Optional*__
  * **repository** (<code>string</code>)  The repository is the location where the actual code for your package lives. __*Optional*__
  * **repositoryDirectory** (<code>string</code>)  If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives. __*Optional*__
  * **stability** (<code>string</code>)  Package's Stability. __*Optional*__
  * **compileBeforeTest** (<code>boolean</code>)  Compile the code before running tests. __*Default*__: the default behavior is to delete the lib/ directory and run jest typescript tests and only if all tests pass, run the compiler.
  * **disableTsconfig** (<code>boolean</code>)  Do not generate a `tsconfig.json` file (used by jsii projects since tsconfig.json is generated by the jsii compiler). __*Default*__: false
  * **docgen** (<code>boolean</code>)  Docgen by Typedoc. __*Default*__: false
  * **docsDirectory** (<code>string</code>)  Docs directory. __*Default*__: 'docs'
  * **eslint** (<code>boolean</code>)  Setup eslint. __*Default*__: true
  * **jest** (<code>boolean</code>)  Setup jest unit tests. __*Default*__: true
  * **jestOptions** (<code>[JestOptions](#projen-jestoptions)</code>)  Jest options. __*Default*__: default options
  * **tsconfig** (<code>[TypescriptConfigOptions](#projen-typescriptconfigoptions)</code>)  Custom TSConfig. __*Optional*__
  * **typescriptVersion** (<code>[Semver](#projen-semver)</code>)  TypeScript version to use. __*Default*__: ^3.9.5



### Properties


Name | Type | Description 
-----|------|-------------
**docsDirectory**🔹 | <code>string</code> | <span></span>
**libdir**🔹 | <code>string</code> | The directory in which compiled .js files reside.
**srcdir**🔹 | <code>string</code> | The directory in which the .ts sources reside.
**testdir**🔹 | <code>string</code> | The directory in which .ts tests reside.
**docgen**?🔹 | <code>boolean</code> | __*Optional*__
**eslint**?🔹 | <code>[Eslint](#projen-eslint)</code> | __*Optional*__
**jest**?🔹 | <code>[Jest](#projen-jest)</code> | __*Optional*__



## class TypescriptConfig 🔹 <a id="projen-typescriptconfig"></a>




### Initializer




```ts
new TypescriptConfig(project: NodeProject, options: TypescriptConfigOptions)
```

* **project** (<code>[NodeProject](#projen-nodeproject)</code>)  *No description*
* **options** (<code>[TypescriptConfigOptions](#projen-typescriptconfigoptions)</code>)  *No description*
  * **compilerOptions** (<code>[TypeScriptCompilerOptions](#projen-typescriptcompileroptions)</code>)  Compiler options to use. 
  * **exclude** (<code>Array<string></code>)  *No description* __*Default*__: node_modules is excluded by default
  * **fileName** (<code>string</code>)  *No description* __*Default*__: "tsconfig.json"
  * **include** (<code>Array<string></code>)  The directory in which typescript sources reside. __*Default*__: all .ts files recursively



### Properties


Name | Type | Description 
-----|------|-------------
**compilerOptions**🔹 | <code>[TypeScriptCompilerOptions](#projen-typescriptcompileroptions)</code> | <span></span>
**exclude**🔹 | <code>Array<string></code> | <span></span>
**fileName**🔹 | <code>string</code> | <span></span>
**include**🔹 | <code>Array<string></code> | <span></span>



## class Version 🔹 <a id="projen-version"></a>




### Initializer




```ts
new Version(project: NodeProject, options?: VersionOptions)
```

* **project** (<code>[NodeProject](#projen-nodeproject)</code>)  *No description*
* **options** (<code>[VersionOptions](#projen-versionoptions)</code>)  *No description*
  * **commitAll** (<code>boolean</code>)  Commit generated artifacts in the release commit. __*Default*__: false
  * **lifecycleScripts** (<code>[LifecycleScriptOptions](#projen-lifecyclescriptoptions)</code>)  standard-version supports lifecycle scripts. __*Default*__: no lifecycle scripts
  * **skip** (<code>[SkipOptions](#projen-skipoptions)</code>)  standard-version allows for skipping any of the lifecycle steps (bump, changelog, commit, tag). __*Default*__: no lifecycle steps are skipped
  * **versionFilename** (<code>string</code>)  Filename used to track the version. __*Default*__: 'version.json'
  * **versionUpdater** (<code>[VersionUpdater](#projen-versionupdater)</code>)  The standard-version "updater" defines how the version file will be bumped. __*Default*__: VersionUpdater.JSON


### Methods


#### resolveVersion(outdir)🔹 <a id="projen-version-resolveversion"></a>

Returns the current version of the project.

```ts
resolveVersion(outdir: string): any
```

* **outdir** (<code>string</code>)  *No description*

__Returns__:
* <code>any</code>



## struct Catalog 🔹 <a id="projen-catalog"></a>






Name | Type | Description 
-----|------|-------------
**announce**?🔹 | <code>boolean</code> | Should we announce new versions?<br/>__*Default*__: true
**twitter**?🔹 | <code>string</code> | Twitter account to @mention in announcement tweet.<br/>__*Optional*__



## struct ConstructLibraryAwsOptions 🔹 <a id="projen-constructlibraryawsoptions"></a>


Options for the construct-lib-aws project.



Name | Type | Description 
-----|------|-------------
**authorName**🔹 | <code>string</code> | <span></span>
**name**🔹 | <code>string</code> | <span></span>
**repository**🔹 | <code>string</code> | <span></span>
**antitamper**?🔹 | <code>boolean</code> | Checks that after build there are no modified files onn git.<br/>__*Default*__: true
**authorEmail**?🔹 | <code>string</code> | __*Optional*__
**authorOrganization**?🔹 | <code>boolean</code> | __*Optional*__
**authorUrl**?🔹 | <code>string</code> | __*Optional*__
**autoDetectBin**?🔹 | <code>boolean</code> | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.<br/>__*Default*__: true
**autoReleaseSchedule**?🔹 | <code>string</code> | CRON schedule for automatically bumping and releasing a new version.<br/>__*Default*__: every 6 hours
**bin**?🔹 | <code>Map<string, string></code> | Binary programs vended with your module.<br/>__*Optional*__
**buildWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/>__*Default*__: true
**bundledDependencies**?🔹 | <code>Array<string></code> | __*Optional*__
**catalog**?🔹 | <code>[Catalog](#projen-catalog)</code> | Libraries will be picked up by the construct catalog when they are published to npm as jsii modules and will be published under:.<br/>__*Default*__: new version will be announced
**cdkAssert**?🔹 | <code>boolean</code> | Install the @aws-cdk/assert library?<br/>__*Default*__: true
**cdkDependencies**?🔹 | <code>Array<string></code> | Which AWS CDK modules (those that start with "@aws-cdk/") does this library require when consumed?<br/>__*Optional*__
**cdkTestDependencies**?🔹 | <code>Array<string></code> | AWS CDK modules required for testing.<br/>__*Optional*__
**cdkVersion**?🔹 | <code>string</code> | Minmum target version this library is tested against.<br/>__*Default*__: ConstructLibraryAwsCdk.defaultVersion
**compat**?🔹 | <code>boolean</code> | Automatically run API compatibility test against the latest version published to npm after compilation.<br/>__*Default*__: false
**compatIgnore**?🔹 | <code>string</code> | Name of the ignore file for API compatibility tests.<br/>__*Default*__: .compatignore
**copyrightOwner**?🔹 | <code>string</code> | License copyright owner.<br/>__*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?🔹 | <code>string</code> | The copyright years to put in the LICENSE file.<br/>__*Default*__: current year
**dependabot**?🔹 | <code>boolean</code> | Include dependabot configuration.<br/>__*Default*__: true;
**dependabotOptions**?🔹 | <code>[DependabotOptions](#projen-dependabotoptions)</code> | Options for dependabot.<br/>__*Default*__: default options
**dependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**description**?🔹 | <code>string</code> | __*Optional*__
**devDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**docgen**?🔹 | <code>boolean</code> | Automatically generate API.md from jsii.<br/>__*Default*__: true
**dotnet**?🔹 | <code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code> | __*Optional*__
**eslint**?🔹 | <code>boolean</code> | Install eslint.<br/>__*Default*__: true
**java**?🔹 | <code>[JsiiJavaTarget](#projen-jsiijavatarget)</code> | __*Optional*__
**jest**?🔹 | <code>boolean</code> | Use jest for unit tests.<br/>__*Default*__: true
**jestOptions**?🔹 | <code>[JestOptions](#projen-jestoptions)</code> | Jest options.<br/>__*Default*__: defaults
**jsiiVersion**?🔹 | <code>[Semver](#projen-semver)</code> | __*Optional*__
**keywords**?🔹 | <code>Array<string></code> | __*Optional*__
**libdir**?🔹 | <code>string</code> | Compiler artifacts output directory.<br/>__*Default*__: "lib"
**license**?🔹 | <code>string</code> | __*Optional*__
**maxNodeVersion**?🔹 | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/>__*Default*__: no max
**mergify**?🔹 | <code>boolean</code> | Adds mergify configuration.<br/>__*Default*__: true
**mergifyOptions**?🔹 | <code>[MergifyOptions](#projen-mergifyoptions)</code> | Options for mergify.<br/>__*Default*__: default options
**minNodeVersion**?🔹 | <code>string</code> | Node.js version to require via package.json `engines` (inclusive).<br/>__*Default*__: no "engines" specified
**npmDistTag**?🔹 | <code>string</code> | The dist-tag to use when releasing to npm.<br/>__*Default*__: "latest"
**peerDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**peerDependencyOptions**?🔹 | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | __*Optional*__
**projenDevDependency**?🔹 | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/>__*Default*__: true
**projenUpgradeSecret**?🔹 | <code>string</code> | Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`).<br/>__*Default*__: no automatic projen upgrade pull requests
**projenVersion**?🔹 | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/>__*Default*__: latest version
**python**?🔹 | <code>[JsiiPythonTarget](#projen-jsiipythontarget)</code> | __*Optional*__
**releaseBranches**?🔹 | <code>Array<string></code> | Branches which trigger a release.<br/>__*Default*__: [ "master" ]
**releaseEveryCommit**?🔹 | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`.<br/>__*Default*__: true
**releaseSchedule**?🔹 | <code>string</code> | CRON schedule to trigger new releases.<br/>__*Default*__: no scheduled releases
**releaseToNpm**?🔹 | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/>__*Default*__: true
**releaseWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for releasing from "master" when new versions are bumped.<br/>__*Default*__: true
**rootdir**?🔹 | <code>string</code> | __*Default*__: "."
**scripts**?🔹 | <code>Map<string, string></code> | npm scripts to include.<br/>__*Default*__: {}
**srcdir**?🔹 | <code>string</code> | Typescript sources directory.<br/>__*Default*__: "src"
**stability**?🔹 | <code>string</code> | __*Optional*__
**start**?🔹 | <code>boolean</code> | Defines a `yarn start` interactive experience.<br/>__*Default*__: true
**startOptions**?🔹 | <code>[StartOptions](#projen-startoptions)</code> | Options for `yarn start`.<br/>__*Default*__: default options
**testdir**?🔹 | <code>string</code> | Tests directory.<br/>__*Default*__: "test"
**version**?🔹 | <code>[VersionOptions](#projen-versionoptions)</code> | Options for standard-version.<br/>__*Default*__: default options
**workflowBootstrapSteps**?🔹 | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/>__*Default*__: [ { run: `npx projen${PROJEN_VERSION}` }, { run: 'yarn install --frozen-lockfile' } ]
**workflowContainerImage**?🔹 | <code>string</code> | Container image to use for GitHub workflows.<br/>__*Default*__: default image
**workflowNodeVersion**?🔹 | <code>string</code> | The node version to use in GitHub workflows.<br/>__*Default*__: same as `minNodeVersion`



## struct ConstructLibraryOptions 🔹 <a id="projen-constructlibraryoptions"></a>






Name | Type | Description 
-----|------|-------------
**authorName**🔹 | <code>string</code> | <span></span>
**name**🔹 | <code>string</code> | <span></span>
**repository**🔹 | <code>string</code> | <span></span>
**antitamper**?🔹 | <code>boolean</code> | Checks that after build there are no modified files onn git.<br/>__*Default*__: true
**authorEmail**?🔹 | <code>string</code> | __*Optional*__
**authorOrganization**?🔹 | <code>boolean</code> | __*Optional*__
**authorUrl**?🔹 | <code>string</code> | __*Optional*__
**autoDetectBin**?🔹 | <code>boolean</code> | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.<br/>__*Default*__: true
**autoReleaseSchedule**?🔹 | <code>string</code> | CRON schedule for automatically bumping and releasing a new version.<br/>__*Default*__: every 6 hours
**bin**?🔹 | <code>Map<string, string></code> | Binary programs vended with your module.<br/>__*Optional*__
**buildWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/>__*Default*__: true
**bundledDependencies**?🔹 | <code>Array<string></code> | __*Optional*__
**catalog**?🔹 | <code>[Catalog](#projen-catalog)</code> | Libraries will be picked up by the construct catalog when they are published to npm as jsii modules and will be published under:.<br/>__*Default*__: new version will be announced
**compat**?🔹 | <code>boolean</code> | Automatically run API compatibility test against the latest version published to npm after compilation.<br/>__*Default*__: false
**compatIgnore**?🔹 | <code>string</code> | Name of the ignore file for API compatibility tests.<br/>__*Default*__: .compatignore
**copyrightOwner**?🔹 | <code>string</code> | License copyright owner.<br/>__*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?🔹 | <code>string</code> | The copyright years to put in the LICENSE file.<br/>__*Default*__: current year
**dependabot**?🔹 | <code>boolean</code> | Include dependabot configuration.<br/>__*Default*__: true;
**dependabotOptions**?🔹 | <code>[DependabotOptions](#projen-dependabotoptions)</code> | Options for dependabot.<br/>__*Default*__: default options
**dependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**description**?🔹 | <code>string</code> | __*Optional*__
**devDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**docgen**?🔹 | <code>boolean</code> | Automatically generate API.md from jsii.<br/>__*Default*__: true
**dotnet**?🔹 | <code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code> | __*Optional*__
**eslint**?🔹 | <code>boolean</code> | Install eslint.<br/>__*Default*__: true
**java**?🔹 | <code>[JsiiJavaTarget](#projen-jsiijavatarget)</code> | __*Optional*__
**jest**?🔹 | <code>boolean</code> | Use jest for unit tests.<br/>__*Default*__: true
**jestOptions**?🔹 | <code>[JestOptions](#projen-jestoptions)</code> | Jest options.<br/>__*Default*__: defaults
**jsiiVersion**?🔹 | <code>[Semver](#projen-semver)</code> | __*Optional*__
**keywords**?🔹 | <code>Array<string></code> | __*Optional*__
**libdir**?🔹 | <code>string</code> | Compiler artifacts output directory.<br/>__*Default*__: "lib"
**license**?🔹 | <code>string</code> | __*Optional*__
**maxNodeVersion**?🔹 | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/>__*Default*__: no max
**mergify**?🔹 | <code>boolean</code> | Adds mergify configuration.<br/>__*Default*__: true
**mergifyOptions**?🔹 | <code>[MergifyOptions](#projen-mergifyoptions)</code> | Options for mergify.<br/>__*Default*__: default options
**minNodeVersion**?🔹 | <code>string</code> | Node.js version to require via package.json `engines` (inclusive).<br/>__*Default*__: no "engines" specified
**npmDistTag**?🔹 | <code>string</code> | The dist-tag to use when releasing to npm.<br/>__*Default*__: "latest"
**peerDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**peerDependencyOptions**?🔹 | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | __*Optional*__
**projenDevDependency**?🔹 | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/>__*Default*__: true
**projenUpgradeSecret**?🔹 | <code>string</code> | Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`).<br/>__*Default*__: no automatic projen upgrade pull requests
**projenVersion**?🔹 | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/>__*Default*__: latest version
**python**?🔹 | <code>[JsiiPythonTarget](#projen-jsiipythontarget)</code> | __*Optional*__
**releaseBranches**?🔹 | <code>Array<string></code> | Branches which trigger a release.<br/>__*Default*__: [ "master" ]
**releaseEveryCommit**?🔹 | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`.<br/>__*Default*__: true
**releaseSchedule**?🔹 | <code>string</code> | CRON schedule to trigger new releases.<br/>__*Default*__: no scheduled releases
**releaseToNpm**?🔹 | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/>__*Default*__: true
**releaseWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for releasing from "master" when new versions are bumped.<br/>__*Default*__: true
**rootdir**?🔹 | <code>string</code> | __*Default*__: "."
**scripts**?🔹 | <code>Map<string, string></code> | npm scripts to include.<br/>__*Default*__: {}
**srcdir**?🔹 | <code>string</code> | Typescript sources directory.<br/>__*Default*__: "src"
**stability**?🔹 | <code>string</code> | __*Optional*__
**start**?🔹 | <code>boolean</code> | Defines a `yarn start` interactive experience.<br/>__*Default*__: true
**startOptions**?🔹 | <code>[StartOptions](#projen-startoptions)</code> | Options for `yarn start`.<br/>__*Default*__: default options
**testdir**?🔹 | <code>string</code> | Tests directory.<br/>__*Default*__: "test"
**version**?🔹 | <code>[VersionOptions](#projen-versionoptions)</code> | Options for standard-version.<br/>__*Default*__: default options
**workflowBootstrapSteps**?🔹 | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/>__*Default*__: [ { run: `npx projen${PROJEN_VERSION}` }, { run: 'yarn install --frozen-lockfile' } ]
**workflowContainerImage**?🔹 | <code>string</code> | Container image to use for GitHub workflows.<br/>__*Default*__: default image
**workflowNodeVersion**?🔹 | <code>string</code> | The node version to use in GitHub workflows.<br/>__*Default*__: same as `minNodeVersion`



## struct CoverageThreshold 🔹 <a id="projen-coveragethreshold"></a>






Name | Type | Description 
-----|------|-------------
**branches**?🔹 | <code>number</code> | __*Optional*__
**functions**?🔹 | <code>number</code> | __*Optional*__
**lines**?🔹 | <code>number</code> | __*Optional*__
**statements**?🔹 | <code>number</code> | __*Optional*__



## struct DependabotIgnore 🔹 <a id="projen-dependabotignore"></a>


You can use the `ignore` option to customize which dependencies are updated.

The ignore option supports the following options.



Name | Type | Description 
-----|------|-------------
**dependencyName**🔹 | <code>string</code> | Use to ignore updates for dependencies with matching names, optionally using `*` to match zero or more characters.
**versions**?🔹 | <code>Array<string></code> | Use to ignore specific versions or ranges of versions.<br/>__*Optional*__



## struct DependabotOptions 🔹 <a id="projen-dependabotoptions"></a>






Name | Type | Description 
-----|------|-------------
**autoMerge**?🔹 | <code>boolean</code> | Automatically merge dependabot PRs if build CI build passes.<br/>__*Default*__: true
**ignore**?🔹 | <code>Array<[DependabotIgnore](#projen-dependabotignore)></code> | You can use the `ignore` option to customize which dependencies are updated.<br/>__*Default*__: []
**ignoreProjen**?🔹 | <code>boolean</code> | Ignores updates to `projen`.<br/>__*Default*__: true
**scheduleInterval**?🔹 | <code>[DependabotScheduleInterval](#projen-dependabotscheduleinterval)</code> | How often to check for new versions and raise pull requests.<br/>__*Default*__: ScheduleInterval.DAILY
**versioningStrategy**?🔹 | <code>[VersioningStrategy](#projen-versioningstrategy)</code> | The strategy to use when edits manifest and lock files.<br/>__*Default*__: VersioningStrategy.LOCKFILE_ONLY The default is to only update the lock file because package.json is controlled by projen and any outside updates will fail the build.



## struct FileBaseOptions 🔹 <a id="projen-filebaseoptions"></a>






Name | Type | Description 
-----|------|-------------
**committed**?🔹 | <code>boolean</code> | Indicates whether this file should be committed to git or ignored.<br/>__*Default*__: true
**editGitignore**?🔹 | <code>boolean</code> | Update the project's .gitignore file.<br/>__*Default*__: true
**readonly**?🔹 | <code>boolean</code> | Whether the generated file should be readonly.<br/>__*Default*__: true



## interface IResolver 🔹 <a id="projen-iresolver"></a>


API for resolving tokens when synthesizing file content.
### Methods


#### resolve(value)🔹 <a id="projen-iresolver-resolve"></a>

Given a value (object/string/array/whatever, looks up any functions inside the object and returns an object where all functions are called.

```ts
resolve(value: any): any
```

* **value** (<code>any</code>)  The value to resolve.

__Returns__:
* <code>any</code>



## struct JestOptions 🔹 <a id="projen-jestoptions"></a>






Name | Type | Description 
-----|------|-------------
**coverage**?🔹 | <code>boolean</code> | Collect coverage.<br/>__*Default*__: true
**coverageThreshold**?🔹 | <code>[CoverageThreshold](#projen-coveragethreshold)</code> | Specify the global coverage thresholds.<br/>__*Optional*__
**ignorePatterns**?🔹 | <code>Array<string></code> | Defines `testPathIgnorePatterns` and `coveragePathIgnorePatterns`.<br/>__*Default*__: "/node_modules/"
**jestVersion**?🔹 | <code>[Semver](#projen-semver)</code> | The version of jest to use.<br/>__*Default*__: ^26.4.2
**typescript**?🔹 | <code>[TypescriptConfig](#projen-typescriptconfig)</code> | Configure for typescript.<br/>__*Optional*__



## struct JsiiDotNetTarget 🔹 <a id="projen-jsiidotnettarget"></a>






Name | Type | Description 
-----|------|-------------
**dotNetNamespace**🔹 | <code>string</code> | <span></span>
**packageId**🔹 | <code>string</code> | <span></span>



## struct JsiiJavaTarget 🔹 <a id="projen-jsiijavatarget"></a>






Name | Type | Description 
-----|------|-------------
**javaPackage**🔹 | <code>string</code> | <span></span>
**mavenArtifactId**🔹 | <code>string</code> | <span></span>
**mavenGroupId**🔹 | <code>string</code> | <span></span>



## struct JsiiProjectOptions 🔹 <a id="projen-jsiiprojectoptions"></a>






Name | Type | Description 
-----|------|-------------
**authorName**🔹 | <code>string</code> | <span></span>
**name**🔹 | <code>string</code> | <span></span>
**repository**🔹 | <code>string</code> | <span></span>
**antitamper**?🔹 | <code>boolean</code> | Checks that after build there are no modified files onn git.<br/>__*Default*__: true
**authorEmail**?🔹 | <code>string</code> | __*Optional*__
**authorOrganization**?🔹 | <code>boolean</code> | __*Optional*__
**authorUrl**?🔹 | <code>string</code> | __*Optional*__
**autoDetectBin**?🔹 | <code>boolean</code> | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.<br/>__*Default*__: true
**autoReleaseSchedule**?🔹 | <code>string</code> | CRON schedule for automatically bumping and releasing a new version.<br/>__*Default*__: every 6 hours
**bin**?🔹 | <code>Map<string, string></code> | Binary programs vended with your module.<br/>__*Optional*__
**buildWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/>__*Default*__: true
**bundledDependencies**?🔹 | <code>Array<string></code> | __*Optional*__
**compat**?🔹 | <code>boolean</code> | Automatically run API compatibility test against the latest version published to npm after compilation.<br/>__*Default*__: false
**compatIgnore**?🔹 | <code>string</code> | Name of the ignore file for API compatibility tests.<br/>__*Default*__: .compatignore
**copyrightOwner**?🔹 | <code>string</code> | License copyright owner.<br/>__*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?🔹 | <code>string</code> | The copyright years to put in the LICENSE file.<br/>__*Default*__: current year
**dependabot**?🔹 | <code>boolean</code> | Include dependabot configuration.<br/>__*Default*__: true;
**dependabotOptions**?🔹 | <code>[DependabotOptions](#projen-dependabotoptions)</code> | Options for dependabot.<br/>__*Default*__: default options
**dependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**description**?🔹 | <code>string</code> | __*Optional*__
**devDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**docgen**?🔹 | <code>boolean</code> | Automatically generate API.md from jsii.<br/>__*Default*__: true
**dotnet**?🔹 | <code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code> | __*Optional*__
**eslint**?🔹 | <code>boolean</code> | Install eslint.<br/>__*Default*__: true
**java**?🔹 | <code>[JsiiJavaTarget](#projen-jsiijavatarget)</code> | __*Optional*__
**jest**?🔹 | <code>boolean</code> | Use jest for unit tests.<br/>__*Default*__: true
**jestOptions**?🔹 | <code>[JestOptions](#projen-jestoptions)</code> | Jest options.<br/>__*Default*__: defaults
**jsiiVersion**?🔹 | <code>[Semver](#projen-semver)</code> | __*Optional*__
**keywords**?🔹 | <code>Array<string></code> | __*Optional*__
**libdir**?🔹 | <code>string</code> | Compiler artifacts output directory.<br/>__*Default*__: "lib"
**license**?🔹 | <code>string</code> | __*Optional*__
**maxNodeVersion**?🔹 | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/>__*Default*__: no max
**mergify**?🔹 | <code>boolean</code> | Adds mergify configuration.<br/>__*Default*__: true
**mergifyOptions**?🔹 | <code>[MergifyOptions](#projen-mergifyoptions)</code> | Options for mergify.<br/>__*Default*__: default options
**minNodeVersion**?🔹 | <code>string</code> | Node.js version to require via package.json `engines` (inclusive).<br/>__*Default*__: no "engines" specified
**npmDistTag**?🔹 | <code>string</code> | The dist-tag to use when releasing to npm.<br/>__*Default*__: "latest"
**peerDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**peerDependencyOptions**?🔹 | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | __*Optional*__
**projenDevDependency**?🔹 | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/>__*Default*__: true
**projenUpgradeSecret**?🔹 | <code>string</code> | Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`).<br/>__*Default*__: no automatic projen upgrade pull requests
**projenVersion**?🔹 | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/>__*Default*__: latest version
**python**?🔹 | <code>[JsiiPythonTarget](#projen-jsiipythontarget)</code> | __*Optional*__
**releaseBranches**?🔹 | <code>Array<string></code> | Branches which trigger a release.<br/>__*Default*__: [ "master" ]
**releaseEveryCommit**?🔹 | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`.<br/>__*Default*__: true
**releaseSchedule**?🔹 | <code>string</code> | CRON schedule to trigger new releases.<br/>__*Default*__: no scheduled releases
**releaseToNpm**?🔹 | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/>__*Default*__: true
**releaseWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for releasing from "master" when new versions are bumped.<br/>__*Default*__: true
**rootdir**?🔹 | <code>string</code> | __*Default*__: "."
**scripts**?🔹 | <code>Map<string, string></code> | npm scripts to include.<br/>__*Default*__: {}
**srcdir**?🔹 | <code>string</code> | Typescript sources directory.<br/>__*Default*__: "src"
**stability**?🔹 | <code>string</code> | __*Optional*__
**start**?🔹 | <code>boolean</code> | Defines a `yarn start` interactive experience.<br/>__*Default*__: true
**startOptions**?🔹 | <code>[StartOptions](#projen-startoptions)</code> | Options for `yarn start`.<br/>__*Default*__: default options
**testdir**?🔹 | <code>string</code> | Tests directory.<br/>__*Default*__: "test"
**version**?🔹 | <code>[VersionOptions](#projen-versionoptions)</code> | Options for standard-version.<br/>__*Default*__: default options
**workflowBootstrapSteps**?🔹 | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/>__*Default*__: [ { run: `npx projen${PROJEN_VERSION}` }, { run: 'yarn install --frozen-lockfile' } ]
**workflowContainerImage**?🔹 | <code>string</code> | Container image to use for GitHub workflows.<br/>__*Default*__: default image
**workflowNodeVersion**?🔹 | <code>string</code> | The node version to use in GitHub workflows.<br/>__*Default*__: same as `minNodeVersion`



## struct JsiiPythonTarget 🔹 <a id="projen-jsiipythontarget"></a>






Name | Type | Description 
-----|------|-------------
**distName**🔹 | <code>string</code> | <span></span>
**module**🔹 | <code>string</code> | <span></span>



## struct JsonFileOptions 🔹 <a id="projen-jsonfileoptions"></a>






Name | Type | Description 
-----|------|-------------
**obj**🔹 | <code>any</code> | <span></span>
**committed**?🔹 | <code>boolean</code> | Indicates whether this file should be committed to git or ignored.<br/>__*Default*__: true
**editGitignore**?🔹 | <code>boolean</code> | Update the project's .gitignore file.<br/>__*Default*__: true
**readonly**?🔹 | <code>boolean</code> | Whether the generated file should be readonly.<br/>__*Default*__: true



## struct LernaPackage 🔹 <a id="projen-lernapackage"></a>


A `projen` project added as a package to a lerna project.



Name | Type | Description 
-----|------|-------------
**project**🔹 | <code>[NodeProject](#projen-nodeproject)</code> | Project instance of the package.
**location**?🔹 | <code>string</code> | Directory in which the package will live.<br/>__*Default*__: 'packages'



## struct LernaProjectOptions 🔹 <a id="projen-lernaprojectoptions"></a>






Name | Type | Description 
-----|------|-------------
**name**🔹 | <code>string</code> | This is the name of your package.
**antitamper**?🔹 | <code>boolean</code> | Checks that after build there are no modified files onn git.<br/>__*Default*__: true
**authorEmail**?🔹 | <code>string</code> | Author's e-mail.<br/>__*Optional*__
**authorName**?🔹 | <code>string</code> | Author's name.<br/>__*Optional*__
**authorOrganization**?🔹 | <code>boolean</code> | Author's Organization.<br/>__*Optional*__
**authorUrl**?🔹 | <code>string</code> | Author's URL / Website.<br/>__*Optional*__
**autoDetectBin**?🔹 | <code>boolean</code> | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.<br/>__*Default*__: true
**autoReleaseSchedule**?🔹 | <code>string</code> | CRON schedule for automatically bumping and releasing a new version.<br/>__*Default*__: every 6 hours
**bin**?🔹 | <code>Map<string, string></code> | Binary programs vended with your module.<br/>__*Optional*__
**buildWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/>__*Default*__: true
**bundledDependencies**?🔹 | <code>Array<string></code> | __*Optional*__
**copyrightOwner**?🔹 | <code>string</code> | License copyright owner.<br/>__*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?🔹 | <code>string</code> | The copyright years to put in the LICENSE file.<br/>__*Default*__: current year
**dependabot**?🔹 | <code>boolean</code> | Include dependabot configuration.<br/>__*Default*__: true;
**dependabotOptions**?🔹 | <code>[DependabotOptions](#projen-dependabotoptions)</code> | Options for dependabot.<br/>__*Default*__: default options
**dependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**description**?🔹 | <code>string</code> | The description is just a string that helps people understand the purpose of the package.<br/>__*Optional*__
**devDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**gitignore**?🔹 | <code>Array<string></code> | Additional entries to .gitignore.<br/>__*Optional*__
**homepage**?🔹 | <code>string</code> | Package's Homepage / Website.<br/>__*Optional*__
**keywords**?🔹 | <code>Array<string></code> | __*Optional*__
**lernaVersion**?🔹 | <code>[Semver](#projen-semver)</code> | Version of lerna to use.<br/>__*Default*__: '^3.22.1'
**libdir**?🔹 | <code>string</code> | Compiler artifacts output directory.<br/>__*Default*__: "lib"
**license**?🔹 | <code>string</code> | License's SPDX identifier.<br/>__*Optional*__
**maxNodeVersion**?🔹 | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/>__*Default*__: no max
**mergify**?🔹 | <code>boolean</code> | Adds mergify configuration.<br/>__*Default*__: true
**mergifyOptions**?🔹 | <code>[MergifyOptions](#projen-mergifyoptions)</code> | Options for mergify.<br/>__*Default*__: default options
**minNodeVersion**?🔹 | <code>string</code> | Node.js version to require via package.json `engines` (inclusive).<br/>__*Default*__: no "engines" specified
**npmClient**?🔹 | <code>string</code> | Specify a specific client to run commands with (this can also be specified on a per command basis).<br/>__*Default*__: 'yarn'
**npmDistTag**?🔹 | <code>string</code> | The dist-tag to use when releasing to npm.<br/>__*Default*__: "latest"
**npmignore**?🔹 | <code>Array<string></code> | Additional entries to .npmignore.<br/>__*Optional*__
**packages**?🔹 | <code>Array<[LernaPackage](#projen-lernapackage)></code> | Packages to create.<br/>__*Default*__: []
**peerDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**peerDependencyOptions**?🔹 | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | __*Optional*__
**private**?🔹 | <code>boolean</code> | If you do not want your package published in a package manager, set this to true.<br/>__*Optional*__
**projenDevDependency**?🔹 | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/>__*Default*__: true
**projenUpgradeSecret**?🔹 | <code>string</code> | Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`).<br/>__*Default*__: no automatic projen upgrade pull requests
**projenVersion**?🔹 | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/>__*Default*__: latest version
**releaseBranches**?🔹 | <code>Array<string></code> | Branches which trigger a release.<br/>__*Default*__: [ "master" ]
**releaseEveryCommit**?🔹 | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`.<br/>__*Default*__: true
**releaseSchedule**?🔹 | <code>string</code> | CRON schedule to trigger new releases.<br/>__*Default*__: no scheduled releases
**releaseToNpm**?🔹 | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/>__*Default*__: true
**releaseWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for releasing from "master" when new versions are bumped.<br/>__*Default*__: true
**repository**?🔹 | <code>string</code> | The repository is the location where the actual code for your package lives.<br/>__*Optional*__
**repositoryDirectory**?🔹 | <code>string</code> | If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives.<br/>__*Optional*__
**scripts**?🔹 | <code>Map<string, string></code> | npm scripts to include.<br/>__*Default*__: {}
**srcdir**?🔹 | <code>string</code> | Typescript sources directory.<br/>__*Default*__: "src"
**stability**?🔹 | <code>string</code> | Package's Stability.<br/>__*Optional*__
**start**?🔹 | <code>boolean</code> | Defines a `yarn start` interactive experience.<br/>__*Default*__: true
**startOptions**?🔹 | <code>[StartOptions](#projen-startoptions)</code> | Options for `yarn start`.<br/>__*Default*__: default options
**testdir**?🔹 | <code>string</code> | Tests directory.<br/>__*Default*__: "test"
**useWorkspaces**?🔹 | <code>boolean</code> | Enables integration with Yarn Workspaces (available since yarn@0.27+).<br/>__*Default*__: true
**version**?🔹 | <code>[VersionOptions](#projen-versionoptions)</code> | Options for standard-version.<br/>__*Default*__: default options
**workflowBootstrapSteps**?🔹 | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/>__*Default*__: [ { run: `npx projen${PROJEN_VERSION}` }, { run: 'yarn install --frozen-lockfile' } ]
**workflowContainerImage**?🔹 | <code>string</code> | Container image to use for GitHub workflows.<br/>__*Default*__: default image
**workflowNodeVersion**?🔹 | <code>string</code> | The node version to use in GitHub workflows.<br/>__*Default*__: same as `minNodeVersion`



## struct LicenseOptions 🔹 <a id="projen-licenseoptions"></a>






Name | Type | Description 
-----|------|-------------
**copyrightOwner**?🔹 | <code>string</code> | Copyright owner.<br/>__*Default*__: ""
**copyrightPeriod**?🔹 | <code>string</code> | Period of license (e.g. "1998-2023").<br/>__*Default*__: current year (e.g. "2020")



## struct LifecycleScriptOptions 🔹 <a id="projen-lifecyclescriptoptions"></a>


standard-version supports lifecycle scripts.

These allow you to execute your own supplementary commands during the
release.



Name | Type | Description 
-----|------|-------------
**postbump**?🔹 | <code>string</code> | Executed after the version is bumped.<br/>__*Default*__: no postbump script
**postchangelog**?🔹 | <code>string</code> | Executed after the CHANGELOG is generated.<br/>__*Default*__: no postchangelog script
**postcommit**?🔹 | <code>string</code> | Executed after the commit step.<br/>__*Default*__: no postcommit script
**posttag**?🔹 | <code>string</code> | Executed after the tagging step.<br/>__*Default*__: no posttag script
**prebump**?🔹 | <code>string</code> | Executed before the version is bumped.<br/>__*Default*__: no prebump script
**prechangelog**?🔹 | <code>string</code> | Executed before the CHANGELOG is generated.<br/>__*Default*__: no prechangelog script
**precommit**?🔹 | <code>string</code> | Executed before the commit step.<br/>__*Default*__: no precommit script
**prerelease**?🔹 | <code>string</code> | Executed before anything happens.<br/>__*Default*__: no prerelease script
**pretag**?🔹 | <code>string</code> | Executed before the tagging step.<br/>__*Default*__: no pretag script



## struct MergifyOptions 🔹 <a id="projen-mergifyoptions"></a>






Name | Type | Description 
-----|------|-------------
**rules**?🔹 | <code>Array<[MergifyRule](#projen-mergifyrule)></code> | __*Optional*__



## struct MergifyRule 🔹 <a id="projen-mergifyrule"></a>






Name | Type | Description 
-----|------|-------------
**actions**🔹 | <code>Map<string, any></code> | <span></span>
**conditions**🔹 | <code>Array<string></code> | <span></span>
**name**🔹 | <code>string</code> | <span></span>



## struct NodeBuildWorkflowOptions 🔹 <a id="projen-nodebuildworkflowoptions"></a>






Name | Type | Description 
-----|------|-------------
**trigger**🔹 | <code>Map<string, any></code> | <span></span>
**bump**?🔹 | <code>boolean</code> | Bump a new version for this build.<br/>__*Default*__: false
**image**?🔹 | <code>string</code> | __*Default*__: default image
**uploadArtifact**?🔹 | <code>boolean</code> | __*Optional*__



## struct NodeProjectCommonOptions 🔹 <a id="projen-nodeprojectcommonoptions"></a>






Name | Type | Description 
-----|------|-------------
**antitamper**?🔹 | <code>boolean</code> | Checks that after build there are no modified files onn git.<br/>__*Default*__: true
**autoDetectBin**?🔹 | <code>boolean</code> | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.<br/>__*Default*__: true
**autoReleaseSchedule**?🔹 | <code>string</code> | CRON schedule for automatically bumping and releasing a new version.<br/>__*Default*__: every 6 hours
**bin**?🔹 | <code>Map<string, string></code> | Binary programs vended with your module.<br/>__*Optional*__
**buildWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/>__*Default*__: true
**bundledDependencies**?🔹 | <code>Array<string></code> | __*Optional*__
**copyrightOwner**?🔹 | <code>string</code> | License copyright owner.<br/>__*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?🔹 | <code>string</code> | The copyright years to put in the LICENSE file.<br/>__*Default*__: current year
**dependabot**?🔹 | <code>boolean</code> | Include dependabot configuration.<br/>__*Default*__: true;
**dependabotOptions**?🔹 | <code>[DependabotOptions](#projen-dependabotoptions)</code> | Options for dependabot.<br/>__*Default*__: default options
**dependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**devDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**keywords**?🔹 | <code>Array<string></code> | __*Optional*__
**libdir**?🔹 | <code>string</code> | Compiler artifacts output directory.<br/>__*Default*__: "lib"
**maxNodeVersion**?🔹 | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/>__*Default*__: no max
**mergify**?🔹 | <code>boolean</code> | Adds mergify configuration.<br/>__*Default*__: true
**mergifyOptions**?🔹 | <code>[MergifyOptions](#projen-mergifyoptions)</code> | Options for mergify.<br/>__*Default*__: default options
**minNodeVersion**?🔹 | <code>string</code> | Node.js version to require via package.json `engines` (inclusive).<br/>__*Default*__: no "engines" specified
**npmDistTag**?🔹 | <code>string</code> | The dist-tag to use when releasing to npm.<br/>__*Default*__: "latest"
**peerDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**peerDependencyOptions**?🔹 | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | __*Optional*__
**projenDevDependency**?🔹 | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/>__*Default*__: true
**projenUpgradeSecret**?🔹 | <code>string</code> | Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`).<br/>__*Default*__: no automatic projen upgrade pull requests
**projenVersion**?🔹 | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/>__*Default*__: latest version
**releaseBranches**?🔹 | <code>Array<string></code> | Branches which trigger a release.<br/>__*Default*__: [ "master" ]
**releaseEveryCommit**?🔹 | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`.<br/>__*Default*__: true
**releaseSchedule**?🔹 | <code>string</code> | CRON schedule to trigger new releases.<br/>__*Default*__: no scheduled releases
**releaseToNpm**?🔹 | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/>__*Default*__: true
**releaseWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for releasing from "master" when new versions are bumped.<br/>__*Default*__: true
**scripts**?🔹 | <code>Map<string, string></code> | npm scripts to include.<br/>__*Default*__: {}
**srcdir**?🔹 | <code>string</code> | Typescript sources directory.<br/>__*Default*__: "src"
**start**?🔹 | <code>boolean</code> | Defines a `yarn start` interactive experience.<br/>__*Default*__: true
**startOptions**?🔹 | <code>[StartOptions](#projen-startoptions)</code> | Options for `yarn start`.<br/>__*Default*__: default options
**testdir**?🔹 | <code>string</code> | Tests directory.<br/>__*Default*__: "test"
**version**?🔹 | <code>[VersionOptions](#projen-versionoptions)</code> | Options for standard-version.<br/>__*Default*__: default options
**workflowBootstrapSteps**?🔹 | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/>__*Default*__: [ { run: `npx projen${PROJEN_VERSION}` }, { run: 'yarn install --frozen-lockfile' } ]
**workflowContainerImage**?🔹 | <code>string</code> | Container image to use for GitHub workflows.<br/>__*Default*__: default image
**workflowNodeVersion**?🔹 | <code>string</code> | The node version to use in GitHub workflows.<br/>__*Default*__: same as `minNodeVersion`



## struct NodeProjectOptions 🔹 <a id="projen-nodeprojectoptions"></a>






Name | Type | Description 
-----|------|-------------
**name**🔹 | <code>string</code> | This is the name of your package.
**antitamper**?🔹 | <code>boolean</code> | Checks that after build there are no modified files onn git.<br/>__*Default*__: true
**authorEmail**?🔹 | <code>string</code> | Author's e-mail.<br/>__*Optional*__
**authorName**?🔹 | <code>string</code> | Author's name.<br/>__*Optional*__
**authorOrganization**?🔹 | <code>boolean</code> | Author's Organization.<br/>__*Optional*__
**authorUrl**?🔹 | <code>string</code> | Author's URL / Website.<br/>__*Optional*__
**autoDetectBin**?🔹 | <code>boolean</code> | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.<br/>__*Default*__: true
**autoReleaseSchedule**?🔹 | <code>string</code> | CRON schedule for automatically bumping and releasing a new version.<br/>__*Default*__: every 6 hours
**bin**?🔹 | <code>Map<string, string></code> | Binary programs vended with your module.<br/>__*Optional*__
**buildWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/>__*Default*__: true
**bundledDependencies**?🔹 | <code>Array<string></code> | __*Optional*__
**copyrightOwner**?🔹 | <code>string</code> | License copyright owner.<br/>__*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?🔹 | <code>string</code> | The copyright years to put in the LICENSE file.<br/>__*Default*__: current year
**dependabot**?🔹 | <code>boolean</code> | Include dependabot configuration.<br/>__*Default*__: true;
**dependabotOptions**?🔹 | <code>[DependabotOptions](#projen-dependabotoptions)</code> | Options for dependabot.<br/>__*Default*__: default options
**dependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**description**?🔹 | <code>string</code> | The description is just a string that helps people understand the purpose of the package.<br/>__*Optional*__
**devDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**gitignore**?🔹 | <code>Array<string></code> | Additional entries to .gitignore.<br/>__*Optional*__
**homepage**?🔹 | <code>string</code> | Package's Homepage / Website.<br/>__*Optional*__
**keywords**?🔹 | <code>Array<string></code> | __*Optional*__
**libdir**?🔹 | <code>string</code> | Compiler artifacts output directory.<br/>__*Default*__: "lib"
**license**?🔹 | <code>string</code> | License's SPDX identifier.<br/>__*Optional*__
**maxNodeVersion**?🔹 | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/>__*Default*__: no max
**mergify**?🔹 | <code>boolean</code> | Adds mergify configuration.<br/>__*Default*__: true
**mergifyOptions**?🔹 | <code>[MergifyOptions](#projen-mergifyoptions)</code> | Options for mergify.<br/>__*Default*__: default options
**minNodeVersion**?🔹 | <code>string</code> | Node.js version to require via package.json `engines` (inclusive).<br/>__*Default*__: no "engines" specified
**npmDistTag**?🔹 | <code>string</code> | The dist-tag to use when releasing to npm.<br/>__*Default*__: "latest"
**npmignore**?🔹 | <code>Array<string></code> | Additional entries to .npmignore.<br/>__*Optional*__
**peerDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**peerDependencyOptions**?🔹 | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | __*Optional*__
**private**?🔹 | <code>boolean</code> | If you do not want your package published in a package manager, set this to true.<br/>__*Optional*__
**projenDevDependency**?🔹 | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/>__*Default*__: true
**projenUpgradeSecret**?🔹 | <code>string</code> | Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`).<br/>__*Default*__: no automatic projen upgrade pull requests
**projenVersion**?🔹 | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/>__*Default*__: latest version
**releaseBranches**?🔹 | <code>Array<string></code> | Branches which trigger a release.<br/>__*Default*__: [ "master" ]
**releaseEveryCommit**?🔹 | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`.<br/>__*Default*__: true
**releaseSchedule**?🔹 | <code>string</code> | CRON schedule to trigger new releases.<br/>__*Default*__: no scheduled releases
**releaseToNpm**?🔹 | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/>__*Default*__: true
**releaseWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for releasing from "master" when new versions are bumped.<br/>__*Default*__: true
**repository**?🔹 | <code>string</code> | The repository is the location where the actual code for your package lives.<br/>__*Optional*__
**repositoryDirectory**?🔹 | <code>string</code> | If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives.<br/>__*Optional*__
**scripts**?🔹 | <code>Map<string, string></code> | npm scripts to include.<br/>__*Default*__: {}
**srcdir**?🔹 | <code>string</code> | Typescript sources directory.<br/>__*Default*__: "src"
**stability**?🔹 | <code>string</code> | Package's Stability.<br/>__*Optional*__
**start**?🔹 | <code>boolean</code> | Defines a `yarn start` interactive experience.<br/>__*Default*__: true
**startOptions**?🔹 | <code>[StartOptions](#projen-startoptions)</code> | Options for `yarn start`.<br/>__*Default*__: default options
**testdir**?🔹 | <code>string</code> | Tests directory.<br/>__*Default*__: "test"
**version**?🔹 | <code>[VersionOptions](#projen-versionoptions)</code> | Options for standard-version.<br/>__*Default*__: default options
**workflowBootstrapSteps**?🔹 | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/>__*Default*__: [ { run: `npx projen${PROJEN_VERSION}` }, { run: 'yarn install --frozen-lockfile' } ]
**workflowContainerImage**?🔹 | <code>string</code> | Container image to use for GitHub workflows.<br/>__*Default*__: default image
**workflowNodeVersion**?🔹 | <code>string</code> | The node version to use in GitHub workflows.<br/>__*Default*__: same as `minNodeVersion`



## struct PeerDependencyOptions 🔹 <a id="projen-peerdependencyoptions"></a>






Name | Type | Description 
-----|------|-------------
**pinnedDevDependency**?🔹 | <code>boolean</code> | Automatically add a pinned dev dependency.<br/>__*Default*__: true



## struct SkipOptions 🔹 <a id="projen-skipoptions"></a>


standard-version allows for skipping any of the lifecycle steps (bump, changelog, commit, tag).



Name | Type | Description 
-----|------|-------------
**bump**?🔹 | <code>boolean</code> | Skip the `bump` lifecycle step.<br/>__*Default*__: false
**changelog**?🔹 | <code>boolean</code> | Skip the `changelog` lifecycle step.<br/>__*Default*__: false
**commit**?🔹 | <code>boolean</code> | Skip the `commit` lifecycle step.<br/>__*Default*__: false
**tag**?🔹 | <code>boolean</code> | Skip the `tag` lifecycle step.<br/>__*Default*__: false



## struct StartEntryOptions 🔹 <a id="projen-startentryoptions"></a>






Name | Type | Description 
-----|------|-------------
**descrtiption**🔹 | <code>string</code> | The description of the start entry.
**category**?🔹 | <code>[StartEntryCategory](#projen-startentrycategory)</code> | Priority-order (lower values will be shown first).<br/>__*Default*__: StartEntryCategory.MISC



## struct StartOptions 🔹 <a id="projen-startoptions"></a>





## struct TypeScriptCompilerOptions 🔹 <a id="projen-typescriptcompileroptions"></a>






Name | Type | Description 
-----|------|-------------
**alwaysStrict**?🔹 | <code>boolean</code> | Ensures that your files are parsed in the ECMAScript strict mode, and emit “use strict” for each source file.<br/>__*Default*__: true
**declaration**?🔹 | <code>boolean</code> | To be specified along with the above.<br/>__*Optional*__
**declarationDir**?🔹 | <code>string</code> | Offers a way to configure the root directory for where declaration files are emitted.<br/>__*Optional*__
**experimentalDecorators**?🔹 | <code>boolean</code> | Enables experimental support for decorators, which is in stage 2 of the TC39 standardization process.<br/>__*Default*__: true
**inlineSourceMap**?🔹 | <code>boolean</code> | When set, instead of writing out a .js.map file to provide source maps, TypeScript will embed the source map content in the .js files.<br/>__*Default*__: true
**inlineSources**?🔹 | <code>boolean</code> | When set, TypeScript will include the original content of the .ts file as an embedded string in the source map. This is often useful in the same cases as inlineSourceMap.<br/>__*Default*__: true
**lib**?🔹 | <code>Array<string></code> | Reference for type definitions / libraries to use (eg.<br/>__*Default*__: [ 'es2018' ]
**module**?🔹 | <code>string</code> | Sets the module system for the program.<br/>__*Default*__: 'CommonJS'
**noEmitOnError**?🔹 | <code>boolean</code> | Do not emit compiler output files like JavaScript source code, source-maps or declarations if any errors were reported.<br/>__*Default*__: true
**noFallthroughCasesInSwitch**?🔹 | <code>boolean</code> | Report errors for fallthrough cases in switch statements.<br/>__*Default*__: true
**noImplicitAny**?🔹 | <code>boolean</code> | In some cases where no type annotations are present, TypeScript will fall back to a type of any for a variable when it cannot infer the type.<br/>__*Default*__: true
**noImplicitReturns**?🔹 | <code>boolean</code> | When enabled, TypeScript will check all code paths in a function to ensure they return a value.<br/>__*Default*__: true
**noImplicitThis**?🔹 | <code>boolean</code> | Raise error on ‘this’ expressions with an implied ‘any’ type.<br/>__*Default*__: true
**noUnusedLocals**?🔹 | <code>boolean</code> | Report errors on unused local variables.<br/>__*Default*__: true
**noUnusedParameters**?🔹 | <code>boolean</code> | Report errors on unused parameters in functions.<br/>__*Default*__: true
**outDir**?🔹 | <code>string</code> | Output directory for the compiled files.<br/>__*Optional*__
**resolveJsonModule**?🔹 | <code>boolean</code> | Allows importing modules with a ‘.json’ extension, which is a common practice in node projects. This includes generating a type for the import based on the static JSON shape.<br/>__*Default*__: true
**rootDir**?🔹 | <code>string</code> | Specifies the root directory of input files.<br/>__*Optional*__
**strict**?🔹 | <code>boolean</code> | The strict flag enables a wide range of type checking behavior that results in stronger guarantees of program correctness.<br/>__*Default*__: true
**strictNullChecks**?🔹 | <code>boolean</code> | When strictNullChecks is false, null and undefined are effectively ignored by the language.<br/>__*Default*__: true
**strictPropertyInitialization**?🔹 | <code>boolean</code> | When set to true, TypeScript will raise an error when a class property was declared but not set in the constructor.<br/>__*Default*__: true
**stripInternal**?🔹 | <code>boolean</code> | Do not emit declarations for code that has an @internal annotation in it’s JSDoc comment.<br/>__*Default*__: true
**target**?🔹 | <code>string</code> | Modern browsers support all ES6 features, so ES6 is a good choice.<br/>__*Default*__: 'ES2018'



## struct TypeScriptLibraryProjectOptions ⚠️ <a id="projen-typescriptlibraryprojectoptions"></a>






Name | Type | Description 
-----|------|-------------
**name**⚠️ | <code>string</code> | This is the name of your package.
**antitamper**?⚠️ | <code>boolean</code> | Checks that after build there are no modified files onn git.<br/>__*Default*__: true
**authorEmail**?⚠️ | <code>string</code> | Author's e-mail.<br/>__*Optional*__
**authorName**?⚠️ | <code>string</code> | Author's name.<br/>__*Optional*__
**authorOrganization**?⚠️ | <code>boolean</code> | Author's Organization.<br/>__*Optional*__
**authorUrl**?⚠️ | <code>string</code> | Author's URL / Website.<br/>__*Optional*__
**autoDetectBin**?⚠️ | <code>boolean</code> | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.<br/>__*Default*__: true
**autoReleaseSchedule**?⚠️ | <code>string</code> | CRON schedule for automatically bumping and releasing a new version.<br/>__*Default*__: every 6 hours
**bin**?⚠️ | <code>Map<string, string></code> | Binary programs vended with your module.<br/>__*Optional*__
**buildWorkflow**?⚠️ | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/>__*Default*__: true
**bundledDependencies**?⚠️ | <code>Array<string></code> | __*Optional*__
**compileBeforeTest**?⚠️ | <code>boolean</code> | Compile the code before running tests.<br/>__*Default*__: the default behavior is to delete the lib/ directory and run jest typescript tests and only if all tests pass, run the compiler.
**copyrightOwner**?⚠️ | <code>string</code> | License copyright owner.<br/>__*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?⚠️ | <code>string</code> | The copyright years to put in the LICENSE file.<br/>__*Default*__: current year
**dependabot**?⚠️ | <code>boolean</code> | Include dependabot configuration.<br/>__*Default*__: true;
**dependabotOptions**?⚠️ | <code>[DependabotOptions](#projen-dependabotoptions)</code> | Options for dependabot.<br/>__*Default*__: default options
**dependencies**?⚠️ | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**description**?⚠️ | <code>string</code> | The description is just a string that helps people understand the purpose of the package.<br/>__*Optional*__
**devDependencies**?⚠️ | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**disableTsconfig**?⚠️ | <code>boolean</code> | Do not generate a `tsconfig.json` file (used by jsii projects since tsconfig.json is generated by the jsii compiler).<br/>__*Default*__: false
**docgen**?⚠️ | <code>boolean</code> | Docgen by Typedoc.<br/>__*Default*__: false
**docsDirectory**?⚠️ | <code>string</code> | Docs directory.<br/>__*Default*__: 'docs'
**eslint**?⚠️ | <code>boolean</code> | Setup eslint.<br/>__*Default*__: true
**gitignore**?⚠️ | <code>Array<string></code> | Additional entries to .gitignore.<br/>__*Optional*__
**homepage**?⚠️ | <code>string</code> | Package's Homepage / Website.<br/>__*Optional*__
**jest**?⚠️ | <code>boolean</code> | Setup jest unit tests.<br/>__*Default*__: true
**jestOptions**?⚠️ | <code>[JestOptions](#projen-jestoptions)</code> | Jest options.<br/>__*Default*__: default options
**keywords**?⚠️ | <code>Array<string></code> | __*Optional*__
**libdir**?⚠️ | <code>string</code> | Compiler artifacts output directory.<br/>__*Default*__: "lib"
**license**?⚠️ | <code>string</code> | License's SPDX identifier.<br/>__*Optional*__
**maxNodeVersion**?⚠️ | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/>__*Default*__: no max
**mergify**?⚠️ | <code>boolean</code> | Adds mergify configuration.<br/>__*Default*__: true
**mergifyOptions**?⚠️ | <code>[MergifyOptions](#projen-mergifyoptions)</code> | Options for mergify.<br/>__*Default*__: default options
**minNodeVersion**?⚠️ | <code>string</code> | Node.js version to require via package.json `engines` (inclusive).<br/>__*Default*__: no "engines" specified
**npmDistTag**?⚠️ | <code>string</code> | The dist-tag to use when releasing to npm.<br/>__*Default*__: "latest"
**npmignore**?⚠️ | <code>Array<string></code> | Additional entries to .npmignore.<br/>__*Optional*__
**peerDependencies**?⚠️ | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**peerDependencyOptions**?⚠️ | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | __*Optional*__
**private**?⚠️ | <code>boolean</code> | If you do not want your package published in a package manager, set this to true.<br/>__*Optional*__
**projenDevDependency**?⚠️ | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/>__*Default*__: true
**projenUpgradeSecret**?⚠️ | <code>string</code> | Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`).<br/>__*Default*__: no automatic projen upgrade pull requests
**projenVersion**?⚠️ | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/>__*Default*__: latest version
**releaseBranches**?⚠️ | <code>Array<string></code> | Branches which trigger a release.<br/>__*Default*__: [ "master" ]
**releaseEveryCommit**?⚠️ | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`.<br/>__*Default*__: true
**releaseSchedule**?⚠️ | <code>string</code> | CRON schedule to trigger new releases.<br/>__*Default*__: no scheduled releases
**releaseToNpm**?⚠️ | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/>__*Default*__: true
**releaseWorkflow**?⚠️ | <code>boolean</code> | Define a GitHub workflow for releasing from "master" when new versions are bumped.<br/>__*Default*__: true
**repository**?⚠️ | <code>string</code> | The repository is the location where the actual code for your package lives.<br/>__*Optional*__
**repositoryDirectory**?⚠️ | <code>string</code> | If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives.<br/>__*Optional*__
**scripts**?⚠️ | <code>Map<string, string></code> | npm scripts to include.<br/>__*Default*__: {}
**srcdir**?⚠️ | <code>string</code> | Typescript sources directory.<br/>__*Default*__: "src"
**stability**?⚠️ | <code>string</code> | Package's Stability.<br/>__*Optional*__
**start**?⚠️ | <code>boolean</code> | Defines a `yarn start` interactive experience.<br/>__*Default*__: true
**startOptions**?⚠️ | <code>[StartOptions](#projen-startoptions)</code> | Options for `yarn start`.<br/>__*Default*__: default options
**testdir**?⚠️ | <code>string</code> | Tests directory.<br/>__*Default*__: "test"
**tsconfig**?⚠️ | <code>[TypescriptConfigOptions](#projen-typescriptconfigoptions)</code> | Custom TSConfig.<br/>__*Optional*__
**typescriptVersion**?⚠️ | <code>[Semver](#projen-semver)</code> | TypeScript version to use.<br/>__*Default*__: ^3.9.5
**version**?⚠️ | <code>[VersionOptions](#projen-versionoptions)</code> | Options for standard-version.<br/>__*Default*__: default options
**workflowBootstrapSteps**?⚠️ | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/>__*Default*__: [ { run: `npx projen${PROJEN_VERSION}` }, { run: 'yarn install --frozen-lockfile' } ]
**workflowContainerImage**?⚠️ | <code>string</code> | Container image to use for GitHub workflows.<br/>__*Default*__: default image
**workflowNodeVersion**?⚠️ | <code>string</code> | The node version to use in GitHub workflows.<br/>__*Default*__: same as `minNodeVersion`



## struct TypeScriptProjectOptions 🔹 <a id="projen-typescriptprojectoptions"></a>






Name | Type | Description 
-----|------|-------------
**name**🔹 | <code>string</code> | This is the name of your package.
**antitamper**?🔹 | <code>boolean</code> | Checks that after build there are no modified files onn git.<br/>__*Default*__: true
**authorEmail**?🔹 | <code>string</code> | Author's e-mail.<br/>__*Optional*__
**authorName**?🔹 | <code>string</code> | Author's name.<br/>__*Optional*__
**authorOrganization**?🔹 | <code>boolean</code> | Author's Organization.<br/>__*Optional*__
**authorUrl**?🔹 | <code>string</code> | Author's URL / Website.<br/>__*Optional*__
**autoDetectBin**?🔹 | <code>boolean</code> | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.<br/>__*Default*__: true
**autoReleaseSchedule**?🔹 | <code>string</code> | CRON schedule for automatically bumping and releasing a new version.<br/>__*Default*__: every 6 hours
**bin**?🔹 | <code>Map<string, string></code> | Binary programs vended with your module.<br/>__*Optional*__
**buildWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/>__*Default*__: true
**bundledDependencies**?🔹 | <code>Array<string></code> | __*Optional*__
**compileBeforeTest**?🔹 | <code>boolean</code> | Compile the code before running tests.<br/>__*Default*__: the default behavior is to delete the lib/ directory and run jest typescript tests and only if all tests pass, run the compiler.
**copyrightOwner**?🔹 | <code>string</code> | License copyright owner.<br/>__*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?🔹 | <code>string</code> | The copyright years to put in the LICENSE file.<br/>__*Default*__: current year
**dependabot**?🔹 | <code>boolean</code> | Include dependabot configuration.<br/>__*Default*__: true;
**dependabotOptions**?🔹 | <code>[DependabotOptions](#projen-dependabotoptions)</code> | Options for dependabot.<br/>__*Default*__: default options
**dependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**description**?🔹 | <code>string</code> | The description is just a string that helps people understand the purpose of the package.<br/>__*Optional*__
**devDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**disableTsconfig**?🔹 | <code>boolean</code> | Do not generate a `tsconfig.json` file (used by jsii projects since tsconfig.json is generated by the jsii compiler).<br/>__*Default*__: false
**docgen**?🔹 | <code>boolean</code> | Docgen by Typedoc.<br/>__*Default*__: false
**docsDirectory**?🔹 | <code>string</code> | Docs directory.<br/>__*Default*__: 'docs'
**eslint**?🔹 | <code>boolean</code> | Setup eslint.<br/>__*Default*__: true
**gitignore**?🔹 | <code>Array<string></code> | Additional entries to .gitignore.<br/>__*Optional*__
**homepage**?🔹 | <code>string</code> | Package's Homepage / Website.<br/>__*Optional*__
**jest**?🔹 | <code>boolean</code> | Setup jest unit tests.<br/>__*Default*__: true
**jestOptions**?🔹 | <code>[JestOptions](#projen-jestoptions)</code> | Jest options.<br/>__*Default*__: default options
**keywords**?🔹 | <code>Array<string></code> | __*Optional*__
**libdir**?🔹 | <code>string</code> | Compiler artifacts output directory.<br/>__*Default*__: "lib"
**license**?🔹 | <code>string</code> | License's SPDX identifier.<br/>__*Optional*__
**maxNodeVersion**?🔹 | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/>__*Default*__: no max
**mergify**?🔹 | <code>boolean</code> | Adds mergify configuration.<br/>__*Default*__: true
**mergifyOptions**?🔹 | <code>[MergifyOptions](#projen-mergifyoptions)</code> | Options for mergify.<br/>__*Default*__: default options
**minNodeVersion**?🔹 | <code>string</code> | Node.js version to require via package.json `engines` (inclusive).<br/>__*Default*__: no "engines" specified
**npmDistTag**?🔹 | <code>string</code> | The dist-tag to use when releasing to npm.<br/>__*Default*__: "latest"
**npmignore**?🔹 | <code>Array<string></code> | Additional entries to .npmignore.<br/>__*Optional*__
**peerDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**peerDependencyOptions**?🔹 | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | __*Optional*__
**private**?🔹 | <code>boolean</code> | If you do not want your package published in a package manager, set this to true.<br/>__*Optional*__
**projenDevDependency**?🔹 | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/>__*Default*__: true
**projenUpgradeSecret**?🔹 | <code>string</code> | Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`).<br/>__*Default*__: no automatic projen upgrade pull requests
**projenVersion**?🔹 | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/>__*Default*__: latest version
**releaseBranches**?🔹 | <code>Array<string></code> | Branches which trigger a release.<br/>__*Default*__: [ "master" ]
**releaseEveryCommit**?🔹 | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`.<br/>__*Default*__: true
**releaseSchedule**?🔹 | <code>string</code> | CRON schedule to trigger new releases.<br/>__*Default*__: no scheduled releases
**releaseToNpm**?🔹 | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/>__*Default*__: true
**releaseWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for releasing from "master" when new versions are bumped.<br/>__*Default*__: true
**repository**?🔹 | <code>string</code> | The repository is the location where the actual code for your package lives.<br/>__*Optional*__
**repositoryDirectory**?🔹 | <code>string</code> | If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives.<br/>__*Optional*__
**scripts**?🔹 | <code>Map<string, string></code> | npm scripts to include.<br/>__*Default*__: {}
**srcdir**?🔹 | <code>string</code> | Typescript sources directory.<br/>__*Default*__: "src"
**stability**?🔹 | <code>string</code> | Package's Stability.<br/>__*Optional*__
**start**?🔹 | <code>boolean</code> | Defines a `yarn start` interactive experience.<br/>__*Default*__: true
**startOptions**?🔹 | <code>[StartOptions](#projen-startoptions)</code> | Options for `yarn start`.<br/>__*Default*__: default options
**testdir**?🔹 | <code>string</code> | Tests directory.<br/>__*Default*__: "test"
**tsconfig**?🔹 | <code>[TypescriptConfigOptions](#projen-typescriptconfigoptions)</code> | Custom TSConfig.<br/>__*Optional*__
**typescriptVersion**?🔹 | <code>[Semver](#projen-semver)</code> | TypeScript version to use.<br/>__*Default*__: ^3.9.5
**version**?🔹 | <code>[VersionOptions](#projen-versionoptions)</code> | Options for standard-version.<br/>__*Default*__: default options
**workflowBootstrapSteps**?🔹 | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/>__*Default*__: [ { run: `npx projen${PROJEN_VERSION}` }, { run: 'yarn install --frozen-lockfile' } ]
**workflowContainerImage**?🔹 | <code>string</code> | Container image to use for GitHub workflows.<br/>__*Default*__: default image
**workflowNodeVersion**?🔹 | <code>string</code> | The node version to use in GitHub workflows.<br/>__*Default*__: same as `minNodeVersion`



## struct TypescriptConfigOptions 🔹 <a id="projen-typescriptconfigoptions"></a>






Name | Type | Description 
-----|------|-------------
**compilerOptions**🔹 | <code>[TypeScriptCompilerOptions](#projen-typescriptcompileroptions)</code> | Compiler options to use.
**exclude**?🔹 | <code>Array<string></code> | __*Default*__: node_modules is excluded by default
**fileName**?🔹 | <code>string</code> | __*Default*__: "tsconfig.json"
**include**?🔹 | <code>Array<string></code> | The directory in which typescript sources reside.<br/>__*Default*__: all .ts files recursively



## struct VersionOptions 🔹 <a id="projen-versionoptions"></a>






Name | Type | Description 
-----|------|-------------
**commitAll**?🔹 | <code>boolean</code> | Commit generated artifacts in the release commit.<br/>__*Default*__: false
**lifecycleScripts**?🔹 | <code>[LifecycleScriptOptions](#projen-lifecyclescriptoptions)</code> | standard-version supports lifecycle scripts.<br/>__*Default*__: no lifecycle scripts
**skip**?🔹 | <code>[SkipOptions](#projen-skipoptions)</code> | standard-version allows for skipping any of the lifecycle steps (bump, changelog, commit, tag).<br/>__*Default*__: no lifecycle steps are skipped
**versionFilename**?🔹 | <code>string</code> | Filename used to track the version.<br/>__*Default*__: 'version.json'
**versionUpdater**?🔹 | <code>[VersionUpdater](#projen-versionupdater)</code> | The standard-version "updater" defines how the version file will be bumped.<br/>__*Default*__: VersionUpdater.JSON



## enum AutoRelease 🔹 <a id="projen-autorelease"></a>

Automatic bump modes.

Name | Description
-----|-----
**EVERY_COMMIT** 🔹|Automatically bump & release a new version for every commit to "master".
**DAILY** 🔹|Automatically bump & release a new version on a daily basis.


## enum DependabotScheduleInterval 🔹 <a id="projen-dependabotscheduleinterval"></a>

How often to check for new versions and raise pull requests for version updates.

Name | Description
-----|-----
**DAILY** 🔹|Runs on every weekday, Monday to Friday.
**WEEKLY** 🔹|Runs once each week.
**MONTHLY** 🔹|Runs once each month.


## enum Stability 🔹 <a id="projen-stability"></a>



Name | Description
-----|-----
**EXPERIMENTAL** 🔹|
**STABLE** 🔹|
**DEPRECATED** 🔹|


## enum StartEntryCategory 🔹 <a id="projen-startentrycategory"></a>



Name | Description
-----|-----
**BUILD** 🔹|
**TEST** 🔹|
**RELEASE** 🔹|
**MAINTAIN** 🔹|
**MISC** 🔹|


## enum VersionUpdater 🔹 <a id="projen-versionupdater"></a>

The standard-version "updater" defines how the version file will be bumped.

Name | Description
-----|-----
**PLAINTEXT** 🔹|The `plain-text` updater assumes the file contents represents the version.
**JSON** 🔹|The `json` updater assumes the version is available under a `version` key in the provided JSON document.


## enum VersioningStrategy 🔹 <a id="projen-versioningstrategy"></a>

The strategy to use when edits manifest and lock files.

Name | Description
-----|-----
**LOCKFILE_ONLY** 🔹|Only create pull requests to update lockfiles updates.
**AUTO** 🔹|- For apps, the version requirements are increased.
**WIDEN** 🔹|Relax the version requirement to include both the new and old version, when possible.
**INCREASE** 🔹|Always increase the version requirement to match the new version.
**INCREASE_IF_NECESSARY** 🔹|Increase the version requirement only when required by the new version.


