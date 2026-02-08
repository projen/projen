import * as YAML from "yaml";
import { WorkflowJob } from "../../lib/circleci";
import {
  Circleci,
  CircleCiProps,
  isObjectContainingFieldExactly,
  PipelineParameterType,
} from "../../src/circleci";
// @ts-ignore
import { synthSnapshot, TestProject } from "../util";

test("full spec of api should be provided", () => {
  // GIVEN
  const p = new TestProject();
  const options: CircleCiProps = {
    orbs: {
      hello: "world:2.0",
    },
    jobs: [
      {
        identifier: "custom-job-1",
        docker: [
          {
            image: "golang:alpine",
            environment: {
              GO111MODULE: true,
            },
          },
        ],
        workingDirectory: ".",
        machine: {
          image: "node:alpine",
        },
        steps: [
          "checkout",
          {
            run: {
              command: ["echo $HELLOW_WORLD", "echo this is multiline"].join(
                "\n",
              ),
            },
          },
        ],
        parameters: {
          job1Param: {
            description: "job1Param description",
            type: PipelineParameterType.STRING,
            default: "job1Param default",
          },
        },
        circleciIpRanges: true,
      },
    ],
    workflows: [
      {
        identifier: "workflow1",
        when: {
          or: [
            { equal: ["main", "<< pipeline.git.branch >>"] },
            { equal: ["staging", "<< pipeline.git.branch >>"] },
          ],
        },
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
            orbParameters: {
              "install-yarn": true,
              node_version: 16.13,
            },
            matrix: {
              parameters: {
                version: [0.1, 0.2, 0.3],
                platform: ["macos", "windows", "linux"],
              },
            },
          },
          {
            identifier: "checkout",
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
  const wJob = yaml.workflows.workflow1.jobs[0].job1;
  // testing orb parameters and snake case should be ignored here
  expect(wJob).toEqual(
    expect.objectContaining({
      "install-yarn": true,
      node_version: 16.13,
    }),
  );

  const customJob = yaml.jobs["custom-job-1"];
  expect(customJob.docker[0].image).toEqual("golang:alpine");
  expect(customJob.machine.image).toEqual("node:alpine");
  expect(customJob.circleci_ip_ranges).toEqual(true);
  expect(customJob.steps).toHaveLength(2);
  expect(customJob.steps).toContain("checkout");
  expect(customJob).toEqual(
    // test snake case
    expect.objectContaining({ working_directory: "." }),
  );
  expect(customJob).toEqual(
    // test parameters
    expect.objectContaining({
      parameters: {
        job1Param: {
          description: "job1Param description",
          type: "string",
          default: "job1Param default",
        },
      },
    }),
  );
});

test("test type conversion for workflow jobs with identifier only", () => {
  const job1: WorkflowJob = {
    identifier: "checkout",
  };
  const job2: WorkflowJob = {
    identifier: "checkout",
    name: "hello-world",
  };
  expect(isObjectContainingFieldExactly(job1, "identifier")).toEqual(true);
  expect(isObjectContainingFieldExactly(job2, "identifier")).toEqual(false);
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
  expect(() => circle.addOrb("hello", "world:3.0")).toThrow(
    "Circleci Config already contains an orb named hello.",
  );

  const snapshot = synthSnapshot(p);
  const circleci = snapshot[".circleci/config.yml"];
  expect(circleci).toMatchSnapshot();
  expect(circleci).toContain("workflow1");
  expect(circleci).toContain("world:2.0");
  expect(circleci).not.toContain("world:3.0");
});
