import { Component } from "../component";
import { Condition, Workflow } from "../workflows";
import { GitHub } from "./github";
import { JobPermission, JobStep, JobStepOutput } from "./workflows-model";

const PULL_REQUEST_REF = "${{ github.event.pull_request.head.ref }}";
const PULL_REQUEST_REPOSITORY =
  "${{ github.event.pull_request.head.repo.full_name }}";

export class WorkflowProvider extends Component {
  public synthesize(): void {
    const github = GitHub.of(this.project);
    if (!github) {
      return;
    }

    for (const workflow of Workflow.findAll(this.project)) {
      const wf = github.addWorkflow(workflow.name);

      if (workflow.triggers.pullRequest) {
        wf.on({ pullRequest: {} });
      }

      if (workflow.triggers.manual) {
        wf.on({ workflowDispatch: {} });
      }

      for (const job of workflow.jobs) {
        const outputs: Record<string, JobStepOutput> = {};
        const steps: JobStep[] = [];

        if (job.options.checkout) {
          steps.push({
            name: "Checkout",
            uses: "actions/checkout@v2",
            with: {
              token: job.options.push
                ? `\${{ secrets.${wf.projenTokenSecret} }}`
                : undefined,
              ref: PULL_REQUEST_REF,
              repository: PULL_REQUEST_REPOSITORY,
            },
          });
        }

        for (const path of job.options.download ?? []) {
          steps.push({
            name: `Download ${path}`,
            uses: "actions/download-artifact@v2",
            with: {
              name: path,
              path: path,
            },
          });
        }

        for (const step of job.options.steps ?? []) {
          steps.push({
            name: step.title,
            run: step.run,
          });
        }

        for (const path of job.options.upload ?? []) {
          steps.push({
            if: "always()",
            name: `Prepare artifact directory "${path}"`,
            run: [
              `if [ ! -e ${path} ]; then`,
              `  mkdir -p ${path}`,
              `  touch ${path}/.empty`,
              `elif [ ! -d ${path} ]; then`,
              `  echo "Artifact in "${path}" must be a directory"`,
              `  exit 1`,
              `fi`,
            ].join("\n"),
          });

          steps.push({
            name: `Upload ${path}`,
            uses: "actions/upload-artifact@v2",
            if: "always()",
            with: { name: path, path: path },
          });
        }

        if (job.options.push) {
          steps.push({
            name: "Push changes",
            run: `git push origin HEAD:${PULL_REQUEST_REF}`,
          });
        }

        const renderCondition = (c?: Condition): string | undefined => {
          if (!c) {
            return undefined;
          }

          const spec = c.spec;

          if (spec.always) {
            return `always()`;
          }

          if (spec.and) {
            return spec.and.map((x) => `(${renderCondition(x)})`).join(" && ");
          }

          if (spec.isFork) {
            return "github.event.pull_request.head.repo.full_name != github.repository";
          }

          if (spec.isOutputDefined) {
            return `needs.${spec.isOutputDefined.job}.outputs.${spec.isOutputDefined.output}`;
          }

          if (spec.not) {
            return "! (" + renderCondition(spec.not) + ")";
          }

          return undefined;
        };

        wf.addJob(job.name, {
          runsOn: ["ubuntu-latest"],
          container: job.options.image
            ? { image: job.options.image }
            : undefined,
          if: renderCondition(job.options.condition),
          env: job.options.env,
          needs: job.options.needs,
          tools: job.options.tools,
          permissions: {
            contents: job.options.push
              ? JobPermission.WRITE
              : JobPermission.READ,
          },
          steps: steps,
          outputs: Object.keys(outputs).length ? outputs : undefined,
        });
      }
    }
  }
}
