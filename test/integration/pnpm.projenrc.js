const { javascript } = require("projen");

const project = new javascript.NodeProject({
  name: "pnpm-project",

  packageManager: javascript.NodePackageManager.PNPM,
  defaultReleaseBranch: 'master',

  deps: ["esbuild"],

  devDeps: ["aws-sdk"],
});

project.synth();
