---
type: concept
title: "DBSCAN"
created: 2026-04-21
updated: 2026-04-21
tags:
  - type/concept
  - domain/machine-learning
  - domain/unsupervised-learning
  - domain/clustering
complexity: intermediate
domain: "machine-learning"
aliases:
  - "Density-Based Spatial Clustering of Applications with Noise"
status: developing
related:
  - "[[Unsupervised Learning]]"
  - "[[k-Means Clustering]]"
  - "[[Agglomerative Clustering]]"
  - "[[StandardScaler]]"
  - "[[MinMaxScaler]]"
sources:
  - "[[Introduction to Machine Learning with Python (Muller & Guido)]]"
---

# DBSCAN

> DBSCAN ("Density-Based Spatial Clustering of Applications with Noise") groups points that lie in dense regions and labels points in sparse regions as noise. Unlike [[k-Means Clustering]] it does not require the number of clusters up front, and it can recover clusters of arbitrary shape ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## How It Works

DBSCAN is parameterized by two numbers: a neighborhood radius `eps` and a minimum neighborhood size `min_samples`. Each sample is classified based on how many other samples fall within its `eps`-ball ([[Introduction to Machine Learning with Python (Muller & Guido)]]):

- **Core point** — has at least `min_samples` samples within `eps`.
- **Boundary point** — lies within `eps` of a core point but is not itself a core point.
- **Noise point** — neither core nor within the neighborhood of a core point.

Clusters are then formed by connecting core points that are within `eps` of one another and absorbing their boundary neighbors. Noise points are assigned the special label `-1` ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

Because DBSCAN's notion of a cluster is purely local density, it can trace out thin filaments, concentric rings, and other non-convex shapes that a centroid-based method cannot. It also decides on its own how many clusters exist, given `eps` and `min_samples` ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Key Properties

- No `n_clusters` hyperparameter; the number of clusters emerges from density structure.
- Has an explicit noise label (`-1`) for points not in any dense region.
- Recovers clusters of arbitrary shape.
- Highly sensitive to feature scale, because `eps` is a raw distance threshold. Preprocessing with [[StandardScaler]] or [[MinMaxScaler]] is essentially required so that a single `eps` makes sense across features ([[Introduction to Machine Learning with Python (Muller & Guido)]]).
- `eps` too small → everything becomes noise; `eps` too large → everything becomes one cluster.
- No `predict` method — `fit_predict` only; new points cannot be assigned without refitting.

## Applications

DBSCAN is the go-to clustering method when cluster shapes are known to be non-convex, when there are outliers that should be recognized as such rather than forced into a cluster, or when the number of clusters cannot be specified in advance. On the `two_moons` dataset, DBSCAN recovers the two interlocking crescents that [[k-Means Clustering]] cannot separate ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

It is widely used for spatial data (e.g. GPS tracks), anomaly detection (noise label as outlier flag), and exploratory analysis where forcing a fixed `k` would distort structure.

## Connections

- Part of: [[Unsupervised Learning]]
- Prerequisites: [[Data Preprocessing]] with [[StandardScaler]] or [[MinMaxScaler]]
- Contrasts with: [[k-Means Clustering]] (fixed `k`, no noise label, spherical clusters), [[Agglomerative Clustering]] (hierarchical, no explicit noise label)

## Gaps and Open Questions

> [!gap] The chapter gives general guidance on `eps` and `min_samples` but no automatic procedure; choosing them remains an empirical exercise.

## Sources

- [[Introduction to Machine Learning with Python (Muller & Guido)]] — Chapter 3, "DBSCAN" subsection, including the core/boundary/noise terminology and the `-1` noise label.
