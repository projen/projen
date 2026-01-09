# `java` Submodule <a name="`java` Submodule" id="projen.java"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### JavaProject <a name="JavaProject" id="projen.java.JavaProject"></a>

Java project.

#### Initializers <a name="Initializers" id="projen.java.JavaProject.Initializer"></a>

```typescript
import { java } from 'projen'

new java.JavaProject(options: JavaProjectOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.java.JavaProject.Initializer.parameter.options">options</a></code> | <code><a href="#projen.java.JavaProjectOptions">JavaProjectOptions</a></code> | *No description.* |

---

##### `options`<sup>Required</sup> <a name="options" id="projen.java.JavaProject.Initializer.parameter.options"></a>

- *Type:* <a href="#projen.java.JavaProjectOptions">JavaProjectOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.java.JavaProject.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen.java.JavaProject.addExcludeFromCleanup">addExcludeFromCleanup</a></code> | Exclude the matching files from pre-synth cleanup. |
| <code><a href="#projen.java.JavaProject.addGitIgnore">addGitIgnore</a></code> | Adds a .gitignore pattern. |
| <code><a href="#projen.java.JavaProject.addPackageIgnore">addPackageIgnore</a></code> | Exclude these files from the bundled package. |
| <code><a href="#projen.java.JavaProject.addTask">addTask</a></code> | Adds a new task to this project. |
| <code><a href="#projen.java.JavaProject.addTip">addTip</a></code> | Prints a "tip" message during synthesis. |
| <code><a href="#projen.java.JavaProject.annotateGenerated">annotateGenerated</a></code> | Marks the provided file(s) as being generated. |
| <code><a href="#projen.java.JavaProject.postSynthesize">postSynthesize</a></code> | Called after all components are synthesized. |
| <code><a href="#projen.java.JavaProject.preSynthesize">preSynthesize</a></code> | Called before all components are synthesized. |
| <code><a href="#projen.java.JavaProject.removeTask">removeTask</a></code> | Removes a task from a project. |
| <code><a href="#projen.java.JavaProject.runTaskCommand">runTaskCommand</a></code> | Returns the shell command to execute in order to run a task. |
| <code><a href="#projen.java.JavaProject.synth">synth</a></code> | Synthesize all project files into `outdir`. |
| <code><a href="#projen.java.JavaProject.tryFindFile">tryFindFile</a></code> | Finds a file at the specified relative path within this project and all its subprojects. |
| <code><a href="#projen.java.JavaProject.tryFindJsonFile">tryFindJsonFile</a></code> | Finds a json file by name. |
| <code><a href="#projen.java.JavaProject.tryFindObjectFile">tryFindObjectFile</a></code> | Finds an object file (like JsonFile, YamlFile, etc.) by name. |
| <code><a href="#projen.java.JavaProject.tryRemoveFile">tryRemoveFile</a></code> | Finds a file at the specified relative path within this project and removes it. |
| <code><a href="#projen.java.JavaProject.addDependency">addDependency</a></code> | Adds a runtime dependency. |
| <code><a href="#projen.java.JavaProject.addPlugin">addPlugin</a></code> | Adds a build plugin to the pom. |
| <code><a href="#projen.java.JavaProject.addTestDependency">addTestDependency</a></code> | Adds a test dependency. |

---

##### `toString` <a name="toString" id="projen.java.JavaProject.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addExcludeFromCleanup` <a name="addExcludeFromCleanup" id="projen.java.JavaProject.addExcludeFromCleanup"></a>

```typescript
public addExcludeFromCleanup(globs: ...string[]): void
```

Exclude the matching files from pre-synth cleanup.

Can be used when, for example, some
source files include the projen marker and we don't want them to be erased during synth.

###### `globs`<sup>Required</sup> <a name="globs" id="projen.java.JavaProject.addExcludeFromCleanup.parameter.globs"></a>

- *Type:* ...string[]

The glob patterns to match.

---

##### `addGitIgnore` <a name="addGitIgnore" id="projen.java.JavaProject.addGitIgnore"></a>

```typescript
public addGitIgnore(pattern: string): void
```

Adds a .gitignore pattern.

###### `pattern`<sup>Required</sup> <a name="pattern" id="projen.java.JavaProject.addGitIgnore.parameter.pattern"></a>

- *Type:* string

The glob pattern to ignore.

---

##### `addPackageIgnore` <a name="addPackageIgnore" id="projen.java.JavaProject.addPackageIgnore"></a>

```typescript
public addPackageIgnore(_pattern: string): void
```

Exclude these files from the bundled package.

Implemented by project types based on the
packaging mechanism. For example, `NodeProject` delegates this to `.npmignore`.

###### `_pattern`<sup>Required</sup> <a name="_pattern" id="projen.java.JavaProject.addPackageIgnore.parameter._pattern"></a>

- *Type:* string

The glob pattern to exclude.

---

##### `addTask` <a name="addTask" id="projen.java.JavaProject.addTask"></a>

```typescript
public addTask(name: string, props?: TaskOptions): Task
```

Adds a new task to this project.

This will fail if the project already has
a task with this name.

###### `name`<sup>Required</sup> <a name="name" id="projen.java.JavaProject.addTask.parameter.name"></a>

- *Type:* string

The task name to add.

---

###### `props`<sup>Optional</sup> <a name="props" id="projen.java.JavaProject.addTask.parameter.props"></a>

- *Type:* projen.TaskOptions

Task properties.

---

##### ~~`addTip`~~ <a name="addTip" id="projen.java.JavaProject.addTip"></a>

```typescript
public addTip(message: string): void
```

Prints a "tip" message during synthesis.

###### `message`<sup>Required</sup> <a name="message" id="projen.java.JavaProject.addTip.parameter.message"></a>

- *Type:* string

The message.

---

##### `annotateGenerated` <a name="annotateGenerated" id="projen.java.JavaProject.annotateGenerated"></a>

```typescript
public annotateGenerated(glob: string): void
```

Marks the provided file(s) as being generated.

This is achieved using the
github-linguist attributes. Generated files do not count against the
repository statistics and language breakdown.

