import * as json5 from "json5";
import { PROJEN_MARKER } from "../../src/common";
import { synthSnapshot, TestProject } from "../util";

const VSCODE_EXTENSIONS_FILE = ".vscode/extensions.json";

test("no extensions configured", () => {
  // GIVEN
  const project = new TestProject();

  // WHEN
  project.vscode?.extensions;

  // THEN
  expect(synthSnapshot(project)).not.toHaveProperty(VSCODE_EXTENSIONS_FILE);
});

test("recommend extensions", () => {
  // GIVEN
  const project = new TestProject();

  // WHEN
  project.vscode?.extensions.addRecommendations(
    "vscode.csharp",
    "dbaeumer.vscode-eslint"
  );

  // THEN
  const extensionsFile = synthSnapshot(project, {
    parseJson: false,
  })[VSCODE_EXTENSIONS_FILE];
  const extensionsObject = json5.parse(extensionsFile);

  expect(extensionsFile).toContain(`// ${PROJEN_MARKER}`);
  expect(extensionsObject).toStrictEqual({
    recommendations: ["vscode.csharp", "dbaeumer.vscode-eslint"],
  });
});

test("unwanted recommendations", () => {
  // GIVEN
  const project = new TestProject();

  // WHEN
  project.vscode?.extensions.addUnwantedRecommendations(
    "amazonwebservices.aws-toolkit-vscode",
    "ms-toolsai.jupyter"
  );

  // THEN
  const extensionsFile = synthSnapshot(project, {
    parseJson: false,
  })[VSCODE_EXTENSIONS_FILE];
  const extensionsObject = json5.parse(extensionsFile);

  expect(extensionsFile).toContain(`// ${PROJEN_MARKER}`);
  expect(extensionsObject).toStrictEqual({
    unwantedRecommendations: [
      "amazonwebservices.aws-toolkit-vscode",
      "ms-toolsai.jupyter",
    ],
  });
});

test("recommended extensions and unwanted recommendations", () => {
  // GIVEN
  const project = new TestProject();

  // WHEN
  project.vscode?.extensions.addRecommendations(
    "vscode.csharp",
    "dbaeumer.vscode-eslint"
  );
  project.vscode?.extensions.addUnwantedRecommendations(
    "amazonwebservices.aws-toolkit-vscode",
    "ms-toolsai.jupyter"
  );

  // THEN
  const extensionsFile = synthSnapshot(project, {
    parseJson: false,
  })[VSCODE_EXTENSIONS_FILE];
  const extensionsObject = json5.parse(extensionsFile);

  expect(extensionsFile).toContain(`// ${PROJEN_MARKER}`);
  expect(extensionsObject).toStrictEqual({
    recommendations: ["vscode.csharp", "dbaeumer.vscode-eslint"],
    unwantedRecommendations: [
      "amazonwebservices.aws-toolkit-vscode",
      "ms-toolsai.jupyter",
    ],
  });
});
