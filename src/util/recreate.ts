/**
 * Re-create an object by re-invoking its own constructor with new arguments.
 *
 * The returned value is an instance of the *exact same* (sub)class as
 * `instance`, because the runtime `constructor` is used rather than a
 * statically known type. This makes it the building block for a component's
 * typed `copy()` method:
 *
 * ```ts
 * class Runner extends Component {
 *   constructor(scope: IConstruct, private readonly options: RunnerOptions = {}, id?: string) {
 *     super(scope, id);
 *   }
 *   public copy(overrides: RunnerOptions = {}, id?: string, scope = this.project): Runner {
 *     return recreate(this, scope, { ...this.options, ...overrides }, id);
 *   }
 * }
 * ```
 *
 * `recreate` is intentionally a free, generic function and an internal helper
 * (not part of the public API). jsii cannot express a shared, typed `copy()`
 * contract (parameter types are invariant on both interface implementations and
 * class overrides), so copyability is modelled as a convention: each component
 * declares its own fully-typed `copy()` that calls `recreate`.
 *
 * @param instance the object to re-create
 * @param args the arguments to pass to the constructor
 * @returns a new instance of the same class as `instance`
 */
export function recreate<T extends object>(instance: T, ...args: any[]): T {
  const ctor = (instance as { constructor: new (...args: any[]) => T })
    .constructor;
  return new ctor(...args);
}
