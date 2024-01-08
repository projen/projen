---
sidebar_position: 2
---

# Developing Custom Components

projen offers a number of useful components in the `projen` package. However,
you may want to develop your own components to encapsulate common patterns in
your organization. This page describes how to develop custom components.

## Extending SampleFile

The `SampleFile` component is a low-level component that produces a file with
specific contents, but only once if the file doesn't exist. This is useful for
files that you don't want to place under projen management, but that you want
projen to create when the project is initialized.

Examples include:

- `README.md`
- `CONTRIBUTING.md`
- Example config files that will be updated and maintained by the user

projen does not create a `.gitignore` file as a `SampleFile` because projen
manages the contents of `.gitignore` in most projects. However, if you want to
create a `.gitignore` file as a sample and then let teams manage them how they
see fit, you can use the `SampleFile` component to do so.

### Example

Let's look at `CONTRIBUTING.md` as an example.

```ts
import { SampleFile } from "projen";

export class ContributingFile extends SampleFile {
  constructor(scope: Project) {
    super(scope, "CONTRIBUTING.md", {
      contents: ["# Contributing", "", "..."].join("\n"),
    });
  }
}
```

This is a very basic component that creates a `CONTRIBUTING.md` file with some
contents. The `SampleFile` component will only create the file if it doesn't
already exist. If the file exists, it will not be modified.

One way to make this component more useful is to allow users to specify some of
the file contents. If, for example, you have boilerplate `CONTRIBUTING.md`
contents but you want to make sure it has things such as the project's name,
author, and repository URL, you can do so by passing those values as props to
the component.

```ts
import { Project, SampleFile } from "projen";

export interface ContributingFileProps {
  readonly projectName: string;
  readonly author: string;
  readonly repository: string;
}

export class ContributingFile extends SampleFile {
  constructor(scope: Project, props: ContributingFileProps) {
    super(scope, "CONTRIBUTING.md", {
      contents: `# Contributing to [${props.projectName}](${props.repository})

...
On behalf of the ${props.projectName} team, welcome!

${props.author}
`,
    });
  }
}
```

:::tip
Note that in this second example, we're using JavaScript template literals
to create the contents of the file instead of joining an array of strings.
One of the benefits of using something like projen is that you have the full
power of your programming language at your disposal. You can use any language
feature you want!
:::

Now when you create a new `ContributingFile` component, you can pass in the
project name, author, and repository URL, which are usually required props
for projen projects.

```ts
import { ContributingFile } from "./contributing-file";

new ContributingFile(this, {
  projectName: "my-project",
  author: "John Doe <john@doe.com>",
  repository: "https://github.com/my-org/my-project.git",
});
```

## Extending FileBase

`FileBase` is projen's low-level managed file component. It will add a projen
marker to the file, mark it as being projen-managed in `.projen/files.json`,
and will update the file's contents when the project is synthesized.

Examples include:

- `.gitignore`
- `setup.py`
- `Makefile`
- `LICENSE.md`

### Example

Let's look at an example of a `SECURITY.md` file that is managed by projen.
The use case here may be that the cybersecurity team wants to ensure that
projects have a `SECURITY.md` file with some basic contents. Those contents
may change over time but will always be centrally controlled. Rather than
copy/pasting them into every project, you can use a `FileBase` component to
manage the file.

`FileBase` is considered an abstract class. It cannot be extended without
implementing its abstract members. For `FileBase`, that means implementing
the `synthesizeContent` method.

```ts
import { FileBase } from "projen";

export class SecurityFile extends FileBase {
  public constructor(scope: IConstruct) {
    super(scope, "SECURITY.md", {
      readonly: true,
      executable: false,
    });
  }
  protected synthesizeContent(_: IResolver): string | undefined {
    return [
      "# Security",
      "",
      "## Reporting a Vulnerability",
      "",
      "Please report security vulnerabilities to ...",
    ].join("\n");
  }
}
```

`FileBase` defaults to adding a projen marker to every file it manages. In this
case, since `SECURITY.md` is a public-facing file where a text marker would
look out of place, we simply do not add `this.marker` to our `synthesizeContent`
method return. We also want to discourage manual updates to the file, so
set `readonly: true` as well. Finally, this is not executable, so we set
`executable: false`.

## Extending Component

`Component` is the base class for all projen objects. It is the most
flexible component type and is used to create most of the components in
the `projen` package.

Since a `Component` can be any part of projen, let's look at what needs to be
implemented to create a new component. Anything else is entirely up to your
needs.

```ts
export class ExampleComponent extends Component {
  constructor(project: Project, id: string) {
    super(project, id);
  }
}
```

This `ExampleComponent` is a very basic component that does nothing. It
simply extends `Component` and calls `super` in its constructor. It is part of
a project, not a project itself, and requires an ID to be created.

A `Component` can be anything at all that you want. It can be a file, a
directory, a script, or a task. It can install Doom on your refrigerator,
as long as your refrigerator has a screen and you write the code to do so.
It can glob through the entire contents of your project source code and
send it to the OpenAI API to rewrite in a different language (please check
with your company's Cybersecurity team before implementing this `Component`).
The sky is the limit!

### Example

As an example, let's review the source code for the `SampleFile` component. We
reviewed how to extend and use this component above, so let's see how it works.

```ts
import { writeFile } from "fs-extra";

export class SampleFile extends Component {
  private readonly filePath: string;
  private readonly options: SampleFileOptions;

  /**
   * Creates a new SampleFile object
   * @param project - the project to tie this file to.
   * @param filePath - the relative path in the project to put the file
   * @param options - the options for the file.
   */
  constructor(project: Project, filePath: string, options: SampleFileOptions) {
    super(project);

    if (options.contents && options.sourcePath) {
      throw new Error("Cannot specify both 'contents' and 'source' fields.");
    }
    if (!options.contents && !options.sourcePath) {
      throw new Error("Must specify at least one of 'contents' or 'source'.");
    }
    this.filePath = filePath;
    this.options = options;
  }

  public synthesize() {
    let contents;
    if (this.options.contents) {
      contents = this.options.contents;
    } else if (this.options.sourcePath) {
      contents = fs.readFileSync(this.options.sourcePath);
    }
    this.writeOnceFileContents(
      this.project.outdir,
      this.filePath,
      contents ?? ""
    );
  }

  /**
   * A helper function that will write the file once and return if it was written or not.
   * @param dir - the directory for the new file
   * @param filename - the filename for the new file
   * @param contents - the contents of the file to write
   * @return boolean - whether a new file was written or not.
   * @private
   */
  private writeOnceFileContents(dir: string, filename: string, contents: any) {
    const fullFilename = path.join(dir, filename);
    if (fs.existsSync(fullFilename)) {
      return;
    }
    writeFile(fullFilename, contents, { readonly: false });
  }
}
```

This component is a bit more complex than the `ExampleComponent` above, but
it's still a relatively simple component. It extends `Component` and calls
`super` in its constructor, only passing the project to its base class.
It also has a `synthesize` method that is called
when the project is synthesized. This method is responsible for writing the
file to disk using the private `writeOnceFileContents` method at the end of
the code block. This method will only write the file if it doesn't already
exist.

The `SampleFile` component also has `filePath` and `options` properties. These
are used to determine where the file should be written and what its contents
should be. The `filePath` is the relative path to the file in the project. The
`options` are passed in as a prop to the component and are used to determine
the contents of the file. The `options` can either be a string of contents or
a path to a file that contains the contents, but not both. This is enforced
in the constructor.
