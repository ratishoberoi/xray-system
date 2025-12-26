🩻 X-Ray Debugger

X-Ray is a lightweight debugging system for non-deterministic, multi-step decision pipelines.
It provides visibility into why a system produced a particular output — not just what happened.

Modern AI-driven systems (LLMs, ranking pipelines, filtering logic) often fail in subtle ways.
Traditional logs and tracing answer “what ran”; X-Ray answers “why this decision was made.”

🚀 What This Project Demonstrates

This repository contains:

X-Ray SDK (Library)

A general-purpose instrumentation layer for decision pipelines

Captures inputs, outputs, rules, evaluations, and reasoning at each step

Designed to be domain-agnostic and reusable

Dashboard UI

Visualizes the full decision trail for a single execution

Makes it easy to identify where and why things went wrong

Optimized for human debugging and fast scanning

Demo Application

A simplified competitor-selection workflow

Uses mock data to showcase X-Ray’s design and usability

🧠 Core Idea: Decision-Level Observability

Traditional tracing focuses on:

Function calls

Timing

Infrastructure flow

X-Ray focuses on business logic decisions.

For every step, it captures:

What went in

What came out

What rules were applied

Why candidates passed or failed

The reasoning behind the outcome

This makes non-deterministic systems debuggable by humans.

🧱 Architecture Overview
xray/
├── sdk/
│   ├── Trace.ts        # Execution-level context
│   ├── Step.ts         # Decision boundary abstraction
│
├── store/
│   └── InMemoryStore.ts
│
├── index.ts            # Public SDK entry point
│
demo/
└── competitorSelection.ts  # Demo workflow using the SDK

dashboard/
└── React + Vite UI for visualizing traces

🧩 X-Ray SDK Design
Trace

Represents a single execution of a system (e.g., “competitor_selection”).

const trace = XRay.startTrace("competitor_selection", {
  sellerAsin: "B0SELLER01"
});

Step

Represents a business decision boundary, not just a function call.

Each step can capture:

Input context

Rules applied

Candidate evaluations

Output

Human-readable reasoning

const step = trace.startStep("apply_filters", input);

step.evaluate(candidateId, {
  price_range: { passed: false, reason: "8.99 below minimum" }
});

step.end(output, "Applied price, rating, and review filters");


The SDK intentionally allows flexible schemas, enabling use across:

Competitor selection

Ranking systems

LLM pipelines

Lead scoring

Content moderation

🖥️ Dashboard UI

The dashboard visualizes a single trace end-to-end.

Key UX Principles

Expandable steps to reduce cognitive load

Clear visual hierarchy (Input → Rules → Evaluations → Reasoning)

Pass / Fail color coding for fast scanning

Readable JSON blocks, not raw log dumps

The goal is not aesthetics — it’s debugging speed.

🧪 Demo Workflow: Competitor Selection

The demo simulates a simplified multi-step system:

Keyword Generation
Simulated LLM step extracting search keywords from a product

Candidate Search
Mock API returning potential competitor products

Apply Filters
Price, rating, and review count rules applied with explicit pass/fail reasoning

Each step is fully instrumented using the X-Ray SDK and rendered in the dashboard.

🛠️ Running the Project
1. Install dependencies
npm install

2. Run the demo (generate trace data)
node --loader ts-node/esm demo/competitorSelection.ts

3. Start the dashboard
cd dashboard
npm install
npm run dev


Open:
👉 http://localhost:5173

📸 Screenshots

(Include screenshots of the dashboard showing expanded steps, evaluations, and reasoning here.)

⚠️ Known Limitations

Uses an in-memory store (no persistence)

Single-trace visualization (no trace list or filtering)

No authentication or multi-user support

Demo uses mock data (intentionally)

These were deliberate trade-offs to focus on core system design and usability within the time budget.

🔮 Future Improvements

If extended further, I would:

Add persistent storage (SQLite / Postgres)

Support multiple traces with search & filtering

Add “Why this was selected” summary for final outputs

Introduce schema validation and plugins

Support streaming / live traces for long-running pipelines

🎯 Why X-Ray

As AI systems become more non-deterministic, debugging them requires decision transparency, not just logs.

X-Ray is designed to make complex pipelines:

Explainable

Debuggable

Human-friendly

👋 Final Note

This project intentionally prioritizes:

System design clarity

Human-centered debugging UX

Clean abstractions over feature count

The demo exists to showcase the X-Ray system, not to simulate a production integration.