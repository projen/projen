# `vscode` Submodule <a name="`vscode` Submodule" id="projen.vscode"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### DevContainer <a name="DevContainer" id="projen.vscode.DevContainer"></a>

- *Implements:* <a href="#projen.vscode.IDevContainerEnvironment">IDevContainerEnvironment</a>

A development environment running VSCode in a container;

used by GitHub
codespaces.

#### Initializers <a name="Initializers" id="projen.vscode.DevContainer.Initializer"></a>

```typescript
import { vscode } from 'projen'

new vscode.DevContainer(project: Project, options?: DevContainerOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.vscode.DevContainer.Initializer.parameter.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.vscode.DevContainer.Initializer.parameter.options">options</a></code> | <code><a href="#projen.vscode.DevContainerOptions">DevContainerOptions</a></code> | *No description.* |

---

##### `project`<sup>Required</sup> <a name="project" id="projen.vscode.DevContainer.Initializer.parameter.project"></a>

- *Type:* projen.Project

---

##### `options`<sup>Optional</sup> <a name="options" id="projen.vscode.DevContainer.Initializer.parameter.options"></a>

- *Type:* <a href="#projen.vscode.DevContainerOptions">DevContainerOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.vscode.DevContainer.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen.vscode.DevContainer.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen.vscode.DevContainer.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen.vscode.DevContainer.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |
| <code><a href="#projen.vscode.DevContainer.addDockerImage">addDockerImage</a></code> | Add a custom Docker image or Dockerfile for the container. |
| <code><a href="#projen.vscode.DevContainer.addFeatures">addFeatures</a></code> | Adds a list of VSCode features that should be automatically installed in the container. |
| <code><a href="#projen.vscode.DevContainer.addPorts">addPorts</a></code> | Adds ports that should be exposed (forwarded) from the container. |
| <code><a href="#projen.vscode.DevContainer.addTasks">addTasks</a></code> | Adds tasks to run when the container starts. |
| <code><a href="#projen.vscode.DevContainer.addVscodeExtensions">addVscodeExtensions</a></code> | Adds a list of VSCode extensions that should be automatically installed in the container. |

---

##### `toString` <a name="toString" id="projen.vscode.DevContainer.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `postSynthesize` <a name="postSynthesize" id="projen.vscode.DevContainer.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen.vscode.DevContainer.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `synthesize` <a name="synthesize" id="projen.vscode.DevContainer.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

##### `addDockerImage` <a name="addDockerImage" id="projen.vscode.DevContainer.addDockerImage"></a>

```typescript
public addDockerImage(image: DevEnvironmentDockerImage): void
```

Add a custom Docker image or Dockerfile for the container.

###### `image`<sup>Required</sup> <a name="image" id="projen.vscode.DevContainer.addDockerImage.parameter.image"></a>

- *Type:* projen.DevEnvironmentDockerImage

---

##### `addFeatures` <a name="addFeatures" id="projen.vscode.DevContainer.addFeatures"></a>

```typescript
public addFeatures(features: ...DevContainerFeature[]): void
```

Adds a list of VSCode features that should be automatically installed in the container.

###### `features`<sup>Required</sup> <a name="features" id="projen.vscode.DevContainer.addFeatures.parameter.features"></a>

- *Type:* ...<a href="#projen.vscode.DevContainerFeature">DevContainerFeature</a>[]

featureName and version(optional default: latest).

---

##### `addPorts` <a name="addPorts" id="projen.vscode.DevContainer.addPorts"></a>

```typescript
public addPorts(ports: ...string[]): void
```

Adds ports that should be exposed (forwarded) from the container.

###### `ports`<sup>Required</sup> <a name="ports" id="projen.vscode.DevContainer.addPorts.parameter.ports"></a>

- *Type:* ...string[]

The new ports.

---

##### `addTasks` <a name="addTasks" id="projen.vscode.DevContainer.addTasks"></a>

```typescript
public addTasks(tasks: ...Task[]): void
```

Adds tasks to run when the container starts.

Tasks will be run in sequence.

###### `tasks`<sup>Required</sup> <a name="tasks" id="projen.vscode.DevContainer.addTasks.parameter.tasks"></a>

- *Type:* ...projen.Task[]

The new tasks.

---

##### `addVscodeExtensions` <a name="addVscodeExtensions" id="projen.vscode.DevContainer.addVscodeExtensions"></a>

```typescript
public addVscodeExtensions(extensions: ...string[]): void
```

Adds a list of VSCode extensions that should be automatically installed in the container.

###### `extensions`<sup>Required</sup> <a name="extensions" id="projen.vscode.DevContainer.addVscodeExtensions.parameter.extensions"></a>

- *Type:* ...string[]

The extension IDs.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.vscode.DevContainer.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen.vscode.DevContainer.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="projen.vscode.DevContainer.isConstruct"></a>

```typescript
import { vscode } from 'projen'

vscode.DevContainer.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="projen.vscode.DevContainer.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen.vscode.DevContainer.isComponent"></a>

```typescript
import { vscode } from 'projen'

vscode.DevContainer.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen.vscode.DevContainer.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.vscode.DevContainer.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen.vscode.DevContainer.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.vscode.DevContainer.property.config">config</a></code> | <code>any</code> | Direct access to the devcontainer configuration (escape hatch). |

---

##### `node`<sup>Required</sup> <a name="node" id="projen.vscode.DevContainer.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen.vscode.DevContainer.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---

##### `config`<sup>Required</sup> <a name="config" id="projen.vscode.DevContainer.property.config"></a>

```typescript
public readonly config: any;
```

- *Type:* any

Direct access to the devcontainer configuration (escape hatch).

---


### VsCode <a name="VsCode" id="projen.vscode.VsCode"></a>

#### Initializers <a name="Initializers" id="projen.vscode.VsCode.Initializer"></a>

```typescript
import { vscode } from 'projen'

new vscode.VsCode(project: Project)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.vscode.VsCode.Initializer.parameter.project">project</a></code> | <code>projen.Project</code> | *No description.* |

---

##### `project`<sup>Required</sup> <a name="project" id="projen.vscode.VsCode.Initializer.parameter.project"></a>

