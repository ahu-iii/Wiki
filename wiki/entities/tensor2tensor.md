---
type: entity
title: "tensor2tensor"
created: 2026-04-17
updated: 2026-04-17
tags:
  - type/entity
  - domain/machine-learning
entity_type: tool
role: "Open-source library for training sequence-to-sequence and attention-based models"
affiliation: "Google Brain"
status: seed
related:
  - "[[Transformer]]"
  - "[[Google Brain]]"
sources:
  - "[[Attention Is All You Need]]"
---

# tensor2tensor

tensor2tensor is an open-source framework (developed primarily at [[Google Brain]]) that provides training infrastructure, dataset pipelines, and model implementations for sequence-to-sequence and attention-based deep-learning research. It was the codebase in which the final [[Transformer]] results were produced, replacing the team's earlier codebase and "greatly improving results and massively accelerating [their] research" (Source: [[Attention Is All You Need]], author contributions footnote).

## Key Contributions

- Codebase used to produce all results in [[Attention Is All You Need]].
- Implementations of the [[Transformer]], including base and big variants, available at https://github.com/tensorflow/tensor2tensor (as stated in Section 7 of the paper).

## Connections

- Developed by: [[Google Brain]] with major contributions from [[Łukasz Kaiser]], [[Aidan N. Gomez]], [[Niki Parmar]], [[Llion Jones]].
- Trains: [[Transformer]] and other sequence models.

## Timeline

- 2017 — Released alongside the [[Transformer]]; open-sourced under the TensorFlow GitHub organization.

## See Also

- [[Transformer]]
- [[Google Brain]]

## Sources

- [[Attention Is All You Need]]
