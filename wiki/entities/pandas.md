---
type: entity
title: "pandas"
created: 2026-04-22
updated: 2026-04-22
tags:
  - type/entity
  - domain/machine-learning
  - domain/data-engineering
entity_type: "tool"
role: "data manipulation library"
affiliation: "PyData ecosystem"
status: developing
related:
  - "[[One-Hot Encoding]]"
  - "[[scikit-learn]]"
  - "[[Feature Engineering]]"
sources:
  - "[[Introduction to Machine Learning with Python (Muller & Guido)]]"
---

# pandas

> **pandas** is the de-facto Python library for tabular data manipulation. Its `DataFrame` and `Series` types sit between raw CSV/SQL ingestion and the numeric matrices consumed by [[scikit-learn]]. In Chapter 4 of [[Introduction to Machine Learning with Python (Muller & Guido)]], pandas handles the categorical encoding, timestamp decomposition, and value-counting steps that make the feature-engineering workflows possible.

## Key Contributions

- `pd.read_csv` for loading the [[Adult Dataset]] with proper handling of missing-value markers ([[Introduction to Machine Learning with Python (Muller & Guido)]]).
- `pd.get_dummies(df)` as the lightweight path to [[One-Hot Encoding]] — applies to all string-typed columns automatically, leaves numeric columns alone.
- `df['col'].value_counts()` for inspecting categorical vocabularies before encoding.
- Datetime handling via `pd.to_datetime` + `.dt.hour`, `.dt.dayofweek` — used on the [[Citi Bike Dataset]] to decompose POSIX time into the features that lift linear-model R² from −0.03 to 0.85.
- Column alignment via `reindex(columns=...)` — the standard workaround for the train/test `get_dummies` pitfall.

## Connections

- Feeds into: [[scikit-learn]] (estimators accept DataFrames / convert to NumPy arrays)
- Complements: [[SciPy]], NumPy
- Used by: [[Feature Engineering]] (categorical encoding, time decomposition)

## Timeline

- 2008 — Wes McKinney starts pandas at AQR Capital.
- 2009 — Open-sourced.
- 2012+ — Becomes the dominant Python data-manipulation library.

## See Also

- [[One-Hot Encoding]] — `get_dummies` is pandas' canonical contribution.
- [[scikit-learn]] — downstream consumer of pandas DataFrames.

## Sources

- [[Introduction to Machine Learning with Python (Muller & Guido)]] — Chapter 4 uses pandas for dataset loading, `get_dummies` encoding on the Adult dataset, and datetime decomposition on the Citi Bike dataset.
