# `release` Submodule <a name="`release` Submodule" id="projen.release"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### Publisher <a name="Publisher" id="projen.release.Publisher"></a>

Implements GitHub jobs for publishing modules to package managers.

Under the hood, it uses https://github.com/aws/publib

#### Initializers <a name="Initializers" id="projen.release.Publisher.Initializer"></a>

```typescript
import { release } from 'projen'

new release.Publisher(project: Project, options: PublisherOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.release.Publisher.Initializer.parameter.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.release.Publisher.Initializer.parameter.options">options</a></code> | <code><a href="#projen.release.PublisherOptions">PublisherOptions</a></code> | *No description.* |

---

##### `project`<sup>Required</sup> <a name="project" id="projen.release.Publisher.Initializer.parameter.project"></a>

- *Type:* projen.Project

---

##### `options`<sup>Required</sup> <a name="options" id="projen.release.Publisher.Initializer.parameter.options"></a>

- *Type:* <a href="#projen.release.PublisherOptions">PublisherOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.release.Publisher.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen.release.Publisher.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen.release.Publisher.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen.release.Publisher.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |
| <code><a href="#projen.release.Publisher.addGitHubPostPublishingSteps">addGitHubPostPublishingSteps</a></code> | Adds post publishing steps for the GitHub release job. |
| <code><a href="#projen.release.Publisher.addGitHubPrePublishingSteps">addGitHubPrePublishingSteps</a></code> | Adds pre publishing steps for the GitHub release job. |
| <code><a href="#projen.release.Publisher.publishToGit">publishToGit</a></code> | Publish to git. |
| <code><a href="#projen.release.Publisher.publishToGitHubReleases">publishToGitHubReleases</a></code> | Creates a GitHub Release. |
| <code><a href="#projen.release.Publisher.publishToGo">publishToGo</a></code> | Adds a go publishing job. |
| <code><a href="#projen.release.Publisher.publishToMaven">publishToMaven</a></code> | Publishes artifacts from `java/**` to Maven. |
| <code><a href="#projen.release.Publisher.publishToNpm">publishToNpm</a></code> | Publishes artifacts from `js/**` to npm. |
| <code><a href="#projen.release.Publisher.publishToNuget">publishToNuget</a></code> | Publishes artifacts from `dotnet/**` to NuGet Gallery. |
| <code><a href="#projen.release.Publisher.publishToPyPi">publishToPyPi</a></code> | Publishes wheel artifacts from `python` to PyPI. |

---

##### `toString` <a name="toString" id="projen.release.Publisher.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `postSynthesize` <a name="postSynthesize" id="projen.release.Publisher.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen.release.Publisher.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `synthesize` <a name="synthesize" id="projen.release.Publisher.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

##### `addGitHubPostPublishingSteps` <a name="addGitHubPostPublishingSteps" id="projen.release.Publisher.addGitHubPostPublishingSteps"></a>

```typescript
public addGitHubPostPublishingSteps(steps: JobStep): void
```

Adds post publishing steps for the GitHub release job.

###### `steps`<sup>Required</sup> <a name="steps" id="projen.release.Publisher.addGitHubPostPublishingSteps.parameter.steps"></a>

- *Type:* projen.github.workflows.JobStep

The steps.

---

##### `addGitHubPrePublishingSteps` <a name="addGitHubPrePublishingSteps" id="projen.release.Publisher.addGitHubPrePublishingSteps"></a>

```typescript
public addGitHubPrePublishingSteps(steps: JobStep): void
```

Adds pre publishing steps for the GitHub release job.

###### `steps`<sup>Required</sup> <a name="steps" id="projen.release.Publisher.addGitHubPrePublishingSteps.parameter.steps"></a>

- *Type:* projen.github.workflows.JobStep

The steps.

---

##### `publishToGit` <a name="publishToGit" id="projen.release.Publisher.publishToGit"></a>

```typescript
public publishToGit(options: GitPublishOptions): Task
```

Publish to git.

This includes generating a project-level changelog and release tags.

###### `options`<sup>Required</sup> <a name="options" id="projen.release.Publisher.publishToGit.parameter.options"></a>

- *Type:* <a href="#projen.release.GitPublishOptions">GitPublishOptions</a>

Options.

---

##### `publishToGitHubReleases` <a name="publishToGitHubReleases" id="projen.release.Publisher.publishToGitHubReleases"></a>

```typescript
public publishToGitHubReleases(options: GitHubReleasesPublishOptions): void
```

Creates a GitHub Release.

###### `options`<sup>Required</sup> <a name="options" id="projen.release.Publisher.publishToGitHubReleases.parameter.options"></a>

- *Type:* <a href="#projen.release.GitHubReleasesPublishOptions">GitHubReleasesPublishOptions</a>

Options.

---

##### `publishToGo` <a name="publishToGo" id="projen.release.Publisher.publishToGo"></a>

```typescript
public publishToGo(options?: GoPublishOptions): void
```

Adds a go publishing job.

###### `options`<sup>Optional</sup> <a name="options" id="projen.release.Publisher.publishToGo.parameter.options"></a>

- *Type:* <a href="#projen.release.GoPublishOptions">GoPublishOptions</a>

Options.

---

##### `publishToMaven` <a name="publishToMaven" id="projen.release.Publisher.publishToMaven"></a>

```typescript
public publishToMaven(options?: MavenPublishOptions): void
```

Publishes artifacts from `java/**` to Maven.

###### `options`<sup>Optional</sup> <a name="options" id="projen.release.Publisher.publishToMaven.parameter.options"></a>

- *Type:* <a href="#projen.release.MavenPublishOptions">MavenPublishOptions</a>

Options.

---

##### `publishToNpm` <a name="publishToNpm" id="projen.release.Publisher.publishToNpm"></a>

```typescript
public publishToNpm(options?: NpmPublishOptions): void
```

Publishes artifacts from `js/**` to npm.

###### `options`<sup>Optional</sup> <a name="options" id="projen.release.Publisher.publishToNpm.parameter.options"></a>

- *Type:* <a href="#projen.release.NpmPublishOptions">NpmPublishOptions</a>

Options.

---

##### `publishToNuget` <a name="publishToNuget" id="projen.release.Publisher.publishToNuget"></a>

```typescript
public publishToNuget(options?: NugetPublishOptions): void
```

Publishes artifacts from `dotnet/**` to NuGet Gallery.

###### `options`<sup>Optional</sup> <a name="options" id="projen.release.Publisher.publishToNuget.parameter.options"></a>

- *Type:* <a href="#projen.release.NugetPublishOptions">NugetPublishOptions</a>

Options.

---

##### `publishToPyPi` <a name="publishToPyPi" id="projen.release.Publisher.publishToPyPi"></a>

```typescript
public publishToPyPi(options?: PyPiPublishOptions): void
```

Publishes wheel artifacts from `python` to PyPI.

###### `options`<sup>Optional</sup> <a name="options" id="projen.release.Publisher.publishToPyPi.parameter.options"></a>

- *Type:* <a href="#projen.release.PyPiPublishOptions">PyPiPublishOptions</a>

Options.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.release.Publisher.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen.release.Publisher.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="projen.release.Publisher.isConstruct"></a>

```typescript
import { release } from 'projen'

release.Publisher.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="projen.release.Publisher.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen.release.Publisher.isComponent"></a>

```typescript
import { release } from 'projen'

release.Publisher.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen.release.Publisher.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.release.Publisher.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen.release.Publisher.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.release.Publisher.property.artifactName">artifactName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.release.Publisher.property.buildJobId">buildJobId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.release.Publisher.property.jsiiReleaseVersion">jsiiReleaseVersion</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.release.Publisher.property.publibVersion">publibVersion</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.release.Publisher.property.condition">condition</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="projen.release.Publisher.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen.release.Publisher.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---

##### `artifactName`<sup>Required</sup> <a name="artifactName" id="projen.release.Publisher.property.artifactName"></a>

```typescript
public readonly artifactName: string;
```

- *Type:* string

---

##### `buildJobId`<sup>Required</sup> <a name="buildJobId" id="projen.release.Publisher.property.buildJobId"></a>

```typescript
public readonly buildJobId: string;
```

- *Type:* string

---

##### ~~`jsiiReleaseVersion`~~<sup>Required</sup> <a name="jsiiReleaseVersion" id="projen.release.Publisher.property.jsiiReleaseVersion"></a>

- *Deprecated:* use `publibVersion`

```typescript
public readonly jsiiReleaseVersion: string;
```

- *Type:* string

---

##### `publibVersion`<sup>Required</sup> <a name="publibVersion" id="projen.release.Publisher.property.publibVersion"></a>

```typescript
public readonly publibVersion: string;
```

- *Type:* string

---

##### `condition`<sup>Optional</sup> <a name="condition" id="projen.release.Publisher.property.condition"></a>

```typescript
public readonly condition: string;
```

- *Type:* string

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.release.Publisher.property.PUBLISH_GIT_TASK_NAME">PUBLISH_GIT_TASK_NAME</a></code> | <code>string</code> | *No description.* |

---

##### `PUBLISH_GIT_TASK_NAME`<sup>Required</sup> <a name="PUBLISH_GIT_TASK_NAME" id="projen.release.Publisher.property.PUBLISH_GIT_TASK_NAME"></a>

```typescript
public readonly PUBLISH_GIT_TASK_NAME: string;
```

- *Type:* string

---

### Release <a name="Release" id="projen.release.Release"></a>

Manages releases (currently through GitHub workflows).

By default, no branches are released. To add branches, call `addBranch()`.

#### Initializers <a name="Initializers" id="projen.release.Release.Initializer"></a>

```typescript
import { release } from 'projen'

new release.Release(scope: IConstruct, options: ReleaseOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.release.Release.Initializer.parameter.scope">scope</a></code> | <code>constructs.IConstruct</code> | should be part of the project the Release belongs to. |
| <code><a href="#projen.release.Release.Initializer.parameter.options">options</a></code> | <code><a href="#projen.release.ReleaseOptions">ReleaseOptions</a></code> | options to configure the Release Component. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="projen.release.Release.Initializer.parameter.scope"></a>

- *Type:* constructs.IConstruct

should be part of the project the Release belongs to.

---

##### `options`<sup>Required</sup> <a name="options" id="projen.release.Release.Initializer.parameter.options"></a>

- *Type:* <a href="#projen.release.ReleaseOptions">ReleaseOptions</a>

options to configure the Release Component.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.release.Release.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen.release.Release.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen.release.Release.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen.release.Release.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |
| <code><a href="#projen.release.Release.addBranch">addBranch</a></code> | Adds a release branch. |
| <code><a href="#projen.release.Release.addJobs">addJobs</a></code> | Adds jobs to all release workflows. |

---

##### `toString` <a name="toString" id="projen.release.Release.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `postSynthesize` <a name="postSynthesize" id="projen.release.Release.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen.release.Release.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `synthesize` <a name="synthesize" id="projen.release.Release.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

##### `addBranch` <a name="addBranch" id="projen.release.Release.addBranch"></a>

```typescript
public addBranch(branch: string, options: BranchOptions): void
```

Adds a release branch.

It is a git branch from which releases are published. If a project has more than one release
branch, we require that `majorVersion` is also specified for the primary branch in order to
ensure branches always release the correct version.

###### `branch`<sup>Required</sup> <a name="branch" id="projen.release.Release.addBranch.parameter.branch"></a>

- *Type:* string

The branch to monitor (e.g. `main`, `v2.x`).

---

###### `options`<sup>Required</sup> <a name="options" id="projen.release.Release.addBranch.parameter.options"></a>

- *Type:* <a href="#projen.release.BranchOptions">BranchOptions</a>

Branch definition.

---

##### `addJobs` <a name="addJobs" id="projen.release.Release.addJobs"></a>

```typescript
public addJobs(jobs: {[ key: string ]: Job}): void
```

Adds jobs to all release workflows.

###### `jobs`<sup>Required</sup> <a name="jobs" id="projen.release.Release.addJobs.parameter.jobs"></a>

- *Type:* {[ key: string ]: projen.github.workflows.Job}

The jobs to add (name => job).

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.release.Release.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen.release.Release.isComponent">isComponent</a></code> | Test whether the given construct is a component. |
| <code><a href="#projen.release.Release.of">of</a></code> | Returns the `Release` component of a project or `undefined` if the project does not have a Release component. |

---

##### `isConstruct` <a name="isConstruct" id="projen.release.Release.isConstruct"></a>

```typescript
import { release } from 'projen'

release.Release.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="projen.release.Release.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen.release.Release.isComponent"></a>

```typescript
import { release } from 'projen'

release.Release.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen.release.Release.isComponent.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="projen.release.Release.of"></a>

```typescript
import { release } from 'projen'

release.Release.of(project: Project)
```

Returns the `Release` component of a project or `undefined` if the project does not have a Release component.

###### `project`<sup>Required</sup> <a name="project" id="projen.release.Release.of.parameter.project"></a>

- *Type:* projen.Project

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.release.Release.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen.release.Release.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.release.Release.property.artifactsDirectory">artifactsDirectory</a></code> | <code>string</code> | Location of build artifacts. |
| <code><a href="#projen.release.Release.property.branches">branches</a></code> | <code>string[]</code> | Retrieve all release branch names. |
| <code><a href="#projen.release.Release.property.publisher">publisher</a></code> | <code><a href="#projen.release.Publisher">Publisher</a></code> | Package publisher. |

---

##### `node`<sup>Required</sup> <a name="node" id="projen.release.Release.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen.release.Release.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---

##### `artifactsDirectory`<sup>Required</sup> <a name="artifactsDirectory" id="projen.release.Release.property.artifactsDirectory"></a>

```typescript
public readonly artifactsDirectory: string;
```

- *Type:* string

Location of build artifacts.

---

##### `branches`<sup>Required</sup> <a name="branches" id="projen.release.Release.property.branches"></a>

```typescript
public readonly branches: string[];
```

- *Type:* string[]

Retrieve all release branch names.

---

##### `publisher`<sup>Required</sup> <a name="publisher" id="projen.release.Release.property.publisher"></a>

```typescript
public readonly publisher: Publisher;
```

- *Type:* <a href="#projen.release.Publisher">Publisher</a>

Package publisher.

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.release.Release.property.ANTI_TAMPER_CMD">ANTI_TAMPER_CMD</a></code> | <code>string</code> | *No description.* |

---

##### `ANTI_TAMPER_CMD`<sup>Required</sup> <a name="ANTI_TAMPER_CMD" id="projen.release.Release.property.ANTI_TAMPER_CMD"></a>

```typescript
public readonly ANTI_TAMPER_CMD: string;
```

- *Type:* string

---

## Structs <a name="Structs" id="Structs"></a>

### BranchOptions <a name="BranchOptions" id="projen.release.BranchOptions"></a>

Options for a release branch.

#### Initializer <a name="Initializer" id="projen.release.BranchOptions.Initializer"></a>

```typescript
import { release } from 'projen'

const branchOptions: release.BranchOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.release.BranchOptions.property.majorVersion">majorVersion</a></code> | <code>number</code> | The major versions released from this branch. |
| <code><a href="#projen.release.BranchOptions.property.minMajorVersion">minMajorVersion</a></code> | <code>number</code> | The minimum major version to release. |
| <code><a href="#projen.release.BranchOptions.property.minorVersion">minorVersion</a></code> | <code>number</code> | The minor versions released from this branch. |
| <code><a href="#projen.release.BranchOptions.property.npmDistTag">npmDistTag</a></code> | <code>string</code> | The npm distribution tag to use for this branch. |
| <code><a href="#projen.release.BranchOptions.property.prerelease">prerelease</a></code> | <code>string</code> | Bump the version as a pre-release tag. |
| <code><a href="#projen.release.BranchOptions.property.tagPrefix">tagPrefix</a></code> | <code>string</code> | Automatically add the given prefix to release tags. Useful if you are releasing on multiple branches with overlapping version numbers. |
| <code><a href="#projen.release.BranchOptions.property.workflowName">workflowName</a></code> | <code>string</code> | The name of the release workflow. |

---

##### `majorVersion`<sup>Required</sup> <a name="majorVersion" id="projen.release.BranchOptions.property.majorVersion"></a>

```typescript
public readonly majorVersion: number;
```

- *Type:* number

The major versions released from this branch.

---

##### `minMajorVersion`<sup>Optional</sup> <a name="minMajorVersion" id="projen.release.BranchOptions.property.minMajorVersion"></a>

```typescript
public readonly minMajorVersion: number;
```

- *Type:* number

The minimum major version to release.

---

##### `minorVersion`<sup>Optional</sup> <a name="minorVersion" id="projen.release.BranchOptions.property.minorVersion"></a>

```typescript
public readonly minorVersion: number;
```

- *Type:* number

The minor versions released from this branch.

---

##### `npmDistTag`<sup>Optional</sup> <a name="npmDistTag" id="projen.release.BranchOptions.property.npmDistTag"></a>

```typescript
public readonly npmDistTag: string;
```

- *Type:* string
- *Default:* "latest"

The npm distribution tag to use for this branch.

---

##### `prerelease`<sup>Optional</sup> <a name="prerelease" id="projen.release.BranchOptions.property.prerelease"></a>

```typescript
public readonly prerelease: string;
```

- *Type:* string
- *Default:* normal releases

Bump the version as a pre-release tag.

---

##### `tagPrefix`<sup>Optional</sup> <a name="tagPrefix" id="projen.release.BranchOptions.property.tagPrefix"></a>

```typescript
public readonly tagPrefix: string;
```

- *Type:* string
- *Default:* no prefix

Automatically add the given prefix to release tags. Useful if you are releasing on multiple branches with overlapping version numbers.

Note: this prefix is used to detect the latest tagged version
when bumping, so if you change this on a project with an existing version
history, you may need to manually tag your latest release
with the new prefix.

---

##### `workflowName`<sup>Optional</sup> <a name="workflowName" id="projen.release.BranchOptions.property.workflowName"></a>

```typescript
public readonly workflowName: string;
```

- *Type:* string
- *Default:* "release-BRANCH"

The name of the release workflow.

---

### CodeArtifactOptions <a name="CodeArtifactOptions" id="projen.release.CodeArtifactOptions"></a>

Options for publishing packages to AWS CodeArtifact.

#### Initializer <a name="Initializer" id="projen.release.CodeArtifactOptions.Initializer"></a>

```typescript
import { release } from 'projen'

const codeArtifactOptions: release.CodeArtifactOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.release.CodeArtifactOptions.property.accessKeyIdSecret">accessKeyIdSecret</a></code> | <code>string</code> | GitHub secret which contains the AWS access key ID to use when publishing packages to AWS CodeArtifact. |
| <code><a href="#projen.release.CodeArtifactOptions.property.authProvider">authProvider</a></code> | <code><a href="#projen.release.CodeArtifactAuthProvider">CodeArtifactAuthProvider</a></code> | Provider to use for authorizing requests to AWS CodeArtifact. |
| <code><a href="#projen.release.CodeArtifactOptions.property.roleToAssume">roleToAssume</a></code> | <code>string</code> | ARN of AWS role to be assumed prior to get authorization token from AWS CodeArtifact This property must be specified only when publishing to AWS CodeArtifact (`registry` contains AWS CodeArtifact URL). |
| <code><a href="#projen.release.CodeArtifactOptions.property.secretAccessKeySecret">secretAccessKeySecret</a></code> | <code>string</code> | GitHub secret which contains the AWS secret access key to use when publishing packages to AWS CodeArtifact. |

---

##### `accessKeyIdSecret`<sup>Optional</sup> <a name="accessKeyIdSecret" id="projen.release.CodeArtifactOptions.property.accessKeyIdSecret"></a>

```typescript
public readonly accessKeyIdSecret: string;
```

- *Type:* string
- *Default:* When the `authProvider` value is set to `CodeArtifactAuthProvider.ACCESS_AND_SECRET_KEY_PAIR`, the default is "AWS_ACCESS_KEY_ID". For `CodeArtifactAuthProvider.GITHUB_OIDC`, this value must be left undefined.

GitHub secret which contains the AWS access key ID to use when publishing packages to AWS CodeArtifact.

This property must be specified only when publishing to AWS CodeArtifact (`npmRegistryUrl` contains AWS CodeArtifact URL).

---

##### `authProvider`<sup>Optional</sup> <a name="authProvider" id="projen.release.CodeArtifactOptions.property.authProvider"></a>

```typescript
public readonly authProvider: CodeArtifactAuthProvider;
```

- *Type:* <a href="#projen.release.CodeArtifactAuthProvider">CodeArtifactAuthProvider</a>
- *Default:* CodeArtifactAuthProvider.ACCESS_AND_SECRET_KEY_PAIR

Provider to use for authorizing requests to AWS CodeArtifact.

---

##### `roleToAssume`<sup>Optional</sup> <a name="roleToAssume" id="projen.release.CodeArtifactOptions.property.roleToAssume"></a>

```typescript
public readonly roleToAssume: string;
```

- *Type:* string
- *Default:* undefined

ARN of AWS role to be assumed prior to get authorization token from AWS CodeArtifact This property must be specified only when publishing to AWS CodeArtifact (`registry` contains AWS CodeArtifact URL).

When using the `CodeArtifactAuthProvider.GITHUB_OIDC` auth provider, this value must be defined.

---

##### `secretAccessKeySecret`<sup>Optional</sup> <a name="secretAccessKeySecret" id="projen.release.CodeArtifactOptions.property.secretAccessKeySecret"></a>

```typescript
public readonly secretAccessKeySecret: string;
```

- *Type:* string
- *Default:* When the `authProvider` value is set to `CodeArtifactAuthProvider.ACCESS_AND_SECRET_KEY_PAIR`, the default is "AWS_SECRET_ACCESS_KEY". For `CodeArtifactAuthProvider.GITHUB_OIDC`, this value must be left undefined.

GitHub secret which contains the AWS secret access key to use when publishing packages to AWS CodeArtifact.

This property must be specified only when publishing to AWS CodeArtifact (`npmRegistryUrl` contains AWS CodeArtifact URL).

---

### CommonPublishOptions <a name="CommonPublishOptions" id="projen.release.CommonPublishOptions"></a>

Common publishing options.

#### Initializer <a name="Initializer" id="projen.release.CommonPublishOptions.Initializer"></a>

```typescript
import { release } from 'projen'

const commonPublishOptions: release.CommonPublishOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.release.CommonPublishOptions.property.postPublishSteps">postPublishSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | Steps to execute after executing the publishing command. |
| <code><a href="#projen.release.CommonPublishOptions.property.prePublishSteps">prePublishSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | Steps to execute before executing the publishing command. These can be used to prepare the artifact for publishing if neede. |
| <code><a href="#projen.release.CommonPublishOptions.property.publishTools">publishTools</a></code> | <code>projen.github.workflows.Tools</code> | Additional tools to install in the publishing job. |

---

##### `postPublishSteps`<sup>Optional</sup> <a name="postPublishSteps" id="projen.release.CommonPublishOptions.property.postPublishSteps"></a>

```typescript
public readonly postPublishSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]

Steps to execute after executing the publishing command.

These can be used
to add/update the release artifacts ot any other tasks needed.


Note that when using this in `publishToGitHubReleases` this will override steps added via `addGitHubPostPublishingSteps`.

---

##### `prePublishSteps`<sup>Optional</sup> <a name="prePublishSteps" id="projen.release.CommonPublishOptions.property.prePublishSteps"></a>

```typescript
public readonly prePublishSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]

Steps to execute before executing the publishing command. These can be used to prepare the artifact for publishing if neede.

These steps are executed after `dist/` has been populated with the build
output.

Note that when using this in `publishToGitHubReleases` this will override steps added via `addGitHubPrePublishingSteps`.

---

##### `publishTools`<sup>Optional</sup> <a name="publishTools" id="projen.release.CommonPublishOptions.property.publishTools"></a>

```typescript
public readonly publishTools: Tools;
```

- *Type:* projen.github.workflows.Tools
- *Default:* no additional tools are installed

Additional tools to install in the publishing job.

---

### ContinuousReleaseOptions <a name="ContinuousReleaseOptions" id="projen.release.ContinuousReleaseOptions"></a>

#### Initializer <a name="Initializer" id="projen.release.ContinuousReleaseOptions.Initializer"></a>

```typescript
import { release } from 'projen'

const continuousReleaseOptions: release.ContinuousReleaseOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.release.ContinuousReleaseOptions.property.paths">paths</a></code> | <code>string[]</code> | Paths for which pushes should trigger a release. |

---

##### `paths`<sup>Optional</sup> <a name="paths" id="projen.release.ContinuousReleaseOptions.property.paths"></a>

```typescript
public readonly paths: string[];
```

- *Type:* string[]

Paths for which pushes should trigger a release.

---

### GitHubReleasesPublishOptions <a name="GitHubReleasesPublishOptions" id="projen.release.GitHubReleasesPublishOptions"></a>

Publishing options for GitHub releases.

#### Initializer <a name="Initializer" id="projen.release.GitHubReleasesPublishOptions.Initializer"></a>

```typescript
import { release } from 'projen'

const gitHubReleasesPublishOptions: release.GitHubReleasesPublishOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.release.GitHubReleasesPublishOptions.property.postPublishSteps">postPublishSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | Steps to execute after executing the publishing command. |
| <code><a href="#projen.release.GitHubReleasesPublishOptions.property.prePublishSteps">prePublishSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | Steps to execute before executing the publishing command. These can be used to prepare the artifact for publishing if neede. |
| <code><a href="#projen.release.GitHubReleasesPublishOptions.property.publishTools">publishTools</a></code> | <code>projen.github.workflows.Tools</code> | Additional tools to install in the publishing job. |
| <code><a href="#projen.release.GitHubReleasesPublishOptions.property.changelogFile">changelogFile</a></code> | <code>string</code> | The location of an .md file (relative to `dist/`) that includes the changelog for the release. |
| <code><a href="#projen.release.GitHubReleasesPublishOptions.property.releaseTagFile">releaseTagFile</a></code> | <code>string</code> | The location of a text file (relative to `dist/`) that contains the release tag. |
| <code><a href="#projen.release.GitHubReleasesPublishOptions.property.versionFile">versionFile</a></code> | <code>string</code> | The location of a text file (relative to `dist/`) that contains the version number. |

---

##### `postPublishSteps`<sup>Optional</sup> <a name="postPublishSteps" id="projen.release.GitHubReleasesPublishOptions.property.postPublishSteps"></a>

```typescript
public readonly postPublishSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]

Steps to execute after executing the publishing command.

These can be used
to add/update the release artifacts ot any other tasks needed.


Note that when using this in `publishToGitHubReleases` this will override steps added via `addGitHubPostPublishingSteps`.

---

##### `prePublishSteps`<sup>Optional</sup> <a name="prePublishSteps" id="projen.release.GitHubReleasesPublishOptions.property.prePublishSteps"></a>

```typescript
public readonly prePublishSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]

Steps to execute before executing the publishing command. These can be used to prepare the artifact for publishing if neede.

These steps are executed after `dist/` has been populated with the build
output.

Note that when using this in `publishToGitHubReleases` this will override steps added via `addGitHubPrePublishingSteps`.

---

##### `publishTools`<sup>Optional</sup> <a name="publishTools" id="projen.release.GitHubReleasesPublishOptions.property.publishTools"></a>

```typescript
public readonly publishTools: Tools;
```

- *Type:* projen.github.workflows.Tools
- *Default:* no additional tools are installed

Additional tools to install in the publishing job.

---

##### `changelogFile`<sup>Required</sup> <a name="changelogFile" id="projen.release.GitHubReleasesPublishOptions.property.changelogFile"></a>

```typescript
public readonly changelogFile: string;
```

- *Type:* string

The location of an .md file (relative to `dist/`) that includes the changelog for the release.

---

*Example*

```typescript
changelog.md
```


##### `releaseTagFile`<sup>Required</sup> <a name="releaseTagFile" id="projen.release.GitHubReleasesPublishOptions.property.releaseTagFile"></a>

```typescript
public readonly releaseTagFile: string;
```

- *Type:* string

The location of a text file (relative to `dist/`) that contains the release tag.

---

*Example*

```typescript
releasetag.txt
```


##### `versionFile`<sup>Required</sup> <a name="versionFile" id="projen.release.GitHubReleasesPublishOptions.property.versionFile"></a>

```typescript
public readonly versionFile: string;
```

- *Type:* string

The location of a text file (relative to `dist/`) that contains the version number.

---

*Example*

```typescript
version.txt
```


### GitPublishOptions <a name="GitPublishOptions" id="projen.release.GitPublishOptions"></a>

Publishing options for Git releases.

#### Initializer <a name="Initializer" id="projen.release.GitPublishOptions.Initializer"></a>

```typescript
import { release } from 'projen'

const gitPublishOptions: release.GitPublishOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.release.GitPublishOptions.property.changelogFile">changelogFile</a></code> | <code>string</code> | The location of an .md file (relative to `dist/`) that includes the changelog for the release. |
| <code><a href="#projen.release.GitPublishOptions.property.releaseTagFile">releaseTagFile</a></code> | <code>string</code> | The location of a text file (relative to `dist/`) that contains the release tag. |
| <code><a href="#projen.release.GitPublishOptions.property.versionFile">versionFile</a></code> | <code>string</code> | The location of a text file (relative to `dist/`) that contains the version number. |
| <code><a href="#projen.release.GitPublishOptions.property.gitBranch">gitBranch</a></code> | <code>string</code> | Branch to push to. |
| <code><a href="#projen.release.GitPublishOptions.property.gitPushCommand">gitPushCommand</a></code> | <code>string</code> | Override git-push command. |
| <code><a href="#projen.release.GitPublishOptions.property.projectChangelogFile">projectChangelogFile</a></code> | <code>string</code> | The location of an .md file that includes the project-level changelog. |

---

##### `changelogFile`<sup>Required</sup> <a name="changelogFile" id="projen.release.GitPublishOptions.property.changelogFile"></a>

```typescript
public readonly changelogFile: string;
```

- *Type:* string

The location of an .md file (relative to `dist/`) that includes the changelog for the release.

---

*Example*

```typescript
changelog.md
```


##### `releaseTagFile`<sup>Required</sup> <a name="releaseTagFile" id="projen.release.GitPublishOptions.property.releaseTagFile"></a>

```typescript
public readonly releaseTagFile: string;
```

- *Type:* string

The location of a text file (relative to `dist/`) that contains the release tag.

---

*Example*

```typescript
releasetag.txt
```


##### `versionFile`<sup>Required</sup> <a name="versionFile" id="projen.release.GitPublishOptions.property.versionFile"></a>

```typescript
public readonly versionFile: string;
```

- *Type:* string

The location of a text file (relative to `dist/`) that contains the version number.

---

*Example*

```typescript
version.txt
```


##### `gitBranch`<sup>Optional</sup> <a name="gitBranch" id="projen.release.GitPublishOptions.property.gitBranch"></a>

```typescript
public readonly gitBranch: string;
```

- *Type:* string
- *Default:* "main"

Branch to push to.

---

##### `gitPushCommand`<sup>Optional</sup> <a name="gitPushCommand" id="projen.release.GitPublishOptions.property.gitPushCommand"></a>

```typescript
public readonly gitPushCommand: string;
```

- *Type:* string

Override git-push command.

Set to an empty string to disable pushing.

---

##### `projectChangelogFile`<sup>Optional</sup> <a name="projectChangelogFile" id="projen.release.GitPublishOptions.property.projectChangelogFile"></a>

```typescript
public readonly projectChangelogFile: string;
```

- *Type:* string

The location of an .md file that includes the project-level changelog.

---

### GoPublishOptions <a name="GoPublishOptions" id="projen.release.GoPublishOptions"></a>

Options for Go releases.

#### Initializer <a name="Initializer" id="projen.release.GoPublishOptions.Initializer"></a>

```typescript
import { release } from 'projen'

const goPublishOptions: release.GoPublishOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.release.GoPublishOptions.property.postPublishSteps">postPublishSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | Steps to execute after executing the publishing command. |
| <code><a href="#projen.release.GoPublishOptions.property.prePublishSteps">prePublishSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | Steps to execute before executing the publishing command. These can be used to prepare the artifact for publishing if neede. |
| <code><a href="#projen.release.GoPublishOptions.property.publishTools">publishTools</a></code> | <code>projen.github.workflows.Tools</code> | Additional tools to install in the publishing job. |
| <code><a href="#projen.release.GoPublishOptions.property.gitBranch">gitBranch</a></code> | <code>string</code> | Branch to push to. |
| <code><a href="#projen.release.GoPublishOptions.property.gitCommitMessage">gitCommitMessage</a></code> | <code>string</code> | The commit message. |
| <code><a href="#projen.release.GoPublishOptions.property.githubDeployKeySecret">githubDeployKeySecret</a></code> | <code>string</code> | The name of the secret that includes a GitHub deploy key used to push to the GitHub repository. |
| <code><a href="#projen.release.GoPublishOptions.property.githubRepo">githubRepo</a></code> | <code>string</code> | GitHub repository to push to. |
| <code><a href="#projen.release.GoPublishOptions.property.githubTokenSecret">githubTokenSecret</a></code> | <code>string</code> | The name of the secret that includes a personal GitHub access token used to push to the GitHub repository. |
| <code><a href="#projen.release.GoPublishOptions.property.githubUseSsh">githubUseSsh</a></code> | <code>boolean</code> | Use SSH to push to GitHub instead of a personal accses token. |
| <code><a href="#projen.release.GoPublishOptions.property.gitUserEmail">gitUserEmail</a></code> | <code>string</code> | The email to use in the release git commit. |
| <code><a href="#projen.release.GoPublishOptions.property.gitUserName">gitUserName</a></code> | <code>string</code> | The user name to use for the release git commit. |

---

##### `postPublishSteps`<sup>Optional</sup> <a name="postPublishSteps" id="projen.release.GoPublishOptions.property.postPublishSteps"></a>

```typescript
public readonly postPublishSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]

Steps to execute after executing the publishing command.

These can be used
to add/update the release artifacts ot any other tasks needed.


Note that when using this in `publishToGitHubReleases` this will override steps added via `addGitHubPostPublishingSteps`.

---

##### `prePublishSteps`<sup>Optional</sup> <a name="prePublishSteps" id="projen.release.GoPublishOptions.property.prePublishSteps"></a>

```typescript
public readonly prePublishSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]

Steps to execute before executing the publishing command. These can be used to prepare the artifact for publishing if neede.

These steps are executed after `dist/` has been populated with the build
output.

Note that when using this in `publishToGitHubReleases` this will override steps added via `addGitHubPrePublishingSteps`.

---

##### `publishTools`<sup>Optional</sup> <a name="publishTools" id="projen.release.GoPublishOptions.property.publishTools"></a>

```typescript
public readonly publishTools: Tools;
```

- *Type:* projen.github.workflows.Tools
- *Default:* no additional tools are installed

Additional tools to install in the publishing job.

---

##### `gitBranch`<sup>Optional</sup> <a name="gitBranch" id="projen.release.GoPublishOptions.property.gitBranch"></a>

```typescript
public readonly gitBranch: string;
```

- *Type:* string
- *Default:* "main"

Branch to push to.

---

##### `gitCommitMessage`<sup>Optional</sup> <a name="gitCommitMessage" id="projen.release.GoPublishOptions.property.gitCommitMessage"></a>

```typescript
public readonly gitCommitMessage: string;
```

- *Type:* string
- *Default:* "chore(release): $VERSION"

The commit message.

---

##### `githubDeployKeySecret`<sup>Optional</sup> <a name="githubDeployKeySecret" id="projen.release.GoPublishOptions.property.githubDeployKeySecret"></a>

```typescript
public readonly githubDeployKeySecret: string;
```

- *Type:* string
- *Default:* "GO_GITHUB_DEPLOY_KEY"

The name of the secret that includes a GitHub deploy key used to push to the GitHub repository.

Ignored if `githubUseSsh` is `false`.

---

##### `githubRepo`<sup>Optional</sup> <a name="githubRepo" id="projen.release.GoPublishOptions.property.githubRepo"></a>

```typescript
public readonly githubRepo: string;
```

- *Type:* string
- *Default:* derived from `moduleName`

GitHub repository to push to.

---

##### `githubTokenSecret`<sup>Optional</sup> <a name="githubTokenSecret" id="projen.release.GoPublishOptions.property.githubTokenSecret"></a>

```typescript
public readonly githubTokenSecret: string;
```

- *Type:* string
- *Default:* "GO_GITHUB_TOKEN"

The name of the secret that includes a personal GitHub access token used to push to the GitHub repository.

Ignored if `githubUseSsh` is `true`.

---

##### `githubUseSsh`<sup>Optional</sup> <a name="githubUseSsh" id="projen.release.GoPublishOptions.property.githubUseSsh"></a>

```typescript
public readonly githubUseSsh: boolean;
```

- *Type:* boolean
- *Default:* false

Use SSH to push to GitHub instead of a personal accses token.

---

##### `gitUserEmail`<sup>Optional</sup> <a name="gitUserEmail" id="projen.release.GoPublishOptions.property.gitUserEmail"></a>

```typescript
public readonly gitUserEmail: string;
```

- *Type:* string
- *Default:* "github-actions@github.com"

The email to use in the release git commit.

---

##### `gitUserName`<sup>Optional</sup> <a name="gitUserName" id="projen.release.GoPublishOptions.property.gitUserName"></a>

```typescript
public readonly gitUserName: string;
```

- *Type:* string
- *Default:* "github-actions"

The user name to use for the release git commit.

---

### JsiiReleaseGo <a name="JsiiReleaseGo" id="projen.release.JsiiReleaseGo"></a>

#### Initializer <a name="Initializer" id="projen.release.JsiiReleaseGo.Initializer"></a>

```typescript
import { release } from 'projen'

const jsiiReleaseGo: release.JsiiReleaseGo = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.release.JsiiReleaseGo.property.postPublishSteps">postPublishSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | Steps to execute after executing the publishing command. |
| <code><a href="#projen.release.JsiiReleaseGo.property.prePublishSteps">prePublishSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | Steps to execute before executing the publishing command. These can be used to prepare the artifact for publishing if neede. |
| <code><a href="#projen.release.JsiiReleaseGo.property.publishTools">publishTools</a></code> | <code>projen.github.workflows.Tools</code> | Additional tools to install in the publishing job. |
| <code><a href="#projen.release.JsiiReleaseGo.property.gitBranch">gitBranch</a></code> | <code>string</code> | Branch to push to. |
| <code><a href="#projen.release.JsiiReleaseGo.property.gitCommitMessage">gitCommitMessage</a></code> | <code>string</code> | The commit message. |
| <code><a href="#projen.release.JsiiReleaseGo.property.githubDeployKeySecret">githubDeployKeySecret</a></code> | <code>string</code> | The name of the secret that includes a GitHub deploy key used to push to the GitHub repository. |
| <code><a href="#projen.release.JsiiReleaseGo.property.githubRepo">githubRepo</a></code> | <code>string</code> | GitHub repository to push to. |
| <code><a href="#projen.release.JsiiReleaseGo.property.githubTokenSecret">githubTokenSecret</a></code> | <code>string</code> | The name of the secret that includes a personal GitHub access token used to push to the GitHub repository. |
| <code><a href="#projen.release.JsiiReleaseGo.property.githubUseSsh">githubUseSsh</a></code> | <code>boolean</code> | Use SSH to push to GitHub instead of a personal accses token. |
| <code><a href="#projen.release.JsiiReleaseGo.property.gitUserEmail">gitUserEmail</a></code> | <code>string</code> | The email to use in the release git commit. |
| <code><a href="#projen.release.JsiiReleaseGo.property.gitUserName">gitUserName</a></code> | <code>string</code> | The user name to use for the release git commit. |

---

##### ~~`postPublishSteps`~~<sup>Optional</sup> <a name="postPublishSteps" id="projen.release.JsiiReleaseGo.property.postPublishSteps"></a>

- *Deprecated:* Use `GoPublishOptions` instead.

```typescript
public readonly postPublishSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]

Steps to execute after executing the publishing command.

These can be used
to add/update the release artifacts ot any other tasks needed.


Note that when using this in `publishToGitHubReleases` this will override steps added via `addGitHubPostPublishingSteps`.

---

##### ~~`prePublishSteps`~~<sup>Optional</sup> <a name="prePublishSteps" id="projen.release.JsiiReleaseGo.property.prePublishSteps"></a>

- *Deprecated:* Use `GoPublishOptions` instead.

```typescript
public readonly prePublishSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]

Steps to execute before executing the publishing command. These can be used to prepare the artifact for publishing if neede.

These steps are executed after `dist/` has been populated with the build
output.

Note that when using this in `publishToGitHubReleases` this will override steps added via `addGitHubPrePublishingSteps`.

---

##### ~~`publishTools`~~<sup>Optional</sup> <a name="publishTools" id="projen.release.JsiiReleaseGo.property.publishTools"></a>

- *Deprecated:* Use `GoPublishOptions` instead.

```typescript
public readonly publishTools: Tools;
```

- *Type:* projen.github.workflows.Tools
- *Default:* no additional tools are installed

Additional tools to install in the publishing job.

---

##### ~~`gitBranch`~~<sup>Optional</sup> <a name="gitBranch" id="projen.release.JsiiReleaseGo.property.gitBranch"></a>

- *Deprecated:* Use `GoPublishOptions` instead.

```typescript
public readonly gitBranch: string;
```

- *Type:* string
- *Default:* "main"

Branch to push to.

---

##### ~~`gitCommitMessage`~~<sup>Optional</sup> <a name="gitCommitMessage" id="projen.release.JsiiReleaseGo.property.gitCommitMessage"></a>

- *Deprecated:* Use `GoPublishOptions` instead.

```typescript
public readonly gitCommitMessage: string;
```

- *Type:* string
- *Default:* "chore(release): $VERSION"

The commit message.

---

##### ~~`githubDeployKeySecret`~~<sup>Optional</sup> <a name="githubDeployKeySecret" id="projen.release.JsiiReleaseGo.property.githubDeployKeySecret"></a>

- *Deprecated:* Use `GoPublishOptions` instead.

```typescript
public readonly githubDeployKeySecret: string;
```

- *Type:* string
- *Default:* "GO_GITHUB_DEPLOY_KEY"

The name of the secret that includes a GitHub deploy key used to push to the GitHub repository.

Ignored if `githubUseSsh` is `false`.

---

##### ~~`githubRepo`~~<sup>Optional</sup> <a name="githubRepo" id="projen.release.JsiiReleaseGo.property.githubRepo"></a>

- *Deprecated:* Use `GoPublishOptions` instead.

```typescript
public readonly githubRepo: string;
```

- *Type:* string
- *Default:* derived from `moduleName`

GitHub repository to push to.

---

##### ~~`githubTokenSecret`~~<sup>Optional</sup> <a name="githubTokenSecret" id="projen.release.JsiiReleaseGo.property.githubTokenSecret"></a>

- *Deprecated:* Use `GoPublishOptions` instead.

```typescript
public readonly githubTokenSecret: string;
```

- *Type:* string
- *Default:* "GO_GITHUB_TOKEN"

The name of the secret that includes a personal GitHub access token used to push to the GitHub repository.

Ignored if `githubUseSsh` is `true`.

---

##### ~~`githubUseSsh`~~<sup>Optional</sup> <a name="githubUseSsh" id="projen.release.JsiiReleaseGo.property.githubUseSsh"></a>

- *Deprecated:* Use `GoPublishOptions` instead.

```typescript
public readonly githubUseSsh: boolean;
```

- *Type:* boolean
- *Default:* false

Use SSH to push to GitHub instead of a personal accses token.

---

##### ~~`gitUserEmail`~~<sup>Optional</sup> <a name="gitUserEmail" id="projen.release.JsiiReleaseGo.property.gitUserEmail"></a>

- *Deprecated:* Use `GoPublishOptions` instead.

```typescript
public readonly gitUserEmail: string;
```

- *Type:* string
- *Default:* "github-actions@github.com"

The email to use in the release git commit.

---

##### ~~`gitUserName`~~<sup>Optional</sup> <a name="gitUserName" id="projen.release.JsiiReleaseGo.property.gitUserName"></a>

- *Deprecated:* Use `GoPublishOptions` instead.

```typescript
public readonly gitUserName: string;
```

- *Type:* string
- *Default:* "github-actions"

The user name to use for the release git commit.

---

### JsiiReleaseMaven <a name="JsiiReleaseMaven" id="projen.release.JsiiReleaseMaven"></a>

#### Initializer <a name="Initializer" id="projen.release.JsiiReleaseMaven.Initializer"></a>

```typescript
import { release } from 'projen'

const jsiiReleaseMaven: release.JsiiReleaseMaven = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.release.JsiiReleaseMaven.property.postPublishSteps">postPublishSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | Steps to execute after executing the publishing command. |
| <code><a href="#projen.release.JsiiReleaseMaven.property.prePublishSteps">prePublishSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | Steps to execute before executing the publishing command. These can be used to prepare the artifact for publishing if neede. |
| <code><a href="#projen.release.JsiiReleaseMaven.property.publishTools">publishTools</a></code> | <code>projen.github.workflows.Tools</code> | Additional tools to install in the publishing job. |
| <code><a href="#projen.release.JsiiReleaseMaven.property.mavenEndpoint">mavenEndpoint</a></code> | <code>string</code> | URL of Nexus repository. |
| <code><a href="#projen.release.JsiiReleaseMaven.property.mavenGpgPrivateKeyPassphrase">mavenGpgPrivateKeyPassphrase</a></code> | <code>string</code> | GitHub secret name which contains the GPG private key or file that includes it. |
| <code><a href="#projen.release.JsiiReleaseMaven.property.mavenGpgPrivateKeySecret">mavenGpgPrivateKeySecret</a></code> | <code>string</code> | GitHub secret name which contains the GPG private key or file that includes it. |
| <code><a href="#projen.release.JsiiReleaseMaven.property.mavenPassword">mavenPassword</a></code> | <code>string</code> | GitHub secret name which contains the Password for maven repository. |
| <code><a href="#projen.release.JsiiReleaseMaven.property.mavenRepositoryUrl">mavenRepositoryUrl</a></code> | <code>string</code> | Deployment repository when not deploying to Maven Central. |
| <code><a href="#projen.release.JsiiReleaseMaven.property.mavenServerId">mavenServerId</a></code> | <code>string</code> | Used in maven settings for credential lookup (e.g. use github when publishing to GitHub). |
| <code><a href="#projen.release.JsiiReleaseMaven.property.mavenStagingProfileId">mavenStagingProfileId</a></code> | <code>string</code> | GitHub secret name which contains the Maven Central (sonatype) staging profile ID (e.g. 68a05363083174). Staging profile ID can be found in the URL of the "Releases" staging profile under "Staging Profiles" in https://oss.sonatype.org (e.g. https://oss.sonatype.org/#stagingProfiles;11a33451234521). |
| <code><a href="#projen.release.JsiiReleaseMaven.property.mavenUsername">mavenUsername</a></code> | <code>string</code> | GitHub secret name which contains the Username for maven repository. |

---

##### ~~`postPublishSteps`~~<sup>Optional</sup> <a name="postPublishSteps" id="projen.release.JsiiReleaseMaven.property.postPublishSteps"></a>

- *Deprecated:* Use `MavenPublishOptions` instead.

```typescript
public readonly postPublishSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]

Steps to execute after executing the publishing command.

These can be used
to add/update the release artifacts ot any other tasks needed.


Note that when using this in `publishToGitHubReleases` this will override steps added via `addGitHubPostPublishingSteps`.

---

##### ~~`prePublishSteps`~~<sup>Optional</sup> <a name="prePublishSteps" id="projen.release.JsiiReleaseMaven.property.prePublishSteps"></a>

- *Deprecated:* Use `MavenPublishOptions` instead.

```typescript
public readonly prePublishSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]

Steps to execute before executing the publishing command. These can be used to prepare the artifact for publishing if neede.

These steps are executed after `dist/` has been populated with the build
output.

Note that when using this in `publishToGitHubReleases` this will override steps added via `addGitHubPrePublishingSteps`.

---

##### ~~`publishTools`~~<sup>Optional</sup> <a name="publishTools" id="projen.release.JsiiReleaseMaven.property.publishTools"></a>

- *Deprecated:* Use `MavenPublishOptions` instead.

```typescript
public readonly publishTools: Tools;
```

- *Type:* projen.github.workflows.Tools
- *Default:* no additional tools are installed

Additional tools to install in the publishing job.

---

##### ~~`mavenEndpoint`~~<sup>Optional</sup> <a name="mavenEndpoint" id="projen.release.JsiiReleaseMaven.property.mavenEndpoint"></a>

- *Deprecated:* Use `MavenPublishOptions` instead.

```typescript
public readonly mavenEndpoint: string;
```

- *Type:* string
- *Default:* "https://oss.sonatype.org"

URL of Nexus repository.

if not set, defaults to https://oss.sonatype.org

---

##### ~~`mavenGpgPrivateKeyPassphrase`~~<sup>Optional</sup> <a name="mavenGpgPrivateKeyPassphrase" id="projen.release.JsiiReleaseMaven.property.mavenGpgPrivateKeyPassphrase"></a>

- *Deprecated:* Use `MavenPublishOptions` instead.

```typescript
public readonly mavenGpgPrivateKeyPassphrase: string;
```

- *Type:* string
- *Default:* "MAVEN_GPG_PRIVATE_KEY_PASSPHRASE" or not set when using GitHub Packages

GitHub secret name which contains the GPG private key or file that includes it.

This is used to sign your Maven packages. See instructions.

> [https://github.com/aws/publib#maven](https://github.com/aws/publib#maven)

---

##### ~~`mavenGpgPrivateKeySecret`~~<sup>Optional</sup> <a name="mavenGpgPrivateKeySecret" id="projen.release.JsiiReleaseMaven.property.mavenGpgPrivateKeySecret"></a>

- *Deprecated:* Use `MavenPublishOptions` instead.

```typescript
public readonly mavenGpgPrivateKeySecret: string;
```

- *Type:* string
- *Default:* "MAVEN_GPG_PRIVATE_KEY" or not set when using GitHub Packages

GitHub secret name which contains the GPG private key or file that includes it.

This is used to sign your Maven
packages. See instructions.

> [https://github.com/aws/publib#maven](https://github.com/aws/publib#maven)

---

##### ~~`mavenPassword`~~<sup>Optional</sup> <a name="mavenPassword" id="projen.release.JsiiReleaseMaven.property.mavenPassword"></a>

- *Deprecated:* Use `MavenPublishOptions` instead.

```typescript
public readonly mavenPassword: string;
```

- *Type:* string
- *Default:* "MAVEN_PASSWORD" or "GITHUB_TOKEN" when using GitHub Packages

GitHub secret name which contains the Password for maven repository.

For Maven Central, you will need to Create JIRA account and then request a
new project (see links).

> [https://issues.sonatype.org/secure/CreateIssue.jspa?issuetype=21&pid=10134](https://issues.sonatype.org/secure/CreateIssue.jspa?issuetype=21&pid=10134)

---

##### ~~`mavenRepositoryUrl`~~<sup>Optional</sup> <a name="mavenRepositoryUrl" id="projen.release.JsiiReleaseMaven.property.mavenRepositoryUrl"></a>

- *Deprecated:* Use `MavenPublishOptions` instead.

```typescript
public readonly mavenRepositoryUrl: string;
```

- *Type:* string
- *Default:* not set

Deployment repository when not deploying to Maven Central.

---

##### ~~`mavenServerId`~~<sup>Optional</sup> <a name="mavenServerId" id="projen.release.JsiiReleaseMaven.property.mavenServerId"></a>

- *Deprecated:* Use `MavenPublishOptions` instead.

```typescript
public readonly mavenServerId: string;
```

- *Type:* string
- *Default:* "ossrh" (Maven Central) or "github" when using GitHub Packages

Used in maven settings for credential lookup (e.g. use github when publishing to GitHub).

---

##### ~~`mavenStagingProfileId`~~<sup>Optional</sup> <a name="mavenStagingProfileId" id="projen.release.JsiiReleaseMaven.property.mavenStagingProfileId"></a>

- *Deprecated:* Use `MavenPublishOptions` instead.

```typescript
public readonly mavenStagingProfileId: string;
```

- *Type:* string
- *Default:* "MAVEN_STAGING_PROFILE_ID" or not set when using GitHub Packages

GitHub secret name which contains the Maven Central (sonatype) staging profile ID (e.g. 68a05363083174). Staging profile ID can be found in the URL of the "Releases" staging profile under "Staging Profiles" in https://oss.sonatype.org (e.g. https://oss.sonatype.org/#stagingProfiles;11a33451234521).

---

##### ~~`mavenUsername`~~<sup>Optional</sup> <a name="mavenUsername" id="projen.release.JsiiReleaseMaven.property.mavenUsername"></a>

- *Deprecated:* Use `MavenPublishOptions` instead.

```typescript
public readonly mavenUsername: string;
```

- *Type:* string
- *Default:* "MAVEN_USERNAME" or the GitHub Actor when using GitHub Packages

GitHub secret name which contains the Username for maven repository.

For Maven Central, you will need to Create JIRA account and then request a
new project (see links).

> [https://issues.sonatype.org/secure/CreateIssue.jspa?issuetype=21&pid=10134](https://issues.sonatype.org/secure/CreateIssue.jspa?issuetype=21&pid=10134)

---

### JsiiReleaseNpm <a name="JsiiReleaseNpm" id="projen.release.JsiiReleaseNpm"></a>

#### Initializer <a name="Initializer" id="projen.release.JsiiReleaseNpm.Initializer"></a>

```typescript
import { release } from 'projen'

const jsiiReleaseNpm: release.JsiiReleaseNpm = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.release.JsiiReleaseNpm.property.postPublishSteps">postPublishSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | Steps to execute after executing the publishing command. |
| <code><a href="#projen.release.JsiiReleaseNpm.property.prePublishSteps">prePublishSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | Steps to execute before executing the publishing command. These can be used to prepare the artifact for publishing if neede. |
| <code><a href="#projen.release.JsiiReleaseNpm.property.publishTools">publishTools</a></code> | <code>projen.github.workflows.Tools</code> | Additional tools to install in the publishing job. |
| <code><a href="#projen.release.JsiiReleaseNpm.property.codeArtifactOptions">codeArtifactOptions</a></code> | <code><a href="#projen.release.CodeArtifactOptions">CodeArtifactOptions</a></code> | Options for publishing npm package to AWS CodeArtifact. |
| <code><a href="#projen.release.JsiiReleaseNpm.property.distTag">distTag</a></code> | <code>string</code> | Tags can be used to provide an alias instead of version numbers. |
| <code><a href="#projen.release.JsiiReleaseNpm.property.npmProvenance">npmProvenance</a></code> | <code>boolean</code> | Should provenance statements be generated when package is published. |
| <code><a href="#projen.release.JsiiReleaseNpm.property.npmTokenSecret">npmTokenSecret</a></code> | <code>string</code> | GitHub secret which contains the NPM token to use when publishing packages. |
| <code><a href="#projen.release.JsiiReleaseNpm.property.registry">registry</a></code> | <code>string</code> | The domain name of the npm package registry. |

---

##### ~~`postPublishSteps`~~<sup>Optional</sup> <a name="postPublishSteps" id="projen.release.JsiiReleaseNpm.property.postPublishSteps"></a>

- *Deprecated:* Use `NpmPublishOptions` instead.

```typescript
public readonly postPublishSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]

Steps to execute after executing the publishing command.

These can be used
to add/update the release artifacts ot any other tasks needed.


Note that when using this in `publishToGitHubReleases` this will override steps added via `addGitHubPostPublishingSteps`.

---

##### ~~`prePublishSteps`~~<sup>Optional</sup> <a name="prePublishSteps" id="projen.release.JsiiReleaseNpm.property.prePublishSteps"></a>

- *Deprecated:* Use `NpmPublishOptions` instead.

```typescript
public readonly prePublishSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]

Steps to execute before executing the publishing command. These can be used to prepare the artifact for publishing if neede.

These steps are executed after `dist/` has been populated with the build
output.

Note that when using this in `publishToGitHubReleases` this will override steps added via `addGitHubPrePublishingSteps`.

---

##### ~~`publishTools`~~<sup>Optional</sup> <a name="publishTools" id="projen.release.JsiiReleaseNpm.property.publishTools"></a>

- *Deprecated:* Use `NpmPublishOptions` instead.

```typescript
public readonly publishTools: Tools;
```

- *Type:* projen.github.workflows.Tools
- *Default:* no additional tools are installed

Additional tools to install in the publishing job.

---

##### ~~`codeArtifactOptions`~~<sup>Optional</sup> <a name="codeArtifactOptions" id="projen.release.JsiiReleaseNpm.property.codeArtifactOptions"></a>

- *Deprecated:* Use `NpmPublishOptions` instead.

```typescript
public readonly codeArtifactOptions: CodeArtifactOptions;
```

- *Type:* <a href="#projen.release.CodeArtifactOptions">CodeArtifactOptions</a>
- *Default:* undefined

Options for publishing npm package to AWS CodeArtifact.

---

##### ~~`distTag`~~<sup>Optional</sup> <a name="distTag" id="projen.release.JsiiReleaseNpm.property.distTag"></a>

- *Deprecated:* Use `npmDistTag` for each release branch instead.

```typescript
public readonly distTag: string;
```

- *Type:* string
- *Default:* "latest"

Tags can be used to provide an alias instead of version numbers.

For example, a project might choose to have multiple streams of development
and use a different tag for each stream, e.g., stable, beta, dev, canary.

By default, the `latest` tag is used by npm to identify the current version
of a package, and `npm install <pkg>` (without any `@<version>` or `@<tag>`
specifier) installs the latest tag. Typically, projects only use the
`latest` tag for stable release versions, and use other tags for unstable
versions such as prereleases.

The `next` tag is used by some projects to identify the upcoming version.

---

##### ~~`npmProvenance`~~<sup>Optional</sup> <a name="npmProvenance" id="projen.release.JsiiReleaseNpm.property.npmProvenance"></a>

- *Deprecated:* Use `NpmPublishOptions` instead.

```typescript
public readonly npmProvenance: boolean;
```

- *Type:* boolean
- *Default:* undefined

Should provenance statements be generated when package is published.

Note that this component is using `publib` to publish packages,
which is using npm internally and supports provenance statements independently of the package manager used.

> [https://docs.npmjs.com/generating-provenance-statements](https://docs.npmjs.com/generating-provenance-statements)

---

##### ~~`npmTokenSecret`~~<sup>Optional</sup> <a name="npmTokenSecret" id="projen.release.JsiiReleaseNpm.property.npmTokenSecret"></a>

- *Deprecated:* Use `NpmPublishOptions` instead.

```typescript
public readonly npmTokenSecret: string;
```

- *Type:* string
- *Default:* "NPM_TOKEN" or "GITHUB_TOKEN" if `registry` is set to `npm.pkg.github.com`.

GitHub secret which contains the NPM token to use when publishing packages.

---

##### ~~`registry`~~<sup>Optional</sup> <a name="registry" id="projen.release.JsiiReleaseNpm.property.registry"></a>

- *Deprecated:* Use `NpmPublishOptions` instead.

```typescript
public readonly registry: string;
```

- *Type:* string
- *Default:* "registry.npmjs.org"

The domain name of the npm package registry.

To publish to GitHub Packages, set this value to `"npm.pkg.github.com"`. In
this if `npmTokenSecret` is not specified, it will default to
`GITHUB_TOKEN` which means that you will be able to publish to the
repository's package store. In this case, make sure `repositoryUrl` is
correctly defined.

---

*Example*

```typescript
"npm.pkg.github.com"
```


### JsiiReleaseNuget <a name="JsiiReleaseNuget" id="projen.release.JsiiReleaseNuget"></a>

#### Initializer <a name="Initializer" id="projen.release.JsiiReleaseNuget.Initializer"></a>

```typescript
import { release } from 'projen'

const jsiiReleaseNuget: release.JsiiReleaseNuget = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.release.JsiiReleaseNuget.property.postPublishSteps">postPublishSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | Steps to execute after executing the publishing command. |
| <code><a href="#projen.release.JsiiReleaseNuget.property.prePublishSteps">prePublishSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | Steps to execute before executing the publishing command. These can be used to prepare the artifact for publishing if neede. |
| <code><a href="#projen.release.JsiiReleaseNuget.property.publishTools">publishTools</a></code> | <code>projen.github.workflows.Tools</code> | Additional tools to install in the publishing job. |
| <code><a href="#projen.release.JsiiReleaseNuget.property.nugetApiKeySecret">nugetApiKeySecret</a></code> | <code>string</code> | GitHub secret which contains the API key for NuGet. |
| <code><a href="#projen.release.JsiiReleaseNuget.property.nugetServer">nugetServer</a></code> | <code>string</code> | NuGet Server URL (defaults to nuget.org). |

---

##### ~~`postPublishSteps`~~<sup>Optional</sup> <a name="postPublishSteps" id="projen.release.JsiiReleaseNuget.property.postPublishSteps"></a>

- *Deprecated:* Use `NugetPublishOptions` instead.

```typescript
public readonly postPublishSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]

Steps to execute after executing the publishing command.

These can be used
to add/update the release artifacts ot any other tasks needed.


Note that when using this in `publishToGitHubReleases` this will override steps added via `addGitHubPostPublishingSteps`.

---

##### ~~`prePublishSteps`~~<sup>Optional</sup> <a name="prePublishSteps" id="projen.release.JsiiReleaseNuget.property.prePublishSteps"></a>

- *Deprecated:* Use `NugetPublishOptions` instead.

```typescript
public readonly prePublishSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]

Steps to execute before executing the publishing command. These can be used to prepare the artifact for publishing if neede.

These steps are executed after `dist/` has been populated with the build
output.

Note that when using this in `publishToGitHubReleases` this will override steps added via `addGitHubPrePublishingSteps`.

---

##### ~~`publishTools`~~<sup>Optional</sup> <a name="publishTools" id="projen.release.JsiiReleaseNuget.property.publishTools"></a>

- *Deprecated:* Use `NugetPublishOptions` instead.

```typescript
public readonly publishTools: Tools;
```

- *Type:* projen.github.workflows.Tools
- *Default:* no additional tools are installed

Additional tools to install in the publishing job.

---

##### ~~`nugetApiKeySecret`~~<sup>Optional</sup> <a name="nugetApiKeySecret" id="projen.release.JsiiReleaseNuget.property.nugetApiKeySecret"></a>

- *Deprecated:* Use `NugetPublishOptions` instead.

```typescript
public readonly nugetApiKeySecret: string;
```

- *Type:* string
- *Default:* "NUGET_API_KEY"

GitHub secret which contains the API key for NuGet.

---

##### ~~`nugetServer`~~<sup>Optional</sup> <a name="nugetServer" id="projen.release.JsiiReleaseNuget.property.nugetServer"></a>

- *Deprecated:* Use `NugetPublishOptions` instead.

```typescript
public readonly nugetServer: string;
```

- *Type:* string

NuGet Server URL (defaults to nuget.org).

---

### JsiiReleasePyPi <a name="JsiiReleasePyPi" id="projen.release.JsiiReleasePyPi"></a>

#### Initializer <a name="Initializer" id="projen.release.JsiiReleasePyPi.Initializer"></a>

```typescript
import { release } from 'projen'

const jsiiReleasePyPi: release.JsiiReleasePyPi = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.release.JsiiReleasePyPi.property.postPublishSteps">postPublishSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | Steps to execute after executing the publishing command. |
| <code><a href="#projen.release.JsiiReleasePyPi.property.prePublishSteps">prePublishSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | Steps to execute before executing the publishing command. These can be used to prepare the artifact for publishing if neede. |
| <code><a href="#projen.release.JsiiReleasePyPi.property.publishTools">publishTools</a></code> | <code>projen.github.workflows.Tools</code> | Additional tools to install in the publishing job. |
| <code><a href="#projen.release.JsiiReleasePyPi.property.codeArtifactOptions">codeArtifactOptions</a></code> | <code><a href="#projen.release.CodeArtifactOptions">CodeArtifactOptions</a></code> | Options for publishing to AWS CodeArtifact. |
| <code><a href="#projen.release.JsiiReleasePyPi.property.twinePasswordSecret">twinePasswordSecret</a></code> | <code>string</code> | The GitHub secret which contains PyPI password. |
| <code><a href="#projen.release.JsiiReleasePyPi.property.twineRegistryUrl">twineRegistryUrl</a></code> | <code>string</code> | The registry url to use when releasing packages. |
| <code><a href="#projen.release.JsiiReleasePyPi.property.twineUsernameSecret">twineUsernameSecret</a></code> | <code>string</code> | The GitHub secret which contains PyPI user name. |

---

##### ~~`postPublishSteps`~~<sup>Optional</sup> <a name="postPublishSteps" id="projen.release.JsiiReleasePyPi.property.postPublishSteps"></a>

- *Deprecated:* Use `PyPiPublishOptions` instead.

```typescript
public readonly postPublishSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]

Steps to execute after executing the publishing command.

These can be used
to add/update the release artifacts ot any other tasks needed.


Note that when using this in `publishToGitHubReleases` this will override steps added via `addGitHubPostPublishingSteps`.

---

##### ~~`prePublishSteps`~~<sup>Optional</sup> <a name="prePublishSteps" id="projen.release.JsiiReleasePyPi.property.prePublishSteps"></a>

- *Deprecated:* Use `PyPiPublishOptions` instead.

```typescript
public readonly prePublishSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]

Steps to execute before executing the publishing command. These can be used to prepare the artifact for publishing if neede.

These steps are executed after `dist/` has been populated with the build
output.

Note that when using this in `publishToGitHubReleases` this will override steps added via `addGitHubPrePublishingSteps`.

---

##### ~~`publishTools`~~<sup>Optional</sup> <a name="publishTools" id="projen.release.JsiiReleasePyPi.property.publishTools"></a>

- *Deprecated:* Use `PyPiPublishOptions` instead.

```typescript
public readonly publishTools: Tools;
```

- *Type:* projen.github.workflows.Tools
- *Default:* no additional tools are installed

Additional tools to install in the publishing job.

---

##### ~~`codeArtifactOptions`~~<sup>Optional</sup> <a name="codeArtifactOptions" id="projen.release.JsiiReleasePyPi.property.codeArtifactOptions"></a>

- *Deprecated:* Use `PyPiPublishOptions` instead.

```typescript
public readonly codeArtifactOptions: CodeArtifactOptions;
```

- *Type:* <a href="#projen.release.CodeArtifactOptions">CodeArtifactOptions</a>
- *Default:* undefined

Options for publishing to AWS CodeArtifact.

---

##### ~~`twinePasswordSecret`~~<sup>Optional</sup> <a name="twinePasswordSecret" id="projen.release.JsiiReleasePyPi.property.twinePasswordSecret"></a>

- *Deprecated:* Use `PyPiPublishOptions` instead.

```typescript
public readonly twinePasswordSecret: string;
```

- *Type:* string
- *Default:* "TWINE_PASSWORD"

The GitHub secret which contains PyPI password.

---

##### ~~`twineRegistryUrl`~~<sup>Optional</sup> <a name="twineRegistryUrl" id="projen.release.JsiiReleasePyPi.property.twineRegistryUrl"></a>

- *Deprecated:* Use `PyPiPublishOptions` instead.

```typescript
public readonly twineRegistryUrl: string;
```

- *Type:* string
- *Default:* twine default

The registry url to use when releasing packages.

---

##### ~~`twineUsernameSecret`~~<sup>Optional</sup> <a name="twineUsernameSecret" id="projen.release.JsiiReleasePyPi.property.twineUsernameSecret"></a>

- *Deprecated:* Use `PyPiPublishOptions` instead.

```typescript
public readonly twineUsernameSecret: string;
```

- *Type:* string
- *Default:* "TWINE_USERNAME"

The GitHub secret which contains PyPI user name.

---

### ManualReleaseOptions <a name="ManualReleaseOptions" id="projen.release.ManualReleaseOptions"></a>

#### Initializer <a name="Initializer" id="projen.release.ManualReleaseOptions.Initializer"></a>

```typescript
import { release } from 'projen'

const manualReleaseOptions: release.ManualReleaseOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.release.ManualReleaseOptions.property.changelog">changelog</a></code> | <code>boolean</code> | Maintain a project-level changelog. |
| <code><a href="#projen.release.ManualReleaseOptions.property.changelogPath">changelogPath</a></code> | <code>string</code> | Project-level changelog file path. |
| <code><a href="#projen.release.ManualReleaseOptions.property.gitPushCommand">gitPushCommand</a></code> | <code>string</code> | Override git-push command. |

---

##### `changelog`<sup>Optional</sup> <a name="changelog" id="projen.release.ManualReleaseOptions.property.changelog"></a>

```typescript
public readonly changelog: boolean;
```

- *Type:* boolean
- *Default:* true

Maintain a project-level changelog.

---

##### `changelogPath`<sup>Optional</sup> <a name="changelogPath" id="projen.release.ManualReleaseOptions.property.changelogPath"></a>

```typescript
public readonly changelogPath: string;
```

- *Type:* string
- *Default:* 'CHANGELOG.md'

Project-level changelog file path.

Ignored if `changelog` is false.

---

##### `gitPushCommand`<sup>Optional</sup> <a name="gitPushCommand" id="projen.release.ManualReleaseOptions.property.gitPushCommand"></a>

```typescript
public readonly gitPushCommand: string;
```

- *Type:* string

Override git-push command.

Set to an empty string to disable pushing.

---

### MavenPublishOptions <a name="MavenPublishOptions" id="projen.release.MavenPublishOptions"></a>

Options for Maven releases.

#### Initializer <a name="Initializer" id="projen.release.MavenPublishOptions.Initializer"></a>

```typescript
import { release } from 'projen'

const mavenPublishOptions: release.MavenPublishOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.release.MavenPublishOptions.property.postPublishSteps">postPublishSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | Steps to execute after executing the publishing command. |
| <code><a href="#projen.release.MavenPublishOptions.property.prePublishSteps">prePublishSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | Steps to execute before executing the publishing command. These can be used to prepare the artifact for publishing if neede. |
| <code><a href="#projen.release.MavenPublishOptions.property.publishTools">publishTools</a></code> | <code>projen.github.workflows.Tools</code> | Additional tools to install in the publishing job. |
| <code><a href="#projen.release.MavenPublishOptions.property.mavenEndpoint">mavenEndpoint</a></code> | <code>string</code> | URL of Nexus repository. |
| <code><a href="#projen.release.MavenPublishOptions.property.mavenGpgPrivateKeyPassphrase">mavenGpgPrivateKeyPassphrase</a></code> | <code>string</code> | GitHub secret name which contains the GPG private key or file that includes it. |
| <code><a href="#projen.release.MavenPublishOptions.property.mavenGpgPrivateKeySecret">mavenGpgPrivateKeySecret</a></code> | <code>string</code> | GitHub secret name which contains the GPG private key or file that includes it. |
| <code><a href="#projen.release.MavenPublishOptions.property.mavenPassword">mavenPassword</a></code> | <code>string</code> | GitHub secret name which contains the Password for maven repository. |
| <code><a href="#projen.release.MavenPublishOptions.property.mavenRepositoryUrl">mavenRepositoryUrl</a></code> | <code>string</code> | Deployment repository when not deploying to Maven Central. |
| <code><a href="#projen.release.MavenPublishOptions.property.mavenServerId">mavenServerId</a></code> | <code>string</code> | Used in maven settings for credential lookup (e.g. use github when publishing to GitHub). |
| <code><a href="#projen.release.MavenPublishOptions.property.mavenStagingProfileId">mavenStagingProfileId</a></code> | <code>string</code> | GitHub secret name which contains the Maven Central (sonatype) staging profile ID (e.g. 68a05363083174). Staging profile ID can be found in the URL of the "Releases" staging profile under "Staging Profiles" in https://oss.sonatype.org (e.g. https://oss.sonatype.org/#stagingProfiles;11a33451234521). |
| <code><a href="#projen.release.MavenPublishOptions.property.mavenUsername">mavenUsername</a></code> | <code>string</code> | GitHub secret name which contains the Username for maven repository. |

---

##### `postPublishSteps`<sup>Optional</sup> <a name="postPublishSteps" id="projen.release.MavenPublishOptions.property.postPublishSteps"></a>

```typescript
public readonly postPublishSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]

Steps to execute after executing the publishing command.

These can be used
to add/update the release artifacts ot any other tasks needed.


Note that when using this in `publishToGitHubReleases` this will override steps added via `addGitHubPostPublishingSteps`.

---

##### `prePublishSteps`<sup>Optional</sup> <a name="prePublishSteps" id="projen.release.MavenPublishOptions.property.prePublishSteps"></a>

```typescript
public readonly prePublishSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]

Steps to execute before executing the publishing command. These can be used to prepare the artifact for publishing if neede.

These steps are executed after `dist/` has been populated with the build
output.

Note that when using this in `publishToGitHubReleases` this will override steps added via `addGitHubPrePublishingSteps`.

---

##### `publishTools`<sup>Optional</sup> <a name="publishTools" id="projen.release.MavenPublishOptions.property.publishTools"></a>

```typescript
public readonly publishTools: Tools;
```

- *Type:* projen.github.workflows.Tools
- *Default:* no additional tools are installed

Additional tools to install in the publishing job.

---

##### `mavenEndpoint`<sup>Optional</sup> <a name="mavenEndpoint" id="projen.release.MavenPublishOptions.property.mavenEndpoint"></a>

```typescript
public readonly mavenEndpoint: string;
```

- *Type:* string
- *Default:* "https://oss.sonatype.org"

URL of Nexus repository.

if not set, defaults to https://oss.sonatype.org

---

##### `mavenGpgPrivateKeyPassphrase`<sup>Optional</sup> <a name="mavenGpgPrivateKeyPassphrase" id="projen.release.MavenPublishOptions.property.mavenGpgPrivateKeyPassphrase"></a>

```typescript
public readonly mavenGpgPrivateKeyPassphrase: string;
```

- *Type:* string
- *Default:* "MAVEN_GPG_PRIVATE_KEY_PASSPHRASE" or not set when using GitHub Packages

GitHub secret name which contains the GPG private key or file that includes it.

This is used to sign your Maven packages. See instructions.

> [https://github.com/aws/publib#maven](https://github.com/aws/publib#maven)

---

##### `mavenGpgPrivateKeySecret`<sup>Optional</sup> <a name="mavenGpgPrivateKeySecret" id="projen.release.MavenPublishOptions.property.mavenGpgPrivateKeySecret"></a>

```typescript
public readonly mavenGpgPrivateKeySecret: string;
```

- *Type:* string
- *Default:* "MAVEN_GPG_PRIVATE_KEY" or not set when using GitHub Packages

GitHub secret name which contains the GPG private key or file that includes it.

This is used to sign your Maven
packages. See instructions.

> [https://github.com/aws/publib#maven](https://github.com/aws/publib#maven)

---

##### `mavenPassword`<sup>Optional</sup> <a name="mavenPassword" id="projen.release.MavenPublishOptions.property.mavenPassword"></a>

```typescript
public readonly mavenPassword: string;
```

- *Type:* string
- *Default:* "MAVEN_PASSWORD" or "GITHUB_TOKEN" when using GitHub Packages

GitHub secret name which contains the Password for maven repository.

For Maven Central, you will need to Create JIRA account and then request a
new project (see links).

> [https://issues.sonatype.org/secure/CreateIssue.jspa?issuetype=21&pid=10134](https://issues.sonatype.org/secure/CreateIssue.jspa?issuetype=21&pid=10134)

---

##### `mavenRepositoryUrl`<sup>Optional</sup> <a name="mavenRepositoryUrl" id="projen.release.MavenPublishOptions.property.mavenRepositoryUrl"></a>

```typescript
public readonly mavenRepositoryUrl: string;
```

- *Type:* string
- *Default:* not set

Deployment repository when not deploying to Maven Central.

---

##### `mavenServerId`<sup>Optional</sup> <a name="mavenServerId" id="projen.release.MavenPublishOptions.property.mavenServerId"></a>

```typescript
public readonly mavenServerId: string;
```

- *Type:* string
- *Default:* "ossrh" (Maven Central) or "github" when using GitHub Packages

Used in maven settings for credential lookup (e.g. use github when publishing to GitHub).

---

##### `mavenStagingProfileId`<sup>Optional</sup> <a name="mavenStagingProfileId" id="projen.release.MavenPublishOptions.property.mavenStagingProfileId"></a>

```typescript
public readonly mavenStagingProfileId: string;
```

- *Type:* string
- *Default:* "MAVEN_STAGING_PROFILE_ID" or not set when using GitHub Packages

GitHub secret name which contains the Maven Central (sonatype) staging profile ID (e.g. 68a05363083174). Staging profile ID can be found in the URL of the "Releases" staging profile under "Staging Profiles" in https://oss.sonatype.org (e.g. https://oss.sonatype.org/#stagingProfiles;11a33451234521).

---

##### `mavenUsername`<sup>Optional</sup> <a name="mavenUsername" id="projen.release.MavenPublishOptions.property.mavenUsername"></a>

```typescript
public readonly mavenUsername: string;
```

- *Type:* string
- *Default:* "MAVEN_USERNAME" or the GitHub Actor when using GitHub Packages

GitHub secret name which contains the Username for maven repository.

For Maven Central, you will need to Create JIRA account and then request a
new project (see links).

> [https://issues.sonatype.org/secure/CreateIssue.jspa?issuetype=21&pid=10134](https://issues.sonatype.org/secure/CreateIssue.jspa?issuetype=21&pid=10134)

---

### NpmPublishOptions <a name="NpmPublishOptions" id="projen.release.NpmPublishOptions"></a>

Options for npm release.

#### Initializer <a name="Initializer" id="projen.release.NpmPublishOptions.Initializer"></a>

```typescript
import { release } from 'projen'

const npmPublishOptions: release.NpmPublishOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.release.NpmPublishOptions.property.postPublishSteps">postPublishSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | Steps to execute after executing the publishing command. |
| <code><a href="#projen.release.NpmPublishOptions.property.prePublishSteps">prePublishSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | Steps to execute before executing the publishing command. These can be used to prepare the artifact for publishing if neede. |
| <code><a href="#projen.release.NpmPublishOptions.property.publishTools">publishTools</a></code> | <code>projen.github.workflows.Tools</code> | Additional tools to install in the publishing job. |
| <code><a href="#projen.release.NpmPublishOptions.property.codeArtifactOptions">codeArtifactOptions</a></code> | <code><a href="#projen.release.CodeArtifactOptions">CodeArtifactOptions</a></code> | Options for publishing npm package to AWS CodeArtifact. |
| <code><a href="#projen.release.NpmPublishOptions.property.distTag">distTag</a></code> | <code>string</code> | Tags can be used to provide an alias instead of version numbers. |
| <code><a href="#projen.release.NpmPublishOptions.property.npmProvenance">npmProvenance</a></code> | <code>boolean</code> | Should provenance statements be generated when package is published. |
| <code><a href="#projen.release.NpmPublishOptions.property.npmTokenSecret">npmTokenSecret</a></code> | <code>string</code> | GitHub secret which contains the NPM token to use when publishing packages. |
| <code><a href="#projen.release.NpmPublishOptions.property.registry">registry</a></code> | <code>string</code> | The domain name of the npm package registry. |

---

##### `postPublishSteps`<sup>Optional</sup> <a name="postPublishSteps" id="projen.release.NpmPublishOptions.property.postPublishSteps"></a>

```typescript
public readonly postPublishSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]

Steps to execute after executing the publishing command.

These can be used
to add/update the release artifacts ot any other tasks needed.


Note that when using this in `publishToGitHubReleases` this will override steps added via `addGitHubPostPublishingSteps`.

---

##### `prePublishSteps`<sup>Optional</sup> <a name="prePublishSteps" id="projen.release.NpmPublishOptions.property.prePublishSteps"></a>

```typescript
public readonly prePublishSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]

Steps to execute before executing the publishing command. These can be used to prepare the artifact for publishing if neede.

These steps are executed after `dist/` has been populated with the build
output.

Note that when using this in `publishToGitHubReleases` this will override steps added via `addGitHubPrePublishingSteps`.

---

##### `publishTools`<sup>Optional</sup> <a name="publishTools" id="projen.release.NpmPublishOptions.property.publishTools"></a>

```typescript
public readonly publishTools: Tools;
```

- *Type:* projen.github.workflows.Tools
- *Default:* no additional tools are installed

Additional tools to install in the publishing job.

---

##### `codeArtifactOptions`<sup>Optional</sup> <a name="codeArtifactOptions" id="projen.release.NpmPublishOptions.property.codeArtifactOptions"></a>

```typescript
public readonly codeArtifactOptions: CodeArtifactOptions;
```

- *Type:* <a href="#projen.release.CodeArtifactOptions">CodeArtifactOptions</a>
- *Default:* undefined

Options for publishing npm package to AWS CodeArtifact.

---

##### ~~`distTag`~~<sup>Optional</sup> <a name="distTag" id="projen.release.NpmPublishOptions.property.distTag"></a>

- *Deprecated:* Use `npmDistTag` for each release branch instead.

```typescript
public readonly distTag: string;
```

- *Type:* string
- *Default:* "latest"

Tags can be used to provide an alias instead of version numbers.

For example, a project might choose to have multiple streams of development
and use a different tag for each stream, e.g., stable, beta, dev, canary.

By default, the `latest` tag is used by npm to identify the current version
of a package, and `npm install <pkg>` (without any `@<version>` or `@<tag>`
specifier) installs the latest tag. Typically, projects only use the
`latest` tag for stable release versions, and use other tags for unstable
versions such as prereleases.

The `next` tag is used by some projects to identify the upcoming version.

---

##### `npmProvenance`<sup>Optional</sup> <a name="npmProvenance" id="projen.release.NpmPublishOptions.property.npmProvenance"></a>

```typescript
public readonly npmProvenance: boolean;
```

- *Type:* boolean
- *Default:* undefined

Should provenance statements be generated when package is published.

Note that this component is using `publib` to publish packages,
which is using npm internally and supports provenance statements independently of the package manager used.

> [https://docs.npmjs.com/generating-provenance-statements](https://docs.npmjs.com/generating-provenance-statements)

---

##### `npmTokenSecret`<sup>Optional</sup> <a name="npmTokenSecret" id="projen.release.NpmPublishOptions.property.npmTokenSecret"></a>

```typescript
public readonly npmTokenSecret: string;
```

- *Type:* string
- *Default:* "NPM_TOKEN" or "GITHUB_TOKEN" if `registry` is set to `npm.pkg.github.com`.

GitHub secret which contains the NPM token to use when publishing packages.

---

##### `registry`<sup>Optional</sup> <a name="registry" id="projen.release.NpmPublishOptions.property.registry"></a>

```typescript
public readonly registry: string;
```

- *Type:* string
- *Default:* "registry.npmjs.org"

The domain name of the npm package registry.

To publish to GitHub Packages, set this value to `"npm.pkg.github.com"`. In
this if `npmTokenSecret` is not specified, it will default to
`GITHUB_TOKEN` which means that you will be able to publish to the
repository's package store. In this case, make sure `repositoryUrl` is
correctly defined.

---

*Example*

```typescript
"npm.pkg.github.com"
```


### NugetPublishOptions <a name="NugetPublishOptions" id="projen.release.NugetPublishOptions"></a>

Options for NuGet releases.

#### Initializer <a name="Initializer" id="projen.release.NugetPublishOptions.Initializer"></a>

```typescript
import { release } from 'projen'

const nugetPublishOptions: release.NugetPublishOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.release.NugetPublishOptions.property.postPublishSteps">postPublishSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | Steps to execute after executing the publishing command. |
| <code><a href="#projen.release.NugetPublishOptions.property.prePublishSteps">prePublishSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | Steps to execute before executing the publishing command. These can be used to prepare the artifact for publishing if neede. |
| <code><a href="#projen.release.NugetPublishOptions.property.publishTools">publishTools</a></code> | <code>projen.github.workflows.Tools</code> | Additional tools to install in the publishing job. |
| <code><a href="#projen.release.NugetPublishOptions.property.nugetApiKeySecret">nugetApiKeySecret</a></code> | <code>string</code> | GitHub secret which contains the API key for NuGet. |
| <code><a href="#projen.release.NugetPublishOptions.property.nugetServer">nugetServer</a></code> | <code>string</code> | NuGet Server URL (defaults to nuget.org). |

---

##### `postPublishSteps`<sup>Optional</sup> <a name="postPublishSteps" id="projen.release.NugetPublishOptions.property.postPublishSteps"></a>

```typescript
public readonly postPublishSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]

Steps to execute after executing the publishing command.

These can be used
to add/update the release artifacts ot any other tasks needed.


Note that when using this in `publishToGitHubReleases` this will override steps added via `addGitHubPostPublishingSteps`.

---

##### `prePublishSteps`<sup>Optional</sup> <a name="prePublishSteps" id="projen.release.NugetPublishOptions.property.prePublishSteps"></a>

```typescript
public readonly prePublishSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]

Steps to execute before executing the publishing command. These can be used to prepare the artifact for publishing if neede.

These steps are executed after `dist/` has been populated with the build
output.

Note that when using this in `publishToGitHubReleases` this will override steps added via `addGitHubPrePublishingSteps`.

---

##### `publishTools`<sup>Optional</sup> <a name="publishTools" id="projen.release.NugetPublishOptions.property.publishTools"></a>

```typescript
public readonly publishTools: Tools;
```

- *Type:* projen.github.workflows.Tools
- *Default:* no additional tools are installed

Additional tools to install in the publishing job.

---

##### `nugetApiKeySecret`<sup>Optional</sup> <a name="nugetApiKeySecret" id="projen.release.NugetPublishOptions.property.nugetApiKeySecret"></a>

```typescript
public readonly nugetApiKeySecret: string;
```

- *Type:* string
- *Default:* "NUGET_API_KEY"

GitHub secret which contains the API key for NuGet.

---

##### `nugetServer`<sup>Optional</sup> <a name="nugetServer" id="projen.release.NugetPublishOptions.property.nugetServer"></a>

```typescript
public readonly nugetServer: string;
```

- *Type:* string

NuGet Server URL (defaults to nuget.org).

---

### PublisherOptions <a name="PublisherOptions" id="projen.release.PublisherOptions"></a>

Options for `Publisher`.

#### Initializer <a name="Initializer" id="projen.release.PublisherOptions.Initializer"></a>

```typescript
import { release } from 'projen'

const publisherOptions: release.PublisherOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.release.PublisherOptions.property.artifactName">artifactName</a></code> | <code>string</code> | The name of the artifact to download (e.g. `dist`). |
| <code><a href="#projen.release.PublisherOptions.property.buildJobId">buildJobId</a></code> | <code>string</code> | The job ID that produces the build artifacts. |
| <code><a href="#projen.release.PublisherOptions.property.condition">condition</a></code> | <code>string</code> | A GitHub workflow expression used as a condition for publishers. |
| <code><a href="#projen.release.PublisherOptions.property.dryRun">dryRun</a></code> | <code>boolean</code> | Do not actually publish, only print the commands that would be executed instead. |
| <code><a href="#projen.release.PublisherOptions.property.failureIssue">failureIssue</a></code> | <code>boolean</code> | Create an issue when a publish task fails. |
| <code><a href="#projen.release.PublisherOptions.property.failureIssueLabel">failureIssueLabel</a></code> | <code>string</code> | The label to apply to the issue marking failed publish tasks. |
| <code><a href="#projen.release.PublisherOptions.property.jsiiReleaseVersion">jsiiReleaseVersion</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.release.PublisherOptions.property.publibVersion">publibVersion</a></code> | <code>string</code> | Version requirement for `publib`. |
| <code><a href="#projen.release.PublisherOptions.property.publishTasks">publishTasks</a></code> | <code>boolean</code> | Define publishing tasks that can be executed manually as well as workflows. |
| <code><a href="#projen.release.PublisherOptions.property.workflowContainerImage">workflowContainerImage</a></code> | <code>string</code> | Container image to use for GitHub workflows. |
| <code><a href="#projen.release.PublisherOptions.property.workflowNodeVersion">workflowNodeVersion</a></code> | <code>string</code> | Node version to setup in GitHub workflows if any node-based CLI utilities are needed. |
| <code><a href="#projen.release.PublisherOptions.property.workflowRunsOn">workflowRunsOn</a></code> | <code>string[]</code> | Github Runner selection labels. |
| <code><a href="#projen.release.PublisherOptions.property.workflowRunsOnGroup">workflowRunsOnGroup</a></code> | <code>projen.GroupRunnerOptions</code> | Github Runner Group selection options. |

---

##### `artifactName`<sup>Required</sup> <a name="artifactName" id="projen.release.PublisherOptions.property.artifactName"></a>

```typescript
public readonly artifactName: string;
```

- *Type:* string

The name of the artifact to download (e.g. `dist`).

The artifact is expected to include a subdirectory for each release target:
`go` (GitHub), `dotnet` (NuGet), `java` (Maven), `js` (npm), `python`
(PyPI).

> [https://github.com/aws/publib](https://github.com/aws/publib)

---

##### `buildJobId`<sup>Required</sup> <a name="buildJobId" id="projen.release.PublisherOptions.property.buildJobId"></a>

```typescript
public readonly buildJobId: string;
```

- *Type:* string

The job ID that produces the build artifacts.

All publish jobs will take a dependency on this job.

---

##### `condition`<sup>Optional</sup> <a name="condition" id="projen.release.PublisherOptions.property.condition"></a>

```typescript
public readonly condition: string;
```

- *Type:* string
- *Default:* no condition

A GitHub workflow expression used as a condition for publishers.

---

##### `dryRun`<sup>Optional</sup> <a name="dryRun" id="projen.release.PublisherOptions.property.dryRun"></a>

```typescript
public readonly dryRun: boolean;
```

- *Type:* boolean

Do not actually publish, only print the commands that would be executed instead.

Useful if you wish to block all publishing from a single option.

---

##### `failureIssue`<sup>Optional</sup> <a name="failureIssue" id="projen.release.PublisherOptions.property.failureIssue"></a>

```typescript
public readonly failureIssue: boolean;
```

- *Type:* boolean
- *Default:* false

Create an issue when a publish task fails.

---

##### `failureIssueLabel`<sup>Optional</sup> <a name="failureIssueLabel" id="projen.release.PublisherOptions.property.failureIssueLabel"></a>

```typescript
public readonly failureIssueLabel: string;
```

- *Type:* string
- *Default:* "failed-release"

The label to apply to the issue marking failed publish tasks.

Only applies if `failureIssue` is true.

---

##### ~~`jsiiReleaseVersion`~~<sup>Optional</sup> <a name="jsiiReleaseVersion" id="projen.release.PublisherOptions.property.jsiiReleaseVersion"></a>

- *Deprecated:* use `publibVersion` instead

```typescript
public readonly jsiiReleaseVersion: string;
```

- *Type:* string

---

##### `publibVersion`<sup>Optional</sup> <a name="publibVersion" id="projen.release.PublisherOptions.property.publibVersion"></a>

```typescript
public readonly publibVersion: string;
```

- *Type:* string
- *Default:* "latest"

Version requirement for `publib`.

---

##### `publishTasks`<sup>Optional</sup> <a name="publishTasks" id="projen.release.PublisherOptions.property.publishTasks"></a>

```typescript
public readonly publishTasks: boolean;
```

- *Type:* boolean
- *Default:* false

Define publishing tasks that can be executed manually as well as workflows.

Normally, publishing only happens within automated workflows. Enable this
in order to create a publishing task for each publishing activity.

---

##### `workflowContainerImage`<sup>Optional</sup> <a name="workflowContainerImage" id="projen.release.PublisherOptions.property.workflowContainerImage"></a>

```typescript
public readonly workflowContainerImage: string;
```

- *Type:* string
- *Default:* default image

Container image to use for GitHub workflows.

---

##### `workflowNodeVersion`<sup>Optional</sup> <a name="workflowNodeVersion" id="projen.release.PublisherOptions.property.workflowNodeVersion"></a>

```typescript
public readonly workflowNodeVersion: string;
```

- *Type:* string
- *Default:* 18.x

Node version to setup in GitHub workflows if any node-based CLI utilities are needed.

For example `publib`, the CLI projen uses to publish releases,
is an npm library.

---

##### `workflowRunsOn`<sup>Optional</sup> <a name="workflowRunsOn" id="projen.release.PublisherOptions.property.workflowRunsOn"></a>

```typescript
public readonly workflowRunsOn: string[];
```

- *Type:* string[]
- *Default:* ["ubuntu-latest"]

Github Runner selection labels.

---

##### `workflowRunsOnGroup`<sup>Optional</sup> <a name="workflowRunsOnGroup" id="projen.release.PublisherOptions.property.workflowRunsOnGroup"></a>

```typescript
public readonly workflowRunsOnGroup: GroupRunnerOptions;
```

- *Type:* projen.GroupRunnerOptions

Github Runner Group selection options.

---

### PyPiPublishOptions <a name="PyPiPublishOptions" id="projen.release.PyPiPublishOptions"></a>

Options for PyPI release.

#### Initializer <a name="Initializer" id="projen.release.PyPiPublishOptions.Initializer"></a>

```typescript
import { release } from 'projen'

const pyPiPublishOptions: release.PyPiPublishOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.release.PyPiPublishOptions.property.postPublishSteps">postPublishSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | Steps to execute after executing the publishing command. |
| <code><a href="#projen.release.PyPiPublishOptions.property.prePublishSteps">prePublishSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | Steps to execute before executing the publishing command. These can be used to prepare the artifact for publishing if neede. |
| <code><a href="#projen.release.PyPiPublishOptions.property.publishTools">publishTools</a></code> | <code>projen.github.workflows.Tools</code> | Additional tools to install in the publishing job. |
| <code><a href="#projen.release.PyPiPublishOptions.property.codeArtifactOptions">codeArtifactOptions</a></code> | <code><a href="#projen.release.CodeArtifactOptions">CodeArtifactOptions</a></code> | Options for publishing to AWS CodeArtifact. |
| <code><a href="#projen.release.PyPiPublishOptions.property.twinePasswordSecret">twinePasswordSecret</a></code> | <code>string</code> | The GitHub secret which contains PyPI password. |
| <code><a href="#projen.release.PyPiPublishOptions.property.twineRegistryUrl">twineRegistryUrl</a></code> | <code>string</code> | The registry url to use when releasing packages. |
| <code><a href="#projen.release.PyPiPublishOptions.property.twineUsernameSecret">twineUsernameSecret</a></code> | <code>string</code> | The GitHub secret which contains PyPI user name. |

---

##### `postPublishSteps`<sup>Optional</sup> <a name="postPublishSteps" id="projen.release.PyPiPublishOptions.property.postPublishSteps"></a>

```typescript
public readonly postPublishSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]

Steps to execute after executing the publishing command.

These can be used
to add/update the release artifacts ot any other tasks needed.


Note that when using this in `publishToGitHubReleases` this will override steps added via `addGitHubPostPublishingSteps`.

---

##### `prePublishSteps`<sup>Optional</sup> <a name="prePublishSteps" id="projen.release.PyPiPublishOptions.property.prePublishSteps"></a>

```typescript
public readonly prePublishSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]

Steps to execute before executing the publishing command. These can be used to prepare the artifact for publishing if neede.

These steps are executed after `dist/` has been populated with the build
output.

Note that when using this in `publishToGitHubReleases` this will override steps added via `addGitHubPrePublishingSteps`.

---

##### `publishTools`<sup>Optional</sup> <a name="publishTools" id="projen.release.PyPiPublishOptions.property.publishTools"></a>

```typescript
public readonly publishTools: Tools;
```

- *Type:* projen.github.workflows.Tools
- *Default:* no additional tools are installed

Additional tools to install in the publishing job.

---

##### `codeArtifactOptions`<sup>Optional</sup> <a name="codeArtifactOptions" id="projen.release.PyPiPublishOptions.property.codeArtifactOptions"></a>

```typescript
public readonly codeArtifactOptions: CodeArtifactOptions;
```

- *Type:* <a href="#projen.release.CodeArtifactOptions">CodeArtifactOptions</a>
- *Default:* undefined

Options for publishing to AWS CodeArtifact.

---

##### `twinePasswordSecret`<sup>Optional</sup> <a name="twinePasswordSecret" id="projen.release.PyPiPublishOptions.property.twinePasswordSecret"></a>

```typescript
public readonly twinePasswordSecret: string;
```

- *Type:* string
- *Default:* "TWINE_PASSWORD"

The GitHub secret which contains PyPI password.

---

##### `twineRegistryUrl`<sup>Optional</sup> <a name="twineRegistryUrl" id="projen.release.PyPiPublishOptions.property.twineRegistryUrl"></a>

```typescript
public readonly twineRegistryUrl: string;
```

- *Type:* string
- *Default:* twine default

The registry url to use when releasing packages.

---

##### `twineUsernameSecret`<sup>Optional</sup> <a name="twineUsernameSecret" id="projen.release.PyPiPublishOptions.property.twineUsernameSecret"></a>

```typescript
public readonly twineUsernameSecret: string;
```

- *Type:* string
- *Default:* "TWINE_USERNAME"

The GitHub secret which contains PyPI user name.

---

### ReleaseOptions <a name="ReleaseOptions" id="projen.release.ReleaseOptions"></a>

Options for `Release`.

#### Initializer <a name="Initializer" id="projen.release.ReleaseOptions.Initializer"></a>

```typescript
import { release } from 'projen'

const releaseOptions: release.ReleaseOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.release.ReleaseOptions.property.jsiiReleaseVersion">jsiiReleaseVersion</a></code> | <code>string</code> | Version requirement of `publib` which is used to publish modules to npm. |
| <code><a href="#projen.release.ReleaseOptions.property.majorVersion">majorVersion</a></code> | <code>number</code> | Major version to release from the default branch. |
| <code><a href="#projen.release.ReleaseOptions.property.minMajorVersion">minMajorVersion</a></code> | <code>number</code> | Minimal Major version to release. |
| <code><a href="#projen.release.ReleaseOptions.property.npmDistTag">npmDistTag</a></code> | <code>string</code> | The npmDistTag to use when publishing from the default branch. |
| <code><a href="#projen.release.ReleaseOptions.property.postBuildSteps">postBuildSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | Steps to execute after build as part of the release workflow. |
| <code><a href="#projen.release.ReleaseOptions.property.prerelease">prerelease</a></code> | <code>string</code> | Bump versions from the default branch as pre-releases (e.g. "beta", "alpha", "pre"). |
| <code><a href="#projen.release.ReleaseOptions.property.publishDryRun">publishDryRun</a></code> | <code>boolean</code> | Instead of actually publishing to package managers, just print the publishing command. |
| <code><a href="#projen.release.ReleaseOptions.property.publishTasks">publishTasks</a></code> | <code>boolean</code> | Define publishing tasks that can be executed manually as well as workflows. |
| <code><a href="#projen.release.ReleaseOptions.property.releasableCommits">releasableCommits</a></code> | <code>projen.ReleasableCommits</code> | Find commits that should be considered releasable Used to decide if a release is required. |
| <code><a href="#projen.release.ReleaseOptions.property.releaseBranches">releaseBranches</a></code> | <code>{[ key: string ]: <a href="#projen.release.BranchOptions">BranchOptions</a>}</code> | Defines additional release branches. |
| <code><a href="#projen.release.ReleaseOptions.property.releaseEveryCommit">releaseEveryCommit</a></code> | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`. |
| <code><a href="#projen.release.ReleaseOptions.property.releaseFailureIssue">releaseFailureIssue</a></code> | <code>boolean</code> | Create a github issue on every failed publishing task. |
| <code><a href="#projen.release.ReleaseOptions.property.releaseFailureIssueLabel">releaseFailureIssueLabel</a></code> | <code>string</code> | The label to apply to issues indicating publish failures. |
| <code><a href="#projen.release.ReleaseOptions.property.releaseSchedule">releaseSchedule</a></code> | <code>string</code> | CRON schedule to trigger new releases. |
| <code><a href="#projen.release.ReleaseOptions.property.releaseTagPrefix">releaseTagPrefix</a></code> | <code>string</code> | Automatically add the given prefix to release tags. Useful if you are releasing on multiple branches with overlapping version numbers. |
| <code><a href="#projen.release.ReleaseOptions.property.releaseTrigger">releaseTrigger</a></code> | <code><a href="#projen.release.ReleaseTrigger">ReleaseTrigger</a></code> | The release trigger to use. |
| <code><a href="#projen.release.ReleaseOptions.property.releaseWorkflowName">releaseWorkflowName</a></code> | <code>string</code> | The name of the default release workflow. |
| <code><a href="#projen.release.ReleaseOptions.property.releaseWorkflowSetupSteps">releaseWorkflowSetupSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | A set of workflow steps to execute in order to setup the workflow container. |
| <code><a href="#projen.release.ReleaseOptions.property.versionrcOptions">versionrcOptions</a></code> | <code>{[ key: string ]: any}</code> | Custom configuration used when creating changelog with commit-and-tag-version package. |
| <code><a href="#projen.release.ReleaseOptions.property.workflowContainerImage">workflowContainerImage</a></code> | <code>string</code> | Container image to use for GitHub workflows. |
| <code><a href="#projen.release.ReleaseOptions.property.workflowRunsOn">workflowRunsOn</a></code> | <code>string[]</code> | Github Runner selection labels. |
| <code><a href="#projen.release.ReleaseOptions.property.workflowRunsOnGroup">workflowRunsOnGroup</a></code> | <code>projen.GroupRunnerOptions</code> | Github Runner Group selection options. |
| <code><a href="#projen.release.ReleaseOptions.property.artifactsDirectory">artifactsDirectory</a></code> | <code>string</code> | A directory which will contain build artifacts. |
| <code><a href="#projen.release.ReleaseOptions.property.branch">branch</a></code> | <code>string</code> | The default branch name to release from. |
| <code><a href="#projen.release.ReleaseOptions.property.task">task</a></code> | <code>projen.Task</code> | The task to execute in order to create the release artifacts. |
| <code><a href="#projen.release.ReleaseOptions.property.versionFile">versionFile</a></code> | <code>string</code> | A name of a .json file to set the `version` field in after a bump. |
| <code><a href="#projen.release.ReleaseOptions.property.githubRelease">githubRelease</a></code> | <code>boolean</code> | Create a GitHub release for each release. |
| <code><a href="#projen.release.ReleaseOptions.property.workflowNodeVersion">workflowNodeVersion</a></code> | <code>string</code> | Node version to setup in GitHub workflows if any node-based CLI utilities are needed. |
| <code><a href="#projen.release.ReleaseOptions.property.workflowPermissions">workflowPermissions</a></code> | <code>projen.github.workflows.JobPermissions</code> | Permissions granted to the release workflow job. |

---

##### `jsiiReleaseVersion`<sup>Optional</sup> <a name="jsiiReleaseVersion" id="projen.release.ReleaseOptions.property.jsiiReleaseVersion"></a>

```typescript
public readonly jsiiReleaseVersion: string;
```

- *Type:* string
- *Default:* "latest"

Version requirement of `publib` which is used to publish modules to npm.

---

##### `majorVersion`<sup>Optional</sup> <a name="majorVersion" id="projen.release.ReleaseOptions.property.majorVersion"></a>

```typescript
public readonly majorVersion: number;
```

- *Type:* number
- *Default:* Major version is not enforced.

Major version to release from the default branch.

If this is specified, we bump the latest version of this major version line.
If not specified, we bump the global latest version.

---

##### `minMajorVersion`<sup>Optional</sup> <a name="minMajorVersion" id="projen.release.ReleaseOptions.property.minMajorVersion"></a>

```typescript
public readonly minMajorVersion: number;
```

- *Type:* number
- *Default:* No minimum version is being enforced

Minimal Major version to release.

This can be useful to set to 1, as breaking changes before the 1.x major
release are not incrementing the major version number.

Can not be set together with `majorVersion`.

---

##### `npmDistTag`<sup>Optional</sup> <a name="npmDistTag" id="projen.release.ReleaseOptions.property.npmDistTag"></a>

```typescript
public readonly npmDistTag: string;
```

- *Type:* string
- *Default:* "latest"

The npmDistTag to use when publishing from the default branch.

To set the npm dist-tag for release branches, set the `npmDistTag` property
for each branch.

---

##### `postBuildSteps`<sup>Optional</sup> <a name="postBuildSteps" id="projen.release.ReleaseOptions.property.postBuildSteps"></a>

```typescript
public readonly postBuildSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]
- *Default:* []

Steps to execute after build as part of the release workflow.

---

##### `prerelease`<sup>Optional</sup> <a name="prerelease" id="projen.release.ReleaseOptions.property.prerelease"></a>

```typescript
public readonly prerelease: string;
```

- *Type:* string
- *Default:* normal semantic versions

Bump versions from the default branch as pre-releases (e.g. "beta", "alpha", "pre").

---

##### `publishDryRun`<sup>Optional</sup> <a name="publishDryRun" id="projen.release.ReleaseOptions.property.publishDryRun"></a>

```typescript
public readonly publishDryRun: boolean;
```

- *Type:* boolean
- *Default:* false

Instead of actually publishing to package managers, just print the publishing command.

---

##### `publishTasks`<sup>Optional</sup> <a name="publishTasks" id="projen.release.ReleaseOptions.property.publishTasks"></a>

```typescript
public readonly publishTasks: boolean;
```

- *Type:* boolean
- *Default:* false

Define publishing tasks that can be executed manually as well as workflows.

Normally, publishing only happens within automated workflows. Enable this
in order to create a publishing task for each publishing activity.

---

##### `releasableCommits`<sup>Optional</sup> <a name="releasableCommits" id="projen.release.ReleaseOptions.property.releasableCommits"></a>

```typescript
public readonly releasableCommits: ReleasableCommits;
```

- *Type:* projen.ReleasableCommits
- *Default:* ReleasableCommits.everyCommit()

Find commits that should be considered releasable Used to decide if a release is required.

---

##### `releaseBranches`<sup>Optional</sup> <a name="releaseBranches" id="projen.release.ReleaseOptions.property.releaseBranches"></a>

```typescript
public readonly releaseBranches: {[ key: string ]: BranchOptions};
```

- *Type:* {[ key: string ]: <a href="#projen.release.BranchOptions">BranchOptions</a>}
- *Default:* no additional branches are used for release. you can use `addBranch()` to add additional branches.

Defines additional release branches.

A workflow will be created for each
release branch which will publish releases from commits in this branch.
Each release branch _must_ be assigned a major version number which is used
to enforce that versions published from that branch always use that major
version. If multiple branches are used, the `majorVersion` field must also
be provided for the default branch.

---

##### ~~`releaseEveryCommit`~~<sup>Optional</sup> <a name="releaseEveryCommit" id="projen.release.ReleaseOptions.property.releaseEveryCommit"></a>

- *Deprecated:* Use `releaseTrigger: ReleaseTrigger.continuous()` instead

```typescript
public readonly releaseEveryCommit: boolean;
```

- *Type:* boolean
- *Default:* true

Automatically release new versions every commit to one of branches in `releaseBranches`.

---

##### `releaseFailureIssue`<sup>Optional</sup> <a name="releaseFailureIssue" id="projen.release.ReleaseOptions.property.releaseFailureIssue"></a>

```typescript
public readonly releaseFailureIssue: boolean;
```

- *Type:* boolean
- *Default:* false

Create a github issue on every failed publishing task.

---

##### `releaseFailureIssueLabel`<sup>Optional</sup> <a name="releaseFailureIssueLabel" id="projen.release.ReleaseOptions.property.releaseFailureIssueLabel"></a>

```typescript
public readonly releaseFailureIssueLabel: string;
```

- *Type:* string
- *Default:* "failed-release"

The label to apply to issues indicating publish failures.

Only applies if `releaseFailureIssue` is true.

---

##### ~~`releaseSchedule`~~<sup>Optional</sup> <a name="releaseSchedule" id="projen.release.ReleaseOptions.property.releaseSchedule"></a>

- *Deprecated:* Use `releaseTrigger: ReleaseTrigger.scheduled()` instead

```typescript
public readonly releaseSchedule: string;
```

- *Type:* string
- *Default:* no scheduled releases

CRON schedule to trigger new releases.

---

##### `releaseTagPrefix`<sup>Optional</sup> <a name="releaseTagPrefix" id="projen.release.ReleaseOptions.property.releaseTagPrefix"></a>

```typescript
public readonly releaseTagPrefix: string;
```

- *Type:* string
- *Default:* "v"

Automatically add the given prefix to release tags. Useful if you are releasing on multiple branches with overlapping version numbers.

Note: this prefix is used to detect the latest tagged version
when bumping, so if you change this on a project with an existing version
history, you may need to manually tag your latest release
with the new prefix.

---

##### `releaseTrigger`<sup>Optional</sup> <a name="releaseTrigger" id="projen.release.ReleaseOptions.property.releaseTrigger"></a>

```typescript
public readonly releaseTrigger: ReleaseTrigger;
```

- *Type:* <a href="#projen.release.ReleaseTrigger">ReleaseTrigger</a>
- *Default:* Continuous releases (`ReleaseTrigger.continuous()`)

The release trigger to use.

---

##### `releaseWorkflowName`<sup>Optional</sup> <a name="releaseWorkflowName" id="projen.release.ReleaseOptions.property.releaseWorkflowName"></a>

```typescript
public readonly releaseWorkflowName: string;
```

- *Type:* string
- *Default:* "release"

The name of the default release workflow.

---

##### `releaseWorkflowSetupSteps`<sup>Optional</sup> <a name="releaseWorkflowSetupSteps" id="projen.release.ReleaseOptions.property.releaseWorkflowSetupSteps"></a>

```typescript
public readonly releaseWorkflowSetupSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]

A set of workflow steps to execute in order to setup the workflow container.

---

##### `versionrcOptions`<sup>Optional</sup> <a name="versionrcOptions" id="projen.release.ReleaseOptions.property.versionrcOptions"></a>

```typescript
public readonly versionrcOptions: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}
- *Default:* standard configuration applicable for GitHub repositories

Custom configuration used when creating changelog with commit-and-tag-version package.

Given values either append to default configuration or overwrite values in it.

---

##### `workflowContainerImage`<sup>Optional</sup> <a name="workflowContainerImage" id="projen.release.ReleaseOptions.property.workflowContainerImage"></a>

```typescript
public readonly workflowContainerImage: string;
```

- *Type:* string
- *Default:* default image

Container image to use for GitHub workflows.

---

##### `workflowRunsOn`<sup>Optional</sup> <a name="workflowRunsOn" id="projen.release.ReleaseOptions.property.workflowRunsOn"></a>

```typescript
public readonly workflowRunsOn: string[];
```

- *Type:* string[]
- *Default:* ["ubuntu-latest"]

Github Runner selection labels.

---

##### `workflowRunsOnGroup`<sup>Optional</sup> <a name="workflowRunsOnGroup" id="projen.release.ReleaseOptions.property.workflowRunsOnGroup"></a>

```typescript
public readonly workflowRunsOnGroup: GroupRunnerOptions;
```

- *Type:* projen.GroupRunnerOptions

Github Runner Group selection options.

---

##### `artifactsDirectory`<sup>Required</sup> <a name="artifactsDirectory" id="projen.release.ReleaseOptions.property.artifactsDirectory"></a>

```typescript
public readonly artifactsDirectory: string;
```

- *Type:* string
- *Default:* "dist"

A directory which will contain build artifacts.

---

##### `branch`<sup>Required</sup> <a name="branch" id="projen.release.ReleaseOptions.property.branch"></a>

```typescript
public readonly branch: string;
```

- *Type:* string

The default branch name to release from.

Use `majorVersion` to restrict this branch to only publish releases with a
specific major version.

You can add additional branches using `addBranch()`.

---

##### `task`<sup>Required</sup> <a name="task" id="projen.release.ReleaseOptions.property.task"></a>

```typescript
public readonly task: Task;
```

- *Type:* projen.Task

The task to execute in order to create the release artifacts.

Artifacts are
expected to reside under `artifactsDirectory` (defaults to `dist/`) once
build is complete.

---

##### `versionFile`<sup>Required</sup> <a name="versionFile" id="projen.release.ReleaseOptions.property.versionFile"></a>

```typescript
public readonly versionFile: string;
```

- *Type:* string

A name of a .json file to set the `version` field in after a bump.

---

*Example*

```typescript
"package.json"
```


##### `githubRelease`<sup>Optional</sup> <a name="githubRelease" id="projen.release.ReleaseOptions.property.githubRelease"></a>

```typescript
public readonly githubRelease: boolean;
```

- *Type:* boolean
- *Default:* true

Create a GitHub release for each release.

---

##### `workflowNodeVersion`<sup>Optional</sup> <a name="workflowNodeVersion" id="projen.release.ReleaseOptions.property.workflowNodeVersion"></a>

```typescript
public readonly workflowNodeVersion: string;
```

- *Type:* string
- *Default:* 18.x

Node version to setup in GitHub workflows if any node-based CLI utilities are needed.

For example `publib`, the CLI projen uses to publish releases,
is an npm library.

---

##### `workflowPermissions`<sup>Optional</sup> <a name="workflowPermissions" id="projen.release.ReleaseOptions.property.workflowPermissions"></a>

```typescript
public readonly workflowPermissions: JobPermissions;
```

- *Type:* projen.github.workflows.JobPermissions
- *Default:* `{ contents: JobPermission.WRITE }`

Permissions granted to the release workflow job.

---

### ReleaseProjectOptions <a name="ReleaseProjectOptions" id="projen.release.ReleaseProjectOptions"></a>

Project options for release.

#### Initializer <a name="Initializer" id="projen.release.ReleaseProjectOptions.Initializer"></a>

```typescript
import { release } from 'projen'

const releaseProjectOptions: release.ReleaseProjectOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.release.ReleaseProjectOptions.property.jsiiReleaseVersion">jsiiReleaseVersion</a></code> | <code>string</code> | Version requirement of `publib` which is used to publish modules to npm. |
| <code><a href="#projen.release.ReleaseProjectOptions.property.majorVersion">majorVersion</a></code> | <code>number</code> | Major version to release from the default branch. |
| <code><a href="#projen.release.ReleaseProjectOptions.property.minMajorVersion">minMajorVersion</a></code> | <code>number</code> | Minimal Major version to release. |
| <code><a href="#projen.release.ReleaseProjectOptions.property.npmDistTag">npmDistTag</a></code> | <code>string</code> | The npmDistTag to use when publishing from the default branch. |
| <code><a href="#projen.release.ReleaseProjectOptions.property.postBuildSteps">postBuildSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | Steps to execute after build as part of the release workflow. |
| <code><a href="#projen.release.ReleaseProjectOptions.property.prerelease">prerelease</a></code> | <code>string</code> | Bump versions from the default branch as pre-releases (e.g. "beta", "alpha", "pre"). |
| <code><a href="#projen.release.ReleaseProjectOptions.property.publishDryRun">publishDryRun</a></code> | <code>boolean</code> | Instead of actually publishing to package managers, just print the publishing command. |
| <code><a href="#projen.release.ReleaseProjectOptions.property.publishTasks">publishTasks</a></code> | <code>boolean</code> | Define publishing tasks that can be executed manually as well as workflows. |
| <code><a href="#projen.release.ReleaseProjectOptions.property.releasableCommits">releasableCommits</a></code> | <code>projen.ReleasableCommits</code> | Find commits that should be considered releasable Used to decide if a release is required. |
| <code><a href="#projen.release.ReleaseProjectOptions.property.releaseBranches">releaseBranches</a></code> | <code>{[ key: string ]: <a href="#projen.release.BranchOptions">BranchOptions</a>}</code> | Defines additional release branches. |
| <code><a href="#projen.release.ReleaseProjectOptions.property.releaseEveryCommit">releaseEveryCommit</a></code> | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`. |
| <code><a href="#projen.release.ReleaseProjectOptions.property.releaseFailureIssue">releaseFailureIssue</a></code> | <code>boolean</code> | Create a github issue on every failed publishing task. |
| <code><a href="#projen.release.ReleaseProjectOptions.property.releaseFailureIssueLabel">releaseFailureIssueLabel</a></code> | <code>string</code> | The label to apply to issues indicating publish failures. |
| <code><a href="#projen.release.ReleaseProjectOptions.property.releaseSchedule">releaseSchedule</a></code> | <code>string</code> | CRON schedule to trigger new releases. |
| <code><a href="#projen.release.ReleaseProjectOptions.property.releaseTagPrefix">releaseTagPrefix</a></code> | <code>string</code> | Automatically add the given prefix to release tags. Useful if you are releasing on multiple branches with overlapping version numbers. |
| <code><a href="#projen.release.ReleaseProjectOptions.property.releaseTrigger">releaseTrigger</a></code> | <code><a href="#projen.release.ReleaseTrigger">ReleaseTrigger</a></code> | The release trigger to use. |
| <code><a href="#projen.release.ReleaseProjectOptions.property.releaseWorkflowName">releaseWorkflowName</a></code> | <code>string</code> | The name of the default release workflow. |
| <code><a href="#projen.release.ReleaseProjectOptions.property.releaseWorkflowSetupSteps">releaseWorkflowSetupSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | A set of workflow steps to execute in order to setup the workflow container. |
| <code><a href="#projen.release.ReleaseProjectOptions.property.versionrcOptions">versionrcOptions</a></code> | <code>{[ key: string ]: any}</code> | Custom configuration used when creating changelog with commit-and-tag-version package. |
| <code><a href="#projen.release.ReleaseProjectOptions.property.workflowContainerImage">workflowContainerImage</a></code> | <code>string</code> | Container image to use for GitHub workflows. |
| <code><a href="#projen.release.ReleaseProjectOptions.property.workflowRunsOn">workflowRunsOn</a></code> | <code>string[]</code> | Github Runner selection labels. |
| <code><a href="#projen.release.ReleaseProjectOptions.property.workflowRunsOnGroup">workflowRunsOnGroup</a></code> | <code>projen.GroupRunnerOptions</code> | Github Runner Group selection options. |

---

##### `jsiiReleaseVersion`<sup>Optional</sup> <a name="jsiiReleaseVersion" id="projen.release.ReleaseProjectOptions.property.jsiiReleaseVersion"></a>

```typescript
public readonly jsiiReleaseVersion: string;
```

- *Type:* string
- *Default:* "latest"

Version requirement of `publib` which is used to publish modules to npm.

---

##### `majorVersion`<sup>Optional</sup> <a name="majorVersion" id="projen.release.ReleaseProjectOptions.property.majorVersion"></a>

```typescript
public readonly majorVersion: number;
```

- *Type:* number
- *Default:* Major version is not enforced.

Major version to release from the default branch.

If this is specified, we bump the latest version of this major version line.
If not specified, we bump the global latest version.

---

##### `minMajorVersion`<sup>Optional</sup> <a name="minMajorVersion" id="projen.release.ReleaseProjectOptions.property.minMajorVersion"></a>

```typescript
public readonly minMajorVersion: number;
```

- *Type:* number
- *Default:* No minimum version is being enforced

Minimal Major version to release.

This can be useful to set to 1, as breaking changes before the 1.x major
release are not incrementing the major version number.

Can not be set together with `majorVersion`.

---

##### `npmDistTag`<sup>Optional</sup> <a name="npmDistTag" id="projen.release.ReleaseProjectOptions.property.npmDistTag"></a>

```typescript
public readonly npmDistTag: string;
```

- *Type:* string
- *Default:* "latest"

The npmDistTag to use when publishing from the default branch.

To set the npm dist-tag for release branches, set the `npmDistTag` property
for each branch.

---

##### `postBuildSteps`<sup>Optional</sup> <a name="postBuildSteps" id="projen.release.ReleaseProjectOptions.property.postBuildSteps"></a>

```typescript
public readonly postBuildSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]
- *Default:* []

Steps to execute after build as part of the release workflow.

---

##### `prerelease`<sup>Optional</sup> <a name="prerelease" id="projen.release.ReleaseProjectOptions.property.prerelease"></a>

```typescript
public readonly prerelease: string;
```

- *Type:* string
- *Default:* normal semantic versions

Bump versions from the default branch as pre-releases (e.g. "beta", "alpha", "pre").

---

##### `publishDryRun`<sup>Optional</sup> <a name="publishDryRun" id="projen.release.ReleaseProjectOptions.property.publishDryRun"></a>

```typescript
public readonly publishDryRun: boolean;
```

- *Type:* boolean
- *Default:* false

Instead of actually publishing to package managers, just print the publishing command.

---

##### `publishTasks`<sup>Optional</sup> <a name="publishTasks" id="projen.release.ReleaseProjectOptions.property.publishTasks"></a>

```typescript
public readonly publishTasks: boolean;
```

- *Type:* boolean
- *Default:* false

Define publishing tasks that can be executed manually as well as workflows.

Normally, publishing only happens within automated workflows. Enable this
in order to create a publishing task for each publishing activity.

---

##### `releasableCommits`<sup>Optional</sup> <a name="releasableCommits" id="projen.release.ReleaseProjectOptions.property.releasableCommits"></a>

```typescript
public readonly releasableCommits: ReleasableCommits;
```

- *Type:* projen.ReleasableCommits
- *Default:* ReleasableCommits.everyCommit()

Find commits that should be considered releasable Used to decide if a release is required.

---

##### `releaseBranches`<sup>Optional</sup> <a name="releaseBranches" id="projen.release.ReleaseProjectOptions.property.releaseBranches"></a>

```typescript
public readonly releaseBranches: {[ key: string ]: BranchOptions};
```

- *Type:* {[ key: string ]: <a href="#projen.release.BranchOptions">BranchOptions</a>}
- *Default:* no additional branches are used for release. you can use `addBranch()` to add additional branches.

Defines additional release branches.

A workflow will be created for each
release branch which will publish releases from commits in this branch.
Each release branch _must_ be assigned a major version number which is used
to enforce that versions published from that branch always use that major
version. If multiple branches are used, the `majorVersion` field must also
be provided for the default branch.

---

##### ~~`releaseEveryCommit`~~<sup>Optional</sup> <a name="releaseEveryCommit" id="projen.release.ReleaseProjectOptions.property.releaseEveryCommit"></a>

- *Deprecated:* Use `releaseTrigger: ReleaseTrigger.continuous()` instead

```typescript
public readonly releaseEveryCommit: boolean;
```

- *Type:* boolean
- *Default:* true

Automatically release new versions every commit to one of branches in `releaseBranches`.

---

##### `releaseFailureIssue`<sup>Optional</sup> <a name="releaseFailureIssue" id="projen.release.ReleaseProjectOptions.property.releaseFailureIssue"></a>

```typescript
public readonly releaseFailureIssue: boolean;
```

- *Type:* boolean
- *Default:* false

Create a github issue on every failed publishing task.

---

##### `releaseFailureIssueLabel`<sup>Optional</sup> <a name="releaseFailureIssueLabel" id="projen.release.ReleaseProjectOptions.property.releaseFailureIssueLabel"></a>

```typescript
public readonly releaseFailureIssueLabel: string;
```

- *Type:* string
- *Default:* "failed-release"

The label to apply to issues indicating publish failures.

Only applies if `releaseFailureIssue` is true.

---

##### ~~`releaseSchedule`~~<sup>Optional</sup> <a name="releaseSchedule" id="projen.release.ReleaseProjectOptions.property.releaseSchedule"></a>

- *Deprecated:* Use `releaseTrigger: ReleaseTrigger.scheduled()` instead

```typescript
public readonly releaseSchedule: string;
```

- *Type:* string
- *Default:* no scheduled releases

CRON schedule to trigger new releases.

---

##### `releaseTagPrefix`<sup>Optional</sup> <a name="releaseTagPrefix" id="projen.release.ReleaseProjectOptions.property.releaseTagPrefix"></a>

```typescript
public readonly releaseTagPrefix: string;
```

- *Type:* string
- *Default:* "v"

Automatically add the given prefix to release tags. Useful if you are releasing on multiple branches with overlapping version numbers.

Note: this prefix is used to detect the latest tagged version
when bumping, so if you change this on a project with an existing version
history, you may need to manually tag your latest release
with the new prefix.

---

##### `releaseTrigger`<sup>Optional</sup> <a name="releaseTrigger" id="projen.release.ReleaseProjectOptions.property.releaseTrigger"></a>

```typescript
public readonly releaseTrigger: ReleaseTrigger;
```

- *Type:* <a href="#projen.release.ReleaseTrigger">ReleaseTrigger</a>
- *Default:* Continuous releases (`ReleaseTrigger.continuous()`)

The release trigger to use.

---

##### `releaseWorkflowName`<sup>Optional</sup> <a name="releaseWorkflowName" id="projen.release.ReleaseProjectOptions.property.releaseWorkflowName"></a>

```typescript
public readonly releaseWorkflowName: string;
```

- *Type:* string
- *Default:* "release"

The name of the default release workflow.

---

##### `releaseWorkflowSetupSteps`<sup>Optional</sup> <a name="releaseWorkflowSetupSteps" id="projen.release.ReleaseProjectOptions.property.releaseWorkflowSetupSteps"></a>

```typescript
public readonly releaseWorkflowSetupSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]

A set of workflow steps to execute in order to setup the workflow container.

---

##### `versionrcOptions`<sup>Optional</sup> <a name="versionrcOptions" id="projen.release.ReleaseProjectOptions.property.versionrcOptions"></a>

```typescript
public readonly versionrcOptions: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}
- *Default:* standard configuration applicable for GitHub repositories

Custom configuration used when creating changelog with commit-and-tag-version package.

Given values either append to default configuration or overwrite values in it.

---

##### `workflowContainerImage`<sup>Optional</sup> <a name="workflowContainerImage" id="projen.release.ReleaseProjectOptions.property.workflowContainerImage"></a>

```typescript
public readonly workflowContainerImage: string;
```

- *Type:* string
- *Default:* default image

Container image to use for GitHub workflows.

---

##### `workflowRunsOn`<sup>Optional</sup> <a name="workflowRunsOn" id="projen.release.ReleaseProjectOptions.property.workflowRunsOn"></a>

```typescript
public readonly workflowRunsOn: string[];
```

- *Type:* string[]
- *Default:* ["ubuntu-latest"]

Github Runner selection labels.

---

##### `workflowRunsOnGroup`<sup>Optional</sup> <a name="workflowRunsOnGroup" id="projen.release.ReleaseProjectOptions.property.workflowRunsOnGroup"></a>

```typescript
public readonly workflowRunsOnGroup: GroupRunnerOptions;
```

- *Type:* projen.GroupRunnerOptions

Github Runner Group selection options.

---

### ScheduledReleaseOptions <a name="ScheduledReleaseOptions" id="projen.release.ScheduledReleaseOptions"></a>

#### Initializer <a name="Initializer" id="projen.release.ScheduledReleaseOptions.Initializer"></a>

```typescript
import { release } from 'projen'

const scheduledReleaseOptions: release.ScheduledReleaseOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.release.ScheduledReleaseOptions.property.schedule">schedule</a></code> | <code>string</code> | Cron schedule for releases. |

---

##### `schedule`<sup>Required</sup> <a name="schedule" id="projen.release.ScheduledReleaseOptions.property.schedule"></a>

```typescript
public readonly schedule: string;
```

- *Type:* string

Cron schedule for releases.

Only defined if this is a scheduled release.

---

*Example*

```typescript
'0 17 * * *' - every day at 5 pm
```


## Classes <a name="Classes" id="Classes"></a>

### ReleaseTrigger <a name="ReleaseTrigger" id="projen.release.ReleaseTrigger"></a>

Used to manage release strategies.

This includes release
and release artifact automation


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.release.ReleaseTrigger.continuous">continuous</a></code> | Creates a continuous release trigger. |
| <code><a href="#projen.release.ReleaseTrigger.manual">manual</a></code> | Creates a manual release trigger. |
| <code><a href="#projen.release.ReleaseTrigger.scheduled">scheduled</a></code> | Creates a scheduled release trigger. |

---

##### `continuous` <a name="continuous" id="projen.release.ReleaseTrigger.continuous"></a>

```typescript
import { release } from 'projen'

release.ReleaseTrigger.continuous(options?: ContinuousReleaseOptions)
```

Creates a continuous release trigger.

Automated releases will occur on every commit.

###### `options`<sup>Optional</sup> <a name="options" id="projen.release.ReleaseTrigger.continuous.parameter.options"></a>

- *Type:* <a href="#projen.release.ContinuousReleaseOptions">ContinuousReleaseOptions</a>

---

##### `manual` <a name="manual" id="projen.release.ReleaseTrigger.manual"></a>

```typescript
import { release } from 'projen'

release.ReleaseTrigger.manual(options?: ManualReleaseOptions)
```

Creates a manual release trigger.

Use this option if you want totally manual releases.

This will give you a release task that, in addition to the normal
release activities will trigger a `publish:git` task. This task will
handle project-level changelog management, release tagging, and pushing
these artifacts to origin.

The command used for pushing can be customised by specifying
`gitPushCommand`. Set to an empty string to disable pushing entirely.

Simply run `yarn release` to trigger a manual release.

###### `options`<sup>Optional</sup> <a name="options" id="projen.release.ReleaseTrigger.manual.parameter.options"></a>

- *Type:* <a href="#projen.release.ManualReleaseOptions">ManualReleaseOptions</a>

release options.

---

##### `scheduled` <a name="scheduled" id="projen.release.ReleaseTrigger.scheduled"></a>

```typescript
import { release } from 'projen'

release.ReleaseTrigger.scheduled(options: ScheduledReleaseOptions)
```

Creates a scheduled release trigger.

Automated releases will occur based on the provided cron schedule.

###### `options`<sup>Required</sup> <a name="options" id="projen.release.ReleaseTrigger.scheduled.parameter.options"></a>

- *Type:* <a href="#projen.release.ScheduledReleaseOptions">ScheduledReleaseOptions</a>

release options.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.release.ReleaseTrigger.property.isContinuous">isContinuous</a></code> | <code>boolean</code> | Whether or not this is a continuous release. |
| <code><a href="#projen.release.ReleaseTrigger.property.isManual">isManual</a></code> | <code>boolean</code> | Whether or not this is a manual release trigger. |
| <code><a href="#projen.release.ReleaseTrigger.property.changelogPath">changelogPath</a></code> | <code>string</code> | Project-level changelog file path. |
| <code><a href="#projen.release.ReleaseTrigger.property.gitPushCommand">gitPushCommand</a></code> | <code>string</code> | Override git-push command used when releasing manually. |
| <code><a href="#projen.release.ReleaseTrigger.property.paths">paths</a></code> | <code>string[]</code> | Paths for which pushes will trigger a release when `isContinuous` is `true`. |
| <code><a href="#projen.release.ReleaseTrigger.property.schedule">schedule</a></code> | <code>string</code> | Cron schedule for releases. |

---

##### `isContinuous`<sup>Required</sup> <a name="isContinuous" id="projen.release.ReleaseTrigger.property.isContinuous"></a>

```typescript
public readonly isContinuous: boolean;
```

- *Type:* boolean

Whether or not this is a continuous release.

---

##### `isManual`<sup>Required</sup> <a name="isManual" id="projen.release.ReleaseTrigger.property.isManual"></a>

```typescript
public readonly isManual: boolean;
```

- *Type:* boolean

Whether or not this is a manual release trigger.

---

##### `changelogPath`<sup>Optional</sup> <a name="changelogPath" id="projen.release.ReleaseTrigger.property.changelogPath"></a>

```typescript
public readonly changelogPath: string;
```

- *Type:* string

Project-level changelog file path.

---

##### `gitPushCommand`<sup>Optional</sup> <a name="gitPushCommand" id="projen.release.ReleaseTrigger.property.gitPushCommand"></a>

```typescript
public readonly gitPushCommand: string;
```

- *Type:* string

Override git-push command used when releasing manually.

Set to an empty string to disable pushing.

---

##### `paths`<sup>Optional</sup> <a name="paths" id="projen.release.ReleaseTrigger.property.paths"></a>

```typescript
public readonly paths: string[];
```

- *Type:* string[]

Paths for which pushes will trigger a release when `isContinuous` is `true`.

---

##### `schedule`<sup>Optional</sup> <a name="schedule" id="projen.release.ReleaseTrigger.property.schedule"></a>

```typescript
public readonly schedule: string;
```

- *Type:* string

Cron schedule for releases.

Only defined if this is a scheduled release.

---

*Example*

```typescript
'0 17 * * *' - every day at 5 pm
```




## Enums <a name="Enums" id="Enums"></a>

### CodeArtifactAuthProvider <a name="CodeArtifactAuthProvider" id="projen.release.CodeArtifactAuthProvider"></a>

Options for authorizing requests to a AWS CodeArtifact npm repository.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.release.CodeArtifactAuthProvider.ACCESS_AND_SECRET_KEY_PAIR">ACCESS_AND_SECRET_KEY_PAIR</a></code> | Fixed credentials provided via Github secrets. |
| <code><a href="#projen.release.CodeArtifactAuthProvider.GITHUB_OIDC">GITHUB_OIDC</a></code> | Ephemeral credentials provided via Github's OIDC integration with an IAM role. |

---

##### `ACCESS_AND_SECRET_KEY_PAIR` <a name="ACCESS_AND_SECRET_KEY_PAIR" id="projen.release.CodeArtifactAuthProvider.ACCESS_AND_SECRET_KEY_PAIR"></a>

Fixed credentials provided via Github secrets.

---


##### `GITHUB_OIDC` <a name="GITHUB_OIDC" id="projen.release.CodeArtifactAuthProvider.GITHUB_OIDC"></a>

Ephemeral credentials provided via Github's OIDC integration with an IAM role.

See:
https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html
https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services

---

