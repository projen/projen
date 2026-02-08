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
  suffix?: string,
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
            TargetName.PYTHON,
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
        .join(", "),
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
  target: TargetName,
): string {
  const version = parse(assemblyVersion);
  if (version == null) {
    throw new Error(
      `Unable to parse the provided assembly version: "${assemblyVersion}"`,
    );
  }
  if (version.prerelease.length === 0) {
    return assemblyVersion;
  }
  switch (target) {
    case TargetName.PYTHON:
      const baseVersion = `${version.major}.${version.minor}.${version.patch}`;

      // Python supports a limited set of identifiers... And we have a mapping table...
      // https://packaging.python.org/guides/distributing-packages-using-setuptools/#pre-release-versioning
      const releaseLabels: Record<string, string> = {
        alpha: "a",
        beta: "b",
        rc: "rc",
        post: "post",
        dev: "dev",
        pre: "pre",
      };

      const validationErrors: string[] = [];

      // Ensure that prerelease composed entirely of [label, sequence] pairs
      version.prerelease.forEach((elem, idx, arr) => {
        const next: string | number | undefined = arr[idx + 1];
        if (typeof elem === "string") {
          if (!Object.keys(releaseLabels).includes(elem)) {
            validationErrors.push(
              `Label ${elem} is not one of ${Object.keys(releaseLabels).join(
                ",",
              )}`,
            );
          }
          if (next === undefined || !Number.isInteger(next)) {
            validationErrors.push(
              `Label ${elem} must be followed by a positive integer`,
            );
          }
        }
      });

      if (validationErrors.length > 0) {
        throw new Error(
          `Unable to map prerelease identifier (in: ${assemblyVersion}) components to python: ${inspect(
            version.prerelease,
          )}. The format should be 'X.Y.Z-[label.sequence][.post.sequence][.(dev|pre).sequence]', where sequence is a positive integer and label is one of ${inspect(
            Object.keys(releaseLabels),
          )}. Validation errors encountered: ${validationErrors.join(", ")}`,
        );
      }

      // PEP440 supports multiple labels in a given version, so
      // we should attempt to identify and map as many labels as
      // possible from the given prerelease input
      // e.g. 1.2.3-rc.123.dev.456.post.789 => 1.2.3.rc123.dev456.post789
      const postIdx = version.prerelease.findIndex(
        (v) => v.toString() === "post",
      );
      const devIdx = version.prerelease.findIndex((v) =>
        ["dev", "pre"].includes(v.toString()),
      );
      const preReleaseIdx = version.prerelease.findIndex((v) =>
        ["alpha", "beta", "rc"].includes(v.toString()),
      );
      const prereleaseVersion = [
        preReleaseIdx > -1
          ? `${releaseLabels[version.prerelease[preReleaseIdx]]}${
              version.prerelease[preReleaseIdx + 1] ?? 0
            }`
          : undefined,
        postIdx > -1
          ? `post${version.prerelease[postIdx + 1] ?? 0}`
          : undefined,
        devIdx > -1 ? `dev${version.prerelease[devIdx + 1] ?? 0}` : undefined,
      ]
        .filter((v) => v)
        .join(".");

      return version.build.length > 0
        ? `${baseVersion}.${prereleaseVersion}+${version.build.join(".")}`
        : `${baseVersion}.${prereleaseVersion}`;
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
  }: { semver?: boolean; target?: TargetName } = {},
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
          .join(", ")}`,
      );
    })
    .join(", ");

  function toBracketRange(
    left: Comparator,
    right: Comparator,
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
      right.operator === "<" && !semver,
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
