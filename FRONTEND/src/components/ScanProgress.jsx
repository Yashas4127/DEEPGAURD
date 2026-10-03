import { motion } from 'framer-motion'
import { useMemo } from 'react'

const defaultSteps = [
  { label: 'MEDIA VALIDATION', status: 'complete' },
  { label: 'FRAME EXTRACTION', status: 'complete' },
  { label: 'FACE DETECTION', status: 'running' },
  { label: 'VISUAL ANALYSIS', status: 'waiting' },
  { label: 'MODEL INFERENCE', status: 'waiting' },
  { label: 'AUTHENTICITY ASSESSMENT', status: 'waiting' },
]

function useAnimatedValue(target) {
  return target
}

export default function ScanProgress({ isScanning, result }) {
  const steps = useMemo(() => {
    if (!isScanning && !result) return defaultSteps

    const active = [
      { label: 'MEDIA VALIDATION', status: 'complete' },
      { label: 'FRAME EXTRACTION', status: 'complete' },
      { label: 'FACE DETECTION', status: isScanning ? 'running' : 'complete' },
      { label: 'VISUAL ANALYSIS', status: isScanning ? 'waiting' : 'complete' },
      { label: 'MODEL INFERENCE', status: isScanning ? 'waiting' : 'complete' },
      { label: 'AUTHENTICITY ASSESSMENT', status: isScanning ? 'waiting' : 'complete' },
    ]

    return active
  }, [isScanning, result])

  const frames = useAnimatedValue(result?.framesAnalyzed || 120)
  const faces = useAnimatedValue(result?.facesDetected || 2)
  const artifacts = useAnimatedValue(result?.artifactsDetected || 7)
  const confidence = useAnimatedValue(result?.confidence || 87.4)
  const processing = isScanning ? 67 : 100

  return (
    <aside className="scan-progress-panel">
      <div className="progress-header">
        <span className="eyebrow">Pipeline</span>
        <span className="live-tag">{isScanning ? 'LIVE' : 'READY'}</span>
      </div>

      <div className="scan-identity-row">
        <div><span>EVIDENCE ID</span><strong>DG-2026-XXXX</strong></div>
        <div><span>ANALYSIS MODE</span><strong>FORENSIC</strong></div>
      </div>

      <div className="progress-list">
        {steps.map((step, index) => (
          <div key={step.label} className={`progress-item ${step.status}`}>
            <span className="step-index">{String(index + 1).padStart(2, '0')}</span>
            <div className="step-copy">
              <strong>{step.label}</strong>
              <span>{step.status === 'complete' ? '✓ Completed' : step.status === 'running' ? '● Processing' : '○ Waiting'}</span>
            </div>
            <span className="step-bullet" aria-hidden="true" />
          </div>
        ))}
      </div>

      <div className="scan-metrics-grid">
        <div>
          <span className="metric-label">FRAME</span>
          <strong>{String(Math.min(Math.round(frames), 120)).padStart(3, '0')} / 120</strong>
        </div>
        <div>
          <span className="metric-label">FACES DETECTED</span>
          <strong>{String(Math.round(faces)).padStart(2, '0')}</strong>
        </div>
        <div>
          <span className="metric-label">ARTIFACTS</span>
          <strong>{String(Math.round(artifacts)).padStart(2, '0')}</strong>
        </div>
        <div>
          <span className="metric-label">MODEL CONFIDENCE</span>
          <strong>{confidence.toFixed(1)}%</strong>
        </div>
      </div>

      <div className="processing-bar-wrap">
        <div className="processing-meta">
          <span>PROCESSING</span>
          <strong>{Math.round(processing)}%</strong>
        </div>
        <div className="processing-bar">
          <motion.div
            className="processing-fill"
            initial={{ width: 0 }}
            animate={{ width: `${processing}%` }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          />
        </div>
      </div>

      <motion.div className="meta-block" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div><span>MODEL</span> <strong>DeepGuard Vision v1</strong></div>
        <div><span>ENGINE</span> <strong>PyTorch</strong></div>
        <div><span>ANALYSIS MODE</span> <strong>FORENSIC</strong></div>
      </motion.div>
    </aside>
  )
}
