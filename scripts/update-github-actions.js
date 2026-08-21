#!/usr/bin/env node
/**
 * Resolves the approved major version line of every GitHub Action in
 * resources/github-actions.jsonc to a concrete ref: an immutable release tag
 * when available (preferred), or the release's commit SHA otherwise.
 *
 * Rules:
 * - Only releases older than the cooldown are considered, so brand-new
 *   releases have time to be yanked or patched before we adopt them.
 * - The "major" field is never changed. Newer major lines are printed to
 *   stdout, and when --create-issues is passed (only done by the upgrade
 *   workflow), a tracking issue is opened per action and target major.
 *   Existing open issues are never duplicated.
 * - Only "pin", "version" and "isImmutable" are written, preserving all
 *   comments in the file.
 *
 * Used by the "update-github-actions" task, which the "upgrade-bundled"
 * workflow runs on schedule.
 *
 * Usage: node scripts/update-github-actions.js [--dry-run] [--create-issues]
 *
 * Auth: uses $GITHUB_TOKEN when set. Required for creating tracking issues;
 * resolution works unauthenticated but may hit rate limits.
 */
const { readFileSync, writeFileSync } = require("node:fs");
const { join } = require("node:path");
const { parseArgs } = require("node:util");
const JSONC = require("comment-json");

const ACTIONS_FILE = join(__dirname, "..", "resources", "github-actions.jsonc");
const REPO = process.env.GITHUB_REPOSITORY ?? "projen/projen";
const ISSUE_LABEL = "github-actions-upgrade";
const DEFAULT_COOLDOWN_DAYS = 7;

const { values: args } = parseArgs({
  options: {
    "dry-run": { type: "boolean", default: false },
    "create-issues": { type: "boolean", default: false },
  },
});
const DRY_RUN = args["dry-run"];
const CREATE_ISSUES = args["create-issues"];
const TOKEN = process.env.GITHUB_TOKEN;

