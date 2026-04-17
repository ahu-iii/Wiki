---
type: concept
title: "Attention Mechanism"
created: 2026-04-17
updated: 2026-04-17
tags:
  - type/concept
  - domain/machine-learning
complexity: intermediate
domain: "Sequence modeling"
aliases:
  - "Attention"
status: developing
related:
  - "[[Self-Attention]]"
  - "[[Scaled Dot-Product Attention]]"
  - "[[Multi-Head Attention]]"
  - "[[Transformer]]"
sources:
  - "[[Attention Is All You Need]]"
---

# Attention Mechanism

An attention mechanism maps a **query** and a set of **key–value** pairs to an output, where the output is a weighted sum of the values and the weight on each value is computed by a compatibility function between the query and the corresponding key. All of query, keys, values, and output are vectors (Source: [[Attention Is All You Need]]).

## How It Works

At a minimum an attention function is parameterized by its compatibility function. Two families dominate prior literature:

- **Additive attention (Bahdanau)**: compatibility computed by a small feed-forward network with a single hidden layer.
- **Dot-product (multiplicative) attention**: compatibility computed as q · k. The [[Transformer]] uses [[Scaled Dot-Product Attention]] — dot-product with a 1/√d_k scaling factor for stability.

Softmax over the compatibility scores gives the attention weights, which are then applied to the value vectors.

## Key Properties

- **Order-free dependency modeling**: attention can relate two positions regardless of distance in the sequence.
- **Interpretability signal**: weights give a per-position map that sometimes aligns with linguistic structure.
- **Building block**: attention is typically stacked with other layers (recurrence, convolution, feed-forward) to form full models; the Transformer shows attention alone is sufficient.

## Applications

- Originally combined with recurrent encoders for machine translation (Bahdanau et al., 2014; Luong et al., 2015).
- [[Self-Attention]] (intra-attention) for reading comprehension, summarization, entailment, and sentence embeddings.
- The complete backbone of the [[Transformer]] and, more broadly, modern sequence models.

## Connections

- Specializations: [[Self-Attention]], [[Scaled Dot-Product Attention]], [[Multi-Head Attention]].
- Historically used alongside: recurrent networks (RNN/LSTM), convolutional networks (ConvS2S, ByteNet), end-to-end memory networks.

## Evidence and Sources

- [[Attention Is All You Need]]: gives the general query/key/value formulation and argues attention alone suffices for sequence transduction.

## Gaps and Open Questions

> [!gap]
> Optimal compatibility functions for very large key dimensions remain open (Table 3 row (B) hints that dot-product alone may not be ideal).
