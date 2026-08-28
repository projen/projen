# `polaris` Submodule <a name="`polaris` Submodule" id="projen.polaris"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### PolarisCoverity <a name="PolarisCoverity" id="projen.polaris.PolarisCoverity"></a>

Manages `coverity.yml`, the configuration file for Coverity on Polaris (Black Duck's SAST scanning tool).

> [https://docs.blackduck.com/r/cov_polaris/latest/coverity-on-polaris/configuration-file-schema.html](https://docs.blackduck.com/r/cov_polaris/latest/coverity-on-polaris/configuration-file-schema.html)

#### Initializers <a name="Initializers" id="projen.polaris.PolarisCoverity.Initializer"></a>

```typescript
import { polaris } from 'projen'

new polaris.PolarisCoverity(project: Project, options: PolarisCoverityOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.PolarisCoverity.Initializer.parameter.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.polaris.PolarisCoverity.Initializer.parameter.options">options</a></code> | <code><a href="#projen.polaris.PolarisCoverityOptions">PolarisCoverityOptions</a></code> | *No description.* |

---

##### `project`<sup>Required</sup> <a name="project" id="projen.polaris.PolarisCoverity.Initializer.parameter.project"></a>

- *Type:* projen.Project

---

##### `options`<sup>Required</sup> <a name="options" id="projen.polaris.PolarisCoverity.Initializer.parameter.options"></a>

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


### PolarisGoCoverity <a name="PolarisGoCoverity" id="projen.polaris.PolarisGoCoverity"></a>

A Coverity on Polaris configuration preset for Go projects.

Provides sensible defaults for Go analysis:
- `capture.languages.include` = `[go]`
- `capture.buildCapture.buildCommand` = `go build .`
- `capture.compilerConfiguration.covConfigure` = `[["--go"]]`
- `capture.files.excludeRegex` excludes `vendor`, `bin` and other
  conventional Go build artifacts

All defaults can be overridden via options. Nested options (e.g.
`capture`) are deep-merged with the defaults, so overriding one nested
field does not drop the other defaults in that subtree.

*Example*

```typescript
new PolarisGoCoverity(project, {
  commit: {},
});
```


#### Initializers <a name="Initializers" id="projen.polaris.PolarisGoCoverity.Initializer"></a>

```typescript
import { polaris } from 'projen'

new polaris.PolarisGoCoverity(project: Project, options: PolarisCoverityGoOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.PolarisGoCoverity.Initializer.parameter.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.polaris.PolarisGoCoverity.Initializer.parameter.options">options</a></code> | <code><a href="#projen.polaris.PolarisCoverityGoOptions">PolarisCoverityGoOptions</a></code> | *No description.* |

---

##### `project`<sup>Required</sup> <a name="project" id="projen.polaris.PolarisGoCoverity.Initializer.parameter.project"></a>

- *Type:* projen.Project

---

##### `options`<sup>Required</sup> <a name="options" id="projen.polaris.PolarisGoCoverity.Initializer.parameter.options"></a>

- *Type:* <a href="#projen.polaris.PolarisCoverityGoOptions">PolarisCoverityGoOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.polaris.PolarisGoCoverity.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen.polaris.PolarisGoCoverity.with">with</a></code> | Applies one or more mixins to this construct. |
| <code><a href="#projen.polaris.PolarisGoCoverity.postProjectCreation">postProjectCreation</a></code> | Called once, right after `postSynthesize()`, only when the project is created for the first time. |
| <code><a href="#projen.polaris.PolarisGoCoverity.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen.polaris.PolarisGoCoverity.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen.polaris.PolarisGoCoverity.projectCreation">projectCreation</a></code> | Called once, right after `synthesize()`, only when the project is created for the first time. |
| <code><a href="#projen.polaris.PolarisGoCoverity.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |

---

##### `toString` <a name="toString" id="projen.polaris.PolarisGoCoverity.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="projen.polaris.PolarisGoCoverity.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="projen.polaris.PolarisGoCoverity.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

##### `postProjectCreation` <a name="postProjectCreation" id="projen.polaris.PolarisGoCoverity.postProjectCreation"></a>

```typescript
public postProjectCreation(initProject: InitProject): void
```

Called once, right after `postSynthesize()`, only when the project is created for the first time.

It does not run on later `projen` invocations. It only fires for `projen new` (or `Projects.createProject`).
It is also skipped when post-synthesis steps are disabled, e.g. `--no-post` or `PROJEN_DISABLE_POST`.
Use it for one-off setup that can be turned off by the user, like running a task to give the user immediate
feedback on their new project. Order across components is not guaranteed.

###### `initProject`<sup>Required</sup> <a name="initProject" id="projen.polaris.PolarisGoCoverity.postProjectCreation.parameter.initProject"></a>

- *Type:* projen.InitProject

Details about how the project was created, e.g. its type and the original CLI args.

---

##### `postSynthesize` <a name="postSynthesize" id="projen.polaris.PolarisGoCoverity.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen.polaris.PolarisGoCoverity.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `projectCreation` <a name="projectCreation" id="projen.polaris.PolarisGoCoverity.projectCreation"></a>

```typescript
public projectCreation(initProject: InitProject): void
```

Called once, right after `synthesize()`, only when the project is created for the first time.

It does not run on later `projen` invocations. It only fires for `projen new` (or `Projects.createProject`).
Use it for deterministic, one-off file generation. Order across components is not guaranteed.

###### `initProject`<sup>Required</sup> <a name="initProject" id="projen.polaris.PolarisGoCoverity.projectCreation.parameter.initProject"></a>

- *Type:* projen.InitProject

Details about how the project was created, e.g. its type and the original CLI args.

---

##### `synthesize` <a name="synthesize" id="projen.polaris.PolarisGoCoverity.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.polaris.PolarisGoCoverity.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen.polaris.PolarisGoCoverity.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="projen.polaris.PolarisGoCoverity.isConstruct"></a>

```typescript
import { polaris } from 'projen'

polaris.PolarisGoCoverity.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="projen.polaris.PolarisGoCoverity.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen.polaris.PolarisGoCoverity.isComponent"></a>

```typescript
import { polaris } from 'projen'

polaris.PolarisGoCoverity.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen.polaris.PolarisGoCoverity.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.PolarisGoCoverity.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen.polaris.PolarisGoCoverity.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.polaris.PolarisGoCoverity.property.file">file</a></code> | <code>projen.YamlFile</code> | The YAML file for the Coverity on Polaris configuration. |

---

##### `node`<sup>Required</sup> <a name="node" id="projen.polaris.PolarisGoCoverity.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen.polaris.PolarisGoCoverity.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---

##### `file`<sup>Required</sup> <a name="file" id="projen.polaris.PolarisGoCoverity.property.file"></a>

```typescript
public readonly file: YamlFile;
```

- *Type:* projen.YamlFile

The YAML file for the Coverity on Polaris configuration.

---


### PolarisJavaCoverity <a name="PolarisJavaCoverity" id="projen.polaris.PolarisJavaCoverity"></a>

A Coverity on Polaris configuration preset for Java projects.

Provides sensible defaults for Java analysis:
- `capture.languages.include` = `[java]`
- `capture.buildCapture.buildCommand` = `mvn package`
- `capture.buildCapture.cleanCommand` = `mvn clean`
- `capture.compilerConfiguration.covConfigure` = `[["--java"]]`
- `capture.files.excludeRegex` excludes `target`, `dist/java` and other
  conventional Maven/Gradle build artifacts

All defaults can be overridden via options. Nested options (e.g.
`capture`) are deep-merged with the defaults, so overriding one nested
field does not drop the other defaults in that subtree.

*Example*

```typescript
new PolarisJavaCoverity(project, {
  commit: {},
});
```


#### Initializers <a name="Initializers" id="projen.polaris.PolarisJavaCoverity.Initializer"></a>

```typescript
import { polaris } from 'projen'

new polaris.PolarisJavaCoverity(project: Project, options: PolarisCoverityJavaOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.PolarisJavaCoverity.Initializer.parameter.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.polaris.PolarisJavaCoverity.Initializer.parameter.options">options</a></code> | <code><a href="#projen.polaris.PolarisCoverityJavaOptions">PolarisCoverityJavaOptions</a></code> | *No description.* |

---

##### `project`<sup>Required</sup> <a name="project" id="projen.polaris.PolarisJavaCoverity.Initializer.parameter.project"></a>

- *Type:* projen.Project

---

##### `options`<sup>Required</sup> <a name="options" id="projen.polaris.PolarisJavaCoverity.Initializer.parameter.options"></a>

- *Type:* <a href="#projen.polaris.PolarisCoverityJavaOptions">PolarisCoverityJavaOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.polaris.PolarisJavaCoverity.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen.polaris.PolarisJavaCoverity.with">with</a></code> | Applies one or more mixins to this construct. |
| <code><a href="#projen.polaris.PolarisJavaCoverity.postProjectCreation">postProjectCreation</a></code> | Called once, right after `postSynthesize()`, only when the project is created for the first time. |
| <code><a href="#projen.polaris.PolarisJavaCoverity.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen.polaris.PolarisJavaCoverity.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen.polaris.PolarisJavaCoverity.projectCreation">projectCreation</a></code> | Called once, right after `synthesize()`, only when the project is created for the first time. |
| <code><a href="#projen.polaris.PolarisJavaCoverity.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |

---

##### `toString` <a name="toString" id="projen.polaris.PolarisJavaCoverity.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="projen.polaris.PolarisJavaCoverity.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="projen.polaris.PolarisJavaCoverity.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

##### `postProjectCreation` <a name="postProjectCreation" id="projen.polaris.PolarisJavaCoverity.postProjectCreation"></a>

```typescript
public postProjectCreation(initProject: InitProject): void
```

Called once, right after `postSynthesize()`, only when the project is created for the first time.

It does not run on later `projen` invocations. It only fires for `projen new` (or `Projects.createProject`).
It is also skipped when post-synthesis steps are disabled, e.g. `--no-post` or `PROJEN_DISABLE_POST`.
Use it for one-off setup that can be turned off by the user, like running a task to give the user immediate
feedback on their new project. Order across components is not guaranteed.

###### `initProject`<sup>Required</sup> <a name="initProject" id="projen.polaris.PolarisJavaCoverity.postProjectCreation.parameter.initProject"></a>

- *Type:* projen.InitProject

Details about how the project was created, e.g. its type and the original CLI args.

---

##### `postSynthesize` <a name="postSynthesize" id="projen.polaris.PolarisJavaCoverity.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen.polaris.PolarisJavaCoverity.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `projectCreation` <a name="projectCreation" id="projen.polaris.PolarisJavaCoverity.projectCreation"></a>

```typescript
public projectCreation(initProject: InitProject): void
```

Called once, right after `synthesize()`, only when the project is created for the first time.

It does not run on later `projen` invocations. It only fires for `projen new` (or `Projects.createProject`).
Use it for deterministic, one-off file generation. Order across components is not guaranteed.

###### `initProject`<sup>Required</sup> <a name="initProject" id="projen.polaris.PolarisJavaCoverity.projectCreation.parameter.initProject"></a>

- *Type:* projen.InitProject

Details about how the project was created, e.g. its type and the original CLI args.

---

##### `synthesize` <a name="synthesize" id="projen.polaris.PolarisJavaCoverity.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.polaris.PolarisJavaCoverity.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen.polaris.PolarisJavaCoverity.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="projen.polaris.PolarisJavaCoverity.isConstruct"></a>

```typescript
import { polaris } from 'projen'

polaris.PolarisJavaCoverity.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="projen.polaris.PolarisJavaCoverity.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen.polaris.PolarisJavaCoverity.isComponent"></a>

```typescript
import { polaris } from 'projen'

polaris.PolarisJavaCoverity.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen.polaris.PolarisJavaCoverity.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.PolarisJavaCoverity.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen.polaris.PolarisJavaCoverity.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.polaris.PolarisJavaCoverity.property.file">file</a></code> | <code>projen.YamlFile</code> | The YAML file for the Coverity on Polaris configuration. |

---

##### `node`<sup>Required</sup> <a name="node" id="projen.polaris.PolarisJavaCoverity.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen.polaris.PolarisJavaCoverity.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---

##### `file`<sup>Required</sup> <a name="file" id="projen.polaris.PolarisJavaCoverity.property.file"></a>

```typescript
public readonly file: YamlFile;
```

- *Type:* projen.YamlFile

The YAML file for the Coverity on Polaris configuration.

---


### PolarisJavascriptCoverity <a name="PolarisJavascriptCoverity" id="projen.polaris.PolarisJavascriptCoverity"></a>

A Coverity on Polaris configuration preset for JavaScript/TypeScript projects.

Provides sensible defaults for JavaScript/TypeScript analysis:
- `capture.languages.include` = `[javascript]`
- `capture.files.excludeRegex` excludes `node_modules`, `lib`, `dist`,
  `coverage` and other build artifacts, based on the paths projen's
  `TypeScriptProject` excludes from git by default

All defaults can be overridden via options. Nested options (e.g.
`capture`) are deep-merged with the defaults, so overriding one nested
field does not drop the other defaults in that subtree.

*Example*

```typescript
new PolarisJavascriptCoverity(project, {
  commit: {},
});
```


#### Initializers <a name="Initializers" id="projen.polaris.PolarisJavascriptCoverity.Initializer"></a>

```typescript
import { polaris } from 'projen'

new polaris.PolarisJavascriptCoverity(project: Project, options: PolarisCoverityJavascriptOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.PolarisJavascriptCoverity.Initializer.parameter.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.polaris.PolarisJavascriptCoverity.Initializer.parameter.options">options</a></code> | <code><a href="#projen.polaris.PolarisCoverityJavascriptOptions">PolarisCoverityJavascriptOptions</a></code> | *No description.* |

---

##### `project`<sup>Required</sup> <a name="project" id="projen.polaris.PolarisJavascriptCoverity.Initializer.parameter.project"></a>

- *Type:* projen.Project

---

##### `options`<sup>Required</sup> <a name="options" id="projen.polaris.PolarisJavascriptCoverity.Initializer.parameter.options"></a>

- *Type:* <a href="#projen.polaris.PolarisCoverityJavascriptOptions">PolarisCoverityJavascriptOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.polaris.PolarisJavascriptCoverity.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen.polaris.PolarisJavascriptCoverity.with">with</a></code> | Applies one or more mixins to this construct. |
| <code><a href="#projen.polaris.PolarisJavascriptCoverity.postProjectCreation">postProjectCreation</a></code> | Called once, right after `postSynthesize()`, only when the project is created for the first time. |
| <code><a href="#projen.polaris.PolarisJavascriptCoverity.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen.polaris.PolarisJavascriptCoverity.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen.polaris.PolarisJavascriptCoverity.projectCreation">projectCreation</a></code> | Called once, right after `synthesize()`, only when the project is created for the first time. |
| <code><a href="#projen.polaris.PolarisJavascriptCoverity.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |

---

##### `toString` <a name="toString" id="projen.polaris.PolarisJavascriptCoverity.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="projen.polaris.PolarisJavascriptCoverity.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="projen.polaris.PolarisJavascriptCoverity.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

##### `postProjectCreation` <a name="postProjectCreation" id="projen.polaris.PolarisJavascriptCoverity.postProjectCreation"></a>

```typescript
public postProjectCreation(initProject: InitProject): void
```

Called once, right after `postSynthesize()`, only when the project is created for the first time.

It does not run on later `projen` invocations. It only fires for `projen new` (or `Projects.createProject`).
It is also skipped when post-synthesis steps are disabled, e.g. `--no-post` or `PROJEN_DISABLE_POST`.
Use it for one-off setup that can be turned off by the user, like running a task to give the user immediate
feedback on their new project. Order across components is not guaranteed.

###### `initProject`<sup>Required</sup> <a name="initProject" id="projen.polaris.PolarisJavascriptCoverity.postProjectCreation.parameter.initProject"></a>

- *Type:* projen.InitProject

Details about how the project was created, e.g. its type and the original CLI args.

---

##### `postSynthesize` <a name="postSynthesize" id="projen.polaris.PolarisJavascriptCoverity.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen.polaris.PolarisJavascriptCoverity.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `projectCreation` <a name="projectCreation" id="projen.polaris.PolarisJavascriptCoverity.projectCreation"></a>

```typescript
public projectCreation(initProject: InitProject): void
```

Called once, right after `synthesize()`, only when the project is created for the first time.

It does not run on later `projen` invocations. It only fires for `projen new` (or `Projects.createProject`).
Use it for deterministic, one-off file generation. Order across components is not guaranteed.

###### `initProject`<sup>Required</sup> <a name="initProject" id="projen.polaris.PolarisJavascriptCoverity.projectCreation.parameter.initProject"></a>

- *Type:* projen.InitProject

Details about how the project was created, e.g. its type and the original CLI args.

---

##### `synthesize` <a name="synthesize" id="projen.polaris.PolarisJavascriptCoverity.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.polaris.PolarisJavascriptCoverity.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen.polaris.PolarisJavascriptCoverity.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="projen.polaris.PolarisJavascriptCoverity.isConstruct"></a>

```typescript
import { polaris } from 'projen'

polaris.PolarisJavascriptCoverity.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="projen.polaris.PolarisJavascriptCoverity.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen.polaris.PolarisJavascriptCoverity.isComponent"></a>

```typescript
import { polaris } from 'projen'

polaris.PolarisJavascriptCoverity.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen.polaris.PolarisJavascriptCoverity.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.PolarisJavascriptCoverity.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen.polaris.PolarisJavascriptCoverity.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.polaris.PolarisJavascriptCoverity.property.file">file</a></code> | <code>projen.YamlFile</code> | The YAML file for the Coverity on Polaris configuration. |

---

##### `node`<sup>Required</sup> <a name="node" id="projen.polaris.PolarisJavascriptCoverity.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen.polaris.PolarisJavascriptCoverity.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---

##### `file`<sup>Required</sup> <a name="file" id="projen.polaris.PolarisJavascriptCoverity.property.file"></a>

```typescript
public readonly file: YamlFile;
```

- *Type:* projen.YamlFile

The YAML file for the Coverity on Polaris configuration.

---


## Structs <a name="Structs" id="Structs"></a>

### AnalysisConfiguration <a name="AnalysisConfiguration" id="projen.polaris.AnalysisConfiguration"></a>

Specifies how the project should be analyzed.

#### Initializer <a name="Initializer" id="projen.polaris.AnalysisConfiguration.Initializer"></a>

```typescript
import { polaris } from 'projen'

const analysisConfiguration: polaris.AnalysisConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.AnalysisConfiguration.property.aggressivenessLevel">aggressivenessLevel</a></code> | <code><a href="#projen.polaris.AnalysisConfigurationAggressivenessLevel">AnalysisConfigurationAggressivenessLevel</a></code> | Specifies the aggressiveness level for the analysis. |
| <code><a href="#projen.polaris.AnalysisConfiguration.property.callgraphMetrics">callgraphMetrics</a></code> | <code>boolean</code> | Enables callgraph metrics output in the intermediate directory. |
| <code><a href="#projen.polaris.AnalysisConfiguration.property.cCppFnptr">cCppFnptr</a></code> | <code>boolean</code> | Enables analysis of calls to function pointers for defects. |
| <code><a href="#projen.polaris.AnalysisConfiguration.property.cCppVirtual">cCppVirtual</a></code> | <code>boolean</code> | Enables full virtual-call resolution for C++. |
| <code><a href="#projen.polaris.AnalysisConfiguration.property.checkers">checkers</a></code> | <code><a href="#projen.polaris.CheckerConfiguration">CheckerConfiguration</a></code> | If no checker configuration is specified, the CLI will enable a set of checkers based on the files that were captured. |
| <code><a href="#projen.polaris.AnalysisConfiguration.property.codingStandards">codingStandards</a></code> | <code><a href="#projen.polaris.CodingStandardConfiguration">CodingStandardConfiguration</a></code> | If specified, the analysis will scan the code for compliance according to the given coding standard configuration. |
| <code><a href="#projen.polaris.AnalysisConfiguration.property.connect">connect</a></code> | <code><a href="#projen.polaris.AnalyzeConnectConfiguration">AnalyzeConnectConfiguration</a></code> | Coverity Connect configuration to use when performing analysis in Coverity Connect. |
| <code><a href="#projen.polaris.AnalysisConfiguration.property.constraintFpp">constraintFpp</a></code> | <code>boolean</code> | Enables additional filtering of defects by using an additional false-path pruner. |
| <code><a href="#projen.polaris.AnalysisConfiguration.property.covAnalyzeArgs">covAnalyzeArgs</a></code> | <code>string[]</code> | Additional arguments to pass to cov-analyze when doing analysis. |
| <code><a href="#projen.polaris.AnalysisConfiguration.property.covCollectModelsArgs">covCollectModelsArgs</a></code> | <code>string[]</code> | Additional arguments to pass to cov-collect-models following analysis when "output-model-file" is specified. |
| <code><a href="#projen.polaris.AnalysisConfiguration.property.directives">directives</a></code> | <code><a href="#projen.polaris.DirectivesConfiguration">DirectivesConfiguration</a>[]</code> | Specifies directives to use for the analysis, including for web application security analysis. |
| <code><a href="#projen.polaris.AnalysisConfiguration.property.files">files</a></code> | <code><a href="#projen.polaris.AnalyzeFilesConfiguration">AnalyzeFilesConfiguration</a></code> | Specifies which files to analyze when the "analyze.mode" setting is "hfi". Analysis will be performed for only these files. |
| <code><a href="#projen.polaris.AnalysisConfiguration.property.jobs">jobs</a></code> | <code><a href="#projen.polaris.JobsConfiguration">JobsConfiguration</a>[]</code> | Specifies analysis worker parallelism. |
| <code><a href="#projen.polaris.AnalysisConfiguration.property.location">location</a></code> | <code><a href="#projen.polaris.AnalysisConfigurationLocation">AnalysisConfigurationLocation</a></code> | Specifies whether the analysis should be done locally, in Coverity Connect, or in Software Risk Manager. |
| <code><a href="#projen.polaris.AnalysisConfiguration.property.mode">mode</a></code> | <code><a href="#projen.polaris.AnalysisConfigurationMode">AnalysisConfigurationMode</a></code> | Analysis mode: "pfi" (perfect fidelity incremental) for complete analysis; |
| <code><a href="#projen.polaris.AnalysisConfiguration.property.modelFile">modelFile</a></code> | <code>string</code> | File containing function models. |
| <code><a href="#projen.polaris.AnalysisConfiguration.property.oneTuPerPsf">oneTuPerPsf</a></code> | <code>boolean</code> | If set to to true, only one TU (translation unit) will be analyzed per source file name. |
| <code><a href="#projen.polaris.AnalysisConfiguration.property.outputModelFile">outputModelFile</a></code> | <code>string</code> | Output file to which function models for the project should be written following analysis. |
| <code><a href="#projen.polaris.AnalysisConfiguration.property.parseWarnings">parseWarnings</a></code> | <code><a href="#projen.polaris.ParseWarningsConfiguration">ParseWarningsConfiguration</a></code> | Specifies how parse warnings are handled. |
| <code><a href="#projen.polaris.AnalysisConfiguration.property.scanTransparency">scanTransparency</a></code> | <code>boolean</code> | Specifies whether to enable the collection of scan transparency data for analysis. |
| <code><a href="#projen.polaris.AnalysisConfiguration.property.sigma">sigma</a></code> | <code><a href="#projen.polaris.SigmaConfiguration">SigmaConfiguration</a></code> | Specifies options for Sigma analysis. |
| <code><a href="#projen.polaris.AnalysisConfiguration.property.trust">trust</a></code> | <code>any</code> | This is a map from trust option name to boolean to indicate whether the particular trust property should be trusted or distrusted. |

---

##### `aggressivenessLevel`<sup>Optional</sup> <a name="aggressivenessLevel" id="projen.polaris.AnalysisConfiguration.property.aggressivenessLevel"></a>

```typescript
public readonly aggressivenessLevel: AnalysisConfigurationAggressivenessLevel;
```

- *Type:* <a href="#projen.polaris.AnalysisConfigurationAggressivenessLevel">AnalysisConfigurationAggressivenessLevel</a>

Specifies the aggressiveness level for the analysis.

The aggressiveness level causes the analysis to make more or less aggressive assumptions during the analysis where the higher the aggressiveness level the more defects are reported.

---

##### `callgraphMetrics`<sup>Optional</sup> <a name="callgraphMetrics" id="projen.polaris.AnalysisConfiguration.property.callgraphMetrics"></a>

```typescript
public readonly callgraphMetrics: boolean;
```

- *Type:* boolean

Enables callgraph metrics output in the intermediate directory.

---

##### `cCppFnptr`<sup>Optional</sup> <a name="cCppFnptr" id="projen.polaris.AnalysisConfiguration.property.cCppFnptr"></a>

```typescript
public readonly cCppFnptr: boolean;
```

- *Type:* boolean

Enables analysis of calls to function pointers for defects.

---

##### `cCppVirtual`<sup>Optional</sup> <a name="cCppVirtual" id="projen.polaris.AnalysisConfiguration.property.cCppVirtual"></a>

```typescript
public readonly cCppVirtual: boolean;
```

- *Type:* boolean

Enables full virtual-call resolution for C++.

---

##### `checkers`<sup>Optional</sup> <a name="checkers" id="projen.polaris.AnalysisConfiguration.property.checkers"></a>

```typescript
public readonly checkers: CheckerConfiguration;
```

- *Type:* <a href="#projen.polaris.CheckerConfiguration">CheckerConfiguration</a>

If no checker configuration is specified, the CLI will enable a set of checkers based on the files that were captured.

---

##### `codingStandards`<sup>Optional</sup> <a name="codingStandards" id="projen.polaris.AnalysisConfiguration.property.codingStandards"></a>

```typescript
public readonly codingStandards: CodingStandardConfiguration;
```

- *Type:* <a href="#projen.polaris.CodingStandardConfiguration">CodingStandardConfiguration</a>

If specified, the analysis will scan the code for compliance according to the given coding standard configuration.

If this configuration is present, the capture "emit-complementary-info" flag will be set to true.

---

##### `connect`<sup>Optional</sup> <a name="connect" id="projen.polaris.AnalysisConfiguration.property.connect"></a>

```typescript
public readonly connect: AnalyzeConnectConfiguration;
```

- *Type:* <a href="#projen.polaris.AnalyzeConnectConfiguration">AnalyzeConnectConfiguration</a>

Coverity Connect configuration to use when performing analysis in Coverity Connect.

---

##### `constraintFpp`<sup>Optional</sup> <a name="constraintFpp" id="projen.polaris.AnalysisConfiguration.property.constraintFpp"></a>

```typescript
public readonly constraintFpp: boolean;
```

- *Type:* boolean

Enables additional filtering of defects by using an additional false-path pruner.

If set to true, the constraint FPP is enabled.

---

##### `covAnalyzeArgs`<sup>Optional</sup> <a name="covAnalyzeArgs" id="projen.polaris.AnalysisConfiguration.property.covAnalyzeArgs"></a>

```typescript
public readonly covAnalyzeArgs: string[];
```

- *Type:* string[]

Additional arguments to pass to cov-analyze when doing analysis.

---

##### `covCollectModelsArgs`<sup>Optional</sup> <a name="covCollectModelsArgs" id="projen.polaris.AnalysisConfiguration.property.covCollectModelsArgs"></a>

```typescript
public readonly covCollectModelsArgs: string[];
```

- *Type:* string[]

Additional arguments to pass to cov-collect-models following analysis when "output-model-file" is specified.

---

##### `directives`<sup>Optional</sup> <a name="directives" id="projen.polaris.AnalysisConfiguration.property.directives"></a>

```typescript
public readonly directives: DirectivesConfiguration[];
```

- *Type:* <a href="#projen.polaris.DirectivesConfiguration">DirectivesConfiguration</a>[]

Specifies directives to use for the analysis, including for web application security analysis.

---

##### `files`<sup>Optional</sup> <a name="files" id="projen.polaris.AnalysisConfiguration.property.files"></a>

```typescript
public readonly files: AnalyzeFilesConfiguration;
```

- *Type:* <a href="#projen.polaris.AnalyzeFilesConfiguration">AnalyzeFilesConfiguration</a>

Specifies which files to analyze when the "analyze.mode" setting is "hfi". Analysis will be performed for only these files.

---

##### `jobs`<sup>Optional</sup> <a name="jobs" id="projen.polaris.AnalysisConfiguration.property.jobs"></a>

```typescript
public readonly jobs: JobsConfiguration[];
```

- *Type:* <a href="#projen.polaris.JobsConfiguration">JobsConfiguration</a>[]

Specifies analysis worker parallelism.

---

##### `location`<sup>Optional</sup> <a name="location" id="projen.polaris.AnalysisConfiguration.property.location"></a>

```typescript
public readonly location: AnalysisConfigurationLocation;
```

- *Type:* <a href="#projen.polaris.AnalysisConfigurationLocation">AnalysisConfigurationLocation</a>

Specifies whether the analysis should be done locally, in Coverity Connect, or in Software Risk Manager.

The possible values are as follows: connect - Run the analysis in the Coverity Connect job farm; srm - Run the analysis in the Software Risk Manager job farm; local - Run the analysis locally

---

##### `mode`<sup>Optional</sup> <a name="mode" id="projen.polaris.AnalysisConfiguration.property.mode"></a>

```typescript
public readonly mode: AnalysisConfigurationMode;
```

- *Type:* <a href="#projen.polaris.AnalysisConfigurationMode">AnalysisConfigurationMode</a>

Analysis mode: "pfi" (perfect fidelity incremental) for complete analysis;

or "hfi" (high fidelity incremental) for analysis of only specific files specified by analyze.files settings, omitting any other files which may have been incidentally captured by the build. An "hfi" analysis can be faster but may produce results which are incomplete or inconsistent, due to the lack of context, and should be used only when speed is more important than accuracy.

---

##### `modelFile`<sup>Optional</sup> <a name="modelFile" id="projen.polaris.AnalysisConfiguration.property.modelFile"></a>

```typescript
public readonly modelFile: string;
```

- *Type:* string

File containing function models.

This overrides models specified in the default location of "config/user_models.xmldb".

---

##### `oneTuPerPsf`<sup>Optional</sup> <a name="oneTuPerPsf" id="projen.polaris.AnalysisConfiguration.property.oneTuPerPsf"></a>

```typescript
public readonly oneTuPerPsf: boolean;
```

- *Type:* boolean

If set to to true, only one TU (translation unit) will be analyzed per source file name.

If set to false, all translation units will be analyzed.

---

##### `outputModelFile`<sup>Optional</sup> <a name="outputModelFile" id="projen.polaris.AnalysisConfiguration.property.outputModelFile"></a>

```typescript
public readonly outputModelFile: string;
```

- *Type:* string

Output file to which function models for the project should be written following analysis.

---

##### `parseWarnings`<sup>Optional</sup> <a name="parseWarnings" id="projen.polaris.AnalysisConfiguration.property.parseWarnings"></a>

```typescript
public readonly parseWarnings: ParseWarningsConfiguration;
```

- *Type:* <a href="#projen.polaris.ParseWarningsConfiguration">ParseWarningsConfiguration</a>

Specifies how parse warnings are handled.

---

##### `scanTransparency`<sup>Optional</sup> <a name="scanTransparency" id="projen.polaris.AnalysisConfiguration.property.scanTransparency"></a>

```typescript
public readonly scanTransparency: boolean;
```

- *Type:* boolean

Specifies whether to enable the collection of scan transparency data for analysis.

This setting must be enabled if the Coverity Connect instance has 'scan.transparency.enabled=true' in its configuration.

---

##### `sigma`<sup>Optional</sup> <a name="sigma" id="projen.polaris.AnalysisConfiguration.property.sigma"></a>

```typescript
public readonly sigma: SigmaConfiguration;
```

- *Type:* <a href="#projen.polaris.SigmaConfiguration">SigmaConfiguration</a>

Specifies options for Sigma analysis.

---

##### `trust`<sup>Optional</sup> <a name="trust" id="projen.polaris.AnalysisConfiguration.property.trust"></a>

```typescript
public readonly trust: any;
```

- *Type:* any

This is a map from trust option name to boolean to indicate whether the particular trust property should be trusted or distrusted.

The trust option "all" controls whether all trust options should be trusted or distrusted.

---

### AnalyzeConnectConfiguration <a name="AnalyzeConnectConfiguration" id="projen.polaris.AnalyzeConnectConfiguration"></a>

#### Initializer <a name="Initializer" id="projen.polaris.AnalyzeConnectConfiguration.Initializer"></a>

```typescript
import { polaris } from 'projen'

const analyzeConnectConfiguration: polaris.AnalyzeConnectConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.AnalyzeConnectConfiguration.property.url">url</a></code> | <code>string</code> | Absolute URL of where to perform Coverity Connect analysis. |
| <code><a href="#projen.polaris.AnalyzeConnectConfiguration.property.authKeyFile">authKeyFile</a></code> | <code>string</code> | The authentication key file to use when authenticating to Coverity Connect to perform analysis. |
| <code><a href="#projen.polaris.AnalyzeConnectConfiguration.property.caCertsFile">caCertsFile</a></code> | <code>string</code> | File containing additional certificates to trust in addition to the ones in the system certificate store and the Coverity TFT store. |
| <code><a href="#projen.polaris.AnalyzeConnectConfiguration.property.proxyClientCertFile">proxyClientCertFile</a></code> | <code>string</code> | File containing the client certificate in PEM format, that should be presented to the proxy when making a request. |
| <code><a href="#projen.polaris.AnalyzeConnectConfiguration.property.proxyClientKeyFile">proxyClientKeyFile</a></code> | <code>string</code> | File containing the client certificate private key in PEM format, for the proxy-client-cert-file. |
| <code><a href="#projen.polaris.AnalyzeConnectConfiguration.property.proxyUrl">proxyUrl</a></code> | <code>string</code> | URL for a forward proxy to use when communicating with Coverity Connect. |
| <code><a href="#projen.polaris.AnalyzeConnectConfiguration.property.uploadArtifacts">uploadArtifacts</a></code> | <code><a href="#projen.polaris.AnalyzeConnectConfigurationUploadArtifacts">AnalyzeConnectConfigurationUploadArtifacts</a></code> | Artifacts to upload following analysis when the analysis location is Connect. |

---

##### `url`<sup>Required</sup> <a name="url" id="projen.polaris.AnalyzeConnectConfiguration.property.url"></a>

```typescript
public readonly url: string;
```

- *Type:* string

Absolute URL of where to perform Coverity Connect analysis.

---

##### `authKeyFile`<sup>Optional</sup> <a name="authKeyFile" id="projen.polaris.AnalyzeConnectConfiguration.property.authKeyFile"></a>

```typescript
public readonly authKeyFile: string;
```

- *Type:* string

The authentication key file to use when authenticating to Coverity Connect to perform analysis.

By default, the file located at $HOME/.coverity/ak-<hostname>-<port> is used.

---

##### `caCertsFile`<sup>Optional</sup> <a name="caCertsFile" id="projen.polaris.AnalyzeConnectConfiguration.property.caCertsFile"></a>

```typescript
public readonly caCertsFile: string;
```

- *Type:* string

File containing additional certificates to trust in addition to the ones in the system certificate store and the Coverity TFT store.

By default system CA certificates are used.

---

##### `proxyClientCertFile`<sup>Optional</sup> <a name="proxyClientCertFile" id="projen.polaris.AnalyzeConnectConfiguration.property.proxyClientCertFile"></a>

```typescript
public readonly proxyClientCertFile: string;
```

- *Type:* string

File containing the client certificate in PEM format, that should be presented to the proxy when making a request.

---

##### `proxyClientKeyFile`<sup>Optional</sup> <a name="proxyClientKeyFile" id="projen.polaris.AnalyzeConnectConfiguration.property.proxyClientKeyFile"></a>

```typescript
public readonly proxyClientKeyFile: string;
```

- *Type:* string

File containing the client certificate private key in PEM format, for the proxy-client-cert-file.

---

##### `proxyUrl`<sup>Optional</sup> <a name="proxyUrl" id="projen.polaris.AnalyzeConnectConfiguration.property.proxyUrl"></a>

```typescript
public readonly proxyUrl: string;
```

- *Type:* string

URL for a forward proxy to use when communicating with Coverity Connect.

Must be an https URL.

---

##### `uploadArtifacts`<sup>Optional</sup> <a name="uploadArtifacts" id="projen.polaris.AnalyzeConnectConfiguration.property.uploadArtifacts"></a>

```typescript
public readonly uploadArtifacts: AnalyzeConnectConfigurationUploadArtifacts;
```

- *Type:* <a href="#projen.polaris.AnalyzeConnectConfigurationUploadArtifacts">AnalyzeConnectConfigurationUploadArtifacts</a>

Artifacts to upload following analysis when the analysis location is Connect.

---

### AnalyzeFilesConfiguration <a name="AnalyzeFilesConfiguration" id="projen.polaris.AnalyzeFilesConfiguration"></a>

#### Initializer <a name="Initializer" id="projen.polaris.AnalyzeFilesConfiguration.Initializer"></a>

```typescript
import { polaris } from 'projen'

const analyzeFilesConfiguration: polaris.AnalyzeFilesConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.AnalyzeFilesConfiguration.property.excludeGlob">excludeGlob</a></code> | <code>string</code> | Glob pattern that specifies the set of source files to exclude from analysis. |
| <code><a href="#projen.polaris.AnalyzeFilesConfiguration.property.excludeRegex">excludeRegex</a></code> | <code>string</code> | Regular expression that specifies the set of source files to exclude from analysis. |
| <code><a href="#projen.polaris.AnalyzeFilesConfiguration.property.includeFiles">includeFiles</a></code> | <code>string</code> | Paths of source files to analyze. |
| <code><a href="#projen.polaris.AnalyzeFilesConfiguration.property.includeGlob">includeGlob</a></code> | <code>string</code> | Glob pattern that specifies the set of source files to analyze. |
| <code><a href="#projen.polaris.AnalyzeFilesConfiguration.property.includeListFile">includeListFile</a></code> | <code>string</code> | File containing the paths of source files to analyze, one per line. |
| <code><a href="#projen.polaris.AnalyzeFilesConfiguration.property.includeRegex">includeRegex</a></code> | <code>string</code> | Regular expression that specifies the set of source files to analyze. |

---

##### `excludeGlob`<sup>Optional</sup> <a name="excludeGlob" id="projen.polaris.AnalyzeFilesConfiguration.property.excludeGlob"></a>

```typescript
public readonly excludeGlob: string;
```

- *Type:* string

Glob pattern that specifies the set of source files to exclude from analysis.

Note that any include glob patterns and regular expressions are processed prior to handling exclude glob patterns and regular expressions.

---

##### `excludeRegex`<sup>Optional</sup> <a name="excludeRegex" id="projen.polaris.AnalyzeFilesConfiguration.property.excludeRegex"></a>

```typescript
public readonly excludeRegex: string;
```

- *Type:* string

Regular expression that specifies the set of source files to exclude from analysis.

Note that any include glob patterns and regular expressions are processed prior to handling exclude glob patterns and regular expressions.

---

##### `includeFiles`<sup>Optional</sup> <a name="includeFiles" id="projen.polaris.AnalyzeFilesConfiguration.property.includeFiles"></a>

```typescript
public readonly includeFiles: string;
```

- *Type:* string

Paths of source files to analyze.

Include and exclude glob patterns and regular expressions are applied to determine which of these files are actually analyzed.

---

##### `includeGlob`<sup>Optional</sup> <a name="includeGlob" id="projen.polaris.AnalyzeFilesConfiguration.property.includeGlob"></a>

```typescript
public readonly includeGlob: string;
```

- *Type:* string

Glob pattern that specifies the set of source files to analyze.

---

##### `includeListFile`<sup>Optional</sup> <a name="includeListFile" id="projen.polaris.AnalyzeFilesConfiguration.property.includeListFile"></a>

```typescript
public readonly includeListFile: string;
```

- *Type:* string

File containing the paths of source files to analyze, one per line.

Include and exclude glob patterns and regular expressions are applied to determine which of these files are actually analyzed.

---

##### `includeRegex`<sup>Optional</sup> <a name="includeRegex" id="projen.polaris.AnalyzeFilesConfiguration.property.includeRegex"></a>

```typescript
public readonly includeRegex: string;
```

- *Type:* string

Regular expression that specifies the set of source files to analyze.

---

### BuildConfiguration <a name="BuildConfiguration" id="projen.polaris.BuildConfiguration"></a>

Specifies that build capture should be used to capture the project and provides the build configuration to use.

If not specified and the project directory contains compiled source files then automatic build capture will be used to capture compiled source files in the project directory.

#### Initializer <a name="Initializer" id="projen.polaris.BuildConfiguration.Initializer"></a>

```typescript
import { polaris } from 'projen'

const buildConfiguration: polaris.BuildConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.BuildConfiguration.property.buildCommand">buildCommand</a></code> | <code>string</code> | The build command will be invoked to use build capture to capture the project. |
| <code><a href="#projen.polaris.BuildConfiguration.property.aspnetCompiler">aspnetCompiler</a></code> | <code>boolean</code> | Specifies whether to enable or disable the automatic invocation of Aspnet_compiler.exe for any ASP.NET 4 and earlier Web applications that are detected in the build. The output of Aspnet_compiler.exe is required by the C# and Visual Basic security checkers. |
| <code><a href="#projen.polaris.BuildConfiguration.property.bazel">bazel</a></code> | <code>boolean</code> | Specifies whether to enable Bazel capture. |
| <code><a href="#projen.polaris.BuildConfiguration.property.cleanCommand">cleanCommand</a></code> | <code>string</code> | The clean command will be invoked prior to doing build capture to capture the project. |
| <code><a href="#projen.polaris.BuildConfiguration.property.covBuildArgs">covBuildArgs</a></code> | <code>string[]</code> | Additional arguments to pass to cov-build when doing build capture. |
| <code><a href="#projen.polaris.BuildConfiguration.property.deferDecomp">deferDecomp</a></code> | <code>boolean</code> | Specifies whether the build should only record the decompilations of byte code during the build and not attempt to decompile and emit the byte code. |
| <code><a href="#projen.polaris.BuildConfiguration.property.instrument">instrument</a></code> | <code>boolean</code> | Specifies whether to use the instrumentation mode instead of the debugger. |
| <code><a href="#projen.polaris.BuildConfiguration.property.parallelTranslate">parallelTranslate</a></code> | <code><a href="#projen.polaris.ParallelTranslateConfiguration">ParallelTranslateConfiguration</a></code> | Specifies how to parallelize translation of C and C++ code. |
| <code><a href="#projen.polaris.BuildConfiguration.property.scanTransparency">scanTransparency</a></code> | <code>boolean</code> | Specifies whether to enable the collection of scan transparency data for build capture. |

---

##### `buildCommand`<sup>Required</sup> <a name="buildCommand" id="projen.polaris.BuildConfiguration.property.buildCommand"></a>

```typescript
public readonly buildCommand: string;
```

- *Type:* string

The build command will be invoked to use build capture to capture the project.

A build command specified on the command-line will override this setting.

---

##### `aspnetCompiler`<sup>Optional</sup> <a name="aspnetCompiler" id="projen.polaris.BuildConfiguration.property.aspnetCompiler"></a>

```typescript
public readonly aspnetCompiler: boolean;
```

- *Type:* boolean

Specifies whether to enable or disable the automatic invocation of Aspnet_compiler.exe for any ASP.NET 4 and earlier Web applications that are detected in the build. The output of Aspnet_compiler.exe is required by the C# and Visual Basic security checkers.

---

##### `bazel`<sup>Optional</sup> <a name="bazel" id="projen.polaris.BuildConfiguration.property.bazel"></a>

```typescript
public readonly bazel: boolean;
```

- *Type:* boolean

Specifies whether to enable Bazel capture.

---

##### `cleanCommand`<sup>Optional</sup> <a name="cleanCommand" id="projen.polaris.BuildConfiguration.property.cleanCommand"></a>

```typescript
public readonly cleanCommand: string;
```

- *Type:* string

The clean command will be invoked prior to doing build capture to capture the project.

---

##### `covBuildArgs`<sup>Optional</sup> <a name="covBuildArgs" id="projen.polaris.BuildConfiguration.property.covBuildArgs"></a>

```typescript
public readonly covBuildArgs: string[];
```

- *Type:* string[]

Additional arguments to pass to cov-build when doing build capture.

---

##### `deferDecomp`<sup>Optional</sup> <a name="deferDecomp" id="projen.polaris.BuildConfiguration.property.deferDecomp"></a>

```typescript
public readonly deferDecomp: boolean;
```

- *Type:* boolean

Specifies whether the build should only record the decompilations of byte code during the build and not attempt to decompile and emit the byte code.

During the analysis phase, cov-build will be rerun with --replay-decomp to decompile and emit the byte code.

---

##### `instrument`<sup>Optional</sup> <a name="instrument" id="projen.polaris.BuildConfiguration.property.instrument"></a>

```typescript
public readonly instrument: boolean;
```

- *Type:* boolean

Specifies whether to use the instrumentation mode instead of the debugger.

For certain builds, this configuration can significantly improve build times. This setting is applicable only on Windows.

---

##### `parallelTranslate`<sup>Optional</sup> <a name="parallelTranslate" id="projen.polaris.BuildConfiguration.property.parallelTranslate"></a>

```typescript
public readonly parallelTranslate: ParallelTranslateConfiguration;
```

- *Type:* <a href="#projen.polaris.ParallelTranslateConfiguration">ParallelTranslateConfiguration</a>

Specifies how to parallelize translation of C and C++ code.

---

##### `scanTransparency`<sup>Optional</sup> <a name="scanTransparency" id="projen.polaris.BuildConfiguration.property.scanTransparency"></a>

```typescript
public readonly scanTransparency: boolean;
```

- *Type:* boolean

Specifies whether to enable the collection of scan transparency data for build capture.

This setting must be enabled if the Coverity Connect instance has 'scan.transparency.enabled=true' in its configuration.

---

### CachingConfiguration <a name="CachingConfiguration" id="projen.polaris.CachingConfiguration"></a>

Specifies how the CLI should handle caching when performing capture/analysis.

#### Initializer <a name="Initializer" id="projen.polaris.CachingConfiguration.Initializer"></a>

```typescript
import { polaris } from 'projen'

const cachingConfiguration: polaris.CachingConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.CachingConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | A true value indicates caching will be used when performing remote analysis. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.polaris.CachingConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

A true value indicates caching will be used when performing remote analysis.

---

### CaptureConfiguration <a name="CaptureConfiguration" id="projen.polaris.CaptureConfiguration"></a>

Specifies how the project should be captured.

#### Initializer <a name="Initializer" id="projen.polaris.CaptureConfiguration.Initializer"></a>

```typescript
import { polaris } from 'projen'

const captureConfiguration: polaris.CaptureConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.CaptureConfiguration.property.buildCapture">buildCapture</a></code> | <code><a href="#projen.polaris.BuildConfiguration">BuildConfiguration</a></code> | *No description.* |
| <code><a href="#projen.polaris.CaptureConfiguration.property.buildCommandInference">buildCommandInference</a></code> | <code>boolean</code> | Specifies whether to enable or disable build command inference. |
| <code><a href="#projen.polaris.CaptureConfiguration.property.compilerConfiguration">compilerConfiguration</a></code> | <code><a href="#projen.polaris.CompilerConfiguration">CompilerConfiguration</a></code> | Specifies which compilers to configure. |
| <code><a href="#projen.polaris.CaptureConfiguration.property.covTranslate">covTranslate</a></code> | <code><a href="#projen.polaris.CovTranslateConfiguration">CovTranslateConfiguration</a></code> | *No description.* |
| <code><a href="#projen.polaris.CaptureConfiguration.property.emitComplementaryInfo">emitComplementaryInfo</a></code> | <code>boolean</code> | Records additional information during the emit process needed for the compliance checkers. |
| <code><a href="#projen.polaris.CaptureConfiguration.property.encoding">encoding</a></code> | <code>string</code> | Specifies the encoding to use when parsing and emitting the source files. |
| <code><a href="#projen.polaris.CaptureConfiguration.property.failureThresholdPercent">failureThresholdPercent</a></code> | <code>number</code> | Specifies the minimum percentage of files that must be captured in order to proceed with the analysis. |
| <code><a href="#projen.polaris.CaptureConfiguration.property.files">files</a></code> | <code><a href="#projen.polaris.FilesConfiguration">FilesConfiguration</a></code> | Specifies which non-compiled files to capture. |
| <code><a href="#projen.polaris.CaptureConfiguration.property.forceDependencyResolution">forceDependencyResolution</a></code> | <code>boolean</code> | Force resolution of Maven, Gradle and MSBuild dependencies even if this is not needed based on the detected source languages in the project. |
| <code><a href="#projen.polaris.CaptureConfiguration.property.importScm">importScm</a></code> | <code><a href="#projen.polaris.ImportScmConfiguration">ImportScmConfiguration</a></code> | Specifies how to import data about source file changes from the source control management system. |
| <code><a href="#projen.polaris.CaptureConfiguration.property.languages">languages</a></code> | <code><a href="#projen.polaris.LanguagesConfiguration">LanguagesConfiguration</a></code> | Specifies which languages to include or exclude for capture. |
| <code><a href="#projen.polaris.CaptureConfiguration.property.minimalClasspathEmit">minimalClasspathEmit</a></code> | <code>boolean</code> | Specifies whether to limit the group of emitted JAR files to those needed for compilation of the Java files. |
| <code><a href="#projen.polaris.CaptureConfiguration.property.recordWithSource">recordWithSource</a></code> | <code>boolean</code> | Specifies whether to do a complete capture or a record with source capture. |
| <code><a href="#projen.polaris.CaptureConfiguration.property.securityDa">securityDa</a></code> | <code>boolean</code> | Enables or disables security dynamic analysis. |

---

##### `buildCapture`<sup>Optional</sup> <a name="buildCapture" id="projen.polaris.CaptureConfiguration.property.buildCapture"></a>

```typescript
public readonly buildCapture: BuildConfiguration;
```

- *Type:* <a href="#projen.polaris.BuildConfiguration">BuildConfiguration</a>

---

##### `buildCommandInference`<sup>Optional</sup> <a name="buildCommandInference" id="projen.polaris.CaptureConfiguration.property.buildCommandInference"></a>

```typescript
public readonly buildCommandInference: boolean;
```

- *Type:* boolean

Specifies whether to enable or disable build command inference.

If build command inference is disabled and no build command is provided then no attempt at build capture will be made.

---

##### `compilerConfiguration`<sup>Optional</sup> <a name="compilerConfiguration" id="projen.polaris.CaptureConfiguration.property.compilerConfiguration"></a>

```typescript
public readonly compilerConfiguration: CompilerConfiguration;
```

- *Type:* <a href="#projen.polaris.CompilerConfiguration">CompilerConfiguration</a>

Specifies which compilers to configure.

By default, template compilers are configured.

---

##### `covTranslate`<sup>Optional</sup> <a name="covTranslate" id="projen.polaris.CaptureConfiguration.property.covTranslate"></a>

```typescript
public readonly covTranslate: CovTranslateConfiguration;
```

- *Type:* <a href="#projen.polaris.CovTranslateConfiguration">CovTranslateConfiguration</a>

---

##### `emitComplementaryInfo`<sup>Optional</sup> <a name="emitComplementaryInfo" id="projen.polaris.CaptureConfiguration.property.emitComplementaryInfo"></a>

```typescript
public readonly emitComplementaryInfo: boolean;
```

- *Type:* boolean

Records additional information during the emit process needed for the compliance checkers.

If a "coding-standards" configuration is present then this flag will automatically be set to true.

---

##### `encoding`<sup>Optional</sup> <a name="encoding" id="projen.polaris.CaptureConfiguration.property.encoding"></a>

```typescript
public readonly encoding: string;
```

- *Type:* string

Specifies the encoding to use when parsing and emitting the source files.

---

##### `failureThresholdPercent`<sup>Optional</sup> <a name="failureThresholdPercent" id="projen.polaris.CaptureConfiguration.property.failureThresholdPercent"></a>

```typescript
public readonly failureThresholdPercent: number;
```

- *Type:* number

Specifies the minimum percentage of files that must be captured in order to proceed with the analysis.

---

##### `files`<sup>Optional</sup> <a name="files" id="projen.polaris.CaptureConfiguration.property.files"></a>

```typescript
public readonly files: FilesConfiguration;
```

- *Type:* <a href="#projen.polaris.FilesConfiguration">FilesConfiguration</a>

Specifies which non-compiled files to capture.

By default, all files are captured.

---

##### `forceDependencyResolution`<sup>Optional</sup> <a name="forceDependencyResolution" id="projen.polaris.CaptureConfiguration.property.forceDependencyResolution"></a>

```typescript
public readonly forceDependencyResolution: boolean;
```

- *Type:* boolean

Force resolution of Maven, Gradle and MSBuild dependencies even if this is not needed based on the detected source languages in the project.

---

##### `importScm`<sup>Optional</sup> <a name="importScm" id="projen.polaris.CaptureConfiguration.property.importScm"></a>

```typescript
public readonly importScm: ImportScmConfiguration;
```

- *Type:* <a href="#projen.polaris.ImportScmConfiguration">ImportScmConfiguration</a>

Specifies how to import data about source file changes from the source control management system.

---

##### `languages`<sup>Optional</sup> <a name="languages" id="projen.polaris.CaptureConfiguration.property.languages"></a>

```typescript
public readonly languages: LanguagesConfiguration;
```

- *Type:* <a href="#projen.polaris.LanguagesConfiguration">LanguagesConfiguration</a>

Specifies which languages to include or exclude for capture.

By default, all languages are captured.

---

##### `minimalClasspathEmit`<sup>Optional</sup> <a name="minimalClasspathEmit" id="projen.polaris.CaptureConfiguration.property.minimalClasspathEmit"></a>

```typescript
public readonly minimalClasspathEmit: boolean;
```

- *Type:* boolean

Specifies whether to limit the group of emitted JAR files to those needed for compilation of the Java files.

The default behavior without this option is to emit all the JAR files in the classpath regardless of whether they are referenced by a Java file in the compilation.

---

##### `recordWithSource`<sup>Optional</sup> <a name="recordWithSource" id="projen.polaris.CaptureConfiguration.property.recordWithSource"></a>

```typescript
public readonly recordWithSource: boolean;
```

- *Type:* boolean

Specifies whether to do a complete capture or a record with source capture.

---

##### `securityDa`<sup>Optional</sup> <a name="securityDa" id="projen.polaris.CaptureConfiguration.property.securityDa"></a>

```typescript
public readonly securityDa: boolean;
```

- *Type:* boolean

Enables or disables security dynamic analysis.

If set to true (the default), security dynamic analysis is run as part of the capture step. If set to false, security dynamic analysis is not run.

---

### CheckerConfiguration <a name="CheckerConfiguration" id="projen.polaris.CheckerConfiguration"></a>

#### Initializer <a name="Initializer" id="projen.polaris.CheckerConfiguration.Initializer"></a>

```typescript
import { polaris } from 'projen'

const checkerConfiguration: polaris.CheckerConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.CheckerConfiguration.property.all">all</a></code> | <code>boolean</code> | Indicates whether all checkers should be enabled. |
| <code><a href="#projen.polaris.CheckerConfiguration.property.allSecurity">allSecurity</a></code> | <code>boolean</code> | Indicates whether all security checkers should be enabled. |
| <code><a href="#projen.polaris.CheckerConfiguration.property.androidSecurity">androidSecurity</a></code> | <code>boolean</code> | If set to true, enables android security checkers. |
| <code><a href="#projen.polaris.CheckerConfiguration.property.audit">audit</a></code> | <code>boolean</code> | Enables audit checkers. |
| <code><a href="#projen.polaris.CheckerConfiguration.property.brakeman">brakeman</a></code> | <code>boolean</code> | Indicates whether the brakeman checkers should be enabled or disabled. |
| <code><a href="#projen.polaris.CheckerConfiguration.property.cFamilySecurity">cFamilySecurity</a></code> | <code>boolean</code> | Enables C, C++, Objective-C, Objective-C++ security-related checkers that are disabled by default. |
| <code><a href="#projen.polaris.CheckerConfiguration.property.checkerConfig">checkerConfig</a></code> | <code>any</code> | Map from checker name to configuration for the checker. |
| <code><a href="#projen.polaris.CheckerConfiguration.property.codexm">codexm</a></code> | <code>string[]</code> | Specifies CodeXM (.cxm) files to use in the analysis. |
| <code><a href="#projen.polaris.CheckerConfiguration.property.concurrency">concurrency</a></code> | <code>boolean</code> | Enables C, C++ concurrency checkers that are disabled by default. |
| <code><a href="#projen.polaris.CheckerConfiguration.property.default">default</a></code> | <code>boolean</code> | Specifies whether to enable the default set of checkers. |
| <code><a href="#projen.polaris.CheckerConfiguration.property.pmd">pmd</a></code> | <code>boolean</code> | Enables or disables PMD for Apex analysis. |
| <code><a href="#projen.polaris.CheckerConfiguration.property.recommendedSecurityCheckers">recommendedSecurityCheckers</a></code> | <code>boolean</code> | Enables or disables recommended security checkers. |
| <code><a href="#projen.polaris.CheckerConfiguration.property.rule">rule</a></code> | <code>boolean</code> | Enables C, C++ rule checkers. |
| <code><a href="#projen.polaris.CheckerConfiguration.property.webappSecurity">webappSecurity</a></code> | <code><a href="#projen.polaris.CheckerConfigurationWebappSecurity">CheckerConfigurationWebappSecurity</a></code> | Specifies how web application security analysis should be done. |

---

##### `all`<sup>Optional</sup> <a name="all" id="projen.polaris.CheckerConfiguration.property.all"></a>

```typescript
public readonly all: boolean;
```

- *Type:* boolean

Indicates whether all checkers should be enabled.

---

##### `allSecurity`<sup>Optional</sup> <a name="allSecurity" id="projen.polaris.CheckerConfiguration.property.allSecurity"></a>

```typescript
public readonly allSecurity: boolean;
```

- *Type:* boolean

Indicates whether all security checkers should be enabled.

This includes the Security, Android Security, and Web App Security categories, and other security checkers that require explicit enablement.

---

##### `androidSecurity`<sup>Optional</sup> <a name="androidSecurity" id="projen.polaris.CheckerConfiguration.property.androidSecurity"></a>

```typescript
public readonly androidSecurity: boolean;
```

- *Type:* boolean

If set to true, enables android security checkers.

---

##### `audit`<sup>Optional</sup> <a name="audit" id="projen.polaris.CheckerConfiguration.property.audit"></a>

```typescript
public readonly audit: boolean;
```

- *Type:* boolean

Enables audit checkers.

---

##### `brakeman`<sup>Optional</sup> <a name="brakeman" id="projen.polaris.CheckerConfiguration.property.brakeman"></a>

```typescript
public readonly brakeman: boolean;
```

- *Type:* boolean

Indicates whether the brakeman checkers should be enabled or disabled.

---

##### `cFamilySecurity`<sup>Optional</sup> <a name="cFamilySecurity" id="projen.polaris.CheckerConfiguration.property.cFamilySecurity"></a>

```typescript
public readonly cFamilySecurity: boolean;
```

- *Type:* boolean

Enables C, C++, Objective-C, Objective-C++ security-related checkers that are disabled by default.

---

##### `checkerConfig`<sup>Optional</sup> <a name="checkerConfig" id="projen.polaris.CheckerConfiguration.property.checkerConfig"></a>

```typescript
public readonly checkerConfig: any;
```

- *Type:* any

Map from checker name to configuration for the checker.

The configuration indicates whether the checker should be enabled or not and allows users to set options used to configure the checker.

---

##### `codexm`<sup>Optional</sup> <a name="codexm" id="projen.polaris.CheckerConfiguration.property.codexm"></a>

```typescript
public readonly codexm: string[];
```

- *Type:* string[]

Specifies CodeXM (.cxm) files to use in the analysis.

---

##### `concurrency`<sup>Optional</sup> <a name="concurrency" id="projen.polaris.CheckerConfiguration.property.concurrency"></a>

```typescript
public readonly concurrency: boolean;
```

- *Type:* boolean

Enables C, C++ concurrency checkers that are disabled by default.

---

##### `default`<sup>Optional</sup> <a name="default" id="projen.polaris.CheckerConfiguration.property.default"></a>

```typescript
public readonly default: boolean;
```

- *Type:* boolean

Specifies whether to enable the default set of checkers.

If set to true, the default set of checkers is enabled. Set to false to get more control over which checkers are enabled.

---

##### `pmd`<sup>Optional</sup> <a name="pmd" id="projen.polaris.CheckerConfiguration.property.pmd"></a>

```typescript
public readonly pmd: boolean;
```

- *Type:* boolean

Enables or disables PMD for Apex analysis.

---

##### `recommendedSecurityCheckers`<sup>Optional</sup> <a name="recommendedSecurityCheckers" id="projen.polaris.CheckerConfiguration.property.recommendedSecurityCheckers"></a>

```typescript
public readonly recommendedSecurityCheckers: boolean;
```

- *Type:* boolean

Enables or disables recommended security checkers.

---

##### `rule`<sup>Optional</sup> <a name="rule" id="projen.polaris.CheckerConfiguration.property.rule"></a>

```typescript
public readonly rule: boolean;
```

- *Type:* boolean

Enables C, C++ rule checkers.

---

##### `webappSecurity`<sup>Optional</sup> <a name="webappSecurity" id="projen.polaris.CheckerConfiguration.property.webappSecurity"></a>

```typescript
public readonly webappSecurity: CheckerConfigurationWebappSecurity;
```

- *Type:* <a href="#projen.polaris.CheckerConfigurationWebappSecurity">CheckerConfigurationWebappSecurity</a>

Specifies how web application security analysis should be done.

---

### CheckerConfigurationWebappSecurity <a name="CheckerConfigurationWebappSecurity" id="projen.polaris.CheckerConfigurationWebappSecurity"></a>

Specifies how web application security analysis should be done.

#### Initializer <a name="Initializer" id="projen.polaris.CheckerConfigurationWebappSecurity.Initializer"></a>

```typescript
import { polaris } from 'projen'

const checkerConfigurationWebappSecurity: polaris.CheckerConfigurationWebappSecurity = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.CheckerConfigurationWebappSecurity.property.aggressivenessLevel">aggressivenessLevel</a></code> | <code><a href="#projen.polaris.CheckerConfigurationWebappSecurityAggressivenessLevel">CheckerConfigurationWebappSecurityAggressivenessLevel</a></code> | Sets the web application checkers aggressiveness level. |
| <code><a href="#projen.polaris.CheckerConfigurationWebappSecurity.property.enabled">enabled</a></code> | <code>boolean</code> | Enables the checkers that are used for web application security analysis. |

---

##### `aggressivenessLevel`<sup>Optional</sup> <a name="aggressivenessLevel" id="projen.polaris.CheckerConfigurationWebappSecurity.property.aggressivenessLevel"></a>

```typescript
public readonly aggressivenessLevel: CheckerConfigurationWebappSecurityAggressivenessLevel;
```

- *Type:* <a href="#projen.polaris.CheckerConfigurationWebappSecurityAggressivenessLevel">CheckerConfigurationWebappSecurityAggressivenessLevel</a>

Sets the web application checkers aggressiveness level.

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.polaris.CheckerConfigurationWebappSecurity.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Enables the checkers that are used for web application security analysis.

---

### CodingStandardConfiguration <a name="CodingStandardConfiguration" id="projen.polaris.CodingStandardConfiguration"></a>

#### Initializer <a name="Initializer" id="projen.polaris.CodingStandardConfiguration.Initializer"></a>

```typescript
import { polaris } from 'projen'

const codingStandardConfiguration: polaris.CodingStandardConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.CodingStandardConfiguration.property.autosarcpp14">autosarcpp14</a></code> | <code><a href="#projen.polaris.SpecificCodingStandardConfiguration">SpecificCodingStandardConfiguration</a></code> | Enables AUTOSAR code compliance checking according to the given configuration. |
| <code><a href="#projen.polaris.CodingStandardConfiguration.property.certC">certC</a></code> | <code><a href="#projen.polaris.SpecificCodingStandardConfiguration">SpecificCodingStandardConfiguration</a></code> | Enables CERT-C code compliance checking according to the given configuration. |
| <code><a href="#projen.polaris.CodingStandardConfiguration.property.certCpp">certCpp</a></code> | <code><a href="#projen.polaris.SpecificCodingStandardConfiguration">SpecificCodingStandardConfiguration</a></code> | Enables CERT-CPP code compliance checking according to the given configuration. |
| <code><a href="#projen.polaris.CodingStandardConfiguration.property.certCRecommendation">certCRecommendation</a></code> | <code><a href="#projen.polaris.SpecificCodingStandardConfiguration">SpecificCodingStandardConfiguration</a></code> | Enables CERT-C Recommendation code compliance checking according to the given configuration. |
| <code><a href="#projen.polaris.CodingStandardConfiguration.property.certJava">certJava</a></code> | <code><a href="#projen.polaris.SpecificCodingStandardConfiguration">SpecificCodingStandardConfiguration</a></code> | Enables CERT-Java code compliance checking according to the given configuration. |
| <code><a href="#projen.polaris.CodingStandardConfiguration.property.hyundaiC">hyundaiC</a></code> | <code><a href="#projen.polaris.SpecificCodingStandardConfiguration">SpecificCodingStandardConfiguration</a></code> | Enables HYUNDAI-C code compliance checking according to the given configuration. |
| <code><a href="#projen.polaris.CodingStandardConfiguration.property.hyundaiCpp">hyundaiCpp</a></code> | <code><a href="#projen.polaris.SpecificCodingStandardConfiguration">SpecificCodingStandardConfiguration</a></code> | Enables HYUNDAI-CPP code compliance checking according to the given configuration. |
| <code><a href="#projen.polaris.CodingStandardConfiguration.property.hyundaiJava">hyundaiJava</a></code> | <code><a href="#projen.polaris.SpecificCodingStandardConfiguration">SpecificCodingStandardConfiguration</a></code> | Enables HYUNDAI-Java code compliance checking according to the given configuration. |
| <code><a href="#projen.polaris.CodingStandardConfiguration.property.ignoreDeviatedFindings">ignoreDeviatedFindings</a></code> | <code>boolean</code> | If set to true, any defects found in code annotated using the #pragma Coverity compliance directive will not be reported in Coverity Connect. |
| <code><a href="#projen.polaris.CodingStandardConfiguration.property.isoTs17961">isoTs17961</a></code> | <code><a href="#projen.polaris.SpecificCodingStandardConfiguration">SpecificCodingStandardConfiguration</a></code> | Enables ISO TS 17961 code compliance checking according to the given configuration. |
| <code><a href="#projen.polaris.CodingStandardConfiguration.property.misrac2004">misrac2004</a></code> | <code><a href="#projen.polaris.SpecificCodingStandardConfiguration">SpecificCodingStandardConfiguration</a></code> | Enables MISRA C 2004 code compliance checking according to the given configuration. |
| <code><a href="#projen.polaris.CodingStandardConfiguration.property.misrac2012">misrac2012</a></code> | <code><a href="#projen.polaris.SpecificCodingStandardConfiguration">SpecificCodingStandardConfiguration</a></code> | Enables MISRA C 2012 code compliance checking according to the given configuration. |
| <code><a href="#projen.polaris.CodingStandardConfiguration.property.misrac2023">misrac2023</a></code> | <code><a href="#projen.polaris.SpecificCodingStandardConfiguration">SpecificCodingStandardConfiguration</a></code> | Enables MISRA C 2023 code compliance checking according to the given configuration. |
| <code><a href="#projen.polaris.CodingStandardConfiguration.property.misracpp2008">misracpp2008</a></code> | <code><a href="#projen.polaris.SpecificCodingStandardConfiguration">SpecificCodingStandardConfiguration</a></code> | Enables MISRA C++ 2008 code compliance checking according to the given configuration. |
| <code><a href="#projen.polaris.CodingStandardConfiguration.property.misracpp2023">misracpp2023</a></code> | <code><a href="#projen.polaris.SpecificCodingStandardConfiguration">SpecificCodingStandardConfiguration</a></code> | Enables MISRA C++ 2023 code compliance checking according to the given configuration. |

---

##### `autosarcpp14`<sup>Optional</sup> <a name="autosarcpp14" id="projen.polaris.CodingStandardConfiguration.property.autosarcpp14"></a>

```typescript
public readonly autosarcpp14: SpecificCodingStandardConfiguration;
```

- *Type:* <a href="#projen.polaris.SpecificCodingStandardConfiguration">SpecificCodingStandardConfiguration</a>

Enables AUTOSAR code compliance checking according to the given configuration.

---

##### `certC`<sup>Optional</sup> <a name="certC" id="projen.polaris.CodingStandardConfiguration.property.certC"></a>

```typescript
public readonly certC: SpecificCodingStandardConfiguration;
```

- *Type:* <a href="#projen.polaris.SpecificCodingStandardConfiguration">SpecificCodingStandardConfiguration</a>

Enables CERT-C code compliance checking according to the given configuration.

---

##### `certCpp`<sup>Optional</sup> <a name="certCpp" id="projen.polaris.CodingStandardConfiguration.property.certCpp"></a>

```typescript
public readonly certCpp: SpecificCodingStandardConfiguration;
```

- *Type:* <a href="#projen.polaris.SpecificCodingStandardConfiguration">SpecificCodingStandardConfiguration</a>

Enables CERT-CPP code compliance checking according to the given configuration.

---

##### `certCRecommendation`<sup>Optional</sup> <a name="certCRecommendation" id="projen.polaris.CodingStandardConfiguration.property.certCRecommendation"></a>

```typescript
public readonly certCRecommendation: SpecificCodingStandardConfiguration;
```

- *Type:* <a href="#projen.polaris.SpecificCodingStandardConfiguration">SpecificCodingStandardConfiguration</a>

Enables CERT-C Recommendation code compliance checking according to the given configuration.

---

##### `certJava`<sup>Optional</sup> <a name="certJava" id="projen.polaris.CodingStandardConfiguration.property.certJava"></a>

```typescript
public readonly certJava: SpecificCodingStandardConfiguration;
```

- *Type:* <a href="#projen.polaris.SpecificCodingStandardConfiguration">SpecificCodingStandardConfiguration</a>

Enables CERT-Java code compliance checking according to the given configuration.

---

##### `hyundaiC`<sup>Optional</sup> <a name="hyundaiC" id="projen.polaris.CodingStandardConfiguration.property.hyundaiC"></a>

```typescript
public readonly hyundaiC: SpecificCodingStandardConfiguration;
```

- *Type:* <a href="#projen.polaris.SpecificCodingStandardConfiguration">SpecificCodingStandardConfiguration</a>

Enables HYUNDAI-C code compliance checking according to the given configuration.

---

##### `hyundaiCpp`<sup>Optional</sup> <a name="hyundaiCpp" id="projen.polaris.CodingStandardConfiguration.property.hyundaiCpp"></a>

```typescript
public readonly hyundaiCpp: SpecificCodingStandardConfiguration;
```

- *Type:* <a href="#projen.polaris.SpecificCodingStandardConfiguration">SpecificCodingStandardConfiguration</a>

Enables HYUNDAI-CPP code compliance checking according to the given configuration.

---

##### `hyundaiJava`<sup>Optional</sup> <a name="hyundaiJava" id="projen.polaris.CodingStandardConfiguration.property.hyundaiJava"></a>

```typescript
public readonly hyundaiJava: SpecificCodingStandardConfiguration;
```

- *Type:* <a href="#projen.polaris.SpecificCodingStandardConfiguration">SpecificCodingStandardConfiguration</a>

Enables HYUNDAI-Java code compliance checking according to the given configuration.

---

##### `ignoreDeviatedFindings`<sup>Optional</sup> <a name="ignoreDeviatedFindings" id="projen.polaris.CodingStandardConfiguration.property.ignoreDeviatedFindings"></a>

```typescript
public readonly ignoreDeviatedFindings: boolean;
```

- *Type:* boolean

If set to true, any defects found in code annotated using the #pragma Coverity compliance directive will not be reported in Coverity Connect.

Information about the defects that were suppressed can then be found in two files: deviations.txt deviations-warnings.txt

---

##### `isoTs17961`<sup>Optional</sup> <a name="isoTs17961" id="projen.polaris.CodingStandardConfiguration.property.isoTs17961"></a>

```typescript
public readonly isoTs17961: SpecificCodingStandardConfiguration;
```

- *Type:* <a href="#projen.polaris.SpecificCodingStandardConfiguration">SpecificCodingStandardConfiguration</a>

Enables ISO TS 17961 code compliance checking according to the given configuration.

---

##### `misrac2004`<sup>Optional</sup> <a name="misrac2004" id="projen.polaris.CodingStandardConfiguration.property.misrac2004"></a>

```typescript
public readonly misrac2004: SpecificCodingStandardConfiguration;
```

- *Type:* <a href="#projen.polaris.SpecificCodingStandardConfiguration">SpecificCodingStandardConfiguration</a>

Enables MISRA C 2004 code compliance checking according to the given configuration.

---

##### `misrac2012`<sup>Optional</sup> <a name="misrac2012" id="projen.polaris.CodingStandardConfiguration.property.misrac2012"></a>

```typescript
public readonly misrac2012: SpecificCodingStandardConfiguration;
```

- *Type:* <a href="#projen.polaris.SpecificCodingStandardConfiguration">SpecificCodingStandardConfiguration</a>

Enables MISRA C 2012 code compliance checking according to the given configuration.

---

##### `misrac2023`<sup>Optional</sup> <a name="misrac2023" id="projen.polaris.CodingStandardConfiguration.property.misrac2023"></a>

```typescript
public readonly misrac2023: SpecificCodingStandardConfiguration;
```

- *Type:* <a href="#projen.polaris.SpecificCodingStandardConfiguration">SpecificCodingStandardConfiguration</a>

Enables MISRA C 2023 code compliance checking according to the given configuration.

---

##### `misracpp2008`<sup>Optional</sup> <a name="misracpp2008" id="projen.polaris.CodingStandardConfiguration.property.misracpp2008"></a>

```typescript
public readonly misracpp2008: SpecificCodingStandardConfiguration;
```

- *Type:* <a href="#projen.polaris.SpecificCodingStandardConfiguration">SpecificCodingStandardConfiguration</a>

Enables MISRA C++ 2008 code compliance checking according to the given configuration.

---

##### `misracpp2023`<sup>Optional</sup> <a name="misracpp2023" id="projen.polaris.CodingStandardConfiguration.property.misracpp2023"></a>

```typescript
public readonly misracpp2023: SpecificCodingStandardConfiguration;
```

- *Type:* <a href="#projen.polaris.SpecificCodingStandardConfiguration">SpecificCodingStandardConfiguration</a>

Enables MISRA C++ 2023 code compliance checking according to the given configuration.

---

### CodingStandardDeviation <a name="CodingStandardDeviation" id="projen.polaris.CodingStandardDeviation"></a>

#### Initializer <a name="Initializer" id="projen.polaris.CodingStandardDeviation.Initializer"></a>

```typescript
import { polaris } from 'projen'

const codingStandardDeviation: polaris.CodingStandardDeviation = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.CodingStandardDeviation.property.deviation">deviation</a></code> | <code>string</code> | The name of the rule to deviate from. |
| <code><a href="#projen.polaris.CodingStandardDeviation.property.reason">reason</a></code> | <code>string</code> | The reason that the rule is being deviated from. |

---

##### `deviation`<sup>Required</sup> <a name="deviation" id="projen.polaris.CodingStandardDeviation.property.deviation"></a>

```typescript
public readonly deviation: string;
```

- *Type:* string

The name of the rule to deviate from.

---

##### `reason`<sup>Required</sup> <a name="reason" id="projen.polaris.CodingStandardDeviation.property.reason"></a>

```typescript
public readonly reason: string;
```

- *Type:* string

The reason that the rule is being deviated from.

---

### CommitConfiguration <a name="CommitConfiguration" id="projen.polaris.CommitConfiguration"></a>

Specifies where the analysis results should be sent.

#### Initializer <a name="Initializer" id="projen.polaris.CommitConfiguration.Initializer"></a>

```typescript
import { polaris } from 'projen'

const commitConfiguration: polaris.CommitConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.CommitConfiguration.property.connect">connect</a></code> | <code><a href="#projen.polaris.CommitConfigurationConnect">CommitConfigurationConnect</a></code> | Coverity Connect configuration to use when committing defects to Coverity Connect. |
| <code><a href="#projen.polaris.CommitConfiguration.property.local">local</a></code> | <code><a href="#projen.polaris.CommitConfigurationLocal">CommitConfigurationLocal</a></code> | Local configuration to use when saving defects to the local file system. |
| <code><a href="#projen.polaris.CommitConfiguration.property.srm">srm</a></code> | <code><a href="#projen.polaris.CommitConfigurationSrm">CommitConfigurationSrm</a></code> | Software Risk Manager configuration to use when storing defects in Software Risk Manager. |

---

##### `connect`<sup>Optional</sup> <a name="connect" id="projen.polaris.CommitConfiguration.property.connect"></a>

```typescript
public readonly connect: CommitConfigurationConnect;
```

- *Type:* <a href="#projen.polaris.CommitConfigurationConnect">CommitConfigurationConnect</a>

Coverity Connect configuration to use when committing defects to Coverity Connect.

---

##### `local`<sup>Optional</sup> <a name="local" id="projen.polaris.CommitConfiguration.property.local"></a>

```typescript
public readonly local: CommitConfigurationLocal;
```

- *Type:* <a href="#projen.polaris.CommitConfigurationLocal">CommitConfigurationLocal</a>

Local configuration to use when saving defects to the local file system.

---

##### `srm`<sup>Optional</sup> <a name="srm" id="projen.polaris.CommitConfiguration.property.srm"></a>

```typescript
public readonly srm: CommitConfigurationSrm;
```

- *Type:* <a href="#projen.polaris.CommitConfigurationSrm">CommitConfigurationSrm</a>

Software Risk Manager configuration to use when storing defects in Software Risk Manager.

---

### CommitConfigurationConnect <a name="CommitConfigurationConnect" id="projen.polaris.CommitConfigurationConnect"></a>

Coverity Connect configuration to use when committing defects to Coverity Connect.

#### Initializer <a name="Initializer" id="projen.polaris.CommitConfigurationConnect.Initializer"></a>

```typescript
import { polaris } from 'projen'

const commitConfigurationConnect: polaris.CommitConfigurationConnect = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.CommitConfigurationConnect.property.stream">stream</a></code> | <code>string</code> | The name of the stream to commit the results to. |
| <code><a href="#projen.polaris.CommitConfigurationConnect.property.url">url</a></code> | <code>string</code> | Absolute URL of where to commit the Coverity Connect results. |
| <code><a href="#projen.polaris.CommitConfigurationConnect.property.authKeyFile">authKeyFile</a></code> | <code>string</code> | The authentication key file to use when authenticating to Coverity Connect to commit defects. |
| <code><a href="#projen.polaris.CommitConfigurationConnect.property.caCertsFile">caCertsFile</a></code> | <code>string</code> | File containing additional certificates to trust in addition to the ones in the system certificate store and the Coverity TFT store. |
| <code><a href="#projen.polaris.CommitConfigurationConnect.property.comparisonOnly">comparisonOnly</a></code> | <code>boolean</code> | If true, analysis results will not be committed to Coverity Connect. |
| <code><a href="#projen.polaris.CommitConfigurationConnect.property.comparisonReport">comparisonReport</a></code> | <code>string</code> | Output file to which analysis results should be written instead of being committed to Coverity Connect. |
| <code><a href="#projen.polaris.CommitConfigurationConnect.property.covCommitDefectsArgs">covCommitDefectsArgs</a></code> | <code>string[]</code> | Additional arguments to pass to "cov-commit-defects" during the commit phase. |
| <code><a href="#projen.polaris.CommitConfigurationConnect.property.description">description</a></code> | <code>string</code> | A description for the committed snapshot. |
| <code><a href="#projen.polaris.CommitConfigurationConnect.property.onNewCert">onNewCert</a></code> | <code><a href="#projen.polaris.CommitConfigurationConnectOnNewCert">CommitConfigurationConnectOnNewCert</a></code> | Indicates whether to trust self-signed certificates presented by Coverity Connect that are not currently trusted. |
| <code><a href="#projen.polaris.CommitConfigurationConnect.property.project">project</a></code> | <code>string</code> | The name of the project to use when creating a new stream. |
| <code><a href="#projen.polaris.CommitConfigurationConnect.property.proxyClientCertFile">proxyClientCertFile</a></code> | <code>string</code> | File containing the client certificate in PEM format, that should be presented to the proxy when making a request. |
| <code><a href="#projen.polaris.CommitConfigurationConnect.property.proxyClientKeyFile">proxyClientKeyFile</a></code> | <code>string</code> | File containing the client certificate private key in PEM format, for the proxy-client-cert-file. |
| <code><a href="#projen.polaris.CommitConfigurationConnect.property.proxyUrl">proxyUrl</a></code> | <code>string</code> | URL for a forward proxy to use when communicating with Coverity Connect. |
| <code><a href="#projen.polaris.CommitConfigurationConnect.property.scm">scm</a></code> | <code><a href="#projen.polaris.CommitConfigurationConnectScm">CommitConfigurationConnectScm</a></code> | The name of the source control management system. |
| <code><a href="#projen.polaris.CommitConfigurationConnect.property.snapshot">snapshot</a></code> | <code><a href="#projen.polaris.SnapshotConfiguration">SnapshotConfiguration</a></code> | Specifies how to select a reference snapshot to use for a comparison report. |
| <code><a href="#projen.polaris.CommitConfigurationConnect.property.triage">triage</a></code> | <code><a href="#projen.polaris.CommitConfigurationConnectTriage">CommitConfigurationConnectTriage</a></code> | Specifies how new defects should be handled. |
| <code><a href="#projen.polaris.CommitConfigurationConnect.property.uploadArtifacts">uploadArtifacts</a></code> | <code><a href="#projen.polaris.CommitConfigurationConnectUploadArtifacts">CommitConfigurationConnectUploadArtifacts</a></code> | Artifacts to upload following analysis when the analysis location is Connect. |
| <code><a href="#projen.polaris.CommitConfigurationConnect.property.version">version</a></code> | <code>string</code> | A project version for the committed snapshot. |

---

##### `stream`<sup>Required</sup> <a name="stream" id="projen.polaris.CommitConfigurationConnect.property.stream"></a>

```typescript
public readonly stream: string;
```

- *Type:* string

The name of the stream to commit the results to.

---

##### `url`<sup>Required</sup> <a name="url" id="projen.polaris.CommitConfigurationConnect.property.url"></a>

```typescript
public readonly url: string;
```

- *Type:* string

Absolute URL of where to commit the Coverity Connect results.

---

##### `authKeyFile`<sup>Optional</sup> <a name="authKeyFile" id="projen.polaris.CommitConfigurationConnect.property.authKeyFile"></a>

```typescript
public readonly authKeyFile: string;
```

- *Type:* string

The authentication key file to use when authenticating to Coverity Connect to commit defects.

By default, the file located at $HOME/.coverity/ak-<hostname>-<port> is used.

---

##### `caCertsFile`<sup>Optional</sup> <a name="caCertsFile" id="projen.polaris.CommitConfigurationConnect.property.caCertsFile"></a>

```typescript
public readonly caCertsFile: string;
```

- *Type:* string

File containing additional certificates to trust in addition to the ones in the system certificate store and the Coverity TFT store.

By default system CA certificates are used.

---

##### `comparisonOnly`<sup>Optional</sup> <a name="comparisonOnly" id="projen.polaris.CommitConfigurationConnect.property.comparisonOnly"></a>

```typescript
public readonly comparisonOnly: boolean;
```

- *Type:* boolean

If true, analysis results will not be committed to Coverity Connect.

Instead, results compared to a reference snapshot may be saved locally as specified by the "commit.local" settings.

---

##### `comparisonReport`<sup>Optional</sup> <a name="comparisonReport" id="projen.polaris.CommitConfigurationConnect.property.comparisonReport"></a>

```typescript
public readonly comparisonReport: string;
```

- *Type:* string

Output file to which analysis results should be written instead of being committed to Coverity Connect.

The output includes a comparison against the latest snapshot for the specified stream.

---

##### `covCommitDefectsArgs`<sup>Optional</sup> <a name="covCommitDefectsArgs" id="projen.polaris.CommitConfigurationConnect.property.covCommitDefectsArgs"></a>

```typescript
public readonly covCommitDefectsArgs: string[];
```

- *Type:* string[]

Additional arguments to pass to "cov-commit-defects" during the commit phase.

---

##### `description`<sup>Optional</sup> <a name="description" id="projen.polaris.CommitConfigurationConnect.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

A description for the committed snapshot.

---

##### `onNewCert`<sup>Optional</sup> <a name="onNewCert" id="projen.polaris.CommitConfigurationConnect.property.onNewCert"></a>

```typescript
public readonly onNewCert: CommitConfigurationConnectOnNewCert;
```

- *Type:* <a href="#projen.polaris.CommitConfigurationConnectOnNewCert">CommitConfigurationConnectOnNewCert</a>

Indicates whether to trust self-signed certificates presented by Coverity Connect that are not currently trusted.

---

##### `project`<sup>Optional</sup> <a name="project" id="projen.polaris.CommitConfigurationConnect.property.project"></a>

```typescript
public readonly project: string;
```

- *Type:* string

The name of the project to use when creating a new stream.

Ignored when stream creation is not needed. By default the stream name is used.

---

##### `proxyClientCertFile`<sup>Optional</sup> <a name="proxyClientCertFile" id="projen.polaris.CommitConfigurationConnect.property.proxyClientCertFile"></a>

```typescript
public readonly proxyClientCertFile: string;
```

- *Type:* string

File containing the client certificate in PEM format, that should be presented to the proxy when making a request.

---

##### `proxyClientKeyFile`<sup>Optional</sup> <a name="proxyClientKeyFile" id="projen.polaris.CommitConfigurationConnect.property.proxyClientKeyFile"></a>

```typescript
public readonly proxyClientKeyFile: string;
```

- *Type:* string

File containing the client certificate private key in PEM format, for the proxy-client-cert-file.

---

##### `proxyUrl`<sup>Optional</sup> <a name="proxyUrl" id="projen.polaris.CommitConfigurationConnect.property.proxyUrl"></a>

```typescript
public readonly proxyUrl: string;
```

- *Type:* string

URL for a forward proxy to use when communicating with Coverity Connect.

Must be an https URL.

---

##### `scm`<sup>Optional</sup> <a name="scm" id="projen.polaris.CommitConfigurationConnect.property.scm"></a>

```typescript
public readonly scm: CommitConfigurationConnectScm;
```

- *Type:* <a href="#projen.polaris.CommitConfigurationConnectScm">CommitConfigurationConnectScm</a>

The name of the source control management system.

---

##### `snapshot`<sup>Optional</sup> <a name="snapshot" id="projen.polaris.CommitConfigurationConnect.property.snapshot"></a>

```typescript
public readonly snapshot: SnapshotConfiguration;
```

- *Type:* <a href="#projen.polaris.SnapshotConfiguration">SnapshotConfiguration</a>

Specifies how to select a reference snapshot to use for a comparison report.

---

##### `triage`<sup>Optional</sup> <a name="triage" id="projen.polaris.CommitConfigurationConnect.property.triage"></a>

```typescript
public readonly triage: CommitConfigurationConnectTriage;
```

- *Type:* <a href="#projen.polaris.CommitConfigurationConnectTriage">CommitConfigurationConnectTriage</a>

Specifies how new defects should be handled.

---

##### `uploadArtifacts`<sup>Optional</sup> <a name="uploadArtifacts" id="projen.polaris.CommitConfigurationConnect.property.uploadArtifacts"></a>

```typescript
public readonly uploadArtifacts: CommitConfigurationConnectUploadArtifacts;
```

- *Type:* <a href="#projen.polaris.CommitConfigurationConnectUploadArtifacts">CommitConfigurationConnectUploadArtifacts</a>

Artifacts to upload following analysis when the analysis location is Connect.

---

##### `version`<sup>Optional</sup> <a name="version" id="projen.polaris.CommitConfigurationConnect.property.version"></a>

```typescript
public readonly version: string;
```

- *Type:* string

A project version for the committed snapshot.

---

### CommitConfigurationConnectTriage <a name="CommitConfigurationConnectTriage" id="projen.polaris.CommitConfigurationConnectTriage"></a>

Specifies how new defects should be handled.

#### Initializer <a name="Initializer" id="projen.polaris.CommitConfigurationConnectTriage.Initializer"></a>

```typescript
import { polaris } from 'projen'

const commitConfigurationConnectTriage: polaris.CommitConfigurationConnectTriage = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.CommitConfigurationConnectTriage.property.newDefectOwner">newDefectOwner</a></code> | <code>string</code> | User to whom any new defects will be assigned. |
| <code><a href="#projen.polaris.CommitConfigurationConnectTriage.property.newDefectOwnerLimit">newDefectOwnerLimit</a></code> | <code>number</code> | Limit on the number of defects to assign to the specified user. |
| <code><a href="#projen.polaris.CommitConfigurationConnectTriage.property.setNewDefectOwner">setNewDefectOwner</a></code> | <code>boolean</code> | If true, the owner for newly detected defects that exist locally is set to the specified user. |

---

##### `newDefectOwner`<sup>Optional</sup> <a name="newDefectOwner" id="projen.polaris.CommitConfigurationConnectTriage.property.newDefectOwner"></a>

```typescript
public readonly newDefectOwner: string;
```

- *Type:* string

User to whom any new defects will be assigned.

The specified user must already exist in the Coverity Connect database. The default is the current user.

---

##### `newDefectOwnerLimit`<sup>Optional</sup> <a name="newDefectOwnerLimit" id="projen.polaris.CommitConfigurationConnectTriage.property.newDefectOwnerLimit"></a>

```typescript
public readonly newDefectOwnerLimit: number;
```

- *Type:* number

Limit on the number of defects to assign to the specified user.

If the number of discovered defects is more than the limit, then no assignment is done.

---

##### `setNewDefectOwner`<sup>Optional</sup> <a name="setNewDefectOwner" id="projen.polaris.CommitConfigurationConnectTriage.property.setNewDefectOwner"></a>

```typescript
public readonly setNewDefectOwner: boolean;
```

- *Type:* boolean

If true, the owner for newly detected defects that exist locally is set to the specified user.

---

### CommitConfigurationLocal <a name="CommitConfigurationLocal" id="projen.polaris.CommitConfigurationLocal"></a>

Local configuration to use when saving defects to the local file system.

#### Initializer <a name="Initializer" id="projen.polaris.CommitConfigurationLocal.Initializer"></a>

```typescript
import { polaris } from 'projen'

const commitConfigurationLocal: polaris.CommitConfigurationLocal = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.CommitConfigurationLocal.property.path">path</a></code> | <code>string</code> | Directory (for "html" format) or file (for "json" format) in which to save defects. |
| <code><a href="#projen.polaris.CommitConfigurationLocal.property.format">format</a></code> | <code><a href="#projen.polaris.CommitConfigurationLocalFormat">CommitConfigurationLocalFormat</a></code> | Format in which to save defects. |

---

##### `path`<sup>Required</sup> <a name="path" id="projen.polaris.CommitConfigurationLocal.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* string

Directory (for "html" format) or file (for "json" format) in which to save defects.

---

##### `format`<sup>Optional</sup> <a name="format" id="projen.polaris.CommitConfigurationLocal.property.format"></a>

```typescript
public readonly format: CommitConfigurationLocalFormat;
```

- *Type:* <a href="#projen.polaris.CommitConfigurationLocalFormat">CommitConfigurationLocalFormat</a>

Format in which to save defects.

Either "html" or "json".

---

### CommitConfigurationSrm <a name="CommitConfigurationSrm" id="projen.polaris.CommitConfigurationSrm"></a>

Software Risk Manager configuration to use when storing defects in Software Risk Manager.

#### Initializer <a name="Initializer" id="projen.polaris.CommitConfigurationSrm.Initializer"></a>

```typescript
import { polaris } from 'projen'

const commitConfigurationSrm: polaris.CommitConfigurationSrm = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.CommitConfigurationSrm.property.url">url</a></code> | <code>string</code> | The URL of the Software Risk Manager to use for the analysis (if doing a remote analysis) and the analysis results. |
| <code><a href="#projen.polaris.CommitConfigurationSrm.property.branch">branch</a></code> | <code>string</code> | The name of the branch to associate the analysis results with in Software Risk Manager. |
| <code><a href="#projen.polaris.CommitConfigurationSrm.property.parentBranch">parentBranch</a></code> | <code>string</code> | The name of the parent branch of the actual branch. |
| <code><a href="#projen.polaris.CommitConfigurationSrm.property.projectId">projectId</a></code> | <code>number</code> | The ID of the project to associate the analysis results with in Software Risk Manager. |
| <code><a href="#projen.polaris.CommitConfigurationSrm.property.projectName">projectName</a></code> | <code>string</code> | The name of the project to associate the analysis results with in Software Risk Manager. |
| <code><a href="#projen.polaris.CommitConfigurationSrm.property.tokenFile">tokenFile</a></code> | <code>string</code> | The name of the file to read the Software Risk Manager API key from. |

---

##### `url`<sup>Required</sup> <a name="url" id="projen.polaris.CommitConfigurationSrm.property.url"></a>

```typescript
public readonly url: string;
```

- *Type:* string

The URL of the Software Risk Manager to use for the analysis (if doing a remote analysis) and the analysis results.

---

##### `branch`<sup>Optional</sup> <a name="branch" id="projen.polaris.CommitConfigurationSrm.property.branch"></a>

```typescript
public readonly branch: string;
```

- *Type:* string

The name of the branch to associate the analysis results with in Software Risk Manager.

---

##### `parentBranch`<sup>Optional</sup> <a name="parentBranch" id="projen.polaris.CommitConfigurationSrm.property.parentBranch"></a>

```typescript
public readonly parentBranch: string;
```

- *Type:* string

The name of the parent branch of the actual branch.

---

##### `projectId`<sup>Optional</sup> <a name="projectId" id="projen.polaris.CommitConfigurationSrm.property.projectId"></a>

```typescript
public readonly projectId: number;
```

- *Type:* number

The ID of the project to associate the analysis results with in Software Risk Manager.

---

##### `projectName`<sup>Optional</sup> <a name="projectName" id="projen.polaris.CommitConfigurationSrm.property.projectName"></a>

```typescript
public readonly projectName: string;
```

- *Type:* string

The name of the project to associate the analysis results with in Software Risk Manager.

---

##### `tokenFile`<sup>Optional</sup> <a name="tokenFile" id="projen.polaris.CommitConfigurationSrm.property.tokenFile"></a>

```typescript
public readonly tokenFile: string;
```

- *Type:* string

The name of the file to read the Software Risk Manager API key from.

By default, the file located at $HOME/.bridge/srm-token.txt is used.

---

### CompilerConfiguration <a name="CompilerConfiguration" id="projen.polaris.CompilerConfiguration"></a>

#### Initializer <a name="Initializer" id="projen.polaris.CompilerConfiguration.Initializer"></a>

```typescript
import { polaris } from 'projen'

const compilerConfiguration: polaris.CompilerConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.CompilerConfiguration.property.covConfigure">covConfigure</a></code> | <code>string[][]</code> | Specifies a list of arguments to pass to "cov-configure" to generate the compiler configuration to use during capture. |
| <code><a href="#projen.polaris.CompilerConfiguration.property.file">file</a></code> | <code>string</code> | Specifies a pre-generated compiler configuration file to use. |

---

##### `covConfigure`<sup>Optional</sup> <a name="covConfigure" id="projen.polaris.CompilerConfiguration.property.covConfigure"></a>

```typescript
public readonly covConfigure: string[][];
```

- *Type:* string[][]

Specifies a list of arguments to pass to "cov-configure" to generate the compiler configuration to use during capture.

This key is mutually exclusive with the "file" key.

---

##### `file`<sup>Optional</sup> <a name="file" id="projen.polaris.CompilerConfiguration.property.file"></a>

```typescript
public readonly file: string;
```

- *Type:* string

Specifies a pre-generated compiler configuration file to use.

This key is mutually exclusive with the "cov-configure" key.

---

### CovTranslateConfiguration <a name="CovTranslateConfiguration" id="projen.polaris.CovTranslateConfiguration"></a>

Command to invoke that will invoke "cov-translate" to capture the project.

#### Initializer <a name="Initializer" id="projen.polaris.CovTranslateConfiguration.Initializer"></a>

```typescript
import { polaris } from 'projen'

const covTranslateConfiguration: polaris.CovTranslateConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.CovTranslateConfiguration.property.command">command</a></code> | <code>string</code> | This key specifies a command to invoke that will invoke "cov-translate" in the case where the user is doing a "cov-translate" capture. |
| <code><a href="#projen.polaris.CovTranslateConfiguration.property.covBuildArgs">covBuildArgs</a></code> | <code>string[]</code> | Additional arguments to pass to cov-build when invoking the provided command. |
| <code><a href="#projen.polaris.CovTranslateConfiguration.property.deferDecomp">deferDecomp</a></code> | <code>boolean</code> | Specifies whether the build should only record the decompilations of byte code during the build and not attempt to decompile and emit the byte code. |
| <code><a href="#projen.polaris.CovTranslateConfiguration.property.parallelTranslate">parallelTranslate</a></code> | <code><a href="#projen.polaris.ParallelTranslateConfiguration">ParallelTranslateConfiguration</a></code> | Specifies how to parallelize translation of C and C++ code. |
| <code><a href="#projen.polaris.CovTranslateConfiguration.property.scanTransparency">scanTransparency</a></code> | <code>boolean</code> | Specifies whether to enable the collection of scan transparency data for cov-translate capture. |

---

##### `command`<sup>Required</sup> <a name="command" id="projen.polaris.CovTranslateConfiguration.property.command"></a>

```typescript
public readonly command: string;
```

- *Type:* string

This key specifies a command to invoke that will invoke "cov-translate" in the case where the user is doing a "cov-translate" capture.

---

##### `covBuildArgs`<sup>Optional</sup> <a name="covBuildArgs" id="projen.polaris.CovTranslateConfiguration.property.covBuildArgs"></a>

```typescript
public readonly covBuildArgs: string[];
```

- *Type:* string[]

Additional arguments to pass to cov-build when invoking the provided command.

---

##### `deferDecomp`<sup>Optional</sup> <a name="deferDecomp" id="projen.polaris.CovTranslateConfiguration.property.deferDecomp"></a>

```typescript
public readonly deferDecomp: boolean;
```

- *Type:* boolean

Specifies whether the build should only record the decompilations of byte code during the build and not attempt to decompile and emit the byte code.

During the analysis phase, cov-build will be rerun with --replay-decomp to decompile and emit the byte code.

---

##### `parallelTranslate`<sup>Optional</sup> <a name="parallelTranslate" id="projen.polaris.CovTranslateConfiguration.property.parallelTranslate"></a>

```typescript
public readonly parallelTranslate: ParallelTranslateConfiguration;
```

- *Type:* <a href="#projen.polaris.ParallelTranslateConfiguration">ParallelTranslateConfiguration</a>

Specifies how to parallelize translation of C and C++ code.

---

##### `scanTransparency`<sup>Optional</sup> <a name="scanTransparency" id="projen.polaris.CovTranslateConfiguration.property.scanTransparency"></a>

```typescript
public readonly scanTransparency: boolean;
```

- *Type:* boolean

Specifies whether to enable the collection of scan transparency data for cov-translate capture.

This setting must be enabled if the Coverity Connect instance has 'scan.transparency.enabled=true' in its configuration.

---

### DirectivesConfiguration <a name="DirectivesConfiguration" id="projen.polaris.DirectivesConfiguration"></a>

#### Initializer <a name="Initializer" id="projen.polaris.DirectivesConfiguration.Initializer"></a>

```typescript
import { polaris } from 'projen'

const directivesConfiguration: polaris.DirectivesConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.DirectivesConfiguration.property.config">config</a></code> | <code><a href="#projen.polaris.DirectivesConfigurationConfig">DirectivesConfigurationConfig</a></code> | Security directives configuration to use during the analysis. |
| <code><a href="#projen.polaris.DirectivesConfiguration.property.file">file</a></code> | <code>string</code> | File containing security directives to use during the analysis. |

---

##### `config`<sup>Optional</sup> <a name="config" id="projen.polaris.DirectivesConfiguration.property.config"></a>

```typescript
public readonly config: DirectivesConfigurationConfig;
```

- *Type:* <a href="#projen.polaris.DirectivesConfigurationConfig">DirectivesConfigurationConfig</a>

Security directives configuration to use during the analysis.

This key is mutually exclusive with the "file" key and is specified in the case where the user wants to in-line the security directives configuration in the file.

---

##### `file`<sup>Optional</sup> <a name="file" id="projen.polaris.DirectivesConfiguration.property.file"></a>

```typescript
public readonly file: string;
```

- *Type:* string

File containing security directives to use during the analysis.

This key is mutually exclusive with the "config" key.

---

### DirectivesConfigurationConfig <a name="DirectivesConfigurationConfig" id="projen.polaris.DirectivesConfigurationConfig"></a>

Security directives configuration to use during the analysis.

This key is mutually exclusive with the "file" key and is specified in the case where the user wants to in-line the security directives configuration in the file.

#### Initializer <a name="Initializer" id="projen.polaris.DirectivesConfigurationConfig.Initializer"></a>

```typescript
import { polaris } from 'projen'

const directivesConfigurationConfig: polaris.DirectivesConfigurationConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.DirectivesConfigurationConfig.property.directives">directives</a></code> | <code>any[]</code> | Specify a particular analysis behavior. |
| <code><a href="#projen.polaris.DirectivesConfigurationConfig.property.language">language</a></code> | <code>string</code> | Language or language family to which directives apply. |
| <code><a href="#projen.polaris.DirectivesConfigurationConfig.property.formatVersion">formatVersion</a></code> | <code>number</code> | Version of the directives format. |
| <code><a href="#projen.polaris.DirectivesConfigurationConfig.property.type">type</a></code> | <code><a href="#projen.polaris.DirectivesConfigurationConfigType">DirectivesConfigurationConfigType</a></code> | Must be the string "Coverity analysis configuration". |

---

##### `directives`<sup>Required</sup> <a name="directives" id="projen.polaris.DirectivesConfigurationConfig.property.directives"></a>

```typescript
public readonly directives: any[];
```

- *Type:* any[]

Specify a particular analysis behavior.

---

##### `language`<sup>Required</sup> <a name="language" id="projen.polaris.DirectivesConfigurationConfig.property.language"></a>

```typescript
public readonly language: string;
```

- *Type:* string

Language or language family to which directives apply.

---

##### `formatVersion`<sup>Optional</sup> <a name="formatVersion" id="projen.polaris.DirectivesConfigurationConfig.property.formatVersion"></a>

```typescript
public readonly formatVersion: number;
```

- *Type:* number

Version of the directives format.

---

##### `type`<sup>Optional</sup> <a name="type" id="projen.polaris.DirectivesConfigurationConfig.property.type"></a>

```typescript
public readonly type: DirectivesConfigurationConfigType;
```

- *Type:* <a href="#projen.polaris.DirectivesConfigurationConfigType">DirectivesConfigurationConfigType</a>

Must be the string "Coverity analysis configuration".

---

### FilesConfiguration <a name="FilesConfiguration" id="projen.polaris.FilesConfiguration"></a>

#### Initializer <a name="Initializer" id="projen.polaris.FilesConfiguration.Initializer"></a>

```typescript
import { polaris } from 'projen'

const filesConfiguration: polaris.FilesConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.FilesConfiguration.property.emitMinifiedJs">emitMinifiedJs</a></code> | <code>boolean</code> | Specifies whether to enable capture of minified JavaScript files. |
| <code><a href="#projen.polaris.FilesConfiguration.property.excludeGlob">excludeGlob</a></code> | <code>string</code> | Glob pattern that specifies the set of source files to exclude from capture. |
| <code><a href="#projen.polaris.FilesConfiguration.property.excludeRegex">excludeRegex</a></code> | <code>string</code> | Regular expression that specifies the set of source files to exclude from capture. |
| <code><a href="#projen.polaris.FilesConfiguration.property.includeDirs">includeDirs</a></code> | <code>string[]</code> | List of directory basenames to include for capture, which would normally have been excluded. |
| <code><a href="#projen.polaris.FilesConfiguration.property.includeGlob">includeGlob</a></code> | <code>string</code> | Glob pattern that specifies the set of source files to capture. |
| <code><a href="#projen.polaris.FilesConfiguration.property.includeListFile">includeListFile</a></code> | <code>string</code> | File containing the paths of source files to capture, one per line. |
| <code><a href="#projen.polaris.FilesConfiguration.property.includeRegex">includeRegex</a></code> | <code>string</code> | Regular expression that specifies the set of source files to capture. |
| <code><a href="#projen.polaris.FilesConfiguration.property.javaVersion">javaVersion</a></code> | <code>string</code> | Specifies the Java version to use when parsing and emitting Java source files with buildless capture. |
| <code><a href="#projen.polaris.FilesConfiguration.property.libraryDirs">libraryDirs</a></code> | <code>string[]</code> | List of directories to look in for dependencies to use during capture. |
| <code><a href="#projen.polaris.FilesConfiguration.property.libraryFiles">libraryFiles</a></code> | <code>string[]</code> | List of file dependencies to use during capture. |
| <code><a href="#projen.polaris.FilesConfiguration.property.webappArchives">webappArchives</a></code> | <code><a href="#projen.polaris.WebappArchiveConfiguration">WebappArchiveConfiguration</a>[]</code> | Specifies information about which web-application archives should be captured. |

---

##### `emitMinifiedJs`<sup>Optional</sup> <a name="emitMinifiedJs" id="projen.polaris.FilesConfiguration.property.emitMinifiedJs"></a>

```typescript
public readonly emitMinifiedJs: boolean;
```

- *Type:* boolean

Specifies whether to enable capture of minified JavaScript files.

---

##### `excludeGlob`<sup>Optional</sup> <a name="excludeGlob" id="projen.polaris.FilesConfiguration.property.excludeGlob"></a>

```typescript
public readonly excludeGlob: string;
```

- *Type:* string

Glob pattern that specifies the set of source files to exclude from capture.

Note that any include glob patterns and regular expressions are processed prior to handling exclude glob patterns and regular expressions.

---

##### `excludeRegex`<sup>Optional</sup> <a name="excludeRegex" id="projen.polaris.FilesConfiguration.property.excludeRegex"></a>

```typescript
public readonly excludeRegex: string;
```

- *Type:* string

Regular expression that specifies the set of source files to exclude from capture.

Note that any include glob patterns and regular expressions are processed prior to handling exclude glob patterns and regular expressions.

---

##### `includeDirs`<sup>Optional</sup> <a name="includeDirs" id="projen.polaris.FilesConfiguration.property.includeDirs"></a>

```typescript
public readonly includeDirs: string[];
```

- *Type:* string[]

List of directory basenames to include for capture, which would normally have been excluded.

By default, directories named "vendor" or "node_modules" are excluded, as are directories whose names begin with "."

---

##### `includeGlob`<sup>Optional</sup> <a name="includeGlob" id="projen.polaris.FilesConfiguration.property.includeGlob"></a>

```typescript
public readonly includeGlob: string;
```

- *Type:* string

Glob pattern that specifies the set of source files to capture.

---

##### `includeListFile`<sup>Optional</sup> <a name="includeListFile" id="projen.polaris.FilesConfiguration.property.includeListFile"></a>

```typescript
public readonly includeListFile: string;
```

- *Type:* string

File containing the paths of source files to capture, one per line.

Include and exclude glob patterns and regular expressions are applied to determine which of these files are actually captured.

---

##### `includeRegex`<sup>Optional</sup> <a name="includeRegex" id="projen.polaris.FilesConfiguration.property.includeRegex"></a>

```typescript
public readonly includeRegex: string;
```

- *Type:* string

Regular expression that specifies the set of source files to capture.

---

##### `javaVersion`<sup>Optional</sup> <a name="javaVersion" id="projen.polaris.FilesConfiguration.property.javaVersion"></a>

```typescript
public readonly javaVersion: string;
```

- *Type:* string

Specifies the Java version to use when parsing and emitting Java source files with buildless capture.

---

##### `libraryDirs`<sup>Optional</sup> <a name="libraryDirs" id="projen.polaris.FilesConfiguration.property.libraryDirs"></a>

```typescript
public readonly libraryDirs: string[];
```

- *Type:* string[]

List of directories to look in for dependencies to use during capture.

---

##### `libraryFiles`<sup>Optional</sup> <a name="libraryFiles" id="projen.polaris.FilesConfiguration.property.libraryFiles"></a>

```typescript
public readonly libraryFiles: string[];
```

- *Type:* string[]

List of file dependencies to use during capture.

---

##### `webappArchives`<sup>Optional</sup> <a name="webappArchives" id="projen.polaris.FilesConfiguration.property.webappArchives"></a>

```typescript
public readonly webappArchives: WebappArchiveConfiguration[];
```

- *Type:* <a href="#projen.polaris.WebappArchiveConfiguration">WebappArchiveConfiguration</a>[]

Specifies information about which web-application archives should be captured.

By default all webapp archives are captured.

---

### ImportScmConfiguration <a name="ImportScmConfiguration" id="projen.polaris.ImportScmConfiguration"></a>

#### Initializer <a name="Initializer" id="projen.polaris.ImportScmConfiguration.Initializer"></a>

```typescript
import { polaris } from 'projen'

const importScmConfiguration: polaris.ImportScmConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.ImportScmConfiguration.property.covImportScmArgs">covImportScmArgs</a></code> | <code>string[]</code> | Additional arguments to pass to cov-import-scm following capture. |
| <code><a href="#projen.polaris.ImportScmConfiguration.property.filenameRegex">filenameRegex</a></code> | <code>string</code> | Regular expression that specifies the set of files for which to import change information. |
| <code><a href="#projen.polaris.ImportScmConfiguration.property.msDelay">msDelay</a></code> | <code>number</code> | Delay in milliseconds between calls to the underlying SCM. |
| <code><a href="#projen.polaris.ImportScmConfiguration.property.scm">scm</a></code> | <code>string</code> | The name of the source control management system. |

---

##### `covImportScmArgs`<sup>Optional</sup> <a name="covImportScmArgs" id="projen.polaris.ImportScmConfiguration.property.covImportScmArgs"></a>

```typescript
public readonly covImportScmArgs: string[];
```

- *Type:* string[]

Additional arguments to pass to cov-import-scm following capture.

---

##### `filenameRegex`<sup>Optional</sup> <a name="filenameRegex" id="projen.polaris.ImportScmConfiguration.property.filenameRegex"></a>

```typescript
public readonly filenameRegex: string;
```

- *Type:* string

Regular expression that specifies the set of files for which to import change information.

---

##### `msDelay`<sup>Optional</sup> <a name="msDelay" id="projen.polaris.ImportScmConfiguration.property.msDelay"></a>

```typescript
public readonly msDelay: number;
```

- *Type:* number

Delay in milliseconds between calls to the underlying SCM.

---

##### `scm`<sup>Optional</sup> <a name="scm" id="projen.polaris.ImportScmConfiguration.property.scm"></a>

```typescript
public readonly scm: string;
```

- *Type:* string

The name of the source control management system.

---

### JobsConfiguration <a name="JobsConfiguration" id="projen.polaris.JobsConfiguration"></a>

#### Initializer <a name="Initializer" id="projen.polaris.JobsConfiguration.Initializer"></a>

```typescript
import { polaris } from 'projen'

const jobsConfiguration: polaris.JobsConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.JobsConfiguration.property.auto">auto</a></code> | <code>boolean</code> | If true, the number of analysis workers to run in parallel is based on the amount of memory and number of logical processors in the machine. |
| <code><a href="#projen.polaris.JobsConfiguration.property.count">count</a></code> | <code>number</code> | Number of analysis workers to run in parallel. |
| <code><a href="#projen.polaris.JobsConfiguration.property.max">max</a></code> | <code>number</code> | Maximum number of analysis worker to run in parallel, subject to limits on the amount of memory and number of logical processors in the machine. |
| <code><a href="#projen.polaris.JobsConfiguration.property.overrideWorkerLimit">overrideWorkerLimit</a></code> | <code>boolean</code> | Allows the number of analysis workers to exceed the recommended value. |

---

##### `auto`<sup>Optional</sup> <a name="auto" id="projen.polaris.JobsConfiguration.property.auto"></a>

```typescript
public readonly auto: boolean;
```

- *Type:* boolean

If true, the number of analysis workers to run in parallel is based on the amount of memory and number of logical processors in the machine.

This is the default for a non-Flexnet license. This key is mutually exclusive with the "count" and "max" keys.

---

##### `count`<sup>Optional</sup> <a name="count" id="projen.polaris.JobsConfiguration.property.count"></a>

```typescript
public readonly count: number;
```

- *Type:* number

Number of analysis workers to run in parallel.

This key is mutually exclusive with the "auto" and "max" keys.

---

##### `max`<sup>Optional</sup> <a name="max" id="projen.polaris.JobsConfiguration.property.max"></a>

```typescript
public readonly max: number;
```

- *Type:* number

Maximum number of analysis worker to run in parallel, subject to limits on the amount of memory and number of logical processors in the machine.

A value of 8 is the default for a Flexnet license. This key is mutually exclusive with the "auto" and "count" keys.

---

##### `overrideWorkerLimit`<sup>Optional</sup> <a name="overrideWorkerLimit" id="projen.polaris.JobsConfiguration.property.overrideWorkerLimit"></a>

```typescript
public readonly overrideWorkerLimit: boolean;
```

- *Type:* boolean

Allows the number of analysis workers to exceed the recommended value.

This key may only be used with the "count" key.

---

### LanguagesConfiguration <a name="LanguagesConfiguration" id="projen.polaris.LanguagesConfiguration"></a>

#### Initializer <a name="Initializer" id="projen.polaris.LanguagesConfiguration.Initializer"></a>

```typescript
import { polaris } from 'projen'

const languagesConfiguration: polaris.LanguagesConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.LanguagesConfiguration.property.exclude">exclude</a></code> | <code><a href="#projen.polaris.LanguagesConfigurationExclude">LanguagesConfigurationExclude</a>[]</code> | Specifies the languages for which the source code should be excluded in the capture. |
| <code><a href="#projen.polaris.LanguagesConfiguration.property.include">include</a></code> | <code><a href="#projen.polaris.LanguagesConfigurationInclude">LanguagesConfigurationInclude</a>[]</code> | Specifies the languages for which the source code should be included in the capture. |

---

##### `exclude`<sup>Optional</sup> <a name="exclude" id="projen.polaris.LanguagesConfiguration.property.exclude"></a>

```typescript
public readonly exclude: LanguagesConfigurationExclude[];
```

- *Type:* <a href="#projen.polaris.LanguagesConfigurationExclude">LanguagesConfigurationExclude</a>[]

Specifies the languages for which the source code should be excluded in the capture.

This key is mutually exclusive with the "include" key.

---

##### `include`<sup>Optional</sup> <a name="include" id="projen.polaris.LanguagesConfiguration.property.include"></a>

```typescript
public readonly include: LanguagesConfigurationInclude[];
```

- *Type:* <a href="#projen.polaris.LanguagesConfigurationInclude">LanguagesConfigurationInclude</a>[]

Specifies the languages for which the source code should be included in the capture.

This key is mutually exclusive with the "exclude" key.

---

### ParallelTranslateConfiguration <a name="ParallelTranslateConfiguration" id="projen.polaris.ParallelTranslateConfiguration"></a>

#### Initializer <a name="Initializer" id="projen.polaris.ParallelTranslateConfiguration.Initializer"></a>

```typescript
import { polaris } from 'projen'

const parallelTranslateConfiguration: polaris.ParallelTranslateConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.ParallelTranslateConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Specifies whether cov-translate parallelization should be enabled. |
| <code><a href="#projen.polaris.ParallelTranslateConfiguration.property.processes">processes</a></code> | <code>number</code> | Specifies the number of cov-emit processes to be run in parallel by cov-translate when multiple files are seen on a single native compiler invocation. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.polaris.ParallelTranslateConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Specifies whether cov-translate parallelization should be enabled.

---

##### `processes`<sup>Optional</sup> <a name="processes" id="projen.polaris.ParallelTranslateConfiguration.property.processes"></a>

```typescript
public readonly processes: number;
```

- *Type:* number

Specifies the number of cov-emit processes to be run in parallel by cov-translate when multiple files are seen on a single native compiler invocation.

A value of 0 will use the number of logical processors in the machine.

---

### ParseWarningsConfiguration <a name="ParseWarningsConfiguration" id="projen.polaris.ParseWarningsConfiguration"></a>

#### Initializer <a name="Initializer" id="projen.polaris.ParseWarningsConfiguration.Initializer"></a>

```typescript
import { polaris } from 'projen'

const parseWarningsConfiguration: polaris.ParseWarningsConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.ParseWarningsConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Enables parse warnings, recovery warnings, and semantic warnings that are produced by the cov-build command so that they appear as defects in Coverity Connect. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.polaris.ParseWarningsConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Enables parse warnings, recovery warnings, and semantic warnings that are produced by the cov-build command so that they appear as defects in Coverity Connect.

By default, this is disabled if the aggressiveness level is low, and enabled if the aggressiveness level is medium or high.

---

### PolarisCoverityGoOptions <a name="PolarisCoverityGoOptions" id="projen.polaris.PolarisCoverityGoOptions"></a>

Options for `PolarisCoverityGo`.

Extends base options with Go-specific defaults.

#### Initializer <a name="Initializer" id="projen.polaris.PolarisCoverityGoOptions.Initializer"></a>

```typescript
import { polaris } from 'projen'

const polarisCoverityGoOptions: polaris.PolarisCoverityGoOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.PolarisCoverityGoOptions.property.commit">commit</a></code> | <code><a href="#projen.polaris.CommitConfiguration">CommitConfiguration</a></code> | *No description.* |
| <code><a href="#projen.polaris.PolarisCoverityGoOptions.property.analyze">analyze</a></code> | <code><a href="#projen.polaris.AnalysisConfiguration">AnalysisConfiguration</a></code> | *No description.* |
| <code><a href="#projen.polaris.PolarisCoverityGoOptions.property.caching">caching</a></code> | <code><a href="#projen.polaris.CachingConfiguration">CachingConfiguration</a></code> | *No description.* |
| <code><a href="#projen.polaris.PolarisCoverityGoOptions.property.capture">capture</a></code> | <code><a href="#projen.polaris.CaptureConfiguration">CaptureConfiguration</a></code> | *No description.* |
| <code><a href="#projen.polaris.PolarisCoverityGoOptions.property.version">version</a></code> | <code>number</code> | Specifies the version of the configuration file in use. |

---

##### `commit`<sup>Required</sup> <a name="commit" id="projen.polaris.PolarisCoverityGoOptions.property.commit"></a>

```typescript
public readonly commit: CommitConfiguration;
```

- *Type:* <a href="#projen.polaris.CommitConfiguration">CommitConfiguration</a>

---

##### `analyze`<sup>Optional</sup> <a name="analyze" id="projen.polaris.PolarisCoverityGoOptions.property.analyze"></a>

```typescript
public readonly analyze: AnalysisConfiguration;
```

- *Type:* <a href="#projen.polaris.AnalysisConfiguration">AnalysisConfiguration</a>

---

##### `caching`<sup>Optional</sup> <a name="caching" id="projen.polaris.PolarisCoverityGoOptions.property.caching"></a>

```typescript
public readonly caching: CachingConfiguration;
```

- *Type:* <a href="#projen.polaris.CachingConfiguration">CachingConfiguration</a>

---

##### `capture`<sup>Optional</sup> <a name="capture" id="projen.polaris.PolarisCoverityGoOptions.property.capture"></a>

```typescript
public readonly capture: CaptureConfiguration;
```

- *Type:* <a href="#projen.polaris.CaptureConfiguration">CaptureConfiguration</a>

---

##### `version`<sup>Optional</sup> <a name="version" id="projen.polaris.PolarisCoverityGoOptions.property.version"></a>

```typescript
public readonly version: number;
```

- *Type:* number

Specifies the version of the configuration file in use.

---

### PolarisCoverityJavaOptions <a name="PolarisCoverityJavaOptions" id="projen.polaris.PolarisCoverityJavaOptions"></a>

Options for `PolarisCoverityJava`.

Extends base options with Java-specific defaults.

#### Initializer <a name="Initializer" id="projen.polaris.PolarisCoverityJavaOptions.Initializer"></a>

```typescript
import { polaris } from 'projen'

const polarisCoverityJavaOptions: polaris.PolarisCoverityJavaOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.PolarisCoverityJavaOptions.property.commit">commit</a></code> | <code><a href="#projen.polaris.CommitConfiguration">CommitConfiguration</a></code> | *No description.* |
| <code><a href="#projen.polaris.PolarisCoverityJavaOptions.property.analyze">analyze</a></code> | <code><a href="#projen.polaris.AnalysisConfiguration">AnalysisConfiguration</a></code> | *No description.* |
| <code><a href="#projen.polaris.PolarisCoverityJavaOptions.property.caching">caching</a></code> | <code><a href="#projen.polaris.CachingConfiguration">CachingConfiguration</a></code> | *No description.* |
| <code><a href="#projen.polaris.PolarisCoverityJavaOptions.property.capture">capture</a></code> | <code><a href="#projen.polaris.CaptureConfiguration">CaptureConfiguration</a></code> | *No description.* |
| <code><a href="#projen.polaris.PolarisCoverityJavaOptions.property.version">version</a></code> | <code>number</code> | Specifies the version of the configuration file in use. |

---

##### `commit`<sup>Required</sup> <a name="commit" id="projen.polaris.PolarisCoverityJavaOptions.property.commit"></a>

```typescript
public readonly commit: CommitConfiguration;
```

- *Type:* <a href="#projen.polaris.CommitConfiguration">CommitConfiguration</a>

---

##### `analyze`<sup>Optional</sup> <a name="analyze" id="projen.polaris.PolarisCoverityJavaOptions.property.analyze"></a>

```typescript
public readonly analyze: AnalysisConfiguration;
```

- *Type:* <a href="#projen.polaris.AnalysisConfiguration">AnalysisConfiguration</a>

---

##### `caching`<sup>Optional</sup> <a name="caching" id="projen.polaris.PolarisCoverityJavaOptions.property.caching"></a>

```typescript
public readonly caching: CachingConfiguration;
```

- *Type:* <a href="#projen.polaris.CachingConfiguration">CachingConfiguration</a>

---

##### `capture`<sup>Optional</sup> <a name="capture" id="projen.polaris.PolarisCoverityJavaOptions.property.capture"></a>

```typescript
public readonly capture: CaptureConfiguration;
```

- *Type:* <a href="#projen.polaris.CaptureConfiguration">CaptureConfiguration</a>

---

##### `version`<sup>Optional</sup> <a name="version" id="projen.polaris.PolarisCoverityJavaOptions.property.version"></a>

```typescript
public readonly version: number;
```

- *Type:* number

Specifies the version of the configuration file in use.

---

### PolarisCoverityJavascriptOptions <a name="PolarisCoverityJavascriptOptions" id="projen.polaris.PolarisCoverityJavascriptOptions"></a>

Options for `PolarisCoverityJavascript`.

Extends base options with JavaScript/TypeScript-specific defaults.

#### Initializer <a name="Initializer" id="projen.polaris.PolarisCoverityJavascriptOptions.Initializer"></a>

```typescript
import { polaris } from 'projen'

const polarisCoverityJavascriptOptions: polaris.PolarisCoverityJavascriptOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.PolarisCoverityJavascriptOptions.property.commit">commit</a></code> | <code><a href="#projen.polaris.CommitConfiguration">CommitConfiguration</a></code> | *No description.* |
| <code><a href="#projen.polaris.PolarisCoverityJavascriptOptions.property.analyze">analyze</a></code> | <code><a href="#projen.polaris.AnalysisConfiguration">AnalysisConfiguration</a></code> | *No description.* |
| <code><a href="#projen.polaris.PolarisCoverityJavascriptOptions.property.caching">caching</a></code> | <code><a href="#projen.polaris.CachingConfiguration">CachingConfiguration</a></code> | *No description.* |
| <code><a href="#projen.polaris.PolarisCoverityJavascriptOptions.property.capture">capture</a></code> | <code><a href="#projen.polaris.CaptureConfiguration">CaptureConfiguration</a></code> | *No description.* |
| <code><a href="#projen.polaris.PolarisCoverityJavascriptOptions.property.version">version</a></code> | <code>number</code> | Specifies the version of the configuration file in use. |

---

##### `commit`<sup>Required</sup> <a name="commit" id="projen.polaris.PolarisCoverityJavascriptOptions.property.commit"></a>

```typescript
public readonly commit: CommitConfiguration;
```

- *Type:* <a href="#projen.polaris.CommitConfiguration">CommitConfiguration</a>

---

##### `analyze`<sup>Optional</sup> <a name="analyze" id="projen.polaris.PolarisCoverityJavascriptOptions.property.analyze"></a>

```typescript
public readonly analyze: AnalysisConfiguration;
```

- *Type:* <a href="#projen.polaris.AnalysisConfiguration">AnalysisConfiguration</a>

---

##### `caching`<sup>Optional</sup> <a name="caching" id="projen.polaris.PolarisCoverityJavascriptOptions.property.caching"></a>

```typescript
public readonly caching: CachingConfiguration;
```

- *Type:* <a href="#projen.polaris.CachingConfiguration">CachingConfiguration</a>

---

##### `capture`<sup>Optional</sup> <a name="capture" id="projen.polaris.PolarisCoverityJavascriptOptions.property.capture"></a>

```typescript
public readonly capture: CaptureConfiguration;
```

- *Type:* <a href="#projen.polaris.CaptureConfiguration">CaptureConfiguration</a>

---

##### `version`<sup>Optional</sup> <a name="version" id="projen.polaris.PolarisCoverityJavascriptOptions.property.version"></a>

```typescript
public readonly version: number;
```

- *Type:* number

Specifies the version of the configuration file in use.

---

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
| <code><a href="#projen.polaris.PolarisCoverityOptions.property.commit">commit</a></code> | <code><a href="#projen.polaris.CommitConfiguration">CommitConfiguration</a></code> | *No description.* |
| <code><a href="#projen.polaris.PolarisCoverityOptions.property.analyze">analyze</a></code> | <code><a href="#projen.polaris.AnalysisConfiguration">AnalysisConfiguration</a></code> | *No description.* |
| <code><a href="#projen.polaris.PolarisCoverityOptions.property.caching">caching</a></code> | <code><a href="#projen.polaris.CachingConfiguration">CachingConfiguration</a></code> | *No description.* |
| <code><a href="#projen.polaris.PolarisCoverityOptions.property.capture">capture</a></code> | <code><a href="#projen.polaris.CaptureConfiguration">CaptureConfiguration</a></code> | *No description.* |
| <code><a href="#projen.polaris.PolarisCoverityOptions.property.version">version</a></code> | <code>number</code> | Specifies the version of the configuration file in use. |

---

##### `commit`<sup>Required</sup> <a name="commit" id="projen.polaris.PolarisCoverityOptions.property.commit"></a>

```typescript
public readonly commit: CommitConfiguration;
```

- *Type:* <a href="#projen.polaris.CommitConfiguration">CommitConfiguration</a>

---

##### `analyze`<sup>Optional</sup> <a name="analyze" id="projen.polaris.PolarisCoverityOptions.property.analyze"></a>

```typescript
public readonly analyze: AnalysisConfiguration;
```

- *Type:* <a href="#projen.polaris.AnalysisConfiguration">AnalysisConfiguration</a>

---

##### `caching`<sup>Optional</sup> <a name="caching" id="projen.polaris.PolarisCoverityOptions.property.caching"></a>

```typescript
public readonly caching: CachingConfiguration;
```

- *Type:* <a href="#projen.polaris.CachingConfiguration">CachingConfiguration</a>

---

##### `capture`<sup>Optional</sup> <a name="capture" id="projen.polaris.PolarisCoverityOptions.property.capture"></a>

```typescript
public readonly capture: CaptureConfiguration;
```

- *Type:* <a href="#projen.polaris.CaptureConfiguration">CaptureConfiguration</a>

---

##### `version`<sup>Optional</sup> <a name="version" id="projen.polaris.PolarisCoverityOptions.property.version"></a>

```typescript
public readonly version: number;
```

- *Type:* number

Specifies the version of the configuration file in use.

---

### PolarisCoveritySchema <a name="PolarisCoveritySchema" id="projen.polaris.PolarisCoveritySchema"></a>

#### Initializer <a name="Initializer" id="projen.polaris.PolarisCoveritySchema.Initializer"></a>

```typescript
import { polaris } from 'projen'

const polarisCoveritySchema: polaris.PolarisCoveritySchema = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.PolarisCoveritySchema.property.commit">commit</a></code> | <code><a href="#projen.polaris.CommitConfiguration">CommitConfiguration</a></code> | *No description.* |
| <code><a href="#projen.polaris.PolarisCoveritySchema.property.analyze">analyze</a></code> | <code><a href="#projen.polaris.AnalysisConfiguration">AnalysisConfiguration</a></code> | *No description.* |
| <code><a href="#projen.polaris.PolarisCoveritySchema.property.caching">caching</a></code> | <code><a href="#projen.polaris.CachingConfiguration">CachingConfiguration</a></code> | *No description.* |
| <code><a href="#projen.polaris.PolarisCoveritySchema.property.capture">capture</a></code> | <code><a href="#projen.polaris.CaptureConfiguration">CaptureConfiguration</a></code> | *No description.* |
| <code><a href="#projen.polaris.PolarisCoveritySchema.property.version">version</a></code> | <code>number</code> | Specifies the version of the configuration file in use. |

---

##### `commit`<sup>Required</sup> <a name="commit" id="projen.polaris.PolarisCoveritySchema.property.commit"></a>

```typescript
public readonly commit: CommitConfiguration;
```

- *Type:* <a href="#projen.polaris.CommitConfiguration">CommitConfiguration</a>

---

##### `analyze`<sup>Optional</sup> <a name="analyze" id="projen.polaris.PolarisCoveritySchema.property.analyze"></a>

```typescript
public readonly analyze: AnalysisConfiguration;
```

- *Type:* <a href="#projen.polaris.AnalysisConfiguration">AnalysisConfiguration</a>

---

##### `caching`<sup>Optional</sup> <a name="caching" id="projen.polaris.PolarisCoveritySchema.property.caching"></a>

```typescript
public readonly caching: CachingConfiguration;
```

- *Type:* <a href="#projen.polaris.CachingConfiguration">CachingConfiguration</a>

---

##### `capture`<sup>Optional</sup> <a name="capture" id="projen.polaris.PolarisCoveritySchema.property.capture"></a>

```typescript
public readonly capture: CaptureConfiguration;
```

- *Type:* <a href="#projen.polaris.CaptureConfiguration">CaptureConfiguration</a>

---

##### `version`<sup>Optional</sup> <a name="version" id="projen.polaris.PolarisCoveritySchema.property.version"></a>

```typescript
public readonly version: number;
```

- *Type:* number

Specifies the version of the configuration file in use.

---

### ResolvedCodingStandardConfiguration <a name="ResolvedCodingStandardConfiguration" id="projen.polaris.ResolvedCodingStandardConfiguration"></a>

#### Initializer <a name="Initializer" id="projen.polaris.ResolvedCodingStandardConfiguration.Initializer"></a>

```typescript
import { polaris } from 'projen'

const resolvedCodingStandardConfiguration: polaris.ResolvedCodingStandardConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.ResolvedCodingStandardConfiguration.property.title">title</a></code> | <code>string</code> | Name of this code compliance configuration. |
| <code><a href="#projen.polaris.ResolvedCodingStandardConfiguration.property.deviations">deviations</a></code> | <code><a href="#projen.polaris.CodingStandardDeviation">CodingStandardDeviation</a>[]</code> | List of deviations for this standard. |
| <code><a href="#projen.polaris.ResolvedCodingStandardConfiguration.property.version">version</a></code> | <code>string</code> | Version of this code compliance configuration. |

---

##### `title`<sup>Required</sup> <a name="title" id="projen.polaris.ResolvedCodingStandardConfiguration.property.title"></a>

```typescript
public readonly title: string;
```

- *Type:* string

Name of this code compliance configuration.

---

##### `deviations`<sup>Optional</sup> <a name="deviations" id="projen.polaris.ResolvedCodingStandardConfiguration.property.deviations"></a>

```typescript
public readonly deviations: CodingStandardDeviation[];
```

- *Type:* <a href="#projen.polaris.CodingStandardDeviation">CodingStandardDeviation</a>[]

List of deviations for this standard.

---

##### `version`<sup>Optional</sup> <a name="version" id="projen.polaris.ResolvedCodingStandardConfiguration.property.version"></a>

```typescript
public readonly version: string;
```

- *Type:* string

Version of this code compliance configuration.

---

### SigmaConfiguration <a name="SigmaConfiguration" id="projen.polaris.SigmaConfiguration"></a>

#### Initializer <a name="Initializer" id="projen.polaris.SigmaConfiguration.Initializer"></a>

```typescript
import { polaris } from 'projen'

const sigmaConfiguration: polaris.SigmaConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.SigmaConfiguration.property.enableCheckSet">enableCheckSet</a></code> | <code><a href="#projen.polaris.SigmaConfigurationEnableCheckSet">SigmaConfigurationEnableCheckSet</a>[]</code> | List of check sets to enable. |
| <code><a href="#projen.polaris.SigmaConfiguration.property.maliciousUrlPatternsFile">maliciousUrlPatternsFile</a></code> | <code>string[]</code> | List of files containing malicious URL patterns. |

---

##### `enableCheckSet`<sup>Optional</sup> <a name="enableCheckSet" id="projen.polaris.SigmaConfiguration.property.enableCheckSet"></a>

```typescript
public readonly enableCheckSet: SigmaConfigurationEnableCheckSet[];
```

- *Type:* <a href="#projen.polaris.SigmaConfigurationEnableCheckSet">SigmaConfigurationEnableCheckSet</a>[]

List of check sets to enable.

---

##### `maliciousUrlPatternsFile`<sup>Optional</sup> <a name="maliciousUrlPatternsFile" id="projen.polaris.SigmaConfiguration.property.maliciousUrlPatternsFile"></a>

```typescript
public readonly maliciousUrlPatternsFile: string[];
```

- *Type:* string[]

List of files containing malicious URL patterns.

---

### SnapshotConfiguration <a name="SnapshotConfiguration" id="projen.polaris.SnapshotConfiguration"></a>

#### Initializer <a name="Initializer" id="projen.polaris.SnapshotConfiguration.Initializer"></a>

```typescript
import { polaris } from 'projen'

const snapshotConfiguration: polaris.SnapshotConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.SnapshotConfiguration.property.date">date</a></code> | <code>string</code> | Date and time of snapshot to use for comparison report. |
| <code><a href="#projen.polaris.SnapshotConfiguration.property.id">id</a></code> | <code>number</code> | ID of snapshot to use for comparison report. |
| <code><a href="#projen.polaris.SnapshotConfiguration.property.reference">reference</a></code> | <code>any</code> | One of "idir", "latest", or "scm". |

---

##### `date`<sup>Optional</sup> <a name="date" id="projen.polaris.SnapshotConfiguration.property.date"></a>

```typescript
public readonly date: string;
```

- *Type:* string

Date and time of snapshot to use for comparison report.

The value should be of the form "YYYY-MM-DDThh:mm:ss" where date and time are separated by a "T", optionally followed by a time zone specification consisting of either "Z" denoting UTC or a "+" or "-" character followed by colon-separated hours and minutes east of UTC. Example: "2023-12-27T13:21:05-08:00". If no time zone is specified, the local time zone is assumed. This key is mutually exclusive with the "id" and "reference" keys.

---

##### `id`<sup>Optional</sup> <a name="id" id="projen.polaris.SnapshotConfiguration.property.id"></a>

```typescript
public readonly id: number;
```

- *Type:* number

ID of snapshot to use for comparison report.

This key is mutually exclusive with the "date" and "reference" keys.

---

##### `reference`<sup>Optional</sup> <a name="reference" id="projen.polaris.SnapshotConfiguration.property.reference"></a>

```typescript
public readonly reference: any;
```

- *Type:* any

One of "idir", "latest", or "scm".

"idir" will use the snapshot created closest to, but not after, the creation date of the intermediate directory. "latest" will use the snapshot with the latest code-version date in the specified stream. "scm" will query the SCM to determine the version that was most recently checked out or updated, and then use the closest snapshot. This key is mutually exclusive with the "date" and "id" keys.

---

### SpecificCodingStandardConfiguration <a name="SpecificCodingStandardConfiguration" id="projen.polaris.SpecificCodingStandardConfiguration"></a>

#### Initializer <a name="Initializer" id="projen.polaris.SpecificCodingStandardConfiguration.Initializer"></a>

```typescript
import { polaris } from 'projen'

const specificCodingStandardConfiguration: polaris.SpecificCodingStandardConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.SpecificCodingStandardConfiguration.property.config">config</a></code> | <code><a href="#projen.polaris.ResolvedCodingStandardConfiguration">ResolvedCodingStandardConfiguration</a></code> | This key specifies the coding standard configuration for the given coding standard. |
| <code><a href="#projen.polaris.SpecificCodingStandardConfiguration.property.file">file</a></code> | <code>string</code> | This specifies the filename containing the configuration to use for the corresponding coding standard. |
| <code><a href="#projen.polaris.SpecificCodingStandardConfiguration.property.preCanned">preCanned</a></code> | <code>string</code> | This key specifies the name of a "pre-canned" coding standard configuration to use. |

---

##### `config`<sup>Optional</sup> <a name="config" id="projen.polaris.SpecificCodingStandardConfiguration.property.config"></a>

```typescript
public readonly config: ResolvedCodingStandardConfiguration;
```

- *Type:* <a href="#projen.polaris.ResolvedCodingStandardConfiguration">ResolvedCodingStandardConfiguration</a>

This key specifies the coding standard configuration for the given coding standard.

The actual type of this key is specific to the particular coding standard. This key is mutually exclusive with the "file" key. A temporary configuration file will be generated containing the in-line configuration and then passed to "cov-analyze" using the "--coding-standard-config <config_file>" option.

---

##### `file`<sup>Optional</sup> <a name="file" id="projen.polaris.SpecificCodingStandardConfiguration.property.file"></a>

```typescript
public readonly file: string;
```

- *Type:* string

This specifies the filename containing the configuration to use for the corresponding coding standard.

This key is mutually exclusive with the "config" key.

---

##### `preCanned`<sup>Optional</sup> <a name="preCanned" id="projen.polaris.SpecificCodingStandardConfiguration.property.preCanned"></a>

```typescript
public readonly preCanned: string;
```

- *Type:* string

This key specifies the name of a "pre-canned" coding standard configuration to use.

The available pre-canned coding standard configurations depend on the coding standard in question. Refer to Coverity's documentation for details on the "pre-canned" configurations.

---

### WebappArchiveConfiguration <a name="WebappArchiveConfiguration" id="projen.polaris.WebappArchiveConfiguration"></a>

#### Initializer <a name="Initializer" id="projen.polaris.WebappArchiveConfiguration.Initializer"></a>

```typescript
import { polaris } from 'projen'

const webappArchiveConfiguration: polaris.WebappArchiveConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.polaris.WebappArchiveConfiguration.property.path">path</a></code> | <code>string</code> | Specifies the path to the web application archive file or path to the directory containing the exploded web application. |
| <code><a href="#projen.polaris.WebappArchiveConfiguration.property.validateWebapp">validateWebapp</a></code> | <code>boolean</code> | Indicates whether the web-app should be checked to see if it is valid during capture. |

---

##### `path`<sup>Optional</sup> <a name="path" id="projen.polaris.WebappArchiveConfiguration.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* string

Specifies the path to the web application archive file or path to the directory containing the exploded web application.

---

##### `validateWebapp`<sup>Optional</sup> <a name="validateWebapp" id="projen.polaris.WebappArchiveConfiguration.property.validateWebapp"></a>

```typescript
public readonly validateWebapp: boolean;
```

- *Type:* boolean

Indicates whether the web-app should be checked to see if it is valid during capture.

The validation check checks that there is a "/WEB-INF/web.xml" file and that > 20% of classes for the web application were captured.

---



## Enums <a name="Enums" id="Enums"></a>

### AnalysisConfigurationAggressivenessLevel <a name="AnalysisConfigurationAggressivenessLevel" id="projen.polaris.AnalysisConfigurationAggressivenessLevel"></a>

Specifies the aggressiveness level for the analysis.

The aggressiveness level causes the analysis to make more or less aggressive assumptions during the analysis where the higher the aggressiveness level the more defects are reported.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.polaris.AnalysisConfigurationAggressivenessLevel.LOW">LOW</a></code> | low. |
| <code><a href="#projen.polaris.AnalysisConfigurationAggressivenessLevel.MEDIUM">MEDIUM</a></code> | medium. |
| <code><a href="#projen.polaris.AnalysisConfigurationAggressivenessLevel.HIGH">HIGH</a></code> | high. |

---

##### `LOW` <a name="LOW" id="projen.polaris.AnalysisConfigurationAggressivenessLevel.LOW"></a>

low.

---


##### `MEDIUM` <a name="MEDIUM" id="projen.polaris.AnalysisConfigurationAggressivenessLevel.MEDIUM"></a>

medium.

---


##### `HIGH` <a name="HIGH" id="projen.polaris.AnalysisConfigurationAggressivenessLevel.HIGH"></a>

high.

---


### AnalysisConfigurationLocation <a name="AnalysisConfigurationLocation" id="projen.polaris.AnalysisConfigurationLocation"></a>

Specifies whether the analysis should be done locally, in Coverity Connect, or in Software Risk Manager.

The possible values are as follows: connect - Run the analysis in the Coverity Connect job farm; srm - Run the analysis in the Software Risk Manager job farm; local - Run the analysis locally

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.polaris.AnalysisConfigurationLocation.LOCAL">LOCAL</a></code> | local. |
| <code><a href="#projen.polaris.AnalysisConfigurationLocation.CONNECT">CONNECT</a></code> | connect. |
| <code><a href="#projen.polaris.AnalysisConfigurationLocation.SRM">SRM</a></code> | srm. |

---

##### `LOCAL` <a name="LOCAL" id="projen.polaris.AnalysisConfigurationLocation.LOCAL"></a>

local.

---


##### `CONNECT` <a name="CONNECT" id="projen.polaris.AnalysisConfigurationLocation.CONNECT"></a>

connect.

---


##### `SRM` <a name="SRM" id="projen.polaris.AnalysisConfigurationLocation.SRM"></a>

srm.

---


### AnalysisConfigurationMode <a name="AnalysisConfigurationMode" id="projen.polaris.AnalysisConfigurationMode"></a>

Analysis mode: "pfi" (perfect fidelity incremental) for complete analysis;

or "hfi" (high fidelity incremental) for analysis of only specific files specified by analyze.files settings, omitting any other files which may have been incidentally captured by the build. An "hfi" analysis can be faster but may produce results which are incomplete or inconsistent, due to the lack of context, and should be used only when speed is more important than accuracy.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.polaris.AnalysisConfigurationMode.HFI">HFI</a></code> | hfi. |
| <code><a href="#projen.polaris.AnalysisConfigurationMode.PFI">PFI</a></code> | pfi. |

---

##### `HFI` <a name="HFI" id="projen.polaris.AnalysisConfigurationMode.HFI"></a>

hfi.

---


##### `PFI` <a name="PFI" id="projen.polaris.AnalysisConfigurationMode.PFI"></a>

pfi.

---


### AnalyzeConnectConfigurationUploadArtifacts <a name="AnalyzeConnectConfigurationUploadArtifacts" id="projen.polaris.AnalyzeConnectConfigurationUploadArtifacts"></a>

Artifacts to upload following analysis when the analysis location is Connect.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.polaris.AnalyzeConnectConfigurationUploadArtifacts.ALL">ALL</a></code> | All. |
| <code><a href="#projen.polaris.AnalyzeConnectConfigurationUploadArtifacts.LOGS_ONLY">LOGS_ONLY</a></code> | LogsOnly. |
| <code><a href="#projen.polaris.AnalyzeConnectConfigurationUploadArtifacts.NONE">NONE</a></code> | None. |
| <code><a href="#projen.polaris.AnalyzeConnectConfigurationUploadArtifacts.ON_FAILURE">ON_FAILURE</a></code> | OnFailure. |

---

##### `ALL` <a name="ALL" id="projen.polaris.AnalyzeConnectConfigurationUploadArtifacts.ALL"></a>

All.

---


##### `LOGS_ONLY` <a name="LOGS_ONLY" id="projen.polaris.AnalyzeConnectConfigurationUploadArtifacts.LOGS_ONLY"></a>

LogsOnly.

---


##### `NONE` <a name="NONE" id="projen.polaris.AnalyzeConnectConfigurationUploadArtifacts.NONE"></a>

None.

---


##### `ON_FAILURE` <a name="ON_FAILURE" id="projen.polaris.AnalyzeConnectConfigurationUploadArtifacts.ON_FAILURE"></a>

OnFailure.

---


### CheckerConfigurationWebappSecurityAggressivenessLevel <a name="CheckerConfigurationWebappSecurityAggressivenessLevel" id="projen.polaris.CheckerConfigurationWebappSecurityAggressivenessLevel"></a>

Sets the web application checkers aggressiveness level.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.polaris.CheckerConfigurationWebappSecurityAggressivenessLevel.LOW">LOW</a></code> | low. |
| <code><a href="#projen.polaris.CheckerConfigurationWebappSecurityAggressivenessLevel.MEDIUM">MEDIUM</a></code> | medium. |
| <code><a href="#projen.polaris.CheckerConfigurationWebappSecurityAggressivenessLevel.HIGH">HIGH</a></code> | high. |

---

##### `LOW` <a name="LOW" id="projen.polaris.CheckerConfigurationWebappSecurityAggressivenessLevel.LOW"></a>

low.

---


##### `MEDIUM` <a name="MEDIUM" id="projen.polaris.CheckerConfigurationWebappSecurityAggressivenessLevel.MEDIUM"></a>

medium.

---


##### `HIGH` <a name="HIGH" id="projen.polaris.CheckerConfigurationWebappSecurityAggressivenessLevel.HIGH"></a>

high.

---


### CommitConfigurationConnectOnNewCert <a name="CommitConfigurationConnectOnNewCert" id="projen.polaris.CommitConfigurationConnectOnNewCert"></a>

Indicates whether to trust self-signed certificates presented by Coverity Connect that are not currently trusted.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.polaris.CommitConfigurationConnectOnNewCert.TRUST">TRUST</a></code> | trust. |
| <code><a href="#projen.polaris.CommitConfigurationConnectOnNewCert.DISTRUST">DISTRUST</a></code> | distrust. |

---

##### `TRUST` <a name="TRUST" id="projen.polaris.CommitConfigurationConnectOnNewCert.TRUST"></a>

trust.

---


##### `DISTRUST` <a name="DISTRUST" id="projen.polaris.CommitConfigurationConnectOnNewCert.DISTRUST"></a>

distrust.

---


### CommitConfigurationConnectScm <a name="CommitConfigurationConnectScm" id="projen.polaris.CommitConfigurationConnectScm"></a>

The name of the source control management system.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.polaris.CommitConfigurationConnectScm.ADS">ADS</a></code> | ads. |
| <code><a href="#projen.polaris.CommitConfigurationConnectScm.CLEARCASE">CLEARCASE</a></code> | clearcase. |
| <code><a href="#projen.polaris.CommitConfigurationConnectScm.CVS">CVS</a></code> | cvs. |
| <code><a href="#projen.polaris.CommitConfigurationConnectScm.GIT">GIT</a></code> | git. |
| <code><a href="#projen.polaris.CommitConfigurationConnectScm.HG">HG</a></code> | hg. |
| <code><a href="#projen.polaris.CommitConfigurationConnectScm.PERFORCE">PERFORCE</a></code> | perforce. |
| <code><a href="#projen.polaris.CommitConfigurationConnectScm.PLASTIC">PLASTIC</a></code> | plastic. |
| <code><a href="#projen.polaris.CommitConfigurationConnectScm.PLASTIC_HYPHEN_DISTRIBUTED">PLASTIC_HYPHEN_DISTRIBUTED</a></code> | plastic-distributed. |
| <code><a href="#projen.polaris.CommitConfigurationConnectScm.SVN">SVN</a></code> | svn. |
| <code><a href="#projen.polaris.CommitConfigurationConnectScm.TFS">TFS</a></code> | tfs. |

---

##### `ADS` <a name="ADS" id="projen.polaris.CommitConfigurationConnectScm.ADS"></a>

ads.

---


##### `CLEARCASE` <a name="CLEARCASE" id="projen.polaris.CommitConfigurationConnectScm.CLEARCASE"></a>

clearcase.

---


##### `CVS` <a name="CVS" id="projen.polaris.CommitConfigurationConnectScm.CVS"></a>

cvs.

---


##### `GIT` <a name="GIT" id="projen.polaris.CommitConfigurationConnectScm.GIT"></a>

git.

---


##### `HG` <a name="HG" id="projen.polaris.CommitConfigurationConnectScm.HG"></a>

hg.

---


##### `PERFORCE` <a name="PERFORCE" id="projen.polaris.CommitConfigurationConnectScm.PERFORCE"></a>

perforce.

---


##### `PLASTIC` <a name="PLASTIC" id="projen.polaris.CommitConfigurationConnectScm.PLASTIC"></a>

plastic.

---


##### `PLASTIC_HYPHEN_DISTRIBUTED` <a name="PLASTIC_HYPHEN_DISTRIBUTED" id="projen.polaris.CommitConfigurationConnectScm.PLASTIC_HYPHEN_DISTRIBUTED"></a>

plastic-distributed.

---


##### `SVN` <a name="SVN" id="projen.polaris.CommitConfigurationConnectScm.SVN"></a>

svn.

---


##### `TFS` <a name="TFS" id="projen.polaris.CommitConfigurationConnectScm.TFS"></a>

tfs.

---


### CommitConfigurationConnectUploadArtifacts <a name="CommitConfigurationConnectUploadArtifacts" id="projen.polaris.CommitConfigurationConnectUploadArtifacts"></a>

Artifacts to upload following analysis when the analysis location is Connect.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.polaris.CommitConfigurationConnectUploadArtifacts.ALL">ALL</a></code> | All. |
| <code><a href="#projen.polaris.CommitConfigurationConnectUploadArtifacts.LOGS_ONLY">LOGS_ONLY</a></code> | LogsOnly. |
| <code><a href="#projen.polaris.CommitConfigurationConnectUploadArtifacts.NONE">NONE</a></code> | None. |
| <code><a href="#projen.polaris.CommitConfigurationConnectUploadArtifacts.ON_FAILURE">ON_FAILURE</a></code> | OnFailure. |

---

##### `ALL` <a name="ALL" id="projen.polaris.CommitConfigurationConnectUploadArtifacts.ALL"></a>

All.

---


##### `LOGS_ONLY` <a name="LOGS_ONLY" id="projen.polaris.CommitConfigurationConnectUploadArtifacts.LOGS_ONLY"></a>

LogsOnly.

---


##### `NONE` <a name="NONE" id="projen.polaris.CommitConfigurationConnectUploadArtifacts.NONE"></a>

None.

---


##### `ON_FAILURE` <a name="ON_FAILURE" id="projen.polaris.CommitConfigurationConnectUploadArtifacts.ON_FAILURE"></a>

OnFailure.

---


### CommitConfigurationLocalFormat <a name="CommitConfigurationLocalFormat" id="projen.polaris.CommitConfigurationLocalFormat"></a>

Format in which to save defects.

Either "html" or "json".

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.polaris.CommitConfigurationLocalFormat.HTML">HTML</a></code> | html. |
| <code><a href="#projen.polaris.CommitConfigurationLocalFormat.JSON">JSON</a></code> | json. |

---

##### `HTML` <a name="HTML" id="projen.polaris.CommitConfigurationLocalFormat.HTML"></a>

html.

---


##### `JSON` <a name="JSON" id="projen.polaris.CommitConfigurationLocalFormat.JSON"></a>

json.

---


### DirectivesConfigurationConfigType <a name="DirectivesConfigurationConfigType" id="projen.polaris.DirectivesConfigurationConfigType"></a>

Must be the string "Coverity analysis configuration".

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.polaris.DirectivesConfigurationConfigType.COVERITY_ANALYSIS_CONFIGURATION">COVERITY_ANALYSIS_CONFIGURATION</a></code> | Coverity analysis configuration. |

---

##### `COVERITY_ANALYSIS_CONFIGURATION` <a name="COVERITY_ANALYSIS_CONFIGURATION" id="projen.polaris.DirectivesConfigurationConfigType.COVERITY_ANALYSIS_CONFIGURATION"></a>

Coverity analysis configuration.

---


### LanguagesConfigurationExclude <a name="LanguagesConfigurationExclude" id="projen.polaris.LanguagesConfigurationExclude"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.polaris.LanguagesConfigurationExclude.APEX">APEX</a></code> | apex. |
| <code><a href="#projen.polaris.LanguagesConfigurationExclude.C_HYPHEN_FAMILY">C_HYPHEN_FAMILY</a></code> | c-family. |
| <code><a href="#projen.polaris.LanguagesConfigurationExclude.CSHARP">CSHARP</a></code> | csharp. |
| <code><a href="#projen.polaris.LanguagesConfigurationExclude.DART">DART</a></code> | dart. |
| <code><a href="#projen.polaris.LanguagesConfigurationExclude.GO">GO</a></code> | go. |
| <code><a href="#projen.polaris.LanguagesConfigurationExclude.JAVA">JAVA</a></code> | java. |
| <code><a href="#projen.polaris.LanguagesConfigurationExclude.JAVASCRIPT">JAVASCRIPT</a></code> | javascript. |
| <code><a href="#projen.polaris.LanguagesConfigurationExclude.KOTLIN">KOTLIN</a></code> | kotlin. |
| <code><a href="#projen.polaris.LanguagesConfigurationExclude.PHP">PHP</a></code> | php. |
| <code><a href="#projen.polaris.LanguagesConfigurationExclude.PYTHON">PYTHON</a></code> | python. |
| <code><a href="#projen.polaris.LanguagesConfigurationExclude.RUBY">RUBY</a></code> | ruby. |
| <code><a href="#projen.polaris.LanguagesConfigurationExclude.SWIFT">SWIFT</a></code> | swift. |
| <code><a href="#projen.polaris.LanguagesConfigurationExclude.VB">VB</a></code> | vb. |
| <code><a href="#projen.polaris.LanguagesConfigurationExclude.CONFIGURATION">CONFIGURATION</a></code> | configuration. |

---

##### `APEX` <a name="APEX" id="projen.polaris.LanguagesConfigurationExclude.APEX"></a>

apex.

---


##### `C_HYPHEN_FAMILY` <a name="C_HYPHEN_FAMILY" id="projen.polaris.LanguagesConfigurationExclude.C_HYPHEN_FAMILY"></a>

c-family.

---


##### `CSHARP` <a name="CSHARP" id="projen.polaris.LanguagesConfigurationExclude.CSHARP"></a>

csharp.

---


##### `DART` <a name="DART" id="projen.polaris.LanguagesConfigurationExclude.DART"></a>

dart.

---


##### `GO` <a name="GO" id="projen.polaris.LanguagesConfigurationExclude.GO"></a>

go.

---


##### `JAVA` <a name="JAVA" id="projen.polaris.LanguagesConfigurationExclude.JAVA"></a>

java.

---


##### `JAVASCRIPT` <a name="JAVASCRIPT" id="projen.polaris.LanguagesConfigurationExclude.JAVASCRIPT"></a>

javascript.

---


##### `KOTLIN` <a name="KOTLIN" id="projen.polaris.LanguagesConfigurationExclude.KOTLIN"></a>

kotlin.

---


##### `PHP` <a name="PHP" id="projen.polaris.LanguagesConfigurationExclude.PHP"></a>

php.

---


##### `PYTHON` <a name="PYTHON" id="projen.polaris.LanguagesConfigurationExclude.PYTHON"></a>

python.

---


##### `RUBY` <a name="RUBY" id="projen.polaris.LanguagesConfigurationExclude.RUBY"></a>

ruby.

---


##### `SWIFT` <a name="SWIFT" id="projen.polaris.LanguagesConfigurationExclude.SWIFT"></a>

swift.

---


##### `VB` <a name="VB" id="projen.polaris.LanguagesConfigurationExclude.VB"></a>

vb.

---


##### `CONFIGURATION` <a name="CONFIGURATION" id="projen.polaris.LanguagesConfigurationExclude.CONFIGURATION"></a>

configuration.

---


### LanguagesConfigurationInclude <a name="LanguagesConfigurationInclude" id="projen.polaris.LanguagesConfigurationInclude"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.polaris.LanguagesConfigurationInclude.APEX">APEX</a></code> | apex. |
| <code><a href="#projen.polaris.LanguagesConfigurationInclude.C_HYPHEN_FAMILY">C_HYPHEN_FAMILY</a></code> | c-family. |
| <code><a href="#projen.polaris.LanguagesConfigurationInclude.CSHARP">CSHARP</a></code> | csharp. |
| <code><a href="#projen.polaris.LanguagesConfigurationInclude.DART">DART</a></code> | dart. |
| <code><a href="#projen.polaris.LanguagesConfigurationInclude.GO">GO</a></code> | go. |
| <code><a href="#projen.polaris.LanguagesConfigurationInclude.JAVA">JAVA</a></code> | java. |
| <code><a href="#projen.polaris.LanguagesConfigurationInclude.JAVASCRIPT">JAVASCRIPT</a></code> | javascript. |
| <code><a href="#projen.polaris.LanguagesConfigurationInclude.KOTLIN">KOTLIN</a></code> | kotlin. |
| <code><a href="#projen.polaris.LanguagesConfigurationInclude.PHP">PHP</a></code> | php. |
| <code><a href="#projen.polaris.LanguagesConfigurationInclude.PYTHON">PYTHON</a></code> | python. |
| <code><a href="#projen.polaris.LanguagesConfigurationInclude.RUBY">RUBY</a></code> | ruby. |
| <code><a href="#projen.polaris.LanguagesConfigurationInclude.SWIFT">SWIFT</a></code> | swift. |
| <code><a href="#projen.polaris.LanguagesConfigurationInclude.VB">VB</a></code> | vb. |
| <code><a href="#projen.polaris.LanguagesConfigurationInclude.CONFIGURATION">CONFIGURATION</a></code> | configuration. |

---

##### `APEX` <a name="APEX" id="projen.polaris.LanguagesConfigurationInclude.APEX"></a>

apex.

---


##### `C_HYPHEN_FAMILY` <a name="C_HYPHEN_FAMILY" id="projen.polaris.LanguagesConfigurationInclude.C_HYPHEN_FAMILY"></a>

c-family.

---


##### `CSHARP` <a name="CSHARP" id="projen.polaris.LanguagesConfigurationInclude.CSHARP"></a>

csharp.

---


##### `DART` <a name="DART" id="projen.polaris.LanguagesConfigurationInclude.DART"></a>

dart.

---


##### `GO` <a name="GO" id="projen.polaris.LanguagesConfigurationInclude.GO"></a>

go.

---


##### `JAVA` <a name="JAVA" id="projen.polaris.LanguagesConfigurationInclude.JAVA"></a>

java.

---


##### `JAVASCRIPT` <a name="JAVASCRIPT" id="projen.polaris.LanguagesConfigurationInclude.JAVASCRIPT"></a>

javascript.

---


##### `KOTLIN` <a name="KOTLIN" id="projen.polaris.LanguagesConfigurationInclude.KOTLIN"></a>

kotlin.

---


##### `PHP` <a name="PHP" id="projen.polaris.LanguagesConfigurationInclude.PHP"></a>

php.

---


##### `PYTHON` <a name="PYTHON" id="projen.polaris.LanguagesConfigurationInclude.PYTHON"></a>

python.

---


##### `RUBY` <a name="RUBY" id="projen.polaris.LanguagesConfigurationInclude.RUBY"></a>

ruby.

---


##### `SWIFT` <a name="SWIFT" id="projen.polaris.LanguagesConfigurationInclude.SWIFT"></a>

swift.

---


##### `VB` <a name="VB" id="projen.polaris.LanguagesConfigurationInclude.VB"></a>

vb.

---


##### `CONFIGURATION` <a name="CONFIGURATION" id="projen.polaris.LanguagesConfigurationInclude.CONFIGURATION"></a>

configuration.

---


### SigmaConfigurationEnableCheckSet <a name="SigmaConfigurationEnableCheckSet" id="projen.polaris.SigmaConfigurationEnableCheckSet"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.polaris.SigmaConfigurationEnableCheckSet.ALL">ALL</a></code> | all. |
| <code><a href="#projen.polaris.SigmaConfigurationEnableCheckSet.CIS">CIS</a></code> | cis. |
| <code><a href="#projen.polaris.SigmaConfigurationEnableCheckSet.DEFAULT">DEFAULT</a></code> | default. |
| <code><a href="#projen.polaris.SigmaConfigurationEnableCheckSet.EMPTY">EMPTY</a></code> | empty. |

---

##### `ALL` <a name="ALL" id="projen.polaris.SigmaConfigurationEnableCheckSet.ALL"></a>

all.

---


##### `CIS` <a name="CIS" id="projen.polaris.SigmaConfigurationEnableCheckSet.CIS"></a>

cis.

---


##### `DEFAULT` <a name="DEFAULT" id="projen.polaris.SigmaConfigurationEnableCheckSet.DEFAULT"></a>

default.

---


##### `EMPTY` <a name="EMPTY" id="projen.polaris.SigmaConfigurationEnableCheckSet.EMPTY"></a>

empty.

---

