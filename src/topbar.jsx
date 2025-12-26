import { useState, useEffect, useRef } from 'react'
import './topbar.css'

export default function TopBar() {
  const [mode, setMode] = useState('light')
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
    const prev = document.body.style.backgroundColor
    document.body.style.backgroundColor = mode === 'light' ? '#f9fafb' : '#0f172a'
    return () => { document.body.style.backgroundColor = prev }
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
                <button className="menu-item" type="button">Sign out</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}