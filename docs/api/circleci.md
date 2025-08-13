# `circleci` Submodule <a name="`circleci` Submodule" id="projen.circleci"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### Circleci <a name="Circleci" id="projen.circleci.Circleci"></a>

Circleci Class to manage `.circleci/config.yml`. Check projen's docs for more information.

> [https://circleci.com/docs/2.0/configuration-reference/](https://circleci.com/docs/2.0/configuration-reference/)

#### Initializers <a name="Initializers" id="projen.circleci.Circleci.Initializer"></a>

```typescript
import { circleci } from 'projen'

new circleci.Circleci(project: Project, options?: CircleCiProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.circleci.Circleci.Initializer.parameter.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.circleci.Circleci.Initializer.parameter.options">options</a></code> | <code><a href="#projen.circleci.CircleCiProps">CircleCiProps</a></code> | *No description.* |

---

##### `project`<sup>Required</sup> <a name="project" id="projen.circleci.Circleci.Initializer.parameter.project"></a>

- *Type:* projen.Project

---

##### `options`<sup>Optional</sup> <a name="options" id="projen.circleci.Circleci.Initializer.parameter.options"></a>

- *Type:* <a href="#projen.circleci.CircleCiProps">CircleCiProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.circleci.Circleci.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen.circleci.Circleci.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen.circleci.Circleci.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen.circleci.Circleci.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |
| <code><a href="#projen.circleci.Circleci.addOrb">addOrb</a></code> | Add a Circleci Orb to pipeline. |
| <code><a href="#projen.circleci.Circleci.addWorkflow">addWorkflow</a></code> | add new workflow to existing pipeline. |

---

##### `toString` <a name="toString" id="projen.circleci.Circleci.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `postSynthesize` <a name="postSynthesize" id="projen.circleci.Circleci.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen.circleci.Circleci.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `synthesize` <a name="synthesize" id="projen.circleci.Circleci.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

##### `addOrb` <a name="addOrb" id="projen.circleci.Circleci.addOrb"></a>

```typescript
public addOrb(name: string, orb: string): void
```

Add a Circleci Orb to pipeline.

Will throw error if the orb already exists

###### `name`<sup>Required</sup> <a name="name" id="projen.circleci.Circleci.addOrb.parameter.name"></a>

- *Type:* string

---

###### `orb`<sup>Required</sup> <a name="orb" id="projen.circleci.Circleci.addOrb.parameter.orb"></a>

- *Type:* string

---

##### `addWorkflow` <a name="addWorkflow" id="projen.circleci.Circleci.addWorkflow"></a>

```typescript
public addWorkflow(workflow: Workflow): void
```

add new workflow to existing pipeline.

###### `workflow`<sup>Required</sup> <a name="workflow" id="projen.circleci.Circleci.addWorkflow.parameter.workflow"></a>

- *Type:* <a href="#projen.circleci.Workflow">Workflow</a>

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.circleci.Circleci.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen.circleci.Circleci.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="projen.circleci.Circleci.isConstruct"></a>

```typescript
import { circleci } from 'projen'

circleci.Circleci.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="projen.circleci.Circleci.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen.circleci.Circleci.isComponent"></a>

```typescript
import { circleci } from 'projen'

circleci.Circleci.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen.circleci.Circleci.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.circleci.Circleci.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen.circleci.Circleci.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.circleci.Circleci.property.file">file</a></code> | <code>projen.YamlFile</code> | The yaml file for the Circleci pipeline. |

---

##### `node`<sup>Required</sup> <a name="node" id="projen.circleci.Circleci.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen.circleci.Circleci.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---

##### `file`<sup>Required</sup> <a name="file" id="projen.circleci.Circleci.property.file"></a>

```typescript
public readonly file: YamlFile;
```

- *Type:* projen.YamlFile

The yaml file for the Circleci pipeline.

---


## Structs <a name="Structs" id="Structs"></a>

### CircleCiProps <a name="CircleCiProps" id="projen.circleci.CircleCiProps"></a>

Options for class {@link Circleci}.

> [https://circleci.com/docs/2.0/configuration-reference/](https://circleci.com/docs/2.0/configuration-reference/)

#### Initializer <a name="Initializer" id="projen.circleci.CircleCiProps.Initializer"></a>

```typescript
import { circleci } from 'projen'

const circleCiProps: circleci.CircleCiProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.circleci.CircleCiProps.property.jobs">jobs</a></code> | <code><a href="#projen.circleci.Job">Job</a>[]</code> | List of Jobs to create unique steps per pipeline, e.g. ```json jobs: [{  identifier: "compile",  docker: { image: "golang:alpine" }  steps: ["checkout", run: {command: "go build ."}] }] ```. |
| <code><a href="#projen.circleci.CircleCiProps.property.orbs">orbs</a></code> | <code>{[ key: string ]: string}</code> | Contains a map of CirclCi Orbs ```json orbs: {  node: "circleci/node@5.0.1"  slack: "circleci/slack@4.8.3" } ```. |
| <code><a href="#projen.circleci.CircleCiProps.property.setup">setup</a></code> | <code>boolean</code> | The setup field enables you to conditionally trigger configurations from outside the primary .circleci parent directory, update pipeline parameters, or generate customized configurations. |
| <code><a href="#projen.circleci.CircleCiProps.property.version">version</a></code> | <code>number</code> | pipeline version. |
| <code><a href="#projen.circleci.CircleCiProps.property.workflows">workflows</a></code> | <code><a href="#projen.circleci.Workflow">Workflow</a>[]</code> | List of Workflows of pipeline, e.g. ```json workflows: {   {     identifier: "build",       jobs: [{          identifier: "node/install",          context: ["npm"],       }]   } } ```. |

---

##### `jobs`<sup>Optional</sup> <a name="jobs" id="projen.circleci.CircleCiProps.property.jobs"></a>

```typescript
public readonly jobs: Job[];
```

- *Type:* <a href="#projen.circleci.Job">Job</a>[]

List of Jobs to create unique steps per pipeline, e.g. ```json jobs: [{  identifier: "compile",  docker: { image: "golang:alpine" }  steps: ["checkout", run: {command: "go build ."}] }] ```.

> [https://circleci.com/docs/2.0/configuration-reference/#jobs](https://circleci.com/docs/2.0/configuration-reference/#jobs)

---

##### `orbs`<sup>Optional</sup> <a name="orbs" id="projen.circleci.CircleCiProps.property.orbs"></a>

```typescript
public readonly orbs: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Contains a map of CirclCi Orbs ```json orbs: {  node: "circleci/node@5.0.1"  slack: "circleci/slack@4.8.3" } ```.

---

##### `setup`<sup>Optional</sup> <a name="setup" id="projen.circleci.CircleCiProps.property.setup"></a>

```typescript
public readonly setup: boolean;
```

- *Type:* boolean

The setup field enables you to conditionally trigger configurations from outside the primary .circleci parent directory, update pipeline parameters, or generate customized configurations.

> [https://circleci.com/docs/2.0/configuration-reference/#setup](https://circleci.com/docs/2.0/configuration-reference/#setup)

---

##### `version`<sup>Optional</sup> <a name="version" id="projen.circleci.CircleCiProps.property.version"></a>

```typescript
public readonly version: number;
```

- *Type:* number
- *Default:* 2.1

pipeline version.

> [https://circleci.com/docs/2.0/configuration-reference/#version](https://circleci.com/docs/2.0/configuration-reference/#version)

---

##### `workflows`<sup>Optional</sup> <a name="workflows" id="projen.circleci.CircleCiProps.property.workflows"></a>

```typescript
public readonly workflows: Workflow[];
```

- *Type:* <a href="#projen.circleci.Workflow">Workflow</a>[]

List of Workflows of pipeline, e.g. ```json workflows: {   {     identifier: "build",       jobs: [{          identifier: "node/install",          context: ["npm"],       }]   } } ```.

> [https://circleci.com/docs/2.0/configuration-reference/#workflows](https://circleci.com/docs/2.0/configuration-reference/#workflows)

---

### Docker <a name="Docker" id="projen.circleci.Docker"></a>

Options for docker executor.

> [https://circleci.com/docs/2.0/configuration-reference/#docker](https://circleci.com/docs/2.0/configuration-reference/#docker)

#### Initializer <a name="Initializer" id="projen.circleci.Docker.Initializer"></a>

```typescript
import { circleci } from 'projen'

const docker: circleci.Docker = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.circleci.Docker.property.image">image</a></code> | <code>string</code> | The name of a custom docker image to use. |
| <code><a href="#projen.circleci.Docker.property.auth">auth</a></code> | <code>{[ key: string ]: string}</code> | Authentication for registries using standard docker login credentials. |
| <code><a href="#projen.circleci.Docker.property.awsAuth">awsAuth</a></code> | <code>{[ key: string ]: string}</code> | Authentication for AWS Elastic Container Registry (ECR). |
| <code><a href="#projen.circleci.Docker.property.command">command</a></code> | <code>string[]</code> | The command used as pid 1 (or args for entrypoint) when launching the container. |
| <code><a href="#projen.circleci.Docker.property.entrypoint">entrypoint</a></code> | <code>string[]</code> | The command used as executable when launching the container. |
| <code><a href="#projen.circleci.Docker.property.environment">environment</a></code> | <code>{[ key: string ]: string \| number \| boolean}</code> | A map of environment variable names and values. |
| <code><a href="#projen.circleci.Docker.property.name">name</a></code> | <code>string</code> | The name the container is reachable by. |
| <code><a href="#projen.circleci.Docker.property.user">user</a></code> | <code>string</code> | Which user to run commands as within the Docker container. |

---

##### `image`<sup>Required</sup> <a name="image" id="projen.circleci.Docker.property.image"></a>

```typescript
public readonly image: string;
```

- *Type:* string

The name of a custom docker image to use.

---

##### `auth`<sup>Optional</sup> <a name="auth" id="projen.circleci.Docker.property.auth"></a>

```typescript
public readonly auth: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Authentication for registries using standard docker login credentials.

---

##### `awsAuth`<sup>Optional</sup> <a name="awsAuth" id="projen.circleci.Docker.property.awsAuth"></a>

```typescript
public readonly awsAuth: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Authentication for AWS Elastic Container Registry (ECR).

---

##### `command`<sup>Optional</sup> <a name="command" id="projen.circleci.Docker.property.command"></a>

```typescript
public readonly command: string[];
```

- *Type:* string[]

The command used as pid 1 (or args for entrypoint) when launching the container.

---

##### `entrypoint`<sup>Optional</sup> <a name="entrypoint" id="projen.circleci.Docker.property.entrypoint"></a>

```typescript
public readonly entrypoint: string[];
```

- *Type:* string[]

The command used as executable when launching the container.

---

##### `environment`<sup>Optional</sup> <a name="environment" id="projen.circleci.Docker.property.environment"></a>

```typescript
public readonly environment: {[ key: string ]: string | number | boolean};
```

- *Type:* {[ key: string ]: string | number | boolean}

A map of environment variable names and values.

---

##### `name`<sup>Optional</sup> <a name="name" id="projen.circleci.Docker.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name the container is reachable by.

By default, container services are accessible through localhost

---

##### `user`<sup>Optional</sup> <a name="user" id="projen.circleci.Docker.property.user"></a>

```typescript
public readonly user: string;
```

- *Type:* string

Which user to run commands as within the Docker container.

---

### Filter <a name="Filter" id="projen.circleci.Filter"></a>

The branches key controls whether the current branch should have a schedule trigger created for it, where current branch is the branch containing the config.yml file with the trigger stanza. That is, a push on the main branch will only schedule a workflow for the main branch.

Branches can have the keys only and ignore which either map to a single string naming a branch.
You may also use regular expressions to match against branches by enclosing them with /’s, or map to a list of such strings.
Regular expressions must match the entire string.

Any branches that match only will run the job.
Any branches that match ignore will not run the job.
If neither only nor ignore are specified then all branches will run the job.
If both only and ignore are specified the only is considered before ignore.

> [https://circleci.com/docs/2.0/configuration-reference/#filters](https://circleci.com/docs/2.0/configuration-reference/#filters)

#### Initializer <a name="Initializer" id="projen.circleci.Filter.Initializer"></a>

```typescript
import { circleci } from 'projen'

const filter: circleci.Filter = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.circleci.Filter.property.branches">branches</a></code> | <code><a href="#projen.circleci.FilterConfig">FilterConfig</a></code> | *No description.* |
| <code><a href="#projen.circleci.Filter.property.tags">tags</a></code> | <code><a href="#projen.circleci.FilterConfig">FilterConfig</a></code> | *No description.* |

---

##### `branches`<sup>Optional</sup> <a name="branches" id="projen.circleci.Filter.property.branches"></a>

```typescript
public readonly branches: FilterConfig;
```

- *Type:* <a href="#projen.circleci.FilterConfig">FilterConfig</a>

---

##### `tags`<sup>Optional</sup> <a name="tags" id="projen.circleci.Filter.property.tags"></a>

```typescript
public readonly tags: FilterConfig;
```

- *Type:* <a href="#projen.circleci.FilterConfig">FilterConfig</a>

---

### FilterConfig <a name="FilterConfig" id="projen.circleci.FilterConfig"></a>

set an inclusive or exclusive filter.

> [https://circleci.com/docs/2.0/configuration-reference/#filters](https://circleci.com/docs/2.0/configuration-reference/#filters)

#### Initializer <a name="Initializer" id="projen.circleci.FilterConfig.Initializer"></a>

```typescript
import { circleci } from 'projen'

const filterConfig: circleci.FilterConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.circleci.FilterConfig.property.ignore">ignore</a></code> | <code>string[]</code> | Either a single branch specifier, or a list of branch specifiers. |
| <code><a href="#projen.circleci.FilterConfig.property.only">only</a></code> | <code>string[]</code> | Either a single branch specifier, or a list of branch specifiers. |

---

##### `ignore`<sup>Optional</sup> <a name="ignore" id="projen.circleci.FilterConfig.property.ignore"></a>

```typescript
public readonly ignore: string[];
```

- *Type:* string[]

Either a single branch specifier, or a list of branch specifiers.

---

##### `only`<sup>Optional</sup> <a name="only" id="projen.circleci.FilterConfig.property.only"></a>

```typescript
public readonly only: string[];
```

- *Type:* string[]

Either a single branch specifier, or a list of branch specifiers.

---

### Job <a name="Job" id="projen.circleci.Job"></a>

A Workflow is comprised of one or more uniquely named jobs.

Jobs are specified in the jobs map,
see Sample 2.0 config.yml for two examples of a job map.
The name of the job is the key in the map, and the value is a map describing the job.
Each job consists of the job’s name as a key and a map as a value. A name should be case insensitive unique within a current jobs list.

> [https://circleci.com/docs/2.0/configuration-reference/#job_name](https://circleci.com/docs/2.0/configuration-reference/#job_name)

#### Initializer <a name="Initializer" id="projen.circleci.Job.Initializer"></a>

```typescript
import { circleci } from 'projen'

const job: circleci.Job = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.circleci.Job.property.identifier">identifier</a></code> | <code>string</code> | name of dynamic key *. |
| <code><a href="#projen.circleci.Job.property.circleciIpRanges">circleciIpRanges</a></code> | <code>boolean</code> | Enables jobs to go through a set of well-defined IP address ranges. |
| <code><a href="#projen.circleci.Job.property.docker">docker</a></code> | <code><a href="#projen.circleci.Docker">Docker</a>[]</code> | *No description.* |
| <code><a href="#projen.circleci.Job.property.environment">environment</a></code> | <code>{[ key: string ]: string \| number \| boolean}</code> | A map of environment variable names and values. |
| <code><a href="#projen.circleci.Job.property.machine">machine</a></code> | <code><a href="#projen.circleci.Machine">Machine</a></code> | *No description.* |
| <code><a href="#projen.circleci.Job.property.macos">macos</a></code> | <code><a href="#projen.circleci.Macos">Macos</a></code> | *No description.* |
| <code><a href="#projen.circleci.Job.property.parallelism">parallelism</a></code> | <code>number</code> | Number of parallel instances of this job to run (default: 1). |
| <code><a href="#projen.circleci.Job.property.parameters">parameters</a></code> | <code>{[ key: string ]: <a href="#projen.circleci.PipelineParameter">PipelineParameter</a>}</code> | Parameters for making a job explicitly configurable in a workflow. |
| <code><a href="#projen.circleci.Job.property.resourceClass">resourceClass</a></code> | <code>string</code> | {@link ResourceClass}. |
| <code><a href="#projen.circleci.Job.property.shell">shell</a></code> | <code>string</code> | Shell to use for execution command in all steps. |
| <code><a href="#projen.circleci.Job.property.steps">steps</a></code> | <code>any[]</code> | no type support here, for syntax {@see https://circleci.com/docs/2.0/configuration-reference/#steps}. |
| <code><a href="#projen.circleci.Job.property.workingDirectory">workingDirectory</a></code> | <code>string</code> | In which directory to run the steps. |

---

##### `identifier`<sup>Required</sup> <a name="identifier" id="projen.circleci.Job.property.identifier"></a>

```typescript
public readonly identifier: string;
```

- *Type:* string

name of dynamic key *.

---

##### `circleciIpRanges`<sup>Optional</sup> <a name="circleciIpRanges" id="projen.circleci.Job.property.circleciIpRanges"></a>

```typescript
public readonly circleciIpRanges: boolean;
```

- *Type:* boolean

Enables jobs to go through a set of well-defined IP address ranges.

---

##### `docker`<sup>Optional</sup> <a name="docker" id="projen.circleci.Job.property.docker"></a>

```typescript
public readonly docker: Docker[];
```

- *Type:* <a href="#projen.circleci.Docker">Docker</a>[]

---

##### `environment`<sup>Optional</sup> <a name="environment" id="projen.circleci.Job.property.environment"></a>

```typescript
public readonly environment: {[ key: string ]: string | number | boolean};
```

- *Type:* {[ key: string ]: string | number | boolean}

A map of environment variable names and values.

---

##### `machine`<sup>Optional</sup> <a name="machine" id="projen.circleci.Job.property.machine"></a>

```typescript
public readonly machine: Machine;
```

- *Type:* <a href="#projen.circleci.Machine">Machine</a>

---

##### `macos`<sup>Optional</sup> <a name="macos" id="projen.circleci.Job.property.macos"></a>

```typescript
public readonly macos: Macos;
```

- *Type:* <a href="#projen.circleci.Macos">Macos</a>

---

##### `parallelism`<sup>Optional</sup> <a name="parallelism" id="projen.circleci.Job.property.parallelism"></a>

```typescript
public readonly parallelism: number;
```

- *Type:* number

Number of parallel instances of this job to run (default: 1).

---

##### `parameters`<sup>Optional</sup> <a name="parameters" id="projen.circleci.Job.property.parameters"></a>

```typescript
public readonly parameters: {[ key: string ]: PipelineParameter};
```

- *Type:* {[ key: string ]: <a href="#projen.circleci.PipelineParameter">PipelineParameter</a>}

Parameters for making a job explicitly configurable in a workflow.

---

##### `resourceClass`<sup>Optional</sup> <a name="resourceClass" id="projen.circleci.Job.property.resourceClass"></a>

```typescript
public readonly resourceClass: string;
```

- *Type:* string

{@link ResourceClass}.

---

##### `shell`<sup>Optional</sup> <a name="shell" id="projen.circleci.Job.property.shell"></a>

```typescript
public readonly shell: string;
```

- *Type:* string

Shell to use for execution command in all steps.

Can be overridden by shell in each step

---

##### `steps`<sup>Optional</sup> <a name="steps" id="projen.circleci.Job.property.steps"></a>

```typescript
public readonly steps: any[];
```

- *Type:* any[]

no type support here, for syntax {@see https://circleci.com/docs/2.0/configuration-reference/#steps}.

---

##### `workingDirectory`<sup>Optional</sup> <a name="workingDirectory" id="projen.circleci.Job.property.workingDirectory"></a>

```typescript
public readonly workingDirectory: string;
```

- *Type:* string

In which directory to run the steps.

Will be interpreted as an absolute path. Default: `~/project`

---

### Machine <a name="Machine" id="projen.circleci.Machine"></a>

#### Initializer <a name="Initializer" id="projen.circleci.Machine.Initializer"></a>

```typescript
import { circleci } from 'projen'

const machine: circleci.Machine = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.circleci.Machine.property.image">image</a></code> | <code>string</code> | The VM image to use. |
| <code><a href="#projen.circleci.Machine.property.dockerLayerCaching">dockerLayerCaching</a></code> | <code>string</code> | enable docker layer caching. |

---

##### `image`<sup>Required</sup> <a name="image" id="projen.circleci.Machine.property.image"></a>

```typescript
public readonly image: string;
```

- *Type:* string

The VM image to use.

> [https://circleci.com/docs/2.0/configuration-reference/#available-machine-images](https://circleci.com/docs/2.0/configuration-reference/#available-machine-images)

---

##### `dockerLayerCaching`<sup>Optional</sup> <a name="dockerLayerCaching" id="projen.circleci.Machine.property.dockerLayerCaching"></a>

```typescript
public readonly dockerLayerCaching: string;
```

- *Type:* string

enable docker layer caching.

> [https://circleci.com/docs/2.0/configuration-reference/#available-machine-images](https://circleci.com/docs/2.0/configuration-reference/#available-machine-images)

---

### Macos <a name="Macos" id="projen.circleci.Macos"></a>

CircleCI supports running jobs on macOS, to allow you to build, test, and deploy apps for macOS, iOS, tvOS and watchOS.

To run a job in a macOS virtual machine,
you must add the macos key to the top-level configuration for the job and specify
the version of Xcode you would like to use.

> [https://circleci.com/docs/2.0/configuration-reference/#macos](https://circleci.com/docs/2.0/configuration-reference/#macos)

#### Initializer <a name="Initializer" id="projen.circleci.Macos.Initializer"></a>

```typescript
import { circleci } from 'projen'

const macos: circleci.Macos = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.circleci.Macos.property.xcode">xcode</a></code> | <code>string</code> | The version of Xcode that is installed on the virtual machine. |

---

##### `xcode`<sup>Required</sup> <a name="xcode" id="projen.circleci.Macos.property.xcode"></a>

```typescript
public readonly xcode: string;
```

- *Type:* string

The version of Xcode that is installed on the virtual machine.

---

### Matrix <a name="Matrix" id="projen.circleci.Matrix"></a>

The matrix stanza allows you to run a parameterized job multiple times with different arguments.

> [https://circleci.com/docs/2.0/configuration-reference/#matrix-requires-version-21](https://circleci.com/docs/2.0/configuration-reference/#matrix-requires-version-21)

#### Initializer <a name="Initializer" id="projen.circleci.Matrix.Initializer"></a>

```typescript
import { circleci } from 'projen'

const matrix: circleci.Matrix = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.circleci.Matrix.property.alias">alias</a></code> | <code>string</code> | An alias for the matrix, usable from another job’s requires stanza. |
| <code><a href="#projen.circleci.Matrix.property.parameters">parameters</a></code> | <code>{[ key: string ]: string[] \| number[]}</code> | A map of parameter names to every value the job should be called with. |

---

##### `alias`<sup>Optional</sup> <a name="alias" id="projen.circleci.Matrix.property.alias"></a>

```typescript
public readonly alias: string;
```

- *Type:* string

An alias for the matrix, usable from another job’s requires stanza.

Defaults to the name of the job being executed

---

##### `parameters`<sup>Optional</sup> <a name="parameters" id="projen.circleci.Matrix.property.parameters"></a>

```typescript
public readonly parameters: {[ key: string ]: string[] | number[]};
```

- *Type:* {[ key: string ]: string[] | number[]}

A map of parameter names to every value the job should be called with.

---

### PipelineParameter <a name="PipelineParameter" id="projen.circleci.PipelineParameter"></a>

Parameters are declared by name under a job, command, or executor.

> [https://circleci.com/docs/2.0/reusing-config#using-the-parameters-declaration](https://circleci.com/docs/2.0/reusing-config#using-the-parameters-declaration)

#### Initializer <a name="Initializer" id="projen.circleci.PipelineParameter.Initializer"></a>

```typescript
import { circleci } from 'projen'

const pipelineParameter: circleci.PipelineParameter = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.circleci.PipelineParameter.property.type">type</a></code> | <code><a href="#projen.circleci.PipelineParameterType">PipelineParameterType</a></code> | The parameter type, required. |
| <code><a href="#projen.circleci.PipelineParameter.property.default">default</a></code> | <code>string \| number \| boolean</code> | The default value for the parameter. |
| <code><a href="#projen.circleci.PipelineParameter.property.description">description</a></code> | <code>string</code> | Used to generate documentation for your orb. |

---

##### `type`<sup>Required</sup> <a name="type" id="projen.circleci.PipelineParameter.property.type"></a>

```typescript
public readonly type: PipelineParameterType;
```

- *Type:* <a href="#projen.circleci.PipelineParameterType">PipelineParameterType</a>

The parameter type, required.

---

##### `default`<sup>Optional</sup> <a name="default" id="projen.circleci.PipelineParameter.property.default"></a>

```typescript
public readonly default: string | number | boolean;
```

- *Type:* string | number | boolean

The default value for the parameter.

If not present, the parameter is implied to be required.

---

##### `description`<sup>Optional</sup> <a name="description" id="projen.circleci.PipelineParameter.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

Used to generate documentation for your orb.

---

### Run <a name="Run" id="projen.circleci.Run"></a>

Used for invoking all command-line programs, taking either a map of configuration values, or, when called in its short-form, a string that will be used as both the command and name.

Run commands are executed using non-login shells by default,
so you must explicitly source any dotfiles as part of the command.

Not used because type incompatible types in steps array

> [https://circleci.com/docs/2.0/configuration-reference/#run](https://circleci.com/docs/2.0/configuration-reference/#run)

#### Initializer <a name="Initializer" id="projen.circleci.Run.Initializer"></a>

```typescript
import { circleci } from 'projen'

const run: circleci.Run = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.circleci.Run.property.command">command</a></code> | <code>string</code> | Command to run via the shell. |
| <code><a href="#projen.circleci.Run.property.background">background</a></code> | <code>string</code> | Whether this step should run in the background (default: false). |
| <code><a href="#projen.circleci.Run.property.environment">environment</a></code> | <code>string</code> | Additional environmental variables, locally scoped to command. |
| <code><a href="#projen.circleci.Run.property.name">name</a></code> | <code>string</code> | Title of the step to be shown in the CircleCI UI (default: full command). |
| <code><a href="#projen.circleci.Run.property.noOutputTimeout">noOutputTimeout</a></code> | <code>string</code> | Elapsed time the command can run without output such as “20m”, “1.25h”, “5s”. The default is 10 minutes. |
| <code><a href="#projen.circleci.Run.property.shell">shell</a></code> | <code>string</code> | Shell to use for execution command. |
| <code><a href="#projen.circleci.Run.property.when">when</a></code> | <code>string</code> | Specify when to enable or disable the step. |
| <code><a href="#projen.circleci.Run.property.workingDirectory">workingDirectory</a></code> | <code>string</code> | In which directory to run this step. |

---

##### `command`<sup>Required</sup> <a name="command" id="projen.circleci.Run.property.command"></a>

```typescript
public readonly command: string;
```

- *Type:* string

Command to run via the shell.

---

##### `background`<sup>Optional</sup> <a name="background" id="projen.circleci.Run.property.background"></a>

```typescript
public readonly background: string;
```

- *Type:* string

Whether this step should run in the background (default: false).

---

##### `environment`<sup>Optional</sup> <a name="environment" id="projen.circleci.Run.property.environment"></a>

```typescript
public readonly environment: string;
```

- *Type:* string

Additional environmental variables, locally scoped to command.

---

##### `name`<sup>Optional</sup> <a name="name" id="projen.circleci.Run.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

Title of the step to be shown in the CircleCI UI (default: full command).

---

##### `noOutputTimeout`<sup>Optional</sup> <a name="noOutputTimeout" id="projen.circleci.Run.property.noOutputTimeout"></a>

```typescript
public readonly noOutputTimeout: string;
```

- *Type:* string

Elapsed time the command can run without output such as “20m”, “1.25h”, “5s”. The default is 10 minutes.

---

##### `shell`<sup>Optional</sup> <a name="shell" id="projen.circleci.Run.property.shell"></a>

```typescript
public readonly shell: string;
```

- *Type:* string

Shell to use for execution command.

---

##### `when`<sup>Optional</sup> <a name="when" id="projen.circleci.Run.property.when"></a>

```typescript
public readonly when: string;
```

- *Type:* string

Specify when to enable or disable the step.

---

##### `workingDirectory`<sup>Optional</sup> <a name="workingDirectory" id="projen.circleci.Run.property.workingDirectory"></a>

```typescript
public readonly workingDirectory: string;
```

- *Type:* string

In which directory to run this step.

Will be interpreted relative to the working_directory of the job). (default: .)

---

### Schedule <a name="Schedule" id="projen.circleci.Schedule"></a>

A workflow may have a schedule indicating it runs at a certain time.

> [https://circleci.com/docs/2.0/configuration-reference/#schedule](https://circleci.com/docs/2.0/configuration-reference/#schedule)

#### Initializer <a name="Initializer" id="projen.circleci.Schedule.Initializer"></a>

```typescript
import { circleci } from 'projen'

const schedule: circleci.Schedule = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.circleci.Schedule.property.filters">filters</a></code> | <code><a href="#projen.circleci.Filter">Filter</a></code> | *No description.* |
| <code><a href="#projen.circleci.Schedule.property.cron">cron</a></code> | <code>string</code> | The cron key is defined using POSIX crontab syntax. |

---

##### `filters`<sup>Required</sup> <a name="filters" id="projen.circleci.Schedule.property.filters"></a>

```typescript
public readonly filters: Filter;
```

- *Type:* <a href="#projen.circleci.Filter">Filter</a>

---

##### `cron`<sup>Optional</sup> <a name="cron" id="projen.circleci.Schedule.property.cron"></a>

```typescript
public readonly cron: string;
```

- *Type:* string

The cron key is defined using POSIX crontab syntax.

---

### StepRun <a name="StepRun" id="projen.circleci.StepRun"></a>

Execution steps for Job.

> [https://circleci.com/docs/2.0/configuration-reference/#steps](https://circleci.com/docs/2.0/configuration-reference/#steps)

#### Initializer <a name="Initializer" id="projen.circleci.StepRun.Initializer"></a>

```typescript
import { circleci } from 'projen'

const stepRun: circleci.StepRun = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.circleci.StepRun.property.run">run</a></code> | <code><a href="#projen.circleci.Run">Run</a></code> | *No description.* |

---

##### `run`<sup>Optional</sup> <a name="run" id="projen.circleci.StepRun.property.run"></a>

```typescript
public readonly run: Run;
```

- *Type:* <a href="#projen.circleci.Run">Run</a>

---

### Triggers <a name="Triggers" id="projen.circleci.Triggers"></a>

Specifies which triggers will cause this workflow to be executed.

Default behavior is to trigger the workflow when pushing to a branch.

> [https://circleci.com/docs/2.0/configuration-reference/#triggers](https://circleci.com/docs/2.0/configuration-reference/#triggers)

#### Initializer <a name="Initializer" id="projen.circleci.Triggers.Initializer"></a>

```typescript
import { circleci } from 'projen'

const triggers: circleci.Triggers = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.circleci.Triggers.property.schedule">schedule</a></code> | <code><a href="#projen.circleci.Schedule">Schedule</a></code> | *No description.* |

---

##### `schedule`<sup>Optional</sup> <a name="schedule" id="projen.circleci.Triggers.property.schedule"></a>

```typescript
public readonly schedule: Schedule;
```

- *Type:* <a href="#projen.circleci.Schedule">Schedule</a>

---

### Workflow <a name="Workflow" id="projen.circleci.Workflow"></a>

Used for orchestrating all jobs.

Each workflow consists of the workflow name as a key and a map as a value.
A name should be unique within the current config.yml.
The top-level keys for the Workflows configuration are version and jobs.

> [https://circleci.com/docs/2.0/configuration-reference/#workflows](https://circleci.com/docs/2.0/configuration-reference/#workflows)

#### Initializer <a name="Initializer" id="projen.circleci.Workflow.Initializer"></a>

```typescript
import { circleci } from 'projen'

const workflow: circleci.Workflow = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.circleci.Workflow.property.identifier">identifier</a></code> | <code>string</code> | name of dynamic key *. |
| <code><a href="#projen.circleci.Workflow.property.jobs">jobs</a></code> | <code><a href="#projen.circleci.WorkflowJob">WorkflowJob</a>[]</code> | *No description.* |
| <code><a href="#projen.circleci.Workflow.property.triggers">triggers</a></code> | <code><a href="#projen.circleci.Triggers">Triggers</a>[]</code> | *No description.* |
| <code><a href="#projen.circleci.Workflow.property.when">when</a></code> | <code>any</code> | when is too dynamic to be casted to interfaces. |

---

##### `identifier`<sup>Required</sup> <a name="identifier" id="projen.circleci.Workflow.property.identifier"></a>

```typescript
public readonly identifier: string;
```

- *Type:* string

name of dynamic key *.

---

##### `jobs`<sup>Optional</sup> <a name="jobs" id="projen.circleci.Workflow.property.jobs"></a>

```typescript
public readonly jobs: WorkflowJob[];
```

- *Type:* <a href="#projen.circleci.WorkflowJob">WorkflowJob</a>[]

---

##### `triggers`<sup>Optional</sup> <a name="triggers" id="projen.circleci.Workflow.property.triggers"></a>

```typescript
public readonly triggers: Triggers[];
```

- *Type:* <a href="#projen.circleci.Triggers">Triggers</a>[]

---

##### `when`<sup>Optional</sup> <a name="when" id="projen.circleci.Workflow.property.when"></a>

```typescript
public readonly when: any;
```

- *Type:* any

when is too dynamic to be casted to interfaces.

Check Docu as reference

> [https://circleci.com/docs/2.0/configuration-reference/#logic-statement-examples](https://circleci.com/docs/2.0/configuration-reference/#logic-statement-examples)

---

### WorkflowJob <a name="WorkflowJob" id="projen.circleci.WorkflowJob"></a>

A Job is part of Workflow.

A Job can be created with {@link Job} or it can be provided by the orb

> [https://circleci.com/docs/2.0/configuration-reference/#jobs-in-workflow](https://circleci.com/docs/2.0/configuration-reference/#jobs-in-workflow)

#### Initializer <a name="Initializer" id="projen.circleci.WorkflowJob.Initializer"></a>

```typescript
import { circleci } from 'projen'

const workflowJob: circleci.WorkflowJob = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.circleci.WorkflowJob.property.identifier">identifier</a></code> | <code>string</code> | name of dynamic key *. |
| <code><a href="#projen.circleci.WorkflowJob.property.context">context</a></code> | <code>string[]</code> | The name of the context(s). |
| <code><a href="#projen.circleci.WorkflowJob.property.filters">filters</a></code> | <code><a href="#projen.circleci.Filter">Filter</a></code> | Job Filters can have the key branches or tags. |
| <code><a href="#projen.circleci.WorkflowJob.property.matrix">matrix</a></code> | <code><a href="#projen.circleci.Matrix">Matrix</a></code> | *No description.* |
| <code><a href="#projen.circleci.WorkflowJob.property.name">name</a></code> | <code>string</code> | A replacement for the job name. |
| <code><a href="#projen.circleci.WorkflowJob.property.orbParameters">orbParameters</a></code> | <code>{[ key: string ]: string \| number \| boolean}</code> | Parameters passed to job when referencing a job from orb. |
| <code><a href="#projen.circleci.WorkflowJob.property.requires">requires</a></code> | <code>string[]</code> | A list of jobs that must succeed for the job to start. |
| <code><a href="#projen.circleci.WorkflowJob.property.type">type</a></code> | <code><a href="#projen.circleci.JobType">JobType</a></code> | A job may have a type of approval indicating it must be manually approved before downstream jobs may proceed. |

---

##### `identifier`<sup>Required</sup> <a name="identifier" id="projen.circleci.WorkflowJob.property.identifier"></a>

```typescript
public readonly identifier: string;
```

- *Type:* string

name of dynamic key *.

---

##### `context`<sup>Optional</sup> <a name="context" id="projen.circleci.WorkflowJob.property.context"></a>

```typescript
public readonly context: string[];
```

- *Type:* string[]

The name of the context(s).

The initial default name is org-global. Each context name must be unique.

---

##### `filters`<sup>Optional</sup> <a name="filters" id="projen.circleci.WorkflowJob.property.filters"></a>

```typescript
public readonly filters: Filter;
```

- *Type:* <a href="#projen.circleci.Filter">Filter</a>

Job Filters can have the key branches or tags.

---

##### `matrix`<sup>Optional</sup> <a name="matrix" id="projen.circleci.WorkflowJob.property.matrix"></a>

```typescript
public readonly matrix: Matrix;
```

- *Type:* <a href="#projen.circleci.Matrix">Matrix</a>

---

##### `name`<sup>Optional</sup> <a name="name" id="projen.circleci.WorkflowJob.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

A replacement for the job name.

Useful when calling a job multiple times

---

##### `orbParameters`<sup>Optional</sup> <a name="orbParameters" id="projen.circleci.WorkflowJob.property.orbParameters"></a>

```typescript
public readonly orbParameters: {[ key: string ]: string | number | boolean};
```

- *Type:* {[ key: string ]: string | number | boolean}

Parameters passed to job when referencing a job from orb.

---

##### `requires`<sup>Optional</sup> <a name="requires" id="projen.circleci.WorkflowJob.property.requires"></a>

```typescript
public readonly requires: string[];
```

- *Type:* string[]

A list of jobs that must succeed for the job to start.

---

##### `type`<sup>Optional</sup> <a name="type" id="projen.circleci.WorkflowJob.property.type"></a>

```typescript
public readonly type: JobType;
```

- *Type:* <a href="#projen.circleci.JobType">JobType</a>

A job may have a type of approval indicating it must be manually approved before downstream jobs may proceed.

---



## Enums <a name="Enums" id="Enums"></a>

### JobType <a name="JobType" id="projen.circleci.JobType"></a>

A job may have a type of approval indicating it must be manually approved before downstream jobs may proceed.

> [https://circleci.com/docs/2.0/configuration-reference/#type](https://circleci.com/docs/2.0/configuration-reference/#type)

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.circleci.JobType.APPROVAL">APPROVAL</a></code> | *No description.* |

---

##### `APPROVAL` <a name="APPROVAL" id="projen.circleci.JobType.APPROVAL"></a>

---


### JobWhen <a name="JobWhen" id="projen.circleci.JobWhen"></a>

Specify when to enable or disable the step.

> [https://circleci.com/docs/2.0/configuration-reference/#steps](https://circleci.com/docs/2.0/configuration-reference/#steps)

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.circleci.JobWhen.ALWAYS">ALWAYS</a></code> | *No description.* |
| <code><a href="#projen.circleci.JobWhen.ON_SUCCESS">ON_SUCCESS</a></code> | *No description.* |
| <code><a href="#projen.circleci.JobWhen.ON_FAIL">ON_FAIL</a></code> | *No description.* |

---

##### `ALWAYS` <a name="ALWAYS" id="projen.circleci.JobWhen.ALWAYS"></a>

---


##### `ON_SUCCESS` <a name="ON_SUCCESS" id="projen.circleci.JobWhen.ON_SUCCESS"></a>

---


##### `ON_FAIL` <a name="ON_FAIL" id="projen.circleci.JobWhen.ON_FAIL"></a>

---


### PipelineParameterType <a name="PipelineParameterType" id="projen.circleci.PipelineParameterType"></a>

Pipeline parameter types.

> [https://circleci.com/docs/2.0/reusing-config#parameter-syntax](https://circleci.com/docs/2.0/reusing-config#parameter-syntax)

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.circleci.PipelineParameterType.STRING">STRING</a></code> | *No description.* |
| <code><a href="#projen.circleci.PipelineParameterType.BOOLEAN">BOOLEAN</a></code> | *No description.* |
| <code><a href="#projen.circleci.PipelineParameterType.INTEGER">INTEGER</a></code> | *No description.* |
| <code><a href="#projen.circleci.PipelineParameterType.ENUM">ENUM</a></code> | *No description.* |

---

##### `STRING` <a name="STRING" id="projen.circleci.PipelineParameterType.STRING"></a>

---


##### `BOOLEAN` <a name="BOOLEAN" id="projen.circleci.PipelineParameterType.BOOLEAN"></a>

---


##### `INTEGER` <a name="INTEGER" id="projen.circleci.PipelineParameterType.INTEGER"></a>

---


##### `ENUM` <a name="ENUM" id="projen.circleci.PipelineParameterType.ENUM"></a>

---


### ResourceClass <a name="ResourceClass" id="projen.circleci.ResourceClass"></a>

The resource_class feature allows configuring CPU and RAM resources for each job.

Different resource classes are available for different executors, as described in the tables below.

> [https://circleci.com/docs/2.0/configuration-reference/#resourceclass](https://circleci.com/docs/2.0/configuration-reference/#resourceclass)

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.circleci.ResourceClass.SMALL">SMALL</a></code> | *No description.* |
| <code><a href="#projen.circleci.ResourceClass.MEDIUM">MEDIUM</a></code> | *No description.* |
| <code><a href="#projen.circleci.ResourceClass.MEDIUM_PLUS">MEDIUM_PLUS</a></code> | *No description.* |
| <code><a href="#projen.circleci.ResourceClass.LARGE_X">LARGE_X</a></code> | *No description.* |
| <code><a href="#projen.circleci.ResourceClass.LARGE_2X">LARGE_2X</a></code> | *No description.* |
| <code><a href="#projen.circleci.ResourceClass.LARGE_2X_PLUS">LARGE_2X_PLUS</a></code> | *No description.* |

---

##### `SMALL` <a name="SMALL" id="projen.circleci.ResourceClass.SMALL"></a>

---


##### `MEDIUM` <a name="MEDIUM" id="projen.circleci.ResourceClass.MEDIUM"></a>

---


##### `MEDIUM_PLUS` <a name="MEDIUM_PLUS" id="projen.circleci.ResourceClass.MEDIUM_PLUS"></a>

---


##### `LARGE_X` <a name="LARGE_X" id="projen.circleci.ResourceClass.LARGE_X"></a>

---


##### `LARGE_2X` <a name="LARGE_2X" id="projen.circleci.ResourceClass.LARGE_2X"></a>

---


##### `LARGE_2X_PLUS` <a name="LARGE_2X_PLUS" id="projen.circleci.ResourceClass.LARGE_2X_PLUS"></a>

---

