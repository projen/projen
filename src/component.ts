import type { IConstruct } from "constructs";
import { Construct, Node, RootConstruct } from "constructs";
import type { InitProject, Project } from "./project";
import {
  isComponent,
  findClosestProject,
  tagAsComponent,
  tagAsProject,
} from "./util/constructs";

const autoIds = new WeakMap<IConstruct, number>();
const componentId = (scope: IConstruct) => {
  const nextId = (autoIds.get(scope) ?? 0) + 1;
  autoIds.set(scope, nextId);
  return `AutoId${nextId}`;
};

/**
 * Represents a project component.
 * @param project
 * @param id Unique id of the component. If not provided, an unstable AutoId is generated.
 */
export class Component extends Construct {
  /**
   * Test whether the given construct is a component.
   */
  public static isComponent(x: any): x is Component {
    return isComponent(x);
  }

  public readonly project: Project;

  constructor(scope: IConstruct, id?: string) {
    super(scope, id || `${new.target.name}#${componentId(scope)}`);
    tagAsComponent(this);
    this.node.addMetadata("type", "component");
    this.node.addMetadata("construct", new.target.name);

    this.project = findClosestProject(scope, new.target.name);
  }

  /**
   * Called before synthesis.
   */
  public preSynthesize() {}

  /**
   * Synthesizes files to the project output directory.
   */
  public synthesize() {}

  /**
   * Called after synthesis. Order is *not* guaranteed.
   */
  public postSynthesize() {}

  /**
   * Called once, right after `synthesize()`, only when the project is created for the first time.
   *
   * It does not run on later `projen` invocations. It only fires for `projen new` (or `Projects.createProject`).
   * Use it for deterministic, one-off file generation. Order across components is not guaranteed.
   *
   * @param initProject Details about how the project was created, e.g. its type and the original CLI args.
   */
  public projectCreation(initProject: InitProject) {
    initProject;
  }

  /**
   * Called once, right after `postSynthesize()`, only when the project is created for the first time.
   *
   * It does not run on later `projen` invocations. It only fires for `projen new` (or `Projects.createProject`).
   * It is also skipped when post-synthesis steps are disabled, e.g. `--no-post` or `PROJEN_DISABLE_POST`.
   * Use it for one-off setup that can be turned off by the user, like running a task to give the user immediate
   * feedback on their new project. Order across components is not guaranteed.
   *
   * @param initProject Details about how the project was created, e.g. its type and the original CLI args.
   */
  public postProjectCreation(initProject: InitProject) {
    initProject;
  }
}

/**
 * Internal flag key read by the detached-guard proxy. A symbol so it never
 * collides with a real (string-keyed) member and is always readable through the
 * guard (symbol access is never blocked).
 */
const FUTURE_ATTACHED = Symbol.for("projen.future.attached");

/**
 * The members a detached future component is allowed to expose. Reading anything
 * else before attach throws. (`copy` is the copyable capability method a
 * copyable subclass adds, per the `recreate()` convention.)
 */
const DETACHED_ALLOWLIST = new Set<PropertyKey>([
  "attach",
  "tryAttach",
  "attached",
  "copy",
  "constructor",
  "toString",
]);

/**
 * Wrap a freshly constructed {@link FutureComponent} in a guard proxy.
 *
 * Two jobs:
 *
 * 1. Block use before attach. While detached, any property read outside
 *    {@link DETACHED_ALLOWLIST} (and outside symbol keys, which always pass so
 *    `instanceof`, jsii and inspection keep working) throws instead of silently
 *    returning shadow-tree state.
 * 2. "Drop" itself on attach. Once attached, the guard is a transparent
 *    pass-through: a single boolean check, then `Reflect`. Every method it
 *    returns is bound to the *real* target, so the moment you call one method
 *    the work continues on the bare object with no further proxy traps.
 *
 * Only `get` is guarded. `set` is intentionally left open so a subclass
 * constructor can assign its own fields (e.g. `this.options = options`).
 */
function guardDetached<T extends object>(target: T): T {
  const boundCache = new Map<PropertyKey, (...args: any[]) => any>();
  const handler: ProxyHandler<T> = {
    get(t, prop) {
      // never present as a thenable, or `await futureComponent` would hang/throw
      if (prop === "then") {
        return undefined;
      }

      const attached = (t as any)[FUTURE_ATTACHED] === true;
      const allowed =
        attached || typeof prop !== "string" || DETACHED_ALLOWLIST.has(prop);

      if (!allowed) {
        const name = (t as any).newTargetName ?? t.constructor.name;
        throw new Error(
          `Cannot access '${String(prop)}' on ${name}: a future component is ` +
            `not usable until it is attached. Call attach(scope) first, or pass ` +
            `it to a Project which attaches it for you.`,
        );
      }

      // bind functions to the *real* target so that, once invoked, all internal
      // `this` access happens on the bare object with no proxy involvement.
      const value = Reflect.get(t, prop, t);
      if (typeof value === "function") {
        let bound = boundCache.get(prop);
        if (!bound) {
          bound = (value as (...args: any[]) => any).bind(t);
          boundCache.set(prop, bound);
        }
        return bound;
      }
      return value;
    },
  };
  return new Proxy(target, handler);
}

