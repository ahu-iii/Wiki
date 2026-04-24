---
type: meta
title: "Wiki Index"
updated: 2026-04-22
---

# Wiki Index

> Master catalog of all wiki pages. The LLM reads this to find relevant pages.
> Updated after every ingest operation.

## Topics

- [[Neural Machine Translation]] — training neural networks to translate between languages (1 source)
- [[Sequence Transduction]] — mapping one variable-length sequence to another (1 source)
- [[Unsupervised Learning]] — extracting structure from unlabeled data: dimensionality reduction, manifold visualization, clustering (1 source)
- [[Data Preprocessing]] — feature scaling and transformation before learning (1 source)
- [[Feature Engineering]] — categorical encoding, binning, interactions, polynomials, nonlinear transforms, expert-knowledge features (1 source)
- [[Feature Selection]] — univariate, model-based, and iterative methods for pruning feature sets (1 source)

## Concepts

### Machine learning / deep learning

- [[Transformer]] — attention-only encoder-decoder sequence model (Vaswani et al., 2017)
- [[Self-Attention]] — intra-sequence attention relating all positions to each other
- [[Scaled Dot-Product Attention]] — softmax(QK^T/√d_k)V, the Transformer's attention function
- [[Multi-Head Attention]] — h parallel attention heads on projected Q, K, V
- [[Attention Mechanism]] — general query/key/value formulation
- [[Positional Encoding]] — sinusoidal position signal added to input embeddings
- [[Encoder-Decoder Architecture]] — the seq2seq structural skeleton
- [[Residual Connection]] — skip connection around each sub-layer
- [[Layer Normalization]] — per-example, per-layer feature normalization
- [[Beam Search]] — approximate decoding keeping top-k hypotheses
- [[Label Smoothing]] — regularization using softened target distributions
- [[Byte-Pair Encoding]] — subword tokenization by merging frequent pairs
- [[BLEU Score]] — n-gram-based machine translation metric

### Preprocessing and scaling

- [[StandardScaler]] — zero-mean, unit-variance per feature
- [[MinMaxScaler]] — affine rescale to [0, 1] per feature
- [[RobustScaler]] — median-and-IQR scaling, outlier-resistant
- [[Normalizer]] — per-sample vector rescaling to unit norm

### Dimensionality reduction and manifold learning

- [[Principal Component Analysis]] (PCA) — orthogonal projection onto directions of maximum variance
- [[Non-Negative Matrix Factorization]] (NMF) — additive parts-based decomposition with non-negative components
- [[t-SNE]] — neighborhood-preserving 2D embedding for visualization

### Clustering

- [[k-Means Clustering]] — partition into k centroid-defined clusters
- [[Vector Quantization]] — representing data points by their nearest codebook entry
- [[Agglomerative Clustering]] — bottom-up hierarchical merging
- [[Dendrogram]] — tree diagram of hierarchical merge sequence
- [[DBSCAN]] — density-based clustering discovering clusters of arbitrary shape

### Cluster evaluation

- [[Adjusted Rand Index]] (ARI) — chance-corrected similarity of two clusterings
- [[Silhouette Coefficient]] — compactness-vs-separation score without ground truth

### Feature engineering

- [[Categorical Variable]] — fixed-set-valued feature; requires encoding for linear models
- [[Continuous Feature]] — real-valued feature where arithmetic is meaningful
- [[One-Hot Encoding]] — one binary column per category; standard encoding for linear models
- [[Binning]] — discretising a continuous feature into buckets; piecewise-constant linear fits
- [[Interaction Feature]] — pairwise products; enables linear models to express combinations
- [[Polynomial Features]] — monomials up to degree d via `sklearn.preprocessing.PolynomialFeatures`
- [[Polynomial Regression]] — linear regression on polynomially-expanded inputs
- [[Univariate Nonlinear Transformation]] — `log`, `sqrt`, `sin/cos` per-feature transforms for skewed data

### Feature selection

- [[Univariate Feature Selection]] — `SelectKBest`/`SelectPercentile` with F-test scoring
- [[Model-Based Feature Selection]] — `SelectFromModel` using tree or L1-linear importances
- [[Recursive Feature Elimination]] — iterative drop-and-refit (`RFE`, `RFECV`)

## Entities

### People

- [[Ashish Vaswani]] — first author of Attention Is All You Need (Google Brain)
- [[Noam Shazeer]] — proposed scaled dot-product and multi-head attention (Google Brain)
- [[Niki Parmar]] — model-variant design and tuning in tensor2tensor (Google Research)
- [[Jakob Uszkoreit]] — proposed replacing RNNs with self-attention (Google Research)
- [[Llion Jones]] — initial codebase, efficient inference, visualizations (Google Research)
- [[Aidan N. Gomez]] — tensor2tensor co-author (University of Toronto / Google Brain)
- [[Łukasz Kaiser]] — tensor2tensor co-author (Google Brain)
- [[Illia Polosukhin]] — first Transformer implementations (Google Research)
- [[Andreas C. Müller]] — scikit-learn core developer; co-author of Introduction to Machine Learning with Python
- [[Sarah Guido]] — co-author of Introduction to Machine Learning with Python

### Organizations

- [[Google Brain]] — deep-learning research team at Google; host of the Transformer project
- [[Google Research]] — Google's broader research division
- [[University of Toronto]] — academic affiliation of Aidan N. Gomez at the time of the paper
- [[O'Reilly Media]] — publisher of Introduction to Machine Learning with Python

### Tools and Products

- [[tensor2tensor]] — open-source framework used to train the Transformer
- [[scikit-learn]] — Python machine-learning library; reference implementation for classical-ML concepts on this wiki
- [[SciPy]] — scientific computing library; source of `scipy.cluster.hierarchy` used for dendrograms
- [[pandas]] — DataFrame library; categorical encoding, CSV loading, datetime decomposition

### Datasets

- [[WMT 2014]] — English-German and English-French machine translation benchmark
- [[Labeled Faces in the Wild]] — face image dataset used for PCA/NMF/k-Means demonstrations
- [[Breast Cancer Dataset]] — scikit-learn binary classification dataset; common scaling demonstration
- [[Digits Dataset]] — scikit-learn handwritten-digit dataset; common t-SNE / clustering demonstration
- [[Iris Dataset]] — Fisher's iris measurements; classical multi-class benchmark
- [[Adult Dataset]] — 1994 US Census extract; canonical categorical-encoding demonstration
- [[Boston Housing Dataset]] — 506×13 regression benchmark; polynomial-features demonstration
- [[Citi Bike Dataset]] — August 2015 NYC rentals; expert-knowledge feature-engineering case study
- [[Wave Dataset]] — synthetic 1-D regression from `mglearn`; binning / polynomial demos

## Sources

### Most recent

- [[Introduction to Machine Learning with Python (Muller & Guido)]] — Müller & Guido, O'Reilly 2016; Chapter 3 (pp. 145–223, unsupervised learning and preprocessing) ingested 2026-04-21; Chapter 4 (feature engineering and feature selection) ingested 2026-04-22
- [[Attention Is All You Need]] — Vaswani et al., NIPS 2017; introduces the [[Transformer]] (ingested 2026-04-17)

## Comparisons

*No comparisons yet.*

## Questions

*No questions filed yet.*

## Synthesis

*No synthesis pages yet.*
