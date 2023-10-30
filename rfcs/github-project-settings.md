# External GitHub Repository Settings (RFC #1014)

> **Author**: [@eladb](https://github.com/eladb), **Status**: Draft

Projen is great for managing project-related configuration that is modeled in
files within the git repository. Much of GitHub's configuration (such as issue
templates, workflows, etc) is managed through files under `.github` and to that
extend, projen lends itself well to maintain these files.

However, there are some GitHub repository settings that are not managed through
files in the repos. These include things like branch protection rules,
auto-merge options, and most noteable are repository secrets. Projen heavily
relies on repository secrets for things like publishing tokens.

When maintaining many projects, managing publishing secrets becomes a major
burden. It is also error prone and has potential security implications. Ideally
these secrets should be managed by tooling and not by humans.

GitHub offers some support for centrally managing secrets but these require
organization-level permissions which are not always available.

## README (working backwards)

Let’s say we have a JSII project. By default, it does not publish to PyPI. Let's
add Python publishing to our project.

First, we need edit your `projenrc.js` file and add the `publishToPyPi` setting.
Additionally, set the `secrets` option to tell Projen to retrieve secrets from
AWS Secrets Manager (in the future other secret sources will be supported):

```js
const projen = require('projen');

const project = new projen.JsiiProject({
  // ...
  
  secrets: projen.Secrets.fromAwsSecretsManager('arn:aws:secretsmanager:us-east-1:111111111111:secret:projen-publishing-tokens'),
  publishToPyPi: {
    distName: 'foo-bar',
    module: 'foo_bar',
  },
});
```

> NOTE: not sure I like the union-like API, but we can debate that later.

Now, as usual, execute `npx projen`.

Under the hood, projen uses `gh secret list` to check if your repo has the
desired secrets. If not, it will retrieve them from AWS Secrets Manager and
store them in your repository via the GitHub API.

```shell
$ npx projen
Synthesizing project...
Storing TWINE_USERNAME from arn:aws:secretsmanager:us-east-1:111111111111:secret:projen-publishing-tokens
Storing TWINE_PASSWORD from arn:aws:secretsmanager:us-east-1:111111111111:secret:projen-publishing-tokens
Done
```

_not sure that’s feasible:_ You will also notice that your
`.github/workflows/release.yml` workflow was updated and now includes a check
that verifies that your repository has the desired secrets. This is sort of an
"anti-tamper check" for external settings. If your repository does not have the
needed secrets, an error will be displayed with instructions on how to store
them.

A similar approach can be taken to configure other non-source-code repository
settings such as branch protection rules:

```js
# this should be the default probably
project.addBranchProtection(project.defaultBranch);
```

Similarly, during synth, given the proper credentials, projen can actually setup
the project to align with the definition and a workflow on the default branch
can be used to ensure that the project is compliant.

**Prerequisites:** For this to work, you'll need your development box to have
GitHub CLI installed and logged in, as well as default AWS credentials with
access to a secret called `projen-publishing-token` secret in `us-east-1` (as
defined by the ARN specified under `secrets`). Projen expects to find a field by
the same name as the secret name (e.g. `TWINE_USERNAME` and `TWINE_PASSWORD`)
stored in JSON format in the secret. Secrets can be stored using the AWS CLI or
via the AWS Console.

In the future we can offer a CLI command to store secrets:

```shell
$ projen secrets store TWINE_USERNAME "Boom"
$ projen secrets store TWINE_PASSWORD "Bam"
```

Something like that.