/**
 * Make a specific property writable again.
 */
type WriteableProp<T, K extends keyof T> = Omit<T, K> & {
  -readonly [P in K]: T[P];
};

/**
 * A {@link Component} that is created *detached* from any project and attached
 * to one later via {@link FutureComponent.attach}.
 *
 * Like a regular component, but constructed without a project. It improves on a
 * naive deferred component in three ways:
 *
 * - Use-before-attach is an error, not a silent footgun. The constructor hands
 *   the caller a guard proxy; touching `project`, `node`, `synthesize()` or any
 *   subclass feature before `attach()` throws.
 * - No global shadow-tree leak. Each instance gets its own throwaway shadow
 *   root, so detached components never share an id counter and the root becomes
 *   garbage once the component is reparented on attach.
 * - `attach()` returns the unwrapped component, so callers can opt out of the
 *   proxy entirely.
 *
 * The constructor takes no arguments (`super()`). A subclass that needs options
 * captures them itself, reading the local parameter inside its constructor - NOT
 * `this.options`, which the guard blocks until attach.
 *
 * ```ts
 * class Worker extends FutureComponent {
 *   private readonly options: WorkerOptions;
 *   constructor(options: WorkerOptions = {}) {
 *     super();
 *     this.options = options; // set: allowed
 *   }
 *   protected init() {
 *     // this.project is available here
 *   }
 * }
 *
 * const w = new Worker({ retries: 3 });
 * // w.project;                  // throws: not attached yet
 * const real = w.attach(project); // reparents, runs init(), returns the bare instance
 * ```
 */
export abstract class FutureComponent extends Component {
  private readonly newTargetName: string;
  private attachedState = false;

  constructor() {
    // Each future component gets its OWN shadow root. Unlike a single global
    // shadow tree, detached components never collide on an id counter, and the
    // root is collected once we reparent on attach().
    const shadow = new RootConstruct();
    tagAsProject(shadow);
    super(shadow);

    this.newTargetName = new.target.name;

    // Hand the caller a guarded proxy. `this` here is still the bare object;
    // returning it makes the proxy the instance seen by `new`. Because the base
    // constructor returns an object, subclass constructors transparently adopt
    // the proxy as their `this` too.
    return guardDetached(this);
  }

  /**
   * Whether `attach()` has been called. A convenience for tests/introspection;
   * prefer `tryAttach()` over reading this and branching.
   */
  public get attached(): boolean {
    return this.attachedState;
  }

  /**
   * Project-dependent setup. Runs once, from `attach()`, when `this.project` is
   * finally available.
   */
  protected init(): void {}

  /**
   * Attach the component to a scope. Only now does it become usable.
   *
   * Returns the real, unwrapped component (not the proxy). A component may be
   * attached exactly once; attaching an already-attached component throws (copy
   * it first to attach a variant elsewhere). Use `tryAttach()` if you don't care
   * whether it has already been attached.
   */
  public attach(scope: IConstruct, id?: string) {
    if (this.attachedState) {
      throw new Error(
        `${this.newTargetName} is already attached to '${this.project.node.path}'. ` +
          `Use \`tryAttach\` or \`copy\` it to attach a variant.`,
      );
    }
    // constructs has no public reparent, so build a fresh node on the real
    // scope. The per-instance shadow root and its original node become an
    // unreachable island and are collected.
    (this as WriteableProp<this, "node">).node = new Node(
      this,
      scope,
      id ?? componentId(scope),
    );

    // The component already carries the component tag (set by the base
    // constructor, which is idempotent against the same object); re-add the
    // metadata to the new node and resolve the real project.
    this.node.addMetadata("type", "component");
    this.node.addMetadata("construct", this.newTargetName);
    (this as WriteableProp<this, "project">).project = findClosestProject(
      scope,
      this.newTargetName,
    );

    this.attachedState = true;
    // Flip the guard into transparent pass-through for any proxy handles the
    // caller still holds. Symbol key, so the guard can always read it.
    (this as any)[FUTURE_ATTACHED] = true;

    // project is now available, run project-dependent setup
    this.init();

    // hand back the bare object so the caller can drop the proxy entirely
    return this;
  }

  /**
   * Attach the component if it isn't already, without caring *where*.
   *
   * Unlike `attach()`, never throws on an already-attached component: if attached
   * anywhere at all, the existing instance is returned and `scope` is ignored.
   * Use `attach()` when attaching to a specific scope is part of your contract
   * and a pre-existing attachment elsewhere would be a bug.
   */
  public tryAttach(scope: IConstruct, id?: string) {
    return this.attachedState ? this : this.attach(scope, id);
  }
}
