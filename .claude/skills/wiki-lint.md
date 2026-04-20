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
| `cascade-supersession` | Wiki page cites another wiki page that contains a `> [!superseded]` callout for a claim it relies on | **MEDIUM** | Add a `> [!stale]` note linking to the supersession source |

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

After writing the lint report, refresh `wiki/meta/trust-report.md` — a per-page composite of the four reliability signals: contradictions, supersessions, gaps, and volatility/staleness. Format:

```markdown
# Trust Report — YYYY-MM-DD

| Page | Contradictions | Supersessions | Open Gaps | Volatility | Trust |
|---|---|---|---|---|---|
| [[Page X]] | 0 | 0 | 1 | stable | high |
| [[Page Y]] | 1 | 0 | 0 | time-sensitive (45d) | medium |
| [[Page Z]] | 0 | 2 | 3 | evolving (200d) | low |
```

Trust score: `high` (no signals) / `medium` (1–2 signals) / `low` (3+ signals or any unresolved contradiction). Sort the table by trust ascending so the user sees the weakest pages first. This is computed, not authored — overwrite the file each lint run.

The trust report is the single composed view the user reads when asking "what's flaky in the wiki?"
