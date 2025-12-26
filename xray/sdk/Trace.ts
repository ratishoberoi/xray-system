import { XRayStep, XRayTrace } from "../core/types";
import { inMemoryStore } from "../store/InMemoryStore";
import { Step } from "./Step";

export class Trace {
  private trace: XRayTrace;

  constructor(name: string, metadata?: Record<string, any>) {
    this.trace = {
      traceId: crypto.randomUUID(),
      name,
      metadata,
      startedAt: Date.now(),
      steps: [],
    };
  }

  startStep(name: string, input?: Record<string, any>): Step {
    const step = new Step(name, input);
    this.trace.steps.push(step.getRaw());
    return step;
  }

  end() {
    this.trace.endedAt = Date.now();
    inMemoryStore.save(this.trace);
  }

  getTrace(): XRayTrace {
    return this.trace;
  }
}
