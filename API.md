# API Reference

**Classes**

Name|Description
----|-----------
[Eslint](#projen-eslint)|*No description*
[FileBase](#projen-filebase)|*No description*
[GithubWorkflow](#projen-githubworkflow)|*No description*
[IgnoreFile](#projen-ignorefile)|*No description*
[Jest](#projen-jest)|*No description*
[JsiiProject](#projen-jsiiproject)|*No description*
[JsonFile](#projen-jsonfile)|*No description*
[License](#projen-license)|*No description*
[NodeBuildWorkflow](#projen-nodebuildworkflow)|*No description*
[NodeProject](#projen-nodeproject)|*No description*
[Project](#projen-project)|*No description*
[Semver](#projen-semver)|*No description*
[TypeScriptLibraryProject](#projen-typescriptlibraryproject)|*No description*
[Version](#projen-version)|*No description*


**Structs**

Name|Description
----|-----------
[CommonOptions](#projen-commonoptions)|*No description*
[FileBaseOptions](#projen-filebaseoptions)|*No description*
[JsiiDotNetTarget](#projen-jsiidotnettarget)|*No description*
[JsiiJavaTarget](#projen-jsiijavatarget)|*No description*
[JsiiProjectOptions](#projen-jsiiprojectoptions)|*No description*
[JsiiPythonTarget](#projen-jsiipythontarget)|*No description*
[JsonFileOptions](#projen-jsonfileoptions)|*No description*
[NodeBuildWorkflowOptions](#projen-nodebuildworkflowoptions)|*No description*
[NodeProjectOptions](#projen-nodeprojectoptions)|*No description*
[PeerDependencyOptions](#projen-peerdependencyoptions)|*No description*
[ProjectOptions](#projen-projectoptions)|*No description*
[TypeScriptLibraryProjectOptions](#projen-typescriptlibraryprojectoptions)|*No description*


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
new Eslint(project: NodeProject)
```

<span style="text-decoration: underline">Parameters:</span>
* **project** (<code>[NodeProject](#projen-nodeproject)</code>)  *No description*




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
  * **committed** (<code>boolean</code>)  Indicates whether this file should be committed to git or ignored. <span style="text-decoration: underline">*Default*</span>: false
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



<span style="text-decoration: underline">Implements</span>: [IConstruct](#constructs-iconstruct)
<span style="text-decoration: underline">Extends</span>: [Construct](#constructs-construct)

### Initializer




<span style="text-decoration: underline">Usage:</span>

```ts
new Jest(project: NodeProject)
```

<span style="text-decoration: underline">Parameters:</span>
* **project** (<code>[NodeProject](#projen-nodeproject)</code>)  *No description*




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
  * **bin** (<code>Map<string, string></code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. <span style="text-decoration: underline">*Default*</span>: true
  * **bundledDependencies** (<code>Array<string></code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **commitPackageJson** (<code>boolean</code>)  Should we commit `package.json` to git or ignore? <span style="text-decoration: underline">*Default*</span>: false By default `package.json` is *not* committed. This means that after you check out a repository you must run `npx projen` to bootstrap it.
  * **dependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **devDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **keywords** (<code>Array<string></code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **peerDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. <span style="text-decoration: underline">*Default*</span>: true
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. <span style="text-decoration: underline">*Default*</span>: latest version
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. <span style="text-decoration: underline">*Default*</span>: true
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "master" when new versions are bumped. <span style="text-decoration: underline">*Default*</span>: true
  * **workflowBootstrapSteps** (<code>Array<any></code>)  Workflow steps to use in order to bootstrap this repo. <span style="text-decoration: underline">*Default*</span>: [ { run: `npx projen${PROJEN_VERSION}` }, { run: 'yarn install --frozen-lockfile' } ]
  * **workflowContainerImage** (<code>string</code>)  Container image to use for GitHub workflows. <span style="text-decoration: underline">*Default*</span>: default image
  * **authorEmail** (<code>string</code>)  *No description* 
  * **authorName** (<code>string</code>)  *No description* 
  * **jsiiVersion** (<code>[Semver](#projen-semver)</code>)  *No description* 
  * **name** (<code>string</code>)  *No description* 
  * **repository** (<code>string</code>)  *No description* 
  * **description** (<code>string</code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **docgen** (<code>boolean</code>)  Automatically generate API.md from jsii. <span style="text-decoration: underline">*Default*</span>: true
  * **dotnet** (<code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **eslint** (<code>boolean</code>)  Install eslint. <span style="text-decoration: underline">*Default*</span>: true
  * **java** (<code>[JsiiJavaTarget](#projen-jsiijavatarget)</code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **jest** (<code>boolean</code>)  Use jest for unit tests. <span style="text-decoration: underline">*Default*</span>: true
  * **license** (<code>string</code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **mergify** (<code>boolean</code>)  Add mergify configuration. <span style="text-decoration: underline">*Default*</span>: true
  * **python** (<code>[JsiiPythonTarget](#projen-jsiipythontarget)</code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **rootdir** (<code>string</code>)  *No description* <span style="text-decoration: underline">*Default*</span>: "."
  * **stability** (<code>string</code>)  *No description* <span style="text-decoration: underline">*Optional*</span>


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
  * **committed** (<code>boolean</code>)  Indicates whether this file should be committed to git or ignored. <span style="text-decoration: underline">*Default*</span>: false
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
new License(project: Project, spdx: string)
```

<span style="text-decoration: underline">Parameters:</span>
* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **spdx** (<code>string</code>)  *No description*



### Properties


Name | Type | Description 
-----|------|-------------
**data**🔹 | <code>string</code> | <span></span>



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
  * **outdir** (<code>string</code>)  *No description* <span style="text-decoration: underline">*Default*</span>: . current directory
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files onn git. <span style="text-decoration: underline">*Default*</span>: true
  * **bin** (<code>Map<string, string></code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. <span style="text-decoration: underline">*Default*</span>: true
  * **bundledDependencies** (<code>Array<string></code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **commitPackageJson** (<code>boolean</code>)  Should we commit `package.json` to git or ignore? <span style="text-decoration: underline">*Default*</span>: false By default `package.json` is *not* committed. This means that after you check out a repository you must run `npx projen` to bootstrap it.
  * **dependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **devDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **keywords** (<code>Array<string></code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **peerDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. <span style="text-decoration: underline">*Default*</span>: true
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. <span style="text-decoration: underline">*Default*</span>: latest version
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. <span style="text-decoration: underline">*Default*</span>: true
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "master" when new versions are bumped. <span style="text-decoration: underline">*Default*</span>: true
  * **workflowBootstrapSteps** (<code>Array<any></code>)  Workflow steps to use in order to bootstrap this repo. <span style="text-decoration: underline">*Default*</span>: [ { run: `npx projen${PROJEN_VERSION}` }, { run: 'yarn install --frozen-lockfile' } ]
  * **workflowContainerImage** (<code>string</code>)  Container image to use for GitHub workflows. <span style="text-decoration: underline">*Default*</span>: default image
  * **name** (<code>string</code>)  *No description* 
  * **authorEmail** (<code>string</code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **authorName** (<code>string</code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **authorUrl** (<code>string</code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **description** (<code>string</code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **gitignore** (<code>Array<string></code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **homepage** (<code>string</code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **license** (<code>string</code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **npmignore** (<code>Array<string></code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **repository** (<code>string</code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **repositoryDirectory** (<code>string</code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **stability** (<code>string</code>)  *No description* <span style="text-decoration: underline">*Optional*</span>



### Properties


Name | Type | Description 
-----|------|-------------
**npmignore**🔹 | <code>[IgnoreFile](#projen-ignorefile)</code> | <span></span>
**version**🔹 | <code>any</code> | Returns the current version of the project.
**buildWorkflow**?🔹 | <code>[NodeBuildWorkflow](#projen-nodebuildworkflow)</code> | The PR build GitHub workflow.<br/><span style="text-decoration: underline">*Optional*</span>
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
  * **outdir** (<code>string</code>)  *No description* <span style="text-decoration: underline">*Default*</span>: . current directory



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
  * **outdir** (<code>string</code>)  *No description* <span style="text-decoration: underline">*Default*</span>: . current directory
  * **antitamper** (<code>boolean</code>)  Checks that after build there are no modified files onn git. <span style="text-decoration: underline">*Default*</span>: true
  * **bin** (<code>Map<string, string></code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. <span style="text-decoration: underline">*Default*</span>: true
  * **bundledDependencies** (<code>Array<string></code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **commitPackageJson** (<code>boolean</code>)  Should we commit `package.json` to git or ignore? <span style="text-decoration: underline">*Default*</span>: false By default `package.json` is *not* committed. This means that after you check out a repository you must run `npx projen` to bootstrap it.
  * **dependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **devDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **keywords** (<code>Array<string></code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **peerDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. <span style="text-decoration: underline">*Default*</span>: true
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. <span style="text-decoration: underline">*Default*</span>: latest version
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. <span style="text-decoration: underline">*Default*</span>: true
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "master" when new versions are bumped. <span style="text-decoration: underline">*Default*</span>: true
  * **workflowBootstrapSteps** (<code>Array<any></code>)  Workflow steps to use in order to bootstrap this repo. <span style="text-decoration: underline">*Default*</span>: [ { run: `npx projen${PROJEN_VERSION}` }, { run: 'yarn install --frozen-lockfile' } ]
  * **workflowContainerImage** (<code>string</code>)  Container image to use for GitHub workflows. <span style="text-decoration: underline">*Default*</span>: default image
  * **name** (<code>string</code>)  *No description* 
  * **authorEmail** (<code>string</code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **authorName** (<code>string</code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **authorUrl** (<code>string</code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **description** (<code>string</code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **gitignore** (<code>Array<string></code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **homepage** (<code>string</code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **license** (<code>string</code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **npmignore** (<code>Array<string></code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **repository** (<code>string</code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **repositoryDirectory** (<code>string</code>)  *No description* <span style="text-decoration: underline">*Optional*</span>
  * **stability** (<code>string</code>)  *No description* <span style="text-decoration: underline">*Optional*</span>




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
**bin**?🔹 | <code>Map<string, string></code> | <span style="text-decoration: underline">*Optional*</span>
**buildWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/><span style="text-decoration: underline">*Default*</span>: true
**bundledDependencies**?🔹 | <code>Array<string></code> | <span style="text-decoration: underline">*Optional*</span>
**commitPackageJson**?🔹 | <code>boolean</code> | Should we commit `package.json` to git or ignore?<br/><span style="text-decoration: underline">*Default*</span>: false By default `package.json` is *not* committed. This means that after you check out a repository you must run `npx projen` to bootstrap it.
**dependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | <span style="text-decoration: underline">*Optional*</span>
**devDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | <span style="text-decoration: underline">*Optional*</span>
**keywords**?🔹 | <code>Array<string></code> | <span style="text-decoration: underline">*Optional*</span>
**peerDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | <span style="text-decoration: underline">*Optional*</span>
**peerDependencyOptions**?🔹 | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | <span style="text-decoration: underline">*Optional*</span>
**projenDevDependency**?🔹 | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/><span style="text-decoration: underline">*Default*</span>: true
**projenVersion**?🔹 | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/><span style="text-decoration: underline">*Default*</span>: latest version
**releaseToNpm**?🔹 | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/><span style="text-decoration: underline">*Default*</span>: true
**releaseWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for releasing from "master" when new versions are bumped.<br/><span style="text-decoration: underline">*Default*</span>: true
**workflowBootstrapSteps**?🔹 | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/><span style="text-decoration: underline">*Default*</span>: [ { run: `npx projen${PROJEN_VERSION}` }, { run: 'yarn install --frozen-lockfile' } ]
**workflowContainerImage**?🔹 | <code>string</code> | Container image to use for GitHub workflows.<br/><span style="text-decoration: underline">*Default*</span>: default image



## struct FileBaseOptions 🔹 <a id="projen-filebaseoptions"></a>






Name | Type | Description 
-----|------|-------------
**committed**?🔹 | <code>boolean</code> | Indicates whether this file should be committed to git or ignored.<br/><span style="text-decoration: underline">*Default*</span>: false
**editGitignore**?🔹 | <code>boolean</code> | Update the project's .gitignore file.<br/><span style="text-decoration: underline">*Default*</span>: true



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
**authorEmail**🔹 | <code>string</code> | <span></span>
**authorName**🔹 | <code>string</code> | <span></span>
**jsiiVersion**🔹 | <code>[Semver](#projen-semver)</code> | <span></span>
**name**🔹 | <code>string</code> | <span></span>
**repository**🔹 | <code>string</code> | <span></span>
**antitamper**?🔹 | <code>boolean</code> | Checks that after build there are no modified files onn git.<br/><span style="text-decoration: underline">*Default*</span>: true
**bin**?🔹 | <code>Map<string, string></code> | <span style="text-decoration: underline">*Optional*</span>
**buildWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/><span style="text-decoration: underline">*Default*</span>: true
**bundledDependencies**?🔹 | <code>Array<string></code> | <span style="text-decoration: underline">*Optional*</span>
**commitPackageJson**?🔹 | <code>boolean</code> | Should we commit `package.json` to git or ignore?<br/><span style="text-decoration: underline">*Default*</span>: false By default `package.json` is *not* committed. This means that after you check out a repository you must run `npx projen` to bootstrap it.
**dependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | <span style="text-decoration: underline">*Optional*</span>
**description**?🔹 | <code>string</code> | <span style="text-decoration: underline">*Optional*</span>
**devDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | <span style="text-decoration: underline">*Optional*</span>
**docgen**?🔹 | <code>boolean</code> | Automatically generate API.md from jsii.<br/><span style="text-decoration: underline">*Default*</span>: true
**dotnet**?🔹 | <code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code> | <span style="text-decoration: underline">*Optional*</span>
**eslint**?🔹 | <code>boolean</code> | Install eslint.<br/><span style="text-decoration: underline">*Default*</span>: true
**java**?🔹 | <code>[JsiiJavaTarget](#projen-jsiijavatarget)</code> | <span style="text-decoration: underline">*Optional*</span>
**jest**?🔹 | <code>boolean</code> | Use jest for unit tests.<br/><span style="text-decoration: underline">*Default*</span>: true
**keywords**?🔹 | <code>Array<string></code> | <span style="text-decoration: underline">*Optional*</span>
**license**?🔹 | <code>string</code> | <span style="text-decoration: underline">*Optional*</span>
**mergify**?🔹 | <code>boolean</code> | Add mergify configuration.<br/><span style="text-decoration: underline">*Default*</span>: true
**peerDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | <span style="text-decoration: underline">*Optional*</span>
**peerDependencyOptions**?🔹 | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | <span style="text-decoration: underline">*Optional*</span>
**projenDevDependency**?🔹 | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/><span style="text-decoration: underline">*Default*</span>: true
**projenVersion**?🔹 | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/><span style="text-decoration: underline">*Default*</span>: latest version
**python**?🔹 | <code>[JsiiPythonTarget](#projen-jsiipythontarget)</code> | <span style="text-decoration: underline">*Optional*</span>
**releaseToNpm**?🔹 | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/><span style="text-decoration: underline">*Default*</span>: true
**releaseWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for releasing from "master" when new versions are bumped.<br/><span style="text-decoration: underline">*Default*</span>: true
**rootdir**?🔹 | <code>string</code> | <span style="text-decoration: underline">*Default*</span>: "."
**stability**?🔹 | <code>string</code> | <span style="text-decoration: underline">*Optional*</span>
**workflowBootstrapSteps**?🔹 | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/><span style="text-decoration: underline">*Default*</span>: [ { run: `npx projen${PROJEN_VERSION}` }, { run: 'yarn install --frozen-lockfile' } ]
**workflowContainerImage**?🔹 | <code>string</code> | Container image to use for GitHub workflows.<br/><span style="text-decoration: underline">*Default*</span>: default image



## struct JsiiPythonTarget 🔹 <a id="projen-jsiipythontarget"></a>






Name | Type | Description 
-----|------|-------------
**distName**🔹 | <code>string</code> | <span></span>
**module**🔹 | <code>string</code> | <span></span>



## struct JsonFileOptions 🔹 <a id="projen-jsonfileoptions"></a>






Name | Type | Description 
-----|------|-------------
**obj**🔹 | <code>any</code> | <span></span>
**committed**?🔹 | <code>boolean</code> | Indicates whether this file should be committed to git or ignored.<br/><span style="text-decoration: underline">*Default*</span>: false
**editGitignore**?🔹 | <code>boolean</code> | Update the project's .gitignore file.<br/><span style="text-decoration: underline">*Default*</span>: true



## struct NodeBuildWorkflowOptions 🔹 <a id="projen-nodebuildworkflowoptions"></a>






Name | Type | Description 
-----|------|-------------
**trigger**🔹 | <code>Map<string, any></code> | <span></span>
**antitamper**?🔹 | <code>boolean</code> | Checks that after build there are no modified files onn git.<br/><span style="text-decoration: underline">*Default*</span>: true
**bootstrapSteps**?🔹 | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/><span style="text-decoration: underline">*Default*</span>: [ { run: `npx projen${PROJEN_VERSION}` }, { run: 'yarn install --frozen-lockfile' } ]
**image**?🔹 | <code>string</code> | <span style="text-decoration: underline">*Default*</span>: default image
**uploadArtifact**?🔹 | <code>boolean</code> | <span style="text-decoration: underline">*Optional*</span>



## struct NodeProjectOptions 🔹 <a id="projen-nodeprojectoptions"></a>






Name | Type | Description 
-----|------|-------------
**name**🔹 | <code>string</code> | <span></span>
**antitamper**?🔹 | <code>boolean</code> | Checks that after build there are no modified files onn git.<br/><span style="text-decoration: underline">*Default*</span>: true
**authorEmail**?🔹 | <code>string</code> | <span style="text-decoration: underline">*Optional*</span>
**authorName**?🔹 | <code>string</code> | <span style="text-decoration: underline">*Optional*</span>
**authorUrl**?🔹 | <code>string</code> | <span style="text-decoration: underline">*Optional*</span>
**bin**?🔹 | <code>Map<string, string></code> | <span style="text-decoration: underline">*Optional*</span>
**buildWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/><span style="text-decoration: underline">*Default*</span>: true
**bundledDependencies**?🔹 | <code>Array<string></code> | <span style="text-decoration: underline">*Optional*</span>
**commitPackageJson**?🔹 | <code>boolean</code> | Should we commit `package.json` to git or ignore?<br/><span style="text-decoration: underline">*Default*</span>: false By default `package.json` is *not* committed. This means that after you check out a repository you must run `npx projen` to bootstrap it.
**dependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | <span style="text-decoration: underline">*Optional*</span>
**description**?🔹 | <code>string</code> | <span style="text-decoration: underline">*Optional*</span>
**devDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | <span style="text-decoration: underline">*Optional*</span>
**gitignore**?🔹 | <code>Array<string></code> | <span style="text-decoration: underline">*Optional*</span>
**homepage**?🔹 | <code>string</code> | <span style="text-decoration: underline">*Optional*</span>
**keywords**?🔹 | <code>Array<string></code> | <span style="text-decoration: underline">*Optional*</span>
**license**?🔹 | <code>string</code> | <span style="text-decoration: underline">*Optional*</span>
**npmignore**?🔹 | <code>Array<string></code> | <span style="text-decoration: underline">*Optional*</span>
**outdir**?🔹 | <code>string</code> | <span style="text-decoration: underline">*Default*</span>: . current directory
**peerDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | <span style="text-decoration: underline">*Optional*</span>
**peerDependencyOptions**?🔹 | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | <span style="text-decoration: underline">*Optional*</span>
**projenDevDependency**?🔹 | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/><span style="text-decoration: underline">*Default*</span>: true
**projenVersion**?🔹 | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/><span style="text-decoration: underline">*Default*</span>: latest version
**releaseToNpm**?🔹 | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/><span style="text-decoration: underline">*Default*</span>: true
**releaseWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for releasing from "master" when new versions are bumped.<br/><span style="text-decoration: underline">*Default*</span>: true
**repository**?🔹 | <code>string</code> | <span style="text-decoration: underline">*Optional*</span>
**repositoryDirectory**?🔹 | <code>string</code> | <span style="text-decoration: underline">*Optional*</span>
**stability**?🔹 | <code>string</code> | <span style="text-decoration: underline">*Optional*</span>
**workflowBootstrapSteps**?🔹 | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/><span style="text-decoration: underline">*Default*</span>: [ { run: `npx projen${PROJEN_VERSION}` }, { run: 'yarn install --frozen-lockfile' } ]
**workflowContainerImage**?🔹 | <code>string</code> | Container image to use for GitHub workflows.<br/><span style="text-decoration: underline">*Default*</span>: default image



## struct PeerDependencyOptions 🔹 <a id="projen-peerdependencyoptions"></a>






Name | Type | Description 
-----|------|-------------
**pinnedDevDependency**?🔹 | <code>boolean</code> | Automatically add a pinned dev dependency.<br/><span style="text-decoration: underline">*Default*</span>: true



## struct ProjectOptions 🔹 <a id="projen-projectoptions"></a>






Name | Type | Description 
-----|------|-------------
**outdir**?🔹 | <code>string</code> | <span style="text-decoration: underline">*Default*</span>: . current directory



## struct TypeScriptLibraryProjectOptions 🔹 <a id="projen-typescriptlibraryprojectoptions"></a>






Name | Type | Description 
-----|------|-------------
**name**🔹 | <code>string</code> | <span></span>
**antitamper**?🔹 | <code>boolean</code> | Checks that after build there are no modified files onn git.<br/><span style="text-decoration: underline">*Default*</span>: true
**authorEmail**?🔹 | <code>string</code> | <span style="text-decoration: underline">*Optional*</span>
**authorName**?🔹 | <code>string</code> | <span style="text-decoration: underline">*Optional*</span>
**authorUrl**?🔹 | <code>string</code> | <span style="text-decoration: underline">*Optional*</span>
**bin**?🔹 | <code>Map<string, string></code> | <span style="text-decoration: underline">*Optional*</span>
**buildWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/><span style="text-decoration: underline">*Default*</span>: true
**bundledDependencies**?🔹 | <code>Array<string></code> | <span style="text-decoration: underline">*Optional*</span>
**commitPackageJson**?🔹 | <code>boolean</code> | Should we commit `package.json` to git or ignore?<br/><span style="text-decoration: underline">*Default*</span>: false By default `package.json` is *not* committed. This means that after you check out a repository you must run `npx projen` to bootstrap it.
**dependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | <span style="text-decoration: underline">*Optional*</span>
**description**?🔹 | <code>string</code> | <span style="text-decoration: underline">*Optional*</span>
**devDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | <span style="text-decoration: underline">*Optional*</span>
**gitignore**?🔹 | <code>Array<string></code> | <span style="text-decoration: underline">*Optional*</span>
**homepage**?🔹 | <code>string</code> | <span style="text-decoration: underline">*Optional*</span>
**keywords**?🔹 | <code>Array<string></code> | <span style="text-decoration: underline">*Optional*</span>
**license**?🔹 | <code>string</code> | <span style="text-decoration: underline">*Optional*</span>
**npmignore**?🔹 | <code>Array<string></code> | <span style="text-decoration: underline">*Optional*</span>
**outdir**?🔹 | <code>string</code> | <span style="text-decoration: underline">*Default*</span>: . current directory
**peerDependencies**?🔹 | <code>Map<string, [Semver](#projen-semver)></code> | <span style="text-decoration: underline">*Optional*</span>
**peerDependencyOptions**?🔹 | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | <span style="text-decoration: underline">*Optional*</span>
**projenDevDependency**?🔹 | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/><span style="text-decoration: underline">*Default*</span>: true
**projenVersion**?🔹 | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/><span style="text-decoration: underline">*Default*</span>: latest version
**releaseToNpm**?🔹 | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/><span style="text-decoration: underline">*Default*</span>: true
**releaseWorkflow**?🔹 | <code>boolean</code> | Define a GitHub workflow for releasing from "master" when new versions are bumped.<br/><span style="text-decoration: underline">*Default*</span>: true
**repository**?🔹 | <code>string</code> | <span style="text-decoration: underline">*Optional*</span>
**repositoryDirectory**?🔹 | <code>string</code> | <span style="text-decoration: underline">*Optional*</span>
**stability**?🔹 | <code>string</code> | <span style="text-decoration: underline">*Optional*</span>
**workflowBootstrapSteps**?🔹 | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/><span style="text-decoration: underline">*Default*</span>: [ { run: `npx projen${PROJEN_VERSION}` }, { run: 'yarn install --frozen-lockfile' } ]
**workflowContainerImage**?🔹 | <code>string</code> | Container image to use for GitHub workflows.<br/><span style="text-decoration: underline">*Default*</span>: default image



## enum Stability 🔹 <a id="projen-stability"></a>



Name | Description
-----|-----
**EXPERIMENTAL** 🔹|
**STABLE** 🔹|
**DEPRECATED** 🔹|


