import { XRayTrace } from "../core/types.js";

class InMemoryStore {
  private traces: Map<string, XRayTrace> = new Map();

  save(trace: XRayTrace) {
    this.traces.set(trace.traceId, trace);
  }

  get(traceId: string): XRayTrace | undefined {
    return this.traces.get(traceId);
  }

  getAll(): XRayTrace[] {
    return Array.from(this.traces.values());
  }
}

export const inMemoryStore = new InMemoryStore();
