---
type: concept
title: "t-SNE"
created: 2026-04-21
updated: 2026-04-21
tags:
  - type/concept
  - domain/machine-learning
  - domain/unsupervised-learning
  - domain/manifold-learning
complexity: intermediate
domain: "machine-learning"
aliases:
  - "t-Distributed Stochastic Neighbor Embedding"
status: developing
related:
  - "[[Unsupervised Learning]]"
  - "[[Principal Component Analysis]]"
sources:
  - "[[Introduction to Machine Learning with Python (Muller & Guido)]]"
---

# t-SNE

> t-SNE (t-Distributed Stochastic Neighbor Embedding) is a non-linear manifold-learning method that produces a low-dimensional embedding — usually 2D — in which local neighborhoods of the original data are preserved. It is the canonical tool for visualizing high-dimensional data as a scatter plot ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## How It Works

t-SNE defines a probability distribution over pairs of points that reflects their similarity in the high-dimensional space, and a second distribution over pairs in the low-dimensional embedding. It then moves the embedded points to make these two distributions as close as possible. The effect is that points that are near each other in the original feature space end up near each other in the 2D map, while more distant relationships are deliberately de-emphasized ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

Because the optimization is defined only over the specific input points, scikit-learn's `TSNE` exposes `fit_transform` but **no** `transform` method. New points cannot be embedded into a previously learned layout — a fresh run is required to embed any extended dataset ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

The chapter illustrates t-SNE on the [[Digits Dataset]], where it separates the ten digit classes into visually distinct clusters in 2D even though no labels are used ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Key Properties

- Non-linear, neighborhood-preserving.
- Output is intended for **visualization**, not as features for downstream models.
- No `transform` method; cannot embed new points without re-running.
- Stochastic: different runs produce different layouts.
- Preserves local structure well but distorts global distances — between-cluster distances and cluster sizes should not be interpreted literally.

## Applications

The primary use is exploratory visualization of high-dimensional data, where a 2D scatter plot helps reveal clusters, class separability, and outliers without requiring labels. The [[Digits Dataset]] demonstration makes the case: classes that overlap heavily under PCA are clearly separated under t-SNE ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

Because t-SNE does not produce transformable features and is expensive to run, it is not used as a preprocessing step for downstream supervised learning. [[Principal Component Analysis]] remains the appropriate choice for that role.

## Connections

- Part of: [[Unsupervised Learning]]
- Contrasts with: [[Principal Component Analysis]] (linear, has `transform`, preserves global variance rather than local neighborhoods)

## Gaps and Open Questions

> [!gap] The chapter does not dwell on the sensitivity of t-SNE layouts to the `perplexity` hyperparameter or the initialization; both can change the resulting visualization substantially.

## Sources

- [[Introduction to Machine Learning with Python (Muller & Guido)]] — Chapter 3, "Manifold Learning with t-SNE" subsection, including the Digits-dataset example.
