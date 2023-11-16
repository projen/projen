---
sidebar_position: 5
---


# Escape hatches

It's possible projen doesn't have the right high-level or low-level APIs that
you need for managing your project configuration. If you think there's an API
that would be useful, first consider checking on GitHub to see if anyone else
has the same problem, or consider opening an issue! But in the meantime, there
are ways you can bypass projen's regular APIs to add special configuration code.

## Object File Patches

For any "object"-based files, such as JSON, YAML, TOML, or XML, you can
patch its contents using the JSON Patch standard:

```ts
// Get the ObjectFile
const packageJson = project.tryFindObjectFile('package.json');

// Adds a value to an object or inserts it into an array at a giving position
packageJson.patch(JsonPatch.add('/author/name', 'A. Mused'));
packageJson.patch(JsonPatch.add('/keywords/1', 'web'));
// Use the - character to insert at the end of an array
packageJson.patch(JsonPatch.add('/keywords/-', 'productivity'));


// Removes a value from an object or array
packageJson.patch(JsonPatch.remove('/author'));
packageJson.patch(JsonPatch.remove('/keywords/1'));


// Copy a value from one location in the document to another
packageJson.patch(JsonPatch.copy('/homepage', '/bugs/url'));

// Replace a value. This is equivalent to a remove, followed by an add.
packageJson.patch(JsonPatch.replace('/keywords/1', 'iot'));

// Move a value. This is equivalent to a copy, followed by a remove.
packageJson.patch(JsonPatch.move('/homepage', '/bugs/url'));
```

`ObjectFile.patch()` accepts multiple patch instructions at a time, and each set is considered an atomic operation.
Order matters here: For example you can successfully `add('/foo', 'bar')` and then `remove('/foo')`.
However reversing the order will fail if `/for` does not exists.

### Asserting values

Another feature is asserting values.
This can be used to conditionally set values, or to assert a file is an expected state.
Adding a `test` instruction, will run the checks in the context of the atomic operation they are part of.
By default, atomic operations with failing tests are silently skipped.

```ts
// If the test operation passes, continue to add the new value
// If the test operation fails, all instructions are disregarded
packageJson.patch(
  JsonPatch.test('/author/name', 'A. Noyed'),
  JsonPatch.replace('/author/name', 'A. Mused'),
  JsonPatch.add('/author/email', 'amused@example.com'),
);

// This will run regardless of the outcome previous statement
packageJson.patch(JsonPatch.add('/keywords/-', 'productivity'));
```

In certain situations you might want to fail the whole synthesis:

```ts
// Fails synthesis completely
packageJson.patch(
  JsonPatch.test('/author/name', 'A. Noyed', TestFailureBehavior.FAIL_SYNTHESIS),
);
```

## Overrides

An alternative is to override properties through the `addOverride`, `addDeletionOverride`,
`addToArray` and `patch` methods accessible on the file component:

```ts
// Get the ObjectFile
const packageJson = project.tryFindObjectFile('package.json');

// Use dot notation to address inside the object
packageJson.addOverride('description', 'the next generation of logging!');
packageJson.addOverride('keywords', ['experimental', 'web', 'productivity', 'exciting']);

// Use one-based array indices to override specific array elements
packageJson.addOverride('funding.2.type', 'individual');

// New elements can be added to the end of an array
packageJson.addToArray('keywords', 'logging', 'next-gen');

// Values can be deleted
packageJson.addDeletionOverride('author.organization');
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
