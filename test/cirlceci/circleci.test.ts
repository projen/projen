import * as YAML from "yaml";
import { Circleci, CircleCiProps } from "../../src/circleci";
// @ts-ignore
import { synthSnapshot, TestProject } from "../util";

test("full spec of api should be provided", () => {
  // GIVEN
  const p = new TestProject();
  const options: CircleCiProps = {
    orbs: {
      hello: "world:2.0",
    },
    workflows: [
      {
        identifier: "workflow1",
        triggers: [
          {
            schedule: {
              cron: "0 0 * * *",
              filters: {
                branches: {
                  only: ["main", "beta"],
                },
              },
            },
          },
        ],
        jobs: [
          {
            identifier: "job1",
            name: "renamedJob2",
            matrix: {
              parameters: {
                version: ["0.1", "0.2", "0.3"],
                platform: ["macos", "windows", "linux"],
              },
            },
          },
        ],
      },
    ],
  };
  new Circleci(p, options);
  const snapshot = synthSnapshot(p);
  const circleci = snapshot[".circleci/config.yml"];
  const yaml = YAML.parse(circleci);

  expect(circleci).toMatchSnapshot();
  expect(circleci).toContain("renamedJob2");
  expect(circleci).toContain("0 0 * * *");
  expect(circleci).toContain("windows");
  expect(yaml).toHaveProperty("orbs.hello");

  console.log(circleci);
});

test("additional workflow can be added", () => {
  // GIVEN
  const p = new TestProject();
  const options: CircleCiProps = {
    orbs: {
      hello: "world:2.0",
    },
    workflows: [
      {
        identifier: "workflow1",
        jobs: [
          {
            identifier: "job1",
            context: ["context1"],
          },
          {
            identifier: "job2",
            name: "customName2",
          },
        ],
      },
    ],
  };
  const circle = new Circleci(p, options);
  circle.addWorkflow({
    identifier: "workflow3",
    jobs: [{ identifier: "job3", context: ["context3"] }],
  });
  const snapshot = synthSnapshot(p);
  const circleci = snapshot[".circleci/config.yml"];
  expect(circleci).toMatchSnapshot();
  expect(circleci).toContain("customName2");
  expect(circleci).toContain("context3");
  console.log(circleci);
});

test("orb with the same id can not be added", () => {
  // GIVEN
  const p = new TestProject();
  const options: CircleCiProps = {
    orbs: {
      hello: "world:2.0",
    },
    workflows: [
      {
        identifier: "workflow1",
        jobs: [
          {
            identifier: "job1",
            name: "renamedJob2",
          },
        ],
      },
    ],
  };
  const circle = new Circleci(p, options);
  expect(() => circle.addOrb("hello", "world:3.0")).toThrowError(
    "Circleci Config already contains an orb named hello."
  );

  const snapshot = synthSnapshot(p);
  const circleci = snapshot[".circleci/config.yml"];
  expect(circleci).toMatchSnapshot();
  expect(circleci).toContain("workflow1");
  expect(circleci).toContain("world:2.0");
  expect(circleci).not.toContain("world:3.0");
  console.log(circleci);
});
