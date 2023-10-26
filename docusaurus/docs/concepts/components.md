---
sidebar_position: 1
---

# Components

The core unit of work in projen is a component. 
A component is based on the [construct](https://github.com/aws/constructs).
A component represents, at minimum, a file in your project.
However, components can be grouped together into other components that represent common functionality.

For example, you may have component that represents a GitHub Pull Request Template.
If you were to also create component that represents a GitHub Issue Template, you could group them together into a component that represents GitHub Templates used throughout your organization.

projen ships with many components, like the [SampleFile](/docs/API#projen-samplefile) component, that can be used to create files in your project that start with specific content but can, and should, be modified manually. 
You can build components based on this, or you can build new components that use a combination of existing components and new ones you create.

