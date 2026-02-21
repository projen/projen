---
sidebar_position: 1
---

# Getting Started

This guide will walk you through the essential steps to get up and running with a TypeScript project, covering much of 
what you'll typically use. By the end of this guide, you'll have a solid foundation to build and manage your projects 
efficiently with projen.

:::info
Note: While this guide uses TypeScript as an example, projen supports a variety of project types including JavaScript, 
Python, Java, and more. The concepts and steps outlined here can be adapted to other languages and project types as 
well.
:::

## Table of Contents
1. [Introduction](#introduction)
2. [Creating a New TypeScript Project](#creating-a-new-typescript-project)
3. [Project Configuration](#project-configuration)
4. [Adding Dependencies](#adding-dependencies)
5. [Managing Scripts](#managing-scripts)
6. [Generating Files](#generating-files)
7. [Customizing Project Settings](#customizing-project-settings)
8. [Working with Git](#working-with-git)
9. [Aliasing projen](#aliasing-projen)
10. [Watching for Changes](#watching-for-changes)
11. [Conclusion](#conclusion)

## Introduction

Projen helps you manage your project configuration using code. Instead of manually editing configuration files, you 
define your project setup in a single JavaScript or TypeScript file.

## Creating a New TypeScript Project

To create a new TypeScript project, navigate to your desired directory and run:

```bash
mkdir demo
cd demo
npx projen new typescript
```

Replace `typescript` with the type of project you want to create, such as `node` for a Node.js project or `python` for 
a Python project. You can get a complete list of available project types by running `npx projen new --help`.

## Project Configuration

Projen projects are configured using a `.projenrc.ts` file. Here's a basic example for a TypeScript project:

```ts
import { typescript } from 'projen';

const project = new typescript.TypeScriptProject({
  name: 'my-projen-project',
  defaultReleaseBranch: 'main',
  packageManager: NodePackageManager.NPM,
  srcdir: 'src',
  testdir: 'test',
});

project.synth();
```

From this point forward, all changes to files managed by projen will be made in the projen RC file. Depending on the 
project type you choose, the filename will vary slightly but will always start with .projenrc.

For example:

- For a Node.js project, the file will be `.projenrc.js`.
- For a TypeScript project, the file will be `.projenrc.ts`.
- For a Python project, the file will be `.projenrc.py`.
- If you choose to use JSON, the file will be `.projenrc.json`.

Typically, the projen RC file will be in the same language as the project.

## Adding Dependencies

You can add dependencies in two ways: by using projen's API methods or by setting properties in the constructor.

### Using API Methods

To add a runtime dependency:

```ts
project.addDeps('axios');
```

For development dependencies:

```ts
project.addDevDeps('typescript', 'jest');
```

### Setting Dependencies in the Constructor
Alternatively, you can specify dependencies when you create the project:
```ts
import { TypeScriptProject } from 'projen';

const project = new TypeScriptProject({
  name: 'my-projen-project',
  defaultReleaseBranch: 'main',
  packageManager: NodePackageManager.NPM,
  srcdir: 'src',
  testdir: 'test',
  deps: ['axios'], // Configure your runtime dependencies
  devDeps: ['typescript', 'jest'], // Configure your dev dependencies
});

project.synth();
```

## Managing Scripts

Projen allows you to manage npm scripts easily:

```ts
project.addTask('start', {
  exec: 'ts-node src/index.ts',
});
```

## Generating Files

You can generate custom files using projen. For example, to create a README file:

```ts
new SampleReadme(project, {
  contents: `
    # Sample Project Name
    
    > This project is generated using projen.
  `
});
```

## Customizing Project Settings

Projen provides a wide range of options to customize your project settings. Here are some additional examples:

### Custom File Generation:

Generate custom configuration files, scripts, or documentation.

```ts
new JsonFile(project, 'src/config.json', {
  obj: {
    key: 'value',
  },
});
```

### ESLint Configuration:

Configure ESLint settings for code linting.

```ts
project.eslint?.addRules({
  'no-console': 'warn',
  'quotes': ['error', 'single'],
  'semi': ['error', 'always'],
  'indent': ['error', 2],
  'no-unused-vars': 'warn',
  'eqeqeq': 'error',
  'no-trailing-spaces': 'error',
  'eol-last': ['error', 'always'],
  'comma-dangle': ['error', 'only-multiline'],
});
```

### Prettier Configuration:

Customize Prettier settings for code formatting.

```ts
project.prettier?.addOverride({
  files: '*.ts',
  options: {
    singleQuote: true,
    semi: false,
    tabWidth: 2,
    trailingComma: TrailingComma.ES5,
    printWidth: 80,
  },
});
```

### Jest Configuration:

Configure Jest settings for running tests.

```ts
project.jest?.addTestMatch('**/__tests__/**/*.ts');
```

### Publishing Settings:

Customize settings for publishing the package to npm.

```ts
project.package.addField('publishConfig', {
  access: 'public',
});
```

### VSCode Settings:

Configure settings for Visual Studio Code.

```ts
project.vscode?.extensions.addRecommendations('dbaeumer.vscode-eslint', 'esbenp.prettier-vscode');
```

### Docker Configuration:

Add Docker support by generating a Dockerfile.

```ts
project.addFile('Dockerfile', {
  contents: `
    FROM node:14
    WORKDIR /app
    COPY package*.json ./
    RUN npm install
    COPY . .
    CMD ["npm", "start"]
  `,
});
```

### CI/CD Settings:

Add custom CI/CD configurations, such as for GitLab CI or Jenkins.

```ts
new YamlFile(project, '.gitlab-ci.yml', {
  obj: {
    stages: [
      'build',
      'test',
    ],
    build: {
      stage: 'build',
      script: [
        'npm install',
        'npm run build',
      ],
    },
    test: {
      stage: 'test',
      script: [
        'npm test',
      ],
    },
  },
});
```

### Environment Variables:

Manage environment variables for different environments.

```ts
new TextFile(project, '.env', {
  lines: [
    'NODE_ENV=development',
    'API_KEY=your_api_key',
  ],
});
```

## Working with Git

Projen can help you manage your Git settings.

### Git Ignore Settings:

Customize the `.gitignore` file to include or exclude specific files and directories.

```ts
project.gitignore.addPatterns('dist/', 'node_modules/');
```

## Aliasing projen

To simplify using projen, consider creating an alias:

```shell
alias pj="npx projen"
```
Add this line to your shell's startup script (e.g., `~/.bashrc` or `~/.zshrc`) for it to persist across sessions. This 
documentation will always spell out commands fully in case you prefer not to use aliases.

## Watching for Changes

If you are making frequent changes to your `.projenrc` file, you can use the `--watch` option to have projen 
automatically re-run whenever the file changes:

```shell
npx projen --watch
```

This will help streamline your workflow by ensuring that projen updates are applied immediately as you make changes 
to your configuration file.

## Conclusion

This Quick Start Guide covers a broad range of custom configurations you can use in projen for a TypeScript project. 
With these basics and additional customizations, you can efficiently manage your project's configuration and focus 
on coding. For more advanced features and customization options, refer to the projen documentation.

Continue to the [Rest API with Node.js](../quick-starts/nodejs/rest-api/index.md) quick start to see a more detailed example of building a Node.js API.
