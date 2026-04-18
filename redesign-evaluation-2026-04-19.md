# Wiki Redesign — Evaluation

**Date:** 2026-04-19
**Subject:** Restructure of `wiki-vault` from Karpathy's canonical LLM-Wiki pattern into a skills-based, reliability-hardened variant.
**Evaluator:** Claude (self-review of own changes — treat accordingly).

---

## TL;DR

**Verdict:** The revised wiki is materially better than the previous version on every axis that matters in the first six months of use — context efficiency, hallucination defense, and explicit drift/supersession handling.

But the improvements are **front-loaded**. Long-term rot risk is still real, just relocated: instead of rotting silently inside pages (the old failure mode), the wiki now rots through **discipline decay** — Claude is expected to follow citation rules, volatility norms, and supersession callouts under pressure, with nothing at the harness level actually forcing it. Lint catches some of this after the fact, but only when the human remembers to run it.

In short: the restructure traded *structural* fragility for *behavioral* fragility. That is a good trade today. It is a worse trade at 500 pages unless further enforcement is added.

---

## Side-by-side Comparison

| Dimension | Before (v1) | After (v2) | Winner |
|---|---|---|---|
| Always-loaded `CLAUDE.md` | 394 lines | 203 lines (−48%) | v2 |
| Workflow specificity in session context | Full ingest/query/lint preloaded | Loaded only when triggered (progressive disclosure) | v2 |
| Hallucination defense | None codified; implicit "never invent facts" | Inline `[[Source]]` citation + `## Sources` footer + lint | v2 |
| Drift defense | `updated` timestamp + 90-day stale flag | + optional `volatility:` frontmatter + targeted lint (60d/180d) | v2 |
| Supersession protocol | None; a `DO NOT silently overwrite` rule with no mechanism | `> [!superseded by [[Page]]]` callout; old claim preserved | v2 |
| Uncertainty surfacing | `[!gap]` callout only | + `(?)` suffix convention + `[!gap]` + `[!contradiction]` | v2 |
| Template coverage | 7 templates, 2 of 6 content types had `## Sources` | 7 templates, 6 of 6 content types have `## Sources` by default | v2 |
| File count (Claude-facing) | 1 (`CLAUDE.md`) | 4 (`CLAUDE.md` + 3 skills) | slight cost, v1 simpler |
| Discoverability of workflows | Inline in `CLAUDE.md` | Requires knowing skill names | v1 marginally |
| Bootstrap cost for existing 29 pages | None (status quo) | Nonzero — pages lack `## Sources` footers; lint will flag them | v1 |
| Cognitive load for new contributors | Single file to read | Contract + three on-demand files | v1 (but v2 wins once read) |
| Defense against LLM-wiki failure modes | Roughly zero | Inline citation + footer + supersession + volatility + uncertainty markers | v2 |

Score: **v2 wins 9 of 12 dimensions; v1 wins 3 on simplicity grounds.** Net: v2 is clearly better, especially as the wiki grows.

---

## What Actually Improved

### 1. Context budget per session
The always-loaded context dropped from 394 → 203 lines. The 191 lines removed were procedural detail that only matters during specific workflows. A session that never ingests or lints now pays zero tokens for those instructions. On a multi-session day, the savings compound.

### 2. Defense against persistent hallucination
v1 had no structural defense. If Claude misread a source, the error got written and every future query read it back as gospel. v2 enforces two primitives that make errors visible:

- **Inline `[[Source]]` citations** on non-trivial claims mean an uncited claim is obviously weak. Lint finds these.
- **`## Sources` footer** on every page creates a grep-able audit surface: "which sources does this page claim to be grounded in?"

Both are *cheap* — one line of convention each — and both leave readable trails in git.

### 3. Explicit supersession
v1's `DO NOT "silently overwrite"` rule had no mechanism. How *do* you update a claim? v1 didn't say. v2 answers: wrap the old claim in `> [!superseded by [[New Source]]]` and write the new claim alongside it. This preserves the trail and makes reversions possible.