> [https://github.com/github/linguist/blob/master/docs/overrides.md](https://github.com/github/linguist/blob/master/docs/overrides.md)

###### `glob`<sup>Required</sup> <a name="glob" id="projen.java.JavaProject.annotateGenerated.parameter.glob"></a>

- *Type:* string

the glob pattern to match (could be a file path).

---

##### `postSynthesize` <a name="postSynthesize" id="projen.java.JavaProject.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after all components are synthesized.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen.java.JavaProject.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before all components are synthesized.

##### `removeTask` <a name="removeTask" id="projen.java.JavaProject.removeTask"></a>

```typescript
public removeTask(name: string): Task
```

Removes a task from a project.

###### `name`<sup>Required</sup> <a name="name" id="projen.java.JavaProject.removeTask.parameter.name"></a>

- *Type:* string

The name of the task to remove.

---

##### `runTaskCommand` <a name="runTaskCommand" id="projen.java.JavaProject.runTaskCommand"></a>

```typescript
public runTaskCommand(task: Task): string
```

Returns the shell command to execute in order to run a task.

By default, this is `npx projen@<version> <task>`

###### `task`<sup>Required</sup> <a name="task" id="projen.java.JavaProject.runTaskCommand.parameter.task"></a>

- *Type:* projen.Task

The task for which the command is required.

---

##### `synth` <a name="synth" id="projen.java.JavaProject.synth"></a>

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

##### `tryFindFile` <a name="tryFindFile" id="projen.java.JavaProject.tryFindFile"></a>

```typescript
public tryFindFile(filePath: string): FileBase
```

Finds a file at the specified relative path within this project and all its subprojects.

###### `filePath`<sup>Required</sup> <a name="filePath" id="projen.java.JavaProject.tryFindFile.parameter.filePath"></a>

- *Type:* string

The file path.

If this path is relative, it will be resolved
from the root of _this_ project.

---

##### ~~`tryFindJsonFile`~~ <a name="tryFindJsonFile" id="projen.java.JavaProject.tryFindJsonFile"></a>

```typescript
public tryFindJsonFile(filePath: string): JsonFile
```

Finds a json file by name.

###### `filePath`<sup>Required</sup> <a name="filePath" id="projen.java.JavaProject.tryFindJsonFile.parameter.filePath"></a>

- *Type:* string

The file path.

---

##### `tryFindObjectFile` <a name="tryFindObjectFile" id="projen.java.JavaProject.tryFindObjectFile"></a>

```typescript
public tryFindObjectFile(filePath: string): ObjectFile
```

Finds an object file (like JsonFile, YamlFile, etc.) by name.

###### `filePath`<sup>Required</sup> <a name="filePath" id="projen.java.JavaProject.tryFindObjectFile.parameter.filePath"></a>

- *Type:* string

The file path.

---

##### `tryRemoveFile` <a name="tryRemoveFile" id="projen.java.JavaProject.tryRemoveFile"></a>

```typescript
public tryRemoveFile(filePath: string): FileBase
```

Finds a file at the specified relative path within this project and removes it.

###### `filePath`<sup>Required</sup> <a name="filePath" id="projen.java.JavaProject.tryRemoveFile.parameter.filePath"></a>

- *Type:* string

The file path.

If this path is relative, it will be
resolved from the root of _this_ project.

---

##### `addDependency` <a name="addDependency" id="projen.java.JavaProject.addDependency"></a>

```typescript
public addDependency(spec: string): void
```

Adds a runtime dependency.

###### `spec`<sup>Required</sup> <a name="spec" id="projen.java.JavaProject.addDependency.parameter.spec"></a>

- *Type:* string

Format `<groupId>/<artifactId>@<semver>`.

---

##### `addPlugin` <a name="addPlugin" id="projen.java.JavaProject.addPlugin"></a>

```typescript
public addPlugin(spec: string, options?: PluginOptions): Dependency
```

Adds a build plugin to the pom.

The plug in is also added as a BUILD dep to the project.

###### `spec`<sup>Required</sup> <a name="spec" id="projen.java.JavaProject.addPlugin.parameter.spec"></a>

- *Type:* string

dependency spec (`group/artifact@version`).

---

###### `options`<sup>Optional</sup> <a name="options" id="projen.java.JavaProject.addPlugin.parameter.options"></a>

- *Type:* <a href="#projen.java.PluginOptions">PluginOptions</a>

plugin options.

---

##### `addTestDependency` <a name="addTestDependency" id="projen.java.JavaProject.addTestDependency"></a>

```typescript
public addTestDependency(spec: string): void
```

Adds a test dependency.

###### `spec`<sup>Required</sup> <a name="spec" id="projen.java.JavaProject.addTestDependency.parameter.spec"></a>

- *Type:* string

Format `<groupId>/<artifactId>@<semver>`.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.java.JavaProject.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen.java.JavaProject.isProject">isProject</a></code> | Test whether the given construct is a project. |
| <code><a href="#projen.java.JavaProject.of">of</a></code> | Find the closest ancestor project for given construct. |

---

##### `isConstruct` <a name="isConstruct" id="projen.java.JavaProject.isConstruct"></a>

```typescript
import { java } from 'projen'

java.JavaProject.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="projen.java.JavaProject.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isProject` <a name="isProject" id="projen.java.JavaProject.isProject"></a>

```typescript
import { java } from 'projen'

java.JavaProject.isProject(x: any)
```

Test whether the given construct is a project.

###### `x`<sup>Required</sup> <a name="x" id="projen.java.JavaProject.isProject.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="projen.java.JavaProject.of"></a>

```typescript
import { java } from 'projen'

java.JavaProject.of(construct: IConstruct)
```

Find the closest ancestor project for given construct.

When given a project, this it the project itself.

###### `construct`<sup>Required</sup> <a name="construct" id="projen.java.JavaProject.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.java.JavaProject.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen.java.JavaProject.property.buildTask">buildTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#projen.java.JavaProject.property.commitGenerated">commitGenerated</a></code> | <code>boolean</code> | Whether to commit the managed files by default. |
| <code><a href="#projen.java.JavaProject.property.compileTask">compileTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#projen.java.JavaProject.property.components">components</a></code> | <code>projen.Component[]</code> | Returns all the components within this project. |
| <code><a href="#projen.java.JavaProject.property.deps">deps</a></code> | <code>projen.Dependencies</code> | Project dependencies. |
| <code><a href="#projen.java.JavaProject.property.ejected">ejected</a></code> | <code>boolean</code> | Whether or not the project is being ejected. |
| <code><a href="#projen.java.JavaProject.property.files">files</a></code> | <code>projen.FileBase[]</code> | All files in this project. |
| <code><a href="#projen.java.JavaProject.property.gitattributes">gitattributes</a></code> | <code>projen.GitAttributesFile</code> | The .gitattributes file for this repository. |
| <code><a href="#projen.java.JavaProject.property.gitignore">gitignore</a></code> | <code>projen.IgnoreFile</code> | .gitignore. |
| <code><a href="#projen.java.JavaProject.property.logger">logger</a></code> | <code>projen.Logger</code> | Logging utilities. |
| <code><a href="#projen.java.JavaProject.property.name">name</a></code> | <code>string</code> | Project name. |
| <code><a href="#projen.java.JavaProject.property.outdir">outdir</a></code> | <code>string</code> | Absolute output directory of this project. |
| <code><a href="#projen.java.JavaProject.property.packageTask">packageTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#projen.java.JavaProject.property.postCompileTask">postCompileTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#projen.java.JavaProject.property.preCompileTask">preCompileTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#projen.java.JavaProject.property.projectBuild">projectBuild</a></code> | <code>projen.ProjectBuild</code> | Manages the build process of the project. |
| <code><a href="#projen.java.JavaProject.property.projenCommand">projenCommand</a></code> | <code>string</code> | The command to use in order to run the projen CLI. |
| <code><a href="#projen.java.JavaProject.property.root">root</a></code> | <code>projen.Project</code> | The root project. |
| <code><a href="#projen.java.JavaProject.property.subprojects">subprojects</a></code> | <code>projen.Project[]</code> | Returns all the subprojects within this project. |
| <code><a href="#projen.java.JavaProject.property.tasks">tasks</a></code> | <code>projen.Tasks</code> | Project tasks. |
| <code><a href="#projen.java.JavaProject.property.testTask">testTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#projen.java.JavaProject.property.defaultTask">defaultTask</a></code> | <code>projen.Task</code> | This is the "default" task, the one that executes "projen". |
| <code><a href="#projen.java.JavaProject.property.initProject">initProject</a></code> | <code>projen.InitProject</code> | The options used when this project is bootstrapped via `projen new`. |
| <code><a href="#projen.java.JavaProject.property.parent">parent</a></code> | <code>projen.Project</code> | A parent project. |
| <code><a href="#projen.java.JavaProject.property.projectType">projectType</a></code> | <code>projen.ProjectType</code> | *No description.* |
| <code><a href="#projen.java.JavaProject.property.autoApprove">autoApprove</a></code> | <code>projen.github.AutoApprove</code> | Auto approve set up for this project. |
| <code><a href="#projen.java.JavaProject.property.devContainer">devContainer</a></code> | <code>projen.vscode.DevContainer</code> | Access for .devcontainer.json (used for GitHub Codespaces). |
| <code><a href="#projen.java.JavaProject.property.github">github</a></code> | <code>projen.github.GitHub</code> | Access all github components. |
| <code><a href="#projen.java.JavaProject.property.gitpod">gitpod</a></code> | <code>projen.Gitpod</code> | Access for Gitpod. |
| <code><a href="#projen.java.JavaProject.property.vscode">vscode</a></code> | <code>projen.vscode.VsCode</code> | Access all VSCode components. |
| <code><a href="#projen.java.JavaProject.property.compile">compile</a></code> | <code><a href="#projen.java.MavenCompile">MavenCompile</a></code> | Compile component. |
| <code><a href="#projen.java.JavaProject.property.distdir">distdir</a></code> | <code>string</code> | Maven artifact output directory. |
| <code><a href="#projen.java.JavaProject.property.packaging">packaging</a></code> | <code><a href="#projen.java.MavenPackaging">MavenPackaging</a></code> | Packaging component. |
| <code><a href="#projen.java.JavaProject.property.pom">pom</a></code> | <code><a href="#projen.java.Pom">Pom</a></code> | API for managing `pom.xml`. |
| <code><a href="#projen.java.JavaProject.property.junit">junit</a></code> | <code><a href="#projen.java.Junit">Junit</a></code> | JUnit component. |
| <code><a href="#projen.java.JavaProject.property.projenrc">projenrc</a></code> | <code><a href="#projen.java.Projenrc">Projenrc</a></code> | Projenrc component. |

---

##### `node`<sup>Required</sup> <a name="node" id="projen.java.JavaProject.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `buildTask`<sup>Required</sup> <a name="buildTask" id="projen.java.JavaProject.property.buildTask"></a>

```typescript
public readonly buildTask: Task;
```

- *Type:* projen.Task

---

##### `commitGenerated`<sup>Required</sup> <a name="commitGenerated" id="projen.java.JavaProject.property.commitGenerated"></a>

```typescript
public readonly commitGenerated: boolean;
```

- *Type:* boolean

Whether to commit the managed files by default.

---

##### `compileTask`<sup>Required</sup> <a name="compileTask" id="projen.java.JavaProject.property.compileTask"></a>

```typescript
public readonly compileTask: Task;
```

- *Type:* projen.Task

---

##### `components`<sup>Required</sup> <a name="components" id="projen.java.JavaProject.property.components"></a>

```typescript
public readonly components: Component[];
```

- *Type:* projen.Component[]

Returns all the components within this project.

---

##### `deps`<sup>Required</sup> <a name="deps" id="projen.java.JavaProject.property.deps"></a>

```typescript
public readonly deps: Dependencies;
```

- *Type:* projen.Dependencies

Project dependencies.

---

##### `ejected`<sup>Required</sup> <a name="ejected" id="projen.java.JavaProject.property.ejected"></a>

```typescript
public readonly ejected: boolean;
```

- *Type:* boolean

Whether or not the project is being ejected.

---

##### `files`<sup>Required</sup> <a name="files" id="projen.java.JavaProject.property.files"></a>

```typescript
public readonly files: FileBase[];
```

- *Type:* projen.FileBase[]

All files in this project.

---

##### `gitattributes`<sup>Required</sup> <a name="gitattributes" id="projen.java.JavaProject.property.gitattributes"></a>

```typescript
public readonly gitattributes: GitAttributesFile;
```

- *Type:* projen.GitAttributesFile

The .gitattributes file for this repository.

---

##### `gitignore`<sup>Required</sup> <a name="gitignore" id="projen.java.JavaProject.property.gitignore"></a>

```typescript
public readonly gitignore: IgnoreFile;
```

- *Type:* projen.IgnoreFile

.gitignore.

---

##### `logger`<sup>Required</sup> <a name="logger" id="projen.java.JavaProject.property.logger"></a>

```typescript
public readonly logger: Logger;
```

- *Type:* projen.Logger

Logging utilities.

---

##### `name`<sup>Required</sup> <a name="name" id="projen.java.JavaProject.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

Project name.

---

##### `outdir`<sup>Required</sup> <a name="outdir" id="projen.java.JavaProject.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* string

Absolute output directory of this project.

---

##### `packageTask`<sup>Required</sup> <a name="packageTask" id="projen.java.JavaProject.property.packageTask"></a>

```typescript
public readonly packageTask: Task;
```

- *Type:* projen.Task

---

##### `postCompileTask`<sup>Required</sup> <a name="postCompileTask" id="projen.java.JavaProject.property.postCompileTask"></a>

```typescript
public readonly postCompileTask: Task;
```

- *Type:* projen.Task

---

##### `preCompileTask`<sup>Required</sup> <a name="preCompileTask" id="projen.java.JavaProject.property.preCompileTask"></a>

```typescript
public readonly preCompileTask: Task;
```

- *Type:* projen.Task

---

##### `projectBuild`<sup>Required</sup> <a name="projectBuild" id="projen.java.JavaProject.property.projectBuild"></a>

```typescript
public readonly projectBuild: ProjectBuild;
```

- *Type:* projen.ProjectBuild

Manages the build process of the project.

---

##### `projenCommand`<sup>Required</sup> <a name="projenCommand" id="projen.java.JavaProject.property.projenCommand"></a>

```typescript
public readonly projenCommand: string;
```

- *Type:* string

The command to use in order to run the projen CLI.

---

##### `root`<sup>Required</sup> <a name="root" id="projen.java.JavaProject.property.root"></a>

```typescript
public readonly root: Project;
```

- *Type:* projen.Project

The root project.

---

##### `subprojects`<sup>Required</sup> <a name="subprojects" id="projen.java.JavaProject.property.subprojects"></a>

```typescript
public readonly subprojects: Project[];
```

- *Type:* projen.Project[]

Returns all the subprojects within this project.

---

##### `tasks`<sup>Required</sup> <a name="tasks" id="projen.java.JavaProject.property.tasks"></a>

```typescript
public readonly tasks: Tasks;
```

- *Type:* projen.Tasks

Project tasks.

---

##### `testTask`<sup>Required</sup> <a name="testTask" id="projen.java.JavaProject.property.testTask"></a>

```typescript
public readonly testTask: Task;
```

- *Type:* projen.Task

---

##### `defaultTask`<sup>Optional</sup> <a name="defaultTask" id="projen.java.JavaProject.property.defaultTask"></a>

```typescript
public readonly defaultTask: Task;
```

- *Type:* projen.Task

This is the "default" task, the one that executes "projen".

Undefined if
the project is being ejected.

---

##### `initProject`<sup>Optional</sup> <a name="initProject" id="projen.java.JavaProject.property.initProject"></a>

```typescript
public readonly initProject: InitProject;
```

- *Type:* projen.InitProject

The options used when this project is bootstrapped via `projen new`.

It
includes the original set of options passed to the CLI and also the JSII
FQN of the project type.

---

##### `parent`<sup>Optional</sup> <a name="parent" id="projen.java.JavaProject.property.parent"></a>

```typescript
public readonly parent: Project;
```

- *Type:* projen.Project

A parent project.

If undefined, this is the root project.

---

##### `projectType`<sup>Required</sup> <a name="projectType" id="projen.java.JavaProject.property.projectType"></a>

```typescript
public readonly projectType: ProjectType;
```

- *Type:* projen.ProjectType

---

##### `autoApprove`<sup>Optional</sup> <a name="autoApprove" id="projen.java.JavaProject.property.autoApprove"></a>

```typescript
public readonly autoApprove: AutoApprove;
```

- *Type:* projen.github.AutoApprove

Auto approve set up for this project.

---

##### `devContainer`<sup>Optional</sup> <a name="devContainer" id="projen.java.JavaProject.property.devContainer"></a>

```typescript
public readonly devContainer: DevContainer;
```

- *Type:* projen.vscode.DevContainer

Access for .devcontainer.json (used for GitHub Codespaces).

This will be `undefined` if devContainer boolean is false

---

##### `github`<sup>Optional</sup> <a name="github" id="projen.java.JavaProject.property.github"></a>

```typescript
public readonly github: GitHub;
```

- *Type:* projen.github.GitHub

Access all github components.

This will be `undefined` for subprojects.

---

##### `gitpod`<sup>Optional</sup> <a name="gitpod" id="projen.java.JavaProject.property.gitpod"></a>

```typescript
public readonly gitpod: Gitpod;
```

- *Type:* projen.Gitpod

Access for Gitpod.

This will be `undefined` if gitpod boolean is false

---

##### `vscode`<sup>Optional</sup> <a name="vscode" id="projen.java.JavaProject.property.vscode"></a>

```typescript
public readonly vscode: VsCode;
```

- *Type:* projen.vscode.VsCode

Access all VSCode components.

This will be `undefined` for subprojects.

---

##### `compile`<sup>Required</sup> <a name="compile" id="projen.java.JavaProject.property.compile"></a>

```typescript
public readonly compile: MavenCompile;
```

- *Type:* <a href="#projen.java.MavenCompile">MavenCompile</a>

Compile component.

---

##### `distdir`<sup>Required</sup> <a name="distdir" id="projen.java.JavaProject.property.distdir"></a>

```typescript
public readonly distdir: string;
```

- *Type:* string

Maven artifact output directory.

---

##### `packaging`<sup>Required</sup> <a name="packaging" id="projen.java.JavaProject.property.packaging"></a>

```typescript
public readonly packaging: MavenPackaging;
```

- *Type:* <a href="#projen.java.MavenPackaging">MavenPackaging</a>

Packaging component.

---

##### `pom`<sup>Required</sup> <a name="pom" id="projen.java.JavaProject.property.pom"></a>

```typescript
public readonly pom: Pom;
```

- *Type:* <a href="#projen.java.Pom">Pom</a>

API for managing `pom.xml`.

---

##### `junit`<sup>Optional</sup> <a name="junit" id="projen.java.JavaProject.property.junit"></a>

```typescript
public readonly junit: Junit;
```

- *Type:* <a href="#projen.java.Junit">Junit</a>

JUnit component.

---

##### `projenrc`<sup>Optional</sup> <a name="projenrc" id="projen.java.JavaProject.property.projenrc"></a>

```typescript
public readonly projenrc: Projenrc;
```

- *Type:* <a href="#projen.java.Projenrc">Projenrc</a>

Projenrc component.

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.java.JavaProject.property.DEFAULT_TASK">DEFAULT_TASK</a></code> | <code>string</code> | The name of the default task (the task executed when `projen` is run without arguments). |

---

##### `DEFAULT_TASK`<sup>Required</sup> <a name="DEFAULT_TASK" id="projen.java.JavaProject.property.DEFAULT_TASK"></a>

```typescript
public readonly DEFAULT_TASK: string;
```

- *Type:* string

The name of the default task (the task executed when `projen` is run without arguments).

Normally
this task should synthesize the project files.

---

### Junit <a name="Junit" id="projen.java.Junit"></a>

Implements JUnit-based testing.

#### Initializers <a name="Initializers" id="projen.java.Junit.Initializer"></a>

```typescript
import { java } from 'projen'

new java.Junit(project: Project, options: JunitOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.java.Junit.Initializer.parameter.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.java.Junit.Initializer.parameter.options">options</a></code> | <code><a href="#projen.java.JunitOptions">JunitOptions</a></code> | *No description.* |

---

##### `project`<sup>Required</sup> <a name="project" id="projen.java.Junit.Initializer.parameter.project"></a>

- *Type:* projen.Project

---

##### `options`<sup>Required</sup> <a name="options" id="projen.java.Junit.Initializer.parameter.options"></a>

- *Type:* <a href="#projen.java.JunitOptions">JunitOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.java.Junit.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen.java.Junit.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen.java.Junit.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen.java.Junit.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |

---

##### `toString` <a name="toString" id="projen.java.Junit.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `postSynthesize` <a name="postSynthesize" id="projen.java.Junit.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen.java.Junit.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `synthesize` <a name="synthesize" id="projen.java.Junit.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.java.Junit.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen.java.Junit.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="projen.java.Junit.isConstruct"></a>

```typescript
import { java } from 'projen'

java.Junit.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="projen.java.Junit.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen.java.Junit.isComponent"></a>

```typescript
import { java } from 'projen'

java.Junit.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen.java.Junit.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.java.Junit.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen.java.Junit.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="projen.java.Junit.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen.java.Junit.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---


### MavenCompile <a name="MavenCompile" id="projen.java.MavenCompile"></a>

Adds the maven-compiler plugin to a POM file and the `compile` task.

#### Initializers <a name="Initializers" id="projen.java.MavenCompile.Initializer"></a>

```typescript
import { java } from 'projen'

new java.MavenCompile(project: Project, pom: Pom, options?: MavenCompileOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.java.MavenCompile.Initializer.parameter.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.java.MavenCompile.Initializer.parameter.pom">pom</a></code> | <code><a href="#projen.java.Pom">Pom</a></code> | *No description.* |
| <code><a href="#projen.java.MavenCompile.Initializer.parameter.options">options</a></code> | <code><a href="#projen.java.MavenCompileOptions">MavenCompileOptions</a></code> | *No description.* |

---

##### `project`<sup>Required</sup> <a name="project" id="projen.java.MavenCompile.Initializer.parameter.project"></a>

- *Type:* projen.Project

---

##### `pom`<sup>Required</sup> <a name="pom" id="projen.java.MavenCompile.Initializer.parameter.pom"></a>

- *Type:* <a href="#projen.java.Pom">Pom</a>

---

##### `options`<sup>Optional</sup> <a name="options" id="projen.java.MavenCompile.Initializer.parameter.options"></a>

- *Type:* <a href="#projen.java.MavenCompileOptions">MavenCompileOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.java.MavenCompile.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen.java.MavenCompile.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen.java.MavenCompile.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen.java.MavenCompile.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |

---

##### `toString` <a name="toString" id="projen.java.MavenCompile.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `postSynthesize` <a name="postSynthesize" id="projen.java.MavenCompile.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen.java.MavenCompile.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `synthesize` <a name="synthesize" id="projen.java.MavenCompile.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.java.MavenCompile.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen.java.MavenCompile.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="projen.java.MavenCompile.isConstruct"></a>

```typescript
import { java } from 'projen'

java.MavenCompile.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="projen.java.MavenCompile.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen.java.MavenCompile.isComponent"></a>

```typescript
import { java } from 'projen'

java.MavenCompile.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen.java.MavenCompile.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.java.MavenCompile.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen.java.MavenCompile.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="projen.java.MavenCompile.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen.java.MavenCompile.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---


### MavenPackaging <a name="MavenPackaging" id="projen.java.MavenPackaging"></a>

Configures a maven project to produce a .jar archive with sources and javadocs.

#### Initializers <a name="Initializers" id="projen.java.MavenPackaging.Initializer"></a>

```typescript
import { java } from 'projen'

new java.MavenPackaging(project: Project, pom: Pom, options?: MavenPackagingOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.java.MavenPackaging.Initializer.parameter.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.java.MavenPackaging.Initializer.parameter.pom">pom</a></code> | <code><a href="#projen.java.Pom">Pom</a></code> | *No description.* |
| <code><a href="#projen.java.MavenPackaging.Initializer.parameter.options">options</a></code> | <code><a href="#projen.java.MavenPackagingOptions">MavenPackagingOptions</a></code> | *No description.* |

---

##### `project`<sup>Required</sup> <a name="project" id="projen.java.MavenPackaging.Initializer.parameter.project"></a>

- *Type:* projen.Project

---

##### `pom`<sup>Required</sup> <a name="pom" id="projen.java.MavenPackaging.Initializer.parameter.pom"></a>

- *Type:* <a href="#projen.java.Pom">Pom</a>

---

##### `options`<sup>Optional</sup> <a name="options" id="projen.java.MavenPackaging.Initializer.parameter.options"></a>

- *Type:* <a href="#projen.java.MavenPackagingOptions">MavenPackagingOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.java.MavenPackaging.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen.java.MavenPackaging.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen.java.MavenPackaging.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen.java.MavenPackaging.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |

---

##### `toString` <a name="toString" id="projen.java.MavenPackaging.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `postSynthesize` <a name="postSynthesize" id="projen.java.MavenPackaging.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen.java.MavenPackaging.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `synthesize` <a name="synthesize" id="projen.java.MavenPackaging.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.java.MavenPackaging.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen.java.MavenPackaging.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="projen.java.MavenPackaging.isConstruct"></a>

```typescript
import { java } from 'projen'

java.MavenPackaging.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="projen.java.MavenPackaging.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen.java.MavenPackaging.isComponent"></a>

```typescript
import { java } from 'projen'

java.MavenPackaging.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen.java.MavenPackaging.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.java.MavenPackaging.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen.java.MavenPackaging.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.java.MavenPackaging.property.distdir">distdir</a></code> | <code>string</code> | The directory containing the package output, relative to the project outdir. |

---

##### `node`<sup>Required</sup> <a name="node" id="projen.java.MavenPackaging.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen.java.MavenPackaging.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---

##### `distdir`<sup>Required</sup> <a name="distdir" id="projen.java.MavenPackaging.property.distdir"></a>

```typescript
public readonly distdir: string;
```

- *Type:* string

The directory containing the package output, relative to the project outdir.

---


### MavenSample <a name="MavenSample" id="projen.java.MavenSample"></a>

Java code sample.

#### Initializers <a name="Initializers" id="projen.java.MavenSample.Initializer"></a>

```typescript
import { java } from 'projen'

new java.MavenSample(project: Project, options: MavenSampleOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.java.MavenSample.Initializer.parameter.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.java.MavenSample.Initializer.parameter.options">options</a></code> | <code><a href="#projen.java.MavenSampleOptions">MavenSampleOptions</a></code> | *No description.* |

---

##### `project`<sup>Required</sup> <a name="project" id="projen.java.MavenSample.Initializer.parameter.project"></a>

- *Type:* projen.Project

---

##### `options`<sup>Required</sup> <a name="options" id="projen.java.MavenSample.Initializer.parameter.options"></a>

- *Type:* <a href="#projen.java.MavenSampleOptions">MavenSampleOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.java.MavenSample.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen.java.MavenSample.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen.java.MavenSample.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen.java.MavenSample.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |

---

##### `toString` <a name="toString" id="projen.java.MavenSample.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `postSynthesize` <a name="postSynthesize" id="projen.java.MavenSample.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen.java.MavenSample.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `synthesize` <a name="synthesize" id="projen.java.MavenSample.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.java.MavenSample.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen.java.MavenSample.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="projen.java.MavenSample.isConstruct"></a>

```typescript
import { java } from 'projen'

java.MavenSample.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="projen.java.MavenSample.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen.java.MavenSample.isComponent"></a>

```typescript
import { java } from 'projen'

java.MavenSample.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen.java.MavenSample.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.java.MavenSample.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen.java.MavenSample.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="projen.java.MavenSample.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen.java.MavenSample.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---


### Pom <a name="Pom" id="projen.java.Pom"></a>

A Project Object Model or POM is the fundamental unit of work in Maven.

It is
an XML file that contains information about the project and configuration
details used by Maven to build the project.

#### Initializers <a name="Initializers" id="projen.java.Pom.Initializer"></a>

```typescript
import { java } from 'projen'

new java.Pom(project: Project, options: PomOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.java.Pom.Initializer.parameter.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.java.Pom.Initializer.parameter.options">options</a></code> | <code><a href="#projen.java.PomOptions">PomOptions</a></code> | *No description.* |

---

##### `project`<sup>Required</sup> <a name="project" id="projen.java.Pom.Initializer.parameter.project"></a>

- *Type:* projen.Project

---

##### `options`<sup>Required</sup> <a name="options" id="projen.java.Pom.Initializer.parameter.options"></a>

- *Type:* <a href="#projen.java.PomOptions">PomOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.java.Pom.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen.java.Pom.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen.java.Pom.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen.java.Pom.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |
| <code><a href="#projen.java.Pom.addDependency">addDependency</a></code> | Adds a runtime dependency. |
| <code><a href="#projen.java.Pom.addPlugin">addPlugin</a></code> | Adds a build plugin to the pom. |
| <code><a href="#projen.java.Pom.addPluginRepository">addPluginRepository</a></code> | *No description.* |
| <code><a href="#projen.java.Pom.addProperty">addProperty</a></code> | Adds a key/value property to the pom. |
| <code><a href="#projen.java.Pom.addRepository">addRepository</a></code> | Adds a repository to the pom. |
| <code><a href="#projen.java.Pom.addTestDependency">addTestDependency</a></code> | Adds a test dependency. |

---

##### `toString` <a name="toString" id="projen.java.Pom.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `postSynthesize` <a name="postSynthesize" id="projen.java.Pom.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen.java.Pom.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `synthesize` <a name="synthesize" id="projen.java.Pom.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

##### `addDependency` <a name="addDependency" id="projen.java.Pom.addDependency"></a>

```typescript
public addDependency(spec: string): void
```

Adds a runtime dependency.

###### `spec`<sup>Required</sup> <a name="spec" id="projen.java.Pom.addDependency.parameter.spec"></a>

- *Type:* string

Format `<groupId>/<artifactId>@<semver>`.

---

##### `addPlugin` <a name="addPlugin" id="projen.java.Pom.addPlugin"></a>

```typescript
public addPlugin(spec: string, options?: PluginOptions): Dependency
```

Adds a build plugin to the pom.

The plug in is also added as a BUILD dep to the project.

###### `spec`<sup>Required</sup> <a name="spec" id="projen.java.Pom.addPlugin.parameter.spec"></a>

- *Type:* string

dependency spec (`group/artifact@version`).

---

###### `options`<sup>Optional</sup> <a name="options" id="projen.java.Pom.addPlugin.parameter.options"></a>

- *Type:* <a href="#projen.java.PluginOptions">PluginOptions</a>

plugin options.

---

##### `addPluginRepository` <a name="addPluginRepository" id="projen.java.Pom.addPluginRepository"></a>

```typescript
public addPluginRepository(repository: MavenRepository): void
```

###### `repository`<sup>Required</sup> <a name="repository" id="projen.java.Pom.addPluginRepository.parameter.repository"></a>

- *Type:* <a href="#projen.java.MavenRepository">MavenRepository</a>

---

##### `addProperty` <a name="addProperty" id="projen.java.Pom.addProperty"></a>

```typescript
public addProperty(key: string, value: string): void
```

Adds a key/value property to the pom.

###### `key`<sup>Required</sup> <a name="key" id="projen.java.Pom.addProperty.parameter.key"></a>

- *Type:* string

the key.

---

###### `value`<sup>Required</sup> <a name="value" id="projen.java.Pom.addProperty.parameter.value"></a>

- *Type:* string

the value.

---

##### `addRepository` <a name="addRepository" id="projen.java.Pom.addRepository"></a>

```typescript
public addRepository(repository: MavenRepository): void
```

Adds a repository to the pom.

###### `repository`<sup>Required</sup> <a name="repository" id="projen.java.Pom.addRepository.parameter.repository"></a>

- *Type:* <a href="#projen.java.MavenRepository">MavenRepository</a>

the repository to add.

---

##### `addTestDependency` <a name="addTestDependency" id="projen.java.Pom.addTestDependency"></a>

```typescript
public addTestDependency(spec: string): void
```

Adds a test dependency.

###### `spec`<sup>Required</sup> <a name="spec" id="projen.java.Pom.addTestDependency.parameter.spec"></a>

- *Type:* string

Format `<groupId>/<artifactId>@<semver>`.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.java.Pom.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen.java.Pom.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="projen.java.Pom.isConstruct"></a>

```typescript
import { java } from 'projen'

java.Pom.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="projen.java.Pom.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen.java.Pom.isComponent"></a>

```typescript
import { java } from 'projen'

java.Pom.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen.java.Pom.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.java.Pom.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen.java.Pom.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.java.Pom.property.artifactId">artifactId</a></code> | <code>string</code> | Maven artifact ID. |
| <code><a href="#projen.java.Pom.property.fileName">fileName</a></code> | <code>string</code> | The name of the pom file. |
| <code><a href="#projen.java.Pom.property.groupId">groupId</a></code> | <code>string</code> | Maven group ID. |
| <code><a href="#projen.java.Pom.property.packaging">packaging</a></code> | <code>string</code> | Maven packaging format. |
| <code><a href="#projen.java.Pom.property.version">version</a></code> | <code>string</code> | Project version. |
| <code><a href="#projen.java.Pom.property.description">description</a></code> | <code>string</code> | Project description. |
| <code><a href="#projen.java.Pom.property.name">name</a></code> | <code>string</code> | Project display name. |
| <code><a href="#projen.java.Pom.property.url">url</a></code> | <code>string</code> | Project URL. |

---

##### `node`<sup>Required</sup> <a name="node" id="projen.java.Pom.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen.java.Pom.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---

##### `artifactId`<sup>Required</sup> <a name="artifactId" id="projen.java.Pom.property.artifactId"></a>

```typescript
public readonly artifactId: string;
```

- *Type:* string

Maven artifact ID.

---

##### `fileName`<sup>Required</sup> <a name="fileName" id="projen.java.Pom.property.fileName"></a>

```typescript
public readonly fileName: string;
```

- *Type:* string

The name of the pom file.

---

##### `groupId`<sup>Required</sup> <a name="groupId" id="projen.java.Pom.property.groupId"></a>

```typescript
public readonly groupId: string;
```

- *Type:* string

Maven group ID.

---

##### `packaging`<sup>Required</sup> <a name="packaging" id="projen.java.Pom.property.packaging"></a>

```typescript
public readonly packaging: string;
```

- *Type:* string

Maven packaging format.

---

##### `version`<sup>Required</sup> <a name="version" id="projen.java.Pom.property.version"></a>

```typescript
public readonly version: string;
```

- *Type:* string

Project version.

---

##### `description`<sup>Optional</sup> <a name="description" id="projen.java.Pom.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

Project description.

---

##### `name`<sup>Optional</sup> <a name="name" id="projen.java.Pom.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

Project display name.

---

##### `url`<sup>Optional</sup> <a name="url" id="projen.java.Pom.property.url"></a>

```typescript
public readonly url: string;
```

- *Type:* string

Project URL.

---


### Projenrc <a name="Projenrc" id="projen.java.Projenrc"></a>

Allows writing projenrc files in java.

This will install `org.projen/projen` as a Maven dependency and will add a
`synth` task which will compile & execute `main()` from
`src/main/java/projenrc.java`.

#### Initializers <a name="Initializers" id="projen.java.Projenrc.Initializer"></a>

```typescript
import { java } from 'projen'

new java.Projenrc(project: Project, pom: Pom, options?: ProjenrcOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.java.Projenrc.Initializer.parameter.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.java.Projenrc.Initializer.parameter.pom">pom</a></code> | <code><a href="#projen.java.Pom">Pom</a></code> | *No description.* |
| <code><a href="#projen.java.Projenrc.Initializer.parameter.options">options</a></code> | <code><a href="#projen.java.ProjenrcOptions">ProjenrcOptions</a></code> | *No description.* |

---

##### `project`<sup>Required</sup> <a name="project" id="projen.java.Projenrc.Initializer.parameter.project"></a>

- *Type:* projen.Project

---

##### `pom`<sup>Required</sup> <a name="pom" id="projen.java.Projenrc.Initializer.parameter.pom"></a>

- *Type:* <a href="#projen.java.Pom">Pom</a>

---

##### `options`<sup>Optional</sup> <a name="options" id="projen.java.Projenrc.Initializer.parameter.options"></a>

- *Type:* <a href="#projen.java.ProjenrcOptions">ProjenrcOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.java.Projenrc.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen.java.Projenrc.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen.java.Projenrc.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen.java.Projenrc.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |

---

##### `toString` <a name="toString" id="projen.java.Projenrc.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `postSynthesize` <a name="postSynthesize" id="projen.java.Projenrc.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen.java.Projenrc.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `synthesize` <a name="synthesize" id="projen.java.Projenrc.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.java.Projenrc.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen.java.Projenrc.isComponent">isComponent</a></code> | Test whether the given construct is a component. |
| <code><a href="#projen.java.Projenrc.of">of</a></code> | Returns the `Projenrc` instance associated with a project or `undefined` if there is no Projenrc. |

---

##### `isConstruct` <a name="isConstruct" id="projen.java.Projenrc.isConstruct"></a>

```typescript
import { java } from 'projen'

java.Projenrc.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="projen.java.Projenrc.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen.java.Projenrc.isComponent"></a>

```typescript
import { java } from 'projen'

java.Projenrc.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen.java.Projenrc.isComponent.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="projen.java.Projenrc.of"></a>

```typescript
import { java } from 'projen'

java.Projenrc.of(project: Project)
```

Returns the `Projenrc` instance associated with a project or `undefined` if there is no Projenrc.

###### `project`<sup>Required</sup> <a name="project" id="projen.java.Projenrc.of.parameter.project"></a>

- *Type:* projen.Project

The project.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.java.Projenrc.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen.java.Projenrc.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen.java.Projenrc.property.filePath">filePath</a></code> | <code>string</code> | The path of the projenrc file. |
| <code><a href="#projen.java.Projenrc.property.className">className</a></code> | <code>string</code> | The name of the java class that includes the projen entrypoint. |

---

##### `node`<sup>Required</sup> <a name="node" id="projen.java.Projenrc.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen.java.Projenrc.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---

##### `filePath`<sup>Required</sup> <a name="filePath" id="projen.java.Projenrc.property.filePath"></a>

```typescript
public readonly filePath: string;
```

- *Type:* string

The path of the projenrc file.

---

##### `className`<sup>Required</sup> <a name="className" id="projen.java.Projenrc.property.className"></a>

```typescript
public readonly className: string;
```

- *Type:* string

The name of the java class that includes the projen entrypoint.

---


## Structs <a name="Structs" id="Structs"></a>

### JavaProjectCommonOptions <a name="JavaProjectCommonOptions" id="projen.java.JavaProjectCommonOptions"></a>

Options for `JavaProject`.

#### Initializer <a name="Initializer" id="projen.java.JavaProjectCommonOptions.Initializer"></a>

```typescript
import { java } from 'projen'

const javaProjectCommonOptions: java.JavaProjectCommonOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.name">name</a></code> | <code>string</code> | This is the name of your project. |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.commitGenerated">commitGenerated</a></code> | <code>boolean</code> | Whether to commit the managed files by default. |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.gitIgnoreOptions">gitIgnoreOptions</a></code> | <code>projen.IgnoreFileOptions</code> | Configuration options for .gitignore file. |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.gitOptions">gitOptions</a></code> | <code>projen.GitOptions</code> | Configuration options for git. |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.logging">logging</a></code> | <code>projen.LoggerOptions</code> | Configure logging options such as verbosity. |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.outdir">outdir</a></code> | <code>string</code> | The root directory of the project. |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.parent">parent</a></code> | <code>projen.Project</code> | The parent project, if this project is part of a bigger project. |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.projectTree">projectTree</a></code> | <code>boolean</code> | Generate a project tree file (`.projen/tree.json`) that shows all components and their relationships. Useful for understanding your project structure and debugging. |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.projenCommand">projenCommand</a></code> | <code>string</code> | The shell command to use in order to run the projen CLI. |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.projenrcJson">projenrcJson</a></code> | <code>boolean</code> | Generate (once) .projenrc.json (in JSON). Set to `false` in order to disable .projenrc.json generation. |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.projenrcJsonOptions">projenrcJsonOptions</a></code> | <code>projen.ProjenrcJsonOptions</code> | Options for .projenrc.json. |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.renovatebot">renovatebot</a></code> | <code>boolean</code> | Use renovatebot to handle dependency upgrades. |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.renovatebotOptions">renovatebotOptions</a></code> | <code>projen.RenovatebotOptions</code> | Options for renovatebot. |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.autoApproveOptions">autoApproveOptions</a></code> | <code>projen.github.AutoApproveOptions</code> | Enable and configure the 'auto approve' workflow. |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.autoMerge">autoMerge</a></code> | <code>boolean</code> | Enable automatic merging on GitHub. |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.autoMergeOptions">autoMergeOptions</a></code> | <code>projen.github.AutoMergeOptions</code> | Configure options for automatic merging on GitHub. |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.clobber">clobber</a></code> | <code>boolean</code> | Add a `clobber` task which resets the repo to origin. |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.devContainer">devContainer</a></code> | <code>boolean</code> | Add a VSCode development environment (used for GitHub Codespaces). |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.github">github</a></code> | <code>boolean</code> | Enable GitHub integration. |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.githubOptions">githubOptions</a></code> | <code>projen.github.GitHubOptions</code> | Options for GitHub integration. |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.gitpod">gitpod</a></code> | <code>boolean</code> | Add a Gitpod development environment. |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.mergify">mergify</a></code> | <code>boolean</code> | Whether mergify should be enabled on this repository or not. |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.mergifyOptions">mergifyOptions</a></code> | <code>projen.github.MergifyOptions</code> | Options for mergify. |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.projectType">projectType</a></code> | <code>projen.ProjectType</code> | Which type of project this is (library/app). |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.projenCredentials">projenCredentials</a></code> | <code>projen.github.GithubCredentials</code> | Choose a method of providing GitHub API access for projen workflows. |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.projenTokenSecret">projenTokenSecret</a></code> | <code>string</code> | The name of a secret which includes a GitHub Personal Access Token to be used by projen workflows. |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.readme">readme</a></code> | <code>projen.SampleReadmeProps</code> | The README setup. |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.stale">stale</a></code> | <code>boolean</code> | Auto-close of stale issues and pull request. |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.staleOptions">staleOptions</a></code> | <code>projen.github.StaleOptions</code> | Auto-close stale issues and pull requests. |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.vscode">vscode</a></code> | <code>boolean</code> | Enable VSCode integration. |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.artifactId">artifactId</a></code> | <code>string</code> | The artifactId is generally the name that the project is known by. |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.groupId">groupId</a></code> | <code>string</code> | This is generally unique amongst an organization or a project. |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.version">version</a></code> | <code>string</code> | This is the last piece of the naming puzzle. |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.description">description</a></code> | <code>string</code> | Description of a project is always good. |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.packaging">packaging</a></code> | <code>string</code> | Project packaging format. |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.parentPom">parentPom</a></code> | <code><a href="#projen.java.ParentPom">ParentPom</a></code> | A Parent Pom can be used to have a child project inherit properties/plugins/ect in order to reduce duplication and keep standards across a large amount of repos. |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.url">url</a></code> | <code>string</code> | The URL, like the name, is not required. |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.compileOptions">compileOptions</a></code> | <code><a href="#projen.java.MavenCompileOptions">MavenCompileOptions</a></code> | Compile options. |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.deps">deps</a></code> | <code>string[]</code> | List of runtime dependencies for this project. |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.distdir">distdir</a></code> | <code>string</code> | Final artifact output directory. |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.junit">junit</a></code> | <code>boolean</code> | Include junit tests. |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.junitOptions">junitOptions</a></code> | <code><a href="#projen.java.JunitOptions">JunitOptions</a></code> | junit options. |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.packagingOptions">packagingOptions</a></code> | <code><a href="#projen.java.MavenPackagingOptions">MavenPackagingOptions</a></code> | Packaging options. |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.projenrcJava">projenrcJava</a></code> | <code>boolean</code> | Use projenrc in java. |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.projenrcJavaOptions">projenrcJavaOptions</a></code> | <code><a href="#projen.java.ProjenrcOptions">ProjenrcOptions</a></code> | Options related to projenrc in java. |
| <code><a href="#projen.java.JavaProjectCommonOptions.property.testDeps">testDeps</a></code> | <code>string[]</code> | List of test dependencies for this project. |

---

##### `name`<sup>Required</sup> <a name="name" id="projen.java.JavaProjectCommonOptions.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string
- *Default:* $BASEDIR

This is the name of your project.

---

##### `commitGenerated`<sup>Optional</sup> <a name="commitGenerated" id="projen.java.JavaProjectCommonOptions.property.commitGenerated"></a>

```typescript
public readonly commitGenerated: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to commit the managed files by default.

---

##### `gitIgnoreOptions`<sup>Optional</sup> <a name="gitIgnoreOptions" id="projen.java.JavaProjectCommonOptions.property.gitIgnoreOptions"></a>

```typescript
public readonly gitIgnoreOptions: IgnoreFileOptions;
```

- *Type:* projen.IgnoreFileOptions

Configuration options for .gitignore file.

---

##### `gitOptions`<sup>Optional</sup> <a name="gitOptions" id="projen.java.JavaProjectCommonOptions.property.gitOptions"></a>

```typescript
public readonly gitOptions: GitOptions;
```

- *Type:* projen.GitOptions

Configuration options for git.

---

##### `logging`<sup>Optional</sup> <a name="logging" id="projen.java.JavaProjectCommonOptions.property.logging"></a>

```typescript
public readonly logging: LoggerOptions;
```

- *Type:* projen.LoggerOptions
- *Default:* {}

Configure logging options such as verbosity.

---

##### `outdir`<sup>Optional</sup> <a name="outdir" id="projen.java.JavaProjectCommonOptions.property.outdir"></a>

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

##### `parent`<sup>Optional</sup> <a name="parent" id="projen.java.JavaProjectCommonOptions.property.parent"></a>

```typescript
public readonly parent: Project;
```

- *Type:* projen.Project

The parent project, if this project is part of a bigger project.

---

##### `projectTree`<sup>Optional</sup> <a name="projectTree" id="projen.java.JavaProjectCommonOptions.property.projectTree"></a>

```typescript
public readonly projectTree: boolean;
```

- *Type:* boolean
- *Default:* false

Generate a project tree file (`.projen/tree.json`) that shows all components and their relationships. Useful for understanding your project structure and debugging.

---

##### `projenCommand`<sup>Optional</sup> <a name="projenCommand" id="projen.java.JavaProjectCommonOptions.property.projenCommand"></a>

```typescript
public readonly projenCommand: string;
```

- *Type:* string
- *Default:* "npx projen"

The shell command to use in order to run the projen CLI.

Can be used to customize in special environments.

---

##### `projenrcJson`<sup>Optional</sup> <a name="projenrcJson" id="projen.java.JavaProjectCommonOptions.property.projenrcJson"></a>

```typescript
public readonly projenrcJson: boolean;
```

- *Type:* boolean
- *Default:* false

Generate (once) .projenrc.json (in JSON). Set to `false` in order to disable .projenrc.json generation.

---

##### `projenrcJsonOptions`<sup>Optional</sup> <a name="projenrcJsonOptions" id="projen.java.JavaProjectCommonOptions.property.projenrcJsonOptions"></a>

```typescript
public readonly projenrcJsonOptions: ProjenrcJsonOptions;
```

- *Type:* projen.ProjenrcJsonOptions
- *Default:* default options

Options for .projenrc.json.

---

##### `renovatebot`<sup>Optional</sup> <a name="renovatebot" id="projen.java.JavaProjectCommonOptions.property.renovatebot"></a>

```typescript
public readonly renovatebot: boolean;
```

- *Type:* boolean
- *Default:* false

Use renovatebot to handle dependency upgrades.

---

##### `renovatebotOptions`<sup>Optional</sup> <a name="renovatebotOptions" id="projen.java.JavaProjectCommonOptions.property.renovatebotOptions"></a>

```typescript
public readonly renovatebotOptions: RenovatebotOptions;
```

- *Type:* projen.RenovatebotOptions
- *Default:* default options

Options for renovatebot.

---

##### `autoApproveOptions`<sup>Optional</sup> <a name="autoApproveOptions" id="projen.java.JavaProjectCommonOptions.property.autoApproveOptions"></a>

```typescript
public readonly autoApproveOptions: AutoApproveOptions;
```

- *Type:* projen.github.AutoApproveOptions
- *Default:* auto approve is disabled

Enable and configure the 'auto approve' workflow.

---

##### `autoMerge`<sup>Optional</sup> <a name="autoMerge" id="projen.java.JavaProjectCommonOptions.property.autoMerge"></a>

```typescript
public readonly autoMerge: boolean;
```

- *Type:* boolean
- *Default:* true

Enable automatic merging on GitHub.

Has no effect if `github.mergify`
is set to false.

---

##### `autoMergeOptions`<sup>Optional</sup> <a name="autoMergeOptions" id="projen.java.JavaProjectCommonOptions.property.autoMergeOptions"></a>

```typescript
public readonly autoMergeOptions: AutoMergeOptions;
```

- *Type:* projen.github.AutoMergeOptions
- *Default:* see defaults in `AutoMergeOptions`

Configure options for automatic merging on GitHub.

Has no effect if
`github.mergify` or `autoMerge` is set to false.

---

##### `clobber`<sup>Optional</sup> <a name="clobber" id="projen.java.JavaProjectCommonOptions.property.clobber"></a>

```typescript
public readonly clobber: boolean;
```

- *Type:* boolean
- *Default:* true, but false for subprojects

Add a `clobber` task which resets the repo to origin.

---

##### `devContainer`<sup>Optional</sup> <a name="devContainer" id="projen.java.JavaProjectCommonOptions.property.devContainer"></a>

```typescript
public readonly devContainer: boolean;
```

- *Type:* boolean
- *Default:* false

Add a VSCode development environment (used for GitHub Codespaces).

---

##### `github`<sup>Optional</sup> <a name="github" id="projen.java.JavaProjectCommonOptions.property.github"></a>

```typescript
public readonly github: boolean;
```

- *Type:* boolean
- *Default:* true

Enable GitHub integration.

Enabled by default for root projects. Disabled for non-root projects.

---

##### `githubOptions`<sup>Optional</sup> <a name="githubOptions" id="projen.java.JavaProjectCommonOptions.property.githubOptions"></a>

```typescript
public readonly githubOptions: GitHubOptions;
```

- *Type:* projen.github.GitHubOptions
- *Default:* see GitHubOptions

Options for GitHub integration.

---

##### `gitpod`<sup>Optional</sup> <a name="gitpod" id="projen.java.JavaProjectCommonOptions.property.gitpod"></a>

```typescript
public readonly gitpod: boolean;
```

- *Type:* boolean
- *Default:* false

Add a Gitpod development environment.

---

##### ~~`mergify`~~<sup>Optional</sup> <a name="mergify" id="projen.java.JavaProjectCommonOptions.property.mergify"></a>

- *Deprecated:* use `githubOptions.mergify` instead

```typescript
public readonly mergify: boolean;
```

- *Type:* boolean
- *Default:* true

Whether mergify should be enabled on this repository or not.

---

##### ~~`mergifyOptions`~~<sup>Optional</sup> <a name="mergifyOptions" id="projen.java.JavaProjectCommonOptions.property.mergifyOptions"></a>

- *Deprecated:* use `githubOptions.mergifyOptions` instead

```typescript
public readonly mergifyOptions: MergifyOptions;
```

- *Type:* projen.github.MergifyOptions
- *Default:* default options

Options for mergify.

---

##### ~~`projectType`~~<sup>Optional</sup> <a name="projectType" id="projen.java.JavaProjectCommonOptions.property.projectType"></a>

- *Deprecated:* no longer supported at the base project level

```typescript
public readonly projectType: ProjectType;
```

- *Type:* projen.ProjectType
- *Default:* ProjectType.UNKNOWN

Which type of project this is (library/app).

---

##### `projenCredentials`<sup>Optional</sup> <a name="projenCredentials" id="projen.java.JavaProjectCommonOptions.property.projenCredentials"></a>

```typescript
public readonly projenCredentials: GithubCredentials;
```

- *Type:* projen.github.GithubCredentials
- *Default:* use a personal access token named PROJEN_GITHUB_TOKEN

Choose a method of providing GitHub API access for projen workflows.

---

##### ~~`projenTokenSecret`~~<sup>Optional</sup> <a name="projenTokenSecret" id="projen.java.JavaProjectCommonOptions.property.projenTokenSecret"></a>

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

##### `readme`<sup>Optional</sup> <a name="readme" id="projen.java.JavaProjectCommonOptions.property.readme"></a>

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


##### `stale`<sup>Optional</sup> <a name="stale" id="projen.java.JavaProjectCommonOptions.property.stale"></a>

```typescript
public readonly stale: boolean;
```

- *Type:* boolean
- *Default:* false

Auto-close of stale issues and pull request.

See `staleOptions` for options.

---

##### `staleOptions`<sup>Optional</sup> <a name="staleOptions" id="projen.java.JavaProjectCommonOptions.property.staleOptions"></a>

```typescript
public readonly staleOptions: StaleOptions;
```

- *Type:* projen.github.StaleOptions
- *Default:* see defaults in `StaleOptions`

Auto-close stale issues and pull requests.

To disable set `stale` to `false`.

---

##### `vscode`<sup>Optional</sup> <a name="vscode" id="projen.java.JavaProjectCommonOptions.property.vscode"></a>

```typescript
public readonly vscode: boolean;
```

- *Type:* boolean
- *Default:* true

Enable VSCode integration.

Enabled by default for root projects. Disabled for non-root projects.

---

##### `artifactId`<sup>Required</sup> <a name="artifactId" id="projen.java.JavaProjectCommonOptions.property.artifactId"></a>

```typescript
public readonly artifactId: string;
```

- *Type:* string
- *Default:* "my-app"

The artifactId is generally the name that the project is known by.

Although
the groupId is important, people within the group will rarely mention the
groupId in discussion (they are often all be the same ID, such as the
MojoHaus project groupId: org.codehaus.mojo). It, along with the groupId,
creates a key that separates this project from every other project in the
world (at least, it should :) ). Along with the groupId, the artifactId
fully defines the artifact's living quarters within the repository. In the
case of the above project, my-project lives in
$M2_REPO/org/codehaus/mojo/my-project.

---

##### `groupId`<sup>Required</sup> <a name="groupId" id="projen.java.JavaProjectCommonOptions.property.groupId"></a>

```typescript
public readonly groupId: string;
```

- *Type:* string
- *Default:* "org.acme"

This is generally unique amongst an organization or a project.

For example,
all core Maven artifacts do (well, should) live under the groupId
org.apache.maven. Group ID's do not necessarily use the dot notation, for
example, the junit project. Note that the dot-notated groupId does not have
to correspond to the package structure that the project contains. It is,
however, a good practice to follow. When stored within a repository, the
group acts much like the Java packaging structure does in an operating
system. The dots are replaced by OS specific directory separators (such as
'/' in Unix) which becomes a relative directory structure from the base
repository. In the example given, the org.codehaus.mojo group lives within
the directory $M2_REPO/org/codehaus/mojo.

---

##### `version`<sup>Required</sup> <a name="version" id="projen.java.JavaProjectCommonOptions.property.version"></a>

```typescript
public readonly version: string;
```

- *Type:* string
- *Default:* "0.1.0"

This is the last piece of the naming puzzle.

groupId:artifactId denotes a
single project but they cannot delineate which incarnation of that project
we are talking about. Do we want the junit:junit of 2018 (version 4.12), or
of 2007 (version 3.8.2)? In short: code changes, those changes should be
versioned, and this element keeps those versions in line. It is also used
within an artifact's repository to separate versions from each other.
my-project version 1.0 files live in the directory structure
$M2_REPO/org/codehaus/mojo/my-project/1.0.

---

##### `description`<sup>Optional</sup> <a name="description" id="projen.java.JavaProjectCommonOptions.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* undefined

Description of a project is always good.

Although this should not replace
formal documentation, a quick comment to any readers of the POM is always
helpful.

---

##### `packaging`<sup>Optional</sup> <a name="packaging" id="projen.java.JavaProjectCommonOptions.property.packaging"></a>

```typescript
public readonly packaging: string;
```

- *Type:* string
- *Default:* "jar"

Project packaging format.

---

##### `parentPom`<sup>Optional</sup> <a name="parentPom" id="projen.java.JavaProjectCommonOptions.property.parentPom"></a>

```typescript
public readonly parentPom: ParentPom;
```

- *Type:* <a href="#projen.java.ParentPom">ParentPom</a>
- *Default:* undefined

A Parent Pom can be used to have a child project inherit properties/plugins/ect in order to reduce duplication and keep standards across a large amount of repos.

---

##### `url`<sup>Optional</sup> <a name="url" id="projen.java.JavaProjectCommonOptions.property.url"></a>

```typescript
public readonly url: string;
```

- *Type:* string
- *Default:* undefined

The URL, like the name, is not required.

This is a nice gesture for
projects users, however, so that they know where the project lives.

---

##### `compileOptions`<sup>Optional</sup> <a name="compileOptions" id="projen.java.JavaProjectCommonOptions.property.compileOptions"></a>

```typescript
public readonly compileOptions: MavenCompileOptions;
```

- *Type:* <a href="#projen.java.MavenCompileOptions">MavenCompileOptions</a>
- *Default:* defaults

Compile options.

---

##### `deps`<sup>Optional</sup> <a name="deps" id="projen.java.JavaProjectCommonOptions.property.deps"></a>

```typescript
public readonly deps: string[];
```

- *Type:* string[]
- *Default:* []

List of runtime dependencies for this project.

Dependencies use the format: `<groupId>/<artifactId>@<semver>`

Additional dependencies can be added via `project.addDependency()`.

---

##### `distdir`<sup>Optional</sup> <a name="distdir" id="projen.java.JavaProjectCommonOptions.property.distdir"></a>

```typescript
public readonly distdir: string;
```

- *Type:* string
- *Default:* "dist/java"

Final artifact output directory.

---

##### `junit`<sup>Optional</sup> <a name="junit" id="projen.java.JavaProjectCommonOptions.property.junit"></a>

```typescript
public readonly junit: boolean;
```

- *Type:* boolean
- *Default:* true

Include junit tests.

---

##### `junitOptions`<sup>Optional</sup> <a name="junitOptions" id="projen.java.JavaProjectCommonOptions.property.junitOptions"></a>

```typescript
public readonly junitOptions: JunitOptions;
```

- *Type:* <a href="#projen.java.JunitOptions">JunitOptions</a>
- *Default:* defaults

junit options.

---

##### `packagingOptions`<sup>Optional</sup> <a name="packagingOptions" id="projen.java.JavaProjectCommonOptions.property.packagingOptions"></a>

```typescript
public readonly packagingOptions: MavenPackagingOptions;
```

- *Type:* <a href="#projen.java.MavenPackagingOptions">MavenPackagingOptions</a>
- *Default:* defaults

Packaging options.

---

##### `projenrcJava`<sup>Optional</sup> <a name="projenrcJava" id="projen.java.JavaProjectCommonOptions.property.projenrcJava"></a>

```typescript
public readonly projenrcJava: boolean;
```

- *Type:* boolean
- *Default:* true

Use projenrc in java.

This will install `projen` as a java dependency and will add a `synth` task which
will compile & execute `main()` from `src/main/java/projenrc.java`.

---

##### `projenrcJavaOptions`<sup>Optional</sup> <a name="projenrcJavaOptions" id="projen.java.JavaProjectCommonOptions.property.projenrcJavaOptions"></a>

```typescript
public readonly projenrcJavaOptions: ProjenrcOptions;
```

- *Type:* <a href="#projen.java.ProjenrcOptions">ProjenrcOptions</a>
- *Default:* default options

Options related to projenrc in java.

---

##### `testDeps`<sup>Optional</sup> <a name="testDeps" id="projen.java.JavaProjectCommonOptions.property.testDeps"></a>

```typescript
public readonly testDeps: string[];
```

- *Type:* string[]
- *Default:* []

List of test dependencies for this project.

Dependencies use the format: `<groupId>/<artifactId>@<semver>`

Additional dependencies can be added via `project.addTestDependency()`.

---

### JavaProjectOptions <a name="JavaProjectOptions" id="projen.java.JavaProjectOptions"></a>

Options for `JavaProject`.

#### Initializer <a name="Initializer" id="projen.java.JavaProjectOptions.Initializer"></a>

```typescript
import { java } from 'projen'

const javaProjectOptions: java.JavaProjectOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.java.JavaProjectOptions.property.name">name</a></code> | <code>string</code> | This is the name of your project. |
| <code><a href="#projen.java.JavaProjectOptions.property.commitGenerated">commitGenerated</a></code> | <code>boolean</code> | Whether to commit the managed files by default. |
| <code><a href="#projen.java.JavaProjectOptions.property.gitIgnoreOptions">gitIgnoreOptions</a></code> | <code>projen.IgnoreFileOptions</code> | Configuration options for .gitignore file. |
| <code><a href="#projen.java.JavaProjectOptions.property.gitOptions">gitOptions</a></code> | <code>projen.GitOptions</code> | Configuration options for git. |
| <code><a href="#projen.java.JavaProjectOptions.property.logging">logging</a></code> | <code>projen.LoggerOptions</code> | Configure logging options such as verbosity. |
| <code><a href="#projen.java.JavaProjectOptions.property.outdir">outdir</a></code> | <code>string</code> | The root directory of the project. |
| <code><a href="#projen.java.JavaProjectOptions.property.parent">parent</a></code> | <code>projen.Project</code> | The parent project, if this project is part of a bigger project. |
| <code><a href="#projen.java.JavaProjectOptions.property.projectTree">projectTree</a></code> | <code>boolean</code> | Generate a project tree file (`.projen/tree.json`) that shows all components and their relationships. Useful for understanding your project structure and debugging. |
| <code><a href="#projen.java.JavaProjectOptions.property.projenCommand">projenCommand</a></code> | <code>string</code> | The shell command to use in order to run the projen CLI. |
| <code><a href="#projen.java.JavaProjectOptions.property.projenrcJson">projenrcJson</a></code> | <code>boolean</code> | Generate (once) .projenrc.json (in JSON). Set to `false` in order to disable .projenrc.json generation. |
| <code><a href="#projen.java.JavaProjectOptions.property.projenrcJsonOptions">projenrcJsonOptions</a></code> | <code>projen.ProjenrcJsonOptions</code> | Options for .projenrc.json. |
| <code><a href="#projen.java.JavaProjectOptions.property.renovatebot">renovatebot</a></code> | <code>boolean</code> | Use renovatebot to handle dependency upgrades. |
| <code><a href="#projen.java.JavaProjectOptions.property.renovatebotOptions">renovatebotOptions</a></code> | <code>projen.RenovatebotOptions</code> | Options for renovatebot. |
| <code><a href="#projen.java.JavaProjectOptions.property.autoApproveOptions">autoApproveOptions</a></code> | <code>projen.github.AutoApproveOptions</code> | Enable and configure the 'auto approve' workflow. |
| <code><a href="#projen.java.JavaProjectOptions.property.autoMerge">autoMerge</a></code> | <code>boolean</code> | Enable automatic merging on GitHub. |
| <code><a href="#projen.java.JavaProjectOptions.property.autoMergeOptions">autoMergeOptions</a></code> | <code>projen.github.AutoMergeOptions</code> | Configure options for automatic merging on GitHub. |
| <code><a href="#projen.java.JavaProjectOptions.property.clobber">clobber</a></code> | <code>boolean</code> | Add a `clobber` task which resets the repo to origin. |
| <code><a href="#projen.java.JavaProjectOptions.property.devContainer">devContainer</a></code> | <code>boolean</code> | Add a VSCode development environment (used for GitHub Codespaces). |
| <code><a href="#projen.java.JavaProjectOptions.property.github">github</a></code> | <code>boolean</code> | Enable GitHub integration. |
| <code><a href="#projen.java.JavaProjectOptions.property.githubOptions">githubOptions</a></code> | <code>projen.github.GitHubOptions</code> | Options for GitHub integration. |
| <code><a href="#projen.java.JavaProjectOptions.property.gitpod">gitpod</a></code> | <code>boolean</code> | Add a Gitpod development environment. |
| <code><a href="#projen.java.JavaProjectOptions.property.mergify">mergify</a></code> | <code>boolean</code> | Whether mergify should be enabled on this repository or not. |
| <code><a href="#projen.java.JavaProjectOptions.property.mergifyOptions">mergifyOptions</a></code> | <code>projen.github.MergifyOptions</code> | Options for mergify. |
| <code><a href="#projen.java.JavaProjectOptions.property.projectType">projectType</a></code> | <code>projen.ProjectType</code> | Which type of project this is (library/app). |
| <code><a href="#projen.java.JavaProjectOptions.property.projenCredentials">projenCredentials</a></code> | <code>projen.github.GithubCredentials</code> | Choose a method of providing GitHub API access for projen workflows. |
| <code><a href="#projen.java.JavaProjectOptions.property.projenTokenSecret">projenTokenSecret</a></code> | <code>string</code> | The name of a secret which includes a GitHub Personal Access Token to be used by projen workflows. |
| <code><a href="#projen.java.JavaProjectOptions.property.readme">readme</a></code> | <code>projen.SampleReadmeProps</code> | The README setup. |
| <code><a href="#projen.java.JavaProjectOptions.property.stale">stale</a></code> | <code>boolean</code> | Auto-close of stale issues and pull request. |
| <code><a href="#projen.java.JavaProjectOptions.property.staleOptions">staleOptions</a></code> | <code>projen.github.StaleOptions</code> | Auto-close stale issues and pull requests. |
| <code><a href="#projen.java.JavaProjectOptions.property.vscode">vscode</a></code> | <code>boolean</code> | Enable VSCode integration. |
| <code><a href="#projen.java.JavaProjectOptions.property.artifactId">artifactId</a></code> | <code>string</code> | The artifactId is generally the name that the project is known by. |
| <code><a href="#projen.java.JavaProjectOptions.property.groupId">groupId</a></code> | <code>string</code> | This is generally unique amongst an organization or a project. |
| <code><a href="#projen.java.JavaProjectOptions.property.version">version</a></code> | <code>string</code> | This is the last piece of the naming puzzle. |
| <code><a href="#projen.java.JavaProjectOptions.property.description">description</a></code> | <code>string</code> | Description of a project is always good. |
| <code><a href="#projen.java.JavaProjectOptions.property.packaging">packaging</a></code> | <code>string</code> | Project packaging format. |
| <code><a href="#projen.java.JavaProjectOptions.property.parentPom">parentPom</a></code> | <code><a href="#projen.java.ParentPom">ParentPom</a></code> | A Parent Pom can be used to have a child project inherit properties/plugins/ect in order to reduce duplication and keep standards across a large amount of repos. |
| <code><a href="#projen.java.JavaProjectOptions.property.url">url</a></code> | <code>string</code> | The URL, like the name, is not required. |
| <code><a href="#projen.java.JavaProjectOptions.property.compileOptions">compileOptions</a></code> | <code><a href="#projen.java.MavenCompileOptions">MavenCompileOptions</a></code> | Compile options. |
| <code><a href="#projen.java.JavaProjectOptions.property.deps">deps</a></code> | <code>string[]</code> | List of runtime dependencies for this project. |
| <code><a href="#projen.java.JavaProjectOptions.property.distdir">distdir</a></code> | <code>string</code> | Final artifact output directory. |
| <code><a href="#projen.java.JavaProjectOptions.property.junit">junit</a></code> | <code>boolean</code> | Include junit tests. |
| <code><a href="#projen.java.JavaProjectOptions.property.junitOptions">junitOptions</a></code> | <code><a href="#projen.java.JunitOptions">JunitOptions</a></code> | junit options. |
| <code><a href="#projen.java.JavaProjectOptions.property.packagingOptions">packagingOptions</a></code> | <code><a href="#projen.java.MavenPackagingOptions">MavenPackagingOptions</a></code> | Packaging options. |
| <code><a href="#projen.java.JavaProjectOptions.property.projenrcJava">projenrcJava</a></code> | <code>boolean</code> | Use projenrc in java. |
| <code><a href="#projen.java.JavaProjectOptions.property.projenrcJavaOptions">projenrcJavaOptions</a></code> | <code><a href="#projen.java.ProjenrcOptions">ProjenrcOptions</a></code> | Options related to projenrc in java. |
| <code><a href="#projen.java.JavaProjectOptions.property.testDeps">testDeps</a></code> | <code>string[]</code> | List of test dependencies for this project. |
| <code><a href="#projen.java.JavaProjectOptions.property.sample">sample</a></code> | <code>boolean</code> | Include sample code and test if the relevant directories don't exist. |
| <code><a href="#projen.java.JavaProjectOptions.property.sampleJavaPackage">sampleJavaPackage</a></code> | <code>string</code> | The java package to use for the code sample. |

---

##### `name`<sup>Required</sup> <a name="name" id="projen.java.JavaProjectOptions.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string
- *Default:* $BASEDIR

This is the name of your project.

---

##### `commitGenerated`<sup>Optional</sup> <a name="commitGenerated" id="projen.java.JavaProjectOptions.property.commitGenerated"></a>

```typescript
public readonly commitGenerated: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to commit the managed files by default.

---

##### `gitIgnoreOptions`<sup>Optional</sup> <a name="gitIgnoreOptions" id="projen.java.JavaProjectOptions.property.gitIgnoreOptions"></a>

```typescript
public readonly gitIgnoreOptions: IgnoreFileOptions;
```

- *Type:* projen.IgnoreFileOptions

Configuration options for .gitignore file.

---

##### `gitOptions`<sup>Optional</sup> <a name="gitOptions" id="projen.java.JavaProjectOptions.property.gitOptions"></a>

```typescript
public readonly gitOptions: GitOptions;
```

- *Type:* projen.GitOptions

Configuration options for git.

---

##### `logging`<sup>Optional</sup> <a name="logging" id="projen.java.JavaProjectOptions.property.logging"></a>

```typescript
public readonly logging: LoggerOptions;
```

- *Type:* projen.LoggerOptions
- *Default:* {}

Configure logging options such as verbosity.

---

##### `outdir`<sup>Optional</sup> <a name="outdir" id="projen.java.JavaProjectOptions.property.outdir"></a>

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

##### `parent`<sup>Optional</sup> <a name="parent" id="projen.java.JavaProjectOptions.property.parent"></a>

```typescript
public readonly parent: Project;
```

- *Type:* projen.Project

The parent project, if this project is part of a bigger project.

---

##### `projectTree`<sup>Optional</sup> <a name="projectTree" id="projen.java.JavaProjectOptions.property.projectTree"></a>

```typescript
public readonly projectTree: boolean;
```

- *Type:* boolean
- *Default:* false

Generate a project tree file (`.projen/tree.json`) that shows all components and their relationships. Useful for understanding your project structure and debugging.

---

##### `projenCommand`<sup>Optional</sup> <a name="projenCommand" id="projen.java.JavaProjectOptions.property.projenCommand"></a>

```typescript
public readonly projenCommand: string;
```

- *Type:* string
- *Default:* "npx projen"

The shell command to use in order to run the projen CLI.

Can be used to customize in special environments.

---

##### `projenrcJson`<sup>Optional</sup> <a name="projenrcJson" id="projen.java.JavaProjectOptions.property.projenrcJson"></a>

```typescript
public readonly projenrcJson: boolean;
```

- *Type:* boolean
- *Default:* false

Generate (once) .projenrc.json (in JSON). Set to `false` in order to disable .projenrc.json generation.

---

##### `projenrcJsonOptions`<sup>Optional</sup> <a name="projenrcJsonOptions" id="projen.java.JavaProjectOptions.property.projenrcJsonOptions"></a>

```typescript
public readonly projenrcJsonOptions: ProjenrcJsonOptions;
```

- *Type:* projen.ProjenrcJsonOptions
- *Default:* default options

Options for .projenrc.json.

---

##### `renovatebot`<sup>Optional</sup> <a name="renovatebot" id="projen.java.JavaProjectOptions.property.renovatebot"></a>

```typescript
public readonly renovatebot: boolean;
```

- *Type:* boolean
- *Default:* false

Use renovatebot to handle dependency upgrades.

---

##### `renovatebotOptions`<sup>Optional</sup> <a name="renovatebotOptions" id="projen.java.JavaProjectOptions.property.renovatebotOptions"></a>

```typescript
public readonly renovatebotOptions: RenovatebotOptions;
```

- *Type:* projen.RenovatebotOptions
- *Default:* default options

Options for renovatebot.

---

##### `autoApproveOptions`<sup>Optional</sup> <a name="autoApproveOptions" id="projen.java.JavaProjectOptions.property.autoApproveOptions"></a>

```typescript
public readonly autoApproveOptions: AutoApproveOptions;
```

- *Type:* projen.github.AutoApproveOptions
- *Default:* auto approve is disabled

Enable and configure the 'auto approve' workflow.

---

##### `autoMerge`<sup>Optional</sup> <a name="autoMerge" id="projen.java.JavaProjectOptions.property.autoMerge"></a>

```typescript
public readonly autoMerge: boolean;
```

- *Type:* boolean
- *Default:* true

Enable automatic merging on GitHub.

Has no effect if `github.mergify`
is set to false.

---

##### `autoMergeOptions`<sup>Optional</sup> <a name="autoMergeOptions" id="projen.java.JavaProjectOptions.property.autoMergeOptions"></a>

```typescript
public readonly autoMergeOptions: AutoMergeOptions;
```

- *Type:* projen.github.AutoMergeOptions
- *Default:* see defaults in `AutoMergeOptions`

Configure options for automatic merging on GitHub.

Has no effect if
`github.mergify` or `autoMerge` is set to false.

---

##### `clobber`<sup>Optional</sup> <a name="clobber" id="projen.java.JavaProjectOptions.property.clobber"></a>

```typescript
public readonly clobber: boolean;
```

- *Type:* boolean
- *Default:* true, but false for subprojects

Add a `clobber` task which resets the repo to origin.

---

##### `devContainer`<sup>Optional</sup> <a name="devContainer" id="projen.java.JavaProjectOptions.property.devContainer"></a>

```typescript
public readonly devContainer: boolean;
```

- *Type:* boolean
- *Default:* false

Add a VSCode development environment (used for GitHub Codespaces).

---

##### `github`<sup>Optional</sup> <a name="github" id="projen.java.JavaProjectOptions.property.github"></a>

```typescript
public readonly github: boolean;
```

- *Type:* boolean
- *Default:* true

Enable GitHub integration.

Enabled by default for root projects. Disabled for non-root projects.

---

##### `githubOptions`<sup>Optional</sup> <a name="githubOptions" id="projen.java.JavaProjectOptions.property.githubOptions"></a>

```typescript
public readonly githubOptions: GitHubOptions;
```

- *Type:* projen.github.GitHubOptions
- *Default:* see GitHubOptions

Options for GitHub integration.

---

##### `gitpod`<sup>Optional</sup> <a name="gitpod" id="projen.java.JavaProjectOptions.property.gitpod"></a>

```typescript
public readonly gitpod: boolean;
```

- *Type:* boolean
- *Default:* false

Add a Gitpod development environment.

---

##### ~~`mergify`~~<sup>Optional</sup> <a name="mergify" id="projen.java.JavaProjectOptions.property.mergify"></a>

- *Deprecated:* use `githubOptions.mergify` instead

```typescript
public readonly mergify: boolean;
```

- *Type:* boolean
- *Default:* true

Whether mergify should be enabled on this repository or not.

---

##### ~~`mergifyOptions`~~<sup>Optional</sup> <a name="mergifyOptions" id="projen.java.JavaProjectOptions.property.mergifyOptions"></a>

- *Deprecated:* use `githubOptions.mergifyOptions` instead

```typescript
public readonly mergifyOptions: MergifyOptions;
```

- *Type:* projen.github.MergifyOptions
- *Default:* default options

Options for mergify.

---

##### ~~`projectType`~~<sup>Optional</sup> <a name="projectType" id="projen.java.JavaProjectOptions.property.projectType"></a>

- *Deprecated:* no longer supported at the base project level

```typescript
public readonly projectType: ProjectType;
```

- *Type:* projen.ProjectType
- *Default:* ProjectType.UNKNOWN

Which type of project this is (library/app).

---

##### `projenCredentials`<sup>Optional</sup> <a name="projenCredentials" id="projen.java.JavaProjectOptions.property.projenCredentials"></a>

```typescript
public readonly projenCredentials: GithubCredentials;
```

- *Type:* projen.github.GithubCredentials
- *Default:* use a personal access token named PROJEN_GITHUB_TOKEN

Choose a method of providing GitHub API access for projen workflows.

---

##### ~~`projenTokenSecret`~~<sup>Optional</sup> <a name="projenTokenSecret" id="projen.java.JavaProjectOptions.property.projenTokenSecret"></a>

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

##### `readme`<sup>Optional</sup> <a name="readme" id="projen.java.JavaProjectOptions.property.readme"></a>

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


##### `stale`<sup>Optional</sup> <a name="stale" id="projen.java.JavaProjectOptions.property.stale"></a>

```typescript
public readonly stale: boolean;
```

- *Type:* boolean
- *Default:* false

Auto-close of stale issues and pull request.

See `staleOptions` for options.

---

##### `staleOptions`<sup>Optional</sup> <a name="staleOptions" id="projen.java.JavaProjectOptions.property.staleOptions"></a>

```typescript
public readonly staleOptions: StaleOptions;
```

- *Type:* projen.github.StaleOptions
- *Default:* see defaults in `StaleOptions`

Auto-close stale issues and pull requests.

To disable set `stale` to `false`.

---

##### `vscode`<sup>Optional</sup> <a name="vscode" id="projen.java.JavaProjectOptions.property.vscode"></a>

```typescript
public readonly vscode: boolean;
```

- *Type:* boolean
- *Default:* true

Enable VSCode integration.

Enabled by default for root projects. Disabled for non-root projects.

---

##### `artifactId`<sup>Required</sup> <a name="artifactId" id="projen.java.JavaProjectOptions.property.artifactId"></a>

```typescript
public readonly artifactId: string;
```

- *Type:* string
- *Default:* "my-app"

The artifactId is generally the name that the project is known by.

Although
the groupId is important, people within the group will rarely mention the
groupId in discussion (they are often all be the same ID, such as the
MojoHaus project groupId: org.codehaus.mojo). It, along with the groupId,
creates a key that separates this project from every other project in the
world (at least, it should :) ). Along with the groupId, the artifactId
fully defines the artifact's living quarters within the repository. In the
case of the above project, my-project lives in
$M2_REPO/org/codehaus/mojo/my-project.

---

##### `groupId`<sup>Required</sup> <a name="groupId" id="projen.java.JavaProjectOptions.property.groupId"></a>

```typescript
public readonly groupId: string;
```

- *Type:* string
- *Default:* "org.acme"

This is generally unique amongst an organization or a project.

For example,
all core Maven artifacts do (well, should) live under the groupId
org.apache.maven. Group ID's do not necessarily use the dot notation, for
example, the junit project. Note that the dot-notated groupId does not have
to correspond to the package structure that the project contains. It is,
however, a good practice to follow. When stored within a repository, the
group acts much like the Java packaging structure does in an operating
system. The dots are replaced by OS specific directory separators (such as
'/' in Unix) which becomes a relative directory structure from the base
repository. In the example given, the org.codehaus.mojo group lives within
the directory $M2_REPO/org/codehaus/mojo.

---

##### `version`<sup>Required</sup> <a name="version" id="projen.java.JavaProjectOptions.property.version"></a>

```typescript
public readonly version: string;
```

- *Type:* string
- *Default:* "0.1.0"

This is the last piece of the naming puzzle.

groupId:artifactId denotes a
single project but they cannot delineate which incarnation of that project
we are talking about. Do we want the junit:junit of 2018 (version 4.12), or
of 2007 (version 3.8.2)? In short: code changes, those changes should be
versioned, and this element keeps those versions in line. It is also used
within an artifact's repository to separate versions from each other.
my-project version 1.0 files live in the directory structure
$M2_REPO/org/codehaus/mojo/my-project/1.0.

---

##### `description`<sup>Optional</sup> <a name="description" id="projen.java.JavaProjectOptions.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* undefined

Description of a project is always good.

Although this should not replace
formal documentation, a quick comment to any readers of the POM is always
helpful.

---

##### `packaging`<sup>Optional</sup> <a name="packaging" id="projen.java.JavaProjectOptions.property.packaging"></a>

```typescript
public readonly packaging: string;
```

- *Type:* string
- *Default:* "jar"

Project packaging format.

---

##### `parentPom`<sup>Optional</sup> <a name="parentPom" id="projen.java.JavaProjectOptions.property.parentPom"></a>

```typescript
public readonly parentPom: ParentPom;
```

- *Type:* <a href="#projen.java.ParentPom">ParentPom</a>
- *Default:* undefined

A Parent Pom can be used to have a child project inherit properties/plugins/ect in order to reduce duplication and keep standards across a large amount of repos.

---

##### `url`<sup>Optional</sup> <a name="url" id="projen.java.JavaProjectOptions.property.url"></a>

```typescript
public readonly url: string;
```

- *Type:* string
- *Default:* undefined

The URL, like the name, is not required.

This is a nice gesture for
projects users, however, so that they know where the project lives.

---

##### `compileOptions`<sup>Optional</sup> <a name="compileOptions" id="projen.java.JavaProjectOptions.property.compileOptions"></a>

```typescript
public readonly compileOptions: MavenCompileOptions;
```

- *Type:* <a href="#projen.java.MavenCompileOptions">MavenCompileOptions</a>
- *Default:* defaults

Compile options.

---

##### `deps`<sup>Optional</sup> <a name="deps" id="projen.java.JavaProjectOptions.property.deps"></a>

```typescript
public readonly deps: string[];
```

- *Type:* string[]
- *Default:* []

List of runtime dependencies for this project.

Dependencies use the format: `<groupId>/<artifactId>@<semver>`

Additional dependencies can be added via `project.addDependency()`.

---

##### `distdir`<sup>Optional</sup> <a name="distdir" id="projen.java.JavaProjectOptions.property.distdir"></a>

```typescript
public readonly distdir: string;
```

- *Type:* string
- *Default:* "dist/java"

Final artifact output directory.

---

##### `junit`<sup>Optional</sup> <a name="junit" id="projen.java.JavaProjectOptions.property.junit"></a>

```typescript
public readonly junit: boolean;
```

- *Type:* boolean
- *Default:* true

Include junit tests.

---

##### `junitOptions`<sup>Optional</sup> <a name="junitOptions" id="projen.java.JavaProjectOptions.property.junitOptions"></a>

```typescript
public readonly junitOptions: JunitOptions;
```

- *Type:* <a href="#projen.java.JunitOptions">JunitOptions</a>
- *Default:* defaults

junit options.

---

##### `packagingOptions`<sup>Optional</sup> <a name="packagingOptions" id="projen.java.JavaProjectOptions.property.packagingOptions"></a>

```typescript
public readonly packagingOptions: MavenPackagingOptions;
```

- *Type:* <a href="#projen.java.MavenPackagingOptions">MavenPackagingOptions</a>
- *Default:* defaults

Packaging options.

---

##### `projenrcJava`<sup>Optional</sup> <a name="projenrcJava" id="projen.java.JavaProjectOptions.property.projenrcJava"></a>

```typescript
public readonly projenrcJava: boolean;
```

- *Type:* boolean
- *Default:* true

Use projenrc in java.

This will install `projen` as a java dependency and will add a `synth` task which
will compile & execute `main()` from `src/main/java/projenrc.java`.

---

##### `projenrcJavaOptions`<sup>Optional</sup> <a name="projenrcJavaOptions" id="projen.java.JavaProjectOptions.property.projenrcJavaOptions"></a>

```typescript
public readonly projenrcJavaOptions: ProjenrcOptions;
```

- *Type:* <a href="#projen.java.ProjenrcOptions">ProjenrcOptions</a>
- *Default:* default options

Options related to projenrc in java.

---

##### `testDeps`<sup>Optional</sup> <a name="testDeps" id="projen.java.JavaProjectOptions.property.testDeps"></a>

```typescript
public readonly testDeps: string[];
```

- *Type:* string[]
- *Default:* []

List of test dependencies for this project.

Dependencies use the format: `<groupId>/<artifactId>@<semver>`

Additional dependencies can be added via `project.addTestDependency()`.

---

##### `sample`<sup>Optional</sup> <a name="sample" id="projen.java.JavaProjectOptions.property.sample"></a>

```typescript
public readonly sample: boolean;
```

- *Type:* boolean
- *Default:* true

Include sample code and test if the relevant directories don't exist.

---

##### `sampleJavaPackage`<sup>Optional</sup> <a name="sampleJavaPackage" id="projen.java.JavaProjectOptions.property.sampleJavaPackage"></a>

```typescript
public readonly sampleJavaPackage: string;
```

- *Type:* string
- *Default:* "org.acme"

The java package to use for the code sample.

---

### JunitOptions <a name="JunitOptions" id="projen.java.JunitOptions"></a>

Options for `Junit`.

#### Initializer <a name="Initializer" id="projen.java.JunitOptions.Initializer"></a>

```typescript
import { java } from 'projen'

const junitOptions: java.JunitOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.java.JunitOptions.property.pom">pom</a></code> | <code><a href="#projen.java.Pom">Pom</a></code> | Java pom. |
| <code><a href="#projen.java.JunitOptions.property.sampleJavaPackage">sampleJavaPackage</a></code> | <code>string</code> | Java package for test sample. |
| <code><a href="#projen.java.JunitOptions.property.version">version</a></code> | <code>string</code> | Junit version. |

---

##### `pom`<sup>Required</sup> <a name="pom" id="projen.java.JunitOptions.property.pom"></a>

```typescript
public readonly pom: Pom;
```

- *Type:* <a href="#projen.java.Pom">Pom</a>

Java pom.

---

##### `sampleJavaPackage`<sup>Optional</sup> <a name="sampleJavaPackage" id="projen.java.JunitOptions.property.sampleJavaPackage"></a>

```typescript
public readonly sampleJavaPackage: string;
```

- *Type:* string
- *Default:* "org.acme"

Java package for test sample.

---

##### `version`<sup>Optional</sup> <a name="version" id="projen.java.JunitOptions.property.version"></a>

```typescript
public readonly version: string;
```

- *Type:* string
- *Default:* "5.7.0"

Junit version.

---

### MavenCompileOptions <a name="MavenCompileOptions" id="projen.java.MavenCompileOptions"></a>

Options for `MavenCompile`.

#### Initializer <a name="Initializer" id="projen.java.MavenCompileOptions.Initializer"></a>

```typescript
import { java } from 'projen'

const mavenCompileOptions: java.MavenCompileOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.java.MavenCompileOptions.property.source">source</a></code> | <code>string</code> | Source language version. |
| <code><a href="#projen.java.MavenCompileOptions.property.target">target</a></code> | <code>string</code> | Target JVM version. |

---

##### `source`<sup>Optional</sup> <a name="source" id="projen.java.MavenCompileOptions.property.source"></a>

```typescript
public readonly source: string;
```

- *Type:* string
- *Default:* "1.8"

Source language version.

---

##### `target`<sup>Optional</sup> <a name="target" id="projen.java.MavenCompileOptions.property.target"></a>

```typescript
public readonly target: string;
```

- *Type:* string
- *Default:* "1.8"

Target JVM version.

---

### MavenPackagingOptions <a name="MavenPackagingOptions" id="projen.java.MavenPackagingOptions"></a>

Options for `MavenPackage`.

#### Initializer <a name="Initializer" id="projen.java.MavenPackagingOptions.Initializer"></a>

```typescript
import { java } from 'projen'

const mavenPackagingOptions: java.MavenPackagingOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.java.MavenPackagingOptions.property.distdir">distdir</a></code> | <code>string</code> | Where to place the package output? |
| <code><a href="#projen.java.MavenPackagingOptions.property.javadocs">javadocs</a></code> | <code>boolean</code> | Include javadocs jar in package. |
| <code><a href="#projen.java.MavenPackagingOptions.property.javadocsExclude">javadocsExclude</a></code> | <code>string[]</code> | Exclude source files from docs. |
| <code><a href="#projen.java.MavenPackagingOptions.property.sources">sources</a></code> | <code>boolean</code> | Include sources jar in package. |

---

##### `distdir`<sup>Optional</sup> <a name="distdir" id="projen.java.MavenPackagingOptions.property.distdir"></a>

```typescript
public readonly distdir: string;
```

- *Type:* string
- *Default:* "dist/java"

Where to place the package output?

---

##### `javadocs`<sup>Optional</sup> <a name="javadocs" id="projen.java.MavenPackagingOptions.property.javadocs"></a>

```typescript
public readonly javadocs: boolean;
```

- *Type:* boolean
- *Default:* true

Include javadocs jar in package.

---

##### `javadocsExclude`<sup>Optional</sup> <a name="javadocsExclude" id="projen.java.MavenPackagingOptions.property.javadocsExclude"></a>

```typescript
public readonly javadocsExclude: string[];
```

- *Type:* string[]
- *Default:* []

Exclude source files from docs.

---

##### `sources`<sup>Optional</sup> <a name="sources" id="projen.java.MavenPackagingOptions.property.sources"></a>

```typescript
public readonly sources: boolean;
```

- *Type:* boolean
- *Default:* true

Include sources jar in package.

---

### MavenRepository <a name="MavenRepository" id="projen.java.MavenRepository"></a>

Represents a Maven repository.

> [https://maven.apache.org/guides/introduction/introduction-to-repositories.html](https://maven.apache.org/guides/introduction/introduction-to-repositories.html)

#### Initializer <a name="Initializer" id="projen.java.MavenRepository.Initializer"></a>

```typescript
import { java } from 'projen'

const mavenRepository: java.MavenRepository = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.java.MavenRepository.property.id">id</a></code> | <code>string</code> | The identifier for the repository. |
| <code><a href="#projen.java.MavenRepository.property.url">url</a></code> | <code>string</code> | The url of the repository. |
| <code><a href="#projen.java.MavenRepository.property.layout">layout</a></code> | <code>string</code> | The layout of the repository. |
| <code><a href="#projen.java.MavenRepository.property.name">name</a></code> | <code>string</code> | The name of the repository. |
| <code><a href="#projen.java.MavenRepository.property.releases">releases</a></code> | <code><a href="#projen.java.MavenRepositoryPolicy">MavenRepositoryPolicy</a></code> | Repository Policy for Releases. |
| <code><a href="#projen.java.MavenRepository.property.snapshots">snapshots</a></code> | <code><a href="#projen.java.MavenRepositoryPolicy">MavenRepositoryPolicy</a></code> | Repository Policy for Snapshots. |

---

##### `id`<sup>Required</sup> <a name="id" id="projen.java.MavenRepository.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

The identifier for the repository.

---

##### `url`<sup>Required</sup> <a name="url" id="projen.java.MavenRepository.property.url"></a>

```typescript
public readonly url: string;
```

- *Type:* string

The url of the repository.

---

##### `layout`<sup>Optional</sup> <a name="layout" id="projen.java.MavenRepository.property.layout"></a>

```typescript
public readonly layout: string;
```

- *Type:* string

The layout of the repository.

---

##### `name`<sup>Optional</sup> <a name="name" id="projen.java.MavenRepository.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the repository.

---

##### `releases`<sup>Optional</sup> <a name="releases" id="projen.java.MavenRepository.property.releases"></a>

```typescript
public readonly releases: MavenRepositoryPolicy;
```

- *Type:* <a href="#projen.java.MavenRepositoryPolicy">MavenRepositoryPolicy</a>

Repository Policy for Releases.

---

##### `snapshots`<sup>Optional</sup> <a name="snapshots" id="projen.java.MavenRepository.property.snapshots"></a>

```typescript
public readonly snapshots: MavenRepositoryPolicy;
```

- *Type:* <a href="#projen.java.MavenRepositoryPolicy">MavenRepositoryPolicy</a>

Repository Policy for Snapshots.

---

### MavenRepositoryPolicy <a name="MavenRepositoryPolicy" id="projen.java.MavenRepositoryPolicy"></a>

Represents a Maven Repository Policy.

> [https://maven.apache.org/settings.html#repositories](https://maven.apache.org/settings.html#repositories)

#### Initializer <a name="Initializer" id="projen.java.MavenRepositoryPolicy.Initializer"></a>

```typescript
import { java } from 'projen'

const mavenRepositoryPolicy: java.MavenRepositoryPolicy = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.java.MavenRepositoryPolicy.property.checksumPolicy">checksumPolicy</a></code> | <code><a href="#projen.java.ChecksumPolicy">ChecksumPolicy</a></code> | Checksum Policy When Maven deploys files to the repository, it also deploys corresponding checksum files. |
| <code><a href="#projen.java.MavenRepositoryPolicy.property.enabled">enabled</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#projen.java.MavenRepositoryPolicy.property.updatePolicy">updatePolicy</a></code> | <code><a href="#projen.java.UpdatePolicy">UpdatePolicy</a></code> | Update Policy This element specifies how often updates should attempt to occur. |

---

##### `checksumPolicy`<sup>Optional</sup> <a name="checksumPolicy" id="projen.java.MavenRepositoryPolicy.property.checksumPolicy"></a>

```typescript
public readonly checksumPolicy: ChecksumPolicy;
```

- *Type:* <a href="#projen.java.ChecksumPolicy">ChecksumPolicy</a>

Checksum Policy When Maven deploys files to the repository, it also deploys corresponding checksum files.

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.java.MavenRepositoryPolicy.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

---

##### `updatePolicy`<sup>Optional</sup> <a name="updatePolicy" id="projen.java.MavenRepositoryPolicy.property.updatePolicy"></a>

```typescript
public readonly updatePolicy: UpdatePolicy;
```

- *Type:* <a href="#projen.java.UpdatePolicy">UpdatePolicy</a>
- *Default:* UpdatePolicy.DAILY

Update Policy This element specifies how often updates should attempt to occur.

Maven will compare the local POM's timestamp (stored in a repository's maven-metadata file) to the remote.

---

### MavenSampleOptions <a name="MavenSampleOptions" id="projen.java.MavenSampleOptions"></a>

#### Initializer <a name="Initializer" id="projen.java.MavenSampleOptions.Initializer"></a>

```typescript
import { java } from 'projen'

const mavenSampleOptions: java.MavenSampleOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.java.MavenSampleOptions.property.package">package</a></code> | <code>string</code> | Project root java package. |

---

##### `package`<sup>Required</sup> <a name="package" id="projen.java.MavenSampleOptions.property.package"></a>

```typescript
public readonly package: string;
```

- *Type:* string

Project root java package.

---

### ParentPom <a name="ParentPom" id="projen.java.ParentPom"></a>

#### Initializer <a name="Initializer" id="projen.java.ParentPom.Initializer"></a>

```typescript
import { java } from 'projen'

const parentPom: java.ParentPom = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.java.ParentPom.property.artifactId">artifactId</a></code> | <code>string</code> | Parent Pom Artifact ID. |
| <code><a href="#projen.java.ParentPom.property.groupId">groupId</a></code> | <code>string</code> | Parent Pom Group ID. |
| <code><a href="#projen.java.ParentPom.property.relativePath">relativePath</a></code> | <code>string</code> | Parent Pom Relative path from the current pom. |
| <code><a href="#projen.java.ParentPom.property.version">version</a></code> | <code>string</code> | Parent Pom Version. |

---

##### `artifactId`<sup>Optional</sup> <a name="artifactId" id="projen.java.ParentPom.property.artifactId"></a>

```typescript
public readonly artifactId: string;
```

- *Type:* string

Parent Pom Artifact ID.

---

##### `groupId`<sup>Optional</sup> <a name="groupId" id="projen.java.ParentPom.property.groupId"></a>

```typescript
public readonly groupId: string;
```

- *Type:* string

Parent Pom Group ID.

---

##### `relativePath`<sup>Optional</sup> <a name="relativePath" id="projen.java.ParentPom.property.relativePath"></a>

```typescript
public readonly relativePath: string;
```

- *Type:* string

Parent Pom Relative path from the current pom.

---

##### `version`<sup>Optional</sup> <a name="version" id="projen.java.ParentPom.property.version"></a>

```typescript
public readonly version: string;
```

- *Type:* string

Parent Pom Version.

---

### PluginExecution <a name="PluginExecution" id="projen.java.PluginExecution"></a>

Plugin execution definition.

#### Initializer <a name="Initializer" id="projen.java.PluginExecution.Initializer"></a>

```typescript
import { java } from 'projen'

const pluginExecution: java.PluginExecution = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.java.PluginExecution.property.goals">goals</a></code> | <code>string[]</code> | Which Maven goals this plugin should be associated with. |
| <code><a href="#projen.java.PluginExecution.property.id">id</a></code> | <code>string</code> | The ID. |
| <code><a href="#projen.java.PluginExecution.property.configuration">configuration</a></code> | <code>{[ key: string ]: any}</code> | Execution key/value configuration. |
| <code><a href="#projen.java.PluginExecution.property.phase">phase</a></code> | <code>string</code> | The phase in which the plugin should execute. |

---

##### `goals`<sup>Required</sup> <a name="goals" id="projen.java.PluginExecution.property.goals"></a>

```typescript
public readonly goals: string[];
```

- *Type:* string[]

Which Maven goals this plugin should be associated with.

---

##### `id`<sup>Required</sup> <a name="id" id="projen.java.PluginExecution.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

The ID.

---

##### `configuration`<sup>Optional</sup> <a name="configuration" id="projen.java.PluginExecution.property.configuration"></a>

```typescript
public readonly configuration: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}
- *Default:* {}

Execution key/value configuration.

---

##### `phase`<sup>Optional</sup> <a name="phase" id="projen.java.PluginExecution.property.phase"></a>

```typescript
public readonly phase: string;
```

- *Type:* string

The phase in which the plugin should execute.

---

### PluginOptions <a name="PluginOptions" id="projen.java.PluginOptions"></a>

Options for Maven plugins.

#### Initializer <a name="Initializer" id="projen.java.PluginOptions.Initializer"></a>

```typescript
import { java } from 'projen'

const pluginOptions: java.PluginOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.java.PluginOptions.property.configuration">configuration</a></code> | <code>{[ key: string ]: any}</code> | Plugin key/value configuration. |
| <code><a href="#projen.java.PluginOptions.property.dependencies">dependencies</a></code> | <code>string[]</code> | You could configure the dependencies for the plugin. |
| <code><a href="#projen.java.PluginOptions.property.executions">executions</a></code> | <code><a href="#projen.java.PluginExecution">PluginExecution</a>[]</code> | Plugin executions. |

---

##### `configuration`<sup>Optional</sup> <a name="configuration" id="projen.java.PluginOptions.property.configuration"></a>

```typescript
public readonly configuration: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}
- *Default:* {}

Plugin key/value configuration.

---

##### `dependencies`<sup>Optional</sup> <a name="dependencies" id="projen.java.PluginOptions.property.dependencies"></a>

```typescript
public readonly dependencies: string[];
```

- *Type:* string[]
- *Default:* []

You could configure the dependencies for the plugin.

Dependencies are in `<groupId>/<artifactId>@<semver>` format.

---

##### `executions`<sup>Optional</sup> <a name="executions" id="projen.java.PluginOptions.property.executions"></a>

```typescript
public readonly executions: PluginExecution[];
```

- *Type:* <a href="#projen.java.PluginExecution">PluginExecution</a>[]
- *Default:* []

Plugin executions.

---

### PomOptions <a name="PomOptions" id="projen.java.PomOptions"></a>

Options for `Pom`.

#### Initializer <a name="Initializer" id="projen.java.PomOptions.Initializer"></a>

```typescript
import { java } from 'projen'

const pomOptions: java.PomOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.java.PomOptions.property.artifactId">artifactId</a></code> | <code>string</code> | The artifactId is generally the name that the project is known by. |
| <code><a href="#projen.java.PomOptions.property.groupId">groupId</a></code> | <code>string</code> | This is generally unique amongst an organization or a project. |
| <code><a href="#projen.java.PomOptions.property.version">version</a></code> | <code>string</code> | This is the last piece of the naming puzzle. |
| <code><a href="#projen.java.PomOptions.property.description">description</a></code> | <code>string</code> | Description of a project is always good. |
| <code><a href="#projen.java.PomOptions.property.packaging">packaging</a></code> | <code>string</code> | Project packaging format. |
| <code><a href="#projen.java.PomOptions.property.parentPom">parentPom</a></code> | <code><a href="#projen.java.ParentPom">ParentPom</a></code> | A Parent Pom can be used to have a child project inherit properties/plugins/ect in order to reduce duplication and keep standards across a large amount of repos. |
| <code><a href="#projen.java.PomOptions.property.url">url</a></code> | <code>string</code> | The URL, like the name, is not required. |

---

##### `artifactId`<sup>Required</sup> <a name="artifactId" id="projen.java.PomOptions.property.artifactId"></a>

```typescript
public readonly artifactId: string;
```

- *Type:* string
- *Default:* "my-app"

The artifactId is generally the name that the project is known by.

Although
the groupId is important, people within the group will rarely mention the
groupId in discussion (they are often all be the same ID, such as the
MojoHaus project groupId: org.codehaus.mojo). It, along with the groupId,
creates a key that separates this project from every other project in the
world (at least, it should :) ). Along with the groupId, the artifactId
fully defines the artifact's living quarters within the repository. In the
case of the above project, my-project lives in
$M2_REPO/org/codehaus/mojo/my-project.

---

##### `groupId`<sup>Required</sup> <a name="groupId" id="projen.java.PomOptions.property.groupId"></a>

```typescript
public readonly groupId: string;
```

- *Type:* string
- *Default:* "org.acme"

This is generally unique amongst an organization or a project.

For example,
all core Maven artifacts do (well, should) live under the groupId
org.apache.maven. Group ID's do not necessarily use the dot notation, for
example, the junit project. Note that the dot-notated groupId does not have
to correspond to the package structure that the project contains. It is,
however, a good practice to follow. When stored within a repository, the
group acts much like the Java packaging structure does in an operating
system. The dots are replaced by OS specific directory separators (such as
'/' in Unix) which becomes a relative directory structure from the base
repository. In the example given, the org.codehaus.mojo group lives within
the directory $M2_REPO/org/codehaus/mojo.

---

##### `version`<sup>Required</sup> <a name="version" id="projen.java.PomOptions.property.version"></a>

```typescript
public readonly version: string;
```

- *Type:* string
- *Default:* "0.1.0"

This is the last piece of the naming puzzle.

groupId:artifactId denotes a
single project but they cannot delineate which incarnation of that project
we are talking about. Do we want the junit:junit of 2018 (version 4.12), or
of 2007 (version 3.8.2)? In short: code changes, those changes should be
versioned, and this element keeps those versions in line. It is also used
within an artifact's repository to separate versions from each other.
my-project version 1.0 files live in the directory structure
$M2_REPO/org/codehaus/mojo/my-project/1.0.

---

##### `description`<sup>Optional</sup> <a name="description" id="projen.java.PomOptions.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* undefined

Description of a project is always good.

Although this should not replace
formal documentation, a quick comment to any readers of the POM is always
helpful.

---

##### `packaging`<sup>Optional</sup> <a name="packaging" id="projen.java.PomOptions.property.packaging"></a>

```typescript
public readonly packaging: string;
```

- *Type:* string
- *Default:* "jar"

Project packaging format.

---

##### `parentPom`<sup>Optional</sup> <a name="parentPom" id="projen.java.PomOptions.property.parentPom"></a>

```typescript
public readonly parentPom: ParentPom;
```

- *Type:* <a href="#projen.java.ParentPom">ParentPom</a>
- *Default:* undefined

A Parent Pom can be used to have a child project inherit properties/plugins/ect in order to reduce duplication and keep standards across a large amount of repos.

---

##### `url`<sup>Optional</sup> <a name="url" id="projen.java.PomOptions.property.url"></a>

```typescript
public readonly url: string;
```

- *Type:* string
- *Default:* undefined

The URL, like the name, is not required.

This is a nice gesture for
projects users, however, so that they know where the project lives.

---

### ProjenrcOptions <a name="ProjenrcOptions" id="projen.java.ProjenrcOptions"></a>

Options for `Projenrc`.

#### Initializer <a name="Initializer" id="projen.java.ProjenrcOptions.Initializer"></a>

```typescript
import { java } from 'projen'

const projenrcOptions: java.ProjenrcOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.java.ProjenrcOptions.property.className">className</a></code> | <code>string</code> | The name of the Java class which contains the `main()` method for projen. |
| <code><a href="#projen.java.ProjenrcOptions.property.projenVersion">projenVersion</a></code> | <code>string</code> | The projen version to use. |
| <code><a href="#projen.java.ProjenrcOptions.property.testScope">testScope</a></code> | <code>boolean</code> | Defines projenrc under the test scope instead of the main scope, which is reserved to the app. |

---

##### `className`<sup>Optional</sup> <a name="className" id="projen.java.ProjenrcOptions.property.className"></a>

```typescript
public readonly className: string;
```

- *Type:* string
- *Default:* "projenrc"

The name of the Java class which contains the `main()` method for projen.

---

##### `projenVersion`<sup>Optional</sup> <a name="projenVersion" id="projen.java.ProjenrcOptions.property.projenVersion"></a>

```typescript
public readonly projenVersion: string;
```

- *Type:* string
- *Default:* current version

The projen version to use.

---

##### `testScope`<sup>Optional</sup> <a name="testScope" id="projen.java.ProjenrcOptions.property.testScope"></a>

```typescript
public readonly testScope: boolean;
```

- *Type:* boolean
- *Default:* true

Defines projenrc under the test scope instead of the main scope, which is reserved to the app.

This means that projenrc will be under
`src/test/java/projenrc.java` and projen will be defined as a test
dependency. This enforces that application code does not take a dependency
on projen code.

If this is disabled, projenrc should be under
`src/main/java/projenrc.java`.

---

## Classes <a name="Classes" id="Classes"></a>

### UpdatePolicy <a name="UpdatePolicy" id="projen.java.UpdatePolicy"></a>

#### Initializers <a name="Initializers" id="projen.java.UpdatePolicy.Initializer"></a>

```typescript
import { java } from 'projen'

new java.UpdatePolicy()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.java.UpdatePolicy.interval">interval</a></code> | Updates at an interval of X minutes. |

---

##### `interval` <a name="interval" id="projen.java.UpdatePolicy.interval"></a>

```typescript
import { java } from 'projen'

java.UpdatePolicy.interval(minutes: number)
```

Updates at an interval of X minutes.

###### `minutes`<sup>Required</sup> <a name="minutes" id="projen.java.UpdatePolicy.interval.parameter.minutes"></a>

- *Type:* number

---


#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.java.UpdatePolicy.property.ALWAYS">ALWAYS</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.java.UpdatePolicy.property.DAILY">DAILY</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.java.UpdatePolicy.property.NEVER">NEVER</a></code> | <code>string</code> | *No description.* |

---

##### `ALWAYS`<sup>Required</sup> <a name="ALWAYS" id="projen.java.UpdatePolicy.property.ALWAYS"></a>

```typescript
public readonly ALWAYS: string;
```

- *Type:* string

---

##### `DAILY`<sup>Required</sup> <a name="DAILY" id="projen.java.UpdatePolicy.property.DAILY"></a>

```typescript
public readonly DAILY: string;
```

- *Type:* string

---

##### `NEVER`<sup>Required</sup> <a name="NEVER" id="projen.java.UpdatePolicy.property.NEVER"></a>

```typescript
public readonly NEVER: string;
```

- *Type:* string

---


## Enums <a name="Enums" id="Enums"></a>

### ChecksumPolicy <a name="ChecksumPolicy" id="projen.java.ChecksumPolicy"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.java.ChecksumPolicy.IGNORE">IGNORE</a></code> | *No description.* |
| <code><a href="#projen.java.ChecksumPolicy.FAIL">FAIL</a></code> | *No description.* |
| <code><a href="#projen.java.ChecksumPolicy.WARN">WARN</a></code> | *No description.* |

---

##### `IGNORE` <a name="IGNORE" id="projen.java.ChecksumPolicy.IGNORE"></a>

---


##### `FAIL` <a name="FAIL" id="projen.java.ChecksumPolicy.FAIL"></a>

---


##### `WARN` <a name="WARN" id="projen.java.ChecksumPolicy.WARN"></a>

---

