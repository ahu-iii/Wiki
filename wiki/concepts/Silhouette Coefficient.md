---
type: concept
title: "Silhouette Coefficient"
created: 2026-04-21
updated: 2026-04-21
tags:
  - type/concept
  - domain/machine-learning
  - domain/unsupervised-learning
  - domain/evaluation
complexity: intermediate
domain: "machine-learning"
aliases: []
status: developing
related:
  - "[[Unsupervised Learning]]"
  - "[[Adjusted Rand Index]]"
  - "[[k-Means Clustering]]"
  - "[[DBSCAN]]"
sources:
  - "[[Introduction to Machine Learning with Python (Muller & Guido)]]"
---

# Silhouette Coefficient

> The silhouette coefficient is an unsupervised evaluation metric for clustering: it scores each sample by comparing how close it is to its own cluster versus the nearest other cluster, then averages across samples. Unlike the [[Adjusted Rand Index]] it requires no ground-truth labels, making it usable in genuine deployment settings ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## How It Works

For each sample `i`, let `a(i)` be the mean distance to other points in its own cluster and `b(i)` be the mean distance to points in the nearest neighboring cluster. The silhouette value is `(b(i) - a(i)) / max(a(i), b(i))`, giving a per-sample score in `[-1, 1]`. The silhouette coefficient for a clustering is the mean of these per-sample values ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

A score near 1 means samples sit much closer to their own cluster than to any other; a score near 0 indicates overlap between clusters; negative scores flag samples that are actually closer to a different cluster than their assigned one ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Key Properties

- Unsupervised: no labels required, so it can be computed in real deployment settings where ground truth is unavailable.
- Range `[-1, 1]`; higher is better.
- Biased toward compact, convex, roughly spherical clusters — the same geometric assumption that favours [[k-Means Clustering]].
- Penalizes complex but correct partitions. On the `two_moons` dataset, a wrong [[k-Means Clustering]] that splits the space into two convex halves can score higher than [[DBSCAN]]'s correct recovery of the two crescents ([[Introduction to Machine Learning with Python (Muller & Guido)]]).
- Computationally heavier than inspecting inertia because it requires pairwise distances.

## Applications

The silhouette coefficient is used when labels are unavailable and an algorithmic hint at clustering quality is still needed — e.g., choosing between candidate values of `n_clusters`, comparing algorithms on the same dataset, or flagging samples whose cluster assignment is doubtful ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

The chapter's recommendation is to combine the silhouette score with qualitative inspection rather than trust it alone. For non-convex cluster shapes, its ranking can be misleading, and density-based metrics or direct visualization are more reliable signals ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Connections

- Part of: [[Unsupervised Learning]] (evaluation)
- Contrasts with: [[Adjusted Rand Index]] (supervised, permutation-invariant, requires labels)
- Interacts with: [[k-Means Clustering]] (convex bias works in its favour), [[DBSCAN]] (non-convex shapes can score poorly despite being correct)

## Gaps and Open Questions

> [!gap] The chapter notes the silhouette coefficient's bias toward convex clusters but does not recommend a specific alternative unsupervised metric for non-convex cases (e.g. density-based cluster validity indices).

## Sources

- [[Introduction to Machine Learning with Python (Muller & Guido)]] — Chapter 3, "Evaluating Clustering Without Ground Truth" subsection, including the convex-bias caveat illustrated on `two_moons`.
