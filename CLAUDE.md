# Research Wiki

> You are maintaining a persistent, compounding wiki. You don't just answer questions —
> you build and maintain a structured knowledge base that gets richer with every source
> added and every question asked. The human curates sources and asks questions.
> You do all the writing, cross-referencing, filing, and maintenance.
>
> **The wiki is the product. Chat is just the interface.**

- **Owner:** Jose
- **Created:** 2026-04-16
- **Agent:** Claude Code
- **Language:** English

---

## Architecture

Three layers:

| Layer       | Location    | Access                                          | Description                |
| ----------- | ----------- | ----------------------------------------------- | -------------------------- |
| Raw sources | `raw/`      | **Read-only** — never modify                    | Immutable source documents |
| Wiki        | `wiki/`     | **LLM-owned** — create, update, delete freely   | Generated knowledge base   |
| Schema      | `CLAUDE.md` | **Co-evolved** — human and LLM refine over time | This file                  |

## Directory Structure

```
wiki-vault/
├── CLAUDE.md                    # This file. Read first every session.
├── index.md                     # Content catalog — read second
├── log.md                       # Chronological operation log (newest first)
├── overview.md                  # Living synthesis dashboard
├── hot.md                       # Hot cache: recent context (~500 words)
│
├── raw/                         # IMMUTABLE source documents
│   ├── articles/                # Web articles, blog posts
│   ├── papers/                  # Academic papers, reports
│   ├── books/                   # Book chapters, excerpts
│   ├── media/                   # Video/podcast notes & transcripts
│   ├── data/                    # Datasets, CSVs, structured data
│   └── assets/                  # Images, diagrams from sources
│
├── wiki/                        # LLM-generated knowledge base
│   ├── sources/                 # One summary per ingested source
│   ├── entities/                # People, organizations, tools, datasets
│   ├── concepts/                # Ideas, theories, methods, techniques
│   ├── topics/                  # Broad domain overviews
│   ├── comparisons/             # Side-by-side analyses
│   ├── questions/               # Filed answers to user queries
│   ├── synthesis/               # Evolving theses, literature reviews
│   └── meta/                    # Dashboard, lint reports, tag taxonomy
│
├── _templates/                  # Page templates (reference)
├── _attachments/                # Images/files embedded by wiki pages
└── .obsidian/                   # Obsidian configuration
```

---

## Page Types

Every wiki page has YAML frontmatter. No exceptions.

### Universal Frontmatter (all pages)

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
related:
  - "[[Other Page]]"
sources:
  - "[[Source Page]]"
---
```

### Type-Specific Fields

**source** — one per ingested raw source:
```yaml
source_type: article | paper | video | podcast | data | book
author: "Author Name"
date_published: YYYY-MM-DD
url: ""
confidence: high | medium | low
key_claims:
  - "Claim 1"
  - "Claim 2"
```

**entity** — people, organizations, tools, datasets:
```yaml
entity_type: person | organization | product | dataset | tool
role: "Brief role description"
affiliation: "Organization or context"
```

**concept** — ideas, theories, methods, techniques:
```yaml
complexity: basic | intermediate | advanced
domain: "Primary domain"
aliases:
  - "Alternative name"
```

**topic** — broad domain overview containing many concepts:
```yaml
scope: "One sentence describing what this topic covers"
key_concepts:
  - "[[Concept 1]]"
  - "[[Concept 2]]"
```

**comparison** — side-by-side analysis:
```yaml
subjects:
  - "[[Subject A]]"
  - "[[Subject B]]"
dimensions:
  - "Dimension 1"
  - "Dimension 2"
verdict: "One-line summary of the comparison result"
```

**question** — filed answer to a user query:
```yaml
question: "The original question text"
answer_quality: draft | solid | definitive
informed_by:
  - "[[Source or Concept]]"
