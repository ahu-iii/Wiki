#!/usr/bin/env node
// Stop hook: cheap, non-blocking lint summary printed to stderr at session end.
// Intentionally counts only — full lint is human-triggered via the wiki-lint skill.

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const WIKI = path.join(ROOT, "wiki");
const CONTENT_DIRS = [
  "sources",
  "entities",
  "concepts",
  "topics",
  "comparisons",
  "questions",
  "synthesis",
];
const STALE_META_DAYS = 7;

function walk(dir, out = []) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (e.isFile() && e.name.endsWith(".md")) out.push(full);
  }
  return out;
}

function bodyAfterFrontmatter(text) {
  if (!text.startsWith("---")) return text;
  const end = text.indexOf("\n---", 3);
  if (end === -1) return text;
  return text.slice(end + 4);
}

function hasSourcesFooter(text) {
  return /^##\s+Sources\s*$/m.test(bodyAfterFrontmatter(text));
}

function frontmatterField(text, field) {
  const m = text.match(new RegExp(`^${field}:\\s*(.+)$`, "m"));
  return m ? m[1].trim().replace(/['"]/g, "") : null;
}

function daysSince(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (isNaN(d)) return null;
  return Math.floor((Date.now() - d.getTime()) / 86400000);
}

(function main() {
  if (!fs.existsSync(WIKI)) process.exit(0);

  let scanned = 0;
  let missingFooter = 0;
  const titles = new Set();
  const linkTargets = new Set();
  const allFiles = walk(WIKI);

  for (const f of allFiles) titles.add(path.basename(f, ".md"));

  for (const f of allFiles) {
    const rel = path.relative(ROOT, f).replace(/\\/g, "/");
    const text = fs.readFileSync(f, "utf8");
    const inContent = CONTENT_DIRS.some((d) => rel.includes(`wiki/${d}/`));
    if (inContent) {
      scanned++;
      if (!hasSourcesFooter(text)) missingFooter++;
    }
    for (const m of text.matchAll(/\[\[([^\]|#]+?)(?:[|#][^\]]*)?\]\]/g)) {
      linkTargets.add(m[1].trim());
    }
  }

  let deadLinks = 0;
  for (const t of linkTargets) if (!titles.has(t)) deadLinks++;

  const metaStale = [];
  for (const m of ["hot.md", "overview.md"]) {
    const p = path.join(ROOT, m);
    if (!fs.existsSync(p)) continue;
    const days = daysSince(frontmatterField(fs.readFileSync(p, "utf8"), "updated"));
    if (days != null && days > STALE_META_DAYS) metaStale.push(`${m}(${days}d)`);
  }

  const parts = [
    `[wiki-lint] scanned=${scanned}`,
    `missing_sources_footer=${missingFooter}`,
    `dead_wikilinks=${deadLinks}`,
  ];
  if (metaStale.length) parts.push(`stale_meta=${metaStale.join(",")}`);
  if (missingFooter || deadLinks || metaStale.length) {
    parts.push(`run wiki-lint skill for full report`);
  }
  process.stderr.write(parts.join(" | ") + "\n");
  process.exit(0);
})();
