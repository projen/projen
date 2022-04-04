<p align="center">
  <a href="https://projen.io">
    <img src="https://raw.githubusercontent.com/projen/projen/main/logo/projen.svg">
    <h3 align="center">projen</h3>
  </a>
</p>

<p align="center">
  Define and maintain complex project configuration through code.
</p>

<p align="center">
  <a href="https://projen.io/"><strong>Documentation</strong></a> ·
  <a href="https://github.com/projen/projen/releases"><strong>Changelog</strong></a> ·
  <a href="#project-types"><strong>Project types</strong></a> ·
  <a href="#community"><strong>Join the community</strong></a>
</p>

<p align="center">
  <a href="https://opensource.org/licenses/Apache-2.0"><img src="https://img.shields.io/badge/License-Apache%202.0-yellowgreen.svg" alt="Apache 2.0 License"></a>
  <a href="https://gitpod.io/#https://github.com/projen/projen"><img src="https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod" alt="Gitpod ready-to-code"></a>
  <a href="https://github.com/projen/projen/actions/workflows/build.yml"><img src="https://github.com/projen/projen/workflows/Build/badge.svg" alt="Build badge"></a>
  <a href="https://github.com/projen/projen/actions/workflows/release.yml"><img src="https://github.com/projen/projen/workflows/Release/badge.svg" alt="Release badge"></a>
  <a href="https://github.com/projen/projen/commits/main"><img src="https://img.shields.io/github/commit-activity/w/projen/projen" alt="Commit activity"></a>
</p>

<br/>

*projen* synthesizes project configuration files such as `package.json`,
`tsconfig.json`, `.gitignore`, GitHub Workflows, eslint, jest, etc from a
well-typed definition written in JavaScript.

As opposed to existing templating/scaffolding tools, *projen* is not a one-off
generator. Synthesized files should never be manually edited (in fact, projen
enforces that). To modify your project setup, users interact with rich
strongly-typed class and execute `projen` to update their project configuration
files.

By defining a custom project type and using projen in multiple repositories, it's
possible to update configuration files and CI/CD workflows across dozens (or
hundreds!?) of projects.

Check out [this talk](https://youtu.be/SOWMPzXtTCw) about projen from its creator.

## Getting Started

To create a new project, run the following command and follow the instructions:

```console
$ mkdir my-project
$ cd my-project
$ git init
$ npx projen new PROJECT-TYPE
🤖 Synthesizing project...
...
```

### Project types

Currently supported project types (use `npx projen new` without a type for a
list):

<!-- <macro exec="node ./scripts/readme-projects.js"> -->
* [awscdk-app-java](https://projen.io/api/API.html#projen-awscdk-awscdkjavaapp) - AWS CDK app in Java.
* [awscdk-app-py](https://projen.io/api/API.html#projen-awscdk-awscdkpythonapp) - AWS CDK app in Python.
* [awscdk-app-ts](https://projen.io/api/API.html#projen-awscdk-awscdktypescriptapp) - AWS CDK app in TypeScript.
* [awscdk-construct](https://projen.io/api/API.html#projen-awscdk-awscdkconstructlibrary) - AWS CDK construct library project.
* [cdk8s-app-ts](https://projen.io/api/API.html#projen-cdk8s-cdk8stypescriptapp) - CDK8s app in TypeScript.
* [cdk8s-construct](https://projen.io/api/API.html#projen-cdk8s-constructlibrarycdk8s) - CDK8s construct library project.
* [cdktf-construct](https://projen.io/api/API.html#projen-cdktf-constructlibrarycdktf) - CDKTF construct library project.
* [github-action-ts](https://projen.io/api/API.html#projen-actions-githubactiontypescriptproject) - Create a GitHub Action with TypeScript.
* [java](https://projen.io/api/API.html#projen-java-javaproject) - Java project.
* [jsii](https://projen.io/api/API.html#projen-cdk-jsiiproject) - Multi-language jsii library project.
* [nextjs](https://projen.io/api/API.html#projen-web-nextjsproject) - Next.js project without TypeScript.
* [nextjs-ts](https://projen.io/api/API.html#projen-web-nextjstypescriptproject) - Next.js project with TypeScript.
* [node](https://projen.io/api/API.html#projen-javascript-nodeproject) - Node.js project.
* [project](https://projen.io/api/API.html#projen-project) - Base project.
* [python](https://projen.io/api/API.html#projen-python-pythonproject) - Python project.
* [react](https://projen.io/api/API.html#projen-web-reactproject) - React project without TypeScript.
* [react-ts](https://projen.io/api/API.html#projen-web-reacttypescriptproject) - React project with TypeScript.
* [typescript](https://projen.io/api/API.html#projen-typescript-typescriptproject) - TypeScript project.
* [typescript-app](https://projen.io/api/API.html#projen-typescript-typescriptappproject) - TypeScript app.
