---
sidebar_position: 3
---

# Trusted Publishers

Trusted Publishers is a modern authentication method that helps you publish packages more securely by eliminating the need for long-lived API tokens.
Instead of managing sensitive credentials, it uses OpenID Connect (OIDC) to generate short-lived tokens from your CI system (like GitHub Actions or GitLab Pipelines).
This means less security risk and easier maintenance, as you don't need to regularly rotate or protect long-lived tokens.
Trusted Publishers ensures packages come from specific CI systems or build pipelines, reducing the risk of token theft and unauthorized publications.

## How Trusted Publishers Work

When publishing with trusted publishing enabled:

1. **Your CI system generates an OIDC token** containing metadata about your workflow and repository (this "ambient identity" is automatically provided by the CI environment)
2. **The publishing job uses this token** to authenticate with the package repository
3. **The package repository verifies the token** against your configured trusted publisher settings
4. **A temporary API token is issued** for publishing your package
5. **No long-lived secrets** are stored in your repository

This eliminates the need to store long-lived secrets in your repository.

## Supported Package Repositories

Projen currently supports trusted publishing for:

- **npmjs.com** - Node.js packages with trusted publishing and provenance statements
- **PyPI** - Python Package Index with attestations
- **NuGet.org** - .NET packages with trusted publishing

## npm Trusted Publishing

### Setup

To enable npm trusted publishing in your projen project:

```typescript
const project = new NodeProject({
  // ... other options
  publishToNpm: true,
  npmPublishOptions: {
    trustedPublishing: true,
  },
});
```

Or for JSII projects:

```typescript
const project = new JsiiProject({
  // ... other options
  publishToNpm: {
    trustedPublishing: true,
  },
});
```

### npm Configuration

Before using trusted publishing, you must configure your npm package:

1. **Go to npm**: Navigate to your package's settings on [npmjs.com](https://www.npmjs.com)
2. **Add Publisher**: Under "Publishing access", click "Require two-factor authentication or automation tokens"
3. **Configure GitHub Actions**:
   - **Subject**: `repo:owner/repository:ref:refs/heads/main`
   - **Issuer**: `https://token.actions.githubusercontent.com`
   - Replace `owner/repository` with your GitHub username/organization and repository name
   - Adjust the branch name if different from `main`

Or follow the [official npm documentation](https://docs.npmjs.com/trusted-publishers).

### Requirements

- **npm CLI version 11.5.1 or later** (this is NOT ensured automatically by projen)
  - Available by default with Node.js 24+
  - See "Meeting the npm Version Requirement" section above for solutions
- Package must be configured for trusted publishing on npmjs.com
- GitHub Actions workflow must run from the configured repository and branch

### Provenance Statements

By default, when using trusted publishing, npm will generate provenance statements that:

- Provide cryptographic proof of where and how your package was built
- Are automatically displayed on the npm package page
- Help users verify package integrity and authenticity
- Work with tools like `npm audit signatures`

## PyPI Trusted Publishing

### Setup

To enable PyPI trusted publishing in your projen project:

```typescript
const project = new PythonProject({
  // ... other options
  publishToPypi: {
    trustedPublishing: true,
  },
});
```

### PyPI Configuration

Before using trusted publishing, you must configure your PyPI project:

1. **Go to PyPI**: Navigate to your project's settings on [PyPI](https://pypi.org)
2. **Add Publisher**: Under "Publishing", click "Add a new publisher"
3. **Configure GitHub Actions**:
   - **Owner**: Your GitHub username or organization
   - **Repository name**: Your repository name
   - **Workflow name**: `release.yml` (or your release workflow filename)
   - **Environment name**: Leave empty unless using GitHub environments

Or follow the [official PyPI documentation](https://docs.pypi.org/trusted-publishers/adding-a-publisher/).

## NuGet Trusted Publishing

### Setup

To enable NuGet trusted publishing in your projen project:

```typescript
const project = new CsharpProject({
  // ... other options
  publishToNuget: {
    trustedPublishing: true,
  },
});
```

### NuGet Configuration

Before using trusted publishing, you must configure your NuGet.org project:

1. **Go to NuGet.org**: Navigate to your account settings on [NuGet.org](https://www.nuget.org)
2. **Add Publisher**: Under "Trusted Publishing", click "Add a new trusted publisher"
3. **Configure GitHub Actions**:
   - **Repository Owner**: Your GitHub username or organization
   - **Repository**: Your repository name
   - **Workflow File**: `release.yml` (filename only, not the full path)
   - **Environment**: Leave empty unless using GitHub environments

Or follow the [official NuGet documentation](https://learn.microsoft.com/en-us/nuget/nuget-org/trusted-publishing).

### GitHub Secrets

You must configure the `NUGET_USERNAME` secret (or a different secret name if customized) with your NuGet.org username (profile name, not email address).

## Migration Guide

### From Token-Based to Trusted Publishing

#### For npm packages

1. **Update your projen configuration**:

   ```typescript
   publishToNpm: {
     trustedPublishing: true,
     // Remove npmTokenSecret if present
   }
   ```

2. **Configure npm trusted publisher** (see npm Configuration above)

3. **Remove secrets from GitHub**:
   - You can safely remove `NPM_TOKEN` secrets
   - Keep them temporarily during transition for rollback capability

4. **Test the setup**:
   - Create a test release to verify trusted publishing works
   - Monitor the workflow logs for successful authentication
   - Check that provenance statements appear on npm (if enabled)

5. **Clean up**:
   - Delete old API tokens in npm once you are confident with the new setup

#### For PyPI packages

1. **Update your projen configuration**:

   ```typescript
   publishToPypi: {
     trustedPublishing: true,
     // Remove twinePasswordSecret if present
   }
   ```

2. **Configure PyPI trusted publisher** (see PyPI Configuration above)

3. **Remove secrets from GitHub**:
   - You can safely remove `TWINE_PASSWORD` and `TWINE_USERNAME` secrets
   - Keep them temporarily during transition for rollback capability

4. **Test the setup**:
   - Create a test release to verify trusted publishing works
   - Monitor the workflow logs for successful token minting

5. **Clean up**:
   - Delete old API tokens in PyPI once you are confident with the new setup

#### For NuGet packages

1. **Update your projen configuration**:

   ```typescript
   publishToNuget: {
     trustedPublishing: true,
     // Remove nugetApiKeySecret if present
   }
   ```

2. **Configure NuGet trusted publisher** (see NuGet Configuration above)

3. **Add GitHub secret**:
   - Add `NUGET_USERNAME` secret with your NuGet.org username (profile name, not email)

4. **Remove old secrets from GitHub**:
   - You can safely remove `NUGET_API_KEY` secrets
   - Keep them temporarily during transition for rollback capability

5. **Test the setup**:
   - Create a test release to verify trusted publishing works
   - Monitor the workflow logs for successful authentication

6. **Clean up**:
   - Delete old API keys in NuGet.org once you are confident with the new setup
