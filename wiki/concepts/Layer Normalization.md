---
type: concept
title: "Layer Normalization"
created: 2026-04-17
updated: 2026-04-17
tags:
  - type/concept
  - domain/machine-learning
complexity: basic
domain: "Deep learning"
aliases:
  - "LayerNorm"
status: seed
related:
  - "[[Residual Connection]]"
  - "[[Transformer]]"
sources:
  - "[[Attention Is All You Need]]"
---

# Layer Normalization

Layer normalization normalizes the activations of a layer across its features, for each example independently (Ba, Kiros, and Hinton, 2016). The [[Transformer]] applies LayerNorm after every residual-added sub-layer output, i.e. `LayerNorm(x + Sublayer(x))` (Source: [[Attention Is All You Need]], citing [1]).

## Applications

- Every encoder and decoder sub-layer of the [[Transformer]].
- Most modern transformer-based models use LayerNorm or closely related variants.

## Connections

- Paired with: [[Residual Connection]].
- Part of: [[Transformer]].

## Sources

- [[Attention Is All You Need]]: Section 3.1 describes post-residual layer normalization.

## Gaps and Open Questions

> [!gap]
> This page is a seed. The original LayerNorm paper (Ba et al., 2016) has not been ingested; variants like pre-norm vs. post-norm are not discussed in the Transformer paper.
