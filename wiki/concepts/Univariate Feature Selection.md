---
type: concept
title: "Univariate Feature Selection"
created: 2026-04-22
updated: 2026-04-22
tags:
  - type/concept
  - domain/machine-learning
complexity: basic
domain: "feature selection"
aliases:
  - "Univariate Statistics"
  - "SelectKBest"
  - "SelectPercentile"
status: developing
related:
  - "[[Model-Based Feature Selection]]"
  - "[[Recursive Feature Elimination]]"
  - "[[Feature Selection]]"
sources:
  - "[[Introduction to Machine Learning with Python (Muller & Guido)]]"
---

# Univariate Feature Selection

> **Univariate feature selection** scores each feature independently against the target using a statistical test — typically an ANOVA F-test — and keeps only the top-k or top-percentile by score. It is the fastest family of feature selectors in scikit-learn and the crudest: it cannot detect interactions, because it never looks at pairs of features ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## How It Works

`sklearn.feature_selection.SelectKBest` and `SelectPercentile` both take a scoring function and fit to `(X, y)`:

- `f_classif` — ANOVA F-test for classification targets.
- `f_regression` — F-test for regression targets.
- `chi2` — chi-squared for non-negative features and classification targets.

The scorer assigns each feature a score and a p-value independently. `SelectKBest(k=N)` keeps the N best; `SelectPercentile(percentile=P)` keeps the top P% ([[scikit-learn]]).

### Noise-injection benchmark

Müller & Guido construct a test by taking the breast-cancer dataset (30 real features), appending 50 columns of pure noise, and measuring how well each feature selector separates signal from noise. `SelectPercentile(f_classif, percentile=50)` keeps 40 features. A logistic regression trained on all 80 features scores 0.930 on the test set; the same model trained on the 40 selected features scores 0.940 ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

### The main limitation

Because each feature is scored in isolation, univariate selection cannot recognise features that are individually weak but jointly informative (the canonical example: XOR-like interactions, where two features each look like noise alone but perfectly predict the target together). When interactions matter, use [[Model-Based Feature Selection]] or [[Recursive Feature Elimination]] instead ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Key Properties

- **Fastest** of the three selection families — no model training, just per-column hypothesis tests.
- **Independent of estimator** — the selected features are the same regardless of which model you eventually train.
- **Blind to interactions** — this is the chief structural limitation.
- **Supervised** — must be fit on training data only; fitting it on the full dataset leaks test-label information into feature selection.

## Applications

- Initial pruning of very wide feature matrices (thousands of columns) before more expensive steps.
- Baseline against which to justify the cost of model-based or iterative selection.
- Demonstrated on breast-cancer + 50 noise features in [[Introduction to Machine Learning with Python (Muller & Guido)]] Chapter 4.

## Connections

- Siblings: [[Model-Based Feature Selection]], [[Recursive Feature Elimination]]
- Part of: [[Feature Selection]]
- Implemented by: [[scikit-learn]] (`SelectKBest`, `SelectPercentile`, `f_classif`, `f_regression`, `chi2`)

## Gaps and Open Questions

> [!gap] Mutual-information-based univariate scorers (`mutual_info_classif`, `mutual_info_regression`) are available in scikit-learn but are not benchmarked in [[Introduction to Machine Learning with Python (Muller & Guido)]] Chapter 4 alongside the F-test variants.

## Sources

- [[Introduction to Machine Learning with Python (Muller & Guido)]] — Chapter 4 introduces `SelectKBest`, `SelectPercentile`, and the ANOVA F-test scorers via the breast-cancer + noise benchmark, reporting logistic-regression test accuracy 0.930 → 0.940 after selection.
