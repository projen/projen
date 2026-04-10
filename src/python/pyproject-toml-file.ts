import type { IConstruct } from "constructs";
import { TomlFile } from "../toml";
import type { PyprojectToml } from "./pyproject-toml";
import { toJson_PyprojectToml } from "./pyproject-toml";
import type { IResolver } from "../file";

/**
 * Represents configuration of a pyproject.toml file
 *
 * @see https://packaging.python.org/en/latest/guides/writing-pyproject-toml/
 */
export class PyprojectTomlFile extends TomlFile {
  constructor(scope: IConstruct, config: PyprojectToml) {
    super(scope, "pyproject.toml", {
      omitEmpty: false,
      obj: config,
    });
  }

  protected synthesizeContent(resolver: IResolver): string | undefined {
    return super.synthesizeContent({
      resolve: (value) => toJson_PyprojectToml(resolver.resolve(value)),
    });
  }
}
