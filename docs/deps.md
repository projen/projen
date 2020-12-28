# Dependencies

Dependencies are an intrinsic part of every software project.

The `Dependencies` component is responsible to track the list of dependencies a
project has, and then used by project types as the model for rendering
project-specific dependency manifests such as the dependencies section
`package.json` files.

To add a dependency you can use a project-type specific API such as
`nodeProject.addDeps()` or use the generic API of `project.deps`:

```ts
project.deps.addDependency(dep, type);
```

## Semantic Requirements

The first argument (`dep`) is a string in the form `MODULE[@VERSION]` where
`MODULE` is the package-manager specific name of the dependency (i.e. for node
projects, this is the npm module name) and `VERSION` is an optional [semantic
version] requirement (e.g. `@^7`).

## Dependency Types

The second argument (`type`) defines the dependency type and is one of:

- `DependencyType.RUNTIME`: The dependency is required for the program/library during runtime.
- `DependencyType.PEER`: The dependency is required at runtime but only a single
  copy of the module must exist in the dependency closure of the consumer. In
  most package managers (PyPI, NuGet, Maven) there is no difference between
  runtime and peer dependencies (since all dependencies are installed as peers),
  but in npm, this is an important distinction. Prior to npm@7, peer
  dependencies must be installed explicitly by consumers.
- `DependencyType.BUNDLED`: A runtime dependency that is bundled and shipped
  with the module, so consumers are not required to install it.
- `DependencyType.BUILD`: The dependency is required to run the `build` task.
- `DependencyType.TEST`: The dependency is required to run the `test` task.
- `DependencyType.DEVENV`: The dependency is required for development (e.g. IDE plugins).

[semantic version]: https://semver.org
