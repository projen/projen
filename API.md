# API Reference
**Classes**
Name|Description
----|-----------
[Eslint](#projen-eslint)|
[FileBase](#projen-filebase)|
[GithubWorkflow](#projen-githubworkflow)|
[IgnoreFile](#projen-ignorefile)|
[Jest](#projen-jest)|
[JsiiProject](#projen-jsiiproject)|
[JsonFile](#projen-jsonfile)|
[License](#projen-license)|
[NodeBuildWorkflow](#projen-nodebuildworkflow)|
[NodeProject](#projen-nodeproject)|
[Project](#projen-project)|
[Semver](#projen-semver)|
[TypeScriptLibraryProject](#projen-typescriptlibraryproject)|
[Version](#projen-version)|
**Structs**
Name|Description
----|-----------
[CommonOptions](#projen-commonoptions)|
[FileBaseOptions](#projen-filebaseoptions)|
[JsiiDotNetTarget](#projen-jsiidotnettarget)|
[JsiiJavaTarget](#projen-jsiijavatarget)|
[JsiiProjectOptions](#projen-jsiiprojectoptions)|
[JsiiPythonTarget](#projen-jsiipythontarget)|
[JsonFileOptions](#projen-jsonfileoptions)|
[NodeBuildWorkflowOptions](#projen-nodebuildworkflowoptions)|
[NodeProjectOptions](#projen-nodeprojectoptions)|
[PeerDependencyOptions](#projen-peerdependencyoptions)|
[ProjectOptions](#projen-projectoptions)|
[TypeScriptLibraryProjectOptions](#projen-typescriptlibraryprojectoptions)|
**Enums**
Name|Description
----|-----------
[Stability](#projen-stability)|


## class Eslint <span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-eslint"></a>



**Implements**: [IConstruct](#constructs-iconstruct)
**Extends**: [Construct](#constructs-construct)

### Initializer




```
new Eslint(project: NodeProject)
```

* **project** (<code>[NodeProject](#projen-nodeproject)</code>)  *No description*


### Methods


Name | Description
-----|-----
[**toString()**](#projen-eslint-tostring)<span title="This API element is experimental. It may change without notice.">🔹</span> | Returns a string representation of this construct.


---
#### toString()<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-eslint-tostring"></a>

Returns a string representation of this construct.
```
public toString(): string
```


*Returns*
* <code>string</code>



## class FileBase <span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-filebase"></a>



**Implements**: [IConstruct](#constructs-iconstruct)
**Extends**: [Construct](#constructs-construct)
**Implemented by**: [GithubWorkflow](#projen-githubworkflow), [IgnoreFile](#projen-ignorefile), [JsonFile](#projen-jsonfile), [License](#projen-license), [NodeBuildWorkflow](#projen-nodebuildworkflow)

### Initializer




```
new FileBase(project: Project, filePath: string, options?: FileBaseOptions)
```

* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **filePath** (<code>string</code>)  *No description*
* **options** (<code>[FileBaseOptions](#projen-filebaseoptions)</code>)  *No description*
  * **committed** (<code>boolean</code>)  Indicates whether this file should be committed to git or ignored. *Default*: false
  * **editGitignore** (<code>boolean</code>)  Update the project's .gitignore file. *Default*: true



### Properties


Name | Type | Description 
-----|------|-------------
**data**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <span></span>
**path**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <span></span>

### Methods


Name | Description
-----|-----
[**onSynthesize()**](#projen-filebase-onsynthesize)<span title="This API element is experimental. It may change without notice.">🔹</span> | Allows this construct to emit artifacts into the cloud assembly during synthesis.
[**toString()**](#projen-filebase-tostring)<span title="This API element is experimental. It may change without notice.">🔹</span> | Returns a string representation of this construct.


---
#### onSynthesize(session)<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-filebase-onsynthesize"></a>

Allows this construct to emit artifacts into the cloud assembly during synthesis.

This method is usually implemented by framework-level constructs such as `Stack` and `Asset`
as they participate in synthesizing the cloud assembly.
```
public onSynthesize(session: ISynthesisSession): void
```

* **session** (<code>[ISynthesisSession](#constructs-isynthesissession)</code>)  *No description*





---
#### toString()<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-filebase-tostring"></a>

Returns a string representation of this construct.
```
public toString(): string
```


*Returns*
* <code>string</code>



## class GithubWorkflow <span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-githubworkflow"></a>



**Implements**: [IConstruct](#constructs-iconstruct)
**Extends**: [FileBase](#projen-filebase)

### Initializer




```
new GithubWorkflow(project: Project, name: string)
```

* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **name** (<code>string</code>)  *No description*



### Properties


Name | Type | Description 
-----|------|-------------
**data**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <span></span>
**path**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <span></span>

### Methods


Name | Description
-----|-----
[**addJobs()**](#projen-githubworkflow-addjobs)<span title="This API element is experimental. It may change without notice.">🔹</span> | <span></span>
[**on()**](#projen-githubworkflow-on)<span title="This API element is experimental. It may change without notice.">🔹</span> | <span></span>
[**onSynthesize()**](#projen-githubworkflow-onsynthesize)<span title="This API element is experimental. It may change without notice.">🔹</span> | Allows this construct to emit artifacts into the cloud assembly during synthesis.
[**toString()**](#projen-githubworkflow-tostring)<span title="This API element is experimental. It may change without notice.">🔹</span> | Returns a string representation of this construct.


---
#### addJobs(jobs)<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-githubworkflow-addjobs"></a>


```
public addJobs(jobs: Map<string, any>): void
```

* **jobs** (<code>Map<string, any></code>)  *No description*





---
#### on(events)<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-githubworkflow-on"></a>


```
public on(events: Map<string, any>): void
```

* **events** (<code>Map<string, any></code>)  *No description*





---
#### onSynthesize(session)<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-githubworkflow-onsynthesize"></a>

Allows this construct to emit artifacts into the cloud assembly during synthesis.

This method is usually implemented by framework-level constructs such as `Stack` and `Asset`
as they participate in synthesizing the cloud assembly.
```
public onSynthesize(session: ISynthesisSession): void
```

* **session** (<code>[ISynthesisSession](#constructs-isynthesissession)</code>)  *No description*





---
#### toString()<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-githubworkflow-tostring"></a>

Returns a string representation of this construct.
```
public toString(): string
```


*Returns*
* <code>string</code>



## class IgnoreFile <span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-ignorefile"></a>



**Implements**: [IConstruct](#constructs-iconstruct)
**Extends**: [FileBase](#projen-filebase)

### Initializer




```
new IgnoreFile(project: Project, filePath: string)
```

* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **filePath** (<code>string</code>)  *No description*



### Properties


Name | Type | Description 
-----|------|-------------
**data**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <span></span>
**path**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <span></span>

### Methods


Name | Description
-----|-----
[**comment()**](#projen-ignorefile-comment)<span title="This API element is experimental. It may change without notice.">🔹</span> | appends a comment that will be included before the next exclude/include line.
[**exclude()**](#projen-ignorefile-exclude)<span title="This API element is experimental. It may change without notice.">🔹</span> | <span></span>
[**include()**](#projen-ignorefile-include)<span title="This API element is experimental. It may change without notice.">🔹</span> | <span></span>
[**onSynthesize()**](#projen-ignorefile-onsynthesize)<span title="This API element is experimental. It may change without notice.">🔹</span> | Allows this construct to emit artifacts into the cloud assembly during synthesis.
[**toString()**](#projen-ignorefile-tostring)<span title="This API element is experimental. It may change without notice.">🔹</span> | Returns a string representation of this construct.


---
#### comment(comment)<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-ignorefile-comment"></a>

appends a comment that will be included before the next exclude/include line.
```
public comment(comment: string): void
```

* **comment** (<code>string</code>)  *No description*





---
#### exclude(...patterns)<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-ignorefile-exclude"></a>


```
public exclude(...patterns: string[]): void
```

* **patterns** (<code>string</code>)  *No description*





---
#### include(...patterns)<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-ignorefile-include"></a>


```
public include(...patterns: string[]): void
```

* **patterns** (<code>string</code>)  *No description*





---
#### onSynthesize(session)<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-ignorefile-onsynthesize"></a>

Allows this construct to emit artifacts into the cloud assembly during synthesis.

This method is usually implemented by framework-level constructs such as `Stack` and `Asset`
as they participate in synthesizing the cloud assembly.
```
public onSynthesize(session: ISynthesisSession): void
```

* **session** (<code>[ISynthesisSession](#constructs-isynthesissession)</code>)  *No description*





---
#### toString()<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-ignorefile-tostring"></a>

Returns a string representation of this construct.
```
public toString(): string
```


*Returns*
* <code>string</code>



## class Jest <span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-jest"></a>



**Implements**: [IConstruct](#constructs-iconstruct)
**Extends**: [Construct](#constructs-construct)

### Initializer




```
new Jest(project: NodeProject)
```

* **project** (<code>[NodeProject](#projen-nodeproject)</code>)  *No description*


### Methods


Name | Description
-----|-----
[**toString()**](#projen-jest-tostring)<span title="This API element is experimental. It may change without notice.">🔹</span> | Returns a string representation of this construct.


---
#### toString()<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-jest-tostring"></a>

Returns a string representation of this construct.
```
public toString(): string
```


*Returns*
* <code>string</code>



## class JsiiProject <span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-jsiiproject"></a>



**Implements**: [IConstruct](#constructs-iconstruct)
**Extends**: [NodeProject](#projen-nodeproject)

### Initializer




```
new JsiiProject(options: JsiiProjectOptions)
```

* **options** (<code>[JsiiProjectOptions](#projen-jsiiprojectoptions)</code>)  *No description*
  * **bin** (<code>Map<string, string></code>)  *No description* *Optional*
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. *Default*: true
  * **bundledDependencies** (<code>Array<string></code>)  *No description* *Optional*
  * **commitPackageJson** (<code>boolean</code>)  Should we commit `package.json` to git or ignore? *Default*: false By default `package.json` is *not* committed. This means
that after you check out a repository you must run `npx projen` to
bootstrap it.
  * **dependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* *Optional*
  * **devDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* *Optional*
  * **peerDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* *Optional*
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  *No description* *Optional*
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. *Default*: true
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. *Default*: latest version
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. *Default*: true
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "master" when new versions are bumped. *Default*: true
  * **workflowBootstrapSteps** (<code>Array<any></code>)  Workflow steps to use in order to bootstrap this repo. *Default*: [ { run: `npx projen${PROJEN_VERSION}` }, { run: 'yarn install --frozen-lockfile' } ]
  * **workflowContainerImage** (<code>string</code>)  Container image to use for GitHub workflows. *Default*: default image
  * **authorEmail** (<code>string</code>)  *No description* 
  * **authorName** (<code>string</code>)  *No description* 
  * **jsiiVersion** (<code>[Semver](#projen-semver)</code>)  *No description* 
  * **name** (<code>string</code>)  *No description* 
  * **repository** (<code>string</code>)  *No description* 
  * **description** (<code>string</code>)  *No description* *Optional*
  * **docgen** (<code>boolean</code>)  Automatically generate API.md from jsii. *Default*: true
  * **dotnet** (<code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code>)  *No description* *Optional*
  * **eslint** (<code>boolean</code>)  Install eslint. *Default*: true
  * **java** (<code>[JsiiJavaTarget](#projen-jsiijavatarget)</code>)  *No description* *Optional*
  * **jest** (<code>boolean</code>)  Use jest for unit tests. *Default*: true
  * **license** (<code>string</code>)  *No description* *Optional*
  * **mergify** (<code>boolean</code>)  Add mergify configuration. *Default*: true
  * **python** (<code>[JsiiPythonTarget](#projen-jsiipythontarget)</code>)  *No description* *Optional*
  * **rootdir** (<code>string</code>)  *No description* *Default*: "."
  * **stability** (<code>string</code>)  *No description* *Optional*



### Properties


Name | Type | Description 
-----|------|-------------
**gitignore**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>[IgnoreFile](#projen-ignorefile)</code> | <span></span>
**npmignore**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>[IgnoreFile](#projen-ignorefile)</code> | <span></span>
**outdir**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <span></span>
**version**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>any</code> | Returns the current version of the project.

### Methods


Name | Description
-----|-----
[**addBins()**](#projen-jsiiproject-addbins)<span title="This API element is experimental. It may change without notice.">🔹</span> | <span></span>
[**addBundledDependencies()**](#projen-jsiiproject-addbundleddependencies)<span title="This API element is experimental. It may change without notice.">🔹</span> | <span></span>
[**addCompileCommand()**](#projen-jsiiproject-addcompilecommand)<span title="This API element is experimental. It may change without notice.">🔹</span> | Adds that will be executed after the jsii compilation.
[**addDependencies()**](#projen-jsiiproject-adddependencies)<span title="This API element is experimental. It may change without notice.">🔹</span> | <span></span>
[**addDevDependencies()**](#projen-jsiiproject-adddevdependencies)<span title="This API element is experimental. It may change without notice.">🔹</span> | <span></span>
[**addFields()**](#projen-jsiiproject-addfields)<span title="This API element is experimental. It may change without notice.">🔹</span> | <span></span>
[**addPeerDependencies()**](#projen-jsiiproject-addpeerdependencies)<span title="This API element is experimental. It may change without notice.">🔹</span> | <span></span>
[**addScripts()**](#projen-jsiiproject-addscripts)<span title="This API element is experimental. It may change without notice.">🔹</span> | <span></span>
[**addTestCommands()**](#projen-jsiiproject-addtestcommands)<span title="This API element is experimental. It may change without notice.">🔹</span> | <span></span>
[**synth()**](#projen-jsiiproject-synth)<span title="This API element is experimental. It may change without notice.">🔹</span> | <span></span>
[**toString()**](#projen-jsiiproject-tostring)<span title="This API element is experimental. It may change without notice.">🔹</span> | Returns a string representation of this construct.


---
#### addBins(bins)<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-jsiiproject-addbins"></a>


```
public addBins(bins: Map<string, string>): void
```

* **bins** (<code>Map<string, string></code>)  *No description*





---
#### addBundledDependencies(...deps)<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-jsiiproject-addbundleddependencies"></a>


```
public addBundledDependencies(...deps: string[]): void
```

* **deps** (<code>string</code>)  *No description*





---
#### addCompileCommand(command)<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-jsiiproject-addcompilecommand"></a>

Adds that will be executed after the jsii compilation.
```
public addCompileCommand(command: string): void
```

* **command** (<code>string</code>)  The command to execute.





---
#### addDependencies(deps, bundle?)<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-jsiiproject-adddependencies"></a>


```
public addDependencies(deps: Map<string, Semver>, bundle?: boolean): void
```

* **deps** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description*
* **bundle** (<code>boolean</code>)  *No description*





---
#### addDevDependencies(deps)<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-jsiiproject-adddevdependencies"></a>


```
public addDevDependencies(deps: Map<string, Semver>): void
```

* **deps** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description*





---
#### addFields(fields)<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-jsiiproject-addfields"></a>


```
public addFields(fields: Map<string, any>): void
```

* **fields** (<code>Map<string, any></code>)  *No description*





---
#### addPeerDependencies(deps, options?)<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-jsiiproject-addpeerdependencies"></a>


```
public addPeerDependencies(deps: Map<string, Semver>, options?: PeerDependencyOptions): void
```

* **deps** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description*
* **options** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  *No description*
  * **pinnedDevDependency** (<code>boolean</code>)  Automatically add a pinned dev dependency. *Default*: true





---
#### addScripts(scripts)<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-jsiiproject-addscripts"></a>


```
public addScripts(scripts: Map<string, string>): void
```

* **scripts** (<code>Map<string, string></code>)  *No description*





---
#### addTestCommands(...commands)<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-jsiiproject-addtestcommands"></a>


```
public addTestCommands(...commands: string[]): void
```

* **commands** (<code>string</code>)  *No description*





---
#### synth()<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-jsiiproject-synth"></a>


```
public synth(): void
```






---
#### toString()<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-jsiiproject-tostring"></a>

Returns a string representation of this construct.
```
public toString(): string
```


*Returns*
* <code>string</code>



## class JsonFile <span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-jsonfile"></a>



**Implements**: [IConstruct](#constructs-iconstruct)
**Extends**: [FileBase](#projen-filebase)

### Initializer




```
new JsonFile(project: Project, filePath: string, options: JsonFileOptions)
```

* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **filePath** (<code>string</code>)  *No description*
* **options** (<code>[JsonFileOptions](#projen-jsonfileoptions)</code>)  *No description*
  * **committed** (<code>boolean</code>)  Indicates whether this file should be committed to git or ignored. *Default*: false
  * **editGitignore** (<code>boolean</code>)  Update the project's .gitignore file. *Default*: true
  * **obj** (<code>any</code>)  *No description* 



### Properties


Name | Type | Description 
-----|------|-------------
**data**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <span></span>
**obj**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>json</code> | <span></span>
**path**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <span></span>

### Methods


Name | Description
-----|-----
[**onSynthesize()**](#projen-jsonfile-onsynthesize)<span title="This API element is experimental. It may change without notice.">🔹</span> | Allows this construct to emit artifacts into the cloud assembly during synthesis.
[**toString()**](#projen-jsonfile-tostring)<span title="This API element is experimental. It may change without notice.">🔹</span> | Returns a string representation of this construct.


---
#### onSynthesize(session)<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-jsonfile-onsynthesize"></a>

Allows this construct to emit artifacts into the cloud assembly during synthesis.

This method is usually implemented by framework-level constructs such as `Stack` and `Asset`
as they participate in synthesizing the cloud assembly.
```
public onSynthesize(session: ISynthesisSession): void
```

* **session** (<code>[ISynthesisSession](#constructs-isynthesissession)</code>)  *No description*





---
#### toString()<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-jsonfile-tostring"></a>

Returns a string representation of this construct.
```
public toString(): string
```


*Returns*
* <code>string</code>



## class License <span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-license"></a>



**Implements**: [IConstruct](#constructs-iconstruct)
**Extends**: [FileBase](#projen-filebase)

### Initializer




```
new License(project: Project, spdx: string)
```

* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **spdx** (<code>string</code>)  *No description*



### Properties


Name | Type | Description 
-----|------|-------------
**data**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <span></span>
**path**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <span></span>

### Methods


Name | Description
-----|-----
[**onSynthesize()**](#projen-license-onsynthesize)<span title="This API element is experimental. It may change without notice.">🔹</span> | Allows this construct to emit artifacts into the cloud assembly during synthesis.
[**toString()**](#projen-license-tostring)<span title="This API element is experimental. It may change without notice.">🔹</span> | Returns a string representation of this construct.


---
#### onSynthesize(session)<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-license-onsynthesize"></a>

Allows this construct to emit artifacts into the cloud assembly during synthesis.

This method is usually implemented by framework-level constructs such as `Stack` and `Asset`
as they participate in synthesizing the cloud assembly.
```
public onSynthesize(session: ISynthesisSession): void
```

* **session** (<code>[ISynthesisSession](#constructs-isynthesissession)</code>)  *No description*





---
#### toString()<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-license-tostring"></a>

Returns a string representation of this construct.
```
public toString(): string
```


*Returns*
* <code>string</code>



## class NodeBuildWorkflow <span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-nodebuildworkflow"></a>



**Implements**: [IConstruct](#constructs-iconstruct)
**Extends**: [GithubWorkflow](#projen-githubworkflow)

### Initializer




```
new NodeBuildWorkflow(project: Project, name: string, options: NodeBuildWorkflowOptions)
```

* **project** (<code>[Project](#projen-project)</code>)  *No description*
* **name** (<code>string</code>)  *No description*
* **options** (<code>[NodeBuildWorkflowOptions](#projen-nodebuildworkflowoptions)</code>)  *No description*
  * **trigger** (<code>Map<string, any></code>)  *No description* 
  * **bootstrapSteps** (<code>Array<any></code>)  Workflow steps to use in order to bootstrap this repo. *Default*: [ { run: `npx projen${PROJEN_VERSION}` }, { run: 'yarn install --frozen-lockfile' } ]
  * **image** (<code>string</code>)  *No description* *Default*: default image
  * **uploadArtifact** (<code>boolean</code>)  *No description* *Optional*



### Properties


Name | Type | Description 
-----|------|-------------
**buildJobId**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <span></span>
**data**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <span></span>
**path**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <span></span>

### Methods


Name | Description
-----|-----
[**addJobs()**](#projen-nodebuildworkflow-addjobs)<span title="This API element is experimental. It may change without notice.">🔹</span> | <span></span>
[**on()**](#projen-nodebuildworkflow-on)<span title="This API element is experimental. It may change without notice.">🔹</span> | <span></span>
[**onSynthesize()**](#projen-nodebuildworkflow-onsynthesize)<span title="This API element is experimental. It may change without notice.">🔹</span> | Allows this construct to emit artifacts into the cloud assembly during synthesis.
[**toString()**](#projen-nodebuildworkflow-tostring)<span title="This API element is experimental. It may change without notice.">🔹</span> | Returns a string representation of this construct.


---
#### addJobs(jobs)<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-nodebuildworkflow-addjobs"></a>


```
public addJobs(jobs: Map<string, any>): void
```

* **jobs** (<code>Map<string, any></code>)  *No description*





---
#### on(events)<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-nodebuildworkflow-on"></a>


```
public on(events: Map<string, any>): void
```

* **events** (<code>Map<string, any></code>)  *No description*





---
#### onSynthesize(session)<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-nodebuildworkflow-onsynthesize"></a>

Allows this construct to emit artifacts into the cloud assembly during synthesis.

This method is usually implemented by framework-level constructs such as `Stack` and `Asset`
as they participate in synthesizing the cloud assembly.
```
public onSynthesize(session: ISynthesisSession): void
```

* **session** (<code>[ISynthesisSession](#constructs-isynthesissession)</code>)  *No description*





---
#### toString()<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-nodebuildworkflow-tostring"></a>

Returns a string representation of this construct.
```
public toString(): string
```


*Returns*
* <code>string</code>



## class NodeProject <span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-nodeproject"></a>



**Implements**: [IConstruct](#constructs-iconstruct)
**Extends**: [Project](#projen-project)

### Initializer




```
new NodeProject(options: NodeProjectOptions)
```

* **options** (<code>[NodeProjectOptions](#projen-nodeprojectoptions)</code>)  *No description*
  * **outdir** (<code>string</code>)  *No description* *Default*: . current directory
  * **bin** (<code>Map<string, string></code>)  *No description* *Optional*
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. *Default*: true
  * **bundledDependencies** (<code>Array<string></code>)  *No description* *Optional*
  * **commitPackageJson** (<code>boolean</code>)  Should we commit `package.json` to git or ignore? *Default*: false By default `package.json` is *not* committed. This means
that after you check out a repository you must run `npx projen` to
bootstrap it.
  * **dependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* *Optional*
  * **devDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* *Optional*
  * **peerDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* *Optional*
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  *No description* *Optional*
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. *Default*: true
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. *Default*: latest version
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. *Default*: true
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "master" when new versions are bumped. *Default*: true
  * **workflowBootstrapSteps** (<code>Array<any></code>)  Workflow steps to use in order to bootstrap this repo. *Default*: [ { run: `npx projen${PROJEN_VERSION}` }, { run: 'yarn install --frozen-lockfile' } ]
  * **workflowContainerImage** (<code>string</code>)  Container image to use for GitHub workflows. *Default*: default image
  * **name** (<code>string</code>)  *No description* 
  * **authorEmail** (<code>string</code>)  *No description* *Optional*
  * **authorName** (<code>string</code>)  *No description* *Optional*
  * **description** (<code>string</code>)  *No description* *Optional*
  * **gitignore** (<code>Array<string></code>)  *No description* *Optional*
  * **license** (<code>string</code>)  *No description* *Optional*
  * **npmignore** (<code>Array<string></code>)  *No description* *Optional*
  * **repository** (<code>string</code>)  *No description* *Optional*
  * **stability** (<code>string</code>)  *No description* *Optional*



### Properties


Name | Type | Description 
-----|------|-------------
**gitignore**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>[IgnoreFile](#projen-ignorefile)</code> | <span></span>
**npmignore**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>[IgnoreFile](#projen-ignorefile)</code> | <span></span>
**outdir**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <span></span>
**version**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>any</code> | Returns the current version of the project.
**buildWorkflow**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>[NodeBuildWorkflow](#projen-nodebuildworkflow)</code> | The PR build GitHub workflow.<br/><br/>*Optional*
**releaseWorkflow**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>[NodeBuildWorkflow](#projen-nodebuildworkflow)</code> | The release GitHub workflow.<br/><br/>*Optional*

### Methods


Name | Description
-----|-----
[**addBins()**](#projen-nodeproject-addbins)<span title="This API element is experimental. It may change without notice.">🔹</span> | <span></span>
[**addBundledDependencies()**](#projen-nodeproject-addbundleddependencies)<span title="This API element is experimental. It may change without notice.">🔹</span> | <span></span>
[**addDependencies()**](#projen-nodeproject-adddependencies)<span title="This API element is experimental. It may change without notice.">🔹</span> | <span></span>
[**addDevDependencies()**](#projen-nodeproject-adddevdependencies)<span title="This API element is experimental. It may change without notice.">🔹</span> | <span></span>
[**addFields()**](#projen-nodeproject-addfields)<span title="This API element is experimental. It may change without notice.">🔹</span> | <span></span>
[**addPeerDependencies()**](#projen-nodeproject-addpeerdependencies)<span title="This API element is experimental. It may change without notice.">🔹</span> | <span></span>
[**addScripts()**](#projen-nodeproject-addscripts)<span title="This API element is experimental. It may change without notice.">🔹</span> | <span></span>
[**addTestCommands()**](#projen-nodeproject-addtestcommands)<span title="This API element is experimental. It may change without notice.">🔹</span> | <span></span>
[**synth()**](#projen-nodeproject-synth)<span title="This API element is experimental. It may change without notice.">🔹</span> | <span></span>
[**toString()**](#projen-nodeproject-tostring)<span title="This API element is experimental. It may change without notice.">🔹</span> | Returns a string representation of this construct.


---
#### addBins(bins)<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-nodeproject-addbins"></a>


```
public addBins(bins: Map<string, string>): void
```

* **bins** (<code>Map<string, string></code>)  *No description*





---
#### addBundledDependencies(...deps)<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-nodeproject-addbundleddependencies"></a>


```
public addBundledDependencies(...deps: string[]): void
```

* **deps** (<code>string</code>)  *No description*





---
#### addDependencies(deps, bundle?)<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-nodeproject-adddependencies"></a>


```
public addDependencies(deps: Map<string, Semver>, bundle?: boolean): void
```

* **deps** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description*
* **bundle** (<code>boolean</code>)  *No description*





---
#### addDevDependencies(deps)<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-nodeproject-adddevdependencies"></a>


```
public addDevDependencies(deps: Map<string, Semver>): void
```

* **deps** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description*





---
#### addFields(fields)<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-nodeproject-addfields"></a>


```
public addFields(fields: Map<string, any>): void
```

* **fields** (<code>Map<string, any></code>)  *No description*





---
#### addPeerDependencies(deps, options?)<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-nodeproject-addpeerdependencies"></a>


```
public addPeerDependencies(deps: Map<string, Semver>, options?: PeerDependencyOptions): void
```

* **deps** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description*
* **options** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  *No description*
  * **pinnedDevDependency** (<code>boolean</code>)  Automatically add a pinned dev dependency. *Default*: true





---
#### addScripts(scripts)<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-nodeproject-addscripts"></a>


```
public addScripts(scripts: Map<string, string>): void
```

* **scripts** (<code>Map<string, string></code>)  *No description*





---
#### addTestCommands(...commands)<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-nodeproject-addtestcommands"></a>


```
public addTestCommands(...commands: string[]): void
```

* **commands** (<code>string</code>)  *No description*





---
#### synth()<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-nodeproject-synth"></a>


```
public synth(): void
```






---
#### toString()<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-nodeproject-tostring"></a>

Returns a string representation of this construct.
```
public toString(): string
```


*Returns*
* <code>string</code>



## class Project <span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-project"></a>



**Implements**: [IConstruct](#constructs-iconstruct)
**Extends**: [Construct](#constructs-construct)

### Initializer




```
new Project(options?: ProjectOptions)
```

* **options** (<code>[ProjectOptions](#projen-projectoptions)</code>)  *No description*
  * **outdir** (<code>string</code>)  *No description* *Default*: . current directory



### Properties


Name | Type | Description 
-----|------|-------------
**gitignore**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>[IgnoreFile](#projen-ignorefile)</code> | <span></span>
**outdir**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <span></span>

### Methods


Name | Description
-----|-----
[**synth()**](#projen-project-synth)<span title="This API element is experimental. It may change without notice.">🔹</span> | <span></span>
[**toString()**](#projen-project-tostring)<span title="This API element is experimental. It may change without notice.">🔹</span> | Returns a string representation of this construct.


---
#### synth()<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-project-synth"></a>


```
public synth(): void
```






---
#### toString()<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-project-tostring"></a>

Returns a string representation of this construct.
```
public toString(): string
```


*Returns*
* <code>string</code>



## class Semver <span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-semver"></a>





### Properties


Name | Type | Description 
-----|------|-------------
**spec**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <span></span>
**version**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <span></span>
**mode**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <br/><br/>*Optional*

### Methods


Name | Description
-----|-----
[**caret()**](#projen-semver-caret)<span title="This API element is experimental. It may change without notice.">🔹</span> | Accept any minor version.
[**pinned()**](#projen-semver-pinned)<span title="This API element is experimental. It may change without notice.">🔹</span> | Accept only an exact version.
[**tilde()**](#projen-semver-tilde)<span title="This API element is experimental. It may change without notice.">🔹</span> | Accept patches.


---
#### *static* caret(version)<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-semver-caret"></a>

Accept any minor version.

>= version
< next major version
```
public static caret(version: string): Semver
```

* **version** (<code>string</code>)  *No description*

*Returns*
* <code>[Semver](#projen-semver)</code>


---
#### *static* pinned(version)<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-semver-pinned"></a>

Accept only an exact version.
```
public static pinned(version: string): Semver
```

* **version** (<code>string</code>)  *No description*

*Returns*
* <code>[Semver](#projen-semver)</code>


---
#### *static* tilde(version)<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-semver-tilde"></a>

Accept patches.

>= version
< next minor version
```
public static tilde(version: string): Semver
```

* **version** (<code>string</code>)  *No description*

*Returns*
* <code>[Semver](#projen-semver)</code>



## class TypeScriptLibraryProject <span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-typescriptlibraryproject"></a>



**Implements**: [IConstruct](#constructs-iconstruct)
**Extends**: [NodeProject](#projen-nodeproject)

### Initializer




```
new TypeScriptLibraryProject(options: TypeScriptLibraryProjectOptions)
```

* **options** (<code>[TypeScriptLibraryProjectOptions](#projen-typescriptlibraryprojectoptions)</code>)  *No description*
  * **outdir** (<code>string</code>)  *No description* *Default*: . current directory
  * **bin** (<code>Map<string, string></code>)  *No description* *Optional*
  * **buildWorkflow** (<code>boolean</code>)  Define a GitHub workflow for building PRs. *Default*: true
  * **bundledDependencies** (<code>Array<string></code>)  *No description* *Optional*
  * **commitPackageJson** (<code>boolean</code>)  Should we commit `package.json` to git or ignore? *Default*: false By default `package.json` is *not* committed. This means
that after you check out a repository you must run `npx projen` to
bootstrap it.
  * **dependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* *Optional*
  * **devDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* *Optional*
  * **peerDependencies** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description* *Optional*
  * **peerDependencyOptions** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  *No description* *Optional*
  * **projenDevDependency** (<code>boolean</code>)  Indicates of "projen" should be installed as a devDependency. *Default*: true
  * **projenVersion** (<code>[Semver](#projen-semver)</code>)  Version of projen to install. *Default*: latest version
  * **releaseToNpm** (<code>boolean</code>)  Automatically release to npm when new versions are introduced. *Default*: true
  * **releaseWorkflow** (<code>boolean</code>)  Define a GitHub workflow for releasing from "master" when new versions are bumped. *Default*: true
  * **workflowBootstrapSteps** (<code>Array<any></code>)  Workflow steps to use in order to bootstrap this repo. *Default*: [ { run: `npx projen${PROJEN_VERSION}` }, { run: 'yarn install --frozen-lockfile' } ]
  * **workflowContainerImage** (<code>string</code>)  Container image to use for GitHub workflows. *Default*: default image
  * **name** (<code>string</code>)  *No description* 
  * **authorEmail** (<code>string</code>)  *No description* *Optional*
  * **authorName** (<code>string</code>)  *No description* *Optional*
  * **description** (<code>string</code>)  *No description* *Optional*
  * **gitignore** (<code>Array<string></code>)  *No description* *Optional*
  * **license** (<code>string</code>)  *No description* *Optional*
  * **npmignore** (<code>Array<string></code>)  *No description* *Optional*
  * **repository** (<code>string</code>)  *No description* *Optional*
  * **stability** (<code>string</code>)  *No description* *Optional*



### Properties


Name | Type | Description 
-----|------|-------------
**gitignore**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>[IgnoreFile](#projen-ignorefile)</code> | <span></span>
**npmignore**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>[IgnoreFile](#projen-ignorefile)</code> | <span></span>
**outdir**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <span></span>
**version**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>any</code> | Returns the current version of the project.

### Methods


Name | Description
-----|-----
[**addBins()**](#projen-typescriptlibraryproject-addbins)<span title="This API element is experimental. It may change without notice.">🔹</span> | <span></span>
[**addBundledDependencies()**](#projen-typescriptlibraryproject-addbundleddependencies)<span title="This API element is experimental. It may change without notice.">🔹</span> | <span></span>
[**addDependencies()**](#projen-typescriptlibraryproject-adddependencies)<span title="This API element is experimental. It may change without notice.">🔹</span> | <span></span>
[**addDevDependencies()**](#projen-typescriptlibraryproject-adddevdependencies)<span title="This API element is experimental. It may change without notice.">🔹</span> | <span></span>
[**addFields()**](#projen-typescriptlibraryproject-addfields)<span title="This API element is experimental. It may change without notice.">🔹</span> | <span></span>
[**addPeerDependencies()**](#projen-typescriptlibraryproject-addpeerdependencies)<span title="This API element is experimental. It may change without notice.">🔹</span> | <span></span>
[**addScripts()**](#projen-typescriptlibraryproject-addscripts)<span title="This API element is experimental. It may change without notice.">🔹</span> | <span></span>
[**addTestCommands()**](#projen-typescriptlibraryproject-addtestcommands)<span title="This API element is experimental. It may change without notice.">🔹</span> | <span></span>
[**synth()**](#projen-typescriptlibraryproject-synth)<span title="This API element is experimental. It may change without notice.">🔹</span> | <span></span>
[**toString()**](#projen-typescriptlibraryproject-tostring)<span title="This API element is experimental. It may change without notice.">🔹</span> | Returns a string representation of this construct.


---
#### addBins(bins)<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-typescriptlibraryproject-addbins"></a>


```
public addBins(bins: Map<string, string>): void
```

* **bins** (<code>Map<string, string></code>)  *No description*





---
#### addBundledDependencies(...deps)<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-typescriptlibraryproject-addbundleddependencies"></a>


```
public addBundledDependencies(...deps: string[]): void
```

* **deps** (<code>string</code>)  *No description*





---
#### addDependencies(deps, bundle?)<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-typescriptlibraryproject-adddependencies"></a>


```
public addDependencies(deps: Map<string, Semver>, bundle?: boolean): void
```

* **deps** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description*
* **bundle** (<code>boolean</code>)  *No description*





---
#### addDevDependencies(deps)<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-typescriptlibraryproject-adddevdependencies"></a>


```
public addDevDependencies(deps: Map<string, Semver>): void
```

* **deps** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description*





---
#### addFields(fields)<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-typescriptlibraryproject-addfields"></a>


```
public addFields(fields: Map<string, any>): void
```

* **fields** (<code>Map<string, any></code>)  *No description*





---
#### addPeerDependencies(deps, options?)<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-typescriptlibraryproject-addpeerdependencies"></a>


```
public addPeerDependencies(deps: Map<string, Semver>, options?: PeerDependencyOptions): void
```

* **deps** (<code>Map<string, [Semver](#projen-semver)></code>)  *No description*
* **options** (<code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code>)  *No description*
  * **pinnedDevDependency** (<code>boolean</code>)  Automatically add a pinned dev dependency. *Default*: true





---
#### addScripts(scripts)<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-typescriptlibraryproject-addscripts"></a>


```
public addScripts(scripts: Map<string, string>): void
```

* **scripts** (<code>Map<string, string></code>)  *No description*





---
#### addTestCommands(...commands)<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-typescriptlibraryproject-addtestcommands"></a>


```
public addTestCommands(...commands: string[]): void
```

* **commands** (<code>string</code>)  *No description*





---
#### synth()<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-typescriptlibraryproject-synth"></a>


```
public synth(): void
```






---
#### toString()<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-typescriptlibraryproject-tostring"></a>

Returns a string representation of this construct.
```
public toString(): string
```


*Returns*
* <code>string</code>



## class Version <span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-version"></a>



**Implements**: [IConstruct](#constructs-iconstruct)
**Extends**: [Construct](#constructs-construct)

### Initializer




```
new Version(project: NodeProject)
```

* **project** (<code>[NodeProject](#projen-nodeproject)</code>)  *No description*



### Properties


Name | Type | Description 
-----|------|-------------
**current**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>any</code> | Returns the current version of the project.

### Methods


Name | Description
-----|-----
[**toString()**](#projen-version-tostring)<span title="This API element is experimental. It may change without notice.">🔹</span> | Returns a string representation of this construct.


---
#### toString()<span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-version-tostring"></a>

Returns a string representation of this construct.
```
public toString(): string
```


*Returns*
* <code>string</code>



## struct CommonOptions <span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-commonoptions"></a>






Name | Type | Description 
-----|------|-------------
**bin**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>Map<string, string></code> | <br/><br/>*Optional*
**buildWorkflow**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/><br/>*Default*: true
**bundledDependencies**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>Array<string></code> | <br/><br/>*Optional*
**commitPackageJson**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>boolean</code> | Should we commit `package.json` to git or ignore?<br/><br/>*Default*: false By default `package.json` is *not* committed. This means that after you check out a repository you must run `npx projen` to
bootstrap it.
**dependencies**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>Map<string, [Semver](#projen-semver)></code> | <br/><br/>*Optional*
**devDependencies**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>Map<string, [Semver](#projen-semver)></code> | <br/><br/>*Optional*
**peerDependencies**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>Map<string, [Semver](#projen-semver)></code> | <br/><br/>*Optional*
**peerDependencyOptions**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | <br/><br/>*Optional*
**projenDevDependency**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/><br/>*Default*: true
**projenVersion**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/><br/>*Default*: latest version
**releaseToNpm**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/><br/>*Default*: true
**releaseWorkflow**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>boolean</code> | Define a GitHub workflow for releasing from "master" when new versions are bumped.<br/><br/>*Default*: true
**workflowBootstrapSteps**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/><br/>*Default*: [ { run: `npx projen${PROJEN_VERSION}` }, { run: 'yarn install --frozen-lockfile' } ]
**workflowContainerImage**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | Container image to use for GitHub workflows.<br/><br/>*Default*: default image



## struct FileBaseOptions <span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-filebaseoptions"></a>






Name | Type | Description 
-----|------|-------------
**committed**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>boolean</code> | Indicates whether this file should be committed to git or ignored.<br/><br/>*Default*: false
**editGitignore**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>boolean</code> | Update the project's .gitignore file.<br/><br/>*Default*: true



## struct JsiiDotNetTarget <span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-jsiidotnettarget"></a>






Name | Type | Description 
-----|------|-------------
**dotNetNamespace**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <span></span>
**packageId**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <span></span>



## struct JsiiJavaTarget <span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-jsiijavatarget"></a>






Name | Type | Description 
-----|------|-------------
**javaPackage**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <span></span>
**mavenArtifactId**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <span></span>
**mavenGroupId**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <span></span>



## struct JsiiProjectOptions <span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-jsiiprojectoptions"></a>






Name | Type | Description 
-----|------|-------------
**authorEmail**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <span></span>
**authorName**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <span></span>
**jsiiVersion**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>[Semver](#projen-semver)</code> | <span></span>
**name**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <span></span>
**repository**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <span></span>
**bin**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>Map<string, string></code> | <br/><br/>*Optional*
**buildWorkflow**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/><br/>*Default*: true
**bundledDependencies**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>Array<string></code> | <br/><br/>*Optional*
**commitPackageJson**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>boolean</code> | Should we commit `package.json` to git or ignore?<br/><br/>*Default*: false By default `package.json` is *not* committed. This means that after you check out a repository you must run `npx projen` to
bootstrap it.
**dependencies**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>Map<string, [Semver](#projen-semver)></code> | <br/><br/>*Optional*
**description**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <br/><br/>*Optional*
**devDependencies**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>Map<string, [Semver](#projen-semver)></code> | <br/><br/>*Optional*
**docgen**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>boolean</code> | Automatically generate API.md from jsii.<br/><br/>*Default*: true
**dotnet**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>[JsiiDotNetTarget](#projen-jsiidotnettarget)</code> | <br/><br/>*Optional*
**eslint**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>boolean</code> | Install eslint.<br/><br/>*Default*: true
**java**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>[JsiiJavaTarget](#projen-jsiijavatarget)</code> | <br/><br/>*Optional*
**jest**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>boolean</code> | Use jest for unit tests.<br/><br/>*Default*: true
**license**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <br/><br/>*Optional*
**mergify**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>boolean</code> | Add mergify configuration.<br/><br/>*Default*: true
**peerDependencies**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>Map<string, [Semver](#projen-semver)></code> | <br/><br/>*Optional*
**peerDependencyOptions**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | <br/><br/>*Optional*
**projenDevDependency**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/><br/>*Default*: true
**projenVersion**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/><br/>*Default*: latest version
**python**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>[JsiiPythonTarget](#projen-jsiipythontarget)</code> | <br/><br/>*Optional*
**releaseToNpm**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/><br/>*Default*: true
**releaseWorkflow**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>boolean</code> | Define a GitHub workflow for releasing from "master" when new versions are bumped.<br/><br/>*Default*: true
**rootdir**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <br/><br/>*Default*: "."
**stability**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <br/><br/>*Optional*
**workflowBootstrapSteps**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/><br/>*Default*: [ { run: `npx projen${PROJEN_VERSION}` }, { run: 'yarn install --frozen-lockfile' } ]
**workflowContainerImage**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | Container image to use for GitHub workflows.<br/><br/>*Default*: default image



## struct JsiiPythonTarget <span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-jsiipythontarget"></a>






Name | Type | Description 
-----|------|-------------
**distName**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <span></span>
**module**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <span></span>



## struct JsonFileOptions <span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-jsonfileoptions"></a>






Name | Type | Description 
-----|------|-------------
**obj**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>any</code> | <span></span>
**committed**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>boolean</code> | Indicates whether this file should be committed to git or ignored.<br/><br/>*Default*: false
**editGitignore**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>boolean</code> | Update the project's .gitignore file.<br/><br/>*Default*: true



## struct NodeBuildWorkflowOptions <span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-nodebuildworkflowoptions"></a>






Name | Type | Description 
-----|------|-------------
**trigger**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>Map<string, any></code> | <span></span>
**bootstrapSteps**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/><br/>*Default*: [ { run: `npx projen${PROJEN_VERSION}` }, { run: 'yarn install --frozen-lockfile' } ]
**image**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <br/><br/>*Default*: default image
**uploadArtifact**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>boolean</code> | <br/><br/>*Optional*



## struct NodeProjectOptions <span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-nodeprojectoptions"></a>






Name | Type | Description 
-----|------|-------------
**name**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <span></span>
**authorEmail**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <br/><br/>*Optional*
**authorName**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <br/><br/>*Optional*
**bin**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>Map<string, string></code> | <br/><br/>*Optional*
**buildWorkflow**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/><br/>*Default*: true
**bundledDependencies**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>Array<string></code> | <br/><br/>*Optional*
**commitPackageJson**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>boolean</code> | Should we commit `package.json` to git or ignore?<br/><br/>*Default*: false By default `package.json` is *not* committed. This means that after you check out a repository you must run `npx projen` to
bootstrap it.
**dependencies**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>Map<string, [Semver](#projen-semver)></code> | <br/><br/>*Optional*
**description**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <br/><br/>*Optional*
**devDependencies**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>Map<string, [Semver](#projen-semver)></code> | <br/><br/>*Optional*
**gitignore**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>Array<string></code> | <br/><br/>*Optional*
**license**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <br/><br/>*Optional*
**npmignore**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>Array<string></code> | <br/><br/>*Optional*
**outdir**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <br/><br/>*Default*: . current directory
**peerDependencies**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>Map<string, [Semver](#projen-semver)></code> | <br/><br/>*Optional*
**peerDependencyOptions**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | <br/><br/>*Optional*
**projenDevDependency**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/><br/>*Default*: true
**projenVersion**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/><br/>*Default*: latest version
**releaseToNpm**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/><br/>*Default*: true
**releaseWorkflow**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>boolean</code> | Define a GitHub workflow for releasing from "master" when new versions are bumped.<br/><br/>*Default*: true
**repository**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <br/><br/>*Optional*
**stability**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <br/><br/>*Optional*
**workflowBootstrapSteps**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/><br/>*Default*: [ { run: `npx projen${PROJEN_VERSION}` }, { run: 'yarn install --frozen-lockfile' } ]
**workflowContainerImage**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | Container image to use for GitHub workflows.<br/><br/>*Default*: default image



## struct PeerDependencyOptions <span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-peerdependencyoptions"></a>






Name | Type | Description 
-----|------|-------------
**pinnedDevDependency**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>boolean</code> | Automatically add a pinned dev dependency.<br/><br/>*Default*: true



## struct ProjectOptions <span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-projectoptions"></a>






Name | Type | Description 
-----|------|-------------
**outdir**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <br/><br/>*Default*: . current directory



## struct TypeScriptLibraryProjectOptions <span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-typescriptlibraryprojectoptions"></a>






Name | Type | Description 
-----|------|-------------
**name**<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <span></span>
**authorEmail**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <br/><br/>*Optional*
**authorName**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <br/><br/>*Optional*
**bin**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>Map<string, string></code> | <br/><br/>*Optional*
**buildWorkflow**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>boolean</code> | Define a GitHub workflow for building PRs.<br/><br/>*Default*: true
**bundledDependencies**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>Array<string></code> | <br/><br/>*Optional*
**commitPackageJson**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>boolean</code> | Should we commit `package.json` to git or ignore?<br/><br/>*Default*: false By default `package.json` is *not* committed. This means that after you check out a repository you must run `npx projen` to
bootstrap it.
**dependencies**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>Map<string, [Semver](#projen-semver)></code> | <br/><br/>*Optional*
**description**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <br/><br/>*Optional*
**devDependencies**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>Map<string, [Semver](#projen-semver)></code> | <br/><br/>*Optional*
**gitignore**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>Array<string></code> | <br/><br/>*Optional*
**license**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <br/><br/>*Optional*
**npmignore**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>Array<string></code> | <br/><br/>*Optional*
**outdir**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <br/><br/>*Default*: . current directory
**peerDependencies**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>Map<string, [Semver](#projen-semver)></code> | <br/><br/>*Optional*
**peerDependencyOptions**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>[PeerDependencyOptions](#projen-peerdependencyoptions)</code> | <br/><br/>*Optional*
**projenDevDependency**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency.<br/><br/>*Default*: true
**projenVersion**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>[Semver](#projen-semver)</code> | Version of projen to install.<br/><br/>*Default*: latest version
**releaseToNpm**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>boolean</code> | Automatically release to npm when new versions are introduced.<br/><br/>*Default*: true
**releaseWorkflow**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>boolean</code> | Define a GitHub workflow for releasing from "master" when new versions are bumped.<br/><br/>*Default*: true
**repository**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <br/><br/>*Optional*
**stability**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | <br/><br/>*Optional*
**workflowBootstrapSteps**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>Array<any></code> | Workflow steps to use in order to bootstrap this repo.<br/><br/>*Default*: [ { run: `npx projen${PROJEN_VERSION}` }, { run: 'yarn install --frozen-lockfile' } ]
**workflowContainerImage**?<span title="This API element is experimental. It may change without notice.">🔹</span> | <code>string</code> | Container image to use for GitHub workflows.<br/><br/>*Default*: default image



## enum Stability <span title="This API element is experimental. It may change without notice.">🔹</span> <a id="projen-stability"></a>



Name | Description
-----|-----
**EXPERIMENTAL** <span title="This API element is experimental. It may change without notice.">🔹</span>|
**STABLE** <span title="This API element is experimental. It may change without notice.">🔹</span>|
**DEPRECATED** <span title="This API element is experimental. It may change without notice.">🔹</span>|


