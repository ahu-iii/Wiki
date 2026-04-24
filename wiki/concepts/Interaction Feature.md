---
type: concept
title: "Interaction Feature"
created: 2026-04-22
updated: 2026-04-22
tags:
  - type/concept
  - domain/machine-learning
complexity: intermediate
domain: "feature engineering"
aliases:
  - "Feature Interaction"
  - "Cross Feature"
status: developing
related:
  - "[[Polynomial Features]]"
  - "[[Binning]]"
  - "[[Feature Engineering]]"
sources:
  - "[[Introduction to Machine Learning with Python (Muller & Guido)]]"
---

# Interaction Feature

> An **interaction feature** is a new column constructed by multiplying two or more existing features together. It lets a linear model represent effects that depend on combinations of inputs — something a plain `Σ wᵢ·xᵢ + b` cannot do on its own ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## How It Works

A linear model with inputs `x₁` and `x₂` predicts `ŷ = w₁·x₁ + w₂·x₂ + b`. The effect of `x₁` is the same no matter the value of `x₂`. Adding the product `x₁·x₂` as a new feature gives `ŷ = w₁·x₁ + w₂·x₂ + w₃·x₁·x₂ + b`, which lets the effective slope on `x₁` depend on `x₂`.

In scikit-learn, `PolynomialFeatures(degree=2, interaction_only=True, include_bias=False)` generates all pairwise products without the squared terms ([[scikit-learn]]). `PolynomialFeatures(degree=2, interaction_only=False)` adds the squares too — see [[Polynomial Features]] for that variant.

### The binning + interaction pattern

After [[Binning]] a continuous feature and [[One-Hot Encoding]] it, a linear model has one **intercept per bin** but still the same global slope. Multiplying each bin indicator by the original continuous `x` gives a **separate slope per bin** — a piecewise-linear fit. Adding both the bin indicators and the bin-×-x interaction gives independent intercepts *and* independent slopes per bucket, which on the [[Wave Dataset]] produces a fit indistinguishable from a well-tuned decision tree while staying interpretable as a linear model ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

### The Citi Bike example

On the [[Citi Bike Dataset]], raw POSIX time gave R² = −0.03 (worse than predicting the mean). Decomposing into `hour_of_day` and `day_of_week`, one-hot encoding both, *and* adding hour-×-day interactions lifted Ridge R² to 0.85 — the single largest gain in the chapter comes from interaction features on this dataset ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Key Properties

- Adds capacity without changing the model class — a linear model stays linear in its parameters.
- Feature count grows combinatorially with interaction order; `interaction_only=True` at degree `d` over `n` features produces `C(n, d)` new features.
- Interpretability degrades as interaction order rises; pairwise interactions are usually the sweet spot.
- Tree ensembles already model interactions implicitly via nested splits, so explicit interaction features are mostly a linear-model intervention.

## Applications

- Linear models over binned continuous features — bin-×-x interactions give per-bin slopes ([[Introduction to Machine Learning with Python (Muller & Guido)]]).
- Time decomposition (hour, day, month) — interactions capture patterns like "Tuesday morning commute" that pure main effects cannot.
- Boston Housing regression — `PolynomialFeatures(degree=2)` over 13 scaled features yields 105 columns (13 originals + 13 squares + 78 pairwise interactions + 1 bias), lifting Ridge R² from 0.621 to 0.753 ([[Boston Housing Dataset]]).

## Connections

- Generalises to: [[Polynomial Features]]
- Pairs with: [[Binning]], [[One-Hot Encoding]]
- Part of: [[Feature Engineering]]
- Implemented by: [[scikit-learn]] (`PolynomialFeatures(interaction_only=True)`)

## Gaps and Open Questions

> [!gap] Automatic discovery of which interactions are worth adding (vs feature explosion) is not covered in [[Introduction to Machine Learning with Python (Muller & Guido)]] Chapter 4. Factorisation machines and gradient-boosted trees solve this implicitly; for linear models the chapter relies on expert judgement.

## Sources

- [[Introduction to Machine Learning with Python (Muller & Guido)]] — Chapter 4 builds interaction features on top of binned wave data and one-hot time features, demonstrating the per-bin-slope pattern and the Citi Bike R² 0.85 result.
