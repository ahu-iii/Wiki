---
type: concept
title: "Model-Based Feature Selection"
created: 2026-04-22
updated: 2026-04-22
tags:
  - type/concept
  - domain/machine-learning
complexity: intermediate
domain: "feature selection"
aliases:
  - "SelectFromModel"
status: developing
related:
  - "[[Univariate Feature Selection]]"
  - "[[Recursive Feature Elimination]]"
  - "[[Feature Selection]]"
sources:
  - "[[Introduction to Machine Learning with Python (Muller & Guido)]]"
---

# Model-Based Feature Selection

> **Model-based feature selection** trains a supervised estimator once on the full feature set and keeps the features whose learned importance (tree `feature_importances_` or linear `coef_`) exceeds a threshold. Because the importance comes from a model that jointly considers all features, this method **can** detect interactions — something [[Univariate Feature Selection]] cannot ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## How It Works

In scikit-learn: `sklearn.feature_selection.SelectFromModel(estimator, threshold=...)`. The estimator can be:

- A tree ensemble (e.g. `RandomForestClassifier`) — feature importance is the average impurity decrease attributed to each feature across all splits.
- A linear model with L1 regularisation (`LogisticRegression(penalty="l1")`, `Lasso`) — coefficients that regularise to zero mark "unimportant" features.
- Any estimator exposing `coef_` or `feature_importances_`.

The threshold can be numeric, or a string like `"median"` / `"mean"` / `"1.25*mean"` to select relative to the importance distribution ([[scikit-learn]]).

### Noise-injection benchmark

On the same breast-cancer + 50 noise benchmark as in [[Univariate Feature Selection]], a `RandomForestClassifier` wrapped in `SelectFromModel(threshold="median")` keeps 40 features (all scoring above the median importance). A logistic regression trained on those 40 features reaches test accuracy **0.951** — higher than univariate selection's 0.940 and higher than the 0.930 baseline on all 80 features ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

### Why interactions matter

The random forest splits repeatedly on each feature and can assign importance to features whose effect only manifests in combination. Univariate F-tests miss those entirely. The accuracy gap of 0.940 → 0.951 in the chapter's benchmark reflects this capability ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Key Properties

- **Trains one model** — cheaper than [[Recursive Feature Elimination]], more expensive than [[Univariate Feature Selection]].
- **Captures interactions** via the base estimator's joint fit.
- **Biased by the base estimator** — if the estimator has a blind spot (e.g. linear L1 on data with strong non-linearities), the resulting selection inherits it.
- **Supervised** — fit on training data only.

## Applications

- Wide tabular data where you expect important features to show up in a model's internal ranking (most real tabular problems).
- Demonstrated on breast-cancer + noise benchmark in [[Introduction to Machine Learning with Python (Muller & Guido)]] Chapter 4.
- Often the best cost/quality compromise — cheaper than RFE, more accurate than univariate selection.

## Connections

- Siblings: [[Univariate Feature Selection]], [[Recursive Feature Elimination]]
- Part of: [[Feature Selection]]
- Implemented by: [[scikit-learn]] (`SelectFromModel`)

## Gaps and Open Questions

> [!gap] The stability of selected feature sets across different random seeds of the base estimator is not discussed in [[Introduction to Machine Learning with Python (Muller & Guido)]] Chapter 4; in practice this can be a meaningful concern on small datasets.

## Sources

- [[Introduction to Machine Learning with Python (Muller & Guido)]] — Chapter 4 introduces `SelectFromModel` with a random-forest base estimator and reports the 0.951 test accuracy on the breast-cancer + 50-noise benchmark.
