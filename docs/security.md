---
sidebar_position: 90
---

# Security

This page describes the security model of projen: what projen is responsible
for, what you are responsible for, and how to reason about the files projen
synthesizes and executes.

## Shared responsibility model

projen generates project configuration files and executes development workflows
from a well-typed program that you write. Responsibility for security is shared
between projen and you.

### Security of default generated configuration

*(projen's responsibility)* Built-in project types and components are designed
to generate configuration that follows reasonable security defaults — for
example, GitHub workflows with scoped-down permissions, anti-tamper checks in
CI, and pinned or controlled dependency upgrade workflows. Any violation of
this expectation can be reported through our
[vulnerability reporting process](https://github.com/projen/projen/security/policy).

### Security of your project

*(Your responsibility)* projen synthesizes whatever your `.projenrc` program
describes. If your program (or a third-party project type or component you
depend on) defines insecure configuration — overly broad workflow permissions,
secrets in plaintext files, tasks that run untrusted code — projen will
faithfully synthesize it. Review the project types and components you use, and
the files they generate, like you would review any other code.

## Execution in a trusted environment

*(Your responsibility)* projen is designed to run in a *trusted environment*
with *trusted inputs*. Running projen means executing code:

- Your `.projenrc.js` / `.projenrc.ts` / `.projenrc.py` / `.projenrc.java` / etc.
  file is a program that is executed with your user's permissions whenever you run
  `projen`.
- External project types and components (e.g. installed from npm via
  `projen new --from`) are code that runs inside that program.
  You must trust them.
- projen tasks execute shell commands on your machine and in your CI
  environment.

It is your responsibility to ensure that the projenrc code, the libraries it
loads (including those downloaded from the internet via package managers),
and any inputs to it are trustworthy. This is the same trust model
as any other build tool: running `make`, `npm run`, or a projen task in a
repository implies trusting the contents of that repository.

## `tasks.json` is a prescriptive file

Tasks are stored in `.projen/tasks.json` and executed by the projen CLI
(`projen <task-name>`). This includes the *default* task: running `projen`
with no arguments executes the `default` task defined in `tasks.json`, which
runs your projenrc program. The file is *prescriptive* by design: the CLI
reads it and executes the shell commands it contains, without validating where
they came from.

This means:

- **Anyone with write access to `.projen/tasks.json` can change what projen
  runs.** This is expected behavior, not a vulnerability. It is equivalent to
  write access to a `Makefile`, `package.json` scripts, or any other build
  script in your repository. Review diffs to synthesized files like
  `.projen/tasks.json` and generated workflows as you would any other
  build script.
- While `tasks.json` is normally synthesized from your projenrc file, the CLI
  cannot verify that it is unmodified. A locally modified `tasks.json` is
  executed as-is. Note that synthesis itself runs through the `default` task
  in this file, so you cannot rely on re-running `projen` to restore a
  tampered file — if in doubt, restore `.projen/` from source control first.
- Write access to your repository implies the ability to change what projen
  tasks run — just like editing `package.json` scripts or a `Makefile`. Apply
  the usual CI practices: for example, require approval before running
  workflows for first-time contributors, and don't expose secrets to workflows
  triggered by untrusted pull requests.

Reports that modifying `tasks.json` (or other synthesized files, such as
GitHub workflows) leads to command execution are therefore not considered
security vulnerabilities: executing what these files prescribe is their
purpose.

## Reporting security issues

If you discover a potential security issue in projen itself — for example,
built-in project types generating insecure defaults, or projen executing code
outside the documented trust model — please report it through the
[projen security policy](https://github.com/projen/projen/security/policy)
rather than a public GitHub issue.
