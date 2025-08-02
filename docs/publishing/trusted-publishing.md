---
sidebar_position: 3
---

# Trusted Publishers

Trusted Publishers is a modern authentication method that helps you publish packages more securely by eliminating the need for long-lived API tokens.
Instead of managing sensitive credentials, it uses OpenID Connect (OIDC) to generate short-lived tokens from your CI system (like GitHub Actions or GitLab Pipelines).
This means less security risk and easier maintenance, as you don't need to regularly rotate or protect long-lived tokens.
Trusted Publishers ensures packages come from specific CI systems or build pipelines, reducing the risk of token theft and unauthorized publications.

## How Trusted Publishers Work

Trusted Publishers leverage OpenID Connect (OIDC) to establish trust between your CI/CD system and package repositories:

1. **Identity Provider**: Your CI system (GitHub Actions) acts as an OIDC identity provider
2. **Token Exchange**: The CI system generates a short-lived OIDC token containing metadata about the workflow
3. **Verification**: The package repository verifies the token and checks it against configured trusted publishers
4. **API Token**: If verification succeeds, the repository issues a temporary API token for publishing

This eliminates the need to store long-lived secrets in your repository.

## Supported Package Repositories

Projen currently supports trusted publishing for:

- **PyPI** - Python Package Index
<!-- - **npm** (with provenance) - Node.js packages with provenance statements -->

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

### How It Works

When publishing with trusted publishing enabled:

1. GitHub Actions generates an OIDC token containing workflow metadata
2. The publishing job exchanges this token for a PyPI API token
3. The temporary API token is used to publish your package
4. No long-lived secrets are stored in your repository

## Migration Guide

### From Token-Based to Trusted Publishing

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
