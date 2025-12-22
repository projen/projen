# `javascript.eslint` Submodule <a name="`javascript.eslint` Submodule" id="projen.javascript.eslint"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### ESLint <a name="ESLint" id="projen.javascript.eslint.ESLint"></a>

#### Initializers <a name="Initializers" id="projen.javascript.eslint.ESLint.Initializer"></a>

```typescript
import { javascript } from 'projen'

new javascript.eslint.ESLint(scope: IConstruct, options?: ESLintOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.eslint.ESLint.Initializer.parameter.scope">scope</a></code> | <code>constructs.IConstruct</code> | *No description.* |
| <code><a href="#projen.javascript.eslint.ESLint.Initializer.parameter.options">options</a></code> | <code>projen.javascript.eslint.ESLintOptions</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="projen.javascript.eslint.ESLint.Initializer.parameter.scope"></a>

- *Type:* constructs.IConstruct

---

##### `options`<sup>Optional</sup> <a name="options" id="projen.javascript.eslint.ESLint.Initializer.parameter.options"></a>

- *Type:* projen.javascript.eslint.ESLintOptions

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.javascript.eslint.ESLint.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen.javascript.eslint.ESLint.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen.javascript.eslint.ESLint.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen.javascript.eslint.ESLint.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |
| <code><a href="#projen.javascript.eslint.ESLint.addConfigs">addConfigs</a></code> | Add configs to eslint. |

---

##### `toString` <a name="toString" id="projen.javascript.eslint.ESLint.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `postSynthesize` <a name="postSynthesize" id="projen.javascript.eslint.ESLint.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen.javascript.eslint.ESLint.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `synthesize` <a name="synthesize" id="projen.javascript.eslint.ESLint.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

##### `addConfigs` <a name="addConfigs" id="projen.javascript.eslint.ESLint.addConfigs"></a>

```typescript
public addConfigs(configs: ...IESLintConfig[]): void
```

Add configs to eslint.

###### `configs`<sup>Required</sup> <a name="configs" id="projen.javascript.eslint.ESLint.addConfigs.parameter.configs"></a>

- *Type:* ...projen.javascript.eslint.IESLintConfig[]

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.javascript.eslint.ESLint.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen.javascript.eslint.ESLint.isComponent">isComponent</a></code> | Test whether the given construct is a component. |
| <code><a href="#projen.javascript.eslint.ESLint.of">of</a></code> | Returns the singleton ESLint component of a project or undefined if there is none. |

---

##### `isConstruct` <a name="isConstruct" id="projen.javascript.eslint.ESLint.isConstruct"></a>

```typescript
import { javascript } from 'projen'

javascript.eslint.ESLint.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="projen.javascript.eslint.ESLint.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen.javascript.eslint.ESLint.isComponent"></a>

```typescript
import { javascript } from 'projen'

javascript.eslint.ESLint.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen.javascript.eslint.ESLint.isComponent.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="projen.javascript.eslint.ESLint.of"></a>

```typescript
import { javascript } from 'projen'

javascript.eslint.ESLint.of(project: Project)
```

Returns the singleton ESLint component of a project or undefined if there is none.

###### `project`<sup>Required</sup> <a name="project" id="projen.javascript.eslint.ESLint.of.parameter.project"></a>

- *Type:* projen.Project

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.eslint.ESLint.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen.javascript.eslint.ESLint.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.javascript.eslint.ESLint.property.configs">configs</a></code> | <code>projen.javascript.eslint.IESLintConfig[]</code> | The ESLint configurations as an ordered list. |
| <code><a href="#projen.javascript.eslint.ESLint.property.file">file</a></code> | <code>projen.javascript.eslint.ESLintConfigFile</code> | The ESLint flat config file used. |
| <code><a href="#projen.javascript.eslint.ESLint.property.task">task</a></code> | <code>projen.Task</code> | The task running eslint. |

---

##### `node`<sup>Required</sup> <a name="node" id="projen.javascript.eslint.ESLint.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen.javascript.eslint.ESLint.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---

##### `configs`<sup>Required</sup> <a name="configs" id="projen.javascript.eslint.ESLint.property.configs"></a>

```typescript
public readonly configs: IESLintConfig[];
```

- *Type:* projen.javascript.eslint.IESLintConfig[]

The ESLint configurations as an ordered list.

---

##### `file`<sup>Required</sup> <a name="file" id="projen.javascript.eslint.ESLint.property.file"></a>

```typescript
public readonly file: ESLintConfigFile;
```

- *Type:* projen.javascript.eslint.ESLintConfigFile

The ESLint flat config file used.

---

##### `task`<sup>Required</sup> <a name="task" id="projen.javascript.eslint.ESLint.property.task"></a>

```typescript
public readonly task: Task;
```

- *Type:* projen.Task

The task running eslint.

---


### ESLintConfigFile <a name="ESLintConfigFile" id="projen.javascript.eslint.ESLintConfigFile"></a>

#### Initializers <a name="Initializers" id="projen.javascript.eslint.ESLintConfigFile.Initializer"></a>

```typescript
import { javascript } from 'projen'

