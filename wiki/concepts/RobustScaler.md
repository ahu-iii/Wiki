---
type: concept
title: "RobustScaler"
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
  - "[[MinMaxScaler]]"
  - "[[Normalizer]]"
sources:
  - "[[Introduction to Machine Learning with Python (Muller & Guido)]]"
---

# RobustScaler

> RobustScaler is a feature-wise scaling transformer in `sklearn.preprocessing` that uses the median and interquartile range instead of the mean and standard deviation, so extreme values cannot distort the scaling. It is the outlier-safe counterpart to [[StandardScaler]] ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## How It Works

During `fit`, RobustScaler computes the median and the interquartile range (IQR, the difference between the 75th and 25th percentiles) of each feature column on the training set. During `transform`, it subtracts the median and divides by the IQR ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

Because the median and the IQR are order statistics, they are unaffected by a small number of extreme values. A single outlier that would shift [[StandardScaler]]'s mean or inflate its standard deviation leaves the median and IQR essentially unchanged. The remaining data then gets the bulk of the dynamic range after scaling, rather than being crushed into a narrow band around zero ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

Like the other scalers in the chapter, RobustScaler follows the fit-on-training-data-only rule and is then applied identically to any test data via `transform` ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Key Properties

- Feature-wise: each column rescaled independently.
- Robust to outliers: median and IQR are order statistics, so extreme values do not dominate.
- Does not bound the output range — scaled values can be arbitrarily large.
- Produces a distribution roughly centered at zero with IQR equal to 1, but not unit variance.
- Useful whenever the feature distribution has heavy tails or obvious contamination.

## Applications

RobustScaler is the preferred scaler when the training data is known or suspected to contain outliers that would bias mean- or variance-based scaling. Typical situations include sensor readings with occasional spikes, financial data with extreme events, and any feature column where a small fraction of samples sit far from the bulk of the distribution ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

It feeds into the same family of downstream estimators as [[StandardScaler]] — kernel methods, k-nearest-neighbors, neural networks, [[Principal Component Analysis]] — but protects the scaling from being dominated by the tails.

## Connections

- Part of: [[Data Preprocessing]]
- Alternatives: [[StandardScaler]] (mean/variance, outlier-sensitive), [[MinMaxScaler]] (bounded range, outlier-sensitive), [[Normalizer]] (per-sample)
- Commonly paired with: [[Principal Component Analysis]], [[k-Means Clustering]]

## Gaps and Open Questions

> [!gap] The chapter mentions RobustScaler only briefly; it does not quantify when IQR-based scaling beats mean/variance scaling on specific datasets.

## Sources

- [[Introduction to Machine Learning with Python (Muller & Guido)]] — Chapter 3, "Preprocessing and Scaling" overview of the four scalers.
