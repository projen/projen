import * as semver from "semver";
import { Artifacts, CiConfiguration, Job } from ".";
import { Component, Project } from "..";
import { Tools, Workflow } from "../workflows";

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
        const script = new Array<string>();
        // ?? readonly mutable?: boolean;
        // ?? readonly download?: string[];
        // ?? readonly checkout?: boolean;
        // readonly exports?: string[];

        script.push(`apk add --update git bash rsync`);
        script.push(...setupAlpineTools(job.options.tools));
        script.push(...(job.options.steps?.map((s) => s.run) ?? []));

        if (job.options.upload) {
          artifacts.paths = job.options.upload;
        }

        const exports = job.options.exports ?? [];
        const exportsFile = ".exports.env";

        if (exports.length) {
          artifacts.reports = {
            dotenv: [exportsFile],
          };

          for (const e of exports) {
            script.push(`echo "${e}=\"\$${e}\"" >> ${exportsFile}`);
          }
        }

        const image = job.options.image ?? "alpine";

        const j: Job = {
          image: image ? { name: image } : undefined,
          needs: job.options.needs ?? [],
          variables: job.options.env,
          artifacts: artifacts,
          script: script,
        };

        ci.addJobs({ [job.name]: j });
      }
    }
  }
}

function setupAlpineTools(tools: Tools | undefined): string[] {
  if (!tools) {
    return [];
  }

  const clone = { ...tools };

  const script: string[] = [];

  if (clone.node) {
    script.push(`apk add --update nodejs npm yarn`);
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
