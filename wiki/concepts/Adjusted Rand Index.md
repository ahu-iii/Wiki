---
type: concept
title: "Adjusted Rand Index"
created: 2026-04-21
updated: 2026-04-21
tags:
  - type/concept
  - domain/machine-learning
  - domain/unsupervised-learning
  - domain/evaluation
complexity: intermediate
domain: "machine-learning"
aliases:
  - "ARI"
status: developing
related:
  - "[[Unsupervised Learning]]"
  - "[[Silhouette Coefficient]]"
  - "[[k-Means Clustering]]"
  - "[[DBSCAN]]"
sources:
  - "[[Introduction to Machine Learning with Python (Muller & Guido)]]"
---

# Adjusted Rand Index

> The Adjusted Rand Index (ARI) is a supervised evaluation metric for clustering: it measures how well a predicted cluster assignment agrees with a ground-truth label partition, correcting for agreement that would be expected purely by chance. ARI is the chapter's recommended way to quantify clustering quality when labels happen to be available ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## How It Works

ARI compares two partitions of the same set of samples — the ground-truth label partition and the predicted cluster partition — by counting pairs of samples that are treated the same way (both in the same cluster, or both in different clusters) under each partition. The raw Rand Index is then adjusted so that the expected score of a random assignment is 0, while a perfect match scores 1 ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

Crucially, ARI is invariant to label permutation. A clustering algorithm that produces three clusters with arbitrary integer labels can still achieve ARI 1.0 against ground truth with three differently-named classes, as long as the induced partition of samples is the same ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

The chapter uses ARI to rank clustering algorithms on labeled toy datasets and to show that raw classification accuracy is the wrong tool for clustering — applying accuracy without aligning labels would unfairly penalize correct partitions that happen to use different integer ids ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Key Properties

- Supervised: requires ground-truth labels.
- Permutation-invariant across both cluster labels and class labels.
- Range: 0 on random assignments (in expectation), 1 on perfect agreement; can be slightly negative on worse-than-random partitions.
- Does not require the number of predicted clusters to equal the number of true classes.

## Applications

ARI is used to compare clustering algorithms on datasets where class labels are available for development purposes — toy benchmarks, synthetic data, and any setting where labels exist but are withheld from the clustering algorithm. The chapter uses it to contrast [[k-Means Clustering]], [[Agglomerative Clustering]], and [[DBSCAN]] head-to-head ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

When labels are genuinely unavailable — the usual deployment case for clustering — ARI cannot be computed, and the unsupervised [[Silhouette Coefficient]] or qualitative inspection become the remaining options.

## Connections

- Part of: [[Unsupervised Learning]] (evaluation)
- Contrasts with: [[Silhouette Coefficient]] (unsupervised, does not require labels)

## Gaps and Open Questions

> [!gap] The chapter does not contrast ARI with other supervised clustering metrics such as mutual information or V-measure.

## Sources

- [[Introduction to Machine Learning with Python (Muller & Guido)]] — Chapter 3, "Evaluating Clustering" → "Evaluating Clustering with Ground Truth", including the accuracy-vs-ARI discussion.
