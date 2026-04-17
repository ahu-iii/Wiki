---
type: meta
title: "Research Overview"
updated: 2026-04-17
status: seed
---

# Research Overview

> Living synthesis dashboard. Updated as the wiki grows.
> This is the big-picture view of everything the wiki knows.

## Current Research Landscape

The wiki currently covers a single but foundational area: **attention-based [[Neural Machine Translation]]**, anchored by [[Attention Is All You Need]] (Vaswani et al., NIPS 2017). The core architectural concept is the [[Transformer]], built from [[Self-Attention]], [[Multi-Head Attention]], [[Scaled Dot-Product Attention]], and [[Positional Encoding]] on top of an [[Encoder-Decoder Architecture]].

## Key Themes

- **Attention replaces recurrence**: sequence transduction can be done with attention alone, with full parallelism and O(1) path length between positions.
- **Parallelism at training time, auto-regression at inference**: the asymmetry between training and generation persists even after removing RNNs.
- **Subword tokenization and [[BLEU Score]]** as the de facto tooling for [[Neural Machine Translation]] benchmarks.

## Strongest Claims

- Attention alone is sufficient for state-of-the-art sequence transduction (1 source: [[Attention Is All You Need]]).
- Scaling dot-product attention by 1/√d_k stabilizes training for large key dimensions (1 source).

## Active Contradictions

*None yet. Contradictions will emerge once we have multiple sources making overlapping claims.*

## Biggest Gaps

- Only one primary source has been ingested — all claims are single-source.
- Concept pages for [[Residual Connection]], [[Layer Normalization]], [[Byte-Pair Encoding]], [[Label Smoothing]], [[Beam Search]], and [[BLEU Score]] are seed-level; their originating papers have not been ingested.
- No post-2017 work is represented (BERT, GPT family, ViT, scaling laws, long-context attention variants).
- No predecessor work is represented (Bahdanau 2014 attention, Sutskever 2014 seq2seq, ResNet 2016, LayerNorm 2016).

## Suggested Next Sources

- **Bahdanau, Cho, Bengio (2014)**, "Neural machine translation by jointly learning to align and translate" — foundational attention in NMT.
- **Sutskever, Vinyals, Le (2014)**, "Sequence to sequence learning with neural networks" — the original seq2seq paper.
- **Devlin et al. (2018)**, "BERT" — first massive encoder-only Transformer.
- **Radford et al. (2018, 2019)**, GPT / GPT-2 — first massive decoder-only Transformer.
- **Dosovitskiy et al. (2020)**, "An Image is Worth 16x16 Words" (ViT) — Transformer for vision.
- **Kaplan et al. (2020)** / **Hoffmann et al. (2022)**, scaling laws / Chinchilla — quantitative theory of Transformer scaling.
