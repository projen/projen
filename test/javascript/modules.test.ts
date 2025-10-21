import { ModuleImports } from "../../src/javascript/private/modules";

describe("ModuleImports", () => {
  let imports: ModuleImports;

  beforeEach(() => {
    imports = new ModuleImports();
  });

  describe("from", () => {
    test("adds named import", () => {
      imports.from("fs", "readFile");
      expect(imports.modules).toEqual(["fs"]);
    });

    test("adds named import with alias", () => {
      imports.from("fs", "readFile", "read");
      expect(imports.modules).toEqual(["fs"]);
    });

    test("adds multiple imports from same module", () => {
      imports.from("fs", "readFile");
      imports.from("fs", "writeFile");
      expect(imports.modules).toEqual(["fs"]);
    });
  });

  describe("default", () => {
    test("adds default import", () => {
      imports.default("express", "app");
      expect(imports.modules).toEqual(["express"]);
    });
  });

  describe("asEsmImports", () => {
    test("renders named imports", () => {
      imports.from("fs", "readFile");
      imports.from("fs", "writeFile");
      expect(imports.asEsmImports()).toEqual([
        'import { readFile, writeFile } from "fs";',
      ]);
    });

    test("renders named import with alias", () => {
      imports.from("fs", "readFile", "read");
      expect(imports.asEsmImports()).toEqual([
        'import { readFile as read } from "fs";',
      ]);
    });

    test("renders default import", () => {
      imports.default("express", "app");
      expect(imports.asEsmImports()).toEqual([
        'import { default as app } from "express";',
      ]);
    });

    test("renders mixed imports", () => {
      imports.default("express", "app");
      imports.from("express", "Router");
      expect(imports.asEsmImports()).toEqual([
        'import { default as app, Router } from "express";',
      ]);
    });
  });

  describe("asCjsRequire", () => {
    test("renders named imports", () => {
      imports.from("fs", "readFile");
      imports.from("fs", "writeFile");
      expect(imports.asCjsRequire()).toEqual([
        'const { readFile, writeFile } = require("fs");',
      ]);
    });

    test("renders named import with alias", () => {
      imports.from("fs", "readFile", "read");
      expect(imports.asCjsRequire()).toEqual([
        'const { readFile: read } = require("fs");',
      ]);
    });

    test("renders default import", () => {
      imports.default("express", "app");
      expect(imports.asCjsRequire()).toEqual([
        'const app = require("express");',
      ]);
    });

    test("renders mixed imports", () => {
      imports.default("express", "app");
      imports.from("express", "Router");
      expect(imports.asCjsRequire()).toEqual([
        'const app = require("express");',
        "const { Router } = app;",
      ]);
    });
  });

  test("modules returns sorted module names", () => {
    imports.from("z-module", "func");
    imports.from("a-module", "func");
    expect(imports.modules).toEqual(["a-module", "z-module"]);
  });

  describe("merge", () => {
    test("merges imports from another instance", () => {
      const other = new ModuleImports();
      other.from("fs", "readFile");
      other.default("express", "app");

      imports.from("path", "join");
      imports.merge(other);

      expect(imports.modules.sort()).toEqual(["express", "fs", "path"]);
    });

    test("handles overlapping modules", () => {
      const other = new ModuleImports();
      other.from("fs", "writeFile");

      imports.from("fs", "readFile");
      imports.merge(other);

      expect(imports.asEsmImports()).toEqual([
        'import { readFile, writeFile } from "fs";',
      ]);
    });
  });

  describe("deduplication", () => {
    test("deduplicates identical named imports", () => {
      imports.from("fs", "readFile");
      imports.from("fs", "readFile");

      expect(imports.asEsmImports()).toEqual([
        'import { readFile } from "fs";',
      ]);
    });

    test("deduplicates identical aliased imports", () => {
      imports.from("fs", "readFile", "read");
      imports.from("fs", "readFile", "read");

      expect(imports.asEsmImports()).toEqual([
        'import { readFile as read } from "fs";',
      ]);
    });

    test("deduplicates identical default imports", () => {
      imports.default("express", "app");
      imports.default("express", "app");

      expect(imports.asEsmImports()).toEqual([
        'import { default as app } from "express";',
      ]);
    });

    test("keeps different aliases for same import", () => {
      imports.from("fs", "readFile", "read");
      imports.from("fs", "readFile", "readData");

      expect(imports.asEsmImports()).toEqual([
        'import { readFile as read, readFile as readData } from "fs";',
      ]);
    });
  });

  describe("reserved keywords", () => {
    test("automatically aliases reserved import names", () => {
      const result = imports.from("test-module", "class");
      expect(result.render()).toBe("class_");
      expect(imports.asEsmImports()).toEqual([
        'import { class as class_ } from "test-module";',
      ]);
    });

    test("automatically aliases reserved alias names", () => {
      const result = imports.from("test-module", "MyClass", "class");
      expect(result.render()).toBe("class_");
      expect(imports.asEsmImports()).toEqual([
        'import { MyClass as class_ } from "test-module";',
      ]);
    });

    test("returns correct referenceable name for reserved import", () => {
      const result = imports.from("test-module", "function");
      expect(result.render()).toBe("function_");
    });

    test("returns correct referenceable name for reserved alias", () => {
      const result = imports.from("test-module", "MyFunction", "function");
      expect(result.render()).toBe("function_");
    });

    test("returns original name for non-reserved words", () => {
      const result = imports.from("test-module", "normalName");
      expect(result.render()).toBe("normalName");
    });

    test("handles reserved keywords in default imports", () => {
      const result = imports.default("test-module", "class");
      expect(result.render()).toBe("class_");
      expect(imports.asEsmImports()).toEqual([
        'import { default as class_ } from "test-module";',
      ]);
    });

    test("works with CJS require statements", () => {
      imports.from("test-module", "class");
      expect(imports.asCjsRequire()).toEqual([
        'const { class: class_ } = require("test-module");',
      ]);
    });
  });

  describe("naming conflict resolution", () => {
    test("resolves conflicts when same name imported from different modules", () => {
      imports.from("react", "Component");
      imports.from("vue", "Component");
      
      const result = imports.asEsmImports();
      expect(result.length).toBe(2);
      expect(result).toContain('import { Component } from "react";');
      expect(result).toContain('import { Component as Component1 } from "vue";');
    });

    test("resolves conflicts with multiple conflicts", () => {
      imports.from("react", "Component");
      imports.from("vue", "Component");
      imports.from("angular", "Component");
      
      const result = imports.asEsmImports();
      expect(result).toEqual([
        'import { Component as Component2 } from "angular";',
        'import { Component } from "react";',
        'import { Component as Component1 } from "vue";'
      ]);
    });

    test("resolves conflicts when merging imports", () => {
      const imports1 = new ModuleImports();
      const imports2 = new ModuleImports();
      
      imports1.from("react", "useState");
      imports2.from("vue", "useState");
      
      imports1.merge(imports2);
      
      const result = imports1.asEsmImports();
      expect(result.length).toBe(2);
      expect(result).toContain('import { useState } from "react";');
      expect(result).toContain('import { useState as useState1 } from "vue";');
    });

    test("resolves conflicts with default imports", () => {
      imports.default("react", "React");
      imports.from("some-lib", "React");
      
      const result = imports.asEsmImports();
      expect(result.length).toBe(2);
      expect(result).toContain('import { default as React } from "react";');
      expect(result).toContain('import { React as React1 } from "some-lib";');
    });

    test("handles complex conflict scenarios", () => {
      imports.from("lib1", "Component");
      imports.from("lib2", "Component", "MyComponent");
      imports.from("lib3", "Component");
      imports.default("lib4", "Component");
      
      const result = imports.asEsmImports();
      expect(result).toEqual([
        'import { Component } from "lib1";',
        'import { Component as MyComponent } from "lib2";',
        'import { Component as Component1 } from "lib3";',
        'import { default as Component2 } from "lib4";'
      ]);
    });

    test("preserves explicit aliases and only resolves conflicts for auto-generated names", () => {
      imports.from("lib1", "Component", "MyComponent");
      imports.from("lib2", "Component");
      
      const result = imports.asEsmImports();
      expect(result).toEqual([
        'import { Component as MyComponent } from "lib1";',
        'import { Component } from "lib2";'
      ]);
    });
  });
});
