---
type: concept
title: "Residual Connection"
created: 2026-04-17
updated: 2026-04-17
tags:
  - type/concept
  - domain/machine-learning
complexity: basic
domain: "Deep learning"
aliases:
  - "Skip connection"
  - "Residual"
status: seed
related:
  - "[[Layer Normalization]]"
  - "[[Transformer]]"
sources:
  - "[[Attention Is All You Need]]"
---

# Residual Connection

A residual (or skip) connection adds the input of a sub-layer to its output, giving `Sublayer(x) + x`. Originally introduced for very deep CNNs (He et al., 2016), residual connections make training deep stacks easier by improving gradient flow (Source: [[Attention Is All You Need]], citing [10]).

## How It Works

In the [[Transformer]], every sub-layer is wrapped as:

```
LayerNorm(x + Sublayer(x))
```

All sub-layers and embedding layers produce vectors of the same dimension d_model = 512 so that the addition is well-defined.

## Applications

- Every encoder and decoder sub-layer in the [[Transformer]].
- Standard in most modern deep architectures.

## Connections

- Paired with: [[Layer Normalization]] in the Transformer.
- Part of: [[Transformer]].

## Evidence and Sources

- [[Attention Is All You Need]]: Section 3.1 applies residual connections around every sub-layer.

## Gaps and Open Questions

> [!gap]
> This page is a seed. The original ResNet paper (He et al., 2016) has not been ingested.
