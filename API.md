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
[DevEnvironmentDockerImage](#projen-devenvironmentdockerimage)|Options for specifying the Docker image of the container.
[DockerCompose](#projen-dockercompose)|Create a docker-compose YAML file.
[DockerComposeService](#projen-dockercomposeservice)|A docker-compose service.
[Eslint](#projen-eslint)|*No description*
[FileBase](#projen-filebase)|*No description*
[Gitpod](#projen-gitpod)|The Gitpod component which emits .gitpod.yml.
[IgnoreFile](#projen-ignorefile)|*No description*
[Jest](#projen-jest)|Installs the following npm scripts:.
[JsiiProject](#projen-jsiiproject)|Multi-language jsii library project.
[JsonFile](#projen-jsonfile)|Represents a JSON file.
[License](#projen-license)|*No description*
[Logger](#projen-logger)|Project-level logging utilities.
[Makefile](#projen-makefile)|Minimal Makefile.
[NodePackage](#projen-nodepackage)|Represents the npm `package.json` file.
[NodeProject](#projen-nodeproject)|Node.js project.
[ObjectFile](#projen-objectfile)|Represents an Object file.
[Project](#projen-project)|Base project.
[Publisher](#projen-publisher)|Implements GitHub jobs for publishing modules to package managers.
[SampleDir](#projen-sampledir)|Renders the given files into the directory if the directory does not exist.
[SampleFile](#projen-samplefile)|Produces a file with the given contents but only once, if the file doesn't already exist.
[SampleReadme](#projen-samplereadme)|Represents a README.md sample file. You are expected to manage this file after creation.
[Semver](#projen-semver)|*No description*
[TextFile](#projen-textfile)|A text file.
[TomlFile](#projen-tomlfile)|Represents a TOML file.
[TypeScriptAppProject](#projen-typescriptappproject)|TypeScript app.
[TypeScriptLibraryProject](#projen-typescriptlibraryproject)|*No description*
[TypeScriptProject](#projen-typescriptproject)|TypeScript project.
[TypescriptConfig](#projen-typescriptconfig)|*No description*
[Version](#projen-version)|*No description*
[XmlFile](#projen-xmlfile)|Represents an XML file.
[YamlFile](#projen-yamlfile)|Represents a YAML file.
[deps.Dependencies](#projen-deps-dependencies)|The `Dependencies` component is responsible to track the list of dependencies a project has, and then used by project types as the model for rendering project-specific dependency manifests such as the dependencies section `package.json` files.
[github.AutoMerge](#projen-github-automerge)|Sets up mergify to merging approved pull requests.
[github.Dependabot](#projen-github-dependabot)|Defines dependabot configuration for node projects.
[github.GitHub](#projen-github-github)|*No description*
[github.GithubWorkflow](#projen-github-githubworkflow)|*No description*
[github.Mergify](#projen-github-mergify)|*No description*
[github.PullRequestTemplate](#projen-github-pullrequesttemplate)|Template for GitHub pull requests.
[java.JavaProject](#projen-java-javaproject)|Java project.
[java.Junit](#projen-java-junit)|Implements JUnit-based testing.
[java.MavenCompile](#projen-java-mavencompile)|Adds the maven-compiler plugin to a POM file and the `compile` task.
[java.MavenPackaging](#projen-java-mavenpackaging)|Configures a maven project to produce a .jar archive with sources and javadocs.
[java.MavenSample](#projen-java-mavensample)|Java code sample.
[java.Pom](#projen-java-pom)|A Project Object Model or POM is the fundamental unit of work in Maven.
[java.Projenrc](#projen-java-projenrc)|Allows writing projenrc files in java.
[python.Pip](#projen-python-pip)|Manages dependencies using a requirements.txt file and the pip CLI tool.
[python.Poetry](#projen-python-poetry)|Manage project dependencies, virtual environments, and packaging through the poetry CLI tool.
[python.PoetryPyproject](#projen-python-poetrypyproject)|Represents configuration of a pyproject.toml file for a Poetry project.
[python.Pytest](#projen-python-pytest)|*No description*
[python.PythonProject](#projen-python-pythonproject)|Python project.
[python.PythonSample](#projen-python-pythonsample)|Python code sample.
[python.RequirementsFile](#projen-python-requirementsfile)|Specifies a list of packages to be installed using pip.
[python.SetupPy](#projen-python-setuppy)|Python packaging script where package metadata can be placed.
[python.Setuptools](#projen-python-setuptools)|Manages packaging through setuptools with a setup.py script.
[python.Venv](#projen-python-venv)|Manages a virtual environment through the Python venv module.
[tasks.Task](#projen-tasks-task)|A task that can be performed on the project.
[tasks.TaskRuntime](#projen-tasks-taskruntime)|The runtime component of the tasks engine.
[tasks.Tasks](#projen-tasks-tasks)|Defines project tasks.
[vscode.DevContainer](#projen-vscode-devcontainer)|A development environment running VSCode in a container;
[vscode.VsCode](#projen-vscode-vscode)|*No description*
[vscode.VsCodeLaunchConfig](#projen-vscode-vscodelaunchconfig)|VSCode launch configuration file (launch.json), useful for enabling in-editor debugger.
[web.NextComponent](#projen-web-nextcomponent)|*No description*
[web.NextJsProject](#projen-web-nextjsproject)|Next.js project without TypeScript.
[web.NextJsTypeDef](#projen-web-nextjstypedef)|*No description*
[web.NextJsTypeScriptProject](#projen-web-nextjstypescriptproject)|Next.js project with TypeScript.
[web.PostCss](#projen-web-postcss)|Declares a PostCSS dependency with a default config file.
[web.ReactComponent](#projen-web-reactcomponent)|*No description*
[web.ReactProject](#projen-web-reactproject)|React project without TypeScript.
[web.ReactTypeDef](#projen-web-reacttypedef)|*No description*
[web.ReactTypeScriptProject](#projen-web-reacttypescriptproject)|React project with TypeScript.
[web.TailwindConfig](#projen-web-tailwindconfig)|Declares a Tailwind CSS configuration file.


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
[DevEnvironmentOptions](#projen-devenvironmentoptions)|Base options for configuring a container-based development environemnt.
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
[GitpodOptions](#projen-gitpodoptions)|Constructor options for the Gitpod component.
[GitpodPort](#projen-gitpodport)|Options for an exposed port on Gitpod.
[GitpodPrebuilds](#projen-gitpodprebuilds)|Configure the Gitpod App for prebuilds.
[GitpodTask](#projen-gitpodtask)|Configure options for a task to be run when opening a Gitpod workspace (e.g. running tests, or starting a dev server).
[HasteConfig](#projen-hasteconfig)|*No description*
[JestConfigOptions](#projen-jestconfigoptions)|*No description*
[JestOptions](#projen-jestoptions)|*No description*
[JsiiDotNetTarget](#projen-jsiidotnettarget)|*No description*
[JsiiGoTarget](#projen-jsiigotarget)|Go target configuration.
[JsiiJavaTarget](#projen-jsiijavatarget)|*No description*
[JsiiProjectOptions](#projen-jsiiprojectoptions)|*No description*
[JsiiPythonTarget](#projen-jsiipythontarget)|*No description*
[JsiiReleaseGo](#projen-jsiireleasego)|Options for Go releases.
[JsiiReleaseMaven](#projen-jsiireleasemaven)|Options for Maven releases.
[JsiiReleaseNpm](#projen-jsiireleasenpm)|Options for npm release.
[JsiiReleaseNuget](#projen-jsiireleasenuget)|Options for NuGet releases.
[JsiiReleasePyPi](#projen-jsiireleasepypi)|Options for PyPI release.
[JsonFileOptions](#projen-jsonfileoptions)|Options for `JsonFile`.
[LicenseOptions](#projen-licenseoptions)|*No description*
[LoggerOptions](#projen-loggeroptions)|Options for logging utilities.
[MakefileOptions](#projen-makefileoptions)|Options for Makefiles.
[MarkableFileOptions](#projen-markablefileoptions)|Options for files that may include the Projen marker.
[NodePackageOptions](#projen-nodepackageoptions)|*No description*
[NodeProjectOptions](#projen-nodeprojectoptions)|*No description*
[NodeWorkflowSteps](#projen-nodeworkflowsteps)|*No description*
[ObjectFileOptions](#projen-objectfileoptions)|Options for `ObjectFile`.
[PeerDependencyOptions](#projen-peerdependencyoptions)|*No description*
[ProjectOptions](#projen-projectoptions)|*No description*
[PublisherOptions](#projen-publisheroptions)|Options for `Publisher`.
[ResolveOptions](#projen-resolveoptions)|Resolve options.
[Rule](#projen-rule)|A Make rule.
[SampleDirOptions](#projen-samplediroptions)|SampleDir options.
[SampleFileOptions](#projen-samplefileoptions)|Options for the SampleFile object.
[SampleReadmeProps](#projen-samplereadmeprops)|SampleReadme Properties.
[TextFileOptions](#projen-textfileoptions)|Options for `TextFile`.
[TomlFileOptions](#projen-tomlfileoptions)|Options for `TomlFile`.
[TypeScriptCompilerOptions](#projen-typescriptcompileroptions)|*No description*
[TypeScriptLibraryProjectOptions](#projen-typescriptlibraryprojectoptions)|*No description*
[TypeScriptProjectOptions](#projen-typescriptprojectoptions)|*No description*
[TypescriptConfigOptions](#projen-typescriptconfigoptions)|*No description*
[VersionOptions](#projen-versionoptions)|*No description*
[XmlFileOptions](#projen-xmlfileoptions)|Options for `XmlFile`.
[YamlFileOptions](#projen-yamlfileoptions)|Options for `JsonFile`.
[deps.Dependency](#projen-deps-dependency)|Represents a project dependency.
[deps.DependencyCoordinates](#projen-deps-dependencycoordinates)|Coordinates of the dependency (name and version).
[deps.DepsManifest](#projen-deps-depsmanifest)|*No description*
[github.AutoMergeOptions](#projen-github-automergeoptions)|*No description*
[github.DependabotIgnore](#projen-github-dependabotignore)|You can use the `ignore` option to customize which dependencies are updated.
[github.DependabotOptions](#projen-github-dependabotoptions)|*No description*
[github.MergifyOptions](#projen-github-mergifyoptions)|*No description*
[github.MergifyRule](#projen-github-mergifyrule)|*No description*
[github.PullRequestTemplateOptions](#projen-github-pullrequesttemplateoptions)|Options for `PullRequestTemplate`.
[java.JavaProjectOptions](#projen-java-javaprojectoptions)|Options for `JavaProject`.
[java.JunitOptions](#projen-java-junitoptions)|Options for `Junit`.
[java.MavenCompileOptions](#projen-java-mavencompileoptions)|Options for `MavenCompile`.
[java.MavenPackagingOptions](#projen-java-mavenpackagingoptions)|Options for `MavenPackage`.
[java.MavenSampleOptions](#projen-java-mavensampleoptions)|*No description*
[java.PluginExecution](#projen-java-pluginexecution)|Plugin execution definition.
[java.PluginOptions](#projen-java-pluginoptions)|Options for Maven plugins.
[java.PomOptions](#projen-java-pomoptions)|Options for `Pom`.
[java.ProjenrcCommonOptions](#projen-java-projenrccommonoptions)|Options for `Projenrc`.
[java.ProjenrcOptions](#projen-java-projenrcoptions)|*No description*
[python.PipOptions](#projen-python-pipoptions)|Options for pip.
[python.PoetryPyprojectOptions](#projen-python-poetrypyprojectoptions)|*No description*
[python.PoetryPyprojectOptionsWithoutDeps](#projen-python-poetrypyprojectoptionswithoutdeps)|*No description*
[python.PytestOptions](#projen-python-pytestoptions)|*No description*
[python.PythonPackagingOptions](#projen-python-pythonpackagingoptions)|*No description*
[python.PythonProjectOptions](#projen-python-pythonprojectoptions)|Options for `PythonProject`.
[python.PythonSampleOptions](#projen-python-pythonsampleoptions)|Options for python sample code.
[python.RequirementsFileOptions](#projen-python-requirementsfileoptions)|*No description*
[python.SetupPyOptions](#projen-python-setuppyoptions)|Fields to pass in the setup() function of setup.py.
[python.VenvOptions](#projen-python-venvoptions)|Options for venv.
[tasks.TaskCommonOptions](#projen-tasks-taskcommonoptions)|*No description*
[tasks.TaskOptions](#projen-tasks-taskoptions)|*No description*
[tasks.TaskSpec](#projen-tasks-taskspec)|Specification of a single task.
[tasks.TaskStep](#projen-tasks-taskstep)|A single step within a task.
[tasks.TaskStepOptions](#projen-tasks-taskstepoptions)|Options for task steps.
[tasks.TasksManifest](#projen-tasks-tasksmanifest)|Schema for `tasks.json`.
[vscode.DevContainerOptions](#projen-vscode-devcontaineroptions)|Constructor options for the DevContainer component.
[vscode.Presentation](#projen-vscode-presentation)|VSCode launch configuration Presentation interface "using the order, group, and hidden attributes in the presentation object you can sort, group, and hide configurations and compounds in the Debug configuration dropdown and in the Debug quick pick." Source: https://code.visualstudio.com/docs/editor/debugging#_launchjson-attributes.
[vscode.ServerReadyAction](#projen-vscode-serverreadyaction)|VSCode launch configuration ServerReadyAction interface "if you want to open a URL in a web browser whenever the program under debugging outputs a specific message to the debug console or integrated terminal." Source: https://code.visualstudio.com/docs/editor/debugging#_launchjson-attributes.
[vscode.VsCodeLaunchConfigurationEntry](#projen-vscode-vscodelaunchconfigurationentry)|Options for a 'VsCodeLaunchConfigurationEntry' Source: https://code.visualstudio.com/docs/editor/debugging#_launchjson-attributes.
[web.NextComponentOptions](#projen-web-nextcomponentoptions)|*No description*
[web.NextJsCommonProjectOptions](#projen-web-nextjscommonprojectoptions)|*No description*
[web.NextJsProjectOptions](#projen-web-nextjsprojectoptions)|*No description*
[web.NextJsTypeDefOptions](#projen-web-nextjstypedefoptions)|*No description*
[web.NextJsTypeScriptProjectOptions](#projen-web-nextjstypescriptprojectoptions)|*No description*
[web.PostCssOptions](#projen-web-postcssoptions)|*No description*
[web.ReactComponentOptions](#projen-web-reactcomponentoptions)|*No description*
[web.ReactProjectOptions](#projen-web-reactprojectoptions)|*No description*
[web.ReactTypeDefOptions](#projen-web-reacttypedefoptions)|*No description*
[web.ReactTypeScriptProjectOptions](#projen-web-reacttypescriptprojectoptions)|*No description*
[web.TailwindConfigOptions](#projen-web-tailwindconfigoptions)|*No description*


**Interfaces**

Name|Description
----|-----------
[IDevEnvironment](#projen-idevenvironment)|Abstract interface for container-based development environments, such as Gitpod and GitHub Codespaces.
[IDockerComposeServiceName](#projen-idockercomposeservicename)|An interface providing the name of a docker compose service.
[IDockerComposeVolumeBinding](#projen-idockercomposevolumebinding)|Volume binding information.
[IDockerComposeVolumeConfig](#projen-idockercomposevolumeconfig)|Storage for volume configuration.
[IMarkableFile](#projen-imarkablefile)|Files that may include the Projen marker.
[IResolver](#projen-iresolver)|API for resolving tokens when synthesizing file content.
[python.IPackageProvider](#projen-python-ipackageprovider)|*No description*
[python.IPythonDeps](#projen-python-ipythondeps)|*No description*
[python.IPythonEnv](#projen-python-ipythonenv)|*No description*
[python.IPythonPackaging](#projen-python-ipythonpackaging)|*No description*


**Enums**

Name|Description
----|-----------
[AutoRelease](#projen-autorelease)|Automatic bump modes.
[CdkApprovalLevel](#projen-cdkapprovallevel)|*No description*
[DockerComposeProtocol](#projen-dockercomposeprotocol)|Network protocol for port mapping.
[GitpodOnOpen](#projen-gitpodonopen)|What to do when a service on a port is detected.
[GitpodOpenIn](#projen-gitpodopenin)|Configure where in the IDE the terminal should be opened.
[GitpodOpenMode](#projen-gitpodopenmode)|Configure how the terminal should be opened relative to the previous task.
[GitpodPortVisibility](#projen-gitpodportvisibility)|Whether the port visibility should be private or public.
[LogLevel](#projen-loglevel)|Logging verbosity.
[NodePackageManager](#projen-nodepackagemanager)|The node package manager to use.
[NpmAccess](#projen-npmaccess)|Npm package access level.
[NpmTaskExecution](#projen-npmtaskexecution)|*No description*
[ProjectType](#projen-projecttype)|Which type of project this is.
[Stability](#projen-stability)|*No description*
[TypeScriptJsxMode](#projen-typescriptjsxmode)|Determines how JSX should get transformed into valid JavaScript.
[TypeScriptModuleResolution](#projen-typescriptmoduleresolution)|Determines how modules get resolved.
[deps.DependencyType](#projen-deps-dependencytype)|Type of dependency.
[github.DependabotScheduleInterval](#projen-github-dependabotscheduleinterval)|How often to check for new versions and raise pull requests for version updates.
[github.VersioningStrategy](#projen-github-versioningstrategy)|The strategy to use when edits manifest and lock files.
[tasks.TaskCategory](#projen-tasks-taskcategory)|*No description*
[vscode.InternalConsoleOptions](#projen-vscode-internalconsoleoptions)|Controls the visibility of the VSCode Debug Console panel during a debugging session Source: https://code.visualstudio.com/docs/editor/debugging#_launchjson-attributes.



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
  * **name** (<code>string</code>)  This is the name of your project. 
  * **clobber** (<code>boolean</code>)  Add a `clobber` task which resets the repo to origin. __*Default*__: true
  * **devContainer** (<code>boolean</code>)  Add a VSCode development environment (used for GitHub Codespaces). __*Default*__: false
  * **gitpod** (<code>boolean</code>)  Add a Gitpod development environment. __*Default*__: false
  * **jsiiFqn** (<code>string</code>)  The JSII FQN (fully qualified name) of the project class. __*Default*__: undefined
  * **logging** (<code>[LoggerOptions](#projen-loggeroptions)</code>)  Configure logging options such as verbosity. __*Default*__: {}
  * **outdir** (<code>string</code>)  The root directory of the project. __*Default*__: "."
  * **parent** (<code>[Project](#projen-project)</code>)  The parent project, if this project is part of a bigger project. __*Optional*__
  * **projectType** (<code>[ProjectType](#projen-projecttype)</code>)  Which type of project this is (library/app). __*Default*__: ProjectType.UNKNOWN
  * **readme** (<code>[SampleReadmeProps](#projen-samplereadmeprops)</code>)  The README setup. __*Default*__: { filename: 'README.md', contents: '# replace this' }
  * **allowLibraryDependencies** (<code>boolean</code>)  Allow the project to include `peerDependencies` and `bundledDependencies`. __*Default*__: true
  * **authorEmail** (<code>string</code>)  Author's e-mail. __*Optional*__
  * **authorName** (<code>string</code>)  Author's name. __*Optional*__
  * **authorOrganization** (<code>boolean</code>)  Author's Organization. __*Optional*__
  * **authorUrl** (<code>string</code>)  Author's URL / Website. __*Optional*__
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. __*Default*__: true
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. __*Optional*__
  * **bundledDeps** (<code>Array<string></code>)  List of dependencies to bundle into this module. __*Optional*__
  * **deps** (<code>Array<string></code>)  Runtime dependencies of this module. __*Default*__: []
  * **description** (<code>string</code>)  The description is just a string that helps people understand the purpose of the package. __*Optional*__
  * **devDeps** (<code>Array<string></code>)  Build dependencies for this module. __*Default*__: []
  * **entrypoint** (<code>string</code>)  Module entrypoint (`main` in `package.json`). __*Default*__: "lib/index.js"
  * **homepage** (<code>string</code>)  Package's Homepage / Website. __*Optional*__
  * **keywords** (<code>Array<string></code>)  Keywords to include in `package.json`. __*Optional*__
  * **license** (<code>string</code>)  License's SPDX identifier. __*Default*__: "Apache-2.0"
  * **licensed** (<code>boolean</code>)  Indicates if a license should be added. __*Default*__: true
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). __*Default*__: no max
  * **minNodeVersion** (<code>string</code>)  Minimum Node.js version to require via package.json `engines` (inclusive). __*Default*__: no "engines" specified
  * **npmAccess** (<code>[NpmAccess](#projen-npmaccess)</code>)  Access level of the npm package. __*Default*__: for scoped packages (e.g. `foo@bar`), the default is `NpmAccess.RESTRICTED`, for non-scoped packages, the default is `NpmAccess.PUBLIC`.
  * **npmDistTag** (<code>string</code>)  Tags can be used to provide an alias instead of version numbers. __*Default*__: "latest"
  * **npmRegistry** (<code>string</code>)  The host name of the npm registry to publish to. __*Optional*__
  * **npmRegistryUrl** (<code>string</code>)  The base URL of the npm package registry. __*Default*__: "https://registry.npmjs.org"
  * **npmTaskExecution** (<code>[NpmTaskExecution](#projen-npmtaskexecution)</code>)  Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz). __*Default*__: NpmTaskExecution.PROJEN
  * **packageManager** (<code>[NodePackageManager](#projen-nodepackagemanager)</code>)  The Node Package Manager used to execute scripts. __*Default*__: NodePackageManager.YARN
  * **packageName** (<code>string</code>)  The "name" in package.json. __*Default*__: defaults to project name
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  Options for `peerDeps`. __*Optional*__
  * **peerDeps** (<code>Array<string></code>)  Peer dependencies for this module. __*Default*__: []
  * **projenCommand** (<code>string</code>)  The shell command to use in order to run the projen CLI. __*Default*__: "npx projen"
  * **repository** (<code>string</code>)  The repository is the location where the actual code for your package lives. __*Optional*__
  * **repositoryDirectory** (<code>string</code>)  If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives. __*Optional*__
  * **scripts** (<code>Map<string, string></code>)  npm scripts to include. __*Default*__: {}
  * **stability** (<code>string</code>)  Package's Stability. __*Optional*__
  * **defaultReleaseBranch** (<code>string</code>)  The name of the main release branch. 
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files on git. __*Default*__: true
  * **artifactsDirectory** (<code>string</code>)  A directory which will contain artifacts to be published to npm. __*Default*__: "dist"
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. __*Default*__: true if not a subproject
  * **codeCov** (<code>boolean</code>)  Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret. __*Default*__: false
  * **codeCovTokenSecret** (<code>string</code>)  Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories. __*Default*__: if this option is not specified, only public repositories are supported
  * **copyrightOwner** (<code>string</code>)  License copyright owner. __*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. __*Default*__: current year
  * **dependabot** (<code>boolean</code>)  Include dependabot configuration. __*Default*__: true
  * **dependabotOptions** (<code>[github.DependabotOptions](#projen-github-dependabotoptions)</code>)  Options for dependabot. __*Default*__: default options
  * **gitignore** (<code>Array<string></code>)  Additional entries to .gitignore. __*Optional*__
  * **jest** (<code>boolean</code>)  Setup jest unit tests. __*Default*__: true
  * **jestOptions** (<code>[JestOptions](#projen-jestoptions)</code>)  Jest options. __*Default*__: default options
  * **jsiiReleaseVersion** (<code>string</code>)  Version requirement of `jsii-release` which is used to publish modules to npm. __*Default*__: "latest"
  * **mergify** (<code>boolean</code>)  Adds mergify configuration. __*Default*__: true
  * **mergifyAutoMergeLabel** (<code>string</code>)  Automatically merge PRs that build successfully and have this label. __*Default*__: "auto-merge"
  * **mergifyOptions** (<code>[github.MergifyOptions](#projen-github-mergifyoptions)</code>)  Options for mergify. __*Default*__: default options
  * **npmignore** (<code>Array<string></code>)  Additional entries to .npmignore. __*Optional*__
  * **npmignoreEnabled** (<code>boolean</code>)  Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs. __*Default*__: true
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. __*Default*__: true
  * **projenUpgradeAutoMerge** (<code>boolean</code>)  Automatically merge projen upgrade PRs when build passes. __*Default*__: "true" if mergify auto-merge is enabled (default)
  * **projenUpgradeSchedule** (<code>Array<string></code>)  Customize the projenUpgrade schedule in cron expression. __*Default*__: [ "0 6 * * *" ]
  * **projenUpgradeSecret** (<code>string</code>)  Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`). __*Default*__: no automatic projen upgrade pull requests
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. __*Default*__: Semver.latest()
  * **pullRequestTemplate** (<code>boolean</code>)  Include a GitHub pull request template. __*Default*__: true
  * **pullRequestTemplateContents** (<code>string</code>)  The contents of the pull request template. __*Default*__: default content
  * **rebuildBot** (<code>boolean</code>)  Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request. __*Default*__: true if not a subproject
  * **rebuildBotCommand** (<code>string</code>)  The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch. __*Default*__: "rebuild"
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. __*Default*__: [ "main" ]
  * **releaseEveryCommit** (<code>boolean</code>)  Automatically release new versions every commit to one of branches in `releaseBranches`. __*Default*__: true
  * **releaseSchedule** (<code>string</code>)  CRON schedule to trigger new releases. __*Default*__: no scheduled releases
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. __*Default*__: false
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "main" when new versions are bumped. __*Default*__: true if not a subproject
  * **workflowBootstrapSteps** (<code>Array<any></code>)  Workflow steps to use in order to bootstrap this repo. __*Default*__: "yarn install --frozen-lockfile && yarn projen"
  * **workflowContainerImage** (<code>string</code>)  Container image to use for GitHub workflows. __*Default*__: default image
  * **workflowNodeVersion** (<code>string</code>)  The node version to use in GitHub workflows. __*Default*__: same as `minNodeVersion`
  * **author** (<code>string</code>)  The name of the library author. 
  * **authorAddress** (<code>string</code>)  Email or URL of the library author. 
  * **repositoryUrl** (<code>string</code>)  Git repository URL. 
  * **compat** (<code>boolean</code>)  Automatically run API compatibility test against the latest version published to npm after compilation. __*Default*__: false
  * **compatIgnore** (<code>string</code>)  Name of the ignore file for API compatibility tests. __*Default*__: ".compatignore"
  * **docgen** (<code>boolean</code>)  Automatically generate API.md from jsii. __*Default*__: true
  * **dotnet** (<code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code>)  *No description* __*Optional*__
  * **eslint** (<code>boolean</code>)  Install eslint. __*Default*__: true
  * **eslintOptions** (<code>[EslintOptions](#projen-eslintoptions)</code>)  Eslint options. __*Default*__: opinionated default options
  * **excludeTypescript** (<code>Array<string></code>)  Accepts a list of glob patterns. __*Optional*__
  * **publishToGo** (<code>[JsiiGoTarget](#projen-jsiigotarget)</code>)  Publish Go bindings to a git repository. __*Default*__: no publishing
  * **publishToMaven** (<code>[JsiiJavaTarget](#projen-jsiijavatarget)</code>)  Publish to maven. __*Default*__: no publishing
  * **publishToNuget** (<code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code>)  Publish to NuGet. __*Default*__: no publishing
  * **publishToPypi** (<code>[JsiiPythonTarget](#projen-jsiipythontarget)</code>)  Publish to pypi. __*Default*__: no publishing
  * **python** (<code>[JsiiPythonTarget](#projen-jsiipythontarget)</code>)  *No description* __*Optional*__
  * **rootdir** (<code>string</code>)  *No description* __*Default*__: "."
  * **sampleCode** (<code>boolean</code>)  Generate one-time sample in `src/` and `test/` if there are no files there. __*Default*__: true
  * **catalog** (<code>[Catalog](#projen-catalog)</code>)  Libraries will be picked up by the construct catalog when they are published to npm as jsii modules and will be published under:. __*Default*__: new version will be announced
  * **cdkVersion** (<code>string</code>)  Minimum target version this library is tested against. 
  * **cdkAssert** (<code>boolean</code>)  Install the @aws-cdk/assert library? __*Default*__: true
  * **cdkDependencies** (<code>Array<string></code>)  Which AWS CDK modules (those that start with "@aws-cdk/") does this library require when consumed? __*Optional*__
  * **cdkDependenciesAsDeps** (<code>boolean</code>)  If this is enabled (default), all modules declared in `cdkDependencies` will be also added as normal `dependencies` (as well as `peerDependencies`). __*Default*__: true
  * **cdkTestDependencies** (<code>Array<string></code>)  AWS CDK modules required for testing. __*Optional*__
  * **cdkVersionPinning** (<code>boolean</code>)  Use pinned version instead of caret version for CDK. __*Default*__: false



### Properties


Name | Type | Description 
-----|------|-------------
**cdkDependenciesAsDeps**🔹 | <code>boolean</code> | Whether CDK dependencies are added as normal dependencies (and peer dependencies).
**version**🔹 | <code>string</code> | The target CDK version for this library.

### Methods


#### addCdkDependencies(...deps)🔹 <a id="projen-awscdkconstructlibrary-addcdkdependencies"></a>

Adds CDK modules as runtime dependencies.

Modules are currently by default added with a caret CDK version both as "dependencies"
and "peerDependencies". This is because currently npm would not
automatically install peer dependencies that are not declared as concerete
dependencies by the consumer, so this is a little npm "hack" so that
consumers will not need to depend on them directly if they don't interact
with them.
See `cdkDependenciesAsDeps` for changing the default behavior.

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
  * **name** (<code>string</code>)  This is the name of your project. 
  * **clobber** (<code>boolean</code>)  Add a `clobber` task which resets the repo to origin. __*Default*__: true
  * **devContainer** (<code>boolean</code>)  Add a VSCode development environment (used for GitHub Codespaces). __*Default*__: false
  * **gitpod** (<code>boolean</code>)  Add a Gitpod development environment. __*Default*__: false
  * **jsiiFqn** (<code>string</code>)  The JSII FQN (fully qualified name) of the project class. __*Default*__: undefined
  * **logging** (<code>[LoggerOptions](#projen-loggeroptions)</code>)  Configure logging options such as verbosity. __*Default*__: {}
  * **outdir** (<code>string</code>)  The root directory of the project. __*Default*__: "."
  * **parent** (<code>[Project](#projen-project)</code>)  The parent project, if this project is part of a bigger project. __*Optional*__
  * **projectType** (<code>[ProjectType](#projen-projecttype)</code>)  Which type of project this is (library/app). __*Default*__: ProjectType.UNKNOWN
  * **readme** (<code>[SampleReadmeProps](#projen-samplereadmeprops)</code>)  The README setup. __*Default*__: { filename: 'README.md', contents: '# replace this' }
  * **allowLibraryDependencies** (<code>boolean</code>)  Allow the project to include `peerDependencies` and `bundledDependencies`. __*Default*__: true
  * **authorEmail** (<code>string</code>)  Author's e-mail. __*Optional*__
  * **authorName** (<code>string</code>)  Author's name. __*Optional*__
  * **authorOrganization** (<code>boolean</code>)  Author's Organization. __*Optional*__
  * **authorUrl** (<code>string</code>)  Author's URL / Website. __*Optional*__
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. __*Default*__: true
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. __*Optional*__
  * **bundledDeps** (<code>Array<string></code>)  List of dependencies to bundle into this module. __*Optional*__
  * **deps** (<code>Array<string></code>)  Runtime dependencies of this module. __*Default*__: []
  * **description** (<code>string</code>)  The description is just a string that helps people understand the purpose of the package. __*Optional*__
  * **devDeps** (<code>Array<string></code>)  Build dependencies for this module. __*Default*__: []
  * **entrypoint** (<code>string</code>)  Module entrypoint (`main` in `package.json`). __*Default*__: "lib/index.js"
  * **homepage** (<code>string</code>)  Package's Homepage / Website. __*Optional*__
  * **keywords** (<code>Array<string></code>)  Keywords to include in `package.json`. __*Optional*__
  * **license** (<code>string</code>)  License's SPDX identifier. __*Default*__: "Apache-2.0"
  * **licensed** (<code>boolean</code>)  Indicates if a license should be added. __*Default*__: true
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). __*Default*__: no max
  * **minNodeVersion** (<code>string</code>)  Minimum Node.js version to require via package.json `engines` (inclusive). __*Default*__: no "engines" specified
  * **npmAccess** (<code>[NpmAccess](#projen-npmaccess)</code>)  Access level of the npm package. __*Default*__: for scoped packages (e.g. `foo@bar`), the default is `NpmAccess.RESTRICTED`, for non-scoped packages, the default is `NpmAccess.PUBLIC`.
  * **npmDistTag** (<code>string</code>)  Tags can be used to provide an alias instead of version numbers. __*Default*__: "latest"
  * **npmRegistry** (<code>string</code>)  The host name of the npm registry to publish to. __*Optional*__
  * **npmRegistryUrl** (<code>string</code>)  The base URL of the npm package registry. __*Default*__: "https://registry.npmjs.org"
  * **npmTaskExecution** (<code>[NpmTaskExecution](#projen-npmtaskexecution)</code>)  Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz). __*Default*__: NpmTaskExecution.PROJEN
  * **packageManager** (<code>[NodePackageManager](#projen-nodepackagemanager)</code>)  The Node Package Manager used to execute scripts. __*Default*__: NodePackageManager.YARN
  * **packageName** (<code>string</code>)  The "name" in package.json. __*Default*__: defaults to project name
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  Options for `peerDeps`. __*Optional*__
  * **peerDeps** (<code>Array<string></code>)  Peer dependencies for this module. __*Default*__: []
  * **projenCommand** (<code>string</code>)  The shell command to use in order to run the projen CLI. __*Default*__: "npx projen"
  * **repository** (<code>string</code>)  The repository is the location where the actual code for your package lives. __*Optional*__
  * **repositoryDirectory** (<code>string</code>)  If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives. __*Optional*__
  * **scripts** (<code>Map<string, string></code>)  npm scripts to include. __*Default*__: {}
  * **stability** (<code>string</code>)  Package's Stability. __*Optional*__
  * **defaultReleaseBranch** (<code>string</code>)  The name of the main release branch. 
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files on git. __*Default*__: true
  * **artifactsDirectory** (<code>string</code>)  A directory which will contain artifacts to be published to npm. __*Default*__: "dist"
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. __*Default*__: true if not a subproject
  * **codeCov** (<code>boolean</code>)  Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret. __*Default*__: false
  * **codeCovTokenSecret** (<code>string</code>)  Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories. __*Default*__: if this option is not specified, only public repositories are supported
  * **copyrightOwner** (<code>string</code>)  License copyright owner. __*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. __*Default*__: current year
  * **dependabot** (<code>boolean</code>)  Include dependabot configuration. __*Default*__: true
  * **dependabotOptions** (<code>[github.DependabotOptions](#projen-github-dependabotoptions)</code>)  Options for dependabot. __*Default*__: default options
  * **gitignore** (<code>Array<string></code>)  Additional entries to .gitignore. __*Optional*__
  * **jest** (<code>boolean</code>)  Setup jest unit tests. __*Default*__: true
  * **jestOptions** (<code>[JestOptions](#projen-jestoptions)</code>)  Jest options. __*Default*__: default options
  * **jsiiReleaseVersion** (<code>string</code>)  Version requirement of `jsii-release` which is used to publish modules to npm. __*Default*__: "latest"
  * **mergify** (<code>boolean</code>)  Adds mergify configuration. __*Default*__: true
  * **mergifyAutoMergeLabel** (<code>string</code>)  Automatically merge PRs that build successfully and have this label. __*Default*__: "auto-merge"
  * **mergifyOptions** (<code>[github.MergifyOptions](#projen-github-mergifyoptions)</code>)  Options for mergify. __*Default*__: default options
  * **npmignore** (<code>Array<string></code>)  Additional entries to .npmignore. __*Optional*__
  * **npmignoreEnabled** (<code>boolean</code>)  Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs. __*Default*__: true
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. __*Default*__: true
  * **projenUpgradeAutoMerge** (<code>boolean</code>)  Automatically merge projen upgrade PRs when build passes. __*Default*__: "true" if mergify auto-merge is enabled (default)
  * **projenUpgradeSchedule** (<code>Array<string></code>)  Customize the projenUpgrade schedule in cron expression. __*Default*__: [ "0 6 * * *" ]
  * **projenUpgradeSecret** (<code>string</code>)  Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`). __*Default*__: no automatic projen upgrade pull requests
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. __*Default*__: Semver.latest()
  * **pullRequestTemplate** (<code>boolean</code>)  Include a GitHub pull request template. __*Default*__: true
  * **pullRequestTemplateContents** (<code>string</code>)  The contents of the pull request template. __*Default*__: default content
  * **rebuildBot** (<code>boolean</code>)  Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request. __*Default*__: true if not a subproject
  * **rebuildBotCommand** (<code>string</code>)  The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch. __*Default*__: "rebuild"
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. __*Default*__: [ "main" ]
  * **releaseEveryCommit** (<code>boolean</code>)  Automatically release new versions every commit to one of branches in `releaseBranches`. __*Default*__: true
  * **releaseSchedule** (<code>string</code>)  CRON schedule to trigger new releases. __*Default*__: no scheduled releases
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. __*Default*__: false
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "main" when new versions are bumped. __*Default*__: true if not a subproject
  * **workflowBootstrapSteps** (<code>Array<any></code>)  Workflow steps to use in order to bootstrap this repo. __*Default*__: "yarn install --frozen-lockfile && yarn projen"
  * **workflowContainerImage** (<code>string</code>)  Container image to use for GitHub workflows. __*Default*__: default image
  * **workflowNodeVersion** (<code>string</code>)  The node version to use in GitHub workflows. __*Default*__: same as `minNodeVersion`
  * **compileBeforeTest** (<code>boolean</code>)  Compile the code before running tests. __*Default*__: if `testdir` is under `src/**`, the default is `true`, otherwise the default is `false.
  * **disableTsconfig** (<code>boolean</code>)  Do not generate a `tsconfig.json` file (used by jsii projects since tsconfig.json is generated by the jsii compiler). __*Default*__: false
  * **docgen** (<code>boolean</code>)  Docgen by Typedoc. __*Default*__: false
  * **docsDirectory** (<code>string</code>)  Docs directory. __*Default*__: "docs"
  * **entrypointTypes** (<code>string</code>)  The .d.ts file that includes the type declarations for this module. __*Default*__: .d.ts file derived from the project's entrypoint (usually lib/index.d.ts)
  * **eslint** (<code>boolean</code>)  Setup eslint. __*Default*__: true
  * **eslintOptions** (<code>[EslintOptions](#projen-eslintoptions)</code>)  Eslint options. __*Default*__: opinionated default options
  * **libdir** (<code>string</code>)  Typescript  artifacts output directory. __*Default*__: "lib"
  * **package** (<code>boolean</code>)  Defines a `yarn package` command that will produce a tarball and place it under `dist/js`. __*Default*__: true
  * **sampleCode** (<code>boolean</code>)  Generate one-time sample in `src/` and `test/` if there are no files there. __*Default*__: true
  * **srcdir** (<code>string</code>)  Typescript sources directory. __*Default*__: "src"
  * **testdir** (<code>string</code>)  Jest tests directory. Tests files should be named `xxx.test.ts`. __*Default*__: "test"
  * **tsconfig** (<code>[TypescriptConfigOptions](#projen-typescriptconfigoptions)</code>)  Custom TSConfig. __*Optional*__
  * **typescriptVersion** (<code>string</code>)  TypeScript version to use. __*Default*__: "latest"
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





#### preSynthesize()🔹 <a id="projen-component-presynthesize"></a>

Called before synthesis.

```ts
preSynthesize(): void
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
  * **name** (<code>string</code>)  This is the name of your project. 
  * **clobber** (<code>boolean</code>)  Add a `clobber` task which resets the repo to origin. __*Default*__: true
  * **devContainer** (<code>boolean</code>)  Add a VSCode development environment (used for GitHub Codespaces). __*Default*__: false
  * **gitpod** (<code>boolean</code>)  Add a Gitpod development environment. __*Default*__: false
  * **jsiiFqn** (<code>string</code>)  The JSII FQN (fully qualified name) of the project class. __*Default*__: undefined
  * **logging** (<code>[LoggerOptions](#projen-loggeroptions)</code>)  Configure logging options such as verbosity. __*Default*__: {}
  * **outdir** (<code>string</code>)  The root directory of the project. __*Default*__: "."
  * **parent** (<code>[Project](#projen-project)</code>)  The parent project, if this project is part of a bigger project. __*Optional*__
  * **projectType** (<code>[ProjectType](#projen-projecttype)</code>)  Which type of project this is (library/app). __*Default*__: ProjectType.UNKNOWN
  * **readme** (<code>[SampleReadmeProps](#projen-samplereadmeprops)</code>)  The README setup. __*Default*__: { filename: 'README.md', contents: '# replace this' }
  * **allowLibraryDependencies** (<code>boolean</code>)  Allow the project to include `peerDependencies` and `bundledDependencies`. __*Default*__: true
  * **authorEmail** (<code>string</code>)  Author's e-mail. __*Optional*__
  * **authorName** (<code>string</code>)  Author's name. __*Optional*__
  * **authorOrganization** (<code>boolean</code>)  Author's Organization. __*Optional*__
  * **authorUrl** (<code>string</code>)  Author's URL / Website. __*Optional*__
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. __*Default*__: true
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. __*Optional*__
  * **bundledDeps** (<code>Array<string></code>)  List of dependencies to bundle into this module. __*Optional*__
  * **deps** (<code>Array<string></code>)  Runtime dependencies of this module. __*Default*__: []
  * **description** (<code>string</code>)  The description is just a string that helps people understand the purpose of the package. __*Optional*__
  * **devDeps** (<code>Array<string></code>)  Build dependencies for this module. __*Default*__: []
  * **entrypoint** (<code>string</code>)  Module entrypoint (`main` in `package.json`). __*Default*__: "lib/index.js"
  * **homepage** (<code>string</code>)  Package's Homepage / Website. __*Optional*__
  * **keywords** (<code>Array<string></code>)  Keywords to include in `package.json`. __*Optional*__
  * **license** (<code>string</code>)  License's SPDX identifier. __*Default*__: "Apache-2.0"
  * **licensed** (<code>boolean</code>)  Indicates if a license should be added. __*Default*__: true
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). __*Default*__: no max
  * **minNodeVersion** (<code>string</code>)  Minimum Node.js version to require via package.json `engines` (inclusive). __*Default*__: no "engines" specified
  * **npmAccess** (<code>[NpmAccess](#projen-npmaccess)</code>)  Access level of the npm package. __*Default*__: for scoped packages (e.g. `foo@bar`), the default is `NpmAccess.RESTRICTED`, for non-scoped packages, the default is `NpmAccess.PUBLIC`.
  * **npmDistTag** (<code>string</code>)  Tags can be used to provide an alias instead of version numbers. __*Default*__: "latest"
  * **npmRegistry** (<code>string</code>)  The host name of the npm registry to publish to. __*Optional*__
  * **npmRegistryUrl** (<code>string</code>)  The base URL of the npm package registry. __*Default*__: "https://registry.npmjs.org"
  * **npmTaskExecution** (<code>[NpmTaskExecution](#projen-npmtaskexecution)</code>)  Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz). __*Default*__: NpmTaskExecution.PROJEN
  * **packageManager** (<code>[NodePackageManager](#projen-nodepackagemanager)</code>)  The Node Package Manager used to execute scripts. __*Default*__: NodePackageManager.YARN
  * **packageName** (<code>string</code>)  The "name" in package.json. __*Default*__: defaults to project name
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  Options for `peerDeps`. __*Optional*__
  * **peerDeps** (<code>Array<string></code>)  Peer dependencies for this module. __*Default*__: []
  * **projenCommand** (<code>string</code>)  The shell command to use in order to run the projen CLI. __*Default*__: "npx projen"
  * **repository** (<code>string</code>)  The repository is the location where the actual code for your package lives. __*Optional*__
  * **repositoryDirectory** (<code>string</code>)  If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives. __*Optional*__
  * **scripts** (<code>Map<string, string></code>)  npm scripts to include. __*Default*__: {}
  * **stability** (<code>string</code>)  Package's Stability. __*Optional*__
  * **defaultReleaseBranch** (<code>string</code>)  The name of the main release branch. 
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files on git. __*Default*__: true
  * **artifactsDirectory** (<code>string</code>)  A directory which will contain artifacts to be published to npm. __*Default*__: "dist"
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. __*Default*__: true if not a subproject
  * **codeCov** (<code>boolean</code>)  Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret. __*Default*__: false
  * **codeCovTokenSecret** (<code>string</code>)  Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories. __*Default*__: if this option is not specified, only public repositories are supported
  * **copyrightOwner** (<code>string</code>)  License copyright owner. __*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. __*Default*__: current year
  * **dependabot** (<code>boolean</code>)  Include dependabot configuration. __*Default*__: true
  * **dependabotOptions** (<code>[github.DependabotOptions](#projen-github-dependabotoptions)</code>)  Options for dependabot. __*Default*__: default options
  * **gitignore** (<code>Array<string></code>)  Additional entries to .gitignore. __*Optional*__
  * **jest** (<code>boolean</code>)  Setup jest unit tests. __*Default*__: true
  * **jestOptions** (<code>[JestOptions](#projen-jestoptions)</code>)  Jest options. __*Default*__: default options
  * **jsiiReleaseVersion** (<code>string</code>)  Version requirement of `jsii-release` which is used to publish modules to npm. __*Default*__: "latest"
  * **mergify** (<code>boolean</code>)  Adds mergify configuration. __*Default*__: true
  * **mergifyAutoMergeLabel** (<code>string</code>)  Automatically merge PRs that build successfully and have this label. __*Default*__: "auto-merge"
  * **mergifyOptions** (<code>[github.MergifyOptions](#projen-github-mergifyoptions)</code>)  Options for mergify. __*Default*__: default options
  * **npmignore** (<code>Array<string></code>)  Additional entries to .npmignore. __*Optional*__
  * **npmignoreEnabled** (<code>boolean</code>)  Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs. __*Default*__: true
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. __*Default*__: true
  * **projenUpgradeAutoMerge** (<code>boolean</code>)  Automatically merge projen upgrade PRs when build passes. __*Default*__: "true" if mergify auto-merge is enabled (default)
  * **projenUpgradeSchedule** (<code>Array<string></code>)  Customize the projenUpgrade schedule in cron expression. __*Default*__: [ "0 6 * * *" ]
  * **projenUpgradeSecret** (<code>string</code>)  Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`). __*Default*__: no automatic projen upgrade pull requests
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. __*Default*__: Semver.latest()
  * **pullRequestTemplate** (<code>boolean</code>)  Include a GitHub pull request template. __*Default*__: true
  * **pullRequestTemplateContents** (<code>string</code>)  The contents of the pull request template. __*Default*__: default content
  * **rebuildBot** (<code>boolean</code>)  Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request. __*Default*__: true if not a subproject
  * **rebuildBotCommand** (<code>string</code>)  The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch. __*Default*__: "rebuild"
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. __*Default*__: [ "main" ]
  * **releaseEveryCommit** (<code>boolean</code>)  Automatically release new versions every commit to one of branches in `releaseBranches`. __*Default*__: true
  * **releaseSchedule** (<code>string</code>)  CRON schedule to trigger new releases. __*Default*__: no scheduled releases
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. __*Default*__: false
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "main" when new versions are bumped. __*Default*__: true if not a subproject
  * **workflowBootstrapSteps** (<code>Array<any></code>)  Workflow steps to use in order to bootstrap this repo. __*Default*__: "yarn install --frozen-lockfile && yarn projen"
  * **workflowContainerImage** (<code>string</code>)  Container image to use for GitHub workflows. __*Default*__: default image
  * **workflowNodeVersion** (<code>string</code>)  The node version to use in GitHub workflows. __*Default*__: same as `minNodeVersion`
  * **author** (<code>string</code>)  The name of the library author. 
  * **authorAddress** (<code>string</code>)  Email or URL of the library author. 
  * **repositoryUrl** (<code>string</code>)  Git repository URL. 
  * **compat** (<code>boolean</code>)  Automatically run API compatibility test against the latest version published to npm after compilation. __*Default*__: false
  * **compatIgnore** (<code>string</code>)  Name of the ignore file for API compatibility tests. __*Default*__: ".compatignore"
  * **docgen** (<code>boolean</code>)  Automatically generate API.md from jsii. __*Default*__: true
  * **dotnet** (<code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code>)  *No description* __*Optional*__
  * **eslint** (<code>boolean</code>)  Install eslint. __*Default*__: true
  * **eslintOptions** (<code>[EslintOptions](#projen-eslintoptions)</code>)  Eslint options. __*Default*__: opinionated default options
  * **excludeTypescript** (<code>Array<string></code>)  Accepts a list of glob patterns. __*Optional*__
  * **publishToGo** (<code>[JsiiGoTarget](#projen-jsiigotarget)</code>)  Publish Go bindings to a git repository. __*Default*__: no publishing
  * **publishToMaven** (<code>[JsiiJavaTarget](#projen-jsiijavatarget)</code>)  Publish to maven. __*Default*__: no publishing
  * **publishToNuget** (<code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code>)  Publish to NuGet. __*Default*__: no publishing
  * **publishToPypi** (<code>[JsiiPythonTarget](#projen-jsiipythontarget)</code>)  Publish to pypi. __*Default*__: no publishing
  * **python** (<code>[JsiiPythonTarget](#projen-jsiipythontarget)</code>)  *No description* __*Optional*__
  * **rootdir** (<code>string</code>)  *No description* __*Default*__: "."
  * **sampleCode** (<code>boolean</code>)  Generate one-time sample in `src/` and `test/` if there are no files there. __*Default*__: true
  * **catalog** (<code>[Catalog](#projen-catalog)</code>)  Libraries will be picked up by the construct catalog when they are published to npm as jsii modules and will be published under:. __*Default*__: new version will be announced




## class ConstructLibraryAws ⚠️ <a id="projen-constructlibraryaws"></a>



__Extends__: [AwsCdkConstructLibrary](#projen-awscdkconstructlibrary)

### Initializer




```ts
new ConstructLibraryAws(options: AwsCdkConstructLibraryOptions)
```

* **options** (<code>[AwsCdkConstructLibraryOptions](#projen-awscdkconstructlibraryoptions)</code>)  *No description*
  * **name** (<code>string</code>)  This is the name of your project. 
  * **clobber** (<code>boolean</code>)  Add a `clobber` task which resets the repo to origin. __*Default*__: true
  * **devContainer** (<code>boolean</code>)  Add a VSCode development environment (used for GitHub Codespaces). __*Default*__: false
  * **gitpod** (<code>boolean</code>)  Add a Gitpod development environment. __*Default*__: false
  * **jsiiFqn** (<code>string</code>)  The JSII FQN (fully qualified name) of the project class. __*Default*__: undefined
  * **logging** (<code>[LoggerOptions](#projen-loggeroptions)</code>)  Configure logging options such as verbosity. __*Default*__: {}
  * **outdir** (<code>string</code>)  The root directory of the project. __*Default*__: "."
  * **parent** (<code>[Project](#projen-project)</code>)  The parent project, if this project is part of a bigger project. __*Optional*__
  * **projectType** (<code>[ProjectType](#projen-projecttype)</code>)  Which type of project this is (library/app). __*Default*__: ProjectType.UNKNOWN
  * **readme** (<code>[SampleReadmeProps](#projen-samplereadmeprops)</code>)  The README setup. __*Default*__: { filename: 'README.md', contents: '# replace this' }
  * **allowLibraryDependencies** (<code>boolean</code>)  Allow the project to include `peerDependencies` and `bundledDependencies`. __*Default*__: true
  * **authorEmail** (<code>string</code>)  Author's e-mail. __*Optional*__
  * **authorName** (<code>string</code>)  Author's name. __*Optional*__
  * **authorOrganization** (<code>boolean</code>)  Author's Organization. __*Optional*__
  * **authorUrl** (<code>string</code>)  Author's URL / Website. __*Optional*__
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. __*Default*__: true
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. __*Optional*__
  * **bundledDeps** (<code>Array<string></code>)  List of dependencies to bundle into this module. __*Optional*__
  * **deps** (<code>Array<string></code>)  Runtime dependencies of this module. __*Default*__: []
  * **description** (<code>string</code>)  The description is just a string that helps people understand the purpose of the package. __*Optional*__
  * **devDeps** (<code>Array<string></code>)  Build dependencies for this module. __*Default*__: []
  * **entrypoint** (<code>string</code>)  Module entrypoint (`main` in `package.json`). __*Default*__: "lib/index.js"
  * **homepage** (<code>string</code>)  Package's Homepage / Website. __*Optional*__
  * **keywords** (<code>Array<string></code>)  Keywords to include in `package.json`. __*Optional*__
  * **license** (<code>string</code>)  License's SPDX identifier. __*Default*__: "Apache-2.0"
  * **licensed** (<code>boolean</code>)  Indicates if a license should be added. __*Default*__: true
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). __*Default*__: no max
  * **minNodeVersion** (<code>string</code>)  Minimum Node.js version to require via package.json `engines` (inclusive). __*Default*__: no "engines" specified
  * **npmAccess** (<code>[NpmAccess](#projen-npmaccess)</code>)  Access level of the npm package. __*Default*__: for scoped packages (e.g. `foo@bar`), the default is `NpmAccess.RESTRICTED`, for non-scoped packages, the default is `NpmAccess.PUBLIC`.
  * **npmDistTag** (<code>string</code>)  Tags can be used to provide an alias instead of version numbers. __*Default*__: "latest"
  * **npmRegistry** (<code>string</code>)  The host name of the npm registry to publish to. __*Optional*__
  * **npmRegistryUrl** (<code>string</code>)  The base URL of the npm package registry. __*Default*__: "https://registry.npmjs.org"
  * **npmTaskExecution** (<code>[NpmTaskExecution](#projen-npmtaskexecution)</code>)  Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz). __*Default*__: NpmTaskExecution.PROJEN
  * **packageManager** (<code>[NodePackageManager](#projen-nodepackagemanager)</code>)  The Node Package Manager used to execute scripts. __*Default*__: NodePackageManager.YARN
  * **packageName** (<code>string</code>)  The "name" in package.json. __*Default*__: defaults to project name
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  Options for `peerDeps`. __*Optional*__
  * **peerDeps** (<code>Array<string></code>)  Peer dependencies for this module. __*Default*__: []
  * **projenCommand** (<code>string</code>)  The shell command to use in order to run the projen CLI. __*Default*__: "npx projen"
  * **repository** (<code>string</code>)  The repository is the location where the actual code for your package lives. __*Optional*__
  * **repositoryDirectory** (<code>string</code>)  If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives. __*Optional*__
  * **scripts** (<code>Map<string, string></code>)  npm scripts to include. __*Default*__: {}
  * **stability** (<code>string</code>)  Package's Stability. __*Optional*__
  * **defaultReleaseBranch** (<code>string</code>)  The name of the main release branch. 
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files on git. __*Default*__: true
  * **artifactsDirectory** (<code>string</code>)  A directory which will contain artifacts to be published to npm. __*Default*__: "dist"
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. __*Default*__: true if not a subproject
  * **codeCov** (<code>boolean</code>)  Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret. __*Default*__: false
  * **codeCovTokenSecret** (<code>string</code>)  Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories. __*Default*__: if this option is not specified, only public repositories are supported
  * **copyrightOwner** (<code>string</code>)  License copyright owner. __*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. __*Default*__: current year
  * **dependabot** (<code>boolean</code>)  Include dependabot configuration. __*Default*__: true
  * **dependabotOptions** (<code>[github.DependabotOptions](#projen-github-dependabotoptions)</code>)  Options for dependabot. __*Default*__: default options
  * **gitignore** (<code>Array<string></code>)  Additional entries to .gitignore. __*Optional*__
  * **jest** (<code>boolean</code>)  Setup jest unit tests. __*Default*__: true
  * **jestOptions** (<code>[JestOptions](#projen-jestoptions)</code>)  Jest options. __*Default*__: default options
  * **jsiiReleaseVersion** (<code>string</code>)  Version requirement of `jsii-release` which is used to publish modules to npm. __*Default*__: "latest"
  * **mergify** (<code>boolean</code>)  Adds mergify configuration. __*Default*__: true
  * **mergifyAutoMergeLabel** (<code>string</code>)  Automatically merge PRs that build successfully and have this label. __*Default*__: "auto-merge"
  * **mergifyOptions** (<code>[github.MergifyOptions](#projen-github-mergifyoptions)</code>)  Options for mergify. __*Default*__: default options
  * **npmignore** (<code>Array<string></code>)  Additional entries to .npmignore. __*Optional*__
  * **npmignoreEnabled** (<code>boolean</code>)  Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs. __*Default*__: true
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. __*Default*__: true
  * **projenUpgradeAutoMerge** (<code>boolean</code>)  Automatically merge projen upgrade PRs when build passes. __*Default*__: "true" if mergify auto-merge is enabled (default)
  * **projenUpgradeSchedule** (<code>Array<string></code>)  Customize the projenUpgrade schedule in cron expression. __*Default*__: [ "0 6 * * *" ]
  * **projenUpgradeSecret** (<code>string</code>)  Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`). __*Default*__: no automatic projen upgrade pull requests
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. __*Default*__: Semver.latest()
  * **pullRequestTemplate** (<code>boolean</code>)  Include a GitHub pull request template. __*Default*__: true
  * **pullRequestTemplateContents** (<code>string</code>)  The contents of the pull request template. __*Default*__: default content
  * **rebuildBot** (<code>boolean</code>)  Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request. __*Default*__: true if not a subproject
  * **rebuildBotCommand** (<code>string</code>)  The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch. __*Default*__: "rebuild"
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. __*Default*__: [ "main" ]
  * **releaseEveryCommit** (<code>boolean</code>)  Automatically release new versions every commit to one of branches in `releaseBranches`. __*Default*__: true
  * **releaseSchedule** (<code>string</code>)  CRON schedule to trigger new releases. __*Default*__: no scheduled releases
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. __*Default*__: false
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "main" when new versions are bumped. __*Default*__: true if not a subproject
  * **workflowBootstrapSteps** (<code>Array<any></code>)  Workflow steps to use in order to bootstrap this repo. __*Default*__: "yarn install --frozen-lockfile && yarn projen"
  * **workflowContainerImage** (<code>string</code>)  Container image to use for GitHub workflows. __*Default*__: default image
  * **workflowNodeVersion** (<code>string</code>)  The node version to use in GitHub workflows. __*Default*__: same as `minNodeVersion`
  * **author** (<code>string</code>)  The name of the library author. 
  * **authorAddress** (<code>string</code>)  Email or URL of the library author. 
  * **repositoryUrl** (<code>string</code>)  Git repository URL. 
  * **compat** (<code>boolean</code>)  Automatically run API compatibility test against the latest version published to npm after compilation. __*Default*__: false
  * **compatIgnore** (<code>string</code>)  Name of the ignore file for API compatibility tests. __*Default*__: ".compatignore"
  * **docgen** (<code>boolean</code>)  Automatically generate API.md from jsii. __*Default*__: true
  * **dotnet** (<code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code>)  *No description* __*Optional*__
  * **eslint** (<code>boolean</code>)  Install eslint. __*Default*__: true
  * **eslintOptions** (<code>[EslintOptions](#projen-eslintoptions)</code>)  Eslint options. __*Default*__: opinionated default options
  * **excludeTypescript** (<code>Array<string></code>)  Accepts a list of glob patterns. __*Optional*__
  * **publishToGo** (<code>[JsiiGoTarget](#projen-jsiigotarget)</code>)  Publish Go bindings to a git repository. __*Default*__: no publishing
  * **publishToMaven** (<code>[JsiiJavaTarget](#projen-jsiijavatarget)</code>)  Publish to maven. __*Default*__: no publishing
  * **publishToNuget** (<code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code>)  Publish to NuGet. __*Default*__: no publishing
  * **publishToPypi** (<code>[JsiiPythonTarget](#projen-jsiipythontarget)</code>)  Publish to pypi. __*Default*__: no publishing
  * **python** (<code>[JsiiPythonTarget](#projen-jsiipythontarget)</code>)  *No description* __*Optional*__
  * **rootdir** (<code>string</code>)  *No description* __*Default*__: "."
  * **sampleCode** (<code>boolean</code>)  Generate one-time sample in `src/` and `test/` if there are no files there. __*Default*__: true
  * **catalog** (<code>[Catalog](#projen-catalog)</code>)  Libraries will be picked up by the construct catalog when they are published to npm as jsii modules and will be published under:. __*Default*__: new version will be announced
  * **cdkVersion** (<code>string</code>)  Minimum target version this library is tested against. 
  * **cdkAssert** (<code>boolean</code>)  Install the @aws-cdk/assert library? __*Default*__: true
  * **cdkDependencies** (<code>Array<string></code>)  Which AWS CDK modules (those that start with "@aws-cdk/") does this library require when consumed? __*Optional*__
  * **cdkDependenciesAsDeps** (<code>boolean</code>)  If this is enabled (default), all modules declared in `cdkDependencies` will be also added as normal `dependencies` (as well as `peerDependencies`). __*Default*__: true
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
  * **name** (<code>string</code>)  This is the name of your project. 
  * **clobber** (<code>boolean</code>)  Add a `clobber` task which resets the repo to origin. __*Default*__: true
  * **devContainer** (<code>boolean</code>)  Add a VSCode development environment (used for GitHub Codespaces). __*Default*__: false
  * **gitpod** (<code>boolean</code>)  Add a Gitpod development environment. __*Default*__: false
  * **jsiiFqn** (<code>string</code>)  The JSII FQN (fully qualified name) of the project class. __*Default*__: undefined
  * **logging** (<code>[LoggerOptions](#projen-loggeroptions)</code>)  Configure logging options such as verbosity. __*Default*__: {}
  * **outdir** (<code>string</code>)  The root directory of the project. __*Default*__: "."
  * **parent** (<code>[Project](#projen-project)</code>)  The parent project, if this project is part of a bigger project. __*Optional*__
  * **projectType** (<code>[ProjectType](#projen-projecttype)</code>)  Which type of project this is (library/app). __*Default*__: ProjectType.UNKNOWN
  * **readme** (<code>[SampleReadmeProps](#projen-samplereadmeprops)</code>)  The README setup. __*Default*__: { filename: 'README.md', contents: '# replace this' }
  * **allowLibraryDependencies** (<code>boolean</code>)  Allow the project to include `peerDependencies` and `bundledDependencies`. __*Default*__: true
  * **authorEmail** (<code>string</code>)  Author's e-mail. __*Optional*__
  * **authorName** (<code>string</code>)  Author's name. __*Optional*__
  * **authorOrganization** (<code>boolean</code>)  Author's Organization. __*Optional*__
  * **authorUrl** (<code>string</code>)  Author's URL / Website. __*Optional*__
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. __*Default*__: true
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. __*Optional*__
  * **bundledDeps** (<code>Array<string></code>)  List of dependencies to bundle into this module. __*Optional*__
  * **deps** (<code>Array<string></code>)  Runtime dependencies of this module. __*Default*__: []
  * **description** (<code>string</code>)  The description is just a string that helps people understand the purpose of the package. __*Optional*__
  * **devDeps** (<code>Array<string></code>)  Build dependencies for this module. __*Default*__: []
  * **entrypoint** (<code>string</code>)  Module entrypoint (`main` in `package.json`). __*Default*__: "lib/index.js"
  * **homepage** (<code>string</code>)  Package's Homepage / Website. __*Optional*__
  * **keywords** (<code>Array<string></code>)  Keywords to include in `package.json`. __*Optional*__
  * **license** (<code>string</code>)  License's SPDX identifier. __*Default*__: "Apache-2.0"
  * **licensed** (<code>boolean</code>)  Indicates if a license should be added. __*Default*__: true
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). __*Default*__: no max
  * **minNodeVersion** (<code>string</code>)  Minimum Node.js version to require via package.json `engines` (inclusive). __*Default*__: no "engines" specified
  * **npmAccess** (<code>[NpmAccess](#projen-npmaccess)</code>)  Access level of the npm package. __*Default*__: for scoped packages (e.g. `foo@bar`), the default is `NpmAccess.RESTRICTED`, for non-scoped packages, the default is `NpmAccess.PUBLIC`.
  * **npmDistTag** (<code>string</code>)  Tags can be used to provide an alias instead of version numbers. __*Default*__: "latest"
  * **npmRegistry** (<code>string</code>)  The host name of the npm registry to publish to. __*Optional*__
  * **npmRegistryUrl** (<code>string</code>)  The base URL of the npm package registry. __*Default*__: "https://registry.npmjs.org"
  * **npmTaskExecution** (<code>[NpmTaskExecution](#projen-npmtaskexecution)</code>)  Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz). __*Default*__: NpmTaskExecution.PROJEN
  * **packageManager** (<code>[NodePackageManager](#projen-nodepackagemanager)</code>)  The Node Package Manager used to execute scripts. __*Default*__: NodePackageManager.YARN
  * **packageName** (<code>string</code>)  The "name" in package.json. __*Default*__: defaults to project name
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  Options for `peerDeps`. __*Optional*__
  * **peerDeps** (<code>Array<string></code>)  Peer dependencies for this module. __*Default*__: []
  * **projenCommand** (<code>string</code>)  The shell command to use in order to run the projen CLI. __*Default*__: "npx projen"
  * **repository** (<code>string</code>)  The repository is the location where the actual code for your package lives. __*Optional*__
  * **repositoryDirectory** (<code>string</code>)  If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives. __*Optional*__
  * **scripts** (<code>Map<string, string></code>)  npm scripts to include. __*Default*__: {}
  * **stability** (<code>string</code>)  Package's Stability. __*Optional*__
  * **defaultReleaseBranch** (<code>string</code>)  The name of the main release branch. 
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files on git. __*Default*__: true
  * **artifactsDirectory** (<code>string</code>)  A directory which will contain artifacts to be published to npm. __*Default*__: "dist"
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. __*Default*__: true if not a subproject
  * **codeCov** (<code>boolean</code>)  Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret. __*Default*__: false
  * **codeCovTokenSecret** (<code>string</code>)  Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories. __*Default*__: if this option is not specified, only public repositories are supported
  * **copyrightOwner** (<code>string</code>)  License copyright owner. __*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. __*Default*__: current year
  * **dependabot** (<code>boolean</code>)  Include dependabot configuration. __*Default*__: true
  * **dependabotOptions** (<code>[github.DependabotOptions](#projen-github-dependabotoptions)</code>)  Options for dependabot. __*Default*__: default options
  * **gitignore** (<code>Array<string></code>)  Additional entries to .gitignore. __*Optional*__
  * **jest** (<code>boolean</code>)  Setup jest unit tests. __*Default*__: true
  * **jestOptions** (<code>[JestOptions](#projen-jestoptions)</code>)  Jest options. __*Default*__: default options
  * **jsiiReleaseVersion** (<code>string</code>)  Version requirement of `jsii-release` which is used to publish modules to npm. __*Default*__: "latest"
  * **mergify** (<code>boolean</code>)  Adds mergify configuration. __*Default*__: true
  * **mergifyAutoMergeLabel** (<code>string</code>)  Automatically merge PRs that build successfully and have this label. __*Default*__: "auto-merge"
  * **mergifyOptions** (<code>[github.MergifyOptions](#projen-github-mergifyoptions)</code>)  Options for mergify. __*Default*__: default options
  * **npmignore** (<code>Array<string></code>)  Additional entries to .npmignore. __*Optional*__
  * **npmignoreEnabled** (<code>boolean</code>)  Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs. __*Default*__: true
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. __*Default*__: true
  * **projenUpgradeAutoMerge** (<code>boolean</code>)  Automatically merge projen upgrade PRs when build passes. __*Default*__: "true" if mergify auto-merge is enabled (default)
  * **projenUpgradeSchedule** (<code>Array<string></code>)  Customize the projenUpgrade schedule in cron expression. __*Default*__: [ "0 6 * * *" ]
  * **projenUpgradeSecret** (<code>string</code>)  Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`). __*Default*__: no automatic projen upgrade pull requests
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. __*Default*__: Semver.latest()
  * **pullRequestTemplate** (<code>boolean</code>)  Include a GitHub pull request template. __*Default*__: true
  * **pullRequestTemplateContents** (<code>string</code>)  The contents of the pull request template. __*Default*__: default content
  * **rebuildBot** (<code>boolean</code>)  Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request. __*Default*__: true if not a subproject
  * **rebuildBotCommand** (<code>string</code>)  The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch. __*Default*__: "rebuild"
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. __*Default*__: [ "main" ]
  * **releaseEveryCommit** (<code>boolean</code>)  Automatically release new versions every commit to one of branches in `releaseBranches`. __*Default*__: true
  * **releaseSchedule** (<code>string</code>)  CRON schedule to trigger new releases. __*Default*__: no scheduled releases
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. __*Default*__: false
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "main" when new versions are bumped. __*Default*__: true if not a subproject
  * **workflowBootstrapSteps** (<code>Array<any></code>)  Workflow steps to use in order to bootstrap this repo. __*Default*__: "yarn install --frozen-lockfile && yarn projen"
  * **workflowContainerImage** (<code>string</code>)  Container image to use for GitHub workflows. __*Default*__: default image
  * **workflowNodeVersion** (<code>string</code>)  The node version to use in GitHub workflows. __*Default*__: same as `minNodeVersion`
  * **author** (<code>string</code>)  The name of the library author. 
  * **authorAddress** (<code>string</code>)  Email or URL of the library author. 
  * **repositoryUrl** (<code>string</code>)  Git repository URL. 
  * **compat** (<code>boolean</code>)  Automatically run API compatibility test against the latest version published to npm after compilation. __*Default*__: false
  * **compatIgnore** (<code>string</code>)  Name of the ignore file for API compatibility tests. __*Default*__: ".compatignore"
  * **docgen** (<code>boolean</code>)  Automatically generate API.md from jsii. __*Default*__: true
  * **dotnet** (<code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code>)  *No description* __*Optional*__
  * **eslint** (<code>boolean</code>)  Install eslint. __*Default*__: true
  * **eslintOptions** (<code>[EslintOptions](#projen-eslintoptions)</code>)  Eslint options. __*Default*__: opinionated default options
  * **excludeTypescript** (<code>Array<string></code>)  Accepts a list of glob patterns. __*Optional*__
  * **publishToGo** (<code>[JsiiGoTarget](#projen-jsiigotarget)</code>)  Publish Go bindings to a git repository. __*Default*__: no publishing
  * **publishToMaven** (<code>[JsiiJavaTarget](#projen-jsiijavatarget)</code>)  Publish to maven. __*Default*__: no publishing
  * **publishToNuget** (<code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code>)  Publish to NuGet. __*Default*__: no publishing
  * **publishToPypi** (<code>[JsiiPythonTarget](#projen-jsiipythontarget)</code>)  Publish to pypi. __*Default*__: no publishing
  * **python** (<code>[JsiiPythonTarget](#projen-jsiipythontarget)</code>)  *No description* __*Optional*__
  * **rootdir** (<code>string</code>)  *No description* __*Default*__: "."
  * **sampleCode** (<code>boolean</code>)  Generate one-time sample in `src/` and `test/` if there are no files there. __*Default*__: true
  * **catalog** (<code>[Catalog](#projen-catalog)</code>)  Libraries will be picked up by the construct catalog when they are published to npm as jsii modules and will be published under:. __*Default*__: new version will be announced
  * **cdk8sVersion** (<code>string</code>)  Minimum target version this library is tested against. 




## class DevEnvironmentDockerImage 🔹 <a id="projen-devenvironmentdockerimage"></a>

Options for specifying the Docker image of the container.



### Properties


Name | Type | Description 
-----|------|-------------
**dockerFile**?🔹 | <code>string</code> | The relative path of a Dockerfile that defines the container contents.<br/>__*Optional*__
**image**?🔹 | <code>string</code> | A publicly available Docker image.<br/>__*Optional*__

### Methods


#### *static* fromFile(dockerFile)🔹 <a id="projen-devenvironmentdockerimage-fromfile"></a>

The relative path of a Dockerfile that defines the container contents.

```ts
static fromFile(dockerFile: string): DevEnvironmentDockerImage
```

* **dockerFile** (<code>string</code>)  a relative path.

__Returns__:
* <code>[DevEnvironmentDockerImage](#projen-devenvironmentdockerimage)</code>

#### *static* fromImage(image)🔹 <a id="projen-devenvironmentdockerimage-fromimage"></a>

A publicly available Docker image.

```ts
static fromImage(image: string): DevEnvironmentDockerImage
```

* **image** (<code>string</code>)  a Docker image.

__Returns__:
* <code>[DevEnvironmentDockerImage](#projen-devenvironmentdockerimage)</code>



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
  * **schemaVersion** (<code>string</code>)  Docker Compose schema version do be used. __*Default*__: 3.3
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
  * **dirs** (<code>Array<string></code>)  Directories with source files to lint (e.g. [ "src" ]). 
  * **devdirs** (<code>Array<string></code>)  Directories with source files that include tests and build tools. __*Default*__: []
  * **fileExtensions** (<code>Array<string></code>)  File types that should be linted (e.g. [ ".js", ".ts" ]). __*Default*__: [".ts"]
  * **ignorePatterns** (<code>Array<string></code>)  List of file patterns that should not be linted, using the same syntax as .gitignore patterns. __*Default*__: [ '*.js', '*.d.ts', 'node_modules/', '*.generated.ts', 'coverage' ]
  * **lintProjenRc** (<code>boolean</code>)  Should we lint .projenrc.js. __*Default*__: true
  * **tsconfigPath** (<code>string</code>)  Path to `tsconfig.json` which should be used by eslint. __*Default*__: "./tsconfig.json"



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
__Implemented by__: [github.PullRequestTemplate](#projen-github-pullrequesttemplate), [python.RequirementsFile](#projen-python-requirementsfile), [python.SetupPy](#projen-python-setuppy), [web.NextJsTypeDef](#projen-web-nextjstypedef), [web.ReactTypeDef](#projen-web-reacttypedef), [IgnoreFile](#projen-ignorefile), [JsonFile](#projen-jsonfile), [License](#projen-license), [Makefile](#projen-makefile), [TextFile](#projen-textfile), [TomlFile](#projen-tomlfile), [XmlFile](#projen-xmlfile), [YamlFile](#projen-yamlfile)
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
  * **executable** (<code>boolean</code>)  Whether the generated file should be marked as executable. __*Default*__: false
  * **readonly** (<code>boolean</code>)  Whether the generated file should be readonly. __*Default*__: true



### Properties


Name | Type | Description 
-----|------|-------------
**absolutePath**🔹 | <code>string</code> | The absolute path of this file.
**executable**🔹 | <code>boolean</code> | Indicates if the file should be marked as executable.
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



## class Gitpod 🔹 <a id="projen-gitpod"></a>

The Gitpod component which emits .gitpod.yml.

__Implements__: [IDevEnvironment](#projen-idevenvironment)
__Extends__: [Component](#projen-component)

### Initializer




```ts
new Gitpod(project: Project, options?: GitpodOptions)
```

* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **options** (<code>[GitpodOptions](#projen-gitpodoptions)</code>)  *No description*
  * **dockerImage** (<code>[DevEnvironmentDockerImage](#projen-devenvironmentdockerimage)</code>)  A Docker image or Dockerfile for the container. __*Optional*__
  * **ports** (<code>Array<string></code>)  An array of ports that should be exposed from the container. __*Optional*__
  * **tasks** (<code>Array<[tasks.Task](#projen-tasks-task)></code>)  An array of tasks that should be run when the container starts. __*Optional*__
  * **vscodeExtensions** (<code>Array<string></code>)  An array of extension IDs that specify the extensions that should be installed inside the container when it is created. __*Optional*__
  * **prebuilds** (<code>[GitpodPrebuilds](#projen-gitpodprebuilds)</code>)  Optional Gitpod's Github App integration for prebuilds If this is not set and Gitpod's Github App is installed, then Gitpod will apply these defaults: https://www.gitpod.io/docs/prebuilds/#configure-the-github-app. __*Default*__: undefined



### Properties


Name | Type | Description 
-----|------|-------------
**config**🔹 | <code>any</code> | Direct access to the gitpod configuration (escape hatch).

### Methods


#### addCustomTask(options)🔹 <a id="projen-gitpod-addcustomtask"></a>

Add a task with more granular options.

By default, all tasks will be run in parallel. To run tasks in sequence,
create a new `Task` and set the other tasks as subtasks.

```ts
addCustomTask(options: GitpodTask): void
```

* **options** (<code>[GitpodTask](#projen-gitpodtask)</code>)  The task parameters.
  * **command** (<code>string</code>)  Required. 
  * **before** (<code>string</code>)  In case you need to run something even before init, that is a requirement for both init and command, you can use the before property. __*Optional*__
  * **init** (<code>string</code>)  The init property can be used to specify shell commands that should only be executed after a workspace was freshly cloned and needs to be initialized somehow. __*Optional*__
  * **name** (<code>string</code>)  A name for this task. __*Default*__: task names are omitted when blank
  * **openIn** (<code>[GitpodOpenIn](#projen-gitpodopenin)</code>)  You can configure where in the IDE the terminal should be opened. __*Default*__: GitpodOpenIn.BOTTOM
  * **openMode** (<code>[GitpodOpenMode](#projen-gitpodopenmode)</code>)  You can configure how the terminal should be opened relative to the previous task. __*Default*__: GitpodOpenMode.TAB_AFTER
  * **prebuild** (<code>string</code>)  The optional prebuild command will be executed during prebuilds. __*Optional*__




#### addDockerImage(image)🔹 <a id="projen-gitpod-adddockerimage"></a>

Add a custom Docker image or Dockerfile for the container.

```ts
addDockerImage(image: DevEnvironmentDockerImage): void
```

* **image** (<code>[DevEnvironmentDockerImage](#projen-devenvironmentdockerimage)</code>)  The Docker image.




#### addPorts(...ports)🔹 <a id="projen-gitpod-addports"></a>

Add ports that should be exposed (forwarded) from the container.

```ts
addPorts(...ports: string[]): void
```

* **ports** (<code>string</code>)  The new ports.




#### addPrebuilds(config)🔹 <a id="projen-gitpod-addprebuilds"></a>

Add a prebuilds configuration for the Gitpod App.

```ts
addPrebuilds(config: GitpodPrebuilds): void
```

* **config** (<code>[GitpodPrebuilds](#projen-gitpodprebuilds)</code>)  The configuration.
  * **addBadge** (<code>boolean</code>)  Add a "Review in Gitpod" button to the pull request's description. __*Default*__: false
  * **addCheck** (<code>boolean</code>)  Add a check to pull requests. __*Default*__: true
  * **addComment** (<code>boolean</code>)  Add a "Review in Gitpod" button as a comment to pull requests. __*Default*__: false
  * **addLabel** (<code>boolean</code>)  Add a label once the prebuild is ready to pull requests. __*Default*__: false
  * **branches** (<code>boolean</code>)  Enable for all branches in this repo. __*Default*__: false
  * **master** (<code>boolean</code>)  Enable for the master/default branch. __*Default*__: true
  * **pullRequests** (<code>boolean</code>)  Enable for pull requests coming from this repo. __*Default*__: true
  * **pullRequestsFromForks** (<code>boolean</code>)  Enable for pull requests coming from forks. __*Default*__: false




#### addTasks(...tasks)🔹 <a id="projen-gitpod-addtasks"></a>

Add tasks to run when gitpod starts.

By default, all tasks will be run in parallel. To run tasks in sequence,
create a new `Task` and specify the other tasks as subtasks.

```ts
addTasks(...tasks: Task[]): void
```

* **tasks** (<code>[tasks.Task](#projen-tasks-task)</code>)  The new tasks.




#### addVscodeExtensions(...extensions)🔹 <a id="projen-gitpod-addvscodeextensions"></a>

Add a list of VSCode extensions that should be automatically installed in the container.

These must be in the format defined in the Open VSX registry.

```ts
addVscodeExtensions(...extensions: string[]): void
```

* **extensions** (<code>string</code>)  The extension IDs.






## class IgnoreFile 🔹 <a id="projen-ignorefile"></a>



__Extends__: [FileBase](#projen-filebase)

### Initializer




```ts
new IgnoreFile(project: Project, filePath: string)
```

* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **filePath** (<code>string</code>)  *No description*


### Methods


#### addPatterns(...patterns)🔹 <a id="projen-ignorefile-addpatterns"></a>

Add ignore patterns.

Files that match this pattern will be ignored. If the
pattern starts with a negation mark `!`, files that match will _not_ be
ignored.

Comment lines (start with `#`) are ignored.

```ts
addPatterns(...patterns: string[]): void
```

* **patterns** (<code>string</code>)  Ignore patterns.




#### exclude(...patterns)🔹 <a id="projen-ignorefile-exclude"></a>

Ignore the files that match these patterns.

```ts
exclude(...patterns: string[]): void
```

* **patterns** (<code>string</code>)  The patterns to match.




#### include(...patterns)🔹 <a id="projen-ignorefile-include"></a>

Always include the specified file patterns.

```ts
include(...patterns: string[]): void
```

* **patterns** (<code>string</code>)  Patterns to include in git commits.




#### removePatterns(...patterns)🔹 <a id="projen-ignorefile-removepatterns"></a>

Removes patterns previously added from the ignore file.

If `addPattern()` is called after this, the pattern will be added again.

```ts
removePatterns(...patterns: string[]): void
```

* **patterns** (<code>string</code>)  patters to remove.




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
  * **coverageText** (<code>boolean</code>)  Include the `text` coverage reporter, which means that coverage summary is printed at the end of the jest execution. __*Default*__: true
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




#### addSnapshotResolver(file)🔹 <a id="projen-jest-addsnapshotresolver"></a>



```ts
addSnapshotResolver(file: string): void
```

* **file** (<code>string</code>)  *No description*




#### addTestMatch(pattern)🔹 <a id="projen-jest-addtestmatch"></a>

Adds a test match pattern.

```ts
addTestMatch(pattern: string): void
```

* **pattern** (<code>string</code>)  glob pattern to match for tests.




#### addWatchIgnorePattern(pattern)🔹 <a id="projen-jest-addwatchignorepattern"></a>

Adds a watch ignore pattern.

```ts
addWatchIgnorePattern(pattern: string): void
```

* **pattern** (<code>string</code>)  The pattern (regular expression).




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
  * **name** (<code>string</code>)  This is the name of your project. 
  * **clobber** (<code>boolean</code>)  Add a `clobber` task which resets the repo to origin. __*Default*__: true
  * **devContainer** (<code>boolean</code>)  Add a VSCode development environment (used for GitHub Codespaces). __*Default*__: false
  * **gitpod** (<code>boolean</code>)  Add a Gitpod development environment. __*Default*__: false
  * **jsiiFqn** (<code>string</code>)  The JSII FQN (fully qualified name) of the project class. __*Default*__: undefined
  * **logging** (<code>[LoggerOptions](#projen-loggeroptions)</code>)  Configure logging options such as verbosity. __*Default*__: {}
  * **outdir** (<code>string</code>)  The root directory of the project. __*Default*__: "."
  * **parent** (<code>[Project](#projen-project)</code>)  The parent project, if this project is part of a bigger project. __*Optional*__
  * **projectType** (<code>[ProjectType](#projen-projecttype)</code>)  Which type of project this is (library/app). __*Default*__: ProjectType.UNKNOWN
  * **readme** (<code>[SampleReadmeProps](#projen-samplereadmeprops)</code>)  The README setup. __*Default*__: { filename: 'README.md', contents: '# replace this' }
  * **allowLibraryDependencies** (<code>boolean</code>)  Allow the project to include `peerDependencies` and `bundledDependencies`. __*Default*__: true
  * **authorEmail** (<code>string</code>)  Author's e-mail. __*Optional*__
  * **authorName** (<code>string</code>)  Author's name. __*Optional*__
  * **authorOrganization** (<code>boolean</code>)  Author's Organization. __*Optional*__
  * **authorUrl** (<code>string</code>)  Author's URL / Website. __*Optional*__
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. __*Default*__: true
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. __*Optional*__
  * **bundledDeps** (<code>Array<string></code>)  List of dependencies to bundle into this module. __*Optional*__
  * **deps** (<code>Array<string></code>)  Runtime dependencies of this module. __*Default*__: []
  * **description** (<code>string</code>)  The description is just a string that helps people understand the purpose of the package. __*Optional*__
  * **devDeps** (<code>Array<string></code>)  Build dependencies for this module. __*Default*__: []
  * **entrypoint** (<code>string</code>)  Module entrypoint (`main` in `package.json`). __*Default*__: "lib/index.js"
  * **homepage** (<code>string</code>)  Package's Homepage / Website. __*Optional*__
  * **keywords** (<code>Array<string></code>)  Keywords to include in `package.json`. __*Optional*__
  * **license** (<code>string</code>)  License's SPDX identifier. __*Default*__: "Apache-2.0"
  * **licensed** (<code>boolean</code>)  Indicates if a license should be added. __*Default*__: true
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). __*Default*__: no max
  * **minNodeVersion** (<code>string</code>)  Minimum Node.js version to require via package.json `engines` (inclusive). __*Default*__: no "engines" specified
  * **npmAccess** (<code>[NpmAccess](#projen-npmaccess)</code>)  Access level of the npm package. __*Default*__: for scoped packages (e.g. `foo@bar`), the default is `NpmAccess.RESTRICTED`, for non-scoped packages, the default is `NpmAccess.PUBLIC`.
  * **npmDistTag** (<code>string</code>)  Tags can be used to provide an alias instead of version numbers. __*Default*__: "latest"
  * **npmRegistry** (<code>string</code>)  The host name of the npm registry to publish to. __*Optional*__
  * **npmRegistryUrl** (<code>string</code>)  The base URL of the npm package registry. __*Default*__: "https://registry.npmjs.org"
  * **npmTaskExecution** (<code>[NpmTaskExecution](#projen-npmtaskexecution)</code>)  Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz). __*Default*__: NpmTaskExecution.PROJEN
  * **packageManager** (<code>[NodePackageManager](#projen-nodepackagemanager)</code>)  The Node Package Manager used to execute scripts. __*Default*__: NodePackageManager.YARN
  * **packageName** (<code>string</code>)  The "name" in package.json. __*Default*__: defaults to project name
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  Options for `peerDeps`. __*Optional*__
  * **peerDeps** (<code>Array<string></code>)  Peer dependencies for this module. __*Default*__: []
  * **projenCommand** (<code>string</code>)  The shell command to use in order to run the projen CLI. __*Default*__: "npx projen"
  * **repository** (<code>string</code>)  The repository is the location where the actual code for your package lives. __*Optional*__
  * **repositoryDirectory** (<code>string</code>)  If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives. __*Optional*__
  * **scripts** (<code>Map<string, string></code>)  npm scripts to include. __*Default*__: {}
  * **stability** (<code>string</code>)  Package's Stability. __*Optional*__
  * **defaultReleaseBranch** (<code>string</code>)  The name of the main release branch. 
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files on git. __*Default*__: true
  * **artifactsDirectory** (<code>string</code>)  A directory which will contain artifacts to be published to npm. __*Default*__: "dist"
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. __*Default*__: true if not a subproject
  * **codeCov** (<code>boolean</code>)  Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret. __*Default*__: false
  * **codeCovTokenSecret** (<code>string</code>)  Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories. __*Default*__: if this option is not specified, only public repositories are supported
  * **copyrightOwner** (<code>string</code>)  License copyright owner. __*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. __*Default*__: current year
  * **dependabot** (<code>boolean</code>)  Include dependabot configuration. __*Default*__: true
  * **dependabotOptions** (<code>[github.DependabotOptions](#projen-github-dependabotoptions)</code>)  Options for dependabot. __*Default*__: default options
  * **gitignore** (<code>Array<string></code>)  Additional entries to .gitignore. __*Optional*__
  * **jest** (<code>boolean</code>)  Setup jest unit tests. __*Default*__: true
  * **jestOptions** (<code>[JestOptions](#projen-jestoptions)</code>)  Jest options. __*Default*__: default options
  * **jsiiReleaseVersion** (<code>string</code>)  Version requirement of `jsii-release` which is used to publish modules to npm. __*Default*__: "latest"
  * **mergify** (<code>boolean</code>)  Adds mergify configuration. __*Default*__: true
  * **mergifyAutoMergeLabel** (<code>string</code>)  Automatically merge PRs that build successfully and have this label. __*Default*__: "auto-merge"
  * **mergifyOptions** (<code>[github.MergifyOptions](#projen-github-mergifyoptions)</code>)  Options for mergify. __*Default*__: default options
  * **npmignore** (<code>Array<string></code>)  Additional entries to .npmignore. __*Optional*__
  * **npmignoreEnabled** (<code>boolean</code>)  Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs. __*Default*__: true
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. __*Default*__: true
  * **projenUpgradeAutoMerge** (<code>boolean</code>)  Automatically merge projen upgrade PRs when build passes. __*Default*__: "true" if mergify auto-merge is enabled (default)
  * **projenUpgradeSchedule** (<code>Array<string></code>)  Customize the projenUpgrade schedule in cron expression. __*Default*__: [ "0 6 * * *" ]
  * **projenUpgradeSecret** (<code>string</code>)  Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`). __*Default*__: no automatic projen upgrade pull requests
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. __*Default*__: Semver.latest()
  * **pullRequestTemplate** (<code>boolean</code>)  Include a GitHub pull request template. __*Default*__: true
  * **pullRequestTemplateContents** (<code>string</code>)  The contents of the pull request template. __*Default*__: default content
  * **rebuildBot** (<code>boolean</code>)  Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request. __*Default*__: true if not a subproject
  * **rebuildBotCommand** (<code>string</code>)  The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch. __*Default*__: "rebuild"
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. __*Default*__: [ "main" ]
  * **releaseEveryCommit** (<code>boolean</code>)  Automatically release new versions every commit to one of branches in `releaseBranches`. __*Default*__: true
  * **releaseSchedule** (<code>string</code>)  CRON schedule to trigger new releases. __*Default*__: no scheduled releases
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. __*Default*__: false
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "main" when new versions are bumped. __*Default*__: true if not a subproject
  * **workflowBootstrapSteps** (<code>Array<any></code>)  Workflow steps to use in order to bootstrap this repo. __*Default*__: "yarn install --frozen-lockfile && yarn projen"
  * **workflowContainerImage** (<code>string</code>)  Container image to use for GitHub workflows. __*Default*__: default image
  * **workflowNodeVersion** (<code>string</code>)  The node version to use in GitHub workflows. __*Default*__: same as `minNodeVersion`
  * **author** (<code>string</code>)  The name of the library author. 
  * **authorAddress** (<code>string</code>)  Email or URL of the library author. 
  * **repositoryUrl** (<code>string</code>)  Git repository URL. 
  * **compat** (<code>boolean</code>)  Automatically run API compatibility test against the latest version published to npm after compilation. __*Default*__: false
  * **compatIgnore** (<code>string</code>)  Name of the ignore file for API compatibility tests. __*Default*__: ".compatignore"
  * **docgen** (<code>boolean</code>)  Automatically generate API.md from jsii. __*Default*__: true
  * **dotnet** (<code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code>)  *No description* __*Optional*__
  * **eslint** (<code>boolean</code>)  Install eslint. __*Default*__: true
  * **eslintOptions** (<code>[EslintOptions](#projen-eslintoptions)</code>)  Eslint options. __*Default*__: opinionated default options
  * **excludeTypescript** (<code>Array<string></code>)  Accepts a list of glob patterns. __*Optional*__
  * **publishToGo** (<code>[JsiiGoTarget](#projen-jsiigotarget)</code>)  Publish Go bindings to a git repository. __*Default*__: no publishing
  * **publishToMaven** (<code>[JsiiJavaTarget](#projen-jsiijavatarget)</code>)  Publish to maven. __*Default*__: no publishing
  * **publishToNuget** (<code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code>)  Publish to NuGet. __*Default*__: no publishing
  * **publishToPypi** (<code>[JsiiPythonTarget](#projen-jsiipythontarget)</code>)  Publish to pypi. __*Default*__: no publishing
  * **python** (<code>[JsiiPythonTarget](#projen-jsiipythontarget)</code>)  *No description* __*Optional*__
  * **rootdir** (<code>string</code>)  *No description* __*Default*__: "."
  * **sampleCode** (<code>boolean</code>)  Generate one-time sample in `src/` and `test/` if there are no files there. __*Default*__: true



### Properties


Name | Type | Description 
-----|------|-------------
**eslint**?🔹 | <code>[Eslint](#projen-eslint)</code> | __*Optional*__



## class JsonFile 🔹 <a id="projen-jsonfile"></a>

Represents a JSON file.

__Implements__: [IMarkableFile](#projen-imarkablefile)
__Extends__: [ObjectFile](#projen-objectfile)

### Initializer




```ts
new JsonFile(project: Project, filePath: string, options: JsonFileOptions)
```

* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **filePath** (<code>string</code>)  *No description*
* **options** (<code>[JsonFileOptions](#projen-jsonfileoptions)</code>)  *No description*
  * **committed** (<code>boolean</code>)  Indicates whether this file should be committed to git or ignored. __*Default*__: true
  * **editGitignore** (<code>boolean</code>)  Update the project's .gitignore file. __*Default*__: true
  * **executable** (<code>boolean</code>)  Whether the generated file should be marked as executable. __*Default*__: false
  * **readonly** (<code>boolean</code>)  Whether the generated file should be readonly. __*Default*__: true
  * **marker** (<code>boolean</code>)  Adds the projen marker to the file. __*Default*__: false
  * **obj** (<code>any</code>)  The object that will be serialized. __*Default*__: {} an empty object (use `file.obj` to mutate).
  * **omitEmpty** (<code>boolean</code>)  Omits empty objects and arrays. __*Default*__: false


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



## class Logger 🔹 <a id="projen-logger"></a>

Project-level logging utilities.

__Extends__: [Component](#projen-component)

### Initializer




```ts
new Logger(project: Project, options?: LoggerOptions)
```

* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **options** (<code>[LoggerOptions](#projen-loggeroptions)</code>)  *No description*
  * **level** (<code>[LogLevel](#projen-loglevel)</code>)  The logging verbosity. __*Default*__: LogLevel.INFO
  * **usePrefix** (<code>boolean</code>)  Include a prefix for all logging messages with the project name. __*Default*__: false


### Methods


#### debug(...text)🔹 <a id="projen-logger-debug"></a>

Log a message to stderr with DEBUG severity.

```ts
debug(...text: any[]): void
```

* **text** (<code>any</code>)  strings or objects to print.




#### error(...text)🔹 <a id="projen-logger-error"></a>

Log a message to stderr with ERROR severity.

```ts
error(...text: any[]): void
```

* **text** (<code>any</code>)  strings or objects to print.




#### info(...text)🔹 <a id="projen-logger-info"></a>

Log a message to stderr with INFO severity.

```ts
info(...text: any[]): void
```

* **text** (<code>any</code>)  strings or objects to print.




#### log(level, ...text)🔹 <a id="projen-logger-log"></a>

Log a message to stderr with a given logging level.

The message will be
printed as long as `logger.level` is set to the message's severity or higher.

```ts
log(level: LogLevel, ...text: any[]): void
```

* **level** (<code>[LogLevel](#projen-loglevel)</code>)  Logging verbosity.
* **text** (<code>any</code>)  strings or objects to print.




#### verbose(...text)🔹 <a id="projen-logger-verbose"></a>

Log a message to stderr with VERBOSE severity.

```ts
verbose(...text: any[]): void
```

* **text** (<code>any</code>)  strings or objects to print.




#### warn(...text)🔹 <a id="projen-logger-warn"></a>

Log a message to stderr with WARN severity.

```ts
warn(...text: any[]): void
```

* **text** (<code>any</code>)  strings or objects to print.






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
  * **executable** (<code>boolean</code>)  Whether the generated file should be marked as executable. __*Default*__: false
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



## class NodePackage 🔹 <a id="projen-nodepackage"></a>

Represents the npm `package.json` file.

__Extends__: [Component](#projen-component)

### Initializer




```ts
new NodePackage(project: Project, options?: NodePackageOptions)
```

* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **options** (<code>[NodePackageOptions](#projen-nodepackageoptions)</code>)  *No description*
  * **allowLibraryDependencies** (<code>boolean</code>)  Allow the project to include `peerDependencies` and `bundledDependencies`. __*Default*__: true
  * **authorEmail** (<code>string</code>)  Author's e-mail. __*Optional*__
  * **authorName** (<code>string</code>)  Author's name. __*Optional*__
  * **authorOrganization** (<code>boolean</code>)  Author's Organization. __*Optional*__
  * **authorUrl** (<code>string</code>)  Author's URL / Website. __*Optional*__
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. __*Default*__: true
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. __*Optional*__
  * **bundledDeps** (<code>Array<string></code>)  List of dependencies to bundle into this module. __*Optional*__
  * **deps** (<code>Array<string></code>)  Runtime dependencies of this module. __*Default*__: []
  * **description** (<code>string</code>)  The description is just a string that helps people understand the purpose of the package. __*Optional*__
  * **devDeps** (<code>Array<string></code>)  Build dependencies for this module. __*Default*__: []
  * **entrypoint** (<code>string</code>)  Module entrypoint (`main` in `package.json`). __*Default*__: "lib/index.js"
  * **homepage** (<code>string</code>)  Package's Homepage / Website. __*Optional*__
  * **keywords** (<code>Array<string></code>)  Keywords to include in `package.json`. __*Optional*__
  * **license** (<code>string</code>)  License's SPDX identifier. __*Default*__: "Apache-2.0"
  * **licensed** (<code>boolean</code>)  Indicates if a license should be added. __*Default*__: true
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). __*Default*__: no max
  * **minNodeVersion** (<code>string</code>)  Minimum Node.js version to require via package.json `engines` (inclusive). __*Default*__: no "engines" specified
  * **npmAccess** (<code>[NpmAccess](#projen-npmaccess)</code>)  Access level of the npm package. __*Default*__: for scoped packages (e.g. `foo@bar`), the default is `NpmAccess.RESTRICTED`, for non-scoped packages, the default is `NpmAccess.PUBLIC`.
  * **npmDistTag** (<code>string</code>)  Tags can be used to provide an alias instead of version numbers. __*Default*__: "latest"
  * **npmRegistry** (<code>string</code>)  The host name of the npm registry to publish to. __*Optional*__
  * **npmRegistryUrl** (<code>string</code>)  The base URL of the npm package registry. __*Default*__: "https://registry.npmjs.org"
  * **npmTaskExecution** (<code>[NpmTaskExecution](#projen-npmtaskexecution)</code>)  Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz). __*Default*__: NpmTaskExecution.PROJEN
  * **packageManager** (<code>[NodePackageManager](#projen-nodepackagemanager)</code>)  The Node Package Manager used to execute scripts. __*Default*__: NodePackageManager.YARN
  * **packageName** (<code>string</code>)  The "name" in package.json. __*Default*__: defaults to project name
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  Options for `peerDeps`. __*Optional*__
  * **peerDeps** (<code>Array<string></code>)  Peer dependencies for this module. __*Default*__: []
  * **projenCommand** (<code>string</code>)  The shell command to use in order to run the projen CLI. __*Default*__: "npx projen"
  * **repository** (<code>string</code>)  The repository is the location where the actual code for your package lives. __*Optional*__
  * **repositoryDirectory** (<code>string</code>)  If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives. __*Optional*__
  * **scripts** (<code>Map<string, string></code>)  npm scripts to include. __*Default*__: {}
  * **stability** (<code>string</code>)  Package's Stability. __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**allowLibraryDependencies**🔹 | <code>boolean</code> | Allow project to take library dependencies.
**entrypoint**🔹 | <code>string</code> | The module's entrypoint (e.g. `lib/index.js`).
**installCommand**🔹 | <code>string</code> | Returns the command to execute in order to install all dependencies (always frozen).
**manifest**⚠️ | <code>any</code> | <span></span>
**npmAccess**🔹 | <code>[NpmAccess](#projen-npmaccess)</code> | npm package access level.
**npmDistTag**🔹 | <code>string</code> | npm distribution tag.
**npmRegistry**🔹 | <code>string</code> | The npm registry host (e.g. `registry.npmjs.org`).
**npmRegistryUrl**🔹 | <code>string</code> | npm registry (e.g. `https://registry.npmjs.org`). Use `npmRegistryHost` to get just the host name.
**npmTaskExecution**🔹 | <code>[NpmTaskExecution](#projen-npmtaskexecution)</code> | Determines how tasks are executed when invoked as npm scripts (yarn/npm/pnpm run xyz).
**packageManager**🔹 | <code>[NodePackageManager](#projen-nodepackagemanager)</code> | The package manager to use.
**packageName**🔹 | <code>string</code> | The name of the npm package.
**projenCommand**🔹 | <code>string</code> | The command to use in order to run the projen CLI.
**license**?🔹 | <code>string</code> | The SPDX license of this module.<br/>__*Optional*__
**maxNodeVersion**?🔹 | <code>string</code> | Maximum node version required by this pacakge.<br/>__*Default*__: no maximum.
**minNodeVersion**?🔹 | <code>string</code> | Minimum node.js version required by this package.<br/>__*Default*__: no minimum

### Methods


#### addBin(bins)🔹 <a id="projen-nodepackage-addbin"></a>



```ts
addBin(bins: Map<string, string>): void
```

* **bins** (<code>Map<string, string></code>)  *No description*




#### addBundledDeps(...deps)🔹 <a id="projen-nodepackage-addbundleddeps"></a>

Defines bundled dependencies.

Bundled dependencies will be added as normal dependencies as well as to the
`bundledDependencies` section of your `package.json`.

```ts
addBundledDeps(...deps: string[]): void
```

* **deps** (<code>string</code>)  Names modules to install.




#### addDeps(...deps)🔹 <a id="projen-nodepackage-adddeps"></a>

Defines normal dependencies.

```ts
addDeps(...deps: string[]): void
```

* **deps** (<code>string</code>)  Names modules to install.




#### addDevDeps(...deps)🔹 <a id="projen-nodepackage-adddevdeps"></a>

Defines development/test dependencies.

```ts
addDevDeps(...deps: string[]): void
```

* **deps** (<code>string</code>)  Names modules to install.




#### addEngine(engine, version)🔹 <a id="projen-nodepackage-addengine"></a>

Adds an `engines` requirement to your package.

```ts
addEngine(engine: string, version: string): void
```

* **engine** (<code>string</code>)  The engine (e.g. `node`).
* **version** (<code>string</code>)  The semantic version requirement (e.g. `^10`).




#### addField(name, value)🔹 <a id="projen-nodepackage-addfield"></a>

Directly set fields in `package.json`.

```ts
addField(name: string, value: any): void
```

* **name** (<code>string</code>)  field name.
* **value** (<code>any</code>)  field value.




#### addKeywords(...keywords)🔹 <a id="projen-nodepackage-addkeywords"></a>

Adds keywords to package.json (deduplicated).

```ts
addKeywords(...keywords: string[]): void
```

* **keywords** (<code>string</code>)  The keywords to add.




#### addPeerDeps(...deps)🔹 <a id="projen-nodepackage-addpeerdeps"></a>

Defines peer dependencies.

When adding peer dependencies, a devDependency will also be added on the
pinned version of the declared peer. This will ensure that you are testing
your code against the minimum version required from your consumers.

```ts
addPeerDeps(...deps: string[]): void
```

* **deps** (<code>string</code>)  Names modules to install.




#### addVersion(version)🔹 <a id="projen-nodepackage-addversion"></a>

Sets the package version.

```ts
addVersion(version: string): void
```

* **version** (<code>string</code>)  Package version.




#### hasScript(name)🔹 <a id="projen-nodepackage-hasscript"></a>

Indicates if a script by the name name is defined.

```ts
hasScript(name: string): boolean
```

* **name** (<code>string</code>)  The name of the script.

__Returns__:
* <code>boolean</code>

#### postSynthesize()🔹 <a id="projen-nodepackage-postsynthesize"></a>

Called after synthesis.

Order is *not* guaranteed.

```ts
postSynthesize(): void
```





#### preSynthesize()🔹 <a id="projen-nodepackage-presynthesize"></a>

Called before synthesis.

```ts
preSynthesize(): void
```





#### removeScript(name)🔹 <a id="projen-nodepackage-removescript"></a>

Removes the npm script (always successful).

```ts
removeScript(name: string): void
```

* **name** (<code>string</code>)  The name of the script.




#### setScript(name, command)🔹 <a id="projen-nodepackage-setscript"></a>

Replaces the contents of an npm package.json script.

```ts
setScript(name: string, command: string): void
```

* **name** (<code>string</code>)  The script name.
* **command** (<code>string</code>)  The command to execute.






## class NodeProject 🔹 <a id="projen-nodeproject"></a>

Node.js project.

__Extends__: [Project](#projen-project)

### Initializer




```ts
new NodeProject(options: NodeProjectOptions)
```

* **options** (<code>[NodeProjectOptions](#projen-nodeprojectoptions)</code>)  *No description*
  * **name** (<code>string</code>)  This is the name of your project. 
  * **clobber** (<code>boolean</code>)  Add a `clobber` task which resets the repo to origin. __*Default*__: true
  * **devContainer** (<code>boolean</code>)  Add a VSCode development environment (used for GitHub Codespaces). __*Default*__: false
  * **gitpod** (<code>boolean</code>)  Add a Gitpod development environment. __*Default*__: false
  * **jsiiFqn** (<code>string</code>)  The JSII FQN (fully qualified name) of the project class. __*Default*__: undefined
  * **logging** (<code>[LoggerOptions](#projen-loggeroptions)</code>)  Configure logging options such as verbosity. __*Default*__: {}
  * **outdir** (<code>string</code>)  The root directory of the project. __*Default*__: "."
  * **parent** (<code>[Project](#projen-project)</code>)  The parent project, if this project is part of a bigger project. __*Optional*__
  * **projectType** (<code>[ProjectType](#projen-projecttype)</code>)  Which type of project this is (library/app). __*Default*__: ProjectType.UNKNOWN
  * **readme** (<code>[SampleReadmeProps](#projen-samplereadmeprops)</code>)  The README setup. __*Default*__: { filename: 'README.md', contents: '# replace this' }
  * **allowLibraryDependencies** (<code>boolean</code>)  Allow the project to include `peerDependencies` and `bundledDependencies`. __*Default*__: true
  * **authorEmail** (<code>string</code>)  Author's e-mail. __*Optional*__
  * **authorName** (<code>string</code>)  Author's name. __*Optional*__
  * **authorOrganization** (<code>boolean</code>)  Author's Organization. __*Optional*__
  * **authorUrl** (<code>string</code>)  Author's URL / Website. __*Optional*__
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. __*Default*__: true
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. __*Optional*__
  * **bundledDeps** (<code>Array<string></code>)  List of dependencies to bundle into this module. __*Optional*__
  * **deps** (<code>Array<string></code>)  Runtime dependencies of this module. __*Default*__: []
  * **description** (<code>string</code>)  The description is just a string that helps people understand the purpose of the package. __*Optional*__
  * **devDeps** (<code>Array<string></code>)  Build dependencies for this module. __*Default*__: []
  * **entrypoint** (<code>string</code>)  Module entrypoint (`main` in `package.json`). __*Default*__: "lib/index.js"
  * **homepage** (<code>string</code>)  Package's Homepage / Website. __*Optional*__
  * **keywords** (<code>Array<string></code>)  Keywords to include in `package.json`. __*Optional*__
  * **license** (<code>string</code>)  License's SPDX identifier. __*Default*__: "Apache-2.0"
  * **licensed** (<code>boolean</code>)  Indicates if a license should be added. __*Default*__: true
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). __*Default*__: no max
  * **minNodeVersion** (<code>string</code>)  Minimum Node.js version to require via package.json `engines` (inclusive). __*Default*__: no "engines" specified
  * **npmAccess** (<code>[NpmAccess](#projen-npmaccess)</code>)  Access level of the npm package. __*Default*__: for scoped packages (e.g. `foo@bar`), the default is `NpmAccess.RESTRICTED`, for non-scoped packages, the default is `NpmAccess.PUBLIC`.
  * **npmDistTag** (<code>string</code>)  Tags can be used to provide an alias instead of version numbers. __*Default*__: "latest"
  * **npmRegistry** (<code>string</code>)  The host name of the npm registry to publish to. __*Optional*__
  * **npmRegistryUrl** (<code>string</code>)  The base URL of the npm package registry. __*Default*__: "https://registry.npmjs.org"
  * **npmTaskExecution** (<code>[NpmTaskExecution](#projen-npmtaskexecution)</code>)  Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz). __*Default*__: NpmTaskExecution.PROJEN
  * **packageManager** (<code>[NodePackageManager](#projen-nodepackagemanager)</code>)  The Node Package Manager used to execute scripts. __*Default*__: NodePackageManager.YARN
  * **packageName** (<code>string</code>)  The "name" in package.json. __*Default*__: defaults to project name
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  Options for `peerDeps`. __*Optional*__
  * **peerDeps** (<code>Array<string></code>)  Peer dependencies for this module. __*Default*__: []
  * **projenCommand** (<code>string</code>)  The shell command to use in order to run the projen CLI. __*Default*__: "npx projen"
  * **repository** (<code>string</code>)  The repository is the location where the actual code for your package lives. __*Optional*__
  * **repositoryDirectory** (<code>string</code>)  If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives. __*Optional*__
  * **scripts** (<code>Map<string, string></code>)  npm scripts to include. __*Default*__: {}
  * **stability** (<code>string</code>)  Package's Stability. __*Optional*__
  * **defaultReleaseBranch** (<code>string</code>)  The name of the main release branch. 
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files on git. __*Default*__: true
  * **artifactsDirectory** (<code>string</code>)  A directory which will contain artifacts to be published to npm. __*Default*__: "dist"
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. __*Default*__: true if not a subproject
  * **codeCov** (<code>boolean</code>)  Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret. __*Default*__: false
  * **codeCovTokenSecret** (<code>string</code>)  Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories. __*Default*__: if this option is not specified, only public repositories are supported
  * **copyrightOwner** (<code>string</code>)  License copyright owner. __*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. __*Default*__: current year
  * **dependabot** (<code>boolean</code>)  Include dependabot configuration. __*Default*__: true
  * **dependabotOptions** (<code>[github.DependabotOptions](#projen-github-dependabotoptions)</code>)  Options for dependabot. __*Default*__: default options
  * **gitignore** (<code>Array<string></code>)  Additional entries to .gitignore. __*Optional*__
  * **jest** (<code>boolean</code>)  Setup jest unit tests. __*Default*__: true
  * **jestOptions** (<code>[JestOptions](#projen-jestoptions)</code>)  Jest options. __*Default*__: default options
  * **jsiiReleaseVersion** (<code>string</code>)  Version requirement of `jsii-release` which is used to publish modules to npm. __*Default*__: "latest"
  * **mergify** (<code>boolean</code>)  Adds mergify configuration. __*Default*__: true
  * **mergifyAutoMergeLabel** (<code>string</code>)  Automatically merge PRs that build successfully and have this label. __*Default*__: "auto-merge"
  * **mergifyOptions** (<code>[github.MergifyOptions](#projen-github-mergifyoptions)</code>)  Options for mergify. __*Default*__: default options
  * **npmignore** (<code>Array<string></code>)  Additional entries to .npmignore. __*Optional*__
  * **npmignoreEnabled** (<code>boolean</code>)  Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs. __*Default*__: true
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. __*Default*__: true
  * **projenUpgradeAutoMerge** (<code>boolean</code>)  Automatically merge projen upgrade PRs when build passes. __*Default*__: "true" if mergify auto-merge is enabled (default)
  * **projenUpgradeSchedule** (<code>Array<string></code>)  Customize the projenUpgrade schedule in cron expression. __*Default*__: [ "0 6 * * *" ]
  * **projenUpgradeSecret** (<code>string</code>)  Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`). __*Default*__: no automatic projen upgrade pull requests
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. __*Default*__: Semver.latest()
  * **pullRequestTemplate** (<code>boolean</code>)  Include a GitHub pull request template. __*Default*__: true
  * **pullRequestTemplateContents** (<code>string</code>)  The contents of the pull request template. __*Default*__: default content
  * **rebuildBot** (<code>boolean</code>)  Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request. __*Default*__: true if not a subproject
  * **rebuildBotCommand** (<code>string</code>)  The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch. __*Default*__: "rebuild"
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. __*Default*__: [ "main" ]
  * **releaseEveryCommit** (<code>boolean</code>)  Automatically release new versions every commit to one of branches in `releaseBranches`. __*Default*__: true
  * **releaseSchedule** (<code>string</code>)  CRON schedule to trigger new releases. __*Default*__: no scheduled releases
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. __*Default*__: false
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "main" when new versions are bumped. __*Default*__: true if not a subproject
  * **workflowBootstrapSteps** (<code>Array<any></code>)  Workflow steps to use in order to bootstrap this repo. __*Default*__: "yarn install --frozen-lockfile && yarn projen"
  * **workflowContainerImage** (<code>string</code>)  Container image to use for GitHub workflows. __*Default*__: default image
  * **workflowNodeVersion** (<code>string</code>)  The node version to use in GitHub workflows. __*Default*__: same as `minNodeVersion`



### Properties


Name | Type | Description 
-----|------|-------------
**allowLibraryDependencies**⚠️ | <code>boolean</code> | <span></span>
**antitamper**🔹 | <code>boolean</code> | Indicates if workflows have anti-tamper checks.
**buildTask**🔹 | <code>[tasks.Task](#projen-tasks-task)</code> | The task responsible for a full release build.
**compileTask**🔹 | <code>[tasks.Task](#projen-tasks-task)</code> | Compiles the code.
**entrypoint**⚠️ | <code>string</code> | <span></span>
**installWorkflowSteps**🔹 | <code>Array<any></code> | <span></span>
**manifest**⚠️ | <code>any</code> | <span></span>
**npmDistTag**⚠️ | <code>string</code> | <span></span>
**npmRegistry**⚠️ | <code>string</code> | <span></span>
**npmTaskExecution**⚠️ | <code>[NpmTaskExecution](#projen-npmtaskexecution)</code> | Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz).
**package**🔹 | <code>[NodePackage](#projen-nodepackage)</code> | API for managing the node package.
**packageManager**⚠️ | <code>[NodePackageManager](#projen-nodepackagemanager)</code> | The package manager to use.
**projenCommand**🔹 | <code>string</code> | The command to use in order to run the projen CLI.
**runScriptCommand**🔹 | <code>string</code> | The command to use to run scripts (e.g. `yarn run` or `npm run` depends on the package manager).
**testCompileTask**🔹 | <code>[tasks.Task](#projen-tasks-task)</code> | Compiles the test code.
**testTask**🔹 | <code>[tasks.Task](#projen-tasks-task)</code> | Tests the code.
**autoMerge**?🔹 | <code>[github.AutoMerge](#projen-github-automerge)</code> | Automatic PR merges.<br/>__*Optional*__
**buildWorkflow**?🔹 | <code>[github.GithubWorkflow](#projen-github-githubworkflow)</code> | The PR build GitHub workflow.<br/>__*Optional*__
**buildWorkflowJobId**?🔹 | <code>string</code> | __*Optional*__
**jest**?🔹 | <code>[Jest](#projen-jest)</code> | The Jest configuration (if enabled).<br/>__*Optional*__
**maxNodeVersion**?🔹 | <code>string</code> | Maximum node version required by this pacakge.<br/>__*Optional*__
**minNodeVersion**?🔹 | <code>string</code> | Minimum node.js version required by this package.<br/>__*Optional*__
**npmignore**?🔹 | <code>[IgnoreFile](#projen-ignorefile)</code> | The .npmignore file.<br/>__*Optional*__
**publisher**?🔹 | <code>[Publisher](#projen-publisher)</code> | Package publisher.<br/>__*Optional*__
**releaseWorkflow**?🔹 | <code>[github.GithubWorkflow](#projen-github-githubworkflow)</code> | The release GitHub workflow.<br/>__*Optional*__

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




#### addDeps(...deps)🔹 <a id="projen-nodeproject-adddeps"></a>

Defines normal dependencies.

```ts
addDeps(...deps: string[]): void
```

* **deps** (<code>string</code>)  Names modules to install.




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

* **task** (<code>[tasks.Task](#projen-tasks-task)</code>)  The task for which the command is required.

__Returns__:
* <code>string</code>

#### setScript(name, command)🔹 <a id="projen-nodeproject-setscript"></a>

Replaces the contents of an npm package.json script.

```ts
setScript(name: string, command: string): void
```

* **name** (<code>string</code>)  The script name.
* **command** (<code>string</code>)  The command to execute.






## class ObjectFile 🔹 <a id="projen-objectfile"></a>

Represents an Object file.

__Implements__: [IMarkableFile](#projen-imarkablefile)
__Extends__: [FileBase](#projen-filebase)
__Implemented by__: [JsonFile](#projen-jsonfile), [TomlFile](#projen-tomlfile), [XmlFile](#projen-xmlfile), [YamlFile](#projen-yamlfile)
__Obtainable from__: [Project](#projen-project).[tryFindObjectFile](#projen-project#projen-project-tryfindobjectfile)()

### Initializer




```ts
new ObjectFile(project: Project, filePath: string, options: ObjectFileOptions)
```

* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **filePath** (<code>string</code>)  *No description*
* **options** (<code>[ObjectFileOptions](#projen-objectfileoptions)</code>)  *No description*
  * **committed** (<code>boolean</code>)  Indicates whether this file should be committed to git or ignored. __*Default*__: true
  * **editGitignore** (<code>boolean</code>)  Update the project's .gitignore file. __*Default*__: true
  * **executable** (<code>boolean</code>)  Whether the generated file should be marked as executable. __*Default*__: false
  * **readonly** (<code>boolean</code>)  Whether the generated file should be readonly. __*Default*__: true
  * **marker** (<code>boolean</code>)  Adds the projen marker to the file. __*Default*__: false
  * **obj** (<code>any</code>)  The object that will be serialized. __*Default*__: {} an empty object (use `file.obj` to mutate).
  * **omitEmpty** (<code>boolean</code>)  Omits empty objects and arrays. __*Default*__: false



### Properties


Name | Type | Description 
-----|------|-------------
**marker**🔹 | <code>boolean</code> | Indicates if the projen marker JSON-comment will be added to the output object.
**omitEmpty**🔹 | <code>boolean</code> | Indicates if empty objects and arrays are omitted from the output object.

### Methods


#### addDeletionOverride(path)🔹 <a id="projen-objectfile-adddeletionoverride"></a>

Syntactic sugar for `addOverride(path, undefined)`.

```ts
addDeletionOverride(path: string): void
```

* **path** (<code>string</code>)  The path of the value to delete.




#### addOverride(path, value)🔹 <a id="projen-objectfile-addoverride"></a>

Adds an override to the synthesized object file.

If the override is nested, separate each nested level using a dot (.) in the path parameter.
If there is an array as part of the nesting, specify the index in the path.

To include a literal `.` in the property name, prefix with a `\`. In most
programming languages you will need to write this as `"\\."` because the
`\` itself will need to be escaped.

For example,
```typescript
project.tsconfig.file.addOverride('compilerOptions.alwaysStrict', true);
project.tsconfig.file.addOverride('compilerOptions.lib', ['dom', 'dom.iterable', 'esnext']);
```
would add the overrides
```json
"compilerOptions": {
   "alwaysStrict": true,
   "lib": [
     "dom",
     "dom.iterable",
     "esnext"
   ]
   ...
}
...
```

```ts
addOverride(path: string, value: any): void
```

* **path** (<code>string</code>)  - The path of the property, you can use dot notation to override values in complex types.
* **value** (<code>any</code>)  - The value.




#### protected synthesizeContent(resolver)🔹 <a id="projen-objectfile-synthesizecontent"></a>

Implemented by derived classes and returns the contents of the file to emit.

```ts
protected synthesizeContent(resolver: IResolver): string
```

* **resolver** (<code>[IResolver](#projen-iresolver)</code>)  *No description*

__Returns__:
* <code>string</code>



## class Project 🔹 <a id="projen-project"></a>

Base project.


### Initializer




```ts
new Project(options: ProjectOptions)
```

* **options** (<code>[ProjectOptions](#projen-projectoptions)</code>)  *No description*
  * **name** (<code>string</code>)  This is the name of your project. 
  * **clobber** (<code>boolean</code>)  Add a `clobber` task which resets the repo to origin. __*Default*__: true
  * **devContainer** (<code>boolean</code>)  Add a VSCode development environment (used for GitHub Codespaces). __*Default*__: false
  * **gitpod** (<code>boolean</code>)  Add a Gitpod development environment. __*Default*__: false
  * **jsiiFqn** (<code>string</code>)  The JSII FQN (fully qualified name) of the project class. __*Default*__: undefined
  * **logging** (<code>[LoggerOptions](#projen-loggeroptions)</code>)  Configure logging options such as verbosity. __*Default*__: {}
  * **outdir** (<code>string</code>)  The root directory of the project. __*Default*__: "."
  * **parent** (<code>[Project](#projen-project)</code>)  The parent project, if this project is part of a bigger project. __*Optional*__
  * **projectType** (<code>[ProjectType](#projen-projecttype)</code>)  Which type of project this is (library/app). __*Default*__: ProjectType.UNKNOWN
  * **readme** (<code>[SampleReadmeProps](#projen-samplereadmeprops)</code>)  The README setup. __*Default*__: { filename: 'README.md', contents: '# replace this' }



### Properties


Name | Type | Description 
-----|------|-------------
**components**🔹 | <code>Array<[Component](#projen-component)></code> | Returns all the components within this project.
**deps**🔹 | <code>[deps.Dependencies](#projen-deps-dependencies)</code> | Project dependencies.
**files**🔹 | <code>Array<[FileBase](#projen-filebase)></code> | All files in this project.
**gitignore**🔹 | <code>[IgnoreFile](#projen-ignorefile)</code> | .gitignore.
**logger**🔹 | <code>[Logger](#projen-logger)</code> | Logging utilities.
**name**🔹 | <code>string</code> | Project name.
**outdir**🔹 | <code>string</code> | Absolute output directory of this project.
**projectType**🔹 | <code>[ProjectType](#projen-projecttype)</code> | <span></span>
**root**🔹 | <code>[Project](#projen-project)</code> | The root project.
**tasks**🔹 | <code>[tasks.Tasks](#projen-tasks-tasks)</code> | <span></span>
**devContainer**?🔹 | <code>[vscode.DevContainer](#projen-vscode-devcontainer)</code> | Access for .devcontainer.json (used for GitHub Codespaces).<br/>__*Optional*__
**github**?🔹 | <code>[github.GitHub](#projen-github-github)</code> | Access all github components.<br/>__*Optional*__
**gitpod**?🔹 | <code>[Gitpod](#projen-gitpod)</code> | Access for Gitpod.<br/>__*Optional*__
**jsiiFqn**?🔹 | <code>string</code> | The JSII FQN of the project type (if known).<br/>__*Optional*__
**parent**?🔹 | <code>[Project](#projen-project)</code> | A parent project.<br/>__*Optional*__
**vscode**?🔹 | <code>[vscode.VsCode](#projen-vscode-vscode)</code> | Access all VSCode components.<br/>__*Optional*__
*static* **DEFAULT_TASK**🔹 | <code>string</code> | The name of the default task (the task executed when `projen` is run without arguments).

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
* **props** (<code>[tasks.TaskOptions](#projen-tasks-taskoptions)</code>)  Task properties.
  * **category** (<code>[tasks.TaskCategory](#projen-tasks-taskcategory)</code>)  Category for start menu. __*Default*__: TaskCategory.MISC
  * **condition** (<code>string</code>)  A shell command which determines if the this task should be executed. __*Optional*__
  * **cwd** (<code>string</code>)  The working directory for all steps in this task (unless overridden by the step). __*Default*__: process.cwd()
  * **description** (<code>string</code>)  The description of this build command. __*Default*__: the task name
  * **env** (<code>Map<string, string></code>)  Defines environment variables for the execution of this task. __*Default*__: {}
  * **exec** (<code>string</code>)  Shell command to execute as the first command of the task. __*Default*__: add steps using `task.exec(command)` or `task.spawn(subtask)`

__Returns__:
* <code>[tasks.Task](#projen-tasks-task)</code>

#### addTip(message)⚠️ <a id="projen-project-addtip"></a>

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
4. Synthesize all components of this project
5. Call "postSynthesize()" for all components of this project
6. Call "this.postSynthesize()"

```ts
synth(): void
```





#### tryFindFile(filePath)🔹 <a id="projen-project-tryfindfile"></a>

Finds a file at the specified relative path within this project and all its subprojects.

```ts
tryFindFile(filePath: string): FileBase
```

* **filePath** (<code>string</code>)  The file path.

__Returns__:
* <code>[FileBase](#projen-filebase)</code>

#### tryFindJsonFile(filePath)⚠️ <a id="projen-project-tryfindjsonfile"></a>

Finds a json file by name.

```ts
tryFindJsonFile(filePath: string): JsonFile
```

* **filePath** (<code>string</code>)  The file path.

__Returns__:
* <code>[JsonFile](#projen-jsonfile)</code>

#### tryFindObjectFile(filePath)🔹 <a id="projen-project-tryfindobjectfile"></a>

Finds an object file (like JsonFile, YamlFile, etc.) by name.

```ts
tryFindObjectFile(filePath: string): ObjectFile
```

* **filePath** (<code>string</code>)  The file path.

__Returns__:
* <code>[ObjectFile](#projen-objectfile)</code>



## class Publisher 🔹 <a id="projen-publisher"></a>

Implements GitHub jobs for publishing modules to package managers.

kw
Under the hood, it uses https://github.com/aws/jsii-release

__Extends__: [Component](#projen-component)

### Initializer




```ts
new Publisher(project: Project, options: PublisherOptions)
```

* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **options** (<code>[PublisherOptions](#projen-publisheroptions)</code>)  *No description*
  * **artifactName** (<code>string</code>)  The name of the artifact to download (e.g. `dist`). 
  * **buildJobId** (<code>string</code>)  The job ID that produces the build artifacts. 
  * **workflow** (<code>[github.GithubWorkflow](#projen-github-githubworkflow)</code>)  The github workflow to add release jobs to. 
  * **jsiiReleaseVersion** (<code>string</code>)  Version requirement for `jsii-release`. __*Default*__: "latest"



### Properties


Name | Type | Description 
-----|------|-------------
**artifactName**🔹 | <code>string</code> | <span></span>
**buildJobId**🔹 | <code>string</code> | <span></span>
**jsiiReleaseVersion**🔹 | <code>string</code> | <span></span>
**workflow**🔹 | <code>[github.GithubWorkflow](#projen-github-githubworkflow)</code> | <span></span>

### Methods


#### publishToGo(options)🔹 <a id="projen-publisher-publishtogo"></a>

Adds a go publishing job.

```ts
publishToGo(options: JsiiReleaseGo): void
```

* **options** (<code>[JsiiReleaseGo](#projen-jsiireleasego)</code>)  Options.
  * **gitBranch** (<code>string</code>)  Branch to push to. __*Default*__: "main"
  * **gitCommitMessage** (<code>string</code>)  The commit message. __*Default*__: "chore(release): $VERSION"
  * **githubRepo** (<code>string</code>)  GitHub repository to push to. __*Default*__: derived from `moduleName`
  * **githubTokenSecret** (<code>string</code>)  The name of the secret that includes a personal GitHub access token used to push to the GitHub repository. __*Default*__: "GO_GITHUB_TOKEN"
  * **gitUserEmail** (<code>string</code>)  The email to use in the release git commit. __*Default*__: "github-actions
  * **gitUserName** (<code>string</code>)  The user name to use for the release git commit. __*Default*__: "GitHub Actions"




#### publishToMaven(options)🔹 <a id="projen-publisher-publishtomaven"></a>

Publishes artifacts from `java/**` to Maven.

```ts
publishToMaven(options: JsiiReleaseMaven): void
```

* **options** (<code>[JsiiReleaseMaven](#projen-jsiireleasemaven)</code>)  Options.
  * **mavenGpgPrivateKeyPassphrase** (<code>string</code>)  GitHub secret name which contains the GPG private key or file that includes it. __*Default*__: "MAVEN_GPG_PRIVATE_KEY_PASSPHRASE"
  * **mavenGpgPrivateKeySecret** (<code>string</code>)  GitHub secret name which contains the GPG private key or file that includes it. __*Default*__: "MAVEN_GPG_PRIVATE_KEY"
  * **mavenPassword** (<code>string</code>)  GitHub secret name which contains the Password for maven repository. __*Default*__: "MAVEN_PASSWORD"
  * **mavenRepositoryUrl** (<code>string</code>)  Deployment repository when not deploying to Maven Central. __*Default*__: not set
  * **mavenServerId** (<code>string</code>)  Used in maven settings for credential lookup (e.g. use github when publishing to GitHub). __*Default*__: "ossrh" Defaults to Maven Central.
  * **mavenStagingProfileId** (<code>string</code>)  GitHub secret name which contains the Maven Central (sonatype) staging profile ID (e.g. 68a05363083174). Staging profile ID can be found in the URL of the "Releases" staging profile under "Staging Profiles" in https://oss.sonatype.org (e.g. https://oss.sonatype.org/#stagingProfiles;11a33451234521. __*Default*__: "MAVEN_STAGING_PROFILE_ID"
  * **mavenUsername** (<code>string</code>)  GitHub secret name which contains the Username for maven repository. __*Default*__: "MAVEN_USERNAME"




#### publishToNpm(options)🔹 <a id="projen-publisher-publishtonpm"></a>

Publishes artifacts from `js/**` to npm.

```ts
publishToNpm(options: JsiiReleaseNpm): void
```

* **options** (<code>[JsiiReleaseNpm](#projen-jsiireleasenpm)</code>)  Options.
  * **distTag** (<code>string</code>)  Tags can be used to provide an alias instead of version numbers. __*Default*__: "latest"
  * **npmTokenSecret** (<code>string</code>)  GitHub secret which contains the NPM token to use when publishing packages. __*Default*__: "NPM_TOKEN"
  * **registry** (<code>string</code>)  The domain name of the npm package registry. __*Default*__: "registry.npmjs.org"




#### publishToNuget(options)🔹 <a id="projen-publisher-publishtonuget"></a>

Publishes artifacts from `dotnet/**` to NuGet Gallary.

```ts
publishToNuget(options: JsiiReleaseNuget): void
```

* **options** (<code>[JsiiReleaseNuget](#projen-jsiireleasenuget)</code>)  Options.
  * **nugetApiKeySecret** (<code>string</code>)  GitHub secret which contains the API key for NuGet. __*Default*__: "NUGET_API_KEY"




#### publishToPyPi(options)🔹 <a id="projen-publisher-publishtopypi"></a>

Publishes wheel artifacts from `python` to PyPI.

```ts
publishToPyPi(options: JsiiReleasePyPi): void
```

* **options** (<code>[JsiiReleasePyPi](#projen-jsiireleasepypi)</code>)  Options.
  * **twinePasswordSecret** (<code>string</code>)  The GitHub secret which contains PyPI password. __*Default*__: "TWINE_PASSWORD"
  * **twineRegistryUrl** (<code>string</code>)  The registry url to use when releasing packages. __*Default*__: twine default
  * **twineUsernameSecret** (<code>string</code>)  The GitHub secret which contains PyPI user name. __*Default*__: "TWINE_USERNAME"






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







## class SampleReadme 🔹 <a id="projen-samplereadme"></a>

Represents a README.md sample file. You are expected to manage this file after creation.

__Extends__: [SampleFile](#projen-samplefile)

### Initializer




```ts
new SampleReadme(project: Project, props?: SampleReadmeProps)
```

* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **props** (<code>[SampleReadmeProps](#projen-samplereadmeprops)</code>)  *No description*
  * **contents** (<code>string</code>)  The contents. __*Default*__: "# replace this"
  * **filename** (<code>string</code>)  The name of the README.md file. __*Default*__: "README.md"




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
  * **executable** (<code>boolean</code>)  Whether the generated file should be marked as executable. __*Default*__: false
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

Represents a TOML file.

__Implements__: [IMarkableFile](#projen-imarkablefile)
__Extends__: [ObjectFile](#projen-objectfile)

### Initializer




```ts
new TomlFile(project: Project, filePath: string, options: TomlFileOptions)
```

* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **filePath** (<code>string</code>)  *No description*
* **options** (<code>[TomlFileOptions](#projen-tomlfileoptions)</code>)  *No description*
  * **committed** (<code>boolean</code>)  Indicates whether this file should be committed to git or ignored. __*Default*__: true
  * **editGitignore** (<code>boolean</code>)  Update the project's .gitignore file. __*Default*__: true
  * **executable** (<code>boolean</code>)  Whether the generated file should be marked as executable. __*Default*__: false
  * **readonly** (<code>boolean</code>)  Whether the generated file should be readonly. __*Default*__: true
  * **marker** (<code>boolean</code>)  Adds the projen marker to the file. __*Default*__: false
  * **obj** (<code>any</code>)  The object that will be serialized. __*Default*__: {} an empty object (use `file.obj` to mutate).
  * **omitEmpty** (<code>boolean</code>)  Omits empty objects and arrays. __*Default*__: false


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
  * **name** (<code>string</code>)  This is the name of your project. 
  * **clobber** (<code>boolean</code>)  Add a `clobber` task which resets the repo to origin. __*Default*__: true
  * **devContainer** (<code>boolean</code>)  Add a VSCode development environment (used for GitHub Codespaces). __*Default*__: false
  * **gitpod** (<code>boolean</code>)  Add a Gitpod development environment. __*Default*__: false
  * **jsiiFqn** (<code>string</code>)  The JSII FQN (fully qualified name) of the project class. __*Default*__: undefined
  * **logging** (<code>[LoggerOptions](#projen-loggeroptions)</code>)  Configure logging options such as verbosity. __*Default*__: {}
  * **outdir** (<code>string</code>)  The root directory of the project. __*Default*__: "."
  * **parent** (<code>[Project](#projen-project)</code>)  The parent project, if this project is part of a bigger project. __*Optional*__
  * **projectType** (<code>[ProjectType](#projen-projecttype)</code>)  Which type of project this is (library/app). __*Default*__: ProjectType.UNKNOWN
  * **readme** (<code>[SampleReadmeProps](#projen-samplereadmeprops)</code>)  The README setup. __*Default*__: { filename: 'README.md', contents: '# replace this' }
  * **allowLibraryDependencies** (<code>boolean</code>)  Allow the project to include `peerDependencies` and `bundledDependencies`. __*Default*__: true
  * **authorEmail** (<code>string</code>)  Author's e-mail. __*Optional*__
  * **authorName** (<code>string</code>)  Author's name. __*Optional*__
  * **authorOrganization** (<code>boolean</code>)  Author's Organization. __*Optional*__
  * **authorUrl** (<code>string</code>)  Author's URL / Website. __*Optional*__
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. __*Default*__: true
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. __*Optional*__
  * **bundledDeps** (<code>Array<string></code>)  List of dependencies to bundle into this module. __*Optional*__
  * **deps** (<code>Array<string></code>)  Runtime dependencies of this module. __*Default*__: []
  * **description** (<code>string</code>)  The description is just a string that helps people understand the purpose of the package. __*Optional*__
  * **devDeps** (<code>Array<string></code>)  Build dependencies for this module. __*Default*__: []
  * **entrypoint** (<code>string</code>)  Module entrypoint (`main` in `package.json`). __*Default*__: "lib/index.js"
  * **homepage** (<code>string</code>)  Package's Homepage / Website. __*Optional*__
  * **keywords** (<code>Array<string></code>)  Keywords to include in `package.json`. __*Optional*__
  * **license** (<code>string</code>)  License's SPDX identifier. __*Default*__: "Apache-2.0"
  * **licensed** (<code>boolean</code>)  Indicates if a license should be added. __*Default*__: true
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). __*Default*__: no max
  * **minNodeVersion** (<code>string</code>)  Minimum Node.js version to require via package.json `engines` (inclusive). __*Default*__: no "engines" specified
  * **npmAccess** (<code>[NpmAccess](#projen-npmaccess)</code>)  Access level of the npm package. __*Default*__: for scoped packages (e.g. `foo@bar`), the default is `NpmAccess.RESTRICTED`, for non-scoped packages, the default is `NpmAccess.PUBLIC`.
  * **npmDistTag** (<code>string</code>)  Tags can be used to provide an alias instead of version numbers. __*Default*__: "latest"
  * **npmRegistry** (<code>string</code>)  The host name of the npm registry to publish to. __*Optional*__
  * **npmRegistryUrl** (<code>string</code>)  The base URL of the npm package registry. __*Default*__: "https://registry.npmjs.org"
  * **npmTaskExecution** (<code>[NpmTaskExecution](#projen-npmtaskexecution)</code>)  Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz). __*Default*__: NpmTaskExecution.PROJEN
  * **packageManager** (<code>[NodePackageManager](#projen-nodepackagemanager)</code>)  The Node Package Manager used to execute scripts. __*Default*__: NodePackageManager.YARN
  * **packageName** (<code>string</code>)  The "name" in package.json. __*Default*__: defaults to project name
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  Options for `peerDeps`. __*Optional*__
  * **peerDeps** (<code>Array<string></code>)  Peer dependencies for this module. __*Default*__: []
  * **projenCommand** (<code>string</code>)  The shell command to use in order to run the projen CLI. __*Default*__: "npx projen"
  * **repository** (<code>string</code>)  The repository is the location where the actual code for your package lives. __*Optional*__
  * **repositoryDirectory** (<code>string</code>)  If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives. __*Optional*__
  * **scripts** (<code>Map<string, string></code>)  npm scripts to include. __*Default*__: {}
  * **stability** (<code>string</code>)  Package's Stability. __*Optional*__
  * **defaultReleaseBranch** (<code>string</code>)  The name of the main release branch. 
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files on git. __*Default*__: true
  * **artifactsDirectory** (<code>string</code>)  A directory which will contain artifacts to be published to npm. __*Default*__: "dist"
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. __*Default*__: true if not a subproject
  * **codeCov** (<code>boolean</code>)  Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret. __*Default*__: false
  * **codeCovTokenSecret** (<code>string</code>)  Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories. __*Default*__: if this option is not specified, only public repositories are supported
  * **copyrightOwner** (<code>string</code>)  License copyright owner. __*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. __*Default*__: current year
  * **dependabot** (<code>boolean</code>)  Include dependabot configuration. __*Default*__: true
  * **dependabotOptions** (<code>[github.DependabotOptions](#projen-github-dependabotoptions)</code>)  Options for dependabot. __*Default*__: default options
  * **gitignore** (<code>Array<string></code>)  Additional entries to .gitignore. __*Optional*__
  * **jest** (<code>boolean</code>)  Setup jest unit tests. __*Default*__: true
  * **jestOptions** (<code>[JestOptions](#projen-jestoptions)</code>)  Jest options. __*Default*__: default options
  * **jsiiReleaseVersion** (<code>string</code>)  Version requirement of `jsii-release` which is used to publish modules to npm. __*Default*__: "latest"
  * **mergify** (<code>boolean</code>)  Adds mergify configuration. __*Default*__: true
  * **mergifyAutoMergeLabel** (<code>string</code>)  Automatically merge PRs that build successfully and have this label. __*Default*__: "auto-merge"
  * **mergifyOptions** (<code>[github.MergifyOptions](#projen-github-mergifyoptions)</code>)  Options for mergify. __*Default*__: default options
  * **npmignore** (<code>Array<string></code>)  Additional entries to .npmignore. __*Optional*__
  * **npmignoreEnabled** (<code>boolean</code>)  Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs. __*Default*__: true
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. __*Default*__: true
  * **projenUpgradeAutoMerge** (<code>boolean</code>)  Automatically merge projen upgrade PRs when build passes. __*Default*__: "true" if mergify auto-merge is enabled (default)
  * **projenUpgradeSchedule** (<code>Array<string></code>)  Customize the projenUpgrade schedule in cron expression. __*Default*__: [ "0 6 * * *" ]
  * **projenUpgradeSecret** (<code>string</code>)  Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`). __*Default*__: no automatic projen upgrade pull requests
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. __*Default*__: Semver.latest()
  * **pullRequestTemplate** (<code>boolean</code>)  Include a GitHub pull request template. __*Default*__: true
  * **pullRequestTemplateContents** (<code>string</code>)  The contents of the pull request template. __*Default*__: default content
  * **rebuildBot** (<code>boolean</code>)  Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request. __*Default*__: true if not a subproject
  * **rebuildBotCommand** (<code>string</code>)  The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch. __*Default*__: "rebuild"
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. __*Default*__: [ "main" ]
  * **releaseEveryCommit** (<code>boolean</code>)  Automatically release new versions every commit to one of branches in `releaseBranches`. __*Default*__: true
  * **releaseSchedule** (<code>string</code>)  CRON schedule to trigger new releases. __*Default*__: no scheduled releases
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. __*Default*__: false
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "main" when new versions are bumped. __*Default*__: true if not a subproject
  * **workflowBootstrapSteps** (<code>Array<any></code>)  Workflow steps to use in order to bootstrap this repo. __*Default*__: "yarn install --frozen-lockfile && yarn projen"
  * **workflowContainerImage** (<code>string</code>)  Container image to use for GitHub workflows. __*Default*__: default image
  * **workflowNodeVersion** (<code>string</code>)  The node version to use in GitHub workflows. __*Default*__: same as `minNodeVersion`
  * **compileBeforeTest** (<code>boolean</code>)  Compile the code before running tests. __*Default*__: if `testdir` is under `src/**`, the default is `true`, otherwise the default is `false.
  * **disableTsconfig** (<code>boolean</code>)  Do not generate a `tsconfig.json` file (used by jsii projects since tsconfig.json is generated by the jsii compiler). __*Default*__: false
  * **docgen** (<code>boolean</code>)  Docgen by Typedoc. __*Default*__: false
  * **docsDirectory** (<code>string</code>)  Docs directory. __*Default*__: "docs"
  * **entrypointTypes** (<code>string</code>)  The .d.ts file that includes the type declarations for this module. __*Default*__: .d.ts file derived from the project's entrypoint (usually lib/index.d.ts)
  * **eslint** (<code>boolean</code>)  Setup eslint. __*Default*__: true
  * **eslintOptions** (<code>[EslintOptions](#projen-eslintoptions)</code>)  Eslint options. __*Default*__: opinionated default options
  * **libdir** (<code>string</code>)  Typescript  artifacts output directory. __*Default*__: "lib"
  * **package** (<code>boolean</code>)  Defines a `yarn package` command that will produce a tarball and place it under `dist/js`. __*Default*__: true
  * **sampleCode** (<code>boolean</code>)  Generate one-time sample in `src/` and `test/` if there are no files there. __*Default*__: true
  * **srcdir** (<code>string</code>)  Typescript sources directory. __*Default*__: "src"
  * **testdir** (<code>string</code>)  Jest tests directory. Tests files should be named `xxx.test.ts`. __*Default*__: "test"
  * **tsconfig** (<code>[TypescriptConfigOptions](#projen-typescriptconfigoptions)</code>)  Custom TSConfig. __*Optional*__
  * **typescriptVersion** (<code>string</code>)  TypeScript version to use. __*Default*__: "latest"




## class TypeScriptLibraryProject ⚠️ <a id="projen-typescriptlibraryproject"></a>



__Extends__: [TypeScriptProject](#projen-typescriptproject)

### Initializer




```ts
new TypeScriptLibraryProject(options: TypeScriptProjectOptions)
```

* **options** (<code>[TypeScriptProjectOptions](#projen-typescriptprojectoptions)</code>)  *No description*
  * **name** (<code>string</code>)  This is the name of your project. 
  * **clobber** (<code>boolean</code>)  Add a `clobber` task which resets the repo to origin. __*Default*__: true
  * **devContainer** (<code>boolean</code>)  Add a VSCode development environment (used for GitHub Codespaces). __*Default*__: false
  * **gitpod** (<code>boolean</code>)  Add a Gitpod development environment. __*Default*__: false
  * **jsiiFqn** (<code>string</code>)  The JSII FQN (fully qualified name) of the project class. __*Default*__: undefined
  * **logging** (<code>[LoggerOptions](#projen-loggeroptions)</code>)  Configure logging options such as verbosity. __*Default*__: {}
  * **outdir** (<code>string</code>)  The root directory of the project. __*Default*__: "."
  * **parent** (<code>[Project](#projen-project)</code>)  The parent project, if this project is part of a bigger project. __*Optional*__
  * **projectType** (<code>[ProjectType](#projen-projecttype)</code>)  Which type of project this is (library/app). __*Default*__: ProjectType.UNKNOWN
  * **readme** (<code>[SampleReadmeProps](#projen-samplereadmeprops)</code>)  The README setup. __*Default*__: { filename: 'README.md', contents: '# replace this' }
  * **allowLibraryDependencies** (<code>boolean</code>)  Allow the project to include `peerDependencies` and `bundledDependencies`. __*Default*__: true
  * **authorEmail** (<code>string</code>)  Author's e-mail. __*Optional*__
  * **authorName** (<code>string</code>)  Author's name. __*Optional*__
  * **authorOrganization** (<code>boolean</code>)  Author's Organization. __*Optional*__
  * **authorUrl** (<code>string</code>)  Author's URL / Website. __*Optional*__
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. __*Default*__: true
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. __*Optional*__
  * **bundledDeps** (<code>Array<string></code>)  List of dependencies to bundle into this module. __*Optional*__
  * **deps** (<code>Array<string></code>)  Runtime dependencies of this module. __*Default*__: []
  * **description** (<code>string</code>)  The description is just a string that helps people understand the purpose of the package. __*Optional*__
  * **devDeps** (<code>Array<string></code>)  Build dependencies for this module. __*Default*__: []
  * **entrypoint** (<code>string</code>)  Module entrypoint (`main` in `package.json`). __*Default*__: "lib/index.js"
  * **homepage** (<code>string</code>)  Package's Homepage / Website. __*Optional*__
  * **keywords** (<code>Array<string></code>)  Keywords to include in `package.json`. __*Optional*__
  * **license** (<code>string</code>)  License's SPDX identifier. __*Default*__: "Apache-2.0"
  * **licensed** (<code>boolean</code>)  Indicates if a license should be added. __*Default*__: true
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). __*Default*__: no max
  * **minNodeVersion** (<code>string</code>)  Minimum Node.js version to require via package.json `engines` (inclusive). __*Default*__: no "engines" specified
  * **npmAccess** (<code>[NpmAccess](#projen-npmaccess)</code>)  Access level of the npm package. __*Default*__: for scoped packages (e.g. `foo@bar`), the default is `NpmAccess.RESTRICTED`, for non-scoped packages, the default is `NpmAccess.PUBLIC`.
  * **npmDistTag** (<code>string</code>)  Tags can be used to provide an alias instead of version numbers. __*Default*__: "latest"
  * **npmRegistry** (<code>string</code>)  The host name of the npm registry to publish to. __*Optional*__
  * **npmRegistryUrl** (<code>string</code>)  The base URL of the npm package registry. __*Default*__: "https://registry.npmjs.org"
  * **npmTaskExecution** (<code>[NpmTaskExecution](#projen-npmtaskexecution)</code>)  Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz). __*Default*__: NpmTaskExecution.PROJEN
  * **packageManager** (<code>[NodePackageManager](#projen-nodepackagemanager)</code>)  The Node Package Manager used to execute scripts. __*Default*__: NodePackageManager.YARN
  * **packageName** (<code>string</code>)  The "name" in package.json. __*Default*__: defaults to project name
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  Options for `peerDeps`. __*Optional*__
  * **peerDeps** (<code>Array<string></code>)  Peer dependencies for this module. __*Default*__: []
  * **projenCommand** (<code>string</code>)  The shell command to use in order to run the projen CLI. __*Default*__: "npx projen"
  * **repository** (<code>string</code>)  The repository is the location where the actual code for your package lives. __*Optional*__
  * **repositoryDirectory** (<code>string</code>)  If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives. __*Optional*__
  * **scripts** (<code>Map<string, string></code>)  npm scripts to include. __*Default*__: {}
  * **stability** (<code>string</code>)  Package's Stability. __*Optional*__
  * **defaultReleaseBranch** (<code>string</code>)  The name of the main release branch. 
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files on git. __*Default*__: true
  * **artifactsDirectory** (<code>string</code>)  A directory which will contain artifacts to be published to npm. __*Default*__: "dist"
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. __*Default*__: true if not a subproject
  * **codeCov** (<code>boolean</code>)  Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret. __*Default*__: false
  * **codeCovTokenSecret** (<code>string</code>)  Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories. __*Default*__: if this option is not specified, only public repositories are supported
  * **copyrightOwner** (<code>string</code>)  License copyright owner. __*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. __*Default*__: current year
  * **dependabot** (<code>boolean</code>)  Include dependabot configuration. __*Default*__: true
  * **dependabotOptions** (<code>[github.DependabotOptions](#projen-github-dependabotoptions)</code>)  Options for dependabot. __*Default*__: default options
  * **gitignore** (<code>Array<string></code>)  Additional entries to .gitignore. __*Optional*__
  * **jest** (<code>boolean</code>)  Setup jest unit tests. __*Default*__: true
  * **jestOptions** (<code>[JestOptions](#projen-jestoptions)</code>)  Jest options. __*Default*__: default options
  * **jsiiReleaseVersion** (<code>string</code>)  Version requirement of `jsii-release` which is used to publish modules to npm. __*Default*__: "latest"
  * **mergify** (<code>boolean</code>)  Adds mergify configuration. __*Default*__: true
  * **mergifyAutoMergeLabel** (<code>string</code>)  Automatically merge PRs that build successfully and have this label. __*Default*__: "auto-merge"
  * **mergifyOptions** (<code>[github.MergifyOptions](#projen-github-mergifyoptions)</code>)  Options for mergify. __*Default*__: default options
  * **npmignore** (<code>Array<string></code>)  Additional entries to .npmignore. __*Optional*__
  * **npmignoreEnabled** (<code>boolean</code>)  Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs. __*Default*__: true
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. __*Default*__: true
  * **projenUpgradeAutoMerge** (<code>boolean</code>)  Automatically merge projen upgrade PRs when build passes. __*Default*__: "true" if mergify auto-merge is enabled (default)
  * **projenUpgradeSchedule** (<code>Array<string></code>)  Customize the projenUpgrade schedule in cron expression. __*Default*__: [ "0 6 * * *" ]
  * **projenUpgradeSecret** (<code>string</code>)  Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`). __*Default*__: no automatic projen upgrade pull requests
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. __*Default*__: Semver.latest()
  * **pullRequestTemplate** (<code>boolean</code>)  Include a GitHub pull request template. __*Default*__: true
  * **pullRequestTemplateContents** (<code>string</code>)  The contents of the pull request template. __*Default*__: default content
  * **rebuildBot** (<code>boolean</code>)  Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request. __*Default*__: true if not a subproject
  * **rebuildBotCommand** (<code>string</code>)  The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch. __*Default*__: "rebuild"
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. __*Default*__: [ "main" ]
  * **releaseEveryCommit** (<code>boolean</code>)  Automatically release new versions every commit to one of branches in `releaseBranches`. __*Default*__: true
  * **releaseSchedule** (<code>string</code>)  CRON schedule to trigger new releases. __*Default*__: no scheduled releases
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. __*Default*__: false
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "main" when new versions are bumped. __*Default*__: true if not a subproject
  * **workflowBootstrapSteps** (<code>Array<any></code>)  Workflow steps to use in order to bootstrap this repo. __*Default*__: "yarn install --frozen-lockfile && yarn projen"
  * **workflowContainerImage** (<code>string</code>)  Container image to use for GitHub workflows. __*Default*__: default image
  * **workflowNodeVersion** (<code>string</code>)  The node version to use in GitHub workflows. __*Default*__: same as `minNodeVersion`
  * **compileBeforeTest** (<code>boolean</code>)  Compile the code before running tests. __*Default*__: if `testdir` is under `src/**`, the default is `true`, otherwise the default is `false.
  * **disableTsconfig** (<code>boolean</code>)  Do not generate a `tsconfig.json` file (used by jsii projects since tsconfig.json is generated by the jsii compiler). __*Default*__: false
  * **docgen** (<code>boolean</code>)  Docgen by Typedoc. __*Default*__: false
  * **docsDirectory** (<code>string</code>)  Docs directory. __*Default*__: "docs"
  * **entrypointTypes** (<code>string</code>)  The .d.ts file that includes the type declarations for this module. __*Default*__: .d.ts file derived from the project's entrypoint (usually lib/index.d.ts)
  * **eslint** (<code>boolean</code>)  Setup eslint. __*Default*__: true
  * **eslintOptions** (<code>[EslintOptions](#projen-eslintoptions)</code>)  Eslint options. __*Default*__: opinionated default options
  * **libdir** (<code>string</code>)  Typescript  artifacts output directory. __*Default*__: "lib"
  * **package** (<code>boolean</code>)  Defines a `yarn package` command that will produce a tarball and place it under `dist/js`. __*Default*__: true
  * **sampleCode** (<code>boolean</code>)  Generate one-time sample in `src/` and `test/` if there are no files there. __*Default*__: true
  * **srcdir** (<code>string</code>)  Typescript sources directory. __*Default*__: "src"
  * **testdir** (<code>string</code>)  Jest tests directory. Tests files should be named `xxx.test.ts`. __*Default*__: "test"
  * **tsconfig** (<code>[TypescriptConfigOptions](#projen-typescriptconfigoptions)</code>)  Custom TSConfig. __*Optional*__
  * **typescriptVersion** (<code>string</code>)  TypeScript version to use. __*Default*__: "latest"




## class TypeScriptProject 🔹 <a id="projen-typescriptproject"></a>

TypeScript project.

__Extends__: [NodeProject](#projen-nodeproject)

### Initializer




```ts
new TypeScriptProject(options: TypeScriptProjectOptions)
```

* **options** (<code>[TypeScriptProjectOptions](#projen-typescriptprojectoptions)</code>)  *No description*
  * **name** (<code>string</code>)  This is the name of your project. 
  * **clobber** (<code>boolean</code>)  Add a `clobber` task which resets the repo to origin. __*Default*__: true
  * **devContainer** (<code>boolean</code>)  Add a VSCode development environment (used for GitHub Codespaces). __*Default*__: false
  * **gitpod** (<code>boolean</code>)  Add a Gitpod development environment. __*Default*__: false
  * **jsiiFqn** (<code>string</code>)  The JSII FQN (fully qualified name) of the project class. __*Default*__: undefined
  * **logging** (<code>[LoggerOptions](#projen-loggeroptions)</code>)  Configure logging options such as verbosity. __*Default*__: {}
  * **outdir** (<code>string</code>)  The root directory of the project. __*Default*__: "."
  * **parent** (<code>[Project](#projen-project)</code>)  The parent project, if this project is part of a bigger project. __*Optional*__
  * **projectType** (<code>[ProjectType](#projen-projecttype)</code>)  Which type of project this is (library/app). __*Default*__: ProjectType.UNKNOWN
  * **readme** (<code>[SampleReadmeProps](#projen-samplereadmeprops)</code>)  The README setup. __*Default*__: { filename: 'README.md', contents: '# replace this' }
  * **allowLibraryDependencies** (<code>boolean</code>)  Allow the project to include `peerDependencies` and `bundledDependencies`. __*Default*__: true
  * **authorEmail** (<code>string</code>)  Author's e-mail. __*Optional*__
  * **authorName** (<code>string</code>)  Author's name. __*Optional*__
  * **authorOrganization** (<code>boolean</code>)  Author's Organization. __*Optional*__
  * **authorUrl** (<code>string</code>)  Author's URL / Website. __*Optional*__
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. __*Default*__: true
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. __*Optional*__
  * **bundledDeps** (<code>Array<string></code>)  List of dependencies to bundle into this module. __*Optional*__
  * **deps** (<code>Array<string></code>)  Runtime dependencies of this module. __*Default*__: []
  * **description** (<code>string</code>)  The description is just a string that helps people understand the purpose of the package. __*Optional*__
  * **devDeps** (<code>Array<string></code>)  Build dependencies for this module. __*Default*__: []
  * **entrypoint** (<code>string</code>)  Module entrypoint (`main` in `package.json`). __*Default*__: "lib/index.js"
  * **homepage** (<code>string</code>)  Package's Homepage / Website. __*Optional*__
  * **keywords** (<code>Array<string></code>)  Keywords to include in `package.json`. __*Optional*__
  * **license** (<code>string</code>)  License's SPDX identifier. __*Default*__: "Apache-2.0"
  * **licensed** (<code>boolean</code>)  Indicates if a license should be added. __*Default*__: true
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). __*Default*__: no max
  * **minNodeVersion** (<code>string</code>)  Minimum Node.js version to require via package.json `engines` (inclusive). __*Default*__: no "engines" specified
  * **npmAccess** (<code>[NpmAccess](#projen-npmaccess)</code>)  Access level of the npm package. __*Default*__: for scoped packages (e.g. `foo@bar`), the default is `NpmAccess.RESTRICTED`, for non-scoped packages, the default is `NpmAccess.PUBLIC`.
  * **npmDistTag** (<code>string</code>)  Tags can be used to provide an alias instead of version numbers. __*Default*__: "latest"
  * **npmRegistry** (<code>string</code>)  The host name of the npm registry to publish to. __*Optional*__
  * **npmRegistryUrl** (<code>string</code>)  The base URL of the npm package registry. __*Default*__: "https://registry.npmjs.org"
  * **npmTaskExecution** (<code>[NpmTaskExecution](#projen-npmtaskexecution)</code>)  Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz). __*Default*__: NpmTaskExecution.PROJEN
  * **packageManager** (<code>[NodePackageManager](#projen-nodepackagemanager)</code>)  The Node Package Manager used to execute scripts. __*Default*__: NodePackageManager.YARN
  * **packageName** (<code>string</code>)  The "name" in package.json. __*Default*__: defaults to project name
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  Options for `peerDeps`. __*Optional*__
  * **peerDeps** (<code>Array<string></code>)  Peer dependencies for this module. __*Default*__: []
  * **projenCommand** (<code>string</code>)  The shell command to use in order to run the projen CLI. __*Default*__: "npx projen"
  * **repository** (<code>string</code>)  The repository is the location where the actual code for your package lives. __*Optional*__
  * **repositoryDirectory** (<code>string</code>)  If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives. __*Optional*__
  * **scripts** (<code>Map<string, string></code>)  npm scripts to include. __*Default*__: {}
  * **stability** (<code>string</code>)  Package's Stability. __*Optional*__
  * **defaultReleaseBranch** (<code>string</code>)  The name of the main release branch. 
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files on git. __*Default*__: true
  * **artifactsDirectory** (<code>string</code>)  A directory which will contain artifacts to be published to npm. __*Default*__: "dist"
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. __*Default*__: true if not a subproject
  * **codeCov** (<code>boolean</code>)  Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret. __*Default*__: false
  * **codeCovTokenSecret** (<code>string</code>)  Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories. __*Default*__: if this option is not specified, only public repositories are supported
  * **copyrightOwner** (<code>string</code>)  License copyright owner. __*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. __*Default*__: current year
  * **dependabot** (<code>boolean</code>)  Include dependabot configuration. __*Default*__: true
  * **dependabotOptions** (<code>[github.DependabotOptions](#projen-github-dependabotoptions)</code>)  Options for dependabot. __*Default*__: default options
  * **gitignore** (<code>Array<string></code>)  Additional entries to .gitignore. __*Optional*__
  * **jest** (<code>boolean</code>)  Setup jest unit tests. __*Default*__: true
  * **jestOptions** (<code>[JestOptions](#projen-jestoptions)</code>)  Jest options. __*Default*__: default options
  * **jsiiReleaseVersion** (<code>string</code>)  Version requirement of `jsii-release` which is used to publish modules to npm. __*Default*__: "latest"
  * **mergify** (<code>boolean</code>)  Adds mergify configuration. __*Default*__: true
  * **mergifyAutoMergeLabel** (<code>string</code>)  Automatically merge PRs that build successfully and have this label. __*Default*__: "auto-merge"
  * **mergifyOptions** (<code>[github.MergifyOptions](#projen-github-mergifyoptions)</code>)  Options for mergify. __*Default*__: default options
  * **npmignore** (<code>Array<string></code>)  Additional entries to .npmignore. __*Optional*__
  * **npmignoreEnabled** (<code>boolean</code>)  Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs. __*Default*__: true
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. __*Default*__: true
  * **projenUpgradeAutoMerge** (<code>boolean</code>)  Automatically merge projen upgrade PRs when build passes. __*Default*__: "true" if mergify auto-merge is enabled (default)
  * **projenUpgradeSchedule** (<code>Array<string></code>)  Customize the projenUpgrade schedule in cron expression. __*Default*__: [ "0 6 * * *" ]
  * **projenUpgradeSecret** (<code>string</code>)  Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`). __*Default*__: no automatic projen upgrade pull requests
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. __*Default*__: Semver.latest()
  * **pullRequestTemplate** (<code>boolean</code>)  Include a GitHub pull request template. __*Default*__: true
  * **pullRequestTemplateContents** (<code>string</code>)  The contents of the pull request template. __*Default*__: default content
  * **rebuildBot** (<code>boolean</code>)  Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request. __*Default*__: true if not a subproject
  * **rebuildBotCommand** (<code>string</code>)  The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch. __*Default*__: "rebuild"
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. __*Default*__: [ "main" ]
  * **releaseEveryCommit** (<code>boolean</code>)  Automatically release new versions every commit to one of branches in `releaseBranches`. __*Default*__: true
  * **releaseSchedule** (<code>string</code>)  CRON schedule to trigger new releases. __*Default*__: no scheduled releases
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. __*Default*__: false
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "main" when new versions are bumped. __*Default*__: true if not a subproject
  * **workflowBootstrapSteps** (<code>Array<any></code>)  Workflow steps to use in order to bootstrap this repo. __*Default*__: "yarn install --frozen-lockfile && yarn projen"
  * **workflowContainerImage** (<code>string</code>)  Container image to use for GitHub workflows. __*Default*__: default image
  * **workflowNodeVersion** (<code>string</code>)  The node version to use in GitHub workflows. __*Default*__: same as `minNodeVersion`
  * **compileBeforeTest** (<code>boolean</code>)  Compile the code before running tests. __*Default*__: if `testdir` is under `src/**`, the default is `true`, otherwise the default is `false.
  * **disableTsconfig** (<code>boolean</code>)  Do not generate a `tsconfig.json` file (used by jsii projects since tsconfig.json is generated by the jsii compiler). __*Default*__: false
  * **docgen** (<code>boolean</code>)  Docgen by Typedoc. __*Default*__: false
  * **docsDirectory** (<code>string</code>)  Docs directory. __*Default*__: "docs"
  * **entrypointTypes** (<code>string</code>)  The .d.ts file that includes the type declarations for this module. __*Default*__: .d.ts file derived from the project's entrypoint (usually lib/index.d.ts)
  * **eslint** (<code>boolean</code>)  Setup eslint. __*Default*__: true
  * **eslintOptions** (<code>[EslintOptions](#projen-eslintoptions)</code>)  Eslint options. __*Default*__: opinionated default options
  * **libdir** (<code>string</code>)  Typescript  artifacts output directory. __*Default*__: "lib"
  * **package** (<code>boolean</code>)  Defines a `yarn package` command that will produce a tarball and place it under `dist/js`. __*Default*__: true
  * **sampleCode** (<code>boolean</code>)  Generate one-time sample in `src/` and `test/` if there are no files there. __*Default*__: true
  * **srcdir** (<code>string</code>)  Typescript sources directory. __*Default*__: "src"
  * **testdir** (<code>string</code>)  Jest tests directory. Tests files should be named `xxx.test.ts`. __*Default*__: "test"
  * **tsconfig** (<code>[TypescriptConfigOptions](#projen-typescriptconfigoptions)</code>)  Custom TSConfig. __*Optional*__
  * **typescriptVersion** (<code>string</code>)  TypeScript version to use. __*Default*__: "latest"



### Properties


Name | Type | Description 
-----|------|-------------
**docsDirectory**🔹 | <code>string</code> | <span></span>
**libdir**🔹 | <code>string</code> | The directory in which compiled .js files reside.
**srcdir**🔹 | <code>string</code> | The directory in which the .ts sources reside.
**testdir**🔹 | <code>string</code> | The directory in which tests reside.
**watchTask**🔹 | <code>[tasks.Task](#projen-tasks-task)</code> | The "watch" task.
**docgen**?🔹 | <code>boolean</code> | __*Optional*__
**eslint**?🔹 | <code>[Eslint](#projen-eslint)</code> | __*Optional*__
**packageTask**?🔹 | <code>[tasks.Task](#projen-tasks-task)</code> | The "package" task (or undefined if `package` is set to `false`).<br/>__*Optional*__
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
**bumpTask**🔹 | <code>[tasks.Task](#projen-tasks-task)</code> | <span></span>
**currentVersion**🔹 | <code>any</code> | Returns the current version of the project.



## class XmlFile 🔹 <a id="projen-xmlfile"></a>

Represents an XML file.

Objects passed in will be synthesized using the npm "xml" library.

__Implements__: [IMarkableFile](#projen-imarkablefile)
__Extends__: [ObjectFile](#projen-objectfile)

### Initializer




```ts
new XmlFile(project: Project, filePath: string, options?: XmlFileOptions)
```

* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **filePath** (<code>string</code>)  *No description*
* **options** (<code>[XmlFileOptions](#projen-xmlfileoptions)</code>)  *No description*
  * **committed** (<code>boolean</code>)  Indicates whether this file should be committed to git or ignored. __*Default*__: true
  * **editGitignore** (<code>boolean</code>)  Update the project's .gitignore file. __*Default*__: true
  * **executable** (<code>boolean</code>)  Whether the generated file should be marked as executable. __*Default*__: false
  * **readonly** (<code>boolean</code>)  Whether the generated file should be readonly. __*Default*__: true
  * **marker** (<code>boolean</code>)  Adds the projen marker to the file. __*Default*__: false
  * **obj** (<code>any</code>)  The object that will be serialized. __*Default*__: {} an empty object (use `file.obj` to mutate).
  * **omitEmpty** (<code>boolean</code>)  Omits empty objects and arrays. __*Default*__: false


### Methods


#### protected synthesizeContent(resolver)🔹 <a id="projen-xmlfile-synthesizecontent"></a>

Implemented by derived classes and returns the contents of the file to emit.

```ts
protected synthesizeContent(resolver: IResolver): string
```

* **resolver** (<code>[IResolver](#projen-iresolver)</code>)  *No description*

__Returns__:
* <code>string</code>



## class YamlFile 🔹 <a id="projen-yamlfile"></a>

Represents a YAML file.

__Implements__: [IMarkableFile](#projen-imarkablefile)
__Extends__: [ObjectFile](#projen-objectfile)

### Initializer




```ts
new YamlFile(project: Project, filePath: string, options: YamlFileOptions)
```

* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **filePath** (<code>string</code>)  *No description*
* **options** (<code>[YamlFileOptions](#projen-yamlfileoptions)</code>)  *No description*
  * **committed** (<code>boolean</code>)  Indicates whether this file should be committed to git or ignored. __*Default*__: true
  * **editGitignore** (<code>boolean</code>)  Update the project's .gitignore file. __*Default*__: true
  * **executable** (<code>boolean</code>)  Whether the generated file should be marked as executable. __*Default*__: false
  * **readonly** (<code>boolean</code>)  Whether the generated file should be readonly. __*Default*__: true
  * **marker** (<code>boolean</code>)  Adds the projen marker to the file. __*Default*__: false
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



## class Dependencies 🔹 <a id="projen-deps-dependencies"></a>

The `Dependencies` component is responsible to track the list of dependencies a project has, and then used by project types as the model for rendering project-specific dependency manifests such as the dependencies section `package.json` files.

To add a dependency you can use a project-type specific API such as
`nodeProject.addDeps()` or use the generic API of `project.deps`:

__Submodule__: deps

__Extends__: [Component](#projen-component)

### Initializer


Adds a dependencies component to the project.

```ts
new deps.Dependencies(project: Project)
```

* **project** (<code>[Project](#projen-project)</code>)  The parent project.



### Properties


Name | Type | Description 
-----|------|-------------
**all**🔹 | <code>Array<[deps.Dependency](#projen-deps-dependency)></code> | A copy of all dependencies recorded for this project.
*static* **MANIFEST_FILE**🔹 | <code>string</code> | The project-relative path of the deps manifest file.

### Methods


#### addDependency(spec, type, metadata?)🔹 <a id="projen-deps-dependencies-adddependency"></a>

Adds a dependency to this project.

```ts
addDependency(spec: string, type: DependencyType, metadata?: Map<string, any>): Dependency
```

* **spec** (<code>string</code>)  The dependency spec in the format `MODULE[@VERSION]` where `MODULE` is the package-manager-specific module name and `VERSION` is an optional semantic version requirement (e.g. `^3.4.0`).
* **type** (<code>[deps.DependencyType](#projen-deps-dependencytype)</code>)  The type of the dependency.
* **metadata** (<code>Map<string, any></code>)  *No description*

__Returns__:
* <code>[deps.Dependency](#projen-deps-dependency)</code>

#### getDependency(name, type?)🔹 <a id="projen-deps-dependencies-getdependency"></a>

Returns a dependency by name.

Fails if there is no dependency defined by that name or if `type` is not
provided and there is more then one dependency type for this dependency.

```ts
getDependency(name: string, type?: DependencyType): Dependency
```

* **name** (<code>string</code>)  The name of the dependency.
* **type** (<code>[deps.DependencyType](#projen-deps-dependencytype)</code>)  The dependency type.

__Returns__:
* <code>[deps.Dependency](#projen-deps-dependency)</code>

#### removeDependency(name, type?)🔹 <a id="projen-deps-dependencies-removedependency"></a>

Removes a dependency.

```ts
removeDependency(name: string, type?: DependencyType): void
```

* **name** (<code>string</code>)  The name of the module to remove (without the version).
* **type** (<code>[deps.DependencyType](#projen-deps-dependencytype)</code>)  The dependency type.




#### *static* parseDependency(spec)🔹 <a id="projen-deps-dependencies-parsedependency"></a>

Returns the coordinates of a dependency spec.

Given `foo@^3.4.0` returns `{ name: "foo", version: "^3.4.0" }`.
Given `bar@npm:@bar/legacy` returns `{ name: "bar", version: "npm:@bar/legacy" }`.

```ts
static parseDependency(spec: string): DependencyCoordinates
```

* **spec** (<code>string</code>)  *No description*

__Returns__:
* <code>[deps.DependencyCoordinates](#projen-deps-dependencycoordinates)</code>



## class AutoMerge 🔹 <a id="projen-github-automerge"></a>

Sets up mergify to merging approved pull requests.

If `buildJob` is specified, the specified GitHub workflow job ID is required
to succeed in order for the PR to be merged.

`approvedReviews` specified the number of code review approvals required for
the PR to be merged.

__Submodule__: github

__Extends__: [Component](#projen-component)

### Initializer




```ts
new github.AutoMerge(project: Project, options?: AutoMergeOptions)
```

* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **options** (<code>[github.AutoMergeOptions](#projen-github-automergeoptions)</code>)  *No description*
  * **approvedReviews** (<code>number</code>)  Number of approved code reviews. __*Default*__: 1
  * **autoMergeLabel** (<code>string</code>)  Automatically merge PRs that build successfully and have this label. __*Default*__: "auto-merge"
  * **buildJob** (<code>string</code>)  The GitHub job ID of the build workflow. __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**autoMergeLabel**🔹 | <code>string</code> | <span></span>



## class Dependabot 🔹 <a id="projen-github-dependabot"></a>

Defines dependabot configuration for node projects.

Since module versions are managed in projen, the versioning strategy will be
configured to "lockfile-only" which means that only updates that can be done
on the lockfile itself will be proposed.

__Submodule__: github

__Extends__: [Component](#projen-component)

### Initializer




```ts
new github.Dependabot(github: GitHub, options?: DependabotOptions)
```

* **github** (<code>[github.GitHub](#projen-github-github)</code>)  *No description*
* **options** (<code>[github.DependabotOptions](#projen-github-dependabotoptions)</code>)  *No description*
  * **autoMerge** (<code>boolean</code>)  Automatically merge dependabot PRs if build CI build passes. __*Default*__: true
  * **ignore** (<code>Array<[github.DependabotIgnore](#projen-github-dependabotignore)></code>)  You can use the `ignore` option to customize which dependencies are updated. __*Default*__: []
  * **ignoreProjen** (<code>boolean</code>)  Ignores updates to `projen`. __*Default*__: true
  * **scheduleInterval** (<code>[github.DependabotScheduleInterval](#projen-github-dependabotscheduleinterval)</code>)  How often to check for new versions and raise pull requests. __*Default*__: ScheduleInterval.DAILY
  * **versioningStrategy** (<code>[github.VersioningStrategy](#projen-github-versioningstrategy)</code>)  The strategy to use when edits manifest and lock files. __*Default*__: VersioningStrategy.LOCKFILE_ONLY The default is to only update the lock file because package.json is controlled by projen and any outside updates will fail the build.



### Properties


Name | Type | Description 
-----|------|-------------
**config**🔹 | <code>any</code> | The raw dependabot configuration.

### Methods


#### addIgnore(dependencyName, ...versions)🔹 <a id="projen-github-dependabot-addignore"></a>

Ignores a dependency from automatic updates.

```ts
addIgnore(dependencyName: string, ...versions: string[]): void
```

* **dependencyName** (<code>string</code>)  Use to ignore updates for dependencies with matching names, optionally using `*` to match zero or more characters.
* **versions** (<code>string</code>)  Use to ignore specific versions or ranges of versions.






## class GitHub 🔹 <a id="projen-github-github"></a>



__Submodule__: github

__Extends__: [Component](#projen-component)

### Initializer




```ts
new github.GitHub(project: Project)
```

* **project** (<code>[Project](#projen-project)</code>)  *No description*


### Methods


#### addDependabot(options?)🔹 <a id="projen-github-github-adddependabot"></a>



```ts
addDependabot(options?: DependabotOptions): Dependabot
```

* **options** (<code>[github.DependabotOptions](#projen-github-dependabotoptions)</code>)  *No description*
  * **autoMerge** (<code>boolean</code>)  Automatically merge dependabot PRs if build CI build passes. __*Default*__: true
  * **ignore** (<code>Array<[github.DependabotIgnore](#projen-github-dependabotignore)></code>)  You can use the `ignore` option to customize which dependencies are updated. __*Default*__: []
  * **ignoreProjen** (<code>boolean</code>)  Ignores updates to `projen`. __*Default*__: true
  * **scheduleInterval** (<code>[github.DependabotScheduleInterval](#projen-github-dependabotscheduleinterval)</code>)  How often to check for new versions and raise pull requests. __*Default*__: ScheduleInterval.DAILY
  * **versioningStrategy** (<code>[github.VersioningStrategy](#projen-github-versioningstrategy)</code>)  The strategy to use when edits manifest and lock files. __*Default*__: VersioningStrategy.LOCKFILE_ONLY The default is to only update the lock file because package.json is controlled by projen and any outside updates will fail the build.

__Returns__:
* <code>[github.Dependabot](#projen-github-dependabot)</code>

#### addMergifyRules(...rules)🔹 <a id="projen-github-github-addmergifyrules"></a>



```ts
addMergifyRules(...rules: MergifyRule[]): void
```

* **rules** (<code>[github.MergifyRule](#projen-github-mergifyrule)</code>)  *No description*
  * **actions** (<code>Map<string, any></code>)  *No description* 
  * **conditions** (<code>Array<string></code>)  *No description* 
  * **name** (<code>string</code>)  *No description* 




#### addPullRequestTemplate(...content)🔹 <a id="projen-github-github-addpullrequesttemplate"></a>



```ts
addPullRequestTemplate(...content: string[]): PullRequestTemplate
```

* **content** (<code>string</code>)  *No description*

__Returns__:
* <code>[github.PullRequestTemplate](#projen-github-pullrequesttemplate)</code>

#### addWorkflow(name)🔹 <a id="projen-github-github-addworkflow"></a>



```ts
addWorkflow(name: string): GithubWorkflow
```

* **name** (<code>string</code>)  *No description*

__Returns__:
* <code>[github.GithubWorkflow](#projen-github-githubworkflow)</code>



## class GithubWorkflow 🔹 <a id="projen-github-githubworkflow"></a>



__Submodule__: github

__Extends__: [Component](#projen-component)

### Initializer




```ts
new github.GithubWorkflow(github: GitHub, name: string)
```

* **github** (<code>[github.GitHub](#projen-github-github)</code>)  *No description*
* **name** (<code>string</code>)  *No description*



### Properties


Name | Type | Description 
-----|------|-------------
**file**🔹 | <code>[YamlFile](#projen-yamlfile)</code> | <span></span>

### Methods


#### addJobs(jobs)🔹 <a id="projen-github-githubworkflow-addjobs"></a>



```ts
addJobs(jobs: Map<string, any>): void
```

* **jobs** (<code>Map<string, any></code>)  *No description*




#### on(events)🔹 <a id="projen-github-githubworkflow-on"></a>



```ts
on(events: Map<string, any>): void
```

* **events** (<code>Map<string, any></code>)  *No description*






## class Mergify 🔹 <a id="projen-github-mergify"></a>



__Submodule__: github

__Extends__: [Component](#projen-component)

### Initializer




```ts
new github.Mergify(github: GitHub, options?: MergifyOptions)
```

* **github** (<code>[github.GitHub](#projen-github-github)</code>)  *No description*
* **options** (<code>[github.MergifyOptions](#projen-github-mergifyoptions)</code>)  *No description*
  * **rules** (<code>Array<[github.MergifyRule](#projen-github-mergifyrule)></code>)  *No description* __*Optional*__


### Methods


#### addRule(rule)🔹 <a id="projen-github-mergify-addrule"></a>



```ts
addRule(rule: MergifyRule): void
```

* **rule** (<code>[github.MergifyRule](#projen-github-mergifyrule)</code>)  *No description*
  * **actions** (<code>Map<string, any></code>)  *No description* 
  * **conditions** (<code>Array<string></code>)  *No description* 
  * **name** (<code>string</code>)  *No description* 






## class PullRequestTemplate 🔹 <a id="projen-github-pullrequesttemplate"></a>

Template for GitHub pull requests.

__Submodule__: github

__Extends__: [TextFile](#projen-textfile)

### Initializer




```ts
new github.PullRequestTemplate(github: GitHub, options?: PullRequestTemplateOptions)
```

* **github** (<code>[github.GitHub](#projen-github-github)</code>)  *No description*
* **options** (<code>[github.PullRequestTemplateOptions](#projen-github-pullrequesttemplateoptions)</code>)  *No description*
  * **lines** (<code>Array<string></code>)  The contents of the template. __*Default*__: a standard default template will be created.




## class JavaProject 🔹 <a id="projen-java-javaproject"></a>

Java project.

__Submodule__: java

__Extends__: [Project](#projen-project)

### Initializer




```ts
new java.JavaProject(options: JavaProjectOptions)
```

* **options** (<code>[java.JavaProjectOptions](#projen-java-javaprojectoptions)</code>)  *No description*
  * **name** (<code>string</code>)  This is the name of your project. 
  * **clobber** (<code>boolean</code>)  Add a `clobber` task which resets the repo to origin. __*Default*__: true
  * **devContainer** (<code>boolean</code>)  Add a VSCode development environment (used for GitHub Codespaces). __*Default*__: false
  * **gitpod** (<code>boolean</code>)  Add a Gitpod development environment. __*Default*__: false
  * **jsiiFqn** (<code>string</code>)  The JSII FQN (fully qualified name) of the project class. __*Default*__: undefined
  * **logging** (<code>[LoggerOptions](#projen-loggeroptions)</code>)  Configure logging options such as verbosity. __*Default*__: {}
  * **outdir** (<code>string</code>)  The root directory of the project. __*Default*__: "."
  * **parent** (<code>[Project](#projen-project)</code>)  The parent project, if this project is part of a bigger project. __*Optional*__
  * **projectType** (<code>[ProjectType](#projen-projecttype)</code>)  Which type of project this is (library/app). __*Default*__: ProjectType.UNKNOWN
  * **readme** (<code>[SampleReadmeProps](#projen-samplereadmeprops)</code>)  The README setup. __*Default*__: { filename: 'README.md', contents: '# replace this' }
  * **artifactId** (<code>string</code>)  The artifactId is generally the name that the project is known by. 
  * **groupId** (<code>string</code>)  This is generally unique amongst an organization or a project. 
  * **version** (<code>string</code>)  This is the last piece of the naming puzzle. 
  * **description** (<code>string</code>)  Description of a project is always good. __*Default*__: undefined
  * **packaging** (<code>string</code>)  Project packaging format. __*Default*__: "jar"
  * **url** (<code>string</code>)  The URL, like the name, is not required. __*Default*__: undefined
  * **compileOptions** (<code>[java.MavenCompileOptions](#projen-java-mavencompileoptions)</code>)  Compile options. __*Default*__: defaults
  * **deps** (<code>Array<string></code>)  List of runtime dependencies for this project. __*Default*__: []
  * **distdir** (<code>string</code>)  Final artifact output directory. __*Default*__: "dist/java"
  * **junit** (<code>boolean</code>)  Include junit tests. __*Default*__: true
  * **junitOptions** (<code>[java.JunitOptions](#projen-java-junitoptions)</code>)  junit options. __*Default*__: defaults
  * **packagingOptions** (<code>[java.MavenPackagingOptions](#projen-java-mavenpackagingoptions)</code>)  Packaging options. __*Default*__: defaults
  * **projenrcJava** (<code>boolean</code>)  Use projenrc in java. __*Default*__: true
  * **projenrcJavaOptions** (<code>[java.ProjenrcCommonOptions](#projen-java-projenrccommonoptions)</code>)  Options related to projenrc in java. __*Default*__: default options
  * **sample** (<code>boolean</code>)  Include sample code and test if the relevant directories don't exist. __*Optional*__
  * **sampleJavaPackage** (<code>string</code>)  The java package to use for the code sample. __*Default*__: "org.acme"
  * **testDeps** (<code>Array<string></code>)  List of test dependencies for this project. __*Default*__: []



### Properties


Name | Type | Description 
-----|------|-------------
**compile**🔹 | <code>[java.MavenCompile](#projen-java-mavencompile)</code> | Compile component.
**distdir**🔹 | <code>string</code> | Maven artifact output directory.
**packaging**🔹 | <code>[java.MavenPackaging](#projen-java-mavenpackaging)</code> | Packaging component.
**pom**🔹 | <code>[java.Pom](#projen-java-pom)</code> | API for managing `pom.xml`.
**junit**?🔹 | <code>[java.Junit](#projen-java-junit)</code> | JUnit component.<br/>__*Optional*__
**projenrc**?🔹 | <code>[java.Projenrc](#projen-java-projenrc)</code> | Projenrc component.<br/>__*Optional*__

### Methods


#### addDependency(spec)🔹 <a id="projen-java-javaproject-adddependency"></a>

Adds a runtime dependency.

```ts
addDependency(spec: string): void
```

* **spec** (<code>string</code>)  Format `<groupId>/<artifactId>@<semver>`.




#### addPlugin(spec, options?)🔹 <a id="projen-java-javaproject-addplugin"></a>

Adds a build plugin to the pom.

The plug in is also added as a BUILD dep to the project.

```ts
addPlugin(spec: string, options?: PluginOptions): Dependency
```

* **spec** (<code>string</code>)  dependency spec (`group/artifact@version`).
* **options** (<code>[java.PluginOptions](#projen-java-pluginoptions)</code>)  plugin options.
  * **configuration** (<code>Map<string, any></code>)  Plugin key/value configuration. __*Default*__: {}
  * **dependencies** (<code>Array<string></code>)  You could configure the dependencies for the plugin. __*Default*__: []
  * **executions** (<code>Array<[java.PluginExecution](#projen-java-pluginexecution)></code>)  Plugin executions. __*Default*__: []

__Returns__:
* <code>[deps.Dependency](#projen-deps-dependency)</code>

#### addTestDependency(spec)🔹 <a id="projen-java-javaproject-addtestdependency"></a>

Adds a test dependency.

```ts
addTestDependency(spec: string): void
```

* **spec** (<code>string</code>)  Format `<groupId>/<artifactId>@<semver>`.






## class Junit 🔹 <a id="projen-java-junit"></a>

Implements JUnit-based testing.

__Submodule__: java

__Extends__: [Component](#projen-component)

### Initializer




```ts
new java.Junit(project: Project, options: JunitOptions)
```

* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **options** (<code>[java.JunitOptions](#projen-java-junitoptions)</code>)  *No description*
  * **pom** (<code>[java.Pom](#projen-java-pom)</code>)  Java pom. 
  * **sampleJavaPackage** (<code>string</code>)  Java package for test sample. __*Default*__: "org.acme"
  * **version** (<code>string</code>)  Junit version. __*Default*__: "5.7.0"




## class MavenCompile 🔹 <a id="projen-java-mavencompile"></a>

Adds the maven-compiler plugin to a POM file and the `compile` task.

__Submodule__: java

__Extends__: [Component](#projen-component)

### Initializer




```ts
new java.MavenCompile(project: Project, pom: Pom, options?: MavenCompileOptions)
```

* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **pom** (<code>[java.Pom](#projen-java-pom)</code>)  *No description*
* **options** (<code>[java.MavenCompileOptions](#projen-java-mavencompileoptions)</code>)  *No description*
  * **source** (<code>string</code>)  Source language version. __*Default*__: "1.8"
  * **target** (<code>string</code>)  Target JVM version. __*Default*__: "1.8"



### Properties


Name | Type | Description 
-----|------|-------------
**compileTask**🔹 | <code>[tasks.Task](#projen-tasks-task)</code> | <span></span>



## class MavenPackaging 🔹 <a id="projen-java-mavenpackaging"></a>

Configures a maven project to produce a .jar archive with sources and javadocs.

__Submodule__: java

__Extends__: [Component](#projen-component)

### Initializer




```ts
new java.MavenPackaging(project: Project, pom: Pom, options?: MavenPackagingOptions)
```

* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **pom** (<code>[java.Pom](#projen-java-pom)</code>)  *No description*
* **options** (<code>[java.MavenPackagingOptions](#projen-java-mavenpackagingoptions)</code>)  *No description*
  * **distdir** (<code>string</code>)  Where to place the package output? __*Default*__: "dist/java"
  * **javadocs** (<code>boolean</code>)  Include javadocs jar in package. __*Default*__: true
  * **javadocsExclude** (<code>Array<string></code>)  Exclude source files from docs. __*Default*__: []
  * **sources** (<code>boolean</code>)  Include sources jar in package. __*Default*__: true



### Properties


Name | Type | Description 
-----|------|-------------
**task**🔹 | <code>[tasks.Task](#projen-tasks-task)</code> | The "package" task.



## class MavenSample 🔹 <a id="projen-java-mavensample"></a>

Java code sample.

__Submodule__: java

__Extends__: [Component](#projen-component)

### Initializer




```ts
new java.MavenSample(project: Project, options: MavenSampleOptions)
```

* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **options** (<code>[java.MavenSampleOptions](#projen-java-mavensampleoptions)</code>)  *No description*
  * **package** (<code>string</code>)  Project root java package. 




## class Pom 🔹 <a id="projen-java-pom"></a>

A Project Object Model or POM is the fundamental unit of work in Maven.

It is
an XML file that contains information about the project and configuration
details used by Maven to build the project.

__Submodule__: java

__Extends__: [Component](#projen-component)

### Initializer




```ts
new java.Pom(project: Project, options: PomOptions)
```

* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **options** (<code>[java.PomOptions](#projen-java-pomoptions)</code>)  *No description*
  * **artifactId** (<code>string</code>)  The artifactId is generally the name that the project is known by. 
  * **groupId** (<code>string</code>)  This is generally unique amongst an organization or a project. 
  * **version** (<code>string</code>)  This is the last piece of the naming puzzle. 
  * **description** (<code>string</code>)  Description of a project is always good. __*Default*__: undefined
  * **packaging** (<code>string</code>)  Project packaging format. __*Default*__: "jar"
  * **url** (<code>string</code>)  The URL, like the name, is not required. __*Default*__: undefined



### Properties


Name | Type | Description 
-----|------|-------------
**artifactId**🔹 | <code>string</code> | Maven artifact ID.
**fileName**🔹 | <code>string</code> | The name of the pom file.
**groupId**🔹 | <code>string</code> | Maven group ID.
**packaging**🔹 | <code>string</code> | Maven packaging format.
**version**🔹 | <code>string</code> | Project version.
**description**?🔹 | <code>string</code> | Project description.<br/>__*Optional*__
**name**?🔹 | <code>string</code> | Project display name.<br/>__*Optional*__
**url**?🔹 | <code>string</code> | Project URL.<br/>__*Optional*__

### Methods


#### addDependency(spec)🔹 <a id="projen-java-pom-adddependency"></a>

Adds a runtime dependency.

```ts
addDependency(spec: string): void
```

* **spec** (<code>string</code>)  Format `<groupId>/<artifactId>@<semver>`.




#### addPlugin(spec, options?)🔹 <a id="projen-java-pom-addplugin"></a>

Adds a build plugin to the pom.

The plug in is also added as a BUILD dep to the project.

```ts
addPlugin(spec: string, options?: PluginOptions): Dependency
```

* **spec** (<code>string</code>)  dependency spec (`group/artifact@version`).
* **options** (<code>[java.PluginOptions](#projen-java-pluginoptions)</code>)  plugin options.
  * **configuration** (<code>Map<string, any></code>)  Plugin key/value configuration. __*Default*__: {}
  * **dependencies** (<code>Array<string></code>)  You could configure the dependencies for the plugin. __*Default*__: []
  * **executions** (<code>Array<[java.PluginExecution](#projen-java-pluginexecution)></code>)  Plugin executions. __*Default*__: []

__Returns__:
* <code>[deps.Dependency](#projen-deps-dependency)</code>

#### addProperty(key, value)🔹 <a id="projen-java-pom-addproperty"></a>

Adds a key/value property to the pom.

```ts
addProperty(key: string, value: string): void
```

* **key** (<code>string</code>)  the key.
* **value** (<code>string</code>)  the value.




#### addTestDependency(spec)🔹 <a id="projen-java-pom-addtestdependency"></a>

Adds a test dependency.

```ts
addTestDependency(spec: string): void
```

* **spec** (<code>string</code>)  Format `<groupId>/<artifactId>@<semver>`.






## class Projenrc 🔹 <a id="projen-java-projenrc"></a>

Allows writing projenrc files in java.

This will install `org.projen/projen` as a Maven dependency and will add a
`synth` task which will compile & execute `main()` from
`src/main/java/projenrc.java`.

__Submodule__: java

__Extends__: [Component](#projen-component)

### Initializer




```ts
new java.Projenrc(project: Project, pom: Pom, options?: ProjenrcOptions)
```

* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **pom** (<code>[java.Pom](#projen-java-pom)</code>)  *No description*
* **options** (<code>[java.ProjenrcOptions](#projen-java-projenrcoptions)</code>)  *No description*
  * **className** (<code>string</code>)  The name of the Java class which contains the `main()` method for projen. __*Default*__: "projenrc"
  * **projenVersion** (<code>string</code>)  The projen version to use. __*Default*__: current version
  * **testScope** (<code>boolean</code>)  Defines projenrc under the test scope instead of the main scope, which is reserved to the app. __*Default*__: true
  * **initializationOptions** (<code>Map<string, any></code>)  Project initialization options. __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**className**🔹 | <code>string</code> | The name of the java class that includes the projen entrypoint.



## class Pip 🔹 <a id="projen-python-pip"></a>

Manages dependencies using a requirements.txt file and the pip CLI tool.

__Implements__: [python.IPythonDeps](#projen-python-ipythondeps)
__Submodule__: python

__Extends__: [Component](#projen-component)

### Initializer




```ts
new python.Pip(project: PythonProject, _options?: PipOptions)
```

* **project** (<code>[python.PythonProject](#projen-python-pythonproject)</code>)  *No description*
* **_options** (<code>[python.PipOptions](#projen-python-pipoptions)</code>)  *No description*



### Properties


Name | Type | Description 
-----|------|-------------
**installTask**🔹 | <code>[tasks.Task](#projen-tasks-task)</code> | A task that installs and updates dependencies.

### Methods


#### addDependency(spec)🔹 <a id="projen-python-pip-adddependency"></a>

Adds a runtime dependency.

```ts
addDependency(spec: string): void
```

* **spec** (<code>string</code>)  Format `<module>@<semver>`.




#### addDevDependency(spec)🔹 <a id="projen-python-pip-adddevdependency"></a>

Adds a dev dependency.

```ts
addDevDependency(spec: string): void
```

* **spec** (<code>string</code>)  Format `<module>@<semver>`.




#### installDependencies()🔹 <a id="projen-python-pip-installdependencies"></a>

Installs dependencies (called during post-synthesis).

```ts
installDependencies(): void
```







## class Poetry 🔹 <a id="projen-python-poetry"></a>

Manage project dependencies, virtual environments, and packaging through the poetry CLI tool.

__Implements__: [python.IPythonDeps](#projen-python-ipythondeps), [python.IPythonEnv](#projen-python-ipythonenv), [python.IPythonPackaging](#projen-python-ipythonpackaging)
__Submodule__: python

__Extends__: [Component](#projen-component)

### Initializer




```ts
new python.Poetry(project: PythonProject, options: PythonPackagingOptions)
```

* **project** (<code>[python.PythonProject](#projen-python-pythonproject)</code>)  *No description*
* **options** (<code>[python.PythonPackagingOptions](#projen-python-pythonpackagingoptions)</code>)  *No description*
  * **authorEmail** (<code>string</code>)  Author's e-mail. 
  * **authorName** (<code>string</code>)  Author's name. 
  * **version** (<code>string</code>)  Version of the package. 
  * **classifiers** (<code>Array<string></code>)  A list of PyPI trove classifiers that describe the project. __*Optional*__
  * **description** (<code>string</code>)  A short description of the package. __*Optional*__
  * **homepage** (<code>string</code>)  A URL to the website of the project. __*Optional*__
  * **license** (<code>string</code>)  License of this package as an SPDX identifier. __*Optional*__
  * **poetryOptions** (<code>[python.PoetryPyprojectOptionsWithoutDeps](#projen-python-poetrypyprojectoptionswithoutdeps)</code>)  Additional options to set for poetry if using poetry. __*Optional*__
  * **setupConfig** (<code>Map<string, any></code>)  Additional fields to pass in the setup() function if using setuptools. __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**installTask**🔹 | <code>[tasks.Task](#projen-tasks-task)</code> | A task that installs and updates dependencies.
**packageTask**🔹 | <code>[tasks.Task](#projen-tasks-task)</code> | A task that packages the project for distribution.
**publishTask**🔹 | <code>[tasks.Task](#projen-tasks-task)</code> | A task that uploads the package to a package repository.
**publishTestTask**🔹 | <code>[tasks.Task](#projen-tasks-task)</code> | A task that uploads the package to the Test PyPI repository.

### Methods


#### addDependency(spec)🔹 <a id="projen-python-poetry-adddependency"></a>

Adds a runtime dependency.

```ts
addDependency(spec: string): void
```

* **spec** (<code>string</code>)  Format `<module>@<semver>`.




#### addDevDependency(spec)🔹 <a id="projen-python-poetry-adddevdependency"></a>

Adds a dev dependency.

```ts
addDevDependency(spec: string): void
```

* **spec** (<code>string</code>)  Format `<module>@<semver>`.




#### installDependencies()🔹 <a id="projen-python-poetry-installdependencies"></a>

Installs dependencies (called during post-synthesis).

```ts
installDependencies(): void
```





#### setupEnvironment()🔹 <a id="projen-python-poetry-setupenvironment"></a>

Initializes the virtual environment if it doesn't exist (called during post-synthesis).

```ts
setupEnvironment(): void
```







## class PoetryPyproject 🔹 <a id="projen-python-poetrypyproject"></a>

Represents configuration of a pyproject.toml file for a Poetry project.

__Submodule__: python

__Extends__: [Component](#projen-component)

### Initializer




```ts
new python.PoetryPyproject(project: PythonProject, options: PoetryPyprojectOptions)
```

* **project** (<code>[python.PythonProject](#projen-python-pythonproject)</code>)  *No description*
* **options** (<code>[python.PoetryPyprojectOptions](#projen-python-poetrypyprojectoptions)</code>)  *No description*
  * **authors** (<code>Array<string></code>)  The authors of the package. __*Optional*__
  * **classifiers** (<code>Array<string></code>)  A list of PyPI trove classifiers that describe the project. __*Optional*__
  * **description** (<code>string</code>)  A short description of the package (required). __*Optional*__
  * **documentation** (<code>string</code>)  A URL to the documentation of the project. __*Optional*__
  * **exclude** (<code>Array<string></code>)  A list of patterns that will be excluded in the final package. __*Optional*__
  * **homepage** (<code>string</code>)  A URL to the website of the project. __*Optional*__
  * **include** (<code>Array<string></code>)  A list of patterns that will be included in the final package. __*Optional*__
  * **keywords** (<code>Array<string></code>)  A list of keywords (max: 5) that the package is related to. __*Optional*__
  * **license** (<code>string</code>)  License of this package as an SPDX identifier. __*Optional*__
  * **maintainers** (<code>Array<string></code>)  the maintainers of the package. __*Optional*__
  * **name** (<code>string</code>)  Name of the package (required). __*Optional*__
  * **packages** (<code>Array<string></code>)  A list of packages and modules to include in the final distribution. __*Optional*__
  * **readme** (<code>string</code>)  The name of the readme file of the package. __*Optional*__
  * **repository** (<code>string</code>)  A URL to the repository of the project. __*Optional*__
  * **scripts** (<code>Map<string, any></code>)  The scripts or executables that will be installed when installing the package. __*Optional*__
  * **version** (<code>string</code>)  Version of the package (required). __*Optional*__
  * **dependencies** (<code>Map<string, any></code>)  A list of dependencies for the project. __*Optional*__
  * **devDependencies** (<code>Map<string, any></code>)  A list of development dependencies for the project. __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**file**🔹 | <code>[TomlFile](#projen-tomlfile)</code> | <span></span>



## class Pytest 🔹 <a id="projen-python-pytest"></a>



__Submodule__: python

__Extends__: [Component](#projen-component)

### Initializer




```ts
new python.Pytest(project: PythonProject, options?: PytestOptions)
```

* **project** (<code>[python.PythonProject](#projen-python-pythonproject)</code>)  *No description*
* **options** (<code>[python.PytestOptions](#projen-python-pytestoptions)</code>)  *No description*
  * **maxFailures** (<code>number</code>)  Stop the testing process after the first N failures. __*Optional*__
  * **testdir** (<code>string</code>)  Directory with tests. __*Default*__: 'tests'
  * **version** (<code>string</code>)  Pytest version. __*Default*__: "6.2.1"



### Properties


Name | Type | Description 
-----|------|-------------
**testTask**🔹 | <code>[tasks.Task](#projen-tasks-task)</code> | <span></span>



## class PythonProject 🔹 <a id="projen-python-pythonproject"></a>

Python project.

__Submodule__: python

__Extends__: [Project](#projen-project)

### Initializer




```ts
new python.PythonProject(options: PythonProjectOptions)
```

* **options** (<code>[python.PythonProjectOptions](#projen-python-pythonprojectoptions)</code>)  *No description*
  * **name** (<code>string</code>)  This is the name of your project. 
  * **clobber** (<code>boolean</code>)  Add a `clobber` task which resets the repo to origin. __*Default*__: true
  * **devContainer** (<code>boolean</code>)  Add a VSCode development environment (used for GitHub Codespaces). __*Default*__: false
  * **gitpod** (<code>boolean</code>)  Add a Gitpod development environment. __*Default*__: false
  * **jsiiFqn** (<code>string</code>)  The JSII FQN (fully qualified name) of the project class. __*Default*__: undefined
  * **logging** (<code>[LoggerOptions](#projen-loggeroptions)</code>)  Configure logging options such as verbosity. __*Default*__: {}
  * **outdir** (<code>string</code>)  The root directory of the project. __*Default*__: "."
  * **parent** (<code>[Project](#projen-project)</code>)  The parent project, if this project is part of a bigger project. __*Optional*__
  * **projectType** (<code>[ProjectType](#projen-projecttype)</code>)  Which type of project this is (library/app). __*Default*__: ProjectType.UNKNOWN
  * **readme** (<code>[SampleReadmeProps](#projen-samplereadmeprops)</code>)  The README setup. __*Default*__: { filename: 'README.md', contents: '# replace this' }
  * **authorEmail** (<code>string</code>)  Author's e-mail. 
  * **authorName** (<code>string</code>)  Author's name. 
  * **version** (<code>string</code>)  Version of the package. 
  * **classifiers** (<code>Array<string></code>)  A list of PyPI trove classifiers that describe the project. __*Optional*__
  * **description** (<code>string</code>)  A short description of the package. __*Optional*__
  * **homepage** (<code>string</code>)  A URL to the website of the project. __*Optional*__
  * **license** (<code>string</code>)  License of this package as an SPDX identifier. __*Optional*__
  * **poetryOptions** (<code>[python.PoetryPyprojectOptionsWithoutDeps](#projen-python-poetrypyprojectoptionswithoutdeps)</code>)  Additional options to set for poetry if using poetry. __*Optional*__
  * **setupConfig** (<code>Map<string, any></code>)  Additional fields to pass in the setup() function if using setuptools. __*Optional*__
  * **moduleName** (<code>string</code>)  Name of the python package as used in imports and filenames. 
  * **deps** (<code>Array<string></code>)  List of runtime dependencies for this project. __*Default*__: []
  * **devDeps** (<code>Array<string></code>)  List of dev dependencies for this project. __*Default*__: []
  * **pip** (<code>boolean</code>)  Use pip with a requirements.txt file to track project dependencies. __*Default*__: true
  * **poetry** (<code>boolean</code>)  Use poetry to manage your project dependencies, virtual environment, and (optional) packaging/publishing. __*Default*__: false
  * **pytest** (<code>boolean</code>)  Include pytest tests. __*Default*__: true
  * **pytestOptions** (<code>[python.PytestOptions](#projen-python-pytestoptions)</code>)  pytest options. __*Default*__: defaults
  * **sample** (<code>boolean</code>)  Include sample code and test if the relevant directories don't exist. __*Default*__: true
  * **setuptools** (<code>boolean</code>)  Use setuptools with a setup.py script for packaging and publishing. __*Default*__: true if the project type is library
  * **venv** (<code>boolean</code>)  Use venv to manage a virtual environment for installing dependencies inside. __*Default*__: true
  * **venvOptions** (<code>[python.VenvOptions](#projen-python-venvoptions)</code>)  Venv options. __*Default*__: defaults



### Properties


Name | Type | Description 
-----|------|-------------
**depsManager**🔹 | <code>[python.IPythonDeps](#projen-python-ipythondeps)</code> | API for managing dependencies.
**envManager**🔹 | <code>[python.IPythonEnv](#projen-python-ipythonenv)</code> | API for mangaging the Python runtime environment.
**moduleName**🔹 | <code>string</code> | Python module name (the project name, with any hyphens or periods replaced with underscores).
**version**🔹 | <code>string</code> | Version of the package for distribution (should follow semver).
**packagingManager**?🔹 | <code>[python.IPythonPackaging](#projen-python-ipythonpackaging)</code> | API for managing packaging the project as a library.<br/>__*Optional*__
**pytest**?🔹 | <code>[python.Pytest](#projen-python-pytest)</code> | Pytest component.<br/>__*Optional*__

### Methods


#### addDependency(spec)🔹 <a id="projen-python-pythonproject-adddependency"></a>

Adds a runtime dependency.

```ts
addDependency(spec: string): void
```

* **spec** (<code>string</code>)  Format `<module>@<semver>`.




#### addDevDependency(spec)🔹 <a id="projen-python-pythonproject-adddevdependency"></a>

Adds a dev dependency.

```ts
addDevDependency(spec: string): void
```

* **spec** (<code>string</code>)  Format `<module>@<semver>`.




#### postSynthesize()🔹 <a id="projen-python-pythonproject-postsynthesize"></a>

Called after all components are synthesized.

Order is *not* guaranteed.

```ts
postSynthesize(): void
```







## class PythonSample 🔹 <a id="projen-python-pythonsample"></a>

Python code sample.

__Submodule__: python

__Extends__: [Component](#projen-component)

### Initializer




```ts
new python.PythonSample(project: PythonProject, _options: PythonSampleOptions)
```

* **project** (<code>[python.PythonProject](#projen-python-pythonproject)</code>)  *No description*
* **_options** (<code>[python.PythonSampleOptions](#projen-python-pythonsampleoptions)</code>)  *No description*




## class RequirementsFile 🔹 <a id="projen-python-requirementsfile"></a>

Specifies a list of packages to be installed using pip.

__Submodule__: python

__Extends__: [FileBase](#projen-filebase)

### Initializer




```ts
new python.RequirementsFile(project: Project, filePath: string, options: RequirementsFileOptions)
```

* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **filePath** (<code>string</code>)  *No description*
* **options** (<code>[python.RequirementsFileOptions](#projen-python-requirementsfileoptions)</code>)  *No description*
  * **packageProvider** (<code>[python.IPackageProvider](#projen-python-ipackageprovider)</code>)  Provide a list of packages that can be dynamically updated. __*Optional*__


### Methods


#### addPackages(...packages)🔹 <a id="projen-python-requirementsfile-addpackages"></a>

Adds the specified packages provided in semver format.

Comment lines (start with `#`) are ignored.

```ts
addPackages(...packages: string[]): void
```

* **packages** (<code>string</code>)  Package version in format `<module>@<semver>`.




#### protected synthesizeContent(resolver)🔹 <a id="projen-python-requirementsfile-synthesizecontent"></a>

Implemented by derived classes and returns the contents of the file to emit.

```ts
protected synthesizeContent(resolver: IResolver): string
```

* **resolver** (<code>[IResolver](#projen-iresolver)</code>)  *No description*

__Returns__:
* <code>string</code>



## class SetupPy 🔹 <a id="projen-python-setuppy"></a>

Python packaging script where package metadata can be placed.

__Submodule__: python

__Extends__: [FileBase](#projen-filebase)

### Initializer




```ts
new python.SetupPy(project: PythonProject, options: SetupPyOptions)
```

* **project** (<code>[python.PythonProject](#projen-python-pythonproject)</code>)  *No description*
* **options** (<code>[python.SetupPyOptions](#projen-python-setuppyoptions)</code>)  *No description*
  * **authorEmail** (<code>string</code>)  Author's e-mail. __*Optional*__
  * **authorName** (<code>string</code>)  Author's name. __*Optional*__
  * **classifiers** (<code>Array<string></code>)  A list of PyPI trove classifiers that describe the project. __*Optional*__
  * **description** (<code>string</code>)  A short project description. __*Optional*__
  * **homepage** (<code>string</code>)  Package's Homepage / Website. __*Optional*__
  * **license** (<code>string</code>)  The project license. __*Optional*__
  * **name** (<code>string</code>)  Name of the package. __*Optional*__
  * **packages** (<code>Array<string></code>)  List of submodules to be packaged. __*Optional*__
  * **version** (<code>string</code>)  Manually specify package version. __*Optional*__


### Methods


#### protected synthesizeContent(resolver)🔹 <a id="projen-python-setuppy-synthesizecontent"></a>

Implemented by derived classes and returns the contents of the file to emit.

```ts
protected synthesizeContent(resolver: IResolver): string
```

* **resolver** (<code>[IResolver](#projen-iresolver)</code>)  *No description*

__Returns__:
* <code>string</code>



## class Setuptools 🔹 <a id="projen-python-setuptools"></a>

Manages packaging through setuptools with a setup.py script.

__Implements__: [python.IPythonPackaging](#projen-python-ipythonpackaging)
__Submodule__: python

__Extends__: [Component](#projen-component)

### Initializer




```ts
new python.Setuptools(project: PythonProject, options: PythonPackagingOptions)
```

* **project** (<code>[python.PythonProject](#projen-python-pythonproject)</code>)  *No description*
* **options** (<code>[python.PythonPackagingOptions](#projen-python-pythonpackagingoptions)</code>)  *No description*
  * **authorEmail** (<code>string</code>)  Author's e-mail. 
  * **authorName** (<code>string</code>)  Author's name. 
  * **version** (<code>string</code>)  Version of the package. 
  * **classifiers** (<code>Array<string></code>)  A list of PyPI trove classifiers that describe the project. __*Optional*__
  * **description** (<code>string</code>)  A short description of the package. __*Optional*__
  * **homepage** (<code>string</code>)  A URL to the website of the project. __*Optional*__
  * **license** (<code>string</code>)  License of this package as an SPDX identifier. __*Optional*__
  * **poetryOptions** (<code>[python.PoetryPyprojectOptionsWithoutDeps](#projen-python-poetrypyprojectoptionswithoutdeps)</code>)  Additional options to set for poetry if using poetry. __*Optional*__
  * **setupConfig** (<code>Map<string, any></code>)  Additional fields to pass in the setup() function if using setuptools. __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**packageTask**🔹 | <code>[tasks.Task](#projen-tasks-task)</code> | A task that packages the project for distribution.
**publishTask**🔹 | <code>[tasks.Task](#projen-tasks-task)</code> | A task that uploads the package to a package repository.
**publishTestTask**🔹 | <code>[tasks.Task](#projen-tasks-task)</code> | A task that uploads the package to the Test PyPI repository.



## class Venv 🔹 <a id="projen-python-venv"></a>

Manages a virtual environment through the Python venv module.

__Implements__: [python.IPythonEnv](#projen-python-ipythonenv)
__Submodule__: python

__Extends__: [Component](#projen-component)

### Initializer




```ts
new python.Venv(project: PythonProject, options?: VenvOptions)
```

* **project** (<code>[python.PythonProject](#projen-python-pythonproject)</code>)  *No description*
* **options** (<code>[python.VenvOptions](#projen-python-venvoptions)</code>)  *No description*
  * **envdir** (<code>string</code>)  Name of directory to store the environment in. __*Default*__: ".env"


### Methods


#### setupEnvironment()🔹 <a id="projen-python-venv-setupenvironment"></a>

Initializes the virtual environment if it doesn't exist (called during post-synthesis).

```ts
setupEnvironment(): void
```







## class Task 🔹 <a id="projen-tasks-task"></a>

A task that can be performed on the project.

Modeled as a series of shell
commands and subtasks.

__Submodule__: tasks


### Initializer




```ts
new tasks.Task(tasks: Tasks, name: string, props?: TaskOptions)
```

* **tasks** (<code>[tasks.Tasks](#projen-tasks-tasks)</code>)  *No description*
* **name** (<code>string</code>)  *No description*
* **props** (<code>[tasks.TaskOptions](#projen-tasks-taskoptions)</code>)  *No description*
  * **category** (<code>[tasks.TaskCategory](#projen-tasks-taskcategory)</code>)  Category for start menu. __*Default*__: TaskCategory.MISC
  * **condition** (<code>string</code>)  A shell command which determines if the this task should be executed. __*Optional*__
  * **cwd** (<code>string</code>)  The working directory for all steps in this task (unless overridden by the step). __*Default*__: process.cwd()
  * **description** (<code>string</code>)  The description of this build command. __*Default*__: the task name
  * **env** (<code>Map<string, string></code>)  Defines environment variables for the execution of this task. __*Default*__: {}
  * **exec** (<code>string</code>)  Shell command to execute as the first command of the task. __*Default*__: add steps using `task.exec(command)` or `task.spawn(subtask)`



### Properties


Name | Type | Description 
-----|------|-------------
**name**🔹 | <code>string</code> | Task name.
**steps**🔹 | <code>Array<[tasks.TaskStep](#projen-tasks-taskstep)></code> | Returns an immutable copy of all the step specifications of the task.
**category**?🔹 | <code>[tasks.TaskCategory](#projen-tasks-taskcategory)</code> | The start menu category of the task.<br/>__*Optional*__
**condition**?🔹 | <code>string</code> | A command to execute which determines if the task should be skipped.<br/>__*Optional*__
**description**?🔹 | <code>string</code> | The description of the task.<br/>__*Optional*__

### Methods


#### env(name, value)🔹 <a id="projen-tasks-task-env"></a>

Adds an environment variable to this task.

```ts
env(name: string, value: string): void
```

* **name** (<code>string</code>)  The name of the variable.
* **value** (<code>string</code>)  The value.




#### exec(command, options?)🔹 <a id="projen-tasks-task-exec"></a>

Executes a shell command.

```ts
exec(command: string, options?: TaskStepOptions): void
```

* **command** (<code>string</code>)  Shell command.
* **options** (<code>[tasks.TaskStepOptions](#projen-tasks-taskstepoptions)</code>)  Options.
  * **cwd** (<code>string</code>)  The working directory for this step. __*Default*__: determined by the task
  * **name** (<code>string</code>)  Step name. __*Default*__: no name




#### prepend(shell, options?)⚠️ <a id="projen-tasks-task-prepend"></a>

Adds a command at the beginning of the task.

```ts
prepend(shell: string, options?: TaskStepOptions): void
```

* **shell** (<code>string</code>)  The command to add.
* **options** (<code>[tasks.TaskStepOptions](#projen-tasks-taskstepoptions)</code>)  *No description*
  * **cwd** (<code>string</code>)  The working directory for this step. __*Default*__: determined by the task
  * **name** (<code>string</code>)  Step name. __*Default*__: no name




#### prependExec(shell, options?)🔹 <a id="projen-tasks-task-prependexec"></a>

Adds a command at the beginning of the task.

```ts
prependExec(shell: string, options?: TaskStepOptions): void
```

* **shell** (<code>string</code>)  The command to add.
* **options** (<code>[tasks.TaskStepOptions](#projen-tasks-taskstepoptions)</code>)  *No description*
  * **cwd** (<code>string</code>)  The working directory for this step. __*Default*__: determined by the task
  * **name** (<code>string</code>)  Step name. __*Default*__: no name




#### prependSay(message, options?)🔹 <a id="projen-tasks-task-prependsay"></a>

Says something at the beginning of the task.

```ts
prependSay(message: string, options?: TaskStepOptions): void
```

* **message** (<code>string</code>)  Your message.
* **options** (<code>[tasks.TaskStepOptions](#projen-tasks-taskstepoptions)</code>)  *No description*
  * **cwd** (<code>string</code>)  The working directory for this step. __*Default*__: determined by the task
  * **name** (<code>string</code>)  Step name. __*Default*__: no name




#### prependSpawn(subtask, options?)🔹 <a id="projen-tasks-task-prependspawn"></a>

Adds a spawn instruction at the beginning of the task.

```ts
prependSpawn(subtask: Task, options?: TaskStepOptions): void
```

* **subtask** (<code>[tasks.Task](#projen-tasks-task)</code>)  The subtask to execute.
* **options** (<code>[tasks.TaskStepOptions](#projen-tasks-taskstepoptions)</code>)  *No description*
  * **cwd** (<code>string</code>)  The working directory for this step. __*Default*__: determined by the task
  * **name** (<code>string</code>)  Step name. __*Default*__: no name




#### reset(command?)🔹 <a id="projen-tasks-task-reset"></a>

Reset the task so it no longer has any commands.

```ts
reset(command?: string): void
```

* **command** (<code>string</code>)  the first command to add to the task after it was cleared.




#### say(message, options?)🔹 <a id="projen-tasks-task-say"></a>

Say something.

```ts
say(message: string, options?: TaskStepOptions): void
```

* **message** (<code>string</code>)  Your message.
* **options** (<code>[tasks.TaskStepOptions](#projen-tasks-taskstepoptions)</code>)  Options.
  * **cwd** (<code>string</code>)  The working directory for this step. __*Default*__: determined by the task
  * **name** (<code>string</code>)  Step name. __*Default*__: no name




#### spawn(subtask, options?)🔹 <a id="projen-tasks-task-spawn"></a>

Spawns a sub-task.

```ts
spawn(subtask: Task, options?: TaskStepOptions): void
```

* **subtask** (<code>[tasks.Task](#projen-tasks-task)</code>)  The subtask to execute.
* **options** (<code>[tasks.TaskStepOptions](#projen-tasks-taskstepoptions)</code>)  *No description*
  * **cwd** (<code>string</code>)  The working directory for this step. __*Default*__: determined by the task
  * **name** (<code>string</code>)  Step name. __*Default*__: no name




#### toShellCommand()🔹 <a id="projen-tasks-task-toshellcommand"></a>

Renders this task as a single shell command.

```ts
toShellCommand(): string
```


__Returns__:
* <code>string</code>



## class TaskRuntime 🔹 <a id="projen-tasks-taskruntime"></a>

The runtime component of the tasks engine.

__Submodule__: tasks


### Initializer




```ts
new tasks.TaskRuntime(workdir: string)
```

* **workdir** (<code>string</code>)  *No description*



### Properties


Name | Type | Description 
-----|------|-------------
**manifest**🔹 | <code>[tasks.TasksManifest](#projen-tasks-tasksmanifest)</code> | The contents of tasks.json.
**tasks**🔹 | <code>Array<[tasks.TaskSpec](#projen-tasks-taskspec)></code> | The tasks in this project.
**workdir**🔹 | <code>string</code> | The root directory of the project and the cwd for executing tasks.

### Methods


#### runTask(name, parents?)🔹 <a id="projen-tasks-taskruntime-runtask"></a>

Runs the task.

```ts
runTask(name: string, parents?: Array<string>): void
```

* **name** (<code>string</code>)  The task name.
* **parents** (<code>Array<string></code>)  *No description*




#### tryFindTask(name)🔹 <a id="projen-tasks-taskruntime-tryfindtask"></a>

Find a task by name, or `undefined` if not found.

```ts
tryFindTask(name: string): TaskSpec
```

* **name** (<code>string</code>)  *No description*

__Returns__:
* <code>[tasks.TaskSpec](#projen-tasks-taskspec)</code>



## class Tasks 🔹 <a id="projen-tasks-tasks"></a>

Defines project tasks.

Tasks extend the projen CLI by adding subcommands to it. Task definitions are
synthesized into `.projen/tasks.json`.

__Submodule__: tasks

__Extends__: [Component](#projen-component)

### Initializer




```ts
new tasks.Tasks(project: Project)
```

* **project** (<code>[Project](#projen-project)</code>)  *No description*



### Properties


Name | Type | Description 
-----|------|-------------
**all**🔹 | <code>Array<[tasks.Task](#projen-tasks-task)></code> | All tasks.
**env**🔹 | <code>Map<string, string></code> | Returns a copy of the currently global environment for this project.
*static* **MANIFEST_FILE**🔹 | <code>string</code> | The project-relative path of the tasks manifest file.

### Methods


#### addEnvironment(name, value)🔹 <a id="projen-tasks-tasks-addenvironment"></a>

Adds global environment.

```ts
addEnvironment(name: string, value: string): void
```

* **name** (<code>string</code>)  Environment variable name.
* **value** (<code>string</code>)  Value.




#### addTask(name, options?)🔹 <a id="projen-tasks-tasks-addtask"></a>

Adds a task to a project.

```ts
addTask(name: string, options?: TaskOptions): Task
```

* **name** (<code>string</code>)  The name of the task.
* **options** (<code>[tasks.TaskOptions](#projen-tasks-taskoptions)</code>)  Task options.
  * **category** (<code>[tasks.TaskCategory](#projen-tasks-taskcategory)</code>)  Category for start menu. __*Default*__: TaskCategory.MISC
  * **condition** (<code>string</code>)  A shell command which determines if the this task should be executed. __*Optional*__
  * **cwd** (<code>string</code>)  The working directory for all steps in this task (unless overridden by the step). __*Default*__: process.cwd()
  * **description** (<code>string</code>)  The description of this build command. __*Default*__: the task name
  * **env** (<code>Map<string, string></code>)  Defines environment variables for the execution of this task. __*Default*__: {}
  * **exec** (<code>string</code>)  Shell command to execute as the first command of the task. __*Default*__: add steps using `task.exec(command)` or `task.spawn(subtask)`

__Returns__:
* <code>[tasks.Task](#projen-tasks-task)</code>

#### tryFind(name)🔹 <a id="projen-tasks-tasks-tryfind"></a>

Finds a task by name.

Returns `undefined` if the task cannot be found.

```ts
tryFind(name: string): Task
```

* **name** (<code>string</code>)  The name of the task.

__Returns__:
* <code>[tasks.Task](#projen-tasks-task)</code>



## class DevContainer 🔹 <a id="projen-vscode-devcontainer"></a>

A development environment running VSCode in a container;

used by GitHub
codespaces.

__Implements__: [IDevEnvironment](#projen-idevenvironment)
__Submodule__: vscode

__Extends__: [Component](#projen-component)

### Initializer




```ts
new vscode.DevContainer(project: Project, options?: DevContainerOptions)
```

* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **options** (<code>[vscode.DevContainerOptions](#projen-vscode-devcontaineroptions)</code>)  *No description*
  * **dockerImage** (<code>[DevEnvironmentDockerImage](#projen-devenvironmentdockerimage)</code>)  A Docker image or Dockerfile for the container. __*Optional*__
  * **ports** (<code>Array<string></code>)  An array of ports that should be exposed from the container. __*Optional*__
  * **tasks** (<code>Array<[tasks.Task](#projen-tasks-task)></code>)  An array of tasks that should be run when the container starts. __*Optional*__
  * **vscodeExtensions** (<code>Array<string></code>)  An array of extension IDs that specify the extensions that should be installed inside the container when it is created. __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**config**🔹 | <code>any</code> | Direct access to the devcontainer configuration (escape hatch).

### Methods


#### addDockerImage(image)🔹 <a id="projen-vscode-devcontainer-adddockerimage"></a>

Add a custom Docker image or Dockerfile for the container.

```ts
addDockerImage(image: DevEnvironmentDockerImage): void
```

* **image** (<code>[DevEnvironmentDockerImage](#projen-devenvironmentdockerimage)</code>)  *No description*




#### addPorts(...ports)🔹 <a id="projen-vscode-devcontainer-addports"></a>

Adds ports that should be exposed (forwarded) from the container.

```ts
addPorts(...ports: string[]): void
```

* **ports** (<code>string</code>)  The new ports.




#### addTasks(...tasks)🔹 <a id="projen-vscode-devcontainer-addtasks"></a>

Adds tasks to run when the container starts.

Tasks will be run in sequence.

```ts
addTasks(...tasks: Task[]): void
```

* **tasks** (<code>[tasks.Task](#projen-tasks-task)</code>)  The new tasks.




#### addVscodeExtensions(...extensions)🔹 <a id="projen-vscode-devcontainer-addvscodeextensions"></a>

Adds a list of VSCode extensions that should be automatically installed in the container.

```ts
addVscodeExtensions(...extensions: string[]): void
```

* **extensions** (<code>string</code>)  The extension IDs.






## class VsCode 🔹 <a id="projen-vscode-vscode"></a>



__Submodule__: vscode

__Extends__: [Component](#projen-component)

### Initializer




```ts
new vscode.VsCode(project: Project)
```

* **project** (<code>[Project](#projen-project)</code>)  *No description*



### Properties


Name | Type | Description 
-----|------|-------------
**launchConfiguration**🔹 | <code>[vscode.VsCodeLaunchConfig](#projen-vscode-vscodelaunchconfig)</code> | <span></span>



## class VsCodeLaunchConfig 🔹 <a id="projen-vscode-vscodelaunchconfig"></a>

VSCode launch configuration file (launch.json), useful for enabling in-editor debugger.

__Submodule__: vscode

__Extends__: [Component](#projen-component)

### Initializer




```ts
new vscode.VsCodeLaunchConfig(vscode: VsCode)
```

* **vscode** (<code>[vscode.VsCode](#projen-vscode-vscode)</code>)  *No description*


### Methods


#### addConfiguration(cfg)🔹 <a id="projen-vscode-vscodelaunchconfig-addconfiguration"></a>

Adds a VsCodeLaunchConfigurationEntry (e.g. a node.js debugger) to `.vscode/launch.json. Each configuration entry has following mandatory fields: type, request and name. See https://code.visualstudio.com/docs/editor/debugging#_launchjson-attributes for details.

```ts
addConfiguration(cfg: VsCodeLaunchConfigurationEntry): void
```

* **cfg** (<code>[vscode.VsCodeLaunchConfigurationEntry](#projen-vscode-vscodelaunchconfigurationentry)</code>)  VsCodeLaunchConfigurationEntry.
  * **name** (<code>string</code>)  *No description* 
  * **request** (<code>string</code>)  *No description* 
  * **type** (<code>string</code>)  *No description* 
  * **args** (<code>Array<string></code>)  *No description* __*Optional*__
  * **debugServer** (<code>number</code>)  *No description* __*Optional*__
  * **internalConsoleOptions** (<code>[vscode.InternalConsoleOptions](#projen-vscode-internalconsoleoptions)</code>)  *No description* __*Optional*__
  * **outFiles** (<code>Array<string></code>)  *No description* __*Optional*__
  * **postDebugTask** (<code>string</code>)  *No description* __*Optional*__
  * **preLaunchTask** (<code>string</code>)  *No description* __*Optional*__
  * **presentation** (<code>[vscode.Presentation](#projen-vscode-presentation)</code>)  *No description* __*Optional*__
  * **program** (<code>string</code>)  *No description* __*Optional*__
  * **runtimeArgs** (<code>Array<string></code>)  *No description* __*Optional*__
  * **serverReadyAction** (<code>[vscode.ServerReadyAction](#projen-vscode-serverreadyaction)</code>)  *No description* __*Optional*__
  * **skipFiles** (<code>Array<string></code>)  *No description* __*Optional*__
  * **url** (<code>string</code>)  *No description* __*Optional*__
  * **webRoot** (<code>string</code>)  *No description* __*Optional*__






## class NextComponent 🔹 <a id="projen-web-nextcomponent"></a>



__Submodule__: web

__Extends__: [Component](#projen-component)

### Initializer




```ts
new web.NextComponent(project: NodeProject, options: NextComponentOptions)
```

* **project** (<code>[NodeProject](#projen-nodeproject)</code>)  *No description*
* **options** (<code>[web.NextComponentOptions](#projen-web-nextcomponentoptions)</code>)  *No description*
  * **tailwind** (<code>boolean</code>)  Setup Tailwind as a PostCSS plugin. __*Default*__: true
  * **typescript** (<code>boolean</code>)  Whether to apply options specific for TypeScript Next.js projects. __*Default*__: false




## class NextJsProject 🔹 <a id="projen-web-nextjsproject"></a>

Next.js project without TypeScript.

__Submodule__: web

__Extends__: [NodeProject](#projen-nodeproject)

### Initializer




```ts
new web.NextJsProject(options: NextJsProjectOptions)
```

* **options** (<code>[web.NextJsProjectOptions](#projen-web-nextjsprojectoptions)</code>)  *No description*
  * **assetsdir** (<code>string</code>)  Assets directory. __*Default*__: "public"
  * **tailwind** (<code>boolean</code>)  Setup Tailwind CSS as a PostCSS plugin. __*Default*__: true
  * **name** (<code>string</code>)  This is the name of your project. 
  * **clobber** (<code>boolean</code>)  Add a `clobber` task which resets the repo to origin. __*Default*__: true
  * **devContainer** (<code>boolean</code>)  Add a VSCode development environment (used for GitHub Codespaces). __*Default*__: false
  * **gitpod** (<code>boolean</code>)  Add a Gitpod development environment. __*Default*__: false
  * **jsiiFqn** (<code>string</code>)  The JSII FQN (fully qualified name) of the project class. __*Default*__: undefined
  * **logging** (<code>[LoggerOptions](#projen-loggeroptions)</code>)  Configure logging options such as verbosity. __*Default*__: {}
  * **outdir** (<code>string</code>)  The root directory of the project. __*Default*__: "."
  * **parent** (<code>[Project](#projen-project)</code>)  The parent project, if this project is part of a bigger project. __*Optional*__
  * **projectType** (<code>[ProjectType](#projen-projecttype)</code>)  Which type of project this is (library/app). __*Default*__: ProjectType.UNKNOWN
  * **readme** (<code>[SampleReadmeProps](#projen-samplereadmeprops)</code>)  The README setup. __*Default*__: { filename: 'README.md', contents: '# replace this' }
  * **allowLibraryDependencies** (<code>boolean</code>)  Allow the project to include `peerDependencies` and `bundledDependencies`. __*Default*__: true
  * **authorEmail** (<code>string</code>)  Author's e-mail. __*Optional*__
  * **authorName** (<code>string</code>)  Author's name. __*Optional*__
  * **authorOrganization** (<code>boolean</code>)  Author's Organization. __*Optional*__
  * **authorUrl** (<code>string</code>)  Author's URL / Website. __*Optional*__
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. __*Default*__: true
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. __*Optional*__
  * **bundledDeps** (<code>Array<string></code>)  List of dependencies to bundle into this module. __*Optional*__
  * **deps** (<code>Array<string></code>)  Runtime dependencies of this module. __*Default*__: []
  * **description** (<code>string</code>)  The description is just a string that helps people understand the purpose of the package. __*Optional*__
  * **devDeps** (<code>Array<string></code>)  Build dependencies for this module. __*Default*__: []
  * **entrypoint** (<code>string</code>)  Module entrypoint (`main` in `package.json`). __*Default*__: "lib/index.js"
  * **homepage** (<code>string</code>)  Package's Homepage / Website. __*Optional*__
  * **keywords** (<code>Array<string></code>)  Keywords to include in `package.json`. __*Optional*__
  * **license** (<code>string</code>)  License's SPDX identifier. __*Default*__: "Apache-2.0"
  * **licensed** (<code>boolean</code>)  Indicates if a license should be added. __*Default*__: true
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). __*Default*__: no max
  * **minNodeVersion** (<code>string</code>)  Minimum Node.js version to require via package.json `engines` (inclusive). __*Default*__: no "engines" specified
  * **npmAccess** (<code>[NpmAccess](#projen-npmaccess)</code>)  Access level of the npm package. __*Default*__: for scoped packages (e.g. `foo@bar`), the default is `NpmAccess.RESTRICTED`, for non-scoped packages, the default is `NpmAccess.PUBLIC`.
  * **npmDistTag** (<code>string</code>)  Tags can be used to provide an alias instead of version numbers. __*Default*__: "latest"
  * **npmRegistry** (<code>string</code>)  The host name of the npm registry to publish to. __*Optional*__
  * **npmRegistryUrl** (<code>string</code>)  The base URL of the npm package registry. __*Default*__: "https://registry.npmjs.org"
  * **npmTaskExecution** (<code>[NpmTaskExecution](#projen-npmtaskexecution)</code>)  Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz). __*Default*__: NpmTaskExecution.PROJEN
  * **packageManager** (<code>[NodePackageManager](#projen-nodepackagemanager)</code>)  The Node Package Manager used to execute scripts. __*Default*__: NodePackageManager.YARN
  * **packageName** (<code>string</code>)  The "name" in package.json. __*Default*__: defaults to project name
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  Options for `peerDeps`. __*Optional*__
  * **peerDeps** (<code>Array<string></code>)  Peer dependencies for this module. __*Default*__: []
  * **projenCommand** (<code>string</code>)  The shell command to use in order to run the projen CLI. __*Default*__: "npx projen"
  * **repository** (<code>string</code>)  The repository is the location where the actual code for your package lives. __*Optional*__
  * **repositoryDirectory** (<code>string</code>)  If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives. __*Optional*__
  * **scripts** (<code>Map<string, string></code>)  npm scripts to include. __*Default*__: {}
  * **stability** (<code>string</code>)  Package's Stability. __*Optional*__
  * **defaultReleaseBranch** (<code>string</code>)  The name of the main release branch. 
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files on git. __*Default*__: true
  * **artifactsDirectory** (<code>string</code>)  A directory which will contain artifacts to be published to npm. __*Default*__: "dist"
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. __*Default*__: true if not a subproject
  * **codeCov** (<code>boolean</code>)  Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret. __*Default*__: false
  * **codeCovTokenSecret** (<code>string</code>)  Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories. __*Default*__: if this option is not specified, only public repositories are supported
  * **copyrightOwner** (<code>string</code>)  License copyright owner. __*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. __*Default*__: current year
  * **dependabot** (<code>boolean</code>)  Include dependabot configuration. __*Default*__: true
  * **dependabotOptions** (<code>[github.DependabotOptions](#projen-github-dependabotoptions)</code>)  Options for dependabot. __*Default*__: default options
  * **gitignore** (<code>Array<string></code>)  Additional entries to .gitignore. __*Optional*__
  * **jest** (<code>boolean</code>)  Setup jest unit tests. __*Default*__: true
  * **jestOptions** (<code>[JestOptions](#projen-jestoptions)</code>)  Jest options. __*Default*__: default options
  * **jsiiReleaseVersion** (<code>string</code>)  Version requirement of `jsii-release` which is used to publish modules to npm. __*Default*__: "latest"
  * **mergify** (<code>boolean</code>)  Adds mergify configuration. __*Default*__: true
  * **mergifyAutoMergeLabel** (<code>string</code>)  Automatically merge PRs that build successfully and have this label. __*Default*__: "auto-merge"
  * **mergifyOptions** (<code>[github.MergifyOptions](#projen-github-mergifyoptions)</code>)  Options for mergify. __*Default*__: default options
  * **npmignore** (<code>Array<string></code>)  Additional entries to .npmignore. __*Optional*__
  * **npmignoreEnabled** (<code>boolean</code>)  Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs. __*Default*__: true
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. __*Default*__: true
  * **projenUpgradeAutoMerge** (<code>boolean</code>)  Automatically merge projen upgrade PRs when build passes. __*Default*__: "true" if mergify auto-merge is enabled (default)
  * **projenUpgradeSchedule** (<code>Array<string></code>)  Customize the projenUpgrade schedule in cron expression. __*Default*__: [ "0 6 * * *" ]
  * **projenUpgradeSecret** (<code>string</code>)  Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`). __*Default*__: no automatic projen upgrade pull requests
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. __*Default*__: Semver.latest()
  * **pullRequestTemplate** (<code>boolean</code>)  Include a GitHub pull request template. __*Default*__: true
  * **pullRequestTemplateContents** (<code>string</code>)  The contents of the pull request template. __*Default*__: default content
  * **rebuildBot** (<code>boolean</code>)  Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request. __*Default*__: true if not a subproject
  * **rebuildBotCommand** (<code>string</code>)  The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch. __*Default*__: "rebuild"
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. __*Default*__: [ "main" ]
  * **releaseEveryCommit** (<code>boolean</code>)  Automatically release new versions every commit to one of branches in `releaseBranches`. __*Default*__: true
  * **releaseSchedule** (<code>string</code>)  CRON schedule to trigger new releases. __*Default*__: no scheduled releases
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. __*Default*__: false
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "main" when new versions are bumped. __*Default*__: true if not a subproject
  * **workflowBootstrapSteps** (<code>Array<any></code>)  Workflow steps to use in order to bootstrap this repo. __*Default*__: "yarn install --frozen-lockfile && yarn projen"
  * **workflowContainerImage** (<code>string</code>)  Container image to use for GitHub workflows. __*Default*__: default image
  * **workflowNodeVersion** (<code>string</code>)  The node version to use in GitHub workflows. __*Default*__: same as `minNodeVersion`
  * **sampleCode** (<code>boolean</code>)  Generate one-time sample in `pages/` and `public/` if there are no files there. __*Default*__: true
  * **srcdir** (<code>string</code>)  Typescript sources directory. __*Default*__: "src"



### Properties


Name | Type | Description 
-----|------|-------------
**assetsdir**🔹 | <code>string</code> | The directory in which app assets reside.
**srcdir**🔹 | <code>string</code> | The directory in which source files reside.
**tailwind**🔹 | <code>boolean</code> | Setup Tailwind as a PostCSS plugin.



## class NextJsTypeDef 🔹 <a id="projen-web-nextjstypedef"></a>



__Submodule__: web

__Extends__: [FileBase](#projen-filebase)

### Initializer




```ts
new web.NextJsTypeDef(project: NextJsTypeScriptProject, filePath: string, options?: NextJsTypeDefOptions)
```

* **project** (<code>[web.NextJsTypeScriptProject](#projen-web-nextjstypescriptproject)</code>)  *No description*
* **filePath** (<code>string</code>)  *No description*
* **options** (<code>[web.NextJsTypeDefOptions](#projen-web-nextjstypedefoptions)</code>)  *No description*
  * **committed** (<code>boolean</code>)  Indicates whether this file should be committed to git or ignored. __*Default*__: true
  * **editGitignore** (<code>boolean</code>)  Update the project's .gitignore file. __*Default*__: true
  * **executable** (<code>boolean</code>)  Whether the generated file should be marked as executable. __*Default*__: false
  * **readonly** (<code>boolean</code>)  Whether the generated file should be readonly. __*Default*__: true


### Methods


#### protected synthesizeContent(_)🔹 <a id="projen-web-nextjstypedef-synthesizecontent"></a>

Implemented by derived classes and returns the contents of the file to emit.

```ts
protected synthesizeContent(_: IResolver): string
```

* **_** (<code>[IResolver](#projen-iresolver)</code>)  *No description*

__Returns__:
* <code>string</code>



## class NextJsTypeScriptProject 🔹 <a id="projen-web-nextjstypescriptproject"></a>

Next.js project with TypeScript.

__Submodule__: web

__Extends__: [TypeScriptAppProject](#projen-typescriptappproject)

### Initializer




```ts
new web.NextJsTypeScriptProject(options: NextJsTypeScriptProjectOptions)
```

* **options** (<code>[web.NextJsTypeScriptProjectOptions](#projen-web-nextjstypescriptprojectoptions)</code>)  *No description*
  * **assetsdir** (<code>string</code>)  Assets directory. __*Default*__: "public"
  * **tailwind** (<code>boolean</code>)  Setup Tailwind CSS as a PostCSS plugin. __*Default*__: true
  * **name** (<code>string</code>)  This is the name of your project. 
  * **clobber** (<code>boolean</code>)  Add a `clobber` task which resets the repo to origin. __*Default*__: true
  * **devContainer** (<code>boolean</code>)  Add a VSCode development environment (used for GitHub Codespaces). __*Default*__: false
  * **gitpod** (<code>boolean</code>)  Add a Gitpod development environment. __*Default*__: false
  * **jsiiFqn** (<code>string</code>)  The JSII FQN (fully qualified name) of the project class. __*Default*__: undefined
  * **logging** (<code>[LoggerOptions](#projen-loggeroptions)</code>)  Configure logging options such as verbosity. __*Default*__: {}
  * **outdir** (<code>string</code>)  The root directory of the project. __*Default*__: "."
  * **parent** (<code>[Project](#projen-project)</code>)  The parent project, if this project is part of a bigger project. __*Optional*__
  * **projectType** (<code>[ProjectType](#projen-projecttype)</code>)  Which type of project this is (library/app). __*Default*__: ProjectType.UNKNOWN
  * **readme** (<code>[SampleReadmeProps](#projen-samplereadmeprops)</code>)  The README setup. __*Default*__: { filename: 'README.md', contents: '# replace this' }
  * **allowLibraryDependencies** (<code>boolean</code>)  Allow the project to include `peerDependencies` and `bundledDependencies`. __*Default*__: true
  * **authorEmail** (<code>string</code>)  Author's e-mail. __*Optional*__
  * **authorName** (<code>string</code>)  Author's name. __*Optional*__
  * **authorOrganization** (<code>boolean</code>)  Author's Organization. __*Optional*__
  * **authorUrl** (<code>string</code>)  Author's URL / Website. __*Optional*__
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. __*Default*__: true
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. __*Optional*__
  * **bundledDeps** (<code>Array<string></code>)  List of dependencies to bundle into this module. __*Optional*__
  * **deps** (<code>Array<string></code>)  Runtime dependencies of this module. __*Default*__: []
  * **description** (<code>string</code>)  The description is just a string that helps people understand the purpose of the package. __*Optional*__
  * **devDeps** (<code>Array<string></code>)  Build dependencies for this module. __*Default*__: []
  * **entrypoint** (<code>string</code>)  Module entrypoint (`main` in `package.json`). __*Default*__: "lib/index.js"
  * **homepage** (<code>string</code>)  Package's Homepage / Website. __*Optional*__
  * **keywords** (<code>Array<string></code>)  Keywords to include in `package.json`. __*Optional*__
  * **license** (<code>string</code>)  License's SPDX identifier. __*Default*__: "Apache-2.0"
  * **licensed** (<code>boolean</code>)  Indicates if a license should be added. __*Default*__: true
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). __*Default*__: no max
  * **minNodeVersion** (<code>string</code>)  Minimum Node.js version to require via package.json `engines` (inclusive). __*Default*__: no "engines" specified
  * **npmAccess** (<code>[NpmAccess](#projen-npmaccess)</code>)  Access level of the npm package. __*Default*__: for scoped packages (e.g. `foo@bar`), the default is `NpmAccess.RESTRICTED`, for non-scoped packages, the default is `NpmAccess.PUBLIC`.
  * **npmDistTag** (<code>string</code>)  Tags can be used to provide an alias instead of version numbers. __*Default*__: "latest"
  * **npmRegistry** (<code>string</code>)  The host name of the npm registry to publish to. __*Optional*__
  * **npmRegistryUrl** (<code>string</code>)  The base URL of the npm package registry. __*Default*__: "https://registry.npmjs.org"
  * **npmTaskExecution** (<code>[NpmTaskExecution](#projen-npmtaskexecution)</code>)  Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz). __*Default*__: NpmTaskExecution.PROJEN
  * **packageManager** (<code>[NodePackageManager](#projen-nodepackagemanager)</code>)  The Node Package Manager used to execute scripts. __*Default*__: NodePackageManager.YARN
  * **packageName** (<code>string</code>)  The "name" in package.json. __*Default*__: defaults to project name
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  Options for `peerDeps`. __*Optional*__
  * **peerDeps** (<code>Array<string></code>)  Peer dependencies for this module. __*Default*__: []
  * **projenCommand** (<code>string</code>)  The shell command to use in order to run the projen CLI. __*Default*__: "npx projen"
  * **repository** (<code>string</code>)  The repository is the location where the actual code for your package lives. __*Optional*__
  * **repositoryDirectory** (<code>string</code>)  If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives. __*Optional*__
  * **scripts** (<code>Map<string, string></code>)  npm scripts to include. __*Default*__: {}
  * **stability** (<code>string</code>)  Package's Stability. __*Optional*__
  * **defaultReleaseBranch** (<code>string</code>)  The name of the main release branch. 
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files on git. __*Default*__: true
  * **artifactsDirectory** (<code>string</code>)  A directory which will contain artifacts to be published to npm. __*Default*__: "dist"
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. __*Default*__: true if not a subproject
  * **codeCov** (<code>boolean</code>)  Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret. __*Default*__: false
  * **codeCovTokenSecret** (<code>string</code>)  Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories. __*Default*__: if this option is not specified, only public repositories are supported
  * **copyrightOwner** (<code>string</code>)  License copyright owner. __*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. __*Default*__: current year
  * **dependabot** (<code>boolean</code>)  Include dependabot configuration. __*Default*__: true
  * **dependabotOptions** (<code>[github.DependabotOptions](#projen-github-dependabotoptions)</code>)  Options for dependabot. __*Default*__: default options
  * **gitignore** (<code>Array<string></code>)  Additional entries to .gitignore. __*Optional*__
  * **jest** (<code>boolean</code>)  Setup jest unit tests. __*Default*__: true
  * **jestOptions** (<code>[JestOptions](#projen-jestoptions)</code>)  Jest options. __*Default*__: default options
  * **jsiiReleaseVersion** (<code>string</code>)  Version requirement of `jsii-release` which is used to publish modules to npm. __*Default*__: "latest"
  * **mergify** (<code>boolean</code>)  Adds mergify configuration. __*Default*__: true
  * **mergifyAutoMergeLabel** (<code>string</code>)  Automatically merge PRs that build successfully and have this label. __*Default*__: "auto-merge"
  * **mergifyOptions** (<code>[github.MergifyOptions](#projen-github-mergifyoptions)</code>)  Options for mergify. __*Default*__: default options
  * **npmignore** (<code>Array<string></code>)  Additional entries to .npmignore. __*Optional*__
  * **npmignoreEnabled** (<code>boolean</code>)  Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs. __*Default*__: true
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. __*Default*__: true
  * **projenUpgradeAutoMerge** (<code>boolean</code>)  Automatically merge projen upgrade PRs when build passes. __*Default*__: "true" if mergify auto-merge is enabled (default)
  * **projenUpgradeSchedule** (<code>Array<string></code>)  Customize the projenUpgrade schedule in cron expression. __*Default*__: [ "0 6 * * *" ]
  * **projenUpgradeSecret** (<code>string</code>)  Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`). __*Default*__: no automatic projen upgrade pull requests
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. __*Default*__: Semver.latest()
  * **pullRequestTemplate** (<code>boolean</code>)  Include a GitHub pull request template. __*Default*__: true
  * **pullRequestTemplateContents** (<code>string</code>)  The contents of the pull request template. __*Default*__: default content
  * **rebuildBot** (<code>boolean</code>)  Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request. __*Default*__: true if not a subproject
  * **rebuildBotCommand** (<code>string</code>)  The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch. __*Default*__: "rebuild"
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. __*Default*__: [ "main" ]
  * **releaseEveryCommit** (<code>boolean</code>)  Automatically release new versions every commit to one of branches in `releaseBranches`. __*Default*__: true
  * **releaseSchedule** (<code>string</code>)  CRON schedule to trigger new releases. __*Default*__: no scheduled releases
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. __*Default*__: false
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "main" when new versions are bumped. __*Default*__: true if not a subproject
  * **workflowBootstrapSteps** (<code>Array<any></code>)  Workflow steps to use in order to bootstrap this repo. __*Default*__: "yarn install --frozen-lockfile && yarn projen"
  * **workflowContainerImage** (<code>string</code>)  Container image to use for GitHub workflows. __*Default*__: default image
  * **workflowNodeVersion** (<code>string</code>)  The node version to use in GitHub workflows. __*Default*__: same as `minNodeVersion`
  * **compileBeforeTest** (<code>boolean</code>)  Compile the code before running tests. __*Default*__: if `testdir` is under `src/**`, the default is `true`, otherwise the default is `false.
  * **disableTsconfig** (<code>boolean</code>)  Do not generate a `tsconfig.json` file (used by jsii projects since tsconfig.json is generated by the jsii compiler). __*Default*__: false
  * **docgen** (<code>boolean</code>)  Docgen by Typedoc. __*Default*__: false
  * **docsDirectory** (<code>string</code>)  Docs directory. __*Default*__: "docs"
  * **entrypointTypes** (<code>string</code>)  The .d.ts file that includes the type declarations for this module. __*Default*__: .d.ts file derived from the project's entrypoint (usually lib/index.d.ts)
  * **eslint** (<code>boolean</code>)  Setup eslint. __*Default*__: true
  * **eslintOptions** (<code>[EslintOptions](#projen-eslintoptions)</code>)  Eslint options. __*Default*__: opinionated default options
  * **libdir** (<code>string</code>)  Typescript  artifacts output directory. __*Default*__: "lib"
  * **package** (<code>boolean</code>)  Defines a `yarn package` command that will produce a tarball and place it under `dist/js`. __*Default*__: true
  * **sampleCode** (<code>boolean</code>)  Generate one-time sample in `src/` and `test/` if there are no files there. __*Default*__: true
  * **srcdir** (<code>string</code>)  Typescript sources directory. __*Default*__: "src"
  * **testdir** (<code>string</code>)  Jest tests directory. Tests files should be named `xxx.test.ts`. __*Default*__: "test"
  * **tsconfig** (<code>[TypescriptConfigOptions](#projen-typescriptconfigoptions)</code>)  Custom TSConfig. __*Optional*__
  * **typescriptVersion** (<code>string</code>)  TypeScript version to use. __*Default*__: "latest"



### Properties


Name | Type | Description 
-----|------|-------------
**assetsdir**🔹 | <code>string</code> | The directory in which app assets reside.
**nextJsTypeDef**🔹 | <code>[web.NextJsTypeDef](#projen-web-nextjstypedef)</code> | TypeScript definition file included that ensures Next.js types are picked up by the TypeScript compiler.
**srcdir**🔹 | <code>string</code> | The directory in which source files reside.
**tailwind**🔹 | <code>boolean</code> | Setup Tailwind as a PostCSS plugin.



## class PostCss 🔹 <a id="projen-web-postcss"></a>

Declares a PostCSS dependency with a default config file.

__Submodule__: web


### Initializer




```ts
new web.PostCss(project: NodeProject, options?: PostCssOptions)
```

* **project** (<code>[NodeProject](#projen-nodeproject)</code>)  *No description*
* **options** (<code>[web.PostCssOptions](#projen-web-postcssoptions)</code>)  *No description*
  * **fileName** (<code>string</code>)  *No description* __*Default*__: "postcss.config.json"
  * **tailwind** (<code>boolean</code>)  Install Tailwind CSS as a PostCSS plugin. __*Default*__: true
  * **tailwindOptions** (<code>[web.TailwindConfigOptions](#projen-web-tailwindconfigoptions)</code>)  Tailwind CSS options. __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**file**🔹 | <code>[JsonFile](#projen-jsonfile)</code> | <span></span>
**fileName**🔹 | <code>string</code> | <span></span>
**tailwind**?🔹 | <code>[web.TailwindConfig](#projen-web-tailwindconfig)</code> | __*Optional*__



## class ReactComponent 🔹 <a id="projen-web-reactcomponent"></a>



__Submodule__: web

__Extends__: [Component](#projen-component)

### Initializer




```ts
new web.ReactComponent(project: NodeProject, options: ReactComponentOptions)
```

* **project** (<code>[NodeProject](#projen-nodeproject)</code>)  *No description*
* **options** (<code>[web.ReactComponentOptions](#projen-web-reactcomponentoptions)</code>)  *No description*
  * **typescript** (<code>boolean</code>)  Whether to apply options specific for TypeScript React projects. __*Default*__: false




## class ReactProject 🔹 <a id="projen-web-reactproject"></a>

React project without TypeScript.

__Submodule__: web

__Extends__: [NodeProject](#projen-nodeproject)

### Initializer




```ts
new web.ReactProject(options: ReactProjectOptions)
```

* **options** (<code>[web.ReactProjectOptions](#projen-web-reactprojectoptions)</code>)  *No description*
  * **name** (<code>string</code>)  This is the name of your project. 
  * **clobber** (<code>boolean</code>)  Add a `clobber` task which resets the repo to origin. __*Default*__: true
  * **devContainer** (<code>boolean</code>)  Add a VSCode development environment (used for GitHub Codespaces). __*Default*__: false
  * **gitpod** (<code>boolean</code>)  Add a Gitpod development environment. __*Default*__: false
  * **jsiiFqn** (<code>string</code>)  The JSII FQN (fully qualified name) of the project class. __*Default*__: undefined
  * **logging** (<code>[LoggerOptions](#projen-loggeroptions)</code>)  Configure logging options such as verbosity. __*Default*__: {}
  * **outdir** (<code>string</code>)  The root directory of the project. __*Default*__: "."
  * **parent** (<code>[Project](#projen-project)</code>)  The parent project, if this project is part of a bigger project. __*Optional*__
  * **projectType** (<code>[ProjectType](#projen-projecttype)</code>)  Which type of project this is (library/app). __*Default*__: ProjectType.UNKNOWN
  * **readme** (<code>[SampleReadmeProps](#projen-samplereadmeprops)</code>)  The README setup. __*Default*__: { filename: 'README.md', contents: '# replace this' }
  * **allowLibraryDependencies** (<code>boolean</code>)  Allow the project to include `peerDependencies` and `bundledDependencies`. __*Default*__: true
  * **authorEmail** (<code>string</code>)  Author's e-mail. __*Optional*__
  * **authorName** (<code>string</code>)  Author's name. __*Optional*__
  * **authorOrganization** (<code>boolean</code>)  Author's Organization. __*Optional*__
  * **authorUrl** (<code>string</code>)  Author's URL / Website. __*Optional*__
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. __*Default*__: true
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. __*Optional*__
  * **bundledDeps** (<code>Array<string></code>)  List of dependencies to bundle into this module. __*Optional*__
  * **deps** (<code>Array<string></code>)  Runtime dependencies of this module. __*Default*__: []
  * **description** (<code>string</code>)  The description is just a string that helps people understand the purpose of the package. __*Optional*__
  * **devDeps** (<code>Array<string></code>)  Build dependencies for this module. __*Default*__: []
  * **entrypoint** (<code>string</code>)  Module entrypoint (`main` in `package.json`). __*Default*__: "lib/index.js"
  * **homepage** (<code>string</code>)  Package's Homepage / Website. __*Optional*__
  * **keywords** (<code>Array<string></code>)  Keywords to include in `package.json`. __*Optional*__
  * **license** (<code>string</code>)  License's SPDX identifier. __*Default*__: "Apache-2.0"
  * **licensed** (<code>boolean</code>)  Indicates if a license should be added. __*Default*__: true
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). __*Default*__: no max
  * **minNodeVersion** (<code>string</code>)  Minimum Node.js version to require via package.json `engines` (inclusive). __*Default*__: no "engines" specified
  * **npmAccess** (<code>[NpmAccess](#projen-npmaccess)</code>)  Access level of the npm package. __*Default*__: for scoped packages (e.g. `foo@bar`), the default is `NpmAccess.RESTRICTED`, for non-scoped packages, the default is `NpmAccess.PUBLIC`.
  * **npmDistTag** (<code>string</code>)  Tags can be used to provide an alias instead of version numbers. __*Default*__: "latest"
  * **npmRegistry** (<code>string</code>)  The host name of the npm registry to publish to. __*Optional*__
  * **npmRegistryUrl** (<code>string</code>)  The base URL of the npm package registry. __*Default*__: "https://registry.npmjs.org"
  * **npmTaskExecution** (<code>[NpmTaskExecution](#projen-npmtaskexecution)</code>)  Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz). __*Default*__: NpmTaskExecution.PROJEN
  * **packageManager** (<code>[NodePackageManager](#projen-nodepackagemanager)</code>)  The Node Package Manager used to execute scripts. __*Default*__: NodePackageManager.YARN
  * **packageName** (<code>string</code>)  The "name" in package.json. __*Default*__: defaults to project name
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  Options for `peerDeps`. __*Optional*__
  * **peerDeps** (<code>Array<string></code>)  Peer dependencies for this module. __*Default*__: []
  * **projenCommand** (<code>string</code>)  The shell command to use in order to run the projen CLI. __*Default*__: "npx projen"
  * **repository** (<code>string</code>)  The repository is the location where the actual code for your package lives. __*Optional*__
  * **repositoryDirectory** (<code>string</code>)  If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives. __*Optional*__
  * **scripts** (<code>Map<string, string></code>)  npm scripts to include. __*Default*__: {}
  * **stability** (<code>string</code>)  Package's Stability. __*Optional*__
  * **defaultReleaseBranch** (<code>string</code>)  The name of the main release branch. 
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files on git. __*Default*__: true
  * **artifactsDirectory** (<code>string</code>)  A directory which will contain artifacts to be published to npm. __*Default*__: "dist"
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. __*Default*__: true if not a subproject
  * **codeCov** (<code>boolean</code>)  Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret. __*Default*__: false
  * **codeCovTokenSecret** (<code>string</code>)  Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories. __*Default*__: if this option is not specified, only public repositories are supported
  * **copyrightOwner** (<code>string</code>)  License copyright owner. __*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. __*Default*__: current year
  * **dependabot** (<code>boolean</code>)  Include dependabot configuration. __*Default*__: true
  * **dependabotOptions** (<code>[github.DependabotOptions](#projen-github-dependabotoptions)</code>)  Options for dependabot. __*Default*__: default options
  * **gitignore** (<code>Array<string></code>)  Additional entries to .gitignore. __*Optional*__
  * **jest** (<code>boolean</code>)  Setup jest unit tests. __*Default*__: true
  * **jestOptions** (<code>[JestOptions](#projen-jestoptions)</code>)  Jest options. __*Default*__: default options
  * **jsiiReleaseVersion** (<code>string</code>)  Version requirement of `jsii-release` which is used to publish modules to npm. __*Default*__: "latest"
  * **mergify** (<code>boolean</code>)  Adds mergify configuration. __*Default*__: true
  * **mergifyAutoMergeLabel** (<code>string</code>)  Automatically merge PRs that build successfully and have this label. __*Default*__: "auto-merge"
  * **mergifyOptions** (<code>[github.MergifyOptions](#projen-github-mergifyoptions)</code>)  Options for mergify. __*Default*__: default options
  * **npmignore** (<code>Array<string></code>)  Additional entries to .npmignore. __*Optional*__
  * **npmignoreEnabled** (<code>boolean</code>)  Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs. __*Default*__: true
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. __*Default*__: true
  * **projenUpgradeAutoMerge** (<code>boolean</code>)  Automatically merge projen upgrade PRs when build passes. __*Default*__: "true" if mergify auto-merge is enabled (default)
  * **projenUpgradeSchedule** (<code>Array<string></code>)  Customize the projenUpgrade schedule in cron expression. __*Default*__: [ "0 6 * * *" ]
  * **projenUpgradeSecret** (<code>string</code>)  Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`). __*Default*__: no automatic projen upgrade pull requests
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. __*Default*__: Semver.latest()
  * **pullRequestTemplate** (<code>boolean</code>)  Include a GitHub pull request template. __*Default*__: true
  * **pullRequestTemplateContents** (<code>string</code>)  The contents of the pull request template. __*Default*__: default content
  * **rebuildBot** (<code>boolean</code>)  Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request. __*Default*__: true if not a subproject
  * **rebuildBotCommand** (<code>string</code>)  The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch. __*Default*__: "rebuild"
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. __*Default*__: [ "main" ]
  * **releaseEveryCommit** (<code>boolean</code>)  Automatically release new versions every commit to one of branches in `releaseBranches`. __*Default*__: true
  * **releaseSchedule** (<code>string</code>)  CRON schedule to trigger new releases. __*Default*__: no scheduled releases
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. __*Default*__: false
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "main" when new versions are bumped. __*Default*__: true if not a subproject
  * **workflowBootstrapSteps** (<code>Array<any></code>)  Workflow steps to use in order to bootstrap this repo. __*Default*__: "yarn install --frozen-lockfile && yarn projen"
  * **workflowContainerImage** (<code>string</code>)  Container image to use for GitHub workflows. __*Default*__: default image
  * **workflowNodeVersion** (<code>string</code>)  The node version to use in GitHub workflows. __*Default*__: same as `minNodeVersion`
  * **sampleCode** (<code>boolean</code>)  Generate one-time sample in `src/` and `public/` if there are no files there. __*Default*__: true
  * **srcdir** (<code>string</code>)  Source directory. __*Default*__: "src"



### Properties


Name | Type | Description 
-----|------|-------------
**srcdir**🔹 | <code>string</code> | The directory in which source files reside.



## class ReactTypeDef 🔹 <a id="projen-web-reacttypedef"></a>



__Submodule__: web

__Extends__: [FileBase](#projen-filebase)

### Initializer




```ts
new web.ReactTypeDef(project: ReactTypeScriptProject, filePath: string, options?: ReactTypeDefOptions)
```

* **project** (<code>[web.ReactTypeScriptProject](#projen-web-reacttypescriptproject)</code>)  *No description*
* **filePath** (<code>string</code>)  *No description*
* **options** (<code>[web.ReactTypeDefOptions](#projen-web-reacttypedefoptions)</code>)  *No description*
  * **committed** (<code>boolean</code>)  Indicates whether this file should be committed to git or ignored. __*Default*__: true
  * **editGitignore** (<code>boolean</code>)  Update the project's .gitignore file. __*Default*__: true
  * **executable** (<code>boolean</code>)  Whether the generated file should be marked as executable. __*Default*__: false
  * **readonly** (<code>boolean</code>)  Whether the generated file should be readonly. __*Default*__: true


### Methods


#### protected synthesizeContent(_)🔹 <a id="projen-web-reacttypedef-synthesizecontent"></a>

Implemented by derived classes and returns the contents of the file to emit.

```ts
protected synthesizeContent(_: IResolver): string
```

* **_** (<code>[IResolver](#projen-iresolver)</code>)  *No description*

__Returns__:
* <code>string</code>



## class ReactTypeScriptProject 🔹 <a id="projen-web-reacttypescriptproject"></a>

React project with TypeScript.

__Submodule__: web

__Extends__: [TypeScriptAppProject](#projen-typescriptappproject)

### Initializer




```ts
new web.ReactTypeScriptProject(options: ReactTypeScriptProjectOptions)
```

* **options** (<code>[web.ReactTypeScriptProjectOptions](#projen-web-reacttypescriptprojectoptions)</code>)  *No description*
  * **name** (<code>string</code>)  This is the name of your project. 
  * **clobber** (<code>boolean</code>)  Add a `clobber` task which resets the repo to origin. __*Default*__: true
  * **devContainer** (<code>boolean</code>)  Add a VSCode development environment (used for GitHub Codespaces). __*Default*__: false
  * **gitpod** (<code>boolean</code>)  Add a Gitpod development environment. __*Default*__: false
  * **jsiiFqn** (<code>string</code>)  The JSII FQN (fully qualified name) of the project class. __*Default*__: undefined
  * **logging** (<code>[LoggerOptions](#projen-loggeroptions)</code>)  Configure logging options such as verbosity. __*Default*__: {}
  * **outdir** (<code>string</code>)  The root directory of the project. __*Default*__: "."
  * **parent** (<code>[Project](#projen-project)</code>)  The parent project, if this project is part of a bigger project. __*Optional*__
  * **projectType** (<code>[ProjectType](#projen-projecttype)</code>)  Which type of project this is (library/app). __*Default*__: ProjectType.UNKNOWN
  * **readme** (<code>[SampleReadmeProps](#projen-samplereadmeprops)</code>)  The README setup. __*Default*__: { filename: 'README.md', contents: '# replace this' }
  * **allowLibraryDependencies** (<code>boolean</code>)  Allow the project to include `peerDependencies` and `bundledDependencies`. __*Default*__: true
  * **authorEmail** (<code>string</code>)  Author's e-mail. __*Optional*__
  * **authorName** (<code>string</code>)  Author's name. __*Optional*__
  * **authorOrganization** (<code>boolean</code>)  Author's Organization. __*Optional*__
  * **authorUrl** (<code>string</code>)  Author's URL / Website. __*Optional*__
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. __*Default*__: true
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. __*Optional*__
  * **bundledDeps** (<code>Array<string></code>)  List of dependencies to bundle into this module. __*Optional*__
  * **deps** (<code>Array<string></code>)  Runtime dependencies of this module. __*Default*__: []
  * **description** (<code>string</code>)  The description is just a string that helps people understand the purpose of the package. __*Optional*__
  * **devDeps** (<code>Array<string></code>)  Build dependencies for this module. __*Default*__: []
  * **entrypoint** (<code>string</code>)  Module entrypoint (`main` in `package.json`). __*Default*__: "lib/index.js"
  * **homepage** (<code>string</code>)  Package's Homepage / Website. __*Optional*__
  * **keywords** (<code>Array<string></code>)  Keywords to include in `package.json`. __*Optional*__
  * **license** (<code>string</code>)  License's SPDX identifier. __*Default*__: "Apache-2.0"
  * **licensed** (<code>boolean</code>)  Indicates if a license should be added. __*Default*__: true
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). __*Default*__: no max
  * **minNodeVersion** (<code>string</code>)  Minimum Node.js version to require via package.json `engines` (inclusive). __*Default*__: no "engines" specified
  * **npmAccess** (<code>[NpmAccess](#projen-npmaccess)</code>)  Access level of the npm package. __*Default*__: for scoped packages (e.g. `foo@bar`), the default is `NpmAccess.RESTRICTED`, for non-scoped packages, the default is `NpmAccess.PUBLIC`.
  * **npmDistTag** (<code>string</code>)  Tags can be used to provide an alias instead of version numbers. __*Default*__: "latest"
  * **npmRegistry** (<code>string</code>)  The host name of the npm registry to publish to. __*Optional*__
  * **npmRegistryUrl** (<code>string</code>)  The base URL of the npm package registry. __*Default*__: "https://registry.npmjs.org"
  * **npmTaskExecution** (<code>[NpmTaskExecution](#projen-npmtaskexecution)</code>)  Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz). __*Default*__: NpmTaskExecution.PROJEN
  * **packageManager** (<code>[NodePackageManager](#projen-nodepackagemanager)</code>)  The Node Package Manager used to execute scripts. __*Default*__: NodePackageManager.YARN
  * **packageName** (<code>string</code>)  The "name" in package.json. __*Default*__: defaults to project name
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  Options for `peerDeps`. __*Optional*__
  * **peerDeps** (<code>Array<string></code>)  Peer dependencies for this module. __*Default*__: []
  * **projenCommand** (<code>string</code>)  The shell command to use in order to run the projen CLI. __*Default*__: "npx projen"
  * **repository** (<code>string</code>)  The repository is the location where the actual code for your package lives. __*Optional*__
  * **repositoryDirectory** (<code>string</code>)  If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives. __*Optional*__
  * **scripts** (<code>Map<string, string></code>)  npm scripts to include. __*Default*__: {}
  * **stability** (<code>string</code>)  Package's Stability. __*Optional*__
  * **defaultReleaseBranch** (<code>string</code>)  The name of the main release branch. 
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files on git. __*Default*__: true
  * **artifactsDirectory** (<code>string</code>)  A directory which will contain artifacts to be published to npm. __*Default*__: "dist"
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. __*Default*__: true if not a subproject
  * **codeCov** (<code>boolean</code>)  Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret. __*Default*__: false
  * **codeCovTokenSecret** (<code>string</code>)  Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories. __*Default*__: if this option is not specified, only public repositories are supported
  * **copyrightOwner** (<code>string</code>)  License copyright owner. __*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. __*Default*__: current year
  * **dependabot** (<code>boolean</code>)  Include dependabot configuration. __*Default*__: true
  * **dependabotOptions** (<code>[github.DependabotOptions](#projen-github-dependabotoptions)</code>)  Options for dependabot. __*Default*__: default options
  * **gitignore** (<code>Array<string></code>)  Additional entries to .gitignore. __*Optional*__
  * **jest** (<code>boolean</code>)  Setup jest unit tests. __*Default*__: true
  * **jestOptions** (<code>[JestOptions](#projen-jestoptions)</code>)  Jest options. __*Default*__: default options
  * **jsiiReleaseVersion** (<code>string</code>)  Version requirement of `jsii-release` which is used to publish modules to npm. __*Default*__: "latest"
  * **mergify** (<code>boolean</code>)  Adds mergify configuration. __*Default*__: true
  * **mergifyAutoMergeLabel** (<code>string</code>)  Automatically merge PRs that build successfully and have this label. __*Default*__: "auto-merge"
  * **mergifyOptions** (<code>[github.MergifyOptions](#projen-github-mergifyoptions)</code>)  Options for mergify. __*Default*__: default options
  * **npmignore** (<code>Array<string></code>)  Additional entries to .npmignore. __*Optional*__
  * **npmignoreEnabled** (<code>boolean</code>)  Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs. __*Default*__: true
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. __*Default*__: true
  * **projenUpgradeAutoMerge** (<code>boolean</code>)  Automatically merge projen upgrade PRs when build passes. __*Default*__: "true" if mergify auto-merge is enabled (default)
  * **projenUpgradeSchedule** (<code>Array<string></code>)  Customize the projenUpgrade schedule in cron expression. __*Default*__: [ "0 6 * * *" ]
  * **projenUpgradeSecret** (<code>string</code>)  Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`). __*Default*__: no automatic projen upgrade pull requests
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. __*Default*__: Semver.latest()
  * **pullRequestTemplate** (<code>boolean</code>)  Include a GitHub pull request template. __*Default*__: true
  * **pullRequestTemplateContents** (<code>string</code>)  The contents of the pull request template. __*Default*__: default content
  * **rebuildBot** (<code>boolean</code>)  Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request. __*Default*__: true if not a subproject
  * **rebuildBotCommand** (<code>string</code>)  The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch. __*Default*__: "rebuild"
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. __*Default*__: [ "main" ]
  * **releaseEveryCommit** (<code>boolean</code>)  Automatically release new versions every commit to one of branches in `releaseBranches`. __*Default*__: true
  * **releaseSchedule** (<code>string</code>)  CRON schedule to trigger new releases. __*Default*__: no scheduled releases
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. __*Default*__: false
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "main" when new versions are bumped. __*Default*__: true if not a subproject
  * **workflowBootstrapSteps** (<code>Array<any></code>)  Workflow steps to use in order to bootstrap this repo. __*Default*__: "yarn install --frozen-lockfile && yarn projen"
  * **workflowContainerImage** (<code>string</code>)  Container image to use for GitHub workflows. __*Default*__: default image
  * **workflowNodeVersion** (<code>string</code>)  The node version to use in GitHub workflows. __*Default*__: same as `minNodeVersion`
  * **compileBeforeTest** (<code>boolean</code>)  Compile the code before running tests. __*Default*__: if `testdir` is under `src/**`, the default is `true`, otherwise the default is `false.
  * **disableTsconfig** (<code>boolean</code>)  Do not generate a `tsconfig.json` file (used by jsii projects since tsconfig.json is generated by the jsii compiler). __*Default*__: false
  * **docgen** (<code>boolean</code>)  Docgen by Typedoc. __*Default*__: false
  * **docsDirectory** (<code>string</code>)  Docs directory. __*Default*__: "docs"
  * **entrypointTypes** (<code>string</code>)  The .d.ts file that includes the type declarations for this module. __*Default*__: .d.ts file derived from the project's entrypoint (usually lib/index.d.ts)
  * **eslint** (<code>boolean</code>)  Setup eslint. __*Default*__: true
  * **eslintOptions** (<code>[EslintOptions](#projen-eslintoptions)</code>)  Eslint options. __*Default*__: opinionated default options
  * **libdir** (<code>string</code>)  Typescript  artifacts output directory. __*Default*__: "lib"
  * **package** (<code>boolean</code>)  Defines a `yarn package` command that will produce a tarball and place it under `dist/js`. __*Default*__: true
  * **sampleCode** (<code>boolean</code>)  Generate one-time sample in `src/` and `test/` if there are no files there. __*Default*__: true
  * **srcdir** (<code>string</code>)  Typescript sources directory. __*Default*__: "src"
  * **testdir** (<code>string</code>)  Jest tests directory. Tests files should be named `xxx.test.ts`. __*Default*__: "test"
  * **tsconfig** (<code>[TypescriptConfigOptions](#projen-typescriptconfigoptions)</code>)  Custom TSConfig. __*Optional*__
  * **typescriptVersion** (<code>string</code>)  TypeScript version to use. __*Default*__: "latest"



### Properties


Name | Type | Description 
-----|------|-------------
**reactTypeDef**🔹 | <code>[web.ReactTypeDef](#projen-web-reacttypedef)</code> | TypeScript definition file included that ensures React types are picked up by the TypeScript compiler.
**srcdir**🔹 | <code>string</code> | The directory in which source files reside.



## class TailwindConfig 🔹 <a id="projen-web-tailwindconfig"></a>

Declares a Tailwind CSS configuration file.

There are multiple ways to add Tailwind CSS in your node project - see:
https://tailwindcss.com/docs/installation

__Submodule__: web


### Initializer




```ts
new web.TailwindConfig(project: NodeProject, options?: TailwindConfigOptions)
```

* **project** (<code>[NodeProject](#projen-nodeproject)</code>)  *No description*
* **options** (<code>[web.TailwindConfigOptions](#projen-web-tailwindconfigoptions)</code>)  *No description*
  * **fileName** (<code>string</code>)  *No description* __*Default*__: "tailwind.config.json"



### Properties


Name | Type | Description 
-----|------|-------------
**file**🔹 | <code>[JsonFile](#projen-jsonfile)</code> | <span></span>
**fileName**🔹 | <code>string</code> | <span></span>



## struct AwsCdkConstructLibraryOptions 🔹 <a id="projen-awscdkconstructlibraryoptions"></a>


Options for the construct-lib-aws project.



Name | Type | Description 
-----|------|-------------
**author**🔹 | <code>string</code> | The name of the library author.
**authorAddress**🔹 | <code>string</code> | Email or URL of the library author.
**cdkVersion**🔹 | <code>string</code> | Minimum target version this library is tested against.
**defaultReleaseBranch**🔹 | <code>string</code> | The name of the main release branch.
**name**🔹 | <code>string</code> | This is the name of your project.
**repositoryUrl**🔹 | <code>string</code> | Git repository URL.
**allowLibraryDependencies**?🔹 | <code>boolean</code> | Allow the project to include `peerDependencies` and `bundledDependencies`.<br/>__*Default*__: true
**antitamper**?🔹 | <code>boolean</code> | Checks that after build there are no modified files on git.<br/>__*Default*__: true
**artifactsDirectory**?🔹 | <code>string</code> | A directory which will contain artifacts to be published to npm.<br/>__*Default*__: "dist"
**authorEmail**?🔹 | <code>string</code> | Author's e-mail.<br/>__*Optional*__
**authorName**?🔹 | <code>string</code> | Author's name.<br/>__*Optional*__
**authorOrganization**?🔹 | <code>boolean</code> | Author's Organization.<br/>__*Optional*__
**authorUrl**?🔹 | <code>string</code> | Author's URL / Website.<br/>__*Optional*__
**autoDetectBin**?🔹 | <code>boolean</code> | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.<br/>__*Default*__: true
**bin**?🔹 | <code>Map<string, string></code> | Binary programs vended with your module.<br/>__*Optional*__
**buildWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/>__*Default*__: true if not a subproject
**bundledDeps**?🔹 | <code>Array<string></code> | List of dependencies to bundle into this module.<br/>__*Optional*__
**catalog**?🔹 | <code>[Catalog](#projen-catalog)</code> | Libraries will be picked up by the construct catalog when they are published to npm as jsii modules and will be published under:.<br/>__*Default*__: new version will be announced
**cdkAssert**?🔹 | <code>boolean</code> | Install the @aws-cdk/assert library?<br/>__*Default*__: true
**cdkDependencies**?🔹 | <code>Array<string></code> | Which AWS CDK modules (those that start with "@aws-cdk/") does this library require when consumed?<br/>__*Optional*__
**cdkDependenciesAsDeps**?🔹 | <code>boolean</code> | If this is enabled (default), all modules declared in `cdkDependencies` will be also added as normal `dependencies` (as well as `peerDependencies`).<br/>__*Default*__: true
**cdkTestDependencies**?🔹 | <code>Array<string></code> | AWS CDK modules required for testing.<br/>__*Optional*__
**cdkVersionPinning**?🔹 | <code>boolean</code> | Use pinned version instead of caret version for CDK.<br/>__*Default*__: false
**clobber**?🔹 | <code>boolean</code> | Add a `clobber` task which resets the repo to origin.<br/>__*Default*__: true
**codeCov**?🔹 | <code>boolean</code> | Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret.<br/>__*Default*__: false
**codeCovTokenSecret**?🔹 | <code>string</code> | Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories.<br/>__*Default*__: if this option is not specified, only public repositories are supported
**compat**?🔹 | <code>boolean</code> | Automatically run API compatibility test against the latest version published to npm after compilation.<br/>__*Default*__: false
**compatIgnore**?🔹 | <code>string</code> | Name of the ignore file for API compatibility tests.<br/>__*Default*__: ".compatignore"
**copyrightOwner**?🔹 | <code>string</code> | License copyright owner.<br/>__*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?🔹 | <code>string</code> | The copyright years to put in the LICENSE file.<br/>__*Default*__: current year
**dependabot**?🔹 | <code>boolean</code> | Include dependabot configuration.<br/>__*Default*__: true
**dependabotOptions**?🔹 | <code>[github.DependabotOptions](#projen-github-dependabotoptions)</code> | Options for dependabot.<br/>__*Default*__: default options
**deps**?🔹 | <code>Array<string></code> | Runtime dependencies of this module.<br/>__*Default*__: []
**description**?🔹 | <code>string</code> | The description is just a string that helps people understand the purpose of the package.<br/>__*Optional*__
**devContainer**?🔹 | <code>boolean</code> | Add a VSCode development environment (used for GitHub Codespaces).<br/>__*Default*__: false
**devDeps**?🔹 | <code>Array<string></code> | Build dependencies for this module.<br/>__*Default*__: []
**docgen**?🔹 | <code>boolean</code> | Automatically generate API.md from jsii.<br/>__*Default*__: true
**dotnet**?⚠️ | <code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code> | __*Optional*__
**entrypoint**?🔹 | <code>string</code> | Module entrypoint (`main` in `package.json`).<br/>__*Default*__: "lib/index.js"
**eslint**?🔹 | <code>boolean</code> | Install eslint.<br/>__*Default*__: true
**eslintOptions**?🔹 | <code>[EslintOptions](#projen-eslintoptions)</code> | Eslint options.<br/>__*Default*__: opinionated default options
**excludeTypescript**?🔹 | <code>Array<string></code> | Accepts a list of glob patterns.<br/>__*Optional*__
**gitignore**?🔹 | <code>Array<string></code> | Additional entries to .gitignore.<br/>__*Optional*__
**gitpod**?🔹 | <code>boolean</code> | Add a Gitpod development environment.<br/>__*Default*__: false
**homepage**?🔹 | <code>string</code> | Package's Homepage / Website.<br/>__*Optional*__
**jest**?🔹 | <code>boolean</code> | Setup jest unit tests.<br/>__*Default*__: true
**jestOptions**?🔹 | <code>[JestOptions](#projen-jestoptions)</code> | Jest options.<br/>__*Default*__: default options
**jsiiFqn**?🔹 | <code>string</code> | The JSII FQN (fully qualified name) of the project class.<br/>__*Default*__: undefined
**jsiiReleaseVersion**?🔹 | <code>string</code> | Version requirement of `jsii-release` which is used to publish modules to npm.<br/>__*Default*__: "latest"
**keywords**?🔹 | <code>Array<string></code> | Keywords to include in `package.json`.<br/>__*Optional*__
**license**?🔹 | <code>string</code> | License's SPDX identifier.<br/>__*Default*__: "Apache-2.0"
**licensed**?🔹 | <code>boolean</code> | Indicates if a license should be added.<br/>__*Default*__: true
**logging**?🔹 | <code>[LoggerOptions](#projen-loggeroptions)</code> | Configure logging options such as verbosity.<br/>__*Default*__: {}
**maxNodeVersion**?🔹 | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/>__*Default*__: no max
**mergify**?🔹 | <code>boolean</code> | Adds mergify configuration.<br/>__*Default*__: true
**mergifyAutoMergeLabel**?🔹 | <code>string</code> | Automatically merge PRs that build successfully and have this label.<br/>__*Default*__: "auto-merge"
**mergifyOptions**?🔹 | <code>[github.MergifyOptions](#projen-github-mergifyoptions)</code> | Options for mergify.<br/>__*Default*__: default options
**minNodeVersion**?🔹 | <code>string</code> | Minimum Node.js version to require via package.json `engines` (inclusive).<br/>__*Default*__: no "engines" specified
**npmAccess**?🔹 | <code>[NpmAccess](#projen-npmaccess)</code> | Access level of the npm package.<br/>__*Default*__: for scoped packages (e.g. `foo@bar`), the default is `NpmAccess.RESTRICTED`, for non-scoped packages, the default is `NpmAccess.PUBLIC`.
**npmDistTag**?🔹 | <code>string</code> | Tags can be used to provide an alias instead of version numbers.<br/>__*Default*__: "latest"
**npmRegistry**?⚠️ | <code>string</code> | The host name of the npm registry to publish to.<br/>__*Optional*__
**npmRegistryUrl**?🔹 | <code>string</code> | The base URL of the npm package registry.<br/>__*Default*__: "https://registry.npmjs.org"
**npmTaskExecution**?🔹 | <code>[NpmTaskExecution](#projen-npmtaskexecution)</code> | Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz).<br/>__*Default*__: NpmTaskExecution.PROJEN
**npmignore**?🔹 | <code>Array<string></code> | Additional entries to .npmignore.<br/>__*Optional*__
**npmignoreEnabled**?🔹 | <code>boolean</code> | Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs.<br/>__*Default*__: true
**outdir**?🔹 | <code>string</code> | The root directory of the project.<br/>__*Default*__: "."
**packageManager**?🔹 | <code>[NodePackageManager](#projen-nodepackagemanager)</code> | The Node Package Manager used to execute scripts.<br/>__*Default*__: NodePackageManager.YARN
**packageName**?🔹 | <code>string</code> | The "name" in package.json.<br/>__*Default*__: defaults to project name
**parent**?🔹 | <code>[Project](#projen-project)</code> | The parent project, if this project is part of a bigger project.<br/>__*Optional*__
**peerDependencyOptions**?🔹 | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | Options for `peerDeps`.<br/>__*Optional*__
**peerDeps**?🔹 | <code>Array<string></code> | Peer dependencies for this module.<br/>__*Default*__: []
**projectType**?🔹 | <code>[ProjectType](#projen-projecttype)</code> | Which type of project this is (library/app).<br/>__*Default*__: ProjectType.UNKNOWN
**projenCommand**?🔹 | <code>string</code> | The shell command to use in order to run the projen CLI.<br/>__*Default*__: "npx projen"
**projenDevDependency**?🔹 | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/>__*Default*__: true
**projenUpgradeAutoMerge**?🔹 | <code>boolean</code> | Automatically merge projen upgrade PRs when build passes.<br/>__*Default*__: "true" if mergify auto-merge is enabled (default)
**projenUpgradeSchedule**?🔹 | <code>Array<string></code> | Customize the projenUpgrade schedule in cron expression.<br/>__*Default*__: [ "0 6 * * *" ]
**projenUpgradeSecret**?🔹 | <code>string</code> | Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`).<br/>__*Default*__: no automatic projen upgrade pull requests
**projenVersion**?🔹 | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/>__*Default*__: Semver.latest()
**publishToGo**?🔹 | <code>[JsiiGoTarget](#projen-jsiigotarget)</code> | Publish Go bindings to a git repository.<br/>__*Default*__: no publishing
**publishToMaven**?🔹 | <code>[JsiiJavaTarget](#projen-jsiijavatarget)</code> | Publish to maven.<br/>__*Default*__: no publishing
**publishToNuget**?🔹 | <code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code> | Publish to NuGet.<br/>__*Default*__: no publishing
**publishToPypi**?🔹 | <code>[JsiiPythonTarget](#projen-jsiipythontarget)</code> | Publish to pypi.<br/>__*Default*__: no publishing
**pullRequestTemplate**?🔹 | <code>boolean</code> | Include a GitHub pull request template.<br/>__*Default*__: true
**pullRequestTemplateContents**?🔹 | <code>string</code> | The contents of the pull request template.<br/>__*Default*__: default content
**python**?⚠️ | <code>[JsiiPythonTarget](#projen-jsiipythontarget)</code> | __*Optional*__
**readme**?🔹 | <code>[SampleReadmeProps](#projen-samplereadmeprops)</code> | The README setup.<br/>__*Default*__: { filename: 'README.md', contents: '# replace this' }
**rebuildBot**?🔹 | <code>boolean</code> | Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request.<br/>__*Default*__: true if not a subproject
**rebuildBotCommand**?🔹 | <code>string</code> | The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch.<br/>__*Default*__: "rebuild"
**releaseBranches**?🔹 | <code>Array<string></code> | Branches which trigger a release.<br/>__*Default*__: [ "main" ]
**releaseEveryCommit**?🔹 | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`.<br/>__*Default*__: true
**releaseSchedule**?🔹 | <code>string</code> | CRON schedule to trigger new releases.<br/>__*Default*__: no scheduled releases
**releaseToNpm**?🔹 | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/>__*Default*__: false
**releaseWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for releasing from "main" when new versions are bumped.<br/>__*Default*__: true if not a subproject
**repository**?🔹 | <code>string</code> | The repository is the location where the actual code for your package lives.<br/>__*Optional*__
**repositoryDirectory**?🔹 | <code>string</code> | If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives.<br/>__*Optional*__
**rootdir**?🔹 | <code>string</code> | __*Default*__: "."
**sampleCode**?🔹 | <code>boolean</code> | Generate one-time sample in `src/` and `test/` if there are no files there.<br/>__*Default*__: true
**scripts**?🔹 | <code>Map<string, string></code> | npm scripts to include.<br/>__*Default*__: {}
**stability**?🔹 | <code>string</code> | Package's Stability.<br/>__*Optional*__
**workflowBootstrapSteps**?🔹 | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/>__*Default*__: "yarn install --frozen-lockfile && yarn projen"
**workflowContainerImage**?🔹 | <code>string</code> | Container image to use for GitHub workflows.<br/>__*Default*__: default image
**workflowNodeVersion**?🔹 | <code>string</code> | The node version to use in GitHub workflows.<br/>__*Default*__: same as `minNodeVersion`



## struct AwsCdkTypeScriptAppOptions 🔹 <a id="projen-awscdktypescriptappoptions"></a>






Name | Type | Description 
-----|------|-------------
**cdkVersion**🔹 | <code>string</code> | AWS CDK version to use.
**defaultReleaseBranch**🔹 | <code>string</code> | The name of the main release branch.
**name**🔹 | <code>string</code> | This is the name of your project.
**allowLibraryDependencies**?🔹 | <code>boolean</code> | Allow the project to include `peerDependencies` and `bundledDependencies`.<br/>__*Default*__: true
**antitamper**?🔹 | <code>boolean</code> | Checks that after build there are no modified files on git.<br/>__*Default*__: true
**appEntrypoint**?🔹 | <code>string</code> | The CDK app's entrypoint (relative to the source directory, which is "src" by default).<br/>__*Default*__: "main.ts"
**artifactsDirectory**?🔹 | <code>string</code> | A directory which will contain artifacts to be published to npm.<br/>__*Default*__: "dist"
**authorEmail**?🔹 | <code>string</code> | Author's e-mail.<br/>__*Optional*__
**authorName**?🔹 | <code>string</code> | Author's name.<br/>__*Optional*__
**authorOrganization**?🔹 | <code>boolean</code> | Author's Organization.<br/>__*Optional*__
**authorUrl**?🔹 | <code>string</code> | Author's URL / Website.<br/>__*Optional*__
**autoDetectBin**?🔹 | <code>boolean</code> | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.<br/>__*Default*__: true
**bin**?🔹 | <code>Map<string, string></code> | Binary programs vended with your module.<br/>__*Optional*__
**buildWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/>__*Default*__: true if not a subproject
**bundledDeps**?🔹 | <code>Array<string></code> | List of dependencies to bundle into this module.<br/>__*Optional*__
**cdkDependencies**?🔹 | <code>Array<string></code> | Which AWS CDK modules (those that start with "@aws-cdk/") this app uses.<br/>__*Optional*__
**cdkVersionPinning**?🔹 | <code>boolean</code> | Use pinned version instead of caret version for CDK.<br/>__*Default*__: false
**clobber**?🔹 | <code>boolean</code> | Add a `clobber` task which resets the repo to origin.<br/>__*Default*__: true
**codeCov**?🔹 | <code>boolean</code> | Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret.<br/>__*Default*__: false
**codeCovTokenSecret**?🔹 | <code>string</code> | Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories.<br/>__*Default*__: if this option is not specified, only public repositories are supported
**compileBeforeTest**?🔹 | <code>boolean</code> | Compile the code before running tests.<br/>__*Default*__: if `testdir` is under `src/**`, the default is `true`, otherwise the default is `false.
**context**?🔹 | <code>Map<string, string></code> | Additional context to include in `cdk.json`.<br/>__*Optional*__
**copyrightOwner**?🔹 | <code>string</code> | License copyright owner.<br/>__*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?🔹 | <code>string</code> | The copyright years to put in the LICENSE file.<br/>__*Default*__: current year
**dependabot**?🔹 | <code>boolean</code> | Include dependabot configuration.<br/>__*Default*__: true
**dependabotOptions**?🔹 | <code>[github.DependabotOptions](#projen-github-dependabotoptions)</code> | Options for dependabot.<br/>__*Default*__: default options
**deps**?🔹 | <code>Array<string></code> | Runtime dependencies of this module.<br/>__*Default*__: []
**description**?🔹 | <code>string</code> | The description is just a string that helps people understand the purpose of the package.<br/>__*Optional*__
**devContainer**?🔹 | <code>boolean</code> | Add a VSCode development environment (used for GitHub Codespaces).<br/>__*Default*__: false
**devDeps**?🔹 | <code>Array<string></code> | Build dependencies for this module.<br/>__*Default*__: []
**disableTsconfig**?🔹 | <code>boolean</code> | Do not generate a `tsconfig.json` file (used by jsii projects since tsconfig.json is generated by the jsii compiler).<br/>__*Default*__: false
**docgen**?🔹 | <code>boolean</code> | Docgen by Typedoc.<br/>__*Default*__: false
**docsDirectory**?🔹 | <code>string</code> | Docs directory.<br/>__*Default*__: "docs"
**entrypoint**?🔹 | <code>string</code> | Module entrypoint (`main` in `package.json`).<br/>__*Default*__: "lib/index.js"
**entrypointTypes**?🔹 | <code>string</code> | The .d.ts file that includes the type declarations for this module.<br/>__*Default*__: .d.ts file derived from the project's entrypoint (usually lib/index.d.ts)
**eslint**?🔹 | <code>boolean</code> | Setup eslint.<br/>__*Default*__: true
**eslintOptions**?🔹 | <code>[EslintOptions](#projen-eslintoptions)</code> | Eslint options.<br/>__*Default*__: opinionated default options
**gitignore**?🔹 | <code>Array<string></code> | Additional entries to .gitignore.<br/>__*Optional*__
**gitpod**?🔹 | <code>boolean</code> | Add a Gitpod development environment.<br/>__*Default*__: false
**homepage**?🔹 | <code>string</code> | Package's Homepage / Website.<br/>__*Optional*__
**jest**?🔹 | <code>boolean</code> | Setup jest unit tests.<br/>__*Default*__: true
**jestOptions**?🔹 | <code>[JestOptions](#projen-jestoptions)</code> | Jest options.<br/>__*Default*__: default options
**jsiiFqn**?🔹 | <code>string</code> | The JSII FQN (fully qualified name) of the project class.<br/>__*Default*__: undefined
**jsiiReleaseVersion**?🔹 | <code>string</code> | Version requirement of `jsii-release` which is used to publish modules to npm.<br/>__*Default*__: "latest"
**keywords**?🔹 | <code>Array<string></code> | Keywords to include in `package.json`.<br/>__*Optional*__
**libdir**?🔹 | <code>string</code> | Typescript  artifacts output directory.<br/>__*Default*__: "lib"
**license**?🔹 | <code>string</code> | License's SPDX identifier.<br/>__*Default*__: "Apache-2.0"
**licensed**?🔹 | <code>boolean</code> | Indicates if a license should be added.<br/>__*Default*__: true
**logging**?🔹 | <code>[LoggerOptions](#projen-loggeroptions)</code> | Configure logging options such as verbosity.<br/>__*Default*__: {}
**maxNodeVersion**?🔹 | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/>__*Default*__: no max
**mergify**?🔹 | <code>boolean</code> | Adds mergify configuration.<br/>__*Default*__: true
**mergifyAutoMergeLabel**?🔹 | <code>string</code> | Automatically merge PRs that build successfully and have this label.<br/>__*Default*__: "auto-merge"
**mergifyOptions**?🔹 | <code>[github.MergifyOptions](#projen-github-mergifyoptions)</code> | Options for mergify.<br/>__*Default*__: default options
**minNodeVersion**?🔹 | <code>string</code> | Minimum Node.js version to require via package.json `engines` (inclusive).<br/>__*Default*__: no "engines" specified
**npmAccess**?🔹 | <code>[NpmAccess](#projen-npmaccess)</code> | Access level of the npm package.<br/>__*Default*__: for scoped packages (e.g. `foo@bar`), the default is `NpmAccess.RESTRICTED`, for non-scoped packages, the default is `NpmAccess.PUBLIC`.
**npmDistTag**?🔹 | <code>string</code> | Tags can be used to provide an alias instead of version numbers.<br/>__*Default*__: "latest"
**npmRegistry**?⚠️ | <code>string</code> | The host name of the npm registry to publish to.<br/>__*Optional*__
**npmRegistryUrl**?🔹 | <code>string</code> | The base URL of the npm package registry.<br/>__*Default*__: "https://registry.npmjs.org"
**npmTaskExecution**?🔹 | <code>[NpmTaskExecution](#projen-npmtaskexecution)</code> | Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz).<br/>__*Default*__: NpmTaskExecution.PROJEN
**npmignore**?🔹 | <code>Array<string></code> | Additional entries to .npmignore.<br/>__*Optional*__
**npmignoreEnabled**?🔹 | <code>boolean</code> | Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs.<br/>__*Default*__: true
**outdir**?🔹 | <code>string</code> | The root directory of the project.<br/>__*Default*__: "."
**package**?🔹 | <code>boolean</code> | Defines a `yarn package` command that will produce a tarball and place it under `dist/js`.<br/>__*Default*__: true
**packageManager**?🔹 | <code>[NodePackageManager](#projen-nodepackagemanager)</code> | The Node Package Manager used to execute scripts.<br/>__*Default*__: NodePackageManager.YARN
**packageName**?🔹 | <code>string</code> | The "name" in package.json.<br/>__*Default*__: defaults to project name
**parent**?🔹 | <code>[Project](#projen-project)</code> | The parent project, if this project is part of a bigger project.<br/>__*Optional*__
**peerDependencyOptions**?🔹 | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | Options for `peerDeps`.<br/>__*Optional*__
**peerDeps**?🔹 | <code>Array<string></code> | Peer dependencies for this module.<br/>__*Default*__: []
**projectType**?🔹 | <code>[ProjectType](#projen-projecttype)</code> | Which type of project this is (library/app).<br/>__*Default*__: ProjectType.UNKNOWN
**projenCommand**?🔹 | <code>string</code> | The shell command to use in order to run the projen CLI.<br/>__*Default*__: "npx projen"
**projenDevDependency**?🔹 | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/>__*Default*__: true
**projenUpgradeAutoMerge**?🔹 | <code>boolean</code> | Automatically merge projen upgrade PRs when build passes.<br/>__*Default*__: "true" if mergify auto-merge is enabled (default)
**projenUpgradeSchedule**?🔹 | <code>Array<string></code> | Customize the projenUpgrade schedule in cron expression.<br/>__*Default*__: [ "0 6 * * *" ]
**projenUpgradeSecret**?🔹 | <code>string</code> | Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`).<br/>__*Default*__: no automatic projen upgrade pull requests
**projenVersion**?🔹 | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/>__*Default*__: Semver.latest()
**pullRequestTemplate**?🔹 | <code>boolean</code> | Include a GitHub pull request template.<br/>__*Default*__: true
**pullRequestTemplateContents**?🔹 | <code>string</code> | The contents of the pull request template.<br/>__*Default*__: default content
**readme**?🔹 | <code>[SampleReadmeProps](#projen-samplereadmeprops)</code> | The README setup.<br/>__*Default*__: { filename: 'README.md', contents: '# replace this' }
**rebuildBot**?🔹 | <code>boolean</code> | Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request.<br/>__*Default*__: true if not a subproject
**rebuildBotCommand**?🔹 | <code>string</code> | The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch.<br/>__*Default*__: "rebuild"
**releaseBranches**?🔹 | <code>Array<string></code> | Branches which trigger a release.<br/>__*Default*__: [ "main" ]
**releaseEveryCommit**?🔹 | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`.<br/>__*Default*__: true
**releaseSchedule**?🔹 | <code>string</code> | CRON schedule to trigger new releases.<br/>__*Default*__: no scheduled releases
**releaseToNpm**?🔹 | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/>__*Default*__: false
**releaseWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for releasing from "main" when new versions are bumped.<br/>__*Default*__: true if not a subproject
**repository**?🔹 | <code>string</code> | The repository is the location where the actual code for your package lives.<br/>__*Optional*__
**repositoryDirectory**?🔹 | <code>string</code> | If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives.<br/>__*Optional*__
**requireApproval**?🔹 | <code>[CdkApprovalLevel](#projen-cdkapprovallevel)</code> | To protect you against unintended changes that affect your security posture, the AWS CDK Toolkit prompts you to approve security-related changes before deploying them.<br/>__*Default*__: CdkApprovalLevel.BROADENING
**sampleCode**?🔹 | <code>boolean</code> | Generate one-time sample in `src/` and `test/` if there are no files there.<br/>__*Default*__: true
**scripts**?🔹 | <code>Map<string, string></code> | npm scripts to include.<br/>__*Default*__: {}
**srcdir**?🔹 | <code>string</code> | Typescript sources directory.<br/>__*Default*__: "src"
**stability**?🔹 | <code>string</code> | Package's Stability.<br/>__*Optional*__
**testdir**?🔹 | <code>string</code> | Jest tests directory. Tests files should be named `xxx.test.ts`.<br/>__*Default*__: "test"
**tsconfig**?🔹 | <code>[TypescriptConfigOptions](#projen-typescriptconfigoptions)</code> | Custom TSConfig.<br/>__*Optional*__
**typescriptVersion**?🔹 | <code>string</code> | TypeScript version to use.<br/>__*Default*__: "latest"
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
**author**⚠️ | <code>string</code> | The name of the library author.
**authorAddress**⚠️ | <code>string</code> | Email or URL of the library author.
**cdkVersion**⚠️ | <code>string</code> | Minimum target version this library is tested against.
**defaultReleaseBranch**⚠️ | <code>string</code> | The name of the main release branch.
**name**⚠️ | <code>string</code> | This is the name of your project.
**repositoryUrl**⚠️ | <code>string</code> | Git repository URL.
**allowLibraryDependencies**?⚠️ | <code>boolean</code> | Allow the project to include `peerDependencies` and `bundledDependencies`.<br/>__*Default*__: true
**antitamper**?⚠️ | <code>boolean</code> | Checks that after build there are no modified files on git.<br/>__*Default*__: true
**artifactsDirectory**?⚠️ | <code>string</code> | A directory which will contain artifacts to be published to npm.<br/>__*Default*__: "dist"
**authorEmail**?⚠️ | <code>string</code> | Author's e-mail.<br/>__*Optional*__
**authorName**?⚠️ | <code>string</code> | Author's name.<br/>__*Optional*__
**authorOrganization**?⚠️ | <code>boolean</code> | Author's Organization.<br/>__*Optional*__
**authorUrl**?⚠️ | <code>string</code> | Author's URL / Website.<br/>__*Optional*__
**autoDetectBin**?⚠️ | <code>boolean</code> | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.<br/>__*Default*__: true
**bin**?⚠️ | <code>Map<string, string></code> | Binary programs vended with your module.<br/>__*Optional*__
**buildWorkflow**?⚠️ | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/>__*Default*__: true if not a subproject
**bundledDeps**?⚠️ | <code>Array<string></code> | List of dependencies to bundle into this module.<br/>__*Optional*__
**catalog**?⚠️ | <code>[Catalog](#projen-catalog)</code> | Libraries will be picked up by the construct catalog when they are published to npm as jsii modules and will be published under:.<br/>__*Default*__: new version will be announced
**cdkAssert**?⚠️ | <code>boolean</code> | Install the @aws-cdk/assert library?<br/>__*Default*__: true
**cdkDependencies**?⚠️ | <code>Array<string></code> | Which AWS CDK modules (those that start with "@aws-cdk/") does this library require when consumed?<br/>__*Optional*__
**cdkDependenciesAsDeps**?⚠️ | <code>boolean</code> | If this is enabled (default), all modules declared in `cdkDependencies` will be also added as normal `dependencies` (as well as `peerDependencies`).<br/>__*Default*__: true
**cdkTestDependencies**?⚠️ | <code>Array<string></code> | AWS CDK modules required for testing.<br/>__*Optional*__
**cdkVersionPinning**?⚠️ | <code>boolean</code> | Use pinned version instead of caret version for CDK.<br/>__*Default*__: false
**clobber**?⚠️ | <code>boolean</code> | Add a `clobber` task which resets the repo to origin.<br/>__*Default*__: true
**codeCov**?⚠️ | <code>boolean</code> | Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret.<br/>__*Default*__: false
**codeCovTokenSecret**?⚠️ | <code>string</code> | Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories.<br/>__*Default*__: if this option is not specified, only public repositories are supported
**compat**?⚠️ | <code>boolean</code> | Automatically run API compatibility test against the latest version published to npm after compilation.<br/>__*Default*__: false
**compatIgnore**?⚠️ | <code>string</code> | Name of the ignore file for API compatibility tests.<br/>__*Default*__: ".compatignore"
**copyrightOwner**?⚠️ | <code>string</code> | License copyright owner.<br/>__*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?⚠️ | <code>string</code> | The copyright years to put in the LICENSE file.<br/>__*Default*__: current year
**dependabot**?⚠️ | <code>boolean</code> | Include dependabot configuration.<br/>__*Default*__: true
**dependabotOptions**?⚠️ | <code>[github.DependabotOptions](#projen-github-dependabotoptions)</code> | Options for dependabot.<br/>__*Default*__: default options
**deps**?⚠️ | <code>Array<string></code> | Runtime dependencies of this module.<br/>__*Default*__: []
**description**?⚠️ | <code>string</code> | The description is just a string that helps people understand the purpose of the package.<br/>__*Optional*__
**devContainer**?⚠️ | <code>boolean</code> | Add a VSCode development environment (used for GitHub Codespaces).<br/>__*Default*__: false
**devDeps**?⚠️ | <code>Array<string></code> | Build dependencies for this module.<br/>__*Default*__: []
**docgen**?⚠️ | <code>boolean</code> | Automatically generate API.md from jsii.<br/>__*Default*__: true
**dotnet**?⚠️ | <code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code> | __*Optional*__
**entrypoint**?⚠️ | <code>string</code> | Module entrypoint (`main` in `package.json`).<br/>__*Default*__: "lib/index.js"
**eslint**?⚠️ | <code>boolean</code> | Install eslint.<br/>__*Default*__: true
**eslintOptions**?⚠️ | <code>[EslintOptions](#projen-eslintoptions)</code> | Eslint options.<br/>__*Default*__: opinionated default options
**excludeTypescript**?⚠️ | <code>Array<string></code> | Accepts a list of glob patterns.<br/>__*Optional*__
**gitignore**?⚠️ | <code>Array<string></code> | Additional entries to .gitignore.<br/>__*Optional*__
**gitpod**?⚠️ | <code>boolean</code> | Add a Gitpod development environment.<br/>__*Default*__: false
**homepage**?⚠️ | <code>string</code> | Package's Homepage / Website.<br/>__*Optional*__
**jest**?⚠️ | <code>boolean</code> | Setup jest unit tests.<br/>__*Default*__: true
**jestOptions**?⚠️ | <code>[JestOptions](#projen-jestoptions)</code> | Jest options.<br/>__*Default*__: default options
**jsiiFqn**?⚠️ | <code>string</code> | The JSII FQN (fully qualified name) of the project class.<br/>__*Default*__: undefined
**jsiiReleaseVersion**?⚠️ | <code>string</code> | Version requirement of `jsii-release` which is used to publish modules to npm.<br/>__*Default*__: "latest"
**keywords**?⚠️ | <code>Array<string></code> | Keywords to include in `package.json`.<br/>__*Optional*__
**license**?⚠️ | <code>string</code> | License's SPDX identifier.<br/>__*Default*__: "Apache-2.0"
**licensed**?⚠️ | <code>boolean</code> | Indicates if a license should be added.<br/>__*Default*__: true
**logging**?⚠️ | <code>[LoggerOptions](#projen-loggeroptions)</code> | Configure logging options such as verbosity.<br/>__*Default*__: {}
**maxNodeVersion**?⚠️ | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/>__*Default*__: no max
**mergify**?⚠️ | <code>boolean</code> | Adds mergify configuration.<br/>__*Default*__: true
**mergifyAutoMergeLabel**?⚠️ | <code>string</code> | Automatically merge PRs that build successfully and have this label.<br/>__*Default*__: "auto-merge"
**mergifyOptions**?⚠️ | <code>[github.MergifyOptions](#projen-github-mergifyoptions)</code> | Options for mergify.<br/>__*Default*__: default options
**minNodeVersion**?⚠️ | <code>string</code> | Minimum Node.js version to require via package.json `engines` (inclusive).<br/>__*Default*__: no "engines" specified
**npmAccess**?⚠️ | <code>[NpmAccess](#projen-npmaccess)</code> | Access level of the npm package.<br/>__*Default*__: for scoped packages (e.g. `foo@bar`), the default is `NpmAccess.RESTRICTED`, for non-scoped packages, the default is `NpmAccess.PUBLIC`.
**npmDistTag**?⚠️ | <code>string</code> | Tags can be used to provide an alias instead of version numbers.<br/>__*Default*__: "latest"
**npmRegistry**?⚠️ | <code>string</code> | The host name of the npm registry to publish to.<br/>__*Optional*__
**npmRegistryUrl**?⚠️ | <code>string</code> | The base URL of the npm package registry.<br/>__*Default*__: "https://registry.npmjs.org"
**npmTaskExecution**?⚠️ | <code>[NpmTaskExecution](#projen-npmtaskexecution)</code> | Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz).<br/>__*Default*__: NpmTaskExecution.PROJEN
**npmignore**?⚠️ | <code>Array<string></code> | Additional entries to .npmignore.<br/>__*Optional*__
**npmignoreEnabled**?⚠️ | <code>boolean</code> | Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs.<br/>__*Default*__: true
**outdir**?⚠️ | <code>string</code> | The root directory of the project.<br/>__*Default*__: "."
**packageManager**?⚠️ | <code>[NodePackageManager](#projen-nodepackagemanager)</code> | The Node Package Manager used to execute scripts.<br/>__*Default*__: NodePackageManager.YARN
**packageName**?⚠️ | <code>string</code> | The "name" in package.json.<br/>__*Default*__: defaults to project name
**parent**?⚠️ | <code>[Project](#projen-project)</code> | The parent project, if this project is part of a bigger project.<br/>__*Optional*__
**peerDependencyOptions**?⚠️ | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | Options for `peerDeps`.<br/>__*Optional*__
**peerDeps**?⚠️ | <code>Array<string></code> | Peer dependencies for this module.<br/>__*Default*__: []
**projectType**?⚠️ | <code>[ProjectType](#projen-projecttype)</code> | Which type of project this is (library/app).<br/>__*Default*__: ProjectType.UNKNOWN
**projenCommand**?⚠️ | <code>string</code> | The shell command to use in order to run the projen CLI.<br/>__*Default*__: "npx projen"
**projenDevDependency**?⚠️ | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/>__*Default*__: true
**projenUpgradeAutoMerge**?⚠️ | <code>boolean</code> | Automatically merge projen upgrade PRs when build passes.<br/>__*Default*__: "true" if mergify auto-merge is enabled (default)
**projenUpgradeSchedule**?⚠️ | <code>Array<string></code> | Customize the projenUpgrade schedule in cron expression.<br/>__*Default*__: [ "0 6 * * *" ]
**projenUpgradeSecret**?⚠️ | <code>string</code> | Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`).<br/>__*Default*__: no automatic projen upgrade pull requests
**projenVersion**?⚠️ | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/>__*Default*__: Semver.latest()
**publishToGo**?⚠️ | <code>[JsiiGoTarget](#projen-jsiigotarget)</code> | Publish Go bindings to a git repository.<br/>__*Default*__: no publishing
**publishToMaven**?⚠️ | <code>[JsiiJavaTarget](#projen-jsiijavatarget)</code> | Publish to maven.<br/>__*Default*__: no publishing
**publishToNuget**?⚠️ | <code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code> | Publish to NuGet.<br/>__*Default*__: no publishing
**publishToPypi**?⚠️ | <code>[JsiiPythonTarget](#projen-jsiipythontarget)</code> | Publish to pypi.<br/>__*Default*__: no publishing
**pullRequestTemplate**?⚠️ | <code>boolean</code> | Include a GitHub pull request template.<br/>__*Default*__: true
**pullRequestTemplateContents**?⚠️ | <code>string</code> | The contents of the pull request template.<br/>__*Default*__: default content
**python**?⚠️ | <code>[JsiiPythonTarget](#projen-jsiipythontarget)</code> | __*Optional*__
**readme**?⚠️ | <code>[SampleReadmeProps](#projen-samplereadmeprops)</code> | The README setup.<br/>__*Default*__: { filename: 'README.md', contents: '# replace this' }
**rebuildBot**?⚠️ | <code>boolean</code> | Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request.<br/>__*Default*__: true if not a subproject
**rebuildBotCommand**?⚠️ | <code>string</code> | The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch.<br/>__*Default*__: "rebuild"
**releaseBranches**?⚠️ | <code>Array<string></code> | Branches which trigger a release.<br/>__*Default*__: [ "main" ]
**releaseEveryCommit**?⚠️ | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`.<br/>__*Default*__: true
**releaseSchedule**?⚠️ | <code>string</code> | CRON schedule to trigger new releases.<br/>__*Default*__: no scheduled releases
**releaseToNpm**?⚠️ | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/>__*Default*__: false
**releaseWorkflow**?⚠️ | <code>boolean</code> | Define a GitHub workflow for releasing from "main" when new versions are bumped.<br/>__*Default*__: true if not a subproject
**repository**?⚠️ | <code>string</code> | The repository is the location where the actual code for your package lives.<br/>__*Optional*__
**repositoryDirectory**?⚠️ | <code>string</code> | If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives.<br/>__*Optional*__
**rootdir**?⚠️ | <code>string</code> | __*Default*__: "."
**sampleCode**?⚠️ | <code>boolean</code> | Generate one-time sample in `src/` and `test/` if there are no files there.<br/>__*Default*__: true
**scripts**?⚠️ | <code>Map<string, string></code> | npm scripts to include.<br/>__*Default*__: {}
**stability**?⚠️ | <code>string</code> | Package's Stability.<br/>__*Optional*__
**workflowBootstrapSteps**?⚠️ | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/>__*Default*__: "yarn install --frozen-lockfile && yarn projen"
**workflowContainerImage**?⚠️ | <code>string</code> | Container image to use for GitHub workflows.<br/>__*Default*__: default image
**workflowNodeVersion**?⚠️ | <code>string</code> | The node version to use in GitHub workflows.<br/>__*Default*__: same as `minNodeVersion`



## struct ConstructLibraryCdk8sOptions 🔹 <a id="projen-constructlibrarycdk8soptions"></a>






Name | Type | Description 
-----|------|-------------
**author**🔹 | <code>string</code> | The name of the library author.
**authorAddress**🔹 | <code>string</code> | Email or URL of the library author.
**cdk8sVersion**🔹 | <code>string</code> | Minimum target version this library is tested against.
**defaultReleaseBranch**🔹 | <code>string</code> | The name of the main release branch.
**name**🔹 | <code>string</code> | This is the name of your project.
**repositoryUrl**🔹 | <code>string</code> | Git repository URL.
**allowLibraryDependencies**?🔹 | <code>boolean</code> | Allow the project to include `peerDependencies` and `bundledDependencies`.<br/>__*Default*__: true
**antitamper**?🔹 | <code>boolean</code> | Checks that after build there are no modified files on git.<br/>__*Default*__: true
**artifactsDirectory**?🔹 | <code>string</code> | A directory which will contain artifacts to be published to npm.<br/>__*Default*__: "dist"
**authorEmail**?🔹 | <code>string</code> | Author's e-mail.<br/>__*Optional*__
**authorName**?🔹 | <code>string</code> | Author's name.<br/>__*Optional*__
**authorOrganization**?🔹 | <code>boolean</code> | Author's Organization.<br/>__*Optional*__
**authorUrl**?🔹 | <code>string</code> | Author's URL / Website.<br/>__*Optional*__
**autoDetectBin**?🔹 | <code>boolean</code> | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.<br/>__*Default*__: true
**bin**?🔹 | <code>Map<string, string></code> | Binary programs vended with your module.<br/>__*Optional*__
**buildWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/>__*Default*__: true if not a subproject
**bundledDeps**?🔹 | <code>Array<string></code> | List of dependencies to bundle into this module.<br/>__*Optional*__
**catalog**?🔹 | <code>[Catalog](#projen-catalog)</code> | Libraries will be picked up by the construct catalog when they are published to npm as jsii modules and will be published under:.<br/>__*Default*__: new version will be announced
**clobber**?🔹 | <code>boolean</code> | Add a `clobber` task which resets the repo to origin.<br/>__*Default*__: true
**codeCov**?🔹 | <code>boolean</code> | Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret.<br/>__*Default*__: false
**codeCovTokenSecret**?🔹 | <code>string</code> | Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories.<br/>__*Default*__: if this option is not specified, only public repositories are supported
**compat**?🔹 | <code>boolean</code> | Automatically run API compatibility test against the latest version published to npm after compilation.<br/>__*Default*__: false
**compatIgnore**?🔹 | <code>string</code> | Name of the ignore file for API compatibility tests.<br/>__*Default*__: ".compatignore"
**copyrightOwner**?🔹 | <code>string</code> | License copyright owner.<br/>__*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?🔹 | <code>string</code> | The copyright years to put in the LICENSE file.<br/>__*Default*__: current year
**dependabot**?🔹 | <code>boolean</code> | Include dependabot configuration.<br/>__*Default*__: true
**dependabotOptions**?🔹 | <code>[github.DependabotOptions](#projen-github-dependabotoptions)</code> | Options for dependabot.<br/>__*Default*__: default options
**deps**?🔹 | <code>Array<string></code> | Runtime dependencies of this module.<br/>__*Default*__: []
**description**?🔹 | <code>string</code> | The description is just a string that helps people understand the purpose of the package.<br/>__*Optional*__
**devContainer**?🔹 | <code>boolean</code> | Add a VSCode development environment (used for GitHub Codespaces).<br/>__*Default*__: false
**devDeps**?🔹 | <code>Array<string></code> | Build dependencies for this module.<br/>__*Default*__: []
**docgen**?🔹 | <code>boolean</code> | Automatically generate API.md from jsii.<br/>__*Default*__: true
**dotnet**?⚠️ | <code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code> | __*Optional*__
**entrypoint**?🔹 | <code>string</code> | Module entrypoint (`main` in `package.json`).<br/>__*Default*__: "lib/index.js"
**eslint**?🔹 | <code>boolean</code> | Install eslint.<br/>__*Default*__: true
**eslintOptions**?🔹 | <code>[EslintOptions](#projen-eslintoptions)</code> | Eslint options.<br/>__*Default*__: opinionated default options
**excludeTypescript**?🔹 | <code>Array<string></code> | Accepts a list of glob patterns.<br/>__*Optional*__
**gitignore**?🔹 | <code>Array<string></code> | Additional entries to .gitignore.<br/>__*Optional*__
**gitpod**?🔹 | <code>boolean</code> | Add a Gitpod development environment.<br/>__*Default*__: false
**homepage**?🔹 | <code>string</code> | Package's Homepage / Website.<br/>__*Optional*__
**jest**?🔹 | <code>boolean</code> | Setup jest unit tests.<br/>__*Default*__: true
**jestOptions**?🔹 | <code>[JestOptions](#projen-jestoptions)</code> | Jest options.<br/>__*Default*__: default options
**jsiiFqn**?🔹 | <code>string</code> | The JSII FQN (fully qualified name) of the project class.<br/>__*Default*__: undefined
**jsiiReleaseVersion**?🔹 | <code>string</code> | Version requirement of `jsii-release` which is used to publish modules to npm.<br/>__*Default*__: "latest"
**keywords**?🔹 | <code>Array<string></code> | Keywords to include in `package.json`.<br/>__*Optional*__
**license**?🔹 | <code>string</code> | License's SPDX identifier.<br/>__*Default*__: "Apache-2.0"
**licensed**?🔹 | <code>boolean</code> | Indicates if a license should be added.<br/>__*Default*__: true
**logging**?🔹 | <code>[LoggerOptions](#projen-loggeroptions)</code> | Configure logging options such as verbosity.<br/>__*Default*__: {}
**maxNodeVersion**?🔹 | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/>__*Default*__: no max
**mergify**?🔹 | <code>boolean</code> | Adds mergify configuration.<br/>__*Default*__: true
**mergifyAutoMergeLabel**?🔹 | <code>string</code> | Automatically merge PRs that build successfully and have this label.<br/>__*Default*__: "auto-merge"
**mergifyOptions**?🔹 | <code>[github.MergifyOptions](#projen-github-mergifyoptions)</code> | Options for mergify.<br/>__*Default*__: default options
**minNodeVersion**?🔹 | <code>string</code> | Minimum Node.js version to require via package.json `engines` (inclusive).<br/>__*Default*__: no "engines" specified
**npmAccess**?🔹 | <code>[NpmAccess](#projen-npmaccess)</code> | Access level of the npm package.<br/>__*Default*__: for scoped packages (e.g. `foo@bar`), the default is `NpmAccess.RESTRICTED`, for non-scoped packages, the default is `NpmAccess.PUBLIC`.
**npmDistTag**?🔹 | <code>string</code> | Tags can be used to provide an alias instead of version numbers.<br/>__*Default*__: "latest"
**npmRegistry**?⚠️ | <code>string</code> | The host name of the npm registry to publish to.<br/>__*Optional*__
**npmRegistryUrl**?🔹 | <code>string</code> | The base URL of the npm package registry.<br/>__*Default*__: "https://registry.npmjs.org"
**npmTaskExecution**?🔹 | <code>[NpmTaskExecution](#projen-npmtaskexecution)</code> | Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz).<br/>__*Default*__: NpmTaskExecution.PROJEN
**npmignore**?🔹 | <code>Array<string></code> | Additional entries to .npmignore.<br/>__*Optional*__
**npmignoreEnabled**?🔹 | <code>boolean</code> | Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs.<br/>__*Default*__: true
**outdir**?🔹 | <code>string</code> | The root directory of the project.<br/>__*Default*__: "."
**packageManager**?🔹 | <code>[NodePackageManager](#projen-nodepackagemanager)</code> | The Node Package Manager used to execute scripts.<br/>__*Default*__: NodePackageManager.YARN
**packageName**?🔹 | <code>string</code> | The "name" in package.json.<br/>__*Default*__: defaults to project name
**parent**?🔹 | <code>[Project](#projen-project)</code> | The parent project, if this project is part of a bigger project.<br/>__*Optional*__
**peerDependencyOptions**?🔹 | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | Options for `peerDeps`.<br/>__*Optional*__
**peerDeps**?🔹 | <code>Array<string></code> | Peer dependencies for this module.<br/>__*Default*__: []
**projectType**?🔹 | <code>[ProjectType](#projen-projecttype)</code> | Which type of project this is (library/app).<br/>__*Default*__: ProjectType.UNKNOWN
**projenCommand**?🔹 | <code>string</code> | The shell command to use in order to run the projen CLI.<br/>__*Default*__: "npx projen"
**projenDevDependency**?🔹 | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/>__*Default*__: true
**projenUpgradeAutoMerge**?🔹 | <code>boolean</code> | Automatically merge projen upgrade PRs when build passes.<br/>__*Default*__: "true" if mergify auto-merge is enabled (default)
**projenUpgradeSchedule**?🔹 | <code>Array<string></code> | Customize the projenUpgrade schedule in cron expression.<br/>__*Default*__: [ "0 6 * * *" ]
**projenUpgradeSecret**?🔹 | <code>string</code> | Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`).<br/>__*Default*__: no automatic projen upgrade pull requests
**projenVersion**?🔹 | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/>__*Default*__: Semver.latest()
**publishToGo**?🔹 | <code>[JsiiGoTarget](#projen-jsiigotarget)</code> | Publish Go bindings to a git repository.<br/>__*Default*__: no publishing
**publishToMaven**?🔹 | <code>[JsiiJavaTarget](#projen-jsiijavatarget)</code> | Publish to maven.<br/>__*Default*__: no publishing
**publishToNuget**?🔹 | <code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code> | Publish to NuGet.<br/>__*Default*__: no publishing
**publishToPypi**?🔹 | <code>[JsiiPythonTarget](#projen-jsiipythontarget)</code> | Publish to pypi.<br/>__*Default*__: no publishing
**pullRequestTemplate**?🔹 | <code>boolean</code> | Include a GitHub pull request template.<br/>__*Default*__: true
**pullRequestTemplateContents**?🔹 | <code>string</code> | The contents of the pull request template.<br/>__*Default*__: default content
**python**?⚠️ | <code>[JsiiPythonTarget](#projen-jsiipythontarget)</code> | __*Optional*__
**readme**?🔹 | <code>[SampleReadmeProps](#projen-samplereadmeprops)</code> | The README setup.<br/>__*Default*__: { filename: 'README.md', contents: '# replace this' }
**rebuildBot**?🔹 | <code>boolean</code> | Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request.<br/>__*Default*__: true if not a subproject
**rebuildBotCommand**?🔹 | <code>string</code> | The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch.<br/>__*Default*__: "rebuild"
**releaseBranches**?🔹 | <code>Array<string></code> | Branches which trigger a release.<br/>__*Default*__: [ "main" ]
**releaseEveryCommit**?🔹 | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`.<br/>__*Default*__: true
**releaseSchedule**?🔹 | <code>string</code> | CRON schedule to trigger new releases.<br/>__*Default*__: no scheduled releases
**releaseToNpm**?🔹 | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/>__*Default*__: false
**releaseWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for releasing from "main" when new versions are bumped.<br/>__*Default*__: true if not a subproject
**repository**?🔹 | <code>string</code> | The repository is the location where the actual code for your package lives.<br/>__*Optional*__
**repositoryDirectory**?🔹 | <code>string</code> | If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives.<br/>__*Optional*__
**rootdir**?🔹 | <code>string</code> | __*Default*__: "."
**sampleCode**?🔹 | <code>boolean</code> | Generate one-time sample in `src/` and `test/` if there are no files there.<br/>__*Default*__: true
**scripts**?🔹 | <code>Map<string, string></code> | npm scripts to include.<br/>__*Default*__: {}
**stability**?🔹 | <code>string</code> | Package's Stability.<br/>__*Optional*__
**workflowBootstrapSteps**?🔹 | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/>__*Default*__: "yarn install --frozen-lockfile && yarn projen"
**workflowContainerImage**?🔹 | <code>string</code> | Container image to use for GitHub workflows.<br/>__*Default*__: default image
**workflowNodeVersion**?🔹 | <code>string</code> | The node version to use in GitHub workflows.<br/>__*Default*__: same as `minNodeVersion`



## struct ConstructLibraryOptions 🔹 <a id="projen-constructlibraryoptions"></a>






Name | Type | Description 
-----|------|-------------
**author**🔹 | <code>string</code> | The name of the library author.
**authorAddress**🔹 | <code>string</code> | Email or URL of the library author.
**defaultReleaseBranch**🔹 | <code>string</code> | The name of the main release branch.
**name**🔹 | <code>string</code> | This is the name of your project.
**repositoryUrl**🔹 | <code>string</code> | Git repository URL.
**allowLibraryDependencies**?🔹 | <code>boolean</code> | Allow the project to include `peerDependencies` and `bundledDependencies`.<br/>__*Default*__: true
**antitamper**?🔹 | <code>boolean</code> | Checks that after build there are no modified files on git.<br/>__*Default*__: true
**artifactsDirectory**?🔹 | <code>string</code> | A directory which will contain artifacts to be published to npm.<br/>__*Default*__: "dist"
**authorEmail**?🔹 | <code>string</code> | Author's e-mail.<br/>__*Optional*__
**authorName**?🔹 | <code>string</code> | Author's name.<br/>__*Optional*__
**authorOrganization**?🔹 | <code>boolean</code> | Author's Organization.<br/>__*Optional*__
**authorUrl**?🔹 | <code>string</code> | Author's URL / Website.<br/>__*Optional*__
**autoDetectBin**?🔹 | <code>boolean</code> | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.<br/>__*Default*__: true
**bin**?🔹 | <code>Map<string, string></code> | Binary programs vended with your module.<br/>__*Optional*__
**buildWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/>__*Default*__: true if not a subproject
**bundledDeps**?🔹 | <code>Array<string></code> | List of dependencies to bundle into this module.<br/>__*Optional*__
**catalog**?🔹 | <code>[Catalog](#projen-catalog)</code> | Libraries will be picked up by the construct catalog when they are published to npm as jsii modules and will be published under:.<br/>__*Default*__: new version will be announced
**clobber**?🔹 | <code>boolean</code> | Add a `clobber` task which resets the repo to origin.<br/>__*Default*__: true
**codeCov**?🔹 | <code>boolean</code> | Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret.<br/>__*Default*__: false
**codeCovTokenSecret**?🔹 | <code>string</code> | Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories.<br/>__*Default*__: if this option is not specified, only public repositories are supported
**compat**?🔹 | <code>boolean</code> | Automatically run API compatibility test against the latest version published to npm after compilation.<br/>__*Default*__: false
**compatIgnore**?🔹 | <code>string</code> | Name of the ignore file for API compatibility tests.<br/>__*Default*__: ".compatignore"
**copyrightOwner**?🔹 | <code>string</code> | License copyright owner.<br/>__*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?🔹 | <code>string</code> | The copyright years to put in the LICENSE file.<br/>__*Default*__: current year
**dependabot**?🔹 | <code>boolean</code> | Include dependabot configuration.<br/>__*Default*__: true
**dependabotOptions**?🔹 | <code>[github.DependabotOptions](#projen-github-dependabotoptions)</code> | Options for dependabot.<br/>__*Default*__: default options
**deps**?🔹 | <code>Array<string></code> | Runtime dependencies of this module.<br/>__*Default*__: []
**description**?🔹 | <code>string</code> | The description is just a string that helps people understand the purpose of the package.<br/>__*Optional*__
**devContainer**?🔹 | <code>boolean</code> | Add a VSCode development environment (used for GitHub Codespaces).<br/>__*Default*__: false
**devDeps**?🔹 | <code>Array<string></code> | Build dependencies for this module.<br/>__*Default*__: []
**docgen**?🔹 | <code>boolean</code> | Automatically generate API.md from jsii.<br/>__*Default*__: true
**dotnet**?⚠️ | <code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code> | __*Optional*__
**entrypoint**?🔹 | <code>string</code> | Module entrypoint (`main` in `package.json`).<br/>__*Default*__: "lib/index.js"
**eslint**?🔹 | <code>boolean</code> | Install eslint.<br/>__*Default*__: true
**eslintOptions**?🔹 | <code>[EslintOptions](#projen-eslintoptions)</code> | Eslint options.<br/>__*Default*__: opinionated default options
**excludeTypescript**?🔹 | <code>Array<string></code> | Accepts a list of glob patterns.<br/>__*Optional*__
**gitignore**?🔹 | <code>Array<string></code> | Additional entries to .gitignore.<br/>__*Optional*__
**gitpod**?🔹 | <code>boolean</code> | Add a Gitpod development environment.<br/>__*Default*__: false
**homepage**?🔹 | <code>string</code> | Package's Homepage / Website.<br/>__*Optional*__
**jest**?🔹 | <code>boolean</code> | Setup jest unit tests.<br/>__*Default*__: true
**jestOptions**?🔹 | <code>[JestOptions](#projen-jestoptions)</code> | Jest options.<br/>__*Default*__: default options
**jsiiFqn**?🔹 | <code>string</code> | The JSII FQN (fully qualified name) of the project class.<br/>__*Default*__: undefined
**jsiiReleaseVersion**?🔹 | <code>string</code> | Version requirement of `jsii-release` which is used to publish modules to npm.<br/>__*Default*__: "latest"
**keywords**?🔹 | <code>Array<string></code> | Keywords to include in `package.json`.<br/>__*Optional*__
**license**?🔹 | <code>string</code> | License's SPDX identifier.<br/>__*Default*__: "Apache-2.0"
**licensed**?🔹 | <code>boolean</code> | Indicates if a license should be added.<br/>__*Default*__: true
**logging**?🔹 | <code>[LoggerOptions](#projen-loggeroptions)</code> | Configure logging options such as verbosity.<br/>__*Default*__: {}
**maxNodeVersion**?🔹 | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/>__*Default*__: no max
**mergify**?🔹 | <code>boolean</code> | Adds mergify configuration.<br/>__*Default*__: true
**mergifyAutoMergeLabel**?🔹 | <code>string</code> | Automatically merge PRs that build successfully and have this label.<br/>__*Default*__: "auto-merge"
**mergifyOptions**?🔹 | <code>[github.MergifyOptions](#projen-github-mergifyoptions)</code> | Options for mergify.<br/>__*Default*__: default options
**minNodeVersion**?🔹 | <code>string</code> | Minimum Node.js version to require via package.json `engines` (inclusive).<br/>__*Default*__: no "engines" specified
**npmAccess**?🔹 | <code>[NpmAccess](#projen-npmaccess)</code> | Access level of the npm package.<br/>__*Default*__: for scoped packages (e.g. `foo@bar`), the default is `NpmAccess.RESTRICTED`, for non-scoped packages, the default is `NpmAccess.PUBLIC`.
**npmDistTag**?🔹 | <code>string</code> | Tags can be used to provide an alias instead of version numbers.<br/>__*Default*__: "latest"
**npmRegistry**?⚠️ | <code>string</code> | The host name of the npm registry to publish to.<br/>__*Optional*__
**npmRegistryUrl**?🔹 | <code>string</code> | The base URL of the npm package registry.<br/>__*Default*__: "https://registry.npmjs.org"
**npmTaskExecution**?🔹 | <code>[NpmTaskExecution](#projen-npmtaskexecution)</code> | Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz).<br/>__*Default*__: NpmTaskExecution.PROJEN
**npmignore**?🔹 | <code>Array<string></code> | Additional entries to .npmignore.<br/>__*Optional*__
**npmignoreEnabled**?🔹 | <code>boolean</code> | Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs.<br/>__*Default*__: true
**outdir**?🔹 | <code>string</code> | The root directory of the project.<br/>__*Default*__: "."
**packageManager**?🔹 | <code>[NodePackageManager](#projen-nodepackagemanager)</code> | The Node Package Manager used to execute scripts.<br/>__*Default*__: NodePackageManager.YARN
**packageName**?🔹 | <code>string</code> | The "name" in package.json.<br/>__*Default*__: defaults to project name
**parent**?🔹 | <code>[Project](#projen-project)</code> | The parent project, if this project is part of a bigger project.<br/>__*Optional*__
**peerDependencyOptions**?🔹 | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | Options for `peerDeps`.<br/>__*Optional*__
**peerDeps**?🔹 | <code>Array<string></code> | Peer dependencies for this module.<br/>__*Default*__: []
**projectType**?🔹 | <code>[ProjectType](#projen-projecttype)</code> | Which type of project this is (library/app).<br/>__*Default*__: ProjectType.UNKNOWN
**projenCommand**?🔹 | <code>string</code> | The shell command to use in order to run the projen CLI.<br/>__*Default*__: "npx projen"
**projenDevDependency**?🔹 | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/>__*Default*__: true
**projenUpgradeAutoMerge**?🔹 | <code>boolean</code> | Automatically merge projen upgrade PRs when build passes.<br/>__*Default*__: "true" if mergify auto-merge is enabled (default)
**projenUpgradeSchedule**?🔹 | <code>Array<string></code> | Customize the projenUpgrade schedule in cron expression.<br/>__*Default*__: [ "0 6 * * *" ]
**projenUpgradeSecret**?🔹 | <code>string</code> | Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`).<br/>__*Default*__: no automatic projen upgrade pull requests
**projenVersion**?🔹 | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/>__*Default*__: Semver.latest()
**publishToGo**?🔹 | <code>[JsiiGoTarget](#projen-jsiigotarget)</code> | Publish Go bindings to a git repository.<br/>__*Default*__: no publishing
**publishToMaven**?🔹 | <code>[JsiiJavaTarget](#projen-jsiijavatarget)</code> | Publish to maven.<br/>__*Default*__: no publishing
**publishToNuget**?🔹 | <code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code> | Publish to NuGet.<br/>__*Default*__: no publishing
**publishToPypi**?🔹 | <code>[JsiiPythonTarget](#projen-jsiipythontarget)</code> | Publish to pypi.<br/>__*Default*__: no publishing
**pullRequestTemplate**?🔹 | <code>boolean</code> | Include a GitHub pull request template.<br/>__*Default*__: true
**pullRequestTemplateContents**?🔹 | <code>string</code> | The contents of the pull request template.<br/>__*Default*__: default content
**python**?⚠️ | <code>[JsiiPythonTarget](#projen-jsiipythontarget)</code> | __*Optional*__
**readme**?🔹 | <code>[SampleReadmeProps](#projen-samplereadmeprops)</code> | The README setup.<br/>__*Default*__: { filename: 'README.md', contents: '# replace this' }
**rebuildBot**?🔹 | <code>boolean</code> | Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request.<br/>__*Default*__: true if not a subproject
**rebuildBotCommand**?🔹 | <code>string</code> | The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch.<br/>__*Default*__: "rebuild"
**releaseBranches**?🔹 | <code>Array<string></code> | Branches which trigger a release.<br/>__*Default*__: [ "main" ]
**releaseEveryCommit**?🔹 | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`.<br/>__*Default*__: true
**releaseSchedule**?🔹 | <code>string</code> | CRON schedule to trigger new releases.<br/>__*Default*__: no scheduled releases
**releaseToNpm**?🔹 | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/>__*Default*__: false
**releaseWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for releasing from "main" when new versions are bumped.<br/>__*Default*__: true if not a subproject
**repository**?🔹 | <code>string</code> | The repository is the location where the actual code for your package lives.<br/>__*Optional*__
**repositoryDirectory**?🔹 | <code>string</code> | If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives.<br/>__*Optional*__
**rootdir**?🔹 | <code>string</code> | __*Default*__: "."
**sampleCode**?🔹 | <code>boolean</code> | Generate one-time sample in `src/` and `test/` if there are no files there.<br/>__*Default*__: true
**scripts**?🔹 | <code>Map<string, string></code> | npm scripts to include.<br/>__*Default*__: {}
**stability**?🔹 | <code>string</code> | Package's Stability.<br/>__*Optional*__
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



## struct DevEnvironmentOptions 🔹 <a id="projen-devenvironmentoptions"></a>


Base options for configuring a container-based development environemnt.



Name | Type | Description 
-----|------|-------------
**dockerImage**?🔹 | <code>[DevEnvironmentDockerImage](#projen-devenvironmentdockerimage)</code> | A Docker image or Dockerfile for the container.<br/>__*Optional*__
**ports**?🔹 | <code>Array<string></code> | An array of ports that should be exposed from the container.<br/>__*Optional*__
**tasks**?🔹 | <code>Array<[tasks.Task](#projen-tasks-task)></code> | An array of tasks that should be run when the container starts.<br/>__*Optional*__
**vscodeExtensions**?🔹 | <code>Array<string></code> | An array of extension IDs that specify the extensions that should be installed inside the container when it is created.<br/>__*Optional*__



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
**schemaVersion**?🔹 | <code>string</code> | Docker Compose schema version do be used.<br/>__*Default*__: 3.3
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
**dirs**🔹 | <code>Array<string></code> | Directories with source files to lint (e.g. [ "src" ]).
**devdirs**?🔹 | <code>Array<string></code> | Directories with source files that include tests and build tools.<br/>__*Default*__: []
**fileExtensions**?🔹 | <code>Array<string></code> | File types that should be linted (e.g. [ ".js", ".ts" ]).<br/>__*Default*__: [".ts"]
**ignorePatterns**?🔹 | <code>Array<string></code> | List of file patterns that should not be linted, using the same syntax as .gitignore patterns.<br/>__*Default*__: [ '*.js', '*.d.ts', 'node_modules/', '*.generated.ts', 'coverage' ]
**lintProjenRc**?🔹 | <code>boolean</code> | Should we lint .projenrc.js.<br/>__*Default*__: true
**tsconfigPath**?🔹 | <code>string</code> | Path to `tsconfig.json` which should be used by eslint.<br/>__*Default*__: "./tsconfig.json"



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
**executable**?🔹 | <code>boolean</code> | Whether the generated file should be marked as executable.<br/>__*Default*__: false
**readonly**?🔹 | <code>boolean</code> | Whether the generated file should be readonly.<br/>__*Default*__: true



## struct GitpodOptions 🔹 <a id="projen-gitpodoptions"></a>


Constructor options for the Gitpod component.

By default, Gitpod uses the 'gitpod/workspace-full' docker image.



Name | Type | Description 
-----|------|-------------
**dockerImage**?🔹 | <code>[DevEnvironmentDockerImage](#projen-devenvironmentdockerimage)</code> | A Docker image or Dockerfile for the container.<br/>__*Optional*__
**ports**?🔹 | <code>Array<string></code> | An array of ports that should be exposed from the container.<br/>__*Optional*__
**prebuilds**?🔹 | <code>[GitpodPrebuilds](#projen-gitpodprebuilds)</code> | Optional Gitpod's Github App integration for prebuilds If this is not set and Gitpod's Github App is installed, then Gitpod will apply these defaults: https://www.gitpod.io/docs/prebuilds/#configure-the-github-app.<br/>__*Default*__: undefined
**tasks**?🔹 | <code>Array<[tasks.Task](#projen-tasks-task)></code> | An array of tasks that should be run when the container starts.<br/>__*Optional*__
**vscodeExtensions**?🔹 | <code>Array<string></code> | An array of extension IDs that specify the extensions that should be installed inside the container when it is created.<br/>__*Optional*__



## struct GitpodPort 🔹 <a id="projen-gitpodport"></a>


Options for an exposed port on Gitpod.



Name | Type | Description 
-----|------|-------------
**onOpen**?🔹 | <code>[GitpodOnOpen](#projen-gitpodonopen)</code> | What to do when a service on a port is detected.<br/>__*Default*__: GitpodOnOpen.NOTIFY
**port**?🔹 | <code>string</code> | A port that should be exposed (forwarded) from the container.<br/>__*Optional*__
**visibility**?🔹 | <code>[GitpodPortVisibility](#projen-gitpodportvisibility)</code> | Whether the port visibility should be private or public.<br/>__*Default*__: GitpodPortVisibility.PUBLIC



## struct GitpodPrebuilds 🔹 <a id="projen-gitpodprebuilds"></a>


Configure the Gitpod App for prebuilds.

Currently only GitHub is supported.



Name | Type | Description 
-----|------|-------------
**addBadge**?🔹 | <code>boolean</code> | Add a "Review in Gitpod" button to the pull request's description.<br/>__*Default*__: false
**addCheck**?🔹 | <code>boolean</code> | Add a check to pull requests.<br/>__*Default*__: true
**addComment**?🔹 | <code>boolean</code> | Add a "Review in Gitpod" button as a comment to pull requests.<br/>__*Default*__: false
**addLabel**?🔹 | <code>boolean</code> | Add a label once the prebuild is ready to pull requests.<br/>__*Default*__: false
**branches**?🔹 | <code>boolean</code> | Enable for all branches in this repo.<br/>__*Default*__: false
**master**?🔹 | <code>boolean</code> | Enable for the master/default branch.<br/>__*Default*__: true
**pullRequests**?🔹 | <code>boolean</code> | Enable for pull requests coming from this repo.<br/>__*Default*__: true
**pullRequestsFromForks**?🔹 | <code>boolean</code> | Enable for pull requests coming from forks.<br/>__*Default*__: false



## struct GitpodTask 🔹 <a id="projen-gitpodtask"></a>


Configure options for a task to be run when opening a Gitpod workspace (e.g. running tests, or starting a dev server).

Start Mode         | Execution
Fresh Workspace    | before && init && command
Restart Workspace  | before && command
Snapshot           | before && command
Prebuild           | before && init && prebuild



Name | Type | Description 
-----|------|-------------
**command**🔹 | <code>string</code> | Required.
**before**?🔹 | <code>string</code> | In case you need to run something even before init, that is a requirement for both init and command, you can use the before property.<br/>__*Optional*__
**init**?🔹 | <code>string</code> | The init property can be used to specify shell commands that should only be executed after a workspace was freshly cloned and needs to be initialized somehow.<br/>__*Optional*__
**name**?🔹 | <code>string</code> | A name for this task.<br/>__*Default*__: task names are omitted when blank
**openIn**?🔹 | <code>[GitpodOpenIn](#projen-gitpodopenin)</code> | You can configure where in the IDE the terminal should be opened.<br/>__*Default*__: GitpodOpenIn.BOTTOM
**openMode**?🔹 | <code>[GitpodOpenMode](#projen-gitpodopenmode)</code> | You can configure how the terminal should be opened relative to the previous task.<br/>__*Default*__: GitpodOpenMode.TAB_AFTER
**prebuild**?🔹 | <code>string</code> | The optional prebuild command will be executed during prebuilds.<br/>__*Optional*__



## struct HasteConfig 🔹 <a id="projen-hasteconfig"></a>






Name | Type | Description 
-----|------|-------------
**computeSha1**?🔹 | <code>boolean</code> | __*Optional*__
**defaultPlatform**?🔹 | <code>string</code> | __*Optional*__
**hasteImplModulePath**?🔹 | <code>string</code> | __*Optional*__
**platforms**?🔹 | <code>Array<string></code> | __*Optional*__
**throwOnModuleCollision**?🔹 | <code>boolean</code> | __*Optional*__



## interface IDevEnvironment 🔹 <a id="projen-idevenvironment"></a>

__Implemented by__: [vscode.DevContainer](#projen-vscode-devcontainer), [Gitpod](#projen-gitpod)

Abstract interface for container-based development environments, such as Gitpod and GitHub Codespaces.
### Methods


#### addDockerImage(image)🔹 <a id="projen-idevenvironment-adddockerimage"></a>

Add a custom Docker image or Dockerfile for the container.

```ts
addDockerImage(image: DevEnvironmentDockerImage): void
```

* **image** (<code>[DevEnvironmentDockerImage](#projen-devenvironmentdockerimage)</code>)  The Docker image.




#### addPorts(...ports)🔹 <a id="projen-idevenvironment-addports"></a>

Adds ports that should be exposed (forwarded) from the container.

```ts
addPorts(...ports: string[]): void
```

* **ports** (<code>string</code>)  The new ports.




#### addTasks(...tasks)🔹 <a id="projen-idevenvironment-addtasks"></a>

Adds tasks to run when the container starts.

```ts
addTasks(...tasks: Task[]): void
```

* **tasks** (<code>[tasks.Task](#projen-tasks-task)</code>)  The new tasks.




#### addVscodeExtensions(...extensions)🔹 <a id="projen-idevenvironment-addvscodeextensions"></a>

Adds a list of VSCode extensions that should be automatically installed in the container.

```ts
addVscodeExtensions(...extensions: string[]): void
```

* **extensions** (<code>string</code>)  The extension IDs.






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






## interface IMarkableFile 🔹 <a id="projen-imarkablefile"></a>

__Implemented by__: [JsonFile](#projen-jsonfile), [TomlFile](#projen-tomlfile), [XmlFile](#projen-xmlfile), [YamlFile](#projen-yamlfile)

Files that may include the Projen marker.

### Properties


Name | Type | Description 
-----|------|-------------
**marker**🔹 | <code>boolean</code> | Adds the projen marker to the file.



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
  * **args** (<code>Array<any></code>)  Context arguments. __*Default*__: []
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
**collectCoverageFrom**?🔹 | <code>Array<string></code> | An array of glob patterns indicating a set of files for which coverage information should be collected.<br/>__*Default*__: undefined
**coverageDirectory**?🔹 | <code>string</code> | The directory where Jest should output its coverage files.<br/>__*Default*__: "coverage"
**coveragePathIgnorePatterns**?🔹 | <code>Array<string></code> | An array of regexp pattern strings that are matched against all file paths before executing the test.<br/>__*Default*__: "/node_modules/"
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
**coverageText**?🔹 | <code>boolean</code> | Include the `text` coverage reporter, which means that coverage summary is printed at the end of the jest execution.<br/>__*Default*__: true
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
**nugetApiKeySecret**?🔹 | <code>string</code> | GitHub secret which contains the API key for NuGet.<br/>__*Default*__: "NUGET_API_KEY"



## struct JsiiGoTarget 🔹 <a id="projen-jsiigotarget"></a>


Go target configuration.



Name | Type | Description 
-----|------|-------------
**moduleName**🔹 | <code>string</code> | The name of the target go module.
**gitBranch**?🔹 | <code>string</code> | Branch to push to.<br/>__*Default*__: "main"
**gitCommitMessage**?🔹 | <code>string</code> | The commit message.<br/>__*Default*__: "chore(release): $VERSION"
**gitUserEmail**?🔹 | <code>string</code> | The email to use in the release git commit.<br/>__*Default*__: "github-actions
**gitUserName**?🔹 | <code>string</code> | The user name to use for the release git commit.<br/>__*Default*__: "GitHub Actions"
**githubRepo**?🔹 | <code>string</code> | GitHub repository to push to.<br/>__*Default*__: derived from `moduleName`
**githubTokenSecret**?🔹 | <code>string</code> | The name of the secret that includes a personal GitHub access token used to push to the GitHub repository.<br/>__*Default*__: "GO_GITHUB_TOKEN"



## struct JsiiJavaTarget 🔹 <a id="projen-jsiijavatarget"></a>






Name | Type | Description 
-----|------|-------------
**javaPackage**🔹 | <code>string</code> | <span></span>
**mavenArtifactId**🔹 | <code>string</code> | <span></span>
**mavenGroupId**🔹 | <code>string</code> | <span></span>
**mavenGpgPrivateKeyPassphrase**?🔹 | <code>string</code> | GitHub secret name which contains the GPG private key or file that includes it.<br/>__*Default*__: "MAVEN_GPG_PRIVATE_KEY_PASSPHRASE"
**mavenGpgPrivateKeySecret**?🔹 | <code>string</code> | GitHub secret name which contains the GPG private key or file that includes it.<br/>__*Default*__: "MAVEN_GPG_PRIVATE_KEY"
**mavenPassword**?🔹 | <code>string</code> | GitHub secret name which contains the Password for maven repository.<br/>__*Default*__: "MAVEN_PASSWORD"
**mavenRepositoryUrl**?🔹 | <code>string</code> | Deployment repository when not deploying to Maven Central.<br/>__*Default*__: not set
**mavenServerId**?🔹 | <code>string</code> | Used in maven settings for credential lookup (e.g. use github when publishing to GitHub).<br/>__*Default*__: "ossrh" Defaults to Maven Central.
**mavenStagingProfileId**?🔹 | <code>string</code> | GitHub secret name which contains the Maven Central (sonatype) staging profile ID (e.g. 68a05363083174). Staging profile ID can be found in the URL of the "Releases" staging profile under "Staging Profiles" in https://oss.sonatype.org (e.g. https://oss.sonatype.org/#stagingProfiles;11a33451234521.<br/>__*Default*__: "MAVEN_STAGING_PROFILE_ID"
**mavenUsername**?🔹 | <code>string</code> | GitHub secret name which contains the Username for maven repository.<br/>__*Default*__: "MAVEN_USERNAME"



## struct JsiiProjectOptions 🔹 <a id="projen-jsiiprojectoptions"></a>






Name | Type | Description 
-----|------|-------------
**author**🔹 | <code>string</code> | The name of the library author.
**authorAddress**🔹 | <code>string</code> | Email or URL of the library author.
**defaultReleaseBranch**🔹 | <code>string</code> | The name of the main release branch.
**name**🔹 | <code>string</code> | This is the name of your project.
**repositoryUrl**🔹 | <code>string</code> | Git repository URL.
**allowLibraryDependencies**?🔹 | <code>boolean</code> | Allow the project to include `peerDependencies` and `bundledDependencies`.<br/>__*Default*__: true
**antitamper**?🔹 | <code>boolean</code> | Checks that after build there are no modified files on git.<br/>__*Default*__: true
**artifactsDirectory**?🔹 | <code>string</code> | A directory which will contain artifacts to be published to npm.<br/>__*Default*__: "dist"
**authorEmail**?🔹 | <code>string</code> | Author's e-mail.<br/>__*Optional*__
**authorName**?🔹 | <code>string</code> | Author's name.<br/>__*Optional*__
**authorOrganization**?🔹 | <code>boolean</code> | Author's Organization.<br/>__*Optional*__
**authorUrl**?🔹 | <code>string</code> | Author's URL / Website.<br/>__*Optional*__
**autoDetectBin**?🔹 | <code>boolean</code> | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.<br/>__*Default*__: true
**bin**?🔹 | <code>Map<string, string></code> | Binary programs vended with your module.<br/>__*Optional*__
**buildWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/>__*Default*__: true if not a subproject
**bundledDeps**?🔹 | <code>Array<string></code> | List of dependencies to bundle into this module.<br/>__*Optional*__
**clobber**?🔹 | <code>boolean</code> | Add a `clobber` task which resets the repo to origin.<br/>__*Default*__: true
**codeCov**?🔹 | <code>boolean</code> | Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret.<br/>__*Default*__: false
**codeCovTokenSecret**?🔹 | <code>string</code> | Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories.<br/>__*Default*__: if this option is not specified, only public repositories are supported
**compat**?🔹 | <code>boolean</code> | Automatically run API compatibility test against the latest version published to npm after compilation.<br/>__*Default*__: false
**compatIgnore**?🔹 | <code>string</code> | Name of the ignore file for API compatibility tests.<br/>__*Default*__: ".compatignore"
**copyrightOwner**?🔹 | <code>string</code> | License copyright owner.<br/>__*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?🔹 | <code>string</code> | The copyright years to put in the LICENSE file.<br/>__*Default*__: current year
**dependabot**?🔹 | <code>boolean</code> | Include dependabot configuration.<br/>__*Default*__: true
**dependabotOptions**?🔹 | <code>[github.DependabotOptions](#projen-github-dependabotoptions)</code> | Options for dependabot.<br/>__*Default*__: default options
**deps**?🔹 | <code>Array<string></code> | Runtime dependencies of this module.<br/>__*Default*__: []
**description**?🔹 | <code>string</code> | The description is just a string that helps people understand the purpose of the package.<br/>__*Optional*__
**devContainer**?🔹 | <code>boolean</code> | Add a VSCode development environment (used for GitHub Codespaces).<br/>__*Default*__: false
**devDeps**?🔹 | <code>Array<string></code> | Build dependencies for this module.<br/>__*Default*__: []
**docgen**?🔹 | <code>boolean</code> | Automatically generate API.md from jsii.<br/>__*Default*__: true
**dotnet**?⚠️ | <code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code> | __*Optional*__
**entrypoint**?🔹 | <code>string</code> | Module entrypoint (`main` in `package.json`).<br/>__*Default*__: "lib/index.js"
**eslint**?🔹 | <code>boolean</code> | Install eslint.<br/>__*Default*__: true
**eslintOptions**?🔹 | <code>[EslintOptions](#projen-eslintoptions)</code> | Eslint options.<br/>__*Default*__: opinionated default options
**excludeTypescript**?🔹 | <code>Array<string></code> | Accepts a list of glob patterns.<br/>__*Optional*__
**gitignore**?🔹 | <code>Array<string></code> | Additional entries to .gitignore.<br/>__*Optional*__
**gitpod**?🔹 | <code>boolean</code> | Add a Gitpod development environment.<br/>__*Default*__: false
**homepage**?🔹 | <code>string</code> | Package's Homepage / Website.<br/>__*Optional*__
**jest**?🔹 | <code>boolean</code> | Setup jest unit tests.<br/>__*Default*__: true
**jestOptions**?🔹 | <code>[JestOptions](#projen-jestoptions)</code> | Jest options.<br/>__*Default*__: default options
**jsiiFqn**?🔹 | <code>string</code> | The JSII FQN (fully qualified name) of the project class.<br/>__*Default*__: undefined
**jsiiReleaseVersion**?🔹 | <code>string</code> | Version requirement of `jsii-release` which is used to publish modules to npm.<br/>__*Default*__: "latest"
**keywords**?🔹 | <code>Array<string></code> | Keywords to include in `package.json`.<br/>__*Optional*__
**license**?🔹 | <code>string</code> | License's SPDX identifier.<br/>__*Default*__: "Apache-2.0"
**licensed**?🔹 | <code>boolean</code> | Indicates if a license should be added.<br/>__*Default*__: true
**logging**?🔹 | <code>[LoggerOptions](#projen-loggeroptions)</code> | Configure logging options such as verbosity.<br/>__*Default*__: {}
**maxNodeVersion**?🔹 | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/>__*Default*__: no max
**mergify**?🔹 | <code>boolean</code> | Adds mergify configuration.<br/>__*Default*__: true
**mergifyAutoMergeLabel**?🔹 | <code>string</code> | Automatically merge PRs that build successfully and have this label.<br/>__*Default*__: "auto-merge"
**mergifyOptions**?🔹 | <code>[github.MergifyOptions](#projen-github-mergifyoptions)</code> | Options for mergify.<br/>__*Default*__: default options
**minNodeVersion**?🔹 | <code>string</code> | Minimum Node.js version to require via package.json `engines` (inclusive).<br/>__*Default*__: no "engines" specified
**npmAccess**?🔹 | <code>[NpmAccess](#projen-npmaccess)</code> | Access level of the npm package.<br/>__*Default*__: for scoped packages (e.g. `foo@bar`), the default is `NpmAccess.RESTRICTED`, for non-scoped packages, the default is `NpmAccess.PUBLIC`.
**npmDistTag**?🔹 | <code>string</code> | Tags can be used to provide an alias instead of version numbers.<br/>__*Default*__: "latest"
**npmRegistry**?⚠️ | <code>string</code> | The host name of the npm registry to publish to.<br/>__*Optional*__
**npmRegistryUrl**?🔹 | <code>string</code> | The base URL of the npm package registry.<br/>__*Default*__: "https://registry.npmjs.org"
**npmTaskExecution**?🔹 | <code>[NpmTaskExecution](#projen-npmtaskexecution)</code> | Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz).<br/>__*Default*__: NpmTaskExecution.PROJEN
**npmignore**?🔹 | <code>Array<string></code> | Additional entries to .npmignore.<br/>__*Optional*__
**npmignoreEnabled**?🔹 | <code>boolean</code> | Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs.<br/>__*Default*__: true
**outdir**?🔹 | <code>string</code> | The root directory of the project.<br/>__*Default*__: "."
**packageManager**?🔹 | <code>[NodePackageManager](#projen-nodepackagemanager)</code> | The Node Package Manager used to execute scripts.<br/>__*Default*__: NodePackageManager.YARN
**packageName**?🔹 | <code>string</code> | The "name" in package.json.<br/>__*Default*__: defaults to project name
**parent**?🔹 | <code>[Project](#projen-project)</code> | The parent project, if this project is part of a bigger project.<br/>__*Optional*__
**peerDependencyOptions**?🔹 | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | Options for `peerDeps`.<br/>__*Optional*__
**peerDeps**?🔹 | <code>Array<string></code> | Peer dependencies for this module.<br/>__*Default*__: []
**projectType**?🔹 | <code>[ProjectType](#projen-projecttype)</code> | Which type of project this is (library/app).<br/>__*Default*__: ProjectType.UNKNOWN
**projenCommand**?🔹 | <code>string</code> | The shell command to use in order to run the projen CLI.<br/>__*Default*__: "npx projen"
**projenDevDependency**?🔹 | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/>__*Default*__: true
**projenUpgradeAutoMerge**?🔹 | <code>boolean</code> | Automatically merge projen upgrade PRs when build passes.<br/>__*Default*__: "true" if mergify auto-merge is enabled (default)
**projenUpgradeSchedule**?🔹 | <code>Array<string></code> | Customize the projenUpgrade schedule in cron expression.<br/>__*Default*__: [ "0 6 * * *" ]
**projenUpgradeSecret**?🔹 | <code>string</code> | Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`).<br/>__*Default*__: no automatic projen upgrade pull requests
**projenVersion**?🔹 | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/>__*Default*__: Semver.latest()
**publishToGo**?🔹 | <code>[JsiiGoTarget](#projen-jsiigotarget)</code> | Publish Go bindings to a git repository.<br/>__*Default*__: no publishing
**publishToMaven**?🔹 | <code>[JsiiJavaTarget](#projen-jsiijavatarget)</code> | Publish to maven.<br/>__*Default*__: no publishing
**publishToNuget**?🔹 | <code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code> | Publish to NuGet.<br/>__*Default*__: no publishing
**publishToPypi**?🔹 | <code>[JsiiPythonTarget](#projen-jsiipythontarget)</code> | Publish to pypi.<br/>__*Default*__: no publishing
**pullRequestTemplate**?🔹 | <code>boolean</code> | Include a GitHub pull request template.<br/>__*Default*__: true
**pullRequestTemplateContents**?🔹 | <code>string</code> | The contents of the pull request template.<br/>__*Default*__: default content
**python**?⚠️ | <code>[JsiiPythonTarget](#projen-jsiipythontarget)</code> | __*Optional*__
**readme**?🔹 | <code>[SampleReadmeProps](#projen-samplereadmeprops)</code> | The README setup.<br/>__*Default*__: { filename: 'README.md', contents: '# replace this' }
**rebuildBot**?🔹 | <code>boolean</code> | Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request.<br/>__*Default*__: true if not a subproject
**rebuildBotCommand**?🔹 | <code>string</code> | The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch.<br/>__*Default*__: "rebuild"
**releaseBranches**?🔹 | <code>Array<string></code> | Branches which trigger a release.<br/>__*Default*__: [ "main" ]
**releaseEveryCommit**?🔹 | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`.<br/>__*Default*__: true
**releaseSchedule**?🔹 | <code>string</code> | CRON schedule to trigger new releases.<br/>__*Default*__: no scheduled releases
**releaseToNpm**?🔹 | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/>__*Default*__: false
**releaseWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for releasing from "main" when new versions are bumped.<br/>__*Default*__: true if not a subproject
**repository**?🔹 | <code>string</code> | The repository is the location where the actual code for your package lives.<br/>__*Optional*__
**repositoryDirectory**?🔹 | <code>string</code> | If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives.<br/>__*Optional*__
**rootdir**?🔹 | <code>string</code> | __*Default*__: "."
**sampleCode**?🔹 | <code>boolean</code> | Generate one-time sample in `src/` and `test/` if there are no files there.<br/>__*Default*__: true
**scripts**?🔹 | <code>Map<string, string></code> | npm scripts to include.<br/>__*Default*__: {}
**stability**?🔹 | <code>string</code> | Package's Stability.<br/>__*Optional*__
**workflowBootstrapSteps**?🔹 | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/>__*Default*__: "yarn install --frozen-lockfile && yarn projen"
**workflowContainerImage**?🔹 | <code>string</code> | Container image to use for GitHub workflows.<br/>__*Default*__: default image
**workflowNodeVersion**?🔹 | <code>string</code> | The node version to use in GitHub workflows.<br/>__*Default*__: same as `minNodeVersion`



## struct JsiiPythonTarget 🔹 <a id="projen-jsiipythontarget"></a>






Name | Type | Description 
-----|------|-------------
**distName**🔹 | <code>string</code> | <span></span>
**module**🔹 | <code>string</code> | <span></span>
**twinePasswordSecret**?🔹 | <code>string</code> | The GitHub secret which contains PyPI password.<br/>__*Default*__: "TWINE_PASSWORD"
**twineRegistryUrl**?🔹 | <code>string</code> | The registry url to use when releasing packages.<br/>__*Default*__: twine default
**twineUsernameSecret**?🔹 | <code>string</code> | The GitHub secret which contains PyPI user name.<br/>__*Default*__: "TWINE_USERNAME"



## struct JsiiReleaseGo 🔹 <a id="projen-jsiireleasego"></a>


Options for Go releases.



Name | Type | Description 
-----|------|-------------
**gitBranch**?🔹 | <code>string</code> | Branch to push to.<br/>__*Default*__: "main"
**gitCommitMessage**?🔹 | <code>string</code> | The commit message.<br/>__*Default*__: "chore(release): $VERSION"
**gitUserEmail**?🔹 | <code>string</code> | The email to use in the release git commit.<br/>__*Default*__: "github-actions
**gitUserName**?🔹 | <code>string</code> | The user name to use for the release git commit.<br/>__*Default*__: "GitHub Actions"
**githubRepo**?🔹 | <code>string</code> | GitHub repository to push to.<br/>__*Default*__: derived from `moduleName`
**githubTokenSecret**?🔹 | <code>string</code> | The name of the secret that includes a personal GitHub access token used to push to the GitHub repository.<br/>__*Default*__: "GO_GITHUB_TOKEN"



## struct JsiiReleaseMaven 🔹 <a id="projen-jsiireleasemaven"></a>


Options for Maven releases.



Name | Type | Description 
-----|------|-------------
**mavenGpgPrivateKeyPassphrase**?🔹 | <code>string</code> | GitHub secret name which contains the GPG private key or file that includes it.<br/>__*Default*__: "MAVEN_GPG_PRIVATE_KEY_PASSPHRASE"
**mavenGpgPrivateKeySecret**?🔹 | <code>string</code> | GitHub secret name which contains the GPG private key or file that includes it.<br/>__*Default*__: "MAVEN_GPG_PRIVATE_KEY"
**mavenPassword**?🔹 | <code>string</code> | GitHub secret name which contains the Password for maven repository.<br/>__*Default*__: "MAVEN_PASSWORD"
**mavenRepositoryUrl**?🔹 | <code>string</code> | Deployment repository when not deploying to Maven Central.<br/>__*Default*__: not set
**mavenServerId**?🔹 | <code>string</code> | Used in maven settings for credential lookup (e.g. use github when publishing to GitHub).<br/>__*Default*__: "ossrh" Defaults to Maven Central.
**mavenStagingProfileId**?🔹 | <code>string</code> | GitHub secret name which contains the Maven Central (sonatype) staging profile ID (e.g. 68a05363083174). Staging profile ID can be found in the URL of the "Releases" staging profile under "Staging Profiles" in https://oss.sonatype.org (e.g. https://oss.sonatype.org/#stagingProfiles;11a33451234521.<br/>__*Default*__: "MAVEN_STAGING_PROFILE_ID"
**mavenUsername**?🔹 | <code>string</code> | GitHub secret name which contains the Username for maven repository.<br/>__*Default*__: "MAVEN_USERNAME"



## struct JsiiReleaseNpm 🔹 <a id="projen-jsiireleasenpm"></a>


Options for npm release.



Name | Type | Description 
-----|------|-------------
**distTag**?🔹 | <code>string</code> | Tags can be used to provide an alias instead of version numbers.<br/>__*Default*__: "latest"
**npmTokenSecret**?🔹 | <code>string</code> | GitHub secret which contains the NPM token to use when publishing packages.<br/>__*Default*__: "NPM_TOKEN"
**registry**?🔹 | <code>string</code> | The domain name of the npm package registry.<br/>__*Default*__: "registry.npmjs.org"



## struct JsiiReleaseNuget 🔹 <a id="projen-jsiireleasenuget"></a>


Options for NuGet releases.



Name | Type | Description 
-----|------|-------------
**nugetApiKeySecret**?🔹 | <code>string</code> | GitHub secret which contains the API key for NuGet.<br/>__*Default*__: "NUGET_API_KEY"



## struct JsiiReleasePyPi 🔹 <a id="projen-jsiireleasepypi"></a>


Options for PyPI release.



Name | Type | Description 
-----|------|-------------
**twinePasswordSecret**?🔹 | <code>string</code> | The GitHub secret which contains PyPI password.<br/>__*Default*__: "TWINE_PASSWORD"
**twineRegistryUrl**?🔹 | <code>string</code> | The registry url to use when releasing packages.<br/>__*Default*__: twine default
**twineUsernameSecret**?🔹 | <code>string</code> | The GitHub secret which contains PyPI user name.<br/>__*Default*__: "TWINE_USERNAME"



## struct JsonFileOptions 🔹 <a id="projen-jsonfileoptions"></a>


Options for `JsonFile`.



Name | Type | Description 
-----|------|-------------
**committed**?🔹 | <code>boolean</code> | Indicates whether this file should be committed to git or ignored.<br/>__*Default*__: true
**editGitignore**?🔹 | <code>boolean</code> | Update the project's .gitignore file.<br/>__*Default*__: true
**executable**?🔹 | <code>boolean</code> | Whether the generated file should be marked as executable.<br/>__*Default*__: false
**marker**?🔹 | <code>boolean</code> | Adds the projen marker to the file.<br/>__*Default*__: false
**obj**?🔹 | <code>any</code> | The object that will be serialized.<br/>__*Default*__: {} an empty object (use `file.obj` to mutate).
**omitEmpty**?🔹 | <code>boolean</code> | Omits empty objects and arrays.<br/>__*Default*__: false
**readonly**?🔹 | <code>boolean</code> | Whether the generated file should be readonly.<br/>__*Default*__: true



## struct LicenseOptions 🔹 <a id="projen-licenseoptions"></a>






Name | Type | Description 
-----|------|-------------
**copyrightOwner**?🔹 | <code>string</code> | Copyright owner.<br/>__*Default*__: ""
**copyrightPeriod**?🔹 | <code>string</code> | Period of license (e.g. "1998-2023").<br/>__*Default*__: current year (e.g. "2020")



## struct LoggerOptions 🔹 <a id="projen-loggeroptions"></a>


Options for logging utilities.



Name | Type | Description 
-----|------|-------------
**level**?🔹 | <code>[LogLevel](#projen-loglevel)</code> | The logging verbosity.<br/>__*Default*__: LogLevel.INFO
**usePrefix**?🔹 | <code>boolean</code> | Include a prefix for all logging messages with the project name.<br/>__*Default*__: false



## struct MakefileOptions 🔹 <a id="projen-makefileoptions"></a>


Options for Makefiles.



Name | Type | Description 
-----|------|-------------
**all**?🔹 | <code>Array<string></code> | List of targets to build when Make is invoked without specifying any targets.<br/>__*Default*__: []
**committed**?🔹 | <code>boolean</code> | Indicates whether this file should be committed to git or ignored.<br/>__*Default*__: true
**editGitignore**?🔹 | <code>boolean</code> | Update the project's .gitignore file.<br/>__*Default*__: true
**executable**?🔹 | <code>boolean</code> | Whether the generated file should be marked as executable.<br/>__*Default*__: false
**readonly**?🔹 | <code>boolean</code> | Whether the generated file should be readonly.<br/>__*Default*__: true
**rules**?🔹 | <code>Array<[Rule](#projen-rule)></code> | Rules to include in the Makefile.<br/>__*Default*__: []



## struct MarkableFileOptions 🔹 <a id="projen-markablefileoptions"></a>


Options for files that may include the Projen marker.



Name | Type | Description 
-----|------|-------------
**marker**?🔹 | <code>boolean</code> | Adds the projen marker to the file.<br/>__*Default*__: false



## struct NodePackageOptions 🔹 <a id="projen-nodepackageoptions"></a>






Name | Type | Description 
-----|------|-------------
**allowLibraryDependencies**?🔹 | <code>boolean</code> | Allow the project to include `peerDependencies` and `bundledDependencies`.<br/>__*Default*__: true
**authorEmail**?🔹 | <code>string</code> | Author's e-mail.<br/>__*Optional*__
**authorName**?🔹 | <code>string</code> | Author's name.<br/>__*Optional*__
**authorOrganization**?🔹 | <code>boolean</code> | Author's Organization.<br/>__*Optional*__
**authorUrl**?🔹 | <code>string</code> | Author's URL / Website.<br/>__*Optional*__
**autoDetectBin**?🔹 | <code>boolean</code> | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.<br/>__*Default*__: true
**bin**?🔹 | <code>Map<string, string></code> | Binary programs vended with your module.<br/>__*Optional*__
**bundledDeps**?🔹 | <code>Array<string></code> | List of dependencies to bundle into this module.<br/>__*Optional*__
**deps**?🔹 | <code>Array<string></code> | Runtime dependencies of this module.<br/>__*Default*__: []
**description**?🔹 | <code>string</code> | The description is just a string that helps people understand the purpose of the package.<br/>__*Optional*__
**devDeps**?🔹 | <code>Array<string></code> | Build dependencies for this module.<br/>__*Default*__: []
**entrypoint**?🔹 | <code>string</code> | Module entrypoint (`main` in `package.json`).<br/>__*Default*__: "lib/index.js"
**homepage**?🔹 | <code>string</code> | Package's Homepage / Website.<br/>__*Optional*__
**keywords**?🔹 | <code>Array<string></code> | Keywords to include in `package.json`.<br/>__*Optional*__
**license**?🔹 | <code>string</code> | License's SPDX identifier.<br/>__*Default*__: "Apache-2.0"
**licensed**?🔹 | <code>boolean</code> | Indicates if a license should be added.<br/>__*Default*__: true
**maxNodeVersion**?🔹 | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/>__*Default*__: no max
**minNodeVersion**?🔹 | <code>string</code> | Minimum Node.js version to require via package.json `engines` (inclusive).<br/>__*Default*__: no "engines" specified
**npmAccess**?🔹 | <code>[NpmAccess](#projen-npmaccess)</code> | Access level of the npm package.<br/>__*Default*__: for scoped packages (e.g. `foo@bar`), the default is `NpmAccess.RESTRICTED`, for non-scoped packages, the default is `NpmAccess.PUBLIC`.
**npmDistTag**?🔹 | <code>string</code> | Tags can be used to provide an alias instead of version numbers.<br/>__*Default*__: "latest"
**npmRegistry**?⚠️ | <code>string</code> | The host name of the npm registry to publish to.<br/>__*Optional*__
**npmRegistryUrl**?🔹 | <code>string</code> | The base URL of the npm package registry.<br/>__*Default*__: "https://registry.npmjs.org"
**npmTaskExecution**?🔹 | <code>[NpmTaskExecution](#projen-npmtaskexecution)</code> | Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz).<br/>__*Default*__: NpmTaskExecution.PROJEN
**packageManager**?🔹 | <code>[NodePackageManager](#projen-nodepackagemanager)</code> | The Node Package Manager used to execute scripts.<br/>__*Default*__: NodePackageManager.YARN
**packageName**?🔹 | <code>string</code> | The "name" in package.json.<br/>__*Default*__: defaults to project name
**peerDependencyOptions**?🔹 | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | Options for `peerDeps`.<br/>__*Optional*__
**peerDeps**?🔹 | <code>Array<string></code> | Peer dependencies for this module.<br/>__*Default*__: []
**projenCommand**?🔹 | <code>string</code> | The shell command to use in order to run the projen CLI.<br/>__*Default*__: "npx projen"
**repository**?🔹 | <code>string</code> | The repository is the location where the actual code for your package lives.<br/>__*Optional*__
**repositoryDirectory**?🔹 | <code>string</code> | If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives.<br/>__*Optional*__
**scripts**?🔹 | <code>Map<string, string></code> | npm scripts to include.<br/>__*Default*__: {}
**stability**?🔹 | <code>string</code> | Package's Stability.<br/>__*Optional*__



## struct NodeProjectOptions 🔹 <a id="projen-nodeprojectoptions"></a>






Name | Type | Description 
-----|------|-------------
**defaultReleaseBranch**🔹 | <code>string</code> | The name of the main release branch.
**name**🔹 | <code>string</code> | This is the name of your project.
**allowLibraryDependencies**?🔹 | <code>boolean</code> | Allow the project to include `peerDependencies` and `bundledDependencies`.<br/>__*Default*__: true
**antitamper**?🔹 | <code>boolean</code> | Checks that after build there are no modified files on git.<br/>__*Default*__: true
**artifactsDirectory**?🔹 | <code>string</code> | A directory which will contain artifacts to be published to npm.<br/>__*Default*__: "dist"
**authorEmail**?🔹 | <code>string</code> | Author's e-mail.<br/>__*Optional*__
**authorName**?🔹 | <code>string</code> | Author's name.<br/>__*Optional*__
**authorOrganization**?🔹 | <code>boolean</code> | Author's Organization.<br/>__*Optional*__
**authorUrl**?🔹 | <code>string</code> | Author's URL / Website.<br/>__*Optional*__
**autoDetectBin**?🔹 | <code>boolean</code> | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.<br/>__*Default*__: true
**bin**?🔹 | <code>Map<string, string></code> | Binary programs vended with your module.<br/>__*Optional*__
**buildWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/>__*Default*__: true if not a subproject
**bundledDeps**?🔹 | <code>Array<string></code> | List of dependencies to bundle into this module.<br/>__*Optional*__
**clobber**?🔹 | <code>boolean</code> | Add a `clobber` task which resets the repo to origin.<br/>__*Default*__: true
**codeCov**?🔹 | <code>boolean</code> | Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret.<br/>__*Default*__: false
**codeCovTokenSecret**?🔹 | <code>string</code> | Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories.<br/>__*Default*__: if this option is not specified, only public repositories are supported
**copyrightOwner**?🔹 | <code>string</code> | License copyright owner.<br/>__*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?🔹 | <code>string</code> | The copyright years to put in the LICENSE file.<br/>__*Default*__: current year
**dependabot**?🔹 | <code>boolean</code> | Include dependabot configuration.<br/>__*Default*__: true
**dependabotOptions**?🔹 | <code>[github.DependabotOptions](#projen-github-dependabotoptions)</code> | Options for dependabot.<br/>__*Default*__: default options
**deps**?🔹 | <code>Array<string></code> | Runtime dependencies of this module.<br/>__*Default*__: []
**description**?🔹 | <code>string</code> | The description is just a string that helps people understand the purpose of the package.<br/>__*Optional*__
**devContainer**?🔹 | <code>boolean</code> | Add a VSCode development environment (used for GitHub Codespaces).<br/>__*Default*__: false
**devDeps**?🔹 | <code>Array<string></code> | Build dependencies for this module.<br/>__*Default*__: []
**entrypoint**?🔹 | <code>string</code> | Module entrypoint (`main` in `package.json`).<br/>__*Default*__: "lib/index.js"
**gitignore**?🔹 | <code>Array<string></code> | Additional entries to .gitignore.<br/>__*Optional*__
**gitpod**?🔹 | <code>boolean</code> | Add a Gitpod development environment.<br/>__*Default*__: false
**homepage**?🔹 | <code>string</code> | Package's Homepage / Website.<br/>__*Optional*__
**jest**?🔹 | <code>boolean</code> | Setup jest unit tests.<br/>__*Default*__: true
**jestOptions**?🔹 | <code>[JestOptions](#projen-jestoptions)</code> | Jest options.<br/>__*Default*__: default options
**jsiiFqn**?🔹 | <code>string</code> | The JSII FQN (fully qualified name) of the project class.<br/>__*Default*__: undefined
**jsiiReleaseVersion**?🔹 | <code>string</code> | Version requirement of `jsii-release` which is used to publish modules to npm.<br/>__*Default*__: "latest"
**keywords**?🔹 | <code>Array<string></code> | Keywords to include in `package.json`.<br/>__*Optional*__
**license**?🔹 | <code>string</code> | License's SPDX identifier.<br/>__*Default*__: "Apache-2.0"
**licensed**?🔹 | <code>boolean</code> | Indicates if a license should be added.<br/>__*Default*__: true
**logging**?🔹 | <code>[LoggerOptions](#projen-loggeroptions)</code> | Configure logging options such as verbosity.<br/>__*Default*__: {}
**maxNodeVersion**?🔹 | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/>__*Default*__: no max
**mergify**?🔹 | <code>boolean</code> | Adds mergify configuration.<br/>__*Default*__: true
**mergifyAutoMergeLabel**?🔹 | <code>string</code> | Automatically merge PRs that build successfully and have this label.<br/>__*Default*__: "auto-merge"
**mergifyOptions**?🔹 | <code>[github.MergifyOptions](#projen-github-mergifyoptions)</code> | Options for mergify.<br/>__*Default*__: default options
**minNodeVersion**?🔹 | <code>string</code> | Minimum Node.js version to require via package.json `engines` (inclusive).<br/>__*Default*__: no "engines" specified
**npmAccess**?🔹 | <code>[NpmAccess](#projen-npmaccess)</code> | Access level of the npm package.<br/>__*Default*__: for scoped packages (e.g. `foo@bar`), the default is `NpmAccess.RESTRICTED`, for non-scoped packages, the default is `NpmAccess.PUBLIC`.
**npmDistTag**?🔹 | <code>string</code> | Tags can be used to provide an alias instead of version numbers.<br/>__*Default*__: "latest"
**npmRegistry**?⚠️ | <code>string</code> | The host name of the npm registry to publish to.<br/>__*Optional*__
**npmRegistryUrl**?🔹 | <code>string</code> | The base URL of the npm package registry.<br/>__*Default*__: "https://registry.npmjs.org"
**npmTaskExecution**?🔹 | <code>[NpmTaskExecution](#projen-npmtaskexecution)</code> | Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz).<br/>__*Default*__: NpmTaskExecution.PROJEN
**npmignore**?🔹 | <code>Array<string></code> | Additional entries to .npmignore.<br/>__*Optional*__
**npmignoreEnabled**?🔹 | <code>boolean</code> | Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs.<br/>__*Default*__: true
**outdir**?🔹 | <code>string</code> | The root directory of the project.<br/>__*Default*__: "."
**packageManager**?🔹 | <code>[NodePackageManager](#projen-nodepackagemanager)</code> | The Node Package Manager used to execute scripts.<br/>__*Default*__: NodePackageManager.YARN
**packageName**?🔹 | <code>string</code> | The "name" in package.json.<br/>__*Default*__: defaults to project name
**parent**?🔹 | <code>[Project](#projen-project)</code> | The parent project, if this project is part of a bigger project.<br/>__*Optional*__
**peerDependencyOptions**?🔹 | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | Options for `peerDeps`.<br/>__*Optional*__
**peerDeps**?🔹 | <code>Array<string></code> | Peer dependencies for this module.<br/>__*Default*__: []
**projectType**?🔹 | <code>[ProjectType](#projen-projecttype)</code> | Which type of project this is (library/app).<br/>__*Default*__: ProjectType.UNKNOWN
**projenCommand**?🔹 | <code>string</code> | The shell command to use in order to run the projen CLI.<br/>__*Default*__: "npx projen"
**projenDevDependency**?🔹 | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/>__*Default*__: true
**projenUpgradeAutoMerge**?🔹 | <code>boolean</code> | Automatically merge projen upgrade PRs when build passes.<br/>__*Default*__: "true" if mergify auto-merge is enabled (default)
**projenUpgradeSchedule**?🔹 | <code>Array<string></code> | Customize the projenUpgrade schedule in cron expression.<br/>__*Default*__: [ "0 6 * * *" ]
**projenUpgradeSecret**?🔹 | <code>string</code> | Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`).<br/>__*Default*__: no automatic projen upgrade pull requests
**projenVersion**?🔹 | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/>__*Default*__: Semver.latest()
**pullRequestTemplate**?🔹 | <code>boolean</code> | Include a GitHub pull request template.<br/>__*Default*__: true
**pullRequestTemplateContents**?🔹 | <code>string</code> | The contents of the pull request template.<br/>__*Default*__: default content
**readme**?🔹 | <code>[SampleReadmeProps](#projen-samplereadmeprops)</code> | The README setup.<br/>__*Default*__: { filename: 'README.md', contents: '# replace this' }
**rebuildBot**?🔹 | <code>boolean</code> | Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request.<br/>__*Default*__: true if not a subproject
**rebuildBotCommand**?🔹 | <code>string</code> | The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch.<br/>__*Default*__: "rebuild"
**releaseBranches**?🔹 | <code>Array<string></code> | Branches which trigger a release.<br/>__*Default*__: [ "main" ]
**releaseEveryCommit**?🔹 | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`.<br/>__*Default*__: true
**releaseSchedule**?🔹 | <code>string</code> | CRON schedule to trigger new releases.<br/>__*Default*__: no scheduled releases
**releaseToNpm**?🔹 | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/>__*Default*__: false
**releaseWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for releasing from "main" when new versions are bumped.<br/>__*Default*__: true if not a subproject
**repository**?🔹 | <code>string</code> | The repository is the location where the actual code for your package lives.<br/>__*Optional*__
**repositoryDirectory**?🔹 | <code>string</code> | If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives.<br/>__*Optional*__
**scripts**?🔹 | <code>Map<string, string></code> | npm scripts to include.<br/>__*Default*__: {}
**stability**?🔹 | <code>string</code> | Package's Stability.<br/>__*Optional*__
**workflowBootstrapSteps**?🔹 | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/>__*Default*__: "yarn install --frozen-lockfile && yarn projen"
**workflowContainerImage**?🔹 | <code>string</code> | Container image to use for GitHub workflows.<br/>__*Default*__: default image
**workflowNodeVersion**?🔹 | <code>string</code> | The node version to use in GitHub workflows.<br/>__*Default*__: same as `minNodeVersion`



## struct NodeWorkflowSteps 🔹 <a id="projen-nodeworkflowsteps"></a>






Name | Type | Description 
-----|------|-------------
**antitamper**🔹 | <code>Array<any></code> | <span></span>
**install**🔹 | <code>Array<any></code> | <span></span>



## struct ObjectFileOptions 🔹 <a id="projen-objectfileoptions"></a>


Options for `ObjectFile`.



Name | Type | Description 
-----|------|-------------
**committed**?🔹 | <code>boolean</code> | Indicates whether this file should be committed to git or ignored.<br/>__*Default*__: true
**editGitignore**?🔹 | <code>boolean</code> | Update the project's .gitignore file.<br/>__*Default*__: true
**executable**?🔹 | <code>boolean</code> | Whether the generated file should be marked as executable.<br/>__*Default*__: false
**marker**?🔹 | <code>boolean</code> | Adds the projen marker to the file.<br/>__*Default*__: false
**obj**?🔹 | <code>any</code> | The object that will be serialized.<br/>__*Default*__: {} an empty object (use `file.obj` to mutate).
**omitEmpty**?🔹 | <code>boolean</code> | Omits empty objects and arrays.<br/>__*Default*__: false
**readonly**?🔹 | <code>boolean</code> | Whether the generated file should be readonly.<br/>__*Default*__: true



## struct PeerDependencyOptions 🔹 <a id="projen-peerdependencyoptions"></a>






Name | Type | Description 
-----|------|-------------
**pinnedDevDependency**?🔹 | <code>boolean</code> | Automatically add a pinned dev dependency.<br/>__*Default*__: true



## struct ProjectOptions 🔹 <a id="projen-projectoptions"></a>






Name | Type | Description 
-----|------|-------------
**name**🔹 | <code>string</code> | This is the name of your project.
**clobber**?🔹 | <code>boolean</code> | Add a `clobber` task which resets the repo to origin.<br/>__*Default*__: true
**devContainer**?🔹 | <code>boolean</code> | Add a VSCode development environment (used for GitHub Codespaces).<br/>__*Default*__: false
**gitpod**?🔹 | <code>boolean</code> | Add a Gitpod development environment.<br/>__*Default*__: false
**jsiiFqn**?🔹 | <code>string</code> | The JSII FQN (fully qualified name) of the project class.<br/>__*Default*__: undefined
**logging**?🔹 | <code>[LoggerOptions](#projen-loggeroptions)</code> | Configure logging options such as verbosity.<br/>__*Default*__: {}
**outdir**?🔹 | <code>string</code> | The root directory of the project.<br/>__*Default*__: "."
**parent**?🔹 | <code>[Project](#projen-project)</code> | The parent project, if this project is part of a bigger project.<br/>__*Optional*__
**projectType**?🔹 | <code>[ProjectType](#projen-projecttype)</code> | Which type of project this is (library/app).<br/>__*Default*__: ProjectType.UNKNOWN
**readme**?🔹 | <code>[SampleReadmeProps](#projen-samplereadmeprops)</code> | The README setup.<br/>__*Default*__: { filename: 'README.md', contents: '# replace this' }



## struct PublisherOptions 🔹 <a id="projen-publisheroptions"></a>


Options for `Publisher`.



Name | Type | Description 
-----|------|-------------
**artifactName**🔹 | <code>string</code> | The name of the artifact to download (e.g. `dist`).
**buildJobId**🔹 | <code>string</code> | The job ID that produces the build artifacts.
**workflow**🔹 | <code>[github.GithubWorkflow](#projen-github-githubworkflow)</code> | The github workflow to add release jobs to.
**jsiiReleaseVersion**?🔹 | <code>string</code> | Version requirement for `jsii-release`.<br/>__*Default*__: "latest"



## struct ResolveOptions 🔹 <a id="projen-resolveoptions"></a>


Resolve options.



Name | Type | Description 
-----|------|-------------
**args**?🔹 | <code>Array<any></code> | Context arguments.<br/>__*Default*__: []
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



## struct SampleReadmeProps 🔹 <a id="projen-samplereadmeprops"></a>


SampleReadme Properties.



Name | Type | Description 
-----|------|-------------
**contents**?🔹 | <code>string</code> | The contents.<br/>__*Default*__: "# replace this"
**filename**?🔹 | <code>string</code> | The name of the README.md file.<br/>__*Default*__: "README.md"



## struct TextFileOptions 🔹 <a id="projen-textfileoptions"></a>


Options for `TextFile`.



Name | Type | Description 
-----|------|-------------
**committed**?🔹 | <code>boolean</code> | Indicates whether this file should be committed to git or ignored.<br/>__*Default*__: true
**editGitignore**?🔹 | <code>boolean</code> | Update the project's .gitignore file.<br/>__*Default*__: true
**executable**?🔹 | <code>boolean</code> | Whether the generated file should be marked as executable.<br/>__*Default*__: false
**lines**?🔹 | <code>Array<string></code> | The contents of the text file.<br/>__*Default*__: [] empty file
**readonly**?🔹 | <code>boolean</code> | Whether the generated file should be readonly.<br/>__*Default*__: true



## struct TomlFileOptions 🔹 <a id="projen-tomlfileoptions"></a>


Options for `TomlFile`.



Name | Type | Description 
-----|------|-------------
**committed**?🔹 | <code>boolean</code> | Indicates whether this file should be committed to git or ignored.<br/>__*Default*__: true
**editGitignore**?🔹 | <code>boolean</code> | Update the project's .gitignore file.<br/>__*Default*__: true
**executable**?🔹 | <code>boolean</code> | Whether the generated file should be marked as executable.<br/>__*Default*__: false
**marker**?🔹 | <code>boolean</code> | Adds the projen marker to the file.<br/>__*Default*__: false
**obj**?🔹 | <code>any</code> | The object that will be serialized.<br/>__*Default*__: {} an empty object (use `file.obj` to mutate).
**omitEmpty**?🔹 | <code>boolean</code> | Omits empty objects and arrays.<br/>__*Default*__: false
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
**jsx**?🔹 | <code>[TypeScriptJsxMode](#projen-typescriptjsxmode)</code> | Support JSX in .tsx files: "react", "preserve", "react-native" etc.<br/>__*Default*__: undefined
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
**defaultReleaseBranch**⚠️ | <code>string</code> | The name of the main release branch.
**name**⚠️ | <code>string</code> | This is the name of your project.
**allowLibraryDependencies**?⚠️ | <code>boolean</code> | Allow the project to include `peerDependencies` and `bundledDependencies`.<br/>__*Default*__: true
**antitamper**?⚠️ | <code>boolean</code> | Checks that after build there are no modified files on git.<br/>__*Default*__: true
**artifactsDirectory**?⚠️ | <code>string</code> | A directory which will contain artifacts to be published to npm.<br/>__*Default*__: "dist"
**authorEmail**?⚠️ | <code>string</code> | Author's e-mail.<br/>__*Optional*__
**authorName**?⚠️ | <code>string</code> | Author's name.<br/>__*Optional*__
**authorOrganization**?⚠️ | <code>boolean</code> | Author's Organization.<br/>__*Optional*__
**authorUrl**?⚠️ | <code>string</code> | Author's URL / Website.<br/>__*Optional*__
**autoDetectBin**?⚠️ | <code>boolean</code> | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.<br/>__*Default*__: true
**bin**?⚠️ | <code>Map<string, string></code> | Binary programs vended with your module.<br/>__*Optional*__
**buildWorkflow**?⚠️ | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/>__*Default*__: true if not a subproject
**bundledDeps**?⚠️ | <code>Array<string></code> | List of dependencies to bundle into this module.<br/>__*Optional*__
**clobber**?⚠️ | <code>boolean</code> | Add a `clobber` task which resets the repo to origin.<br/>__*Default*__: true
**codeCov**?⚠️ | <code>boolean</code> | Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret.<br/>__*Default*__: false
**codeCovTokenSecret**?⚠️ | <code>string</code> | Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories.<br/>__*Default*__: if this option is not specified, only public repositories are supported
**compileBeforeTest**?⚠️ | <code>boolean</code> | Compile the code before running tests.<br/>__*Default*__: if `testdir` is under `src/**`, the default is `true`, otherwise the default is `false.
**copyrightOwner**?⚠️ | <code>string</code> | License copyright owner.<br/>__*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?⚠️ | <code>string</code> | The copyright years to put in the LICENSE file.<br/>__*Default*__: current year
**dependabot**?⚠️ | <code>boolean</code> | Include dependabot configuration.<br/>__*Default*__: true
**dependabotOptions**?⚠️ | <code>[github.DependabotOptions](#projen-github-dependabotoptions)</code> | Options for dependabot.<br/>__*Default*__: default options
**deps**?⚠️ | <code>Array<string></code> | Runtime dependencies of this module.<br/>__*Default*__: []
**description**?⚠️ | <code>string</code> | The description is just a string that helps people understand the purpose of the package.<br/>__*Optional*__
**devContainer**?⚠️ | <code>boolean</code> | Add a VSCode development environment (used for GitHub Codespaces).<br/>__*Default*__: false
**devDeps**?⚠️ | <code>Array<string></code> | Build dependencies for this module.<br/>__*Default*__: []
**disableTsconfig**?⚠️ | <code>boolean</code> | Do not generate a `tsconfig.json` file (used by jsii projects since tsconfig.json is generated by the jsii compiler).<br/>__*Default*__: false
**docgen**?⚠️ | <code>boolean</code> | Docgen by Typedoc.<br/>__*Default*__: false
**docsDirectory**?⚠️ | <code>string</code> | Docs directory.<br/>__*Default*__: "docs"
**entrypoint**?⚠️ | <code>string</code> | Module entrypoint (`main` in `package.json`).<br/>__*Default*__: "lib/index.js"
**entrypointTypes**?⚠️ | <code>string</code> | The .d.ts file that includes the type declarations for this module.<br/>__*Default*__: .d.ts file derived from the project's entrypoint (usually lib/index.d.ts)
**eslint**?⚠️ | <code>boolean</code> | Setup eslint.<br/>__*Default*__: true
**eslintOptions**?⚠️ | <code>[EslintOptions](#projen-eslintoptions)</code> | Eslint options.<br/>__*Default*__: opinionated default options
**gitignore**?⚠️ | <code>Array<string></code> | Additional entries to .gitignore.<br/>__*Optional*__
**gitpod**?⚠️ | <code>boolean</code> | Add a Gitpod development environment.<br/>__*Default*__: false
**homepage**?⚠️ | <code>string</code> | Package's Homepage / Website.<br/>__*Optional*__
**jest**?⚠️ | <code>boolean</code> | Setup jest unit tests.<br/>__*Default*__: true
**jestOptions**?⚠️ | <code>[JestOptions](#projen-jestoptions)</code> | Jest options.<br/>__*Default*__: default options
**jsiiFqn**?⚠️ | <code>string</code> | The JSII FQN (fully qualified name) of the project class.<br/>__*Default*__: undefined
**jsiiReleaseVersion**?⚠️ | <code>string</code> | Version requirement of `jsii-release` which is used to publish modules to npm.<br/>__*Default*__: "latest"
**keywords**?⚠️ | <code>Array<string></code> | Keywords to include in `package.json`.<br/>__*Optional*__
**libdir**?⚠️ | <code>string</code> | Typescript  artifacts output directory.<br/>__*Default*__: "lib"
**license**?⚠️ | <code>string</code> | License's SPDX identifier.<br/>__*Default*__: "Apache-2.0"
**licensed**?⚠️ | <code>boolean</code> | Indicates if a license should be added.<br/>__*Default*__: true
**logging**?⚠️ | <code>[LoggerOptions](#projen-loggeroptions)</code> | Configure logging options such as verbosity.<br/>__*Default*__: {}
**maxNodeVersion**?⚠️ | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/>__*Default*__: no max
**mergify**?⚠️ | <code>boolean</code> | Adds mergify configuration.<br/>__*Default*__: true
**mergifyAutoMergeLabel**?⚠️ | <code>string</code> | Automatically merge PRs that build successfully and have this label.<br/>__*Default*__: "auto-merge"
**mergifyOptions**?⚠️ | <code>[github.MergifyOptions](#projen-github-mergifyoptions)</code> | Options for mergify.<br/>__*Default*__: default options
**minNodeVersion**?⚠️ | <code>string</code> | Minimum Node.js version to require via package.json `engines` (inclusive).<br/>__*Default*__: no "engines" specified
**npmAccess**?⚠️ | <code>[NpmAccess](#projen-npmaccess)</code> | Access level of the npm package.<br/>__*Default*__: for scoped packages (e.g. `foo@bar`), the default is `NpmAccess.RESTRICTED`, for non-scoped packages, the default is `NpmAccess.PUBLIC`.
**npmDistTag**?⚠️ | <code>string</code> | Tags can be used to provide an alias instead of version numbers.<br/>__*Default*__: "latest"
**npmRegistry**?⚠️ | <code>string</code> | The host name of the npm registry to publish to.<br/>__*Optional*__
**npmRegistryUrl**?⚠️ | <code>string</code> | The base URL of the npm package registry.<br/>__*Default*__: "https://registry.npmjs.org"
**npmTaskExecution**?⚠️ | <code>[NpmTaskExecution](#projen-npmtaskexecution)</code> | Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz).<br/>__*Default*__: NpmTaskExecution.PROJEN
**npmignore**?⚠️ | <code>Array<string></code> | Additional entries to .npmignore.<br/>__*Optional*__
**npmignoreEnabled**?⚠️ | <code>boolean</code> | Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs.<br/>__*Default*__: true
**outdir**?⚠️ | <code>string</code> | The root directory of the project.<br/>__*Default*__: "."
**package**?⚠️ | <code>boolean</code> | Defines a `yarn package` command that will produce a tarball and place it under `dist/js`.<br/>__*Default*__: true
**packageManager**?⚠️ | <code>[NodePackageManager](#projen-nodepackagemanager)</code> | The Node Package Manager used to execute scripts.<br/>__*Default*__: NodePackageManager.YARN
**packageName**?⚠️ | <code>string</code> | The "name" in package.json.<br/>__*Default*__: defaults to project name
**parent**?⚠️ | <code>[Project](#projen-project)</code> | The parent project, if this project is part of a bigger project.<br/>__*Optional*__
**peerDependencyOptions**?⚠️ | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | Options for `peerDeps`.<br/>__*Optional*__
**peerDeps**?⚠️ | <code>Array<string></code> | Peer dependencies for this module.<br/>__*Default*__: []
**projectType**?⚠️ | <code>[ProjectType](#projen-projecttype)</code> | Which type of project this is (library/app).<br/>__*Default*__: ProjectType.UNKNOWN
**projenCommand**?⚠️ | <code>string</code> | The shell command to use in order to run the projen CLI.<br/>__*Default*__: "npx projen"
**projenDevDependency**?⚠️ | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/>__*Default*__: true
**projenUpgradeAutoMerge**?⚠️ | <code>boolean</code> | Automatically merge projen upgrade PRs when build passes.<br/>__*Default*__: "true" if mergify auto-merge is enabled (default)
**projenUpgradeSchedule**?⚠️ | <code>Array<string></code> | Customize the projenUpgrade schedule in cron expression.<br/>__*Default*__: [ "0 6 * * *" ]
**projenUpgradeSecret**?⚠️ | <code>string</code> | Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`).<br/>__*Default*__: no automatic projen upgrade pull requests
**projenVersion**?⚠️ | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/>__*Default*__: Semver.latest()
**pullRequestTemplate**?⚠️ | <code>boolean</code> | Include a GitHub pull request template.<br/>__*Default*__: true
**pullRequestTemplateContents**?⚠️ | <code>string</code> | The contents of the pull request template.<br/>__*Default*__: default content
**readme**?⚠️ | <code>[SampleReadmeProps](#projen-samplereadmeprops)</code> | The README setup.<br/>__*Default*__: { filename: 'README.md', contents: '# replace this' }
**rebuildBot**?⚠️ | <code>boolean</code> | Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request.<br/>__*Default*__: true if not a subproject
**rebuildBotCommand**?⚠️ | <code>string</code> | The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch.<br/>__*Default*__: "rebuild"
**releaseBranches**?⚠️ | <code>Array<string></code> | Branches which trigger a release.<br/>__*Default*__: [ "main" ]
**releaseEveryCommit**?⚠️ | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`.<br/>__*Default*__: true
**releaseSchedule**?⚠️ | <code>string</code> | CRON schedule to trigger new releases.<br/>__*Default*__: no scheduled releases
**releaseToNpm**?⚠️ | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/>__*Default*__: false
**releaseWorkflow**?⚠️ | <code>boolean</code> | Define a GitHub workflow for releasing from "main" when new versions are bumped.<br/>__*Default*__: true if not a subproject
**repository**?⚠️ | <code>string</code> | The repository is the location where the actual code for your package lives.<br/>__*Optional*__
**repositoryDirectory**?⚠️ | <code>string</code> | If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives.<br/>__*Optional*__
**sampleCode**?⚠️ | <code>boolean</code> | Generate one-time sample in `src/` and `test/` if there are no files there.<br/>__*Default*__: true
**scripts**?⚠️ | <code>Map<string, string></code> | npm scripts to include.<br/>__*Default*__: {}
**srcdir**?⚠️ | <code>string</code> | Typescript sources directory.<br/>__*Default*__: "src"
**stability**?⚠️ | <code>string</code> | Package's Stability.<br/>__*Optional*__
**testdir**?⚠️ | <code>string</code> | Jest tests directory. Tests files should be named `xxx.test.ts`.<br/>__*Default*__: "test"
**tsconfig**?⚠️ | <code>[TypescriptConfigOptions](#projen-typescriptconfigoptions)</code> | Custom TSConfig.<br/>__*Optional*__
**typescriptVersion**?⚠️ | <code>string</code> | TypeScript version to use.<br/>__*Default*__: "latest"
**workflowBootstrapSteps**?⚠️ | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/>__*Default*__: "yarn install --frozen-lockfile && yarn projen"
**workflowContainerImage**?⚠️ | <code>string</code> | Container image to use for GitHub workflows.<br/>__*Default*__: default image
**workflowNodeVersion**?⚠️ | <code>string</code> | The node version to use in GitHub workflows.<br/>__*Default*__: same as `minNodeVersion`



## struct TypeScriptProjectOptions 🔹 <a id="projen-typescriptprojectoptions"></a>






Name | Type | Description 
-----|------|-------------
**defaultReleaseBranch**🔹 | <code>string</code> | The name of the main release branch.
**name**🔹 | <code>string</code> | This is the name of your project.
**allowLibraryDependencies**?🔹 | <code>boolean</code> | Allow the project to include `peerDependencies` and `bundledDependencies`.<br/>__*Default*__: true
**antitamper**?🔹 | <code>boolean</code> | Checks that after build there are no modified files on git.<br/>__*Default*__: true
**artifactsDirectory**?🔹 | <code>string</code> | A directory which will contain artifacts to be published to npm.<br/>__*Default*__: "dist"
**authorEmail**?🔹 | <code>string</code> | Author's e-mail.<br/>__*Optional*__
**authorName**?🔹 | <code>string</code> | Author's name.<br/>__*Optional*__
**authorOrganization**?🔹 | <code>boolean</code> | Author's Organization.<br/>__*Optional*__
**authorUrl**?🔹 | <code>string</code> | Author's URL / Website.<br/>__*Optional*__
**autoDetectBin**?🔹 | <code>boolean</code> | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.<br/>__*Default*__: true
**bin**?🔹 | <code>Map<string, string></code> | Binary programs vended with your module.<br/>__*Optional*__
**buildWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/>__*Default*__: true if not a subproject
**bundledDeps**?🔹 | <code>Array<string></code> | List of dependencies to bundle into this module.<br/>__*Optional*__
**clobber**?🔹 | <code>boolean</code> | Add a `clobber` task which resets the repo to origin.<br/>__*Default*__: true
**codeCov**?🔹 | <code>boolean</code> | Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret.<br/>__*Default*__: false
**codeCovTokenSecret**?🔹 | <code>string</code> | Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories.<br/>__*Default*__: if this option is not specified, only public repositories are supported
**compileBeforeTest**?🔹 | <code>boolean</code> | Compile the code before running tests.<br/>__*Default*__: if `testdir` is under `src/**`, the default is `true`, otherwise the default is `false.
**copyrightOwner**?🔹 | <code>string</code> | License copyright owner.<br/>__*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?🔹 | <code>string</code> | The copyright years to put in the LICENSE file.<br/>__*Default*__: current year
**dependabot**?🔹 | <code>boolean</code> | Include dependabot configuration.<br/>__*Default*__: true
**dependabotOptions**?🔹 | <code>[github.DependabotOptions](#projen-github-dependabotoptions)</code> | Options for dependabot.<br/>__*Default*__: default options
**deps**?🔹 | <code>Array<string></code> | Runtime dependencies of this module.<br/>__*Default*__: []
**description**?🔹 | <code>string</code> | The description is just a string that helps people understand the purpose of the package.<br/>__*Optional*__
**devContainer**?🔹 | <code>boolean</code> | Add a VSCode development environment (used for GitHub Codespaces).<br/>__*Default*__: false
**devDeps**?🔹 | <code>Array<string></code> | Build dependencies for this module.<br/>__*Default*__: []
**disableTsconfig**?🔹 | <code>boolean</code> | Do not generate a `tsconfig.json` file (used by jsii projects since tsconfig.json is generated by the jsii compiler).<br/>__*Default*__: false
**docgen**?🔹 | <code>boolean</code> | Docgen by Typedoc.<br/>__*Default*__: false
**docsDirectory**?🔹 | <code>string</code> | Docs directory.<br/>__*Default*__: "docs"
**entrypoint**?🔹 | <code>string</code> | Module entrypoint (`main` in `package.json`).<br/>__*Default*__: "lib/index.js"
**entrypointTypes**?🔹 | <code>string</code> | The .d.ts file that includes the type declarations for this module.<br/>__*Default*__: .d.ts file derived from the project's entrypoint (usually lib/index.d.ts)
**eslint**?🔹 | <code>boolean</code> | Setup eslint.<br/>__*Default*__: true
**eslintOptions**?🔹 | <code>[EslintOptions](#projen-eslintoptions)</code> | Eslint options.<br/>__*Default*__: opinionated default options
**gitignore**?🔹 | <code>Array<string></code> | Additional entries to .gitignore.<br/>__*Optional*__
**gitpod**?🔹 | <code>boolean</code> | Add a Gitpod development environment.<br/>__*Default*__: false
**homepage**?🔹 | <code>string</code> | Package's Homepage / Website.<br/>__*Optional*__
**jest**?🔹 | <code>boolean</code> | Setup jest unit tests.<br/>__*Default*__: true
**jestOptions**?🔹 | <code>[JestOptions](#projen-jestoptions)</code> | Jest options.<br/>__*Default*__: default options
**jsiiFqn**?🔹 | <code>string</code> | The JSII FQN (fully qualified name) of the project class.<br/>__*Default*__: undefined
**jsiiReleaseVersion**?🔹 | <code>string</code> | Version requirement of `jsii-release` which is used to publish modules to npm.<br/>__*Default*__: "latest"
**keywords**?🔹 | <code>Array<string></code> | Keywords to include in `package.json`.<br/>__*Optional*__
**libdir**?🔹 | <code>string</code> | Typescript  artifacts output directory.<br/>__*Default*__: "lib"
**license**?🔹 | <code>string</code> | License's SPDX identifier.<br/>__*Default*__: "Apache-2.0"
**licensed**?🔹 | <code>boolean</code> | Indicates if a license should be added.<br/>__*Default*__: true
**logging**?🔹 | <code>[LoggerOptions](#projen-loggeroptions)</code> | Configure logging options such as verbosity.<br/>__*Default*__: {}
**maxNodeVersion**?🔹 | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/>__*Default*__: no max
**mergify**?🔹 | <code>boolean</code> | Adds mergify configuration.<br/>__*Default*__: true
**mergifyAutoMergeLabel**?🔹 | <code>string</code> | Automatically merge PRs that build successfully and have this label.<br/>__*Default*__: "auto-merge"
**mergifyOptions**?🔹 | <code>[github.MergifyOptions](#projen-github-mergifyoptions)</code> | Options for mergify.<br/>__*Default*__: default options
**minNodeVersion**?🔹 | <code>string</code> | Minimum Node.js version to require via package.json `engines` (inclusive).<br/>__*Default*__: no "engines" specified
**npmAccess**?🔹 | <code>[NpmAccess](#projen-npmaccess)</code> | Access level of the npm package.<br/>__*Default*__: for scoped packages (e.g. `foo@bar`), the default is `NpmAccess.RESTRICTED`, for non-scoped packages, the default is `NpmAccess.PUBLIC`.
**npmDistTag**?🔹 | <code>string</code> | Tags can be used to provide an alias instead of version numbers.<br/>__*Default*__: "latest"
**npmRegistry**?⚠️ | <code>string</code> | The host name of the npm registry to publish to.<br/>__*Optional*__
**npmRegistryUrl**?🔹 | <code>string</code> | The base URL of the npm package registry.<br/>__*Default*__: "https://registry.npmjs.org"
**npmTaskExecution**?🔹 | <code>[NpmTaskExecution](#projen-npmtaskexecution)</code> | Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz).<br/>__*Default*__: NpmTaskExecution.PROJEN
**npmignore**?🔹 | <code>Array<string></code> | Additional entries to .npmignore.<br/>__*Optional*__
**npmignoreEnabled**?🔹 | <code>boolean</code> | Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs.<br/>__*Default*__: true
**outdir**?🔹 | <code>string</code> | The root directory of the project.<br/>__*Default*__: "."
**package**?🔹 | <code>boolean</code> | Defines a `yarn package` command that will produce a tarball and place it under `dist/js`.<br/>__*Default*__: true
**packageManager**?🔹 | <code>[NodePackageManager](#projen-nodepackagemanager)</code> | The Node Package Manager used to execute scripts.<br/>__*Default*__: NodePackageManager.YARN
**packageName**?🔹 | <code>string</code> | The "name" in package.json.<br/>__*Default*__: defaults to project name
**parent**?🔹 | <code>[Project](#projen-project)</code> | The parent project, if this project is part of a bigger project.<br/>__*Optional*__
**peerDependencyOptions**?🔹 | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | Options for `peerDeps`.<br/>__*Optional*__
**peerDeps**?🔹 | <code>Array<string></code> | Peer dependencies for this module.<br/>__*Default*__: []
**projectType**?🔹 | <code>[ProjectType](#projen-projecttype)</code> | Which type of project this is (library/app).<br/>__*Default*__: ProjectType.UNKNOWN
**projenCommand**?🔹 | <code>string</code> | The shell command to use in order to run the projen CLI.<br/>__*Default*__: "npx projen"
**projenDevDependency**?🔹 | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/>__*Default*__: true
**projenUpgradeAutoMerge**?🔹 | <code>boolean</code> | Automatically merge projen upgrade PRs when build passes.<br/>__*Default*__: "true" if mergify auto-merge is enabled (default)
**projenUpgradeSchedule**?🔹 | <code>Array<string></code> | Customize the projenUpgrade schedule in cron expression.<br/>__*Default*__: [ "0 6 * * *" ]
**projenUpgradeSecret**?🔹 | <code>string</code> | Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`).<br/>__*Default*__: no automatic projen upgrade pull requests
**projenVersion**?🔹 | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/>__*Default*__: Semver.latest()
**pullRequestTemplate**?🔹 | <code>boolean</code> | Include a GitHub pull request template.<br/>__*Default*__: true
**pullRequestTemplateContents**?🔹 | <code>string</code> | The contents of the pull request template.<br/>__*Default*__: default content
**readme**?🔹 | <code>[SampleReadmeProps](#projen-samplereadmeprops)</code> | The README setup.<br/>__*Default*__: { filename: 'README.md', contents: '# replace this' }
**rebuildBot**?🔹 | <code>boolean</code> | Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request.<br/>__*Default*__: true if not a subproject
**rebuildBotCommand**?🔹 | <code>string</code> | The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch.<br/>__*Default*__: "rebuild"
**releaseBranches**?🔹 | <code>Array<string></code> | Branches which trigger a release.<br/>__*Default*__: [ "main" ]
**releaseEveryCommit**?🔹 | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`.<br/>__*Default*__: true
**releaseSchedule**?🔹 | <code>string</code> | CRON schedule to trigger new releases.<br/>__*Default*__: no scheduled releases
**releaseToNpm**?🔹 | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/>__*Default*__: false
**releaseWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for releasing from "main" when new versions are bumped.<br/>__*Default*__: true if not a subproject
**repository**?🔹 | <code>string</code> | The repository is the location where the actual code for your package lives.<br/>__*Optional*__
**repositoryDirectory**?🔹 | <code>string</code> | If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives.<br/>__*Optional*__
**sampleCode**?🔹 | <code>boolean</code> | Generate one-time sample in `src/` and `test/` if there are no files there.<br/>__*Default*__: true
**scripts**?🔹 | <code>Map<string, string></code> | npm scripts to include.<br/>__*Default*__: {}
**srcdir**?🔹 | <code>string</code> | Typescript sources directory.<br/>__*Default*__: "src"
**stability**?🔹 | <code>string</code> | Package's Stability.<br/>__*Optional*__
**testdir**?🔹 | <code>string</code> | Jest tests directory. Tests files should be named `xxx.test.ts`.<br/>__*Default*__: "test"
**tsconfig**?🔹 | <code>[TypescriptConfigOptions](#projen-typescriptconfigoptions)</code> | Custom TSConfig.<br/>__*Optional*__
**typescriptVersion**?🔹 | <code>string</code> | TypeScript version to use.<br/>__*Default*__: "latest"
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



## struct XmlFileOptions 🔹 <a id="projen-xmlfileoptions"></a>


Options for `XmlFile`.



Name | Type | Description 
-----|------|-------------
**committed**?🔹 | <code>boolean</code> | Indicates whether this file should be committed to git or ignored.<br/>__*Default*__: true
**editGitignore**?🔹 | <code>boolean</code> | Update the project's .gitignore file.<br/>__*Default*__: true
**executable**?🔹 | <code>boolean</code> | Whether the generated file should be marked as executable.<br/>__*Default*__: false
**marker**?🔹 | <code>boolean</code> | Adds the projen marker to the file.<br/>__*Default*__: false
**obj**?🔹 | <code>any</code> | The object that will be serialized.<br/>__*Default*__: {} an empty object (use `file.obj` to mutate).
**omitEmpty**?🔹 | <code>boolean</code> | Omits empty objects and arrays.<br/>__*Default*__: false
**readonly**?🔹 | <code>boolean</code> | Whether the generated file should be readonly.<br/>__*Default*__: true



## struct YamlFileOptions 🔹 <a id="projen-yamlfileoptions"></a>


Options for `JsonFile`.



Name | Type | Description 
-----|------|-------------
**committed**?🔹 | <code>boolean</code> | Indicates whether this file should be committed to git or ignored.<br/>__*Default*__: true
**editGitignore**?🔹 | <code>boolean</code> | Update the project's .gitignore file.<br/>__*Default*__: true
**executable**?🔹 | <code>boolean</code> | Whether the generated file should be marked as executable.<br/>__*Default*__: false
**marker**?🔹 | <code>boolean</code> | Adds the projen marker to the file.<br/>__*Default*__: false
**obj**?🔹 | <code>any</code> | The object that will be serialized.<br/>__*Default*__: {} an empty object (use `file.obj` to mutate).
**omitEmpty**?🔹 | <code>boolean</code> | Omits empty objects and arrays.<br/>__*Default*__: false
**readonly**?🔹 | <code>boolean</code> | Whether the generated file should be readonly.<br/>__*Default*__: true



## struct Dependency 🔹 <a id="projen-deps-dependency"></a>

__Obtainable from__: [Dependencies](#projen-deps-dependencies).[addDependency](#projen-deps-dependencies#projen-deps-dependencies-adddependency)(), [Dependencies](#projen-deps-dependencies).[getDependency](#projen-deps-dependencies#projen-deps-dependencies-getdependency)(), [JavaProject](#projen-java-javaproject).[addPlugin](#projen-java-javaproject#projen-java-javaproject-addplugin)(), [Pom](#projen-java-pom).[addPlugin](#projen-java-pom#projen-java-pom-addplugin)()

Represents a project dependency.



Name | Type | Description 
-----|------|-------------
**name**🔹 | <code>string</code> | The package manager name of the dependency (e.g. `leftpad` for npm).
**type**🔹 | <code>[deps.DependencyType](#projen-deps-dependencytype)</code> | Which type of dependency this is (runtime, build-time, etc).
**metadata**?🔹 | <code>Map<string, any></code> | Additional JSON metadata associated with the dependency (package manager specific).<br/>__*Default*__: {}
**version**?🔹 | <code>string</code> | Semantic version version requirement.<br/>__*Default*__: requirement is managed by the package manager (e.g. npm/yarn).



## struct DependencyCoordinates 🔹 <a id="projen-deps-dependencycoordinates"></a>

__Obtainable from__: [Dependencies](#projen-deps-dependencies).[parseDependency](#projen-deps-dependencies#projen-deps-dependencies-parsedependency)()

Coordinates of the dependency (name and version).



Name | Type | Description 
-----|------|-------------
**name**🔹 | <code>string</code> | The package manager name of the dependency (e.g. `leftpad` for npm).
**version**?🔹 | <code>string</code> | Semantic version version requirement.<br/>__*Default*__: requirement is managed by the package manager (e.g. npm/yarn).



## struct DepsManifest 🔹 <a id="projen-deps-depsmanifest"></a>






Name | Type | Description 
-----|------|-------------
**dependencies**🔹 | <code>Array<[deps.Dependency](#projen-deps-dependency)></code> | All dependencies of this module.



## struct AutoMergeOptions 🔹 <a id="projen-github-automergeoptions"></a>






Name | Type | Description 
-----|------|-------------
**approvedReviews**?🔹 | <code>number</code> | Number of approved code reviews.<br/>__*Default*__: 1
**autoMergeLabel**?🔹 | <code>string</code> | Automatically merge PRs that build successfully and have this label.<br/>__*Default*__: "auto-merge"
**buildJob**?🔹 | <code>string</code> | The GitHub job ID of the build workflow.<br/>__*Optional*__



## struct DependabotIgnore 🔹 <a id="projen-github-dependabotignore"></a>


You can use the `ignore` option to customize which dependencies are updated.

The ignore option supports the following options.



Name | Type | Description 
-----|------|-------------
**dependencyName**🔹 | <code>string</code> | Use to ignore updates for dependencies with matching names, optionally using `*` to match zero or more characters.
**versions**?🔹 | <code>Array<string></code> | Use to ignore specific versions or ranges of versions.<br/>__*Optional*__



## struct DependabotOptions 🔹 <a id="projen-github-dependabotoptions"></a>






Name | Type | Description 
-----|------|-------------
**autoMerge**?🔹 | <code>boolean</code> | Automatically merge dependabot PRs if build CI build passes.<br/>__*Default*__: true
**ignore**?🔹 | <code>Array<[github.DependabotIgnore](#projen-github-dependabotignore)></code> | You can use the `ignore` option to customize which dependencies are updated.<br/>__*Default*__: []
**ignoreProjen**?🔹 | <code>boolean</code> | Ignores updates to `projen`.<br/>__*Default*__: true
**scheduleInterval**?🔹 | <code>[github.DependabotScheduleInterval](#projen-github-dependabotscheduleinterval)</code> | How often to check for new versions and raise pull requests.<br/>__*Default*__: ScheduleInterval.DAILY
**versioningStrategy**?🔹 | <code>[github.VersioningStrategy](#projen-github-versioningstrategy)</code> | The strategy to use when edits manifest and lock files.<br/>__*Default*__: VersioningStrategy.LOCKFILE_ONLY The default is to only update the lock file because package.json is controlled by projen and any outside updates will fail the build.



## struct MergifyOptions 🔹 <a id="projen-github-mergifyoptions"></a>






Name | Type | Description 
-----|------|-------------
**rules**?🔹 | <code>Array<[github.MergifyRule](#projen-github-mergifyrule)></code> | __*Optional*__



## struct MergifyRule 🔹 <a id="projen-github-mergifyrule"></a>






Name | Type | Description 
-----|------|-------------
**actions**🔹 | <code>Map<string, any></code> | <span></span>
**conditions**🔹 | <code>Array<string></code> | <span></span>
**name**🔹 | <code>string</code> | <span></span>



## struct PullRequestTemplateOptions 🔹 <a id="projen-github-pullrequesttemplateoptions"></a>


Options for `PullRequestTemplate`.



Name | Type | Description 
-----|------|-------------
**lines**?🔹 | <code>Array<string></code> | The contents of the template.<br/>__*Default*__: a standard default template will be created.



## struct JavaProjectOptions 🔹 <a id="projen-java-javaprojectoptions"></a>


Options for `JavaProject`.



Name | Type | Description 
-----|------|-------------
**artifactId**🔹 | <code>string</code> | The artifactId is generally the name that the project is known by.
**groupId**🔹 | <code>string</code> | This is generally unique amongst an organization or a project.
**name**🔹 | <code>string</code> | This is the name of your project.
**version**🔹 | <code>string</code> | This is the last piece of the naming puzzle.
**clobber**?🔹 | <code>boolean</code> | Add a `clobber` task which resets the repo to origin.<br/>__*Default*__: true
**compileOptions**?🔹 | <code>[java.MavenCompileOptions](#projen-java-mavencompileoptions)</code> | Compile options.<br/>__*Default*__: defaults
**deps**?🔹 | <code>Array<string></code> | List of runtime dependencies for this project.<br/>__*Default*__: []
**description**?🔹 | <code>string</code> | Description of a project is always good.<br/>__*Default*__: undefined
**devContainer**?🔹 | <code>boolean</code> | Add a VSCode development environment (used for GitHub Codespaces).<br/>__*Default*__: false
**distdir**?🔹 | <code>string</code> | Final artifact output directory.<br/>__*Default*__: "dist/java"
**gitpod**?🔹 | <code>boolean</code> | Add a Gitpod development environment.<br/>__*Default*__: false
**jsiiFqn**?🔹 | <code>string</code> | The JSII FQN (fully qualified name) of the project class.<br/>__*Default*__: undefined
**junit**?🔹 | <code>boolean</code> | Include junit tests.<br/>__*Default*__: true
**junitOptions**?🔹 | <code>[java.JunitOptions](#projen-java-junitoptions)</code> | junit options.<br/>__*Default*__: defaults
**logging**?🔹 | <code>[LoggerOptions](#projen-loggeroptions)</code> | Configure logging options such as verbosity.<br/>__*Default*__: {}
**outdir**?🔹 | <code>string</code> | The root directory of the project.<br/>__*Default*__: "."
**packaging**?🔹 | <code>string</code> | Project packaging format.<br/>__*Default*__: "jar"
**packagingOptions**?🔹 | <code>[java.MavenPackagingOptions](#projen-java-mavenpackagingoptions)</code> | Packaging options.<br/>__*Default*__: defaults
**parent**?🔹 | <code>[Project](#projen-project)</code> | The parent project, if this project is part of a bigger project.<br/>__*Optional*__
**projectType**?🔹 | <code>[ProjectType](#projen-projecttype)</code> | Which type of project this is (library/app).<br/>__*Default*__: ProjectType.UNKNOWN
**projenrcJava**?🔹 | <code>boolean</code> | Use projenrc in java.<br/>__*Default*__: true
**projenrcJavaOptions**?🔹 | <code>[java.ProjenrcCommonOptions](#projen-java-projenrccommonoptions)</code> | Options related to projenrc in java.<br/>__*Default*__: default options
**readme**?🔹 | <code>[SampleReadmeProps](#projen-samplereadmeprops)</code> | The README setup.<br/>__*Default*__: { filename: 'README.md', contents: '# replace this' }
**sample**?🔹 | <code>boolean</code> | Include sample code and test if the relevant directories don't exist.<br/>__*Optional*__
**sampleJavaPackage**?🔹 | <code>string</code> | The java package to use for the code sample.<br/>__*Default*__: "org.acme"
**testDeps**?🔹 | <code>Array<string></code> | List of test dependencies for this project.<br/>__*Default*__: []
**url**?🔹 | <code>string</code> | The URL, like the name, is not required.<br/>__*Default*__: undefined



## struct JunitOptions 🔹 <a id="projen-java-junitoptions"></a>


Options for `Junit`.



Name | Type | Description 
-----|------|-------------
**pom**🔹 | <code>[java.Pom](#projen-java-pom)</code> | Java pom.
**sampleJavaPackage**?🔹 | <code>string</code> | Java package for test sample.<br/>__*Default*__: "org.acme"
**version**?🔹 | <code>string</code> | Junit version.<br/>__*Default*__: "5.7.0"



## struct MavenCompileOptions 🔹 <a id="projen-java-mavencompileoptions"></a>


Options for `MavenCompile`.



Name | Type | Description 
-----|------|-------------
**source**?🔹 | <code>string</code> | Source language version.<br/>__*Default*__: "1.8"
**target**?🔹 | <code>string</code> | Target JVM version.<br/>__*Default*__: "1.8"



## struct MavenPackagingOptions 🔹 <a id="projen-java-mavenpackagingoptions"></a>


Options for `MavenPackage`.



Name | Type | Description 
-----|------|-------------
**distdir**?🔹 | <code>string</code> | Where to place the package output?<br/>__*Default*__: "dist/java"
**javadocs**?🔹 | <code>boolean</code> | Include javadocs jar in package.<br/>__*Default*__: true
**javadocsExclude**?🔹 | <code>Array<string></code> | Exclude source files from docs.<br/>__*Default*__: []
**sources**?🔹 | <code>boolean</code> | Include sources jar in package.<br/>__*Default*__: true



## struct MavenSampleOptions 🔹 <a id="projen-java-mavensampleoptions"></a>






Name | Type | Description 
-----|------|-------------
**package**🔹 | <code>string</code> | Project root java package.



## struct PluginExecution 🔹 <a id="projen-java-pluginexecution"></a>


Plugin execution definition.



Name | Type | Description 
-----|------|-------------
**goals**🔹 | <code>Array<string></code> | Which Maven goals this plugin should be associated with.
**id**🔹 | <code>string</code> | The ID.



## struct PluginOptions 🔹 <a id="projen-java-pluginoptions"></a>


Options for Maven plugins.



Name | Type | Description 
-----|------|-------------
**configuration**?🔹 | <code>Map<string, any></code> | Plugin key/value configuration.<br/>__*Default*__: {}
**dependencies**?🔹 | <code>Array<string></code> | You could configure the dependencies for the plugin.<br/>__*Default*__: []
**executions**?🔹 | <code>Array<[java.PluginExecution](#projen-java-pluginexecution)></code> | Plugin executions.<br/>__*Default*__: []



## struct PomOptions 🔹 <a id="projen-java-pomoptions"></a>


Options for `Pom`.



Name | Type | Description 
-----|------|-------------
**artifactId**🔹 | <code>string</code> | The artifactId is generally the name that the project is known by.
**groupId**🔹 | <code>string</code> | This is generally unique amongst an organization or a project.
**version**🔹 | <code>string</code> | This is the last piece of the naming puzzle.
**description**?🔹 | <code>string</code> | Description of a project is always good.<br/>__*Default*__: undefined
**packaging**?🔹 | <code>string</code> | Project packaging format.<br/>__*Default*__: "jar"
**url**?🔹 | <code>string</code> | The URL, like the name, is not required.<br/>__*Default*__: undefined



## struct ProjenrcCommonOptions 🔹 <a id="projen-java-projenrccommonoptions"></a>


Options for `Projenrc`.



Name | Type | Description 
-----|------|-------------
**className**?🔹 | <code>string</code> | The name of the Java class which contains the `main()` method for projen.<br/>__*Default*__: "projenrc"
**projenVersion**?🔹 | <code>string</code> | The projen version to use.<br/>__*Default*__: current version
**testScope**?🔹 | <code>boolean</code> | Defines projenrc under the test scope instead of the main scope, which is reserved to the app.<br/>__*Default*__: true



## struct ProjenrcOptions 🔹 <a id="projen-java-projenrcoptions"></a>






Name | Type | Description 
-----|------|-------------
**className**?🔹 | <code>string</code> | The name of the Java class which contains the `main()` method for projen.<br/>__*Default*__: "projenrc"
**initializationOptions**?🔹 | <code>Map<string, any></code> | Project initialization options.<br/>__*Optional*__
**projenVersion**?🔹 | <code>string</code> | The projen version to use.<br/>__*Default*__: current version
**testScope**?🔹 | <code>boolean</code> | Defines projenrc under the test scope instead of the main scope, which is reserved to the app.<br/>__*Default*__: true



## interface IPackageProvider 🔹 <a id="projen-python-ipackageprovider"></a>




### Properties


Name | Type | Description 
-----|------|-------------
**packages**🔹 | <code>Array<[deps.Dependency](#projen-deps-dependency)></code> | An array of packages (may be dynamically generated).



## interface IPythonDeps 🔹 <a id="projen-python-ipythondeps"></a>

__Implemented by__: [python.Pip](#projen-python-pip), [python.Poetry](#projen-python-poetry)



### Properties


Name | Type | Description 
-----|------|-------------
**installTask**🔹 | <code>[tasks.Task](#projen-tasks-task)</code> | A task that installs and updates dependencies.

### Methods


#### addDependency(spec)🔹 <a id="projen-python-ipythondeps-adddependency"></a>

Adds a runtime dependency.

```ts
addDependency(spec: string): void
```

* **spec** (<code>string</code>)  Format `<module>@<semver>`.




#### addDevDependency(spec)🔹 <a id="projen-python-ipythondeps-adddevdependency"></a>

Adds a dev dependency.

```ts
addDevDependency(spec: string): void
```

* **spec** (<code>string</code>)  Format `<module>@<semver>`.




#### installDependencies()🔹 <a id="projen-python-ipythondeps-installdependencies"></a>

Installs dependencies (called during post-synthesis).

```ts
installDependencies(): void
```







## interface IPythonEnv 🔹 <a id="projen-python-ipythonenv"></a>

__Implemented by__: [python.Poetry](#projen-python-poetry), [python.Venv](#projen-python-venv)


### Methods


#### setupEnvironment()🔹 <a id="projen-python-ipythonenv-setupenvironment"></a>

Initializes the virtual environment if it doesn't exist (called during post-synthesis).

```ts
setupEnvironment(): void
```







## interface IPythonPackaging 🔹 <a id="projen-python-ipythonpackaging"></a>

__Implemented by__: [python.Poetry](#projen-python-poetry), [python.Setuptools](#projen-python-setuptools)



### Properties


Name | Type | Description 
-----|------|-------------
**packageTask**🔹 | <code>[tasks.Task](#projen-tasks-task)</code> | A task that packages the project for distribution.
**publishTask**🔹 | <code>[tasks.Task](#projen-tasks-task)</code> | A task that uploads the package to a package repository.



## struct PipOptions 🔹 <a id="projen-python-pipoptions"></a>


Options for pip.


## struct PoetryPyprojectOptions 🔹 <a id="projen-python-poetrypyprojectoptions"></a>






Name | Type | Description 
-----|------|-------------
**authors**?🔹 | <code>Array<string></code> | The authors of the package.<br/>__*Optional*__
**classifiers**?🔹 | <code>Array<string></code> | A list of PyPI trove classifiers that describe the project.<br/>__*Optional*__
**dependencies**?🔹 | <code>Map<string, any></code> | A list of dependencies for the project.<br/>__*Optional*__
**description**?🔹 | <code>string</code> | A short description of the package (required).<br/>__*Optional*__
**devDependencies**?🔹 | <code>Map<string, any></code> | A list of development dependencies for the project.<br/>__*Optional*__
**documentation**?🔹 | <code>string</code> | A URL to the documentation of the project.<br/>__*Optional*__
**exclude**?🔹 | <code>Array<string></code> | A list of patterns that will be excluded in the final package.<br/>__*Optional*__
**homepage**?🔹 | <code>string</code> | A URL to the website of the project.<br/>__*Optional*__
**include**?🔹 | <code>Array<string></code> | A list of patterns that will be included in the final package.<br/>__*Optional*__
**keywords**?🔹 | <code>Array<string></code> | A list of keywords (max: 5) that the package is related to.<br/>__*Optional*__
**license**?🔹 | <code>string</code> | License of this package as an SPDX identifier.<br/>__*Optional*__
**maintainers**?🔹 | <code>Array<string></code> | the maintainers of the package.<br/>__*Optional*__
**name**?🔹 | <code>string</code> | Name of the package (required).<br/>__*Optional*__
**packages**?🔹 | <code>Array<string></code> | A list of packages and modules to include in the final distribution.<br/>__*Optional*__
**readme**?🔹 | <code>string</code> | The name of the readme file of the package.<br/>__*Optional*__
**repository**?🔹 | <code>string</code> | A URL to the repository of the project.<br/>__*Optional*__
**scripts**?🔹 | <code>Map<string, any></code> | The scripts or executables that will be installed when installing the package.<br/>__*Optional*__
**version**?🔹 | <code>string</code> | Version of the package (required).<br/>__*Optional*__



## struct PoetryPyprojectOptionsWithoutDeps 🔹 <a id="projen-python-poetrypyprojectoptionswithoutdeps"></a>






Name | Type | Description 
-----|------|-------------
**authors**?🔹 | <code>Array<string></code> | The authors of the package.<br/>__*Optional*__
**classifiers**?🔹 | <code>Array<string></code> | A list of PyPI trove classifiers that describe the project.<br/>__*Optional*__
**description**?🔹 | <code>string</code> | A short description of the package (required).<br/>__*Optional*__
**documentation**?🔹 | <code>string</code> | A URL to the documentation of the project.<br/>__*Optional*__
**exclude**?🔹 | <code>Array<string></code> | A list of patterns that will be excluded in the final package.<br/>__*Optional*__
**homepage**?🔹 | <code>string</code> | A URL to the website of the project.<br/>__*Optional*__
**include**?🔹 | <code>Array<string></code> | A list of patterns that will be included in the final package.<br/>__*Optional*__
**keywords**?🔹 | <code>Array<string></code> | A list of keywords (max: 5) that the package is related to.<br/>__*Optional*__
**license**?🔹 | <code>string</code> | License of this package as an SPDX identifier.<br/>__*Optional*__
**maintainers**?🔹 | <code>Array<string></code> | the maintainers of the package.<br/>__*Optional*__
**name**?🔹 | <code>string</code> | Name of the package (required).<br/>__*Optional*__
**packages**?🔹 | <code>Array<string></code> | A list of packages and modules to include in the final distribution.<br/>__*Optional*__
**readme**?🔹 | <code>string</code> | The name of the readme file of the package.<br/>__*Optional*__
**repository**?🔹 | <code>string</code> | A URL to the repository of the project.<br/>__*Optional*__
**scripts**?🔹 | <code>Map<string, any></code> | The scripts or executables that will be installed when installing the package.<br/>__*Optional*__
**version**?🔹 | <code>string</code> | Version of the package (required).<br/>__*Optional*__



## struct PytestOptions 🔹 <a id="projen-python-pytestoptions"></a>






Name | Type | Description 
-----|------|-------------
**maxFailures**?🔹 | <code>number</code> | Stop the testing process after the first N failures.<br/>__*Optional*__
**testdir**?🔹 | <code>string</code> | Directory with tests.<br/>__*Default*__: 'tests'
**version**?🔹 | <code>string</code> | Pytest version.<br/>__*Default*__: "6.2.1"



## struct PythonPackagingOptions 🔹 <a id="projen-python-pythonpackagingoptions"></a>






Name | Type | Description 
-----|------|-------------
**authorEmail**🔹 | <code>string</code> | Author's e-mail.
**authorName**🔹 | <code>string</code> | Author's name.
**version**🔹 | <code>string</code> | Version of the package.
**classifiers**?🔹 | <code>Array<string></code> | A list of PyPI trove classifiers that describe the project.<br/>__*Optional*__
**description**?🔹 | <code>string</code> | A short description of the package.<br/>__*Optional*__
**homepage**?🔹 | <code>string</code> | A URL to the website of the project.<br/>__*Optional*__
**license**?🔹 | <code>string</code> | License of this package as an SPDX identifier.<br/>__*Optional*__
**poetryOptions**?🔹 | <code>[python.PoetryPyprojectOptionsWithoutDeps](#projen-python-poetrypyprojectoptionswithoutdeps)</code> | Additional options to set for poetry if using poetry.<br/>__*Optional*__
**setupConfig**?🔹 | <code>Map<string, any></code> | Additional fields to pass in the setup() function if using setuptools.<br/>__*Optional*__



## struct PythonProjectOptions 🔹 <a id="projen-python-pythonprojectoptions"></a>


Options for `PythonProject`.



Name | Type | Description 
-----|------|-------------
**authorEmail**🔹 | <code>string</code> | Author's e-mail.
**authorName**🔹 | <code>string</code> | Author's name.
**moduleName**🔹 | <code>string</code> | Name of the python package as used in imports and filenames.
**name**🔹 | <code>string</code> | This is the name of your project.
**version**🔹 | <code>string</code> | Version of the package.
**classifiers**?🔹 | <code>Array<string></code> | A list of PyPI trove classifiers that describe the project.<br/>__*Optional*__
**clobber**?🔹 | <code>boolean</code> | Add a `clobber` task which resets the repo to origin.<br/>__*Default*__: true
**deps**?🔹 | <code>Array<string></code> | List of runtime dependencies for this project.<br/>__*Default*__: []
**description**?🔹 | <code>string</code> | A short description of the package.<br/>__*Optional*__
**devContainer**?🔹 | <code>boolean</code> | Add a VSCode development environment (used for GitHub Codespaces).<br/>__*Default*__: false
**devDeps**?🔹 | <code>Array<string></code> | List of dev dependencies for this project.<br/>__*Default*__: []
**gitpod**?🔹 | <code>boolean</code> | Add a Gitpod development environment.<br/>__*Default*__: false
**homepage**?🔹 | <code>string</code> | A URL to the website of the project.<br/>__*Optional*__
**jsiiFqn**?🔹 | <code>string</code> | The JSII FQN (fully qualified name) of the project class.<br/>__*Default*__: undefined
**license**?🔹 | <code>string</code> | License of this package as an SPDX identifier.<br/>__*Optional*__
**logging**?🔹 | <code>[LoggerOptions](#projen-loggeroptions)</code> | Configure logging options such as verbosity.<br/>__*Default*__: {}
**outdir**?🔹 | <code>string</code> | The root directory of the project.<br/>__*Default*__: "."
**parent**?🔹 | <code>[Project](#projen-project)</code> | The parent project, if this project is part of a bigger project.<br/>__*Optional*__
**pip**?🔹 | <code>boolean</code> | Use pip with a requirements.txt file to track project dependencies.<br/>__*Default*__: true
**poetry**?🔹 | <code>boolean</code> | Use poetry to manage your project dependencies, virtual environment, and (optional) packaging/publishing.<br/>__*Default*__: false
**poetryOptions**?🔹 | <code>[python.PoetryPyprojectOptionsWithoutDeps](#projen-python-poetrypyprojectoptionswithoutdeps)</code> | Additional options to set for poetry if using poetry.<br/>__*Optional*__
**projectType**?🔹 | <code>[ProjectType](#projen-projecttype)</code> | Which type of project this is (library/app).<br/>__*Default*__: ProjectType.UNKNOWN
**pytest**?🔹 | <code>boolean</code> | Include pytest tests.<br/>__*Default*__: true
**pytestOptions**?🔹 | <code>[python.PytestOptions](#projen-python-pytestoptions)</code> | pytest options.<br/>__*Default*__: defaults
**readme**?🔹 | <code>[SampleReadmeProps](#projen-samplereadmeprops)</code> | The README setup.<br/>__*Default*__: { filename: 'README.md', contents: '# replace this' }
**sample**?🔹 | <code>boolean</code> | Include sample code and test if the relevant directories don't exist.<br/>__*Default*__: true
**setupConfig**?🔹 | <code>Map<string, any></code> | Additional fields to pass in the setup() function if using setuptools.<br/>__*Optional*__
**setuptools**?🔹 | <code>boolean</code> | Use setuptools with a setup.py script for packaging and publishing.<br/>__*Default*__: true if the project type is library
**venv**?🔹 | <code>boolean</code> | Use venv to manage a virtual environment for installing dependencies inside.<br/>__*Default*__: true
**venvOptions**?🔹 | <code>[python.VenvOptions](#projen-python-venvoptions)</code> | Venv options.<br/>__*Default*__: defaults



## struct PythonSampleOptions 🔹 <a id="projen-python-pythonsampleoptions"></a>


Options for python sample code.


## struct RequirementsFileOptions 🔹 <a id="projen-python-requirementsfileoptions"></a>






Name | Type | Description 
-----|------|-------------
**packageProvider**?🔹 | <code>[python.IPackageProvider](#projen-python-ipackageprovider)</code> | Provide a list of packages that can be dynamically updated.<br/>__*Optional*__



## struct SetupPyOptions 🔹 <a id="projen-python-setuppyoptions"></a>


Fields to pass in the setup() function of setup.py.



Name | Type | Description 
-----|------|-------------
**authorEmail**?🔹 | <code>string</code> | Author's e-mail.<br/>__*Optional*__
**authorName**?🔹 | <code>string</code> | Author's name.<br/>__*Optional*__
**classifiers**?🔹 | <code>Array<string></code> | A list of PyPI trove classifiers that describe the project.<br/>__*Optional*__
**description**?🔹 | <code>string</code> | A short project description.<br/>__*Optional*__
**homepage**?🔹 | <code>string</code> | Package's Homepage / Website.<br/>__*Optional*__
**license**?🔹 | <code>string</code> | The project license.<br/>__*Optional*__
**name**?🔹 | <code>string</code> | Name of the package.<br/>__*Optional*__
**packages**?🔹 | <code>Array<string></code> | List of submodules to be packaged.<br/>__*Optional*__
**version**?🔹 | <code>string</code> | Manually specify package version.<br/>__*Optional*__



## struct VenvOptions 🔹 <a id="projen-python-venvoptions"></a>


Options for venv.



Name | Type | Description 
-----|------|-------------
**envdir**?🔹 | <code>string</code> | Name of directory to store the environment in.<br/>__*Default*__: ".env"



## struct TaskCommonOptions 🔹 <a id="projen-tasks-taskcommonoptions"></a>






Name | Type | Description 
-----|------|-------------
**category**?🔹 | <code>[tasks.TaskCategory](#projen-tasks-taskcategory)</code> | Category for start menu.<br/>__*Default*__: TaskCategory.MISC
**condition**?🔹 | <code>string</code> | A shell command which determines if the this task should be executed.<br/>__*Optional*__
**cwd**?🔹 | <code>string</code> | The working directory for all steps in this task (unless overridden by the step).<br/>__*Default*__: process.cwd()
**description**?🔹 | <code>string</code> | The description of this build command.<br/>__*Default*__: the task name
**env**?🔹 | <code>Map<string, string></code> | Defines environment variables for the execution of this task.<br/>__*Default*__: {}



## struct TaskOptions 🔹 <a id="projen-tasks-taskoptions"></a>






Name | Type | Description 
-----|------|-------------
**category**?🔹 | <code>[tasks.TaskCategory](#projen-tasks-taskcategory)</code> | Category for start menu.<br/>__*Default*__: TaskCategory.MISC
**condition**?🔹 | <code>string</code> | A shell command which determines if the this task should be executed.<br/>__*Optional*__
**cwd**?🔹 | <code>string</code> | The working directory for all steps in this task (unless overridden by the step).<br/>__*Default*__: process.cwd()
**description**?🔹 | <code>string</code> | The description of this build command.<br/>__*Default*__: the task name
**env**?🔹 | <code>Map<string, string></code> | Defines environment variables for the execution of this task.<br/>__*Default*__: {}
**exec**?🔹 | <code>string</code> | Shell command to execute as the first command of the task.<br/>__*Default*__: add steps using `task.exec(command)` or `task.spawn(subtask)`



## struct TaskSpec 🔹 <a id="projen-tasks-taskspec"></a>

__Obtainable from__: [TaskRuntime](#projen-tasks-taskruntime).[tryFindTask](#projen-tasks-taskruntime#projen-tasks-taskruntime-tryfindtask)()

Specification of a single task.



Name | Type | Description 
-----|------|-------------
**name**🔹 | <code>string</code> | Task name.
**category**?🔹 | <code>[tasks.TaskCategory](#projen-tasks-taskcategory)</code> | Category for start menu.<br/>__*Default*__: TaskCategory.MISC
**condition**?🔹 | <code>string</code> | A shell command which determines if the this task should be executed.<br/>__*Optional*__
**cwd**?🔹 | <code>string</code> | The working directory for all steps in this task (unless overridden by the step).<br/>__*Default*__: process.cwd()
**description**?🔹 | <code>string</code> | The description of this build command.<br/>__*Default*__: the task name
**env**?🔹 | <code>Map<string, string></code> | Defines environment variables for the execution of this task.<br/>__*Default*__: {}
**steps**?🔹 | <code>Array<[tasks.TaskStep](#projen-tasks-taskstep)></code> | Task steps.<br/>__*Optional*__



## struct TaskStep 🔹 <a id="projen-tasks-taskstep"></a>


A single step within a task.

The step could either be  the execution of a
shell command or execution of a sub-task, by name.



Name | Type | Description 
-----|------|-------------
**cwd**?🔹 | <code>string</code> | The working directory for this step.<br/>__*Default*__: determined by the task
**exec**?🔹 | <code>string</code> | Shell command to execute.<br/>__*Default*__: don't execute a shell command
**name**?🔹 | <code>string</code> | Step name.<br/>__*Default*__: no name
**say**?🔹 | <code>string</code> | Print a message.<br/>__*Default*__: don't say anything
**spawn**?🔹 | <code>string</code> | Subtask to execute.<br/>__*Default*__: don't spawn a subtask



## struct TaskStepOptions 🔹 <a id="projen-tasks-taskstepoptions"></a>


Options for task steps.



Name | Type | Description 
-----|------|-------------
**cwd**?🔹 | <code>string</code> | The working directory for this step.<br/>__*Default*__: determined by the task
**name**?🔹 | <code>string</code> | Step name.<br/>__*Default*__: no name



## struct TasksManifest 🔹 <a id="projen-tasks-tasksmanifest"></a>


Schema for `tasks.json`.



Name | Type | Description 
-----|------|-------------
**env**?🔹 | <code>Map<string, string></code> | Environment for all tasks.<br/>__*Optional*__
**tasks**?🔹 | <code>Map<string, [tasks.TaskSpec](#projen-tasks-taskspec)></code> | All tasks available for this project.<br/>__*Optional*__



## struct DevContainerOptions 🔹 <a id="projen-vscode-devcontaineroptions"></a>


Constructor options for the DevContainer component.

The default docker image used for GitHub Codespaces is defined here:



Name | Type | Description 
-----|------|-------------
**dockerImage**?🔹 | <code>[DevEnvironmentDockerImage](#projen-devenvironmentdockerimage)</code> | A Docker image or Dockerfile for the container.<br/>__*Optional*__
**ports**?🔹 | <code>Array<string></code> | An array of ports that should be exposed from the container.<br/>__*Optional*__
**tasks**?🔹 | <code>Array<[tasks.Task](#projen-tasks-task)></code> | An array of tasks that should be run when the container starts.<br/>__*Optional*__
**vscodeExtensions**?🔹 | <code>Array<string></code> | An array of extension IDs that specify the extensions that should be installed inside the container when it is created.<br/>__*Optional*__



## struct Presentation 🔹 <a id="projen-vscode-presentation"></a>


VSCode launch configuration Presentation interface "using the order, group, and hidden attributes in the presentation object you can sort, group, and hide configurations and compounds in the Debug configuration dropdown and in the Debug quick pick." Source: https://code.visualstudio.com/docs/editor/debugging#_launchjson-attributes.



Name | Type | Description 
-----|------|-------------
**group**🔹 | <code>string</code> | <span></span>
**hidden**🔹 | <code>boolean</code> | <span></span>
**order**🔹 | <code>number</code> | <span></span>



## struct ServerReadyAction 🔹 <a id="projen-vscode-serverreadyaction"></a>


VSCode launch configuration ServerReadyAction interface "if you want to open a URL in a web browser whenever the program under debugging outputs a specific message to the debug console or integrated terminal." Source: https://code.visualstudio.com/docs/editor/debugging#_launchjson-attributes.



Name | Type | Description 
-----|------|-------------
**action**🔹 | <code>string</code> | <span></span>
**pattern**?🔹 | <code>string</code> | __*Optional*__
**uriFormat**?🔹 | <code>string</code> | __*Optional*__



## struct VsCodeLaunchConfigurationEntry 🔹 <a id="projen-vscode-vscodelaunchconfigurationentry"></a>


Options for a 'VsCodeLaunchConfigurationEntry' Source: https://code.visualstudio.com/docs/editor/debugging#_launchjson-attributes.



Name | Type | Description 
-----|------|-------------
**name**🔹 | <code>string</code> | <span></span>
**request**🔹 | <code>string</code> | <span></span>
**type**🔹 | <code>string</code> | <span></span>
**args**?🔹 | <code>Array<string></code> | __*Optional*__
**debugServer**?🔹 | <code>number</code> | __*Optional*__
**internalConsoleOptions**?🔹 | <code>[vscode.InternalConsoleOptions](#projen-vscode-internalconsoleoptions)</code> | __*Optional*__
**outFiles**?🔹 | <code>Array<string></code> | __*Optional*__
**postDebugTask**?🔹 | <code>string</code> | __*Optional*__
**preLaunchTask**?🔹 | <code>string</code> | __*Optional*__
**presentation**?🔹 | <code>[vscode.Presentation](#projen-vscode-presentation)</code> | __*Optional*__
**program**?🔹 | <code>string</code> | __*Optional*__
**runtimeArgs**?🔹 | <code>Array<string></code> | __*Optional*__
**serverReadyAction**?🔹 | <code>[vscode.ServerReadyAction](#projen-vscode-serverreadyaction)</code> | __*Optional*__
**skipFiles**?🔹 | <code>Array<string></code> | __*Optional*__
**url**?🔹 | <code>string</code> | __*Optional*__
**webRoot**?🔹 | <code>string</code> | __*Optional*__



## struct NextComponentOptions 🔹 <a id="projen-web-nextcomponentoptions"></a>






Name | Type | Description 
-----|------|-------------
**tailwind**?🔹 | <code>boolean</code> | Setup Tailwind as a PostCSS plugin.<br/>__*Default*__: true
**typescript**?🔹 | <code>boolean</code> | Whether to apply options specific for TypeScript Next.js projects.<br/>__*Default*__: false



## struct NextJsCommonProjectOptions 🔹 <a id="projen-web-nextjscommonprojectoptions"></a>






Name | Type | Description 
-----|------|-------------
**assetsdir**?🔹 | <code>string</code> | Assets directory.<br/>__*Default*__: "public"
**tailwind**?🔹 | <code>boolean</code> | Setup Tailwind CSS as a PostCSS plugin.<br/>__*Default*__: true



## struct NextJsProjectOptions 🔹 <a id="projen-web-nextjsprojectoptions"></a>






Name | Type | Description 
-----|------|-------------
**defaultReleaseBranch**🔹 | <code>string</code> | The name of the main release branch.
**name**🔹 | <code>string</code> | This is the name of your project.
**allowLibraryDependencies**?🔹 | <code>boolean</code> | Allow the project to include `peerDependencies` and `bundledDependencies`.<br/>__*Default*__: true
**antitamper**?🔹 | <code>boolean</code> | Checks that after build there are no modified files on git.<br/>__*Default*__: true
**artifactsDirectory**?🔹 | <code>string</code> | A directory which will contain artifacts to be published to npm.<br/>__*Default*__: "dist"
**assetsdir**?🔹 | <code>string</code> | Assets directory.<br/>__*Default*__: "public"
**authorEmail**?🔹 | <code>string</code> | Author's e-mail.<br/>__*Optional*__
**authorName**?🔹 | <code>string</code> | Author's name.<br/>__*Optional*__
**authorOrganization**?🔹 | <code>boolean</code> | Author's Organization.<br/>__*Optional*__
**authorUrl**?🔹 | <code>string</code> | Author's URL / Website.<br/>__*Optional*__
**autoDetectBin**?🔹 | <code>boolean</code> | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.<br/>__*Default*__: true
**bin**?🔹 | <code>Map<string, string></code> | Binary programs vended with your module.<br/>__*Optional*__
**buildWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/>__*Default*__: true if not a subproject
**bundledDeps**?🔹 | <code>Array<string></code> | List of dependencies to bundle into this module.<br/>__*Optional*__
**clobber**?🔹 | <code>boolean</code> | Add a `clobber` task which resets the repo to origin.<br/>__*Default*__: true
**codeCov**?🔹 | <code>boolean</code> | Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret.<br/>__*Default*__: false
**codeCovTokenSecret**?🔹 | <code>string</code> | Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories.<br/>__*Default*__: if this option is not specified, only public repositories are supported
**copyrightOwner**?🔹 | <code>string</code> | License copyright owner.<br/>__*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?🔹 | <code>string</code> | The copyright years to put in the LICENSE file.<br/>__*Default*__: current year
**dependabot**?🔹 | <code>boolean</code> | Include dependabot configuration.<br/>__*Default*__: true
**dependabotOptions**?🔹 | <code>[github.DependabotOptions](#projen-github-dependabotoptions)</code> | Options for dependabot.<br/>__*Default*__: default options
**deps**?🔹 | <code>Array<string></code> | Runtime dependencies of this module.<br/>__*Default*__: []
**description**?🔹 | <code>string</code> | The description is just a string that helps people understand the purpose of the package.<br/>__*Optional*__
**devContainer**?🔹 | <code>boolean</code> | Add a VSCode development environment (used for GitHub Codespaces).<br/>__*Default*__: false
**devDeps**?🔹 | <code>Array<string></code> | Build dependencies for this module.<br/>__*Default*__: []
**entrypoint**?🔹 | <code>string</code> | Module entrypoint (`main` in `package.json`).<br/>__*Default*__: "lib/index.js"
**gitignore**?🔹 | <code>Array<string></code> | Additional entries to .gitignore.<br/>__*Optional*__
**gitpod**?🔹 | <code>boolean</code> | Add a Gitpod development environment.<br/>__*Default*__: false
**homepage**?🔹 | <code>string</code> | Package's Homepage / Website.<br/>__*Optional*__
**jest**?🔹 | <code>boolean</code> | Setup jest unit tests.<br/>__*Default*__: true
**jestOptions**?🔹 | <code>[JestOptions](#projen-jestoptions)</code> | Jest options.<br/>__*Default*__: default options
**jsiiFqn**?🔹 | <code>string</code> | The JSII FQN (fully qualified name) of the project class.<br/>__*Default*__: undefined
**jsiiReleaseVersion**?🔹 | <code>string</code> | Version requirement of `jsii-release` which is used to publish modules to npm.<br/>__*Default*__: "latest"
**keywords**?🔹 | <code>Array<string></code> | Keywords to include in `package.json`.<br/>__*Optional*__
**license**?🔹 | <code>string</code> | License's SPDX identifier.<br/>__*Default*__: "Apache-2.0"
**licensed**?🔹 | <code>boolean</code> | Indicates if a license should be added.<br/>__*Default*__: true
**logging**?🔹 | <code>[LoggerOptions](#projen-loggeroptions)</code> | Configure logging options such as verbosity.<br/>__*Default*__: {}
**maxNodeVersion**?🔹 | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/>__*Default*__: no max
**mergify**?🔹 | <code>boolean</code> | Adds mergify configuration.<br/>__*Default*__: true
**mergifyAutoMergeLabel**?🔹 | <code>string</code> | Automatically merge PRs that build successfully and have this label.<br/>__*Default*__: "auto-merge"
**mergifyOptions**?🔹 | <code>[github.MergifyOptions](#projen-github-mergifyoptions)</code> | Options for mergify.<br/>__*Default*__: default options
**minNodeVersion**?🔹 | <code>string</code> | Minimum Node.js version to require via package.json `engines` (inclusive).<br/>__*Default*__: no "engines" specified
**npmAccess**?🔹 | <code>[NpmAccess](#projen-npmaccess)</code> | Access level of the npm package.<br/>__*Default*__: for scoped packages (e.g. `foo@bar`), the default is `NpmAccess.RESTRICTED`, for non-scoped packages, the default is `NpmAccess.PUBLIC`.
**npmDistTag**?🔹 | <code>string</code> | Tags can be used to provide an alias instead of version numbers.<br/>__*Default*__: "latest"
**npmRegistry**?⚠️ | <code>string</code> | The host name of the npm registry to publish to.<br/>__*Optional*__
**npmRegistryUrl**?🔹 | <code>string</code> | The base URL of the npm package registry.<br/>__*Default*__: "https://registry.npmjs.org"
**npmTaskExecution**?🔹 | <code>[NpmTaskExecution](#projen-npmtaskexecution)</code> | Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz).<br/>__*Default*__: NpmTaskExecution.PROJEN
**npmignore**?🔹 | <code>Array<string></code> | Additional entries to .npmignore.<br/>__*Optional*__
**npmignoreEnabled**?🔹 | <code>boolean</code> | Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs.<br/>__*Default*__: true
**outdir**?🔹 | <code>string</code> | The root directory of the project.<br/>__*Default*__: "."
**packageManager**?🔹 | <code>[NodePackageManager](#projen-nodepackagemanager)</code> | The Node Package Manager used to execute scripts.<br/>__*Default*__: NodePackageManager.YARN
**packageName**?🔹 | <code>string</code> | The "name" in package.json.<br/>__*Default*__: defaults to project name
**parent**?🔹 | <code>[Project](#projen-project)</code> | The parent project, if this project is part of a bigger project.<br/>__*Optional*__
**peerDependencyOptions**?🔹 | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | Options for `peerDeps`.<br/>__*Optional*__
**peerDeps**?🔹 | <code>Array<string></code> | Peer dependencies for this module.<br/>__*Default*__: []
**projectType**?🔹 | <code>[ProjectType](#projen-projecttype)</code> | Which type of project this is (library/app).<br/>__*Default*__: ProjectType.UNKNOWN
**projenCommand**?🔹 | <code>string</code> | The shell command to use in order to run the projen CLI.<br/>__*Default*__: "npx projen"
**projenDevDependency**?🔹 | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/>__*Default*__: true
**projenUpgradeAutoMerge**?🔹 | <code>boolean</code> | Automatically merge projen upgrade PRs when build passes.<br/>__*Default*__: "true" if mergify auto-merge is enabled (default)
**projenUpgradeSchedule**?🔹 | <code>Array<string></code> | Customize the projenUpgrade schedule in cron expression.<br/>__*Default*__: [ "0 6 * * *" ]
**projenUpgradeSecret**?🔹 | <code>string</code> | Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`).<br/>__*Default*__: no automatic projen upgrade pull requests
**projenVersion**?🔹 | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/>__*Default*__: Semver.latest()
**pullRequestTemplate**?🔹 | <code>boolean</code> | Include a GitHub pull request template.<br/>__*Default*__: true
**pullRequestTemplateContents**?🔹 | <code>string</code> | The contents of the pull request template.<br/>__*Default*__: default content
**readme**?🔹 | <code>[SampleReadmeProps](#projen-samplereadmeprops)</code> | The README setup.<br/>__*Default*__: { filename: 'README.md', contents: '# replace this' }
**rebuildBot**?🔹 | <code>boolean</code> | Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request.<br/>__*Default*__: true if not a subproject
**rebuildBotCommand**?🔹 | <code>string</code> | The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch.<br/>__*Default*__: "rebuild"
**releaseBranches**?🔹 | <code>Array<string></code> | Branches which trigger a release.<br/>__*Default*__: [ "main" ]
**releaseEveryCommit**?🔹 | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`.<br/>__*Default*__: true
**releaseSchedule**?🔹 | <code>string</code> | CRON schedule to trigger new releases.<br/>__*Default*__: no scheduled releases
**releaseToNpm**?🔹 | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/>__*Default*__: false
**releaseWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for releasing from "main" when new versions are bumped.<br/>__*Default*__: true if not a subproject
**repository**?🔹 | <code>string</code> | The repository is the location where the actual code for your package lives.<br/>__*Optional*__
**repositoryDirectory**?🔹 | <code>string</code> | If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives.<br/>__*Optional*__
**sampleCode**?🔹 | <code>boolean</code> | Generate one-time sample in `pages/` and `public/` if there are no files there.<br/>__*Default*__: true
**scripts**?🔹 | <code>Map<string, string></code> | npm scripts to include.<br/>__*Default*__: {}
**srcdir**?🔹 | <code>string</code> | Typescript sources directory.<br/>__*Default*__: "src"
**stability**?🔹 | <code>string</code> | Package's Stability.<br/>__*Optional*__
**tailwind**?🔹 | <code>boolean</code> | Setup Tailwind CSS as a PostCSS plugin.<br/>__*Default*__: true
**workflowBootstrapSteps**?🔹 | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/>__*Default*__: "yarn install --frozen-lockfile && yarn projen"
**workflowContainerImage**?🔹 | <code>string</code> | Container image to use for GitHub workflows.<br/>__*Default*__: default image
**workflowNodeVersion**?🔹 | <code>string</code> | The node version to use in GitHub workflows.<br/>__*Default*__: same as `minNodeVersion`



## struct NextJsTypeDefOptions 🔹 <a id="projen-web-nextjstypedefoptions"></a>






Name | Type | Description 
-----|------|-------------
**committed**?🔹 | <code>boolean</code> | Indicates whether this file should be committed to git or ignored.<br/>__*Default*__: true
**editGitignore**?🔹 | <code>boolean</code> | Update the project's .gitignore file.<br/>__*Default*__: true
**executable**?🔹 | <code>boolean</code> | Whether the generated file should be marked as executable.<br/>__*Default*__: false
**readonly**?🔹 | <code>boolean</code> | Whether the generated file should be readonly.<br/>__*Default*__: true



## struct NextJsTypeScriptProjectOptions 🔹 <a id="projen-web-nextjstypescriptprojectoptions"></a>






Name | Type | Description 
-----|------|-------------
**defaultReleaseBranch**🔹 | <code>string</code> | The name of the main release branch.
**name**🔹 | <code>string</code> | This is the name of your project.
**allowLibraryDependencies**?🔹 | <code>boolean</code> | Allow the project to include `peerDependencies` and `bundledDependencies`.<br/>__*Default*__: true
**antitamper**?🔹 | <code>boolean</code> | Checks that after build there are no modified files on git.<br/>__*Default*__: true
**artifactsDirectory**?🔹 | <code>string</code> | A directory which will contain artifacts to be published to npm.<br/>__*Default*__: "dist"
**assetsdir**?🔹 | <code>string</code> | Assets directory.<br/>__*Default*__: "public"
**authorEmail**?🔹 | <code>string</code> | Author's e-mail.<br/>__*Optional*__
**authorName**?🔹 | <code>string</code> | Author's name.<br/>__*Optional*__
**authorOrganization**?🔹 | <code>boolean</code> | Author's Organization.<br/>__*Optional*__
**authorUrl**?🔹 | <code>string</code> | Author's URL / Website.<br/>__*Optional*__
**autoDetectBin**?🔹 | <code>boolean</code> | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.<br/>__*Default*__: true
**bin**?🔹 | <code>Map<string, string></code> | Binary programs vended with your module.<br/>__*Optional*__
**buildWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/>__*Default*__: true if not a subproject
**bundledDeps**?🔹 | <code>Array<string></code> | List of dependencies to bundle into this module.<br/>__*Optional*__
**clobber**?🔹 | <code>boolean</code> | Add a `clobber` task which resets the repo to origin.<br/>__*Default*__: true
**codeCov**?🔹 | <code>boolean</code> | Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret.<br/>__*Default*__: false
**codeCovTokenSecret**?🔹 | <code>string</code> | Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories.<br/>__*Default*__: if this option is not specified, only public repositories are supported
**compileBeforeTest**?🔹 | <code>boolean</code> | Compile the code before running tests.<br/>__*Default*__: if `testdir` is under `src/**`, the default is `true`, otherwise the default is `false.
**copyrightOwner**?🔹 | <code>string</code> | License copyright owner.<br/>__*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?🔹 | <code>string</code> | The copyright years to put in the LICENSE file.<br/>__*Default*__: current year
**dependabot**?🔹 | <code>boolean</code> | Include dependabot configuration.<br/>__*Default*__: true
**dependabotOptions**?🔹 | <code>[github.DependabotOptions](#projen-github-dependabotoptions)</code> | Options for dependabot.<br/>__*Default*__: default options
**deps**?🔹 | <code>Array<string></code> | Runtime dependencies of this module.<br/>__*Default*__: []
**description**?🔹 | <code>string</code> | The description is just a string that helps people understand the purpose of the package.<br/>__*Optional*__
**devContainer**?🔹 | <code>boolean</code> | Add a VSCode development environment (used for GitHub Codespaces).<br/>__*Default*__: false
**devDeps**?🔹 | <code>Array<string></code> | Build dependencies for this module.<br/>__*Default*__: []
**disableTsconfig**?🔹 | <code>boolean</code> | Do not generate a `tsconfig.json` file (used by jsii projects since tsconfig.json is generated by the jsii compiler).<br/>__*Default*__: false
**docgen**?🔹 | <code>boolean</code> | Docgen by Typedoc.<br/>__*Default*__: false
**docsDirectory**?🔹 | <code>string</code> | Docs directory.<br/>__*Default*__: "docs"
**entrypoint**?🔹 | <code>string</code> | Module entrypoint (`main` in `package.json`).<br/>__*Default*__: "lib/index.js"
**entrypointTypes**?🔹 | <code>string</code> | The .d.ts file that includes the type declarations for this module.<br/>__*Default*__: .d.ts file derived from the project's entrypoint (usually lib/index.d.ts)
**eslint**?🔹 | <code>boolean</code> | Setup eslint.<br/>__*Default*__: true
**eslintOptions**?🔹 | <code>[EslintOptions](#projen-eslintoptions)</code> | Eslint options.<br/>__*Default*__: opinionated default options
**gitignore**?🔹 | <code>Array<string></code> | Additional entries to .gitignore.<br/>__*Optional*__
**gitpod**?🔹 | <code>boolean</code> | Add a Gitpod development environment.<br/>__*Default*__: false
**homepage**?🔹 | <code>string</code> | Package's Homepage / Website.<br/>__*Optional*__
**jest**?🔹 | <code>boolean</code> | Setup jest unit tests.<br/>__*Default*__: true
**jestOptions**?🔹 | <code>[JestOptions](#projen-jestoptions)</code> | Jest options.<br/>__*Default*__: default options
**jsiiFqn**?🔹 | <code>string</code> | The JSII FQN (fully qualified name) of the project class.<br/>__*Default*__: undefined
**jsiiReleaseVersion**?🔹 | <code>string</code> | Version requirement of `jsii-release` which is used to publish modules to npm.<br/>__*Default*__: "latest"
**keywords**?🔹 | <code>Array<string></code> | Keywords to include in `package.json`.<br/>__*Optional*__
**libdir**?🔹 | <code>string</code> | Typescript  artifacts output directory.<br/>__*Default*__: "lib"
**license**?🔹 | <code>string</code> | License's SPDX identifier.<br/>__*Default*__: "Apache-2.0"
**licensed**?🔹 | <code>boolean</code> | Indicates if a license should be added.<br/>__*Default*__: true
**logging**?🔹 | <code>[LoggerOptions](#projen-loggeroptions)</code> | Configure logging options such as verbosity.<br/>__*Default*__: {}
**maxNodeVersion**?🔹 | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/>__*Default*__: no max
**mergify**?🔹 | <code>boolean</code> | Adds mergify configuration.<br/>__*Default*__: true
**mergifyAutoMergeLabel**?🔹 | <code>string</code> | Automatically merge PRs that build successfully and have this label.<br/>__*Default*__: "auto-merge"
**mergifyOptions**?🔹 | <code>[github.MergifyOptions](#projen-github-mergifyoptions)</code> | Options for mergify.<br/>__*Default*__: default options
**minNodeVersion**?🔹 | <code>string</code> | Minimum Node.js version to require via package.json `engines` (inclusive).<br/>__*Default*__: no "engines" specified
**npmAccess**?🔹 | <code>[NpmAccess](#projen-npmaccess)</code> | Access level of the npm package.<br/>__*Default*__: for scoped packages (e.g. `foo@bar`), the default is `NpmAccess.RESTRICTED`, for non-scoped packages, the default is `NpmAccess.PUBLIC`.
**npmDistTag**?🔹 | <code>string</code> | Tags can be used to provide an alias instead of version numbers.<br/>__*Default*__: "latest"
**npmRegistry**?⚠️ | <code>string</code> | The host name of the npm registry to publish to.<br/>__*Optional*__
**npmRegistryUrl**?🔹 | <code>string</code> | The base URL of the npm package registry.<br/>__*Default*__: "https://registry.npmjs.org"
**npmTaskExecution**?🔹 | <code>[NpmTaskExecution](#projen-npmtaskexecution)</code> | Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz).<br/>__*Default*__: NpmTaskExecution.PROJEN
**npmignore**?🔹 | <code>Array<string></code> | Additional entries to .npmignore.<br/>__*Optional*__
**npmignoreEnabled**?🔹 | <code>boolean</code> | Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs.<br/>__*Default*__: true
**outdir**?🔹 | <code>string</code> | The root directory of the project.<br/>__*Default*__: "."
**package**?🔹 | <code>boolean</code> | Defines a `yarn package` command that will produce a tarball and place it under `dist/js`.<br/>__*Default*__: true
**packageManager**?🔹 | <code>[NodePackageManager](#projen-nodepackagemanager)</code> | The Node Package Manager used to execute scripts.<br/>__*Default*__: NodePackageManager.YARN
**packageName**?🔹 | <code>string</code> | The "name" in package.json.<br/>__*Default*__: defaults to project name
**parent**?🔹 | <code>[Project](#projen-project)</code> | The parent project, if this project is part of a bigger project.<br/>__*Optional*__
**peerDependencyOptions**?🔹 | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | Options for `peerDeps`.<br/>__*Optional*__
**peerDeps**?🔹 | <code>Array<string></code> | Peer dependencies for this module.<br/>__*Default*__: []
**projectType**?🔹 | <code>[ProjectType](#projen-projecttype)</code> | Which type of project this is (library/app).<br/>__*Default*__: ProjectType.UNKNOWN
**projenCommand**?🔹 | <code>string</code> | The shell command to use in order to run the projen CLI.<br/>__*Default*__: "npx projen"
**projenDevDependency**?🔹 | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/>__*Default*__: true
**projenUpgradeAutoMerge**?🔹 | <code>boolean</code> | Automatically merge projen upgrade PRs when build passes.<br/>__*Default*__: "true" if mergify auto-merge is enabled (default)
**projenUpgradeSchedule**?🔹 | <code>Array<string></code> | Customize the projenUpgrade schedule in cron expression.<br/>__*Default*__: [ "0 6 * * *" ]
**projenUpgradeSecret**?🔹 | <code>string</code> | Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`).<br/>__*Default*__: no automatic projen upgrade pull requests
**projenVersion**?🔹 | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/>__*Default*__: Semver.latest()
**pullRequestTemplate**?🔹 | <code>boolean</code> | Include a GitHub pull request template.<br/>__*Default*__: true
**pullRequestTemplateContents**?🔹 | <code>string</code> | The contents of the pull request template.<br/>__*Default*__: default content
**readme**?🔹 | <code>[SampleReadmeProps](#projen-samplereadmeprops)</code> | The README setup.<br/>__*Default*__: { filename: 'README.md', contents: '# replace this' }
**rebuildBot**?🔹 | <code>boolean</code> | Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request.<br/>__*Default*__: true if not a subproject
**rebuildBotCommand**?🔹 | <code>string</code> | The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch.<br/>__*Default*__: "rebuild"
**releaseBranches**?🔹 | <code>Array<string></code> | Branches which trigger a release.<br/>__*Default*__: [ "main" ]
**releaseEveryCommit**?🔹 | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`.<br/>__*Default*__: true
**releaseSchedule**?🔹 | <code>string</code> | CRON schedule to trigger new releases.<br/>__*Default*__: no scheduled releases
**releaseToNpm**?🔹 | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/>__*Default*__: false
**releaseWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for releasing from "main" when new versions are bumped.<br/>__*Default*__: true if not a subproject
**repository**?🔹 | <code>string</code> | The repository is the location where the actual code for your package lives.<br/>__*Optional*__
**repositoryDirectory**?🔹 | <code>string</code> | If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives.<br/>__*Optional*__
**sampleCode**?🔹 | <code>boolean</code> | Generate one-time sample in `src/` and `test/` if there are no files there.<br/>__*Default*__: true
**scripts**?🔹 | <code>Map<string, string></code> | npm scripts to include.<br/>__*Default*__: {}
**srcdir**?🔹 | <code>string</code> | Typescript sources directory.<br/>__*Default*__: "src"
**stability**?🔹 | <code>string</code> | Package's Stability.<br/>__*Optional*__
**tailwind**?🔹 | <code>boolean</code> | Setup Tailwind CSS as a PostCSS plugin.<br/>__*Default*__: true
**testdir**?🔹 | <code>string</code> | Jest tests directory. Tests files should be named `xxx.test.ts`.<br/>__*Default*__: "test"
**tsconfig**?🔹 | <code>[TypescriptConfigOptions](#projen-typescriptconfigoptions)</code> | Custom TSConfig.<br/>__*Optional*__
**typescriptVersion**?🔹 | <code>string</code> | TypeScript version to use.<br/>__*Default*__: "latest"
**workflowBootstrapSteps**?🔹 | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/>__*Default*__: "yarn install --frozen-lockfile && yarn projen"
**workflowContainerImage**?🔹 | <code>string</code> | Container image to use for GitHub workflows.<br/>__*Default*__: default image
**workflowNodeVersion**?🔹 | <code>string</code> | The node version to use in GitHub workflows.<br/>__*Default*__: same as `minNodeVersion`



## struct PostCssOptions 🔹 <a id="projen-web-postcssoptions"></a>






Name | Type | Description 
-----|------|-------------
**fileName**?🔹 | <code>string</code> | __*Default*__: "postcss.config.json"
**tailwind**?🔹 | <code>boolean</code> | Install Tailwind CSS as a PostCSS plugin.<br/>__*Default*__: true
**tailwindOptions**?🔹 | <code>[web.TailwindConfigOptions](#projen-web-tailwindconfigoptions)</code> | Tailwind CSS options.<br/>__*Optional*__



## struct ReactComponentOptions 🔹 <a id="projen-web-reactcomponentoptions"></a>






Name | Type | Description 
-----|------|-------------
**typescript**?🔹 | <code>boolean</code> | Whether to apply options specific for TypeScript React projects.<br/>__*Default*__: false



## struct ReactProjectOptions 🔹 <a id="projen-web-reactprojectoptions"></a>






Name | Type | Description 
-----|------|-------------
**defaultReleaseBranch**🔹 | <code>string</code> | The name of the main release branch.
**name**🔹 | <code>string</code> | This is the name of your project.
**allowLibraryDependencies**?🔹 | <code>boolean</code> | Allow the project to include `peerDependencies` and `bundledDependencies`.<br/>__*Default*__: true
**antitamper**?🔹 | <code>boolean</code> | Checks that after build there are no modified files on git.<br/>__*Default*__: true
**artifactsDirectory**?🔹 | <code>string</code> | A directory which will contain artifacts to be published to npm.<br/>__*Default*__: "dist"
**authorEmail**?🔹 | <code>string</code> | Author's e-mail.<br/>__*Optional*__
**authorName**?🔹 | <code>string</code> | Author's name.<br/>__*Optional*__
**authorOrganization**?🔹 | <code>boolean</code> | Author's Organization.<br/>__*Optional*__
**authorUrl**?🔹 | <code>string</code> | Author's URL / Website.<br/>__*Optional*__
**autoDetectBin**?🔹 | <code>boolean</code> | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.<br/>__*Default*__: true
**bin**?🔹 | <code>Map<string, string></code> | Binary programs vended with your module.<br/>__*Optional*__
**buildWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/>__*Default*__: true if not a subproject
**bundledDeps**?🔹 | <code>Array<string></code> | List of dependencies to bundle into this module.<br/>__*Optional*__
**clobber**?🔹 | <code>boolean</code> | Add a `clobber` task which resets the repo to origin.<br/>__*Default*__: true
**codeCov**?🔹 | <code>boolean</code> | Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret.<br/>__*Default*__: false
**codeCovTokenSecret**?🔹 | <code>string</code> | Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories.<br/>__*Default*__: if this option is not specified, only public repositories are supported
**copyrightOwner**?🔹 | <code>string</code> | License copyright owner.<br/>__*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?🔹 | <code>string</code> | The copyright years to put in the LICENSE file.<br/>__*Default*__: current year
**dependabot**?🔹 | <code>boolean</code> | Include dependabot configuration.<br/>__*Default*__: true
**dependabotOptions**?🔹 | <code>[github.DependabotOptions](#projen-github-dependabotoptions)</code> | Options for dependabot.<br/>__*Default*__: default options
**deps**?🔹 | <code>Array<string></code> | Runtime dependencies of this module.<br/>__*Default*__: []
**description**?🔹 | <code>string</code> | The description is just a string that helps people understand the purpose of the package.<br/>__*Optional*__
**devContainer**?🔹 | <code>boolean</code> | Add a VSCode development environment (used for GitHub Codespaces).<br/>__*Default*__: false
**devDeps**?🔹 | <code>Array<string></code> | Build dependencies for this module.<br/>__*Default*__: []
**entrypoint**?🔹 | <code>string</code> | Module entrypoint (`main` in `package.json`).<br/>__*Default*__: "lib/index.js"
**gitignore**?🔹 | <code>Array<string></code> | Additional entries to .gitignore.<br/>__*Optional*__
**gitpod**?🔹 | <code>boolean</code> | Add a Gitpod development environment.<br/>__*Default*__: false
**homepage**?🔹 | <code>string</code> | Package's Homepage / Website.<br/>__*Optional*__
**jest**?🔹 | <code>boolean</code> | Setup jest unit tests.<br/>__*Default*__: true
**jestOptions**?🔹 | <code>[JestOptions](#projen-jestoptions)</code> | Jest options.<br/>__*Default*__: default options
**jsiiFqn**?🔹 | <code>string</code> | The JSII FQN (fully qualified name) of the project class.<br/>__*Default*__: undefined
**jsiiReleaseVersion**?🔹 | <code>string</code> | Version requirement of `jsii-release` which is used to publish modules to npm.<br/>__*Default*__: "latest"
**keywords**?🔹 | <code>Array<string></code> | Keywords to include in `package.json`.<br/>__*Optional*__
**license**?🔹 | <code>string</code> | License's SPDX identifier.<br/>__*Default*__: "Apache-2.0"
**licensed**?🔹 | <code>boolean</code> | Indicates if a license should be added.<br/>__*Default*__: true
**logging**?🔹 | <code>[LoggerOptions](#projen-loggeroptions)</code> | Configure logging options such as verbosity.<br/>__*Default*__: {}
**maxNodeVersion**?🔹 | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/>__*Default*__: no max
**mergify**?🔹 | <code>boolean</code> | Adds mergify configuration.<br/>__*Default*__: true
**mergifyAutoMergeLabel**?🔹 | <code>string</code> | Automatically merge PRs that build successfully and have this label.<br/>__*Default*__: "auto-merge"
**mergifyOptions**?🔹 | <code>[github.MergifyOptions](#projen-github-mergifyoptions)</code> | Options for mergify.<br/>__*Default*__: default options
**minNodeVersion**?🔹 | <code>string</code> | Minimum Node.js version to require via package.json `engines` (inclusive).<br/>__*Default*__: no "engines" specified
**npmAccess**?🔹 | <code>[NpmAccess](#projen-npmaccess)</code> | Access level of the npm package.<br/>__*Default*__: for scoped packages (e.g. `foo@bar`), the default is `NpmAccess.RESTRICTED`, for non-scoped packages, the default is `NpmAccess.PUBLIC`.
**npmDistTag**?🔹 | <code>string</code> | Tags can be used to provide an alias instead of version numbers.<br/>__*Default*__: "latest"
**npmRegistry**?⚠️ | <code>string</code> | The host name of the npm registry to publish to.<br/>__*Optional*__
**npmRegistryUrl**?🔹 | <code>string</code> | The base URL of the npm package registry.<br/>__*Default*__: "https://registry.npmjs.org"
**npmTaskExecution**?🔹 | <code>[NpmTaskExecution](#projen-npmtaskexecution)</code> | Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz).<br/>__*Default*__: NpmTaskExecution.PROJEN
**npmignore**?🔹 | <code>Array<string></code> | Additional entries to .npmignore.<br/>__*Optional*__
**npmignoreEnabled**?🔹 | <code>boolean</code> | Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs.<br/>__*Default*__: true
**outdir**?🔹 | <code>string</code> | The root directory of the project.<br/>__*Default*__: "."
**packageManager**?🔹 | <code>[NodePackageManager](#projen-nodepackagemanager)</code> | The Node Package Manager used to execute scripts.<br/>__*Default*__: NodePackageManager.YARN
**packageName**?🔹 | <code>string</code> | The "name" in package.json.<br/>__*Default*__: defaults to project name
**parent**?🔹 | <code>[Project](#projen-project)</code> | The parent project, if this project is part of a bigger project.<br/>__*Optional*__
**peerDependencyOptions**?🔹 | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | Options for `peerDeps`.<br/>__*Optional*__
**peerDeps**?🔹 | <code>Array<string></code> | Peer dependencies for this module.<br/>__*Default*__: []
**projectType**?🔹 | <code>[ProjectType](#projen-projecttype)</code> | Which type of project this is (library/app).<br/>__*Default*__: ProjectType.UNKNOWN
**projenCommand**?🔹 | <code>string</code> | The shell command to use in order to run the projen CLI.<br/>__*Default*__: "npx projen"
**projenDevDependency**?🔹 | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/>__*Default*__: true
**projenUpgradeAutoMerge**?🔹 | <code>boolean</code> | Automatically merge projen upgrade PRs when build passes.<br/>__*Default*__: "true" if mergify auto-merge is enabled (default)
**projenUpgradeSchedule**?🔹 | <code>Array<string></code> | Customize the projenUpgrade schedule in cron expression.<br/>__*Default*__: [ "0 6 * * *" ]
**projenUpgradeSecret**?🔹 | <code>string</code> | Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`).<br/>__*Default*__: no automatic projen upgrade pull requests
**projenVersion**?🔹 | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/>__*Default*__: Semver.latest()
**pullRequestTemplate**?🔹 | <code>boolean</code> | Include a GitHub pull request template.<br/>__*Default*__: true
**pullRequestTemplateContents**?🔹 | <code>string</code> | The contents of the pull request template.<br/>__*Default*__: default content
**readme**?🔹 | <code>[SampleReadmeProps](#projen-samplereadmeprops)</code> | The README setup.<br/>__*Default*__: { filename: 'README.md', contents: '# replace this' }
**rebuildBot**?🔹 | <code>boolean</code> | Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request.<br/>__*Default*__: true if not a subproject
**rebuildBotCommand**?🔹 | <code>string</code> | The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch.<br/>__*Default*__: "rebuild"
**releaseBranches**?🔹 | <code>Array<string></code> | Branches which trigger a release.<br/>__*Default*__: [ "main" ]
**releaseEveryCommit**?🔹 | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`.<br/>__*Default*__: true
**releaseSchedule**?🔹 | <code>string</code> | CRON schedule to trigger new releases.<br/>__*Default*__: no scheduled releases
**releaseToNpm**?🔹 | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/>__*Default*__: false
**releaseWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for releasing from "main" when new versions are bumped.<br/>__*Default*__: true if not a subproject
**repository**?🔹 | <code>string</code> | The repository is the location where the actual code for your package lives.<br/>__*Optional*__
**repositoryDirectory**?🔹 | <code>string</code> | If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives.<br/>__*Optional*__
**sampleCode**?🔹 | <code>boolean</code> | Generate one-time sample in `src/` and `public/` if there are no files there.<br/>__*Default*__: true
**scripts**?🔹 | <code>Map<string, string></code> | npm scripts to include.<br/>__*Default*__: {}
**srcdir**?🔹 | <code>string</code> | Source directory.<br/>__*Default*__: "src"
**stability**?🔹 | <code>string</code> | Package's Stability.<br/>__*Optional*__
**workflowBootstrapSteps**?🔹 | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/>__*Default*__: "yarn install --frozen-lockfile && yarn projen"
**workflowContainerImage**?🔹 | <code>string</code> | Container image to use for GitHub workflows.<br/>__*Default*__: default image
**workflowNodeVersion**?🔹 | <code>string</code> | The node version to use in GitHub workflows.<br/>__*Default*__: same as `minNodeVersion`



## struct ReactTypeDefOptions 🔹 <a id="projen-web-reacttypedefoptions"></a>






Name | Type | Description 
-----|------|-------------
**committed**?🔹 | <code>boolean</code> | Indicates whether this file should be committed to git or ignored.<br/>__*Default*__: true
**editGitignore**?🔹 | <code>boolean</code> | Update the project's .gitignore file.<br/>__*Default*__: true
**executable**?🔹 | <code>boolean</code> | Whether the generated file should be marked as executable.<br/>__*Default*__: false
**readonly**?🔹 | <code>boolean</code> | Whether the generated file should be readonly.<br/>__*Default*__: true



## struct ReactTypeScriptProjectOptions 🔹 <a id="projen-web-reacttypescriptprojectoptions"></a>






Name | Type | Description 
-----|------|-------------
**defaultReleaseBranch**🔹 | <code>string</code> | The name of the main release branch.
**name**🔹 | <code>string</code> | This is the name of your project.
**allowLibraryDependencies**?🔹 | <code>boolean</code> | Allow the project to include `peerDependencies` and `bundledDependencies`.<br/>__*Default*__: true
**antitamper**?🔹 | <code>boolean</code> | Checks that after build there are no modified files on git.<br/>__*Default*__: true
**artifactsDirectory**?🔹 | <code>string</code> | A directory which will contain artifacts to be published to npm.<br/>__*Default*__: "dist"
**authorEmail**?🔹 | <code>string</code> | Author's e-mail.<br/>__*Optional*__
**authorName**?🔹 | <code>string</code> | Author's name.<br/>__*Optional*__
**authorOrganization**?🔹 | <code>boolean</code> | Author's Organization.<br/>__*Optional*__
**authorUrl**?🔹 | <code>string</code> | Author's URL / Website.<br/>__*Optional*__
**autoDetectBin**?🔹 | <code>boolean</code> | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.<br/>__*Default*__: true
**bin**?🔹 | <code>Map<string, string></code> | Binary programs vended with your module.<br/>__*Optional*__
**buildWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/>__*Default*__: true if not a subproject
**bundledDeps**?🔹 | <code>Array<string></code> | List of dependencies to bundle into this module.<br/>__*Optional*__
**clobber**?🔹 | <code>boolean</code> | Add a `clobber` task which resets the repo to origin.<br/>__*Default*__: true
**codeCov**?🔹 | <code>boolean</code> | Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret.<br/>__*Default*__: false
**codeCovTokenSecret**?🔹 | <code>string</code> | Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories.<br/>__*Default*__: if this option is not specified, only public repositories are supported
**compileBeforeTest**?🔹 | <code>boolean</code> | Compile the code before running tests.<br/>__*Default*__: if `testdir` is under `src/**`, the default is `true`, otherwise the default is `false.
**copyrightOwner**?🔹 | <code>string</code> | License copyright owner.<br/>__*Default*__: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?🔹 | <code>string</code> | The copyright years to put in the LICENSE file.<br/>__*Default*__: current year
**dependabot**?🔹 | <code>boolean</code> | Include dependabot configuration.<br/>__*Default*__: true
**dependabotOptions**?🔹 | <code>[github.DependabotOptions](#projen-github-dependabotoptions)</code> | Options for dependabot.<br/>__*Default*__: default options
**deps**?🔹 | <code>Array<string></code> | Runtime dependencies of this module.<br/>__*Default*__: []
**description**?🔹 | <code>string</code> | The description is just a string that helps people understand the purpose of the package.<br/>__*Optional*__
**devContainer**?🔹 | <code>boolean</code> | Add a VSCode development environment (used for GitHub Codespaces).<br/>__*Default*__: false
**devDeps**?🔹 | <code>Array<string></code> | Build dependencies for this module.<br/>__*Default*__: []
**disableTsconfig**?🔹 | <code>boolean</code> | Do not generate a `tsconfig.json` file (used by jsii projects since tsconfig.json is generated by the jsii compiler).<br/>__*Default*__: false
**docgen**?🔹 | <code>boolean</code> | Docgen by Typedoc.<br/>__*Default*__: false
**docsDirectory**?🔹 | <code>string</code> | Docs directory.<br/>__*Default*__: "docs"
**entrypoint**?🔹 | <code>string</code> | Module entrypoint (`main` in `package.json`).<br/>__*Default*__: "lib/index.js"
**entrypointTypes**?🔹 | <code>string</code> | The .d.ts file that includes the type declarations for this module.<br/>__*Default*__: .d.ts file derived from the project's entrypoint (usually lib/index.d.ts)
**eslint**?🔹 | <code>boolean</code> | Setup eslint.<br/>__*Default*__: true
**eslintOptions**?🔹 | <code>[EslintOptions](#projen-eslintoptions)</code> | Eslint options.<br/>__*Default*__: opinionated default options
**gitignore**?🔹 | <code>Array<string></code> | Additional entries to .gitignore.<br/>__*Optional*__
**gitpod**?🔹 | <code>boolean</code> | Add a Gitpod development environment.<br/>__*Default*__: false
**homepage**?🔹 | <code>string</code> | Package's Homepage / Website.<br/>__*Optional*__
**jest**?🔹 | <code>boolean</code> | Setup jest unit tests.<br/>__*Default*__: true
**jestOptions**?🔹 | <code>[JestOptions](#projen-jestoptions)</code> | Jest options.<br/>__*Default*__: default options
**jsiiFqn**?🔹 | <code>string</code> | The JSII FQN (fully qualified name) of the project class.<br/>__*Default*__: undefined
**jsiiReleaseVersion**?🔹 | <code>string</code> | Version requirement of `jsii-release` which is used to publish modules to npm.<br/>__*Default*__: "latest"
**keywords**?🔹 | <code>Array<string></code> | Keywords to include in `package.json`.<br/>__*Optional*__
**libdir**?🔹 | <code>string</code> | Typescript  artifacts output directory.<br/>__*Default*__: "lib"
**license**?🔹 | <code>string</code> | License's SPDX identifier.<br/>__*Default*__: "Apache-2.0"
**licensed**?🔹 | <code>boolean</code> | Indicates if a license should be added.<br/>__*Default*__: true
**logging**?🔹 | <code>[LoggerOptions](#projen-loggeroptions)</code> | Configure logging options such as verbosity.<br/>__*Default*__: {}
**maxNodeVersion**?🔹 | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/>__*Default*__: no max
**mergify**?🔹 | <code>boolean</code> | Adds mergify configuration.<br/>__*Default*__: true
**mergifyAutoMergeLabel**?🔹 | <code>string</code> | Automatically merge PRs that build successfully and have this label.<br/>__*Default*__: "auto-merge"
**mergifyOptions**?🔹 | <code>[github.MergifyOptions](#projen-github-mergifyoptions)</code> | Options for mergify.<br/>__*Default*__: default options
**minNodeVersion**?🔹 | <code>string</code> | Minimum Node.js version to require via package.json `engines` (inclusive).<br/>__*Default*__: no "engines" specified
**npmAccess**?🔹 | <code>[NpmAccess](#projen-npmaccess)</code> | Access level of the npm package.<br/>__*Default*__: for scoped packages (e.g. `foo@bar`), the default is `NpmAccess.RESTRICTED`, for non-scoped packages, the default is `NpmAccess.PUBLIC`.
**npmDistTag**?🔹 | <code>string</code> | Tags can be used to provide an alias instead of version numbers.<br/>__*Default*__: "latest"
**npmRegistry**?⚠️ | <code>string</code> | The host name of the npm registry to publish to.<br/>__*Optional*__
**npmRegistryUrl**?🔹 | <code>string</code> | The base URL of the npm package registry.<br/>__*Default*__: "https://registry.npmjs.org"
**npmTaskExecution**?🔹 | <code>[NpmTaskExecution](#projen-npmtaskexecution)</code> | Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz).<br/>__*Default*__: NpmTaskExecution.PROJEN
**npmignore**?🔹 | <code>Array<string></code> | Additional entries to .npmignore.<br/>__*Optional*__
**npmignoreEnabled**?🔹 | <code>boolean</code> | Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs.<br/>__*Default*__: true
**outdir**?🔹 | <code>string</code> | The root directory of the project.<br/>__*Default*__: "."
**package**?🔹 | <code>boolean</code> | Defines a `yarn package` command that will produce a tarball and place it under `dist/js`.<br/>__*Default*__: true
**packageManager**?🔹 | <code>[NodePackageManager](#projen-nodepackagemanager)</code> | The Node Package Manager used to execute scripts.<br/>__*Default*__: NodePackageManager.YARN
**packageName**?🔹 | <code>string</code> | The "name" in package.json.<br/>__*Default*__: defaults to project name
**parent**?🔹 | <code>[Project](#projen-project)</code> | The parent project, if this project is part of a bigger project.<br/>__*Optional*__
**peerDependencyOptions**?🔹 | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | Options for `peerDeps`.<br/>__*Optional*__
**peerDeps**?🔹 | <code>Array<string></code> | Peer dependencies for this module.<br/>__*Default*__: []
**projectType**?🔹 | <code>[ProjectType](#projen-projecttype)</code> | Which type of project this is (library/app).<br/>__*Default*__: ProjectType.UNKNOWN
**projenCommand**?🔹 | <code>string</code> | The shell command to use in order to run the projen CLI.<br/>__*Default*__: "npx projen"
**projenDevDependency**?🔹 | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/>__*Default*__: true
**projenUpgradeAutoMerge**?🔹 | <code>boolean</code> | Automatically merge projen upgrade PRs when build passes.<br/>__*Default*__: "true" if mergify auto-merge is enabled (default)
**projenUpgradeSchedule**?🔹 | <code>Array<string></code> | Customize the projenUpgrade schedule in cron expression.<br/>__*Default*__: [ "0 6 * * *" ]
**projenUpgradeSecret**?🔹 | <code>string</code> | Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`).<br/>__*Default*__: no automatic projen upgrade pull requests
**projenVersion**?🔹 | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/>__*Default*__: Semver.latest()
**pullRequestTemplate**?🔹 | <code>boolean</code> | Include a GitHub pull request template.<br/>__*Default*__: true
**pullRequestTemplateContents**?🔹 | <code>string</code> | The contents of the pull request template.<br/>__*Default*__: default content
**readme**?🔹 | <code>[SampleReadmeProps](#projen-samplereadmeprops)</code> | The README setup.<br/>__*Default*__: { filename: 'README.md', contents: '# replace this' }
**rebuildBot**?🔹 | <code>boolean</code> | Installs a GitHub workflow which is triggered when the comment "@projen rebuild" is added to a pull request.<br/>__*Default*__: true if not a subproject
**rebuildBotCommand**?🔹 | <code>string</code> | The pull request bot command to use in order to trigger a rebuild and commit of the contents of the branch.<br/>__*Default*__: "rebuild"
**releaseBranches**?🔹 | <code>Array<string></code> | Branches which trigger a release.<br/>__*Default*__: [ "main" ]
**releaseEveryCommit**?🔹 | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`.<br/>__*Default*__: true
**releaseSchedule**?🔹 | <code>string</code> | CRON schedule to trigger new releases.<br/>__*Default*__: no scheduled releases
**releaseToNpm**?🔹 | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/>__*Default*__: false
**releaseWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for releasing from "main" when new versions are bumped.<br/>__*Default*__: true if not a subproject
**repository**?🔹 | <code>string</code> | The repository is the location where the actual code for your package lives.<br/>__*Optional*__
**repositoryDirectory**?🔹 | <code>string</code> | If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives.<br/>__*Optional*__
**sampleCode**?🔹 | <code>boolean</code> | Generate one-time sample in `src/` and `test/` if there are no files there.<br/>__*Default*__: true
**scripts**?🔹 | <code>Map<string, string></code> | npm scripts to include.<br/>__*Default*__: {}
**srcdir**?🔹 | <code>string</code> | Typescript sources directory.<br/>__*Default*__: "src"
**stability**?🔹 | <code>string</code> | Package's Stability.<br/>__*Optional*__
**testdir**?🔹 | <code>string</code> | Jest tests directory. Tests files should be named `xxx.test.ts`.<br/>__*Default*__: "test"
**tsconfig**?🔹 | <code>[TypescriptConfigOptions](#projen-typescriptconfigoptions)</code> | Custom TSConfig.<br/>__*Optional*__
**typescriptVersion**?🔹 | <code>string</code> | TypeScript version to use.<br/>__*Default*__: "latest"
**workflowBootstrapSteps**?🔹 | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/>__*Default*__: "yarn install --frozen-lockfile && yarn projen"
**workflowContainerImage**?🔹 | <code>string</code> | Container image to use for GitHub workflows.<br/>__*Default*__: default image
**workflowNodeVersion**?🔹 | <code>string</code> | The node version to use in GitHub workflows.<br/>__*Default*__: same as `minNodeVersion`



## struct TailwindConfigOptions 🔹 <a id="projen-web-tailwindconfigoptions"></a>






Name | Type | Description 
-----|------|-------------
**fileName**?🔹 | <code>string</code> | __*Default*__: "tailwind.config.json"



## enum AutoRelease 🔹 <a id="projen-autorelease"></a>

Automatic bump modes.

Name | Description
-----|-----
**EVERY_COMMIT** 🔹|Automatically bump & release a new version for every commit to "main".
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


## enum GitpodOnOpen 🔹 <a id="projen-gitpodonopen"></a>

What to do when a service on a port is detected.

Name | Description
-----|-----
**OPEN_BROWSER** 🔹|Open a new browser tab.
**OPEN_PREVIEW** 🔹|Open a preview on the right side of the IDE.
**NOTIFY** 🔹|Show a notification asking the user what to do (default).
**IGNORE** 🔹|Do nothing.


## enum GitpodOpenIn 🔹 <a id="projen-gitpodopenin"></a>

Configure where in the IDE the terminal should be opened.

Name | Description
-----|-----
**BOTTOM** 🔹|the bottom panel (default).
**LEFT** 🔹|the left panel.
**RIGHT** 🔹|the right panel.
**MAIN** 🔹|the main editor area.


## enum GitpodOpenMode 🔹 <a id="projen-gitpodopenmode"></a>

Configure how the terminal should be opened relative to the previous task.

Name | Description
-----|-----
**TAB_AFTER** 🔹|Opens in the same tab group right after the previous tab.
**TAB_BEFORE** 🔹|Opens in the same tab group left before the previous tab.
**SPLIT_RIGHT** 🔹|Splits and adds the terminal to the right.
**SPLIT_LEFT** 🔹|Splits and adds the terminal to the left.
**SPLIT_TOP** 🔹|Splits and adds the terminal to the top.
**SPLIT_BOTTOM** 🔹|Splits and adds the terminal to the bottom.


## enum GitpodPortVisibility 🔹 <a id="projen-gitpodportvisibility"></a>

Whether the port visibility should be private or public.

Name | Description
-----|-----
**PUBLIC** 🔹|Allows everyone with the port URL to access the port (default).
**PRIVATE** 🔹|Only allows users with workspace access to access the port.


## enum LogLevel 🔹 <a id="projen-loglevel"></a>

Logging verbosity.

Name | Description
-----|-----
**OFF** 🔹|
**ERROR** 🔹|
**WARN** 🔹|
**INFO** 🔹|
**DEBUG** 🔹|
**VERBOSE** 🔹|


## enum NodePackageManager 🔹 <a id="projen-nodepackagemanager"></a>

The node package manager to use.

Name | Description
-----|-----
**YARN** 🔹|Use `yarn` as the package manager.
**NPM** 🔹|Use `npm` as the package manager.
**PNPM** 🔹|Use `pnpm` as the package manager.


## enum NpmAccess 🔹 <a id="projen-npmaccess"></a>

Npm package access level.

Name | Description
-----|-----
**PUBLIC** 🔹|Package is public.
**RESTRICTED** 🔹|Package can only be accessed with credentials.


## enum NpmTaskExecution 🔹 <a id="projen-npmtaskexecution"></a>



Name | Description
-----|-----
**PROJEN** 🔹|`package.json` scripts invoke to the projen CLI.
**SHELL** 🔹|Task is implemented directly as a shell script within `package.json`.


## enum ProjectType 🔹 <a id="projen-projecttype"></a>

Which type of project this is.

Name | Description
-----|-----
**UNKNOWN** 🔹|This module may be a either a library or an app.
**LIB** 🔹|This is a library, intended to be published to a package manager and consumed by other projects.
**APP** 🔹|This is an app (service, tool, website, etc).


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
**REACT_JSX** 🔹|Passes `key` separately from props and always passes `children` as props (since React 17).
**REACT_JSXDEV** 🔹|Same as `REACT_JSX` with additional debug data.


## enum TypeScriptModuleResolution 🔹 <a id="projen-typescriptmoduleresolution"></a>

Determines how modules get resolved.

Name | Description
-----|-----
**CLASSIC** 🔹|TypeScript's former default resolution strategy.
**NODE** 🔹|Resolution strategy which attempts to mimic the Node.js module resolution strategy at runtime.


## enum DependencyType 🔹 <a id="projen-deps-dependencytype"></a>

Type of dependency.

Name | Description
-----|-----
**RUNTIME** 🔹|The dependency is required for the program/library during runtime.
**PEER** 🔹|The dependency is required at runtime but expected to be installed by the consumer.
**BUNDLED** 🔹|The dependency is bundled and shipped with the module, so consumers are not required to install it.
**BUILD** 🔹|The dependency is required to run the `build` task.
**TEST** 🔹|The dependency is required to run the `test` task.
**DEVENV** 🔹|The dependency is required for development (e.g. IDE plugins).


## enum DependabotScheduleInterval 🔹 <a id="projen-github-dependabotscheduleinterval"></a>

How often to check for new versions and raise pull requests for version updates.

Name | Description
-----|-----
**DAILY** 🔹|Runs on every weekday, Monday to Friday.
**WEEKLY** 🔹|Runs once each week.
**MONTHLY** 🔹|Runs once each month.


## enum VersioningStrategy 🔹 <a id="projen-github-versioningstrategy"></a>

The strategy to use when edits manifest and lock files.

Name | Description
-----|-----
**LOCKFILE_ONLY** 🔹|Only create pull requests to update lockfiles updates.
**AUTO** 🔹|- For apps, the version requirements are increased.
**WIDEN** 🔹|Relax the version requirement to include both the new and old version, when possible.
**INCREASE** 🔹|Always increase the version requirement to match the new version.
**INCREASE_IF_NECESSARY** 🔹|Increase the version requirement only when required by the new version.


## enum TaskCategory 🔹 <a id="projen-tasks-taskcategory"></a>



Name | Description
-----|-----
**BUILD** 🔹|
**TEST** 🔹|
**RELEASE** 🔹|
**MAINTAIN** 🔹|
**MISC** 🔹|


## enum InternalConsoleOptions 🔹 <a id="projen-vscode-internalconsoleoptions"></a>

Controls the visibility of the VSCode Debug Console panel during a debugging session Source: https://code.visualstudio.com/docs/editor/debugging#_launchjson-attributes.

Name | Description
-----|-----
**NEVER_OPEN** 🔹|
**OPEN_ON_FIRST_SESSION_START** 🔹|
**OPEN_ON_SESSION_START** 🔹|


