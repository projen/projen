---
sidebar_position: 5
---

# Custom Project Installation

This quick start will help you install a pre-created [custom project](/docs/custom/).
It's not always clear what project type to pass in if the project's README does not explicitly
tell you.

The basic format to install a custom project is as follows:

```shell
npx projen new $PROJECT_TYPE --from $PACKAGE
```

## Project Type

The `$PROJECT_TYPE` is the type of project you want to create. Using projen's default projects
as examples, if you want to create a TypeScript project, you would pass in `typescript`. If
you want to create a Python project, you would pass in `python`.

The name of the project is typically the name of the exported class, minus the suffix `Project`.
For example, if the project's README says to install a `CustomProject` project, you would pass
in `custom` as the `$PROJECT_TYPE`. Projen's CLI is generally very good about identifying
mis-typed `$PROJECT_TYPE`s, so if you get it wrong, it will tell you.

## Package

The `$PACKAGE` is the name of the package that contains the project you want to install. This
parameter supports anything that your installer supports. Examples can be found
[in the npmjs docs](https://docs.npmjs.com/cli/v10/commands/npm-install?v=true). `yarn`, `pnpm`,
and other package managers generally maintain backwards compatibility with `npm`, so you can
use the same syntax.

## Example

Let's look at a specific example. There is a
[custom project for creating CDKTF providers](https://github.com/cdktf/cdktf-provider-project).
To install it, we would use the following command:

```shell
npx projen new cdktf_provider --from @cdktf/provider-project
```

We would infer that it's `cdktfprovider` because the name of the exported class in `src/main.ts`
is `CdkTfProviderProject`. However, when we try installing that, we get an error:

```shell
👾 Project type "cdktfprovider" not found in "@cdktf/provider-project". Found:

    cdktf_provider

Please specify a valid project type.
Example: npx projen new --from @cdktf/provider-project cdktf_provider
```

In this case the error message is very helpful. It tells us the project type and we can easily
adjust. When we execute the correct command, we get the following output:

```shell
❯ npx projen new cdktf_provider --from @cdktf/provider-project
blank@ /Users/defiance/cdktf-provider-project
└── projen@0.75.1

👾 installing external module @cdktf/provider-project...

up to date, audited 89 packages in 399ms

9 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

👾 Cannot create "@cdktf/provider-project.CdktfProviderProject". Missing required options:
    --cdktf-version [string]
    --constructs-version [string]
    --terraform-provider [string]
```

Here the error message is helpful again. There are required options that must be passed in via
the command line. It tells us the options and the syntax to pass them. We can now install the
project with the following command:

```shell
npx projen new cdktf_provider --from @cdktf/provider-project \
--cdktf-version 0.18.0 \
--constructs-version 10.3.0 \
--terraform-provider aws@5.21.0
```

This command will execute successfully.

Why did we have to pass in those options? This project is designed to be built from a
`.projenrc` file first, with those required variables set. When we use the `--from` flag to
initialize the project, those required variables must be passed in via the command line instead
of the `.projenrc` file.
