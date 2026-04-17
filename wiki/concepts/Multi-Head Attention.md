---
type: concept
title: "Multi-Head Attention"
created: 2026-04-17
updated: 2026-04-17
tags:
  - type/concept
  - domain/machine-learning
complexity: intermediate
domain: "Attention mechanisms"
aliases:
  - "MHA"
status: developing
related:
  - "[[Scaled Dot-Product Attention]]"
  - "[[Self-Attention]]"
  - "[[Attention Mechanism]]"
  - "[[Transformer]]"
sources:
  - "[[Attention Is All You Need]]"
---

# Multi-Head Attention

Multi-head attention runs h parallel [[Scaled Dot-Product Attention]] operations on linearly projected copies of the queries, keys, and values, then concatenates and re-projects the outputs. It lets a single attention layer attend to information from different representation subspaces at different positions (Source: [[Attention Is All You Need]]).

## How It Works

Given queries Q, keys K, values V of dimension d_model, multi-head attention learns h sets of projection matrices:

```
head_i   = Attention(Q · W_i^Q, K · W_i^K, V · W_i^V)
MultiHead(Q, K, V) = Concat(head_1, …, head_h) · W^O
```

where
- W_i^Q, W_i^K ∈ R^(d_model × d_k)
- W_i^V ∈ R^(d_model × d_v)
- W^O ∈ R^(h·d_v × d_model)

The base Transformer uses h = 8 heads with d_k = d_v = d_model / h = 64. The reduced per-head dimensionality keeps the total computation comparable to single-head attention with full d_model.

## Key Properties

- **Multiple subspaces**: different heads can specialize in different relations (syntactic vs. semantic, local vs. long-range).
- **Averaging resistance**: with a single attention head, weighted averaging tends to blur distinct relations; multiple heads preserve them.
- **Same total compute** as single-head full-dimension attention, because per-head d_k, d_v are reduced by factor h.
- **Quality depends on head count**: Table 3 row (A) shows single-head attention is 0.9 BLEU worse than h=8; too many heads (h=32) also degrade quality.

## Applications

Used in three places in the [[Transformer]]:
1. **Encoder self-attention** — Q, K, V all from the previous encoder layer.
2. **Decoder masked self-attention** — Q, K, V from the previous decoder layer, with future positions masked.
3. **Encoder-decoder attention** — Q from the decoder, K and V from the encoder output, mimicking classical seq2seq attention.

## Connections

- Built from: [[Scaled Dot-Product Attention]].
- Instance of: [[Attention Mechanism]].
- Part of: [[Transformer]].

## Evidence and Sources

- [[Attention Is All You Need]]: Section 3.2.2 introduces multi-head attention; Table 3(A)(B) ablates head count and key dimension on WMT 2014 EN-DE newstest2013.

## Gaps and Open Questions

> [!gap]
> The paper does not analyze why some head counts (h=8, 16) work better than others (h=1 or h=32); optimal head structure remains empirical.
