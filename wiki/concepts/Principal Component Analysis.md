---
type: concept
title: "Principal Component Analysis"
created: 2026-04-21
updated: 2026-04-21
tags:
  - type/concept
  - domain/machine-learning
  - domain/unsupervised-learning
  - domain/dimensionality-reduction
complexity: intermediate
domain: "machine-learning"
aliases:
  - "PCA"
status: developing
related:
  - "[[Unsupervised Learning]]"
  - "[[Data Preprocessing]]"
  - "[[StandardScaler]]"
  - "[[Non-Negative Matrix Factorization]]"
  - "[[t-SNE]]"
sources:
  - "[[Introduction to Machine Learning with Python (Muller & Guido)]]"
---

# Principal Component Analysis

> Principal Component Analysis (PCA) is an unsupervised method that rotates the feature space so that new axes — the principal components — point in directions of decreasing variance. It is the workhorse linear technique for dimensionality reduction, decorrelation, and visualization ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## How It Works

PCA finds an orthogonal set of directions such that the first component captures the largest possible variance in the data, the second captures the largest remaining variance orthogonal to the first, and so on. Projecting the data onto the first `k` components gives a `k`-dimensional representation that preserves as much variance as any linear projection of that rank ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

Because PCA is driven by variance, it is sensitive to feature scale: an untreated feature with large numerical magnitude can dominate the first component purely by scale. Standardizing the features first — typically with [[StandardScaler]] — is the usual prerequisite ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

scikit-learn's `PCA` exposes `fit` / `transform` and stores the learned components. An optional `whiten=True` flag rescales each component to unit variance after rotation, yielding a fully decorrelated, equally-scaled representation — useful when downstream methods (distance-based classifiers, linear models) assume isotropic inputs ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Key Properties

- Linear, unsupervised rotation of the feature space.
- Components are orthogonal and ordered by explained variance.
- Preprocessing-sensitive — requires feature-scale normalization to be meaningful.
- Whitening (optional) produces decorrelated, unit-variance features.
- Provides an inverse transform: projections can be mapped back into the original feature space (lossy for `k < d`).
- Each component is a linear combination of all input features, so individual components can be hard to interpret; this is a key contrast with [[Non-Negative Matrix Factorization]].

## Applications

PCA is used for three broadly different purposes in the chapter ([[Introduction to Machine Learning with Python (Muller & Guido)]]):

- **Dimensionality reduction for downstream learning.** On [[Labeled Faces in the Wild]], projecting face images onto the top 100 whitened PCA components ("eigenfaces") and running 1-nearest-neighbor lifts accuracy from 26.6% on raw pixels to 35.7% on PCA features.
- **Visualization.** Projecting high-dimensional data onto the first two components gives a quick 2D scatter plot, although preserving global variance is not the same as preserving local neighborhoods — [[t-SNE]] is the usual alternative for the latter.
- **Decorrelation and feature extraction.** Whitened PCA serves as a generic preprocessing step before distance-based models.

## Connections

- Part of: [[Unsupervised Learning]]
- Prerequisites: [[Data Preprocessing]] with [[StandardScaler]] or [[MinMaxScaler]]
- Contrasts with: [[Non-Negative Matrix Factorization]] (non-negative, additive, parts-based); [[t-SNE]] (non-linear, local-neighborhood-preserving)

## Gaps and Open Questions

> [!gap] The chapter does not discuss how to choose the number of components automatically (e.g. via cumulative explained variance thresholds or cross-validation).

## Sources

- [[Introduction to Machine Learning with Python (Muller & Guido)]] — Chapter 3, "Dimensionality Reduction, Feature Extraction, and Manifold Learning", including the eigenfaces-on-LFW example with the 26.6% → 35.7% 1-NN accuracy improvement.
