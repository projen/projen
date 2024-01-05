# Docs

The docs for projen are managed in this directory and are powered by [docusaurus](https://docusaurus.io/).

## Builds API docs

Before running the docs locally, you need to build the API docs. Do this from the root of the projen repo:

```bash
$ yarn docgen
```

This will generate the API docs in `docusaurus/docs/api`.

## Running the docusaurus server

```bash
yarn
yarn start
```

## Contributing

Follow the [documentation docs](https://docusaurus.io/docs/en/navigation) to learn how to edit the docs.
