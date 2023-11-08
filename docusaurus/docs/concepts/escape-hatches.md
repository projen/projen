---
sidebar_position: 5
---

# Escape hatches

It's possible projen doesn't have the right high-level or low-level APIs that
you need for managing your project configuration. If you think there's an API
that would be useful, first consider checking on GitHub to see if anyone else
has the same problem, or consider opening an issue! But in the meantime, there
are ways you can bypass projen's regular APIs to add special configuration code.

## Overrides

For any "object"-based files, such as JSON, YAML, TOML, or XML, you can
override properties through the `addOverride`, `addDeletionOverride`,
`addToArray` and `patch` methods accessible on file objects:

```ts
// Get the ObjectFile
const packageJson = project.tryFindObjectFile('package.json');

// Use dot notation to address inside the object
packageJson.addOverride('description', 'the next generation of logging!');
packageJson.addOverride('keywords', ['experimental', 'web', 'productivity', 'exciting']);
packageJson.addDeletionOverride('author.organization');
packageJson.addToArray('keywords', 'logging', 'next-gen');
packageJson.patch(JsonPatch.add('/author/name','A. Mused'));

// Use array indices to override specific array elements
packageJson.addOverride('bundledDependencies.3', 'react');
```

## Removing files

You can remove a file from the project through `tryRemoveFile` method on the
`Project` class.

```ts
new TextFile(project, "hello.txt", { lines: "original" });

project.tryRemoveFile("hello.txt");

new TextFile(project, "hello.txt", { lines: "better" });
```

> Note: It's recommended that this used carefully since removing files may be
unexpected for users depending on where it's used. For example, if you created a
component named `MyFancyGitIgnore` and had it remove any existing `.gitignore`
files in the project, then users may be surprised when customizations for their
existing `.gitignore` file are nullified.
