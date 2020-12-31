projen

# projen
- [projen](#projen)
  - [0](#0)
  - [1](#1)
  - [2](#2)
  - [3](#3)
  - [4](#4)
  - [5](#5)
  - [6](#6)
  - [7](#7)
  - [8](#8)
  - [9](#9)
  - [10](#10)
  - [11](#11)

## Summary

Define and maintain complex project configuration through code.

> JOIN THE [#TemplatesAreEvil](https://twitter.com/hashtag/templatesareevil) MOVEMENT!

projen synthesizes project configuration files such as `package.json`,
`tsconfig.json`, `.gitignore`, GitHub Workflows, `eslint`, `jest`, etc from a
well-typed definition written in `JavaScript`.

Check out [this talk](https://www.youtube.com/watch?v=SOWMPzXtTCw&feature=youtu.be) about projen and the GitHub [Awesome List](https://github.com/p6m7g8/awesome-projen/blob/main/readme.md).

As opposed to existing templating/scaffolding tools, projen is not a one-off
generator. Synthesized files should never be manually edited (in fact, projen
enforces that). To modify your project setup, users interact with rich
strongly-typed class and execute projen to update their project configuration
files.

## Usage

[USAGE](undefined)


## Code of Conduct

[Code of Conduct](CODE_OF_CONDUCT.md)


## Contributing

To check out a development environment:

$ git clone git@github.com:projen/projen
$ cd projen
$ yarn

## Changelog

[CHANGELOG](CHANGELOG.md)

## License

Distributed under the XXXNodeProjectXXX license

## Roadmap

> A non-exhaustive list of ideas/directions for projen

- [ ] Multi-language support: ideally projenrc should be in the same language as your application code.
- [ ] External components & projects: `projen new` should be able to list project types from registered 3rd party modules so we can grow the ecosystem easily.
- [ ] Components: re-think/re-factor how components and projects interact to allow more modular and composable usage.
- [ ] Discoverability of external components/modules through the CLI
- [ ] Support projenrc in YAML (fully declarative, if one desires)
- [ ] `projen SCRIPT`: make the CLI extensible so it can become _the_ project entrypoint (instead of e.g. `yarn`/`npm`, etc).
- [ ] CLI bash & zsh completion

## Vision

[VISION](VISION.md)


## Author

[Author](AUTHOR.md)


## Badges



