---
type: concept
title: Transformer
created: 2026-04-17
updated: 2026-04-17
tags:
  - type/concept
  - domain/machine-learning
  - domain/natural-language-processing
complexity: advanced
domain: Deep learning architectures
aliases:
  - Transformer architecture
  - Transformer model
status: developing
related:
  - "[[Self-Attention]]"
  - "[[Multi-Head Attention]]"
  - "[[Scaled Dot-Product Attention]]"
  - "[[Positional Encoding]]"
  - "[[Encoder-Decoder Architecture]]"
  - "[[Neural Machine Translation]]"
sources:
  - "[[Attention Is All You Need]]"
---

# Transformer

The Transformer is a sequence transduction model introduced by Vaswani et al. (2017) that replaces recurrence and convolution entirely with stacked [[Self-Attention]] and position-wise feed-forward layers. It processes all input positions in parallel, dramatically reducing training time while reaching state of the art on [[Neural Machine Translation]] (Source: [[Attention Is All You Need]]).

## How It Works

The Transformer is an [[Encoder-Decoder Architecture]] where both stacks are N=6 identical layers.

**Encoder layer** (two sub-layers):
1. Multi-head self-attention over the previous layer's output.
2. Position-wise fully-connected feed-forward network.

Each sub-layer is wrapped in a [[Residual Connection]] followed by [[Layer Normalization]]: `LayerNorm(x + Sublayer(x))`. All sub-layers and embeddings output vectors of dimension `d_model = 512`.

**Decoder layer** (three sub-layers):
1. Masked multi-head self-attention (positions can attend only to earlier positions, preserving auto-regression).
2. Multi-head encoder-decoder attention — queries come from the decoder; keys and values come from the encoder output.
3. Position-wise feed-forward network.

**Other components:**
- **Input/output embeddings** of dimension d_model, scaled by √d_model; input and output embedding matrices and the pre-softmax linear share weights.
- **[[Positional Encoding]]** (sinusoidal) added to input embeddings at the bottom of both stacks.
- **Feed-forward sub-layer:** two linear transformations with a ReLU between them, inner dimension `d_ff = 2048`.

## Key Properties

- **Parallelizable**: self-attention within a layer has O(1) sequential operations; training scales across a long sequence length much better than RNNs.
- **Short paths between positions**: maximum path length is O(1) vs. O(n) for recurrent layers — makes long-range dependencies easier to learn.
- **Per-layer complexity** is O(n²·d), which is favorable when sequence length n < representation dimension d (typical for sentence-level NMT).
- **Interpretability**: attention heads often specialize in syntactic or semantic relationships (qualitative finding).

## Model Configurations (from the paper)

| Variant | N | d_model | d_ff | h | d_k = d_v | P_drop | Params | Train steps |
|---------|---|---------|------|---|-----------|--------|--------|-------------|
| base    | 6 | 512     | 2048 | 8 | 64        | 0.1    | 65M    | 100K (~12h on 8×P100) |
| big     | 6 | 1024    | 4096 | 16| 64        | 0.3 (EN-DE) / 0.1 (EN-FR) | 213M | 300K (~3.5d on 8×P100) |

## Applications

- [[Neural Machine Translation]] — the original application (WMT 2014 EN-DE: 28.4 BLEU; EN-FR: 41.0 BLEU).
- Since 2017 the Transformer has become the backbone of essentially all modern large language models, speech models, and many vision models — though the original paper limits itself to translation.

## Connections

- Built from: [[Multi-Head Attention]], [[Self-Attention]], [[Positional Encoding]], [[Residual Connection]], [[Layer Normalization]].
- Part of: [[Neural Machine Translation]], [[Sequence Transduction]].
- Contrasts with: RNN/LSTM encoder-decoders, [[ByteNet]]-style convolutional sequence models, ConvS2S.

## Evidence and Sources

- [[Attention Is All You Need]]: introduces the architecture and reports state-of-the-art BLEU on WMT 2014 EN-DE and EN-FR at a fraction of prior training cost.

## Gaps and Open Questions

> [!gap]
> The original paper evaluates only on translation. Broader applicability (language modeling, vision, audio, multimodal) is posited but not demonstrated.

> [!gap]
> O(n²·d) self-attention complexity is impractical for very long sequences; the paper sketches a neighborhood-restricted variant but does not evaluate it.
