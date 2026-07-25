# Migrating from CDKTF to CDKTN

This guide helps you migrate your projen project from using `ConstructLibraryCdktf` to the new `ConstructLibraryCdktn`.

## Background

**CDKTF has been archived by HashiCorp.** [CDK Terrain (CDKTN)](https://cdktn.io/) is a community-driven fork of CDKTF that continues active development and maintenance of the project.

CDKTN provides:
- Continued maintenance and updates
- Community-driven development
- Compatibility with existing CDKTF constructs
- Active issue resolution and feature development

Projen now supports CDKTN construct libraries through the `ConstructLibraryCdktn` class, ensuring your infrastructure-as-code projects have a sustainable, community-supported foundation.

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
  cdktnVersion: '^0.1.0',  // Changed from cdktfVersion
  defaultReleaseBranch: 'main',
  name: 'my-cdktn-construct',
  repositoryUrl: 'https://github.com/yourusername/my-cdktn-construct.git',
  // ... other options
});
```

### 2. Update package dependencies

The key changes:
- `cdktfVersion` → `cdktnVersion`
- Your project will now depend on the `cdktn` npm package instead of `cdktf`

### 3. Regenerate project files

After updating your `.projenrc` file:

```bash
npx projen
```

This will regenerate your `package.json` and other configuration files with the new CDKTN dependencies.

### 4. Update your construct code

In your construct implementation files, update imports:

```typescript
// Before
import { Construct } from 'constructs';
import { TerraformStack } from 'cdktf';

// After
import { Construct } from 'constructs';
import { TerraformStack } from 'cdktn';
```

### 5. Update dependencies

Install the new dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 6. Test your constructs

Run your tests to ensure everything works with CDKTN:

```bash
npx projen test
```

## Creating a New CDKTN Project

For new projects, you can start directly with CDKTN:

```bash
npx projen new cdktn-construct \
  --author "Your Name" \
  --author-address "you@example.com" \
  --cdktn-version "^0.1.0" \
  --name "my-cdktn-construct" \
  --repository-url "https://github.com/yourusername/my-cdktn-construct.git"
```

## Backward Compatibility

The `ConstructLibraryCdktf` class remains available for backward compatibility but is now deprecated. Existing projects using `cdktf` will continue to work, but we recommend migrating to `cdktn` for new features and improvements.

## Key Differences

| Feature | CDKTF | CDKTN |
|---------|-------|-------|
| Package name | `cdktf` | `cdktn` |
| Default version | `^0.13.0` | `^0.1.0` |
| Projen class | `cdktf.ConstructLibraryCdktf` | `cdktn.ConstructLibraryCdktn` |
| Option key | `cdktfVersion` | `cdktnVersion` |
| Status | Archived by HashiCorp | Active (Community-maintained) |
| Website | N/A | https://cdktn.io/ |

## Need Help?

If you encounter issues during migration:

1. Check the [CDKTN website](https://cdktn.io/)
2. Review the [CDKTN documentation](https://www.npmjs.com/package/cdktn)
3. Review the [projen API reference](https://projen.io/api/cdktn.html)
4. Open an issue on the [projen GitHub repository](https://github.com/projen/projen/issues)
