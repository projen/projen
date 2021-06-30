import { StaleBehavior } from './stale';

interface Options {
  readonly stale: number;
  readonly close: number;
  readonly type: string;
}

export function renderBehavior(behavior: StaleBehavior | undefined, opts: Options): Partial<StaleBehavior> {
  const enabled = behavior?.enabled ?? true;
  if (!enabled) {
    return { daysBeforeStale: -1, daysBeforeClose: -1 };
  }

  return {
    daysBeforeStale: behavior?.daysBeforeStale ?? opts.stale,
    daysBeforeClose: behavior?.daysBeforeClose ?? opts.close,
    staleMessage: behavior?.staleMessage ?? `This ${opts.type} is now marked as stale because it hasn\'t seen activity for a while. Add a comment or it will be closed soon.`,
    closeMessage: behavior?.closeMessage ?? `Closing this ${opts.type} as it hasn\'t seen activity for a while. Please add a comment @mentioning a maintainer to reopen.`,
    staleLabel: behavior?.staleLabel ?? 'stale',
  };
};
