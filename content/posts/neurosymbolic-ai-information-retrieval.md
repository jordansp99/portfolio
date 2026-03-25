---
title: Closing the Semantic Gap: A Neurosymbolic Approach to Information Retrieval
date: 2026-03-25
excerpt: Exploring how the fusion of symbolic AI and neural networks is closing the semantic gap in information retrieval.
tags:
- Neurosymbolic AI
- Information Retrieval
---

## The Problem with Search as We Know It

Every day, millions of people search for products, jobs, and information. Yet most search engines still think like a dictionary, not a human. Type "gaming laptop" into an e-commerce site and you might get a laptop sleeve meant for gamers. Apply for a job requiring "leadership" and a system might miss a candidate who wrote "managed a team of ten", because it does not understand that *those phrases mean the same thing*.

This is not a bug. It is a fundamental limitation of **keyword-based search**. These systems match words, not meaning. They cannot grasp that "treats" relates to "cures", or that knowing "PyTorch" implies understanding "Python". We created a semantic gap, and it is costing businesses millions in lost conversions, poor hires, and frustrated users.

## The Symbolic Solution: Ontologies

For decades, computer scientists have attempted to solve this problem with **ontologies**: formal structures that define concepts and their relationships. Think of an ontology as a map of knowledge. Instead of just listing words, it captures *meaning* and *connections*.

In 2015, Malik et al. demonstrated this approach in agriculture, building an ontology that could understand that a fungus *causes* a crop disease, and that certain treatments *apply* to specific conditions. Their framework used a 4-tuple approach:

- **Classes** (concepts like "Cereal", "Crop", "Disease")
- **Relations** (like "causes", "treats", "symptom of")
- **Instances** (specific examples)
- **Axioms** (rules constraining valid relationships)

The result? A system that reasoned about agriculture, not just matched keywords.

But there was a catch. Building these ontologies required domain experts to manually define every concept and relationship. A process that scaled poorly. A static agricultural database? Manageable. A recruitment platform processing thousands of new CVs daily? Impractical.

## The Neural Alternative: Large Language Models

Enter **Large Language Models (LLMs)**. These neural networks excel at processing unstructured text, extracting meaning, and generating human-like responses. They can read a CV and summarise skills. They can understand context without being explicitly told relationships.

However, LLMs alone have their own weakness. They are probabilistic. Ask an LLM the same question twice and you might get different answers. More critically, they can *hallucinate*: creating plausible-sounding but incorrect relationships. An LLM might confidently assert that "all birds can fly" because it saw that pattern in training data, even though penguins exist.

## The Hybrid Approach: Neurosymbolic AI

The most powerful solution is not choosing between symbols or neural networks. It is combining them.

**Neurosymbolic AI** merges the precision of formal knowledge structures with the scalability of neural language models:

- **The symbolic layer** (the ontology) provides a rigid constraint structure. Rules that *must* be followed. This is the "why" and "how" of relationships.
- **The neural layer** (the LLM) provides the ability to ingest vast amounts of unstructured text and extract relevant entities at scale.

Think of it like this. The ontology is a recipe book that defines what combinations are valid. The LLM is a chef that can read any ingredient list and suggest how to cook. But the recipe book ensures they do not suggest pairing chocolate with fish.

## Real-World Applications

### E-Commerce: From Keywords to Compatibility

In e-commerce, the neurosymbolic approach transforms search from "people who bought X also bought Y" (statistical correlation) to "X *requires* Y to function" (semantic inference).

An ontology defines that a camera lens `isCompatibleWith` specific camera bodies. The LLM processes product descriptions automatically, mapping them to these concepts. When you browse a Sony Alpha camera, the system *knows* which lenses fit: not because of purchase patterns, but because the relationship is explicitly defined and automatically populated.

This reduces return rates (no more buying incompatible accessories) and improves conversion (relevance over noise).

### Recruitment: Skills as a Semantic Graph

In recruitment, the same principle applies to human skills. An ontology can define that `knows(ML)` *implies* `knows(Statistics)`. The LLM reads a candidate's CV, extracts mentions of "PyTorch" or "TensorFlow", and automatically infers parent skills like Python and machine learning competence. Even if those exact words never appeared.

Research by Tuan et al. (2024) shows this semantic matching outperforms statistical similarity by 1-5%. That might sound small, but in high-volume hiring it means dramatically fewer missed candidates and fewer unqualified shortlists.

## The Human-in-the-Loop Bridge

Here is the practical reality. LLMs achieve approximately 90% accuracy in extracting semantic triples from text (Norouzi et al., 2024). That is impressive, but 10% errors in a recruitment or e-commerce context is unacceptable.

The solution is elegant: **automation with verification**. The LLM proposes relationships, and a human expert validates them. This shifts the bottleneck from "data entry" (the manual ontology approach) to "data validation" (a fraction of the work). Experts stop being data clerks and become quality controllers.

## The Path Forward

The future of information retrieval is not choosing between the precision of symbolic AI and the scalability of neural networks. It is their synthesis. Organisations can now:

1. **Define** rigorous semantic structures (or leverage existing standards like ESCO for recruitment or GoodRelations for e-commerce)
2. **Populate** them automatically using LLMs trained to respect those structures
3. **Validate** outputs with human oversight to catch errors

We are moving from a world where machines could *search* but not *understand*, towards systems that comprehend context, infer relationships, and reason about meaning. Without requiring armies of experts to manually encode every connection.

The semantic gap is finally closing.

## References

- **European Commission** (2024) *ESCO: European Skills, Competences, Qualifications and Occupations*. Available at: https://ec.europa.eu/esco/
- **Hepp, M.** (2008) '*GoodRelations: an ontology for describing products and services offers on the web*', in A. Gangemi and J. Euzenat (eds) *Knowledge Engineering: Practice and Patterns*. Berlin: Springer, pp. 329-346. Available at: https://doi.org/10.1007/978-3-540-87696-0_29
- **Malik, N., Sharan, A. and Hijam, D.** (2015) 'Ontology development for agriculture domain', in *2015 2nd International Conference on Computing for Sustainable Global Development (INDIACom)*. New Delhi: IEEE, pp. 738-742.
- **Norouzi, S.S. et al.** (2024) '*Ontology population using LLMs*', *arXiv preprint arXiv:2411.01612*. Available at: https://arxiv.org/abs/2411.01612
- **Tuan, A.C., Dang, M.T. and Nguyen, T.N.A.** (2024) 'Ontology and its applications in skills matching in job recruitment', *Applied Ontology*, 19(3), pp. 273-293. Available at: https://doi.org/10.3233/AO-240019
