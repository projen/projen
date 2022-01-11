import * as semver from "semver";
import {
  Artifacts,
  CacheWhen,
  CiConfiguration,
  IncludeRule,
  Job,
  JobWhen,
} from ".";
import { Component, Project } from "..";
import { ConditionSpec, Tools, Workflow } from "../workflows";

type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export class WorkflowProvider extends Component {
  constructor(project: Project) {
    super(project);
  }

  public synthesize(): void {
    super.synthesize();

    for (const workflow of Workflow.findAll(this.project)) {
      const ci = new CiConfiguration(this.project, "gitlab-ci");

      for (const job of workflow.jobs) {
        const artifacts: Writeable<Artifacts> = {};
        const commands = new Array<string>();
        const image = job.options.image ?? "alpine";
        const afterScript = new Array<string>();
        // ?? readonly mutable?: boolean;
        // ?? readonly download?: string[];
        // ?? readonly checkout?: boolean;
        // readonly exports?: string[];

        commands.push(`apk add --update git bash rsync`);
        commands.push(...setupAlpineTools(job.options.tools));
        commands.push(...(job.options.steps?.map((s) => s.run) ?? []));

        if (job.options.upload) {
          artifacts.paths = job.options.upload;
          artifacts.when = CacheWhen.ALWAYS;
        }

        const exports = job.options.exports ?? [];
        const exportsFile = ".exports.env";

        if (exports.length) {
          artifacts.reports = {
            dotenv: [exportsFile],
          };

          for (const e of exports) {
            afterScript.push(`echo "${e}=\"\$${e}\"" >> ${exportsFile}`);
          }
        }

        const renderCondition = (spec?: ConditionSpec): string | undefined => {
          if (!spec || Object.keys(spec).length === 0) {
            return undefined;
          }

          if (spec.always) {
            return `true`;
          }

          if (spec.and) {
            return spec.and
              .map((c) => `${renderCondition(c.spec)}`)
              .join(" && ");
          }

          if (spec.isFork) {
            return `false`; // not supported at the moment, so we just assume it's false
          }

          if (spec.not) {
            return `! ${renderCondition(spec.not.spec)}`;
          }

          if (spec.isOutputDefined) {
            return `[ -n "$${spec.isOutputDefined.output}" ]`;
          }

          throw new Error(`unsupported condition ${JSON.stringify(spec)}`);
        };

        const condition: Writable<ConditionSpec> = {
          ...job.options.condition?.spec,
        };

        // if we have _any_ conditions, we want this job to ALWAYS run because
        // we only evaluate the condition in the `script` section of the job.
        const rules: IncludeRule[] | undefined =
          Object.keys(condition).length > 0
            ? [{ when: JobWhen.ALWAYS }]
            : undefined;

        const script = new Array<string>();

        const condVar = "__cond__";
        const cond = renderCondition(condition);
        if (cond) {
          script.push(
            [
              `if ${cond}; then`,
              `  ${condVar}=true`,
              `else`,
              `  echo "Job skipped"`,
              `  ${condVar}=false`,
              `fi`,
            ].join("\n")
          );
        }

        for (const c of commands) {
          if (cond) {
            script.push(`$\{${condVar}\} && (${c})`);
          } else {
            script.push(c);
          }
        }

        const j: Job = {
          image: image ? { name: image } : undefined,
          needs: job.options.needs ?? [],
          rules: rules,
          variables: job.options.env,
          artifacts: artifacts,
          script: script,
          afterScript: afterScript,
        };

        ci.addJobs({ [job.name]: j });
      }
    }
  }
}

function setupAlpineTools(tools: Tools | undefined): string[] {
  const clone: Writeable<Tools> = { ...tools };

  const script: string[] = [];

  // always install node.js
  script.push(`apk add --update nodejs npm yarn`);

  if (clone.node) {
    delete clone.node;
  }

  if (clone.java) {
    if (semver.minVersion(clone.java.version)?.major !== 11) {
      throw new Error(`Only Java 11 is supported`);
    }
    script.push(`apk add --update openjdk11-jre`);
    delete clone.java;
  }

  if (clone.python) {
    if (semver.minVersion(clone.python.version)?.major !== 3) {
      throw new Error(`Only Python 3 is supported`);
    }

    script.push(`apk add --update python3`);
    delete clone.python;
  }

  if (clone.go) {
    script.push(`apk add --update go`);
    delete clone.go;
  }

  if (Object.keys(clone).length > 0) {
    throw new Error(`Unknown tools: ${JSON.stringify(clone)}`);
  }

  return script;
}

type Writable<T> = {
  -readonly [K in keyof T]: T[K];
};
