---
type: concept
title: "Continuous Feature"
created: 2026-04-22
updated: 2026-04-22
tags:
  - type/concept
  - domain/machine-learning
complexity: basic
domain: "feature engineering"
aliases:
  - "Numeric Feature"
status: developing
related:
  - "[[Categorical Variable]]"
  - "[[Feature Engineering]]"
  - "[[Binning]]"
sources:
  - "[[Introduction to Machine Learning with Python (Muller & Guido)]]"
---

# Continuous Feature

> A **continuous feature** is a numeric feature whose values lie on a real-valued range where arithmetic and ordering are semantically meaningful — e.g. age, height, pixel brightness, sensor readings. Most off-the-shelf estimators in [[scikit-learn]] assume every input column is continuous and leave it to the practitioner to handle [[Categorical Variable|categoricals]] separately ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## How It Works

A continuous feature carries two usable signals: its **magnitude** (how large) and its **position** on the number line relative to other values. Linear models exploit magnitude directly via the weight `wᵢ`; distance-based methods like k-NN rely on numeric proximity; tree models rely on ordering via threshold splits.

Continuous features may still need transformation:

- **Scaling** — many models require comparable ranges across features (see [[StandardScaler]], [[MinMaxScaler]]).
- **[[Binning]]** — converting a continuous feature into a discrete bucket makes it categorical; useful for linear models, neutral for trees.
- **[[Univariate Nonlinear Transformation]]** — `log(x+1)`, `sqrt`, or power transforms can turn a skewed continuous feature into a more model-friendly shape.
- **[[Polynomial Features]]** — adding `x², x³, …` extends a linear model's capacity over a single continuous input.

## Key Properties

- Arithmetic is meaningful: `x₁ − x₂`, `x₁ · x₂` mean something.
- Ordering is meaningful: `x₁ < x₂`.
- Can be unbounded or bounded; can be heavy-tailed (count data, financial magnitudes) — in which case a [[Univariate Nonlinear Transformation]] often helps ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Applications

- Any numeric sensor reading, financial value, or measurement.
- The `age`, `hours-per-week`, and `capital-gain` columns of the [[Adult Dataset]] are continuous; the rest of its columns are categorical.
- The [[Wave Dataset]] has a single continuous input feature used to demonstrate [[Binning]], [[Interaction Feature|interactions]], and polynomial expansion.

## Connections

- Contrasts with: [[Categorical Variable]]
- Transformed by: [[Binning]], [[Univariate Nonlinear Transformation]], [[Polynomial Features]]
- Scaled by: [[StandardScaler]], [[MinMaxScaler]]
- Part of: [[Feature Engineering]]

## Gaps and Open Questions

> [!gap] Robust detection of skew and automatic transform selection (Box-Cox, Yeo-Johnson) is out of scope for Chapter 4 of [[Introduction to Machine Learning with Python (Muller & Guido)]]; the chapter applies `log(x+1)` by inspection.

## Sources

- [[Introduction to Machine Learning with Python (Muller & Guido)]] — Chapter 4 frames the continuous-vs-categorical distinction and uses continuous features throughout the binning, polynomial, and log-transform demonstrations.
