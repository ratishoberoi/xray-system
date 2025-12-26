export interface XRayTrace {
  traceId: string;
  name: string;

  startedAt: number;
  endedAt?: number;

  metadata?: Record<string, any>;

  steps: XRayStep[];
}

export interface XRayStep {
  stepId: string;
  name: string;

  startedAt: number;
  endedAt?: number;

  input?: Record<string, any>;

  rules?: Record<string, any>;

  evaluations?: XRayEvaluation[];

  output?: Record<string, any>;

  reasoning?: string;
}

export interface XRayEvaluation {
  subjectId: string;

  attributes?: Record<string, any>;

  checks: {
    [ruleName: string]: {
      passed: boolean;
      reason: string;
    };
  };

  qualified: boolean;
}
