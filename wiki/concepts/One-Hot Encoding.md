---
type: concept
title: "One-Hot Encoding"
created: 2026-04-22
updated: 2026-04-22
tags:
  - type/concept
  - domain/machine-learning
complexity: basic
domain: "feature engineering"
aliases:
  - "Dummy Encoding"
  - "One-of-N Encoding"
status: developing
related:
  - "[[Categorical Variable]]"
  - "[[Feature Engineering]]"
  - "[[Data Preprocessing]]"
sources:
  - "[[Introduction to Machine Learning with Python (Muller & Guido)]]"
---

# One-Hot Encoding

> **One-hot encoding** replaces a single [[Categorical Variable]] with one binary feature per possible category. For each row, exactly one of the new columns is `1` and the rest are `0`. It is the dominant way to hand categorical data to linear models, neural networks, and other estimators that interpret inputs as magnitudes ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## How It Works

Given a column `workclass ∈ {Private, Self-emp, Government, Never-worked}`, one-hot encoding produces four binary columns: `workclass_Private`, `workclass_Self-emp`, `workclass_Government`, `workclass_Never-worked`. A row with `workclass=Self-emp` becomes `(0, 1, 0, 0)`.

Each new column gets its own weight in a linear model, so the model can assign an independent effect to each category — which is exactly what you want when the categories have no numeric relationship to each other ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

Two main implementations in the Python ecosystem:

- **`pandas.get_dummies`** — converts all string-typed columns by default, leaves numeric columns alone. Convenient for exploration but fragile when the set of categories differs between train and test sets ([[pandas]]).
- **`sklearn.preprocessing.OneHotEncoder`** — learns the category vocabulary on `fit`, applies it on `transform`, and handles unseen categories explicitly. Required for production pipelines ([[scikit-learn]]).

### The N vs N−1 debate

Statistics textbooks typically use `k−1` dummy columns (one category is the reference). Machine learning typically uses the full `k` (all categories get their own column). With regularisation or an intercept absorbed into the model, the redundancy is harmless; without regularisation and without an intercept, it can cause collinearity ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

### The train/test column-alignment pitfall

If the training set has a category the test set doesn't (or vice versa), the two matrices end up with different columns and the model silently breaks. `OneHotEncoder` solves this by learning the vocabulary once; `get_dummies` users must align columns manually, typically by concatenating train and test before encoding, or by reindexing after ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

### Numbers that are actually categorical

A column like `workclass` encoded as integers `0, 1, 2, 3` looks continuous to `get_dummies`, which will skip it. You have to tell pandas explicitly (via `columns=` or converting to string) or use `OneHotEncoder`, which treats all columns uniformly ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Key Properties

- Linear in the number of categories — high-cardinality columns explode feature count.
- Preserves sparsity — most of the resulting matrix is zero; use sparse representations.
- No ordering baked in — each category is independent.
- Requires the vocabulary be fixed at fit time.

## Applications

- Demonstrated on the [[Adult Dataset]] to encode `workclass`, `education`, `occupation`, `sex`, and `native-country` before training logistic regression ([[Introduction to Machine Learning with Python (Muller & Guido)]]).
- On the [[Citi Bike Dataset]], one-hot encoding the `hour_of_day` and `day_of_week` integer features lifted linear-model R² dramatically (from 0.13 with integer codes to 0.85 with one-hot + interactions in the chapter's walkthrough) ([[Introduction to Machine Learning with Python (Muller & Guido)]]).
- Bucketed continuous features (after [[Binning]]) are fed to linear models via one-hot encoding so each bucket gets its own weight.

## Connections

- Applied to: [[Categorical Variable]]
- Implemented by: [[scikit-learn]] (`OneHotEncoder`), [[pandas]] (`get_dummies`)
- Interacts with: [[Interaction Feature]], [[Binning]]
- Part of: [[Feature Engineering]]

## Gaps and Open Questions

> [!gap] Chapter 4 of [[Introduction to Machine Learning with Python (Muller & Guido)]] does not cover high-cardinality alternatives (target encoding, hashing trick, learned embeddings) or how to choose between them when a categorical has thousands of levels.

## Sources

- [[Introduction to Machine Learning with Python (Muller & Guido)]] — Chapter 4 introduces one-hot encoding via `pandas.get_dummies` and `OneHotEncoder`, the N vs N−1 question, and the train/test alignment pitfall.
