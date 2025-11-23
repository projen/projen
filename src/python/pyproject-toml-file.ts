import { IConstruct } from "constructs";
import { TomlFile } from "../toml";
import { PyprojectToml, toJson_PyprojectToml } from "./pyproject-toml";

/**
 * Represents configuration of a pyproject.toml file
 *
 * @see https://packaging.python.org/en/latest/guides/writing-pyproject-toml/
 */
export class PyprojectTomlFile extends TomlFile {
  constructor(scope: IConstruct, config: PyprojectToml) {
    super(scope, "pyproject.toml", {
      omitEmpty: false,
      obj: toJson_PyprojectToml(config),
    });
  }
}
