# Wiki Hooks

Two hooks convert the reliability primitives in `CLAUDE.md` from norms into mechanism. Both live here; wired in `.claude/settings.local.json`.

## Hooks

| Hook | Type | What it does |
|---|---|---|
| `check-wiki-sources-footer.cjs` | `PreToolUse` (Write/Edit/MultiEdit) | Blocks writes to `wiki/{sources,entities,concepts,topics,comparisons,questions,synthesis}/*.md` whose proposed final body is *substantive* (≥60 non-stub words) and either (a) has zero `[[wikilink]]` references resolving to `wiki/sources/`, or (b) has a `## Sources` footer with no `[[...]]` items underneath. Stubs and template scaffolds pass through. CRLF-safe; rejects malformed MultiEdit/Write payloads. |
| `lint-summary.cjs` | `Stop` | Prints a one-line session-end count to stderr: scanned pages, missing footers, dead wikilinks, stale meta files, and dangling `raw/manifest.yaml` entries. Cheap by design — full audit stays in the `wiki-lint` skill. |

## Source lifecycle

Tracked per-source in `raw/manifest.yaml` with `status: active | retracted | superseded | errata`. The lint summary surfaces dangling entries (paths or `wiki_page` targets that don't resolve on disk). The full lint skill joins manifest status against citations to flag wiki pages depending on non-active sources.

## Trust view

`wiki/meta/trust-report.md` — refreshed as a side-effect of the `wiki-lint` skill. Two axes, never collapsed: *factual risk* (contradictions + open gaps + non-active source citations) and *maintenance status* (volatility staleness only). Per-page table omitted while every page has zero factual-risk signals.

## Self-test

```bash
node .claude/hooks/check-wiki-sources-footer.test.cjs
```

Eight fixture cases covering: missing footer, populated footer, stub allowance, empty footer (`*(none)*`), inline-citation gate, CRLF, malformed MultiEdit payload, non-content path passthrough.
