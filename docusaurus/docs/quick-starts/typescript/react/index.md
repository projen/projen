---
sidebar_position: 4
---

# Create a React Application

This quick start will help you create a [React.js](https://react.dev/) application, extending
projen's NodeJS project.

To begin, make sure you have the version of NodeJS you want to use set up in your terminal.
Running `which node` in bash/zsh/other POSIX shells, or `Get-Command node` in Powershell,
should print the path to the NodeJS version you want to use. [`nvm`](https://github.com/nvm-sh/nvm)
is a popular tool for managing multiple versions of Node on a single machine.
To select a version, run `nvm use <version>`.

To create a new React project, use `npx projen new react`:

```shell
npx projen new react
```

or `npx projen new react-ts` for the TypeScript version:

```shell
npx projen new react-ts
```

A React project will be generated with a basic folder structure and placeholder static files.

:::info
Note that this project type does not include a test structure. You'll need to add that yourself.
Better yet, consider contributing a pull request to add a test structure to the React project type!
:::

```shell
.
├── LICENSE
├── README.md
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.css
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── index.tsx
│   ├── logo.svg
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   └── setupTests.ts
├── tsconfig.dev.json
├── tsconfig.json
└── yarn.lock
```

That's it! You now have the libraries and basic structure you need to get started with your React application.
Projen creates the `npm dev` command by default to view your new app in a React development server.
