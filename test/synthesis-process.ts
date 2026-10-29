// eslint-disable-next-line @typescript-eslint/no-restricted-imports -- The command helpers do not expose a child IPC channel.
import { fork } from "child_process";
import * as path from "path";

export function worker(env: NodeJS.ProcessEnv = {}): {
  next(): Promise<any>;
  send(message: any): void;
  stop(): Promise<void>;
} {
  const child = fork(path.join(__dirname, "synthesis-worker.cjs"), [], {
    stdio: ["ignore", "ignore", "pipe", "ipc"],
    env: { ...process.env, ...env },
  });
  const queue: any[] = [];
  const waiters: Array<(message: any) => void> = [];
  let diagnostics = "";
  child.stderr!.on("data", (chunk) => {
    diagnostics += chunk;
  });
  const deliver = (message: any) => {
    const waiter = waiters.shift();
    if (waiter) waiter(message);
    else queue.push(message);
  };
  child.on("message", deliver);
  child.on("error", (error) =>
    deliver({ event: "process-error", message: error.message }),
  );
  child.on("exit", (code) => deliver({ event: "exit", code, diagnostics }));
  return {
    next: async () => {
      if (queue.length) return queue.shift();
      return new Promise((resolve, reject) => {
        const deliverNext = (message: any) => {
          clearTimeout(guard);
          resolve(message);
        };
        const guard = setTimeout(() => {
          const index = waiters.indexOf(deliverNext);
          if (index !== -1) waiters.splice(index, 1);
          reject(
            new Error(
              "Infrastructure watchdog: child produced no event. " +
                diagnostics,
            ),
          );
        }, 15000);
        waiters.push(deliverNext);
      });
    },
    send: (message) => {
      child.send(message);
    },
    stop: async () => {
      if (child.exitCode !== null || child.signalCode !== null) return;
      await new Promise<void>((resolve) => {
        child.once("exit", () => resolve());
        child.kill();
      });
    },
  };
}
