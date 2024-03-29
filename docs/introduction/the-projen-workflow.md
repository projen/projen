---
sidebar_position: 2
---

# The Projen Workflow

The projen workflow is very simple:

1. Initialize a project type using the cli (`npx projen new`).
2. Edit configuration in the .projenrc(.ts/.js/.py/.json) file.
3. Run `npx projen` to apply changes.

## Initializing a project

Running `npx projen new` will initialize the current directory with the new project type specified.
If the directory is empty, then the files under control by the project type will be created and
the git repository will be initialized with a baseline commit.

:::warning
projen allows you to "take over" an existing project. 
A directory does NOT need to be empty to run the `npx projen new` command and start a new project.
However, it will overwrite any existing files that are managed by projen. 
Make sure you have all your changes committed before running `npx projen new`.

Once you do this, a new git commit will be in your history that shows you all the changes that were made.
:::

If the directory is not empty, it will overwrite the contents of any files it assumes under its control.

Files that are managed by projen are marked as read-only on the file system and should not be edited directly.
These files also get a header that indicates that they are managed by projen. For example:

```text
# ~~ Generated by projen. To modify, edit .projenrc.js and run "npx projen".
```

## Editing configuration

Over the life of your project you will make changes to the projen configuration by editing the .projenrc(.ts/.js/.py/.json) file. This is just referred to as the 'RC' file. 
It stores all the configuration and components that define your project. 
Anytime you need to make changes to a file controlled by projen, you will do it by editing this file and 
never by editing the file directly.

## Applying changes

After making changes, you will run `npx projen` to apply the changes. 
projen will then re-read the RC file and modify any of the files under its control to match the new configuration.
