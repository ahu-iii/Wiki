# Research Wiki

> You maintain a persistent, compounding wiki. You don't just answer questions —
> you build and maintain a structured knowledge base that gets richer with every
> source added and every question asked. The human curates sources and asks
> questions. You do all the writing, cross-referencing, filing, and maintenance.
>
> **The wiki is the product. Chat is just the interface.**

- **Owner:** Jose
- **Created:** 2026-04-16
- **Agent:** Claude Code
- **Language:** English

---

## Architecture

| Layer       | Location    | Access                                          |
| ----------- | ----------- | ----------------------------------------------- |
| Raw sources | `raw/`      | **Read-only** — never modify                    |
| Wiki        | `wiki/`     | **LLM-owned** — create, update, delete freely   |
| Schema      | `CLAUDE.md` | **Co-evolved** — human and LLM refine over time |

## Directory Structure

```
wiki-vault/
├── CLAUDE.md                 # This file. Always-loaded contract.
├── index.md                  # Content catalog — read second
├── log.md                    # Chronological operation log (newest first)
├── overview.md               # Living synthesis dashboard
├── hot.md                    # Hot cache: recent context (~500 words)
│
├── raw/                      # IMMUTABLE source documents
│   └── articles/ papers/ books/ media/ data/ assets/
│
├── wiki/                     # LLM-generated knowledge base
│   ├── sources/              # One summary per ingested source
│   ├── entities/             # People, organizations, tools, datasets
│   ├── concepts/             # Ideas, theories, methods, techniques
│   ├── topics/               # Broad domain overviews
│   ├── comparisons/          # Side-by-side analyses
│   ├── questions/            # Filed answers to user queries
│   ├── synthesis/            # Evolving theses, literature reviews
│   └── meta/                 # Dashboard, lint reports, tag taxonomy
│
├── _templates/               # Page templates — authoritative schema per type
├── _attachments/             # Images/files embedded by wiki pages
└── .claude/skills/           # On-demand workflow skills (ingest, query, lint)
```

---

## Workflows

Full workflows live in skills, loaded only when triggered.

| Trigger | Skill |
|---|---|
| "ingest …" / file added to `raw/` | `.claude/skills/wiki-ingest.md` |
| question about wiki content | `.claude/skills/wiki-query.md` |
| "lint" / "health check" / "audit" | `.claude/skills/wiki-lint.md` |

Read the relevant skill file **once, at the start of the workflow**. Do not preload. This is progressive disclosure — `CLAUDE.md` stays the always-loaded contract; skills carry the procedures.

---

## Reliability Primitives

Four cheap conventions, enforced by lint. Each costs roughly one line of discipline. Together they defend against the LLM-wiki failure modes (persistent hallucination, silent drift, false authority).

1. **Inline citation.** Every non-trivial factual claim carries an inline `[[Source]]` wikilink. Common-knowledge framing is exempt; attributable facts are not.
2. **`## Sources` footer.** Every wiki page ends with a `## Sources` section listing every source cited on that page. New pages inherit the stub from `_templates/`.
3. **`volatility:` frontmatter (optional).** `stable | evolving | time-sensitive`. Omit when stable. Lint surfaces `time-sensitive` >60 days and `evolving` >180 days; `stable` is ignored.
4. **Uncertainty markers.** Unverified claims get a `(?)` suffix or `> [!gap]` callout. When new evidence replaces an old claim, use `> [!superseded by [[New Source]]]` — never silently overwrite. Genuine disagreements use `> [!contradiction]`.

Skip these and the wiki silently rots.

---

## Page Types

Every wiki page has flat YAML frontmatter — no exceptions, no nested objects.

### Universal frontmatter (all pages)

```yaml
---
type: source | entity | concept | topic | comparison | question | synthesis | meta
title: "Human-Readable Title"
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags:
  - type/[page-type]
  - domain/[area]
status: seed | developing | mature | evergreen
volatility: stable | evolving | time-sensitive   # optional, omit when stable
related:
  - "[[Other Page]]"
sources:
  - "[[Source Page]]"
---
```

### Type-specific fields

Authoritative specs live in `_templates/<Type>.md`. Read the template when creating a page of that type. One concept per page — if a page covers two distinct things, split it.

---

## Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| Wiki page filenames | Title Case with spaces | `Machine Learning.md` |
| Folder names | lowercase | `wiki/concepts/` |
| Tags | lowercase, slash-separated | `#domain/neuroscience` |
| Source files in `raw/` | `YYYY-MM-DD-slug-title.md` | `2026-04-16-attention-is-all-you-need.md` |
| Internal references | `[[Wikilinks]]` always | `[[Transformer Architecture]]` |

- Filenames must be **unique** across the vault — wikilinks resolve without path prefixes.
- Never use markdown links `[text](path)` for internal references.

---

## Cross-Referencing

- Every page links to **at least 2–3 other pages**.
- First mention of a wiki-page topic in any section → `[[wikilink]]`. One link per entity per section; don't over-link.
- When updating Page A to mention Page B, check if Page B should link back. Bidirectional links make the graph view useful.
- Cite sources inline: `... ([[Source Page]])`. This doubles as data for the `## Sources` footer.

### Callout types

```markdown
> [!contradiction]   Two sources disagree. Details here.
> [!superseded]      by [[New Source]] — old claim replaced. Explain why.
> [!gap]             Evidence is thin or missing on this point.
> [!key-insight]     Standout finding worth highlighting.
> [!stale]           This information may be outdated.
```

---

## Writing Style

- **Declarative, present tense.** "X uses Y", not "X basically does Y".
- **Factual and precise.** Never invent facts. If unsure, mark `(?)` or `> [!gap]`.
- **Link liberally.** Every mention of a wiki page gets a `[[wikilink]]`.
- **Target lengths:** source summaries 300–600 words; concept/entity 500–1500; topic overviews 800–2000. Split pages >2000 words.
- **No fluff.** Every sentence adds information.

---

## Context Window Management

1. Read `hot.md` first (~500 tokens).
2. Read `index.md` second (~1000 tokens).
3. Read only 3–5 pages per query.
4. Keep wiki pages under 300 lines — split long pages.
5. Update `hot.md` at the end of every operation so the next session starts fast.

---

## DO NOT

- **Never modify `raw/`** — source documents are immutable.
- **Never delete wiki pages without user confirmation.**
- **Never silently overwrite** — use `[!contradiction]` or `[!superseded]`.
- **Never create duplicate pages** — check before creating.
- **Never use markdown links** for internal references — always `[[wikilinks]]`.
- **Never skip the backlink audit** after creating new pages.
- **Never skip updating `index.md` and `log.md`** after any operation.
- **Never nest objects in frontmatter** — keep it flat YAML.
- **Never add unverified claims as confident statements** — mark `(?)` or `[!gap]`.
- **Never write log entries at the bottom** — new entries go at the TOP.

---

## Tag Taxonomy

```
#type/source | entity | concept | topic | comparison | question | synthesis

#domain/[area]    — grows organically (#domain/machine-learning, etc.)

#source/article | paper | video | podcast | data | book   — source pages only
```

Status and volatility live in frontmatter, not in tags. Full living taxonomy: `wiki/meta/tag-taxonomy.md`.

---

## Scaling

| Wiki size | Strategy |
|---|---|
| 0–50 sources, 0–200 pages | `index.md` is sufficient |
| 50–200 sources, 200–500 pages | Add domain sub-indexes in `wiki/meta/` |
| 200+ sources, 500+ pages | Add local search (e.g., qmd) |

`hot.md` stays ~500 words regardless of wiki size. By design.
