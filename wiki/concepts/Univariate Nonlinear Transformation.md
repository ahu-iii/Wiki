---
type: concept
title: "Univariate Nonlinear Transformation"
created: 2026-04-22
updated: 2026-04-22
tags:
  - type/concept
  - domain/machine-learning
complexity: basic
domain: "feature engineering"
aliases:
  - "Log Transform"
  - "Feature Transformation"
status: developing
related:
  - "[[Continuous Feature]]"
  - "[[Feature Engineering]]"
sources:
  - "[[Introduction to Machine Learning with Python (Muller & Guido)]]"
---

# Univariate Nonlinear Transformation

> A **univariate nonlinear transformation** applies a single-input function — `log`, `exp`, `sqrt`, `sin`, `cos`, or a power transform — to one [[Continuous Feature]] to change its distribution shape. For linear models on heavy-tailed or count data, this is often the single highest-leverage feature-engineering step available ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## How It Works

Linear models assume a roughly linear relationship between each input and the target. When an input is heavily skewed — e.g. a count variable where most values are 0-5 but a few rows have counts in the thousands — the linear slope has to compromise between the dense bulk and the long tail. Applying a shape-changing function before fitting spreads the bulk out and compresses the tail, giving the model a feature it can actually use linearly ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

### The log(x+1) trick for count data

`log(x+1)` is the standard first choice for non-negative count data:

- `+1` avoids `log(0) = −∞`.
- `log` compresses large values (10000 → 9.2, 100 → 4.6) while preserving order.
- Resulting distribution is often approximately normal, which linear models handle well.

Müller & Guido generate synthetic Poisson-like count data and fit Ridge regression. On raw counts, test-set R² is 0.622. After applying `log(counts + 1)` to every feature and fitting the *same* Ridge model, R² rises to 0.875 — a gain comparable to switching to a strictly more powerful model class ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

### Sinusoidal transforms for cyclic features

`sin(2π·t/T)` and `cos(2π·t/T)` encode a cyclic feature (hour of day, day of year) without the discontinuity of integer encoding. Listed among the univariate functions worth considering though not benchmarked in the chapter ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

### Tree models don't need these

Decision trees are invariant to monotonic transformations of any single input — `log(x)` produces the same splits as `x`, so the transform is essentially a no-op for trees. This class of feature engineering is specifically a **linear-model** and **neural-network** intervention ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Key Properties

- Cheap, invertible, interpretable.
- Most effective on skewed continuous data (counts, magnitudes, financials).
- Monotonic transforms leave tree splits unchanged.
- Requires inspection: plot the histogram, pick a transform, refit.

## Applications

- Count-data Ridge regression in [[Introduction to Machine Learning with Python (Muller & Guido)]] Chapter 4: R² 0.622 → 0.875 via `log(x+1)`.
- Any financial, biological, or traffic dataset with long-tailed magnitudes.
- Pre-processing before PCA or linear dimensionality reduction on heavy-tailed features (see [[Principal Component Analysis]]).

## Connections

- Applied to: [[Continuous Feature]]
- Contrasts with: [[Polynomial Features]] (multi-output expansion) and [[Binning]] (categorical output)
- Part of: [[Feature Engineering]]

## Gaps and Open Questions

> [!gap] Automatic power-transform selection (Box-Cox, Yeo-Johnson via `sklearn.preprocessing.PowerTransformer`) is mentioned only briefly in Chapter 4 of [[Introduction to Machine Learning with Python (Muller & Guido)]]; empirical comparisons against hand-picked `log(x+1)` are not provided.

## Sources

- [[Introduction to Machine Learning with Python (Muller & Guido)]] — Chapter 4 benchmarks `log(x+1)` on synthetic Poisson count data, yielding Ridge R² 0.622 → 0.875 on the test set.
