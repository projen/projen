# AWS CDK Applications

Project types: `awscdk-app-java`, `awscdk-app-py`, `awscdk-app-ts`.

## Deployment (NOT IMPLEMENTED YET)

CDK application projects produce complete cloud applications. When a commit is
merged into the default branch, the app is rolled out by the release workflow to
AWS environments.

## Dev Stage (NOT IMPLEMENTED YET)

Every app includes an instance of the application stage which can be deployed to
a development AWS account. This allows each developer to use their AWS account
as part of their development environment.
