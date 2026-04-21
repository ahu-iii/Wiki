---
type: entity
title: "scikit-learn"
created: 2026-04-21
updated: 2026-04-21
tags:
  - type/entity
  - domain/machine-learning
  - domain/python
entity_type: library
role: "Python machine-learning library providing the fit/transform/predict API taught throughout the book"
affiliation: ""
aliases: ["sklearn"]
status: developing
related:
  - "[[Data Preprocessing]]"
  - "[[Unsupervised Learning]]"
  - "[[Principal Component Analysis]]"
  - "[[k-Means Clustering]]"
  - "[[DBSCAN]]"
  - "[[Introduction to Machine Learning with Python (Muller & Guido)]]"
sources:
  - "[[Introduction to Machine Learning with Python (Muller & Guido)]]"
---

# scikit-learn

> scikit-learn is the Python machine-learning library whose API *Introduction to Machine Learning with Python* teaches — every algorithm in Chapter 3, from [[StandardScaler]] to [[DBSCAN]], is demonstrated through scikit-learn's `fit` / `transform` / `fit_transform` / `fit_predict` conventions ([[Introduction to Machine Learning with Python (Muller & Guido)]]). One of the book's authors, [[Andreas C. Müller]], is a scikit-learn core contributor, which makes Chapter 3 effectively a tour of the library from one of its maintainers.

## Key Facts

- Exposes a uniform estimator API: preprocessors and decomposers implement `fit` / `transform` / `fit_transform`; clusterers implement `fit` / `fit_predict` ([[Introduction to Machine Learning with Python (Muller & Guido)]]).
- Ships the preprocessing scalers [[StandardScaler]], [[MinMaxScaler]], [[RobustScaler]], and [[Normalizer]] used in the chapter's feature-scaling section ([[Introduction to Machine Learning with Python (Muller & Guido)]]).
- Ships dimensionality-reduction methods [[Principal Component Analysis]] (with `whiten=True` option), [[Non-Negative Matrix Factorization]], and [[t-SNE]] (`TSNE`) — the last of which has no `transform` method, only `fit_transform` ([[Introduction to Machine Learning with Python (Muller & Guido)]]).
- Ships the clustering algorithms [[k-Means Clustering]] (`KMeans`), [[Agglomerative Clustering]] (`AgglomerativeClustering`), and [[DBSCAN]] ([[Introduction to Machine Learning with Python (Muller & Guido)]]).
- Ships evaluation metrics [[Adjusted Rand Index]] (`adjusted_rand_score`) and [[Silhouette Coefficient]] (`silhouette_score`) ([[Introduction to Machine Learning with Python (Muller & Guido)]]).
- Bundles the [[Breast Cancer Dataset]], [[Labeled Faces in the Wild]] (`fetch_lfw_people`), [[Digits Dataset]] (`load_digits`), and [[Iris Dataset]] used in the chapter's worked examples ([[Introduction to Machine Learning with Python (Muller & Guido)]]).
- Does **not** provide a built-in dendrogram plotting function; the book falls back to [[SciPy]]'s `scipy.cluster.hierarchy` for that ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Connections

- Taught by: [[Introduction to Machine Learning with Python (Muller & Guido)]].
- Maintained by (among others): [[Andreas C. Müller]].
- Complemented by: [[SciPy]] (for [[Dendrogram]] plotting).
- Covers topics: [[Data Preprocessing]], [[Unsupervised Learning]].

## See Also

- [[SciPy]]
- [[Data Preprocessing]]
- [[Unsupervised Learning]]

## Sources

- [[Introduction to Machine Learning with Python (Muller & Guido)]] — API, covered algorithms, and bundled datasets as described throughout Chapter 3.
