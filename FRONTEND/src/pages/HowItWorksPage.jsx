import { motion } from 'framer-motion'
import { BrainCircuit, FileUp, ScanLine, ShieldCheck, Sparkles, Wand2 } from 'lucide-react'

const steps = [
  { title: 'Upload Media', description: 'Load an image or video into the DeepGuard workflow for forensic triage.', icon: FileUp },
  { title: 'Preprocessing', description: 'Normalize frames, inspect metadata, and isolate suspicious regions for review.', icon: Wand2 },
  { title: 'Face Detection', description: 'Identify faces, landmarks, and relevant local inconsistencies within the media signal.', icon: ScanLine },
  { title: 'Deep Learning Analysis', description: 'Evaluate texture, noise, and artifact patterns using a mock forensic scoring model.', icon: BrainCircuit },
  { title: 'Authenticity Score', description: 'Generate confidence-driven verdicts and likelihood estimates for manipulation.', icon: ShieldCheck },
  { title: 'Forensic Report', description: 'Visualize indicators, suspicious areas, and the overall evidence summary.', icon: Sparkles },
]

export default function HowItWorksPage() {
  return (
    <div className="page-shell container">
      <div className="section-head-row page-label-row">
        <div>
          <span className="eyebrow">Workflow</span>
          <h1>How It Works</h1>
        </div>
      </div>

      <div className="steps-grid">
        {steps.map(({ title, description, icon: Icon }, index) => (
          <motion.div
            key={title}
            className="step-card"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          >
            <div className="step-number">Step {index + 1}</div>
            <div className="step-icon"><Icon size={22} /></div>
            <h3>{title}</h3>
            <p>{description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
