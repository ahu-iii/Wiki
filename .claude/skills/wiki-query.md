---
name: wiki-query
description: Answer a question against the wiki. Trigger when the user asks a question about ingested content or wiki knowledge. Reads hot.md then index.md, follows wikilinks selectively, synthesizes a cited answer, and offers to file the answer back as a wiki question page.
---

# Wiki Query Workflow

Read this file once at the start of a query. Do not preload.

---

## Step 1 — Read `hot.md`

Start here (~500 tokens). If recent context already answers the question, you're done — answer directly and skip to Step 5.

## Step 2 — Read `index.md`

Find relevant pages by title and description.

## Step 3 — Read relevant pages

Read 3–5 pages. If more than 10 look relevant, the question is too broad — ask the user to narrow it before continuing.

## Step 4 — Follow links selectively

Follow one level of wikilinks from the pages you've read, but only if the targets are clearly on-topic. Don't chase tangents.

## Step 5 — Synthesize answer (with citations)

Answer in chat. Rules:

- **Every factual claim carries a `[[Source]]` or `[[Wiki Page]]` citation.** If a claim lacks a wiki-backed source, append `(?)` to it and say so in the answer.
- Cite the wiki page that supports the claim, not just the original raw source (the wiki page is what the user can navigate to).
- If a claim relies on a chain — Source → Concept Page → Answer — cite the concept page; it's the wiki's curated view.
- Prefer declarative sentences. No hedging filler ("it seems that…") unless the source itself is uncertain.

If the question can only be partially answered from the wiki, say which part is uncited and where a gap exists.

## Step 6 — Offer to file

After the answer, offer: *"Want me to file this in the wiki?"*

- If yes: save to `wiki/questions/` using the Question template. The filed page must follow the same reliability rules — inline `[[Source]]` citations and a `## Sources` footer listing every source page referenced.
- If the answer synthesizes strongly across multiple sources, also offer promotion to `wiki/concepts/` or `wiki/synthesis/`.

## Step 7 — Flag gaps

If the question reveals a knowledge gap ("the wiki has nothing on X"), say so explicitly and offer: *"Want to find a source on X?"*

Optionally, drop a `> [!gap]` callout on the most relevant existing page so the gap is visible to future queries and lint runs.

## Step 8 — Update `log.md` and `hot.md`

Append a query entry to the **top** of `log.md`:

```markdown
## [YYYY-MM-DD] query | <short paraphrase of question>
- Pages read: [[Page 1]], [[Page 2]]
- Filed as: [[Question Page]] (if any)
- Gap flagged: [[Page]] (if any)
```

Update `hot.md` with the new context the answer introduced.
