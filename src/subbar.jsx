import { useState, useEffect } from 'react'
import './subbar.css'

export default function SubBar() {
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)

  useEffect(() => {
    function onStats(e) {
      const d = e && e.detail ? e.detail : {}
      setWpm(Number.isFinite(d.wpm) ? d.wpm : 0)
      setAccuracy(typeof d.accuracy === 'number' ? d.accuracy : 100)
    }
    window.addEventListener('typing:stats', onStats)
    return () => window.removeEventListener('typing:stats', onStats)
  }, [])

  return (
    <div className="subbar" role="contentinfo" aria-label="Sub bar">
      <div className="subbar-inner">
        <div className="subbar-card">
          <div className="subbar-left">
            <div className="subbar-title">TypeLab Overview</div>
            <div className="subbar-sub">Session summary and quick actions</div>
          </div>

          <div className="subbar-stats" aria-hidden={false}>
            <div className="badge">
              <div className="stat-value">{wpm}</div>
              <div className="stat-label">WPM</div>
            </div>

            <div className="badge">
              <div className="stat-value">{accuracy}%</div>
              <div className="stat-label">Accuracy</div>
            </div>
          </div>

          <div className="subbar-actions" aria-hidden={false}>
            <button className="btn btn-ghost" type="button">New Session</button>
            <button className="btn" type="button">Stats</button>
            <button className="btn btn-primary" type="button">Start</button>
          </div>
        </div>
      </div>
    </div>
  )
}