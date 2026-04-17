---
type: source
title: "Attention Is All You Need"
created: 2026-04-17
updated: 2026-04-17
tags:
  - type/source
  - source/paper
  - domain/machine-learning
  - domain/natural-language-processing
source_type: paper
author: "Vaswani et al."
date_published: 2017-06-12
url: "https://arxiv.org/abs/1706.03762"
confidence: high
key_claims:
  - "A sequence transduction model based solely on attention, without recurrence or convolution, outperforms prior state of the art on translation."
  - "Self-attention layers connect all positions with a constant number of sequential operations, enabling far greater parallelization than RNNs."
  - "Multi-head attention lets the model attend to information from different representation subspaces at different positions simultaneously."
  - "Scaling dot-product attention by 1/sqrt(d_k) stabilizes gradients for large key dimensions."
  - "Sinusoidal positional encodings and learned positional embeddings produce nearly identical results; sinusoidal may extrapolate to longer sequences."
status: mature
related:
  - "[[Transformer]]"
  - "[[Neural Machine Translation]]"
  - "[[Sequence Transduction]]"
sources: []
---

# Attention Is All You Need

Vaswani et al. (NIPS 2017) introduce the [[Transformer]], the first sequence transduction model that dispenses entirely with recurrence and convolution and relies only on [[Attention Mechanism|attention]]. On WMT 2014 English-to-German it reaches 28.4 [[BLEU Score|BLEU]] (a >2 BLEU improvement over prior ensembles); on WMT 2014 English-to-French it reaches 41.0 BLEU as a single model after 3.5 days of training on eight NVIDIA P100 GPUs — a small fraction of the training cost of comparable models. The paper is the foundational reference for modern attention-based deep learning.

## Key Claims

- Sequence transduction can be modeled entirely with attention; RNNs and CNNs are not required (Section 1–3).
- Self-attention has O(1) maximum path length between any two positions, compared with O(n) for recurrent layers and O(log_k n) for stacked convolutions (Table 1, Section 4).
- Dot-product attention scaled by 1/√d_k performs as well as additive attention while being faster and more memory-efficient via matrix multiplication (Section 3.2.1).
- Running h=8 attention heads in parallel with d_k = d_v = d_model/h = 64 preserves total compute but gives access to multiple representation subspaces (Section 3.2.2).
- Sinusoidal [[Positional Encoding]] works as well as learned positional embeddings and may extrapolate to sequence lengths unseen during training (Section 3.5, Table 3 row E).
- The base Transformer (6 layers, d_model=512, d_ff=2048, 8 heads, 65M params) trains in ~12 hours on 8 P100 GPUs; the big variant (d_model=1024, d_ff=4096, 16 heads, 213M params) trains in 3.5 days.
- Transformer (big) sets state-of-the-art BLEU on both EN-DE (28.4) and EN-FR (41.0) while using less compute than all prior best models (Table 2).

## Methodology

The authors designed the [[Transformer]] architecture by stacking [[Multi-Head Attention]] and position-wise feed-forward sub-layers, each wrapped in a [[Residual Connection]] and [[Layer Normalization]]. Training used the Adam optimizer with a warmup-then-inverse-square-root learning-rate schedule, label smoothing (ε_ls=0.1), residual dropout (P_drop=0.1 for base, 0.3 for big EN-DE), and beam search (beam=4, α=0.6) at inference. Models were evaluated on the WMT 2014 English–German (~4.5M sentence pairs, shared BPE vocab of 37K tokens) and English–French (36M sentence pairs, 32K word-piece vocab) benchmarks, reporting BLEU on newstest2014. Ablations on newstest2013 varied head count, key/value dimensions, model size, dropout rate, and positional encoding scheme (Table 3).

## Entities Mentioned

- [[Ashish Vaswani]] — first author; designed and implemented the first Transformer models.
- [[Noam Shazeer]] — proposed [[Scaled Dot-Product Attention]], [[Multi-Head Attention]], and parameter-free position representation.
- [[Niki Parmar]] — tuned and evaluated many variants in tensor2tensor.
- [[Jakob Uszkoreit]] — proposed replacing RNNs with self-attention and kicked off the effort.
- [[Llion Jones]] — initial codebase, efficient inference, visualizations.
- [[Aidan N. Gomez]] — core contributor (while at [[Google Brain]], affiliated with [[University of Toronto]]).
- [[Łukasz Kaiser]] — tensor2tensor co-author; major results contributor.
- [[Illia Polosukhin]] — co-designed and implemented the first Transformer models.
- [[Google Brain]], [[Google Research]], [[University of Toronto]] — author affiliations.
- [[tensor2tensor]] — training framework used to produce the paper's results.
- [[WMT 2014]] — translation benchmark for EN-DE and EN-FR.

## Concepts Covered

- [[Transformer]] — the architecture introduced.
- [[Self-Attention]] — the central mechanism.
- [[Scaled Dot-Product Attention]] — attention function softmax(QK^T/√d_k)V.
- [[Multi-Head Attention]] — h parallel attention heads on projected Q, K, V.
- [[Attention Mechanism]] — general query/key/value formulation.
- [[Positional Encoding]] — sinusoidal encodings injected at input embeddings.
- [[Encoder-Decoder Architecture]] — the overall stack structure (N=6 each side).
- [[Residual Connection]] — wraps every sub-layer.
- [[Layer Normalization]] — applied after each residual addition.
- [[BLEU Score]] — primary evaluation metric.
- [[Beam Search]] — inference-time decoding (beam=4).
- [[Byte-Pair Encoding]] — subword tokenization for EN-DE.
- [[Label Smoothing]] — regularization (ε_ls=0.1).

## Limitations and Gaps

> [!gap]
> Experiments are limited to machine translation; generalization to language modeling, vision, audio, and other modalities is left to future work (explicitly mentioned in Section 7).

> [!gap]
> Self-attention complexity is O(n²·d); the paper does not evaluate long-sequence regimes where n >> d, and only sketches a "restricted self-attention" with neighborhood size r as future work.

> [!gap]
> No analysis of attention-head specialization beyond qualitative inspection in the appendix.

## Raw Source

Source file: `raw/papers/attention-is-all-you-need-Paper.pdf`
