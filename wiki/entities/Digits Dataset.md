---
type: entity
title: "Digits Dataset"
created: 2026-04-21
updated: 2026-04-21
tags:
  - type/entity
  - domain/machine-learning
  - domain/computer-vision
entity_type: dataset
role: "Low-resolution handwritten-digit image dataset used to compare PCA and t-SNE visualizations"
affiliation: ""
aliases: []
status: developing
related:
  - "[[t-SNE]]"
  - "[[Principal Component Analysis]]"
  - "[[scikit-learn]]"
  - "[[Introduction to Machine Learning with Python (Muller & Guido)]]"
sources:
  - "[[Introduction to Machine Learning with Python (Muller & Guido)]]"
---

# Digits Dataset

> The Digits dataset is the small handwritten-digit image dataset shipped with [[scikit-learn]] that the book uses to contrast [[Principal Component Analysis]] against [[t-SNE]] for 2D visualization ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Key Facts

- Low-resolution 8×8 grayscale images of handwritten digits 0–9 (treated as 64-dimensional feature vectors) ([[Introduction to Machine Learning with Python (Muller & Guido)]]).
- Loaded via `sklearn.datasets.load_digits` ([[Introduction to Machine Learning with Python (Muller & Guido)]]).
- Used to demonstrate that a 2-component [[Principal Component Analysis]] projection overlaps several digit classes, while [[t-SNE]] separates nearly all ten digit classes into clean clusters in the same 2D space ([[Introduction to Machine Learning with Python (Muller & Guido)]]).
- Demonstrates the limitation that [[t-SNE]] has no `transform` method — `fit_transform` must be used, and new digits cannot be embedded post-hoc ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

> [!gap]
> The excerpt does not explicitly state the total sample count; the standard scikit-learn Digits dataset contains 1,797 samples, but this figure is not verified from the extracted text. (?)

## Connections

- Shipped by: [[scikit-learn]] (via `load_digits`).
- Demonstrates: [[Principal Component Analysis]] vs. [[t-SNE]] for 2D visualization.

## See Also

- [[t-SNE]]
- [[Principal Component Analysis]]

## Sources

- [[Introduction to Machine Learning with Python (Muller & Guido)]] — loader, 8×8 pixel format, and PCA-vs-t-SNE visualization comparison.
