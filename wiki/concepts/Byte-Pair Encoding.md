---
type: concept
title: "Byte-Pair Encoding"
created: 2026-04-17
updated: 2026-04-17
tags:
  - type/concept
  - domain/natural-language-processing
complexity: basic
domain: "Tokenization"
aliases:
  - "BPE"
status: seed
related:
  - "[[Neural Machine Translation]]"
  - "[[Transformer]]"
  - "[[WMT 2014]]"
sources:
  - "[[Attention Is All You Need]]"
---

# Byte-Pair Encoding

Byte-pair encoding (BPE) is a subword tokenization algorithm that iteratively merges the most frequent pairs of adjacent symbols, producing a vocabulary of subword units that can represent rare or unseen words through composition (Sennrich, Haddow, and Birch, 2015; cited in the Transformer paper).

## Usage in the Transformer

- **WMT 2014 English–German**: BPE with a **shared source–target vocabulary of ~37K tokens**.
- **WMT 2014 English–French**: a 32K word-piece vocabulary (a related subword scheme).

(Source: [[Attention Is All You Need]], Section 5.1)

## Applications

- Standard subword tokenization for [[Neural Machine Translation]].
- Widely used in large language models; closely related to Google's word-piece tokenizer.

## Connections

- Alternative to: character-level and whole-word vocabularies.
- Related to: word-piece tokenization used for EN-FR in the Transformer.

## Sources

- [[Attention Is All You Need]]: Section 5.1 reports BPE vocabulary sizes for EN-DE and EN-FR training.

## Gaps and Open Questions

> [!gap]
> This page is a seed. The original BPE paper (Sennrich et al., 2015) has not been ingested.
