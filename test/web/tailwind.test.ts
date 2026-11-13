import { NodeProject } from "../../src/javascript";
import { TailwindConfig } from "../../src/web";
import { synthSnapshot } from "../util";

test("defaults", () => {
  const project = new NodeProject({
    name: "test",
    defaultReleaseBranch: "main",
  });
  new TailwindConfig(project);

  const out = synthSnapshot(project);
  expect(out["tailwind.config.json"]).toMatchObject({
    content: [],
    media: false,
    theme: {
      extend: {},
    },
    variants: {
      extend: {},
    },
    plugins: [],
  });
});

test("custom file name", () => {
  const project = new NodeProject({
    name: "test",
    defaultReleaseBranch: "main",
  });
  new TailwindConfig(project, { fileName: "custom-tailwind.config.json" });

  const out = synthSnapshot(project);
  expect(out["custom-tailwind.config.json"]).toBeDefined();
  expect(out["tailwind.config.json"]).toBeUndefined();
});
