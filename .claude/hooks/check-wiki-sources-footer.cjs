#!/usr/bin/env node
// PreToolUse hook: enforce inline source citation + populated `## Sources` footer
// on wiki content pages. Stdin: JSON tool input. Exit 2 + stderr blocks the call.
//
// Block conditions (any one):
//   1. Body is substantive AND has no `## Sources` heading at all.
//   2. Body has a `## Sources` heading but no `[[...]]` items underneath.
//   3. Body is substantive AND has zero `[[wikilink]]` references resolving to wiki/sources/.
// Pass: stub bodies (<60 non-stub words), non-content paths, and pages that satisfy all three.

const fs = require("fs");
const path = require("path");

const CONTENT_DIRS = [
  "sources",
  "entities",
  "concepts",
  "topics",
  "comparisons",
  "questions",
  "synthesis",
];
const WORD_THRESHOLD = 60;
const STUB_MARKERS = [
  /\*\(none\)\*/gi,
  /\*\(stub\)\*/gi,
  /<!--\s*TODO[^>]*-->/gi,
  /<!--\s*placeholder[^>]*-->/gi,
];

function readStdin() {
  return new Promise((resolve) => {
    let data = "";
    process.stdin.on("data", (c) => (data += c));
    process.stdin.on("end", () => resolve(data));
  });
}

function normalize(text) {
  return text.replace(/\r\n/g, "\n");
}

function isWikiContentPath(p) {
  if (!p || !p.endsWith(".md")) return false;
  const norm = p.replace(/\\/g, "/").toLowerCase();
  return CONTENT_DIRS.some((d) => norm.includes(`wiki/${d}/`));
}

function bodyAfterFrontmatter(text) {
  if (!text.startsWith("---")) return text;
  const end = text.indexOf("\n---", 3);
  if (end === -1) return text;
  return text.slice(end + 4);
}

