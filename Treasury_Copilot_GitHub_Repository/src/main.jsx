import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const money = (value, currency = "KES") => new Intl.NumberFormat("en-KE", { style: "currency", currency, maximumFractionDigits: 0 }).format(value);

function Icon({ name }) {
  const paths = {
    shield: <><path d="M12 3 5 6v5c0 4.6 2.8 7.7 7 10 4.2-2.3 7-5.4 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-5"/></>,
    spark: <><path d="m12 3 1.3 4.2L17.5 8.5l-4.2 1.3L12 14l-1.3-4.2-4.2-1.3 4.2-1.3L12 3Z"/><path d="m18 15 .8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8L18 15Z"/></>,
    evidence: <><path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h8M8 16h5"/></>,
    arrow: <><path d="M5 12h14"/><path d="m14 7 5 5-5 5"/></>
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}

function App() {
  const [snapshot, setSnapshot] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState("live");
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState("");

  useEffect(() => { fetch("/api/fixture").then((r) => r.json()).then(setSnapshot).catch(() => setError("The sanitized demonstration snapshot could not be loaded.")); }, []);

  async function runAnalysis() {
    if (!snapshot) return;
    setLoading(true); setError(""); setResult(null); setSelectedQuestion("");
    try {
      const response = await fetch("/api/analyze", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ snapshot, mode: mode === "fallback" ? "fallback" : "live" }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Analysis failed");
      setResult(data);
    } catch (e) { setError(`${e.message}. The Treasury Management Platform state was not changed.`); }
    finally { setLoading(false); }
  }

  const evidence = snapshot?.evidence.find((x) => x.evidenceId === selectedEvidence);
  const currency = snapshot?.reconciliation.currency || "KES";
  const followUps = result ? [
    {
      question: "Why is this not ready for approval?",
      answer: `${result.facts.blockerCount} validated blockers remain: a ${money(result.facts.closingDifference, currency)} closing difference, ${result.facts.unmatchedBankCount} unmatched bank lines, ${result.facts.unmatchedSystemCount} unmatched system line and ${result.facts.pendingAdjustmentCount} pending adjustment. The existing Treasury Management Platform workflow must resolve them before approval.`,
      evidenceIds: result.brief.evidenceIds
    },
    {
      question: "Which exception needs attention first?",
      answer: result.brief.findings[0]?.explanation || "No prioritised exception is available.",
      evidenceIds: result.brief.findings[0]?.evidenceIds || []
    },
    {
      question: "What should management know?",
      answer: result.brief.executiveSummary,
      evidenceIds: result.brief.evidenceIds
    }
  ] : [];
  const followUp = followUps.find((item) => item.question === selectedQuestion);

  return <main>
    <header className="topbar">
      <div className="brand"><span className="brandmark">TC</span><div><strong>Treasury Copilot</strong><small>Intelligence for the Treasury Management Platform</small></div></div>
      <div className="readonly"><Icon name="shield"/> Read-only</div>
    </header>

    <section className="contextbar">
      <div><small>Organisation</small><strong>{snapshot?.requestContext.organisationId || "Loading…"}</strong></div>
      <div><small>Reconciliation</small><strong>{snapshot?.requestContext.reconciliationId || "—"}</strong></div>
      <div><small>Account</small><strong>{snapshot ? `${snapshot.reconciliation.bankName} ${snapshot.reconciliation.maskedAccountNumber}` : "—"}</strong></div>
      <div><small>Period</small><strong>{snapshot?.reconciliation.statementEndDate || "—"}</strong></div>
      <div><small>Status</small><strong className="status">{snapshot?.reconciliation.status || "—"}</strong></div>
    </section>

    <aside className="demo-disclosure" aria-label="Synthetic demonstration disclosure">
      <strong>Synthetic hackathon demo</strong>
      <span>Sanitized KES scenario only — not an actual account or live extract from the frozen production workbook.</span>
    </aside>

    {!result && <section className="welcome">
      <div className="intro">
        <span className="eyebrow">Reconciliation Intelligence Brief</span>
        <h1>Turn a reconciliation into a decision-ready brief.</h1>
        <p>Treasury Copilot checks the figures, prioritises exceptions and explains what needs attention—without changing a single accounting record.</p>
        <div className="mode-control" role="group" aria-label="Analysis mode">
          <button className={mode === "live" ? "active" : ""} onClick={() => setMode("live")}>OpenAI analysis</button>
          <button className={mode === "fallback" ? "active" : ""} onClick={() => setMode("fallback")}>Deterministic fallback</button>
        </div>
        <button className="primary" onClick={runAnalysis} disabled={!snapshot || loading}><Icon name="spark"/>{loading ? "Analysing securely…" : "Analyse reconciliation"}</button>
        <p className="assurance"><Icon name="shield"/> Organisation-scoped • Evidence-grounded • Maker-checker preserved</p>
      </div>
      <aside className="preview">
        <div className="preview-header"><span>What Copilot will assess</span><span>01 / 04</span></div>
        <ol>
          <li><b>01</b><div><strong>Closing position</strong><span>Statement and system balances</span></div></li>
          <li><b>02</b><div><strong>Unmatched activity</strong><span>Bank and system exceptions</span></div></li>
          <li><b>03</b><div><strong>Workflow blockers</strong><span>Adjustments and control status</span></div></li>
          <li><b>04</b><div><strong>Management narrative</strong><span>Clear, traceable next actions</span></div></li>
        </ol>
      </aside>
    </section>}

    {error && <div className="error" role="alert">{error}</div>}

    {result && <section className="results">
      <div className="results-head">
        <div><span className="eyebrow">Evidence-backed conclusion</span><h1>{result.brief.headline}</h1></div>
        <button className="secondary" onClick={() => setResult(null)}>New analysis</button>
      </div>
      <div className="metricstrip">
        <div><small>Closing difference</small><strong>{money(result.facts.closingDifference, currency)}</strong></div>
        <div><small>Unmatched bank lines</small><strong>{result.facts.unmatchedBankCount}</strong></div>
        <div><small>Pending adjustments</small><strong>{result.facts.pendingAdjustmentCount}</strong></div>
        <div><small>Approval readiness</small><strong className="notready">{result.facts.readyForApproval ? "Ready" : "Not ready"}</strong></div>
      </div>
      <div className="result-grid">
        <section className="brief">
          <h2>Executive summary</h2><p>{result.brief.executiveSummary}</p>
          <h2>Priority findings</h2>
          <div className="findings">{result.brief.findings.map((finding, i) => <article key={finding.findingId}>
            <div className={`priority ${finding.priority}`}>{String(i + 1).padStart(2, "0")}</div>
            <div><div className="finding-label"><span>{finding.category}</span><span>{finding.confidence} confidence</span></div><h3>{finding.title}</h3><p>{finding.explanation}</p><small>{finding.implication}</small>
              <div className="evidence-links">{finding.evidenceIds.map((id) => <button key={id} onClick={() => setSelectedEvidence(id)}><Icon name="evidence"/>{id}</button>)}</div>
            </div>
          </article>)}</div>
        </section>
        <aside className="actions">
          <h2>Recommended next steps</h2>
          {result.brief.recommendations.map((rec, i) => <div className="action" key={i}><span>{i + 1}</span><div><strong>{rec.action}</strong><small>{rec.ownerRole} · {rec.urgency.replaceAll("_", " ")}</small></div></div>)}
          <div className="validation"><Icon name="shield"/><div><strong>Validation passed</strong><span>Schema, evidence IDs and numeric claims checked</span></div></div>
          <div className="telemetry"><span>{result.telemetry.fallbackUsed ? "Fallback brief" : "OpenAI structured brief"}</span><span>{result.telemetry.responseTimeMs} ms</span></div>
        </aside>
      </div>
      <section className="followups" aria-labelledby="followup-title">
        <div className="followup-heading"><div><span className="eyebrow">Guided follow-up</span><h2 id="followup-title">Ask the validated brief</h2></div><small>No additional API call</small></div>
        <div className="question-list">{followUps.map((item) => <button key={item.question} className={selectedQuestion === item.question ? "active" : ""} onClick={() => setSelectedQuestion(item.question)}>{item.question}<Icon name="arrow"/></button>)}</div>
        {followUp && <div className="followup-answer" role="status"><p>{followUp.answer}</p><div className="evidence-links">{followUp.evidenceIds.slice(0, 5).map((id) => <button key={id} onClick={() => setSelectedEvidence(id)}><Icon name="evidence"/>{id}</button>)}</div></div>}
      </section>
    </section>}

    {evidence && <div className="drawer-backdrop" onClick={() => setSelectedEvidence(null)}><aside className="drawer" onClick={(e) => e.stopPropagation()}>
      <button className="close" onClick={() => setSelectedEvidence(null)} aria-label="Close">×</button><span className="eyebrow">Evidence record</span><h2>{evidence.label}</h2>
      <dl><dt>Evidence ID</dt><dd>{evidence.evidenceId}</dd><dt>Source</dt><dd>{evidence.sourceType}</dd><dt>Status</dt><dd>{evidence.status || "—"}</dd><dt>Date</dt><dd>{evidence.date || "—"}</dd><dt>Amount</dt><dd>{evidence.amount == null ? "—" : money(evidence.amount, evidence.currency)}</dd></dl>
      <p>This sanitized synthetic record was created solely for hackathon testing. It is not an actual account or live production-workbook extract. OpenAI receives no full account number, password, personal user fields or raw imported text.</p>
    </aside></div>}
  </main>;
}

createRoot(document.getElementById("root")).render(<React.StrictMode><App/></React.StrictMode>);
