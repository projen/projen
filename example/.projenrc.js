const { CircleCi, Project, Orb, Workflow, FilterMainBranchOnly } = require('projen');

const project = new Project({
    name: 'projen-exanple',
});

const circle = new CircleCi(project, {
    orbs: [
        new Orb('cdk', 'signavio/cdk-orb', '0.10.8' ),
    ],
});

const jobs = [
    {
        name: 'cdk/test',
        context: ['NPM'],
    },
    {
        name: 'cdk/sonarqube',
        context: ['NPM', 'Sonarqube'],
        requires: ['cdk/test'],
    },
    {
        name: 'cdk/publish',
        requires: ['cdk/test'],
        context: ['npm-github'],
        filters: FilterMainBranchOnly,
    },
]

circle.addWorkflow(new Workflow('asd'))

const envs = [
    {
        name: "staging_eu",
        accountId: "123"
    },
    {
        name: "staging_uk",
        accountId: "1234"
    }
]

for (const env of envs) {
    // common
    const defaults = {
        context: [
            'npm-github',
            'CDK',
        ],
        args: `-c environment=${env.name} -c acccount=${env.accountId}`
    }

    // cdk diff job
    jobs.push({
        name: 'cdk/deploy',
        params: {
            'name': `diff-${env.name}`,
            'account-id': env.accountId,
            command: 'diff',
            'post-diff': true,
        },
        requires: ['cdk/test'],
        ...defaults,
    })
    // cdk deploy job
    jobs.push({
        name: 'cdk/deploy',
        params: {
            'name': `deploy-${env.name}`,
            'account-id': env.accountId,
            'enable-docker': true,
            command: 'deploy',
            'post-diff': true,
        },
        requires: [
            'cdk/test',
            `diff-${env.name}`,
        ],
        ...defaults,
        filters: FilterMainBranchOnly,
    })
}


circle.addWorkflow(new Workflow('build', jobs));
project.synth();
