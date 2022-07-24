// stolen from: https://github.com/aws/jsii/blob/main/packages/jsii-pacmak/lib/targets/version-utils.ts

import { inspect } from "util";
import { Comparator, Range, parse } from "semver";

export enum TargetName {
  JAVA,
  DOTNET,
  PYTHON,
  GO,
  JAVASCRIPT,
}

/**
 * Converts a SemVer range expression to a Maven version range expression.
 *
 * @param semverRange the SemVer range expression to convert.
 * @param suffix      the suffix to add to versions in the range.
 *
 * @see https://cwiki.apache.org/confluence/display/MAVENOLD/Dependency+Mediation+and+Conflict+Resolution
 */
export function toMavenVersionRange(
  semverRange: string,
  suffix?: string
): string {
  return toBracketNotation(semverRange, suffix, {
    semver: false,
    target: TargetName.JAVA,
  });
}

/**
 * Converts a SemVer range expression to a NuGet version range expression.
 *
 * @param semverRange the SemVer range expression to convert.
 *
 * @see https://docs.microsoft.com/en-us/nuget/concepts/package-versioning#version-ranges-and-wildcards
 */
export function toNuGetVersionRange(semverRange: string): string {
  return toBracketNotation(semverRange, undefined, {
    semver: false,
    target: TargetName.DOTNET,
  });
}

/**
 * Converts a SemVer range expression to a Python setuptools compatible version
 * constraint expression.
 *
 * @param semverRange the SemVer range expression to convert.
 */
export function toPythonVersionRange(semverRange: string): string {
  const range = new Range(semverRange);
  return range.set
    .map((set) =>
      set
        .map((comp) => {
          const versionId = toReleaseVersion(
            comp.semver.raw?.replace(/-0$/, "") ?? "0.0.0",
            TargetName.PYTHON
          );
          switch (comp.operator) {
            case "":
              // With ^0.0.0, somehow we get a left entry with an empty operator and value, we'll fix this up
              return comp.value === "" ? ">=0.0.0" : `==${versionId}`;
            case "=":
              return `==${versionId}`;
            default:
              // >, >=, <, <= are all valid expressions
              return `${comp.operator}${versionId}`;
          }
        })
        .join(", ")
    )
    .join(", ");
}

/**
 * Converts an original version number from the NPM convention to the target
 * language's convention for expressing the same. For versions that do not
 * include a prerelease identifier, this always returns the assembly version
 * unmodified.
 *
 * @param assemblyVersion the assembly version being released
 * @param target          the target language for which the version is destined
 *
 * @returns the version that should be serialized
 */
export function toReleaseVersion(
  assemblyVersion: string,
  target: TargetName
): string {
  const version = parse(assemblyVersion, { includePrerelease: true });
  if (version == null) {
    throw new Error(
      `Unable to parse the provided assembly version: "${assemblyVersion}"`
    );
  }
  if (version.prerelease.length === 0) {
    return assemblyVersion;
  }
  switch (target) {
    case TargetName.PYTHON:
      // Python supports a limited set of identifiers... And we have a mapping table...
      // https://packaging.python.org/guides/distributing-packages-using-setuptools/#pre-release-versioning
      const [label, sequence, ...rest] = version.prerelease;
      if (rest.filter((elt) => elt !== 0).length > 0 || sequence == null) {
        throw new Error(
          `Unable to map prerelease identifier (in: ${assemblyVersion}) components to python: ${inspect(
            version.prerelease
          )}. The format should be 'X.Y.Z-label.sequence', where sequence is a positive integer, and label is "dev", "pre", "alpha", beta", or "rc"`
        );
      }
      if (!Number.isInteger(sequence)) {
        throw new Error(
          `Unable to map prerelease identifier (in: ${assemblyVersion}) to python, as sequence ${inspect(
            sequence
          )} is not an integer`
        );
      }
      const baseVersion = `${version.major}.${version.minor}.${version.patch}`;
      // See PEP 440: https://www.python.org/dev/peps/pep-0440/#pre-releases
      switch (label) {
        case "dev":
        case "pre":
          return `${baseVersion}.dev${sequence}`; // PEP 404 see developmental release as X.Y.devN
        case "alpha":
          return `${baseVersion}a${sequence}`; // PEP 404 see alpha release as X.YaN
        case "beta":
          return `${baseVersion}b${sequence}`; // PEP 404 see beta release as X.YbN
        case "rc":
          return `${baseVersion}rc${sequence}`; // PEP 404 see release candidate as X.YrcN
        default:
          throw new Error(
            `Unable to map prerelease identifier (in: ${assemblyVersion}) to python, as label ${inspect(
              label
            )} is not mapped (only "dev", "pre", "alpha", "beta" and "rc" are)`
          );
      }
    case TargetName.DOTNET:
    case TargetName.GO:
    case TargetName.JAVA:
    case TargetName.JAVASCRIPT:
      // Not touching - the NPM version number should be usable as-is
      break;
  }
  return assemblyVersion;
}

