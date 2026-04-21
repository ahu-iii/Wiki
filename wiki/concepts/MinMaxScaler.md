---
type: concept
title: "MinMaxScaler"
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
  - "[[StandardScaler]]"
  - "[[RobustScaler]]"
  - "[[Normalizer]]"
sources:
  - "[[Introduction to Machine Learning with Python (Muller & Guido)]]"
---

# MinMaxScaler

> MinMaxScaler is a feature-wise scaling transformer in `sklearn.preprocessing` that rescales each feature so its training-set values fall into a bounded range, `[0, 1]` by default. It is the go-to scaler when a model requires inputs in a fixed interval ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## How It Works

During `fit`, MinMaxScaler records the minimum and maximum value of each feature column on the training set. During `transform`, it maps each column linearly so that the training minimum becomes 0 and the training maximum becomes 1 ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

As with every preprocessing transformer in the book, the scaler is fit on the training set only, and the same fitted transformation is then applied to the test set without refitting ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

A direct consequence: the `[0, 1]` guarantee holds only on the training data. Test points above the training maximum will map to values greater than 1, and points below the training minimum will map to negative values. This is the correct behavior — the alternative, refitting on the test set, would use different min and max values and silently break comparability between train and test ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Key Properties

- Feature-wise: each column rescaled independently.
- Bounded output range on the training set (default `[0, 1]`).
- Sensitive to outliers: a single extreme value sets the min or max and squeezes the rest of the column into a narrow band. When outliers are a concern, [[RobustScaler]] is preferred.
- Preserves the shape of the distribution and relative ordering within a feature.
- Does not center the data at zero — for zero-mean assumptions, [[StandardScaler]] is the usual choice.

## Applications

MinMaxScaler is the natural choice when a downstream model expects inputs in a fixed interval. Typical cases are image pixel intensities, features feeding into neural networks with bounded activation ranges, and any estimator whose numerical behavior depends on inputs being within `[0, 1]` ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

It is a common alternative to [[StandardScaler]] when feature distributions are clearly non-Gaussian but reasonably outlier-free, and it is widely used as a preprocessing step before [[Principal Component Analysis]] and density-based clustering such as [[DBSCAN]] ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Connections

- Part of: [[Data Preprocessing]]
- Alternatives: [[StandardScaler]] (zero-mean, unit variance), [[RobustScaler]] (outlier-safe), [[Normalizer]] (per-sample)
- Commonly paired with: [[Principal Component Analysis]], [[DBSCAN]]

## Gaps and Open Questions

> [!gap] The chapter does not discuss custom feature ranges (e.g. `[-1, 1]`) or how scaling interacts with one-hot encoded categorical features.

## Sources

- [[Introduction to Machine Learning with Python (Muller & Guido)]] — Chapter 3, "Preprocessing and Scaling", including the note that test-set values can fall outside `[0, 1]`.
