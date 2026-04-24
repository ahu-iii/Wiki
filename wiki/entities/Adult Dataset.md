---
type: entity
title: "Adult Dataset"
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
  - "[[Categorical Variable]]"
  - "[[One-Hot Encoding]]"
  - "[[Feature Engineering]]"
sources:
  - "[[Introduction to Machine Learning with Python (Muller & Guido)]]"
---

# Adult Dataset

> The **Adult dataset** (also called the **Census Income dataset**) is a benchmark extracted from the 1994 US Census. The task is to predict whether a person's annual income exceeds \$50K given demographic and employment features. It is the canonical scikit-learn-era example for demonstrating [[One-Hot Encoding]] because its columns are a near-even mix of continuous and [[Categorical Variable|categorical]] features ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Key Contributions

- Canonical test case for categorical encoding in Chapter 4 of [[Introduction to Machine Learning with Python (Muller & Guido)]] — the authors walk through loading it with [[pandas]], encoding via `get_dummies`, and training logistic regression.
- Continuous columns: `age`, `hours-per-week`, `capital-gain`, `capital-loss`, `fnlwgt`, `education-num`.
- Categorical columns: `workclass`, `education`, `marital-status`, `occupation`, `relationship`, `race`, `sex`, `native-country`.
- Binary target: `income > $50K` vs `income ≤ $50K`.

## Connections

- Encoded with: [[One-Hot Encoding]], [[pandas]]
- Contrasts in shape with: [[Breast Cancer Dataset]] (all continuous), [[Wave Dataset]] (synthetic 1-D)
- Part of: [[Feature Engineering]]

## Timeline

- 1994 — Underlying US Census data collected.
- 1996 — Released on UCI ML Repository by Barry Becker and Ronny Kohavi as "Adult" / "Census Income".

## See Also

- [[Categorical Variable]] — the Adult dataset motivates the concept.
- [[One-Hot Encoding]] — Chapter 4 uses Adult to demonstrate the workflow end-to-end.

## Sources

- [[Introduction to Machine Learning with Python (Muller & Guido)]] — Chapter 4 introduces and works through the Adult dataset as the primary running example for categorical encoding.
