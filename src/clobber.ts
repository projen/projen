import { Component } from "./component";
import type { Project } from "./project";

export class Clobber extends Component {
  constructor(project: Project) {
    super(project);

    const task = this.project.addTask("clobber", {
      description: "hard resets to HEAD of origin and cleans the local repo",
      condition: "git diff --exit-code > /dev/null",
      env: {
        BRANCH: "$(git branch --show-current)",
      },
    });

    task.execArgs(["git", "checkout", "-b", "scratch"], {
      name: 'save current HEAD in "scratch" branch',
    });
    // `$BRANCH` needs a shell to expand
    task.exec('git checkout "$BRANCH"');
    task.execArgs(["git", "fetch", "origin"], {
      name: "fetch latest changes from origin",
    });
    task.exec('git reset --hard "origin/$BRANCH"', {
      name: "hard reset to origin commit",
    });
    task.execArgs(["git", "clean", "-fdx"], {
      name: "clean all untracked files",
    });
    task.say(
      'ready to rock! (unpushed commits are under the "scratch" branch)',
    );
  }
}
