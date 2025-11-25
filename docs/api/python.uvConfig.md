# `python.uvConfig` Submodule <a name="`python.uvConfig` Submodule" id="projen.python.uvConfig"></a>


## Structs <a name="Structs" id="Structs"></a>

### BuildBackendSettings <a name="BuildBackendSettings" id="projen.python.uvConfig.BuildBackendSettings"></a>

Settings for the uv build backend (`uv_build`).

Note that those settings only apply when using the `uv_build` backend, other build backends
(such as hatchling) have their own configuration.

All options that accept globs use the portable glob patterns from
[PEP 639](https://packaging.python.org/en/latest/specifications/glob-patterns/).

#### Initializer <a name="Initializer" id="projen.python.uvConfig.BuildBackendSettings.Initializer"></a>

```typescript
import { python } from 'projen'

const buildBackendSettings: python.uvConfig.BuildBackendSettings = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.uvConfig.BuildBackendSettings.property.data">data</a></code> | <code>projen.python.uvConfig.WheelDataIncludes</code> | Data includes for wheels. |
| <code><a href="#projen.python.uvConfig.BuildBackendSettings.property.defaultExcludes">defaultExcludes</a></code> | <code>boolean</code> | If set to `false`, the default excludes aren't applied. |
| <code><a href="#projen.python.uvConfig.BuildBackendSettings.property.moduleName">moduleName</a></code> | <code>any</code> | The name of the module directory inside `module-root`. |
| <code><a href="#projen.python.uvConfig.BuildBackendSettings.property.moduleRoot">moduleRoot</a></code> | <code>string</code> | The directory that contains the module directory. |
| <code><a href="#projen.python.uvConfig.BuildBackendSettings.property.namespace">namespace</a></code> | <code>boolean</code> | Build a namespace package. |
| <code><a href="#projen.python.uvConfig.BuildBackendSettings.property.sourceExclude">sourceExclude</a></code> | <code>string[]</code> | Glob expressions which files and directories to exclude from the source distribution. |
| <code><a href="#projen.python.uvConfig.BuildBackendSettings.property.sourceInclude">sourceInclude</a></code> | <code>string[]</code> | Glob expressions which files and directories to additionally include in the source distribution. |
| <code><a href="#projen.python.uvConfig.BuildBackendSettings.property.wheelExclude">wheelExclude</a></code> | <code>string[]</code> | Glob expressions which files and directories to exclude from the wheel. |

---

##### `data`<sup>Optional</sup> <a name="data" id="projen.python.uvConfig.BuildBackendSettings.property.data"></a>

```typescript
public readonly data: WheelDataIncludes;
```

- *Type:* projen.python.uvConfig.WheelDataIncludes

Data includes for wheels.

Each entry is a directory, whose contents are copied to the matching directory in the wheel
in `<name>-<version>.data/(purelib|platlib|headers|scripts|data)`. Upon installation, this
data is moved to its target location, as defined by
<https://docs.python.org/3.12/library/sysconfig.html#installation-paths>. Usually, small
data files are included by placing them in the Python module instead of using data includes.

- `scripts`: Installed to the directory for executables, `<venv>/bin` on Unix or
`<venv>\Scripts` on Windows. This directory is added to `PATH` when the virtual
environment  is activated or when using `uv run`, so this data type can be used to install
additional binaries. Consider using `project.scripts` instead for Python entrypoints.
- `data`: Installed over the virtualenv environment root.

Warning: This may override existing files!

- `headers`: Installed to the include directory. Compilers building Python packages
with this package as build requirement use the include directory to find additional header
files.
- `purelib` and `platlib`: Installed to the `site-packages` directory. It is not recommended
to use these two options.

---

##### `defaultExcludes`<sup>Optional</sup> <a name="defaultExcludes" id="projen.python.uvConfig.BuildBackendSettings.property.defaultExcludes"></a>

```typescript
public readonly defaultExcludes: boolean;
```

- *Type:* boolean

If set to `false`, the default excludes aren't applied.

Default excludes: `__pycache__`, `*.pyc`, and `*.pyo`.

---

##### `moduleName`<sup>Optional</sup> <a name="moduleName" id="projen.python.uvConfig.BuildBackendSettings.property.moduleName"></a>

```typescript
public readonly moduleName: any;
```

- *Type:* any

The name of the module directory inside `module-root`.

The default module name is the package name with dots and dashes replaced by underscores.

Package names need to be valid Python identifiers, and the directory needs to contain a
`__init__.py`. An exception are stubs packages, whose name ends with `-stubs`, with the stem
being the module name, and which contain a `__init__.pyi` file.

For namespace packages with a single module, the path can be dotted, e.g., `foo.bar` or
`foo-stubs.bar`.

For namespace packages with multiple modules, the path can be a list, e.g.,
`["foo", "bar"]`. We recommend using a single module per package, splitting multiple
packages into a workspace.

Note that using this option runs the risk of creating two packages with different names but
the same module names. Installing such packages together leads to unspecified behavior,
often with corrupted files or directory trees.

---

##### `moduleRoot`<sup>Optional</sup> <a name="moduleRoot" id="projen.python.uvConfig.BuildBackendSettings.property.moduleRoot"></a>

```typescript
public readonly moduleRoot: string;
```

- *Type:* string

The directory that contains the module directory.

Common values are `src` (src layout, the default) or an empty path (flat layout).

---

##### `namespace`<sup>Optional</sup> <a name="namespace" id="projen.python.uvConfig.BuildBackendSettings.property.namespace"></a>

```typescript
public readonly namespace: boolean;
```

- *Type:* boolean

Build a namespace package.

Build a PEP 420 implicit namespace package, allowing more than one root `__init__.py`.

Use this option when the namespace package contains multiple root `__init__.py`, for
namespace packages with a single root `__init__.py` use a dotted `module-name` instead.

To compare dotted `module-name` and `namespace = true`, the first example below can be
expressed with `module-name = "cloud.database"`: There is one root `__init__.py` `database`.
In the second example, we have three roots (`cloud.database`, `cloud.database_pro`,
`billing.modules.database_pro`), so `namespace = true` is required.

```text
src
└── cloud
└── database
├── __init__.py
├── query_builder
│   └── __init__.py
└── sql
├── parser.py
└── __init__.py
```

```text
src
├── cloud
│   ├── database
│   │   ├── __init__.py
│   │   ├── query_builder
│   │   │   └── __init__.py
│   │   └── sql
│   │       ├── __init__.py
│   │       └── parser.py
│   └── database_pro
│       ├── __init__.py
│       └── query_builder.py
└── billing
└── modules
└── database_pro
├── __init__.py
└── sql.py
```

---

##### `sourceExclude`<sup>Optional</sup> <a name="sourceExclude" id="projen.python.uvConfig.BuildBackendSettings.property.sourceExclude"></a>

```typescript
public readonly sourceExclude: string[];
```

- *Type:* string[]

Glob expressions which files and directories to exclude from the source distribution.

---

##### `sourceInclude`<sup>Optional</sup> <a name="sourceInclude" id="projen.python.uvConfig.BuildBackendSettings.property.sourceInclude"></a>

```typescript
public readonly sourceInclude: string[];
```

- *Type:* string[]

Glob expressions which files and directories to additionally include in the source distribution.

`pyproject.toml` and the contents of the module directory are always included.

---

##### `wheelExclude`<sup>Optional</sup> <a name="wheelExclude" id="projen.python.uvConfig.BuildBackendSettings.property.wheelExclude"></a>

```typescript
public readonly wheelExclude: string[];
```

- *Type:* string[]

Glob expressions which files and directories to exclude from the wheel.

---

### DependencyGroupSettings <a name="DependencyGroupSettings" id="projen.python.uvConfig.DependencyGroupSettings"></a>

#### Initializer <a name="Initializer" id="projen.python.uvConfig.DependencyGroupSettings.Initializer"></a>

```typescript
import { python } from 'projen'

const dependencyGroupSettings: python.uvConfig.DependencyGroupSettings = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.uvConfig.DependencyGroupSettings.property.requiresPython">requiresPython</a></code> | <code>string</code> | Version of python to require when installing this group. |

---

##### `requiresPython`<sup>Optional</sup> <a name="requiresPython" id="projen.python.uvConfig.DependencyGroupSettings.property.requiresPython"></a>

```typescript
public readonly requiresPython: string;
```

- *Type:* string

Version of python to require when installing this group.

---

### Index <a name="Index" id="projen.python.uvConfig.Index"></a>

#### Initializer <a name="Initializer" id="projen.python.uvConfig.Index.Initializer"></a>

```typescript
import { python } from 'projen'

const index: python.uvConfig.Index = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.uvConfig.Index.property.url">url</a></code> | <code>string</code> | The URL of the index. |
| <code><a href="#projen.python.uvConfig.Index.property.authenticate">authenticate</a></code> | <code>string</code> | When uv should use authentication for requests to the index. |
| <code><a href="#projen.python.uvConfig.Index.property.cacheControl">cacheControl</a></code> | <code>projen.python.uvConfig.IndexCacheControl</code> | Cache control configuration for this index. |
| <code><a href="#projen.python.uvConfig.Index.property.default">default</a></code> | <code>boolean</code> | Mark the index as the default index. |
| <code><a href="#projen.python.uvConfig.Index.property.explicit">explicit</a></code> | <code>boolean</code> | Mark the index as explicit. |
| <code><a href="#projen.python.uvConfig.Index.property.format">format</a></code> | <code>string</code> | The format used by the index. |
| <code><a href="#projen.python.uvConfig.Index.property.ignoreErrorCodes">ignoreErrorCodes</a></code> | <code>number[]</code> | Status codes that uv should ignore when deciding whether to continue searching in the next index after a failure. |
| <code><a href="#projen.python.uvConfig.Index.property.name">name</a></code> | <code>string</code> | The name of the index. |
| <code><a href="#projen.python.uvConfig.Index.property.publishUrl">publishUrl</a></code> | <code>string</code> | The URL of the upload endpoint. |

---

##### `url`<sup>Required</sup> <a name="url" id="projen.python.uvConfig.Index.property.url"></a>

```typescript
public readonly url: string;
```

- *Type:* string

The URL of the index.

Expects to receive a URL (e.g., `https://pypi.org/simple`) or a local path.

---

##### `authenticate`<sup>Optional</sup> <a name="authenticate" id="projen.python.uvConfig.Index.property.authenticate"></a>

```typescript
public readonly authenticate: string;
```

- *Type:* string

When uv should use authentication for requests to the index.

```toml
[[tool.uv.index]]
name = "my-index"
url = "https://<omitted>/simple"
authenticate = "always"
```

---

##### `cacheControl`<sup>Optional</sup> <a name="cacheControl" id="projen.python.uvConfig.Index.property.cacheControl"></a>

```typescript
public readonly cacheControl: IndexCacheControl;
```

- *Type:* projen.python.uvConfig.IndexCacheControl

Cache control configuration for this index.

When set, these headers will override the server's cache control headers
for both package metadata requests and artifact downloads.

```toml
[[tool.uv.index]]
name = "my-index"
url = "https://<omitted>/simple"
cache-control = { api = "max-age=600", files = "max-age=3600" }
```

---

##### `default`<sup>Optional</sup> <a name="default" id="projen.python.uvConfig.Index.property.default"></a>

```typescript
public readonly default: boolean;
```

- *Type:* boolean

Mark the index as the default index.

By default, uv uses PyPI as the default index, such that even if additional indexes are
defined via `[[tool.uv.index]]`, PyPI will still be used as a fallback for packages that
aren't found elsewhere. To disable the PyPI default, set `default = true` on at least one
other index.

Marking an index as default will move it to the front of the list of indexes, such that it
is given the highest priority when resolving packages.

---

##### `explicit`<sup>Optional</sup> <a name="explicit" id="projen.python.uvConfig.Index.property.explicit"></a>

```typescript
public readonly explicit: boolean;
```

- *Type:* boolean

Mark the index as explicit.

Explicit indexes will _only_ be used when explicitly requested via a `[tool.uv.sources]`
definition, as in:

```toml
[[tool.uv.index]]
name = "pytorch"
url = "https://download.pytorch.org/whl/cu121"
explicit = true

[tool.uv.sources]
torch = { index = "pytorch" }
```

---

##### `format`<sup>Optional</sup> <a name="format" id="projen.python.uvConfig.Index.property.format"></a>

```typescript
public readonly format: string;
```

- *Type:* string

The format used by the index.

Indexes can either be PEP 503-compliant (i.e., a PyPI-style registry implementing the Simple
API) or structured as a flat list of distributions (e.g., `--find-links`). In both cases,
indexes can point to either local or remote resources.

---

##### `ignoreErrorCodes`<sup>Optional</sup> <a name="ignoreErrorCodes" id="projen.python.uvConfig.Index.property.ignoreErrorCodes"></a>

```typescript
public readonly ignoreErrorCodes: number[];
```

- *Type:* number[]

Status codes that uv should ignore when deciding whether to continue searching in the next index after a failure.

```toml
[[tool.uv.index]]
name = "my-index"
url = "https://<omitted>/simple"
ignore-error-codes = [401, 403]
```

---

##### `name`<sup>Optional</sup> <a name="name" id="projen.python.uvConfig.Index.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the index.

Index names can be used to reference indexes elsewhere in the configuration. For example,
you can pin a package to a specific index by name:

```toml
[[tool.uv.index]]
name = "pytorch"
url = "https://download.pytorch.org/whl/cu121"

[tool.uv.sources]
torch = { index = "pytorch" }
```

---

##### `publishUrl`<sup>Optional</sup> <a name="publishUrl" id="projen.python.uvConfig.Index.property.publishUrl"></a>

```typescript
public readonly publishUrl: string;
```

- *Type:* string

The URL of the upload endpoint.

When using `uv publish --index <name>`, this URL is used for publishing.

A configuration for the default index PyPI would look as follows:

```toml
[[tool.uv.index]]
name = "pypi"
url = "https://pypi.org/simple"
publish-url = "https://upload.pypi.org/legacy/"
```

---

### IndexCacheControl <a name="IndexCacheControl" id="projen.python.uvConfig.IndexCacheControl"></a>

Cache control configuration for an index.

#### Initializer <a name="Initializer" id="projen.python.uvConfig.IndexCacheControl.Initializer"></a>

```typescript
import { python } from 'projen'

const indexCacheControl: python.uvConfig.IndexCacheControl = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.uvConfig.IndexCacheControl.property.api">api</a></code> | <code>string</code> | Cache control header for Simple API requests. |
| <code><a href="#projen.python.uvConfig.IndexCacheControl.property.files">files</a></code> | <code>string</code> | Cache control header for file downloads. |

---

##### `api`<sup>Optional</sup> <a name="api" id="projen.python.uvConfig.IndexCacheControl.property.api"></a>

```typescript
public readonly api: string;
```

- *Type:* string

Cache control header for Simple API requests.

---

##### `files`<sup>Optional</sup> <a name="files" id="projen.python.uvConfig.IndexCacheControl.property.files"></a>

```typescript
public readonly files: string;
```

- *Type:* string

Cache control header for file downloads.

---

### PipGroupName <a name="PipGroupName" id="projen.python.uvConfig.PipGroupName"></a>

The pip-compatible variant of a [`GroupName`].

Either <groupname> or <path>:<groupname>.
If <path> is omitted it defaults to "pyproject.toml".

#### Initializer <a name="Initializer" id="projen.python.uvConfig.PipGroupName.Initializer"></a>

```typescript
import { python } from 'projen'

const pipGroupName: python.uvConfig.PipGroupName = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.uvConfig.PipGroupName.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.uvConfig.PipGroupName.property.path">path</a></code> | <code>string</code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="projen.python.uvConfig.PipGroupName.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `path`<sup>Optional</sup> <a name="path" id="projen.python.uvConfig.PipGroupName.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* string

---

### PipOptions <a name="PipOptions" id="projen.python.uvConfig.PipOptions"></a>

Settings that are specific to the `uv pip` command-line interface.

These values will be ignored when running commands outside the `uv pip` namespace (e.g.,
`uv lock`, `uvx`).

#### Initializer <a name="Initializer" id="projen.python.uvConfig.PipOptions.Initializer"></a>

```typescript
import { python } from 'projen'

const pipOptions: python.uvConfig.PipOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.uvConfig.PipOptions.property.allExtras">allExtras</a></code> | <code>boolean</code> | Include all optional dependencies. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.allowEmptyRequirements">allowEmptyRequirements</a></code> | <code>boolean</code> | Allow `uv pip sync` with empty requirements, which will clear the environment of all packages. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.annotationStyle">annotationStyle</a></code> | <code>string</code> | The style of the annotation comments included in the output file, used to indicate the source of each package. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.breakSystemPackages">breakSystemPackages</a></code> | <code>boolean</code> | Allow uv to modify an `EXTERNALLY-MANAGED` Python installation. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.compileBytecode">compileBytecode</a></code> | <code>boolean</code> | Compile Python files to bytecode after installation. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.configSettings">configSettings</a></code> | <code>{[ key: string ]: any}</code> | Settings to pass to the [PEP 517](https://peps.python.org/pep-0517/) build backend, specified as `KEY=VALUE` pairs. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.configSettingsPackage">configSettingsPackage</a></code> | <code>{[ key: string ]: {[ key: string ]: any}}</code> | Settings to pass to the [PEP 517](https://peps.python.org/pep-0517/) build backend for specific packages, specified as `KEY=VALUE` pairs. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.customCompileCommand">customCompileCommand</a></code> | <code>string</code> | The header comment to include at the top of the output file generated by `uv pip compile`. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.dependencyMetadata">dependencyMetadata</a></code> | <code>projen.python.uvConfig.StaticMetadata[]</code> | Pre-defined static metadata for dependencies of the project (direct or transitive). |
| <code><a href="#projen.python.uvConfig.PipOptions.property.emitBuildOptions">emitBuildOptions</a></code> | <code>boolean</code> | Include `--no-binary` and `--only-binary` entries in the output file generated by `uv pip compile`. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.emitFindLinks">emitFindLinks</a></code> | <code>boolean</code> | Include `--find-links` entries in the output file generated by `uv pip compile`. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.emitIndexAnnotation">emitIndexAnnotation</a></code> | <code>boolean</code> | Include comment annotations indicating the index used to resolve each package (e.g., `# from https://pypi.org/simple`). |
| <code><a href="#projen.python.uvConfig.PipOptions.property.emitIndexUrl">emitIndexUrl</a></code> | <code>boolean</code> | Include `--index-url` and `--extra-index-url` entries in the output file generated by `uv pip compile`. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.emitMarkerExpression">emitMarkerExpression</a></code> | <code>boolean</code> | Whether to emit a marker string indicating the conditions under which the set of pinned dependencies is valid. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.excludeNewer">excludeNewer</a></code> | <code>string</code> | Limit candidate packages to those that were uploaded prior to a given point in time. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.excludeNewerPackage">excludeNewerPackage</a></code> | <code>{[ key: string ]: string}</code> | Limit candidate packages for specific packages to those that were uploaded prior to the given date. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.extra">extra</a></code> | <code>string[]</code> | Include optional dependencies from the specified extra; may be provided more than once. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.extraBuildDependencies">extraBuildDependencies</a></code> | <code>{[ key: string ]: any[]}</code> | Additional build dependencies for packages. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.extraBuildVariables">extraBuildVariables</a></code> | <code>{[ key: string ]: {[ key: string ]: string}}</code> | Extra environment variables to set when building certain packages. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.extraIndexUrl">extraIndexUrl</a></code> | <code>string[]</code> | Extra URLs of package indexes to use, in addition to `--index-url`. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.findLinks">findLinks</a></code> | <code>string[]</code> | Locations to search for candidate distributions, in addition to those found in the registry indexes. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.forkStrategy">forkStrategy</a></code> | <code>string</code> | The strategy to use when selecting multiple versions of a given package across Python versions and platforms. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.generateHashes">generateHashes</a></code> | <code>boolean</code> | Include distribution hashes in the output file. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.group">group</a></code> | <code>projen.python.uvConfig.PipGroupName[]</code> | Include the following dependency groups. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.indexStrategy">indexStrategy</a></code> | <code>string</code> | The strategy to use when resolving against multiple index URLs. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.indexUrl">indexUrl</a></code> | <code>string</code> | The URL of the Python package index (by default: <https://pypi.org/simple>). |
| <code><a href="#projen.python.uvConfig.PipOptions.property.keyringProvider">keyringProvider</a></code> | <code>string</code> | Attempt to use `keyring` for authentication for index URLs. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.linkMode">linkMode</a></code> | <code>string</code> | The method to use when installing packages from the global cache. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.noAnnotate">noAnnotate</a></code> | <code>boolean</code> | Exclude comment annotations indicating the source of each package from the output file generated by `uv pip compile`. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.noBinary">noBinary</a></code> | <code>string[]</code> | Don't install pre-built wheels. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.noBuild">noBuild</a></code> | <code>boolean</code> | Don't build source distributions. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.noBuildIsolation">noBuildIsolation</a></code> | <code>boolean</code> | Disable isolation when building source distributions. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.noBuildIsolationPackage">noBuildIsolationPackage</a></code> | <code>string[]</code> | Disable isolation when building source distributions for a specific package. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.noDeps">noDeps</a></code> | <code>boolean</code> | Ignore package dependencies, instead only add those packages explicitly listed on the command line to the resulting requirements file. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.noEmitPackage">noEmitPackage</a></code> | <code>string[]</code> | Specify a package to omit from the output resolution. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.noExtra">noExtra</a></code> | <code>string[]</code> | Exclude the specified optional dependencies if `all-extras` is supplied. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.noHeader">noHeader</a></code> | <code>boolean</code> | Exclude the comment header at the top of output file generated by `uv pip compile`. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.noIndex">noIndex</a></code> | <code>boolean</code> | Ignore all registry indexes (e.g., PyPI), instead relying on direct URL dependencies and those provided via `--find-links`. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.noSources">noSources</a></code> | <code>boolean</code> | Ignore the `tool.uv.sources` table when resolving dependencies. Used to lock against the standards-compliant, publishable package metadata, as opposed to using any local or Git sources. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.noStripExtras">noStripExtras</a></code> | <code>boolean</code> | Include extras in the output file. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.noStripMarkers">noStripMarkers</a></code> | <code>boolean</code> | Include environment markers in the output file generated by `uv pip compile`. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.onlyBinary">onlyBinary</a></code> | <code>string[]</code> | Only use pre-built wheels; don't build source distributions. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.outputFile">outputFile</a></code> | <code>string</code> | Write the requirements generated by `uv pip compile` to the given `requirements.txt` file. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.prefix">prefix</a></code> | <code>string</code> | Install packages into `lib`, `bin`, and other top-level folders under the specified directory, as if a virtual environment were present at that location. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.prerelease">prerelease</a></code> | <code>string</code> | The strategy to use when considering pre-release versions. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.python">python</a></code> | <code>string</code> | The Python interpreter into which packages should be installed. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.pythonPlatform">pythonPlatform</a></code> | <code>string</code> | The platform for which requirements should be resolved. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.pythonVersion">pythonVersion</a></code> | <code>string</code> | The minimum Python version that should be supported by the resolved requirements (e.g., `3.8` or `3.8.17`). |
| <code><a href="#projen.python.uvConfig.PipOptions.property.reinstall">reinstall</a></code> | <code>boolean</code> | Reinstall all packages, regardless of whether they're already installed. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.reinstallPackage">reinstallPackage</a></code> | <code>string[]</code> | Reinstall a specific package, regardless of whether it's already installed. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.requireHashes">requireHashes</a></code> | <code>boolean</code> | Require a matching hash for each requirement. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.resolution">resolution</a></code> | <code>string</code> | The strategy to use when selecting between the different compatible versions for a given package requirement. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.strict">strict</a></code> | <code>boolean</code> | Validate the Python environment, to detect packages with missing dependencies and other issues. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.system">system</a></code> | <code>boolean</code> | Install packages into the system Python environment. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.target">target</a></code> | <code>string</code> | Install packages into the specified directory, rather than into the virtual or system Python environment. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.torchBackend">torchBackend</a></code> | <code>string</code> | The backend to use when fetching packages in the PyTorch ecosystem. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.universal">universal</a></code> | <code>boolean</code> | Perform a universal resolution, attempting to generate a single `requirements.txt` output file that is compatible with all operating systems, architectures, and Python implementations. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.upgrade">upgrade</a></code> | <code>boolean</code> | Allow package upgrades, ignoring pinned versions in any existing output file. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.upgradePackage">upgradePackage</a></code> | <code>string[]</code> | Allow upgrades for a specific package, ignoring pinned versions in any existing output file. |
| <code><a href="#projen.python.uvConfig.PipOptions.property.verifyHashes">verifyHashes</a></code> | <code>boolean</code> | Validate any hashes provided in the requirements file. |

---

##### `allExtras`<sup>Optional</sup> <a name="allExtras" id="projen.python.uvConfig.PipOptions.property.allExtras"></a>

```typescript
public readonly allExtras: boolean;
```

- *Type:* boolean

Include all optional dependencies.

Only applies to `pyproject.toml`, `setup.py`, and `setup.cfg` sources.

---

##### `allowEmptyRequirements`<sup>Optional</sup> <a name="allowEmptyRequirements" id="projen.python.uvConfig.PipOptions.property.allowEmptyRequirements"></a>

```typescript
public readonly allowEmptyRequirements: boolean;
```

- *Type:* boolean

Allow `uv pip sync` with empty requirements, which will clear the environment of all packages.

---

##### `annotationStyle`<sup>Optional</sup> <a name="annotationStyle" id="projen.python.uvConfig.PipOptions.property.annotationStyle"></a>

```typescript
public readonly annotationStyle: string;
```

- *Type:* string

The style of the annotation comments included in the output file, used to indicate the source of each package.

---

##### `breakSystemPackages`<sup>Optional</sup> <a name="breakSystemPackages" id="projen.python.uvConfig.PipOptions.property.breakSystemPackages"></a>

```typescript
public readonly breakSystemPackages: boolean;
```

- *Type:* boolean

Allow uv to modify an `EXTERNALLY-MANAGED` Python installation.

WARNING: `--break-system-packages` is intended for use in continuous integration (CI)
environments, when installing into Python installations that are managed by an external
package manager, like `apt`. It should be used with caution, as such Python installations
explicitly recommend against modifications by other package managers (like uv or pip).

---

##### `compileBytecode`<sup>Optional</sup> <a name="compileBytecode" id="projen.python.uvConfig.PipOptions.property.compileBytecode"></a>

```typescript
public readonly compileBytecode: boolean;
```

- *Type:* boolean

Compile Python files to bytecode after installation.

By default, uv does not compile Python (`.py`) files to bytecode (`__pycache__/*.pyc`);
instead, compilation is performed lazily the first time a module is imported. For use-cases
in which start time is critical, such as CLI applications and Docker containers, this option
can be enabled to trade longer installation times for faster start times.

When enabled, uv will process the entire site-packages directory (including packages that
are not being modified by the current operation) for consistency. Like pip, it will also
ignore errors.

---

##### `configSettings`<sup>Optional</sup> <a name="configSettings" id="projen.python.uvConfig.PipOptions.property.configSettings"></a>

```typescript
public readonly configSettings: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

Settings to pass to the [PEP 517](https://peps.python.org/pep-0517/) build backend, specified as `KEY=VALUE` pairs.

---

##### `configSettingsPackage`<sup>Optional</sup> <a name="configSettingsPackage" id="projen.python.uvConfig.PipOptions.property.configSettingsPackage"></a>

```typescript
public readonly configSettingsPackage: {[ key: string ]: {[ key: string ]: any}};
```

- *Type:* {[ key: string ]: {[ key: string ]: any}}

Settings to pass to the [PEP 517](https://peps.python.org/pep-0517/) build backend for specific packages, specified as `KEY=VALUE` pairs.

---

##### `customCompileCommand`<sup>Optional</sup> <a name="customCompileCommand" id="projen.python.uvConfig.PipOptions.property.customCompileCommand"></a>

```typescript
public readonly customCompileCommand: string;
```

- *Type:* string

The header comment to include at the top of the output file generated by `uv pip compile`.

Used to reflect custom build scripts and commands that wrap `uv pip compile`.

---

##### `dependencyMetadata`<sup>Optional</sup> <a name="dependencyMetadata" id="projen.python.uvConfig.PipOptions.property.dependencyMetadata"></a>

```typescript
public readonly dependencyMetadata: StaticMetadata[];
```

- *Type:* projen.python.uvConfig.StaticMetadata[]

Pre-defined static metadata for dependencies of the project (direct or transitive).

When
provided, enables the resolver to use the specified metadata instead of querying the
registry or building the relevant package from source.

Metadata should be provided in adherence with the [Metadata 2.3](https://packaging.python.org/en/latest/specifications/core-metadata/)
standard, though only the following fields are respected:

- `name`: The name of the package.
- (Optional) `version`: The version of the package. If omitted, the metadata will be applied
to all versions of the package.
- (Optional) `requires-dist`: The dependencies of the package (e.g., `werkzeug>=0.14`).
- (Optional) `requires-python`: The Python version required by the package (e.g., `>=3.10`).
- (Optional) `provides-extra`: The extras provided by the package.

---

##### `emitBuildOptions`<sup>Optional</sup> <a name="emitBuildOptions" id="projen.python.uvConfig.PipOptions.property.emitBuildOptions"></a>

```typescript
public readonly emitBuildOptions: boolean;
```

- *Type:* boolean

Include `--no-binary` and `--only-binary` entries in the output file generated by `uv pip compile`.

---

##### `emitFindLinks`<sup>Optional</sup> <a name="emitFindLinks" id="projen.python.uvConfig.PipOptions.property.emitFindLinks"></a>

```typescript
public readonly emitFindLinks: boolean;
```

- *Type:* boolean

Include `--find-links` entries in the output file generated by `uv pip compile`.

---

##### `emitIndexAnnotation`<sup>Optional</sup> <a name="emitIndexAnnotation" id="projen.python.uvConfig.PipOptions.property.emitIndexAnnotation"></a>

```typescript
public readonly emitIndexAnnotation: boolean;
```

- *Type:* boolean

Include comment annotations indicating the index used to resolve each package (e.g., `# from https://pypi.org/simple`).

---

##### `emitIndexUrl`<sup>Optional</sup> <a name="emitIndexUrl" id="projen.python.uvConfig.PipOptions.property.emitIndexUrl"></a>

```typescript
public readonly emitIndexUrl: boolean;
```

- *Type:* boolean

Include `--index-url` and `--extra-index-url` entries in the output file generated by `uv pip compile`.

---

##### `emitMarkerExpression`<sup>Optional</sup> <a name="emitMarkerExpression" id="projen.python.uvConfig.PipOptions.property.emitMarkerExpression"></a>

```typescript
public readonly emitMarkerExpression: boolean;
```

- *Type:* boolean

Whether to emit a marker string indicating the conditions under which the set of pinned dependencies is valid.

The pinned dependencies may be valid even when the marker expression is
false, but when the expression is true, the requirements are known to
be correct.

---

##### `excludeNewer`<sup>Optional</sup> <a name="excludeNewer" id="projen.python.uvConfig.PipOptions.property.excludeNewer"></a>

```typescript
public readonly excludeNewer: string;
```

- *Type:* string

Limit candidate packages to those that were uploaded prior to a given point in time.

Accepts a superset of [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339.html) (e.g.,
`2006-12-02T02:07:43Z`). A full timestamp is required to ensure that the resolver will
behave consistently across timezones.

---

##### `excludeNewerPackage`<sup>Optional</sup> <a name="excludeNewerPackage" id="projen.python.uvConfig.PipOptions.property.excludeNewerPackage"></a>

```typescript
public readonly excludeNewerPackage: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Limit candidate packages for specific packages to those that were uploaded prior to the given date.

Accepts package-date pairs in a dictionary format.

---

##### `extra`<sup>Optional</sup> <a name="extra" id="projen.python.uvConfig.PipOptions.property.extra"></a>

```typescript
public readonly extra: string[];
```

- *Type:* string[]

Include optional dependencies from the specified extra; may be provided more than once.

Only applies to `pyproject.toml`, `setup.py`, and `setup.cfg` sources.

---

##### `extraBuildDependencies`<sup>Optional</sup> <a name="extraBuildDependencies" id="projen.python.uvConfig.PipOptions.property.extraBuildDependencies"></a>

```typescript
public readonly extraBuildDependencies: {[ key: string ]: any[]};
```

- *Type:* {[ key: string ]: any[]}

Additional build dependencies for packages.

This allows extending the PEP 517 build environment for the project's dependencies with
additional packages. This is useful for packages that assume the presence of packages like
`pip`, and do not declare them as build dependencies.

---

##### `extraBuildVariables`<sup>Optional</sup> <a name="extraBuildVariables" id="projen.python.uvConfig.PipOptions.property.extraBuildVariables"></a>

```typescript
public readonly extraBuildVariables: {[ key: string ]: {[ key: string ]: string}};
```

- *Type:* {[ key: string ]: {[ key: string ]: string}}

Extra environment variables to set when building certain packages.

Environment variables will be added to the environment when building the
specified packages.

---

##### `extraIndexUrl`<sup>Optional</sup> <a name="extraIndexUrl" id="projen.python.uvConfig.PipOptions.property.extraIndexUrl"></a>

```typescript
public readonly extraIndexUrl: string[];
```

- *Type:* string[]

Extra URLs of package indexes to use, in addition to `--index-url`.

Accepts either a repository compliant with [PEP 503](https://peps.python.org/pep-0503/)
(the simple repository API), or a local directory laid out in the same format.

All indexes provided via this flag take priority over the index specified by
[`index_url`](#index-url). When multiple indexes are provided, earlier values take priority.

To control uv's resolution strategy when multiple indexes are present, see
[`index_strategy`](#index-strategy).

---

##### `findLinks`<sup>Optional</sup> <a name="findLinks" id="projen.python.uvConfig.PipOptions.property.findLinks"></a>

```typescript
public readonly findLinks: string[];
```

- *Type:* string[]

Locations to search for candidate distributions, in addition to those found in the registry indexes.

If a path, the target must be a directory that contains packages as wheel files (`.whl`) or
source distributions (e.g., `.tar.gz` or `.zip`) at the top level.

If a URL, the page must contain a flat list of links to package files adhering to the
formats described above.

---

##### `forkStrategy`<sup>Optional</sup> <a name="forkStrategy" id="projen.python.uvConfig.PipOptions.property.forkStrategy"></a>

```typescript
public readonly forkStrategy: string;
```

- *Type:* string

The strategy to use when selecting multiple versions of a given package across Python versions and platforms.

By default, uv will optimize for selecting the latest version of each package for each
supported Python version (`requires-python`), while minimizing the number of selected
versions across platforms.

Under `fewest`, uv will minimize the number of selected versions for each package,
preferring older versions that are compatible with a wider range of supported Python
versions or platforms.

---

##### `generateHashes`<sup>Optional</sup> <a name="generateHashes" id="projen.python.uvConfig.PipOptions.property.generateHashes"></a>

```typescript
public readonly generateHashes: boolean;
```

- *Type:* boolean

Include distribution hashes in the output file.

---

##### `group`<sup>Optional</sup> <a name="group" id="projen.python.uvConfig.PipOptions.property.group"></a>

```typescript
public readonly group: PipGroupName[];
```

- *Type:* projen.python.uvConfig.PipGroupName[]

Include the following dependency groups.

---

##### `indexStrategy`<sup>Optional</sup> <a name="indexStrategy" id="projen.python.uvConfig.PipOptions.property.indexStrategy"></a>

```typescript
public readonly indexStrategy: string;
```

- *Type:* string

The strategy to use when resolving against multiple index URLs.

By default, uv will stop at the first index on which a given package is available, and
limit resolutions to those present on that first index (`first-index`). This prevents
"dependency confusion" attacks, whereby an attacker can upload a malicious package under the
same name to an alternate index.

---

##### `indexUrl`<sup>Optional</sup> <a name="indexUrl" id="projen.python.uvConfig.PipOptions.property.indexUrl"></a>

```typescript
public readonly indexUrl: string;
```

- *Type:* string

The URL of the Python package index (by default: <https://pypi.org/simple>).

Accepts either a repository compliant with [PEP 503](https://peps.python.org/pep-0503/)
(the simple repository API), or a local directory laid out in the same format.

The index provided by this setting is given lower priority than any indexes specified via
[`extra_index_url`](#extra-index-url).

---

##### `keyringProvider`<sup>Optional</sup> <a name="keyringProvider" id="projen.python.uvConfig.PipOptions.property.keyringProvider"></a>

```typescript
public readonly keyringProvider: string;
```

- *Type:* string

Attempt to use `keyring` for authentication for index URLs.

At present, only `--keyring-provider subprocess` is supported, which configures uv to
use the `keyring` CLI to handle authentication.

---

##### `linkMode`<sup>Optional</sup> <a name="linkMode" id="projen.python.uvConfig.PipOptions.property.linkMode"></a>

```typescript
public readonly linkMode: string;
```

- *Type:* string
- *Default:* clone` (also known as Copy-on-Write) on macOS, and `hardlink` on Linux and

The method to use when installing packages from the global cache.

Defaults to `clone` (also known as Copy-on-Write) on macOS, and `hardlink` on Linux and
Windows.

WARNING: The use of symlink link mode is discouraged, as they create tight coupling between
the cache and the target environment. For example, clearing the cache (`uv cache clean`)
will break all installed packages by way of removing the underlying source files. Use
symlinks with caution.

---

##### `noAnnotate`<sup>Optional</sup> <a name="noAnnotate" id="projen.python.uvConfig.PipOptions.property.noAnnotate"></a>

```typescript
public readonly noAnnotate: boolean;
```

- *Type:* boolean

Exclude comment annotations indicating the source of each package from the output file generated by `uv pip compile`.

---

##### `noBinary`<sup>Optional</sup> <a name="noBinary" id="projen.python.uvConfig.PipOptions.property.noBinary"></a>

```typescript
public readonly noBinary: string[];
```

- *Type:* string[]

Don't install pre-built wheels.

The given packages will be built and installed from source. The resolver will still use
pre-built wheels to extract package metadata, if available.

Multiple packages may be provided. Disable binaries for all packages with `:all:`.
Clear previously specified packages with `:none:`.

---

##### `noBuild`<sup>Optional</sup> <a name="noBuild" id="projen.python.uvConfig.PipOptions.property.noBuild"></a>

```typescript
public readonly noBuild: boolean;
```

- *Type:* boolean

Don't build source distributions.

When enabled, resolving will not run arbitrary Python code. The cached wheels of
already-built source distributions will be reused, but operations that require building
distributions will exit with an error.

Alias for `--only-binary :all:`.

---

##### `noBuildIsolation`<sup>Optional</sup> <a name="noBuildIsolation" id="projen.python.uvConfig.PipOptions.property.noBuildIsolation"></a>

```typescript
public readonly noBuildIsolation: boolean;
```

- *Type:* boolean

Disable isolation when building source distributions.

Assumes that build dependencies specified by [PEP 518](https://peps.python.org/pep-0518/)
are already installed.

---

##### `noBuildIsolationPackage`<sup>Optional</sup> <a name="noBuildIsolationPackage" id="projen.python.uvConfig.PipOptions.property.noBuildIsolationPackage"></a>

```typescript
public readonly noBuildIsolationPackage: string[];
```

- *Type:* string[]

Disable isolation when building source distributions for a specific package.

Assumes that the packages' build dependencies specified by [PEP 518](https://peps.python.org/pep-0518/)
are already installed.

---

##### `noDeps`<sup>Optional</sup> <a name="noDeps" id="projen.python.uvConfig.PipOptions.property.noDeps"></a>

```typescript
public readonly noDeps: boolean;
```

- *Type:* boolean

Ignore package dependencies, instead only add those packages explicitly listed on the command line to the resulting requirements file.

---

##### `noEmitPackage`<sup>Optional</sup> <a name="noEmitPackage" id="projen.python.uvConfig.PipOptions.property.noEmitPackage"></a>

```typescript
public readonly noEmitPackage: string[];
```

- *Type:* string[]

Specify a package to omit from the output resolution.

Its dependencies will still be
included in the resolution. Equivalent to pip-compile's `--unsafe-package` option.

---

##### `noExtra`<sup>Optional</sup> <a name="noExtra" id="projen.python.uvConfig.PipOptions.property.noExtra"></a>

```typescript
public readonly noExtra: string[];
```

- *Type:* string[]

Exclude the specified optional dependencies if `all-extras` is supplied.

---

##### `noHeader`<sup>Optional</sup> <a name="noHeader" id="projen.python.uvConfig.PipOptions.property.noHeader"></a>

```typescript
public readonly noHeader: boolean;
```

- *Type:* boolean

Exclude the comment header at the top of output file generated by `uv pip compile`.

---

##### `noIndex`<sup>Optional</sup> <a name="noIndex" id="projen.python.uvConfig.PipOptions.property.noIndex"></a>

```typescript
public readonly noIndex: boolean;
```

- *Type:* boolean

Ignore all registry indexes (e.g., PyPI), instead relying on direct URL dependencies and those provided via `--find-links`.

---

##### `noSources`<sup>Optional</sup> <a name="noSources" id="projen.python.uvConfig.PipOptions.property.noSources"></a>

```typescript
public readonly noSources: boolean;
```

- *Type:* boolean

Ignore the `tool.uv.sources` table when resolving dependencies. Used to lock against the standards-compliant, publishable package metadata, as opposed to using any local or Git sources.

---

##### `noStripExtras`<sup>Optional</sup> <a name="noStripExtras" id="projen.python.uvConfig.PipOptions.property.noStripExtras"></a>

```typescript
public readonly noStripExtras: boolean;
```

- *Type:* boolean

Include extras in the output file.

By default, uv strips extras, as any packages pulled in by the extras are already included
as dependencies in the output file directly. Further, output files generated with
`--no-strip-extras` cannot be used as constraints files in `install` and `sync` invocations.

---

##### `noStripMarkers`<sup>Optional</sup> <a name="noStripMarkers" id="projen.python.uvConfig.PipOptions.property.noStripMarkers"></a>

```typescript
public readonly noStripMarkers: boolean;
```

- *Type:* boolean

Include environment markers in the output file generated by `uv pip compile`.

By default, uv strips environment markers, as the resolution generated by `compile` is
only guaranteed to be correct for the target environment.

---

##### `onlyBinary`<sup>Optional</sup> <a name="onlyBinary" id="projen.python.uvConfig.PipOptions.property.onlyBinary"></a>

```typescript
public readonly onlyBinary: string[];
```

- *Type:* string[]

Only use pre-built wheels; don't build source distributions.

When enabled, resolving will not run code from the given packages. The cached wheels of already-built
source distributions will be reused, but operations that require building distributions will
exit with an error.

Multiple packages may be provided. Disable binaries for all packages with `:all:`.
Clear previously specified packages with `:none:`.

---

##### `outputFile`<sup>Optional</sup> <a name="outputFile" id="projen.python.uvConfig.PipOptions.property.outputFile"></a>

```typescript
public readonly outputFile: string;
```

- *Type:* string

Write the requirements generated by `uv pip compile` to the given `requirements.txt` file.

If the file already exists, the existing versions will be preferred when resolving
dependencies, unless `--upgrade` is also specified.

---

##### `prefix`<sup>Optional</sup> <a name="prefix" id="projen.python.uvConfig.PipOptions.property.prefix"></a>

```typescript
public readonly prefix: string;
```

- *Type:* string

Install packages into `lib`, `bin`, and other top-level folders under the specified directory, as if a virtual environment were present at that location.

In general, prefer the use of `--python` to install into an alternate environment, as
scripts and other artifacts installed via `--prefix` will reference the installing
interpreter, rather than any interpreter added to the `--prefix` directory, rendering them
non-portable.

---

##### `prerelease`<sup>Optional</sup> <a name="prerelease" id="projen.python.uvConfig.PipOptions.property.prerelease"></a>

```typescript
public readonly prerelease: string;
```

- *Type:* string

The strategy to use when considering pre-release versions.

By default, uv will accept pre-releases for packages that _only_ publish pre-releases,
along with first-party requirements that contain an explicit pre-release marker in the
declared specifiers (`if-necessary-or-explicit`).

---

##### `python`<sup>Optional</sup> <a name="python" id="projen.python.uvConfig.PipOptions.property.python"></a>

```typescript
public readonly python: string;
```

- *Type:* string

The Python interpreter into which packages should be installed.

By default, uv installs into the virtual environment in the current working directory or
any parent directory. The `--python` option allows you to specify a different interpreter,
which is intended for use in continuous integration (CI) environments or other automated
workflows.

Supported formats:
- `3.10` looks for an installed Python 3.10 in the registry on Windows (see
`py --list-paths`), or `python3.10` on Linux and macOS.
- `python3.10` or `python.exe` looks for a binary with the given name in `PATH`.
- `/home/ferris/.local/bin/python3.10` uses the exact Python at the given path.

---

##### `pythonPlatform`<sup>Optional</sup> <a name="pythonPlatform" id="projen.python.uvConfig.PipOptions.property.pythonPlatform"></a>

```typescript
public readonly pythonPlatform: string;
```

- *Type:* string

The platform for which requirements should be resolved.

Represented as a "target triple", a string that describes the target platform in terms of
its CPU, vendor, and operating system name, like `x86_64-unknown-linux-gnu` or
`aarch64-apple-darwin`.

---

##### `pythonVersion`<sup>Optional</sup> <a name="pythonVersion" id="projen.python.uvConfig.PipOptions.property.pythonVersion"></a>

```typescript
public readonly pythonVersion: string;
```

- *Type:* string

The minimum Python version that should be supported by the resolved requirements (e.g., `3.8` or `3.8.17`).

If a patch version is omitted, the minimum patch version is assumed. For example, `3.8` is
mapped to `3.8.0`.

---

##### `reinstall`<sup>Optional</sup> <a name="reinstall" id="projen.python.uvConfig.PipOptions.property.reinstall"></a>

```typescript
public readonly reinstall: boolean;
```

- *Type:* boolean

Reinstall all packages, regardless of whether they're already installed.

Implies `refresh`.

---

##### `reinstallPackage`<sup>Optional</sup> <a name="reinstallPackage" id="projen.python.uvConfig.PipOptions.property.reinstallPackage"></a>

```typescript
public readonly reinstallPackage: string[];
```

- *Type:* string[]

Reinstall a specific package, regardless of whether it's already installed.

Implies
`refresh-package`.

---

##### `requireHashes`<sup>Optional</sup> <a name="requireHashes" id="projen.python.uvConfig.PipOptions.property.requireHashes"></a>

```typescript
public readonly requireHashes: boolean;
```

- *Type:* boolean

Require a matching hash for each requirement.

Hash-checking mode is all or nothing. If enabled, _all_ requirements must be provided
with a corresponding hash or set of hashes. Additionally, if enabled, _all_ requirements
must either be pinned to exact versions (e.g., `==1.0.0`), or be specified via direct URL.

Hash-checking mode introduces a number of additional constraints:

- Git dependencies are not supported.
- Editable installations are not supported.
- Local dependencies are not supported, unless they point to a specific wheel (`.whl`) or
source archive (`.zip`, `.tar.gz`), as opposed to a directory.

---

##### `resolution`<sup>Optional</sup> <a name="resolution" id="projen.python.uvConfig.PipOptions.property.resolution"></a>

```typescript
public readonly resolution: string;
```

- *Type:* string

The strategy to use when selecting between the different compatible versions for a given package requirement.

By default, uv will use the latest compatible version of each package (`highest`).

---

##### `strict`<sup>Optional</sup> <a name="strict" id="projen.python.uvConfig.PipOptions.property.strict"></a>

```typescript
public readonly strict: boolean;
```

- *Type:* boolean

Validate the Python environment, to detect packages with missing dependencies and other issues.

---

##### `system`<sup>Optional</sup> <a name="system" id="projen.python.uvConfig.PipOptions.property.system"></a>

```typescript
public readonly system: boolean;
```

- *Type:* boolean

Install packages into the system Python environment.

By default, uv installs into the virtual environment in the current working directory or
any parent directory. The `--system` option instructs uv to instead use the first Python
found in the system `PATH`.

WARNING: `--system` is intended for use in continuous integration (CI) environments and
should be used with caution, as it can modify the system Python installation.

---

##### `target`<sup>Optional</sup> <a name="target" id="projen.python.uvConfig.PipOptions.property.target"></a>

```typescript
public readonly target: string;
```

- *Type:* string

Install packages into the specified directory, rather than into the virtual or system Python environment.

The packages will be installed at the top-level of the directory.

---

##### `torchBackend`<sup>Optional</sup> <a name="torchBackend" id="projen.python.uvConfig.PipOptions.property.torchBackend"></a>

```typescript
public readonly torchBackend: string;
```

- *Type:* string

The backend to use when fetching packages in the PyTorch ecosystem.

When set, uv will ignore the configured index URLs for packages in the PyTorch ecosystem,
and will instead use the defined backend.

For example, when set to `cpu`, uv will use the CPU-only PyTorch index; when set to `cu126`,
uv will use the PyTorch index for CUDA 12.6.

The `auto` mode will attempt to detect the appropriate PyTorch index based on the currently
installed CUDA drivers.

This option is in preview and may change in any future release.

---

##### `universal`<sup>Optional</sup> <a name="universal" id="projen.python.uvConfig.PipOptions.property.universal"></a>

```typescript
public readonly universal: boolean;
```

- *Type:* boolean

Perform a universal resolution, attempting to generate a single `requirements.txt` output file that is compatible with all operating systems, architectures, and Python implementations.

In universal mode, the current Python version (or user-provided `--python-version`) will be
treated as a lower bound. For example, `--universal --python-version 3.7` would produce a
universal resolution for Python 3.7 and later.

---

##### `upgrade`<sup>Optional</sup> <a name="upgrade" id="projen.python.uvConfig.PipOptions.property.upgrade"></a>

```typescript
public readonly upgrade: boolean;
```

- *Type:* boolean

Allow package upgrades, ignoring pinned versions in any existing output file.

---

##### `upgradePackage`<sup>Optional</sup> <a name="upgradePackage" id="projen.python.uvConfig.PipOptions.property.upgradePackage"></a>

```typescript
public readonly upgradePackage: string[];
```

- *Type:* string[]

Allow upgrades for a specific package, ignoring pinned versions in any existing output file.

Accepts both standalone package names (`ruff`) and version specifiers (`ruff<0.5.0`).

---

##### `verifyHashes`<sup>Optional</sup> <a name="verifyHashes" id="projen.python.uvConfig.PipOptions.property.verifyHashes"></a>

```typescript
public readonly verifyHashes: boolean;
```

- *Type:* boolean

Validate any hashes provided in the requirements file.

Unlike `--require-hashes`, `--verify-hashes` does not require that all requirements have
hashes; instead, it will limit itself to verifying the hashes of those requirements that do
include them.

---

### SchemaConflictItem <a name="SchemaConflictItem" id="projen.python.uvConfig.SchemaConflictItem"></a>

A single item in a conflicting set.

Each item is a pair of an (optional) package and a corresponding extra or group name for that
package.

#### Initializer <a name="Initializer" id="projen.python.uvConfig.SchemaConflictItem.Initializer"></a>

```typescript
import { python } from 'projen'

const schemaConflictItem: python.uvConfig.SchemaConflictItem = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.uvConfig.SchemaConflictItem.property.extra">extra</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.uvConfig.SchemaConflictItem.property.group">group</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.uvConfig.SchemaConflictItem.property.package">package</a></code> | <code>string</code> | *No description.* |

---

##### `extra`<sup>Optional</sup> <a name="extra" id="projen.python.uvConfig.SchemaConflictItem.property.extra"></a>

```typescript
public readonly extra: string;
```

- *Type:* string

---

##### `group`<sup>Optional</sup> <a name="group" id="projen.python.uvConfig.SchemaConflictItem.property.group"></a>

```typescript
public readonly group: string;
```

- *Type:* string

---

##### `package`<sup>Optional</sup> <a name="package" id="projen.python.uvConfig.SchemaConflictItem.property.package"></a>

```typescript
public readonly package: string;
```

- *Type:* string

---

### StaticMetadata <a name="StaticMetadata" id="projen.python.uvConfig.StaticMetadata"></a>

A subset of the Python Package Metadata 2.3 standard as specified in <https://packaging.python.org/specifications/core-metadata/>.

#### Initializer <a name="Initializer" id="projen.python.uvConfig.StaticMetadata.Initializer"></a>

```typescript
import { python } from 'projen'

const staticMetadata: python.uvConfig.StaticMetadata = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.uvConfig.StaticMetadata.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.uvConfig.StaticMetadata.property.providesExtra">providesExtra</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen.python.uvConfig.StaticMetadata.property.requiresDist">requiresDist</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen.python.uvConfig.StaticMetadata.property.requiresPython">requiresPython</a></code> | <code>string</code> | PEP 508-style Python requirement, e.g., `>=3.10`. |
| <code><a href="#projen.python.uvConfig.StaticMetadata.property.version">version</a></code> | <code>string</code> | PEP 440-style package version, e.g., `1.2.3`. |

---

##### `name`<sup>Required</sup> <a name="name" id="projen.python.uvConfig.StaticMetadata.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `providesExtra`<sup>Optional</sup> <a name="providesExtra" id="projen.python.uvConfig.StaticMetadata.property.providesExtra"></a>

```typescript
public readonly providesExtra: string[];
```

- *Type:* string[]

---

##### `requiresDist`<sup>Optional</sup> <a name="requiresDist" id="projen.python.uvConfig.StaticMetadata.property.requiresDist"></a>

```typescript
public readonly requiresDist: string[];
```

- *Type:* string[]

---

##### `requiresPython`<sup>Optional</sup> <a name="requiresPython" id="projen.python.uvConfig.StaticMetadata.property.requiresPython"></a>

```typescript
public readonly requiresPython: string;
```

- *Type:* string

PEP 508-style Python requirement, e.g., `>=3.10`.

---

##### `version`<sup>Optional</sup> <a name="version" id="projen.python.uvConfig.StaticMetadata.property.version"></a>

```typescript
public readonly version: string;
```

- *Type:* string

PEP 440-style package version, e.g., `1.2.3`.

---

### ToolUvWorkspace <a name="ToolUvWorkspace" id="projen.python.uvConfig.ToolUvWorkspace"></a>

#### Initializer <a name="Initializer" id="projen.python.uvConfig.ToolUvWorkspace.Initializer"></a>

```typescript
import { python } from 'projen'

const toolUvWorkspace: python.uvConfig.ToolUvWorkspace = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.uvConfig.ToolUvWorkspace.property.exclude">exclude</a></code> | <code>string[]</code> | Packages to exclude as workspace members. If a package matches both `members` and `exclude`, it will be excluded. |
| <code><a href="#projen.python.uvConfig.ToolUvWorkspace.property.members">members</a></code> | <code>string[]</code> | Packages to include as workspace members. |

---

##### `exclude`<sup>Optional</sup> <a name="exclude" id="projen.python.uvConfig.ToolUvWorkspace.property.exclude"></a>

```typescript
public readonly exclude: string[];
```

- *Type:* string[]

Packages to exclude as workspace members. If a package matches both `members` and `exclude`, it will be excluded.

Supports both globs and explicit paths.

For more information on the glob syntax, refer to the [`glob` documentation](https://docs.rs/glob/latest/glob/struct.Pattern.html).

---

##### `members`<sup>Optional</sup> <a name="members" id="projen.python.uvConfig.ToolUvWorkspace.property.members"></a>

```typescript
public readonly members: string[];
```

- *Type:* string[]

Packages to include as workspace members.

Supports both globs and explicit paths.

For more information on the glob syntax, refer to the [`glob` documentation](https://docs.rs/glob/latest/glob/struct.Pattern.html).

---

### UvConfiguration <a name="UvConfiguration" id="projen.python.uvConfig.UvConfiguration"></a>

Metadata and configuration for uv.

#### Initializer <a name="Initializer" id="projen.python.uvConfig.UvConfiguration.Initializer"></a>

```typescript
import { python } from 'projen'

const uvConfiguration: python.uvConfig.UvConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.addBounds">addBounds</a></code> | <code>string</code> | The default version specifier when adding a dependency. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.allowInsecureHost">allowInsecureHost</a></code> | <code>string[]</code> | Allow insecure connections to host. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.buildBackend">buildBackend</a></code> | <code>projen.python.uvConfig.BuildBackendSettings</code> | Configuration for the uv build backend. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.buildConstraintDependencies">buildConstraintDependencies</a></code> | <code>string[]</code> | PEP 508-style requirements, e.g., `ruff==0.5.0`, or `ruff @ https://...`. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.cacheDir">cacheDir</a></code> | <code>string</code> | Path to the cache directory. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.cacheKeys">cacheKeys</a></code> | <code>any[]</code> | The keys to consider when caching builds for the project. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.checkUrl">checkUrl</a></code> | <code>string</code> | Check an index URL for existing files to skip duplicate uploads. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.compileBytecode">compileBytecode</a></code> | <code>boolean</code> | Compile Python files to bytecode after installation. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.concurrentBuilds">concurrentBuilds</a></code> | <code>number</code> | The maximum number of source distributions that uv will build concurrently at any given time. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.concurrentDownloads">concurrentDownloads</a></code> | <code>number</code> | The maximum number of in-flight concurrent downloads that uv will perform at any given time. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.concurrentInstalls">concurrentInstalls</a></code> | <code>number</code> | The number of threads used when installing and unzipping packages. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.configSettings">configSettings</a></code> | <code>{[ key: string ]: any}</code> | Settings to pass to the [PEP 517](https://peps.python.org/pep-0517/) build backend, specified as `KEY=VALUE` pairs. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.configSettingsPackage">configSettingsPackage</a></code> | <code>{[ key: string ]: {[ key: string ]: any}}</code> | Settings to pass to the [PEP 517](https://peps.python.org/pep-0517/) build backend for specific packages, specified as `KEY=VALUE` pairs. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.conflicts">conflicts</a></code> | <code>projen.python.uvConfig.SchemaConflictItem[][]</code> | A list of sets of conflicting groups or extras. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.constraintDependencies">constraintDependencies</a></code> | <code>string[]</code> | PEP 508-style requirements, e.g., `ruff==0.5.0`, or `ruff @ https://...`. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.defaultGroups">defaultGroups</a></code> | <code>any</code> | The list of `dependency-groups` to install by default. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.dependencyGroups">dependencyGroups</a></code> | <code>{[ key: string ]: projen.python.uvConfig.DependencyGroupSettings}</code> | Additional settings for `dependency-groups`. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.dependencyMetadata">dependencyMetadata</a></code> | <code>projen.python.uvConfig.StaticMetadata[]</code> | Pre-defined static metadata for dependencies of the project (direct or transitive). |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.devDependencies">devDependencies</a></code> | <code>string[]</code> | PEP 508-style requirements, e.g., `ruff==0.5.0`, or `ruff @ https://...`. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.environments">environments</a></code> | <code>string[]</code> | A list of environment markers, e.g., `python_version >= '3.6'`. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.excludeDependencies">excludeDependencies</a></code> | <code>string[]</code> | Package names to exclude, e.g., `werkzeug`, `numpy`. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.excludeNewer">excludeNewer</a></code> | <code>string</code> | Limit candidate packages to those that were uploaded prior to a given point in time. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.excludeNewerPackage">excludeNewerPackage</a></code> | <code>{[ key: string ]: string}</code> | Limit candidate packages for specific packages to those that were uploaded prior to the given date. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.extraBuildDependencies">extraBuildDependencies</a></code> | <code>{[ key: string ]: any[]}</code> | Additional build dependencies for packages. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.extraBuildVariables">extraBuildVariables</a></code> | <code>{[ key: string ]: {[ key: string ]: string}}</code> | Extra environment variables to set when building certain packages. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.extraIndexUrl">extraIndexUrl</a></code> | <code>string[]</code> | Extra URLs of package indexes to use, in addition to `--index-url`. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.findLinks">findLinks</a></code> | <code>string[]</code> | Locations to search for candidate distributions, in addition to those found in the registry indexes. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.forkStrategy">forkStrategy</a></code> | <code>string</code> | The strategy to use when selecting multiple versions of a given package across Python versions and platforms. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.index">index</a></code> | <code>projen.python.uvConfig.Index[]</code> | The indexes to use when resolving dependencies. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.indexStrategy">indexStrategy</a></code> | <code>string</code> | The strategy to use when resolving against multiple index URLs. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.indexUrl">indexUrl</a></code> | <code>string</code> | The URL of the Python package index (by default: <https://pypi.org/simple>). |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.keyringProvider">keyringProvider</a></code> | <code>string</code> | Attempt to use `keyring` for authentication for index URLs. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.linkMode">linkMode</a></code> | <code>string</code> | The method to use when installing packages from the global cache. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.managed">managed</a></code> | <code>boolean</code> | Whether the project is managed by uv. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.nativeTls">nativeTls</a></code> | <code>boolean</code> | Whether to load TLS certificates from the platform's native certificate store. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.noBinary">noBinary</a></code> | <code>boolean</code> | Don't install pre-built wheels. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.noBinaryPackage">noBinaryPackage</a></code> | <code>string[]</code> | Don't install pre-built wheels for a specific package. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.noBuild">noBuild</a></code> | <code>boolean</code> | Don't build source distributions. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.noBuildIsolation">noBuildIsolation</a></code> | <code>boolean</code> | Disable isolation when building source distributions. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.noBuildIsolationPackage">noBuildIsolationPackage</a></code> | <code>string[]</code> | Disable isolation when building source distributions for a specific package. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.noBuildPackage">noBuildPackage</a></code> | <code>string[]</code> | Don't build source distributions for a specific package. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.noCache">noCache</a></code> | <code>boolean</code> | Avoid reading from or writing to the cache, instead using a temporary directory for the duration of the operation. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.noIndex">noIndex</a></code> | <code>boolean</code> | Ignore all registry indexes (e.g., PyPI), instead relying on direct URL dependencies and those provided via `--find-links`. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.noSources">noSources</a></code> | <code>boolean</code> | Ignore the `tool.uv.sources` table when resolving dependencies. Used to lock against the standards-compliant, publishable package metadata, as opposed to using any local or Git sources. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.offline">offline</a></code> | <code>boolean</code> | Disable network access, relying only on locally cached data and locally available files. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.overrideDependencies">overrideDependencies</a></code> | <code>string[]</code> | PEP 508-style requirements, e.g., `ruff==0.5.0`, or `ruff @ https://...`. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.package">package</a></code> | <code>boolean</code> | Whether the project should be considered a Python package, or a non-package ("virtual") project. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.pip">pip</a></code> | <code>projen.python.uvConfig.PipOptions</code> | *No description.* |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.prerelease">prerelease</a></code> | <code>string</code> | The strategy to use when considering pre-release versions. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.preview">preview</a></code> | <code>boolean</code> | Whether to enable experimental, preview features. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.publishUrl">publishUrl</a></code> | <code>string</code> | The URL for publishing packages to the Python package index (by default: <https://upload.pypi.org/legacy/>). |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.pypyInstallMirror">pypyInstallMirror</a></code> | <code>string</code> | Mirror URL to use for downloading managed PyPy installations. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.pythonDownloads">pythonDownloads</a></code> | <code>string</code> | Whether to allow Python downloads. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.pythonDownloadsJsonUrl">pythonDownloadsJsonUrl</a></code> | <code>string</code> | URL pointing to JSON of custom Python installations. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.pythonInstallMirror">pythonInstallMirror</a></code> | <code>string</code> | Mirror URL for downloading managed Python installations. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.pythonPreference">pythonPreference</a></code> | <code>string</code> | Whether to prefer using Python installations that are already present on the system, or those that are downloaded and installed by uv. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.reinstall">reinstall</a></code> | <code>boolean</code> | Reinstall all packages, regardless of whether they're already installed. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.reinstallPackage">reinstallPackage</a></code> | <code>string[]</code> | Reinstall a specific package, regardless of whether it's already installed. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.requiredEnvironments">requiredEnvironments</a></code> | <code>string[]</code> | A list of environment markers, e.g., `sys_platform == 'darwin'. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.requiredVersion">requiredVersion</a></code> | <code>string</code> | Enforce a requirement on the version of uv. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.resolution">resolution</a></code> | <code>string</code> | The strategy to use when selecting between the different compatible versions for a given package requirement. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.sources">sources</a></code> | <code>{[ key: string ]: any[]}</code> | The sources to use when resolving dependencies. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.trustedPublishing">trustedPublishing</a></code> | <code>projen.python.uvConfig.TrustedPublishing</code> | Configure trusted publishing. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.upgrade">upgrade</a></code> | <code>boolean</code> | Allow package upgrades, ignoring pinned versions in any existing output file. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.upgradePackage">upgradePackage</a></code> | <code>string[]</code> | Allow upgrades for a specific package, ignoring pinned versions in any existing output file. |
| <code><a href="#projen.python.uvConfig.UvConfiguration.property.workspace">workspace</a></code> | <code>projen.python.uvConfig.ToolUvWorkspace</code> | The workspace definition for the project, if any. |

---

##### `addBounds`<sup>Optional</sup> <a name="addBounds" id="projen.python.uvConfig.UvConfiguration.property.addBounds"></a>

```typescript
public readonly addBounds: string;
```

- *Type:* string

The default version specifier when adding a dependency.

When adding a dependency to the project, if no constraint or URL is provided, a constraint
is added based on the latest compatible version of the package. By default, a lower bound
constraint is used, e.g., `>=1.2.3`.

When `--frozen` is provided, no resolution is performed, and dependencies are always added
without constraints.

This option is in preview and may change in any future release.

---

##### `allowInsecureHost`<sup>Optional</sup> <a name="allowInsecureHost" id="projen.python.uvConfig.UvConfiguration.property.allowInsecureHost"></a>

```typescript
public readonly allowInsecureHost: string[];
```

- *Type:* string[]

Allow insecure connections to host.

Expects to receive either a hostname (e.g., `localhost`), a host-port pair (e.g.,
`localhost:8080`), or a URL (e.g., `https://localhost`).

WARNING: Hosts included in this list will not be verified against the system's certificate
store. Only use `--allow-insecure-host` in a secure network with verified sources, as it
bypasses SSL verification and could expose you to MITM attacks.

---

##### `buildBackend`<sup>Optional</sup> <a name="buildBackend" id="projen.python.uvConfig.UvConfiguration.property.buildBackend"></a>

```typescript
public readonly buildBackend: BuildBackendSettings;
```

- *Type:* projen.python.uvConfig.BuildBackendSettings

Configuration for the uv build backend.

Note that those settings only apply when using the `uv_build` backend, other build backends
(such as hatchling) have their own configuration.

---

##### `buildConstraintDependencies`<sup>Optional</sup> <a name="buildConstraintDependencies" id="projen.python.uvConfig.UvConfiguration.property.buildConstraintDependencies"></a>

```typescript
public readonly buildConstraintDependencies: string[];
```

- *Type:* string[]

PEP 508-style requirements, e.g., `ruff==0.5.0`, or `ruff @ https://...`.

---

##### `cacheDir`<sup>Optional</sup> <a name="cacheDir" id="projen.python.uvConfig.UvConfiguration.property.cacheDir"></a>

```typescript
public readonly cacheDir: string;
```

- *Type:* string

Path to the cache directory.

---

##### `cacheKeys`<sup>Optional</sup> <a name="cacheKeys" id="projen.python.uvConfig.UvConfiguration.property.cacheKeys"></a>

```typescript
public readonly cacheKeys: any[];
```

- *Type:* any[]

The keys to consider when caching builds for the project.

Cache keys enable you to specify the files or directories that should trigger a rebuild when
modified. By default, uv will rebuild a project whenever the `pyproject.toml`, `setup.py`,
or `setup.cfg` files in the project directory are modified, or if a `src` directory is
added or removed, i.e.:

```toml
cache-keys = [{ file = "pyproject.toml" }, { file = "setup.py" }, { file = "setup.cfg" }, { dir = "src" }]
```

As an example: if a project uses dynamic metadata to read its dependencies from a
`requirements.txt` file, you can specify `cache-keys = [{ file = "requirements.txt" }, { file = "pyproject.toml" }]`
to ensure that the project is rebuilt whenever the `requirements.txt` file is modified (in
addition to watching the `pyproject.toml`).

Globs are supported, following the syntax of the [`glob`](https://docs.rs/glob/0.3.1/glob/struct.Pattern.html)
crate. For example, to invalidate the cache whenever a `.toml` file in the project directory
or any of its subdirectories is modified, you can specify `cache-keys = [{ file = "*_/*.toml" }]`.
Note that the use of globs can be expensive, as uv may need to walk the filesystem to
determine whether any files have changed.

Cache keys can also include version control information. For example, if a project uses
`setuptools_scm` to read its version from a Git commit, you can specify `cache-keys = [{ git = { commit = true }, { file = "pyproject.toml" }]`
to include the current Git commit hash in the cache key (in addition to the
`pyproject.toml`). Git tags are also supported via `cache-keys = [{ git = { commit = true, tags = true } }]`.

Cache keys can also include environment variables. For example, if a project relies on
`MACOSX_DEPLOYMENT_TARGET` or other environment variables to determine its behavior, you can
specify `cache-keys = [{ env = "MACOSX_DEPLOYMENT_TARGET" }]` to invalidate the cache
whenever the environment variable changes.

Cache keys only affect the project defined by the `pyproject.toml` in which they're
specified (as opposed to, e.g., affecting all members in a workspace), and all paths and
globs are interpreted as relative to the project directory.

---

##### `checkUrl`<sup>Optional</sup> <a name="checkUrl" id="projen.python.uvConfig.UvConfiguration.property.checkUrl"></a>

```typescript
public readonly checkUrl: string;
```

- *Type:* string

Check an index URL for existing files to skip duplicate uploads.

This option allows retrying publishing that failed after only some, but not all files have
been uploaded, and handles error due to parallel uploads of the same file.

Before uploading, the index is checked. If the exact same file already exists in the index,
the file will not be uploaded. If an error occurred during the upload, the index is checked
again, to handle cases where the identical file was uploaded twice in parallel.

The exact behavior will vary based on the index. When uploading to PyPI, uploading the same
file succeeds even without `--check-url`, while most other indexes error.

The index must provide one of the supported hashes (SHA-256, SHA-384, or SHA-512).

---

##### `compileBytecode`<sup>Optional</sup> <a name="compileBytecode" id="projen.python.uvConfig.UvConfiguration.property.compileBytecode"></a>

```typescript
public readonly compileBytecode: boolean;
```

- *Type:* boolean

Compile Python files to bytecode after installation.

By default, uv does not compile Python (`.py`) files to bytecode (`__pycache__/*.pyc`);
instead, compilation is performed lazily the first time a module is imported. For use-cases
in which start time is critical, such as CLI applications and Docker containers, this option
can be enabled to trade longer installation times for faster start times.

When enabled, uv will process the entire site-packages directory (including packages that
are not being modified by the current operation) for consistency. Like pip, it will also
ignore errors.

---

##### `concurrentBuilds`<sup>Optional</sup> <a name="concurrentBuilds" id="projen.python.uvConfig.UvConfiguration.property.concurrentBuilds"></a>

```typescript
public readonly concurrentBuilds: number;
```

- *Type:* number
- *Default:* the number of available CPU cores.

The maximum number of source distributions that uv will build concurrently at any given time.

Defaults to the number of available CPU cores.

---

##### `concurrentDownloads`<sup>Optional</sup> <a name="concurrentDownloads" id="projen.python.uvConfig.UvConfiguration.property.concurrentDownloads"></a>

```typescript
public readonly concurrentDownloads: number;
```

- *Type:* number

The maximum number of in-flight concurrent downloads that uv will perform at any given time.

---

##### `concurrentInstalls`<sup>Optional</sup> <a name="concurrentInstalls" id="projen.python.uvConfig.UvConfiguration.property.concurrentInstalls"></a>

```typescript
public readonly concurrentInstalls: number;
```

- *Type:* number
- *Default:* the number of available CPU cores.

The number of threads used when installing and unzipping packages.

Defaults to the number of available CPU cores.

---

##### `configSettings`<sup>Optional</sup> <a name="configSettings" id="projen.python.uvConfig.UvConfiguration.property.configSettings"></a>

```typescript
public readonly configSettings: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

Settings to pass to the [PEP 517](https://peps.python.org/pep-0517/) build backend, specified as `KEY=VALUE` pairs.

---

##### `configSettingsPackage`<sup>Optional</sup> <a name="configSettingsPackage" id="projen.python.uvConfig.UvConfiguration.property.configSettingsPackage"></a>

```typescript
public readonly configSettingsPackage: {[ key: string ]: {[ key: string ]: any}};
```

- *Type:* {[ key: string ]: {[ key: string ]: any}}

Settings to pass to the [PEP 517](https://peps.python.org/pep-0517/) build backend for specific packages, specified as `KEY=VALUE` pairs.

Accepts a map from package names to string key-value pairs.

---

##### `conflicts`<sup>Optional</sup> <a name="conflicts" id="projen.python.uvConfig.UvConfiguration.property.conflicts"></a>

```typescript
public readonly conflicts: SchemaConflictItem[][];
```

- *Type:* projen.python.uvConfig.SchemaConflictItem[][]

A list of sets of conflicting groups or extras.

---

##### `constraintDependencies`<sup>Optional</sup> <a name="constraintDependencies" id="projen.python.uvConfig.UvConfiguration.property.constraintDependencies"></a>

```typescript
public readonly constraintDependencies: string[];
```

- *Type:* string[]

PEP 508-style requirements, e.g., `ruff==0.5.0`, or `ruff @ https://...`.

---

##### `defaultGroups`<sup>Optional</sup> <a name="defaultGroups" id="projen.python.uvConfig.UvConfiguration.property.defaultGroups"></a>

```typescript
public readonly defaultGroups: any;
```

- *Type:* any

The list of `dependency-groups` to install by default.

Can also be the literal `"all"` to default enable all groups.

---

##### `dependencyGroups`<sup>Optional</sup> <a name="dependencyGroups" id="projen.python.uvConfig.UvConfiguration.property.dependencyGroups"></a>

```typescript
public readonly dependencyGroups: {[ key: string ]: DependencyGroupSettings};
```

- *Type:* {[ key: string ]: projen.python.uvConfig.DependencyGroupSettings}

Additional settings for `dependency-groups`.

Currently this can only be used to add `requires-python` constraints
to dependency groups (typically to inform uv that your dev tooling
has a higher python requirement than your actual project).

This cannot be used to define dependency groups, use the top-level
`[dependency-groups]` table for that.

---

##### `dependencyMetadata`<sup>Optional</sup> <a name="dependencyMetadata" id="projen.python.uvConfig.UvConfiguration.property.dependencyMetadata"></a>

```typescript
public readonly dependencyMetadata: StaticMetadata[];
```

- *Type:* projen.python.uvConfig.StaticMetadata[]

Pre-defined static metadata for dependencies of the project (direct or transitive).

When
provided, enables the resolver to use the specified metadata instead of querying the
registry or building the relevant package from source.

Metadata should be provided in adherence with the [Metadata 2.3](https://packaging.python.org/en/latest/specifications/core-metadata/)
standard, though only the following fields are respected:

- `name`: The name of the package.
- (Optional) `version`: The version of the package. If omitted, the metadata will be applied
to all versions of the package.
- (Optional) `requires-dist`: The dependencies of the package (e.g., `werkzeug>=0.14`).
- (Optional) `requires-python`: The Python version required by the package (e.g., `>=3.10`).
- (Optional) `provides-extra`: The extras provided by the package.

---

##### `devDependencies`<sup>Optional</sup> <a name="devDependencies" id="projen.python.uvConfig.UvConfiguration.property.devDependencies"></a>

```typescript
public readonly devDependencies: string[];
```

- *Type:* string[]

PEP 508-style requirements, e.g., `ruff==0.5.0`, or `ruff @ https://...`.

---

##### `environments`<sup>Optional</sup> <a name="environments" id="projen.python.uvConfig.UvConfiguration.property.environments"></a>

```typescript
public readonly environments: string[];
```

- *Type:* string[]

A list of environment markers, e.g., `python_version >= '3.6'`.

---

##### `excludeDependencies`<sup>Optional</sup> <a name="excludeDependencies" id="projen.python.uvConfig.UvConfiguration.property.excludeDependencies"></a>

```typescript
public readonly excludeDependencies: string[];
```

- *Type:* string[]

Package names to exclude, e.g., `werkzeug`, `numpy`.

---

##### `excludeNewer`<sup>Optional</sup> <a name="excludeNewer" id="projen.python.uvConfig.UvConfiguration.property.excludeNewer"></a>

```typescript
public readonly excludeNewer: string;
```

- *Type:* string

Limit candidate packages to those that were uploaded prior to a given point in time.

Accepts a superset of [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339.html) (e.g.,
`2006-12-02T02:07:43Z`). A full timestamp is required to ensure that the resolver will
behave consistently across timezones.

---

##### `excludeNewerPackage`<sup>Optional</sup> <a name="excludeNewerPackage" id="projen.python.uvConfig.UvConfiguration.property.excludeNewerPackage"></a>

```typescript
public readonly excludeNewerPackage: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Limit candidate packages for specific packages to those that were uploaded prior to the given date.

Accepts package-date pairs in a dictionary format.

---

##### `extraBuildDependencies`<sup>Optional</sup> <a name="extraBuildDependencies" id="projen.python.uvConfig.UvConfiguration.property.extraBuildDependencies"></a>

```typescript
public readonly extraBuildDependencies: {[ key: string ]: any[]};
```

- *Type:* {[ key: string ]: any[]}

Additional build dependencies for packages.

This allows extending the PEP 517 build environment for the project's dependencies with
additional packages. This is useful for packages that assume the presence of packages like
`pip`, and do not declare them as build dependencies.

---

##### `extraBuildVariables`<sup>Optional</sup> <a name="extraBuildVariables" id="projen.python.uvConfig.UvConfiguration.property.extraBuildVariables"></a>

```typescript
public readonly extraBuildVariables: {[ key: string ]: {[ key: string ]: string}};
```

- *Type:* {[ key: string ]: {[ key: string ]: string}}

Extra environment variables to set when building certain packages.

Environment variables will be added to the environment when building the
specified packages.

---

##### `extraIndexUrl`<sup>Optional</sup> <a name="extraIndexUrl" id="projen.python.uvConfig.UvConfiguration.property.extraIndexUrl"></a>

```typescript
public readonly extraIndexUrl: string[];
```

- *Type:* string[]

Extra URLs of package indexes to use, in addition to `--index-url`.

Accepts either a repository compliant with [PEP 503](https://peps.python.org/pep-0503/)
(the simple repository API), or a local directory laid out in the same format.

All indexes provided via this flag take priority over the index specified by
[`index_url`](#index-url) or [`index`](#index) with `default = true`. When multiple indexes
are provided, earlier values take priority.

To control uv's resolution strategy when multiple indexes are present, see
[`index_strategy`](#index-strategy).

(Deprecated: use `index` instead.)

---

##### `findLinks`<sup>Optional</sup> <a name="findLinks" id="projen.python.uvConfig.UvConfiguration.property.findLinks"></a>

```typescript
public readonly findLinks: string[];
```

- *Type:* string[]

Locations to search for candidate distributions, in addition to those found in the registry indexes.

If a path, the target must be a directory that contains packages as wheel files (`.whl`) or
source distributions (e.g., `.tar.gz` or `.zip`) at the top level.

If a URL, the page must contain a flat list of links to package files adhering to the
formats described above.

---

##### `forkStrategy`<sup>Optional</sup> <a name="forkStrategy" id="projen.python.uvConfig.UvConfiguration.property.forkStrategy"></a>

```typescript
public readonly forkStrategy: string;
```

- *Type:* string

The strategy to use when selecting multiple versions of a given package across Python versions and platforms.

By default, uv will optimize for selecting the latest version of each package for each
supported Python version (`requires-python`), while minimizing the number of selected
versions across platforms.

Under `fewest`, uv will minimize the number of selected versions for each package,
preferring older versions that are compatible with a wider range of supported Python
versions or platforms.

---

##### `index`<sup>Optional</sup> <a name="index" id="projen.python.uvConfig.UvConfiguration.property.index"></a>

```typescript
public readonly index: Index[];
```

- *Type:* projen.python.uvConfig.Index[]

The indexes to use when resolving dependencies.

Accepts either a repository compliant with [PEP 503](https://peps.python.org/pep-0503/)
(the simple repository API), or a local directory laid out in the same format.

Indexes are considered in the order in which they're defined, such that the first-defined
index has the highest priority. Further, the indexes provided by this setting are given
higher priority than any indexes specified via [`index_url`](#index-url) or
[`extra_index_url`](#extra-index-url). uv will only consider the first index that contains
a given package, unless an alternative [index strategy](#index-strategy) is specified.

If an index is marked as `explicit = true`, it will be used exclusively for the
dependencies that select it explicitly via `[tool.uv.sources]`, as in:

```toml
[[tool.uv.index]]
name = "pytorch"
url = "https://download.pytorch.org/whl/cu121"
explicit = true

[tool.uv.sources]
torch = { index = "pytorch" }
```

If an index is marked as `default = true`, it will be moved to the end of the prioritized list, such that it is
given the lowest priority when resolving packages. Additionally, marking an index as default will disable the
PyPI default index.

---

##### `indexStrategy`<sup>Optional</sup> <a name="indexStrategy" id="projen.python.uvConfig.UvConfiguration.property.indexStrategy"></a>

```typescript
public readonly indexStrategy: string;
```

- *Type:* string

The strategy to use when resolving against multiple index URLs.

By default, uv will stop at the first index on which a given package is available, and
limit resolutions to those present on that first index (`first-index`). This prevents
"dependency confusion" attacks, whereby an attacker can upload a malicious package under the
same name to an alternate index.

---

##### `indexUrl`<sup>Optional</sup> <a name="indexUrl" id="projen.python.uvConfig.UvConfiguration.property.indexUrl"></a>

```typescript
public readonly indexUrl: string;
```

- *Type:* string

The URL of the Python package index (by default: <https://pypi.org/simple>).

Accepts either a repository compliant with [PEP 503](https://peps.python.org/pep-0503/)
(the simple repository API), or a local directory laid out in the same format.

The index provided by this setting is given lower priority than any indexes specified via
[`extra_index_url`](#extra-index-url) or [`index`](#index).

(Deprecated: use `index` instead.)

---

##### `keyringProvider`<sup>Optional</sup> <a name="keyringProvider" id="projen.python.uvConfig.UvConfiguration.property.keyringProvider"></a>

```typescript
public readonly keyringProvider: string;
```

- *Type:* string

Attempt to use `keyring` for authentication for index URLs.

At present, only `--keyring-provider subprocess` is supported, which configures uv to
use the `keyring` CLI to handle authentication.

---

##### `linkMode`<sup>Optional</sup> <a name="linkMode" id="projen.python.uvConfig.UvConfiguration.property.linkMode"></a>

```typescript
public readonly linkMode: string;
```

- *Type:* string
- *Default:* clone` (also known as Copy-on-Write) on macOS, and `hardlink` on Linux and

The method to use when installing packages from the global cache.

Defaults to `clone` (also known as Copy-on-Write) on macOS, and `hardlink` on Linux and
Windows.

WARNING: The use of symlink link mode is discouraged, as they create tight coupling between
the cache and the target environment. For example, clearing the cache (`uv cache clean`)
will break all installed packages by way of removing the underlying source files. Use
symlinks with caution.

---

##### `managed`<sup>Optional</sup> <a name="managed" id="projen.python.uvConfig.UvConfiguration.property.managed"></a>

```typescript
public readonly managed: boolean;
```

- *Type:* boolean

Whether the project is managed by uv.

If `false`, uv will ignore the project when
`uv run` is invoked.

---

##### `nativeTls`<sup>Optional</sup> <a name="nativeTls" id="projen.python.uvConfig.UvConfiguration.property.nativeTls"></a>

```typescript
public readonly nativeTls: boolean;
```

- *Type:* boolean

Whether to load TLS certificates from the platform's native certificate store.

By default, uv loads certificates from the bundled `webpki-roots` crate. The
`webpki-roots` are a reliable set of trust roots from Mozilla, and including them in uv
improves portability and performance (especially on macOS).

However, in some cases, you may want to use the platform's native certificate store,
especially if you're relying on a corporate trust root (e.g., for a mandatory proxy) that's
included in your system's certificate store.

---

##### `noBinary`<sup>Optional</sup> <a name="noBinary" id="projen.python.uvConfig.UvConfiguration.property.noBinary"></a>

```typescript
public readonly noBinary: boolean;
```

- *Type:* boolean

Don't install pre-built wheels.

The given packages will be built and installed from source. The resolver will still use
pre-built wheels to extract package metadata, if available.

---

##### `noBinaryPackage`<sup>Optional</sup> <a name="noBinaryPackage" id="projen.python.uvConfig.UvConfiguration.property.noBinaryPackage"></a>

```typescript
public readonly noBinaryPackage: string[];
```

- *Type:* string[]

Don't install pre-built wheels for a specific package.

---

##### `noBuild`<sup>Optional</sup> <a name="noBuild" id="projen.python.uvConfig.UvConfiguration.property.noBuild"></a>

```typescript
public readonly noBuild: boolean;
```

- *Type:* boolean

Don't build source distributions.

When enabled, resolving will not run arbitrary Python code. The cached wheels of
already-built source distributions will be reused, but operations that require building
distributions will exit with an error.

---

##### `noBuildIsolation`<sup>Optional</sup> <a name="noBuildIsolation" id="projen.python.uvConfig.UvConfiguration.property.noBuildIsolation"></a>

```typescript
public readonly noBuildIsolation: boolean;
```

- *Type:* boolean

Disable isolation when building source distributions.

Assumes that build dependencies specified by [PEP 518](https://peps.python.org/pep-0518/)
are already installed.

---

##### `noBuildIsolationPackage`<sup>Optional</sup> <a name="noBuildIsolationPackage" id="projen.python.uvConfig.UvConfiguration.property.noBuildIsolationPackage"></a>

```typescript
public readonly noBuildIsolationPackage: string[];
```

- *Type:* string[]

Disable isolation when building source distributions for a specific package.

Assumes that the packages' build dependencies specified by [PEP 518](https://peps.python.org/pep-0518/)
are already installed.

---

##### `noBuildPackage`<sup>Optional</sup> <a name="noBuildPackage" id="projen.python.uvConfig.UvConfiguration.property.noBuildPackage"></a>

```typescript
public readonly noBuildPackage: string[];
```

- *Type:* string[]

Don't build source distributions for a specific package.

---

##### `noCache`<sup>Optional</sup> <a name="noCache" id="projen.python.uvConfig.UvConfiguration.property.noCache"></a>

```typescript
public readonly noCache: boolean;
```

- *Type:* boolean

Avoid reading from or writing to the cache, instead using a temporary directory for the duration of the operation.

---

##### `noIndex`<sup>Optional</sup> <a name="noIndex" id="projen.python.uvConfig.UvConfiguration.property.noIndex"></a>

```typescript
public readonly noIndex: boolean;
```

- *Type:* boolean

Ignore all registry indexes (e.g., PyPI), instead relying on direct URL dependencies and those provided via `--find-links`.

---

##### `noSources`<sup>Optional</sup> <a name="noSources" id="projen.python.uvConfig.UvConfiguration.property.noSources"></a>

```typescript
public readonly noSources: boolean;
```

- *Type:* boolean

Ignore the `tool.uv.sources` table when resolving dependencies. Used to lock against the standards-compliant, publishable package metadata, as opposed to using any local or Git sources.

---

##### `offline`<sup>Optional</sup> <a name="offline" id="projen.python.uvConfig.UvConfiguration.property.offline"></a>

```typescript
public readonly offline: boolean;
```

- *Type:* boolean

Disable network access, relying only on locally cached data and locally available files.

---

##### `overrideDependencies`<sup>Optional</sup> <a name="overrideDependencies" id="projen.python.uvConfig.UvConfiguration.property.overrideDependencies"></a>

```typescript
public readonly overrideDependencies: string[];
```

- *Type:* string[]

PEP 508-style requirements, e.g., `ruff==0.5.0`, or `ruff @ https://...`.

---

##### `package`<sup>Optional</sup> <a name="package" id="projen.python.uvConfig.UvConfiguration.property.package"></a>

```typescript
public readonly package: boolean;
```

- *Type:* boolean

Whether the project should be considered a Python package, or a non-package ("virtual") project.

Packages are built and installed into the virtual environment in editable mode and thus
require a build backend, while virtual projects are _not_ built or installed; instead, only
their dependencies are included in the virtual environment.

Creating a package requires that a `build-system` is present in the `pyproject.toml`, and
that the project adheres to a structure that adheres to the build backend's expectations
(e.g., a `src` layout).

---

##### `pip`<sup>Optional</sup> <a name="pip" id="projen.python.uvConfig.UvConfiguration.property.pip"></a>

```typescript
public readonly pip: PipOptions;
```

- *Type:* projen.python.uvConfig.PipOptions

---

##### `prerelease`<sup>Optional</sup> <a name="prerelease" id="projen.python.uvConfig.UvConfiguration.property.prerelease"></a>

```typescript
public readonly prerelease: string;
```

- *Type:* string

The strategy to use when considering pre-release versions.

By default, uv will accept pre-releases for packages that _only_ publish pre-releases,
along with first-party requirements that contain an explicit pre-release marker in the
declared specifiers (`if-necessary-or-explicit`).

---

##### `preview`<sup>Optional</sup> <a name="preview" id="projen.python.uvConfig.UvConfiguration.property.preview"></a>

```typescript
public readonly preview: boolean;
```

- *Type:* boolean

Whether to enable experimental, preview features.

---

##### `publishUrl`<sup>Optional</sup> <a name="publishUrl" id="projen.python.uvConfig.UvConfiguration.property.publishUrl"></a>

```typescript
public readonly publishUrl: string;
```

- *Type:* string

The URL for publishing packages to the Python package index (by default: <https://upload.pypi.org/legacy/>).

---

##### `pypyInstallMirror`<sup>Optional</sup> <a name="pypyInstallMirror" id="projen.python.uvConfig.UvConfiguration.property.pypyInstallMirror"></a>

```typescript
public readonly pypyInstallMirror: string;
```

- *Type:* string

Mirror URL to use for downloading managed PyPy installations.

By default, managed PyPy installations are downloaded from [downloads.python.org](https://downloads.python.org/).
This variable can be set to a mirror URL to use a different source for PyPy installations.
The provided URL will replace `https://downloads.python.org/pypy` in, e.g., `https://downloads.python.org/pypy/pypy3.8-v7.3.7-osx64.tar.bz2`.

Distributions can be read from a
local directory by using the `file://` URL scheme.

---

##### `pythonDownloads`<sup>Optional</sup> <a name="pythonDownloads" id="projen.python.uvConfig.UvConfiguration.property.pythonDownloads"></a>

```typescript
public readonly pythonDownloads: string;
```

- *Type:* string

Whether to allow Python downloads.

---

##### `pythonDownloadsJsonUrl`<sup>Optional</sup> <a name="pythonDownloadsJsonUrl" id="projen.python.uvConfig.UvConfiguration.property.pythonDownloadsJsonUrl"></a>

```typescript
public readonly pythonDownloadsJsonUrl: string;
```

- *Type:* string

URL pointing to JSON of custom Python installations.

Note that currently, only local paths are supported.

---

##### `pythonInstallMirror`<sup>Optional</sup> <a name="pythonInstallMirror" id="projen.python.uvConfig.UvConfiguration.property.pythonInstallMirror"></a>

```typescript
public readonly pythonInstallMirror: string;
```

- *Type:* string

Mirror URL for downloading managed Python installations.

By default, managed Python installations are downloaded from [`python-build-standalone`](https://github.com/astral-sh/python-build-standalone).
This variable can be set to a mirror URL to use a different source for Python installations.
The provided URL will replace `https://github.com/astral-sh/python-build-standalone/releases/download` in, e.g., `https://github.com/astral-sh/python-build-standalone/releases/download/20240713/cpython-3.12.4%2B20240713-aarch64-apple-darwin-install_only.tar.gz`.

Distributions can be read from a local directory by using the `file://` URL scheme.

---

##### `pythonPreference`<sup>Optional</sup> <a name="pythonPreference" id="projen.python.uvConfig.UvConfiguration.property.pythonPreference"></a>

```typescript
public readonly pythonPreference: string;
```

- *Type:* string

Whether to prefer using Python installations that are already present on the system, or those that are downloaded and installed by uv.

---

##### `reinstall`<sup>Optional</sup> <a name="reinstall" id="projen.python.uvConfig.UvConfiguration.property.reinstall"></a>

```typescript
public readonly reinstall: boolean;
```

- *Type:* boolean

Reinstall all packages, regardless of whether they're already installed.

Implies `refresh`.

---

##### `reinstallPackage`<sup>Optional</sup> <a name="reinstallPackage" id="projen.python.uvConfig.UvConfiguration.property.reinstallPackage"></a>

```typescript
public readonly reinstallPackage: string[];
```

- *Type:* string[]

Reinstall a specific package, regardless of whether it's already installed.

Implies
`refresh-package`.

---

##### `requiredEnvironments`<sup>Optional</sup> <a name="requiredEnvironments" id="projen.python.uvConfig.UvConfiguration.property.requiredEnvironments"></a>

```typescript
public readonly requiredEnvironments: string[];
```

- *Type:* string[]

A list of environment markers, e.g., `sys_platform == 'darwin'.

---

##### `requiredVersion`<sup>Optional</sup> <a name="requiredVersion" id="projen.python.uvConfig.UvConfiguration.property.requiredVersion"></a>

```typescript
public readonly requiredVersion: string;
```

- *Type:* string

Enforce a requirement on the version of uv.

If the version of uv does not meet the requirement at runtime, uv will exit
with an error.

Accepts a [PEP 440](https://peps.python.org/pep-0440/) specifier, like `==0.5.0` or `>=0.5.0`.

---

##### `resolution`<sup>Optional</sup> <a name="resolution" id="projen.python.uvConfig.UvConfiguration.property.resolution"></a>

```typescript
public readonly resolution: string;
```

- *Type:* string

The strategy to use when selecting between the different compatible versions for a given package requirement.

By default, uv will use the latest compatible version of each package (`highest`).

---

##### `sources`<sup>Optional</sup> <a name="sources" id="projen.python.uvConfig.UvConfiguration.property.sources"></a>

```typescript
public readonly sources: {[ key: string ]: any[]};
```

- *Type:* {[ key: string ]: any[]}

The sources to use when resolving dependencies.

`tool.uv.sources` enriches the dependency metadata with additional sources, incorporated
during development. A dependency source can be a Git repository, a URL, a local path, or an
alternative registry.

See [Dependencies](https://docs.astral.sh/uv/concepts/projects/dependencies/) for more.

---

##### `trustedPublishing`<sup>Optional</sup> <a name="trustedPublishing" id="projen.python.uvConfig.UvConfiguration.property.trustedPublishing"></a>

```typescript
public readonly trustedPublishing: TrustedPublishing;
```

- *Type:* projen.python.uvConfig.TrustedPublishing

Configure trusted publishing.

By default, uv checks for trusted publishing when running in a supported environment, but
ignores it if it isn't configured.

uv's supported environments for trusted publishing include GitHub Actions and GitLab CI/CD.

---

##### `upgrade`<sup>Optional</sup> <a name="upgrade" id="projen.python.uvConfig.UvConfiguration.property.upgrade"></a>

```typescript
public readonly upgrade: boolean;
```

- *Type:* boolean

Allow package upgrades, ignoring pinned versions in any existing output file.

---

##### `upgradePackage`<sup>Optional</sup> <a name="upgradePackage" id="projen.python.uvConfig.UvConfiguration.property.upgradePackage"></a>

```typescript
public readonly upgradePackage: string[];
```

- *Type:* string[]

Allow upgrades for a specific package, ignoring pinned versions in any existing output file.

Accepts both standalone package names (`ruff`) and version specifiers (`ruff<0.5.0`).

---

##### `workspace`<sup>Optional</sup> <a name="workspace" id="projen.python.uvConfig.UvConfiguration.property.workspace"></a>

```typescript
public readonly workspace: ToolUvWorkspace;
```

- *Type:* projen.python.uvConfig.ToolUvWorkspace

The workspace definition for the project, if any.

---

### WheelDataIncludes <a name="WheelDataIncludes" id="projen.python.uvConfig.WheelDataIncludes"></a>

Data includes for wheels.

See `BuildBackendSettings::data`.

#### Initializer <a name="Initializer" id="projen.python.uvConfig.WheelDataIncludes.Initializer"></a>

```typescript
import { python } from 'projen'

const wheelDataIncludes: python.uvConfig.WheelDataIncludes = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.python.uvConfig.WheelDataIncludes.property.data">data</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.uvConfig.WheelDataIncludes.property.headers">headers</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.uvConfig.WheelDataIncludes.property.platlib">platlib</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.uvConfig.WheelDataIncludes.property.purelib">purelib</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.python.uvConfig.WheelDataIncludes.property.scripts">scripts</a></code> | <code>string</code> | *No description.* |

---

##### `data`<sup>Optional</sup> <a name="data" id="projen.python.uvConfig.WheelDataIncludes.property.data"></a>

```typescript
public readonly data: string;
```

- *Type:* string

---

##### `headers`<sup>Optional</sup> <a name="headers" id="projen.python.uvConfig.WheelDataIncludes.property.headers"></a>

```typescript
public readonly headers: string;
```

- *Type:* string

---

##### `platlib`<sup>Optional</sup> <a name="platlib" id="projen.python.uvConfig.WheelDataIncludes.property.platlib"></a>

```typescript
public readonly platlib: string;
```

- *Type:* string

---

##### `purelib`<sup>Optional</sup> <a name="purelib" id="projen.python.uvConfig.WheelDataIncludes.property.purelib"></a>

```typescript
public readonly purelib: string;
```

- *Type:* string

---

##### `scripts`<sup>Optional</sup> <a name="scripts" id="projen.python.uvConfig.WheelDataIncludes.property.scripts"></a>

```typescript
public readonly scripts: string;
```

- *Type:* string

---



## Enums <a name="Enums" id="Enums"></a>

### TrustedPublishing <a name="TrustedPublishing" id="projen.python.uvConfig.TrustedPublishing"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.python.uvConfig.TrustedPublishing.ALWAYS">ALWAYS</a></code> | always. |
| <code><a href="#projen.python.uvConfig.TrustedPublishing.NEVER">NEVER</a></code> | never. |

---

##### `ALWAYS` <a name="ALWAYS" id="projen.python.uvConfig.TrustedPublishing.ALWAYS"></a>

always.

---


##### `NEVER` <a name="NEVER" id="projen.python.uvConfig.TrustedPublishing.NEVER"></a>

never.

---

