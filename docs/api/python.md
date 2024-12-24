# `python` Submodule <a name="`python` Submodule" id="projen.python"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### Pip <a name="Pip" id="projen.python.Pip"></a>

- *Implements:* <a href="#projen.python.IPythonDeps">IPythonDeps</a>

Manages dependencies using a requirements.txt file and the pip CLI tool.

#### Initializers <a name="Initializers" id="projen.python.Pip.Initializer"></a>

```typescript
import { python } from 'projen'

new python.Pip(project: Project, _options?: PipOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.Pip.Initializer.parameter.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.python.Pip.Initializer.parameter._options">_options</a></code> | <code><a href="#projen.python.PipOptions">PipOptions</a></code> | *No description.* |

---

##### `project`<sup>Required</sup> <a name="project" id="projen.python.Pip.Initializer.parameter.project"></a>

- *Type:* projen.Project

---

##### `_options`<sup>Optional</sup> <a name="_options" id="projen.python.Pip.Initializer.parameter._options"></a>

- *Type:* <a href="#projen.python.PipOptions">PipOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.python.Pip.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen.python.Pip.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen.python.Pip.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen.python.Pip.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |
| <code><a href="#projen.python.Pip.addDependency">addDependency</a></code> | Adds a runtime dependency. |
| <code><a href="#projen.python.Pip.addDevDependency">addDevDependency</a></code> | Adds a dev dependency. |
| <code><a href="#projen.python.Pip.installDependencies">installDependencies</a></code> | Installs dependencies (called during post-synthesis). |

---

##### `toString` <a name="toString" id="projen.python.Pip.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `postSynthesize` <a name="postSynthesize" id="projen.python.Pip.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen.python.Pip.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `synthesize` <a name="synthesize" id="projen.python.Pip.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

##### `addDependency` <a name="addDependency" id="projen.python.Pip.addDependency"></a>

```typescript
public addDependency(spec: string): void
```

Adds a runtime dependency.

###### `spec`<sup>Required</sup> <a name="spec" id="projen.python.Pip.addDependency.parameter.spec"></a>

- *Type:* string

Format `<module>@<semver>`.

---

##### `addDevDependency` <a name="addDevDependency" id="projen.python.Pip.addDevDependency"></a>

```typescript
public addDevDependency(spec: string): void
```

Adds a dev dependency.

###### `spec`<sup>Required</sup> <a name="spec" id="projen.python.Pip.addDevDependency.parameter.spec"></a>

- *Type:* string

Format `<module>@<semver>`.

---

##### `installDependencies` <a name="installDependencies" id="projen.python.Pip.installDependencies"></a>

```typescript
public installDependencies(): void
```

Installs dependencies (called during post-synthesis).

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.python.Pip.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen.python.Pip.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="projen.python.Pip.isConstruct"></a>

```typescript
import { python } from 'projen'

python.Pip.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="projen.python.Pip.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen.python.Pip.isComponent"></a>

```typescript
import { python } from 'projen'

python.Pip.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen.python.Pip.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.Pip.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen.python.Pip.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.python.Pip.property.installCiTask">installCiTask</a></code> | <code>projen.Task</code> | A task that installs and updates dependencies. |

---

##### `node`<sup>Required</sup> <a name="node" id="projen.python.Pip.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen.python.Pip.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---

##### `installCiTask`<sup>Required</sup> <a name="installCiTask" id="projen.python.Pip.property.installCiTask"></a>

```typescript
public readonly installCiTask: Task;
```

- *Type:* projen.Task

A task that installs and updates dependencies.

---


### Poetry <a name="Poetry" id="projen.python.Poetry"></a>

- *Implements:* <a href="#projen.python.IPythonDeps">IPythonDeps</a>, <a href="#projen.python.IPythonEnv">IPythonEnv</a>, <a href="#projen.python.IPythonPackaging">IPythonPackaging</a>

Manage project dependencies, virtual environments, and packaging through the poetry CLI tool.

#### Initializers <a name="Initializers" id="projen.python.Poetry.Initializer"></a>

```typescript
import { python } from 'projen'

