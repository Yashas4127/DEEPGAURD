export default function ConfidenceCircle({ value, label = 'Confidence' }) {
  const percent = Math.min(Math.max(value, 0), 100)

  return (
    <div className="confidence-ring" style={{ '--percent': `${percent}%` }}>
      <div className="confidence-ring-inner">
        <strong>{percent.toFixed(1)}%</strong>
        <span>{label}</span>
      </div>
    </div>
  )
}
