import { useState, useEffect, useRef } from 'react'
import './topbar.css'
import { initTheme, applyTheme } from './dl.js'

export default function TopBar() {
  const [mode, setMode] = useState(() => initTheme())
  const [gameMode, setGameMode] = useState(() => 
    window.location.hash === '#/ranked' ? 'ranked' : 'practice'
  )
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('click', onDoc)
    return () => document.removeEventListener('click', onDoc)
  }, [])

  useEffect(() => {
    function onHashChange() {
      setGameMode(window.location.hash === '#/ranked' ? 'ranked' : 'practice')
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    applyTheme(mode)
  }, [mode])

  return (
    <header className="topbar" role="banner">
      <div className="topbar-inner">
        <div className="brand">
          <div className="logo" aria-hidden>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="6" fill="#111827" />
              <text x="12" y="16" fontSize="11" fontWeight="700" textAnchor="middle" fill="#fff" fontFamily="system-ui,Segoe UI,Roboto,Arial">T</text>
            </svg>
          </div>

          <div className="brand-text">
            <div className="app-name">TypeLab</div>
            <div className="app-sub">Dashboard</div>
          </div>
        </div>

        <div className="topbar-actions">
          <div className="mode-selector" role="toolbar" aria-label="Game mode">
            <button
              className={`seg ${gameMode === 'practice' ? 'active' : ''}`}
              onClick={() => window.location.hash = ''}
              type="button"
              aria-pressed={gameMode === 'practice'}
            >
              Practice
            </button>
            <button
              className={`seg ${gameMode === 'ranked' ? 'active' : ''}`}
              onClick={() => window.location.hash = '#/ranked'}
              type="button"
              aria-pressed={gameMode === 'ranked'}
            >
              Ranked
            </button>
          </div>

          <div className="mode-toggle" role="toolbar" aria-label="Theme selector">
            <button
              className={`seg ${mode === 'light' ? 'active' : ''}`}
              onClick={() => setMode('light')}
              type="button"
              aria-pressed={mode === 'light'}
            >
              Light
            </button>
            <button
              className={`seg ${mode === 'dark' ? 'active' : ''}`}
              onClick={() => setMode('dark')}
              type="button"
              aria-pressed={mode === 'dark'}
            >
              Dark
            </button>
          </div>

          <div className="profile" ref={ref}>
            <button
              className="avatar-btn"
              onClick={() => setOpen(o => !o)}
              aria-haspopup="menu"
              aria-expanded={open}
              type="button"
              title="Account"
            >
              <span className="avatar">AL</span>
            </button>

            {open && (
              <div className="profile-menu" role="menu">
                <div className="menu-item muted">Signed in as <strong>Ali</strong></div>
                <button className="menu-item" type="button">Profile</button>
                <button className="menu-item" type="button">Settings</button>
                <hr className="menu-sep" />
                <button className="menu-item" type="button" onClick={() => { window.location.hash = '#/signin'; setOpen(false) }}>Log in</button>
                <button
                  className="menu-item"
                  type="button"
                  onClick={() => { window.location.hash = '#/signup'; setOpen(false) }}
                >
                  Sign up
                </button>
                <hr className="menu-sep" />
                <button className="menu-item" type="button">Sign out</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}