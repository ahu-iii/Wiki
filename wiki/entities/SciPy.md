---
type: entity
title: "SciPy"
created: 2026-04-21
updated: 2026-04-21
tags:
  - type/entity
  - domain/machine-learning
  - domain/python
entity_type: library
role: "Scientific-computing library used in the book for hierarchical-clustering dendrogram plotting"
affiliation: ""
aliases: []
status: developing
related:
  - "[[Dendrogram]]"
  - "[[Agglomerative Clustering]]"
  - "[[scikit-learn]]"
  - "[[Introduction to Machine Learning with Python (Muller & Guido)]]"
sources:
  - "[[Introduction to Machine Learning with Python (Muller & Guido)]]"
---

# SciPy

> SciPy is the scientific-computing library that *Introduction to Machine Learning with Python* reaches for when [[scikit-learn]] lacks a feature — specifically, to visualize the merge sequence of [[Agglomerative Clustering]] as a [[Dendrogram]] ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Key Facts

- The book uses `scipy.cluster.hierarchy` — specifically the `ward` linkage function and the `dendrogram` plotting helper — to visualize hierarchical clustering merges, because [[scikit-learn]] does not ship a built-in dendrogram ([[Introduction to Machine Learning with Python (Muller & Guido)]]).
- This is the only use of SciPy explicitly discussed in the excerpt (pp. 145–223) ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

> [!gap]
> Broader SciPy functionality (optimization, signal processing, sparse matrices, stats) is not covered by this source and should be documented from future ingests.

## Connections

- Complements: [[scikit-learn]] (fills its dendrogram gap).
- Used for: [[Dendrogram]] plotting of [[Agglomerative Clustering]] output.

## See Also

- [[scikit-learn]]
- [[Agglomerative Clustering]]

## Sources

- [[Introduction to Machine Learning with Python (Muller & Guido)]] — describes `scipy.cluster.hierarchy.ward` and `dendrogram` use in the hierarchical-clustering section.
