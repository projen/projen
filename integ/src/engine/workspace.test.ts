import * as fs from "fs";
import * as path from "path";
import { Workspace, withWorkspace } from "./workspace";

describe("Workspace", () => {
  test("creates a temp dir that exists", () => {
    const ws = Workspace.create();
    try {
      expect(fs.existsSync(ws.dir)).toBe(true);
    } finally {
      ws.dispose();
    }
  });

  test("write creates nested files and mkdir creates dirs", () => {
    const ws = Workspace.create();
    try {
      const file = ws.write(path.join("a", "b", "c.txt"), "content");
      expect(fs.readFileSync(file, "utf-8")).toBe("content");
      const dir = ws.mkdir("x", "y");
      expect(fs.existsSync(dir)).toBe(true);
    } finally {
      ws.dispose();
    }
  });

  test("dispose removes the directory and is idempotent", () => {
    const ws = Workspace.create();
    const dir = ws.dir;
    ws.dispose();
    expect(fs.existsSync(dir)).toBe(false);
    expect(() => ws.dispose()).not.toThrow();
  });

  test("withWorkspace cleans up even when the body throws", async () => {
    let captured = "";
    await expect(
      withWorkspace(async (ws) => {
        captured = ws.dir;
        expect(fs.existsSync(ws.dir)).toBe(true);
        throw new Error("boom");
      }),
    ).rejects.toThrow("boom");
    expect(fs.existsSync(captured)).toBe(false);
  });
});
