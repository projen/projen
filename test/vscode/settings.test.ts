import { synthSnapshot, TestProject } from "../util";

const VSCODE_SETTINGS_FILE = ".vscode/settings.json";

test("no settings configured", () => {
  // GIVEN
  const project = new TestProject();

  // WHEN
  project.vscode?.settings;

  // THEN
  expect(synthSnapshot(project)).not.toHaveProperty(VSCODE_SETTINGS_FILE);
});

test("add single settings", () => {
  // GIVEN
  const project = new TestProject();

  // WHEN
  project.vscode?.settings.addSetting("files.autoSave", "afterDelay");
  project.vscode?.settings.addSetting("editor.minimap.enabled", true);
  project.vscode?.settings.addSetting("files.autoSaveDelay", 1000);
  project.vscode?.settings.addSetting("editor.rulers", []);
  project.vscode?.settings.addSetting("search.exclude", {
    "**/node_modules": true,
    "**/bower_components": true,
  });
  project.vscode?.settings.addSetting(
    "editor.defaultFormatter",
    "esbenp.prettier-vscode",
    "javascript",
  );
  project.vscode?.settings.addSetting(
    "editor.defaultFormatter",
    "esbenp.prettier-vscode",
    "typescript",
  );

  // THEN
  const settings = synthSnapshot(project)[VSCODE_SETTINGS_FILE];

  expect(settings).toStrictEqual({
    "//": expect.anything(),
    "files.autoSave": "afterDelay",
    "editor.minimap.enabled": true,
    "files.autoSaveDelay": 1000,
    "editor.rulers": [],
    "search.exclude": { "**/node_modules": true, "**/bower_components": true },
    "[javascript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
    },
    "[typescript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
    },
  });
});

test("batch add settings", () => {
  // GIVEN
  const project = new TestProject();

  // WHEN
  project.vscode?.settings.addSettings({
    "files.autoSave": "afterDelay",
    "editor.minimap.enabled": true,
    "files.autoSaveDelay": 1000,
    "editor.rulers": [],
    "search.exclude": { "**/node_modules": true, "**/bower_components": true },
  });
  project.vscode?.settings.addSettings(
    {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "eslint.format.enable": true,
    },
    ["javascript", "typescript"],
  );
  project.vscode?.settings.addSettings(
    {
      "python.formatting.provider": "black",
    },
    "python",
  );

  // THEN
  const settings = synthSnapshot(project)[VSCODE_SETTINGS_FILE];

  expect(settings).toStrictEqual({
    "//": expect.anything(),
    "files.autoSave": "afterDelay",
    "editor.minimap.enabled": true,
    "files.autoSaveDelay": 1000,
    "editor.rulers": [],
    "search.exclude": { "**/node_modules": true, "**/bower_components": true },
    "[javascript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "eslint.format.enable": true,
    },
    "[typescript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "eslint.format.enable": true,
    },
    "[python]": {
      "python.formatting.provider": "black",
    },
  });
});
