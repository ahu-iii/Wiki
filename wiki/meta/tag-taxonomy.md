---
type: meta
title: "Tag Taxonomy"
updated: 2026-04-16
---

# Tag Taxonomy

> Living document. Updated as the wiki grows and new domains are added.

## Type Tags

Every page gets exactly one type tag matching its frontmatter `type` field:

- `#type/source` — source summary pages
- `#type/entity` — people, organizations, tools, datasets
- `#type/concept` — ideas, theories, methods, techniques
- `#type/topic` — broad domain overviews
- `#type/comparison` — side-by-side analyses
- `#type/question` — filed query answers
- `#type/synthesis` — evolving theses, literature reviews

## Domain Tags

Use `#domain/[area]` for subject-matter classification. Created organically as sources are ingested. Examples:

<!-- Add new domain tags here as the wiki grows -->

## Source Type Tags

For source pages only, indicating media format:

- `#source/article` — web articles, blog posts
- `#source/paper` — academic papers, preprints
- `#source/book` — book chapters, excerpts
- `#source/video` — video content or transcripts
- `#source/podcast` — podcast episodes or transcripts
- `#source/data` — datasets, structured data files

## Status (Frontmatter, Not Tags)

Status is tracked in the `status` frontmatter field:

| Status | Meaning |
|--------|---------|
| `seed` | Just created, minimal content |
| `developing` | Has substance but incomplete |
| `mature` | Well-developed, well-sourced |
| `evergreen` | Stable reference, rarely changes |

## Confidence (Source Pages Only)

| Level | Meaning |
|-------|---------|
| `high` | Peer-reviewed or authoritative primary source |
| `medium` | Credible but not peer-reviewed |
| `low` | Anecdotal, opinion, or unverified |

## Rules

1. Tags are always **lowercase** with **slash separators** for hierarchy
2. Use **existing tags** before creating new ones
3. Update this file when adding a new domain tag
4. A page typically has 2-4 tags (one type + one or more domains)
