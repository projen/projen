---
sidebar_position: 4
---

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
