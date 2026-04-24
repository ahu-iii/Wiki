---
type: meta
title: "Wiki Log"
updated: 2026-04-22
---

# Wiki Log

> Chronological record of wiki operations. **New entries go at the top.**
> Never edit past entries.
> Format: `## [YYYY-MM-DD] operation | Title`

## [2026-04-24] lint | 5 findings (3 HIGH, 0 MEDIUM, 2 LOW)
- Report: [[lint-report-2026-04-24]]
- Scanned: 76 wiki pages + 4 root meta files (index, hot, overview, log)
- HIGH findings:
  - `[source-status]` `raw/manifest.yaml` missing entry for the Müller & Guido book — 44 wiki pages depend on an untracked source
  - `[missing-sources-footer]` 27 pages without a literal `## Sources` heading — 13 use the `## Evidence and Sources` variant, 14 omit the footer entirely (all legacy from the 2026-04-17 Transformer ingest)
  - `[dead-links]` `[[ByteNet]]` in [[Transformer]] — no destination page
- LOW findings: 3 `.md`-suffixed wikilinks in log.md (`[[index.md]]`, `[[hot.md]]`, `[[overview.md]]`); 5 empty content-page section bodies (topic pages' `## Current Understanding`)
- Clean: orphans 0, contradictions 0, supersessions 0, index-drift 0, stale-meta 0 (hot/overview 2 days old)
- Trust report refreshed as side-effect: 0 low, 48 medium, 25 high (no page dropped into the `low` tier)
- Coverage suggestions: 5 questions (representation-learning bridge, Transformer lineage, NMT comparison numbers, Müller & Guido Ch. 1–2 supervised learning, Ch. 5–6 pipelines/evaluation) + 3 source types (Hinton-Salakhutdinov 2006 autoencoder bridge, Bahdanau 2014 + Sutskever 2014 Transformer predecessors, Müller & Guido remaining chapters)

## [2026-04-22] ingest | Introduction to Machine Learning with Python (Chapter 4 — Representing Data and Engineering Features)
- Source: `raw/books/Introduction_to_Machine_Learning_with_Python_Chapter_4.md` (pre-extracted markdown, 1234 lines)
- Summary: [[Introduction to Machine Learning with Python (Muller & Guido)]] (extended; Chapter 3 ingested 2026-04-21)
- Created (18 pages):
  - Topics: [[Feature Engineering]], [[Feature Selection]]
  - Concepts: [[Categorical Variable]], [[Continuous Feature]], [[One-Hot Encoding]], [[Binning]], [[Interaction Feature]], [[Polynomial Features]], [[Polynomial Regression]], [[Univariate Nonlinear Transformation]], [[Univariate Feature Selection]], [[Model-Based Feature Selection]], [[Recursive Feature Elimination]]
  - Entities: [[Adult Dataset]], [[Boston Housing Dataset]], [[Citi Bike Dataset]], [[Wave Dataset]], [[pandas]]
- Updated (8 pages): [[Introduction to Machine Learning with Python (Muller & Guido)]] (Chapter 4 key claims, entities, split concepts), [[Data Preprocessing]] (Adjacent: feature engineering pointer, scaling-vs-one-hot open question answered), [[scikit-learn]] (`OneHotEncoder`, `PolynomialFeatures`, `KBinsDiscretizer`, `sklearn.feature_selection` family), [[Andreas C. Müller]] (Chapter-4 coverage note), [[MinMaxScaler]] (backlink retrofit to [[One-Hot Encoding]]), [[index.md]], [[overview.md]], [[hot.md]]
- Backlink audit: grep for "categorical", "one-hot", "polynomial features", "feature selection", "feature engineering", "binning", "pandas", "boston", "adult", "citi bike", "wave dataset" across pre-existing pages. One retrofit needed ([[MinMaxScaler]] gap callout). "one-hot" in [[Vector Quantization]] refers to k-means assignment, not categorical encoding — left as-is. "one-hot" in [[Label Smoothing]] refers to the training target distribution — left as-is.
- Supersessions / contradictions: none. Chapter 4 is strictly additive to Chapter 3.
- Key insight: the feature representation often matters more than the algorithm. On [[Citi Bike Dataset]], raw POSIX time gives R² = −0.03 (worse than the mean); mechanical decomposition into hour-of-day × day-of-week one-hot + interactions reaches R² = 0.85 with the same linear model. On [[Boston Housing Dataset]], `PolynomialFeatures(degree=2)` lifts Ridge R² from 0.621 to 0.753 while *dropping* random-forest R² from 0.799 to 0.763 — explicit interactions help linear models and hurt tree ensembles, a clean illustration of model-aware feature engineering.

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
