---
type: concept
title: "Agglomerative Clustering"
created: 2026-04-21
updated: 2026-04-21
tags:
  - type/concept
  - domain/machine-learning
  - domain/unsupervised-learning
  - domain/clustering
complexity: intermediate
domain: "machine-learning"
aliases: []
status: developing
related:
  - "[[Unsupervised Learning]]"
  - "[[k-Means Clustering]]"
  - "[[DBSCAN]]"
  - "[[Dendrogram]]"
sources:
  - "[[Introduction to Machine Learning with Python (Muller & Guido)]]"
---

# Agglomerative Clustering

> Agglomerative clustering is a bottom-up hierarchical method: it starts with every sample as its own cluster and repeatedly merges the two closest clusters under a chosen linkage criterion until a stopping condition is reached. The full merge sequence can be visualized as a [[Dendrogram]] ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## How It Works

The procedure begins with `n` singleton clusters. At each step, it picks the pair of clusters with the smallest inter-cluster distance — as defined by the **linkage criterion** — and merges them. The process continues until `n_clusters` remain, or until everything has been merged into a single cluster ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

scikit-learn's `AgglomerativeClustering` supports several linkage criteria ([[Introduction to Machine Learning with Python (Muller & Guido)]]):

- **ward** — merge the pair whose union minimizes the increase in within-cluster variance. Default; tends to produce equally sized clusters.
- **average** — merge the pair with the smallest average pairwise distance between members.
- **complete** — merge the pair with the smallest maximum pairwise distance (worst-case linkage).

Because the algorithm's definition is tied to the specific set of training points and the distance matrix between them, `AgglomerativeClustering` exposes `fit_predict` but no `predict` method — new points cannot be assigned to existing clusters without re-running the procedure ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Key Properties

- Hierarchical and deterministic for a given linkage criterion.
- `n_clusters` specifies where to cut the hierarchy; the full merge tree is also available.
- No `predict` method — not usable as a transformer for new data.
- Can handle non-spherical cluster shapes depending on linkage choice; still uses a fixed distance metric.
- Full merge history naturally visualized as a [[Dendrogram]].

## Applications

Agglomerative clustering is used when a hierarchy of cluster scales is interesting in itself — gene expression analysis, document taxonomies, exploratory data analysis — or when the number of clusters is not known a priori and the tree structure helps pick it ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

It complements [[k-Means Clustering]]: where k-means forces spherical partitions, average and complete linkage can produce stretched or irregular clusters, and ward linkage sits close to the k-means geometry with the additional benefit of a full hierarchy.

## Connections

- Part of: [[Unsupervised Learning]]
- Visualized as: [[Dendrogram]]
- Contrasts with: [[k-Means Clustering]] (flat partition, spherical assumption, has `predict`), [[DBSCAN]] (density-based, arbitrary shapes, noise label)

## Gaps and Open Questions

> [!gap] The chapter does not give a decisive rule for choosing between ward, average, and complete linkage on a given dataset.

## Sources

- [[Introduction to Machine Learning with Python (Muller & Guido)]] — Chapter 3, "Agglomerative Clustering" subsection, including the three linkage criteria and the no-`predict` caveat.
