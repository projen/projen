# API Reference

**Classes**

Name|Description
----|-----------
[AwsCdkConstructLibrary](#projen-awscdkconstructlibrary)|AWS CDK construct library project.
[AwsCdkTypeScriptApp](#projen-awscdktypescriptapp)|AWS CDK app in TypeScript.
[Component](#projen-component)|Represents a project component.
[ConstructLibrary](#projen-constructlibrary)|A multi-language library for CDK constructs.
[ConstructLibraryAws](#projen-constructlibraryaws)|*No description*
[ConstructLibraryCdk8s](#projen-constructlibrarycdk8s)|CDK8s construct library project.
[Dependabot](#projen-dependabot)|Defines dependabot configuration for node projects.
[Eslint](#projen-eslint)|*No description*
[FileBase](#projen-filebase)|*No description*
[GithubWorkflow](#projen-githubworkflow)|*No description*
[IgnoreFile](#projen-ignorefile)|*No description*
[Jest](#projen-jest)|Installs the following npm scripts:.
[JsiiProject](#projen-jsiiproject)|Multi-language jsii library project.
[JsonFile](#projen-jsonfile)|*No description*
[License](#projen-license)|*No description*
[Mergify](#projen-mergify)|*No description*
[NextJsProject](#projen-nextjsproject)|NextJS project.
[NodeBuildWorkflow](#projen-nodebuildworkflow)|*No description*
[NodeProject](#projen-nodeproject)|Node.js project.
[Project](#projen-project)|Base project.
[Semver](#projen-semver)|*No description*
[Start](#projen-start)|*No description*
[TomlFile](#projen-tomlfile)|TOML file.
[TypeScriptAppProject](#projen-typescriptappproject)|TypeScript app.
[TypeScriptLibraryProject](#projen-typescriptlibraryproject)|*No description*
[TypeScriptProject](#projen-typescriptproject)|TypeScript project.
[TypescriptConfig](#projen-typescriptconfig)|*No description*
[Version](#projen-version)|*No description*


**Structs**

Name|Description
----|-----------
[AwsCdkConstructLibraryOptions](#projen-awscdkconstructlibraryoptions)|Options for the construct-lib-aws project.
[AwsCdkTypeScriptAppOptions](#projen-awscdktypescriptappoptions)|*No description*
[Catalog](#projen-catalog)|*No description*
[ConstructLibraryAwsOptions](#projen-constructlibraryawsoptions)|*No description*
[ConstructLibraryCdk8sOptions](#projen-constructlibrarycdk8soptions)|*No description*
[ConstructLibraryOptions](#projen-constructlibraryoptions)|*No description*
[CoverageThreshold](#projen-coveragethreshold)|*No description*
[DependabotIgnore](#projen-dependabotignore)|You can use the `ignore` option to customize which dependencies are updated.
[DependabotOptions](#projen-dependabotoptions)|*No description*
[EslintOptions](#projen-eslintoptions)|*No description*
[FileBaseOptions](#projen-filebaseoptions)|*No description*
[JestOptions](#projen-jestoptions)|*No description*
[JsiiDotNetTarget](#projen-jsiidotnettarget)|*No description*
[JsiiJavaTarget](#projen-jsiijavatarget)|*No description*
[JsiiProjectOptions](#projen-jsiiprojectoptions)|*No description*
[JsiiPythonTarget](#projen-jsiipythontarget)|*No description*
[JsonFileOptions](#projen-jsonfileoptions)|*No description*
[LicenseOptions](#projen-licenseoptions)|*No description*
[MergifyOptions](#projen-mergifyoptions)|*No description*
[MergifyRule](#projen-mergifyrule)|*No description*
[NextJsProjectOptions](#projen-nextjsprojectoptions)|*No description*
[NodeBuildWorkflowOptions](#projen-nodebuildworkflowoptions)|*No description*
[NodeProjectCommonOptions](#projen-nodeprojectcommonoptions)|*No description*
[NodeProjectOptions](#projen-nodeprojectoptions)|*No description*
[PeerDependencyOptions](#projen-peerdependencyoptions)|*No description*
[StartEntryOptions](#projen-startentryoptions)|*No description*
[StartOptions](#projen-startoptions)|*No description*
[TomlFileOptions](#projen-tomlfileoptions)|*No description*
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
[CdkApprovalLevel](#projen-cdkapprovallevel)|*No description*
[DependabotScheduleInterval](#projen-dependabotscheduleinterval)|How often to check for new versions and raise pull requests for version updates.
[NodePackageManager](#projen-nodepackagemanager)|The node package manager to use.
[Stability](#projen-stability)|*No description*
[StartEntryCategory](#projen-startentrycategory)|*No description*
[VersioningStrategy](#projen-versioningstrategy)|The strategy to use when edits manifest and lock files.



## class AwsCdkConstructLibrary 🔹 <a id="projen-awscdkconstructlibrary"></a>

AWS CDK construct library project.

A multi-language (jsii) construct library which vends constructs designed to
use within the AWS CDK with a friendly workflow and automatic publishing to
the construct catalog.

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
new AwsCdkConstructLibrary(options: AwsCdkConstructLibraryOptions)
```

* **options** (<code>[AwsCdkConstructLibraryOptions](#projen-awscdkconstructlibraryoptions)</code>)  *No description*
  * **allowLibraryDependencies** (<code>boolean</code>)  Allow the project to include `peerDependencies` and `bundledDependencies`. __*Default*__: true
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files on git. __*Default*__: true
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. __*Default*__: true
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. __*Optional*__
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. __*Default*__: true
  * **bundledDependencies** (<code>Array<string></code>)  *No description* __*Optional*__
  * **bundledDeps** (<code>Array<string></code>)  *No description* __*Optional*__
  * **copyrightOwner** (<code>string</code>)  License copyright owner. __*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. __*Default*__: current year
  * **defaultReleaseBranch** (<code>string</code>)  The name of the main release branch. __*Default*__: 'master'
  * **dependabot** (<code>boolean</code>)  Include dependabot configuration. __*Default*__: true;
  * **dependabotOptions** (<code>[DependabotOptions](#projen-dependabotoptions)</code>)  Options for dependabot. __*Default*__: default options
  * **dependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **deps** (<code>Array<string></code>)  *No description* __*Optional*__
  * **devDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **devDeps** (<code>Array<string></code>)  *No description* __*Optional*__
  * **entrypoint** (<code>string</code>)  Module entrypoint (`main` in `package.json`). __*Default*__: lib/index.js
  * **keywords** (<code>Array<string></code>)  Keywords to include in `package.json`. __*Optional*__
  * **libdir** (<code>string</code>)  Compiler artifacts output directory. __*Default*__: "lib"
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). __*Default*__: no max
  * **mergify** (<code>boolean</code>)  Adds mergify configuration. __*Default*__: true
  * **mergifyAutoMergeLabel** (<code>string</code>)  Automatically merge PRs that build successfully and have this label. __*Default*__: "auto-merge"
  * **mergifyOptions** (<code>[MergifyOptions](#projen-mergifyoptions)</code>)  Options for mergify. __*Default*__: default options
  * **minNodeVersion** (<code>string</code>)  Node.js version to require via package.json `engines` (inclusive). __*Default*__: no "engines" specified
  * **npmDistTag** (<code>string</code>)  The dist-tag to use when releasing to npm. __*Default*__: "latest"
  * **npmignore** (<code>Array<string></code>)  Additional entries to .npmignore. __*Optional*__
  * **npmignoreEnabled** (<code>boolean</code>)  Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs. __*Default*__: true
  * **npmRegistry** (<code>string</code>)  The registry url to use when releasing packages. __*Default*__: "registry.npmjs.org"
  * **packageManager** (<code>[NodePackageManager](#projen-nodepackagemanager)</code>)  The Node Package Manager used to execute scripts. __*Default*__: packageManager.YARN
  * **peerDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  *No description* __*Optional*__
  * **peerDeps** (<code>Array<string></code>)  *No description* __*Optional*__
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. __*Default*__: true
  * **projenUpgradeAutoMerge** (<code>boolean</code>)  Automatically merge projen upgrade PRs when build passes. __*Default*__: "true" if mergify auto-merge is enabled (default)
  * **projenUpgradeSchedule** (<code>Array<string></code>)  Customize the projenUpgrade schedule in cron expression. __*Default*__: [ '0 6 * * *' ]
  * **projenUpgradeSecret** (<code>string</code>)  Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`). __*Default*__: no automatic projen upgrade pull requests
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. __*Default*__: latest version
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. __*Default*__: [ "master" ] - based on the value of defaultReleaseBranch.
  * **releaseEveryCommit** (<code>boolean</code>)  Automatically release new versions every commit to one of branches in `releaseBranches`. __*Default*__: true
  * **releaseSchedule** (<code>string</code>)  CRON schedule to trigger new releases. __*Default*__: no scheduled releases
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. __*Default*__: false
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "master" when new versions are bumped. __*Default*__: true
  * **scripts** (<code>Map<string, string></code>)  npm scripts to include. __*Default*__: {}
  * **srcdir** (<code>string</code>)  Typescript sources directory. __*Default*__: "src"
  * **start** (<code>boolean</code>)  Defines a `yarn start` interactive experience. __*Default*__: true
  * **startOptions** (<code>[StartOptions](#projen-startoptions)</code>)  Options for `yarn start`. __*Default*__: default options
  * **testdir** (<code>string</code>)  Tests directory. __*Default*__: "test"
  * **workflowBootstrapSteps** (<code>Array<any></code>)  Workflow steps to use in order to bootstrap this repo. __*Default*__: "yarn install --frozen-lockfile && yarn projen"
  * **workflowContainerImage** (<code>string</code>)  Container image to use for GitHub workflows. __*Default*__: default image
  * **workflowNodeVersion** (<code>string</code>)  The node version to use in GitHub workflows. __*Default*__: same as `minNodeVersion`
  * **authorAddress** (<code>string</code>)  Email or URL of the library author. 
  * **authorName** (<code>string</code>)  The name of the library author. 
  * **name** (<code>string</code>)  The name of the library. 
  * **repository** (<code>string</code>)  Git repository URL. 
  * **authorEmail** (<code>string</code>)  *No description* __*Optional*__
  * **authorOrganization** (<code>boolean</code>)  *No description* __*Optional*__
  * **authorUrl** (<code>string</code>)  *No description* __*Optional*__
  * **compat** (<code>boolean</code>)  Automatically run API compatibility test against the latest version published to npm after compilation. __*Default*__: false
  * **compatIgnore** (<code>string</code>)  Name of the ignore file for API compatibility tests. __*Default*__: .compatignore
  * **description** (<code>string</code>)  Library description. __*Optional*__
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
  * **cdkVersion** (<code>string</code>)  Minmum target version this library is tested against. 
  * **cdkAssert** (<code>boolean</code>)  Install the @aws-cdk/assert library? __*Default*__: true
  * **cdkDependencies** (<code>Array<string></code>)  Which AWS CDK modules (those that start with "@aws-cdk/") does this library require when consumed? __*Optional*__
  * **cdkTestDependencies** (<code>Array<string></code>)  AWS CDK modules required for testing. __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**version**🔹 | <code>[Semver](#projen-semver)</code> | The target CDK version for this library.

### Methods


#### addCdkDependencies(...deps)🔹 <a id="projen-awscdkconstructlibrary-addcdkdependencies"></a>

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




#### addCdkTestDependencies(...deps)🔹 <a id="projen-awscdkconstructlibrary-addcdktestdependencies"></a>

Adds CDK modules as test dependencies.

```ts
addCdkTestDependencies(...deps: string[]): void
```

* **deps** (<code>string</code>)  names of cdk modules (e.g. `@aws-cdk/aws-lambda`).






## class AwsCdkTypeScriptApp 🔹 <a id="projen-awscdktypescriptapp"></a>

AWS CDK app in TypeScript.

__Extends__: [TypeScriptAppProject](#projen-typescriptappproject)

### Initializer




```ts
new AwsCdkTypeScriptApp(options: AwsCdkTypeScriptAppOptions)
```

* **options** (<code>[AwsCdkTypeScriptAppOptions](#projen-awscdktypescriptappoptions)</code>)  *No description*
  * **allowLibraryDependencies** (<code>boolean</code>)  Allow the project to include `peerDependencies` and `bundledDependencies`. __*Default*__: true
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files on git. __*Default*__: true
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. __*Default*__: true
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. __*Optional*__
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. __*Default*__: true
  * **bundledDependencies** (<code>Array<string></code>)  *No description* __*Optional*__
  * **bundledDeps** (<code>Array<string></code>)  *No description* __*Optional*__
  * **copyrightOwner** (<code>string</code>)  License copyright owner. __*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. __*Default*__: current year
  * **defaultReleaseBranch** (<code>string</code>)  The name of the main release branch. __*Default*__: 'master'
  * **dependabot** (<code>boolean</code>)  Include dependabot configuration. __*Default*__: true;
  * **dependabotOptions** (<code>[DependabotOptions](#projen-dependabotoptions)</code>)  Options for dependabot. __*Default*__: default options
  * **dependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **deps** (<code>Array<string></code>)  *No description* __*Optional*__
  * **devDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **devDeps** (<code>Array<string></code>)  *No description* __*Optional*__
  * **entrypoint** (<code>string</code>)  Module entrypoint (`main` in `package.json`). __*Default*__: lib/index.js
  * **keywords** (<code>Array<string></code>)  Keywords to include in `package.json`. __*Optional*__
  * **libdir** (<code>string</code>)  Compiler artifacts output directory. __*Default*__: "lib"
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). __*Default*__: no max
  * **mergify** (<code>boolean</code>)  Adds mergify configuration. __*Default*__: true
  * **mergifyAutoMergeLabel** (<code>string</code>)  Automatically merge PRs that build successfully and have this label. __*Default*__: "auto-merge"
  * **mergifyOptions** (<code>[MergifyOptions](#projen-mergifyoptions)</code>)  Options for mergify. __*Default*__: default options
  * **minNodeVersion** (<code>string</code>)  Node.js version to require via package.json `engines` (inclusive). __*Default*__: no "engines" specified
  * **npmDistTag** (<code>string</code>)  The dist-tag to use when releasing to npm. __*Default*__: "latest"
  * **npmignore** (<code>Array<string></code>)  Additional entries to .npmignore. __*Optional*__
  * **npmignoreEnabled** (<code>boolean</code>)  Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs. __*Default*__: true
  * **npmRegistry** (<code>string</code>)  The registry url to use when releasing packages. __*Default*__: "registry.npmjs.org"
  * **packageManager** (<code>[NodePackageManager](#projen-nodepackagemanager)</code>)  The Node Package Manager used to execute scripts. __*Default*__: packageManager.YARN
  * **peerDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  *No description* __*Optional*__
  * **peerDeps** (<code>Array<string></code>)  *No description* __*Optional*__
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. __*Default*__: true
  * **projenUpgradeAutoMerge** (<code>boolean</code>)  Automatically merge projen upgrade PRs when build passes. __*Default*__: "true" if mergify auto-merge is enabled (default)
  * **projenUpgradeSchedule** (<code>Array<string></code>)  Customize the projenUpgrade schedule in cron expression. __*Default*__: [ '0 6 * * *' ]
  * **projenUpgradeSecret** (<code>string</code>)  Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`). __*Default*__: no automatic projen upgrade pull requests
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. __*Default*__: latest version
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. __*Default*__: [ "master" ] - based on the value of defaultReleaseBranch.
  * **releaseEveryCommit** (<code>boolean</code>)  Automatically release new versions every commit to one of branches in `releaseBranches`. __*Default*__: true
  * **releaseSchedule** (<code>string</code>)  CRON schedule to trigger new releases. __*Default*__: no scheduled releases
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. __*Default*__: false
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "master" when new versions are bumped. __*Default*__: true
  * **scripts** (<code>Map<string, string></code>)  npm scripts to include. __*Default*__: {}
  * **srcdir** (<code>string</code>)  Typescript sources directory. __*Default*__: "src"
  * **start** (<code>boolean</code>)  Defines a `yarn start` interactive experience. __*Default*__: true
  * **startOptions** (<code>[StartOptions](#projen-startoptions)</code>)  Options for `yarn start`. __*Default*__: default options
  * **testdir** (<code>string</code>)  Tests directory. __*Default*__: "test"
  * **workflowBootstrapSteps** (<code>Array<any></code>)  Workflow steps to use in order to bootstrap this repo. __*Default*__: "yarn install --frozen-lockfile && yarn projen"
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
  * **repository** (<code>string</code>)  The repository is the location where the actual code for your package lives. __*Optional*__
  * **repositoryDirectory** (<code>string</code>)  If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives. __*Optional*__
  * **stability** (<code>string</code>)  Package's Stability. __*Optional*__
  * **compileBeforeTest** (<code>boolean</code>)  Compile the code before running tests. __*Default*__: the default behavior is to delete the lib/ directory and run jest typescript tests and only if all tests pass, run the compiler.
  * **disableTsconfig** (<code>boolean</code>)  Do not generate a `tsconfig.json` file (used by jsii projects since tsconfig.json is generated by the jsii compiler). __*Default*__: false
  * **docgen** (<code>boolean</code>)  Docgen by Typedoc. __*Default*__: false
  * **docsDirectory** (<code>string</code>)  Docs directory. __*Default*__: 'docs'
  * **entrypointTypes** (<code>string</code>)  The .d.ts file that includes the type declarations for this module. __*Default*__: .d.ts file derived from the project's entrypoint (usually lib/index.d.ts)
  * **eslint** (<code>boolean</code>)  Setup eslint. __*Default*__: true
  * **jest** (<code>boolean</code>)  Setup jest unit tests. __*Default*__: true
  * **jestOptions** (<code>[JestOptions](#projen-jestoptions)</code>)  Jest options. __*Default*__: default options
  * **package** (<code>boolean</code>)  Defines a `yarn package` command that will produce a tarball and place it under `dist/js`. __*Default*__: true
  * **sampleCode** (<code>boolean</code>)  Generate one-time sample in `src/` and `test/` if there are no files there. __*Default*__: true
  * **tsconfig** (<code>[TypescriptConfigOptions](#projen-typescriptconfigoptions)</code>)  Custom TSConfig. __*Optional*__
  * **typescriptVersion** (<code>[Semver](#projen-semver)</code>)  TypeScript version to use. __*Default*__: ^3.9.5
  * **cdkVersion** (<code>string</code>)  AWS CDK version to use. 
  * **appEntrypoint** (<code>string</code>)  The CDK app's entrypoint (relative to the source directory, which is "src" by default). __*Default*__: "main.ts"
  * **cdkDependencies** (<code>Array<string></code>)  Which AWS CDK modules (those that start with "@aws-cdk/") this app uses. __*Optional*__
  * **cdkVersionPinning** (<code>boolean</code>)  Use pinned version instead of caret version for CDK. __*Default*__: false
  * **context** (<code>Map<string, string></code>)  Additional context to include in `cdk.json`. __*Optional*__
  * **requireApproval** (<code>[CdkApprovalLevel](#projen-cdkapprovallevel)</code>)  To protect you against unintended changes that affect your security posture, the AWS CDK Toolkit prompts you to approve security-related changes before deploying them. __*Default*__: broadening



### Properties


Name | Type | Description 
-----|------|-------------
**appEntrypoint**🔹 | <code>string</code> | The CDK app entrypoint.
**cdkConfig**🔹 | <code>any</code> | Contents of `cdk.json`.
**cdkVersion**🔹 | <code>[Semver](#projen-semver)</code> | The CDK version this app is using.

### Methods


#### addCdkDependency(...modules)🔹 <a id="projen-awscdktypescriptapp-addcdkdependency"></a>

Adds an AWS CDK module dependencies.

```ts
addCdkDependency(...modules: string[]): void
```

* **modules** (<code>string</code>)  The list of modules to depend on.






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

### Methods


#### postSynthesize(_outdir)🔹 <a id="projen-component-postsynthesize"></a>

Called after synthesis.

Order is *not* guaranteed.

```ts
postSynthesize(_outdir: string): void
```

* **_outdir** (<code>string</code>)  The project directory.




#### synthesize(_outdir)🔹 <a id="projen-component-synthesize"></a>

Synthesizes files to the project output directory.

```ts
synthesize(_outdir: string): void
```

* **_outdir** (<code>string</code>)  The project directory*.






## class ConstructLibrary 🔹 <a id="projen-constructlibrary"></a>

A multi-language library for CDK constructs.

__Extends__: [JsiiProject](#projen-jsiiproject)
__Implemented by__: [AwsCdkConstructLibrary](#projen-awscdkconstructlibrary), [ConstructLibraryAws](#projen-constructlibraryaws), [ConstructLibraryCdk8s](#projen-constructlibrarycdk8s)

### Initializer




```ts
new ConstructLibrary(options: ConstructLibraryOptions)
```

* **options** (<code>[ConstructLibraryOptions](#projen-constructlibraryoptions)</code>)  *No description*
  * **allowLibraryDependencies** (<code>boolean</code>)  Allow the project to include `peerDependencies` and `bundledDependencies`. __*Default*__: true
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files on git. __*Default*__: true
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. __*Default*__: true
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. __*Optional*__
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. __*Default*__: true
  * **bundledDependencies** (<code>Array<string></code>)  *No description* __*Optional*__
  * **bundledDeps** (<code>Array<string></code>)  *No description* __*Optional*__
  * **copyrightOwner** (<code>string</code>)  License copyright owner. __*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. __*Default*__: current year
  * **defaultReleaseBranch** (<code>string</code>)  The name of the main release branch. __*Default*__: 'master'
  * **dependabot** (<code>boolean</code>)  Include dependabot configuration. __*Default*__: true;
  * **dependabotOptions** (<code>[DependabotOptions](#projen-dependabotoptions)</code>)  Options for dependabot. __*Default*__: default options
  * **dependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **deps** (<code>Array<string></code>)  *No description* __*Optional*__
  * **devDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **devDeps** (<code>Array<string></code>)  *No description* __*Optional*__
  * **entrypoint** (<code>string</code>)  Module entrypoint (`main` in `package.json`). __*Default*__: lib/index.js
  * **keywords** (<code>Array<string></code>)  Keywords to include in `package.json`. __*Optional*__
  * **libdir** (<code>string</code>)  Compiler artifacts output directory. __*Default*__: "lib"
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). __*Default*__: no max
  * **mergify** (<code>boolean</code>)  Adds mergify configuration. __*Default*__: true
  * **mergifyAutoMergeLabel** (<code>string</code>)  Automatically merge PRs that build successfully and have this label. __*Default*__: "auto-merge"
  * **mergifyOptions** (<code>[MergifyOptions](#projen-mergifyoptions)</code>)  Options for mergify. __*Default*__: default options
  * **minNodeVersion** (<code>string</code>)  Node.js version to require via package.json `engines` (inclusive). __*Default*__: no "engines" specified
  * **npmDistTag** (<code>string</code>)  The dist-tag to use when releasing to npm. __*Default*__: "latest"
  * **npmignore** (<code>Array<string></code>)  Additional entries to .npmignore. __*Optional*__
  * **npmignoreEnabled** (<code>boolean</code>)  Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs. __*Default*__: true
  * **npmRegistry** (<code>string</code>)  The registry url to use when releasing packages. __*Default*__: "registry.npmjs.org"
  * **packageManager** (<code>[NodePackageManager](#projen-nodepackagemanager)</code>)  The Node Package Manager used to execute scripts. __*Default*__: packageManager.YARN
  * **peerDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  *No description* __*Optional*__
  * **peerDeps** (<code>Array<string></code>)  *No description* __*Optional*__
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. __*Default*__: true
  * **projenUpgradeAutoMerge** (<code>boolean</code>)  Automatically merge projen upgrade PRs when build passes. __*Default*__: "true" if mergify auto-merge is enabled (default)
  * **projenUpgradeSchedule** (<code>Array<string></code>)  Customize the projenUpgrade schedule in cron expression. __*Default*__: [ '0 6 * * *' ]
  * **projenUpgradeSecret** (<code>string</code>)  Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`). __*Default*__: no automatic projen upgrade pull requests
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. __*Default*__: latest version
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. __*Default*__: [ "master" ] - based on the value of defaultReleaseBranch.
  * **releaseEveryCommit** (<code>boolean</code>)  Automatically release new versions every commit to one of branches in `releaseBranches`. __*Default*__: true
  * **releaseSchedule** (<code>string</code>)  CRON schedule to trigger new releases. __*Default*__: no scheduled releases
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. __*Default*__: false
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "master" when new versions are bumped. __*Default*__: true
  * **scripts** (<code>Map<string, string></code>)  npm scripts to include. __*Default*__: {}
  * **srcdir** (<code>string</code>)  Typescript sources directory. __*Default*__: "src"
  * **start** (<code>boolean</code>)  Defines a `yarn start` interactive experience. __*Default*__: true
  * **startOptions** (<code>[StartOptions](#projen-startoptions)</code>)  Options for `yarn start`. __*Default*__: default options
  * **testdir** (<code>string</code>)  Tests directory. __*Default*__: "test"
  * **workflowBootstrapSteps** (<code>Array<any></code>)  Workflow steps to use in order to bootstrap this repo. __*Default*__: "yarn install --frozen-lockfile && yarn projen"
  * **workflowContainerImage** (<code>string</code>)  Container image to use for GitHub workflows. __*Default*__: default image
  * **workflowNodeVersion** (<code>string</code>)  The node version to use in GitHub workflows. __*Default*__: same as `minNodeVersion`
  * **authorAddress** (<code>string</code>)  Email or URL of the library author. 
  * **authorName** (<code>string</code>)  The name of the library author. 
  * **name** (<code>string</code>)  The name of the library. 
  * **repository** (<code>string</code>)  Git repository URL. 
  * **authorEmail** (<code>string</code>)  *No description* __*Optional*__
  * **authorOrganization** (<code>boolean</code>)  *No description* __*Optional*__
  * **authorUrl** (<code>string</code>)  *No description* __*Optional*__
  * **compat** (<code>boolean</code>)  Automatically run API compatibility test against the latest version published to npm after compilation. __*Default*__: false
  * **compatIgnore** (<code>string</code>)  Name of the ignore file for API compatibility tests. __*Default*__: .compatignore
  * **description** (<code>string</code>)  Library description. __*Optional*__
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




## class ConstructLibraryAws ⚠️ <a id="projen-constructlibraryaws"></a>



__Extends__: [AwsCdkConstructLibrary](#projen-awscdkconstructlibrary)

### Initializer




```ts
new ConstructLibraryAws(options: AwsCdkConstructLibraryOptions)
```

* **options** (<code>[AwsCdkConstructLibraryOptions](#projen-awscdkconstructlibraryoptions)</code>)  *No description*
  * **allowLibraryDependencies** (<code>boolean</code>)  Allow the project to include `peerDependencies` and `bundledDependencies`. __*Default*__: true
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files on git. __*Default*__: true
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. __*Default*__: true
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. __*Optional*__
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. __*Default*__: true
  * **bundledDependencies** (<code>Array<string></code>)  *No description* __*Optional*__
  * **bundledDeps** (<code>Array<string></code>)  *No description* __*Optional*__
  * **copyrightOwner** (<code>string</code>)  License copyright owner. __*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. __*Default*__: current year
  * **defaultReleaseBranch** (<code>string</code>)  The name of the main release branch. __*Default*__: 'master'
  * **dependabot** (<code>boolean</code>)  Include dependabot configuration. __*Default*__: true;
  * **dependabotOptions** (<code>[DependabotOptions](#projen-dependabotoptions)</code>)  Options for dependabot. __*Default*__: default options
  * **dependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **deps** (<code>Array<string></code>)  *No description* __*Optional*__
  * **devDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **devDeps** (<code>Array<string></code>)  *No description* __*Optional*__
  * **entrypoint** (<code>string</code>)  Module entrypoint (`main` in `package.json`). __*Default*__: lib/index.js
  * **keywords** (<code>Array<string></code>)  Keywords to include in `package.json`. __*Optional*__
  * **libdir** (<code>string</code>)  Compiler artifacts output directory. __*Default*__: "lib"
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). __*Default*__: no max
  * **mergify** (<code>boolean</code>)  Adds mergify configuration. __*Default*__: true
  * **mergifyAutoMergeLabel** (<code>string</code>)  Automatically merge PRs that build successfully and have this label. __*Default*__: "auto-merge"
  * **mergifyOptions** (<code>[MergifyOptions](#projen-mergifyoptions)</code>)  Options for mergify. __*Default*__: default options
  * **minNodeVersion** (<code>string</code>)  Node.js version to require via package.json `engines` (inclusive). __*Default*__: no "engines" specified
  * **npmDistTag** (<code>string</code>)  The dist-tag to use when releasing to npm. __*Default*__: "latest"
  * **npmignore** (<code>Array<string></code>)  Additional entries to .npmignore. __*Optional*__
  * **npmignoreEnabled** (<code>boolean</code>)  Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs. __*Default*__: true
  * **npmRegistry** (<code>string</code>)  The registry url to use when releasing packages. __*Default*__: "registry.npmjs.org"
  * **packageManager** (<code>[NodePackageManager](#projen-nodepackagemanager)</code>)  The Node Package Manager used to execute scripts. __*Default*__: packageManager.YARN
  * **peerDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  *No description* __*Optional*__
  * **peerDeps** (<code>Array<string></code>)  *No description* __*Optional*__
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. __*Default*__: true
  * **projenUpgradeAutoMerge** (<code>boolean</code>)  Automatically merge projen upgrade PRs when build passes. __*Default*__: "true" if mergify auto-merge is enabled (default)
  * **projenUpgradeSchedule** (<code>Array<string></code>)  Customize the projenUpgrade schedule in cron expression. __*Default*__: [ '0 6 * * *' ]
  * **projenUpgradeSecret** (<code>string</code>)  Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`). __*Default*__: no automatic projen upgrade pull requests
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. __*Default*__: latest version
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. __*Default*__: [ "master" ] - based on the value of defaultReleaseBranch.
  * **releaseEveryCommit** (<code>boolean</code>)  Automatically release new versions every commit to one of branches in `releaseBranches`. __*Default*__: true
  * **releaseSchedule** (<code>string</code>)  CRON schedule to trigger new releases. __*Default*__: no scheduled releases
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. __*Default*__: false
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "master" when new versions are bumped. __*Default*__: true
  * **scripts** (<code>Map<string, string></code>)  npm scripts to include. __*Default*__: {}
  * **srcdir** (<code>string</code>)  Typescript sources directory. __*Default*__: "src"
  * **start** (<code>boolean</code>)  Defines a `yarn start` interactive experience. __*Default*__: true
  * **startOptions** (<code>[StartOptions](#projen-startoptions)</code>)  Options for `yarn start`. __*Default*__: default options
  * **testdir** (<code>string</code>)  Tests directory. __*Default*__: "test"
  * **workflowBootstrapSteps** (<code>Array<any></code>)  Workflow steps to use in order to bootstrap this repo. __*Default*__: "yarn install --frozen-lockfile && yarn projen"
  * **workflowContainerImage** (<code>string</code>)  Container image to use for GitHub workflows. __*Default*__: default image
  * **workflowNodeVersion** (<code>string</code>)  The node version to use in GitHub workflows. __*Default*__: same as `minNodeVersion`
  * **authorAddress** (<code>string</code>)  Email or URL of the library author. 
  * **authorName** (<code>string</code>)  The name of the library author. 
  * **name** (<code>string</code>)  The name of the library. 
  * **repository** (<code>string</code>)  Git repository URL. 
  * **authorEmail** (<code>string</code>)  *No description* __*Optional*__
  * **authorOrganization** (<code>boolean</code>)  *No description* __*Optional*__
  * **authorUrl** (<code>string</code>)  *No description* __*Optional*__
  * **compat** (<code>boolean</code>)  Automatically run API compatibility test against the latest version published to npm after compilation. __*Default*__: false
  * **compatIgnore** (<code>string</code>)  Name of the ignore file for API compatibility tests. __*Default*__: .compatignore
  * **description** (<code>string</code>)  Library description. __*Optional*__
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
  * **cdkVersion** (<code>string</code>)  Minmum target version this library is tested against. 
  * **cdkAssert** (<code>boolean</code>)  Install the @aws-cdk/assert library? __*Default*__: true
  * **cdkDependencies** (<code>Array<string></code>)  Which AWS CDK modules (those that start with "@aws-cdk/") does this library require when consumed? __*Optional*__
  * **cdkTestDependencies** (<code>Array<string></code>)  AWS CDK modules required for testing. __*Optional*__




## class ConstructLibraryCdk8s 🔹 <a id="projen-constructlibrarycdk8s"></a>

CDK8s construct library project.

A multi-language (jsii) construct library which vends constructs designed to
use within the CDK for Kubernetes (CDK8s), with a friendly workflow and
automatic publishing to the construct catalog.

__Extends__: [ConstructLibrary](#projen-constructlibrary)

### Initializer




```ts
new ConstructLibraryCdk8s(options: ConstructLibraryCdk8sOptions)
```

* **options** (<code>[ConstructLibraryCdk8sOptions](#projen-constructlibrarycdk8soptions)</code>)  *No description*
  * **allowLibraryDependencies** (<code>boolean</code>)  Allow the project to include `peerDependencies` and `bundledDependencies`. __*Default*__: true
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files on git. __*Default*__: true
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. __*Default*__: true
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. __*Optional*__
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. __*Default*__: true
  * **bundledDependencies** (<code>Array<string></code>)  *No description* __*Optional*__
  * **bundledDeps** (<code>Array<string></code>)  *No description* __*Optional*__
  * **copyrightOwner** (<code>string</code>)  License copyright owner. __*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. __*Default*__: current year
  * **defaultReleaseBranch** (<code>string</code>)  The name of the main release branch. __*Default*__: 'master'
  * **dependabot** (<code>boolean</code>)  Include dependabot configuration. __*Default*__: true;
  * **dependabotOptions** (<code>[DependabotOptions](#projen-dependabotoptions)</code>)  Options for dependabot. __*Default*__: default options
  * **dependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **deps** (<code>Array<string></code>)  *No description* __*Optional*__
  * **devDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **devDeps** (<code>Array<string></code>)  *No description* __*Optional*__
  * **entrypoint** (<code>string</code>)  Module entrypoint (`main` in `package.json`). __*Default*__: lib/index.js
  * **keywords** (<code>Array<string></code>)  Keywords to include in `package.json`. __*Optional*__
  * **libdir** (<code>string</code>)  Compiler artifacts output directory. __*Default*__: "lib"
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). __*Default*__: no max
  * **mergify** (<code>boolean</code>)  Adds mergify configuration. __*Default*__: true
  * **mergifyAutoMergeLabel** (<code>string</code>)  Automatically merge PRs that build successfully and have this label. __*Default*__: "auto-merge"
  * **mergifyOptions** (<code>[MergifyOptions](#projen-mergifyoptions)</code>)  Options for mergify. __*Default*__: default options
  * **minNodeVersion** (<code>string</code>)  Node.js version to require via package.json `engines` (inclusive). __*Default*__: no "engines" specified
  * **npmDistTag** (<code>string</code>)  The dist-tag to use when releasing to npm. __*Default*__: "latest"
  * **npmignore** (<code>Array<string></code>)  Additional entries to .npmignore. __*Optional*__
  * **npmignoreEnabled** (<code>boolean</code>)  Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs. __*Default*__: true
  * **npmRegistry** (<code>string</code>)  The registry url to use when releasing packages. __*Default*__: "registry.npmjs.org"
  * **packageManager** (<code>[NodePackageManager](#projen-nodepackagemanager)</code>)  The Node Package Manager used to execute scripts. __*Default*__: packageManager.YARN
  * **peerDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  *No description* __*Optional*__
  * **peerDeps** (<code>Array<string></code>)  *No description* __*Optional*__
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. __*Default*__: true
  * **projenUpgradeAutoMerge** (<code>boolean</code>)  Automatically merge projen upgrade PRs when build passes. __*Default*__: "true" if mergify auto-merge is enabled (default)
  * **projenUpgradeSchedule** (<code>Array<string></code>)  Customize the projenUpgrade schedule in cron expression. __*Default*__: [ '0 6 * * *' ]
  * **projenUpgradeSecret** (<code>string</code>)  Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`). __*Default*__: no automatic projen upgrade pull requests
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. __*Default*__: latest version
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. __*Default*__: [ "master" ] - based on the value of defaultReleaseBranch.
  * **releaseEveryCommit** (<code>boolean</code>)  Automatically release new versions every commit to one of branches in `releaseBranches`. __*Default*__: true
  * **releaseSchedule** (<code>string</code>)  CRON schedule to trigger new releases. __*Default*__: no scheduled releases
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. __*Default*__: false
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "master" when new versions are bumped. __*Default*__: true
  * **scripts** (<code>Map<string, string></code>)  npm scripts to include. __*Default*__: {}
  * **srcdir** (<code>string</code>)  Typescript sources directory. __*Default*__: "src"
  * **start** (<code>boolean</code>)  Defines a `yarn start` interactive experience. __*Default*__: true
  * **startOptions** (<code>[StartOptions](#projen-startoptions)</code>)  Options for `yarn start`. __*Default*__: default options
  * **testdir** (<code>string</code>)  Tests directory. __*Default*__: "test"
  * **workflowBootstrapSteps** (<code>Array<any></code>)  Workflow steps to use in order to bootstrap this repo. __*Default*__: "yarn install --frozen-lockfile && yarn projen"
  * **workflowContainerImage** (<code>string</code>)  Container image to use for GitHub workflows. __*Default*__: default image
  * **workflowNodeVersion** (<code>string</code>)  The node version to use in GitHub workflows. __*Default*__: same as `minNodeVersion`
  * **authorAddress** (<code>string</code>)  Email or URL of the library author. 
  * **authorName** (<code>string</code>)  The name of the library author. 
  * **name** (<code>string</code>)  The name of the library. 
  * **repository** (<code>string</code>)  Git repository URL. 
  * **authorEmail** (<code>string</code>)  *No description* __*Optional*__
  * **authorOrganization** (<code>boolean</code>)  *No description* __*Optional*__
  * **authorUrl** (<code>string</code>)  *No description* __*Optional*__
  * **compat** (<code>boolean</code>)  Automatically run API compatibility test against the latest version published to npm after compilation. __*Default*__: false
  * **compatIgnore** (<code>string</code>)  Name of the ignore file for API compatibility tests. __*Default*__: .compatignore
  * **description** (<code>string</code>)  Library description. __*Optional*__
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
  * **cdk8sVersion** (<code>string</code>)  Minimum target version this library is tested against. 




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



__Extends__: [Component](#projen-component)

### Initializer




```ts
new Eslint(project: NodeProject, options: EslintOptions)
```

* **project** (<code>[NodeProject](#projen-nodeproject)</code>)  *No description*
* **options** (<code>[EslintOptions](#projen-eslintoptions)</code>)  *No description*
  * **dirs** (<code>Array<string></code>)  Directories with source files to lint (e.g. [ "src", "test" ]). 
  * **tsconfigPath** (<code>string</code>)  *No description* 



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
__Implemented by__: [GithubWorkflow](#projen-githubworkflow), [IgnoreFile](#projen-ignorefile), [JsonFile](#projen-jsonfile), [License](#projen-license), [NodeBuildWorkflow](#projen-nodebuildworkflow), [TomlFile](#projen-tomlfile)

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


#### synthesize(outdir)🔹 <a id="projen-filebase-synthesize"></a>

Writes the file to the project's output directory.

```ts
synthesize(outdir: string): void
```

* **outdir** (<code>string</code>)  *No description*




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

Multi-language jsii library project.

__Extends__: [TypeScriptProject](#projen-typescriptproject)

### Initializer




```ts
new JsiiProject(options: JsiiProjectOptions)
```

* **options** (<code>[JsiiProjectOptions](#projen-jsiiprojectoptions)</code>)  *No description*
  * **allowLibraryDependencies** (<code>boolean</code>)  Allow the project to include `peerDependencies` and `bundledDependencies`. __*Default*__: true
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files on git. __*Default*__: true
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. __*Default*__: true
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. __*Optional*__
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. __*Default*__: true
  * **bundledDependencies** (<code>Array<string></code>)  *No description* __*Optional*__
  * **bundledDeps** (<code>Array<string></code>)  *No description* __*Optional*__
  * **copyrightOwner** (<code>string</code>)  License copyright owner. __*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. __*Default*__: current year
  * **defaultReleaseBranch** (<code>string</code>)  The name of the main release branch. __*Default*__: 'master'
  * **dependabot** (<code>boolean</code>)  Include dependabot configuration. __*Default*__: true;
  * **dependabotOptions** (<code>[DependabotOptions](#projen-dependabotoptions)</code>)  Options for dependabot. __*Default*__: default options
  * **dependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **deps** (<code>Array<string></code>)  *No description* __*Optional*__
  * **devDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **devDeps** (<code>Array<string></code>)  *No description* __*Optional*__
  * **entrypoint** (<code>string</code>)  Module entrypoint (`main` in `package.json`). __*Default*__: lib/index.js
  * **keywords** (<code>Array<string></code>)  Keywords to include in `package.json`. __*Optional*__
  * **libdir** (<code>string</code>)  Compiler artifacts output directory. __*Default*__: "lib"
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). __*Default*__: no max
  * **mergify** (<code>boolean</code>)  Adds mergify configuration. __*Default*__: true
  * **mergifyAutoMergeLabel** (<code>string</code>)  Automatically merge PRs that build successfully and have this label. __*Default*__: "auto-merge"
  * **mergifyOptions** (<code>[MergifyOptions](#projen-mergifyoptions)</code>)  Options for mergify. __*Default*__: default options
  * **minNodeVersion** (<code>string</code>)  Node.js version to require via package.json `engines` (inclusive). __*Default*__: no "engines" specified
  * **npmDistTag** (<code>string</code>)  The dist-tag to use when releasing to npm. __*Default*__: "latest"
  * **npmignore** (<code>Array<string></code>)  Additional entries to .npmignore. __*Optional*__
  * **npmignoreEnabled** (<code>boolean</code>)  Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs. __*Default*__: true
  * **npmRegistry** (<code>string</code>)  The registry url to use when releasing packages. __*Default*__: "registry.npmjs.org"
  * **packageManager** (<code>[NodePackageManager](#projen-nodepackagemanager)</code>)  The Node Package Manager used to execute scripts. __*Default*__: packageManager.YARN
  * **peerDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  *No description* __*Optional*__
  * **peerDeps** (<code>Array<string></code>)  *No description* __*Optional*__
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. __*Default*__: true
  * **projenUpgradeAutoMerge** (<code>boolean</code>)  Automatically merge projen upgrade PRs when build passes. __*Default*__: "true" if mergify auto-merge is enabled (default)
  * **projenUpgradeSchedule** (<code>Array<string></code>)  Customize the projenUpgrade schedule in cron expression. __*Default*__: [ '0 6 * * *' ]
  * **projenUpgradeSecret** (<code>string</code>)  Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`). __*Default*__: no automatic projen upgrade pull requests
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. __*Default*__: latest version
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. __*Default*__: [ "master" ] - based on the value of defaultReleaseBranch.
  * **releaseEveryCommit** (<code>boolean</code>)  Automatically release new versions every commit to one of branches in `releaseBranches`. __*Default*__: true
  * **releaseSchedule** (<code>string</code>)  CRON schedule to trigger new releases. __*Default*__: no scheduled releases
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. __*Default*__: false
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "master" when new versions are bumped. __*Default*__: true
  * **scripts** (<code>Map<string, string></code>)  npm scripts to include. __*Default*__: {}
  * **srcdir** (<code>string</code>)  Typescript sources directory. __*Default*__: "src"
  * **start** (<code>boolean</code>)  Defines a `yarn start` interactive experience. __*Default*__: true
  * **startOptions** (<code>[StartOptions](#projen-startoptions)</code>)  Options for `yarn start`. __*Default*__: default options
  * **testdir** (<code>string</code>)  Tests directory. __*Default*__: "test"
  * **workflowBootstrapSteps** (<code>Array<any></code>)  Workflow steps to use in order to bootstrap this repo. __*Default*__: "yarn install --frozen-lockfile && yarn projen"
  * **workflowContainerImage** (<code>string</code>)  Container image to use for GitHub workflows. __*Default*__: default image
  * **workflowNodeVersion** (<code>string</code>)  The node version to use in GitHub workflows. __*Default*__: same as `minNodeVersion`
  * **authorAddress** (<code>string</code>)  Email or URL of the library author. 
  * **authorName** (<code>string</code>)  The name of the library author. 
  * **name** (<code>string</code>)  The name of the library. 
  * **repository** (<code>string</code>)  Git repository URL. 
  * **authorEmail** (<code>string</code>)  *No description* __*Optional*__
  * **authorOrganization** (<code>boolean</code>)  *No description* __*Optional*__
  * **authorUrl** (<code>string</code>)  *No description* __*Optional*__
  * **compat** (<code>boolean</code>)  Automatically run API compatibility test against the latest version published to npm after compilation. __*Default*__: false
  * **compatIgnore** (<code>string</code>)  Name of the ignore file for API compatibility tests. __*Default*__: .compatignore
  * **description** (<code>string</code>)  Library description. __*Optional*__
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
**twineRegistryUrl**?🔹 | <code>string</code> | __*Optional*__



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



__Extends__: [Component](#projen-component)

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






## class NextJsProject 🔹 <a id="projen-nextjsproject"></a>

NextJS project.

__Extends__: [NodeProject](#projen-nodeproject)

### Initializer




```ts
new NextJsProject(options: NextJsProjectOptions)
```

* **options** (<code>[NextJsProjectOptions](#projen-nextjsprojectoptions)</code>)  *No description*
  * **allowLibraryDependencies** (<code>boolean</code>)  Allow the project to include `peerDependencies` and `bundledDependencies`. __*Default*__: true
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files on git. __*Default*__: true
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. __*Default*__: true
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. __*Optional*__
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. __*Default*__: true
  * **bundledDependencies** (<code>Array<string></code>)  *No description* __*Optional*__
  * **bundledDeps** (<code>Array<string></code>)  *No description* __*Optional*__
  * **copyrightOwner** (<code>string</code>)  License copyright owner. __*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. __*Default*__: current year
  * **defaultReleaseBranch** (<code>string</code>)  The name of the main release branch. __*Default*__: 'master'
  * **dependabot** (<code>boolean</code>)  Include dependabot configuration. __*Default*__: true;
  * **dependabotOptions** (<code>[DependabotOptions](#projen-dependabotoptions)</code>)  Options for dependabot. __*Default*__: default options
  * **dependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **deps** (<code>Array<string></code>)  *No description* __*Optional*__
  * **devDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **devDeps** (<code>Array<string></code>)  *No description* __*Optional*__
  * **entrypoint** (<code>string</code>)  Module entrypoint (`main` in `package.json`). __*Default*__: lib/index.js
  * **keywords** (<code>Array<string></code>)  Keywords to include in `package.json`. __*Optional*__
  * **libdir** (<code>string</code>)  Compiler artifacts output directory. __*Default*__: "lib"
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). __*Default*__: no max
  * **mergify** (<code>boolean</code>)  Adds mergify configuration. __*Default*__: true
  * **mergifyAutoMergeLabel** (<code>string</code>)  Automatically merge PRs that build successfully and have this label. __*Default*__: "auto-merge"
  * **mergifyOptions** (<code>[MergifyOptions](#projen-mergifyoptions)</code>)  Options for mergify. __*Default*__: default options
  * **minNodeVersion** (<code>string</code>)  Node.js version to require via package.json `engines` (inclusive). __*Default*__: no "engines" specified
  * **npmDistTag** (<code>string</code>)  The dist-tag to use when releasing to npm. __*Default*__: "latest"
  * **npmIgnore** (<code>boolean</code>)  Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs. __*Default*__: true
  * **npmRegistry** (<code>string</code>)  The registry url to use when releasing packages. __*Default*__: "registry.npmjs.org"
  * **packageManager** (<code>[NodePackageManager](#projen-nodepackagemanager)</code>)  The Node Package Manager used to execute scripts. __*Default*__: packageManager.YARN
  * **peerDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  *No description* __*Optional*__
  * **peerDeps** (<code>Array<string></code>)  *No description* __*Optional*__
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. __*Default*__: true
  * **projenUpgradeAutoMerge** (<code>boolean</code>)  Automatically merge projen upgrade PRs when build passes. __*Default*__: "true" if mergify auto-merge is enabled (default)
  * **projenUpgradeSchedule** (<code>Array<string></code>)  Customize the projenUpgrade schedule in cron expression. __*Default*__: [ '0 6 * * *' ]
  * **projenUpgradeSecret** (<code>string</code>)  Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`). __*Default*__: no automatic projen upgrade pull requests
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. __*Default*__: latest version
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. __*Default*__: [ "master" ] - based on the value of defaultReleaseBranch.
  * **releaseEveryCommit** (<code>boolean</code>)  Automatically release new versions every commit to one of branches in `releaseBranches`. __*Default*__: true
  * **releaseSchedule** (<code>string</code>)  CRON schedule to trigger new releases. __*Default*__: no scheduled releases
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. __*Default*__: false
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "master" when new versions are bumped. __*Default*__: true
  * **scripts** (<code>Map<string, string></code>)  npm scripts to include. __*Default*__: {}
  * **srcdir** (<code>string</code>)  Typescript sources directory. __*Default*__: "src"
  * **start** (<code>boolean</code>)  Defines a `yarn start` interactive experience. __*Default*__: true
  * **startOptions** (<code>[StartOptions](#projen-startoptions)</code>)  Options for `yarn start`. __*Default*__: default options
  * **testdir** (<code>string</code>)  Tests directory. __*Default*__: "test"
  * **workflowBootstrapSteps** (<code>Array<any></code>)  Workflow steps to use in order to bootstrap this repo. __*Default*__: "yarn install --frozen-lockfile && yarn projen"
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
  * **repository** (<code>string</code>)  The repository is the location where the actual code for your package lives. __*Optional*__
  * **repositoryDirectory** (<code>string</code>)  If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives. __*Optional*__
  * **stability** (<code>string</code>)  Package's Stability. __*Optional*__
  * **assetsDir** (<code>string</code>)  Assets directory. __*Default*__: 'public'
  * **pagesDir** (<code>string</code>)  Pages directory. __*Default*__: 'pages'
  * **sampleCode** (<code>boolean</code>)  Generate one-time sample in `pages/` and `public/` if there are no files there. __*Default*__: true



### Properties


Name | Type | Description 
-----|------|-------------
**assetsDir**🔹 | <code>string</code> | The directory in which app assets reside.
**pagesDir**🔹 | <code>string</code> | The directory in which NextJS pages are declared.



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

Node.js project.

__Extends__: [Project](#projen-project)

### Initializer




```ts
new NodeProject(options: NodeProjectOptions)
```

* **options** (<code>[NodeProjectOptions](#projen-nodeprojectoptions)</code>)  *No description*
  * **allowLibraryDependencies** (<code>boolean</code>)  Allow the project to include `peerDependencies` and `bundledDependencies`. __*Default*__: true
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files on git. __*Default*__: true
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. __*Default*__: true
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. __*Optional*__
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. __*Default*__: true
  * **bundledDependencies** (<code>Array<string></code>)  *No description* __*Optional*__
  * **bundledDeps** (<code>Array<string></code>)  *No description* __*Optional*__
  * **copyrightOwner** (<code>string</code>)  License copyright owner. __*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. __*Default*__: current year
  * **defaultReleaseBranch** (<code>string</code>)  The name of the main release branch. __*Default*__: 'master'
  * **dependabot** (<code>boolean</code>)  Include dependabot configuration. __*Default*__: true;
  * **dependabotOptions** (<code>[DependabotOptions](#projen-dependabotoptions)</code>)  Options for dependabot. __*Default*__: default options
  * **dependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **deps** (<code>Array<string></code>)  *No description* __*Optional*__
  * **devDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **devDeps** (<code>Array<string></code>)  *No description* __*Optional*__
  * **entrypoint** (<code>string</code>)  Module entrypoint (`main` in `package.json`). __*Default*__: lib/index.js
  * **keywords** (<code>Array<string></code>)  Keywords to include in `package.json`. __*Optional*__
  * **libdir** (<code>string</code>)  Compiler artifacts output directory. __*Default*__: "lib"
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). __*Default*__: no max
  * **mergify** (<code>boolean</code>)  Adds mergify configuration. __*Default*__: true
  * **mergifyAutoMergeLabel** (<code>string</code>)  Automatically merge PRs that build successfully and have this label. __*Default*__: "auto-merge"
  * **mergifyOptions** (<code>[MergifyOptions](#projen-mergifyoptions)</code>)  Options for mergify. __*Default*__: default options
  * **minNodeVersion** (<code>string</code>)  Node.js version to require via package.json `engines` (inclusive). __*Default*__: no "engines" specified
  * **npmDistTag** (<code>string</code>)  The dist-tag to use when releasing to npm. __*Default*__: "latest"
  * **npmignore** (<code>Array<string></code>)  Additional entries to .npmignore. __*Optional*__
  * **npmignoreEnabled** (<code>boolean</code>)  Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs. __*Default*__: true
  * **npmRegistry** (<code>string</code>)  The registry url to use when releasing packages. __*Default*__: "registry.npmjs.org"
  * **packageManager** (<code>[NodePackageManager](#projen-nodepackagemanager)</code>)  The Node Package Manager used to execute scripts. __*Default*__: packageManager.YARN
  * **peerDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  *No description* __*Optional*__
  * **peerDeps** (<code>Array<string></code>)  *No description* __*Optional*__
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. __*Default*__: true
  * **projenUpgradeAutoMerge** (<code>boolean</code>)  Automatically merge projen upgrade PRs when build passes. __*Default*__: "true" if mergify auto-merge is enabled (default)
  * **projenUpgradeSchedule** (<code>Array<string></code>)  Customize the projenUpgrade schedule in cron expression. __*Default*__: [ '0 6 * * *' ]
  * **projenUpgradeSecret** (<code>string</code>)  Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`). __*Default*__: no automatic projen upgrade pull requests
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. __*Default*__: latest version
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. __*Default*__: [ "master" ] - based on the value of defaultReleaseBranch.
  * **releaseEveryCommit** (<code>boolean</code>)  Automatically release new versions every commit to one of branches in `releaseBranches`. __*Default*__: true
  * **releaseSchedule** (<code>string</code>)  CRON schedule to trigger new releases. __*Default*__: no scheduled releases
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. __*Default*__: false
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "master" when new versions are bumped. __*Default*__: true
  * **scripts** (<code>Map<string, string></code>)  npm scripts to include. __*Default*__: {}
  * **srcdir** (<code>string</code>)  Typescript sources directory. __*Default*__: "src"
  * **start** (<code>boolean</code>)  Defines a `yarn start` interactive experience. __*Default*__: true
  * **startOptions** (<code>[StartOptions](#projen-startoptions)</code>)  Options for `yarn start`. __*Default*__: default options
  * **testdir** (<code>string</code>)  Tests directory. __*Default*__: "test"
  * **workflowBootstrapSteps** (<code>Array<any></code>)  Workflow steps to use in order to bootstrap this repo. __*Default*__: "yarn install --frozen-lockfile && yarn projen"
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
  * **repository** (<code>string</code>)  The repository is the location where the actual code for your package lives. __*Optional*__
  * **repositoryDirectory** (<code>string</code>)  If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives. __*Optional*__
  * **stability** (<code>string</code>)  Package's Stability. __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**allowLibraryDependencies**🔹 | <code>boolean</code> | <span></span>
**antitamper**🔹 | <code>boolean</code> | Indicates if workflows have anti-tamper checks.
**entrypoint**🔹 | <code>string</code> | <span></span>
**manifest**🔹 | <code>any</code> | <span></span>
**npmDistTag**🔹 | <code>string</code> | <span></span>
**npmRegistry**🔹 | <code>string</code> | <span></span>
**packageManager**🔹 | <code>[NodePackageManager](#projen-nodepackagemanager)</code> | The package manager to use.
**runScriptCommand**🔹 | <code>string</code> | The command to use to run scripts (e.g. `yarn run` or `npm run` depends on the package mabnager).
**workflowAntitamperSteps**🔹 | <code>Array<any></code> | Returns the set of steps to perform anti-tamper check in a github workflow.
**workflowBootstrapSteps**🔹 | <code>Array<any></code> | Returns a set of steps to checkout and bootstrap the project in a github workflow.
**buildWorkflow**?🔹 | <code>[NodeBuildWorkflow](#projen-nodebuildworkflow)</code> | The PR build GitHub workflow.<br/>__*Optional*__
**maxNodeVersion**?🔹 | <code>string</code> | __*Optional*__
**mergify**?🔹 | <code>[Mergify](#projen-mergify)</code> | __*Optional*__
**minNodeVersion**?🔹 | <code>string</code> | __*Optional*__
**npmignore**?🔹 | <code>[IgnoreFile](#projen-ignorefile)</code> | __*Optional*__
**releaseWorkflow**?🔹 | <code>[NodeBuildWorkflow](#projen-nodebuildworkflow)</code> | The release GitHub workflow.<br/>__*Optional*__
**start**?🔹 | <code>[Start](#projen-start)</code> | The start menu.<br/>__*Optional*__
*static* **DEFAULT_WORKFLOW_BOOTSTRAP**🔹 | <code>Array<any></code> | The default command to execute when bootstrapping projen-based workflows.

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




#### addBundledDeps(...deps)🔹 <a id="projen-nodeproject-addbundleddeps"></a>

Defines bundled dependencies.

Bundled dependencies will be added as normal dependencies as well as to the
`bundledDependencies` section of your `package.json`.

```ts
addBundledDeps(...deps: string[]): void
```

* **deps** (<code>string</code>)  Names modules to install.




#### addCompileCommand(...commands)🔹 <a id="projen-nodeproject-addcompilecommand"></a>

Adds commands which will be executed after compilation.

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




#### addDeps(...deps)🔹 <a id="projen-nodeproject-adddeps"></a>

Defines normal dependencies.

```ts
addDeps(...deps: string[]): void
```

* **deps** (<code>string</code>)  Names modules to install.




#### addDevDependencies(deps)🔹 <a id="projen-nodeproject-adddevdependencies"></a>



```ts
addDevDependencies(deps: Map<string, Semver>): void
```

* **deps** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description*




#### addDevDeps(...deps)🔹 <a id="projen-nodeproject-adddevdeps"></a>

Defines development/test dependencies.

```ts
addDevDeps(...deps: string[]): void
```

* **deps** (<code>string</code>)  Names modules to install.




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




#### addPeerDeps(...deps)🔹 <a id="projen-nodeproject-addpeerdeps"></a>

Defines peer dependencies.

When adding peer dependencies, a devDependency will also be added on the
pinned version of the declared peer. This will ensure that you are testing
your code against the minimum version required from your consumers.

```ts
addPeerDeps(...deps: string[]): void
```

* **deps** (<code>string</code>)  Names modules to install.




#### addScript(name, ...commands)🔹 <a id="projen-nodeproject-addscript"></a>

Replaces the contents of an npm package.json script.

```ts
addScript(name: string, ...commands: string[]): void
```

* **name** (<code>string</code>)  The script name.
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

#### postSynthesize(outdir)🔹 <a id="projen-nodeproject-postsynthesize"></a>

Called after synthesis.

Order is *not* guaranteed.

```ts
postSynthesize(outdir: string): void
```

* **outdir** (<code>string</code>)  *No description*




#### preSynthesize(outdir)🔹 <a id="projen-nodeproject-presynthesize"></a>



```ts
preSynthesize(outdir: string): void
```

* **outdir** (<code>string</code>)  *No description*




#### removeScript(name)🔹 <a id="projen-nodeproject-removescript"></a>

Removes the npm script (always successful).

```ts
removeScript(name: string): void
```

* **name** (<code>string</code>)  The name of the script.






## class Project 🔹 <a id="projen-project"></a>

Base project.


### Initializer




```ts
new Project()
```




### Properties


Name | Type | Description 
-----|------|-------------
**gitignore**🔹 | <code>[IgnoreFile](#projen-ignorefile)</code> | <span></span>

### Methods


#### addTip(message)🔹 <a id="projen-project-addtip"></a>

Prints a "tip" message during synthesis.

```ts
addTip(message: string): void
```

* **message** (<code>string</code>)  The message.




#### postSynthesize(_outdir)🔹 <a id="projen-project-postsynthesize"></a>

Called after synthesis.

Order is *not* guaranteed.

```ts
postSynthesize(_outdir: string): void
```

* **_outdir** (<code>string</code>)  The project directory.




#### preSynthesize(_outdir)🔹 <a id="projen-project-presynthesize"></a>



```ts
preSynthesize(_outdir: string): void
```

* **_outdir** (<code>string</code>)  *No description*




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
**mode**?🔹 | <code>string</code> | __*Optional*__
**version**?🔹 | <code>string</code> | __*Optional*__

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

#### *static* latest()🔹 <a id="projen-semver-latest"></a>

Latest version.

```ts
static latest(): Semver
```


__Returns__:
* <code>[Semver](#projen-semver)</code>

#### *static* of(spec)🔹 <a id="projen-semver-of"></a>



```ts
static of(spec: string): Semver
```

* **spec** (<code>string</code>)  *No description*

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
  * **desc** (<code>string</code>)  The description of the start entry. 
  * **category** (<code>[StartEntryCategory](#projen-startentrycategory)</code>)  Priority-order (lower values will be shown first). __*Default*__: StartEntryCategory.MISC






## class TomlFile 🔹 <a id="projen-tomlfile"></a>

TOML file.

__Extends__: [FileBase](#projen-filebase)

### Initializer




```ts
new TomlFile(project: Project, filePath: string, options: TomlFileOptions)
```

* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **filePath** (<code>string</code>)  *No description*
* **options** (<code>[TomlFileOptions](#projen-tomlfileoptions)</code>)  *No description*
  * **committed** (<code>boolean</code>)  Indicates whether this file should be committed to git or ignored. __*Default*__: true
  * **editGitignore** (<code>boolean</code>)  Update the project's .gitignore file. __*Default*__: true
  * **readonly** (<code>boolean</code>)  Whether the generated file should be readonly. __*Default*__: true
  * **obj** (<code>any</code>)  Object to render in the TOML file. 



### Properties


Name | Type | Description 
-----|------|-------------
**obj**🔹 | <code>json</code> | <span></span>

### Methods


#### protected synthesizeContent(resolver)🔹 <a id="projen-tomlfile-synthesizecontent"></a>

Implemented by derived classes and returns the contents of the file to emit.

```ts
protected synthesizeContent(resolver: IResolver): string
```

* **resolver** (<code>[IResolver](#projen-iresolver)</code>)  *No description*

__Returns__:
* <code>string</code>



## class TypeScriptAppProject 🔹 <a id="projen-typescriptappproject"></a>

TypeScript app.

__Extends__: [TypeScriptProject](#projen-typescriptproject)

### Initializer




```ts
new TypeScriptAppProject(options: TypeScriptProjectOptions)
```

* **options** (<code>[TypeScriptProjectOptions](#projen-typescriptprojectoptions)</code>)  *No description*
  * **allowLibraryDependencies** (<code>boolean</code>)  Allow the project to include `peerDependencies` and `bundledDependencies`. __*Default*__: true
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files on git. __*Default*__: true
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. __*Default*__: true
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. __*Optional*__
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. __*Default*__: true
  * **bundledDependencies** (<code>Array<string></code>)  *No description* __*Optional*__
  * **bundledDeps** (<code>Array<string></code>)  *No description* __*Optional*__
  * **copyrightOwner** (<code>string</code>)  License copyright owner. __*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. __*Default*__: current year
  * **defaultReleaseBranch** (<code>string</code>)  The name of the main release branch. __*Default*__: 'master'
  * **dependabot** (<code>boolean</code>)  Include dependabot configuration. __*Default*__: true;
  * **dependabotOptions** (<code>[DependabotOptions](#projen-dependabotoptions)</code>)  Options for dependabot. __*Default*__: default options
  * **dependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **deps** (<code>Array<string></code>)  *No description* __*Optional*__
  * **devDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **devDeps** (<code>Array<string></code>)  *No description* __*Optional*__
  * **entrypoint** (<code>string</code>)  Module entrypoint (`main` in `package.json`). __*Default*__: lib/index.js
  * **keywords** (<code>Array<string></code>)  Keywords to include in `package.json`. __*Optional*__
  * **libdir** (<code>string</code>)  Compiler artifacts output directory. __*Default*__: "lib"
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). __*Default*__: no max
  * **mergify** (<code>boolean</code>)  Adds mergify configuration. __*Default*__: true
  * **mergifyAutoMergeLabel** (<code>string</code>)  Automatically merge PRs that build successfully and have this label. __*Default*__: "auto-merge"
  * **mergifyOptions** (<code>[MergifyOptions](#projen-mergifyoptions)</code>)  Options for mergify. __*Default*__: default options
  * **minNodeVersion** (<code>string</code>)  Node.js version to require via package.json `engines` (inclusive). __*Default*__: no "engines" specified
  * **npmDistTag** (<code>string</code>)  The dist-tag to use when releasing to npm. __*Default*__: "latest"
  * **npmignore** (<code>Array<string></code>)  Additional entries to .npmignore. __*Optional*__
  * **npmignoreEnabled** (<code>boolean</code>)  Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs. __*Default*__: true
  * **npmRegistry** (<code>string</code>)  The registry url to use when releasing packages. __*Default*__: "registry.npmjs.org"
  * **packageManager** (<code>[NodePackageManager](#projen-nodepackagemanager)</code>)  The Node Package Manager used to execute scripts. __*Default*__: packageManager.YARN
  * **peerDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  *No description* __*Optional*__
  * **peerDeps** (<code>Array<string></code>)  *No description* __*Optional*__
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. __*Default*__: true
  * **projenUpgradeAutoMerge** (<code>boolean</code>)  Automatically merge projen upgrade PRs when build passes. __*Default*__: "true" if mergify auto-merge is enabled (default)
  * **projenUpgradeSchedule** (<code>Array<string></code>)  Customize the projenUpgrade schedule in cron expression. __*Default*__: [ '0 6 * * *' ]
  * **projenUpgradeSecret** (<code>string</code>)  Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`). __*Default*__: no automatic projen upgrade pull requests
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. __*Default*__: latest version
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. __*Default*__: [ "master" ] - based on the value of defaultReleaseBranch.
  * **releaseEveryCommit** (<code>boolean</code>)  Automatically release new versions every commit to one of branches in `releaseBranches`. __*Default*__: true
  * **releaseSchedule** (<code>string</code>)  CRON schedule to trigger new releases. __*Default*__: no scheduled releases
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. __*Default*__: false
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "master" when new versions are bumped. __*Default*__: true
  * **scripts** (<code>Map<string, string></code>)  npm scripts to include. __*Default*__: {}
  * **srcdir** (<code>string</code>)  Typescript sources directory. __*Default*__: "src"
  * **start** (<code>boolean</code>)  Defines a `yarn start` interactive experience. __*Default*__: true
  * **startOptions** (<code>[StartOptions](#projen-startoptions)</code>)  Options for `yarn start`. __*Default*__: default options
  * **testdir** (<code>string</code>)  Tests directory. __*Default*__: "test"
  * **workflowBootstrapSteps** (<code>Array<any></code>)  Workflow steps to use in order to bootstrap this repo. __*Default*__: "yarn install --frozen-lockfile && yarn projen"
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
  * **repository** (<code>string</code>)  The repository is the location where the actual code for your package lives. __*Optional*__
  * **repositoryDirectory** (<code>string</code>)  If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives. __*Optional*__
  * **stability** (<code>string</code>)  Package's Stability. __*Optional*__
  * **compileBeforeTest** (<code>boolean</code>)  Compile the code before running tests. __*Default*__: the default behavior is to delete the lib/ directory and run jest typescript tests and only if all tests pass, run the compiler.
  * **disableTsconfig** (<code>boolean</code>)  Do not generate a `tsconfig.json` file (used by jsii projects since tsconfig.json is generated by the jsii compiler). __*Default*__: false
  * **docgen** (<code>boolean</code>)  Docgen by Typedoc. __*Default*__: false
  * **docsDirectory** (<code>string</code>)  Docs directory. __*Default*__: 'docs'
  * **entrypointTypes** (<code>string</code>)  The .d.ts file that includes the type declarations for this module. __*Default*__: .d.ts file derived from the project's entrypoint (usually lib/index.d.ts)
  * **eslint** (<code>boolean</code>)  Setup eslint. __*Default*__: true
  * **jest** (<code>boolean</code>)  Setup jest unit tests. __*Default*__: true
  * **jestOptions** (<code>[JestOptions](#projen-jestoptions)</code>)  Jest options. __*Default*__: default options
  * **package** (<code>boolean</code>)  Defines a `yarn package` command that will produce a tarball and place it under `dist/js`. __*Default*__: true
  * **sampleCode** (<code>boolean</code>)  Generate one-time sample in `src/` and `test/` if there are no files there. __*Default*__: true
  * **tsconfig** (<code>[TypescriptConfigOptions](#projen-typescriptconfigoptions)</code>)  Custom TSConfig. __*Optional*__
  * **typescriptVersion** (<code>[Semver](#projen-semver)</code>)  TypeScript version to use. __*Default*__: ^3.9.5




## class TypeScriptLibraryProject ⚠️ <a id="projen-typescriptlibraryproject"></a>



__Extends__: [TypeScriptProject](#projen-typescriptproject)

### Initializer




```ts
new TypeScriptLibraryProject(options: TypeScriptProjectOptions)
```

* **options** (<code>[TypeScriptProjectOptions](#projen-typescriptprojectoptions)</code>)  *No description*
  * **allowLibraryDependencies** (<code>boolean</code>)  Allow the project to include `peerDependencies` and `bundledDependencies`. __*Default*__: true
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files on git. __*Default*__: true
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. __*Default*__: true
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. __*Optional*__
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. __*Default*__: true
  * **bundledDependencies** (<code>Array<string></code>)  *No description* __*Optional*__
  * **bundledDeps** (<code>Array<string></code>)  *No description* __*Optional*__
  * **copyrightOwner** (<code>string</code>)  License copyright owner. __*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. __*Default*__: current year
  * **defaultReleaseBranch** (<code>string</code>)  The name of the main release branch. __*Default*__: 'master'
  * **dependabot** (<code>boolean</code>)  Include dependabot configuration. __*Default*__: true;
  * **dependabotOptions** (<code>[DependabotOptions](#projen-dependabotoptions)</code>)  Options for dependabot. __*Default*__: default options
  * **dependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **deps** (<code>Array<string></code>)  *No description* __*Optional*__
  * **devDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **devDeps** (<code>Array<string></code>)  *No description* __*Optional*__
  * **entrypoint** (<code>string</code>)  Module entrypoint (`main` in `package.json`). __*Default*__: lib/index.js
  * **keywords** (<code>Array<string></code>)  Keywords to include in `package.json`. __*Optional*__
  * **libdir** (<code>string</code>)  Compiler artifacts output directory. __*Default*__: "lib"
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). __*Default*__: no max
  * **mergify** (<code>boolean</code>)  Adds mergify configuration. __*Default*__: true
  * **mergifyAutoMergeLabel** (<code>string</code>)  Automatically merge PRs that build successfully and have this label. __*Default*__: "auto-merge"
  * **mergifyOptions** (<code>[MergifyOptions](#projen-mergifyoptions)</code>)  Options for mergify. __*Default*__: default options
  * **minNodeVersion** (<code>string</code>)  Node.js version to require via package.json `engines` (inclusive). __*Default*__: no "engines" specified
  * **npmDistTag** (<code>string</code>)  The dist-tag to use when releasing to npm. __*Default*__: "latest"
  * **npmignore** (<code>Array<string></code>)  Additional entries to .npmignore. __*Optional*__
  * **npmignoreEnabled** (<code>boolean</code>)  Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs. __*Default*__: true
  * **npmRegistry** (<code>string</code>)  The registry url to use when releasing packages. __*Default*__: "registry.npmjs.org"
  * **packageManager** (<code>[NodePackageManager](#projen-nodepackagemanager)</code>)  The Node Package Manager used to execute scripts. __*Default*__: packageManager.YARN
  * **peerDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  *No description* __*Optional*__
  * **peerDeps** (<code>Array<string></code>)  *No description* __*Optional*__
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. __*Default*__: true
  * **projenUpgradeAutoMerge** (<code>boolean</code>)  Automatically merge projen upgrade PRs when build passes. __*Default*__: "true" if mergify auto-merge is enabled (default)
  * **projenUpgradeSchedule** (<code>Array<string></code>)  Customize the projenUpgrade schedule in cron expression. __*Default*__: [ '0 6 * * *' ]
  * **projenUpgradeSecret** (<code>string</code>)  Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`). __*Default*__: no automatic projen upgrade pull requests
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. __*Default*__: latest version
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. __*Default*__: [ "master" ] - based on the value of defaultReleaseBranch.
  * **releaseEveryCommit** (<code>boolean</code>)  Automatically release new versions every commit to one of branches in `releaseBranches`. __*Default*__: true
  * **releaseSchedule** (<code>string</code>)  CRON schedule to trigger new releases. __*Default*__: no scheduled releases
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. __*Default*__: false
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "master" when new versions are bumped. __*Default*__: true
  * **scripts** (<code>Map<string, string></code>)  npm scripts to include. __*Default*__: {}
  * **srcdir** (<code>string</code>)  Typescript sources directory. __*Default*__: "src"
  * **start** (<code>boolean</code>)  Defines a `yarn start` interactive experience. __*Default*__: true
  * **startOptions** (<code>[StartOptions](#projen-startoptions)</code>)  Options for `yarn start`. __*Default*__: default options
  * **testdir** (<code>string</code>)  Tests directory. __*Default*__: "test"
  * **workflowBootstrapSteps** (<code>Array<any></code>)  Workflow steps to use in order to bootstrap this repo. __*Default*__: "yarn install --frozen-lockfile && yarn projen"
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
  * **repository** (<code>string</code>)  The repository is the location where the actual code for your package lives. __*Optional*__
  * **repositoryDirectory** (<code>string</code>)  If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives. __*Optional*__
  * **stability** (<code>string</code>)  Package's Stability. __*Optional*__
  * **compileBeforeTest** (<code>boolean</code>)  Compile the code before running tests. __*Default*__: the default behavior is to delete the lib/ directory and run jest typescript tests and only if all tests pass, run the compiler.
  * **disableTsconfig** (<code>boolean</code>)  Do not generate a `tsconfig.json` file (used by jsii projects since tsconfig.json is generated by the jsii compiler). __*Default*__: false
  * **docgen** (<code>boolean</code>)  Docgen by Typedoc. __*Default*__: false
  * **docsDirectory** (<code>string</code>)  Docs directory. __*Default*__: 'docs'
  * **entrypointTypes** (<code>string</code>)  The .d.ts file that includes the type declarations for this module. __*Default*__: .d.ts file derived from the project's entrypoint (usually lib/index.d.ts)
  * **eslint** (<code>boolean</code>)  Setup eslint. __*Default*__: true
  * **jest** (<code>boolean</code>)  Setup jest unit tests. __*Default*__: true
  * **jestOptions** (<code>[JestOptions](#projen-jestoptions)</code>)  Jest options. __*Default*__: default options
  * **package** (<code>boolean</code>)  Defines a `yarn package` command that will produce a tarball and place it under `dist/js`. __*Default*__: true
  * **sampleCode** (<code>boolean</code>)  Generate one-time sample in `src/` and `test/` if there are no files there. __*Default*__: true
  * **tsconfig** (<code>[TypescriptConfigOptions](#projen-typescriptconfigoptions)</code>)  Custom TSConfig. __*Optional*__
  * **typescriptVersion** (<code>[Semver](#projen-semver)</code>)  TypeScript version to use. __*Default*__: ^3.9.5




## class TypeScriptProject 🔹 <a id="projen-typescriptproject"></a>

TypeScript project.

__Extends__: [NodeProject](#projen-nodeproject)

### Initializer




```ts
new TypeScriptProject(options: TypeScriptProjectOptions)
```

* **options** (<code>[TypeScriptProjectOptions](#projen-typescriptprojectoptions)</code>)  *No description*
  * **allowLibraryDependencies** (<code>boolean</code>)  Allow the project to include `peerDependencies` and `bundledDependencies`. __*Default*__: true
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files on git. __*Default*__: true
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. __*Default*__: true
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. __*Optional*__
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. __*Default*__: true
  * **bundledDependencies** (<code>Array<string></code>)  *No description* __*Optional*__
  * **bundledDeps** (<code>Array<string></code>)  *No description* __*Optional*__
  * **copyrightOwner** (<code>string</code>)  License copyright owner. __*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. __*Default*__: current year
  * **defaultReleaseBranch** (<code>string</code>)  The name of the main release branch. __*Default*__: 'master'
  * **dependabot** (<code>boolean</code>)  Include dependabot configuration. __*Default*__: true;
  * **dependabotOptions** (<code>[DependabotOptions](#projen-dependabotoptions)</code>)  Options for dependabot. __*Default*__: default options
  * **dependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **deps** (<code>Array<string></code>)  *No description* __*Optional*__
  * **devDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **devDeps** (<code>Array<string></code>)  *No description* __*Optional*__
  * **entrypoint** (<code>string</code>)  Module entrypoint (`main` in `package.json`). __*Default*__: lib/index.js
  * **keywords** (<code>Array<string></code>)  Keywords to include in `package.json`. __*Optional*__
  * **libdir** (<code>string</code>)  Compiler artifacts output directory. __*Default*__: "lib"
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). __*Default*__: no max
  * **mergify** (<code>boolean</code>)  Adds mergify configuration. __*Default*__: true
  * **mergifyAutoMergeLabel** (<code>string</code>)  Automatically merge PRs that build successfully and have this label. __*Default*__: "auto-merge"
  * **mergifyOptions** (<code>[MergifyOptions](#projen-mergifyoptions)</code>)  Options for mergify. __*Default*__: default options
  * **minNodeVersion** (<code>string</code>)  Node.js version to require via package.json `engines` (inclusive). __*Default*__: no "engines" specified
  * **npmDistTag** (<code>string</code>)  The dist-tag to use when releasing to npm. __*Default*__: "latest"
  * **npmignore** (<code>Array<string></code>)  Additional entries to .npmignore. __*Optional*__
  * **npmignoreEnabled** (<code>boolean</code>)  Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs. __*Default*__: true
  * **npmRegistry** (<code>string</code>)  The registry url to use when releasing packages. __*Default*__: "registry.npmjs.org"
  * **packageManager** (<code>[NodePackageManager](#projen-nodepackagemanager)</code>)  The Node Package Manager used to execute scripts. __*Default*__: packageManager.YARN
  * **peerDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  *No description* __*Optional*__
  * **peerDeps** (<code>Array<string></code>)  *No description* __*Optional*__
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. __*Default*__: true
  * **projenUpgradeAutoMerge** (<code>boolean</code>)  Automatically merge projen upgrade PRs when build passes. __*Default*__: "true" if mergify auto-merge is enabled (default)
  * **projenUpgradeSchedule** (<code>Array<string></code>)  Customize the projenUpgrade schedule in cron expression. __*Default*__: [ '0 6 * * *' ]
  * **projenUpgradeSecret** (<code>string</code>)  Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`). __*Default*__: no automatic projen upgrade pull requests
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. __*Default*__: latest version
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. __*Default*__: [ "master" ] - based on the value of defaultReleaseBranch.
  * **releaseEveryCommit** (<code>boolean</code>)  Automatically release new versions every commit to one of branches in `releaseBranches`. __*Default*__: true
  * **releaseSchedule** (<code>string</code>)  CRON schedule to trigger new releases. __*Default*__: no scheduled releases
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. __*Default*__: false
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "master" when new versions are bumped. __*Default*__: true
  * **scripts** (<code>Map<string, string></code>)  npm scripts to include. __*Default*__: {}
  * **srcdir** (<code>string</code>)  Typescript sources directory. __*Default*__: "src"
  * **start** (<code>boolean</code>)  Defines a `yarn start` interactive experience. __*Default*__: true
  * **startOptions** (<code>[StartOptions](#projen-startoptions)</code>)  Options for `yarn start`. __*Default*__: default options
  * **testdir** (<code>string</code>)  Tests directory. __*Default*__: "test"
  * **workflowBootstrapSteps** (<code>Array<any></code>)  Workflow steps to use in order to bootstrap this repo. __*Default*__: "yarn install --frozen-lockfile && yarn projen"
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
  * **repository** (<code>string</code>)  The repository is the location where the actual code for your package lives. __*Optional*__
  * **repositoryDirectory** (<code>string</code>)  If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives. __*Optional*__
  * **stability** (<code>string</code>)  Package's Stability. __*Optional*__
  * **compileBeforeTest** (<code>boolean</code>)  Compile the code before running tests. __*Default*__: the default behavior is to delete the lib/ directory and run jest typescript tests and only if all tests pass, run the compiler.
  * **disableTsconfig** (<code>boolean</code>)  Do not generate a `tsconfig.json` file (used by jsii projects since tsconfig.json is generated by the jsii compiler). __*Default*__: false
  * **docgen** (<code>boolean</code>)  Docgen by Typedoc. __*Default*__: false
  * **docsDirectory** (<code>string</code>)  Docs directory. __*Default*__: 'docs'
  * **entrypointTypes** (<code>string</code>)  The .d.ts file that includes the type declarations for this module. __*Default*__: .d.ts file derived from the project's entrypoint (usually lib/index.d.ts)
  * **eslint** (<code>boolean</code>)  Setup eslint. __*Default*__: true
  * **jest** (<code>boolean</code>)  Setup jest unit tests. __*Default*__: true
  * **jestOptions** (<code>[JestOptions](#projen-jestoptions)</code>)  Jest options. __*Default*__: default options
  * **package** (<code>boolean</code>)  Defines a `yarn package` command that will produce a tarball and place it under `dist/js`. __*Default*__: true
  * **sampleCode** (<code>boolean</code>)  Generate one-time sample in `src/` and `test/` if there are no files there. __*Default*__: true
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
**tsconfig**?🔹 | <code>[TypescriptConfig](#projen-typescriptconfig)</code> | __*Optional*__

### Methods


#### addBuildCommand(...commands)🔹 <a id="projen-typescriptproject-addbuildcommand"></a>

Adds commands to run as part of `yarn build`.

```ts
addBuildCommand(...commands: string[]): void
```

* **commands** (<code>string</code>)  The commands to add.






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



__Extends__: [Component](#projen-component)

### Initializer




```ts
new Version(project: NodeProject, options: VersionOptions)
```

* **project** (<code>[NodeProject](#projen-nodeproject)</code>)  *No description*
* **options** (<code>[VersionOptions](#projen-versionoptions)</code>)  *No description*
  * **releaseBranch** (<code>string</code>)  The name of the release branch where the code and tags are pushed to. 


### Methods


#### resolveVersion(outdir)🔹 <a id="projen-version-resolveversion"></a>

Returns the current version of the project.

```ts
resolveVersion(outdir: string): any
```

* **outdir** (<code>string</code>)  *No description*

__Returns__:
* <code>any</code>



## struct AwsCdkConstructLibraryOptions 🔹 <a id="projen-awscdkconstructlibraryoptions"></a>


Options for the construct-lib-aws project.



Name | Type | Description 
-----|------|-------------
**authorAddress**🔹 | <code>string</code> | Email or URL of the library author.
**authorName**🔹 | <code>string</code> | The name of the library author.
**cdkVersion**🔹 | <code>string</code> | Minmum target version this library is tested against.
**name**🔹 | <code>string</code> | The name of the library.
**repository**🔹 | <code>string</code> | Git repository URL.
**allowLibraryDependencies**?🔹 | <code>boolean</code> | Allow the project to include `peerDependencies` and `bundledDependencies`.<br/>__*Default*__: true
**antitamper**?🔹 | <code>boolean</code> | Checks that after build there are no modified files on git.<br/>__*Default*__: true
**authorEmail**?⚠️ | <code>string</code> | __*Optional*__
**authorOrganization**?🔹 | <code>boolean</code> | __*Optional*__
**authorUrl**?⚠️ | <code>string</code> | __*Optional*__
**autoDetectBin**?🔹 | <code>boolean</code> | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.<br/>__*Default*__: true
**bin**?🔹 | <code>Map<string, string></code> | Binary programs vended with your module.<br/>__*Optional*__
**buildWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/>__*Default*__: true
**bundledDependencies**?🔹 | <code>Array<string></code> | __*Optional*__
**bundledDeps**?🔹 | <code>Array<string></code> | __*Optional*__
**catalog**?🔹 | <code>[Catalog](#projen-catalog)</code> | Libraries will be picked up by the construct catalog when they are published to npm as jsii modules and will be published under:.<br/>__*Default*__: new version will be announced
**cdkAssert**?🔹 | <code>boolean</code> | Install the @aws-cdk/assert library?<br/>__*Default*__: true
**cdkDependencies**?🔹 | <code>Array<string></code> | Which AWS CDK modules (those that start with "@aws-cdk/") does this library require when consumed?<br/>__*Optional*__
**cdkTestDependencies**?🔹 | <code>Array<string></code> | AWS CDK modules required for testing.<br/>__*Optional*__
**compat**?🔹 | <code>boolean</code> | Automatically run API compatibility test against the latest version published to npm after compilation.<br/>__*Default*__: false
**compatIgnore**?🔹 | <code>string</code> | Name of the ignore file for API compatibility tests.<br/>__*Default*__: .compatignore
**copyrightOwner**?🔹 | <code>string</code> | License copyright owner.<br/>__*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?🔹 | <code>string</code> | The copyright years to put in the LICENSE file.<br/>__*Default*__: current year
**defaultReleaseBranch**?🔹 | <code>string</code> | The name of the main release branch.<br/>__*Default*__: 'master'
**dependabot**?🔹 | <code>boolean</code> | Include dependabot configuration.<br/>__*Default*__: true;
**dependabotOptions**?🔹 | <code>[DependabotOptions](#projen-dependabotoptions)</code> | Options for dependabot.<br/>__*Default*__: default options
**dependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**deps**?🔹 | <code>Array<string></code> | __*Optional*__
**description**?🔹 | <code>string</code> | Library description.<br/>__*Optional*__
**devDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**devDeps**?🔹 | <code>Array<string></code> | __*Optional*__
**docgen**?🔹 | <code>boolean</code> | Automatically generate API.md from jsii.<br/>__*Default*__: true
**dotnet**?🔹 | <code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code> | __*Optional*__
**entrypoint**?🔹 | <code>string</code> | Module entrypoint (`main` in `package.json`).<br/>__*Default*__: lib/index.js
**eslint**?🔹 | <code>boolean</code> | Install eslint.<br/>__*Default*__: true
**java**?🔹 | <code>[JsiiJavaTarget](#projen-jsiijavatarget)</code> | __*Optional*__
**jest**?🔹 | <code>boolean</code> | Use jest for unit tests.<br/>__*Default*__: true
**jestOptions**?🔹 | <code>[JestOptions](#projen-jestoptions)</code> | Jest options.<br/>__*Default*__: defaults
**jsiiVersion**?🔹 | <code>[Semver](#projen-semver)</code> | __*Optional*__
**keywords**?🔹 | <code>Array<string></code> | Keywords to include in `package.json`.<br/>__*Optional*__
**libdir**?🔹 | <code>string</code> | Compiler artifacts output directory.<br/>__*Default*__: "lib"
**license**?🔹 | <code>string</code> | __*Optional*__
**maxNodeVersion**?🔹 | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/>__*Default*__: no max
**mergify**?🔹 | <code>boolean</code> | Adds mergify configuration.<br/>__*Default*__: true
**mergifyAutoMergeLabel**?🔹 | <code>string</code> | Automatically merge PRs that build successfully and have this label.<br/>__*Default*__: "auto-merge"
**mergifyOptions**?🔹 | <code>[MergifyOptions](#projen-mergifyoptions)</code> | Options for mergify.<br/>__*Default*__: default options
**minNodeVersion**?🔹 | <code>string</code> | Node.js version to require via package.json `engines` (inclusive).<br/>__*Default*__: no "engines" specified
**npmDistTag**?🔹 | <code>string</code> | The dist-tag to use when releasing to npm.<br/>__*Default*__: "latest"
**npmRegistry**?🔹 | <code>string</code> | The registry url to use when releasing packages.<br/>__*Default*__: "registry.npmjs.org"
**npmignore**?🔹 | <code>Array<string></code> | Additional entries to .npmignore.<br/>__*Optional*__
**npmignoreEnabled**?🔹 | <code>boolean</code> | Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs.<br/>__*Default*__: true
**packageManager**?🔹 | <code>[NodePackageManager](#projen-nodepackagemanager)</code> | The Node Package Manager used to execute scripts.<br/>__*Default*__: packageManager.YARN
**peerDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**peerDependencyOptions**?🔹 | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | __*Optional*__
**peerDeps**?🔹 | <code>Array<string></code> | __*Optional*__
**projenDevDependency**?🔹 | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/>__*Default*__: true
**projenUpgradeAutoMerge**?🔹 | <code>boolean</code> | Automatically merge projen upgrade PRs when build passes.<br/>__*Default*__: "true" if mergify auto-merge is enabled (default)
**projenUpgradeSchedule**?🔹 | <code>Array<string></code> | Customize the projenUpgrade schedule in cron expression.<br/>__*Default*__: [ '0 6 * * *' ]
**projenUpgradeSecret**?🔹 | <code>string</code> | Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`).<br/>__*Default*__: no automatic projen upgrade pull requests
**projenVersion**?🔹 | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/>__*Default*__: latest version
**python**?🔹 | <code>[JsiiPythonTarget](#projen-jsiipythontarget)</code> | __*Optional*__
**releaseBranches**?🔹 | <code>Array<string></code> | Branches which trigger a release.<br/>__*Default*__: [ "master" ] - based on the value of defaultReleaseBranch.
**releaseEveryCommit**?🔹 | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`.<br/>__*Default*__: true
**releaseSchedule**?🔹 | <code>string</code> | CRON schedule to trigger new releases.<br/>__*Default*__: no scheduled releases
**releaseToNpm**?🔹 | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/>__*Default*__: false
**releaseWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for releasing from "master" when new versions are bumped.<br/>__*Default*__: true
**rootdir**?🔹 | <code>string</code> | __*Default*__: "."
**scripts**?🔹 | <code>Map<string, string></code> | npm scripts to include.<br/>__*Default*__: {}
**srcdir**?🔹 | <code>string</code> | Typescript sources directory.<br/>__*Default*__: "src"
**stability**?🔹 | <code>string</code> | __*Optional*__
**start**?🔹 | <code>boolean</code> | Defines a `yarn start` interactive experience.<br/>__*Default*__: true
**startOptions**?🔹 | <code>[StartOptions](#projen-startoptions)</code> | Options for `yarn start`.<br/>__*Default*__: default options
**testdir**?🔹 | <code>string</code> | Tests directory.<br/>__*Default*__: "test"
**workflowBootstrapSteps**?🔹 | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/>__*Default*__: "yarn install --frozen-lockfile && yarn projen"
**workflowContainerImage**?🔹 | <code>string</code> | Container image to use for GitHub workflows.<br/>__*Default*__: default image
**workflowNodeVersion**?🔹 | <code>string</code> | The node version to use in GitHub workflows.<br/>__*Default*__: same as `minNodeVersion`



## struct AwsCdkTypeScriptAppOptions 🔹 <a id="projen-awscdktypescriptappoptions"></a>






Name | Type | Description 
-----|------|-------------
**cdkVersion**🔹 | <code>string</code> | AWS CDK version to use.
**name**🔹 | <code>string</code> | This is the name of your package.
**allowLibraryDependencies**?🔹 | <code>boolean</code> | Allow the project to include `peerDependencies` and `bundledDependencies`.<br/>__*Default*__: true
**antitamper**?🔹 | <code>boolean</code> | Checks that after build there are no modified files on git.<br/>__*Default*__: true
**appEntrypoint**?🔹 | <code>string</code> | The CDK app's entrypoint (relative to the source directory, which is "src" by default).<br/>__*Default*__: "main.ts"
**authorEmail**?🔹 | <code>string</code> | Author's e-mail.<br/>__*Optional*__
**authorName**?🔹 | <code>string</code> | Author's name.<br/>__*Optional*__
**authorOrganization**?🔹 | <code>boolean</code> | Author's Organization.<br/>__*Optional*__
**authorUrl**?🔹 | <code>string</code> | Author's URL / Website.<br/>__*Optional*__
**autoDetectBin**?🔹 | <code>boolean</code> | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.<br/>__*Default*__: true
**bin**?🔹 | <code>Map<string, string></code> | Binary programs vended with your module.<br/>__*Optional*__
**buildWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/>__*Default*__: true
**bundledDependencies**?🔹 | <code>Array<string></code> | __*Optional*__
**bundledDeps**?🔹 | <code>Array<string></code> | __*Optional*__
**cdkDependencies**?🔹 | <code>Array<string></code> | Which AWS CDK modules (those that start with "@aws-cdk/") this app uses.<br/>__*Optional*__
**cdkVersionPinning**?🔹 | <code>boolean</code> | Use pinned version instead of caret version for CDK.<br/>__*Default*__: false
**compileBeforeTest**?🔹 | <code>boolean</code> | Compile the code before running tests.<br/>__*Default*__: the default behavior is to delete the lib/ directory and run jest typescript tests and only if all tests pass, run the compiler.
**context**?🔹 | <code>Map<string, string></code> | Additional context to include in `cdk.json`.<br/>__*Optional*__
**copyrightOwner**?🔹 | <code>string</code> | License copyright owner.<br/>__*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?🔹 | <code>string</code> | The copyright years to put in the LICENSE file.<br/>__*Default*__: current year
**defaultReleaseBranch**?🔹 | <code>string</code> | The name of the main release branch.<br/>__*Default*__: 'master'
**dependabot**?🔹 | <code>boolean</code> | Include dependabot configuration.<br/>__*Default*__: true;
**dependabotOptions**?🔹 | <code>[DependabotOptions](#projen-dependabotoptions)</code> | Options for dependabot.<br/>__*Default*__: default options
**dependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**deps**?🔹 | <code>Array<string></code> | __*Optional*__
**description**?🔹 | <code>string</code> | The description is just a string that helps people understand the purpose of the package.<br/>__*Optional*__
**devDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**devDeps**?🔹 | <code>Array<string></code> | __*Optional*__
**disableTsconfig**?🔹 | <code>boolean</code> | Do not generate a `tsconfig.json` file (used by jsii projects since tsconfig.json is generated by the jsii compiler).<br/>__*Default*__: false
**docgen**?🔹 | <code>boolean</code> | Docgen by Typedoc.<br/>__*Default*__: false
**docsDirectory**?🔹 | <code>string</code> | Docs directory.<br/>__*Default*__: 'docs'
**entrypoint**?🔹 | <code>string</code> | Module entrypoint (`main` in `package.json`).<br/>__*Default*__: lib/index.js
**entrypointTypes**?🔹 | <code>string</code> | The .d.ts file that includes the type declarations for this module.<br/>__*Default*__: .d.ts file derived from the project's entrypoint (usually lib/index.d.ts)
**eslint**?🔹 | <code>boolean</code> | Setup eslint.<br/>__*Default*__: true
**gitignore**?🔹 | <code>Array<string></code> | Additional entries to .gitignore.<br/>__*Optional*__
**homepage**?🔹 | <code>string</code> | Package's Homepage / Website.<br/>__*Optional*__
**jest**?🔹 | <code>boolean</code> | Setup jest unit tests.<br/>__*Default*__: true
**jestOptions**?🔹 | <code>[JestOptions](#projen-jestoptions)</code> | Jest options.<br/>__*Default*__: default options
**keywords**?🔹 | <code>Array<string></code> | Keywords to include in `package.json`.<br/>__*Optional*__
**libdir**?🔹 | <code>string</code> | Compiler artifacts output directory.<br/>__*Default*__: "lib"
**license**?🔹 | <code>string</code> | License's SPDX identifier.<br/>__*Optional*__
**maxNodeVersion**?🔹 | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/>__*Default*__: no max
**mergify**?🔹 | <code>boolean</code> | Adds mergify configuration.<br/>__*Default*__: true
**mergifyAutoMergeLabel**?🔹 | <code>string</code> | Automatically merge PRs that build successfully and have this label.<br/>__*Default*__: "auto-merge"
**mergifyOptions**?🔹 | <code>[MergifyOptions](#projen-mergifyoptions)</code> | Options for mergify.<br/>__*Default*__: default options
**minNodeVersion**?🔹 | <code>string</code> | Node.js version to require via package.json `engines` (inclusive).<br/>__*Default*__: no "engines" specified
**npmDistTag**?🔹 | <code>string</code> | The dist-tag to use when releasing to npm.<br/>__*Default*__: "latest"
**npmRegistry**?🔹 | <code>string</code> | The registry url to use when releasing packages.<br/>__*Default*__: "registry.npmjs.org"
**npmignore**?🔹 | <code>Array<string></code> | Additional entries to .npmignore.<br/>__*Optional*__
**npmignoreEnabled**?🔹 | <code>boolean</code> | Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs.<br/>__*Default*__: true
**package**?🔹 | <code>boolean</code> | Defines a `yarn package` command that will produce a tarball and place it under `dist/js`.<br/>__*Default*__: true
**packageManager**?🔹 | <code>[NodePackageManager](#projen-nodepackagemanager)</code> | The Node Package Manager used to execute scripts.<br/>__*Default*__: packageManager.YARN
**peerDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**peerDependencyOptions**?🔹 | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | __*Optional*__
**peerDeps**?🔹 | <code>Array<string></code> | __*Optional*__
**projenDevDependency**?🔹 | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/>__*Default*__: true
**projenUpgradeAutoMerge**?🔹 | <code>boolean</code> | Automatically merge projen upgrade PRs when build passes.<br/>__*Default*__: "true" if mergify auto-merge is enabled (default)
**projenUpgradeSchedule**?🔹 | <code>Array<string></code> | Customize the projenUpgrade schedule in cron expression.<br/>__*Default*__: [ '0 6 * * *' ]
**projenUpgradeSecret**?🔹 | <code>string</code> | Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`).<br/>__*Default*__: no automatic projen upgrade pull requests
**projenVersion**?🔹 | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/>__*Default*__: latest version
**releaseBranches**?🔹 | <code>Array<string></code> | Branches which trigger a release.<br/>__*Default*__: [ "master" ] - based on the value of defaultReleaseBranch.
**releaseEveryCommit**?🔹 | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`.<br/>__*Default*__: true
**releaseSchedule**?🔹 | <code>string</code> | CRON schedule to trigger new releases.<br/>__*Default*__: no scheduled releases
**releaseToNpm**?🔹 | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/>__*Default*__: false
**releaseWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for releasing from "master" when new versions are bumped.<br/>__*Default*__: true
**repository**?🔹 | <code>string</code> | The repository is the location where the actual code for your package lives.<br/>__*Optional*__
**repositoryDirectory**?🔹 | <code>string</code> | If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives.<br/>__*Optional*__
**requireApproval**?🔹 | <code>[CdkApprovalLevel](#projen-cdkapprovallevel)</code> | To protect you against unintended changes that affect your security posture, the AWS CDK Toolkit prompts you to approve security-related changes before deploying them.<br/>__*Default*__: broadening
**sampleCode**?🔹 | <code>boolean</code> | Generate one-time sample in `src/` and `test/` if there are no files there.<br/>__*Default*__: true
**scripts**?🔹 | <code>Map<string, string></code> | npm scripts to include.<br/>__*Default*__: {}
**srcdir**?🔹 | <code>string</code> | Typescript sources directory.<br/>__*Default*__: "src"
**stability**?🔹 | <code>string</code> | Package's Stability.<br/>__*Optional*__
**start**?🔹 | <code>boolean</code> | Defines a `yarn start` interactive experience.<br/>__*Default*__: true
**startOptions**?🔹 | <code>[StartOptions](#projen-startoptions)</code> | Options for `yarn start`.<br/>__*Default*__: default options
**testdir**?🔹 | <code>string</code> | Tests directory.<br/>__*Default*__: "test"
**tsconfig**?🔹 | <code>[TypescriptConfigOptions](#projen-typescriptconfigoptions)</code> | Custom TSConfig.<br/>__*Optional*__
**typescriptVersion**?🔹 | <code>[Semver](#projen-semver)</code> | TypeScript version to use.<br/>__*Default*__: ^3.9.5
**workflowBootstrapSteps**?🔹 | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/>__*Default*__: "yarn install --frozen-lockfile && yarn projen"
**workflowContainerImage**?🔹 | <code>string</code> | Container image to use for GitHub workflows.<br/>__*Default*__: default image
**workflowNodeVersion**?🔹 | <code>string</code> | The node version to use in GitHub workflows.<br/>__*Default*__: same as `minNodeVersion`



## struct Catalog 🔹 <a id="projen-catalog"></a>






Name | Type | Description 
-----|------|-------------
**announce**?🔹 | <code>boolean</code> | Should we announce new versions?<br/>__*Default*__: true
**twitter**?🔹 | <code>string</code> | Twitter account to @mention in announcement tweet.<br/>__*Optional*__



## struct ConstructLibraryAwsOptions ⚠️ <a id="projen-constructlibraryawsoptions"></a>






Name | Type | Description 
-----|------|-------------
**authorAddress**⚠️ | <code>string</code> | Email or URL of the library author.
**authorName**⚠️ | <code>string</code> | The name of the library author.
**cdkVersion**⚠️ | <code>string</code> | Minmum target version this library is tested against.
**name**⚠️ | <code>string</code> | The name of the library.
**repository**⚠️ | <code>string</code> | Git repository URL.
**allowLibraryDependencies**?⚠️ | <code>boolean</code> | Allow the project to include `peerDependencies` and `bundledDependencies`.<br/>__*Default*__: true
**antitamper**?⚠️ | <code>boolean</code> | Checks that after build there are no modified files on git.<br/>__*Default*__: true
**authorEmail**?⚠️ | <code>string</code> | __*Optional*__
**authorOrganization**?⚠️ | <code>boolean</code> | __*Optional*__
**authorUrl**?⚠️ | <code>string</code> | __*Optional*__
**autoDetectBin**?⚠️ | <code>boolean</code> | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.<br/>__*Default*__: true
**bin**?⚠️ | <code>Map<string, string></code> | Binary programs vended with your module.<br/>__*Optional*__
**buildWorkflow**?⚠️ | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/>__*Default*__: true
**bundledDependencies**?⚠️ | <code>Array<string></code> | __*Optional*__
**bundledDeps**?⚠️ | <code>Array<string></code> | __*Optional*__
**catalog**?⚠️ | <code>[Catalog](#projen-catalog)</code> | Libraries will be picked up by the construct catalog when they are published to npm as jsii modules and will be published under:.<br/>__*Default*__: new version will be announced
**cdkAssert**?⚠️ | <code>boolean</code> | Install the @aws-cdk/assert library?<br/>__*Default*__: true
**cdkDependencies**?⚠️ | <code>Array<string></code> | Which AWS CDK modules (those that start with "@aws-cdk/") does this library require when consumed?<br/>__*Optional*__
**cdkTestDependencies**?⚠️ | <code>Array<string></code> | AWS CDK modules required for testing.<br/>__*Optional*__
**compat**?⚠️ | <code>boolean</code> | Automatically run API compatibility test against the latest version published to npm after compilation.<br/>__*Default*__: false
**compatIgnore**?⚠️ | <code>string</code> | Name of the ignore file for API compatibility tests.<br/>__*Default*__: .compatignore
**copyrightOwner**?⚠️ | <code>string</code> | License copyright owner.<br/>__*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?⚠️ | <code>string</code> | The copyright years to put in the LICENSE file.<br/>__*Default*__: current year
**defaultReleaseBranch**?⚠️ | <code>string</code> | The name of the main release branch.<br/>__*Default*__: 'master'
**dependabot**?⚠️ | <code>boolean</code> | Include dependabot configuration.<br/>__*Default*__: true;
**dependabotOptions**?⚠️ | <code>[DependabotOptions](#projen-dependabotoptions)</code> | Options for dependabot.<br/>__*Default*__: default options
**dependencies**?⚠️ | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**deps**?⚠️ | <code>Array<string></code> | __*Optional*__
**description**?⚠️ | <code>string</code> | Library description.<br/>__*Optional*__
**devDependencies**?⚠️ | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**devDeps**?⚠️ | <code>Array<string></code> | __*Optional*__
**docgen**?⚠️ | <code>boolean</code> | Automatically generate API.md from jsii.<br/>__*Default*__: true
**dotnet**?⚠️ | <code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code> | __*Optional*__
**entrypoint**?⚠️ | <code>string</code> | Module entrypoint (`main` in `package.json`).<br/>__*Default*__: lib/index.js
**eslint**?⚠️ | <code>boolean</code> | Install eslint.<br/>__*Default*__: true
**java**?⚠️ | <code>[JsiiJavaTarget](#projen-jsiijavatarget)</code> | __*Optional*__
**jest**?⚠️ | <code>boolean</code> | Use jest for unit tests.<br/>__*Default*__: true
**jestOptions**?⚠️ | <code>[JestOptions](#projen-jestoptions)</code> | Jest options.<br/>__*Default*__: defaults
**jsiiVersion**?⚠️ | <code>[Semver](#projen-semver)</code> | __*Optional*__
**keywords**?⚠️ | <code>Array<string></code> | Keywords to include in `package.json`.<br/>__*Optional*__
**libdir**?⚠️ | <code>string</code> | Compiler artifacts output directory.<br/>__*Default*__: "lib"
**license**?⚠️ | <code>string</code> | __*Optional*__
**maxNodeVersion**?⚠️ | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/>__*Default*__: no max
**mergify**?⚠️ | <code>boolean</code> | Adds mergify configuration.<br/>__*Default*__: true
**mergifyAutoMergeLabel**?⚠️ | <code>string</code> | Automatically merge PRs that build successfully and have this label.<br/>__*Default*__: "auto-merge"
**mergifyOptions**?⚠️ | <code>[MergifyOptions](#projen-mergifyoptions)</code> | Options for mergify.<br/>__*Default*__: default options
**minNodeVersion**?⚠️ | <code>string</code> | Node.js version to require via package.json `engines` (inclusive).<br/>__*Default*__: no "engines" specified
**npmDistTag**?⚠️ | <code>string</code> | The dist-tag to use when releasing to npm.<br/>__*Default*__: "latest"
**npmRegistry**?⚠️ | <code>string</code> | The registry url to use when releasing packages.<br/>__*Default*__: "registry.npmjs.org"
**npmignore**?⚠️ | <code>Array<string></code> | Additional entries to .npmignore.<br/>__*Optional*__
**npmignoreEnabled**?⚠️ | <code>boolean</code> | Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs.<br/>__*Default*__: true
**packageManager**?⚠️ | <code>[NodePackageManager](#projen-nodepackagemanager)</code> | The Node Package Manager used to execute scripts.<br/>__*Default*__: packageManager.YARN
**peerDependencies**?⚠️ | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**peerDependencyOptions**?⚠️ | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | __*Optional*__
**peerDeps**?⚠️ | <code>Array<string></code> | __*Optional*__
**projenDevDependency**?⚠️ | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/>__*Default*__: true
**projenUpgradeAutoMerge**?⚠️ | <code>boolean</code> | Automatically merge projen upgrade PRs when build passes.<br/>__*Default*__: "true" if mergify auto-merge is enabled (default)
**projenUpgradeSchedule**?⚠️ | <code>Array<string></code> | Customize the projenUpgrade schedule in cron expression.<br/>__*Default*__: [ '0 6 * * *' ]
**projenUpgradeSecret**?⚠️ | <code>string</code> | Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`).<br/>__*Default*__: no automatic projen upgrade pull requests
**projenVersion**?⚠️ | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/>__*Default*__: latest version
**python**?⚠️ | <code>[JsiiPythonTarget](#projen-jsiipythontarget)</code> | __*Optional*__
**releaseBranches**?⚠️ | <code>Array<string></code> | Branches which trigger a release.<br/>__*Default*__: [ "master" ] - based on the value of defaultReleaseBranch.
**releaseEveryCommit**?⚠️ | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`.<br/>__*Default*__: true
**releaseSchedule**?⚠️ | <code>string</code> | CRON schedule to trigger new releases.<br/>__*Default*__: no scheduled releases
**releaseToNpm**?⚠️ | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/>__*Default*__: false
**releaseWorkflow**?⚠️ | <code>boolean</code> | Define a GitHub workflow for releasing from "master" when new versions are bumped.<br/>__*Default*__: true
**rootdir**?⚠️ | <code>string</code> | __*Default*__: "."
**scripts**?⚠️ | <code>Map<string, string></code> | npm scripts to include.<br/>__*Default*__: {}
**srcdir**?⚠️ | <code>string</code> | Typescript sources directory.<br/>__*Default*__: "src"
**stability**?⚠️ | <code>string</code> | __*Optional*__
**start**?⚠️ | <code>boolean</code> | Defines a `yarn start` interactive experience.<br/>__*Default*__: true
**startOptions**?⚠️ | <code>[StartOptions](#projen-startoptions)</code> | Options for `yarn start`.<br/>__*Default*__: default options
**testdir**?⚠️ | <code>string</code> | Tests directory.<br/>__*Default*__: "test"
**workflowBootstrapSteps**?⚠️ | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/>__*Default*__: "yarn install --frozen-lockfile && yarn projen"
**workflowContainerImage**?⚠️ | <code>string</code> | Container image to use for GitHub workflows.<br/>__*Default*__: default image
**workflowNodeVersion**?⚠️ | <code>string</code> | The node version to use in GitHub workflows.<br/>__*Default*__: same as `minNodeVersion`



## struct ConstructLibraryCdk8sOptions 🔹 <a id="projen-constructlibrarycdk8soptions"></a>






Name | Type | Description 
-----|------|-------------
**authorAddress**🔹 | <code>string</code> | Email or URL of the library author.
**authorName**🔹 | <code>string</code> | The name of the library author.
**cdk8sVersion**🔹 | <code>string</code> | Minimum target version this library is tested against.
**name**🔹 | <code>string</code> | The name of the library.
**repository**🔹 | <code>string</code> | Git repository URL.
**allowLibraryDependencies**?🔹 | <code>boolean</code> | Allow the project to include `peerDependencies` and `bundledDependencies`.<br/>__*Default*__: true
**antitamper**?🔹 | <code>boolean</code> | Checks that after build there are no modified files on git.<br/>__*Default*__: true
**authorEmail**?⚠️ | <code>string</code> | __*Optional*__
**authorOrganization**?🔹 | <code>boolean</code> | __*Optional*__
**authorUrl**?⚠️ | <code>string</code> | __*Optional*__
**autoDetectBin**?🔹 | <code>boolean</code> | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.<br/>__*Default*__: true
**bin**?🔹 | <code>Map<string, string></code> | Binary programs vended with your module.<br/>__*Optional*__
**buildWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/>__*Default*__: true
**bundledDependencies**?🔹 | <code>Array<string></code> | __*Optional*__
**bundledDeps**?🔹 | <code>Array<string></code> | __*Optional*__
**catalog**?🔹 | <code>[Catalog](#projen-catalog)</code> | Libraries will be picked up by the construct catalog when they are published to npm as jsii modules and will be published under:.<br/>__*Default*__: new version will be announced
**compat**?🔹 | <code>boolean</code> | Automatically run API compatibility test against the latest version published to npm after compilation.<br/>__*Default*__: false
**compatIgnore**?🔹 | <code>string</code> | Name of the ignore file for API compatibility tests.<br/>__*Default*__: .compatignore
**copyrightOwner**?🔹 | <code>string</code> | License copyright owner.<br/>__*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?🔹 | <code>string</code> | The copyright years to put in the LICENSE file.<br/>__*Default*__: current year
**defaultReleaseBranch**?🔹 | <code>string</code> | The name of the main release branch.<br/>__*Default*__: 'master'
**dependabot**?🔹 | <code>boolean</code> | Include dependabot configuration.<br/>__*Default*__: true;
**dependabotOptions**?🔹 | <code>[DependabotOptions](#projen-dependabotoptions)</code> | Options for dependabot.<br/>__*Default*__: default options
**dependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**deps**?🔹 | <code>Array<string></code> | __*Optional*__
**description**?🔹 | <code>string</code> | Library description.<br/>__*Optional*__
**devDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**devDeps**?🔹 | <code>Array<string></code> | __*Optional*__
**docgen**?🔹 | <code>boolean</code> | Automatically generate API.md from jsii.<br/>__*Default*__: true
**dotnet**?🔹 | <code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code> | __*Optional*__
**entrypoint**?🔹 | <code>string</code> | Module entrypoint (`main` in `package.json`).<br/>__*Default*__: lib/index.js
**eslint**?🔹 | <code>boolean</code> | Install eslint.<br/>__*Default*__: true
**java**?🔹 | <code>[JsiiJavaTarget](#projen-jsiijavatarget)</code> | __*Optional*__
**jest**?🔹 | <code>boolean</code> | Use jest for unit tests.<br/>__*Default*__: true
**jestOptions**?🔹 | <code>[JestOptions](#projen-jestoptions)</code> | Jest options.<br/>__*Default*__: defaults
**jsiiVersion**?🔹 | <code>[Semver](#projen-semver)</code> | __*Optional*__
**keywords**?🔹 | <code>Array<string></code> | Keywords to include in `package.json`.<br/>__*Optional*__
**libdir**?🔹 | <code>string</code> | Compiler artifacts output directory.<br/>__*Default*__: "lib"
**license**?🔹 | <code>string</code> | __*Optional*__
**maxNodeVersion**?🔹 | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/>__*Default*__: no max
**mergify**?🔹 | <code>boolean</code> | Adds mergify configuration.<br/>__*Default*__: true
**mergifyAutoMergeLabel**?🔹 | <code>string</code> | Automatically merge PRs that build successfully and have this label.<br/>__*Default*__: "auto-merge"
**mergifyOptions**?🔹 | <code>[MergifyOptions](#projen-mergifyoptions)</code> | Options for mergify.<br/>__*Default*__: default options
**minNodeVersion**?🔹 | <code>string</code> | Node.js version to require via package.json `engines` (inclusive).<br/>__*Default*__: no "engines" specified
**npmDistTag**?🔹 | <code>string</code> | The dist-tag to use when releasing to npm.<br/>__*Default*__: "latest"
**npmRegistry**?🔹 | <code>string</code> | The registry url to use when releasing packages.<br/>__*Default*__: "registry.npmjs.org"
**npmignore**?🔹 | <code>Array<string></code> | Additional entries to .npmignore.<br/>__*Optional*__
**npmignoreEnabled**?🔹 | <code>boolean</code> | Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs.<br/>__*Default*__: true
**packageManager**?🔹 | <code>[NodePackageManager](#projen-nodepackagemanager)</code> | The Node Package Manager used to execute scripts.<br/>__*Default*__: packageManager.YARN
**peerDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**peerDependencyOptions**?🔹 | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | __*Optional*__
**peerDeps**?🔹 | <code>Array<string></code> | __*Optional*__
**projenDevDependency**?🔹 | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/>__*Default*__: true
**projenUpgradeAutoMerge**?🔹 | <code>boolean</code> | Automatically merge projen upgrade PRs when build passes.<br/>__*Default*__: "true" if mergify auto-merge is enabled (default)
**projenUpgradeSchedule**?🔹 | <code>Array<string></code> | Customize the projenUpgrade schedule in cron expression.<br/>__*Default*__: [ '0 6 * * *' ]
**projenUpgradeSecret**?🔹 | <code>string</code> | Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`).<br/>__*Default*__: no automatic projen upgrade pull requests
**projenVersion**?🔹 | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/>__*Default*__: latest version
**python**?🔹 | <code>[JsiiPythonTarget](#projen-jsiipythontarget)</code> | __*Optional*__
**releaseBranches**?🔹 | <code>Array<string></code> | Branches which trigger a release.<br/>__*Default*__: [ "master" ] - based on the value of defaultReleaseBranch.
**releaseEveryCommit**?🔹 | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`.<br/>__*Default*__: true
**releaseSchedule**?🔹 | <code>string</code> | CRON schedule to trigger new releases.<br/>__*Default*__: no scheduled releases
**releaseToNpm**?🔹 | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/>__*Default*__: false
**releaseWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for releasing from "master" when new versions are bumped.<br/>__*Default*__: true
**rootdir**?🔹 | <code>string</code> | __*Default*__: "."
**scripts**?🔹 | <code>Map<string, string></code> | npm scripts to include.<br/>__*Default*__: {}
**srcdir**?🔹 | <code>string</code> | Typescript sources directory.<br/>__*Default*__: "src"
**stability**?🔹 | <code>string</code> | __*Optional*__
**start**?🔹 | <code>boolean</code> | Defines a `yarn start` interactive experience.<br/>__*Default*__: true
**startOptions**?🔹 | <code>[StartOptions](#projen-startoptions)</code> | Options for `yarn start`.<br/>__*Default*__: default options
**testdir**?🔹 | <code>string</code> | Tests directory.<br/>__*Default*__: "test"
**workflowBootstrapSteps**?🔹 | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/>__*Default*__: "yarn install --frozen-lockfile && yarn projen"
**workflowContainerImage**?🔹 | <code>string</code> | Container image to use for GitHub workflows.<br/>__*Default*__: default image
**workflowNodeVersion**?🔹 | <code>string</code> | The node version to use in GitHub workflows.<br/>__*Default*__: same as `minNodeVersion`



## struct ConstructLibraryOptions 🔹 <a id="projen-constructlibraryoptions"></a>






Name | Type | Description 
-----|------|-------------
**authorAddress**🔹 | <code>string</code> | Email or URL of the library author.
**authorName**🔹 | <code>string</code> | The name of the library author.
**name**🔹 | <code>string</code> | The name of the library.
**repository**🔹 | <code>string</code> | Git repository URL.
**allowLibraryDependencies**?🔹 | <code>boolean</code> | Allow the project to include `peerDependencies` and `bundledDependencies`.<br/>__*Default*__: true
**antitamper**?🔹 | <code>boolean</code> | Checks that after build there are no modified files on git.<br/>__*Default*__: true
**authorEmail**?⚠️ | <code>string</code> | __*Optional*__
**authorOrganization**?🔹 | <code>boolean</code> | __*Optional*__
**authorUrl**?⚠️ | <code>string</code> | __*Optional*__
**autoDetectBin**?🔹 | <code>boolean</code> | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.<br/>__*Default*__: true
**bin**?🔹 | <code>Map<string, string></code> | Binary programs vended with your module.<br/>__*Optional*__
**buildWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/>__*Default*__: true
**bundledDependencies**?🔹 | <code>Array<string></code> | __*Optional*__
**bundledDeps**?🔹 | <code>Array<string></code> | __*Optional*__
**catalog**?🔹 | <code>[Catalog](#projen-catalog)</code> | Libraries will be picked up by the construct catalog when they are published to npm as jsii modules and will be published under:.<br/>__*Default*__: new version will be announced
**compat**?🔹 | <code>boolean</code> | Automatically run API compatibility test against the latest version published to npm after compilation.<br/>__*Default*__: false
**compatIgnore**?🔹 | <code>string</code> | Name of the ignore file for API compatibility tests.<br/>__*Default*__: .compatignore
**copyrightOwner**?🔹 | <code>string</code> | License copyright owner.<br/>__*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?🔹 | <code>string</code> | The copyright years to put in the LICENSE file.<br/>__*Default*__: current year
**defaultReleaseBranch**?🔹 | <code>string</code> | The name of the main release branch.<br/>__*Default*__: 'master'
**dependabot**?🔹 | <code>boolean</code> | Include dependabot configuration.<br/>__*Default*__: true;
**dependabotOptions**?🔹 | <code>[DependabotOptions](#projen-dependabotoptions)</code> | Options for dependabot.<br/>__*Default*__: default options
**dependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**deps**?🔹 | <code>Array<string></code> | __*Optional*__
**description**?🔹 | <code>string</code> | Library description.<br/>__*Optional*__
**devDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**devDeps**?🔹 | <code>Array<string></code> | __*Optional*__
**docgen**?🔹 | <code>boolean</code> | Automatically generate API.md from jsii.<br/>__*Default*__: true
**dotnet**?🔹 | <code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code> | __*Optional*__
**entrypoint**?🔹 | <code>string</code> | Module entrypoint (`main` in `package.json`).<br/>__*Default*__: lib/index.js
**eslint**?🔹 | <code>boolean</code> | Install eslint.<br/>__*Default*__: true
**java**?🔹 | <code>[JsiiJavaTarget](#projen-jsiijavatarget)</code> | __*Optional*__
**jest**?🔹 | <code>boolean</code> | Use jest for unit tests.<br/>__*Default*__: true
**jestOptions**?🔹 | <code>[JestOptions](#projen-jestoptions)</code> | Jest options.<br/>__*Default*__: defaults
**jsiiVersion**?🔹 | <code>[Semver](#projen-semver)</code> | __*Optional*__
**keywords**?🔹 | <code>Array<string></code> | Keywords to include in `package.json`.<br/>__*Optional*__
**libdir**?🔹 | <code>string</code> | Compiler artifacts output directory.<br/>__*Default*__: "lib"
**license**?🔹 | <code>string</code> | __*Optional*__
**maxNodeVersion**?🔹 | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/>__*Default*__: no max
**mergify**?🔹 | <code>boolean</code> | Adds mergify configuration.<br/>__*Default*__: true
**mergifyAutoMergeLabel**?🔹 | <code>string</code> | Automatically merge PRs that build successfully and have this label.<br/>__*Default*__: "auto-merge"
**mergifyOptions**?🔹 | <code>[MergifyOptions](#projen-mergifyoptions)</code> | Options for mergify.<br/>__*Default*__: default options
**minNodeVersion**?🔹 | <code>string</code> | Node.js version to require via package.json `engines` (inclusive).<br/>__*Default*__: no "engines" specified
**npmDistTag**?🔹 | <code>string</code> | The dist-tag to use when releasing to npm.<br/>__*Default*__: "latest"
**npmRegistry**?🔹 | <code>string</code> | The registry url to use when releasing packages.<br/>__*Default*__: "registry.npmjs.org"
**npmignore**?🔹 | <code>Array<string></code> | Additional entries to .npmignore.<br/>__*Optional*__
**npmignoreEnabled**?🔹 | <code>boolean</code> | Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs.<br/>__*Default*__: true
**packageManager**?🔹 | <code>[NodePackageManager](#projen-nodepackagemanager)</code> | The Node Package Manager used to execute scripts.<br/>__*Default*__: packageManager.YARN
**peerDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**peerDependencyOptions**?🔹 | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | __*Optional*__
**peerDeps**?🔹 | <code>Array<string></code> | __*Optional*__
**projenDevDependency**?🔹 | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/>__*Default*__: true
**projenUpgradeAutoMerge**?🔹 | <code>boolean</code> | Automatically merge projen upgrade PRs when build passes.<br/>__*Default*__: "true" if mergify auto-merge is enabled (default)
**projenUpgradeSchedule**?🔹 | <code>Array<string></code> | Customize the projenUpgrade schedule in cron expression.<br/>__*Default*__: [ '0 6 * * *' ]
**projenUpgradeSecret**?🔹 | <code>string</code> | Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`).<br/>__*Default*__: no automatic projen upgrade pull requests
**projenVersion**?🔹 | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/>__*Default*__: latest version
**python**?🔹 | <code>[JsiiPythonTarget](#projen-jsiipythontarget)</code> | __*Optional*__
**releaseBranches**?🔹 | <code>Array<string></code> | Branches which trigger a release.<br/>__*Default*__: [ "master" ] - based on the value of defaultReleaseBranch.
**releaseEveryCommit**?🔹 | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`.<br/>__*Default*__: true
**releaseSchedule**?🔹 | <code>string</code> | CRON schedule to trigger new releases.<br/>__*Default*__: no scheduled releases
**releaseToNpm**?🔹 | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/>__*Default*__: false
**releaseWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for releasing from "master" when new versions are bumped.<br/>__*Default*__: true
**rootdir**?🔹 | <code>string</code> | __*Default*__: "."
**scripts**?🔹 | <code>Map<string, string></code> | npm scripts to include.<br/>__*Default*__: {}
**srcdir**?🔹 | <code>string</code> | Typescript sources directory.<br/>__*Default*__: "src"
**stability**?🔹 | <code>string</code> | __*Optional*__
**start**?🔹 | <code>boolean</code> | Defines a `yarn start` interactive experience.<br/>__*Default*__: true
**startOptions**?🔹 | <code>[StartOptions](#projen-startoptions)</code> | Options for `yarn start`.<br/>__*Default*__: default options
**testdir**?🔹 | <code>string</code> | Tests directory.<br/>__*Default*__: "test"
**workflowBootstrapSteps**?🔹 | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/>__*Default*__: "yarn install --frozen-lockfile && yarn projen"
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



## struct EslintOptions 🔹 <a id="projen-eslintoptions"></a>






Name | Type | Description 
-----|------|-------------
**dirs**🔹 | <code>Array<string></code> | Directories with source files to lint (e.g. [ "src", "test" ]).
**tsconfigPath**🔹 | <code>string</code> | <span></span>



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
**authorAddress**🔹 | <code>string</code> | Email or URL of the library author.
**authorName**🔹 | <code>string</code> | The name of the library author.
**name**🔹 | <code>string</code> | The name of the library.
**repository**🔹 | <code>string</code> | Git repository URL.
**allowLibraryDependencies**?🔹 | <code>boolean</code> | Allow the project to include `peerDependencies` and `bundledDependencies`.<br/>__*Default*__: true
**antitamper**?🔹 | <code>boolean</code> | Checks that after build there are no modified files on git.<br/>__*Default*__: true
**authorEmail**?⚠️ | <code>string</code> | __*Optional*__
**authorOrganization**?🔹 | <code>boolean</code> | __*Optional*__
**authorUrl**?⚠️ | <code>string</code> | __*Optional*__
**autoDetectBin**?🔹 | <code>boolean</code> | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.<br/>__*Default*__: true
**bin**?🔹 | <code>Map<string, string></code> | Binary programs vended with your module.<br/>__*Optional*__
**buildWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/>__*Default*__: true
**bundledDependencies**?🔹 | <code>Array<string></code> | __*Optional*__
**bundledDeps**?🔹 | <code>Array<string></code> | __*Optional*__
**compat**?🔹 | <code>boolean</code> | Automatically run API compatibility test against the latest version published to npm after compilation.<br/>__*Default*__: false
**compatIgnore**?🔹 | <code>string</code> | Name of the ignore file for API compatibility tests.<br/>__*Default*__: .compatignore
**copyrightOwner**?🔹 | <code>string</code> | License copyright owner.<br/>__*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?🔹 | <code>string</code> | The copyright years to put in the LICENSE file.<br/>__*Default*__: current year
**defaultReleaseBranch**?🔹 | <code>string</code> | The name of the main release branch.<br/>__*Default*__: 'master'
**dependabot**?🔹 | <code>boolean</code> | Include dependabot configuration.<br/>__*Default*__: true;
**dependabotOptions**?🔹 | <code>[DependabotOptions](#projen-dependabotoptions)</code> | Options for dependabot.<br/>__*Default*__: default options
**dependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**deps**?🔹 | <code>Array<string></code> | __*Optional*__
**description**?🔹 | <code>string</code> | Library description.<br/>__*Optional*__
**devDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**devDeps**?🔹 | <code>Array<string></code> | __*Optional*__
**docgen**?🔹 | <code>boolean</code> | Automatically generate API.md from jsii.<br/>__*Default*__: true
**dotnet**?🔹 | <code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code> | __*Optional*__
**entrypoint**?🔹 | <code>string</code> | Module entrypoint (`main` in `package.json`).<br/>__*Default*__: lib/index.js
**eslint**?🔹 | <code>boolean</code> | Install eslint.<br/>__*Default*__: true
**java**?🔹 | <code>[JsiiJavaTarget](#projen-jsiijavatarget)</code> | __*Optional*__
**jest**?🔹 | <code>boolean</code> | Use jest for unit tests.<br/>__*Default*__: true
**jestOptions**?🔹 | <code>[JestOptions](#projen-jestoptions)</code> | Jest options.<br/>__*Default*__: defaults
**jsiiVersion**?🔹 | <code>[Semver](#projen-semver)</code> | __*Optional*__
**keywords**?🔹 | <code>Array<string></code> | Keywords to include in `package.json`.<br/>__*Optional*__
**libdir**?🔹 | <code>string</code> | Compiler artifacts output directory.<br/>__*Default*__: "lib"
**license**?🔹 | <code>string</code> | __*Optional*__
**maxNodeVersion**?🔹 | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/>__*Default*__: no max
**mergify**?🔹 | <code>boolean</code> | Adds mergify configuration.<br/>__*Default*__: true
**mergifyAutoMergeLabel**?🔹 | <code>string</code> | Automatically merge PRs that build successfully and have this label.<br/>__*Default*__: "auto-merge"
**mergifyOptions**?🔹 | <code>[MergifyOptions](#projen-mergifyoptions)</code> | Options for mergify.<br/>__*Default*__: default options
**minNodeVersion**?🔹 | <code>string</code> | Node.js version to require via package.json `engines` (inclusive).<br/>__*Default*__: no "engines" specified
**npmDistTag**?🔹 | <code>string</code> | The dist-tag to use when releasing to npm.<br/>__*Default*__: "latest"
**npmRegistry**?🔹 | <code>string</code> | The registry url to use when releasing packages.<br/>__*Default*__: "registry.npmjs.org"
**npmignore**?🔹 | <code>Array<string></code> | Additional entries to .npmignore.<br/>__*Optional*__
**npmignoreEnabled**?🔹 | <code>boolean</code> | Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs.<br/>__*Default*__: true
**packageManager**?🔹 | <code>[NodePackageManager](#projen-nodepackagemanager)</code> | The Node Package Manager used to execute scripts.<br/>__*Default*__: packageManager.YARN
**peerDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**peerDependencyOptions**?🔹 | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | __*Optional*__
**peerDeps**?🔹 | <code>Array<string></code> | __*Optional*__
**projenDevDependency**?🔹 | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/>__*Default*__: true
**projenUpgradeAutoMerge**?🔹 | <code>boolean</code> | Automatically merge projen upgrade PRs when build passes.<br/>__*Default*__: "true" if mergify auto-merge is enabled (default)
**projenUpgradeSchedule**?🔹 | <code>Array<string></code> | Customize the projenUpgrade schedule in cron expression.<br/>__*Default*__: [ '0 6 * * *' ]
**projenUpgradeSecret**?🔹 | <code>string</code> | Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`).<br/>__*Default*__: no automatic projen upgrade pull requests
**projenVersion**?🔹 | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/>__*Default*__: latest version
**python**?🔹 | <code>[JsiiPythonTarget](#projen-jsiipythontarget)</code> | __*Optional*__
**releaseBranches**?🔹 | <code>Array<string></code> | Branches which trigger a release.<br/>__*Default*__: [ "master" ] - based on the value of defaultReleaseBranch.
**releaseEveryCommit**?🔹 | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`.<br/>__*Default*__: true
**releaseSchedule**?🔹 | <code>string</code> | CRON schedule to trigger new releases.<br/>__*Default*__: no scheduled releases
**releaseToNpm**?🔹 | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/>__*Default*__: false
**releaseWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for releasing from "master" when new versions are bumped.<br/>__*Default*__: true
**rootdir**?🔹 | <code>string</code> | __*Default*__: "."
**scripts**?🔹 | <code>Map<string, string></code> | npm scripts to include.<br/>__*Default*__: {}
**srcdir**?🔹 | <code>string</code> | Typescript sources directory.<br/>__*Default*__: "src"
**stability**?🔹 | <code>string</code> | __*Optional*__
**start**?🔹 | <code>boolean</code> | Defines a `yarn start` interactive experience.<br/>__*Default*__: true
**startOptions**?🔹 | <code>[StartOptions](#projen-startoptions)</code> | Options for `yarn start`.<br/>__*Default*__: default options
**testdir**?🔹 | <code>string</code> | Tests directory.<br/>__*Default*__: "test"
**workflowBootstrapSteps**?🔹 | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/>__*Default*__: "yarn install --frozen-lockfile && yarn projen"
**workflowContainerImage**?🔹 | <code>string</code> | Container image to use for GitHub workflows.<br/>__*Default*__: default image
**workflowNodeVersion**?🔹 | <code>string</code> | The node version to use in GitHub workflows.<br/>__*Default*__: same as `minNodeVersion`



## struct JsiiPythonTarget 🔹 <a id="projen-jsiipythontarget"></a>






Name | Type | Description 
-----|------|-------------
**distName**🔹 | <code>string</code> | <span></span>
**module**🔹 | <code>string</code> | <span></span>
**twineRegistryUrl**?🔹 | <code>string</code> | The registry url to use when releasing packages.<br/>__*Default*__: twine default



## struct JsonFileOptions 🔹 <a id="projen-jsonfileoptions"></a>






Name | Type | Description 
-----|------|-------------
**obj**🔹 | <code>any</code> | <span></span>
**committed**?🔹 | <code>boolean</code> | Indicates whether this file should be committed to git or ignored.<br/>__*Default*__: true
**editGitignore**?🔹 | <code>boolean</code> | Update the project's .gitignore file.<br/>__*Default*__: true
**readonly**?🔹 | <code>boolean</code> | Whether the generated file should be readonly.<br/>__*Default*__: true



## struct LicenseOptions 🔹 <a id="projen-licenseoptions"></a>






Name | Type | Description 
-----|------|-------------
**copyrightOwner**?🔹 | <code>string</code> | Copyright owner.<br/>__*Default*__: ""
**copyrightPeriod**?🔹 | <code>string</code> | Period of license (e.g. "1998-2023").<br/>__*Default*__: current year (e.g. "2020")



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



## struct NextJsProjectOptions 🔹 <a id="projen-nextjsprojectoptions"></a>






Name | Type | Description 
-----|------|-------------
**name**🔹 | <code>string</code> | This is the name of your package.
**allowLibraryDependencies**?🔹 | <code>boolean</code> | Allow the project to include `peerDependencies` and `bundledDependencies`.<br/>__*Default*__: true
**antitamper**?🔹 | <code>boolean</code> | Checks that after build there are no modified files on git.<br/>__*Default*__: true
**assetsDir**?🔹 | <code>string</code> | Assets directory.<br/>__*Default*__: 'public'
**authorEmail**?🔹 | <code>string</code> | Author's e-mail.<br/>__*Optional*__
**authorName**?🔹 | <code>string</code> | Author's name.<br/>__*Optional*__
**authorOrganization**?🔹 | <code>boolean</code> | Author's Organization.<br/>__*Optional*__
**authorUrl**?🔹 | <code>string</code> | Author's URL / Website.<br/>__*Optional*__
**autoDetectBin**?🔹 | <code>boolean</code> | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.<br/>__*Default*__: true
**bin**?🔹 | <code>Map<string, string></code> | Binary programs vended with your module.<br/>__*Optional*__
**buildWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/>__*Default*__: true
**bundledDependencies**?🔹 | <code>Array<string></code> | __*Optional*__
**bundledDeps**?🔹 | <code>Array<string></code> | __*Optional*__
**copyrightOwner**?🔹 | <code>string</code> | License copyright owner.<br/>__*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?🔹 | <code>string</code> | The copyright years to put in the LICENSE file.<br/>__*Default*__: current year
**defaultReleaseBranch**?🔹 | <code>string</code> | The name of the main release branch.<br/>__*Default*__: 'master'
**dependabot**?🔹 | <code>boolean</code> | Include dependabot configuration.<br/>__*Default*__: true;
**dependabotOptions**?🔹 | <code>[DependabotOptions](#projen-dependabotoptions)</code> | Options for dependabot.<br/>__*Default*__: default options
**dependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**deps**?🔹 | <code>Array<string></code> | __*Optional*__
**description**?🔹 | <code>string</code> | The description is just a string that helps people understand the purpose of the package.<br/>__*Optional*__
**devDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**devDeps**?🔹 | <code>Array<string></code> | __*Optional*__
**entrypoint**?🔹 | <code>string</code> | Module entrypoint (`main` in `package.json`).<br/>__*Default*__: lib/index.js
**gitignore**?🔹 | <code>Array<string></code> | Additional entries to .gitignore.<br/>__*Optional*__
**homepage**?🔹 | <code>string</code> | Package's Homepage / Website.<br/>__*Optional*__
**keywords**?🔹 | <code>Array<string></code> | Keywords to include in `package.json`.<br/>__*Optional*__
**libdir**?🔹 | <code>string</code> | Compiler artifacts output directory.<br/>__*Default*__: "lib"
**license**?🔹 | <code>string</code> | License's SPDX identifier.<br/>__*Optional*__
**maxNodeVersion**?🔹 | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/>__*Default*__: no max
**mergify**?🔹 | <code>boolean</code> | Adds mergify configuration.<br/>__*Default*__: true
**mergifyAutoMergeLabel**?🔹 | <code>string</code> | Automatically merge PRs that build successfully and have this label.<br/>__*Default*__: "auto-merge"
**mergifyOptions**?🔹 | <code>[MergifyOptions](#projen-mergifyoptions)</code> | Options for mergify.<br/>__*Default*__: default options
**minNodeVersion**?🔹 | <code>string</code> | Node.js version to require via package.json `engines` (inclusive).<br/>__*Default*__: no "engines" specified
**npmDistTag**?🔹 | <code>string</code> | The dist-tag to use when releasing to npm.<br/>__*Default*__: "latest"
**npmIgnore**?🔹 | <code>boolean</code> | Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs.<br/>__*Default*__: true
**npmRegistry**?🔹 | <code>string</code> | The registry url to use when releasing packages.<br/>__*Default*__: "registry.npmjs.org"
**npmignore**?🔹 | <code>Array<string></code> | Additional entries to .npmignore.<br/>__*Optional*__
**packageManager**?🔹 | <code>[NodePackageManager](#projen-nodepackagemanager)</code> | The Node Package Manager used to execute scripts.<br/>__*Default*__: packageManager.YARN
**pagesDir**?🔹 | <code>string</code> | Pages directory.<br/>__*Default*__: 'pages'
**peerDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**peerDependencyOptions**?🔹 | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | __*Optional*__
**peerDeps**?🔹 | <code>Array<string></code> | __*Optional*__
**projenDevDependency**?🔹 | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/>__*Default*__: true
**projenUpgradeAutoMerge**?🔹 | <code>boolean</code> | Automatically merge projen upgrade PRs when build passes.<br/>__*Default*__: "true" if mergify auto-merge is enabled (default)
**projenUpgradeSchedule**?🔹 | <code>Array<string></code> | Customize the projenUpgrade schedule in cron expression.<br/>__*Default*__: [ '0 6 * * *' ]
**projenUpgradeSecret**?🔹 | <code>string</code> | Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`).<br/>__*Default*__: no automatic projen upgrade pull requests
**projenVersion**?🔹 | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/>__*Default*__: latest version
**releaseBranches**?🔹 | <code>Array<string></code> | Branches which trigger a release.<br/>__*Default*__: [ "master" ] - based on the value of defaultReleaseBranch.
**releaseEveryCommit**?🔹 | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`.<br/>__*Default*__: true
**releaseSchedule**?🔹 | <code>string</code> | CRON schedule to trigger new releases.<br/>__*Default*__: no scheduled releases
**releaseToNpm**?🔹 | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/>__*Default*__: false
**releaseWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for releasing from "master" when new versions are bumped.<br/>__*Default*__: true
**repository**?🔹 | <code>string</code> | The repository is the location where the actual code for your package lives.<br/>__*Optional*__
**repositoryDirectory**?🔹 | <code>string</code> | If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives.<br/>__*Optional*__
**sampleCode**?🔹 | <code>boolean</code> | Generate one-time sample in `pages/` and `public/` if there are no files there.<br/>__*Default*__: true
**scripts**?🔹 | <code>Map<string, string></code> | npm scripts to include.<br/>__*Default*__: {}
**srcdir**?🔹 | <code>string</code> | Typescript sources directory.<br/>__*Default*__: "src"
**stability**?🔹 | <code>string</code> | Package's Stability.<br/>__*Optional*__
**start**?🔹 | <code>boolean</code> | Defines a `yarn start` interactive experience.<br/>__*Default*__: true
**startOptions**?🔹 | <code>[StartOptions](#projen-startoptions)</code> | Options for `yarn start`.<br/>__*Default*__: default options
**testdir**?🔹 | <code>string</code> | Tests directory.<br/>__*Default*__: "test"
**workflowBootstrapSteps**?🔹 | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/>__*Default*__: "yarn install --frozen-lockfile && yarn projen"
**workflowContainerImage**?🔹 | <code>string</code> | Container image to use for GitHub workflows.<br/>__*Default*__: default image
**workflowNodeVersion**?🔹 | <code>string</code> | The node version to use in GitHub workflows.<br/>__*Default*__: same as `minNodeVersion`



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
**allowLibraryDependencies**?🔹 | <code>boolean</code> | Allow the project to include `peerDependencies` and `bundledDependencies`.<br/>__*Default*__: true
**antitamper**?🔹 | <code>boolean</code> | Checks that after build there are no modified files on git.<br/>__*Default*__: true
**autoDetectBin**?🔹 | <code>boolean</code> | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.<br/>__*Default*__: true
**bin**?🔹 | <code>Map<string, string></code> | Binary programs vended with your module.<br/>__*Optional*__
**buildWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/>__*Default*__: true
**bundledDependencies**?🔹 | <code>Array<string></code> | __*Optional*__
**bundledDeps**?🔹 | <code>Array<string></code> | __*Optional*__
**copyrightOwner**?🔹 | <code>string</code> | License copyright owner.<br/>__*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?🔹 | <code>string</code> | The copyright years to put in the LICENSE file.<br/>__*Default*__: current year
**defaultReleaseBranch**?🔹 | <code>string</code> | The name of the main release branch.<br/>__*Default*__: 'master'
**dependabot**?🔹 | <code>boolean</code> | Include dependabot configuration.<br/>__*Default*__: true;
**dependabotOptions**?🔹 | <code>[DependabotOptions](#projen-dependabotoptions)</code> | Options for dependabot.<br/>__*Default*__: default options
**dependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**deps**?🔹 | <code>Array<string></code> | __*Optional*__
**devDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**devDeps**?🔹 | <code>Array<string></code> | __*Optional*__
**entrypoint**?🔹 | <code>string</code> | Module entrypoint (`main` in `package.json`).<br/>__*Default*__: lib/index.js
**keywords**?🔹 | <code>Array<string></code> | Keywords to include in `package.json`.<br/>__*Optional*__
**libdir**?🔹 | <code>string</code> | Compiler artifacts output directory.<br/>__*Default*__: "lib"
**maxNodeVersion**?🔹 | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/>__*Default*__: no max
**mergify**?🔹 | <code>boolean</code> | Adds mergify configuration.<br/>__*Default*__: true
**mergifyAutoMergeLabel**?🔹 | <code>string</code> | Automatically merge PRs that build successfully and have this label.<br/>__*Default*__: "auto-merge"
**mergifyOptions**?🔹 | <code>[MergifyOptions](#projen-mergifyoptions)</code> | Options for mergify.<br/>__*Default*__: default options
**minNodeVersion**?🔹 | <code>string</code> | Node.js version to require via package.json `engines` (inclusive).<br/>__*Default*__: no "engines" specified
**npmDistTag**?🔹 | <code>string</code> | The dist-tag to use when releasing to npm.<br/>__*Default*__: "latest"
**npmRegistry**?🔹 | <code>string</code> | The registry url to use when releasing packages.<br/>__*Default*__: "registry.npmjs.org"
**npmignore**?🔹 | <code>Array<string></code> | Additional entries to .npmignore.<br/>__*Optional*__
**npmignoreEnabled**?🔹 | <code>boolean</code> | Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs.<br/>__*Default*__: true
**packageManager**?🔹 | <code>[NodePackageManager](#projen-nodepackagemanager)</code> | The Node Package Manager used to execute scripts.<br/>__*Default*__: packageManager.YARN
**peerDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**peerDependencyOptions**?🔹 | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | __*Optional*__
**peerDeps**?🔹 | <code>Array<string></code> | __*Optional*__
**projenDevDependency**?🔹 | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/>__*Default*__: true
**projenUpgradeAutoMerge**?🔹 | <code>boolean</code> | Automatically merge projen upgrade PRs when build passes.<br/>__*Default*__: "true" if mergify auto-merge is enabled (default)
**projenUpgradeSchedule**?🔹 | <code>Array<string></code> | Customize the projenUpgrade schedule in cron expression.<br/>__*Default*__: [ '0 6 * * *' ]
**projenUpgradeSecret**?🔹 | <code>string</code> | Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`).<br/>__*Default*__: no automatic projen upgrade pull requests
**projenVersion**?🔹 | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/>__*Default*__: latest version
**releaseBranches**?🔹 | <code>Array<string></code> | Branches which trigger a release.<br/>__*Default*__: [ "master" ] - based on the value of defaultReleaseBranch.
**releaseEveryCommit**?🔹 | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`.<br/>__*Default*__: true
**releaseSchedule**?🔹 | <code>string</code> | CRON schedule to trigger new releases.<br/>__*Default*__: no scheduled releases
**releaseToNpm**?🔹 | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/>__*Default*__: false
**releaseWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for releasing from "master" when new versions are bumped.<br/>__*Default*__: true
**scripts**?🔹 | <code>Map<string, string></code> | npm scripts to include.<br/>__*Default*__: {}
**srcdir**?🔹 | <code>string</code> | Typescript sources directory.<br/>__*Default*__: "src"
**start**?🔹 | <code>boolean</code> | Defines a `yarn start` interactive experience.<br/>__*Default*__: true
**startOptions**?🔹 | <code>[StartOptions](#projen-startoptions)</code> | Options for `yarn start`.<br/>__*Default*__: default options
**testdir**?🔹 | <code>string</code> | Tests directory.<br/>__*Default*__: "test"
**workflowBootstrapSteps**?🔹 | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/>__*Default*__: "yarn install --frozen-lockfile && yarn projen"
**workflowContainerImage**?🔹 | <code>string</code> | Container image to use for GitHub workflows.<br/>__*Default*__: default image
**workflowNodeVersion**?🔹 | <code>string</code> | The node version to use in GitHub workflows.<br/>__*Default*__: same as `minNodeVersion`



## struct NodeProjectOptions 🔹 <a id="projen-nodeprojectoptions"></a>






Name | Type | Description 
-----|------|-------------
**name**🔹 | <code>string</code> | This is the name of your package.
**allowLibraryDependencies**?🔹 | <code>boolean</code> | Allow the project to include `peerDependencies` and `bundledDependencies`.<br/>__*Default*__: true
**antitamper**?🔹 | <code>boolean</code> | Checks that after build there are no modified files on git.<br/>__*Default*__: true
**authorEmail**?🔹 | <code>string</code> | Author's e-mail.<br/>__*Optional*__
**authorName**?🔹 | <code>string</code> | Author's name.<br/>__*Optional*__
**authorOrganization**?🔹 | <code>boolean</code> | Author's Organization.<br/>__*Optional*__
**authorUrl**?🔹 | <code>string</code> | Author's URL / Website.<br/>__*Optional*__
**autoDetectBin**?🔹 | <code>boolean</code> | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.<br/>__*Default*__: true
**bin**?🔹 | <code>Map<string, string></code> | Binary programs vended with your module.<br/>__*Optional*__
**buildWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/>__*Default*__: true
**bundledDependencies**?🔹 | <code>Array<string></code> | __*Optional*__
**bundledDeps**?🔹 | <code>Array<string></code> | __*Optional*__
**copyrightOwner**?🔹 | <code>string</code> | License copyright owner.<br/>__*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?🔹 | <code>string</code> | The copyright years to put in the LICENSE file.<br/>__*Default*__: current year
**defaultReleaseBranch**?🔹 | <code>string</code> | The name of the main release branch.<br/>__*Default*__: 'master'
**dependabot**?🔹 | <code>boolean</code> | Include dependabot configuration.<br/>__*Default*__: true;
**dependabotOptions**?🔹 | <code>[DependabotOptions](#projen-dependabotoptions)</code> | Options for dependabot.<br/>__*Default*__: default options
**dependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**deps**?🔹 | <code>Array<string></code> | __*Optional*__
**description**?🔹 | <code>string</code> | The description is just a string that helps people understand the purpose of the package.<br/>__*Optional*__
**devDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**devDeps**?🔹 | <code>Array<string></code> | __*Optional*__
**entrypoint**?🔹 | <code>string</code> | Module entrypoint (`main` in `package.json`).<br/>__*Default*__: lib/index.js
**gitignore**?🔹 | <code>Array<string></code> | Additional entries to .gitignore.<br/>__*Optional*__
**homepage**?🔹 | <code>string</code> | Package's Homepage / Website.<br/>__*Optional*__
**keywords**?🔹 | <code>Array<string></code> | Keywords to include in `package.json`.<br/>__*Optional*__
**libdir**?🔹 | <code>string</code> | Compiler artifacts output directory.<br/>__*Default*__: "lib"
**license**?🔹 | <code>string</code> | License's SPDX identifier.<br/>__*Optional*__
**maxNodeVersion**?🔹 | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/>__*Default*__: no max
**mergify**?🔹 | <code>boolean</code> | Adds mergify configuration.<br/>__*Default*__: true
**mergifyAutoMergeLabel**?🔹 | <code>string</code> | Automatically merge PRs that build successfully and have this label.<br/>__*Default*__: "auto-merge"
**mergifyOptions**?🔹 | <code>[MergifyOptions](#projen-mergifyoptions)</code> | Options for mergify.<br/>__*Default*__: default options
**minNodeVersion**?🔹 | <code>string</code> | Node.js version to require via package.json `engines` (inclusive).<br/>__*Default*__: no "engines" specified
**npmDistTag**?🔹 | <code>string</code> | The dist-tag to use when releasing to npm.<br/>__*Default*__: "latest"
**npmRegistry**?🔹 | <code>string</code> | The registry url to use when releasing packages.<br/>__*Default*__: "registry.npmjs.org"
**npmignore**?🔹 | <code>Array<string></code> | Additional entries to .npmignore.<br/>__*Optional*__
**npmignoreEnabled**?🔹 | <code>boolean</code> | Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs.<br/>__*Default*__: true
**packageManager**?🔹 | <code>[NodePackageManager](#projen-nodepackagemanager)</code> | The Node Package Manager used to execute scripts.<br/>__*Default*__: packageManager.YARN
**peerDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**peerDependencyOptions**?🔹 | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | __*Optional*__
**peerDeps**?🔹 | <code>Array<string></code> | __*Optional*__
**projenDevDependency**?🔹 | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/>__*Default*__: true
**projenUpgradeAutoMerge**?🔹 | <code>boolean</code> | Automatically merge projen upgrade PRs when build passes.<br/>__*Default*__: "true" if mergify auto-merge is enabled (default)
**projenUpgradeSchedule**?🔹 | <code>Array<string></code> | Customize the projenUpgrade schedule in cron expression.<br/>__*Default*__: [ '0 6 * * *' ]
**projenUpgradeSecret**?🔹 | <code>string</code> | Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`).<br/>__*Default*__: no automatic projen upgrade pull requests
**projenVersion**?🔹 | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/>__*Default*__: latest version
**releaseBranches**?🔹 | <code>Array<string></code> | Branches which trigger a release.<br/>__*Default*__: [ "master" ] - based on the value of defaultReleaseBranch.
**releaseEveryCommit**?🔹 | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`.<br/>__*Default*__: true
**releaseSchedule**?🔹 | <code>string</code> | CRON schedule to trigger new releases.<br/>__*Default*__: no scheduled releases
**releaseToNpm**?🔹 | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/>__*Default*__: false
**releaseWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for releasing from "master" when new versions are bumped.<br/>__*Default*__: true
**repository**?🔹 | <code>string</code> | The repository is the location where the actual code for your package lives.<br/>__*Optional*__
**repositoryDirectory**?🔹 | <code>string</code> | If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives.<br/>__*Optional*__
**scripts**?🔹 | <code>Map<string, string></code> | npm scripts to include.<br/>__*Default*__: {}
**srcdir**?🔹 | <code>string</code> | Typescript sources directory.<br/>__*Default*__: "src"
**stability**?🔹 | <code>string</code> | Package's Stability.<br/>__*Optional*__
**start**?🔹 | <code>boolean</code> | Defines a `yarn start` interactive experience.<br/>__*Default*__: true
**startOptions**?🔹 | <code>[StartOptions](#projen-startoptions)</code> | Options for `yarn start`.<br/>__*Default*__: default options
**testdir**?🔹 | <code>string</code> | Tests directory.<br/>__*Default*__: "test"
**workflowBootstrapSteps**?🔹 | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/>__*Default*__: "yarn install --frozen-lockfile && yarn projen"
**workflowContainerImage**?🔹 | <code>string</code> | Container image to use for GitHub workflows.<br/>__*Default*__: default image
**workflowNodeVersion**?🔹 | <code>string</code> | The node version to use in GitHub workflows.<br/>__*Default*__: same as `minNodeVersion`



## struct PeerDependencyOptions 🔹 <a id="projen-peerdependencyoptions"></a>






Name | Type | Description 
-----|------|-------------
**pinnedDevDependency**?🔹 | <code>boolean</code> | Automatically add a pinned dev dependency.<br/>__*Default*__: true



## struct StartEntryOptions 🔹 <a id="projen-startentryoptions"></a>






Name | Type | Description 
-----|------|-------------
**desc**🔹 | <code>string</code> | The description of the start entry.
**category**?🔹 | <code>[StartEntryCategory](#projen-startentrycategory)</code> | Priority-order (lower values will be shown first).<br/>__*Default*__: StartEntryCategory.MISC



## struct StartOptions 🔹 <a id="projen-startoptions"></a>





## struct TomlFileOptions 🔹 <a id="projen-tomlfileoptions"></a>






Name | Type | Description 
-----|------|-------------
**obj**🔹 | <code>any</code> | Object to render in the TOML file.
**committed**?🔹 | <code>boolean</code> | Indicates whether this file should be committed to git or ignored.<br/>__*Default*__: true
**editGitignore**?🔹 | <code>boolean</code> | Update the project's .gitignore file.<br/>__*Default*__: true
**readonly**?🔹 | <code>boolean</code> | Whether the generated file should be readonly.<br/>__*Default*__: true



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
**allowLibraryDependencies**?⚠️ | <code>boolean</code> | Allow the project to include `peerDependencies` and `bundledDependencies`.<br/>__*Default*__: true
**antitamper**?⚠️ | <code>boolean</code> | Checks that after build there are no modified files on git.<br/>__*Default*__: true
**authorEmail**?⚠️ | <code>string</code> | Author's e-mail.<br/>__*Optional*__
**authorName**?⚠️ | <code>string</code> | Author's name.<br/>__*Optional*__
**authorOrganization**?⚠️ | <code>boolean</code> | Author's Organization.<br/>__*Optional*__
**authorUrl**?⚠️ | <code>string</code> | Author's URL / Website.<br/>__*Optional*__
**autoDetectBin**?⚠️ | <code>boolean</code> | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.<br/>__*Default*__: true
**bin**?⚠️ | <code>Map<string, string></code> | Binary programs vended with your module.<br/>__*Optional*__
**buildWorkflow**?⚠️ | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/>__*Default*__: true
**bundledDependencies**?⚠️ | <code>Array<string></code> | __*Optional*__
**bundledDeps**?⚠️ | <code>Array<string></code> | __*Optional*__
**compileBeforeTest**?⚠️ | <code>boolean</code> | Compile the code before running tests.<br/>__*Default*__: the default behavior is to delete the lib/ directory and run jest typescript tests and only if all tests pass, run the compiler.
**copyrightOwner**?⚠️ | <code>string</code> | License copyright owner.<br/>__*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?⚠️ | <code>string</code> | The copyright years to put in the LICENSE file.<br/>__*Default*__: current year
**defaultReleaseBranch**?⚠️ | <code>string</code> | The name of the main release branch.<br/>__*Default*__: 'master'
**dependabot**?⚠️ | <code>boolean</code> | Include dependabot configuration.<br/>__*Default*__: true;
**dependabotOptions**?⚠️ | <code>[DependabotOptions](#projen-dependabotoptions)</code> | Options for dependabot.<br/>__*Default*__: default options
**dependencies**?⚠️ | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**deps**?⚠️ | <code>Array<string></code> | __*Optional*__
**description**?⚠️ | <code>string</code> | The description is just a string that helps people understand the purpose of the package.<br/>__*Optional*__
**devDependencies**?⚠️ | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**devDeps**?⚠️ | <code>Array<string></code> | __*Optional*__
**disableTsconfig**?⚠️ | <code>boolean</code> | Do not generate a `tsconfig.json` file (used by jsii projects since tsconfig.json is generated by the jsii compiler).<br/>__*Default*__: false
**docgen**?⚠️ | <code>boolean</code> | Docgen by Typedoc.<br/>__*Default*__: false
**docsDirectory**?⚠️ | <code>string</code> | Docs directory.<br/>__*Default*__: 'docs'
**entrypoint**?⚠️ | <code>string</code> | Module entrypoint (`main` in `package.json`).<br/>__*Default*__: lib/index.js
**entrypointTypes**?⚠️ | <code>string</code> | The .d.ts file that includes the type declarations for this module.<br/>__*Default*__: .d.ts file derived from the project's entrypoint (usually lib/index.d.ts)
**eslint**?⚠️ | <code>boolean</code> | Setup eslint.<br/>__*Default*__: true
**gitignore**?⚠️ | <code>Array<string></code> | Additional entries to .gitignore.<br/>__*Optional*__
**homepage**?⚠️ | <code>string</code> | Package's Homepage / Website.<br/>__*Optional*__
**jest**?⚠️ | <code>boolean</code> | Setup jest unit tests.<br/>__*Default*__: true
**jestOptions**?⚠️ | <code>[JestOptions](#projen-jestoptions)</code> | Jest options.<br/>__*Default*__: default options
**keywords**?⚠️ | <code>Array<string></code> | Keywords to include in `package.json`.<br/>__*Optional*__
**libdir**?⚠️ | <code>string</code> | Compiler artifacts output directory.<br/>__*Default*__: "lib"
**license**?⚠️ | <code>string</code> | License's SPDX identifier.<br/>__*Optional*__
**maxNodeVersion**?⚠️ | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/>__*Default*__: no max
**mergify**?⚠️ | <code>boolean</code> | Adds mergify configuration.<br/>__*Default*__: true
**mergifyAutoMergeLabel**?⚠️ | <code>string</code> | Automatically merge PRs that build successfully and have this label.<br/>__*Default*__: "auto-merge"
**mergifyOptions**?⚠️ | <code>[MergifyOptions](#projen-mergifyoptions)</code> | Options for mergify.<br/>__*Default*__: default options
**minNodeVersion**?⚠️ | <code>string</code> | Node.js version to require via package.json `engines` (inclusive).<br/>__*Default*__: no "engines" specified
**npmDistTag**?⚠️ | <code>string</code> | The dist-tag to use when releasing to npm.<br/>__*Default*__: "latest"
**npmRegistry**?⚠️ | <code>string</code> | The registry url to use when releasing packages.<br/>__*Default*__: "registry.npmjs.org"
**npmignore**?⚠️ | <code>Array<string></code> | Additional entries to .npmignore.<br/>__*Optional*__
**npmignoreEnabled**?⚠️ | <code>boolean</code> | Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs.<br/>__*Default*__: true
**package**?⚠️ | <code>boolean</code> | Defines a `yarn package` command that will produce a tarball and place it under `dist/js`.<br/>__*Default*__: true
**packageManager**?⚠️ | <code>[NodePackageManager](#projen-nodepackagemanager)</code> | The Node Package Manager used to execute scripts.<br/>__*Default*__: packageManager.YARN
**peerDependencies**?⚠️ | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**peerDependencyOptions**?⚠️ | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | __*Optional*__
**peerDeps**?⚠️ | <code>Array<string></code> | __*Optional*__
**projenDevDependency**?⚠️ | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/>__*Default*__: true
**projenUpgradeAutoMerge**?⚠️ | <code>boolean</code> | Automatically merge projen upgrade PRs when build passes.<br/>__*Default*__: "true" if mergify auto-merge is enabled (default)
**projenUpgradeSchedule**?⚠️ | <code>Array<string></code> | Customize the projenUpgrade schedule in cron expression.<br/>__*Default*__: [ '0 6 * * *' ]
**projenUpgradeSecret**?⚠️ | <code>string</code> | Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`).<br/>__*Default*__: no automatic projen upgrade pull requests
**projenVersion**?⚠️ | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/>__*Default*__: latest version
**releaseBranches**?⚠️ | <code>Array<string></code> | Branches which trigger a release.<br/>__*Default*__: [ "master" ] - based on the value of defaultReleaseBranch.
**releaseEveryCommit**?⚠️ | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`.<br/>__*Default*__: true
**releaseSchedule**?⚠️ | <code>string</code> | CRON schedule to trigger new releases.<br/>__*Default*__: no scheduled releases
**releaseToNpm**?⚠️ | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/>__*Default*__: false
**releaseWorkflow**?⚠️ | <code>boolean</code> | Define a GitHub workflow for releasing from "master" when new versions are bumped.<br/>__*Default*__: true
**repository**?⚠️ | <code>string</code> | The repository is the location where the actual code for your package lives.<br/>__*Optional*__
**repositoryDirectory**?⚠️ | <code>string</code> | If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives.<br/>__*Optional*__
**sampleCode**?⚠️ | <code>boolean</code> | Generate one-time sample in `src/` and `test/` if there are no files there.<br/>__*Default*__: true
**scripts**?⚠️ | <code>Map<string, string></code> | npm scripts to include.<br/>__*Default*__: {}
**srcdir**?⚠️ | <code>string</code> | Typescript sources directory.<br/>__*Default*__: "src"
**stability**?⚠️ | <code>string</code> | Package's Stability.<br/>__*Optional*__
**start**?⚠️ | <code>boolean</code> | Defines a `yarn start` interactive experience.<br/>__*Default*__: true
**startOptions**?⚠️ | <code>[StartOptions](#projen-startoptions)</code> | Options for `yarn start`.<br/>__*Default*__: default options
**testdir**?⚠️ | <code>string</code> | Tests directory.<br/>__*Default*__: "test"
**tsconfig**?⚠️ | <code>[TypescriptConfigOptions](#projen-typescriptconfigoptions)</code> | Custom TSConfig.<br/>__*Optional*__
**typescriptVersion**?⚠️ | <code>[Semver](#projen-semver)</code> | TypeScript version to use.<br/>__*Default*__: ^3.9.5
**workflowBootstrapSteps**?⚠️ | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/>__*Default*__: "yarn install --frozen-lockfile && yarn projen"
**workflowContainerImage**?⚠️ | <code>string</code> | Container image to use for GitHub workflows.<br/>__*Default*__: default image
**workflowNodeVersion**?⚠️ | <code>string</code> | The node version to use in GitHub workflows.<br/>__*Default*__: same as `minNodeVersion`



## struct TypeScriptProjectOptions 🔹 <a id="projen-typescriptprojectoptions"></a>






Name | Type | Description 
-----|------|-------------
**name**🔹 | <code>string</code> | This is the name of your package.
**allowLibraryDependencies**?🔹 | <code>boolean</code> | Allow the project to include `peerDependencies` and `bundledDependencies`.<br/>__*Default*__: true
**antitamper**?🔹 | <code>boolean</code> | Checks that after build there are no modified files on git.<br/>__*Default*__: true
**authorEmail**?🔹 | <code>string</code> | Author's e-mail.<br/>__*Optional*__
**authorName**?🔹 | <code>string</code> | Author's name.<br/>__*Optional*__
**authorOrganization**?🔹 | <code>boolean</code> | Author's Organization.<br/>__*Optional*__
**authorUrl**?🔹 | <code>string</code> | Author's URL / Website.<br/>__*Optional*__
**autoDetectBin**?🔹 | <code>boolean</code> | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.<br/>__*Default*__: true
**bin**?🔹 | <code>Map<string, string></code> | Binary programs vended with your module.<br/>__*Optional*__
**buildWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/>__*Default*__: true
**bundledDependencies**?🔹 | <code>Array<string></code> | __*Optional*__
**bundledDeps**?🔹 | <code>Array<string></code> | __*Optional*__
**compileBeforeTest**?🔹 | <code>boolean</code> | Compile the code before running tests.<br/>__*Default*__: the default behavior is to delete the lib/ directory and run jest typescript tests and only if all tests pass, run the compiler.
**copyrightOwner**?🔹 | <code>string</code> | License copyright owner.<br/>__*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?🔹 | <code>string</code> | The copyright years to put in the LICENSE file.<br/>__*Default*__: current year
**defaultReleaseBranch**?🔹 | <code>string</code> | The name of the main release branch.<br/>__*Default*__: 'master'
**dependabot**?🔹 | <code>boolean</code> | Include dependabot configuration.<br/>__*Default*__: true;
**dependabotOptions**?🔹 | <code>[DependabotOptions](#projen-dependabotoptions)</code> | Options for dependabot.<br/>__*Default*__: default options
**dependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**deps**?🔹 | <code>Array<string></code> | __*Optional*__
**description**?🔹 | <code>string</code> | The description is just a string that helps people understand the purpose of the package.<br/>__*Optional*__
**devDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**devDeps**?🔹 | <code>Array<string></code> | __*Optional*__
**disableTsconfig**?🔹 | <code>boolean</code> | Do not generate a `tsconfig.json` file (used by jsii projects since tsconfig.json is generated by the jsii compiler).<br/>__*Default*__: false
**docgen**?🔹 | <code>boolean</code> | Docgen by Typedoc.<br/>__*Default*__: false
**docsDirectory**?🔹 | <code>string</code> | Docs directory.<br/>__*Default*__: 'docs'
**entrypoint**?🔹 | <code>string</code> | Module entrypoint (`main` in `package.json`).<br/>__*Default*__: lib/index.js
**entrypointTypes**?🔹 | <code>string</code> | The .d.ts file that includes the type declarations for this module.<br/>__*Default*__: .d.ts file derived from the project's entrypoint (usually lib/index.d.ts)
**eslint**?🔹 | <code>boolean</code> | Setup eslint.<br/>__*Default*__: true
**gitignore**?🔹 | <code>Array<string></code> | Additional entries to .gitignore.<br/>__*Optional*__
**homepage**?🔹 | <code>string</code> | Package's Homepage / Website.<br/>__*Optional*__
**jest**?🔹 | <code>boolean</code> | Setup jest unit tests.<br/>__*Default*__: true
**jestOptions**?🔹 | <code>[JestOptions](#projen-jestoptions)</code> | Jest options.<br/>__*Default*__: default options
**keywords**?🔹 | <code>Array<string></code> | Keywords to include in `package.json`.<br/>__*Optional*__
**libdir**?🔹 | <code>string</code> | Compiler artifacts output directory.<br/>__*Default*__: "lib"
**license**?🔹 | <code>string</code> | License's SPDX identifier.<br/>__*Optional*__
**maxNodeVersion**?🔹 | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/>__*Default*__: no max
**mergify**?🔹 | <code>boolean</code> | Adds mergify configuration.<br/>__*Default*__: true
**mergifyAutoMergeLabel**?🔹 | <code>string</code> | Automatically merge PRs that build successfully and have this label.<br/>__*Default*__: "auto-merge"
**mergifyOptions**?🔹 | <code>[MergifyOptions](#projen-mergifyoptions)</code> | Options for mergify.<br/>__*Default*__: default options
**minNodeVersion**?🔹 | <code>string</code> | Node.js version to require via package.json `engines` (inclusive).<br/>__*Default*__: no "engines" specified
**npmDistTag**?🔹 | <code>string</code> | The dist-tag to use when releasing to npm.<br/>__*Default*__: "latest"
**npmRegistry**?🔹 | <code>string</code> | The registry url to use when releasing packages.<br/>__*Default*__: "registry.npmjs.org"
**npmignore**?🔹 | <code>Array<string></code> | Additional entries to .npmignore.<br/>__*Optional*__
**npmignoreEnabled**?🔹 | <code>boolean</code> | Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs.<br/>__*Default*__: true
**package**?🔹 | <code>boolean</code> | Defines a `yarn package` command that will produce a tarball and place it under `dist/js`.<br/>__*Default*__: true
**packageManager**?🔹 | <code>[NodePackageManager](#projen-nodepackagemanager)</code> | The Node Package Manager used to execute scripts.<br/>__*Default*__: packageManager.YARN
**peerDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**peerDependencyOptions**?🔹 | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | __*Optional*__
**peerDeps**?🔹 | <code>Array<string></code> | __*Optional*__
**projenDevDependency**?🔹 | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/>__*Default*__: true
**projenUpgradeAutoMerge**?🔹 | <code>boolean</code> | Automatically merge projen upgrade PRs when build passes.<br/>__*Default*__: "true" if mergify auto-merge is enabled (default)
**projenUpgradeSchedule**?🔹 | <code>Array<string></code> | Customize the projenUpgrade schedule in cron expression.<br/>__*Default*__: [ '0 6 * * *' ]
**projenUpgradeSecret**?🔹 | <code>string</code> | Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`).<br/>__*Default*__: no automatic projen upgrade pull requests
**projenVersion**?🔹 | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/>__*Default*__: latest version
**releaseBranches**?🔹 | <code>Array<string></code> | Branches which trigger a release.<br/>__*Default*__: [ "master" ] - based on the value of defaultReleaseBranch.
**releaseEveryCommit**?🔹 | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`.<br/>__*Default*__: true
**releaseSchedule**?🔹 | <code>string</code> | CRON schedule to trigger new releases.<br/>__*Default*__: no scheduled releases
**releaseToNpm**?🔹 | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/>__*Default*__: false
**releaseWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for releasing from "master" when new versions are bumped.<br/>__*Default*__: true
**repository**?🔹 | <code>string</code> | The repository is the location where the actual code for your package lives.<br/>__*Optional*__
**repositoryDirectory**?🔹 | <code>string</code> | If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives.<br/>__*Optional*__
**sampleCode**?🔹 | <code>boolean</code> | Generate one-time sample in `src/` and `test/` if there are no files there.<br/>__*Default*__: true
**scripts**?🔹 | <code>Map<string, string></code> | npm scripts to include.<br/>__*Default*__: {}
**srcdir**?🔹 | <code>string</code> | Typescript sources directory.<br/>__*Default*__: "src"
**stability**?🔹 | <code>string</code> | Package's Stability.<br/>__*Optional*__
**start**?🔹 | <code>boolean</code> | Defines a `yarn start` interactive experience.<br/>__*Default*__: true
**startOptions**?🔹 | <code>[StartOptions](#projen-startoptions)</code> | Options for `yarn start`.<br/>__*Default*__: default options
**testdir**?🔹 | <code>string</code> | Tests directory.<br/>__*Default*__: "test"
**tsconfig**?🔹 | <code>[TypescriptConfigOptions](#projen-typescriptconfigoptions)</code> | Custom TSConfig.<br/>__*Optional*__
**typescriptVersion**?🔹 | <code>[Semver](#projen-semver)</code> | TypeScript version to use.<br/>__*Default*__: ^3.9.5
**workflowBootstrapSteps**?🔹 | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/>__*Default*__: "yarn install --frozen-lockfile && yarn projen"
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
**releaseBranch**🔹 | <code>string</code> | The name of the release branch where the code and tags are pushed to.



## enum AutoRelease 🔹 <a id="projen-autorelease"></a>

Automatic bump modes.

Name | Description
-----|-----
**EVERY_COMMIT** 🔹|Automatically bump & release a new version for every commit to "master".
**DAILY** 🔹|Automatically bump & release a new version on a daily basis.


## enum CdkApprovalLevel 🔹 <a id="projen-cdkapprovallevel"></a>



Name | Description
-----|-----
**NEVER** 🔹|Approval is never required.
**ANY_CHANGE** 🔹|Requires approval on any IAM or security-group-related change.
**BROADENING** 🔹|Requires approval when IAM statements or traffic rules are added;


## enum DependabotScheduleInterval 🔹 <a id="projen-dependabotscheduleinterval"></a>

How often to check for new versions and raise pull requests for version updates.

Name | Description
-----|-----
**DAILY** 🔹|Runs on every weekday, Monday to Friday.
**WEEKLY** 🔹|Runs once each week.
**MONTHLY** 🔹|Runs once each month.


## enum NodePackageManager 🔹 <a id="projen-nodepackagemanager"></a>

The node package manager to use.

Name | Description
-----|-----
**YARN** 🔹|Use `yarn` as the package manager.
**NPM** 🔹|Use `npm` as the package manager.


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


## enum VersioningStrategy 🔹 <a id="projen-versioningstrategy"></a>

The strategy to use when edits manifest and lock files.

Name | Description
-----|-----
**LOCKFILE_ONLY** 🔹|Only create pull requests to update lockfiles updates.
**AUTO** 🔹|- For apps, the version requirements are increased.
**WIDEN** 🔹|Relax the version requirement to include both the new and old version, when possible.
**INCREASE** 🔹|Always increase the version requirement to match the new version.
**INCREASE_IF_NECESSARY** 🔹|Increase the version requirement only when required by the new version.


