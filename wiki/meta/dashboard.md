---
type: meta
title: "Dashboard"
updated: 2026-04-16
---

# Wiki Dashboard

## Page Counts

```dataview
TABLE WITHOUT ID
  length(rows) AS "Total Pages",
  length(filter(rows, (r) => r.type = "source")) AS "Sources",
  length(filter(rows, (r) => r.type = "concept")) AS "Concepts",
  length(filter(rows, (r) => r.type = "entity")) AS "Entities",
  length(filter(rows, (r) => r.type = "topic")) AS "Topics",
  length(filter(rows, (r) => r.type = "comparison")) AS "Comparisons",
  length(filter(rows, (r) => r.type = "question")) AS "Questions",
  length(filter(rows, (r) => r.type = "synthesis")) AS "Synthesis"
FROM "wiki"
WHERE type != "meta"
GROUP BY true
```

## Recent Activity

```dataview
TABLE type, status, updated
FROM "wiki"
WHERE type != "meta"
SORT updated DESC
LIMIT 15
```

## Seed Pages (Need Development)

```dataview
LIST
FROM "wiki"
WHERE status = "seed"
SORT created ASC
```

## Mature Pages

```dataview
LIST
FROM "wiki"
WHERE status = "mature" OR status = "evergreen"
SORT updated DESC
```

## Pages Missing Sources

```dataview
LIST
FROM "wiki"
WHERE type != "meta" AND (!sources OR length(sources) = 0)
SORT created ASC
```

## Active Contradictions

> Pages containing `[!contradiction]` callouts that may need resolution.

```dataview
LIST
FROM "wiki"
WHERE contains(file.content, "[!contradiction]")
```
