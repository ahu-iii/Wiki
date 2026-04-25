---
type: meta
title: "Hot Cache"
updated: 2026-04-24
---

# Recent Context

## Last Updated
2026-04-24 — Lint-fix pass cleared all 5 findings from [[lint-report-2026-04-24]]. Two actionable: appended `## Sources` footers to 13 Transformer-era entity pages + renamed `## Raw Source` → `## Sources` on [[Attention Is All You Need]] (HIGH #2); stripped `.md` suffix from 3 log.md wikilinks (LOW #1). Three verified stale at re-check (manifest, ByteNet, empty-sections). Trust aggregate unchanged (0 low / 48 medium / 25 high).

## Previous
2026-04-22 — Ingested Chapter 4 ("Representing Data and Engineering Features") of [[Introduction to Machine Learning with Python (Muller & Guido)]]. 18 new wiki pages created (2 topics, 11 concepts, 5 entities); the Chapter-3 source page from 2026-04-21 was extended to cover Chapter 4.

## Key Recent Facts

- **Scope:** Chapter 4 — categorical encoding, binning, interactions, polynomials, nonlinear transforms, feature selection, expert-knowledge feature engineering. Anchored by new topics [[Feature Engineering]] and [[Feature Selection]].
- **Categorical-vs-continuous split**: a [[Categorical Variable]] must be encoded before a linear model can use it; integer codes imply an ordering the model will overfit. [[One-Hot Encoding]] is the standard remedy — `pandas.get_dummies` for the lightweight path, `sklearn.OneHotEncoder` when a learned vocabulary and train/test column alignment are needed.
- **Binning makes linear models piecewise**: on the [[Wave Dataset]], [[Binning]] + one-hot gives a piecewise-constant linear fit indistinguishable from a shallow decision tree; adding bin × x [[Interaction Feature|interactions]] gives per-bin slopes.
- **Polynomial Features cut both ways**: on the [[Boston Housing Dataset]], `PolynomialFeatures(degree=2)` expands 13 columns to 105 and lifts Ridge R² from **0.621 → 0.753**, but *drops* random-forest R² from **0.799 → 0.763**. Linear models benefit from explicit interactions; tree ensembles typically don't.
- **Log transform on counts**: `log(x+1)` reshapes skewed Poisson-type features; Chapter 4's synthetic benchmark lifts Ridge R² from **0.622 → 0.875**. Tree models see no benefit because they're invariant to monotone transforms.
- **Expert-knowledge headline (Citi Bike)**: raw POSIX time → R² = **−0.03** (worse than mean). Decompose to `hour_of_day` + `day_of_week`, one-hot encode, add `hour × day` interactions → R² = **0.85**. Mechanical feature decomposition closes most of the gap to a tree ensemble for linear models.
- **Feature selection trio** (breast-cancer + 50 noise features, 80 features total, logistic regression): baseline **0.930**; [[Univariate Feature Selection]] at 40 features → **0.940**; [[Model-Based Feature Selection]] and [[Recursive Feature Elimination]] with random-forest base estimator → **0.951**. Univariate is fast and blind to interactions; model-based and RFE capture interactions and are slower.
- **pandas ↔ scikit-learn boundary**: [[pandas]] handles CSV loading, `get_dummies`, `value_counts`, datetime decomposition; scikit-learn's `OneHotEncoder` / `PolynomialFeatures` / `SelectKBest` / `SelectFromModel` / `RFE` live under `sklearn.preprocessing` and `sklearn.feature_selection` and accept numpy arrays or DataFrames.

## Recent Changes

- Phase A: `raw/books/Introduction_to_Machine_Learning_with_Python_Chapter_4.md` already present under `raw/` (pre-extracted).
- Phase B: 18 new pages created — 2 topics ([[Feature Engineering]], [[Feature Selection]]), 11 concepts ([[Categorical Variable]], [[Continuous Feature]], [[One-Hot Encoding]], [[Binning]], [[Interaction Feature]], [[Polynomial Features]], [[Polynomial Regression]], [[Univariate Nonlinear Transformation]], [[Univariate Feature Selection]], [[Model-Based Feature Selection]], [[Recursive Feature Elimination]]), 5 entities ([[Adult Dataset]], [[Boston Housing Dataset]], [[Citi Bike Dataset]], [[Wave Dataset]], [[pandas]]).
- Source page [[Introduction to Machine Learning with Python (Muller & Guido)]] extended with Chapter 4 key claims, entities, and a split `## Concepts Covered` (Chapter 3 / Chapter 4 subsections).
- [[Data Preprocessing]] gained a `### Adjacent: feature engineering` pointer and the open-question on scaling-vs-one-hot was answered from Chapter 4.
- [[scikit-learn]] entity extended with `sklearn.preprocessing.OneHotEncoder`, `PolynomialFeatures`, `KBinsDiscretizer`, and the `sklearn.feature_selection` family.
- [[Andreas C. Müller]] chapter-coverage note extended to include Chapter 4.
- Backlink retrofit: [[MinMaxScaler]] gap callout now links [[One-Hot Encoding]] instead of carrying it as plain text.
- Zero contradictions and zero supersessions — Chapter 4 is strictly additive to Chapter 3.

## Active Threads

- Wiki now has a third pillar — **feature engineering** — alongside **scaling** (Chapter 3) and **clustering/dimensionality reduction** (Chapter 3) on the classical-ML side. The deep-learning / Transformers subgraph remains disjoint.
- Feature-engineering benchmarks span four datasets ([[Adult Dataset]], [[Boston Housing Dataset]], [[Citi Bike Dataset]], [[Wave Dataset]]) — a natural hook for future ingests that need regression or categorical-classification baselines.
- Remaining Müller & Guido gaps: pp. 1–144 (supervised learning: linear models, trees, ensembles, SVMs) and pp. 224+ (text data, pipelines, model evaluation, grid search). The book-level coverage list on the source page now makes this visible.

## Sources

- [[Introduction to Machine Learning with Python (Muller & Guido)]] — primary source for all Chapter 4 material summarised above.
