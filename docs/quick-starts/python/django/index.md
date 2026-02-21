---
sidebar_position: 2
---

# Create a Django Application

This quick start will help you create a Django application using projen's Python project.

Before creating a new project, make sure you have the version of Python you want
to use set up in your terminal. Running `which python` in bash/zsh/other POSIX shells, or
`Get-Command python` in Powershell, should print the path to the Python version you
want to use.

To create a new Python project, use `projen new python`:

```shell
projen new python --name=my-project
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
line. Now that the project has been created, we want to edit this `.projenrc.py` file:

```python
from projen.python import PythonProject

project = PythonProject(
    author_email="Author email",
    author_name="Author name",
    module_name="your_python_project",
    name="project_name",
    version="0.1.0",
    # Add Django as a dependency
    deps=["Django"],  # Note that this always installs latest. Pin as needed with @<version>.
    # Add Django-related pytest packages as dev dependencies
    dev_deps=["pytest-django", "pytest-cov", "pytest-mock", "django-debug-toolbar", "django-queryinspect"],
)

project.synth()
```

Run the `projen` command again to re-synthesize your project with the new dependencies. That's it! You now have the libraries you need to get started with your Django application.

For more information on handling packaging, environments, testing, and publishing with projen, [see the Python "hello world" quick start](/docs/quick-starts/python/hello-world).