new python.Poetry(project: Project, options: PoetryOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.Poetry.Initializer.parameter.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.python.Poetry.Initializer.parameter.options">options</a></code> | <code><a href="#projen.python.PoetryOptions">PoetryOptions</a></code> | *No description.* |

---

##### `project`<sup>Required</sup> <a name="project" id="projen.python.Poetry.Initializer.parameter.project"></a>

- *Type:* projen.Project

---

##### `options`<sup>Required</sup> <a name="options" id="projen.python.Poetry.Initializer.parameter.options"></a>

- *Type:* <a href="#projen.python.PoetryOptions">PoetryOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.python.Poetry.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen.python.Poetry.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen.python.Poetry.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen.python.Poetry.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |
| <code><a href="#projen.python.Poetry.addDependency">addDependency</a></code> | Adds a runtime dependency. |
| <code><a href="#projen.python.Poetry.addDevDependency">addDevDependency</a></code> | Adds a dev dependency. |
| <code><a href="#projen.python.Poetry.installDependencies">installDependencies</a></code> | Installs dependencies (called during post-synthesis). |
| <code><a href="#projen.python.Poetry.setupEnvironment">setupEnvironment</a></code> | Initializes the virtual environment if it doesn't exist (called during post-synthesis). |

---

##### `toString` <a name="toString" id="projen.python.Poetry.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `postSynthesize` <a name="postSynthesize" id="projen.python.Poetry.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen.python.Poetry.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `synthesize` <a name="synthesize" id="projen.python.Poetry.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

##### `addDependency` <a name="addDependency" id="projen.python.Poetry.addDependency"></a>

```typescript
public addDependency(spec: string): void
```

Adds a runtime dependency.

###### `spec`<sup>Required</sup> <a name="spec" id="projen.python.Poetry.addDependency.parameter.spec"></a>

- *Type:* string

Format `<module>@<semver>`.

---

##### `addDevDependency` <a name="addDevDependency" id="projen.python.Poetry.addDevDependency"></a>

```typescript
public addDevDependency(spec: string): void
```

Adds a dev dependency.

###### `spec`<sup>Required</sup> <a name="spec" id="projen.python.Poetry.addDevDependency.parameter.spec"></a>

- *Type:* string

Format `<module>@<semver>`.

---

##### `installDependencies` <a name="installDependencies" id="projen.python.Poetry.installDependencies"></a>

```typescript
public installDependencies(): void
```

Installs dependencies (called during post-synthesis).

##### `setupEnvironment` <a name="setupEnvironment" id="projen.python.Poetry.setupEnvironment"></a>

```typescript
public setupEnvironment(): void
```

Initializes the virtual environment if it doesn't exist (called during post-synthesis).

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.python.Poetry.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen.python.Poetry.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="projen.python.Poetry.isConstruct"></a>

```typescript
import { python } from 'projen'

python.Poetry.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="projen.python.Poetry.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen.python.Poetry.isComponent"></a>

```typescript
import { python } from 'projen'

python.Poetry.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen.python.Poetry.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.Poetry.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen.python.Poetry.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.python.Poetry.property.installCiTask">installCiTask</a></code> | <code>projen.Task</code> | Task for installing dependencies according to the existing lockfile. |
| <code><a href="#projen.python.Poetry.property.installTask">installTask</a></code> | <code>projen.Task</code> | Task for updating the lockfile and installing project dependencies. |
| <code><a href="#projen.python.Poetry.property.publishTask">publishTask</a></code> | <code>projen.Task</code> | Task for publishing the package to a package repository. |
| <code><a href="#projen.python.Poetry.property.publishTestTask">publishTestTask</a></code> | <code>projen.Task</code> | Task for publishing the package to the Test PyPI repository for testing purposes. |

---

##### `node`<sup>Required</sup> <a name="node" id="projen.python.Poetry.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen.python.Poetry.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---

##### `installCiTask`<sup>Required</sup> <a name="installCiTask" id="projen.python.Poetry.property.installCiTask"></a>

```typescript
public readonly installCiTask: Task;
```

- *Type:* projen.Task

Task for installing dependencies according to the existing lockfile.

---

##### `installTask`<sup>Required</sup> <a name="installTask" id="projen.python.Poetry.property.installTask"></a>

```typescript
public readonly installTask: Task;
```

- *Type:* projen.Task

Task for updating the lockfile and installing project dependencies.

---

##### `publishTask`<sup>Required</sup> <a name="publishTask" id="projen.python.Poetry.property.publishTask"></a>

```typescript
public readonly publishTask: Task;
```

- *Type:* projen.Task

Task for publishing the package to a package repository.

---

##### `publishTestTask`<sup>Required</sup> <a name="publishTestTask" id="projen.python.Poetry.property.publishTestTask"></a>

```typescript
public readonly publishTestTask: Task;
```

- *Type:* projen.Task

Task for publishing the package to the Test PyPI repository for testing purposes.

---


### PoetryPyproject <a name="PoetryPyproject" id="projen.python.PoetryPyproject"></a>

Represents configuration of a pyproject.toml file for a Poetry project.

> [https://python-poetry.org/docs/pyproject/](https://python-poetry.org/docs/pyproject/)

#### Initializers <a name="Initializers" id="projen.python.PoetryPyproject.Initializer"></a>

```typescript
import { python } from 'projen'

new python.PoetryPyproject(project: Project, options: PoetryPyprojectOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.PoetryPyproject.Initializer.parameter.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.python.PoetryPyproject.Initializer.parameter.options">options</a></code> | <code><a href="#projen.python.PoetryPyprojectOptions">PoetryPyprojectOptions</a></code> | *No description.* |

---

##### `project`<sup>Required</sup> <a name="project" id="projen.python.PoetryPyproject.Initializer.parameter.project"></a>

- *Type:* projen.Project

---

##### `options`<sup>Required</sup> <a name="options" id="projen.python.PoetryPyproject.Initializer.parameter.options"></a>

- *Type:* <a href="#projen.python.PoetryPyprojectOptions">PoetryPyprojectOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.python.PoetryPyproject.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen.python.PoetryPyproject.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen.python.PoetryPyproject.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen.python.PoetryPyproject.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |

---

##### `toString` <a name="toString" id="projen.python.PoetryPyproject.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `postSynthesize` <a name="postSynthesize" id="projen.python.PoetryPyproject.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen.python.PoetryPyproject.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `synthesize` <a name="synthesize" id="projen.python.PoetryPyproject.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.python.PoetryPyproject.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen.python.PoetryPyproject.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="projen.python.PoetryPyproject.isConstruct"></a>

```typescript
import { python } from 'projen'

python.PoetryPyproject.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="projen.python.PoetryPyproject.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen.python.PoetryPyproject.isComponent"></a>

```typescript
import { python } from 'projen'

python.PoetryPyproject.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen.python.PoetryPyproject.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.PoetryPyproject.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen.python.PoetryPyproject.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.python.PoetryPyproject.property.file">file</a></code> | <code>projen.TomlFile</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="projen.python.PoetryPyproject.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen.python.PoetryPyproject.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---

##### `file`<sup>Required</sup> <a name="file" id="projen.python.PoetryPyproject.property.file"></a>

```typescript
public readonly file: TomlFile;
```

- *Type:* projen.TomlFile

---


### Projenrc <a name="Projenrc" id="projen.python.Projenrc"></a>

Allows writing projenrc files in python.

This will install `projen` as a Python dependency and will add a
`synth` task which will run `.projenrc.py`.

#### Initializers <a name="Initializers" id="projen.python.Projenrc.Initializer"></a>

```typescript
import { python } from 'projen'

new python.Projenrc(project: Project, options?: ProjenrcOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.Projenrc.Initializer.parameter.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.python.Projenrc.Initializer.parameter.options">options</a></code> | <code><a href="#projen.python.ProjenrcOptions">ProjenrcOptions</a></code> | *No description.* |

---

##### `project`<sup>Required</sup> <a name="project" id="projen.python.Projenrc.Initializer.parameter.project"></a>

- *Type:* projen.Project

---

##### `options`<sup>Optional</sup> <a name="options" id="projen.python.Projenrc.Initializer.parameter.options"></a>

- *Type:* <a href="#projen.python.ProjenrcOptions">ProjenrcOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.python.Projenrc.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen.python.Projenrc.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen.python.Projenrc.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen.python.Projenrc.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |

---

##### `toString` <a name="toString" id="projen.python.Projenrc.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `postSynthesize` <a name="postSynthesize" id="projen.python.Projenrc.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen.python.Projenrc.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `synthesize` <a name="synthesize" id="projen.python.Projenrc.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.python.Projenrc.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen.python.Projenrc.isComponent">isComponent</a></code> | Test whether the given construct is a component. |
| <code><a href="#projen.python.Projenrc.of">of</a></code> | Returns the `Projenrc` instance associated with a project or `undefined` if there is no Projenrc. |

---

##### `isConstruct` <a name="isConstruct" id="projen.python.Projenrc.isConstruct"></a>

```typescript
import { python } from 'projen'

python.Projenrc.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="projen.python.Projenrc.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen.python.Projenrc.isComponent"></a>

```typescript
import { python } from 'projen'

python.Projenrc.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen.python.Projenrc.isComponent.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="projen.python.Projenrc.of"></a>

```typescript
import { python } from 'projen'

python.Projenrc.of(project: Project)
```

Returns the `Projenrc` instance associated with a project or `undefined` if there is no Projenrc.

###### `project`<sup>Required</sup> <a name="project" id="projen.python.Projenrc.of.parameter.project"></a>

- *Type:* projen.Project

The project.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.Projenrc.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen.python.Projenrc.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.python.Projenrc.property.filePath">filePath</a></code> | <code>string</code> | The name of the projenrc file. |
| <code><a href="#projen.python.Projenrc.property.pythonExec">pythonExec</a></code> | <code>string</code> | Path to the python executable to use. |

---

##### `node`<sup>Required</sup> <a name="node" id="projen.python.Projenrc.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen.python.Projenrc.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---

##### `filePath`<sup>Required</sup> <a name="filePath" id="projen.python.Projenrc.property.filePath"></a>

```typescript
public readonly filePath: string;
```

- *Type:* string

The name of the projenrc file.

---

##### `pythonExec`<sup>Required</sup> <a name="pythonExec" id="projen.python.Projenrc.property.pythonExec"></a>

```typescript
public readonly pythonExec: string;
```

- *Type:* string

Path to the python executable to use.

---


### Pytest <a name="Pytest" id="projen.python.Pytest"></a>

#### Initializers <a name="Initializers" id="projen.python.Pytest.Initializer"></a>

```typescript
import { python } from 'projen'

new python.Pytest(project: Project, options?: PytestOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.Pytest.Initializer.parameter.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.python.Pytest.Initializer.parameter.options">options</a></code> | <code><a href="#projen.python.PytestOptions">PytestOptions</a></code> | *No description.* |

---

##### `project`<sup>Required</sup> <a name="project" id="projen.python.Pytest.Initializer.parameter.project"></a>

- *Type:* projen.Project

---

##### `options`<sup>Optional</sup> <a name="options" id="projen.python.Pytest.Initializer.parameter.options"></a>

- *Type:* <a href="#projen.python.PytestOptions">PytestOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.python.Pytest.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen.python.Pytest.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen.python.Pytest.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen.python.Pytest.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |

---

##### `toString` <a name="toString" id="projen.python.Pytest.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `postSynthesize` <a name="postSynthesize" id="projen.python.Pytest.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen.python.Pytest.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `synthesize` <a name="synthesize" id="projen.python.Pytest.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.python.Pytest.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen.python.Pytest.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="projen.python.Pytest.isConstruct"></a>

```typescript
import { python } from 'projen'

python.Pytest.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="projen.python.Pytest.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen.python.Pytest.isComponent"></a>

```typescript
import { python } from 'projen'

python.Pytest.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen.python.Pytest.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.Pytest.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen.python.Pytest.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.python.Pytest.property.testdir">testdir</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.Pytest.property.testMatch">testMatch</a></code> | <code>string[]</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="projen.python.Pytest.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen.python.Pytest.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---

##### ~~`testdir`~~<sup>Required</sup> <a name="testdir" id="projen.python.Pytest.property.testdir"></a>

- *Deprecated:* Use `sampleTestdir` on the project instead.

```typescript
public readonly testdir: string;
```

- *Type:* string

---

##### `testMatch`<sup>Required</sup> <a name="testMatch" id="projen.python.Pytest.property.testMatch"></a>

```typescript
public readonly testMatch: string[];
```

- *Type:* string[]

---


### PytestSample <a name="PytestSample" id="projen.python.PytestSample"></a>

Python test code sample.

#### Initializers <a name="Initializers" id="projen.python.PytestSample.Initializer"></a>

```typescript
import { python } from 'projen'

new python.PytestSample(project: Project, options: PytestSampleOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.PytestSample.Initializer.parameter.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.python.PytestSample.Initializer.parameter.options">options</a></code> | <code><a href="#projen.python.PytestSampleOptions">PytestSampleOptions</a></code> | *No description.* |

---

##### `project`<sup>Required</sup> <a name="project" id="projen.python.PytestSample.Initializer.parameter.project"></a>

- *Type:* projen.Project

---

##### `options`<sup>Required</sup> <a name="options" id="projen.python.PytestSample.Initializer.parameter.options"></a>

- *Type:* <a href="#projen.python.PytestSampleOptions">PytestSampleOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.python.PytestSample.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen.python.PytestSample.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen.python.PytestSample.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen.python.PytestSample.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |

---

##### `toString` <a name="toString" id="projen.python.PytestSample.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `postSynthesize` <a name="postSynthesize" id="projen.python.PytestSample.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen.python.PytestSample.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `synthesize` <a name="synthesize" id="projen.python.PytestSample.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.python.PytestSample.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen.python.PytestSample.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="projen.python.PytestSample.isConstruct"></a>

```typescript
import { python } from 'projen'

python.PytestSample.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="projen.python.PytestSample.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen.python.PytestSample.isComponent"></a>

```typescript
import { python } from 'projen'

python.PytestSample.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen.python.PytestSample.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.PytestSample.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen.python.PytestSample.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="projen.python.PytestSample.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen.python.PytestSample.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---


### PythonProject <a name="PythonProject" id="projen.python.PythonProject"></a>

Python project.

#### Initializers <a name="Initializers" id="projen.python.PythonProject.Initializer"></a>

```typescript
import { python } from 'projen'

new python.PythonProject(options: PythonProjectOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.PythonProject.Initializer.parameter.options">options</a></code> | <code><a href="#projen.python.PythonProjectOptions">PythonProjectOptions</a></code> | *No description.* |

---

##### `options`<sup>Required</sup> <a name="options" id="projen.python.PythonProject.Initializer.parameter.options"></a>

- *Type:* <a href="#projen.python.PythonProjectOptions">PythonProjectOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.python.PythonProject.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen.python.PythonProject.addExcludeFromCleanup">addExcludeFromCleanup</a></code> | Exclude the matching files from pre-synth cleanup. |
| <code><a href="#projen.python.PythonProject.addGitIgnore">addGitIgnore</a></code> | Adds a .gitignore pattern. |
| <code><a href="#projen.python.PythonProject.addPackageIgnore">addPackageIgnore</a></code> | Exclude these files from the bundled package. |
| <code><a href="#projen.python.PythonProject.addTask">addTask</a></code> | Adds a new task to this project. |
| <code><a href="#projen.python.PythonProject.addTip">addTip</a></code> | Prints a "tip" message during synthesis. |
| <code><a href="#projen.python.PythonProject.annotateGenerated">annotateGenerated</a></code> | Marks the provided file(s) as being generated. |
| <code><a href="#projen.python.PythonProject.postSynthesize">postSynthesize</a></code> | Called after all components are synthesized. |
| <code><a href="#projen.python.PythonProject.preSynthesize">preSynthesize</a></code> | Called before all components are synthesized. |
| <code><a href="#projen.python.PythonProject.removeTask">removeTask</a></code> | Removes a task from a project. |
| <code><a href="#projen.python.PythonProject.runTaskCommand">runTaskCommand</a></code> | Returns the shell command to execute in order to run a task. |
| <code><a href="#projen.python.PythonProject.synth">synth</a></code> | Synthesize all project files into `outdir`. |
| <code><a href="#projen.python.PythonProject.tryFindFile">tryFindFile</a></code> | Finds a file at the specified relative path within this project and all its subprojects. |
| <code><a href="#projen.python.PythonProject.tryFindJsonFile">tryFindJsonFile</a></code> | Finds a json file by name. |
| <code><a href="#projen.python.PythonProject.tryFindObjectFile">tryFindObjectFile</a></code> | Finds an object file (like JsonFile, YamlFile, etc.) by name. |
| <code><a href="#projen.python.PythonProject.tryRemoveFile">tryRemoveFile</a></code> | Finds a file at the specified relative path within this project and removes it. |
| <code><a href="#projen.python.PythonProject.addDependency">addDependency</a></code> | Adds a runtime dependency. |
| <code><a href="#projen.python.PythonProject.addDevDependency">addDevDependency</a></code> | Adds a dev dependency. |

---

##### `toString` <a name="toString" id="projen.python.PythonProject.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addExcludeFromCleanup` <a name="addExcludeFromCleanup" id="projen.python.PythonProject.addExcludeFromCleanup"></a>

```typescript
public addExcludeFromCleanup(globs: ...string[]): void
```

Exclude the matching files from pre-synth cleanup.

Can be used when, for example, some
source files include the projen marker and we don't want them to be erased during synth.

###### `globs`<sup>Required</sup> <a name="globs" id="projen.python.PythonProject.addExcludeFromCleanup.parameter.globs"></a>

- *Type:* ...string[]

The glob patterns to match.

---

##### `addGitIgnore` <a name="addGitIgnore" id="projen.python.PythonProject.addGitIgnore"></a>

```typescript
public addGitIgnore(pattern: string): void
```

Adds a .gitignore pattern.

###### `pattern`<sup>Required</sup> <a name="pattern" id="projen.python.PythonProject.addGitIgnore.parameter.pattern"></a>

- *Type:* string

The glob pattern to ignore.

---

##### `addPackageIgnore` <a name="addPackageIgnore" id="projen.python.PythonProject.addPackageIgnore"></a>

```typescript
public addPackageIgnore(_pattern: string): void
```

Exclude these files from the bundled package.

Implemented by project types based on the
packaging mechanism. For example, `NodeProject` delegates this to `.npmignore`.

###### `_pattern`<sup>Required</sup> <a name="_pattern" id="projen.python.PythonProject.addPackageIgnore.parameter._pattern"></a>

- *Type:* string

The glob pattern to exclude.

---

##### `addTask` <a name="addTask" id="projen.python.PythonProject.addTask"></a>

```typescript
public addTask(name: string, props?: TaskOptions): Task
```

Adds a new task to this project.

This will fail if the project already has
a task with this name.

###### `name`<sup>Required</sup> <a name="name" id="projen.python.PythonProject.addTask.parameter.name"></a>

- *Type:* string

The task name to add.

---

###### `props`<sup>Optional</sup> <a name="props" id="projen.python.PythonProject.addTask.parameter.props"></a>

- *Type:* projen.TaskOptions

Task properties.

---

##### ~~`addTip`~~ <a name="addTip" id="projen.python.PythonProject.addTip"></a>

```typescript
public addTip(message: string): void
```

Prints a "tip" message during synthesis.

###### `message`<sup>Required</sup> <a name="message" id="projen.python.PythonProject.addTip.parameter.message"></a>

- *Type:* string

The message.

---

##### `annotateGenerated` <a name="annotateGenerated" id="projen.python.PythonProject.annotateGenerated"></a>

```typescript
public annotateGenerated(glob: string): void
```

Marks the provided file(s) as being generated.

This is achieved using the
github-linguist attributes. Generated files do not count against the
repository statistics and language breakdown.

> [https://github.com/github/linguist/blob/master/docs/overrides.md](https://github.com/github/linguist/blob/master/docs/overrides.md)

###### `glob`<sup>Required</sup> <a name="glob" id="projen.python.PythonProject.annotateGenerated.parameter.glob"></a>

- *Type:* string

the glob pattern to match (could be a file path).

---

##### `postSynthesize` <a name="postSynthesize" id="projen.python.PythonProject.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after all components are synthesized.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen.python.PythonProject.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before all components are synthesized.

##### `removeTask` <a name="removeTask" id="projen.python.PythonProject.removeTask"></a>

```typescript
public removeTask(name: string): Task
```

Removes a task from a project.

###### `name`<sup>Required</sup> <a name="name" id="projen.python.PythonProject.removeTask.parameter.name"></a>

- *Type:* string

The name of the task to remove.

---

##### `runTaskCommand` <a name="runTaskCommand" id="projen.python.PythonProject.runTaskCommand"></a>

```typescript
public runTaskCommand(task: Task): string
```

Returns the shell command to execute in order to run a task.

By default, this is `npx projen@<version> <task>`

###### `task`<sup>Required</sup> <a name="task" id="projen.python.PythonProject.runTaskCommand.parameter.task"></a>

- *Type:* projen.Task

The task for which the command is required.

---

##### `synth` <a name="synth" id="projen.python.PythonProject.synth"></a>

```typescript
public synth(): void
```

Synthesize all project files into `outdir`.

1. Call "this.preSynthesize()"
2. Delete all generated files
3. Synthesize all subprojects
4. Synthesize all components of this project
5. Call "postSynthesize()" for all components of this project
6. Call "this.postSynthesize()"

##### `tryFindFile` <a name="tryFindFile" id="projen.python.PythonProject.tryFindFile"></a>

```typescript
public tryFindFile(filePath: string): FileBase
```

Finds a file at the specified relative path within this project and all its subprojects.

###### `filePath`<sup>Required</sup> <a name="filePath" id="projen.python.PythonProject.tryFindFile.parameter.filePath"></a>

- *Type:* string

The file path.

If this path is relative, it will be resolved
from the root of _this_ project.

---

##### ~~`tryFindJsonFile`~~ <a name="tryFindJsonFile" id="projen.python.PythonProject.tryFindJsonFile"></a>

```typescript
public tryFindJsonFile(filePath: string): JsonFile
```

Finds a json file by name.

###### `filePath`<sup>Required</sup> <a name="filePath" id="projen.python.PythonProject.tryFindJsonFile.parameter.filePath"></a>

- *Type:* string

The file path.

---

##### `tryFindObjectFile` <a name="tryFindObjectFile" id="projen.python.PythonProject.tryFindObjectFile"></a>

```typescript
public tryFindObjectFile(filePath: string): ObjectFile
```

Finds an object file (like JsonFile, YamlFile, etc.) by name.

###### `filePath`<sup>Required</sup> <a name="filePath" id="projen.python.PythonProject.tryFindObjectFile.parameter.filePath"></a>

- *Type:* string

The file path.

---

##### `tryRemoveFile` <a name="tryRemoveFile" id="projen.python.PythonProject.tryRemoveFile"></a>

```typescript
public tryRemoveFile(filePath: string): FileBase
```

Finds a file at the specified relative path within this project and removes it.

###### `filePath`<sup>Required</sup> <a name="filePath" id="projen.python.PythonProject.tryRemoveFile.parameter.filePath"></a>

- *Type:* string

The file path.

If this path is relative, it will be
resolved from the root of _this_ project.

---

##### `addDependency` <a name="addDependency" id="projen.python.PythonProject.addDependency"></a>

```typescript
public addDependency(spec: string): void
```

Adds a runtime dependency.

###### `spec`<sup>Required</sup> <a name="spec" id="projen.python.PythonProject.addDependency.parameter.spec"></a>

- *Type:* string

Format `<module>@<semver>`.

---

##### `addDevDependency` <a name="addDevDependency" id="projen.python.PythonProject.addDevDependency"></a>

```typescript
public addDevDependency(spec: string): void
```

Adds a dev dependency.

###### `spec`<sup>Required</sup> <a name="spec" id="projen.python.PythonProject.addDevDependency.parameter.spec"></a>

- *Type:* string

Format `<module>@<semver>`.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.python.PythonProject.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen.python.PythonProject.isProject">isProject</a></code> | Test whether the given construct is a project. |
| <code><a href="#projen.python.PythonProject.of">of</a></code> | Find the closest ancestor project for given construct. |

---

##### `isConstruct` <a name="isConstruct" id="projen.python.PythonProject.isConstruct"></a>

```typescript
import { python } from 'projen'

python.PythonProject.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="projen.python.PythonProject.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isProject` <a name="isProject" id="projen.python.PythonProject.isProject"></a>

```typescript
import { python } from 'projen'

python.PythonProject.isProject(x: any)
```

Test whether the given construct is a project.

###### `x`<sup>Required</sup> <a name="x" id="projen.python.PythonProject.isProject.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="projen.python.PythonProject.of"></a>

```typescript
import { python } from 'projen'

python.PythonProject.of(construct: IConstruct)
```

Find the closest ancestor project for given construct.

When given a project, this it the project itself.

###### `construct`<sup>Required</sup> <a name="construct" id="projen.python.PythonProject.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.PythonProject.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen.python.PythonProject.property.buildTask">buildTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#projen.python.PythonProject.property.commitGenerated">commitGenerated</a></code> | <code>boolean</code> | Whether to commit the managed files by default. |
| <code><a href="#projen.python.PythonProject.property.compileTask">compileTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#projen.python.PythonProject.property.components">components</a></code> | <code>projen.Component[]</code> | Returns all the components within this project. |
| <code><a href="#projen.python.PythonProject.property.deps">deps</a></code> | <code>projen.Dependencies</code> | Project dependencies. |
| <code><a href="#projen.python.PythonProject.property.ejected">ejected</a></code> | <code>boolean</code> | Whether or not the project is being ejected. |
| <code><a href="#projen.python.PythonProject.property.files">files</a></code> | <code>projen.FileBase[]</code> | All files in this project. |
| <code><a href="#projen.python.PythonProject.property.gitattributes">gitattributes</a></code> | <code>projen.GitAttributesFile</code> | The .gitattributes file for this repository. |
| <code><a href="#projen.python.PythonProject.property.gitignore">gitignore</a></code> | <code>projen.IgnoreFile</code> | .gitignore. |
| <code><a href="#projen.python.PythonProject.property.logger">logger</a></code> | <code>projen.Logger</code> | Logging utilities. |
| <code><a href="#projen.python.PythonProject.property.name">name</a></code> | <code>string</code> | Project name. |
| <code><a href="#projen.python.PythonProject.property.outdir">outdir</a></code> | <code>string</code> | Absolute output directory of this project. |
| <code><a href="#projen.python.PythonProject.property.packageTask">packageTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#projen.python.PythonProject.property.postCompileTask">postCompileTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#projen.python.PythonProject.property.preCompileTask">preCompileTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#projen.python.PythonProject.property.projectBuild">projectBuild</a></code> | <code>projen.ProjectBuild</code> | Manages the build process of the project. |
| <code><a href="#projen.python.PythonProject.property.projenCommand">projenCommand</a></code> | <code>string</code> | The command to use in order to run the projen CLI. |
| <code><a href="#projen.python.PythonProject.property.root">root</a></code> | <code>projen.Project</code> | The root project. |
| <code><a href="#projen.python.PythonProject.property.subprojects">subprojects</a></code> | <code>projen.Project[]</code> | Returns all the subprojects within this project. |
| <code><a href="#projen.python.PythonProject.property.tasks">tasks</a></code> | <code>projen.Tasks</code> | Project tasks. |
| <code><a href="#projen.python.PythonProject.property.testTask">testTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#projen.python.PythonProject.property.defaultTask">defaultTask</a></code> | <code>projen.Task</code> | This is the "default" task, the one that executes "projen". |
| <code><a href="#projen.python.PythonProject.property.initProject">initProject</a></code> | <code>projen.InitProject</code> | The options used when this project is bootstrapped via `projen new`. |
| <code><a href="#projen.python.PythonProject.property.parent">parent</a></code> | <code>projen.Project</code> | A parent project. |
| <code><a href="#projen.python.PythonProject.property.projectType">projectType</a></code> | <code>projen.ProjectType</code> | *No description.* |
| <code><a href="#projen.python.PythonProject.property.autoApprove">autoApprove</a></code> | <code>projen.github.AutoApprove</code> | Auto approve set up for this project. |
| <code><a href="#projen.python.PythonProject.property.devContainer">devContainer</a></code> | <code>projen.vscode.DevContainer</code> | Access for .devcontainer.json (used for GitHub Codespaces). |
| <code><a href="#projen.python.PythonProject.property.github">github</a></code> | <code>projen.github.GitHub</code> | Access all github components. |
| <code><a href="#projen.python.PythonProject.property.gitpod">gitpod</a></code> | <code>projen.Gitpod</code> | Access for Gitpod. |
| <code><a href="#projen.python.PythonProject.property.vscode">vscode</a></code> | <code>projen.vscode.VsCode</code> | Access all VSCode components. |
| <code><a href="#projen.python.PythonProject.property.depsManager">depsManager</a></code> | <code><a href="#projen.python.IPythonDeps">IPythonDeps</a></code> | API for managing dependencies. |
| <code><a href="#projen.python.PythonProject.property.envManager">envManager</a></code> | <code><a href="#projen.python.IPythonEnv">IPythonEnv</a></code> | API for mangaging the Python runtime environment. |
| <code><a href="#projen.python.PythonProject.property.moduleName">moduleName</a></code> | <code>string</code> | Python module name (the project name, with any hyphens or periods replaced with underscores). |
| <code><a href="#projen.python.PythonProject.property.sampleTestdir">sampleTestdir</a></code> | <code>string</code> | Directory where sample tests are located. |
| <code><a href="#projen.python.PythonProject.property.version">version</a></code> | <code>string</code> | Version of the package for distribution (should follow semver). |
| <code><a href="#projen.python.PythonProject.property.packagingManager">packagingManager</a></code> | <code><a href="#projen.python.IPythonPackaging">IPythonPackaging</a></code> | API for managing packaging the project as a library. |
| <code><a href="#projen.python.PythonProject.property.pytest">pytest</a></code> | <code><a href="#projen.python.Pytest">Pytest</a></code> | Pytest component. |

---

##### `node`<sup>Required</sup> <a name="node" id="projen.python.PythonProject.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `buildTask`<sup>Required</sup> <a name="buildTask" id="projen.python.PythonProject.property.buildTask"></a>

```typescript
public readonly buildTask: Task;
```

- *Type:* projen.Task

---

##### `commitGenerated`<sup>Required</sup> <a name="commitGenerated" id="projen.python.PythonProject.property.commitGenerated"></a>

```typescript
public readonly commitGenerated: boolean;
```

- *Type:* boolean

Whether to commit the managed files by default.

---

##### `compileTask`<sup>Required</sup> <a name="compileTask" id="projen.python.PythonProject.property.compileTask"></a>

```typescript
public readonly compileTask: Task;
```

- *Type:* projen.Task

---

##### `components`<sup>Required</sup> <a name="components" id="projen.python.PythonProject.property.components"></a>

```typescript
public readonly components: Component[];
```

- *Type:* projen.Component[]

Returns all the components within this project.

---

##### `deps`<sup>Required</sup> <a name="deps" id="projen.python.PythonProject.property.deps"></a>

```typescript
public readonly deps: Dependencies;
```

- *Type:* projen.Dependencies

Project dependencies.

---

##### `ejected`<sup>Required</sup> <a name="ejected" id="projen.python.PythonProject.property.ejected"></a>

```typescript
public readonly ejected: boolean;
```

- *Type:* boolean

Whether or not the project is being ejected.

---

##### `files`<sup>Required</sup> <a name="files" id="projen.python.PythonProject.property.files"></a>

```typescript
public readonly files: FileBase[];
```

- *Type:* projen.FileBase[]

All files in this project.

---

##### `gitattributes`<sup>Required</sup> <a name="gitattributes" id="projen.python.PythonProject.property.gitattributes"></a>

```typescript
public readonly gitattributes: GitAttributesFile;
```

- *Type:* projen.GitAttributesFile

The .gitattributes file for this repository.

---

##### `gitignore`<sup>Required</sup> <a name="gitignore" id="projen.python.PythonProject.property.gitignore"></a>

```typescript
public readonly gitignore: IgnoreFile;
```

- *Type:* projen.IgnoreFile

.gitignore.

---

##### `logger`<sup>Required</sup> <a name="logger" id="projen.python.PythonProject.property.logger"></a>

```typescript
public readonly logger: Logger;
```

- *Type:* projen.Logger

Logging utilities.

---

##### `name`<sup>Required</sup> <a name="name" id="projen.python.PythonProject.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

Project name.

---

##### `outdir`<sup>Required</sup> <a name="outdir" id="projen.python.PythonProject.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* string

Absolute output directory of this project.

---

##### `packageTask`<sup>Required</sup> <a name="packageTask" id="projen.python.PythonProject.property.packageTask"></a>

```typescript
public readonly packageTask: Task;
```

- *Type:* projen.Task

---

##### `postCompileTask`<sup>Required</sup> <a name="postCompileTask" id="projen.python.PythonProject.property.postCompileTask"></a>

```typescript
public readonly postCompileTask: Task;
```

- *Type:* projen.Task

---

##### `preCompileTask`<sup>Required</sup> <a name="preCompileTask" id="projen.python.PythonProject.property.preCompileTask"></a>

```typescript
public readonly preCompileTask: Task;
```

- *Type:* projen.Task

---

##### `projectBuild`<sup>Required</sup> <a name="projectBuild" id="projen.python.PythonProject.property.projectBuild"></a>

```typescript
public readonly projectBuild: ProjectBuild;
```

- *Type:* projen.ProjectBuild

Manages the build process of the project.

---

##### `projenCommand`<sup>Required</sup> <a name="projenCommand" id="projen.python.PythonProject.property.projenCommand"></a>

```typescript
public readonly projenCommand: string;
```

- *Type:* string

The command to use in order to run the projen CLI.

---

##### `root`<sup>Required</sup> <a name="root" id="projen.python.PythonProject.property.root"></a>

```typescript
public readonly root: Project;
```

- *Type:* projen.Project

The root project.

---

##### `subprojects`<sup>Required</sup> <a name="subprojects" id="projen.python.PythonProject.property.subprojects"></a>

```typescript
public readonly subprojects: Project[];
```

- *Type:* projen.Project[]

Returns all the subprojects within this project.

---

##### `tasks`<sup>Required</sup> <a name="tasks" id="projen.python.PythonProject.property.tasks"></a>

```typescript
public readonly tasks: Tasks;
```

- *Type:* projen.Tasks

Project tasks.

---

##### `testTask`<sup>Required</sup> <a name="testTask" id="projen.python.PythonProject.property.testTask"></a>

```typescript
public readonly testTask: Task;
```

- *Type:* projen.Task

---

##### `defaultTask`<sup>Optional</sup> <a name="defaultTask" id="projen.python.PythonProject.property.defaultTask"></a>

```typescript
public readonly defaultTask: Task;
```

- *Type:* projen.Task

This is the "default" task, the one that executes "projen".

Undefined if
the project is being ejected.

---

##### `initProject`<sup>Optional</sup> <a name="initProject" id="projen.python.PythonProject.property.initProject"></a>

```typescript
public readonly initProject: InitProject;
```

- *Type:* projen.InitProject

The options used when this project is bootstrapped via `projen new`.

It
includes the original set of options passed to the CLI and also the JSII
FQN of the project type.

---

##### `parent`<sup>Optional</sup> <a name="parent" id="projen.python.PythonProject.property.parent"></a>

```typescript
public readonly parent: Project;
```

- *Type:* projen.Project

A parent project.

If undefined, this is the root project.

---

##### `projectType`<sup>Required</sup> <a name="projectType" id="projen.python.PythonProject.property.projectType"></a>

```typescript
public readonly projectType: ProjectType;
```

- *Type:* projen.ProjectType

---

##### `autoApprove`<sup>Optional</sup> <a name="autoApprove" id="projen.python.PythonProject.property.autoApprove"></a>

```typescript
public readonly autoApprove: AutoApprove;
```

- *Type:* projen.github.AutoApprove

Auto approve set up for this project.

---

##### `devContainer`<sup>Optional</sup> <a name="devContainer" id="projen.python.PythonProject.property.devContainer"></a>

```typescript
public readonly devContainer: DevContainer;
```

- *Type:* projen.vscode.DevContainer

Access for .devcontainer.json (used for GitHub Codespaces).

This will be `undefined` if devContainer boolean is false

---

##### `github`<sup>Optional</sup> <a name="github" id="projen.python.PythonProject.property.github"></a>

```typescript
public readonly github: GitHub;
```

- *Type:* projen.github.GitHub

Access all github components.

This will be `undefined` for subprojects.

---

##### `gitpod`<sup>Optional</sup> <a name="gitpod" id="projen.python.PythonProject.property.gitpod"></a>

```typescript
public readonly gitpod: Gitpod;
```

- *Type:* projen.Gitpod

Access for Gitpod.

This will be `undefined` if gitpod boolean is false

---

##### `vscode`<sup>Optional</sup> <a name="vscode" id="projen.python.PythonProject.property.vscode"></a>

```typescript
public readonly vscode: VsCode;
```

- *Type:* projen.vscode.VsCode

Access all VSCode components.

This will be `undefined` for subprojects.

---

##### `depsManager`<sup>Required</sup> <a name="depsManager" id="projen.python.PythonProject.property.depsManager"></a>

```typescript
public readonly depsManager: IPythonDeps;
```

- *Type:* <a href="#projen.python.IPythonDeps">IPythonDeps</a>

API for managing dependencies.

---

##### `envManager`<sup>Required</sup> <a name="envManager" id="projen.python.PythonProject.property.envManager"></a>

```typescript
public readonly envManager: IPythonEnv;
```

- *Type:* <a href="#projen.python.IPythonEnv">IPythonEnv</a>

API for mangaging the Python runtime environment.

---

##### `moduleName`<sup>Required</sup> <a name="moduleName" id="projen.python.PythonProject.property.moduleName"></a>

```typescript
public readonly moduleName: string;
```

- *Type:* string

Python module name (the project name, with any hyphens or periods replaced with underscores).

---

##### `sampleTestdir`<sup>Required</sup> <a name="sampleTestdir" id="projen.python.PythonProject.property.sampleTestdir"></a>

```typescript
public readonly sampleTestdir: string;
```

- *Type:* string
- *Default:* "tests"

Directory where sample tests are located.

---

##### `version`<sup>Required</sup> <a name="version" id="projen.python.PythonProject.property.version"></a>

```typescript
public readonly version: string;
```

- *Type:* string

Version of the package for distribution (should follow semver).

---

##### `packagingManager`<sup>Optional</sup> <a name="packagingManager" id="projen.python.PythonProject.property.packagingManager"></a>

```typescript
public readonly packagingManager: IPythonPackaging;
```

- *Type:* <a href="#projen.python.IPythonPackaging">IPythonPackaging</a>

API for managing packaging the project as a library.

Only applies when the `projectType` is LIB.

---

##### `pytest`<sup>Optional</sup> <a name="pytest" id="projen.python.PythonProject.property.pytest"></a>

```typescript
public readonly pytest: Pytest;
```

- *Type:* <a href="#projen.python.Pytest">Pytest</a>

Pytest component.

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.PythonProject.property.DEFAULT_TASK">DEFAULT_TASK</a></code> | <code>string</code> | The name of the default task (the task executed when `projen` is run without arguments). |

---

##### `DEFAULT_TASK`<sup>Required</sup> <a name="DEFAULT_TASK" id="projen.python.PythonProject.property.DEFAULT_TASK"></a>

```typescript
public readonly DEFAULT_TASK: string;
```

- *Type:* string

The name of the default task (the task executed when `projen` is run without arguments).

Normally
this task should synthesize the project files.

---

### PythonSample <a name="PythonSample" id="projen.python.PythonSample"></a>

Python code sample.

#### Initializers <a name="Initializers" id="projen.python.PythonSample.Initializer"></a>

```typescript
import { python } from 'projen'

new python.PythonSample(project: Project, options: PythonSampleOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.PythonSample.Initializer.parameter.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.python.PythonSample.Initializer.parameter.options">options</a></code> | <code><a href="#projen.python.PythonSampleOptions">PythonSampleOptions</a></code> | *No description.* |

---

##### `project`<sup>Required</sup> <a name="project" id="projen.python.PythonSample.Initializer.parameter.project"></a>

- *Type:* projen.Project

---

##### `options`<sup>Required</sup> <a name="options" id="projen.python.PythonSample.Initializer.parameter.options"></a>

- *Type:* <a href="#projen.python.PythonSampleOptions">PythonSampleOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.python.PythonSample.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen.python.PythonSample.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen.python.PythonSample.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen.python.PythonSample.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |

---

##### `toString` <a name="toString" id="projen.python.PythonSample.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `postSynthesize` <a name="postSynthesize" id="projen.python.PythonSample.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen.python.PythonSample.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `synthesize` <a name="synthesize" id="projen.python.PythonSample.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.python.PythonSample.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen.python.PythonSample.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="projen.python.PythonSample.isConstruct"></a>

```typescript
import { python } from 'projen'

python.PythonSample.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="projen.python.PythonSample.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen.python.PythonSample.isComponent"></a>

```typescript
import { python } from 'projen'

python.PythonSample.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen.python.PythonSample.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.PythonSample.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen.python.PythonSample.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="projen.python.PythonSample.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen.python.PythonSample.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---


### RequirementsFile <a name="RequirementsFile" id="projen.python.RequirementsFile"></a>

Specifies a list of packages to be installed using pip.

> [https://pip.pypa.io/en/stable/reference/pip_install/#requirements-file-format](https://pip.pypa.io/en/stable/reference/pip_install/#requirements-file-format)

#### Initializers <a name="Initializers" id="projen.python.RequirementsFile.Initializer"></a>

```typescript
import { python } from 'projen'

new python.RequirementsFile(project: Project, filePath: string, options: RequirementsFileOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.RequirementsFile.Initializer.parameter.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.python.RequirementsFile.Initializer.parameter.filePath">filePath</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.RequirementsFile.Initializer.parameter.options">options</a></code> | <code><a href="#projen.python.RequirementsFileOptions">RequirementsFileOptions</a></code> | *No description.* |

---

##### `project`<sup>Required</sup> <a name="project" id="projen.python.RequirementsFile.Initializer.parameter.project"></a>

- *Type:* projen.Project

---

##### `filePath`<sup>Required</sup> <a name="filePath" id="projen.python.RequirementsFile.Initializer.parameter.filePath"></a>

- *Type:* string

---

##### `options`<sup>Required</sup> <a name="options" id="projen.python.RequirementsFile.Initializer.parameter.options"></a>

- *Type:* <a href="#projen.python.RequirementsFileOptions">RequirementsFileOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.python.RequirementsFile.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen.python.RequirementsFile.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen.python.RequirementsFile.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen.python.RequirementsFile.synthesize">synthesize</a></code> | Writes the file to the project's output directory. |
| <code><a href="#projen.python.RequirementsFile.addPackages">addPackages</a></code> | Adds the specified packages provided in semver format. |

---

##### `toString` <a name="toString" id="projen.python.RequirementsFile.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `postSynthesize` <a name="postSynthesize" id="projen.python.RequirementsFile.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen.python.RequirementsFile.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `synthesize` <a name="synthesize" id="projen.python.RequirementsFile.synthesize"></a>

```typescript
public synthesize(): void
```

Writes the file to the project's output directory.

##### `addPackages` <a name="addPackages" id="projen.python.RequirementsFile.addPackages"></a>

```typescript
public addPackages(packages: ...string[]): void
```

Adds the specified packages provided in semver format.

Comment lines (start with `#`) are ignored.

###### `packages`<sup>Required</sup> <a name="packages" id="projen.python.RequirementsFile.addPackages.parameter.packages"></a>

- *Type:* ...string[]

Package version in format `<module>@<semver>`.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.python.RequirementsFile.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen.python.RequirementsFile.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="projen.python.RequirementsFile.isConstruct"></a>

```typescript
import { python } from 'projen'

python.RequirementsFile.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="projen.python.RequirementsFile.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen.python.RequirementsFile.isComponent"></a>

```typescript
import { python } from 'projen'

python.RequirementsFile.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen.python.RequirementsFile.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.RequirementsFile.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen.python.RequirementsFile.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.python.RequirementsFile.property.absolutePath">absolutePath</a></code> | <code>string</code> | The absolute path of this file. |
| <code><a href="#projen.python.RequirementsFile.property.path">path</a></code> | <code>string</code> | The file path, relative to the project's outdir. |
| <code><a href="#projen.python.RequirementsFile.property.changed">changed</a></code> | <code>boolean</code> | Indicates if the file has been changed during synthesis. |
| <code><a href="#projen.python.RequirementsFile.property.marker">marker</a></code> | <code>string</code> | The projen marker, used to identify files as projen-generated. |
| <code><a href="#projen.python.RequirementsFile.property.executable">executable</a></code> | <code>boolean</code> | Indicates if the file should be marked as executable. |
| <code><a href="#projen.python.RequirementsFile.property.readonly">readonly</a></code> | <code>boolean</code> | Indicates if the file should be read-only or read-write. |

---

##### `node`<sup>Required</sup> <a name="node" id="projen.python.RequirementsFile.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen.python.RequirementsFile.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---

##### `absolutePath`<sup>Required</sup> <a name="absolutePath" id="projen.python.RequirementsFile.property.absolutePath"></a>

```typescript
public readonly absolutePath: string;
```

- *Type:* string

The absolute path of this file.

---

##### `path`<sup>Required</sup> <a name="path" id="projen.python.RequirementsFile.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* string

The file path, relative to the project's outdir.

---

##### `changed`<sup>Optional</sup> <a name="changed" id="projen.python.RequirementsFile.property.changed"></a>

```typescript
public readonly changed: boolean;
```

- *Type:* boolean

Indicates if the file has been changed during synthesis.

This property is
only available in `postSynthesize()` hooks. If this is `undefined`, the
file has not been synthesized yet.

---

##### `marker`<sup>Optional</sup> <a name="marker" id="projen.python.RequirementsFile.property.marker"></a>

```typescript
public readonly marker: string;
```

- *Type:* string

The projen marker, used to identify files as projen-generated.

Value is undefined if the project is being ejected.

---

##### `executable`<sup>Required</sup> <a name="executable" id="projen.python.RequirementsFile.property.executable"></a>

```typescript
public readonly executable: boolean;
```

- *Type:* boolean

Indicates if the file should be marked as executable.

---

##### `readonly`<sup>Required</sup> <a name="readonly" id="projen.python.RequirementsFile.property.readonly"></a>

```typescript
public readonly readonly: boolean;
```

- *Type:* boolean

Indicates if the file should be read-only or read-write.

---


### SetupPy <a name="SetupPy" id="projen.python.SetupPy"></a>

Python packaging script where package metadata can be placed.

#### Initializers <a name="Initializers" id="projen.python.SetupPy.Initializer"></a>

```typescript
import { python } from 'projen'

new python.SetupPy(project: Project, options: SetupPyOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.SetupPy.Initializer.parameter.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.python.SetupPy.Initializer.parameter.options">options</a></code> | <code><a href="#projen.python.SetupPyOptions">SetupPyOptions</a></code> | *No description.* |

---

##### `project`<sup>Required</sup> <a name="project" id="projen.python.SetupPy.Initializer.parameter.project"></a>

- *Type:* projen.Project

---

##### `options`<sup>Required</sup> <a name="options" id="projen.python.SetupPy.Initializer.parameter.options"></a>

- *Type:* <a href="#projen.python.SetupPyOptions">SetupPyOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.python.SetupPy.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen.python.SetupPy.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen.python.SetupPy.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen.python.SetupPy.synthesize">synthesize</a></code> | Writes the file to the project's output directory. |

---

##### `toString` <a name="toString" id="projen.python.SetupPy.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `postSynthesize` <a name="postSynthesize" id="projen.python.SetupPy.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen.python.SetupPy.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `synthesize` <a name="synthesize" id="projen.python.SetupPy.synthesize"></a>

```typescript
public synthesize(): void
```

Writes the file to the project's output directory.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.python.SetupPy.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen.python.SetupPy.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="projen.python.SetupPy.isConstruct"></a>

```typescript
import { python } from 'projen'

python.SetupPy.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="projen.python.SetupPy.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen.python.SetupPy.isComponent"></a>

```typescript
import { python } from 'projen'

python.SetupPy.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen.python.SetupPy.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.SetupPy.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen.python.SetupPy.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.python.SetupPy.property.absolutePath">absolutePath</a></code> | <code>string</code> | The absolute path of this file. |
| <code><a href="#projen.python.SetupPy.property.path">path</a></code> | <code>string</code> | The file path, relative to the project's outdir. |
| <code><a href="#projen.python.SetupPy.property.changed">changed</a></code> | <code>boolean</code> | Indicates if the file has been changed during synthesis. |
| <code><a href="#projen.python.SetupPy.property.marker">marker</a></code> | <code>string</code> | The projen marker, used to identify files as projen-generated. |
| <code><a href="#projen.python.SetupPy.property.executable">executable</a></code> | <code>boolean</code> | Indicates if the file should be marked as executable. |
| <code><a href="#projen.python.SetupPy.property.readonly">readonly</a></code> | <code>boolean</code> | Indicates if the file should be read-only or read-write. |

---

##### `node`<sup>Required</sup> <a name="node" id="projen.python.SetupPy.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen.python.SetupPy.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---

##### `absolutePath`<sup>Required</sup> <a name="absolutePath" id="projen.python.SetupPy.property.absolutePath"></a>

```typescript
public readonly absolutePath: string;
```

- *Type:* string

The absolute path of this file.

---

##### `path`<sup>Required</sup> <a name="path" id="projen.python.SetupPy.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* string

The file path, relative to the project's outdir.

---

##### `changed`<sup>Optional</sup> <a name="changed" id="projen.python.SetupPy.property.changed"></a>

```typescript
public readonly changed: boolean;
```

- *Type:* boolean

Indicates if the file has been changed during synthesis.

This property is
only available in `postSynthesize()` hooks. If this is `undefined`, the
file has not been synthesized yet.

---

##### `marker`<sup>Optional</sup> <a name="marker" id="projen.python.SetupPy.property.marker"></a>

```typescript
public readonly marker: string;
```

- *Type:* string

The projen marker, used to identify files as projen-generated.

Value is undefined if the project is being ejected.

---

##### `executable`<sup>Required</sup> <a name="executable" id="projen.python.SetupPy.property.executable"></a>

```typescript
public readonly executable: boolean;
```

- *Type:* boolean

Indicates if the file should be marked as executable.

---

##### `readonly`<sup>Required</sup> <a name="readonly" id="projen.python.SetupPy.property.readonly"></a>

```typescript
public readonly readonly: boolean;
```

- *Type:* boolean

Indicates if the file should be read-only or read-write.

---


### Setuptools <a name="Setuptools" id="projen.python.Setuptools"></a>

- *Implements:* <a href="#projen.python.IPythonPackaging">IPythonPackaging</a>

Manages packaging through setuptools with a setup.py script.

#### Initializers <a name="Initializers" id="projen.python.Setuptools.Initializer"></a>

```typescript
import { python } from 'projen'

new python.Setuptools(project: Project, options: SetuptoolsOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.Setuptools.Initializer.parameter.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.python.Setuptools.Initializer.parameter.options">options</a></code> | <code><a href="#projen.python.SetuptoolsOptions">SetuptoolsOptions</a></code> | *No description.* |

---

##### `project`<sup>Required</sup> <a name="project" id="projen.python.Setuptools.Initializer.parameter.project"></a>

- *Type:* projen.Project

---

##### `options`<sup>Required</sup> <a name="options" id="projen.python.Setuptools.Initializer.parameter.options"></a>

- *Type:* <a href="#projen.python.SetuptoolsOptions">SetuptoolsOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.python.Setuptools.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen.python.Setuptools.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen.python.Setuptools.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen.python.Setuptools.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |

---

##### `toString` <a name="toString" id="projen.python.Setuptools.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `postSynthesize` <a name="postSynthesize" id="projen.python.Setuptools.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen.python.Setuptools.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `synthesize` <a name="synthesize" id="projen.python.Setuptools.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.python.Setuptools.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen.python.Setuptools.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="projen.python.Setuptools.isConstruct"></a>

```typescript
import { python } from 'projen'

python.Setuptools.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="projen.python.Setuptools.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen.python.Setuptools.isComponent"></a>

```typescript
import { python } from 'projen'

python.Setuptools.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen.python.Setuptools.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.Setuptools.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen.python.Setuptools.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.python.Setuptools.property.publishTask">publishTask</a></code> | <code>projen.Task</code> | A task that uploads the package to a package repository. |
| <code><a href="#projen.python.Setuptools.property.publishTestTask">publishTestTask</a></code> | <code>projen.Task</code> | A task that uploads the package to the Test PyPI repository. |

---

##### `node`<sup>Required</sup> <a name="node" id="projen.python.Setuptools.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen.python.Setuptools.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---

##### `publishTask`<sup>Required</sup> <a name="publishTask" id="projen.python.Setuptools.property.publishTask"></a>

```typescript
public readonly publishTask: Task;
```

- *Type:* projen.Task

A task that uploads the package to a package repository.

---

##### `publishTestTask`<sup>Required</sup> <a name="publishTestTask" id="projen.python.Setuptools.property.publishTestTask"></a>

```typescript
public readonly publishTestTask: Task;
```

- *Type:* projen.Task

A task that uploads the package to the Test PyPI repository.

---


### Uv <a name="Uv" id="projen.python.Uv"></a>

- *Implements:* <a href="#projen.python.IPythonDeps">IPythonDeps</a>, <a href="#projen.python.IPythonEnv">IPythonEnv</a>, <a href="#projen.python.IPythonPackaging">IPythonPackaging</a>

Manage project dependencies, virtual environments, and packaging through uv.

#### Initializers <a name="Initializers" id="projen.python.Uv.Initializer"></a>

```typescript
import { python } from 'projen'

new python.Uv(scope: IConstruct, options: UvOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.Uv.Initializer.parameter.scope">scope</a></code> | <code>constructs.IConstruct</code> | *No description.* |
| <code><a href="#projen.python.Uv.Initializer.parameter.options">options</a></code> | <code><a href="#projen.python.UvOptions">UvOptions</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="projen.python.Uv.Initializer.parameter.scope"></a>

- *Type:* constructs.IConstruct

---

##### `options`<sup>Required</sup> <a name="options" id="projen.python.Uv.Initializer.parameter.options"></a>

- *Type:* <a href="#projen.python.UvOptions">UvOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.python.Uv.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen.python.Uv.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen.python.Uv.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen.python.Uv.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |
| <code><a href="#projen.python.Uv.addDependency">addDependency</a></code> | Adds a runtime dependency. |
| <code><a href="#projen.python.Uv.addDevDependency">addDevDependency</a></code> | Adds a dev dependency. |
| <code><a href="#projen.python.Uv.installDependencies">installDependencies</a></code> | Installs dependencies (called during post-synthesis). |
| <code><a href="#projen.python.Uv.setupEnvironment">setupEnvironment</a></code> | Initializes the virtual environment if it doesn't exist (called during post-synthesis). |

---

##### `toString` <a name="toString" id="projen.python.Uv.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `postSynthesize` <a name="postSynthesize" id="projen.python.Uv.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen.python.Uv.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `synthesize` <a name="synthesize" id="projen.python.Uv.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

##### `addDependency` <a name="addDependency" id="projen.python.Uv.addDependency"></a>

```typescript
public addDependency(spec: string): void
```

Adds a runtime dependency.

###### `spec`<sup>Required</sup> <a name="spec" id="projen.python.Uv.addDependency.parameter.spec"></a>

- *Type:* string

---

##### `addDevDependency` <a name="addDevDependency" id="projen.python.Uv.addDevDependency"></a>

```typescript
public addDevDependency(spec: string): void
```

Adds a dev dependency.

###### `spec`<sup>Required</sup> <a name="spec" id="projen.python.Uv.addDevDependency.parameter.spec"></a>

- *Type:* string

---

##### `installDependencies` <a name="installDependencies" id="projen.python.Uv.installDependencies"></a>

```typescript
public installDependencies(): void
```

Installs dependencies (called during post-synthesis).

##### `setupEnvironment` <a name="setupEnvironment" id="projen.python.Uv.setupEnvironment"></a>

```typescript
public setupEnvironment(): void
```

Initializes the virtual environment if it doesn't exist (called during post-synthesis).

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.python.Uv.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen.python.Uv.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="projen.python.Uv.isConstruct"></a>

```typescript
import { python } from 'projen'

python.Uv.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="projen.python.Uv.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen.python.Uv.isComponent"></a>

```typescript
import { python } from 'projen'

python.Uv.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen.python.Uv.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.Uv.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen.python.Uv.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.python.Uv.property.installCiTask">installCiTask</a></code> | <code>projen.Task</code> | A task that installs and updates dependencies. |
| <code><a href="#projen.python.Uv.property.installTask">installTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#projen.python.Uv.property.publishTask">publishTask</a></code> | <code>projen.Task</code> | A task that uploads the package to a package repository. |
| <code><a href="#projen.python.Uv.property.publishTestTask">publishTestTask</a></code> | <code>projen.Task</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="projen.python.Uv.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen.python.Uv.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---

##### `installCiTask`<sup>Required</sup> <a name="installCiTask" id="projen.python.Uv.property.installCiTask"></a>

```typescript
public readonly installCiTask: Task;
```

- *Type:* projen.Task

A task that installs and updates dependencies.

---

##### `installTask`<sup>Required</sup> <a name="installTask" id="projen.python.Uv.property.installTask"></a>

```typescript
public readonly installTask: Task;
```

- *Type:* projen.Task

---

##### `publishTask`<sup>Required</sup> <a name="publishTask" id="projen.python.Uv.property.publishTask"></a>

```typescript
public readonly publishTask: Task;
```

- *Type:* projen.Task

A task that uploads the package to a package repository.

---

##### `publishTestTask`<sup>Required</sup> <a name="publishTestTask" id="projen.python.Uv.property.publishTestTask"></a>

```typescript
public readonly publishTestTask: Task;
```

- *Type:* projen.Task

---


### UvPyproject <a name="UvPyproject" id="projen.python.UvPyproject"></a>

Represents configuration of a pyproject.toml file for a uv project.

#### Initializers <a name="Initializers" id="projen.python.UvPyproject.Initializer"></a>

```typescript
import { python } from 'projen'

new python.UvPyproject(project: Project, options: UvPyprojectOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.UvPyproject.Initializer.parameter.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.python.UvPyproject.Initializer.parameter.options">options</a></code> | <code><a href="#projen.python.UvPyprojectOptions">UvPyprojectOptions</a></code> | *No description.* |

---

##### `project`<sup>Required</sup> <a name="project" id="projen.python.UvPyproject.Initializer.parameter.project"></a>

- *Type:* projen.Project

---

##### `options`<sup>Required</sup> <a name="options" id="projen.python.UvPyproject.Initializer.parameter.options"></a>

- *Type:* <a href="#projen.python.UvPyprojectOptions">UvPyprojectOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.python.UvPyproject.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen.python.UvPyproject.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen.python.UvPyproject.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen.python.UvPyproject.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |

---

##### `toString` <a name="toString" id="projen.python.UvPyproject.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `postSynthesize` <a name="postSynthesize" id="projen.python.UvPyproject.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen.python.UvPyproject.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `synthesize` <a name="synthesize" id="projen.python.UvPyproject.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.python.UvPyproject.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen.python.UvPyproject.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="projen.python.UvPyproject.isConstruct"></a>

```typescript
import { python } from 'projen'

python.UvPyproject.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="projen.python.UvPyproject.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen.python.UvPyproject.isComponent"></a>

```typescript
import { python } from 'projen'

python.UvPyproject.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen.python.UvPyproject.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.UvPyproject.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen.python.UvPyproject.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.python.UvPyproject.property.file">file</a></code> | <code>projen.TomlFile</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="projen.python.UvPyproject.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen.python.UvPyproject.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---

##### `file`<sup>Required</sup> <a name="file" id="projen.python.UvPyproject.property.file"></a>

```typescript
public readonly file: TomlFile;
```

- *Type:* projen.TomlFile

---


### Venv <a name="Venv" id="projen.python.Venv"></a>

- *Implements:* <a href="#projen.python.IPythonEnv">IPythonEnv</a>

Manages a virtual environment through the Python venv module.

#### Initializers <a name="Initializers" id="projen.python.Venv.Initializer"></a>

```typescript
import { python } from 'projen'

new python.Venv(project: Project, options?: VenvOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.Venv.Initializer.parameter.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.python.Venv.Initializer.parameter.options">options</a></code> | <code><a href="#projen.python.VenvOptions">VenvOptions</a></code> | *No description.* |

---

##### `project`<sup>Required</sup> <a name="project" id="projen.python.Venv.Initializer.parameter.project"></a>

- *Type:* projen.Project

---

##### `options`<sup>Optional</sup> <a name="options" id="projen.python.Venv.Initializer.parameter.options"></a>

- *Type:* <a href="#projen.python.VenvOptions">VenvOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.python.Venv.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen.python.Venv.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen.python.Venv.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen.python.Venv.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |
| <code><a href="#projen.python.Venv.setupEnvironment">setupEnvironment</a></code> | Initializes the virtual environment if it doesn't exist (called during post-synthesis). |

---

##### `toString` <a name="toString" id="projen.python.Venv.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `postSynthesize` <a name="postSynthesize" id="projen.python.Venv.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen.python.Venv.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `synthesize` <a name="synthesize" id="projen.python.Venv.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

##### `setupEnvironment` <a name="setupEnvironment" id="projen.python.Venv.setupEnvironment"></a>

```typescript
public setupEnvironment(): void
```

Initializes the virtual environment if it doesn't exist (called during post-synthesis).

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.python.Venv.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen.python.Venv.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="projen.python.Venv.isConstruct"></a>

```typescript
import { python } from 'projen'

python.Venv.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="projen.python.Venv.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen.python.Venv.isComponent"></a>

```typescript
import { python } from 'projen'

python.Venv.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen.python.Venv.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.Venv.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen.python.Venv.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="projen.python.Venv.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen.python.Venv.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---


## Structs <a name="Structs" id="Structs"></a>

### PipOptions <a name="PipOptions" id="projen.python.PipOptions"></a>

Options for pip.

#### Initializer <a name="Initializer" id="projen.python.PipOptions.Initializer"></a>

```typescript
import { python } from 'projen'

const pipOptions: python.PipOptions = { ... }
```


### PoetryOptions <a name="PoetryOptions" id="projen.python.PoetryOptions"></a>

#### Initializer <a name="Initializer" id="projen.python.PoetryOptions.Initializer"></a>

```typescript
import { python } from 'projen'

const poetryOptions: python.PoetryOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.PoetryOptions.property.authorEmail">authorEmail</a></code> | <code>string</code> | Author's e-mail. |
| <code><a href="#projen.python.PoetryOptions.property.authorName">authorName</a></code> | <code>string</code> | Author's name. |
| <code><a href="#projen.python.PoetryOptions.property.version">version</a></code> | <code>string</code> | Version of the package. |
| <code><a href="#projen.python.PoetryOptions.property.classifiers">classifiers</a></code> | <code>string[]</code> | A list of PyPI trove classifiers that describe the project. |
| <code><a href="#projen.python.PoetryOptions.property.description">description</a></code> | <code>string</code> | A short description of the package. |
| <code><a href="#projen.python.PoetryOptions.property.homepage">homepage</a></code> | <code>string</code> | A URL to the website of the project. |
| <code><a href="#projen.python.PoetryOptions.property.license">license</a></code> | <code>string</code> | License of this package as an SPDX identifier. |
| <code><a href="#projen.python.PoetryOptions.property.packageName">packageName</a></code> | <code>string</code> | Package name. |
| <code><a href="#projen.python.PoetryOptions.property.poetryOptions">poetryOptions</a></code> | <code><a href="#projen.python.PoetryPyprojectOptionsWithoutDeps">PoetryPyprojectOptionsWithoutDeps</a></code> | Additional options to set for poetry if using poetry. |
| <code><a href="#projen.python.PoetryOptions.property.setupConfig">setupConfig</a></code> | <code>{[ key: string ]: any}</code> | Additional fields to pass in the setup() function if using setuptools. |
| <code><a href="#projen.python.PoetryOptions.property.uvOptions">uvOptions</a></code> | <code><a href="#projen.python.UvOptions">UvOptions</a></code> | Additional options to set for uv if using uv. |
| <code><a href="#projen.python.PoetryOptions.property.pythonExec">pythonExec</a></code> | <code>string</code> | Path to the python executable to use. |

---

##### `authorEmail`<sup>Required</sup> <a name="authorEmail" id="projen.python.PoetryOptions.property.authorEmail"></a>

```typescript
public readonly authorEmail: string;
```

- *Type:* string
- *Default:* $GIT_USER_EMAIL

Author's e-mail.

---

##### `authorName`<sup>Required</sup> <a name="authorName" id="projen.python.PoetryOptions.property.authorName"></a>

```typescript
public readonly authorName: string;
```

- *Type:* string
- *Default:* $GIT_USER_NAME

Author's name.

---

##### `version`<sup>Required</sup> <a name="version" id="projen.python.PoetryOptions.property.version"></a>

```typescript
public readonly version: string;
```

- *Type:* string
- *Default:* "0.1.0"

Version of the package.

---

##### `classifiers`<sup>Optional</sup> <a name="classifiers" id="projen.python.PoetryOptions.property.classifiers"></a>

```typescript
public readonly classifiers: string[];
```

- *Type:* string[]

A list of PyPI trove classifiers that describe the project.

> [https://pypi.org/classifiers/](https://pypi.org/classifiers/)

---

##### `description`<sup>Optional</sup> <a name="description" id="projen.python.PoetryOptions.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

A short description of the package.

---

##### `homepage`<sup>Optional</sup> <a name="homepage" id="projen.python.PoetryOptions.property.homepage"></a>

```typescript
public readonly homepage: string;
```

- *Type:* string

A URL to the website of the project.

---

##### `license`<sup>Optional</sup> <a name="license" id="projen.python.PoetryOptions.property.license"></a>

```typescript
public readonly license: string;
```

- *Type:* string

License of this package as an SPDX identifier.

---

##### `packageName`<sup>Optional</sup> <a name="packageName" id="projen.python.PoetryOptions.property.packageName"></a>

```typescript
public readonly packageName: string;
```

- *Type:* string

Package name.

---

##### `poetryOptions`<sup>Optional</sup> <a name="poetryOptions" id="projen.python.PoetryOptions.property.poetryOptions"></a>

```typescript
public readonly poetryOptions: PoetryPyprojectOptionsWithoutDeps;
```

- *Type:* <a href="#projen.python.PoetryPyprojectOptionsWithoutDeps">PoetryPyprojectOptionsWithoutDeps</a>

Additional options to set for poetry if using poetry.

---

##### `setupConfig`<sup>Optional</sup> <a name="setupConfig" id="projen.python.PoetryOptions.property.setupConfig"></a>

```typescript
public readonly setupConfig: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

Additional fields to pass in the setup() function if using setuptools.

---

##### `uvOptions`<sup>Optional</sup> <a name="uvOptions" id="projen.python.PoetryOptions.property.uvOptions"></a>

```typescript
public readonly uvOptions: UvOptions;
```

- *Type:* <a href="#projen.python.UvOptions">UvOptions</a>

Additional options to set for uv if using uv.

---

##### `pythonExec`<sup>Optional</sup> <a name="pythonExec" id="projen.python.PoetryOptions.property.pythonExec"></a>

```typescript
public readonly pythonExec: string;
```

- *Type:* string
- *Default:* "python"

Path to the python executable to use.

---

### PoetryPyprojectOptions <a name="PoetryPyprojectOptions" id="projen.python.PoetryPyprojectOptions"></a>

Poetry-specific options.

> [https://python-poetry.org/docs/pyproject/](https://python-poetry.org/docs/pyproject/)

#### Initializer <a name="Initializer" id="projen.python.PoetryPyprojectOptions.Initializer"></a>

```typescript
import { python } from 'projen'

const poetryPyprojectOptions: python.PoetryPyprojectOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.PoetryPyprojectOptions.property.authors">authors</a></code> | <code>string[]</code> | The authors of the package. |
| <code><a href="#projen.python.PoetryPyprojectOptions.property.classifiers">classifiers</a></code> | <code>string[]</code> | A list of PyPI trove classifiers that describe the project. |
| <code><a href="#projen.python.PoetryPyprojectOptions.property.description">description</a></code> | <code>string</code> | A short description of the package (required). |
| <code><a href="#projen.python.PoetryPyprojectOptions.property.documentation">documentation</a></code> | <code>string</code> | A URL to the documentation of the project. |
| <code><a href="#projen.python.PoetryPyprojectOptions.property.exclude">exclude</a></code> | <code>string[]</code> | A list of patterns that will be excluded in the final package. |
| <code><a href="#projen.python.PoetryPyprojectOptions.property.extras">extras</a></code> | <code>{[ key: string ]: string[]}</code> | Package extras. |
| <code><a href="#projen.python.PoetryPyprojectOptions.property.homepage">homepage</a></code> | <code>string</code> | A URL to the website of the project. |
| <code><a href="#projen.python.PoetryPyprojectOptions.property.include">include</a></code> | <code>string[]</code> | A list of patterns that will be included in the final package. |
| <code><a href="#projen.python.PoetryPyprojectOptions.property.keywords">keywords</a></code> | <code>string[]</code> | A list of keywords (max: 5) that the package is related to. |
| <code><a href="#projen.python.PoetryPyprojectOptions.property.license">license</a></code> | <code>string</code> | License of this package as an SPDX identifier. |
| <code><a href="#projen.python.PoetryPyprojectOptions.property.maintainers">maintainers</a></code> | <code>string[]</code> | the maintainers of the package. |
| <code><a href="#projen.python.PoetryPyprojectOptions.property.name">name</a></code> | <code>string</code> | Name of the package (required). |
| <code><a href="#projen.python.PoetryPyprojectOptions.property.packageMode">packageMode</a></code> | <code>boolean</code> | Package mode (optional). |
| <code><a href="#projen.python.PoetryPyprojectOptions.property.packages">packages</a></code> | <code>any[]</code> | A list of packages and modules to include in the final distribution. |
| <code><a href="#projen.python.PoetryPyprojectOptions.property.plugins">plugins</a></code> | <code>any</code> | Plugins. |
| <code><a href="#projen.python.PoetryPyprojectOptions.property.readme">readme</a></code> | <code>string</code> | The name of the readme file of the package. |
| <code><a href="#projen.python.PoetryPyprojectOptions.property.repository">repository</a></code> | <code>string</code> | A URL to the repository of the project. |
| <code><a href="#projen.python.PoetryPyprojectOptions.property.scripts">scripts</a></code> | <code>{[ key: string ]: any}</code> | The scripts or executables that will be installed when installing the package. |
| <code><a href="#projen.python.PoetryPyprojectOptions.property.source">source</a></code> | <code>any[]</code> | Source registries from which packages are retrieved. |
| <code><a href="#projen.python.PoetryPyprojectOptions.property.urls">urls</a></code> | <code>{[ key: string ]: string}</code> | Project custom URLs, in addition to homepage, repository and documentation. |
| <code><a href="#projen.python.PoetryPyprojectOptions.property.version">version</a></code> | <code>string</code> | Version of the package (required). |
| <code><a href="#projen.python.PoetryPyprojectOptions.property.dependencies">dependencies</a></code> | <code>{[ key: string ]: any}</code> | A list of dependencies for the project. |
| <code><a href="#projen.python.PoetryPyprojectOptions.property.devDependencies">devDependencies</a></code> | <code>{[ key: string ]: any}</code> | A list of development dependencies for the project. |

---

##### `authors`<sup>Optional</sup> <a name="authors" id="projen.python.PoetryPyprojectOptions.property.authors"></a>

```typescript
public readonly authors: string[];
```

- *Type:* string[]

The authors of the package.

Must be in the form "name <email>"

---

##### `classifiers`<sup>Optional</sup> <a name="classifiers" id="projen.python.PoetryPyprojectOptions.property.classifiers"></a>

```typescript
public readonly classifiers: string[];
```

- *Type:* string[]

A list of PyPI trove classifiers that describe the project.

> [https://pypi.org/classifiers/](https://pypi.org/classifiers/)

---

##### `description`<sup>Optional</sup> <a name="description" id="projen.python.PoetryPyprojectOptions.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

A short description of the package (required).

---

##### `documentation`<sup>Optional</sup> <a name="documentation" id="projen.python.PoetryPyprojectOptions.property.documentation"></a>

```typescript
public readonly documentation: string;
```

- *Type:* string

A URL to the documentation of the project.

---

##### `exclude`<sup>Optional</sup> <a name="exclude" id="projen.python.PoetryPyprojectOptions.property.exclude"></a>

```typescript
public readonly exclude: string[];
```

- *Type:* string[]

A list of patterns that will be excluded in the final package.

If a VCS is being used for a package, the exclude field will be seeded with
the VCS’ ignore settings (.gitignore for git for example).

---

##### `extras`<sup>Optional</sup> <a name="extras" id="projen.python.PoetryPyprojectOptions.property.extras"></a>

```typescript
public readonly extras: {[ key: string ]: string[]};
```

- *Type:* {[ key: string ]: string[]}

Package extras.

---

##### `homepage`<sup>Optional</sup> <a name="homepage" id="projen.python.PoetryPyprojectOptions.property.homepage"></a>

```typescript
public readonly homepage: string;
```

- *Type:* string

A URL to the website of the project.

---

##### `include`<sup>Optional</sup> <a name="include" id="projen.python.PoetryPyprojectOptions.property.include"></a>

```typescript
public readonly include: string[];
```

- *Type:* string[]

A list of patterns that will be included in the final package.

---

##### `keywords`<sup>Optional</sup> <a name="keywords" id="projen.python.PoetryPyprojectOptions.property.keywords"></a>

```typescript
public readonly keywords: string[];
```

- *Type:* string[]

A list of keywords (max: 5) that the package is related to.

---

##### `license`<sup>Optional</sup> <a name="license" id="projen.python.PoetryPyprojectOptions.property.license"></a>

```typescript
public readonly license: string;
```

- *Type:* string

License of this package as an SPDX identifier.

If the project is proprietary and does not use a specific license, you
can set this value as "Proprietary".

---

##### `maintainers`<sup>Optional</sup> <a name="maintainers" id="projen.python.PoetryPyprojectOptions.property.maintainers"></a>

```typescript
public readonly maintainers: string[];
```

- *Type:* string[]

the maintainers of the package.

Must be in the form "name <email>"

---

##### `name`<sup>Optional</sup> <a name="name" id="projen.python.PoetryPyprojectOptions.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

Name of the package (required).

---

##### `packageMode`<sup>Optional</sup> <a name="packageMode" id="projen.python.PoetryPyprojectOptions.property.packageMode"></a>

```typescript
public readonly packageMode: boolean;
```

- *Type:* boolean
- *Default:* true

Package mode (optional).

> [https://python-poetry.org/docs/pyproject/#package-mode](https://python-poetry.org/docs/pyproject/#package-mode)

---

*Example*

```typescript
false
```


##### `packages`<sup>Optional</sup> <a name="packages" id="projen.python.PoetryPyprojectOptions.property.packages"></a>

```typescript
public readonly packages: any[];
```

- *Type:* any[]

A list of packages and modules to include in the final distribution.

---

##### `plugins`<sup>Optional</sup> <a name="plugins" id="projen.python.PoetryPyprojectOptions.property.plugins"></a>

```typescript
public readonly plugins: any;
```

- *Type:* any

Plugins.

Must be specified as a table.

> [https://toml.io/en/v1.0.0#table](https://toml.io/en/v1.0.0#table)

---

##### `readme`<sup>Optional</sup> <a name="readme" id="projen.python.PoetryPyprojectOptions.property.readme"></a>

```typescript
public readonly readme: string;
```

- *Type:* string

The name of the readme file of the package.

---

##### `repository`<sup>Optional</sup> <a name="repository" id="projen.python.PoetryPyprojectOptions.property.repository"></a>

```typescript
public readonly repository: string;
```

- *Type:* string

A URL to the repository of the project.

---

##### `scripts`<sup>Optional</sup> <a name="scripts" id="projen.python.PoetryPyprojectOptions.property.scripts"></a>

```typescript
public readonly scripts: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

The scripts or executables that will be installed when installing the package.

---

##### `source`<sup>Optional</sup> <a name="source" id="projen.python.PoetryPyprojectOptions.property.source"></a>

```typescript
public readonly source: any[];
```

- *Type:* any[]

Source registries from which packages are retrieved.

---

##### `urls`<sup>Optional</sup> <a name="urls" id="projen.python.PoetryPyprojectOptions.property.urls"></a>

```typescript
public readonly urls: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Project custom URLs, in addition to homepage, repository and documentation.

E.g. "Bug Tracker"

---

##### `version`<sup>Optional</sup> <a name="version" id="projen.python.PoetryPyprojectOptions.property.version"></a>

```typescript
public readonly version: string;
```

- *Type:* string

Version of the package (required).

---

##### `dependencies`<sup>Optional</sup> <a name="dependencies" id="projen.python.PoetryPyprojectOptions.property.dependencies"></a>

```typescript
public readonly dependencies: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

A list of dependencies for the project.

The python version for which your package is compatible is also required.

---

*Example*

```typescript
{ requests: "^2.13.0" }
```


##### `devDependencies`<sup>Optional</sup> <a name="devDependencies" id="projen.python.PoetryPyprojectOptions.property.devDependencies"></a>

```typescript
public readonly devDependencies: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

A list of development dependencies for the project.

---

*Example*

```typescript
{ requests: "^2.13.0" }
```


### PoetryPyprojectOptionsWithoutDeps <a name="PoetryPyprojectOptionsWithoutDeps" id="projen.python.PoetryPyprojectOptionsWithoutDeps"></a>

Poetry-specific options.

> [https://python-poetry.org/docs/pyproject/](https://python-poetry.org/docs/pyproject/)

#### Initializer <a name="Initializer" id="projen.python.PoetryPyprojectOptionsWithoutDeps.Initializer"></a>

```typescript
import { python } from 'projen'

const poetryPyprojectOptionsWithoutDeps: python.PoetryPyprojectOptionsWithoutDeps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.PoetryPyprojectOptionsWithoutDeps.property.authors">authors</a></code> | <code>string[]</code> | The authors of the package. |
| <code><a href="#projen.python.PoetryPyprojectOptionsWithoutDeps.property.classifiers">classifiers</a></code> | <code>string[]</code> | A list of PyPI trove classifiers that describe the project. |
| <code><a href="#projen.python.PoetryPyprojectOptionsWithoutDeps.property.description">description</a></code> | <code>string</code> | A short description of the package (required). |
| <code><a href="#projen.python.PoetryPyprojectOptionsWithoutDeps.property.documentation">documentation</a></code> | <code>string</code> | A URL to the documentation of the project. |
| <code><a href="#projen.python.PoetryPyprojectOptionsWithoutDeps.property.exclude">exclude</a></code> | <code>string[]</code> | A list of patterns that will be excluded in the final package. |
| <code><a href="#projen.python.PoetryPyprojectOptionsWithoutDeps.property.extras">extras</a></code> | <code>{[ key: string ]: string[]}</code> | Package extras. |
| <code><a href="#projen.python.PoetryPyprojectOptionsWithoutDeps.property.homepage">homepage</a></code> | <code>string</code> | A URL to the website of the project. |
| <code><a href="#projen.python.PoetryPyprojectOptionsWithoutDeps.property.include">include</a></code> | <code>string[]</code> | A list of patterns that will be included in the final package. |
| <code><a href="#projen.python.PoetryPyprojectOptionsWithoutDeps.property.keywords">keywords</a></code> | <code>string[]</code> | A list of keywords (max: 5) that the package is related to. |
| <code><a href="#projen.python.PoetryPyprojectOptionsWithoutDeps.property.license">license</a></code> | <code>string</code> | License of this package as an SPDX identifier. |
| <code><a href="#projen.python.PoetryPyprojectOptionsWithoutDeps.property.maintainers">maintainers</a></code> | <code>string[]</code> | the maintainers of the package. |
| <code><a href="#projen.python.PoetryPyprojectOptionsWithoutDeps.property.name">name</a></code> | <code>string</code> | Name of the package (required). |
| <code><a href="#projen.python.PoetryPyprojectOptionsWithoutDeps.property.packageMode">packageMode</a></code> | <code>boolean</code> | Package mode (optional). |
| <code><a href="#projen.python.PoetryPyprojectOptionsWithoutDeps.property.packages">packages</a></code> | <code>any[]</code> | A list of packages and modules to include in the final distribution. |
| <code><a href="#projen.python.PoetryPyprojectOptionsWithoutDeps.property.plugins">plugins</a></code> | <code>any</code> | Plugins. |
| <code><a href="#projen.python.PoetryPyprojectOptionsWithoutDeps.property.readme">readme</a></code> | <code>string</code> | The name of the readme file of the package. |
| <code><a href="#projen.python.PoetryPyprojectOptionsWithoutDeps.property.repository">repository</a></code> | <code>string</code> | A URL to the repository of the project. |
| <code><a href="#projen.python.PoetryPyprojectOptionsWithoutDeps.property.scripts">scripts</a></code> | <code>{[ key: string ]: any}</code> | The scripts or executables that will be installed when installing the package. |
| <code><a href="#projen.python.PoetryPyprojectOptionsWithoutDeps.property.source">source</a></code> | <code>any[]</code> | Source registries from which packages are retrieved. |
| <code><a href="#projen.python.PoetryPyprojectOptionsWithoutDeps.property.urls">urls</a></code> | <code>{[ key: string ]: string}</code> | Project custom URLs, in addition to homepage, repository and documentation. |
| <code><a href="#projen.python.PoetryPyprojectOptionsWithoutDeps.property.version">version</a></code> | <code>string</code> | Version of the package (required). |

---

##### `authors`<sup>Optional</sup> <a name="authors" id="projen.python.PoetryPyprojectOptionsWithoutDeps.property.authors"></a>

```typescript
public readonly authors: string[];
```

- *Type:* string[]

The authors of the package.

Must be in the form "name <email>"

---

##### `classifiers`<sup>Optional</sup> <a name="classifiers" id="projen.python.PoetryPyprojectOptionsWithoutDeps.property.classifiers"></a>

```typescript
public readonly classifiers: string[];
```

- *Type:* string[]

A list of PyPI trove classifiers that describe the project.

> [https://pypi.org/classifiers/](https://pypi.org/classifiers/)

---

##### `description`<sup>Optional</sup> <a name="description" id="projen.python.PoetryPyprojectOptionsWithoutDeps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

A short description of the package (required).

---

##### `documentation`<sup>Optional</sup> <a name="documentation" id="projen.python.PoetryPyprojectOptionsWithoutDeps.property.documentation"></a>

```typescript
public readonly documentation: string;
```

- *Type:* string

A URL to the documentation of the project.

---

##### `exclude`<sup>Optional</sup> <a name="exclude" id="projen.python.PoetryPyprojectOptionsWithoutDeps.property.exclude"></a>

```typescript
public readonly exclude: string[];
```

- *Type:* string[]

A list of patterns that will be excluded in the final package.

If a VCS is being used for a package, the exclude field will be seeded with
the VCS’ ignore settings (.gitignore for git for example).

---

##### `extras`<sup>Optional</sup> <a name="extras" id="projen.python.PoetryPyprojectOptionsWithoutDeps.property.extras"></a>

```typescript
public readonly extras: {[ key: string ]: string[]};
```

- *Type:* {[ key: string ]: string[]}

Package extras.

---

##### `homepage`<sup>Optional</sup> <a name="homepage" id="projen.python.PoetryPyprojectOptionsWithoutDeps.property.homepage"></a>

```typescript
public readonly homepage: string;
```

- *Type:* string

A URL to the website of the project.

---

##### `include`<sup>Optional</sup> <a name="include" id="projen.python.PoetryPyprojectOptionsWithoutDeps.property.include"></a>

```typescript
public readonly include: string[];
```

- *Type:* string[]

A list of patterns that will be included in the final package.

---

##### `keywords`<sup>Optional</sup> <a name="keywords" id="projen.python.PoetryPyprojectOptionsWithoutDeps.property.keywords"></a>

```typescript
public readonly keywords: string[];
```

- *Type:* string[]

A list of keywords (max: 5) that the package is related to.

---

##### `license`<sup>Optional</sup> <a name="license" id="projen.python.PoetryPyprojectOptionsWithoutDeps.property.license"></a>

```typescript
public readonly license: string;
```

- *Type:* string

License of this package as an SPDX identifier.

If the project is proprietary and does not use a specific license, you
can set this value as "Proprietary".

---

##### `maintainers`<sup>Optional</sup> <a name="maintainers" id="projen.python.PoetryPyprojectOptionsWithoutDeps.property.maintainers"></a>

```typescript
public readonly maintainers: string[];
```

- *Type:* string[]

the maintainers of the package.

Must be in the form "name <email>"

---

##### `name`<sup>Optional</sup> <a name="name" id="projen.python.PoetryPyprojectOptionsWithoutDeps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

Name of the package (required).

---

##### `packageMode`<sup>Optional</sup> <a name="packageMode" id="projen.python.PoetryPyprojectOptionsWithoutDeps.property.packageMode"></a>

```typescript
public readonly packageMode: boolean;
```

- *Type:* boolean
- *Default:* true

Package mode (optional).

> [https://python-poetry.org/docs/pyproject/#package-mode](https://python-poetry.org/docs/pyproject/#package-mode)

---

*Example*

```typescript
false
```


##### `packages`<sup>Optional</sup> <a name="packages" id="projen.python.PoetryPyprojectOptionsWithoutDeps.property.packages"></a>

```typescript
public readonly packages: any[];
```

- *Type:* any[]

A list of packages and modules to include in the final distribution.

---

##### `plugins`<sup>Optional</sup> <a name="plugins" id="projen.python.PoetryPyprojectOptionsWithoutDeps.property.plugins"></a>

```typescript
public readonly plugins: any;
```

- *Type:* any

Plugins.

Must be specified as a table.

> [https://toml.io/en/v1.0.0#table](https://toml.io/en/v1.0.0#table)

---

##### `readme`<sup>Optional</sup> <a name="readme" id="projen.python.PoetryPyprojectOptionsWithoutDeps.property.readme"></a>

```typescript
public readonly readme: string;
```

- *Type:* string

The name of the readme file of the package.

---

##### `repository`<sup>Optional</sup> <a name="repository" id="projen.python.PoetryPyprojectOptionsWithoutDeps.property.repository"></a>

```typescript
public readonly repository: string;
```

- *Type:* string

A URL to the repository of the project.

---

##### `scripts`<sup>Optional</sup> <a name="scripts" id="projen.python.PoetryPyprojectOptionsWithoutDeps.property.scripts"></a>

```typescript
public readonly scripts: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

The scripts or executables that will be installed when installing the package.

---

##### `source`<sup>Optional</sup> <a name="source" id="projen.python.PoetryPyprojectOptionsWithoutDeps.property.source"></a>

```typescript
public readonly source: any[];
```

- *Type:* any[]

Source registries from which packages are retrieved.

---

##### `urls`<sup>Optional</sup> <a name="urls" id="projen.python.PoetryPyprojectOptionsWithoutDeps.property.urls"></a>

```typescript
public readonly urls: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Project custom URLs, in addition to homepage, repository and documentation.

E.g. "Bug Tracker"

---

##### `version`<sup>Optional</sup> <a name="version" id="projen.python.PoetryPyprojectOptionsWithoutDeps.property.version"></a>

```typescript
public readonly version: string;
```

- *Type:* string

Version of the package (required).

---

### ProjenrcOptions <a name="ProjenrcOptions" id="projen.python.ProjenrcOptions"></a>

Options for `Projenrc`.

#### Initializer <a name="Initializer" id="projen.python.ProjenrcOptions.Initializer"></a>

```typescript
import { python } from 'projen'

const projenrcOptions: python.ProjenrcOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.ProjenrcOptions.property.filename">filename</a></code> | <code>string</code> | The name of the projenrc file. |
| <code><a href="#projen.python.ProjenrcOptions.property.projenVersion">projenVersion</a></code> | <code>string</code> | The projen version to use. |
| <code><a href="#projen.python.ProjenrcOptions.property.pythonExec">pythonExec</a></code> | <code>string</code> | Path to the python executable to use. |

---

##### `filename`<sup>Optional</sup> <a name="filename" id="projen.python.ProjenrcOptions.property.filename"></a>

```typescript
public readonly filename: string;
```

- *Type:* string
- *Default:* ".projenrc.py"

The name of the projenrc file.

---

##### `projenVersion`<sup>Optional</sup> <a name="projenVersion" id="projen.python.ProjenrcOptions.property.projenVersion"></a>

```typescript
public readonly projenVersion: string;
```

- *Type:* string
- *Default:* current version

The projen version to use.

---

##### `pythonExec`<sup>Optional</sup> <a name="pythonExec" id="projen.python.ProjenrcOptions.property.pythonExec"></a>

```typescript
public readonly pythonExec: string;
```

- *Type:* string
- *Default:* "python"

Path to the python executable to use.

---

### PytestOptions <a name="PytestOptions" id="projen.python.PytestOptions"></a>

#### Initializer <a name="Initializer" id="projen.python.PytestOptions.Initializer"></a>

```typescript
import { python } from 'projen'

const pytestOptions: python.PytestOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.PytestOptions.property.maxFailures">maxFailures</a></code> | <code>number</code> | Stop the testing process after the first N failures. |
| <code><a href="#projen.python.PytestOptions.property.testdir">testdir</a></code> | <code>string</code> | Location of sample tests. |
| <code><a href="#projen.python.PytestOptions.property.testMatch">testMatch</a></code> | <code>string[]</code> | List of paths to test files or directories. |
| <code><a href="#projen.python.PytestOptions.property.version">version</a></code> | <code>string</code> | Pytest version. |

---

##### `maxFailures`<sup>Optional</sup> <a name="maxFailures" id="projen.python.PytestOptions.property.maxFailures"></a>

```typescript
public readonly maxFailures: number;
```

- *Type:* number

Stop the testing process after the first N failures.

---

##### ~~`testdir`~~<sup>Optional</sup> <a name="testdir" id="projen.python.PytestOptions.property.testdir"></a>

- *Deprecated:* Reference `sampleTestdir` on the project instead; to change the directory where tests are discovered from, use `testMatch`.

```typescript
public readonly testdir: string;
```

- *Type:* string
- *Default:* "tests"

Location of sample tests.

Typically the same directory where project tests will be located.

---

##### `testMatch`<sup>Optional</sup> <a name="testMatch" id="projen.python.PytestOptions.property.testMatch"></a>

```typescript
public readonly testMatch: string[];
```

- *Type:* string[]
- *Default:* []

List of paths to test files or directories.

Useful when all project tests are in a known location to speed up
test collection and to avoid picking up undesired tests by accident.

Leave empty to discover all test_*.py or *_test.py files, per Pytest default.

The array will be concatenated and passed as a single argument to pytest.

---

*Example*

```typescript
["tests/unit", "tests/qa"]
```


##### `version`<sup>Optional</sup> <a name="version" id="projen.python.PytestOptions.property.version"></a>

```typescript
public readonly version: string;
```

- *Type:* string
- *Default:* "7.4.3"

Pytest version.

---

### PytestSampleOptions <a name="PytestSampleOptions" id="projen.python.PytestSampleOptions"></a>

Options for python test code sample.

#### Initializer <a name="Initializer" id="projen.python.PytestSampleOptions.Initializer"></a>

```typescript
import { python } from 'projen'

const pytestSampleOptions: python.PytestSampleOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.PytestSampleOptions.property.moduleName">moduleName</a></code> | <code>string</code> | Name of the python package as used in imports and filenames. |
| <code><a href="#projen.python.PytestSampleOptions.property.testdir">testdir</a></code> | <code>string</code> | Test directory. |

---

##### `moduleName`<sup>Required</sup> <a name="moduleName" id="projen.python.PytestSampleOptions.property.moduleName"></a>

```typescript
public readonly moduleName: string;
```

- *Type:* string

Name of the python package as used in imports and filenames.

---

##### `testdir`<sup>Required</sup> <a name="testdir" id="projen.python.PytestSampleOptions.property.testdir"></a>

```typescript
public readonly testdir: string;
```

- *Type:* string

Test directory.

---

### PythonExecutableOptions <a name="PythonExecutableOptions" id="projen.python.PythonExecutableOptions"></a>

#### Initializer <a name="Initializer" id="projen.python.PythonExecutableOptions.Initializer"></a>

```typescript
import { python } from 'projen'

const pythonExecutableOptions: python.PythonExecutableOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.PythonExecutableOptions.property.pythonExec">pythonExec</a></code> | <code>string</code> | Path to the python executable to use. |

---

##### `pythonExec`<sup>Optional</sup> <a name="pythonExec" id="projen.python.PythonExecutableOptions.property.pythonExec"></a>

```typescript
public readonly pythonExec: string;
```

- *Type:* string
- *Default:* "python"

Path to the python executable to use.

---

### PythonPackagingOptions <a name="PythonPackagingOptions" id="projen.python.PythonPackagingOptions"></a>

#### Initializer <a name="Initializer" id="projen.python.PythonPackagingOptions.Initializer"></a>

```typescript
import { python } from 'projen'

const pythonPackagingOptions: python.PythonPackagingOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.PythonPackagingOptions.property.authorEmail">authorEmail</a></code> | <code>string</code> | Author's e-mail. |
| <code><a href="#projen.python.PythonPackagingOptions.property.authorName">authorName</a></code> | <code>string</code> | Author's name. |
| <code><a href="#projen.python.PythonPackagingOptions.property.version">version</a></code> | <code>string</code> | Version of the package. |
| <code><a href="#projen.python.PythonPackagingOptions.property.classifiers">classifiers</a></code> | <code>string[]</code> | A list of PyPI trove classifiers that describe the project. |
| <code><a href="#projen.python.PythonPackagingOptions.property.description">description</a></code> | <code>string</code> | A short description of the package. |
| <code><a href="#projen.python.PythonPackagingOptions.property.homepage">homepage</a></code> | <code>string</code> | A URL to the website of the project. |
| <code><a href="#projen.python.PythonPackagingOptions.property.license">license</a></code> | <code>string</code> | License of this package as an SPDX identifier. |
| <code><a href="#projen.python.PythonPackagingOptions.property.packageName">packageName</a></code> | <code>string</code> | Package name. |
| <code><a href="#projen.python.PythonPackagingOptions.property.poetryOptions">poetryOptions</a></code> | <code><a href="#projen.python.PoetryPyprojectOptionsWithoutDeps">PoetryPyprojectOptionsWithoutDeps</a></code> | Additional options to set for poetry if using poetry. |
| <code><a href="#projen.python.PythonPackagingOptions.property.setupConfig">setupConfig</a></code> | <code>{[ key: string ]: any}</code> | Additional fields to pass in the setup() function if using setuptools. |
| <code><a href="#projen.python.PythonPackagingOptions.property.uvOptions">uvOptions</a></code> | <code><a href="#projen.python.UvOptions">UvOptions</a></code> | Additional options to set for uv if using uv. |

---

##### `authorEmail`<sup>Required</sup> <a name="authorEmail" id="projen.python.PythonPackagingOptions.property.authorEmail"></a>

```typescript
public readonly authorEmail: string;
```

- *Type:* string
- *Default:* $GIT_USER_EMAIL

Author's e-mail.

---

##### `authorName`<sup>Required</sup> <a name="authorName" id="projen.python.PythonPackagingOptions.property.authorName"></a>

```typescript
public readonly authorName: string;
```

- *Type:* string
- *Default:* $GIT_USER_NAME

Author's name.

---

##### `version`<sup>Required</sup> <a name="version" id="projen.python.PythonPackagingOptions.property.version"></a>

```typescript
public readonly version: string;
```

- *Type:* string
- *Default:* "0.1.0"

Version of the package.

---

##### `classifiers`<sup>Optional</sup> <a name="classifiers" id="projen.python.PythonPackagingOptions.property.classifiers"></a>

```typescript
public readonly classifiers: string[];
```

- *Type:* string[]

A list of PyPI trove classifiers that describe the project.

> [https://pypi.org/classifiers/](https://pypi.org/classifiers/)

---

##### `description`<sup>Optional</sup> <a name="description" id="projen.python.PythonPackagingOptions.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

A short description of the package.

---

##### `homepage`<sup>Optional</sup> <a name="homepage" id="projen.python.PythonPackagingOptions.property.homepage"></a>

```typescript
public readonly homepage: string;
```

- *Type:* string

A URL to the website of the project.

---

##### `license`<sup>Optional</sup> <a name="license" id="projen.python.PythonPackagingOptions.property.license"></a>

```typescript
public readonly license: string;
```

- *Type:* string

License of this package as an SPDX identifier.

---

##### `packageName`<sup>Optional</sup> <a name="packageName" id="projen.python.PythonPackagingOptions.property.packageName"></a>

```typescript
public readonly packageName: string;
```

- *Type:* string

Package name.

---

##### `poetryOptions`<sup>Optional</sup> <a name="poetryOptions" id="projen.python.PythonPackagingOptions.property.poetryOptions"></a>

```typescript
public readonly poetryOptions: PoetryPyprojectOptionsWithoutDeps;
```

- *Type:* <a href="#projen.python.PoetryPyprojectOptionsWithoutDeps">PoetryPyprojectOptionsWithoutDeps</a>

Additional options to set for poetry if using poetry.

---

##### `setupConfig`<sup>Optional</sup> <a name="setupConfig" id="projen.python.PythonPackagingOptions.property.setupConfig"></a>

```typescript
public readonly setupConfig: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

Additional fields to pass in the setup() function if using setuptools.

---

##### `uvOptions`<sup>Optional</sup> <a name="uvOptions" id="projen.python.PythonPackagingOptions.property.uvOptions"></a>

```typescript
public readonly uvOptions: UvOptions;
```

- *Type:* <a href="#projen.python.UvOptions">UvOptions</a>

Additional options to set for uv if using uv.

---

### PythonProjectOptions <a name="PythonProjectOptions" id="projen.python.PythonProjectOptions"></a>

Options for `PythonProject`.

#### Initializer <a name="Initializer" id="projen.python.PythonProjectOptions.Initializer"></a>

```typescript
import { python } from 'projen'

const pythonProjectOptions: python.PythonProjectOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.PythonProjectOptions.property.name">name</a></code> | <code>string</code> | This is the name of your project. |
| <code><a href="#projen.python.PythonProjectOptions.property.commitGenerated">commitGenerated</a></code> | <code>boolean</code> | Whether to commit the managed files by default. |
| <code><a href="#projen.python.PythonProjectOptions.property.gitIgnoreOptions">gitIgnoreOptions</a></code> | <code>projen.IgnoreFileOptions</code> | Configuration options for .gitignore file. |
| <code><a href="#projen.python.PythonProjectOptions.property.gitOptions">gitOptions</a></code> | <code>projen.GitOptions</code> | Configuration options for git. |
| <code><a href="#projen.python.PythonProjectOptions.property.logging">logging</a></code> | <code>projen.LoggerOptions</code> | Configure logging options such as verbosity. |
| <code><a href="#projen.python.PythonProjectOptions.property.outdir">outdir</a></code> | <code>string</code> | The root directory of the project. |
| <code><a href="#projen.python.PythonProjectOptions.property.parent">parent</a></code> | <code>projen.Project</code> | The parent project, if this project is part of a bigger project. |
| <code><a href="#projen.python.PythonProjectOptions.property.projenCommand">projenCommand</a></code> | <code>string</code> | The shell command to use in order to run the projen CLI. |
| <code><a href="#projen.python.PythonProjectOptions.property.projenrcJson">projenrcJson</a></code> | <code>boolean</code> | Generate (once) .projenrc.json (in JSON). Set to `false` in order to disable .projenrc.json generation. |
| <code><a href="#projen.python.PythonProjectOptions.property.projenrcJsonOptions">projenrcJsonOptions</a></code> | <code>projen.ProjenrcJsonOptions</code> | Options for .projenrc.json. |
| <code><a href="#projen.python.PythonProjectOptions.property.renovatebot">renovatebot</a></code> | <code>boolean</code> | Use renovatebot to handle dependency upgrades. |
| <code><a href="#projen.python.PythonProjectOptions.property.renovatebotOptions">renovatebotOptions</a></code> | <code>projen.RenovatebotOptions</code> | Options for renovatebot. |
| <code><a href="#projen.python.PythonProjectOptions.property.autoApproveOptions">autoApproveOptions</a></code> | <code>projen.github.AutoApproveOptions</code> | Enable and configure the 'auto approve' workflow. |
| <code><a href="#projen.python.PythonProjectOptions.property.autoMerge">autoMerge</a></code> | <code>boolean</code> | Enable automatic merging on GitHub. |
| <code><a href="#projen.python.PythonProjectOptions.property.autoMergeOptions">autoMergeOptions</a></code> | <code>projen.github.AutoMergeOptions</code> | Configure options for automatic merging on GitHub. |
| <code><a href="#projen.python.PythonProjectOptions.property.clobber">clobber</a></code> | <code>boolean</code> | Add a `clobber` task which resets the repo to origin. |
| <code><a href="#projen.python.PythonProjectOptions.property.devContainer">devContainer</a></code> | <code>boolean</code> | Add a VSCode development environment (used for GitHub Codespaces). |
| <code><a href="#projen.python.PythonProjectOptions.property.github">github</a></code> | <code>boolean</code> | Enable GitHub integration. |
| <code><a href="#projen.python.PythonProjectOptions.property.githubOptions">githubOptions</a></code> | <code>projen.github.GitHubOptions</code> | Options for GitHub integration. |
| <code><a href="#projen.python.PythonProjectOptions.property.gitpod">gitpod</a></code> | <code>boolean</code> | Add a Gitpod development environment. |
| <code><a href="#projen.python.PythonProjectOptions.property.mergify">mergify</a></code> | <code>boolean</code> | Whether mergify should be enabled on this repository or not. |
| <code><a href="#projen.python.PythonProjectOptions.property.mergifyOptions">mergifyOptions</a></code> | <code>projen.github.MergifyOptions</code> | Options for mergify. |
| <code><a href="#projen.python.PythonProjectOptions.property.projectType">projectType</a></code> | <code>projen.ProjectType</code> | Which type of project this is (library/app). |
| <code><a href="#projen.python.PythonProjectOptions.property.projenCredentials">projenCredentials</a></code> | <code>projen.github.GithubCredentials</code> | Choose a method of providing GitHub API access for projen workflows. |
| <code><a href="#projen.python.PythonProjectOptions.property.projenTokenSecret">projenTokenSecret</a></code> | <code>string</code> | The name of a secret which includes a GitHub Personal Access Token to be used by projen workflows. |
| <code><a href="#projen.python.PythonProjectOptions.property.readme">readme</a></code> | <code>projen.SampleReadmeProps</code> | The README setup. |
| <code><a href="#projen.python.PythonProjectOptions.property.stale">stale</a></code> | <code>boolean</code> | Auto-close of stale issues and pull request. |
| <code><a href="#projen.python.PythonProjectOptions.property.staleOptions">staleOptions</a></code> | <code>projen.github.StaleOptions</code> | Auto-close stale issues and pull requests. |
| <code><a href="#projen.python.PythonProjectOptions.property.vscode">vscode</a></code> | <code>boolean</code> | Enable VSCode integration. |
| <code><a href="#projen.python.PythonProjectOptions.property.authorEmail">authorEmail</a></code> | <code>string</code> | Author's e-mail. |
| <code><a href="#projen.python.PythonProjectOptions.property.authorName">authorName</a></code> | <code>string</code> | Author's name. |
| <code><a href="#projen.python.PythonProjectOptions.property.version">version</a></code> | <code>string</code> | Version of the package. |
| <code><a href="#projen.python.PythonProjectOptions.property.classifiers">classifiers</a></code> | <code>string[]</code> | A list of PyPI trove classifiers that describe the project. |
| <code><a href="#projen.python.PythonProjectOptions.property.description">description</a></code> | <code>string</code> | A short description of the package. |
| <code><a href="#projen.python.PythonProjectOptions.property.homepage">homepage</a></code> | <code>string</code> | A URL to the website of the project. |
| <code><a href="#projen.python.PythonProjectOptions.property.license">license</a></code> | <code>string</code> | License of this package as an SPDX identifier. |
| <code><a href="#projen.python.PythonProjectOptions.property.packageName">packageName</a></code> | <code>string</code> | Package name. |
| <code><a href="#projen.python.PythonProjectOptions.property.poetryOptions">poetryOptions</a></code> | <code><a href="#projen.python.PoetryPyprojectOptionsWithoutDeps">PoetryPyprojectOptionsWithoutDeps</a></code> | Additional options to set for poetry if using poetry. |
| <code><a href="#projen.python.PythonProjectOptions.property.setupConfig">setupConfig</a></code> | <code>{[ key: string ]: any}</code> | Additional fields to pass in the setup() function if using setuptools. |
| <code><a href="#projen.python.PythonProjectOptions.property.uvOptions">uvOptions</a></code> | <code><a href="#projen.python.UvOptions">UvOptions</a></code> | Additional options to set for uv if using uv. |
| <code><a href="#projen.python.PythonProjectOptions.property.pythonExec">pythonExec</a></code> | <code>string</code> | Path to the python executable to use. |
| <code><a href="#projen.python.PythonProjectOptions.property.moduleName">moduleName</a></code> | <code>string</code> | Name of the python package as used in imports and filenames. |
| <code><a href="#projen.python.PythonProjectOptions.property.deps">deps</a></code> | <code>string[]</code> | List of runtime dependencies for this project. |
| <code><a href="#projen.python.PythonProjectOptions.property.devDeps">devDeps</a></code> | <code>string[]</code> | List of dev dependencies for this project. |
| <code><a href="#projen.python.PythonProjectOptions.property.pip">pip</a></code> | <code>boolean</code> | Use pip with a requirements.txt file to track project dependencies. |
| <code><a href="#projen.python.PythonProjectOptions.property.poetry">poetry</a></code> | <code>boolean</code> | Use poetry to manage your project dependencies, virtual environment, and (optional) packaging/publishing. |
| <code><a href="#projen.python.PythonProjectOptions.property.projenrcJs">projenrcJs</a></code> | <code>boolean</code> | Use projenrc in javascript. |
| <code><a href="#projen.python.PythonProjectOptions.property.projenrcJsOptions">projenrcJsOptions</a></code> | <code>projen.javascript.ProjenrcOptions</code> | Options related to projenrc in JavaScript. |
| <code><a href="#projen.python.PythonProjectOptions.property.projenrcPython">projenrcPython</a></code> | <code>boolean</code> | Use projenrc in Python. |
| <code><a href="#projen.python.PythonProjectOptions.property.projenrcPythonOptions">projenrcPythonOptions</a></code> | <code><a href="#projen.python.ProjenrcOptions">ProjenrcOptions</a></code> | Options related to projenrc in python. |
| <code><a href="#projen.python.PythonProjectOptions.property.projenrcTs">projenrcTs</a></code> | <code>boolean</code> | Use projenrc in TypeScript. |
| <code><a href="#projen.python.PythonProjectOptions.property.projenrcTsOptions">projenrcTsOptions</a></code> | <code>projen.typescript.ProjenrcTsOptions</code> | Options related to projenrc in TypeScript. |
| <code><a href="#projen.python.PythonProjectOptions.property.pytest">pytest</a></code> | <code>boolean</code> | Include pytest tests. |
| <code><a href="#projen.python.PythonProjectOptions.property.pytestOptions">pytestOptions</a></code> | <code><a href="#projen.python.PytestOptions">PytestOptions</a></code> | pytest options. |
| <code><a href="#projen.python.PythonProjectOptions.property.sample">sample</a></code> | <code>boolean</code> | Include sample code and test if the relevant directories don't exist. |
| <code><a href="#projen.python.PythonProjectOptions.property.sampleTestdir">sampleTestdir</a></code> | <code>string</code> | Location of sample tests. |
| <code><a href="#projen.python.PythonProjectOptions.property.setuptools">setuptools</a></code> | <code>boolean</code> | Use setuptools with a setup.py script for packaging and publishing. |
| <code><a href="#projen.python.PythonProjectOptions.property.uv">uv</a></code> | <code>boolean</code> | Use uv to manage your project dependencies, virtual environment, and (optional) packaging/publishing. |
| <code><a href="#projen.python.PythonProjectOptions.property.venv">venv</a></code> | <code>boolean</code> | Use venv to manage a virtual environment for installing dependencies inside. |
| <code><a href="#projen.python.PythonProjectOptions.property.venvOptions">venvOptions</a></code> | <code><a href="#projen.python.VenvOptions">VenvOptions</a></code> | Venv options. |

---

##### `name`<sup>Required</sup> <a name="name" id="projen.python.PythonProjectOptions.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string
- *Default:* $BASEDIR

This is the name of your project.

---

##### `commitGenerated`<sup>Optional</sup> <a name="commitGenerated" id="projen.python.PythonProjectOptions.property.commitGenerated"></a>

```typescript
public readonly commitGenerated: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to commit the managed files by default.

---

##### `gitIgnoreOptions`<sup>Optional</sup> <a name="gitIgnoreOptions" id="projen.python.PythonProjectOptions.property.gitIgnoreOptions"></a>

```typescript
public readonly gitIgnoreOptions: IgnoreFileOptions;
```

- *Type:* projen.IgnoreFileOptions

Configuration options for .gitignore file.

---

##### `gitOptions`<sup>Optional</sup> <a name="gitOptions" id="projen.python.PythonProjectOptions.property.gitOptions"></a>

```typescript
public readonly gitOptions: GitOptions;
```

- *Type:* projen.GitOptions

Configuration options for git.

---

##### `logging`<sup>Optional</sup> <a name="logging" id="projen.python.PythonProjectOptions.property.logging"></a>

```typescript
public readonly logging: LoggerOptions;
```

- *Type:* projen.LoggerOptions
- *Default:* {}

Configure logging options such as verbosity.

---

##### `outdir`<sup>Optional</sup> <a name="outdir" id="projen.python.PythonProjectOptions.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* string
- *Default:* "."

The root directory of the project.

Relative to this directory, all files are synthesized.

If this project has a parent, this directory is relative to the parent
directory and it cannot be the same as the parent or any of it's other
subprojects.

---

##### `parent`<sup>Optional</sup> <a name="parent" id="projen.python.PythonProjectOptions.property.parent"></a>

```typescript
public readonly parent: Project;
```

- *Type:* projen.Project

The parent project, if this project is part of a bigger project.

---

##### `projenCommand`<sup>Optional</sup> <a name="projenCommand" id="projen.python.PythonProjectOptions.property.projenCommand"></a>

```typescript
public readonly projenCommand: string;
```

- *Type:* string
- *Default:* "npx projen"

The shell command to use in order to run the projen CLI.

Can be used to customize in special environments.

---

##### `projenrcJson`<sup>Optional</sup> <a name="projenrcJson" id="projen.python.PythonProjectOptions.property.projenrcJson"></a>

```typescript
public readonly projenrcJson: boolean;
```

- *Type:* boolean
- *Default:* false

Generate (once) .projenrc.json (in JSON). Set to `false` in order to disable .projenrc.json generation.

---

##### `projenrcJsonOptions`<sup>Optional</sup> <a name="projenrcJsonOptions" id="projen.python.PythonProjectOptions.property.projenrcJsonOptions"></a>

```typescript
public readonly projenrcJsonOptions: ProjenrcJsonOptions;
```

- *Type:* projen.ProjenrcJsonOptions
- *Default:* default options

Options for .projenrc.json.

---

##### `renovatebot`<sup>Optional</sup> <a name="renovatebot" id="projen.python.PythonProjectOptions.property.renovatebot"></a>

```typescript
public readonly renovatebot: boolean;
```

- *Type:* boolean
- *Default:* false

Use renovatebot to handle dependency upgrades.

---

##### `renovatebotOptions`<sup>Optional</sup> <a name="renovatebotOptions" id="projen.python.PythonProjectOptions.property.renovatebotOptions"></a>

```typescript
public readonly renovatebotOptions: RenovatebotOptions;
```

- *Type:* projen.RenovatebotOptions
- *Default:* default options

Options for renovatebot.

---

##### `autoApproveOptions`<sup>Optional</sup> <a name="autoApproveOptions" id="projen.python.PythonProjectOptions.property.autoApproveOptions"></a>

```typescript
public readonly autoApproveOptions: AutoApproveOptions;
```

- *Type:* projen.github.AutoApproveOptions
- *Default:* auto approve is disabled

Enable and configure the 'auto approve' workflow.

---

##### `autoMerge`<sup>Optional</sup> <a name="autoMerge" id="projen.python.PythonProjectOptions.property.autoMerge"></a>

```typescript
public readonly autoMerge: boolean;
```

- *Type:* boolean
- *Default:* true

Enable automatic merging on GitHub.

Has no effect if `github.mergify`
is set to false.

---

##### `autoMergeOptions`<sup>Optional</sup> <a name="autoMergeOptions" id="projen.python.PythonProjectOptions.property.autoMergeOptions"></a>

```typescript
public readonly autoMergeOptions: AutoMergeOptions;
```

- *Type:* projen.github.AutoMergeOptions
- *Default:* see defaults in `AutoMergeOptions`

Configure options for automatic merging on GitHub.

Has no effect if
`github.mergify` or `autoMerge` is set to false.

---

##### `clobber`<sup>Optional</sup> <a name="clobber" id="projen.python.PythonProjectOptions.property.clobber"></a>

```typescript
public readonly clobber: boolean;
```

- *Type:* boolean
- *Default:* true, but false for subprojects

Add a `clobber` task which resets the repo to origin.

---

##### `devContainer`<sup>Optional</sup> <a name="devContainer" id="projen.python.PythonProjectOptions.property.devContainer"></a>

```typescript
public readonly devContainer: boolean;
```

- *Type:* boolean
- *Default:* false

Add a VSCode development environment (used for GitHub Codespaces).

---

##### `github`<sup>Optional</sup> <a name="github" id="projen.python.PythonProjectOptions.property.github"></a>

```typescript
public readonly github: boolean;
```

- *Type:* boolean
- *Default:* true

Enable GitHub integration.

Enabled by default for root projects. Disabled for non-root projects.

---

##### `githubOptions`<sup>Optional</sup> <a name="githubOptions" id="projen.python.PythonProjectOptions.property.githubOptions"></a>

```typescript
public readonly githubOptions: GitHubOptions;
```

- *Type:* projen.github.GitHubOptions
- *Default:* see GitHubOptions

Options for GitHub integration.

---

##### `gitpod`<sup>Optional</sup> <a name="gitpod" id="projen.python.PythonProjectOptions.property.gitpod"></a>

```typescript
public readonly gitpod: boolean;
```

- *Type:* boolean
- *Default:* false

Add a Gitpod development environment.

---

##### ~~`mergify`~~<sup>Optional</sup> <a name="mergify" id="projen.python.PythonProjectOptions.property.mergify"></a>

- *Deprecated:* use `githubOptions.mergify` instead

```typescript
public readonly mergify: boolean;
```

- *Type:* boolean
- *Default:* true

Whether mergify should be enabled on this repository or not.

---

##### ~~`mergifyOptions`~~<sup>Optional</sup> <a name="mergifyOptions" id="projen.python.PythonProjectOptions.property.mergifyOptions"></a>

- *Deprecated:* use `githubOptions.mergifyOptions` instead

```typescript
public readonly mergifyOptions: MergifyOptions;
```

- *Type:* projen.github.MergifyOptions
- *Default:* default options

Options for mergify.

---

##### ~~`projectType`~~<sup>Optional</sup> <a name="projectType" id="projen.python.PythonProjectOptions.property.projectType"></a>

- *Deprecated:* no longer supported at the base project level

```typescript
public readonly projectType: ProjectType;
```

- *Type:* projen.ProjectType
- *Default:* ProjectType.UNKNOWN

Which type of project this is (library/app).

---

##### `projenCredentials`<sup>Optional</sup> <a name="projenCredentials" id="projen.python.PythonProjectOptions.property.projenCredentials"></a>

```typescript
public readonly projenCredentials: GithubCredentials;
```

- *Type:* projen.github.GithubCredentials
- *Default:* use a personal access token named PROJEN_GITHUB_TOKEN

Choose a method of providing GitHub API access for projen workflows.

---

##### ~~`projenTokenSecret`~~<sup>Optional</sup> <a name="projenTokenSecret" id="projen.python.PythonProjectOptions.property.projenTokenSecret"></a>

- *Deprecated:* use `projenCredentials`

```typescript
public readonly projenTokenSecret: string;
```

- *Type:* string
- *Default:* "PROJEN_GITHUB_TOKEN"

The name of a secret which includes a GitHub Personal Access Token to be used by projen workflows.

This token needs to have the `repo`, `workflows`
and `packages` scope.

---

##### `readme`<sup>Optional</sup> <a name="readme" id="projen.python.PythonProjectOptions.property.readme"></a>

```typescript
public readonly readme: SampleReadmeProps;
```

- *Type:* projen.SampleReadmeProps
- *Default:* { filename: 'README.md', contents: '# replace this' }

The README setup.

---

*Example*

```typescript
"{ filename: 'readme.md', contents: '# title' }"
```


##### `stale`<sup>Optional</sup> <a name="stale" id="projen.python.PythonProjectOptions.property.stale"></a>

```typescript
public readonly stale: boolean;
```

- *Type:* boolean
- *Default:* false

Auto-close of stale issues and pull request.

See `staleOptions` for options.

---

##### `staleOptions`<sup>Optional</sup> <a name="staleOptions" id="projen.python.PythonProjectOptions.property.staleOptions"></a>

```typescript
public readonly staleOptions: StaleOptions;
```

- *Type:* projen.github.StaleOptions
- *Default:* see defaults in `StaleOptions`

Auto-close stale issues and pull requests.

To disable set `stale` to `false`.

---

##### `vscode`<sup>Optional</sup> <a name="vscode" id="projen.python.PythonProjectOptions.property.vscode"></a>

```typescript
public readonly vscode: boolean;
```

- *Type:* boolean
- *Default:* true

Enable VSCode integration.

Enabled by default for root projects. Disabled for non-root projects.

---

##### `authorEmail`<sup>Required</sup> <a name="authorEmail" id="projen.python.PythonProjectOptions.property.authorEmail"></a>

```typescript
public readonly authorEmail: string;
```

- *Type:* string
- *Default:* $GIT_USER_EMAIL

Author's e-mail.

---

##### `authorName`<sup>Required</sup> <a name="authorName" id="projen.python.PythonProjectOptions.property.authorName"></a>

```typescript
public readonly authorName: string;
```

- *Type:* string
- *Default:* $GIT_USER_NAME

Author's name.

---

##### `version`<sup>Required</sup> <a name="version" id="projen.python.PythonProjectOptions.property.version"></a>

```typescript
public readonly version: string;
```

- *Type:* string
- *Default:* "0.1.0"

Version of the package.

---

##### `classifiers`<sup>Optional</sup> <a name="classifiers" id="projen.python.PythonProjectOptions.property.classifiers"></a>

```typescript
public readonly classifiers: string[];
```

- *Type:* string[]

A list of PyPI trove classifiers that describe the project.

> [https://pypi.org/classifiers/](https://pypi.org/classifiers/)

---

##### `description`<sup>Optional</sup> <a name="description" id="projen.python.PythonProjectOptions.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

A short description of the package.

---

##### `homepage`<sup>Optional</sup> <a name="homepage" id="projen.python.PythonProjectOptions.property.homepage"></a>

```typescript
public readonly homepage: string;
```

- *Type:* string

A URL to the website of the project.

---

##### `license`<sup>Optional</sup> <a name="license" id="projen.python.PythonProjectOptions.property.license"></a>

```typescript
public readonly license: string;
```

- *Type:* string

License of this package as an SPDX identifier.

---

##### `packageName`<sup>Optional</sup> <a name="packageName" id="projen.python.PythonProjectOptions.property.packageName"></a>

```typescript
public readonly packageName: string;
```

- *Type:* string

Package name.

---

##### `poetryOptions`<sup>Optional</sup> <a name="poetryOptions" id="projen.python.PythonProjectOptions.property.poetryOptions"></a>

```typescript
public readonly poetryOptions: PoetryPyprojectOptionsWithoutDeps;
```

- *Type:* <a href="#projen.python.PoetryPyprojectOptionsWithoutDeps">PoetryPyprojectOptionsWithoutDeps</a>

Additional options to set for poetry if using poetry.

---

##### `setupConfig`<sup>Optional</sup> <a name="setupConfig" id="projen.python.PythonProjectOptions.property.setupConfig"></a>

```typescript
public readonly setupConfig: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

Additional fields to pass in the setup() function if using setuptools.

---

##### `uvOptions`<sup>Optional</sup> <a name="uvOptions" id="projen.python.PythonProjectOptions.property.uvOptions"></a>

```typescript
public readonly uvOptions: UvOptions;
```

- *Type:* <a href="#projen.python.UvOptions">UvOptions</a>

Additional options to set for uv if using uv.

---

##### `pythonExec`<sup>Optional</sup> <a name="pythonExec" id="projen.python.PythonProjectOptions.property.pythonExec"></a>

```typescript
public readonly pythonExec: string;
```

- *Type:* string
- *Default:* "python"

Path to the python executable to use.

---

##### `moduleName`<sup>Required</sup> <a name="moduleName" id="projen.python.PythonProjectOptions.property.moduleName"></a>

```typescript
public readonly moduleName: string;
```

- *Type:* string
- *Default:* $PYTHON_MODULE_NAME

Name of the python package as used in imports and filenames.

Must only consist of alphanumeric characters and underscores.

---

##### `deps`<sup>Optional</sup> <a name="deps" id="projen.python.PythonProjectOptions.property.deps"></a>

```typescript
public readonly deps: string[];
```

- *Type:* string[]
- *Default:* []

List of runtime dependencies for this project.

Dependencies use the format: `<module>@<semver>`

Additional dependencies can be added via `project.addDependency()`.

---

##### `devDeps`<sup>Optional</sup> <a name="devDeps" id="projen.python.PythonProjectOptions.property.devDeps"></a>

```typescript
public readonly devDeps: string[];
```

- *Type:* string[]
- *Default:* []

List of dev dependencies for this project.

Dependencies use the format: `<module>@<semver>`

Additional dependencies can be added via `project.addDevDependency()`.

---

##### `pip`<sup>Optional</sup> <a name="pip" id="projen.python.PythonProjectOptions.property.pip"></a>

```typescript
public readonly pip: boolean;
```

- *Type:* boolean
- *Default:* true, unless poetry is true, then false

Use pip with a requirements.txt file to track project dependencies.

---

##### `poetry`<sup>Optional</sup> <a name="poetry" id="projen.python.PythonProjectOptions.property.poetry"></a>

```typescript
public readonly poetry: boolean;
```

- *Type:* boolean
- *Default:* false

Use poetry to manage your project dependencies, virtual environment, and (optional) packaging/publishing.

This feature is incompatible with pip, setuptools, or venv.
If you set this option to `true`, then pip, setuptools, and venv must be set to `false`.

---

##### `projenrcJs`<sup>Optional</sup> <a name="projenrcJs" id="projen.python.PythonProjectOptions.property.projenrcJs"></a>

```typescript
public readonly projenrcJs: boolean;
```

- *Type:* boolean
- *Default:* false

Use projenrc in javascript.

This will install `projen` as a JavaScript dependency and add a `synth`
task which will run `.projenrc.js`.

---

##### `projenrcJsOptions`<sup>Optional</sup> <a name="projenrcJsOptions" id="projen.python.PythonProjectOptions.property.projenrcJsOptions"></a>

```typescript
public readonly projenrcJsOptions: ProjenrcOptions;
```

- *Type:* projen.javascript.ProjenrcOptions
- *Default:* default options

Options related to projenrc in JavaScript.

---

##### `projenrcPython`<sup>Optional</sup> <a name="projenrcPython" id="projen.python.PythonProjectOptions.property.projenrcPython"></a>

```typescript
public readonly projenrcPython: boolean;
```

- *Type:* boolean
- *Default:* true

Use projenrc in Python.

This will install `projen` as a Python dependency and add a `synth`
task which will run `.projenrc.py`.

---

##### `projenrcPythonOptions`<sup>Optional</sup> <a name="projenrcPythonOptions" id="projen.python.PythonProjectOptions.property.projenrcPythonOptions"></a>

```typescript
public readonly projenrcPythonOptions: ProjenrcOptions;
```

- *Type:* <a href="#projen.python.ProjenrcOptions">ProjenrcOptions</a>
- *Default:* default options

Options related to projenrc in python.

---

##### `projenrcTs`<sup>Optional</sup> <a name="projenrcTs" id="projen.python.PythonProjectOptions.property.projenrcTs"></a>

```typescript
public readonly projenrcTs: boolean;
```

- *Type:* boolean
- *Default:* false

Use projenrc in TypeScript.

This will create a tsconfig file (default: `tsconfig.projen.json`)
and use `ts-node` in the default task to parse the project source files.

---

##### `projenrcTsOptions`<sup>Optional</sup> <a name="projenrcTsOptions" id="projen.python.PythonProjectOptions.property.projenrcTsOptions"></a>

```typescript
public readonly projenrcTsOptions: ProjenrcTsOptions;
```

- *Type:* projen.typescript.ProjenrcTsOptions
- *Default:* default options

Options related to projenrc in TypeScript.

---

##### `pytest`<sup>Optional</sup> <a name="pytest" id="projen.python.PythonProjectOptions.property.pytest"></a>

```typescript
public readonly pytest: boolean;
```

- *Type:* boolean
- *Default:* true

Include pytest tests.

---

##### `pytestOptions`<sup>Optional</sup> <a name="pytestOptions" id="projen.python.PythonProjectOptions.property.pytestOptions"></a>

```typescript
public readonly pytestOptions: PytestOptions;
```

- *Type:* <a href="#projen.python.PytestOptions">PytestOptions</a>
- *Default:* defaults

pytest options.

---

##### `sample`<sup>Optional</sup> <a name="sample" id="projen.python.PythonProjectOptions.property.sample"></a>

```typescript
public readonly sample: boolean;
```

- *Type:* boolean
- *Default:* true

Include sample code and test if the relevant directories don't exist.

---

##### `sampleTestdir`<sup>Optional</sup> <a name="sampleTestdir" id="projen.python.PythonProjectOptions.property.sampleTestdir"></a>

```typescript
public readonly sampleTestdir: string;
```

- *Type:* string
- *Default:* "tests"

Location of sample tests.

Typically the same directory where project tests will be located.

---

##### `setuptools`<sup>Optional</sup> <a name="setuptools" id="projen.python.PythonProjectOptions.property.setuptools"></a>

```typescript
public readonly setuptools: boolean;
```

- *Type:* boolean
- *Default:* true, unless poetry is true, then false

Use setuptools with a setup.py script for packaging and publishing.

---

##### `uv`<sup>Optional</sup> <a name="uv" id="projen.python.PythonProjectOptions.property.uv"></a>

```typescript
public readonly uv: boolean;
```

- *Type:* boolean
- *Default:* false

Use uv to manage your project dependencies, virtual environment, and (optional) packaging/publishing.

---

##### `venv`<sup>Optional</sup> <a name="venv" id="projen.python.PythonProjectOptions.property.venv"></a>

```typescript
public readonly venv: boolean;
```

- *Type:* boolean
- *Default:* true, unless poetry is true, then false

Use venv to manage a virtual environment for installing dependencies inside.

---

##### `venvOptions`<sup>Optional</sup> <a name="venvOptions" id="projen.python.PythonProjectOptions.property.venvOptions"></a>

```typescript
public readonly venvOptions: VenvOptions;
```

- *Type:* <a href="#projen.python.VenvOptions">VenvOptions</a>
- *Default:* defaults

Venv options.

---

### PythonSampleOptions <a name="PythonSampleOptions" id="projen.python.PythonSampleOptions"></a>

Options for python sample code.

#### Initializer <a name="Initializer" id="projen.python.PythonSampleOptions.Initializer"></a>

```typescript
import { python } from 'projen'

const pythonSampleOptions: python.PythonSampleOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.PythonSampleOptions.property.dir">dir</a></code> | <code>string</code> | Sample code directory. |

---

##### `dir`<sup>Required</sup> <a name="dir" id="projen.python.PythonSampleOptions.property.dir"></a>

```typescript
public readonly dir: string;
```

- *Type:* string

Sample code directory.

---

### RequirementsFileOptions <a name="RequirementsFileOptions" id="projen.python.RequirementsFileOptions"></a>

#### Initializer <a name="Initializer" id="projen.python.RequirementsFileOptions.Initializer"></a>

```typescript
import { python } from 'projen'

const requirementsFileOptions: python.RequirementsFileOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.RequirementsFileOptions.property.packageProvider">packageProvider</a></code> | <code><a href="#projen.python.IPackageProvider">IPackageProvider</a></code> | Provide a list of packages that can be dynamically updated. |

---

##### `packageProvider`<sup>Optional</sup> <a name="packageProvider" id="projen.python.RequirementsFileOptions.property.packageProvider"></a>

```typescript
public readonly packageProvider: IPackageProvider;
```

- *Type:* <a href="#projen.python.IPackageProvider">IPackageProvider</a>

Provide a list of packages that can be dynamically updated.

---

### SetupPyOptions <a name="SetupPyOptions" id="projen.python.SetupPyOptions"></a>

Fields to pass in the setup() function of setup.py.

> [https://docs.python.org/3/distutils/setupscript.html](https://docs.python.org/3/distutils/setupscript.html)

#### Initializer <a name="Initializer" id="projen.python.SetupPyOptions.Initializer"></a>

```typescript
import { python } from 'projen'

const setupPyOptions: python.SetupPyOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.SetupPyOptions.property.additionalOptions">additionalOptions</a></code> | <code>{[ key: string ]: any}</code> | Escape hatch to allow any value. |
| <code><a href="#projen.python.SetupPyOptions.property.authorEmail">authorEmail</a></code> | <code>string</code> | Author's e-mail. |
| <code><a href="#projen.python.SetupPyOptions.property.authorName">authorName</a></code> | <code>string</code> | Author's name. |
| <code><a href="#projen.python.SetupPyOptions.property.classifiers">classifiers</a></code> | <code>string[]</code> | A list of PyPI trove classifiers that describe the project. |
| <code><a href="#projen.python.SetupPyOptions.property.description">description</a></code> | <code>string</code> | A short project description. |
| <code><a href="#projen.python.SetupPyOptions.property.homepage">homepage</a></code> | <code>string</code> | Package's Homepage / Website. |
| <code><a href="#projen.python.SetupPyOptions.property.license">license</a></code> | <code>string</code> | The project license. |
| <code><a href="#projen.python.SetupPyOptions.property.name">name</a></code> | <code>string</code> | Name of the package. |
| <code><a href="#projen.python.SetupPyOptions.property.packages">packages</a></code> | <code>string[]</code> | List of submodules to be packaged. |
| <code><a href="#projen.python.SetupPyOptions.property.version">version</a></code> | <code>string</code> | Manually specify package version. |

---

##### `additionalOptions`<sup>Optional</sup> <a name="additionalOptions" id="projen.python.SetupPyOptions.property.additionalOptions"></a>

```typescript
public readonly additionalOptions: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

Escape hatch to allow any value.

---

##### `authorEmail`<sup>Optional</sup> <a name="authorEmail" id="projen.python.SetupPyOptions.property.authorEmail"></a>

```typescript
public readonly authorEmail: string;
```

- *Type:* string

Author's e-mail.

---

##### `authorName`<sup>Optional</sup> <a name="authorName" id="projen.python.SetupPyOptions.property.authorName"></a>

```typescript
public readonly authorName: string;
```

- *Type:* string

Author's name.

---

##### `classifiers`<sup>Optional</sup> <a name="classifiers" id="projen.python.SetupPyOptions.property.classifiers"></a>

```typescript
public readonly classifiers: string[];
```

- *Type:* string[]

A list of PyPI trove classifiers that describe the project.

> [https://pypi.org/classifiers/](https://pypi.org/classifiers/)

---

##### `description`<sup>Optional</sup> <a name="description" id="projen.python.SetupPyOptions.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

A short project description.

---

##### `homepage`<sup>Optional</sup> <a name="homepage" id="projen.python.SetupPyOptions.property.homepage"></a>

```typescript
public readonly homepage: string;
```

- *Type:* string

Package's Homepage / Website.

---

##### `license`<sup>Optional</sup> <a name="license" id="projen.python.SetupPyOptions.property.license"></a>

```typescript
public readonly license: string;
```

- *Type:* string

The project license.

---

##### `name`<sup>Optional</sup> <a name="name" id="projen.python.SetupPyOptions.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

Name of the package.

---

##### `packages`<sup>Optional</sup> <a name="packages" id="projen.python.SetupPyOptions.property.packages"></a>

```typescript
public readonly packages: string[];
```

- *Type:* string[]

List of submodules to be packaged.

---

##### `version`<sup>Optional</sup> <a name="version" id="projen.python.SetupPyOptions.property.version"></a>

```typescript
public readonly version: string;
```

- *Type:* string

Manually specify package version.

---

### SetuptoolsOptions <a name="SetuptoolsOptions" id="projen.python.SetuptoolsOptions"></a>

#### Initializer <a name="Initializer" id="projen.python.SetuptoolsOptions.Initializer"></a>

```typescript
import { python } from 'projen'

const setuptoolsOptions: python.SetuptoolsOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.SetuptoolsOptions.property.authorEmail">authorEmail</a></code> | <code>string</code> | Author's e-mail. |
| <code><a href="#projen.python.SetuptoolsOptions.property.authorName">authorName</a></code> | <code>string</code> | Author's name. |
| <code><a href="#projen.python.SetuptoolsOptions.property.version">version</a></code> | <code>string</code> | Version of the package. |
| <code><a href="#projen.python.SetuptoolsOptions.property.classifiers">classifiers</a></code> | <code>string[]</code> | A list of PyPI trove classifiers that describe the project. |
| <code><a href="#projen.python.SetuptoolsOptions.property.description">description</a></code> | <code>string</code> | A short description of the package. |
| <code><a href="#projen.python.SetuptoolsOptions.property.homepage">homepage</a></code> | <code>string</code> | A URL to the website of the project. |
| <code><a href="#projen.python.SetuptoolsOptions.property.license">license</a></code> | <code>string</code> | License of this package as an SPDX identifier. |
| <code><a href="#projen.python.SetuptoolsOptions.property.packageName">packageName</a></code> | <code>string</code> | Package name. |
| <code><a href="#projen.python.SetuptoolsOptions.property.poetryOptions">poetryOptions</a></code> | <code><a href="#projen.python.PoetryPyprojectOptionsWithoutDeps">PoetryPyprojectOptionsWithoutDeps</a></code> | Additional options to set for poetry if using poetry. |
| <code><a href="#projen.python.SetuptoolsOptions.property.setupConfig">setupConfig</a></code> | <code>{[ key: string ]: any}</code> | Additional fields to pass in the setup() function if using setuptools. |
| <code><a href="#projen.python.SetuptoolsOptions.property.uvOptions">uvOptions</a></code> | <code><a href="#projen.python.UvOptions">UvOptions</a></code> | Additional options to set for uv if using uv. |
| <code><a href="#projen.python.SetuptoolsOptions.property.pythonExec">pythonExec</a></code> | <code>string</code> | Path to the python executable to use. |

---

##### `authorEmail`<sup>Required</sup> <a name="authorEmail" id="projen.python.SetuptoolsOptions.property.authorEmail"></a>

```typescript
public readonly authorEmail: string;
```

- *Type:* string
- *Default:* $GIT_USER_EMAIL

Author's e-mail.

---

##### `authorName`<sup>Required</sup> <a name="authorName" id="projen.python.SetuptoolsOptions.property.authorName"></a>

```typescript
public readonly authorName: string;
```

- *Type:* string
- *Default:* $GIT_USER_NAME

Author's name.

---

##### `version`<sup>Required</sup> <a name="version" id="projen.python.SetuptoolsOptions.property.version"></a>

```typescript
public readonly version: string;
```

- *Type:* string
- *Default:* "0.1.0"

Version of the package.

---

##### `classifiers`<sup>Optional</sup> <a name="classifiers" id="projen.python.SetuptoolsOptions.property.classifiers"></a>

```typescript
public readonly classifiers: string[];
```

- *Type:* string[]

A list of PyPI trove classifiers that describe the project.

> [https://pypi.org/classifiers/](https://pypi.org/classifiers/)

---

##### `description`<sup>Optional</sup> <a name="description" id="projen.python.SetuptoolsOptions.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

A short description of the package.

---

##### `homepage`<sup>Optional</sup> <a name="homepage" id="projen.python.SetuptoolsOptions.property.homepage"></a>

```typescript
public readonly homepage: string;
```

- *Type:* string

A URL to the website of the project.

---

##### `license`<sup>Optional</sup> <a name="license" id="projen.python.SetuptoolsOptions.property.license"></a>

```typescript
public readonly license: string;
```

- *Type:* string

License of this package as an SPDX identifier.

---

##### `packageName`<sup>Optional</sup> <a name="packageName" id="projen.python.SetuptoolsOptions.property.packageName"></a>

```typescript
public readonly packageName: string;
```

- *Type:* string

Package name.

---

##### `poetryOptions`<sup>Optional</sup> <a name="poetryOptions" id="projen.python.SetuptoolsOptions.property.poetryOptions"></a>

```typescript
public readonly poetryOptions: PoetryPyprojectOptionsWithoutDeps;
```

- *Type:* <a href="#projen.python.PoetryPyprojectOptionsWithoutDeps">PoetryPyprojectOptionsWithoutDeps</a>

Additional options to set for poetry if using poetry.

---

##### `setupConfig`<sup>Optional</sup> <a name="setupConfig" id="projen.python.SetuptoolsOptions.property.setupConfig"></a>

```typescript
public readonly setupConfig: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

Additional fields to pass in the setup() function if using setuptools.

---

##### `uvOptions`<sup>Optional</sup> <a name="uvOptions" id="projen.python.SetuptoolsOptions.property.uvOptions"></a>

```typescript
public readonly uvOptions: UvOptions;
```

- *Type:* <a href="#projen.python.UvOptions">UvOptions</a>

Additional options to set for uv if using uv.

---

##### `pythonExec`<sup>Optional</sup> <a name="pythonExec" id="projen.python.SetuptoolsOptions.property.pythonExec"></a>

```typescript
public readonly pythonExec: string;
```

- *Type:* string
- *Default:* "python"

Path to the python executable to use.

---

### UvBaseOptions <a name="UvBaseOptions" id="projen.python.UvBaseOptions"></a>

Base options for UV project configuration.

#### Initializer <a name="Initializer" id="projen.python.UvBaseOptions.Initializer"></a>

```typescript
import { python } from 'projen'

const uvBaseOptions: python.UvBaseOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.UvBaseOptions.property.addBounds">addBounds</a></code> | <code>string</code> | The default version specifier when adding a dependency. |
| <code><a href="#projen.python.UvBaseOptions.property.allowInsecureHost">allowInsecureHost</a></code> | <code>string[]</code> | Allow insecure connections to host. |
| <code><a href="#projen.python.UvBaseOptions.property.authorEmail">authorEmail</a></code> | <code>string</code> | Email of the package author. |
| <code><a href="#projen.python.UvBaseOptions.property.authorName">authorName</a></code> | <code>string</code> | Name of the package author. |
| <code><a href="#projen.python.UvBaseOptions.property.buildBackend">buildBackend</a></code> | <code><a href="#projen.python.UvBuildBackend">UvBuildBackend</a></code> | Settings for the uv build backend (uv_build). |
| <code><a href="#projen.python.UvBaseOptions.property.buildConstraintDependencies">buildConstraintDependencies</a></code> | <code>string[]</code> | Constraints to apply when solving build dependencies. |
| <code><a href="#projen.python.UvBaseOptions.property.cacheDir">cacheDir</a></code> | <code>string</code> | Path to the cache directory. |
| <code><a href="#projen.python.UvBaseOptions.property.cacheKeys">cacheKeys</a></code> | <code>{[ key: string ]: any}</code> | The keys to consider when caching builds for the project. |
| <code><a href="#projen.python.UvBaseOptions.property.checkUrl">checkUrl</a></code> | <code>string</code> | Check an index URL for existing files to skip duplicate uploads. |
| <code><a href="#projen.python.UvBaseOptions.property.classifiers">classifiers</a></code> | <code>string[]</code> | Python package classifiers. |
| <code><a href="#projen.python.UvBaseOptions.property.compileBytecode">compileBytecode</a></code> | <code>string</code> | Compile Python files to bytecode after installation. |
| <code><a href="#projen.python.UvBaseOptions.property.concurrentBuilds">concurrentBuilds</a></code> | <code>number</code> | The maximum number of source distributions that uv will build concurrently at any given time. |
| <code><a href="#projen.python.UvBaseOptions.property.concurrentDownloads">concurrentDownloads</a></code> | <code>number</code> | The maximum number of in-flight concurrent downloads that uv will perform at any given time. |
| <code><a href="#projen.python.UvBaseOptions.property.concurrentInstalls">concurrentInstalls</a></code> | <code>number</code> | The number of threads used when installing and unzipping packages. |
| <code><a href="#projen.python.UvBaseOptions.property.configSettings">configSettings</a></code> | <code>{[ key: string ]: any}</code> | Settings to pass to the PEP 517 build backend. |
| <code><a href="#projen.python.UvBaseOptions.property.configSettingsPackage">configSettingsPackage</a></code> | <code>{[ key: string ]: any}</code> | Settings to pass to the PEP 517 build backend for specific packages. |
| <code><a href="#projen.python.UvBaseOptions.property.conflicts">conflicts</a></code> | <code>{[ key: string ]: string}[][]</code> | Declare collections of extras or dependency groups that are conflicting (i.e., mutually exclusive). |
| <code><a href="#projen.python.UvBaseOptions.property.constraintDependencies">constraintDependencies</a></code> | <code>string[]</code> | Constraints to apply when resolving the project's dependencies. |
| <code><a href="#projen.python.UvBaseOptions.property.defaultGroups">defaultGroups</a></code> | <code>string \| string[]</code> | The list of dependency-groups to install by default. |
| <code><a href="#projen.python.UvBaseOptions.property.dependencyMetadata">dependencyMetadata</a></code> | <code><a href="#projen.python.UvDependencyMetadata">UvDependencyMetadata</a>[]</code> | Pre-defined static metadata for dependencies of the project (direct or transitive). |
| <code><a href="#projen.python.UvBaseOptions.property.description">description</a></code> | <code>string</code> | Description of the package. |
| <code><a href="#projen.python.UvBaseOptions.property.documentation">documentation</a></code> | <code>string</code> | Documentation URL of the package. |
| <code><a href="#projen.python.UvBaseOptions.property.environments">environments</a></code> | <code>string[]</code> | Supported environments against which to resolve dependencies. |
| <code><a href="#projen.python.UvBaseOptions.property.excludeDependencies">excludeDependencies</a></code> | <code>string[]</code> | Dependencies to exclude when resolving the project's dependencies. |
| <code><a href="#projen.python.UvBaseOptions.property.excludeNewer">excludeNewer</a></code> | <code>string</code> | Limit candidate packages to those that were uploaded prior to a given point in time. |
| <code><a href="#projen.python.UvBaseOptions.property.excludeNewerPackage">excludeNewerPackage</a></code> | <code>{[ key: string ]: string}</code> | Limit candidate packages for specific packages to those that were uploaded prior to the given date. |
| <code><a href="#projen.python.UvBaseOptions.property.extraBuildDependencies">extraBuildDependencies</a></code> | <code>{[ key: string ]: string[]}</code> | Additional build dependencies for packages. |
| <code><a href="#projen.python.UvBaseOptions.property.extraBuildVariables">extraBuildVariables</a></code> | <code>{[ key: string ]: {[ key: string ]: string}}</code> | Extra environment variables to set when building certain packages. |
| <code><a href="#projen.python.UvBaseOptions.property.extraIndexUrl">extraIndexUrl</a></code> | <code>string[]</code> | Extra URLs of package indexes to use, in addition to --index-url. |
| <code><a href="#projen.python.UvBaseOptions.property.findLinks">findLinks</a></code> | <code>string[]</code> | Locations to search for candidate distributions, in addition to those found in the registry indexes. |
| <code><a href="#projen.python.UvBaseOptions.property.forkStrategy">forkStrategy</a></code> | <code>string</code> | The strategy to use when selecting multiple versions of a given package across Python versions and platforms. |
| <code><a href="#projen.python.UvBaseOptions.property.homepage">homepage</a></code> | <code>string</code> | Homepage URL of the package. |
| <code><a href="#projen.python.UvBaseOptions.property.index">index</a></code> | <code><a href="#projen.python.UvIndex">UvIndex</a>[]</code> | The indexes to use when resolving dependencies. |
| <code><a href="#projen.python.UvBaseOptions.property.indexStrategy">indexStrategy</a></code> | <code>string</code> | The strategy to use when resolving against multiple index URLs. |
| <code><a href="#projen.python.UvBaseOptions.property.indexUrl">indexUrl</a></code> | <code>string</code> | The URL of the Python package index (by default: https://pypi.org/simple). |
| <code><a href="#projen.python.UvBaseOptions.property.keyringProvider">keyringProvider</a></code> | <code>string</code> | Attempt to use keyring for authentication for index URLs. |
| <code><a href="#projen.python.UvBaseOptions.property.keywords">keywords</a></code> | <code>string[]</code> | Keywords for the package. |
| <code><a href="#projen.python.UvBaseOptions.property.license">license</a></code> | <code>string</code> | License of the package. |
| <code><a href="#projen.python.UvBaseOptions.property.linkMode">linkMode</a></code> | <code>string</code> | The method to use when installing packages from the global cache. |
| <code><a href="#projen.python.UvBaseOptions.property.managed">managed</a></code> | <code>boolean</code> | Whether the project is managed by uv. |
| <code><a href="#projen.python.UvBaseOptions.property.name">name</a></code> | <code>string</code> | Name of the package. |
| <code><a href="#projen.python.UvBaseOptions.property.nativeTls">nativeTls</a></code> | <code>boolean</code> | Whether to load TLS certificates from the platform's native certificate store. |
| <code><a href="#projen.python.UvBaseOptions.property.noBinary">noBinary</a></code> | <code>boolean</code> | Don't install pre-built wheels. |
| <code><a href="#projen.python.UvBaseOptions.property.noBinaryPackage">noBinaryPackage</a></code> | <code>string[]</code> | Don't install pre-built wheels for a specific package. |
| <code><a href="#projen.python.UvBaseOptions.property.noBuild">noBuild</a></code> | <code>boolean</code> | Don't build source distributions. |
| <code><a href="#projen.python.UvBaseOptions.property.noBuildIsolation">noBuildIsolation</a></code> | <code>boolean</code> | Disable isolation when building source distributions. |
| <code><a href="#projen.python.UvBaseOptions.property.noBuildIsolationPackage">noBuildIsolationPackage</a></code> | <code>string[]</code> | Disable isolation when building source distributions for a specific package. |
| <code><a href="#projen.python.UvBaseOptions.property.noBuildPackage">noBuildPackage</a></code> | <code>string[]</code> | Don't build source distributions for a specific package. |
| <code><a href="#projen.python.UvBaseOptions.property.noCache">noCache</a></code> | <code>boolean</code> | Avoid reading from or writing to the cache, instead using a temporary directory for the duration of the operation. |
| <code><a href="#projen.python.UvBaseOptions.property.noIndex">noIndex</a></code> | <code>boolean</code> | Ignore all registry indexes (e.g., PyPI), instead relying on direct URL dependencies and those provided via --find-links. |
| <code><a href="#projen.python.UvBaseOptions.property.noSources">noSources</a></code> | <code>boolean</code> | Ignore the tool.uv.sources table when resolving dependencies. Used to lock against the standards-compliant, publishable package metadata, as opposed to using any local or Git sources. |
| <code><a href="#projen.python.UvBaseOptions.property.offline">offline</a></code> | <code>boolean</code> | Disable network access, relying only on locally cached data and locally available files. |
| <code><a href="#projen.python.UvBaseOptions.property.overrideDependencies">overrideDependencies</a></code> | <code>string[]</code> | Overrides to apply when resolving the project's dependencies. |
| <code><a href="#projen.python.UvBaseOptions.property.package">package</a></code> | <code>boolean</code> | Whether the project should be considered a Python package, or a non-package ("virtual") project. |
| <code><a href="#projen.python.UvBaseOptions.property.pip">pip</a></code> | <code><a href="#projen.python.UvPipMetadata">UvPipMetadata</a></code> | Settings that are specific to the uv pip command-line interface. |
| <code><a href="#projen.python.UvBaseOptions.property.prerelease">prerelease</a></code> | <code>string</code> | The strategy to use when considering pre-release versions. |
| <code><a href="#projen.python.UvBaseOptions.property.preview">preview</a></code> | <code>boolean</code> | Whether to enable experimental, preview features. |
| <code><a href="#projen.python.UvBaseOptions.property.publishUrl">publishUrl</a></code> | <code>string</code> | The URL for publishing packages to the Python package index (by default: https://upload.pypi.org/legacy/). |
| <code><a href="#projen.python.UvBaseOptions.property.pypyInstallMirror">pypyInstallMirror</a></code> | <code>string</code> | Mirror URL to use for downloading managed PyPy installations. |
| <code><a href="#projen.python.UvBaseOptions.property.pythonDownloads">pythonDownloads</a></code> | <code>string</code> | Whether to allow Python downloads. |
| <code><a href="#projen.python.UvBaseOptions.property.pythonDownloadsJsonUrl">pythonDownloadsJsonUrl</a></code> | <code>string</code> | URL pointing to JSON of custom Python installations. |
| <code><a href="#projen.python.UvBaseOptions.property.pythonInstallMirror">pythonInstallMirror</a></code> | <code>string</code> | Mirror URL for downloading managed Python installations. |
| <code><a href="#projen.python.UvBaseOptions.property.pythonPreference">pythonPreference</a></code> | <code>string</code> | Whether to prefer using Python installations that are already present on the system, or those that are downloaded and installed by uv. |
| <code><a href="#projen.python.UvBaseOptions.property.readme">readme</a></code> | <code>string</code> | Path to the readme file. |
| <code><a href="#projen.python.UvBaseOptions.property.reinstall">reinstall</a></code> | <code>boolean</code> | Reinstall all packages, regardless of whether they're already installed. |
| <code><a href="#projen.python.UvBaseOptions.property.reinstallPackage">reinstallPackage</a></code> | <code>string[]</code> | Reinstall a specific package, regardless of whether it's already installed. |
| <code><a href="#projen.python.UvBaseOptions.property.repository">repository</a></code> | <code>string</code> | Repository URL of the package. |
| <code><a href="#projen.python.UvBaseOptions.property.requiredEnvironments">requiredEnvironments</a></code> | <code>string \| string[]</code> | A list of required platforms, for packages that lack source distributions. |
| <code><a href="#projen.python.UvBaseOptions.property.requiredVersion">requiredVersion</a></code> | <code>string</code> | Enforce a requirement on the version of uv. |
| <code><a href="#projen.python.UvBaseOptions.property.requiresPython">requiresPython</a></code> | <code>string</code> | Python version requirement string. |
| <code><a href="#projen.python.UvBaseOptions.property.resolution">resolution</a></code> | <code>string</code> | The strategy to use when selecting between the different compatible versions for a given package requirement. |
| <code><a href="#projen.python.UvBaseOptions.property.sources">sources</a></code> | <code>{[ key: string ]: <a href="#projen.python.UvSource">UvSource</a>}</code> | The sources to use when resolving dependencies. |
| <code><a href="#projen.python.UvBaseOptions.property.trustedPublishing">trustedPublishing</a></code> | <code>string</code> | Configure trusted publishing. |
| <code><a href="#projen.python.UvBaseOptions.property.upgrade">upgrade</a></code> | <code>boolean</code> | Allow package upgrades, ignoring pinned versions in any existing output file. |
| <code><a href="#projen.python.UvBaseOptions.property.upgradePackage">upgradePackage</a></code> | <code>string[]</code> | Allow upgrades for a specific package, ignoring pinned versions in any existing output file. |
| <code><a href="#projen.python.UvBaseOptions.property.urls">urls</a></code> | <code>{[ key: string ]: string}</code> | Additional URLs associated with the package. |
| <code><a href="#projen.python.UvBaseOptions.property.version">version</a></code> | <code>string</code> | Version of the package. |
| <code><a href="#projen.python.UvBaseOptions.property.workspace">workspace</a></code> | <code><a href="#projen.python.UvWorkspace">UvWorkspace</a></code> | Packages to include or exclude as workspace members. |

---

##### `addBounds`<sup>Optional</sup> <a name="addBounds" id="projen.python.UvBaseOptions.property.addBounds"></a>

```typescript
public readonly addBounds: string;
```

- *Type:* string

The default version specifier when adding a dependency.

---

##### `allowInsecureHost`<sup>Optional</sup> <a name="allowInsecureHost" id="projen.python.UvBaseOptions.property.allowInsecureHost"></a>

```typescript
public readonly allowInsecureHost: string[];
```

- *Type:* string[]

Allow insecure connections to host.

---

##### `authorEmail`<sup>Optional</sup> <a name="authorEmail" id="projen.python.UvBaseOptions.property.authorEmail"></a>

```typescript
public readonly authorEmail: string;
```

- *Type:* string

Email of the package author.

---

##### `authorName`<sup>Optional</sup> <a name="authorName" id="projen.python.UvBaseOptions.property.authorName"></a>

```typescript
public readonly authorName: string;
```

- *Type:* string

Name of the package author.

---

##### `buildBackend`<sup>Optional</sup> <a name="buildBackend" id="projen.python.UvBaseOptions.property.buildBackend"></a>

```typescript
public readonly buildBackend: UvBuildBackend;
```

- *Type:* <a href="#projen.python.UvBuildBackend">UvBuildBackend</a>

Settings for the uv build backend (uv_build).

---

##### `buildConstraintDependencies`<sup>Optional</sup> <a name="buildConstraintDependencies" id="projen.python.UvBaseOptions.property.buildConstraintDependencies"></a>

```typescript
public readonly buildConstraintDependencies: string[];
```

- *Type:* string[]

Constraints to apply when solving build dependencies.

---

##### `cacheDir`<sup>Optional</sup> <a name="cacheDir" id="projen.python.UvBaseOptions.property.cacheDir"></a>

```typescript
public readonly cacheDir: string;
```

- *Type:* string

Path to the cache directory.

---

##### `cacheKeys`<sup>Optional</sup> <a name="cacheKeys" id="projen.python.UvBaseOptions.property.cacheKeys"></a>

```typescript
public readonly cacheKeys: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

The keys to consider when caching builds for the project.

---

##### `checkUrl`<sup>Optional</sup> <a name="checkUrl" id="projen.python.UvBaseOptions.property.checkUrl"></a>

```typescript
public readonly checkUrl: string;
```

- *Type:* string

Check an index URL for existing files to skip duplicate uploads.

---

##### `classifiers`<sup>Optional</sup> <a name="classifiers" id="projen.python.UvBaseOptions.property.classifiers"></a>

```typescript
public readonly classifiers: string[];
```

- *Type:* string[]

Python package classifiers.

> [https://pypi.org/classifiers/](https://pypi.org/classifiers/)

---

##### `compileBytecode`<sup>Optional</sup> <a name="compileBytecode" id="projen.python.UvBaseOptions.property.compileBytecode"></a>

```typescript
public readonly compileBytecode: string;
```

- *Type:* string

Compile Python files to bytecode after installation.

---

##### `concurrentBuilds`<sup>Optional</sup> <a name="concurrentBuilds" id="projen.python.UvBaseOptions.property.concurrentBuilds"></a>

```typescript
public readonly concurrentBuilds: number;
```

- *Type:* number

The maximum number of source distributions that uv will build concurrently at any given time.

---

##### `concurrentDownloads`<sup>Optional</sup> <a name="concurrentDownloads" id="projen.python.UvBaseOptions.property.concurrentDownloads"></a>

```typescript
public readonly concurrentDownloads: number;
```

- *Type:* number

The maximum number of in-flight concurrent downloads that uv will perform at any given time.

---

##### `concurrentInstalls`<sup>Optional</sup> <a name="concurrentInstalls" id="projen.python.UvBaseOptions.property.concurrentInstalls"></a>

```typescript
public readonly concurrentInstalls: number;
```

- *Type:* number

The number of threads used when installing and unzipping packages.

---

##### `configSettings`<sup>Optional</sup> <a name="configSettings" id="projen.python.UvBaseOptions.property.configSettings"></a>

```typescript
public readonly configSettings: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

Settings to pass to the PEP 517 build backend.

---

##### `configSettingsPackage`<sup>Optional</sup> <a name="configSettingsPackage" id="projen.python.UvBaseOptions.property.configSettingsPackage"></a>

```typescript
public readonly configSettingsPackage: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

Settings to pass to the PEP 517 build backend for specific packages.

---

##### `conflicts`<sup>Optional</sup> <a name="conflicts" id="projen.python.UvBaseOptions.property.conflicts"></a>

```typescript
public readonly conflicts: {[ key: string ]: string}[][];
```

- *Type:* {[ key: string ]: string}[][]

Declare collections of extras or dependency groups that are conflicting (i.e., mutually exclusive).

---

##### `constraintDependencies`<sup>Optional</sup> <a name="constraintDependencies" id="projen.python.UvBaseOptions.property.constraintDependencies"></a>

```typescript
public readonly constraintDependencies: string[];
```

- *Type:* string[]

Constraints to apply when resolving the project's dependencies.

---

##### `defaultGroups`<sup>Optional</sup> <a name="defaultGroups" id="projen.python.UvBaseOptions.property.defaultGroups"></a>

```typescript
public readonly defaultGroups: string | string[];
```

- *Type:* string | string[]

The list of dependency-groups to install by default.

---

##### `dependencyMetadata`<sup>Optional</sup> <a name="dependencyMetadata" id="projen.python.UvBaseOptions.property.dependencyMetadata"></a>

```typescript
public readonly dependencyMetadata: UvDependencyMetadata[];
```

- *Type:* <a href="#projen.python.UvDependencyMetadata">UvDependencyMetadata</a>[]

Pre-defined static metadata for dependencies of the project (direct or transitive).

When provided, enables the resolver to use the specified metadata instead of querying the registry or building the relevant package from source.

---

##### `description`<sup>Optional</sup> <a name="description" id="projen.python.UvBaseOptions.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

Description of the package.

---

##### `documentation`<sup>Optional</sup> <a name="documentation" id="projen.python.UvBaseOptions.property.documentation"></a>

```typescript
public readonly documentation: string;
```

- *Type:* string

Documentation URL of the package.

---

##### `environments`<sup>Optional</sup> <a name="environments" id="projen.python.UvBaseOptions.property.environments"></a>

```typescript
public readonly environments: string[];
```

- *Type:* string[]

Supported environments against which to resolve dependencies.

---

##### `excludeDependencies`<sup>Optional</sup> <a name="excludeDependencies" id="projen.python.UvBaseOptions.property.excludeDependencies"></a>

```typescript
public readonly excludeDependencies: string[];
```

- *Type:* string[]

Dependencies to exclude when resolving the project's dependencies.

---

##### `excludeNewer`<sup>Optional</sup> <a name="excludeNewer" id="projen.python.UvBaseOptions.property.excludeNewer"></a>

```typescript
public readonly excludeNewer: string;
```

- *Type:* string

Limit candidate packages to those that were uploaded prior to a given point in time.

---

##### `excludeNewerPackage`<sup>Optional</sup> <a name="excludeNewerPackage" id="projen.python.UvBaseOptions.property.excludeNewerPackage"></a>

```typescript
public readonly excludeNewerPackage: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Limit candidate packages for specific packages to those that were uploaded prior to the given date.

---

##### `extraBuildDependencies`<sup>Optional</sup> <a name="extraBuildDependencies" id="projen.python.UvBaseOptions.property.extraBuildDependencies"></a>

```typescript
public readonly extraBuildDependencies: {[ key: string ]: string[]};
```

- *Type:* {[ key: string ]: string[]}

Additional build dependencies for packages.

---

##### `extraBuildVariables`<sup>Optional</sup> <a name="extraBuildVariables" id="projen.python.UvBaseOptions.property.extraBuildVariables"></a>

```typescript
public readonly extraBuildVariables: {[ key: string ]: {[ key: string ]: string}};
```

- *Type:* {[ key: string ]: {[ key: string ]: string}}

Extra environment variables to set when building certain packages.

---

##### `extraIndexUrl`<sup>Optional</sup> <a name="extraIndexUrl" id="projen.python.UvBaseOptions.property.extraIndexUrl"></a>

```typescript
public readonly extraIndexUrl: string[];
```

- *Type:* string[]

Extra URLs of package indexes to use, in addition to --index-url.

---

##### `findLinks`<sup>Optional</sup> <a name="findLinks" id="projen.python.UvBaseOptions.property.findLinks"></a>

```typescript
public readonly findLinks: string[];
```

- *Type:* string[]

Locations to search for candidate distributions, in addition to those found in the registry indexes.

---

##### `forkStrategy`<sup>Optional</sup> <a name="forkStrategy" id="projen.python.UvBaseOptions.property.forkStrategy"></a>

```typescript
public readonly forkStrategy: string;
```

- *Type:* string

The strategy to use when selecting multiple versions of a given package across Python versions and platforms.

---

##### `homepage`<sup>Optional</sup> <a name="homepage" id="projen.python.UvBaseOptions.property.homepage"></a>

```typescript
public readonly homepage: string;
```

- *Type:* string

Homepage URL of the package.

---

##### `index`<sup>Optional</sup> <a name="index" id="projen.python.UvBaseOptions.property.index"></a>

```typescript
public readonly index: UvIndex[];
```

- *Type:* <a href="#projen.python.UvIndex">UvIndex</a>[]

The indexes to use when resolving dependencies.

---

##### `indexStrategy`<sup>Optional</sup> <a name="indexStrategy" id="projen.python.UvBaseOptions.property.indexStrategy"></a>

```typescript
public readonly indexStrategy: string;
```

- *Type:* string

The strategy to use when resolving against multiple index URLs.

---

##### `indexUrl`<sup>Optional</sup> <a name="indexUrl" id="projen.python.UvBaseOptions.property.indexUrl"></a>

```typescript
public readonly indexUrl: string;
```

- *Type:* string

The URL of the Python package index (by default: https://pypi.org/simple).

---

##### `keyringProvider`<sup>Optional</sup> <a name="keyringProvider" id="projen.python.UvBaseOptions.property.keyringProvider"></a>

```typescript
public readonly keyringProvider: string;
```

- *Type:* string

Attempt to use keyring for authentication for index URLs.

---

##### `keywords`<sup>Optional</sup> <a name="keywords" id="projen.python.UvBaseOptions.property.keywords"></a>

```typescript
public readonly keywords: string[];
```

- *Type:* string[]

Keywords for the package.

---

##### `license`<sup>Optional</sup> <a name="license" id="projen.python.UvBaseOptions.property.license"></a>

```typescript
public readonly license: string;
```

- *Type:* string

License of the package.

---

##### `linkMode`<sup>Optional</sup> <a name="linkMode" id="projen.python.UvBaseOptions.property.linkMode"></a>

```typescript
public readonly linkMode: string;
```

- *Type:* string

The method to use when installing packages from the global cache.

---

##### `managed`<sup>Optional</sup> <a name="managed" id="projen.python.UvBaseOptions.property.managed"></a>

```typescript
public readonly managed: boolean;
```

- *Type:* boolean

Whether the project is managed by uv.

If false, uv will ignore the project when uv run is invoked.

---

##### `name`<sup>Optional</sup> <a name="name" id="projen.python.UvBaseOptions.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

Name of the package.

---

##### `nativeTls`<sup>Optional</sup> <a name="nativeTls" id="projen.python.UvBaseOptions.property.nativeTls"></a>

```typescript
public readonly nativeTls: boolean;
```

- *Type:* boolean

Whether to load TLS certificates from the platform's native certificate store.

---

##### `noBinary`<sup>Optional</sup> <a name="noBinary" id="projen.python.UvBaseOptions.property.noBinary"></a>

```typescript
public readonly noBinary: boolean;
```

- *Type:* boolean

Don't install pre-built wheels.

---

##### `noBinaryPackage`<sup>Optional</sup> <a name="noBinaryPackage" id="projen.python.UvBaseOptions.property.noBinaryPackage"></a>

```typescript
public readonly noBinaryPackage: string[];
```

- *Type:* string[]

Don't install pre-built wheels for a specific package.

---

##### `noBuild`<sup>Optional</sup> <a name="noBuild" id="projen.python.UvBaseOptions.property.noBuild"></a>

```typescript
public readonly noBuild: boolean;
```

- *Type:* boolean

Don't build source distributions.

---

##### `noBuildIsolation`<sup>Optional</sup> <a name="noBuildIsolation" id="projen.python.UvBaseOptions.property.noBuildIsolation"></a>

```typescript
public readonly noBuildIsolation: boolean;
```

- *Type:* boolean

Disable isolation when building source distributions.

---

##### `noBuildIsolationPackage`<sup>Optional</sup> <a name="noBuildIsolationPackage" id="projen.python.UvBaseOptions.property.noBuildIsolationPackage"></a>

```typescript
public readonly noBuildIsolationPackage: string[];
```

- *Type:* string[]

Disable isolation when building source distributions for a specific package.

---

##### `noBuildPackage`<sup>Optional</sup> <a name="noBuildPackage" id="projen.python.UvBaseOptions.property.noBuildPackage"></a>

```typescript
public readonly noBuildPackage: string[];
```

- *Type:* string[]

Don't build source distributions for a specific package.

---

##### `noCache`<sup>Optional</sup> <a name="noCache" id="projen.python.UvBaseOptions.property.noCache"></a>

```typescript
public readonly noCache: boolean;
```

- *Type:* boolean

Avoid reading from or writing to the cache, instead using a temporary directory for the duration of the operation.

---

##### `noIndex`<sup>Optional</sup> <a name="noIndex" id="projen.python.UvBaseOptions.property.noIndex"></a>

```typescript
public readonly noIndex: boolean;
```

- *Type:* boolean

Ignore all registry indexes (e.g., PyPI), instead relying on direct URL dependencies and those provided via --find-links.

---

##### `noSources`<sup>Optional</sup> <a name="noSources" id="projen.python.UvBaseOptions.property.noSources"></a>

```typescript
public readonly noSources: boolean;
```

- *Type:* boolean

Ignore the tool.uv.sources table when resolving dependencies. Used to lock against the standards-compliant, publishable package metadata, as opposed to using any local or Git sources.

---

##### `offline`<sup>Optional</sup> <a name="offline" id="projen.python.UvBaseOptions.property.offline"></a>

```typescript
public readonly offline: boolean;
```

- *Type:* boolean

Disable network access, relying only on locally cached data and locally available files.

---

##### `overrideDependencies`<sup>Optional</sup> <a name="overrideDependencies" id="projen.python.UvBaseOptions.property.overrideDependencies"></a>

```typescript
public readonly overrideDependencies: string[];
```

- *Type:* string[]

Overrides to apply when resolving the project's dependencies.

---

##### `package`<sup>Optional</sup> <a name="package" id="projen.python.UvBaseOptions.property.package"></a>

```typescript
public readonly package: boolean;
```

- *Type:* boolean

Whether the project should be considered a Python package, or a non-package ("virtual") project.

---

##### `pip`<sup>Optional</sup> <a name="pip" id="projen.python.UvBaseOptions.property.pip"></a>

```typescript
public readonly pip: UvPipMetadata;
```

- *Type:* <a href="#projen.python.UvPipMetadata">UvPipMetadata</a>

Settings that are specific to the uv pip command-line interface.

---

##### `prerelease`<sup>Optional</sup> <a name="prerelease" id="projen.python.UvBaseOptions.property.prerelease"></a>

```typescript
public readonly prerelease: string;
```

- *Type:* string

The strategy to use when considering pre-release versions.

---

##### `preview`<sup>Optional</sup> <a name="preview" id="projen.python.UvBaseOptions.property.preview"></a>

```typescript
public readonly preview: boolean;
```

- *Type:* boolean

Whether to enable experimental, preview features.

---

##### `publishUrl`<sup>Optional</sup> <a name="publishUrl" id="projen.python.UvBaseOptions.property.publishUrl"></a>

```typescript
public readonly publishUrl: string;
```

- *Type:* string

The URL for publishing packages to the Python package index (by default: https://upload.pypi.org/legacy/).

---

##### `pypyInstallMirror`<sup>Optional</sup> <a name="pypyInstallMirror" id="projen.python.UvBaseOptions.property.pypyInstallMirror"></a>

```typescript
public readonly pypyInstallMirror: string;
```

- *Type:* string

Mirror URL to use for downloading managed PyPy installations.

---

##### `pythonDownloads`<sup>Optional</sup> <a name="pythonDownloads" id="projen.python.UvBaseOptions.property.pythonDownloads"></a>

```typescript
public readonly pythonDownloads: string;
```

- *Type:* string

Whether to allow Python downloads.

---

##### `pythonDownloadsJsonUrl`<sup>Optional</sup> <a name="pythonDownloadsJsonUrl" id="projen.python.UvBaseOptions.property.pythonDownloadsJsonUrl"></a>

```typescript
public readonly pythonDownloadsJsonUrl: string;
```

- *Type:* string

URL pointing to JSON of custom Python installations.

---

##### `pythonInstallMirror`<sup>Optional</sup> <a name="pythonInstallMirror" id="projen.python.UvBaseOptions.property.pythonInstallMirror"></a>

```typescript
public readonly pythonInstallMirror: string;
```

- *Type:* string

Mirror URL for downloading managed Python installations.

---

##### `pythonPreference`<sup>Optional</sup> <a name="pythonPreference" id="projen.python.UvBaseOptions.property.pythonPreference"></a>

```typescript
public readonly pythonPreference: string;
```

- *Type:* string

Whether to prefer using Python installations that are already present on the system, or those that are downloaded and installed by uv.

---

##### `readme`<sup>Optional</sup> <a name="readme" id="projen.python.UvBaseOptions.property.readme"></a>

```typescript
public readonly readme: string;
```

- *Type:* string

Path to the readme file.

---

##### `reinstall`<sup>Optional</sup> <a name="reinstall" id="projen.python.UvBaseOptions.property.reinstall"></a>

```typescript
public readonly reinstall: boolean;
```

- *Type:* boolean

Reinstall all packages, regardless of whether they're already installed.

Implies refresh.

---

##### `reinstallPackage`<sup>Optional</sup> <a name="reinstallPackage" id="projen.python.UvBaseOptions.property.reinstallPackage"></a>

```typescript
public readonly reinstallPackage: string[];
```

- *Type:* string[]

Reinstall a specific package, regardless of whether it's already installed.

Implies refresh-package.

---

##### `repository`<sup>Optional</sup> <a name="repository" id="projen.python.UvBaseOptions.property.repository"></a>

```typescript
public readonly repository: string;
```

- *Type:* string

Repository URL of the package.

---

##### `requiredEnvironments`<sup>Optional</sup> <a name="requiredEnvironments" id="projen.python.UvBaseOptions.property.requiredEnvironments"></a>

```typescript
public readonly requiredEnvironments: string | string[];
```

- *Type:* string | string[]

A list of required platforms, for packages that lack source distributions.

---

##### `requiredVersion`<sup>Optional</sup> <a name="requiredVersion" id="projen.python.UvBaseOptions.property.requiredVersion"></a>

```typescript
public readonly requiredVersion: string;
```

- *Type:* string

Enforce a requirement on the version of uv.

---

##### `requiresPython`<sup>Optional</sup> <a name="requiresPython" id="projen.python.UvBaseOptions.property.requiresPython"></a>

```typescript
public readonly requiresPython: string;
```

- *Type:* string

Python version requirement string.

---

##### `resolution`<sup>Optional</sup> <a name="resolution" id="projen.python.UvBaseOptions.property.resolution"></a>

```typescript
public readonly resolution: string;
```

- *Type:* string

The strategy to use when selecting between the different compatible versions for a given package requirement.

---

##### `sources`<sup>Optional</sup> <a name="sources" id="projen.python.UvBaseOptions.property.sources"></a>

```typescript
public readonly sources: {[ key: string ]: UvSource};
```

- *Type:* {[ key: string ]: <a href="#projen.python.UvSource">UvSource</a>}

The sources to use when resolving dependencies.

---

##### `trustedPublishing`<sup>Optional</sup> <a name="trustedPublishing" id="projen.python.UvBaseOptions.property.trustedPublishing"></a>

```typescript
public readonly trustedPublishing: string;
```

- *Type:* string

Configure trusted publishing.

---

##### `upgrade`<sup>Optional</sup> <a name="upgrade" id="projen.python.UvBaseOptions.property.upgrade"></a>

```typescript
public readonly upgrade: boolean;
```

- *Type:* boolean

Allow package upgrades, ignoring pinned versions in any existing output file.

---

##### `upgradePackage`<sup>Optional</sup> <a name="upgradePackage" id="projen.python.UvBaseOptions.property.upgradePackage"></a>

```typescript
public readonly upgradePackage: string[];
```

- *Type:* string[]

Allow upgrades for a specific package, ignoring pinned versions in any existing output file.

---

##### `urls`<sup>Optional</sup> <a name="urls" id="projen.python.UvBaseOptions.property.urls"></a>

```typescript
public readonly urls: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Additional URLs associated with the package.

---

##### `version`<sup>Optional</sup> <a name="version" id="projen.python.UvBaseOptions.property.version"></a>

```typescript
public readonly version: string;
```

- *Type:* string

Version of the package.

---

##### `workspace`<sup>Optional</sup> <a name="workspace" id="projen.python.UvBaseOptions.property.workspace"></a>

```typescript
public readonly workspace: UvWorkspace;
```

- *Type:* <a href="#projen.python.UvWorkspace">UvWorkspace</a>

Packages to include or exclude as workspace members.

---

### UvBuildBackend <a name="UvBuildBackend" id="projen.python.UvBuildBackend"></a>

#### Initializer <a name="Initializer" id="projen.python.UvBuildBackend.Initializer"></a>

```typescript
import { python } from 'projen'

const uvBuildBackend: python.UvBuildBackend = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.UvBuildBackend.property.data">data</a></code> | <code><a href="#projen.python.UvBuildBackendData">UvBuildBackendData</a></code> | *No description.* |
| <code><a href="#projen.python.UvBuildBackend.property.defaultExcludes">defaultExcludes</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#projen.python.UvBuildBackend.property.moduleName">moduleName</a></code> | <code>string \| string[]</code> | *No description.* |
| <code><a href="#projen.python.UvBuildBackend.property.moduleRoot">moduleRoot</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.UvBuildBackend.property.namespace">namespace</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#projen.python.UvBuildBackend.property.sourceExclude">sourceExclude</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen.python.UvBuildBackend.property.sourceInclude">sourceInclude</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen.python.UvBuildBackend.property.wheelExclude">wheelExclude</a></code> | <code>string[]</code> | *No description.* |

---

##### `data`<sup>Optional</sup> <a name="data" id="projen.python.UvBuildBackend.property.data"></a>

```typescript
public readonly data: UvBuildBackendData;
```

- *Type:* <a href="#projen.python.UvBuildBackendData">UvBuildBackendData</a>

---

##### `defaultExcludes`<sup>Optional</sup> <a name="defaultExcludes" id="projen.python.UvBuildBackend.property.defaultExcludes"></a>

```typescript
public readonly defaultExcludes: boolean;
```

- *Type:* boolean

---

##### `moduleName`<sup>Optional</sup> <a name="moduleName" id="projen.python.UvBuildBackend.property.moduleName"></a>

```typescript
public readonly moduleName: string | string[];
```

- *Type:* string | string[]

---

##### `moduleRoot`<sup>Optional</sup> <a name="moduleRoot" id="projen.python.UvBuildBackend.property.moduleRoot"></a>

```typescript
public readonly moduleRoot: string;
```

- *Type:* string

---

##### `namespace`<sup>Optional</sup> <a name="namespace" id="projen.python.UvBuildBackend.property.namespace"></a>

```typescript
public readonly namespace: boolean;
```

- *Type:* boolean

---

##### `sourceExclude`<sup>Optional</sup> <a name="sourceExclude" id="projen.python.UvBuildBackend.property.sourceExclude"></a>

```typescript
public readonly sourceExclude: string[];
```

- *Type:* string[]

---

##### `sourceInclude`<sup>Optional</sup> <a name="sourceInclude" id="projen.python.UvBuildBackend.property.sourceInclude"></a>

```typescript
public readonly sourceInclude: string[];
```

- *Type:* string[]

---

##### `wheelExclude`<sup>Optional</sup> <a name="wheelExclude" id="projen.python.UvBuildBackend.property.wheelExclude"></a>

```typescript
public readonly wheelExclude: string[];
```

- *Type:* string[]

---

### UvBuildBackendData <a name="UvBuildBackendData" id="projen.python.UvBuildBackendData"></a>

#### Initializer <a name="Initializer" id="projen.python.UvBuildBackendData.Initializer"></a>

```typescript
import { python } from 'projen'

const uvBuildBackendData: python.UvBuildBackendData = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.UvBuildBackendData.property.data">data</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.UvBuildBackendData.property.headers">headers</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.UvBuildBackendData.property.scripts">scripts</a></code> | <code>string</code> | *No description.* |

---

##### `data`<sup>Optional</sup> <a name="data" id="projen.python.UvBuildBackendData.property.data"></a>

```typescript
public readonly data: string;
```

- *Type:* string

---

##### `headers`<sup>Optional</sup> <a name="headers" id="projen.python.UvBuildBackendData.property.headers"></a>

```typescript
public readonly headers: string;
```

- *Type:* string

---

##### `scripts`<sup>Optional</sup> <a name="scripts" id="projen.python.UvBuildBackendData.property.scripts"></a>

```typescript
public readonly scripts: string;
```

- *Type:* string

---

### UvDependencyMetadata <a name="UvDependencyMetadata" id="projen.python.UvDependencyMetadata"></a>

#### Initializer <a name="Initializer" id="projen.python.UvDependencyMetadata.Initializer"></a>

```typescript
import { python } from 'projen'

const uvDependencyMetadata: python.UvDependencyMetadata = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.UvDependencyMetadata.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.UvDependencyMetadata.property.providesExtra">providesExtra</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen.python.UvDependencyMetadata.property.requiresDist">requiresDist</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen.python.UvDependencyMetadata.property.requiresPython">requiresPython</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.UvDependencyMetadata.property.version">version</a></code> | <code>string</code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="projen.python.UvDependencyMetadata.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `providesExtra`<sup>Optional</sup> <a name="providesExtra" id="projen.python.UvDependencyMetadata.property.providesExtra"></a>

```typescript
public readonly providesExtra: string[];
```

- *Type:* string[]

---

##### `requiresDist`<sup>Optional</sup> <a name="requiresDist" id="projen.python.UvDependencyMetadata.property.requiresDist"></a>

```typescript
public readonly requiresDist: string[];
```

- *Type:* string[]

---

##### `requiresPython`<sup>Optional</sup> <a name="requiresPython" id="projen.python.UvDependencyMetadata.property.requiresPython"></a>

```typescript
public readonly requiresPython: string;
```

- *Type:* string

---

##### `version`<sup>Optional</sup> <a name="version" id="projen.python.UvDependencyMetadata.property.version"></a>

```typescript
public readonly version: string;
```

- *Type:* string

---

### UvIndex <a name="UvIndex" id="projen.python.UvIndex"></a>

#### Initializer <a name="Initializer" id="projen.python.UvIndex.Initializer"></a>

```typescript
import { python } from 'projen'

const uvIndex: python.UvIndex = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.UvIndex.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.UvIndex.property.url">url</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.UvIndex.property.default">default</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#projen.python.UvIndex.property.explicit">explicit</a></code> | <code>boolean</code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="projen.python.UvIndex.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `url`<sup>Required</sup> <a name="url" id="projen.python.UvIndex.property.url"></a>

```typescript
public readonly url: string;
```

- *Type:* string

---

##### `default`<sup>Optional</sup> <a name="default" id="projen.python.UvIndex.property.default"></a>

```typescript
public readonly default: boolean;
```

- *Type:* boolean

---

##### `explicit`<sup>Optional</sup> <a name="explicit" id="projen.python.UvIndex.property.explicit"></a>

```typescript
public readonly explicit: boolean;
```

- *Type:* boolean

---

### UvOptions <a name="UvOptions" id="projen.python.UvOptions"></a>

Options for UV project.

#### Initializer <a name="Initializer" id="projen.python.UvOptions.Initializer"></a>

```typescript
import { python } from 'projen'

const uvOptions: python.UvOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.UvOptions.property.deps">deps</a></code> | <code>string[]</code> | List of runtime dependencies for this project. |
| <code><a href="#projen.python.UvOptions.property.devDeps">devDeps</a></code> | <code>string[]</code> | List of dev dependencies for this project. |
| <code><a href="#projen.python.UvOptions.property.metadata">metadata</a></code> | <code><a href="#projen.python.UvBaseOptions">UvBaseOptions</a></code> | Package metadata. |
| <code><a href="#projen.python.UvOptions.property.pythonVersion">pythonVersion</a></code> | <code>string</code> | Python version to use for the project. |

---

##### `deps`<sup>Optional</sup> <a name="deps" id="projen.python.UvOptions.property.deps"></a>

```typescript
public readonly deps: string[];
```

- *Type:* string[]
- *Default:* []

List of runtime dependencies for this project.

Dependencies use the format: `<module>@<semver>`

---

##### `devDeps`<sup>Optional</sup> <a name="devDeps" id="projen.python.UvOptions.property.devDeps"></a>

```typescript
public readonly devDeps: string[];
```

- *Type:* string[]
- *Default:* []

List of dev dependencies for this project.

Dependencies use the format: `<module>@<semver>`

---

##### `metadata`<sup>Optional</sup> <a name="metadata" id="projen.python.UvOptions.property.metadata"></a>

```typescript
public readonly metadata: UvBaseOptions;
```

- *Type:* <a href="#projen.python.UvBaseOptions">UvBaseOptions</a>

Package metadata.

---

##### `pythonVersion`<sup>Optional</sup> <a name="pythonVersion" id="projen.python.UvOptions.property.pythonVersion"></a>

```typescript
public readonly pythonVersion: string;
```

- *Type:* string
- *Default:* "3.12"

Python version to use for the project.

---

### UvPipMetadata <a name="UvPipMetadata" id="projen.python.UvPipMetadata"></a>

#### Initializer <a name="Initializer" id="projen.python.UvPipMetadata.Initializer"></a>

```typescript
import { python } from 'projen'

const uvPipMetadata: python.UvPipMetadata = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.UvPipMetadata.property.allExtras">allExtras</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.allowEmptyRequirements">allowEmptyRequirements</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.annotationStyle">annotationStyle</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.breakSystemPackages">breakSystemPackages</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.compileBytecode">compileBytecode</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.configSettings">configSettings</a></code> | <code>{[ key: string ]: any}</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.configSettingsPackage">configSettingsPackage</a></code> | <code>{[ key: string ]: any}</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.customCompileCommand">customCompileCommand</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.dependencyMetadata">dependencyMetadata</a></code> | <code><a href="#projen.python.UvDependencyMetadata">UvDependencyMetadata</a>[]</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.emitBuildOptions">emitBuildOptions</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.emitFindLinks">emitFindLinks</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.emitIndexAnnotation">emitIndexAnnotation</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.emitIndexUrl">emitIndexUrl</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.emitMarkerExpression">emitMarkerExpression</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.excludeNewer">excludeNewer</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.excludeNewerPackage">excludeNewerPackage</a></code> | <code>{[ key: string ]: string}</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.extra">extra</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.extraBuildDependencies">extraBuildDependencies</a></code> | <code>{[ key: string ]: string[]}</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.extraBuildVariables">extraBuildVariables</a></code> | <code>{[ key: string ]: {[ key: string ]: string}}</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.extraIndexUrl">extraIndexUrl</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.findLinks">findLinks</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.forkStrategy">forkStrategy</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.generateHashes">generateHashes</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.group">group</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.indexStrategy">indexStrategy</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.indexUrl">indexUrl</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.keyringProvider">keyringProvider</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.linkMode">linkMode</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.noAnnotate">noAnnotate</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.noBinary">noBinary</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.noBuild">noBuild</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.noBuildIsolation">noBuildIsolation</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.noBuildIsolationPackage">noBuildIsolationPackage</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.noDeps">noDeps</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.noEmitPackage">noEmitPackage</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.noExtra">noExtra</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.noHeader">noHeader</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.noIndex">noIndex</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.noSources">noSources</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.noStripExtras">noStripExtras</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.noStripMarkers">noStripMarkers</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.onlyBinary">onlyBinary</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.outputFile">outputFile</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.prefix">prefix</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.prerelease">prerelease</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.python">python</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.pythonPlatform">pythonPlatform</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.pythonVersion">pythonVersion</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.reinstall">reinstall</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.reinstallPackage">reinstallPackage</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.requiresHashes">requiresHashes</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.resolution">resolution</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.strict">strict</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.system">system</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.target">target</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.torchBackend">torchBackend</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.universal">universal</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.upgrade">upgrade</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.upgradePackage">upgradePackage</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen.python.UvPipMetadata.property.verifyHashes">verifyHashes</a></code> | <code>boolean</code> | *No description.* |

---

##### `allExtras`<sup>Optional</sup> <a name="allExtras" id="projen.python.UvPipMetadata.property.allExtras"></a>

```typescript
public readonly allExtras: boolean;
```

- *Type:* boolean

---

##### `allowEmptyRequirements`<sup>Optional</sup> <a name="allowEmptyRequirements" id="projen.python.UvPipMetadata.property.allowEmptyRequirements"></a>

```typescript
public readonly allowEmptyRequirements: boolean;
```

- *Type:* boolean

---

##### `annotationStyle`<sup>Optional</sup> <a name="annotationStyle" id="projen.python.UvPipMetadata.property.annotationStyle"></a>

```typescript
public readonly annotationStyle: string;
```

- *Type:* string

---

##### `breakSystemPackages`<sup>Optional</sup> <a name="breakSystemPackages" id="projen.python.UvPipMetadata.property.breakSystemPackages"></a>

```typescript
public readonly breakSystemPackages: boolean;
```

- *Type:* boolean

---

##### `compileBytecode`<sup>Optional</sup> <a name="compileBytecode" id="projen.python.UvPipMetadata.property.compileBytecode"></a>

```typescript
public readonly compileBytecode: boolean;
```

- *Type:* boolean

---

##### `configSettings`<sup>Optional</sup> <a name="configSettings" id="projen.python.UvPipMetadata.property.configSettings"></a>

```typescript
public readonly configSettings: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

---

##### `configSettingsPackage`<sup>Optional</sup> <a name="configSettingsPackage" id="projen.python.UvPipMetadata.property.configSettingsPackage"></a>

```typescript
public readonly configSettingsPackage: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

---

##### `customCompileCommand`<sup>Optional</sup> <a name="customCompileCommand" id="projen.python.UvPipMetadata.property.customCompileCommand"></a>

```typescript
public readonly customCompileCommand: string;
```

- *Type:* string

---

##### `dependencyMetadata`<sup>Optional</sup> <a name="dependencyMetadata" id="projen.python.UvPipMetadata.property.dependencyMetadata"></a>

```typescript
public readonly dependencyMetadata: UvDependencyMetadata[];
```

- *Type:* <a href="#projen.python.UvDependencyMetadata">UvDependencyMetadata</a>[]

---

##### `emitBuildOptions`<sup>Optional</sup> <a name="emitBuildOptions" id="projen.python.UvPipMetadata.property.emitBuildOptions"></a>

```typescript
public readonly emitBuildOptions: boolean;
```

- *Type:* boolean

---

##### `emitFindLinks`<sup>Optional</sup> <a name="emitFindLinks" id="projen.python.UvPipMetadata.property.emitFindLinks"></a>

```typescript
public readonly emitFindLinks: boolean;
```

- *Type:* boolean

---

##### `emitIndexAnnotation`<sup>Optional</sup> <a name="emitIndexAnnotation" id="projen.python.UvPipMetadata.property.emitIndexAnnotation"></a>

```typescript
public readonly emitIndexAnnotation: boolean;
```

- *Type:* boolean

---

##### `emitIndexUrl`<sup>Optional</sup> <a name="emitIndexUrl" id="projen.python.UvPipMetadata.property.emitIndexUrl"></a>

```typescript
public readonly emitIndexUrl: boolean;
```

- *Type:* boolean

---

##### `emitMarkerExpression`<sup>Optional</sup> <a name="emitMarkerExpression" id="projen.python.UvPipMetadata.property.emitMarkerExpression"></a>

```typescript
public readonly emitMarkerExpression: boolean;
```

- *Type:* boolean

---

##### `excludeNewer`<sup>Optional</sup> <a name="excludeNewer" id="projen.python.UvPipMetadata.property.excludeNewer"></a>

```typescript
public readonly excludeNewer: string;
```

- *Type:* string

---

##### `excludeNewerPackage`<sup>Optional</sup> <a name="excludeNewerPackage" id="projen.python.UvPipMetadata.property.excludeNewerPackage"></a>

```typescript
public readonly excludeNewerPackage: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

---

##### `extra`<sup>Optional</sup> <a name="extra" id="projen.python.UvPipMetadata.property.extra"></a>

```typescript
public readonly extra: string[];
```

- *Type:* string[]

---

##### `extraBuildDependencies`<sup>Optional</sup> <a name="extraBuildDependencies" id="projen.python.UvPipMetadata.property.extraBuildDependencies"></a>

```typescript
public readonly extraBuildDependencies: {[ key: string ]: string[]};
```

- *Type:* {[ key: string ]: string[]}

---

##### `extraBuildVariables`<sup>Optional</sup> <a name="extraBuildVariables" id="projen.python.UvPipMetadata.property.extraBuildVariables"></a>

```typescript
public readonly extraBuildVariables: {[ key: string ]: {[ key: string ]: string}};
```

- *Type:* {[ key: string ]: {[ key: string ]: string}}

---

##### `extraIndexUrl`<sup>Optional</sup> <a name="extraIndexUrl" id="projen.python.UvPipMetadata.property.extraIndexUrl"></a>

```typescript
public readonly extraIndexUrl: string[];
```

- *Type:* string[]

---

##### `findLinks`<sup>Optional</sup> <a name="findLinks" id="projen.python.UvPipMetadata.property.findLinks"></a>

```typescript
public readonly findLinks: string[];
```

- *Type:* string[]

---

##### `forkStrategy`<sup>Optional</sup> <a name="forkStrategy" id="projen.python.UvPipMetadata.property.forkStrategy"></a>

```typescript
public readonly forkStrategy: string;
```

- *Type:* string

---

##### `generateHashes`<sup>Optional</sup> <a name="generateHashes" id="projen.python.UvPipMetadata.property.generateHashes"></a>

```typescript
public readonly generateHashes: boolean;
```

- *Type:* boolean

---

##### `group`<sup>Optional</sup> <a name="group" id="projen.python.UvPipMetadata.property.group"></a>

```typescript
public readonly group: string[];
```

- *Type:* string[]

---

##### `indexStrategy`<sup>Optional</sup> <a name="indexStrategy" id="projen.python.UvPipMetadata.property.indexStrategy"></a>

```typescript
public readonly indexStrategy: string;
```

- *Type:* string

---

##### `indexUrl`<sup>Optional</sup> <a name="indexUrl" id="projen.python.UvPipMetadata.property.indexUrl"></a>

```typescript
public readonly indexUrl: string;
```

- *Type:* string

---

##### `keyringProvider`<sup>Optional</sup> <a name="keyringProvider" id="projen.python.UvPipMetadata.property.keyringProvider"></a>

```typescript
public readonly keyringProvider: string;
```

- *Type:* string

---

##### `linkMode`<sup>Optional</sup> <a name="linkMode" id="projen.python.UvPipMetadata.property.linkMode"></a>

```typescript
public readonly linkMode: string;
```

- *Type:* string

---

##### `noAnnotate`<sup>Optional</sup> <a name="noAnnotate" id="projen.python.UvPipMetadata.property.noAnnotate"></a>

```typescript
public readonly noAnnotate: boolean;
```

- *Type:* boolean

---

##### `noBinary`<sup>Optional</sup> <a name="noBinary" id="projen.python.UvPipMetadata.property.noBinary"></a>

```typescript
public readonly noBinary: boolean;
```

- *Type:* boolean

---

##### `noBuild`<sup>Optional</sup> <a name="noBuild" id="projen.python.UvPipMetadata.property.noBuild"></a>

```typescript
public readonly noBuild: boolean;
```

- *Type:* boolean

---

##### `noBuildIsolation`<sup>Optional</sup> <a name="noBuildIsolation" id="projen.python.UvPipMetadata.property.noBuildIsolation"></a>

```typescript
public readonly noBuildIsolation: boolean;
```

- *Type:* boolean

---

##### `noBuildIsolationPackage`<sup>Optional</sup> <a name="noBuildIsolationPackage" id="projen.python.UvPipMetadata.property.noBuildIsolationPackage"></a>

```typescript
public readonly noBuildIsolationPackage: string[];
```

- *Type:* string[]

---

##### `noDeps`<sup>Optional</sup> <a name="noDeps" id="projen.python.UvPipMetadata.property.noDeps"></a>

```typescript
public readonly noDeps: boolean;
```

- *Type:* boolean

---

##### `noEmitPackage`<sup>Optional</sup> <a name="noEmitPackage" id="projen.python.UvPipMetadata.property.noEmitPackage"></a>

```typescript
public readonly noEmitPackage: string[];
```

- *Type:* string[]

---

##### `noExtra`<sup>Optional</sup> <a name="noExtra" id="projen.python.UvPipMetadata.property.noExtra"></a>

```typescript
public readonly noExtra: string[];
```

- *Type:* string[]

---

##### `noHeader`<sup>Optional</sup> <a name="noHeader" id="projen.python.UvPipMetadata.property.noHeader"></a>

```typescript
public readonly noHeader: boolean;
```

- *Type:* boolean

---

##### `noIndex`<sup>Optional</sup> <a name="noIndex" id="projen.python.UvPipMetadata.property.noIndex"></a>

```typescript
public readonly noIndex: boolean;
```

- *Type:* boolean

---

##### `noSources`<sup>Optional</sup> <a name="noSources" id="projen.python.UvPipMetadata.property.noSources"></a>

```typescript
public readonly noSources: boolean;
```

- *Type:* boolean

---

##### `noStripExtras`<sup>Optional</sup> <a name="noStripExtras" id="projen.python.UvPipMetadata.property.noStripExtras"></a>

```typescript
public readonly noStripExtras: boolean;
```

- *Type:* boolean

---

##### `noStripMarkers`<sup>Optional</sup> <a name="noStripMarkers" id="projen.python.UvPipMetadata.property.noStripMarkers"></a>

```typescript
public readonly noStripMarkers: boolean;
```

- *Type:* boolean

---

##### `onlyBinary`<sup>Optional</sup> <a name="onlyBinary" id="projen.python.UvPipMetadata.property.onlyBinary"></a>

```typescript
public readonly onlyBinary: string[];
```

- *Type:* string[]

---

##### `outputFile`<sup>Optional</sup> <a name="outputFile" id="projen.python.UvPipMetadata.property.outputFile"></a>

```typescript
public readonly outputFile: string;
```

- *Type:* string

---

##### `prefix`<sup>Optional</sup> <a name="prefix" id="projen.python.UvPipMetadata.property.prefix"></a>

```typescript
public readonly prefix: string;
```

- *Type:* string

---

##### `prerelease`<sup>Optional</sup> <a name="prerelease" id="projen.python.UvPipMetadata.property.prerelease"></a>

```typescript
public readonly prerelease: string;
```

- *Type:* string

---

##### `python`<sup>Optional</sup> <a name="python" id="projen.python.UvPipMetadata.property.python"></a>

```typescript
public readonly python: string;
```

- *Type:* string

---

##### `pythonPlatform`<sup>Optional</sup> <a name="pythonPlatform" id="projen.python.UvPipMetadata.property.pythonPlatform"></a>

```typescript
public readonly pythonPlatform: string;
```

- *Type:* string

---

##### `pythonVersion`<sup>Optional</sup> <a name="pythonVersion" id="projen.python.UvPipMetadata.property.pythonVersion"></a>

```typescript
public readonly pythonVersion: string;
```

- *Type:* string

---

##### `reinstall`<sup>Optional</sup> <a name="reinstall" id="projen.python.UvPipMetadata.property.reinstall"></a>

```typescript
public readonly reinstall: boolean;
```

- *Type:* boolean

---

##### `reinstallPackage`<sup>Optional</sup> <a name="reinstallPackage" id="projen.python.UvPipMetadata.property.reinstallPackage"></a>

```typescript
public readonly reinstallPackage: string[];
```

- *Type:* string[]

---

##### `requiresHashes`<sup>Optional</sup> <a name="requiresHashes" id="projen.python.UvPipMetadata.property.requiresHashes"></a>

```typescript
public readonly requiresHashes: boolean;
```

- *Type:* boolean

---

##### `resolution`<sup>Optional</sup> <a name="resolution" id="projen.python.UvPipMetadata.property.resolution"></a>

```typescript
public readonly resolution: string;
```

- *Type:* string

---

##### `strict`<sup>Optional</sup> <a name="strict" id="projen.python.UvPipMetadata.property.strict"></a>

```typescript
public readonly strict: boolean;
```

- *Type:* boolean

---

##### `system`<sup>Optional</sup> <a name="system" id="projen.python.UvPipMetadata.property.system"></a>

```typescript
public readonly system: boolean;
```

- *Type:* boolean

---

##### `target`<sup>Optional</sup> <a name="target" id="projen.python.UvPipMetadata.property.target"></a>

```typescript
public readonly target: string;
```

- *Type:* string

---

##### `torchBackend`<sup>Optional</sup> <a name="torchBackend" id="projen.python.UvPipMetadata.property.torchBackend"></a>

```typescript
public readonly torchBackend: string;
```

- *Type:* string

---

##### `universal`<sup>Optional</sup> <a name="universal" id="projen.python.UvPipMetadata.property.universal"></a>

```typescript
public readonly universal: boolean;
```

- *Type:* boolean

---

##### `upgrade`<sup>Optional</sup> <a name="upgrade" id="projen.python.UvPipMetadata.property.upgrade"></a>

```typescript
public readonly upgrade: boolean;
```

- *Type:* boolean

---

##### `upgradePackage`<sup>Optional</sup> <a name="upgradePackage" id="projen.python.UvPipMetadata.property.upgradePackage"></a>

```typescript
public readonly upgradePackage: string[];
```

- *Type:* string[]

---

##### `verifyHashes`<sup>Optional</sup> <a name="verifyHashes" id="projen.python.UvPipMetadata.property.verifyHashes"></a>

```typescript
public readonly verifyHashes: boolean;
```

- *Type:* boolean

---

### UvPyprojectOptions <a name="UvPyprojectOptions" id="projen.python.UvPyprojectOptions"></a>

Options for UV pyproject.toml configuration.

#### Initializer <a name="Initializer" id="projen.python.UvPyprojectOptions.Initializer"></a>

```typescript
import { python } from 'projen'

const uvPyprojectOptions: python.UvPyprojectOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.UvPyprojectOptions.property.addBounds">addBounds</a></code> | <code>string</code> | The default version specifier when adding a dependency. |
| <code><a href="#projen.python.UvPyprojectOptions.property.allowInsecureHost">allowInsecureHost</a></code> | <code>string[]</code> | Allow insecure connections to host. |
| <code><a href="#projen.python.UvPyprojectOptions.property.authorEmail">authorEmail</a></code> | <code>string</code> | Email of the package author. |
| <code><a href="#projen.python.UvPyprojectOptions.property.authorName">authorName</a></code> | <code>string</code> | Name of the package author. |
| <code><a href="#projen.python.UvPyprojectOptions.property.buildBackend">buildBackend</a></code> | <code><a href="#projen.python.UvBuildBackend">UvBuildBackend</a></code> | Settings for the uv build backend (uv_build). |
| <code><a href="#projen.python.UvPyprojectOptions.property.buildConstraintDependencies">buildConstraintDependencies</a></code> | <code>string[]</code> | Constraints to apply when solving build dependencies. |
| <code><a href="#projen.python.UvPyprojectOptions.property.cacheDir">cacheDir</a></code> | <code>string</code> | Path to the cache directory. |
| <code><a href="#projen.python.UvPyprojectOptions.property.cacheKeys">cacheKeys</a></code> | <code>{[ key: string ]: any}</code> | The keys to consider when caching builds for the project. |
| <code><a href="#projen.python.UvPyprojectOptions.property.checkUrl">checkUrl</a></code> | <code>string</code> | Check an index URL for existing files to skip duplicate uploads. |
| <code><a href="#projen.python.UvPyprojectOptions.property.classifiers">classifiers</a></code> | <code>string[]</code> | Python package classifiers. |
| <code><a href="#projen.python.UvPyprojectOptions.property.compileBytecode">compileBytecode</a></code> | <code>string</code> | Compile Python files to bytecode after installation. |
| <code><a href="#projen.python.UvPyprojectOptions.property.concurrentBuilds">concurrentBuilds</a></code> | <code>number</code> | The maximum number of source distributions that uv will build concurrently at any given time. |
| <code><a href="#projen.python.UvPyprojectOptions.property.concurrentDownloads">concurrentDownloads</a></code> | <code>number</code> | The maximum number of in-flight concurrent downloads that uv will perform at any given time. |
| <code><a href="#projen.python.UvPyprojectOptions.property.concurrentInstalls">concurrentInstalls</a></code> | <code>number</code> | The number of threads used when installing and unzipping packages. |
| <code><a href="#projen.python.UvPyprojectOptions.property.configSettings">configSettings</a></code> | <code>{[ key: string ]: any}</code> | Settings to pass to the PEP 517 build backend. |
| <code><a href="#projen.python.UvPyprojectOptions.property.configSettingsPackage">configSettingsPackage</a></code> | <code>{[ key: string ]: any}</code> | Settings to pass to the PEP 517 build backend for specific packages. |
| <code><a href="#projen.python.UvPyprojectOptions.property.conflicts">conflicts</a></code> | <code>{[ key: string ]: string}[][]</code> | Declare collections of extras or dependency groups that are conflicting (i.e., mutually exclusive). |
| <code><a href="#projen.python.UvPyprojectOptions.property.constraintDependencies">constraintDependencies</a></code> | <code>string[]</code> | Constraints to apply when resolving the project's dependencies. |
| <code><a href="#projen.python.UvPyprojectOptions.property.defaultGroups">defaultGroups</a></code> | <code>string \| string[]</code> | The list of dependency-groups to install by default. |
| <code><a href="#projen.python.UvPyprojectOptions.property.dependencyMetadata">dependencyMetadata</a></code> | <code><a href="#projen.python.UvDependencyMetadata">UvDependencyMetadata</a>[]</code> | Pre-defined static metadata for dependencies of the project (direct or transitive). |
| <code><a href="#projen.python.UvPyprojectOptions.property.description">description</a></code> | <code>string</code> | Description of the package. |
| <code><a href="#projen.python.UvPyprojectOptions.property.documentation">documentation</a></code> | <code>string</code> | Documentation URL of the package. |
| <code><a href="#projen.python.UvPyprojectOptions.property.environments">environments</a></code> | <code>string[]</code> | Supported environments against which to resolve dependencies. |
| <code><a href="#projen.python.UvPyprojectOptions.property.excludeDependencies">excludeDependencies</a></code> | <code>string[]</code> | Dependencies to exclude when resolving the project's dependencies. |
| <code><a href="#projen.python.UvPyprojectOptions.property.excludeNewer">excludeNewer</a></code> | <code>string</code> | Limit candidate packages to those that were uploaded prior to a given point in time. |
| <code><a href="#projen.python.UvPyprojectOptions.property.excludeNewerPackage">excludeNewerPackage</a></code> | <code>{[ key: string ]: string}</code> | Limit candidate packages for specific packages to those that were uploaded prior to the given date. |
| <code><a href="#projen.python.UvPyprojectOptions.property.extraBuildDependencies">extraBuildDependencies</a></code> | <code>{[ key: string ]: string[]}</code> | Additional build dependencies for packages. |
| <code><a href="#projen.python.UvPyprojectOptions.property.extraBuildVariables">extraBuildVariables</a></code> | <code>{[ key: string ]: {[ key: string ]: string}}</code> | Extra environment variables to set when building certain packages. |
| <code><a href="#projen.python.UvPyprojectOptions.property.extraIndexUrl">extraIndexUrl</a></code> | <code>string[]</code> | Extra URLs of package indexes to use, in addition to --index-url. |
| <code><a href="#projen.python.UvPyprojectOptions.property.findLinks">findLinks</a></code> | <code>string[]</code> | Locations to search for candidate distributions, in addition to those found in the registry indexes. |
| <code><a href="#projen.python.UvPyprojectOptions.property.forkStrategy">forkStrategy</a></code> | <code>string</code> | The strategy to use when selecting multiple versions of a given package across Python versions and platforms. |
| <code><a href="#projen.python.UvPyprojectOptions.property.homepage">homepage</a></code> | <code>string</code> | Homepage URL of the package. |
| <code><a href="#projen.python.UvPyprojectOptions.property.index">index</a></code> | <code><a href="#projen.python.UvIndex">UvIndex</a>[]</code> | The indexes to use when resolving dependencies. |
| <code><a href="#projen.python.UvPyprojectOptions.property.indexStrategy">indexStrategy</a></code> | <code>string</code> | The strategy to use when resolving against multiple index URLs. |
| <code><a href="#projen.python.UvPyprojectOptions.property.indexUrl">indexUrl</a></code> | <code>string</code> | The URL of the Python package index (by default: https://pypi.org/simple). |
| <code><a href="#projen.python.UvPyprojectOptions.property.keyringProvider">keyringProvider</a></code> | <code>string</code> | Attempt to use keyring for authentication for index URLs. |
| <code><a href="#projen.python.UvPyprojectOptions.property.keywords">keywords</a></code> | <code>string[]</code> | Keywords for the package. |
| <code><a href="#projen.python.UvPyprojectOptions.property.license">license</a></code> | <code>string</code> | License of the package. |
| <code><a href="#projen.python.UvPyprojectOptions.property.linkMode">linkMode</a></code> | <code>string</code> | The method to use when installing packages from the global cache. |
| <code><a href="#projen.python.UvPyprojectOptions.property.managed">managed</a></code> | <code>boolean</code> | Whether the project is managed by uv. |
| <code><a href="#projen.python.UvPyprojectOptions.property.name">name</a></code> | <code>string</code> | Name of the package. |
| <code><a href="#projen.python.UvPyprojectOptions.property.nativeTls">nativeTls</a></code> | <code>boolean</code> | Whether to load TLS certificates from the platform's native certificate store. |
| <code><a href="#projen.python.UvPyprojectOptions.property.noBinary">noBinary</a></code> | <code>boolean</code> | Don't install pre-built wheels. |
| <code><a href="#projen.python.UvPyprojectOptions.property.noBinaryPackage">noBinaryPackage</a></code> | <code>string[]</code> | Don't install pre-built wheels for a specific package. |
| <code><a href="#projen.python.UvPyprojectOptions.property.noBuild">noBuild</a></code> | <code>boolean</code> | Don't build source distributions. |
| <code><a href="#projen.python.UvPyprojectOptions.property.noBuildIsolation">noBuildIsolation</a></code> | <code>boolean</code> | Disable isolation when building source distributions. |
| <code><a href="#projen.python.UvPyprojectOptions.property.noBuildIsolationPackage">noBuildIsolationPackage</a></code> | <code>string[]</code> | Disable isolation when building source distributions for a specific package. |
| <code><a href="#projen.python.UvPyprojectOptions.property.noBuildPackage">noBuildPackage</a></code> | <code>string[]</code> | Don't build source distributions for a specific package. |
| <code><a href="#projen.python.UvPyprojectOptions.property.noCache">noCache</a></code> | <code>boolean</code> | Avoid reading from or writing to the cache, instead using a temporary directory for the duration of the operation. |
| <code><a href="#projen.python.UvPyprojectOptions.property.noIndex">noIndex</a></code> | <code>boolean</code> | Ignore all registry indexes (e.g., PyPI), instead relying on direct URL dependencies and those provided via --find-links. |
| <code><a href="#projen.python.UvPyprojectOptions.property.noSources">noSources</a></code> | <code>boolean</code> | Ignore the tool.uv.sources table when resolving dependencies. Used to lock against the standards-compliant, publishable package metadata, as opposed to using any local or Git sources. |
| <code><a href="#projen.python.UvPyprojectOptions.property.offline">offline</a></code> | <code>boolean</code> | Disable network access, relying only on locally cached data and locally available files. |
| <code><a href="#projen.python.UvPyprojectOptions.property.overrideDependencies">overrideDependencies</a></code> | <code>string[]</code> | Overrides to apply when resolving the project's dependencies. |
| <code><a href="#projen.python.UvPyprojectOptions.property.package">package</a></code> | <code>boolean</code> | Whether the project should be considered a Python package, or a non-package ("virtual") project. |
| <code><a href="#projen.python.UvPyprojectOptions.property.pip">pip</a></code> | <code><a href="#projen.python.UvPipMetadata">UvPipMetadata</a></code> | Settings that are specific to the uv pip command-line interface. |
| <code><a href="#projen.python.UvPyprojectOptions.property.prerelease">prerelease</a></code> | <code>string</code> | The strategy to use when considering pre-release versions. |
| <code><a href="#projen.python.UvPyprojectOptions.property.preview">preview</a></code> | <code>boolean</code> | Whether to enable experimental, preview features. |
| <code><a href="#projen.python.UvPyprojectOptions.property.publishUrl">publishUrl</a></code> | <code>string</code> | The URL for publishing packages to the Python package index (by default: https://upload.pypi.org/legacy/). |
| <code><a href="#projen.python.UvPyprojectOptions.property.pypyInstallMirror">pypyInstallMirror</a></code> | <code>string</code> | Mirror URL to use for downloading managed PyPy installations. |
| <code><a href="#projen.python.UvPyprojectOptions.property.pythonDownloads">pythonDownloads</a></code> | <code>string</code> | Whether to allow Python downloads. |
| <code><a href="#projen.python.UvPyprojectOptions.property.pythonDownloadsJsonUrl">pythonDownloadsJsonUrl</a></code> | <code>string</code> | URL pointing to JSON of custom Python installations. |
| <code><a href="#projen.python.UvPyprojectOptions.property.pythonInstallMirror">pythonInstallMirror</a></code> | <code>string</code> | Mirror URL for downloading managed Python installations. |
| <code><a href="#projen.python.UvPyprojectOptions.property.pythonPreference">pythonPreference</a></code> | <code>string</code> | Whether to prefer using Python installations that are already present on the system, or those that are downloaded and installed by uv. |
| <code><a href="#projen.python.UvPyprojectOptions.property.readme">readme</a></code> | <code>string</code> | Path to the readme file. |
| <code><a href="#projen.python.UvPyprojectOptions.property.reinstall">reinstall</a></code> | <code>boolean</code> | Reinstall all packages, regardless of whether they're already installed. |
| <code><a href="#projen.python.UvPyprojectOptions.property.reinstallPackage">reinstallPackage</a></code> | <code>string[]</code> | Reinstall a specific package, regardless of whether it's already installed. |
| <code><a href="#projen.python.UvPyprojectOptions.property.repository">repository</a></code> | <code>string</code> | Repository URL of the package. |
| <code><a href="#projen.python.UvPyprojectOptions.property.requiredEnvironments">requiredEnvironments</a></code> | <code>string \| string[]</code> | A list of required platforms, for packages that lack source distributions. |
| <code><a href="#projen.python.UvPyprojectOptions.property.requiredVersion">requiredVersion</a></code> | <code>string</code> | Enforce a requirement on the version of uv. |
| <code><a href="#projen.python.UvPyprojectOptions.property.requiresPython">requiresPython</a></code> | <code>string</code> | Python version requirement string. |
| <code><a href="#projen.python.UvPyprojectOptions.property.resolution">resolution</a></code> | <code>string</code> | The strategy to use when selecting between the different compatible versions for a given package requirement. |
| <code><a href="#projen.python.UvPyprojectOptions.property.sources">sources</a></code> | <code>{[ key: string ]: <a href="#projen.python.UvSource">UvSource</a>}</code> | The sources to use when resolving dependencies. |
| <code><a href="#projen.python.UvPyprojectOptions.property.trustedPublishing">trustedPublishing</a></code> | <code>string</code> | Configure trusted publishing. |
| <code><a href="#projen.python.UvPyprojectOptions.property.upgrade">upgrade</a></code> | <code>boolean</code> | Allow package upgrades, ignoring pinned versions in any existing output file. |
| <code><a href="#projen.python.UvPyprojectOptions.property.upgradePackage">upgradePackage</a></code> | <code>string[]</code> | Allow upgrades for a specific package, ignoring pinned versions in any existing output file. |
| <code><a href="#projen.python.UvPyprojectOptions.property.urls">urls</a></code> | <code>{[ key: string ]: string}</code> | Additional URLs associated with the package. |
| <code><a href="#projen.python.UvPyprojectOptions.property.version">version</a></code> | <code>string</code> | Version of the package. |
| <code><a href="#projen.python.UvPyprojectOptions.property.workspace">workspace</a></code> | <code><a href="#projen.python.UvWorkspace">UvWorkspace</a></code> | Packages to include or exclude as workspace members. |
| <code><a href="#projen.python.UvPyprojectOptions.property.dependencies">dependencies</a></code> | <code>string[]</code> | A list of dependencies for the project. |
| <code><a href="#projen.python.UvPyprojectOptions.property.devDependencies">devDependencies</a></code> | <code>string[]</code> | A list of development dependencies for the project. |
| <code><a href="#projen.python.UvPyprojectOptions.property.pythonVersion">pythonVersion</a></code> | <code>string</code> | Python version to use. |

---

##### `addBounds`<sup>Optional</sup> <a name="addBounds" id="projen.python.UvPyprojectOptions.property.addBounds"></a>

```typescript
public readonly addBounds: string;
```

- *Type:* string

The default version specifier when adding a dependency.

---

##### `allowInsecureHost`<sup>Optional</sup> <a name="allowInsecureHost" id="projen.python.UvPyprojectOptions.property.allowInsecureHost"></a>

```typescript
public readonly allowInsecureHost: string[];
```

- *Type:* string[]

Allow insecure connections to host.

---

##### `authorEmail`<sup>Optional</sup> <a name="authorEmail" id="projen.python.UvPyprojectOptions.property.authorEmail"></a>

```typescript
public readonly authorEmail: string;
```

- *Type:* string

Email of the package author.

---

##### `authorName`<sup>Optional</sup> <a name="authorName" id="projen.python.UvPyprojectOptions.property.authorName"></a>

```typescript
public readonly authorName: string;
```

- *Type:* string

Name of the package author.

---

##### `buildBackend`<sup>Optional</sup> <a name="buildBackend" id="projen.python.UvPyprojectOptions.property.buildBackend"></a>

```typescript
public readonly buildBackend: UvBuildBackend;
```

- *Type:* <a href="#projen.python.UvBuildBackend">UvBuildBackend</a>

Settings for the uv build backend (uv_build).

---

##### `buildConstraintDependencies`<sup>Optional</sup> <a name="buildConstraintDependencies" id="projen.python.UvPyprojectOptions.property.buildConstraintDependencies"></a>

```typescript
public readonly buildConstraintDependencies: string[];
```

- *Type:* string[]

Constraints to apply when solving build dependencies.

---

##### `cacheDir`<sup>Optional</sup> <a name="cacheDir" id="projen.python.UvPyprojectOptions.property.cacheDir"></a>

```typescript
public readonly cacheDir: string;
```

- *Type:* string

Path to the cache directory.

---

##### `cacheKeys`<sup>Optional</sup> <a name="cacheKeys" id="projen.python.UvPyprojectOptions.property.cacheKeys"></a>

```typescript
public readonly cacheKeys: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

The keys to consider when caching builds for the project.

---

##### `checkUrl`<sup>Optional</sup> <a name="checkUrl" id="projen.python.UvPyprojectOptions.property.checkUrl"></a>

```typescript
public readonly checkUrl: string;
```

- *Type:* string

Check an index URL for existing files to skip duplicate uploads.

---

##### `classifiers`<sup>Optional</sup> <a name="classifiers" id="projen.python.UvPyprojectOptions.property.classifiers"></a>

```typescript
public readonly classifiers: string[];
```

- *Type:* string[]

Python package classifiers.

> [https://pypi.org/classifiers/](https://pypi.org/classifiers/)

---

##### `compileBytecode`<sup>Optional</sup> <a name="compileBytecode" id="projen.python.UvPyprojectOptions.property.compileBytecode"></a>

```typescript
public readonly compileBytecode: string;
```

- *Type:* string

Compile Python files to bytecode after installation.

---

##### `concurrentBuilds`<sup>Optional</sup> <a name="concurrentBuilds" id="projen.python.UvPyprojectOptions.property.concurrentBuilds"></a>

```typescript
public readonly concurrentBuilds: number;
```

- *Type:* number

The maximum number of source distributions that uv will build concurrently at any given time.

---

##### `concurrentDownloads`<sup>Optional</sup> <a name="concurrentDownloads" id="projen.python.UvPyprojectOptions.property.concurrentDownloads"></a>

```typescript
public readonly concurrentDownloads: number;
```

- *Type:* number

The maximum number of in-flight concurrent downloads that uv will perform at any given time.

---

##### `concurrentInstalls`<sup>Optional</sup> <a name="concurrentInstalls" id="projen.python.UvPyprojectOptions.property.concurrentInstalls"></a>

```typescript
public readonly concurrentInstalls: number;
```

- *Type:* number

The number of threads used when installing and unzipping packages.

---

##### `configSettings`<sup>Optional</sup> <a name="configSettings" id="projen.python.UvPyprojectOptions.property.configSettings"></a>

```typescript
public readonly configSettings: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

Settings to pass to the PEP 517 build backend.

---

##### `configSettingsPackage`<sup>Optional</sup> <a name="configSettingsPackage" id="projen.python.UvPyprojectOptions.property.configSettingsPackage"></a>

```typescript
public readonly configSettingsPackage: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

Settings to pass to the PEP 517 build backend for specific packages.

---

##### `conflicts`<sup>Optional</sup> <a name="conflicts" id="projen.python.UvPyprojectOptions.property.conflicts"></a>

```typescript
public readonly conflicts: {[ key: string ]: string}[][];
```

- *Type:* {[ key: string ]: string}[][]

Declare collections of extras or dependency groups that are conflicting (i.e., mutually exclusive).

---

##### `constraintDependencies`<sup>Optional</sup> <a name="constraintDependencies" id="projen.python.UvPyprojectOptions.property.constraintDependencies"></a>

```typescript
public readonly constraintDependencies: string[];
```

- *Type:* string[]

Constraints to apply when resolving the project's dependencies.

---

##### `defaultGroups`<sup>Optional</sup> <a name="defaultGroups" id="projen.python.UvPyprojectOptions.property.defaultGroups"></a>

```typescript
public readonly defaultGroups: string | string[];
```

- *Type:* string | string[]

The list of dependency-groups to install by default.

---

##### `dependencyMetadata`<sup>Optional</sup> <a name="dependencyMetadata" id="projen.python.UvPyprojectOptions.property.dependencyMetadata"></a>

```typescript
public readonly dependencyMetadata: UvDependencyMetadata[];
```

- *Type:* <a href="#projen.python.UvDependencyMetadata">UvDependencyMetadata</a>[]

Pre-defined static metadata for dependencies of the project (direct or transitive).

When provided, enables the resolver to use the specified metadata instead of querying the registry or building the relevant package from source.

---

##### `description`<sup>Optional</sup> <a name="description" id="projen.python.UvPyprojectOptions.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

Description of the package.

---

##### `documentation`<sup>Optional</sup> <a name="documentation" id="projen.python.UvPyprojectOptions.property.documentation"></a>

```typescript
public readonly documentation: string;
```

- *Type:* string

Documentation URL of the package.

---

##### `environments`<sup>Optional</sup> <a name="environments" id="projen.python.UvPyprojectOptions.property.environments"></a>

```typescript
public readonly environments: string[];
```

- *Type:* string[]

Supported environments against which to resolve dependencies.

---

##### `excludeDependencies`<sup>Optional</sup> <a name="excludeDependencies" id="projen.python.UvPyprojectOptions.property.excludeDependencies"></a>

```typescript
public readonly excludeDependencies: string[];
```

- *Type:* string[]

Dependencies to exclude when resolving the project's dependencies.

---

##### `excludeNewer`<sup>Optional</sup> <a name="excludeNewer" id="projen.python.UvPyprojectOptions.property.excludeNewer"></a>

```typescript
public readonly excludeNewer: string;
```

- *Type:* string

Limit candidate packages to those that were uploaded prior to a given point in time.

---

##### `excludeNewerPackage`<sup>Optional</sup> <a name="excludeNewerPackage" id="projen.python.UvPyprojectOptions.property.excludeNewerPackage"></a>

```typescript
public readonly excludeNewerPackage: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Limit candidate packages for specific packages to those that were uploaded prior to the given date.

---

##### `extraBuildDependencies`<sup>Optional</sup> <a name="extraBuildDependencies" id="projen.python.UvPyprojectOptions.property.extraBuildDependencies"></a>

```typescript
public readonly extraBuildDependencies: {[ key: string ]: string[]};
```

- *Type:* {[ key: string ]: string[]}

Additional build dependencies for packages.

---

##### `extraBuildVariables`<sup>Optional</sup> <a name="extraBuildVariables" id="projen.python.UvPyprojectOptions.property.extraBuildVariables"></a>

```typescript
public readonly extraBuildVariables: {[ key: string ]: {[ key: string ]: string}};
```

- *Type:* {[ key: string ]: {[ key: string ]: string}}

Extra environment variables to set when building certain packages.

---

##### `extraIndexUrl`<sup>Optional</sup> <a name="extraIndexUrl" id="projen.python.UvPyprojectOptions.property.extraIndexUrl"></a>

```typescript
public readonly extraIndexUrl: string[];
```

- *Type:* string[]

Extra URLs of package indexes to use, in addition to --index-url.

---

##### `findLinks`<sup>Optional</sup> <a name="findLinks" id="projen.python.UvPyprojectOptions.property.findLinks"></a>

```typescript
public readonly findLinks: string[];
```

- *Type:* string[]

Locations to search for candidate distributions, in addition to those found in the registry indexes.

---

##### `forkStrategy`<sup>Optional</sup> <a name="forkStrategy" id="projen.python.UvPyprojectOptions.property.forkStrategy"></a>

```typescript
public readonly forkStrategy: string;
```

- *Type:* string

The strategy to use when selecting multiple versions of a given package across Python versions and platforms.

---

##### `homepage`<sup>Optional</sup> <a name="homepage" id="projen.python.UvPyprojectOptions.property.homepage"></a>

```typescript
public readonly homepage: string;
```

- *Type:* string

Homepage URL of the package.

---

##### `index`<sup>Optional</sup> <a name="index" id="projen.python.UvPyprojectOptions.property.index"></a>

```typescript
public readonly index: UvIndex[];
```

- *Type:* <a href="#projen.python.UvIndex">UvIndex</a>[]

The indexes to use when resolving dependencies.

---

##### `indexStrategy`<sup>Optional</sup> <a name="indexStrategy" id="projen.python.UvPyprojectOptions.property.indexStrategy"></a>

```typescript
public readonly indexStrategy: string;
```

- *Type:* string

The strategy to use when resolving against multiple index URLs.

---

##### `indexUrl`<sup>Optional</sup> <a name="indexUrl" id="projen.python.UvPyprojectOptions.property.indexUrl"></a>

```typescript
public readonly indexUrl: string;
```

- *Type:* string

The URL of the Python package index (by default: https://pypi.org/simple).

---

##### `keyringProvider`<sup>Optional</sup> <a name="keyringProvider" id="projen.python.UvPyprojectOptions.property.keyringProvider"></a>

```typescript
public readonly keyringProvider: string;
```

- *Type:* string

Attempt to use keyring for authentication for index URLs.

---

##### `keywords`<sup>Optional</sup> <a name="keywords" id="projen.python.UvPyprojectOptions.property.keywords"></a>

```typescript
public readonly keywords: string[];
```

- *Type:* string[]

Keywords for the package.

---

##### `license`<sup>Optional</sup> <a name="license" id="projen.python.UvPyprojectOptions.property.license"></a>

```typescript
public readonly license: string;
```

- *Type:* string

License of the package.

---

##### `linkMode`<sup>Optional</sup> <a name="linkMode" id="projen.python.UvPyprojectOptions.property.linkMode"></a>

```typescript
public readonly linkMode: string;
```

- *Type:* string

The method to use when installing packages from the global cache.

---

##### `managed`<sup>Optional</sup> <a name="managed" id="projen.python.UvPyprojectOptions.property.managed"></a>

```typescript
public readonly managed: boolean;
```

- *Type:* boolean

Whether the project is managed by uv.

If false, uv will ignore the project when uv run is invoked.

---

##### `name`<sup>Optional</sup> <a name="name" id="projen.python.UvPyprojectOptions.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

Name of the package.

---

##### `nativeTls`<sup>Optional</sup> <a name="nativeTls" id="projen.python.UvPyprojectOptions.property.nativeTls"></a>

```typescript
public readonly nativeTls: boolean;
```

- *Type:* boolean

Whether to load TLS certificates from the platform's native certificate store.

---

##### `noBinary`<sup>Optional</sup> <a name="noBinary" id="projen.python.UvPyprojectOptions.property.noBinary"></a>

```typescript
public readonly noBinary: boolean;
```

- *Type:* boolean

Don't install pre-built wheels.

---

##### `noBinaryPackage`<sup>Optional</sup> <a name="noBinaryPackage" id="projen.python.UvPyprojectOptions.property.noBinaryPackage"></a>

```typescript
public readonly noBinaryPackage: string[];
```

- *Type:* string[]

Don't install pre-built wheels for a specific package.

---

##### `noBuild`<sup>Optional</sup> <a name="noBuild" id="projen.python.UvPyprojectOptions.property.noBuild"></a>

```typescript
public readonly noBuild: boolean;
```

- *Type:* boolean

Don't build source distributions.

---

##### `noBuildIsolation`<sup>Optional</sup> <a name="noBuildIsolation" id="projen.python.UvPyprojectOptions.property.noBuildIsolation"></a>

```typescript
public readonly noBuildIsolation: boolean;
```

- *Type:* boolean

Disable isolation when building source distributions.

---

##### `noBuildIsolationPackage`<sup>Optional</sup> <a name="noBuildIsolationPackage" id="projen.python.UvPyprojectOptions.property.noBuildIsolationPackage"></a>

```typescript
public readonly noBuildIsolationPackage: string[];
```

- *Type:* string[]

Disable isolation when building source distributions for a specific package.

---

##### `noBuildPackage`<sup>Optional</sup> <a name="noBuildPackage" id="projen.python.UvPyprojectOptions.property.noBuildPackage"></a>

```typescript
public readonly noBuildPackage: string[];
```

- *Type:* string[]

Don't build source distributions for a specific package.

---

##### `noCache`<sup>Optional</sup> <a name="noCache" id="projen.python.UvPyprojectOptions.property.noCache"></a>

```typescript
public readonly noCache: boolean;
```

- *Type:* boolean

Avoid reading from or writing to the cache, instead using a temporary directory for the duration of the operation.

---

##### `noIndex`<sup>Optional</sup> <a name="noIndex" id="projen.python.UvPyprojectOptions.property.noIndex"></a>

```typescript
public readonly noIndex: boolean;
```

- *Type:* boolean

Ignore all registry indexes (e.g., PyPI), instead relying on direct URL dependencies and those provided via --find-links.

---

##### `noSources`<sup>Optional</sup> <a name="noSources" id="projen.python.UvPyprojectOptions.property.noSources"></a>

```typescript
public readonly noSources: boolean;
```

- *Type:* boolean

Ignore the tool.uv.sources table when resolving dependencies. Used to lock against the standards-compliant, publishable package metadata, as opposed to using any local or Git sources.

---

##### `offline`<sup>Optional</sup> <a name="offline" id="projen.python.UvPyprojectOptions.property.offline"></a>

```typescript
public readonly offline: boolean;
```

- *Type:* boolean

Disable network access, relying only on locally cached data and locally available files.

---

##### `overrideDependencies`<sup>Optional</sup> <a name="overrideDependencies" id="projen.python.UvPyprojectOptions.property.overrideDependencies"></a>

```typescript
public readonly overrideDependencies: string[];
```

- *Type:* string[]

Overrides to apply when resolving the project's dependencies.

---

##### `package`<sup>Optional</sup> <a name="package" id="projen.python.UvPyprojectOptions.property.package"></a>

```typescript
public readonly package: boolean;
```

- *Type:* boolean

Whether the project should be considered a Python package, or a non-package ("virtual") project.

---

##### `pip`<sup>Optional</sup> <a name="pip" id="projen.python.UvPyprojectOptions.property.pip"></a>

```typescript
public readonly pip: UvPipMetadata;
```

- *Type:* <a href="#projen.python.UvPipMetadata">UvPipMetadata</a>

Settings that are specific to the uv pip command-line interface.

---

##### `prerelease`<sup>Optional</sup> <a name="prerelease" id="projen.python.UvPyprojectOptions.property.prerelease"></a>

```typescript
public readonly prerelease: string;
```

- *Type:* string

The strategy to use when considering pre-release versions.

---

##### `preview`<sup>Optional</sup> <a name="preview" id="projen.python.UvPyprojectOptions.property.preview"></a>

```typescript
public readonly preview: boolean;
```

- *Type:* boolean

Whether to enable experimental, preview features.

---

##### `publishUrl`<sup>Optional</sup> <a name="publishUrl" id="projen.python.UvPyprojectOptions.property.publishUrl"></a>

```typescript
public readonly publishUrl: string;
```

- *Type:* string

The URL for publishing packages to the Python package index (by default: https://upload.pypi.org/legacy/).

---

##### `pypyInstallMirror`<sup>Optional</sup> <a name="pypyInstallMirror" id="projen.python.UvPyprojectOptions.property.pypyInstallMirror"></a>

```typescript
public readonly pypyInstallMirror: string;
```

- *Type:* string

Mirror URL to use for downloading managed PyPy installations.

---

##### `pythonDownloads`<sup>Optional</sup> <a name="pythonDownloads" id="projen.python.UvPyprojectOptions.property.pythonDownloads"></a>

```typescript
public readonly pythonDownloads: string;
```

- *Type:* string

Whether to allow Python downloads.

---

##### `pythonDownloadsJsonUrl`<sup>Optional</sup> <a name="pythonDownloadsJsonUrl" id="projen.python.UvPyprojectOptions.property.pythonDownloadsJsonUrl"></a>

```typescript
public readonly pythonDownloadsJsonUrl: string;
```

- *Type:* string

URL pointing to JSON of custom Python installations.

---

##### `pythonInstallMirror`<sup>Optional</sup> <a name="pythonInstallMirror" id="projen.python.UvPyprojectOptions.property.pythonInstallMirror"></a>

```typescript
public readonly pythonInstallMirror: string;
```

- *Type:* string

Mirror URL for downloading managed Python installations.

---

##### `pythonPreference`<sup>Optional</sup> <a name="pythonPreference" id="projen.python.UvPyprojectOptions.property.pythonPreference"></a>

```typescript
public readonly pythonPreference: string;
```

- *Type:* string

Whether to prefer using Python installations that are already present on the system, or those that are downloaded and installed by uv.

---

##### `readme`<sup>Optional</sup> <a name="readme" id="projen.python.UvPyprojectOptions.property.readme"></a>

```typescript
public readonly readme: string;
```

- *Type:* string

Path to the readme file.

---

##### `reinstall`<sup>Optional</sup> <a name="reinstall" id="projen.python.UvPyprojectOptions.property.reinstall"></a>

```typescript
public readonly reinstall: boolean;
```

- *Type:* boolean

Reinstall all packages, regardless of whether they're already installed.

Implies refresh.

---

##### `reinstallPackage`<sup>Optional</sup> <a name="reinstallPackage" id="projen.python.UvPyprojectOptions.property.reinstallPackage"></a>

```typescript
public readonly reinstallPackage: string[];
```

- *Type:* string[]

Reinstall a specific package, regardless of whether it's already installed.

Implies refresh-package.

---

##### `repository`<sup>Optional</sup> <a name="repository" id="projen.python.UvPyprojectOptions.property.repository"></a>

```typescript
public readonly repository: string;
```

- *Type:* string

Repository URL of the package.

---

##### `requiredEnvironments`<sup>Optional</sup> <a name="requiredEnvironments" id="projen.python.UvPyprojectOptions.property.requiredEnvironments"></a>

```typescript
public readonly requiredEnvironments: string | string[];
```

- *Type:* string | string[]

A list of required platforms, for packages that lack source distributions.

---

##### `requiredVersion`<sup>Optional</sup> <a name="requiredVersion" id="projen.python.UvPyprojectOptions.property.requiredVersion"></a>

```typescript
public readonly requiredVersion: string;
```

- *Type:* string

Enforce a requirement on the version of uv.

---

##### `requiresPython`<sup>Optional</sup> <a name="requiresPython" id="projen.python.UvPyprojectOptions.property.requiresPython"></a>

```typescript
public readonly requiresPython: string;
```

- *Type:* string

Python version requirement string.

---

##### `resolution`<sup>Optional</sup> <a name="resolution" id="projen.python.UvPyprojectOptions.property.resolution"></a>

```typescript
public readonly resolution: string;
```

- *Type:* string

The strategy to use when selecting between the different compatible versions for a given package requirement.

---

##### `sources`<sup>Optional</sup> <a name="sources" id="projen.python.UvPyprojectOptions.property.sources"></a>

```typescript
public readonly sources: {[ key: string ]: UvSource};
```

- *Type:* {[ key: string ]: <a href="#projen.python.UvSource">UvSource</a>}

The sources to use when resolving dependencies.

---

##### `trustedPublishing`<sup>Optional</sup> <a name="trustedPublishing" id="projen.python.UvPyprojectOptions.property.trustedPublishing"></a>

```typescript
public readonly trustedPublishing: string;
```

- *Type:* string

Configure trusted publishing.

---

##### `upgrade`<sup>Optional</sup> <a name="upgrade" id="projen.python.UvPyprojectOptions.property.upgrade"></a>

```typescript
public readonly upgrade: boolean;
```

- *Type:* boolean

Allow package upgrades, ignoring pinned versions in any existing output file.

---

##### `upgradePackage`<sup>Optional</sup> <a name="upgradePackage" id="projen.python.UvPyprojectOptions.property.upgradePackage"></a>

```typescript
public readonly upgradePackage: string[];
```

- *Type:* string[]

Allow upgrades for a specific package, ignoring pinned versions in any existing output file.

---

##### `urls`<sup>Optional</sup> <a name="urls" id="projen.python.UvPyprojectOptions.property.urls"></a>

```typescript
public readonly urls: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Additional URLs associated with the package.

---

##### `version`<sup>Optional</sup> <a name="version" id="projen.python.UvPyprojectOptions.property.version"></a>

```typescript
public readonly version: string;
```

- *Type:* string

Version of the package.

---

##### `workspace`<sup>Optional</sup> <a name="workspace" id="projen.python.UvPyprojectOptions.property.workspace"></a>

```typescript
public readonly workspace: UvWorkspace;
```

- *Type:* <a href="#projen.python.UvWorkspace">UvWorkspace</a>

Packages to include or exclude as workspace members.

---

##### `dependencies`<sup>Optional</sup> <a name="dependencies" id="projen.python.UvPyprojectOptions.property.dependencies"></a>

```typescript
public readonly dependencies: string[];
```

- *Type:* string[]

A list of dependencies for the project.

Each entry should be in the format: `<module>@<semver>`

---

##### `devDependencies`<sup>Optional</sup> <a name="devDependencies" id="projen.python.UvPyprojectOptions.property.devDependencies"></a>

```typescript
public readonly devDependencies: string[];
```

- *Type:* string[]

A list of development dependencies for the project.

Each entry should be in the format: `<module>@<semver>`

---

##### `pythonVersion`<sup>Optional</sup> <a name="pythonVersion" id="projen.python.UvPyprojectOptions.property.pythonVersion"></a>

```typescript
public readonly pythonVersion: string;
```

- *Type:* string

Python version to use.

---

### UvSource <a name="UvSource" id="projen.python.UvSource"></a>

#### Initializer <a name="Initializer" id="projen.python.UvSource.Initializer"></a>

```typescript
import { python } from 'projen'

const uvSource: python.UvSource = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.UvSource.property.branch">branch</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.UvSource.property.commit">commit</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.UvSource.property.editable">editable</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#projen.python.UvSource.property.extra">extra</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.UvSource.property.git">git</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.UvSource.property.index">index</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.UvSource.property.marker">marker</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.UvSource.property.package">package</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#projen.python.UvSource.property.path">path</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.UvSource.property.rev">rev</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.UvSource.property.subdirectory">subdirectory</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.UvSource.property.tag">tag</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.UvSource.property.url">url</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.UvSource.property.workspace">workspace</a></code> | <code>boolean</code> | *No description.* |

---

##### `branch`<sup>Optional</sup> <a name="branch" id="projen.python.UvSource.property.branch"></a>

```typescript
public readonly branch: string;
```

- *Type:* string

---

##### `commit`<sup>Optional</sup> <a name="commit" id="projen.python.UvSource.property.commit"></a>

```typescript
public readonly commit: string;
```

- *Type:* string

---

##### `editable`<sup>Optional</sup> <a name="editable" id="projen.python.UvSource.property.editable"></a>

```typescript
public readonly editable: boolean;
```

- *Type:* boolean

---

##### `extra`<sup>Optional</sup> <a name="extra" id="projen.python.UvSource.property.extra"></a>

```typescript
public readonly extra: string;
```

- *Type:* string

---

##### `git`<sup>Optional</sup> <a name="git" id="projen.python.UvSource.property.git"></a>

```typescript
public readonly git: string;
```

- *Type:* string

---

##### `index`<sup>Optional</sup> <a name="index" id="projen.python.UvSource.property.index"></a>

```typescript
public readonly index: string;
```

- *Type:* string

---

##### `marker`<sup>Optional</sup> <a name="marker" id="projen.python.UvSource.property.marker"></a>

```typescript
public readonly marker: string;
```

- *Type:* string

---

##### `package`<sup>Optional</sup> <a name="package" id="projen.python.UvSource.property.package"></a>

```typescript
public readonly package: boolean;
```

- *Type:* boolean

---

##### `path`<sup>Optional</sup> <a name="path" id="projen.python.UvSource.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* string

---

##### `rev`<sup>Optional</sup> <a name="rev" id="projen.python.UvSource.property.rev"></a>

```typescript
public readonly rev: string;
```

- *Type:* string

---

##### `subdirectory`<sup>Optional</sup> <a name="subdirectory" id="projen.python.UvSource.property.subdirectory"></a>

```typescript
public readonly subdirectory: string;
```

- *Type:* string

---

##### `tag`<sup>Optional</sup> <a name="tag" id="projen.python.UvSource.property.tag"></a>

```typescript
public readonly tag: string;
```

- *Type:* string

---

##### `url`<sup>Optional</sup> <a name="url" id="projen.python.UvSource.property.url"></a>

```typescript
public readonly url: string;
```

- *Type:* string

---

##### `workspace`<sup>Optional</sup> <a name="workspace" id="projen.python.UvSource.property.workspace"></a>

```typescript
public readonly workspace: boolean;
```

- *Type:* boolean

---

### UvWorkspace <a name="UvWorkspace" id="projen.python.UvWorkspace"></a>

#### Initializer <a name="Initializer" id="projen.python.UvWorkspace.Initializer"></a>

```typescript
import { python } from 'projen'

const uvWorkspace: python.UvWorkspace = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.UvWorkspace.property.exclude">exclude</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen.python.UvWorkspace.property.members">members</a></code> | <code>string[]</code> | *No description.* |

---

##### `exclude`<sup>Optional</sup> <a name="exclude" id="projen.python.UvWorkspace.property.exclude"></a>

```typescript
public readonly exclude: string[];
```

- *Type:* string[]

---

##### `members`<sup>Optional</sup> <a name="members" id="projen.python.UvWorkspace.property.members"></a>

```typescript
public readonly members: string[];
```

- *Type:* string[]

---

### VenvOptions <a name="VenvOptions" id="projen.python.VenvOptions"></a>

Options for venv.

#### Initializer <a name="Initializer" id="projen.python.VenvOptions.Initializer"></a>

```typescript
import { python } from 'projen'

const venvOptions: python.VenvOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.VenvOptions.property.envdir">envdir</a></code> | <code>string</code> | Name of directory to store the environment in. |
| <code><a href="#projen.python.VenvOptions.property.pythonExec">pythonExec</a></code> | <code>string</code> | Path to the python executable to use. |

---

##### `envdir`<sup>Optional</sup> <a name="envdir" id="projen.python.VenvOptions.property.envdir"></a>

```typescript
public readonly envdir: string;
```

- *Type:* string
- *Default:* ".env"

Name of directory to store the environment in.

---

##### `pythonExec`<sup>Optional</sup> <a name="pythonExec" id="projen.python.VenvOptions.property.pythonExec"></a>

```typescript
public readonly pythonExec: string;
```

- *Type:* string
- *Default:* "python"

Path to the python executable to use.

---


## Protocols <a name="Protocols" id="Protocols"></a>

### IPackageProvider <a name="IPackageProvider" id="projen.python.IPackageProvider"></a>

- *Implemented By:* <a href="#projen.python.IPackageProvider">IPackageProvider</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.IPackageProvider.property.packages">packages</a></code> | <code>projen.Dependency[]</code> | An array of packages (may be dynamically generated). |

---

##### `packages`<sup>Required</sup> <a name="packages" id="projen.python.IPackageProvider.property.packages"></a>

```typescript
public readonly packages: Dependency[];
```

- *Type:* projen.Dependency[]

An array of packages (may be dynamically generated).

---

### IPythonDeps <a name="IPythonDeps" id="projen.python.IPythonDeps"></a>

- *Implemented By:* <a href="#projen.python.Pip">Pip</a>, <a href="#projen.python.Poetry">Poetry</a>, <a href="#projen.python.IPythonDeps">IPythonDeps</a>

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.python.IPythonDeps.addDependency">addDependency</a></code> | Adds a runtime dependency. |
| <code><a href="#projen.python.IPythonDeps.addDevDependency">addDevDependency</a></code> | Adds a dev dependency. |
| <code><a href="#projen.python.IPythonDeps.installDependencies">installDependencies</a></code> | Installs dependencies (called during post-synthesis). |

---

##### `addDependency` <a name="addDependency" id="projen.python.IPythonDeps.addDependency"></a>

```typescript
public addDependency(spec: string): void
```

Adds a runtime dependency.

###### `spec`<sup>Required</sup> <a name="spec" id="projen.python.IPythonDeps.addDependency.parameter.spec"></a>

- *Type:* string

Format `<module>@<semver>`.

---

##### `addDevDependency` <a name="addDevDependency" id="projen.python.IPythonDeps.addDevDependency"></a>

```typescript
public addDevDependency(spec: string): void
```

Adds a dev dependency.

###### `spec`<sup>Required</sup> <a name="spec" id="projen.python.IPythonDeps.addDevDependency.parameter.spec"></a>

- *Type:* string

Format `<module>@<semver>`.

---

##### `installDependencies` <a name="installDependencies" id="projen.python.IPythonDeps.installDependencies"></a>

```typescript
public installDependencies(): void
```

Installs dependencies (called during post-synthesis).

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.IPythonDeps.property.installCiTask">installCiTask</a></code> | <code>projen.Task</code> | A task that installs and updates dependencies. |

---

##### `installCiTask`<sup>Required</sup> <a name="installCiTask" id="projen.python.IPythonDeps.property.installCiTask"></a>

```typescript
public readonly installCiTask: Task;
```

- *Type:* projen.Task

A task that installs and updates dependencies.

---

### IPythonEnv <a name="IPythonEnv" id="projen.python.IPythonEnv"></a>

- *Implemented By:* <a href="#projen.python.Poetry">Poetry</a>, <a href="#projen.python.Venv">Venv</a>, <a href="#projen.python.IPythonEnv">IPythonEnv</a>

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.python.IPythonEnv.setupEnvironment">setupEnvironment</a></code> | Initializes the virtual environment if it doesn't exist (called during post-synthesis). |

---

##### `setupEnvironment` <a name="setupEnvironment" id="projen.python.IPythonEnv.setupEnvironment"></a>

```typescript
public setupEnvironment(): void
```

Initializes the virtual environment if it doesn't exist (called during post-synthesis).


### IPythonPackaging <a name="IPythonPackaging" id="projen.python.IPythonPackaging"></a>

- *Implemented By:* <a href="#projen.python.Poetry">Poetry</a>, <a href="#projen.python.Setuptools">Setuptools</a>, <a href="#projen.python.IPythonPackaging">IPythonPackaging</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.IPythonPackaging.property.publishTask">publishTask</a></code> | <code>projen.Task</code> | A task that uploads the package to a package repository. |

---

##### `publishTask`<sup>Required</sup> <a name="publishTask" id="projen.python.IPythonPackaging.property.publishTask"></a>

```typescript
public readonly publishTask: Task;
```

- *Type:* projen.Task

A task that uploads the package to a package repository.

---

