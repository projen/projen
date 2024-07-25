---
sidebar_position: 1
---

# Introduction

Welcome to the projen documentation! This guide will introduce you to projen and explain its purpose and benefits.

## You will learn

- The purpose of projen
- Types of projects you can create with projen

## What is projen?

Projen lets you define and manage complex project configurations through code, generating configuration files from 
well-typed definitions in any [jsii](https://github.com/aws/jsii)-compatible language. For example, you can use TypeScript to define a projen 
project and synthesize files like `package.json`, `tsconfig.json`, `.gitignore`, and GitHub workflow files. Projen 
supports TypeScript, Python, Java, and Golang.

Whether you're a solo developer or part of a large team, projen helps you manage project configurations seamlessly. As 
your project grows, you can easily add new configuration files and workflows.

Unlike traditional scaffolding tools or template generators, projen enforces changes through strongly-typed code. The 
generated files are never manually edited; instead, you update your code and apply changes by running the projen CLI.

Projen ensures consistency across multiple repositories by allowing you to define custom project types. This enables
organizations to create and maintain uniform project templates across a large number of codebases.

Learn more from the talk, [CDK Day 2020 - Projen... a CDK for Project Generation/Configuration](https://youtu.be/SOWMPzXtTCw) 
by projen's creator.


## What kind of projects can be created with projen?

Projen offers various project types, including:

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

Projen aims to help teams manage projects efficiently. You can extend the starter projects listed above to create 
custom project types tailored to your organization. See [Building your own project type](/docs/concepts/projects/building-your-own) for more information.
