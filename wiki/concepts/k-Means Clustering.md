---
type: concept
title: "k-Means Clustering"
created: 2026-04-21
updated: 2026-04-21
tags:
  - type/concept
  - domain/machine-learning
  - domain/unsupervised-learning
  - domain/clustering
complexity: basic
domain: "machine-learning"
aliases:
  - "k-means"
status: developing
related:
  - "[[Unsupervised Learning]]"
  - "[[Vector Quantization]]"
  - "[[Agglomerative Clustering]]"
  - "[[DBSCAN]]"
  - "[[StandardScaler]]"
sources:
  - "[[Introduction to Machine Learning with Python (Muller & Guido)]]"
---

# k-Means Clustering

> k-Means is a partitioning clustering algorithm that assigns each data point to the nearest of `k` cluster centers and iteratively updates those centers to minimize within-cluster distance. It is the simplest and most widely used clustering method, and it makes strong implicit assumptions about cluster shape ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## How It Works

k-Means alternates two steps until the assignments stop changing ([[Introduction to Machine Learning with Python (Muller & Guido)]]):

1. **Assignment.** Each sample is assigned to the cluster whose current center is nearest in Euclidean distance.
2. **Update.** Each cluster center is recomputed as the mean of the samples currently assigned to it.

The procedure converges to a local minimum of within-cluster sum of squared distances. Because the objective is non-convex in the centers, different initializations can yield different final clusterings; scikit-learn's `KMeans` runs several random starts by default and keeps the best ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

The number of clusters `k` is a required user-supplied hyperparameter — unlike [[DBSCAN]], k-Means will never decide on its own that a dataset contains only one cluster, or that some points are noise ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Key Properties

- Each cluster is represented by a single center (centroid).
- Assumes clusters are roughly spherical and of similar size; fails on elongated, curved, or unevenly sized clusters.
- Requires `n_clusters` up front.
- Sensitive to feature scale — [[StandardScaler]] or [[MinMaxScaler]] preprocessing is typically required.
- Provides `predict`: new points can be assigned to the nearest existing center.
- Every point is assigned to a cluster; there is no "noise" label.

## Applications

k-Means is used whenever a quick, interpretable partition into `k` groups is needed — customer segmentation, color quantization, compression. Because the algorithm also induces a centroid-based map from samples to centers, it can be reinterpreted as [[Vector Quantization]], where each sample is replaced by its nearest centroid and the resulting "code" acts as a feature representation ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

On datasets whose true clusters violate the spherical assumption — the `two_moons` toy dataset is the chapter's running counterexample — k-Means produces qualitatively wrong groupings; [[DBSCAN]] or [[Agglomerative Clustering]] are then more appropriate ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Connections

- Part of: [[Unsupervised Learning]]
- Reinterpreted as: [[Vector Quantization]]
- Contrasts with: [[Agglomerative Clustering]] (hierarchical), [[DBSCAN]] (density-based, arbitrary shapes, has noise label)

## Gaps and Open Questions

> [!gap] Choosing `k` is not decisively resolved in the chapter. The elbow method and the [[Silhouette Coefficient]] are heuristics, not guarantees.

## Sources

- [[Introduction to Machine Learning with Python (Muller & Guido)]] — Chapter 3, "Clustering" → "k-Means Clustering", including the failure modes on `two_moons`.
