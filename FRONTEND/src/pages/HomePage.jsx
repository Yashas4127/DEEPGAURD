import { motion } from 'framer-motion'
import { ArrowRight, Gauge, Radar, ShieldCheck, Cpu } from 'lucide-react'
import { Link } from 'react-router-dom'

const featureCards = [
  { title: 'Threat coverage', value: 'Image + video', icon: Radar },
  { title: 'Signal engine', value: 'Synthetic artifact checks', icon: Cpu },
  { title: 'Operational readout', value: 'Forensic confidence scoring', icon: Gauge },
]

export default function HomePage() {
  return (
    <div className="page-shell home-page">
      <section className="hero-section container">
        <div className="hero-copy">
          <div className="live-indicator">
            <span className="status-dot" /> AI ENGINE ONLINE
          </div>
          <h1>VERIFY WHAT YOU SEE.</h1>
          <p>
            AI-assisted forensic analysis for detecting potentially manipulated images and videos.
          </p>
          <p className="supporting-copy">
            Upload digital media and receive an AI-assisted forensic assessment with visual indicators and a detailed report.
          </p>
          <div className="hero-actions">
            <Link to="/analyze" className="primary-button">
              Analyze Media <ArrowRight size={16} />
            </Link>
            <Link to="/how-it-works" className="secondary-button">
              Explore Technology
            </Link>
          </div>
        </div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="hero-window">
            <div className="window-bar">
              <span />
              <span />
              <span />
            </div>
            <div className="window-grid" />
            <div className="window-scan" />
            <div className="window-overlay" />
            <div className="window-metric top-left">LIVE SIGNAL</div>
            <div className="window-metric top-right">98.2% INTEGRITY</div>
            <div className="window-metric bottom-left">AI TRACE</div>
            <div className="window-metric bottom-right">FORENSIC</div>
          </div>
        </motion.div>
      </section>

      <section className="feature-strip container">
        {featureCards.map(({ title, value, icon: Icon }) => (
          <div key={title} className="feature-card">
            <div className="feature-icon"><Icon size={18} /></div>
            <div>
              <span>{title}</span>
              <strong>{value}</strong>
            </div>
          </div>
        ))}
      </section>

      <section className="value-section container">
        <div className="value-copy">
          <span className="eyebrow">Mission</span>
          <h2>Monitoring authenticity in a manipulated media landscape.</h2>
          <p>
            DeepGuard provides a professional interface for evidence-style media verification, helping analysts review suspicious artifacts,
            synthetic traces, and low-confidence face or frame anomalies before a final determination.
          </p>
        </div>

        <div className="status-panels">
          <div className="mini-panel">
            <ShieldCheck size={18} />
            <div>
              <span>Integrity review</span>
              <strong>High-fidelity forensic scan</strong>
            </div>
          </div>
          <div className="mini-panel">
            <Radar size={18} />
            <div>
              <span>Media mapping</span>
              <strong>Artifact and face consistency</strong>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
