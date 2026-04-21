---
type: meta
title: "Research Overview"
updated: 2026-04-21
status: seed
---

# Research Overview

> Living synthesis dashboard. Updated as the wiki grows.
> This is the big-picture view of everything the wiki knows.

## Current Research Landscape

The wiki now covers two disjoint subgraphs:

1. **Attention-based [[Neural Machine Translation]]** — anchored by [[Attention Is All You Need]] (Vaswani et al., NIPS 2017). The core architectural concept is the [[Transformer]], built from [[Self-Attention]], [[Multi-Head Attention]], [[Scaled Dot-Product Attention]], and [[Positional Encoding]] on top of an [[Encoder-Decoder Architecture]].
2. **Classical ML — [[Unsupervised Learning]] and [[Data Preprocessing]]** — anchored by [[Introduction to Machine Learning with Python (Muller & Guido)]] (Müller & Guido, O'Reilly 2016), pp. 145–223. Covers per-feature scaling ([[StandardScaler]], [[MinMaxScaler]], [[RobustScaler]], [[Normalizer]]); dimensionality reduction and manifold learning ([[Principal Component Analysis]], [[Non-Negative Matrix Factorization]], [[t-SNE]]); clustering ([[k-Means Clustering]], [[Agglomerative Clustering]], [[DBSCAN]]) with evaluation via [[Adjusted Rand Index]] and [[Silhouette Coefficient]].

The two subgraphs share no edges yet. A representation-learning or autoencoder source would be the natural bridge.

## Key Themes

- **Attention replaces recurrence**: sequence transduction can be done with attention alone, with full parallelism and O(1) path length between positions.
- **Parallelism at training time, auto-regression at inference**: the asymmetry between training and generation persists even after removing RNNs.
- **Subword tokenization and [[BLEU Score]]** as the de facto tooling for [[Neural Machine Translation]] benchmarks.
- **Fit on train only, transform both**: the single preprocessing discipline that governs every classical-ML pipeline — violating it silently leaks distribution information and inflates test accuracy.
- **Distance-based models demand scaling**: [[StandardScaler]] flips RBF SVC accuracy on breast-cancer from 0.63 to 0.97; similar gains appear for any algorithm that depends on Euclidean distance or variance.
- **Clustering algorithm choice encodes geometric assumptions**: [[k-Means Clustering]] assumes convex equal-size blobs; [[Agglomerative Clustering]] produces a full hierarchy; [[DBSCAN]] finds arbitrary shapes and surfaces outliers. No algorithm is universally "best".
- **Evaluation metrics can disagree**: [[Silhouette Coefficient]] favors convex clusters even when [[DBSCAN]]'s shape-flexible result is qualitatively better; ground-truth-based [[Adjusted Rand Index]] is chance-corrected but requires labels.

## Strongest Claims

- Attention alone is sufficient for state-of-the-art sequence transduction (1 source: [[Attention Is All You Need]]).
- Scaling dot-product attention by 1/√d_k stabilizes training for large key dimensions (1 source).
- Per-feature scaling is a prerequisite for distance-based classifiers on heterogeneous features (1 source: [[Introduction to Machine Learning with Python (Muller & Guido)]]).
- [[Principal Component Analysis]] on centered data is equivalent to SVD of the data matrix and produces variance-ordered orthogonal components (1 source).

## Active Contradictions

*None yet. The two subgraphs are orthogonal and share no overlapping claims.*

## Biggest Gaps

- Only two primary sources have been ingested — all claims are single-source.
- Transformer concept pages for [[Residual Connection]], [[Layer Normalization]], [[Byte-Pair Encoding]], [[Label Smoothing]], [[Beam Search]], and [[BLEU Score]] are seed-level; their originating papers have not been ingested.
- No post-2017 Transformer work is represented (BERT, GPT family, ViT, scaling laws, long-context attention variants).
- No Transformer predecessor work is represented (Bahdanau 2014 attention, Sutskever 2014 seq2seq, ResNet 2016, LayerNorm 2016).
- Classical-ML coverage is from one book excerpt (pp. 145–223) only; supervised learning (pp. 1–144) and text/pipelines/model-evaluation (pp. 224+) remain un-ingested.
- No bridge between classical ML and deep learning — no autoencoder, representation-learning, or self-supervised source yet.
- Several entity pages carry `[!gap]` callouts (Guido bio, O'Reilly role beyond publisher, SciPy scope beyond `scipy.cluster.hierarchy`, exact dimensions of Digits/Iris).

## Suggested Next Sources

### Deep learning / Transformer family
- **Bahdanau, Cho, Bengio (2014)**, "Neural machine translation by jointly learning to align and translate" — foundational attention in NMT.
- **Sutskever, Vinyals, Le (2014)**, "Sequence to sequence learning with neural networks" — the original seq2seq paper.
- **Devlin et al. (2018)**, "BERT" — first massive encoder-only Transformer.
- **Radford et al. (2018, 2019)**, GPT / GPT-2 — first massive decoder-only Transformer.
- **Dosovitskiy et al. (2020)**, "An Image is Worth 16x16 Words" (ViT) — Transformer for vision.
- **Kaplan et al. (2020)** / **Hoffmann et al. (2022)**, scaling laws / Chinchilla — quantitative theory of Transformer scaling.

### Classical ML (extending Müller & Guido)
- **Müller & Guido (2016), chapter 2** (pp. 1–144) — supervised learning; linear models, trees, ensembles, SVMs.
- **Müller & Guido (2016), chapters 4–7** (pp. 224+) — feature engineering, model evaluation, pipelines, text data.
- **Hastie, Tibshirani, Friedman (2009)**, "The Elements of Statistical Learning" — rigorous theoretical backbone for the classical-ML concepts introduced here.

### Bridge sources
- **Hinton & Salakhutdinov (2006)**, "Reducing the dimensionality of data with neural networks" — autoencoders as a bridge between [[Principal Component Analysis]] and deep representation learning.
- **van der Maaten & Hinton (2008)**, original t-SNE paper — deepen the seed [[t-SNE]] page and connect visualization techniques across both subgraphs.
