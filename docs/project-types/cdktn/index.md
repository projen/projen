---
sidebar_position: 5
---

# CDKTN Projects

CDK Terrain (CDKTN) is a community-driven fork of the Cloud Development Kit for Terraform (CDKTF), which was [archived by HashiCorp in 2025](https://github.com/hashicorp/terraform-cdk). CDKTN continues the active development and maintenance of infrastructure-as-code tooling that allows you to define cloud infrastructure using familiar programming languages.

## What is CDK Terrain?

CDK Terrain provides:
- **Infrastructure as Code**: Define Terraform infrastructure using TypeScript, Python, Java, C#, and Go
- **Type Safety**: Leverage IDE autocomplete and compile-time type checking for your infrastructure
- **Familiar Programming Constructs**: Use loops, conditionals, and functions to define infrastructure
- **Reusable Constructs**: Create and share infrastructure patterns as libraries
- **Community-Driven**: Active development, issue resolution, and feature development by the community

Learn more at [cdktn.io](https://cdktn.io/).

## Getting Started

### Creating a New CDKTN Construct Library

To create a new CDKTN construct library:

```bash
npx projen new cdktn-construct \
  --author "Your Name" \
  --author-address "you@example.com" \
  --cdktn-version "^0.24.0" \
  --name "my-cdktn-construct" \
  --repository-url "https://github.com/yourusername/my-cdktn-construct.git"
```

This will scaffold a complete CDKTN construct library project with:
- TypeScript configuration optimized for CDKTN
- JSII packaging for multi-language support
- Testing setup with Jest
- CI/CD workflows for GitHub Actions
- Publishing configuration for npm, PyPI, Maven, and NuGet

### Basic Configuration

In your `.projenrc.ts` file:

```typescript
import { cdktn } from 'projen';

new cdktn.ConstructLibraryCdktn({
  author: 'Your Name',
  authorAddress: 'you@example.com',
  cdktnVersion: '^0.24.0',
  defaultReleaseBranch: 'main',
  name: 'my-cdktn-construct',
  repositoryUrl: 'https://github.com/yourusername/my-cdktn-construct.git',
  
  // Optional: Configure multi-language publishing
  publishToNuget: {
    dotNetNamespace: 'MyOrg.MyConstruct',
    packageId: 'MyOrg.MyConstruct'
  },
  publishToPypi: {
    distName: 'my-cdktn-construct',
    module: 'my_cdktn_construct'
  },
  publishToMaven: {
    javaPackage: 'com.myorg.myconstruct',
    mavenArtifactId: 'my-cdktn-construct',
    mavenGroupId: 'com.myorg'
  },
});
```

## Project Structure

A typical CDKTN construct library has this structure:

```
.
├── src/
│   └── index.ts          # Main entry point for your constructs
├── test/
│   └── *.test.ts         # Unit tests
├── .projenrc.ts          # Projen configuration
└── API.md                # Auto-generated API documentation
```

## Writing Constructs

Create reusable infrastructure patterns in your `src/` directory:

```typescript
import { Construct } from 'constructs';
import { TerraformStack } from 'cdktn';
import { AwsProvider } from '@cdktn/provider-aws/lib/provider';
import { S3Bucket } from '@cdktn/provider-aws/lib/s3-bucket';

export interface MyBucketConstructProps {
  readonly bucketName: string;
  readonly versioning?: boolean;
}

export class MyBucketConstruct extends Construct {
  public readonly bucket: S3Bucket;

  constructor(scope: Construct, id: string, props: MyBucketConstructProps) {
    super(scope, id);

    new AwsProvider(this, 'aws', {
      region: 'us-east-1',
    });

    this.bucket = new S3Bucket(this, 'bucket', {
      bucket: props.bucketName,
      versioning: props.versioning
        ? { enabled: true }
        : undefined,
    });
  }
}
```

## Testing

CDKTN constructs can be tested using Jest:

```typescript
import { Testing } from 'cdktn';
import { MyBucketConstruct } from '../src';

describe('MyBucketConstruct', () => {
  it('creates a versioned bucket', () => {
    const app = Testing.app();
    const stack = new TerraformStack(app, 'test');
    
    new MyBucketConstruct(stack, 'MyTestBucket', {
      bucketName: 'my-test-bucket',
      versioning: true,
    });

    const synthesized = Testing.synth(stack);
    expect(synthesized).toHaveResourceWithProperties('aws_s3_bucket', {
      bucket: 'my-test-bucket',
      versioning: [{ enabled: true }],
    });
  });
});
```

Run tests with:

```bash
npx projen test
```

## Available Tasks

Projen creates several tasks for managing your CDKTN project:

| Task | Description |
|------|-------------|
| `npx projen` | Regenerate project files from .projenrc |
| `npx projen build` | Full build: compile, test, lint, and package |
| `npx projen compile` | Compile TypeScript only |
| `npx projen test` | Run tests |
| `npx projen test:watch` | Run tests in watch mode |
| `npx projen eslint` | Run linter |
| `npx projen package` | Create distribution packages |

## Publishing

CDKTN construct libraries use [JSII](https://github.com/aws/jsii) to support multiple programming languages. Configure publishing targets in your `.projenrc.ts`:

```typescript
new cdktn.ConstructLibraryCdktn({
  // ... other config
  
  // Publish to npm (default)
  npmAccess: 'public',
  
  // Publish to PyPI
  publishToPypi: {
    distName: 'my-cdktn-construct',
    module: 'my_cdktn_construct',
  },
  
  // Publish to Maven Central
  publishToMaven: {
    javaPackage: 'com.myorg.myconstruct',
    mavenGroupId: 'com.myorg',
    mavenArtifactId: 'my-cdktn-construct',
  },
  
  // Publish to NuGet
  publishToNuget: {
    dotNetNamespace: 'MyOrg.MyConstruct',
    packageId: 'MyOrg.MyConstruct',
  },
});
```

You'll need to configure the appropriate secrets in your CI/CD environment. See the [AWS CDK Construct Library](./aws-cdk-construct-library.md#publishing) guide for details on required secrets.

## Migrating from CDKTF

If you have an existing CDKTF construct library, see the [CDKTN Migration Guide](./cdktn-migration.md) for step-by-step instructions on migrating to CDKTN.

## Resources

- [CDK Terrain Website](https://cdktn.io/)
- [CDKTN npm package](https://www.npmjs.com/package/cdktn)
- [Projen CDKTN API Reference](https://projen.io/api/cdktn.html)
- [Terraform Registry](https://registry.terraform.io/) - Find pre-built providers

## Differences from CDKTF

CDKTN maintains compatibility with CDKTF constructs while continuing development:

| Feature | CDKTF | CDKTN |
|---------|-------|-------|
| Status | Archived by HashiCorp | Active (Community-maintained) |
| Package name | `cdktf` | `cdktn` |
| Website | N/A | https://cdktn.io/ |
| Development | No longer maintained | Active community development |
| Projen support | `cdktf.ConstructLibraryCdktf` | `cdktn.ConstructLibraryCdktn` |
