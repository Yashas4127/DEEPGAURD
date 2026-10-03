import { AlertTriangle, CheckCircle2, Eye, Trash2, TriangleAlert } from 'lucide-react'

const getAssessmentLabel = (entry) => {
  if (entry.prediction === 'FAKE') return 'LIKELY MANIPULATED'
  if (entry.prediction === 'INCONCLUSIVE') return 'INCONCLUSIVE'
  return 'LIKELY AUTHENTIC'
}

export default function ScanHistory({ history, onViewRecord, onDeleteRecord, onClearHistory }) {
  return (
    <div className="history-panel">
      <div className="section-head-row">
        <h3>FORENSIC EVIDENCE ARCHIVE</h3>
        <button type="button" className="ghost-button danger" onClick={onClearHistory}>
          Clear History
        </button>
      </div>

      {history.length === 0 ? (
        <div className="empty-history">
          <p>No completed scans yet. Run a mock analysis to populate your forensic timeline.</p>
        </div>
      ) : (
        <div className="history-table-wrap">
          <table className="history-table">
            <thead>
              <tr>
                <th>Report ID</th>
                <th>Filename</th>
                <th>Type</th>
                <th>Assessment</th>
                <th>Confidence</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry) => {
                const assessment = getAssessmentLabel(entry)
                const toneClass = entry.prediction === 'FAKE' ? 'fake' : entry.prediction === 'INCONCLUSIVE' ? 'amber' : 'real'

                return (
                  <tr key={entry.id}>
                    <td>{entry.reportId || 'DG-2026-0000'}</td>
                    <td>{entry.filename}</td>
                    <td>{entry.type}</td>
                    <td>
                      <span className={`history-tag ${toneClass}`}>
                        {entry.prediction === 'FAKE' ? <AlertTriangle size={12} /> : entry.prediction === 'INCONCLUSIVE' ? <TriangleAlert size={12} /> : <CheckCircle2 size={12} />}
                        {assessment}
                      </span>
                    </td>
                    <td>{entry.confidence.toFixed(1)}%</td>
                    <td>{entry.date}</td>
                    <td>
                      <div className="table-actions">
                        <button type="button" className="mini-button" onClick={() => onViewRecord(entry)}>
                          <Eye size={14} /> View Result
                        </button>
                        <button type="button" className="mini-button danger" onClick={() => onDeleteRecord(entry.id)}>
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
