export default function AboutPage() {
  return (
    <div className="page-shell container about-page">
      <div className="section-head-row page-label-row">
        <div>
          <span className="eyebrow">About</span>
          <h1>ABOUT DEEPGUARD</h1>
        </div>
      </div>

      <div className="about-grid single-column">
        <div className="glass-panel">
          <h3>WHAT IS DEEPGUARD?</h3>
          <p>
            DeepGuard is an AI-assisted multimedia forensic platform designed to analyze images and videos for visual indicators associated with manipulation and synthetic media.
          </p>
        </div>

        <div className="glass-panel">
          <h3>THE PROBLEM</h3>
          <p>
            Modern AI tools can create realistic manipulated media, making it increasingly difficult to distinguish authentic content from altered or synthetic content.
          </p>
        </div>

        <div className="glass-panel">
          <h3>OUR APPROACH</h3>
          <p>
            DeepGuard processes uploaded media, analyzes visual characteristics using computer vision and deep learning, and produces a structured forensic-style assessment.
          </p>
        </div>
      </div>
    </div>
  )
}