async function api(path, { method = "GET", body, allow404 = false } = {}) {
  const response = await fetch(`https://api.github.com${path}`, {
    method,
    headers: {
      accept: "application/vnd.github+json",
      "x-github-api-version": "2022-11-28",
      ...(TOKEN ? { authorization: `Bearer ${TOKEN}` } : {}),
      ...(body ? { "content-type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (allow404 && response.status === 404) {
    return undefined;
  }
  if (!response.ok) {
    throw new Error(`${method} ${path}: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

/** Extract the numeric major from a tag like "v7" or "v7.0.1". */
function majorOf(tag) {
  const match = /^v(\d+)/.exec(tag);
  return match ? Number(match[1]) : undefined;
}

function isPastCooldown(release, cooldownDays) {
  const published = new Date(release.published_at ?? release.created_at).getTime();
  return Date.now() - published >= cooldownDays * 24 * 60 * 60 * 1000;
}

/** Resolve a tag to the commit SHA it points at, dereferencing annotated tags. */
async function resolveTagSha(action, tag) {
  const ref = await api(`/repos/${action}/git/ref/tags/${tag}`);
  if (ref.object.type === "tag") {
    const annotated = await api(`/repos/${action}/git/tags/${ref.object.sha}`);
    return annotated.object.sha;
  }
  return ref.object.sha;
}

/**
 * Pick the newest stable release within the given major line that is past
 * the cooldown, and detect the highest newer major line (also past cooldown).
 */
function analyzeReleases(releases, currentMajor, cooldownDays) {
  const stable = releases.filter(
    (r) => !r.draft && !r.prerelease && majorOf(r.tag_name) !== undefined,
  );
  const eligible = stable.filter((r) => isPastCooldown(r, cooldownDays));

  const inLine = eligible
    .filter((r) => majorOf(r.tag_name) === currentMajor)
    .sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

  const newerMajor = eligible.reduce((max, r) => {
    const major = majorOf(r.tag_name);
    return major > currentMajor && major > (max ?? 0) ? major : max;
  }, undefined);

  return { latest: inLine[0], newerMajor };
}

async function ensureLabel() {
  const existing = await api(`/repos/${REPO}/labels/${ISSUE_LABEL}`, { allow404: true });
  if (!existing) {
    await api(`/repos/${REPO}/labels`, {
      method: "POST",
      body: {
        name: ISSUE_LABEL,
        color: "1D76DB",
        description: "A new major version of a GitHub Action is available",
      },
    });
  }
}

async function openTrackingIssue(action, newMajor, openIssues) {
  const title = `Upgrade ${action} to v${newMajor}`;
  if (openIssues.some((issue) => issue.title === title)) {
    console.log(`issue exists: ${title}`);
    return;
  }
  await api(`/repos/${REPO}/issues`, {
    method: "POST",
    body: {
      title,
      labels: [ISSUE_LABEL],
      body: [
        `A new major version line of \`${action}\` is available: **v${newMajor}**.`,
        "",
        "Major upgrades are never applied automatically. To adopt it, review the",
        `[release notes](https://github.com/${action}/releases) and update the`,
        '"major" field of this action in `resources/github-actions.jsonc`.',
        "",
        "---",
        '*Automatically created by the "update-github-actions" task.*',
      ].join("\n"),
    },
  });
  console.log(`created issue: ${title}`);
}

async function main() {
  const source = readFileSync(ACTIONS_FILE, "utf-8");
  const doc = JSONC.parse(source);
  const cooldownDefault = doc.cooldownDays ?? DEFAULT_COOLDOWN_DAYS;

  const majorUpgrades = [];
  let changed = false;

  for (const action of Object.keys(doc.actions)) {
    const entry = doc.actions[action];
    const currentMajor = majorOf(entry.major);
    const cooldownDays = entry.cooldownDays ?? cooldownDefault;

    const releases = await api(`/repos/${action}/releases?per_page=100`);
    const { latest, newerMajor } = analyzeReleases(releases, currentMajor, cooldownDays);

    if (newerMajor) {
      majorUpgrades.push({ action, newerMajor });
    }

    if (!latest) {
      console.log(`${action}: no eligible release in ${entry.major} (cooldown ${cooldownDays}d), leaving unchanged`);
      continue;
    }

    let pin;
    let version;
    let isImmutable;
    if (latest.immutable) {
      pin = latest.tag_name;
      isImmutable = true;
    } else {
      pin = await resolveTagSha(action, latest.tag_name);
      version = latest.tag_name;
    }

    if (entry.pin === pin) {
      continue;
    }

    console.log(`${action}: ${entry.pin ?? entry.major} -> ${pin}${version ? ` (${version})` : ""}${isImmutable ? " (immutable)" : ""}`);
    entry.pin = pin;
    if (version) {
      entry.version = version;
    } else {
      delete entry.version;
    }
    if (isImmutable) {
      entry.isImmutable = true;
    } else {
      delete entry.isImmutable;
    }
    changed = true;
  }

  if (changed && !DRY_RUN) {
    writeFileSync(ACTIONS_FILE, `${JSONC.stringify(doc, null, 2)}\n`);
    console.log(`Updated ${ACTIONS_FILE}`);
  } else if (changed) {
    console.log("[dry-run] file not written");
  } else {
    console.log("All pins already up to date.");
  }

  if (majorUpgrades.length > 0) {
    for (const { action, newerMajor } of majorUpgrades) {
      console.log(`new major available: ${action} v${newerMajor}`);
    }

    if (!CREATE_ISSUES) {
      console.log("Pass --create-issues to open tracking issues for these.");
      return;
    }
    if (DRY_RUN) {
      console.log("[dry-run] tracking issues not created");
      return;
    }
    if (!TOKEN) {
      console.warn("GITHUB_TOKEN not set, skipping tracking issue creation.");
      return;
    }
    await ensureLabel();
    const openIssues = await api(
      `/repos/${REPO}/issues?labels=${ISSUE_LABEL}&state=open&per_page=100`,
    );
    for (const { action, newerMajor } of majorUpgrades) {
      await openTrackingIssue(action, newerMajor, openIssues);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
