import { Trace } from "./xray/sdk/Trace";

export const XRay = {
  startTrace(name: string, metadata?: Record<string, any>) {
    return new Trace(name, metadata);
  },
};
