# The vision of projen

This is basically a paper napkin for ideas for the roadmap for the project. Comments/PRs are more than welcome!

## Ecosystem

"Batteries included" is a very powerful concept. It allows users to discover the breadth of their options using a
single experience, instead of having to read the manual for 4 different plugins with horrible versioning conflicts.

On the other hand, one of the goals of projen is to support the ever-increasing amount of tools people use in order to build software,
and to allow teams to use projen internally for their needs and to do that, we must have an open ecosystem which allows anyone to
freely publish and consume components and projects.

So we need to solve a few problems:

- Discovery: projects/components from ecosystem libraries should feel 1st class.
- Velocity: a single codebase can easily manage breaking changes in APIs, but it's much harder to do that at the
  ecosystem level, and usually a source of a lot of frustration.

### Discovery

The desired experience is that `projen new --help` will list all public project types, including types from ecosystem libraries.

A simple solution that may go a long way is to create a "sources" file in the projen repo, and allow anyone to add their library
to the file through a pull request. The source list will be basically names of npm modules. During _build_, we will process this
list by downloading the package information from npm, and injest their `.jsii` manifests into the CLI.

Yes, this means that new sources will be added only when projen is released. But projen is released for every merged PR.

We will also need to indicate major version compatibility of each project/component (see "Velocity" below).

### Velocity

In semver (semantic versioning), the only right way to introduce a breaking change (API or behavioral) is to release 
a new major version. It will take a couple of years for projen to stabilize, and we want the ecosystem to grow with it. 
A monolithic module makes this less of a problem because there aren't many libraries that depend on projen, so a major
version once in a while is tolerable.

This means that projen will release major versions all the time. Think 232.4.34. 

So we need our ecosystem to continuously take updates and release new versions that were tested with the new major version. 
In most cases, projects and component won't get broken, but sometimes they will and then the maintainer will need to resolve.
Luckily this mechanism already exists in projen (`projenUpgradeSecret`). 
It is opt-in because it requires a the user to upload a GitHub secret, but maybe if we implement some support for secret management, 
we could make that the default behavior.

As mentioned above, when we process our "sources" during build, we can check the projen version they were tested with and
determine if it's compatible with the version on the user's system.

## Services

projen should be able to deploy & manage cloud services related to your development environment. For example,
a service to manage secrets for me in AWS Secrets Manager, a cloud development account, CI/CD infrastructure, etc.

Using the CDKs (AWS CDK, CDK for Terraform, CDK for Kubernetes), complete services can be expressed as constructs
and shared and published as libraries. It is fairly easy (#) to simply allow CDK constructs to be freely used
inside projen components.

## Ideas

- [ ] Components: re-think/re-factor how components and projects interact to allow more modular and composable usage.
- [ ] Discoverability of external components/modules through the CLI
- [ ] Support projenrc in YAML (fully declarative, if one desires)
- [ ] CLI bash completion
