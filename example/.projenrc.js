const { Project, circleci, LogLevel } = require('projen');

const project = new Project({
    name: 'projen-example',
    logging: {
        level: LogLevel.DEBUG
    }
});

// project.addGitIgnore("/yarn.lock")
new circleci.Circleci(project, {
    enabled: true,
    orbs: {
        hello: "world:2.0"
    },
    workflows: [
        {
            identifier: "workflow1",
            jobs: [
                {
                    identifier: "job1",
                    context: [
                        "npm",
                        "github"
                    ],
                },
                {
                    identifier: "job3",
                    context: [
                        "test"
                    ]
                }
            ]
        }
    ]
});
project.synth();