- *Type:* projen.Project

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.vscode.VsCode.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen.vscode.VsCode.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen.vscode.VsCode.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen.vscode.VsCode.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |

---

##### `toString` <a name="toString" id="projen.vscode.VsCode.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `postSynthesize` <a name="postSynthesize" id="projen.vscode.VsCode.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen.vscode.VsCode.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `synthesize` <a name="synthesize" id="projen.vscode.VsCode.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.vscode.VsCode.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen.vscode.VsCode.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="projen.vscode.VsCode.isConstruct"></a>

```typescript
import { vscode } from 'projen'

vscode.VsCode.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="projen.vscode.VsCode.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen.vscode.VsCode.isComponent"></a>

```typescript
import { vscode } from 'projen'

vscode.VsCode.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen.vscode.VsCode.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.vscode.VsCode.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen.vscode.VsCode.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.vscode.VsCode.property.extensions">extensions</a></code> | <code><a href="#projen.vscode.VsCodeRecommendedExtensions">VsCodeRecommendedExtensions</a></code> | *No description.* |
| <code><a href="#projen.vscode.VsCode.property.launchConfiguration">launchConfiguration</a></code> | <code><a href="#projen.vscode.VsCodeLaunchConfig">VsCodeLaunchConfig</a></code> | *No description.* |
| <code><a href="#projen.vscode.VsCode.property.settings">settings</a></code> | <code><a href="#projen.vscode.VsCodeSettings">VsCodeSettings</a></code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="projen.vscode.VsCode.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen.vscode.VsCode.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---

##### `extensions`<sup>Required</sup> <a name="extensions" id="projen.vscode.VsCode.property.extensions"></a>

```typescript
public readonly extensions: VsCodeRecommendedExtensions;
```

- *Type:* <a href="#projen.vscode.VsCodeRecommendedExtensions">VsCodeRecommendedExtensions</a>

---

##### `launchConfiguration`<sup>Required</sup> <a name="launchConfiguration" id="projen.vscode.VsCode.property.launchConfiguration"></a>

```typescript
public readonly launchConfiguration: VsCodeLaunchConfig;
```

- *Type:* <a href="#projen.vscode.VsCodeLaunchConfig">VsCodeLaunchConfig</a>

---

##### `settings`<sup>Required</sup> <a name="settings" id="projen.vscode.VsCode.property.settings"></a>

```typescript
public readonly settings: VsCodeSettings;
```

- *Type:* <a href="#projen.vscode.VsCodeSettings">VsCodeSettings</a>

---


### VsCodeLaunchConfig <a name="VsCodeLaunchConfig" id="projen.vscode.VsCodeLaunchConfig"></a>

VSCode launch configuration file (launch.json), useful for enabling in-editor debugger.

#### Initializers <a name="Initializers" id="projen.vscode.VsCodeLaunchConfig.Initializer"></a>

```typescript
import { vscode } from 'projen'

new vscode.VsCodeLaunchConfig(vscode: VsCode)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.vscode.VsCodeLaunchConfig.Initializer.parameter.vscode">vscode</a></code> | <code><a href="#projen.vscode.VsCode">VsCode</a></code> | *No description.* |

---

##### `vscode`<sup>Required</sup> <a name="vscode" id="projen.vscode.VsCodeLaunchConfig.Initializer.parameter.vscode"></a>

- *Type:* <a href="#projen.vscode.VsCode">VsCode</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.vscode.VsCodeLaunchConfig.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen.vscode.VsCodeLaunchConfig.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen.vscode.VsCodeLaunchConfig.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen.vscode.VsCodeLaunchConfig.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |
| <code><a href="#projen.vscode.VsCodeLaunchConfig.addCommandInput">addCommandInput</a></code> | Adds an input variable with type `command` to `.vscode/launch.json`. |
| <code><a href="#projen.vscode.VsCodeLaunchConfig.addConfiguration">addConfiguration</a></code> | Adds a VsCodeLaunchConfigurationEntry (e.g. a node.js debugger) to `.vscode/launch.json. Each configuration entry has following mandatory fields: type, request and name. See https://code.visualstudio.com/docs/editor/debugging#_launchjson-attributes for details. |
| <code><a href="#projen.vscode.VsCodeLaunchConfig.addPickStringInput">addPickStringInput</a></code> | Adds an input variable with type `pickString` to `.vscode/launch.json`. |
| <code><a href="#projen.vscode.VsCodeLaunchConfig.addPromptStringInput">addPromptStringInput</a></code> | Adds an input variable with type `promptString` to `.vscode/launch.json`. |

---

##### `toString` <a name="toString" id="projen.vscode.VsCodeLaunchConfig.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `postSynthesize` <a name="postSynthesize" id="projen.vscode.VsCodeLaunchConfig.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen.vscode.VsCodeLaunchConfig.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `synthesize` <a name="synthesize" id="projen.vscode.VsCodeLaunchConfig.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

##### `addCommandInput` <a name="addCommandInput" id="projen.vscode.VsCodeLaunchConfig.addCommandInput"></a>

```typescript
public addCommandInput(cfg: VsCodeLaunchCommandInputEntry): void
```

Adds an input variable with type `command` to `.vscode/launch.json`.

See https://code.visualstudio.com/docs/editor/variables-reference#_input-variables for details.

###### `cfg`<sup>Required</sup> <a name="cfg" id="projen.vscode.VsCodeLaunchConfig.addCommandInput.parameter.cfg"></a>

- *Type:* <a href="#projen.vscode.VsCodeLaunchCommandInputEntry">VsCodeLaunchCommandInputEntry</a>

VsCodeLaunchCommandInputEntry.

---

##### `addConfiguration` <a name="addConfiguration" id="projen.vscode.VsCodeLaunchConfig.addConfiguration"></a>

```typescript
public addConfiguration(cfg: VsCodeLaunchConfigurationEntry): void
```

