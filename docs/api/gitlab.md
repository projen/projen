# `gitlab` Submodule <a name="`gitlab` Submodule" id="projen.gitlab"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### CiConfiguration <a name="CiConfiguration" id="projen.gitlab.CiConfiguration"></a>

CI for GitLab.

A CI is a configurable automated process made up of one or more stages/jobs.

> [https://docs.gitlab.com/ee/ci/yaml/](https://docs.gitlab.com/ee/ci/yaml/)

#### Initializers <a name="Initializers" id="projen.gitlab.CiConfiguration.Initializer"></a>

```typescript
import { gitlab } from 'projen'

new gitlab.CiConfiguration(project: Project, name: string, options?: CiConfigurationOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.gitlab.CiConfiguration.Initializer.parameter.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.gitlab.CiConfiguration.Initializer.parameter.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.gitlab.CiConfiguration.Initializer.parameter.options">options</a></code> | <code><a href="#projen.gitlab.CiConfigurationOptions">CiConfigurationOptions</a></code> | *No description.* |

---

##### `project`<sup>Required</sup> <a name="project" id="projen.gitlab.CiConfiguration.Initializer.parameter.project"></a>

- *Type:* projen.Project

---

##### `name`<sup>Required</sup> <a name="name" id="projen.gitlab.CiConfiguration.Initializer.parameter.name"></a>

- *Type:* string

---

##### `options`<sup>Optional</sup> <a name="options" id="projen.gitlab.CiConfiguration.Initializer.parameter.options"></a>

- *Type:* <a href="#projen.gitlab.CiConfigurationOptions">CiConfigurationOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.gitlab.CiConfiguration.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen.gitlab.CiConfiguration.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen.gitlab.CiConfiguration.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen.gitlab.CiConfiguration.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |
| <code><a href="#projen.gitlab.CiConfiguration.addDefaultCaches">addDefaultCaches</a></code> | Adds up to 4 default caches configuration to the CI configuration. |
| <code><a href="#projen.gitlab.CiConfiguration.addDefaultHooks">addDefaultHooks</a></code> | *No description.* |
| <code><a href="#projen.gitlab.CiConfiguration.addGlobalVariables">addGlobalVariables</a></code> | Add a globally defined variable to the CI configuration. |
| <code><a href="#projen.gitlab.CiConfiguration.addIncludes">addIncludes</a></code> | Add additional yml/yaml files to the CI includes. |
| <code><a href="#projen.gitlab.CiConfiguration.addJobs">addJobs</a></code> | Add jobs and their stages to the CI configuration. |
| <code><a href="#projen.gitlab.CiConfiguration.addServices">addServices</a></code> | Add additional services. |
| <code><a href="#projen.gitlab.CiConfiguration.addStages">addStages</a></code> | Add stages to the CI configuration if not already present. |

---

##### `toString` <a name="toString" id="projen.gitlab.CiConfiguration.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `postSynthesize` <a name="postSynthesize" id="projen.gitlab.CiConfiguration.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen.gitlab.CiConfiguration.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `synthesize` <a name="synthesize" id="projen.gitlab.CiConfiguration.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

##### `addDefaultCaches` <a name="addDefaultCaches" id="projen.gitlab.CiConfiguration.addDefaultCaches"></a>

```typescript
public addDefaultCaches(caches: Cache[]): void
```

Adds up to 4 default caches configuration to the CI configuration.

###### `caches`<sup>Required</sup> <a name="caches" id="projen.gitlab.CiConfiguration.addDefaultCaches.parameter.caches"></a>

- *Type:* <a href="#projen.gitlab.Cache">Cache</a>[]

Caches to add.

---

##### `addDefaultHooks` <a name="addDefaultHooks" id="projen.gitlab.CiConfiguration.addDefaultHooks"></a>

```typescript
public addDefaultHooks(hooks: DefaultHooks): void
```

###### `hooks`<sup>Required</sup> <a name="hooks" id="projen.gitlab.CiConfiguration.addDefaultHooks.parameter.hooks"></a>

- *Type:* <a href="#projen.gitlab.DefaultHooks">DefaultHooks</a>

---

##### `addGlobalVariables` <a name="addGlobalVariables" id="projen.gitlab.CiConfiguration.addGlobalVariables"></a>

```typescript
public addGlobalVariables(variables: {[ key: string ]: any}): void
```

Add a globally defined variable to the CI configuration.

###### `variables`<sup>Required</sup> <a name="variables" id="projen.gitlab.CiConfiguration.addGlobalVariables.parameter.variables"></a>

- *Type:* {[ key: string ]: any}

The variables to add.

---

##### `addIncludes` <a name="addIncludes" id="projen.gitlab.CiConfiguration.addIncludes"></a>

```typescript
public addIncludes(includes: ...Include[]): void
```

Add additional yml/yaml files to the CI includes.

###### `includes`<sup>Required</sup> <a name="includes" id="projen.gitlab.CiConfiguration.addIncludes.parameter.includes"></a>

- *Type:* ...<a href="#projen.gitlab.Include">Include</a>[]

The includes to add.

---

##### `addJobs` <a name="addJobs" id="projen.gitlab.CiConfiguration.addJobs"></a>

```typescript
public addJobs(jobs: {[ key: string ]: Job}): void
```

Add jobs and their stages to the CI configuration.

###### `jobs`<sup>Required</sup> <a name="jobs" id="projen.gitlab.CiConfiguration.addJobs.parameter.jobs"></a>

- *Type:* {[ key: string ]: <a href="#projen.gitlab.Job">Job</a>}

Jobs to add.

---

##### `addServices` <a name="addServices" id="projen.gitlab.CiConfiguration.addServices"></a>

```typescript
public addServices(services: ...Service[]): void
```

Add additional services.

###### `services`<sup>Required</sup> <a name="services" id="projen.gitlab.CiConfiguration.addServices.parameter.services"></a>

- *Type:* ...<a href="#projen.gitlab.Service">Service</a>[]

The services to add.

---

##### `addStages` <a name="addStages" id="projen.gitlab.CiConfiguration.addStages"></a>

```typescript
public addStages(stages: ...string[]): void
```

Add stages to the CI configuration if not already present.

###### `stages`<sup>Required</sup> <a name="stages" id="projen.gitlab.CiConfiguration.addStages.parameter.stages"></a>

- *Type:* ...string[]

stages to add.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.gitlab.CiConfiguration.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen.gitlab.CiConfiguration.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="projen.gitlab.CiConfiguration.isConstruct"></a>

```typescript
import { gitlab } from 'projen'

gitlab.CiConfiguration.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="projen.gitlab.CiConfiguration.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen.gitlab.CiConfiguration.isComponent"></a>

```typescript
import { gitlab } from 'projen'

gitlab.CiConfiguration.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen.gitlab.CiConfiguration.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.gitlab.CiConfiguration.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen.gitlab.CiConfiguration.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.gitlab.CiConfiguration.property.defaultAfterScript">defaultAfterScript</a></code> | <code>string[]</code> | Defines default scripts that should run *after* all jobs. |
| <code><a href="#projen.gitlab.CiConfiguration.property.defaultBeforeScript">defaultBeforeScript</a></code> | <code>string[]</code> | Defines default scripts that should run *before* all jobs. |
| <code><a href="#projen.gitlab.CiConfiguration.property.defaultTags">defaultTags</a></code> | <code>string[]</code> | Used to select a specific runner from the list of all runners that are available for the project. |
| <code><a href="#projen.gitlab.CiConfiguration.property.file">file</a></code> | <code>projen.YamlFile</code> | The workflow YAML file. |
| <code><a href="#projen.gitlab.CiConfiguration.property.jobs">jobs</a></code> | <code>{[ key: string ]: <a href="#projen.gitlab.Job">Job</a>}</code> | The jobs in the CI configuration. |
| <code><a href="#projen.gitlab.CiConfiguration.property.name">name</a></code> | <code>string</code> | The name of the configuration. |
| <code><a href="#projen.gitlab.CiConfiguration.property.path">path</a></code> | <code>string</code> | Path to CI file generated by the configuration. |
| <code><a href="#projen.gitlab.CiConfiguration.property.stages">stages</a></code> | <code>string[]</code> | Groups jobs into stages. |
| <code><a href="#projen.gitlab.CiConfiguration.property.variables">variables</a></code> | <code>{[ key: string ]: string \| number \| <a href="#projen.gitlab.VariableConfig">VariableConfig</a>}</code> | Global variables that are passed to jobs. |
| <code><a href="#projen.gitlab.CiConfiguration.property.defaultArtifacts">defaultArtifacts</a></code> | <code><a href="#projen.gitlab.Artifacts">Artifacts</a></code> | Default list of files and directories that should be attached to the job if it succeeds. |
| <code><a href="#projen.gitlab.CiConfiguration.property.defaultCache">defaultCache</a></code> | <code><a href="#projen.gitlab.Cache">Cache</a>[]</code> | *No description.* |
| <code><a href="#projen.gitlab.CiConfiguration.property.defaultIdTokens">defaultIdTokens</a></code> | <code>{[ key: string ]: <a href="#projen.gitlab.IDToken">IDToken</a>}</code> | Default ID tokens (JSON Web Tokens) that are used for CI/CD authentication to use globally for all jobs. |
| <code><a href="#projen.gitlab.CiConfiguration.property.defaultImage">defaultImage</a></code> | <code><a href="#projen.gitlab.Image">Image</a></code> | Specifies the default docker image to use globally for all jobs. |
| <code><a href="#projen.gitlab.CiConfiguration.property.defaultInterruptible">defaultInterruptible</a></code> | <code>boolean</code> | The default behavior for whether a job should be canceled when a newer pipeline starts before the job completes (Default: false). |
| <code><a href="#projen.gitlab.CiConfiguration.property.defaultRetry">defaultRetry</a></code> | <code><a href="#projen.gitlab.Retry">Retry</a></code> | How many times a job is retried if it fails. |
| <code><a href="#projen.gitlab.CiConfiguration.property.defaultTimeout">defaultTimeout</a></code> | <code>string</code> | A default timeout job written in natural language (Ex. |
| <code><a href="#projen.gitlab.CiConfiguration.property.pages">pages</a></code> | <code><a href="#projen.gitlab.Job">Job</a></code> | A special job used to upload static sites to Gitlab pages. |
| <code><a href="#projen.gitlab.CiConfiguration.property.workflow">workflow</a></code> | <code><a href="#projen.gitlab.Workflow">Workflow</a></code> | Used to control pipeline behavior. |

---

##### `node`<sup>Required</sup> <a name="node" id="projen.gitlab.CiConfiguration.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen.gitlab.CiConfiguration.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---

##### `defaultAfterScript`<sup>Required</sup> <a name="defaultAfterScript" id="projen.gitlab.CiConfiguration.property.defaultAfterScript"></a>

```typescript
public readonly defaultAfterScript: string[];
```

- *Type:* string[]

Defines default scripts that should run *after* all jobs.

Can be overriden by the job level `afterScript`.

---

##### `defaultBeforeScript`<sup>Required</sup> <a name="defaultBeforeScript" id="projen.gitlab.CiConfiguration.property.defaultBeforeScript"></a>

```typescript
public readonly defaultBeforeScript: string[];
```

- *Type:* string[]

Defines default scripts that should run *before* all jobs.

Can be overriden by the job level `afterScript`.

---

##### `defaultTags`<sup>Required</sup> <a name="defaultTags" id="projen.gitlab.CiConfiguration.property.defaultTags"></a>

```typescript
public readonly defaultTags: string[];
```

- *Type:* string[]

Used to select a specific runner from the list of all runners that are available for the project.

---

##### `file`<sup>Required</sup> <a name="file" id="projen.gitlab.CiConfiguration.property.file"></a>

```typescript
public readonly file: YamlFile;
```

- *Type:* projen.YamlFile

The workflow YAML file.

---

##### `jobs`<sup>Required</sup> <a name="jobs" id="projen.gitlab.CiConfiguration.property.jobs"></a>

```typescript
public readonly jobs: {[ key: string ]: Job};
```

- *Type:* {[ key: string ]: <a href="#projen.gitlab.Job">Job</a>}

The jobs in the CI configuration.

---

##### `name`<sup>Required</sup> <a name="name" id="projen.gitlab.CiConfiguration.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the configuration.

---

##### `path`<sup>Required</sup> <a name="path" id="projen.gitlab.CiConfiguration.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* string

Path to CI file generated by the configuration.

---

##### `stages`<sup>Required</sup> <a name="stages" id="projen.gitlab.CiConfiguration.property.stages"></a>

```typescript
public readonly stages: string[];
```

- *Type:* string[]

Groups jobs into stages.

All jobs in one stage must complete before next stage is
executed. Defaults to ['build', 'test', 'deploy'].

---

##### `variables`<sup>Required</sup> <a name="variables" id="projen.gitlab.CiConfiguration.property.variables"></a>

```typescript
public readonly variables: {[ key: string ]: string | number | VariableConfig};
```

- *Type:* {[ key: string ]: string | number | <a href="#projen.gitlab.VariableConfig">VariableConfig</a>}

Global variables that are passed to jobs.

If the job already has that variable defined, the job-level variable takes precedence.

---

##### `defaultArtifacts`<sup>Optional</sup> <a name="defaultArtifacts" id="projen.gitlab.CiConfiguration.property.defaultArtifacts"></a>

```typescript
public readonly defaultArtifacts: Artifacts;
```

- *Type:* <a href="#projen.gitlab.Artifacts">Artifacts</a>

Default list of files and directories that should be attached to the job if it succeeds.

Artifacts are sent to Gitlab where they can be downloaded.

---

##### `defaultCache`<sup>Optional</sup> <a name="defaultCache" id="projen.gitlab.CiConfiguration.property.defaultCache"></a>

```typescript
public readonly defaultCache: Cache[];
```

- *Type:* <a href="#projen.gitlab.Cache">Cache</a>[]

---

##### `defaultIdTokens`<sup>Optional</sup> <a name="defaultIdTokens" id="projen.gitlab.CiConfiguration.property.defaultIdTokens"></a>

```typescript
public readonly defaultIdTokens: {[ key: string ]: IDToken};
```

- *Type:* {[ key: string ]: <a href="#projen.gitlab.IDToken">IDToken</a>}

Default ID tokens (JSON Web Tokens) that are used for CI/CD authentication to use globally for all jobs.

---

##### `defaultImage`<sup>Optional</sup> <a name="defaultImage" id="projen.gitlab.CiConfiguration.property.defaultImage"></a>

```typescript
public readonly defaultImage: Image;
```

- *Type:* <a href="#projen.gitlab.Image">Image</a>

Specifies the default docker image to use globally for all jobs.

---

##### `defaultInterruptible`<sup>Optional</sup> <a name="defaultInterruptible" id="projen.gitlab.CiConfiguration.property.defaultInterruptible"></a>

```typescript
public readonly defaultInterruptible: boolean;
```

- *Type:* boolean

The default behavior for whether a job should be canceled when a newer pipeline starts before the job completes (Default: false).

---

##### `defaultRetry`<sup>Optional</sup> <a name="defaultRetry" id="projen.gitlab.CiConfiguration.property.defaultRetry"></a>

```typescript
public readonly defaultRetry: Retry;
```

- *Type:* <a href="#projen.gitlab.Retry">Retry</a>

How many times a job is retried if it fails.

If not defined, defaults to 0 and jobs do not retry.

---

##### `defaultTimeout`<sup>Optional</sup> <a name="defaultTimeout" id="projen.gitlab.CiConfiguration.property.defaultTimeout"></a>

```typescript
public readonly defaultTimeout: string;
```

- *Type:* string

A default timeout job written in natural language (Ex.

one hour, 3600 seconds, 60 minutes).

---

##### `pages`<sup>Optional</sup> <a name="pages" id="projen.gitlab.CiConfiguration.property.pages"></a>

```typescript
public readonly pages: Job;
```

- *Type:* <a href="#projen.gitlab.Job">Job</a>

A special job used to upload static sites to Gitlab pages.

Requires a `public/` directory
with `artifacts.path` pointing to it.

---

##### `workflow`<sup>Optional</sup> <a name="workflow" id="projen.gitlab.CiConfiguration.property.workflow"></a>

```typescript
public readonly workflow: Workflow;
```

- *Type:* <a href="#projen.gitlab.Workflow">Workflow</a>

Used to control pipeline behavior.

---


### GitlabConfiguration <a name="GitlabConfiguration" id="projen.gitlab.GitlabConfiguration"></a>

A GitLab CI for the main `.gitlab-ci.yml` file.

#### Initializers <a name="Initializers" id="projen.gitlab.GitlabConfiguration.Initializer"></a>

```typescript
import { gitlab } from 'projen'

new gitlab.GitlabConfiguration(project: Project, options?: CiConfigurationOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.gitlab.GitlabConfiguration.Initializer.parameter.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.gitlab.GitlabConfiguration.Initializer.parameter.options">options</a></code> | <code><a href="#projen.gitlab.CiConfigurationOptions">CiConfigurationOptions</a></code> | *No description.* |

---

##### `project`<sup>Required</sup> <a name="project" id="projen.gitlab.GitlabConfiguration.Initializer.parameter.project"></a>

- *Type:* projen.Project

---

##### `options`<sup>Optional</sup> <a name="options" id="projen.gitlab.GitlabConfiguration.Initializer.parameter.options"></a>

- *Type:* <a href="#projen.gitlab.CiConfigurationOptions">CiConfigurationOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.gitlab.GitlabConfiguration.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen.gitlab.GitlabConfiguration.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen.gitlab.GitlabConfiguration.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen.gitlab.GitlabConfiguration.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |
| <code><a href="#projen.gitlab.GitlabConfiguration.addDefaultCaches">addDefaultCaches</a></code> | Adds up to 4 default caches configuration to the CI configuration. |
| <code><a href="#projen.gitlab.GitlabConfiguration.addDefaultHooks">addDefaultHooks</a></code> | *No description.* |
| <code><a href="#projen.gitlab.GitlabConfiguration.addGlobalVariables">addGlobalVariables</a></code> | Add a globally defined variable to the CI configuration. |
| <code><a href="#projen.gitlab.GitlabConfiguration.addIncludes">addIncludes</a></code> | Add additional yml/yaml files to the CI includes. |
| <code><a href="#projen.gitlab.GitlabConfiguration.addJobs">addJobs</a></code> | Add jobs and their stages to the CI configuration. |
| <code><a href="#projen.gitlab.GitlabConfiguration.addServices">addServices</a></code> | Add additional services. |
| <code><a href="#projen.gitlab.GitlabConfiguration.addStages">addStages</a></code> | Add stages to the CI configuration if not already present. |
| <code><a href="#projen.gitlab.GitlabConfiguration.createNestedTemplates">createNestedTemplates</a></code> | Creates and adds nested templates to the includes of the main CI. |

---

##### `toString` <a name="toString" id="projen.gitlab.GitlabConfiguration.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `postSynthesize` <a name="postSynthesize" id="projen.gitlab.GitlabConfiguration.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen.gitlab.GitlabConfiguration.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `synthesize` <a name="synthesize" id="projen.gitlab.GitlabConfiguration.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

##### `addDefaultCaches` <a name="addDefaultCaches" id="projen.gitlab.GitlabConfiguration.addDefaultCaches"></a>

```typescript
public addDefaultCaches(caches: Cache[]): void
```

Adds up to 4 default caches configuration to the CI configuration.

###### `caches`<sup>Required</sup> <a name="caches" id="projen.gitlab.GitlabConfiguration.addDefaultCaches.parameter.caches"></a>

- *Type:* <a href="#projen.gitlab.Cache">Cache</a>[]

Caches to add.

---

##### `addDefaultHooks` <a name="addDefaultHooks" id="projen.gitlab.GitlabConfiguration.addDefaultHooks"></a>

```typescript
public addDefaultHooks(hooks: DefaultHooks): void
```

###### `hooks`<sup>Required</sup> <a name="hooks" id="projen.gitlab.GitlabConfiguration.addDefaultHooks.parameter.hooks"></a>

- *Type:* <a href="#projen.gitlab.DefaultHooks">DefaultHooks</a>

---

##### `addGlobalVariables` <a name="addGlobalVariables" id="projen.gitlab.GitlabConfiguration.addGlobalVariables"></a>

```typescript
public addGlobalVariables(variables: {[ key: string ]: any}): void
```

Add a globally defined variable to the CI configuration.

###### `variables`<sup>Required</sup> <a name="variables" id="projen.gitlab.GitlabConfiguration.addGlobalVariables.parameter.variables"></a>

- *Type:* {[ key: string ]: any}

The variables to add.

---

##### `addIncludes` <a name="addIncludes" id="projen.gitlab.GitlabConfiguration.addIncludes"></a>

```typescript
public addIncludes(includes: ...Include[]): void
```

Add additional yml/yaml files to the CI includes.

###### `includes`<sup>Required</sup> <a name="includes" id="projen.gitlab.GitlabConfiguration.addIncludes.parameter.includes"></a>

- *Type:* ...<a href="#projen.gitlab.Include">Include</a>[]

The includes to add.

---

##### `addJobs` <a name="addJobs" id="projen.gitlab.GitlabConfiguration.addJobs"></a>

```typescript
public addJobs(jobs: {[ key: string ]: Job}): void
```

Add jobs and their stages to the CI configuration.

###### `jobs`<sup>Required</sup> <a name="jobs" id="projen.gitlab.GitlabConfiguration.addJobs.parameter.jobs"></a>

- *Type:* {[ key: string ]: <a href="#projen.gitlab.Job">Job</a>}

Jobs to add.

---

##### `addServices` <a name="addServices" id="projen.gitlab.GitlabConfiguration.addServices"></a>

```typescript
public addServices(services: ...Service[]): void
```

Add additional services.

###### `services`<sup>Required</sup> <a name="services" id="projen.gitlab.GitlabConfiguration.addServices.parameter.services"></a>

- *Type:* ...<a href="#projen.gitlab.Service">Service</a>[]

The services to add.

---

##### `addStages` <a name="addStages" id="projen.gitlab.GitlabConfiguration.addStages"></a>

```typescript
public addStages(stages: ...string[]): void
```

Add stages to the CI configuration if not already present.

###### `stages`<sup>Required</sup> <a name="stages" id="projen.gitlab.GitlabConfiguration.addStages.parameter.stages"></a>

- *Type:* ...string[]

stages to add.

---

##### `createNestedTemplates` <a name="createNestedTemplates" id="projen.gitlab.GitlabConfiguration.createNestedTemplates"></a>

```typescript
public createNestedTemplates(config: {[ key: string ]: CiConfigurationOptions}): void
```

Creates and adds nested templates to the includes of the main CI.

Additionally adds their stages to the main CI if they are not already present.
You can futher customize nested templates through the `nestedTemplates` property.
E.g. gitlabConfig.nestedTemplates['templateName']?.addStages('stageName')

###### `config`<sup>Required</sup> <a name="config" id="projen.gitlab.GitlabConfiguration.createNestedTemplates.parameter.config"></a>

- *Type:* {[ key: string ]: <a href="#projen.gitlab.CiConfigurationOptions">CiConfigurationOptions</a>}

a record the names and configuraitons of the templates.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.gitlab.GitlabConfiguration.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen.gitlab.GitlabConfiguration.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="projen.gitlab.GitlabConfiguration.isConstruct"></a>

```typescript
import { gitlab } from 'projen'

gitlab.GitlabConfiguration.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="projen.gitlab.GitlabConfiguration.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen.gitlab.GitlabConfiguration.isComponent"></a>

```typescript
import { gitlab } from 'projen'

gitlab.GitlabConfiguration.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen.gitlab.GitlabConfiguration.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.gitlab.GitlabConfiguration.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen.gitlab.GitlabConfiguration.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.gitlab.GitlabConfiguration.property.defaultAfterScript">defaultAfterScript</a></code> | <code>string[]</code> | Defines default scripts that should run *after* all jobs. |
| <code><a href="#projen.gitlab.GitlabConfiguration.property.defaultBeforeScript">defaultBeforeScript</a></code> | <code>string[]</code> | Defines default scripts that should run *before* all jobs. |
| <code><a href="#projen.gitlab.GitlabConfiguration.property.defaultTags">defaultTags</a></code> | <code>string[]</code> | Used to select a specific runner from the list of all runners that are available for the project. |
| <code><a href="#projen.gitlab.GitlabConfiguration.property.file">file</a></code> | <code>projen.YamlFile</code> | The workflow YAML file. |
| <code><a href="#projen.gitlab.GitlabConfiguration.property.jobs">jobs</a></code> | <code>{[ key: string ]: <a href="#projen.gitlab.Job">Job</a>}</code> | The jobs in the CI configuration. |
| <code><a href="#projen.gitlab.GitlabConfiguration.property.name">name</a></code> | <code>string</code> | The name of the configuration. |
| <code><a href="#projen.gitlab.GitlabConfiguration.property.path">path</a></code> | <code>string</code> | Path to CI file generated by the configuration. |
| <code><a href="#projen.gitlab.GitlabConfiguration.property.stages">stages</a></code> | <code>string[]</code> | Groups jobs into stages. |
| <code><a href="#projen.gitlab.GitlabConfiguration.property.variables">variables</a></code> | <code>{[ key: string ]: string \| number \| <a href="#projen.gitlab.VariableConfig">VariableConfig</a>}</code> | Global variables that are passed to jobs. |
| <code><a href="#projen.gitlab.GitlabConfiguration.property.defaultArtifacts">defaultArtifacts</a></code> | <code><a href="#projen.gitlab.Artifacts">Artifacts</a></code> | Default list of files and directories that should be attached to the job if it succeeds. |
| <code><a href="#projen.gitlab.GitlabConfiguration.property.defaultCache">defaultCache</a></code> | <code><a href="#projen.gitlab.Cache">Cache</a>[]</code> | *No description.* |
| <code><a href="#projen.gitlab.GitlabConfiguration.property.defaultIdTokens">defaultIdTokens</a></code> | <code>{[ key: string ]: <a href="#projen.gitlab.IDToken">IDToken</a>}</code> | Default ID tokens (JSON Web Tokens) that are used for CI/CD authentication to use globally for all jobs. |
| <code><a href="#projen.gitlab.GitlabConfiguration.property.defaultImage">defaultImage</a></code> | <code><a href="#projen.gitlab.Image">Image</a></code> | Specifies the default docker image to use globally for all jobs. |
| <code><a href="#projen.gitlab.GitlabConfiguration.property.defaultInterruptible">defaultInterruptible</a></code> | <code>boolean</code> | The default behavior for whether a job should be canceled when a newer pipeline starts before the job completes (Default: false). |
| <code><a href="#projen.gitlab.GitlabConfiguration.property.defaultRetry">defaultRetry</a></code> | <code><a href="#projen.gitlab.Retry">Retry</a></code> | How many times a job is retried if it fails. |
| <code><a href="#projen.gitlab.GitlabConfiguration.property.defaultTimeout">defaultTimeout</a></code> | <code>string</code> | A default timeout job written in natural language (Ex. |
| <code><a href="#projen.gitlab.GitlabConfiguration.property.pages">pages</a></code> | <code><a href="#projen.gitlab.Job">Job</a></code> | A special job used to upload static sites to Gitlab pages. |
| <code><a href="#projen.gitlab.GitlabConfiguration.property.workflow">workflow</a></code> | <code><a href="#projen.gitlab.Workflow">Workflow</a></code> | Used to control pipeline behavior. |
| <code><a href="#projen.gitlab.GitlabConfiguration.property.nestedTemplates">nestedTemplates</a></code> | <code>{[ key: string ]: <a href="#projen.gitlab.NestedConfiguration">NestedConfiguration</a>}</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="projen.gitlab.GitlabConfiguration.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen.gitlab.GitlabConfiguration.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---

##### `defaultAfterScript`<sup>Required</sup> <a name="defaultAfterScript" id="projen.gitlab.GitlabConfiguration.property.defaultAfterScript"></a>

```typescript
public readonly defaultAfterScript: string[];
```

- *Type:* string[]

Defines default scripts that should run *after* all jobs.

Can be overriden by the job level `afterScript`.

---

##### `defaultBeforeScript`<sup>Required</sup> <a name="defaultBeforeScript" id="projen.gitlab.GitlabConfiguration.property.defaultBeforeScript"></a>

```typescript
public readonly defaultBeforeScript: string[];
```

- *Type:* string[]

Defines default scripts that should run *before* all jobs.

Can be overriden by the job level `afterScript`.

---

##### `defaultTags`<sup>Required</sup> <a name="defaultTags" id="projen.gitlab.GitlabConfiguration.property.defaultTags"></a>

```typescript
public readonly defaultTags: string[];
```

- *Type:* string[]

Used to select a specific runner from the list of all runners that are available for the project.

---

##### `file`<sup>Required</sup> <a name="file" id="projen.gitlab.GitlabConfiguration.property.file"></a>

```typescript
public readonly file: YamlFile;
```

- *Type:* projen.YamlFile

The workflow YAML file.

---

##### `jobs`<sup>Required</sup> <a name="jobs" id="projen.gitlab.GitlabConfiguration.property.jobs"></a>

```typescript
public readonly jobs: {[ key: string ]: Job};
```

- *Type:* {[ key: string ]: <a href="#projen.gitlab.Job">Job</a>}

The jobs in the CI configuration.

---

##### `name`<sup>Required</sup> <a name="name" id="projen.gitlab.GitlabConfiguration.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the configuration.

---

##### `path`<sup>Required</sup> <a name="path" id="projen.gitlab.GitlabConfiguration.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* string

Path to CI file generated by the configuration.

---

##### `stages`<sup>Required</sup> <a name="stages" id="projen.gitlab.GitlabConfiguration.property.stages"></a>

```typescript
public readonly stages: string[];
```

- *Type:* string[]

Groups jobs into stages.

All jobs in one stage must complete before next stage is
executed. Defaults to ['build', 'test', 'deploy'].

---

##### `variables`<sup>Required</sup> <a name="variables" id="projen.gitlab.GitlabConfiguration.property.variables"></a>

```typescript
public readonly variables: {[ key: string ]: string | number | VariableConfig};
```

- *Type:* {[ key: string ]: string | number | <a href="#projen.gitlab.VariableConfig">VariableConfig</a>}

Global variables that are passed to jobs.

If the job already has that variable defined, the job-level variable takes precedence.

---

##### `defaultArtifacts`<sup>Optional</sup> <a name="defaultArtifacts" id="projen.gitlab.GitlabConfiguration.property.defaultArtifacts"></a>

```typescript
public readonly defaultArtifacts: Artifacts;
```

- *Type:* <a href="#projen.gitlab.Artifacts">Artifacts</a>

Default list of files and directories that should be attached to the job if it succeeds.

Artifacts are sent to Gitlab where they can be downloaded.

---

##### `defaultCache`<sup>Optional</sup> <a name="defaultCache" id="projen.gitlab.GitlabConfiguration.property.defaultCache"></a>

```typescript
public readonly defaultCache: Cache[];
```

- *Type:* <a href="#projen.gitlab.Cache">Cache</a>[]

---

##### `defaultIdTokens`<sup>Optional</sup> <a name="defaultIdTokens" id="projen.gitlab.GitlabConfiguration.property.defaultIdTokens"></a>

```typescript
public readonly defaultIdTokens: {[ key: string ]: IDToken};
```

- *Type:* {[ key: string ]: <a href="#projen.gitlab.IDToken">IDToken</a>}

Default ID tokens (JSON Web Tokens) that are used for CI/CD authentication to use globally for all jobs.

---

##### `defaultImage`<sup>Optional</sup> <a name="defaultImage" id="projen.gitlab.GitlabConfiguration.property.defaultImage"></a>

```typescript
public readonly defaultImage: Image;
```

- *Type:* <a href="#projen.gitlab.Image">Image</a>

Specifies the default docker image to use globally for all jobs.

---

##### `defaultInterruptible`<sup>Optional</sup> <a name="defaultInterruptible" id="projen.gitlab.GitlabConfiguration.property.defaultInterruptible"></a>

```typescript
public readonly defaultInterruptible: boolean;
```

- *Type:* boolean

The default behavior for whether a job should be canceled when a newer pipeline starts before the job completes (Default: false).

---

##### `defaultRetry`<sup>Optional</sup> <a name="defaultRetry" id="projen.gitlab.GitlabConfiguration.property.defaultRetry"></a>

```typescript
public readonly defaultRetry: Retry;
```

- *Type:* <a href="#projen.gitlab.Retry">Retry</a>

How many times a job is retried if it fails.

If not defined, defaults to 0 and jobs do not retry.

---

##### `defaultTimeout`<sup>Optional</sup> <a name="defaultTimeout" id="projen.gitlab.GitlabConfiguration.property.defaultTimeout"></a>

```typescript
public readonly defaultTimeout: string;
```

- *Type:* string

A default timeout job written in natural language (Ex.

one hour, 3600 seconds, 60 minutes).

---

##### `pages`<sup>Optional</sup> <a name="pages" id="projen.gitlab.GitlabConfiguration.property.pages"></a>

```typescript
public readonly pages: Job;
```

- *Type:* <a href="#projen.gitlab.Job">Job</a>

A special job used to upload static sites to Gitlab pages.

Requires a `public/` directory
with `artifacts.path` pointing to it.

---

##### `workflow`<sup>Optional</sup> <a name="workflow" id="projen.gitlab.GitlabConfiguration.property.workflow"></a>

```typescript
public readonly workflow: Workflow;
```

- *Type:* <a href="#projen.gitlab.Workflow">Workflow</a>

Used to control pipeline behavior.

---

##### `nestedTemplates`<sup>Required</sup> <a name="nestedTemplates" id="projen.gitlab.GitlabConfiguration.property.nestedTemplates"></a>

```typescript
public readonly nestedTemplates: {[ key: string ]: NestedConfiguration};
```

- *Type:* {[ key: string ]: <a href="#projen.gitlab.NestedConfiguration">NestedConfiguration</a>}

---


### NestedConfiguration <a name="NestedConfiguration" id="projen.gitlab.NestedConfiguration"></a>

A GitLab CI for templates that are created and included in the `.gitlab-ci.yml` file.

#### Initializers <a name="Initializers" id="projen.gitlab.NestedConfiguration.Initializer"></a>

```typescript
import { gitlab } from 'projen'

new gitlab.NestedConfiguration(project: Project, parent: GitlabConfiguration, name: string, options?: CiConfigurationOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.gitlab.NestedConfiguration.Initializer.parameter.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.gitlab.NestedConfiguration.Initializer.parameter.parent">parent</a></code> | <code><a href="#projen.gitlab.GitlabConfiguration">GitlabConfiguration</a></code> | *No description.* |
| <code><a href="#projen.gitlab.NestedConfiguration.Initializer.parameter.name">name</a></code> | <code>string</code> | The name of the configuration. |
| <code><a href="#projen.gitlab.NestedConfiguration.Initializer.parameter.options">options</a></code> | <code><a href="#projen.gitlab.CiConfigurationOptions">CiConfigurationOptions</a></code> | *No description.* |

---

##### `project`<sup>Required</sup> <a name="project" id="projen.gitlab.NestedConfiguration.Initializer.parameter.project"></a>

- *Type:* projen.Project

---

##### `parent`<sup>Required</sup> <a name="parent" id="projen.gitlab.NestedConfiguration.Initializer.parameter.parent"></a>

- *Type:* <a href="#projen.gitlab.GitlabConfiguration">GitlabConfiguration</a>

---

##### `name`<sup>Required</sup> <a name="name" id="projen.gitlab.NestedConfiguration.Initializer.parameter.name"></a>

- *Type:* string

The name of the configuration.

---

##### `options`<sup>Optional</sup> <a name="options" id="projen.gitlab.NestedConfiguration.Initializer.parameter.options"></a>

- *Type:* <a href="#projen.gitlab.CiConfigurationOptions">CiConfigurationOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.gitlab.NestedConfiguration.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen.gitlab.NestedConfiguration.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen.gitlab.NestedConfiguration.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen.gitlab.NestedConfiguration.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |
| <code><a href="#projen.gitlab.NestedConfiguration.addDefaultCaches">addDefaultCaches</a></code> | Adds up to 4 default caches configuration to the CI configuration. |
| <code><a href="#projen.gitlab.NestedConfiguration.addDefaultHooks">addDefaultHooks</a></code> | *No description.* |
| <code><a href="#projen.gitlab.NestedConfiguration.addGlobalVariables">addGlobalVariables</a></code> | Add a globally defined variable to the CI configuration. |
| <code><a href="#projen.gitlab.NestedConfiguration.addIncludes">addIncludes</a></code> | Add additional yml/yaml files to the CI includes. |
| <code><a href="#projen.gitlab.NestedConfiguration.addJobs">addJobs</a></code> | Add jobs and their stages to the CI configuration. |
| <code><a href="#projen.gitlab.NestedConfiguration.addServices">addServices</a></code> | Add additional services. |
| <code><a href="#projen.gitlab.NestedConfiguration.addStages">addStages</a></code> | Add stages to the CI configuration if not already present. |

---

##### `toString` <a name="toString" id="projen.gitlab.NestedConfiguration.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `postSynthesize` <a name="postSynthesize" id="projen.gitlab.NestedConfiguration.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen.gitlab.NestedConfiguration.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `synthesize` <a name="synthesize" id="projen.gitlab.NestedConfiguration.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

##### `addDefaultCaches` <a name="addDefaultCaches" id="projen.gitlab.NestedConfiguration.addDefaultCaches"></a>

```typescript
public addDefaultCaches(caches: Cache[]): void
```

Adds up to 4 default caches configuration to the CI configuration.

###### `caches`<sup>Required</sup> <a name="caches" id="projen.gitlab.NestedConfiguration.addDefaultCaches.parameter.caches"></a>

- *Type:* <a href="#projen.gitlab.Cache">Cache</a>[]

Caches to add.

---

##### `addDefaultHooks` <a name="addDefaultHooks" id="projen.gitlab.NestedConfiguration.addDefaultHooks"></a>

```typescript
public addDefaultHooks(hooks: DefaultHooks): void
```

###### `hooks`<sup>Required</sup> <a name="hooks" id="projen.gitlab.NestedConfiguration.addDefaultHooks.parameter.hooks"></a>

- *Type:* <a href="#projen.gitlab.DefaultHooks">DefaultHooks</a>

---

##### `addGlobalVariables` <a name="addGlobalVariables" id="projen.gitlab.NestedConfiguration.addGlobalVariables"></a>

```typescript
public addGlobalVariables(variables: {[ key: string ]: any}): void
```

Add a globally defined variable to the CI configuration.

###### `variables`<sup>Required</sup> <a name="variables" id="projen.gitlab.NestedConfiguration.addGlobalVariables.parameter.variables"></a>

- *Type:* {[ key: string ]: any}

The variables to add.

---

##### `addIncludes` <a name="addIncludes" id="projen.gitlab.NestedConfiguration.addIncludes"></a>

```typescript
public addIncludes(includes: ...Include[]): void
```

Add additional yml/yaml files to the CI includes.

###### `includes`<sup>Required</sup> <a name="includes" id="projen.gitlab.NestedConfiguration.addIncludes.parameter.includes"></a>

- *Type:* ...<a href="#projen.gitlab.Include">Include</a>[]

The includes to add.

---

##### `addJobs` <a name="addJobs" id="projen.gitlab.NestedConfiguration.addJobs"></a>

```typescript
public addJobs(jobs: {[ key: string ]: Job}): void
```

Add jobs and their stages to the CI configuration.

###### `jobs`<sup>Required</sup> <a name="jobs" id="projen.gitlab.NestedConfiguration.addJobs.parameter.jobs"></a>

- *Type:* {[ key: string ]: <a href="#projen.gitlab.Job">Job</a>}

Jobs to add.

---

##### `addServices` <a name="addServices" id="projen.gitlab.NestedConfiguration.addServices"></a>

```typescript
public addServices(services: ...Service[]): void
```

Add additional services.

###### `services`<sup>Required</sup> <a name="services" id="projen.gitlab.NestedConfiguration.addServices.parameter.services"></a>

- *Type:* ...<a href="#projen.gitlab.Service">Service</a>[]

The services to add.

---

##### `addStages` <a name="addStages" id="projen.gitlab.NestedConfiguration.addStages"></a>

```typescript
public addStages(stages: ...string[]): void
```

Add stages to the CI configuration if not already present.

###### `stages`<sup>Required</sup> <a name="stages" id="projen.gitlab.NestedConfiguration.addStages.parameter.stages"></a>

- *Type:* ...string[]

stages to add.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.gitlab.NestedConfiguration.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen.gitlab.NestedConfiguration.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="projen.gitlab.NestedConfiguration.isConstruct"></a>

```typescript
import { gitlab } from 'projen'

gitlab.NestedConfiguration.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="projen.gitlab.NestedConfiguration.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen.gitlab.NestedConfiguration.isComponent"></a>

```typescript
import { gitlab } from 'projen'

gitlab.NestedConfiguration.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen.gitlab.NestedConfiguration.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.gitlab.NestedConfiguration.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen.gitlab.NestedConfiguration.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.gitlab.NestedConfiguration.property.defaultAfterScript">defaultAfterScript</a></code> | <code>string[]</code> | Defines default scripts that should run *after* all jobs. |
| <code><a href="#projen.gitlab.NestedConfiguration.property.defaultBeforeScript">defaultBeforeScript</a></code> | <code>string[]</code> | Defines default scripts that should run *before* all jobs. |
| <code><a href="#projen.gitlab.NestedConfiguration.property.defaultTags">defaultTags</a></code> | <code>string[]</code> | Used to select a specific runner from the list of all runners that are available for the project. |
| <code><a href="#projen.gitlab.NestedConfiguration.property.file">file</a></code> | <code>projen.YamlFile</code> | The workflow YAML file. |
| <code><a href="#projen.gitlab.NestedConfiguration.property.jobs">jobs</a></code> | <code>{[ key: string ]: <a href="#projen.gitlab.Job">Job</a>}</code> | The jobs in the CI configuration. |
| <code><a href="#projen.gitlab.NestedConfiguration.property.name">name</a></code> | <code>string</code> | The name of the configuration. |
| <code><a href="#projen.gitlab.NestedConfiguration.property.path">path</a></code> | <code>string</code> | Path to CI file generated by the configuration. |
| <code><a href="#projen.gitlab.NestedConfiguration.property.stages">stages</a></code> | <code>string[]</code> | Groups jobs into stages. |
| <code><a href="#projen.gitlab.NestedConfiguration.property.variables">variables</a></code> | <code>{[ key: string ]: string \| number \| <a href="#projen.gitlab.VariableConfig">VariableConfig</a>}</code> | Global variables that are passed to jobs. |
| <code><a href="#projen.gitlab.NestedConfiguration.property.defaultArtifacts">defaultArtifacts</a></code> | <code><a href="#projen.gitlab.Artifacts">Artifacts</a></code> | Default list of files and directories that should be attached to the job if it succeeds. |
| <code><a href="#projen.gitlab.NestedConfiguration.property.defaultCache">defaultCache</a></code> | <code><a href="#projen.gitlab.Cache">Cache</a>[]</code> | *No description.* |
| <code><a href="#projen.gitlab.NestedConfiguration.property.defaultIdTokens">defaultIdTokens</a></code> | <code>{[ key: string ]: <a href="#projen.gitlab.IDToken">IDToken</a>}</code> | Default ID tokens (JSON Web Tokens) that are used for CI/CD authentication to use globally for all jobs. |
| <code><a href="#projen.gitlab.NestedConfiguration.property.defaultImage">defaultImage</a></code> | <code><a href="#projen.gitlab.Image">Image</a></code> | Specifies the default docker image to use globally for all jobs. |
| <code><a href="#projen.gitlab.NestedConfiguration.property.defaultInterruptible">defaultInterruptible</a></code> | <code>boolean</code> | The default behavior for whether a job should be canceled when a newer pipeline starts before the job completes (Default: false). |
| <code><a href="#projen.gitlab.NestedConfiguration.property.defaultRetry">defaultRetry</a></code> | <code><a href="#projen.gitlab.Retry">Retry</a></code> | How many times a job is retried if it fails. |
| <code><a href="#projen.gitlab.NestedConfiguration.property.defaultTimeout">defaultTimeout</a></code> | <code>string</code> | A default timeout job written in natural language (Ex. |
| <code><a href="#projen.gitlab.NestedConfiguration.property.pages">pages</a></code> | <code><a href="#projen.gitlab.Job">Job</a></code> | A special job used to upload static sites to Gitlab pages. |
| <code><a href="#projen.gitlab.NestedConfiguration.property.workflow">workflow</a></code> | <code><a href="#projen.gitlab.Workflow">Workflow</a></code> | Used to control pipeline behavior. |
| <code><a href="#projen.gitlab.NestedConfiguration.property.parent">parent</a></code> | <code><a href="#projen.gitlab.GitlabConfiguration">GitlabConfiguration</a></code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="projen.gitlab.NestedConfiguration.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen.gitlab.NestedConfiguration.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---

##### `defaultAfterScript`<sup>Required</sup> <a name="defaultAfterScript" id="projen.gitlab.NestedConfiguration.property.defaultAfterScript"></a>

```typescript
public readonly defaultAfterScript: string[];
```

- *Type:* string[]

Defines default scripts that should run *after* all jobs.

Can be overriden by the job level `afterScript`.

---

##### `defaultBeforeScript`<sup>Required</sup> <a name="defaultBeforeScript" id="projen.gitlab.NestedConfiguration.property.defaultBeforeScript"></a>

```typescript
public readonly defaultBeforeScript: string[];
```

- *Type:* string[]

Defines default scripts that should run *before* all jobs.

Can be overriden by the job level `afterScript`.

---

##### `defaultTags`<sup>Required</sup> <a name="defaultTags" id="projen.gitlab.NestedConfiguration.property.defaultTags"></a>

```typescript
public readonly defaultTags: string[];
```

- *Type:* string[]

Used to select a specific runner from the list of all runners that are available for the project.

---

##### `file`<sup>Required</sup> <a name="file" id="projen.gitlab.NestedConfiguration.property.file"></a>

```typescript
public readonly file: YamlFile;
```

- *Type:* projen.YamlFile

The workflow YAML file.

---

##### `jobs`<sup>Required</sup> <a name="jobs" id="projen.gitlab.NestedConfiguration.property.jobs"></a>

```typescript
public readonly jobs: {[ key: string ]: Job};
```

- *Type:* {[ key: string ]: <a href="#projen.gitlab.Job">Job</a>}

The jobs in the CI configuration.

---

##### `name`<sup>Required</sup> <a name="name" id="projen.gitlab.NestedConfiguration.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the configuration.

---

##### `path`<sup>Required</sup> <a name="path" id="projen.gitlab.NestedConfiguration.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* string

Path to CI file generated by the configuration.

---

##### `stages`<sup>Required</sup> <a name="stages" id="projen.gitlab.NestedConfiguration.property.stages"></a>

```typescript
public readonly stages: string[];
```

- *Type:* string[]

Groups jobs into stages.

All jobs in one stage must complete before next stage is
executed. Defaults to ['build', 'test', 'deploy'].

---

##### `variables`<sup>Required</sup> <a name="variables" id="projen.gitlab.NestedConfiguration.property.variables"></a>

```typescript
public readonly variables: {[ key: string ]: string | number | VariableConfig};
```

- *Type:* {[ key: string ]: string | number | <a href="#projen.gitlab.VariableConfig">VariableConfig</a>}

Global variables that are passed to jobs.

If the job already has that variable defined, the job-level variable takes precedence.

---

##### `defaultArtifacts`<sup>Optional</sup> <a name="defaultArtifacts" id="projen.gitlab.NestedConfiguration.property.defaultArtifacts"></a>

```typescript
public readonly defaultArtifacts: Artifacts;
```

- *Type:* <a href="#projen.gitlab.Artifacts">Artifacts</a>

Default list of files and directories that should be attached to the job if it succeeds.

Artifacts are sent to Gitlab where they can be downloaded.

---

##### `defaultCache`<sup>Optional</sup> <a name="defaultCache" id="projen.gitlab.NestedConfiguration.property.defaultCache"></a>

```typescript
public readonly defaultCache: Cache[];
```

- *Type:* <a href="#projen.gitlab.Cache">Cache</a>[]

---

##### `defaultIdTokens`<sup>Optional</sup> <a name="defaultIdTokens" id="projen.gitlab.NestedConfiguration.property.defaultIdTokens"></a>

```typescript
public readonly defaultIdTokens: {[ key: string ]: IDToken};
```

- *Type:* {[ key: string ]: <a href="#projen.gitlab.IDToken">IDToken</a>}

Default ID tokens (JSON Web Tokens) that are used for CI/CD authentication to use globally for all jobs.

---

##### `defaultImage`<sup>Optional</sup> <a name="defaultImage" id="projen.gitlab.NestedConfiguration.property.defaultImage"></a>

```typescript
public readonly defaultImage: Image;
```

- *Type:* <a href="#projen.gitlab.Image">Image</a>

Specifies the default docker image to use globally for all jobs.

---

##### `defaultInterruptible`<sup>Optional</sup> <a name="defaultInterruptible" id="projen.gitlab.NestedConfiguration.property.defaultInterruptible"></a>

```typescript
public readonly defaultInterruptible: boolean;
```

- *Type:* boolean

The default behavior for whether a job should be canceled when a newer pipeline starts before the job completes (Default: false).

---

##### `defaultRetry`<sup>Optional</sup> <a name="defaultRetry" id="projen.gitlab.NestedConfiguration.property.defaultRetry"></a>

```typescript
public readonly defaultRetry: Retry;
```

- *Type:* <a href="#projen.gitlab.Retry">Retry</a>

How many times a job is retried if it fails.

If not defined, defaults to 0 and jobs do not retry.

---

##### `defaultTimeout`<sup>Optional</sup> <a name="defaultTimeout" id="projen.gitlab.NestedConfiguration.property.defaultTimeout"></a>

```typescript
public readonly defaultTimeout: string;
```

- *Type:* string

A default timeout job written in natural language (Ex.

one hour, 3600 seconds, 60 minutes).

---

##### `pages`<sup>Optional</sup> <a name="pages" id="projen.gitlab.NestedConfiguration.property.pages"></a>

```typescript
public readonly pages: Job;
```

- *Type:* <a href="#projen.gitlab.Job">Job</a>

A special job used to upload static sites to Gitlab pages.

Requires a `public/` directory
with `artifacts.path` pointing to it.

---

##### `workflow`<sup>Optional</sup> <a name="workflow" id="projen.gitlab.NestedConfiguration.property.workflow"></a>

```typescript
public readonly workflow: Workflow;
```

- *Type:* <a href="#projen.gitlab.Workflow">Workflow</a>

Used to control pipeline behavior.

---

##### `parent`<sup>Required</sup> <a name="parent" id="projen.gitlab.NestedConfiguration.property.parent"></a>

```typescript
public readonly parent: GitlabConfiguration;
```

- *Type:* <a href="#projen.gitlab.GitlabConfiguration">GitlabConfiguration</a>

---


## Structs <a name="Structs" id="Structs"></a>

### AllowFailure <a name="AllowFailure" id="projen.gitlab.AllowFailure"></a>

Exit code that are not considered failure.

The job fails for any other exit code.
You can list which exit codes are not considered failures. The job fails for any other
exit code.

> [https://docs.gitlab.com/ee/ci/yaml/#allow_failure](https://docs.gitlab.com/ee/ci/yaml/#allow_failure)

#### Initializer <a name="Initializer" id="projen.gitlab.AllowFailure.Initializer"></a>

```typescript
import { gitlab } from 'projen'

const allowFailure: gitlab.AllowFailure = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.gitlab.AllowFailure.property.exitCodes">exitCodes</a></code> | <code>number \| number[]</code> | *No description.* |

---

##### `exitCodes`<sup>Required</sup> <a name="exitCodes" id="projen.gitlab.AllowFailure.property.exitCodes"></a>

```typescript
public readonly exitCodes: number | number[];
```

- *Type:* number | number[]

---

### Artifacts <a name="Artifacts" id="projen.gitlab.Artifacts"></a>

Used to specify a list of files and directories that should be attached to the job if it succeeds.

Artifacts are sent to Gitlab where they can be downloaded.

> [https://docs.gitlab.com/ee/ci/yaml/#artifacts](https://docs.gitlab.com/ee/ci/yaml/#artifacts)

#### Initializer <a name="Initializer" id="projen.gitlab.Artifacts.Initializer"></a>

```typescript
import { gitlab } from 'projen'

const artifacts: gitlab.Artifacts = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.gitlab.Artifacts.property.exclude">exclude</a></code> | <code>string[]</code> | A list of paths to files/folders that should be excluded in the artifact. |
| <code><a href="#projen.gitlab.Artifacts.property.expireIn">expireIn</a></code> | <code>string</code> | How long artifacts should be kept. |
| <code><a href="#projen.gitlab.Artifacts.property.exposeAs">exposeAs</a></code> | <code>string</code> | Can be used to expose job artifacts in the merge request UI. |
| <code><a href="#projen.gitlab.Artifacts.property.name">name</a></code> | <code>string</code> | Name for the archive created on job success. |
| <code><a href="#projen.gitlab.Artifacts.property.paths">paths</a></code> | <code>string[]</code> | A list of paths to files/folders that should be included in the artifact. |
| <code><a href="#projen.gitlab.Artifacts.property.reports">reports</a></code> | <code><a href="#projen.gitlab.Reports">Reports</a></code> | Reports will be uploaded as artifacts, and often displayed in the Gitlab UI, such as in Merge Requests. |
| <code><a href="#projen.gitlab.Artifacts.property.untracked">untracked</a></code> | <code>boolean</code> | Whether to add all untracked files (along with 'artifacts.paths') to the artifact. |
| <code><a href="#projen.gitlab.Artifacts.property.when">when</a></code> | <code><a href="#projen.gitlab.CacheWhen">CacheWhen</a></code> | Configure when artifacts are uploaded depended on job status. |

---

##### `exclude`<sup>Optional</sup> <a name="exclude" id="projen.gitlab.Artifacts.property.exclude"></a>

```typescript
public readonly exclude: string[];
```

- *Type:* string[]

A list of paths to files/folders that should be excluded in the artifact.

---

##### `expireIn`<sup>Optional</sup> <a name="expireIn" id="projen.gitlab.Artifacts.property.expireIn"></a>

```typescript
public readonly expireIn: string;
```

- *Type:* string

How long artifacts should be kept.

They are saved 30 days by default. Artifacts that have expired are removed periodically via cron job. Supports a wide variety of formats, e.g. '1 week', '3 mins 4 sec', '2 hrs 20 min', '2h20min', '6 mos 1 day', '47 yrs 6 mos and 4d', '3 weeks and 2 days'.

---

##### `exposeAs`<sup>Optional</sup> <a name="exposeAs" id="projen.gitlab.Artifacts.property.exposeAs"></a>

```typescript
public readonly exposeAs: string;
```

- *Type:* string

Can be used to expose job artifacts in the merge request UI.

GitLab will add a link <expose_as> to the relevant merge request that points to the artifact.

---

##### `name`<sup>Optional</sup> <a name="name" id="projen.gitlab.Artifacts.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

Name for the archive created on job success.

Can use variables in the name, e.g. '$CI_JOB_NAME'

---

##### `paths`<sup>Optional</sup> <a name="paths" id="projen.gitlab.Artifacts.property.paths"></a>

```typescript
public readonly paths: string[];
```

- *Type:* string[]

A list of paths to files/folders that should be included in the artifact.

---

##### `reports`<sup>Optional</sup> <a name="reports" id="projen.gitlab.Artifacts.property.reports"></a>

```typescript
public readonly reports: Reports;
```

- *Type:* <a href="#projen.gitlab.Reports">Reports</a>

Reports will be uploaded as artifacts, and often displayed in the Gitlab UI, such as in Merge Requests.

---

##### `untracked`<sup>Optional</sup> <a name="untracked" id="projen.gitlab.Artifacts.property.untracked"></a>

```typescript
public readonly untracked: boolean;
```

- *Type:* boolean

Whether to add all untracked files (along with 'artifacts.paths') to the artifact.

---

##### `when`<sup>Optional</sup> <a name="when" id="projen.gitlab.Artifacts.property.when"></a>

```typescript
public readonly when: CacheWhen;
```

- *Type:* <a href="#projen.gitlab.CacheWhen">CacheWhen</a>

Configure when artifacts are uploaded depended on job status.

---

### Assets <a name="Assets" id="projen.gitlab.Assets"></a>

Asset configuration for a release.

#### Initializer <a name="Initializer" id="projen.gitlab.Assets.Initializer"></a>

```typescript
import { gitlab } from 'projen'

const assets: gitlab.Assets = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.gitlab.Assets.property.links">links</a></code> | <code><a href="#projen.gitlab.Link">Link</a>[]</code> | Include asset links in the release. |

---

##### `links`<sup>Required</sup> <a name="links" id="projen.gitlab.Assets.property.links"></a>

```typescript
public readonly links: Link[];
```

- *Type:* <a href="#projen.gitlab.Link">Link</a>[]

Include asset links in the release.

---

### Cache <a name="Cache" id="projen.gitlab.Cache"></a>

Cache Definition.

> [https://docs.gitlab.com/ee/ci/yaml/#cache](https://docs.gitlab.com/ee/ci/yaml/#cache)

#### Initializer <a name="Initializer" id="projen.gitlab.Cache.Initializer"></a>

```typescript
import { gitlab } from 'projen'

const cache: gitlab.Cache = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.gitlab.Cache.property.fallbackKeys">fallbackKeys</a></code> | <code>string[]</code> | Use cache:fallback_keys to specify a list of keys to try to restore cache from if there is no cache found for the cache:key. |
| <code><a href="#projen.gitlab.Cache.property.key">key</a></code> | <code>string \| <a href="#projen.gitlab.CacheKeyFiles">CacheKeyFiles</a></code> | Used the to give each cache a unique identifying key. |
| <code><a href="#projen.gitlab.Cache.property.paths">paths</a></code> | <code>string[]</code> | Defines which files or directories to cache. |
| <code><a href="#projen.gitlab.Cache.property.policy">policy</a></code> | <code><a href="#projen.gitlab.CachePolicy">CachePolicy</a></code> | Defines the upload and download behaviour of the cache. |
| <code><a href="#projen.gitlab.Cache.property.untracked">untracked</a></code> | <code>boolean</code> | If set to true all files that are untracked in your Git repository will be cached. |
| <code><a href="#projen.gitlab.Cache.property.when">when</a></code> | <code><a href="#projen.gitlab.CacheWhen">CacheWhen</a></code> | Defines when to save the cache, based on the status of the job (Default: Job Success). |

---

##### `fallbackKeys`<sup>Optional</sup> <a name="fallbackKeys" id="projen.gitlab.Cache.property.fallbackKeys"></a>

```typescript
public readonly fallbackKeys: string[];
```

- *Type:* string[]

Use cache:fallback_keys to specify a list of keys to try to restore cache from if there is no cache found for the cache:key.

Caches are retrieved in the order specified in the fallback_keys section.

---

##### `key`<sup>Optional</sup> <a name="key" id="projen.gitlab.Cache.property.key"></a>

```typescript
public readonly key: string | CacheKeyFiles;
```

- *Type:* string | <a href="#projen.gitlab.CacheKeyFiles">CacheKeyFiles</a>

Used the to give each cache a unique identifying key.

All jobs that use the same cache key use the same cache.

---

##### `paths`<sup>Optional</sup> <a name="paths" id="projen.gitlab.Cache.property.paths"></a>

```typescript
public readonly paths: string[];
```

- *Type:* string[]

Defines which files or directories to cache.

---

##### `policy`<sup>Optional</sup> <a name="policy" id="projen.gitlab.Cache.property.policy"></a>

```typescript
public readonly policy: CachePolicy;
```

- *Type:* <a href="#projen.gitlab.CachePolicy">CachePolicy</a>

Defines the upload and download behaviour of the cache.

---

##### `untracked`<sup>Optional</sup> <a name="untracked" id="projen.gitlab.Cache.property.untracked"></a>

```typescript
public readonly untracked: boolean;
```

- *Type:* boolean

If set to true all files that are untracked in your Git repository will be cached.

---

##### `when`<sup>Optional</sup> <a name="when" id="projen.gitlab.Cache.property.when"></a>

```typescript
public readonly when: CacheWhen;
```

- *Type:* <a href="#projen.gitlab.CacheWhen">CacheWhen</a>

Defines when to save the cache, based on the status of the job (Default: Job Success).

---

### CacheKeyFiles <a name="CacheKeyFiles" id="projen.gitlab.CacheKeyFiles"></a>

Use this construct to generate a new key when one or two specific files change.

> [https://docs.gitlab.com/ee/ci/yaml/#cachekeyfiles](https://docs.gitlab.com/ee/ci/yaml/#cachekeyfiles)

#### Initializer <a name="Initializer" id="projen.gitlab.CacheKeyFiles.Initializer"></a>

```typescript
import { gitlab } from 'projen'

const cacheKeyFiles: gitlab.CacheKeyFiles = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.gitlab.CacheKeyFiles.property.files">files</a></code> | <code>string[]</code> | The files that are checked against. |
| <code><a href="#projen.gitlab.CacheKeyFiles.property.prefix">prefix</a></code> | <code>string</code> | Adds a custom prefix to the checksums computed. |

---

##### `files`<sup>Required</sup> <a name="files" id="projen.gitlab.CacheKeyFiles.property.files"></a>

```typescript
public readonly files: string[];
```

- *Type:* string[]

The files that are checked against.

If the SHA checksum changes, the cache becomes invalid.

---

##### `prefix`<sup>Optional</sup> <a name="prefix" id="projen.gitlab.CacheKeyFiles.property.prefix"></a>

```typescript
public readonly prefix: string;
```

- *Type:* string

Adds a custom prefix to the checksums computed.

---

### CiConfigurationOptions <a name="CiConfigurationOptions" id="projen.gitlab.CiConfigurationOptions"></a>

Options for `CiConfiguration`.

#### Initializer <a name="Initializer" id="projen.gitlab.CiConfigurationOptions.Initializer"></a>

```typescript
import { gitlab } from 'projen'

const ciConfigurationOptions: gitlab.CiConfigurationOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.gitlab.CiConfigurationOptions.property.default">default</a></code> | <code><a href="#projen.gitlab.Default">Default</a></code> | Default settings for the CI Configuration. |
| <code><a href="#projen.gitlab.CiConfigurationOptions.property.jobs">jobs</a></code> | <code>{[ key: string ]: <a href="#projen.gitlab.Job">Job</a>}</code> | An initial set of jobs to add to the configuration. |
| <code><a href="#projen.gitlab.CiConfigurationOptions.property.pages">pages</a></code> | <code><a href="#projen.gitlab.Job">Job</a></code> | A special job used to upload static sites to Gitlab pages. |
| <code><a href="#projen.gitlab.CiConfigurationOptions.property.path">path</a></code> | <code>string</code> | The path of the file to generate. |
| <code><a href="#projen.gitlab.CiConfigurationOptions.property.stages">stages</a></code> | <code>string[]</code> | Groups jobs into stages. |
| <code><a href="#projen.gitlab.CiConfigurationOptions.property.variables">variables</a></code> | <code>{[ key: string ]: any}</code> | Global variables that are passed to jobs. |
| <code><a href="#projen.gitlab.CiConfigurationOptions.property.workflow">workflow</a></code> | <code><a href="#projen.gitlab.Workflow">Workflow</a></code> | Used to control pipeline behavior. |

---

##### `default`<sup>Optional</sup> <a name="default" id="projen.gitlab.CiConfigurationOptions.property.default"></a>

```typescript
public readonly default: Default;
```

- *Type:* <a href="#projen.gitlab.Default">Default</a>

Default settings for the CI Configuration.

Jobs that do not define one or more of the listed keywords use the value defined in the default section.

---

##### `jobs`<sup>Optional</sup> <a name="jobs" id="projen.gitlab.CiConfigurationOptions.property.jobs"></a>

```typescript
public readonly jobs: {[ key: string ]: Job};
```

- *Type:* {[ key: string ]: <a href="#projen.gitlab.Job">Job</a>}

An initial set of jobs to add to the configuration.

---

##### `pages`<sup>Optional</sup> <a name="pages" id="projen.gitlab.CiConfigurationOptions.property.pages"></a>

```typescript
public readonly pages: Job;
```

- *Type:* <a href="#projen.gitlab.Job">Job</a>

A special job used to upload static sites to Gitlab pages.

Requires a `public/` directory
with `artifacts.path` pointing to it.

---

##### `path`<sup>Optional</sup> <a name="path" id="projen.gitlab.CiConfigurationOptions.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* string

The path of the file to generate.

---

##### `stages`<sup>Optional</sup> <a name="stages" id="projen.gitlab.CiConfigurationOptions.property.stages"></a>

```typescript
public readonly stages: string[];
```

- *Type:* string[]

Groups jobs into stages.

All jobs in one stage must complete before next stage is
executed. If no stages are specified. Defaults to ['build', 'test', 'deploy'].

---

##### `variables`<sup>Optional</sup> <a name="variables" id="projen.gitlab.CiConfigurationOptions.property.variables"></a>

```typescript
public readonly variables: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

Global variables that are passed to jobs.

If the job already has that variable defined, the job-level variable takes precedence.

---

##### `workflow`<sup>Optional</sup> <a name="workflow" id="projen.gitlab.CiConfigurationOptions.property.workflow"></a>

```typescript
public readonly workflow: Workflow;
```

- *Type:* <a href="#projen.gitlab.Workflow">Workflow</a>

Used to control pipeline behavior.

---

### CoverageReport <a name="CoverageReport" id="projen.gitlab.CoverageReport"></a>

Code coverage report interface.

> [https://docs.gitlab.com/ee/ci/yaml/artifacts_reports.html#artifactsreportscoverage_report](https://docs.gitlab.com/ee/ci/yaml/artifacts_reports.html#artifactsreportscoverage_report)

#### Initializer <a name="Initializer" id="projen.gitlab.CoverageReport.Initializer"></a>

```typescript
import { gitlab } from 'projen'

const coverageReport: gitlab.CoverageReport = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.gitlab.CoverageReport.property.coverageFormat">coverageFormat</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.gitlab.CoverageReport.property.path">path</a></code> | <code>string</code> | *No description.* |

---

##### `coverageFormat`<sup>Required</sup> <a name="coverageFormat" id="projen.gitlab.CoverageReport.property.coverageFormat"></a>

```typescript
public readonly coverageFormat: string;
```

- *Type:* string

---

##### `path`<sup>Required</sup> <a name="path" id="projen.gitlab.CoverageReport.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* string

---

### Default <a name="Default" id="projen.gitlab.Default"></a>

Default settings for the CI Configuration.

Jobs that do not define one or more of the listed keywords use the value defined in the default section.

> [https://docs.gitlab.com/ee/ci/yaml/#default](https://docs.gitlab.com/ee/ci/yaml/#default)

#### Initializer <a name="Initializer" id="projen.gitlab.Default.Initializer"></a>

```typescript
import { gitlab } from 'projen'

const default: gitlab.Default = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.gitlab.Default.property.afterScript">afterScript</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen.gitlab.Default.property.artifacts">artifacts</a></code> | <code><a href="#projen.gitlab.Artifacts">Artifacts</a></code> | *No description.* |
| <code><a href="#projen.gitlab.Default.property.beforeScript">beforeScript</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen.gitlab.Default.property.cache">cache</a></code> | <code><a href="#projen.gitlab.Cache">Cache</a>[]</code> | *No description.* |
| <code><a href="#projen.gitlab.Default.property.hooks">hooks</a></code> | <code><a href="#projen.gitlab.DefaultHooks">DefaultHooks</a></code> | *No description.* |
| <code><a href="#projen.gitlab.Default.property.idTokens">idTokens</a></code> | <code>{[ key: string ]: <a href="#projen.gitlab.IDToken">IDToken</a>}</code> | Specifies the default ID tokens (JSON Web Tokens) that are used for CI/CD authentication to use globally for all jobs. |
| <code><a href="#projen.gitlab.Default.property.image">image</a></code> | <code><a href="#projen.gitlab.Image">Image</a></code> | *No description.* |
| <code><a href="#projen.gitlab.Default.property.interruptible">interruptible</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#projen.gitlab.Default.property.retry">retry</a></code> | <code><a href="#projen.gitlab.Retry">Retry</a></code> | *No description.* |
| <code><a href="#projen.gitlab.Default.property.services">services</a></code> | <code><a href="#projen.gitlab.Service">Service</a>[]</code> | *No description.* |
| <code><a href="#projen.gitlab.Default.property.tags">tags</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen.gitlab.Default.property.timeout">timeout</a></code> | <code>string</code> | *No description.* |

---

##### `afterScript`<sup>Optional</sup> <a name="afterScript" id="projen.gitlab.Default.property.afterScript"></a>

```typescript
public readonly afterScript: string[];
```

- *Type:* string[]

---

##### `artifacts`<sup>Optional</sup> <a name="artifacts" id="projen.gitlab.Default.property.artifacts"></a>

```typescript
public readonly artifacts: Artifacts;
```

- *Type:* <a href="#projen.gitlab.Artifacts">Artifacts</a>

---

##### `beforeScript`<sup>Optional</sup> <a name="beforeScript" id="projen.gitlab.Default.property.beforeScript"></a>

```typescript
public readonly beforeScript: string[];
```

- *Type:* string[]

---

##### `cache`<sup>Optional</sup> <a name="cache" id="projen.gitlab.Default.property.cache"></a>

```typescript
public readonly cache: Cache[];
```

- *Type:* <a href="#projen.gitlab.Cache">Cache</a>[]

---

##### `hooks`<sup>Optional</sup> <a name="hooks" id="projen.gitlab.Default.property.hooks"></a>

```typescript
public readonly hooks: DefaultHooks;
```

- *Type:* <a href="#projen.gitlab.DefaultHooks">DefaultHooks</a>

---

##### `idTokens`<sup>Optional</sup> <a name="idTokens" id="projen.gitlab.Default.property.idTokens"></a>

```typescript
public readonly idTokens: {[ key: string ]: IDToken};
```

- *Type:* {[ key: string ]: <a href="#projen.gitlab.IDToken">IDToken</a>}

Specifies the default ID tokens (JSON Web Tokens) that are used for CI/CD authentication to use globally for all jobs.

---

##### `image`<sup>Optional</sup> <a name="image" id="projen.gitlab.Default.property.image"></a>

```typescript
public readonly image: Image;
```

- *Type:* <a href="#projen.gitlab.Image">Image</a>

---

##### `interruptible`<sup>Optional</sup> <a name="interruptible" id="projen.gitlab.Default.property.interruptible"></a>

```typescript
public readonly interruptible: boolean;
```

- *Type:* boolean

---

##### `retry`<sup>Optional</sup> <a name="retry" id="projen.gitlab.Default.property.retry"></a>

```typescript
public readonly retry: Retry;
```

- *Type:* <a href="#projen.gitlab.Retry">Retry</a>

---

##### `services`<sup>Optional</sup> <a name="services" id="projen.gitlab.Default.property.services"></a>

```typescript
public readonly services: Service[];
```

- *Type:* <a href="#projen.gitlab.Service">Service</a>[]

---

##### `tags`<sup>Optional</sup> <a name="tags" id="projen.gitlab.Default.property.tags"></a>

```typescript
public readonly tags: string[];
```

- *Type:* string[]

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="projen.gitlab.Default.property.timeout"></a>

```typescript
public readonly timeout: string;
```

- *Type:* string

---

### DefaultHooks <a name="DefaultHooks" id="projen.gitlab.DefaultHooks"></a>

#### Initializer <a name="Initializer" id="projen.gitlab.DefaultHooks.Initializer"></a>

```typescript
import { gitlab } from 'projen'

const defaultHooks: gitlab.DefaultHooks = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.gitlab.DefaultHooks.property.preGetSourcesScript">preGetSourcesScript</a></code> | <code>string[]</code> | Specify a list of commands to execute on the runner before cloning the Git repository and any submodules https://docs.gitlab.com/ci/yaml/#hookspre_get_sources_script. |

---

##### `preGetSourcesScript`<sup>Optional</sup> <a name="preGetSourcesScript" id="projen.gitlab.DefaultHooks.property.preGetSourcesScript"></a>

```typescript
public readonly preGetSourcesScript: string[];
```

- *Type:* string[]

Specify a list of commands to execute on the runner before cloning the Git repository and any submodules https://docs.gitlab.com/ci/yaml/#hookspre_get_sources_script.

---

### Engine <a name="Engine" id="projen.gitlab.Engine"></a>

The engine configuration for a secret.

#### Initializer <a name="Initializer" id="projen.gitlab.Engine.Initializer"></a>

```typescript
import { gitlab } from 'projen'

const engine: gitlab.Engine = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.gitlab.Engine.property.name">name</a></code> | <code>string</code> | Name of the secrets engine. |
| <code><a href="#projen.gitlab.Engine.property.path">path</a></code> | <code>string</code> | Path to the secrets engine. |

---

##### `name`<sup>Required</sup> <a name="name" id="projen.gitlab.Engine.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

Name of the secrets engine.

---

##### `path`<sup>Required</sup> <a name="path" id="projen.gitlab.Engine.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* string

Path to the secrets engine.

---

### Environment <a name="Environment" id="projen.gitlab.Environment"></a>

The environment that a job deploys to.

#### Initializer <a name="Initializer" id="projen.gitlab.Environment.Initializer"></a>

```typescript
import { gitlab } from 'projen'

const environment: gitlab.Environment = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.gitlab.Environment.property.name">name</a></code> | <code>string</code> | The name of the environment, e.g. 'qa', 'staging', 'production'. |
| <code><a href="#projen.gitlab.Environment.property.action">action</a></code> | <code><a href="#projen.gitlab.Action">Action</a></code> | Specifies what this job will do. |
| <code><a href="#projen.gitlab.Environment.property.autoStopIn">autoStopIn</a></code> | <code>string</code> | The amount of time it should take before Gitlab will automatically stop the environment. |
| <code><a href="#projen.gitlab.Environment.property.deploymentTier">deploymentTier</a></code> | <code><a href="#projen.gitlab.DeploymentTier">DeploymentTier</a></code> | Explicitly specifies the tier of the deployment environment if non-standard environment name is used. |
| <code><a href="#projen.gitlab.Environment.property.kubernetes">kubernetes</a></code> | <code><a href="#projen.gitlab.KubernetesConfig">KubernetesConfig</a></code> | Used to configure the kubernetes deployment for this environment. |
| <code><a href="#projen.gitlab.Environment.property.onStop">onStop</a></code> | <code>string</code> | The name of a job to execute when the environment is about to be stopped. |
| <code><a href="#projen.gitlab.Environment.property.url">url</a></code> | <code>string</code> | When set, this will expose buttons in various places for the current environment in Gitlab, that will take you to the defined URL. |

---

##### `name`<sup>Required</sup> <a name="name" id="projen.gitlab.Environment.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the environment, e.g. 'qa', 'staging', 'production'.

---

##### `action`<sup>Optional</sup> <a name="action" id="projen.gitlab.Environment.property.action"></a>

```typescript
public readonly action: Action;
```

- *Type:* <a href="#projen.gitlab.Action">Action</a>

Specifies what this job will do.

'start' (default) indicates the job will start the deployment. 'prepare' indicates this will not affect the deployment. 'stop' indicates this will stop the deployment.

---

##### `autoStopIn`<sup>Optional</sup> <a name="autoStopIn" id="projen.gitlab.Environment.property.autoStopIn"></a>

```typescript
public readonly autoStopIn: string;
```

- *Type:* string

The amount of time it should take before Gitlab will automatically stop the environment.

Supports a wide variety of formats, e.g. '1 week', '3 mins 4 sec', '2 hrs 20 min', '2h20min', '6 mos 1 day', '47 yrs 6 mos and 4d', '3 weeks and 2 days'.

---

##### `deploymentTier`<sup>Optional</sup> <a name="deploymentTier" id="projen.gitlab.Environment.property.deploymentTier"></a>

```typescript
public readonly deploymentTier: DeploymentTier;
```

- *Type:* <a href="#projen.gitlab.DeploymentTier">DeploymentTier</a>

Explicitly specifies the tier of the deployment environment if non-standard environment name is used.

---

##### `kubernetes`<sup>Optional</sup> <a name="kubernetes" id="projen.gitlab.Environment.property.kubernetes"></a>

```typescript
public readonly kubernetes: KubernetesConfig;
```

- *Type:* <a href="#projen.gitlab.KubernetesConfig">KubernetesConfig</a>

Used to configure the kubernetes deployment for this environment.

This is currently not supported for kubernetes clusters that are managed by Gitlab.

---

##### `onStop`<sup>Optional</sup> <a name="onStop" id="projen.gitlab.Environment.property.onStop"></a>

```typescript
public readonly onStop: string;
```

- *Type:* string

The name of a job to execute when the environment is about to be stopped.

---

##### `url`<sup>Optional</sup> <a name="url" id="projen.gitlab.Environment.property.url"></a>

```typescript
public readonly url: string;
```

- *Type:* string

When set, this will expose buttons in various places for the current environment in Gitlab, that will take you to the defined URL.

---

### Filter <a name="Filter" id="projen.gitlab.Filter"></a>

Filtering options for when a job will run.

#### Initializer <a name="Initializer" id="projen.gitlab.Filter.Initializer"></a>

```typescript
import { gitlab } from 'projen'

const filter: gitlab.Filter = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.gitlab.Filter.property.changes">changes</a></code> | <code>string[]</code> | Filter job creation based on files that were modified in a git push. |
| <code><a href="#projen.gitlab.Filter.property.kubernetes">kubernetes</a></code> | <code><a href="#projen.gitlab.KubernetesEnum">KubernetesEnum</a></code> | Filter job based on if Kubernetes integration is active. |
| <code><a href="#projen.gitlab.Filter.property.refs">refs</a></code> | <code>string[]</code> | Control when to add jobs to a pipeline based on branch names or pipeline types. |
| <code><a href="#projen.gitlab.Filter.property.variables">variables</a></code> | <code>string[]</code> | Filter job by checking comparing values of environment variables. |

---

##### `changes`<sup>Optional</sup> <a name="changes" id="projen.gitlab.Filter.property.changes"></a>

```typescript
public readonly changes: string[];
```

- *Type:* string[]

Filter job creation based on files that were modified in a git push.

---

##### `kubernetes`<sup>Optional</sup> <a name="kubernetes" id="projen.gitlab.Filter.property.kubernetes"></a>

```typescript
public readonly kubernetes: KubernetesEnum;
```

- *Type:* <a href="#projen.gitlab.KubernetesEnum">KubernetesEnum</a>

Filter job based on if Kubernetes integration is active.

---

##### `refs`<sup>Optional</sup> <a name="refs" id="projen.gitlab.Filter.property.refs"></a>

```typescript
public readonly refs: string[];
```

- *Type:* string[]

Control when to add jobs to a pipeline based on branch names or pipeline types.

---

##### `variables`<sup>Optional</sup> <a name="variables" id="projen.gitlab.Filter.property.variables"></a>

```typescript
public readonly variables: string[];
```

- *Type:* string[]

Filter job by checking comparing values of environment variables.

Read more about variable expressions: https://docs.gitlab.com/ee/ci/variables/README.html#variables-expressions

---

### Image <a name="Image" id="projen.gitlab.Image"></a>

Specifies the docker image to use for the job or globally for all jobs.

Job configuration
takes precedence over global setting. Requires a certain kind of Gitlab runner executor.

> [https://docs.gitlab.com/ee/ci/yaml/#image](https://docs.gitlab.com/ee/ci/yaml/#image)

#### Initializer <a name="Initializer" id="projen.gitlab.Image.Initializer"></a>

```typescript
import { gitlab } from 'projen'

const image: gitlab.Image = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.gitlab.Image.property.name">name</a></code> | <code>string</code> | Full name of the image that should be used. |
| <code><a href="#projen.gitlab.Image.property.entrypoint">entrypoint</a></code> | <code>any[]</code> | Command or script that should be executed as the container's entrypoint. |

---

##### `name`<sup>Required</sup> <a name="name" id="projen.gitlab.Image.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

Full name of the image that should be used.

It should contain the Registry part if needed.

---

##### `entrypoint`<sup>Optional</sup> <a name="entrypoint" id="projen.gitlab.Image.property.entrypoint"></a>

```typescript
public readonly entrypoint: any[];
```

- *Type:* any[]

Command or script that should be executed as the container's entrypoint.

It will be translated to Docker's --entrypoint option while creating the container. The syntax is similar to Dockerfile's ENTRYPOINT directive, where each shell token is a separate string in the array.

---

### Include <a name="Include" id="projen.gitlab.Include"></a>

An included YAML file.

> [https://docs.gitlab.com/ee/ci/yaml/#include](https://docs.gitlab.com/ee/ci/yaml/#include)

#### Initializer <a name="Initializer" id="projen.gitlab.Include.Initializer"></a>

```typescript
import { gitlab } from 'projen'

const include: gitlab.Include = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.gitlab.Include.property.file">file</a></code> | <code>string[]</code> | Files from another private project on the same GitLab instance. |
| <code><a href="#projen.gitlab.Include.property.local">local</a></code> | <code>string</code> | Relative path from local repository root (`/`) to the `yaml`/`yml` file template. |
| <code><a href="#projen.gitlab.Include.property.project">project</a></code> | <code>string</code> | Path to the project, e.g. `group/project`, or `group/sub-group/project`. |
| <code><a href="#projen.gitlab.Include.property.ref">ref</a></code> | <code>string</code> | Branch/Tag/Commit-hash for the target project. |
| <code><a href="#projen.gitlab.Include.property.remote">remote</a></code> | <code>string</code> | URL to a `yaml`/`yml` template file using HTTP/HTTPS. |
| <code><a href="#projen.gitlab.Include.property.rules">rules</a></code> | <code><a href="#projen.gitlab.IncludeRule">IncludeRule</a>[]</code> | Rules allows for an array of individual rule objects to be evaluated in order, until one matches and dynamically provides attributes to the job. |
| <code><a href="#projen.gitlab.Include.property.template">template</a></code> | <code>string</code> | Use a `.gitlab-ci.yml` template as a base, e.g. `Nodejs.gitlab-ci.yml`. |

---

##### `file`<sup>Optional</sup> <a name="file" id="projen.gitlab.Include.property.file"></a>

```typescript
public readonly file: string[];
```

- *Type:* string[]

Files from another private project on the same GitLab instance.

You can use `file` in combination with `project` only.

---

##### `local`<sup>Optional</sup> <a name="local" id="projen.gitlab.Include.property.local"></a>

```typescript
public readonly local: string;
```

- *Type:* string

Relative path from local repository root (`/`) to the `yaml`/`yml` file template.

The file must be on the same branch, and does not work across git submodules.

---

##### `project`<sup>Optional</sup> <a name="project" id="projen.gitlab.Include.property.project"></a>

```typescript
public readonly project: string;
```

- *Type:* string

Path to the project, e.g. `group/project`, or `group/sub-group/project`.

---

##### `ref`<sup>Optional</sup> <a name="ref" id="projen.gitlab.Include.property.ref"></a>

```typescript
public readonly ref: string;
```

- *Type:* string

Branch/Tag/Commit-hash for the target project.

---

##### `remote`<sup>Optional</sup> <a name="remote" id="projen.gitlab.Include.property.remote"></a>

```typescript
public readonly remote: string;
```

- *Type:* string

URL to a `yaml`/`yml` template file using HTTP/HTTPS.

---

##### `rules`<sup>Optional</sup> <a name="rules" id="projen.gitlab.Include.property.rules"></a>

```typescript
public readonly rules: IncludeRule[];
```

- *Type:* <a href="#projen.gitlab.IncludeRule">IncludeRule</a>[]

Rules allows for an array of individual rule objects to be evaluated in order, until one matches and dynamically provides attributes to the job.

---

##### `template`<sup>Optional</sup> <a name="template" id="projen.gitlab.Include.property.template"></a>

```typescript
public readonly template: string;
```

- *Type:* string

Use a `.gitlab-ci.yml` template as a base, e.g. `Nodejs.gitlab-ci.yml`.

---

### IncludeRule <a name="IncludeRule" id="projen.gitlab.IncludeRule"></a>

Rules allows for an array of individual rule objects to be evaluated in order, until one matches and dynamically provides attributes to the job.

> [https://docs.gitlab.com/ee/ci/yaml/includes.html#use-rules-with-include](https://docs.gitlab.com/ee/ci/yaml/includes.html#use-rules-with-include)

#### Initializer <a name="Initializer" id="projen.gitlab.IncludeRule.Initializer"></a>

```typescript
import { gitlab } from 'projen'

const includeRule: gitlab.IncludeRule = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.gitlab.IncludeRule.property.allowFailure">allowFailure</a></code> | <code>boolean \| <a href="#projen.gitlab.AllowFailure">AllowFailure</a></code> | *No description.* |
| <code><a href="#projen.gitlab.IncludeRule.property.changes">changes</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen.gitlab.IncludeRule.property.exists">exists</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen.gitlab.IncludeRule.property.if">if</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.gitlab.IncludeRule.property.needs">needs</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen.gitlab.IncludeRule.property.startIn">startIn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.gitlab.IncludeRule.property.variables">variables</a></code> | <code>{[ key: string ]: string}</code> | *No description.* |
| <code><a href="#projen.gitlab.IncludeRule.property.when">when</a></code> | <code><a href="#projen.gitlab.JobWhen">JobWhen</a></code> | *No description.* |

---

##### `allowFailure`<sup>Optional</sup> <a name="allowFailure" id="projen.gitlab.IncludeRule.property.allowFailure"></a>

```typescript
public readonly allowFailure: boolean | AllowFailure;
```

- *Type:* boolean | <a href="#projen.gitlab.AllowFailure">AllowFailure</a>

---

##### `changes`<sup>Optional</sup> <a name="changes" id="projen.gitlab.IncludeRule.property.changes"></a>

```typescript
public readonly changes: string[];
```

- *Type:* string[]

---

##### `exists`<sup>Optional</sup> <a name="exists" id="projen.gitlab.IncludeRule.property.exists"></a>

```typescript
public readonly exists: string[];
```

- *Type:* string[]

---

##### `if`<sup>Optional</sup> <a name="if" id="projen.gitlab.IncludeRule.property.if"></a>

```typescript
public readonly if: string;
```

- *Type:* string

---

##### `needs`<sup>Optional</sup> <a name="needs" id="projen.gitlab.IncludeRule.property.needs"></a>

```typescript
public readonly needs: string[];
```

- *Type:* string[]

---

##### `startIn`<sup>Optional</sup> <a name="startIn" id="projen.gitlab.IncludeRule.property.startIn"></a>

```typescript
public readonly startIn: string;
```

- *Type:* string

---

##### `variables`<sup>Optional</sup> <a name="variables" id="projen.gitlab.IncludeRule.property.variables"></a>

```typescript
public readonly variables: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

---

##### `when`<sup>Optional</sup> <a name="when" id="projen.gitlab.IncludeRule.property.when"></a>

```typescript
public readonly when: JobWhen;
```

- *Type:* <a href="#projen.gitlab.JobWhen">JobWhen</a>

---

### Inherit <a name="Inherit" id="projen.gitlab.Inherit"></a>

Controls inheritance of globally-defined defaults and variables.

Boolean values control
inheritance of all default: or variables: keywords. To inherit only a subset of default:
or variables: keywords, specify what you wish to inherit. Anything not listed is not
inherited.

#### Initializer <a name="Initializer" id="projen.gitlab.Inherit.Initializer"></a>

```typescript
import { gitlab } from 'projen'

const inherit: gitlab.Inherit = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.gitlab.Inherit.property.default">default</a></code> | <code>boolean \| <a href="#projen.gitlab.DefaultElement">DefaultElement</a>[]</code> | Whether to inherit all globally-defined defaults or not. |
| <code><a href="#projen.gitlab.Inherit.property.variables">variables</a></code> | <code>boolean \| string[]</code> | Whether to inherit all globally-defined variables or not. |

---

##### `default`<sup>Optional</sup> <a name="default" id="projen.gitlab.Inherit.property.default"></a>

```typescript
public readonly default: boolean | DefaultElement[];
```

- *Type:* boolean | <a href="#projen.gitlab.DefaultElement">DefaultElement</a>[]

Whether to inherit all globally-defined defaults or not.

Or subset of inherited defaults

---

##### `variables`<sup>Optional</sup> <a name="variables" id="projen.gitlab.Inherit.property.variables"></a>

```typescript
public readonly variables: boolean | string[];
```

- *Type:* boolean | string[]

Whether to inherit all globally-defined variables or not.

Or subset of inherited variables

---

### Job <a name="Job" id="projen.gitlab.Job"></a>

Jobs are the most fundamental element of a .gitlab-ci.yml file.

> [https://docs.gitlab.com/ee/ci/jobs/](https://docs.gitlab.com/ee/ci/jobs/)

#### Initializer <a name="Initializer" id="projen.gitlab.Job.Initializer"></a>

```typescript
import { gitlab } from 'projen'

const job: gitlab.Job = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.gitlab.Job.property.afterScript">afterScript</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen.gitlab.Job.property.allowFailure">allowFailure</a></code> | <code>boolean \| <a href="#projen.gitlab.AllowFailure">AllowFailure</a></code> | Whether to allow the pipeline to continue running on job failure (Default: false). |
| <code><a href="#projen.gitlab.Job.property.artifacts">artifacts</a></code> | <code><a href="#projen.gitlab.Artifacts">Artifacts</a></code> | *No description.* |
| <code><a href="#projen.gitlab.Job.property.beforeScript">beforeScript</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen.gitlab.Job.property.cache">cache</a></code> | <code><a href="#projen.gitlab.Cache">Cache</a>[]</code> | *No description.* |
| <code><a href="#projen.gitlab.Job.property.coverage">coverage</a></code> | <code>string</code> | Must be a regular expression, optionally but recommended to be quoted, and must be surrounded with '/'. |
| <code><a href="#projen.gitlab.Job.property.dependencies">dependencies</a></code> | <code>string[]</code> | Specify a list of job names from earlier stages from which artifacts should be loaded. |
| <code><a href="#projen.gitlab.Job.property.environment">environment</a></code> | <code>string \| <a href="#projen.gitlab.Environment">Environment</a></code> | Used to associate environment metadata with a deploy. |
| <code><a href="#projen.gitlab.Job.property.except">except</a></code> | <code>string[] \| <a href="#projen.gitlab.Filter">Filter</a></code> | Job will run *except* for when these filtering options match. |
| <code><a href="#projen.gitlab.Job.property.extends">extends</a></code> | <code>string[]</code> | The name of one or more jobs to inherit configuration from. |
| <code><a href="#projen.gitlab.Job.property.idTokens">idTokens</a></code> | <code>{[ key: string ]: <a href="#projen.gitlab.IDToken">IDToken</a>}</code> | Configurable ID tokens (JSON Web Tokens) that are used for CI/CD authentication. |
| <code><a href="#projen.gitlab.Job.property.image">image</a></code> | <code><a href="#projen.gitlab.Image">Image</a></code> | *No description.* |
| <code><a href="#projen.gitlab.Job.property.inherit">inherit</a></code> | <code><a href="#projen.gitlab.Inherit">Inherit</a></code> | Controls inheritance of globally-defined defaults and variables. |
| <code><a href="#projen.gitlab.Job.property.interruptible">interruptible</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#projen.gitlab.Job.property.needs">needs</a></code> | <code>string \| <a href="#projen.gitlab.Need">Need</a>[]</code> | The list of jobs in previous stages whose sole completion is needed to start the current job. |
| <code><a href="#projen.gitlab.Job.property.only">only</a></code> | <code>string[] \| <a href="#projen.gitlab.Filter">Filter</a></code> | Job will run *only* when these filtering options match. |
| <code><a href="#projen.gitlab.Job.property.parallel">parallel</a></code> | <code>number \| <a href="#projen.gitlab.Parallel">Parallel</a></code> | Parallel will split up a single job into several, and provide `CI_NODE_INDEX` and `CI_NODE_TOTAL` environment variables for the running jobs. |
| <code><a href="#projen.gitlab.Job.property.release">release</a></code> | <code><a href="#projen.gitlab.Release">Release</a></code> | Indicates that the job creates a Release. |
| <code><a href="#projen.gitlab.Job.property.resourceGroup">resourceGroup</a></code> | <code>string</code> | Limit job concurrency. |
| <code><a href="#projen.gitlab.Job.property.retry">retry</a></code> | <code><a href="#projen.gitlab.Retry">Retry</a></code> | *No description.* |
| <code><a href="#projen.gitlab.Job.property.rules">rules</a></code> | <code><a href="#projen.gitlab.IncludeRule">IncludeRule</a>[]</code> | Rules allows for an array of individual rule objects to be evaluated in order, until one matches and dynamically provides attributes to the job. |
| <code><a href="#projen.gitlab.Job.property.script">script</a></code> | <code>string[]</code> | Shell scripts executed by the Runner. |
| <code><a href="#projen.gitlab.Job.property.secrets">secrets</a></code> | <code>{[ key: string ]: {[ key: string ]: <a href="#projen.gitlab.Secret">Secret</a>}}</code> | CI/CD secrets. |
| <code><a href="#projen.gitlab.Job.property.services">services</a></code> | <code><a href="#projen.gitlab.Service">Service</a>[]</code> | *No description.* |
| <code><a href="#projen.gitlab.Job.property.stage">stage</a></code> | <code>string</code> | Define what stage the job will run in. |
| <code><a href="#projen.gitlab.Job.property.startIn">startIn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.gitlab.Job.property.tags">tags</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen.gitlab.Job.property.timeout">timeout</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.gitlab.Job.property.trigger">trigger</a></code> | <code>string \| <a href="#projen.gitlab.Trigger">Trigger</a></code> | Trigger allows you to define downstream pipeline trigger. |
| <code><a href="#projen.gitlab.Job.property.variables">variables</a></code> | <code>{[ key: string ]: string}</code> | Configurable values that are passed to the Job. |
| <code><a href="#projen.gitlab.Job.property.when">when</a></code> | <code><a href="#projen.gitlab.JobWhen">JobWhen</a></code> | Describes the conditions for when to run the job. |

---

##### `afterScript`<sup>Optional</sup> <a name="afterScript" id="projen.gitlab.Job.property.afterScript"></a>

```typescript
public readonly afterScript: string[];
```

- *Type:* string[]

---

##### `allowFailure`<sup>Optional</sup> <a name="allowFailure" id="projen.gitlab.Job.property.allowFailure"></a>

```typescript
public readonly allowFailure: boolean | AllowFailure;
```

- *Type:* boolean | <a href="#projen.gitlab.AllowFailure">AllowFailure</a>

Whether to allow the pipeline to continue running on job failure (Default: false).

---

##### `artifacts`<sup>Optional</sup> <a name="artifacts" id="projen.gitlab.Job.property.artifacts"></a>

```typescript
public readonly artifacts: Artifacts;
```

- *Type:* <a href="#projen.gitlab.Artifacts">Artifacts</a>

---

##### `beforeScript`<sup>Optional</sup> <a name="beforeScript" id="projen.gitlab.Job.property.beforeScript"></a>

```typescript
public readonly beforeScript: string[];
```

- *Type:* string[]

---

##### `cache`<sup>Optional</sup> <a name="cache" id="projen.gitlab.Job.property.cache"></a>

```typescript
public readonly cache: Cache[];
```

- *Type:* <a href="#projen.gitlab.Cache">Cache</a>[]

---

##### `coverage`<sup>Optional</sup> <a name="coverage" id="projen.gitlab.Job.property.coverage"></a>

```typescript
public readonly coverage: string;
```

- *Type:* string

Must be a regular expression, optionally but recommended to be quoted, and must be surrounded with '/'.

Example: '/Code coverage: \d+\.\d+/'

---

##### `dependencies`<sup>Optional</sup> <a name="dependencies" id="projen.gitlab.Job.property.dependencies"></a>

```typescript
public readonly dependencies: string[];
```

- *Type:* string[]

Specify a list of job names from earlier stages from which artifacts should be loaded.

By default, all previous artifacts are passed. Use an empty array to skip downloading artifacts.

---

##### `environment`<sup>Optional</sup> <a name="environment" id="projen.gitlab.Job.property.environment"></a>

```typescript
public readonly environment: string | Environment;
```

- *Type:* string | <a href="#projen.gitlab.Environment">Environment</a>

Used to associate environment metadata with a deploy.

Environment can have a name and URL attached to it, and will be displayed under /environments under the project.

---

##### `except`<sup>Optional</sup> <a name="except" id="projen.gitlab.Job.property.except"></a>

```typescript
public readonly except: string[] | Filter;
```

- *Type:* string[] | <a href="#projen.gitlab.Filter">Filter</a>

Job will run *except* for when these filtering options match.

---

##### `extends`<sup>Optional</sup> <a name="extends" id="projen.gitlab.Job.property.extends"></a>

```typescript
public readonly extends: string[];
```

- *Type:* string[]

The name of one or more jobs to inherit configuration from.

---

##### `idTokens`<sup>Optional</sup> <a name="idTokens" id="projen.gitlab.Job.property.idTokens"></a>

```typescript
public readonly idTokens: {[ key: string ]: IDToken};
```

- *Type:* {[ key: string ]: <a href="#projen.gitlab.IDToken">IDToken</a>}

Configurable ID tokens (JSON Web Tokens) that are used for CI/CD authentication.

---

##### `image`<sup>Optional</sup> <a name="image" id="projen.gitlab.Job.property.image"></a>

```typescript
public readonly image: Image;
```

- *Type:* <a href="#projen.gitlab.Image">Image</a>

---

##### `inherit`<sup>Optional</sup> <a name="inherit" id="projen.gitlab.Job.property.inherit"></a>

```typescript
public readonly inherit: Inherit;
```

- *Type:* <a href="#projen.gitlab.Inherit">Inherit</a>

Controls inheritance of globally-defined defaults and variables.

Boolean values control inheritance of all default: or variables: keywords. To inherit only a subset of default: or variables: keywords, specify what you wish to inherit. Anything not listed is not inherited.

---

##### `interruptible`<sup>Optional</sup> <a name="interruptible" id="projen.gitlab.Job.property.interruptible"></a>

```typescript
public readonly interruptible: boolean;
```

- *Type:* boolean

---

##### `needs`<sup>Optional</sup> <a name="needs" id="projen.gitlab.Job.property.needs"></a>

```typescript
public readonly needs: (string | Need)[];
```

- *Type:* string | <a href="#projen.gitlab.Need">Need</a>[]

The list of jobs in previous stages whose sole completion is needed to start the current job.

---

##### `only`<sup>Optional</sup> <a name="only" id="projen.gitlab.Job.property.only"></a>

```typescript
public readonly only: string[] | Filter;
```

- *Type:* string[] | <a href="#projen.gitlab.Filter">Filter</a>

Job will run *only* when these filtering options match.

---

##### `parallel`<sup>Optional</sup> <a name="parallel" id="projen.gitlab.Job.property.parallel"></a>

```typescript
public readonly parallel: number | Parallel;
```

- *Type:* number | <a href="#projen.gitlab.Parallel">Parallel</a>

Parallel will split up a single job into several, and provide `CI_NODE_INDEX` and `CI_NODE_TOTAL` environment variables for the running jobs.

---

##### `release`<sup>Optional</sup> <a name="release" id="projen.gitlab.Job.property.release"></a>

```typescript
public readonly release: Release;
```

- *Type:* <a href="#projen.gitlab.Release">Release</a>

Indicates that the job creates a Release.

---

##### `resourceGroup`<sup>Optional</sup> <a name="resourceGroup" id="projen.gitlab.Job.property.resourceGroup"></a>

```typescript
public readonly resourceGroup: string;
```

- *Type:* string

Limit job concurrency.

Can be used to ensure that the Runner will not run certain jobs simultaneously.

---

##### `retry`<sup>Optional</sup> <a name="retry" id="projen.gitlab.Job.property.retry"></a>

```typescript
public readonly retry: Retry;
```

- *Type:* <a href="#projen.gitlab.Retry">Retry</a>

---

##### `rules`<sup>Optional</sup> <a name="rules" id="projen.gitlab.Job.property.rules"></a>

```typescript
public readonly rules: IncludeRule[];
```

- *Type:* <a href="#projen.gitlab.IncludeRule">IncludeRule</a>[]

Rules allows for an array of individual rule objects to be evaluated in order, until one matches and dynamically provides attributes to the job.

---

##### `script`<sup>Optional</sup> <a name="script" id="projen.gitlab.Job.property.script"></a>

```typescript
public readonly script: string[];
```

- *Type:* string[]

Shell scripts executed by the Runner.

The only required property of jobs. Be careful with special characters (e.g. `:`, `{`, `}`, `&`) and use single or double quotes to avoid issues.

---

##### `secrets`<sup>Optional</sup> <a name="secrets" id="projen.gitlab.Job.property.secrets"></a>

```typescript
public readonly secrets: {[ key: string ]: {[ key: string ]: Secret}};
```

- *Type:* {[ key: string ]: {[ key: string ]: <a href="#projen.gitlab.Secret">Secret</a>}}

CI/CD secrets.

---

##### `services`<sup>Optional</sup> <a name="services" id="projen.gitlab.Job.property.services"></a>

```typescript
public readonly services: Service[];
```

- *Type:* <a href="#projen.gitlab.Service">Service</a>[]

---

##### `stage`<sup>Optional</sup> <a name="stage" id="projen.gitlab.Job.property.stage"></a>

```typescript
public readonly stage: string;
```

- *Type:* string

Define what stage the job will run in.

---

##### `startIn`<sup>Optional</sup> <a name="startIn" id="projen.gitlab.Job.property.startIn"></a>

```typescript
public readonly startIn: string;
```

- *Type:* string

---

##### `tags`<sup>Optional</sup> <a name="tags" id="projen.gitlab.Job.property.tags"></a>

```typescript
public readonly tags: string[];
```

- *Type:* string[]

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="projen.gitlab.Job.property.timeout"></a>

```typescript
public readonly timeout: string;
```

- *Type:* string

---

##### `trigger`<sup>Optional</sup> <a name="trigger" id="projen.gitlab.Job.property.trigger"></a>

```typescript
public readonly trigger: string | Trigger;
```

- *Type:* string | <a href="#projen.gitlab.Trigger">Trigger</a>

Trigger allows you to define downstream pipeline trigger.

When a job created from trigger definition is started by GitLab, a downstream pipeline gets created. Read more: https://docs.gitlab.com/ee/ci/yaml/README.html#trigger

---

##### `variables`<sup>Optional</sup> <a name="variables" id="projen.gitlab.Job.property.variables"></a>

```typescript
public readonly variables: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Configurable values that are passed to the Job.

---

##### `when`<sup>Optional</sup> <a name="when" id="projen.gitlab.Job.property.when"></a>

```typescript
public readonly when: JobWhen;
```

- *Type:* <a href="#projen.gitlab.JobWhen">JobWhen</a>

Describes the conditions for when to run the job.

Defaults to 'on_success'.

---

### KubernetesConfig <a name="KubernetesConfig" id="projen.gitlab.KubernetesConfig"></a>

Used to configure the kubernetes deployment for this environment.

This is currently not
supported for kubernetes clusters that are managed by Gitlab.

#### Initializer <a name="Initializer" id="projen.gitlab.KubernetesConfig.Initializer"></a>

```typescript
import { gitlab } from 'projen'

const kubernetesConfig: gitlab.KubernetesConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.gitlab.KubernetesConfig.property.namespace">namespace</a></code> | <code>string</code> | The kubernetes namespace where this environment should be deployed to. |

---

##### `namespace`<sup>Optional</sup> <a name="namespace" id="projen.gitlab.KubernetesConfig.property.namespace"></a>

```typescript
public readonly namespace: string;
```

- *Type:* string

The kubernetes namespace where this environment should be deployed to.

---

### Link <a name="Link" id="projen.gitlab.Link"></a>

Link configuration for an asset.

#### Initializer <a name="Initializer" id="projen.gitlab.Link.Initializer"></a>

```typescript
import { gitlab } from 'projen'

const link: gitlab.Link = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.gitlab.Link.property.name">name</a></code> | <code>string</code> | The name of the link. |
| <code><a href="#projen.gitlab.Link.property.url">url</a></code> | <code>string</code> | The URL to download a file. |
| <code><a href="#projen.gitlab.Link.property.filepath">filepath</a></code> | <code>string</code> | The redirect link to the url. |
| <code><a href="#projen.gitlab.Link.property.linkType">linkType</a></code> | <code><a href="#projen.gitlab.LinkType">LinkType</a></code> | The content kind of what users can download via url. |

---

##### `name`<sup>Required</sup> <a name="name" id="projen.gitlab.Link.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the link.

---

##### `url`<sup>Required</sup> <a name="url" id="projen.gitlab.Link.property.url"></a>

```typescript
public readonly url: string;
```

- *Type:* string

The URL to download a file.

---

##### `filepath`<sup>Optional</sup> <a name="filepath" id="projen.gitlab.Link.property.filepath"></a>

```typescript
public readonly filepath: string;
```

- *Type:* string

The redirect link to the url.

---

##### `linkType`<sup>Optional</sup> <a name="linkType" id="projen.gitlab.Link.property.linkType"></a>

```typescript
public readonly linkType: LinkType;
```

- *Type:* <a href="#projen.gitlab.LinkType">LinkType</a>

The content kind of what users can download via url.

---

### Need <a name="Need" id="projen.gitlab.Need"></a>

A jobs in a previous stage whose sole completion is needed to start the current job.

#### Initializer <a name="Initializer" id="projen.gitlab.Need.Initializer"></a>

```typescript
import { gitlab } from 'projen'

const need: gitlab.Need = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.gitlab.Need.property.job">job</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.gitlab.Need.property.artifacts">artifacts</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#projen.gitlab.Need.property.optional">optional</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#projen.gitlab.Need.property.pipeline">pipeline</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.gitlab.Need.property.project">project</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.gitlab.Need.property.ref">ref</a></code> | <code>string</code> | *No description.* |

---

##### `job`<sup>Required</sup> <a name="job" id="projen.gitlab.Need.property.job"></a>

```typescript
public readonly job: string;
```

- *Type:* string

---

##### `artifacts`<sup>Optional</sup> <a name="artifacts" id="projen.gitlab.Need.property.artifacts"></a>

```typescript
public readonly artifacts: boolean;
```

- *Type:* boolean

---

##### `optional`<sup>Optional</sup> <a name="optional" id="projen.gitlab.Need.property.optional"></a>

```typescript
public readonly optional: boolean;
```

- *Type:* boolean

---

##### `pipeline`<sup>Optional</sup> <a name="pipeline" id="projen.gitlab.Need.property.pipeline"></a>

```typescript
public readonly pipeline: string;
```

- *Type:* string

---

##### `project`<sup>Optional</sup> <a name="project" id="projen.gitlab.Need.property.project"></a>

```typescript
public readonly project: string;
```

- *Type:* string

---

##### `ref`<sup>Optional</sup> <a name="ref" id="projen.gitlab.Need.property.ref"></a>

```typescript
public readonly ref: string;
```

- *Type:* string

---

### Parallel <a name="Parallel" id="projen.gitlab.Parallel"></a>

Used to run a job multiple times in parallel in a single pipeline.

#### Initializer <a name="Initializer" id="projen.gitlab.Parallel.Initializer"></a>

```typescript
import { gitlab } from 'projen'

const parallel: gitlab.Parallel = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.gitlab.Parallel.property.matrix">matrix</a></code> | <code>{[ key: string ]: any[]}[]</code> | Defines different variables for jobs that are running in parallel. |

---

##### `matrix`<sup>Required</sup> <a name="matrix" id="projen.gitlab.Parallel.property.matrix"></a>

```typescript
public readonly matrix: {[ key: string ]: any[]}[];
```

- *Type:* {[ key: string ]: any[]}[]

Defines different variables for jobs that are running in parallel.

---

### Release <a name="Release" id="projen.gitlab.Release"></a>

Indicates that the job creates a Release.

#### Initializer <a name="Initializer" id="projen.gitlab.Release.Initializer"></a>

```typescript
import { gitlab } from 'projen'

const release: gitlab.Release = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.gitlab.Release.property.description">description</a></code> | <code>string</code> | Specifies the longer description of the Release. |
| <code><a href="#projen.gitlab.Release.property.tagName">tagName</a></code> | <code>string</code> | The tag_name must be specified. |
| <code><a href="#projen.gitlab.Release.property.assets">assets</a></code> | <code><a href="#projen.gitlab.Assets">Assets</a></code> | *No description.* |
| <code><a href="#projen.gitlab.Release.property.milestones">milestones</a></code> | <code>string[]</code> | The title of each milestone the release is associated with. |
| <code><a href="#projen.gitlab.Release.property.name">name</a></code> | <code>string</code> | The Release name. |
| <code><a href="#projen.gitlab.Release.property.ref">ref</a></code> | <code>string</code> | If the release: tag_name doesn’t exist yet, the release is created from ref. |
| <code><a href="#projen.gitlab.Release.property.releasedAt">releasedAt</a></code> | <code>string</code> | The date and time when the release is ready. |

---

##### `description`<sup>Required</sup> <a name="description" id="projen.gitlab.Release.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

Specifies the longer description of the Release.

---

##### `tagName`<sup>Required</sup> <a name="tagName" id="projen.gitlab.Release.property.tagName"></a>

```typescript
public readonly tagName: string;
```

- *Type:* string

The tag_name must be specified.

It can refer to an existing Git tag or can be specified by the user.

---

##### `assets`<sup>Optional</sup> <a name="assets" id="projen.gitlab.Release.property.assets"></a>

```typescript
public readonly assets: Assets;
```

- *Type:* <a href="#projen.gitlab.Assets">Assets</a>

---

##### `milestones`<sup>Optional</sup> <a name="milestones" id="projen.gitlab.Release.property.milestones"></a>

```typescript
public readonly milestones: string[];
```

- *Type:* string[]

The title of each milestone the release is associated with.

---

##### `name`<sup>Optional</sup> <a name="name" id="projen.gitlab.Release.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The Release name.

If omitted, it is populated with the value of release: tag_name.

---

##### `ref`<sup>Optional</sup> <a name="ref" id="projen.gitlab.Release.property.ref"></a>

```typescript
public readonly ref: string;
```

- *Type:* string

If the release: tag_name doesn’t exist yet, the release is created from ref.

ref can be a commit SHA, another tag name, or a branch name.

---

##### `releasedAt`<sup>Optional</sup> <a name="releasedAt" id="projen.gitlab.Release.property.releasedAt"></a>

```typescript
public readonly releasedAt: string;
```

- *Type:* string

The date and time when the release is ready.

Defaults to the current date and time if not defined. Should be enclosed in quotes and expressed in ISO 8601 format.

---

### Reports <a name="Reports" id="projen.gitlab.Reports"></a>

Reports will be uploaded as artifacts, and often displayed in the Gitlab UI, such as in Merge Requests.

> [https://docs.gitlab.com/ee/ci/yaml/#artifactsreports](https://docs.gitlab.com/ee/ci/yaml/#artifactsreports)

#### Initializer <a name="Initializer" id="projen.gitlab.Reports.Initializer"></a>

```typescript
import { gitlab } from 'projen'

const reports: gitlab.Reports = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.gitlab.Reports.property.cobertura">cobertura</a></code> | <code>string[]</code> | Path for file(s) that should be parsed as Cobertura XML coverage report. |
| <code><a href="#projen.gitlab.Reports.property.codequality">codequality</a></code> | <code>string[]</code> | Path to file or list of files with code quality report(s) (such as Code Climate). |
| <code><a href="#projen.gitlab.Reports.property.containerScanning">containerScanning</a></code> | <code>string[]</code> | Path to file or list of files with Container scanning vulnerabilities report(s). |
| <code><a href="#projen.gitlab.Reports.property.coverageReport">coverageReport</a></code> | <code><a href="#projen.gitlab.CoverageReport">CoverageReport</a></code> | Code coverage report information. |
| <code><a href="#projen.gitlab.Reports.property.dast">dast</a></code> | <code>string[]</code> | Path to file or list of files with DAST vulnerabilities report(s). |
| <code><a href="#projen.gitlab.Reports.property.dependencyScanning">dependencyScanning</a></code> | <code>string[]</code> | Path to file or list of files with Dependency scanning vulnerabilities report(s). |
| <code><a href="#projen.gitlab.Reports.property.dotenv">dotenv</a></code> | <code>string[]</code> | Path to file or list of files containing runtime-created variables for this job. |
| <code><a href="#projen.gitlab.Reports.property.junit">junit</a></code> | <code>string[]</code> | Path for file(s) that should be parsed as JUnit XML result. |
| <code><a href="#projen.gitlab.Reports.property.licenseManagement">licenseManagement</a></code> | <code>string[]</code> | Deprecated in 12.8: Path to file or list of files with license report(s). |
| <code><a href="#projen.gitlab.Reports.property.licenseScanning">licenseScanning</a></code> | <code>string[]</code> | Path to file or list of files with license report(s). |
| <code><a href="#projen.gitlab.Reports.property.lsif">lsif</a></code> | <code>string[]</code> | Path to file or list of files containing code intelligence (Language Server Index Format). |
| <code><a href="#projen.gitlab.Reports.property.metrics">metrics</a></code> | <code>string[]</code> | Path to file or list of files with custom metrics report(s). |
| <code><a href="#projen.gitlab.Reports.property.performance">performance</a></code> | <code>string[]</code> | Path to file or list of files with performance metrics report(s). |
| <code><a href="#projen.gitlab.Reports.property.requirements">requirements</a></code> | <code>string[]</code> | Path to file or list of files with requirements report(s). |
| <code><a href="#projen.gitlab.Reports.property.sast">sast</a></code> | <code>string[]</code> | Path to file or list of files with SAST vulnerabilities report(s). |
| <code><a href="#projen.gitlab.Reports.property.secretDetection">secretDetection</a></code> | <code>string[]</code> | Path to file or list of files with secret detection report(s). |
| <code><a href="#projen.gitlab.Reports.property.terraform">terraform</a></code> | <code>string[]</code> | Path to file or list of files with terraform plan(s). |

---

##### ~~`cobertura`~~<sup>Optional</sup> <a name="cobertura" id="projen.gitlab.Reports.property.cobertura"></a>

- *Deprecated:* per {@link https://docs.gitlab.com/ee/update/deprecations.html#artifactsreportscobertura-keyword} use {@link coverageReport } instead

```typescript
public readonly cobertura: string[];
```

- *Type:* string[]

Path for file(s) that should be parsed as Cobertura XML coverage report.

---

##### `codequality`<sup>Optional</sup> <a name="codequality" id="projen.gitlab.Reports.property.codequality"></a>

```typescript
public readonly codequality: string[];
```

- *Type:* string[]

Path to file or list of files with code quality report(s) (such as Code Climate).

---

##### `containerScanning`<sup>Optional</sup> <a name="containerScanning" id="projen.gitlab.Reports.property.containerScanning"></a>

```typescript
public readonly containerScanning: string[];
```

- *Type:* string[]

Path to file or list of files with Container scanning vulnerabilities report(s).

---

##### `coverageReport`<sup>Optional</sup> <a name="coverageReport" id="projen.gitlab.Reports.property.coverageReport"></a>

```typescript
public readonly coverageReport: CoverageReport;
```

- *Type:* <a href="#projen.gitlab.CoverageReport">CoverageReport</a>

Code coverage report information.

---

##### `dast`<sup>Optional</sup> <a name="dast" id="projen.gitlab.Reports.property.dast"></a>

```typescript
public readonly dast: string[];
```

- *Type:* string[]

Path to file or list of files with DAST vulnerabilities report(s).

---

##### `dependencyScanning`<sup>Optional</sup> <a name="dependencyScanning" id="projen.gitlab.Reports.property.dependencyScanning"></a>

```typescript
public readonly dependencyScanning: string[];
```

- *Type:* string[]

Path to file or list of files with Dependency scanning vulnerabilities report(s).

---

##### `dotenv`<sup>Optional</sup> <a name="dotenv" id="projen.gitlab.Reports.property.dotenv"></a>

```typescript
public readonly dotenv: string[];
```

- *Type:* string[]

Path to file or list of files containing runtime-created variables for this job.

---

##### `junit`<sup>Optional</sup> <a name="junit" id="projen.gitlab.Reports.property.junit"></a>

```typescript
public readonly junit: string[];
```

- *Type:* string[]

Path for file(s) that should be parsed as JUnit XML result.

---

##### `licenseManagement`<sup>Optional</sup> <a name="licenseManagement" id="projen.gitlab.Reports.property.licenseManagement"></a>

```typescript
public readonly licenseManagement: string[];
```

- *Type:* string[]

Deprecated in 12.8: Path to file or list of files with license report(s).

---

##### `licenseScanning`<sup>Optional</sup> <a name="licenseScanning" id="projen.gitlab.Reports.property.licenseScanning"></a>

```typescript
public readonly licenseScanning: string[];
```

- *Type:* string[]

Path to file or list of files with license report(s).

---

##### `lsif`<sup>Optional</sup> <a name="lsif" id="projen.gitlab.Reports.property.lsif"></a>

```typescript
public readonly lsif: string[];
```

- *Type:* string[]

Path to file or list of files containing code intelligence (Language Server Index Format).

---

##### `metrics`<sup>Optional</sup> <a name="metrics" id="projen.gitlab.Reports.property.metrics"></a>

```typescript
public readonly metrics: string[];
```

- *Type:* string[]

Path to file or list of files with custom metrics report(s).

---

##### `performance`<sup>Optional</sup> <a name="performance" id="projen.gitlab.Reports.property.performance"></a>

```typescript
public readonly performance: string[];
```

- *Type:* string[]

Path to file or list of files with performance metrics report(s).

---

##### `requirements`<sup>Optional</sup> <a name="requirements" id="projen.gitlab.Reports.property.requirements"></a>

```typescript
public readonly requirements: string[];
```

- *Type:* string[]

Path to file or list of files with requirements report(s).

---

##### `sast`<sup>Optional</sup> <a name="sast" id="projen.gitlab.Reports.property.sast"></a>

```typescript
public readonly sast: string[];
```

- *Type:* string[]

Path to file or list of files with SAST vulnerabilities report(s).

---

##### `secretDetection`<sup>Optional</sup> <a name="secretDetection" id="projen.gitlab.Reports.property.secretDetection"></a>

```typescript
public readonly secretDetection: string[];
```

- *Type:* string[]

Path to file or list of files with secret detection report(s).

---

##### `terraform`<sup>Optional</sup> <a name="terraform" id="projen.gitlab.Reports.property.terraform"></a>

```typescript
public readonly terraform: string[];
```

- *Type:* string[]

Path to file or list of files with terraform plan(s).

---

### Retry <a name="Retry" id="projen.gitlab.Retry"></a>

How many times a job is retried if it fails.

If not defined, defaults to 0 and jobs do not retry.

> [https://docs.gitlab.com/ee/ci/yaml/#retry](https://docs.gitlab.com/ee/ci/yaml/#retry)

#### Initializer <a name="Initializer" id="projen.gitlab.Retry.Initializer"></a>

```typescript
import { gitlab } from 'projen'

const retry: gitlab.Retry = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.gitlab.Retry.property.max">max</a></code> | <code>number</code> | 0 (default), 1, or 2. |
| <code><a href="#projen.gitlab.Retry.property.when">when</a></code> | <code>any</code> | Either a single or array of error types to trigger job retry. |

---

##### `max`<sup>Optional</sup> <a name="max" id="projen.gitlab.Retry.property.max"></a>

```typescript
public readonly max: number;
```

- *Type:* number

0 (default), 1, or 2.

---

##### `when`<sup>Optional</sup> <a name="when" id="projen.gitlab.Retry.property.when"></a>

```typescript
public readonly when: any;
```

- *Type:* any

Either a single or array of error types to trigger job retry.

---

### Secret <a name="Secret" id="projen.gitlab.Secret"></a>

A CI/CD secret.

#### Initializer <a name="Initializer" id="projen.gitlab.Secret.Initializer"></a>

```typescript
import { gitlab } from 'projen'

const secret: gitlab.Secret = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.gitlab.Secret.property.vault">vault</a></code> | <code><a href="#projen.gitlab.VaultConfig">VaultConfig</a></code> | *No description.* |

---

##### `vault`<sup>Required</sup> <a name="vault" id="projen.gitlab.Secret.property.vault"></a>

```typescript
public readonly vault: VaultConfig;
```

- *Type:* <a href="#projen.gitlab.VaultConfig">VaultConfig</a>

---

### Service <a name="Service" id="projen.gitlab.Service"></a>

Used to specify an additional Docker image to run scripts in.

The service image is linked to the image specified in the

> [https://docs.gitlab.com/ee/ci/yaml/#services](https://docs.gitlab.com/ee/ci/yaml/#services)

#### Initializer <a name="Initializer" id="projen.gitlab.Service.Initializer"></a>

```typescript
import { gitlab } from 'projen'

const service: gitlab.Service = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.gitlab.Service.property.name">name</a></code> | <code>string</code> | Full name of the image that should be used. |
| <code><a href="#projen.gitlab.Service.property.alias">alias</a></code> | <code>string</code> | Additional alias that can be used to access the service from the job's container. |
| <code><a href="#projen.gitlab.Service.property.command">command</a></code> | <code>string[]</code> | Command or script that should be used as the container's command. |
| <code><a href="#projen.gitlab.Service.property.entrypoint">entrypoint</a></code> | <code>string[]</code> | Command or script that should be executed as the container's entrypoint. |
| <code><a href="#projen.gitlab.Service.property.pullPolicy">pullPolicy</a></code> | <code><a href="#projen.gitlab.PullPolicy">PullPolicy</a>[]</code> | The pull policy that the runner uses to fetch the Docker image. |
| <code><a href="#projen.gitlab.Service.property.variables">variables</a></code> | <code>{[ key: string ]: string}</code> | Additional environment variables that are passed exclusively to the service.. |

---

##### `name`<sup>Required</sup> <a name="name" id="projen.gitlab.Service.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

Full name of the image that should be used.

It should contain the Registry part if needed.

---

##### `alias`<sup>Optional</sup> <a name="alias" id="projen.gitlab.Service.property.alias"></a>

```typescript
public readonly alias: string;
```

- *Type:* string

Additional alias that can be used to access the service from the job's container.

Read Accessing the services for more information.

---

##### `command`<sup>Optional</sup> <a name="command" id="projen.gitlab.Service.property.command"></a>

```typescript
public readonly command: string[];
```

- *Type:* string[]

Command or script that should be used as the container's command.

It will be translated to arguments passed to Docker after the image's name. The syntax is similar to Dockerfile's CMD directive, where each shell token is a separate string in the array.

---

##### `entrypoint`<sup>Optional</sup> <a name="entrypoint" id="projen.gitlab.Service.property.entrypoint"></a>

```typescript
public readonly entrypoint: string[];
```

- *Type:* string[]

Command or script that should be executed as the container's entrypoint.

It will be translated to Docker's --entrypoint option while creating the container. The syntax is similar to Dockerfile's ENTRYPOINT directive, where each shell token is a separate string in the array.

---

##### `pullPolicy`<sup>Optional</sup> <a name="pullPolicy" id="projen.gitlab.Service.property.pullPolicy"></a>

```typescript
public readonly pullPolicy: PullPolicy[];
```

- *Type:* <a href="#projen.gitlab.PullPolicy">PullPolicy</a>[]

The pull policy that the runner uses to fetch the Docker image.

---

##### `variables`<sup>Optional</sup> <a name="variables" id="projen.gitlab.Service.property.variables"></a>

```typescript
public readonly variables: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Additional environment variables that are passed exclusively to the service..

---

### Trigger <a name="Trigger" id="projen.gitlab.Trigger"></a>

Trigger a multi-project or a child pipeline.

Read more:

> [https://docs.gitlab.com/ee/ci/yaml/README.html#trigger-syntax-for-child-pipeline](https://docs.gitlab.com/ee/ci/yaml/README.html#trigger-syntax-for-child-pipeline)

#### Initializer <a name="Initializer" id="projen.gitlab.Trigger.Initializer"></a>

```typescript
import { gitlab } from 'projen'

const trigger: gitlab.Trigger = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.gitlab.Trigger.property.branch">branch</a></code> | <code>string</code> | The branch name that a downstream pipeline will use. |
| <code><a href="#projen.gitlab.Trigger.property.include">include</a></code> | <code><a href="#projen.gitlab.TriggerInclude">TriggerInclude</a>[]</code> | A list of local files or artifacts from other jobs to define the pipeline. |
| <code><a href="#projen.gitlab.Trigger.property.project">project</a></code> | <code>string</code> | Path to the project, e.g. `group/project`, or `group/sub-group/project`. |
| <code><a href="#projen.gitlab.Trigger.property.strategy">strategy</a></code> | <code><a href="#projen.gitlab.Strategy">Strategy</a></code> | You can mirror the pipeline status from the triggered pipeline to the source bridge job by using strategy: depend. |

---

##### `branch`<sup>Optional</sup> <a name="branch" id="projen.gitlab.Trigger.property.branch"></a>

```typescript
public readonly branch: string;
```

- *Type:* string

The branch name that a downstream pipeline will use.

---

##### `include`<sup>Optional</sup> <a name="include" id="projen.gitlab.Trigger.property.include"></a>

```typescript
public readonly include: TriggerInclude[];
```

- *Type:* <a href="#projen.gitlab.TriggerInclude">TriggerInclude</a>[]

A list of local files or artifacts from other jobs to define the pipeline.

---

##### `project`<sup>Optional</sup> <a name="project" id="projen.gitlab.Trigger.property.project"></a>

```typescript
public readonly project: string;
```

- *Type:* string

Path to the project, e.g. `group/project`, or `group/sub-group/project`.

---

##### `strategy`<sup>Optional</sup> <a name="strategy" id="projen.gitlab.Trigger.property.strategy"></a>

```typescript
public readonly strategy: Strategy;
```

- *Type:* <a href="#projen.gitlab.Strategy">Strategy</a>

You can mirror the pipeline status from the triggered pipeline to the source bridge job by using strategy: depend.

---

### TriggerInclude <a name="TriggerInclude" id="projen.gitlab.TriggerInclude"></a>

References a local file or an artifact from another job to define the pipeline configuration.

> [https://docs.gitlab.com/ee/ci/yaml/#triggerinclude](https://docs.gitlab.com/ee/ci/yaml/#triggerinclude)

#### Initializer <a name="Initializer" id="projen.gitlab.TriggerInclude.Initializer"></a>

```typescript
import { gitlab } from 'projen'

const triggerInclude: gitlab.TriggerInclude = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.gitlab.TriggerInclude.property.artifact">artifact</a></code> | <code>string</code> | Relative path to the generated YAML file which is extracted from the artifacts and used as the configuration for triggering the child pipeline. |
| <code><a href="#projen.gitlab.TriggerInclude.property.file">file</a></code> | <code>string</code> | Relative path from repository root (`/`) to the pipeline configuration YAML file. |
| <code><a href="#projen.gitlab.TriggerInclude.property.job">job</a></code> | <code>string</code> | Job name which generates the artifact. |
| <code><a href="#projen.gitlab.TriggerInclude.property.local">local</a></code> | <code>string</code> | Relative path from local repository root (`/`) to the local YAML file to define the pipeline configuration. |
| <code><a href="#projen.gitlab.TriggerInclude.property.project">project</a></code> | <code>string</code> | Path to another private project under the same GitLab instance, like `group/project` or `group/sub-group/project`. |
| <code><a href="#projen.gitlab.TriggerInclude.property.ref">ref</a></code> | <code>string</code> | Branch/Tag/Commit hash for the target project. |
| <code><a href="#projen.gitlab.TriggerInclude.property.template">template</a></code> | <code>string</code> | Name of the template YAML file to use in the pipeline configuration. |

---

##### `artifact`<sup>Optional</sup> <a name="artifact" id="projen.gitlab.TriggerInclude.property.artifact"></a>

```typescript
public readonly artifact: string;
```

- *Type:* string

Relative path to the generated YAML file which is extracted from the artifacts and used as the configuration for triggering the child pipeline.

---

##### `file`<sup>Optional</sup> <a name="file" id="projen.gitlab.TriggerInclude.property.file"></a>

```typescript
public readonly file: string;
```

- *Type:* string

Relative path from repository root (`/`) to the pipeline configuration YAML file.

---

##### `job`<sup>Optional</sup> <a name="job" id="projen.gitlab.TriggerInclude.property.job"></a>

```typescript
public readonly job: string;
```

- *Type:* string

Job name which generates the artifact.

---

##### `local`<sup>Optional</sup> <a name="local" id="projen.gitlab.TriggerInclude.property.local"></a>

```typescript
public readonly local: string;
```

- *Type:* string

Relative path from local repository root (`/`) to the local YAML file to define the pipeline configuration.

---

##### `project`<sup>Optional</sup> <a name="project" id="projen.gitlab.TriggerInclude.property.project"></a>

```typescript
public readonly project: string;
```

- *Type:* string

Path to another private project under the same GitLab instance, like `group/project` or `group/sub-group/project`.

---

##### `ref`<sup>Optional</sup> <a name="ref" id="projen.gitlab.TriggerInclude.property.ref"></a>

```typescript
public readonly ref: string;
```

- *Type:* string

Branch/Tag/Commit hash for the target project.

---

##### `template`<sup>Optional</sup> <a name="template" id="projen.gitlab.TriggerInclude.property.template"></a>

```typescript
public readonly template: string;
```

- *Type:* string

Name of the template YAML file to use in the pipeline configuration.

---

### VariableConfig <a name="VariableConfig" id="projen.gitlab.VariableConfig"></a>

Explains what the global variable is used for, what the acceptable values are.

> [https://docs.gitlab.com/ee/ci/yaml/#variables](https://docs.gitlab.com/ee/ci/yaml/#variables)

#### Initializer <a name="Initializer" id="projen.gitlab.VariableConfig.Initializer"></a>

```typescript
import { gitlab } from 'projen'

const variableConfig: gitlab.VariableConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.gitlab.VariableConfig.property.description">description</a></code> | <code>string</code> | Define a global variable that is prefilled when running a pipeline manually. |
| <code><a href="#projen.gitlab.VariableConfig.property.value">value</a></code> | <code>string</code> | The variable value. |

---

##### `description`<sup>Optional</sup> <a name="description" id="projen.gitlab.VariableConfig.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

Define a global variable that is prefilled when running a pipeline manually.

Must be used with value.

---

##### `value`<sup>Optional</sup> <a name="value" id="projen.gitlab.VariableConfig.property.value"></a>

```typescript
public readonly value: string;
```

- *Type:* string

The variable value.

---

### VaultConfig <a name="VaultConfig" id="projen.gitlab.VaultConfig"></a>

Specification for a secret provided by a HashiCorp Vault.

> [https://www.vaultproject.io/](https://www.vaultproject.io/)

#### Initializer <a name="Initializer" id="projen.gitlab.VaultConfig.Initializer"></a>

```typescript
import { gitlab } from 'projen'

const vaultConfig: gitlab.VaultConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.gitlab.VaultConfig.property.engine">engine</a></code> | <code><a href="#projen.gitlab.Engine">Engine</a></code> | *No description.* |
| <code><a href="#projen.gitlab.VaultConfig.property.field">field</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.gitlab.VaultConfig.property.path">path</a></code> | <code>string</code> | Path to the secret. |

---

##### `engine`<sup>Required</sup> <a name="engine" id="projen.gitlab.VaultConfig.property.engine"></a>

```typescript
public readonly engine: Engine;
```

- *Type:* <a href="#projen.gitlab.Engine">Engine</a>

---

##### `field`<sup>Required</sup> <a name="field" id="projen.gitlab.VaultConfig.property.field"></a>

```typescript
public readonly field: string;
```

- *Type:* string

---

##### `path`<sup>Required</sup> <a name="path" id="projen.gitlab.VaultConfig.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* string

Path to the secret.

---

### Workflow <a name="Workflow" id="projen.gitlab.Workflow"></a>

Used to control pipeline behavior.

> [https://docs.gitlab.com/ee/ci/yaml/#workflow](https://docs.gitlab.com/ee/ci/yaml/#workflow)

#### Initializer <a name="Initializer" id="projen.gitlab.Workflow.Initializer"></a>

```typescript
import { gitlab } from 'projen'

const workflow: gitlab.Workflow = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.gitlab.Workflow.property.name">name</a></code> | <code>string</code> | You can use name to define a name for pipelines. |
| <code><a href="#projen.gitlab.Workflow.property.rules">rules</a></code> | <code><a href="#projen.gitlab.WorkflowRule">WorkflowRule</a>[]</code> | Used to control whether or not a whole pipeline is created. |

---

##### `name`<sup>Optional</sup> <a name="name" id="projen.gitlab.Workflow.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

You can use name to define a name for pipelines.

---

##### `rules`<sup>Optional</sup> <a name="rules" id="projen.gitlab.Workflow.property.rules"></a>

```typescript
public readonly rules: WorkflowRule[];
```

- *Type:* <a href="#projen.gitlab.WorkflowRule">WorkflowRule</a>[]

Used to control whether or not a whole pipeline is created.

---

### WorkflowRule <a name="WorkflowRule" id="projen.gitlab.WorkflowRule"></a>

Used to control whether or not a whole pipeline is created.

> [https://docs.gitlab.com/ee/ci/yaml/#workflowrules](https://docs.gitlab.com/ee/ci/yaml/#workflowrules)

#### Initializer <a name="Initializer" id="projen.gitlab.WorkflowRule.Initializer"></a>

```typescript
import { gitlab } from 'projen'

const workflowRule: gitlab.WorkflowRule = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.gitlab.WorkflowRule.property.changes">changes</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen.gitlab.WorkflowRule.property.exists">exists</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen.gitlab.WorkflowRule.property.if">if</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.gitlab.WorkflowRule.property.variables">variables</a></code> | <code>{[ key: string ]: string \| number}</code> | *No description.* |
| <code><a href="#projen.gitlab.WorkflowRule.property.when">when</a></code> | <code><a href="#projen.gitlab.WorkflowWhen">WorkflowWhen</a></code> | *No description.* |

---

##### `changes`<sup>Optional</sup> <a name="changes" id="projen.gitlab.WorkflowRule.property.changes"></a>

```typescript
public readonly changes: string[];
```

- *Type:* string[]

---

##### `exists`<sup>Optional</sup> <a name="exists" id="projen.gitlab.WorkflowRule.property.exists"></a>

```typescript
public readonly exists: string[];
```

- *Type:* string[]

---

##### `if`<sup>Optional</sup> <a name="if" id="projen.gitlab.WorkflowRule.property.if"></a>

```typescript
public readonly if: string;
```

- *Type:* string

---

##### `variables`<sup>Optional</sup> <a name="variables" id="projen.gitlab.WorkflowRule.property.variables"></a>

```typescript
public readonly variables: {[ key: string ]: string | number};
```

- *Type:* {[ key: string ]: string | number}

---

##### `when`<sup>Optional</sup> <a name="when" id="projen.gitlab.WorkflowRule.property.when"></a>

```typescript
public readonly when: WorkflowWhen;
```

- *Type:* <a href="#projen.gitlab.WorkflowWhen">WorkflowWhen</a>

---


## Protocols <a name="Protocols" id="Protocols"></a>

### IDToken <a name="IDToken" id="projen.gitlab.IDToken"></a>

- *Implemented By:* <a href="#projen.gitlab.IDToken">IDToken</a>

id_tokens Definition.

> [https://docs.gitlab.com/ee/ci/yaml/#id_tokens](https://docs.gitlab.com/ee/ci/yaml/#id_tokens)


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.gitlab.IDToken.property.aud">aud</a></code> | <code>string \| string[]</code> | The required aud sub-keyword is used to configure the aud claim for the JWT. |

---

##### `aud`<sup>Required</sup> <a name="aud" id="projen.gitlab.IDToken.property.aud"></a>

```typescript
public readonly aud: string | string[];
```

- *Type:* string | string[]

The required aud sub-keyword is used to configure the aud claim for the JWT.

---

## Enums <a name="Enums" id="Enums"></a>

### Action <a name="Action" id="projen.gitlab.Action"></a>

Specifies what this job will do.

'start' (default) indicates the job will start the
deployment. 'prepare' indicates this will not affect the deployment. 'stop' indicates
this will stop the deployment.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.gitlab.Action.PREPARE">PREPARE</a></code> | *No description.* |
| <code><a href="#projen.gitlab.Action.START">START</a></code> | *No description.* |
| <code><a href="#projen.gitlab.Action.STOP">STOP</a></code> | *No description.* |

---

##### `PREPARE` <a name="PREPARE" id="projen.gitlab.Action.PREPARE"></a>

---


##### `START` <a name="START" id="projen.gitlab.Action.START"></a>

---


##### `STOP` <a name="STOP" id="projen.gitlab.Action.STOP"></a>

---


### CachePolicy <a name="CachePolicy" id="projen.gitlab.CachePolicy"></a>

Configure the upload and download behaviour of a cache.

> [https://docs.gitlab.com/ee/ci/yaml/#cachepolicy](https://docs.gitlab.com/ee/ci/yaml/#cachepolicy)

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.gitlab.CachePolicy.PULL">PULL</a></code> | Only download the cache when the job starts, but never upload changes when the job finishes. |
| <code><a href="#projen.gitlab.CachePolicy.PUSH">PUSH</a></code> | Only upload a cache when the job finishes, but never download the cache when the job starts. |
| <code><a href="#projen.gitlab.CachePolicy.PULL_PUSH">PULL_PUSH</a></code> | The job downloads the cache when the job starts, and uploads changes to the cache when the job ends. |

---

##### `PULL` <a name="PULL" id="projen.gitlab.CachePolicy.PULL"></a>

Only download the cache when the job starts, but never upload changes when the job finishes.

---


##### `PUSH` <a name="PUSH" id="projen.gitlab.CachePolicy.PUSH"></a>

Only upload a cache when the job finishes, but never download the cache when the job starts.

---


##### `PULL_PUSH` <a name="PULL_PUSH" id="projen.gitlab.CachePolicy.PULL_PUSH"></a>

The job downloads the cache when the job starts, and uploads changes to the cache when the job ends.

---


### CacheWhen <a name="CacheWhen" id="projen.gitlab.CacheWhen"></a>

Configure when artifacts are uploaded depended on job status.

> [https://docs.gitlab.com/ee/ci/yaml/#cachewhen](https://docs.gitlab.com/ee/ci/yaml/#cachewhen)

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.gitlab.CacheWhen.ALWAYS">ALWAYS</a></code> | Upload artifacts regardless of job status. |
| <code><a href="#projen.gitlab.CacheWhen.ON_FAILURE">ON_FAILURE</a></code> | Upload artifacts only when the job fails. |
| <code><a href="#projen.gitlab.CacheWhen.ON_SUCCESS">ON_SUCCESS</a></code> | Upload artifacts only when the job succeeds (this is the default). |

---

##### `ALWAYS` <a name="ALWAYS" id="projen.gitlab.CacheWhen.ALWAYS"></a>

Upload artifacts regardless of job status.

---


##### `ON_FAILURE` <a name="ON_FAILURE" id="projen.gitlab.CacheWhen.ON_FAILURE"></a>

Upload artifacts only when the job fails.

---


##### `ON_SUCCESS` <a name="ON_SUCCESS" id="projen.gitlab.CacheWhen.ON_SUCCESS"></a>

Upload artifacts only when the job succeeds (this is the default).

---


### DefaultElement <a name="DefaultElement" id="projen.gitlab.DefaultElement"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.gitlab.DefaultElement.AFTER_SCRIPT">AFTER_SCRIPT</a></code> | *No description.* |
| <code><a href="#projen.gitlab.DefaultElement.ARTIFACTS">ARTIFACTS</a></code> | *No description.* |
| <code><a href="#projen.gitlab.DefaultElement.BEFORE_SCRIPT">BEFORE_SCRIPT</a></code> | *No description.* |
| <code><a href="#projen.gitlab.DefaultElement.CACHE">CACHE</a></code> | *No description.* |
| <code><a href="#projen.gitlab.DefaultElement.IMAGE">IMAGE</a></code> | *No description.* |
| <code><a href="#projen.gitlab.DefaultElement.INTERRUPTIBLE">INTERRUPTIBLE</a></code> | *No description.* |
| <code><a href="#projen.gitlab.DefaultElement.RETRY">RETRY</a></code> | *No description.* |
| <code><a href="#projen.gitlab.DefaultElement.SERVICES">SERVICES</a></code> | *No description.* |
| <code><a href="#projen.gitlab.DefaultElement.TAGS">TAGS</a></code> | *No description.* |
| <code><a href="#projen.gitlab.DefaultElement.TIMEOUT">TIMEOUT</a></code> | *No description.* |

---

##### `AFTER_SCRIPT` <a name="AFTER_SCRIPT" id="projen.gitlab.DefaultElement.AFTER_SCRIPT"></a>

---


##### `ARTIFACTS` <a name="ARTIFACTS" id="projen.gitlab.DefaultElement.ARTIFACTS"></a>

---


##### `BEFORE_SCRIPT` <a name="BEFORE_SCRIPT" id="projen.gitlab.DefaultElement.BEFORE_SCRIPT"></a>

---


##### `CACHE` <a name="CACHE" id="projen.gitlab.DefaultElement.CACHE"></a>

---


##### `IMAGE` <a name="IMAGE" id="projen.gitlab.DefaultElement.IMAGE"></a>

---


##### `INTERRUPTIBLE` <a name="INTERRUPTIBLE" id="projen.gitlab.DefaultElement.INTERRUPTIBLE"></a>

---


##### `RETRY` <a name="RETRY" id="projen.gitlab.DefaultElement.RETRY"></a>

---


##### `SERVICES` <a name="SERVICES" id="projen.gitlab.DefaultElement.SERVICES"></a>

---


##### `TAGS` <a name="TAGS" id="projen.gitlab.DefaultElement.TAGS"></a>

---


##### `TIMEOUT` <a name="TIMEOUT" id="projen.gitlab.DefaultElement.TIMEOUT"></a>

---


### DeploymentTier <a name="DeploymentTier" id="projen.gitlab.DeploymentTier"></a>

Explicitly specifies the tier of the deployment environment if non-standard environment name is used.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.gitlab.DeploymentTier.DEVELOPMENT">DEVELOPMENT</a></code> | *No description.* |
| <code><a href="#projen.gitlab.DeploymentTier.OTHER">OTHER</a></code> | *No description.* |
| <code><a href="#projen.gitlab.DeploymentTier.PRODUCTION">PRODUCTION</a></code> | *No description.* |
| <code><a href="#projen.gitlab.DeploymentTier.STAGING">STAGING</a></code> | *No description.* |
| <code><a href="#projen.gitlab.DeploymentTier.TESTING">TESTING</a></code> | *No description.* |

---

##### `DEVELOPMENT` <a name="DEVELOPMENT" id="projen.gitlab.DeploymentTier.DEVELOPMENT"></a>

---


##### `OTHER` <a name="OTHER" id="projen.gitlab.DeploymentTier.OTHER"></a>

---


##### `PRODUCTION` <a name="PRODUCTION" id="projen.gitlab.DeploymentTier.PRODUCTION"></a>

---


##### `STAGING` <a name="STAGING" id="projen.gitlab.DeploymentTier.STAGING"></a>

---


##### `TESTING` <a name="TESTING" id="projen.gitlab.DeploymentTier.TESTING"></a>

---


### JobWhen <a name="JobWhen" id="projen.gitlab.JobWhen"></a>

Describes the conditions for when to run the job.

Defaults to 'on_success'.

> [https://docs.gitlab.com/ee/ci/yaml/#when](https://docs.gitlab.com/ee/ci/yaml/#when)

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.gitlab.JobWhen.ALWAYS">ALWAYS</a></code> | *No description.* |
| <code><a href="#projen.gitlab.JobWhen.DELAYED">DELAYED</a></code> | *No description.* |
| <code><a href="#projen.gitlab.JobWhen.MANUAL">MANUAL</a></code> | *No description.* |
| <code><a href="#projen.gitlab.JobWhen.NEVER">NEVER</a></code> | *No description.* |
| <code><a href="#projen.gitlab.JobWhen.ON_FAILURE">ON_FAILURE</a></code> | *No description.* |
| <code><a href="#projen.gitlab.JobWhen.ON_SUCCESS">ON_SUCCESS</a></code> | *No description.* |

---

##### `ALWAYS` <a name="ALWAYS" id="projen.gitlab.JobWhen.ALWAYS"></a>

---


##### `DELAYED` <a name="DELAYED" id="projen.gitlab.JobWhen.DELAYED"></a>

---


##### `MANUAL` <a name="MANUAL" id="projen.gitlab.JobWhen.MANUAL"></a>

---


##### `NEVER` <a name="NEVER" id="projen.gitlab.JobWhen.NEVER"></a>

---


##### `ON_FAILURE` <a name="ON_FAILURE" id="projen.gitlab.JobWhen.ON_FAILURE"></a>

---


##### `ON_SUCCESS` <a name="ON_SUCCESS" id="projen.gitlab.JobWhen.ON_SUCCESS"></a>

---


### KubernetesEnum <a name="KubernetesEnum" id="projen.gitlab.KubernetesEnum"></a>

Filter job based on if Kubernetes integration is active.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.gitlab.KubernetesEnum.ACTIVE">ACTIVE</a></code> | *No description.* |

---

##### `ACTIVE` <a name="ACTIVE" id="projen.gitlab.KubernetesEnum.ACTIVE"></a>

---


### LinkType <a name="LinkType" id="projen.gitlab.LinkType"></a>

The content kind of what users can download via url.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.gitlab.LinkType.IMAGE">IMAGE</a></code> | *No description.* |
| <code><a href="#projen.gitlab.LinkType.OTHER">OTHER</a></code> | *No description.* |
| <code><a href="#projen.gitlab.LinkType.PACKAGE">PACKAGE</a></code> | *No description.* |
| <code><a href="#projen.gitlab.LinkType.RUNBOOK">RUNBOOK</a></code> | *No description.* |

---

##### `IMAGE` <a name="IMAGE" id="projen.gitlab.LinkType.IMAGE"></a>

---


##### `OTHER` <a name="OTHER" id="projen.gitlab.LinkType.OTHER"></a>

---


##### `PACKAGE` <a name="PACKAGE" id="projen.gitlab.LinkType.PACKAGE"></a>

---


##### `RUNBOOK` <a name="RUNBOOK" id="projen.gitlab.LinkType.RUNBOOK"></a>

---


### PullPolicy <a name="PullPolicy" id="projen.gitlab.PullPolicy"></a>

Describes the conditions for when to pull an image.

> [https://docs.gitlab.com/ee/ci/yaml/#servicepull_policy](https://docs.gitlab.com/ee/ci/yaml/#servicepull_policy)

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.gitlab.PullPolicy.ALWAYS">ALWAYS</a></code> | *No description.* |
| <code><a href="#projen.gitlab.PullPolicy.NEVER">NEVER</a></code> | *No description.* |
| <code><a href="#projen.gitlab.PullPolicy.IF_NOT_PRESENT">IF_NOT_PRESENT</a></code> | *No description.* |

---

##### `ALWAYS` <a name="ALWAYS" id="projen.gitlab.PullPolicy.ALWAYS"></a>

---


##### `NEVER` <a name="NEVER" id="projen.gitlab.PullPolicy.NEVER"></a>

---


##### `IF_NOT_PRESENT` <a name="IF_NOT_PRESENT" id="projen.gitlab.PullPolicy.IF_NOT_PRESENT"></a>

---


### Strategy <a name="Strategy" id="projen.gitlab.Strategy"></a>

You can mirror the pipeline status from the triggered pipeline to the source bridge job by using strategy: depend.

> [https://docs.gitlab.com/ee/ci/yaml/#triggerstrategy](https://docs.gitlab.com/ee/ci/yaml/#triggerstrategy)

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.gitlab.Strategy.DEPEND">DEPEND</a></code> | *No description.* |

---

##### `DEPEND` <a name="DEPEND" id="projen.gitlab.Strategy.DEPEND"></a>

---


### WorkflowWhen <a name="WorkflowWhen" id="projen.gitlab.WorkflowWhen"></a>

Describes the conditions for when to run the job.

Defaults to 'on_success'.
The value can only be 'always' or 'never' when used with workflow.

> [https://docs.gitlab.com/ee/ci/yaml/#workflowrules](https://docs.gitlab.com/ee/ci/yaml/#workflowrules)

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.gitlab.WorkflowWhen.ALWAYS">ALWAYS</a></code> | *No description.* |
| <code><a href="#projen.gitlab.WorkflowWhen.NEVER">NEVER</a></code> | *No description.* |

---

##### `ALWAYS` <a name="ALWAYS" id="projen.gitlab.WorkflowWhen.ALWAYS"></a>

---


##### `NEVER` <a name="NEVER" id="projen.gitlab.WorkflowWhen.NEVER"></a>

---

