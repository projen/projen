import { synthSnapshot, TestProject } from "./util";
import { PropertiesFile } from "../src";

test("generates a properties file with flat key=value pairs", () => {
  const prj = new TestProject();

  new PropertiesFile(prj, "my.properties", {
    obj: {
      "my.key": "my-value",
      "another.key": "another-value",
    },
    marker: false,
  });

  const out = synthSnapshot(prj)["my.properties"];
  expect(out).toContain("my.key=my-value\n");
  expect(out).toContain("another.key=another-value\n");
});

test("flattens nested objects into dotted keys", () => {
  const prj = new TestProject();

  new PropertiesFile(prj, "my.properties", {
    obj: {
      sonar: {
        projectKey: "my-project",
        sources: "src",
        coverage: {
          exclusions: "**/test/**",
        },
      },
    },
    marker: false,
  });

  const out = synthSnapshot(prj)["my.properties"];
  expect(out).toContain("sonar.projectKey=my-project\n");
  expect(out).toContain("sonar.sources=src\n");
  expect(out).toContain("sonar.coverage.exclusions=**/test/**\n");
});

test("deeply nested objects produce correct dotted keys", () => {
  const prj = new TestProject();

  new PropertiesFile(prj, "my.properties", {
    obj: {
      a: {
        b: {
          c: {
            d: "deep-value",
          },
        },
      },
    },
    marker: false,
  });

  const out = synthSnapshot(prj)["my.properties"];
  expect(out).toContain("a.b.c.d=deep-value\n");
});

test("object can be mutated before synthesis", () => {
  const prj = new TestProject();

  const obj: any = {
    first: { key: "first-value" },
  };

  new PropertiesFile(prj, "my.properties", { obj, marker: false });

  obj.second = { key: "second-value" };

  const out = synthSnapshot(prj)["my.properties"];
  expect(out).toContain("first.key=first-value\n");
  expect(out).toContain("second.key=second-value\n");
});

test("includes projen marker as comment when enabled", () => {
  const prj = new TestProject();

  const file = new PropertiesFile(prj, "my.properties", {
    obj: { key: "value" },
    marker: true,
  });

  const out = synthSnapshot(prj)["my.properties"];
  const firstLine = out.split("\n")[0];
  expect(firstLine).toBe(`# ${file.marker}`);
});

test("supports additional comment lines", () => {
  const prj = new TestProject();

  new PropertiesFile(prj, "my.properties", {
    obj: { key: "value" },
    comment: ["This is a custom comment", "Second line of comment"],
    marker: false,
  });

  const out = synthSnapshot(prj)["my.properties"];
  expect(out).toContain("# This is a custom comment\n");
  expect(out).toContain("# Second line of comment\n");
});

test("omits null and undefined values", () => {
  const prj = new TestProject();

  new PropertiesFile(prj, "my.properties", {
    obj: {
      present: "value",
      nullKey: null,
      undefinedKey: undefined,
    },
    marker: false,
  });

  const out = synthSnapshot(prj)["my.properties"];
  expect(out).toContain("present=value\n");
  expect(out).not.toContain("nullKey");
  expect(out).not.toContain("undefinedKey");
});

test("comma-joins arrays of scalars", () => {
  const prj = new TestProject();

  new PropertiesFile(prj, "my.properties", {
    obj: {
      exclusions: ["**/node_modules/**", "**/coverage/**"],
      flags: [true, 1, "three"],
    },
    marker: false,
  });

  const out = synthSnapshot(prj)["my.properties"];
  expect(out).toContain("exclusions=**/node_modules/**,**/coverage/**\n");
  expect(out).toContain("flags=true,1,three\n");
});

test("throws on arrays containing non-scalar elements", () => {
  const prj = new TestProject();

  new PropertiesFile(prj, "my.properties", {
    obj: {
      sonar: {
        bad: [{ x: 1 }],
      },
    },
    marker: false,
  });

  expect(() => synthSnapshot(prj)).toThrow(
    /Invalid value for property "sonar.bad"/,
  );
});

test("throws on duplicate keys after flattening", () => {
  const prj = new TestProject();

  new PropertiesFile(prj, "my.properties", {
    obj: {
      "sonar.sources": "src",
      sonar: {
        sources: "lib",
      },
    },
    marker: false,
  });

  expect(() => synthSnapshot(prj)).toThrow(
    /Duplicate property key "sonar.sources"/,
  );
});

test("supports addOverride with dot-notation paths", () => {
  const prj = new TestProject();

  const file = new PropertiesFile(prj, "my.properties", {
    obj: {
      sonar: {
        sources: "original-value",
      },
    },
    marker: false,
  });

  file.addOverride("sonar.sources", "overridden-value");

  const out = synthSnapshot(prj)["my.properties"];
  expect(out).toContain("sonar.sources=overridden-value\n");
});

test("addOverride can add new nested paths", () => {
  const prj = new TestProject();

  const file = new PropertiesFile(prj, "my.properties", {
    obj: {
      sonar: {
        projectKey: "my-project",
      },
    },
    marker: false,
  });

  file.addOverride("sonar.java.binaries", "target/classes");

  const out = synthSnapshot(prj)["my.properties"];
  expect(out).toContain("sonar.projectKey=my-project\n");
  expect(out).toContain("sonar.java.binaries=target/classes\n");
});

test("returns undefined content when obj resolves to empty with omitEmpty", () => {
  const prj = new TestProject();

  new PropertiesFile(prj, "my.properties", {
    obj: {},
    omitEmpty: true,
    marker: false,
  });

  const out = synthSnapshot(prj);
  expect(out["my.properties"]).toBeUndefined();
});

test("renders marker before comment", () => {
  const prj = new TestProject();

  const file = new PropertiesFile(prj, "my.properties", {
    obj: { key: "value" },
    comment: ["Custom comment"],
    marker: true,
  });

  const out = synthSnapshot(prj)["my.properties"];
  const lines = out.split("\n");
  expect(lines[0]).toBe(`# ${file.marker}`);
  // blank line separates marker from comment
  expect(lines[1]).toBe("");
  expect(lines[2]).toBe("# Custom comment");
});

test("escapes special characters in keys and values per Java spec", () => {
  const prj = new TestProject();

  new PropertiesFile(prj, "my.properties", {
    obj: {
      "key with spaces": "value with = equals",
      normalKey: "value\nwith\nnewlines",
    },
    marker: false,
  });

  const out = synthSnapshot(prj)["my.properties"];
  // Spaces in keys are escaped with backslash
  expect(out).toContain("key\\ with\\ spaces=");
  // Values with = sign are NOT escaped (= is only special in keys)
  expect(out).toContain("value with \\= equals");
  // Newlines in values are escaped
  expect(out).toContain("\\n");
});
