import { promises as fs, mkdtempSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import {
  JsonVersionHandler,
  PythonVersionHandler,
  createVersionHandler,
} from "../../src/release/version-handlers";

describe("JsonVersionHandler", () => {
  let tempDir: string;
  let versionFile: string;
  let handler: JsonVersionHandler;

  beforeEach(() => {
    tempDir = mkdtempSync(join(tmpdir(), "json-version-test-"));
    versionFile = join(tempDir, "package.json");
    handler = new JsonVersionHandler(versionFile);
  });

  afterEach(async () => {
    await fs.rmdir(tempDir, { recursive: true });
  });

  test("reads version from package.json", async () => {
    const packageContent = {
      name: "test-package",
      version: "1.2.3",
      description: "Test package",
    };
    await fs.writeFile(versionFile, JSON.stringify(packageContent, null, 2));

    const version = await handler.readVersion();
    expect(version).toBe("1.2.3");
  });

  test("writes version to package.json preserving formatting", async () => {
    const packageContent = {
      name: "test-package",
      version: "1.0.0",
      description: "Test package",
    };
    await fs.writeFile(
      versionFile,
      JSON.stringify(packageContent, null, 2) + "\n"
    );

    await handler.writeVersion("2.0.0");

    const updatedContent = await fs.readFile(versionFile, "utf-8");
    const parsed = JSON.parse(updatedContent);

    expect(parsed.version).toBe("2.0.0");
    expect(parsed.name).toBe("test-package");
    expect(parsed.description).toBe("Test package");
    expect(updatedContent.endsWith("\n")).toBe(true);
  });

  test("returns undefined for non-existent file", async () => {
    const version = await handler.readVersion();
    expect(version).toBeUndefined();
  });

  test("creates new file when writing version to non-existent file", async () => {
    await handler.writeVersion("1.0.0");

    const content = await fs.readFile(versionFile, "utf-8");
    const parsed = JSON.parse(content);
    expect(parsed.version).toBe("1.0.0");
  });
});

describe("PythonVersionHandler", () => {
  let tempDir: string;
  let versionFile: string;
  let handler: PythonVersionHandler;

  beforeEach(() => {
    tempDir = mkdtempSync(join(tmpdir(), "python-version-test-"));
    versionFile = join(tempDir, "pyproject.toml");
    handler = new PythonVersionHandler(versionFile);
  });

  afterEach(async () => {
    await fs.rmdir(tempDir, { recursive: true });
  });

  test("reads version from pyproject.toml", async () => {
    const tomlContent = `[tool.poetry]
name = "test-package"
version = "1.2.3"
description = "Test package"

[build-system]
requires = ["poetry-core"]
build-backend = "poetry.core.masonry.api"
`;
    await fs.writeFile(versionFile, tomlContent);

    const version = await handler.readVersion();
    expect(version).toBe("1.2.3");
  });

  test("writes version to pyproject.toml preserving structure", async () => {
    const tomlContent = `[tool.poetry]
name = "test-package"
version = "1.0.0"
description = "Test package"

[build-system]
requires = ["poetry-core"]
build-backend = "poetry.core.masonry.api"
`;
    await fs.writeFile(versionFile, tomlContent);

    await handler.writeVersion("2.0.0");

    const updatedContent = await fs.readFile(versionFile, "utf-8");
    expect(updatedContent).toContain('version = "2.0.0"');
    expect(updatedContent).toContain('name = "test-package"');
    expect(updatedContent).toContain("[build-system]");
  });

  test("handles setup.py files", async () => {
    const setupPyFile = join(tempDir, "setup.py");
    const setupPyHandler = new PythonVersionHandler(setupPyFile);

    const setupContent = `from setuptools import setup

setup(
    name="test-package",
    version="1.2.3",
    description="Test package",
)
`;
    await fs.writeFile(setupPyFile, setupContent);

    const version = await setupPyHandler.readVersion();
    expect(version).toBe("1.2.3");
  });

  test("returns undefined for non-existent file", async () => {
    const version = await handler.readVersion();
    expect(version).toBeUndefined();
  });
});

describe("createVersionHandler", () => {
  test("returns PythonVersionHandler for pyproject.toml", () => {
    const handler = createVersionHandler("pyproject.toml");
    expect(handler).toBeInstanceOf(PythonVersionHandler);
  });

  test("returns PythonVersionHandler for setup.py", () => {
    const handler = createVersionHandler("setup.py");
    expect(handler).toBeInstanceOf(PythonVersionHandler);
  });

  test("returns JsonVersionHandler for package.json", () => {
    const handler = createVersionHandler("package.json");
    expect(handler).toBeInstanceOf(JsonVersionHandler);
  });

  test("returns JsonVersionHandler for version.json", () => {
    const handler = createVersionHandler("version.json");
    expect(handler).toBeInstanceOf(JsonVersionHandler);
  });

  test("defaults to JsonVersionHandler for unknown file types", () => {
    const handler = createVersionHandler("unknown.txt");
    expect(handler).toBeInstanceOf(JsonVersionHandler);
  });
});
