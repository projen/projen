import { GitlabConfiguration, Image, Sequence } from "../../src/gitlab"
import { synthSnapshot, TestProject } from '../util'

test("create documentation example project", () => {
    class PublishApp extends Sequence {
        public constructor(environment: string) {
            super()
            this.stageToPrepend = environment
            this.addChildren({
                job1: { script: ["build my app"], stage: "build" },
                job2: { script: [`upload to ${environment}`], stage: "deploy" }
            })
        }
    }

    const project = new TestProject()
    const config = new GitlabConfiguration(project)

    const publish_dev = new PublishApp("dev")
    const publish_prd = new PublishApp("prd")

    const buildImage: Image = { name: "mycompany/buildimage:latest" }
    publish_dev.imageToInit = buildImage
    publish_prd.imageToInit = buildImage

    publish_dev.tagsToAdd = ["dev-runner"]
    publish_prd.tagsToAdd = ["prd-runner"]

    config.addJobs({ dev: publish_dev, prd: publish_prd })

    expect(synthSnapshot(project)[".gitlab-ci.yml"]).toMatchSnapshot();
})