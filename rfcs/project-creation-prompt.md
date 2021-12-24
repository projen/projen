# Project Creation Prompts

> **Author**: [@MarkMcCulloh](https://github.com/MarkMcCulloh), **Status**: Draft

When hearing about projen for the first time, the typical comparisons one may think of are tools such as `yeoman` or the various projects making use of `npm init`.
Obviously the underlying methodology of projen is quite different, but there is a great UX feature these other tools typically employ that projen can make use of: Guided prompts. This allows users to create a project from an opinionated set of options with friendly guidance. This is especially useful in scenarios where the project requires a value that has no reasonable default (and thus could not be created with projen as it is now without it being provided as a CLI arg).

## Details

### Prompt library to use

[Prompts](https://github.com/terkelg/prompts) is an extremely common library for CLI-based prompts. It's relatively small and has very few dependencies.

### Project type prompt

A user should be prompted to select a project type to create. This should be prompted during `projen new` when:

- A project id has not been specified
- There is more than one project type available

Currently projen will exit and show the user the help menu. Instead, it should show the user a list of available projects to choose from in the current context. After choosing a project, projen can continue is it normally would have if the user has provided it during the original invocation. 

[autocomplete](https://github.com/terkelg/prompts#autocompletemessage-choices-initial-suggest-limit-style) would be a good input type for this as it has a filtering feature.

### Project option prompts

After a project type has been selected, the user can be shown a list of featured options to set interactively. For a project option to be available as a prompt during `projen new`:
- `@featured` tag in property docstring
- Must be able to be set via CLI arg (is a primitive or enum)
- Must not have already been provided as a CLI arg

By default, `projen new` will not show prompts unless the `--prompt` flag is provided. 
There is one exception: If a project option meets the above criteria but is also:
- Non-nullable
- Not already provided as a CLI arg

### Prompt format

By default, values sent to the `prompts` library will be derived by the information in the JSII. For example, enums should have their choices populated automatically. 

In case the default logic is insufficient,  `@prompt...` doc tags can be added to override the default. See below for reference.

#### Docstring tag reference

- `@featured` - Functions as it did before, but now also signifies that this option is prompt-able
- `@promptType` - See https://github.com/terkelg/prompts#-types
- `@promptMessage` - See https://github.com/terkelg/prompts#message
- `@promptInitial` - See https://github.com/terkelg/prompts#initial
- `@promptChoices` - Comma-separated list of choices for this option 

## Testing

`prompts` [provides a utility](https://github.com/terkelg/prompts#injectvalues) for injecting responses to prompts. This can be used for testing this functionality without any interaction.

## Documentation

Usage of `--prompt` should be mentioned in the README. Documentation on specifics of this feature should be added into `/docs`.

## Proposed implementation phases

To keep the implementation PRs small-ish:

1. Add `--prompt` flag to `projen new` that shows basic `text` prompts for `@featured` options
1. Show certain option prompts even when `--prompt` is not supplied (see above)
1. Add project type prompts
1. Derive specific option prompts (text, number, select, etc.) from JSII type info and `@prompt...` overrides