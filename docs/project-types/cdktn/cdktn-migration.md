# Migrating from CDKTF to CDKTN

This guide helps you migrate your projen project from using `ConstructLibraryCdktf` to `ConstructLibraryCdktn`. See the [CDKTN Projects](./index.md) page for background on why CDKTF was replaced and how the two classes differ.

## Migration Steps

### 1. Update your .projenrc file

If you're using TypeScript (.projenrc.ts):

```typescript
// Before
import { cdktf } from 'projen';

new cdktf.ConstructLibraryCdktf({
  author: 'Your Name',
  authorAddress: 'you@example.com',
  cdktfVersion: '^0.13.0',
  defaultReleaseBranch: 'main',
  name: 'my-cdktf-construct',
  repositoryUrl: 'https://github.com/yourusername/my-cdktf-construct.git',
  // ... other options
});
```

```typescript
// After
import { cdktn } from 'projen';

new cdktn.ConstructLibraryCdktn({
  author: 'Your Name',
  authorAddress: 'you@example.com',
  cdktnVersion: '^0.24.0',  // Changed from cdktfVersion
  defaultReleaseBranch: 'main',
  name: 'my-cdktn-construct',
  repositoryUrl: 'https://github.com/yourusername/my-cdktn-construct.git',
  // ... other options
});
```

:::note
If your existing project already has a working `jsii` version pinned, leave
`jsiiVersion` unset so it carries over. If you're setting it explicitly (or
hit an `npm install` ERESOLVE error mentioning `jsii`), use `jsiiVersion:
'~5.9.0'` — `cdktn-cli@0.24.0` has a peer dependency on `jsii@~5.9.0`, which
is incompatible with the `jsii@~6.0.0` default used by `projen new` for
brand-new jsii projects.
:::

### 2. Regenerate project files

After updating your `.projenrc` file:

```bash
npx projen
```

This will regenerate your `package.json` and other configuration files, replacing the `cdktf` dependency with `cdktn`.

### 3. Update your construct code

In your construct implementation files, update imports:

```typescript
// Before
import { Construct } from 'constructs';
import { TerraformStack } from 'cdktf';

// After
import { Construct } from 'constructs';
import { TerraformStack } from 'cdktn';
```

### 4. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 5. Test your constructs

Run your tests to ensure everything works with CDKTN:

```bash
npx projen test
```

## Need Help?

If you encounter issues during migration:

1. Check the [CDKTN website](https://cdktn.io/)
2. Review the [CDKTN documentation](https://www.npmjs.com/package/cdktn)
3. Review the [projen API reference](https://projen.io/docs/api/cdktn)
4. Open an issue on the [projen GitHub repository](https://github.com/projen/projen/issues)
