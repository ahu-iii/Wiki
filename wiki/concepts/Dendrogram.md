---
type: concept
title: "Dendrogram"
created: 2026-04-21
updated: 2026-04-21
tags:
  - type/concept
  - domain/machine-learning
  - domain/unsupervised-learning
  - domain/clustering
complexity: basic
domain: "machine-learning"
aliases: []
status: developing
related:
  - "[[Agglomerative Clustering]]"
  - "[[Unsupervised Learning]]"
sources:
  - "[[Introduction to Machine Learning with Python (Muller & Guido)]]"
---

# Dendrogram

> A dendrogram is a tree diagram that records every merge in a hierarchical clustering run. The leaves are individual samples, internal nodes are merged clusters, and the height of each node is the distance between the clusters it combined. Cutting the tree at a given height yields a flat clustering at that scale ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## How It Works

When [[Agglomerative Clustering]] runs, it produces a sequence of merges. A dendrogram draws this sequence: each horizontal bar at the bottom is a sample, and each inverted "U" joining two branches represents a merge, with its vertical position set by the linkage distance at which the merge occurred. Short vertical jumps correspond to merging similar clusters; tall jumps indicate merging clusters that were far apart ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

Drawing a horizontal line across the tree at any height cuts it into a specific flat clustering — everything connected below that line belongs to the same cluster. This makes the dendrogram both a diagnostic tool (which number of clusters looks natural?) and a communication device (the whole hierarchy is legible at a glance) ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

scikit-learn does not ship a built-in dendrogram function. The chapter uses `scipy.cluster.hierarchy.dendrogram` together with `linkage` from the same module to produce the plot ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Key Properties

- Faithful visualization of every merge in a hierarchical clustering.
- Cut-height selects the number of clusters.
- Node height encodes linkage distance; taller jumps suggest natural cluster boundaries.
- Readability degrades as the number of leaves grows; useful mostly at small-to-moderate sample counts.
- Produced via [[SciPy]], not scikit-learn.

## Applications

Dendrograms are the default visualization for hierarchical clustering results in exploratory analysis — gene expression, document grouping, taxonomy building. They are also used as a decision aid for choosing the number of clusters: large vertical gaps in the dendrogram indicate scales at which clusters are well separated ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Connections

- Visualizes: [[Agglomerative Clustering]]
- Part of: [[Unsupervised Learning]]

## Gaps and Open Questions

> [!gap] The chapter does not cover alternative hierarchical visualizations (e.g. clustermaps, radial dendrograms) or strategies for dendrograms with thousands of leaves.

## Sources

- [[Introduction to Machine Learning with Python (Muller & Guido)]] — Chapter 3, "Hierarchical Clustering and Dendrograms" subsection, noting that `scipy.cluster.hierarchy` is used because scikit-learn has no built-in dendrogram function.
