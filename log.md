---
type: meta
title: "Wiki Log"
updated: 2026-04-17
---

# Wiki Log

> Chronological record of wiki operations. **New entries go at the top.**
> Never edit past entries.
> Format: `## [YYYY-MM-DD] operation | Title`

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
