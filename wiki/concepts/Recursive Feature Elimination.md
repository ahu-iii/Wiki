---
type: concept
title: "Recursive Feature Elimination"
created: 2026-04-22
updated: 2026-04-22
tags:
  - type/concept
  - domain/machine-learning
complexity: intermediate
domain: "feature selection"
aliases:
  - "RFE"
status: developing
related:
  - "[[Univariate Feature Selection]]"
  - "[[Model-Based Feature Selection]]"
  - "[[Feature Selection]]"
sources:
  - "[[Introduction to Machine Learning with Python (Muller & Guido)]]"
---

# Recursive Feature Elimination

> **Recursive Feature Elimination (RFE)** iteratively trains a supervised estimator, drops the least-important feature, and refits — until only the target number of features remains. It is the most expensive of the three feature-selection families in scikit-learn and, in the chapter's benchmark, tied for the most accurate ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## How It Works

`sklearn.feature_selection.RFE(estimator, n_features_to_select=k)`:

1. Train `estimator` on all `n` features.
2. Read `feature_importances_` or `coef_`.
3. Drop the single least-important feature.
4. Refit on the remaining `n−1`.
5. Repeat until only `k` features are left.

For speed, the `step` parameter can drop more than one feature per iteration ([[scikit-learn]]). `RFECV` wraps the same process with cross-validation to pick `k` automatically.

### Noise-injection benchmark

On the breast-cancer + 50 noise benchmark used throughout [[Feature Selection]], `RFE` with a `RandomForestClassifier` and `n_features_to_select=40` achieves test accuracy **0.951** — tied with [[Model-Based Feature Selection]] and ahead of [[Univariate Feature Selection]] at 0.940 ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

### The cost / quality trade-off

Where `SelectFromModel` trains once, RFE trains `(n − k)` times (or `(n − k)/step`). On a 100-feature dataset being reduced to 20, that's 80 model fits. On small-to-medium tabular data this is fine; on very wide data (thousands of features), it's often prohibitive ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Key Properties

- **Iterative** — refits after each elimination, so later decisions see the effect of earlier ones.
- **Expensive** — linear in the number of features dropped.
- **Captures interactions** — inherits whatever the base estimator can model.
- **Supervised** — fit on training data only.

## Applications

- Small-to-medium tabular datasets where the extra compute is affordable.
- Pipelines that tolerate cross-validated hyperparameter search via `RFECV`.
- Demonstrated on breast-cancer + noise benchmark in [[Introduction to Machine Learning with Python (Muller & Guido)]] Chapter 4.

## Connections

- Siblings: [[Univariate Feature Selection]], [[Model-Based Feature Selection]]
- Part of: [[Feature Selection]]
- Implemented by: [[scikit-learn]] (`RFE`, `RFECV`)

## Gaps and Open Questions

> [!gap] [[Introduction to Machine Learning with Python (Muller & Guido)]] Chapter 4 does not benchmark RFE with linear-model base estimators (e.g. L1 logistic regression) where eliminating a feature changes the remaining coefficients sharply. The random-forest base is used throughout.

## Sources

- [[Introduction to Machine Learning with Python (Muller & Guido)]] — Chapter 4 introduces `RFE`, runs the breast-cancer + 50-noise benchmark at `n_features_to_select=40`, and reports test accuracy 0.951 tied with `SelectFromModel`.