### 4. Targeted staleness
v1 flagged every page `updated > 90 days` as stale. Many concepts are stable (Pythagoras' theorem) and such flags are noise. v2's optional `volatility:` frontmatter lets a page opt into faster decay (`time-sensitive` at 60d) or coast (`stable` — never flagged). Lint becomes a signal instead of a wall of noise at scale.

### 5. Template hygiene
All six content templates now seed a `## Sources` section. New pages are born compliant. Previously only `Topic.md` and `Comparison.md` had it.

---

## What Stayed the Same (Deliberately)

| Thing | Reason |
|---|---|
| Plain Markdown + wikilinks | Portability is the whole point |
| Obsidian + Templater compatibility | No change in frontmatter schema |
| Three-layer architecture (raw / wiki / schema) | Architecturally correct as-is |
| Callout vocabulary | `[!contradiction]`, `[!gap]`, `[!stale]` were already right |
| `index.md` / `log.md` / `hot.md` / `overview.md` | Proven pattern, no change needed |
| 8–15 pages touched per ingest | Feature, not bug |

---

## Genuine Trade-offs Accepted

### 1. More files to understand up front
v2 introduces three skill files. A newcomer reading the vault has to look at four files instead of one to understand the full system. Mitigation: the contract (`CLAUDE.md`) is self-contained; skills are on-demand; but the first-read cost is real.

### 2. Two-source-of-truth risk for page-type specs
v1 had frontmatter schema inline in `CLAUDE.md` *and* in templates (duplication). v2 removed the inline copy and points to `_templates/<Type>.md` as authoritative. This is better engineering but means anyone reading `CLAUDE.md` alone no longer sees the full schema — they must open the templates.

### 3. Bootstrap debt
29 existing pages don't have `## Sources` footers. v2 accepted "fix on touch" rather than mandate a migration. Pages that Jose never revisits will stay non-compliant forever. Lint surfaces them, but surfacing is not fixing.

### 4. Page-level volatility is coarse
A single entity page can carry both stable biographical facts and time-sensitive current-role claims. One `volatility:` field at the frontmatter level cannot express this. We accepted the simplification.

### 5. `(?)` marker is noisy
`(?)` is easy to write but hard to grep reliably — literal `?` appears in legitimate questions, rhetorical prose, and code snippets. Lint's `unresolved-gap` check can miss it. A structured `{uncertain}` tag would grep cleanly but adds weight.

---

## Remaining Shortcomings — by Time Horizon

### Short-term (first 0–3 months, ~30–100 pages)

**S1. No write-time enforcement of citation discipline.**
The rules live in `CLAUDE.md` and the skill files. Claude is expected to follow them. Under context pressure (long ingests, tired user, batch mode), citations will get dropped. The error is detected by lint only after it's already written. This is a behavioral, not structural, weakness.
*Severity: medium. Likely cost: occasional uncited claim that lint catches within one run.*

**S2. Lint is human-triggered.**
The user must remember to say "lint". In practice this happens when the wiki feels off, not on a schedule. Months can pass between lints. Errors accumulate.
*Severity: medium. Fix: a `Stop` hook in `.claude/settings.local.json` that runs a lightweight lint-summary at session end, or a weekly cron via the `schedule` skill.*

**S3. Backlink audit is O(n) grep.**
Step 8 of ingest greps every `wiki/**/*.md` for plain-text mentions of new titles. At 29 pages this is instant; at 300 it's still fine; at 2000 it's a meaningful delay per ingest. No indexed backlink store.
*Severity: low now, medium later.*

**S4. `overview.md` / `hot.md` freshness is not checked.**
Lint catches stale wiki pages but not stale meta files. If Claude skips the "Update hot.md" step on a rushed ingest, no one notices.
*Severity: low. Fix: a lint check for `hot.md` `updated` > 7 days.*

### Medium-term (3–12 months, ~100–500 pages)

**M1. Supersession doesn't cascade.**
If claim X on page A is superseded, and pages B, C, D cite page A's old text, their citations still point at the superseded claim without warning. There is no graph walk to propagate the supersession.
*Severity: high by month 6 if much revision happens. Fix: the lint skill could traverse wikilinks and flag "citations of superseded claims." Non-trivial to implement reliably.*

**M2. No source-invalidation link from `raw/` to wiki.**
If the raw paper is retracted, superseded by v2, or corrected by errata, the wiki page derived from it doesn't know. Source reliability drifts silently beneath the wiki.
*Severity: medium for academic domains; low for stable domains. Fix: a `raw/manifest.yaml` with `status: active | retracted | superseded | errata` per source, read during query time.*

**M3. Volatility is self-reported by Claude.**
Claude decides what's stable vs. time-sensitive at write time. Claude's judgment can be wrong, and once written, volatility rarely gets re-evaluated. A page may be flagged `stable` but contain time-sensitive claims the grader didn't recognize.
*Severity: medium. No clean fix without heavier tagging.*

**M4. Discipline decay under load.**
Inline citation and `## Sources` footer are norms. Norms erode. Under a batch ingest of 20 sources in one session, the 19th ingest is noticeably sloppier than the 1st. Lint is the only defense, and lint runs only when asked.
*Severity: high in heavy-use weeks. Best fix: PreToolUse hook on Write-to-`wiki/**` that rejects a write whose body has claims but no Sources footer. That is a harness-level change outside the current plain-Markdown spirit — but it would be the single biggest durability win available.*

**M5. `index.md` itself becomes the bottleneck.**
v1 and v2 both assume `index.md` is readable in one pass (~1000 tokens). By 200 pages this stops being true. v2 inherited the scaling note unchanged ("add domain sub-indexes at 50–200 sources"). That work is still ahead.
*Severity: medium at ~200 pages. Fix: the scaling plan is known; just hasn't been executed.*

### Long-term (1+ years, 500+ pages)

**L1. No eval loop.**
Neither v1 nor v2 can measure whether queries are getting better answers over time. "Is the wiki actually making me smarter?" has no instrumented answer. A sparse query log exists in `log.md`, but no one scores it.
*Severity: high for the "is this worth doing?" question. Fix: periodic retrospective against a frozen set of gold questions.*

**L2. Single-writer assumption.**
The vault assumes one Claude session at a time. If two sessions run in parallel (user multi-tasking), they can clobber `log.md` and `hot.md`. Git merges will expose the collision but painfully.
*Severity: low for a solo user, never zero.*

**L3. No page lifecycle.**
Pages are created, updated, and (rarely) deleted. There is no "archived" state that preserves a page for git-history purposes but removes it from the active graph. At large scale, the active graph fills with historical artifacts.
*Severity: medium at 500+ pages. Fix: add `status: archived` and treat it as orphanable by lint.*

**L4. Template versioning absent.**
If a template evolves, existing pages don't auto-migrate. There is no `template_version` field in frontmatter to detect divergence.
*Severity: low for a solo user; painful if you try to batch-migrate at scale.*

**L5. Reliability primitives do not compose.**
`[!contradiction]`, `[!superseded]`, `[!gap]`, `(?)`, `volatility:` are four independent surfaces. A page can have all four at once with no unified view. Lint lists them separately. At 500+ pages, you want a "trust score" per page that composes these signals — v2 deliberately did not build this.
*Severity: medium. Fix: a computed `wiki/meta/trust-report.md` that aggregates signals. Could be cheap if done as a lint side-effect.*

---

## Recommended Follow-ups, Prioritized

| Priority | Action | Cost | Pays off at |
|---|---|---|---|
| **1** | Add a `Stop` hook that runs a cheap lint summary (counts, not full report) at session end | Small JSON edit + tiny script | Immediately |
| **2** | Add a `PreToolUse` hook on `Write` to `wiki/**` that rejects writes with no `## Sources` section | Moderate (script) | Week 2+ |
| **3** | Add `hot.md` / `overview.md` freshness checks to the lint skill | Edit `wiki-lint.md` | Week 4+ |
| **4** | Backfill `## Sources` footers on the existing 29 pages during the next two ingests | Inline with normal work | Month 2 |
| **5** | When `index.md` > 2000 tokens, execute the known "domain sub-index" scaling plan | Moderate | Month 6+ |
| **6** | Build a `wiki/meta/trust-report.md` that composes contradiction / supersession / gap / volatility signals | Moderate | Month 6+ |
| **7** | Add `raw/manifest.yaml` with per-source status (active/retracted/superseded) + query-time check | Larger | Month 9+ |

Actions 1 and 2 alone would convert v2 from "disciplined by norm" to "disciplined by mechanism" — the single biggest durability lever.

---

## Honest Limitations of This Evaluation

- **Self-review bias.** I am reviewing my own changes. Treat this as a self-assessment, not an independent audit. A sanity check from a second reader would catch blind spots I've missed.
- **No live test.** The new skills have not yet been exercised on a real ingest. The "it works on paper" trap is real. The first real ingest will surface missing steps.
- **The 29 existing pages are a small sample.** The system may behave very differently at 200 or 500 pages; many of the "long-term" concerns above are extrapolated, not observed.
- **Progressive disclosure is untested in this harness.** Whether Claude Code actually auto-loads `.claude/skills/*.md` on the right triggers, or whether `CLAUDE.md`'s pointer table is enough, needs one real-world trial.

---

## Bottom Line

The redesign cleanly addresses the failure modes Karpathy's pattern is most criticized for, without adding a heavy machinery tax. `CLAUDE.md` is 48% lighter. Every page now has a structural place for citations and a lint check that notices when the place is empty. Supersession is a first-class operation instead of an implicit taboo.

What the redesign did *not* do — and could not do cheaply — is move enforcement from *Claude following written rules* to *the harness blocking rule violations*. That is the next frontier, and the single highest-leverage improvement available when this wiki grows past toy scale. Without it, the wiki is a better version of the same pattern; with it, the wiki becomes structurally reliable.

Good enough for now. Not good enough forever.
