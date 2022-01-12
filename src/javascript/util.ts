import { basename, dirname, extname, join, sep } from "path";

export function renderBundleName(entrypoint: string) {
  const parts = join(entrypoint).split(sep);
  if (parts[0] === "src") {
    parts.shift(); // just remove 'src' if its the first element for ergonomics
  }

  const p = parts.join(sep);
  const dir = dirname(p);
  const base = basename(p, extname(p));
  return join(dir, base);
}
