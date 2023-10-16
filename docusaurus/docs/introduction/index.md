---
sidebar_position: 1
---

# Introduction

projen synthesizes project configuration files such as `package.json`,
`tsconfig.json`, `.gitignore`, GitHub Workflows, eslint, jest, etc. from a
well-typed definition written in any [jsii](https://github.com/aws/jsii)-compatible language.

projen is NOT exclusively for JavaScript/TypeScript projects - it can be used for any number of languages and project types.
It can also be managed from any jsii-supported language (currently TypeScript, Python, Java, .NET and Golang).

As opposed to existing templating/scaffolding tools, projen is not a one-off
generator. Synthesized files should never be manually edited (in fact, projen
enforces that). To modify your project setup, users interact with rich
strongly-typed class and execute the projen cli (`npx projen`) to update their project configuration
files.

By defining a custom project type and using projen in multiple repositories, it's
possible to update configuration files and CI/CD workflows across dozens (or
hundreds!?) of projects.

Check out [this talk](https://youtu.be/SOWMPzXtTCw) about projen from its creator.

### Project types

Projen ships with a number of different project types. Currently, there are:

* awscdk-app-java - AWS CDK app in Java.
* awscdk-app-py - AWS CDK app in Python.
* awscdk-app-ts - AWS CDK app in TypeScript.
* awscdk-construct - AWS CDK construct library project.
* cdk8s-app-py - CDK8s app in Python.
* cdk8s-app-ts - CDK8s app in TypeScript.
* cdk8s-construct - CDK8s construct library project.
* cdktf-construct - CDKTF construct library project.
* java - Java project.
* jsii - Multi-language jsii library project.
* nextjs - Next.js project without TypeScript.
* nextjs-ts - Next.js project with TypeScript.
* node - Node.js project.
* project - Base project.
* python - Python project.
* react - React project without TypeScript.
* react-ts - React project with TypeScript.
* typescript - TypeScript project.
* typescript-app - TypeScript app.

On top of these built-in types, you can (and should) create your own project types. 
See [Building your own project type](/docs/concepts/projects/building-your-own) for more information. 
