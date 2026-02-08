import { StaleBehavior } from "./stale";

interface Options {
  readonly stale: number;
  readonly close: number;
  readonly type: string;
}

export function renderBehavior(
  behavior: StaleBehavior | undefined,
  opts: Options,
): Partial<StaleBehavior> {
  const enabled = behavior?.enabled ?? true;
  if (!enabled) {
    return { daysBeforeStale: -1, daysBeforeClose: -1 };
  }

  const exemptLabels = behavior?.exemptLabels ?? ["backlog"];
  const messageSuffix =
    exemptLabels.length > 0
      ? ` If you wish to exclude this issue from being marked as stale, add the "${exemptLabels[0]}" label.`
      : "";

  return {
    daysBeforeStale: behavior?.daysBeforeStale ?? opts.stale,
    daysBeforeClose: behavior?.daysBeforeClose ?? opts.close,
    staleMessage:
      behavior?.staleMessage ??
      `This ${opts.type} is now marked as stale because it hasn\'t seen activity for a while. Add a comment or it will be closed soon.${messageSuffix}`,
    closeMessage:
      behavior?.closeMessage ??
      `Closing this ${opts.type} as it hasn\'t seen activity for a while. Please add a comment @mentioning a maintainer to reopen.${messageSuffix}`,
    staleLabel: behavior?.staleLabel ?? "stale",
    exemptLabels: exemptLabels,
  };
}
