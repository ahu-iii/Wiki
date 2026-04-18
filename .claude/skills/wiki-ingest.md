---
name: wiki-ingest
description: Ingest a raw source into the wiki. Trigger when the user says "ingest <source>", adds a file to raw/, or asks to process a new document. Creates the source summary, updates entity/concept/topic pages, maintains backlinks, flags contradictions, and logs the operation.
---

# Wiki Ingest Workflow

Read this file once at the start of an ingest. Do not preload.

A single source typically touches **8–15 wiki pages**. This is normal.

---

## Step 1 — Read the source

Read the complete raw document. If it's a PDF, read all accessible pages. Don't skim.

## Step 2 — Discuss (optional)

Offer a short takeaway summary to the user. Skip this step if the user said "just ingest it" or is batch-ingesting.

## Step 3 — Save raw source

If the source is not already in `raw/`, write it to `raw/[type]/YYYY-MM-DD-slug.md`.
Never modify a file that already exists in `raw/` — sources are immutable.

## Step 4 — Create source summary

Create a page in `wiki/sources/` using the Source template. Fill in:

- One-paragraph summary
- Key claims (bulleted list)
- Entities mentioned (wikilinked)
- Concepts covered (wikilinked)
- Methodology notes (if applicable)
- Limitations
- `## Sources` footer listing this source page itself (self-reference — it's the primary evidence for its own summary)

## Step 5 — Create or update entity pages

For every person, organization, product, or dataset mentioned:

- **Check if the page exists first** (grep the wiki, or look in `index.md`)
- If it exists: update with new information from this source
- If not: create a new page in `wiki/entities/` using the Entity template

### Step 5b — Inline-cite every non-trivial claim

As you write claims on an entity or concept page, append the source wikilink:

```markdown
The attention mechanism lets a model focus on different parts of the input at each step ([[Attention Is All You Need]]).
```

At the bottom of every created/updated page, the `## Sources` section lists every `[[Source]]` cited on that page. Never leave a factual claim uncited. Common-knowledge framing sentences ("neural networks are a class of models …") don't need a citation — factual claims attributable to a specific source do.

If a claim can't be supported by the current source and isn't common knowledge, mark it with `(?)` or wrap it in a `> [!gap]` callout rather than writing it as a confident statement.

## Step 6 — Create or update concept pages

Same check-then-update pattern as entities, in `wiki/concepts/`.

## Step 7 — Update topic pages

If a relevant topic page exists, update it. If the source opens a new domain area, create a new topic page in `wiki/topics/`.

## Step 8 — Backlink audit (CRITICAL)

For every page created in this ingest, search the wiki for plain-text mentions of its title that aren't yet wikilinked:

```bash
grep -rln "Page Title" wiki/
```

Add a `[[wikilink]]` at the first natural mention in each file that matches.

## Step 9 — Reconcile with existing claims

Compare this source against existing wiki content. Three possible outcomes:

**Agreement** — no callout needed; just cite the new source alongside the existing one.

**Genuine disagreement** — add `[!contradiction]` callouts on both affected pages:

```markdown
> [!contradiction]
> [[Source A]] claims X. [[Source B]] claims Y. See [[Source B]] for details.
```

**Deliberate replacement** (new source supersedes an older, weaker, or obsolete claim) — don't silently overwrite. Mark the old claim superseded and cite the new source:

```markdown
> [!superseded] by [[New Source]]
> Earlier claim: "X was thought to be Y." Updated understanding in [[New Source]].
```

Never delete an old claim silently. A supersession leaves a readable trail.

## Step 10 — Update `index.md`

Add entries for every newly created page under the appropriate section headings.

## Step 11 — Update `hot.md`

Overwrite `hot.md` with a current-context summary: what was ingested, which pages changed, the single most useful insight.

## Step 12 — Update `overview.md`

Only if the big-picture synthesis has meaningfully changed. Most ingests don't require this.

## Step 13 — Change summary to chat (before logging)

Before appending to `log.md`, print a concise summary to chat listing:

- Pages created (with wikilinks)
- Pages updated (with wikilinks)
- Any `[!contradiction]` or `[!superseded]` callouts introduced
- The single key insight

This is the human's chance to catch synthesis errors before they're baked in.

## Step 14 — Append to `log.md`

Add a new entry **at the top** of `log.md`:

```markdown
## [YYYY-MM-DD] ingest | Source Title
- Source: `raw/type/filename.md`
- Summary: [[Source Title]]
- Created: [[Page 1]], [[Page 2]], [[Page 3]]
- Updated: [[Page 4]], [[Page 5]]
- Reconciled: [[Page X]] (contradiction) / [[Page Y]] (superseded)
- Key insight: One sentence on what is new.
```

---

## Checklist before marking the ingest done

- [ ] Source page created with `## Sources` footer
- [ ] Every new/updated wiki page has `[[Source]]` inline citations on non-trivial claims
- [ ] Every new/updated wiki page ends with a `## Sources` section
- [ ] Backlink audit run for every new page title
- [ ] Contradictions and supersessions explicitly called out, not silently overwritten
- [ ] `index.md`, `hot.md`, and `log.md` updated
- [ ] Change summary shown to user before logging
