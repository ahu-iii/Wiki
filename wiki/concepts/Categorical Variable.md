---
type: concept
title: "Categorical Variable"
created: 2026-04-22
updated: 2026-04-22
tags:
  - type/concept
  - domain/machine-learning
complexity: basic
domain: "feature engineering"
aliases:
  - "Discrete Feature"
  - "Categorical Feature"
status: developing
related:
  - "[[Continuous Feature]]"
  - "[[One-Hot Encoding]]"
  - "[[Feature Engineering]]"
sources:
  - "[[Introduction to Machine Learning with Python (Muller & Guido)]]"
---

# Categorical Variable

> A **categorical variable** is a feature that takes values from a fixed, unordered set — such as `workclass ∈ {Private, Self-emp, Government, …}` or `education ∈ {Bachelors, Masters, …}`. Categorical values have no meaningful ordering or arithmetic, and must be encoded numerically before most machine-learning models can consume them ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## How It Works

The defining property of a categorical variable is that the set of possible values is **enumerable and without implied magnitude**. Contrast with a [[Continuous Feature]] like age or pixel brightness, where numeric distance is semantically meaningful.

Linear models interpret every feature as a magnitude because they compute `ŷ = Σ wᵢ·xᵢ + b`. Feeding a categorical variable as an integer code (e.g. `Private=0, Self-emp=1, Government=2`) forces the model to learn that `Government` is "twice as much" of something as `Self-emp`, which is usually nonsense. The standard remedy is [[One-Hot Encoding]], which replaces the single integer-valued feature with one binary feature per category ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

Tree-based models tolerate integer codes better because they split on thresholds rather than multiplying, but one-hot encoding is still the safest default across model families.

## Key Properties

- **Fixed vocabulary** — the set of valid values is known, often small, and doesn't grow with sample size.
- **No ordering** — `workclass=Private` is not "less than" `workclass=Government`.
- **Numeric-looking categoricals exist** — a column of integers can still be categorical (e.g. ZIP codes, product IDs, survey response codes). The dtype alone does not decide ([[Introduction to Machine Learning with Python (Muller & Guido)]]).
- **Can hide inside text columns** — free-text fields often contain a small effective vocabulary that, once cleaned, behaves categorically.

## Applications

- **Census and survey data** — the [[Adult Dataset]]'s `workclass`, `education`, `marital-status`, `occupation`, `sex`, `native-country` are all categorical and encoded via [[One-Hot Encoding]] before training logistic regression ([[Introduction to Machine Learning with Python (Muller & Guido)]]).
- **Time-component features** — decomposing a timestamp into `hour_of_day` and `day_of_week` produces categorical integers that benefit from one-hot encoding in a linear model, as demonstrated on the [[Citi Bike Dataset]] where raw POSIX time gave R² = −0.03 but hour + day-of-week encoded as categoricals reached R² = 0.85 ([[Introduction to Machine Learning with Python (Muller & Guido)]]).
- **Binned continuous features** — applying [[Binning]] to a continuous variable converts it into a categorical one.

## Connections

- Encoded using: [[One-Hot Encoding]]
- Contrasts with: [[Continuous Feature]]
- Produced by: [[Binning]]
- Part of: [[Feature Engineering]]

## Gaps and Open Questions

> [!gap] Alternatives to one-hot encoding — target (mean) encoding, frequency encoding, hashing, and learned embeddings — are not covered by Chapter 4 of [[Introduction to Machine Learning with Python (Muller & Guido)]]. Their trade-offs against one-hot on high-cardinality features remain to be ingested from other sources.

## Sources

- [[Introduction to Machine Learning with Python (Muller & Guido)]] — Chapter 4 "Representing Data and Engineering Features" introduces the continuous-vs-categorical distinction and motivates one-hot encoding for linear models.
