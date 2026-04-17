---
type: concept
title: "Scaled Dot-Product Attention"
created: 2026-04-17
updated: 2026-04-17
tags:
  - type/concept
  - domain/machine-learning
complexity: intermediate
domain: "Attention mechanisms"
aliases:
  - "Scaled dot-product"
status: developing
related:
  - "[[Attention Mechanism]]"
  - "[[Self-Attention]]"
  - "[[Multi-Head Attention]]"
  - "[[Transformer]]"
sources:
  - "[[Attention Is All You Need]]"
---

# Scaled Dot-Product Attention

Scaled dot-product attention is the specific [[Attention Mechanism]] used throughout the [[Transformer]]. It computes compatibility between queries and keys by dot product, divides by √d_k to stabilize gradients, applies softmax, and uses the resulting weights to mix values (Source: [[Attention Is All You Need]]).

## How It Works

Given queries Q (n_q × d_k), keys K (n_k × d_k), and values V (n_k × d_v):

```
Attention(Q, K, V) = softmax(QK^T / √d_k) · V
```

The scaling factor 1/√d_k prevents the dot products from growing too large in magnitude for large d_k. If components of q and k are independent with mean 0 and variance 1, then q·k has variance d_k — without scaling, large d_k pushes softmax into regions of vanishingly small gradients.

In practice, queries are batched into a matrix Q and the computation is a pair of matrix multiplications plus a softmax, making it highly parallel on GPUs.

## Key Properties

- **Fast and memory-efficient** in practice compared with additive attention, because it maps onto optimized matrix multiplication kernels (Section 3.2.1).
- **Scale-invariant for small d_k**: additive and dot-product attention perform similarly for small d_k, but unscaled dot-product attention degrades for large d_k. The 1/√d_k factor closes the gap.
- **Masking**: the decoder's masked self-attention sets illegal positions in QK^T to −∞ before softmax, driving their weights to 0.

## Contrast with Additive Attention

- **Additive (Bahdanau)**: compatibility computed by a feed-forward network with a single hidden layer.
- **Dot-product (multiplicative)**: compatibility computed by Q·K^T; identical to scaled dot-product aside from the 1/√d_k factor.
- Theoretically similar complexity, but dot-product is faster and more space-efficient in practice.

## Applications

- Used in all attention sub-layers of the [[Transformer]] — encoder self-attention, decoder masked self-attention, and encoder-decoder attention — and lifted to [[Multi-Head Attention]] with h parallel heads.

## Connections

- Scales up to: [[Multi-Head Attention]].
- Instance of: [[Attention Mechanism]].
- Related to: additive (Bahdanau) attention.

## Evidence and Sources

- [[Attention Is All You Need]]: Section 3.2.1 introduces the formulation and justifies the 1/√d_k scaling.

## Gaps and Open Questions

> [!gap]
> Whether "determining compatibility is easy" depends on d_k; Table 3 row (B) shows reducing d_k hurts quality, suggesting dot-product may not always be the ideal compatibility function.
