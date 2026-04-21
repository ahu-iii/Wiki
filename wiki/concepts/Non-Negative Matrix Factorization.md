---
type: concept
title: "Non-Negative Matrix Factorization"
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
  - "NMF"
status: developing
related:
  - "[[Unsupervised Learning]]"
  - "[[Principal Component Analysis]]"
  - "[[Data Preprocessing]]"
sources:
  - "[[Introduction to Machine Learning with Python (Muller & Guido)]]"
---

# Non-Negative Matrix Factorization

> Non-Negative Matrix Factorization (NMF) decomposes a non-negative data matrix into two non-negative factors, yielding an additive parts-based representation. Where [[Principal Component Analysis]] rotates into arbitrary signed directions, NMF constrains everything to be non-negative, which tends to produce components that correspond to interpretable building blocks ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## How It Works

NMF approximates a non-negative data matrix `X` as a product `W * H`, with both `W` (sample-by-component coefficients) and `H` (component-by-feature dictionary) constrained to be non-negative. Each sample is reconstructed as a non-negative weighted sum of a small number of component vectors ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

The non-negativity constraint removes the ability to cancel contributions with subtractions. As a result, the learned components often correspond to coherent additive "parts" of the data — individual features, textures, or sources — rather than the variance-directed but signed components PCA produces ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

NMF is unique only up to scaling and permutation of components. Unlike PCA, components are not ordered by explained variance, and results can depend on initialization and the chosen number of components ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Key Properties

- Requires non-negative input.
- Both factors (`W` and `H`) are non-negative; representation is additive.
- Tends to produce interpretable parts-based components.
- Components are unordered; the number of components is a user-supplied hyperparameter.
- Results depend on initialization, so outputs are not unique.

## Applications

The chapter demonstrates NMF on synthetic audio mixtures to illustrate blind source separation: given a spectrogram-like mixture of several non-negative signals, NMF recovers component patterns that correspond to the original sources without any labels ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

More broadly, NMF is used wherever a parts-based additive decomposition is natural: topic modeling on term-frequency matrices, audio source separation on spectrograms, and component discovery on non-negative image data ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Connections

- Part of: [[Unsupervised Learning]]
- Contrasts with: [[Principal Component Analysis]] (signed components, orthogonal, ordered by variance)

## Gaps and Open Questions

> [!gap] The chapter does not discuss how to select the number of NMF components or how to handle the non-uniqueness of solutions across random seeds.

## Sources

- [[Introduction to Machine Learning with Python (Muller & Guido)]] — Chapter 3, "Non-Negative Matrix Factorization" subsection, including the synthetic audio source-separation example.
