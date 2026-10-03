import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Printer } from 'lucide-react'
import { Link } from 'react-router-dom'
import UploadZone from '../components/UploadZone'
import MediaPreview from '../components/MediaPreview'
import Scanner from '../components/Scanner'
import ResultCard from '../components/ResultCard'
import ForensicIndicators from '../components/ForensicIndicators'
import { analyzeMedia as analyzeMockMedia } from '../services/api'

export default function AnalyzePage({ onAnalysisComplete }) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState(null)
  const inputRef = useRef(null)

  const previewUrl = useMemo(() => {
    if (!selectedFile) return ''
    return URL.createObjectURL(selectedFile)
  }, [selectedFile])

  useEffect(() => {
    return () => {
      if (previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const handleFileSelection = (file) => {
    setSelectedFile(file)
    setScanResult(null)
    setIsScanning(false)
  }

  const handleRemove = () => {
    setSelectedFile(null)
    setScanResult(null)
    setIsScanning(false)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const getReportId = () => `DG-2026-${String(Math.floor(Math.random() * 9000) + 1000)}`

  const downloadReport = () => {
    if (!scanResult) return

    const reportText = `DEEPGUARD\nFORENSIC MEDIA ANALYSIS REPORT\nReport ID: ${scanResult.reportId}\nAnalysis Date: ${new Date(scanResult.analysisDate).toLocaleString()}\n\nEVIDENCE INFORMATION\nFilename: ${scanResult.filename}\nMedia Type: ${scanResult.mediaType}\nFile Size: ${scanResult.fileSize || '—'}\nResolution: ${scanResult.resolution || '—'}\nFrames Analyzed: ${scanResult.framesAnalyzed}\nFaces Detected: ${scanResult.facesDetected}\n\nAUTHENTICITY ASSESSMENT\n${scanResult.assessment}\n${scanResult.confidence.toFixed(1)}% MODEL CONFIDENCE\n\nFORENSIC INDICATORS\nFace Consistency: ${scanResult.indicators.faceConsistency}%\nTexture Consistency: ${scanResult.indicators.textureConsistency}%\nLighting Consistency: ${scanResult.indicators.lightingConsistency}%\nEdge Consistency: ${scanResult.indicators.edgeArtifacts}%\nCompression Artifacts: ${scanResult.indicators.compressionArtifacts}%\n\nSUMMARY\n${scanResult.note}`

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${scanResult.filename || 'deepguard-report'}.txt`
    link.click()
    URL.revokeObjectURL(url)
  }

  const printReport = () => {
    window.print()
  }

  const startAnalysis = async () => {
    if (!selectedFile) return

    setIsScanning(true)
    const result = await analyzeMockMedia(selectedFile)

    setTimeout(() => {
      const report = {
        ...result,
        filename: selectedFile.name,
        type: selectedFile.type.startsWith('video/') ? 'video' : 'image',
        mediaType: selectedFile.type.startsWith('video/') ? 'video' : 'image',
        reportId: getReportId(),
        analysisDate: new Date().toISOString(),
        fileSize: `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`,
        resolution: selectedFile.type.startsWith('image/') ? '—' : '—',
        framesAnalyzed: result.framesAnalyzed || 120,
        facesDetected: result.facesDetected || 2,
      }

      setScanResult(report)
      setIsScanning(false)
      onAnalysisComplete(report)
    }, 5600)
  }

  return (
    <div className="page-shell analyze-page container">
      <div className="section-head-row page-label-row">
        <div>
          <span className="eyebrow">Media forensics</span>
          <h1>MEDIA FORENSICS</h1>
        </div>
      </div>

      <p className="lead-copy">Submit digital media for authenticity analysis.</p>

      {!selectedFile && <UploadZone onSelectFile={handleFileSelection} inputRef={inputRef} />}

      {selectedFile && !isScanning && !scanResult && (
        <MediaPreview file={selectedFile} previewUrl={previewUrl} onRemove={handleRemove} onAnalyze={startAnalysis} />
      )}

      {(isScanning || scanResult) && (
        <div className="analysis-workflow">
          <Scanner file={selectedFile} previewUrl={previewUrl} isScanning={isScanning} result={scanResult} />

          {scanResult && (
            <>
              <div className="report-actions">
                <button type="button" className="primary-button" onClick={downloadReport}>
                  <Download size={16} /> DOWNLOAD REPORT
                </button>
                <button type="button" className="secondary-button" onClick={printReport}>
                  <Printer size={16} /> PRINT REPORT
                </button>
                <button type="button" className="ghost-button" onClick={handleRemove}>
                  NEW ANALYSIS
                </button>
                <Link to="/history" className="ghost-button">VIEW HISTORY</Link>
              </div>

              <motion.div
                className="report-grid"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ResultCard result={scanResult} />
                <ForensicIndicators indicators={scanResult.indicators} />

                <div className="suspicious-panel">
                  <div className="section-title-row">
                    <h3>SUSPICIOUS REGION ANALYSIS</h3>
                  </div>
                  <div className="suspicious-viewport">
                    {selectedFile?.type?.startsWith('video/') ? (
                      <video src={previewUrl} className="suspicious-media" playsInline muted loop autoPlay />
                    ) : (
                      <img src={previewUrl} alt="Suspicious region overlay preview" className="suspicious-media" />
                    )}
                    <div className="heat-overlay" />
                    <div className="bounding-box box-one">REGION 01<br />HIGH ANOMALY</div>
                    <div className="bounding-box box-two">REGION 02<br />MODERATE ANOMALY</div>
                    <div className="demo-tag">DEMONSTRATION VISUALIZATION</div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </div>
      )}

      {!selectedFile && !isScanning && !scanResult && (
        <div className="info-grid compact-grid" aria-hidden="true" />
      )}
    </div>
  )
}
