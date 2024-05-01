import {
  JavascriptDataStructure,
  JavascriptDependencies,
  JavascriptFunction,
  JavascriptRaw,
} from "../src/javascript-file";

test("JavascriptRaw can make js-type eslint output", () => {
  // make a dependencies object to track imports
  const dependencies = new JavascriptDependencies();

  // add a few imports
  const [jsdoc] = dependencies.addImport("jsdoc", "eslint-plugin-jsdoc");
  const [js] = dependencies.addImport("js", "@eslint/js");

  // create a files array to modify later
  const files: Array<string> = [];

  // make a data object
  const data = [
    {
      files,
      plugins: {
        jsdoc,
      },
      rules: {
        "jsdoc/require-description": "error",

        // insert a spread operator, value doesn't matter
        [`...${js}.blah`]: true,
        "jsdoc/check-values": "error",

        // insert a second spread operator, value doesn't matter
        [`...(${jsdoc}.fakeTest ? {"fakeTest": "warn"} : {})`]: true,
      },
    },
  ];

  // now make a file with that data, including any imports, but don't resolve it yet
  const unresolvedValue = new JavascriptRaw(`${dependencies}

export default ${JavascriptDataStructure.value(data)};
`);

  // modify the data
  files.push("**/*.js");

  // now resolve the code into value
  const value = unresolvedValue.resolve();

  console.log(value);

  expect(value).toEqual(`import jsdoc from 'eslint-plugin-jsdoc';
import js from '@eslint/js';

export default [
  {
    files: [
      "**/*.js",
    ],
    plugins: {
      jsdoc: jsdoc,
    },
    rules: {
      "jsdoc/require-description": "error",
      ...js.blah,
      "jsdoc/check-values": "error",
      ...(jsdoc.fakeTest ? {"fakeTest": "warn"} : {}),
    },
  },
];
`);

  expect(value).not.toMatch(/\$\{Token\d+\}/);
});

test("JavascriptRaw value-type test", () => {
  const testValue = "testValue";

  const value = new JavascriptRaw(
    `const test = ${JavascriptDataStructure.value({
      null: null,
      infinity: Infinity,
      date: new Date("2024-01-01T06:00:00.000Z"),
      banana: "bread",
      foo: "bar",
      number: 1,
      truth: false,
      undefined: undefined,
      "undefined Again": JavascriptRaw.value("undefined"),
      array: [
        1,
        "string",
        true,
        {
          a: "b",
        },
      ],
      emptyArray: [],
      emptyObject: {},
      object: {
        a: "b",
        sym: JavascriptRaw.value("__dirname"),
        func: JavascriptRaw.value("JSON.stringify(1)"),
      },
      function2: JavascriptFunction.named(
        "foo",
        [JavascriptRaw.value("a"), JavascriptRaw.value("b")],
        JavascriptRaw.value("return a + b;")
      ),
      functionArrow: JavascriptFunction.arrow(
        [JavascriptRaw.value("a"), JavascriptRaw.value("b")],
        [
          JavascriptRaw.value(
            `console.log(${JavascriptDataStructure.value({ testValue })});`
          ),
          JavascriptRaw.value("return a + b;"),
        ]
      ),
    })};`
  ).resolve();

  expect(value).toMatchInlineSnapshot(`
    "const test = {
      null: null,
      infinity: Infinity,
      date: new Date("2024-01-01T06:00:00.000Z"),
      banana: "bread",
      foo: "bar",
      number: 1,
      truth: false,
      "undefined Again": undefined,
      array: [
        1,
        "string",
        true,
        {
          a: "b",
        },
      ],
      emptyArray: [],
      emptyObject: {},
      object: {
        a: "b",
        sym: __dirname,
        func: JSON.stringify(1),
      },
      function2: function foo(a, b) {
        return a + b;
      },
      functionArrow: (a, b) => {
        console.log({ testValue: "testValue", });
        return a + b;
      },
    };"
  `);

  expect(value).not.toMatch(/\$\{Token\d+\}/);
});

describe("JavascriptDependencies support import (ESM) syntax", () => {
  test("default export", () => {
    const dependencies = new JavascriptDependencies();
    dependencies.addImport("jsdoc", "eslint-plugin-jsdoc");
    dependencies.addImport("js", "@eslint/js");

    const value = dependencies.resolve();
    expect(value).toEqual(`import jsdoc from 'eslint-plugin-jsdoc';
import js from '@eslint/js';`);
  });

  test("subvalues", () => {
    const dependencies = new JavascriptDependencies();
    dependencies.addImport(["subValue1, subValue2"], "eslint-plugin-jsdoc");
    dependencies.addImport(["t1", "t2"], "@eslint/js");

    const value = dependencies.resolve();
    expect(value)
      .toEqual(`import { subValue1, subValue2 } from 'eslint-plugin-jsdoc';
import { t1, t2 } from '@eslint/js';`);
  });

  test("default export and subvalues", () => {
    const dependencies = new JavascriptDependencies();
    dependencies.addImport("jsdoc", "eslint-plugin-jsdoc");
    dependencies.addImport(["subValue1", "subValue2"], "eslint-plugin-jsdoc");
    dependencies.addImport("js", "@eslint/js");
    dependencies.addImport(["t1", "t2"], "@eslint/js");

    const value = dependencies.resolve();
    expect(value)
      .toEqual(`import jsdoc, { subValue1, subValue2 } from 'eslint-plugin-jsdoc';
import js, { t1, t2 } from '@eslint/js';`);
  });
});

describe("JavascriptDependencies support require (CJS) syntax", () => {
  test("default export", () => {
    const dependencies = new JavascriptDependencies({ cjs: true });
    dependencies.addImport("jsdoc", "eslint-plugin-jsdoc");
    dependencies.addImport("js", "@eslint/js");

    const value = dependencies.resolve();
    expect(value).toEqual(`const jsdoc = require('eslint-plugin-jsdoc');
const js = require('@eslint/js');`);
  });

  test("subvalues", () => {
    const dependencies = new JavascriptDependencies({ cjs: true });
    dependencies.addImport(["subValue1, subValue2"], "eslint-plugin-jsdoc");
    dependencies.addImport(["t1", "t2"], "@eslint/js");

    const value = dependencies.resolve();
    expect(value)
      .toEqual(`const { subValue1, subValue2 } = require('eslint-plugin-jsdoc');
const { t1, t2 } = require('@eslint/js');`);
  });

  test("default export and subvalues", () => {
    const dependencies = new JavascriptDependencies({ cjs: true });
    dependencies.addImport("jsdoc", "eslint-plugin-jsdoc");
    dependencies.addImport(["subValue1", "subValue2"], "eslint-plugin-jsdoc");
    dependencies.addImport("js", "@eslint/js");
    dependencies.addImport(["t1", "t2"], "@eslint/js");

    const value = dependencies.resolve();
    expect(value).toEqual(`const jsdoc = require('eslint-plugin-jsdoc');
const { subValue1, subValue2 } = jsdoc;
const js = require('@eslint/js');
const { t1, t2 } = js;`);
  });
});
