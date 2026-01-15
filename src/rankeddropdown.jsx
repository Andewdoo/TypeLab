import { useState } from 'react'
import './rankeddropdown.css'

export default function RankedDropdown({ userStats, progress, ranks, matchHistory, currentRank }) {
  const [isOpen, setIsOpen] = useState(true)
  const [tiersOpen, setTiersOpen] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)

  return (
    <div className="main-dropdown-card">
      <button
        className="main-dropdown-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="main-dropdown-preview">
          <div className="main-preview-info">
            <span className="main-preview-title">Player Stats</span>
          </div>
        </div>
        <span className={`dropdown-caret ${isOpen ? 'open' : ''}`}></span>
      </button>

      {isOpen && (
        <div className="main-dropdown-content">
          <div className="ranked-grid">
            {/* Rank Card */}
            <div className="rank-card">
              {/* Rank Display Sub-card */}
              <div className="rank-display-card">
                <div className="rank-icon" style={{ borderColor: '#FFD700' }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFD700" />
                  </svg>
                </div>
                <h2 className="rank-title">{userStats.rank}</h2>
                <p className="rank-rating">{userStats.rating} Rating</p>
              </div>

              <div className="rank-progress">
                <div className="progress-header">
                  <span>Progress to {userStats.nextRank}</span>
                  <span className="progress-text">{userStats.rating} / {userStats.ratingNeeded}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="stats-card">
              <h3>Season Stats</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-value">{userStats.wins}W - {userStats.losses}L</div>
                  <div className="stat-label">Record</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{userStats.winRate}%</div>
                  <div className="stat-label">Win Rate</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{userStats.bestWPM}</div>
                  <div className="stat-label">Best WPM</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{userStats.avgWPM}</div>
                  <div className="stat-label">Avg WPM</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{userStats.avgAccuracy}%</div>
                  <div className="stat-label">Avg Accuracy</div>
                </div>
              </div>
            </div>

            {/* Rank Tiers and Match History Main Card */}
            <div className="info-main-card">
              {/* Rank Tiers */}
              <div className="tiers-card">
                <button
                  className="dropdown-header"
                  onClick={() => setTiersOpen(!tiersOpen)}
                >
                  <div className="dropdown-preview">
                    <span className="dropdown-title">Rank Tiers</span>
                  </div>
                  <span className={`dropdown-caret ${tiersOpen ? 'open' : ''}`}></span>
                </button>

                {tiersOpen && (
                  <div className="dropdown-content">
                    <div className="tiers-list">
                      {ranks.map((rank, idx) => (
                        <div
                          key={idx}
                          className={`tier-item ${rank.name === 'Gold' ? 'current' : ''}`}
                        >
                          <div className="tier-dot" style={{ backgroundColor: rank.color }}></div>
                          <div className="tier-info">
                            <span className="tier-name">{rank.name}</span>
                            <span className="tier-range">{rank.range}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Match History */}
              <div className="play-card">
                <button
                  className="dropdown-header"
                  onClick={() => setHistoryOpen(!historyOpen)}
                >
                  <div className="dropdown-preview">
                    <span className="dropdown-title">Match History</span>
                  </div>
                  <span className={`dropdown-caret ${historyOpen ? 'open' : ''}`}></span>
                </button>

                {historyOpen && (
                  <div className="dropdown-content">
                    <div className="history-list">
                      {matchHistory.map((match) => (
                        <div key={match.id} className="history-item">
                          <div className={`match-result ${match.result.toLowerCase()}`}>
                            {match.result}
                          </div>
                          <div className="match-info">
                            <div className="match-opponent">vs {match.opponent}</div>
                            <div className="match-stats">{match.wpm} WPM • {match.accuracy}% • {match.date}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
