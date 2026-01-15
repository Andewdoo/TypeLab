import { useState } from 'react'
import './rankedui.css'
import LeaderboardDropdown from './leaderboarddropdown'
import RankedDropdown from './rankeddropdown'

export default function RankedUI() {
  const [userStats] = useState({
    rank: 'Gold III',
    rating: 1250,
    nextRank: 'Gold II',
    ratingNeeded: 1300,
    wins: 47,
    losses: 33,
    winRate: 58.8,
    bestWPM: 92,
    avgWPM: 78,
    avgAccuracy: 96.5
  })

  const [tiersOpen, setTiersOpen] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [mainDropdownOpen, setMainDropdownOpen] = useState(true)

  const progress = ((userStats.rating - 1200) / (userStats.ratingNeeded - 1200)) * 100

  const ranks = [
    { name: 'Bronze', color: '#CD7F32', range: '0-799' },
    { name: 'Silver', color: '#C0C0C0', range: '800-999' },
    { name: 'Gold', color: '#FFD700', range: '1000-1399' },
    { name: 'Platinum', color: '#E5E4E2', range: '1400-1799' },
    { name: 'Diamond', color: '#B9F2FF', range: '1800-2199' },
    { name: 'Master', color: '#9D4EDD', range: '2200-2599' },
    { name: 'Grandmaster', color: '#FF006E', range: '2600+' }
  ]

  const matchHistory = [
    { id: 1, result: 'Win', wpm: 85, accuracy: 97.2, opponent: 'Player123', date: '2 hours ago' },
    { id: 2, result: 'Win', wpm: 82, accuracy: 96.8, opponent: 'FastTyper', date: '5 hours ago' },
    { id: 3, result: 'Loss', wpm: 76, accuracy: 95.1, opponent: 'SpeedDemon', date: '1 day ago' },
    { id: 4, result: 'Win', wpm: 88, accuracy: 98.0, opponent: 'KeyMaster', date: '1 day ago' },
    { id: 5, result: 'Loss', wpm: 74, accuracy: 94.5, opponent: 'TypePro', date: '2 days ago' }
  ]

  const currentRank = ranks.find(r => r.name === 'Gold')

  return (
    <div className="ranked-container">
      <div className="ranked-header">
        <h1>Ranked Mode</h1>
        <p className="ranked-subtitle">Compete and climb the ranks</p>
      </div>

      <RankedDropdown 
        userStats={userStats}
        progress={progress}
        ranks={ranks}
        matchHistory={matchHistory}
        currentRank={currentRank}
      />
      <LeaderboardDropdown />
    </div>
  )
}
