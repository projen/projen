# Escape hatches

It's possible projen doesn't have the right high-level or low-level APIs that
you need for managing your project configuration. If you think there's an API
that would be useful, first consider checking on GitHub to see if anyone else
has the same problem, or consider opening an issue! But in the meantime, there
are ways you can bypass projen's regular APIs to add special configuration code.

## Overrides

For any "object"-based files, such as JSON, YAML, TOML, or XML, you can
override properties through the `addOverride` and `addDeletionOverride` methods
accessible on file objects:

```ts
// Get the ObjectFile
const packageJson = project.tryFindObjectFile('package.json');

// Use dot notation to address inside the object
packageJson.addOverride('description', 'the next generation of logging!');
packageJson.addOverride('keywords', ['experimental', 'web', 'productivity', 'exciting']);
packageJson.addOverride('author.name', 'A. Mused');
packageJson.addDeletionOverride('author.organization');
```
