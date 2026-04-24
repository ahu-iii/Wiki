---
type: concept
title: "Binning"
created: 2026-04-22
updated: 2026-04-22
tags:
  - type/concept
  - domain/machine-learning
complexity: basic
domain: "feature engineering"
aliases:
  - "Discretization"
  - "Bucketing"
status: developing
related:
  - "[[Continuous Feature]]"
  - "[[One-Hot Encoding]]"
  - "[[Feature Engineering]]"
sources:
  - "[[Introduction to Machine Learning with Python (Muller & Guido)]]"
---

# Binning

> **Binning** (also called **discretization**) divides the range of a [[Continuous Feature]] into a small number of fixed intervals and replaces each value with the bin it falls into. Combined with [[One-Hot Encoding]], it lets a linear model fit a **piecewise-constant** function over that feature — capturing nonlinear shape without polynomial expansion ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## How It Works

Given a continuous feature `x` and `k` bin edges, replace each value with its bin index `∈ {0, 1, …, k−1}`. In NumPy this is typically `np.digitize(x, bins)`. The resulting integer column is a [[Categorical Variable]], and is then one-hot encoded so each bin gets its own weight in a linear model ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

The effect on a linear regressor is dramatic: before binning, `LinearRegression` can only fit a single slope over the whole domain. After binning into 10 buckets and one-hot encoding, the same model fits 10 independent offsets — one per bin — producing a staircase fit that matches the data's local structure. Müller & Guido demonstrate this on the [[Wave Dataset]]: the binned linear model becomes indistinguishable from a shallow decision tree on the same data ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

### Trees are neutral or harmed

Decision-tree models already partition continuous inputs into ranges by their splitting rules, so binning provides no new information and can only hurt by forcing coarser cuts. The chapter's wave-dataset comparison shows a decision tree's predictions barely change under binning ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Key Properties

- Converts a continuous feature into a categorical one.
- With one-hot encoding, turns linear models into piecewise-constant models.
- Strictly additive with the rest of the feature set — you can keep the original continuous column alongside the bin indicators.
- Number and placement of bins are hyperparameters; equal-width and equal-frequency (quantile) are the standard strategies.

## Applications

- Demonstrated on the [[Wave Dataset]] to show how linear regression's single-slope fit becomes a piecewise-constant fit after discretization ([[Introduction to Machine Learning with Python (Muller & Guido)]]).
- Useful when a practitioner knows a continuous feature has a non-monotonic effect on the target — e.g. age, where effect varies qualitatively across life stages — and wants a linear model to capture that without committing to a specific functional form.
- Often combined with [[Interaction Feature]] (bin × slope) to let each bin have its own slope, not just its own intercept.

## Connections

- Input: [[Continuous Feature]]
- Output: [[Categorical Variable]] (bin indices)
- Followed by: [[One-Hot Encoding]]
- Contrast: [[Polynomial Features]] (smooth non-linear expansion) vs Binning (piecewise-constant expansion)
- Part of: [[Feature Engineering]]

## Gaps and Open Questions

> [!gap] Automatic bin-edge selection (e.g. minimum description length, entropy-based, `KBinsDiscretizer` strategies) is not deeply explored in [[Introduction to Machine Learning with Python (Muller & Guido)]] Chapter 4.

## Sources

- [[Introduction to Machine Learning with Python (Muller & Guido)]] — Chapter 4 demonstrates binning with `np.digitize` + `OneHotEncoder` on the Wave dataset and shows its piecewise-constant effect on linear models versus neutrality on trees.
