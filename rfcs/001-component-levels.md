# Summary

Refactor all `Component`'s into components of different tiers that offer
different levels of abstraction, similar to L1/L2/L3 constructs in the [AWS
CDK](https://github.com/aws/aws-cdk).

# Motivation

An overarching goal of projen's API design is to provide ways to customize
configuration options at a high level, without restricting users when the
appropriate abstractions or domain-related APIs are not yet available. projen
accomplishes this by providing "escape hatches" for users to override the
synthesized output. Currently, the way `Project`s and `Component`s are organized
achieves this goal some of the time, but there are several issues:

1. From an abstraction standpoint, there is a lot of logic for customizing
   components that is managed by the projects that own the components, and not
   by the components themselves -- such as when components get initialized in
   the constructors (see
   [NodeProject](https://github.com/projen/projen/blob/c665e0a5378cddbf9ef0f51274b627a444336ee3/src/node-project.ts)
   and
   [TypescriptProject](https://github.com/projen/projen/blob/c665e0a5378cddbf9ef0f51274b627a444336ee3/src/typescript.ts)).
   I believe more of this logic should reside in the individual components.

2. Escape hatches are not uniform across components. For example, some
   components that manage JSON files expose fields through a publicly accessible
   field of the "any" type (e.g.
   [Jest](https://github.com/projen/projen/blob/master/src/jest.ts#L543-L546)),
   while others do not (e.g.
   [Pom](https://github.com/projen/projen/blob/c665e0a5378cddbf9ef0f51274b627a444336ee3/src/java/pom.ts)).
   Some components directly expose the files they manage (e.g.
   [TypescriptConfig](https://github.com/projen/projen/blob/c665e0a5378cddbf9ef0f51274b627a444336ee3/src/typescript.ts#L694))
   while others do not (e.g.
   [VsCodeLaunchConfig](https://github.com/projen/projen/blob/c665e0a5378cddbf9ef0f51274b627a444336ee3/src/vscode/launch-config.ts#L76)).
   This non-uniformity means overriding parts of files may require looking at
   the projen source code, or in some cases simply isn't possible.

# Goals

Our high-level goals are to:

- make components more composable
- refactor away as much project-component-specific logic (e.g. how to configure
  jest for typescript) into L2/L3 components
- establish a uniform way of accessing escape hatches for most components
- make it easy to hotswap between different components that are serving a
  similar purpose
- make the processing order of options and escape hatches simpler and more
  transparent (this should come for free by moving component-related logic out
  of project constructors and into components)

As an example of the kind of composability we would like, consider how could we
change projen to allow components in the likeness of gitignore and npmignore
(such as Dockerignore, python's MANIFEST.in, etc.) to be added to projects _if
they were provided by an external projen module_. Currently this wouldn't be
doable since projects have the responsibility of calling on the component's
methods (e.g. by calling `this.gitignore.include('tsconfig.json')` in the
constructor) -- so there's no effective way for a `Dockerignore` component to
hook into this.

# Proposed Changes

Refactor all `Component`s into components of three different tiers of increasing
abstraction/scope:

- L1 components will represent low-level resources (typically configuration
  files) and should be overridable through an escape hatch interface that is
  shared across all L1 components. L1 components should aim to document as much
  of the low-level APIs and options specific to that API through types where
  possible, to the degree that the underlying file is structured. For example,
  an L1 `Eslint` component would aim to model as much of the `.eslintrc.json`
  specification as possible, while a `Readme` component would not provide any
  specific APIs since readme files do not follow any fixed structure. L1
  components should not refer to any higher-level L2 or L3 components.

- L2 components will represent sets of resources with user-friendly APIs that
  correspond with the user's mental model (like many current-generation
  components). In implementation, L2 components will have L1 components as
  children. L2 components will provide sensible defaults, and should be
  overridable by allowing the user to access underlying L1 components and
  calling desired escape hatch methods. **L2 components should not directly call
  on or depend on other ecosystem components (such as creating tasks, or
  ignoring files, or adding dependencies)** but will instead provide "hooks" so
  that other L2/L3 components of the project (the task system, the dependency
  management system, etc.) can integrate the tasks/dependencies/ignorefiles
  separately. L2 components should not refer to any higher-level L3 components.
  L2 components should only assume the lowest common denominator with respect to
  project types it could belong to. This would serve to avoid any
  project-type-specific logic (e.g. eslint can assume it's in a NodeProject, but
  it should not be designed with typescript-specific functionality inside - that
  should be handled by an L3 component).

- L3 components will encapsulate a broad strategy for handling a
  development/project organization need OR specifying a collection of components
  with respect to some kind of additional context like a specific project type.
  For example, an L3 component could represent a test framework, a CI/CD system,
  a documentation system, etc. L3 components can contain any number of L2
  components, which should be publicly accessible and overridable by the user in
  a standardized way.

## Escape Hatch API

One inconvenience is that some generated files are textfiles and others are
structured / object-based files, so it's likely not possible to provide a
uniform API for both of these.

For object-based L1 components, we will implement an `addOverride(path, value)`
method similar to the one provided in the AWS CDK.

For textfile-based L1 components, we will implement `appendText(...lines)` and
`prependText(...lines)` methods.

If in the future there are needs for other file types, we can design appropriate
escape hatches when the need arises.

We also wish to add a simple way to disable the synthesis of a given file,
through a transparently named method (e.g. `doNotSynthesize()`) on L1 (L2?)
components. A helpful but not necessary feature would be if L2 components could
override the method, so for example it could log a message saying that instead
of disabling synthesis of `.eslintrc`, you can also set `eslint: false` in the
project settings.

## Future changes

To improve composability we would also like to establish standard interfaces for
more kinds of components so that we can designate "slots" in the `Project` class
that can automatically be satisfied by different components. For example, a
class might have a `DependencyManager` slot or `TestFramework` slot, and these
could be satisfied by different L3 components.

These changes aren't necessary for the overall proposal, so it can be addressed
in a later RFC / issue.

# Unresolved Questions

- How should components that don't manage files fall into this? `Clobber` is the
  only example of this, so it's possible we could refactor it away into another
  existing class, or we could implement it as an L2 component and allow L2
  components to not have an L1 component child if needed.
- How should we designate L1, L2, and L3 components in the library and make the
  difference clear to users? Via a naming scheme, or something more?
- To achieve the "hot swappability" of components (from the [Future
  Changes](#Future-changes) section), how do we get around the type
  restrictions/limitations of TypeScript/JSII? For example, if the `Project`
  class had a generic slot for
  [DevEnvironment](https://github.com/projen/projen/blob/c665e0a5378cddbf9ef0f51274b627a444336ee3/src/dev-env.ts#L68)
  components, then as a user I could easily choose to insert any implementing
  component such as `Gitpod` or `DevContainer` (or both). But because of how
  types work in TypeScript, I would only be able to access methods defined by
  the interface - and not any gitpod-specific or devcontainer-specific methods.
  How do we get around that?
- Are there any fundamental differences in the constraints between what AWS CDK
  escape hatches need to do, and what projen escape hatches need to do if we end
  up following a similar design strategy? Are there any issues with the way
  escape hatches were designed or implemented in the AWS CDK? (Not sure if we
  need to reinvent the wheel here).
- Are there any other goals we would like to add above in terms of component
  composability and escape hatches?
