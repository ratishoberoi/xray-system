import { XRayEvaluation, XRayStep } from "../core/types";

export class Step {
  private step: XRayStep;

  constructor(name: string, input?: Record<string, any>) {
    this.step = {
      stepId: crypto.randomUUID(),
      name,
      input,
      startedAt: Date.now(),
      evaluations: [],
    };
  }

  addRule(name: string, rule: any) {
    this.step.rules = {
      ...(this.step.rules || {}),
      [name]: rule,
    };
  }

  evaluate(
    subjectId: string,
    attributes: Record<string, any>,
    checks: XRayEvaluation["checks"]
  ) {
    const qualified = Object.values(checks).every(
      (check) => check.passed
    );

    this.step.evaluations!.push({
      subjectId,
      attributes,
      checks,
      qualified,
    });
  }

  complete(output?: Record<string, any>, reasoning?: string) {
    this.step.output = output;
    this.step.reasoning = reasoning;
    this.step.endedAt = Date.now();
  }

  getRaw(): XRayStep {
    return this.step;
  }
}
