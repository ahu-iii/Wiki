---
type: topic
title: "Sequence Transduction"
created: 2026-04-17
updated: 2026-04-17
tags:
  - type/topic
  - domain/machine-learning
scope: "Models that map one variable-length sequence to another, such as translation, summarization, and speech recognition."
key_concepts:
  - "[[Encoder-Decoder Architecture]]"
  - "[[Transformer]]"
  - "[[Attention Mechanism]]"
  - "[[Self-Attention]]"
status: developing
related:
  - "[[Neural Machine Translation]]"
sources:
  - "[[Attention Is All You Need]]"
---

# Sequence Transduction

Sequence transduction is the task of mapping a variable-length input sequence to a variable-length output sequence, usually under an [[Encoder-Decoder Architecture]]. Canonical instances include [[Neural Machine Translation]], summarization, speech recognition, and code generation.

## Key Concepts

- [[Encoder-Decoder Architecture]] — the structural skeleton shared by almost all sequence transduction models.
- [[Attention Mechanism]] — connects encoder and decoder without being bound to sequential distance.
- [[Self-Attention]] — relates positions within a single sequence, useful on both encoder and decoder sides.
- [[Transformer]] — the first sequence transduction model that dispenses with recurrence and convolution entirely.
- [[Positional Encoding]] — compensates for the lack of inherent order in attention.

## Key Entities

- [[Google Brain]], [[Google Research]], [[University of Toronto]] — author affiliations behind the [[Transformer]].
- [[tensor2tensor]] — framework used to train many Google-originated sequence transduction models.

## Current Understanding

The field moved from RNN/LSTM encoder-decoders (Sutskever et al., 2014; Bahdanau et al., 2014), to convolutional alternatives (ConvS2S, ByteNet), to attention-only models (the [[Transformer]]). Self-attention layers provide:

- O(1) maximum path length between any two positions (vs. O(n) for RNN, O(log n) for stacked convolutions).
- Full parallelism within a layer.
- Lower per-layer complexity when n < d (typical for sentence-level work).

Sub-quadratic or local attention remains an open direction for very long inputs.

## Open Questions

- How to keep path length short while avoiding O(n²·d) complexity for long sequences.
- How to make decoding less sequential while preserving auto-regressive quality.
- How to generalize attention-only architectures to inputs beyond text (images, audio, video).

## Sources

- [[Attention Is All You Need]] — establishes attention-only [[Transformer]] as a superior sequence transduction model.
