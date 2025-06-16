# `javascript.biome` Submodule <a name="`javascript.biome` Submodule" id="projen.javascript.biome"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### Biome <a name="Biome" id="projen.javascript.biome.Biome"></a>

#### Initializers <a name="Initializers" id="projen.javascript.biome.Biome.Initializer"></a>

```typescript
import { javascript } from 'projen'

new javascript.biome.Biome(project: NodeProject, options?: BiomeOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.Biome.Initializer.parameter.project">project</a></code> | <code>projen.javascript.NodeProject</code> | *No description.* |
| <code><a href="#projen.javascript.biome.Biome.Initializer.parameter.options">options</a></code> | <code>projen.javascript.biome.BiomeOptions</code> | *No description.* |

---

##### `project`<sup>Required</sup> <a name="project" id="projen.javascript.biome.Biome.Initializer.parameter.project"></a>

- *Type:* projen.javascript.NodeProject

---

##### `options`<sup>Optional</sup> <a name="options" id="projen.javascript.biome.Biome.Initializer.parameter.options"></a>

- *Type:* projen.javascript.biome.BiomeOptions

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.javascript.biome.Biome.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen.javascript.biome.Biome.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen.javascript.biome.Biome.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen.javascript.biome.Biome.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |
| <code><a href="#projen.javascript.biome.Biome.addLintPattern">addLintPattern</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="projen.javascript.biome.Biome.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `postSynthesize` <a name="postSynthesize" id="projen.javascript.biome.Biome.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen.javascript.biome.Biome.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `synthesize` <a name="synthesize" id="projen.javascript.biome.Biome.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

##### `addLintPattern` <a name="addLintPattern" id="projen.javascript.biome.Biome.addLintPattern"></a>

```typescript
public addLintPattern(pattern: string): void
```

###### `pattern`<sup>Required</sup> <a name="pattern" id="projen.javascript.biome.Biome.addLintPattern.parameter.pattern"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.javascript.biome.Biome.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen.javascript.biome.Biome.isComponent">isComponent</a></code> | Test whether the given construct is a component. |
| <code><a href="#projen.javascript.biome.Biome.of">of</a></code> | *No description.* |

---

##### `isConstruct` <a name="isConstruct" id="projen.javascript.biome.Biome.isConstruct"></a>

```typescript
import { javascript } from 'projen'

javascript.biome.Biome.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="projen.javascript.biome.Biome.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen.javascript.biome.Biome.isComponent"></a>

```typescript
import { javascript } from 'projen'

javascript.biome.Biome.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen.javascript.biome.Biome.isComponent.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="projen.javascript.biome.Biome.of"></a>

```typescript
import { javascript } from 'projen'

javascript.biome.Biome.of(project: Project)
```

###### `project`<sup>Required</sup> <a name="project" id="projen.javascript.biome.Biome.of.parameter.project"></a>

- *Type:* projen.Project

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.Biome.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen.javascript.biome.Biome.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.javascript.biome.Biome.property.file">file</a></code> | <code>projen.JsonFile</code> | Biome configuration file content. |
| <code><a href="#projen.javascript.biome.Biome.property.task">task</a></code> | <code>projen.Task</code> | Biome task. |

---

##### `node`<sup>Required</sup> <a name="node" id="projen.javascript.biome.Biome.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen.javascript.biome.Biome.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---

##### `file`<sup>Required</sup> <a name="file" id="projen.javascript.biome.Biome.property.file"></a>

```typescript
public readonly file: JsonFile;
```

- *Type:* projen.JsonFile

Biome configuration file content.

---

##### `task`<sup>Required</sup> <a name="task" id="projen.javascript.biome.Biome.property.task"></a>

```typescript
public readonly task: Task;
```

- *Type:* projen.Task

Biome task.

---


## Structs <a name="Structs" id="Structs"></a>

### BiomeOptions <a name="BiomeOptions" id="projen.javascript.biome.BiomeOptions"></a>

#### Initializer <a name="Initializer" id="projen.javascript.biome.BiomeOptions.Initializer"></a>

```typescript
import { javascript } from 'projen'

const biomeOptions: javascript.biome.BiomeOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.BiomeOptions.property.biomeConfig">biomeConfig</a></code> | <code>projen.javascript.biome.biome_config.IConfiguration</code> | Full Biome configuration. |
| <code><a href="#projen.javascript.biome.BiomeOptions.property.formatter">formatter</a></code> | <code>boolean</code> | Enable code formatter. |
| <code><a href="#projen.javascript.biome.BiomeOptions.property.linter">linter</a></code> | <code>boolean</code> | Enable linting. |
| <code><a href="#projen.javascript.biome.BiomeOptions.property.mergeArraysInConfiguration">mergeArraysInConfiguration</a></code> | <code>boolean</code> | Should arrays be merged or overwritten when creating Biome configuration. |
| <code><a href="#projen.javascript.biome.BiomeOptions.property.organizeImports">organizeImports</a></code> | <code>boolean</code> | Enable import sorting/organizing. |
| <code><a href="#projen.javascript.biome.BiomeOptions.property.version">version</a></code> | <code>string</code> | Version of Biome to use. |

---

##### `biomeConfig`<sup>Optional</sup> <a name="biomeConfig" id="projen.javascript.biome.BiomeOptions.property.biomeConfig"></a>

```typescript
public readonly biomeConfig: IConfiguration;
```

- *Type:* projen.javascript.biome.biome_config.IConfiguration

Full Biome configuration.

Note that this configuration dictates the final outcome if value is set.

---

*Example*

```typescript
if linter is disabled on main level, it can be enabled on fullConfiguration.formatter.enabled.
```


##### `formatter`<sup>Optional</sup> <a name="formatter" id="projen.javascript.biome.BiomeOptions.property.formatter"></a>

```typescript
public readonly formatter: boolean;
```

- *Type:* boolean
- *Default:* false

Enable code formatter.

Replaces mainly Prettier

---

##### `linter`<sup>Optional</sup> <a name="linter" id="projen.javascript.biome.BiomeOptions.property.linter"></a>

```typescript
public readonly linter: boolean;
```

- *Type:* boolean
- *Default:* true

Enable linting.

Replaces Eslint.

---

##### `mergeArraysInConfiguration`<sup>Optional</sup> <a name="mergeArraysInConfiguration" id="projen.javascript.biome.BiomeOptions.property.mergeArraysInConfiguration"></a>

```typescript
public readonly mergeArraysInConfiguration: boolean;
```

- *Type:* boolean
- *Default:* true

Should arrays be merged or overwritten when creating Biome configuration.

By default arrays are merged and duplicate values are removed

---

##### `organizeImports`<sup>Optional</sup> <a name="organizeImports" id="projen.javascript.biome.BiomeOptions.property.organizeImports"></a>

```typescript
public readonly organizeImports: boolean;
```

- *Type:* boolean
- *Default:* false

Enable import sorting/organizing.

Replaces mainly Prettier

---

##### `version`<sup>Optional</sup> <a name="version" id="projen.javascript.biome.BiomeOptions.property.version"></a>

```typescript
public readonly version: string;
```

- *Type:* string
- *Default:* "^1"

Version of Biome to use.

---