function stripNoise(body) {
  let b = body
    .replace(/```[\s\S]*?```/g, "")
    .replace(/^#.*$/gm, "")
    .replace(/^>\s.*$/gm, "");
  for (const re of STUB_MARKERS) b = b.replace(re, "");
  return b.trim();
}

function wordCount(text) {
  return text.split(/\s+/).filter((t) => /[A-Za-z0-9]/.test(t)).length;
}

function isContentful(text) {
  return wordCount(stripNoise(bodyAfterFrontmatter(text))) >= WORD_THRESHOLD;
}

function findWikilinks(text) {
  const out = [];
  for (const m of text.matchAll(/\[\[([^\]|#]+?)(?:[|#][^\]]*)?\]\]/g)) {
    out.push(m[1].trim());
  }
  return out;
}

function loadSourceTitles(projectRoot) {
  const dir = path.join(projectRoot, "wiki", "sources");
  const set = new Set();
  try {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isFile() && entry.name.endsWith(".md")) {
        set.add(path.basename(entry.name, ".md"));
      }
    }
  } catch {
    // wiki/sources/ missing; gate falls back to "any wikilink at all"
  }
  return set;
}

function findSourcesFooterRegion(text) {
  const body = bodyAfterFrontmatter(text);
  const m = body.match(/^##\s+Sources\s*$/m);
  if (!m) return null;
  const start = body.indexOf(m[0]) + m[0].length;
  const rest = body.slice(start);
  const next = rest.match(/^##\s+/m);
  return next ? rest.slice(0, rest.indexOf(next[0])) : rest;
}

function footerHasItems(text) {
  const region = findSourcesFooterRegion(text);
  if (region == null) return false;
  return findWikilinks(region).length > 0;
}

function hasSourcesFooter(text) {
  return /^##\s+Sources\s*$/m.test(bodyAfterFrontmatter(text));
}

function bodyHasSourceCitation(text, sourceTitles) {
  // Citations must appear in the claims region (above the footer), not just in the footer list.
  const body = bodyAfterFrontmatter(text);
  const m = body.match(/^##\s+Sources\s*$/m);
  const claimsRegion = m ? body.slice(0, body.indexOf(m[0])) : body;
  const links = findWikilinks(claimsRegion);
  if (sourceTitles.size === 0) {
    // No source pages exist yet — fall back to "any wikilink at all" so very early
    // vault state isn't paralyzed before the first source page is filed.
    return links.length > 0;
  }
  return links.some((t) => sourceTitles.has(t));
}

function buildProposedContent(tool, input, target) {
  if (tool === "Write") {
    if (typeof input.content !== "string") {
      return { error: `Write payload missing 'content' string` };
    }
    return { content: normalize(input.content) };
  }
  let current = "";
  try {
    current = normalize(fs.readFileSync(target, "utf8"));
  } catch {
    current = "";
  }
  if (tool === "Edit") {
    if (typeof input.old_string !== "string" || typeof input.new_string !== "string") {
      return { error: `Edit payload missing 'old_string' or 'new_string'` };
    }
    const oldStr = normalize(input.old_string);
    const newStr = normalize(input.new_string);
    const out = input.replace_all
      ? current.split(oldStr).join(newStr)
      : current.replace(oldStr, newStr);
    return { content: out };
  }
  if (tool === "MultiEdit") {
    if (!Array.isArray(input.edits) || input.edits.length === 0) {
      return { error: `MultiEdit payload missing or empty 'edits' array` };
    }
    let proposed = current;
    for (const [i, e] of input.edits.entries()) {
      if (!e || typeof e.old_string !== "string" || typeof e.new_string !== "string") {
        return { error: `MultiEdit edits[${i}] missing 'old_string' or 'new_string'` };
      }
      const o = normalize(e.old_string);
      const n = normalize(e.new_string);
      proposed = e.replace_all ? proposed.split(o).join(n) : proposed.replace(o, n);
    }
    return { content: proposed };
  }
  return { content: null };
}

function block(rel, lines) {
  process.stderr.write(
    [`[wiki-guard] BLOCKED: ${rel}`, ...lines, ``, `See CLAUDE.md §Reliability Primitives.`].join("\n") + "\n"
  );
  process.exit(2);
}

async function run() {
  const raw = await readStdin();
  let payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    process.exit(0);
  }

  const tool = payload.tool_name || payload.tool || "";
  const input = payload.tool_input || payload.input || {};
  const target = input.file_path || input.path || "";

  if (!isWikiContentPath(target)) process.exit(0);

  const built = buildProposedContent(tool, input, target);
  if (built.content === null) process.exit(0); // unsupported tool
  const rel = path.relative(process.cwd(), target).replace(/\\/g, "/");

  if (built.error) {
    block(rel, [`Malformed tool payload: ${built.error}`]);
  }

  const proposed = built.content;
  if (!isContentful(proposed)) process.exit(0);

  const sourceTitles = loadSourceTitles(process.cwd());

  if (!hasSourcesFooter(proposed)) {
    block(rel, [
      `Substantive content (≥${WORD_THRESHOLD} words) but no "## Sources" footer.`,
      `Add the footer (with at least one [[Source]] item) and inline-cite claims with [[Source]] wikilinks.`,
    ]);
  }

  if (!footerHasItems(proposed)) {
    block(rel, [
      `"## Sources" footer is empty (no [[wikilink]] items beneath the heading).`,
      `Add at least one [[Source]] entry, or downgrade the page to a stub if it has no claims yet.`,
    ]);
  }

  if (!bodyHasSourceCitation(proposed, sourceTitles)) {
    block(rel, [
      `No [[Source]] wikilink in the body (claims region above the footer).`,
      `Inline-cite factual claims with [[Source]] wikilinks, or mark uncertain claims with (?) / > [!gap].`,
    ]);
  }

  process.exit(0);
}

if (require.main === module) {
  run();
} else {
  // Exported for tests
  module.exports = {
    normalize,
    isWikiContentPath,
    bodyAfterFrontmatter,
    stripNoise,
    wordCount,
    isContentful,
    findWikilinks,
    loadSourceTitles,
    findSourcesFooterRegion,
    footerHasItems,
    hasSourcesFooter,
    bodyHasSourceCitation,
    buildProposedContent,
    WORD_THRESHOLD,
  };
}
