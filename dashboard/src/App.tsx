import { traces } from "./data/traces";

function App() {
  const trace = traces[0];

  return (
    <div style={{ padding: 20 }}>
      <h1>X-Ray Debugger</h1>

      <h2>Trace: {trace.name}</h2>

      {trace.steps.map((step, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            padding: 12,
            marginBottom: 12,
          }}
        >
          <h3>
            Step {index + 1}: {step.name}
          </h3>

          {step.input && (
            <>
              <strong>Input</strong>
              <pre>{JSON.stringify(step.input, null, 2)}</pre>
            </>
          )}

          {step.rules && (
            <>
              <strong>Rules</strong>
              <pre>{JSON.stringify(step.rules, null, 2)}</pre>
            </>
          )}

          {step.evaluations && (
            <>
              <strong>Evaluations</strong>
              <pre>{JSON.stringify(step.evaluations, null, 2)}</pre>
            </>
          )}

          {step.output && (
            <>
              <strong>Output</strong>
              <pre>{JSON.stringify(step.output, null, 2)}</pre>
            </>
          )}

          {step.reasoning && (
            <>
              <strong>Reasoning</strong>
              <p>{step.reasoning}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
