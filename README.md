<p align="center"><b>🩻 X-Ray Debugger</b></p>



X-Ray is a lightweight debugging system for non-deterministic, multi-step decision pipelines.
It provides visibility into why a system produced a particular output — not just what happened.

Modern AI-driven systems (LLMs, ranking pipelines, filtering logic) often fail in subtle ways.
Traditional logs and tracing answer “what ran”; X-Ray answers “why this decision was made.”

<p align="center"><b>🚀 What This Project Demonstrates</b></p>

This repository contains:

<ul>
  <li>
    <strong>🛠️ X-Ray SDK (Library)</strong>
    <ul>
      <li>A general-purpose instrumentation layer for decision pipelines</li>
      <li>Captures inputs, outputs, rules, evaluations, and reasoning at each step</li>
      <li>Designed to be domain-agnostic and reusable</li>
    </ul>
  </li>
  <br>
  <li>
    <strong>🖥️ Dashboard UI</strong>
    <ul>
      <li>Visualizes the full decision trail for a single execution</li>
      <li>Makes it easy to identify where and why things went wrong</li>
      <li>Optimized for human debugging and fast scanning</li>
    </ul>
  </li>
  <br>
  <li>
    <strong>🚀 Demo Application</strong>
    <ul>
      <li>A simplified competitor-selection workflow</li>
      <li>Uses mock data to showcase X-Ray’s design and usability</li>
    </ul>
  </li>
</ul>
<p align="center"><b>🧠 Core Idea: Decision-Level Observability</b></p>

<ul>
  <li>
    <strong>Traditional tracing focuses on:</strong>
    <ul>
      <li>Function calls</li>
      <li>Timing</li>
      <li>Infrastructure flow</li>
    </ul>
  </li>
  <br>
  <li>
    <strong>X-Ray focuses on business logic decisions.</strong>
  </li>
  <br>
  <li>
    <strong>For every step, it captures:</strong>
    <ul>
      <li>What went in</li>
      <li>What came out</li>
      <li>What rules were applied</li>
      <li>Why candidates passed or failed</li>
      <li>The reasoning behind the outcome</li>
    </ul>
  </li>
  <br>
  <li>
    <em>This makes non-deterministic systems debuggable by humans.</em>
  </li>
</ul>

<p align="center"><b>🧱 Architecture Overview</b></p>


The X-Ray system is structured into three clear layers: the core SDK, a demo pipeline, and a debugging dashboard UI.

---

## 📁 Project Structure

```text
xray-system/
│
├── xray/                          # Core X-Ray SDK
│   ├── sdk/
│   │   ├── Trace.ts               # Execution-level trace context
│   │   │                           # Owns lifecycle of a single decision flow
│   │   │
│   │   ├── Step.ts                # Decision boundary abstraction
│   │   │                           # Captures inputs, evaluations, outputs & reasoning
│   │   │
│   │   ├── store/
│   │   │   └── InMemoryStore.ts   # In-memory persistence (pluggable by design)
│   │   │
│   │   └── index.ts               # Public SDK entry point
│   │
│   └── index.ts                   # SDK export barrel
│
├── demo/
│   └── competitorSelection.ts     # Demo workflow using the SDK
│
├── dashboard/
│   ├── src/
│   │   ├── components/            # Step cards & evaluation views
│   │   └── App.tsx                # X-Ray trace visualizer UI
│   │
│   └── vite.config.ts             # React + Vite setup
│
├── README.md
└── tsconfig.json
```

## 🧩 X-Ray SDK Design

### Trace

A **Trace** represents a single end-to-end execution of a system  
(e.g. `competitor_selection`).

```ts
const trace = XRay.startTrace("competitor_selection", {
  sellerAsin: "B0SELLER01",
});
A trace acts as the root container for all decision steps, evaluations,
and reasoning associated with one execution.
```
Step:
A Step represents a business decision boundary, not just a function call.

<p align="center"><b>Each step can capture:</b></p>

* **Input context**: captures the initial state and environment data for the execution.
* **Rules / filters applied**: tracks which logic gates or constraints were triggered.
* **Candidate-level evaluations**: stores the scoring or ranking results for each potential outcome.

<p align="center"><b>Output</b></p>

