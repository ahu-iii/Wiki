---
type: entity
title: "Boston Housing Dataset"
created: 2026-04-22
updated: 2026-04-22
tags:
  - type/entity
  - domain/machine-learning
  - source/data
entity_type: "dataset"
role: "benchmark"
affiliation: "UCI Machine Learning Repository"
status: developing
related:
  - "[[Polynomial Features]]"
  - "[[Interaction Feature]]"
  - "[[Feature Engineering]]"
sources:
  - "[[Introduction to Machine Learning with Python (Muller & Guido)]]"
---

# Boston Housing Dataset

> The **Boston Housing dataset** is a classical tabular regression benchmark: 506 census tracts × 13 features, predicting median owner-occupied house value in \$1000s. In Chapter 4 of [[Introduction to Machine Learning with Python (Muller & Guido)]] it anchors the demonstration that [[Polynomial Features]] and [[Interaction Feature|interaction features]] dramatically help linear models on this kind of data — while actively hurting random forests.

## Key Contributions

- Canonical test case in the chapter's `PolynomialFeatures` comparison:
  - Original features: 13 continuous columns (per-tract crime rate, room count, age of housing stock, pupil-teacher ratio, etc.).
  - `PolynomialFeatures(degree=2)` expands to **105 columns** (bias + 13 originals + 13 squared + 78 pairwise interactions).
  - `Ridge` test R²: **0.621 → 0.753** with the expanded features ([[Introduction to Machine Learning with Python (Muller & Guido)]]).
  - `RandomForestRegressor` test R²: **0.799 → 0.763** — expansion *hurts* the tree model ([[Introduction to Machine Learning with Python (Muller & Guido)]]).
- Demonstrates the general rule: linear models benefit from explicit interaction features, tree ensembles typically don't.

## Connections

- Used with: [[Polynomial Features]], [[Interaction Feature]], [[StandardScaler]]
- Part of: [[Feature Engineering]]
- Sibling benchmarks: [[Breast Cancer Dataset]] (classification), [[Iris Dataset]], [[Digits Dataset]]

## Timeline

- 1978 — Harrison & Rubinfeld publish the original "Hedonic housing prices" paper using this data.
- 1990s–2020s — Became a default scikit-learn dataset (`sklearn.datasets.load_boston`).
- 2020 — Deprecated in scikit-learn 1.0+ due to ethical concerns about a proxy feature (`B`) that encodes racial demographics. The dataset is retained in older codebooks and texts including [[Introduction to Machine Learning with Python (Muller & Guido)]].

## See Also

- [[Polynomial Features]] — Boston Housing is the key benchmark for this concept.
- [[Feature Engineering]] — topic page summarising the benchmark result.

## Sources

- [[Introduction to Machine Learning with Python (Muller & Guido)]] — Chapter 4 reports the 0.621 → 0.753 Ridge R² gain and the 0.799 → 0.763 random-forest R² drop on the Boston Housing dataset after `PolynomialFeatures(degree=2)`.
