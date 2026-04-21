---
type: source
title: "Introduction to Machine Learning with Python (Muller & Guido)"
created: 2026-04-21
updated: 2026-04-21
tags:
  - type/source
  - source/book
  - domain/machine-learning
  - domain/unsupervised-learning
  - domain/preprocessing
source_type: book
author: "Andreas C. Müller; Sarah Guido"
date_published: "2016-10-01"
url: ""
confidence: high
key_claims:
  - "Preprocessing transformers must be fit on training data only and applied identically to test data; refitting on test silently corrupts generalization."
  - "PCA rotates data to orthogonal directions of decreasing variance and uses no class labels."
  - "NMF's non-negativity constraint yields more interpretable components than PCA, but only applies to non-negative data."
  - "k-means assumes equal-diameter spherical clusters and fails on non-convex or anisotropic structures."
  - "DBSCAN requires no n_clusters parameter, captures complex shapes, and explicitly labels noise points."
  - "Using accuracy_score to evaluate clustering is wrong because cluster labels are arbitrary permutations — use Adjusted Rand Index."
  - "Silhouette Coefficient does not require ground truth but prefers compact over complex shapes, so it can rate k-means above DBSCAN even when DBSCAN matches intuition."
  - "Applying StandardScaler before SVC on the breast-cancer dataset raises test accuracy from 0.63 to 0.97."
  - "Whitened PCA plus 1-nearest-neighbor on LFW eigenfaces improves face-identification accuracy from 26.6% to 35.7%."
  - "In practice there is no ground truth for clustering, so ARI and similar metrics are mostly development-time tools."
status: mature
related:
  - "[[Unsupervised Learning]]"
  - "[[Data Preprocessing]]"
  - "[[scikit-learn]]"
sources:
  - "[[Introduction to Machine Learning with Python (Muller & Guido)]]"
---

# Introduction to Machine Learning with Python (Muller & Guido)

> Chapter 3 of Müller and Guido's textbook (pp. 145–223) introduces [[Unsupervised Learning]] and [[Data Preprocessing]] through the scikit-learn API, covering feature scaling, dimensionality reduction (PCA, NMF, t-SNE), and clustering (k-means, agglomerative, DBSCAN), with worked examples on the breast-cancer, LFW, digits, and synthetic two-moons and make_blobs datasets.

## Key Claims

- Feature scalers (StandardScaler, MinMaxScaler, RobustScaler, Normalizer) must be fit on training data only; the same fitted transformation is then applied to test data ([[Introduction to Machine Learning with Python (Muller & Guido)]]).
- [[Principal Component Analysis]] rotates features into orthogonal directions of decreasing variance and is entirely unsupervised.
- [[Non-Negative Matrix Factorization]] decomposes data into non-negative components and non-negative coefficients, yielding interpretable additive parts — but requires non-negative input and is seed-dependent.
- [[t-SNE]] preserves local neighborhood structure for 2D visualization and has no `transform` method, so new points cannot be embedded after the fact.
- [[k-Means Clustering]] alternates assignment and center updates, assumes spherical equally-sized clusters, and fails on two-moons and other non-convex shapes.
- [[Vector Quantization]] reframes k-means as a decomposition method where the coefficients sent to a downstream model can be either one-hot cluster memberships or distances to all centers.
- [[Agglomerative Clustering]] builds clusters bottom-up with linkage criteria (ward, average, complete); ward is the default and produces roughly equal-sized clusters.
- [[DBSCAN]] groups dense regions, labels sparse points as noise (`-1`), and uses `eps` and `min_samples` instead of a fixed cluster count.
- [[Adjusted Rand Index]] is the correct metric for comparing cluster assignments against ground truth because it is invariant to label permutation.
- [[Silhouette Coefficient]] does not require ground truth but favors compact clusters, so it can prefer k-means over DBSCAN on datasets where DBSCAN is visually correct.
- Applying [[StandardScaler]] before an RBF-kernel SVM on the breast-cancer dataset raises test accuracy from 0.63 to 0.97.
- Whitened [[Principal Component Analysis]] followed by 1-nearest-neighbor on the [[Labeled Faces in the Wild]] dataset raises face-identification accuracy from 26.6% to 35.7%.

