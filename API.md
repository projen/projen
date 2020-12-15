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
[DockerCompose](#projen-dockercompose)|Create a docker-compose YAML file.
[DockerComposeService](#projen-dockercomposeservice)|A docker-compose service.
[Eslint](#projen-eslint)|*No description*
[FileBase](#projen-filebase)|*No description*
[IgnoreFile](#projen-ignorefile)|*No description*
[Jest](#projen-jest)|Installs the following npm scripts:.
[JsiiProject](#projen-jsiiproject)|Multi-language jsii library project.
[JsonFile](#projen-jsonfile)|Represents a JSON file.
[License](#projen-license)|*No description*
[Makefile](#projen-makefile)|Minimal Makefile.
[MkDocs](#projen-mkdocs)|*No description*
[NodeProject](#projen-nodeproject)|Node.js project.
[Project](#projen-project)|Base project.
[SampleDir](#projen-sampledir)|Renders the given files into the directory if the directory does not exist.
[SampleFile](#projen-samplefile)|Produces a file with the given contents but only once, if the file doesn't already exist.
[Semver](#projen-semver)|*No description*
[TextFile](#projen-textfile)|A text file.
[TomlFile](#projen-tomlfile)|TOML file.
[TypeScriptAppProject](#projen-typescriptappproject)|TypeScript app.
[TypeScriptLibraryProject](#projen-typescriptlibraryproject)|*No description*
[TypeScriptProject](#projen-typescriptproject)|TypeScript project.
[TypescriptConfig](#projen-typescriptconfig)|*No description*
[Version](#projen-version)|*No description*
[YamlFile](#projen-yamlfile)|*No description*


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
[DockerComposeBuild](#projen-dockercomposebuild)|Build arguments for creating a docker image.
[DockerComposePortMappingOptions](#projen-dockercomposeportmappingoptions)|Options for port mappings.
[DockerComposeProps](#projen-dockercomposeprops)|Props for DockerCompose.
[DockerComposeServiceDescription](#projen-dockercomposeservicedescription)|Description of a docker-compose.yml service.
[DockerComposeServicePort](#projen-dockercomposeserviceport)|A service port mapping.
[DockerComposeVolumeConfig](#projen-dockercomposevolumeconfig)|Volume configuration.
[DockerComposeVolumeMount](#projen-dockercomposevolumemount)|Service volume mounting information.
[EslintOptions](#projen-eslintoptions)|*No description*
[EslintOverride](#projen-eslintoverride)|eslint rules override.
[FileBaseOptions](#projen-filebaseoptions)|*No description*
[HasteConfig](#projen-hasteconfig)|*No description*
[JestConfigOptions](#projen-jestconfigoptions)|*No description*
[JestOptions](#projen-jestoptions)|*No description*
[JsiiDotNetTarget](#projen-jsiidotnettarget)|*No description*
[JsiiJavaTarget](#projen-jsiijavatarget)|*No description*
[JsiiProjectOptions](#projen-jsiiprojectoptions)|*No description*
[JsiiPythonTarget](#projen-jsiipythontarget)|*No description*
[JsonFileOptions](#projen-jsonfileoptions)|Options for `JsonFile`.
[LicenseOptions](#projen-licenseoptions)|*No description*
[MakefileOptions](#projen-makefileoptions)|Options for Makefiles.
[MkDocsExtraProps](#projen-mkdocsextraprops)|*No description*
[MkDocsMarkDownExtensionProps](#projen-mkdocsmarkdownextensionprops)|*No description*
[MkDocsMarkDownPluginProps](#projen-mkdocsmarkdownpluginprops)|*No description*
[MkDocsNavProps](#projen-mkdocsnavprops)|MkDocs Navigation (aka a map of pages) Note, siteUrl can affect the relativity of these.
[MkDocsProps](#projen-mkdocsprops)|*No description*
[MkDocsThemeFontProps](#projen-mkdocsthemefontprops)|*No description*
[MkDocsThemeIconProps](#projen-mkdocsthemeiconprops)|*No description*
[MkDocsThemePalatteProps](#projen-mkdocsthemepalatteprops)|*No description*
[MkDocsThemeProps](#projen-mkdocsthemeprops)|An Mkdocs Theme The theme itself is optional but if you define one Some fields are required Projen will define its own theme elsewhere.
[NodeProjectCommonOptions](#projen-nodeprojectcommonoptions)|*No description*
[NodeProjectOptions](#projen-nodeprojectoptions)|*No description*
[NodeWorkflowSteps](#projen-nodeworkflowsteps)|*No description*
[PeerDependencyOptions](#projen-peerdependencyoptions)|*No description*
[ProjectOptions](#projen-projectoptions)|*No description*
[ResolveOptions](#projen-resolveoptions)|Resolve options.
[Rule](#projen-rule)|A Make rule.
[SampleDirOptions](#projen-samplediroptions)|SampleDir options.
[SampleFileOptions](#projen-samplefileoptions)|Options for the SampleFile object.
[TextFileOptions](#projen-textfileoptions)|Options for `TextFile`.
[TomlFileOptions](#projen-tomlfileoptions)|*No description*
[TypeScriptCompilerOptions](#projen-typescriptcompileroptions)|*No description*
[TypeScriptLibraryProjectOptions](#projen-typescriptlibraryprojectoptions)|*No description*
[TypeScriptProjectOptions](#projen-typescriptprojectoptions)|*No description*
[TypescriptConfigOptions](#projen-typescriptconfigoptions)|*No description*
[VersionOptions](#projen-versionoptions)|*No description*
[YamlFileOptions](#projen-yamlfileoptions)|*No description*


**Interfaces**

Name|Description
----|-----------
[IDockerComposeServiceName](#projen-idockercomposeservicename)|An interface providing the name of a docker compose service.
[IDockerComposeVolumeBinding](#projen-idockercomposevolumebinding)|Volume binding information.
[IDockerComposeVolumeConfig](#projen-idockercomposevolumeconfig)|Storage for volume configuration.
[IResolver](#projen-iresolver)|API for resolving tokens when synthesizing file content.


**Enums**

Name|Description
----|-----------
[AutoRelease](#projen-autorelease)|Automatic bump modes.
[CdkApprovalLevel](#projen-cdkapprovallevel)|*No description*
[DockerComposeProtocol](#projen-dockercomposeprotocol)|Network protocol for port mapping.
[NodePackageManager](#projen-nodepackagemanager)|The node package manager to use.
[NpmTaskExecution](#projen-npmtaskexecution)|*No description*
[Stability](#projen-stability)|*No description*
[TypeScriptJsxMode](#projen-typescriptjsxmode)|Determines how JSX should get transformed into valid JavaScript.
[TypeScriptModuleResolution](#projen-typescriptmoduleresolution)|Determines how modules get resolved.



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
  * **mkdocs** (<code>boolean</code>)  Whether to enable MkDocs. __*Default*__: false
  * **mkdocsConfig** (<code>[MkDocsProps](#projen-mkdocsprops)</code>)  If mkdocs is true, then this can be used to customize the mkdocs site. __*Default*__: off
  * **outdir** (<code>string</code>)  The root directory of the project. __*Default*__: "."
  * **parent** (<code>[Project](#projen-project)</code>)  The parent project, if this project is part of a bigger project. __*Optional*__
  * **allowLibraryDependencies** (<code>boolean</code>)  Allow the project to include `peerDependencies` and `bundledDependencies`. __*Default*__: true
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files on git. __*Default*__: true
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. __*Default*__: true
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. __*Optional*__
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. __*Default*__: true
  * **bundledDependencies** (<code>Array<string></code>)  *No description* __*Optional*__
  * **bundledDeps** (<code>Array<string></code>)  List of dependencies to bundle into this module. __*Optional*__
  * **codeCov** (<code>boolean</code>)  Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret. __*Default*__: false
  * **codeCovTokenSecret** (<code>string</code>)  Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories. __*Default*__: if this option is not specified, only public repositories are supported
  * **copyrightOwner** (<code>string</code>)  License copyright owner. __*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. __*Default*__: current year
  * **defaultReleaseBranch** (<code>string</code>)  The name of the main release branch. __*Default*__: "master"
  * **dependabot** (<code>boolean</code>)  Include dependabot configuration. __*Default*__: true
  * **dependabotOptions** (<code>[DependabotOptions](#projen-github-dependabotoptions)</code>)  Options for dependabot. __*Default*__: default options
  * **dependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **deps** (<code>Array<string></code>)  Runtime dependencies of this module. __*Default*__: []
  * **devDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **devDeps** (<code>Array<string></code>)  Build dependencies for this module. __*Default*__: []
  * **entrypoint** (<code>string</code>)  Module entrypoint (`main` in `package.json`). __*Default*__: "lib/index.js"
  * **keywords** (<code>Array<string></code>)  Keywords to include in `package.json`. __*Optional*__
  * **libdir** (<code>string</code>)  Compiler artifacts output directory. __*Default*__: "lib"
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). __*Default*__: no max
  * **mergify** (<code>boolean</code>)  Adds mergify configuration. __*Default*__: true
  * **mergifyAutoMergeLabel** (<code>string</code>)  Automatically merge PRs that build successfully and have this label. __*Default*__: "auto-merge"
  * **mergifyOptions** (<code>[MergifyOptions](#projen-github-mergifyoptions)</code>)  Options for mergify. __*Default*__: default options
  * **minNodeVersion** (<code>string</code>)  Minimum Node.js version to require via package.json `engines` (inclusive). __*Default*__: no "engines" specified
  * **npmDistTag** (<code>string</code>)  The dist-tag to use when releasing to npm. __*Default*__: "latest"
  * **npmignore** (<code>Array<string></code>)  Additional entries to .npmignore. __*Optional*__
  * **npmignoreEnabled** (<code>boolean</code>)  Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs. __*Default*__: true
  * **npmRegistry** (<code>string</code>)  The registry url to use when releasing packages. __*Default*__: "registry.npmjs.org"
  * **npmTaskExecution** (<code>[NpmTaskExecution](#projen-npmtaskexecution)</code>)  Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz). __*Default*__: NpmTaskExecution.PROJEN
  * **packageManager** (<code>[NodePackageManager](#projen-nodepackagemanager)</code>)  The Node Package Manager used to execute scripts. __*Default*__: NodePackageManager.YARN
  * **peerDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  Options for `peerDeps`. __*Optional*__
  * **peerDeps** (<code>Array<string></code>)  Peer dependencies for this module. __*Default*__: []
  * **projenCommand** (<code>string</code>)  The shell command to use in order to run the projen CLI. __*Default*__: "npx projen"
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. __*Default*__: true
  * **projenUpgradeAutoMerge** (<code>boolean</code>)  Automatically merge projen upgrade PRs when build passes. __*Default*__: "true" if mergify auto-merge is enabled (default)
  * **projenUpgradeSchedule** (<code>Array<string></code>)  Customize the projenUpgrade schedule in cron expression. __*Default*__: [ "0 6 * * *" ]
  * **projenUpgradeSecret** (<code>string</code>)  Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`). __*Default*__: no automatic projen upgrade pull requests
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. __*Default*__: Semver.latest()
  * **pullRequestTemplate** (<code>boolean</code>)  Include a GitHub pull request template. __*Default*__: true
  * **pullRequestTemplateContents** (<code>string</code>)  The contents of the pull request template. __*Default*__: default content
  * **rebuildBot** (<code>boolean</code>)  Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request. __*Default*__: true
  * **rebuildBotCommand** (<code>string</code>)  The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch. __*Default*__: "rebuild"
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. __*Default*__: [ "master" ]
  * **releaseEveryCommit** (<code>boolean</code>)  Automatically release new versions every commit to one of branches in `releaseBranches`. __*Default*__: true
  * **releaseSchedule** (<code>string</code>)  CRON schedule to trigger new releases. __*Default*__: no scheduled releases
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. __*Default*__: false
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "master" when new versions are bumped. __*Default*__: true
  * **scripts** (<code>Map<string, string></code>)  npm scripts to include. __*Default*__: {}
  * **srcdir** (<code>string</code>)  Typescript sources directory. __*Default*__: "src"
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
  * **compatIgnore** (<code>string</code>)  Name of the ignore file for API compatibility tests. __*Default*__: ".compatignore"
  * **description** (<code>string</code>)  Library description. __*Optional*__
  * **docgen** (<code>boolean</code>)  Automatically generate API.md from jsii. __*Default*__: true
  * **dotnet** (<code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code>)  *No description* __*Optional*__
  * **eslint** (<code>boolean</code>)  Install eslint. __*Default*__: true
  * **java** (<code>[JsiiJavaTarget](#projen-jsiijavatarget)</code>)  *No description* __*Optional*__
  * **jest** (<code>boolean</code>)  Use jest for unit tests. __*Default*__: true
  * **jestOptions** (<code>[JestOptions](#projen-jestoptions)</code>)  Jest options. __*Default*__: defaults
  * **license** (<code>string</code>)  *No description* __*Optional*__
  * **python** (<code>[JsiiPythonTarget](#projen-jsiipythontarget)</code>)  *No description* __*Optional*__
  * **rootdir** (<code>string</code>)  *No description* __*Default*__: "."
  * **stability** (<code>string</code>)  *No description* __*Optional*__
  * **catalog** (<code>[Catalog](#projen-catalog)</code>)  Libraries will be picked up by the construct catalog when they are published to npm as jsii modules and will be published under:. __*Default*__: new version will be announced
  * **cdkVersion** (<code>string</code>)  Minimum target version this library is tested against. 
  * **cdkAssert** (<code>boolean</code>)  Install the @aws-cdk/assert library? __*Default*__: true
  * **cdkDependencies** (<code>Array<string></code>)  Which AWS CDK modules (those that start with "@aws-cdk/") does this library require when consumed? __*Optional*__
  * **cdkTestDependencies** (<code>Array<string></code>)  AWS CDK modules required for testing. __*Optional*__
  * **cdkVersionPinning** (<code>boolean</code>)  Use pinned version instead of caret version for CDK. __*Default*__: false



### Properties


Name | Type | Description 
-----|------|-------------
**version**🔹 | <code>string</code> | The target CDK version for this library.

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
  * **mkdocs** (<code>boolean</code>)  Whether to enable MkDocs. __*Default*__: false
  * **mkdocsConfig** (<code>[MkDocsProps](#projen-mkdocsprops)</code>)  If mkdocs is true, then this can be used to customize the mkdocs site. __*Default*__: off
  * **outdir** (<code>string</code>)  The root directory of the project. __*Default*__: "."
  * **parent** (<code>[Project](#projen-project)</code>)  The parent project, if this project is part of a bigger project. __*Optional*__
  * **allowLibraryDependencies** (<code>boolean</code>)  Allow the project to include `peerDependencies` and `bundledDependencies`. __*Default*__: true
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files on git. __*Default*__: true
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. __*Default*__: true
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. __*Optional*__
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. __*Default*__: true
  * **bundledDependencies** (<code>Array<string></code>)  *No description* __*Optional*__
  * **bundledDeps** (<code>Array<string></code>)  List of dependencies to bundle into this module. __*Optional*__
  * **codeCov** (<code>boolean</code>)  Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret. __*Default*__: false
  * **codeCovTokenSecret** (<code>string</code>)  Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories. __*Default*__: if this option is not specified, only public repositories are supported
  * **copyrightOwner** (<code>string</code>)  License copyright owner. __*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. __*Default*__: current year
  * **defaultReleaseBranch** (<code>string</code>)  The name of the main release branch. __*Default*__: "master"
  * **dependabot** (<code>boolean</code>)  Include dependabot configuration. __*Default*__: true
  * **dependabotOptions** (<code>[DependabotOptions](#projen-github-dependabotoptions)</code>)  Options for dependabot. __*Default*__: default options
  * **dependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **deps** (<code>Array<string></code>)  Runtime dependencies of this module. __*Default*__: []
  * **devDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **devDeps** (<code>Array<string></code>)  Build dependencies for this module. __*Default*__: []
  * **entrypoint** (<code>string</code>)  Module entrypoint (`main` in `package.json`). __*Default*__: "lib/index.js"
  * **keywords** (<code>Array<string></code>)  Keywords to include in `package.json`. __*Optional*__
  * **libdir** (<code>string</code>)  Compiler artifacts output directory. __*Default*__: "lib"
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). __*Default*__: no max
  * **mergify** (<code>boolean</code>)  Adds mergify configuration. __*Default*__: true
  * **mergifyAutoMergeLabel** (<code>string</code>)  Automatically merge PRs that build successfully and have this label. __*Default*__: "auto-merge"
  * **mergifyOptions** (<code>[MergifyOptions](#projen-github-mergifyoptions)</code>)  Options for mergify. __*Default*__: default options
  * **minNodeVersion** (<code>string</code>)  Minimum Node.js version to require via package.json `engines` (inclusive). __*Default*__: no "engines" specified
  * **npmDistTag** (<code>string</code>)  The dist-tag to use when releasing to npm. __*Default*__: "latest"
  * **npmignore** (<code>Array<string></code>)  Additional entries to .npmignore. __*Optional*__
  * **npmignoreEnabled** (<code>boolean</code>)  Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs. __*Default*__: true
  * **npmRegistry** (<code>string</code>)  The registry url to use when releasing packages. __*Default*__: "registry.npmjs.org"
  * **npmTaskExecution** (<code>[NpmTaskExecution](#projen-npmtaskexecution)</code>)  Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz). __*Default*__: NpmTaskExecution.PROJEN
  * **packageManager** (<code>[NodePackageManager](#projen-nodepackagemanager)</code>)  The Node Package Manager used to execute scripts. __*Default*__: NodePackageManager.YARN
  * **peerDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  Options for `peerDeps`. __*Optional*__
  * **peerDeps** (<code>Array<string></code>)  Peer dependencies for this module. __*Default*__: []
  * **projenCommand** (<code>string</code>)  The shell command to use in order to run the projen CLI. __*Default*__: "npx projen"
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. __*Default*__: true
  * **projenUpgradeAutoMerge** (<code>boolean</code>)  Automatically merge projen upgrade PRs when build passes. __*Default*__: "true" if mergify auto-merge is enabled (default)
  * **projenUpgradeSchedule** (<code>Array<string></code>)  Customize the projenUpgrade schedule in cron expression. __*Default*__: [ "0 6 * * *" ]
  * **projenUpgradeSecret** (<code>string</code>)  Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`). __*Default*__: no automatic projen upgrade pull requests
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. __*Default*__: Semver.latest()
  * **pullRequestTemplate** (<code>boolean</code>)  Include a GitHub pull request template. __*Default*__: true
  * **pullRequestTemplateContents** (<code>string</code>)  The contents of the pull request template. __*Default*__: default content
  * **rebuildBot** (<code>boolean</code>)  Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request. __*Default*__: true
  * **rebuildBotCommand** (<code>string</code>)  The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch. __*Default*__: "rebuild"
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. __*Default*__: [ "master" ]
  * **releaseEveryCommit** (<code>boolean</code>)  Automatically release new versions every commit to one of branches in `releaseBranches`. __*Default*__: true
  * **releaseSchedule** (<code>string</code>)  CRON schedule to trigger new releases. __*Default*__: no scheduled releases
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. __*Default*__: false
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "master" when new versions are bumped. __*Default*__: true
  * **scripts** (<code>Map<string, string></code>)  npm scripts to include. __*Default*__: {}
  * **srcdir** (<code>string</code>)  Typescript sources directory. __*Default*__: "src"
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
  * **jest** (<code>boolean</code>)  Setup jest unit tests. __*Default*__: true
  * **jestOptions** (<code>[JestOptions](#projen-jestoptions)</code>)  Jest options. __*Default*__: default options
  * **license** (<code>string</code>)  License's SPDX identifier. __*Optional*__
  * **licensed** (<code>boolean</code>)  Indicates if a license should be added. __*Default*__: true
  * **repository** (<code>string</code>)  The repository is the location where the actual code for your package lives. __*Optional*__
  * **repositoryDirectory** (<code>string</code>)  If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives. __*Optional*__
  * **stability** (<code>string</code>)  Package's Stability. __*Optional*__
  * **compileBeforeTest** (<code>boolean</code>)  Compile the code before running tests. __*Default*__: the default behavior is to delete the lib/ directory and run jest typescript tests and only if all tests pass, run the compiler.
  * **disableTsconfig** (<code>boolean</code>)  Do not generate a `tsconfig.json` file (used by jsii projects since tsconfig.json is generated by the jsii compiler). __*Default*__: false
  * **docgen** (<code>boolean</code>)  Docgen by Typedoc. __*Default*__: false
  * **docsDirectory** (<code>string</code>)  Docs directory. __*Default*__: "docs"
  * **entrypointTypes** (<code>string</code>)  The .d.ts file that includes the type declarations for this module. __*Default*__: .d.ts file derived from the project's entrypoint (usually lib/index.d.ts)
  * **eslint** (<code>boolean</code>)  Setup eslint. __*Default*__: true
  * **eslintOptions** (<code>[EslintOptions](#projen-eslintoptions)</code>)  Eslint options. __*Default*__: opinionated default options
  * **package** (<code>boolean</code>)  Defines a `yarn package` command that will produce a tarball and place it under `dist/js`. __*Default*__: true
  * **sampleCode** (<code>boolean</code>)  Generate one-time sample in `src/` and `test/` if there are no files there. __*Default*__: true
  * **tsconfig** (<code>[TypescriptConfigOptions](#projen-typescriptconfigoptions)</code>)  Custom TSConfig. __*Optional*__
  * **typescriptVersion** (<code>string</code>)  TypeScript version to use. __*Default*__: "^3.9.5"
  * **cdkVersion** (<code>string</code>)  AWS CDK version to use. 
  * **appEntrypoint** (<code>string</code>)  The CDK app's entrypoint (relative to the source directory, which is "src" by default). __*Default*__: "main.ts"
  * **cdkDependencies** (<code>Array<string></code>)  Which AWS CDK modules (those that start with "@aws-cdk/") this app uses. __*Optional*__
  * **cdkVersionPinning** (<code>boolean</code>)  Use pinned version instead of caret version for CDK. __*Default*__: false
  * **context** (<code>Map<string, string></code>)  Additional context to include in `cdk.json`. __*Optional*__
  * **requireApproval** (<code>[CdkApprovalLevel](#projen-cdkapprovallevel)</code>)  To protect you against unintended changes that affect your security posture, the AWS CDK Toolkit prompts you to approve security-related changes before deploying them. __*Default*__: CdkApprovalLevel.BROADENING



### Properties


Name | Type | Description 
-----|------|-------------
**appEntrypoint**🔹 | <code>string</code> | The CDK app entrypoint.
**cdkConfig**🔹 | <code>any</code> | Contents of `cdk.json`.
**cdkVersion**🔹 | <code>string</code> | The CDK version this app is using.

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


#### postSynthesize()🔹 <a id="projen-component-postsynthesize"></a>

Called after synthesis.

Order is *not* guaranteed.

```ts
postSynthesize(): void
```





#### synthesize()🔹 <a id="projen-component-synthesize"></a>

Synthesizes files to the project output directory.

```ts
synthesize(): void
```







## class ConstructLibrary 🔹 <a id="projen-constructlibrary"></a>

A multi-language library for CDK constructs.

__Extends__: [JsiiProject](#projen-jsiiproject)
__Implemented by__: [AwsCdkConstructLibrary](#projen-awscdkconstructlibrary), [ConstructLibraryAws](#projen-constructlibraryaws), [ConstructLibraryCdk8s](#projen-constructlibrarycdk8s)

### Initializer




```ts
new ConstructLibrary(options: ConstructLibraryOptions)
```

* **options** (<code>[ConstructLibraryOptions](#projen-constructlibraryoptions)</code>)  *No description*
  * **mkdocs** (<code>boolean</code>)  Whether to enable MkDocs. __*Default*__: false
  * **mkdocsConfig** (<code>[MkDocsProps](#projen-mkdocsprops)</code>)  If mkdocs is true, then this can be used to customize the mkdocs site. __*Default*__: off
  * **outdir** (<code>string</code>)  The root directory of the project. __*Default*__: "."
  * **parent** (<code>[Project](#projen-project)</code>)  The parent project, if this project is part of a bigger project. __*Optional*__
  * **allowLibraryDependencies** (<code>boolean</code>)  Allow the project to include `peerDependencies` and `bundledDependencies`. __*Default*__: true
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files on git. __*Default*__: true
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. __*Default*__: true
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. __*Optional*__
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. __*Default*__: true
  * **bundledDependencies** (<code>Array<string></code>)  *No description* __*Optional*__
  * **bundledDeps** (<code>Array<string></code>)  List of dependencies to bundle into this module. __*Optional*__
  * **codeCov** (<code>boolean</code>)  Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret. __*Default*__: false
  * **codeCovTokenSecret** (<code>string</code>)  Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories. __*Default*__: if this option is not specified, only public repositories are supported
  * **copyrightOwner** (<code>string</code>)  License copyright owner. __*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. __*Default*__: current year
  * **defaultReleaseBranch** (<code>string</code>)  The name of the main release branch. __*Default*__: "master"
  * **dependabot** (<code>boolean</code>)  Include dependabot configuration. __*Default*__: true
  * **dependabotOptions** (<code>[DependabotOptions](#projen-github-dependabotoptions)</code>)  Options for dependabot. __*Default*__: default options
  * **dependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **deps** (<code>Array<string></code>)  Runtime dependencies of this module. __*Default*__: []
  * **devDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **devDeps** (<code>Array<string></code>)  Build dependencies for this module. __*Default*__: []
  * **entrypoint** (<code>string</code>)  Module entrypoint (`main` in `package.json`). __*Default*__: "lib/index.js"
  * **keywords** (<code>Array<string></code>)  Keywords to include in `package.json`. __*Optional*__
  * **libdir** (<code>string</code>)  Compiler artifacts output directory. __*Default*__: "lib"
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). __*Default*__: no max
  * **mergify** (<code>boolean</code>)  Adds mergify configuration. __*Default*__: true
  * **mergifyAutoMergeLabel** (<code>string</code>)  Automatically merge PRs that build successfully and have this label. __*Default*__: "auto-merge"
  * **mergifyOptions** (<code>[MergifyOptions](#projen-github-mergifyoptions)</code>)  Options for mergify. __*Default*__: default options
  * **minNodeVersion** (<code>string</code>)  Minimum Node.js version to require via package.json `engines` (inclusive). __*Default*__: no "engines" specified
  * **npmDistTag** (<code>string</code>)  The dist-tag to use when releasing to npm. __*Default*__: "latest"
  * **npmignore** (<code>Array<string></code>)  Additional entries to .npmignore. __*Optional*__
  * **npmignoreEnabled** (<code>boolean</code>)  Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs. __*Default*__: true
  * **npmRegistry** (<code>string</code>)  The registry url to use when releasing packages. __*Default*__: "registry.npmjs.org"
  * **npmTaskExecution** (<code>[NpmTaskExecution](#projen-npmtaskexecution)</code>)  Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz). __*Default*__: NpmTaskExecution.PROJEN
  * **packageManager** (<code>[NodePackageManager](#projen-nodepackagemanager)</code>)  The Node Package Manager used to execute scripts. __*Default*__: NodePackageManager.YARN
  * **peerDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  Options for `peerDeps`. __*Optional*__
  * **peerDeps** (<code>Array<string></code>)  Peer dependencies for this module. __*Default*__: []
  * **projenCommand** (<code>string</code>)  The shell command to use in order to run the projen CLI. __*Default*__: "npx projen"
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. __*Default*__: true
  * **projenUpgradeAutoMerge** (<code>boolean</code>)  Automatically merge projen upgrade PRs when build passes. __*Default*__: "true" if mergify auto-merge is enabled (default)
  * **projenUpgradeSchedule** (<code>Array<string></code>)  Customize the projenUpgrade schedule in cron expression. __*Default*__: [ "0 6 * * *" ]
  * **projenUpgradeSecret** (<code>string</code>)  Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`). __*Default*__: no automatic projen upgrade pull requests
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. __*Default*__: Semver.latest()
  * **pullRequestTemplate** (<code>boolean</code>)  Include a GitHub pull request template. __*Default*__: true
  * **pullRequestTemplateContents** (<code>string</code>)  The contents of the pull request template. __*Default*__: default content
  * **rebuildBot** (<code>boolean</code>)  Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request. __*Default*__: true
  * **rebuildBotCommand** (<code>string</code>)  The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch. __*Default*__: "rebuild"
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. __*Default*__: [ "master" ]
  * **releaseEveryCommit** (<code>boolean</code>)  Automatically release new versions every commit to one of branches in `releaseBranches`. __*Default*__: true
  * **releaseSchedule** (<code>string</code>)  CRON schedule to trigger new releases. __*Default*__: no scheduled releases
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. __*Default*__: false
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "master" when new versions are bumped. __*Default*__: true
  * **scripts** (<code>Map<string, string></code>)  npm scripts to include. __*Default*__: {}
  * **srcdir** (<code>string</code>)  Typescript sources directory. __*Default*__: "src"
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
  * **compatIgnore** (<code>string</code>)  Name of the ignore file for API compatibility tests. __*Default*__: ".compatignore"
  * **description** (<code>string</code>)  Library description. __*Optional*__
  * **docgen** (<code>boolean</code>)  Automatically generate API.md from jsii. __*Default*__: true
  * **dotnet** (<code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code>)  *No description* __*Optional*__
  * **eslint** (<code>boolean</code>)  Install eslint. __*Default*__: true
  * **java** (<code>[JsiiJavaTarget](#projen-jsiijavatarget)</code>)  *No description* __*Optional*__
  * **jest** (<code>boolean</code>)  Use jest for unit tests. __*Default*__: true
  * **jestOptions** (<code>[JestOptions](#projen-jestoptions)</code>)  Jest options. __*Default*__: defaults
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
  * **mkdocs** (<code>boolean</code>)  Whether to enable MkDocs. __*Default*__: false
  * **mkdocsConfig** (<code>[MkDocsProps](#projen-mkdocsprops)</code>)  If mkdocs is true, then this can be used to customize the mkdocs site. __*Default*__: off
  * **outdir** (<code>string</code>)  The root directory of the project. __*Default*__: "."
  * **parent** (<code>[Project](#projen-project)</code>)  The parent project, if this project is part of a bigger project. __*Optional*__
  * **allowLibraryDependencies** (<code>boolean</code>)  Allow the project to include `peerDependencies` and `bundledDependencies`. __*Default*__: true
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files on git. __*Default*__: true
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. __*Default*__: true
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. __*Optional*__
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. __*Default*__: true
  * **bundledDependencies** (<code>Array<string></code>)  *No description* __*Optional*__
  * **bundledDeps** (<code>Array<string></code>)  List of dependencies to bundle into this module. __*Optional*__
  * **codeCov** (<code>boolean</code>)  Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret. __*Default*__: false
  * **codeCovTokenSecret** (<code>string</code>)  Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories. __*Default*__: if this option is not specified, only public repositories are supported
  * **copyrightOwner** (<code>string</code>)  License copyright owner. __*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. __*Default*__: current year
  * **defaultReleaseBranch** (<code>string</code>)  The name of the main release branch. __*Default*__: "master"
  * **dependabot** (<code>boolean</code>)  Include dependabot configuration. __*Default*__: true
  * **dependabotOptions** (<code>[DependabotOptions](#projen-github-dependabotoptions)</code>)  Options for dependabot. __*Default*__: default options
  * **dependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **deps** (<code>Array<string></code>)  Runtime dependencies of this module. __*Default*__: []
  * **devDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **devDeps** (<code>Array<string></code>)  Build dependencies for this module. __*Default*__: []
  * **entrypoint** (<code>string</code>)  Module entrypoint (`main` in `package.json`). __*Default*__: "lib/index.js"
  * **keywords** (<code>Array<string></code>)  Keywords to include in `package.json`. __*Optional*__
  * **libdir** (<code>string</code>)  Compiler artifacts output directory. __*Default*__: "lib"
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). __*Default*__: no max
  * **mergify** (<code>boolean</code>)  Adds mergify configuration. __*Default*__: true
  * **mergifyAutoMergeLabel** (<code>string</code>)  Automatically merge PRs that build successfully and have this label. __*Default*__: "auto-merge"
  * **mergifyOptions** (<code>[MergifyOptions](#projen-github-mergifyoptions)</code>)  Options for mergify. __*Default*__: default options
  * **minNodeVersion** (<code>string</code>)  Minimum Node.js version to require via package.json `engines` (inclusive). __*Default*__: no "engines" specified
  * **npmDistTag** (<code>string</code>)  The dist-tag to use when releasing to npm. __*Default*__: "latest"
  * **npmignore** (<code>Array<string></code>)  Additional entries to .npmignore. __*Optional*__
  * **npmignoreEnabled** (<code>boolean</code>)  Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs. __*Default*__: true
  * **npmRegistry** (<code>string</code>)  The registry url to use when releasing packages. __*Default*__: "registry.npmjs.org"
  * **npmTaskExecution** (<code>[NpmTaskExecution](#projen-npmtaskexecution)</code>)  Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz). __*Default*__: NpmTaskExecution.PROJEN
  * **packageManager** (<code>[NodePackageManager](#projen-nodepackagemanager)</code>)  The Node Package Manager used to execute scripts. __*Default*__: NodePackageManager.YARN
  * **peerDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  Options for `peerDeps`. __*Optional*__
  * **peerDeps** (<code>Array<string></code>)  Peer dependencies for this module. __*Default*__: []
  * **projenCommand** (<code>string</code>)  The shell command to use in order to run the projen CLI. __*Default*__: "npx projen"
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. __*Default*__: true
  * **projenUpgradeAutoMerge** (<code>boolean</code>)  Automatically merge projen upgrade PRs when build passes. __*Default*__: "true" if mergify auto-merge is enabled (default)
  * **projenUpgradeSchedule** (<code>Array<string></code>)  Customize the projenUpgrade schedule in cron expression. __*Default*__: [ "0 6 * * *" ]
  * **projenUpgradeSecret** (<code>string</code>)  Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`). __*Default*__: no automatic projen upgrade pull requests
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. __*Default*__: Semver.latest()
  * **pullRequestTemplate** (<code>boolean</code>)  Include a GitHub pull request template. __*Default*__: true
  * **pullRequestTemplateContents** (<code>string</code>)  The contents of the pull request template. __*Default*__: default content
  * **rebuildBot** (<code>boolean</code>)  Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request. __*Default*__: true
  * **rebuildBotCommand** (<code>string</code>)  The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch. __*Default*__: "rebuild"
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. __*Default*__: [ "master" ]
  * **releaseEveryCommit** (<code>boolean</code>)  Automatically release new versions every commit to one of branches in `releaseBranches`. __*Default*__: true
  * **releaseSchedule** (<code>string</code>)  CRON schedule to trigger new releases. __*Default*__: no scheduled releases
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. __*Default*__: false
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "master" when new versions are bumped. __*Default*__: true
  * **scripts** (<code>Map<string, string></code>)  npm scripts to include. __*Default*__: {}
  * **srcdir** (<code>string</code>)  Typescript sources directory. __*Default*__: "src"
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
  * **compatIgnore** (<code>string</code>)  Name of the ignore file for API compatibility tests. __*Default*__: ".compatignore"
  * **description** (<code>string</code>)  Library description. __*Optional*__
  * **docgen** (<code>boolean</code>)  Automatically generate API.md from jsii. __*Default*__: true
  * **dotnet** (<code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code>)  *No description* __*Optional*__
  * **eslint** (<code>boolean</code>)  Install eslint. __*Default*__: true
  * **java** (<code>[JsiiJavaTarget](#projen-jsiijavatarget)</code>)  *No description* __*Optional*__
  * **jest** (<code>boolean</code>)  Use jest for unit tests. __*Default*__: true
  * **jestOptions** (<code>[JestOptions](#projen-jestoptions)</code>)  Jest options. __*Default*__: defaults
  * **license** (<code>string</code>)  *No description* __*Optional*__
  * **python** (<code>[JsiiPythonTarget](#projen-jsiipythontarget)</code>)  *No description* __*Optional*__
  * **rootdir** (<code>string</code>)  *No description* __*Default*__: "."
  * **stability** (<code>string</code>)  *No description* __*Optional*__
  * **catalog** (<code>[Catalog](#projen-catalog)</code>)  Libraries will be picked up by the construct catalog when they are published to npm as jsii modules and will be published under:. __*Default*__: new version will be announced
  * **cdkVersion** (<code>string</code>)  Minimum target version this library is tested against. 
  * **cdkAssert** (<code>boolean</code>)  Install the @aws-cdk/assert library? __*Default*__: true
  * **cdkDependencies** (<code>Array<string></code>)  Which AWS CDK modules (those that start with "@aws-cdk/") does this library require when consumed? __*Optional*__
  * **cdkTestDependencies** (<code>Array<string></code>)  AWS CDK modules required for testing. __*Optional*__
  * **cdkVersionPinning** (<code>boolean</code>)  Use pinned version instead of caret version for CDK. __*Default*__: false




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
  * **mkdocs** (<code>boolean</code>)  Whether to enable MkDocs. __*Default*__: false
  * **mkdocsConfig** (<code>[MkDocsProps](#projen-mkdocsprops)</code>)  If mkdocs is true, then this can be used to customize the mkdocs site. __*Default*__: off
  * **outdir** (<code>string</code>)  The root directory of the project. __*Default*__: "."
  * **parent** (<code>[Project](#projen-project)</code>)  The parent project, if this project is part of a bigger project. __*Optional*__
  * **allowLibraryDependencies** (<code>boolean</code>)  Allow the project to include `peerDependencies` and `bundledDependencies`. __*Default*__: true
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files on git. __*Default*__: true
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. __*Default*__: true
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. __*Optional*__
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. __*Default*__: true
  * **bundledDependencies** (<code>Array<string></code>)  *No description* __*Optional*__
  * **bundledDeps** (<code>Array<string></code>)  List of dependencies to bundle into this module. __*Optional*__
  * **codeCov** (<code>boolean</code>)  Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret. __*Default*__: false
  * **codeCovTokenSecret** (<code>string</code>)  Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories. __*Default*__: if this option is not specified, only public repositories are supported
  * **copyrightOwner** (<code>string</code>)  License copyright owner. __*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. __*Default*__: current year
  * **defaultReleaseBranch** (<code>string</code>)  The name of the main release branch. __*Default*__: "master"
  * **dependabot** (<code>boolean</code>)  Include dependabot configuration. __*Default*__: true
  * **dependabotOptions** (<code>[DependabotOptions](#projen-github-dependabotoptions)</code>)  Options for dependabot. __*Default*__: default options
  * **dependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **deps** (<code>Array<string></code>)  Runtime dependencies of this module. __*Default*__: []
  * **devDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **devDeps** (<code>Array<string></code>)  Build dependencies for this module. __*Default*__: []
  * **entrypoint** (<code>string</code>)  Module entrypoint (`main` in `package.json`). __*Default*__: "lib/index.js"
  * **keywords** (<code>Array<string></code>)  Keywords to include in `package.json`. __*Optional*__
  * **libdir** (<code>string</code>)  Compiler artifacts output directory. __*Default*__: "lib"
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). __*Default*__: no max
  * **mergify** (<code>boolean</code>)  Adds mergify configuration. __*Default*__: true
  * **mergifyAutoMergeLabel** (<code>string</code>)  Automatically merge PRs that build successfully and have this label. __*Default*__: "auto-merge"
  * **mergifyOptions** (<code>[MergifyOptions](#projen-github-mergifyoptions)</code>)  Options for mergify. __*Default*__: default options
  * **minNodeVersion** (<code>string</code>)  Minimum Node.js version to require via package.json `engines` (inclusive). __*Default*__: no "engines" specified
  * **npmDistTag** (<code>string</code>)  The dist-tag to use when releasing to npm. __*Default*__: "latest"
  * **npmignore** (<code>Array<string></code>)  Additional entries to .npmignore. __*Optional*__
  * **npmignoreEnabled** (<code>boolean</code>)  Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs. __*Default*__: true
  * **npmRegistry** (<code>string</code>)  The registry url to use when releasing packages. __*Default*__: "registry.npmjs.org"
  * **npmTaskExecution** (<code>[NpmTaskExecution](#projen-npmtaskexecution)</code>)  Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz). __*Default*__: NpmTaskExecution.PROJEN
  * **packageManager** (<code>[NodePackageManager](#projen-nodepackagemanager)</code>)  The Node Package Manager used to execute scripts. __*Default*__: NodePackageManager.YARN
  * **peerDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  Options for `peerDeps`. __*Optional*__
  * **peerDeps** (<code>Array<string></code>)  Peer dependencies for this module. __*Default*__: []
  * **projenCommand** (<code>string</code>)  The shell command to use in order to run the projen CLI. __*Default*__: "npx projen"
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. __*Default*__: true
  * **projenUpgradeAutoMerge** (<code>boolean</code>)  Automatically merge projen upgrade PRs when build passes. __*Default*__: "true" if mergify auto-merge is enabled (default)
  * **projenUpgradeSchedule** (<code>Array<string></code>)  Customize the projenUpgrade schedule in cron expression. __*Default*__: [ "0 6 * * *" ]
  * **projenUpgradeSecret** (<code>string</code>)  Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`). __*Default*__: no automatic projen upgrade pull requests
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. __*Default*__: Semver.latest()
  * **pullRequestTemplate** (<code>boolean</code>)  Include a GitHub pull request template. __*Default*__: true
  * **pullRequestTemplateContents** (<code>string</code>)  The contents of the pull request template. __*Default*__: default content
  * **rebuildBot** (<code>boolean</code>)  Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request. __*Default*__: true
  * **rebuildBotCommand** (<code>string</code>)  The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch. __*Default*__: "rebuild"
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. __*Default*__: [ "master" ]
  * **releaseEveryCommit** (<code>boolean</code>)  Automatically release new versions every commit to one of branches in `releaseBranches`. __*Default*__: true
  * **releaseSchedule** (<code>string</code>)  CRON schedule to trigger new releases. __*Default*__: no scheduled releases
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. __*Default*__: false
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "master" when new versions are bumped. __*Default*__: true
  * **scripts** (<code>Map<string, string></code>)  npm scripts to include. __*Default*__: {}
  * **srcdir** (<code>string</code>)  Typescript sources directory. __*Default*__: "src"
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
  * **compatIgnore** (<code>string</code>)  Name of the ignore file for API compatibility tests. __*Default*__: ".compatignore"
  * **description** (<code>string</code>)  Library description. __*Optional*__
  * **docgen** (<code>boolean</code>)  Automatically generate API.md from jsii. __*Default*__: true
  * **dotnet** (<code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code>)  *No description* __*Optional*__
  * **eslint** (<code>boolean</code>)  Install eslint. __*Default*__: true
  * **java** (<code>[JsiiJavaTarget](#projen-jsiijavatarget)</code>)  *No description* __*Optional*__
  * **jest** (<code>boolean</code>)  Use jest for unit tests. __*Default*__: true
  * **jestOptions** (<code>[JestOptions](#projen-jestoptions)</code>)  Jest options. __*Default*__: defaults
  * **license** (<code>string</code>)  *No description* __*Optional*__
  * **python** (<code>[JsiiPythonTarget](#projen-jsiipythontarget)</code>)  *No description* __*Optional*__
  * **rootdir** (<code>string</code>)  *No description* __*Default*__: "."
  * **stability** (<code>string</code>)  *No description* __*Optional*__
  * **catalog** (<code>[Catalog](#projen-catalog)</code>)  Libraries will be picked up by the construct catalog when they are published to npm as jsii modules and will be published under:. __*Default*__: new version will be announced
  * **cdk8sVersion** (<code>string</code>)  Minimum target version this library is tested against. 




## class DockerCompose 🔹 <a id="projen-dockercompose"></a>

Create a docker-compose YAML file.

__Extends__: [Component](#projen-component)

### Initializer




```ts
new DockerCompose(project: Project, props?: DockerComposeProps)
```

* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **props** (<code>[DockerComposeProps](#projen-dockercomposeprops)</code>)  *No description*
  * **nameSuffix** (<code>string</code>)  A name to add to the docker-compose.yml filename. __*Default*__: no name is added
  * **services** (<code>Map<string, [DockerComposeServiceDescription](#projen-dockercomposeservicedescription)></code>)  Service descriptions. __*Optional*__


### Methods


#### addService(serviceName, description)🔹 <a id="projen-dockercompose-addservice"></a>

Add a service to the docker-compose file.

```ts
addService(serviceName: string, description: DockerComposeServiceDescription): DockerComposeService
```

* **serviceName** (<code>string</code>)  name of the service.
* **description** (<code>[DockerComposeServiceDescription](#projen-dockercomposeservicedescription)</code>)  a service description.
  * **command** (<code>Array<string></code>)  Provide a command to the docker container. __*Default*__: use the container's default command
  * **dependsOn** (<code>Array<[IDockerComposeServiceName](#projen-idockercomposeservicename)></code>)  Names of other services this service depends on. __*Default*__: no dependencies
  * **environment** (<code>Map<string, string></code>)  Add environment variables. __*Default*__: no environment variables are provided
  * **image** (<code>string</code>)  Use a docker image. __*Optional*__
  * **imageBuild** (<code>[DockerComposeBuild](#projen-dockercomposebuild)</code>)  Build a docker image. __*Optional*__
  * **ports** (<code>Array<[DockerComposeServicePort](#projen-dockercomposeserviceport)></code>)  Map some ports. __*Default*__: no ports are mapped
  * **volumes** (<code>Array<[IDockerComposeVolumeBinding](#projen-idockercomposevolumebinding)></code>)  Mount some volumes into the service. __*Optional*__

__Returns__:
* <code>[DockerComposeService](#projen-dockercomposeservice)</code>

#### *static* bindVolume(sourcePath, targetPath)🔹 <a id="projen-dockercompose-bindvolume"></a>

Create a bind volume that binds a host path to the target path in the container.

```ts
static bindVolume(sourcePath: string, targetPath: string): IDockerComposeVolumeBinding
```

* **sourcePath** (<code>string</code>)  Host path name.
* **targetPath** (<code>string</code>)  Target path name.

__Returns__:
* <code>[IDockerComposeVolumeBinding](#projen-idockercomposevolumebinding)</code>

#### *static* namedVolume(volumeName, targetPath, options?)🔹 <a id="projen-dockercompose-namedvolume"></a>

Create a named volume and mount it to the target path.

If you use this
named volume in several services, the volume will be shared. In this
case, the volume configuration of the first-provided options are used.

```ts
static namedVolume(volumeName: string, targetPath: string, options?: DockerComposeVolumeConfig): IDockerComposeVolumeBinding
```

* **volumeName** (<code>string</code>)  Name of the volume.
* **targetPath** (<code>string</code>)  Target path.
* **options** (<code>[DockerComposeVolumeConfig](#projen-dockercomposevolumeconfig)</code>)  volume configuration (default: docker compose defaults).
  * **driver** (<code>string</code>)  Driver to use for the volume. __*Default*__: value is not provided
  * **driverOpts** (<code>Map<string, string></code>)  Options to provide to the driver. __*Optional*__
  * **external** (<code>boolean</code>)  Set to true to indicate that the volume is externally created. __*Default*__: unset, indicating that docker-compose creates the volume
  * **name** (<code>string</code>)  Name of the volume for when the volume name isn't going to work in YAML. __*Default*__: unset, indicating that docker-compose creates volumes as usual

__Returns__:
* <code>[IDockerComposeVolumeBinding](#projen-idockercomposevolumebinding)</code>

#### *static* portMapping(publishedPort, targetPort, options?)🔹 <a id="projen-dockercompose-portmapping"></a>

Create a port mapping.

```ts
static portMapping(publishedPort: number, targetPort: number, options?: DockerComposePortMappingOptions): DockerComposeServicePort
```

* **publishedPort** (<code>number</code>)  Published port number.
* **targetPort** (<code>number</code>)  Container's port number.
* **options** (<code>[DockerComposePortMappingOptions](#projen-dockercomposeportmappingoptions)</code>)  Port mapping options.
  * **protocol** (<code>[DockerComposeProtocol](#projen-dockercomposeprotocol)</code>)  Port mapping protocol. __*Default*__: DockerComposeProtocol.TCP

__Returns__:
* <code>[DockerComposeServicePort](#projen-dockercomposeserviceport)</code>

#### *static* serviceName(serviceName)🔹 <a id="projen-dockercompose-servicename"></a>

Depends on a service name.

```ts
static serviceName(serviceName: string): IDockerComposeServiceName
```

* **serviceName** (<code>string</code>)  *No description*

__Returns__:
* <code>[IDockerComposeServiceName](#projen-idockercomposeservicename)</code>



## class DockerComposeService 🔹 <a id="projen-dockercomposeservice"></a>

A docker-compose service.

__Implements__: [IDockerComposeServiceName](#projen-idockercomposeservicename)

### Initializer




```ts
new DockerComposeService(serviceName: string, serviceDescription: DockerComposeServiceDescription)
```

* **serviceName** (<code>string</code>)  *No description*
* **serviceDescription** (<code>[DockerComposeServiceDescription](#projen-dockercomposeservicedescription)</code>)  *No description*
  * **command** (<code>Array<string></code>)  Provide a command to the docker container. __*Default*__: use the container's default command
  * **dependsOn** (<code>Array<[IDockerComposeServiceName](#projen-idockercomposeservicename)></code>)  Names of other services this service depends on. __*Default*__: no dependencies
  * **environment** (<code>Map<string, string></code>)  Add environment variables. __*Default*__: no environment variables are provided
  * **image** (<code>string</code>)  Use a docker image. __*Optional*__
  * **imageBuild** (<code>[DockerComposeBuild](#projen-dockercomposebuild)</code>)  Build a docker image. __*Optional*__
  * **ports** (<code>Array<[DockerComposeServicePort](#projen-dockercomposeserviceport)></code>)  Map some ports. __*Default*__: no ports are mapped
  * **volumes** (<code>Array<[IDockerComposeVolumeBinding](#projen-idockercomposevolumebinding)></code>)  Mount some volumes into the service. __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**dependsOn**🔹 | <code>Array<[IDockerComposeServiceName](#projen-idockercomposeservicename)></code> | Other services that this service depends on.
**environment**🔹 | <code>Map<string, string></code> | Environment variables.
**ports**🔹 | <code>Array<[DockerComposeServicePort](#projen-dockercomposeserviceport)></code> | Published ports.
**serviceName**🔹 | <code>string</code> | Name of the service.
**volumes**🔹 | <code>Array<[IDockerComposeVolumeBinding](#projen-idockercomposevolumebinding)></code> | Volumes mounted in the container.
**command**?🔹 | <code>Array<string></code> | Command to run in the container.<br/>__*Optional*__
**image**?🔹 | <code>string</code> | Docker image.<br/>__*Optional*__
**imageBuild**?🔹 | <code>[DockerComposeBuild](#projen-dockercomposebuild)</code> | Docker image build instructions.<br/>__*Optional*__

### Methods


#### addDependsOn(serviceName)🔹 <a id="projen-dockercomposeservice-adddependson"></a>

Make the service depend on another service.

```ts
addDependsOn(serviceName: IDockerComposeServiceName): void
```

* **serviceName** (<code>[IDockerComposeServiceName](#projen-idockercomposeservicename)</code>)  *No description*




#### addEnvironment(name, value)🔹 <a id="projen-dockercomposeservice-addenvironment"></a>

Add an environment variable.

```ts
addEnvironment(name: string, value: string): void
```

* **name** (<code>string</code>)  environment variable name.
* **value** (<code>string</code>)  value of the environment variable.




#### addPort(publishedPort, targetPort, options?)🔹 <a id="projen-dockercomposeservice-addport"></a>

Add a port mapping.

```ts
addPort(publishedPort: number, targetPort: number, options?: DockerComposePortMappingOptions): void
```

* **publishedPort** (<code>number</code>)  Published port number.
* **targetPort** (<code>number</code>)  Container's port number.
* **options** (<code>[DockerComposePortMappingOptions](#projen-dockercomposeportmappingoptions)</code>)  Port mapping options.
  * **protocol** (<code>[DockerComposeProtocol](#projen-dockercomposeprotocol)</code>)  Port mapping protocol. __*Default*__: DockerComposeProtocol.TCP




#### addVolume(volume)🔹 <a id="projen-dockercomposeservice-addvolume"></a>

Add a volume to the service.

```ts
addVolume(volume: IDockerComposeVolumeBinding): void
```

* **volume** (<code>[IDockerComposeVolumeBinding](#projen-idockercomposevolumebinding)</code>)  *No description*






## class Eslint 🔹 <a id="projen-eslint"></a>



__Extends__: [Component](#projen-component)

### Initializer




```ts
new Eslint(project: NodeProject, options: EslintOptions)
```

* **project** (<code>[NodeProject](#projen-nodeproject)</code>)  *No description*
* **options** (<code>[EslintOptions](#projen-eslintoptions)</code>)  *No description*
  * **dirs** (<code>Array<string></code>)  Directories with source files to lint (e.g. [ "src", "test" ]). 
  * **fileExtensions** (<code>Array<string></code>)  File types that should be linted (e.g. [ ".js", ".ts" ]). 
  * **tsconfigPath** (<code>string</code>)  *No description* 
  * **ignorePatterns** (<code>Array<string></code>)  List of file patterns that should not be linted, using the same syntax as .gitignore patterns. __*Default*__: [ '*.js', '*.d.ts', 'node_modules/', '*.generated.ts', 'coverage' ]



### Properties


Name | Type | Description 
-----|------|-------------
**config**🔹 | <code>any</code> | Direct access to the eslint configuration (escape hatch).
**ignorePatterns**🔹 | <code>Array<string></code> | File patterns that should not be linted.
**overrides**🔹 | <code>Array<[EslintOverride](#projen-eslintoverride)></code> | eslint overrides.
**rules**🔹 | <code>Map<string, Array<any>></code> | eslint rules.

### Methods


#### addIgnorePattern(pattern)🔹 <a id="projen-eslint-addignorepattern"></a>

Do not lint these files.

```ts
addIgnorePattern(pattern: string): void
```

* **pattern** (<code>string</code>)  *No description*




#### addOverride(override)🔹 <a id="projen-eslint-addoverride"></a>

Add an eslint override.

```ts
addOverride(override: EslintOverride): void
```

* **override** (<code>[EslintOverride](#projen-eslintoverride)</code>)  *No description*
  * **files** (<code>Array<string></code>)  Files or file patterns on which to apply the override. 
  * **rules** (<code>Map<string, any></code>)  The overriden rules. 




#### addRules(rules)🔹 <a id="projen-eslint-addrules"></a>

Add an eslint rule.

```ts
addRules(rules: Map<string, any>): void
```

* **rules** (<code>Map<string, any></code>)  *No description*






## class FileBase 🔹 <a id="projen-filebase"></a>



__Extends__: [Component](#projen-component)
__Implemented by__: [GithubWorkflow](#projen-github-githubworkflow), [PullRequestTemplate](#projen-github-pullrequesttemplate), [NextJsTypeDef](#projen-web-nextjstypedef), [ReactTypeDef](#projen-web-reacttypedef), [IgnoreFile](#projen-ignorefile), [JsonFile](#projen-jsonfile), [License](#projen-license), [Makefile](#projen-makefile), [TextFile](#projen-textfile), [TomlFile](#projen-tomlfile), [YamlFile](#projen-yamlfile)
__Obtainable from__: [Project](#projen-project).[tryFindFile](#projen-project#projen-project-tryfindfile)()

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
**absolutePath**🔹 | <code>string</code> | The absoluate path of this file.
**path**🔹 | <code>string</code> | The file path, relative to the project root.
**readonly**🔹 | <code>boolean</code> | Indicates if the file should be read-only or read-write.
*static* **PROJEN_MARKER**🔹 | <code>string</code> | The marker to embed in files in order to identify them as projen files.

### Methods


#### synthesize()🔹 <a id="projen-filebase-synthesize"></a>

Writes the file to the project's output directory.

```ts
synthesize(): void
```





#### protected synthesizeContent(resolver)🔹 <a id="projen-filebase-synthesizecontent"></a>

Implemented by derived classes and returns the contents of the file to emit.

```ts
protected synthesizeContent(resolver: IResolver): string
```

* **resolver** (<code>[IResolver](#projen-iresolver)</code>)  Call `resolver.resolve(obj)` on any objects in order to resolve token functions.

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
  * **ignorePatterns** (<code>Array<string></code>)  Defines `testPathIgnorePatterns` and `coveragePathIgnorePatterns`. __*Default*__: ["/node_modules/"]
  * **jestConfig** (<code>[JestConfigOptions](#projen-jestconfigoptions)</code>)  *No description* __*Optional*__
  * **jestVersion** (<code>string</code>)  The version of jest to use. __*Default*__: installs the latest jest version
  * **junitReporting** (<code>boolean</code>)  Result processing with jest-junit. __*Default*__: true
  * **preserveDefaultReporters** (<code>boolean</code>)  Preserve the default Jest reporter when additional reporters are added. __*Default*__: true
  * **typescriptConfig** (<code>[TypescriptConfigOptions](#projen-typescriptconfigoptions)</code>)  *No description* __*Optional*__



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




#### addReporter(reporter)🔹 <a id="projen-jest-addreporter"></a>



```ts
addReporter(reporter: string &#124; json): void
```

* **reporter** (<code>string &#124; json</code>)  *No description*




#### generateTypescriptConfig(options)🔹 <a id="projen-jest-generatetypescriptconfig"></a>

Merges passed in typescript config options with jest configured typescript options from .projenrc Add Jest config settings for typescript options.

```ts
generateTypescriptConfig(options: TypescriptConfigOptions): TypescriptConfig
```

* **options** (<code>[TypescriptConfigOptions](#projen-typescriptconfigoptions)</code>)  TypescriptConfigOptions.
  * **compilerOptions** (<code>[TypeScriptCompilerOptions](#projen-typescriptcompileroptions)</code>)  Compiler options to use. 
  * **exclude** (<code>Array<string></code>)  Filters results from the "include" option. __*Default*__: node_modules is excluded by default
  * **fileName** (<code>string</code>)  *No description* __*Default*__: "tsconfig.json"
  * **include** (<code>Array<string></code>)  Specifies a list of glob patterns that match TypeScript files to be included in compilation. __*Default*__: all .ts files recursively

__Returns__:
* <code>[TypescriptConfig](#projen-typescriptconfig)</code>



## class JsiiProject 🔹 <a id="projen-jsiiproject"></a>

Multi-language jsii library project.

__Extends__: [TypeScriptProject](#projen-typescriptproject)

### Initializer




```ts
new JsiiProject(options: JsiiProjectOptions)
```

* **options** (<code>[JsiiProjectOptions](#projen-jsiiprojectoptions)</code>)  *No description*
  * **mkdocs** (<code>boolean</code>)  Whether to enable MkDocs. __*Default*__: false
  * **mkdocsConfig** (<code>[MkDocsProps](#projen-mkdocsprops)</code>)  If mkdocs is true, then this can be used to customize the mkdocs site. __*Default*__: off
  * **outdir** (<code>string</code>)  The root directory of the project. __*Default*__: "."
  * **parent** (<code>[Project](#projen-project)</code>)  The parent project, if this project is part of a bigger project. __*Optional*__
  * **allowLibraryDependencies** (<code>boolean</code>)  Allow the project to include `peerDependencies` and `bundledDependencies`. __*Default*__: true
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files on git. __*Default*__: true
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. __*Default*__: true
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. __*Optional*__
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. __*Default*__: true
  * **bundledDependencies** (<code>Array<string></code>)  *No description* __*Optional*__
  * **bundledDeps** (<code>Array<string></code>)  List of dependencies to bundle into this module. __*Optional*__
  * **codeCov** (<code>boolean</code>)  Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret. __*Default*__: false
  * **codeCovTokenSecret** (<code>string</code>)  Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories. __*Default*__: if this option is not specified, only public repositories are supported
  * **copyrightOwner** (<code>string</code>)  License copyright owner. __*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. __*Default*__: current year
  * **defaultReleaseBranch** (<code>string</code>)  The name of the main release branch. __*Default*__: "master"
  * **dependabot** (<code>boolean</code>)  Include dependabot configuration. __*Default*__: true
  * **dependabotOptions** (<code>[DependabotOptions](#projen-github-dependabotoptions)</code>)  Options for dependabot. __*Default*__: default options
  * **dependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **deps** (<code>Array<string></code>)  Runtime dependencies of this module. __*Default*__: []
  * **devDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **devDeps** (<code>Array<string></code>)  Build dependencies for this module. __*Default*__: []
  * **entrypoint** (<code>string</code>)  Module entrypoint (`main` in `package.json`). __*Default*__: "lib/index.js"
  * **keywords** (<code>Array<string></code>)  Keywords to include in `package.json`. __*Optional*__
  * **libdir** (<code>string</code>)  Compiler artifacts output directory. __*Default*__: "lib"
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). __*Default*__: no max
  * **mergify** (<code>boolean</code>)  Adds mergify configuration. __*Default*__: true
  * **mergifyAutoMergeLabel** (<code>string</code>)  Automatically merge PRs that build successfully and have this label. __*Default*__: "auto-merge"
  * **mergifyOptions** (<code>[MergifyOptions](#projen-github-mergifyoptions)</code>)  Options for mergify. __*Default*__: default options
  * **minNodeVersion** (<code>string</code>)  Minimum Node.js version to require via package.json `engines` (inclusive). __*Default*__: no "engines" specified
  * **npmDistTag** (<code>string</code>)  The dist-tag to use when releasing to npm. __*Default*__: "latest"
  * **npmignore** (<code>Array<string></code>)  Additional entries to .npmignore. __*Optional*__
  * **npmignoreEnabled** (<code>boolean</code>)  Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs. __*Default*__: true
  * **npmRegistry** (<code>string</code>)  The registry url to use when releasing packages. __*Default*__: "registry.npmjs.org"
  * **npmTaskExecution** (<code>[NpmTaskExecution](#projen-npmtaskexecution)</code>)  Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz). __*Default*__: NpmTaskExecution.PROJEN
  * **packageManager** (<code>[NodePackageManager](#projen-nodepackagemanager)</code>)  The Node Package Manager used to execute scripts. __*Default*__: NodePackageManager.YARN
  * **peerDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  Options for `peerDeps`. __*Optional*__
  * **peerDeps** (<code>Array<string></code>)  Peer dependencies for this module. __*Default*__: []
  * **projenCommand** (<code>string</code>)  The shell command to use in order to run the projen CLI. __*Default*__: "npx projen"
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. __*Default*__: true
  * **projenUpgradeAutoMerge** (<code>boolean</code>)  Automatically merge projen upgrade PRs when build passes. __*Default*__: "true" if mergify auto-merge is enabled (default)
  * **projenUpgradeSchedule** (<code>Array<string></code>)  Customize the projenUpgrade schedule in cron expression. __*Default*__: [ "0 6 * * *" ]
  * **projenUpgradeSecret** (<code>string</code>)  Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`). __*Default*__: no automatic projen upgrade pull requests
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. __*Default*__: Semver.latest()
  * **pullRequestTemplate** (<code>boolean</code>)  Include a GitHub pull request template. __*Default*__: true
  * **pullRequestTemplateContents** (<code>string</code>)  The contents of the pull request template. __*Default*__: default content
  * **rebuildBot** (<code>boolean</code>)  Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request. __*Default*__: true
  * **rebuildBotCommand** (<code>string</code>)  The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch. __*Default*__: "rebuild"
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. __*Default*__: [ "master" ]
  * **releaseEveryCommit** (<code>boolean</code>)  Automatically release new versions every commit to one of branches in `releaseBranches`. __*Default*__: true
  * **releaseSchedule** (<code>string</code>)  CRON schedule to trigger new releases. __*Default*__: no scheduled releases
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. __*Default*__: false
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "master" when new versions are bumped. __*Default*__: true
  * **scripts** (<code>Map<string, string></code>)  npm scripts to include. __*Default*__: {}
  * **srcdir** (<code>string</code>)  Typescript sources directory. __*Default*__: "src"
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
  * **compatIgnore** (<code>string</code>)  Name of the ignore file for API compatibility tests. __*Default*__: ".compatignore"
  * **description** (<code>string</code>)  Library description. __*Optional*__
  * **docgen** (<code>boolean</code>)  Automatically generate API.md from jsii. __*Default*__: true
  * **dotnet** (<code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code>)  *No description* __*Optional*__
  * **eslint** (<code>boolean</code>)  Install eslint. __*Default*__: true
  * **java** (<code>[JsiiJavaTarget](#projen-jsiijavatarget)</code>)  *No description* __*Optional*__
  * **jest** (<code>boolean</code>)  Use jest for unit tests. __*Default*__: true
  * **jestOptions** (<code>[JestOptions](#projen-jestoptions)</code>)  Jest options. __*Default*__: defaults
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

Represents a JSON file.

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
  * **marker** (<code>boolean</code>)  Adds the projen marker as a "JSON-comment" to the root object. __*Default*__: false
  * **obj** (<code>any</code>)  The object that will be serialized. __*Default*__: {} an empty object (use `file.obj` to mutate).
  * **omitEmpty** (<code>boolean</code>)  Omits empty objects and arrays. __*Default*__: false



### Properties


Name | Type | Description 
-----|------|-------------
**marker**🔹 | <code>boolean</code> | Indicates if the projen marker JSON-comment will be added to the output object.
**obj**🔹 | <code>json</code> | The output object.
**omitEmpty**🔹 | <code>boolean</code> | Indicates if empty objects and arrays are omitted from the output object.

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



## class Makefile 🔹 <a id="projen-makefile"></a>

Minimal Makefile.

__Extends__: [FileBase](#projen-filebase)

### Initializer




```ts
new Makefile(project: Project, filePath: string, options?: MakefileOptions)
```

* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **filePath** (<code>string</code>)  *No description*
* **options** (<code>[MakefileOptions](#projen-makefileoptions)</code>)  *No description*
  * **committed** (<code>boolean</code>)  Indicates whether this file should be committed to git or ignored. __*Default*__: true
  * **editGitignore** (<code>boolean</code>)  Update the project's .gitignore file. __*Default*__: true
  * **readonly** (<code>boolean</code>)  Whether the generated file should be readonly. __*Default*__: true
  * **all** (<code>Array<string></code>)  List of targets to build when Make is invoked without specifying any targets. __*Default*__: []
  * **rules** (<code>Array<[Rule](#projen-rule)></code>)  Rules to include in the Makefile. __*Default*__: []



### Properties


Name | Type | Description 
-----|------|-------------
**rules**🔹 | <code>Array<[Rule](#projen-rule)></code> | List of rule definitions.

### Methods


#### addAll(target)🔹 <a id="projen-makefile-addall"></a>

Add a target to all.

```ts
addAll(target: string): Makefile
```

* **target** (<code>string</code>)  *No description*

__Returns__:
* <code>[Makefile](#projen-makefile)</code>

#### addAlls(...targets)🔹 <a id="projen-makefile-addalls"></a>

Add multiple targets to all.

```ts
addAlls(...targets: string[]): Makefile
```

* **targets** (<code>string</code>)  *No description*

__Returns__:
* <code>[Makefile](#projen-makefile)</code>

#### addRule(rule)🔹 <a id="projen-makefile-addrule"></a>

Add a rule to the Makefile.

```ts
addRule(rule: Rule): Makefile
```

* **rule** (<code>[Rule](#projen-rule)</code>)  *No description*
  * **targets** (<code>Array<string></code>)  Files to be created or updated by this rule. 
  * **phony** (<code>boolean</code>)  Marks whether the target is phony. __*Default*__: false
  * **prerequisites** (<code>Array<string></code>)  Files that are used as inputs to create a target. __*Default*__: []
  * **recipe** (<code>Array<string></code>)  Commands that are run (using prerequisites as inputs) to create a target. __*Default*__: []

__Returns__:
* <code>[Makefile](#projen-makefile)</code>

#### addRules(...rules)🔹 <a id="projen-makefile-addrules"></a>

Add multiple rules to the Makefile.

```ts
addRules(...rules: Rule[]): Makefile
```

* **rules** (<code>[Rule](#projen-rule)</code>)  *No description*
  * **targets** (<code>Array<string></code>)  Files to be created or updated by this rule. 
  * **phony** (<code>boolean</code>)  Marks whether the target is phony. __*Default*__: false
  * **prerequisites** (<code>Array<string></code>)  Files that are used as inputs to create a target. __*Default*__: []
  * **recipe** (<code>Array<string></code>)  Commands that are run (using prerequisites as inputs) to create a target. __*Default*__: []

__Returns__:
* <code>[Makefile](#projen-makefile)</code>

#### protected synthesizeContent(resolver)🔹 <a id="projen-makefile-synthesizecontent"></a>

Implemented by derived classes and returns the contents of the file to emit.

```ts
protected synthesizeContent(resolver: IResolver): string
```

* **resolver** (<code>[IResolver](#projen-iresolver)</code>)  *No description*

__Returns__:
* <code>string</code>



## class MkDocs 🔹 <a id="projen-mkdocs"></a>



__Extends__: [Component](#projen-component)

### Initializer




```ts
new MkDocs(project: Project, props?: MkDocsProps)
```

* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **props** (<code>[MkDocsProps](#projen-mkdocsprops)</code>)  *No description*
  * **siteName** (<code>string</code>)  The documentation site name This is the only required mkdocs.yml param. 
  * **copyright** (<code>string</code>)  The documentation site copyright. __*Default*__: : `project.copyright`
  * **docsDir** (<code>string</code>)  The directory to put docs in. __*Default*__: "docs-mk" docs is the default but is shared with docgen for API via typedoc mkdocs is for themes see `MkDocsThemeProps`
  * **editUri** (<code>string</code>)  The Browser URL to edit. __*Default*__: : ""
  * **extra** (<code>[MkDocsExtraProps](#projen-mkdocsextraprops)</code>)  Extra stuff to embed. __*Optional*__
  * **extraCss** (<code>Array<string></code>)  List of CSS Files to embed. __*Default*__: []
  * **extraJavaScript** (<code>json</code>)  List of JavaScript Files to embed. __*Default*__: []
  * **googleAnalytics** (<code>Array<string></code>)  *No description* __*Default*__: []
  * **markdownExtensions** (<code>[MkDocsMarkDownExtensionProps](#projen-mkdocsmarkdownextensionprops)</code>)  Extensions to load. __*Optional*__
  * **nav** (<code>[MkDocsNavProps](#projen-mkdocsnavprops)</code>)  List of the pages in the `docsDir`. __*Optional*__
  * **plugins** (<code>[MkDocsMarkDownPluginProps](#projen-mkdocsmarkdownpluginprops)</code>)  Plugins to load https://github.com/mkdocs/mkdocs/wiki/MkDocs-Plugins. __*Optional*__
  * **remoteBranch** (<code>string</code>)  What branch to use when gh-deploy. __*Default*__: "gh-pages"
  * **remoteName** (<code>string</code>)  What remote to use when gh-deploy. __*Default*__: origin
  * **repoName** (<code>string</code>)  The repository name. __*Default*__: : parsed from `project.repository`
  * **repoUrl** (<code>string</code>)  The repository url. __*Default*__: : parsed from `project.repository` minus .git
  * **siteAuthor** (<code>string</code>)  The documentation site author. __*Default*__: `project.author`
  * **siteDescription** (<code>string</code>)  The documentation site description. __*Default*__: `project.description`
  * **siteUrl** (<code>string</code>)  The documentation site url. __*Optional*__
  * **theme** (<code>[MkDocsThemeProps](#projen-mkdocsthemeprops)</code>)  The `mkdocs` theme https://github.com/mkdocs/mkdocs/wiki/MkDocs-Themes. __*Optional*__




## class NodeProject 🔹 <a id="projen-nodeproject"></a>

Node.js project.

__Extends__: [Project](#projen-project)

### Initializer




```ts
new NodeProject(options: NodeProjectOptions)
```

* **options** (<code>[NodeProjectOptions](#projen-nodeprojectoptions)</code>)  *No description*
  * **mkdocs** (<code>boolean</code>)  Whether to enable MkDocs. __*Default*__: false
  * **mkdocsConfig** (<code>[MkDocsProps](#projen-mkdocsprops)</code>)  If mkdocs is true, then this can be used to customize the mkdocs site. __*Default*__: off
  * **outdir** (<code>string</code>)  The root directory of the project. __*Default*__: "."
  * **parent** (<code>[Project](#projen-project)</code>)  The parent project, if this project is part of a bigger project. __*Optional*__
  * **allowLibraryDependencies** (<code>boolean</code>)  Allow the project to include `peerDependencies` and `bundledDependencies`. __*Default*__: true
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files on git. __*Default*__: true
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. __*Default*__: true
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. __*Optional*__
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. __*Default*__: true
  * **bundledDependencies** (<code>Array<string></code>)  *No description* __*Optional*__
  * **bundledDeps** (<code>Array<string></code>)  List of dependencies to bundle into this module. __*Optional*__
  * **codeCov** (<code>boolean</code>)  Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret. __*Default*__: false
  * **codeCovTokenSecret** (<code>string</code>)  Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories. __*Default*__: if this option is not specified, only public repositories are supported
  * **copyrightOwner** (<code>string</code>)  License copyright owner. __*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. __*Default*__: current year
  * **defaultReleaseBranch** (<code>string</code>)  The name of the main release branch. __*Default*__: "master"
  * **dependabot** (<code>boolean</code>)  Include dependabot configuration. __*Default*__: true
  * **dependabotOptions** (<code>[DependabotOptions](#projen-github-dependabotoptions)</code>)  Options for dependabot. __*Default*__: default options
  * **dependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **deps** (<code>Array<string></code>)  Runtime dependencies of this module. __*Default*__: []
  * **devDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **devDeps** (<code>Array<string></code>)  Build dependencies for this module. __*Default*__: []
  * **entrypoint** (<code>string</code>)  Module entrypoint (`main` in `package.json`). __*Default*__: "lib/index.js"
  * **keywords** (<code>Array<string></code>)  Keywords to include in `package.json`. __*Optional*__
  * **libdir** (<code>string</code>)  Compiler artifacts output directory. __*Default*__: "lib"
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). __*Default*__: no max
  * **mergify** (<code>boolean</code>)  Adds mergify configuration. __*Default*__: true
  * **mergifyAutoMergeLabel** (<code>string</code>)  Automatically merge PRs that build successfully and have this label. __*Default*__: "auto-merge"
  * **mergifyOptions** (<code>[MergifyOptions](#projen-github-mergifyoptions)</code>)  Options for mergify. __*Default*__: default options
  * **minNodeVersion** (<code>string</code>)  Minimum Node.js version to require via package.json `engines` (inclusive). __*Default*__: no "engines" specified
  * **npmDistTag** (<code>string</code>)  The dist-tag to use when releasing to npm. __*Default*__: "latest"
  * **npmignore** (<code>Array<string></code>)  Additional entries to .npmignore. __*Optional*__
  * **npmignoreEnabled** (<code>boolean</code>)  Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs. __*Default*__: true
  * **npmRegistry** (<code>string</code>)  The registry url to use when releasing packages. __*Default*__: "registry.npmjs.org"
  * **npmTaskExecution** (<code>[NpmTaskExecution](#projen-npmtaskexecution)</code>)  Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz). __*Default*__: NpmTaskExecution.PROJEN
  * **packageManager** (<code>[NodePackageManager](#projen-nodepackagemanager)</code>)  The Node Package Manager used to execute scripts. __*Default*__: NodePackageManager.YARN
  * **peerDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  Options for `peerDeps`. __*Optional*__
  * **peerDeps** (<code>Array<string></code>)  Peer dependencies for this module. __*Default*__: []
  * **projenCommand** (<code>string</code>)  The shell command to use in order to run the projen CLI. __*Default*__: "npx projen"
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. __*Default*__: true
  * **projenUpgradeAutoMerge** (<code>boolean</code>)  Automatically merge projen upgrade PRs when build passes. __*Default*__: "true" if mergify auto-merge is enabled (default)
  * **projenUpgradeSchedule** (<code>Array<string></code>)  Customize the projenUpgrade schedule in cron expression. __*Default*__: [ "0 6 * * *" ]
  * **projenUpgradeSecret** (<code>string</code>)  Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`). __*Default*__: no automatic projen upgrade pull requests
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. __*Default*__: Semver.latest()
  * **pullRequestTemplate** (<code>boolean</code>)  Include a GitHub pull request template. __*Default*__: true
  * **pullRequestTemplateContents** (<code>string</code>)  The contents of the pull request template. __*Default*__: default content
  * **rebuildBot** (<code>boolean</code>)  Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request. __*Default*__: true
  * **rebuildBotCommand** (<code>string</code>)  The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch. __*Default*__: "rebuild"
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. __*Default*__: [ "master" ]
  * **releaseEveryCommit** (<code>boolean</code>)  Automatically release new versions every commit to one of branches in `releaseBranches`. __*Default*__: true
  * **releaseSchedule** (<code>string</code>)  CRON schedule to trigger new releases. __*Default*__: no scheduled releases
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. __*Default*__: false
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "master" when new versions are bumped. __*Default*__: true
  * **scripts** (<code>Map<string, string></code>)  npm scripts to include. __*Default*__: {}
  * **srcdir** (<code>string</code>)  Typescript sources directory. __*Default*__: "src"
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
  * **jest** (<code>boolean</code>)  Setup jest unit tests. __*Default*__: true
  * **jestOptions** (<code>[JestOptions](#projen-jestoptions)</code>)  Jest options. __*Default*__: default options
  * **license** (<code>string</code>)  License's SPDX identifier. __*Optional*__
  * **licensed** (<code>boolean</code>)  Indicates if a license should be added. __*Default*__: true
  * **repository** (<code>string</code>)  The repository is the location where the actual code for your package lives. __*Optional*__
  * **repositoryDirectory** (<code>string</code>)  If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives. __*Optional*__
  * **stability** (<code>string</code>)  Package's Stability. __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**allowLibraryDependencies**🔹 | <code>boolean</code> | <span></span>
**antitamper**🔹 | <code>boolean</code> | Indicates if workflows have anti-tamper checks.
**buildTask**🔹 | <code>[Task](#projen-tasks-task)</code> | The task resposible for a full release build.
**compileTask**🔹 | <code>[Task](#projen-tasks-task)</code> | Compiles the code.
**entrypoint**🔹 | <code>string</code> | <span></span>
**installWorkflowSteps**🔹 | <code>Array<any></code> | <span></span>
**manifest**🔹 | <code>any</code> | <span></span>
**npmDistTag**🔹 | <code>string</code> | <span></span>
**npmRegistry**🔹 | <code>string</code> | <span></span>
**npmTaskExecution**🔹 | <code>[NpmTaskExecution](#projen-npmtaskexecution)</code> | Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz).
**packageManager**🔹 | <code>[NodePackageManager](#projen-nodepackagemanager)</code> | The package manager to use.
**projenCommand**🔹 | <code>string</code> | The command to use in order to run the projen CLI.
**runScriptCommand**🔹 | <code>string</code> | The command to use to run scripts (e.g. `yarn run` or `npm run` depends on the package manager).
**testTask**🔹 | <code>[Task](#projen-tasks-task)</code> | Tests the code.
**testdir**🔹 | <code>string</code> | The directory in which tests reside.
**buildWorkflow**?🔹 | <code>[GithubWorkflow](#projen-github-githubworkflow)</code> | The PR build GitHub workflow.<br/>__*Optional*__
**buildWorkflowJobId**?🔹 | <code>string</code> | __*Optional*__
**jest**?🔹 | <code>[Jest](#projen-jest)</code> | The Jest configuration (if enabled).<br/>__*Optional*__
**maxNodeVersion**?🔹 | <code>string</code> | __*Optional*__
**mergify**?🔹 | <code>[Mergify](#projen-github-mergify)</code> | __*Optional*__
**minNodeVersion**?🔹 | <code>string</code> | __*Optional*__
**npmignore**?🔹 | <code>[IgnoreFile](#projen-ignorefile)</code> | __*Optional*__
**releaseWorkflow**?🔹 | <code>[GithubWorkflow](#projen-github-githubworkflow)</code> | The release GitHub workflow.<br/>__*Optional*__
**releaseWorkflowJobId**?🔹 | <code>string</code> | __*Optional*__

### Methods


#### addBins(bins)🔹 <a id="projen-nodeproject-addbins"></a>



```ts
addBins(bins: Map<string, string>): void
```

* **bins** (<code>Map<string, string></code>)  *No description*




#### addBuildCommand(...commands)⚠️ <a id="projen-nodeproject-addbuildcommand"></a>

DEPRECATED.

```ts
addBuildCommand(...commands: string[]): void
```

* **commands** (<code>string</code>)  *No description*




#### addBundledDependencies(...deps)⚠️ <a id="projen-nodeproject-addbundleddependencies"></a>



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




#### addCompileCommand(...commands)⚠️ <a id="projen-nodeproject-addcompilecommand"></a>

DEPRECATED.

```ts
addCompileCommand(...commands: string[]): void
```

* **commands** (<code>string</code>)  *No description*




#### addDependencies(deps, bundle?)⚠️ <a id="projen-nodeproject-adddependencies"></a>



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




#### addDevDependencies(deps)⚠️ <a id="projen-nodeproject-adddevdependencies"></a>



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

Directly set fields in `package.json`.

```ts
addFields(fields: Map<string, any>): void
```

* **fields** (<code>Map<string, any></code>)  The fields to set.




#### addKeywords(...keywords)🔹 <a id="projen-nodeproject-addkeywords"></a>

Adds keywords to package.json (deduplicated).

```ts
addKeywords(...keywords: string[]): void
```

* **keywords** (<code>string</code>)  The keywords to add.




#### addPeerDependencies(deps, options?)⚠️ <a id="projen-nodeproject-addpeerdependencies"></a>



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




#### addTestCommand(...commands)⚠️ <a id="projen-nodeproject-addtestcommand"></a>

DEPRECATED.

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

#### postSynthesize()🔹 <a id="projen-nodeproject-postsynthesize"></a>

Called after all components are synthesized.

Order is *not* guaranteed.

```ts
postSynthesize(): void
```





#### preSynthesize()🔹 <a id="projen-nodeproject-presynthesize"></a>

Called before all components are synthesized.

```ts
preSynthesize(): void
```





#### removeScript(name)🔹 <a id="projen-nodeproject-removescript"></a>

Removes the npm script (always successful).

```ts
removeScript(name: string): void
```

* **name** (<code>string</code>)  The name of the script.




#### runTaskCommand(task)🔹 <a id="projen-nodeproject-runtaskcommand"></a>

Returns the shell command to execute in order to run a task.

If
npmTaskExecution is set to PROJEN, the command will be `npx projen TASK`.
If it is set to SHELL, the command will be `yarn run TASK` (or `npm run
TASK`).

```ts
runTaskCommand(task: Task): string
```

* **task** (<code>[Task](#projen-tasks-task)</code>)  The task for which the command is required.

__Returns__:
* <code>string</code>

#### setScript(name, command)🔹 <a id="projen-nodeproject-setscript"></a>

Replaces the contents of an npm package.json script.

```ts
setScript(name: string, command: string): void
```

* **name** (<code>string</code>)  The script name.
* **command** (<code>string</code>)  The command to execute.






## class Project 🔹 <a id="projen-project"></a>

Base project.


### Initializer




```ts
new Project(options?: ProjectOptions)
```

* **options** (<code>[ProjectOptions](#projen-projectoptions)</code>)  *No description*
  * **mkdocs** (<code>boolean</code>)  Whether to enable MkDocs. __*Default*__: false
  * **mkdocsConfig** (<code>[MkDocsProps](#projen-mkdocsprops)</code>)  If mkdocs is true, then this can be used to customize the mkdocs site. __*Default*__: off
  * **outdir** (<code>string</code>)  The root directory of the project. __*Default*__: "."
  * **parent** (<code>[Project](#projen-project)</code>)  The parent project, if this project is part of a bigger project. __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**components**🔹 | <code>Array<[Component](#projen-component)></code> | Returns all the components within this project.
**files**🔹 | <code>Array<[FileBase](#projen-filebase)></code> | All files in this project.
**gitignore**🔹 | <code>[IgnoreFile](#projen-ignorefile)</code> | .gitignore.
**outdir**🔹 | <code>string</code> | Absolute output directory of this project.
**root**🔹 | <code>[Project](#projen-project)</code> | The root project.
**tasks**🔹 | <code>[Tasks](#projen-tasks-tasks)</code> | <span></span>
**github**?🔹 | <code>[GitHub](#projen-github-github)</code> | Access all github components.<br/>__*Optional*__
**parent**?🔹 | <code>[Project](#projen-project)</code> | A parent project.<br/>__*Optional*__
**vscode**?🔹 | <code>[VsCode](#projen-vscode-vscode)</code> | Access all VSCode components.<br/>__*Optional*__

### Methods


#### addExcludeFromCleanup(...globs)🔹 <a id="projen-project-addexcludefromcleanup"></a>

Exclude the matching files from pre-synth cleanup.

Can be used when, for example, some
source files include the projen marker and we don't want them to be erased during synth.

```ts
addExcludeFromCleanup(...globs: string[]): void
```

* **globs** (<code>string</code>)  The glob patterns to match.




#### addTask(name, props?)🔹 <a id="projen-project-addtask"></a>

Adds a new task to this project.

This will fail if the project already has
a task with this name.

```ts
addTask(name: string, props?: TaskOptions): Task
```

* **name** (<code>string</code>)  The task name to add.
* **props** (<code>[TaskOptions](#projen-tasks-taskoptions)</code>)  Task properties.
  * **category** (<code>[TaskCategory](#projen-tasks-taskcategory)</code>)  Category for start menu. __*Default*__: TaskCategory.MISC
  * **condition** (<code>string</code>)  A shell command which determines if the this task should be executed. __*Optional*__
  * **description** (<code>string</code>)  The description of this build command. __*Default*__: the task name
  * **env** (<code>Map<string, string></code>)  Defines environment variables for the execution of this task. __*Default*__: {}
  * **exec** (<code>string</code>)  Shell command to execute as the first command of the task. __*Default*__: add steps using `task.exec(command)` or `task.spawn(subtask)`

__Returns__:
* <code>[Task](#projen-tasks-task)</code>

#### addTip(message)🔹 <a id="projen-project-addtip"></a>

Prints a "tip" message during synthesis.

```ts
addTip(message: string): void
```

* **message** (<code>string</code>)  The message.




#### postSynthesize()🔹 <a id="projen-project-postsynthesize"></a>

Called after all components are synthesized.

Order is *not* guaranteed.

```ts
postSynthesize(): void
```





#### preSynthesize()🔹 <a id="projen-project-presynthesize"></a>

Called before all components are synthesized.

```ts
preSynthesize(): void
```





#### synth()🔹 <a id="projen-project-synth"></a>

Synthesize all project files into `outdir`.

1. Call "this.preSynthesize()"
2. Delete all generated files
3. Synthesize all sub-projects
4. Synthezize all components of this project
5. Call "postSynthesize()" for all components of this project
6. Call "this.postSynthesize()"

```ts
synth(): void
```





#### tryFindFile(filePath)🔹 <a id="projen-project-tryfindfile"></a>

Finds a file at the specified relateive path within this project and all its subprojects.

```ts
tryFindFile(filePath: string): FileBase
```

* **filePath** (<code>string</code>)  The file path.

__Returns__:
* <code>[FileBase](#projen-filebase)</code>

#### tryFindJsonFile(filePath)🔹 <a id="projen-project-tryfindjsonfile"></a>

Finds a json file by name.

```ts
tryFindJsonFile(filePath: string): JsonFile
```

* **filePath** (<code>string</code>)  The file path.

__Returns__:
* <code>[JsonFile](#projen-jsonfile)</code>



## class SampleDir 🔹 <a id="projen-sampledir"></a>

Renders the given files into the directory if the directory does not exist.

Use this to create sample code files

__Extends__: [Component](#projen-component)

### Initializer


Create sample files in the given directory if the given directory does not exist.

```ts
new SampleDir(project: Project, dir: string, options: SampleDirOptions)
```

* **project** (<code>[Project](#projen-project)</code>)  Parent project to add files to.
* **dir** (<code>string</code>)  directory to add files to.
* **options** (<code>[SampleDirOptions](#projen-samplediroptions)</code>)  options for which files to create.
  * **files** (<code>Map<string, string></code>)  The files to render into the directory. 


### Methods


#### synthesize()🔹 <a id="projen-sampledir-synthesize"></a>

Synthesizes files to the project output directory.

```ts
synthesize(): void
```







## class SampleFile 🔹 <a id="projen-samplefile"></a>

Produces a file with the given contents but only once, if the file doesn't already exist.

Use this for creating example code files or other resources.

__Extends__: [Component](#projen-component)

### Initializer


Creates a new SampleFile object.

```ts
new SampleFile(project: Project, filePath: string, options: SampleFileOptions)
```

* **project** (<code>[Project](#projen-project)</code>)  - the project to tie this file to.
* **filePath** (<code>string</code>)  - the relative path in the project o put the file.
* **options** (<code>[SampleFileOptions](#projen-samplefileoptions)</code>)  - the options for the file.
  * **contents** (<code>string</code>)  The contents of the file to write. 


### Methods


#### synthesize()🔹 <a id="projen-samplefile-synthesize"></a>

Synthesizes files to the project output directory.

```ts
synthesize(): void
```







## class Semver ⚠️ <a id="projen-semver"></a>





### Properties


Name | Type | Description 
-----|------|-------------
**spec**⚠️ | <code>string</code> | <span></span>
**mode**?⚠️ | <code>string</code> | __*Optional*__
**version**?⚠️ | <code>string</code> | __*Optional*__

### Methods


#### *static* caret(version)⚠️ <a id="projen-semver-caret"></a>

Accept any minor version.

>= version
< next major version

```ts
static caret(version: string): Semver
```

* **version** (<code>string</code>)  *No description*

__Returns__:
* <code>[Semver](#projen-semver)</code>

#### *static* latest()⚠️ <a id="projen-semver-latest"></a>

Latest version.

```ts
static latest(): Semver
```


__Returns__:
* <code>[Semver](#projen-semver)</code>

#### *static* of(spec)⚠️ <a id="projen-semver-of"></a>



```ts
static of(spec: string): Semver
```

* **spec** (<code>string</code>)  *No description*

__Returns__:
* <code>[Semver](#projen-semver)</code>

#### *static* pinned(version)⚠️ <a id="projen-semver-pinned"></a>

Accept only an exact version.

```ts
static pinned(version: string): Semver
```

* **version** (<code>string</code>)  *No description*

__Returns__:
* <code>[Semver](#projen-semver)</code>

#### *static* tilde(version)⚠️ <a id="projen-semver-tilde"></a>

Accept patches.

>= version
< next minor version

```ts
static tilde(version: string): Semver
```

* **version** (<code>string</code>)  *No description*

__Returns__:
* <code>[Semver](#projen-semver)</code>



## class TextFile 🔹 <a id="projen-textfile"></a>

A text file.

__Extends__: [FileBase](#projen-filebase)

### Initializer


Defines a text file.

```ts
new TextFile(project: Project, filePath: string, options?: TextFileOptions)
```

* **project** (<code>[Project](#projen-project)</code>)  The project.
* **filePath** (<code>string</code>)  File path.
* **options** (<code>[TextFileOptions](#projen-textfileoptions)</code>)  Options.
  * **committed** (<code>boolean</code>)  Indicates whether this file should be committed to git or ignored. __*Default*__: true
  * **editGitignore** (<code>boolean</code>)  Update the project's .gitignore file. __*Default*__: true
  * **readonly** (<code>boolean</code>)  Whether the generated file should be readonly. __*Default*__: true
  * **lines** (<code>Array<string></code>)  The contents of the text file. __*Default*__: [] empty file


### Methods


#### addLine(line)🔹 <a id="projen-textfile-addline"></a>

Adds a line to the text file.

```ts
addLine(line: string): void
```

* **line** (<code>string</code>)  the line to add (can use tokens).




#### protected synthesizeContent(_)🔹 <a id="projen-textfile-synthesizecontent"></a>

Implemented by derived classes and returns the contents of the file to emit.

```ts
protected synthesizeContent(_: IResolver): string
```

* **_** (<code>[IResolver](#projen-iresolver)</code>)  *No description*

__Returns__:
* <code>string</code>



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
  * **mkdocs** (<code>boolean</code>)  Whether to enable MkDocs. __*Default*__: false
  * **mkdocsConfig** (<code>[MkDocsProps](#projen-mkdocsprops)</code>)  If mkdocs is true, then this can be used to customize the mkdocs site. __*Default*__: off
  * **outdir** (<code>string</code>)  The root directory of the project. __*Default*__: "."
  * **parent** (<code>[Project](#projen-project)</code>)  The parent project, if this project is part of a bigger project. __*Optional*__
  * **allowLibraryDependencies** (<code>boolean</code>)  Allow the project to include `peerDependencies` and `bundledDependencies`. __*Default*__: true
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files on git. __*Default*__: true
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. __*Default*__: true
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. __*Optional*__
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. __*Default*__: true
  * **bundledDependencies** (<code>Array<string></code>)  *No description* __*Optional*__
  * **bundledDeps** (<code>Array<string></code>)  List of dependencies to bundle into this module. __*Optional*__
  * **codeCov** (<code>boolean</code>)  Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret. __*Default*__: false
  * **codeCovTokenSecret** (<code>string</code>)  Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories. __*Default*__: if this option is not specified, only public repositories are supported
  * **copyrightOwner** (<code>string</code>)  License copyright owner. __*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. __*Default*__: current year
  * **defaultReleaseBranch** (<code>string</code>)  The name of the main release branch. __*Default*__: "master"
  * **dependabot** (<code>boolean</code>)  Include dependabot configuration. __*Default*__: true
  * **dependabotOptions** (<code>[DependabotOptions](#projen-github-dependabotoptions)</code>)  Options for dependabot. __*Default*__: default options
  * **dependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **deps** (<code>Array<string></code>)  Runtime dependencies of this module. __*Default*__: []
  * **devDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **devDeps** (<code>Array<string></code>)  Build dependencies for this module. __*Default*__: []
  * **entrypoint** (<code>string</code>)  Module entrypoint (`main` in `package.json`). __*Default*__: "lib/index.js"
  * **keywords** (<code>Array<string></code>)  Keywords to include in `package.json`. __*Optional*__
  * **libdir** (<code>string</code>)  Compiler artifacts output directory. __*Default*__: "lib"
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). __*Default*__: no max
  * **mergify** (<code>boolean</code>)  Adds mergify configuration. __*Default*__: true
  * **mergifyAutoMergeLabel** (<code>string</code>)  Automatically merge PRs that build successfully and have this label. __*Default*__: "auto-merge"
  * **mergifyOptions** (<code>[MergifyOptions](#projen-github-mergifyoptions)</code>)  Options for mergify. __*Default*__: default options
  * **minNodeVersion** (<code>string</code>)  Minimum Node.js version to require via package.json `engines` (inclusive). __*Default*__: no "engines" specified
  * **npmDistTag** (<code>string</code>)  The dist-tag to use when releasing to npm. __*Default*__: "latest"
  * **npmignore** (<code>Array<string></code>)  Additional entries to .npmignore. __*Optional*__
  * **npmignoreEnabled** (<code>boolean</code>)  Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs. __*Default*__: true
  * **npmRegistry** (<code>string</code>)  The registry url to use when releasing packages. __*Default*__: "registry.npmjs.org"
  * **npmTaskExecution** (<code>[NpmTaskExecution](#projen-npmtaskexecution)</code>)  Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz). __*Default*__: NpmTaskExecution.PROJEN
  * **packageManager** (<code>[NodePackageManager](#projen-nodepackagemanager)</code>)  The Node Package Manager used to execute scripts. __*Default*__: NodePackageManager.YARN
  * **peerDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  Options for `peerDeps`. __*Optional*__
  * **peerDeps** (<code>Array<string></code>)  Peer dependencies for this module. __*Default*__: []
  * **projenCommand** (<code>string</code>)  The shell command to use in order to run the projen CLI. __*Default*__: "npx projen"
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. __*Default*__: true
  * **projenUpgradeAutoMerge** (<code>boolean</code>)  Automatically merge projen upgrade PRs when build passes. __*Default*__: "true" if mergify auto-merge is enabled (default)
  * **projenUpgradeSchedule** (<code>Array<string></code>)  Customize the projenUpgrade schedule in cron expression. __*Default*__: [ "0 6 * * *" ]
  * **projenUpgradeSecret** (<code>string</code>)  Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`). __*Default*__: no automatic projen upgrade pull requests
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. __*Default*__: Semver.latest()
  * **pullRequestTemplate** (<code>boolean</code>)  Include a GitHub pull request template. __*Default*__: true
  * **pullRequestTemplateContents** (<code>string</code>)  The contents of the pull request template. __*Default*__: default content
  * **rebuildBot** (<code>boolean</code>)  Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request. __*Default*__: true
  * **rebuildBotCommand** (<code>string</code>)  The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch. __*Default*__: "rebuild"
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. __*Default*__: [ "master" ]
  * **releaseEveryCommit** (<code>boolean</code>)  Automatically release new versions every commit to one of branches in `releaseBranches`. __*Default*__: true
  * **releaseSchedule** (<code>string</code>)  CRON schedule to trigger new releases. __*Default*__: no scheduled releases
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. __*Default*__: false
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "master" when new versions are bumped. __*Default*__: true
  * **scripts** (<code>Map<string, string></code>)  npm scripts to include. __*Default*__: {}
  * **srcdir** (<code>string</code>)  Typescript sources directory. __*Default*__: "src"
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
  * **jest** (<code>boolean</code>)  Setup jest unit tests. __*Default*__: true
  * **jestOptions** (<code>[JestOptions](#projen-jestoptions)</code>)  Jest options. __*Default*__: default options
  * **license** (<code>string</code>)  License's SPDX identifier. __*Optional*__
  * **licensed** (<code>boolean</code>)  Indicates if a license should be added. __*Default*__: true
  * **repository** (<code>string</code>)  The repository is the location where the actual code for your package lives. __*Optional*__
  * **repositoryDirectory** (<code>string</code>)  If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives. __*Optional*__
  * **stability** (<code>string</code>)  Package's Stability. __*Optional*__
  * **compileBeforeTest** (<code>boolean</code>)  Compile the code before running tests. __*Default*__: the default behavior is to delete the lib/ directory and run jest typescript tests and only if all tests pass, run the compiler.
  * **disableTsconfig** (<code>boolean</code>)  Do not generate a `tsconfig.json` file (used by jsii projects since tsconfig.json is generated by the jsii compiler). __*Default*__: false
  * **docgen** (<code>boolean</code>)  Docgen by Typedoc. __*Default*__: false
  * **docsDirectory** (<code>string</code>)  Docs directory. __*Default*__: "docs"
  * **entrypointTypes** (<code>string</code>)  The .d.ts file that includes the type declarations for this module. __*Default*__: .d.ts file derived from the project's entrypoint (usually lib/index.d.ts)
  * **eslint** (<code>boolean</code>)  Setup eslint. __*Default*__: true
  * **eslintOptions** (<code>[EslintOptions](#projen-eslintoptions)</code>)  Eslint options. __*Default*__: opinionated default options
  * **package** (<code>boolean</code>)  Defines a `yarn package` command that will produce a tarball and place it under `dist/js`. __*Default*__: true
  * **sampleCode** (<code>boolean</code>)  Generate one-time sample in `src/` and `test/` if there are no files there. __*Default*__: true
  * **tsconfig** (<code>[TypescriptConfigOptions](#projen-typescriptconfigoptions)</code>)  Custom TSConfig. __*Optional*__
  * **typescriptVersion** (<code>string</code>)  TypeScript version to use. __*Default*__: "^3.9.5"




## class TypeScriptLibraryProject ⚠️ <a id="projen-typescriptlibraryproject"></a>



__Extends__: [TypeScriptProject](#projen-typescriptproject)

### Initializer




```ts
new TypeScriptLibraryProject(options: TypeScriptProjectOptions)
```

* **options** (<code>[TypeScriptProjectOptions](#projen-typescriptprojectoptions)</code>)  *No description*
  * **mkdocs** (<code>boolean</code>)  Whether to enable MkDocs. __*Default*__: false
  * **mkdocsConfig** (<code>[MkDocsProps](#projen-mkdocsprops)</code>)  If mkdocs is true, then this can be used to customize the mkdocs site. __*Default*__: off
  * **outdir** (<code>string</code>)  The root directory of the project. __*Default*__: "."
  * **parent** (<code>[Project](#projen-project)</code>)  The parent project, if this project is part of a bigger project. __*Optional*__
  * **allowLibraryDependencies** (<code>boolean</code>)  Allow the project to include `peerDependencies` and `bundledDependencies`. __*Default*__: true
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files on git. __*Default*__: true
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. __*Default*__: true
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. __*Optional*__
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. __*Default*__: true
  * **bundledDependencies** (<code>Array<string></code>)  *No description* __*Optional*__
  * **bundledDeps** (<code>Array<string></code>)  List of dependencies to bundle into this module. __*Optional*__
  * **codeCov** (<code>boolean</code>)  Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret. __*Default*__: false
  * **codeCovTokenSecret** (<code>string</code>)  Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories. __*Default*__: if this option is not specified, only public repositories are supported
  * **copyrightOwner** (<code>string</code>)  License copyright owner. __*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. __*Default*__: current year
  * **defaultReleaseBranch** (<code>string</code>)  The name of the main release branch. __*Default*__: "master"
  * **dependabot** (<code>boolean</code>)  Include dependabot configuration. __*Default*__: true
  * **dependabotOptions** (<code>[DependabotOptions](#projen-github-dependabotoptions)</code>)  Options for dependabot. __*Default*__: default options
  * **dependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **deps** (<code>Array<string></code>)  Runtime dependencies of this module. __*Default*__: []
  * **devDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **devDeps** (<code>Array<string></code>)  Build dependencies for this module. __*Default*__: []
  * **entrypoint** (<code>string</code>)  Module entrypoint (`main` in `package.json`). __*Default*__: "lib/index.js"
  * **keywords** (<code>Array<string></code>)  Keywords to include in `package.json`. __*Optional*__
  * **libdir** (<code>string</code>)  Compiler artifacts output directory. __*Default*__: "lib"
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). __*Default*__: no max
  * **mergify** (<code>boolean</code>)  Adds mergify configuration. __*Default*__: true
  * **mergifyAutoMergeLabel** (<code>string</code>)  Automatically merge PRs that build successfully and have this label. __*Default*__: "auto-merge"
  * **mergifyOptions** (<code>[MergifyOptions](#projen-github-mergifyoptions)</code>)  Options for mergify. __*Default*__: default options
  * **minNodeVersion** (<code>string</code>)  Minimum Node.js version to require via package.json `engines` (inclusive). __*Default*__: no "engines" specified
  * **npmDistTag** (<code>string</code>)  The dist-tag to use when releasing to npm. __*Default*__: "latest"
  * **npmignore** (<code>Array<string></code>)  Additional entries to .npmignore. __*Optional*__
  * **npmignoreEnabled** (<code>boolean</code>)  Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs. __*Default*__: true
  * **npmRegistry** (<code>string</code>)  The registry url to use when releasing packages. __*Default*__: "registry.npmjs.org"
  * **npmTaskExecution** (<code>[NpmTaskExecution](#projen-npmtaskexecution)</code>)  Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz). __*Default*__: NpmTaskExecution.PROJEN
  * **packageManager** (<code>[NodePackageManager](#projen-nodepackagemanager)</code>)  The Node Package Manager used to execute scripts. __*Default*__: NodePackageManager.YARN
  * **peerDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  Options for `peerDeps`. __*Optional*__
  * **peerDeps** (<code>Array<string></code>)  Peer dependencies for this module. __*Default*__: []
  * **projenCommand** (<code>string</code>)  The shell command to use in order to run the projen CLI. __*Default*__: "npx projen"
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. __*Default*__: true
  * **projenUpgradeAutoMerge** (<code>boolean</code>)  Automatically merge projen upgrade PRs when build passes. __*Default*__: "true" if mergify auto-merge is enabled (default)
  * **projenUpgradeSchedule** (<code>Array<string></code>)  Customize the projenUpgrade schedule in cron expression. __*Default*__: [ "0 6 * * *" ]
  * **projenUpgradeSecret** (<code>string</code>)  Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`). __*Default*__: no automatic projen upgrade pull requests
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. __*Default*__: Semver.latest()
  * **pullRequestTemplate** (<code>boolean</code>)  Include a GitHub pull request template. __*Default*__: true
  * **pullRequestTemplateContents** (<code>string</code>)  The contents of the pull request template. __*Default*__: default content
  * **rebuildBot** (<code>boolean</code>)  Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request. __*Default*__: true
  * **rebuildBotCommand** (<code>string</code>)  The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch. __*Default*__: "rebuild"
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. __*Default*__: [ "master" ]
  * **releaseEveryCommit** (<code>boolean</code>)  Automatically release new versions every commit to one of branches in `releaseBranches`. __*Default*__: true
  * **releaseSchedule** (<code>string</code>)  CRON schedule to trigger new releases. __*Default*__: no scheduled releases
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. __*Default*__: false
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "master" when new versions are bumped. __*Default*__: true
  * **scripts** (<code>Map<string, string></code>)  npm scripts to include. __*Default*__: {}
  * **srcdir** (<code>string</code>)  Typescript sources directory. __*Default*__: "src"
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
  * **jest** (<code>boolean</code>)  Setup jest unit tests. __*Default*__: true
  * **jestOptions** (<code>[JestOptions](#projen-jestoptions)</code>)  Jest options. __*Default*__: default options
  * **license** (<code>string</code>)  License's SPDX identifier. __*Optional*__
  * **licensed** (<code>boolean</code>)  Indicates if a license should be added. __*Default*__: true
  * **repository** (<code>string</code>)  The repository is the location where the actual code for your package lives. __*Optional*__
  * **repositoryDirectory** (<code>string</code>)  If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives. __*Optional*__
  * **stability** (<code>string</code>)  Package's Stability. __*Optional*__
  * **compileBeforeTest** (<code>boolean</code>)  Compile the code before running tests. __*Default*__: the default behavior is to delete the lib/ directory and run jest typescript tests and only if all tests pass, run the compiler.
  * **disableTsconfig** (<code>boolean</code>)  Do not generate a `tsconfig.json` file (used by jsii projects since tsconfig.json is generated by the jsii compiler). __*Default*__: false
  * **docgen** (<code>boolean</code>)  Docgen by Typedoc. __*Default*__: false
  * **docsDirectory** (<code>string</code>)  Docs directory. __*Default*__: "docs"
  * **entrypointTypes** (<code>string</code>)  The .d.ts file that includes the type declarations for this module. __*Default*__: .d.ts file derived from the project's entrypoint (usually lib/index.d.ts)
  * **eslint** (<code>boolean</code>)  Setup eslint. __*Default*__: true
  * **eslintOptions** (<code>[EslintOptions](#projen-eslintoptions)</code>)  Eslint options. __*Default*__: opinionated default options
  * **package** (<code>boolean</code>)  Defines a `yarn package` command that will produce a tarball and place it under `dist/js`. __*Default*__: true
  * **sampleCode** (<code>boolean</code>)  Generate one-time sample in `src/` and `test/` if there are no files there. __*Default*__: true
  * **tsconfig** (<code>[TypescriptConfigOptions](#projen-typescriptconfigoptions)</code>)  Custom TSConfig. __*Optional*__
  * **typescriptVersion** (<code>string</code>)  TypeScript version to use. __*Default*__: "^3.9.5"




## class TypeScriptProject 🔹 <a id="projen-typescriptproject"></a>

TypeScript project.

__Extends__: [NodeProject](#projen-nodeproject)

### Initializer




```ts
new TypeScriptProject(options: TypeScriptProjectOptions)
```

* **options** (<code>[TypeScriptProjectOptions](#projen-typescriptprojectoptions)</code>)  *No description*
  * **mkdocs** (<code>boolean</code>)  Whether to enable MkDocs. __*Default*__: false
  * **mkdocsConfig** (<code>[MkDocsProps](#projen-mkdocsprops)</code>)  If mkdocs is true, then this can be used to customize the mkdocs site. __*Default*__: off
  * **outdir** (<code>string</code>)  The root directory of the project. __*Default*__: "."
  * **parent** (<code>[Project](#projen-project)</code>)  The parent project, if this project is part of a bigger project. __*Optional*__
  * **allowLibraryDependencies** (<code>boolean</code>)  Allow the project to include `peerDependencies` and `bundledDependencies`. __*Default*__: true
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files on git. __*Default*__: true
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. __*Default*__: true
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. __*Optional*__
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. __*Default*__: true
  * **bundledDependencies** (<code>Array<string></code>)  *No description* __*Optional*__
  * **bundledDeps** (<code>Array<string></code>)  List of dependencies to bundle into this module. __*Optional*__
  * **codeCov** (<code>boolean</code>)  Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret. __*Default*__: false
  * **codeCovTokenSecret** (<code>string</code>)  Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories. __*Default*__: if this option is not specified, only public repositories are supported
  * **copyrightOwner** (<code>string</code>)  License copyright owner. __*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. __*Default*__: current year
  * **defaultReleaseBranch** (<code>string</code>)  The name of the main release branch. __*Default*__: "master"
  * **dependabot** (<code>boolean</code>)  Include dependabot configuration. __*Default*__: true
  * **dependabotOptions** (<code>[DependabotOptions](#projen-github-dependabotoptions)</code>)  Options for dependabot. __*Default*__: default options
  * **dependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **deps** (<code>Array<string></code>)  Runtime dependencies of this module. __*Default*__: []
  * **devDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **devDeps** (<code>Array<string></code>)  Build dependencies for this module. __*Default*__: []
  * **entrypoint** (<code>string</code>)  Module entrypoint (`main` in `package.json`). __*Default*__: "lib/index.js"
  * **keywords** (<code>Array<string></code>)  Keywords to include in `package.json`. __*Optional*__
  * **libdir** (<code>string</code>)  Compiler artifacts output directory. __*Default*__: "lib"
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). __*Default*__: no max
  * **mergify** (<code>boolean</code>)  Adds mergify configuration. __*Default*__: true
  * **mergifyAutoMergeLabel** (<code>string</code>)  Automatically merge PRs that build successfully and have this label. __*Default*__: "auto-merge"
  * **mergifyOptions** (<code>[MergifyOptions](#projen-github-mergifyoptions)</code>)  Options for mergify. __*Default*__: default options
  * **minNodeVersion** (<code>string</code>)  Minimum Node.js version to require via package.json `engines` (inclusive). __*Default*__: no "engines" specified
  * **npmDistTag** (<code>string</code>)  The dist-tag to use when releasing to npm. __*Default*__: "latest"
  * **npmignore** (<code>Array<string></code>)  Additional entries to .npmignore. __*Optional*__
  * **npmignoreEnabled** (<code>boolean</code>)  Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs. __*Default*__: true
  * **npmRegistry** (<code>string</code>)  The registry url to use when releasing packages. __*Default*__: "registry.npmjs.org"
  * **npmTaskExecution** (<code>[NpmTaskExecution](#projen-npmtaskexecution)</code>)  Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz). __*Default*__: NpmTaskExecution.PROJEN
  * **packageManager** (<code>[NodePackageManager](#projen-nodepackagemanager)</code>)  The Node Package Manager used to execute scripts. __*Default*__: NodePackageManager.YARN
  * **peerDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* __*Optional*__
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  Options for `peerDeps`. __*Optional*__
  * **peerDeps** (<code>Array<string></code>)  Peer dependencies for this module. __*Default*__: []
  * **projenCommand** (<code>string</code>)  The shell command to use in order to run the projen CLI. __*Default*__: "npx projen"
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. __*Default*__: true
  * **projenUpgradeAutoMerge** (<code>boolean</code>)  Automatically merge projen upgrade PRs when build passes. __*Default*__: "true" if mergify auto-merge is enabled (default)
  * **projenUpgradeSchedule** (<code>Array<string></code>)  Customize the projenUpgrade schedule in cron expression. __*Default*__: [ "0 6 * * *" ]
  * **projenUpgradeSecret** (<code>string</code>)  Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`). __*Default*__: no automatic projen upgrade pull requests
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. __*Default*__: Semver.latest()
  * **pullRequestTemplate** (<code>boolean</code>)  Include a GitHub pull request template. __*Default*__: true
  * **pullRequestTemplateContents** (<code>string</code>)  The contents of the pull request template. __*Default*__: default content
  * **rebuildBot** (<code>boolean</code>)  Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request. __*Default*__: true
  * **rebuildBotCommand** (<code>string</code>)  The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch. __*Default*__: "rebuild"
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. __*Default*__: [ "master" ]
  * **releaseEveryCommit** (<code>boolean</code>)  Automatically release new versions every commit to one of branches in `releaseBranches`. __*Default*__: true
  * **releaseSchedule** (<code>string</code>)  CRON schedule to trigger new releases. __*Default*__: no scheduled releases
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. __*Default*__: false
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "master" when new versions are bumped. __*Default*__: true
  * **scripts** (<code>Map<string, string></code>)  npm scripts to include. __*Default*__: {}
  * **srcdir** (<code>string</code>)  Typescript sources directory. __*Default*__: "src"
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
  * **jest** (<code>boolean</code>)  Setup jest unit tests. __*Default*__: true
  * **jestOptions** (<code>[JestOptions](#projen-jestoptions)</code>)  Jest options. __*Default*__: default options
  * **license** (<code>string</code>)  License's SPDX identifier. __*Optional*__
  * **licensed** (<code>boolean</code>)  Indicates if a license should be added. __*Default*__: true
  * **repository** (<code>string</code>)  The repository is the location where the actual code for your package lives. __*Optional*__
  * **repositoryDirectory** (<code>string</code>)  If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives. __*Optional*__
  * **stability** (<code>string</code>)  Package's Stability. __*Optional*__
  * **compileBeforeTest** (<code>boolean</code>)  Compile the code before running tests. __*Default*__: the default behavior is to delete the lib/ directory and run jest typescript tests and only if all tests pass, run the compiler.
  * **disableTsconfig** (<code>boolean</code>)  Do not generate a `tsconfig.json` file (used by jsii projects since tsconfig.json is generated by the jsii compiler). __*Default*__: false
  * **docgen** (<code>boolean</code>)  Docgen by Typedoc. __*Default*__: false
  * **docsDirectory** (<code>string</code>)  Docs directory. __*Default*__: "docs"
  * **entrypointTypes** (<code>string</code>)  The .d.ts file that includes the type declarations for this module. __*Default*__: .d.ts file derived from the project's entrypoint (usually lib/index.d.ts)
  * **eslint** (<code>boolean</code>)  Setup eslint. __*Default*__: true
  * **eslintOptions** (<code>[EslintOptions](#projen-eslintoptions)</code>)  Eslint options. __*Default*__: opinionated default options
  * **package** (<code>boolean</code>)  Defines a `yarn package` command that will produce a tarball and place it under `dist/js`. __*Default*__: true
  * **sampleCode** (<code>boolean</code>)  Generate one-time sample in `src/` and `test/` if there are no files there. __*Default*__: true
  * **tsconfig** (<code>[TypescriptConfigOptions](#projen-typescriptconfigoptions)</code>)  Custom TSConfig. __*Optional*__
  * **typescriptVersion** (<code>string</code>)  TypeScript version to use. __*Default*__: "^3.9.5"



### Properties


Name | Type | Description 
-----|------|-------------
**docsDirectory**🔹 | <code>string</code> | <span></span>
**libdir**🔹 | <code>string</code> | The directory in which compiled .js files reside.
**srcdir**🔹 | <code>string</code> | The directory in which the .ts sources reside.
**watchTask**🔹 | <code>[Task](#projen-tasks-task)</code> | The "watch" task.
**docgen**?🔹 | <code>boolean</code> | __*Optional*__
**eslint**?🔹 | <code>[Eslint](#projen-eslint)</code> | __*Optional*__
**packageTask**?🔹 | <code>[Task](#projen-tasks-task)</code> | The "package" task (or undefined if `package` is set to `false`).<br/>__*Optional*__
**tsconfig**?🔹 | <code>[TypescriptConfig](#projen-typescriptconfig)</code> | __*Optional*__



## class TypescriptConfig 🔹 <a id="projen-typescriptconfig"></a>




### Initializer




```ts
new TypescriptConfig(project: NodeProject, options: TypescriptConfigOptions)
```

* **project** (<code>[NodeProject](#projen-nodeproject)</code>)  *No description*
* **options** (<code>[TypescriptConfigOptions](#projen-typescriptconfigoptions)</code>)  *No description*
  * **compilerOptions** (<code>[TypeScriptCompilerOptions](#projen-typescriptcompileroptions)</code>)  Compiler options to use. 
  * **exclude** (<code>Array<string></code>)  Filters results from the "include" option. __*Default*__: node_modules is excluded by default
  * **fileName** (<code>string</code>)  *No description* __*Default*__: "tsconfig.json"
  * **include** (<code>Array<string></code>)  Specifies a list of glob patterns that match TypeScript files to be included in compilation. __*Default*__: all .ts files recursively



### Properties


Name | Type | Description 
-----|------|-------------
**compilerOptions**🔹 | <code>[TypeScriptCompilerOptions](#projen-typescriptcompileroptions)</code> | <span></span>
**exclude**🔹 | <code>Array<string></code> | <span></span>
**file**🔹 | <code>[JsonFile](#projen-jsonfile)</code> | <span></span>
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



### Properties


Name | Type | Description 
-----|------|-------------
**bumpTask**🔹 | <code>[Task](#projen-tasks-task)</code> | <span></span>

### Methods


#### resolveVersion(outdir)🔹 <a id="projen-version-resolveversion"></a>

Returns the current version of the project.

```ts
resolveVersion(outdir: string): any
```

* **outdir** (<code>string</code>)  *No description*

__Returns__:
* <code>any</code>



## class YamlFile 🔹 <a id="projen-yamlfile"></a>



__Extends__: [JsonFile](#projen-jsonfile)

### Initializer




```ts
new YamlFile(project: Project, filePath: string, options: YamlFileOptions)
```

* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **filePath** (<code>string</code>)  *No description*
* **options** (<code>[YamlFileOptions](#projen-yamlfileoptions)</code>)  *No description*
  * **committed** (<code>boolean</code>)  Indicates whether this file should be committed to git or ignored. __*Default*__: true
  * **editGitignore** (<code>boolean</code>)  Update the project's .gitignore file. __*Default*__: true
  * **readonly** (<code>boolean</code>)  Whether the generated file should be readonly. __*Default*__: true
  * **marker** (<code>boolean</code>)  Adds the projen marker as a "JSON-comment" to the root object. __*Default*__: false
  * **obj** (<code>any</code>)  The object that will be serialized. __*Default*__: {} an empty object (use `file.obj` to mutate).
  * **omitEmpty** (<code>boolean</code>)  Omits empty objects and arrays. __*Default*__: false


### Methods


#### protected synthesizeContent(resolver)🔹 <a id="projen-yamlfile-synthesizecontent"></a>

Implemented by derived classes and returns the contents of the file to emit.

```ts
protected synthesizeContent(resolver: IResolver): string
```

* **resolver** (<code>[IResolver](#projen-iresolver)</code>)  *No description*

__Returns__:
* <code>string</code>



## struct AwsCdkConstructLibraryOptions 🔹 <a id="projen-awscdkconstructlibraryoptions"></a>


Options for the construct-lib-aws project.



Name | Type | Description 
-----|------|-------------
**authorAddress**🔹 | <code>string</code> | Email or URL of the library author.
**authorName**🔹 | <code>string</code> | The name of the library author.
**cdkVersion**🔹 | <code>string</code> | Minimum target version this library is tested against.
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
**bundledDependencies**?⚠️ | <code>Array<string></code> | __*Optional*__
**bundledDeps**?🔹 | <code>Array<string></code> | List of dependencies to bundle into this module.<br/>__*Optional*__
**catalog**?🔹 | <code>[Catalog](#projen-catalog)</code> | Libraries will be picked up by the construct catalog when they are published to npm as jsii modules and will be published under:.<br/>__*Default*__: new version will be announced
**cdkAssert**?🔹 | <code>boolean</code> | Install the @aws-cdk/assert library?<br/>__*Default*__: true
**cdkDependencies**?🔹 | <code>Array<string></code> | Which AWS CDK modules (those that start with "@aws-cdk/") does this library require when consumed?<br/>__*Optional*__
**cdkTestDependencies**?🔹 | <code>Array<string></code> | AWS CDK modules required for testing.<br/>__*Optional*__
**cdkVersionPinning**?🔹 | <code>boolean</code> | Use pinned version instead of caret version for CDK.<br/>__*Default*__: false
**codeCov**?🔹 | <code>boolean</code> | Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret.<br/>__*Default*__: false
**codeCovTokenSecret**?🔹 | <code>string</code> | Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories.<br/>__*Default*__: if this option is not specified, only public repositories are supported
**compat**?🔹 | <code>boolean</code> | Automatically run API compatibility test against the latest version published to npm after compilation.<br/>__*Default*__: false
**compatIgnore**?🔹 | <code>string</code> | Name of the ignore file for API compatibility tests.<br/>__*Default*__: ".compatignore"
**copyrightOwner**?🔹 | <code>string</code> | License copyright owner.<br/>__*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?🔹 | <code>string</code> | The copyright years to put in the LICENSE file.<br/>__*Default*__: current year
**defaultReleaseBranch**?🔹 | <code>string</code> | The name of the main release branch.<br/>__*Default*__: "master"
**dependabot**?🔹 | <code>boolean</code> | Include dependabot configuration.<br/>__*Default*__: true
**dependabotOptions**?🔹 | <code>[DependabotOptions](#projen-github-dependabotoptions)</code> | Options for dependabot.<br/>__*Default*__: default options
**dependencies**?⚠️ | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**deps**?🔹 | <code>Array<string></code> | Runtime dependencies of this module.<br/>__*Default*__: []
**description**?🔹 | <code>string</code> | Library description.<br/>__*Optional*__
**devDependencies**?⚠️ | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**devDeps**?🔹 | <code>Array<string></code> | Build dependencies for this module.<br/>__*Default*__: []
**docgen**?🔹 | <code>boolean</code> | Automatically generate API.md from jsii.<br/>__*Default*__: true
**dotnet**?🔹 | <code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code> | __*Optional*__
**entrypoint**?🔹 | <code>string</code> | Module entrypoint (`main` in `package.json`).<br/>__*Default*__: "lib/index.js"
**eslint**?🔹 | <code>boolean</code> | Install eslint.<br/>__*Default*__: true
**java**?🔹 | <code>[JsiiJavaTarget](#projen-jsiijavatarget)</code> | __*Optional*__
**jest**?🔹 | <code>boolean</code> | Use jest for unit tests.<br/>__*Default*__: true
**jestOptions**?🔹 | <code>[JestOptions](#projen-jestoptions)</code> | Jest options.<br/>__*Default*__: defaults
**keywords**?🔹 | <code>Array<string></code> | Keywords to include in `package.json`.<br/>__*Optional*__
**libdir**?🔹 | <code>string</code> | Compiler artifacts output directory.<br/>__*Default*__: "lib"
**license**?🔹 | <code>string</code> | __*Optional*__
**maxNodeVersion**?🔹 | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/>__*Default*__: no max
**mergify**?🔹 | <code>boolean</code> | Adds mergify configuration.<br/>__*Default*__: true
**mergifyAutoMergeLabel**?🔹 | <code>string</code> | Automatically merge PRs that build successfully and have this label.<br/>__*Default*__: "auto-merge"
**mergifyOptions**?🔹 | <code>[MergifyOptions](#projen-github-mergifyoptions)</code> | Options for mergify.<br/>__*Default*__: default options
**minNodeVersion**?🔹 | <code>string</code> | Minimum Node.js version to require via package.json `engines` (inclusive).<br/>__*Default*__: no "engines" specified
**mkdocs**?🔹 | <code>boolean</code> | Whether to enable MkDocs.<br/>__*Default*__: false
**mkdocsConfig**?🔹 | <code>[MkDocsProps](#projen-mkdocsprops)</code> | If mkdocs is true, then this can be used to customize the mkdocs site.<br/>__*Default*__: off
**npmDistTag**?🔹 | <code>string</code> | The dist-tag to use when releasing to npm.<br/>__*Default*__: "latest"
**npmRegistry**?🔹 | <code>string</code> | The registry url to use when releasing packages.<br/>__*Default*__: "registry.npmjs.org"
**npmTaskExecution**?🔹 | <code>[NpmTaskExecution](#projen-npmtaskexecution)</code> | Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz).<br/>__*Default*__: NpmTaskExecution.PROJEN
**npmignore**?🔹 | <code>Array<string></code> | Additional entries to .npmignore.<br/>__*Optional*__
**npmignoreEnabled**?🔹 | <code>boolean</code> | Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs.<br/>__*Default*__: true
**outdir**?🔹 | <code>string</code> | The root directory of the project.<br/>__*Default*__: "."
**packageManager**?🔹 | <code>[NodePackageManager](#projen-nodepackagemanager)</code> | The Node Package Manager used to execute scripts.<br/>__*Default*__: NodePackageManager.YARN
**parent**?🔹 | <code>[Project](#projen-project)</code> | The parent project, if this project is part of a bigger project.<br/>__*Optional*__
**peerDependencies**?⚠️ | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**peerDependencyOptions**?🔹 | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | Options for `peerDeps`.<br/>__*Optional*__
**peerDeps**?🔹 | <code>Array<string></code> | Peer dependencies for this module.<br/>__*Default*__: []
**projenCommand**?🔹 | <code>string</code> | The shell command to use in order to run the projen CLI.<br/>__*Default*__: "npx projen"
**projenDevDependency**?🔹 | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/>__*Default*__: true
**projenUpgradeAutoMerge**?🔹 | <code>boolean</code> | Automatically merge projen upgrade PRs when build passes.<br/>__*Default*__: "true" if mergify auto-merge is enabled (default)
**projenUpgradeSchedule**?🔹 | <code>Array<string></code> | Customize the projenUpgrade schedule in cron expression.<br/>__*Default*__: [ "0 6 * * *" ]
**projenUpgradeSecret**?🔹 | <code>string</code> | Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`).<br/>__*Default*__: no automatic projen upgrade pull requests
**projenVersion**?🔹 | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/>__*Default*__: Semver.latest()
**pullRequestTemplate**?🔹 | <code>boolean</code> | Include a GitHub pull request template.<br/>__*Default*__: true
**pullRequestTemplateContents**?🔹 | <code>string</code> | The contents of the pull request template.<br/>__*Default*__: default content
**python**?🔹 | <code>[JsiiPythonTarget](#projen-jsiipythontarget)</code> | __*Optional*__
**rebuildBot**?🔹 | <code>boolean</code> | Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request.<br/>__*Default*__: true
**rebuildBotCommand**?🔹 | <code>string</code> | The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch.<br/>__*Default*__: "rebuild"
**releaseBranches**?🔹 | <code>Array<string></code> | Branches which trigger a release.<br/>__*Default*__: [ "master" ]
**releaseEveryCommit**?🔹 | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`.<br/>__*Default*__: true
**releaseSchedule**?🔹 | <code>string</code> | CRON schedule to trigger new releases.<br/>__*Default*__: no scheduled releases
**releaseToNpm**?🔹 | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/>__*Default*__: false
**releaseWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for releasing from "master" when new versions are bumped.<br/>__*Default*__: true
**rootdir**?🔹 | <code>string</code> | __*Default*__: "."
**scripts**?🔹 | <code>Map<string, string></code> | npm scripts to include.<br/>__*Default*__: {}
**srcdir**?🔹 | <code>string</code> | Typescript sources directory.<br/>__*Default*__: "src"
**stability**?🔹 | <code>string</code> | __*Optional*__
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
**bundledDependencies**?⚠️ | <code>Array<string></code> | __*Optional*__
**bundledDeps**?🔹 | <code>Array<string></code> | List of dependencies to bundle into this module.<br/>__*Optional*__
**cdkDependencies**?🔹 | <code>Array<string></code> | Which AWS CDK modules (those that start with "@aws-cdk/") this app uses.<br/>__*Optional*__
**cdkVersionPinning**?🔹 | <code>boolean</code> | Use pinned version instead of caret version for CDK.<br/>__*Default*__: false
**codeCov**?🔹 | <code>boolean</code> | Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret.<br/>__*Default*__: false
**codeCovTokenSecret**?🔹 | <code>string</code> | Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories.<br/>__*Default*__: if this option is not specified, only public repositories are supported
**compileBeforeTest**?🔹 | <code>boolean</code> | Compile the code before running tests.<br/>__*Default*__: the default behavior is to delete the lib/ directory and run jest typescript tests and only if all tests pass, run the compiler.
**context**?🔹 | <code>Map<string, string></code> | Additional context to include in `cdk.json`.<br/>__*Optional*__
**copyrightOwner**?🔹 | <code>string</code> | License copyright owner.<br/>__*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?🔹 | <code>string</code> | The copyright years to put in the LICENSE file.<br/>__*Default*__: current year
**defaultReleaseBranch**?🔹 | <code>string</code> | The name of the main release branch.<br/>__*Default*__: "master"
**dependabot**?🔹 | <code>boolean</code> | Include dependabot configuration.<br/>__*Default*__: true
**dependabotOptions**?🔹 | <code>[DependabotOptions](#projen-github-dependabotoptions)</code> | Options for dependabot.<br/>__*Default*__: default options
**dependencies**?⚠️ | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**deps**?🔹 | <code>Array<string></code> | Runtime dependencies of this module.<br/>__*Default*__: []
**description**?🔹 | <code>string</code> | The description is just a string that helps people understand the purpose of the package.<br/>__*Optional*__
**devDependencies**?⚠️ | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**devDeps**?🔹 | <code>Array<string></code> | Build dependencies for this module.<br/>__*Default*__: []
**disableTsconfig**?🔹 | <code>boolean</code> | Do not generate a `tsconfig.json` file (used by jsii projects since tsconfig.json is generated by the jsii compiler).<br/>__*Default*__: false
**docgen**?🔹 | <code>boolean</code> | Docgen by Typedoc.<br/>__*Default*__: false
**docsDirectory**?🔹 | <code>string</code> | Docs directory.<br/>__*Default*__: "docs"
**entrypoint**?🔹 | <code>string</code> | Module entrypoint (`main` in `package.json`).<br/>__*Default*__: "lib/index.js"
**entrypointTypes**?🔹 | <code>string</code> | The .d.ts file that includes the type declarations for this module.<br/>__*Default*__: .d.ts file derived from the project's entrypoint (usually lib/index.d.ts)
**eslint**?🔹 | <code>boolean</code> | Setup eslint.<br/>__*Default*__: true
**eslintOptions**?🔹 | <code>[EslintOptions](#projen-eslintoptions)</code> | Eslint options.<br/>__*Default*__: opinionated default options
**gitignore**?🔹 | <code>Array<string></code> | Additional entries to .gitignore.<br/>__*Optional*__
**homepage**?🔹 | <code>string</code> | Package's Homepage / Website.<br/>__*Optional*__
**jest**?🔹 | <code>boolean</code> | Setup jest unit tests.<br/>__*Default*__: true
**jestOptions**?🔹 | <code>[JestOptions](#projen-jestoptions)</code> | Jest options.<br/>__*Default*__: default options
**keywords**?🔹 | <code>Array<string></code> | Keywords to include in `package.json`.<br/>__*Optional*__
**libdir**?🔹 | <code>string</code> | Compiler artifacts output directory.<br/>__*Default*__: "lib"
**license**?🔹 | <code>string</code> | License's SPDX identifier.<br/>__*Optional*__
**licensed**?🔹 | <code>boolean</code> | Indicates if a license should be added.<br/>__*Default*__: true
**maxNodeVersion**?🔹 | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/>__*Default*__: no max
**mergify**?🔹 | <code>boolean</code> | Adds mergify configuration.<br/>__*Default*__: true
**mergifyAutoMergeLabel**?🔹 | <code>string</code> | Automatically merge PRs that build successfully and have this label.<br/>__*Default*__: "auto-merge"
**mergifyOptions**?🔹 | <code>[MergifyOptions](#projen-github-mergifyoptions)</code> | Options for mergify.<br/>__*Default*__: default options
**minNodeVersion**?🔹 | <code>string</code> | Minimum Node.js version to require via package.json `engines` (inclusive).<br/>__*Default*__: no "engines" specified
**mkdocs**?🔹 | <code>boolean</code> | Whether to enable MkDocs.<br/>__*Default*__: false
**mkdocsConfig**?🔹 | <code>[MkDocsProps](#projen-mkdocsprops)</code> | If mkdocs is true, then this can be used to customize the mkdocs site.<br/>__*Default*__: off
**npmDistTag**?🔹 | <code>string</code> | The dist-tag to use when releasing to npm.<br/>__*Default*__: "latest"
**npmRegistry**?🔹 | <code>string</code> | The registry url to use when releasing packages.<br/>__*Default*__: "registry.npmjs.org"
**npmTaskExecution**?🔹 | <code>[NpmTaskExecution](#projen-npmtaskexecution)</code> | Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz).<br/>__*Default*__: NpmTaskExecution.PROJEN
**npmignore**?🔹 | <code>Array<string></code> | Additional entries to .npmignore.<br/>__*Optional*__
**npmignoreEnabled**?🔹 | <code>boolean</code> | Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs.<br/>__*Default*__: true
**outdir**?🔹 | <code>string</code> | The root directory of the project.<br/>__*Default*__: "."
**package**?🔹 | <code>boolean</code> | Defines a `yarn package` command that will produce a tarball and place it under `dist/js`.<br/>__*Default*__: true
**packageManager**?🔹 | <code>[NodePackageManager](#projen-nodepackagemanager)</code> | The Node Package Manager used to execute scripts.<br/>__*Default*__: NodePackageManager.YARN
**parent**?🔹 | <code>[Project](#projen-project)</code> | The parent project, if this project is part of a bigger project.<br/>__*Optional*__
**peerDependencies**?⚠️ | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**peerDependencyOptions**?🔹 | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | Options for `peerDeps`.<br/>__*Optional*__
**peerDeps**?🔹 | <code>Array<string></code> | Peer dependencies for this module.<br/>__*Default*__: []
**projenCommand**?🔹 | <code>string</code> | The shell command to use in order to run the projen CLI.<br/>__*Default*__: "npx projen"
**projenDevDependency**?🔹 | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/>__*Default*__: true
**projenUpgradeAutoMerge**?🔹 | <code>boolean</code> | Automatically merge projen upgrade PRs when build passes.<br/>__*Default*__: "true" if mergify auto-merge is enabled (default)
**projenUpgradeSchedule**?🔹 | <code>Array<string></code> | Customize the projenUpgrade schedule in cron expression.<br/>__*Default*__: [ "0 6 * * *" ]
**projenUpgradeSecret**?🔹 | <code>string</code> | Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`).<br/>__*Default*__: no automatic projen upgrade pull requests
**projenVersion**?🔹 | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/>__*Default*__: Semver.latest()
**pullRequestTemplate**?🔹 | <code>boolean</code> | Include a GitHub pull request template.<br/>__*Default*__: true
**pullRequestTemplateContents**?🔹 | <code>string</code> | The contents of the pull request template.<br/>__*Default*__: default content
**rebuildBot**?🔹 | <code>boolean</code> | Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request.<br/>__*Default*__: true
**rebuildBotCommand**?🔹 | <code>string</code> | The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch.<br/>__*Default*__: "rebuild"
**releaseBranches**?🔹 | <code>Array<string></code> | Branches which trigger a release.<br/>__*Default*__: [ "master" ]
**releaseEveryCommit**?🔹 | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`.<br/>__*Default*__: true
**releaseSchedule**?🔹 | <code>string</code> | CRON schedule to trigger new releases.<br/>__*Default*__: no scheduled releases
**releaseToNpm**?🔹 | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/>__*Default*__: false
**releaseWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for releasing from "master" when new versions are bumped.<br/>__*Default*__: true
**repository**?🔹 | <code>string</code> | The repository is the location where the actual code for your package lives.<br/>__*Optional*__
**repositoryDirectory**?🔹 | <code>string</code> | If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives.<br/>__*Optional*__
**requireApproval**?🔹 | <code>[CdkApprovalLevel](#projen-cdkapprovallevel)</code> | To protect you against unintended changes that affect your security posture, the AWS CDK Toolkit prompts you to approve security-related changes before deploying them.<br/>__*Default*__: CdkApprovalLevel.BROADENING
**sampleCode**?🔹 | <code>boolean</code> | Generate one-time sample in `src/` and `test/` if there are no files there.<br/>__*Default*__: true
**scripts**?🔹 | <code>Map<string, string></code> | npm scripts to include.<br/>__*Default*__: {}
**srcdir**?🔹 | <code>string</code> | Typescript sources directory.<br/>__*Default*__: "src"
**stability**?🔹 | <code>string</code> | Package's Stability.<br/>__*Optional*__
**testdir**?🔹 | <code>string</code> | Tests directory.<br/>__*Default*__: "test"
**tsconfig**?🔹 | <code>[TypescriptConfigOptions](#projen-typescriptconfigoptions)</code> | Custom TSConfig.<br/>__*Optional*__
**typescriptVersion**?🔹 | <code>string</code> | TypeScript version to use.<br/>__*Default*__: "^3.9.5"
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
**cdkVersion**⚠️ | <code>string</code> | Minimum target version this library is tested against.
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
**bundledDeps**?⚠️ | <code>Array<string></code> | List of dependencies to bundle into this module.<br/>__*Optional*__
**catalog**?⚠️ | <code>[Catalog](#projen-catalog)</code> | Libraries will be picked up by the construct catalog when they are published to npm as jsii modules and will be published under:.<br/>__*Default*__: new version will be announced
**cdkAssert**?⚠️ | <code>boolean</code> | Install the @aws-cdk/assert library?<br/>__*Default*__: true
**cdkDependencies**?⚠️ | <code>Array<string></code> | Which AWS CDK modules (those that start with "@aws-cdk/") does this library require when consumed?<br/>__*Optional*__
**cdkTestDependencies**?⚠️ | <code>Array<string></code> | AWS CDK modules required for testing.<br/>__*Optional*__
**cdkVersionPinning**?⚠️ | <code>boolean</code> | Use pinned version instead of caret version for CDK.<br/>__*Default*__: false
**codeCov**?⚠️ | <code>boolean</code> | Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret.<br/>__*Default*__: false
**codeCovTokenSecret**?⚠️ | <code>string</code> | Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories.<br/>__*Default*__: if this option is not specified, only public repositories are supported
**compat**?⚠️ | <code>boolean</code> | Automatically run API compatibility test against the latest version published to npm after compilation.<br/>__*Default*__: false
**compatIgnore**?⚠️ | <code>string</code> | Name of the ignore file for API compatibility tests.<br/>__*Default*__: ".compatignore"
**copyrightOwner**?⚠️ | <code>string</code> | License copyright owner.<br/>__*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?⚠️ | <code>string</code> | The copyright years to put in the LICENSE file.<br/>__*Default*__: current year
**defaultReleaseBranch**?⚠️ | <code>string</code> | The name of the main release branch.<br/>__*Default*__: "master"
**dependabot**?⚠️ | <code>boolean</code> | Include dependabot configuration.<br/>__*Default*__: true
**dependabotOptions**?⚠️ | <code>[DependabotOptions](#projen-github-dependabotoptions)</code> | Options for dependabot.<br/>__*Default*__: default options
**dependencies**?⚠️ | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**deps**?⚠️ | <code>Array<string></code> | Runtime dependencies of this module.<br/>__*Default*__: []
**description**?⚠️ | <code>string</code> | Library description.<br/>__*Optional*__
**devDependencies**?⚠️ | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**devDeps**?⚠️ | <code>Array<string></code> | Build dependencies for this module.<br/>__*Default*__: []
**docgen**?⚠️ | <code>boolean</code> | Automatically generate API.md from jsii.<br/>__*Default*__: true
**dotnet**?⚠️ | <code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code> | __*Optional*__
**entrypoint**?⚠️ | <code>string</code> | Module entrypoint (`main` in `package.json`).<br/>__*Default*__: "lib/index.js"
**eslint**?⚠️ | <code>boolean</code> | Install eslint.<br/>__*Default*__: true
**java**?⚠️ | <code>[JsiiJavaTarget](#projen-jsiijavatarget)</code> | __*Optional*__
**jest**?⚠️ | <code>boolean</code> | Use jest for unit tests.<br/>__*Default*__: true
**jestOptions**?⚠️ | <code>[JestOptions](#projen-jestoptions)</code> | Jest options.<br/>__*Default*__: defaults
**keywords**?⚠️ | <code>Array<string></code> | Keywords to include in `package.json`.<br/>__*Optional*__
**libdir**?⚠️ | <code>string</code> | Compiler artifacts output directory.<br/>__*Default*__: "lib"
**license**?⚠️ | <code>string</code> | __*Optional*__
**maxNodeVersion**?⚠️ | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/>__*Default*__: no max
**mergify**?⚠️ | <code>boolean</code> | Adds mergify configuration.<br/>__*Default*__: true
**mergifyAutoMergeLabel**?⚠️ | <code>string</code> | Automatically merge PRs that build successfully and have this label.<br/>__*Default*__: "auto-merge"
**mergifyOptions**?⚠️ | <code>[MergifyOptions](#projen-github-mergifyoptions)</code> | Options for mergify.<br/>__*Default*__: default options
**minNodeVersion**?⚠️ | <code>string</code> | Minimum Node.js version to require via package.json `engines` (inclusive).<br/>__*Default*__: no "engines" specified
**mkdocs**?⚠️ | <code>boolean</code> | Whether to enable MkDocs.<br/>__*Default*__: false
**mkdocsConfig**?⚠️ | <code>[MkDocsProps](#projen-mkdocsprops)</code> | If mkdocs is true, then this can be used to customize the mkdocs site.<br/>__*Default*__: off
**npmDistTag**?⚠️ | <code>string</code> | The dist-tag to use when releasing to npm.<br/>__*Default*__: "latest"
**npmRegistry**?⚠️ | <code>string</code> | The registry url to use when releasing packages.<br/>__*Default*__: "registry.npmjs.org"
**npmTaskExecution**?⚠️ | <code>[NpmTaskExecution](#projen-npmtaskexecution)</code> | Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz).<br/>__*Default*__: NpmTaskExecution.PROJEN
**npmignore**?⚠️ | <code>Array<string></code> | Additional entries to .npmignore.<br/>__*Optional*__
**npmignoreEnabled**?⚠️ | <code>boolean</code> | Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs.<br/>__*Default*__: true
**outdir**?⚠️ | <code>string</code> | The root directory of the project.<br/>__*Default*__: "."
**packageManager**?⚠️ | <code>[NodePackageManager](#projen-nodepackagemanager)</code> | The Node Package Manager used to execute scripts.<br/>__*Default*__: NodePackageManager.YARN
**parent**?⚠️ | <code>[Project](#projen-project)</code> | The parent project, if this project is part of a bigger project.<br/>__*Optional*__
**peerDependencies**?⚠️ | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**peerDependencyOptions**?⚠️ | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | Options for `peerDeps`.<br/>__*Optional*__
**peerDeps**?⚠️ | <code>Array<string></code> | Peer dependencies for this module.<br/>__*Default*__: []
**projenCommand**?⚠️ | <code>string</code> | The shell command to use in order to run the projen CLI.<br/>__*Default*__: "npx projen"
**projenDevDependency**?⚠️ | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/>__*Default*__: true
**projenUpgradeAutoMerge**?⚠️ | <code>boolean</code> | Automatically merge projen upgrade PRs when build passes.<br/>__*Default*__: "true" if mergify auto-merge is enabled (default)
**projenUpgradeSchedule**?⚠️ | <code>Array<string></code> | Customize the projenUpgrade schedule in cron expression.<br/>__*Default*__: [ "0 6 * * *" ]
**projenUpgradeSecret**?⚠️ | <code>string</code> | Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`).<br/>__*Default*__: no automatic projen upgrade pull requests
**projenVersion**?⚠️ | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/>__*Default*__: Semver.latest()
**pullRequestTemplate**?⚠️ | <code>boolean</code> | Include a GitHub pull request template.<br/>__*Default*__: true
**pullRequestTemplateContents**?⚠️ | <code>string</code> | The contents of the pull request template.<br/>__*Default*__: default content
**python**?⚠️ | <code>[JsiiPythonTarget](#projen-jsiipythontarget)</code> | __*Optional*__
**rebuildBot**?⚠️ | <code>boolean</code> | Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request.<br/>__*Default*__: true
**rebuildBotCommand**?⚠️ | <code>string</code> | The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch.<br/>__*Default*__: "rebuild"
**releaseBranches**?⚠️ | <code>Array<string></code> | Branches which trigger a release.<br/>__*Default*__: [ "master" ]
**releaseEveryCommit**?⚠️ | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`.<br/>__*Default*__: true
**releaseSchedule**?⚠️ | <code>string</code> | CRON schedule to trigger new releases.<br/>__*Default*__: no scheduled releases
**releaseToNpm**?⚠️ | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/>__*Default*__: false
**releaseWorkflow**?⚠️ | <code>boolean</code> | Define a GitHub workflow for releasing from "master" when new versions are bumped.<br/>__*Default*__: true
**rootdir**?⚠️ | <code>string</code> | __*Default*__: "."
**scripts**?⚠️ | <code>Map<string, string></code> | npm scripts to include.<br/>__*Default*__: {}
**srcdir**?⚠️ | <code>string</code> | Typescript sources directory.<br/>__*Default*__: "src"
**stability**?⚠️ | <code>string</code> | __*Optional*__
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
**bundledDependencies**?⚠️ | <code>Array<string></code> | __*Optional*__
**bundledDeps**?🔹 | <code>Array<string></code> | List of dependencies to bundle into this module.<br/>__*Optional*__
**catalog**?🔹 | <code>[Catalog](#projen-catalog)</code> | Libraries will be picked up by the construct catalog when they are published to npm as jsii modules and will be published under:.<br/>__*Default*__: new version will be announced
**codeCov**?🔹 | <code>boolean</code> | Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret.<br/>__*Default*__: false
**codeCovTokenSecret**?🔹 | <code>string</code> | Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories.<br/>__*Default*__: if this option is not specified, only public repositories are supported
**compat**?🔹 | <code>boolean</code> | Automatically run API compatibility test against the latest version published to npm after compilation.<br/>__*Default*__: false
**compatIgnore**?🔹 | <code>string</code> | Name of the ignore file for API compatibility tests.<br/>__*Default*__: ".compatignore"
**copyrightOwner**?🔹 | <code>string</code> | License copyright owner.<br/>__*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?🔹 | <code>string</code> | The copyright years to put in the LICENSE file.<br/>__*Default*__: current year
**defaultReleaseBranch**?🔹 | <code>string</code> | The name of the main release branch.<br/>__*Default*__: "master"
**dependabot**?🔹 | <code>boolean</code> | Include dependabot configuration.<br/>__*Default*__: true
**dependabotOptions**?🔹 | <code>[DependabotOptions](#projen-github-dependabotoptions)</code> | Options for dependabot.<br/>__*Default*__: default options
**dependencies**?⚠️ | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**deps**?🔹 | <code>Array<string></code> | Runtime dependencies of this module.<br/>__*Default*__: []
**description**?🔹 | <code>string</code> | Library description.<br/>__*Optional*__
**devDependencies**?⚠️ | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**devDeps**?🔹 | <code>Array<string></code> | Build dependencies for this module.<br/>__*Default*__: []
**docgen**?🔹 | <code>boolean</code> | Automatically generate API.md from jsii.<br/>__*Default*__: true
**dotnet**?🔹 | <code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code> | __*Optional*__
**entrypoint**?🔹 | <code>string</code> | Module entrypoint (`main` in `package.json`).<br/>__*Default*__: "lib/index.js"
**eslint**?🔹 | <code>boolean</code> | Install eslint.<br/>__*Default*__: true
**java**?🔹 | <code>[JsiiJavaTarget](#projen-jsiijavatarget)</code> | __*Optional*__
**jest**?🔹 | <code>boolean</code> | Use jest for unit tests.<br/>__*Default*__: true
**jestOptions**?🔹 | <code>[JestOptions](#projen-jestoptions)</code> | Jest options.<br/>__*Default*__: defaults
**keywords**?🔹 | <code>Array<string></code> | Keywords to include in `package.json`.<br/>__*Optional*__
**libdir**?🔹 | <code>string</code> | Compiler artifacts output directory.<br/>__*Default*__: "lib"
**license**?🔹 | <code>string</code> | __*Optional*__
**maxNodeVersion**?🔹 | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/>__*Default*__: no max
**mergify**?🔹 | <code>boolean</code> | Adds mergify configuration.<br/>__*Default*__: true
**mergifyAutoMergeLabel**?🔹 | <code>string</code> | Automatically merge PRs that build successfully and have this label.<br/>__*Default*__: "auto-merge"
**mergifyOptions**?🔹 | <code>[MergifyOptions](#projen-github-mergifyoptions)</code> | Options for mergify.<br/>__*Default*__: default options
**minNodeVersion**?🔹 | <code>string</code> | Minimum Node.js version to require via package.json `engines` (inclusive).<br/>__*Default*__: no "engines" specified
**mkdocs**?🔹 | <code>boolean</code> | Whether to enable MkDocs.<br/>__*Default*__: false
**mkdocsConfig**?🔹 | <code>[MkDocsProps](#projen-mkdocsprops)</code> | If mkdocs is true, then this can be used to customize the mkdocs site.<br/>__*Default*__: off
**npmDistTag**?🔹 | <code>string</code> | The dist-tag to use when releasing to npm.<br/>__*Default*__: "latest"
**npmRegistry**?🔹 | <code>string</code> | The registry url to use when releasing packages.<br/>__*Default*__: "registry.npmjs.org"
**npmTaskExecution**?🔹 | <code>[NpmTaskExecution](#projen-npmtaskexecution)</code> | Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz).<br/>__*Default*__: NpmTaskExecution.PROJEN
**npmignore**?🔹 | <code>Array<string></code> | Additional entries to .npmignore.<br/>__*Optional*__
**npmignoreEnabled**?🔹 | <code>boolean</code> | Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs.<br/>__*Default*__: true
**outdir**?🔹 | <code>string</code> | The root directory of the project.<br/>__*Default*__: "."
**packageManager**?🔹 | <code>[NodePackageManager](#projen-nodepackagemanager)</code> | The Node Package Manager used to execute scripts.<br/>__*Default*__: NodePackageManager.YARN
**parent**?🔹 | <code>[Project](#projen-project)</code> | The parent project, if this project is part of a bigger project.<br/>__*Optional*__
**peerDependencies**?⚠️ | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**peerDependencyOptions**?🔹 | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | Options for `peerDeps`.<br/>__*Optional*__
**peerDeps**?🔹 | <code>Array<string></code> | Peer dependencies for this module.<br/>__*Default*__: []
**projenCommand**?🔹 | <code>string</code> | The shell command to use in order to run the projen CLI.<br/>__*Default*__: "npx projen"
**projenDevDependency**?🔹 | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/>__*Default*__: true
**projenUpgradeAutoMerge**?🔹 | <code>boolean</code> | Automatically merge projen upgrade PRs when build passes.<br/>__*Default*__: "true" if mergify auto-merge is enabled (default)
**projenUpgradeSchedule**?🔹 | <code>Array<string></code> | Customize the projenUpgrade schedule in cron expression.<br/>__*Default*__: [ "0 6 * * *" ]
**projenUpgradeSecret**?🔹 | <code>string</code> | Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`).<br/>__*Default*__: no automatic projen upgrade pull requests
**projenVersion**?🔹 | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/>__*Default*__: Semver.latest()
**pullRequestTemplate**?🔹 | <code>boolean</code> | Include a GitHub pull request template.<br/>__*Default*__: true
**pullRequestTemplateContents**?🔹 | <code>string</code> | The contents of the pull request template.<br/>__*Default*__: default content
**python**?🔹 | <code>[JsiiPythonTarget](#projen-jsiipythontarget)</code> | __*Optional*__
**rebuildBot**?🔹 | <code>boolean</code> | Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request.<br/>__*Default*__: true
**rebuildBotCommand**?🔹 | <code>string</code> | The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch.<br/>__*Default*__: "rebuild"
**releaseBranches**?🔹 | <code>Array<string></code> | Branches which trigger a release.<br/>__*Default*__: [ "master" ]
**releaseEveryCommit**?🔹 | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`.<br/>__*Default*__: true
**releaseSchedule**?🔹 | <code>string</code> | CRON schedule to trigger new releases.<br/>__*Default*__: no scheduled releases
**releaseToNpm**?🔹 | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/>__*Default*__: false
**releaseWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for releasing from "master" when new versions are bumped.<br/>__*Default*__: true
**rootdir**?🔹 | <code>string</code> | __*Default*__: "."
**scripts**?🔹 | <code>Map<string, string></code> | npm scripts to include.<br/>__*Default*__: {}
**srcdir**?🔹 | <code>string</code> | Typescript sources directory.<br/>__*Default*__: "src"
**stability**?🔹 | <code>string</code> | __*Optional*__
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
**bundledDependencies**?⚠️ | <code>Array<string></code> | __*Optional*__
**bundledDeps**?🔹 | <code>Array<string></code> | List of dependencies to bundle into this module.<br/>__*Optional*__
**catalog**?🔹 | <code>[Catalog](#projen-catalog)</code> | Libraries will be picked up by the construct catalog when they are published to npm as jsii modules and will be published under:.<br/>__*Default*__: new version will be announced
**codeCov**?🔹 | <code>boolean</code> | Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret.<br/>__*Default*__: false
**codeCovTokenSecret**?🔹 | <code>string</code> | Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories.<br/>__*Default*__: if this option is not specified, only public repositories are supported
**compat**?🔹 | <code>boolean</code> | Automatically run API compatibility test against the latest version published to npm after compilation.<br/>__*Default*__: false
**compatIgnore**?🔹 | <code>string</code> | Name of the ignore file for API compatibility tests.<br/>__*Default*__: ".compatignore"
**copyrightOwner**?🔹 | <code>string</code> | License copyright owner.<br/>__*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?🔹 | <code>string</code> | The copyright years to put in the LICENSE file.<br/>__*Default*__: current year
**defaultReleaseBranch**?🔹 | <code>string</code> | The name of the main release branch.<br/>__*Default*__: "master"
**dependabot**?🔹 | <code>boolean</code> | Include dependabot configuration.<br/>__*Default*__: true
**dependabotOptions**?🔹 | <code>[DependabotOptions](#projen-github-dependabotoptions)</code> | Options for dependabot.<br/>__*Default*__: default options
**dependencies**?⚠️ | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**deps**?🔹 | <code>Array<string></code> | Runtime dependencies of this module.<br/>__*Default*__: []
**description**?🔹 | <code>string</code> | Library description.<br/>__*Optional*__
**devDependencies**?⚠️ | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**devDeps**?🔹 | <code>Array<string></code> | Build dependencies for this module.<br/>__*Default*__: []
**docgen**?🔹 | <code>boolean</code> | Automatically generate API.md from jsii.<br/>__*Default*__: true
**dotnet**?🔹 | <code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code> | __*Optional*__
**entrypoint**?🔹 | <code>string</code> | Module entrypoint (`main` in `package.json`).<br/>__*Default*__: "lib/index.js"
**eslint**?🔹 | <code>boolean</code> | Install eslint.<br/>__*Default*__: true
**java**?🔹 | <code>[JsiiJavaTarget](#projen-jsiijavatarget)</code> | __*Optional*__
**jest**?🔹 | <code>boolean</code> | Use jest for unit tests.<br/>__*Default*__: true
**jestOptions**?🔹 | <code>[JestOptions](#projen-jestoptions)</code> | Jest options.<br/>__*Default*__: defaults
**keywords**?🔹 | <code>Array<string></code> | Keywords to include in `package.json`.<br/>__*Optional*__
**libdir**?🔹 | <code>string</code> | Compiler artifacts output directory.<br/>__*Default*__: "lib"
**license**?🔹 | <code>string</code> | __*Optional*__
**maxNodeVersion**?🔹 | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/>__*Default*__: no max
**mergify**?🔹 | <code>boolean</code> | Adds mergify configuration.<br/>__*Default*__: true
**mergifyAutoMergeLabel**?🔹 | <code>string</code> | Automatically merge PRs that build successfully and have this label.<br/>__*Default*__: "auto-merge"
**mergifyOptions**?🔹 | <code>[MergifyOptions](#projen-github-mergifyoptions)</code> | Options for mergify.<br/>__*Default*__: default options
**minNodeVersion**?🔹 | <code>string</code> | Minimum Node.js version to require via package.json `engines` (inclusive).<br/>__*Default*__: no "engines" specified
**mkdocs**?🔹 | <code>boolean</code> | Whether to enable MkDocs.<br/>__*Default*__: false
**mkdocsConfig**?🔹 | <code>[MkDocsProps](#projen-mkdocsprops)</code> | If mkdocs is true, then this can be used to customize the mkdocs site.<br/>__*Default*__: off
**npmDistTag**?🔹 | <code>string</code> | The dist-tag to use when releasing to npm.<br/>__*Default*__: "latest"
**npmRegistry**?🔹 | <code>string</code> | The registry url to use when releasing packages.<br/>__*Default*__: "registry.npmjs.org"
**npmTaskExecution**?🔹 | <code>[NpmTaskExecution](#projen-npmtaskexecution)</code> | Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz).<br/>__*Default*__: NpmTaskExecution.PROJEN
**npmignore**?🔹 | <code>Array<string></code> | Additional entries to .npmignore.<br/>__*Optional*__
**npmignoreEnabled**?🔹 | <code>boolean</code> | Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs.<br/>__*Default*__: true
**outdir**?🔹 | <code>string</code> | The root directory of the project.<br/>__*Default*__: "."
**packageManager**?🔹 | <code>[NodePackageManager](#projen-nodepackagemanager)</code> | The Node Package Manager used to execute scripts.<br/>__*Default*__: NodePackageManager.YARN
**parent**?🔹 | <code>[Project](#projen-project)</code> | The parent project, if this project is part of a bigger project.<br/>__*Optional*__
**peerDependencies**?⚠️ | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**peerDependencyOptions**?🔹 | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | Options for `peerDeps`.<br/>__*Optional*__
**peerDeps**?🔹 | <code>Array<string></code> | Peer dependencies for this module.<br/>__*Default*__: []
**projenCommand**?🔹 | <code>string</code> | The shell command to use in order to run the projen CLI.<br/>__*Default*__: "npx projen"
**projenDevDependency**?🔹 | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/>__*Default*__: true
**projenUpgradeAutoMerge**?🔹 | <code>boolean</code> | Automatically merge projen upgrade PRs when build passes.<br/>__*Default*__: "true" if mergify auto-merge is enabled (default)
**projenUpgradeSchedule**?🔹 | <code>Array<string></code> | Customize the projenUpgrade schedule in cron expression.<br/>__*Default*__: [ "0 6 * * *" ]
**projenUpgradeSecret**?🔹 | <code>string</code> | Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`).<br/>__*Default*__: no automatic projen upgrade pull requests
**projenVersion**?🔹 | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/>__*Default*__: Semver.latest()
**pullRequestTemplate**?🔹 | <code>boolean</code> | Include a GitHub pull request template.<br/>__*Default*__: true
**pullRequestTemplateContents**?🔹 | <code>string</code> | The contents of the pull request template.<br/>__*Default*__: default content
**python**?🔹 | <code>[JsiiPythonTarget](#projen-jsiipythontarget)</code> | __*Optional*__
**rebuildBot**?🔹 | <code>boolean</code> | Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request.<br/>__*Default*__: true
**rebuildBotCommand**?🔹 | <code>string</code> | The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch.<br/>__*Default*__: "rebuild"
**releaseBranches**?🔹 | <code>Array<string></code> | Branches which trigger a release.<br/>__*Default*__: [ "master" ]
**releaseEveryCommit**?🔹 | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`.<br/>__*Default*__: true
**releaseSchedule**?🔹 | <code>string</code> | CRON schedule to trigger new releases.<br/>__*Default*__: no scheduled releases
**releaseToNpm**?🔹 | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/>__*Default*__: false
**releaseWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for releasing from "master" when new versions are bumped.<br/>__*Default*__: true
**rootdir**?🔹 | <code>string</code> | __*Default*__: "."
**scripts**?🔹 | <code>Map<string, string></code> | npm scripts to include.<br/>__*Default*__: {}
**srcdir**?🔹 | <code>string</code> | Typescript sources directory.<br/>__*Default*__: "src"
**stability**?🔹 | <code>string</code> | __*Optional*__
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



## struct DockerComposeBuild 🔹 <a id="projen-dockercomposebuild"></a>


Build arguments for creating a docker image.



Name | Type | Description 
-----|------|-------------
**context**🔹 | <code>string</code> | Docker build context directory.
**args**?🔹 | <code>Map<string, string></code> | Build args.<br/>__*Default*__: none are provided
**dockerfile**?🔹 | <code>string</code> | A dockerfile to build from.<br/>__*Default*__: "Dockerfile"



## struct DockerComposePortMappingOptions 🔹 <a id="projen-dockercomposeportmappingoptions"></a>


Options for port mappings.



Name | Type | Description 
-----|------|-------------
**protocol**?🔹 | <code>[DockerComposeProtocol](#projen-dockercomposeprotocol)</code> | Port mapping protocol.<br/>__*Default*__: DockerComposeProtocol.TCP



## struct DockerComposeProps 🔹 <a id="projen-dockercomposeprops"></a>


Props for DockerCompose.



Name | Type | Description 
-----|------|-------------
**nameSuffix**?🔹 | <code>string</code> | A name to add to the docker-compose.yml filename.<br/>__*Default*__: no name is added
**services**?🔹 | <code>Map<string, [DockerComposeServiceDescription](#projen-dockercomposeservicedescription)></code> | Service descriptions.<br/>__*Optional*__



## struct DockerComposeServiceDescription 🔹 <a id="projen-dockercomposeservicedescription"></a>


Description of a docker-compose.yml service.



Name | Type | Description 
-----|------|-------------
**command**?🔹 | <code>Array<string></code> | Provide a command to the docker container.<br/>__*Default*__: use the container's default command
**dependsOn**?🔹 | <code>Array<[IDockerComposeServiceName](#projen-idockercomposeservicename)></code> | Names of other services this service depends on.<br/>__*Default*__: no dependencies
**environment**?🔹 | <code>Map<string, string></code> | Add environment variables.<br/>__*Default*__: no environment variables are provided
**image**?🔹 | <code>string</code> | Use a docker image.<br/>__*Optional*__
**imageBuild**?🔹 | <code>[DockerComposeBuild](#projen-dockercomposebuild)</code> | Build a docker image.<br/>__*Optional*__
**ports**?🔹 | <code>Array<[DockerComposeServicePort](#projen-dockercomposeserviceport)></code> | Map some ports.<br/>__*Default*__: no ports are mapped
**volumes**?🔹 | <code>Array<[IDockerComposeVolumeBinding](#projen-idockercomposevolumebinding)></code> | Mount some volumes into the service.<br/>__*Optional*__



## struct DockerComposeServicePort 🔹 <a id="projen-dockercomposeserviceport"></a>

__Obtainable from__: [DockerCompose](#projen-dockercompose).[portMapping](#projen-dockercompose#projen-dockercompose-portmapping)()

A service port mapping.



Name | Type | Description 
-----|------|-------------
**mode**🔹 | <code>string</code> | Port mapping mode.
**protocol**🔹 | <code>[DockerComposeProtocol](#projen-dockercomposeprotocol)</code> | Network protocol.
**published**🔹 | <code>number</code> | Published port number.
**target**🔹 | <code>number</code> | Target port number.



## struct DockerComposeVolumeConfig 🔹 <a id="projen-dockercomposevolumeconfig"></a>


Volume configuration.



Name | Type | Description 
-----|------|-------------
**driver**?🔹 | <code>string</code> | Driver to use for the volume.<br/>__*Default*__: value is not provided
**driverOpts**?🔹 | <code>Map<string, string></code> | Options to provide to the driver.<br/>__*Optional*__
**external**?🔹 | <code>boolean</code> | Set to true to indicate that the volume is externally created.<br/>__*Default*__: unset, indicating that docker-compose creates the volume
**name**?🔹 | <code>string</code> | Name of the volume for when the volume name isn't going to work in YAML.<br/>__*Default*__: unset, indicating that docker-compose creates volumes as usual



## struct DockerComposeVolumeMount 🔹 <a id="projen-dockercomposevolumemount"></a>


Service volume mounting information.



Name | Type | Description 
-----|------|-------------
**source**🔹 | <code>string</code> | Volume source.
**target**🔹 | <code>string</code> | Volume target.
**type**🔹 | <code>string</code> | Type of volume.



## struct EslintOptions 🔹 <a id="projen-eslintoptions"></a>






Name | Type | Description 
-----|------|-------------
**dirs**🔹 | <code>Array<string></code> | Directories with source files to lint (e.g. [ "src", "test" ]).
**fileExtensions**🔹 | <code>Array<string></code> | File types that should be linted (e.g. [ ".js", ".ts" ]).
**tsconfigPath**🔹 | <code>string</code> | <span></span>
**ignorePatterns**?🔹 | <code>Array<string></code> | List of file patterns that should not be linted, using the same syntax as .gitignore patterns.<br/>__*Default*__: [ '*.js', '*.d.ts', 'node_modules/', '*.generated.ts', 'coverage' ]



## struct EslintOverride 🔹 <a id="projen-eslintoverride"></a>


eslint rules override.



Name | Type | Description 
-----|------|-------------
**files**🔹 | <code>Array<string></code> | Files or file patterns on which to apply the override.
**rules**🔹 | <code>Map<string, any></code> | The overriden rules.



## struct FileBaseOptions 🔹 <a id="projen-filebaseoptions"></a>






Name | Type | Description 
-----|------|-------------
**committed**?🔹 | <code>boolean</code> | Indicates whether this file should be committed to git or ignored.<br/>__*Default*__: true
**editGitignore**?🔹 | <code>boolean</code> | Update the project's .gitignore file.<br/>__*Default*__: true
**readonly**?🔹 | <code>boolean</code> | Whether the generated file should be readonly.<br/>__*Default*__: true



## struct HasteConfig 🔹 <a id="projen-hasteconfig"></a>






Name | Type | Description 
-----|------|-------------
**computeSha1**?🔹 | <code>boolean</code> | __*Optional*__
**defaultPlatform**?🔹 | <code>string</code> | __*Optional*__
**hasteImplModulePath**?🔹 | <code>string</code> | __*Optional*__
**platforms**?🔹 | <code>Array<string></code> | __*Optional*__
**throwOnModuleCollision**?🔹 | <code>boolean</code> | __*Optional*__



## interface IDockerComposeServiceName 🔹 <a id="projen-idockercomposeservicename"></a>

__Implemented by__: [DockerComposeService](#projen-dockercomposeservice)
__Obtainable from__: [DockerCompose](#projen-dockercompose).[serviceName](#projen-dockercompose#projen-dockercompose-servicename)()

An interface providing the name of a docker compose service.

### Properties


Name | Type | Description 
-----|------|-------------
**serviceName**🔹 | <code>string</code> | The name of the docker compose service.



## interface IDockerComposeVolumeBinding 🔹 <a id="projen-idockercomposevolumebinding"></a>

__Obtainable from__: [DockerCompose](#projen-dockercompose).[bindVolume](#projen-dockercompose#projen-dockercompose-bindvolume)(), [DockerCompose](#projen-dockercompose).[namedVolume](#projen-dockercompose#projen-dockercompose-namedvolume)()

Volume binding information.
### Methods


#### bind(volumeConfig)🔹 <a id="projen-idockercomposevolumebinding-bind"></a>

Binds the requested volume to the docker-compose volume configuration and provide mounting instructions for synthesis.

```ts
bind(volumeConfig: IDockerComposeVolumeConfig): DockerComposeVolumeMount
```

* **volumeConfig** (<code>[IDockerComposeVolumeConfig](#projen-idockercomposevolumeconfig)</code>)  the volume configuration.

__Returns__:
* <code>[DockerComposeVolumeMount](#projen-dockercomposevolumemount)</code>



## interface IDockerComposeVolumeConfig 🔹 <a id="projen-idockercomposevolumeconfig"></a>


Storage for volume configuration.
### Methods


#### addVolumeConfiguration(volumeName, configuration)🔹 <a id="projen-idockercomposevolumeconfig-addvolumeconfiguration"></a>

Add volume configuration to the repository.

```ts
addVolumeConfiguration(volumeName: string, configuration: DockerComposeVolumeConfig): void
```

* **volumeName** (<code>string</code>)  *No description*
* **configuration** (<code>[DockerComposeVolumeConfig](#projen-dockercomposevolumeconfig)</code>)  *No description*
  * **driver** (<code>string</code>)  Driver to use for the volume. __*Default*__: value is not provided
  * **driverOpts** (<code>Map<string, string></code>)  Options to provide to the driver. __*Optional*__
  * **external** (<code>boolean</code>)  Set to true to indicate that the volume is externally created. __*Default*__: unset, indicating that docker-compose creates the volume
  * **name** (<code>string</code>)  Name of the volume for when the volume name isn't going to work in YAML. __*Default*__: unset, indicating that docker-compose creates volumes as usual






## interface IResolver 🔹 <a id="projen-iresolver"></a>


API for resolving tokens when synthesizing file content.
### Methods


#### resolve(value, options?)🔹 <a id="projen-iresolver-resolve"></a>

Given a value (object/string/array/whatever, looks up any functions inside the object and returns an object where all functions are called.

```ts
resolve(value: any, options?: ResolveOptions): any
```

* **value** (<code>any</code>)  The value to resolve.
* **options** (<code>[ResolveOptions](#projen-resolveoptions)</code>)  *No description*
  * **omitEmpty** (<code>boolean</code>)  Omits empty arrays and objects. __*Default*__: false

__Returns__:
* <code>any</code>



## struct JestConfigOptions 🔹 <a id="projen-jestconfigoptions"></a>






Name | Type | Description 
-----|------|-------------
**automock**?🔹 | <code>boolean</code> | This option tells Jest that all imported modules in your tests should be mocked automatically.<br/>__*Default*__: false
**bail**?🔹 | <code>number &#124; boolean</code> | By default, Jest runs all tests and produces all errors into the console upon completion.<br/>__*Default*__: 0
**cacheDirectory**?🔹 | <code>string</code> | The directory where Jest should store its cached dependency information.<br/>__*Default*__: "/tmp/<path>"
**clearMocks**?🔹 | <code>boolean</code> | Automatically clear mock calls and instances before every test.<br/>__*Default*__: true
**collectCoverage**?🔹 | <code>boolean</code> | Indicates whether the coverage information should be collected while executing the test.<br/>__*Default*__: true
**collectCoverageFrom**?🔹 | <code>boolean</code> | An array of glob patterns indicating a set of files for which coverage information should be collected.<br/>__*Default*__: undefined
**coverageDirectory**?🔹 | <code>string</code> | The directory where Jest should output its coverage files.<br/>__*Default*__: "coverage"
**coveragePathIgnorePatterns**?🔹 | <code>string</code> | An array of regexp pattern strings that are matched against all file paths before executing the test.<br/>__*Default*__: "/node_modules/"
**coverageProvider**?🔹 | <code>string</code> | Indicates which provider should be used to instrument code for coverage.<br/>__*Default*__: "babel"
**coverageReporters**?🔹 | <code>Array<string></code> | A list of reporter names that Jest uses when writing coverage reports.<br/>__*Default*__: ["json", "lcov", "text", "clover"]
**coverageThreshold**?🔹 | <code>[CoverageThreshold](#projen-coveragethreshold)</code> | Specify the global coverage thresholds.<br/>__*Default*__: undefined
**dependencyExtractor**?🔹 | <code>string</code> | This option allows the use of a custom dependency extractor.<br/>__*Default*__: undefined
**displayName**?🔹 | <code>any</code> | Allows for a label to be printed alongside a test while it is running.<br/>__*Default*__: undefined
**errorOnDeprecated**?🔹 | <code>boolean</code> | Make calling deprecated APIs throw helpful error messages.<br/>__*Default*__: false
**extraGlobals**?🔹 | <code>Array<string></code> | Test files run inside a vm, which slows calls to global context properties (e.g. Math). With this option you can specify extra properties to be defined inside the vm for faster lookups.<br/>__*Default*__: undefined
**forceCoverageMatch**?🔹 | <code>Array<string></code> | Test files are normally ignored from collecting code coverage.<br/>__*Default*__: ['']
**globalSetup**?🔹 | <code>string</code> | This option allows the use of a custom global setup module which exports an async function that is triggered once before all test suites.<br/>__*Default*__: undefined
**globalTeardown**?🔹 | <code>string</code> | This option allows the use of a custom global teardown module which exports an async function that is triggered once after all test suites.<br/>__*Default*__: undefined
**globals**?🔹 | <code>any</code> | A set of global variables that need to be available in all test environments.<br/>__*Default*__: {}
**haste**?🔹 | <code>[HasteConfig](#projen-hasteconfig)</code> | This will be used to configure the behavior of jest-haste-map, Jest's internal file crawler/cache system.<br/>__*Default*__: {}
**injectGlobals**?🔹 | <code>boolean</code> | Insert Jest's globals (expect, test, describe, beforeEach etc.) into the global environment. If you set this to false, you should import from @jest/globals.<br/>__*Default*__: true
**maxConcurrency**?🔹 | <code>number</code> | A number limiting the number of tests that are allowed to run at the same time when using test.concurrent. Any test above this limit will be queued and executed once a slot is released.<br/>__*Default*__: 5
**moduleDirectories**?🔹 | <code>Array<string></code> | An array of directory names to be searched recursively up from the requiring module's location.<br/>__*Default*__: ["node_modules"]
**moduleFileExtensions**?🔹 | <code>Array<string></code> | An array of file extensions your modules use.<br/>__*Default*__: ["js", "json", "jsx", "ts", "tsx", "node"]
**moduleNameMapper**?🔹 | <code>Map<string, string &#124; Array<string>></code> | A map from regular expressions to module names or to arrays of module names that allow to stub out resources, like images or styles with a single module.<br/>__*Default*__: null
**modulePathIgnorePatterns**?🔹 | <code>Array<string></code> | An array of regexp pattern strings that are matched against all module paths before those paths are to be considered 'visible' to the module loader.<br/>__*Default*__: []
**modulePaths**?🔹 | <code>Array<string></code> | An alternative API to setting the NODE_PATH env variable, modulePaths is an array of absolute paths to additional locations to search when resolving modules.<br/>__*Default*__: []
**notify**?🔹 | <code>boolean</code> | Activates notifications for test results.<br/>__*Default*__: false
**notifyMode**?🔹 | <code>string</code> | Specifies notification mode.<br/>__*Default*__: failure-change
**preset**?🔹 | <code>string</code> | A preset that is used as a base for Jest's configuration.<br/>__*Default*__: undefined
**prettierPath**?🔹 | <code>string</code> | Sets the path to the prettier node module used to update inline snapshots.<br/>__*Default*__: "prettier"
**projects**?🔹 | <code>Array<string &#124; Map<string, any>></code> | When the projects configuration is provided with an array of paths or glob patterns, Jest will run tests in all of the specified projects at the same time.<br/>__*Default*__: undefined
**reporters**?🔹 | <code>Array<string &#124; json></code> | Use this configuration option to add custom reporters to Jest.<br/>__*Default*__: undefined
**resetMocks**?🔹 | <code>boolean</code> | Automatically reset mock state before every test.<br/>__*Default*__: false
**resetModules**?🔹 | <code>boolean</code> | By default, each test file gets its own independent module registry.<br/>__*Default*__: false
**resolver**?🔹 | <code>string</code> | This option allows the use of a custom resolver.<br/>__*Default*__: undefined
**restoreMocks**?🔹 | <code>boolean</code> | Automatically restore mock state before every test.<br/>__*Default*__: false
**rootDir**?🔹 | <code>string</code> | The root directory that Jest should scan for tests and modules within.<br/>__*Default*__: directory of the package.json
**roots**?🔹 | <code>Array<string></code> | A list of paths to directories that Jest should use to search for files in.<br/>__*Default*__: ["<rootDir>"]
**runner**?🔹 | <code>string</code> | This option allows you to use a custom runner instead of Jest's default test runner.<br/>__*Default*__: "jest-runner"
**setupFiles**?🔹 | <code>Array<string></code> | A list of paths to modules that run some code to configure or set up the testing environment.<br/>__*Default*__: []
**setupFilesAfterEnv**?🔹 | <code>Array<string></code> | A list of paths to modules that run some code to configure or set up the testing framework before each test file in the suite is executed.<br/>__*Default*__: []
**slowTestThreshold**?🔹 | <code>number</code> | The number of seconds after which a test is considered as slow and reported as such in the results.<br/>__*Default*__: 5
**snapshotResolver**?🔹 | <code>string</code> | The path to a module that can resolve test<->snapshot path.<br/>__*Default*__: undefined
**snapshotSerializers**?🔹 | <code>Array<string></code> | A list of paths to snapshot serializer modules Jest should use for snapshot testing.<br/>__*Default*__: = []
**testEnvironment**?🔹 | <code>string</code> | The test environment that will be used for testing.<br/>__*Default*__: "jsdom"
**testEnvironmentOptions**?🔹 | <code>any</code> | Test environment options that will be passed to the testEnvironment.<br/>__*Default*__: {}
**testFailureExitCode**?🔹 | <code>number</code> | The exit code Jest returns on test failure.<br/>__*Default*__: 1
**testMatch**?🔹 | <code>Array<string></code> | The glob patterns Jest uses to detect test files.<br/>__*Default*__: ['**\/__tests__/**\/*.[jt]s?(x)', '**\/?(*.)+(spec|test).[tj]s?(x)']
**testPathIgnorePatterns**?🔹 | <code>Array<string></code> | An array of regexp pattern strings that are matched against all test paths before executing the test.<br/>__*Default*__: ["/node_modules/"]
**testRegex**?🔹 | <code>string &#124; Array<string></code> | The pattern or patterns Jest uses to detect test files.<br/>__*Default*__: (/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$
**testResultsProcessor**?🔹 | <code>string</code> | This option allows the use of a custom results processor.<br/>__*Default*__: undefined
**testRunner**?🔹 | <code>string</code> | This option allows the use of a custom test runner.<br/>__*Default*__: "jasmine2"
**testSequencer**?🔹 | <code>string</code> | This option allows you to use a custom sequencer instead of Jest's default.<br/>__*Default*__: "
**testTimeout**?🔹 | <code>number</code> | Default timeout of a test in milliseconds.<br/>__*Default*__: 5000
**testURL**?🔹 | <code>string</code> | This option sets the URL for the jsdom environment.<br/>__*Default*__: "http://localhost"
**timers**?🔹 | <code>string</code> | Setting this value to legacy or fake allows the use of fake timers for functions such as setTimeout.<br/>__*Default*__: "real"
**transform**?🔹 | <code>Map<string, string &#124; json></code> | A map from regular expressions to paths to transformers.<br/>__*Default*__: {"\\.[jt]sx?$": "babel-jest"}
**transformIgnorePatterns**?🔹 | <code>Array<string></code> | An array of regexp pattern strings that are matched against all source file paths before transformation.<br/>__*Default*__: ["/node_modules/", "\\.pnp\\.[^\\\/]+$"]
**unmockedModulePathPatterns**?🔹 | <code>Array<string></code> | An array of regexp pattern strings that are matched against all modules before the module loader will automatically return a mock for them.<br/>__*Default*__: []
**verbose**?🔹 | <code>boolean</code> | Indicates whether each individual test should be reported during the run.<br/>__*Default*__: false
**watchPathIgnorePatterns**?🔹 | <code>Array<string></code> | An array of RegExp patterns that are matched against all source file paths before re-running tests in watch mode.<br/>__*Default*__: []
**watchPlugins**?🔹 | <code>json</code> | __*Default*__: -
**watchman**?🔹 | <code>boolean</code> | Whether to use watchman for file crawling.<br/>__*Default*__: true



## struct JestOptions 🔹 <a id="projen-jestoptions"></a>






Name | Type | Description 
-----|------|-------------
**coverage**?⚠️ | <code>boolean</code> | Collect coverage.<br/>__*Default*__: true
**ignorePatterns**?⚠️ | <code>Array<string></code> | Defines `testPathIgnorePatterns` and `coveragePathIgnorePatterns`.<br/>__*Default*__: ["/node_modules/"]
**jestConfig**?🔹 | <code>[JestConfigOptions](#projen-jestconfigoptions)</code> | __*Optional*__
**jestVersion**?🔹 | <code>string</code> | The version of jest to use.<br/>__*Default*__: installs the latest jest version
**junitReporting**?🔹 | <code>boolean</code> | Result processing with jest-junit.<br/>__*Default*__: true
**preserveDefaultReporters**?🔹 | <code>boolean</code> | Preserve the default Jest reporter when additional reporters are added.<br/>__*Default*__: true
**typescriptConfig**?🔹 | <code>[TypescriptConfigOptions](#projen-typescriptconfigoptions)</code> | __*Optional*__



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
**bundledDependencies**?⚠️ | <code>Array<string></code> | __*Optional*__
**bundledDeps**?🔹 | <code>Array<string></code> | List of dependencies to bundle into this module.<br/>__*Optional*__
**codeCov**?🔹 | <code>boolean</code> | Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret.<br/>__*Default*__: false
**codeCovTokenSecret**?🔹 | <code>string</code> | Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories.<br/>__*Default*__: if this option is not specified, only public repositories are supported
**compat**?🔹 | <code>boolean</code> | Automatically run API compatibility test against the latest version published to npm after compilation.<br/>__*Default*__: false
**compatIgnore**?🔹 | <code>string</code> | Name of the ignore file for API compatibility tests.<br/>__*Default*__: ".compatignore"
**copyrightOwner**?🔹 | <code>string</code> | License copyright owner.<br/>__*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?🔹 | <code>string</code> | The copyright years to put in the LICENSE file.<br/>__*Default*__: current year
**defaultReleaseBranch**?🔹 | <code>string</code> | The name of the main release branch.<br/>__*Default*__: "master"
**dependabot**?🔹 | <code>boolean</code> | Include dependabot configuration.<br/>__*Default*__: true
**dependabotOptions**?🔹 | <code>[DependabotOptions](#projen-github-dependabotoptions)</code> | Options for dependabot.<br/>__*Default*__: default options
**dependencies**?⚠️ | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**deps**?🔹 | <code>Array<string></code> | Runtime dependencies of this module.<br/>__*Default*__: []
**description**?🔹 | <code>string</code> | Library description.<br/>__*Optional*__
**devDependencies**?⚠️ | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**devDeps**?🔹 | <code>Array<string></code> | Build dependencies for this module.<br/>__*Default*__: []
**docgen**?🔹 | <code>boolean</code> | Automatically generate API.md from jsii.<br/>__*Default*__: true
**dotnet**?🔹 | <code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code> | __*Optional*__
**entrypoint**?🔹 | <code>string</code> | Module entrypoint (`main` in `package.json`).<br/>__*Default*__: "lib/index.js"
**eslint**?🔹 | <code>boolean</code> | Install eslint.<br/>__*Default*__: true
**java**?🔹 | <code>[JsiiJavaTarget](#projen-jsiijavatarget)</code> | __*Optional*__
**jest**?🔹 | <code>boolean</code> | Use jest for unit tests.<br/>__*Default*__: true
**jestOptions**?🔹 | <code>[JestOptions](#projen-jestoptions)</code> | Jest options.<br/>__*Default*__: defaults
**keywords**?🔹 | <code>Array<string></code> | Keywords to include in `package.json`.<br/>__*Optional*__
**libdir**?🔹 | <code>string</code> | Compiler artifacts output directory.<br/>__*Default*__: "lib"
**license**?🔹 | <code>string</code> | __*Optional*__
**maxNodeVersion**?🔹 | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/>__*Default*__: no max
**mergify**?🔹 | <code>boolean</code> | Adds mergify configuration.<br/>__*Default*__: true
**mergifyAutoMergeLabel**?🔹 | <code>string</code> | Automatically merge PRs that build successfully and have this label.<br/>__*Default*__: "auto-merge"
**mergifyOptions**?🔹 | <code>[MergifyOptions](#projen-github-mergifyoptions)</code> | Options for mergify.<br/>__*Default*__: default options
**minNodeVersion**?🔹 | <code>string</code> | Minimum Node.js version to require via package.json `engines` (inclusive).<br/>__*Default*__: no "engines" specified
**mkdocs**?🔹 | <code>boolean</code> | Whether to enable MkDocs.<br/>__*Default*__: false
**mkdocsConfig**?🔹 | <code>[MkDocsProps](#projen-mkdocsprops)</code> | If mkdocs is true, then this can be used to customize the mkdocs site.<br/>__*Default*__: off
**npmDistTag**?🔹 | <code>string</code> | The dist-tag to use when releasing to npm.<br/>__*Default*__: "latest"
**npmRegistry**?🔹 | <code>string</code> | The registry url to use when releasing packages.<br/>__*Default*__: "registry.npmjs.org"
**npmTaskExecution**?🔹 | <code>[NpmTaskExecution](#projen-npmtaskexecution)</code> | Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz).<br/>__*Default*__: NpmTaskExecution.PROJEN
**npmignore**?🔹 | <code>Array<string></code> | Additional entries to .npmignore.<br/>__*Optional*__
**npmignoreEnabled**?🔹 | <code>boolean</code> | Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs.<br/>__*Default*__: true
**outdir**?🔹 | <code>string</code> | The root directory of the project.<br/>__*Default*__: "."
**packageManager**?🔹 | <code>[NodePackageManager](#projen-nodepackagemanager)</code> | The Node Package Manager used to execute scripts.<br/>__*Default*__: NodePackageManager.YARN
**parent**?🔹 | <code>[Project](#projen-project)</code> | The parent project, if this project is part of a bigger project.<br/>__*Optional*__
**peerDependencies**?⚠️ | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**peerDependencyOptions**?🔹 | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | Options for `peerDeps`.<br/>__*Optional*__
**peerDeps**?🔹 | <code>Array<string></code> | Peer dependencies for this module.<br/>__*Default*__: []
**projenCommand**?🔹 | <code>string</code> | The shell command to use in order to run the projen CLI.<br/>__*Default*__: "npx projen"
**projenDevDependency**?🔹 | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/>__*Default*__: true
**projenUpgradeAutoMerge**?🔹 | <code>boolean</code> | Automatically merge projen upgrade PRs when build passes.<br/>__*Default*__: "true" if mergify auto-merge is enabled (default)
**projenUpgradeSchedule**?🔹 | <code>Array<string></code> | Customize the projenUpgrade schedule in cron expression.<br/>__*Default*__: [ "0 6 * * *" ]
**projenUpgradeSecret**?🔹 | <code>string</code> | Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`).<br/>__*Default*__: no automatic projen upgrade pull requests
**projenVersion**?🔹 | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/>__*Default*__: Semver.latest()
**pullRequestTemplate**?🔹 | <code>boolean</code> | Include a GitHub pull request template.<br/>__*Default*__: true
**pullRequestTemplateContents**?🔹 | <code>string</code> | The contents of the pull request template.<br/>__*Default*__: default content
**python**?🔹 | <code>[JsiiPythonTarget](#projen-jsiipythontarget)</code> | __*Optional*__
**rebuildBot**?🔹 | <code>boolean</code> | Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request.<br/>__*Default*__: true
**rebuildBotCommand**?🔹 | <code>string</code> | The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch.<br/>__*Default*__: "rebuild"
**releaseBranches**?🔹 | <code>Array<string></code> | Branches which trigger a release.<br/>__*Default*__: [ "master" ]
**releaseEveryCommit**?🔹 | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`.<br/>__*Default*__: true
**releaseSchedule**?🔹 | <code>string</code> | CRON schedule to trigger new releases.<br/>__*Default*__: no scheduled releases
**releaseToNpm**?🔹 | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/>__*Default*__: false
**releaseWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for releasing from "master" when new versions are bumped.<br/>__*Default*__: true
**rootdir**?🔹 | <code>string</code> | __*Default*__: "."
**scripts**?🔹 | <code>Map<string, string></code> | npm scripts to include.<br/>__*Default*__: {}
**srcdir**?🔹 | <code>string</code> | Typescript sources directory.<br/>__*Default*__: "src"
**stability**?🔹 | <code>string</code> | __*Optional*__
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


Options for `JsonFile`.



Name | Type | Description 
-----|------|-------------
**committed**?🔹 | <code>boolean</code> | Indicates whether this file should be committed to git or ignored.<br/>__*Default*__: true
**editGitignore**?🔹 | <code>boolean</code> | Update the project's .gitignore file.<br/>__*Default*__: true
**marker**?🔹 | <code>boolean</code> | Adds the projen marker as a "JSON-comment" to the root object.<br/>__*Default*__: false
**obj**?🔹 | <code>any</code> | The object that will be serialized.<br/>__*Default*__: {} an empty object (use `file.obj` to mutate).
**omitEmpty**?🔹 | <code>boolean</code> | Omits empty objects and arrays.<br/>__*Default*__: false
**readonly**?🔹 | <code>boolean</code> | Whether the generated file should be readonly.<br/>__*Default*__: true



## struct LicenseOptions 🔹 <a id="projen-licenseoptions"></a>






Name | Type | Description 
-----|------|-------------
**copyrightOwner**?🔹 | <code>string</code> | Copyright owner.<br/>__*Default*__: ""
**copyrightPeriod**?🔹 | <code>string</code> | Period of license (e.g. "1998-2023").<br/>__*Default*__: current year (e.g. "2020")



## struct MakefileOptions 🔹 <a id="projen-makefileoptions"></a>


Options for Makefiles.



Name | Type | Description 
-----|------|-------------
**all**?🔹 | <code>Array<string></code> | List of targets to build when Make is invoked without specifying any targets.<br/>__*Default*__: []
**committed**?🔹 | <code>boolean</code> | Indicates whether this file should be committed to git or ignored.<br/>__*Default*__: true
**editGitignore**?🔹 | <code>boolean</code> | Update the project's .gitignore file.<br/>__*Default*__: true
**readonly**?🔹 | <code>boolean</code> | Whether the generated file should be readonly.<br/>__*Default*__: true
**rules**?🔹 | <code>Array<[Rule](#projen-rule)></code> | Rules to include in the Makefile.<br/>__*Default*__: []



## struct MkDocsExtraProps 🔹 <a id="projen-mkdocsextraprops"></a>






Name | Type | Description 
-----|------|-------------
**social**🔹 | <code>any</code> | <span></span>



## struct MkDocsMarkDownExtensionProps 🔹 <a id="projen-mkdocsmarkdownextensionprops"></a>






Name | Type | Description 
-----|------|-------------
**name**🔹 | <code>string</code> | Name of the extension.
**flags**?🔹 | <code>Map<string, string></code> | Extension specific settings.<br/>__*Default*__: :



## struct MkDocsMarkDownPluginProps 🔹 <a id="projen-mkdocsmarkdownpluginprops"></a>






Name | Type | Description 
-----|------|-------------
**name**🔹 | <code>string</code> | Name of the plugin.
**settings**?🔹 | <code>Map<string, string &#124; Map<string, string>></code> | Plugin specific settings.<br/>__*Default*__: :



## struct MkDocsNavProps 🔹 <a id="projen-mkdocsnavprops"></a>


MkDocs Navigation (aka a map of pages) Note, siteUrl can affect the relativity of these.



Name | Type | Description 
-----|------|-------------
**pages**?🔹 | <code>Map<string, string></code> | List of Mkdocs pages.<br/>__*Default*__: index.md



## struct MkDocsProps 🔹 <a id="projen-mkdocsprops"></a>






Name | Type | Description 
-----|------|-------------
**siteName**🔹 | <code>string</code> | The documentation site name This is the only required mkdocs.yml param.
**copyright**?🔹 | <code>string</code> | The documentation site copyright.<br/>__*Default*__: : `project.copyright`
**docsDir**?🔹 | <code>string</code> | The directory to put docs in.<br/>__*Default*__: "docs-mk" docs is the default but is shared with docgen for API via typedoc mkdocs is for themes see `MkDocsThemeProps`
**editUri**?🔹 | <code>string</code> | The Browser URL to edit.<br/>__*Default*__: : ""
**extra**?🔹 | <code>[MkDocsExtraProps](#projen-mkdocsextraprops)</code> | Extra stuff to embed.<br/>__*Optional*__
**extraCss**?🔹 | <code>Array<string></code> | List of CSS Files to embed.<br/>__*Default*__: []
**extraJavaScript**?🔹 | <code>json</code> | List of JavaScript Files to embed.<br/>__*Default*__: []
**googleAnalytics**?🔹 | <code>Array<string></code> | __*Default*__: []
**markdownExtensions**?🔹 | <code>[MkDocsMarkDownExtensionProps](#projen-mkdocsmarkdownextensionprops)</code> | Extensions to load.<br/>__*Optional*__
**nav**?🔹 | <code>[MkDocsNavProps](#projen-mkdocsnavprops)</code> | List of the pages in the `docsDir`.<br/>__*Optional*__
**plugins**?🔹 | <code>[MkDocsMarkDownPluginProps](#projen-mkdocsmarkdownpluginprops)</code> | Plugins to load https://github.com/mkdocs/mkdocs/wiki/MkDocs-Plugins.<br/>__*Optional*__
**remoteBranch**?🔹 | <code>string</code> | What branch to use when gh-deploy.<br/>__*Default*__: "gh-pages"
**remoteName**?🔹 | <code>string</code> | What remote to use when gh-deploy.<br/>__*Default*__: origin
**repoName**?🔹 | <code>string</code> | The repository name.<br/>__*Default*__: : parsed from `project.repository`
**repoUrl**?🔹 | <code>string</code> | The repository url.<br/>__*Default*__: : parsed from `project.repository` minus .git
**siteAuthor**?🔹 | <code>string</code> | The documentation site author.<br/>__*Default*__: `project.author`
**siteDescription**?🔹 | <code>string</code> | The documentation site description.<br/>__*Default*__: `project.description`
**siteUrl**?🔹 | <code>string</code> | The documentation site url.<br/>__*Optional*__
**theme**?🔹 | <code>[MkDocsThemeProps](#projen-mkdocsthemeprops)</code> | The `mkdocs` theme https://github.com/mkdocs/mkdocs/wiki/MkDocs-Themes.<br/>__*Optional*__



## struct MkDocsThemeFontProps 🔹 <a id="projen-mkdocsthemefontprops"></a>






Name | Type | Description 
-----|------|-------------
**code**🔹 | <code>string</code> | <span></span>
**text**🔹 | <code>string</code> | <span></span>



## struct MkDocsThemeIconProps 🔹 <a id="projen-mkdocsthemeiconprops"></a>






Name | Type | Description 
-----|------|-------------
**logo**🔹 | <code>string</code> | The Theme Icon Logo.



## struct MkDocsThemePalatteProps 🔹 <a id="projen-mkdocsthemepalatteprops"></a>






Name | Type | Description 
-----|------|-------------
**scheme**🔹 | <code>string</code> | <span></span>
**accent**?🔹 | <code>string</code> | __*Optional*__
**primary**?🔹 | <code>string</code> | __*Optional*__



## struct MkDocsThemeProps 🔹 <a id="projen-mkdocsthemeprops"></a>


An Mkdocs Theme The theme itself is optional but if you define one Some fields are required Projen will define its own theme elsewhere.



Name | Type | Description 
-----|------|-------------
**name**🔹 | <code>string</code> | Name of the theme.
**customDir**?🔹 | <code>string</code> | Directory containing a custom theme.<br/>__*Optional*__
**favicon**?🔹 | <code>string</code> | __*Optional*__
**features**?🔹 | <code>Array<string></code> | Features.<br/>__*Optional*__
**font**?🔹 | <code>[MkDocsThemeFontProps](#projen-mkdocsthemefontprops)</code> | __*Optional*__
**highLightJss**?🔹 | <code>boolean</code> | Whether to enable `highlightjs`.<br/>__*Default*__: false
**hlJsLanguages**?🔹 | <code>Array<string></code> | If enabled, for what languages.<br/>__*Default*__: []
**hlJsStyle**?🔹 | <code>string</code> | 79+ styles(colors) available.<br/>__*Default*__: github
**icon**?🔹 | <code>[MkDocsThemeIconProps](#projen-mkdocsthemeiconprops)</code> | __*Optional*__
**language**?🔹 | <code>string</code> | Language to target.<br/>__*Default*__: en
**logo**?🔹 | <code>string</code> | The logo.<br/>__*Optional*__
**palette**?🔹 | <code>[MkDocsThemePalatteProps](#projen-mkdocsthemepalatteprops)</code> | Palatte.<br/>__*Optional*__
**staticTemplates**?🔹 | <code>Array<string></code> | List of files to add to the theme The templates must be located in either the theme's template directory or in the custom_dir defined in the theme configuration.<br/>__*Default*__: []



## struct NodeProjectCommonOptions 🔹 <a id="projen-nodeprojectcommonoptions"></a>






Name | Type | Description 
-----|------|-------------
**allowLibraryDependencies**?🔹 | <code>boolean</code> | Allow the project to include `peerDependencies` and `bundledDependencies`.<br/>__*Default*__: true
**antitamper**?🔹 | <code>boolean</code> | Checks that after build there are no modified files on git.<br/>__*Default*__: true
**autoDetectBin**?🔹 | <code>boolean</code> | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.<br/>__*Default*__: true
**bin**?🔹 | <code>Map<string, string></code> | Binary programs vended with your module.<br/>__*Optional*__
**buildWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/>__*Default*__: true
**bundledDependencies**?⚠️ | <code>Array<string></code> | __*Optional*__
**bundledDeps**?🔹 | <code>Array<string></code> | List of dependencies to bundle into this module.<br/>__*Optional*__
**codeCov**?🔹 | <code>boolean</code> | Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret.<br/>__*Default*__: false
**codeCovTokenSecret**?🔹 | <code>string</code> | Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories.<br/>__*Default*__: if this option is not specified, only public repositories are supported
**copyrightOwner**?🔹 | <code>string</code> | License copyright owner.<br/>__*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?🔹 | <code>string</code> | The copyright years to put in the LICENSE file.<br/>__*Default*__: current year
**defaultReleaseBranch**?🔹 | <code>string</code> | The name of the main release branch.<br/>__*Default*__: "master"
**dependabot**?🔹 | <code>boolean</code> | Include dependabot configuration.<br/>__*Default*__: true
**dependabotOptions**?🔹 | <code>[DependabotOptions](#projen-github-dependabotoptions)</code> | Options for dependabot.<br/>__*Default*__: default options
**dependencies**?⚠️ | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**deps**?🔹 | <code>Array<string></code> | Runtime dependencies of this module.<br/>__*Default*__: []
**devDependencies**?⚠️ | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**devDeps**?🔹 | <code>Array<string></code> | Build dependencies for this module.<br/>__*Default*__: []
**entrypoint**?🔹 | <code>string</code> | Module entrypoint (`main` in `package.json`).<br/>__*Default*__: "lib/index.js"
**keywords**?🔹 | <code>Array<string></code> | Keywords to include in `package.json`.<br/>__*Optional*__
**libdir**?🔹 | <code>string</code> | Compiler artifacts output directory.<br/>__*Default*__: "lib"
**maxNodeVersion**?🔹 | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/>__*Default*__: no max
**mergify**?🔹 | <code>boolean</code> | Adds mergify configuration.<br/>__*Default*__: true
**mergifyAutoMergeLabel**?🔹 | <code>string</code> | Automatically merge PRs that build successfully and have this label.<br/>__*Default*__: "auto-merge"
**mergifyOptions**?🔹 | <code>[MergifyOptions](#projen-github-mergifyoptions)</code> | Options for mergify.<br/>__*Default*__: default options
**minNodeVersion**?🔹 | <code>string</code> | Minimum Node.js version to require via package.json `engines` (inclusive).<br/>__*Default*__: no "engines" specified
**mkdocs**?🔹 | <code>boolean</code> | Whether to enable MkDocs.<br/>__*Default*__: false
**mkdocsConfig**?🔹 | <code>[MkDocsProps](#projen-mkdocsprops)</code> | If mkdocs is true, then this can be used to customize the mkdocs site.<br/>__*Default*__: off
**npmDistTag**?🔹 | <code>string</code> | The dist-tag to use when releasing to npm.<br/>__*Default*__: "latest"
**npmRegistry**?🔹 | <code>string</code> | The registry url to use when releasing packages.<br/>__*Default*__: "registry.npmjs.org"
**npmTaskExecution**?🔹 | <code>[NpmTaskExecution](#projen-npmtaskexecution)</code> | Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz).<br/>__*Default*__: NpmTaskExecution.PROJEN
**npmignore**?🔹 | <code>Array<string></code> | Additional entries to .npmignore.<br/>__*Optional*__
**npmignoreEnabled**?🔹 | <code>boolean</code> | Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs.<br/>__*Default*__: true
**outdir**?🔹 | <code>string</code> | The root directory of the project.<br/>__*Default*__: "."
**packageManager**?🔹 | <code>[NodePackageManager](#projen-nodepackagemanager)</code> | The Node Package Manager used to execute scripts.<br/>__*Default*__: NodePackageManager.YARN
**parent**?🔹 | <code>[Project](#projen-project)</code> | The parent project, if this project is part of a bigger project.<br/>__*Optional*__
**peerDependencies**?⚠️ | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**peerDependencyOptions**?🔹 | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | Options for `peerDeps`.<br/>__*Optional*__
**peerDeps**?🔹 | <code>Array<string></code> | Peer dependencies for this module.<br/>__*Default*__: []
**projenCommand**?🔹 | <code>string</code> | The shell command to use in order to run the projen CLI.<br/>__*Default*__: "npx projen"
**projenDevDependency**?🔹 | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/>__*Default*__: true
**projenUpgradeAutoMerge**?🔹 | <code>boolean</code> | Automatically merge projen upgrade PRs when build passes.<br/>__*Default*__: "true" if mergify auto-merge is enabled (default)
**projenUpgradeSchedule**?🔹 | <code>Array<string></code> | Customize the projenUpgrade schedule in cron expression.<br/>__*Default*__: [ "0 6 * * *" ]
**projenUpgradeSecret**?🔹 | <code>string</code> | Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`).<br/>__*Default*__: no automatic projen upgrade pull requests
**projenVersion**?🔹 | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/>__*Default*__: Semver.latest()
**pullRequestTemplate**?🔹 | <code>boolean</code> | Include a GitHub pull request template.<br/>__*Default*__: true
**pullRequestTemplateContents**?🔹 | <code>string</code> | The contents of the pull request template.<br/>__*Default*__: default content
**rebuildBot**?🔹 | <code>boolean</code> | Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request.<br/>__*Default*__: true
**rebuildBotCommand**?🔹 | <code>string</code> | The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch.<br/>__*Default*__: "rebuild"
**releaseBranches**?🔹 | <code>Array<string></code> | Branches which trigger a release.<br/>__*Default*__: [ "master" ]
**releaseEveryCommit**?🔹 | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`.<br/>__*Default*__: true
**releaseSchedule**?🔹 | <code>string</code> | CRON schedule to trigger new releases.<br/>__*Default*__: no scheduled releases
**releaseToNpm**?🔹 | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/>__*Default*__: false
**releaseWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for releasing from "master" when new versions are bumped.<br/>__*Default*__: true
**scripts**?🔹 | <code>Map<string, string></code> | npm scripts to include.<br/>__*Default*__: {}
**srcdir**?🔹 | <code>string</code> | Typescript sources directory.<br/>__*Default*__: "src"
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
**bundledDependencies**?⚠️ | <code>Array<string></code> | __*Optional*__
**bundledDeps**?🔹 | <code>Array<string></code> | List of dependencies to bundle into this module.<br/>__*Optional*__
**codeCov**?🔹 | <code>boolean</code> | Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret.<br/>__*Default*__: false
**codeCovTokenSecret**?🔹 | <code>string</code> | Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories.<br/>__*Default*__: if this option is not specified, only public repositories are supported
**copyrightOwner**?🔹 | <code>string</code> | License copyright owner.<br/>__*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?🔹 | <code>string</code> | The copyright years to put in the LICENSE file.<br/>__*Default*__: current year
**defaultReleaseBranch**?🔹 | <code>string</code> | The name of the main release branch.<br/>__*Default*__: "master"
**dependabot**?🔹 | <code>boolean</code> | Include dependabot configuration.<br/>__*Default*__: true
**dependabotOptions**?🔹 | <code>[DependabotOptions](#projen-github-dependabotoptions)</code> | Options for dependabot.<br/>__*Default*__: default options
**dependencies**?⚠️ | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**deps**?🔹 | <code>Array<string></code> | Runtime dependencies of this module.<br/>__*Default*__: []
**description**?🔹 | <code>string</code> | The description is just a string that helps people understand the purpose of the package.<br/>__*Optional*__
**devDependencies**?⚠️ | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**devDeps**?🔹 | <code>Array<string></code> | Build dependencies for this module.<br/>__*Default*__: []
**entrypoint**?🔹 | <code>string</code> | Module entrypoint (`main` in `package.json`).<br/>__*Default*__: "lib/index.js"
**gitignore**?🔹 | <code>Array<string></code> | Additional entries to .gitignore.<br/>__*Optional*__
**homepage**?🔹 | <code>string</code> | Package's Homepage / Website.<br/>__*Optional*__
**jest**?🔹 | <code>boolean</code> | Setup jest unit tests.<br/>__*Default*__: true
**jestOptions**?🔹 | <code>[JestOptions](#projen-jestoptions)</code> | Jest options.<br/>__*Default*__: default options
**keywords**?🔹 | <code>Array<string></code> | Keywords to include in `package.json`.<br/>__*Optional*__
**libdir**?🔹 | <code>string</code> | Compiler artifacts output directory.<br/>__*Default*__: "lib"
**license**?🔹 | <code>string</code> | License's SPDX identifier.<br/>__*Optional*__
**licensed**?🔹 | <code>boolean</code> | Indicates if a license should be added.<br/>__*Default*__: true
**maxNodeVersion**?🔹 | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/>__*Default*__: no max
**mergify**?🔹 | <code>boolean</code> | Adds mergify configuration.<br/>__*Default*__: true
**mergifyAutoMergeLabel**?🔹 | <code>string</code> | Automatically merge PRs that build successfully and have this label.<br/>__*Default*__: "auto-merge"
**mergifyOptions**?🔹 | <code>[MergifyOptions](#projen-github-mergifyoptions)</code> | Options for mergify.<br/>__*Default*__: default options
**minNodeVersion**?🔹 | <code>string</code> | Minimum Node.js version to require via package.json `engines` (inclusive).<br/>__*Default*__: no "engines" specified
**mkdocs**?🔹 | <code>boolean</code> | Whether to enable MkDocs.<br/>__*Default*__: false
**mkdocsConfig**?🔹 | <code>[MkDocsProps](#projen-mkdocsprops)</code> | If mkdocs is true, then this can be used to customize the mkdocs site.<br/>__*Default*__: off
**npmDistTag**?🔹 | <code>string</code> | The dist-tag to use when releasing to npm.<br/>__*Default*__: "latest"
**npmRegistry**?🔹 | <code>string</code> | The registry url to use when releasing packages.<br/>__*Default*__: "registry.npmjs.org"
**npmTaskExecution**?🔹 | <code>[NpmTaskExecution](#projen-npmtaskexecution)</code> | Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz).<br/>__*Default*__: NpmTaskExecution.PROJEN
**npmignore**?🔹 | <code>Array<string></code> | Additional entries to .npmignore.<br/>__*Optional*__
**npmignoreEnabled**?🔹 | <code>boolean</code> | Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs.<br/>__*Default*__: true
**outdir**?🔹 | <code>string</code> | The root directory of the project.<br/>__*Default*__: "."
**packageManager**?🔹 | <code>[NodePackageManager](#projen-nodepackagemanager)</code> | The Node Package Manager used to execute scripts.<br/>__*Default*__: NodePackageManager.YARN
**parent**?🔹 | <code>[Project](#projen-project)</code> | The parent project, if this project is part of a bigger project.<br/>__*Optional*__
**peerDependencies**?⚠️ | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**peerDependencyOptions**?🔹 | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | Options for `peerDeps`.<br/>__*Optional*__
**peerDeps**?🔹 | <code>Array<string></code> | Peer dependencies for this module.<br/>__*Default*__: []
**projenCommand**?🔹 | <code>string</code> | The shell command to use in order to run the projen CLI.<br/>__*Default*__: "npx projen"
**projenDevDependency**?🔹 | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/>__*Default*__: true
**projenUpgradeAutoMerge**?🔹 | <code>boolean</code> | Automatically merge projen upgrade PRs when build passes.<br/>__*Default*__: "true" if mergify auto-merge is enabled (default)
**projenUpgradeSchedule**?🔹 | <code>Array<string></code> | Customize the projenUpgrade schedule in cron expression.<br/>__*Default*__: [ "0 6 * * *" ]
**projenUpgradeSecret**?🔹 | <code>string</code> | Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`).<br/>__*Default*__: no automatic projen upgrade pull requests
**projenVersion**?🔹 | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/>__*Default*__: Semver.latest()
**pullRequestTemplate**?🔹 | <code>boolean</code> | Include a GitHub pull request template.<br/>__*Default*__: true
**pullRequestTemplateContents**?🔹 | <code>string</code> | The contents of the pull request template.<br/>__*Default*__: default content
**rebuildBot**?🔹 | <code>boolean</code> | Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request.<br/>__*Default*__: true
**rebuildBotCommand**?🔹 | <code>string</code> | The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch.<br/>__*Default*__: "rebuild"
**releaseBranches**?🔹 | <code>Array<string></code> | Branches which trigger a release.<br/>__*Default*__: [ "master" ]
**releaseEveryCommit**?🔹 | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`.<br/>__*Default*__: true
**releaseSchedule**?🔹 | <code>string</code> | CRON schedule to trigger new releases.<br/>__*Default*__: no scheduled releases
**releaseToNpm**?🔹 | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/>__*Default*__: false
**releaseWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for releasing from "master" when new versions are bumped.<br/>__*Default*__: true
**repository**?🔹 | <code>string</code> | The repository is the location where the actual code for your package lives.<br/>__*Optional*__
**repositoryDirectory**?🔹 | <code>string</code> | If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives.<br/>__*Optional*__
**scripts**?🔹 | <code>Map<string, string></code> | npm scripts to include.<br/>__*Default*__: {}
**srcdir**?🔹 | <code>string</code> | Typescript sources directory.<br/>__*Default*__: "src"
**stability**?🔹 | <code>string</code> | Package's Stability.<br/>__*Optional*__
**testdir**?🔹 | <code>string</code> | Tests directory.<br/>__*Default*__: "test"
**workflowBootstrapSteps**?🔹 | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/>__*Default*__: "yarn install --frozen-lockfile && yarn projen"
**workflowContainerImage**?🔹 | <code>string</code> | Container image to use for GitHub workflows.<br/>__*Default*__: default image
**workflowNodeVersion**?🔹 | <code>string</code> | The node version to use in GitHub workflows.<br/>__*Default*__: same as `minNodeVersion`



## struct NodeWorkflowSteps 🔹 <a id="projen-nodeworkflowsteps"></a>






Name | Type | Description 
-----|------|-------------
**antitamper**🔹 | <code>Array<any></code> | <span></span>
**install**🔹 | <code>Array<any></code> | <span></span>



## struct PeerDependencyOptions 🔹 <a id="projen-peerdependencyoptions"></a>






Name | Type | Description 
-----|------|-------------
**pinnedDevDependency**?🔹 | <code>boolean</code> | Automatically add a pinned dev dependency.<br/>__*Default*__: true



## struct ProjectOptions 🔹 <a id="projen-projectoptions"></a>






Name | Type | Description 
-----|------|-------------
**mkdocs**?🔹 | <code>boolean</code> | Whether to enable MkDocs.<br/>__*Default*__: false
**mkdocsConfig**?🔹 | <code>[MkDocsProps](#projen-mkdocsprops)</code> | If mkdocs is true, then this can be used to customize the mkdocs site.<br/>__*Default*__: off
**outdir**?🔹 | <code>string</code> | The root directory of the project.<br/>__*Default*__: "."
**parent**?🔹 | <code>[Project](#projen-project)</code> | The parent project, if this project is part of a bigger project.<br/>__*Optional*__



## struct ResolveOptions 🔹 <a id="projen-resolveoptions"></a>


Resolve options.



Name | Type | Description 
-----|------|-------------
**omitEmpty**?🔹 | <code>boolean</code> | Omits empty arrays and objects.<br/>__*Default*__: false



## struct Rule 🔹 <a id="projen-rule"></a>


A Make rule.



Name | Type | Description 
-----|------|-------------
**targets**🔹 | <code>Array<string></code> | Files to be created or updated by this rule.
**phony**?🔹 | <code>boolean</code> | Marks whether the target is phony.<br/>__*Default*__: false
**prerequisites**?🔹 | <code>Array<string></code> | Files that are used as inputs to create a target.<br/>__*Default*__: []
**recipe**?🔹 | <code>Array<string></code> | Commands that are run (using prerequisites as inputs) to create a target.<br/>__*Default*__: []



## struct SampleDirOptions 🔹 <a id="projen-samplediroptions"></a>


SampleDir options.



Name | Type | Description 
-----|------|-------------
**files**🔹 | <code>Map<string, string></code> | The files to render into the directory.



## struct SampleFileOptions 🔹 <a id="projen-samplefileoptions"></a>


Options for the SampleFile object.



Name | Type | Description 
-----|------|-------------
**contents**🔹 | <code>string</code> | The contents of the file to write.



## struct TextFileOptions 🔹 <a id="projen-textfileoptions"></a>


Options for `TextFile`.



Name | Type | Description 
-----|------|-------------
**committed**?🔹 | <code>boolean</code> | Indicates whether this file should be committed to git or ignored.<br/>__*Default*__: true
**editGitignore**?🔹 | <code>boolean</code> | Update the project's .gitignore file.<br/>__*Default*__: true
**lines**?🔹 | <code>Array<string></code> | The contents of the text file.<br/>__*Default*__: [] empty file
**readonly**?🔹 | <code>boolean</code> | Whether the generated file should be readonly.<br/>__*Default*__: true



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
**allowJs**?🔹 | <code>boolean</code> | Allow JavaScript files to be compiled.<br/>__*Default*__: false
**allowSyntheticDefaultImports**?🔹 | <code>boolean</code> | Allow default imports from modules with no default export.<br/>__*Optional*__
**alwaysStrict**?🔹 | <code>boolean</code> | Ensures that your files are parsed in the ECMAScript strict mode, and emit “use strict” for each source file.<br/>__*Default*__: true
**declaration**?🔹 | <code>boolean</code> | To be specified along with the above.<br/>__*Optional*__
**declarationDir**?🔹 | <code>string</code> | Offers a way to configure the root directory for where declaration files are emitted.<br/>__*Optional*__
**esModuleInterop**?🔹 | <code>boolean</code> | Emit __importStar and __importDefault helpers for runtime babel ecosystem compatibility and enable --allowSyntheticDefaultImports for typesystem compatibility.<br/>__*Default*__: false
**experimentalDecorators**?🔹 | <code>boolean</code> | Enables experimental support for decorators, which is in stage 2 of the TC39 standardization process.<br/>__*Default*__: true
**forceConsistentCasingInFileNames**?🔹 | <code>boolean</code> | Disallow inconsistently-cased references to the same file.<br/>__*Default*__: false
**inlineSourceMap**?🔹 | <code>boolean</code> | When set, instead of writing out a .js.map file to provide source maps, TypeScript will embed the source map content in the .js files.<br/>__*Default*__: true
**inlineSources**?🔹 | <code>boolean</code> | When set, TypeScript will include the original content of the .ts file as an embedded string in the source map. This is often useful in the same cases as inlineSourceMap.<br/>__*Default*__: true
**isolatedModules**?🔹 | <code>boolean</code> | Perform additional checks to ensure that separate compilation (such as with transpileModule or @babel/plugin-transform-typescript) would be safe.<br/>__*Default*__: false
**jsx**?🔹 | <code>[TypeScriptJsxMode](#projen-typescriptjsxmode)</code> | Support JSX in .tsx files: "react", "preserve", "react-native".<br/>__*Default*__: undefined
**lib**?🔹 | <code>Array<string></code> | Reference for type definitions / libraries to use (eg.<br/>__*Default*__: [ "es2018" ]
**module**?🔹 | <code>string</code> | Sets the module system for the program.<br/>__*Default*__: "CommonJS"
**moduleResolution**?🔹 | <code>[TypeScriptModuleResolution](#projen-typescriptmoduleresolution)</code> | Determine how modules get resolved.<br/>__*Default*__: "node"
**noEmit**?🔹 | <code>boolean</code> | Do not emit outputs.<br/>__*Default*__: false
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
**skipLibCheck**?🔹 | <code>boolean</code> | Skip type checking of all declaration files (*.d.ts).<br/>__*Default*__: false
**strict**?🔹 | <code>boolean</code> | The strict flag enables a wide range of type checking behavior that results in stronger guarantees of program correctness.<br/>__*Default*__: true
**strictNullChecks**?🔹 | <code>boolean</code> | When strictNullChecks is false, null and undefined are effectively ignored by the language.<br/>__*Default*__: true
**strictPropertyInitialization**?🔹 | <code>boolean</code> | When set to true, TypeScript will raise an error when a class property was declared but not set in the constructor.<br/>__*Default*__: true
**stripInternal**?🔹 | <code>boolean</code> | Do not emit declarations for code that has an @internal annotation in it’s JSDoc comment.<br/>__*Default*__: true
**target**?🔹 | <code>string</code> | Modern browsers support all ES6 features, so ES6 is a good choice.<br/>__*Default*__: "ES2018"



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
**bundledDeps**?⚠️ | <code>Array<string></code> | List of dependencies to bundle into this module.<br/>__*Optional*__
**codeCov**?⚠️ | <code>boolean</code> | Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret.<br/>__*Default*__: false
**codeCovTokenSecret**?⚠️ | <code>string</code> | Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories.<br/>__*Default*__: if this option is not specified, only public repositories are supported
**compileBeforeTest**?⚠️ | <code>boolean</code> | Compile the code before running tests.<br/>__*Default*__: the default behavior is to delete the lib/ directory and run jest typescript tests and only if all tests pass, run the compiler.
**copyrightOwner**?⚠️ | <code>string</code> | License copyright owner.<br/>__*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?⚠️ | <code>string</code> | The copyright years to put in the LICENSE file.<br/>__*Default*__: current year
**defaultReleaseBranch**?⚠️ | <code>string</code> | The name of the main release branch.<br/>__*Default*__: "master"
**dependabot**?⚠️ | <code>boolean</code> | Include dependabot configuration.<br/>__*Default*__: true
**dependabotOptions**?⚠️ | <code>[DependabotOptions](#projen-github-dependabotoptions)</code> | Options for dependabot.<br/>__*Default*__: default options
**dependencies**?⚠️ | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**deps**?⚠️ | <code>Array<string></code> | Runtime dependencies of this module.<br/>__*Default*__: []
**description**?⚠️ | <code>string</code> | The description is just a string that helps people understand the purpose of the package.<br/>__*Optional*__
**devDependencies**?⚠️ | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**devDeps**?⚠️ | <code>Array<string></code> | Build dependencies for this module.<br/>__*Default*__: []
**disableTsconfig**?⚠️ | <code>boolean</code> | Do not generate a `tsconfig.json` file (used by jsii projects since tsconfig.json is generated by the jsii compiler).<br/>__*Default*__: false
**docgen**?⚠️ | <code>boolean</code> | Docgen by Typedoc.<br/>__*Default*__: false
**docsDirectory**?⚠️ | <code>string</code> | Docs directory.<br/>__*Default*__: "docs"
**entrypoint**?⚠️ | <code>string</code> | Module entrypoint (`main` in `package.json`).<br/>__*Default*__: "lib/index.js"
**entrypointTypes**?⚠️ | <code>string</code> | The .d.ts file that includes the type declarations for this module.<br/>__*Default*__: .d.ts file derived from the project's entrypoint (usually lib/index.d.ts)
**eslint**?⚠️ | <code>boolean</code> | Setup eslint.<br/>__*Default*__: true
**eslintOptions**?⚠️ | <code>[EslintOptions](#projen-eslintoptions)</code> | Eslint options.<br/>__*Default*__: opinionated default options
**gitignore**?⚠️ | <code>Array<string></code> | Additional entries to .gitignore.<br/>__*Optional*__
**homepage**?⚠️ | <code>string</code> | Package's Homepage / Website.<br/>__*Optional*__
**jest**?⚠️ | <code>boolean</code> | Setup jest unit tests.<br/>__*Default*__: true
**jestOptions**?⚠️ | <code>[JestOptions](#projen-jestoptions)</code> | Jest options.<br/>__*Default*__: default options
**keywords**?⚠️ | <code>Array<string></code> | Keywords to include in `package.json`.<br/>__*Optional*__
**libdir**?⚠️ | <code>string</code> | Compiler artifacts output directory.<br/>__*Default*__: "lib"
**license**?⚠️ | <code>string</code> | License's SPDX identifier.<br/>__*Optional*__
**licensed**?⚠️ | <code>boolean</code> | Indicates if a license should be added.<br/>__*Default*__: true
**maxNodeVersion**?⚠️ | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/>__*Default*__: no max
**mergify**?⚠️ | <code>boolean</code> | Adds mergify configuration.<br/>__*Default*__: true
**mergifyAutoMergeLabel**?⚠️ | <code>string</code> | Automatically merge PRs that build successfully and have this label.<br/>__*Default*__: "auto-merge"
**mergifyOptions**?⚠️ | <code>[MergifyOptions](#projen-github-mergifyoptions)</code> | Options for mergify.<br/>__*Default*__: default options
**minNodeVersion**?⚠️ | <code>string</code> | Minimum Node.js version to require via package.json `engines` (inclusive).<br/>__*Default*__: no "engines" specified
**mkdocs**?⚠️ | <code>boolean</code> | Whether to enable MkDocs.<br/>__*Default*__: false
**mkdocsConfig**?⚠️ | <code>[MkDocsProps](#projen-mkdocsprops)</code> | If mkdocs is true, then this can be used to customize the mkdocs site.<br/>__*Default*__: off
**npmDistTag**?⚠️ | <code>string</code> | The dist-tag to use when releasing to npm.<br/>__*Default*__: "latest"
**npmRegistry**?⚠️ | <code>string</code> | The registry url to use when releasing packages.<br/>__*Default*__: "registry.npmjs.org"
**npmTaskExecution**?⚠️ | <code>[NpmTaskExecution](#projen-npmtaskexecution)</code> | Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz).<br/>__*Default*__: NpmTaskExecution.PROJEN
**npmignore**?⚠️ | <code>Array<string></code> | Additional entries to .npmignore.<br/>__*Optional*__
**npmignoreEnabled**?⚠️ | <code>boolean</code> | Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs.<br/>__*Default*__: true
**outdir**?⚠️ | <code>string</code> | The root directory of the project.<br/>__*Default*__: "."
**package**?⚠️ | <code>boolean</code> | Defines a `yarn package` command that will produce a tarball and place it under `dist/js`.<br/>__*Default*__: true
**packageManager**?⚠️ | <code>[NodePackageManager](#projen-nodepackagemanager)</code> | The Node Package Manager used to execute scripts.<br/>__*Default*__: NodePackageManager.YARN
**parent**?⚠️ | <code>[Project](#projen-project)</code> | The parent project, if this project is part of a bigger project.<br/>__*Optional*__
**peerDependencies**?⚠️ | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**peerDependencyOptions**?⚠️ | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | Options for `peerDeps`.<br/>__*Optional*__
**peerDeps**?⚠️ | <code>Array<string></code> | Peer dependencies for this module.<br/>__*Default*__: []
**projenCommand**?⚠️ | <code>string</code> | The shell command to use in order to run the projen CLI.<br/>__*Default*__: "npx projen"
**projenDevDependency**?⚠️ | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/>__*Default*__: true
**projenUpgradeAutoMerge**?⚠️ | <code>boolean</code> | Automatically merge projen upgrade PRs when build passes.<br/>__*Default*__: "true" if mergify auto-merge is enabled (default)
**projenUpgradeSchedule**?⚠️ | <code>Array<string></code> | Customize the projenUpgrade schedule in cron expression.<br/>__*Default*__: [ "0 6 * * *" ]
**projenUpgradeSecret**?⚠️ | <code>string</code> | Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`).<br/>__*Default*__: no automatic projen upgrade pull requests
**projenVersion**?⚠️ | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/>__*Default*__: Semver.latest()
**pullRequestTemplate**?⚠️ | <code>boolean</code> | Include a GitHub pull request template.<br/>__*Default*__: true
**pullRequestTemplateContents**?⚠️ | <code>string</code> | The contents of the pull request template.<br/>__*Default*__: default content
**rebuildBot**?⚠️ | <code>boolean</code> | Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request.<br/>__*Default*__: true
**rebuildBotCommand**?⚠️ | <code>string</code> | The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch.<br/>__*Default*__: "rebuild"
**releaseBranches**?⚠️ | <code>Array<string></code> | Branches which trigger a release.<br/>__*Default*__: [ "master" ]
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
**testdir**?⚠️ | <code>string</code> | Tests directory.<br/>__*Default*__: "test"
**tsconfig**?⚠️ | <code>[TypescriptConfigOptions](#projen-typescriptconfigoptions)</code> | Custom TSConfig.<br/>__*Optional*__
**typescriptVersion**?⚠️ | <code>string</code> | TypeScript version to use.<br/>__*Default*__: "^3.9.5"
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
**bundledDependencies**?⚠️ | <code>Array<string></code> | __*Optional*__
**bundledDeps**?🔹 | <code>Array<string></code> | List of dependencies to bundle into this module.<br/>__*Optional*__
**codeCov**?🔹 | <code>boolean</code> | Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret.<br/>__*Default*__: false
**codeCovTokenSecret**?🔹 | <code>string</code> | Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories.<br/>__*Default*__: if this option is not specified, only public repositories are supported
**compileBeforeTest**?🔹 | <code>boolean</code> | Compile the code before running tests.<br/>__*Default*__: the default behavior is to delete the lib/ directory and run jest typescript tests and only if all tests pass, run the compiler.
**copyrightOwner**?🔹 | <code>string</code> | License copyright owner.<br/>__*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?🔹 | <code>string</code> | The copyright years to put in the LICENSE file.<br/>__*Default*__: current year
**defaultReleaseBranch**?🔹 | <code>string</code> | The name of the main release branch.<br/>__*Default*__: "master"
**dependabot**?🔹 | <code>boolean</code> | Include dependabot configuration.<br/>__*Default*__: true
**dependabotOptions**?🔹 | <code>[DependabotOptions](#projen-github-dependabotoptions)</code> | Options for dependabot.<br/>__*Default*__: default options
**dependencies**?⚠️ | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**deps**?🔹 | <code>Array<string></code> | Runtime dependencies of this module.<br/>__*Default*__: []
**description**?🔹 | <code>string</code> | The description is just a string that helps people understand the purpose of the package.<br/>__*Optional*__
**devDependencies**?⚠️ | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**devDeps**?🔹 | <code>Array<string></code> | Build dependencies for this module.<br/>__*Default*__: []
**disableTsconfig**?🔹 | <code>boolean</code> | Do not generate a `tsconfig.json` file (used by jsii projects since tsconfig.json is generated by the jsii compiler).<br/>__*Default*__: false
**docgen**?🔹 | <code>boolean</code> | Docgen by Typedoc.<br/>__*Default*__: false
**docsDirectory**?🔹 | <code>string</code> | Docs directory.<br/>__*Default*__: "docs"
**entrypoint**?🔹 | <code>string</code> | Module entrypoint (`main` in `package.json`).<br/>__*Default*__: "lib/index.js"
**entrypointTypes**?🔹 | <code>string</code> | The .d.ts file that includes the type declarations for this module.<br/>__*Default*__: .d.ts file derived from the project's entrypoint (usually lib/index.d.ts)
**eslint**?🔹 | <code>boolean</code> | Setup eslint.<br/>__*Default*__: true
**eslintOptions**?🔹 | <code>[EslintOptions](#projen-eslintoptions)</code> | Eslint options.<br/>__*Default*__: opinionated default options
**gitignore**?🔹 | <code>Array<string></code> | Additional entries to .gitignore.<br/>__*Optional*__
**homepage**?🔹 | <code>string</code> | Package's Homepage / Website.<br/>__*Optional*__
**jest**?🔹 | <code>boolean</code> | Setup jest unit tests.<br/>__*Default*__: true
**jestOptions**?🔹 | <code>[JestOptions](#projen-jestoptions)</code> | Jest options.<br/>__*Default*__: default options
**keywords**?🔹 | <code>Array<string></code> | Keywords to include in `package.json`.<br/>__*Optional*__
**libdir**?🔹 | <code>string</code> | Compiler artifacts output directory.<br/>__*Default*__: "lib"
**license**?🔹 | <code>string</code> | License's SPDX identifier.<br/>__*Optional*__
**licensed**?🔹 | <code>boolean</code> | Indicates if a license should be added.<br/>__*Default*__: true
**maxNodeVersion**?🔹 | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/>__*Default*__: no max
**mergify**?🔹 | <code>boolean</code> | Adds mergify configuration.<br/>__*Default*__: true
**mergifyAutoMergeLabel**?🔹 | <code>string</code> | Automatically merge PRs that build successfully and have this label.<br/>__*Default*__: "auto-merge"
**mergifyOptions**?🔹 | <code>[MergifyOptions](#projen-github-mergifyoptions)</code> | Options for mergify.<br/>__*Default*__: default options
**minNodeVersion**?🔹 | <code>string</code> | Minimum Node.js version to require via package.json `engines` (inclusive).<br/>__*Default*__: no "engines" specified
**mkdocs**?🔹 | <code>boolean</code> | Whether to enable MkDocs.<br/>__*Default*__: false
**mkdocsConfig**?🔹 | <code>[MkDocsProps](#projen-mkdocsprops)</code> | If mkdocs is true, then this can be used to customize the mkdocs site.<br/>__*Default*__: off
**npmDistTag**?🔹 | <code>string</code> | The dist-tag to use when releasing to npm.<br/>__*Default*__: "latest"
**npmRegistry**?🔹 | <code>string</code> | The registry url to use when releasing packages.<br/>__*Default*__: "registry.npmjs.org"
**npmTaskExecution**?🔹 | <code>[NpmTaskExecution](#projen-npmtaskexecution)</code> | Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz).<br/>__*Default*__: NpmTaskExecution.PROJEN
**npmignore**?🔹 | <code>Array<string></code> | Additional entries to .npmignore.<br/>__*Optional*__
**npmignoreEnabled**?🔹 | <code>boolean</code> | Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs.<br/>__*Default*__: true
**outdir**?🔹 | <code>string</code> | The root directory of the project.<br/>__*Default*__: "."
**package**?🔹 | <code>boolean</code> | Defines a `yarn package` command that will produce a tarball and place it under `dist/js`.<br/>__*Default*__: true
**packageManager**?🔹 | <code>[NodePackageManager](#projen-nodepackagemanager)</code> | The Node Package Manager used to execute scripts.<br/>__*Default*__: NodePackageManager.YARN
**parent**?🔹 | <code>[Project](#projen-project)</code> | The parent project, if this project is part of a bigger project.<br/>__*Optional*__
**peerDependencies**?⚠️ | <code>Map<string, [Semver](#projen-semver)></code> | __*Optional*__
**peerDependencyOptions**?🔹 | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | Options for `peerDeps`.<br/>__*Optional*__
**peerDeps**?🔹 | <code>Array<string></code> | Peer dependencies for this module.<br/>__*Default*__: []
**projenCommand**?🔹 | <code>string</code> | The shell command to use in order to run the projen CLI.<br/>__*Default*__: "npx projen"
**projenDevDependency**?🔹 | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/>__*Default*__: true
**projenUpgradeAutoMerge**?🔹 | <code>boolean</code> | Automatically merge projen upgrade PRs when build passes.<br/>__*Default*__: "true" if mergify auto-merge is enabled (default)
**projenUpgradeSchedule**?🔹 | <code>Array<string></code> | Customize the projenUpgrade schedule in cron expression.<br/>__*Default*__: [ "0 6 * * *" ]
**projenUpgradeSecret**?🔹 | <code>string</code> | Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`).<br/>__*Default*__: no automatic projen upgrade pull requests
**projenVersion**?🔹 | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/>__*Default*__: Semver.latest()
**pullRequestTemplate**?🔹 | <code>boolean</code> | Include a GitHub pull request template.<br/>__*Default*__: true
**pullRequestTemplateContents**?🔹 | <code>string</code> | The contents of the pull request template.<br/>__*Default*__: default content
**rebuildBot**?🔹 | <code>boolean</code> | Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request.<br/>__*Default*__: true
**rebuildBotCommand**?🔹 | <code>string</code> | The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch.<br/>__*Default*__: "rebuild"
**releaseBranches**?🔹 | <code>Array<string></code> | Branches which trigger a release.<br/>__*Default*__: [ "master" ]
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
**testdir**?🔹 | <code>string</code> | Tests directory.<br/>__*Default*__: "test"
**tsconfig**?🔹 | <code>[TypescriptConfigOptions](#projen-typescriptconfigoptions)</code> | Custom TSConfig.<br/>__*Optional*__
**typescriptVersion**?🔹 | <code>string</code> | TypeScript version to use.<br/>__*Default*__: "^3.9.5"
**workflowBootstrapSteps**?🔹 | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/>__*Default*__: "yarn install --frozen-lockfile && yarn projen"
**workflowContainerImage**?🔹 | <code>string</code> | Container image to use for GitHub workflows.<br/>__*Default*__: default image
**workflowNodeVersion**?🔹 | <code>string</code> | The node version to use in GitHub workflows.<br/>__*Default*__: same as `minNodeVersion`



## struct TypescriptConfigOptions 🔹 <a id="projen-typescriptconfigoptions"></a>






Name | Type | Description 
-----|------|-------------
**compilerOptions**🔹 | <code>[TypeScriptCompilerOptions](#projen-typescriptcompileroptions)</code> | Compiler options to use.
**exclude**?🔹 | <code>Array<string></code> | Filters results from the "include" option.<br/>__*Default*__: node_modules is excluded by default
**fileName**?🔹 | <code>string</code> | __*Default*__: "tsconfig.json"
**include**?🔹 | <code>Array<string></code> | Specifies a list of glob patterns that match TypeScript files to be included in compilation.<br/>__*Default*__: all .ts files recursively



## struct VersionOptions 🔹 <a id="projen-versionoptions"></a>






Name | Type | Description 
-----|------|-------------
**releaseBranch**🔹 | <code>string</code> | The name of the release branch where the code and tags are pushed to.



## struct YamlFileOptions 🔹 <a id="projen-yamlfileoptions"></a>






Name | Type | Description 
-----|------|-------------
**committed**?🔹 | <code>boolean</code> | Indicates whether this file should be committed to git or ignored.<br/>__*Default*__: true
**editGitignore**?🔹 | <code>boolean</code> | Update the project's .gitignore file.<br/>__*Default*__: true
**marker**?🔹 | <code>boolean</code> | Adds the projen marker as a "JSON-comment" to the root object.<br/>__*Default*__: false
**obj**?🔹 | <code>any</code> | The object that will be serialized.<br/>__*Default*__: {} an empty object (use `file.obj` to mutate).
**omitEmpty**?🔹 | <code>boolean</code> | Omits empty objects and arrays.<br/>__*Default*__: false
**readonly**?🔹 | <code>boolean</code> | Whether the generated file should be readonly.<br/>__*Default*__: true



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


## enum DockerComposeProtocol 🔹 <a id="projen-dockercomposeprotocol"></a>

Network protocol for port mapping.

Name | Description
-----|-----
**TCP** 🔹|TCP protocol.
**UDP** 🔹|UDP protocol.


## enum NodePackageManager 🔹 <a id="projen-nodepackagemanager"></a>

The node package manager to use.

Name | Description
-----|-----
**YARN** 🔹|Use `yarn` as the package manager.
**NPM** 🔹|Use `npm` as the package manager.


## enum NpmTaskExecution 🔹 <a id="projen-npmtaskexecution"></a>



Name | Description
-----|-----
**PROJEN** 🔹|`package.json` scripts invoke to the projen CLI.
**SHELL** 🔹|Task is implemented directly as a shell script within `package.json`.


## enum Stability 🔹 <a id="projen-stability"></a>



Name | Description
-----|-----
**EXPERIMENTAL** 🔹|
**STABLE** 🔹|
**DEPRECATED** 🔹|


## enum TypeScriptJsxMode 🔹 <a id="projen-typescriptjsxmode"></a>

Determines how JSX should get transformed into valid JavaScript.

Name | Description
-----|-----
**PRESERVE** 🔹|Keeps the JSX as part of the output to be further consumed by another transform step (e.g. Babel).
**REACT** 🔹|Converts JSX syntax into React.createElement, does not need to go through a JSX transformation before use, and the output will have a .js file extension.
**REACT_NATIVE** 🔹|Keeps all JSX like 'preserve' mode, but output will have a .js extension.


## enum TypeScriptModuleResolution 🔹 <a id="projen-typescriptmoduleresolution"></a>

Determines how modules get resolved.

Name | Description
-----|-----
**CLASSIC** 🔹|TypeScript's former default resolution strategy.
**NODE** 🔹|Resolution strategy which attempts to mimic the Node.js module resolution strategy at runtime.


