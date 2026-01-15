import { useState } from 'react'
import './leaderboard.css'

export default function Leaderboard() {
  const [timeFilter, setTimeFilter] = useState('all-time')
  const [isOpen, setIsOpen] = useState(false)

  const leaderboardData = [
    { rank: 1, username: 'TypeMaster', rating: 2850, tier: 'Grandmaster', avgWPM: 145, avgAccuracy: 99.2, wins: 523, color: '#FF006E' },
    { rank: 2, username: 'SpeedKing', rating: 2720, tier: 'Grandmaster', avgWPM: 138, avgAccuracy: 98.8, wins: 487, color: '#FF006E' },
    { rank: 3, username: 'KeyboardNinja', rating: 2590, tier: 'Master', avgWPM: 132, avgAccuracy: 98.5, wins: 412, color: '#9D4EDD' },
    { rank: 4, username: 'FastFingers', rating: 2480, tier: 'Master', avgWPM: 128, avgAccuracy: 97.9, wins: 389, color: '#9D4EDD' },
    { rank: 5, username: 'TypingGod', rating: 2350, tier: 'Master', avgWPM: 125, avgAccuracy: 97.5, wins: 356, color: '#9D4EDD' },
    { rank: 6, username: 'RapidTyper', rating: 2180, tier: 'Diamond', avgWPM: 118, avgAccuracy: 97.1, wins: 298, color: '#B9F2FF' },
    { rank: 7, username: 'QuickHands', rating: 2050, tier: 'Diamond', avgWPM: 115, avgAccuracy: 96.8, wins: 267, color: '#B9F2FF' },
    { rank: 8, username: 'SwiftKeys', rating: 1920, tier: 'Diamond', avgWPM: 110, avgAccuracy: 96.2, wins: 234, color: '#B9F2FF' },
    { rank: 9, username: 'ProTypist', rating: 1780, tier: 'Platinum', avgWPM: 105, avgAccuracy: 95.8, wins: 201, color: '#E5E4E2' },
    { rank: 10, username: 'EliteTyper', rating: 1650, tier: 'Platinum', avgWPM: 98, avgAccuracy: 95.2, wins: 178, color: '#E5E4E2' }
  ]

  const topPlayer = leaderboardData[0]

  return (
    <div className="leaderboard-container">
      <button 
        className="leaderboard-dropdown-header" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="leaderboard-preview">
          <span className="preview-icon">🏆</span>
          <div className="preview-info">
            <span className="preview-title">Global Leaderboard</span>
            <span className="preview-leader">Leader: {topPlayer.username} ({topPlayer.rating} Rating)</span>
          </div>
        </div>
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
        >
          <path d="M7 10L12 15L17 10H7Z" fill="currentColor" />
        </svg>
      </button>

      {isOpen && (
        <div className="leaderboard-content">
      <div className="leaderboard-header">
        <h2>Global Leaderboard</h2>
        <div className="time-filters">
          <button 
            className={`filter-btn ${timeFilter === 'today' ? 'active' : ''}`}
            onClick={() => setTimeFilter('today')}
          >
            Today
          </button>
          <button 
            className={`filter-btn ${timeFilter === 'week' ? 'active' : ''}`}
            onClick={() => setTimeFilter('week')}
          >
            This Week
          </button>
          <button 
            className={`filter-btn ${timeFilter === 'month' ? 'active' : ''}`}
            onClick={() => setTimeFilter('month')}
          >
            This Month
          </button>
          <button 
            className={`filter-btn ${timeFilter === 'all-time' ? 'active' : ''}`}
            onClick={() => setTimeFilter('all-time')}
          >
            All Time
          </button>
        </div>
      </div>

      <div className="leaderboard-table">
        <div className="table-header">
          <div className="col-rank">Rank</div>
          <div className="col-player">Player</div>
          <div className="col-rating">Rating</div>
          <div className="col-wpm">Avg WPM</div>
          <div className="col-accuracy">Accuracy</div>
          <div className="col-wins">Wins</div>
        </div>

        <div className="table-body">
          {leaderboardData.map((player) => (
            <div key={player.rank} className={`table-row ${player.rank <= 3 ? 'top-three' : ''}`}>
              <div className="col-rank">
                <div className={`rank-badge rank-${player.rank}`}>
                  {player.rank <= 3 ? (
                    <span className="medal">{player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : '🥉'}</span>
                  ) : (
                    <span className="rank-number">{player.rank}</span>
                  )}
                </div>
              </div>
              <div className="col-player">
                <div className="player-info">
                  <div className="player-name">{player.username}</div>
                  <div className="player-tier" style={{ color: player.color }}>
                    <div className="tier-dot" style={{ backgroundColor: player.color }}></div>
                    {player.tier}
                  </div>
                </div>
              </div>
              <div className="col-rating">
                <span className="rating-value">{player.rating}</span>
              </div>
              <div className="col-wpm">
                <span className="wpm-value">{player.avgWPM}</span>
              </div>
              <div className="col-accuracy">
                <span className="accuracy-value">{player.avgAccuracy}%</span>
              </div>
              <div className="col-wins">
                <span className="wins-value">{player.wins}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

        </div>
      )}
    </div>
  )
}
