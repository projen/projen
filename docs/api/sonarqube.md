# `sonarqube` Submodule <a name="`sonarqube` Submodule" id="projen.sonarqube"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### SonarqubeJavascriptProperties <a name="SonarqubeJavascriptProperties" id="projen.sonarqube.SonarqubeJavascriptProperties"></a>

A SonarQube configuration preset for JavaScript projects.

Provides sensible defaults for JavaScript analysis:
- `sonar.language` = `js`
- `sonar.sources` = `src`
- `sonar.tests` = `test`
- `sonar.sourceEncoding` = `UTF-8`
- `sonar.profile` = `Sonar Way`
- `sonar.scm.provider` = `git`
- Typical exclusions for `node_modules`, `coverage`, and test files
- `sonar.javascript.lcov.reportPaths` = `coverage/lcov.info`

All defaults can be overridden via options. Nested options (e.g. `coverage`,
`javascript`) are deep-merged with the defaults, so overriding one nested
field does not drop the other defaults in that subtree.

*Example*

```typescript
new SonarqubeJavascriptProperties(project, {
  projectKey: 'my-org_my-js-project',
});
```


#### Initializers <a name="Initializers" id="projen.sonarqube.SonarqubeJavascriptProperties.Initializer"></a>

```typescript
import { sonarqube } from 'projen'

new sonarqube.SonarqubeJavascriptProperties(scope: IConstruct, options: SonarqubeJavascriptPropertiesOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.sonarqube.SonarqubeJavascriptProperties.Initializer.parameter.scope">scope</a></code> | <code>constructs.IConstruct</code> | *No description.* |
| <code><a href="#projen.sonarqube.SonarqubeJavascriptProperties.Initializer.parameter.options">options</a></code> | <code><a href="#projen.sonarqube.SonarqubeJavascriptPropertiesOptions">SonarqubeJavascriptPropertiesOptions</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="projen.sonarqube.SonarqubeJavascriptProperties.Initializer.parameter.scope"></a>

- *Type:* constructs.IConstruct

---

##### `options`<sup>Required</sup> <a name="options" id="projen.sonarqube.SonarqubeJavascriptProperties.Initializer.parameter.options"></a>

- *Type:* <a href="#projen.sonarqube.SonarqubeJavascriptPropertiesOptions">SonarqubeJavascriptPropertiesOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.sonarqube.SonarqubeJavascriptProperties.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen.sonarqube.SonarqubeJavascriptProperties.with">with</a></code> | Applies one or more mixins to this construct. |
| <code><a href="#projen.sonarqube.SonarqubeJavascriptProperties.postProjectCreation">postProjectCreation</a></code> | Called once, right after `postSynthesize()`, only when the project is created for the first time. |
| <code><a href="#projen.sonarqube.SonarqubeJavascriptProperties.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen.sonarqube.SonarqubeJavascriptProperties.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen.sonarqube.SonarqubeJavascriptProperties.projectCreation">projectCreation</a></code> | Called once, right after `synthesize()`, only when the project is created for the first time. |
| <code><a href="#projen.sonarqube.SonarqubeJavascriptProperties.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |

---

##### `toString` <a name="toString" id="projen.sonarqube.SonarqubeJavascriptProperties.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="projen.sonarqube.SonarqubeJavascriptProperties.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="projen.sonarqube.SonarqubeJavascriptProperties.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

##### `postProjectCreation` <a name="postProjectCreation" id="projen.sonarqube.SonarqubeJavascriptProperties.postProjectCreation"></a>

```typescript
public postProjectCreation(initProject: InitProject): void
```

Called once, right after `postSynthesize()`, only when the project is created for the first time.

It does not run on later `projen` invocations. It only fires for `projen new` (or `Projects.createProject`).
It is also skipped when post-synthesis steps are disabled, e.g. `--no-post` or `PROJEN_DISABLE_POST`.
Use it for one-off setup that can be turned off by the user, like running a task to give the user immediate
feedback on their new project. Order across components is not guaranteed.

###### `initProject`<sup>Required</sup> <a name="initProject" id="projen.sonarqube.SonarqubeJavascriptProperties.postProjectCreation.parameter.initProject"></a>

- *Type:* projen.InitProject

Details about how the project was created, e.g. its type and the original CLI args.

---

##### `postSynthesize` <a name="postSynthesize" id="projen.sonarqube.SonarqubeJavascriptProperties.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen.sonarqube.SonarqubeJavascriptProperties.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `projectCreation` <a name="projectCreation" id="projen.sonarqube.SonarqubeJavascriptProperties.projectCreation"></a>

```typescript
public projectCreation(initProject: InitProject): void
```

Called once, right after `synthesize()`, only when the project is created for the first time.

It does not run on later `projen` invocations. It only fires for `projen new` (or `Projects.createProject`).
Use it for deterministic, one-off file generation. Order across components is not guaranteed.

###### `initProject`<sup>Required</sup> <a name="initProject" id="projen.sonarqube.SonarqubeJavascriptProperties.projectCreation.parameter.initProject"></a>

- *Type:* projen.InitProject

Details about how the project was created, e.g. its type and the original CLI args.

---

##### `synthesize` <a name="synthesize" id="projen.sonarqube.SonarqubeJavascriptProperties.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.sonarqube.SonarqubeJavascriptProperties.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen.sonarqube.SonarqubeJavascriptProperties.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="projen.sonarqube.SonarqubeJavascriptProperties.isConstruct"></a>

```typescript
import { sonarqube } from 'projen'

sonarqube.SonarqubeJavascriptProperties.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="projen.sonarqube.SonarqubeJavascriptProperties.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen.sonarqube.SonarqubeJavascriptProperties.isComponent"></a>

```typescript
import { sonarqube } from 'projen'

sonarqube.SonarqubeJavascriptProperties.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen.sonarqube.SonarqubeJavascriptProperties.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.sonarqube.SonarqubeJavascriptProperties.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen.sonarqube.SonarqubeJavascriptProperties.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.sonarqube.SonarqubeJavascriptProperties.property.file">file</a></code> | <code>projen.PropertiesFile</code> | The underlying properties file. |

---

##### `node`<sup>Required</sup> <a name="node" id="projen.sonarqube.SonarqubeJavascriptProperties.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen.sonarqube.SonarqubeJavascriptProperties.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---

##### `file`<sup>Required</sup> <a name="file" id="projen.sonarqube.SonarqubeJavascriptProperties.property.file"></a>

```typescript
public readonly file: PropertiesFile;
```

- *Type:* projen.PropertiesFile

The underlying properties file.

---


### SonarqubeProperties <a name="SonarqubeProperties" id="projen.sonarqube.SonarqubeProperties"></a>

Manages the `sonar-project.properties` configuration file for SonarQube analysis.

This component generates a `sonar-project.properties` file at the project
root with the specified configuration parameters. It provides typed options
whose structure mirrors the dot-notation property namespaces.

> [https://docs.sonarsource.com/sonarqube-cloud/analyzing-source-code/analysis-parameters/parameters-not-settable-in-ui](https://docs.sonarsource.com/sonarqube-cloud/analyzing-source-code/analysis-parameters/parameters-not-settable-in-ui)

*Example*

```typescript
new SonarqubeProperties(project, {
  projectKey: 'my-org_my-project',
  organization: 'my-org',
  sources: 'src',
  tests: 'test',
  exclusions: ['*{@literal *}/node_modules/**'],
  coverage: { exclusions: ['*{@literal *}/test/**'] },
  javascript: { lcov: { reportPaths: ['coverage/lcov.info'] } },
  sourceEncoding: 'UTF-8',
});
```


#### Initializers <a name="Initializers" id="projen.sonarqube.SonarqubeProperties.Initializer"></a>

```typescript
import { sonarqube } from 'projen'

