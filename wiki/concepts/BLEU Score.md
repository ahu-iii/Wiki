---
type: concept
title: "BLEU Score"
created: 2026-04-17
updated: 2026-04-17
tags:
  - type/concept
  - domain/natural-language-processing
  - domain/evaluation
complexity: basic
domain: "Machine translation evaluation"
aliases:
  - "BLEU"
status: seed
related:
  - "[[Neural Machine Translation]]"
  - "[[WMT 2014]]"
sources:
  - "[[Attention Is All You Need]]"
---

# BLEU Score

BLEU (Bilingual Evaluation Understudy) is the standard automatic metric for machine translation quality. It measures n-gram overlap between a candidate translation and one or more reference translations, with a brevity penalty for short outputs. Higher is better.

## How It Works

BLEU (not introduced in this paper, cited implicitly via decades of MT evaluation) computes modified n-gram precision for n = 1 … 4 between candidate and references, takes a weighted geometric mean, and multiplies by a brevity penalty. Scores are commonly reported either as a fraction in [0,1] or as a percentage in [0,100]; the Transformer paper uses the percentage form.

## Key Numbers from the Transformer Paper

| Task | Model | BLEU |
|------|-------|------|
| WMT 2014 EN-DE | Transformer (big) | **28.4** (new SOTA) |
| WMT 2014 EN-DE | Transformer (base) | 27.3 |
| WMT 2014 EN-FR | Transformer (big) | **41.0** (new SOTA) |
| WMT 2014 EN-FR | Transformer (base) | 38.1 |
| WMT 2014 EN-DE | Prior ensembles (GNMT+RL, ConvS2S) | ~26.3 |

(Source: [[Attention Is All You Need]], Table 2)

## Applications

- Primary evaluation metric for [[Neural Machine Translation]] research.
- Used on benchmark test sets such as [[WMT 2014]] newstest2014.

## Connections

- Metric for: [[Neural Machine Translation]].
- Reported on: [[WMT 2014]] benchmarks.

## Evidence and Sources

- [[Attention Is All You Need]]: reports BLEU for the [[Transformer]] on WMT 2014 EN-DE and EN-FR (Table 2); uses BLEU throughout ablation studies (Table 3).

## Gaps and Open Questions

> [!gap]
> This page is a seed. A dedicated source defining BLEU (Papineni et al., 2002) has not yet been ingested; details on brevity penalty and clipping are summarized from standard MT literature rather than a cited source.
