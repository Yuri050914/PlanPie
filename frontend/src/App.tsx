import { useState, useEffect } from 'react'
import Notes from './components/Notes'

function App() {
  const [apiStatus, setApiStatus] = useState<string>('Checking...')
  const [currentView, setCurrentView] = useState<'home' | 'notes'>('home')

  useEffect(() => {
    // Test backend connection
    fetch('http://localhost:5000/api/health')
      .then(res => res.json())
      .then(data => setApiStatus(data.message))
      .catch(() => setApiStatus('Backend connection failed'))
  }, [])

  if (currentView === 'notes') {
    return <Notes />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-blue to-soft-purple">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">
            Plan<span className="text-neon-blue">Pie</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your comprehensive productivity companion
          </p>
          
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto mb-8">
            <h2 className="text-2xl font-semibold mb-4">System Status</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Frontend:</span>
                <span className="text-green-600 font-semibold">✅ Running</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Backend:</span>
                <span className={apiStatus.includes('running') ? 'text-green-600' : 'text-red-600'}>
                  {apiStatus.includes('running') ? '✅' : '❌'} {apiStatus}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <button
              onClick={() => setCurrentView('notes')}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            >
              <h3 className="text-lg font-semibold mb-2">📝 Notes</h3>
              <p className="text-gray-600">Capture your thoughts</p>
            </button>
            <div className="bg-white rounded-lg p-6 shadow-md opacity-50">
              <h3 className="text-lg font-semibold mb-2">⏰ Pomodoro</h3>
              <p className="text-gray-600">Focus timer (Coming Soon)</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md opacity-50">
              <h3 className="text-lg font-semibold mb-2">📅 Calendar</h3>
              <p className="text-gray-600">Schedule events (Coming Soon)</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md opacity-50">
              <h3 className="text-lg font-semibold mb-2">🤖 AI Tasks</h3>
              <p className="text-gray-600">Smart prioritization (Coming Soon)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
