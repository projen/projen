# Docs

The docs for projen are managed in this directory and are powered by [docusaurus](https://docusaurus.io/).


## Running the docusaurus server

```bash
yarn
yarn start
```

## Builds API docs

Generated API docs are committed to the repo, but if you've been making changes and would like to see how they're
reflected in the docs, you can generate them:

```bash
$ yarn docgen
```

This will generate the API docs in `docs/docs/api`.

## Contributing

Follow the [docusaurus docs](https://docusaurus.io/docs/en/navigation) to learn how to edit the docs.
