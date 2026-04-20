#!/usr/bin/env node
// PreToolUse hook: block Write/Edit to wiki content pages without `## Sources` footer.
// Stdin: JSON tool input from Claude Code. Exit 2 + stderr blocks the call.

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

function readStdin() {
  return new Promise((resolve) => {
    let data = "";
    process.stdin.on("data", (c) => (data += c));
    process.stdin.on("end", () => resolve(data));
  });
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

function hasSourcesFooter(text) {
  return /^##\s+Sources\s*$/m.test(bodyAfterFrontmatter(text));
}

function isContentful(text) {
  // Stub allowance: very small bodies pass through. We block once a page
  // contains real prose (>200 non-heading chars).
  const body = bodyAfterFrontmatter(text)
    .replace(/```[\s\S]*?```/g, "")
    .replace(/^#.*$/gm, "")
    .replace(/^>\s.*$/gm, "")
    .trim();
  return body.length > 200;
}

(async () => {
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

  let proposedContent = "";
  if (tool === "Write") {
    proposedContent = input.content || "";
  } else if (tool === "Edit" || tool === "MultiEdit") {
    let current = "";
    try {
      current = fs.readFileSync(target, "utf8");
    } catch {
      current = "";
    }
    if (tool === "Edit") {
      const oldStr = input.old_string || "";
      const newStr = input.new_string || "";
      proposedContent = input.replace_all
        ? current.split(oldStr).join(newStr)
        : current.replace(oldStr, newStr);
    } else {
      proposedContent = current;
      for (const e of input.edits || []) {
        const o = e.old_string || "";
        const n = e.new_string || "";
        proposedContent = e.replace_all
          ? proposedContent.split(o).join(n)
          : proposedContent.replace(o, n);
      }
    }
  } else {
    process.exit(0);
  }

  if (!isContentful(proposedContent)) process.exit(0);
  if (hasSourcesFooter(proposedContent)) process.exit(0);

  const rel = path.relative(process.cwd(), target).replace(/\\/g, "/");
  process.stderr.write(
    [
      `[wiki-guard] BLOCKED: ${rel}`,
      `Wiki content pages must end with a "## Sources" section.`,
      `Add the footer (even an empty stub) and retry. See CLAUDE.md §Reliability Primitives.`,
    ].join("\n") + "\n"
  );
  process.exit(2);
})();
