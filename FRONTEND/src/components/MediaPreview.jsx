import { useEffect, useState } from 'react'
import { Image as ImageIcon, Video, X } from 'lucide-react'

const formatBytes = (bytes) => {
  if (!bytes) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
  const value = bytes / 1024 ** index
  return `${value.toFixed(value >= 10 || index === 0 ? 0 : 1)} ${units[index]}`
}

export default function MediaPreview({ file, previewUrl, onRemove, onAnalyze }) {
  const [dimensions, setDimensions] = useState('—')
  const isVideo = file?.type?.startsWith('video/')

  useEffect(() => {
    if (!file || !previewUrl || !file.type.startsWith('image/')) return

    const image = new Image()
    image.onload = () => {
      setDimensions(`${image.width} × ${image.height}`)
    }
    image.src = previewUrl
  }, [file, previewUrl])

  return (
    <div className="media-preview-shell">
      <div className="media-preview-frame">
        {isVideo ? (
          <video src={previewUrl} controls playsInline className="media-preview-video" />
        ) : (
          <img src={previewUrl} alt={file?.name || 'Uploaded media preview'} className="media-preview-image" />
        )}
      </div>

      <div className="preview-meta-row">
        <div className="evidence-meta-grid">
          <div className="meta-block-item">
            <span>EVIDENCE FILE</span>
            <strong>{file?.name || 'media'}</strong>
          </div>
          <div className="meta-block-item">
            <span>MEDIA TYPE</span>
            <strong>{isVideo ? 'Video' : 'Image'}</strong>
          </div>
          <div className="meta-block-item">
            <span>FILE SIZE</span>
            <strong>{formatBytes(file?.size || 0)}</strong>
          </div>
          <div className="meta-block-item">
            <span>RESOLUTION</span>
            <strong>{dimensions || '—'}</strong>
          </div>
          <div className="meta-block-item status-item">
            <span>STATUS</span>
            <strong>READY FOR ANALYSIS</strong>
          </div>
        </div>

        <div className="preview-actions">
          <button type="button" className="ghost-button" onClick={onRemove}>
            <X size={14} /> REMOVE
          </button>
          <button type="button" className="primary-button" onClick={onAnalyze}>
            {isVideo ? <Video size={16} /> : <ImageIcon size={16} />} BEGIN FORENSIC ANALYSIS
          </button>
        </div>
      </div>
    </div>
  )
}