## Methodology

The chapter is a practitioner-oriented textbook exposition built around the [[scikit-learn]] API. Each method is introduced with a short conceptual sketch, then demonstrated on one or two datasets chosen to illustrate strengths and failure modes: the [[Breast Cancer Dataset]] for scaling and PCA, [[Labeled Faces in the Wild]] for PCA eigenfaces and face matching, the [[Digits Dataset]] for t-SNE versus PCA visualization, synthetic `make_blobs` for k-means, and two-moons for demonstrating where k-means fails and DBSCAN succeeds. Code follows the standard scikit-learn `fit` / `transform` / `fit_transform` / `fit_predict` convention. No theoretical derivations or proofs are presented.

## Entities Mentioned

- [[Andreas C. Müller]] — co-author; scikit-learn core contributor.
- [[Sarah Guido]] — co-author.
- [[O'Reilly Media]] — publisher (first edition, 2016).
- [[scikit-learn]] — the machine-learning library whose API the book teaches.
- [[SciPy]] — used for the `scipy.cluster.hierarchy` dendrogram plotting helpers.
- [[Breast Cancer Dataset]] — primary dataset for scaling and classification examples.
- [[Labeled Faces in the Wild]] — image dataset for PCA eigenfaces and NMF components.
- [[Digits Dataset]] — 8×8 handwritten-digit dataset for t-SNE visualization.
- [[Iris Dataset]] — used in earlier scaler discussion and for cluster-evaluation examples.

## Concepts Covered

- [[StandardScaler]] — zero-mean, unit-variance feature scaling.
- [[MinMaxScaler]] — rescales features into `[0, 1]`.
- [[RobustScaler]] — median/quartile scaling, robust to outliers.
- [[Normalizer]] — per-sample L2 normalization onto the unit sphere.
- [[Principal Component Analysis]] — orthogonal rotation to directions of decreasing variance.
- [[Non-Negative Matrix Factorization]] — non-negative decomposition of non-negative data.
- [[t-SNE]] — manifold embedding for 2D visualization.
- [[k-Means Clustering]] — partitioning by alternating center/assignment updates.
- [[Vector Quantization]] — k-means viewed as a decomposition / feature map.
- [[Agglomerative Clustering]] — bottom-up hierarchical clustering.
- [[Dendrogram]] — tree visualization of hierarchical merges.
- [[DBSCAN]] — density-based clustering with noise labels.
- [[Adjusted Rand Index]] — permutation-invariant supervised clustering metric.
- [[Silhouette Coefficient]] — unsupervised cluster-compactness metric.

## Limitations and Gaps

> [!gap]
> The excerpt is introductory. It covers scikit-learn only, with no deep learning, no theoretical proofs, no Gaussian mixture models or ICA, no reinforcement learning, and no model-selection (grid search, cross-validation) discussion within this chapter.

> [!gap]
> The chapter does not derive the t-SNE KL-divergence objective or discuss perplexity tuning beyond defaults.

> [!gap]
> Clustering evaluation in practice — when no ground truth exists — is acknowledged as hard but only briefly discussed qualitatively.

## Raw Source

Source file: `raw/books/Introduction to Machine Learning with Python A Guide for Data Scientists (Andreas C. Müller, Sarah Guido) (z-library.sk, 1lib.sk, z-lib.sk)-145-223.pdf`

Extracted markdown (for internal reference): `raw/books/2026-04-21-intro-ml-python-pp145-223.extracted.md`

## Sources

- [[Introduction to Machine Learning with Python (Muller & Guido)]] — this page summarizes Chapter 3 of the book itself; the source is primary evidence for its own summary.
