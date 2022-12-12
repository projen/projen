# Projen
Define and maintain complex project configuration through code.

Documentation · Changelog · Project types · Join the community

Apache 2.0 License Gitpod ready-to-code Build badge Release badge Commit activity


Projen synthesizes project configuration files such as package.json, tsconfig.json, .gitignore, GitHub Workflows, eslint, jest, etc from a well-typed definition written in JavaScript.

As opposed to existing templating/scaffolding tools, projen is not a one-off generator. Synthesized files should never be manually edited (in fact, projen enforces that). To modify your project setup, users interact with rich strongly-typed class and execute projen to update their project configuration files.

By defining a custom project type and using projen in multiple repositories, it's possible to update configuration files and CI/CD workflows across dozens (or hundreds!?) of projects.

Check out this talk about projen from its creator.

![type:video](https://www.youtube.com/embed/SOWMPzXtTCw)

## API Reference

* [TypeScript](api/API.md)
