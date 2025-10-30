import { 
  ImportReference, 
  CodeReference,
  js, 
  code, 
  json, 
  from
} from "../../src/javascript/private/code-template";
import { ModuleImports } from "../../src/javascript/private/modules";

describe("ImportReference", () => {
  test("creates named import reference", () => {
    const ref = from("react").Component;
    expect(ref).toBeInstanceOf(ImportReference);
  });

  test("creates default import reference", () => {
    const ref = from("express").default.as("app");
    expect(ref).toBeInstanceOf(ImportReference);
  });

  test("throws error when rendered before collecting imports", () => {
    const ref = from("react").Component;
    expect(() => ref.render()).toThrow("Import not resolved");
  });

  test("throws error when rendered twice", () => {
    const ref = from("react").Component;
    const template = code("const comp = ", ref);
    
    generateFile(template);
    expect(() => ref.render()).toThrow("Code reference already used");
  });

  test("import reference reuse error includes stack trace locations", () => {
    const ref = from("react").Component;
    const imports = new (require("../../src/javascript/private/modules").ModuleImports)();
    ref.collectImports(imports);
    
    const firstUse = ref.render();
    expect(firstUse).toBe("Component");
    
    try {
      ref.render();
    } catch (error: any) {
      expect(error.name).toBe("ImportReferenceError");
      const message = error.message;
      
      expect(message).toMatch(
        /Code reference already used.*Reference created:.*code-template\.test\.ts:\d+:.*First use:.*code-template\.test\.ts:\d+:.*Second use:.*code-template\.test\.ts:\d+:/s
      );
    }
  });
});

describe("CodeTemplate (js tagged template)", () => {
  test("renders simple template", () => {
    const ref = from("react").Component;
    const template = js`const comp = ${ref};`;
    
    const result = generateFile(template);
    expect(result).toContain('import { Component } from "react";');
    expect(result).toContain('const comp = Component;');
  });

  test("handles multiple imports", () => {
    const Component = from("react").Component;
    const useState = from("react").useState;
    const express = from("express").default.as("app");
    
    const template = js`
const comp = ${Component};
const hook = ${useState};
const server = ${express}();`;
    
    const result = generateFile(template);
    expect(result).toContain('import { Component, useState } from "react";');
    expect(result).toContain('import { default as app } from "express";');
  });
});

describe("CodeBuilder (JSII-compatible)", () => {
  test("builds code with method chaining", () => {
    const Component = from("react").Component;
    
    const template = code()
      .line("function Test() {")
      .line("  return ", Component, ";")
      .line("}");
    
    const result = generateFile(template);
    expect(result).toContain('import { Component } from "react";');
    expect(result).toContain('function Test() {\n  return Component;\n}');
  });

  test("builds code with function arguments", () => {
    const useState = from("react").useState;
    
    const template = code(
      "const [state, setState] = ", useState, "(0);"
    );
    
    const result = generateFile(template);
    expect(result).toContain('import { useState } from "react";');
    expect(result).toContain('const [state, setState] = useState(0);');
  });

  test("handles empty line", () => {
    const template = code().line().line("test");
    expect(template.render()).toBe('\ntest\n');
  });
});

describe("JsonTemplate", () => {
  test("renders JSON with embedded imports", () => {
    const parser = from("@typescript-eslint/parser").parser;
    
    const config = json({
      languageOptions: {
        parser: parser,
        ecmaVersion: 2022
      }
    });
    
    const result = generateFile(config);
    expect(result).toContain('import { parser } from "@typescript-eslint/parser";');
    expect(result).toContain('"parser": parser');
    expect(result).toContain('"ecmaVersion": 2022');
  });

  test("handles nested objects and arrays", () => {
    const plugin = from("eslint-plugin-react").plugin;
    
    const config = json({
      plugins: [plugin],
      rules: {
        "react/jsx-uses-react": "error"
      }
    });
    
    const result = generateFile(config);
    expect(result).toContain('import { plugin } from "eslint-plugin-react";');
    expect(result).toContain('"plugins": [\n    plugin\n  ]');
  });
});

describe("from helper", () => {
  test("creates import references via proxy", () => {
    const react = from("react");
    const Component = react.Component;
    const useState = react.useState;
    
    expect(Component).toBeInstanceOf(ImportReference);
    expect(useState).toBeInstanceOf(ImportReference);
  });

  test("supports chained property access", () => {
    const rules = from("eslint-plugin-react").rules;
    expect(rules).toBeInstanceOf(ImportReference);
  });
});

describe("defaultFrom helper", () => {
  test("creates default import reference", () => {
    const express = from("express").default.as("app");
    expect(express).toBeInstanceOf(ImportReference);
  });

  test("works without alias", () => {
    const express = from("express").default;
    expect(express).toBeInstanceOf(ImportReference);
  });
});

