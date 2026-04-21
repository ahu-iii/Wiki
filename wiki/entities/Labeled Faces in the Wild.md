---
type: entity
title: "Labeled Faces in the Wild"
created: 2026-04-21
updated: 2026-04-21
tags:
  - type/entity
  - domain/machine-learning
  - domain/computer-vision
entity_type: dataset
role: "Face-image benchmark used for PCA eigenface extraction, NMF component extraction, and clustering"
affiliation: ""
aliases: ["LFW"]
status: developing
related:
  - "[[Principal Component Analysis]]"
  - "[[Non-Negative Matrix Factorization]]"
  - "[[k-Means Clustering]]"
  - "[[DBSCAN]]"
  - "[[Agglomerative Clustering]]"
  - "[[scikit-learn]]"
  - "[[Introduction to Machine Learning with Python (Muller & Guido)]]"
sources:
  - "[[Introduction to Machine Learning with Python (Muller & Guido)]]"
---

# Labeled Faces in the Wild

> Labeled Faces in the Wild (LFW) is a dataset of celebrity face images downloaded from the Internet — politicians, singers, actors, and athletes from the early 2000s — that the book uses as its running image example for [[Principal Component Analysis]], [[Non-Negative Matrix Factorization]], and clustering ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Key Facts

- After filtering with `min_faces_per_person=20` and `resize=0.7`, the book works with 3,023 grayscale images of size 87×65 pixels, spanning 62 different people ([[Introduction to Machine Learning with Python (Muller & Guido)]]).
- Loaded through [[scikit-learn]]'s `sklearn.datasets.fetch_lfw_people` helper ([[Introduction to Machine Learning with Python (Muller & Guido)]]).
- Used to demonstrate PCA **eigenfaces**: applying [[Principal Component Analysis]] with `n_components=100` and `whiten=True` to the pixel data raises 1-nearest-neighbor face-identification accuracy from 26.6% on raw pixels to 35.7% on the whitened PCA representation ([[Introduction to Machine Learning with Python (Muller & Guido)]]).
- Also used to illustrate [[Non-Negative Matrix Factorization]] component extraction on face images ([[Introduction to Machine Learning with Python (Muller & Guido)]]).
- Used again in the clustering chapter to compare [[k-Means Clustering]], [[Agglomerative Clustering]], and [[DBSCAN]] on the 100-component whitened PCA representation ([[Introduction to Machine Learning with Python (Muller & Guido)]]).

## Connections

- Shipped by: [[scikit-learn]] (via `fetch_lfw_people`).
- Demonstrates: [[Principal Component Analysis]], [[Non-Negative Matrix Factorization]], [[k-Means Clustering]], [[DBSCAN]], [[Agglomerative Clustering]].

## See Also

- [[Principal Component Analysis]]
- [[Non-Negative Matrix Factorization]]

## Sources

- [[Introduction to Machine Learning with Python (Muller & Guido)]] — primary source for filtering, dimensions, and accuracy numbers.
