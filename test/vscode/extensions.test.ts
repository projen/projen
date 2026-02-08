import { PROJEN_MARKER } from "../../src/common";
import { synthSnapshot, TestProject } from "../util";

const VSCODE_EXTENSIONS_FILE = ".vscode/extensions.json";

const MARKER_COMMENT_OBJECT = {
  [Symbol.for("before-all")]: [
    {
      type: "LineComment",
      value: expect.stringContaining(PROJEN_MARKER),
    },
  ],
};

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
    "dbaeumer.vscode-eslint",
  );

  // THEN
  const extensionsObject = synthSnapshot(project)[VSCODE_EXTENSIONS_FILE];
  expect(extensionsObject).toMatchObject(MARKER_COMMENT_OBJECT);
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
    "ms-toolsai.jupyter",
  );

  // THEN
  const extensionsObject = synthSnapshot(project)[VSCODE_EXTENSIONS_FILE];
  expect(extensionsObject).toMatchObject(MARKER_COMMENT_OBJECT);
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
    "dbaeumer.vscode-eslint",
  );
  project.vscode?.extensions.addUnwantedRecommendations(
    "amazonwebservices.aws-toolkit-vscode",
    "ms-toolsai.jupyter",
  );

  // THEN
  const extensionsObject = synthSnapshot(project)[VSCODE_EXTENSIONS_FILE];
  expect(extensionsObject).toMatchObject(MARKER_COMMENT_OBJECT);
  expect(extensionsObject).toStrictEqual({
    recommendations: ["vscode.csharp", "dbaeumer.vscode-eslint"],
    unwantedRecommendations: [
      "amazonwebservices.aws-toolkit-vscode",
      "ms-toolsai.jupyter",
    ],
  });
});
