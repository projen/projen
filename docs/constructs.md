# Constructs

## What are constructs?

Constructs are classes which define a "piece of system state".
Constructs can be composed together to form higher-level building blocks which represent more complex state.
This forms the Construct Programming Model (CPM).
Constructs are also used by other tools such as AWS CDK or CDK for Kubernetes (CDK8s).

In projen, constructs are used to represent the desired state of project configuration.
The lowest-level constructs represent a configuration file.
Files are composed to represent higher-level logical units of configurations, etc.

Projen uses two types of constructs as basic building blocks: Projects & Components.

## Composition

Composition is the key pattern for defining higher-level abstractions through constructs.
A high-level construct can be composed from any number of lower-level constructs.
In turn, those could be composed from even lower-level constructs, which eventually are composed from files.
By composing constructs together, a construct tree is created.

From a bottom-up perspective, you use constructs to organize the individual files required for a project's configuration.
You use whatever abstractions are convenient for your purpose, with as many layers as you need.

Composition lets you define reusable components and share them like any other code.
For example, a team could define a construct that implements best practices for a Python library, with tests, code formatters, type checkers and a standard build workflow.
This construct can be shared with other teams in their organization, or publicly.
When the library is updated, developers will get access to the new version's bug fixes and improvements through the workflows they already have for their other types of code.

## Projects & Components

A *project* represents a software application.
Projects compose any number of *components* to form the project configuration.
Components represent a self-contained project feature.

When a component is created, it is associated with a project by passing a construct as the scope of the component.

When a component is created, a construct is passed as the scope of the component.
The scope can be a project or another component.
The *project of a component* is defined as its closest ancestor in the construct tree, that is of type project.

```ts
const project = new Project(...);

const foo = new MyComponent(project);
const bar = new YourComponent(foo, { /* options */ });
```

The construct tree for this example looks like this.
Both components are part of the same project.

```text
Project
└── MyComponent
    └── YourComponent
```