describe("stringifyWithCode", () => {
  test("handles code resolvables", () => {
    const ref = from("react").Component;
    // Mock the resolved name for testing
    (ref as any).resolvedName = "Component";
    (ref as any).consumed = false;
    
    const result = json({ comp: ref }).render();
    expect(result).toContain('"comp": Component');
  });

  test("handles nested objects", () => {
    const result = json({
      a: { b: { c: "value" } }
    }).render();
    expect(result).toContain('{\n  "a": {\n    "b": {\n      "c": "value"\n    }\n  }\n}');
  });

  test("handles arrays", () => {
    const result = json({
      items: ["a", "b", "c"]
    }).render();
    expect(result).toContain('"items": [\n    "a",\n    "b",\n    "c"\n  ]');
  });

  test("handles empty objects and arrays", () => {
    const result = json({
      empty: {},
      emptyArray: []
    }).render();
    expect(result).toContain('"empty": {}');
    expect(result).toContain('"emptyArray": []');
  });
});

describe("Import conflict resolution", () => {
  test("resolves naming conflicts", () => {
    const reactComponent = from("react").Component;
    const vueComponent = from("vue").Component;
    
    const template = code(
      "const a = ", reactComponent, ";\n",
      "const b = ", vueComponent, ";"
    );
    
    const result = generateFile(template);
    expect(result).toContain('import { Component } from "react";');
    expect(result).toContain('import { Component as Component1 } from "vue";');
    expect(result).toContain('const a = Component;');
    expect(result).toContain('const b = Component1;');
  });

  test("handles reserved keywords", () => {
    const classRef = from("test-module").class;
    
    const template = code("const c = ", classRef, ";");
    
    const result = generateFile(template);
    expect(result).toContain('import { class as class_ } from "test-module";');
    expect(result).toContain('const c = class_;');
  });

  test("deduplicates identical imports", () => {
    const comp1 = from("react").Component;
    const comp2 = from("react").Component;
    
    const template = code(
      "const a = ", comp1, ";\n",
      "const b = ", comp2, ";"
    );
    
    const result = generateFile(template);
    const importLines = result.split('\n').filter((line: string) => line.startsWith('import'));
    expect(importLines).toHaveLength(1);
    expect(importLines[0]).toBe('import { Component } from "react";');
  });
});

describe("Import sorting", () => {
  test("sorts modules alphabetically", () => {
    const z = from("z-module").func;
    const a = from("a-module").func;
    
    const template = code("const z = ", z, "; const a = ", a, ";");
    
    const result = generateFile(template);
    const lines = result.split('\n');
    const aIndex = lines.findIndex((line: string) => line.includes('a-module'));
    const zIndex = lines.findIndex((line: string) => line.includes('z-module'));
    expect(aIndex).toBeLessThan(zIndex);
  });

  test("puts default imports first within module", () => {
    const named = from("express").Router;
    const defaultImport = from("express").default.as("app");
    
    const template = code("const r = ", named, "; const a = ", defaultImport, ";");
    
    const result = generateFile(template);
    expect(result).toContain('import { default as app, Router } from "express";');
  });
});

describe("File generation", () => {
  test("generates complete file with imports and body", () => {
    const Component = from("react").Component;
    
    const template = js`function App() { return ${Component}; }`;
    
    const result = generateFile(template);
    const lines = result.split('\n');
    
    expect(lines[0]).toBe('import { Component } from "react";');
    expect(lines[1]).toBe('');
    expect(lines[2]).toBe('function App() { return Component; }');
  });

  test("handles templates without imports", () => {
    const template = js`const x = 42;`;
    
    const result = generateFile(template);
    expect(result).toBe('\nconst x = 42;');
  });
});

describe('CodeReference', () => {
  test('path() creates nested property reference', () => {
    const ref = new CodeReference('myVar');
    const nested = ref.path('config.rules');
    
    expect(nested.render()).toBe('myVar.config.rules');
  });

  test('single-use consumption works', () => {
    const ref = new CodeReference('myVar');
    ref.render(); // First use
    
    expect(() => ref.render()).toThrow('Code reference already used');
  });
});

describe('ImportReference path()', () => {
  test('creates nested property reference with import resolution', () => {
    const ref = from('eslint-config-base').default;
    const nested = ref.path('rules.indent');
    
    const template = code('const rule = ', nested, ';');
    const result = generateFile(template);
    
    expect(result).toContain('eslint-config-base.rules.indent');
  });
});

describe('from() helper nested access', () => {
  test('supports automatic nested property access', () => {
    const nested = from('eslint-config-base').default.rules.indent;
    
    const template = code('const rule = ', nested, ';');
    const result = generateFile(template);
    
    expect(result).toContain('eslint-config-base.rules.indent');
  });

  test('supports aliased automatic nested property access', () => {
    const nested = from('eslint-config-base').default.as('BaseConfig').rules.indent;
    
    const template = code('const rule = ', nested, ';');
    const result = generateFile(template);
    
    expect(result).toContain('BaseConfig.rules.indent');
  });

  test('supports explicit path() method', () => {
    const nested = from('eslint-config-base').default.path('rules.indent');
    
    const template = code('const rule = ', nested, ';');
    const result = generateFile(template);
    
    expect(result).toContain('eslint-config-base.rules.indent');
  });
});

// Helper function to generate complete file with imports
function generateFile(template: any): string {
  const imports = new ModuleImports();
  template.collectImports?.(imports);
  const body = template.render();
  const importLines = imports.asEsmImports();
  return importLines.length > 0 ? importLines.join('\n') + '\n\n' + body : '\n' + body;
}
