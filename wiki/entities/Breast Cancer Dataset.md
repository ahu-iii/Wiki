---
type: entity
title: "Breast Cancer Dataset"
created: 2026-04-21
updated: 2026-04-21
tags:
  - type/entity
  - domain/machine-learning
  - domain/healthcare
entity_type: dataset
role: "Tabular binary-classification benchmark used to demonstrate feature scaling and PCA"
affiliation: ""
aliases: ["Wisconsin Breast Cancer Dataset"]
status: developing
related:
  - "[[StandardScaler]]"
  - "[[Principal Component Analysis]]"
  - "[[Data Preprocessing]]"
  - "[[scikit-learn]]"
  - "[[Introduction to Machine Learning with Python (Muller & Guido)]]"
sources:
  - "[[Introduction to Machine Learning with Python (Muller & Guido)]]"
---

# Breast Cancer Dataset

> The Breast Cancer dataset is the tabular, binary-classification benchmark shipped with [[scikit-learn]] that the book uses to motivate [[Data Preprocessing]] and to demonstrate [[Principal Component Analysis]] on non-image data ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Key Facts

- 569 data points, each represented by 30 numerical measurements (features) ([[Introduction to Machine Learning with Python (Muller & Guido)]]).
- The book's `train_test_split` (with `random_state=1`) produces 426 training samples and 143 test samples ([[Introduction to Machine Learning with Python (Muller & Guido)]]).
- Loaded via `sklearn.datasets.load_breast_cancer` ([[Introduction to Machine Learning with Python (Muller & Guido)]]).
- Binary target: malignant (`target == 0`) versus benign (`target == 1`) ([[Introduction to Machine Learning with Python (Muller & Guido)]]).
- Headline scaling result: applying [[StandardScaler]] before an RBF-kernel `SVC(C=100)` raises test accuracy from **0.63 to 0.97** ([[Introduction to Machine Learning with Python (Muller & Guido)]]).
- Used to demonstrate [[Principal Component Analysis]] on scaled data — projecting the 30 features to 2 principal components separates malignant from benign samples visually ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Connections

- Shipped by: [[scikit-learn]] (via `load_breast_cancer`).
- Demonstrates: [[StandardScaler]], [[Principal Component Analysis]], [[Data Preprocessing]] pipeline hygiene.

## See Also

- [[Data Preprocessing]]
- [[Principal Component Analysis]]

## Sources

- [[Introduction to Machine Learning with Python (Muller & Guido)]] — sample count, feature count, split sizes, and scaling-accuracy numbers.
