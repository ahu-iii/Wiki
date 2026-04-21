---
type: topic
title: "Data Preprocessing"
created: 2026-04-21
updated: 2026-04-21
tags:
  - type/topic
  - domain/machine-learning
  - domain/preprocessing
scope: "Feature scaling and transformation steps applied before supervised or unsupervised learning, with particular emphasis on fitting on training data and applying the same transformation to test data."
key_concepts:
  - "[[StandardScaler]]"
  - "[[MinMaxScaler]]"
  - "[[RobustScaler]]"
  - "[[Normalizer]]"
status: developing
related:
  - "[[Unsupervised Learning]]"
  - "[[Principal Component Analysis]]"
  - "[[DBSCAN]]"
  - "[[scikit-learn]]"
sources:
  - "[[Introduction to Machine Learning with Python (Muller & Guido)]]"
---

# Data Preprocessing

> Data preprocessing covers the transformations — most commonly feature scaling — applied to a dataset before fitting a model. The scikit-learn preprocessing API exposes a fit/transform interface that must be fit on training data only and then applied identically to any test data ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Scope

Müller and Guido focus on four scaling transformers in Chapter 3 ([[Introduction to Machine Learning with Python (Muller & Guido)]]):

- [[StandardScaler]] — shifts each feature to mean 0 and scales to unit variance.
- [[MinMaxScaler]] — rescales each feature into a bounded range, `[0, 1]` by default.
- [[RobustScaler]] — uses median and interquartile range so outliers cannot distort the scaling.
- [[Normalizer]] — rescales each *sample* (not each feature) to unit L2 norm, projecting data points onto the unit sphere.

These feed directly into estimators whose performance depends on feature scale — kernel SVMs, neural networks, k-nearest-neighbors, [[Principal Component Analysis]], [[k-Means Clustering]], and [[DBSCAN]] all assume comparable feature magnitudes.

## Key Concepts

- [[StandardScaler]] — zero-mean, unit-variance scaling; sensitive to outliers because it uses mean and variance.
- [[MinMaxScaler]] — maps the training range to `[0, 1]`; test points outside the training range may fall outside `[0, 1]`.
- [[RobustScaler]] — median/quartile scaling; robust to extreme values.
- [[Normalizer]] — per-sample L2 normalization; used when only direction matters, not magnitude.

## Key Entities

- [[scikit-learn]] — provides all four scalers under `sklearn.preprocessing` with the standard `fit` / `transform` / `fit_transform` interface ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Current Understanding

### The fit-on-training-data-only rule

The chapter's central preprocessing rule: a scaler is fit on the training set, and the **same** fitted transformation is then applied — never refit — to the test set ([[Introduction to Machine Learning with Python (Muller & Guido)]]). Refitting the scaler on the test set produces a different transformation, which silently breaks the assumption that the test set is distributed like the training set and corrupts the evaluation.

A practical consequence is that [[MinMaxScaler]] only guarantees the `[0, 1]` range on the training data: if the test set contains values larger than the training maximum, the scaled test values can exceed 1, and values smaller than the training minimum become negative ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

### Shortcut: fit_transform

When no test set is involved, `fit_transform` is both more concise and faster than `fit` followed by `transform`; for some estimators it is also algorithmically more efficient ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

### Impact on supervised learning

Preprocessing can dramatically change downstream model quality. On the [[Breast Cancer Dataset]], an RBF-kernel SVC without scaling reaches test accuracy 0.63; with [[StandardScaler]] it reaches 0.97 ([[Introduction to Machine Learning with Python (Muller & Guido)]]). Feature scaling is often the single highest-leverage preprocessing step for distance- and kernel-based methods.

### Impact on unsupervised learning

[[Principal Component Analysis]] is sensitive to feature scale because it selects directions of maximum variance — an unscaled feature with large magnitude can dominate the first component. [[DBSCAN]] uses `eps` as a raw distance threshold, so feature scale determines whether any sensible `eps` exists. Both methods are typically preceded by [[StandardScaler]] or [[MinMaxScaler]] ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## When to use each scaler

| Scaler | Use when |
|---|---|
| [[StandardScaler]] | Features are roughly Gaussian or model assumes zero-mean inputs (SVM, neural nets, PCA whitening). |
| [[MinMaxScaler]] | A bounded input range is required (e.g. neural-network activations, image pixels). |
| [[RobustScaler]] | Data contains outliers that would skew mean/variance. |
| [[Normalizer]] | Only the direction of each sample matters, not its magnitude. |

## Open Questions

- How should scaling interact with one-hot encoded categorical features? (Not addressed in this excerpt.)

> [!gap]
> Chapter 3 does not discuss encoding of categorical features, missing-value imputation, or scaling-aware cross-validation pipelines; these appear elsewhere in the book.

## Sources

- [[Introduction to Machine Learning with Python (Muller & Guido)]] — Chapter 3 §Preprocessing and Scaling, including the breast-cancer SVC example.
