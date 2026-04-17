---
type: concept
title: "Label Smoothing"
created: 2026-04-17
updated: 2026-04-17
tags:
  - type/concept
  - domain/machine-learning
complexity: basic
domain: "Regularization"
aliases: []
status: seed
related:
  - "[[Transformer]]"
sources:
  - "[[Attention Is All You Need]]"
---

# Label Smoothing

Label smoothing replaces the one-hot target distribution with a softer distribution that places probability ε on incorrect classes and (1 − ε) on the correct class. It prevents the model from becoming overconfident and improves calibration (Szegedy et al., 2015; cited in the Transformer paper).

## Usage in the Transformer

- Smoothing value ε_ls = 0.1 during training.
- Hurts perplexity (the model is encouraged to be less confident) but improves accuracy and BLEU on WMT 2014.

(Source: [[Attention Is All You Need]], Section 5.4)

## Applications

- Training the [[Transformer]] and many other sequence models.

## Connections

- Used alongside: residual dropout and the Adam warmup schedule in the Transformer.
- Part of: [[Transformer]].

## Evidence and Sources

- [[Attention Is All You Need]]: Section 5.4 notes label smoothing at 0.1 improves BLEU at the cost of perplexity.

## Gaps and Open Questions

> [!gap]
> This page is a seed. The original label-smoothing paper (Szegedy et al., 2015, Rethinking Inception) has not been ingested.
