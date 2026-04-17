---
type: meta
title: "Wiki Index"
updated: 2026-04-17
---

# Wiki Index

> Master catalog of all wiki pages. The LLM reads this to find relevant pages.
> Updated after every ingest operation.

## Topics

- [[Neural Machine Translation]] — training neural networks to translate between languages (1 source)
- [[Sequence Transduction]] — mapping one variable-length sequence to another (1 source)

## Concepts

### Machine learning / deep learning

- [[Transformer]] — attention-only encoder-decoder sequence model (Vaswani et al., 2017)
- [[Self-Attention]] — intra-sequence attention relating all positions to each other
- [[Scaled Dot-Product Attention]] — softmax(QK^T/√d_k)V, the Transformer's attention function
- [[Multi-Head Attention]] — h parallel attention heads on projected Q, K, V
- [[Attention Mechanism]] — general query/key/value formulation
- [[Positional Encoding]] — sinusoidal position signal added to input embeddings
- [[Encoder-Decoder Architecture]] — the seq2seq structural skeleton
- [[Residual Connection]] — skip connection around each sub-layer
- [[Layer Normalization]] — per-example, per-layer feature normalization
- [[Beam Search]] — approximate decoding keeping top-k hypotheses
- [[Label Smoothing]] — regularization using softened target distributions
- [[Byte-Pair Encoding]] — subword tokenization by merging frequent pairs
- [[BLEU Score]] — n-gram-based machine translation metric

## Entities

### People

- [[Ashish Vaswani]] — first author of Attention Is All You Need (Google Brain)
- [[Noam Shazeer]] — proposed scaled dot-product and multi-head attention (Google Brain)
- [[Niki Parmar]] — model-variant design and tuning in tensor2tensor (Google Research)
- [[Jakob Uszkoreit]] — proposed replacing RNNs with self-attention (Google Research)
- [[Llion Jones]] — initial codebase, efficient inference, visualizations (Google Research)
- [[Aidan N. Gomez]] — tensor2tensor co-author (University of Toronto / Google Brain)
- [[Łukasz Kaiser]] — tensor2tensor co-author (Google Brain)
- [[Illia Polosukhin]] — first Transformer implementations (Google Research)

### Organizations

- [[Google Brain]] — deep-learning research team at Google; host of the Transformer project
- [[Google Research]] — Google's broader research division
- [[University of Toronto]] — academic affiliation of Aidan N. Gomez at the time of the paper

### Tools and Products

- [[tensor2tensor]] — open-source framework used to train the Transformer

### Datasets

- [[WMT 2014]] — English-German and English-French machine translation benchmark

## Sources

### Most recent

- [[Attention Is All You Need]] — Vaswani et al., NIPS 2017; introduces the [[Transformer]] (ingested 2026-04-17)

## Comparisons

*No comparisons yet.*

## Questions

*No questions filed yet.*

## Synthesis

*No synthesis pages yet.*
