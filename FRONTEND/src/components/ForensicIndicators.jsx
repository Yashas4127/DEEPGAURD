import { motion } from 'framer-motion'

export default function ForensicIndicators({ indicators }) {
  const entries = [
    { label: 'Face consistency', value: indicators?.faceConsistency ?? 0 },
    { label: 'Texture consistency', value: indicators?.textureConsistency ?? 0 },
    { label: 'Lighting consistency', value: indicators?.lightingConsistency ?? 0 },
    { label: 'Compression artifacts', value: indicators?.compressionArtifacts ?? 0 },
    { label: 'Edge artifacts', value: indicators?.edgeArtifacts ?? 0 },
  ]

  return (
    <div className="indicator-panel">
      <div className="section-title-row">
        <h3>Forensic Indicators</h3>
      </div>

      <div className="indicator-list">
        {entries.map((item) => (
          <div key={item.label} className="indicator-row">
            <div className="indicator-labels">
              <span>{item.label}</span>
              <strong>{item.value}%</strong>
            </div>
            <div className="bar-track">
              <motion.div
                className="bar-fill"
                initial={{ width: 0 }}
                animate={{ width: `${item.value}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
