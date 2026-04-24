---
type: concept
title: "Self-Attention"
created: 2026-04-17
updated: 2026-04-17
tags:
  - type/concept
  - domain/machine-learning
  - domain/natural-language-processing
complexity: intermediate
domain: "Attention mechanisms"
aliases:
  - "Intra-attention"
status: developing
related:
  - "[[Attention Mechanism]]"
  - "[[Scaled Dot-Product Attention]]"
  - "[[Multi-Head Attention]]"
  - "[[Transformer]]"
sources:
  - "[[Attention Is All You Need]]"
---

# Self-Attention

Self-attention (also called intra-attention) is an [[Attention Mechanism]] that relates different positions of a single sequence to compute a representation of that sequence. Every position's representation is a weighted combination of all positions in the same sequence, with weights learned from the content itself (Source: [[Attention Is All You Need]]).

## How It Works

In a self-attention layer, the queries, keys, and values all come from the same place — typically the output of the previous layer in the same stack. For an input sequence mapped to vectors (x_1, …, x_n), the layer produces (z_1, …, z_n) where each z_i is a weighted sum over projections of all x_j.

The [[Transformer]] uses the [[Scaled Dot-Product Attention]] form:

```
Attention(Q, K, V) = softmax(QK^T / √d_k) · V
```

The [[Transformer]] applies self-attention in three places:
- **Encoder self-attention**: each position attends to all positions in the previous encoder layer.
- **Decoder masked self-attention**: each position attends only to positions ≤ its own index, preserving auto-regression (implemented by masking illegal positions to −∞ before softmax).
- **Encoder–decoder attention** (strictly not self-attention but uses the same module): queries from the decoder, keys/values from the encoder.

## Key Properties

From Table 1 of the paper, comparing layer types on (complexity, sequential operations, maximum path length):

| Layer | Complexity per layer | Sequential ops | Max path length |
|-------|----------------------|----------------|------------------|
| Self-attention | O(n²·d) | O(1) | O(1) |
| Recurrent | O(n·d²) | O(n) | O(n) |
| Convolutional | O(k·n·d²) | O(1) | O(log_k n) |
| Self-attention (restricted, radius r) | O(r·n·d) | O(1) | O(n/r) |

- Constant-length paths between any two positions simplify long-range dependency learning.
- Fully parallelizable across positions.
- Faster than a recurrent layer when n < d, typical for sentence-level NMT.

## Applications

- The core building block of the [[Transformer]] and, beyond that paper, most modern large language models.
- Reading comprehension, abstractive summarization, textual entailment, task-independent sentence embeddings ([4, 19, 22, 23] in the paper's references).

## Connections

- Implemented via: [[Scaled Dot-Product Attention]], usually lifted to [[Multi-Head Attention]].
- Contrasts with: RNN hidden-state recurrence, convolutional layers.
- Part of: [[Transformer]].

## Sources

- [[Attention Is All You Need]]: introduces self-attention as a complete replacement for recurrence in sequence transduction; empirically best on WMT 2014.

## Gaps and Open Questions

> [!gap]
> Quadratic complexity in sequence length limits naive self-attention for very long contexts; the paper proposes but does not evaluate restricted (local neighborhood) self-attention.
