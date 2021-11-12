# Bundling

The `Bundler` component (for Node.js projects) can be used to produce JavaScript
bundles from source files.

It is included by default in all projects derived from `NodeProject`.

To customize, use `bundlerOptions`:

```ts
const project = new NodeProject({
  esbuildVersion: '^0.13.13', // default to "latest"
  assetsDir: 'resources', // defaults to "assets"

  // default bundling options. these can be overridden in
  // subsequent calls to `addBundle()`.
  defaults: {
    externals: ['aws-sdk'], // modules not to include in bundles
    sourcemap: true, // default is false
    watchTask: false, // should we create a "bundle:watch" task for each bundle
  }
});
```

To add bundles, call `bundler.addBundle()`:

```ts
project.bundler.addBundle('name-of-bundle', {
  entrypoint: 'src/foo.ts',
  target: 'node14',
  platform: 'node',
  externals: ['request']
});
```
