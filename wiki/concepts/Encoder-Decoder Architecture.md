---
type: concept
title: "Encoder-Decoder Architecture"
created: 2026-04-17
updated: 2026-04-17
tags:
  - type/concept
  - domain/machine-learning
  - domain/natural-language-processing
complexity: intermediate
domain: "Sequence transduction"
aliases:
  - "Encoder-decoder"
  - "Seq2seq"
status: developing
related:
  - "[[Transformer]]"
  - "[[Sequence Transduction]]"
  - "[[Neural Machine Translation]]"
sources:
  - "[[Attention Is All You Need]]"
---

# Encoder-Decoder Architecture

Most competitive neural [[Sequence Transduction]] models share an encoder-decoder structure. The encoder maps an input sequence of symbols (x_1, …, x_n) to a sequence of continuous representations z = (z_1, …, z_n). Given z, the decoder generates an output sequence (y_1, …, y_m) one symbol at a time, auto-regressively consuming its own previous outputs (Source: [[Attention Is All You Need]]).

## How It Works

- **Encoder**: reads the full input in one pass (in the [[Transformer]], in parallel across positions) and produces a contextualized representation z.
- **Decoder**: at step t, attends to the encoder output and the previously generated tokens y_<t to produce y_t.
- **Auto-regressive generation**: the model's own predictions feed back as inputs for subsequent steps.

In the [[Transformer]] both encoder and decoder are stacks of N=6 identical layers. The decoder adds a third sub-layer that performs [[Multi-Head Attention]] over the encoder output, and uses masking in its self-attention to prevent attending to future positions.

## Key Properties

- **Separation of concerns**: the encoder focuses on understanding the source; the decoder focuses on generating the target.
- **Flexible coupling**: encoder and decoder can be joined via recurrence (classic seq2seq), convolution (ConvS2S), or attention-only ([[Transformer]]).
- **Auto-regressive decoding** makes inference inherently sequential even when training is parallel.

## Applications

- [[Neural Machine Translation]] is the canonical application.
- Summarization, speech-to-text, image captioning, any conditional sequence generation.

## Connections

- Implementations: [[Transformer]] (attention-only), RNN/LSTM seq2seq, ConvS2S, ByteNet.
- Part of: [[Sequence Transduction]].

## Evidence and Sources

- [[Attention Is All You Need]]: Section 3 defines the encoder-decoder setting used throughout the paper; Figure 1 depicts the [[Transformer]] instance.

## Gaps and Open Questions

> [!gap]
> Auto-regressive decoding is inherently sequential. The paper notes that making generation less sequential is a future research goal but does not address it.
