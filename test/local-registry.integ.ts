import { exec as execAsync } from "child_process";
import { writeFileSync, readJsonSync, writeJsonSync, emptyDirSync } from "fs-extra";
import { join } from "path";
import { exec } from "../src/util";
import { directorySnapshot, withProjectDir } from "./util";

withLocalRegistry(() => {
  test(`projen new typescript`, () => {
    withProjectDir((projectdir) => {
      exec("npx projen new typescript", { cwd: projectdir });
  
      const actual = directorySnapshot(projectdir, {
        excludeGlobs: [".git/**", "node_modules/**"],
      });
  
      expect(actual).toMatchSnapshot();
    });
  });
});

function withLocalRegistry(code: () => void) {
  const root = process.cwd();

  // check that the working directory is clean
  exec("git diff --exit-code", { cwd: root });

  // set up verdaccio
  const configPath = join(__dirname, 'local-registry', 'config.yml');
  const verdaccio = execAsync(`yarn verdaccio --config ${configPath}`, { cwd: root });
  verdaccio.stdout?.on('data', (data) => process.stderr.write(data.toString()));
  verdaccio.stderr?.on('data', (data) => process.stderr.write(data.toString()));

  const FAKE_PROJEN_VERSION = '999.0.0';
  const npmrcPath = join(root, ".npmrc");

  try {

    // bump projen
    const filepath = join(root, "package.json");
    const pkg = readJsonSync(filepath);
    pkg.version = FAKE_PROJEN_VERSION;
    writeJsonSync(filepath, pkg, { spaces: 2 });

    // re-package projen
    exec(`npx projen package:js`, { cwd: root });

    // set up npm config to use verdaccio as a registry
    const npmrcContents = "registry=http://localhost:4872\n//localhost:4872/_authToken=fake"
    writeFileSync(npmrcPath, npmrcContents);

    // publish projen to registry
    const env = {
      ...process.env,
      NPM_TOKEN: 'fake',
      NPM_REGISTRY: 'localhost:4872',
      DISABLE_HTTPS: '1'
    };
    exec('npx publib-npm', { cwd: root, env });

    code();

  } finally {

    // remove any changes or new files added
    exec("git checkout . && git clean -fd", { cwd: root });

    // clean up storage used by verdaccio
    emptyDirSync(join(root, 'tmp'));

    // kill verdaccio
    verdaccio.kill('SIGTERM');

  }

}