Adds a VsCodeLaunchConfigurationEntry (e.g. a node.js debugger) to `.vscode/launch.json. Each configuration entry has following mandatory fields: type, request and name. See https://code.visualstudio.com/docs/editor/debugging#_launchjson-attributes for details.

###### `cfg`<sup>Required</sup> <a name="cfg" id="projen.vscode.VsCodeLaunchConfig.addConfiguration.parameter.cfg"></a>

- *Type:* <a href="#projen.vscode.VsCodeLaunchConfigurationEntry">VsCodeLaunchConfigurationEntry</a>

VsCodeLaunchConfigurationEntry.

---

##### `addPickStringInput` <a name="addPickStringInput" id="projen.vscode.VsCodeLaunchConfig.addPickStringInput"></a>

```typescript
public addPickStringInput(cfg: VsCodeLaunchPickStringInputEntry): void
```

Adds an input variable with type `pickString` to `.vscode/launch.json`.

See https://code.visualstudio.com/docs/editor/variables-reference#_input-variables for details.

###### `cfg`<sup>Required</sup> <a name="cfg" id="projen.vscode.VsCodeLaunchConfig.addPickStringInput.parameter.cfg"></a>

- *Type:* <a href="#projen.vscode.VsCodeLaunchPickStringInputEntry">VsCodeLaunchPickStringInputEntry</a>

VsCodeLaunchPickStringInputEntry.

---

##### `addPromptStringInput` <a name="addPromptStringInput" id="projen.vscode.VsCodeLaunchConfig.addPromptStringInput"></a>

```typescript
public addPromptStringInput(cfg: VsCodeLaunchPromptStringInputEntry): void
```

Adds an input variable with type `promptString` to `.vscode/launch.json`.

See https://code.visualstudio.com/docs/editor/variables-reference#_input-variables for details.

###### `cfg`<sup>Required</sup> <a name="cfg" id="projen.vscode.VsCodeLaunchConfig.addPromptStringInput.parameter.cfg"></a>

- *Type:* <a href="#projen.vscode.VsCodeLaunchPromptStringInputEntry">VsCodeLaunchPromptStringInputEntry</a>

VsCodeLaunchPromptStringInputEntry.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.vscode.VsCodeLaunchConfig.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen.vscode.VsCodeLaunchConfig.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="projen.vscode.VsCodeLaunchConfig.isConstruct"></a>

```typescript
import { vscode } from 'projen'

vscode.VsCodeLaunchConfig.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="projen.vscode.VsCodeLaunchConfig.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen.vscode.VsCodeLaunchConfig.isComponent"></a>

```typescript
import { vscode } from 'projen'

vscode.VsCodeLaunchConfig.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen.vscode.VsCodeLaunchConfig.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.vscode.VsCodeLaunchConfig.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen.vscode.VsCodeLaunchConfig.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.vscode.VsCodeLaunchConfig.property.file">file</a></code> | <code>projen.JsonFile</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="projen.vscode.VsCodeLaunchConfig.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen.vscode.VsCodeLaunchConfig.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---

##### `file`<sup>Required</sup> <a name="file" id="projen.vscode.VsCodeLaunchConfig.property.file"></a>

```typescript
public readonly file: JsonFile;
```

- *Type:* projen.JsonFile

---


### VsCodeRecommendedExtensions <a name="VsCodeRecommendedExtensions" id="projen.vscode.VsCodeRecommendedExtensions"></a>

VS Code Workspace recommended extensions Source: https://code.visualstudio.com/docs/editor/extension-marketplace#_workspace-recommended-extensions.

#### Initializers <a name="Initializers" id="projen.vscode.VsCodeRecommendedExtensions.Initializer"></a>

```typescript
import { vscode } from 'projen'

new vscode.VsCodeRecommendedExtensions(vscode: VsCode)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.vscode.VsCodeRecommendedExtensions.Initializer.parameter.vscode">vscode</a></code> | <code><a href="#projen.vscode.VsCode">VsCode</a></code> | *No description.* |

---

##### `vscode`<sup>Required</sup> <a name="vscode" id="projen.vscode.VsCodeRecommendedExtensions.Initializer.parameter.vscode"></a>

- *Type:* <a href="#projen.vscode.VsCode">VsCode</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.vscode.VsCodeRecommendedExtensions.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen.vscode.VsCodeRecommendedExtensions.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen.vscode.VsCodeRecommendedExtensions.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen.vscode.VsCodeRecommendedExtensions.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |
| <code><a href="#projen.vscode.VsCodeRecommendedExtensions.addRecommendations">addRecommendations</a></code> | Adds a list of VS Code extensions as recommendations for this workspace. |
| <code><a href="#projen.vscode.VsCodeRecommendedExtensions.addUnwantedRecommendations">addUnwantedRecommendations</a></code> | Marks a list of VS Code extensions as unwanted recommendations for this workspace. |

---

##### `toString` <a name="toString" id="projen.vscode.VsCodeRecommendedExtensions.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `postSynthesize` <a name="postSynthesize" id="projen.vscode.VsCodeRecommendedExtensions.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen.vscode.VsCodeRecommendedExtensions.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `synthesize` <a name="synthesize" id="projen.vscode.VsCodeRecommendedExtensions.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

##### `addRecommendations` <a name="addRecommendations" id="projen.vscode.VsCodeRecommendedExtensions.addRecommendations"></a>

```typescript
public addRecommendations(extensions: ...string[]): void
```

Adds a list of VS Code extensions as recommendations for this workspace.

###### `extensions`<sup>Required</sup> <a name="extensions" id="projen.vscode.VsCodeRecommendedExtensions.addRecommendations.parameter.extensions"></a>

- *Type:* ...string[]

The extension IDs.

---

##### `addUnwantedRecommendations` <a name="addUnwantedRecommendations" id="projen.vscode.VsCodeRecommendedExtensions.addUnwantedRecommendations"></a>

```typescript
public addUnwantedRecommendations(extensions: ...string[]): void
```

Marks a list of VS Code extensions as unwanted recommendations for this workspace.

VS Code should not be recommend these extensions for users of this workspace.

###### `extensions`<sup>Required</sup> <a name="extensions" id="projen.vscode.VsCodeRecommendedExtensions.addUnwantedRecommendations.parameter.extensions"></a>