new sonarqube.SonarqubeProperties(scope: IConstruct, options: SonarqubePropertiesOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.sonarqube.SonarqubeProperties.Initializer.parameter.scope">scope</a></code> | <code>constructs.IConstruct</code> | *No description.* |
| <code><a href="#projen.sonarqube.SonarqubeProperties.Initializer.parameter.options">options</a></code> | <code><a href="#projen.sonarqube.SonarqubePropertiesOptions">SonarqubePropertiesOptions</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="projen.sonarqube.SonarqubeProperties.Initializer.parameter.scope"></a>

- *Type:* constructs.IConstruct

---

##### `options`<sup>Required</sup> <a name="options" id="projen.sonarqube.SonarqubeProperties.Initializer.parameter.options"></a>

- *Type:* <a href="#projen.sonarqube.SonarqubePropertiesOptions">SonarqubePropertiesOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.sonarqube.SonarqubeProperties.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen.sonarqube.SonarqubeProperties.with">with</a></code> | Applies one or more mixins to this construct. |
| <code><a href="#projen.sonarqube.SonarqubeProperties.postProjectCreation">postProjectCreation</a></code> | Called once, right after `postSynthesize()`, only when the project is created for the first time. |
| <code><a href="#projen.sonarqube.SonarqubeProperties.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen.sonarqube.SonarqubeProperties.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen.sonarqube.SonarqubeProperties.projectCreation">projectCreation</a></code> | Called once, right after `synthesize()`, only when the project is created for the first time. |
| <code><a href="#projen.sonarqube.SonarqubeProperties.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |

---

##### `toString` <a name="toString" id="projen.sonarqube.SonarqubeProperties.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="projen.sonarqube.SonarqubeProperties.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="projen.sonarqube.SonarqubeProperties.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

##### `postProjectCreation` <a name="postProjectCreation" id="projen.sonarqube.SonarqubeProperties.postProjectCreation"></a>

```typescript
public postProjectCreation(initProject: InitProject): void
```

Called once, right after `postSynthesize()`, only when the project is created for the first time.

It does not run on later `projen` invocations. It only fires for `projen new` (or `Projects.createProject`).
It is also skipped when post-synthesis steps are disabled, e.g. `--no-post` or `PROJEN_DISABLE_POST`.
Use it for one-off setup that can be turned off by the user, like running a task to give the user immediate
feedback on their new project. Order across components is not guaranteed.

###### `initProject`<sup>Required</sup> <a name="initProject" id="projen.sonarqube.SonarqubeProperties.postProjectCreation.parameter.initProject"></a>

- *Type:* projen.InitProject

Details about how the project was created, e.g. its type and the original CLI args.

---

##### `postSynthesize` <a name="postSynthesize" id="projen.sonarqube.SonarqubeProperties.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen.sonarqube.SonarqubeProperties.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `projectCreation` <a name="projectCreation" id="projen.sonarqube.SonarqubeProperties.projectCreation"></a>

```typescript
public projectCreation(initProject: InitProject): void
```

Called once, right after `synthesize()`, only when the project is created for the first time.

It does not run on later `projen` invocations. It only fires for `projen new` (or `Projects.createProject`).
Use it for deterministic, one-off file generation. Order across components is not guaranteed.

###### `initProject`<sup>Required</sup> <a name="initProject" id="projen.sonarqube.SonarqubeProperties.projectCreation.parameter.initProject"></a>

- *Type:* projen.InitProject

Details about how the project was created, e.g. its type and the original CLI args.

---

##### `synthesize` <a name="synthesize" id="projen.sonarqube.SonarqubeProperties.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.sonarqube.SonarqubeProperties.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen.sonarqube.SonarqubeProperties.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="projen.sonarqube.SonarqubeProperties.isConstruct"></a>

```typescript
import { sonarqube } from 'projen'

sonarqube.SonarqubeProperties.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="projen.sonarqube.SonarqubeProperties.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen.sonarqube.SonarqubeProperties.isComponent"></a>

```typescript
import { sonarqube } from 'projen'

sonarqube.SonarqubeProperties.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen.sonarqube.SonarqubeProperties.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.sonarqube.SonarqubeProperties.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen.sonarqube.SonarqubeProperties.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.sonarqube.SonarqubeProperties.property.file">file</a></code> | <code>projen.PropertiesFile</code> | The underlying properties file. |

---

##### `node`<sup>Required</sup> <a name="node" id="projen.sonarqube.SonarqubeProperties.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen.sonarqube.SonarqubeProperties.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---

##### `file`<sup>Required</sup> <a name="file" id="projen.sonarqube.SonarqubeProperties.property.file"></a>

```typescript
public readonly file: PropertiesFile;
```

- *Type:* projen.PropertiesFile

The underlying properties file.

---


### SonarqubeRustProperties <a name="SonarqubeRustProperties" id="projen.sonarqube.SonarqubeRustProperties"></a>

A SonarQube configuration preset for Rust projects.

Provides sensible defaults for Rust analysis:
- `sonar.language` = `rust`
- `sonar.sources` = `src`
- `sonar.tests` = `tests`
- `sonar.sourceEncoding` = `UTF-8`
- `sonar.profile` = `Sonar Way`
- `sonar.scm.provider` = `git`
- Typical exclusions for `coverage`, test, and `target` dirs
- `sonar.rust.lcov.reportPaths` = `target/lcov.info`
- `sonar.rust.clippy.enabled` = `false`
- `sonar.rust.clippyReport.reportPaths` = `target/clippy.json`

All defaults can be overridden via options. Nested options (e.g. `coverage`,
`rust`) are deep-merged with the defaults, so overriding one nested field
does not drop the other defaults in that subtree.

*Example*

```typescript
new SonarqubeRustProperties(project, {
  projectKey: 'my-org_my-rust-project',
});
```


#### Initializers <a name="Initializers" id="projen.sonarqube.SonarqubeRustProperties.Initializer"></a>

```typescript
import { sonarqube } from 'projen'

new sonarqube.SonarqubeRustProperties(scope: IConstruct, options: SonarqubeRustPropertiesOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.sonarqube.SonarqubeRustProperties.Initializer.parameter.scope">scope</a></code> | <code>constructs.IConstruct</code> | *No description.* |
| <code><a href="#projen.sonarqube.SonarqubeRustProperties.Initializer.parameter.options">options</a></code> | <code><a href="#projen.sonarqube.SonarqubeRustPropertiesOptions">SonarqubeRustPropertiesOptions</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="projen.sonarqube.SonarqubeRustProperties.Initializer.parameter.scope"></a>

- *Type:* constructs.IConstruct

---

##### `options`<sup>Required</sup> <a name="options" id="projen.sonarqube.SonarqubeRustProperties.Initializer.parameter.options"></a>

- *Type:* <a href="#projen.sonarqube.SonarqubeRustPropertiesOptions">SonarqubeRustPropertiesOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.sonarqube.SonarqubeRustProperties.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen.sonarqube.SonarqubeRustProperties.with">with</a></code> | Applies one or more mixins to this construct. |
| <code><a href="#projen.sonarqube.SonarqubeRustProperties.postProjectCreation">postProjectCreation</a></code> | Called once, right after `postSynthesize()`, only when the project is created for the first time. |
| <code><a href="#projen.sonarqube.SonarqubeRustProperties.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen.sonarqube.SonarqubeRustProperties.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen.sonarqube.SonarqubeRustProperties.projectCreation">projectCreation</a></code> | Called once, right after `synthesize()`, only when the project is created for the first time. |
| <code><a href="#projen.sonarqube.SonarqubeRustProperties.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |

---

##### `toString` <a name="toString" id="projen.sonarqube.SonarqubeRustProperties.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="projen.sonarqube.SonarqubeRustProperties.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="projen.sonarqube.SonarqubeRustProperties.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

##### `postProjectCreation` <a name="postProjectCreation" id="projen.sonarqube.SonarqubeRustProperties.postProjectCreation"></a>

```typescript
public postProjectCreation(initProject: InitProject): void
```

Called once, right after `postSynthesize()`, only when the project is created for the first time.

It does not run on later `projen` invocations. It only fires for `projen new` (or `Projects.createProject`).
It is also skipped when post-synthesis steps are disabled, e.g. `--no-post` or `PROJEN_DISABLE_POST`.
Use it for one-off setup that can be turned off by the user, like running a task to give the user immediate
feedback on their new project. Order across components is not guaranteed.

###### `initProject`<sup>Required</sup> <a name="initProject" id="projen.sonarqube.SonarqubeRustProperties.postProjectCreation.parameter.initProject"></a>

- *Type:* projen.InitProject

Details about how the project was created, e.g. its type and the original CLI args.

---

##### `postSynthesize` <a name="postSynthesize" id="projen.sonarqube.SonarqubeRustProperties.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen.sonarqube.SonarqubeRustProperties.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `projectCreation` <a name="projectCreation" id="projen.sonarqube.SonarqubeRustProperties.projectCreation"></a>

```typescript
public projectCreation(initProject: InitProject): void
```

Called once, right after `synthesize()`, only when the project is created for the first time.

It does not run on later `projen` invocations. It only fires for `projen new` (or `Projects.createProject`).
Use it for deterministic, one-off file generation. Order across components is not guaranteed.

###### `initProject`<sup>Required</sup> <a name="initProject" id="projen.sonarqube.SonarqubeRustProperties.projectCreation.parameter.initProject"></a>

- *Type:* projen.InitProject

Details about how the project was created, e.g. its type and the original CLI args.

---

##### `synthesize` <a name="synthesize" id="projen.sonarqube.SonarqubeRustProperties.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.sonarqube.SonarqubeRustProperties.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen.sonarqube.SonarqubeRustProperties.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="projen.sonarqube.SonarqubeRustProperties.isConstruct"></a>

```typescript
import { sonarqube } from 'projen'

sonarqube.SonarqubeRustProperties.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="projen.sonarqube.SonarqubeRustProperties.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen.sonarqube.SonarqubeRustProperties.isComponent"></a>

```typescript
import { sonarqube } from 'projen'

sonarqube.SonarqubeRustProperties.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen.sonarqube.SonarqubeRustProperties.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.sonarqube.SonarqubeRustProperties.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen.sonarqube.SonarqubeRustProperties.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.sonarqube.SonarqubeRustProperties.property.file">file</a></code> | <code>projen.PropertiesFile</code> | The underlying properties file. |

---

##### `node`<sup>Required</sup> <a name="node" id="projen.sonarqube.SonarqubeRustProperties.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen.sonarqube.SonarqubeRustProperties.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---

##### `file`<sup>Required</sup> <a name="file" id="projen.sonarqube.SonarqubeRustProperties.property.file"></a>

```typescript
public readonly file: PropertiesFile;
```

- *Type:* projen.PropertiesFile

The underlying properties file.

---


### SonarqubeTypescriptProperties <a name="SonarqubeTypescriptProperties" id="projen.sonarqube.SonarqubeTypescriptProperties"></a>

A SonarQube configuration preset for TypeScript projects.

Provides sensible defaults for TypeScript analysis:
- `sonar.language` = `ts`
- `sonar.sources` = `src`
- `sonar.tests` = `test`
- `sonar.sourceEncoding` = `UTF-8`
- `sonar.profile` = `Sonar Way`
- `sonar.scm.provider` = `git`
- `sonar.typescript.tsconfigPath` = `tsconfig.json`
- Typical exclusions for `node_modules`, `coverage`, test files
- `sonar.javascript.lcov.reportPaths` = `coverage/lcov.info`

All defaults can be overridden via options. Nested options (e.g. `coverage`,
`javascript`) are deep-merged with the defaults, so overriding one nested
field does not drop the other defaults in that subtree.

*Example*

```typescript
new SonarqubeTypescriptProperties(project, {
  projectKey: 'my-org_my-ts-project',
});
```


#### Initializers <a name="Initializers" id="projen.sonarqube.SonarqubeTypescriptProperties.Initializer"></a>

```typescript
import { sonarqube } from 'projen'

new sonarqube.SonarqubeTypescriptProperties(scope: IConstruct, options: SonarqubeTypescriptPropertiesOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.sonarqube.SonarqubeTypescriptProperties.Initializer.parameter.scope">scope</a></code> | <code>constructs.IConstruct</code> | *No description.* |
| <code><a href="#projen.sonarqube.SonarqubeTypescriptProperties.Initializer.parameter.options">options</a></code> | <code><a href="#projen.sonarqube.SonarqubeTypescriptPropertiesOptions">SonarqubeTypescriptPropertiesOptions</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="projen.sonarqube.SonarqubeTypescriptProperties.Initializer.parameter.scope"></a>

- *Type:* constructs.IConstruct

---

##### `options`<sup>Required</sup> <a name="options" id="projen.sonarqube.SonarqubeTypescriptProperties.Initializer.parameter.options"></a>

- *Type:* <a href="#projen.sonarqube.SonarqubeTypescriptPropertiesOptions">SonarqubeTypescriptPropertiesOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.sonarqube.SonarqubeTypescriptProperties.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen.sonarqube.SonarqubeTypescriptProperties.with">with</a></code> | Applies one or more mixins to this construct. |
| <code><a href="#projen.sonarqube.SonarqubeTypescriptProperties.postProjectCreation">postProjectCreation</a></code> | Called once, right after `postSynthesize()`, only when the project is created for the first time. |
| <code><a href="#projen.sonarqube.SonarqubeTypescriptProperties.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen.sonarqube.SonarqubeTypescriptProperties.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen.sonarqube.SonarqubeTypescriptProperties.projectCreation">projectCreation</a></code> | Called once, right after `synthesize()`, only when the project is created for the first time. |
| <code><a href="#projen.sonarqube.SonarqubeTypescriptProperties.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |

---

##### `toString` <a name="toString" id="projen.sonarqube.SonarqubeTypescriptProperties.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="projen.sonarqube.SonarqubeTypescriptProperties.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="projen.sonarqube.SonarqubeTypescriptProperties.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

##### `postProjectCreation` <a name="postProjectCreation" id="projen.sonarqube.SonarqubeTypescriptProperties.postProjectCreation"></a>

```typescript
public postProjectCreation(initProject: InitProject): void
```

Called once, right after `postSynthesize()`, only when the project is created for the first time.

It does not run on later `projen` invocations. It only fires for `projen new` (or `Projects.createProject`).
It is also skipped when post-synthesis steps are disabled, e.g. `--no-post` or `PROJEN_DISABLE_POST`.
Use it for one-off setup that can be turned off by the user, like running a task to give the user immediate
feedback on their new project. Order across components is not guaranteed.

###### `initProject`<sup>Required</sup> <a name="initProject" id="projen.sonarqube.SonarqubeTypescriptProperties.postProjectCreation.parameter.initProject"></a>

- *Type:* projen.InitProject

Details about how the project was created, e.g. its type and the original CLI args.

---

##### `postSynthesize` <a name="postSynthesize" id="projen.sonarqube.SonarqubeTypescriptProperties.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen.sonarqube.SonarqubeTypescriptProperties.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `projectCreation` <a name="projectCreation" id="projen.sonarqube.SonarqubeTypescriptProperties.projectCreation"></a>

```typescript
public projectCreation(initProject: InitProject): void
```

Called once, right after `synthesize()`, only when the project is created for the first time.

It does not run on later `projen` invocations. It only fires for `projen new` (or `Projects.createProject`).
Use it for deterministic, one-off file generation. Order across components is not guaranteed.

###### `initProject`<sup>Required</sup> <a name="initProject" id="projen.sonarqube.SonarqubeTypescriptProperties.projectCreation.parameter.initProject"></a>

- *Type:* projen.InitProject

Details about how the project was created, e.g. its type and the original CLI args.

---

##### `synthesize` <a name="synthesize" id="projen.sonarqube.SonarqubeTypescriptProperties.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.sonarqube.SonarqubeTypescriptProperties.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen.sonarqube.SonarqubeTypescriptProperties.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="projen.sonarqube.SonarqubeTypescriptProperties.isConstruct"></a>

```typescript
import { sonarqube } from 'projen'

sonarqube.SonarqubeTypescriptProperties.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="projen.sonarqube.SonarqubeTypescriptProperties.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen.sonarqube.SonarqubeTypescriptProperties.isComponent"></a>

```typescript
import { sonarqube } from 'projen'

sonarqube.SonarqubeTypescriptProperties.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen.sonarqube.SonarqubeTypescriptProperties.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.sonarqube.SonarqubeTypescriptProperties.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen.sonarqube.SonarqubeTypescriptProperties.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.sonarqube.SonarqubeTypescriptProperties.property.file">file</a></code> | <code>projen.PropertiesFile</code> | The underlying properties file. |

---

##### `node`<sup>Required</sup> <a name="node" id="projen.sonarqube.SonarqubeTypescriptProperties.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen.sonarqube.SonarqubeTypescriptProperties.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---

##### `file`<sup>Required</sup> <a name="file" id="projen.sonarqube.SonarqubeTypescriptProperties.property.file"></a>

```typescript
public readonly file: PropertiesFile;
```

- *Type:* projen.PropertiesFile

The underlying properties file.

---


## Structs <a name="Structs" id="Structs"></a>

### SonarqubeCoverageOptions <a name="SonarqubeCoverageOptions" id="projen.sonarqube.SonarqubeCoverageOptions"></a>

Options for `sonar.coverage.*` properties.

#### Initializer <a name="Initializer" id="projen.sonarqube.SonarqubeCoverageOptions.Initializer"></a>

```typescript
import { sonarqube } from 'projen'

const sonarqubeCoverageOptions: sonarqube.SonarqubeCoverageOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.sonarqube.SonarqubeCoverageOptions.property.exclusions">exclusions</a></code> | <code>string[]</code> | Comma-separated file path patterns to exclude from test coverage calculations. |

---

##### `exclusions`<sup>Optional</sup> <a name="exclusions" id="projen.sonarqube.SonarqubeCoverageOptions.property.exclusions"></a>

```typescript
public readonly exclusions: string[];
```

- *Type:* string[]
- *Default:* no coverage exclusions

Comma-separated file path patterns to exclude from test coverage calculations.

Maps to `sonar.coverage.exclusions`.

---

### SonarqubeCpdOptions <a name="SonarqubeCpdOptions" id="projen.sonarqube.SonarqubeCpdOptions"></a>

Options for `sonar.cpd.*` properties.

#### Initializer <a name="Initializer" id="projen.sonarqube.SonarqubeCpdOptions.Initializer"></a>

```typescript
import { sonarqube } from 'projen'

const sonarqubeCpdOptions: sonarqube.SonarqubeCpdOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.sonarqube.SonarqubeCpdOptions.property.exclusions">exclusions</a></code> | <code>string[]</code> | Comma-separated file path patterns to exclude from code duplication detection. |

---

##### `exclusions`<sup>Optional</sup> <a name="exclusions" id="projen.sonarqube.SonarqubeCpdOptions.property.exclusions"></a>

```typescript
public readonly exclusions: string[];
```

- *Type:* string[]
- *Default:* no duplication exclusions

Comma-separated file path patterns to exclude from code duplication detection.

Maps to `sonar.cpd.exclusions`.

---

### SonarqubeFileOptions <a name="SonarqubeFileOptions" id="projen.sonarqube.SonarqubeFileOptions"></a>

File options for the generated `sonar-project.properties` file.

#### Initializer <a name="Initializer" id="projen.sonarqube.SonarqubeFileOptions.Initializer"></a>

```typescript
import { sonarqube } from 'projen'

const sonarqubeFileOptions: sonarqube.SonarqubeFileOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.sonarqube.SonarqubeFileOptions.property.comment">comment</a></code> | <code>string[]</code> | A comment to include at the top of the file. |
| <code><a href="#projen.sonarqube.SonarqubeFileOptions.property.committed">committed</a></code> | <code>boolean</code> | Whether the generated file should be committed to git. |
| <code><a href="#projen.sonarqube.SonarqubeFileOptions.property.marker">marker</a></code> | <code>boolean</code> | Adds the projen marker to the file. |
| <code><a href="#projen.sonarqube.SonarqubeFileOptions.property.readonly">readonly</a></code> | <code>boolean</code> | Whether the generated file should be readonly. |

---

##### `comment`<sup>Optional</sup> <a name="comment" id="projen.sonarqube.SonarqubeFileOptions.property.comment"></a>

```typescript
public readonly comment: string[];
```

- *Type:* string[]
- *Default:* no additional comment

A comment to include at the top of the file.

---

##### `committed`<sup>Optional</sup> <a name="committed" id="projen.sonarqube.SonarqubeFileOptions.property.committed"></a>

```typescript
public readonly committed: boolean;
```

- *Type:* boolean
- *Default:* true

Whether the generated file should be committed to git.

---

##### `marker`<sup>Optional</sup> <a name="marker" id="projen.sonarqube.SonarqubeFileOptions.property.marker"></a>

```typescript
public readonly marker: boolean;
```

- *Type:* boolean
- *Default:* marker will be included as long as the project is not ejected

Adds the projen marker to the file.

---

##### `readonly`<sup>Optional</sup> <a name="readonly" id="projen.sonarqube.SonarqubeFileOptions.property.readonly"></a>

```typescript
public readonly readonly: boolean;
```

- *Type:* boolean
- *Default:* true

Whether the generated file should be readonly.

---

### SonarqubeJavascriptOptions <a name="SonarqubeJavascriptOptions" id="projen.sonarqube.SonarqubeJavascriptOptions"></a>

Options for `sonar.javascript.*` properties.

#### Initializer <a name="Initializer" id="projen.sonarqube.SonarqubeJavascriptOptions.Initializer"></a>

```typescript
import { sonarqube } from 'projen'

const sonarqubeJavascriptOptions: sonarqube.SonarqubeJavascriptOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.sonarqube.SonarqubeJavascriptOptions.property.lcov">lcov</a></code> | <code><a href="#projen.sonarqube.SonarqubeLcovOptions">SonarqubeLcovOptions</a></code> | Options for `sonar.javascript.lcov.*`. |

---

##### `lcov`<sup>Optional</sup> <a name="lcov" id="projen.sonarqube.SonarqubeJavascriptOptions.property.lcov"></a>

```typescript
public readonly lcov: SonarqubeLcovOptions;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeLcovOptions">SonarqubeLcovOptions</a>
- *Default:* no LCOV configuration

Options for `sonar.javascript.lcov.*`.

---

### SonarqubeJavascriptPropertiesOptions <a name="SonarqubeJavascriptPropertiesOptions" id="projen.sonarqube.SonarqubeJavascriptPropertiesOptions"></a>

Options for `SonarqubeJavascriptProperties`.

Extends base options with JavaScript-specific defaults.

#### Initializer <a name="Initializer" id="projen.sonarqube.SonarqubeJavascriptPropertiesOptions.Initializer"></a>

```typescript
import { sonarqube } from 'projen'

const sonarqubeJavascriptPropertiesOptions: sonarqube.SonarqubeJavascriptPropertiesOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.sonarqube.SonarqubeJavascriptPropertiesOptions.property.projectKey">projectKey</a></code> | <code>string</code> | The project's unique key. |
| <code><a href="#projen.sonarqube.SonarqubeJavascriptPropertiesOptions.property.coverage">coverage</a></code> | <code><a href="#projen.sonarqube.SonarqubeCoverageOptions">SonarqubeCoverageOptions</a></code> | Coverage-related options (`sonar.coverage.*`). |
| <code><a href="#projen.sonarqube.SonarqubeJavascriptPropertiesOptions.property.cpd">cpd</a></code> | <code><a href="#projen.sonarqube.SonarqubeCpdOptions">SonarqubeCpdOptions</a></code> | Duplication detection options (`sonar.cpd.*`). |
| <code><a href="#projen.sonarqube.SonarqubeJavascriptPropertiesOptions.property.exclusions">exclusions</a></code> | <code>string[]</code> | Comma-separated file path patterns to exclude from the analysis scope. |
| <code><a href="#projen.sonarqube.SonarqubeJavascriptPropertiesOptions.property.extraProperties">extraProperties</a></code> | <code>{[ key: string ]: string}</code> | Additional arbitrary properties to include in the configuration. |
| <code><a href="#projen.sonarqube.SonarqubeJavascriptPropertiesOptions.property.fileOptions">fileOptions</a></code> | <code><a href="#projen.sonarqube.SonarqubeFileOptions">SonarqubeFileOptions</a></code> | Options for the generated properties file. |
| <code><a href="#projen.sonarqube.SonarqubeJavascriptPropertiesOptions.property.javascript">javascript</a></code> | <code><a href="#projen.sonarqube.SonarqubeJavascriptOptions">SonarqubeJavascriptOptions</a></code> | JavaScript-specific options (`sonar.javascript.*`). |
| <code><a href="#projen.sonarqube.SonarqubeJavascriptPropertiesOptions.property.language">language</a></code> | <code>string</code> | The language for analysis. |
| <code><a href="#projen.sonarqube.SonarqubeJavascriptPropertiesOptions.property.log">log</a></code> | <code><a href="#projen.sonarqube.SonarqubeLogOptions">SonarqubeLogOptions</a></code> | Logging options (`sonar.log.*`). |
| <code><a href="#projen.sonarqube.SonarqubeJavascriptPropertiesOptions.property.organization">organization</a></code> | <code>string</code> | The key of the organization to which the project belongs. |
| <code><a href="#projen.sonarqube.SonarqubeJavascriptPropertiesOptions.property.profile">profile</a></code> | <code>string</code> | The quality profile name. |
| <code><a href="#projen.sonarqube.SonarqubeJavascriptPropertiesOptions.property.projectBaseDir">projectBaseDir</a></code> | <code>string</code> | The project's base directory when the analysis needs to take place in a directory other than the one from which it was started. |
| <code><a href="#projen.sonarqube.SonarqubeJavascriptPropertiesOptions.property.projectName">projectName</a></code> | <code>string</code> | Name of the project displayed on the web interface. |
| <code><a href="#projen.sonarqube.SonarqubeJavascriptPropertiesOptions.property.projectVersion">projectVersion</a></code> | <code>string</code> | The project version. |
| <code><a href="#projen.sonarqube.SonarqubeJavascriptPropertiesOptions.property.qualitygate">qualitygate</a></code> | <code><a href="#projen.sonarqube.SonarqubeQualityGateOptions">SonarqubeQualityGateOptions</a></code> | Quality gate options (`sonar.qualitygate.*`). |
| <code><a href="#projen.sonarqube.SonarqubeJavascriptPropertiesOptions.property.region">region</a></code> | <code><a href="#projen.sonarqube.SonarqubeRegion">SonarqubeRegion</a></code> | The SonarQube Cloud instance's region. |
| <code><a href="#projen.sonarqube.SonarqubeJavascriptPropertiesOptions.property.rust">rust</a></code> | <code><a href="#projen.sonarqube.SonarqubeRustOptions">SonarqubeRustOptions</a></code> | Rust-specific options (`sonar.rust.*`). |
| <code><a href="#projen.sonarqube.SonarqubeJavascriptPropertiesOptions.property.scm">scm</a></code> | <code><a href="#projen.sonarqube.SonarqubeScmOptions">SonarqubeScmOptions</a></code> | SCM-related options (`sonar.scm.*`). |
| <code><a href="#projen.sonarqube.SonarqubeJavascriptPropertiesOptions.property.sourceEncoding">sourceEncoding</a></code> | <code>string</code> | Encoding of the source files. |
| <code><a href="#projen.sonarqube.SonarqubeJavascriptPropertiesOptions.property.sources">sources</a></code> | <code>string</code> | Comma-separated paths to directories containing main source code (non-test code). |
| <code><a href="#projen.sonarqube.SonarqubeJavascriptPropertiesOptions.property.tests">tests</a></code> | <code>string</code> | Comma-separated paths to directories containing test code. |
| <code><a href="#projen.sonarqube.SonarqubeJavascriptPropertiesOptions.property.typescript">typescript</a></code> | <code><a href="#projen.sonarqube.SonarqubeTypescriptOptions">SonarqubeTypescriptOptions</a></code> | TypeScript-specific options (`sonar.typescript.*`). |

---

##### `projectKey`<sup>Required</sup> <a name="projectKey" id="projen.sonarqube.SonarqubeJavascriptPropertiesOptions.property.projectKey"></a>

```typescript
public readonly projectKey: string;
```

- *Type:* string

The project's unique key.

Can include up to 400 characters. Allowed characters:
letters, digits, dash, underscore, periods, and colons.

Maps to `sonar.projectKey`. This parameter is mandatory.

---

##### `coverage`<sup>Optional</sup> <a name="coverage" id="projen.sonarqube.SonarqubeJavascriptPropertiesOptions.property.coverage"></a>

```typescript
public readonly coverage: SonarqubeCoverageOptions;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeCoverageOptions">SonarqubeCoverageOptions</a>
- *Default:* no coverage configuration

Coverage-related options (`sonar.coverage.*`).

---

##### `cpd`<sup>Optional</sup> <a name="cpd" id="projen.sonarqube.SonarqubeJavascriptPropertiesOptions.property.cpd"></a>

```typescript
public readonly cpd: SonarqubeCpdOptions;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeCpdOptions">SonarqubeCpdOptions</a>
- *Default:* no CPD configuration

Duplication detection options (`sonar.cpd.*`).

---

##### `exclusions`<sup>Optional</sup> <a name="exclusions" id="projen.sonarqube.SonarqubeJavascriptPropertiesOptions.property.exclusions"></a>

```typescript
public readonly exclusions: string[];
```

- *Type:* string[]
- *Default:* no exclusions

Comma-separated file path patterns to exclude from the analysis scope.

Maps to `sonar.exclusions`.

---

##### `extraProperties`<sup>Optional</sup> <a name="extraProperties" id="projen.sonarqube.SonarqubeJavascriptPropertiesOptions.property.extraProperties"></a>

```typescript
public readonly extraProperties: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* no additional properties

Additional arbitrary properties to include in the configuration.

Use this for properties not covered by the typed options.
Keys use dot-notation (e.g., `sonar.java.binaries`).

These are applied as overrides after the typed options above, so a key
that is a prefix of a typed option (e.g. `"sonar.coverage"`) replaces
that entire subtree rather than merging with it.

---

##### `fileOptions`<sup>Optional</sup> <a name="fileOptions" id="projen.sonarqube.SonarqubeJavascriptPropertiesOptions.property.fileOptions"></a>

```typescript
public readonly fileOptions: SonarqubeFileOptions;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeFileOptions">SonarqubeFileOptions</a>
- *Default:* default file options

Options for the generated properties file.

---

##### `javascript`<sup>Optional</sup> <a name="javascript" id="projen.sonarqube.SonarqubeJavascriptPropertiesOptions.property.javascript"></a>

```typescript
public readonly javascript: SonarqubeJavascriptOptions;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeJavascriptOptions">SonarqubeJavascriptOptions</a>
- *Default:* no JavaScript configuration

JavaScript-specific options (`sonar.javascript.*`).

---

##### `language`<sup>Optional</sup> <a name="language" id="projen.sonarqube.SonarqubeJavascriptPropertiesOptions.property.language"></a>

```typescript
public readonly language: string;
```

- *Type:* string
- *Default:* auto-detected

The language for analysis.

Maps to `sonar.language`.

---

##### `log`<sup>Optional</sup> <a name="log" id="projen.sonarqube.SonarqubeJavascriptPropertiesOptions.property.log"></a>

```typescript
public readonly log: SonarqubeLogOptions;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeLogOptions">SonarqubeLogOptions</a>
- *Default:* INFO level

Logging options (`sonar.log.*`).

---

##### `organization`<sup>Optional</sup> <a name="organization" id="projen.sonarqube.SonarqubeJavascriptPropertiesOptions.property.organization"></a>

```typescript
public readonly organization: string;
```

- *Type:* string
- *Default:* no organization

The key of the organization to which the project belongs.

Maps to `sonar.organization`. Mandatory for SonarQube Cloud.

---

##### `profile`<sup>Optional</sup> <a name="profile" id="projen.sonarqube.SonarqubeJavascriptPropertiesOptions.property.profile"></a>

```typescript
public readonly profile: string;
```

- *Type:* string
- *Default:* uses the default profile configured on the server

The quality profile name.

Maps to `sonar.profile`.

---

##### `projectBaseDir`<sup>Optional</sup> <a name="projectBaseDir" id="projen.sonarqube.SonarqubeJavascriptPropertiesOptions.property.projectBaseDir"></a>

```typescript
public readonly projectBaseDir: string;
```

- *Type:* string
- *Default:* the directory from which the analysis was started

The project's base directory when the analysis needs to take place in a directory other than the one from which it was started.

Maps to `sonar.projectBaseDir`.

---

##### `projectName`<sup>Optional</sup> <a name="projectName" id="projen.sonarqube.SonarqubeJavascriptPropertiesOptions.property.projectName"></a>

```typescript
public readonly projectName: string;
```

- *Type:* string
- *Default:* not set

Name of the project displayed on the web interface.

Maps to `sonar.projectName`.

---

##### `projectVersion`<sup>Optional</sup> <a name="projectVersion" id="projen.sonarqube.SonarqubeJavascriptPropertiesOptions.property.projectVersion"></a>

```typescript
public readonly projectVersion: string;
```

- *Type:* string
- *Default:* not set

The project version.

Maps to `sonar.projectVersion`.

---

##### `qualitygate`<sup>Optional</sup> <a name="qualitygate" id="projen.sonarqube.SonarqubeJavascriptPropertiesOptions.property.qualitygate"></a>

```typescript
public readonly qualitygate: SonarqubeQualityGateOptions;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeQualityGateOptions">SonarqubeQualityGateOptions</a>
- *Default:* quality gate not awaited

Quality gate options (`sonar.qualitygate.*`).

---

##### `region`<sup>Optional</sup> <a name="region" id="projen.sonarqube.SonarqubeJavascriptPropertiesOptions.property.region"></a>

```typescript
public readonly region: SonarqubeRegion;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeRegion">SonarqubeRegion</a>
- *Default:* SonarqubeRegion.EU

The SonarQube Cloud instance's region.

Maps to `sonar.region`.

---

##### `rust`<sup>Optional</sup> <a name="rust" id="projen.sonarqube.SonarqubeJavascriptPropertiesOptions.property.rust"></a>

```typescript
public readonly rust: SonarqubeRustOptions;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeRustOptions">SonarqubeRustOptions</a>
- *Default:* no Rust configuration

Rust-specific options (`sonar.rust.*`).

---

##### `scm`<sup>Optional</sup> <a name="scm" id="projen.sonarqube.SonarqubeJavascriptPropertiesOptions.property.scm"></a>

```typescript
public readonly scm: SonarqubeScmOptions;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeScmOptions">SonarqubeScmOptions</a>
- *Default:* no SCM configuration

SCM-related options (`sonar.scm.*`).

---

##### `sourceEncoding`<sup>Optional</sup> <a name="sourceEncoding" id="projen.sonarqube.SonarqubeJavascriptPropertiesOptions.property.sourceEncoding"></a>

```typescript
public readonly sourceEncoding: string;
```

- *Type:* string
- *Default:* system encoding

Encoding of the source files.

Maps to `sonar.sourceEncoding`.

---

##### `sources`<sup>Optional</sup> <a name="sources" id="projen.sonarqube.SonarqubeJavascriptPropertiesOptions.property.sources"></a>

```typescript
public readonly sources: string;
```

- *Type:* string
- *Default:* the project base directory

Comma-separated paths to directories containing main source code (non-test code).

Maps to `sonar.sources`.

---

##### `tests`<sup>Optional</sup> <a name="tests" id="projen.sonarqube.SonarqubeJavascriptPropertiesOptions.property.tests"></a>

```typescript
public readonly tests: string;
```

- *Type:* string
- *Default:* no test code analyzed

Comma-separated paths to directories containing test code.

Maps to `sonar.tests`.

---

##### `typescript`<sup>Optional</sup> <a name="typescript" id="projen.sonarqube.SonarqubeJavascriptPropertiesOptions.property.typescript"></a>

```typescript
public readonly typescript: SonarqubeTypescriptOptions;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeTypescriptOptions">SonarqubeTypescriptOptions</a>
- *Default:* no TypeScript configuration

TypeScript-specific options (`sonar.typescript.*`).

---

### SonarqubeLcovOptions <a name="SonarqubeLcovOptions" id="projen.sonarqube.SonarqubeLcovOptions"></a>

Options for lcov report paths (shared between languages).

#### Initializer <a name="Initializer" id="projen.sonarqube.SonarqubeLcovOptions.Initializer"></a>

```typescript
import { sonarqube } from 'projen'

const sonarqubeLcovOptions: sonarqube.SonarqubeLcovOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.sonarqube.SonarqubeLcovOptions.property.reportPaths">reportPaths</a></code> | <code>string[]</code> | Comma-separated paths to LCOV coverage report files. |

---

##### `reportPaths`<sup>Optional</sup> <a name="reportPaths" id="projen.sonarqube.SonarqubeLcovOptions.property.reportPaths"></a>

```typescript
public readonly reportPaths: string[];
```

- *Type:* string[]
- *Default:* not set

Comma-separated paths to LCOV coverage report files.

Maps to `sonar.<language>.lcov.reportPaths`.

---

### SonarqubeLogOptions <a name="SonarqubeLogOptions" id="projen.sonarqube.SonarqubeLogOptions"></a>

Options for `sonar.log.*` properties.

#### Initializer <a name="Initializer" id="projen.sonarqube.SonarqubeLogOptions.Initializer"></a>

```typescript
import { sonarqube } from 'projen'

const sonarqubeLogOptions: sonarqube.SonarqubeLogOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.sonarqube.SonarqubeLogOptions.property.level">level</a></code> | <code><a href="#projen.sonarqube.SonarqubeLogLevel">SonarqubeLogLevel</a></code> | Controls the quantity/level of logs produced during analysis. |

---

##### `level`<sup>Optional</sup> <a name="level" id="projen.sonarqube.SonarqubeLogOptions.property.level"></a>

```typescript
public readonly level: SonarqubeLogLevel;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeLogLevel">SonarqubeLogLevel</a>
- *Default:* SonarqubeLogLevel.INFO

Controls the quantity/level of logs produced during analysis.

Maps to `sonar.log.level`.

---

### SonarqubePropertiesOptions <a name="SonarqubePropertiesOptions" id="projen.sonarqube.SonarqubePropertiesOptions"></a>

Options for `SonarqubeProperties`.

The interface structure mirrors the `sonar.*` dot-notation used in
`sonar-project.properties`. Nested interfaces map to nested property
namespaces. For example, `scm.provider` maps to `sonar.scm.provider`.

#### Initializer <a name="Initializer" id="projen.sonarqube.SonarqubePropertiesOptions.Initializer"></a>

```typescript
import { sonarqube } from 'projen'

const sonarqubePropertiesOptions: sonarqube.SonarqubePropertiesOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.sonarqube.SonarqubePropertiesOptions.property.projectKey">projectKey</a></code> | <code>string</code> | The project's unique key. |
| <code><a href="#projen.sonarqube.SonarqubePropertiesOptions.property.coverage">coverage</a></code> | <code><a href="#projen.sonarqube.SonarqubeCoverageOptions">SonarqubeCoverageOptions</a></code> | Coverage-related options (`sonar.coverage.*`). |
| <code><a href="#projen.sonarqube.SonarqubePropertiesOptions.property.cpd">cpd</a></code> | <code><a href="#projen.sonarqube.SonarqubeCpdOptions">SonarqubeCpdOptions</a></code> | Duplication detection options (`sonar.cpd.*`). |
| <code><a href="#projen.sonarqube.SonarqubePropertiesOptions.property.exclusions">exclusions</a></code> | <code>string[]</code> | Comma-separated file path patterns to exclude from the analysis scope. |
| <code><a href="#projen.sonarqube.SonarqubePropertiesOptions.property.extraProperties">extraProperties</a></code> | <code>{[ key: string ]: string}</code> | Additional arbitrary properties to include in the configuration. |
| <code><a href="#projen.sonarqube.SonarqubePropertiesOptions.property.fileOptions">fileOptions</a></code> | <code><a href="#projen.sonarqube.SonarqubeFileOptions">SonarqubeFileOptions</a></code> | Options for the generated properties file. |
| <code><a href="#projen.sonarqube.SonarqubePropertiesOptions.property.javascript">javascript</a></code> | <code><a href="#projen.sonarqube.SonarqubeJavascriptOptions">SonarqubeJavascriptOptions</a></code> | JavaScript-specific options (`sonar.javascript.*`). |
| <code><a href="#projen.sonarqube.SonarqubePropertiesOptions.property.language">language</a></code> | <code>string</code> | The language for analysis. |
| <code><a href="#projen.sonarqube.SonarqubePropertiesOptions.property.log">log</a></code> | <code><a href="#projen.sonarqube.SonarqubeLogOptions">SonarqubeLogOptions</a></code> | Logging options (`sonar.log.*`). |
| <code><a href="#projen.sonarqube.SonarqubePropertiesOptions.property.organization">organization</a></code> | <code>string</code> | The key of the organization to which the project belongs. |
| <code><a href="#projen.sonarqube.SonarqubePropertiesOptions.property.profile">profile</a></code> | <code>string</code> | The quality profile name. |
| <code><a href="#projen.sonarqube.SonarqubePropertiesOptions.property.projectBaseDir">projectBaseDir</a></code> | <code>string</code> | The project's base directory when the analysis needs to take place in a directory other than the one from which it was started. |
| <code><a href="#projen.sonarqube.SonarqubePropertiesOptions.property.projectName">projectName</a></code> | <code>string</code> | Name of the project displayed on the web interface. |
| <code><a href="#projen.sonarqube.SonarqubePropertiesOptions.property.projectVersion">projectVersion</a></code> | <code>string</code> | The project version. |
| <code><a href="#projen.sonarqube.SonarqubePropertiesOptions.property.qualitygate">qualitygate</a></code> | <code><a href="#projen.sonarqube.SonarqubeQualityGateOptions">SonarqubeQualityGateOptions</a></code> | Quality gate options (`sonar.qualitygate.*`). |
| <code><a href="#projen.sonarqube.SonarqubePropertiesOptions.property.region">region</a></code> | <code><a href="#projen.sonarqube.SonarqubeRegion">SonarqubeRegion</a></code> | The SonarQube Cloud instance's region. |
| <code><a href="#projen.sonarqube.SonarqubePropertiesOptions.property.rust">rust</a></code> | <code><a href="#projen.sonarqube.SonarqubeRustOptions">SonarqubeRustOptions</a></code> | Rust-specific options (`sonar.rust.*`). |
| <code><a href="#projen.sonarqube.SonarqubePropertiesOptions.property.scm">scm</a></code> | <code><a href="#projen.sonarqube.SonarqubeScmOptions">SonarqubeScmOptions</a></code> | SCM-related options (`sonar.scm.*`). |
| <code><a href="#projen.sonarqube.SonarqubePropertiesOptions.property.sourceEncoding">sourceEncoding</a></code> | <code>string</code> | Encoding of the source files. |
| <code><a href="#projen.sonarqube.SonarqubePropertiesOptions.property.sources">sources</a></code> | <code>string</code> | Comma-separated paths to directories containing main source code (non-test code). |
| <code><a href="#projen.sonarqube.SonarqubePropertiesOptions.property.tests">tests</a></code> | <code>string</code> | Comma-separated paths to directories containing test code. |
| <code><a href="#projen.sonarqube.SonarqubePropertiesOptions.property.typescript">typescript</a></code> | <code><a href="#projen.sonarqube.SonarqubeTypescriptOptions">SonarqubeTypescriptOptions</a></code> | TypeScript-specific options (`sonar.typescript.*`). |

---

##### `projectKey`<sup>Required</sup> <a name="projectKey" id="projen.sonarqube.SonarqubePropertiesOptions.property.projectKey"></a>

```typescript
public readonly projectKey: string;
```

- *Type:* string

The project's unique key.

Can include up to 400 characters. Allowed characters:
letters, digits, dash, underscore, periods, and colons.

Maps to `sonar.projectKey`. This parameter is mandatory.

---

##### `coverage`<sup>Optional</sup> <a name="coverage" id="projen.sonarqube.SonarqubePropertiesOptions.property.coverage"></a>

```typescript
public readonly coverage: SonarqubeCoverageOptions;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeCoverageOptions">SonarqubeCoverageOptions</a>
- *Default:* no coverage configuration

Coverage-related options (`sonar.coverage.*`).

---

##### `cpd`<sup>Optional</sup> <a name="cpd" id="projen.sonarqube.SonarqubePropertiesOptions.property.cpd"></a>

```typescript
public readonly cpd: SonarqubeCpdOptions;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeCpdOptions">SonarqubeCpdOptions</a>
- *Default:* no CPD configuration

Duplication detection options (`sonar.cpd.*`).

---

##### `exclusions`<sup>Optional</sup> <a name="exclusions" id="projen.sonarqube.SonarqubePropertiesOptions.property.exclusions"></a>

```typescript
public readonly exclusions: string[];
```

- *Type:* string[]
- *Default:* no exclusions

Comma-separated file path patterns to exclude from the analysis scope.

Maps to `sonar.exclusions`.

---

##### `extraProperties`<sup>Optional</sup> <a name="extraProperties" id="projen.sonarqube.SonarqubePropertiesOptions.property.extraProperties"></a>

```typescript
public readonly extraProperties: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* no additional properties

Additional arbitrary properties to include in the configuration.

Use this for properties not covered by the typed options.
Keys use dot-notation (e.g., `sonar.java.binaries`).

These are applied as overrides after the typed options above, so a key
that is a prefix of a typed option (e.g. `"sonar.coverage"`) replaces
that entire subtree rather than merging with it.

---

##### `fileOptions`<sup>Optional</sup> <a name="fileOptions" id="projen.sonarqube.SonarqubePropertiesOptions.property.fileOptions"></a>

```typescript
public readonly fileOptions: SonarqubeFileOptions;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeFileOptions">SonarqubeFileOptions</a>
- *Default:* default file options

Options for the generated properties file.

---

##### `javascript`<sup>Optional</sup> <a name="javascript" id="projen.sonarqube.SonarqubePropertiesOptions.property.javascript"></a>

```typescript
public readonly javascript: SonarqubeJavascriptOptions;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeJavascriptOptions">SonarqubeJavascriptOptions</a>
- *Default:* no JavaScript configuration

JavaScript-specific options (`sonar.javascript.*`).

---

##### `language`<sup>Optional</sup> <a name="language" id="projen.sonarqube.SonarqubePropertiesOptions.property.language"></a>

```typescript
public readonly language: string;
```

- *Type:* string
- *Default:* auto-detected

The language for analysis.

Maps to `sonar.language`.

---

##### `log`<sup>Optional</sup> <a name="log" id="projen.sonarqube.SonarqubePropertiesOptions.property.log"></a>

```typescript
public readonly log: SonarqubeLogOptions;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeLogOptions">SonarqubeLogOptions</a>
- *Default:* INFO level

Logging options (`sonar.log.*`).

---

##### `organization`<sup>Optional</sup> <a name="organization" id="projen.sonarqube.SonarqubePropertiesOptions.property.organization"></a>

```typescript
public readonly organization: string;
```

- *Type:* string
- *Default:* no organization

The key of the organization to which the project belongs.

Maps to `sonar.organization`. Mandatory for SonarQube Cloud.

---

##### `profile`<sup>Optional</sup> <a name="profile" id="projen.sonarqube.SonarqubePropertiesOptions.property.profile"></a>

```typescript
public readonly profile: string;
```

- *Type:* string
- *Default:* uses the default profile configured on the server

The quality profile name.

Maps to `sonar.profile`.

---

##### `projectBaseDir`<sup>Optional</sup> <a name="projectBaseDir" id="projen.sonarqube.SonarqubePropertiesOptions.property.projectBaseDir"></a>

```typescript
public readonly projectBaseDir: string;
```

- *Type:* string
- *Default:* the directory from which the analysis was started

The project's base directory when the analysis needs to take place in a directory other than the one from which it was started.

Maps to `sonar.projectBaseDir`.

---

##### `projectName`<sup>Optional</sup> <a name="projectName" id="projen.sonarqube.SonarqubePropertiesOptions.property.projectName"></a>

```typescript
public readonly projectName: string;
```

- *Type:* string
- *Default:* not set

Name of the project displayed on the web interface.

Maps to `sonar.projectName`.

---

##### `projectVersion`<sup>Optional</sup> <a name="projectVersion" id="projen.sonarqube.SonarqubePropertiesOptions.property.projectVersion"></a>

```typescript
public readonly projectVersion: string;
```

- *Type:* string
- *Default:* not set

The project version.

Maps to `sonar.projectVersion`.

---

##### `qualitygate`<sup>Optional</sup> <a name="qualitygate" id="projen.sonarqube.SonarqubePropertiesOptions.property.qualitygate"></a>

```typescript
public readonly qualitygate: SonarqubeQualityGateOptions;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeQualityGateOptions">SonarqubeQualityGateOptions</a>
- *Default:* quality gate not awaited

Quality gate options (`sonar.qualitygate.*`).

---

##### `region`<sup>Optional</sup> <a name="region" id="projen.sonarqube.SonarqubePropertiesOptions.property.region"></a>

```typescript
public readonly region: SonarqubeRegion;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeRegion">SonarqubeRegion</a>
- *Default:* SonarqubeRegion.EU

The SonarQube Cloud instance's region.

Maps to `sonar.region`.

---

##### `rust`<sup>Optional</sup> <a name="rust" id="projen.sonarqube.SonarqubePropertiesOptions.property.rust"></a>

```typescript
public readonly rust: SonarqubeRustOptions;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeRustOptions">SonarqubeRustOptions</a>
- *Default:* no Rust configuration

Rust-specific options (`sonar.rust.*`).

---

##### `scm`<sup>Optional</sup> <a name="scm" id="projen.sonarqube.SonarqubePropertiesOptions.property.scm"></a>

```typescript
public readonly scm: SonarqubeScmOptions;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeScmOptions">SonarqubeScmOptions</a>
- *Default:* no SCM configuration

SCM-related options (`sonar.scm.*`).

---

##### `sourceEncoding`<sup>Optional</sup> <a name="sourceEncoding" id="projen.sonarqube.SonarqubePropertiesOptions.property.sourceEncoding"></a>

```typescript
public readonly sourceEncoding: string;
```

- *Type:* string
- *Default:* system encoding

Encoding of the source files.

Maps to `sonar.sourceEncoding`.

---

##### `sources`<sup>Optional</sup> <a name="sources" id="projen.sonarqube.SonarqubePropertiesOptions.property.sources"></a>

```typescript
public readonly sources: string;
```

- *Type:* string
- *Default:* the project base directory

Comma-separated paths to directories containing main source code (non-test code).

Maps to `sonar.sources`.

---

##### `tests`<sup>Optional</sup> <a name="tests" id="projen.sonarqube.SonarqubePropertiesOptions.property.tests"></a>

```typescript
public readonly tests: string;
```

- *Type:* string
- *Default:* no test code analyzed

Comma-separated paths to directories containing test code.

Maps to `sonar.tests`.

---

##### `typescript`<sup>Optional</sup> <a name="typescript" id="projen.sonarqube.SonarqubePropertiesOptions.property.typescript"></a>

```typescript
public readonly typescript: SonarqubeTypescriptOptions;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeTypescriptOptions">SonarqubeTypescriptOptions</a>
- *Default:* no TypeScript configuration

TypeScript-specific options (`sonar.typescript.*`).

---

### SonarqubeQualityGateOptions <a name="SonarqubeQualityGateOptions" id="projen.sonarqube.SonarqubeQualityGateOptions"></a>

Options for `sonar.qualitygate.*` properties.

#### Initializer <a name="Initializer" id="projen.sonarqube.SonarqubeQualityGateOptions.Initializer"></a>

```typescript
import { sonarqube } from 'projen'

const sonarqubeQualityGateOptions: sonarqube.SonarqubeQualityGateOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.sonarqube.SonarqubeQualityGateOptions.property.timeout">timeout</a></code> | <code>number</code> | The number of seconds that the scanner should wait for a report to be processed. |
| <code><a href="#projen.sonarqube.SonarqubeQualityGateOptions.property.wait">wait</a></code> | <code>boolean</code> | Forces the analysis step to poll the server and wait for the Quality Gate status. |

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="projen.sonarqube.SonarqubeQualityGateOptions.property.timeout"></a>

```typescript
public readonly timeout: number;
```

- *Type:* number
- *Default:* 300

The number of seconds that the scanner should wait for a report to be processed.

Maps to `sonar.qualitygate.timeout`.

---

##### `wait`<sup>Optional</sup> <a name="wait" id="projen.sonarqube.SonarqubeQualityGateOptions.property.wait"></a>

```typescript
public readonly wait: boolean;
```

- *Type:* boolean
- *Default:* false

Forces the analysis step to poll the server and wait for the Quality Gate status.

Will fail the pipeline if the quality gate fails.

Maps to `sonar.qualitygate.wait`.

---

### SonarqubeRustClippyOptions <a name="SonarqubeRustClippyOptions" id="projen.sonarqube.SonarqubeRustClippyOptions"></a>

Options for `sonar.rust.clippy.*` properties.

#### Initializer <a name="Initializer" id="projen.sonarqube.SonarqubeRustClippyOptions.Initializer"></a>

```typescript
import { sonarqube } from 'projen'

const sonarqubeRustClippyOptions: sonarqube.SonarqubeRustClippyOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.sonarqube.SonarqubeRustClippyOptions.property.enabled">enabled</a></code> | <code>boolean</code> | Whether Clippy analysis is enabled. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.sonarqube.SonarqubeRustClippyOptions.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean
- *Default:* true

Whether Clippy analysis is enabled.

Maps to `sonar.rust.clippy.enabled`.

---

### SonarqubeRustClippyReportOptions <a name="SonarqubeRustClippyReportOptions" id="projen.sonarqube.SonarqubeRustClippyReportOptions"></a>

Options for `sonar.rust.clippyReport.*` properties.

#### Initializer <a name="Initializer" id="projen.sonarqube.SonarqubeRustClippyReportOptions.Initializer"></a>

```typescript
import { sonarqube } from 'projen'

const sonarqubeRustClippyReportOptions: sonarqube.SonarqubeRustClippyReportOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.sonarqube.SonarqubeRustClippyReportOptions.property.reportPaths">reportPaths</a></code> | <code>string[]</code> | Paths to Clippy JSON report files. |

---

##### `reportPaths`<sup>Optional</sup> <a name="reportPaths" id="projen.sonarqube.SonarqubeRustClippyReportOptions.property.reportPaths"></a>

```typescript
public readonly reportPaths: string[];
```

- *Type:* string[]
- *Default:* not set

Paths to Clippy JSON report files.

Maps to `sonar.rust.clippyReport.reportPaths`.

---

### SonarqubeRustOptions <a name="SonarqubeRustOptions" id="projen.sonarqube.SonarqubeRustOptions"></a>

Options for `sonar.rust.*` properties.

#### Initializer <a name="Initializer" id="projen.sonarqube.SonarqubeRustOptions.Initializer"></a>

```typescript
import { sonarqube } from 'projen'

const sonarqubeRustOptions: sonarqube.SonarqubeRustOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.sonarqube.SonarqubeRustOptions.property.clippy">clippy</a></code> | <code><a href="#projen.sonarqube.SonarqubeRustClippyOptions">SonarqubeRustClippyOptions</a></code> | Options for `sonar.rust.clippy.*`. |
| <code><a href="#projen.sonarqube.SonarqubeRustOptions.property.clippyReport">clippyReport</a></code> | <code><a href="#projen.sonarqube.SonarqubeRustClippyReportOptions">SonarqubeRustClippyReportOptions</a></code> | Options for `sonar.rust.clippyReport.*`. |
| <code><a href="#projen.sonarqube.SonarqubeRustOptions.property.lcov">lcov</a></code> | <code><a href="#projen.sonarqube.SonarqubeLcovOptions">SonarqubeLcovOptions</a></code> | Options for `sonar.rust.lcov.*`. |

---

##### `clippy`<sup>Optional</sup> <a name="clippy" id="projen.sonarqube.SonarqubeRustOptions.property.clippy"></a>

```typescript
public readonly clippy: SonarqubeRustClippyOptions;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeRustClippyOptions">SonarqubeRustClippyOptions</a>
- *Default:* no clippy configuration

Options for `sonar.rust.clippy.*`.

---

##### `clippyReport`<sup>Optional</sup> <a name="clippyReport" id="projen.sonarqube.SonarqubeRustOptions.property.clippyReport"></a>

```typescript
public readonly clippyReport: SonarqubeRustClippyReportOptions;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeRustClippyReportOptions">SonarqubeRustClippyReportOptions</a>
- *Default:* no clippy report configuration

Options for `sonar.rust.clippyReport.*`.

---

##### `lcov`<sup>Optional</sup> <a name="lcov" id="projen.sonarqube.SonarqubeRustOptions.property.lcov"></a>

```typescript
public readonly lcov: SonarqubeLcovOptions;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeLcovOptions">SonarqubeLcovOptions</a>
- *Default:* no Rust LCOV configuration

Options for `sonar.rust.lcov.*`.

---

### SonarqubeRustPropertiesOptions <a name="SonarqubeRustPropertiesOptions" id="projen.sonarqube.SonarqubeRustPropertiesOptions"></a>

Options for `SonarqubeRustProperties`.

Extends base options with Rust-specific defaults.

#### Initializer <a name="Initializer" id="projen.sonarqube.SonarqubeRustPropertiesOptions.Initializer"></a>

```typescript
import { sonarqube } from 'projen'

const sonarqubeRustPropertiesOptions: sonarqube.SonarqubeRustPropertiesOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.sonarqube.SonarqubeRustPropertiesOptions.property.projectKey">projectKey</a></code> | <code>string</code> | The project's unique key. |
| <code><a href="#projen.sonarqube.SonarqubeRustPropertiesOptions.property.coverage">coverage</a></code> | <code><a href="#projen.sonarqube.SonarqubeCoverageOptions">SonarqubeCoverageOptions</a></code> | Coverage-related options (`sonar.coverage.*`). |
| <code><a href="#projen.sonarqube.SonarqubeRustPropertiesOptions.property.cpd">cpd</a></code> | <code><a href="#projen.sonarqube.SonarqubeCpdOptions">SonarqubeCpdOptions</a></code> | Duplication detection options (`sonar.cpd.*`). |
| <code><a href="#projen.sonarqube.SonarqubeRustPropertiesOptions.property.exclusions">exclusions</a></code> | <code>string[]</code> | Comma-separated file path patterns to exclude from the analysis scope. |
| <code><a href="#projen.sonarqube.SonarqubeRustPropertiesOptions.property.extraProperties">extraProperties</a></code> | <code>{[ key: string ]: string}</code> | Additional arbitrary properties to include in the configuration. |
| <code><a href="#projen.sonarqube.SonarqubeRustPropertiesOptions.property.fileOptions">fileOptions</a></code> | <code><a href="#projen.sonarqube.SonarqubeFileOptions">SonarqubeFileOptions</a></code> | Options for the generated properties file. |
| <code><a href="#projen.sonarqube.SonarqubeRustPropertiesOptions.property.javascript">javascript</a></code> | <code><a href="#projen.sonarqube.SonarqubeJavascriptOptions">SonarqubeJavascriptOptions</a></code> | JavaScript-specific options (`sonar.javascript.*`). |
| <code><a href="#projen.sonarqube.SonarqubeRustPropertiesOptions.property.language">language</a></code> | <code>string</code> | The language for analysis. |
| <code><a href="#projen.sonarqube.SonarqubeRustPropertiesOptions.property.log">log</a></code> | <code><a href="#projen.sonarqube.SonarqubeLogOptions">SonarqubeLogOptions</a></code> | Logging options (`sonar.log.*`). |
| <code><a href="#projen.sonarqube.SonarqubeRustPropertiesOptions.property.organization">organization</a></code> | <code>string</code> | The key of the organization to which the project belongs. |
| <code><a href="#projen.sonarqube.SonarqubeRustPropertiesOptions.property.profile">profile</a></code> | <code>string</code> | The quality profile name. |
| <code><a href="#projen.sonarqube.SonarqubeRustPropertiesOptions.property.projectBaseDir">projectBaseDir</a></code> | <code>string</code> | The project's base directory when the analysis needs to take place in a directory other than the one from which it was started. |
| <code><a href="#projen.sonarqube.SonarqubeRustPropertiesOptions.property.projectName">projectName</a></code> | <code>string</code> | Name of the project displayed on the web interface. |
| <code><a href="#projen.sonarqube.SonarqubeRustPropertiesOptions.property.projectVersion">projectVersion</a></code> | <code>string</code> | The project version. |
| <code><a href="#projen.sonarqube.SonarqubeRustPropertiesOptions.property.qualitygate">qualitygate</a></code> | <code><a href="#projen.sonarqube.SonarqubeQualityGateOptions">SonarqubeQualityGateOptions</a></code> | Quality gate options (`sonar.qualitygate.*`). |
| <code><a href="#projen.sonarqube.SonarqubeRustPropertiesOptions.property.region">region</a></code> | <code><a href="#projen.sonarqube.SonarqubeRegion">SonarqubeRegion</a></code> | The SonarQube Cloud instance's region. |
| <code><a href="#projen.sonarqube.SonarqubeRustPropertiesOptions.property.rust">rust</a></code> | <code><a href="#projen.sonarqube.SonarqubeRustOptions">SonarqubeRustOptions</a></code> | Rust-specific options (`sonar.rust.*`). |
| <code><a href="#projen.sonarqube.SonarqubeRustPropertiesOptions.property.scm">scm</a></code> | <code><a href="#projen.sonarqube.SonarqubeScmOptions">SonarqubeScmOptions</a></code> | SCM-related options (`sonar.scm.*`). |
| <code><a href="#projen.sonarqube.SonarqubeRustPropertiesOptions.property.sourceEncoding">sourceEncoding</a></code> | <code>string</code> | Encoding of the source files. |
| <code><a href="#projen.sonarqube.SonarqubeRustPropertiesOptions.property.sources">sources</a></code> | <code>string</code> | Comma-separated paths to directories containing main source code (non-test code). |
| <code><a href="#projen.sonarqube.SonarqubeRustPropertiesOptions.property.tests">tests</a></code> | <code>string</code> | Comma-separated paths to directories containing test code. |
| <code><a href="#projen.sonarqube.SonarqubeRustPropertiesOptions.property.typescript">typescript</a></code> | <code><a href="#projen.sonarqube.SonarqubeTypescriptOptions">SonarqubeTypescriptOptions</a></code> | TypeScript-specific options (`sonar.typescript.*`). |

---

##### `projectKey`<sup>Required</sup> <a name="projectKey" id="projen.sonarqube.SonarqubeRustPropertiesOptions.property.projectKey"></a>

```typescript
public readonly projectKey: string;
```

- *Type:* string

The project's unique key.

Can include up to 400 characters. Allowed characters:
letters, digits, dash, underscore, periods, and colons.

Maps to `sonar.projectKey`. This parameter is mandatory.

---

##### `coverage`<sup>Optional</sup> <a name="coverage" id="projen.sonarqube.SonarqubeRustPropertiesOptions.property.coverage"></a>

```typescript
public readonly coverage: SonarqubeCoverageOptions;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeCoverageOptions">SonarqubeCoverageOptions</a>
- *Default:* no coverage configuration

Coverage-related options (`sonar.coverage.*`).

---

##### `cpd`<sup>Optional</sup> <a name="cpd" id="projen.sonarqube.SonarqubeRustPropertiesOptions.property.cpd"></a>

```typescript
public readonly cpd: SonarqubeCpdOptions;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeCpdOptions">SonarqubeCpdOptions</a>
- *Default:* no CPD configuration

Duplication detection options (`sonar.cpd.*`).

---

##### `exclusions`<sup>Optional</sup> <a name="exclusions" id="projen.sonarqube.SonarqubeRustPropertiesOptions.property.exclusions"></a>

```typescript
public readonly exclusions: string[];
```

- *Type:* string[]
- *Default:* no exclusions

Comma-separated file path patterns to exclude from the analysis scope.

Maps to `sonar.exclusions`.

---

##### `extraProperties`<sup>Optional</sup> <a name="extraProperties" id="projen.sonarqube.SonarqubeRustPropertiesOptions.property.extraProperties"></a>

```typescript
public readonly extraProperties: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* no additional properties

Additional arbitrary properties to include in the configuration.

Use this for properties not covered by the typed options.
Keys use dot-notation (e.g., `sonar.java.binaries`).

These are applied as overrides after the typed options above, so a key
that is a prefix of a typed option (e.g. `"sonar.coverage"`) replaces
that entire subtree rather than merging with it.

---

##### `fileOptions`<sup>Optional</sup> <a name="fileOptions" id="projen.sonarqube.SonarqubeRustPropertiesOptions.property.fileOptions"></a>

```typescript
public readonly fileOptions: SonarqubeFileOptions;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeFileOptions">SonarqubeFileOptions</a>
- *Default:* default file options

Options for the generated properties file.

---

##### `javascript`<sup>Optional</sup> <a name="javascript" id="projen.sonarqube.SonarqubeRustPropertiesOptions.property.javascript"></a>

```typescript
public readonly javascript: SonarqubeJavascriptOptions;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeJavascriptOptions">SonarqubeJavascriptOptions</a>
- *Default:* no JavaScript configuration

JavaScript-specific options (`sonar.javascript.*`).

---

##### `language`<sup>Optional</sup> <a name="language" id="projen.sonarqube.SonarqubeRustPropertiesOptions.property.language"></a>

```typescript
public readonly language: string;
```

- *Type:* string
- *Default:* auto-detected

The language for analysis.

Maps to `sonar.language`.

---

##### `log`<sup>Optional</sup> <a name="log" id="projen.sonarqube.SonarqubeRustPropertiesOptions.property.log"></a>

```typescript
public readonly log: SonarqubeLogOptions;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeLogOptions">SonarqubeLogOptions</a>
- *Default:* INFO level

Logging options (`sonar.log.*`).

---

##### `organization`<sup>Optional</sup> <a name="organization" id="projen.sonarqube.SonarqubeRustPropertiesOptions.property.organization"></a>

```typescript
public readonly organization: string;
```

- *Type:* string
- *Default:* no organization

The key of the organization to which the project belongs.

Maps to `sonar.organization`. Mandatory for SonarQube Cloud.

---

##### `profile`<sup>Optional</sup> <a name="profile" id="projen.sonarqube.SonarqubeRustPropertiesOptions.property.profile"></a>

```typescript
public readonly profile: string;
```

- *Type:* string
- *Default:* uses the default profile configured on the server

The quality profile name.

Maps to `sonar.profile`.

---

##### `projectBaseDir`<sup>Optional</sup> <a name="projectBaseDir" id="projen.sonarqube.SonarqubeRustPropertiesOptions.property.projectBaseDir"></a>

```typescript
public readonly projectBaseDir: string;
```

- *Type:* string
- *Default:* the directory from which the analysis was started

The project's base directory when the analysis needs to take place in a directory other than the one from which it was started.

Maps to `sonar.projectBaseDir`.

---

##### `projectName`<sup>Optional</sup> <a name="projectName" id="projen.sonarqube.SonarqubeRustPropertiesOptions.property.projectName"></a>

```typescript
public readonly projectName: string;
```

- *Type:* string
- *Default:* not set

Name of the project displayed on the web interface.

Maps to `sonar.projectName`.

---

##### `projectVersion`<sup>Optional</sup> <a name="projectVersion" id="projen.sonarqube.SonarqubeRustPropertiesOptions.property.projectVersion"></a>

```typescript
public readonly projectVersion: string;
```

- *Type:* string
- *Default:* not set

The project version.

Maps to `sonar.projectVersion`.

---

##### `qualitygate`<sup>Optional</sup> <a name="qualitygate" id="projen.sonarqube.SonarqubeRustPropertiesOptions.property.qualitygate"></a>

```typescript
public readonly qualitygate: SonarqubeQualityGateOptions;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeQualityGateOptions">SonarqubeQualityGateOptions</a>
- *Default:* quality gate not awaited

Quality gate options (`sonar.qualitygate.*`).

---

##### `region`<sup>Optional</sup> <a name="region" id="projen.sonarqube.SonarqubeRustPropertiesOptions.property.region"></a>

```typescript
public readonly region: SonarqubeRegion;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeRegion">SonarqubeRegion</a>
- *Default:* SonarqubeRegion.EU

The SonarQube Cloud instance's region.

Maps to `sonar.region`.

---

##### `rust`<sup>Optional</sup> <a name="rust" id="projen.sonarqube.SonarqubeRustPropertiesOptions.property.rust"></a>

```typescript
public readonly rust: SonarqubeRustOptions;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeRustOptions">SonarqubeRustOptions</a>
- *Default:* no Rust configuration

Rust-specific options (`sonar.rust.*`).

---

##### `scm`<sup>Optional</sup> <a name="scm" id="projen.sonarqube.SonarqubeRustPropertiesOptions.property.scm"></a>

```typescript
public readonly scm: SonarqubeScmOptions;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeScmOptions">SonarqubeScmOptions</a>
- *Default:* no SCM configuration

SCM-related options (`sonar.scm.*`).

---

##### `sourceEncoding`<sup>Optional</sup> <a name="sourceEncoding" id="projen.sonarqube.SonarqubeRustPropertiesOptions.property.sourceEncoding"></a>

```typescript
public readonly sourceEncoding: string;
```

- *Type:* string
- *Default:* system encoding

Encoding of the source files.

Maps to `sonar.sourceEncoding`.

---

##### `sources`<sup>Optional</sup> <a name="sources" id="projen.sonarqube.SonarqubeRustPropertiesOptions.property.sources"></a>

```typescript
public readonly sources: string;
```

- *Type:* string
- *Default:* the project base directory

Comma-separated paths to directories containing main source code (non-test code).

Maps to `sonar.sources`.

---

##### `tests`<sup>Optional</sup> <a name="tests" id="projen.sonarqube.SonarqubeRustPropertiesOptions.property.tests"></a>

```typescript
public readonly tests: string;
```

- *Type:* string
- *Default:* no test code analyzed

Comma-separated paths to directories containing test code.

Maps to `sonar.tests`.

---

##### `typescript`<sup>Optional</sup> <a name="typescript" id="projen.sonarqube.SonarqubeRustPropertiesOptions.property.typescript"></a>

```typescript
public readonly typescript: SonarqubeTypescriptOptions;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeTypescriptOptions">SonarqubeTypescriptOptions</a>
- *Default:* no TypeScript configuration

TypeScript-specific options (`sonar.typescript.*`).

---

### SonarqubeScmExclusionsOptions <a name="SonarqubeScmExclusionsOptions" id="projen.sonarqube.SonarqubeScmExclusionsOptions"></a>

Options for `sonar.scm.exclusions.*` properties.

#### Initializer <a name="Initializer" id="projen.sonarqube.SonarqubeScmExclusionsOptions.Initializer"></a>

```typescript
import { sonarqube } from 'projen'

const sonarqubeScmExclusionsOptions: sonarqube.SonarqubeScmExclusionsOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.sonarqube.SonarqubeScmExclusionsOptions.property.disabled">disabled</a></code> | <code>boolean</code> | Whether to disable files ignored by the SCM (e.g., files in .gitignore) from being excluded from analysis. |

---

##### `disabled`<sup>Optional</sup> <a name="disabled" id="projen.sonarqube.SonarqubeScmExclusionsOptions.property.disabled"></a>

```typescript
public readonly disabled: boolean;
```

- *Type:* boolean
- *Default:* false

Whether to disable files ignored by the SCM (e.g., files in .gitignore) from being excluded from analysis.

Maps to `sonar.scm.exclusions.disabled`.

---

### SonarqubeScmOptions <a name="SonarqubeScmOptions" id="projen.sonarqube.SonarqubeScmOptions"></a>

Options for `sonar.scm.*` properties.

#### Initializer <a name="Initializer" id="projen.sonarqube.SonarqubeScmOptions.Initializer"></a>

```typescript
import { sonarqube } from 'projen'

const sonarqubeScmOptions: sonarqube.SonarqubeScmOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.sonarqube.SonarqubeScmOptions.property.exclusions">exclusions</a></code> | <code><a href="#projen.sonarqube.SonarqubeScmExclusionsOptions">SonarqubeScmExclusionsOptions</a></code> | Options for `sonar.scm.exclusions.*`. |
| <code><a href="#projen.sonarqube.SonarqubeScmOptions.property.provider">provider</a></code> | <code>string</code> | The SCM provider to use. |

---

##### `exclusions`<sup>Optional</sup> <a name="exclusions" id="projen.sonarqube.SonarqubeScmOptions.property.exclusions"></a>

```typescript
public readonly exclusions: SonarqubeScmExclusionsOptions;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeScmExclusionsOptions">SonarqubeScmExclusionsOptions</a>
- *Default:* no exclusion overrides

Options for `sonar.scm.exclusions.*`.

---

##### `provider`<sup>Optional</sup> <a name="provider" id="projen.sonarqube.SonarqubeScmOptions.property.provider"></a>

```typescript
public readonly provider: string;
```

- *Type:* string
- *Default:* auto-detected

The SCM provider to use.

Maps to `sonar.scm.provider`.

---

### SonarqubeTypescriptOptions <a name="SonarqubeTypescriptOptions" id="projen.sonarqube.SonarqubeTypescriptOptions"></a>

Options for `sonar.typescript.*` properties.

#### Initializer <a name="Initializer" id="projen.sonarqube.SonarqubeTypescriptOptions.Initializer"></a>

```typescript
import { sonarqube } from 'projen'

const sonarqubeTypescriptOptions: sonarqube.SonarqubeTypescriptOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.sonarqube.SonarqubeTypescriptOptions.property.tsconfigPath">tsconfigPath</a></code> | <code>string</code> | Path to the TypeScript configuration file. |

---

##### `tsconfigPath`<sup>Optional</sup> <a name="tsconfigPath" id="projen.sonarqube.SonarqubeTypescriptOptions.property.tsconfigPath"></a>

```typescript
public readonly tsconfigPath: string;
```

- *Type:* string
- *Default:* not set

Path to the TypeScript configuration file.

Maps to `sonar.typescript.tsconfigPath`.

---

### SonarqubeTypescriptPropertiesOptions <a name="SonarqubeTypescriptPropertiesOptions" id="projen.sonarqube.SonarqubeTypescriptPropertiesOptions"></a>

Options for `SonarqubeTypescriptProperties`.

Extends base options with TypeScript-specific defaults.

#### Initializer <a name="Initializer" id="projen.sonarqube.SonarqubeTypescriptPropertiesOptions.Initializer"></a>

```typescript
import { sonarqube } from 'projen'

const sonarqubeTypescriptPropertiesOptions: sonarqube.SonarqubeTypescriptPropertiesOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.sonarqube.SonarqubeTypescriptPropertiesOptions.property.projectKey">projectKey</a></code> | <code>string</code> | The project's unique key. |
| <code><a href="#projen.sonarqube.SonarqubeTypescriptPropertiesOptions.property.coverage">coverage</a></code> | <code><a href="#projen.sonarqube.SonarqubeCoverageOptions">SonarqubeCoverageOptions</a></code> | Coverage-related options (`sonar.coverage.*`). |
| <code><a href="#projen.sonarqube.SonarqubeTypescriptPropertiesOptions.property.cpd">cpd</a></code> | <code><a href="#projen.sonarqube.SonarqubeCpdOptions">SonarqubeCpdOptions</a></code> | Duplication detection options (`sonar.cpd.*`). |
| <code><a href="#projen.sonarqube.SonarqubeTypescriptPropertiesOptions.property.exclusions">exclusions</a></code> | <code>string[]</code> | Comma-separated file path patterns to exclude from the analysis scope. |
| <code><a href="#projen.sonarqube.SonarqubeTypescriptPropertiesOptions.property.extraProperties">extraProperties</a></code> | <code>{[ key: string ]: string}</code> | Additional arbitrary properties to include in the configuration. |
| <code><a href="#projen.sonarqube.SonarqubeTypescriptPropertiesOptions.property.fileOptions">fileOptions</a></code> | <code><a href="#projen.sonarqube.SonarqubeFileOptions">SonarqubeFileOptions</a></code> | Options for the generated properties file. |
| <code><a href="#projen.sonarqube.SonarqubeTypescriptPropertiesOptions.property.javascript">javascript</a></code> | <code><a href="#projen.sonarqube.SonarqubeJavascriptOptions">SonarqubeJavascriptOptions</a></code> | JavaScript-specific options (`sonar.javascript.*`). |
| <code><a href="#projen.sonarqube.SonarqubeTypescriptPropertiesOptions.property.language">language</a></code> | <code>string</code> | The language for analysis. |
| <code><a href="#projen.sonarqube.SonarqubeTypescriptPropertiesOptions.property.log">log</a></code> | <code><a href="#projen.sonarqube.SonarqubeLogOptions">SonarqubeLogOptions</a></code> | Logging options (`sonar.log.*`). |
| <code><a href="#projen.sonarqube.SonarqubeTypescriptPropertiesOptions.property.organization">organization</a></code> | <code>string</code> | The key of the organization to which the project belongs. |
| <code><a href="#projen.sonarqube.SonarqubeTypescriptPropertiesOptions.property.profile">profile</a></code> | <code>string</code> | The quality profile name. |
| <code><a href="#projen.sonarqube.SonarqubeTypescriptPropertiesOptions.property.projectBaseDir">projectBaseDir</a></code> | <code>string</code> | The project's base directory when the analysis needs to take place in a directory other than the one from which it was started. |
| <code><a href="#projen.sonarqube.SonarqubeTypescriptPropertiesOptions.property.projectName">projectName</a></code> | <code>string</code> | Name of the project displayed on the web interface. |
| <code><a href="#projen.sonarqube.SonarqubeTypescriptPropertiesOptions.property.projectVersion">projectVersion</a></code> | <code>string</code> | The project version. |
| <code><a href="#projen.sonarqube.SonarqubeTypescriptPropertiesOptions.property.qualitygate">qualitygate</a></code> | <code><a href="#projen.sonarqube.SonarqubeQualityGateOptions">SonarqubeQualityGateOptions</a></code> | Quality gate options (`sonar.qualitygate.*`). |
| <code><a href="#projen.sonarqube.SonarqubeTypescriptPropertiesOptions.property.region">region</a></code> | <code><a href="#projen.sonarqube.SonarqubeRegion">SonarqubeRegion</a></code> | The SonarQube Cloud instance's region. |
| <code><a href="#projen.sonarqube.SonarqubeTypescriptPropertiesOptions.property.rust">rust</a></code> | <code><a href="#projen.sonarqube.SonarqubeRustOptions">SonarqubeRustOptions</a></code> | Rust-specific options (`sonar.rust.*`). |
| <code><a href="#projen.sonarqube.SonarqubeTypescriptPropertiesOptions.property.scm">scm</a></code> | <code><a href="#projen.sonarqube.SonarqubeScmOptions">SonarqubeScmOptions</a></code> | SCM-related options (`sonar.scm.*`). |
| <code><a href="#projen.sonarqube.SonarqubeTypescriptPropertiesOptions.property.sourceEncoding">sourceEncoding</a></code> | <code>string</code> | Encoding of the source files. |
| <code><a href="#projen.sonarqube.SonarqubeTypescriptPropertiesOptions.property.sources">sources</a></code> | <code>string</code> | Comma-separated paths to directories containing main source code (non-test code). |
| <code><a href="#projen.sonarqube.SonarqubeTypescriptPropertiesOptions.property.tests">tests</a></code> | <code>string</code> | Comma-separated paths to directories containing test code. |
| <code><a href="#projen.sonarqube.SonarqubeTypescriptPropertiesOptions.property.typescript">typescript</a></code> | <code><a href="#projen.sonarqube.SonarqubeTypescriptOptions">SonarqubeTypescriptOptions</a></code> | TypeScript-specific options (`sonar.typescript.*`). |

---

##### `projectKey`<sup>Required</sup> <a name="projectKey" id="projen.sonarqube.SonarqubeTypescriptPropertiesOptions.property.projectKey"></a>

```typescript
public readonly projectKey: string;
```

- *Type:* string

The project's unique key.

Can include up to 400 characters. Allowed characters:
letters, digits, dash, underscore, periods, and colons.

Maps to `sonar.projectKey`. This parameter is mandatory.

---

##### `coverage`<sup>Optional</sup> <a name="coverage" id="projen.sonarqube.SonarqubeTypescriptPropertiesOptions.property.coverage"></a>

```typescript
public readonly coverage: SonarqubeCoverageOptions;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeCoverageOptions">SonarqubeCoverageOptions</a>
- *Default:* no coverage configuration

Coverage-related options (`sonar.coverage.*`).

---

##### `cpd`<sup>Optional</sup> <a name="cpd" id="projen.sonarqube.SonarqubeTypescriptPropertiesOptions.property.cpd"></a>

```typescript
public readonly cpd: SonarqubeCpdOptions;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeCpdOptions">SonarqubeCpdOptions</a>
- *Default:* no CPD configuration

Duplication detection options (`sonar.cpd.*`).

---

##### `exclusions`<sup>Optional</sup> <a name="exclusions" id="projen.sonarqube.SonarqubeTypescriptPropertiesOptions.property.exclusions"></a>

```typescript
public readonly exclusions: string[];
```

- *Type:* string[]
- *Default:* no exclusions

Comma-separated file path patterns to exclude from the analysis scope.

Maps to `sonar.exclusions`.

---

##### `extraProperties`<sup>Optional</sup> <a name="extraProperties" id="projen.sonarqube.SonarqubeTypescriptPropertiesOptions.property.extraProperties"></a>

```typescript
public readonly extraProperties: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* no additional properties

Additional arbitrary properties to include in the configuration.

Use this for properties not covered by the typed options.
Keys use dot-notation (e.g., `sonar.java.binaries`).

These are applied as overrides after the typed options above, so a key
that is a prefix of a typed option (e.g. `"sonar.coverage"`) replaces
that entire subtree rather than merging with it.

---

##### `fileOptions`<sup>Optional</sup> <a name="fileOptions" id="projen.sonarqube.SonarqubeTypescriptPropertiesOptions.property.fileOptions"></a>

```typescript
public readonly fileOptions: SonarqubeFileOptions;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeFileOptions">SonarqubeFileOptions</a>
- *Default:* default file options

Options for the generated properties file.

---

##### `javascript`<sup>Optional</sup> <a name="javascript" id="projen.sonarqube.SonarqubeTypescriptPropertiesOptions.property.javascript"></a>

```typescript
public readonly javascript: SonarqubeJavascriptOptions;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeJavascriptOptions">SonarqubeJavascriptOptions</a>
- *Default:* no JavaScript configuration

JavaScript-specific options (`sonar.javascript.*`).

---

##### `language`<sup>Optional</sup> <a name="language" id="projen.sonarqube.SonarqubeTypescriptPropertiesOptions.property.language"></a>

```typescript
public readonly language: string;
```

- *Type:* string
- *Default:* auto-detected

The language for analysis.

Maps to `sonar.language`.

---

##### `log`<sup>Optional</sup> <a name="log" id="projen.sonarqube.SonarqubeTypescriptPropertiesOptions.property.log"></a>

```typescript
public readonly log: SonarqubeLogOptions;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeLogOptions">SonarqubeLogOptions</a>
- *Default:* INFO level

Logging options (`sonar.log.*`).

---

##### `organization`<sup>Optional</sup> <a name="organization" id="projen.sonarqube.SonarqubeTypescriptPropertiesOptions.property.organization"></a>

```typescript
public readonly organization: string;
```

- *Type:* string
- *Default:* no organization

The key of the organization to which the project belongs.

Maps to `sonar.organization`. Mandatory for SonarQube Cloud.

---

##### `profile`<sup>Optional</sup> <a name="profile" id="projen.sonarqube.SonarqubeTypescriptPropertiesOptions.property.profile"></a>

```typescript
public readonly profile: string;
```

- *Type:* string
- *Default:* uses the default profile configured on the server

The quality profile name.

Maps to `sonar.profile`.

---

##### `projectBaseDir`<sup>Optional</sup> <a name="projectBaseDir" id="projen.sonarqube.SonarqubeTypescriptPropertiesOptions.property.projectBaseDir"></a>

```typescript
public readonly projectBaseDir: string;
```

- *Type:* string
- *Default:* the directory from which the analysis was started

The project's base directory when the analysis needs to take place in a directory other than the one from which it was started.

Maps to `sonar.projectBaseDir`.

---

##### `projectName`<sup>Optional</sup> <a name="projectName" id="projen.sonarqube.SonarqubeTypescriptPropertiesOptions.property.projectName"></a>

```typescript
public readonly projectName: string;
```

- *Type:* string
- *Default:* not set

Name of the project displayed on the web interface.

Maps to `sonar.projectName`.

---

##### `projectVersion`<sup>Optional</sup> <a name="projectVersion" id="projen.sonarqube.SonarqubeTypescriptPropertiesOptions.property.projectVersion"></a>

```typescript
public readonly projectVersion: string;
```

- *Type:* string
- *Default:* not set

The project version.

Maps to `sonar.projectVersion`.

---

##### `qualitygate`<sup>Optional</sup> <a name="qualitygate" id="projen.sonarqube.SonarqubeTypescriptPropertiesOptions.property.qualitygate"></a>

```typescript
public readonly qualitygate: SonarqubeQualityGateOptions;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeQualityGateOptions">SonarqubeQualityGateOptions</a>
- *Default:* quality gate not awaited

Quality gate options (`sonar.qualitygate.*`).

---

##### `region`<sup>Optional</sup> <a name="region" id="projen.sonarqube.SonarqubeTypescriptPropertiesOptions.property.region"></a>

```typescript
public readonly region: SonarqubeRegion;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeRegion">SonarqubeRegion</a>
- *Default:* SonarqubeRegion.EU

The SonarQube Cloud instance's region.

Maps to `sonar.region`.

---

##### `rust`<sup>Optional</sup> <a name="rust" id="projen.sonarqube.SonarqubeTypescriptPropertiesOptions.property.rust"></a>

```typescript
public readonly rust: SonarqubeRustOptions;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeRustOptions">SonarqubeRustOptions</a>
- *Default:* no Rust configuration

Rust-specific options (`sonar.rust.*`).

---

##### `scm`<sup>Optional</sup> <a name="scm" id="projen.sonarqube.SonarqubeTypescriptPropertiesOptions.property.scm"></a>

```typescript
public readonly scm: SonarqubeScmOptions;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeScmOptions">SonarqubeScmOptions</a>
- *Default:* no SCM configuration

SCM-related options (`sonar.scm.*`).

---

##### `sourceEncoding`<sup>Optional</sup> <a name="sourceEncoding" id="projen.sonarqube.SonarqubeTypescriptPropertiesOptions.property.sourceEncoding"></a>

```typescript
public readonly sourceEncoding: string;
```

- *Type:* string
- *Default:* system encoding

Encoding of the source files.

Maps to `sonar.sourceEncoding`.

---

##### `sources`<sup>Optional</sup> <a name="sources" id="projen.sonarqube.SonarqubeTypescriptPropertiesOptions.property.sources"></a>

```typescript
public readonly sources: string;
```

- *Type:* string
- *Default:* the project base directory

Comma-separated paths to directories containing main source code (non-test code).

Maps to `sonar.sources`.

---

##### `tests`<sup>Optional</sup> <a name="tests" id="projen.sonarqube.SonarqubeTypescriptPropertiesOptions.property.tests"></a>

```typescript
public readonly tests: string;
```

- *Type:* string
- *Default:* no test code analyzed

Comma-separated paths to directories containing test code.

Maps to `sonar.tests`.

---

##### `typescript`<sup>Optional</sup> <a name="typescript" id="projen.sonarqube.SonarqubeTypescriptPropertiesOptions.property.typescript"></a>

```typescript
public readonly typescript: SonarqubeTypescriptOptions;
```

- *Type:* <a href="#projen.sonarqube.SonarqubeTypescriptOptions">SonarqubeTypescriptOptions</a>
- *Default:* no TypeScript configuration

TypeScript-specific options (`sonar.typescript.*`).

---



## Enums <a name="Enums" id="Enums"></a>

### SonarqubeLogLevel <a name="SonarqubeLogLevel" id="projen.sonarqube.SonarqubeLogLevel"></a>

Log level for SonarQube analysis.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.sonarqube.SonarqubeLogLevel.INFO">INFO</a></code> | Standard logging (default). |
| <code><a href="#projen.sonarqube.SonarqubeLogLevel.DEBUG">DEBUG</a></code> | Verbose logging. |
| <code><a href="#projen.sonarqube.SonarqubeLogLevel.TRACE">TRACE</a></code> | Most verbose, includes plugin/library output. |

---

##### `INFO` <a name="INFO" id="projen.sonarqube.SonarqubeLogLevel.INFO"></a>

Standard logging (default).

---


##### `DEBUG` <a name="DEBUG" id="projen.sonarqube.SonarqubeLogLevel.DEBUG"></a>

Verbose logging.

---


##### `TRACE` <a name="TRACE" id="projen.sonarqube.SonarqubeLogLevel.TRACE"></a>

Most verbose, includes plugin/library output.

---


### SonarqubeRegion <a name="SonarqubeRegion" id="projen.sonarqube.SonarqubeRegion"></a>

SonarQube Cloud region.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.sonarqube.SonarqubeRegion.EU">EU</a></code> | EU instance (default). |
| <code><a href="#projen.sonarqube.SonarqubeRegion.US">US</a></code> | US instance. |

---

##### `EU` <a name="EU" id="projen.sonarqube.SonarqubeRegion.EU"></a>

EU instance (default).

---


##### `US` <a name="US" id="projen.sonarqube.SonarqubeRegion.US"></a>

US instance.

---

