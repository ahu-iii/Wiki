---
type: concept
title: "StandardScaler"
created: 2026-04-21
updated: 2026-04-21
tags:
  - type/concept
  - domain/machine-learning
  - domain/preprocessing
complexity: basic
domain: "machine-learning"
aliases: []
status: developing
related:
  - "[[Data Preprocessing]]"
  - "[[MinMaxScaler]]"
  - "[[RobustScaler]]"
  - "[[Principal Component Analysis]]"
sources:
  - "[[Introduction to Machine Learning with Python (Muller & Guido)]]"
---

# StandardScaler

> StandardScaler is a feature-wise scaling transformer in scikit-learn's `sklearn.preprocessing` module that shifts each feature to mean 0 and rescales it to unit variance. It is the default scaling choice when a model assumes zero-centered, comparably-scaled inputs ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## How It Works

During `fit`, StandardScaler computes the mean and standard deviation of each feature column across the training set. During `transform`, it subtracts the stored mean and divides by the stored standard deviation. The result is that every feature has, on the training set, mean 0 and variance 1 ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

The fitted parameters are stored on the transformer, so the **same** transformation can be applied to test data by calling `transform` again without refitting. Refitting on the test set would use different mean and variance values and produce an inconsistent transformation — this is the central error the chapter warns against ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

For convenience, `fit_transform` combines the two operations and is both more concise and faster than `fit` followed by `transform` on the same data ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Key Properties

- Feature-wise: each column is rescaled independently.
- Mean 0, variance 1 on the training set.
- Sensitive to outliers, because both the mean and the standard deviation are influenced by extreme values. When outliers are a concern, [[RobustScaler]] is preferred.
- Does not bound the output range — scaled values can be arbitrarily large in magnitude.
- Preserves the shape of the distribution; it shifts and rescales but does not change relative ordering within a feature.

## Applications

StandardScaler is the usual first choice before fitting estimators that are sensitive to feature scale and assume roughly zero-centered inputs: kernel SVMs, neural networks, k-nearest-neighbors, and [[Principal Component Analysis]] ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

The impact can be large. On the [[Breast Cancer Dataset]], an RBF-kernel SVC trained on raw features reaches test accuracy 0.63, while training on StandardScaler-transformed features reaches 0.97 ([[Introduction to Machine Learning with Python (Muller & Guido)]]). Feature standardization is also a standard preprocessing step before PCA when using `whiten=True`, because both operations assume comparable feature variances ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Connections

- Part of: [[Data Preprocessing]]
- Alternatives: [[MinMaxScaler]] (bounded range), [[RobustScaler]] (outlier-safe), [[Normalizer]] (per-sample rather than per-feature)
- Commonly paired with: [[Principal Component Analysis]], [[k-Means Clustering]], [[DBSCAN]]

## Gaps and Open Questions

> [!gap] The chapter does not discuss what to do when individual features have meaningful zero points (e.g. counts) that standardization would destroy.

## Sources

- [[Introduction to Machine Learning with Python (Muller & Guido)]] — Chapter 3, "Preprocessing and Scaling" section and the breast-cancer SVC scaling example.
