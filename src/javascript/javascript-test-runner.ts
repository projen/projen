import { FutureComponent } from "../component";
import type { JestOptions } from "./jest";
import { Jest } from "./jest";
import type { NodeNativeTestOptions } from "./node-native-test";
import { NodeNativeTest } from "./node-native-test";

/**
 * A test runner that can execute a `NodeProject`'s unit tests.
 */
export interface IJavaScriptTestRunner {
  /**
   * The underlying `Jest` component, if this runner is backed by Jest.
   */
  readonly jest?: Jest;

  /**
   * The underlying `NodeNativeTest` component, if this runner is backed by
   * Node.js' built-in test runner.
   */
  readonly nodeNativeTest?: NodeNativeTest;

  /**
   * The directory where coverage files are output, if coverage collection
   * is enabled for the configured test runner.
   */
  readonly coverageDirectory?: string;
}

type TestRunnerKind = "jest" | "node";

/**
 * The test runner used to execute a `NodeProject`'s unit tests.
 *
 * A runner is a {@link FutureComponent}: create it standalone (e.g. via one of
 * the static factories) and it is attached to a project by whoever consumes
 * it (typically `NodeProject` itself, via its `testRunner` option).
 */
export class JavaScriptTestRunner
  extends FutureComponent
  implements IJavaScriptTestRunner
{
  /**
   * Use Jest to execute unit tests.
   */
  public static useJest(options: JestOptions = {}): JavaScriptTestRunner {
    return new JavaScriptTestRunner("jest", options);
  }

  /**
   * Use Node.js' built-in test runner (`node --test`) to execute unit tests.
   */
  public static useNode(
    options: NodeNativeTestOptions = {},
  ): JavaScriptTestRunner {
    return new JavaScriptTestRunner("node", options);
  }

  private readonly kind: TestRunnerKind;
  private readonly options: JestOptions | NodeNativeTestOptions;
  private _jest?: Jest;
  private _nodeNativeTest?: NodeNativeTest;
  public initialized: boolean;

  private constructor(
    kind: TestRunnerKind,
    options: JestOptions | NodeNativeTestOptions,
  ) {
    super();
    this.kind = kind;
    this.options = options;
    this.initialized = false;
  }

  protected init(): void {
    if (this.kind === "jest") {
      this._jest = new Jest(this, this.options as JestOptions);
    } else {
      this._nodeNativeTest = new NodeNativeTest(
        this,
        this.options as NodeNativeTestOptions,
      );
    }
    this.initialized = true;
  }

  /**
   * The underlying `Jest` component, if this runner is backed by Jest.
   */
  public get jest(): Jest | undefined {
    return this._jest;
  }

  /**
   * The underlying `NodeNativeTest` component, if this runner is backed by
   * Node.js' built-in test runner.
   */
  public get nodeNativeTest(): NodeNativeTest | undefined {
    return this._nodeNativeTest;
  }

  /**
   * The directory where coverage files are output, if coverage collection
   * is enabled for the configured test runner.
   */
  public get coverageDirectory(): string | undefined {
    return (
      this._jest?.coverageDirectory ?? this._nodeNativeTest?.coverageDirectory
    );
  }
}
