---
sidebar_position: 1
---

# Introduction

Welcome to the projen documentation! This page introduces projen and why you should use it.

## You will learn

- What is the purpose of projen
- What kind of projects can be created with projen

## What is projen?

Projen allows you to define and maintain complex project configuration through code. It lets you generate, or synthesize
project configuration files from a well-typed definition. These definitions can be written in any
[jsii](https://github.com/aws/jsii)-compatible language. For example, you can define a projen project in TypeScript
and synthesize a `package.json` file, a `tsconfig.json` file, a `.gitignore` file, a GitHub workflow file and more.
Projen can be used with TypeScript, Python, Java and Golang.

Whether you're a single developer or working on large scale teams, projen is designed to let you seamlessly
manage project configurations by independent people, teams, and organizations. You do this all through code. As your
project grows, you can easily add new configuration files and workflows to your project.

It's important to understand that projen is not a one-off scaffolding tool or template generator. Any time you make
a change, you'll apply those changes in your strongly-typed classes. The generated, or synthesized, files should never
be manually edited (in fact, projen enforces that). Apply your changes by executing the projen cli.

Many organizations require consistency across their code repositories. With projen, you can define a
custom project type, which is a pre-defined template that allows organizations to build consistent,
repeatable project templates across their source code repositories. It's possible to update configuration files and
CI/CD workflows across dozens (or hundreds!?) of projects.

Check out [this talk](https://youtu.be/SOWMPzXtTCw) about projen from its creator.

## What kind of projects can be created with projen?

Projen ships with a number of different project types. Currently, there are:

### AWS CDK

- awscdk-app-java - AWS CDK app in Java.
- awscdk-app-py - AWS CDK app in Python.
- awscdk-app-ts - AWS CDK app in TypeScript.
- awscdk-construct - AWS CDK construct library project.

### cdk8s

- cdk8s-app-py - CDK8s app in Python.
- cdk8s-app-ts - CDK8s app in TypeScript.
- cdk8s-construct - CDK8s construct library project.

### CDK for Terraform

- cdktf-construct - CDKTF construct library project.

### Java

- java - Java project.

### Node.js & TypeScript

- node - Node.js project.
- typescript - TypeScript project.
- typescript-app - TypeScript app.

### Python

- python - Python project.

### Web

- nextjs - Next.js project using JavaScript.
- nextjs-ts - Next.js project using TypeScript.
- react - React project using JavaScript.
- react-ts - React project using TypeScript.

### Other

- jsii - Multi-language jsii library project.
- project - Base project.

Projen's goal is to help your teams manage projects efficiently. In addition to the starter projects listed above,
it's recommended that you extend these projects to create your own. This allows you to define your own project types
that are specific to your organization.
See [Building your own project type](/docs/concepts/projects/building-your-own) for more information.