new javascript.eslint.ESLintConfigFile(scope: IConstruct, options?: ESLintConfigFileOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.eslint.ESLintConfigFile.Initializer.parameter.scope">scope</a></code> | <code>constructs.IConstruct</code> | *No description.* |
| <code><a href="#projen.javascript.eslint.ESLintConfigFile.Initializer.parameter.options">options</a></code> | <code>projen.javascript.eslint.ESLintConfigFileOptions</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="projen.javascript.eslint.ESLintConfigFile.Initializer.parameter.scope"></a>

- *Type:* constructs.IConstruct

---

##### `options`<sup>Optional</sup> <a name="options" id="projen.javascript.eslint.ESLintConfigFile.Initializer.parameter.options"></a>

- *Type:* projen.javascript.eslint.ESLintConfigFileOptions

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.javascript.eslint.ESLintConfigFile.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen.javascript.eslint.ESLintConfigFile.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen.javascript.eslint.ESLintConfigFile.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen.javascript.eslint.ESLintConfigFile.synthesize">synthesize</a></code> | Writes the file to the project's output directory. |
| <code><a href="#projen.javascript.eslint.ESLintConfigFile.addConfig">addConfig</a></code> | Add a configuration to the file. |

---

##### `toString` <a name="toString" id="projen.javascript.eslint.ESLintConfigFile.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `postSynthesize` <a name="postSynthesize" id="projen.javascript.eslint.ESLintConfigFile.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen.javascript.eslint.ESLintConfigFile.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `synthesize` <a name="synthesize" id="projen.javascript.eslint.ESLintConfigFile.synthesize"></a>

```typescript
public synthesize(): void
```

Writes the file to the project's output directory.

##### `addConfig` <a name="addConfig" id="projen.javascript.eslint.ESLintConfigFile.addConfig"></a>

```typescript
public addConfig(config: IESLintConfig): void
```

Add a configuration to the file.

###### `config`<sup>Required</sup> <a name="config" id="projen.javascript.eslint.ESLintConfigFile.addConfig.parameter.config"></a>

- *Type:* projen.javascript.eslint.IESLintConfig

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.javascript.eslint.ESLintConfigFile.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen.javascript.eslint.ESLintConfigFile.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="projen.javascript.eslint.ESLintConfigFile.isConstruct"></a>

```typescript
import { javascript } from 'projen'

javascript.eslint.ESLintConfigFile.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="projen.javascript.eslint.ESLintConfigFile.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen.javascript.eslint.ESLintConfigFile.isComponent"></a>

```typescript
import { javascript } from 'projen'

javascript.eslint.ESLintConfigFile.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen.javascript.eslint.ESLintConfigFile.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.eslint.ESLintConfigFile.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen.javascript.eslint.ESLintConfigFile.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.javascript.eslint.ESLintConfigFile.property.absolutePath">absolutePath</a></code> | <code>string</code> | The absolute path of this file. |
| <code><a href="#projen.javascript.eslint.ESLintConfigFile.property.path">path</a></code> | <code>string</code> | The file path, relative to the project's outdir. |
| <code><a href="#projen.javascript.eslint.ESLintConfigFile.property.changed">changed</a></code> | <code>boolean</code> | Indicates if the file has been changed during synthesis. |
| <code><a href="#projen.javascript.eslint.ESLintConfigFile.property.marker">marker</a></code> | <code>string</code> | The projen marker, used to identify files as projen-generated. |
| <code><a href="#projen.javascript.eslint.ESLintConfigFile.property.executable">executable</a></code> | <code>boolean</code> | Indicates if the file should be marked as executable. |
| <code><a href="#projen.javascript.eslint.ESLintConfigFile.property.readonly">readonly</a></code> | <code>boolean</code> | Indicates if the file should be read-only or read-write. |

---

##### `node`<sup>Required</sup> <a name="node" id="projen.javascript.eslint.ESLintConfigFile.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen.javascript.eslint.ESLintConfigFile.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---

##### `absolutePath`<sup>Required</sup> <a name="absolutePath" id="projen.javascript.eslint.ESLintConfigFile.property.absolutePath"></a>

```typescript
public readonly absolutePath: string;
```

- *Type:* string

The absolute path of this file.

---

##### `path`<sup>Required</sup> <a name="path" id="projen.javascript.eslint.ESLintConfigFile.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* string

The file path, relative to the project's outdir.

---

##### `changed`<sup>Optional</sup> <a name="changed" id="projen.javascript.eslint.ESLintConfigFile.property.changed"></a>

```typescript
public readonly changed: boolean;
```

- *Type:* boolean

Indicates if the file has been changed during synthesis.

This property is
only available in `postSynthesize()` hooks. If this is `undefined`, the
file has not been synthesized yet.

---

##### `marker`<sup>Optional</sup> <a name="marker" id="projen.javascript.eslint.ESLintConfigFile.property.marker"></a>

```typescript
public readonly marker: string;
```

- *Type:* string

The projen marker, used to identify files as projen-generated.

Value is undefined if the project is being ejected.

---

##### `executable`<sup>Required</sup> <a name="executable" id="projen.javascript.eslint.ESLintConfigFile.property.executable"></a>

```typescript
public readonly executable: boolean;
```

- *Type:* boolean

Indicates if the file should be marked as executable.

---

##### `readonly`<sup>Required</sup> <a name="readonly" id="projen.javascript.eslint.ESLintConfigFile.property.readonly"></a>

```typescript
public readonly readonly: boolean;
```

- *Type:* boolean

Indicates if the file should be read-only or read-write.

---


## Structs <a name="Structs" id="Structs"></a>

### ConfigObject <a name="ConfigObject" id="projen.javascript.eslint.ConfigObject"></a>

The configuration for a set of files.

> [https://eslint.org/docs/latest/use/configure/configuration-files#configuration-objects](https://eslint.org/docs/latest/use/configure/configuration-files#configuration-objects)

#### Initializer <a name="Initializer" id="projen.javascript.eslint.ConfigObject.Initializer"></a>

```typescript
import { javascript } from 'projen'

const configObject: javascript.eslint.ConfigObject = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.eslint.ConfigObject.property.basePath">basePath</a></code> | <code>string</code> | Path to the directory where the configuration object should apply. |
| <code><a href="#projen.javascript.eslint.ConfigObject.property.files">files</a></code> | <code>string[]</code> | An array of glob patterns indicating the files that the configuration object should apply to. |
| <code><a href="#projen.javascript.eslint.ConfigObject.property.ignores">ignores</a></code> | <code>string[]</code> | An array of glob patterns indicating the files that the configuration object should not apply to. |
| <code><a href="#projen.javascript.eslint.ConfigObject.property.language">language</a></code> | <code>string</code> | The name of the language used for linting. |
| <code><a href="#projen.javascript.eslint.ConfigObject.property.languageOptions">languageOptions</a></code> | <code>{[ key: string ]: any}</code> | An object containing settings related to how the language is configured for linting. |
| <code><a href="#projen.javascript.eslint.ConfigObject.property.linterOptions">linterOptions</a></code> | <code>projen.javascript.eslint.LinterOptionsConfig</code> | An object containing settings related to the linting process. |
| <code><a href="#projen.javascript.eslint.ConfigObject.property.name">name</a></code> | <code>string</code> | A string to identify the configuration object. |
| <code><a href="#projen.javascript.eslint.ConfigObject.property.plugins">plugins</a></code> | <code>{[ key: string ]: projen.javascript.eslint.Plugin}</code> | An object containing a name-value mapping of plugin names to plugin objects. |
| <code><a href="#projen.javascript.eslint.ConfigObject.property.rules">rules</a></code> | <code>{[ key: string ]: any}</code> | An object containing the configured rules. |
| <code><a href="#projen.javascript.eslint.ConfigObject.property.settings">settings</a></code> | <code>{[ key: string ]: any}</code> | An object containing name-value pairs of information that should be available to all rules. |

---

##### `basePath`<sup>Optional</sup> <a name="basePath" id="projen.javascript.eslint.ConfigObject.property.basePath"></a>

```typescript
public readonly basePath: string;
```

- *Type:* string

Path to the directory where the configuration object should apply.

`files` and `ignores` patterns in the configuration object are
interpreted as relative to this path.

---

##### `files`<sup>Optional</sup> <a name="files" id="projen.javascript.eslint.ConfigObject.property.files"></a>

```typescript
public readonly files: string[];
```

- *Type:* string[]

An array of glob patterns indicating the files that the configuration object should apply to.

If not specified, the configuration object applies
to all files

---

##### `ignores`<sup>Optional</sup> <a name="ignores" id="projen.javascript.eslint.ConfigObject.property.ignores"></a>

```typescript
public readonly ignores: string[];
```

- *Type:* string[]

An array of glob patterns indicating the files that the configuration object should not apply to.

If not specified, the configuration object
applies to all files matched by files

---

##### `language`<sup>Optional</sup> <a name="language" id="projen.javascript.eslint.ConfigObject.property.language"></a>

```typescript
public readonly language: string;
```

- *Type:* string

The name of the language used for linting.

This is used to determine the
parser and other language-specific settings.

---

##### `languageOptions`<sup>Optional</sup> <a name="languageOptions" id="projen.javascript.eslint.ConfigObject.property.languageOptions"></a>

```typescript
public readonly languageOptions: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

An object containing settings related to how the language is configured for linting.

---

##### `linterOptions`<sup>Optional</sup> <a name="linterOptions" id="projen.javascript.eslint.ConfigObject.property.linterOptions"></a>

```typescript
public readonly linterOptions: LinterOptionsConfig;
```

- *Type:* projen.javascript.eslint.LinterOptionsConfig

An object containing settings related to the linting process.

---

##### `name`<sup>Optional</sup> <a name="name" id="projen.javascript.eslint.ConfigObject.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

A string to identify the configuration object.

Used in error messages and
inspection tools.

---

##### `plugins`<sup>Optional</sup> <a name="plugins" id="projen.javascript.eslint.ConfigObject.property.plugins"></a>

```typescript
public readonly plugins: {[ key: string ]: Plugin};
```

- *Type:* {[ key: string ]: projen.javascript.eslint.Plugin}

An object containing a name-value mapping of plugin names to plugin objects.

When files is specified, these plugins are only available to the matching files.

---

##### `rules`<sup>Optional</sup> <a name="rules" id="projen.javascript.eslint.ConfigObject.property.rules"></a>

```typescript
public readonly rules: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

An object containing the configured rules.

When files or ignores are specified,
these rule configurations are only available to the matching files.

---

##### `settings`<sup>Optional</sup> <a name="settings" id="projen.javascript.eslint.ConfigObject.property.settings"></a>

```typescript
public readonly settings: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

An object containing name-value pairs of information that should be available to all rules.

---

### ConfigWithExtends <a name="ConfigWithExtends" id="projen.javascript.eslint.ConfigWithExtends"></a>

Config with extends.

Valid only inside of `defineConfig()`.

#### Initializer <a name="Initializer" id="projen.javascript.eslint.ConfigWithExtends.Initializer"></a>

```typescript
import { javascript } from 'projen'

const configWithExtends: javascript.eslint.ConfigWithExtends = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.eslint.ConfigWithExtends.property.basePath">basePath</a></code> | <code>string</code> | Path to the directory where the configuration object should apply. |
| <code><a href="#projen.javascript.eslint.ConfigWithExtends.property.files">files</a></code> | <code>string[]</code> | An array of glob patterns indicating the files that the configuration object should apply to. |
| <code><a href="#projen.javascript.eslint.ConfigWithExtends.property.ignores">ignores</a></code> | <code>string[]</code> | An array of glob patterns indicating the files that the configuration object should not apply to. |
| <code><a href="#projen.javascript.eslint.ConfigWithExtends.property.language">language</a></code> | <code>string</code> | The name of the language used for linting. |
| <code><a href="#projen.javascript.eslint.ConfigWithExtends.property.languageOptions">languageOptions</a></code> | <code>{[ key: string ]: any}</code> | An object containing settings related to how the language is configured for linting. |
| <code><a href="#projen.javascript.eslint.ConfigWithExtends.property.linterOptions">linterOptions</a></code> | <code>projen.javascript.eslint.LinterOptionsConfig</code> | An object containing settings related to the linting process. |
| <code><a href="#projen.javascript.eslint.ConfigWithExtends.property.name">name</a></code> | <code>string</code> | A string to identify the configuration object. |
| <code><a href="#projen.javascript.eslint.ConfigWithExtends.property.plugins">plugins</a></code> | <code>{[ key: string ]: projen.javascript.eslint.Plugin}</code> | An object containing a name-value mapping of plugin names to plugin objects. |
| <code><a href="#projen.javascript.eslint.ConfigWithExtends.property.rules">rules</a></code> | <code>{[ key: string ]: any}</code> | An object containing the configured rules. |
| <code><a href="#projen.javascript.eslint.ConfigWithExtends.property.settings">settings</a></code> | <code>{[ key: string ]: any}</code> | An object containing name-value pairs of information that should be available to all rules. |
| <code><a href="#projen.javascript.eslint.ConfigWithExtends.property.extends">extends</a></code> | <code>projen.javascript.eslint.Extends[]</code> | *No description.* |

---

##### `basePath`<sup>Optional</sup> <a name="basePath" id="projen.javascript.eslint.ConfigWithExtends.property.basePath"></a>

```typescript
public readonly basePath: string;
```

- *Type:* string

Path to the directory where the configuration object should apply.

`files` and `ignores` patterns in the configuration object are
interpreted as relative to this path.

---

##### `files`<sup>Optional</sup> <a name="files" id="projen.javascript.eslint.ConfigWithExtends.property.files"></a>

```typescript
public readonly files: string[];
```

- *Type:* string[]

An array of glob patterns indicating the files that the configuration object should apply to.

If not specified, the configuration object applies
to all files

---

##### `ignores`<sup>Optional</sup> <a name="ignores" id="projen.javascript.eslint.ConfigWithExtends.property.ignores"></a>

```typescript
public readonly ignores: string[];
```

- *Type:* string[]

An array of glob patterns indicating the files that the configuration object should not apply to.

If not specified, the configuration object
applies to all files matched by files

---

##### `language`<sup>Optional</sup> <a name="language" id="projen.javascript.eslint.ConfigWithExtends.property.language"></a>

```typescript
public readonly language: string;
```

- *Type:* string

The name of the language used for linting.

This is used to determine the
parser and other language-specific settings.

---

##### `languageOptions`<sup>Optional</sup> <a name="languageOptions" id="projen.javascript.eslint.ConfigWithExtends.property.languageOptions"></a>

```typescript
public readonly languageOptions: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

An object containing settings related to how the language is configured for linting.

---

##### `linterOptions`<sup>Optional</sup> <a name="linterOptions" id="projen.javascript.eslint.ConfigWithExtends.property.linterOptions"></a>

```typescript
public readonly linterOptions: LinterOptionsConfig;
```

- *Type:* projen.javascript.eslint.LinterOptionsConfig

An object containing settings related to the linting process.

---

##### `name`<sup>Optional</sup> <a name="name" id="projen.javascript.eslint.ConfigWithExtends.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

A string to identify the configuration object.

Used in error messages and
inspection tools.

---

##### `plugins`<sup>Optional</sup> <a name="plugins" id="projen.javascript.eslint.ConfigWithExtends.property.plugins"></a>

```typescript
public readonly plugins: {[ key: string ]: Plugin};
```

- *Type:* {[ key: string ]: projen.javascript.eslint.Plugin}

An object containing a name-value mapping of plugin names to plugin objects.

When files is specified, these plugins are only available to the matching files.

---

##### `rules`<sup>Optional</sup> <a name="rules" id="projen.javascript.eslint.ConfigWithExtends.property.rules"></a>

```typescript
public readonly rules: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

An object containing the configured rules.

When files or ignores are specified,
these rule configurations are only available to the matching files.

---

##### `settings`<sup>Optional</sup> <a name="settings" id="projen.javascript.eslint.ConfigWithExtends.property.settings"></a>

```typescript
public readonly settings: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

An object containing name-value pairs of information that should be available to all rules.

---

##### `extends`<sup>Optional</sup> <a name="extends" id="projen.javascript.eslint.ConfigWithExtends.property.extends"></a>

```typescript
public readonly extends: Extends[];
```

- *Type:* projen.javascript.eslint.Extends[]

---

### ESLintCommandOptions <a name="ESLintCommandOptions" id="projen.javascript.eslint.ESLintCommandOptions"></a>

#### Initializer <a name="Initializer" id="projen.javascript.eslint.ESLintCommandOptions.Initializer"></a>

```typescript
import { javascript } from 'projen'

const eSLintCommandOptions: javascript.eslint.ESLintCommandOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.eslint.ESLintCommandOptions.property.cache">cache</a></code> | <code>boolean</code> | Whether to enable caching. |
| <code><a href="#projen.javascript.eslint.ESLintCommandOptions.property.extraArgs">extraArgs</a></code> | <code>string[]</code> | Extra arguments to pass to eslint command. |
| <code><a href="#projen.javascript.eslint.ESLintCommandOptions.property.fix">fix</a></code> | <code>boolean</code> | Whether to fix eslint issues when running the eslint task. |

---

##### `cache`<sup>Optional</sup> <a name="cache" id="projen.javascript.eslint.ESLintCommandOptions.property.cache"></a>

```typescript
public readonly cache: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to enable caching.

---

##### `extraArgs`<sup>Optional</sup> <a name="extraArgs" id="projen.javascript.eslint.ESLintCommandOptions.property.extraArgs"></a>

```typescript
public readonly extraArgs: string[];
```

- *Type:* string[]

Extra arguments to pass to eslint command.

> [https://eslint.org/docs/latest/use/command-line-interface](https://eslint.org/docs/latest/use/command-line-interface)

---

##### `fix`<sup>Optional</sup> <a name="fix" id="projen.javascript.eslint.ESLintCommandOptions.property.fix"></a>

```typescript
public readonly fix: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to fix eslint issues when running the eslint task.

---

### ESLintConfigFileOptions <a name="ESLintConfigFileOptions" id="projen.javascript.eslint.ESLintConfigFileOptions"></a>

#### Initializer <a name="Initializer" id="projen.javascript.eslint.ESLintConfigFileOptions.Initializer"></a>

```typescript
import { javascript } from 'projen'

const eSLintConfigFileOptions: javascript.eslint.ESLintConfigFileOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.eslint.ESLintConfigFileOptions.property.configs">configs</a></code> | <code>projen.javascript.eslint.IESLintConfig[]</code> | The ESLint configurations as an ordered list. |
| <code><a href="#projen.javascript.eslint.ESLintConfigFileOptions.property.fileName">fileName</a></code> | <code>string</code> | The filename of configuration file. |
| <code><a href="#projen.javascript.eslint.ESLintConfigFileOptions.property.moduleType">moduleType</a></code> | <code>projen.javascript.ModuleType</code> | The module type of configuration file. |

---

##### `configs`<sup>Optional</sup> <a name="configs" id="projen.javascript.eslint.ESLintConfigFileOptions.property.configs"></a>

```typescript
public readonly configs: IESLintConfig[];
```

- *Type:* projen.javascript.eslint.IESLintConfig[]

The ESLint configurations as an ordered list.

---

##### `fileName`<sup>Optional</sup> <a name="fileName" id="projen.javascript.eslint.ESLintConfigFileOptions.property.fileName"></a>

```typescript
public readonly fileName: string;
```

- *Type:* string
- *Default:* "eslint.config.mjs" for ESM, "eslint.config.cjs" for CommonJS

The filename of configuration file.

---

##### `moduleType`<sup>Optional</sup> <a name="moduleType" id="projen.javascript.eslint.ESLintConfigFileOptions.property.moduleType"></a>

```typescript
public readonly moduleType: ModuleType;
```

- *Type:* projen.javascript.ModuleType
- *Default:* ModuleType.ESM

The module type of configuration file.

Set ModuleType.COMMON_JS to generates a `eslint.config.cjs` file.
- Set ModuleType.ESM to generates a `eslint.config.mjs` file.

---

### ESLintFileOptions <a name="ESLintFileOptions" id="projen.javascript.eslint.ESLintFileOptions"></a>

#### Initializer <a name="Initializer" id="projen.javascript.eslint.ESLintFileOptions.Initializer"></a>

```typescript
import { javascript } from 'projen'

const eSLintFileOptions: javascript.eslint.ESLintFileOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.eslint.ESLintFileOptions.property.fileName">fileName</a></code> | <code>string</code> | The filename of configuration file. |
| <code><a href="#projen.javascript.eslint.ESLintFileOptions.property.moduleType">moduleType</a></code> | <code>projen.javascript.ModuleType</code> | The module type of configuration file. |

---

##### `fileName`<sup>Optional</sup> <a name="fileName" id="projen.javascript.eslint.ESLintFileOptions.property.fileName"></a>

```typescript
public readonly fileName: string;
```

- *Type:* string
- *Default:* "eslint.config.mjs" for ESM, "eslint.config.cjs" for CommonJS

The filename of configuration file.

---

##### `moduleType`<sup>Optional</sup> <a name="moduleType" id="projen.javascript.eslint.ESLintFileOptions.property.moduleType"></a>

```typescript
public readonly moduleType: ModuleType;
```

- *Type:* projen.javascript.ModuleType
- *Default:* ModuleType.ESM

The module type of configuration file.

When specified `module`, generate `eslint.config.mjs` file.
- When specified `commonjs`, generate `eslint.config.cjs` file.

---

### ESLintOptions <a name="ESLintOptions" id="projen.javascript.eslint.ESLintOptions"></a>

#### Initializer <a name="Initializer" id="projen.javascript.eslint.ESLintOptions.Initializer"></a>

```typescript
import { javascript } from 'projen'

const eSLintOptions: javascript.eslint.ESLintOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.eslint.ESLintOptions.property.commandOptions">commandOptions</a></code> | <code>projen.javascript.eslint.ESLintCommandOptions</code> | Options for the ESLint command. |
| <code><a href="#projen.javascript.eslint.ESLintOptions.property.configs">configs</a></code> | <code>projen.javascript.eslint.IESLintConfig[]</code> | Additional configuration objects. |
| <code><a href="#projen.javascript.eslint.ESLintOptions.property.fileOptions">fileOptions</a></code> | <code>projen.javascript.eslint.ESLintFileOptions</code> | Options to for the config file. |
| <code><a href="#projen.javascript.eslint.ESLintOptions.property.files">files</a></code> | <code>string[]</code> | List of files or glob patterns matching files to globally include. |
| <code><a href="#projen.javascript.eslint.ESLintOptions.property.formatter">formatter</a></code> | <code>boolean</code> | Enable code formatter with recommended settings. |
| <code><a href="#projen.javascript.eslint.ESLintOptions.property.ignoreGeneratedFiles">ignoreGeneratedFiles</a></code> | <code>boolean</code> | Automatically ignore all generated files. |
| <code><a href="#projen.javascript.eslint.ESLintOptions.property.ignores">ignores</a></code> | <code>string[]</code> | List of files or glob patterns matching files to globally ignore. |
| <code><a href="#projen.javascript.eslint.ESLintOptions.property.linter">linter</a></code> | <code>boolean</code> | Enable linting with recommended rules. |

---

##### `commandOptions`<sup>Optional</sup> <a name="commandOptions" id="projen.javascript.eslint.ESLintOptions.property.commandOptions"></a>

```typescript
public readonly commandOptions: ESLintCommandOptions;
```

- *Type:* projen.javascript.eslint.ESLintCommandOptions

Options for the ESLint command.

---

##### `configs`<sup>Optional</sup> <a name="configs" id="projen.javascript.eslint.ESLintOptions.property.configs"></a>

```typescript
public readonly configs: IESLintConfig[];
```

- *Type:* projen.javascript.eslint.IESLintConfig[]
- *Default:* no additional configs

Additional configuration objects.

---

##### `fileOptions`<sup>Optional</sup> <a name="fileOptions" id="projen.javascript.eslint.ESLintOptions.property.fileOptions"></a>

```typescript
public readonly fileOptions: ESLintFileOptions;
```

- *Type:* projen.javascript.eslint.ESLintFileOptions

Options to for the config file.

---

##### `files`<sup>Optional</sup> <a name="files" id="projen.javascript.eslint.ESLintOptions.property.files"></a>

```typescript
public readonly files: string[];
```

- *Type:* string[]
- *Default:* recommended files are included

List of files or glob patterns matching files to globally include.

---

*Example*

```typescript
["src/*.ts"]
```


##### `formatter`<sup>Optional</sup> <a name="formatter" id="projen.javascript.eslint.ESLintOptions.property.formatter"></a>

```typescript
public readonly formatter: boolean;
```

- *Type:* boolean
- *Default:* true

Enable code formatter with recommended settings.

---

##### `ignoreGeneratedFiles`<sup>Optional</sup> <a name="ignoreGeneratedFiles" id="projen.javascript.eslint.ESLintOptions.property.ignoreGeneratedFiles"></a>

```typescript
public readonly ignoreGeneratedFiles: boolean;
```

- *Type:* boolean
- *Default:* true

Automatically ignore all generated files.

This prevents ESLint from trying to format or lint files that are marked as generated,
which would fail since generated files are typically read-only.

---

##### `ignores`<sup>Optional</sup> <a name="ignores" id="projen.javascript.eslint.ESLintOptions.property.ignores"></a>

```typescript
public readonly ignores: string[];
```

- *Type:* string[]
- *Default:* default exclusions based on the project type

List of files or glob patterns matching files to globally ignore.

---

##### `linter`<sup>Optional</sup> <a name="linter" id="projen.javascript.eslint.ESLintOptions.property.linter"></a>

```typescript
public readonly linter: boolean;
```

- *Type:* boolean
- *Default:* true

Enable linting with recommended rules.

---

### LinterOptionsConfig <a name="LinterOptionsConfig" id="projen.javascript.eslint.LinterOptionsConfig"></a>

Represents the configuration options for the core linter.

#### Initializer <a name="Initializer" id="projen.javascript.eslint.LinterOptionsConfig.Initializer"></a>

```typescript
import { javascript } from 'projen'

const linterOptionsConfig: javascript.eslint.LinterOptionsConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.eslint.LinterOptionsConfig.property.noInlineConfig">noInlineConfig</a></code> | <code>boolean</code> | Indicates whether or not inline configuration is evaluated. |
| <code><a href="#projen.javascript.eslint.LinterOptionsConfig.property.reportUnusedDisableDirectives">reportUnusedDisableDirectives</a></code> | <code>boolean \| projen.javascript.eslint.Severity</code> | Indicates what to do when an unused disable directive is found. |
| <code><a href="#projen.javascript.eslint.LinterOptionsConfig.property.reportUnusedInlineConfigs">reportUnusedInlineConfigs</a></code> | <code>projen.javascript.eslint.Severity</code> | A severity value indicating if and how unused inline configs should be tracked and reported. |

---

##### `noInlineConfig`<sup>Optional</sup> <a name="noInlineConfig" id="projen.javascript.eslint.LinterOptionsConfig.property.noInlineConfig"></a>

```typescript
public readonly noInlineConfig: boolean;
```

- *Type:* boolean

Indicates whether or not inline configuration is evaluated.

---

##### `reportUnusedDisableDirectives`<sup>Optional</sup> <a name="reportUnusedDisableDirectives" id="projen.javascript.eslint.LinterOptionsConfig.property.reportUnusedDisableDirectives"></a>

```typescript
public readonly reportUnusedDisableDirectives: boolean | Severity;
```

- *Type:* boolean | projen.javascript.eslint.Severity

Indicates what to do when an unused disable directive is found.

---

##### `reportUnusedInlineConfigs`<sup>Optional</sup> <a name="reportUnusedInlineConfigs" id="projen.javascript.eslint.LinterOptionsConfig.property.reportUnusedInlineConfigs"></a>

```typescript
public readonly reportUnusedInlineConfigs: Severity;
```

- *Type:* projen.javascript.eslint.Severity

A severity value indicating if and how unused inline configs should be tracked and reported.

---

### SharedConfigDefinition <a name="SharedConfigDefinition" id="projen.javascript.eslint.SharedConfigDefinition"></a>

A shared configuration definition.

#### Initializer <a name="Initializer" id="projen.javascript.eslint.SharedConfigDefinition.Initializer"></a>

```typescript
import { javascript } from 'projen'

const sharedConfigDefinition: javascript.eslint.SharedConfigDefinition = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.eslint.SharedConfigDefinition.property.module">module</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.javascript.eslint.SharedConfigDefinition.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.javascript.eslint.SharedConfigDefinition.property.path">path</a></code> | <code>string</code> | *No description.* |

---

##### `module`<sup>Required</sup> <a name="module" id="projen.javascript.eslint.SharedConfigDefinition.property.module"></a>

```typescript
public readonly module: string;
```

- *Type:* string

---

##### `name`<sup>Required</sup> <a name="name" id="projen.javascript.eslint.SharedConfigDefinition.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `path`<sup>Required</sup> <a name="path" id="projen.javascript.eslint.SharedConfigDefinition.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* string

---

## Classes <a name="Classes" id="Classes"></a>

### ESLintConfig <a name="ESLintConfig" id="projen.javascript.eslint.ESLintConfig"></a>

- *Implements:* projen.javascript.eslint.IESLintConfig, projen.IResolvable

#### Initializers <a name="Initializers" id="projen.javascript.eslint.ESLintConfig.Initializer"></a>

```typescript
import { javascript } from 'projen'

new javascript.eslint.ESLintConfig(config: ConfigWithExtends)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.eslint.ESLintConfig.Initializer.parameter.config">config</a></code> | <code>projen.javascript.eslint.ConfigWithExtends</code> | *No description.* |

---

##### `config`<sup>Required</sup> <a name="config" id="projen.javascript.eslint.ESLintConfig.Initializer.parameter.config"></a>

- *Type:* projen.javascript.eslint.ConfigWithExtends

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.javascript.eslint.ESLintConfig.toJSON">toJSON</a></code> | Resolves and returns content. |

---

##### `toJSON` <a name="toJSON" id="projen.javascript.eslint.ESLintConfig.toJSON"></a>

```typescript
public toJSON(): any
```

Resolves and returns content.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.javascript.eslint.ESLintConfig.files">files</a></code> | List of files or glob patterns matching files to globally ignore. |
| <code><a href="#projen.javascript.eslint.ESLintConfig.ignoreGenerated">ignoreGenerated</a></code> | Automatically ignore all generated files. |
| <code><a href="#projen.javascript.eslint.ESLintConfig.ignores">ignores</a></code> | The list of files or glob patterns matching files to ignore. |
| <code><a href="#projen.javascript.eslint.ESLintConfig.useIgnoreFile">useIgnoreFile</a></code> | Use the ignore file in the list of ignored files. |

---

##### `files` <a name="files" id="projen.javascript.eslint.ESLintConfig.files"></a>

```typescript
import { javascript } from 'projen'

javascript.eslint.ESLintConfig.files(patterns: string[])
```

List of files or glob patterns matching files to globally ignore.

###### `patterns`<sup>Required</sup> <a name="patterns" id="projen.javascript.eslint.ESLintConfig.files.parameter.patterns"></a>

- *Type:* string[]

---

##### `ignoreGenerated` <a name="ignoreGenerated" id="projen.javascript.eslint.ESLintConfig.ignoreGenerated"></a>

```typescript
import { javascript } from 'projen'

javascript.eslint.ESLintConfig.ignoreGenerated()
```

Automatically ignore all generated files.

This prevents ESLint from trying to format or lint files that are marked as generated,
which would fail since generated files are typically read-only.

##### `ignores` <a name="ignores" id="projen.javascript.eslint.ESLintConfig.ignores"></a>

```typescript
import { javascript } from 'projen'

javascript.eslint.ESLintConfig.ignores(patterns: string[])
```

The list of files or glob patterns matching files to ignore.

###### `patterns`<sup>Required</sup> <a name="patterns" id="projen.javascript.eslint.ESLintConfig.ignores.parameter.patterns"></a>

- *Type:* string[]

---

##### `useIgnoreFile` <a name="useIgnoreFile" id="projen.javascript.eslint.ESLintConfig.useIgnoreFile"></a>

```typescript
import { javascript } from 'projen'

javascript.eslint.ESLintConfig.useIgnoreFile()
```

Use the ignore file in the list of ignored files.



### Extends <a name="Extends" id="projen.javascript.eslint.Extends"></a>

- *Implements:* projen.IResolvable

Extends an existing config.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.javascript.eslint.Extends.toJSON">toJSON</a></code> | Resolves and returns content. |

---

##### `toJSON` <a name="toJSON" id="projen.javascript.eslint.Extends.toJSON"></a>

```typescript
public toJSON(): any
```

Resolves and returns content.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.javascript.eslint.Extends.fromConfig">fromConfig</a></code> | Extend another config. |
| <code><a href="#projen.javascript.eslint.Extends.fromName">fromName</a></code> | Extend a config from a plugin by name. |

---

##### `fromConfig` <a name="fromConfig" id="projen.javascript.eslint.Extends.fromConfig"></a>

```typescript
import { javascript } from 'projen'

javascript.eslint.Extends.fromConfig(config: ConfigWithExtends)
```

Extend another config.

###### `config`<sup>Required</sup> <a name="config" id="projen.javascript.eslint.Extends.fromConfig.parameter.config"></a>

- *Type:* projen.javascript.eslint.ConfigWithExtends

---

##### `fromName` <a name="fromName" id="projen.javascript.eslint.Extends.fromName"></a>

```typescript
import { javascript } from 'projen'

javascript.eslint.Extends.fromName(configName: string)
```

Extend a config from a plugin by name.

###### `configName`<sup>Required</sup> <a name="configName" id="projen.javascript.eslint.Extends.fromName.parameter.configName"></a>

- *Type:* string

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.eslint.Extends.property.config">config</a></code> | <code>any</code> | *No description.* |

---

##### `config`<sup>Required</sup> <a name="config" id="projen.javascript.eslint.Extends.property.config"></a>

```typescript
public readonly config: any;
```

- *Type:* any

---


### Plugin <a name="Plugin" id="projen.javascript.eslint.Plugin"></a>

A plugin is an object that contains rules.

It can be a local plugin or a shared plugin.

#### Initializers <a name="Initializers" id="projen.javascript.eslint.Plugin.Initializer"></a>

```typescript
import { javascript } from 'projen'

new javascript.eslint.Plugin(pkg: string, name: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.eslint.Plugin.Initializer.parameter.pkg">pkg</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.javascript.eslint.Plugin.Initializer.parameter.name">name</a></code> | <code>string</code> | *No description.* |

---

##### `pkg`<sup>Required</sup> <a name="pkg" id="projen.javascript.eslint.Plugin.Initializer.parameter.pkg"></a>

- *Type:* string

---

##### `name`<sup>Required</sup> <a name="name" id="projen.javascript.eslint.Plugin.Initializer.parameter.name"></a>

- *Type:* string

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.javascript.eslint.Plugin.render">render</a></code> | Renders the code as a string. |
| <code><a href="#projen.javascript.eslint.Plugin.resolveImports">resolveImports</a></code> | *No description.* |

---

##### `render` <a name="render" id="projen.javascript.eslint.Plugin.render"></a>

```typescript
public render(): string
```

Renders the code as a string.

##### `resolveImports` <a name="resolveImports" id="projen.javascript.eslint.Plugin.resolveImports"></a>

```typescript
public resolveImports(imports: any): void
```

###### `imports`<sup>Required</sup> <a name="imports" id="projen.javascript.eslint.Plugin.resolveImports.parameter.imports"></a>

- *Type:* any

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.javascript.eslint.Plugin.isCodeResolvable">isCodeResolvable</a></code> | Checks if an object is a CodeResolvable instance. |
| <code><a href="#projen.javascript.eslint.Plugin.fromName">fromName</a></code> | Use plugin by its eslint plugin name. |
| <code><a href="#projen.javascript.eslint.Plugin.fromPackage">fromPackage</a></code> | Use plugin by its package name. |

---

##### `isCodeResolvable` <a name="isCodeResolvable" id="projen.javascript.eslint.Plugin.isCodeResolvable"></a>

```typescript
import { javascript } from 'projen'

javascript.eslint.Plugin.isCodeResolvable(obj: any)
```

Checks if an object is a CodeResolvable instance.

###### `obj`<sup>Required</sup> <a name="obj" id="projen.javascript.eslint.Plugin.isCodeResolvable.parameter.obj"></a>

- *Type:* any

The object to check.

---

##### `fromName` <a name="fromName" id="projen.javascript.eslint.Plugin.fromName"></a>

```typescript
import { javascript } from 'projen'

javascript.eslint.Plugin.fromName(pluginName: string)
```

Use plugin by its eslint plugin name.

*Example*

```typescript
Plugin.fromName("react"); // refers to package eslint-plugin-react
```


###### `pluginName`<sup>Required</sup> <a name="pluginName" id="projen.javascript.eslint.Plugin.fromName.parameter.pluginName"></a>

- *Type:* string

---

##### `fromPackage` <a name="fromPackage" id="projen.javascript.eslint.Plugin.fromPackage"></a>

```typescript
import { javascript } from 'projen'

javascript.eslint.Plugin.fromPackage(plugin: string, name: string)
```

Use plugin by its package name.

*Example*

```typescript
Plugin.fromPackage("eslint-plugin-react");
```


###### `plugin`<sup>Required</sup> <a name="plugin" id="projen.javascript.eslint.Plugin.fromPackage.parameter.plugin"></a>

- *Type:* string

---

###### `name`<sup>Required</sup> <a name="name" id="projen.javascript.eslint.Plugin.fromPackage.parameter.name"></a>

- *Type:* string

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.eslint.Plugin.property.name">name</a></code> | <code>string</code> | The name of the plugin for eslint. |
| <code><a href="#projen.javascript.eslint.Plugin.property.pkg">pkg</a></code> | <code>string</code> | The plugin package. |

---

##### `name`<sup>Required</sup> <a name="name" id="projen.javascript.eslint.Plugin.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the plugin for eslint.

---

*Example*

```typescript
"react"
```


##### `pkg`<sup>Required</sup> <a name="pkg" id="projen.javascript.eslint.Plugin.property.pkg"></a>

```typescript
public readonly pkg: string;
```

- *Type:* string

The plugin package.

---

*Example*

```typescript
"eslint-plugin-react"
```



### SharedConfig <a name="SharedConfig" id="projen.javascript.eslint.SharedConfig"></a>

- *Implements:* projen.javascript.eslint.IESLintConfig

An ESLint configuration preset shared via a module.

#### Initializers <a name="Initializers" id="projen.javascript.eslint.SharedConfig.Initializer"></a>

```typescript
import { javascript } from 'projen'

new javascript.eslint.SharedConfig(defs: ...SharedConfigDefinition[])
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.eslint.SharedConfig.Initializer.parameter.defs">defs</a></code> | <code>...projen.javascript.eslint.SharedConfigDefinition[]</code> | *No description.* |

---

##### `defs`<sup>Required</sup> <a name="defs" id="projen.javascript.eslint.SharedConfig.Initializer.parameter.defs"></a>

- *Type:* ...projen.javascript.eslint.SharedConfigDefinition[]

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.javascript.eslint.SharedConfig.toJSON">toJSON</a></code> | *No description.* |

---

##### `toJSON` <a name="toJSON" id="projen.javascript.eslint.SharedConfig.toJSON"></a>

```typescript
public toJSON(): any
```




## Protocols <a name="Protocols" id="Protocols"></a>

### IESLintConfig <a name="IESLintConfig" id="projen.javascript.eslint.IESLintConfig"></a>

- *Implemented By:* projen.javascript.eslint.presets.ESLintJs, projen.javascript.eslint.presets.ImportPlugin, projen.javascript.eslint.presets.ImportX, projen.javascript.eslint.presets.Prettier, projen.javascript.eslint.presets.Projen, projen.javascript.eslint.presets.Stylistic, projen.javascript.eslint.presets.Tseslint, projen.javascript.eslint.ESLintConfig, projen.javascript.eslint.SharedConfig, projen.javascript.eslint.IESLintConfig



## Enums <a name="Enums" id="Enums"></a>

### Severity <a name="Severity" id="projen.javascript.eslint.Severity"></a>

The severity levels used in a configuration.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.javascript.eslint.Severity.OFF">OFF</a></code> | *No description.* |
| <code><a href="#projen.javascript.eslint.Severity.WARN">WARN</a></code> | *No description.* |
| <code><a href="#projen.javascript.eslint.Severity.ERROR">ERROR</a></code> | *No description.* |

---

##### `OFF` <a name="OFF" id="projen.javascript.eslint.Severity.OFF"></a>

---


##### `WARN` <a name="WARN" id="projen.javascript.eslint.Severity.WARN"></a>

---


##### `ERROR` <a name="ERROR" id="projen.javascript.eslint.Severity.ERROR"></a>

---

