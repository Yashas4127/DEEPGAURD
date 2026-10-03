import { analyzeMedia as mockAnalyzeMedia } from './mockAnalysis.js'

export async function analyzeMedia(file) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockAnalyzeMedia(file))
    }, 350)
  })
}

export function mockAnalysis(file) {
  return mockAnalyzeMedia(file)
}
