import { SharedConfig } from "../shared-config";

/**
 * Configurations provided by typescript-eslint
 *
 * @see https://typescript-eslint.io/getting-started/typed-linting/#shared-configurations
 */
export class Tseslint extends SharedConfig {
  /**
   * Enables each the rules provided as a part of typescript-eslint. Note that many rules are not applicable in all codebases, or are meant to be configured.
   * @see {@link https://typescript-eslint.io/users/configs#all}
   */
  public static readonly ALL = new Tseslint("all");

  /**
   * A minimal ruleset that sets only the required parser and plugin options needed to run typescript-eslint.
   * We don't recommend using this directly; instead, extend from an earlier recommended rule.
   * @see {@link https://typescript-eslint.io/users/configs#base}
   */
  public static readonly BASE = new Tseslint("base");

  /**
   * A utility ruleset that will disable type-aware linting and all type-aware rules available in our project.
   * @see {@link https://typescript-eslint.io/users/configs#disable-type-checked}
   */
  public static readonly DISABLE_TYPE_CHECKED = new Tseslint("disableTypeChecked");

  /**
   * This is a compatibility ruleset that:
   * - disables rules from eslint:recommended which are already handled by TypeScript.
   * - enables rules that make sense due to TS's typechecking / transpilation.
   * @see {@link https://typescript-eslint.io/users/configs/#eslint-recommended}
   */
  public static readonly ESLINT_RECOMMENDED = new Tseslint("eslintRecommended");

  /**
   * Recommended rules for code correctness that you can drop in without additional configuration.
   * @see {@link https://typescript-eslint.io/users/configs#recommended}
   */
  public static readonly RECOMMENDED = new Tseslint("recommended");

  /**
   * Contains all of `recommended` along with additional recommended rules that require type information.
   * @see {@link https://typescript-eslint.io/users/configs#recommended-type-checked}
   */
  public static readonly RECOMMENDED_TYPE_CHECKED = new Tseslint(
    "recommendedTypeChecked"
  );

  /**
   * A version of `recommended` that only contains type-checked rules and disables of any corresponding core ESLint rules.
   * @see {@link https://typescript-eslint.io/users/configs#recommended-type-checked-only}
   */
  public static readonly RECOMMENDED_TYPE_CHECKED_ONLY = new Tseslint(
    "recommendedTypeCheckedOnly"
  );

  /**
   * Contains all of `recommended`, as well as additional strict rules that can also catch bugs.
   * @see {@link https://typescript-eslint.io/users/configs#strict}
   */
  public static readonly STRICT = new Tseslint("strict");

  /**
   * Contains all of `recommended`, `recommended-type-checked`, and `strict`, along with additional strict rules that require type information.
   * @see {@link https://typescript-eslint.io/users/configs#strict-type-checked}
   */
  public static readonly STRICT_TYPE_CHECKED = new Tseslint("strictTypeChecked");

  /**
   * A version of `strict` that only contains type-checked rules and disables of any corresponding core ESLint rules.
   * @see {@link https://typescript-eslint.io/users/configs#strict-type-checked-only}
   */
  public static readonly STRICT_TYPE_CHECKED_ONLY = new Tseslint(
    "strictTypeCheckedOnly"
  );

  /**
   * Rules considered to be best practice for modern TypeScript codebases, but that do not impact program logic.
   * @see {@link https://typescript-eslint.io/users/configs#stylistic}
   */
  public static readonly STYLISTIC = new Tseslint("stylistic");

  /**
   * Contains all of `stylistic`, along with additional stylistic rules that require type information.
   * @see {@link https://typescript-eslint.io/users/configs#stylistic-type-checked}
   */
  public static readonly STYLISTIC_TYPE_CHECKED = new Tseslint("stylisticTypeChecked");

  /**
   * A version of `stylistic` that only contains type-checked rules and disables of any corresponding core ESLint rules.
   * @see {@link https://typescript-eslint.io/users/configs#stylistic-type-checked-only}
   */
  public static readonly STYLISTIC_TYPE_CHECKED_ONLY = new Tseslint(
    "stylisticTypeCheckedOnly"
  );

  private constructor(path: string) {
    super({
      module: "typescript-eslint",
      name: "tseslint",
      path: `configs.${path}`,
    });
  }
}
