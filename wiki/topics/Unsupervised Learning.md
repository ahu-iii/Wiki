---
type: topic
title: "Unsupervised Learning"
created: 2026-04-21
updated: 2026-04-21
tags:
  - type/topic
  - domain/machine-learning
  - domain/unsupervised-learning
scope: "Machine-learning methods that extract structure from unlabeled data: dimensionality reduction, manifold visualization, and clustering."
key_concepts:
  - "[[Principal Component Analysis]]"
  - "[[Non-Negative Matrix Factorization]]"
  - "[[t-SNE]]"
  - "[[k-Means Clustering]]"
  - "[[Agglomerative Clustering]]"
  - "[[DBSCAN]]"
status: developing
related:
  - "[[Data Preprocessing]]"
  - "[[scikit-learn]]"
sources:
  - "[[Introduction to Machine Learning with Python (Muller & Guido)]]"
---

# Unsupervised Learning

> Unsupervised learning discovers structure in data without access to labels or target values. Typical goals are to compress, visualize, or group observations in ways that make downstream supervised modeling, exploration, or interpretation easier ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Scope

Müller and Guido group unsupervised learning into three families ([[Introduction to Machine Learning with Python (Muller & Guido)]]):

1. **Dimensionality reduction and feature extraction** — produce a lower-dimensional representation that preserves as much useful structure as possible. Examples: [[Principal Component Analysis]], [[Non-Negative Matrix Factorization]].
2. **Manifold learning** — produce a low-dimensional embedding (usually 2D) that preserves local neighborhood relationships for visualization. Example: [[t-SNE]].
3. **Clustering** — partition data points into groups that are internally similar. Examples: [[k-Means Clustering]], [[Agglomerative Clustering]], [[DBSCAN]].

Unsupervised methods are commonly used as preprocessing for supervised tasks — whitened PCA features, k-means cluster memberships, or NMF coefficients can all feed a downstream classifier or regressor ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Key Concepts

### Dimensionality reduction

- [[Principal Component Analysis]] — orthogonal rotation to directions of decreasing variance; optional whitening rescales to unit variance.
- [[Non-Negative Matrix Factorization]] — additive, non-negative decomposition that yields interpretable parts on non-negative data.

### Manifold learning

- [[t-SNE]] — preserves local neighborhoods for 2D visualization; no `transform` method, so new points cannot be embedded.

### Clustering

- [[k-Means Clustering]] — partitioning via alternating center/assignment updates; assumes spherical equal-size clusters.
- [[Vector Quantization]] — k-means reinterpreted as a decomposition / feature map.
- [[Agglomerative Clustering]] — bottom-up hierarchical merging under a linkage criterion (ward, average, complete).
- [[Dendrogram]] — tree visualization of the full agglomerative merge sequence.
- [[DBSCAN]] — density-based clustering that finds arbitrary shapes and labels noise points (`-1`).

### Evaluation

- [[Adjusted Rand Index]] — supervised metric comparing predicted assignments to ground truth, invariant to label permutation.
- [[Silhouette Coefficient]] — unsupervised metric for cluster compactness; does not require labels but favors convex clusters.

## Key Entities

- [[scikit-learn]] — implements all of the above estimators behind a unified `fit` / `transform` / `fit_predict` API.
- [[SciPy]] — provides `scipy.cluster.hierarchy` for dendrogram plotting because scikit-learn lacks a built-in dendrogram function ([[Introduction to Machine Learning with Python (Muller & Guido)]]).
- [[Labeled Faces in the Wild]], [[Digits Dataset]], [[Breast Cancer Dataset]], [[Iris Dataset]] — datasets used to demonstrate these methods.

## Current Understanding

### Challenges specific to unsupervised learning

- **No ground truth.** Because there are no labels, evaluating how well an unsupervised algorithm succeeded is inherently ambiguous ([[Introduction to Machine Learning with Python (Muller & Guido)]]). Supervised metrics like [[Adjusted Rand Index]] are available only when a labeled dataset is used for development.
- **Preprocessing sensitivity.** Many unsupervised methods — [[Principal Component Analysis]], [[k-Means Clustering]], [[DBSCAN]] — are highly sensitive to feature scale, so [[Data Preprocessing]] with [[StandardScaler]] or [[MinMaxScaler]] is usually a prerequisite ([[Introduction to Machine Learning with Python (Muller & Guido)]]).
- **Choice of hyperparameters is structural.** `n_clusters` in k-means and agglomerative clustering, and `eps`/`min_samples` in DBSCAN, change the qualitative output rather than just the accuracy.

### Relationship to supervised learning

Unsupervised methods are frequently used as preprocessing:

- Whitened PCA features feed a k-nearest-neighbor classifier on [[Labeled Faces in the Wild]] and improve accuracy from 26.6% to 35.7% ([[Introduction to Machine Learning with Python (Muller & Guido)]]).
- [[Vector Quantization]] with many k-means centers gives a rich non-linear feature map that turns a linear model into an effective classifier on non-linearly-separable data such as two-moons ([[Introduction to Machine Learning with Python (Muller & Guido)]]).
- NMF components applied to audio spectrograms separate speakers or instruments without labels ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Open Questions

- Given no labels, how should practitioners choose between clustering algorithms?
- When does an unsupervised "structure" reflect real signal versus preprocessing artifacts?

> [!gap]
> The chapter does not cover Gaussian mixture models, independent component analysis, or deep unsupervised methods (autoencoders, self-supervised learning).

## Sources

- [[Introduction to Machine Learning with Python (Muller & Guido)]] — Chapter 3 organizes the topic into preprocessing, dimensionality reduction / manifold learning, and clustering.
