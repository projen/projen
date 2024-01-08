---
sidebar_position: 2
---

# Create an ExpressJS Application

This quick start will help you create an [Express.js](https://expressjs.com/) application using
projen's TypeScript project. The NodeJS project is a little feature-light, so to show off
more of projen's features, we'll use the TypeScript project instead.

To begin, make sure you have the version of NodeJS you want to use set up in your terminal.
Running `which node` in bash/zsh/other POSIX shells, or `Get-Command node` in Powershell,
should print the path to the NodeJS version you want to use. [`nvm`](https://github.com/nvm-sh/nvm)
is a popular tool for managing multiple versions of Node on a single machine.
To select a version, run `nvm use <version>`.

To create a new TypeScript project, use `npx projen new typescript`:

```shell
npx projen new typescript --name=express-project
```

projen does not officially maintain a project for Express.js, so we need to install the dependencies
and write some boilerplate code.

## Dependencies

To add libraries, open `.projenrc.js` and add them to the `deps` array. For example, to add the `express` library,
add the following line to `.projenrc.ts`:

```ts
import { typescript } from "projen";

const project = new TypeScriptProject({
  name: "express-project",
  // ...
  deps: ["express"],
  // ...
});
```

Then re-run `npx projen` to install the library.

## Code

The most basic "Hello World!" example for Express.js consists of a single file, so let's create
that file and the basic app now under `src/index.ts` (replace the contents of the file that's already there):

```ts
import express, { Request, Response } from "express";
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  console.info(req);
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

## Running the app

You have code now, but you need to run it! To do that, we'll add a `start` task to projen:

```ts
project.tasks.addTask("start", {
  exec: "ts-node src/index.ts",
  receiveArgs: true,
});
```

This will run the `ts-node src/index.ts` command when you run `npx projen start`. It also makes it
possible to run `npm start`, `pnpm start` or `yarn start`, since projen updates `package.json`.
The `receiveArgs` parameter allows you to pass additional arguments to the command.

## Testing

Testing will require a few more dependencies, so let's add those now:

```ts
project.deps.addDevDeps("supertest", "@types/supertest");
```

Jest is added by default to a projen TypeScript project, so you don't need to specify it.

Next, let's update our code to make it testable:

`src/index.ts`

```ts
import express, { Request, Response } from "express";

export const exampleApp = express(); // Export the app so we can test it
const port = process.env.PORT || 3000;

exampleApp.get("/", (req: Request, res: Response) => {
  console.info(req);
  res.send("Hello World!");
});

if (require.main === module) {
  // Check if the file is being run directly
  exampleApp.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}
```

Now, let's create a test file under `tests/index.test.ts` (you can delete the default test file that's already there):

```ts
import request from "supertest";
import { exampleApp } from "../src/index";

describe("GET /", () => {
  it("responds with Hello World!", async () => {
    const response = await request(exampleApp).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello World!");
  });
});
```

projen's TypeScript project comes with a `test` task already, so we just need to run `npx projen test`.

```shell
 PASS  test/index.test.ts
  GET /
    ✓ responds with Hello World! (23 ms)

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |   77.77 |    66.66 |      50 |   77.77 |
 index.ts |   77.77 |    66.66 |      50 |   77.77 | 12-13
----------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.164 s
Ran all test suites.
👾 test » eslint | eslint --ext .ts,.tsx --fix --no-error-on-unmatched-pattern src test build-tools projenrc .projenrc.ts
```

## Extending the project

While Express.js can be run from a single file, it usually is not a best practice to do so. Instead,
consider following the structure created by the [Express.js generator](https://expressjs.com/en/starter/generator.html).

Better yet, challenge yourself to [use projen to create a project for you based on the generator](/docs/custom/)!
