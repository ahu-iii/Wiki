---
type: entity
title: "Citi Bike Dataset"
created: 2026-04-22
updated: 2026-04-22
tags:
  - type/entity
  - domain/machine-learning
  - source/data
entity_type: "dataset"
role: "case study"
affiliation: "Citi Bike NYC"
status: developing
related:
  - "[[Feature Engineering]]"
  - "[[One-Hot Encoding]]"
  - "[[Interaction Feature]]"
sources:
  - "[[Introduction to Machine Learning with Python (Muller & Guido)]]"
---

# Citi Bike Dataset

> The **Citi Bike dataset** records public-bicycle rentals from New York City's Citi Bike subscription service. In Chapter 4 of [[Introduction to Machine Learning with Python (Muller & Guido)]], an August 2015 excerpt aggregated into 3-hour buckets anchors the chapter's **expert-knowledge feature engineering** case study — showing how raw timestamps become useful only after decomposition.

## Key Contributions

- August 2015 excerpt aggregated into 3-hour buckets by station; task is to predict rentals per bucket.
- Headline benchmark in the chapter:
  - **Raw POSIX time** fed to a linear model: R² = **−0.03** (worse than predicting the mean) ([[Introduction to Machine Learning with Python (Muller & Guido)]]).
  - Decompose into `hour_of_day` + `day_of_week` (integer-encoded), fit linear model: R² ≈ **0.13**.
  - One-hot encode `hour_of_day` and `day_of_week`: R² improves further.
  - Add `hour × day` [[Interaction Feature|interactions]]: R² = **0.85** ([[Introduction to Machine Learning with Python (Muller & Guido)]]).
- Lesson: raw features are rarely the right features; mechanical decomposition + one-hot + interactions can close most of the gap to a tree ensemble.

## Connections

- Demonstrates: [[Feature Engineering]], [[One-Hot Encoding]], [[Interaction Feature]]
- Uses: [[pandas]] for timestamp parsing
- Sibling dataset pages: [[Adult Dataset]], [[Boston Housing Dataset]], [[Wave Dataset]]

## Timeline

- 2013 — Citi Bike launches in NYC as a public bikeshare system.
- 2015 — August rental data used by Müller & Guido as the chapter's case study.

## See Also

- [[Feature Engineering]] — topic page quoting the R² 0.85 headline.
- [[Interaction Feature]] — Citi Bike is the chapter's flagship interaction demonstration.

## Sources

- [[Introduction to Machine Learning with Python (Muller & Guido)]] — Chapter 4 walks through the Citi Bike dataset from raw POSIX time to the hour × day one-hot + interaction representation and reports the R² progression from −0.03 to 0.85.
