import { useRef, useState } from 'react'
import { CloudUpload, FileImage, ShieldAlert } from 'lucide-react'

export default function UploadZone({ onSelectFile, inputRef }) {
  const internalRef = useRef(null)
  const resolvedRef = inputRef || internalRef
  const [isDragging, setIsDragging] = useState(false)

  const handleFile = (file) => {
    if (!file) return
    const validTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'video/mp4',
      'video/quicktime',
      'video/x-msvideo',
    ]

    const extension = file.name.split('.').pop()?.toLowerCase()
    const isValid = validTypes.includes(file.type) || ['jpg', 'jpeg', 'png', 'webp', 'mp4', 'mov', 'avi'].includes(extension)

    if (isValid && file.size <= 100 * 1024 * 1024) {
      onSelectFile(file)
    }
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragging(false)
    const droppedFile = event.dataTransfer.files?.[0]
    handleFile(droppedFile)
  }

  return (
    <div
      className={isDragging ? 'upload-zone dragging' : 'upload-zone'}
      onDragOver={(event) => {
        event.preventDefault()
        setIsDragging(true)
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          resolvedRef.current?.click()
        }
      }}
      aria-label="Upload media for forensic analysis"
    >
      <input
        ref={resolvedRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp,.mp4,.mov,.avi,image/jpeg,image/png,image/webp,video/mp4,video/quicktime,video/x-msvideo"
        hidden
        onChange={(event) => handleFile(event.target.files?.[0])}
      />

      <div className="upload-icon-wrap">
        <div className="upload-icon">
          <CloudUpload size={34} />
        </div>
      </div>

      <h3>MEDIA FORENSICS</h3>
      <p>Submit an image or video for authenticity analysis.</p>
      <div className="upload-subtitle">DROP DIGITAL EVIDENCE</div>
      <div className="upload-subtitle alt">Drag &amp; drop your file here or browse your device.</div>

      <button type="button" className="primary-button" onClick={() => resolvedRef.current?.click()}>
        SELECT FILE
      </button>

      <div className="upload-meta" aria-hidden="true">
        <span><FileImage size={14} /> JPG • PNG • WEBP</span>
        <span><ShieldAlert size={14} /> MP4 • MOV • AVI</span>
        <span>100 MB</span>
      </div>
    </div>
  )
}
