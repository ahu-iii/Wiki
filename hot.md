---
type: meta
title: "Hot Cache"
updated: 2026-04-17
---

# Recent Context

## Last Updated
2026-04-17 — Ingested the first source: [[Attention Is All You Need]] (Vaswani et al., NIPS 2017).

## Key Recent Facts

- The wiki now has its founding AI/ML source. 23 pages created around it.
- **Paper core claim**: sequence transduction can be done with attention alone — no recurrence, no convolution. The [[Transformer]] model achieves new SOTA BLEU on WMT 2014 EN-DE (28.4) and EN-FR (41.0).
- **Architecture**: N=6 encoder layers + N=6 decoder layers, each with [[Multi-Head Attention]] (h=8, d_k=d_v=64, d_model=512) and a position-wise FFN (d_ff=2048), wrapped in [[Residual Connection]] + [[Layer Normalization]]. Sinusoidal [[Positional Encoding]] added at input.
- **Ablations confirm**: 1/√d_k scaling matters for large d_k; h=8 heads is sweet spot (h=1 loses 0.9 BLEU; h=32 also degrades); learned positional embeddings match sinusoidal ones; bigger + more dropout helps.
- **Training**: Adam (β1=0.9, β2=0.98, ε=1e-9); warmup-then-inverse-sqrt LR with warmup_steps=4000; label smoothing 0.1; residual dropout 0.1 (base), 0.3 (big EN-DE). Trained on 8 NVIDIA P100 GPUs — base in 12h, big in 3.5 days.
- **Author attribution footnote** is unusually detailed — each of the 8 equal-contribution authors has a specific credit.

## Recent Changes

- Created 23 wiki pages (1 source, 2 topics, 13 concepts, 8 people + 3 orgs + 1 tool + 1 dataset).
- Updated index.md with full catalog; log.md with ingest entry; overview.md with current landscape.

## Active Threads

- Wiki has a single founding source. Next sources should either:
  - Deepen the transformer family (BERT, GPT, ViT, scaling-laws papers) — extends [[Neural Machine Translation]] and [[Transformer]].
  - Cover foundational predecessors (Bahdanau attention 2014, ResNet 2016, LayerNorm 2016) — fills the currently-seed concept pages.
  - Go orthogonal (a different domain entirely) — let a user signal which direction.