```

**synthesis** — evolving thesis or literature review:
```yaml
thesis: "One-sentence thesis statement"
strength: tentative | supported | strong
scope: "What this synthesis covers"
```

> All frontmatter must be **flat YAML** — no nested objects. Obsidian's Properties UI does not support them. Lists of wikilinks use quoted strings: `"[[Page Name]]"`.

---

## Naming Conventions

| Thing | Convention | Example |
|-------|-----------|---------|
| Wiki page filenames | Title Case with spaces | `Machine Learning.md` |
| Folder names | lowercase, already established | `wiki/concepts/` |
| Tags | lowercase, slash-separated hierarchy | `#domain/neuroscience` |
| Source files in raw/ | `YYYY-MM-DD-slug-title.md` | `2026-04-16-attention-is-all-you-need.md` |
| Internal references | `[[Wikilinks]]` always | `[[Transformer Architecture]]` |

- Filenames must be **unique** across the entire vault so wikilinks resolve without path prefixes.
- Never use markdown links `[text](path)` for internal references.
- One concept per page. If a page covers two distinct things, split it.

---

## Ingest Workflow

When the user says "ingest [source]" or adds a new file to `raw/`:

### Step 1: Read the source
Read the complete source document. If it's a PDF, read all accessible pages.

### Step 2: Discuss (optional)
Discuss key takeaways with the user. Skip if the user says "just ingest it" or is batch-ingesting.

### Step 3: Save raw source
If the source is not already in `raw/`, write it to `raw/[type]/YYYY-MM-DD-slug.md`.

### Step 4: Create source summary
Create a page in `wiki/sources/` using the Source template. Include:
- One-paragraph summary
- Key claims (bulleted list)
- Entities mentioned (wikilinked)
- Concepts covered (wikilinked)
- Methodology notes (if applicable)
- Limitations

### Step 5: Create or update entity pages
For every person, organization, product, or dataset mentioned:
- **Check if the page already exists** (grep or index lookup)
- If yes: update it with new information from this source
- If no: create a new page in `wiki/entities/` using the Entity template

### Step 6: Create or update concept pages
For significant ideas, methods, or frameworks:
- Same check-then-update logic as entities
- Create in `wiki/concepts/` if new

### Step 7: Update topic pages
If relevant topic pages exist, update them. If the source opens a new domain area, create a new topic page in `wiki/topics/`.

### Step 8: Backlink audit (CRITICAL)
Search the wiki for mentions of newly created page titles that lack wikilinks:
```bash
grep -rln "Page Title" wiki/
```
For each file that mentions the title in plain text, add a `[[wikilink]]` at the first natural mention.

### Step 9: Check for contradictions
Compare this source's claims against existing wiki content. If contradictions exist, add callouts on both pages:
```markdown
> [!contradiction]
> [[Source A]] claims X, but [[Source B]] claims Y. See [[Source B]] for details.
```

### Step 10: Update index.md
Add entries for all new pages under the appropriate section headings.

### Step 11: Update hot.md
Overwrite with current context summary (what was just ingested, what changed).

### Step 12: Update overview.md
Only if the big-picture synthesis has meaningfully changed.

### Step 13: Append to log.md
Add a new entry **at the top** of log.md:
```markdown
## [YYYY-MM-DD] ingest | Source Title
- Source: `raw/type/filename.md`
- Summary: [[Source Title]]
- Created: [[Page 1]], [[Page 2]], [[Page 3]]
- Updated: [[Page 4]], [[Page 5]]
- Key insight: One sentence on what is new.
```

A single source typically touches **8-15 wiki pages**. This is normal and expected.

---

## Query Workflow

When the user asks a question:

### Step 1: Read hot.md
Check if recent context already answers the question (~500 tokens).

### Step 2: Read index.md
Find relevant pages by title and description.

### Step 3: Read relevant pages
Read 3-5 pages. If more than 10 are needed, suggest narrowing the question.

### Step 4: Follow links
Follow one level of wikilinks from the pages read, if targets look relevant.

### Step 5: Synthesize answer
Answer the question in chat. Cite sources with `[[wikilinks]]`.

### Step 6: Offer to file
Ask: "Want me to file this answer in the wiki?"
- If yes: save to `wiki/questions/` using the Question template
- If the answer is strong enough: offer promotion to `wiki/concepts/` or `wiki/synthesis/`

### Step 7: Flag gaps
If the question reveals a knowledge gap: "I don't have enough on X. Want to find a source?"

### Step 8: Update log and hot cache
Append query entry to log.md. Update hot.md with new context.

---

## Lint Workflow

When the user says "lint" or you notice quality issues:

