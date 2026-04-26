---
name: wiki-lint
description: Audit the wiki for quality issues. Trigger when the user says "lint", "health check", "audit the wiki", or after a batch of ingests. Produces a prioritized report in wiki/meta/lint-report-YYYY-MM-DD.md and suggests coverage gaps. Never auto-fixes without confirmation.
---

# Wiki Lint Workflow

Read this file once at the start of a lint. Do not preload.

---

## Checks

Run every check. Group findings by severity, not by check type.

| Check | What to look for | Severity | How to fix |
|---|---|---|---|
| `missing-sources-footer` | Content page (entity/concept/topic/synthesis/question/comparison) with claims but no `## Sources` section | **HIGH** | Add footer listing every `[[Source]]` cited inline |
| `uncited-proper-noun` | Proper-noun claim in prose with no nearby `[[Source]]` wikilink on the same line or paragraph | **HIGH** | Add citation or mark `(?)` if uncertain |
| `contradictions` | Unresolved `[!contradiction]` callouts | **HIGH** | List for user review; do not resolve unilaterally |
| `dead-links` | `[[wikilinks]]` to nonexistent files | **HIGH** | Create stub page or remove link |
| `missing-frontmatter` | Page without a YAML frontmatter block | **HIGH** | Add from the matching `_templates/` file |
| `stale-volatile` | `volatility: time-sensitive` + `updated` > 60 days old, or `volatility: evolving` + `updated` > 180 days old | **MEDIUM** | Re-verify the page or flag with `> [!stale]` |
| `unresolved-gap` | `> [!gap]` callout or `(?)` marker with surrounding page `updated` > 30 days old | **MEDIUM** | Suggest a source or mark gap as accepted |
| `orphan-pages` | Page with no inbound `[[links]]` from anywhere in the wiki | **MEDIUM** | Add a link from a related page or delete with user confirmation |
| `stale-pages` | `updated` > 90 days and no `volatility` set | **MEDIUM** | Flag with `status: stale` or re-verify |
| `empty-sections` | Heading with no content below it | **LOW** | Fill or remove |
| `index-drift` | Pages not in `index.md`, or `index.md` entries pointing to nonexistent files | **LOW** | Sync `index.md` |
| `unlinked-mentions` | Proper-noun mention in prose where a matching wiki page exists but no `[[wikilink]]` | **LOW** | Add wikilink |
| `thin-pages` | `status: seed` for more than 30 days | **LOW** | Suggest sources to develop the page |
| `stale-meta` | `hot.md` or `overview.md` `updated` > 7 days | **MEDIUM** | Refresh from recent log entries |
| `source-status` | Wiki page cites a source whose `raw/manifest.yaml` `status` ≠ `active` | **HIGH** | Add `> [!superseded]` / `> [!stale]` callout citing the manifest reason |

> **Deferred:** `cascade-supersession` (graph-walk for wiki pages that cite other pages bearing `[!superseded]` callouts). Build this check when the first `[!superseded]` callout is filed in the wiki — until then, it's noise. Tracked here so future-you doesn't re-design it.

---

## Output

Write the report to `wiki/meta/lint-report-YYYY-MM-DD.md`, structured as:

```markdown
# Lint Report — YYYY-MM-DD

## Summary
- Pages scanned: N
- Findings: X CRITICAL, Y HIGH, Z MEDIUM, W LOW

## CRITICAL
(none, or list)

## HIGH
- [missing-sources-footer] [[Page X]] — no `## Sources` section
- [uncited-proper-noun] [[Page Y]] line 14 — "Vaswani" mentioned without citation
- ...

## MEDIUM
...

## LOW
...

## Coverage Suggestions

### Questions the wiki cannot answer well yet
1. ...
2. ...
3. ...

### Sources that would strengthen coverage
1. ...
2. ...
```

---

## Rules

1. **Never auto-fix without explicit user confirmation.** The lint report is a proposal, not an edit queue. After writing the report, ask the user which findings to address.
2. **Do not resolve contradictions unilaterally.** A `[!contradiction]` callout represents a disagreement between sources — only the human decides which side wins.
3. **Prioritize HIGH findings.** If the report has a long tail, skim MEDIUM/LOW and focus the user's attention on HIGH.
4. **Append a summary to `log.md`**:

```markdown
## [YYYY-MM-DD] lint | N findings (X HIGH, Y MEDIUM, Z LOW)
- Report: [[lint-report-YYYY-MM-DD]]
- Top findings: ...
```

## Coverage suggestions (growth loop)

After the findings, include in the same report:

- 3–5 specific questions the wiki cannot answer well right now
- 2–3 source types that would strengthen coverage (e.g., "follow-up papers citing [[Attention Is All You Need]]")

This keeps the wiki actively growing instead of just decaying gracefully.

---

## Trust report (side-effect)

After writing the lint report, refresh `wiki/meta/trust-report.md`. Keep the two axes separate — conflating factual risk with maintenance hints produces false confidence calibration (a page with three honest `[!gap]` callouts ranks worse than a page with three confident hallucinations).

**Two axes, never collapsed into one score:**

- *Factual risk* = unresolved `[!contradiction]` callouts + open `[!gap]` callouts + citations of sources whose `manifest.yaml` `status` ≠ `active`.
- *Maintenance status* = volatility staleness only (`time-sensitive` >60d, `evolving` >180d). Hint, not risk.

**Format:**

```markdown
# Trust Report — YYYY-MM-DD

## Aggregate
- Pages scanned: N
- Pages with non-zero factual risk: M
- Pages with maintenance staleness: K
```

If `M = 0` (no factual-risk signals anywhere in the corpus), stop here — a per-page table of all-zero rows is decorative noise. Append the per-page table only when at least one page has non-zero factual risk; sort by factual-risk descending so the weakest pages surface first.

```markdown
## Per-page (factual risk > 0)

| Page | Contradictions | Supersessions | Open Gaps | Non-active sources | Maintenance |
|---|---|---|---|---|---|
| [[Page X]] | 1 | 0 | 0 | 0 | stable |
| [[Page Z]] | 0 | 2 | 3 | 1 | evolving (200d) |
```

This is computed, not authored — overwrite the file each lint run.
