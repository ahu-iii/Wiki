---
type: topic
title: "Neural Machine Translation"
created: 2026-04-17
updated: 2026-04-17
tags:
  - type/topic
  - domain/natural-language-processing
  - domain/machine-learning
scope: "Training neural networks to translate text from one natural language to another."
key_concepts:
  - "[[Transformer]]"
  - "[[Attention Mechanism]]"
  - "[[Encoder-Decoder Architecture]]"
  - "[[BLEU Score]]"
  - "[[Byte-Pair Encoding]]"
status: developing
related:
  - "[[Sequence Transduction]]"
sources:
  - "[[Attention Is All You Need]]"
---

# Neural Machine Translation

Neural Machine Translation (NMT) trains neural networks — typically [[Encoder-Decoder Architecture|encoder-decoder]] models — to translate text from a source language to a target language. It replaced phrase-based statistical MT as the dominant paradigm in the mid-2010s.

## Key Concepts

- [[Transformer]] — the current dominant NMT architecture.
- [[Attention Mechanism]] — originally bolted on to RNN encoders (Bahdanau et al., 2014), then made the whole model in the Transformer.
- [[Self-Attention]] — lets decoders and encoders relate positions without recurrence.
- [[Multi-Head Attention]] — the specific attention implementation used in the Transformer.
- [[Positional Encoding]] — supplies token-order information to attention-only models.
- [[Encoder-Decoder Architecture]] — the structural paradigm shared across RNN, CNN, and Transformer NMT systems.
- [[BLEU Score]] — the standard automatic evaluation metric.
- [[Byte-Pair Encoding]] — subword tokenization used to handle rare words.
- [[Beam Search]] — standard decoding strategy.
- [[Label Smoothing]] — a regularization technique shown to help NMT.

## Key Entities

- [[Google Brain]], [[Google Research]] — produced the [[Transformer]] and preceding GNMT work.
- [[tensor2tensor]] — open-source framework in which the Transformer results were produced.
- [[WMT 2014]] — the benchmark suite (EN-DE, EN-FR) used to establish state-of-the-art claims.

## Current Understanding

- RNN-based seq2seq models with attention (GNMT) dominated NMT until 2017.
- Convolutional alternatives (ConvS2S, ByteNet) improved parallelism but kept path lengths at O(log n) or O(n/k).
- The [[Transformer]] (Vaswani et al., 2017) replaced recurrence and convolution entirely with attention, achieving new state-of-the-art BLEU (28.4 EN-DE, 41.0 EN-FR on WMT 2014 newstest2014) at a fraction of prior training cost.
- Since then, Transformer variants dominate NMT and most other NLP tasks.

## Open Questions

- How well does attention-only translation scale to very long documents, given O(n²) complexity?
- Can decoding be made less sequential while preserving quality?
- Which architectural choices (head count, key dimension, positional encoding) are fundamental vs. incidental?

## Sources

- [[Attention Is All You Need]] — introduces the [[Transformer]] and sets new SOTA on WMT 2014 EN-DE and EN-FR.
