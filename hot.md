---
type: meta
title: "Hot Cache"
updated: 2026-04-21
---

# Recent Context

## Last Updated
2026-04-21 — Ingested pages 145–223 of [[Introduction to Machine Learning with Python (Muller & Guido)]] (Müller & Guido, O'Reilly 2016) via MinerU. 26 new wiki pages created.

## Key Recent Facts

- **Excerpt scope**: Chapter 3 (Unsupervised Learning and Preprocessing) and the opening of Chapter 4 (Representing Data and Engineering Features). Covers scaling → PCA/NMF/t-SNE → k-Means/Agglomerative/DBSCAN → ARI/Silhouette.
- **Fit-on-train-only rule** (core preprocessing discipline): scalers must be `fit` on training data only and `transform` applied to both train and test with the same parameters. Refitting on test data leaks distribution information and invalidates comparison.
- **Scaling flips SVC accuracy**: on the breast-cancer dataset an RBF SVC jumps from 0.63 to 0.97 test accuracy after [[StandardScaler]] — a canonical demonstration that distance-based models require per-feature scaling.
- **[[MinMaxScaler]] on test data is not bounded to [0, 1]**: values outside the training min/max map outside [0, 1]. This is the intended behavior, not a bug.
- **[[Principal Component Analysis]] whitening** produces unit-variance, decorrelated components; eigenfaces on [[Labeled Faces in the Wild]] illustrate both compression and the "[[Non-Negative Matrix Factorization]] gives more interpretable parts" comparison.
- **[[t-SNE]] is visualization-only**: it has no `transform` method (only `fit_transform`) and does not preserve global distances — useful for inspection, not for downstream pipelines.
- **[[k-Means Clustering]] doubles as [[Vector Quantization]]**: the k centroids are a codebook and each point is represented by its nearest centroid's index.
- **[[DBSCAN]] discovers clusters of arbitrary shape** and marks outliers as noise (label -1) — it does not require the number of clusters upfront, but is sensitive to `eps` and `min_samples`.
- **[[Adjusted Rand Index]] vs [[Silhouette Coefficient]]**: ARI needs ground truth and is chance-corrected; silhouette uses only the data and is biased toward convex clusters (favors k-Means over DBSCAN even when DBSCAN is qualitatively better).

## Recent Changes

- Phase A: MinerU produced `raw/books/2026-04-21-intro-ml-python-pp145-223.extracted.md` (140 KB) plus 187 figures in `_attachments/intro-ml-python-pp145-223/`.
- Phase B: 26 wiki pages created — 1 source, 2 topics ([[Unsupervised Learning]], [[Data Preprocessing]]), 14 concepts, 9 entities.
- Backlink audit: zero retrofits needed — the classical-ML material is fully orthogonal to the pre-existing Transformer/NMT graph. No [!contradiction] or [!superseded] callouts introduced.
- Updated index.md, log.md, overview.md.

## Active Threads

- Wiki now covers two disjoint domains: **deep-learning / Transformers** (from Vaswani 2017) and **classical ML / unsupervised learning** (from Müller & Guido 2016). Natural bridges would be an autoencoder source or a representation-learning survey.
- Several entity pages carry `[!gap]` callouts (Guido bio, O'Reilly beyond publisher role, SciPy scope, Digits/Iris exact dimensions) — future ingests touching these should promote from gap to cited claim.
- Müller/Guido chapter 3–4 coverage is from pp. 145–223 only. Pages 1–144 (supervised learning) and 224+ (text, pipelines, model evaluation) remain un-ingested and are a natural next step for extending this source.
