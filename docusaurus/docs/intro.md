---
sidebar_position: 1
---

# Introduction

_projen_ synthesizes project configuration files such as `package.json`,
`tsconfig.json`, `.gitignore`, GitHub Workflows, eslint, jest, etc. from a
well-typed definition written in JavaScript.

_projen_ is NOT exclusively for JavaScript/TypeScript projects - it can be used for any number of languages and project types.
It can also be managed from any jsii-supported language (currently TypeScript, Python, Java, .NET and Golang).

As opposed to existing templating/scaffolding tools, _projen_ is not a one-off
generator. Synthesized files should never be manually edited (in fact, projen
enforces that). To modify your project setup, users interact with rich
strongly-typed class and execute `projen` to update their project configuration
files.

By defining a custom project type and using projen in multiple repositories, it's
possible to update configuration files and CI/CD workflows across dozens (or
hundreds!?) of projects.

Check out [this talk](https://youtu.be/SOWMPzXtTCw) about projen from its creator.

## Getting Started

_projen_ doesn't need to be installed. You will be using [npx](https://docs.npmjs.com/cli/v7/commands/npx) to run _projen_ which takes care of all required setup steps.

To create a new project, run the following command and follow the instructions:

```console
$ mkdir my-project
$ cd my-project
$ npx projen new PROJECT-TYPE
🤖 Synthesizing project...
...
```

### Project types

Projen ships with a number of different [project types](docs/category/project-types) and you can build your own. 

