---
type: meta
title: "Wiki Log"
updated: 2026-04-21
---

# Wiki Log

> Chronological record of wiki operations. **New entries go at the top.**
> Never edit past entries.
> Format: `## [YYYY-MM-DD] operation | Title`

## [2026-04-21] ingest | Introduction to Machine Learning with Python (pp. 145–223)
- Source: `raw/books/Introduction to Machine Learning with Python A Guide for Data Scientists (Andreas C. Müller, Sarah Guido) (z-library.sk, 1lib.sk, z-lib.sk)-145-223.pdf`
- Extracted (MinerU VLM): `raw/books/2026-04-21-intro-ml-python-pp145-223.extracted.md` + 187 figures under `_attachments/intro-ml-python-pp145-223/`
- Summary: [[Introduction to Machine Learning with Python (Muller & Guido)]]
- Created (26 pages):
  - Source: [[Introduction to Machine Learning with Python (Muller & Guido)]]
  - Topics: [[Unsupervised Learning]], [[Data Preprocessing]]
  - Concepts: [[StandardScaler]], [[MinMaxScaler]], [[RobustScaler]], [[Normalizer]], [[Principal Component Analysis]], [[Non-Negative Matrix Factorization]], [[t-SNE]], [[k-Means Clustering]], [[Vector Quantization]], [[Agglomerative Clustering]], [[Dendrogram]], [[DBSCAN]], [[Adjusted Rand Index]], [[Silhouette Coefficient]]
  - Entities: [[Andreas C. Müller]], [[Sarah Guido]], [[O'Reilly Media]], [[scikit-learn]], [[SciPy]], [[Labeled Faces in the Wild]], [[Breast Cancer Dataset]], [[Digits Dataset]], [[Iris Dataset]]
- Updated: [[index.md]], [[hot.md]], [[overview.md]]
- Backlink audit: zero plain-text mentions of the 26 new titles in pre-existing Transformer-era pages. The classical-ML and deep-learning subgraphs are fully orthogonal; no `[!contradiction]` or `[!superseded]` callouts introduced.
- Uncertainty markers applied: `(?)` on Müller employer/education, Digits (1,797 samples), Iris (150/4/3); `[!gap]` on Guido bio, O'Reilly beyond publisher role, SciPy beyond `scipy.cluster.hierarchy`, and one per concept page for treatments absent from pp. 145–223.
- Key insight: classical ML preprocessing obeys a single discipline — **fit on train only, transform both** — and ignoring it flips SVC accuracy on breast-cancer from 0.63 → 0.97. Clustering choice matters more than cluster count: k-Means assumes convex equal-size blobs, DBSCAN finds arbitrary shapes but needs density tuning, and evaluation metrics (ARI vs silhouette) can disagree on which is better.

## [2026-04-17] ingest | Attention Is All You Need
- Source: `raw/papers/attention-is-all-you-need-Paper.pdf`
- Summary: [[Attention Is All You Need]]
- Created (23 pages):
  - Source: [[Attention Is All You Need]]
  - Topics: [[Neural Machine Translation]], [[Sequence Transduction]]
  - Concepts: [[Transformer]], [[Self-Attention]], [[Scaled Dot-Product Attention]], [[Multi-Head Attention]], [[Attention Mechanism]], [[Positional Encoding]], [[Encoder-Decoder Architecture]], [[Residual Connection]], [[Layer Normalization]], [[Beam Search]], [[Label Smoothing]], [[Byte-Pair Encoding]], [[BLEU Score]]
  - Entities: [[Ashish Vaswani]], [[Noam Shazeer]], [[Niki Parmar]], [[Jakob Uszkoreit]], [[Llion Jones]], [[Aidan N. Gomez]], [[Łukasz Kaiser]], [[Illia Polosukhin]], [[Google Brain]], [[Google Research]], [[University of Toronto]], [[tensor2tensor]], [[WMT 2014]]
- Updated: [[index.md]], [[hot.md]], [[overview.md]]
- Key insight: The Transformer shows that sequence transduction can be done with attention alone — O(1) path length, full parallelism within a layer, and new SOTA BLEU on WMT 2014 EN-DE (28.4) and EN-FR (41.0) at a fraction of prior training cost.

## [2026-04-16] init | Wiki Created
- Vault scaffolded with research wiki structure
- Directories: raw/, wiki/, _templates/, _attachments/
- Schema: CLAUDE.md with ingest/query/lint workflows
- Templates: Source, Entity, Concept, Topic, Comparison, Question, Synthesis
- Ready for first source ingest
