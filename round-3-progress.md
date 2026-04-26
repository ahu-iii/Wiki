# Round 3 — Progress Snapshot

**Saved:** 2026-04-26 (after step 2.1 completes)
**Plan:** `C:\Users\Jose\.claude\plans\try-to-implement-a-magical-salamander.md`
**Baseline eval:** `last-independent-eval-2026-04-20.md`

---

## Completed

### 2.4 — Trim `wiki-lint.md` spec
- Removed `cascade-supersession` table row; replaced with a one-line *Deferred:* note explaining when to build it.
- Reworked the trust-report rubric: split into two independent axes — *factual risk* (contradictions + open gaps + non-active source citations) vs *maintenance status* (volatility staleness only). Per-page table omitted while every page has zero factual-risk signals.
- File: `.claude/skills/wiki-lint.md`.

### 2.5 — Compress `CLAUDE.md` Enforcement block + create hooks README
- Compressed the 13-line table + prose in `CLAUDE.md §Enforcement` to a single paragraph pointing at `.claude/hooks/README.md`.
- Created `.claude/hooks/README.md` holding the detailed hook table, source-lifecycle note, two-axis trust view, and the self-test command (forward reference).
- Net always-loaded context: ≈ −10 lines.

### 2.1 — Rewrite `check-wiki-sources-footer.cjs` (the eval's headline ask)
- Backup preserved at `.claude/hooks/check-wiki-sources-footer.cjs.bak`.
- Replaced the 200-char threshold with **word-count contentfulness**: body excluding frontmatter, fenced code, headings, blockquotes, and stub markers (`*(none)*`, `*(stub)*`, `<!-- TODO -->`, `<!-- placeholder -->`); threshold = 60 words.
- **Inline-citation gate added.** At hook time, builds source-title set from `wiki/sources/*.md`, parses `[[...]]` references in the *claims region* (above the `## Sources` footer), blocks if zero references resolve to a source page. Falls back to "any wikilink at all" when source set is empty so very early vault state isn't paralyzed.
- **Footer non-emptiness validated.** When `## Sources` heading is present, requires ≥1 `[[...]]` wikilink between the heading and the next `##` (or EOF). `*(none)*` placeholder is a block.
- **CRLF normalized** at input boundary; all regexes operate on LF form.
- **Malformed payloads rejected** with a clear error instead of silent pass: Write missing `content`, Edit missing `old_string`/`new_string`, MultiEdit missing/empty `edits`, MultiEdit per-edit malformed.
- **Stub allowlist preserved.** Pages whose body is below 60 words pass through.
- Module exports a public API surface for the upcoming self-test.
- Three sequential block conditions, each with a specific stderr message:
  1. Substantive content but no `## Sources` heading.
  2. `## Sources` heading present but no `[[...]]` items underneath.
  3. Substantive content with no source-resolving wikilink in the claims region.

---

## Pending

### 2.2 — Hook self-test
Create `.claude/hooks/check-wiki-sources-footer.test.cjs`. Plain Node, no framework. Eight fixture cases:

1. New page, substantive prose, no footer → block.
2. New page, substantive prose, footer with `[[Source]]` items, source citation in body → pass.
3. Stub page, ≤60 words → pass.
4. `## Sources\n\n*(none)*` → block (footer non-emptiness).
5. Substantive prose, footer present, *zero* source citations in body → block (inline-citation gate).
6. CRLF-encoded file → parses correctly, same verdict as LF.
7. MultiEdit with missing `edits` array → blocks with clear error.
8. Edit on a non-content path (`README.md`, `_templates/*`, `raw/*`) → pass-through.

### 2.6 — Backfill sweep
Read each `wiki/{sources,entities,concepts,topics,questions,synthesis,comparisons}/*.md` page through the new hook logic. Patch any failures. Output: `wiki/meta/backfill-2026-04-26.md`.

### 2.3 — Manifest-path-resolves lint check
Extend `.claude/hooks/lint-summary.cjs`: parse `raw/manifest.yaml`, verify `path:` exists on disk and `wiki_page:` resolves to `wiki/sources/<title>.md`. Emit `manifest_dangling: N` in the stderr summary.

### §4 — Independent evaluator
Dispatch `Agent(subagent_type="architect")` with no prior context. Audit round 3 against the round-2 eval. Output: `last-independent-eval-2026-04-26.md` mirroring the round-2 file structure (sections A–H), ≤ 1500 words.

---

## Verification (deferred until 2.2 + 2.6 land)

- `node .claude/hooks/check-wiki-sources-footer.test.cjs` — all 8 cases pass.
- Manual: writing a content page with hallucinated prose and no source wikilink → blocked.
- Manual: writing a stub page (frontmatter + 2-line description) → passes.
- Stop event stderr summary includes `manifest_dangling: 0`.
- `wiki/meta/backfill-2026-04-26.md` confirms every legacy page passes the new gate.
- `CLAUDE.md` line count ≤ round-2 (~216).
