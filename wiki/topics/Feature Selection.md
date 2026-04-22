---
type: topic
title: "Feature Selection"
created: 2026-04-22
updated: 2026-04-22
tags:
  - type/topic
  - domain/machine-learning
  - domain/feature-engineering
scope: "Automatic selection of the subset of features most useful for a supervised model. Covers the three families Müller & Guido describe: univariate statistics, model-based selection, and iterative (recursive) selection."
key_concepts:
  - "[[Univariate Feature Selection]]"
  - "[[Model-Based Feature Selection]]"
  - "[[Recursive Feature Elimination]]"
status: developing
related:
  - "[[Feature Engineering]]"
  - "[[scikit-learn]]"
  - "[[Breast Cancer Dataset]]"
sources:
  - "[[Introduction to Machine Learning with Python (Muller & Guido)]]"
---

# Feature Selection

> Feature selection is the supervised task of discarding uninformative features before fitting a final model. Too many features raise overfitting risk and slow training; too few lose signal. Müller and Guido classify the standard approaches into three families — univariate, model-based, and iterative — all of which must be fit on training data only, just like scalers ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Key Concepts

- [[Univariate Feature Selection]] — score each feature individually against the target (ANOVA F-test for classification, F-regression for regression) and keep the top-ranked ones.
- [[Model-Based Feature Selection]] — fit one supervised model with a notion of feature importance (tree `feature_importances_` or linear `coef_`) and keep the features above a threshold.
- [[Recursive Feature Elimination]] — repeatedly fit a model and drop the least important feature until a target count remains.

## Key Entities

- [[scikit-learn]] — provides `SelectKBest`, `SelectPercentile`, `SelectFromModel`, and `RFE` under `sklearn.feature_selection` ([[Introduction to Machine Learning with Python (Muller & Guido)]]).
- [[Breast Cancer Dataset]] — the chapter's benchmark for all three methods: its 30 real features are padded with 50 Gaussian-noise features, and each method is judged on how many of the 30 real features it recovers and the downstream logistic-regression score.

## Current Understanding

### Three families

1. **Univariate statistics.** Score each feature independently of the rest; keep the top `k` or top `p %`. Fast and model-agnostic, but blind to feature interactions — a feature useful only in combination with another will be dropped ([[Introduction to Machine Learning with Python (Muller & Guido)]]).
2. **Model-based.** Fit a single supervised model that provides a per-feature importance score, then threshold. Sees interactions (to the extent the scoring model does) and is cheap — one training run. The scoring model need not be the downstream model ([[Introduction to Machine Learning with Python (Muller & Guido)]]).
3. **Iterative / RFE.** Start with all features, fit, drop the weakest, refit, repeat until the target count remains. Expensive but usually recovers the cleanest feature set ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

### Benchmark results on the noisy breast-cancer dataset

With 50 noise features added to the 30 real ones and a logistic-regression downstream model, the chapter reports the following test scores ([[Introduction to Machine Learning with Python (Muller & Guido)]]):

| Approach | Test score |
|---|---|
| Logistic regression on all 80 features | 0.930 |
| [[Univariate Feature Selection]] (SelectPercentile, 50%) | 0.940 |
| [[Model-Based Feature Selection]] (SelectFromModel, RandomForest + median threshold) | 0.951 |
| [[Recursive Feature Elimination]] (RFE, RandomForest, 40 features) | 0.951 |

Model-based and iterative selection tie for accuracy, with model-based cheaper to run; univariate selection is the weakest of the three but still improves over "keep everything".

### All feature-selection methods are supervised

Every method here uses the target `y` and therefore must be fit on training data only ([[Introduction to Machine Learning with Python (Muller & Guido)]]). Running selection on the full dataset before splitting leaks target information into the test set, the same failure mode as refitting a scaler on the test data (see [[Data Preprocessing]]).

### Real-world gains are typically modest

The chapter notes that in most real applications, automatic feature selection gives small accuracy gains. Its main value is (a) reducing feature count for faster inference or more interpretable models, and (b) surviving datasets where feature count is so large that fitting becomes infeasible ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Open Questions

- How does feature selection interact with hand-engineered interactions or polynomials? The chapter hints that polynomial expansion followed by RFE is viable but does not show an end-to-end benchmark.
- The chapter does not discuss unsupervised selection (e.g. variance thresholding) or wrapper methods outside RFE.

## Sources

- [[Introduction to Machine Learning with Python (Muller & Guido)]] — Chapter 4, §Automatic Feature Selection.
