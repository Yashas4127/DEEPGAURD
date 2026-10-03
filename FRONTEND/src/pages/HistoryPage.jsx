import { useMemo, useState } from 'react'
import { BarChart3, ScanLine, ShieldAlert, Trash2 } from 'lucide-react'
import ScanHistory from '../components/ScanHistory'

export default function HistoryPage({ history, setHistory }) {
  const [selectedRecord, setSelectedRecord] = useState(null)

  const stats = useMemo(() => {
    return {
      total: history.length,
      images: history.filter((item) => item.type === 'image').length,
      videos: history.filter((item) => item.type === 'video').length,
      fake: history.filter((item) => item.prediction === 'FAKE').length,
      real: history.filter((item) => item.prediction === 'REAL').length,
      inconclusive: history.filter((item) => item.prediction === 'INCONCLUSIVE').length,
    }
  }, [history])

  const handleDelete = (id) => {
    setHistory((previous) => previous.filter((entry) => entry.id !== id))
    setSelectedRecord((current) => (current && current.id === id ? null : current))
  }

  const handleClear = () => {
    setHistory([])
    setSelectedRecord(null)
  }

  return (
    <div className="page-shell container">
      <div className="section-head-row page-label-row">
        <div>
          <span className="eyebrow">Dashboard</span>
          <h1>FORENSIC EVIDENCE ARCHIVE</h1>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="stat-card">
          <span>Total Scans</span>
          <strong>{stats.total}</strong>
        </div>
        <div className="stat-card">
          <span>Images Analyzed</span>
          <strong>{stats.images}</strong>
        </div>
        <div className="stat-card">
          <span>Videos Analyzed</span>
          <strong>{stats.videos}</strong>
        </div>
        <div className="stat-card">
          <span>Fake Detected</span>
          <strong>{stats.fake}</strong>
        </div>
        <div className="stat-card">
          <span>Likely Authentic</span>
          <strong>{stats.real}</strong>
        </div>
        <div className="stat-card">
          <span>Inconclusive</span>
          <strong>{stats.inconclusive}</strong>
        </div>
      </div>

      <div className="activity-card">
        <div className="activity-head">
          <BarChart3 size={18} />
          <div>
            <span>AI ENGINE</span>
            <strong>ONLINE</strong>
          </div>
        </div>
        <div className="activity-meta">
          <div><span>MODEL</span> <strong>DeepGuard Vision v1</strong></div>
          <div><span>LAST SCAN</span> <strong>{history.length > 0 ? 'just now' : 'No previous scan'}</strong></div>
        </div>
      </div>

      <div className="history-layout">
        <ScanHistory
          history={history}
          onViewRecord={setSelectedRecord}
          onDeleteRecord={handleDelete}
          onClearHistory={handleClear}
        />

        {selectedRecord && (
          <aside className="history-detail-panel">
            <div className="section-head-row compact-row">
              <h3>Record Details</h3>
              <button type="button" className="ghost-button danger" onClick={() => handleDelete(selectedRecord.id)}>
                <Trash2 size={14} /> Delete
              </button>
            </div>

            <div className="detail-stack">
              <div className="detail-row">
                <span>Filename</span>
                <strong>{selectedRecord.filename}</strong>
              </div>
              <div className="detail-row">
                <span>Type</span>
                <strong>{selectedRecord.type}</strong>
              </div>
              <div className="detail-row">
                <span>Assessment</span>
                <strong>{selectedRecord.prediction === 'FAKE' ? 'LIKELY MANIPULATED' : selectedRecord.prediction === 'INCONCLUSIVE' ? 'INCONCLUSIVE' : 'LIKELY AUTHENTIC'}</strong>
              </div>
              <div className="detail-row">
                <span>Confidence</span>
                <strong>{selectedRecord.confidence.toFixed(1)}%</strong>
              </div>
              <div className="detail-row">
                <span>Date</span>
                <strong>{selectedRecord.date}</strong>
              </div>
            </div>

            <div className="detail-status">
              {selectedRecord.prediction === 'FAKE' ? <ShieldAlert size={18} /> : <ScanLine size={18} />}
              <span>{selectedRecord.prediction === 'FAKE' ? 'Manipulation likely detected' : 'Content appears authentic'}</span>
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}
