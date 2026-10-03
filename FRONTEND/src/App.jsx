import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AnalyzePage from './pages/AnalyzePage'
import HowItWorksPage from './pages/HowItWorksPage'
import HistoryPage from './pages/HistoryPage'
import AboutPage from './pages/AboutPage'

const STORAGE_KEY = 'deepguard-history'

const readStoredHistory = () => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function App() {
  const [history, setHistory] = useState(readStoredHistory)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
  }, [history])

  const handleAnalysisComplete = (result) => {
    const newEntry = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      filename: result.filename || 'analysis_media',
      type: result.mediaType || result.type || 'image',
      prediction: result.prediction,
      confidence: Number(result.confidence || 0),
      reportId: result.reportId || `DG-2026-${String(Math.floor(Math.random() * 9000) + 1000)}`,
      date: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    }

    setHistory((previous) => [newEntry, ...previous])
  }

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />

        <main className="site-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/analyze" element={<AnalyzePage onAnalysisComplete={handleAnalysisComplete} />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/history" element={<HistoryPage history={history} setHistory={setHistory} />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
