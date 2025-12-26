import { useState } from "react";
import { traces } from "./data/traces";

function App() {
  const trace = traces[0];
  const [openStep, setOpenStep] = useState<number | null>(0);

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>🩻 X-Ray Debugger</h1>

      <p>
        <strong>Trace:</strong> {trace.name} <br />
        <strong>Trace ID:</strong> {trace.traceId}
      </p>

      {trace.steps.map((step, index) => {
        const isOpen = openStep === index;

        return (
          <div
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              marginBottom: 16,
              background: "#ffffff",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            }}
          >

            {/* HEADER */}
            <div
              style={{
                padding: "12px 16px",
                cursor: "pointer",
                background: isOpen ? "#e0f2fe" : "#ffffff",
                color: "#0f172a",
                fontWeight: 600,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onClick={() =>
                setOpenStep(isOpen ? null : index)
              }
            >
              <strong>
                Step {index + 1}: {step.name}
              </strong>{" "}
              {isOpen ? "▲" : "▼"}
            </div>

            {/* BODY */}
            {isOpen && (
              <div style={{ padding: 12 }}>
                {step.input && (
                  <>
                    <h4>Input</h4>
                    <pre>{JSON.stringify(step.input, null, 2)}</pre>
                  </>
                )}

                {step.rules && (
                  <>
                    <h4>Rules Applied</h4>
                    <pre>{JSON.stringify(step.rules, null, 2)}</pre>
                  </>
                )}

                {step.evaluations && (
                  <>
                    <h4>Evaluations</h4>
                    {step.evaluations.map((e: any) => (
                      <div
                        style={{
                          padding: 12,
                          marginBottom: 10,
                          borderRadius: 6,
                          background: e.qualified ? "#ecfeff" : "#fef2f2",
                          border: `1px solid ${e.qualified ? "#67e8f9" : "#fca5a5"}`,
                        }}
                      >

                        <strong>{e.subjectId}</strong>{" "}
                        {e.qualified ? "✅ PASSED" : "❌ FAILED"}

                        <pre>{JSON.stringify(e.checks, null, 2)}</pre>
                      </div>
                    ))}
                  </>
                )}

                {step.output && (
                  <>
                    <h4>Output</h4>
                    <pre>{JSON.stringify(step.output, null, 2)}</pre>
                  </>
                )}

                {step.reasoning && (
                  <>
                    <h4>Reasoning</h4>
                    <p>{step.reasoning}</p>
                  </>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default App;
