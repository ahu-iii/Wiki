---
type: topic
title: "Feature Engineering"
created: 2026-04-22
updated: 2026-04-22
tags:
  - type/topic
  - domain/machine-learning
  - domain/feature-engineering
scope: "How raw data is represented for a machine-learning model: encoding categorical variables, discretising continuous ones, adding interactions and polynomials, applying nonlinear transformations, and injecting expert knowledge."
key_concepts:
  - "[[One-Hot Encoding]]"
  - "[[Binning]]"
  - "[[Interaction Feature]]"
  - "[[Polynomial Features]]"
  - "[[Univariate Nonlinear Transformation]]"
status: developing
related:
  - "[[Data Preprocessing]]"
  - "[[Feature Selection]]"
  - "[[scikit-learn]]"
sources:
  - "[[Introduction to Machine Learning with Python (Muller & Guido)]]"
---

# Feature Engineering

> Feature engineering is the task of choosing how to represent data for a supervised model. Müller and Guido argue it often matters more than the exact model or its hyperparameters, and that the best representation depends jointly on the semantics of the data and the model family being used ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Key Concepts

- [[Categorical Variable]] — a feature drawn from a fixed, unordered set of values (e.g. workclass, occupation).
- [[Continuous Feature]] — a numeric feature that varies smoothly on a scale (e.g. age, hours-per-week).
- [[One-Hot Encoding]] — the dominant encoding of categoricals: one binary column per value.
- [[Binning]] — dividing a continuous feature into discrete intervals, then one-hot-encoding the bin.
- [[Interaction Feature]] — product of two features; lets a linear model learn per-group slopes or coefficients.
- [[Polynomial Features]] — powers and cross-products of original features.
- [[Polynomial Regression]] — linear regression on polynomial features.
- [[Univariate Nonlinear Transformation]] — applying `log`, `exp`, `sin`, `cos` per feature to reshape distributions.

## Key Entities

- [[scikit-learn]] — exposes `OneHotEncoder`, `PolynomialFeatures`, and related transforms under `sklearn.preprocessing` ([[Introduction to Machine Learning with Python (Muller & Guido)]]).
- [[pandas]] — `pd.get_dummies` is the most ergonomic route to one-hot encoding in the book's exposition.
- [[Adult Dataset]] — runs the one-hot encoding example: four categorical columns drive the `>$50K` classifier.
- [[Wave Dataset]] — drives the binning / polynomial / interaction demonstrations.
- [[Boston Housing Dataset]] — 13 features expand to 105 with `PolynomialFeatures(degree=2)`, lifting Ridge R² from 0.621 to 0.753 ([[Introduction to Machine Learning with Python (Muller & Guido)]]).
- [[Citi Bike Dataset]] — canonical expert-knowledge example where decomposing POSIX time into (day-of-week, hour-of-day) plus one-hot plus interactions raises R² from −0.03 to 0.85.

## Current Understanding

### Representation depends on the model

Linear models see only what the features expose: a linear-in-features regressor cannot capture a U-shaped relation unless the U is encoded in the features. Tree-based models (decision trees, random forests, gradient boosting) can split arbitrarily and are largely invariant to monotone rescaling, so they benefit little from binning, polynomials, or log transforms ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

### Categorical features need encoding before a linear model

The formula `ŷ = w·x + b` only makes sense for numeric `x`. Any string-valued column (e.g. `"Bachelors"`, `"Masters"`) must be re-expressed as binary indicators before a [[scikit-learn]] estimator can use it ([[Introduction to Machine Learning with Python (Muller & Guido)]]). [[One-Hot Encoding]] is the default choice; the same encoding must be applied to the training and test sets, or the column semantics drift.

### Continuous features sometimes benefit from discretisation

Splitting a continuous feature into bins and one-hot encoding the bin index makes a linear model piecewise-constant — much more expressive than a single slope. The same transformation neutralises decision trees, because trees can already split on any threshold ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

### Interactions and polynomials extend linear models

Adding products of features (interactions) or powers (polynomials) gives a linear model the capacity to represent curved surfaces. `PolynomialFeatures(degree=2)` on 13-feature Boston Housing produces 105 features, and Ridge test R² rises from 0.621 to 0.753; on the same data a random forest drops slightly (0.799 → 0.763) because it cannot exploit the redundant features as well ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

### Nonlinear per-feature transforms reshape distributions

[[Univariate Nonlinear Transformation]] — especially `log(x + 1)` on count data — pulls long-tailed features towards a Gaussian shape that linear models and neural networks can fit. Ridge on a synthetic Poisson-count dataset rises from test R² 0.622 to 0.875 after `log(x + 1)` ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

### Expert knowledge beats raw timestamps

The [[Citi Bike Dataset]] case study shows that even a random forest cannot extrapolate from raw POSIX time (test R² = −0.03) because future timestamps lie outside the training range. Hand-decomposing the timestamp into `(day_of_week, hour_of_day)`, one-hot encoding both, and adding their interaction lifts Ridge to R² = 0.85 — matching a random forest, and with interpretable coefficients ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Open Questions

- How should feature engineering interact with [[Data Preprocessing]] scalers when categorical and continuous features sit in the same matrix? The chapter notes the question but does not give a pipeline-level answer.
- When does automatic [[Feature Selection]] undo gains from hand-engineered polynomial or interaction features?

## Sources

- [[Introduction to Machine Learning with Python (Muller & Guido)]] — Chapter 4, "Representing Data and Engineering Features".
