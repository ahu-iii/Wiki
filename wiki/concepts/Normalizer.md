---
type: concept
title: "Normalizer"
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
  - "[[RobustScaler]]"
sources:
  - "[[Introduction to Machine Learning with Python (Muller & Guido)]]"
---

# Normalizer

> Normalizer is a preprocessing transformer in `sklearn.preprocessing` that rescales each **sample** — not each feature — to unit L2 norm. It projects every data point onto the unit sphere, discarding magnitude and keeping only direction ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## How It Works

Unlike the other three scalers in Chapter 3, Normalizer does not look across samples during `fit`. Each row (sample) is rescaled independently by dividing by its own L2 norm so that the resulting vector has length 1 ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

Because the operation is per-sample and stateless, `fit` is essentially a no-op, and the transformation can be applied identically to training and test data without concerns about refitting ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

The geometric effect is that all samples land on the unit hypersphere. Two samples that differ only in overall magnitude collapse to the same point; only the direction of the feature vector is preserved.

## Key Properties

- Per-sample (row-wise), not per-feature (column-wise) — the only scaler in the chapter with that axis.
- Maps every sample to L2 norm 1 (unit-vector projection).
- Discards magnitude information by design.
- Stateless: no training statistics are stored.
- Not appropriate when the magnitude of a feature vector carries meaningful signal.

## Applications

Normalizer is used when only the direction of each sample matters, not its magnitude. A canonical case is text represented as a bag-of-words or TF-IDF vector, where the overall document length should not drive similarity and cosine similarity between directions is the quantity of interest ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

It pairs naturally with models or similarity measures that operate on vector direction — for example, cosine-similarity-based nearest-neighbor search. It is not a replacement for [[StandardScaler]], [[MinMaxScaler]], or [[RobustScaler]], which each address feature-scale differences rather than sample-magnitude differences.

## Connections

- Part of: [[Data Preprocessing]]
- Contrasts with: [[StandardScaler]], [[MinMaxScaler]], [[RobustScaler]] (all feature-wise)

## Gaps and Open Questions

> [!gap] The chapter introduces Normalizer briefly and does not benchmark it against feature-wise scalers on any concrete dataset.

## Sources

- [[Introduction to Machine Learning with Python (Muller & Guido)]] — Chapter 3, "Preprocessing and Scaling", description of the four scalers.
