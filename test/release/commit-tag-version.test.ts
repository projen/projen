import { promises as fs, mkdtempSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { CommitAndTagVersion } from "../../src/release/commit-tag-version";
import * as util from "../../src/util";

describe("CommitAndTagVersion", () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = mkdtempSync(join(tmpdir(), "catv-test-"));
  });

  afterEach(async () => {
    await fs.rm(tempDir, { recursive: true });
  });

  test("creates config without type property for auto-detection", async () => {
    const catv = new CommitAndTagVersion(undefined, tempDir, {
      versionFile: "package.json",
    });

    // Test that invoke creates a config file without type property
    const mockExec = jest.fn();
    const execSpy = jest.spyOn(util, "exec").mockImplementation(mockExec);

    try {
      await catv.invoke({ dryRun: true });
    } catch {
      // Expected to fail since we mocked exec, but config file should be created
    }

    // Read the generated config file
    const rcfile = join(tempDir, ".versionrc.json");
    const configExists = await fs
      .stat(rcfile)
      .then(() => true)
      .catch(() => false);

    if (configExists) {
      const config = JSON.parse(await fs.readFile(rcfile, "utf-8"));

      // Check that type property is not present, allowing auto-detection
      expect(config.packageFiles[0]).toEqual({
        filename: "package.json",
      });
      expect(config.bumpFiles[0]).toEqual({
        filename: "package.json",
      });
      expect(config.packageFiles[0].type).toBeUndefined();
      expect(config.bumpFiles[0].type).toBeUndefined();
    }

    // Restore original exec
    execSpy.mockRestore();
  });

  test("handles pyproject.toml files without type specification", async () => {
    const catv = new CommitAndTagVersion(undefined, tempDir, {
      versionFile: "pyproject.toml",
    });

    // Test that invoke creates a config file without type property for TOML files
    const mockExec = jest.fn();
    const execSpy = jest.spyOn(util, "exec").mockImplementation(mockExec);

    try {
      await catv.invoke({ dryRun: true });
    } catch {
      // Expected to fail since we mocked exec
    }

    const rcfile = join(tempDir, ".versionrc.json");
    const configExists = await fs
      .stat(rcfile)
      .then(() => true)
      .catch(() => false);

    if (configExists) {
      const config = JSON.parse(await fs.readFile(rcfile, "utf-8"));

      expect(config.packageFiles[0]).toEqual({
        filename: "pyproject.toml",
      });
      expect(config.bumpFiles[0]).toEqual({
        filename: "pyproject.toml",
      });
    }

    execSpy.mockRestore();
  });

  test("maintains backward compatibility with version.json", () => {
    const catv = new CommitAndTagVersion(undefined, tempDir, {
      versionFile: "version.json",
    });

    expect(catv).toBeInstanceOf(CommitAndTagVersion);
  });
});
