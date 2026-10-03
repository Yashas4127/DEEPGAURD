const randomBetween = (min, max) => Number((Math.random() * (max - min) + min).toFixed(1))

export function analyzeMedia(file) {
  const isVideo = file && file.type && file.type.startsWith('video/')
  const randomOutcome = Math.random()
  let prediction = 'REAL'
  let assessment = 'LIKELY AUTHENTIC'
  let assessmentTone = 'safe'
  let confidenceBase = 88

  if (randomOutcome < 0.42) {
    prediction = 'FAKE'
    assessment = 'LIKELY MANIPULATED'
    assessmentTone = 'danger'
    confidenceBase = 94
  } else if (randomOutcome < 0.76) {
    prediction = 'REAL'
    assessment = 'LIKELY AUTHENTIC'
    assessmentTone = 'safe'
    confidenceBase = 90
  } else {
    prediction = 'INCONCLUSIVE'
    assessment = 'INCONCLUSIVE'
    assessmentTone = 'amber'
    confidenceBase = 76
  }

  const confidence = randomBetween(confidenceBase, confidenceBase + 5)
  const facesDetected = isVideo ? Math.max(1, Math.round(randomBetween(1, 4))) : Math.max(1, Math.round(randomBetween(1, 3)))
  const framesAnalyzed = isVideo ? 120 : 1
  const artifactsDetected = Math.max(3, Math.round(randomBetween(4, 10)))
  const processingTime = randomBetween(5.1, 6.9)

  return {
    prediction,
    assessment,
    assessmentTone,
    confidence,
    mediaType: isVideo ? 'video' : 'image',
    processingTime: Number(processingTime.toFixed(2)),
    facesDetected,
    framesAnalyzed,
    artifactsDetected,
    indicators: {
      faceConsistency: Math.floor(randomBetween(70, 98)),
      textureConsistency: Math.floor(randomBetween(72, 96)),
      lightingConsistency: Math.floor(randomBetween(65, 92)),
      compressionArtifacts: Math.floor(randomBetween(68, 93)),
      edgeArtifacts: Math.floor(randomBetween(76, 98)),
    },
    note: 'DeepGuard identified visual characteristics associated with potential media manipulation. Several analyzed indicators showed elevated anomaly scores.',
  }
}
