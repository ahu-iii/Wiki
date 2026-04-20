# Round 2 Independent Evaluation — 2026-04-20

> Author: independent reviewer (architect agent), no prior conversation memory.
> Scope: assess the round-2 changes made to the wiki vault on 2026-04-20.
> Compares against round 1 (`redesign-evaluation-2026-04-19.md`) and the counterfactual of skipping round 2.

## A. Did round 2 solve "discipline decay"?

**Partially, in the right direction, with a structural hole.** The PreToolUse hook (`.claude/hooks/check-wiki-sources-footer.cjs:54-110`) is the first real harness-level enforcement and converts *one* primitive (the `## Sources` footer) from norm into mechanism. That is genuine progress — round 1's #1-priority follow-up is now built.

But three of the four reliability primitives remain pure norms: **inline citation, uncertainty markers `(?)` / `[!gap]`, and supersession callouts** are still self-policed. The hook only checks that a heading literally matches `^##\s+Sources\s*$` (line 40) — it does not check whether the section has any items, whether inline `[[Source]]` citations exist in the body, or whether claims are uncited. An LLM under pressure can ship `## Sources\n\n*(none)*` and pass. The biggest decay vector named in round 1 (`S1`/`M4` — uncited claims) is barely narrower.

## B. Hook design quality

**The 200-char allowance is the wrong shape.** `check-wiki-sources-footer.cjs:43-52` strips fences, headings, and blockquotes, then thresholds on raw character count. Pathologies:

- **False negative (the obvious bypass):** A 199-char prose paragraph with three confident hallucinated claims sails through.
- **False negative (heading farms):** A page composed entirely of `##` headings + bullet-less prose under 200 chars passes. Bullets are not stripped, so a 30-line bulleted entity page passes if the bullet text is short.
- **False positive:** A long template scaffold with TODO blockquotes can flip the threshold mid-edit and surprise-block a small Edit. The `Edit` path (`:79-84`) reconstructs full content from `current` — if the file has CRLF line endings on Windows, `text.indexOf("\n---", 3)` (line 34) misses the closing `---\r\n`, the entire file is treated as body, and the regex still works — but `bodyAfterFrontmatter` returns wrong content for any frontmatter-aware logic added later. Brittle.
- **Cross-cutting:** `MultiEdit` always returns `proposedContent = current` if `input.edits` is missing (line 86-87) — a malformed payload silently passes.

A stronger boundary would be: "page has any `[[wikilink]]` to `wiki/sources/`" → require footer. Tie the trigger to actual citation usage rather than a character count.

## C. New lint checks vs. cost

- `stale-meta` (wiki-lint.md:31): cheap, justified, already implemented in `lint-summary.cjs:86-92`. Net positive.
- `source-status` (`:32`): correct in principle but **wholly speculative at 1 source**. With `manifest.yaml` containing one `active` entry, this check has never fired and cannot fire. Acceptable as cheap forward-looking infra; do not pretend it is earning its keep yet.
- `cascade-supersession` (`:33`): graph-walk over wikilinks for `[!superseded]` callouts — round 1 itself called this "non-trivial to implement reliably" (M1). Specifying it as a lint row without an implementation is **a documented IOU, not a feature**. Borderline over-engineering for a 32-page vault with zero supersessions on disk.

## D. Trust-report design

**Premature at this scale, and the thresholds are arbitrary.** `wiki-lint.md:114` defines `medium = 1–2 signals, low = 3+`. With ~32 pages and effectively zero contradictions / supersessions / gaps in the corpus, every page will compute `high` and the table is decorative. Worse, the scoring conflates orthogonal axes — `volatility: time-sensitive (45d)` is a maintenance hint, not the same kind of risk as an unresolved contradiction, but they both contribute one "signal." That risks **false confidence calibration**: a page with three open `[!gap]` callouts (honest, well-documented uncertainty) scores worse than a page with zero callouts and three confident hallucinations. The placeholder file (`wiki/meta/trust-report.md`) is fine; the scoring rubric needs another pass before it has any users.

## E. Source-manifest design

**Decoupling is correct; the synchronization burden is real.** `raw/manifest.yaml:14-17` keys by `path:` (raw file) and joins to wiki via `wiki_page:` string. Two failure modes: (1) when a source file is renamed in `raw/`, the manifest entry must be hand-updated — nothing enforces this; (2) when a wiki source page is renamed, `wiki_page:` silently dangles. The schema header offers no lint check that `manifest.yaml` paths actually resolve to files on disk. **Add that one check to `lint-summary.cjs` before the manifest grows past five entries** — it's ~10 lines and prevents the entire failure class.

## F. Things round 2 should have done but didn't

1. **An inline-citation lint check in the hook.** The hook polices *the footer* — the cheap, syntactic primitive — and leaves *the actual claims* unchecked. A regex for proper-noun-density vs. `[[wikilink]]`-density would be noisy but more honest than the current "does the heading exist" gate.
2. **A backfill pass on the existing pages.** Round 1 explicitly flagged "fix on touch" as bootstrap debt; round 2 added enforcement that will block the *next* edit to those 27 footer-less pages with a confusing error. The hook may surprise-block legitimate small Edits to legacy pages that predate the convention. A one-time migration would have cost ~30 minutes.
3. **Hook self-test.** `.claude/hooks/` has no test fixture. The CRLF / MultiEdit edge cases above would surface in 10 minutes of test-writing.

## G. Things round 2 over-corrected on

1. **`cascade-supersession` and the trust report at 32 pages with 0 supersessions.** Pure speculation tax. Specify when the first supersession is filed.
2. **`raw/manifest.yaml` for a single active source.** A YAML file plus schema documentation plus two lint checks for one row. Build it when source #5 lands.
3. **CLAUDE.md grew.** The new "Enforcement (harness layer)" block added ~13 lines of always-loaded context. Not catastrophic — it's still ~216 lines vs. round 1's 203 — but the round 1 win was framed as "−48% context"; this nibbles it back. The table could compress to 3 lines pointing at a `.claude/hooks/README.md`.

## H. Independent overall verdict

**Materially better, with caveats.** Versus skipping round 2 entirely:
- The PreToolUse hook is a real durability gain even with its bypass — it raises the cost of forgetting from "accidental" to "conscious evasion."
- The Stop-hook lint summary is unambiguously good: cheap, ambient, surfaces dead links and stale meta without ceremony.
- The trust-report and cascade-supersession scaffolding is **premature optimization** of the kind round 1's bottom line warned against ("good enough for now"). At 32 pages, those features are documentation, not mechanism.

Net: round 2 deserves credit for shipping the #1 follow-up (Stop hook) and the #2 follow-up (PreToolUse hook), but the hook polices the *cheapest* primitive while the *expensive* one (inline citation) remains norm-only. The discipline-decay diagnosis is half-treated. Items 6 and 7 from round 1's priority list (trust report, manifest) shipped at low fidelity and should have waited for evidence of need.

**Recommended next move:** harden the PreToolUse hook to also require ≥1 `[[wikilink]]` to `wiki/sources/` in any contentful body. That single change would close the actual gap.