* **Human-readable reasoning**
```
ts
Copy code
const step = trace.startStep("apply_filters", input);

step.evaluate("B0COMP03", {
  price_range: { passed: false, reason: "8.99 below minimum" },
});

step.end(output, "Applied price, rating, and review filters");
```
This makes it possible to understand why a decision was made,
not just what the result was.

<p align="center"><b>SDK Philosophy</b></p>

The SDK intentionally allows flexible schemas, enabling it to be reused across:

* **Competitor selection systems**

* **Ranking & recommendation pipelines**

* **LLM-based workflows**

* **Lead scoring systems**

* **Content moderation pipelines**

X-Ray focuses on decision transparency rather than strict schema enforcement.

<p align="center"><b>🖥️ Dashboard UI</b></p>

The dashboard visualizes a single trace end-to-end.

<p align="center"><b>Key UX Principles</b></p>

* Expandable / collapsible steps to reduce cognitive load

* Clear visual hierarchy
(Input → Rules → Evaluations → Reasoning)

* Pass / Fail color coding for fast scanning

* Readable JSON blocks, not raw log dumps


<p align="center"><b>The goal is not aesthetics — it’s debugging speed.</b></p>

<p align="center"><b>🧪 Demo Workflow: Competitor Selection</b></p>

The demo simulates a simplified multi-step decision system:

1️⃣ Keyword Generation
Simulated LLM step extracting search keywords from a product description.

2️⃣ Candidate Search
Mock API returning potential competitor products.

3️⃣ Apply Filters
Price, rating, and review count rules applied with explicit pass/fail reasoning.

Each step is fully instrumented using the X-Ray SDK and rendered in the dashboard.

🛠️ Running the Project
```
1. Install dependencies
bash
Copy code
npm install
2. Run the demo (generate trace data)
bash
Copy code
node --loader ts-node/esm demo/competitorSelection.ts
3. Start the dashboard
bash
Copy code
cd dashboard
npm install
npm run dev
```
**Open in browser:**

<p align="center"><b>👉 http://localhost:5173</b></p>

📸 Screenshots
<img width="1919" height="913" alt="Screenshot 2025-12-26 141506" src="https://github.com/user-attachments/assets/3ada0561-b9c0-4116-8b96-0f5f0e687535" />
<img width="1918" height="969" alt="Screenshot 2025-12-26 141515" src="https://github.com/user-attachments/assets/112cdee2-29e3-495c-9d58-14832492b691" />
<img width="1919" height="924" alt="Screenshot 2025-12-26 141522" src="https://github.com/user-attachments/assets/2a49332b-1a3d-41bd-a10a-4d41f860f1e8" />
<img width="1918" height="918" alt="Screenshot 2025-12-26 141533" src="https://github.com/user-attachments/assets/162b972d-de32-41fa-9d25-cd5fa468018f" />
<img width="1916" height="907" alt="Screenshot 2025-12-26 141536" src="https://github.com/user-attachments/assets/2794d17c-ae5b-46c9-b24e-74c601ca53c4" />


<p align="center"><b>⚠️ Known Limitations</b></p>

* **Uses an in-memory store (no persistence)**

* **Supports single-trace visualization only**

* **No authentication or multi-user support**

* **Demo uses mock data (intentionally)**

These were deliberate trade-offs to focus on core system design
within the time budget.

<p align="center"><b>🔮 Future Improvements</b></p>

With more time, I would:

* **Add persistent storage (SQLite / Postgres)**

* **Support multiple traces with search & filtering**

* **Add a “Why this was selected” summary for final outputs**

* **Introduce schema validation & plugin support**

* **Support streaming / live traces for long-running pipelines**

<p align="center"><b>🎯 Why X-Ray</b></p>

As systems increasingly rely on non-deterministic logic (LLMs, heuristics,
ranking models), traditional logs are no longer sufficient.

X-Ray is designed to make complex pipelines:

* **Explainable**

* **Debuggable**

* **Human-friendly**

<p align="center"><b>👋 Final Note</b></p>

This project intentionally prioritizes:

* **System design clarity**

* **Human-centered debugging UX**

* **Clean abstractions over feature count**

The demo exists to showcase the X-Ray system, not to simulate a
production integration.
