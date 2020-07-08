# API Reference

**Classes**

Name|Description
----|-----------
[Eslint](#projen-eslint)|*No description*
[FileBase](#projen-filebase)|*No description*
[GithubWorkflow](#projen-githubworkflow)|*No description*
[IgnoreFile](#projen-ignorefile)|*No description*
[Jest](#projen-jest)|Installs the following npm scripts:.
[JsiiProject](#projen-jsiiproject)|*No description*
[JsonFile](#projen-jsonfile)|*No description*
[License](#projen-license)|*No description*
[Mergify](#projen-mergify)|*No description*
[NodeBuildWorkflow](#projen-nodebuildworkflow)|*No description*
[NodeProject](#projen-nodeproject)|*No description*
[Project](#projen-project)|*No description*
[Semver](#projen-semver)|*No description*
[TypeScriptLibraryProject](#projen-typescriptlibraryproject)|*No description*
[TypescriptConfig](#projen-typescriptconfig)|*No description*
[Version](#projen-version)|*No description*


**Structs**

Name|Description
----|-----------
[CommonOptions](#projen-commonoptions)|*No description*
[CoverageThreshold](#projen-coveragethreshold)|*No description*
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
[NodeBuildWorkflowOptions](#projen-nodebuildworkflowoptions)|*No description*
[NodeProjectOptions](#projen-nodeprojectoptions)|*No description*
[PeerDependencyOptions](#projen-peerdependencyoptions)|*No description*
[ProjectOptions](#projen-projectoptions)|*No description*
[TypeScriptCompilerOptions](#projen-typescriptcompileroptions)|*No description*
[TypeScriptLibraryProjectOptions](#projen-typescriptlibraryprojectoptions)|*No description*
[TypescriptConfigOptions](#projen-typescriptconfigoptions)|*No description*


**Enums**

Name|Description
----|-----------
[Stability](#projen-stability)|*No description*



## class Eslint 🔹 <a id="projen-eslint"></a>



<span style="text-decoration: underline">Implements</span>: [IConstruct](#constructs-iconstruct)
<span style="text-decoration: underline">Extends</span>: [Construct](#constructs-construct)

### Initializer




<span style="text-decoration: underline">Usage:</span>

```ts
new Eslint(project: NodeProject, options?: EslintOptions)
```

<span style="text-decoration: underline">Parameters:</span>
* **project** (<code>[NodeProject](#projen-nodeproject)</code>)  *No description*
* **options** (<code>[EslintOptions](#projen-eslintoptions)</code>)  *No description*
  * **config** (<code>Map<string, any></code>)  *No description* 
  * **dependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* 



### Properties


Name | Type | Description 
-----|------|-------------
**config**🔹 | <code>Map<string, any></code> | <span></span>
**dependencies**🔹 | <code>Map<string, [Semver](#projen-semver)></code> | <span></span>

### Methods


#### addRules(rules)🔹 <a id="projen-eslint-addrules"></a>



<span style="text-decoration: underline">Usage:</span>

```ts
addRules(rules: Map<string, any>): void
```

<span style="text-decoration: underline">Parameters:</span>
* **rules** (<code>Map<string, any></code>)  *No description*






## class FileBase 🔹 <a id="projen-filebase"></a>



<span style="text-decoration: underline">Implements</span>: [IConstruct](#constructs-iconstruct)
<span style="text-decoration: underline">Extends</span>: [Construct](#constructs-construct)
<span style="text-decoration: underline">Implemented by</span>: [GithubWorkflow](#projen-githubworkflow), [IgnoreFile](#projen-ignorefile), [JsonFile](#projen-jsonfile), [License](#projen-license), [NodeBuildWorkflow](#projen-nodebuildworkflow)

### Initializer




<span style="text-decoration: underline">Usage:</span>

```ts
new FileBase(project: Project, filePath: string, options?: FileBaseOptions)
```

<span style="text-decoration: underline">Parameters:</span>
* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **filePath** (<code>string</code>)  *No description*
* **options** (<code>[FileBaseOptions](#projen-filebaseoptions)</code>)  *No description*
  * **committed** (<code>boolean</code>)  Indicates whether this file should be committed to git or ignored. <span style="text-decoration: underline">*Default*</span>: true
  * **editGitignore** (<code>boolean</code>)  Update the project's .gitignore file. <span style="text-decoration: underline">*Default*</span>: true



### Properties


Name | Type | Description 
-----|------|-------------
**data**🔹 | <code>string</code> | <span></span>
**path**🔹 | <code>string</code> | <span></span>

### Methods


#### onSynthesize(session)🔹 <a id="projen-filebase-onsynthesize"></a>

Allows this construct to emit artifacts into the cloud assembly during synthesis.

This method is usually implemented by framework-level constructs such as `Stack` and `Asset`
as they participate in synthesizing the cloud assembly.

<span style="text-decoration: underline">Usage:</span>

```ts
onSynthesize(session: ISynthesisSession): void
```

<span style="text-decoration: underline">Parameters:</span>
* **session** (<code>[ISynthesisSession](#constructs-isynthesissession)</code>)  *No description*






## class GithubWorkflow 🔹 <a id="projen-githubworkflow"></a>



<span style="text-decoration: underline">Implements</span>: [IConstruct](#constructs-iconstruct)
<span style="text-decoration: underline">Extends</span>: [FileBase](#projen-filebase)

### Initializer




<span style="text-decoration: underline">Usage:</span>

```ts
new GithubWorkflow(project: Project, name: string)
```

<span style="text-decoration: underline">Parameters:</span>
* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **name** (<code>string</code>)  *No description*



### Properties


Name | Type | Description 
-----|------|-------------
**data**🔹 | <code>string</code> | <span></span>

### Methods


#### addJobs(jobs)🔹 <a id="projen-githubworkflow-addjobs"></a>



<span style="text-decoration: underline">Usage:</span>

```ts
addJobs(jobs: Map<string, any>): void
```

<span style="text-decoration: underline">Parameters:</span>
* **jobs** (<code>Map<string, any></code>)  *No description*




#### on(events)🔹 <a id="projen-githubworkflow-on"></a>



<span style="text-decoration: underline">Usage:</span>

```ts
on(events: Map<string, any>): void
```

<span style="text-decoration: underline">Parameters:</span>
* **events** (<code>Map<string, any></code>)  *No description*






## class IgnoreFile 🔹 <a id="projen-ignorefile"></a>



<span style="text-decoration: underline">Implements</span>: [IConstruct](#constructs-iconstruct)
<span style="text-decoration: underline">Extends</span>: [FileBase](#projen-filebase)

### Initializer




<span style="text-decoration: underline">Usage:</span>

```ts
new IgnoreFile(project: Project, filePath: string)
```

<span style="text-decoration: underline">Parameters:</span>
* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **filePath** (<code>string</code>)  *No description*



### Properties


Name | Type | Description 
-----|------|-------------
**data**🔹 | <code>string</code> | <span></span>

### Methods


#### comment(comment)🔹 <a id="projen-ignorefile-comment"></a>

appends a comment that will be included before the next exclude/include line.

<span style="text-decoration: underline">Usage:</span>

```ts
comment(comment: string): void
```

<span style="text-decoration: underline">Parameters:</span>
* **comment** (<code>string</code>)  *No description*




#### exclude(...patterns)🔹 <a id="projen-ignorefile-exclude"></a>



<span style="text-decoration: underline">Usage:</span>

```ts
exclude(...patterns: string[]): void
```

<span style="text-decoration: underline">Parameters:</span>
* **patterns** (<code>string</code>)  *No description*




#### include(...patterns)🔹 <a id="projen-ignorefile-include"></a>



<span style="text-decoration: underline">Usage:</span>

```ts
include(...patterns: string[]): void
```

<span style="text-decoration: underline">Parameters:</span>
* **patterns** (<code>string</code>)  *No description*






## class Jest 🔹 <a id="projen-jest"></a>

Installs the following npm scripts:.

- `test` will run `jest --passWithNoTests`
- `test:watch` will run `jest --watch`
- `test:update` will run `jest -u`

<span style="text-decoration: underline">Implements</span>: [IConstruct](#constructs-iconstruct)
<span style="text-decoration: underline">Extends</span>: [Construct](#constructs-construct)

### Initializer




<span style="text-decoration: underline">Usage:</span>

```ts
new Jest(project: NodeProject, options?: JestOptions)
```

<span style="text-decoration: underline">Parameters:</span>
* **project** (<code>[NodeProject](#projen-nodeproject)</code>)  *No description*
* **options** (<code>[JestOptions](#projen-jestoptions)</code>)  *No description*
  * **coverage** (<code>boolean</code>)  Collect coverage. <span style="text-decoration: underline">*Default*</span>: true
  * **coverageThreshold** (<code>[CoverageThreshold](#projen-coveragethreshold)</code>)  Specify the global coverage thresholds. <span style="text-decoration: underline">*Optional*</span>
  * **ignorePatterns** (<code>Array<string></code>)  Defines `testPathIgnorePatterns` and `coveragePathIgnorePatterns`. <span style="text-decoration: underline">*Default*</span>: "/node_modules/"
  * **typescript** (<code>[TypescriptConfig](#projen-typescriptconfig)</code>)  Configure for typescript. <span style="text-decoration: underline">*Optional*</span>




## class JsiiProject 🔹 <a id="projen-jsiiproject"></a>



<span style="text-decoration: underline">Implements</span>: [IConstruct](#constructs-iconstruct)
<span style="text-decoration: underline">Extends</span>: [NodeProject](#projen-nodeproject)

### Initializer




<span style="text-decoration: underline">Usage:</span>

```ts
new JsiiProject(options: JsiiProjectOptions)
```

<span style="text-decoration: underline">Parameters:</span>
* **options** (<code>[JsiiProjectOptions](#projen-jsiiprojectoptions)</code>)  *No description*
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files onn git. <span style="text-decoration: underline">*Default*</span>: true
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. <span style="text-decoration: underline">*Default*</span>: true
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. <span style="text-decoration: underline">*Optional*</span>
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. <span style="text-decoration: underline">*Default*</span>: true
  * **bundledDependencies** (<code>Array<string></code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **copyrightOwner** (<code>string</code>)  License copyright owner. <span style="text-decoration: underline">*Default*</span>: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. <span style="text-decoration: underline">*Default*</span>: current year
  * **dependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **devDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **keywords** (<code>Array<string></code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). <span style="text-decoration: underline">*Default*</span>: no max
  * **minNodeVersion** (<code>string</code>)  Node.js version to require via package.json `engines` (inclusive). <span style="text-decoration: underline">*Default*</span>: no "engines" specified
  * **npmDistTag** (<code>string</code>)  The dist-tag to use when releasing to npm. <span style="text-decoration: underline">*Default*</span>: "latest"
  * **peerDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. <span style="text-decoration: underline">*Default*</span>: true
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. <span style="text-decoration: underline">*Default*</span>: latest version
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. <span style="text-decoration: underline">*Default*</span>: [ "master" ]
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. <span style="text-decoration: underline">*Default*</span>: true
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "master" when new versions are bumped. <span style="text-decoration: underline">*Default*</span>: true
  * **workflowBootstrapSteps** (<code>Array<any></code>)  Workflow steps to use in order to bootstrap this repo. <span style="text-decoration: underline">*Default*</span>: [ { run: `npx projen${PROJEN_VERSION}` }, { run: 'yarn install --frozen-lockfile' } ]
  * **workflowContainerImage** (<code>string</code>)  Container image to use for GitHub workflows. <span style="text-decoration: underline">*Default*</span>: default image
  * **workflowNodeVersion** (<code>string</code>)  The node version to use in GitHub workflows. <span style="text-decoration: underline">*Default*</span>: same as `minNodeVersion`
  * **authorName** (<code>string</code>)  *No description* 
  * **name** (<code>string</code>)  *No description* 
  * **repository** (<code>string</code>)  *No description* 
  * **authorEmail** (<code>string</code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **authorOrganization** (<code>boolean</code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **authorUrl** (<code>string</code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **compat** (<code>boolean</code>)  Automatically run API compatibility test against the latest version published to npm after compilation. <span style="text-decoration: underline">*Default*</span>: true
  * **compatIgnore** (<code>string</code>)  Name of the ignore file for API compatibility tests. <span style="text-decoration: underline">*Default*</span>: .compatignore
  * **description** (<code>string</code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **docgen** (<code>boolean</code>)  Automatically generate API.md from jsii. <span style="text-decoration: underline">*Default*</span>: true
  * **dotnet** (<code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **eslint** (<code>boolean</code>)  Install eslint. <span style="text-decoration: underline">*Default*</span>: true
  * **java** (<code>[JsiiJavaTarget](#projen-jsiijavatarget)</code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **jest** (<code>boolean</code>)  Use jest for unit tests. <span style="text-decoration: underline">*Default*</span>: true
  * **jestOptions** (<code>[JestOptions](#projen-jestoptions)</code>)  Jest options. <span style="text-decoration: underline">*Default*</span>: defaults
  * **jsiiVersion** (<code>[Semver](#projen-semver)</code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **license** (<code>string</code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **mergify** (<code>boolean</code>)  Add mergify configuration. <span style="text-decoration: underline">*Default*</span>: true
  * **outdir** (<code>string</code>)  Compiler artifacts output directory. <span style="text-decoration: underline">*Default*</span>: "lib"
  * **python** (<code>[JsiiPythonTarget](#projen-jsiipythontarget)</code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **rootdir** (<code>string</code>)  *No description* <span style="text-decoration: underline">*Default*</span>: "."
  * **srcdir** (<code>string</code>)  Typescript sources directory. <span style="text-decoration: underline">*Default*</span>: "src"
  * **stability** (<code>string</code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **testdir** (<code>string</code>)  Tests directory. <span style="text-decoration: underline">*Default*</span>: "test"



### Properties


Name | Type | Description 
-----|------|-------------
**eslint**?🔹 | <code>[Eslint](#projen-eslint)</code> | <span style="text-decoration: underline">*Optional*</span>

### Methods


#### addCompileCommand(command)🔹 <a id="projen-jsiiproject-addcompilecommand"></a>

Adds that will be executed after the jsii compilation.

<span style="text-decoration: underline">Usage:</span>

```ts
addCompileCommand(command: string): void
```

<span style="text-decoration: underline">Parameters:</span>
* **command** (<code>string</code>)  The command to execute.






## class JsonFile 🔹 <a id="projen-jsonfile"></a>



<span style="text-decoration: underline">Implements</span>: [IConstruct](#constructs-iconstruct)
<span style="text-decoration: underline">Extends</span>: [FileBase](#projen-filebase)

### Initializer




<span style="text-decoration: underline">Usage:</span>

```ts
new JsonFile(project: Project, filePath: string, options: JsonFileOptions)
```

<span style="text-decoration: underline">Parameters:</span>
* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **filePath** (<code>string</code>)  *No description*
* **options** (<code>[JsonFileOptions](#projen-jsonfileoptions)</code>)  *No description*
  * **committed** (<code>boolean</code>)  Indicates whether this file should be committed to git or ignored. <span style="text-decoration: underline">*Default*</span>: true
  * **editGitignore** (<code>boolean</code>)  Update the project's .gitignore file. <span style="text-decoration: underline">*Default*</span>: true
  * **obj** (<code>any</code>)  *No description* 



### Properties


Name | Type | Description 
-----|------|-------------
**data**🔹 | <code>string</code> | <span></span>
**obj**🔹 | <code>json</code> | <span></span>



## class License 🔹 <a id="projen-license"></a>



<span style="text-decoration: underline">Implements</span>: [IConstruct](#constructs-iconstruct)
<span style="text-decoration: underline">Extends</span>: [FileBase](#projen-filebase)

### Initializer




<span style="text-decoration: underline">Usage:</span>

```ts
new License(project: Project, spdx: string, options: LicenseOptions)
```

<span style="text-decoration: underline">Parameters:</span>
* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **spdx** (<code>string</code>)  *No description*
* **options** (<code>[LicenseOptions](#projen-licenseoptions)</code>)  *No description*
  * **copyrightOwner** (<code>string</code>)  Copyright owner. <span style="text-decoration: underline">*Default*</span>: ""
  * **copyrightPeriod** (<code>string</code>)  Period of license (e.g. "1998-2023"). <span style="text-decoration: underline">*Default*</span>: current year (e.g. "2020")



### Properties


Name | Type | Description 
-----|------|-------------
**data**🔹 | <code>string</code> | <span></span>



## class Mergify 🔹 <a id="projen-mergify"></a>



<span style="text-decoration: underline">Implements</span>: [IConstruct](#constructs-iconstruct)
<span style="text-decoration: underline">Extends</span>: [Construct](#constructs-construct)

### Initializer




<span style="text-decoration: underline">Usage:</span>

```ts
new Mergify(project: Project, options?: MergifyOptions)
```

<span style="text-decoration: underline">Parameters:</span>
* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **options** (<code>[MergifyOptions](#projen-mergifyoptions)</code>)  *No description*
  * **rules** (<code>Array<[MergifyRule](#projen-mergifyrule)></code>)  *No description* <span style="text-decoration: underline">*Optional*</span>


### Methods


#### addRule(rule)🔹 <a id="projen-mergify-addrule"></a>



<span style="text-decoration: underline">Usage:</span>

```ts
addRule(rule: MergifyRule): void
```

<span style="text-decoration: underline">Parameters:</span>
* **rule** (<code>[MergifyRule](#projen-mergifyrule)</code>)  *No description*
  * **actions** (<code>Map<string, any></code>)  *No description* 
  * **conditions** (<code>Array<string></code>)  *No description* 
  * **name** (<code>string</code>)  *No description* 






## class NodeBuildWorkflow 🔹 <a id="projen-nodebuildworkflow"></a>



<span style="text-decoration: underline">Implements</span>: [IConstruct](#constructs-iconstruct)
<span style="text-decoration: underline">Extends</span>: [GithubWorkflow](#projen-githubworkflow)

### Initializer




<span style="text-decoration: underline">Usage:</span>

```ts
new NodeBuildWorkflow(project: Project, name: string, options: NodeBuildWorkflowOptions)
```

<span style="text-decoration: underline">Parameters:</span>
* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **name** (<code>string</code>)  *No description*
* **options** (<code>[NodeBuildWorkflowOptions](#projen-nodebuildworkflowoptions)</code>)  *No description*
  * **trigger** (<code>Map<string, any></code>)  *No description* 
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files onn git. <span style="text-decoration: underline">*Default*</span>: true
  * **bootstrapSteps** (<code>Array<any></code>)  Workflow steps to use in order to bootstrap this repo. <span style="text-decoration: underline">*Default*</span>: [ { run: `npx projen${PROJEN_VERSION}` }, { run: 'yarn install --frozen-lockfile' } ]
  * **image** (<code>string</code>)  *No description* <span style="text-decoration: underline">*Default*</span>: default image
  * **nodeVersion** (<code>string</code>)  Adds a `actions/setup-node@v1` action with a specific node version. <span style="text-decoration: underline">*Optional*</span>
  * **uploadArtifact** (<code>boolean</code>)  *No description* <span style="text-decoration: underline">*Optional*</span>



### Properties


Name | Type | Description 
-----|------|-------------
**buildJobId**🔹 | <code>string</code> | <span></span>



## class NodeProject 🔹 <a id="projen-nodeproject"></a>



<span style="text-decoration: underline">Implements</span>: [IConstruct](#constructs-iconstruct)
<span style="text-decoration: underline">Extends</span>: [Project](#projen-project)

### Initializer




<span style="text-decoration: underline">Usage:</span>

```ts
new NodeProject(options: NodeProjectOptions)
```

<span style="text-decoration: underline">Parameters:</span>
* **options** (<code>[NodeProjectOptions](#projen-nodeprojectoptions)</code>)  *No description*
  * **outdir** (<code>string</code>)  Where to put the generated project files. <span style="text-decoration: underline">*Default*</span>: . current directory
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files onn git. <span style="text-decoration: underline">*Default*</span>: true
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. <span style="text-decoration: underline">*Default*</span>: true
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. <span style="text-decoration: underline">*Optional*</span>
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. <span style="text-decoration: underline">*Default*</span>: true
  * **bundledDependencies** (<code>Array<string></code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **copyrightOwner** (<code>string</code>)  License copyright owner. <span style="text-decoration: underline">*Default*</span>: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. <span style="text-decoration: underline">*Default*</span>: current year
  * **dependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **devDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **keywords** (<code>Array<string></code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). <span style="text-decoration: underline">*Default*</span>: no max
  * **minNodeVersion** (<code>string</code>)  Node.js version to require via package.json `engines` (inclusive). <span style="text-decoration: underline">*Default*</span>: no "engines" specified
  * **npmDistTag** (<code>string</code>)  The dist-tag to use when releasing to npm. <span style="text-decoration: underline">*Default*</span>: "latest"
  * **peerDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. <span style="text-decoration: underline">*Default*</span>: true
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. <span style="text-decoration: underline">*Default*</span>: latest version
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. <span style="text-decoration: underline">*Default*</span>: [ "master" ]
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. <span style="text-decoration: underline">*Default*</span>: true
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "master" when new versions are bumped. <span style="text-decoration: underline">*Default*</span>: true
  * **workflowBootstrapSteps** (<code>Array<any></code>)  Workflow steps to use in order to bootstrap this repo. <span style="text-decoration: underline">*Default*</span>: [ { run: `npx projen${PROJEN_VERSION}` }, { run: 'yarn install --frozen-lockfile' } ]
  * **workflowContainerImage** (<code>string</code>)  Container image to use for GitHub workflows. <span style="text-decoration: underline">*Default*</span>: default image
  * **workflowNodeVersion** (<code>string</code>)  The node version to use in GitHub workflows. <span style="text-decoration: underline">*Default*</span>: same as `minNodeVersion`
  * **name** (<code>string</code>)  This is the name of your package. 
  * **authorEmail** (<code>string</code>)  Author's e-mail. <span style="text-decoration: underline">*Optional*</span>
  * **authorName** (<code>string</code>)  Author's name. <span style="text-decoration: underline">*Optional*</span>
  * **authorOrganization** (<code>boolean</code>)  Author's Organization. <span style="text-decoration: underline">*Optional*</span>
  * **authorUrl** (<code>string</code>)  Author's URL / Website. <span style="text-decoration: underline">*Optional*</span>
  * **description** (<code>string</code>)  The description is just a string that helps people understand the purpose of the package. <span style="text-decoration: underline">*Optional*</span>
  * **gitignore** (<code>Array<string></code>)  Additional entries to .gitignore. <span style="text-decoration: underline">*Optional*</span>
  * **homepage** (<code>string</code>)  Package's Homepage / Website. <span style="text-decoration: underline">*Optional*</span>
  * **license** (<code>string</code>)  License's SPDX identifier. <span style="text-decoration: underline">*Optional*</span>
  * **npmignore** (<code>Array<string></code>)  Additional entries to .npmignore. <span style="text-decoration: underline">*Optional*</span>
  * **repository** (<code>string</code>)  The repository is the location where the actual code for your package lives. <span style="text-decoration: underline">*Optional*</span>
  * **repositoryDirectory** (<code>string</code>)  If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives. <span style="text-decoration: underline">*Optional*</span>
  * **stability** (<code>string</code>)  Package's Stability. <span style="text-decoration: underline">*Optional*</span>



### Properties


Name | Type | Description 
-----|------|-------------
**npmDistTag**🔹 | <code>string</code> | <span></span>
**npmignore**🔹 | <code>[IgnoreFile](#projen-ignorefile)</code> | <span></span>
**version**🔹 | <code>any</code> | Returns the current version of the project.
**buildWorkflow**?🔹 | <code>[NodeBuildWorkflow](#projen-nodebuildworkflow)</code> | The PR build GitHub workflow.<br/><span style="text-decoration: underline">*Optional*</span>
**maxNodeVersion**?🔹 | <code>string</code> | <span style="text-decoration: underline">*Optional*</span>
**minNodeVersion**?🔹 | <code>string</code> | <span style="text-decoration: underline">*Optional*</span>
**releaseWorkflow**?🔹 | <code>[NodeBuildWorkflow](#projen-nodebuildworkflow)</code> | The release GitHub workflow.<br/><span style="text-decoration: underline">*Optional*</span>

### Methods


#### addBins(bins)🔹 <a id="projen-nodeproject-addbins"></a>



<span style="text-decoration: underline">Usage:</span>

```ts
addBins(bins: Map<string, string>): void
```

<span style="text-decoration: underline">Parameters:</span>
* **bins** (<code>Map<string, string></code>)  *No description*




#### addBundledDependencies(...deps)🔹 <a id="projen-nodeproject-addbundleddependencies"></a>



<span style="text-decoration: underline">Usage:</span>

```ts
addBundledDependencies(...deps: string[]): void
```

<span style="text-decoration: underline">Parameters:</span>
* **deps** (<code>string</code>)  *No description*




#### addDependencies(deps, bundle?)🔹 <a id="projen-nodeproject-adddependencies"></a>



<span style="text-decoration: underline">Usage:</span>

```ts
addDependencies(deps: Map<string, Semver>, bundle?: boolean): void
```

<span style="text-decoration: underline">Parameters:</span>
* **deps** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description*
* **bundle** (<code>boolean</code>)  *No description*




#### addDevDependencies(deps)🔹 <a id="projen-nodeproject-adddevdependencies"></a>



<span style="text-decoration: underline">Usage:</span>

```ts
addDevDependencies(deps: Map<string, Semver>): void
```

<span style="text-decoration: underline">Parameters:</span>
* **deps** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description*




#### addFields(fields)🔹 <a id="projen-nodeproject-addfields"></a>



<span style="text-decoration: underline">Usage:</span>

```ts
addFields(fields: Map<string, any>): void
```

<span style="text-decoration: underline">Parameters:</span>
* **fields** (<code>Map<string, any></code>)  *No description*




#### addPeerDependencies(deps, options?)🔹 <a id="projen-nodeproject-addpeerdependencies"></a>



<span style="text-decoration: underline">Usage:</span>

```ts
addPeerDependencies(deps: Map<string, Semver>, options?: PeerDependencyOptions): void
```

<span style="text-decoration: underline">Parameters:</span>
* **deps** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description*
* **options** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  *No description*
  * **pinnedDevDependency** (<code>boolean</code>)  Automatically add a pinned dev dependency. <span style="text-decoration: underline">*Default*</span>: true




#### addScripts(scripts)🔹 <a id="projen-nodeproject-addscripts"></a>



<span style="text-decoration: underline">Usage:</span>

```ts
addScripts(scripts: Map<string, string>): void
```

<span style="text-decoration: underline">Parameters:</span>
* **scripts** (<code>Map<string, string></code>)  *No description*




#### addTestCommands(...commands)🔹 <a id="projen-nodeproject-addtestcommands"></a>



<span style="text-decoration: underline">Usage:</span>

```ts
addTestCommands(...commands: string[]): void
```

<span style="text-decoration: underline">Parameters:</span>
* **commands** (<code>string</code>)  *No description*






## class Project 🔹 <a id="projen-project"></a>



<span style="text-decoration: underline">Implements</span>: [IConstruct](#constructs-iconstruct)
<span style="text-decoration: underline">Extends</span>: [Construct](#constructs-construct)

### Initializer




<span style="text-decoration: underline">Usage:</span>

```ts
new Project(options?: ProjectOptions)
```

<span style="text-decoration: underline">Parameters:</span>
* **options** (<code>[ProjectOptions](#projen-projectoptions)</code>)  *No description*
  * **outdir** (<code>string</code>)  Where to put the generated project files. <span style="text-decoration: underline">*Default*</span>: . current directory



### Properties


Name | Type | Description 
-----|------|-------------
**gitignore**🔹 | <code>[IgnoreFile](#projen-ignorefile)</code> | <span></span>
**outdir**🔹 | <code>string</code> | <span></span>

### Methods


#### synth()🔹 <a id="projen-project-synth"></a>



<span style="text-decoration: underline">Usage:</span>

```ts
synth(): void
```

<span style="text-decoration: underline">Parameters:</span>






## class Semver 🔹 <a id="projen-semver"></a>





### Properties


Name | Type | Description 
-----|------|-------------
**spec**🔹 | <code>string</code> | <span></span>
**version**🔹 | <code>string</code> | <span></span>
**mode**?🔹 | <code>string</code> | <span style="text-decoration: underline">*Optional*</span>

### Methods


#### *static* caret(version)🔹 <a id="projen-semver-caret"></a>

Accept any minor version.

>= version
< next major version

<span style="text-decoration: underline">Usage:</span>

```ts
static caret(version: string): Semver
```

<span style="text-decoration: underline">Parameters:</span>
* **version** (<code>string</code>)  *No description*

<span style="text-decoration: underline">Returns</span>:
* <code>[Semver](#projen-semver)</code>

#### *static* pinned(version)🔹 <a id="projen-semver-pinned"></a>

Accept only an exact version.

<span style="text-decoration: underline">Usage:</span>

```ts
static pinned(version: string): Semver
```

<span style="text-decoration: underline">Parameters:</span>
* **version** (<code>string</code>)  *No description*

<span style="text-decoration: underline">Returns</span>:
* <code>[Semver](#projen-semver)</code>

#### *static* tilde(version)🔹 <a id="projen-semver-tilde"></a>

Accept patches.

>= version
< next minor version

<span style="text-decoration: underline">Usage:</span>

```ts
static tilde(version: string): Semver
```

<span style="text-decoration: underline">Parameters:</span>
* **version** (<code>string</code>)  *No description*

<span style="text-decoration: underline">Returns</span>:
* <code>[Semver](#projen-semver)</code>



## class TypeScriptLibraryProject 🔹 <a id="projen-typescriptlibraryproject"></a>



<span style="text-decoration: underline">Implements</span>: [IConstruct](#constructs-iconstruct)
<span style="text-decoration: underline">Extends</span>: [NodeProject](#projen-nodeproject)

### Initializer




<span style="text-decoration: underline">Usage:</span>

```ts
new TypeScriptLibraryProject(options: TypeScriptLibraryProjectOptions)
```

<span style="text-decoration: underline">Parameters:</span>
* **options** (<code>[TypeScriptLibraryProjectOptions](#projen-typescriptlibraryprojectoptions)</code>)  *No description*
  * **outdir** (<code>string</code>)  Where to put the generated project files. <span style="text-decoration: underline">*Default*</span>: . current directory
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files onn git. <span style="text-decoration: underline">*Default*</span>: true
  * **autoDetectBin** (<code>boolean</code>)  Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. <span style="text-decoration: underline">*Default*</span>: true
  * **bin** (<code>Map<string, string></code>)  Binary programs vended with your module. <span style="text-decoration: underline">*Optional*</span>
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. <span style="text-decoration: underline">*Default*</span>: true
  * **bundledDependencies** (<code>Array<string></code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **copyrightOwner** (<code>string</code>)  License copyright owner. <span style="text-decoration: underline">*Default*</span>: defaults to the value of authorName or "" if `authorName` is undefined.
  * **copyrightPeriod** (<code>string</code>)  The copyright years to put in the LICENSE file. <span style="text-decoration: underline">*Default*</span>: current year
  * **dependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **devDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **keywords** (<code>Array<string></code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **maxNodeVersion** (<code>string</code>)  Minimum node.js version to require via `engines` (inclusive). <span style="text-decoration: underline">*Default*</span>: no max
  * **minNodeVersion** (<code>string</code>)  Node.js version to require via package.json `engines` (inclusive). <span style="text-decoration: underline">*Default*</span>: no "engines" specified
  * **npmDistTag** (<code>string</code>)  The dist-tag to use when releasing to npm. <span style="text-decoration: underline">*Default*</span>: "latest"
  * **peerDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. <span style="text-decoration: underline">*Default*</span>: true
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. <span style="text-decoration: underline">*Default*</span>: latest version
  * **releaseBranches** (<code>Array<string></code>)  Branches which trigger a release. <span style="text-decoration: underline">*Default*</span>: [ "master" ]
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. <span style="text-decoration: underline">*Default*</span>: true
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "master" when new versions are bumped. <span style="text-decoration: underline">*Default*</span>: true
  * **workflowBootstrapSteps** (<code>Array<any></code>)  Workflow steps to use in order to bootstrap this repo. <span style="text-decoration: underline">*Default*</span>: [ { run: `npx projen${PROJEN_VERSION}` }, { run: 'yarn install --frozen-lockfile' } ]
  * **workflowContainerImage** (<code>string</code>)  Container image to use for GitHub workflows. <span style="text-decoration: underline">*Default*</span>: default image
  * **workflowNodeVersion** (<code>string</code>)  The node version to use in GitHub workflows. <span style="text-decoration: underline">*Default*</span>: same as `minNodeVersion`
  * **name** (<code>string</code>)  This is the name of your package. 
  * **authorEmail** (<code>string</code>)  Author's e-mail. <span style="text-decoration: underline">*Optional*</span>
  * **authorName** (<code>string</code>)  Author's name. <span style="text-decoration: underline">*Optional*</span>
  * **authorOrganization** (<code>boolean</code>)  Author's Organization. <span style="text-decoration: underline">*Optional*</span>
  * **authorUrl** (<code>string</code>)  Author's URL / Website. <span style="text-decoration: underline">*Optional*</span>
  * **description** (<code>string</code>)  The description is just a string that helps people understand the purpose of the package. <span style="text-decoration: underline">*Optional*</span>
  * **gitignore** (<code>Array<string></code>)  Additional entries to .gitignore. <span style="text-decoration: underline">*Optional*</span>
  * **homepage** (<code>string</code>)  Package's Homepage / Website. <span style="text-decoration: underline">*Optional*</span>
  * **license** (<code>string</code>)  License's SPDX identifier. <span style="text-decoration: underline">*Optional*</span>
  * **npmignore** (<code>Array<string></code>)  Additional entries to .npmignore. <span style="text-decoration: underline">*Optional*</span>
  * **repository** (<code>string</code>)  The repository is the location where the actual code for your package lives. <span style="text-decoration: underline">*Optional*</span>
  * **repositoryDirectory** (<code>string</code>)  If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives. <span style="text-decoration: underline">*Optional*</span>
  * **stability** (<code>string</code>)  Package's Stability. <span style="text-decoration: underline">*Optional*</span>
  * **docgen** (<code>boolean</code>)  Docgen by Typedoc. <span style="text-decoration: underline">*Default*</span>: false
  * **docsDirectory** (<code>string</code>)  Docs directory. <span style="text-decoration: underline">*Default*</span>: 'docs'
  * **eslint** (<code>boolean</code>)  Setup eslint. <span style="text-decoration: underline">*Default*</span>: true
  * **jest** (<code>boolean</code>)  Setup jest unit tests. <span style="text-decoration: underline">*Default*</span>: true
  * **jestOptions** (<code>[JestOptions](#projen-jestoptions)</code>)  Jest options. <span style="text-decoration: underline">*Default*</span>: default options
  * **mergify** (<code>boolean</code>)  Adds mergify configuration. <span style="text-decoration: underline">*Default*</span>: true
  * **mergifyOptions** (<code>[MergifyOptions](#projen-mergifyoptions)</code>)  Options for mergify. <span style="text-decoration: underline">*Default*</span>: default options
  * **tsconfig** (<code>[TypescriptConfigOptions](#projen-typescriptconfigoptions)</code>)  Custom TSConfig. <span style="text-decoration: underline">*Optional*</span>
  * **typescriptVersion** (<code>[Semver](#projen-semver)</code>)  TypeScript version to use. <span style="text-decoration: underline">*Default*</span>: ^3.9.5



### Properties


Name | Type | Description 
-----|------|-------------
**docsDirectory**🔹 | <code>string</code> | <span></span>
**docgen**?🔹 | <code>boolean</code> | <span style="text-decoration: underline">*Optional*</span>



## class TypescriptConfig 🔹 <a id="projen-typescriptconfig"></a>



<span style="text-decoration: underline">Implements</span>: [IConstruct](#constructs-iconstruct)
<span style="text-decoration: underline">Extends</span>: [Construct](#constructs-construct)

### Initializer




<span style="text-decoration: underline">Usage:</span>

```ts
new TypescriptConfig(project: NodeProject, options: TypescriptConfigOptions)
```

<span style="text-decoration: underline">Parameters:</span>
* **project** (<code>[NodeProject](#projen-nodeproject)</code>)  *No description*
* **options** (<code>[TypescriptConfigOptions](#projen-typescriptconfigoptions)</code>)  *No description*
  * **compilerOptions** (<code>[TypeScriptCompilerOptions](#projen-typescriptcompileroptions)</code>)  Compiler options to use. 
  * **exclude** (<code>Array<string></code>)  *No description* <span style="text-decoration: underline">*Default*</span>: node_modules is excluded by default
  * **fileName** (<code>string</code>)  *No description* <span style="text-decoration: underline">*Default*</span>: "tsconfig.json"
  * **include** (<code>Array<string></code>)  The directory in which typescript sources reside. <span style="text-decoration: underline">*Default*</span>: all .ts files recursively



### Properties


Name | Type | Description 
-----|------|-------------
**compilerOptions**🔹 | <code>[TypeScriptCompilerOptions](#projen-typescriptcompileroptions)</code> | <span></span>
**exclude**🔹 | <code>Array<string></code> | <span></span>
**fileName**🔹 | <code>string</code> | <span></span>
**include**🔹 | <code>Array<string></code> | <span></span>



## class Version 🔹 <a id="projen-version"></a>



<span style="text-decoration: underline">Implements</span>: [IConstruct](#constructs-iconstruct)
<span style="text-decoration: underline">Extends</span>: [Construct](#constructs-construct)

### Initializer




<span style="text-decoration: underline">Usage:</span>

```ts
new Version(project: NodeProject)
```

<span style="text-decoration: underline">Parameters:</span>
* **project** (<code>[NodeProject](#projen-nodeproject)</code>)  *No description*



### Properties


Name | Type | Description 
-----|------|-------------
**current**🔹 | <code>any</code> | Returns the current version of the project.



## struct CommonOptions 🔹 <a id="projen-commonoptions"></a>






Name | Type | Description 
-----|------|-------------
**antitamper**?🔹 | <code>boolean</code> | Checks that after build there are no modified files onn git.<br/><span style="text-decoration: underline">*Default*</span>: true
**autoDetectBin**?🔹 | <code>boolean</code> | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.<br/><span style="text-decoration: underline">*Default*</span>: true
**bin**?🔹 | <code>Map<string, string></code> | Binary programs vended with your module.<br/><span style="text-decoration: underline">*Optional*</span>
**buildWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/><span style="text-decoration: underline">*Default*</span>: true
**bundledDependencies**?🔹 | <code>Array<string></code> | <span style="text-decoration: underline">*Optional*</span>
**copyrightOwner**?🔹 | <code>string</code> | License copyright owner.<br/><span style="text-decoration: underline">*Default*</span>: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?🔹 | <code>string</code> | The copyright years to put in the LICENSE file.<br/><span style="text-decoration: underline">*Default*</span>: current year
**dependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | <span style="text-decoration: underline">*Optional*</span>
**devDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | <span style="text-decoration: underline">*Optional*</span>
**keywords**?🔹 | <code>Array<string></code> | <span style="text-decoration: underline">*Optional*</span>
**maxNodeVersion**?🔹 | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/><span style="text-decoration: underline">*Default*</span>: no max
**minNodeVersion**?🔹 | <code>string</code> | Node.js version to require via package.json `engines` (inclusive).<br/><span style="text-decoration: underline">*Default*</span>: no "engines" specified
**npmDistTag**?🔹 | <code>string</code> | The dist-tag to use when releasing to npm.<br/><span style="text-decoration: underline">*Default*</span>: "latest"
**peerDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | <span style="text-decoration: underline">*Optional*</span>
**peerDependencyOptions**?🔹 | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | <span style="text-decoration: underline">*Optional*</span>
**projenDevDependency**?🔹 | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/><span style="text-decoration: underline">*Default*</span>: true
**projenVersion**?🔹 | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/><span style="text-decoration: underline">*Default*</span>: latest version
**releaseBranches**?🔹 | <code>Array<string></code> | Branches which trigger a release.<br/><span style="text-decoration: underline">*Default*</span>: [ "master" ]
**releaseToNpm**?🔹 | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/><span style="text-decoration: underline">*Default*</span>: true
**releaseWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for releasing from "master" when new versions are bumped.<br/><span style="text-decoration: underline">*Default*</span>: true
**workflowBootstrapSteps**?🔹 | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/><span style="text-decoration: underline">*Default*</span>: [ { run: `npx projen${PROJEN_VERSION}` }, { run: 'yarn install --frozen-lockfile' } ]
**workflowContainerImage**?🔹 | <code>string</code> | Container image to use for GitHub workflows.<br/><span style="text-decoration: underline">*Default*</span>: default image
**workflowNodeVersion**?🔹 | <code>string</code> | The node version to use in GitHub workflows.<br/><span style="text-decoration: underline">*Default*</span>: same as `minNodeVersion`



## struct CoverageThreshold 🔹 <a id="projen-coveragethreshold"></a>






Name | Type | Description 
-----|------|-------------
**branches**?🔹 | <code>number</code> | <span style="text-decoration: underline">*Optional*</span>
**functions**?🔹 | <code>number</code> | <span style="text-decoration: underline">*Optional*</span>
**lines**?🔹 | <code>number</code> | <span style="text-decoration: underline">*Optional*</span>
**statements**?🔹 | <code>number</code> | <span style="text-decoration: underline">*Optional*</span>



## struct EslintOptions 🔹 <a id="projen-eslintoptions"></a>






Name | Type | Description 
-----|------|-------------
**config**🔹 | <code>Map<string, any></code> | <span></span>
**dependencies**🔹 | <code>Map<string, [Semver](#projen-semver)></code> | <span></span>



## struct FileBaseOptions 🔹 <a id="projen-filebaseoptions"></a>






Name | Type | Description 
-----|------|-------------
**committed**?🔹 | <code>boolean</code> | Indicates whether this file should be committed to git or ignored.<br/><span style="text-decoration: underline">*Default*</span>: true
**editGitignore**?🔹 | <code>boolean</code> | Update the project's .gitignore file.<br/><span style="text-decoration: underline">*Default*</span>: true



## struct JestOptions 🔹 <a id="projen-jestoptions"></a>






Name | Type | Description 
-----|------|-------------
**coverage**?🔹 | <code>boolean</code> | Collect coverage.<br/><span style="text-decoration: underline">*Default*</span>: true
**coverageThreshold**?🔹 | <code>[CoverageThreshold](#projen-coveragethreshold)</code> | Specify the global coverage thresholds.<br/><span style="text-decoration: underline">*Optional*</span>
**ignorePatterns**?🔹 | <code>Array<string></code> | Defines `testPathIgnorePatterns` and `coveragePathIgnorePatterns`.<br/><span style="text-decoration: underline">*Default*</span>: "/node_modules/"
**typescript**?🔹 | <code>[TypescriptConfig](#projen-typescriptconfig)</code> | Configure for typescript.<br/><span style="text-decoration: underline">*Optional*</span>



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
**antitamper**?🔹 | <code>boolean</code> | Checks that after build there are no modified files onn git.<br/><span style="text-decoration: underline">*Default*</span>: true
**authorEmail**?🔹 | <code>string</code> | <span style="text-decoration: underline">*Optional*</span>
**authorOrganization**?🔹 | <code>boolean</code> | <span style="text-decoration: underline">*Optional*</span>
**authorUrl**?🔹 | <code>string</code> | <span style="text-decoration: underline">*Optional*</span>
**autoDetectBin**?🔹 | <code>boolean</code> | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.<br/><span style="text-decoration: underline">*Default*</span>: true
**bin**?🔹 | <code>Map<string, string></code> | Binary programs vended with your module.<br/><span style="text-decoration: underline">*Optional*</span>
**buildWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/><span style="text-decoration: underline">*Default*</span>: true
**bundledDependencies**?🔹 | <code>Array<string></code> | <span style="text-decoration: underline">*Optional*</span>
**compat**?🔹 | <code>boolean</code> | Automatically run API compatibility test against the latest version published to npm after compilation.<br/><span style="text-decoration: underline">*Default*</span>: true
**compatIgnore**?🔹 | <code>string</code> | Name of the ignore file for API compatibility tests.<br/><span style="text-decoration: underline">*Default*</span>: .compatignore
**copyrightOwner**?🔹 | <code>string</code> | License copyright owner.<br/><span style="text-decoration: underline">*Default*</span>: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?🔹 | <code>string</code> | The copyright years to put in the LICENSE file.<br/><span style="text-decoration: underline">*Default*</span>: current year
**dependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | <span style="text-decoration: underline">*Optional*</span>
**description**?🔹 | <code>string</code> | <span style="text-decoration: underline">*Optional*</span>
**devDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | <span style="text-decoration: underline">*Optional*</span>
**docgen**?🔹 | <code>boolean</code> | Automatically generate API.md from jsii.<br/><span style="text-decoration: underline">*Default*</span>: true
**dotnet**?🔹 | <code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code> | <span style="text-decoration: underline">*Optional*</span>
**eslint**?🔹 | <code>boolean</code> | Install eslint.<br/><span style="text-decoration: underline">*Default*</span>: true
**java**?🔹 | <code>[JsiiJavaTarget](#projen-jsiijavatarget)</code> | <span style="text-decoration: underline">*Optional*</span>
**jest**?🔹 | <code>boolean</code> | Use jest for unit tests.<br/><span style="text-decoration: underline">*Default*</span>: true
**jestOptions**?🔹 | <code>[JestOptions](#projen-jestoptions)</code> | Jest options.<br/><span style="text-decoration: underline">*Default*</span>: defaults
**jsiiVersion**?🔹 | <code>[Semver](#projen-semver)</code> | <span style="text-decoration: underline">*Optional*</span>
**keywords**?🔹 | <code>Array<string></code> | <span style="text-decoration: underline">*Optional*</span>
**license**?🔹 | <code>string</code> | <span style="text-decoration: underline">*Optional*</span>
**maxNodeVersion**?🔹 | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/><span style="text-decoration: underline">*Default*</span>: no max
**mergify**?🔹 | <code>boolean</code> | Add mergify configuration.<br/><span style="text-decoration: underline">*Default*</span>: true
**minNodeVersion**?🔹 | <code>string</code> | Node.js version to require via package.json `engines` (inclusive).<br/><span style="text-decoration: underline">*Default*</span>: no "engines" specified
**npmDistTag**?🔹 | <code>string</code> | The dist-tag to use when releasing to npm.<br/><span style="text-decoration: underline">*Default*</span>: "latest"
**outdir**?🔹 | <code>string</code> | Compiler artifacts output directory.<br/><span style="text-decoration: underline">*Default*</span>: "lib"
**peerDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | <span style="text-decoration: underline">*Optional*</span>
**peerDependencyOptions**?🔹 | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | <span style="text-decoration: underline">*Optional*</span>
**projenDevDependency**?🔹 | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/><span style="text-decoration: underline">*Default*</span>: true
**projenVersion**?🔹 | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/><span style="text-decoration: underline">*Default*</span>: latest version
**python**?🔹 | <code>[JsiiPythonTarget](#projen-jsiipythontarget)</code> | <span style="text-decoration: underline">*Optional*</span>
**releaseBranches**?🔹 | <code>Array<string></code> | Branches which trigger a release.<br/><span style="text-decoration: underline">*Default*</span>: [ "master" ]
**releaseToNpm**?🔹 | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/><span style="text-decoration: underline">*Default*</span>: true
**releaseWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for releasing from "master" when new versions are bumped.<br/><span style="text-decoration: underline">*Default*</span>: true
**rootdir**?🔹 | <code>string</code> | <span style="text-decoration: underline">*Default*</span>: "."
**srcdir**?🔹 | <code>string</code> | Typescript sources directory.<br/><span style="text-decoration: underline">*Default*</span>: "src"
**stability**?🔹 | <code>string</code> | <span style="text-decoration: underline">*Optional*</span>
**testdir**?🔹 | <code>string</code> | Tests directory.<br/><span style="text-decoration: underline">*Default*</span>: "test"
**workflowBootstrapSteps**?🔹 | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/><span style="text-decoration: underline">*Default*</span>: [ { run: `npx projen${PROJEN_VERSION}` }, { run: 'yarn install --frozen-lockfile' } ]
**workflowContainerImage**?🔹 | <code>string</code> | Container image to use for GitHub workflows.<br/><span style="text-decoration: underline">*Default*</span>: default image
**workflowNodeVersion**?🔹 | <code>string</code> | The node version to use in GitHub workflows.<br/><span style="text-decoration: underline">*Default*</span>: same as `minNodeVersion`



## struct JsiiPythonTarget 🔹 <a id="projen-jsiipythontarget"></a>






Name | Type | Description 
-----|------|-------------
**distName**🔹 | <code>string</code> | <span></span>
**module**🔹 | <code>string</code> | <span></span>



## struct JsonFileOptions 🔹 <a id="projen-jsonfileoptions"></a>






Name | Type | Description 
-----|------|-------------
**obj**🔹 | <code>any</code> | <span></span>
**committed**?🔹 | <code>boolean</code> | Indicates whether this file should be committed to git or ignored.<br/><span style="text-decoration: underline">*Default*</span>: true
**editGitignore**?🔹 | <code>boolean</code> | Update the project's .gitignore file.<br/><span style="text-decoration: underline">*Default*</span>: true



## struct LicenseOptions 🔹 <a id="projen-licenseoptions"></a>






Name | Type | Description 
-----|------|-------------
**copyrightOwner**?🔹 | <code>string</code> | Copyright owner.<br/><span style="text-decoration: underline">*Default*</span>: ""
**copyrightPeriod**?🔹 | <code>string</code> | Period of license (e.g. "1998-2023").<br/><span style="text-decoration: underline">*Default*</span>: current year (e.g. "2020")



## struct MergifyOptions 🔹 <a id="projen-mergifyoptions"></a>






Name | Type | Description 
-----|------|-------------
**rules**?🔹 | <code>Array<[MergifyRule](#projen-mergifyrule)></code> | <span style="text-decoration: underline">*Optional*</span>



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
**antitamper**?🔹 | <code>boolean</code> | Checks that after build there are no modified files onn git.<br/><span style="text-decoration: underline">*Default*</span>: true
**bootstrapSteps**?🔹 | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/><span style="text-decoration: underline">*Default*</span>: [ { run: `npx projen${PROJEN_VERSION}` }, { run: 'yarn install --frozen-lockfile' } ]
**image**?🔹 | <code>string</code> | <span style="text-decoration: underline">*Default*</span>: default image
**nodeVersion**?🔹 | <code>string</code> | Adds a `actions/setup-node@v1` action with a specific node version.<br/><span style="text-decoration: underline">*Optional*</span>
**uploadArtifact**?🔹 | <code>boolean</code> | <span style="text-decoration: underline">*Optional*</span>



## struct NodeProjectOptions 🔹 <a id="projen-nodeprojectoptions"></a>






Name | Type | Description 
-----|------|-------------
**name**🔹 | <code>string</code> | This is the name of your package.
**antitamper**?🔹 | <code>boolean</code> | Checks that after build there are no modified files onn git.<br/><span style="text-decoration: underline">*Default*</span>: true
**authorEmail**?🔹 | <code>string</code> | Author's e-mail.<br/><span style="text-decoration: underline">*Optional*</span>
**authorName**?🔹 | <code>string</code> | Author's name.<br/><span style="text-decoration: underline">*Optional*</span>
**authorOrganization**?🔹 | <code>boolean</code> | Author's Organization.<br/><span style="text-decoration: underline">*Optional*</span>
**authorUrl**?🔹 | <code>string</code> | Author's URL / Website.<br/><span style="text-decoration: underline">*Optional*</span>
**autoDetectBin**?🔹 | <code>boolean</code> | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.<br/><span style="text-decoration: underline">*Default*</span>: true
**bin**?🔹 | <code>Map<string, string></code> | Binary programs vended with your module.<br/><span style="text-decoration: underline">*Optional*</span>
**buildWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/><span style="text-decoration: underline">*Default*</span>: true
**bundledDependencies**?🔹 | <code>Array<string></code> | <span style="text-decoration: underline">*Optional*</span>
**copyrightOwner**?🔹 | <code>string</code> | License copyright owner.<br/><span style="text-decoration: underline">*Default*</span>: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?🔹 | <code>string</code> | The copyright years to put in the LICENSE file.<br/><span style="text-decoration: underline">*Default*</span>: current year
**dependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | <span style="text-decoration: underline">*Optional*</span>
**description**?🔹 | <code>string</code> | The description is just a string that helps people understand the purpose of the package.<br/><span style="text-decoration: underline">*Optional*</span>
**devDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | <span style="text-decoration: underline">*Optional*</span>
**gitignore**?🔹 | <code>Array<string></code> | Additional entries to .gitignore.<br/><span style="text-decoration: underline">*Optional*</span>
**homepage**?🔹 | <code>string</code> | Package's Homepage / Website.<br/><span style="text-decoration: underline">*Optional*</span>
**keywords**?🔹 | <code>Array<string></code> | <span style="text-decoration: underline">*Optional*</span>
**license**?🔹 | <code>string</code> | License's SPDX identifier.<br/><span style="text-decoration: underline">*Optional*</span>
**maxNodeVersion**?🔹 | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/><span style="text-decoration: underline">*Default*</span>: no max
**minNodeVersion**?🔹 | <code>string</code> | Node.js version to require via package.json `engines` (inclusive).<br/><span style="text-decoration: underline">*Default*</span>: no "engines" specified
**npmDistTag**?🔹 | <code>string</code> | The dist-tag to use when releasing to npm.<br/><span style="text-decoration: underline">*Default*</span>: "latest"
**npmignore**?🔹 | <code>Array<string></code> | Additional entries to .npmignore.<br/><span style="text-decoration: underline">*Optional*</span>
**outdir**?🔹 | <code>string</code> | Where to put the generated project files.<br/><span style="text-decoration: underline">*Default*</span>: . current directory
**peerDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | <span style="text-decoration: underline">*Optional*</span>
**peerDependencyOptions**?🔹 | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | <span style="text-decoration: underline">*Optional*</span>
**projenDevDependency**?🔹 | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/><span style="text-decoration: underline">*Default*</span>: true
**projenVersion**?🔹 | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/><span style="text-decoration: underline">*Default*</span>: latest version
**releaseBranches**?🔹 | <code>Array<string></code> | Branches which trigger a release.<br/><span style="text-decoration: underline">*Default*</span>: [ "master" ]
**releaseToNpm**?🔹 | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/><span style="text-decoration: underline">*Default*</span>: true
**releaseWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for releasing from "master" when new versions are bumped.<br/><span style="text-decoration: underline">*Default*</span>: true
**repository**?🔹 | <code>string</code> | The repository is the location where the actual code for your package lives.<br/><span style="text-decoration: underline">*Optional*</span>
**repositoryDirectory**?🔹 | <code>string</code> | If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives.<br/><span style="text-decoration: underline">*Optional*</span>
**stability**?🔹 | <code>string</code> | Package's Stability.<br/><span style="text-decoration: underline">*Optional*</span>
**workflowBootstrapSteps**?🔹 | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/><span style="text-decoration: underline">*Default*</span>: [ { run: `npx projen${PROJEN_VERSION}` }, { run: 'yarn install --frozen-lockfile' } ]
**workflowContainerImage**?🔹 | <code>string</code> | Container image to use for GitHub workflows.<br/><span style="text-decoration: underline">*Default*</span>: default image
**workflowNodeVersion**?🔹 | <code>string</code> | The node version to use in GitHub workflows.<br/><span style="text-decoration: underline">*Default*</span>: same as `minNodeVersion`



## struct PeerDependencyOptions 🔹 <a id="projen-peerdependencyoptions"></a>






Name | Type | Description 
-----|------|-------------
**pinnedDevDependency**?🔹 | <code>boolean</code> | Automatically add a pinned dev dependency.<br/><span style="text-decoration: underline">*Default*</span>: true



## struct ProjectOptions 🔹 <a id="projen-projectoptions"></a>






Name | Type | Description 
-----|------|-------------
**outdir**?🔹 | <code>string</code> | Where to put the generated project files.<br/><span style="text-decoration: underline">*Default*</span>: . current directory



## struct TypeScriptCompilerOptions 🔹 <a id="projen-typescriptcompileroptions"></a>






Name | Type | Description 
-----|------|-------------
**alwaysStrict**?🔹 | <code>boolean</code> | Ensures that your files are parsed in the ECMAScript strict mode, and emit “use strict” for each source file.<br/><span style="text-decoration: underline">*Default*</span>: true
**declaration**?🔹 | <code>boolean</code> | To be specified along with the above.<br/><span style="text-decoration: underline">*Optional*</span>
**declarationDir**?🔹 | <code>string</code> | Offers a way to configure the root directory for where declaration files are emitted.<br/><span style="text-decoration: underline">*Optional*</span>
**experimentalDecorators**?🔹 | <code>boolean</code> | Enables experimental support for decorators, which is in stage 2 of the TC39 standardization process.<br/><span style="text-decoration: underline">*Default*</span>: true
**inlineSourceMap**?🔹 | <code>boolean</code> | When set, instead of writing out a .js.map file to provide source maps,  TypeScript will embed the source map content in the .js files.<br/><span style="text-decoration: underline">*Default*</span>: true
**inlineSources**?🔹 | <code>boolean</code> | When set, TypeScript will include the original content of the .ts file as an embedded  string in the source map. This is often useful in the same cases as inlineSourceMap.<br/><span style="text-decoration: underline">*Default*</span>: true
**lib**?🔹 | <code>Array<string></code> | Reference for type definitions / libraries to use (eg.<br/><span style="text-decoration: underline">*Default*</span>: [ 'es2018' ]
**module**?🔹 | <code>string</code> | Sets the module system for the program.<br/><span style="text-decoration: underline">*Default*</span>: 'CommonJS'
**noEmitOnError**?🔹 | <code>boolean</code> | Do not emit compiler output files like JavaScript source code, source-maps or declarations if any errors were reported.<br/><span style="text-decoration: underline">*Default*</span>: true
**noFallthroughCasesInSwitch**?🔹 | <code>boolean</code> | Report errors for fallthrough cases in switch statements.<br/><span style="text-decoration: underline">*Default*</span>: true
**noImplicitAny**?🔹 | <code>boolean</code> | In some cases where no type annotations are present, TypeScript will fall back to a type of any for a variable when it cannot infer the type.<br/><span style="text-decoration: underline">*Default*</span>: true
**noImplicitReturns**?🔹 | <code>boolean</code> | When enabled, TypeScript will check all code paths in a function to ensure they  return a value.<br/><span style="text-decoration: underline">*Default*</span>: true
**noImplicitThis**?🔹 | <code>boolean</code> | Raise error on ‘this’ expressions with an implied ‘any’ type.<br/><span style="text-decoration: underline">*Default*</span>: true
**noUnusedLocals**?🔹 | <code>boolean</code> | Report errors on unused local variables.<br/><span style="text-decoration: underline">*Default*</span>: true
**noUnusedParameters**?🔹 | <code>boolean</code> | Report errors on unused parameters in functions.<br/><span style="text-decoration: underline">*Default*</span>: true
**outDir**?🔹 | <code>string</code> | Output directory for the compiled files.<br/><span style="text-decoration: underline">*Optional*</span>
**resolveJsonModule**?🔹 | <code>boolean</code> | Allows importing modules with a ‘.json’ extension, which is a common practice  in node projects. This includes generating a type for the import based on the static JSON shape.<br/><span style="text-decoration: underline">*Default*</span>: true
**strict**?🔹 | <code>boolean</code> | The strict flag enables a wide range of type checking behavior that results in stronger guarantees  of program correctness.<br/><span style="text-decoration: underline">*Default*</span>: true
**strictNullChecks**?🔹 | <code>boolean</code> | When strictNullChecks is false, null and undefined are effectively ignored by the language.<br/><span style="text-decoration: underline">*Default*</span>: true
**strictPropertyInitialization**?🔹 | <code>boolean</code> | When set to true, TypeScript will raise an error when a class property was declared but  not set in the constructor.<br/><span style="text-decoration: underline">*Default*</span>: true
**stripInternal**?🔹 | <code>boolean</code> | Do not emit declarations for code that has an @internal annotation in it’s JSDoc comment.<br/><span style="text-decoration: underline">*Default*</span>: true
**target**?🔹 | <code>string</code> | Modern browsers support all ES6 features, so ES6 is a good choice.<br/><span style="text-decoration: underline">*Default*</span>: 'ES2018'



## struct TypeScriptLibraryProjectOptions 🔹 <a id="projen-typescriptlibraryprojectoptions"></a>






Name | Type | Description 
-----|------|-------------
**name**🔹 | <code>string</code> | This is the name of your package.
**antitamper**?🔹 | <code>boolean</code> | Checks that after build there are no modified files onn git.<br/><span style="text-decoration: underline">*Default*</span>: true
**authorEmail**?🔹 | <code>string</code> | Author's e-mail.<br/><span style="text-decoration: underline">*Optional*</span>
**authorName**?🔹 | <code>string</code> | Author's name.<br/><span style="text-decoration: underline">*Optional*</span>
**authorOrganization**?🔹 | <code>boolean</code> | Author's Organization.<br/><span style="text-decoration: underline">*Optional*</span>
**authorUrl**?🔹 | <code>string</code> | Author's URL / Website.<br/><span style="text-decoration: underline">*Optional*</span>
**autoDetectBin**?🔹 | <code>boolean</code> | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.<br/><span style="text-decoration: underline">*Default*</span>: true
**bin**?🔹 | <code>Map<string, string></code> | Binary programs vended with your module.<br/><span style="text-decoration: underline">*Optional*</span>
**buildWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/><span style="text-decoration: underline">*Default*</span>: true
**bundledDependencies**?🔹 | <code>Array<string></code> | <span style="text-decoration: underline">*Optional*</span>
**copyrightOwner**?🔹 | <code>string</code> | License copyright owner.<br/><span style="text-decoration: underline">*Default*</span>: defaults to the value of authorName or "" if `authorName` is undefined.
**copyrightPeriod**?🔹 | <code>string</code> | The copyright years to put in the LICENSE file.<br/><span style="text-decoration: underline">*Default*</span>: current year
**dependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | <span style="text-decoration: underline">*Optional*</span>
**description**?🔹 | <code>string</code> | The description is just a string that helps people understand the purpose of the package.<br/><span style="text-decoration: underline">*Optional*</span>
**devDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | <span style="text-decoration: underline">*Optional*</span>
**docgen**?🔹 | <code>boolean</code> | Docgen by Typedoc.<br/><span style="text-decoration: underline">*Default*</span>: false
**docsDirectory**?🔹 | <code>string</code> | Docs directory.<br/><span style="text-decoration: underline">*Default*</span>: 'docs'
**eslint**?🔹 | <code>boolean</code> | Setup eslint.<br/><span style="text-decoration: underline">*Default*</span>: true
**gitignore**?🔹 | <code>Array<string></code> | Additional entries to .gitignore.<br/><span style="text-decoration: underline">*Optional*</span>
**homepage**?🔹 | <code>string</code> | Package's Homepage / Website.<br/><span style="text-decoration: underline">*Optional*</span>
**jest**?🔹 | <code>boolean</code> | Setup jest unit tests.<br/><span style="text-decoration: underline">*Default*</span>: true
**jestOptions**?🔹 | <code>[JestOptions](#projen-jestoptions)</code> | Jest options.<br/><span style="text-decoration: underline">*Default*</span>: default options
**keywords**?🔹 | <code>Array<string></code> | <span style="text-decoration: underline">*Optional*</span>
**license**?🔹 | <code>string</code> | License's SPDX identifier.<br/><span style="text-decoration: underline">*Optional*</span>
**maxNodeVersion**?🔹 | <code>string</code> | Minimum node.js version to require via `engines` (inclusive).<br/><span style="text-decoration: underline">*Default*</span>: no max
**mergify**?🔹 | <code>boolean</code> | Adds mergify configuration.<br/><span style="text-decoration: underline">*Default*</span>: true
**mergifyOptions**?🔹 | <code>[MergifyOptions](#projen-mergifyoptions)</code> | Options for mergify.<br/><span style="text-decoration: underline">*Default*</span>: default options
**minNodeVersion**?🔹 | <code>string</code> | Node.js version to require via package.json `engines` (inclusive).<br/><span style="text-decoration: underline">*Default*</span>: no "engines" specified
**npmDistTag**?🔹 | <code>string</code> | The dist-tag to use when releasing to npm.<br/><span style="text-decoration: underline">*Default*</span>: "latest"
**npmignore**?🔹 | <code>Array<string></code> | Additional entries to .npmignore.<br/><span style="text-decoration: underline">*Optional*</span>
**outdir**?🔹 | <code>string</code> | Where to put the generated project files.<br/><span style="text-decoration: underline">*Default*</span>: . current directory
**peerDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | <span style="text-decoration: underline">*Optional*</span>
**peerDependencyOptions**?🔹 | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | <span style="text-decoration: underline">*Optional*</span>
**projenDevDependency**?🔹 | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/><span style="text-decoration: underline">*Default*</span>: true
**projenVersion**?🔹 | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/><span style="text-decoration: underline">*Default*</span>: latest version
**releaseBranches**?🔹 | <code>Array<string></code> | Branches which trigger a release.<br/><span style="text-decoration: underline">*Default*</span>: [ "master" ]
**releaseToNpm**?🔹 | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/><span style="text-decoration: underline">*Default*</span>: true
**releaseWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for releasing from "master" when new versions are bumped.<br/><span style="text-decoration: underline">*Default*</span>: true
**repository**?🔹 | <code>string</code> | The repository is the location where the actual code for your package lives.<br/><span style="text-decoration: underline">*Optional*</span>
**repositoryDirectory**?🔹 | <code>string</code> | If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives.<br/><span style="text-decoration: underline">*Optional*</span>
**stability**?🔹 | <code>string</code> | Package's Stability.<br/><span style="text-decoration: underline">*Optional*</span>
**tsconfig**?🔹 | <code>[TypescriptConfigOptions](#projen-typescriptconfigoptions)</code> | Custom TSConfig.<br/><span style="text-decoration: underline">*Optional*</span>
**typescriptVersion**?🔹 | <code>[Semver](#projen-semver)</code> | TypeScript version to use.<br/><span style="text-decoration: underline">*Default*</span>: ^3.9.5
**workflowBootstrapSteps**?🔹 | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/><span style="text-decoration: underline">*Default*</span>: [ { run: `npx projen${PROJEN_VERSION}` }, { run: 'yarn install --frozen-lockfile' } ]
**workflowContainerImage**?🔹 | <code>string</code> | Container image to use for GitHub workflows.<br/><span style="text-decoration: underline">*Default*</span>: default image
**workflowNodeVersion**?🔹 | <code>string</code> | The node version to use in GitHub workflows.<br/><span style="text-decoration: underline">*Default*</span>: same as `minNodeVersion`



## struct TypescriptConfigOptions 🔹 <a id="projen-typescriptconfigoptions"></a>






Name | Type | Description 
-----|------|-------------
**compilerOptions**🔹 | <code>[TypeScriptCompilerOptions](#projen-typescriptcompileroptions)</code> | Compiler options to use.
**exclude**?🔹 | <code>Array<string></code> | <span style="text-decoration: underline">*Default*</span>: node_modules is excluded by default
**fileName**?🔹 | <code>string</code> | <span style="text-decoration: underline">*Default*</span>: "tsconfig.json"
**include**?🔹 | <code>Array<string></code> | The directory in which typescript sources reside.<br/><span style="text-decoration: underline">*Default*</span>: all .ts files recursively



## enum Stability 🔹 <a id="projen-stability"></a>



Name | Description
-----|-----
**EXPERIMENTAL** 🔹|
**STABLE** 🔹|
**DEPRECATED** 🔹|


