---
type: concept
title: "Polynomial Features"
created: 2026-04-22
updated: 2026-04-22
tags:
  - type/concept
  - domain/machine-learning
complexity: intermediate
domain: "feature engineering"
aliases: []
status: developing
related:
  - "[[Polynomial Regression]]"
  - "[[Interaction Feature]]"
  - "[[Feature Engineering]]"
sources:
  - "[[Introduction to Machine Learning with Python (Muller & Guido)]]"
---

# Polynomial Features

> **Polynomial features** expand a set of input features into all monomials up to a chosen degree `d`: `x, x², x³, …, xᵈ` for each input, plus all cross-products. Feeding these into a linear model gives it the capacity to fit smooth nonlinear and interaction effects while remaining linear in its parameters ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## How It Works

Given features `x₁, x₂` and degree `d=2`, `sklearn.preprocessing.PolynomialFeatures(degree=2)` produces the columns `1, x₁, x₂, x₁², x₁·x₂, x₂²` ([[scikit-learn]]). At degree `d` over `n` features, the output has `C(n+d, d)` columns including the bias — growth is polynomial in `n` but combinatorially ugly at high `d`.

Two common configurations:

- `degree=d, interaction_only=False` — all monomials, including squares and higher powers. Produces smooth curves when fitted with a linear model.
- `degree=d, interaction_only=True` — only products of distinct features. Produces [[Interaction Feature]] expansions without polynomial curvature.

### Behaviour at the edges

High-degree polynomial fits become erratic near the edges of the training data's range — extrapolation on a degree-10 polynomial over the [[Wave Dataset]] oscillates violently outside the training support. Müller & Guido recommend low degrees (typically 2–3) combined with regularisation as the safer default ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

### Boston Housing benchmark

On the [[Boston Housing Dataset]], scaling the 13 original features and then applying `PolynomialFeatures(degree=2)` expands the feature count to 105. A `Ridge` regressor's R² on the test set rises from 0.621 (original 13 features) to 0.753 (polynomial features). The same transformation applied before a `RandomForestRegressor` *hurts* — its R² drops from 0.799 to 0.763 — because trees already model interactions implicitly and the extra redundant features just add noise to the splitting process ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Key Properties

- Linear in parameters, nonlinear in inputs — the fitted model is nonlinear despite using a linear estimator.
- Feature count grows combinatorially with `degree` and number of inputs; rarely wise to go beyond `degree=3` on more than a handful of features.
- Amplifies the need for feature scaling — squared and cubed values have very different magnitudes.
- Helps linear models, often hurts tree ensembles.

## Applications

- Classical polynomial regression on a single input (see [[Polynomial Regression]]).
- Tabular regression with linear models on modest feature counts — [[Boston Housing Dataset]] is the chapter's case study.
- Building [[Interaction Feature|interaction features]] as a special case (`interaction_only=True`).

## Connections

- Generalises: [[Interaction Feature]]
- Used by: [[Polynomial Regression]]
- Implemented by: [[scikit-learn]] (`sklearn.preprocessing.PolynomialFeatures`)
- Part of: [[Feature Engineering]]

## Gaps and Open Questions

> [!gap] [[Introduction to Machine Learning with Python (Muller & Guido)]] Chapter 4 does not discuss spline bases as a smoother alternative to high-degree polynomial expansion.

## Sources

- [[Introduction to Machine Learning with Python (Muller & Guido)]] — Chapter 4 covers `PolynomialFeatures`, the Boston Housing R² 0.621 → 0.753 benchmark for Ridge, and the contrasting drop 0.799 → 0.763 for random forest on the same expanded features.
