import {
  SynthOutput,
  synthSnapshot,
  TestProject,
  withProjectDir,
} from "./util";
import { EndOfLine } from "../src/gitattributes";

describe("GitAttributesFile", () => {
  const retrieveLines = (snap: SynthOutput): string[] => {
    return snap[".gitattributes"]
      .split("\n")
      .map((line: string) => line.trim());
  };

  test("should set endOfLine to LF by default", () => {
    withProjectDir((outdir) => {
      // The TestProject already contains a .gitattributes file
      const project = new TestProject({
        outdir,
      });

      const snap = synthSnapshot(project);
      const lines = retrieveLines(snap);

      expect(lines).toContain("* text=auto eol=lf");
    });
  });

  test("does not at the endOfLine configuration when disabled", () => {
    withProjectDir((outdir) => {
      // The TestProject already contains a .gitattributes file
      const project = new TestProject({
        outdir,
        gitOptions: {
          endOfLine: EndOfLine.NONE,
        },
      });

      const snap = synthSnapshot(project);
      const lines = retrieveLines(snap);

      expect(lines).not.toContain("* text=auto eol=lf");
    });
  });

  test("applies the endOfLine option when defined", () => {
    withProjectDir((outdir) => {
      // The TestProject already contains a .gitattributes file
      const project = new TestProject({
        outdir,
        gitOptions: {
          endOfLine: EndOfLine.CRLF,
        },
      });

      const snap = synthSnapshot(project);
      const lines = retrieveLines(snap);

      expect(lines).toContain("* text=auto eol=crlf");
    });
  });

  test("should add attributes to files", () => {
    withProjectDir((outdir) => {
      // The TestProject already contains a .gitattributes file
      const project = new TestProject({
        outdir,
      });

      project.gitattributes.addAttributes("*.txt", "text");
      project.gitattributes.addAttributes("*.md", "text", "markdown");

      const snap = synthSnapshot(project);
      const lines = retrieveLines(snap);

      expect(lines).toContain("*.md text markdown");
      expect(lines).toContain("*.txt text");
    });
  });

  test("should remove all attributes when none specified", () => {
    withProjectDir((outdir) => {
      const project = new TestProject({
        outdir,
      });

      project.gitattributes.addAttributes("*.txt", "text");
      project.gitattributes.addAttributes("*.md", "text", "markdown");
      project.gitattributes.removeAttributes("*.txt");

      const snap = synthSnapshot(project);
      const lines = retrieveLines(snap);

      expect(lines).toContain("*.md text markdown");
      expect(lines).not.toContain("*.txt text");
    });
  });

  test("should remove a single attribute when specified", () => {
    withProjectDir((outdir) => {
      const project = new TestProject({
        outdir,
      });

      const attributeToRemove = "linguist-generated";
      project.gitattributes.addAttributes("*.txt", "text", attributeToRemove);
      project.gitattributes.removeAttributes("*.txt", attributeToRemove);

      const snap = synthSnapshot(project);
      const lines = retrieveLines(snap);

      expect(lines).toContain("*.txt text");
    });
  });

  test("should remove the mapping when no attributes left", () => {
    withProjectDir((outdir) => {
      const project = new TestProject({
        outdir,
      });

      const attributesToRemove = ["text", "linguist-generated"];
      project.gitattributes.addAttributes("*.txt", ...attributesToRemove);
      project.gitattributes.removeAttributes("*.txt", ...attributesToRemove);

      const snap = synthSnapshot(project);
      const lines = retrieveLines(snap);

      expect(lines).not.toContain("*.txt");
    });
  });

  test("should leave mapping unchanged when non-existent attributes are removed", () => {
    withProjectDir((outdir) => {
      const project = new TestProject({
        outdir,
      });

      project.gitattributes.addAttributes(
        "*.txt",
        "text",
        "linguist-generated",
      );
      project.gitattributes.removeAttributes(
        "*.txt",
        "some-attribute-1",
        "some-attribute-2",
      );

      const snap = synthSnapshot(project);
      const lines = retrieveLines(snap);

      expect(lines).toContain("*.txt text linguist-generated");
    });
  });

  test("should do nothing when trying to remove attributes from a non-existent mapping", () => {
    withProjectDir((outdir) => {
      const project = new TestProject({
        outdir,
      });

      project.gitattributes.removeAttributes("foobar", "linguist-generated");

      const snap = synthSnapshot(project);
      const lines = retrieveLines(snap);

      expect(lines).not.toContain("foobar");
    });
  });

  test("should add a LFS pattern", () => {
    withProjectDir((outdir) => {
      // The TestProject already contains a .gitattributes file
      const project = new TestProject({
        outdir,
      });

      project.gitattributes.addLfsPattern("*.bin");

      const snap = synthSnapshot(project);
      const lines = retrieveLines(snap);

      expect(lines).toContain("*.bin filter=lfs diff=lfs merge=lfs -text");
    });
  });

  test("should have LFS patterns", () => {
    // The TestProject already contains a .gitattributes file
    const project = new TestProject();
    project.gitattributes.addLfsPattern("*.bin");

    expect(project.gitattributes.hasLfsPatterns).toBe(true);
  });

  test("should have default end of line character", () => {
    // The TestProject already contains a .gitattributes file
    const project = new TestProject();
    expect(project.gitattributes.endOfLine).toBe(EndOfLine.LF);
  });
});

describe("annotateGenerated", () => {
  test("uses normalized paths", () => {
    const project = new TestProject();
    project.annotateGenerated("\\some\\windows\\like\\path");

    const lines = synthSnapshot(project)[".gitattributes"].split("\n");

    expect(lines).toContain("/some/windows/like/path linguist-generated");
  });
});
