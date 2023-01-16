# Python Projects

Before creating a new project, make sure you have the version of Python you want
to use set up in your terminal. Running `which python` on UNIX/macOS or
`Get-Command python` on Windows should print the path to the python version you
want to use.

To create a new Python project, use `projen new python`:

```shell
$ projen new python --name=my-project
```

This will synthesize a standard project directory structure with some sample
code.

```shell
├── my_project
│   ├── __init__.py
│   ├── __main__.py
│   └── example.py
└── tests
    ├── __init__.py
    └── test_example.py
```

The default options will setup a Python environment using `venv`, and will
create a `requirements.txt` file for installing dependencies via `pip`.

The `projen new` command will also generate a `.projenrc.py` file which includes
the definition of your project with any options you specified in the command
line:

```python
from projen.python import PythonProject

project = PythonProject(
    author_email="Author email",
    author_name="Author name",
    module_name="your_python_project",
    name="project_name",
    version="0.1.0",
)

project.synth()
```

To modify your project definitions, edit `.projenrc.py` and run `projen` again
to re-synthesize your project. The following sections describe the various features of Python projects.

## Managing environments, dependencies, and packaging

Every Python project must have a component for managing/installing dependencies,
a component for managing the Python virtual environment, and if it is a library,
a component for packaging the library. Some components satisfy multiple
requirements. See the list below:

- pip: dependency manager
- venv: environment manager
- setuptools: packaging manager
- poetry: dependency, environment, and packaging manager
- pipenv (TBD): dependency and environment manager
- conda (TBD): dependency and environment manager

By default, pip, and venv will be used, along with setuptools if the project is a library:

```python
from projen import ProjectType
from projen.python import PythonProject

project = PythonProject(
    ...
    project_type=ProjectType.LIB
)
```

But these can be swapped out as needed by using the provided flags, for example:

```python
from projen.python import PythonProject

project = PythonProject(
    ...
    pip=False,
    venv=False,
    setuptools=False,
    poetry=True
)
```

## Dependencies

Python projects have two types of supported dependencies:

1. Runtime dependencies (or just "dependencies").
2. Development dependencies

You can define dependencies when defining the project itself:

```python
from projen.python import PythonProject

project = PythonProject(
    ...
    deps=[
        'Django@3.1.5',
        'aws-cdk.core',  # implies"@*"
    ],
    dev_deps=[
        'hypothesis@^6.0.3',
    ]
)
```

Or using the APIs:

```python
project.add_dev_dependency('hypothesis@^6.0.3');
```

Notice the syntax for dependencies:

```text
<module>[@version]
```

Where `module` is the module name and `version` is the [semantic version
requirement](https://semver.org) for the dependency. The semver syntax will be
converted to the appropriate dependency manager syntax in synthesized files. For
example, `lib^3.1.0` will be converted to `lib>=3.1.0, <4.0.0` in
`requirements.txt`.

### Poetry Dependencies

When using the `poetry` project type, note the following:

* The `[@version]` part of the dependency declaration must be present for all dependencies
* Dependencies that require additional metadata regarding extras etc. may be declared as
  follows:

  ```text
  deps: [
    ...
    "mypackage@{version = '^3.3.3', extras = ['mypackage-extra']}",
  ],
  ```

## Unit Testing with Pytest

The `Pytest` component adds support for writing Python tests with
[pytest](https://pytest.org/). The component will add the required test
dependencies to your project.

Test sources are placed under `tests` and can be executed via `projen test`.

To disable pytest tests, set `pytest: false` when you define the
`PythonProject`.

## `projenrc.py`

## Packaging and Publishing

Python projects can be packaged by using either the `Setuptools` or `Poetry`
component. `Setuptools` records package metadata within a traditional `setup.py`
script, while `Poetry` stores metadata in the more-recent `pyproject.toml` file
format as introduced in PEP 518.

Run `projen package` to generate a source distribution and wheel, and run
`projen upload` to upload the package to PyPI.
