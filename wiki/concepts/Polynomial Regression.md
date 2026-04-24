---
type: concept
title: "Polynomial Regression"
created: 2026-04-22
updated: 2026-04-22
tags:
  - type/concept
  - domain/machine-learning
complexity: basic
domain: "regression"
aliases: []
status: developing
related:
  - "[[Polynomial Features]]"
  - "[[Feature Engineering]]"
sources:
  - "[[Introduction to Machine Learning with Python (Muller & Guido)]]"
---

# Polynomial Regression

> **Polynomial regression** is linear regression fit to polynomially-expanded inputs. The model is `ŷ = w₀ + w₁·x + w₂·x² + … + wᵈ·xᵈ`, which is linear in its coefficients but fits a smooth nonlinear curve through the data. In practice it's just `PolynomialFeatures(degree=d)` → `LinearRegression` (or `Ridge`) composed as a pipeline ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## How It Works

1. Take a single continuous input `x`.
2. Expand to `[1, x, x², …, xᵈ]` via [[Polynomial Features]].
3. Fit any linear regressor on the expanded representation.
4. Predict by running the same expansion on new inputs and applying the learned weights.

On the [[Wave Dataset]] (single continuous input), a degree-10 polynomial regression produces a smooth curve that hugs the sinusoidal shape of the data — a clear improvement over vanilla linear regression's single-slope fit. Compared to the alternative of [[Binning]] + linear regression, which produces a staircase, polynomial regression produces a continuously differentiable fit; the right choice depends on whether the user expects sharp transitions or smooth variation ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

### Failure mode: edge oscillation

High-degree polynomial fits diverge rapidly outside the training data's range. Even inside the range, degree-10 on sparse data can create spurious wiggles between points. Regularisation (Ridge, Lasso) dampens this, as does preferring low degrees (2–4) unless the data genuinely calls for more ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Key Properties

- Linear in parameters → fast, convex optimisation.
- Nonlinear in inputs → fits curves.
- Number of parameters = `d + 1` for a single input; scales badly once multiple inputs are expanded jointly.
- Sensitive to feature scaling — squared and cubed magnitudes differ wildly.

## Applications

- Classic textbook model for 1-D regression when the relationship is smooth and nonlinear ([[Introduction to Machine Learning with Python (Muller & Guido)]]).
- Baseline for comparing against kernel regression, splines, and decision trees on 1-D problems.
- Building block in the [[Boston Housing Dataset]] experiment, where `degree=2` polynomial expansion lifts Ridge R² from 0.621 to 0.753.

## Connections

- Built from: [[Polynomial Features]]
- Contrasts with: [[Binning]] + linear regression (piecewise-constant vs smooth)
- Part of: [[Feature Engineering]]

## Gaps and Open Questions

> [!gap] Criteria for choosing polynomial degree vs spline basis vs kernel regression are out of scope for [[Introduction to Machine Learning with Python (Muller & Guido)]] Chapter 4.

## Sources

- [[Introduction to Machine Learning with Python (Muller & Guido)]] — Chapter 4 demonstrates polynomial regression on the Wave dataset at degree 10, comparing it visually to binned piecewise fits and to kernel ridge regression.
