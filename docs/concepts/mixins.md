---
sidebar_position: 2
---

# Mixins

## What are mixins?

Mixins are reusable pieces of functionality that can be applied to constructs without inheritance.
They implement the `IMixin` interface from [constructs](https://github.com/aws/constructs) and are applied using the `.with()` method available on all constructs.

While [components](./components.md) are constructs that live in the construct tree and participate in the synthesis lifecycle, mixins are standalone objects that modify existing constructs in place.
This makes them ideal for adding capabilities to projects you don't control the class hierarchy of.

## When to use mixins vs components

Use a **component** when you need to:

- Add new files to a project
- Participate in the synthesis lifecycle (preSynthesize, synthesize, postSynthesize)
- Be discoverable in the construct tree

Use a **mixin** when you need to:

- Add capabilities to any compatible project without requiring inheritance
- Compose features that work across different project types
- Apply the same functionality in both standalone and monorepo contexts

## The IMixin interface

A mixin implements two methods:

```ts
import { IMixin } from 'constructs';

class MyMixin implements IMixin {
  // Determines which constructs this mixin can be applied to
  supports(construct: IConstruct): boolean { ... }

  // Modifies the construct in place
  applyTo(construct: IConstruct): void { ... }
}
```

## Applying mixins

Use the `.with()` method to apply one or more mixins to a construct:

```ts
project.with(new MyMixin());
```

The `.with()` method walks the construct tree rooted at the target and applies the mixin to every construct where `supports()` returns true.
This means you can apply a mixin to a project and it will also be applied to any child constructs that support it.

Mixins that don't support a construct are silently skipped.

## Creating custom mixins

Here's an example mixin that adds a standard linting configuration to any Node.js project:

```ts
import type { IConstruct } from 'constructs';
import type { IMixin } from 'constructs';
import { NodeProject } from 'projen/lib/javascript';

class StandardLinting implements IMixin {
  supports(construct: IConstruct): boolean {
    return construct instanceof NodeProject;
  }

  applyTo(construct: IConstruct): void {
    const project = construct as NodeProject;
    project.addDevDeps('eslint@^9', 'prettier');
    project.addTask('lint', { exec: 'eslint .' });
  }
}
```

Apply it to any Node.js project:

```ts
project.with(new StandardLinting());
```