- *Type:* ...string[]

The extension IDs.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.vscode.VsCodeRecommendedExtensions.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen.vscode.VsCodeRecommendedExtensions.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="projen.vscode.VsCodeRecommendedExtensions.isConstruct"></a>

```typescript
import { vscode } from 'projen'

vscode.VsCodeRecommendedExtensions.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="projen.vscode.VsCodeRecommendedExtensions.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen.vscode.VsCodeRecommendedExtensions.isComponent"></a>

```typescript
import { vscode } from 'projen'

vscode.VsCodeRecommendedExtensions.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen.vscode.VsCodeRecommendedExtensions.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.vscode.VsCodeRecommendedExtensions.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen.vscode.VsCodeRecommendedExtensions.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.vscode.VsCodeRecommendedExtensions.property.file">file</a></code> | <code>projen.JsonFile</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="projen.vscode.VsCodeRecommendedExtensions.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen.vscode.VsCodeRecommendedExtensions.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---

##### `file`<sup>Required</sup> <a name="file" id="projen.vscode.VsCodeRecommendedExtensions.property.file"></a>

```typescript
public readonly file: JsonFile;
```

- *Type:* projen.JsonFile

---


### VsCodeSettings <a name="VsCodeSettings" id="projen.vscode.VsCodeSettings"></a>

VS Code Workspace settings Source: https://code.visualstudio.com/docs/getstarted/settings#_workspace-settings.

#### Initializers <a name="Initializers" id="projen.vscode.VsCodeSettings.Initializer"></a>

```typescript
import { vscode } from 'projen'

new vscode.VsCodeSettings(vscode: VsCode)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.vscode.VsCodeSettings.Initializer.parameter.vscode">vscode</a></code> | <code><a href="#projen.vscode.VsCode">VsCode</a></code> | *No description.* |

---

##### `vscode`<sup>Required</sup> <a name="vscode" id="projen.vscode.VsCodeSettings.Initializer.parameter.vscode"></a>

- *Type:* <a href="#projen.vscode.VsCode">VsCode</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.vscode.VsCodeSettings.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen.vscode.VsCodeSettings.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen.vscode.VsCodeSettings.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen.vscode.VsCodeSettings.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |
| <code><a href="#projen.vscode.VsCodeSettings.addSetting">addSetting</a></code> | Adds a workspace setting. |
| <code><a href="#projen.vscode.VsCodeSettings.addSettings">addSettings</a></code> | Adds a workspace setting. |

---

##### `toString` <a name="toString" id="projen.vscode.VsCodeSettings.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `postSynthesize` <a name="postSynthesize" id="projen.vscode.VsCodeSettings.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen.vscode.VsCodeSettings.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `synthesize` <a name="synthesize" id="projen.vscode.VsCodeSettings.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

##### `addSetting` <a name="addSetting" id="projen.vscode.VsCodeSettings.addSetting"></a>

```typescript
public addSetting(setting: string, value: any, language?: string): void
```

Adds a workspace setting.

###### `setting`<sup>Required</sup> <a name="setting" id="projen.vscode.VsCodeSettings.addSetting.parameter.setting"></a>

- *Type:* string

The setting ID.

---

###### `value`<sup>Required</sup> <a name="value" id="projen.vscode.VsCodeSettings.addSetting.parameter.value"></a>

- *Type:* any

The value of the setting.

---

###### `language`<sup>Optional</sup> <a name="language" id="projen.vscode.VsCodeSettings.addSetting.parameter.language"></a>

- *Type:* string

Scope the setting to a specific language.

---

##### `addSettings` <a name="addSettings" id="projen.vscode.VsCodeSettings.addSettings"></a>

```typescript
public addSettings(settings: {[ key: string ]: any}, languages?: string | string[]): void
```

Adds a workspace setting.

###### `settings`<sup>Required</sup> <a name="settings" id="projen.vscode.VsCodeSettings.addSettings.parameter.settings"></a>

- *Type:* {[ key: string ]: any}

Array structure: [setting: string, value: any, languages?: string[]].

---

###### `languages`<sup>Optional</sup> <a name="languages" id="projen.vscode.VsCodeSettings.addSettings.parameter.languages"></a>

- *Type:* string | string[]

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.vscode.VsCodeSettings.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen.vscode.VsCodeSettings.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="projen.vscode.VsCodeSettings.isConstruct"></a>

```typescript
import { vscode } from 'projen'

vscode.VsCodeSettings.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="projen.vscode.VsCodeSettings.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen.vscode.VsCodeSettings.isComponent"></a>

```typescript
import { vscode } from 'projen'

vscode.VsCodeSettings.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen.vscode.VsCodeSettings.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.vscode.VsCodeSettings.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen.vscode.VsCodeSettings.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.vscode.VsCodeSettings.property.file">file</a></code> | <code>projen.JsonFile</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="projen.vscode.VsCodeSettings.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen.vscode.VsCodeSettings.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---

##### `file`<sup>Required</sup> <a name="file" id="projen.vscode.VsCodeSettings.property.file"></a>

```typescript
public readonly file: JsonFile;
```

- *Type:* projen.JsonFile

---


## Structs <a name="Structs" id="Structs"></a>

### DevContainerFeature <a name="DevContainerFeature" id="projen.vscode.DevContainerFeature"></a>

devcontainer features options.

> [https://containers.dev/implementors/features/#devcontainer-json-properties](https://containers.dev/implementors/features/#devcontainer-json-properties)

#### Initializer <a name="Initializer" id="projen.vscode.DevContainerFeature.Initializer"></a>

```typescript
import { vscode } from 'projen'

const devContainerFeature: vscode.DevContainerFeature = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.vscode.DevContainerFeature.property.name">name</a></code> | <code>string</code> | feature name. |
| <code><a href="#projen.vscode.DevContainerFeature.property.version">version</a></code> | <code>string</code> | feature version. |

---

##### `name`<sup>Required</sup> <a name="name" id="projen.vscode.DevContainerFeature.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

feature name.

---

##### `version`<sup>Optional</sup> <a name="version" id="projen.vscode.DevContainerFeature.property.version"></a>

