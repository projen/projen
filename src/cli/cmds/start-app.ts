import * as chalk from "chalk";
import * as inquirer from "inquirer";
import { TaskCategory, TaskRuntime, TaskSpec } from "../../tasks";

const EXIT_MARKER = "$exit";

export async function showStartMenu(tasks: TaskRuntime) {
  const { command } = await inquirer.prompt([
    {
      type: "list",
      name: "command",
      message: "Scripts:",
      choices: renderChoices(tasks),
      pageSize: 100,
      loop: false,
    },
  ]);

  if (command === EXIT_MARKER) {
    return;
  }

  tasks.runTask(command);
}

export function printStartMenu(tasks: TaskRuntime, root?: string) {
  if (root && root !== ".") {
    console.error(chalk.cyanBright.bold(`Project: ${root}`));
  }
  console.error(chalk.cyanBright.underline("Commands:"));
  for (const entry of renderChoices(tasks)) {
    if (entry.type === "separator") {
      console.error(entry.line);
    } else if (entry.name && entry.value !== "$exit") {
      console.error(entry.name);
    }
  }
}

function renderChoices(tasksrt: TaskRuntime) {
  const tasks = tasksrt.tasks;
  const taskNames = tasks.map((t) => t.name);

  const result = new Array();
  let category;

  const width = Math.max(...taskNames.map((k) => k.length));

  for (const task of tasks.sort(sortByPriority)) {
    const cat = task.category ?? TaskCategory.MISC;
    if (cat !== category) {
      result.push(new inquirer.Separator("  "));
      result.push(new inquirer.Separator(headingForCategory(cat)));
    }
    category = cat;
    result.push({
      name: `${task.name.padEnd(width)}   ${task.description ?? ""}`,
      value: task.name,
      short: task.description,
    });
  }

  result.push(new inquirer.Separator("  "));
  result.push({
    name: "EXIT",
    value: EXIT_MARKER,
  });

  return result;
}

function headingForCategory(category: TaskCategory) {
  switch (category) {
    case TaskCategory.BUILD:
      return "BUILD";
    case TaskCategory.TEST:
      return "TEST";
    case TaskCategory.RELEASE:
      return "RELEASE";
    case TaskCategory.MAINTAIN:
      return "MAINTAIN";
    case TaskCategory.MISC:
    default:
      return "MISC";
  }
}

function sortByPriority(e1: TaskSpec, e2: TaskSpec) {
  const p1 = e1.category ?? TaskCategory.MISC;
  const p2 = e2.category ?? TaskCategory.MISC;
  if (p1 > p2) return 1;
  if (p1 < p2) return -1;
  return 0;
}
