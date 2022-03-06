import { join } from "path";
import { Construct } from "constructs";
import { Component } from "../component";
import { SampleDir } from "../sample-file";

export interface MavenSampleOptions {
  /**
   * Project root java package.
   */
  readonly package: string;
}

/**
 * Java code sample.
 */
export class MavenSample extends Component {
  constructor(scope: Construct, options: MavenSampleOptions) {
    super(scope, "MavenSample");

    const pkg = options.package.split(".");
    new SampleDir(this, join("src", "main", "java", ...pkg), {
      files: {
        "Main.java": [
          ...(options.package ? [`package ${options.package};`] : []),
          "",
          "public class Main {",
          "  public static void main(final String[] args) {",
          '    System.out.println("Hello, world!");',
          "  }",
          "}",
        ].join("\n"),
      },
    });
  }
}
