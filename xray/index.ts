import { Trace } from "./sdk/Trace.js";

export const XRay = {
  startTrace(name: string, metadata?: Record<string, any>) {
    return new Trace(name, metadata);
  },
};
