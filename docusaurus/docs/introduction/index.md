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

### Project types

Projen ships with a number of different project types, and you can build your own. 

