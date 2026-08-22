# `polaris` Submodule <a name="`polaris` Submodule" id="projen.polaris"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### PolarisCoverity <a name="PolarisCoverity" id="projen.polaris.PolarisCoverity"></a>

Manages `coverity.yml`, the configuration file for Coverity on Polaris (Black Duck's SAST scanning tool).

> [https://docs.blackduck.com/r/cov_polaris/latest/coverity-on-polaris/configuration-file-schema.html](https://docs.blackduck.com/r/cov_polaris/latest/coverity-on-polaris/configuration-file-schema.html)

#### Initializers <a name="Initializers" id="projen.polaris.PolarisCoverity.Initializer"></a>

```typescript
import { polaris } from 'projen'

new polaris.PolarisCoverity(project: Project, options?: PolarisCoverityOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.PolarisCoverity.Initializer.parameter.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.polaris.PolarisCoverity.Initializer.parameter.options">options</a></code> | <code><a href="#projen.polaris.PolarisCoverityOptions">PolarisCoverityOptions</a></code> | *No description.* |

---

##### `project`<sup>Required</sup> <a name="project" id="projen.polaris.PolarisCoverity.Initializer.parameter.project"></a>

- *Type:* projen.Project

---

##### `options`<sup>Optional</sup> <a name="options" id="projen.polaris.PolarisCoverity.Initializer.parameter.options"></a>

- *Type:* <a href="#projen.polaris.PolarisCoverityOptions">PolarisCoverityOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.polaris.PolarisCoverity.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen.polaris.PolarisCoverity.with">with</a></code> | Applies one or more mixins to this construct. |
| <code><a href="#projen.polaris.PolarisCoverity.postProjectCreation">postProjectCreation</a></code> | Called once, right after `postSynthesize()`, only when the project is created for the first time. |
| <code><a href="#projen.polaris.PolarisCoverity.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen.polaris.PolarisCoverity.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen.polaris.PolarisCoverity.projectCreation">projectCreation</a></code> | Called once, right after `synthesize()`, only when the project is created for the first time. |
| <code><a href="#projen.polaris.PolarisCoverity.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |

---

##### `toString` <a name="toString" id="projen.polaris.PolarisCoverity.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="projen.polaris.PolarisCoverity.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="projen.polaris.PolarisCoverity.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

##### `postProjectCreation` <a name="postProjectCreation" id="projen.polaris.PolarisCoverity.postProjectCreation"></a>

```typescript
public postProjectCreation(initProject: InitProject): void
```

Called once, right after `postSynthesize()`, only when the project is created for the first time.

It does not run on later `projen` invocations. It only fires for `projen new` (or `Projects.createProject`).
It is also skipped when post-synthesis steps are disabled, e.g. `--no-post` or `PROJEN_DISABLE_POST`.
Use it for one-off setup that can be turned off by the user, like running a task to give the user immediate
feedback on their new project. Order across components is not guaranteed.

###### `initProject`<sup>Required</sup> <a name="initProject" id="projen.polaris.PolarisCoverity.postProjectCreation.parameter.initProject"></a>

- *Type:* projen.InitProject

Details about how the project was created, e.g. its type and the original CLI args.

---

##### `postSynthesize` <a name="postSynthesize" id="projen.polaris.PolarisCoverity.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen.polaris.PolarisCoverity.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `projectCreation` <a name="projectCreation" id="projen.polaris.PolarisCoverity.projectCreation"></a>

```typescript
public projectCreation(initProject: InitProject): void
```

Called once, right after `synthesize()`, only when the project is created for the first time.

It does not run on later `projen` invocations. It only fires for `projen new` (or `Projects.createProject`).
Use it for deterministic, one-off file generation. Order across components is not guaranteed.

###### `initProject`<sup>Required</sup> <a name="initProject" id="projen.polaris.PolarisCoverity.projectCreation.parameter.initProject"></a>

- *Type:* projen.InitProject

Details about how the project was created, e.g. its type and the original CLI args.

---

##### `synthesize` <a name="synthesize" id="projen.polaris.PolarisCoverity.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.polaris.PolarisCoverity.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen.polaris.PolarisCoverity.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="projen.polaris.PolarisCoverity.isConstruct"></a>

```typescript
import { polaris } from 'projen'

polaris.PolarisCoverity.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="projen.polaris.PolarisCoverity.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen.polaris.PolarisCoverity.isComponent"></a>

```typescript
import { polaris } from 'projen'

polaris.PolarisCoverity.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen.polaris.PolarisCoverity.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.PolarisCoverity.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen.polaris.PolarisCoverity.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.polaris.PolarisCoverity.property.file">file</a></code> | <code>projen.YamlFile</code> | The YAML file for the Coverity on Polaris configuration. |

---

##### `node`<sup>Required</sup> <a name="node" id="projen.polaris.PolarisCoverity.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen.polaris.PolarisCoverity.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---

##### `file`<sup>Required</sup> <a name="file" id="projen.polaris.PolarisCoverity.property.file"></a>

```typescript
public readonly file: YamlFile;
```

- *Type:* projen.YamlFile

The YAML file for the Coverity on Polaris configuration.

---


## Structs <a name="Structs" id="Structs"></a>

### PolarisCoverityAnalyze <a name="PolarisCoverityAnalyze" id="projen.polaris.PolarisCoverityAnalyze"></a>

Options for the `analyze` section of `coverity.yml`.

#### Initializer <a name="Initializer" id="projen.polaris.PolarisCoverityAnalyze.Initializer"></a>

```typescript
import { polaris } from 'projen'

const polarisCoverityAnalyze: polaris.PolarisCoverityAnalyze = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.PolarisCoverityAnalyze.property.mode">mode</a></code> | <code><a href="#projen.polaris.PolarisCoverityAnalyzeMode">PolarisCoverityAnalyzeMode</a></code> | The environment in which analysis is executed. |
| <code><a href="#projen.polaris.PolarisCoverityAnalyze.property.serverUrl">serverUrl</a></code> | <code>string</code> | The Polaris server endpoint. |
| <code><a href="#projen.polaris.PolarisCoverityAnalyze.property.uploadServiceUrl">uploadServiceUrl</a></code> | <code>string</code> | The upload service endpoint. |

---

##### `mode`<sup>Optional</sup> <a name="mode" id="projen.polaris.PolarisCoverityAnalyze.property.mode"></a>

```typescript
public readonly mode: PolarisCoverityAnalyzeMode;
```

- *Type:* <a href="#projen.polaris.PolarisCoverityAnalyzeMode">PolarisCoverityAnalyzeMode</a>
- *Default:* not set

The environment in which analysis is executed.

---

##### `serverUrl`<sup>Optional</sup> <a name="serverUrl" id="projen.polaris.PolarisCoverityAnalyze.property.serverUrl"></a>

```typescript
public readonly serverUrl: string;
```

- *Type:* string
- *Default:* not set

The Polaris server endpoint.

---

##### `uploadServiceUrl`<sup>Optional</sup> <a name="uploadServiceUrl" id="projen.polaris.PolarisCoverityAnalyze.property.uploadServiceUrl"></a>

```typescript
public readonly uploadServiceUrl: string;
```

- *Type:* string
- *Default:* not set

The upload service endpoint.

---

### PolarisCoverityCapture <a name="PolarisCoverityCapture" id="projen.polaris.PolarisCoverityCapture"></a>

Options for the `capture` section of `coverity.yml`.

#### Initializer <a name="Initializer" id="projen.polaris.PolarisCoverityCapture.Initializer"></a>

```typescript
import { polaris } from 'projen'

const polarisCoverityCapture: polaris.PolarisCoverityCapture = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.PolarisCoverityCapture.property.buildCapture">buildCapture</a></code> | <code><a href="#projen.polaris.PolarisCoverityCaptureBuild">PolarisCoverityCaptureBuild</a></code> | Build capture settings for compiled languages. |
| <code><a href="#projen.polaris.PolarisCoverityCapture.property.compilerConfiguration">compilerConfiguration</a></code> | <code><a href="#projen.polaris.PolarisCoverityCompilerConfiguration">PolarisCoverityCompilerConfiguration</a></code> | Compiler configuration options, e.g. for cross-compilers. |
| <code><a href="#projen.polaris.PolarisCoverityCapture.property.encoding">encoding</a></code> | <code>string</code> | The encoding to use when parsing and emitting source files in C, C++ and JavaScript. |
| <code><a href="#projen.polaris.PolarisCoverityCapture.property.files">files</a></code> | <code><a href="#projen.polaris.PolarisCoverityCaptureFiles">PolarisCoverityCaptureFiles</a></code> | File inclusion/exclusion filters for capture. |
| <code><a href="#projen.polaris.PolarisCoverityCapture.property.languages">languages</a></code> | <code><a href="#projen.polaris.PolarisCoverityCaptureLanguages">PolarisCoverityCaptureLanguages</a></code> | Language inclusion/exclusion filters for capture. |

---

##### `buildCapture`<sup>Optional</sup> <a name="buildCapture" id="projen.polaris.PolarisCoverityCapture.property.buildCapture"></a>

```typescript
public readonly buildCapture: PolarisCoverityCaptureBuild;
```

- *Type:* <a href="#projen.polaris.PolarisCoverityCaptureBuild">PolarisCoverityCaptureBuild</a>
- *Default:* no build capture

Build capture settings for compiled languages.

---

##### `compilerConfiguration`<sup>Optional</sup> <a name="compilerConfiguration" id="projen.polaris.PolarisCoverityCapture.property.compilerConfiguration"></a>

```typescript
public readonly compilerConfiguration: PolarisCoverityCompilerConfiguration;
```

- *Type:* <a href="#projen.polaris.PolarisCoverityCompilerConfiguration">PolarisCoverityCompilerConfiguration</a>
- *Default:* no additional compiler configuration

Compiler configuration options, e.g. for cross-compilers.

---

##### `encoding`<sup>Optional</sup> <a name="encoding" id="projen.polaris.PolarisCoverityCapture.property.encoding"></a>

```typescript
public readonly encoding: string;
```

- *Type:* string
- *Default:* "UTF-8"

The encoding to use when parsing and emitting source files in C, C++ and JavaScript.

---

##### `files`<sup>Optional</sup> <a name="files" id="projen.polaris.PolarisCoverityCapture.property.files"></a>

```typescript
public readonly files: PolarisCoverityCaptureFiles;
```

- *Type:* <a href="#projen.polaris.PolarisCoverityCaptureFiles">PolarisCoverityCaptureFiles</a>
- *Default:* no file filters

File inclusion/exclusion filters for capture.

---

##### `languages`<sup>Optional</sup> <a name="languages" id="projen.polaris.PolarisCoverityCapture.property.languages"></a>

```typescript
public readonly languages: PolarisCoverityCaptureLanguages;
```

- *Type:* <a href="#projen.polaris.PolarisCoverityCaptureLanguages">PolarisCoverityCaptureLanguages</a>
- *Default:* no language filters

Language inclusion/exclusion filters for capture.

---

### PolarisCoverityCaptureBuild <a name="PolarisCoverityCaptureBuild" id="projen.polaris.PolarisCoverityCaptureBuild"></a>

Build capture options for compiled languages.

> [https://docs.blackduck.com/r/polaris/continuous-integration-for-polaris/configuring-coverity-thin-client-for-use-with-bridge-cli-and-polaris.html](https://docs.blackduck.com/r/polaris/continuous-integration-for-polaris/configuring-coverity-thin-client-for-use-with-bridge-cli-and-polaris.html)

#### Initializer <a name="Initializer" id="projen.polaris.PolarisCoverityCaptureBuild.Initializer"></a>

```typescript
import { polaris } from 'projen'

const polarisCoverityCaptureBuild: polaris.PolarisCoverityCaptureBuild = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.PolarisCoverityCaptureBuild.property.buildCommand">buildCommand</a></code> | <code>string</code> | The build command that will be invoked to use build capture to capture the project. |
| <code><a href="#projen.polaris.PolarisCoverityCaptureBuild.property.aspnetCompiler">aspnetCompiler</a></code> | <code>boolean</code> | Enables or disables automatic invocation of the ASP.NET compiler for detected web applications. |
| <code><a href="#projen.polaris.PolarisCoverityCaptureBuild.property.cleanCommand">cleanCommand</a></code> | <code>string</code> | The clean command that will be invoked prior to doing build capture. |

---

##### `buildCommand`<sup>Required</sup> <a name="buildCommand" id="projen.polaris.PolarisCoverityCaptureBuild.property.buildCommand"></a>

```typescript
public readonly buildCommand: string;
```

- *Type:* string

The build command that will be invoked to use build capture to capture the project.

---

##### `aspnetCompiler`<sup>Optional</sup> <a name="aspnetCompiler" id="projen.polaris.PolarisCoverityCaptureBuild.property.aspnetCompiler"></a>

```typescript
public readonly aspnetCompiler: boolean;
```

- *Type:* boolean
- *Default:* not set

Enables or disables automatic invocation of the ASP.NET compiler for detected web applications.

---

##### `cleanCommand`<sup>Optional</sup> <a name="cleanCommand" id="projen.polaris.PolarisCoverityCaptureBuild.property.cleanCommand"></a>

```typescript
public readonly cleanCommand: string;
```

- *Type:* string
- *Default:* no clean command is run

The clean command that will be invoked prior to doing build capture.

---

### PolarisCoverityCaptureFiles <a name="PolarisCoverityCaptureFiles" id="projen.polaris.PolarisCoverityCaptureFiles"></a>

File-based capture filtering options.

> [https://docs.blackduck.com/r/cov_polaris/latest/coverity-on-polaris/configuration-file-schema.html](https://docs.blackduck.com/r/cov_polaris/latest/coverity-on-polaris/configuration-file-schema.html)

#### Initializer <a name="Initializer" id="projen.polaris.PolarisCoverityCaptureFiles.Initializer"></a>

```typescript
import { polaris } from 'projen'

const polarisCoverityCaptureFiles: polaris.PolarisCoverityCaptureFiles = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.PolarisCoverityCaptureFiles.property.excludeRegex">excludeRegex</a></code> | <code>string</code> | A regular expression matching files that should be excluded from capture. |
| <code><a href="#projen.polaris.PolarisCoverityCaptureFiles.property.includeRegex">includeRegex</a></code> | <code>string</code> | A regular expression matching files that should be included in capture. |

---

##### `excludeRegex`<sup>Optional</sup> <a name="excludeRegex" id="projen.polaris.PolarisCoverityCaptureFiles.property.excludeRegex"></a>

```typescript
public readonly excludeRegex: string;
```

- *Type:* string
- *Default:* no files are excluded

A regular expression matching files that should be excluded from capture.

---

*Example*

```typescript
(node_modules\/.*|dist\/.*)
```


##### `includeRegex`<sup>Optional</sup> <a name="includeRegex" id="projen.polaris.PolarisCoverityCaptureFiles.property.includeRegex"></a>

```typescript
public readonly includeRegex: string;
```

- *Type:* string
- *Default:* all files are included

A regular expression matching files that should be included in capture.

---

### PolarisCoverityCaptureLanguages <a name="PolarisCoverityCaptureLanguages" id="projen.polaris.PolarisCoverityCaptureLanguages"></a>

Language filtering options for capture.

#### Initializer <a name="Initializer" id="projen.polaris.PolarisCoverityCaptureLanguages.Initializer"></a>

```typescript
import { polaris } from 'projen'

const polarisCoverityCaptureLanguages: polaris.PolarisCoverityCaptureLanguages = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.PolarisCoverityCaptureLanguages.property.exclude">exclude</a></code> | <code><a href="#projen.polaris.PolarisCoverityLanguage">PolarisCoverityLanguage</a>[]</code> | Languages to exclude from the capture. |
| <code><a href="#projen.polaris.PolarisCoverityCaptureLanguages.property.include">include</a></code> | <code><a href="#projen.polaris.PolarisCoverityLanguage">PolarisCoverityLanguage</a>[]</code> | Languages to include in the capture. |

---

##### `exclude`<sup>Optional</sup> <a name="exclude" id="projen.polaris.PolarisCoverityCaptureLanguages.property.exclude"></a>

```typescript
public readonly exclude: PolarisCoverityLanguage[];
```

- *Type:* <a href="#projen.polaris.PolarisCoverityLanguage">PolarisCoverityLanguage</a>[]
- *Default:* no languages are excluded

Languages to exclude from the capture.

Mutually exclusive with `include`.

---

##### `include`<sup>Optional</sup> <a name="include" id="projen.polaris.PolarisCoverityCaptureLanguages.property.include"></a>

```typescript
public readonly include: PolarisCoverityLanguage[];
```

- *Type:* <a href="#projen.polaris.PolarisCoverityLanguage">PolarisCoverityLanguage</a>[]
- *Default:* all supported languages are included

Languages to include in the capture.

Mutually exclusive with `exclude`.

---

*Example*

```typescript
[PolarisCoverityLanguage.JAVASCRIPT]
```


### PolarisCoverityCompilerConfiguration <a name="PolarisCoverityCompilerConfiguration" id="projen.polaris.PolarisCoverityCompilerConfiguration"></a>

Compiler configuration options, e.g. for cross-compilers.

> [https://docs.blackduck.com/r/polaris/continuous-integration-for-polaris/configuring-coverity-thin-client-for-use-with-bridge-cli-and-polaris.html](https://docs.blackduck.com/r/polaris/continuous-integration-for-polaris/configuring-coverity-thin-client-for-use-with-bridge-cli-and-polaris.html)

#### Initializer <a name="Initializer" id="projen.polaris.PolarisCoverityCompilerConfiguration.Initializer"></a>

```typescript
import { polaris } from 'projen'

const polarisCoverityCompilerConfiguration: polaris.PolarisCoverityCompilerConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.PolarisCoverityCompilerConfiguration.property.covConfigure">covConfigure</a></code> | <code>string[][]</code> | A list of `cov-configure` argument lists to run. |

---

##### `covConfigure`<sup>Optional</sup> <a name="covConfigure" id="projen.polaris.PolarisCoverityCompilerConfiguration.property.covConfigure"></a>

```typescript
public readonly covConfigure: string[][];
```

- *Type:* string[][]
- *Default:* no additional compiler configuration

A list of `cov-configure` argument lists to run.

---

*Example*

```typescript
[["--template", "--compiler", "arm-linux-gnueabi-gcc", "--comptype", "gcc"]]
```


### PolarisCoverityInstall <a name="PolarisCoverityInstall" id="projen.polaris.PolarisCoverityInstall"></a>

Options for the `install` section of `coverity.yml`.

#### Initializer <a name="Initializer" id="projen.polaris.PolarisCoverityInstall.Initializer"></a>

```typescript
import { polaris } from 'projen'

const polarisCoverityInstall: polaris.PolarisCoverityInstall = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.PolarisCoverityInstall.property.directory">directory</a></code> | <code>string</code> | The path to an existing Coverity tools installation. |
| <code><a href="#projen.polaris.PolarisCoverityInstall.property.version">version</a></code> | <code>string</code> | The version of Coverity tools to use. |

---

##### `directory`<sup>Optional</sup> <a name="directory" id="projen.polaris.PolarisCoverityInstall.property.directory"></a>

```typescript
public readonly directory: string;
```

- *Type:* string
- *Default:* not set

The path to an existing Coverity tools installation.

---

##### `version`<sup>Optional</sup> <a name="version" id="projen.polaris.PolarisCoverityInstall.property.version"></a>

```typescript
public readonly version: string;
```

- *Type:* string
- *Default:* not set

The version of Coverity tools to use.

---

*Example*

```typescript
"2021.06"
```


### PolarisCoverityOptions <a name="PolarisCoverityOptions" id="projen.polaris.PolarisCoverityOptions"></a>

Options for `PolarisCoverity`.

#### Initializer <a name="Initializer" id="projen.polaris.PolarisCoverityOptions.Initializer"></a>

```typescript
import { polaris } from 'projen'

const polarisCoverityOptions: polaris.PolarisCoverityOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.PolarisCoverityOptions.property.analyze">analyze</a></code> | <code><a href="#projen.polaris.PolarisCoverityAnalyze">PolarisCoverityAnalyze</a></code> | Analysis execution configuration. |
| <code><a href="#projen.polaris.PolarisCoverityOptions.property.capture">capture</a></code> | <code><a href="#projen.polaris.PolarisCoverityCapture">PolarisCoverityCapture</a></code> | Capture configuration, controlling which files and languages are analyzed. |
| <code><a href="#projen.polaris.PolarisCoverityOptions.property.install">install</a></code> | <code><a href="#projen.polaris.PolarisCoverityInstall">PolarisCoverityInstall</a></code> | Coverity tool installation configuration. |
| <code><a href="#projen.polaris.PolarisCoverityOptions.property.project">project</a></code> | <code><a href="#projen.polaris.PolarisCoverityProject">PolarisCoverityProject</a></code> | Organization, naming and metadata for the analysis. |
| <code><a href="#projen.polaris.PolarisCoverityOptions.property.version">version</a></code> | <code>string</code> | The configuration file format version. |

---

##### `analyze`<sup>Optional</sup> <a name="analyze" id="projen.polaris.PolarisCoverityOptions.property.analyze"></a>

```typescript
public readonly analyze: PolarisCoverityAnalyze;
```

- *Type:* <a href="#projen.polaris.PolarisCoverityAnalyze">PolarisCoverityAnalyze</a>
- *Default:* not set

Analysis execution configuration.

---

##### `capture`<sup>Optional</sup> <a name="capture" id="projen.polaris.PolarisCoverityOptions.property.capture"></a>

```typescript
public readonly capture: PolarisCoverityCapture;
```

- *Type:* <a href="#projen.polaris.PolarisCoverityCapture">PolarisCoverityCapture</a>
- *Default:* not set

Capture configuration, controlling which files and languages are analyzed.

---

##### `install`<sup>Optional</sup> <a name="install" id="projen.polaris.PolarisCoverityOptions.property.install"></a>

```typescript
public readonly install: PolarisCoverityInstall;
```

- *Type:* <a href="#projen.polaris.PolarisCoverityInstall">PolarisCoverityInstall</a>
- *Default:* not set

Coverity tool installation configuration.

---

##### `project`<sup>Optional</sup> <a name="project" id="projen.polaris.PolarisCoverityOptions.property.project"></a>

```typescript
public readonly project: PolarisCoverityProject;
```

- *Type:* <a href="#projen.polaris.PolarisCoverityProject">PolarisCoverityProject</a>
- *Default:* not set

Organization, naming and metadata for the analysis.

---

##### `version`<sup>Optional</sup> <a name="version" id="projen.polaris.PolarisCoverityOptions.property.version"></a>

```typescript
public readonly version: string;
```

- *Type:* string
- *Default:* "1"

The configuration file format version.

---

### PolarisCoverityProject <a name="PolarisCoverityProject" id="projen.polaris.PolarisCoverityProject"></a>

Options for the `project` section of `coverity.yml`.

#### Initializer <a name="Initializer" id="projen.polaris.PolarisCoverityProject.Initializer"></a>

```typescript
import { polaris } from 'projen'

const polarisCoverityProject: polaris.PolarisCoverityProject = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.PolarisCoverityProject.property.branch">branch</a></code> | <code>string</code> | The branch being analyzed. |
| <code><a href="#projen.polaris.PolarisCoverityProject.property.captureDir">captureDir</a></code> | <code>string</code> | The directory used to store capture artifacts. |
| <code><a href="#projen.polaris.PolarisCoverityProject.property.groups">groups</a></code> | <code>{[ key: string ]: string}</code> | A mapping of group names to their role, e.g. "Observer", "Administrator" or "Contributor". |
| <code><a href="#projen.polaris.PolarisCoverityProject.property.name">name</a></code> | <code>string</code> | The name of the project in Polaris. |
| <code><a href="#projen.polaris.PolarisCoverityProject.property.organization">organization</a></code> | <code>string</code> | The Polaris organization that the project belongs to. |
| <code><a href="#projen.polaris.PolarisCoverityProject.property.projectDir">projectDir</a></code> | <code>string</code> | The directory containing the project source. |
| <code><a href="#projen.polaris.PolarisCoverityProject.property.properties">properties</a></code> | <code>{[ key: string ]: string \| number}</code> | Custom metadata properties to associate with the analysis. |
| <code><a href="#projen.polaris.PolarisCoverityProject.property.revision">revision</a></code> | <code><a href="#projen.polaris.PolarisCoverityProjectRevision">PolarisCoverityProjectRevision</a></code> | The revision of the source code being analyzed. |
| <code><a href="#projen.polaris.PolarisCoverityProject.property.scmUrl">scmUrl</a></code> | <code>string</code> | The URL of the source control repository for the project. |

---

##### `branch`<sup>Optional</sup> <a name="branch" id="projen.polaris.PolarisCoverityProject.property.branch"></a>

```typescript
public readonly branch: string;
```

- *Type:* string
- *Default:* not set

The branch being analyzed.

---

##### `captureDir`<sup>Optional</sup> <a name="captureDir" id="projen.polaris.PolarisCoverityProject.property.captureDir"></a>

```typescript
public readonly captureDir: string;
```

- *Type:* string
- *Default:* not set

The directory used to store capture artifacts.

---

##### `groups`<sup>Optional</sup> <a name="groups" id="projen.polaris.PolarisCoverityProject.property.groups"></a>

```typescript
public readonly groups: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* no groups

A mapping of group names to their role, e.g. "Observer", "Administrator" or "Contributor".

---

##### `name`<sup>Optional</sup> <a name="name" id="projen.polaris.PolarisCoverityProject.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string
- *Default:* not set

The name of the project in Polaris.

---

##### `organization`<sup>Optional</sup> <a name="organization" id="projen.polaris.PolarisCoverityProject.property.organization"></a>

```typescript
public readonly organization: string;
```

- *Type:* string
- *Default:* not set

The Polaris organization that the project belongs to.

---

##### `projectDir`<sup>Optional</sup> <a name="projectDir" id="projen.polaris.PolarisCoverityProject.property.projectDir"></a>

```typescript
public readonly projectDir: string;
```

- *Type:* string
- *Default:* not set

The directory containing the project source.

---

##### `properties`<sup>Optional</sup> <a name="properties" id="projen.polaris.PolarisCoverityProject.property.properties"></a>

```typescript
public readonly properties: {[ key: string ]: string | number};
```

- *Type:* {[ key: string ]: string | number}
- *Default:* no properties

Custom metadata properties to associate with the analysis.

---

##### `revision`<sup>Optional</sup> <a name="revision" id="projen.polaris.PolarisCoverityProject.property.revision"></a>

```typescript
public readonly revision: PolarisCoverityProjectRevision;
```

- *Type:* <a href="#projen.polaris.PolarisCoverityProjectRevision">PolarisCoverityProjectRevision</a>
- *Default:* not set

The revision of the source code being analyzed.

---

##### `scmUrl`<sup>Optional</sup> <a name="scmUrl" id="projen.polaris.PolarisCoverityProject.property.scmUrl"></a>

```typescript
public readonly scmUrl: string;
```

- *Type:* string
- *Default:* not set

The URL of the source control repository for the project.

---

### PolarisCoverityProjectRevision <a name="PolarisCoverityProjectRevision" id="projen.polaris.PolarisCoverityProjectRevision"></a>

The revision of the source code being analyzed.

#### Initializer <a name="Initializer" id="projen.polaris.PolarisCoverityProjectRevision.Initializer"></a>

```typescript
import { polaris } from 'projen'

const polarisCoverityProjectRevision: polaris.PolarisCoverityProjectRevision = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.PolarisCoverityProjectRevision.property.date">date</a></code> | <code>string</code> | The date the revision was created, in ISO 8601 format. |
| <code><a href="#projen.polaris.PolarisCoverityProjectRevision.property.modified">modified</a></code> | <code>boolean</code> | Whether the revision contains modifications that have not been committed. |
| <code><a href="#projen.polaris.PolarisCoverityProjectRevision.property.name">name</a></code> | <code>string</code> | An identifier for the revision. |

---

##### `date`<sup>Optional</sup> <a name="date" id="projen.polaris.PolarisCoverityProjectRevision.property.date"></a>

```typescript
public readonly date: string;
```

- *Type:* string
- *Default:* not set

The date the revision was created, in ISO 8601 format.

---

*Example*

```typescript
"2021-08-16T05:12:39Z"
```


##### `modified`<sup>Optional</sup> <a name="modified" id="projen.polaris.PolarisCoverityProjectRevision.property.modified"></a>

```typescript
public readonly modified: boolean;
```

- *Type:* boolean
- *Default:* false

Whether the revision contains modifications that have not been committed.

---

##### `name`<sup>Optional</sup> <a name="name" id="projen.polaris.PolarisCoverityProjectRevision.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string
- *Default:* not set

An identifier for the revision.

---



## Enums <a name="Enums" id="Enums"></a>

### PolarisCoverityAnalyzeMode <a name="PolarisCoverityAnalyzeMode" id="projen.polaris.PolarisCoverityAnalyzeMode"></a>

The environment in which analysis is executed.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.polaris.PolarisCoverityAnalyzeMode.LOCAL">LOCAL</a></code> | Analysis is executed on the local machine. |
| <code><a href="#projen.polaris.PolarisCoverityAnalyzeMode.CENTRAL">CENTRAL</a></code> | Analysis is executed on a central server. |

---

##### `LOCAL` <a name="LOCAL" id="projen.polaris.PolarisCoverityAnalyzeMode.LOCAL"></a>

Analysis is executed on the local machine.

---


##### `CENTRAL` <a name="CENTRAL" id="projen.polaris.PolarisCoverityAnalyzeMode.CENTRAL"></a>

Analysis is executed on a central server.

---


### PolarisCoverityLanguage <a name="PolarisCoverityLanguage" id="projen.polaris.PolarisCoverityLanguage"></a>

Languages supported by Coverity Thin Client capture.

> [https://docs.blackduck.com/r/polaris/continuous-integration-for-polaris/configuring-coverity-thin-client-for-use-with-bridge-cli-and-polaris.html](https://docs.blackduck.com/r/polaris/continuous-integration-for-polaris/configuring-coverity-thin-client-for-use-with-bridge-cli-and-polaris.html)

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.polaris.PolarisCoverityLanguage.APEX">APEX</a></code> | Apex. |
| <code><a href="#projen.polaris.PolarisCoverityLanguage.C_FAMILY">C_FAMILY</a></code> | C, C++, Objective C and Objective C++. |
| <code><a href="#projen.polaris.PolarisCoverityLanguage.CSHARP">CSHARP</a></code> | C#. |
| <code><a href="#projen.polaris.PolarisCoverityLanguage.GO">GO</a></code> | Go. |
| <code><a href="#projen.polaris.PolarisCoverityLanguage.JAVA">JAVA</a></code> | Java, including JSP and Android configuration files. |
| <code><a href="#projen.polaris.PolarisCoverityLanguage.JAVASCRIPT">JAVASCRIPT</a></code> | JavaScript, including TypeScript. |
| <code><a href="#projen.polaris.PolarisCoverityLanguage.KOTLIN">KOTLIN</a></code> | Kotlin. |
| <code><a href="#projen.polaris.PolarisCoverityLanguage.PHP">PHP</a></code> | PHP. |
| <code><a href="#projen.polaris.PolarisCoverityLanguage.PYTHON">PYTHON</a></code> | Python. |
| <code><a href="#projen.polaris.PolarisCoverityLanguage.RUBY">RUBY</a></code> | Ruby. |
| <code><a href="#projen.polaris.PolarisCoverityLanguage.SWIFT">SWIFT</a></code> | Swift. |
| <code><a href="#projen.polaris.PolarisCoverityLanguage.VB">VB</a></code> | Visual Basic. |

---

##### `APEX` <a name="APEX" id="projen.polaris.PolarisCoverityLanguage.APEX"></a>

Apex.

---


##### `C_FAMILY` <a name="C_FAMILY" id="projen.polaris.PolarisCoverityLanguage.C_FAMILY"></a>

C, C++, Objective C and Objective C++.

---


##### `CSHARP` <a name="CSHARP" id="projen.polaris.PolarisCoverityLanguage.CSHARP"></a>

C#.

---


##### `GO` <a name="GO" id="projen.polaris.PolarisCoverityLanguage.GO"></a>

Go.

---


##### `JAVA` <a name="JAVA" id="projen.polaris.PolarisCoverityLanguage.JAVA"></a>

Java, including JSP and Android configuration files.

---


##### `JAVASCRIPT` <a name="JAVASCRIPT" id="projen.polaris.PolarisCoverityLanguage.JAVASCRIPT"></a>

JavaScript, including TypeScript.

---


##### `KOTLIN` <a name="KOTLIN" id="projen.polaris.PolarisCoverityLanguage.KOTLIN"></a>

Kotlin.

---


##### `PHP` <a name="PHP" id="projen.polaris.PolarisCoverityLanguage.PHP"></a>

PHP.

---


##### `PYTHON` <a name="PYTHON" id="projen.polaris.PolarisCoverityLanguage.PYTHON"></a>

Python.

---


##### `RUBY` <a name="RUBY" id="projen.polaris.PolarisCoverityLanguage.RUBY"></a>

Ruby.

---


##### `SWIFT` <a name="SWIFT" id="projen.polaris.PolarisCoverityLanguage.SWIFT"></a>

Swift.

---


##### `VB` <a name="VB" id="projen.polaris.PolarisCoverityLanguage.VB"></a>

Visual Basic.

---

