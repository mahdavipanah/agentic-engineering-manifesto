---
title: Agentic Engineering Manifesto
titleLines: Agentic|Engineering Manifesto
subtitle: Principles and practices for building software with AI agents.
docMark: Manifesto
version: "1.0"
status: Initial
published: May 23, 2026
description: A manifesto defining how teams adopt agentic engineering — principles, practices, and expectations when building software with AI agents.
---

We are learning better ways to build software with AI agents.
Through this work, we have come to value:

- Guiding the agent in its own language over assigning tasks and assuming intent
- Agent-navigable codebases over perfect codebases
- Refactoring freely over forcing features into the current shape
- Reviewing for better approaches over reviewing only for correctness
- Human-led design, agent-led implementation over uniform involvement throughout
- Verifying the work over trusting the output

That is, while there is value in the things on the right, we value the things on the left more.

## Principles

### 1. Learn the language of the agent

To work well with agents, we must understand how they interpret instructions, search code, name concepts, and reason through problems.
The better we understand their language, the better we can guide their work.

### 2. Understand where agents are good

Agents are strong at exploring code, proposing changes, implementing features, and making refactors that used to feel expensive.
Good agentic engineering uses these strengths instead of treating the agent like a simple code generator.

### 3. Understand where agents need help

Agents need direction.
They need to know where to look, what parts of the codebase matter, and how to approach the problem.
A good prompt does not only describe the desired outcome. It points the agent toward the right context and the right path.

### 4. Incremental AI Ownership

Human involvement and agent ownership shift as work progresses.
At the beginning — shaping the problem, framing requirements, and choosing the architecture — humans must lead, because these decisions depend on judgment, taste, and context the agent cannot reach.
As work moves toward implementation, the agent takes on more ownership: writing the code, handling the details, and exploring the solution space within the boundaries the human has set.
Good agentic engineering recognizes this gradient and resists two opposite failure modes: over-directing the agent at the implementation level, and under-directing it at the design level.

### 5. Plan before implementing

Agents move fast, and that speed punishes unclear intent.
Spend time on the plan — the shape of the change, the files involved, the order of work — before any code is written.
The plan is where misunderstandings get caught cheaply. A short plan saves a long debugging session.

### 6. Build tight feedback loops

An agent's reliability comes from its ability to see the effect of its own work.
Tests, build output, logs, and runnable verifications matter more than the perfect prompt.
Invest in the scripts and tools that let the agent know whether it succeeded. These compound over time, and they benefit humans on the team just as much as they benefit the agent.

### 7. Refactor when the architecture resists the feature

Sometimes a feature feels hard because the current architecture makes it hard.
In agentic engineering, refactoring is cheaper, so we should not always squeeze the feature into the existing structure.
We should ask whether the structure should change first.

### 8. Review for better ways

When reviewing agent-written code, we ask:
Could this be done in a better way?
Has the agent looked at the relevant parts of the system?
Would this become easier after a refactor?
The goal is not only to check whether the code works, but whether the approach is right.

### 9. Prefer codebases agents can navigate

We do not want a codebase that is perfect in theory.
We want a codebase that is easy for an agent to understand, search, and change.
Names matter. Structure matters. Discoverability matters.
When an agent chooses an intuitive name, do not change it only for taste. The next time an agent looks for that concept, that name may be exactly what it expects.