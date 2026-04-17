---
type: concept
title: "Positional Encoding"
created: 2026-04-17
updated: 2026-04-17
tags:
  - type/concept
  - domain/machine-learning
complexity: intermediate
domain: "Sequence modeling"
aliases:
  - "Sinusoidal positional encoding"
  - "Position embedding"
status: developing
related:
  - "[[Transformer]]"
  - "[[Self-Attention]]"
sources:
  - "[[Attention Is All You Need]]"
---

# Positional Encoding

Positional encoding injects information about token position into a model that has no recurrence or convolution, so that [[Self-Attention]] can distinguish order. The [[Transformer]] adds sinusoidal position vectors directly to the input embeddings at the bottom of both encoder and decoder stacks (Source: [[Attention Is All You Need]]).

## How It Works

The sinusoidal encoding uses sine and cosine functions of different frequencies:

```
PE(pos, 2i)     = sin(pos / 10000^(2i / d_model))
PE(pos, 2i+1)   = cos(pos / 10000^(2i / d_model))
```

where `pos` is the token index and `i` is the dimension index. Each dimension corresponds to a sinusoid with wavelength in a geometric progression from 2π up to 10000·2π. Because `sin(a+b)` and `cos(a+b)` are linear combinations of sin(a), cos(a), sin(b), cos(b), PE(pos+k) can be written as a fixed linear function of PE(pos) — which the authors hypothesize helps the model attend by relative offsets.

The positional encoding has the same dimension d_model as the token embeddings, so the two can simply be summed before the first encoder or decoder layer.

## Key Properties

- **No learned parameters** (when using sinusoidal encoding).
- **Extrapolation**: because the function is defined over all positions, the paper argues sinusoidal encodings may extrapolate to sequence lengths beyond those seen during training.
- **Comparable to learned positional embeddings**: Table 3 row (E) shows learned vs. sinusoidal encodings produce nearly identical BLEU on WMT 2014 EN-DE; sinusoidal was chosen for its extrapolation property.

## Applications

- Input embeddings of the [[Transformer]] encoder and decoder stacks.
- Any attention-only model that needs explicit order information.

## Connections

- Enables: [[Self-Attention]] to use sequence order.
- Contrasts with: implicit position signals in RNNs and CNNs.
- Part of: [[Transformer]].

## Evidence and Sources

- [[Attention Is All You Need]]: Section 3.5 defines the sinusoidal encoding; Table 3(E) compares it with learned positional embeddings.

## Gaps and Open Questions

> [!gap]
> Extrapolation to sequences longer than training was motivated but not directly evaluated in the paper.