/**
 * Converts a semantic version range to the kind of bracket notation used by
 * Maven and NuGet. For example, this turns `^1.2.3` into `[1.2.3,2.0.0)`.
 *
 * @param semverRange The semantic version range to be converted.
 * @param suffix A version suffix to apply to versions in the resulting expression.
 * @param semver Whether the target supports full semantic versioning (including
 *               `-0` as the lowest possible prerelease identifier)
 *
 * @returns a bracket-notation version range.
 */
function toBracketNotation(
  semverRange: string,
  suffix?: string,
  {
    semver = true,
    target = TargetName.JAVASCRIPT,
  }: { semver?: boolean; target?: TargetName } = {}
): string {
  if (semverRange === "*") {
    semverRange = ">=0.0.0";
  }

  const range = new Range(semverRange);
  if (semverRange === range.range) {
    return semverRange;
  }

  return range.set
    .map((set) => {
      if (set.length === 1) {
        const version = set[0].semver.raw;
        if (!version && range.raw === ">=0.0.0") {
          // Case where version is '*'
          return "[0.0.0,)";
        }
        switch (set[0].operator || "=") {
          // "[version]" => means exactly version
          case "=":
            return `[${addSuffix(version)}]`;
          // "(version,]" => means greater than version
          case ">":
            return `(${addSuffix(version)},)`;
          // "[version,]" => means greater than or equal to that version
          case ">=":
            return `[${addSuffix(version)},)`;
          // "[,version)" => means less than version
          case "<":
            return `(,${addSuffix(version, !semver)})`;
          // "[,version]" => means less than or equal to version
          case "<=":
            return `(,${addSuffix(version)}]`;
        }
      } else if (set.length === 2) {
        const nugetRange = toBracketRange(set[0], set[1]);
        if (nugetRange) {
          return nugetRange;
        }
      }
      throw new Error(
        `Unsupported SemVer range set in ${semverRange}: ${set
          .map((comp) => comp.value)
          .join(", ")}`
      );
    })
    .join(", ");

  function toBracketRange(
    left: Comparator,
    right: Comparator
  ): string | undefined {
    if (left.operator.startsWith("<") && right.operator.startsWith(">")) {
      // Order isn't ideal, swap around..
      [left, right] = [right, left];
    }

    // With ^0.0.0, somehow we get a left entry with an empty operator and value, we'll fix this up
    if (left.operator === "" && left.value === "") {
      left = new Comparator(">=0.0.0", left.options);
    }

    if (!left.operator.startsWith(">") || !right.operator.startsWith("<")) {
      // We only support ranges defined like "> (or >=) left, < (or <=) right"
      return undefined;
    }

    const leftBrace = left.operator.endsWith("=") ? "[" : "(";
    const rightBrace = right.operator.endsWith("=") ? "]" : ")";
    return `${leftBrace}${addSuffix(left.semver.raw)},${addSuffix(
      right.semver.raw,
      right.operator === "<" && !semver
    )}${rightBrace}`;
  }

  function addSuffix(str: string | undefined, trimDashZero = false) {
    if (!str) {
      return "";
    }
    if (trimDashZero) {
      str = str.replace(/-0$/, "");
    }
    return suffix ? `${str}${suffix}` : toReleaseVersion(str, target);
  }
}
