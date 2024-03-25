import { Project } from "../project";

/**
 * Generate workflow name with suffix based on if project is subproject or not
 * @param base name prefix
 * @param project to which the workflow belongs
 */
export function workflowNameForProject(base: string, project: Project): string {
  // Subprojects
  if (project.parent) {
    return `${base}_${fileSafeName(project.name)}`;
  }

  // root project doesn't get a suffix
  return base;
}

function fileSafeName(name: string): string {
  return name.replace("@", "").replace(/\//g, "-");
}