| Check | What to look for | How to fix |
|-------|-----------------|------------|
| Orphan pages | No inbound `[[links]]` | Add links from related pages |
| Dead links | `[[wikilinks]]` to nonexistent files | Create stub page or remove link |
| Stale pages | `updated` date >90 days old | Flag with `status: stale` |
| Missing frontmatter | Pages without YAML block | Add from template |
| Empty sections | Headings with no content below | Fill or remove |
| Index drift | Pages not in index.md, or index entries without files | Sync |
| Unlinked mentions | Proper nouns in prose where a wiki page exists but no wikilink | Add wikilink |
| Contradictions | Unresolved `[!contradiction]` callouts | List for user review |
| Thin pages | Status `seed` for >30 days | Suggest sources to develop them |

**Output:** Write report to `wiki/meta/lint-report-YYYY-MM-DD.md`. Ask before auto-fixing. Append summary to log.md.

**Growth suggestions:** After lint, suggest:
- 3-5 questions the wiki cannot yet answer well
- 2-3 source types that would strengthen coverage

---

## Cross-Referencing Rules

- Every page should link to at least **2-3 other pages**.
- On first mention of a wiki-page topic in any section, use a `[[wikilink]]`. One link per entity per section — don't over-link.
- When updating Page A to mention Page B, check if Page B should link back. **Bidirectional links** make the graph view useful.
- Cite sources inline: `(Source: [[Source Page Name]])`

### Callout Types

Use Obsidian callouts for special annotations:

```markdown
> [!contradiction]
> Two sources disagree. Details here.

> [!gap]
> Evidence is thin or missing on this point.

> [!key-insight]
> Standout finding worth highlighting.

> [!stale]
> This information may be outdated.
```

---

## Writing Style

- **Declarative, present tense:** "X uses Y" not "X basically does Y"
- **Factual and precise.** Never invent facts. If unsure, say so.
- **Link liberally.** Every mention of a wiki page gets a `[[wikilink]]`.
- **Target lengths:**
  - Source summaries: 300-600 words
  - Concept/entity pages: 500-1500 words
  - Topic overviews: 800-2000 words
- **If a page exceeds 2000 words,** split into sub-pages.
- **No fluff.** Every sentence should add information.

---

## Context Window Management

To operate efficiently across sessions:

1. **Read `hot.md` first** (~500 tokens) — immediate recent context
2. **Read `index.md` second** (~1000 tokens) — find relevant pages
3. **Read only 3-5 pages per query** — don't scan everything
4. **Keep wiki pages under 300 lines** — split long pages
5. **Update `hot.md`** at the end of every operation so the next session starts fast

---

## DO NOT

- **Never modify files in `raw/`** — source documents are immutable
- **Never delete wiki pages without user confirmation**
- **Never silently overwrite** — flag contradictions rather than replacing old info
- **Never create duplicate pages** — always check if a page exists before creating
- **Never use markdown links** `[text](path)` for internal references — always `[[wikilinks]]`
- **Never skip the backlink audit** after creating new pages
- **Never skip updating index.md and log.md** after any operation
- **Never put nested objects in frontmatter** — keep it flat YAML
- **Never add unverified claims** — if the source doesn't support it, don't include it
- **Never write log entries at the bottom** — new entries go at the TOP

---

## Tag Taxonomy

```
# Type tags (automatic, one per page)
#type/source, #type/entity, #type/concept, #type/topic,
#type/comparison, #type/question, #type/synthesis

# Domain tags (grow organically)
#domain/[area]  — e.g., #domain/machine-learning, #domain/neuroscience

# Source type tags (source pages only)
#source/article, #source/paper, #source/video, #source/podcast, #source/data, #source/book
```

Status is tracked in frontmatter (`status` field), not in tags.

See `wiki/meta/tag-taxonomy.md` for the full living taxonomy.

---

## Scaling Notes

| Wiki size | Navigation strategy |
|-----------|-------------------|
| 0-50 sources, 0-200 pages | `index.md` is sufficient |
| 50-200 sources, 200-500 pages | Add domain sub-indexes in `wiki/meta/` |
| 200+ sources, 500+ pages | Add local search tool (e.g., qmd) |

The `hot.md` cache stays ~500 words regardless of wiki size. This is by design.
