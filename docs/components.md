# Components

Components are building blocks that can be composed together into projects. They
represent a self-contained project feature.

When a component is created, it is associated with a specific project:

```ts
const p = new Project(...);

new MyComponent(p);
new YourComponent(p, { /* options */ });
```

Projects can be queried for which components have been added to them:

```ts
for (const c of p.components) {
  // do something with `component`
}
```

Since components can be added at different stages of initialization,
you can also use a subscription API which will be called for all components
of a project just before the project is synthesized:

```ts
p.forEachComponent({ do: component => {
  // do something with `component`
}});
```

Each subscriber callback will be invoked for _all_ components that have been
added to the project, giving it an opportunity to react.

> This is a simple dependency injection programming model.
