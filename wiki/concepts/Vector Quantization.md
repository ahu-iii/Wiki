---
type: concept
title: "Vector Quantization"
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
  - "VQ"
status: developing
related:
  - "[[Unsupervised Learning]]"
  - "[[k-Means Clustering]]"
  - "[[Principal Component Analysis]]"
  - "[[Non-Negative Matrix Factorization]]"
sources:
  - "[[Introduction to Machine Learning with Python (Muller & Guido)]]"
---

# Vector Quantization

> Vector quantization reinterprets [[k-Means Clustering]] as a decomposition method: each data point is represented by a code that identifies its nearest cluster center, and the codebook of centers plays the role of a learned dictionary. With enough centers, this produces a powerful non-linear feature map ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## How It Works

Run k-Means with a chosen number of centers. Each input point is then summarized by (a) the index of the nearest center — a hard, discrete code — or (b) a vector of distances to all centers, giving a soft representation. The centers themselves are the learned "codebook" ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

Framed this way, k-means is a one-hot decomposition: each sample is reconstructed (approximately) as a single centroid, in contrast to [[Principal Component Analysis]] (a linear combination of orthogonal components) or [[Non-Negative Matrix Factorization]] (a non-negative combination of additive components) ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

Using many more centers than there are "true" clusters — e.g. 10 centers on `two_moons` — is a feature, not a bug: the dense collection of local prototypes acts as a non-linear feature basis that captures curvature a linear model cannot see directly ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Key Properties

- One center per code; inference is an argmin over centers.
- Codebook learned from data; no labels required.
- Distance features (per-center distances) give a dense vector representation suitable for downstream learning.
- Scales linearly with the number of centers at prediction time.
- Sensitive to feature scale via the underlying Euclidean distance.

## Applications

The chapter's headline example is `two_moons`: a linear classifier fails on the raw 2D features because the decision boundary is non-linear, but when the data is first expanded by the k-means distance features (with `n_clusters` set well above 2), the same linear classifier separates the two moons cleanly. Vector quantization turns k-means into a non-linear feature extractor that competes with kernel methods ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

More broadly, vector quantization is used for codebook-style feature learning, lossy compression, and as a preprocessing stage for classification pipelines that benefit from a rich non-linear basis.

## Connections

- Part of: [[Unsupervised Learning]]
- Reinterprets: [[k-Means Clustering]]
- Contrasts with: [[Principal Component Analysis]], [[Non-Negative Matrix Factorization]] (both produce additive / linear combinations rather than one-hot assignments)

## Gaps and Open Questions

> [!gap] The chapter does not formalize how to choose the number of centers when k-means is being used purely as a feature extractor.

## Sources

- [[Introduction to Machine Learning with Python (Muller & Guido)]] — Chapter 3, "Vector Quantization, or Seeing k-Means as Decomposition" subsection, including the `two_moons` + linear classifier example.
