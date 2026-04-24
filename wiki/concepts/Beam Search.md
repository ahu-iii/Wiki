---
type: concept
title: "Beam Search"
created: 2026-04-17
updated: 2026-04-17
tags:
  - type/concept
  - domain/natural-language-processing
complexity: basic
domain: "Sequence decoding"
aliases: []
status: seed
related:
  - "[[Neural Machine Translation]]"
  - "[[Transformer]]"
sources:
  - "[[Attention Is All You Need]]"
---

# Beam Search

Beam search is an approximate decoding strategy that maintains the top-k highest-scoring partial hypotheses at each step, where k is the **beam size**. Used by the [[Transformer]] for inference on WMT 2014 translation tasks with beam size 4 and length penalty α = 0.6 (Source: [[Attention Is All You Need]], Section 6.1).

## How It Works

- At each decoding step, expand every live hypothesis by every possible next token.
- Keep only the top-k hypotheses by cumulative log-probability (often normalized by a length penalty).
- Terminate when hypotheses emit end-of-sequence tokens or a maximum length is reached.

The Transformer paper also caps maximum output length at `input length + 50` and terminates early when possible.

## Applications

- Standard inference for most autoregressive sequence models, including [[Neural Machine Translation]] and text generation.

## Connections

- Used at inference time by: [[Transformer]] and predecessor seq2seq models.

## Sources

- [[Attention Is All You Need]]: Section 6.1 lists beam search settings used for translation.

## Gaps and Open Questions

> [!gap]
> This page is a seed. A dedicated source on beam search and length penalties has not been ingested.
