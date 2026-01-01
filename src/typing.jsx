import { useState, useEffect, useRef } from 'react'
import './typing.css'

const SENTENCES = [
  "The quick brown fox jumps over the lazy dog.",
  "Practice makes progress.",
  "Typing is a practical skill improved by short drills.",
  "Clear sections help you focus on the task."
]

const WORD_BANK = [
  "the","quick","brown","fox","jumps","over","the","lazy","dog",
  "practice","makes","progress","typing","speed","accuracy","focus",
  "keyboard","words","sentences","simple","steady","practice","daily"
]

export default function TypingCard() {
  const [sample, setSample] = useState(SENTENCES.join(' '))
  const [gameMode, setGameMode] = useState('sentences') // 'sentences' | 'words'
  const [timeLimit, setTimeLimit] = useState(null) // seconds, null = infinite
  const [value, setValue] = useState('')
  const [start, setStart] = useState(null)
  const [elapsed, setElapsed] = useState(0)
  const [finished, setFinished] = useState(false)

  const inputRef = useRef(null)
  const displayRef = useRef(null)
  const intervalRef = useRef(null)
  const endTimeoutRef = useRef(null)
  const trackerRef = useRef(null)

  // build sample when mode changes
  useEffect(() => {
    if (gameMode === 'sentences') {
      setSample(SENTENCES.join(' '))
    } else {
      const words = []
      for (let i = 0; i < 120; i++) {
        words.push(WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)])
      }
      setSample(words.join(' ') + '.')
    }
    resetInternal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameMode])

  // keep display scroll synced with hidden textarea
  useEffect(() => {
    if (inputRef.current && displayRef.current) {
      displayRef.current.scrollTop = inputRef.current.scrollTop
      displayRef.current.scrollLeft = inputRef.current.scrollLeft
    }
  }, [value, elapsed])

  // render words (existing logic relies on SAMPLE -> use sample)
  const typed = Array.from(value)

  // Update tracker position based on current character
  useEffect(() => {
    if (!displayRef.current) return
    
    const trackerEl = displayRef.current.querySelector('.tracker')
    if (!trackerEl) return
    
    const currentCharEl = displayRef.current.querySelector('.char.current')
    
    if (currentCharEl) {
      const charRect = currentCharEl.getBoundingClientRect()
      const displayRect = displayRef.current.getBoundingClientRect()
      const left = charRect.left - displayRect.left + displayRef.current.scrollLeft
      const top = charRect.top - displayRect.top + displayRef.current.scrollTop
      trackerEl.style.left = `${left}px`
      trackerEl.style.top = `${top}px`
      trackerEl.style.opacity = '1'
    } else if (typed.length === 0) {
      // Position at start if nothing typed
      const firstChar = displayRef.current.querySelector('.char')
      if (firstChar) {
        const charRect = firstChar.getBoundingClientRect()
        const displayRect = displayRef.current.getBoundingClientRect()
        const left = charRect.left - displayRect.left + displayRef.current.scrollLeft
        const top = charRect.top - displayRect.top + displayRef.current.scrollTop
        trackerEl.style.left = `${left}px`
        trackerEl.style.top = `${top}px`
        trackerEl.style.opacity = '1'
      }
    } else if (typed.length >= sample.length) {
      // Hide only when completely finished
      trackerEl.style.opacity = '0'
    }
    // Otherwise keep tracker visible at its last position
  }, [value, sample, typed.length])

  // elapsed timer
  useEffect(() => {
    clearInterval(intervalRef.current)
    if (start && !finished) {
      intervalRef.current = setInterval(() => {
        setElapsed(Date.now() - start)
      }, 200)
    } else {
      setElapsed(0)
    }
    return () => clearInterval(intervalRef.current)
  }, [start, finished])

  // auto-stop when timeLimit reached
  useEffect(() => {
    clearTimeout(endTimeoutRef.current)
    if (start && timeLimit) {
      const remaining = timeLimit * 1000 - (Date.now() - start)
      if (remaining <= 0) {
        finishSession()
      } else {
        endTimeoutRef.current = setTimeout(() => {
          finishSession()
        }, remaining + 10)
      }
    }
    return () => clearTimeout(endTimeoutRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, timeLimit])

  function handleChange(e) {
    if (finished) return
    if (!start) setStart(Date.now())
    setValue(e.target.value)
  }

  function resetInternal() {
    setValue('')
    setStart(null)
    setElapsed(0)
    setFinished(false)
    clearInterval(intervalRef.current)
    clearTimeout(endTimeoutRef.current)
  }

  function reset() {
    resetInternal()
    inputRef.current?.focus()
  }

  function finishSession() {
    setFinished(true)
    setStart(null)
    inputRef.current?.blur()
  }

  function startSession() {
    if (finished) resetInternal()
    setStart(Date.now())
    setFinished(false)
    inputRef.current?.focus()
  }

  // stats
  const charsTyped = value.length
  const minutes = Math.max((elapsed) / 60000, 0.001)
  const wpm = Math.floor((charsTyped / 5) / minutes)
  const correctChars = Array.from(value).filter((c, i) => c === sample[i]).length
  const accuracy = value.length ? Math.max(0, Math.round((correctChars / value.length) * 100)) : 100

  // broadcast stats so other components (subbar) can display them
  useEffect(() => {
    try {
      const ev = new CustomEvent('typing:stats', { detail: { wpm: isFinite(wpm) ? wpm : 0, accuracy } })
      window.dispatchEvent(ev)
    } catch (err) {
      // ignore in environments without CustomEvent support
    }
  }, [wpm, accuracy])

  const lastIndex = Math.max(typed.length - 1, -1)

  return (
    <section className="typing-card" aria-labelledby="typing-title">
      <header className="typing-header">
        <div>
          <h3 id="typing-title" className="title">Typing practice</h3>
          <p className="subtitle">Short drills to build speed and accuracy</p>
        </div>

        <div className="stats-and-controls">
          <div className="mode-controls" role="toolbar" aria-label="Game mode">
            <button className={`seg ${gameMode === 'sentences' ? 'active' : ''}`} onClick={() => setGameMode('sentences')} type="button">Sentences</button>
            <button className={`seg ${gameMode === 'words' ? 'active' : ''}`} onClick={() => setGameMode('words')} type="button">Words</button>
          </div>

          <div className="time-controls" role="toolbar" aria-label="Time limit">
            {[15,30,60,90].map(s => (
              <button key={s} className={`seg ${timeLimit === s ? 'active' : ''}`} onClick={() => setTimeLimit(timeLimit === s ? null : s)} type="button">
                {s}s
              </button>
            ))}
            <button className={`seg ${timeLimit === null ? 'active' : ''}`} onClick={() => setTimeLimit(null)} type="button">∞</button>
          </div>

          {/* removed local stats from header - now displayed in bottom SubBar */}
        </div>
      </header>

      <div
        className="typing-wrapper"
        onClick={() => { if (!finished) inputRef.current?.focus() }}
      >
        <div className="typing-display" ref={displayRef} aria-hidden="true">
          <span className="tracker" />
          {Array.from(sample).map((ch, i) => {
            const typedChar = typed[i]
            let cls = 'char'
            if (typeof typedChar !== 'undefined') {
              const correct = typedChar === sample[i]
              cls += correct ? ' correct' : ' incorrect'
              if (i === lastIndex) cls += ' recent'
            } else if (i === typed.length) {
              cls += ' current'
            }
            return (
              <span key={'c-' + i} className={cls}>
                {ch === ' ' ? '\u00A0' : ch}
              </span>
            )
          })}

          {typed.slice(sample.length).length > 0 && (
            <span className="word extra">
              {typed.slice(sample.length).map((ch, i) => {
                const idx = sample.length + i
                const cls = 'char incorrect' + (idx === lastIndex ? ' recent' : '')
                return (
                  <span key={'extra-' + i} className={cls}>
                    {ch === ' ' ? '\u00A0' : ch}
                  </span>
                )
              })}
            </span>
          )}
        </div>

        <textarea
          ref={inputRef}
          className="typing-input-overlay"
          value={value}
          onChange={handleChange}
          onScroll={() => {
            if (inputRef.current && displayRef.current) {
              displayRef.current.scrollTop = inputRef.current.scrollTop
              displayRef.current.scrollLeft = inputRef.current.scrollLeft
            }
          }}
          spellCheck={false}
          aria-label="Typing input"
          disabled={finished}
        />
      </div>

      <div className="controls">
        <button className="btn btn-ghost" onClick={reset} type="button">Reset</button>
        <button className="btn btn-primary" onClick={() => startSession()} type="button">Start</button>
        {timeLimit && start && !finished && (
          <div className="timer" aria-live="polite">
            {Math.max(0, Math.ceil((timeLimit * 1000 - elapsed) / 1000))}s
          </div>
        )}
      </div>
    </section>
  )
}