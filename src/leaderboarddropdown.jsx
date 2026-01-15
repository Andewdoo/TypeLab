import { useState } from 'react'
import './leaderboarddropdown.css'
import Leaderboard from './leaderboard'

export default function LeaderboardDropdown() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="leaderboard-dropdown-card">
      <button 
        className="leaderboard-dropdown-header" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="leaderboard-dropdown-preview">
          <div className="leaderboard-preview-info">
            <span className="leaderboard-preview-title">Leaderboards</span>
          </div>
        </div>
        <span className={`dropdown-caret ${isOpen ? 'open' : ''}`}></span>
      </button>
      
      {isOpen && (
        <div className="leaderboard-dropdown-content">
          <Leaderboard />
        </div>
      )}
    </div>
  )
}
