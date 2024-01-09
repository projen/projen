---
label: FAQ
---

# FAQ

## How do I remove the license from my project?

Most projects provided by projen have a field called `licensed`, which is set to
`true` by default. This field is used by projen to generate a `LICENSE` file
for your project, defaulting to the Apache-2.0 license. If you are writing
proprietary software and don't want a license file, you can set this field to
`false`:

```ts
const project = new TypeScriptProject({
  licensed: false,
});
```

## What is this .projenrc.json file all about?

For very simple projects that don't need a full `.projenrc` file in a supported language,
a `.projenrc.json` file can be used that contains the same configuration as the other formats.

A usage example can be found for [the skill project for OpenVoiceOS (OVOS), an open source voice assistant](https://github.com/mikejgray/ovos-skill-projen#create-a-new-skill-template). The managed project files can
be updated by running `npx projen`, and the `.projenrc.json` file can be
updated by hand.

:::info
Tasks cannot be defined in `.projenrc.json` files and must be
updated manually.
:::

## How do I specify parameters when I create a project?

projen supports boolean parameters as flags when executing `npx projen new`
commands. For example, to create a new `TypeScriptProject` with the `stale`
option set to `true`, you can run:

```sh
npx projen new typescript --stale
```

String parameters or falsy values can be set as follows:

```sh
npx projen new typescript --mergify=false --authorName="Elad Ben-Israel"
```