```typescript
public readonly version: string;
```

- *Type:* string
- *Default:* latest

feature version.

---

### DevContainerOptions <a name="DevContainerOptions" id="projen.vscode.DevContainerOptions"></a>

Constructor options for the DevContainer component.

The default docker image used for GitHub Codespaces is defined here:

> [https://github.com/microsoft/vscode-dev-containers/tree/master/containers/codespaces-linux](https://github.com/microsoft/vscode-dev-containers/tree/master/containers/codespaces-linux)

#### Initializer <a name="Initializer" id="projen.vscode.DevContainerOptions.Initializer"></a>

```typescript
import { vscode } from 'projen'

const devContainerOptions: vscode.DevContainerOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.vscode.DevContainerOptions.property.dockerImage">dockerImage</a></code> | <code>projen.DevEnvironmentDockerImage</code> | A Docker image or Dockerfile for the container. |
| <code><a href="#projen.vscode.DevContainerOptions.property.ports">ports</a></code> | <code>string[]</code> | An array of ports that should be exposed from the container. |
| <code><a href="#projen.vscode.DevContainerOptions.property.tasks">tasks</a></code> | <code>projen.Task[]</code> | An array of tasks that should be run when the container starts. |
| <code><a href="#projen.vscode.DevContainerOptions.property.vscodeExtensions">vscodeExtensions</a></code> | <code>string[]</code> | An array of extension IDs that specify the extensions that should be installed inside the container when it is created. |
| <code><a href="#projen.vscode.DevContainerOptions.property.features">features</a></code> | <code><a href="#projen.vscode.DevContainerFeature">DevContainerFeature</a>[]</code> | An array of VSCode features that specify the features that should be installed inside the container when it is created. |

---

##### `dockerImage`<sup>Optional</sup> <a name="dockerImage" id="projen.vscode.DevContainerOptions.property.dockerImage"></a>

```typescript
public readonly dockerImage: DevEnvironmentDockerImage;
```

- *Type:* projen.DevEnvironmentDockerImage

A Docker image or Dockerfile for the container.

---

##### `ports`<sup>Optional</sup> <a name="ports" id="projen.vscode.DevContainerOptions.property.ports"></a>

```typescript
public readonly ports: string[];
```

- *Type:* string[]

An array of ports that should be exposed from the container.

---

##### `tasks`<sup>Optional</sup> <a name="tasks" id="projen.vscode.DevContainerOptions.property.tasks"></a>

```typescript
public readonly tasks: Task[];
```

- *Type:* projen.Task[]

An array of tasks that should be run when the container starts.

---

##### `vscodeExtensions`<sup>Optional</sup> <a name="vscodeExtensions" id="projen.vscode.DevContainerOptions.property.vscodeExtensions"></a>

```typescript
public readonly vscodeExtensions: string[];
```

- *Type:* string[]

An array of extension IDs that specify the extensions that should be installed inside the container when it is created.

---

##### `features`<sup>Optional</sup> <a name="features" id="projen.vscode.DevContainerOptions.property.features"></a>

```typescript
public readonly features: DevContainerFeature[];
```

- *Type:* <a href="#projen.vscode.DevContainerFeature">DevContainerFeature</a>[]

An array of VSCode features that specify the features that should be installed inside the container when it is created.

---

### Presentation <a name="Presentation" id="projen.vscode.Presentation"></a>

VSCode launch configuration Presentation interface "using the order, group, and hidden attributes in the presentation object you can sort, group, and hide configurations and compounds in the Debug configuration dropdown and in the Debug quick pick." Source: https://code.visualstudio.com/docs/editor/debugging#_launchjson-attributes.

#### Initializer <a name="Initializer" id="projen.vscode.Presentation.Initializer"></a>

```typescript
import { vscode } from 'projen'

const presentation: vscode.Presentation = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.vscode.Presentation.property.group">group</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.vscode.Presentation.property.hidden">hidden</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#projen.vscode.Presentation.property.order">order</a></code> | <code>number</code> | *No description.* |

---

##### `group`<sup>Required</sup> <a name="group" id="projen.vscode.Presentation.property.group"></a>

```typescript
public readonly group: string;
```

- *Type:* string

---

##### `hidden`<sup>Required</sup> <a name="hidden" id="projen.vscode.Presentation.property.hidden"></a>

```typescript
public readonly hidden: boolean;
```

- *Type:* boolean

---

##### `order`<sup>Required</sup> <a name="order" id="projen.vscode.Presentation.property.order"></a>

```typescript
public readonly order: number;
```

- *Type:* number

---

### ServerReadyAction <a name="ServerReadyAction" id="projen.vscode.ServerReadyAction"></a>

VSCode launch configuration ServerReadyAction interface "if you want to open a URL in a web browser whenever the program under debugging outputs a specific message to the debug console or integrated terminal." Source: https://code.visualstudio.com/docs/editor/debugging#_launchjson-attributes.

#### Initializer <a name="Initializer" id="projen.vscode.ServerReadyAction.Initializer"></a>

```typescript
import { vscode } from 'projen'

const serverReadyAction: vscode.ServerReadyAction = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.vscode.ServerReadyAction.property.action">action</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.vscode.ServerReadyAction.property.pattern">pattern</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.vscode.ServerReadyAction.property.uriFormat">uriFormat</a></code> | <code>string</code> | *No description.* |

---

##### `action`<sup>Required</sup> <a name="action" id="projen.vscode.ServerReadyAction.property.action"></a>

```typescript
public readonly action: string;
```

- *Type:* string

---

##### `pattern`<sup>Optional</sup> <a name="pattern" id="projen.vscode.ServerReadyAction.property.pattern"></a>

```typescript
public readonly pattern: string;
```

- *Type:* string

---

##### `uriFormat`<sup>Optional</sup> <a name="uriFormat" id="projen.vscode.ServerReadyAction.property.uriFormat"></a>

```typescript
public readonly uriFormat: string;
```

- *Type:* string

---

### VsCodeLaunchCommandInputEntry <a name="VsCodeLaunchCommandInputEntry" id="projen.vscode.VsCodeLaunchCommandInputEntry"></a>

Options for a 'VsCodeLaunchCommandInputEntry' Source: https://code.visualstudio.com/docs/editor/variables-reference#_input-variables.

#### Initializer <a name="Initializer" id="projen.vscode.VsCodeLaunchCommandInputEntry.Initializer"></a>

```typescript
import { vscode } from 'projen'

const vsCodeLaunchCommandInputEntry: vscode.VsCodeLaunchCommandInputEntry = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.vscode.VsCodeLaunchCommandInputEntry.property.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.vscode.VsCodeLaunchCommandInputEntry.property.command">command</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.vscode.VsCodeLaunchCommandInputEntry.property.args">args</a></code> | <code>any</code> | *No description.* |

---

##### `id`<sup>Required</sup> <a name="id" id="projen.vscode.VsCodeLaunchCommandInputEntry.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---

##### `command`<sup>Required</sup> <a name="command" id="projen.vscode.VsCodeLaunchCommandInputEntry.property.command"></a>

```typescript
public readonly command: string;
```

- *Type:* string

---

##### `args`<sup>Optional</sup> <a name="args" id="projen.vscode.VsCodeLaunchCommandInputEntry.property.args"></a>

```typescript
public readonly args: any;
```

- *Type:* any

---

### VsCodeLaunchConfigurationEntry <a name="VsCodeLaunchConfigurationEntry" id="projen.vscode.VsCodeLaunchConfigurationEntry"></a>

Options for a 'VsCodeLaunchConfigurationEntry' Source: https://code.visualstudio.com/docs/editor/debugging#_launchjson-attributes.

#### Initializer <a name="Initializer" id="projen.vscode.VsCodeLaunchConfigurationEntry.Initializer"></a>

```typescript
import { vscode } from 'projen'

const vsCodeLaunchConfigurationEntry: vscode.VsCodeLaunchConfigurationEntry = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.vscode.VsCodeLaunchConfigurationEntry.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.vscode.VsCodeLaunchConfigurationEntry.property.request">request</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.vscode.VsCodeLaunchConfigurationEntry.property.type">type</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.vscode.VsCodeLaunchConfigurationEntry.property.args">args</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen.vscode.VsCodeLaunchConfigurationEntry.property.console">console</a></code> | <code><a href="#projen.vscode.Console">Console</a></code> | *No description.* |
| <code><a href="#projen.vscode.VsCodeLaunchConfigurationEntry.property.cwd">cwd</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.vscode.VsCodeLaunchConfigurationEntry.property.debugServer">debugServer</a></code> | <code>number</code> | *No description.* |
| <code><a href="#projen.vscode.VsCodeLaunchConfigurationEntry.property.disableOptimisticBPs">disableOptimisticBPs</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#projen.vscode.VsCodeLaunchConfigurationEntry.property.env">env</a></code> | <code>{[ key: string ]: string \| boolean}</code> | Set value to `false` to unset an existing environment variable. |
| <code><a href="#projen.vscode.VsCodeLaunchConfigurationEntry.property.envFile">envFile</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.vscode.VsCodeLaunchConfigurationEntry.property.internalConsoleOptions">internalConsoleOptions</a></code> | <code><a href="#projen.vscode.InternalConsoleOptions">InternalConsoleOptions</a></code> | *No description.* |
| <code><a href="#projen.vscode.VsCodeLaunchConfigurationEntry.property.outFiles">outFiles</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen.vscode.VsCodeLaunchConfigurationEntry.property.port">port</a></code> | <code>number</code> | *No description.* |
| <code><a href="#projen.vscode.VsCodeLaunchConfigurationEntry.property.postDebugTask">postDebugTask</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.vscode.VsCodeLaunchConfigurationEntry.property.preLaunchTask">preLaunchTask</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.vscode.VsCodeLaunchConfigurationEntry.property.presentation">presentation</a></code> | <code><a href="#projen.vscode.Presentation">Presentation</a></code> | *No description.* |
| <code><a href="#projen.vscode.VsCodeLaunchConfigurationEntry.property.program">program</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.vscode.VsCodeLaunchConfigurationEntry.property.runtimeArgs">runtimeArgs</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen.vscode.VsCodeLaunchConfigurationEntry.property.serverReadyAction">serverReadyAction</a></code> | <code><a href="#projen.vscode.ServerReadyAction">ServerReadyAction</a></code> | *No description.* |
| <code><a href="#projen.vscode.VsCodeLaunchConfigurationEntry.property.skipFiles">skipFiles</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen.vscode.VsCodeLaunchConfigurationEntry.property.stopOnEntry">stopOnEntry</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#projen.vscode.VsCodeLaunchConfigurationEntry.property.url">url</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.vscode.VsCodeLaunchConfigurationEntry.property.webRoot">webRoot</a></code> | <code>string</code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="projen.vscode.VsCodeLaunchConfigurationEntry.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `request`<sup>Required</sup> <a name="request" id="projen.vscode.VsCodeLaunchConfigurationEntry.property.request"></a>

```typescript
public readonly request: string;
```

- *Type:* string

---

##### `type`<sup>Required</sup> <a name="type" id="projen.vscode.VsCodeLaunchConfigurationEntry.property.type"></a>

```typescript
public readonly type: string;
```

- *Type:* string

---

##### `args`<sup>Optional</sup> <a name="args" id="projen.vscode.VsCodeLaunchConfigurationEntry.property.args"></a>

```typescript
public readonly args: string[];
```

- *Type:* string[]

---

##### `console`<sup>Optional</sup> <a name="console" id="projen.vscode.VsCodeLaunchConfigurationEntry.property.console"></a>

```typescript
public readonly console: Console;
```

- *Type:* <a href="#projen.vscode.Console">Console</a>

---

##### `cwd`<sup>Optional</sup> <a name="cwd" id="projen.vscode.VsCodeLaunchConfigurationEntry.property.cwd"></a>

```typescript
public readonly cwd: string;
```

- *Type:* string

---

##### `debugServer`<sup>Optional</sup> <a name="debugServer" id="projen.vscode.VsCodeLaunchConfigurationEntry.property.debugServer"></a>

```typescript
public readonly debugServer: number;
```

- *Type:* number

---

##### `disableOptimisticBPs`<sup>Optional</sup> <a name="disableOptimisticBPs" id="projen.vscode.VsCodeLaunchConfigurationEntry.property.disableOptimisticBPs"></a>

```typescript
public readonly disableOptimisticBPs: boolean;
```

- *Type:* boolean

---

##### `env`<sup>Optional</sup> <a name="env" id="projen.vscode.VsCodeLaunchConfigurationEntry.property.env"></a>

```typescript
public readonly env: {[ key: string ]: string | boolean};
```

- *Type:* {[ key: string ]: string | boolean}

Set value to `false` to unset an existing environment variable.

---

##### `envFile`<sup>Optional</sup> <a name="envFile" id="projen.vscode.VsCodeLaunchConfigurationEntry.property.envFile"></a>

```typescript
public readonly envFile: string;
```

- *Type:* string

---

##### `internalConsoleOptions`<sup>Optional</sup> <a name="internalConsoleOptions" id="projen.vscode.VsCodeLaunchConfigurationEntry.property.internalConsoleOptions"></a>

```typescript
public readonly internalConsoleOptions: InternalConsoleOptions;
```

- *Type:* <a href="#projen.vscode.InternalConsoleOptions">InternalConsoleOptions</a>

---

##### `outFiles`<sup>Optional</sup> <a name="outFiles" id="projen.vscode.VsCodeLaunchConfigurationEntry.property.outFiles"></a>

```typescript
public readonly outFiles: string[];
```

- *Type:* string[]

---

##### `port`<sup>Optional</sup> <a name="port" id="projen.vscode.VsCodeLaunchConfigurationEntry.property.port"></a>

```typescript
public readonly port: number;
```

- *Type:* number

---

##### `postDebugTask`<sup>Optional</sup> <a name="postDebugTask" id="projen.vscode.VsCodeLaunchConfigurationEntry.property.postDebugTask"></a>

```typescript
public readonly postDebugTask: string;
```

- *Type:* string

---

##### `preLaunchTask`<sup>Optional</sup> <a name="preLaunchTask" id="projen.vscode.VsCodeLaunchConfigurationEntry.property.preLaunchTask"></a>

```typescript
public readonly preLaunchTask: string;
```

- *Type:* string

---

##### `presentation`<sup>Optional</sup> <a name="presentation" id="projen.vscode.VsCodeLaunchConfigurationEntry.property.presentation"></a>

```typescript
public readonly presentation: Presentation;
```

- *Type:* <a href="#projen.vscode.Presentation">Presentation</a>

---

##### `program`<sup>Optional</sup> <a name="program" id="projen.vscode.VsCodeLaunchConfigurationEntry.property.program"></a>

```typescript
public readonly program: string;
```

- *Type:* string

---

##### `runtimeArgs`<sup>Optional</sup> <a name="runtimeArgs" id="projen.vscode.VsCodeLaunchConfigurationEntry.property.runtimeArgs"></a>

```typescript
public readonly runtimeArgs: string[];
```

- *Type:* string[]

---

##### `serverReadyAction`<sup>Optional</sup> <a name="serverReadyAction" id="projen.vscode.VsCodeLaunchConfigurationEntry.property.serverReadyAction"></a>

```typescript
public readonly serverReadyAction: ServerReadyAction;
```

- *Type:* <a href="#projen.vscode.ServerReadyAction">ServerReadyAction</a>

---

##### `skipFiles`<sup>Optional</sup> <a name="skipFiles" id="projen.vscode.VsCodeLaunchConfigurationEntry.property.skipFiles"></a>

```typescript
public readonly skipFiles: string[];
```

- *Type:* string[]

---

##### `stopOnEntry`<sup>Optional</sup> <a name="stopOnEntry" id="projen.vscode.VsCodeLaunchConfigurationEntry.property.stopOnEntry"></a>

```typescript
public readonly stopOnEntry: boolean;
```

- *Type:* boolean

---

##### `url`<sup>Optional</sup> <a name="url" id="projen.vscode.VsCodeLaunchConfigurationEntry.property.url"></a>

```typescript
public readonly url: string;
```

- *Type:* string

---

##### `webRoot`<sup>Optional</sup> <a name="webRoot" id="projen.vscode.VsCodeLaunchConfigurationEntry.property.webRoot"></a>

```typescript
public readonly webRoot: string;
```

- *Type:* string

---

### VsCodeLaunchInputEntry <a name="VsCodeLaunchInputEntry" id="projen.vscode.VsCodeLaunchInputEntry"></a>

Base options for a 'VsCodeLaunchInputEntry' Source: https://code.visualstudio.com/docs/editor/variables-reference#_input-variables.

#### Initializer <a name="Initializer" id="projen.vscode.VsCodeLaunchInputEntry.Initializer"></a>

```typescript
import { vscode } from 'projen'

const vsCodeLaunchInputEntry: vscode.VsCodeLaunchInputEntry = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.vscode.VsCodeLaunchInputEntry.property.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `id`<sup>Required</sup> <a name="id" id="projen.vscode.VsCodeLaunchInputEntry.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---

### VsCodeLaunchPickStringInputEntry <a name="VsCodeLaunchPickStringInputEntry" id="projen.vscode.VsCodeLaunchPickStringInputEntry"></a>

Options for a 'VsCodeLaunchPickStringInputEntry' Source: https://code.visualstudio.com/docs/editor/variables-reference#_input-variables.

#### Initializer <a name="Initializer" id="projen.vscode.VsCodeLaunchPickStringInputEntry.Initializer"></a>

```typescript
import { vscode } from 'projen'

const vsCodeLaunchPickStringInputEntry: vscode.VsCodeLaunchPickStringInputEntry = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.vscode.VsCodeLaunchPickStringInputEntry.property.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.vscode.VsCodeLaunchPickStringInputEntry.property.description">description</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.vscode.VsCodeLaunchPickStringInputEntry.property.options">options</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen.vscode.VsCodeLaunchPickStringInputEntry.property.default">default</a></code> | <code>string</code> | *No description.* |

---

##### `id`<sup>Required</sup> <a name="id" id="projen.vscode.VsCodeLaunchPickStringInputEntry.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---

##### `description`<sup>Required</sup> <a name="description" id="projen.vscode.VsCodeLaunchPickStringInputEntry.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

---

##### `options`<sup>Required</sup> <a name="options" id="projen.vscode.VsCodeLaunchPickStringInputEntry.property.options"></a>

```typescript
public readonly options: string[];
```

- *Type:* string[]

---

##### `default`<sup>Optional</sup> <a name="default" id="projen.vscode.VsCodeLaunchPickStringInputEntry.property.default"></a>

```typescript
public readonly default: string;
```

- *Type:* string

---

### VsCodeLaunchPromptStringInputEntry <a name="VsCodeLaunchPromptStringInputEntry" id="projen.vscode.VsCodeLaunchPromptStringInputEntry"></a>

Options for a 'VsCodeLaunchPromptStringInputEntry' Source: https://code.visualstudio.com/docs/editor/variables-reference#_input-variables.

#### Initializer <a name="Initializer" id="projen.vscode.VsCodeLaunchPromptStringInputEntry.Initializer"></a>

```typescript
import { vscode } from 'projen'

const vsCodeLaunchPromptStringInputEntry: vscode.VsCodeLaunchPromptStringInputEntry = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.vscode.VsCodeLaunchPromptStringInputEntry.property.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.vscode.VsCodeLaunchPromptStringInputEntry.property.description">description</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.vscode.VsCodeLaunchPromptStringInputEntry.property.default">default</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.vscode.VsCodeLaunchPromptStringInputEntry.property.password">password</a></code> | <code>boolean</code> | *No description.* |

---

##### `id`<sup>Required</sup> <a name="id" id="projen.vscode.VsCodeLaunchPromptStringInputEntry.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---

##### `description`<sup>Required</sup> <a name="description" id="projen.vscode.VsCodeLaunchPromptStringInputEntry.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

---

##### `default`<sup>Optional</sup> <a name="default" id="projen.vscode.VsCodeLaunchPromptStringInputEntry.property.default"></a>

```typescript
public readonly default: string;
```

- *Type:* string

---

##### `password`<sup>Optional</sup> <a name="password" id="projen.vscode.VsCodeLaunchPromptStringInputEntry.property.password"></a>

```typescript
public readonly password: boolean;
```

- *Type:* boolean

---


## Protocols <a name="Protocols" id="Protocols"></a>

### IDevContainerEnvironment <a name="IDevContainerEnvironment" id="projen.vscode.IDevContainerEnvironment"></a>

- *Extends:* projen.IDevEnvironment

- *Implemented By:* <a href="#projen.vscode.DevContainer">DevContainer</a>, <a href="#projen.vscode.IDevContainerEnvironment">IDevContainerEnvironment</a>

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.vscode.IDevContainerEnvironment.addFeatures">addFeatures</a></code> | Adds a list of VSCode features that should be automatically installed in the container. |

---

##### `addFeatures` <a name="addFeatures" id="projen.vscode.IDevContainerEnvironment.addFeatures"></a>

```typescript
public addFeatures(features: ...DevContainerFeature[]): void
```

Adds a list of VSCode features that should be automatically installed in the container.

###### `features`<sup>Required</sup> <a name="features" id="projen.vscode.IDevContainerEnvironment.addFeatures.parameter.features"></a>

- *Type:* ...<a href="#projen.vscode.DevContainerFeature">DevContainerFeature</a>[]

featureName and version(optional default: latest).

---


## Enums <a name="Enums" id="Enums"></a>

### Console <a name="Console" id="projen.vscode.Console"></a>

Controls where to launch the debug target Source: https://code.visualstudio.com/docs/editor/debugging#_launchjson-attributes.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.vscode.Console.INTERNAL_CONSOLE">INTERNAL_CONSOLE</a></code> | *No description.* |
| <code><a href="#projen.vscode.Console.INTEGRATED_TERMINAL">INTEGRATED_TERMINAL</a></code> | *No description.* |
| <code><a href="#projen.vscode.Console.EXTERNAL_TERMINAL">EXTERNAL_TERMINAL</a></code> | *No description.* |

---

##### `INTERNAL_CONSOLE` <a name="INTERNAL_CONSOLE" id="projen.vscode.Console.INTERNAL_CONSOLE"></a>

---


##### `INTEGRATED_TERMINAL` <a name="INTEGRATED_TERMINAL" id="projen.vscode.Console.INTEGRATED_TERMINAL"></a>

---


##### `EXTERNAL_TERMINAL` <a name="EXTERNAL_TERMINAL" id="projen.vscode.Console.EXTERNAL_TERMINAL"></a>

---


### InternalConsoleOptions <a name="InternalConsoleOptions" id="projen.vscode.InternalConsoleOptions"></a>

Controls the visibility of the VSCode Debug Console panel during a debugging session Source: https://code.visualstudio.com/docs/editor/debugging#_launchjson-attributes.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.vscode.InternalConsoleOptions.NEVER_OPEN">NEVER_OPEN</a></code> | *No description.* |
| <code><a href="#projen.vscode.InternalConsoleOptions.OPEN_ON_FIRST_SESSION_START">OPEN_ON_FIRST_SESSION_START</a></code> | *No description.* |
| <code><a href="#projen.vscode.InternalConsoleOptions.OPEN_ON_SESSION_START">OPEN_ON_SESSION_START</a></code> | *No description.* |

---

##### `NEVER_OPEN` <a name="NEVER_OPEN" id="projen.vscode.InternalConsoleOptions.NEVER_OPEN"></a>

---


##### `OPEN_ON_FIRST_SESSION_START` <a name="OPEN_ON_FIRST_SESSION_START" id="projen.vscode.InternalConsoleOptions.OPEN_ON_FIRST_SESSION_START"></a>

---


##### `OPEN_ON_SESSION_START` <a name="OPEN_ON_SESSION_START" id="projen.vscode.InternalConsoleOptions.OPEN_ON_SESSION_START"></a>

---

