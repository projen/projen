# CDK8s Projects

We support two types of projects for Kubernetes powered by the CDK8s:
**apps** and **libraries**. Apps represent complete Kubernetes applications
while libraries vend constructs which can be consumed by other libraries or
by apps. Libraries are published to public or internal package managers (npm,
PyPI, Maven, NuGet, etc) while apps are deployed into Kubernetes clusters.

This section describes features that are available in both CDK8s libraries and
applications.

## Integration Snapshot Tests

Files in the `test/` tree with the `.integ.ts` suffix are recognized as
*integration snapshot tests*.

Each test is a simple CDK8s app which exercises certain construct(s) within
the project. A test is considered passing if the app can be successfully
deployed.

To create/update the snapshot, developers are expected to execute the task
`integ:NAME:deploy` with a kubectl configuration for their personal development
environment, such as K3s, Microk8s, Kind, Rancher Desktop, or otherwise. This
task will deploy the test app by applying it with kubectl. Upon successful
deployment (i.e. the test passed), the snapshot will be captured and stored
under a directory called `xxx.integ.snapshot` next to the test entrypoint. This
directory should be committed to the repository.

During builds (either local or within a workflow), the task `integ:NAME:assert`
will be executed. This task synthesizes the test app and compares the output to
the captured snapshot. The build will fail if the output differs.

For each integration test, the following set of tasks are created:

|Task|Description|
|----|-----------|
|`integ:NAME:deploy`|Deploys the test app and updates the snapshot.|
|`integ:NAME:assert`|Synthesizes the test app and compares it with the snapshot (this is the task that runs during build)|
|`integ:NAME:snapshot`|Synthesizes the test app and updates the snapshot (not recommended to use because it bypasses deployment).|